import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Star, DollarSign, Calendar, Users, Languages, X } from "lucide-react";

interface FilterProps {
  onFiltersChange: (filters: any) => void;
  type?: 'guides' | 'itineraries' | 'hotels';
}

export const SearchFilters = ({ onFiltersChange, type = 'guides' }: FilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [groupSize, setGroupSize] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const locations = [
    "Barcelona, Spain", "Cairo, Egypt", "Kyoto, Japan", "Rome, Italy", 
    "London, UK", "Rio de Janeiro, Brazil", "Paris, France", "Tokyo, Japan",
    "New York, USA", "Sydney, Australia"
  ];

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Japanese", "Mandarin", "Arabic", "Russian"
  ];

  const guideSpecialties = [
    "Architecture", "Food Tours", "History", "Museums", "Cultural Tours",
    "Nature & Adventure", "Photography", "Art & Design", "Religious Sites",
    "Local Experiences", "Shopping", "Nightlife"
  ];

  const itinerarySpecialties = [
    "Cultural & Historical", "Adventure & Nature", "Food & Wine",
    "Architecture & Art", "Religious & Spiritual", "Beach & Coastal",
    "Urban Exploration", "Wildlife & Safari", "Photography Tours",
    "Luxury Experiences", "Family-Friendly", "Romantic Getaways"
  ];

  const specialties = type === 'itineraries' ? itinerarySpecialties : guideSpecialties;

  const handleFilterChange = () => {
    const filters = {
      searchQuery,
      location,
      priceRange,
      rating,
      language,
      specialty,
      dateRange,
      groupSize
    };
    onFiltersChange(filters);
  };

  const addFilter = (filterType: string, value: string) => {
    const filterLabel = `${filterType}: ${value}`;
    if (!selectedFilters.includes(filterLabel)) {
      setSelectedFilters([...selectedFilters, filterLabel]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 500]);
    setRating("");
    setLanguage("");
    setSpecialty("");
    setDateRange({ start: "", end: "" });
    setGroupSize("");
    setSelectedFilters([]);
    onFiltersChange({});
  };

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder={`Search ${type}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          {selectedFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <Select value={location} onValueChange={(value) => {
            setLocation(value);
            addFilter("Location", value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Price Range
          </label>
          <div className="px-3 py-2 border rounded-md">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4" />
            Minimum Rating
          </label>
          <Select value={rating} onValueChange={(value) => {
            setRating(value);
            addFilter("Rating", `${value}+ stars`);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.5">4.5+ stars</SelectItem>
              <SelectItem value="4.0">4.0+ stars</SelectItem>
              <SelectItem value="3.5">3.5+ stars</SelectItem>
              <SelectItem value="3.0">3.0+ stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1">
            <Languages className="w-4 h-4" />
            Language
          </label>
          <Select value={language} onValueChange={(value) => {
            setLanguage(value);
            addFilter("Language", value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range for Itineraries */}
      {type === 'itineraries' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Start Date
            </label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Additional Filters */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Specialty</label>
          <Select value={specialty} onValueChange={(value) => {
            setSpecialty(value);
            addFilter("Specialty", value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Any specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {type !== 'guides' && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Users className="w-4 h-4" />
              Group Size
            </label>
            <Select value={groupSize} onValueChange={(value) => {
              setGroupSize(value);
              addFilter("Group Size", value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Any size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 people</SelectItem>
                <SelectItem value="3-5">3-5 people</SelectItem>
                <SelectItem value="6-10">6-10 people</SelectItem>
                <SelectItem value="10+">10+ people</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleFilterChange} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>
    </div>
  );
};