import { Star } from "lucide-react";
import { getAllReviews } from "@/app/_lib/data-service";

export default async function HomeReviewsList() {
  const reviews = await getAllReviews();

  if (!reviews.length) return null;

  const isMarquee = reviews.length > 3;

  return (
    <div
      className={`mt-10 ${isMarquee ? "relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" : ""}`}
    >
      <div
        className={
          isMarquee
            ? "animate-marquee flex gap-5 w-max"
            : "flex flex-wrap justify-center gap-5"
        }
      >
        {reviews.slice(0, 7).map((review, index) => (
          <blockquote
            key={`${review.guest.name}-${index}`}
            className="w-75 sm:w-87.5 shrink-0 rounded-lg border border-border bg-card p-6"
          >
            <div className="flex gap-1 text-primary">
              {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                <Star key={i} size={15} className="fill-current" />
              ))}
            </div>
            <p className="mt-5 leading-7">“{review.review}”</p>
            <footer className="mt-5 text-sm font-semibold">
              {review.guest.name}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
