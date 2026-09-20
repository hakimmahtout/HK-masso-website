export default function Value({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
        <Icon size={18} />
      </span>
      <div>
        <strong className="text-sm">{title}</strong>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
