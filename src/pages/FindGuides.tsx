import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchFilters } from "@/components/SearchFilters";
import { BookingCard } from "@/components/BookingCard";
import { MessagingSystem } from "@/components/MessagingSystem";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Users, Star, Clock, Award, MessageCircle, Calendar, Search } from "lucide-react";

const FindGuides = () => {
  const [filters, setFilters] = useState<any>({});
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for guides
  const guides = [
    {
      id: 1,
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      specializations: ["Architecture", "Food Tours", "History"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400",
      isVerified: true,
      languages: ["English", "Spanish", "French"],
      yearsExperience: 8
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      location: "Cairo, Egypt",
      rating: 4.8,
      reviews: 93,
      hourlyRate: 35,
      specializations: ["Ancient History", "Museums", "Cultural Tours"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      isVerified: true,
      languages: ["Arabic", "English", "German"],
      yearsExperience: 12
    },
    {
      id: 3,
      name: "Sakura Tanaka",
      location: "Kyoto, Japan",
      rating: 5.0,
      reviews: 89,
      hourlyRate: 60,
      specializations: ["Traditional Culture", "Gardens", "Temples"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      isVerified: true,
      languages: ["Japanese", "English", "Mandarin"],
      yearsExperience: 6
    },
    {
      id: 4,
      name: "Giovanni Romano",
      location: "Rome, Italy",
      rating: 4.9,
      reviews: 156,
      hourlyRate: 50,
      specializations: ["Ancient Rome", "Vatican", "Art History"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      isVerified: true,
      languages: ["Italian", "English", "Spanish"],
      yearsExperience: 10
    },
    {
      id: 5,
      name: "Emma Thompson",
      location: "London, UK",
      rating: 4.7,
      reviews: 74,
      hourlyRate: 55,
      specializations: ["Royal History", "Literature", "Museums"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      isVerified: true,
      languages: ["English", "French"],
      yearsExperience: 5
    },
    {
      id: 6,
      name: "Carlos Silva",
      location: "Rio de Janeiro, Brazil",
      rating: 4.8,
      reviews: 112,
      hourlyRate: 40,
      specializations: ["Beach Tours", "Nature", "Local Culture"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      isVerified: true,
      languages: ["Portuguese", "English", "Spanish"],
      yearsExperience: 7
    }
  ];

  const locations = ["All Locations", "Barcelona, Spain", "Cairo, Egypt", "Kyoto, Japan", "Rome, Italy", "London, UK", "Rio de Janeiro, Brazil"];

  const filteredGuides = guides.filter(guide => {
    if (filters.searchQuery) {
      const matchesSearch = guide.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           guide.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           guide.specializations.some(spec => spec.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      if (!matchesSearch) return false;
    }
    
    if (filters.location && guide.location !== filters.location) return false;
    if (filters.rating && guide.rating < parseFloat(filters.rating)) return false;
    if (filters.priceRange && (guide.hourlyRate < filters.priceRange[0] || guide.hourlyRate > filters.priceRange[1])) return false;
    if (filters.language && !guide.languages.includes(filters.language)) return false;
    if (filters.specialty && !guide.specializations.includes(filters.specialty)) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Travel Guide
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with verified, professional tour guides worldwide. Discover hidden gems and create unforgettable memories with local experts.
              </p>
              
              {/* Advanced Search Filters */}
              <div className="max-w-4xl mx-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="mb-4"
                >
                  {showFilters ? "Hide" : "Show"} Advanced Filters
                </Button>
                
                {showFilters && (
                  <div className="bg-card p-6 rounded-lg border mb-6">
                    <SearchFilters onFiltersChange={setFilters} type="guides" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {filteredGuides.length} Guides Available
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Sort by:</span>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={guide.image}
                        alt={`${guide.name} - Professional Tour Guide`}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {guide.isVerified && (
                        <Badge className="absolute top-3 right-3 bg-accent text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <CardTitle className="text-lg font-semibold">{guide.name}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {guide.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{guide.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">({guide.reviews} reviews)</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.specializations.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {guide.yearsExperience}y exp
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {guide.languages.length} languages
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">${guide.hourlyRate}</span>
                        <span className="text-muted-foreground">/hour</span>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Send Message</DialogTitle>
                            </DialogHeader>
                            <MessagingSystem />
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => setSelectedGuide(guide)}
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              Book
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Book {guide.name}</DialogTitle>
                            </DialogHeader>
                            <BookingCard type="guide" item={guide} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No guides found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or location filter.</p>
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