"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <button className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer h-10 md:px-4 rounded-md hover:bg-muted/10 active:scale-[0.90]"
      aria-label={`Toggle theme to ${theme === "dark" ? "light" : "dark"}`}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
}
