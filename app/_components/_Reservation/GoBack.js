"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import { prevStep } from "@/app/_lib/features/booking/bookingSlice";

export default function GoBack() {
  const t = useTranslations("GoBack");
  const dispatch = useDispatch();
  const step = useSelector((store) => store.booking.step);

  return (
    <div className="flex items-center justify-between gap-4">
      {step ? (
        <button
          onClick={() => dispatch(prevStep())}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("back")}
        </button>
      ) : (
        <Link
          href="/services"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("services")}
        </Link>
      )}

      <span className="text-sm text-muted-foreground">
        {t("stepIndicator", { current: step + 1, total: 6 })}
      </span>
    </div>
  );
}
