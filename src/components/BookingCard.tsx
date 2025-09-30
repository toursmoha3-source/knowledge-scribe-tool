import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, Clock, DollarSign, Shield, CreditCard, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingCardProps {
  type: 'guide' | 'itinerary' | 'hotel';
  item: any;
  onBookingSubmit?: (bookingData: any) => void;
}

export const BookingCard = ({ type, item, onBookingSubmit }: BookingCardProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [groupSize, setGroupSize] = useState("1");
  const [duration, setDuration] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const basePrice = type === 'guide' ? item.hourlyRate : item.price;
  const totalPrice = type === 'guide' 
    ? (basePrice * parseInt(duration || "1") * parseInt(groupSize))
    : (basePrice * parseInt(groupSize));

  const handleBooking = async () => {
    if (!selectedDate || !groupSize) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    const bookingData = {
      type,
      itemId: item.id,
      date: selectedDate,
      groupSize: parseInt(groupSize),
      duration: type === 'guide' ? parseInt(duration || "1") : item.duration,
      specialRequests,
      totalAmount: totalPrice,
      paymentMethod
    };

    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onBookingSubmit) {
        onBookingSubmit(bookingData);
      }

      toast({
        title: "Booking Confirmed!",
        description: `Your ${type} booking has been successfully confirmed.`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${item.name || item.title}.`,
    });
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Book Now</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pricing Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">
              {type === 'guide' ? 'Hourly Rate' : 'Price per Person'}
            </span>
            <span className="text-2xl font-bold">${basePrice}</span>
          </div>
          {type === 'guide' && (
            <p className="text-sm text-muted-foreground">
              Minimum 2 hours booking
            </p>
          )}
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Select Date
            </Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupSize" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Group Size
            </Label>
            <Select value={groupSize} onValueChange={setGroupSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'person' : 'people'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === 'guide' && (
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Duration (hours)
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {[2,3,4,5,6,7,8].map(hours => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              placeholder="Any special requirements or preferences..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Total Calculation */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Base Price</span>
            <span>${basePrice}</span>
          </div>
          {type === 'guide' && duration && (
            <div className="flex justify-between text-sm">
              <span>Duration</span>
              <span>{duration} hours</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Group Size</span>
            <span>{groupSize} people</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-lg">${totalPrice}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={handleBooking} 
            disabled={isBooking || !selectedDate || !groupSize}
            className="w-full"
            size="lg"
          >
            {isBooking ? "Processing..." : `Book ${type === 'guide' ? 'Guide' : 'Trip'}`}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleMessage}
            className="w-full"
            size="lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-4 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Secure Payment
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Best Price Guarantee
          </div>
        </div>
      </CardContent>
    </Card>
  );
};