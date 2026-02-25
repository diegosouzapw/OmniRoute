export const LOCALES = ["en", "pt-BR"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LANGUAGES: readonly {
  code: Locale;
  label: string;
  name: string;
  flag: string;
}[] = [
  { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
  { code: "pt-BR", label: "PT", name: "Português", flag: "🇧🇷" },
] as const;

export const LOCALE_COOKIE = "NEXT_LOCALE";
