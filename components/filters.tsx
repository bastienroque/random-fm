"use client";

import { FilterPill } from "@/components/filter-pill";
import { useFilters } from "@/context/FilterContext";
import type { Genre, Language, Country, FilterOption } from "@/types/filter";

const GENRES: FilterOption<Genre>[] = [
  { label: "Any", value: "Any" },
  { label: "Jazz", value: "Jazz" },
  { label: "Electronic", value: "Electronic" },
  { label: "Classical", value: "Classical" },
  { label: "Rock", value: "Rock" },
  { label: "News", value: "News" },
  { label: "Ambient", value: "Ambient" },
  { label: "Pop", value: "Pop" },
  { label: "Hip-Hop", value: "Hip-Hop" },
  { label: "Metal", value: "Metal" },
];

const LANGUAGES: FilterOption<Language>[] = [
  { label: "Any", value: "Any" },
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
  { label: "Arabic", value: "Arabic" },
  { label: "Japanese", value: "Japanese" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "German", value: "German" },
];

const COUNTRIES: FilterOption<Country>[] = [
  { label: "Any", value: "Any" },
  { label: "🇺🇸 US", value: "US" },
  { label: "🇬🇧 UK", value: "UK" },
  { label: "🇫🇷 France", value: "France" },
  { label: "🇯🇵 Japan", value: "Japan" },
  { label: "🇧🇷 Brazil", value: "Brazil" },
  { label: "🇩🇪 Germany", value: "Germany" },
  { label: "🇪🇸 Spain", value: "Spain" },
];

export function FiltersSection() {
  const { filters, toggleGenre, setLanguage, setCountry, reset, isActive } =
    useFilters();

  const atGenreLimit =
    filters.genres[0] !== "Any" && filters.genres.length === 2;

  return (
    <section aria-label="Station filters" className="space-y-6">
      {/* Genre — up to 2 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Genre
          </p>
          {filters.genres[0] !== "Any" && (
            <span className="text-xs text-muted-foreground">
              {filters.genres.length}/2 selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(({ label, value }) => {
            const active =
              value === "Any"
                ? filters.genres[0] === "Any"
                : filters.genres.includes(value);
            return (
              <FilterPill
                key={value}
                label={label}
                active={active}
                onClick={() => toggleGenre(value)}
              />
            );
          })}
        </div>
      </div>

      {/* Language — single select */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Language
          </p>
          {filters.language !== "Any" && (
            <span className="text-xs text-muted-foreground">1/1 selected</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(({ label, value }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.language === value}
              onClick={() =>
                setLanguage(filters.language === value ? "Any" : value)
              }
            />
          ))}
        </div>
      </div>

      {/* Country — single select */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            Country
          </p>
          {filters.country !== "Any" && (
            <span className="text-xs text-muted-foreground">1/1 selected</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map(({ label, value }) => (
            <FilterPill
              key={value}
              label={label}
              active={filters.country === value}
              onClick={() =>
                setCountry(filters.country === value ? "Any" : value)
              }
            />
          ))}
        </div>
      </div>

      {/* Reset */}
      {isActive && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
        >
          Reset filters
        </button>
      )}
    </section>
  );
}
