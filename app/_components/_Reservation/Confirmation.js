import { Check } from "lucide-react";

import Button from "@/app/_ui/Button";

export default function Confirmation({ onNavigate }) {
  return (
    <main className="grid min-h-[75vh] place-items-center bg-subtle px-4 py-16">
      <div className="w-full max-w-xl rounded-lg border border-border bg-card p-7 text-center shadow-xl sm:p-10">
        <span className="success-pulse mx-auto">
          <Check size={30} />
        </span>
        <p className="eyebrow mt-7">Appointment confirmed</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">
          Your time is reserved.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          We look forward to welcoming you. A confirmation has been prepared for{" "}
          <strong>{customer.email}</strong>.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-4 rounded-md bg-subtle p-5 text-left text-sm">
          <span className="text-muted-foreground">Reference</span>
          <strong className="text-right">SRN-84391</strong>
          <span className="text-muted-foreground">Treatment</span>
          <strong className="text-right">Deep Tissue Massage</strong>
          <span className="text-muted-foreground">Date & time</span>
          <strong className="text-right">Aug 30 · 14:30</strong>
          <span className="text-muted-foreground">Total</span>
          <strong className="text-right">€85</strong>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => onNavigate("bookings")}>
            View my bookings
          </Button>
          <Button variant="outline" onClick={() => onNavigate("home")}>
            Back to home
          </Button>
        </div>
      </div>
    </main>
  );
}
