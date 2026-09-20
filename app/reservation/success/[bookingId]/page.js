import { getTranslations } from "next-intl/server";
import { getBooking } from "@/app/_lib/data-service";
import Success from "@/app/_components/_Reservation/Success";

export async function generateMetadata({ params }) {
  const { bookingId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "SuccessPage" });
  const booking = await getBooking(bookingId);

  const serviceName = booking?.service?.name || t("defaultServiceName");

  return {
    title: t("metadataTitle", { serviceName }),
    description: t("metadataDescription"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params }) {
  const { bookingId } = await params;
  const booking = await getBooking(bookingId);

  return <Success booking={booking} />;
}
