import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { auth } from "@/app/_lib/auth";
import { getBooking } from "@/app/_lib/data-service";
import BookingAside from "@/app/_components/_Bookings/BookingAside";
import BookingDetails from "@/app/_components/_Bookings/BookingDetails";
import BookingReview from "@/app/_components/_Bookings/BookingReview";

export async function generateMetadata({ params }) {
  const { bookingId } = await params;
  const booking = await getBooking(bookingId);
  const t = await getTranslations("BookingDetailsPage.metadata");

  const serviceName = booking?.service?.name || t("defaultServiceName");
  const dateStr = booking?.date || "";

  return {
    title: t("title", { serviceName }),
    description: t("description", { date: dateStr }),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params }) {
  const { bookingId } = await params;
  const session = await auth();

  const booking = await getBooking(bookingId);

  if (!booking || booking.email !== session?.user?.email) {
    notFound();
  }

  const t = await getTranslations("BookingDetailsPage");
  const isCompleted = booking.status === "completed";

  return (
    <main className="section">
      <div className="container max-w-5xl">
        <Link
          href="/bookings"
          className="flex items-center gap-2 text-sm font-semibold transition hover:text-primary"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />{" "}
          {t("backToBookings")}
        </Link>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <BookingDetails booking={booking} />

            {isCompleted && <BookingReview booking={booking} />}
          </div>

          <BookingAside booking={booking} />
        </div>
      </div>
    </main>
  );
}
