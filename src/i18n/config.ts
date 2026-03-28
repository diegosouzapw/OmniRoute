export const LOCALES = [
  "ar",
  "bg",
  "cs",
  "da",
  "de",
  "en",
  "es",
  "fi",
  "fr",
  "he",
  "hu",
  "id",
  "hi",
  "it",
  "ja",
  "ko",
  "ms",
  "nl",
  "no",
  "phi",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sk",
  "sv",
  "th",
  "tr",
  "uk-UA",
  "vi",
  "zh-CN",
] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LANGUAGES: readonly {
  code: Locale;
  label: string;
  name: string;
  flag: string;
}[] = [
  { code: "ar", label: "AR", name: "العربية", flag: "🇸🇦" },
  { code: "bg", label: "BG", name: "Български", flag: "🇧🇬" },
  { code: "cs", label: "CS", name: "Čeština", flag: "🇨🇿" },
  { code: "da", label: "DA", name: "Dansk", flag: "🇩🇰" },
  { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
  { code: "es", label: "ES", name: "Español", flag: "🇪🇸" },
  { code: "fi", label: "FI", name: "Suomi", flag: "🇫🇮" },
  { code: "fr", label: "FR", name: "Français", flag: "🇫🇷" },
  { code: "he", label: "HE", name: "עברית", flag: "🇮🇱" },
  { code: "hu", label: "HU", name: "Magyar", flag: "🇭🇺" },
  { code: "id", label: "ID", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "hi", label: "HI", name: "हिन्दी", flag: "🇮🇳" },
  { code: "it", label: "IT", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", label: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "KO", name: "한국어", flag: "🇰🇷" },
  { code: "ms", label: "MS", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "nl", label: "NL", name: "Nederlands", flag: "🇳🇱" },
  { code: "no", label: "NO", name: "Norsk", flag: "🇳🇴" },
  { code: "phi", label: "PHI", name: "Filipino", flag: "🇵🇭" },
  { code: "pl", label: "PL", name: "Polski", flag: "🇵🇱" },
  { code: "pt-BR", label: "PT-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "pt", label: "PT", name: "Português (Portugal)", flag: "🇵🇹" },
  { code: "ro", label: "RO", name: "Română", flag: "🇷🇴" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "sk", label: "SK", name: "Slovenčina", flag: "🇸🇰" },
  { code: "sv", label: "SV", name: "Svenska", flag: "🇸🇪" },
  { code: "th", label: "TH", name: "ไทย", flag: "🇹🇭" },
  { code: "tr", label: "TR", name: "Türkçe", flag: "🇹🇷" },
  { code: "uk-UA", label: "UK-UA", name: "Українська", flag: "🇺🇦" },
  { code: "vi", label: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh-CN", label: "ZH-CN", name: "中文 (简体)", flag: "🇨🇳" },
] as const;

export const RTL_LOCALES = ["ar", "he"] as const;

export const LOCALE_COOKIE = "NEXT_LOCALE";
