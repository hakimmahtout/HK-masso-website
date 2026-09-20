import { getTranslations } from "next-intl/server";
import { getAllServices } from "@/app/_lib/data-service";
import ServiceCard from "@/app/_components/_Services/ServiceCard";
import EmptyState from "@/app/_components/EmptyState";
import Pagination from "@/app/_ui/Pagination";
import ServicesContainer from "@/app/_components/_Services/ServicesContainer";
import ServicesSort from "./ServicesSort";

export default async function ServicesListAndFilter({
  category,
  isFeatured,
  search,
  page,
  limit,
}) {
  const t = await getTranslations("ServicesList");

  const { services, totalResults } = await getAllServices({
    category,
    isFeatured,
    search,
    page,
    limit,
  });

  if (!services || services.length === 0) {
    return (
      <EmptyState
        title={t("emptyTitle")}
        text={t("emptyText")}
        action={t("emptyAction")}
      />
    );
  }

  return (
    <ServicesContainer>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("treatmentsCount", { count: totalResults })}
        </p>
        <ServicesSort />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id || s._id} service={s} />
        ))}
      </div>

      <Pagination totalCount={totalResults} pageSize={limit} />
    </ServicesContainer>
  );
}
