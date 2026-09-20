"use client";

import { CalendarDays, Clock3, Mail, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import StatusBadge from "@/app/_components/_Bookings/StatusBadge";

export default function BookingDetails({ booking }) {
  const locale = useLocale();
  const t = useTranslations("BookingDetails");

  function formatDate(dateStr) {
    if (!dateStr) return "";

    const dateOnly = dateStr.split("T")[0];
    const [year, month, day] = dateOnly.split("-").map(Number);

    const dateObj = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  }

  function formatTime(timeStr) {
    if (!timeStr) return "";

    const timeOnly = timeStr.includes("T")
      ? timeStr.split("T")[1].slice(0, 5)
      : timeStr.slice(0, 5);

    const [hours, minutes] = timeOnly.split(":").map(Number);

    const dateObj = new Date();
    dateObj.setHours(hours, minutes, 0, 0);

    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dateObj);
  }

  const detailsList = [
    {
      Icon: CalendarDays,
      label: t("date"),
      value: formatDate(booking.date),
    },
    {
      Icon: Clock3,
      label: t("time"),
      value: `${formatTime(booking.startTime)} · ${t("duration", {
        minutes: booking.duration,
      })}`,
    },
    {
      Icon: UserRound,
      label: t("practitioner"),
      value: booking.worker?.name || t("noPractitioner"),
    },
    {
      Icon: Mail,
      label: t("customer"),
      value: booking.email,
    },
  ];

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <img
        src={booking.service?.image || "/placeholder.jpg"}
        alt={booking.service?.name || t("serviceImageAlt")}
        className="aspect-16/7 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{booking._id}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">
              {booking.service?.name}
            </h1>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {detailsList.map(({ Icon, label, value }) => (
            <div key={label} className="flex gap-3">
              <Icon className="text-primary shrink-0" size={19} />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <strong className="mt-1 block text-sm">{value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-md bg-subtle p-4">
          <p className="text-xs text-muted-foreground">{t("notes")}</p>
          <p className="mt-2 text-sm">{booking.notes || t("noNotes")}</p>
        </div>
      </div>
    </section>
  );
}
