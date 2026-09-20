import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Button from "@/app/_ui/Button";
import HomeServicesList from "@/app/_components/_Home/HomeServicesList";
import ServicesSkeleton from "@/app/_components/_Services/ServicesSkeleton";

export default async function HomeServices() {
  const t = await getTranslations("HomeServices");

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("heading")}</h2>
          </div>
          <Button href="/services" variant="outline">
            {t("viewAll")} <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </div>
        <Suspense key="services" fallback={<ServicesSkeleton />}>
          <HomeServicesList />
        </Suspense>
      </div>
    </section>
  );
}
