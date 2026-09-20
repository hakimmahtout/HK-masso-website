import Link from "next/link";
import { ArrowLeft, MessageSquareOff, Star } from "lucide-react";
import { getTranslations, getFormatter } from "next-intl/server";
import { getService } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { serviceId, locale } = await params;
  const service = await getService(serviceId);
  const t = await getTranslations({
    locale,
    namespace: "ServiceReviewsPage.metadata",
  });

  return {
    title: `${service.name} - ${t("title")}`,
    description: t("description", { serviceName: service.name }),
  };
}

export default async function Page({ params }) {
  const { serviceId, locale } = await params;
  const t = await getTranslations("ServiceReviewsPage");
  const format = await getFormatter();
  const service = await getService(serviceId);

  const reviews = service?.reviews || [];
  const reviewCount = reviews.length;

  // Calculate average rating
  const avgRating = reviewCount
    ? (
        reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / reviewCount
      ).toFixed(1)
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Navigation Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/services/${serviceId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {t("backToService")}
        </Link>
      </div>

      {/* Page Title & Rating Summary */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {service.name}
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold">{t("title")}</h1>
        </div>

        {reviewCount > 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-xs">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={20} className="fill-amber-500 text-amber-500" />
              <span className="text-lg font-bold">{avgRating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} {t("reviewsCount", { count: reviewCount })})
            </span>
          </div>
        )}
      </div>

      {/* Reviews Content */}
      {reviewCount === 0 ? (
        <EmptyReviews t={t} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r, index) => (
            <ReviewCard key={r._id || index} review={r} t={t} format={format} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Individual Review Card */
function ReviewCard({ review, t, format }) {
  const authorName =
    review.user?.fullName || review.user?.name || t("guestUser");
  const userPhoto = review.user?.photo;
  const rating = review.rating || 5;

  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-border/80">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={authorName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                {authorName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {authorName}
              </p>
              {review.createdAt && (
                <p className="text-xs text-muted-foreground">
                  {format.dateTime(new Date(review.createdAt), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground/30"
                }
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {review.review || review.comment}
        </p>
      </div>
    </div>
  );
}

/* Empty State Component */
function EmptyReviews({ t }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted">
        <MessageSquareOff size={24} className="text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        {t("empty.title")}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {t("empty.description")}
      </p>
    </div>
  );
}
