"use client";

import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import Button from "@/app/_ui/Button";

export default function UpdateProfileButton() {
  const t = useTranslations("ProfilePage");
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? t("updating") : t("saveChanges")}
    </Button>
  );
}
