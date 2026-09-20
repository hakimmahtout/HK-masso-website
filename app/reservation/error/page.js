import { AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Button from "@/app/_ui/Button";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookingFailedPage" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BookingFailedPage" });

  const resolvedSearchParams = await searchParams;
  const message = resolvedSearchParams?.message;

  const displayMessage = message || t("defaultMessage");

  return (
    <main className="grid min-h-[75vh] place-items-center bg-subtle px-4 py-16">
      <div className="w-full max-w-xl rounded-lg border border-destructive/20 bg-card p-7 text-center shadow-xl sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle size={30} />
        </span>
        <p className="eyebrow mt-7 text-destructive">{t("eyebrow")}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          {displayMessage}
        </p>
        <div className="mt-7 rounded-md bg-destructive/5 p-5 text-center text-sm text-destructive">
          <p className="font-medium">{t("whatHappenedTitle")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("whatHappenedDetails")}
          </p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/reservation">{t("tryAgain")}</Button>
          <Button href="/" variant="outline">
            {t("backToHome")}
          </Button>
        </div>
      </div>
    </main>
  );
}
