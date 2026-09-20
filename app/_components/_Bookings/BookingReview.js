import { getTranslations } from "next-intl/server";

import ReviewCard from "@/app/_components/_Bookings/ReviewCard";
import ReviewForm from "@/app/_components/_Bookings/ReviewFrom";
import { auth } from "@/app/_lib/auth";
import { getReview } from "@/app/_lib/data-service";

export default async function BookingReview({ booking }) {
  const session = await auth();
  const t = await getTranslations("BookingReview");

  const review = await getReview({
    serviceId: booking.service._id,
    workerId: booking.worker._id,
    guestId: session?.user?.guestId,
  });

  const hasReview = review.length > 0;

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold">{t("title")}</h2>

      {hasReview ? (
        <div className="mt-4">
          <p className="mb-3 text-sm text-muted-foreground">
            {t("existingFeedback")}
          </p>
          <ReviewCard review={review[0]} />
        </div>
      ) : (
        <div className="mt-4">
          <p className="mb-4 text-sm text-muted-foreground">{t("prompt")}</p>
          <ReviewForm booking={booking} />
        </div>
      )}
    </section>
  );
}
