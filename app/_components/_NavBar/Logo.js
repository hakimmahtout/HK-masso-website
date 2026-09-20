"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import LogoImage from "@/app/icon.png";

export default function Logo() {
  const t = useTranslations("Branding");

  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-left ltr:text-left rtl:text-right"
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={LogoImage}
          alt="HK Masso Logo"
          fill
          className="object-cover"
          sizes="40px"
          priority
        />
      </div>
      <span>
        <strong className="block font-display text-lg leading-none">
          {t("title")}
        </strong>
        <span className="mt-1 block text-xs text-muted-foreground">
          {t("subtitle")}
        </span>
      </span>
    </Link>
  );
}
