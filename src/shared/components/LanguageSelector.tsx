"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LANGUAGES, LOCALE_COOKIE } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";

const LOCALE_FLAG_COUNTRY: Record<Locale, string> = {
  ar: "sa",
  bg: "bg",
  bn: "bd",
  cs: "cz",
  da: "dk",
  de: "de",
  en: "us",
  es: "es",
  fa: "ir",
  fi: "fi",
  fr: "fr",
  gu: "in",
  he: "il",
  hi: "in",
  hu: "hu",
  id: "id",
  in: "id",
  it: "it",
  ja: "jp",
  ko: "kr",
  mr: "in",
  ms: "my",
  nl: "nl",
  no: "no",
  phi: "ph",
  pl: "pl",
  pt: "pt",
  "pt-BR": "br",
  ro: "ro",
  ru: "ru",
  sk: "sk",
  sv: "se",
  sw: "ke",
  ta: "in",
  te: "in",
  th: "th",
  tr: "tr",
  "uk-UA": "ua",
  ur: "pk",
  vi: "vn",
  "zh-CN": "cn",
};

function getFlagUrl(localeCode: Locale): string {
  const cc = LOCALE_FLAG_COUNTRY[localeCode] || "us";
  return `https://flagcdn.com/24x18/${cc}.png`;
}

/** Persist locale preference in cookie + localStorage (outside component scope for ESLint) */
function persistLocale(code: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE, code);
  } catch {
    // Ignore
  }
}

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: Locale) => {
    if (code === locale) {
      setOpen(false);
      return;
    }

    persistLocale(code);
    setOpen(false);
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-text-main hover:bg-surface-hover transition-all border border-transparent hover:border-border"
        title={currentLang.name}
      >
        <span
          aria-hidden="true"
          className="h-[14px] w-[18px] rounded-[2px] bg-cover bg-center bg-no-repeat shrink-0"
          style={{ backgroundImage: `url(${getFlagUrl(currentLang.code)})` }}
        />
        <span className="text-xs font-semibold tracking-wide">{currentLang.label}</span>
        <span
          className={`material-symbols-outlined text-[14px] text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 max-h-80 rounded-xl border border-border bg-bg shadow-xl z-50 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                lang.code === locale
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-main hover:bg-surface-hover"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-[14px] w-[18px] rounded-[2px] bg-cover bg-center bg-no-repeat shrink-0"
                style={{ backgroundImage: `url(${getFlagUrl(lang.code)})` }}
              />
              <span className="flex-1 text-left">{lang.name}</span>
              {lang.code === locale && (
                <span className="material-symbols-outlined text-[16px] text-primary">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
