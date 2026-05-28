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
  | "Italy";

export interface FilterState {
  genres: [Genre] | [Genre, Genre]; // 1 or 2 genres max
  language: Language;
  country: Country;
}

export interface FilterOption<T extends string> {
  label: string;
  value: T;
}

export type FilterKey = keyof FilterState;
