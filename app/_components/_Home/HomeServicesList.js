import { getAllServices } from "@/app/_lib/data-service";

import ServiceCard from "@/app/_components/_Services/ServiceCard";

export default async function HomeServicesList() {
  const { services } = await getAllServices();

  if (!services.length) return null;

  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {services.slice(0, 3).map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </div>
  );
}
