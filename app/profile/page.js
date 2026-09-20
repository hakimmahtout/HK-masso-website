import { getTranslations } from "next-intl/server";
import { auth } from "@/app/_lib/auth";
import { updateProfile } from "@/app/_lib/actions";
import Field from "@/app/_ui/Field";
import UpdateProfileButton from "@/app/_components/_profile/UpdateProfileButton";

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground disabled:opacity-70 disabled:border-muted";

export const metadata = {
  title: "Mon Profil",
  description:
    "Gérez votre espace personnel HK Masso : consultez vos informations client, suivez vos réservations à venir et retrouvez l'historique de vos soins.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Mon Profil | HK Masso",
    description: "Espace personnel client HK Masso.",
    url: "https://hkmasso.com/profile",
  },
};

export default async function Page() {
  const { user } = await auth();
  const t = await getTranslations("ProfilePage");

  return (
    <section className="profile-section">
      <div>
        <h1 className="font-display text-2xl font-semibold">{t("title")}</h1>

        <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <form action={updateProfile}>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label={t("labels.fullName")}>
            <input
              name="name"
              className={inputClass}
              defaultValue={user.name}
            />
          </Field>

          <Field label={t("labels.gender")}>
            <select
              key={user.gender}
              name="gender"
              className={inputClass}
              defaultValue={user.gender}
            >
              <option value="" disabled>
                {t("genderOptions.select")}
              </option>
              <option value="male">{t("genderOptions.male")}</option>
              <option value="female">{t("genderOptions.female")}</option>
            </select>
          </Field>

          <Field label={t("labels.email")}>
            <input
              type="email"
              disabled
              className={inputClass}
              defaultValue={user.email}
            />
          </Field>
        </div>
        <div className="mt-7 flex justify-end border-t border-border pt-5">
          <UpdateProfileButton />
        </div>
      </form>
    </section>
  );
}
