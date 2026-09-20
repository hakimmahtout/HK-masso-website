import { getTranslations } from "next-intl/server";

import BookingCard from "@/app/_components/_Bookings/BookingCard";
import BookingsFilter from "@/app/_components/_Bookings/BookingsFilter";
import EmptyBookings from "@/app/_components/_Bookings/EmptyBookings";
import { auth } from "@/app/_lib/auth";
import { getMyBookings } from "@/app/_lib/data-service";

export default async function BookingsListAndFilter({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const session = await auth();
  const rawBookings = await getMyBookings(session?.user?.email);
  const t = await getTranslations("BookingsListAndFilter");

  const activeStatus = resolvedSearchParams?.status || "all";

  const filteredBookings =
    activeStatus === "all"
      ? rawBookings
      : rawBookings?.filter(
          (b) => b.status?.toLowerCase() === activeStatus.toLowerCase(),
        );

  const filterName = t(`statuses.${activeStatus}`, {
    defaultMessage: activeStatus,
  });

  return (
    <main className="section">
      <div className="container">
        <BookingsFilter />

        {filteredBookings?.length > 0 ? (
          <div className="mt-7 grid gap-4">
            {filteredBookings.map((b) => (
              <BookingCard key={b._id} booking={b} />
            ))}
          </div>
        ) : (
          <div className="mt-7">
            <EmptyBookings
              title={
                activeStatus !== "all"
                  ? t("emptyFilteredTitle", { status: filterName })
                  : t("emptyAllTitle")
              }
              description={
                activeStatus !== "all"
                  ? t("emptyFilteredDescription", { status: filterName })
                  : t("emptyAllDescription")
              }
            />
          </div>
        )}
      </div>
    </main>
  );
}
