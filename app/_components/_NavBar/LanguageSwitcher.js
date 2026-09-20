"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", short: "EN", dir: "ltr" },
  { code: "fr", name: "Français", short: "FR", dir: "ltr" },
  { code: "ar", name: "العربية", short: "AR", dir: "rtl" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const selected =
    languages.find((l) => l.code === currentLocale) || languages[0];

  function handleSelect(lang) {
    // Set cookie for 1 year
    document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000`;
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;

    setIsOpen(false);
    router.refresh(); // Triggers server components to re-render with new locale
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Globe size={15} />
        <span>{selected.short}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-36 rounded-lg border border-border bg-card p-1 shadow-lg">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-accent ${
                  selected.code === lang.code
                    ? "bg-accent/50 font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <span
                  className={lang.code === "ar" ? "font-serif text-sm" : ""}
                >
                  {lang.name}
                </span>
                <span className="uppercase text-muted-foreground/70">
                  {lang.short}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
