import { getTranslations } from "next-intl/server";

import PageHeader from "@/app/_components/PageHeader";
import BookingsListAndFilter from "@/app/_components/_Bookings/BookingsListAndFilter";

export async function generateMetadata() {
  const t = await getTranslations("BookingsPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://hkmasso.com/bookings",
    },
  };
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("BookingsPage.header");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <BookingsListAndFilter searchParams={resolvedSearchParams} />
    </>
  );
}
