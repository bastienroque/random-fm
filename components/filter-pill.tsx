"use client";

import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "rounded-md border px-3.5 py-1.5 text-sm transition-all duration-150 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-foreground bg-foreground text-background dark:border-background dark:bg-background dark:text-foreground"
          : "border-border  bg-background dark:bg-foreground text-muted hover:border-foreground/40 hover:text-foreground dark:border-background/40 dark:hover:border-background dark:hover:text-background",
      )}
    >
      {label}
    </button>
  );
}
