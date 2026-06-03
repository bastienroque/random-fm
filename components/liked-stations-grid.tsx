"use client";

import { useFavorites } from "@/context/FavoritesContext";
import LikedStationItem from "./liked-station-item";

const LikedStationsGrid = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
      {favorites.map((favorite) => (
        <LikedStationItem key={favorite.stationuuid} favorite={favorite} />
      ))}
    </div>
  );
};

export default LikedStationsGrid;
