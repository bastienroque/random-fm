"use client";

import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { fetchRandomStation } from "@/lib/radio-browser";
import { useLastPlayed } from "@/context/LastPlayedContext";
import { notify } from "@/lib/notifications";

export function RandomiseButton() {
  const { filters, setStation } = useFilters();
  const { updateLastPlayed } = useLastPlayed();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const station = await fetchRandomStation(filters);
      if (!station) {
        notify.error(
          "No stations found for these filters — try changing them.",
        );
        return;
      }
      setStation(station);
      updateLastPlayed(station);
    } catch {
      setError("Couldn't reach the radio API. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label="Find a random station button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground text-background dark:bg-background dark:text-foreground px-4 py-3.5 text-sm font-medium transition-opacity hover:opacity-80 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background dark:border-t-foreground" />
            Tuning in…
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
              <circle cx="12" cy="12" r="2" />
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
            </svg>
            Find a random station
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="text-center text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
