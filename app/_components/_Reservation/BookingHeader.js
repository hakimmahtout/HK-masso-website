"use client";

import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function BookingHeader() {
  const t = useTranslations("BookingHeader");
  const step = useSelector((store) => store.booking.step);

  const steps = [
    t("steps.service"),
    t("steps.details"),
    t("steps.practitioner"),
    t("steps.date"),
    t("steps.time"),
    t("steps.review"),
  ];

  const descriptions = [
    t("descriptions.service"),
    t("descriptions.details"),
    t("descriptions.practitioner"),
    t("descriptions.date"),
    t("descriptions.time"),
    t("descriptions.review"),
  ];

  return (
    <>
      <p className="eyebrow">{steps[step]}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        {descriptions[step]}
      </h1>
    </>
  );
}
