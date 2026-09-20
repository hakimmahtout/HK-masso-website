import Link from "next/link";

export default function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map(([l, p]) => (
          <Link
            key={p}
            href={p}
            className="w-fit text-sm text-brand-muted transition hover:text-brand-foreground"
          >
            {l}
          </Link>
        ))}
      </div>
    </div>
  );
}
