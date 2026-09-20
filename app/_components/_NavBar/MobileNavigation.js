"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Button from "@/app/_ui/Button";
import Logo from "@/app/_components/_NavBar/Logo";
import ModeButton from "@/app/_components/_NavBar/ModeButton";
import LanguageSwitcher from "@/app/_components/_NavBar/LanguageSwitcher";

export default function MobileNavigation({ setOpen }) {
  const router = useRouter();
  const t = useTranslations("Navigation");

  const navItems = [
    [t("home"), "/"],
    [t("services"), "/services"],
    [t("about"), "/about"],
    [t("contact"), "/contact"],
    [t("reservations"), "/bookings"],
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/30"
      onClick={() => setOpen(false)}
    >
      <div
        className="ml-auto flex h-dvh w-[86%] max-w-sm flex-col bg-background p-6 shadow-2xl ltr:ml-auto rtl:mr-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="icon-button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="mt-8 grid gap-1">
          {navItems.map(([label, href]) => (
            <button
              key={href}
              onClick={() => {
                router.push(href);
                setOpen(false);
              }}
              className="border-b border-border py-3 text-left font-semibold transition-colors hover:text-primary ltr:text-left rtl:text-right"
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => {
              router.push("/profile");
              setOpen(false);
            }}
            className="border-b border-border py-3 text-left font-semibold transition-colors hover:text-primary ltr:text-left rtl:text-right"
          >
            {t("profile")}
          </button>

          <button
            onClick={() => {
              router.push("/login");
              setOpen(false);
            }}
            className="border-b border-border py-3 text-left font-semibold transition-colors hover:text-primary ltr:text-left rtl:text-right"
          >
            {t("login")}
          </button>
        </nav>

        {/* Bottom Actions & Controls */}
        <div className="mt-auto flex flex-col gap-4 pt-6">
          <div className="flex items-center justify-between rounded-lg border border-border bg-card p-2">
            <span className="text-xs font-medium text-muted-foreground">
              Preferences
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ModeButton />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              router.push("/reservation");
              setOpen(false);
            }}
          >
            {t("bookAppointment")}
          </Button>
        </div>
      </div>
    </div>
  );
}
