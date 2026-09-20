"use client";

import { useTranslations } from "next-intl";
import Spinner from "@/app/_ui/Spinner";

export default function Loading() {
  const t = useTranslations("Common");

  return (
    <div className="flex flex-col gap-3 min-h-75 items-center justify-center">
      <Spinner size="size-8" />
      <p className="text-xl">{t("loading")}</p>
    </div>
  );
}
