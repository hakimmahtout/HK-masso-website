"use client";

import { Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

export default function ReviewCard({ review }) {
  const t = useTranslations("ReviewCard");
  const format = useFormatter();

  if (!review) return null;

  const formattedDate = review.createdAt
    ? format.dateTime(new Date(review.createdAt), {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="rounded-lg border border-border bg-subtle p-5 text-start shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Star Rating Display */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={`${
                star <= (review.rating || 5)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
          <span className="ms-2 text-xs font-semibold text-muted-foreground">
            {t("ratingScore", { rating: review.rating || 5 })}
          </span>
        </div>

        {/* Timestamp */}
        {formattedDate && (
          <time
            dateTime={new Date(review.createdAt).toISOString()}
            className="text-xs text-muted-foreground"
          >
            {formattedDate}
          </time>
        )}
      </div>

      {/* Review Comment Body */}
      {review.review && (
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          &ldquo;{review.review}&rdquo;
        </p>
      )}
    </div>
  );
}
