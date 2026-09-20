"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, Settings, ChevronRight } from "lucide-react";

import Link from "next/link";
import LogoutButton from "@/app/_components/_profile/LogoutButton";
import LogoutDialog from "@/app/_components/_profile/LogoutDialog";

export default function ProfileSidebar({ children }) {
  const t = useTranslations("ProfileSidebar");
  const pathname = usePathname();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const links = [
    {
      label: t("personalInfo"),
      href: "/profile",
      icon: User,
    },
    {
      label: t("accountSettings"),
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <aside className="flex h-fit flex-col rounded-xl border border-border bg-card p-4">
        {/* User */}
        {children}

        {/* Navigation */}
        <nav className="mt-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              link.href === "/profile"
                ? pathname.endsWith("/profile")
                : pathname.includes(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <Icon size={18} />

                <span className="flex-1">{link.label}</span>

                <ChevronRight
                  size={16}
                  className={`transition-transform rtl:rotate-180 ${
                    active
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 rtl:translate-x-1"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <LogoutButton setShowLogoutDialog={setShowLogoutDialog} />
      </aside>

      {/* Logout confirmation */}
      {showLogoutDialog && (
        <LogoutDialog setShowLogoutDialog={setShowLogoutDialog} />
      )}
    </>
  );
}
