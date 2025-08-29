import { ParticleBackground } from "@/components/ParticleBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Compass, Globe, ArrowRight, Users, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const emotionalJourneys = [
  {
    emotion: "Stressed & Overwhelmed",
    icon: "😰",
    color: "bg-blue-100 text-blue-700",
    recommendations: ["Kerala Backwaters", "Ooty Tea Gardens", "Bangalore Parks"],
    description: "Find peace in nature's embrace"
  },
  {
    emotion: "Adventurous & Excited",
    icon: "🚀",
    color: "bg-orange-100 text-orange-700", 
    recommendations: ["Nandi Hills Cycling", "Thekkady Wildlife", "Mahabalipuram Exploration"],
    description: "Channel your energy into exploration"
  },
  {
    emotion: "Reflective & Contemplative",
    icon: "🧘",
    color: "bg-purple-100 text-purple-700",
    recommendations: ["Thanjavur Temples", "Kanyakumari Sunsets", "Lalbagh Gardens"],
    description: "Spaces for deep introspection"
  },
  {
    emotion: "Joyful & Celebratory",
    icon: "🎉",
    color: "bg-yellow-100 text-yellow-700",
    recommendations: ["Kochi Cultural Shows", "Bangalore Film City", "Varkala Beach"],
    description: "Amplify your happiness"
  }
];

const travelStats = [
  { number: "15K+", label: "Happy Travelers", icon: Users },
  { number: "50+", label: "Destinations", icon: MapPin },
  { number: "98%", label: "Satisfaction", icon: Star },
  { number: "365", label: "Days Support", icon: Calendar }
];

const Discover = () => {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="minimal" />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 px-4 py-2 bg-gradient-warm text-white">
              <Compass className="w-4 h-4 mr-2" />
              Discover Your Journey
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Emotions,
            <span className="block bg-gradient-warm bg-clip-text text-transparent">
              Your Adventure
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Every emotion tells a story, and every story deserves the perfect destination. 
            Discover how our AI matches your feelings to transformative travel experiences.
          </p>

          <Link to="/">
            <Button className="bg-gradient-warm text-white px-8 py-6 text-lg font-semibold hover:shadow-glow transition-all duration-300 group">
              Start Your Emotional Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Emotional Journey Mapping */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How We Match Your
              <span className="bg-gradient-nature bg-clip-text text-transparent"> Emotions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI analyzes your emotional state and cultural preferences to create personalized travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emotionalJourneys.map((journey, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                <div className="text-center">
                  <div className="text-4xl mb-4">{journey.icon}</div>
                  <Badge className={`mb-4 ${journey.color}`}>
                    {journey.emotion}
                  </Badge>
                  <p className="text-muted-foreground mb-4 font-medium">
                    {journey.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Perfect for:</p>
                    {journey.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-xs bg-muted/50 rounded-full px-3 py-1">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Your Journey in
              <span className="bg-gradient-ocean bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-nature rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">1. Share Your Feelings</h3>
              <p className="text-muted-foreground">
                Tell us how you're feeling and what kind of experience you're seeking through our intuitive emotion selector.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">2. Get AI Recommendations</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your emotions and suggests destinations that perfectly match your current state of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">3. Explore & Transform</h3>
              <p className="text-muted-foreground">
                Embark on your personalized journey with cultural insights, safety information, and emotional support throughout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Card className="p-12 bg-gradient-hero text-white text-center">
            <h2 className="text-4xl font-bold mb-12">Trusted by Thousands of Emotional Travelers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {travelStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Regional Spotlights */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Explore Our
              <span className="bg-gradient-sunset bg-clip-text text-transparent"> Featured Regions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-card transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Tamil Nadu</h3>
                <p className="text-muted-foreground mb-6">
                  Ancient temples, hill stations, and cultural heritage that speaks to your soul
                </p>
                <Link to="/tamil-nadu">
                  <Button className="bg-gradient-nature text-white group-hover:shadow-glow transition-all duration-300">
                    Explore Tamil Nadu
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="group overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-card transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🛶</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Kerala</h3>
                <p className="text-muted-foreground mb-6">
                  Backwaters, Ayurveda, and natural beauty for complete emotional healing
                </p>
                <Link to="/kerala">
                  <Button className="bg-gradient-ocean text-white group-hover:shadow-glow transition-all duration-300">
                    Discover Kerala
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="group overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-card transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🌳</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Bangalore</h3>
                <p className="text-muted-foreground mb-6">
                  Perfect climate, gardens, and urban wellness for modern stress relief
                </p>
                <Link to="/bangalore">
                  <Button className="bg-gradient-sunset text-white group-hover:shadow-glow transition-all duration-300">
                    Visit Bangalore
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;