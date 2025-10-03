import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  booking_date: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  total_amount: number;
  group_size: number;
  special_requests: string | null;
  payment_status: string;
  created_at: string;
  tourist_profile?: {
    full_name: string;
    avatar_url: string;
    phone: string;
    user_id: string;
  };
  itinerary?: {
    title: string;
    destination: string;
  };
}

interface GuideBookingsProps {
  guideId: string;
}

export const GuideBookings = ({ guideId }: GuideBookingsProps) => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    loadBookings();
    subscribeToBookings();
  }, [guideId]);

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          tourist_profile:tourist_id (
            full_name,
            avatar_url,
            phone,
            user_id
          ),
          itinerary:itinerary_id (
            title,
            destination
          )
        `)
        .eq('guide_id', guideId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToBookings = () => {
    const channel = supabase
      .channel('guide-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `guide_id=eq.${guideId}`
        },
        () => {
          loadBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${newStatus === 'confirmed' ? 'accepted' : 'rejected'}`,
      });

      loadBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
      pending: { variant: "outline", icon: AlertCircle },
      confirmed: { variant: "default", icon: CheckCircle },
      rejected: { variant: "destructive", icon: XCircle },
      completed: { variant: "secondary", icon: CheckCircle },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filterBookings = (status: string) => {
    if (status === "all") return bookings;
    return bookings.filter(b => b.status === status);
  };

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={booking.tourist_profile?.avatar_url} />
              <AvatarFallback>
                {booking.tourist_profile?.full_name?.substring(0, 2).toUpperCase() || "GU"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {booking.tourist_profile?.full_name || "Guest"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {booking.tourist_profile?.phone || "No phone"}
              </p>
              {booking.itinerary && (
                <p className="text-sm text-muted-foreground mt-1">
                  Tour: {booking.itinerary.title}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(booking.status)}
            <p className="text-sm text-muted-foreground mt-2">
              {format(new Date(booking.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm font-medium">
                {format(new Date(booking.booking_date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Group Size</p>
              <p className="text-sm font-medium">{booking.group_size} people</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="text-sm font-medium">${booking.total_amount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="text-sm font-medium capitalize">{booking.payment_status}</p>
            </div>
          </div>
        </div>

        {booking.special_requests && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Special Requests:</p>
            <p className="text-sm">{booking.special_requests}</p>
          </div>
        )}

        <div className="flex gap-2">
          {booking.status === 'pending' && (
            <>
              <Button
                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button
                onClick={() => updateBookingStatus(booking.id, 'rejected')}
                variant="outline"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <Button
              onClick={() => updateBookingStatus(booking.id, 'completed')}
              variant="outline"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Completed
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">
            Pending {stats.pending > 0 && `(${stats.pending})`}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No bookings yet</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {filterBookings('pending').length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No pending bookings</p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('pending').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          {filterBookings('confirmed').length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No confirmed bookings</p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('confirmed').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {filterBookings('completed').length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No completed bookings</p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('completed').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          {filterBookings('rejected').length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <XCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No rejected bookings</p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('rejected').map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
