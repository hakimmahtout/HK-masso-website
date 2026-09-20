import { Star } from "lucide-react";

export default function Rating({ value = 4.9, count }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Star size={15} className="fill-primary text-primary" />
      <strong>{value}</strong>
      {count && <span className="text-muted-foreground">({count})</span>}
    </div>
  );
}
