"use client";

import type { Station } from "@/types/station";
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  type ReactNode,
  useRef,
} from "react";
import type {
  FilterState,
  FilterAction,
  FilterContextValue,
  Genre,
  Language,
  Country,
} from "@/types/filter";

const DEFAULT_STATE: FilterState = {
  genres: ["Any"],
  language: "Any",
  country: "Any",
};

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

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, dispatch] = useReducer(filterReducer, DEFAULT_STATE);
  const [station, setStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [streamError, setStreamError] = useState(false);

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

  const togglePlayRef = useRef<() => void>(() => {});

  const registerTogglePlay = useCallback((fn: () => void) => {
    togglePlayRef.current = fn;
  }, []);

  const togglePlay = useCallback(() => {
    togglePlayRef.current();
  }, []);

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
        isPlaying,
        isBuffering,
        streamError,
        setStreamError,
        setIsBuffering,
        setIsPlaying,
        registerTogglePlay,
        togglePlay,
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
