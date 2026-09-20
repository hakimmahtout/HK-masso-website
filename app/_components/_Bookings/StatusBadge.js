export default function StatusBadge({ status }) {
  return (
    <span className={`status status-${status}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
