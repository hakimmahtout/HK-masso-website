"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Rating from "@/app/_components/Rating";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const t = useTranslations("ServiceCard");

  const minPrice = service?.prices ? Object.values(service.prices)[0] : null;

  return (
    <Link href={`/services/${service._id}`} className="block">
      <article className="group overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          {service.isFeatured && (
            <span className="absolute left-4 top-4 rtl:left-auto rtl:right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              {t("featured")}
            </span>
          )}
        </div>
        <div className="p-5 text-left rtl:text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase text-primary">
              {t(`categories.${service.category}`, {
                defaultValue: service.category,
              })}
            </span>
            <Rating
              value={service.ratingsAverage}
              count={service.ratingsQuantity}
            />
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold">
            {service.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {service.description}
          </p>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="text-xs text-muted-foreground">{t("from")}</span>
              <p className="text-lg font-bold">
                {minPrice ? `$${minPrice}` : "--"}
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary">
              {t("viewDetails")}
              <ArrowRight size={15} className="rtl:hidden" />
              <ArrowLeft size={15} className="hidden rtl:block" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
