"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Locale = "en" | "pt-BR" | "es" | "fr" | "de" | "ja" | "zh-CN" | "ko" | "ru" | "ar";

const SECTION_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    "Getting Started": "Getting Started",
    Features: "Features",
    "API & Protocols": "API & Protocols",
    Deployment: "Deployment",
    Operations: "Operations",
    Development: "Development",
  },
  "pt-BR": {
    "Getting Started": "Primeiros Passos",
    Features: "Recursos",
    "API & Protocols": "API & Protocolos",
    Deployment: "Implantação",
    Operations: "Operações",
    Development: "Desenvolvimento",
  },
  es: {
    "Getting Started": "Primeros Pasos",
    Features: "Características",
    "API & Protocols": "API y Protocolos",
    Deployment: "Despliegue",
    Operations: "Operaciones",
    Development: "Desarrollo",
  },
  fr: {
    "Getting Started": "Démarrage",
    Features: "Fonctionnalités",
    "API & Protocols": "API et Protocoles",
    Deployment: "Déploiement",
    Operations: "Opérations",
    Development: "Développement",
  },
  de: {
    "Getting Started": "Erste Schritte",
    Features: "Funktionen",
    "API & Protocols": "API & Protokolle",
    Deployment: "Bereitstellung",
    Operations: "Betrieb",
    Development: "Entwicklung",
  },
  ja: {
    "Getting Started": "はじめに",
    Features: "機能",
    "API & Protocols": "APIとプロトコル",
    Deployment: "デプロイ",
    Operations: "運用",
    Development: "開発",
  },
  "zh-CN": {
    "Getting Started": "快速开始",
    Features: "功能",
    "API & Protocols": "API与协议",
    Deployment: "部署",
    Operations: "运维",
    Development: "开发",
  },
  ko: {
    "Getting Started": "시작하기",
    Features: "기능",
    "API & Protocols": "API 및 프로토콜",
    Deployment: "배포",
    Operations: "운영",
    Development: "개발",
  },
  ru: {
    "Getting Started": "Начало работы",
    Features: "Возможности",
    "API & Protocols": "API и Протоколы",
    Deployment: "Развертывание",
    Operations: "Эксплуатация",
    Development: "Разработка",
  },
  ar: {
    "Getting Started": "البدء",
    Features: "الميزات",
    "API & Protocols": "API والبروتوكولات",
    Deployment: "النشر",
    Operations: "العمليات",
    Development: "التطوير",
  },
};

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language;
  if (lang.startsWith("pt-BR")) return "pt-BR";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("zh")) return "zh-CN";
  if (lang.startsWith("ko")) return "ko";
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("ar")) return "ar";
  return "en";
}

export function useDocsLocale() {
  const searchParams = useSearchParams();
  return useMemo<Locale>(() => {
    const langParam = searchParams.get("lang");
    if (langParam && langParam in SECTION_LABELS) return langParam as Locale;
    return detectLocale();
  }, [searchParams]);
}

export function useLocalizedSectionTitle(englishTitle: string): string {
  const locale = useDocsLocale();
  return SECTION_LABELS[locale]?.[englishTitle] ?? englishTitle;
}

export function getAvailableLocales(): Locale[] {
  return Object.keys(SECTION_LABELS) as Locale[];
}

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  "zh-CN": "简体中文",
  ko: "한국어",
  ru: "Русский",
  ar: "العربية",
};

const COMMON_LOCALES: Locale[] = ["en", "pt-BR", "es", "fr", "de", "ja", "zh-CN", "ko", "ru", "ar"];

export function DocsLocaleSwitcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useMemo<Locale>(() => {
    const langParam = searchParams.get("lang");
    if (langParam && langParam in SECTION_LABELS) return langParam as Locale;
    if (typeof navigator !== "undefined") {
      const navLocale = detectLocale();
      if (navLocale in SECTION_LABELS) return navLocale;
    }
    return "en";
  }, [searchParams]);

  const handleLocaleChange = (locale: Locale) => {
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (locale === "en") {
      params.delete("lang");
    } else {
      params.set("lang", locale);
    }
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-xs border border-border rounded hover:border-primary/50 transition-colors text-text-muted hover:text-text-main"
        aria-label="Change documentation language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="material-symbols-outlined text-sm">language</span>
        {LOCALE_NAMES[currentLocale]}
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 bg-bg border border-border rounded-lg shadow-lg z-50 py-1 min-w-[160px]"
          role="listbox"
        >
          {COMMON_LOCALES.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-primary/5 transition-colors ${
                locale === currentLocale ? "text-primary font-semibold" : "text-text-muted"
              }`}
              role="option"
              aria-selected={locale === currentLocale}
            >
              {LOCALE_NAMES[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
