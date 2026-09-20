"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

import Button from "@/app/_ui/Button";
import DeleteAccountDialog from "./DeleteAccountDialog";

export default function DeleteAccountButton() {
  const t = useTranslations("SettingsPage.deleteAccount");
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);

  return (
    <>
      <Button
        variant="danger"
        className="mt-5"
        onClick={() => setShowDeleteAccountDialog(true)}
      >
        <Trash2 size={16} />
        {t("button")}
      </Button>
      {showDeleteAccountDialog && (
        <DeleteAccountDialog
          setShowDeleteAccountDialog={setShowDeleteAccountDialog}
        />
      )}
    </>
  );
}
