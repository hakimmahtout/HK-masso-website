"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { useTranslations, useLocale, useFormatter } from "next-intl";

import Button from "@/app/_ui/Button";
import { resetBooking } from "@/app/_lib/features/booking/bookingSlice";

export default function Success({ booking }) {
  const t = useTranslations("Success");
  const locale = useLocale();
  const format = useFormatter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBooking());
  }, [dispatch]);

  function formatDateTime(dateStr, timeStr) {
    const dateOnly = dateStr.split("T")[0];

    const timeOnly = timeStr.includes("T")
      ? timeStr.split("T")[1].slice(0, 5)
      : timeStr.slice(0, 5);

    const [year, month, day] = dateOnly.split("-").map(Number);
    const [hours, minutes] = timeOnly.split(":").map(Number);

    const dateObj = new Date(year, month - 1, day, hours, minutes);

    const formattedDate = format.dateTime(dateObj, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const formattedTime = format.dateTime(dateObj, {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} · ${formattedTime}`;
  }

  return (
    <main className="grid min-h-[75vh] place-items-center bg-subtle px-4 py-16">
      <div className="w-full max-w-xl rounded-lg border border-border bg-card p-7 text-center shadow-xl sm:p-10">
        <span className="success-pulse mx-auto">
          <Check size={30} />
        </span>
        <p className="eyebrow mt-7">{t("eyebrow")}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">
          {t("heading")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          {t.rich("confirmationText", {
            email: booking.email,
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <div className="mt-7 grid grid-cols-2 gap-4 rounded-md bg-subtle p-5 text-start text-sm">
          <span className="text-muted-foreground">{t("reference")}</span>
          <strong className="text-end">{booking._id}</strong>
          <span className="text-muted-foreground">{t("treatment")}</span>
          <strong className="text-end">{booking.service.name}</strong>
          <span className="text-muted-foreground">{t("dateTime")}</span>
          <strong className="text-end">
            {formatDateTime(booking.date, booking.startTime)}
          </strong>
          <span className="text-muted-foreground">{t("total")}</span>
          <strong className="text-end">
            {format.number(booking.price, {
              style: "currency",
              currency: "USD",
            })}
          </strong>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/bookings">{t("viewBookings")}</Button>
          <Button href="/" variant="outline">
            {t("backHome")}
          </Button>
        </div>
      </div>
    </main>
  );
}
