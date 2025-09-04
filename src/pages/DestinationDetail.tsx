import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Users, Shield, BedDouble, Camera, Utensils, Activity, Navigation, Lightbulb, CheckCircle, Circle, ArrowRight } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { bangaloreDestinations, keralaDestinations, tamilNaduDestinations, type Destination } from "@/data/destinations";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const allDestinations: Destination[] = [
  ...tamilNaduDestinations,
  ...keralaDestinations,
  ...bangaloreDestinations,
];

const DestinationDetail = () => {
  const { country = "", name = "" } = useParams();
  const decodedCountry = decodeURIComponent(country);
  const decodedName = decodeURIComponent(name);
  const location = useLocation() as { state?: { destination?: Destination } };
  const navigate = useNavigate();
  const { addPlan, selectedPlans, updatePlanStatus } = usePlans();
  const { toast } = useToast();

  const destination = useMemo(() => {
    return (
      location.state?.destination ||
      allDestinations.find(
        (d) => d.name === decodedName && d.country === decodedCountry
      )
    );
  }, [location.state, decodedName, decodedCountry]);

  const currentPlan = selectedPlans.find(
    (p) => p.name === destination?.name && p.region === destination?.country
  );

  // Scroll to top when component mounts or destination changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [destination]);
  useEffect(() => {
    if (destination) {
      const pageTitle = `${destination.name} - ${destination.country} | Destination Details`;
      document.title = pageTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      const description = `${destination.name} in ${destination.country}: ${destination.description}`.slice(0, 155);
      if (metaDesc) metaDesc.setAttribute("content", description);

      // canonical
      const canonicalHref = `${window.location.origin}/destination/${encodeURIComponent(
        destination.country
      )}/${encodeURIComponent(destination.name)}`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalHref);
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background relative pt-16 flex items-center justify-center">
        <ParticleBackground theme="minimal" />
        <p className="text-muted-foreground">Destination not found.</p>
      </div>
    );
  }

  const isSelected = selectedPlans.some(
    (p) => p.name === destination.name && p.region === destination.country
  );

  const rentText = useMemo(() => {
    switch (destination.priceRange) {
      case '$':
        return 'Budget (~₹1,000–₹2,500/night)';
      case '$$':
        return 'Mid-range (~₹2,500–₹6,000/night)';
      case '$$$':
        return 'Premium (₹6,000+/night)';
      default:
        return 'Varies';
    }
  }, [destination.priceRange]);

  const travelSteps = [
    { id: 'research', title: 'Research & Planning', description: 'Gather information about the destination, weather, and local customs' },
    { id: 'booking', title: 'Accommodation & Transport', description: 'Book hotels, flights, and local transportation' },
    { id: 'preparation', title: 'Travel Preparation', description: 'Pack essentials, check documents, and prepare for the journey' },
    { id: 'arrival', title: 'Arrival & Check-in', description: 'Reach destination, check into accommodation, and get oriented' },
    { id: 'exploration', title: 'Explore & Experience', description: 'Visit attractions, try local cuisine, and immerse in culture' },
    { id: 'completion', title: 'Journey Complete', description: 'Reflect on experiences and share memories' }
  ];

  const getStepProgress = () => {
    if (!currentPlan) return 0;
    if (currentPlan.status === 'selected') return 0;
    if (currentPlan.status === 'ongoing') return 50;
    if (currentPlan.status === 'completed') return 100;
    return 0;
  };

  const handleAdd = () => {
    if (currentPlan) {
      toast({ title: "Already added", description: `${destination.name} is already in your travel plans.` });
      return;
    }
    addPlan({
      name: destination.name,
      country: destination.country,
      image: destination.image,
      emotionalMatch: destination.emotionalMatch,
      matchPercentage: destination.matchPercentage,
      description: destination.description,
      culturalHighlights: destination.culturalHighlights,
      safetyLevel: destination.safetyLevel,
      bestTime: destination.bestTime,
      priceRange: destination.priceRange,
      region: destination.country as 'Tamil Nadu' | 'Kerala' | 'Bangalore',
    });
    toast({ title: "Added to plans!", description: `${destination.name} has been added to your travel dashboard.` });
  };

  const handleStartJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'ongoing');
      toast({ title: "Journey started!", description: `Your journey to ${destination.name} is now ongoing.` });
    }
  };

  const handleCompleteJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'completed');
      toast({ title: "Journey completed!", description: `Congratulations on completing your journey to ${destination.name}!` });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'temple': return '🏛️';
      case 'nature': return '🌿';
      case 'adventure': return '🏔️';
      case 'cultural': return '🎭';
      case 'beach': return '🏖️';
      case 'historical': return '📜';
      case 'shopping': return '🛍️';
      case 'food': return '🍽️';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="minimal" />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[48vh] md:h-[60vh] overflow-hidden">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country} travel destination`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{destination.name}</h1>
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{destination.country}</span>
              </div>
            </div>
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 self-start md:self-auto">
              <Heart className="w-3 h-3 mr-1" />
              {destination.matchPercentage}% Match — {destination.emotionalMatch}
            </Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Travel Progress Section - Only show if plan exists */}
            {currentPlan && (
              <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      Your Journey Progress
                    </h2>
                    <Badge className={`${
                      currentPlan.status === 'selected' ? 'bg-blue-500/20 text-blue-600' :
                      currentPlan.status === 'ongoing' ? 'bg-amber-500/20 text-amber-600' :
                      'bg-green-500/20 text-green-600'
                    }`}>
                      {currentPlan.status}
                    </Badge>
                  </div>
                  
                  <Progress value={getStepProgress()} className="mb-6" />
                  
                  <div className="space-y-4">
                    {travelSteps.map((step, index) => {
                      const isCompleted = currentPlan.status === 'completed';
                      const isCurrent = currentPlan.status === 'ongoing' && index <= 3;
                      const isUpcoming = currentPlan.status === 'selected' || (currentPlan.status === 'ongoing' && index > 3);
                      
                      return (
                        <div key={step.id} className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                          isCompleted ? 'bg-green-50 border border-green-200' :
                          isCurrent ? 'bg-amber-50 border border-amber-200' :
                          'bg-gray-50 border border-gray-200'
                        }`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500 text-white' :
                            isCurrent ? 'bg-amber-500 text-white' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          {isCurrent && (
                            <ArrowRight className="w-5 h-5 text-amber-500 animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex gap-3">
                    {currentPlan.status === 'selected' && (
                      <Button onClick={handleStartJourney} className="bg-gradient-ocean text-white">
                        Start Journey
                      </Button>
                    )}
                    {currentPlan.status === 'ongoing' && (
                      <Button onClick={handleCompleteJourney} className="bg-gradient-sunset text-white">
                        Mark as Completed
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      View Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-3">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Cultural Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.culturalHighlights.map((h, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {h}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {destination.topSpots && destination.topSpots.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Top Tourist Spots</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {destination.topSpots.map((spot, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-md border border-border/50 bg-background/50">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/90">{spot}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {destination.touristPlaces && destination.touristPlaces.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Must-Visit Tourist Places
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {destination.touristPlaces.map((place, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/70 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getCategoryIcon(place.category)}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{place.name}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs capitalize">
                              {place.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.activities && destination.activities.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Things to Do
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.localCuisine && destination.localCuisine.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Utensils className="w-5 h-5 mr-2" />
                    Local Cuisine & Specialties
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {destination.localCuisine.map((food, i) => (
                      <div key={i} className="p-3 rounded-md bg-muted/50 text-center">
                        <span className="text-sm font-medium">{food}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.nearbyAttractions && destination.nearbyAttractions.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Navigation className="w-5 h-5 mr-2" />
                    Nearby Attractions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.nearbyAttractions.map((attraction, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        📍 {attraction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.travelTips && destination.travelTips.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Travel Tips
                  </h3>
                  <ul className="space-y-2">
                    {destination.travelTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Travel Progress Sidebar - Only show if plan exists and is ongoing */}
            {currentPlan && currentPlan.status === 'ongoing' && (
              <Card className="bg-gradient-ocean text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Journey Progress
                  </h3>
                  
                  <Progress value={getStepProgress()} className="mb-4 bg-white/20" />
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-semibold mb-2">Current Phase:</div>
                      <div className="bg-white/10 p-3 rounded-lg">
                        <div className="font-medium">Explore & Experience</div>
                        <div className="text-xs opacity-90 mt-1">Visit attractions, try local cuisine, and immerse in culture</div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-semibold mb-2">Next Steps:</div>
                      <ul className="space-y-1 text-xs opacity-90">
                        <li>• Visit the cultural highlights listed below</li>
                        <li>• Try recommended local cuisines</li>
                        <li>• Take photos at must-visit places</li>
                        <li>• Follow the travel tips for best experience</li>
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={handleCompleteJourney}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      Mark Journey Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-2" />Best time</span>
                  <span>{destination.bestTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2" />Room rent</span>
                  <span>{rentText}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-2" />Ideal group</span>
                  <span>{destination.idealGroupSize || 'Any'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Shield className="w-4 h-4 mr-2" />Safety</span>
                  <span className="capitalize">{destination.safetyLevel}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              {!currentPlan ? (
                <>
                  <Button className="flex-1" onClick={handleAdd}>Add to Plans</Button>
                  <Button variant="secondary" onClick={() => navigate('/dashboard?tab=ongoing')}>Get Going Plans</Button>
                </>
              ) : (
                <>
                  {currentPlan.status === 'selected' && (
                    <Button className="flex-1" onClick={handleStartJourney}>Start Journey</Button>
                  )}
                  {currentPlan.status === 'ongoing' && (
                    <Button className="flex-1" onClick={handleCompleteJourney}>Complete Journey</Button>
                  )}
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    View Dashboard
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
