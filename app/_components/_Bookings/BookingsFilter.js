"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BookingsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations("BookingsFilter");

  const activeFilter = searchParams.get("status") || "all";

  const filterOptions = [
    { key: "all", label: t("all") },
    { key: "pending", label: t("pending") },
    { key: "confirmed", label: t("confirmed") },
    { key: "completed", label: t("completed") },
    { key: "cancelled", label: t("cancelled") },
  ];

  function handleFilterChange(filterValue) {
    const params = new URLSearchParams(searchParams);

    if (filterValue === "all") {
      params.delete("status");
    } else {
      params.set("status", filterValue);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filterOptions.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => handleFilterChange(key)}
          className={`filter-tab ${
            activeFilter === key ? "filter-active" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
