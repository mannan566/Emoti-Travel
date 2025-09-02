import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star } from "lucide-react";
import { tamilNaduDestinations } from "@/data/destinations";

const TamilNadu = () => {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="forest" />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 px-4 py-2 bg-gradient-nature text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Tamil Nadu Experiences
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Tamil Nadu's
            <span className="block bg-gradient-nature bg-clip-text text-transparent">
              Hidden Gems
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From misty hill stations to ancient temples, discover Tamil Nadu's diverse landscapes 
            that cater to every emotional journey and cultural curiosity.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">9+</div>
              <div className="text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">12+</div>
              <div className="text-muted-foreground">Cultural Sites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Year-round</div>
              <div className="text-muted-foreground">Travel Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-8 bg-card/80 backdrop-blur-sm mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Tamil Nadu Cultural Essence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-semibold mb-2">Ancient Architecture</h3>
                <p className="text-sm text-muted-foreground">Marvel at Dravidian temple architecture and UNESCO World Heritage sites</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="font-semibold mb-2">Classical Arts</h3>
                <p className="text-sm text-muted-foreground">Experience Bharatanatyam, Carnatic music, and traditional performances</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-semibold mb-2">Natural Beauty</h3>
                <p className="text-sm text-muted-foreground">From hill stations to beaches, diverse landscapes for every mood</p>
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
              Discover Tamil Nadu's
              <span className="bg-gradient-nature bg-clip-text text-transparent"> Emotional Landscapes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each destination in Tamil Nadu offers a unique emotional experience, from peaceful hill retreats to spiritually enriching temple towns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tamilNaduDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-nature text-white">
            <h2 className="text-3xl font-bold mb-6">Tamil Nadu Travel Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Best Travel Times
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Hill Stations: April-June (pleasant weather)</li>
                  <li>• Coastal Areas: November-March (cool and dry)</li>
                  <li>• Temple Towns: October-February (comfortable touring)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Cultural Etiquette
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Remove shoes before entering temples</li>
                  <li>• Dress modestly when visiting religious sites</li>
                  <li>• Learn basic Tamil greetings for warmer interactions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TamilNadu;