import type { FilterState } from "@/types/filter";
import type { Station } from "@/types/station";

const API_BASE = "https://de1.api.radio-browser.info/json";
const CACHE_TTL = 60 * 60;

function buildParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams({
    limit: "15",
    order: "random",
    hidebroken: "true",
    has_geo_info: "false",
  });

  if (filters.genres[0] !== "Any") {
    // API accepts a comma-separated tag list — all tags must match
    params.set("tag", filters.genres.join(",").toLowerCase());
  }

  if (filters.language !== "Any") {
    params.set("language", filters.language.toLowerCase());
  }

  if (filters.country !== "Any") {
    // API uses ISO 3166-1 country names (full name, not code)
    const countryMap: Record<string, string> = {
      US: "United States",
      UK: "United Kingdom",
      France: "France",
      Japan: "Japan",
      Brazil: "Brazil",
      Germany: "Germany",
      Spain: "Spain",
      Italy: "Italy",
    };
    params.set("country", countryMap[filters.country] ?? filters.country);
  }

  return params;
}

export async function fetchRandomStation(
  filters: FilterState,
): Promise<Station | null> {
  const params = buildParams(filters);
  const res = await fetch(`${API_BASE}/stations/search?${params.toString()}`, {
    headers: { "User-Agent": "random-fm/1.0" },
    next: { revalidate: CACHE_TTL },
  });

  if (!res.ok) throw new Error(`radio-browser API error: ${res.status}`);

  const stations: Station[] = await res.json();
  if (stations.length === 0) return null;

  // Pick a random one from the returned batch
  return stations[Math.floor(Math.random() * stations.length)];
}

export async function fetchStationByUuid(
  stationuuid: string,
): Promise<Station | null> {
  try {
    const res = await fetch(`${API_BASE}/stations/byuuid/${stationuuid}`, {
      headers: { "User-Agent": "random-fm/1.0" },
      next: { revalidate: CACHE_TTL },
    });
    const data = await res.json();
    return data[0] ?? null;
  } catch (error) {
    console.error("Error fetching station by UUID:", error);
    return null;
  }
}

export async function fetchLastPlayedStation(
  stationuuid: string,
): Promise<Station | null> {
  try {
    const res = await fetch(`${API_BASE}/stations/byuuid/${stationuuid}`, {
      headers: { "User-Agent": "random-fm/1.0" },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return data[0] ?? null;
  } catch (error) {
    console.error("Last played station isn't available anymore", error);
    return null;
  }
}
