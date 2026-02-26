# OmniRoute — Dashboard Feature Gallery

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

Visuel guide til hver sektion af OmniRoute-dashboardet.

---

## 🔌 Udbydere

Administrer AI-udbyderforbindelser: OAuth-udbydere (Claude Code, Codex, Gemini CLI), API-nøgleudbydere (Groq, DeepSeek, OpenRouter) og gratis udbydere (iFlow, Qwen, Kiro).

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Kombinationer

Opret modelrouting-kombinationer med 6 strategier: Fyld-først, round-robin, power-of-to-choices, tilfældig, mindst brugt og omkostningsoptimeret. Hver combo kæder flere modeller med automatisk fallback.

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analyse

Omfattende brugsanalyse med token-forbrug, omkostningsestimater, aktivitetsvarmekort, ugentlige distributionsdiagrammer og opdelinger pr. udbyder.

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 Systemsundhed

Overvågning i realtid: oppetid, hukommelse, version, latency percentiler (p50/p95/p99), cache-statistik og udbyderens afbrydertilstande.

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Oversætterlegeplads

Fire tilstande til fejlfinding af API-oversættelser: **Playground** (formatkonverter), **Chat Tester** (live-anmodninger), **Test Bench** (batchtest) og **Live Monitor** (streaming i realtid).

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ Indstillinger

Generelle indstillinger, systemlagring, backup-styring (eksport/import-database), udseende (mørk/lys-tilstand), sikkerhed (inkluderer API-endepunktsbeskyttelse og blokering af tilpasset udbyder), routing, modstandsdygtighed og avanceret konfiguration.

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI-værktøjer

Et-klik-konfiguration til AI-kodningsværktøjer: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code og Antigravity.

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 Anmodningslogs

Logning af anmodninger i realtid med filtrering efter udbyder, model, konto og API-nøgle. Viser statuskoder, tokenbrug, latenstid og svardetaljer.

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API-endepunkt

Dit forenede API-slutpunkt med kapacitetsopdeling: Chatfuldførelser, indlejringer, billedgenerering, omrangering, lydtransskription og registrerede API-nøgler.

![Endpoint Dashboard](screenshots/09-endpoint.png)
