import { useFavorites } from "@/context/FavoritesContext";
import { Show, SignInButton } from "@clerk/nextjs";
import { HeartMinus, HeartPlus } from "lucide-react";
import type { Station } from "@/types/station";

type Props = {
  station: Station;
};

export function LikeStationButton({ station }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavorite = async () => {
    if (isFavorite(station.stationuuid)) {
      await removeFavorite(station.stationuuid);
    } else {
      await addFavorite({
        stationuuid: station.stationuuid,
        name: station.name,
        favicon: station.favicon,
        homepage: station.homepage,
        tags: station.tags,
      });
    }
  };

  const favorited = isFavorite(station.stationuuid);

  return (
    <>
      <Show when="signed-in">
        <button
          aria-label="Randomise station"
          onClick={handleFavorite}
          className="w-10 h-10 rounded-md border border-muted text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {favorited ? (
            <HeartMinus
              size={16}
              className="text-white dark:text-black hover:text-[#ccc] "
            />
          ) : (
            <HeartPlus size={16} />
          )}
        </button>
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            aria-label="Like station"
            onClick={handleFavorite}
            className="w-10 h-10 rounded-md border border-muted text-muted flex items-center justify-center hover:text-[#ccc] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HeartPlus size={16} />
          </button>
        </SignInButton>
      </Show>
    </>
  );
}
