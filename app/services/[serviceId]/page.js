import { getService } from "@/app/_lib/data-service";
import { getTranslations } from "next-intl/server";

import ServiceDetails from "@/app/_components/_Service/ServiceDetails";
import ServiceBenefitsAndReviews from "@/app/_components/_Service/ServiceBenefitsAndReviews";
import ServiceOtherServices from "@/app/_components/_Service/ServiceOtherServices";

export async function generateMetadata({ params }) {
  const { serviceId, locale } = await params;
  const service = await getService(serviceId);
  const t = await getTranslations({
    locale,
    namespace: "ServiceDetailsPage.metadata",
  });

  return {
    title: service.name,
    description: service.description,
    keywords: [
      service.name,
      t("massageTherapy"),
      t("massageTreatment"),
      t("hkMasso"),
      t("massageBooking"),
    ],
  };
}

export default async function Page({ params }) {
  const { serviceId } = await params;
  const service = await getService(serviceId);

  return (
    <main>
      <ServiceDetails service={service} />
      <ServiceBenefitsAndReviews service={service} />
      <ServiceOtherServices serviceId={serviceId} />
    </main>
  );
}
