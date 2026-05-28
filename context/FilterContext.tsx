"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type { FilterState, Genre, Language, Country } from "@/types/filter";
import type { Station } from "@/types/station";

const DEFAULT_STATE: FilterState = {
  genres: ["Any"],
  language: "Any",
  country: "Any",
};

type FilterAction =
  | { type: "TOGGLE_GENRE"; payload: Genre }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_COUNTRY"; payload: Country }
  | { type: "RESET" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "TOGGLE_GENRE": {
      const genre = action.payload;

      // Selecting "Any" resets genres
      if (genre === "Any") return { ...state, genres: ["Any"] };

      const current = state.genres.filter((g) => g !== "Any") as Genre[];

      // Deselect if already selected
      if (current.includes(genre)) {
        const next = current.filter((g) => g !== genre) as Genre[];
        return {
          ...state,
          genres:
            next.length > 0 ? (next as [Genre] | [Genre, Genre]) : ["Any"],
        };
      }

      // Enforce max 2 — drop the oldest and add new
      const next = [...current, genre].slice(-2) as [Genre] | [Genre, Genre];
      return { ...state, genres: next };
    }

    case "SET_LANGUAGE":
      return { ...state, language: action.payload };

    case "SET_COUNTRY":
      return { ...state, country: action.payload };

    case "RESET":
      return DEFAULT_STATE;

    default:
      return state;
  }
}

interface FilterContextValue {
  filters: FilterState;
  toggleGenre: (genre: Genre) => void;
  setLanguage: (language: Language) => void;
  setCountry: (country: Country) => void;
  reset: () => void;
  isActive: boolean;
  station: Station | null;
  setStation: (station: Station | null) => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, dispatch] = useReducer(filterReducer, DEFAULT_STATE);
  const [station, setStation] = useState<Station | null>(null);

  const toggleGenre = useCallback(
    (genre: Genre) => dispatch({ type: "TOGGLE_GENRE", payload: genre }),
    [],
  );
  const setLanguage = useCallback(
    (language: Language) =>
      dispatch({ type: "SET_LANGUAGE", payload: language }),
    [],
  );
  const setCountry = useCallback(
    (country: Country) => dispatch({ type: "SET_COUNTRY", payload: country }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const isActive =
    filters.genres[0] !== "Any" ||
    filters.language !== "Any" ||
    filters.country !== "Any";

  return (
    <FilterContext.Provider
      value={{
        filters,
        toggleGenre,
        setLanguage,
        setCountry,
        reset,
        isActive,
        station,
        setStation,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within a FilterProvider");
  return ctx;
}
