import { useDarkMode } from "@/app/_contexts/DarkModeContext";
import { Moon, Sun } from "lucide-react";

export default function ModeButton() {
  const { isDarkMode, toggleLightDarkMode } = useDarkMode();

  return (
    <button
      aria-label="Toggle color theme"
      className="icon-button"
      onClick={toggleLightDarkMode}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
