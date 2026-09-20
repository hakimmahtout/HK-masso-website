import { getTranslations } from "next-intl/server";
import DeleteAccountButton from "@/app/_components/_Settings/DeleteAccountButton";

export const metadata = {
  title: "Paramètres du Compte",
  description:
    "Gérez les paramètres de votre compte HK Masso, vos préférences de confidentialité, vos identifiants de connexion et vos notifications.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Paramètres du Compte | HK Masso",
    description: "Gestion des paramètres du compte client HK Masso.",
    url: "https://hkmasso.com/settings",
  },
};

export default async function Page() {
  const t = await getTranslations("SettingsPage");

  return (
    <section className="profile-section border-destructive/30">
      <div>
        <h1 className="font-display text-2xl font-semibold">{t("title")}</h1>

        <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <div className="mt-7 rounded-lg border border-destructive/20 p-5">
        <h2 className="font-semibold">{t("deleteAccount.title")}</h2>

        <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
          {t("deleteAccount.description")}
        </p>

        <DeleteAccountButton />
      </div>
    </section>
  );
}
