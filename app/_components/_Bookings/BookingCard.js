"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import StatusBadge from "@/app/_components/_Bookings/StatusBadge";

export default function BookingCard({ booking }) {
  const locale = useLocale();
  const t = useTranslations("BookingCard");

  function formatDateTime(dateStr, timeStr) {
    if (!dateStr) return "";

    const dateOnly = dateStr.split("T")[0];
    const timeOnly = timeStr?.includes("T")
      ? timeStr.split("T")[1].slice(0, 5)
      : timeStr?.slice(0, 5) || "00:00";

    const [year, month, day] = dateOnly.split("-").map(Number);
    const [hours, minutes] = timeOnly.split(":").map(Number);

    const dateObj = new Date(year, month - 1, day, hours, minutes);

    const formattedDate = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);

    const formattedTime = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dateObj);

    return `${formattedDate} · ${formattedTime}`;
  }

  return (
    <Link
      href={`/bookings/${booking._id}`}
      className="group grid w-full gap-4 rounded-lg border border-border bg-card p-4 text-left transition hover:border-primary/50 hover:shadow-md ltr:text-left rtl:text-right sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-md sm:h-24 sm:w-28">
        <Image
          src={booking.service?.image || "/placeholder.jpg"}
          fill
          alt={booking.service?.name || t("serviceImageAlt")}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 120px"
        />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-semibold">
            {booking.service?.name}
          </h3>
          <StatusBadge status={booking.status} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{booking._id}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>{formatDateTime(booking.date, booking.startTime)}</span>
          <span>{t("duration", { minutes: booking.duration })}</span>
          {booking.worker?.name && <span>{booking.worker.name}</span>}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:block sm:text-right ltr:sm:text-right rtl:sm:text-left">
        <strong className="text-lg">${booking.price}</strong>
        <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary">
          {t("details")} <ArrowRight size={15} className="rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
