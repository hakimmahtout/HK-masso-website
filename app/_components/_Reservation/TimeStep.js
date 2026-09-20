"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Clock3 } from "lucide-react";
import { useTranslations } from "next-intl";

import { getAvailableTimes } from "@/app/_lib/data-service";
import { setTime } from "@/app/_lib/features/booking/bookingSlice";
import TimesError from "@/app/_components/_Reservation/TimesError";
import TimesSkeleton from "@/app/_components/_Reservation/TimesSkeleton";
import TimesEmpty from "@/app/_components/_Reservation/TimesEmpty";

export default function TimeStep({ setIsValid }) {
  const t = useTranslations("TimeStep");
  const dispatch = useDispatch();

  const worker = useSelector((store) => store.booking.worker);
  const duration = useSelector((store) => store.booking.duration);
  const date = useSelector((store) => store.booking.date);
  const startTime = useSelector((store) => store.booking.startTime);

  const {
    data: availableTimes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableTimes", worker?._id, duration, date],
    queryFn: () => getAvailableTimes({ workerId: worker?._id, duration, date }),
    enabled: Boolean(worker?._id) && Boolean(date) && Boolean(duration),
  });

  useEffect(() => {
    if (availableTimes.length > 0 && !startTime) {
      dispatch(setTime(availableTimes[0]));
    }
  }, [availableTimes, startTime, dispatch]);

  useEffect(() => {
    if (setIsValid) {
      setIsValid(Boolean(startTime) && availableTimes.length > 0);
    }
  }, [startTime, availableTimes, setIsValid]);

  if (isLoading) {
    return <TimesSkeleton />;
  }

  if (isError) {
    return <TimesError error={error} />;
  }

  if (availableTimes.length === 0) {
    return <TimesEmpty />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock3 size={17} /> {t("localTimeNotice")}
      </div>

      {/* Scrollable Container with Min & Max Heights */}
      <div className="mt-5 min-h-55 max-h-85 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {availableTimes.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => dispatch(setTime(time))}
              className={`flex h-11 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                startTime === time
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
