export default function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
        <Icon size={19} />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <strong className="mt-1 block text-sm">{value}</strong>
      </div>
    </div>
  );
}
