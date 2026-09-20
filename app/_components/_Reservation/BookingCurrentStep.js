import { auth } from "@/app/_lib/auth";
import { getAllServices } from "@/app/_lib/data-service";

import BookingHeader from "@/app/_components/_Reservation/BookingHeader";
import BookingSteps from "@/app/_components/_Reservation/BookingSteps";
import BookingSummary from "@/app/_components/_Reservation/BookingSummary";

export default async function BookingCurrentStep() {
  const [{ services }, { user }] = await Promise.all([
    getAllServices({ limit: 20 }),
    auth(),
  ]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="rounded-lg border border-border bg-card p-5 sm:p-7">
        <BookingHeader />
        <BookingSteps services={services} user={user} />
      </section>
      <BookingSummary />
    </div>
  );
}
