import { getTranslations } from "next-intl/server";
import { getAllServices } from "@/app/_lib/data-service";

import ServiceCard from "@/app/_components/_Services/ServiceCard";

export default async function ServiceOtherServices({ serviceId }) {
  const t = await getTranslations("ServiceOtherServices");
  const { services } = await getAllServices();

  const otherServices = services
    ?.filter((service) => service._id !== serviceId)
    .slice(0, 3);

  if (!otherServices?.length) return null;

  return (
    <section className="section">
      <div className="container">
        <h2 className="font-display text-3xl font-semibold">{t("title")}</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {otherServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
