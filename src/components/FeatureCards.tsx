import { Card } from "@/components/ui/card";
import { Brain, Shield, Globe, Heart, MapPin, Calendar } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Emotion Analysis",
    description: "Advanced NLP technology understands your feelings and matches them with perfect destinations.",
    gradient: "bg-gradient-nature"
  },
  {
    icon: Globe,
    title: "Cultural Immersion",
    description: "Discover local festivals, traditions, cuisine, and customs for an authentic travel experience.",
    gradient: "bg-gradient-warm"
  },
  {
    icon: Shield,
    title: "Real-time Safety",
    description: "Live updates on weather, natural disasters, political situations, and travel advisories.",
    gradient: "bg-gradient-ocean"
  },
  {
    icon: Heart,
    title: "Emotional Wellness",
    description: "Find accommodations and activities that support your mental health and emotional needs.",
    gradient: "bg-gradient-sunset"
  },
  {
    icon: MapPin,
    title: "Smart Recommendations",
    description: "Personalized suggestions for destinations, activities, and experiences based on your profile.",
    gradient: "bg-gradient-nature"
  },
  {
    icon: Calendar,
    title: "Perfect Timing",
    description: "AI considers seasonal patterns, local events, and optimal travel windows for your preferences.",
    gradient: "bg-gradient-warm"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Intelligent Travel
            <span className="bg-gradient-sunset bg-clip-text text-transparent"> Planning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of travel with our AI-powered platform that understands you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={index}
                className="group p-8 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl ${feature.gradient} shadow-soft group-hover:shadow-glow transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 h-1 w-full bg-border/30 rounded-full overflow-hidden">
                  <div className={`h-full w-0 group-hover:w-full ${feature.gradient} transition-all duration-700 delay-200`} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};