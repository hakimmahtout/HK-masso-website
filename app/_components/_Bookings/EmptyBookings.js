"use client";

import { useTranslations } from "next-intl";
import { CalendarX2 } from "lucide-react";

import Button from "@/app/_ui/Button";

export default function EmptyBookings({ title, description }) {
  const t = useTranslations("EmptyBookings");

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-subtle text-muted-foreground">
        <CalendarX2 size={32} />
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold">
        {title || t("defaultTitle")}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description || t("defaultDescription")}
      </p>

      <div className="mt-6">
        <Button href="/reservation">{t("bookButton")}</Button>
      </div>
    </div>
  );
}
