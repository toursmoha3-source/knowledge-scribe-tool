import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ToursConnect</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Connecting travelers with certified, professional tour guides for safe and authentic travel experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* For Travelers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Travelers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Find Guides</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Browse Itineraries</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Travel Tips</a></li>
            </ul>
          </div>

          {/* For Guides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Guides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Join as Guide</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Create Itineraries</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Certification</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Guide Resources</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Premium Features</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-background/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@toursconnect.com</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-background/80 text-sm">
              © {currentYear} ToursConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-background/80 hover:text-primary transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors text-sm">
                Accessibility
              </a>
              <a href="#" className="text-background/80 hover:text-primary transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;