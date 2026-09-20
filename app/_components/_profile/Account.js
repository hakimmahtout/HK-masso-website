import { auth } from "@/app/_lib/auth";

export default async function Account() {
  const session = await auth();
  return (
    <div className="border-b border-border pb-5">
      <div className="flex items-center gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary font-display font-semibold text-secondary-foreground">
          HM
        </div>

        <div className="min-w-0">
          <p className="truncate font-display font-semibold">
            {session.user.name}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {session.user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
