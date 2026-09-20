"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, LogOut } from "lucide-react";

export default function LogoutButton({ setShowLogoutDialog }) {
  const t = useTranslations("Auth");

  return (
    <div className="mt-4 border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setShowLogoutDialog(true)}
        className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut size={18} />

        <span className="flex-1 text-start">{t("logout")}</span>

        <ChevronRight
          size={16}
          className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 rtl:rotate-180 rtl:translate-x-1 rtl:group-hover:translate-x-0"
        />
      </button>
    </div>
  );
}
