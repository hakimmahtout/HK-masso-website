import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
      "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
    ghost: "text-foreground hover:bg-muted",
    danger:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
