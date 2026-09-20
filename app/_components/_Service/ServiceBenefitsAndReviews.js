"use client";

import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import Rating from "@/app/_components/Rating";

export default function ServiceBenefitsAndReviews({ service }) {
  const t = useTranslations("ServiceBenefitsAndReviews");

  const firstReview = service?.reviews?.[0];
  const reviewerName =
    firstReview?.user?.fullName ||
    firstReview?.user?.name ||
    firstReview?.guest?.name ||
    t("anonymousGuest");

  return (
    <section className="section bg-subtle">
      <div className="container grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">
            {t("title")}
          </h2>
          <div className="mt-6 grid gap-3">
            {service?.benefits?.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CircleCheck className="text-success shrink-0" size={20} />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {firstReview ? (
          <blockquote className="rounded-lg border border-border bg-card p-7">
            <Rating value={firstReview.rating ?? 5} />
            <p className="mt-5 text-lg leading-8">
              “{firstReview.review || firstReview.comment}”
            </p>
            <p className="mt-5 text-sm font-semibold">{reviewerName}</p>
          </blockquote>
        ) : null}
      </div>
    </section>
  );
}
