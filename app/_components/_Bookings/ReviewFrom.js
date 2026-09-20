"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

import { createNewReview } from "@/app/_lib/actions";
import Button from "@/app/_ui/Button";

export default function ReviewForm({ booking }) {
  const t = useTranslations("ReviewForm");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();

    if (review === "") return;

    startTransition(async () => {
      await createNewReview({
        bookingId: booking._id,
        worker: booking.worker._id,
        service: booking.service._id,
        rating,
        review,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Selector */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              size={22}
              className={`${
                star <= (hover || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
        <span className="ms-2 text-sm font-medium text-muted-foreground">
          {t("ratingLabel", { count: rating })}
        </span>
      </div>

      {/* Review Textarea */}
      <textarea
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder={t("placeholder")}
        required
        className="w-full rounded-md border border-border bg-subtle p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
