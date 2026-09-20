import { getTranslations } from "next-intl/server";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

import PageHeader from "@/app/_components/PageHeader";
import ContactItem from "@/app/_components/ContactItem";
import Button from "@/app/_ui/Button";
import Field from "@/app/_ui/Field";

const inputClass =
  "h-12 w-full rounded-md border border-input bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground";

export async function generateMetadata() {
  const t = await getTranslations("ContactPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      t("keywords.1"),
      t("keywords.2"),
      t("keywords.3"),
      t("keywords.4"),
      t("keywords.5"),
    ],
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: "https://hkmasso.com/contact",
    },
  };
}

export default async function Page() {
  const t = await getTranslations("ContactPage");
  const tForm = await getTranslations("ContactForm");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("headerTitle")}
        description={t("headerDescription")}
      />
      <main className="section">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              {t("visitTitle")}
            </h2>
            <div className="mt-7 grid gap-5">
              <ContactItem
                icon={Phone}
                label={t("phoneLabel")}
                value="+33 1 84 80 26 40"
              />
              <ContactItem
                icon={Mail}
                label={t("emailLabel")}
                value="hello@serenity-wellness.fr"
              />
              <ContactItem
                icon={MapPin}
                label={t("addressLabel")}
                value={t("addressValue")}
              />
              <ContactItem
                icon={Clock3}
                label={t("hoursLabel")}
                value={t("hoursValue")}
              />
            </div>
            <div className="mt-8 grid h-56 place-items-center rounded-lg bg-brand text-brand-foreground">
              <div className="text-center">
                <MapPin className="mx-auto text-primary" />
                <strong className="mt-3 block">{t("studioName")}</strong>
                <span className="mt-1 block text-sm text-brand-muted">
                  {t("studioLocation")}
                </span>
              </div>
            </div>
          </div>

          <form className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold">
              {tForm("formTitle")}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label={tForm("nameLabel")}>
                <input
                  className={inputClass}
                  placeholder={tForm("namePlaceholder")}
                  required
                />
              </Field>
              <Field label={tForm("emailLabel")}>
                <input
                  className={inputClass}
                  type="email"
                  placeholder={tForm("emailPlaceholder")}
                  required
                />
              </Field>
              <Field label={tForm("phoneLabel")}>
                <input
                  className={inputClass}
                  placeholder={tForm("phonePlaceholder")}
                />
              </Field>
              <Field label={tForm("subjectLabel")}>
                <select className={inputClass}>
                  <option>{tForm("subjects.booking")}</option>
                  <option>{tForm("subjects.advice")}</option>
                  <option>{tForm("subjects.general")}</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={tForm("messageLabel")}>
                  <textarea
                    className={`${inputClass} min-h-36 py-3`}
                    placeholder={tForm("messagePlaceholder")}
                    required
                  />
                </Field>
              </div>
            </div>
            <Button type="submit" className="mt-6">
              {tForm("submitButton")} <ArrowRight size={16} />
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
