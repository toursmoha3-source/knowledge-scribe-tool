import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Users, Star, Calendar, Heart, Filter } from "lucide-react";

const Itineraries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  
  // Mock data for itineraries
  const itineraries = [
    {
      id: 1,
      title: "Ancient Wonders of Egypt",
      destination: "Cairo & Luxor, Egypt",
      duration: 7,
      price: 1299,
      rating: 4.9,
      reviews: 145,
      groupSize: "2-12 people",
      guideName: "Ahmed Hassan",
      images: ["https://images.unsplash.com/photo-1593951085734-e8f8b88deb3b?w=600"],
      highlights: ["Pyramids of Giza", "Valley of the Kings", "Karnak Temple", "Nile River Cruise"],
      difficulty: "Easy",
      category: "Cultural & Historical"
    },
    {
      id: 2,
      title: "Kyoto Temple & Garden Journey",
      destination: "Kyoto, Japan",
      duration: 4,
      price: 890,
      rating: 5.0,
      reviews: 98,
      groupSize: "1-8 people",
      guideName: "Sakura Tanaka",
      images: ["https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600"],
      highlights: ["Fushimi Inari Shrine", "Bamboo Grove", "Traditional Tea Ceremony", "Gion District"],
      difficulty: "Easy",
      category: "Cultural & Spiritual"
    },
    {
      id: 3,
      title: "Barcelona Architecture & Gastronomy",
      destination: "Barcelona, Spain",
      duration: 3,
      price: 649,
      rating: 4.8,
      reviews: 203,
      groupSize: "2-15 people",
      guideName: "Maria Rodriguez",
      images: ["https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600"],
      highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter", "Tapas Tour"],
      difficulty: "Moderate",
      category: "Architecture & Food"
    },
    {
      id: 4,
      title: "Roman Empire Discovery",
      destination: "Rome, Italy",
      duration: 5,
      price: 1150,
      rating: 4.9,
      reviews: 187,
      groupSize: "2-10 people",
      guideName: "Giovanni Romano",
      images: ["https://images.unsplash.com/photo-1552832230-c0197040cd02?w=600"],
      highlights: ["Colosseum Underground", "Vatican Museums", "Roman Forum", "Pantheon"],
      difficulty: "Easy",
      category: "Historical & Art"
    },
    {
      id: 5,
      title: "Royal London Heritage",
      destination: "London, UK",
      duration: 3,
      price: 749,
      rating: 4.7,
      reviews: 156,
      groupSize: "2-12 people",
      guideName: "Emma Thompson",
      images: ["https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600"],
      highlights: ["Tower of London", "Buckingham Palace", "Westminster Abbey", "British Museum"],
      difficulty: "Easy",
      category: "Royal & Museums"
    },
    {
      id: 6,
      title: "Rio Beach & Culture Adventure",
      destination: "Rio de Janeiro, Brazil",
      duration: 6,
      price: 999,
      rating: 4.8,
      reviews: 134,
      groupSize: "2-14 people",
      guideName: "Carlos Silva",
      images: ["https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600"],
      highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach", "Favela Tour"],
      difficulty: "Moderate",
      category: "Nature & Culture"
    }
  ];

  const durations = ["Any Duration", "1-3 days", "4-7 days", "8+ days"];
  const categories = ["All Categories", "Cultural & Historical", "Architecture & Food", "Nature & Culture", "Royal & Museums"];

  const filteredItineraries = itineraries.filter(itinerary => {
    const matchesSearch = itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         itinerary.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         itinerary.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDuration = !selectedDuration || selectedDuration === "Any Duration" || 
                           (selectedDuration === "1-3 days" && itinerary.duration <= 3) ||
                           (selectedDuration === "4-7 days" && itinerary.duration >= 4 && itinerary.duration <= 7) ||
                           (selectedDuration === "8+ days" && itinerary.duration >= 8);
    return matchesSearch && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-accent/10 via-background to-primary/10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Curated Travel
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Itineraries
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover expertly crafted travel itineraries designed by our certified guides. From cultural immersions to adventure tours, find your perfect journey.
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search itineraries, destinations, or activities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="md:w-48 h-12">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="default" size="lg" className="h-12 px-8">
                  <Filter className="w-5 h-5" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {filteredItineraries.length} Itineraries Found
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
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Itineraries Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItineraries.map((itinerary) => (
                <Card key={itinerary.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={itinerary.images[0]}
                        alt={itinerary.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className="bg-primary text-white">
                          {itinerary.duration} days
                        </Badge>
                        <Button variant="ghost" size="icon" className="w-8 h-8 bg-white/20 hover:bg-white/30 text-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <Badge className="absolute bottom-3 left-3 bg-card">
                        {itinerary.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2">{itinerary.title}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {itinerary.destination}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{itinerary.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">({itinerary.reviews} reviews)</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {itinerary.duration} days
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {itinerary.groupSize}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p className="font-medium text-foreground mb-1">Highlights:</p>
                        <div className="flex flex-wrap gap-1">
                          {itinerary.highlights.slice(0, 3).map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                          {itinerary.highlights.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{itinerary.highlights.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-2xl font-bold text-foreground">${itinerary.price}</span>
                        <span className="text-muted-foreground">/person</span>
                      </div>
                      <Button variant="default" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItineraries.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No itineraries found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or duration filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Itineraries;