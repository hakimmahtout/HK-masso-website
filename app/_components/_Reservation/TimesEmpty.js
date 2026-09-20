"use client";

import { CalendarX2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TimesEmpty() {
  const t = useTranslations("TimesEmpty");

  return (
    <div className="flex min-h-55 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <CalendarX2 className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-3 text-base font-semibold text-foreground">
        {t("title")}
      </h3>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        {t("description")}
      </p>
    </div>
  );
}
