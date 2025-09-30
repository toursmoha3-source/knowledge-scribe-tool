import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Edit, Star, MapPin, Languages, Award, Calendar, 
  DollarSign, Camera, Settings, Bell, Shield, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const ProfileDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Maria Rodriguez",
    bio: "Passionate Barcelona guide with 8+ years of experience specializing in architecture and gastronomy tours.",
    location: "Barcelona, Spain",
    languages: ["English", "Spanish", "French"],
    specializations: ["Architecture", "Food Tours", "History"],
    hourlyRate: 45,
    yearsExperience: 8,
    phone: "+34 123 456 789",
    website: "www.mariabarcelonatours.com",
    certifications: ["Licensed Tour Guide", "First Aid Certified"],
    availability: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const stats = {
    totalBookings: 342,
    rating: 4.9,
    totalReviews: 127,
    revenue: 15420,
    responseRate: 98,
    responseTime: "< 1 hour"
  };

  const recentBookings = [
    {
      id: 1,
      client: "John Smith",
      date: "2024-01-15",
      service: "Architecture Tour",
      status: "confirmed",
      amount: 180
    },
    {
      id: 2,
      client: "Emma Wilson",
      date: "2024-01-18",
      service: "Food & Culture Tour", 
      status: "pending",
      amount: 240
    },
    {
      id: 3,
      client: "David Chen",
      date: "2024-01-20",
      service: "Custom Barcelona Tour",
      status: "completed",
      amount: 320
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and track your performance</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold">{stats.rating}</p>
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">${stats.revenue}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Response Rate</p>
                      <p className="text-2xl font-bold">{stats.responseRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{booking.client}</h4>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {booking.status}
                        </Badge>
                        <p className="font-medium mt-1">${booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : <><Edit className="w-4 h-4 mr-2" /> Edit Profile</>}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2">
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{profile.fullName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {stats.rating} ({stats.totalReviews} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile.fullName}
                        onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => handleProfileUpdate('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profile.hourlyRate}
                        onChange={(e) => handleProfileUpdate('hourlyRate', parseInt(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => handleProfileUpdate('website', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            <Languages className="w-3 h-3 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Specializations</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.specializations.map((spec) => (
                          <Badge key={spec} variant="outline">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Certifications</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.certifications.map((cert) => (
                          <Badge key={cert} variant="default">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Booking management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Calendar and availability management would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Available for Bookings</h4>
                    <p className="text-sm text-muted-foreground">Allow new bookings to be made</p>
                  </div>
                  <Switch
                    checked={profile.availability}
                    onCheckedChange={(checked) => handleProfileUpdate('availability', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Email Notifications
                    </h4>
                    <p className="text-sm text-muted-foreground">Receive booking and message notifications via email</p>
                  </div>
                  <Switch
                    checked={profile.emailNotifications}
                    onCheckedChange={(checked) => handleProfileUpdate('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                  </div>
                  <Switch
                    checked={profile.smsNotifications}
                    onCheckedChange={(checked) => handleProfileUpdate('smsNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};