import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smile, Frown, Meh, Heart, Zap, Cloud, Sun, Moon, Users } from "lucide-react";
import { DestinationRecommendations } from "@/components/DestinationRecommendations";

const emotionOptions = [
  { id: "stressed", label: "Stressed", icon: Cloud, color: "bg-slate-100 text-slate-700 hover:bg-slate-200" },
  { id: "joyful", label: "Joyful", icon: Sun, color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" },
  { id: "sad", label: "Sad", icon: Frown, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { id: "burnout", label: "Burned Out", icon: Zap, color: "bg-red-100 text-red-700 hover:bg-red-200" },
  { id: "excited", label: "Excited", icon: Smile, color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
  { id: "peaceful", label: "Peaceful", icon: Heart, color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { id: "adventurous", label: "Adventurous", icon: Zap, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
  { id: "reflective", label: "Reflective", icon: Moon, color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" }
];

const desiredChangeOptions = [
  { id: "joy", label: "Joy & Happiness", description: "Vibrant experiences that uplift your spirit" },
  { id: "peace", label: "Peace & Tranquility", description: "Calming environments for relaxation" },
  { id: "adventure", label: "Adventure & Excitement", description: "Thrilling activities and new challenges" },
  { id: "excitement", label: "Energy & Excitement", description: "Dynamic experiences to boost your energy" }
];

const groupSizeOptions = [
  { value: "solo", label: "Solo Travel (Just me)" },
  { value: "couple", label: "Couple (2 people)" },
  { value: "small-group", label: "Small Group (3-5 people)" },
  { value: "large-group", label: "Large Group (6+ people)" }
];

export const EmotionForm = () => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [desiredChange, setDesiredChange] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmotionToggle = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId) 
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleNextStep = () => {
    if (selectedEmotions.length > 0) {
      setShowSecondStep(true);
    }
  };

  const handleBackToFirst = () => {
    setShowSecondStep(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate AI processing with enhanced analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowRecommendations(true);
  };

  const handleBackToForm = () => {
    setShowRecommendations(false);
    setShowSecondStep(false);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Are You
            <span className="bg-gradient-nature bg-clip-text text-transparent"> Feeling?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your emotional state and let our AI find the perfect destination to match your needs
          </p>
        </div>

        {showRecommendations ? (
          <DestinationRecommendations 
            emotionData={{
              emotions: selectedEmotions,
              description,
              desiredChange,
              groupSize
            }}
            onBack={handleBackToForm}
          />
        ) : (
          <Card className="p-8 shadow-card bg-card/50 backdrop-blur-sm border-border/50">
            {!showSecondStep ? (
            /* Step 1: Emotion Selection */
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Select Your Current Emotions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {emotionOptions.map((emotion) => {
                    const Icon = emotion.icon;
                    const isSelected = selectedEmotions.includes(emotion.id);
                    
                    return (
                      <Button
                        key={emotion.id}
                        type="button"
                        variant="outline"
                        onClick={() => handleEmotionToggle(emotion.id)}
                        className={`h-auto py-4 px-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary/10 shadow-soft' 
                            : 'border-border hover:border-primary/50 hover:shadow-soft'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {emotion.label}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Tell Us More</h3>
                <Textarea
                  placeholder="Describe how you're feeling and what kind of experience you're looking for... (e.g., 'I'm feeling overwhelmed at work and need a peaceful place to disconnect and recharge')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] resize-none text-foreground placeholder:text-muted-foreground border-border focus:border-primary"
                />
              </div>

              {/* Selected Emotions Display */}
              {selectedEmotions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-foreground">Selected Emotions:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmotions.map(emotionId => {
                      const emotion = emotionOptions.find(e => e.id === emotionId);
                      if (!emotion) return null;
                      
                      return (
                        <Badge key={emotionId} variant="secondary" className="px-3 py-1">
                          {emotion.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Next Button */}
              <div className="text-center">
                <Button 
                  type="button"
                  onClick={handleNextStep}
                  disabled={selectedEmotions.length === 0}
                  className="bg-gradient-ocean text-white px-8 py-6 text-lg font-semibold rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                >
                  Next: What Change Do You Need?
                </Button>
              </div>
            </div>
          ) : (
            /* Step 2: Desired Change & Group Dynamics */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Back Button */}
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBackToFirst}
                className="mb-4"
              >
                ← Back to Emotions
              </Button>

              {/* Desired Change Selection */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground">What kind of change do you need?</h3>
                <p className="text-muted-foreground mb-6">Based on your emotional state, what transformation are you seeking?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {desiredChangeOptions.map((option) => (
                    <Button
                      key={option.id}
                      type="button"
                      variant="outline"
                      onClick={() => setDesiredChange(option.id)}
                      className={`h-auto p-6 flex flex-col items-start gap-2 text-left transition-all duration-300 ${
                        desiredChange === option.id
                          ? 'border-primary bg-primary/10 shadow-soft' 
                          : 'border-border hover:border-primary/50 hover:shadow-soft'
                      }`}
                    >
                      <span className={`text-lg font-semibold ${desiredChange === option.id ? 'text-primary' : 'text-foreground'}`}>
                        {option.label}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {option.description}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Group Size Selection */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  How many people are traveling with you?
                </h3>
                <p className="text-muted-foreground mb-6">We'll recommend destinations perfect for your group size and social dynamics.</p>
                <Select value={groupSize} onValueChange={setGroupSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your group size" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Summary */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Your Travel Profile:</h3>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Emotions:</span>
                    {selectedEmotions.map(emotionId => {
                      const emotion = emotionOptions.find(e => e.id === emotionId);
                      return emotion ? (
                        <Badge key={emotionId} variant="secondary" className="text-xs">
                          {emotion.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  {desiredChange && (
                    <div>
                      <span className="text-sm text-muted-foreground">Seeking: </span>
                      <Badge variant="secondary">
                        {desiredChangeOptions.find(o => o.id === desiredChange)?.label}
                      </Badge>
                    </div>
                  )}
                  {groupSize && (
                    <div>
                      <span className="text-sm text-muted-foreground">Group: </span>
                      <Badge variant="secondary">
                        {groupSizeOptions.find(o => o.value === groupSize)?.label}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={!desiredChange || !groupSize || isSubmitting}
                  className="bg-gradient-ocean text-white px-8 py-6 text-lg font-semibold rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Analyzing Your Perfect Match...
                    </>
                  ) : (
                    'Find My Perfect Destination'
                  )}
                </Button>
              </div>
            </form>
          )}
          </Card>
        )}
      </div>
    </section>
  );
};