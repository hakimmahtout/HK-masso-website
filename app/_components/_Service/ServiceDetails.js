"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Button from "@/app/_ui/Button";
import Rating from "@/app/_components/Rating";

export default function ServiceDetails({ service }) {
  const t = useTranslations("ServiceDetails");

  return (
    <div className="container py-8">
      <Link
        href="/services"
        className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} className="rtl:rotate-180" /> {t("allServices")}
      </Link>
      <div className="mt-7 grid gap-10 lg:grid-cols-2">
        <Image
          src={service.image}
          alt={service.name}
          width={1200}
          height={900}
          loading="eager"
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div className="self-center">
          <div className="flex flex-wrap gap-2">
            {service.category && (
              <span className="pill">{service.category}</span>
            )}
            {service.tag && <span className="pill">{service.tag}</span>}
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">
            {service.name}
          </h1>
          <div className="mt-4">
            <Link href={`/services/${service._id}/reviews`}>
              <Rating
                value={service.ratingsAverage}
                count={t("reviewsCount", { count: service.ratingsQuantity })}
              />
            </Link>
          </div>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {service.description} {t("consultationNote")}
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {service.prices &&
              Object.entries(service.prices).map(([key, price]) => {
                // Extracts digits from keys like "d30" or "d60" -> "30", "60"
                const minutes = key.replace(/\D/g, "");

                return (
                  <div
                    key={key}
                    className="rounded-md border border-border p-4"
                  >
                    <span className="text-sm text-muted-foreground">
                      {t("minutes", { count: Number(minutes) })}
                    </span>
                    <strong className="mt-1 block text-lg">${price}</strong>
                  </div>
                );
              })}
          </div>
          <Button href="/reservation" className="mt-7 w-full sm:w-auto">
            {t("bookAppointment")}{" "}
            <ArrowRight size={17} className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
}
