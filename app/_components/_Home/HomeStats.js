"use client";

import { useTranslations } from "next-intl";

export default function HomeStats() {
  const t = useTranslations("HomeStats");

  const statistics = [
    { value: "12k+", label: t("appointments") },
    { value: "4.9", label: t("rating") },
    { value: "9", label: t("practitioners") },
    { value: "96%", label: t("returnRate") },
  ];

  return (
    <section className="border-y border-border bg-subtle">
      <div className="container grid gap-px py-10 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((s) => (
          <div key={s.label} className="px-5 py-5 text-center">
            <strong className="font-display text-3xl text-primary">
              {s.value}
            </strong>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
