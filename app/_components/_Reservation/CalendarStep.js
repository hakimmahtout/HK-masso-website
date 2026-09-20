"use client";

import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { format, isPast, isSameDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Legend from "@/app/_components/_Reservation/Legend";
import { getAvailableDates } from "@/app/_lib/data-service";
import { setDate } from "@/app/_lib/features/booking/bookingSlice";
import CalendarError from "@/app/_components/_Reservation/CalendarError";
import CalendarSkeleton from "@/app/_components/_Reservation/CalendarSkeleton";

const classNames = {
  months: "flex flex-col space-y-4",
  month: "space-y-4 w-full",
  caption: "flex justify-between items-center mb-4",
  caption_label: "text-base font-bold text-foreground capitalize",
  nav: "flex items-center gap-1",
  button_previous:
    "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed",
  button_next:
    "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed",
  month_grid: "w-full border-collapse",
  weekdays:
    "grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-2",
  weekday: "py-2 font-semibold",
  week: "grid grid-cols-7 gap-1 mt-1",
  day: "relative flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none",
  day_button:
    "flex h-full w-full items-center justify-center rounded-xl transition-all",
  selected: "!bg-primary !text-primary-foreground font-semibold shadow-md",
  today: "border border-primary text-primary font-bold",
  disabled:
    "text-muted-foreground/35 cursor-not-allowed bg-transparent hover:bg-transparent pointer-events-none",
  outside: "opacity-30",
};

export default function CalendarStep({ setIsValid }) {
  const dispatch = useDispatch();

  const worker = useSelector((store) => store.booking.worker);
  const duration = useSelector((store) => store.booking.duration);
  const date = useSelector((store) => store.booking.date);

  // 1. Destructure data with a fallback object to prevent destructuring undefined
  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableDates", worker?._id, duration],
    queryFn: () => getAvailableDates({ workerId: worker?._id, duration }),
    // Both worker and duration must exist before running
    enabled: Boolean(worker?._id) && Boolean(duration),
  });

  // Extract nested properties safely with default empty arrays
  const unavailableDates = data?.unavailableDates || [];
  const availableDates = data?.availableDates || [];

  // 2. Auto-select first available date
  useEffect(() => {
    if (availableDates.length > 0 && !date) {
      dispatch(setDate(availableDates[0]));
    }
  }, [availableDates, date, dispatch]);

  // 3. Notify parent component of form validity
  useEffect(() => {
    if (setIsValid) {
      setIsValid(Boolean(date) && availableDates.length);
    }
  }, [date, availableDates, setIsValid]);

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  if (isError) {
    return <CalendarError error={error} />;
  }

  return (
    <div className="w-full max-w-xl">
      <DayPicker
        mode="single"
        selected={date}
        onSelect={(selected) => {
          if (selected) {
            const localFormattedDate = format(selected, "yyyy-MM-dd");
            dispatch(setDate(localFormattedDate));
          }
        }}
        weekStartsOn={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          unavailableDates.some((unavailDate) =>
            isSameDay(new Date(unavailDate), curDate),
          )
        }
        components={{
          Chevron: ({ orientation }) =>
            orientation === "left" ? (
              <ChevronLeft className="h-4.5 w-4.5" />
            ) : (
              <ChevronRight className="h-4.5 w-4.5" />
            ),
        }}
        classNames={classNames}
        // modifiersClassNames={{
        //   available:
        //     "text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer",
        // }}
      />

      <Legend />
    </div>
  );
}
