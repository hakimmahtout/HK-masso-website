import { getTranslations } from "next-intl/server";
import ProfileSidebar from "@/app/_components/_profile/ProfileSidebar";
import PageHeader from "@/app/_components/PageHeader";
import Account from "@/app/_components/_profile/Account";

export default async function Layout({ children }) {
  const t = await getTranslations("ProfileLayout");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <main className="section">
        <div className="container grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <ProfileSidebar>
            <Account />
          </ProfileSidebar>

          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </>
  );
}
