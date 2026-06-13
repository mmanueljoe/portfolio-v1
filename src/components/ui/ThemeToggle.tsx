"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  // Both icons render; CSS picks which to show from the `.dark` class, so there's
  // no client-only mount gap or hydration flash (ADR-008).
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="text-on-surface-muted transition-colors duration-150 hover:text-on-surface"
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="block dark:hidden" />
    </button>
  );
}
