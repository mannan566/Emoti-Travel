import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Plus, Check } from 'lucide-react';
import { usePlans } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapTilerSearchProps {
  region: 'Tamil Nadu' | 'Kerala' | 'Bangalore';
  center: { lat: number; lng: number };
  zoom?: number;
}

interface PlaceResult {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  category: string;
  distance?: number;
}

const MAPTILER_API_KEY = 'cKC1OtBmTMsRRXDVz2zq';

export const MapTilerSearch = ({ region, center, zoom = 10 }: MapTilerSearchProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { addPlan, selectedPlans } = usePlans();
  const { toast } = useToast();

  // Initialize MapTiler map
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      center: [center.lng, center.lat],
      zoom: zoom,
      attributionControl: true,
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    initializeMap();
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap]);

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  // Add marker to map
  const addMarker = (place: PlaceResult) => {
    if (!map.current) return;

    const marker = new maplibregl.Marker({
      color: '#3b82f6'
    })
      .setLngLat(place.coordinates)
      .setPopup(
        new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div style="padding: 12px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${place.name}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${place.address}</p>
              <p style="margin: 0; font-size: 12px; color: #888; text-transform: capitalize;">${place.category}</p>
            </div>
          `)
      )
      .addTo(map.current);

    markersRef.current.push(marker);
  };

  // Search places using MapTiler Geocoding API
  const searchPlaces = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    clearMarkers();

    try {
      // Create a bounding box around the region for more accurate results
      const bbox = getBoundingBox(region);
      const query = encodeURIComponent(`${searchQuery} ${region}`);
      
      const response = await fetch(
        `https://api.maptiler.com/geocoding/${query}.json?key=${MAPTILER_API_KEY}&bbox=${bbox}&limit=10&types=poi,address`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const results: PlaceResult[] = data.features.map((feature: any, index: number) => ({
          id: feature.id || `place-${index}`,
          name: feature.text || feature.place_name || 'Unknown Place',
          address: feature.place_name || feature.properties?.address || 'Address not available',
          coordinates: feature.center,
          category: feature.properties?.category || getPlaceCategory(feature.place_type?.[0] || 'place'),
        }));

        setSearchResults(results);
        
        // Add markers for all results
        results.forEach(place => addMarker(place));
        
        // Fit map to show all markers
        if (results.length > 0 && map.current) {
          const bounds = new maplibregl.LngLatBounds();
          results.forEach(place => {
            bounds.extend(place.coordinates);
          });
          map.current.fitBounds(bounds, { padding: 50 });
        }
      } else {
        setSearchResults([]);
        toast({
          title: "No results found",
          description: "Try searching for a different location or attraction."
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Please try again or check your internet connection."
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get bounding box for each region
  const getBoundingBox = (region: string) => {
    switch (region) {
      case 'Tamil Nadu':
        return '76.2,8.0,80.3,13.5'; // Tamil Nadu bounds
      case 'Kerala':
        return '74.8,8.2,77.4,12.8'; // Kerala bounds
      case 'Bangalore':
        return '77.3,12.7,77.8,13.2'; // Bangalore metropolitan area
      default:
        return '74.0,8.0,80.5,13.5'; // Default South India bounds
    }
  };

  // Categorize places based on type
  const getPlaceCategory = (placeType: string) => {
    const categoryMap: { [key: string]: string } = {
      'poi': 'Point of Interest',
      'address': 'Location',
      'place': 'Place',
      'locality': 'City/Town',
      'region': 'Region',
      'country': 'Country'
    };
    return categoryMap[placeType] || 'Place';
  };

  // Add place to dashboard
  const addPlaceToPlans = (place: PlaceResult) => {
    const isAlreadyAdded = selectedPlans.some(
      plan => plan.name === place.name && plan.region === region
    );

    if (isAlreadyAdded) {
      toast({
        title: "Already added",
        description: `${place.name} is already in your travel plans.`
      });
      return;
    }

    // Create a destination object from the place
    const newDestination = {
      name: place.name,
      country: region,
      image: getRegionDefaultImage(region),
      emotionalMatch: 'Custom Discovery',
      matchPercentage: 85,
      description: `Discovered through map search: ${place.address}`,
      culturalHighlights: [place.category, 'Local Discovery', 'Map Search'],
      safetyLevel: 'high' as const,
      bestTime: 'Year-round',
      priceRange: '$$' as const,
      region: region
    };

    addPlan(newDestination);
    toast({
      title: "Added to plans!",
      description: `${place.name} has been added to your travel dashboard.`
    });
  };

  // Get default image based on region
  const getRegionDefaultImage = (region: string) => {
    switch (region) {
      case 'Tamil Nadu':
        return 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80';
      case 'Kerala':
        return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80';
      case 'Bangalore':
        return 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchPlaces();
    }
  };

  const isPlaceAdded = (placeName: string) => {
    return selectedPlans.some(plan => plan.name === placeName && plan.region === region);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-4 text-foreground flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-primary" />
          Explore {region} on Map
        </h3>
        <p className="text-muted-foreground mb-6">
          Search for attractions, restaurants, temples, or any places of interest in {region}
        </p>
        
        <div className="flex gap-3 mb-4">
          <Input
            placeholder={`Search places in ${region}... (e.g., "temples", "beaches", "restaurants")`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={searchPlaces}
            disabled={!searchQuery.trim() || isLoading || !isMapLoaded}
            className="bg-gradient-ocean text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {!isMapLoaded && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading Map...</p>
          </div>
        )}
      </Card>

      {/* Map Container */}
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
        <div 
          ref={mapContainer} 
          className="w-full h-[400px] bg-muted/50"
          style={{ minHeight: '400px' }}
        />
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="p-6 bg-card/80 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            Search Results ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((place) => (
              <div 
                key={place.id}
                className="p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{place.name}</h4>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {place.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {place.address}
                </p>
                
                <Button
                  size="sm"
                  onClick={() => addPlaceToPlans(place)}
                  disabled={isPlaceAdded(place.name)}
                  className="w-full"
                >
                  {isPlaceAdded(place.name) ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added to Plans
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Plans
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};