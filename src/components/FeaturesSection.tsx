import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Users, Star, Clock, Award } from "lucide-react";
import guideImage from "@/assets/guide-expertise.jpg";
import itineraryImage from "@/assets/itinerary-showcase.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All guides are thoroughly vetted with proper certifications, licenses, and background checks.",
      color: "text-accent"
    },
    {
      icon: MapPin,
      title: "Global Destinations",
      description: "Explore amazing destinations worldwide with local experts who know hidden gems.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Custom itineraries tailored to your interests, budget, and travel style.",
      color: "text-nature"
    },
    {
      icon: Star,
      title: "Rated & Reviewed",
      description: "Transparent rating system based on real traveler experiences and feedback.",
      color: "text-adventure"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure your journey is smooth and memorable.",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "Premium Service",
      description: "Access to exclusive experiences and top-rated guides for unforgettable adventures.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="text-primary">MohaTours</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We connect travelers with certified, professional guides to ensure safe, 
            authentic, and unforgettable travel experiences worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-background shadow-warm">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-lg text-muted-foreground">
              Join thousands of travelers who have discovered amazing destinations 
              with our certified guides. Your next adventure awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="group">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Find a Guide
              </Button>
              <Button variant="outline" size="lg" className="group">
                <MapPin className="w-5 h-5 group-hover:bounce transition-transform" />
                Explore Destinations
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src={guideImage} 
                  alt="Professional tour guides with expertise and certifications" 
                  className="w-full rounded-xl shadow-warm hover:shadow-xl transition-shadow"
                />
                <div className="bg-card p-4 rounded-xl shadow-warm">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Guide Rating</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-8">
                <div className="bg-card p-4 rounded-xl shadow-warm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="font-semibold">100%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Guides</p>
                </div>
                <img 
                  src={itineraryImage} 
                  alt="Custom travel itineraries and planning showcase" 
                  className="w-full rounded-xl shadow-warm hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;