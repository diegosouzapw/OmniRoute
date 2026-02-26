# OmniRoute — Dashboard-funksjonsgalleri

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

Visuell veiledning til hver del av OmniRoute-dashbordet.

---

## 🔌 Leverandører

Administrer AI-leverandørtilkoblinger: OAuth-leverandører (Claude Code, Codex, Gemini CLI), API-nøkkelleverandører (Groq, DeepSeek, OpenRouter) og gratisleverandører (iFlow, Qwen, Kiro).

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Kombinasjoner

Lag modellrutingskombinasjoner med 6 strategier: fyll-først, round-robin, kraft-av-to-valg, tilfeldig, minst brukt og kostnadsoptimalisert. Hver kombinasjon kjeder flere modeller med automatisk fallback.

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Omfattende bruksanalyse med symbolforbruk, kostnadsestimater, aktivitetsvarmekart, ukentlige distribusjonsdiagrammer og sammenbrudd per leverandør.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 Systemhelse

Sanntidsovervåking: oppetid, minne, versjon, latenspersentiler (p50/p95/p99), hurtigbufferstatistikk og leverandørens strømbrytertilstander.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Oversetter Lekeplass

Fire moduser for feilsøking av API-oversettelser: **Lekeplass** (formatkonvertering), **Chattester** (liveforespørsler), **Testbenk** (batch-tester) og **Live Monitor** (sanntidsstrøm).

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ Innstillinger

Generelle innstillinger, systemlagring, administrasjon av sikkerhetskopiering (eksport-/importdatabase), utseende (mørk/lysmodus), sikkerhet (inkluderer API-endepunktsbeskyttelse og blokkering av tilpasset leverandør), ruting, robusthet og avansert konfigurasjon.

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI-verktøy

Ett-klikks konfigurasjon for AI-kodeverktøy: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code og Antigravity.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 Forespørselslogger

Forespørselslogging i sanntid med filtrering etter leverandør, modell, konto og API-nøkkel. Viser statuskoder, tokenbruk, ventetid og svardetaljer.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API-endepunkt

Ditt enhetlige API-endepunkt med funksjonsoversikt: Chatfullføringer, innebygginger, bildegenerering, omrangering, lydtranskripsjon og registrerte API-nøkler.

![Endpoint Dashboard](screenshots/09-endpoint.png)
