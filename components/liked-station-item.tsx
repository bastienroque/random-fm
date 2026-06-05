import { useFavorites } from "@/context/FavoritesContext";
import { useFilters } from "@/context/FilterContext";
import { Favorite } from "@/lib/generated/prisma/client";
import { fetchStationByUuid } from "@/lib/radio-browser";
import { HeartMinus, Loader2, Pause, Play } from "lucide-react";

type Props = {
  favorite: Favorite;
};

const LikedStationItem = ({ favorite }: Props) => {
  if (!favorite) return null;

  const { removeFavorite } = useFavorites();
  const { station, setStation, isPlaying, isBuffering, streamError } =
    useFilters();
  const isCurrentStation = station?.stationuuid === favorite.stationuuid;

  const handlePlay = async () => {
    const station = await fetchStationByUuid(favorite.stationuuid);
    if (station) setStation(station);
  };

  return (
    <div className="flex gap-4 p-4 md:p-8 rounded-md border border-[#222]">
      <div className="w-18 h-18 p-1 sm:w-32 sm:h-32 rounded-md bg-foreground border dark:bg-background border-[#222] flex items-center justify-center shrink-0">
        {favorite.favicon ? (
          <img
            src={favorite.favicon}
            alt={favorite.name}
            className="w-16 h-16 object-contain"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : (
          <span className="text-3xl">📻</span>
        )}
      </div>
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <p className="tracking-widest text-muted mb-0.5">{favorite.name}</p>
        <div className="flex gap-4">
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={handlePlay}
            disabled={streamError}
            className="w-10 h-10 rounded-md border border-[#222] text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isCurrentStation && isBuffering ? (
              <Loader2 size={16} className="rounded-full animate-spin" />
            ) : isCurrentStation && isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>
          <button
            aria-label="Randomise station"
            onClick={() => {
              removeFavorite(favorite.stationuuid);
            }}
            className="w-10 h-10 rounded-md border border-[#222] text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HeartMinus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedStationItem;
