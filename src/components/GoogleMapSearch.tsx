import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Plus, Check } from 'lucide-react';
import { usePlans } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapSearchProps {
  region: 'Tamil Nadu' | 'Kerala' | 'Bangalore';
  center: { lat: number; lng: number };
  zoom?: number;
}

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
  };
  rating?: number;
  types: string[];
  photos?: any[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const GoogleMapSearch = ({ region, center, zoom = 10 }: GoogleMapSearchProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const serviceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { addPlan, selectedPlans } = usePlans();
  const { toast } = useToast();

  // Initialize Google Maps
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#3b82f6' }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f8fafc' }]
        }
      ]
    });

    mapInstanceRef.current = map;
    serviceRef.current = new window.google.maps.places.PlacesService(map);
    setIsMapLoaded(true);
  }, [center, zoom]);

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BjuE9dOggjw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initializeMap;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [initializeMap]);

  // Clear existing markers
  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  // Add marker to map
  const addMarker = (place: PlaceResult) => {
    if (!mapInstanceRef.current) return;

    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      map: mapInstanceRef.current,
      title: place.name,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new window.google.maps.Size(32, 32)
      }
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold;">${place.name}</h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${place.formatted_address}</p>
          ${place.rating ? `<p style="margin: 0; font-size: 12px;">⭐ ${place.rating}/5</p>` : ''}
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(mapInstanceRef.current, marker);
    });

    markersRef.current.push(marker);
  };

  // Search places
  const searchPlaces = async () => {
    if (!serviceRef.current || !searchQuery.trim()) return;

    setIsLoading(true);
    clearMarkers();

    const request = {
      query: `${searchQuery} in ${region}`,
      fields: ['place_id', 'name', 'formatted_address', 'geometry', 'rating', 'types', 'photos']
    };

    serviceRef.current.textSearch(request, (results: PlaceResult[], status: any) => {
      setIsLoading(false);
      
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const filteredResults = results.slice(0, 10); // Limit to 10 results
        setSearchResults(filteredResults);
        
        // Add markers for all results
        filteredResults.forEach(place => addMarker(place));
        
        // Fit map to show all markers
        if (filteredResults.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          filteredResults.forEach(place => {
            bounds.extend(place.geometry.location);
          });
          mapInstanceRef.current.fitBounds(bounds);
        }
      } else {
        setSearchResults([]);
        toast({
          title: "No results found",
          description: "Try searching for a different location or attraction."
        });
      }
    });
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
      image: place.photos && place.photos[0] 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BjuE9dOggjw`
        : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      emotionalMatch: 'Custom Discovery',
      matchPercentage: 85,
      description: `Discovered through map search: ${place.formatted_address}`,
      culturalHighlights: place.types.filter(type => 
        ['tourist_attraction', 'museum', 'park', 'temple', 'church'].includes(type)
      ).slice(0, 3),
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
            <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
          </div>
        )}
      </Card>

      {/* Map Container */}
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
        <div 
          ref={mapRef} 
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
                key={place.place_id}
                className="p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{place.name}</h4>
                  {place.rating && (
                    <Badge variant="secondary" className="text-xs">
                      ⭐ {place.rating}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {place.formatted_address}
                </p>
                
                {place.types.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {place.types.slice(0, 3).map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs capitalize">
                        {type.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
                
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