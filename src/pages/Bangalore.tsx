import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star } from "lucide-react";
import { bangaloreDestinations } from "@/data/destinations";

const Bangalore = () => {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="sunset" />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 px-4 py-2 bg-gradient-sunset text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Silicon Valley of India
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Bangalore's
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Urban Oasis
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover Bangalore's perfect blend of modern innovation and natural beauty, 
            where tech meets tranquility in India's Garden City.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">9+</div>
              <div className="text-muted-foreground">Urban Escapes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">20°C</div>
              <div className="text-muted-foreground">Perfect Climate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Parks & Gardens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bangalore Highlights */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-8 bg-card/80 backdrop-blur-sm mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Bangalore Heals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌡️</div>
                <h3 className="font-semibold mb-2">Perfect Weather</h3>
                <p className="text-sm text-muted-foreground">Year-round pleasant climate that naturally uplifts your mood</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌳</div>
                <h3 className="font-semibold mb-2">Garden City</h3>
                <p className="text-sm text-muted-foreground">Numerous parks and green spaces for peaceful retreats within the city</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Innovation Hub</h3>
                <p className="text-sm text-muted-foreground">Dynamic energy and opportunities that inspire and motivate</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Bangalore's
              <span className="bg-gradient-sunset bg-clip-text text-transparent"> Emotional Spaces</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From serene gardens to vibrant cultural spaces, Bangalore offers diverse experiences for every emotional need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bangaloreDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Local Insights */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-sunset text-white">
            <h2 className="text-3xl font-bold mb-6">Bangalore Living Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Best Times to Visit
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• October-February: Perfect weather for outdoor activities</li>
                  <li>• March-May: Warm but manageable, fewer crowds</li>
                  <li>• June-September: Monsoon season, lush greenery</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Local Experiences
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Weekend cycling groups to Nandi Hills</li>
                  <li>• Food street explorations in VV Puram</li>
                  <li>• Craft beer tours in microbreweries</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Bangalore;