import { Menu } from "lucide-react";
import ModeButton from "@/app/_components/_NavBar/ModeButton";

export default function NavMenu({ setOpen }) {
  return (
    <div className="flex items-center gap-2 md:hidden">
      <ModeButton />
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="icon-button"
      >
        <Menu size={20} />
      </button>
    </div>
  );
}
