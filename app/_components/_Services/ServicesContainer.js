export default function ServicesContainer({ children }) {
  return (
    <div className="transition-opacity duration-200 opacity-100">
      {children}
    </div>
  );
}
