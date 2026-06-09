"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import type { Favorite } from "@/lib/generated/prisma/client";
import { notify } from "@/lib/notifications";

interface FavoritesContextValue {
  favorites: Favorite[];
  addFavorite: (station: {
    stationuuid: string;
    name: string;
    favicon?: string;
    homepage: string;
    tags: string;
  }) => Promise<void>;
  removeFavorite: (stationuuid: string) => Promise<void>;
  isFavorite: (stationuuid: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!isSignedIn) {
      setFavorites([]);
      return;
    }
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data.favorites ?? []));
  }, [isSignedIn]);

  const addFavorite = useCallback(
    async (station: {
      stationuuid: string;
      name: string;
      favicon?: string;
    }) => {
      try {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(station),
        });
        if (response.ok) {
          const { newFavorite } = await response.json();
          setFavorites((prev) => [...prev, newFavorite]);
          notify.success("Added to your liked stations");
        } else {
          notify.error("Failed to add station");
        }
      } catch {
        notify.error("Failed to add station");
      }
    },
    [],
  );

  const removeFavorite = useCallback(async (stationuuid: string) => {
    try {
      const response = await fetch(`/api/favorites/${stationuuid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFavorites((prev) =>
          prev.filter((f) => f.stationuuid !== stationuuid),
        );
        notify.success("Removed from your liked stations");
      } else {
        notify.error("Failed to remove station");
      }
    } catch {
      notify.error("Failed to remove station");
    }
  }, []);

  const isFavorite = useCallback(
    (stationuuid: string) =>
      favorites.some((f) => f.stationuuid === stationuuid),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
