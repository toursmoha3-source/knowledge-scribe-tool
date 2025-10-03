import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Edit, Star, MapPin, Languages, Award, Calendar, 
  DollarSign, Camera, Settings, Bell, Shield, TrendingUp, Upload, MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { GuideMessaging } from "./GuideMessaging";
import { GuideCalendar } from "./GuideCalendar";
import { GuideBookings } from "./GuideBookings";

export const ProfileDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [guideProfile, setGuideProfile] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  
  const [profile, setProfile] = useState({
    fullName: "",
    bio: "",
    location: "",
    languages: [] as string[],
    specializations: [] as string[],
    hourlyRate: 0,
    yearsExperience: 0,
    phone: "",
    website: "",
    certifications: [] as string[],
    availability: true,
    emailNotifications: true,
    smsNotifications: false
  });

  useEffect(() => {
    if (user) {
      loadProfile();
      loadGuideProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setUserProfile(data);
        setProfile({
          fullName: data.full_name || "",
          bio: data.bio || "",
          location: data.location || "",
          languages: data.languages || [],
          specializations: [],
          hourlyRate: 0,
          yearsExperience: 0,
          phone: data.phone || "",
          website: "",
          certifications: [],
          availability: true,
          emailNotifications: true,
          smsNotifications: false
        });
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGuideProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') return;
      
      if (data) {
        setGuideProfile(data);
        setProfile(prev => ({
          ...prev,
          specializations: data.specializations || [],
          hourlyRate: data.hourly_rate || 0,
          yearsExperience: data.experience_years || 0,
          certifications: data.certifications || [],
        }));
      }
    } catch (error) {
      console.error('Error loading guide profile:', error);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      setAvatarUrl(publicUrl);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          full_name: profile.fullName,
          bio: profile.bio,
          location: profile.location,
          languages: profile.languages,
          phone: profile.phone,
          avatar_url: avatarUrl,
        });

      if (profileError) throw profileError;

      // Update or create guides table entry
      const { error: guideError } = await supabase
        .from('guides')
        .upsert({
          user_id: user?.id,
          specializations: profile.specializations,
          hourly_rate: profile.hourlyRate,
          experience_years: profile.yearsExperience,
          certifications: profile.certifications,
        });

      if (guideError) throw guideError;

      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated and will be visible once approved by admin.",
      });
      
      await loadGuideProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  const stats = {
    totalBookings: guideProfile?.total_bookings || 0,
    rating: guideProfile?.rating || 0,
    totalReviews: guideProfile?.total_reviews || 0,
    revenue: 0,
    responseRate: 98,
    responseTime: "< 1 hour"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and track your performance</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
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
                      <p className="text-sm text-muted-foreground">Reviews</p>
                      <p className="text-2xl font-bold">{stats.totalReviews}</p>
                    </div>
                    <Star className="w-8 h-8 text-primary" />
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
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!guideProfile?.is_approved && (
                    <div className="p-4 border border-yellow-500 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <p className="text-sm font-medium">Profile Under Review</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your profile is currently being reviewed by our admin team. Once approved, it will be visible to travelers.
                      </p>
                    </div>
                  )}
                  
                  {!guideProfile && (
                    <div className="p-4 border border-primary rounded-lg">
                      <p className="text-sm font-medium">Complete Your Guide Profile</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fill in your profile information in the "Profile" tab to start receiving bookings.
                      </p>
                      <Button onClick={() => setIsEditing(true)} className="mt-3">
                        Get Started
                      </Button>
                    </div>
                  )}
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
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{profile.fullName?.substring(0, 2).toUpperCase() || "GU"}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label htmlFor="avatar-upload">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute -bottom-2 -right-2 cursor-pointer"
                          disabled={uploading}
                          asChild
                        >
                          <span>
                            {uploading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" /> : <Camera className="w-4 h-4" />}
                          </span>
                        </Button>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                          disabled={uploading}
                        />
                      </label>
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

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Client Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GuideMessaging />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            {guideProfile ? (
              <GuideBookings guideId={guideProfile.id} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    Please complete your guide profile first to manage bookings.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            {guideProfile && (
              <GuideCalendar guideId={guideProfile.id} isOwnCalendar={true} />
            )}
            {!guideProfile && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Please complete your guide profile first to access the calendar.
                </CardContent>
              </Card>
            )}
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