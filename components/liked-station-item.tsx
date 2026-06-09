"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { Favorite } from "@/lib/generated/prisma/client";
import { HeartMinus } from "lucide-react";
import PlayButton from "./play-button";
import { useEffect, useState } from "react";
import { Station } from "@/types/station";
import { fetchStationByUuid } from "@/lib/radio-browser";
import Link from "next/link";

type Props = {
  favorite: Favorite;
};

const LikedStationItem = ({ favorite }: Props) => {
  if (!favorite) return null;
  const { removeFavorite } = useFavorites();

  const [fetchedStation, setFetchedStation] = useState<Station | null>(null);

  useEffect(() => {
    fetchStationByUuid(favorite.stationuuid).then((s) => {
      if (s) setFetchedStation(s);
    });
  }, [favorite.stationuuid]);

  return (
    <div className="flex gap-4 p-4 md:p-8 rounded-md border border-foreground dark:border-background ">
      <Link
        href={favorite.homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        <div className="w-18 h-18 p-1 sm:w-32 sm:h-32 rounded-md bg-foreground border dark:bg-background flex items-center justify-center shrink-0">
          {favorite.favicon ? (
            <img
              src={favorite.favicon}
              alt={favorite.name ? "favorite.name" : "Radio station logo"}
              className="w-16 h-16 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <span className="text-3xl">📻</span>
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <p className="tracking-widest text-muted mb-0.5 line-clamp-2">
          {favorite.name}
        </p>
        <div className="flex gap-4">
          {fetchedStation && <PlayButton station={fetchedStation} />}
          <button
            aria-label="Unlike station"
            onClick={() => {
              removeFavorite(favorite.stationuuid);
            }}
            className="w-10 h-10 rounded-md border border-muted text-muted flex items-center justify-center dark:hover:text-background dark:hover:border-background hover:text-foreground hover:border-foreground  transition-colors shrink-0"
          >
            <HeartMinus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikedStationItem;
