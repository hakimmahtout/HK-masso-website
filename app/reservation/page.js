import { getTranslations } from "next-intl/server";
import GoBack from "@/app/_components/_Reservation/GoBack";
import BookingStepper from "@/app/_components/_Reservation/BookingStepper";
import BookingCurrentStep from "@/app/_components/_Reservation/BookingCurrentStep";

export async function generateMetadata() {
  const t = await getTranslations("ReservationPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      t("keywords.1"),
      t("keywords.2"),
      t("keywords.3"),
      t("keywords.4"),
    ],
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: "https://hkmasso.com/reservation",
    },
  };
}

export default async function Page() {
  return (
    <main className="min-h-[75vh] bg-subtle">
      <div className="container py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <GoBack />
          <BookingStepper />
          <BookingCurrentStep />
        </div>
      </div>
    </main>
  );
}
