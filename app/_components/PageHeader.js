export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="border-b border-border bg-subtle">
      <div className="container py-14 sm:py-18">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
