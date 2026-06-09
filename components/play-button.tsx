"use client";

import { Loader2, Pause, Play } from "lucide-react";
import { useFilters } from "@/context/FilterContext";
import type { Station } from "@/types/station";
import { useLastPlayed } from "@/context/LastPlayedContext";

type Props = { station: Station };

const PlayButton = ({ station }: Props) => {
  const {
    station: currentStation,
    setStation,
    isPlaying,
    isBuffering,
    togglePlay,
  } = useFilters();
  const { updateLastPlayed } = useLastPlayed();

  const isCurrentStation = currentStation?.stationuuid === station.stationuuid;

  const handleClick = () => {
    if (isCurrentStation) {
      togglePlay();
    } else {
      setStation(station);
      updateLastPlayed(station);
    }
  };

  return (
    <button
      aria-label={isCurrentStation && isPlaying ? "Pause" : "Play"}
      onClick={handleClick}
      className="w-10 h-10 rounded-md border border-muted text-muted flex items-center justify-center hover:border-foreground dark:hover:border-background hover:text-foreground dark:hover:text-background transition-colors shrink-0"
    >
      {isCurrentStation && isBuffering ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isCurrentStation && isPlaying ? (
        <Pause size={16} />
      ) : (
        <Play size={16} />
      )}
    </button>
  );
};

export default PlayButton;
