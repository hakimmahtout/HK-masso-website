import { Check } from "lucide-react";

export default function TimelineItem({ label, active, last, danger }) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`mt-0.5 grid size-6 place-items-center rounded-full ${danger ? "bg-destructive text-destructive-foreground" : active ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}
        >
          {active ? <Check size={13} /> : null}
        </span>
        {!last && <span className="h-9 w-px bg-border" />}
      </div>
      <span
        className={`pt-1 text-sm font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </div>
  );
}
