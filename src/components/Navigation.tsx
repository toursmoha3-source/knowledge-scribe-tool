import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Users, Search, Heart } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MohaTours</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#guides" className="text-foreground hover:text-primary transition-colors font-medium">
              Find Guides
            </a>
            <a href="#itineraries" className="text-foreground hover:text-primary transition-colors font-medium">
              Itineraries
            </a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              Destinations
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Join as Guide
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <a 
                href="#guides" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <Users className="w-4 h-4" />
                <span>Find Guides</span>
              </a>
              <a 
                href="#itineraries" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <Search className="w-4 h-4" />
                <span>Itineraries</span>
              </a>
              <a 
                href="#destinations" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                <span>Destinations</span>
              </a>
              <a 
                href="#about" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>About</span>
              </a>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm" className="justify-start">
                  Sign In
                </Button>
                <Button variant="default" size="sm" className="justify-start">
                  Join as Guide
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;