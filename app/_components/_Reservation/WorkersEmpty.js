"use client";

import { useTranslations } from "next-intl";

export default function WorkersEmpty() {
  const t = useTranslations("WorkersEmpty");

  return (
    <div className="p-4 text-center text-sm text-muted-foreground">
      {t("noPractitioners")}
    </div>
  );
}
