"use client";

import { useFavorites } from "@/context/FavoritesContext";
import LikedStationItem from "./liked-station-item";
import { useState } from "react";
import Pagination from "./pagination";

const LikedStationsGrid = () => {
  const { favorites } = useFavorites();

  const [currentPage, setCurrentPage] = useState(1);
  const [stationsPerPage, setStationsPerPage] = useState(8);

  const lastStationIndex = currentPage * stationsPerPage;
  const firstStationIndex = lastStationIndex - stationsPerPage;
  const currentFavorites = favorites.slice(firstStationIndex, lastStationIndex);

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div className="flex flex-col w-full md:grid md:grid-cols-2 gap-4">
        {currentFavorites.map((favorite) => (
          <LikedStationItem key={favorite.stationuuid} favorite={favorite} />
        ))}
      </div>
      <Pagination
        favorites={favorites.length}
        stationsPerPage={stationsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default LikedStationsGrid;
