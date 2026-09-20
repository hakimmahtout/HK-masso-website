import { getTranslations } from "next-intl/server";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import FooterLinks from "@/app/_components/_Footer/FooterLinks";
import Logo from "@/app/_components/_NavBar/Logo";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />

          <p className="mt-5 max-w-sm text-sm leading-6 text-brand-muted">
            {t("description")}
          </p>
          <div className="mt-5 flex gap-2">
            <span className="footer-icon">
              <FaInstagram size={16} />
            </span>
            <span className="footer-icon">
              <FaFacebook size={16} />
            </span>
          </div>
        </div>

        <FooterLinks
          title={t("discover.title")}
          links={[
            [t("discover.services"), "/services"],
            [t("discover.about"), "/about"],
            [t("discover.bookNow"), "/reservation"],
          ]}
        />

        <FooterLinks
          title={t("account.title")}
          links={[
            [t("account.myBookings"), "/bookings"],
            [t("account.profile"), "/profile"],
            [t("account.login"), "/login"],
          ]}
        />

        <div>
          <h3 className="font-semibold">{t("visit.title")}</h3>
          <div className="mt-4 space-y-3 text-sm text-brand-muted">
            <p>
              {t("visit.addressLine1")}
              <br />
              {t("visit.addressLine2")}
            </p>
            <p>{t("visit.hours")}</p>
            <p>{t("visit.phone")}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="container flex flex-col gap-2 py-5 text-xs text-brand-muted sm:flex-row sm:justify-between">
          <span>{t("copyright")}</span>
          <span>{t("legal")}</span>
        </div>
      </div>
    </footer>
  );
}
