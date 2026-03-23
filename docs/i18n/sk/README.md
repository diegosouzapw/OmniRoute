<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — bezplatná brána AI

### Nikdy neprestávajte kódovať. Inteligentné smerovanie na **BEZPLATNÉ a nízkonákladové modely AI** s automatickým vrátením.

_Váš univerzálny proxy server API – jeden koncový bod, 36+ poskytovateľov, nulové prestoje._

**Dokončenia četov • Vkladanie • Generovanie obrázkov • Zvuk • Zmena hodnotenia • 100 % TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Bezplatný poskytovateľ AI pre vašich obľúbených kódovacích agentov

_Pripojte akýkoľvek nástroj IDE alebo CLI poháňaný AI cez OmniRoute – bezplatnú bránu API pre neobmedzené kódovanie._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
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

<sub>📡 Všetci agenti sa pripájajú cez <code>http://localhost:20128/v1</code> alebo <code>http://cloud.omniroute one/v1 modely a kvóta</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

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
- ✅ **Viaceré účty** - Obojstranne medzi účtami na poskytovateľa
- ✅ **Universal** - Funguje s Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, akýmkoľvek nástrojom CLI

---

## 📧 Podpora

> 💬 **Pripojte sa k našej komunite!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Získajte pomoc, zdieľajte tipy a buďte informovaní.

- **Web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Pôvodný projekt**: [9router by decolua](https://github.com/decolua/9router)

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
<summary><b>💸 1. „Platím za drahé predplatné, ale stále ma prerušujú limity“ </b></summary>

Vývojári platia za Claude Pro, Codex Pro alebo GitHub Copilot 20 – 200 dolárov mesačne. Aj pri platení má kvóta strop – 5 hodín používania, týždenné limity alebo limity za minútu. Počas relácie kódovania poskytovateľ prestane reagovať a vývojár stráca tok a produktivitu.

**Ako to rieši OmniRoute:**

- **Inteligentný 4-úrovňový záložný systém** – Ak sa vyčerpá kvóta predplatného, automaticky sa presmeruje na kľúč API → Lacné → Zadarmo s nulovým manuálnym zásahom
- **Sledovanie kvóty v reálnom čase** – Zobrazuje spotrebu tokenov v reálnom čase s resetovaným odpočítavaním (5 hodín, denne, týždenne)
  – **Podpora viacerých účtov** – Viacero účtov na poskytovateľa s automatickým opakovaním – keď sa jeden minie, prepne sa na ďalší
  – **Vlastné kombá** – Prispôsobiteľné záložné reťazce so 6 stratégiami vyvažovania (najskôr vyplniť, opakovane, P2C, náhodné, najmenej používané, nákladovo optimalizované)
- **Codex Business Quotas** — Monitorovanie kvót pracovného priestoru pre firmy/tím priamo na paneli

</details>

<details>
<summary><b>🔌 2. „Potrebujem použiť viacerých poskytovateľov, ale každý má iné API“ </b></summary>

OpenAI používa jeden formát, Claude (Anthropic) iný a Gemini ďalší. Ak chce vývojár testovať modely od rôznych poskytovateľov alebo medzi nimi záložné riešenie, musí prekonfigurovať súpravy SDK, zmeniť koncové body, vysporiadať sa s nekompatibilnými formátmi. Vlastní poskytovatelia (FriendLI, NIM) majú neštandardné modelové koncové body.

**Ako to rieši OmniRoute:**

- **Unified Endpoint** – Jediný `http://localhost:20128/v1` slúži ako proxy pre všetkých 36+ poskytovateľov
- **Formátový preklad** — Automatický a transparentný: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
  – **Dezinfekcia odozvy** – Odstráni neštandardné polia (`x_groq`, `usage_breakdown`, `service_tier`), ktoré porušujú OpenAI SDK v1.83+
- **Normalizácia rolí** – Konvertuje `developer` → `system` pre poskytovateľov, ktorí nie sú OpenAI; `system` → `user` pre GLM/ERNIE
  – **Think Tag Extraction** – Extrahuje bloky `<think>` z modelov ako DeepSeek R1 do štandardizovaných `reasoning_content`
- **Štruktúrovaný výstup pre Gemini** — `json_schema` → automatická konverzia `responseMimeType`/`responseSchema`
- **`stream` predvolene je `false`** — Zosúladí sa so špecifikáciou OpenAI, čím sa zabráni neočakávanému SSE v súpravách Python/Rust/Go SDK

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

</details>

<details>
<summary><b>🆓 4. „Chcem použiť AI na kódovanie, ale nemám peniaze“</b></summary>

Nie každý môže platiť 20 – 200 $ mesačne za predplatné AI. Študenti, vývojári z rozvíjajúcich sa krajín, fanúšikovia a nezávislí pracovníci potrebujú prístup ku kvalitným modelom za nulové náklady.

**Ako to rieši OmniRoute:**

- **Zabudovaní poskytovatelia bezplatnej úrovne** — Natívna podpora pre 100 % bezplatných poskytovateľov: iFlow (8 neobmedzených modelov), Qwen (3 neobmedzené modely), Kiro (Claude zdarma), Gemini CLI (180 000/mesiac zdarma)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Len bezplatné kombá** — Reťaz `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/mesiac s nulovými prestojmi
- **Bezplatné kredity NVIDIA NIM** – integrovaných 1 000 bezplatných kreditov
- **Cost Optimized Strategy** – Stratégia smerovania, ktorá automaticky vyberie najlacnejšieho dostupného poskytovateľa

</details>

<details>
<summary><b>🔒 5. „Potrebujem chrániť svoju bránu AI pred neoprávneným prístupom“</b></summary>

Pri vystavení brány AI do siete (LAN, VPS, Docker) môže ktokoľvek s adresou spotrebovať tokeny/kvótu vývojára. Bez ochrany sú rozhrania API náchylné na nesprávne použitie, rýchle vloženie a zneužitie.

**Ako to rieši OmniRoute:**

– **Správa kľúčov API** – Generovanie, rotácia a rozsah podľa poskytovateľa s vyhradenou stránkou `/dashboard/api-manager`
– **Povolenia na úrovni modelu** – Obmedzenie kľúčov API na konkrétne modely (`openai/*`, vzory zástupných znakov) s prepínačom Povoliť všetko/Obmedziť
– **API Endpoint Protection** – Vyžadovať kľúč pre `/v1/models` a blokovať konkrétnych poskytovateľov zo zoznamu

- **Auth Guard + ochrana CSRF** - Všetky trasy na dashboarde sú chránené middlevérom `withAuth` + tokenmi CSRF
- **Rate Limiter** — Obmedzenie rýchlosti na IP pomocou konfigurovateľných okien
- **IP Filtering** — Zoznam povolených/blokovaných pre riadenie prístupu
- **Prompt Injection Guard** – Dezinfekcia proti škodlivým vzorom výzvy
- **Šifrovanie AES-256-GCM** — Prihlasovacie údaje sú v pokoji zašifrované

</details>

<details>
<summary><b>🛑 6. „Môj poskytovateľ zlyhal a stratil som tok kódovania“</b></summary>

Poskytovatelia AI sa môžu stať nestabilnými, vrátiť chyby 5xx alebo dosiahnuť dočasné limity sadzieb. Ak vývojár závisí od jedného poskytovateľa, bude prerušený. Bez ističov môžu opakované pokusy zlyhať aplikáciu.

**Ako to rieši OmniRoute:**

- **Istič pre každého poskytovateľa** — Automatické otváranie/zatváranie s konfigurovateľnými prahmi a chladením (zatvorené/otvorené/polootvorené)
- **Exponenciálne stiahnutie** — Postupné oneskorenie opakovania
- **Anti-Thundering Herd** - ochrana Mutex + semafor proti súbežným opakovaným búrkam
- **Combo Fallback Chains** – Ak primárny poskytovateľ zlyhá, automaticky prepadne reťazcom bez akéhokoľvek zásahu
- **Combo Circuit Breaker** – Automaticky deaktivuje zlyhávajúcich poskytovateľov v rámci kombinovaného reťazca
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
  – **Health Dashboard** – Monitorovanie dostupnosti, stavy ističov, blokovania, štatistiky vyrovnávacej pamäte, latencia p50/p95/p99

</details>

<details>
<summary><b>🔧 7. „Konfigurácia každého nástroja AI je únavná a opakovaná“ </b></summary>

Vývojári používajú Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Každý nástroj potrebuje inú konfiguráciu (API endpoint, kľúč, model). Prekonfigurovanie pri zmene poskytovateľa alebo modelu je strata času.

**Ako to rieši OmniRoute:**

- **CLI Tools Dashboard** – Vyhradená stránka s nastavením jedným kliknutím pre Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
  – **GitHub Copilot Config Generator** – Generuje `chatLanguageModels.json` pre kód VS s hromadným výberom modelu
- **Sprievodca registráciou** – Sprievodca nastavením v 4 krokoch pre začínajúcich používateľov
  – **Jeden koncový bod, všetky modely** – Nakonfigurujte `http://localhost:20128/v1` raz a získajte prístup k viac ako 36 poskytovateľom

</details>

<details>
<summary><b>🔑 8. „Správa tokenov OAuth od viacerých poskytovateľov je peklo“ </b></summary>

Claude Code, Codex, Gemini CLI, Copilot – všetky používajú OAuth 2.0 s tokenmi, ktorých platnosť sa končí. Vývojári sa musia neustále znovu overovať, riešiť `client_secret is missing`, `redirect_uri_mismatch` a zlyhania na vzdialených serveroch. Obzvlášť problematické je OAuth na LAN/VPS.

**Ako to rieši OmniRoute:**

- **Automatická obnova tokenov** – Tokeny OAuth sa pred vypršaním platnosti obnovujú na pozadí
- **Vstavaný OAuth 2.0 (PKCE)** – Automatický tok pre Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
  – **Multi-Auth OAuth** – Viaceré účty na poskytovateľa prostredníctvom extrakcie tokenov JWT/ID
- **Oprava OAuth LAN/Remote** — Detekcia súkromnej adresy IP pre `redirect_uri` + manuálny režim adresy URL pre vzdialené servery
- **OAuth Behind Nginx** - Používa `window.location.origin` na reverznú kompatibilitu proxy
  – **Príručka vzdialeného OAuth** – Podrobný sprievodca povereniami Google Cloud na VPS/Docker

</details>

<details>
<summary><b>📊 9. "Neviem, koľko míňam alebo kde" </b></summary>

Vývojári využívajú viacerých platených poskytovateľov, ale nemajú jednotný pohľad na výdavky. Každý poskytovateľ má svoj vlastný informačný panel fakturácie, ale neexistuje žiadne konsolidované zobrazenie. Neočakávané náklady sa môžu nahromadiť.

**Ako to rieši OmniRoute:**

– **Informačný panel analýzy nákladov** – sledovanie nákladov na token a správa rozpočtu podľa poskytovateľa

- **Obmedzenia rozpočtu na úroveň** – Strop výdavkov na úroveň, ktorý spúšťa automatické záložné právo
- **Konfigurácia cien za model** – Konfigurovateľné ceny za model
- **Štatistiky používania na kľúč API** – Počet žiadostí a časová pečiatka posledného použitia na kľúč
  – **Panel Analytics** – štatistické karty, graf používania modelu, tabuľka poskytovateľov s mierami úspešnosti a latenciou

</details>

<details>
<summary><b>🐛 10. „Nedokážem diagnostikovať chyby a problémy vo volaniach AI“ </b></summary>

Keď hovor zlyhá, vývojár nevie, či to bol limit sadzby, vypršaný token, nesprávny formát alebo chyba poskytovateľa. Fragmentované protokoly cez rôzne terminály. Bez pozorovateľnosti je ladenie metódou pokus-omyl.

**Ako to rieši OmniRoute:**

– **Panel jednotných protokolov** – 4 karty: Protokoly žiadostí, Protokoly proxy, Protokoly auditu, Konzola

- **Console Log Viewer** — Prehliadač v štýle terminálu v reálnom čase s farebne odlíšenými úrovňami, automatickým posúvaním, vyhľadávaním a filtrovaním
- **Proxy protokoly SQLite** — Trvalé protokoly, ktoré prežijú reštart servera
- **Translator Playground** – 4 režimy ladenia: Playground (preklad formátu), Chat Tester (spiatočný), Test Bench (dávka), Live Monitor (v reálnom čase)
  – **Požiadať o telemetriu** – latencia p50/p95/p99 + sledovanie X-request-Id
  – **Protokolovanie založené na súboroch s rotáciou** – Konzolový zachytávač zachytáva všetko do protokolu JSON s rotáciou na základe veľkosti

</details>

<details>
<summary><b>🏗️ 11. „Nasadenie a údržba brány je zložitá“ </b></summary>

Inštalácia, konfigurácia a údržba AI proxy v rôznych prostrediach (lokálne, VPS, Docker, cloud) je náročná na prácu. Problémy ako pevne zakódované cesty, `EACCES` v adresároch, konflikty portov a zostavy naprieč platformami zvyšujú trenie.

**Ako to rieši OmniRoute:**

- **Globálna inštalácia npm** — `npm install -g omniroute && omniroute` — hotovo
- **Docker Multi-Platform** – natívne AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profily Docker Compose** — `base` (bez nástrojov CLI) a `cli` (s Claude Code, Codex, OpenClaw)
- **Electron Desktop App** – natívna aplikácia pre Windows/macOS/Linux so systémovou lištou, automatickým spustením, offline režimom
- **Split-Port Mode** – API a Dashboard na samostatných portoch pre pokročilé scenáre (reverzný proxy, kontajnerová sieť)
- **Cloud Sync** — Synchronizácia konfigurácie medzi zariadeniami cez Cloudflare Workers
- **DB Backups** — Automatické zálohovanie, obnovenie, export a import všetkých nastavení

</details>

<details>
<summary><b>🌍 12. „Rozhranie je len v angličtine a môj tím nehovorí po anglicky“ </b></summary>

Tímy v neanglicky hovoriacich krajinách, najmä v Latinskej Amerike, Ázii a Európe, zápasia s rozhraním iba v angličtine. Jazykové bariéry znižujú prijatie a zvyšujú chyby v konfigurácii.

**Ako to rieši OmniRoute:**

- **Dashboard i18n — 30 jazykov** — Všetkých 500+ kláves preložených vrátane arabčiny, bulharčiny, dánčiny, nemčiny, španielčiny, fínčiny, francúzštiny, hebrejčiny, hindčiny, maďarčiny, indonézštiny, taliančiny, japončiny, kórejčiny, malajčiny, holandčiny, nórčiny, poľštiny, portugalčiny (PT/BR), rumunčiny, ruštiny, slovenčiny, švédčiny, thajčiny, ukrajinčiny, vietnamčiny, angličtiny
- **Podpora RTL** — Podpora sprava doľava pre arabčinu a hebrejčinu
- **Viacjazyčné README** — 30 kompletných prekladov dokumentácie
- **Language Selector** – ikona zemegule v hlavičke pre prepínanie v reálnom čase

</details>

<details>
<summary><b>🔄 13. „Potrebujem viac ako chat – potrebujem vloženie, obrázky, zvuk“</b></summary>

AI nie je len dokončenie chatu. Vývojári potrebujú generovať obrázky, prepisovať zvuk, vytvárať vloženia pre RAG, meniť hodnotenie dokumentov a moderovať obsah. Každé API má iný koncový bod a formát.

**Ako to rieši OmniRoute:**

- **Vloženie** — `/v1/embeddings` so 6 poskytovateľmi a 9+ modelmi
- **Generácia obrazu** — `/v1/images/generations` s 10 poskytovateľmi a 20+ modelmi (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) a SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Prepis zvuku** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT a + existujúci poskytovatelia
- **Moderácie** — `/v1/moderations` — Kontroly bezpečnosti obsahu
- **Zmena poradia** — `/v1/rerank` — Zmena poradia relevantnosti dokumentu
- **Responses API** – plná podpora `/v1/responses` pre kódex

</details>

<details>
<summary><b>🧪 14. „Nemám možnosť testovať a porovnávať kvalitu medzi modelmi“ </b></summary>

Vývojári chcú vedieť, ktorý model je pre ich prípad použitia najlepší – kód, preklad, zdôvodnenie – ale manuálne porovnávanie je pomalé. Neexistujú žiadne integrované nástroje hodnotenia.

**Ako to rieši OmniRoute:**

- **Hodnotenia LLM** – testovanie zlatej sady s 10 predinštalovanými prípadmi zahŕňajúcimi pozdravy, matematiku, geografiu, generovanie kódu, súlad s JSON, preklad, označenie, odmietnutie bezpečnosti
- **4 stratégie zhody** — `exact`, `contains`, `regex`, `custom` (funkcia JS)
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
- **Wildcard Router** — Vzory `provider/*` smerujú dynamicky k akémukoľvek poskytovateľovi
- **Prepínač povoliť/zakázať kombo** — Prepínajte kombinácie priamo z ovládacieho panela
- **Provider Toggle** — Povolenie/zakázanie všetkých pripojení pre poskytovateľa jedným kliknutím
  – **Blokovaní poskytovatelia** – vylúčte konkrétnych poskytovateľov zo zoznamu `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Potrebujem nástroje MCP ako prvotriedne možnosti produktu"</b></summary>

Mnohé brány AI odhaľujú MCP iba ako skrytý detail implementácie. Tímy potrebujú viditeľnú a spravovateľnú operačnú vrstvu.

**Ako to rieši OmniRoute:**

- MCP sa zobrazí na navigačnom paneli a na karte protokolu koncového bodu
- Vyhradená stránka správy MCP s procesmi, nástrojmi, rozsahmi a auditom
- Vstavaný rýchly štart pre `omniroute --mcp` a registráciu klienta

</details>

<details>
<summary><b>🧠 18. "Potrebujem orchestráciu A2A s cestami synchronizácie + streamovania"</b></summary>

Pracovné postupy agentov vyžadujú priame odpovede a dlhotrvajúce streamované vykonávanie s kontrolou životného cyklu.

**Ako to rieši OmniRoute:**

- Koncový bod A2A JSON-RPC (`POST /a2a`) s `message/send` a `message/stream`
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
<summary><b>📋 20. "Potrebujem auditovateľné spustenie nástroja MCP" </b></summary>

Keď nástroje mutujú konfiguráciu alebo spúšťajú akcie operácií, tímy potrebujú forenznú sledovateľnosť.

**Ako to rieši OmniRoute:**

- Záznamy auditu podporované SQLite pre volania nástrojov MCP
- Filtre podľa nástroja, úspechu/neúspechu, kľúča API a stránkovania
- Tabuľka auditu palubnej dosky + štatistické koncové body pre automatizáciu

</details>

<details>
<summary><b>🔐 21. "Potrebujem povolenia MCP v rozsahu na jednu integráciu"</b></summary>

Rôzni klienti by mali mať najmenej privilegovaný prístup ku kategóriám nástrojov.

**Ako to rieši OmniRoute:**

- 9 zrnitých rozsahov MCP pre kontrolovaný prístup k nástrojom
- Presadzovanie rozsahu a viditeľnosť v používateľskom rozhraní správy MCP
- Bezpečná východisková poloha pre prevádzkové nástroje

</details>

<details>
<summary><b>⚙️ 22. „Potrebujem prevádzkové ovládacie prvky bez premiestňovania“ </b></summary>

Tímy potrebujú rýchle zmeny runtime počas incidentov alebo nákladových udalostí.

**Ako to rieši OmniRoute:**

- Aktivácia komba prepínača priamo z ovládacieho panela MCP
- Použite profily odolnosti z preddefinovaných balíkov politík
- Resetujte stav ističa z rovnakého ovládacieho panela

</details>

<details>
<summary><b>🔄 23. „Potrebujem viditeľnosť a zrušenie životného cyklu úlohy A2A“ </b></summary>

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
<summary><b>🪪 25. "Potrebujem štandardné vyhľadávanie agentov pre klientov"</b></summary>

Externí klienti a orchestrátori potrebujú strojovo čitateľné metadáta na integráciu.

**Ako to rieši OmniRoute:**

- Karta agenta vystavená na `/.well-known/agent.json`
- Schopnosti a zručnosti zobrazené v používateľskom rozhraní správy
- API stavu A2A obsahuje metaúdaje zisťovania pre automatizáciu

</details>

<details>
<summary><b>🧭 26. "Potrebujem zistiteľnosť protokolu v UX produktu"</b></summary>

Ak používatelia nemôžu objaviť povrchy protokolov, kvalita prijatia a podpory klesá.

**Ako to rieši OmniRoute:**

- Položky na bočnom paneli pre MCP a A2A
- Koncový bod Karta Protokoly s rýchlym spustením a stavom
- Odkazy z prehľadu na špecializované riadiace panely

</details>

<details>
<summary><b>🧪 27. "Potrebujem komplexné overenie protokolu so skutočnými klientmi" </b></summary>

Falošné testy nestačia na overenie kompatibility protokolu pred vydaním.

**Ako to rieši OmniRoute:**

- E2E balík, ktorý spúšťa aplikáciu a využíva skutočný prenos klienta MCP SDK
- Klient A2A testuje toky zisťovania, odosielania, streamovania, získavania a rušenia
- Krížová kontrola tvrdení proti auditu MCP a API úloh A2A

</details>

<details>
<summary><b>📡 28. „Potrebujem jednotnú pozorovateľnosť naprieč všetkými rozhraniami“ </b></summary>

Rozdelenie pozorovateľnosti podľa protokolu vytvára slepé miesta a dlhšie MTTR.

**Ako to rieši OmniRoute:**

- Zjednotené informačné panely / protokoly / analýzy v jednom produkte
- Zdravie + audit + telemetria požiadaviek cez vrstvy OpenAI, MCP a A2A
- Operačné API pre stav a automatizáciu

</details>

<details>
<summary><b>💼 29. "Potrebujem jeden runtime pre proxy + nástroje + orchestráciu agentov" </b></summary>

Prevádzka mnohých samostatných služieb zvyšuje prevádzkové náklady a spôsoby zlyhania.

**Ako to rieši OmniRoute:**

- Proxy, server MCP a server A2A kompatibilný s OpenAI v jednom zásobníku
- Zdieľaná autentifikácia, odolnosť, ukladanie údajov a pozorovateľnosť
- Konzistentný model politiky na všetkých interakčných plochách

</details>

<details>
<summary><b>🚀 30. „Potrebujem odoslať agentské pracovné postupy bez roztiahnutia kódu lepidla“ </b></summary>

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
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Rýchly štart

**1. Inštalovať globálne:**

```bash
npm install -g omniroute
omniroute
```

🎉 Dashboard sa otvára o `http://localhost:20128`

| Príkaz                  | Popis                                  |
| ----------------------- | -------------------------------------- |
| `omniroute`             | Spustiť server (predvolený port 20128) |
| `omniroute --port 3000` | Použiť vlastný port                    |
| `omniroute --no-open`   | Neotvárať automaticky prehliadač       |
| `omniroute --help`      | Zobraziť pomoc                         |

**2. Pripojte BEZPLATNÉHO poskytovateľa:**

Dashboard → Poskytovatelia → Pripojiť **Claude Code** alebo **Antigravity** → Prihlásenie OAuth → Hotovo!

**3. Použitie v nástroji CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**To je všetko!** Začnite kódovať s modelmi AI ZDARMA.

**Alternatíva – spustiť zo zdroja:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
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

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Prehľad cien

| Úroveň            | Poskytovateľ      | Náklady                     | Obnovenie kvóty              | Najlepšie pre               |
| ----------------- | ----------------- | --------------------------- | ---------------------------- | --------------------------- |
| **💳 PREDPLATNÉ** | Claude Code (Pro) | 20 USD/mesiac               | 5h + týždenne                | Už prihlásené               |
|                   | Codex (Plus/Pro)  | 20 – 200 USD/mesiac         | 5h + týždenne                | Používatelia OpenAI         |
|                   | Gemini CLI        | **ZADARMO**                 | 180 tis./mesiac + 1 tis./deň | Všetci!                     |
|                   | GitHub Copilot    | 10 – 19 USD/mes.            | Mesačne                      | Používatelia GitHubu        |
| **🔑 API KEY**    | NVIDIA NIM        | **ZADARMO** (1000 kreditov) | Jednorazovo                  | Bezplatné testovanie úrovní |
|                   | DeepSeek          | Platba za použitie          | Žiadne                       | Najlepšia cena/kvalita      |
|                   | Groq              | Voľná ​​úroveň + platené    | Obmedzená sadzba             | Ultra-rýchle odvodenie      |
|                   | xAI (Grok)        | Platba za použitie          | Žiadne                       | Modely Grok                 |
|                   | Mistral           | Voľná ​​úroveň + platené    | Obmedzená sadzba             | Európska AI                 |
|                   | OpenRouter        | Platba za použitie          | Žiadne                       | 100+ modelov                |
| **💰 LACNO**      | GLM-4,7           | 0,6 USD/1 milión            | Denne 10:00                  | Záloha rozpočtu             |
|                   | MiniMax M2.1      | 0,2 USD/1 milión            | 5-hodinové valcovanie        | Najlacnejšia možnosť        |
|                   | Kimi K2           | 9 USD/mesiac byt            | 10 miliónov tokenov/mesiac   | Predvídateľné náklady       |
| **🆓 ZDARMA**     | iFlow             | 0 USD                       | Neobmedzené                  | 8 modelov zadarmo           |
|                   | Qwen              | 0 USD                       | Neobmedzené                  | 3 modely zadarmo            |
|                   | Kiro              | 0 USD                       | Neobmedzené                  | Claude zadarmo              |

**💡 Tip pre profesionálov:** Začnite s kombináciou Gemini CLI (180 000 zadarmo/mesiac) + iFlow (neobmedzene zadarmo) = cena 0 $!

---

## 💡 Kľúčové vlastnosti

### 🧠 Základné smerovanie a inteligencia

| Funkcia                                       | Čo to robí                                                                                      |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 🎯 **Inteligentná 4-úrovňová núdzová záloha** | Automatická trasa: Predplatné → Kľúč API → Lacné → Zadarmo                                      |
| 📊 **Sledovanie kvóty v reálnom čase**        | Živý počet tokenov + reset odpočítavania na poskytovateľa                                       |
| 🔄 **Formátový preklad**                      | OpenAI ↔ Claude ↔ Gemini ↔ Kurzor ↔ Kiro bezšvové + dezinfekcia                                 |
| 👥 **Podpora viacerých účtov**                | Viac účtov na poskytovateľa s inteligentným výberom                                             |
| 🔄 **Automatická obnova tokenov**             | Tokeny OAuth sa automaticky obnovia s opätovným pokusom                                         |
| 🎨 **Vlastné kombá**                          | 6 stratégií: fill-first, round-robin, p2c, random, najmenej používané, nákladovo optimalizované |
| 🧩 **Vlastné modely**                         | Pridajte akékoľvek ID modelu k akémukoľvek poskytovateľovi                                      |
| 🌐 **Wildcard Router**                        | Dynamicky smerujte vzory `provider/*` k akémukoľvek poskytovateľovi                             |
| 🧠 **Premýšľajúci rozpočet**                  | Priechodný, automatický, vlastný a adaptívny režim pre modely uvažovania                        |
| 🔀 **Model Aliases**                          | Auto-forward deprecated model IDs to current replacements (built-in + custom)                   |
| ⚡ **Background Degradation**                 | Auto-route background tasks (titles, summaries) to cheaper models                               |
| 💬 **Promptné vstrekovanie systému**          | Globálna systémová výzva aplikovaná na všetky požiadavky                                        |
| 📄 **Responses API**                          | Plná podpora OpenAI Responses API (`/v1/responses`) pre Codex                                   |

### 🎵 Multimodálne API

| Funkcia                     | Čo to robí                                                                                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generovanie obrázkov** | `/v1/images/generations` — 4 poskytovatelia, 9+ modelov                                                                                                                    |
| 📐 **Vloženie**             | `/v1/embeddings` — 6 poskytovateľov, 9+ modelov                                                                                                                            |
| 🎤 **Prepis zvuku**         | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Prevod textu na reč**  | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderovania**          | `/v1/moderations` — Kontroly bezpečnosti obsahu                                                                                                                            |
| 🔀 **Reranking**            | `/v1/rerank` — Zmena poradia relevantnosti dokumentu                                                                                                                       |

### 🛡️ Odolnosť a bezpečnosť

| Funkcia                               | Čo to robí                                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🔌 **Istič**                          | Automatické otváranie/zatváranie podľa poskytovateľa s konfigurovateľnými prahmi                           |
| 🛡️ **Anti-hromové stádo**             | Mutex + limit rýchlosti semaforu pre poskytovateľov kľúčov API                                             |
| 🧠 **Sémantická vyrovnávacia pamäť**  | Dvojvrstvová vyrovnávacia pamäť (podpis + sémantika) znižuje náklady a latenciu                            |
| ⚡ **Požiadajte o idempotenciu**      | 5-sekundové okno na odstránenie duplicitných požiadaviek                                                   |
| 🔒 ** Spoofing odtlačkov prstov TLS** | Obíďte detekciu botov na báze TLS cez wreq-js                                                              |
| 🌐 **Filtrovanie IP**                 | Zoznam povolených/blokovaných pre riadenie prístupu API                                                    |
| 📊 **Upraviteľné limity sadzieb**     | Konfigurovateľné otáčky za minútu, minimálna medzera a maximálna súbežná rýchlosť na systémovej úrovni     |
| 💾 **Rate Limit Persistence**         | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness                               |
| 🔄 **Token Refresh Resilience**       | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                                     |
| 🛡 **API Endpoint Protection**        | Auth gating + blokovanie poskytovateľa pre koncový bod `/models`                                           |
| 🔒 **Viditeľnosť proxy**              | Farebne rozlíšené odznaky: 🟢 globálne, 🟡 poskytovateľ, 🔵 na pripojenie s IP displejom                   |
| 🌐 **3-úrovňová konfigurácia proxy**  | Nakonfigurujte proxy na globálnej úrovni, na úrovni jednotlivých poskytovateľov alebo na úrovni pripojenia |

### 📊 Pozorovateľnosť a analytika

| Funkcia                                    | Čo to robí                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 📝 **Požiadať o prihlásenie**              | Režim ladenia s úplnými protokolmi požiadaviek/odpovedí                                               |
| 💾 **Proxy protokoly SQLite**              | Trvalé protokoly proxy prežijú reštart servera                                                        |
| 📊 **Hlavný panel služby Analytics**       | Poháňané recharts: štatistické karty, graf používania modelu, tabuľka poskytovateľov                  |
| 📈 **Sledovanie pokroku**                  | Prihlásiť udalosti priebehu SSE pre streamovanie                                                      |
| 🧪 **Hodnotenia LLM**                      | Testovanie zlatého setu so 4 stratégiami zápasu                                                       |
| 🔍 **Požiadať o telemetriu**               | p50/p95/p99 agregácia latencie + sledovanie X-request-Id                                              |
| 📋 **Hlavný panel denníkov**               | Jednotná 4-kartová stránka: Protokoly požiadaviek, Protokoly proxy, Protokoly auditu, Konzola         |
| 🖥️ **Prehliadač denníka konzoly**          | Prehliadač v terminálovom štýle v reálnom čase s filtrom úrovní, vyhľadávaním, automatickým posúvaním |
| 📑 **Protokolovanie založené na súboroch** | Konzolový zachytávač zachytáva všetok výstup do súboru protokolu JSON s rotáciou                      |
| 🏥 **Panel zdravia**                       | Doba prevádzky systému, stavy ističov, uzamknutia, štatistiky vyrovnávacej pamäte                     |
| 💰 **Sledovanie nákladov**                 | Správa rozpočtu + konfigurácia cien podľa modelu                                                      |

### ☁️ Nasadenie a synchronizácia

| Funkcia                        | Čo to robí                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**              | Synchronizujte konfiguráciu medzi zariadeniami cez Cloudflare Workers           |
| 🌐 **Nasadenie kdekoľvek**     | Localhost, VPS, Docker, Cloudflare Workers                                      |
| 🔑 **Správa kľúčov API**       | Generovanie, rotácia a rozsah kľúčov API podľa poskytovateľa                    |
| 🧙 **Sprievodca onboardingom** | 4-krokové vedené nastavenie pre začínajúcich používateľov                       |
| 🔧 **CLI Tools Dashboard**     | Konfigurácia Claude, Codex, Cline, OpenClaw, Kilo, Antigravity jedným kliknutím |
| 🔄 **Zálohy DB**               | Automatické zálohovanie, obnovenie, export a import všetkých nastavení          |
| 🌐 **Internacionalizácia**     | Plný i18n s next-intl — podpora angličtiny + portugalčiny (Brazília)            |
| 🌍 **Výber jazyka**            | Ikona zemegule v hlavičke na prepínanie jazyka v reálnom čase (🇺🇸/🇧🇷)           |
| 📂 **Custom Data Directory**   | `DATA_DIR` env var na prepísanie predvolenej cesty úložiska `~/.omniroute`      |

<details>
<summary><b>📖 Podrobnosti funkcie</b></summary>

### 🎯 Inteligentná 4-úrovňová núdzová záloha

Vytvorte kombá s automatickým núdzovým nastavením:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Sledovanie kvóty v reálnom čase

- Spotreba tokenov na poskytovateľa
- Vynulovať odpočítavanie (5 hodín, denne, týždenne)
- Odhad nákladov pre platené úrovne
- Mesačné správy o výdavkoch

### 🔄 Preklad formátu

Bezproblémový preklad medzi formátmi:

– **OpenAI** ↔ **Claude** ↔ **Blíženci** ↔ **Odpovede OpenAI**

- Váš nástroj CLI odošle formát OpenAI → OmniRoute preloží → Poskytovateľ dostane natívny formát
- Funguje s akýmkoľvek nástrojom, ktorý podporuje vlastné koncové body OpenAI
- **Dezinfekcia odozvy** – Odstráni neštandardné polia pre prísnu kompatibilitu OpenAI SDK
- **Normalizácia rolí** — `developer` → `system` pre iné ako OpenAI; `system` → `user` pre modely GLM/ERNIE
- **Extrahovanie značiek myslenia** — `<think>` bloky → `reasoning_content` pre modely myslenia
- **Štruktúrovaný výstup** — `json_schema` → Gemini's `responseMimeType`/`responseSchema`

### 👥 Podpora viacerých účtov

- Pridajte viac účtov na poskytovateľa
- Automatické cyklické alebo prioritné smerovanie
- Návrat k ďalšiemu účtu, keď jeden dosiahne kvótu

### 🔄 Automatické obnovenie tokenu

- Tokeny OAuth sa pred vypršaním platnosti automaticky obnovujú
- Nie je potrebné manuálne opätovné overenie
- Bezproblémové skúsenosti u všetkých poskytovateľov

### 🎨 Vlastné kombinácie

- Vytvárajte neobmedzené kombinácie modelov
- 6 stratégií: vyplňte najskôr, cyklicky, sila dvoch možností, náhodné, najmenej používané, nákladovo optimalizované
- Zdieľajte kombinácie medzi zariadeniami pomocou synchronizácie cloudu

### 🏥 Panel zdravia

- Stav systému (čas prevádzky, verzia, využitie pamäte)
- Stavy ističov podľa poskytovateľa (zatvorené/otvorené/polootvorené)
- Stav limitu sadzby a aktívne blokovania
- Štatistika vyrovnávacej pamäte podpisov
- Telemetria latencie (p50/p95/p99) + prompt cache
- Obnovte zdravotný stav jedným kliknutím

### 🔧 Ihrisko pre prekladateľov

OmniRoute obsahuje výkonné vstavané ihrisko pre prekladateľov so **4 režimami** na ladenie, testovanie a monitorovanie prekladov API:

| Režim                    | Popis                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Ihrisko**           | Priamy preklad formátu — vložte ľubovoľné telo požiadavky API a okamžite uvidíte, ako ju OmniRoute preloží medzi formátmi poskytovateľov (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Zahŕňa vzorové šablóny a automatickú detekciu formátu. |
| **💬 Tester chatu**      | Pošlite skutočné žiadosti o rozhovor cez OmniRoute a pozrite si celý spiatočný výlet: svoj vstup, preloženú žiadosť, odpoveď poskytovateľa a preloženú odpoveď späť. Neoceniteľné pre overenie kombinovaného smerovania.                    |
| **🧪 Testovacia lavica** | Režim dávkového testovania – definujte viacero testovacích prípadov s rôznymi vstupmi a očakávanými výstupmi, spustite ich všetky naraz a porovnajte výsledky medzi poskytovateľmi a modelmi.                                               |
| **📱 Živý monitor**      | Monitorovanie požiadaviek v reálnom čase – sledujte prichádzajúce požiadavky, ako prechádzajú cez OmniRoute, sledujte, ako prebiehajú preklady formátu naživo, a okamžite identifikujte problémy.                                           |

**Prístup:** Hlavný panel → Prekladač (bočný panel)

### 💾 Cloud Sync

- Synchronizujte poskytovateľov, kombinácie a nastavenia medzi zariadeniami
- Automatická synchronizácia na pozadí
- Bezpečné šifrované úložisko

</details>

## 🧪 Hodnotenia (Evals)

OmniRoute obsahuje vstavaný hodnotiaci rámec na testovanie kvality odozvy LLM oproti zlatému súboru. Prístup k nej získate cez **Analytics → Evals** na hlavnom paneli.

### Vstavaná zlatá súprava

Predinštalovaná sada „OmniRoute Golden Set“ obsahuje 10 testovacích prípadov, ktoré zahŕňajú:

- Pozdravy, matematika, geografia, generovanie kódu
- Súlad s formátom JSON, preklad, zníženie
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

### Kopilot GitHub

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

### NVIDIA NIM (1 000 kreditov ZDARMA!)

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
   - API kľúč: `your-key`

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

### iFlow (8 modelov ZDARMA)

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

### Qwen (3 modely ZDARMA)

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

**Palubná doska sa otvára na nesprávnom porte**

- Nastavte `PORT=20128` a `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Chyby synchronizácie v cloude**

- Overte `BASE_URL` body na vašu spustenú inštanciu
  – Overte `CLOUD_URL` bodov k očakávanému koncovému bodu cloudu
- Ponechajte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na strane servera

**Prvé prihlásenie nefunguje**

- Skontrolujte `INITIAL_PASSWORD` v `.env`
  – Ak nie je nastavené, záložné heslo je `123456`

**Žiadne záznamy žiadostí**

- Nastaviť `ENABLE_REQUEST_LOGS=true` v `.env`

**Test pripojenia ukazuje „Neplatné“ pre poskytovateľov kompatibilných s OpenAI**

- Mnohí poskytovatelia nevystavujú koncový bod `/models`
- OmniRoute v1.0.6+ zahŕňa záložné overenie prostredníctvom dokončenia chatu
- Uistite sa, že základná adresa URL obsahuje príponu `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ DÔLEŽITÉ pre používateľov s OmniRoute a diaľkovým ovládaním VPS/Docker/servidor**

### OAuth

Osvedčuje **Antigravity** a **Gemini CLI** používame **Google OAuth 2.0** ako autentifikáciu. O Google exige que a `redirect_uri` usada no fluxo OAuth saja **exatamente** uma das URI pre-kadastradas no Google Cloud Console to use.

Ako credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. K dispozícii máte prístup k OmniRoute k vzdialenému servisu (napr.: `https://omniroute.meuservidor.com`), alebo k autenticite spoločnosti Google:

```
Error 400: redirect_uri_mismatch
```

### Riešenie: Konfigurácia proprias poverenia OAuth

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

Agora alebo Google presmerovaný korretamente pre `https://seu-servidor.com/callback` a autentické funkcie.

---

### Alternatívne dočasné riešenie (sem configurar credenciais próprias)

Ak chcete získať prístup k dôvere, môžete použiť **príručku URL**:

1. O OmniRoute abrirá a URL autorização Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **Skopírujte úplnú webovú adresu** da barra de endereço do seu browser (mesmo que a pagina não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kliknite na **"Pripojiť"**

> Toto riešenie funguje pomocou autorizačného kódu na adrese URL a nezávislého presmerovania.

</details>

---

## 🛠️

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ nie je **podporovaný** — `better-sqlite3` natívne binárne súbory sú nekompatibilné)
  – **Jazyk**: TypeScript 5.9 — **100 % TypeScript** v `src/` a `open-sse/` (v1.0.6)
  – **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Databáza**: LowDB (JSON) + SQLite (stav domény + protokoly proxy)
- **Streamovanie**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + kľúče API
- **Testovanie**: Testovací program Node.js (viac ako 368 testov jednotiek)
- **CI/CD**: Akcie GitHub (automatické zverejňovanie npm + Docker Hub pri vydaní)
- **Web**: [omniroute.online](https://omniroute.online)
- **Balík**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Odolnosť**: Istič, exponenciálny ústup, stádo proti hromu, spoofing TLS

---

## 📖 Dokumentácia

| Dokument                                     | Popis                                                          |
| -------------------------------------------- | -------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Poskytovatelia, kombá, integrácia CLI, nasadenie               |
| [API Reference](docs/API_REFERENCE.md)       | Všetky koncové body s príkladmi                                |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Bežné problémy a riešenia                                      |
| [Architecture](docs/ARCHITECTURE.md)         | Architektúra systému a vnútorné vybavenie                      |
| [Contributing](CONTRIBUTING.md)              | Nastavenie vývoja a usmernenia                                 |
| [OpenAPI Spec](docs/openapi.yaml)            | Špecifikácia OpenAPI 3.0                                       |
| [Security Policy](SECURITY.md)               | Nahlasovanie zraniteľnosti a bezpečnostné postupy              |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Kompletný sprievodca: nastavenie VM + nginx + Cloudflare       |
| [Features Gallery](docs/FEATURES.md)         | Vizuálna prehliadka prístrojového panela so snímkami obrazovky |

### 📸 Ukážka hlavného panela

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
| **Koncový bod**        | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute má naplánovaných **210+ funkcií** vo viacerých fázach vývoja. Tu sú kľúčové oblasti:

| Kategória                                  | Plánované funkcie | Najdôležitejšie                                                                                                     |
| ------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| 🧠 **Routovanie a inteligencia**           | 25+               | Smerovanie s najnižšou latenciou, smerovanie založené na značkách, predbežná kontrola kvóty, výber účtu P2C         |
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

> 📝 Úplné špecifikácie funkcií sú k dispozícii v [link](docs/new-features/) (217 podrobných špecifikácií)

---

## 👥 Prispievatelia

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Ako prispieť

1. Fork úložisko
2. Vytvorte si pobočku funkcií (`git checkout -b feature/amazing-feature`)
3. Potvrďte zmeny (`git commit -m 'Add amazing feature'`)
4. Zatlačte na pobočku (`git push origin feature/amazing-feature`)
5. Otvorte požiadavku na stiahnutie

Podrobné pokyny nájdete na stránke [CONTRIBUTING.md](CONTRIBUTING.md).

### Vydanie novej verzie

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 História hviezd

## Stargazers over time

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
