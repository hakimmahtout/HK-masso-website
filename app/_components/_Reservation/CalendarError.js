"use client";

import { useTranslations } from "next-intl";

export default function CalendarError({ error }) {
  const t = useTranslations("CalendarError");

  return (
    <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
      {t("message", { error: error?.message || t("unknownError") })}
    </div>
  );
}
