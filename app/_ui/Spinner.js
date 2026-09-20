export default function Spinner({ size = "size-5" }) {
  return (
    <div
      className={`${size} animate-spin rounded-full border-2 border-muted border-t-primary`}
      aria-label="Loading"
      role="status"
    />
  );
}
