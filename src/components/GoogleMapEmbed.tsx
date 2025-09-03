import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Plus, Star, Clock } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";

interface GoogleMapEmbedProps {
  region: "Tamil Nadu" | "Kerala" | "Bangalore";
  embedUrl: string;
  searchBounds: {
    lat: number;
    lng: number;
    radius: number;
  };
}

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
  }>;
}

export const GoogleMapEmbed = ({ region, embedUrl, searchBounds }: GoogleMapEmbedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const mapRef = useRef<HTMLIFrameElement>(null);
  const { addPlan } = usePlans();
  const { toast } = useToast();

  // Mock search function - in a real implementation, you'd use Google Places API
  const searchPlaces = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call with mock data based on region
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults: PlaceResult[] = generateMockResults(query, region);
    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const generateMockResults = (query: string, region: string): PlaceResult[] => {
    const baseResults = {
      "Tamil Nadu": [
        {
          place_id: "tn_1",
          name: "Meenakshi Amman Temple",
          formatted_address: "Madurai, Tamil Nadu, India",
          rating: 4.6,
          types: ["hindu_temple", "tourist_attraction"],
          geometry: { location: { lat: 9.9195, lng: 78.1193 } }
        },
        {
          place_id: "tn_2", 
          name: "Marina Beach",
          formatted_address: "Chennai, Tamil Nadu, India",
          rating: 4.2,
          types: ["beach", "tourist_attraction"],
          geometry: { location: { lat: 13.0487, lng: 80.2785 } }
        },
        {
          place_id: "tn_3",
          name: "Ooty Botanical Gardens",
          formatted_address: "Ooty, Tamil Nadu, India", 
          rating: 4.4,
          types: ["park", "tourist_attraction"],
          geometry: { location: { lat: 11.4064, lng: 76.7009 } }
        }
      ],
      "Kerala": [
        {
          place_id: "kl_1",
          name: "Alleppey Backwaters",
          formatted_address: "Alappuzha, Kerala, India",
          rating: 4.7,
          types: ["tourist_attraction", "natural_feature"],
          geometry: { location: { lat: 9.4981, lng: 76.3388 } }
        },
        {
          place_id: "kl_2",
          name: "Munnar Tea Gardens", 
          formatted_address: "Munnar, Kerala, India",
          rating: 4.5,
          types: ["tourist_attraction", "establishment"],
          geometry: { location: { lat: 10.0889, lng: 77.0595 } }
        },
        {
          place_id: "kl_3",
          name: "Fort Kochi Beach",
          formatted_address: "Kochi, Kerala, India",
          rating: 4.3,
          types: ["beach", "tourist_attraction"], 
          geometry: { location: { lat: 9.9648, lng: 76.2424 } }
        }
      ],
      "Bangalore": [
        {
          place_id: "blr_1",
          name: "Lalbagh Botanical Garden",
          formatted_address: "Bangalore, Karnataka, India",
          rating: 4.4,
          types: ["park", "tourist_attraction"],
          geometry: { location: { lat: 12.9507, lng: 77.5848 } }
        },
        {
          place_id: "blr_2",
          name: "Nandi Hills",
          formatted_address: "Nandi Hills, Karnataka, India", 
          rating: 4.3,
          types: ["tourist_attraction", "natural_feature"],
          geometry: { location: { lat: 13.3704, lng: 77.6838 } }
        },
        {
          place_id: "blr_3",
          name: "Bangalore Palace",
          formatted_address: "Bangalore, Karnataka, India",
          rating: 4.2,
          types: ["tourist_attraction", "establishment"],
          geometry: { location: { lat: 12.9982, lng: 77.5920 } }
        }
      ]
    };

    return baseResults[region] || [];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlaces(searchQuery);
  };

  const handleAddToPlans = (place: PlaceResult) => {
    const newPlan = {
      name: place.name,
      country: region,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", // Default travel image
      emotionalMatch: "Discovered Location",
      matchPercentage: 85,
      description: `Discovered location: ${place.formatted_address}. ${place.rating ? `Rated ${place.rating}/5 stars.` : ''} ${place.types.join(', ')}.`,
      culturalHighlights: place.types.slice(0, 3),
      safetyLevel: "high" as const,
      bestTime: "Year-round",
      priceRange: "$$" as const,
      region: region,
    };

    addPlan(newPlan);
    toast({
      title: "Added to plans!",
      description: `${place.name} has been added to your travel dashboard.`,
    });
  };

  const getPlaceTypeIcon = (types: string[]) => {
    if (types.includes('restaurant') || types.includes('food')) return '🍽️';
    if (types.includes('tourist_attraction')) return '🏛️';
    if (types.includes('park') || types.includes('natural_feature')) return '🌿';
    if (types.includes('beach')) return '🏖️';
    if (types.includes('temple') || types.includes('hindu_temple')) return '🕉️';
    if (types.includes('shopping_mall') || types.includes('store')) return '🛍️';
    return '📍';
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Explore {region} on Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <Input
              type="text"
              placeholder={`Search for places in ${region}... (e.g., temples, beaches, restaurants)`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>

          {/* Map Embed */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-border/50">
            <iframe
              ref={mapRef}
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${region} Map`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Search Results ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((place) => (
                <div
                  key={place.place_id}
                  className="p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedPlace(place)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getPlaceTypeIcon(place.types)}</span>
                      <h3 className="font-semibold text-foreground text-sm">{place.name}</h3>
                    </div>
                    {place.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{place.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {place.formatted_address}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {place.types.slice(0, 2).map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlans(place);
                    }}
                    className="w-full bg-gradient-ocean text-white hover:shadow-glow transition-all duration-300"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Plans
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Place Details */}
      {selectedPlace && (
        <Card className="bg-card/80 backdrop-blur-sm border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{getPlaceTypeIcon(selectedPlace.types)}</span>
              {selectedPlace.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedPlace.formatted_address}</span>
              </div>
              
              {selectedPlace.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{selectedPlace.rating}/5 rating</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {selectedPlace.types.map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => handleAddToPlans(selectedPlace)}
                  className="flex-1 bg-gradient-ocean text-white hover:shadow-glow transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Travel Plans
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPlace(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};