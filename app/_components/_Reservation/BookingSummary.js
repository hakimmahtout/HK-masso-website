"use client";

import { useSelector } from "react-redux";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { useTranslations, useFormatter } from "next-intl";

export default function BookingSummary() {
  const t = useTranslations("BookingSummary");
  const format = useFormatter();

  const duration = useSelector((store) => store.booking.duration);
  const worker = useSelector((store) => store.booking.worker);
  const service = useSelector((store) => store.booking.service);
  const date = useSelector((store) => store.booking.date);
  const time = useSelector((store) => store.booking.startTime);

  const price = service && duration ? service.prices?.[`d${duration}`] : null;

  return (
    <aside className="h-fit rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-xl font-semibold">{t("title")}</h2>
      {service && (
        <>
          <img
            src={service.image}
            alt={service.name || ""}
            className="mt-4 aspect-video w-full rounded-md object-cover"
          />
          <h3 className="mt-4 font-semibold">{service.name}</h3>
        </>
      )}

      <div className="mt-4 space-y-3 text-sm">
        {duration && (
          <p className="summary-row">
            <Clock3 size={16} />
            <span>{t("duration", { count: Number(duration) })}</span>
          </p>
        )}
        {worker && (
          <p className="summary-row">
            <UserRound size={16} />
            <span>{worker.name}</span>
          </p>
        )}
        {date && time && (
          <p className="summary-row">
            <CalendarDays size={16} />
            <span>
              {format.dateTime(new Date(date), {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              · {time}
            </span>
          </p>
        )}
      </div>
      {price !== null && price !== undefined && (
        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
          <span className="text-sm">{t("total")}</span>
          <strong className="text-xl">
            {format.number(price, { style: "currency", currency: "USD" })}
          </strong>
        </div>
      )}
    </aside>
  );
}
