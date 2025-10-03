import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Languages, Shield, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { SearchFilters } from "@/components/SearchFilters";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookingCard } from "@/components/BookingCard";
import { GuideCalendar } from "@/components/GuideCalendar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const FindGuides = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: "",
    priceRange: [0, 100],
    rating: 0,
    language: "",
    specialty: ""
  });

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      let query = supabase
        .from('guides')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url,
            location,
            languages,
            bio
          )
        `)
        .eq('is_approved', true);

      const { data, error } = await query;

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error loading guides:', error);
      toast({
        title: "Error",
        description: "Failed to load guides. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactGuide = async (guide: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to contact guides.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create or get conversation
      const { data: existingConv, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .or(`and(participant_1.eq.${user.id},participant_2.eq.${guide.user_id}),and(participant_1.eq.${guide.user_id},participant_2.eq.${user.id})`)
        .single();

      if (convError && convError.code !== 'PGRST116') throw convError;

      if (!existingConv) {
        const { error: createError } = await supabase
          .from('conversations')
          .insert({
            participant_1: user.id,
            participant_2: guide.user_id
          });

        if (createError) throw createError;
      }

      toast({
        title: "Conversation Started",
        description: "Go to your dashboard to continue the conversation.",
      });
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredGuides = guides.filter(guide => {
    const matchesDestination = !filters.destination || 
      guide.profiles?.location?.toLowerCase().includes(filters.destination.toLowerCase());
    const matchesPrice = guide.hourly_rate >= filters.priceRange[0] && 
      guide.hourly_rate <= filters.priceRange[1];
    const matchesRating = guide.rating >= filters.rating;
    const matchesLanguage = !filters.language || 
      guide.profiles?.languages?.includes(filters.language);
    const matchesSpecialty = !filters.specialty || 
      guide.specializations?.includes(filters.specialty);

    return matchesDestination && matchesPrice && matchesRating && matchesLanguage && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Travel Guide
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Connect with verified, professional tour guides worldwide
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <SearchFilters onFiltersChange={setFilters} type="guides" />
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No guides found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="group hover:shadow-lg transition-all">
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={guide.profiles?.avatar_url || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400"}
                        alt={guide.profiles?.full_name || "Guide"}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {guide.is_approved && (
                          <Badge className="bg-primary">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {guide.is_premium && (
                          <Badge className="bg-secondary">Premium</Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{guide.profiles?.full_name || "Professional Guide"}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{guide.profiles?.location || "Location not specified"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{guide.rating}</span>
                          <span className="text-sm text-muted-foreground">({guide.total_reviews})</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {guide.profiles?.bio || "Professional tour guide with extensive experience"}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex flex-wrap gap-2">
                          {guide.specializations?.map((specialty: string) => (
                            <Badge key={specialty} variant="outline">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{guide.experience_years}y exp</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Languages className="w-4 h-4 text-primary" />
                            <span>{guide.profiles?.languages?.length || 0} languages</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold">${guide.hourly_rate}</span>
                          <span className="text-sm text-muted-foreground">/hour</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleContactGuide(guide)}
                            title="Contact Guide"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>

                          <Dialog open={showBooking && selectedGuide?.id === guide.id} onOpenChange={setShowBooking}>
                            <DialogTrigger asChild>
                              <Button onClick={() => setSelectedGuide(guide)}>
                                <Calendar className="w-4 h-4 mr-2" />
                                View & Book
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Book {guide.profiles?.full_name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <GuideCalendar guideId={guide.id} isOwnCalendar={false} />
                                <BookingCard
                                  type="guide"
                                  item={{
                                    id: guide.id,
                                    name: guide.profiles?.full_name,
                                    hourlyRate: guide.hourly_rate,
                                    image: guide.profiles?.avatar_url,
                                  }}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindGuides;
