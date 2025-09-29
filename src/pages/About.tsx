import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Globe, Award, Heart, Star, CheckCircle, Target, Eye, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Certified Guides", value: "500+", icon: Users },
    { label: "Countries Covered", value: "85+", icon: Globe },
    { label: "Happy Travelers", value: "25K+", icon: Heart },
    { label: "5-Star Reviews", value: "15K+", icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our guides are thoroughly vetted, certified, and insured to ensure your safety and peace of mind during every adventure."
    },
    {
      icon: Target,
      title: "Authentic Experiences",
      description: "We connect you with local experts who provide genuine, immersive experiences that go beyond typical tourist attractions."
    },
    {
      icon: Award,
      title: "Excellence Standards",
      description: "We maintain the highest standards of service quality through continuous training, monitoring, and feedback systems."
    },
    {
      icon: Heart,
      title: "Sustainable Tourism",
      description: "We promote responsible travel practices that benefit local communities and preserve cultural and natural heritage."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300",
      bio: "Former travel journalist with 15 years of experience exploring 75+ countries."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Guide Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Travel industry veteran focused on guide certification and quality assurance."
    },
    {
      name: "Amira Hassan",
      role: "Cultural Experience Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Anthropologist passionate about preserving and sharing cultural heritage through travel."
    },
    {
      name: "James Thompson",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Building innovative platforms that connect travelers with authentic local experiences."
    }
  ];

  const milestones = [
    { year: "2019", title: "Company Founded", description: "Started with a vision to revolutionize travel through authentic local connections." },
    { year: "2020", title: "Platform Launch", description: "Launched our first marketplace connecting travelers with certified guides." },
    { year: "2021", title: "Global Expansion", description: "Expanded to 25 countries with over 100 certified guides." },
    { year: "2022", title: "10K Travelers", description: "Reached milestone of 10,000 happy travelers and 5,000 five-star reviews." },
    { year: "2023", title: "Premium Services", description: "Launched premium guide services and custom itinerary planning." },
    { year: "2024", title: "Global Leader", description: "Now serving 85+ countries with 500+ certified guides and 25K+ travelers." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                About
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ToursConnect
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing travel by connecting adventurous souls with passionate local guides who share their knowledge, culture, and hidden gems to create unforgettable authentic experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Community
                </Button>
                <Button variant="outline" size="lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Destinations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To democratize authentic travel experiences by connecting curious travelers with passionate local guides who share their culture, knowledge, and love for their homeland. We believe every journey should be transformative, sustainable, and deeply meaningful.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To become the world's most trusted platform for authentic travel experiences, fostering cultural understanding and sustainable tourism that benefits both travelers and local communities across the globe.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600" 
                  alt="Travelers exploring beautiful destinations with local guides"
                  className="w-full rounded-2xl shadow-elegant"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elegant max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="font-semibold">Trusted Platform</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All guides verified with background checks and certifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape the experiences we create for our travelers and guide community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate travel enthusiasts and industry experts dedicated to creating exceptional experiences for our global community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From a simple idea to a global platform connecting travelers with authentic local experiences worldwide.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-16 bg-gradient-to-b from-primary to-accent mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-bold">{milestone.year}</Badge>
                        <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of travelers who have discovered the world through authentic local experiences. 
                Whether you're seeking cultural immersion, historical insights, or hidden gems, our certified guides are ready to show you their world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Find a Guide
                </Button>
                <Button variant="outline" size="lg">
                  <Award className="w-5 h-5 mr-2" />
                  Become a Guide
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;