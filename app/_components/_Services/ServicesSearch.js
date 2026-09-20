"use client";

import { useState, useTransition } from "react";
import { Loader2, Search, Star } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/app/_ui/Button";

const inputClass =
  "h-12 w-full rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground";

export default function ServicesSearch() {
  const t = useTranslations("ServicesSearch");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") ?? "all";
  const isFeatured = searchParams.get("featured") === "true";

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? "",
  );

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page"); // Reset to page 1 on filter update

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    updateParam("search", value);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="grid gap-3 rounded-lg border border-border bg-card p-4 lg:grid-cols-[1fr_auto_auto]">
      {/* Search Input */}
      <label className="relative flex-1">
        <Search
          className="absolute left-3 top-3.5 text-muted-foreground rtl:left-auto rtl:right-3"
          size={18}
        />
        <input
          className={`${inputClass} pl-10 pr-10 rtl:pl-10 rtl:pr-10`}
          placeholder={t("placeholder")}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Show spinner when transition is active */}
        {isPending && (
          <Loader2
            className="absolute right-3 top-3.5 animate-spin text-primary rtl:left-3 rtl:right-auto"
            size={18}
          />
        )}
      </label>

      {/* Category Dropdown (NOT disabled during transition) */}
      <select
        className={`${inputClass} lg:w-52`}
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
      >
        <option value="all">{t("categories.all")}</option>
        <option value="massage">{t("categories.massage")}</option>
      </select>

      {/* Featured Toggle Button */}
      <Button
        variant={isFeatured ? "primary" : "outline"}
        onClick={() => updateParam("featured", isFeatured ? null : "true")}
      >
        <Star size={16} /> {t("featured")}
      </Button>
    </div>
  );
}
