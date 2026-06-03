"use client";

import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function FilterPill({
  label,
  active,
  onClick,
  disabled = false,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3.5 py-1.5 text-sm transition-all duration-150 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted hover:border-foreground/40 hover:text-foreground",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {label}
    </button>
  );
}
