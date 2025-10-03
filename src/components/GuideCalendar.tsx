import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

interface GuideCalendarProps {
  guideId: string;
  isOwnCalendar?: boolean;
}

interface AvailabilityData {
  date: string;
  is_available: boolean;
  slots_booked: number;
}

export const GuideCalendar = ({ guideId, isOwnCalendar = false }: GuideCalendarProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<AvailabilityData[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guideId) {
      loadAvailability();
    }
  }, [guideId]);

  const loadAvailability = async () => {
    setLoading(true);
    try {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());

      const { data, error } = await supabase
        .from('guide_availability')
        .select('*')
        .eq('guide_id', guideId)
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'));

      if (error) throw error;

      setAvailability(data || []);
      
      const booked = (data || [])
        .filter(d => !d.is_available)
        .map(d => new Date(d.date));
      setBookedDates(booked);

    } catch (error) {
      console.error('Error loading availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (date: Date) => {
    if (!isOwnCalendar) return;

    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const existing = availability.find(a => a.date === dateStr);

      if (existing) {
        // Toggle existing availability
        const { error } = await supabase
          .from('guide_availability')
          .update({ is_available: !existing.is_available })
          .eq('guide_id', guideId)
          .eq('date', dateStr);

        if (error) throw error;
      } else {
        // Create new availability record
        const { error } = await supabase
          .from('guide_availability')
          .insert({
            guide_id: guideId,
            date: dateStr,
            is_available: true
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Availability updated successfully",
      });

      loadAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  const getDateStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const avail = availability.find(a => a.date === dateStr);
    
    if (!avail) return null;
    if (!avail.is_available) return 'booked';
    return 'available';
  };

  const modifiers = {
    booked: bookedDates,
  };

  const modifiersClassNames = {
    booked: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Availability Calendar</span>
          {isOwnCalendar && (
            <Badge variant="outline">Click dates to toggle</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={isOwnCalendar ? toggleAvailability : setSelectedDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="rounded-md border pointer-events-auto"
          disabled={loading}
        />
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-destructive"></div>
            <span className="text-sm">Booked / Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border"></div>
            <span className="text-sm">Available</span>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold">
              {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Status: {getDateStatus(selectedDate) || 'Not set'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
