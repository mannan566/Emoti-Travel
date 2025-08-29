import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
import { EmotionForm } from "@/components/EmotionForm";
import { FeatureCards } from "@/components/FeatureCards";
import { DestinationCard } from "@/components/DestinationCard";
import { tamilNaduDestinations, keralaDestinations, bangaloreDestinations } from "@/data/destinations";

const getLocalSuggestions = () => {
  const pool = [
    ...tamilNaduDestinations,
    ...keralaDestinations,
    ...bangaloreDestinations,
  ];
  const sorted = pool.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const top = sorted.slice(0, Math.min(9, sorted.length));
  const count = Math.min(top.length, 2 + Math.floor(Math.random() * 2)); // 2 or 3
  const shuffled = [...top].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="minimal" />
      <HeroSection />
      <EmotionForm />
      <FeatureCards />
      
      {/* Recommended Destinations */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Destinations for Your
              <span className="bg-gradient-ocean bg-clip-text text-transparent"> Soul</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover places that understand and nurture your emotional journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getLocalSuggestions().map((destination, index) => (
              <DestinationCard key={index} {...destination} hideGetGoingPlans />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
