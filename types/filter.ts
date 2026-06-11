import type { Station } from "@/types/station";

export type Genre =
  | "Any"
  | "Jazz"
  | "Electronic"
  | "Classical"
  | "Rock"
  | "News"
  | "Ambient"
  | "Pop"
  | "Hip-Hop"
  | "Country"
  | "R&B"
  | "Metal";

export type Language =
  | "Any"
  | "English"
  | "French"
  | "Spanish"
  | "Arabic"
  | "Japanese"
  | "Portuguese"
  | "German"
  | "Italian";

export type Country =
  | "Any"
  | "US"
  | "UK"
  | "France"
  | "Japan"
  | "Brazil"
  | "Germany"
  | "Spain"
  | "Italy"
  | "Portugal";

export type FilterAction =
  | { type: "TOGGLE_GENRE"; payload: Genre }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_COUNTRY"; payload: Country }
  | { type: "RESET" };

export interface FilterState {
  genres: [Genre] | [Genre, Genre]; // 1 or 2 genres max
  language: Language;
  country: Country;
}

export interface FilterOption<T extends string> {
  label: string;
  value: T;
}

export interface FilterContextValue {
  filters: FilterState;
  toggleGenre: (genre: Genre) => void;
  setLanguage: (language: Language) => void;
  setCountry: (country: Country) => void;
  reset: () => void;
  isActive: boolean;
  isBuffering: boolean;
  isPlaying: boolean;
  streamError: boolean;
  station: Station | null;
  setStation: (station: Station | null) => void;
  setIsPlaying: (value: boolean) => void;
  setIsBuffering: (value: boolean) => void;
  setStreamError: (value: boolean) => void;
  registerTogglePlay: (fn: () => void) => void;
  togglePlay: () => void;
}

export type FilterKey = keyof FilterState;
