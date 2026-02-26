# OmniRoute — Dashboard Funktionsgalleri

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

Visuell guide till varje avsnitt av OmniRoute-instrumentpanelen.

---

## 🔌 Leverantörer

Hantera AI-leverantörsanslutningar: OAuth-leverantörer (Claude Code, Codex, Gemini CLI), API-nyckelleverantörer (Groq, DeepSeek, OpenRouter) och gratisleverantörer (iFlow, Qwen, Kiro).

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Skapa modell routing-kombinationer med 6 strategier: fyll först, round-robin, kraft-av-två-val, slumpmässig, minst använda och kostnadsoptimerad. Varje combo kedjer flera modeller med automatisk reserv.

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Omfattande användningsanalys med tokenförbrukning, kostnadsberäkningar, aktivitetsvärmekartor, veckofördelningsdiagram och uppdelningar per leverantör.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 Systemhälsa

Realtidsövervakning: drifttid, minne, version, latenspercentiler (p50/p95/p99), cachestatistik och leverantörs strömbrytartillstånd.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Översättarlekplats

Fyra lägen för att felsöka API-översättningar: **Lekplats** (formatomvandlare), **Chatttestare** (liveförfrågningar), **Testbänk** (batchtester) och **Live Monitor** (strömning i realtid).

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ Inställningar

Allmänna inställningar, systemlagring, säkerhetskopieringshantering (export/import-databas), utseende (mörkt/ljusläge), säkerhet (inkluderar API-ändpunktsskydd och anpassad leverantörsblockering), routing, motståndskraft och avancerad konfiguration.

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI-verktyg

Konfiguration med ett klick för AI-kodningsverktyg: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code och Antigravity.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 Begärloggar

Loggning av förfrågningar i realtid med filtrering efter leverantör, modell, konto och API-nyckel. Visar statuskoder, tokenanvändning, latens och svarsdetaljer.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API-slutpunkt

Din enhetliga API-slutpunkt med kapacitetsuppdelning: Chattavslut, inbäddningar, bildgenerering, omrankning, ljudtranskription och registrerade API-nycklar.

![Endpoint Dashboard](screenshots/09-endpoint.png)
