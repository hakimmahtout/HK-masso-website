"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import ServiceStep from "@/app/_components/_Reservation/ServiceStep";
import CustomerStep from "@/app/_components/_Reservation/CustomerStep";
import WorkerStep from "@/app/_components/_Reservation/WorkerStep";
import CalendarStep from "@/app/_components/_Reservation/CalendarStep";
import TimeStep from "@/app/_components/_Reservation/TimeStep";

import BookingButton from "@/app/_components/_Reservation/BookingButton";
import ReviewStep from "./ReviewStep";

export default function BookingSteps({ services, user }) {
  const [isValid, setIsValid] = useState(false);
  const step = useSelector((store) => store.booking.step);

  return (
    <>
      <div className="mt-7">
        {step === 0 && (
          <ServiceStep services={services} setIsValid={setIsValid} />
        )}
        {step === 1 && <CustomerStep user={user} setIsValid={setIsValid} />}
        {step === 2 && <WorkerStep setIsValid={setIsValid} />}
        {step === 3 && <CalendarStep setIsValid={setIsValid} />}
        {step === 4 && <TimeStep setIsValid={setIsValid} />}
        {step === 5 && <ReviewStep />}
      </div>
      <BookingButton isValid={isValid} />
    </>
  );
}
