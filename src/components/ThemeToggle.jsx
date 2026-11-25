import { useEffect, useState } from "react";
import  PomaMoon from "./icons/PomaMoon"
import PomaSun from "./icons/PomaSun"


function getInitialDark() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
  } catch {}
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function toggle() {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="p-2 text-sm text-muted hover:text-text"
    >
    {dark ? <PomaSun size={60} /> : <PomaMoon size={60} />}
    </button>
  );
}