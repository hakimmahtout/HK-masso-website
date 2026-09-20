"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/app/_ui/Button";
import CancelBookingDialog from "./CancelBookingDialog";

export default function CancelButton({ bookingId }) {
  const t = useTranslations("CancelButton");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full text-destructive hover:bg-destructive/10"
        onClick={() => setShowCancelDialog(true)}
      >
        {t("cancelAppointment")}
      </Button>

      {showCancelDialog && (
        <CancelBookingDialog
          bookingId={bookingId}
          setShowCancelDialog={setShowCancelDialog}
        />
      )}
    </>
  );
}
