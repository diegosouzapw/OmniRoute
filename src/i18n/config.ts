export const LOCALES = [
  "en",
  "pt-BR",
  "es",
  "fr",
  "it",
  "ru",
  "zh-CN",
  "de",
  "in",
  "th",
  "uk-UA",
  "ar",
  "ja",
  "vi",
  "bg",
  "da",
  "fi",
  "he",
  "hu",
  "id",
  "ko",
  "ms",
  "nl",
  "no",
  "pt",
  "ro",
  "pl",
  "sk",
  "sv",
  "phi",
] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LANGUAGES: readonly {
  code: Locale;
  label: string;
  name: string;
  flag: string;
}[] = [
  { code: "en", label: "EN", name: "English", flag: "🇺🇸" },
  { code: "pt-BR", label: "PT-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "es", label: "ES", name: "Español", flag: "🇪🇸" },
  { code: "fr", label: "FR", name: "Français", flag: "🇫🇷" },
  { code: "it", label: "IT", name: "Italiano", flag: "🇮🇹" },
  { code: "ru", label: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", label: "ZH-CN", name: "中文 (简体)", flag: "🇨🇳" },
  { code: "de", label: "DE", name: "Deutsch", flag: "🇩🇪" },
  { code: "in", label: "IN", name: "हिन्दी", flag: "🇮🇳" },
  { code: "th", label: "TH", name: "ไทย", flag: "🇹🇭" },
  { code: "uk-UA", label: "UK-UA", name: "Українська", flag: "🇺🇦" },
  { code: "ar", label: "AR", name: "العربية", flag: "🇸🇦" },
  { code: "ja", label: "JA", name: "日本語", flag: "🇯🇵" },
  { code: "vi", label: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "bg", label: "BG", name: "Български", flag: "🇧🇬" },
  { code: "da", label: "DA", name: "Dansk", flag: "🇩🇰" },
  { code: "fi", label: "FI", name: "Suomi", flag: "🇫🇮" },
  { code: "he", label: "HE", name: "עברית", flag: "🇮🇱" },
  { code: "hu", label: "HU", name: "Magyar", flag: "🇭🇺" },
  { code: "id", label: "ID", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ko", label: "KO", name: "한국어", flag: "🇰🇷" },
  { code: "ms", label: "MS", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "nl", label: "NL", name: "Nederlands", flag: "🇳🇱" },
  { code: "no", label: "NO", name: "Norsk", flag: "🇳🇴" },
  { code: "pt", label: "PT", name: "Português (Portugal)", flag: "🇵🇹" },
  { code: "ro", label: "RO", name: "Română", flag: "🇷🇴" },
  { code: "pl", label: "PL", name: "Polski", flag: "🇵🇱" },
  { code: "sk", label: "SK", name: "Slovenčina", flag: "🇸🇰" },
  { code: "sv", label: "SV", name: "Svenska", flag: "🇸🇪" },
  { code: "phi", label: "PHI", name: "Filipino", flag: "🇵🇭" },
] as const;

export const RTL_LOCALES = ["ar", "he"] as const;

export const LOCALE_COOKIE = "NEXT_LOCALE";
