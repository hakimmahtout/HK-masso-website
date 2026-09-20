import { getTranslations } from "next-intl/server";
import { Heart, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import Image from "next/image";

import heroImage from "@/public/serenity-hero.jpg";
import PageHeader from "@/app/_components/PageHeader";
import Value from "@/app/_components/Value";
import Rating from "@/app/_components/Rating";

export async function generateMetadata() {
  const t = await getTranslations("AboutPage.metadata");

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
      url: "https://hkmasso.com/about",
    },
  };
}

export default async function Page() {
  const t = await getTranslations("AboutPage");

  const statistics = [
    { value: "12k+", label: t("stats.completed") },
    { value: "4.9", label: t("stats.rating") },
    { value: "9", label: t("stats.practitioners") },
    { value: "96%", label: t("stats.returnRate") },
  ];

  const workers = [
    {
      id: 1,
      name: t("team.worker1.name"),
      initials: "HR",
      role: t("team.worker1.role"),
      rating: 4.9,
    },
    {
      id: 2,
      name: t("team.worker2.name"),
      initials: "SA",
      role: t("team.worker2.role"),
      rating: 4.9,
    },
    {
      id: 3,
      name: t("team.worker3.name"),
      initials: "NB",
      role: t("team.worker3.role"),
      rating: 4.8,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("headerTitle")}
        description={t("headerDescription")}
      />
      <main>
        <section className="section">
          <div className="container grid items-center gap-10 lg:grid-cols-2">
            <Image
              src={heroImage}
              alt={t("heroImageAlt")}
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
            <div>
              <p className="eyebrow">{t("since")}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                {t("storyTitle")}
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                {t("storyDescription")}
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Value
                  icon={Heart}
                  title={t("values.care.title")}
                  text={t("values.care.text")}
                />
                <Value
                  icon={ShieldCheck}
                  title={t("values.trust.title")}
                  text={t("values.trust.text")}
                />
                <Value
                  icon={Sparkles}
                  title={t("values.details.title")}
                  text={t("values.details.text")}
                />
                <Value
                  icon={UserRound}
                  title={t("values.human.title")}
                  text={t("values.human.text")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-brand text-brand-foreground">
          <div className="container grid gap-px py-10 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <strong className="font-display text-3xl text-primary">
                  {s.value}
                </strong>
                <p className="mt-2 text-sm text-brand-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("teamEyebrow")}</p>
                <h2>{t("teamTitle")}</h2>
              </div>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {workers.map((w) => (
                <div
                  key={w.id}
                  className="rounded-lg border border-border bg-card p-6 text-center"
                >
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-secondary font-display text-2xl font-semibold text-secondary-foreground">
                    {w.initials}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {w.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.role}</p>
                  <div className="mt-3 flex justify-center">
                    <Rating value={w.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
