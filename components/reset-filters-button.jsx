"use client";

import { RotateCcw } from "lucide-react";
import { useFilters } from "@/context/FilterContext";

export function ResetFiltersButton() {
  const { reset, isActive } = useFilters();

  return (
    <>
      {isActive && (
        <button
          type="button"
          onClick={reset}
          aria-label="Reset filters button"
          className="flex flex-row items-center justify-center gap-2 border rounded-md px-4 py-1.5 text-sm cursor-pointer hover:opacity-70 active:scale-[0.98]"
        >
          <RotateCcw size={16} /> Reset filters
        </button>
      )}
    </>
  );
}
