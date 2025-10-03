-- Insert 2 test guide users with profiles
-- Note: These users need to be created via Supabase Auth UI or signup flow
-- We'll create profiles and guide records that will link when users sign up with these emails

-- Create guide availability table
CREATE TABLE IF NOT EXISTS public.guide_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  slots_total INTEGER DEFAULT 1,
  slots_booked INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(guide_id, date)
);

-- Enable RLS
ALTER TABLE public.guide_availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies for guide availability
CREATE POLICY "Anyone can view guide availability"
ON public.guide_availability
FOR SELECT
USING (true);

CREATE POLICY "Guides can manage their own availability"
ON public.guide_availability
FOR ALL
USING (guide_id IN (SELECT id FROM guides WHERE user_id = auth.uid()));

-- Update bookings table to link with availability
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE;

-- Update existing bookings to have start_date from booking_date
UPDATE public.bookings SET start_date = booking_date WHERE start_date IS NULL;

-- Function to update availability when booking is confirmed
CREATE OR REPLACE FUNCTION update_guide_availability_on_booking()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND (OLD.status IS NULL OR OLD.status != 'confirmed') THEN
    -- Mark dates as booked
    INSERT INTO public.guide_availability (guide_id, date, is_available, slots_booked)
    VALUES (NEW.guide_id, NEW.booking_date, false, 1)
    ON CONFLICT (guide_id, date) 
    DO UPDATE SET slots_booked = guide_availability.slots_booked + 1, 
                  is_available = false;
  ELSIF OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
    -- Free up the date if booking cancelled
    UPDATE public.guide_availability 
    SET slots_booked = GREATEST(0, slots_booked - 1),
        is_available = CASE WHEN slots_booked - 1 <= 0 THEN true ELSE false END
    WHERE guide_id = NEW.guide_id AND date = NEW.booking_date;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking confirmations
CREATE TRIGGER on_booking_status_change
AFTER INSERT OR UPDATE OF status ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION update_guide_availability_on_booking();

-- Enable realtime for availability
ALTER PUBLICATION supabase_realtime ADD TABLE public.guide_availability;