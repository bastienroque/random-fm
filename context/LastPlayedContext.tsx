"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import type { Station } from "@/types/station";

interface LastPlayedContextValue {
  lastPlayed: Station | null;
  updateLastPlayed: (station: Station) => void;
}

const LastPlayedContext = createContext<LastPlayedContextValue | null>(null);

export function LastPlayedProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const [lastPlayed, setLastPlayed] = useState<Station | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setLastPlayed(null);
      return;
    }
    fetch("/api/last-played")
      .then((res) => res.json())
      .then((data) => setLastPlayed(data.lastStation ?? null));
  }, [isSignedIn]);

  const updateLastPlayed = (station: Station) => {
    setLastPlayed(station);
    fetch("/api/last-played", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(station),
    });
  };

  return (
    <LastPlayedContext.Provider value={{ lastPlayed, updateLastPlayed }}>
      {children}
    </LastPlayedContext.Provider>
  );
}

export function useLastPlayed(): LastPlayedContextValue {
  const ctx = useContext(LastPlayedContext);
  if (!ctx)
    throw new Error("useLastPlayed must be used within a LastPlayedProvider");
  return ctx;
}
