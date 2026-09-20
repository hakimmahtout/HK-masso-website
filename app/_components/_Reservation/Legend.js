"use client";

import { useTranslations } from "next-intl";

export default function Legend() {
  const t = useTranslations("Legend");

  return (
    <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-2">
        <i className="h-2 w-2 rounded-full bg-primary" />
        {t("available")}
      </span>
      <span className="flex items-center gap-2">
        <i className="h-2 w-2 rounded-full border border-primary" />
        {t("today")}
      </span>
      <span className="flex items-center gap-2">
        <i className="h-2 w-2 rounded-full bg-muted" />
        {t("unavailable")}
      </span>
    </div>
  );
}
