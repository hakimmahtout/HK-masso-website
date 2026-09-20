"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const navItems = [
    [t("home"), "/"],
    [t("services"), "/services"],
    [t("about"), "/about"],
    [t("contact"), "/contact"],
    [t("reservations"), "/bookings"],
  ];

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navItems.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            href === pathname
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
