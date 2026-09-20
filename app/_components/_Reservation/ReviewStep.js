"use client";

import { useSelector } from "react-redux";
import { format } from "date-fns";
import { ar, fr, enUS } from "date-fns/locale";
import { useTranslations, useLocale, useFormatter } from "next-intl";

const localeMap = {
  ar,
  fr,
  en: enUS,
};

export default function ReviewStep() {
  const t = useTranslations("ReviewStep");
  const locale = useLocale();
  const formatCurrency = useFormatter();

  const duration = useSelector((store) => store.booking.duration);
  const worker = useSelector((store) => store.booking.worker);
  const service = useSelector((store) => store.booking.service);
  const date = useSelector((store) => store.booking.date);
  const time = useSelector((store) => store.booking.startTime);

  // Date formatting using date-fns locale
  const formattedDate = date
    ? format(new Date(`${date}T00:00:00`), "MMMM d, yyyy", {
        locale: localeMap[locale] || enUS,
      })
    : t("notSelected");

  // Dynamic price lookup
  const price = service?.prices?.[`d${duration}`];

  const formattedPrice =
    price !== undefined
      ? formatCurrency.number(price, { style: "currency", currency: "USD" })
      : t("notAvailable");

  const items = [
    { label: t("service"), value: service?.name || t("notAvailable") },
    {
      label: t("duration"),
      value: duration
        ? t("durationFormat", { count: duration })
        : t("notAvailable"),
    },
    { label: t("practitioner"), value: worker?.name || t("notAvailable") },
    { label: t("date"), value: formattedDate },
    { label: t("time"), value: time || t("notAvailable") },
    { label: t("price"), value: formattedPrice },
  ];

  return (
    <div className="divide-y divide-border rounded-md border border-border">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 px-4 py-4"
        >
          <span className="text-sm text-muted-foreground">{label}</span>
          <strong className="text-right text-sm">{value}</strong>
        </div>
      ))}
    </div>
  );
}
