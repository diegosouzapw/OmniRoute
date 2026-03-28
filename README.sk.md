# 🚀 OmniRoute — bezplatná brána AI

### Nikdy neprestávajte kódovať. Inteligentné smerovanie na **BEZPLATNÉ a nízkonákladové modely AI** s automatickým vrátením.

_Váš univerzálny proxy server API – jeden koncový bod, 67+ poskytovateľov, nulové prestoje. Teraz s orchestráciou agentov **MCP & A2A**._

**Dokončenia chatu • Vloženie • Generovanie obrázkov • Video • Hudba • Zvuk • Zmena poradia • **Vyhľadávanie na webe** • Server MCP • Protokol A2A • 100 % TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Dostupné v:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Čo je nové vo verzii 3.0.0

> **Inovácia z verzie 2.9.5?** — Všetky zmeny nájdete v [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main).

| Oblasť                                   | Zmeniť                                                                                                                                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **Bezpečnosť CodeQL**                 | Opravených 10+ upozornení CodeQL: polynomial-redos, neistá-náhodnosť, shell-injection náprava                                                                                                                          |
| ✅ **Overenie trasy**                    | Všetkých 176 trás API je teraz overených pomocou schém Zod + `validateBody()` – preukazy CI `check:route-validation:t06`                                                                                               |
| 🐛 **Únik značky omniModel**             | Interné značky `<omniModel>` už neunikajú klientom v odpovediach na streamovanie SSE (#585)                                                                                                                            |
| 🔑 **Registrované kľúče API**            | Kľúče API automatického poskytovania prostredníctvom `POST /api/v1/registered-keys` s presadzovaním kvót pre jednotlivých poskytovateľov/účet, idempotenciou, úložiskom SHA-256 a voliteľným hlásením problémov GitHub |
| 🎨 **Ikony poskytovateľa**               | Viac ako 130 log poskytovateľov prostredníctvom `@lobehub/icons` (SVG) s PNG → všeobecný záložný reťazec                                                                                                               |
| 🔄 **Automatická synchronizácia modelu** | 24-hodinový plánovač a manuálne prepínanie používateľského rozhrania na synchronizáciu zoznamov modelov pre vstavaných a vlastných poskytovateľov kompatibilných s OpenAI                                              |
| 🌐 **OpenCode Zen/Go**                   | Dvaja noví poskytovatelia od @kang-heewon cez PR #530: bezplatná úroveň + úroveň predplatného cez `OpencodeExecutor`                                                                                                   |
| 🐛 **Gemini CLI OAuth**                  | Vykonateľná chyba, keď v Dockeri chýba `GEMINI_OAUTH_CLIENT_SECRET` (bola to záhadná chyba Google)                                                                                                                     |
| 🐛 **Konfigurácia OpenCode**             | `saveOpenCodeConfig()` teraz správne zapisuje TOML do `XDG_CONFIG_HOME`                                                                                                                                                |
| 🐛 **Prepísanie pripnutého modelu**      | `body.model` správne nastavené na `pinnedModel` pri ochrane kontextovej vyrovnávacej pamäte                                                                                                                            |
| 🐛 **Codex/Claude loop**                 | `tool_result` bloky teraz skonvertované na text na zastavenie nekonečných slučiek                                                                                                                                      |
| 🐛 **Presmerovanie prihlásenia**         | Prihlásenie už nezamrzne po preskočení nastavenia hesla                                                                                                                                                                |
| 🐛 **Cesty systému Windows**             | Cesty MSYS2/Git-Bash (`/c/...`) sa automaticky normalizujú na `C:\...`                                                                                                                                                 |

---

## 🖼️ Hlavný panel

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Ukážka hlavného panela

<details>
<summary><b>Kliknutím zobrazíte snímky obrazovky hlavného panela</b></summary>

| Strana                 | Snímka obrazovky                                  |
| ---------------------- | ------------------------------------------------- |
| **Poskytovatelia**     | ![Providers](docs/screenshots/01-providers.png)   |
| **Kombá**              | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytika**          | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Zdravie**            | ![Health](docs/screenshots/04-health.png)         |
| **Prekladateľ**        | ![Translator](docs/screenshots/05-translator.png) |
| **Nastavenia**         | ![Settings](docs/screenshots/06-settings.png)     |
| **Nástroje CLI**       | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Denníky používania** | ![Usage](docs/screenshots/08-usage.png)           |
| **Koncové body**       | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Bezplatný poskytovateľ AI pre vašich obľúbených kódovacích agentov

_Pripojte akýkoľvek nástroj IDE alebo CLI poháňaný AI cez OmniRoute – bezplatnú bránu API pre neobmedzené kódovanie._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Všetci agenti sa pripájajú cez <code>http://localhost:20128/v1</code> alebo <code>http://cloud.omniroute_ONline_SKNI_TOK one/v6 modely a kvóta</sub>

---

## 🤔 Prečo OmniRoute?

**Prestaňte plytvať peniazmi a dosahovať limity:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Kvóta odberu vyprší nevyužitá každý mesiac
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Obmedzenia sadzieb vás zastavia uprostred kódovania
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> drahé rozhrania API (20 – 50 USD mesačne na poskytovateľa)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuálne prepínanie medzi poskytovateľmi

**OmniRoute to rieši:**

- ✅ **Maximalizujte odbery** - Sledujte kvótu, pred resetovaním použite každý bit
- ✅ **Automatická záloha** - Predplatné → Kľúč API → Lacné → Bezplatne, nulové prestoje
- ✅ **Viacnásobný účet** - Obojstranne medzi účtami na poskytovateľa
- ✅ **Universal** - Funguje s Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, akýmkoľvek nástrojom CLI

---

## 📧 Podpora

> 💬 **Pripojte sa k našej komunite!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Získajte pomoc, zdieľajte tipy a buďte informovaní.

- **Web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Prispievanie**: Pozrite si [CONTRIBUTING.md](CONTRIBUTING.md), otvorte PR alebo si vyberte `good first issue`
- **Pôvodný projekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Nahlasujete chybu?

Pri otváraní problému spustite príkaz system-info a pripojte vygenerovaný súbor:

```bash
npm run system-info
```

Toto vygeneruje `system-info.txt` s vašou verziou Node.js, verziou OmniRoute, podrobnosťami o OS, nainštalovanými nástrojmi CLI (iflow, gemini, claude, codex, antigravity, droid atď.), stavom Docker/PM2 a systémovými balíkmi – všetko, čo potrebujeme na rýchlu reprodukciu vášho problému. Pripojte súbor priamo k vášmu problému na GitHub.

---

## 🔄 Ako to funguje

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Čo OmniRoute rieši — 30 bodov skutočnej bolesti a prípadov použitia

> **Každý vývojár, ktorý používa nástroje AI, čelí týmto problémom denne.** OmniRoute bol vytvorený tak, aby ich všetky vyriešil – od prekročenia nákladov po regionálne bloky, od prerušených tokov OAuth po operácie protokolov a pozorovateľnosť podniku.

<details>
<summary><b>💸 1. „Platím za drahé predplatné, ale stále ma prerušujú limity“</b></summary>

Vývojári platia za Claude Pro, Codex Pro alebo GitHub Copilot 20 – 200 dolárov mesačne. Aj pri platení má kvóta strop – 5 hodín používania, týždenné limity alebo limity za minútu. Počas relácie kódovania poskytovateľ prestane reagovať a vývojár stráca tok a produktivitu.

**Ako to rieši OmniRoute:**

- **Inteligentný 4-úrovňový záložný systém** – Ak sa vyčerpá kvóta predplatného, automaticky sa presmeruje na kľúč API → Lacné → Zadarmo s nulovým manuálnym zásahom
- **Sledovanie kvóty v reálnom čase** – Zobrazuje spotrebu tokenov v reálnom čase s resetovaným odpočítavaním (5 hodín, denne, týždenne)
  – **Podpora viacerých účtov** – Viacero účtov na poskytovateľa s automatickým opakovaním – keď sa jeden minie, prepne sa na ďalší
  – **Vlastné kombá** – Prispôsobiteľné záložné reťazce so 6 stratégiami vyvažovania (najskôr vyplniť, opakovane, P2C, náhodné, najmenej používané, nákladovo optimalizované)
- **Codex Business Quotas** — Monitorovanie kvót pracovného priestoru pre firmy/tím priamo na paneli

</details>

<details>
<summary><b>🔌 2. "Potrebujem použiť viacerých poskytovateľov, ale každý má iné API"</b></summary>

OpenAI používa jeden formát, Claude (Anthropic) iný a Gemini ďalší. Ak chce vývojár testovať modely od rôznych poskytovateľov alebo medzi nimi záložné riešenie, musí prekonfigurovať súpravy SDK, zmeniť koncové body, vysporiadať sa s nekompatibilnými formátmi. Vlastní poskytovatelia (FriendLI, NIM) majú neštandardné modelové koncové body.

**Ako to rieši OmniRoute:**

- **Unified Endpoint** – Jediný `http://localhost:20128/v1` slúži ako proxy pre všetkých 67+ poskytovateľov
- **Formátový preklad** — Automatický a transparentný: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
  – **Dezinfekcia odozvy** – Odstráni neštandardné polia (`x_groq`, `usage_breakdown`, `service_tier`), ktoré porušujú OpenAI SDK v1.83+
- **Normalizácia rolí** – Konvertuje `developer` → `system` pre poskytovateľov, ktorí nie sú OpenAI; `system` → `user` pre GLM/ERNIE
  – **Think Tag Extraction** – Extrahuje `<think>` bloky z modelov ako DeepSeek R1 do štandardizovaných `reasoning_content`
- **Štruktúrovaný výstup pre Gemini** — `json_schema` → `responseMimeType`/`responseSchema` automatická konverzia
  – **`stream` predvolená hodnota je `false`** – Zosúladí sa so špecifikáciou OpenAI, čím sa zabráni neočakávanému SSE v súpravách Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. „Môj poskytovateľ AI blokuje môj región/krajinu“</b></summary>

Poskytovatelia ako OpenAI/Codex blokujú prístup z určitých geografických oblastí. Používatelia dostanú chyby ako `unsupported_country_region_territory` počas pripojení OAuth a API. To je frustrujúce najmä pre vývojárov z rozvojových krajín.

**Ako to rieši OmniRoute:**

- **Konfigurácia proxy servera na troch úrovniach** – Konfigurovateľný server proxy na 3 úrovniach: globálny (celá prevádzka), podľa jednotlivých poskytovateľov (iba jeden poskytovateľ) a podľa pripojenia/kľúča
- **Farebné odznaky proxy** — Vizuálne indikátory: 🢢 globálny proxy, 🟡 proxy poskytovateľa, 🔵 proxy pripojenia, vždy zobrazuje IP
  – **Výmena tokenov OAuth cez proxy** – tok OAuth prechádza aj cez proxy, čím sa rieši `unsupported_country_region_territory`
- **Testy pripojenia cez proxy** – Testy pripojenia používajú nakonfigurovaný proxy (už žiadne priame obchádzanie)
- **Podpora SOCKS5** — Úplná podpora proxy SOCKS5 pre odchádzajúce smerovanie
- **TLS Fingerprint Spoofing** – Odtlačok prsta TLS podobný prehliadaču cez `wreq-js` na obídenie detekcie robotov
- **🔏 CLI Fingerprint Matching** – Zmení poradie hlavičiek a polí tela tak, aby zodpovedali natívnym binárnym podpisom CLI, čím sa výrazne zníži riziko označovania účtu. IP proxy servera je zachovaná – získate súčasne utajené ** aj** maskovanie IP

</details>

<details>
<summary><b>🆓 4. „Chcem používať AI na kódovanie, ale nemám peniaze“</b></summary>

Nie každý môže platiť 20 – 200 $ mesačne za predplatné AI. Študenti, vývojári z rozvíjajúcich sa krajín, fanúšikovia a nezávislí pracovníci potrebujú prístup ku kvalitným modelom za nulové náklady.

**Ako to rieši OmniRoute:**

- **Zabudovaní poskytovatelia bezplatnej úrovne** — Natívna podpora pre 100 % bezplatných poskytovateľov: iFlow (5 neobmedzených modelov cez OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 neobmedzené modely: qco,3-qwender-lash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID zadarmo), Gemini CLI (180 000 tokenov mesačne zadarmo)
- **Ollama Cloud** – modely Ollama hostené v cloude na `api.ollama.com` s bezplatnou úrovňou „Light use“; použite predponu `ollamacloud/<model>`
  – **len bezplatné kombá** – reťazec `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD mesačne s nulovými prestojmi
- **Voľný prístup NVIDIA NIM** — ~40 RPM pre vývojárov - navždy bezplatný prístup k viac ako 70 modelom na stránke build.nvidia.com (prechod z kreditov na limity čistej sadzby)
- **Cost Optimized Strategy** – Stratégia smerovania, ktorá automaticky vyberie najlacnejšieho dostupného poskytovateľa

</details>

<details>
<summary><b>🔒 5. „Potrebujem chrániť svoju bránu AI pred neoprávneným prístupom“</b></summary>

Pri vystavení brány AI do siete (LAN, VPS, Docker) môže ktokoľvek s adresou spotrebovať tokeny/kvótu vývojára. Bez ochrany sú rozhrania API náchylné na nesprávne použitie, rýchle vloženie a zneužitie.

**Ako to rieši OmniRoute:**

– **Správa kľúčov API** – Generovanie, rotácia a rozsah podľa poskytovateľa s vyhradenou stránkou `/dashboard/api-manager`
– **Povolenia na úrovni modelu** – Obmedzte kľúče API na konkrétne modely (`openai/*`, vzory zástupných znakov) pomocou prepínača Povoliť všetko/Obmedziť
– **API Endpoint Protection** – Vyžadovať kľúč pre `/v1/models` a blokovať konkrétnych poskytovateľov v zozname

- **Ochrana autentifikácie + ochrana CSRF** – Všetky trasy na dashboarde sú chránené `withAuth` middleware + tokenmi CSRF
- **Rate Limiter** — Obmedzenie rýchlosti na IP pomocou konfigurovateľných okien
- **IP Filtering** — Zoznam povolených/blokovaných pre riadenie prístupu
- **Prompt Injection Guard** – Dezinfekcia proti škodlivým vzorom výzvy
- **Šifrovanie AES-256-GCM** — Prihlasovacie údaje sú v pokoji zašifrované

</details>

<details>
<summary><b>🛑 6. „Môj poskytovateľ zlyhal a stratil som tok kódovania“</b></summary>

Poskytovatelia AI sa môžu stať nestabilnými, vrátiť chyby 5xx alebo dosiahnuť dočasné limity sadzieb. Ak vývojár závisí od jedného poskytovateľa, bude prerušený. Bez ističov môžu opakované pokusy zlyhať aplikáciu.

**Ako to rieši OmniRoute:**

- **Istič pre každý model** - Automatické otváranie/zatváranie s konfigurovateľnými prahmi a ochladzovaním (zatvorené/otvorené/polootvorené), s rozsahom pre každý model, aby sa predišlo kaskádovým blokom
- **Exponenciálne stiahnutie** — Postupné oneskorenie opakovania
- **Anti-Thundering Herd** - ochrana Mutex + semafor proti súbežným opakovaným búrkam
- **Combo Fallback Chains** – Ak primárny poskytovateľ zlyhá, automaticky prepadne reťazcom bez akéhokoľvek zásahu
- **Combo Circuit Breaker** – Automaticky deaktivuje zlyhávajúcich poskytovateľov v rámci kombinovaného reťazca
  – **Health Dashboard** – Monitorovanie dostupnosti, stavy ističov, blokovania, štatistiky vyrovnávacej pamäte, latencia p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Konfigurácia každého nástroja AI je únavná a opakovaná“</b></summary>

Vývojári používajú Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Každý nástroj potrebuje inú konfiguráciu (API endpoint, kľúč, model). Prekonfigurovanie pri zmene poskytovateľa alebo modelu je strata času.

**Ako to rieši OmniRoute:**

- **CLI Tools Dashboard** – Vyhradená stránka s nastavením jedným kliknutím pre Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
  – **GitHub Copilot Config Generator** – Generuje `chatLanguageModels.json` pre kód VS s hromadným výberom modelu
- **Sprievodca registráciou** – Sprievodca nastavením v 4 krokoch pre začínajúcich používateľov
  – **Jeden koncový bod, všetky modely** – Nakonfigurujte `http://localhost:20128/v1` raz a získajte prístup k viac ako 67 poskytovateľom

</details>

<details>
<summary><b>🔑 8. „Správa tokenov OAuth od viacerých poskytovateľov je peklo“</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – všetky používajú OAuth 2.0 s tokenmi, ktorých platnosť sa končí. Vývojári sa musia neustále znovu overovať, riešiť problémy `client_secret is missing`, `redirect_uri_mismatch` a zlyhania na vzdialených serveroch. Obzvlášť problematické je OAuth na LAN/VPS.

**Ako to rieši OmniRoute:**

- **Automatická obnova tokenov** – Tokeny OAuth sa pred vypršaním platnosti obnovujú na pozadí
- **Vstavaný OAuth 2.0 (PKCE)** – Automatický tok pre Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
  – **Multi-Auth OAuth** – Viaceré účty na poskytovateľa prostredníctvom extrakcie tokenov JWT/ID
- **OAuth LAN/Remote Fix** — Detekcia súkromnej adresy IP pre `redirect_uri` + manuálny režim adresy URL pre vzdialené servery
  – **OAuth Behind Nginx** – Používa `window.location.origin` na reverznú kompatibilitu proxy
  – **Príručka vzdialeného OAuth** – Podrobný sprievodca povereniami Google Cloud na VPS/Docker

</details>

<details>
<summary><b>📊 9. "Neviem, koľko míňam alebo kde"</b></summary>

Vývojári využívajú viacerých platených poskytovateľov, ale nemajú jednotný pohľad na výdavky. Každý poskytovateľ má svoj vlastný informačný panel fakturácie, ale neexistuje žiadne konsolidované zobrazenie. Neočakávané náklady sa môžu nahromadiť.

**Ako to rieši OmniRoute:**

– **Informačný panel analýzy nákladov** – sledovanie nákladov na token a správa rozpočtu podľa poskytovateľa

- **Obmedzenia rozpočtu na úroveň** – Strop výdavkov na úroveň, ktorý spúšťa automatické záložné právo
- **Konfigurácia cien za model** – Konfigurovateľné ceny za model
- **Štatistiky používania na kľúč API** – Počet žiadostí a časová pečiatka posledného použitia na kľúč
  – **Panel Analytics** – štatistické karty, graf používania modelu, tabuľka poskytovateľov s mierami úspešnosti a latenciou

</details>

<details>
<summary><b>🐛 10. „Nedokážem diagnostikovať chyby a problémy vo volaniach AI“</b></summary>

Keď hovor zlyhá, vývojár nevie, či to bol limit sadzby, vypršaný token, nesprávny formát alebo chyba poskytovateľa. Fragmentované protokoly cez rôzne terminály. Bez pozorovateľnosti je ladenie metódou pokus-omyl.

**Ako to rieši OmniRoute:**

– **Panel jednotných protokolov** – 4 karty: Protokoly žiadostí, Protokoly proxy, Protokoly auditu, Konzola

- **Console Log Viewer** — Prehliadač v štýle terminálu v reálnom čase s farebne odlíšenými úrovňami, automatickým posúvaním, vyhľadávaním a filtrovaním
- **Proxy protokoly SQLite** — Trvalé protokoly, ktoré prežijú reštart servera
- **Translator Playground** – 4 režimy ladenia: Playground (preklad formátu), Chat Tester (spiatočný), Test Bench (dávka), Live Monitor (v reálnom čase)
  – **Požiadať o telemetriu** – latencia p50/p95/p99 + sledovanie X-request-Id
  – **Protokolovanie založené na súboroch s rotáciou** – Konzolový zachytávač zachytáva všetko do protokolu JSON s rotáciou na základe veľkosti
- **Správa systémových informácií** – `npm run system-info` vygeneruje `system-info.txt` s vaším úplným prostredím (verzia uzla, verzia OmniRoute, OS, nástroje CLI, stav Docker/PM2). Pripojte ho pri nahlasovaní problémov na okamžité triedenie.

</details>

<details>
<summary><b>🏗️ 11. „Nasadenie a údržba brány je zložitá“</b></summary>

Inštalácia, konfigurácia a údržba AI proxy v rôznych prostrediach (lokálne, VPS, Docker, cloud) je náročná na prácu. Problémy ako pevne zakódované cesty, `EACCES` v adresároch, konflikty portov a zostavy naprieč platformami zvyšujú trenie.

**Ako to rieši OmniRoute:**

- **Globálna inštalácia npm** — `npm install -g omniroute && omniroute` – hotovo
- **Docker Multi-Platform** – natívne AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profily Docker Compose** — `base` (bez nástrojov CLI) a `cli` (s Claude Code, Codex, OpenClaw)
- **Electron Desktop App** – natívna aplikácia pre Windows/macOS/Linux so systémovou lištou, automatickým spustením, offline režimom
- **Split-Port Mode** – API a Dashboard na samostatných portoch pre pokročilé scenáre (reverzný proxy, kontajnerová sieť)
- **Cloud Sync** — Synchronizácia konfigurácie medzi zariadeniami cez Cloudflare Workers
- **DB Backups** — Automatické zálohovanie, obnovenie, export a import všetkých nastavení

</details>

<details>
<summary><b>🌍 12. „Rozhranie je len v angličtine a môj tím nehovorí po anglicky“</b></summary>

Tímy v neanglicky hovoriacich krajinách, najmä v Latinskej Amerike, Ázii a Európe, zápasia s rozhraním iba v angličtine. Jazykové bariéry znižujú prijatie a zvyšujú chyby v konfigurácii.

**Ako to rieši OmniRoute:**

- **Dashboard i18n — 30 jazykov** — Všetkých viac ako 500 kláves preložených vrátane arabčiny, bulharčiny, dánčiny, nemčiny, španielčiny, fínčiny, francúzštiny, hebrejčiny, hindčiny, maďarčiny, indonézštiny, taliančiny, japončiny, kórejčiny, malajčiny, holandčiny, nórčiny, poľštiny, portugalčiny (PT/BR), rumunčiny, ruštiny, slovenčiny, švédčiny, thajčiny, ukrajinčiny, vietnamčiny, angličtiny
- **Podpora RTL** — Podpora sprava doľava pre arabčinu a hebrejčinu
- **Viacjazyčné README** — 30 kompletných prekladov dokumentácie
- **Language Selector** – ikona zemegule v hlavičke pre prepínanie v reálnom čase

</details>

<details>
<summary><b>🔄 13. „Potrebujem viac ako chat – potrebujem vloženie, obrázky, zvuk“</b></summary>

AI nie je len dokončenie chatu. Vývojári potrebujú generovať obrázky, prepisovať zvuk, vytvárať vloženia pre RAG, meniť hodnotenie dokumentov a moderovať obsah. Každé API má iný koncový bod a formát.

**Ako to rieši OmniRoute:**

– **Vložené** – `/v1/embeddings` so 6 poskytovateľmi a 9+ modelmi

- **Generácia obrázkov** — `/v1/images/generations` s 10 poskytovateľmi a 20+ modelmi (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) a SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Prepis zvuku** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + existujúci poskytovatelia
- **Moderácie** — `/v1/moderations` — Kontroly bezpečnosti obsahu
- **Zmena poradia** — `/v1/rerank` — Zmena poradia podľa relevantnosti dokumentu
  – **Responses API** – plná podpora `/v1/responses` pre kódex

</details>

<details>
<summary><b>🧪 14. „Nemám spôsob, ako testovať a porovnávať kvalitu medzi modelmi“</b></summary>

Vývojári chcú vedieť, ktorý model je pre ich prípad použitia najlepší – kód, preklad, zdôvodnenie – ale manuálne porovnávanie je pomalé. Neexistujú žiadne integrované nástroje hodnotenia.

**Ako to rieši OmniRoute:**

- **Hodnotenia LLM** – Zlaté testovanie s 10 vopred nahratými prípadmi zahŕňajúcimi pozdravy, matematiku, geografiu, generovanie kódu, súlad s JSON, preklad, zníženie, odmietnutie bezpečnosti
  – **4 stratégie zhody** – `exact`, `contains`, `regex`, `custom` (funkcia JS)
- **Testovacia lavica pre prekladateľské ihrisko** – dávkové testovanie s viacerými vstupmi a očakávanými výstupmi, porovnanie medzi poskytovateľmi
- **Chat Tester** – celý spiatočný výlet s vykresľovaním vizuálnej odozvy
- **Live Monitor** – tok všetkých požiadaviek prechádzajúcich cez server proxy v reálnom čase

</details>

<details>
<summary><b>📈 15. „Potrebujem škálovať bez straty výkonu“</b></summary>

Keďže objem žiadostí rastie, bez ukladania rovnakých otázok do vyrovnávacej pamäte vznikajú duplicitné náklady. Bez idempotencie duplikát požaduje spracovanie odpadu. Musia sa dodržiavať limity sadzieb na poskytovateľa.

**Ako to rieši OmniRoute:**

- **Sémantická vyrovnávacia pamäť** – Dvojvrstvová vyrovnávacia pamäť (podpis + sémantická) znižuje náklady a latenciu
- **Idempotencia požiadavky** – 5-sekundové deduplikačné okno pre identické požiadavky
  – **Detekcia limitu rýchlosti** – RPM, minimálna medzera a maximálne súbežné sledovanie jednotlivých poskytovateľov
- **Upraviteľné limity frekvencie** – Konfigurovateľné predvolené hodnoty v Nastaveniach → Odolnosť s perzistenciou
- **Cache na overenie kľúča API** — 3-vrstvová vyrovnávacia pamäť pre produkčný výkon
  – **Panel zdravia s telemetriou** – latencia p50/p95/p99, štatistiky vyrovnávacej pamäte, doba prevádzky

</details>

<details>
<summary><b>🤖 16. „Chcem globálne ovládať správanie modelu“</b></summary>

Vývojári, ktorí chcú všetky odpovede v konkrétnom jazyku, so špecifickým tónom alebo chcú obmedziť tokeny uvažovania. Konfigurovať to v každom nástroji/požiadavke je nepraktické.

**Ako to rieši OmniRoute:**

- **System Prompt Injection** – Globálna výzva aplikovaná na všetky požiadavky
  – **Thinking Budget Validation** – Zdôvodnenie riadenia prideľovania tokenov na žiadosť (priechodné, automatické, vlastné, adaptívne)
- **6 stratégií smerovania** — Globálne stratégie, ktoré určujú spôsob distribúcie požiadaviek
  – **Wildcard Router** – `provider/*` vzory smerujú dynamicky k akémukoľvek poskytovateľovi
- **Prepínač povoliť/zakázať kombo** — Prepínajte kombinácie priamo z ovládacieho panela
- **Provider Toggle** — Povolenie/zakázanie všetkých pripojení pre poskytovateľa jedným kliknutím
  – **Blokovaní poskytovatelia** – vylúčte konkrétnych poskytovateľov zo zoznamu `/v1/models`

</details>

<details>
<summary><b>🧰 17. „Potrebujem nástroje MCP ako prvotriedne možnosti produktu“</b></summary>

Mnohé brány AI odhaľujú MCP iba ako skrytý detail implementácie. Tímy potrebujú viditeľnú a spravovateľnú operačnú vrstvu.

**Ako to rieši OmniRoute:**

- MCP sa zobrazí na navigačnom paneli a na karte protokolu koncového bodu
- Vyhradená stránka správy MCP s procesmi, nástrojmi, rozsahmi a auditom
- Vstavaný rýchly štart pre `omniroute --mcp` a registráciu klienta

</details>

<details>
<summary><b>🧠 18. „Potrebujem orchestráciu A2A s cestami synchronizácie + streamovania“</b></summary>

Pracovné postupy agentov vyžadujú priame odpovede a dlhotrvajúce streamované vykonávanie s kontrolou životného cyklu.

**Ako to rieši OmniRoute:**

– Koncový bod A2A JSON-RPC (`POST /a2a`) s `message/send` a `message/stream`

- SSE streaming so šírením koncového stavu
- Rozhrania API životného cyklu úloh pre `tasks/get` a `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. „Potrebujem skutočné zdravie procesu MCP, nie uhádnutý stav“</b></summary>

Operačné tímy potrebujú vedieť, či je MCP skutočne nažive, nielen to, či je dostupné API.

**Ako to rieši OmniRoute:**

- Súbor srdcového tepu za behu s PID, časovými pečiatkami, transportom, počtom nástrojov a režimom rozsahu
- Stavové rozhranie MCP API, ktoré kombinuje srdcový tep + nedávnu aktivitu
- Stavové karty používateľského rozhrania pre sviežosť procesu / dostupnosti / tepu

</details>

<details>
<summary><b>📋 20. „Potrebujem auditovateľné spustenie nástroja MCP“</b></summary>

Keď nástroje mutujú konfiguráciu alebo spúšťajú akcie operácií, tímy potrebujú forenznú sledovateľnosť.

**Ako to rieši OmniRoute:**

- Záznamy auditu podporované SQLite pre volania nástrojov MCP
- Filtre podľa nástroja, úspechu/neúspechu, kľúča API a stránkovania
- Tabuľka auditu palubnej dosky + štatistické koncové body pre automatizáciu

</details>

<details>
<summary><b>🔐 21. „Potrebujem obmedzené povolenia MCP na integráciu“</b></summary>

Rôzni klienti by mali mať najmenej privilegovaný prístup ku kategóriám nástrojov.

**Ako to rieši OmniRoute:**

- 9 zrnitých rozsahov MCP pre kontrolovaný prístup k nástrojom
- Presadzovanie rozsahu a viditeľnosť v používateľskom rozhraní správy MCP
- Bezpečná predvolená poloha pre prevádzkové nástroje

</details>

<details>
<summary><b>⚙️ 22. „Potrebujem prevádzkové kontroly bez premiestňovania“</b></summary>

Tímy potrebujú rýchle zmeny runtime počas incidentov alebo nákladových udalostí.

**Ako to rieši OmniRoute:**

- Aktivácia komba prepínača priamo z ovládacieho panela MCP
- Použite profily odolnosti z preddefinovaných balíkov politík
- Resetujte stav ističa z rovnakého ovládacieho panela

</details>

<details>
<summary><b>🔄 23. „Potrebujem viditeľnosť životného cyklu úlohy A2A a zrušenie“</b></summary>

Bez viditeľnosti životného cyklu sa incidenty úloh ťažko triedia.

**Ako to rieši OmniRoute:**

- Zoznam úloh / filtrovanie podľa stavu / zručnosti so stránkovaním
- Rozbalenie metadát úloh, udalostí a artefaktov
- Koncový bod zrušenia úlohy a akcia používateľského rozhrania s potvrdením

</details>

<details>
<summary><b>🌊 24. „Potrebujem aktívne metriky streamu pre načítanie A2A“</b></summary>

Streamovanie pracovných tokov vyžaduje operačný prehľad o súbežnosti a živých pripojeniach.

**Ako to rieši OmniRoute:**

- Aktívne počítadlá toku integrované do stavu A2A
- Časová pečiatka poslednej úlohy a počet jednotlivých štátov
- Karty palubnej dosky A2A na monitorovanie operácií v reálnom čase

</details>

<details>
<summary><b>🪪 25. „Potrebujem štandardné vyhľadávanie agentov pre klientov“</b></summary>

Externí klienti a orchestrátori potrebujú strojovo čitateľné metadáta na integráciu.

**Ako to rieši OmniRoute:**

– Karta agenta vystavená na `/.well-known/agent.json`

- Schopnosti a zručnosti zobrazené v používateľskom rozhraní správy
- API stavu A2A obsahuje metaúdaje zisťovania pre automatizáciu

</details>

<details>
<summary><b>🧭 26. "Potrebujem zistiteľnosť protokolu v UX produktu"</b></summary>

Ak používatelia nemôžu objaviť povrchy protokolov, kvalita prijatia a podpory klesá.

**Ako to rieši OmniRoute:**

- Konsolidovaná stránka **Koncové body** s kartami pre proxy, MCP, A2A a koncové body API
- Inline prepínače stavu služby (Online/Offline) pre MCP a A2A
- Odkazy z prehľadu na špeciálne karty správy

</details>

<details>
<summary><b>🧪 27. "Potrebujem komplexné overenie protokolu so skutočnými klientmi"</b></summary>

Falošné testy nestačia na overenie kompatibility protokolu pred vydaním.

**Ako to rieši OmniRoute:**

- E2E balík, ktorý spúšťa aplikáciu a využíva skutočný prenos klienta MCP SDK
- Klient A2A testuje toky zisťovania, odosielania, streamovania, získavania a rušenia
- Krížová kontrola tvrdení proti auditu MCP a API úloh A2A

</details>

<details>
<summary><b>📡 28. „Potrebujem jednotnú pozorovateľnosť naprieč všetkými rozhraniami“</b></summary>

Rozdelenie pozorovateľnosti podľa protokolu vytvára slepé miesta a dlhšie MTTR.

**Ako to rieši OmniRoute:**

- Zjednotené informačné panely / protokoly / analýzy v jednom produkte
- Zdravie + audit + telemetria požiadaviek cez vrstvy OpenAI, MCP a A2A
- Operačné API pre stav a automatizáciu

</details>

<details>
<summary><b>💼 29. "Potrebujem jeden runtime pre proxy + nástroje + orchestráciu agenta"</b></summary>

Prevádzka mnohých samostatných služieb zvyšuje prevádzkové náklady a spôsoby zlyhania.

**Ako to rieši OmniRoute:**

- Proxy, server MCP a server A2A kompatibilný s OpenAI v jednom zásobníku
- Zdieľaná autentifikácia, odolnosť, ukladanie údajov a pozorovateľnosť
- Konzistentný model politiky na všetkých interakčných plochách

</details>

<details>
<summary><b>🚀 30. „Potrebujem odoslať agentské pracovné postupy bez roztiahnutia kódu lepidla“</b></summary>

Tímy strácajú rýchlosť pri spájaní viacerých ad-hoc služieb a skriptov.

**Ako to rieši OmniRoute:**

- Jednotná stratégia koncových bodov pre klientov a agentov
- Vstavané používateľské rozhrania na správu protokolov a cesty overovania dymu
- Základy pripravené na výrobu (zabezpečenie, protokolovanie, odolnosť, zálohovanie)

</details>

### Príklady príručiek (integrované prípady použitia)

**Príručka A: Maximalizujte platené predplatné + lacné zálohovanie**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Príručka B: Balík kódovania s nulovými nákladmi**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Príručka C: 24/7 vždy zapnutý záložný reťazec**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Príručka D: Operačný program agenta s MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Začnite zadarmo — nulové náklady na konfiguráciu

> Nastavte kódovanie AI za pár minút za **$0/mesiac**. Pripojte tieto bezplatné účty a použite vstavanú kombináciu **Free Stack**.

| Krok | Akcia                                                     | Poskytovatelia odblokovaní                                           |
| ---- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| 1    | Pripojiť **Kiro** (AWS Builder ID OAuth)                  | Claude Sonnet 4.5, Haiku 4.5 — **neobmedzene**                       |
| 2    | Pripojte **iFlow** (Google OAuth)                         | kimi-k2-myslenie, qwen3-coder-plus, deepseek-r1... — **neobmedzené** |
| 3    | Pripojte **Qwen** (kód zariadenia)                        | qwen3-coder-plus, qwen3-coder-flash... — **neobmedzene**             |
| 4    | Pripojte **Gemini CLI** (Google OAuth)                    | gemini-3-flash, gemini-2.5-pro — **180 000/mesiac zadarmo**          |
| 5    | `/dashboard/combos` → Šablóna **Bezplatný balík (0 USD)** | Round-robin všetkých bezplatných poskytovateľov automaticky          |

**Nasmerujte ľubovoľné IDE/CLI na:** `http://localhost:20128/v1` · Kľúč API: `any-string` · Hotovo.

> **Voliteľné extra pokrytie (tiež zadarmo):** Groq API kľúč (30 RPM zadarmo), NVIDIA NIM (40 RPM zadarmo, 70+ modelov), Cerebras (1 milión tokenov/deň), LongCat API kľúč (50 miliónov tokenov/deň!), Cloudflare Workers AI (10 000 neurónov/deň, 50+ modelov).

## ⚡ Rýchly štart

### 1) Nainštalujte a spustite

```bash
npm install -g omniroute
omniroute
```

> **používatelia pnpm:** Po inštalácii spustite `pnpm approve-builds -g`, aby ste povolili natívne skripty zostavovania vyžadované `better-sqlite3` a `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Informačný panel sa otvára na `http://localhost:20128` a základná adresa URL rozhrania API je `http://localhost:20128/v1`.

| Príkaz                  | Popis                                                            |
| ----------------------- | ---------------------------------------------------------------- |
| `omniroute`             | Spustiť server (`PORT=20128`, API a dashboard na rovnakom porte) |
| `omniroute --port 3000` | Nastavte kanonický/API port na 3000                              |
| `omniroute --mcp`       | Spustiť MCP server (stdio transport)                             |
| `omniroute --no-open`   | Neotvárať automaticky prehliadač                                 |
| `omniroute --help`      | Zobraziť pomoc                                                   |

Voliteľný režim s rozdeleným portom:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Pripojte poskytovateľov a vytvorte si kľúč API

1. Otvorte Dashboard → `Providers` a pripojte aspoň jedného poskytovateľa (OAuth alebo API kľúč).
2. Otvorte Dashboard → `Endpoints` a vytvorte kľúč API.
3. (Voliteľné) Otvorte informačný panel → `Combos` a nastavte svoj záložný reťazec.

### 3) Nasmerujte svoj kódovací nástroj na OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Funguje s Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode a SDK kompatibilné s OpenAI.

### 4) Povolenie a overenie protokolov (v2.0)

**MCP (pre operácie poháňané nástrojmi):**

```bash
omniroute --mcp
```

Potom pripojte svojho klienta MCP cez `stdio` a testujte nástroje ako:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (pre pracovné postupy agent-agent):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Overte všetko od konca do konca (odporúča sa)

```bash
npm run test:protocols:e2e
```

Tento balík overuje skutočné toky klientov MCP a A2A oproti spustenej aplikácii.

### Alternatíva: spustiť zo zdroja

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute je k dispozícii ako verejný obrázok Docker na [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Rýchly beh:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**So súborom prostredia:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Pomocou Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Obrázok                  | Tag      | Veľkosť | Popis                      |
| ------------------------ | -------- | ------- | -------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB | Najnovšie stabilné vydanie |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Aktuálna verzia            |

---

## 🖥️ Desktopová aplikácia – offline a vždy zapnutá

> 🆕 **NOVINKA!** OmniRoute je teraz k dispozícii ako **natívna desktopová aplikácia** pre Windows, macOS a Linux.

Spustite OmniRoute ako samostatnú počítačovú aplikáciu – pre miestne modely nie je potrebný žiadny terminál, žiadny prehliadač ani internet. Aplikácia založená na elektróne obsahuje:

- 🖥️ **Natívne okno** — Vyhradené okno aplikácie s integráciou do systémovej lišty
- 🔄 **Auto-Start** – Spustite OmniRoute pri prihlásení do systému
- 🔔 **Natívne upozornenia** – Získajte upozornenia na vyčerpanie kvóty alebo problémy s poskytovateľom
- ⚡ **Inštalácia jedným kliknutím** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Režim offline** – Funguje plne offline s pribaleným serverom

### Rýchly štart

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Systémová lišta

Keď je minimalizovaný, OmniRoute žije vo vašej systémovej lište s rýchlymi akciami:

- Otvorte prístrojovú dosku
- Zmeňte port servera
- Ukončite aplikáciu

📖 Úplná dokumentácia: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Prehľad cien

| Úroveň            | Poskytovateľ                | Náklady                              | Obnovenie kvóty              | Najlepšie pre                                |
| ----------------- | --------------------------- | ------------------------------------ | ---------------------------- | -------------------------------------------- |
| **💳 PREDPLATNÉ** | Claude Code (Pro)           | 20 USD/mesiac                        | 5h + týždenne                | Už prihlásené                                |
|                   | Codex (Plus/Pro)            | 20 – 200 USD/mesiac                  | 5h + týždenne                | Používatelia OpenAI                          |
|                   | Gemini CLI                  | **ZADARMO**                          | 180 tis./mesiac + 1 tis./deň | Všetci!                                      |
|                   | GitHub Copilot              | 10 – 19 USD/mes.                     | Mesačne                      | Používatelia GitHubu                         |
| **🔑 API KEY**    | NVIDIA NIM                  | **ZADARMO** (dev forever)            | ~40 RPM                      | 70+ otvorených modelov                       |
|                   | Cerebras                    | **ZADARMO** (1 milión toku/deň)      | 60 000 TPM / 30 RPM          | Najrýchlejší na svete                        |
|                   | Groq                        | **ZADARMO** (30 RPM)                 | 14,4K RPD                    | Ultra rýchla lama/gemma                      |
|                   | DeepSeek V3.2               | 0,27 USD/1,10 USD za 1 milión        | Žiadne                       | Najlepšie zdôvodnenie cena/kvalita           |
|                   | xAI Grok-4 Fast             | **0,20 USD/0,50 USD za 1M** 🆕       | Žiadne                       | Najrýchlejšie + volanie nástroja, ultranízke |
|                   | xAI Grok-4 (štandard)       | 0,20 USD/1,50 USD za 1 milión 🆕     | Žiadne                       | Rozumná vlajková loď od xAI                  |
|                   | Mistral                     | Bezplatná skúšobná verzia + platené  | Obmedzená sadzba             | Európska AI                                  |
|                   | OpenRouter                  | Platba za použitie                   | Žiadne                       | 100+ modelov agr.                            |
| **💰 LACNO**      | GLM-5 (cez Z.AI) 🆕         | 0,5 USD/1 milión                     | Denne 10:00                  | 128K výstup, najnovšia vlajková loď          |
|                   | GLM-4,7                     | 0,6 USD/1 milión                     | Denne 10:00                  | Záloha rozpočtu                              |
|                   | MiniMax M2,5 🆕             | Vstup 0,3 $/1 milión                 | 5-hodinové valcovanie        | Úvahy + agentské úlohy                       |
|                   | MiniMax M2.1                | 0,2 USD/1 milión                     | 5-hodinové valcovanie        | Najlacnejšia možnosť                         |
|                   | Kimi K2.5 (Moonshot API) 🆕 | Platba za použitie                   | Žiadne                       | Priamy prístup Moonshot API                  |
|                   | Kimi K2                     | 9 USD/mesiac byt                     | 10 miliónov tokenov/mesiac   | Predvídateľné náklady                        |
| **🆓 ZDARMA**     | iFlow                       | **$0**                               | Neobmedzené                  | 5 modelov neobmedzene                        |
|                   | Qwen                        | **$0**                               | Neobmedzené                  | 4 modely neobmedzene                         |
|                   | Kiro                        | **$0**                               | Neobmedzené                  | Claude Sonnet/Haiku (staviteľ AWS)           |
|                   | LongCat Flash-Lite 🆕       | **$0** (50 miliónov tok/deň 🔥)      | 1 RPS                        | Najväčšia bezplatná kvóta na Zemi            |
|                   | Opeľovanie AI 🆕            | **$0** (nie je potrebný žiadny kľúč) | 1 požiadavka/15s             | GPT-5, Claude, DeepSeek, Llama 4             |
|                   | Cloudflare Workers AI 🆕    | **$0** (10 000 neurónov/deň)         | ~150 resp./deň               | 50+ modelov, globálny náskok                 |
|                   | Scaleway AI 🆕              | **$0** (celkom 1 milión tokenov)     | Obmedzená sadzba             | EU/GDPR, Qwen3 235B, Lama 70B                |

> 🆕 **Pridané nové modely (marec 2026):** Rodina Grok-4 Fast za 0,20 $/0,50 $/M (porovnávacia rýchlosť 1143 ms – o 30 % rýchlejšia ako Gemini 2.5 Flash), GLM-5 cez Z.AI s výstupom 128 kB, aktualizovaná cena MiniMax M2.5 V5, Kimi K2.2 Direct API.

**💡 Combo Stack 0 $ — Kompletné bezplatné nastavenie:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**Nulové náklady. Nikdy neprestáva kódovať.** Nakonfigurujte si to ako jednu kombináciu OmniRoute a všetky núdzové situácie sa stanú automaticky – žiadne manuálne prepínanie.

---

---

## 🆓 Bezplatné modely — to, čo skutočne získate

> Všetky modely uvedené nižšie sú **100 % zadarmo, bez potreby kreditnej karty**. OmniRoute medzi nimi automaticky prechádza, keď sa minie jedna kvóta – skombinujte ich všetky a získate nerozbitnú kombináciu 0 $.

### 🔵 CLAUDE MODELS (cez Kiro — AWS Builder ID)

| Model               | Predpona | Limit           | Limit sadzby               |
| ------------------- | -------- | --------------- | -------------------------- |
| `claude-sonnet-4.5` | `kr/`    | **Neobmedzené** | Žiadny hlásený denný limit |
| `claude-haiku-4.5`  | `kr/`    | **Neobmedzené** | Žiadny hlásený denný limit |
| `claude-opus-4.6`   | `kr/`    | **Neobmedzené** | Najnovší Opus cez Kiro     |

### 🢢 MODELY IFLOW (bezplatný protokol OAuth – žiadna kreditná karta)

| Model              | Predpona | Limit           | Limit sadzby           |
| ------------------ | -------- | --------------- | ---------------------- |
| `kimi-k2-thinking` | `if/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `qwen3-coder-plus` | `if/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `deepseek-r1`      | `if/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `minimax-m2.1`     | `if/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `kimi-k2`          | `if/`    | **Neobmedzené** | Žiadny nahlásený strop |

### 🟡 MODELY QWEN (autorizácia kódu zariadenia)

| Model               | Predpona | Limit           | Limit sadzby           |
| ------------------- | -------- | --------------- | ---------------------- |
| `qwen3-coder-plus`  | `qw/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `qwen3-coder-flash` | `qw/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `qwen3-coder-next`  | `qw/`    | **Neobmedzené** | Žiadny nahlásený strop |
| `vision-model`      | `qw/`    | **Neobmedzené** | Multimodálne (obrázky) |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Predpona | Limit                                | Limit sadzby   |
| ------------------------ | -------- | ------------------------------------ | -------------- |
| `gemini-3-flash-preview` | `gc/`    | **180 tis. tok/mesiac** + 1 tis./deň | Mesačný reset  |
| `gemini-2.5-pro`         | `gc/`    | 180 tis./mesiac (zdieľaný bazén)     | Vysoká kvalita |

### ⚫ NVIDIA NIM (bezplatný kľúč API — build.nvidia.com)

| Úroveň        | Denný limit      | Limit sadzby | Poznámky                                                          |
| ------------- | ---------------- | ------------ | ----------------------------------------------------------------- |
| Zadarmo (Dev) | Žiadny token cap | **~40 RPM**  | 70+ modelov; prechod na limity čistej sadzby v polovici roku 2025 |

Populárne bezplatné modely: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`\_, \_6_EN_OMNI

### ⚪ CEREBRAS (bezplatný kľúč API — inference.cerebras.ai)

| Úroveň  | Denný limit              | Limit sadzby        | Poznámky                                               |
| ------- | ------------------------ | ------------------- | ------------------------------------------------------ |
| Zadarmo | **1 milión tokenov/deň** | 60 000 TPM / 30 RPM | Svetovo najrýchlejšie odvodenie LLM; resetuje sa denne |

Dostupné zadarmo: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (bezplatný kľúč API — console.groq.com)

| Úroveň  | Denný limit   | Limit sadzby                 | Poznámky                                         |
| ------- | ------------- | ---------------------------- | ------------------------------------------------ |
| Zadarmo | **14,4K RPD** | 30 otáčok za minútu na model | Žiadna kreditná karta; 429 na limit, neúčtuje sa |

Dostupné zadarmo: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (bezplatný kľúč API — longcat.chat) 🆕

| Model                         | Predpona | Denná bezplatná kvóta      | Poznámky                        |
| ----------------------------- | -------- | -------------------------- | ------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`    | **50 miliónov žetónov** 💥 | Najväčšia bezplatná kvóta vôbec |
| `LongCat-Flash-Chat`          | `lc/`    | 500 000 žetónov            | Viacotáčkový chat               |
| `LongCat-Flash-Thinking`      | `lc/`    | 500 000 žetónov            | Zdôvodnenie / CoT               |
| `LongCat-Flash-Thinking-2601` | `lc/`    | 500 000 žetónov            | Verzia z januára 2026           |
| `LongCat-Flash-Omni-2603`     | `lc/`    | 500 000 žetónov            | Multimodálne                    |

> 100 % zadarmo vo verejnej beta verzii. Zaregistrujte sa na [longcat.chat](https://longcat.chat) pomocou e-mailu alebo telefónu. Resetuje sa denne o 00:00 UTC.

### 🢢 POLLINATIONS AI (nevyžaduje sa žiadny kľúč API) 🆕

| Model      | Predpona | Limit sadzby     | Poskytovateľ za    |
| ---------- | -------- | ---------------- | ------------------ |
| `openai`   | `pol/`   | 1 požiadavka/15s | GPT-5              |
| `claude`   | `pol/`   | 1 požiadavka/15s | Antropický Claude  |
| `gemini`   | `pol/`   | 1 požiadavka/15s | Google Gemini      |
| `deepseek` | `pol/`   | 1 požiadavka/15s | DeepSeek V3        |
| `llama`    | `pol/`   | 1 požiadavka/15s | Meta Llama 4 Scout |
| `mistral`  | `pol/`   | 1 požiadavka/15s | Mistral AI         |

> ✨ **Nulové trenie:** Bez registrácie, bez kľúča API. Pridajte poskytovateľa opeľovania s prázdnym kľúčovým poľom a funguje to okamžite.

### 🟠 CLOUDFLARE WORKERS AI (bezplatný kľúč API — cloudflare.com) 🆕

| Úroveň  | Denné neuróny | Ekvivalentné použitie                        | Poznámky                 |
| ------- | ------------- | -------------------------------------------- | ------------------------ |
| Zadarmo | **10 000**    | ~150 LLM resp / 500 s audio / 15 000 vložení | Global edge, 50+ modelov |

Populárne bezplatné modely: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (bezplatný zvuk!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Vyžaduje token API + ID účtu z [dash.cloudflare.com](https://dash.cloudflare.com). Uložte ID účtu v nastaveniach poskytovateľa.

### 🟣 SCALEWAY AI (1 milión bezplatných tokenov — scaleway.com) 🆕

| Úroveň  | Voľná ​​kvóta        | Miesto       | Poznámky                                              |
| ------- | -------------------- | ------------ | ----------------------------------------------------- |
| Zadarmo | **1 milión tokenov** | 🇫🇷 Paríž, EÚ | V rámci limitov nie je potrebná žiadna kreditná karta |

Dostupné zadarmo: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> V súlade s EÚ/GDPR. Získajte kľúč API na [console.scaleway.com](https://console.scaleway.com).

> **💡 Konečný bezplatný balík (11 poskytovateľov, 0 $ navždy):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Kombinácia bezplatného prepisu

> Prepíšte akýkoľvek zvuk/video za **$0** – Deepgram vedie s 200 $ zadarmo, AssemblyAI 50 $ záložný, Groq Whisper ako neobmedzená núdzová záloha.

| Poskytovateľ    | Bezplatné kredity               | Najlepší model                                     | Limit sadzby                          |
| --------------- | ------------------------------- | -------------------------------------------------- | ------------------------------------- |
| 🢢 **Deepgram**  | **200 $ zadarmo** (registrácia) | `nova-3` — najlepšia presnosť, viac ako 30 jazykov | Žiadny limit RPM na bezplatné kredity |
| 🔵 **MontážAI** | **50 $ zadarmo** (registrácia)  | `universal-3-pro` – kapitoly, sentiment, PII       | Žiadny limit RPM na bezplatné kredity |
| 🔴 **Groq**     | **Navždy zadarmo**              | `whisper-large-v3` — OpenAI Whisper                | 30 RPM (obmedzená rýchlosť)           |

**Navrhovaná kombinácia v `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Potom na karte `/dashboard/media` → **Prepis**: nahrajte akýkoľvek zvukový alebo video súbor → vyberte svoj kombinovaný koncový bod → získajte prepis v podporovaných formátoch.

## 💡 Kľúčové vlastnosti

OmniRoute v2.0 je postavený ako operačná platforma, nie len ako relé proxy.

### 🆕 Novinka — Vylepšenia inšpirované ClawRouterom (marec 2026)

| Funkcia                                   | Čo to robí                                                                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ⚡ **Grok-4 Fast Family**                 | Modely xAI za 0,20 USD/0,50 USD/M – porovnávacia rýchlosť 1143 ms (o 30 % rýchlejšie ako Gemini 2.5 Flash)                           |
| 🧠 **GLM-5 cez Z.AI**                     | 128 000 výstupný kontext, 0,5 $/1 milión – najnovšia vlajková loď z rodiny GLM                                                       |
| 🔮 **MiniMax M2,5**                       | Úvahy + agentské úlohy za 0,30 $/1 milión – významný upgrade z M2,1                                                                  |
| 🎯 **toolCalling Flag na model**          | Podľa modelu `toolCalling: true/false` v registri – AutoCombo preskakuje modely bez nástrojov                                        |
| 🌍 **Multilingual Intent Detection**      | Kľúčové slová PT/ZH/ES/AR v hodnotení AutoCombo – lepší výber modelu pre neanglický obsah                                            |
| 📊 **Návraty založené na benchmarkoch**   | Skutočná latencia p95 z kombinovaného hodnotenia informačných kanálov živých žiadostí – AutoCombo sa učí zo skutočných údajov        |
| 🔁 **Požiadať o deduplikáciu**            | Okno odstraňovania duplicitných údajov založené na hašovaní obsahu – bezpečné pre viacerých agentov, zabraňuje duplicitným poplatkom |
| 🔌 **Stratégia pripojiteľného smerovača** | Rozšíriteľné rozhranie `RouterStrategy` – pridanie vlastnej logiky smerovania ako zásuvných modulov                                  |

### 🚀 Predchádzajúca v2.0.9+ – Ihrisko, odtlačky prstov CLI a AKT

| Funkcia                                      | Čo to robí                                                                                                                                                                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🎮 **Modelové ihrisko**                      | Stránka hlavného panela na priame otestovanie akéhokoľvek modelu – selektory poskytovateľa/modelu/koncového bodu, editor Monaco, streamovanie, prerušenie, načasovanie                                                                                                                                 |
| 🔏 **CLI Fingerprint Matching**              | Usporiadanie hlavičky/tela podľa poskytovateľa tak, aby sa zhodovalo s natívnymi podpismi CLI – prepínajte podľa poskytovateľa v Nastavenia > Zabezpečenie. **Vaša proxy IP je zachovaná**                                                                                                             |
| 🤝 **Podpora ACP (Protokol agenta klienta)** | Objavovanie agentov CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 ďalších), spúšťač procesov, koncový bod `/api/acp/agents`                                                                                                                                                                      |
| 🤖 **Hlavný panel agentov AKT**              | Debug › Stránka Agenti — mriežka 14 agentov so stavom inštalácie, verziou, vlastným formulárom agenta pre ľubovoľný nástroj CLI. Používatelia **OpenCode** dostanú tlačidlo „Stiahnuť opencode.json“, ktoré automaticky vygeneruje konfiguráciu pripravenú na použitie so všetkými dostupnými modelmi. |
| 🔧 **Vlastný model `apiFormat` Smerovanie**  | Vlastné modely s `apiFormat: "responses"` teraz správne smerujú do prekladača Responses API                                                                                                                                                                                                            |
| 🏢 **Izolácia pracovného priestoru Codex**   | Viaceré pracovné priestory Codex na e-mail – OAuth správne oddeľuje pripojenia podľa ID pracovného priestoru                                                                                                                                                                                           |
| 🔄 **Elektrónová automatická aktualizácia**  | Desktopová aplikácia kontroluje aktualizácie + automatická inštalácia pri reštarte                                                                                                                                                                                                                     |

### 🤖 Agent & Protocol Operations (v2.0)

| Funkcia                                        | Čo to robí                                                                                                |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP Server (16 nástrojov)**               | Nástroje IDE/agenta cez 3 prenosy: stdio, SSE (`/api/mcp/sse`), Streamovateľný HTTP (`/api/mcp/stream`)   |
| 🤝 **Server A2A (JSON-RPC + SSE)**             | Vykonávanie úloh agent-agent so synchronizáciou a streamovaním                                            |
| 🧭 **Stránka konsolidovaných koncových bodov** | Stránka správy s kartami s kartami Endpoint Proxy, MCP, A2A a API Endpoints                               |
| 🎚️ **Prepínače aktivácie/deaktivácie služby**  | Vypínače ON/OFF pre MCP a A2A s trvalým nastavením (predvolené: OFF)                                      |
| 🛰️ **MCP Runtime Heartbeat**                   | Skutočný stav procesu (pid, uptime, srdcový tep, transport, režim rozsahu)                                |
| 📋 **MCP Audit Trail**                         | Filtrovateľné protokoly auditu s úspechom/neúspechom a kľúčovým priradením                                |
| 🔐 **Presadzovanie rozsahu MCP**               | 9 podrobných oprávnení rozsahu pre riadený prístup k nástroju                                             |
| 📡 **Správa životného cyklu úloh A2A**         | Zoznam/filtrovanie úloh, kontrola udalostí/artefaktov, zrušenie spustených úloh                           |
| 📋 **Zistenie karty agenta**                   | `/.well-known/agent.json` pre automatické zisťovanie klientov                                             |
| 🧪 **Protokol E2E Test Harness**               | Skutočné toky klienta MCP SDK + A2A v `test:protocols:e2e`                                                |
| ⚙️ **Ovládacie prvky**                         | Kombinované prepínanie, aplikovanie profilov odolnosti, resetovanie ističov z jedného ovládacieho povrchu |

### 🧠 Smerovanie a inteligencia

| Funkcia                                       | Čo to robí                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| 🎯 **Inteligentná 4-úrovňová núdzová záloha** | Automatická trasa: Predplatné → Kľúč API → Lacné → Zadarmo                       |
| 📊 **Sledovanie kvóty v reálnom čase**        | Živý počet tokenov + reset odpočítavania na poskytovateľa                        |
| 🔄 **Formátový preklad**                      | OpenAI ↔ Claude ↔ Gemini ↔ Odpovede s konverziami bezpečnými pre schému          |
| 👥 **Podpora viacerých účtov**                | Viac účtov na poskytovateľa s inteligentným výberom                              |
| 🔄 **Automatická obnova tokenov**             | Tokeny OAuth sa automaticky obnovia s opätovným pokusom                          |
| 🎨 **Vlastné kombá**                          | 6 vyvažovacích stratégií + núdzové riadenie reťazca                              |
| 🌐 **Wildcard Router**                        | `provider/*` dynamické smerovanie                                                |
| 🧠 **Premýšľajte o kontrolách rozpočtu**      | Limity priechodného, ​​automatického, vlastného a adaptívneho uvažovania         |
| 🔀 **Aliasy modelov**                         | Vstavaný + vlastný model aliasing a bezpečnosť migrácie                          |
| ⚡ **Degradácia pozadia**                     | Smerujte úlohy s nízkou prioritou na pozadí na lacnejšie modely                  |
| 🧪 **Inteligentné smerovanie podľa úloh**     | Automatický výber modelu podľa typu obsahu (kódovanie/vízia/analýza/sumarizácia) |
| 💬 **Promptné vstrekovanie systému**          | Dôsledne uplatňované globálne kontroly správania                                 |
| 📄 **Kompatibilita rozhrania Responses API**  | Plná podpora `/v1/responses` pre kódex a pokročilé pracovné postupy agentov      |

### 🎵 Multimodálne API

| Funkcia                        | Čo to robí                                                                                                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generovanie obrázkov**    | `/v1/images/generations` s cloudom a lokálnymi backendmi                                                                                                                            |
| 📐 **Vloženie**                | `/v1/embeddings` pre vyhľadávacie a RAG potrubia                                                                                                                                    |
| 🎤 **Prepis zvuku**            | `/v1/audio/transcriptions` — 7 poskytovateľov (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatická detekcia jazyka, podpora MP4/MP3/WAV |
| 🔊 **Prevod textu na reč**     | `/v1/audio/speech` — 10 poskytovateľov (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) so správnymi chybovými hláseniami        |
| 🎬 **Generácia videa**         | `/v1/videos/generations` (pracovné postupy ComfyUI + SD WebUI)                                                                                                                      |
| 🎵 **Hudobná generácia**       | `/v1/music/generations` (pracovné postupy ComfyUI)                                                                                                                                  |
| 🛡️ **Moderovania**             | `/v1/moderations` bezpečnostné kontroly                                                                                                                                             |
| 🔀 **Reranking**               | `/v1/rerank` na hodnotenie relevantnosti                                                                                                                                            |
| 🔍 **Vyhľadávanie na webe** 🆕 | `/v1/search` — 5 poskytovateľov (Serper, Brave, Perplexity, Exa, Tavily), 6 500+ zadarmo/mesiac, automatické zlyhanie, vyrovnávacia pamäť                                           |

### 🛡️ Odolnosť, bezpečnosť a riadenie

| Funkcia                                          | Čo to robí                                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 🔌 **Ističe**                                    | Vypnutie/obnovenie pre každý model s prahovými ovládačmi                                       |
| 🎯 ** Modely s vedomím koncového bodu**          | Vlastné modely deklarujú podporované koncové body + formát API                                 |
| 🛡️ **Anti-hromové stádo**                        | Mutex + semaforové ochrany pri opakovaných udalostiach/postupoch                               |
| 🧠 **Sémantická + podpisová vyrovnávacia pamäť** | Zníženie nákladov/latencie pomocou dvoch vrstiev vyrovnávacej pamäte                           |
| ⚡ **Požiadajte o idempotenciu**                 | Duplicitné ochranné okno                                                                       |
| 🔒 ** Spoofing odtlačkov prstov TLS**            | Odtlačok TLS podobný prehliadaču – **obmedzuje detekciu robotov a označovanie účtu**           |
| 🔏 **CLI Fingerprint Matching**                  | Zodpovedá natívnym podpisom požiadaviek CLI – **znižuje riziko zákazu pri zachovaní proxy IP** |
| 🌐 **Filtrovanie IP**                            | Kontrola zoznamu povolených/blokovaných nasadení pre vystavené nasadenia                       |
| 📊 **Upraviteľné limity sadzieb**                | Konfigurovateľné globálne limity/limity na úrovni poskytovateľa s perzistenciou                |
| 🔑 **Správa kľúčov API + rozsah**                | Bezpečné vydávanie/otočenie kľúčov a ovládanie modelu/poskytovateľa                            |
| 🛡️ **Chránené `/models`**                        | Voliteľné overenie a skrytie poskytovateľa pre katalóg modelov                                 |

### 📊 Pozorovateľnosť a analytika

| Funkcia                               | Čo to robí                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| 📝 **Žiadosť + protokolovanie proxy** | Úplná žiadosť/odpoveď a protokolovanie proxy                                             |
| 📋 **Unified Logs Dashboard**         | Požiadavka, proxy, audit a zobrazenie konzoly na jednej stránke                          |
| 🔍 **Požiadať o telemetriu**          | p50/p95/p99 latencia a sledovanie požiadaviek                                            |
| 🏥 **Panel zdravia**                  | Doba prevádzkyschopnosti, stavy prerušovačov, uzamknutia, štatistiky vyrovnávacej pamäte |
| 💰 **Sledovanie nákladov**            | Kontroly rozpočtu a viditeľnosť cien podľa modelu                                        |
| 📈 **Analytické vizualizácie**        | Štatistiky používania modelu/poskytovateľa a zobrazenia trendov                          |
| 🧪 **Rámec hodnotenia**               | Testovanie zlatej sady s konfigurovateľnými stratégiami zhody                            |

### ☁️ Nasadenie a platforma

| Funkcia                        | Čo to robí                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| 🌐 **Nasadenie kdekoľvek**     | Localhost, VPS, Docker, Cloud prostredia                                             |
| 💾 **Cloud Sync**              | Synchronizácia konfigurácie cez cloud worker                                         |
| 🔄 **Zálohovanie/Obnova**      | Export/import a toky obnovy po havárii                                               |
| 🧙 **Sprievodca onboardingom** | Sprievodca nastavením pri prvom spustení                                             |
| 🔧 **CLI Tools Dashboard**     | Nastavenie jedným kliknutím pre obľúbené nástroje kódovania                          |
| 🎮 **Modelové ihrisko**        | Otestujte akéhokoľvek poskytovateľa/model/koncový bod z ovládacieho panela           |
| 🔏 **CLI Fingerprint Toggle**  | Zhoda odtlačkov prstov jednotlivých poskytovateľov v časti Nastavenia > Zabezpečenie |
| 🌐 **i18n (30 jazykov)**       | Úplná podpora dashboardu + dokumentov s podporou RTL                                 |
| 🧹 **Vymazať všetky modely**   | Vymazanie zoznamu modelov jedným kliknutím v detailoch poskytovateľa                 |
| 📋 **Šablóny vydaní**          | Štandardizované šablóny GitHub pre chyby a funkcie                                   |
| 📂 **Custom Data Directory**   | `DATA_DIR` prepísanie miesta uloženia                                                |

### Funkcia Deep Dive

#### Inteligentné núdzové riešenie s praktickou kontrolou nákladov

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Keď kvóta, sadzba alebo stav zlyhajú, OmniRoute automaticky prejde na ďalšieho kandidáta bez manuálneho prepínania.

#### Správa protokolov, ktorá je viditeľná a ovládateľná

- MCP + A2A sú viditeľné v používateľskom rozhraní a dokumentoch (nie sú skryté)
  – Rozhrania API stavu protokolu odhaľujú aktuálne prevádzkové údaje (`/api/mcp/*`, `/api/a2a/*`)
- Panely obsahujú akcie pre 2. deň (prepínanie komb, resetovanie prerušovača, zrušenie úlohy)

#### Pracovný postup prekladateľa + overenia

Oblasť prekladateľov zahŕňa:

- **Ihrisko**: vyžiadajte si kontroly transformácie
- **Chat Tester**: úplná spiatočná cesta so žiadosťou a odpoveďou
- **Testovacia lavica**: viacero prípadov v jednom behu
- **Live Monitor**: zobrazenie premávky v reálnom čase

Plus overenie protokolu so skutočnými klientmi cez `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Referencie k nástroju, konfigurácie IDE a príklady klientov
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Zručnosti, metódy JSON-RPC, streamovanie a životný cyklus úloh

## 🧪 Hodnotenia (Evals)

OmniRoute obsahuje vstavaný hodnotiaci rámec na testovanie kvality odozvy LLM oproti zlatému súboru. Prístup k nej získate cez **Analytics → Evals** na hlavnom paneli.

### Vstavaná zlatá súprava

Predinštalovaná sada „OmniRoute Golden Set“ obsahuje testovacie prípady pre:

- Pozdravy, matematika, geografia, generovanie kódu
- Súlad s formátom JSON, preklad, generovanie markdownov
- Bezpečnostné odmietnutie (škodlivý obsah), počítanie, booleovská logika

### Stratégie hodnotenia

| Stratégia  | Popis                                                                  | Príklad                          |
| ---------- | ---------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Výstup sa musí presne zhodovať                                         | `"4"`                            |
| `contains` | Výstup musí obsahovať podreťazec (nerozlišujú sa malé a veľké písmená) | `"Paris"`                        |
| `regex`    | Výstup musí zodpovedať vzoru regulárneho výrazu                        | `"1.*2.*3"`                      |
| `custom`   | Vlastná funkcia JS vracia true/false                                   | `(output) => output.length > 10` |

---

## 📖 Sprievodca nastavením

### Nastavenie protokolu (MCP + A2A)

<details>
<summary><b>🧩 Nastavenie MCP (Model Context Protocol)</b></summary>

Spustite prenos MCP v režime stdio:

```bash
omniroute --mcp
```

Odporúčaný postup overenia:

1. Pripojte svojho MCP klienta cez stdio.
2. Spustite `omniroute_get_health`.
3. Spustite `omniroute_list_combos`.
4. Otvorte `/dashboard/mcp` na potvrdenie srdcového tepu, aktivity a auditu.

Užitočné API pre automatizáciu:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Nastavenie A2A (Agent2Agent)</b></summary>

Objavte agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Pošlite úlohu:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Správa životného cyklu:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Operačné používateľské rozhranie:

- `/dashboard/a2a` pre pozorovateľnosť úlohy/stavu/streamu a akcie dymu

</details>

<details>
<summary><b>🧪 Kompletné overenie protokolu</b></summary>

Overte oba protokoly so skutočnými klientmi:

```bash
npm run test:protocols:e2e
```

Týmto sa overí:

- Pripojenie/zoznam/zavolanie klienta MCP SDK
- A2A objav/odoslanie/streamovanie/získanie/zrušenie
- Krížová kontrola údajov v MCP audit a A2A task management API

</details>

<details>
<summary><b>💳 Poskytovatelia predplatného</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Tip pre profesionálov:** Používajte Opus na zložité úlohy, Sonnet na rýchlosť. OmniRoute sleduje kvótu na model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Správa limitu účtu Codex (5 hodín + týždenne)

Každý účet Codex má teraz prepínače pravidiel v `Dashboard -> Providers`:

- `5h` (ZAP./VYP.): presadzovať zásadu prahu 5-hodinového okna.
- `Weekly` (ZAP./VYP.): presadzovanie zásady týždenného limitu okna.
- Prahové správanie: keď povolené okno dosiahne využitie >=90 %, daný účet sa preskočí.
- Rotačné správanie: OmniRoute automaticky smeruje k ďalšiemu oprávnenému účtu Codex.
- Resetovať správanie: keď poskytovateľ `resetAt` uplynie čas, účet sa automaticky znova stane spôsobilým.

Scenáre:

- `5h ON` + `Weekly ON`: účet sa preskočí, keď ktorékoľvek okno dosiahne prah.
- `5h OFF` + `Weekly ON`: účet môže zablokovať iba týždenné používanie.
- `5h ON` + `Weekly OFF`: iba 5-hodinové používanie môže zablokovať účet.
- `resetAt` úspešne prebehlo: účet sa automaticky znova zaradí do rotácie (bez manuálneho opätovného povolenia).

### Gemini CLI (ZADARMO 180 000/mesiac!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Najlepšia hodnota:** Obrovská bezplatná úroveň! Použite to pred platenými úrovňami.

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Kľúčoví poskytovatelia API</b></summary>

### NVIDIA NIM (BEZPLATNÝ prístup pre vývojárov — 70+ modelov)

1. Zaregistrujte sa: [build.nvidia.com](https://build.nvidia.com)
2. Získajte bezplatný kľúč API (vrátane 1 000 kreditov na odvodenie)
3. Ovládací panel → Pridať poskytovateľa → NVIDIA NIM:
   - Kľúč API: `nvapi-your-key`

**Modely:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` a 50+ ďalších

**Tip pre profesionálov:** API kompatibilné s OpenAI – bezproblémovo funguje s prekladom formátu OmniRoute!

### DeepSeek

1. Zaregistrujte sa: [platform.deepseek.com](https://platform.deepseek.com)
2. Získajte kľúč API
3. Dashboard → Pridať poskytovateľa → DeepSeek

**Modely:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (dostupná bezplatná úroveň!)

1. Zaregistrujte sa: [console.groq.com](https://console.groq.com)
2. Získajte kľúč API (vrátane bezplatnej úrovne)
3. Dashboard → Pridať poskytovateľa → Groq

**Modely:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Tip pre profesionálov:** Ultra rýchle odvodenie – najlepšie pre kódovanie v reálnom čase!

### OpenRouter (100+ modelov)

1. Zaregistrujte sa: [openrouter.ai](https://openrouter.ai)
2. Získajte kľúč API
3. Dashboard → Pridať poskytovateľa → OpenRouter

**Modely:** Získajte prístup k viac ako 100 modelom od všetkých hlavných poskytovateľov prostredníctvom jediného kľúča API.

</details>

<details>
<summary><b>💰 Lacní poskytovatelia (záložné)</b></summary>

### GLM-4,7 (denný reset, 0,6 $/1 milión)

1. Zaregistrujte sa: [Zhipu AI](https://open.bigmodel.cn/)
2. Získajte kľúč API z plánu kódovania
3. Panel → Pridať kľúč API:
   – Poskytovateľ: `glm`
   - Kľúč API: `your-key`

**Použitie:** `glm/glm-4.7`

**Tip pre profesionálov:** Kódovací plán ponúka 3× kvótu za 1/7 cenu! Resetovať denne o 10:00.

### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zaregistrujte sa: [MiniMax](https://www.minimax.io/)
2. Získajte kľúč API
3. Panel → Pridať kľúč API

**Použitie:** `minimax/MiniMax-M2.1`

**Tip pre profesionálov:** Najlacnejšia možnosť pre dlhý kontext (1 milión tokenov)!

### Kimi K2 (9 USD/mesiac)

1. Prihlásiť sa na odber: [Moonshot AI](https://platform.moonshot.ai/)
2. Získajte kľúč API
3. Panel → Pridať kľúč API

**Použitie:** `kimi/kimi-latest`

**Tip pre profesionálov:** Pevné 9 $/mesiac za 10 miliónov tokenov = 0,90 $/1 milión efektívnych nákladov!

</details>

<details>
<summary><b>🆓 BEZPLATNÍ poskytovatelia (núdzové zálohovanie)</b></summary>

### iFlow (5 BEZPLATNÝCH modelov cez OAuth)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (4 ZDARMA modely prostredníctvom kódu zariadenia)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Vytvoriť kombá</b></summary>

### Príklad 1: Maximalizujte predplatné → Lacné zálohovanie

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Príklad 2: Iba zadarmo (nulové náklady)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 CLI Integration</b></summary>

### IDE kurzora

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Na konfiguráciu jedným kliknutím použite stránku **CLI Tools** na informačnom paneli alebo upravte `~/.claude/settings.json` manuálne.

### Kódex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Možnosť 1 – Dashboard (odporúčané):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Možnosť 2 – Manuálne:** Upraviť `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Poznámka:** OpenClaw funguje iba s lokálnou OmniRoute. Použite `127.0.0.1` namiesto `localhost`, aby ste sa vyhli problémom s rozlíšením IPv6.

### Cline / Pokračovať / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### OpenCode

**Krok 1:** Pridajte OmniRoute ako vlastného poskytovateľa:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Krok 2:** Vytvorte/upravte `opencode.json` v koreňovom adresári projektu:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Krok 3:** Vyberte model v OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tip:** Pridajte akýkoľvek model dostupný vo vašom koncovom bode OmniRoute `/v1/models` do sekcie `models`. Použite formát `provider/model-id` z hlavného panela OmniRoute.

</details>

---

## 🐛 Riešenie problémov

<details>
<summary><b>Kliknutím rozbalíte sprievodcu riešením problémov</b></summary>

**„Jazykový model neposkytol správy“**

- Kvóta poskytovateľa je vyčerpaná → Skontrolujte sledovanie kvót na paneli
- Riešenie: Použite záložnú kombináciu alebo prejdite na lacnejšiu úroveň

**Obmedzenie sadzby**

- Vyčerpaná kvóta predplatného → Návrat na GLM/MiniMax
- Pridať kombináciu: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Platnosť tokenu OAuth vypršala**

- Automaticky obnovuje OmniRoute
- Ak problémy pretrvávajú: Dashboard → Provider → Reconnect

**Vysoké náklady**

- Skontrolujte štatistiky používania v hlavnom paneli → Náklady
- Prepnite primárny model na GLM/MiniMax
- Používajte bezplatnú vrstvu (Gemini CLI, iFlow) pre nekritické úlohy

**Porty palubnej dosky/API sú nesprávne**

- `PORT` je kanonický základný port (predvolene a port API)
- `API_PORT` prepíše iba poslucháč API kompatibilný s OpenAI
- `DASHBOARD_PORT` prepíše iba informačný panel/prijímač Next.js
  – Nastavte `NEXT_PUBLIC_BASE_URL` na svoj informačný panel/verejnú adresu URL (pre spätné volania OAuth)

**Chyby synchronizácie v cloude**

- Overte, že `BASE_URL` odkazuje na vašu spustenú inštanciu
  – Overte `CLOUD_URL` body k očakávanému koncovému bodu cloudu
- Udržujte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na strane servera

**Prvé prihlásenie nefunguje**

- Skontrolujte `INITIAL_PASSWORD` v `.env`
  – Ak nie je nastavené, záložné heslo je `123456`

**Žiadne záznamy žiadostí**

- Nastaviť `ENABLE_REQUEST_LOGS=true` v `.env`

**Test pripojenia ukazuje „Neplatné“ pre poskytovateľov kompatibilných s OpenAI**

- Mnohí poskytovatelia nevystavujú koncový bod `/models`
- OmniRoute v1.0.6+ zahŕňa záložné overenie prostredníctvom dokončenia chatu
- Uistite sa, že základná adresa URL obsahuje príponu `/v1`

### 🔐 OAuth na vzdialenom serveri

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Dôležité pre používateľov, ktorí používajú OmniRoute na VPS, Docker alebo akomkoľvek vzdialenom serveri**

#### Prečo Antigravity / Gemini CLI OAuth zlyhá na vzdialených serveroch?

Poskytovatelia **Antigravity** a **Gemini CLI** používajú **Google OAuth 2.0**. Google vyžaduje, aby sa `redirect_uri` v toku OAuth presne zhodovalo s jedným z vopred zaregistrovaných identifikátorov URI v konzole Google Cloud Console aplikácie.

Prihlasovacie údaje OAuth v balíku v OmniRoute sú registrované **len pre `localhost`**. Keď pristupujete k OmniRoute na vzdialenom serveri (napr. `https://omniroute.myserver.com`), Google odmietne overenie pomocou:

```
Error 400: redirect_uri_mismatch
```

#### Riešenie: Nakonfigurujte si vlastné poverenia OAuth

V konzole Google Cloud Console musíte vytvoriť **OAuth 2.0 Client ID** s identifikátorom URI vášho servera.

#### Krok za krokom

**1. Otvoriť Google Cloud Console**

Prejsť na: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Vytvorte nové ID klienta OAuth 2.0**

- Kliknite na **"+ Vytvoriť poverenia"** → **"ID klienta OAuth"**
- Typ aplikácie: **"Webová aplikácia"**
- Názov: čokoľvek, čo sa vám páči (napr. `OmniRoute Remote`)

**3. Pridať identifikátory URI autorizovaného presmerovania**

Do poľa **"URI autorizovaného presmerovania"** pridajte:

```
https://your-server.com/callback
```

> Nahraďte `your-server.com` doménou alebo IP svojho servera (v prípade potreby uveďte port, napr. `http://45.33.32.156:20128/callback`).

**4. Uložte a skopírujte poverenia**

Po vytvorení Google zobrazí **Client ID** a **Client Secret**.

**5. Nastaviť premenné prostredia**

Vo vašom `.env` (alebo premenných prostredia Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Reštartujte OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Skúste sa pripojiť znova**

Dashboard → Poskytovatelia → Antigravitácia (alebo Gemini CLI) → OAuth

Google teraz správne presmeruje na `https://your-server.com/callback`.

---

#### Dočasné riešenie (bez vlastných poverení)

Ak si práve teraz nechcete nastaviť svoje vlastné poverenia, stále môžete použiť **manuálny postup webovej adresy**:

1. OmniRoute otvorí autorizačnú URL Google
2. Po autorizácii sa Google pokúsi presmerovať na `localhost` (čo zlyhá na vzdialenom serveri)
3. **Skopírujte celú adresu URL** z panela s adresou prehliadača (aj keď sa stránka nenačíta)
4. Prilepte túto adresu URL do poľa zobrazeného v režime pripojenia OmniRoute
5. Kliknite na **"Pripojiť"**

> Funguje to, pretože autorizačný kód v adrese URL je platný bez ohľadu na to, či sa stránka s presmerovaním načítala.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Ako je OAuth do Antigravity / Gemini CLI falha em servidores remotos?

Osvedčuje **Antigravity** a **Gemini CLI** používame **Google OAuth 2.0** ako autentifikáciu. O Google exige que a `redirect_uri` usada no fluxo OAuth saja **exatamente** uma das URI pre-kadastradas no Google Cloud Console to use.

Ako credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. K dispozícii máte prístup k OmniRoute k vzdialenému servisu (napr.: `https://omniroute.meuservidor.com`), alebo k autenticite spoločnosti Google:

```
Error 400: redirect_uri_mismatch
```

#### Riešenie: Konfigurácia proprias poverenia OAuth

Presný kód je **OAuth 2.0 Client ID** bez služby Google Cloud Console s identifikátorom URI.

#### Passo a passo

**1. Prístup k službe Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 Client ID**

- Kliknite na **"+ Vytvoriť poverenia"** → **"ID klienta OAuth"**
- Tipo de aplicativo: **"Webová aplikácia"**
  – Nome: escolha qualquer nome (napr.: `OmniRoute Remote`)

**3. Adicione ako Authorized Redirect URI**

Žiadne pole **"URI autorizovaného presmerovania"**, adicione:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (inclua a porta se necessário, napr.: `http://45.33.32.156:20128/callback`).

**4. Uložiť a kópiu ako poverenie**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurovať ako variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie alebo OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Dashboard → Poskytovatelia → Antigravitácia (alebo Gemini CLI) → OAuth

Agora alebo Google redirecionará corretamente para `https://seu-servidor.com/callback` a autenticação funcionará.

---

#### Alternatívne dočasné riešenie (sem configurar credenciais próprias)

Ak chcete získať prístup k dôvere, môžete použiť **príručku URL**:

1. O OmniRoute abrirá a URL autorização Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Skopírujte úplnú webovú adresu** da barra de endereço do seu browser (mesmo que a pagina não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kliknite na **"Pripojiť"**

> Toto riešenie funguje pomocou autorizačného kódu na adrese URL a nezávislého presmerovania.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Kliknutím rozbalíte podrobnosti o technickom zásobníku</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ nie je **podporovaný** — `better-sqlite3` natívne binárne súbory sú nekompatibilné)
- **Jazyk**: TypeScript 5.9 — **100 % TypeScript** naprieč `src/` a `open-sse/` (nula `any` v základných moduloch od verzie 2.0)
  – **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Databáza**: LowDB (JSON) + SQLite (stav domény + protokoly proxy + audit MCP + rozhodnutia o smerovaní)
- **Schémy**: Zod (overenie I/O nástroja MCP, zmluvy API)
- **Protokoly**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streamovanie**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + kľúče API + autorizácia v rozsahu MCP
- **Testovanie**: Testovací program Node.js + Vitest (900+ testov vrátane jednotky, integrácie, E2E)
- **CI/CD**: Akcie GitHub (automatické zverejňovanie npm + Docker Hub pri vydaní)
- **Web**: [omniroute.online](https://omniroute.online)
- **Balík**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odolnosť**: Istič, exponenciálne ustupovanie, stádo proti hromu, spoofing TLS, auto-kombinované samoliečenie

</details>

---

## 📖 Dokumentácia

| Dokument                                       | Popis                                                          |
| ---------------------------------------------- | -------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Poskytovatelia, kombá, integrácia CLI, nasadenie               |
| [API Reference](docs/API_REFERENCE.md)         | Všetky koncové body s príkladmi                                |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 nástrojov MCP, konfigurácií IDE, klientov Python/TS/Go      |
| [A2A Server](src/lib/a2a/README.md)            | Protokol JSON-RPC 2.0, zručnosti, streamovanie, správa úloh    |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6-faktorové bodovanie, balíčky režimov, samoliečba             |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Bežné problémy a riešenia                                      |
| [Architecture](docs/ARCHITECTURE.md)           | Architektúra systému a vnútorné vybavenie                      |
| [Contributing](CONTRIBUTING.md)                | Nastavenie vývoja a usmernenia                                 |
| [OpenAPI Spec](docs/openapi.yaml)              | Špecifikácia OpenAPI 3.0                                       |
| [Security Policy](SECURITY.md)                 | Nahlasovanie zraniteľnosti a bezpečnostné postupy              |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Kompletný sprievodca: nastavenie VM + nginx + Cloudflare       |
| [Features Gallery](docs/FEATURES.md)           | Vizuálna prehliadka prístrojového panela so snímkami obrazovky |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Kroky overenia pred vydaním                                    |

---

## 🗺️ Cestovná mapa

OmniRoute má naplánovaných **210+ funkcií** vo viacerých fázach vývoja. Tu sú kľúčové oblasti:

| Kategória                                  | Plánované funkcie | Najdôležitejšie                                                                                                     |
| ------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Smerovanie a inteligencia**           | 25+               | Smerovanie s najnižšou latenciou, smerovanie založené na značkách, predbežná kontrola kvóty, výber účtu P2C         |
| 🔒 **Bezpečnosť a dodržiavanie predpisov** | 20+               | Spevnenie SSRF, maskovanie poverení, limit rýchlosti na koncový bod, rozsah kľúča riadenia                          |
| 📊 **Pozorovateľnosť**                     | 15+               | Integrácia OpenTelemetry, monitorovanie kvót v reálnom čase, sledovanie nákladov na model                           |
| 🔄 **Integrácie poskytovateľov**           | 20+               | Register dynamických modelov, cooldowny poskytovateľov, kódex pre viacero účtov, analýza kvót Copilota              |
| ⚡ **Výkon**                               | 15+               | Dual cache layer, prompt cache, response cache, streaming keepalive, batch API                                      |
| 🌐 **Ekosystém**                           | 10+               | WebSocket API, rýchle opätovné načítanie konfigurácie, distribuovaný ukladací priestor konfigurácií, komerčný režim |

### 🔜 Už čoskoro

- 🔗 **Integrácia OpenCode** – podpora natívneho poskytovateľa pre IDE kódovania OpenCode AI
- 🔗 **Integrácia TRAE** – Úplná podpora vývojového rámca TRAE AI
- 📦 **Batch API** – Asynchrónne dávkové spracovanie pre hromadné požiadavky
- 🎯 ** Smerovanie založené na značkách** – Smerujte požiadavky na základe vlastných značiek a metadát
- 💰 **Stratégia najnižšej ceny** — Automaticky vyberte najlacnejšieho dostupného poskytovateľa

> 📝 Úplné špecifikácie funkcií sú k dispozícii v [**OMNI_TOKEN_342**](docs/new-features/) (217 podrobných špecifikácií)

---

## 👥 Prispievatelia

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Ako prispieť

1. Fork úložisko
2. Vytvorte si pobočku funkcií (`git checkout -b feature/amazing-feature`)
3. Potvrďte zmeny (`git commit -m 'Add amazing feature'`)
4. Zatlačte do pobočky (`git push origin feature/amazing-feature`)
5. Otvorte požiadavku na stiahnutie

Podrobné pokyny nájdete v [CONTRIBUTING.md](CONTRIBUTING.md).

### Vydanie novej verzie

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 História hviezd

## Pozorovatelia hviezd v priebehu času

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Poďakovanie

Špeciálne poďakovanie patrí **[9router](https://github.com/decolua/9router)** od **[decolua](https://github.com/decolua)** – pôvodnému projektu, ktorý inšpiroval túto vidličku. OmniRoute stavia na tomto neuveriteľnom základe s ďalšími funkciami, multimodálnymi API a úplným prepísaním TypeScript.

Špeciálne poďakovanie patrí **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** – pôvodnej implementácii Go, ktorá inšpirovala tento port JavaScript.

---

## 📄 Licencia

Licencia MIT – podrobnosti nájdete na stránke [LICENSE](LICENSE).

---

<div align="center">
  <sub>Vytvorené pomocou ❤️ pre vývojárov, ktorí kódujú 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- Diskusie GitHub sú povolené pre otázky a odpovede komunity -->
