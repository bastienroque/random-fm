"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://de1.api.radio-browser.info/json";

const StationsCounter = () => {
  const [stations, setStations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/stats`, {
          headers: { "User-Agent": "random-fm/1.0" },
        });
        if (response.ok) {
          const data = await response.json();
          setStations(data.stations ?? 0);
        } else {
          console.error("Failed to fetch stations count");
        }
      } catch (error) {
        console.error("Error fetching stations count:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <p className="text-muted mt-1 px-2 border border-muted rounded-md flex items-center justify-between text-sm">
        Loading stations count...
      </p>
    );
  }

  return (
    <p className="pl-2 border rounded-md w-full md:w-auto h-fit flex items-center justify-between gap-2 text-sm">
      Stations currently available:
      <span className="font-semibold p-2 dark:bg-background dark:text-foreground bg-foreground text-background rounded-md">
        {stations}
      </span>
    </p>
  );
};

export default StationsCounter;
