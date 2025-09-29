import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Users, Star, Thermometer, Plane, Camera, Filter } from "lucide-react";

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  
  // Mock data for destinations
  const destinations = [
    {
      id: 1,
      name: "Barcelona",
      country: "Spain",
      continent: "Europe",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800",
      description: "A vibrant city known for its stunning architecture, delicious cuisine, and rich cultural heritage.",
      avgTemp: "18°C",
      bestMonths: ["Apr", "May", "Sep", "Oct"],
      guides: 23,
      itineraries: 45,
      rating: 4.8,
      reviews: 1247,
      highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter", "La Rambla"],
      categories: ["Architecture", "Culture", "Food & Wine", "Art"],
      popularWith: ["Couples", "Solo Travelers", "Architecture Enthusiasts"]
    },
    {
      id: 2,
      name: "Kyoto",
      country: "Japan",
      continent: "Asia",
      image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800",
      description: "Ancient capital with thousands of temples, traditional gardens, and preserved cultural districts.",
      avgTemp: "16°C",
      bestMonths: ["Mar", "Apr", "Nov", "Dec"],
      guides: 18,
      itineraries: 32,
      rating: 4.9,
      reviews: 892,
      highlights: ["Fushimi Inari Shrine", "Bamboo Grove", "Gion District", "Kinkaku-ji"],
      categories: ["Temples", "Traditional Culture", "Gardens", "History"],
      popularWith: ["Culture Seekers", "Photographers", "Spiritual Travelers"]
    },
    {
      id: 3,
      name: "Cairo",
      country: "Egypt",
      continent: "Africa",
      image: "https://images.unsplash.com/photo-1593951085734-e8f8b88deb3b?w=800",
      description: "Home to ancient wonders including the Great Pyramids and the Sphinx, with rich Islamic heritage.",
      avgTemp: "22°C",
      bestMonths: ["Oct", "Nov", "Mar", "Apr"],
      guides: 15,
      itineraries: 28,
      rating: 4.7,
      reviews: 1156,
      highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili", "Coptic Cairo"],
      categories: ["Ancient History", "Museums", "Architecture", "Markets"],
      popularWith: ["History Buffs", "Adventure Seekers", "Families"]
    },
    {
      id: 4,
      name: "Rome",
      country: "Italy",
      continent: "Europe",
      image: "https://images.unsplash.com/photo-1552832230-c0197040cd02?w=800",
      description: "The Eternal City, where ancient Roman ruins coexist with Renaissance art and modern Italian life.",
      avgTemp: "17°C",
      bestMonths: ["Apr", "May", "Sep", "Oct"],
      guides: 31,
      itineraries: 67,
      rating: 4.8,
      reviews: 2134,
      highlights: ["Colosseum", "Vatican City", "Trevi Fountain", "Roman Forum"],
      categories: ["Ancient History", "Art", "Religion", "Food & Wine"],
      popularWith: ["Art Lovers", "History Enthusiasts", "Pilgrims"]
    },
    {
      id: 5,
      name: "London",
      country: "United Kingdom",
      continent: "Europe",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
      description: "A global city rich in history, culture, and royal heritage with world-class museums and theaters.",
      avgTemp: "12°C",
      bestMonths: ["May", "Jun", "Jul", "Aug"],
      guides: 42,
      itineraries: 78,
      rating: 4.6,
      reviews: 1876,
      highlights: ["Big Ben", "Tower Bridge", "British Museum", "Buckingham Palace"],
      categories: ["Royal Heritage", "Museums", "Theater", "Markets"],
      popularWith: ["Royal Enthusiasts", "Theater Lovers", "Museum Goers"]
    },
    {
      id: 6,
      name: "Rio de Janeiro",
      country: "Brazil",
      continent: "South America",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
      description: "Marvelous city known for its beaches, carnival, Christ the Redeemer statue, and vibrant culture.",
      avgTemp: "24°C",
      bestMonths: ["Apr", "May", "Jun", "Sep"],
      guides: 19,
      itineraries: 34,
      rating: 4.7,
      reviews: 943,
      highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana", "Santa Teresa"],
      categories: ["Beaches", "Nature", "Culture", "Music & Dance"],
      popularWith: ["Beach Lovers", "Party Enthusiasts", "Nature Seekers"]
    }
  ];

  const continents = ["All Continents", "Europe", "Asia", "Africa", "South America", "North America", "Oceania"];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.highlights.some(highlight => highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesContinent = !selectedContinent || selectedContinent === "All Continents" || destination.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-nature/10 via-background to-adventure/10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Discover Amazing
                <span className="block bg-gradient-to-r from-nature to-adventure bg-clip-text text-transparent">
                  Destinations
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore the world's most incredible destinations with our expert local guides. From ancient wonders to modern marvels, find your next adventure.
              </p>
              
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search destinations, countries, or attractions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                  <SelectTrigger className="md:w-52 h-12">
                    <SelectValue placeholder="Continent" />
                  </SelectTrigger>
                  <SelectContent>
                    {continents.map((continent) => (
                      <SelectItem key={continent} value={continent}>
                        {continent}
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
                {filteredDestinations.length} Destinations Available
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Sort by:</span>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="guides">Most Guides</SelectItem>
                    <SelectItem value="itineraries">Most Itineraries</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={destination.image}
                        alt={`${destination.name}, ${destination.country}`}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-2xl font-bold">{destination.name}</CardTitle>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-1" />
                              {destination.country}
                            </div>
                          </div>
                          <Badge variant="secondary">{destination.continent}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{destination.rating}</span>
                            <span className="text-muted-foreground">({destination.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Thermometer className="w-4 h-4 text-muted-foreground" />
                            <span>{destination.avgTemp}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {destination.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-sm mb-1">Best Months:</p>
                            <div className="flex gap-1">
                              {destination.bestMonths.map((month) => (
                                <Badge key={month} variant="outline" className="text-xs">
                                  {month}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-medium text-sm mb-1">Top Highlights:</p>
                            <div className="flex flex-wrap gap-1">
                              {destination.highlights.slice(0, 3).map((highlight) => (
                                <Badge key={highlight} variant="secondary" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                              {destination.highlights.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{destination.highlights.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {destination.guides} guides
                            </div>
                            <div className="flex items-center gap-1">
                              <Camera className="w-4 h-4" />
                              {destination.itineraries} tours
                            </div>
                          </div>
                          <Button variant="default" size="sm">
                            <Plane className="w-4 h-4 mr-2" />
                            Explore
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or continent filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;