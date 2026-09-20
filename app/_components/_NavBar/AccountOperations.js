import { ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { auth } from "@/app/_lib/auth";
import Button from "@/app/_ui/Button";

export default async function AccountOperations() {
  const session = await auth();
  const t = await getTranslations("Navigation");

  return (
    <>
      {session ? (
        <>
          <Link
            href="/profile"
            className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground"
          >
            <User />
          </Link>
          <Button href="/reservation">
            {t("bookAppointment")}{" "}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Button>
        </>
      ) : (
        <Button href="/login" variant="outline">
          {t("login")}
        </Button>
      )}
    </>
  );
}
