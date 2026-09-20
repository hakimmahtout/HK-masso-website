"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Error({ error, reset }) {
  const t = useTranslations("ErrorPage");

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("heading")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>

        {error?.message && (
          <div className="mt-4 rounded-md bg-destructive/10 p-3 text-xs font-mono text-destructive">
            {error.message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("tryAgain")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
