import { ArrowRight, BadgeCheck, CalendarDays, Star } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import heroImage from "@/public/serenity-hero.jpg";
import Button from "@/app/_ui/Button";
import { auth } from "@/app/_lib/auth";

export default async function Hero() {
  const session = await auth();
  const t = await getTranslations("Hero");

  return (
    <section className="hero">
      <Image
        src={heroImage}
        alt={t("imageAlt")}
        width="1600"
        height="1008"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container relative flex min-h-[calc(100svh-4.5rem)] items-end pb-14 pt-24 sm:min-h-172.5 sm:items-center sm:py-24">
        <div className="max-w-2xl text-hero-foreground">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-hero-border bg-hero-soft px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <Star size={14} className="fill-primary text-primary" />
            {t("ratingBadge")}
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.04] sm:text-7xl">
            {t("headline")}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">
            {t("subheadline")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={session ? "/reservation" : "/login"}
              className="sm:min-w-44"
            >
              {session ? t("bookAppointment") : t("signInToBook")}
              <ArrowRight size={17} className="rtl:rotate-180" />
            </Button>
            <Button
              href="/services"
              variant="outline"
              className="border-hero-border bg-hero-soft text-hero-foreground hover:bg-hero-soft-hover hover:text-hero-foreground"
            >
              {t("exploreServices")}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-hero-muted">
            <span className="flex items-center gap-2">
              <BadgeCheck size={17} className="text-primary" />
              {t("licensedPractitioners")}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-primary" />
              {t("easyOnlineBooking")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
