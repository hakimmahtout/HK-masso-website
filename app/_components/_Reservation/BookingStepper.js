"use client";

import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function BookingStepper() {
  const t = useTranslations("BookingStepper");
  const step = useSelector((store) => store.booking.step);

  const steps = [
    t("steps.service"),
    t("steps.details"),
    t("steps.practitioner"),
    t("steps.date"),
    t("steps.time"),
    t("steps.review"),
  ];

  return (
    <div className="mt-7 overflow-x-auto pb-2">
      <div className="flex min-w-155 items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={`text-xs font-semibold ${
                  i === step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-3 h-px flex-1 ${
                  i < step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
