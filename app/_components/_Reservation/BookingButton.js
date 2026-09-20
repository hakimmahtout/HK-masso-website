"use client";

import { useTransition } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { nextStep } from "@/app/_lib/features/booking/bookingSlice";

import Button from "@/app/_ui/Button";
import { createReservation } from "@/app/_lib/actions";

export default function BookingButton({ isValid }) {
  const t = useTranslations("BookingButton");
  const [isPending, startTransition] = useTransition();

  const step = useSelector((store) => store.booking.step);
  const duration = useSelector((store) => store.booking.duration);
  const worker = useSelector((store) => store.booking.worker);
  const service = useSelector((store) => store.booking.service);
  const date = useSelector((store) => store.booking.date);
  const time = useSelector((store) => store.booking.startTime);
  const { fullName, gender, email, phone, notes } = useSelector(
    (store) => store.booking.guestDetails,
  );

  const dispatch = useDispatch();

  function handleCreateBooking() {
    const bookingData = {
      fullName,
      email,
      phone,
      gender,
      notes,
      service: service?._id,
      duration: Number(duration),
      workerId: worker?._id,
      date,
      startTime: time,
    };

    startTransition(async () => {
      await createReservation(bookingData);
    });
  }

  return (
    <div className="mt-8 flex justify-end">
      {step === 5 ? (
        <Button onClick={handleCreateBooking} disabled={isPending}>
          {isPending ? t("creating") : t("confirm")}
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowRight size={16} className="rtl:rotate-180" />
          )}
        </Button>
      ) : (
        <Button
          disabled={!isValid}
          onClick={() => {
            dispatch(nextStep());
          }}
        >
          {t("continue")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Button>
      )}
    </div>
  );
}
