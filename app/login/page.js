import { getTranslations } from "next-intl/server";
import LoginWithGoogle from "../_components/_Login/LoginWithGoogle";

export const metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre espace client HK Masso pour gérer vos rendez-vous, consulter vos séances de massothérapie et réserver facilement vos prochains soins.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Connexion | HK Masso",
    description: "Accédez à votre espace client HK Masso.",
    url: "http://localhost:3000/login",
  },
};

export default async function Page() {
  const t = await getTranslations("LoginPage");

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-background px-4">
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-auth-border bg-card/80 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="text-center">
            <span className="eyebrow mb-2 block">{t("eyebrow")}</span>
            <h2 className="font-display text-3xl font-semibold text-card-foreground">
              {t("heading")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("subheading")}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {/* Google Sign-In Button */}
            <LoginWithGoogle />

            {/* Facebook Sign-In Button */}
            <button
              type="button"
              className="relative flex w-full items-center justify-center gap-3 rounded-radius-md border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary hover:bg-subtle focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            >
              <svg className="h-5 w-5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{t("continueWithFacebook")}</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            {t("termsPrefix")}{" "}
            <a href="#" className="underline hover:text-foreground">
              {t("termsLink")}
            </a>{" "}
            {t("termsAnd")}{" "}
            <a href="#" className="underline hover:text-foreground">
              {t("privacyLink")}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
