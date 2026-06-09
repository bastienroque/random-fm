"use client";

import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { useLastPlayed } from "@/context/LastPlayedContext";
import { notify } from "@/lib/notifications";
import { StepBack } from "lucide-react";

export function LastPlayedStationButton() {
  const { setStation, station } = useFilters(); // ← get current station too
  const { lastPlayed } = useLastPlayed();
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (!lastPlayed) {
      notify.error("No last played station found");
      return;
    }
    setStation(lastPlayed);

    if (station?.url_resolved !== lastPlayed.url_resolved) return;
    notify.success(`Now playing ${lastPlayed.name}`);
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !lastPlayed}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground text-background dark:bg-background dark:text-foreground px-4 py-3.5 text-sm font-medium transition-opacity hover:opacity-80 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background dark:border-t-foreground" />
            Tuning in…
          </>
        ) : (
          <>
            <StepBack size={16} />
            Listen to your last played station
          </>
        )}
      </button>
    </div>
  );
}
