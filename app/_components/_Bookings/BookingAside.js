"use client";

import { useTranslations } from "next-intl";
import TimelineItem from "@/app/_components/_Bookings/TimeLineItem";
import CancelButton from "./CancelButton";

const STATUS_KEYS = [
  { key: "pending", labelKey: "pending" },
  { key: "confirmed", labelKey: "confirmed" },
  { key: "completed", labelKey: "completed" },
];

export default function BookingAside({ booking }) {
  const t = useTranslations("BookingAside");

  const currentStatusIndex = STATUS_KEYS.findIndex(
    (item) => item.key === booking.status,
  );

  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="font-display text-xl font-semibold">{t("status")}</h2>
        <div className="mt-6 space-y-0">
          {booking.status === "cancelled" ? (
            <TimelineItem label={t("cancelled")} active danger />
          ) : (
            STATUS_KEYS.map((item, i) => (
              <TimelineItem
                key={item.key}
                label={t(item.labelKey)}
                active={i <= currentStatusIndex}
                last={i === STATUS_KEYS.length - 1}
              />
            ))
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <span>{t("total")}</span>
          <strong className="text-xl">${booking.price}</strong>
        </div>
      </div>

      {booking.status !== "cancelled" && booking.status !== "completed" && (
        <CancelButton bookingId={booking._id} />
      )}
    </aside>
  );
}
