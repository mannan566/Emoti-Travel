import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star } from "lucide-react";
import { keralaDestinations } from "@/data/destinations";

const Kerala = () => {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="ocean" />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 px-4 py-2 bg-gradient-ocean text-white">
              <MapPin className="w-4 h-4 mr-2" />
              God's Own Country
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Kerala's
            <span className="block bg-gradient-ocean bg-clip-text text-transparent">
              Natural Symphony
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience Kerala's harmonious blend of backwaters, hills, beaches, and wildlife - 
            a perfect destination for emotional healing and spiritual awakening.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">44</div>
              <div className="text-muted-foreground">Rivers & Lakes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Literacy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Kerala Highlights */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-8 bg-card/80 backdrop-blur-sm mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Kerala's Healing Powers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🌿</div>
                <h3 className="font-semibold mb-2">Ayurveda</h3>
                <p className="text-sm text-muted-foreground">Experience authentic Ayurvedic treatments and holistic wellness practices</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🛶</div>
                <h3 className="font-semibold mb-2">Backwaters</h3>
                <p className="text-sm text-muted-foreground">Cruise through serene waterways on traditional houseboats</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">🏔️</div>
                <h3 className="font-semibold mb-2">Hill Stations</h3>
                <p className="text-sm text-muted-foreground">Rejuvenate in misty mountains and spice-scented air</p>
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
              Kerala's
              <span className="bg-gradient-ocean bg-clip-text text-transparent"> Emotional Sanctuaries</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each corner of Kerala offers unique emotional experiences - from peaceful backwaters to adventurous wildlife encounters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keralaDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore Kerala
              <span className="bg-gradient-ocean bg-clip-text text-transparent"> on Map</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover backwaters, hill stations, beaches, and Ayurvedic centers across God's Own Country
            </p>
          </div>
          
          <GoogleMapEmbed
            region="Kerala"
            embedUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2003236.5359239418!2d75.5!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756863984310!5m2!1sen!2sin"
            searchBounds={{ lat: 10.8505, lng: 76.2711, radius: 40000 }}
          />
        </div>
      </section>

      {/* Ayurveda & Wellness */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 bg-gradient-ocean text-white">
            <h2 className="text-3xl font-bold mb-6">Kerala Wellness Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Monsoon Magic
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• June-September: Monsoon season (Ayurveda peak time)</li>
                  <li>• October-March: Ideal for tourism and outdoor activities</li>
                  <li>• April-May: Hot season, fewer crowds, better prices</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Cultural Experiences
                </h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Kathakali performances in the evening</li>
                  <li>• Traditional Malayalam cuisine experiences</li>
                  <li>• Theyyam rituals (October-May in Northern Kerala)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Kerala;