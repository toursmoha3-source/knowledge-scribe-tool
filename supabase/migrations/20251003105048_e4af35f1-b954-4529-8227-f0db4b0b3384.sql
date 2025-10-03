-- Fix the search_path security issue by replacing the function
DROP TRIGGER IF EXISTS on_booking_status_change ON public.bookings;
DROP FUNCTION IF EXISTS update_guide_availability_on_booking() CASCADE;

CREATE OR REPLACE FUNCTION update_guide_availability_on_booking()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Recreate the trigger
CREATE TRIGGER on_booking_status_change
AFTER INSERT OR UPDATE OF status ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION update_guide_availability_on_booking();