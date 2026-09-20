"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { cancelReservation } from "@/app/_lib/actions";

export default function CancelBookingDialog({
  bookingId,
  setShowCancelDialog,
}) {
  const t = useTranslations("CancelBookingDialog");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  function handleCancel() {
    setError(null);
    startTransition(async () => {
      try {
        await cancelReservation(bookingId);
        setShowCancelDialog(false);
      } catch (err) {
        setError(err.message || t("defaultError"));
      }
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={() => setShowCancelDialog(false)}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl font-semibold text-foreground">
          {t("title")}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>

        {error && (
          <p className="mt-3 rounded-md bg-destructive/10 p-2.5 text-xs text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowCancelDialog(false)}
            disabled={isPending}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-50"
          >
            {t("keepBooking")}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? t("cancelling") : t("confirmCancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
