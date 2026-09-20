"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";

import { signOutAction } from "@/app/_lib/actions";

export default function LogoutDialog({ setShowLogoutDialog }) {
  const t = useTranslations("Auth.logoutDialog");
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(() => signOutAction());
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      onClick={() => setShowLogoutDialog(false)}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl font-semibold">{t("title")}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowLogoutDialog(false)}
            disabled={isPending}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-50"
          >
            {t("cancel")}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? t("loggingOut") : t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
