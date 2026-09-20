import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import PageHeader from "@/app/_components/PageHeader";
import ServicesSearch from "@/app/_components/_Services/ServicesSearch";
import ServicesListAndFilter from "@/app/_components/_Services/ServicesListAndFilter";
import ServicesSkeleton from "@/app/_components/_Services/ServicesSkeleton";
import FilterSkeleton from "@/app/_components/_Services/FilterSkeleton";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ServicesPage.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      t("keywords.massageTreatments"),
      t("keywords.massageMenu"),
      t("keywords.deepTissue"),
      t("keywords.swedish"),
      t("keywords.ayurvedic"),
      t("keywords.hotStones"),
      t("keywords.therapeutic"),
      t("keywords.sportsMassage"),
      t("keywords.hkMasso"),
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "http://localhost:3000/services",
    },
  };
}

export default async function Page({ searchParams }) {
  const t = await getTranslations("ServicesPage");
  const resolvedSearchParams = await searchParams;

  const category = resolvedSearchParams?.category ?? "all";
  const isFeatured = resolvedSearchParams?.featured ?? false;
  const search = resolvedSearchParams?.search ?? "";
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 10;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <main className="section">
        <div className="container">
          <ServicesSearch />
          <Suspense
            fallback={
              <>
                <FilterSkeleton />
                <ServicesSkeleton size={6} />
              </>
            }
          >
            <ServicesListAndFilter
              category={category}
              isFeatured={isFeatured}
              search={search}
              page={page}
              limit={limit}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
