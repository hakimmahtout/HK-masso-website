"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { setWorker } from "@/app/_lib/features/booking/bookingSlice";
import { getAvailableWorkers } from "@/app/_lib/data-service";

import Rating from "@/app/_components/Rating";
import WorkersSkeleton from "@/app/_components/_Reservation/WorkersSkeleton";
import WorkersError from "@/app/_components/_Reservation/WorkersError";
import WorkersEmpty from "@/app/_components/_Reservation/WorkersEmpty";

export default function WorkerStep({ setIsValid }) {
  const dispatch = useDispatch();

  const worker = useSelector((store) => store.booking.worker);
  const { gender } = useSelector((store) => store.booking.guestDetails);

  const {
    data: workers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableWorkers", gender],
    queryFn: () => getAvailableWorkers(gender),
    enabled: Boolean(gender),
  });

  useEffect(() => {
    if (workers.length > 0 && !worker) {
      dispatch(setWorker(workers[0]));
    }
  }, [workers, worker, dispatch]);

  useEffect(() => {
    const isFormValid = worker;

    if (setIsValid) {
      setIsValid(isFormValid) && workers.length;
    }
  }, [worker, workers, setIsValid]);

  if (isLoading) {
    return <WorkersSkeleton />;
  }

  if (isError) {
    return <WorkersError error={error} />;
  }

  if (workers.length === 0) {
    return <WorkersEmpty />;
  }

  return (
    <div className="grid max-h-100 gap-3">
      {workers.map((w) => {
        const isSelected = worker?._id === w._id;

        return (
          <button
            key={w._id}
            type="button"
            onClick={() => dispatch(setWorker(w))}
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border p-4 text-left transition-colors ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <span className="grid size-12 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">
              {w.name?.charAt(0) || "W"}
            </span>
            <span className="min-w-0">
              <strong className="block truncate">{w.name}</strong>
              <span className="block text-sm text-muted-foreground capitalize">
                {w.role}
              </span>
            </span>
            <Rating value={w.ratingsAverage} />
          </button>
        );
      })}
    </div>
  );
}
