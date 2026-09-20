import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import HomeReviewsList from "@/app/_components/_Home/HomeReviewsList";
import ReviewsSkeleton from "@/app/_components/ReviewsSkeleton";

export default async function HomeReviews() {
  const t = await getTranslations("HomeReviews");

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {t("heading")}
          </h2>
        </div>
        <Suspense key="reviews" fallback={<ReviewsSkeleton />}>
          <HomeReviewsList />
        </Suspense>
      </div>
    </section>
  );
}
