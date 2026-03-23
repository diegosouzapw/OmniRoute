<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute – Az ingyenes mesterséges intelligencia átjáró

### Soha ne hagyd abba a kódolást. Intelligens útválasztás **INGYENES és alacsony költségű mesterséges intelligencia modellekhez** automatikus visszaállítással.

_Az univerzális API-proxy – egy végpont, 36+ szolgáltató, nulla állásidő._

**Csevegés befejezése • Beágyazások • Képgenerálás • Hang • Újrarangsorolás • 100% TypeScript**

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

### 🤖 Ingyenes mesterséges intelligencia szolgáltató kedvenc kódoló ügynökei számára

_Csatlakoztasson bármilyen mesterséges intelligencia-alapú IDE-t vagy CLI-eszközt az OmniRoute-on keresztül – ingyenes API-átjáró a korlátlan kódoláshoz._

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

<sub>📡 Minden ügyintéző a <code>http://localhost:20128/v1</code> vagy <code>http://cloud.omni_TOKEN_244\_\_http://cloud.omniroute_EN_2NI4/v_1_TO_2.online-on keresztül csatlakozik konfiguráció, korlátlan modellek és kvóta</sub>

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

## 🤔 Miért az OmniRoute?

**Ne pazarolja a pénzt, és ne lépje túl a limiteket:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Az előfizetési kvóta minden hónapban fel nem használt
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> A sebességkorlátok megakadályozzák a közbenső kódolást
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Drága API-k (20-50 USD/hó szolgáltatónként)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Manuális váltás a szolgáltatók között

**Az OmniRoute ezt megoldja:**

- ✅ **Az előfizetések maximalizálása** - Kövesse nyomon a kvótát, használjon fel minden bitet a visszaállítás előtt
- ✅ **Automatikus tartalék** - Előfizetés → API-kulcs → Olcsó → Ingyenes, nulla állásidő
- ✅ **Több fiók** - Kör-robin a fiókok között szolgáltatónként
- ✅ **Univerzális** - Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, bármilyen CLI eszközzel működik

---

## 📧 Támogatás

> 💬 **Csatlakozzon közösségünkhöz!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Kérjen segítséget, ossza meg tippjeit, és naprakész legyen.

- **Webhely**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Problémák**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Eredeti projekt**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Hogyan működik

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

## 🎯 Mit old meg az OmniRoute – 30 valódi fájdalompont és használati eset

> **Minden mesterséges intelligencia-eszközöket használó fejlesztő naponta szembesül ezekkel a problémákkal.** Az OmniRoute úgy készült, hogy ezeket mind megoldja – a költségtúllépésektől a regionális blokkokig, a megszakadt OAuth-folyamatoktól a protokollműveletekig és a vállalati megfigyelhetőségig.

<details>
<summary><b>💸 1. "Drága előfizetésért fizetek, de még mindig megszakítanak a korlátozások" </b></summary>

A fejlesztők havi 20–200 dollárt fizetnek a Claude Pro, Codex Pro vagy GitHub Copilotért. A kvótának még fizetés esetén is van felső határa – 5 óra használat, heti limitek vagy percdíjkorlátok. A kódolási munkamenet közepén a szolgáltató leáll, és a fejlesztő elveszíti a folyamatot és a termelékenységet.

**Hogyan oldja meg az OmniRoute:**

- **Smart 4-Tier Fallback** – Ha az előfizetési kvóta kimerül, automatikusan átirányítja az API-kulcs → Olcsó → Ingyenes, manuális beavatkozás nélkül
- **Valós idejű kvótakövetés** – Valós időben mutatja a token felhasználást, visszaszámlálással (5 óra, napi, heti)
- **Több fiók támogatása** - Több fiók szolgáltatónként automatikus körváltással - ha az egyik elfogy, átvált a következőre
- **Egyéni kombók** — Testreszabható tartalék láncok 6 kiegyensúlyozási stratégiával (fill-first, round-robin, P2C, véletlenszerű, legkevésbé használt, költségoptimalizált)
- **Codex üzleti kvóták** — Üzleti/csapat munkaterület-kvóta figyelése közvetlenül az irányítópulton

</details>

<details>
<summary><b>🔌 2. "Több szolgáltatót kell használnom, de mindegyiknek más API" </b></summary>

Az OpenAI egy formátumot használ, a Claude (Anthropic) egy másikat, a Gemini pedig egy másikat. Ha egy fejlesztő különböző szolgáltatók modelljeit szeretné tesztelni, vagy tartalékot szeretne közöttük, akkor újra kell konfigurálnia az SDK-kat, módosítania kell a végpontokat, és kezelnie kell az inkompatibilis formátumokat. Az egyéni szolgáltatók (FriendLI, NIM) nem szabványos modellvégpontokkal rendelkeznek.

**Hogyan oldja meg az OmniRoute:**

- **Egységes végpont** - Egy `http://localhost:20128/v1` proxyként szolgál mind a 36+ szolgáltató számára
- **Formátumfordítás** - Automatikus és átlátható: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** – Eltávolítja azokat a nem szabványos mezőket (`x_groq`, `usage_breakdown`, `service_tier`), amelyek megszakítják az OpenAI SDK v1.83+ verzióját
- **Szerepek normalizálása** — `developer` → `system` konvertálása nem OpenAI szolgáltatók számára; `system` → `user` a GLM/ERNIE számára
- **Think Tag Extraction** – `<think>` blokkokat bont ki olyan modellekből, mint a DeepSeek R1 szabványos `reasoning_content`-be
- **Strukturált kimenet a Gemini számára** — `json_schema` → `responseMimeType`/`responseSchema` automatikus átalakítás
- **`stream` az alapértelmezett `false`** - Az OpenAI specifikációhoz igazodik, elkerülve a váratlan SSE-t a Python/Rust/Go SDK-kban

</details>

<details>
<summary><b>🌐 3. „Az AI-szolgáltatóm blokkolja a régiómat/országomat”</b></summary>

Az olyan szolgáltatók, mint az OpenAI/Codex, blokkolják a hozzáférést bizonyos földrajzi régiókból. A felhasználók OAuth- és API-kapcsolatok során olyan hibákat kapnak, mint az `unsupported_country_region_territory`. Ez különösen frusztráló a fejlődő országok fejlesztői számára.

**Hogyan oldja meg az OmniRoute:**

- **3-szintű proxykonfiguráció** – 3 szinten konfigurálható proxy: globális (teljes forgalom), szolgáltatónként (csak egy szolgáltató) és kapcsolatonként/kulcsonként
- **Színes proxy jelvények** - Vizuális jelzők: 🟢 globális proxy, 🟡 szolgáltató proxy, 🔵 kapcsolat proxy, mindig az IP-t mutatja
- **OAuth-tokencsere proxyn keresztül** — Az OAuth-folyamat a proxyn keresztül is megy, megoldva az `unsupported_country_region_territory` problémát
- **Kapcsolódási tesztek proxyn keresztül** - A csatlakozási tesztek a konfigurált proxyt használják (nincs többé közvetlen kiiktatás)
- **SOCKS5 támogatás** — Teljes SOCKS5 proxy támogatás a kimenő útválasztáshoz
- **TLS-ujjlenyomat-hamisítás** — Böngészőszerű TLS-ujjlenyomat az `wreq-js`-n keresztül a botészlelés megkerüléséhez

</details>

<details>
<summary><b>🆓 4. "MI-t akarok használni kódoláshoz, de nincs pénzem" </b></summary>

Nem mindenki fizethet havi 20–200 dollárt az AI-előfizetésekért. A feltörekvő országok diákjainak, fejlesztőinek, amatőröknek és szabadúszóknak nulla költséggel kell hozzáférniük a minőségi modellekhez.

**Hogyan oldja meg az OmniRoute:**

- **Beépített ingyenes szolgáltatók** - Natív támogatás 100%-ban ingyenes szolgáltatókhoz: iFlow (8 korlátlan modell), Qwen (3 korlátlan modell), Kiro (Claude ingyenes), Gemini CLI (180 000/hónap ingyenes)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Csak ingyenes kombók** — `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` lánc = 0 USD/hó nulla állásidővel
- **NVIDIA NIM ingyenes kreditek** – 1000 ingyenes kredit integrálva
- **Költségoptimalizált stratégia** — Útválasztási stratégia, amely automatikusan a legolcsóbb elérhető szolgáltatót választja

</details>

<details>
<summary><b>🔒 5. "Meg kell védenem a mesterséges intelligencia átjárómat a jogosulatlan hozzáféréstől"</b></summary>

Ha AI átjárót teszünk ki a hálózatnak (LAN, VPS, Docker), a cím birtokában bárki felhasználhatja a fejlesztő tokenjeit/kvótáját. Védelem nélkül az API-k sebezhetőek a visszaélésekkel, azonnali befecskendezéssel és visszaélésekkel szemben.

**Hogyan oldja meg az OmniRoute:**

- **API-kulcskezelés** — Generálás, rotáció és hatókör szolgáltatónként egy dedikált `/dashboard/api-manager`-oldallal
- **Modellszintű engedélyek** - API-kulcsok korlátozása adott modellekre (`openai/*`, helyettesítő karakteres minták), az Összes engedélyezése/Korlátozása kapcsolóval
- **API Endpoint Protection** — Kulcs szükséges az `/v1/models` számára, és bizonyos szolgáltatók letiltása a listáról
- **Auth Guard + CSRF védelem** - Minden irányítópult-útvonal `withAuth` köztes szoftverrel + CSRF tokenekkel védett
- **Rate Limiter** — IP-nkénti sebességkorlátozás konfigurálható ablakokkal
- **IP-szűrés** — Engedélyezési lista/blokkolólista a hozzáférés-vezérléshez
- **Prompt Injection Guard** – fertőtlenítés a rosszindulatú felszólítási minták ellen
- **AES-256-GCM titkosítás** - A hitelesítő adatok nyugalmi állapotban titkosítva

</details>

<details>
<summary><b>🛑 6. "A szolgáltatóm leállt, és elvesztettem a kódolási folyamatomat"</b></summary>

Az AI-szolgáltatók instabillá válhatnak, 5xx-es hibákat adnak vissza, vagy elérhetik az ideiglenes sebességkorlátokat. Ha egy fejlesztő egyetlen szolgáltatótól függ, akkor megszakad. Megszakítók nélkül az ismételt újrapróbálkozások összeomolhatják az alkalmazást.

**Hogyan oldja meg az OmniRoute:**

- **Megszakító szolgáltatónként** - Automatikus nyitás/zárás konfigurálható küszöbértékekkel és lehűtéssel (zárt/nyitott/félig nyitott)
- **Exponenciális visszalépés** — Progresszív újrapróbálkozási késések
- **Mennydörgés elleni csorda** - Mutex + szemafor védelem az egyidejű újrapróbálkozási viharok ellen
- **Kombinált tartalék láncok** – Ha az elsődleges szolgáltató meghibásodik, automatikusan, beavatkozás nélkül átesik a láncon
- **Combo Circuit Breaker** – Automatikusan letiltja a hibás szolgáltatókat a kombinált láncon belül
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Egészségügyi irányítópult** — Üzemidő-figyelés, áramkör-megszakító állapotok, zárolások, gyorsítótár-statisztika, p50/p95/p99 késleltetés

</details>

<details>
<summary><b>🔧 7. "Az egyes AI-eszközök konfigurálása fárasztó és ismétlődő"</b></summary>

A fejlesztők Cursort, Claude Code-ot, Codex CLI-t, OpenClaw-ot, Gemini CLI-t, Kilo Code-ot használnak... Minden eszköznek más konfigurációra van szüksége (API végpont, kulcs, modell). Az újrakonfigurálás szolgáltató- vagy modellváltáskor időpocsékolás.

**Hogyan oldja meg az OmniRoute:**

- **CLI Tools Dashboard** - Dedikált oldal egykattintásos beállítással a Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline számára
- **GitHub másodpilóta konfigurációs generátor** — `chatLanguageModels.json` kódot generál VS kódhoz tömeges modellválasztással
- **Bevezető varázsló** – Irányított 4 lépéses beállítás első felhasználók számára
- **Egy végpont, minden modell** — Az `http://localhost:20128/v1` egyszeri konfigurálása, 36+ szolgáltató elérése

</details>

<details>
<summary><b>🔑 8. "A több szolgáltatótól származó OAuth-tokenek kezelése pokol"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – mindegyik az OAuth 2.0-t használja lejáró tokenekkel. A fejlesztőknek folyamatosan újra kell hitelesíteniük, kezelniük kell az `client_secret is missing`, `redirect_uri_mismatch` és a távoli szerverek hibáit. Az OAuth a LAN/VPS-en különösen problémás.

**Hogyan oldja meg az OmniRoute:**

- **Automatikus tokenfrissítés** - Az OAuth-tokenek a háttérben frissülnek a lejárat előtt
- **OAuth 2.0 (PKCE) beépített** - Automatikus áramlás Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow számára
- **Multi-Account OAuth** - Több fiók szolgáltatónként a JWT/ID token kivonattal
- **OAuth LAN/Távoli javítás** - Privát IP-észlelés `redirect_uri`-hez + kézi URL mód távoli szerverekhez
- **OAuth az Nginx mögött** - `window.location.origin`-t használ a fordított proxy kompatibilitás érdekében
- **Távoli OAuth útmutató** – Lépésről lépésre útmutató a Google Cloud hitelesítő adataihoz VPS/Docker rendszeren

</details>

<details>
<summary><b>📊 9. "Nem tudom, mennyit költök vagy hova"</b></summary>

A fejlesztők több fizetős szolgáltatót használnak, de nincs egységes nézetük a kiadásokról. Minden szolgáltató saját számlázási irányítópulttal rendelkezik, de nincs összevont nézet. A váratlan költségek felhalmozódhatnak.

**Hogyan oldja meg az OmniRoute:**

- **Költségelemzési irányítópult** – Tokenenkénti költségkövetés és költségkeret-kezelés szolgáltatónként
- **Költségkeret-korlátok rétegenként** - Költési felső határ szintenként, amely automatikus visszalépést vált ki
- **Modellenkénti árképzés** - Konfigurálható árak modellenként
- **Használati statisztika API-kulcsonként** — A kérések száma és az utoljára használt időbélyeg kulcsonként
- **Analytics Dashboard** — Statisztikai kártyák, modellhasználati diagram, szolgáltatói táblázat sikerarányokkal és késleltetéssel

</details>

<details>
<summary><b>🐛 10. "Nem tudom diagnosztizálni a hibákat és problémákat az AI-hívásoknál"</b></summary>

Ha egy hívás meghiúsul, a fejlesztő nem tudja, hogy sebességkorlátozás, lejárt token, rossz formátum vagy szolgáltatói hiba volt-e. Töredezett naplók különböző terminálokon. Megfigyelhetőség nélkül a hibakeresés próba és hiba.

**Hogyan oldja meg az OmniRoute:**

- **Egységes naplók irányítópultja** - 4 lap: Kérelemnaplók, Proxynaplók, Auditnaplók, Konzol
- **Konzolnapló-nézegető** — Valós idejű terminál stílusú megjelenítő színkódolt szintekkel, automatikus görgetés, keresés, szűrés
- **SQLite proxynaplók** – Állandó naplók, amelyek túlélik a szerver újraindítását
- **Translator Playground** – 4 hibakeresési mód: Playground (formátum fordítás), Chat Tester (oda-vissza út), Tesztpad (kötegelt), Élő monitor (valós idejű)
- **Request Telemetria** – p50/p95/p99 késleltetés + X-Request-Id nyomkövetés
- **Fájlalapú naplózás elforgatással** - A konzolelfogó mindent JSON-naplóba rögzít méretalapú elforgatással

</details>

<details>
<summary><b>🏗️ 11. "Az átjáró telepítése és karbantartása összetett" </b></summary>

Az AI-proxy telepítése, konfigurálása és karbantartása különböző környezetekben (helyi, VPS, Docker, felhő) munkaigényes. Az olyan problémák, mint a keménykódolt elérési utak, az `EACCES` a könyvtárakon, a portütközések és a többplatformos buildek súrlódást okoznak.

**Hogyan oldja meg az OmniRoute:**

- **npm globális telepítés** — `npm install -g omniroute && omniroute` — kész
- **Docker Multi-Platform** – AMD64 + ARM64 natív (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (nincs CLI-eszközök) és `cli` (Claude Code-al, Codex-szel, OpenClaw-val)
- **Electron Desktop App** – Natív alkalmazás Windows/macOS/Linux rendszerhez rendszertálcával, automatikus indítással, offline móddal
- **Split-Port Mode** – API és irányítópult külön portokon haladó forgatókönyvekhez (fordított proxy, konténerhálózat)
- **Cloud Sync** – Szinkronizálás konfigurálása az eszközök között a Cloudflare Workers segítségével
- **DB biztonsági mentések** — Az összes beállítás automatikus biztonsági mentése, visszaállítása, exportálása és importálása

</details>

<details>
<summary><b>🌍 12. "A felület csak angol nyelvű, és a csapatom nem beszél angolul"</b></summary>

A nem angol nyelvű országokban, különösen Latin-Amerikában, Ázsiában és Európában működő csapatok csak angol nyelvű felületekkel küszködnek. A nyelvi akadályok csökkentik az átvételt és növelik a konfigurációs hibákat.

**Hogyan oldja meg az OmniRoute:**

- ** Irányítópult i18n – 30 nyelv** – Mind az 500+ billentyű lefordítva, beleértve arab, bolgár, dán, német, spanyol, finn, francia, héber, hindi, magyar, indonéz, olasz, japán, koreai, maláj, holland, norvég, lengyel, portugál (PT/BR), román, thai, orosz, szlovák, svéd, filippínó, angol, thai, orosz, kínai, filippínó
- **RTL támogatás** – Jobbról balra haladó arab és héber nyelv támogatása
- **Többnyelvű README-k** — 30 teljes dokumentáció fordítás
- **Nyelvválasztó** — Globe ikon a fejlécben a valós idejű váltáshoz

</details>

<details>
<summary><b>🔄 13. "Többre van szükségem, mint csevegésre – beágyazásra, képekre, hangra van szükségem"</b></summary>

Az AI nem csak a csevegés befejezése. A fejlesztőknek képeket kell generálniuk, hangot kell átírniuk, beágyazást kell létrehozniuk a RAG számára, át kell sorolniuk a dokumentumokat, és moderálniuk kell a tartalmat. Minden API más végponttal és formátummal rendelkezik.

**Hogyan oldja meg az OmniRoute:**

- **Beágyazások** — `/v1/embeddings` 6 szolgáltatóval és 9+ modellel
- **Képgenerálás** — `/v1/images/generations` 10 szolgáltatóval és 20+ modellel (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Text-to-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) és SD WebUI
- **Text-to-Music** — `/v1/music/generations` — ComfyUI (Stable Audio Open, MusicGen)
- **Audio átírás** - `/v1/audio/transcriptions` - Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Szövegfelolvasó** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + meglévő szolgáltatók
- **Moderálás** — `/v1/moderations` — Tartalombiztonsági ellenőrzések
- **Átsorolás** — `/v1/rerank` — Dokumentumreleváns átsorolás
- **Responses API** - Teljes `/v1/responses` támogatás a Codexhez

</details>

<details>
<summary><b>🧪 14. "Nincs módom tesztelni és összehasonlítani a minőséget a különböző modellek között"</b></summary>

A fejlesztők szeretnék tudni, hogy melyik modell a legjobb az ő használati esetükben – kód, fordítás, érvelés –, de a manuális összehasonlítás lassú. Nincsenek integrált eval eszközök.

**Hogyan oldja meg az OmniRoute:**

- **LLM-értékelések** — Arany készlet tesztelése 10 előre betöltött esettel, beleértve az üdvözlést, a matematikát, a földrajzot, a kódgenerálást, a JSON-megfelelőséget, a fordítást, a leértékelést, a biztonsági megtagadást
- **4 egyezési stratégia** — `exact`, `contains`, `regex`, `custom` (JS funkció)
- **Translator Playground Test Bench** - Kötegelt tesztelés több bemenettel és várható kimenettel, szolgáltatók közötti összehasonlítás
- **Csevegés tesztelő** - Teljes körút vizuális válaszmegjelenítéssel
- **Élő monitor** – Valós idejű adatfolyam a proxyn keresztül folyó összes kérésről

</details>

<details>
<summary><b>📈 15. "A teljesítmény elvesztése nélkül kell méreteznem" </b></summary>

A kérelmek mennyiségének növekedésével ugyanazok a kérdések a gyorsítótárazás nélkül duplikált költségeket generálnak. Idempotencia nélkül a duplikált hulladékfeldolgozási kérelmek. A szolgáltatónkénti díjkorlátokat be kell tartani.

**Hogyan oldja meg az OmniRoute:**

- **Szemantikus gyorsítótár** – A kétszintű gyorsítótár (aláírás + szemantikai) csökkenti a költségeket és a késleltetést
- **Idempotency kérése** – 5 másodperces deduplikációs ablak azonos kérések esetén
- **Drátakorlát észlelése** – Szolgáltatónkénti RPM, minimális rés és maximális egyidejű követés
- **Szerkeszthető sebességkorlátok** - Konfigurálható alapértékek a Beállítások → Kitartással ellenálló képesség menüpontban
- **API Key Validation Cache** – 3-szintű gyorsítótár az éles teljesítményhez
- **Egészségügyi irányítópult telemetriával** — p50/p95/p99 késleltetés, gyorsítótár statisztika, üzemidő

</details>

<details>
<summary><b>🤖 16. "Globálisan szeretném szabályozni a modell viselkedését" </b></summary>

Azok a fejlesztők, akik minden választ egy adott nyelven, egy adott hangnemben szeretnének, vagy korlátozni szeretnék az érvelési tokeneket. Ennek konfigurálása minden eszközben/kérelemben nem praktikus.

**Hogyan oldja meg az OmniRoute:**

- **Rendszerprompt Injection** — Globális prompt minden kérelemre vonatkozik
- **A költségkeret átgondolásának ellenőrzése** – Indoklási token-kiosztás ellenőrzése kérésenként (áthaladó, automatikus, egyéni, adaptív)
- **6 Útválasztási stratégia** – Globális stratégiák, amelyek meghatározzák a kérések elosztását
- **Wildcard Router** — `provider/*` minták dinamikusan továbbítanak bármely szolgáltatóhoz
- **Kombinációs engedélyezés/letiltás váltás** - A kombók váltása közvetlenül az irányítópultról
- **Provider Toggle** — Egy szolgáltató összes kapcsolatának engedélyezése/letiltása egyetlen kattintással
- **Letiltott szolgáltatók** - Adott szolgáltatók kizárása az `/v1/models` listáról

</details>

<details>
<summary><b>🧰 17. "MCP eszközökre van szükségem, mint első osztályú termékképességekre" </b></summary>

Sok mesterséges intelligencia-átjáró csak rejtett megvalósítási részletként teszi közzé az MCP-t. A csapatoknak látható, kezelhető műveleti rétegre van szükségük.

**Hogyan oldja meg az OmniRoute:**

- Az MCP megjelenik az irányítópult navigációs és végponti protokoll lapján
- Dedikált MCP-kezelési oldal folyamatokkal, eszközökkel, hatókörökkel és audittal
- Beépített gyorsindítás az `omniroute --mcp` és a kliens beépítéséhez

</details>

<details>
<summary><b>🧠 18. "A2A hangszerelésre van szükségem szinkronizálással + adatfolyam feladatútvonalak" </b></summary>

Az ügynöki munkafolyamatokhoz közvetlen válaszokra és hosszú távú, streamelt végrehajtásra van szükség életciklus-vezérléssel.

**Hogyan oldja meg az OmniRoute:**

- A2A JSON-RPC végpont (`POST /a2a`) `message/send` és `message/stream`
- SSE streaming terminál állapot terjesztéssel
- Feladat életciklus API-k `tasks/get` és `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Valódi MCP folyamatállapotra van szükségem, nem kitalált állapotra" </b></summary>

Az operatív csapatoknak tudniuk kell, hogy az MCP valóban életben van-e, nem csak azt, hogy egy API elérhető-e.

**Hogyan oldja meg az OmniRoute:**

- Futásidejű szívverés fájl PID-vel, időbélyegekkel, szállítással, szerszámszámmal és hatókör móddal
- MCP állapot API, amely kombinálja a szívverést + a legutóbbi tevékenységet
- UI állapotkártyák a folyamat/üzemidő/szívverés frissességéhez

</details>

<details>
<summary><b>📋 20. "Kivizsgálható MCP-eszköz végrehajtásra van szükségem" </b></summary>

Amikor az eszközök módosítják a konfigurációt vagy működési műveleteket indítanak el, a csapatoknak kriminalisztikai nyomon követhetőségre van szükségük.

**Hogyan oldja meg az OmniRoute:**

- SQLite-alapú audit naplózás MCP-eszközhívásokhoz
- Szűrések eszköz, siker/kudarc, API-kulcs és oldalszámozás szerint
- Irányítópult audit táblázat + statisztikai végpontok az automatizáláshoz

</details>

<details>
<summary><b>🔐 21. "Hatókörű MCP-engedélyekre van szükségem integrációnként"</b></summary>

A különböző ügyfeleknek a legkevesebb jogosultsággal kell rendelkezniük az eszközkategóriákhoz.

**Hogyan oldja meg az OmniRoute:**

- 9 szemcsés MCP hatókör az ellenőrzött szerszámhozzáféréshez
- Hatályérvényesítés és láthatóság az MCP-kezelő felületen
- Biztonságos alaphelyzet az üzemi szerszámokhoz

</details>

<details>
<summary><b>⚙️ 22. "Üzemeltetési vezérlőkre van szükségem átcsoportosítás nélkül" </b></summary>

A csapatoknak gyors futásidejű változtatásokra van szükségük incidensek vagy költségesemények során.

**Hogyan oldja meg az OmniRoute:**

- A kombinált aktiválás váltása közvetlenül az MCP műszerfaláról
- Rugalmassági profilok alkalmazása előre meghatározott házirend-csomagokból
- Állítsa vissza a megszakító állapotát ugyanarról a kezelőpanelről

</details>

<details>
<summary><b>🔄 23. "Szükségem van élő A2A feladatok életciklusának láthatóságára és törlésére"</b></summary>

Az életciklus láthatósága nélkül a feladat-incidensek nehezen osztályozhatók.

**Hogyan oldja meg az OmniRoute:**

- Feladatok listázása/szűrés állapot/készség szerint oldalszámozással
- A feladatok metaadatainak, eseményeinek és műtermékeinek részletezése
- Feladat törlési végpont és felhasználói felület művelet megerősítéssel

</details>

<details>
<summary><b>🌊 24. "Aktív adatfolyam-metrikákra van szükségem A2A terheléshez"</b></summary>

A streamelési munkafolyamatok működési betekintést igényelnek a párhuzamosság és az élő kapcsolatok terén.

**Hogyan oldja meg az OmniRoute:**

- Az A2A állapotba integrált aktív folyamszámlálók
- Utolsó feladat időbélyegzője és állapotonkénti száma
- A2A műszerfalkártyák a valós idejű műveletek figyeléséhez

</details>

<details>
<summary><b>🪪 25. "Szabványos ügynökfelderítésre van szükségem az ügyfelek számára" </b></summary>

A külső klienseknek és hangszerelőknek géppel olvasható metaadatokra van szükségük a bevezetéshez.

**Hogyan oldja meg az OmniRoute:**

- Az ügynökkártya az `/.well-known/agent.json` címen látható
- A menedzsment felületen látható képességek és készségek
- Az A2A állapot API felfedezési metaadatokat tartalmaz az automatizáláshoz

</details>

<details>
<summary><b>🧭 26. "Protokoll felfedezhetőségre van szükségem az UX termékben"</b></summary>

Ha a felhasználók nem fedezik fel a protokollfelületeket, az elfogadás és a támogatás minősége csökken.

**Hogyan oldja meg az OmniRoute:**

- Oldalsáv bejegyzések MCP és A2A számára
- Végpont oldal Protokollok lap gyorsindítással és állapottal
- Linkek az áttekintésből a dedikált felügyeleti irányítópultokhoz

</details>

<details>
<summary><b>🧪 27. "Végponttól végpontig terjedő protokoll-érvényesítésre van szükségem valós kliensekkel"</b></summary>

A próbatesztek nem elegendőek a protokoll-kompatibilitás ellenőrzéséhez a kiadás előtt.

**Hogyan oldja meg az OmniRoute:**

- E2E csomag, amely elindítja az alkalmazást, és valódi MCP SDK kliens szállítást használ
- Az A2A kliens teszteli az áramlások felfedezését, küldését, streamingjét, lekérését és megszakítását
- Az állítások keresztellenőrzése az MCP audit és az A2A feladatok API-jával szemben

</details>

<details>
<summary><b>📡 28. "Egységes megfigyelhetőségre van szükségem minden interfészen"</b></summary>

A megfigyelhetőség protokoll szerinti felosztása vakfoltokat és hosszabb MTTR-t hoz létre.

**Hogyan oldja meg az OmniRoute:**

- Egységes irányítópultok/naplók/analytics egy termékben
- Egészség + audit + kérés telemetria OpenAI, MCP és A2A rétegeken keresztül
- Működési API-k az állapothoz és az automatizáláshoz

</details>

<details>
<summary><b>💼 29. "Egy futási időre van szükségem a proxyhoz + eszközökhöz + ügynök hangszereléshez" </b></summary>

Számos külön szolgáltatás futtatása növeli a működési költségeket és a hibamódokat.

**Hogyan oldja meg az OmniRoute:**

- OpenAI-kompatibilis proxy, MCP szerver és A2A szerver egy veremben
- Megosztott hitelesítés, rugalmasság, adattárolás és megfigyelhetőség
- Konzisztens politikai modell az összes interakciós felületen

</details>

<details>
<summary><b>🚀 30. "Az ügynöki munkafolyamatokat ragasztókód szétszórása nélkül kell szállítanom" </b></summary>

A csapatok veszítenek sebességükből, amikor több ad-hoc szolgáltatást és szkriptet illesztenek össze.

**Hogyan oldja meg az OmniRoute:**

- Egységes végpont stratégia az ügyfelek és ügynökök számára
- Beépített protokollkezelő felhasználói felületek és füstellenőrzési útvonalak
- Gyártásra kész alapok (biztonság, naplózás, rugalmasság, biztonsági mentés)

</details>

### Példa forgatókönyvekre (integrált használati esetek)

**A játékkönyv: Maximalizálja a fizetett előfizetést + olcsó biztonsági mentés**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Zéró költségű kódolási verem**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 mindig bekapcsolt tartalék lánc**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**D játékkönyv: Az ügynök MCP + A2A-val működik**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Gyors kezdés

**1. Globális telepítés:**

```bash
npm install -g omniroute
omniroute
```

🎉 Az irányítópult ekkor nyílik meg: `http://localhost:20128`

| Parancs                 | Leírás                                        |
| ----------------------- | --------------------------------------------- |
| `omniroute`             | Szerver indítása (alapértelmezett port 20128) |
| `omniroute --port 3000` | Egyéni port használata                        |
| `omniroute --no-open`   | Ne nyissa meg automatikusan a böngészőt       |
| `omniroute --help`      | Segítség megjelenítése                        |

**2. Csatlakozzon egy INGYENES szolgáltatóhoz:**

Irányítópult → Szolgáltatók → Csatlakozás **Claude Code** vagy **Antigravity** → OAuth bejelentkezés → Kész!

**3. Használja a CLI eszközben:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Ennyi!** Kezdje el a kódolást az INGYENES AI modellekkel.

**Alternatív – forrásból fut:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

Az OmniRoute nyilvános Docker-képként érhető el a [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) webhelyen.

**Gyors futás:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Környezetfájllal:**

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

**A Docker Compose használata:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Kép                      | Címke    | Méret   | Leírás                 |
| ------------------------ | -------- | ------- | ---------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250 MB | Legújabb stabil kiadás |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Jelenlegi verzió       |

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

## 💰 Árazás egy pillantásra

| Tier              | Szolgáltató        | Költség                     | Kvóta visszaállítása   | Legjobb a                       |
| ----------------- | ------------------ | --------------------------- | ---------------------- | ------------------------------- |
| **💳 ELŐFIZETÉS** | Claude Code (Pro)  | 20 USD/hó                   | 5 óra + heti           | Már előfizetett                 |
|                   | Codex (Plus/Pro)   | 20-200 USD/hó               | 5 óra + heti           | OpenAI felhasználók             |
|                   | Gemini CLI         | **INGYENES**                | 180 000/hó + 1 000/nap | Mindenki!                       |
|                   | GitHub másodpilóta | 10-19 USD/hó                | Havi                   | GitHub felhasználók             |
| **🔑 API KULCS**  | NVIDIA NIM         | **INGYENES** (1000 kredit)  | Egyszeri               | Ingyenes szintű tesztelés       |
|                   | DeepSeek           | Felhasználásonkénti fizetés | Nincs                  | Legjobb ár/minőség              |
|                   | Groq               | Ingyenes szint + fizetett   | Ár korlátozott         | Ultragyors következtetés        |
|                   | xAI (Grok)         | Felhasználásonkénti fizetés | Nincs                  | Grok modellek                   |
|                   | Mistral            | Ingyenes szint + fizetett   | Ár korlátozott         | Európai AI                      |
|                   | OpenRouter         | Felhasználásonkénti fizetés | Nincs                  | 100+ modell                     |
| **💰 OLCSÓ**      | GLM-4.7            | 0,6 USD/1M                  | Naponta 10:00          | Költségvetési biztonsági mentés |
|                   | MiniMax M2.1       | 0,2 USD/1M                  | 5 órás gurulás         | Legolcsóbb lehetőség            |
|                   | Kimi K2            | 9 USD/hó lakás              | 10 millió token/hó     | Előrelátható költség            |
| **🆓 INGYENES**   | iFlow              | $0                          | Korlátlan              | 8 modell ingyenes               |
|                   | Qwen               | $0                          | Korlátlan              | 3 modell ingyenes               |
|                   | Kiro               | $0                          | Korlátlan              | Claude ingyen                   |

**💡 Pro tipp:** Kezdje a Gemini CLI-vel (180 000 ingyenes/hónap) + iFlow (korlátlan ingyenes) kombináció = 0 USD költség!

---

## 💡 Főbb jellemzők

### 🧠 Core Routing & Intelligence

| Funkció                                 | Mit csinál                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🎯 **Intelligens 4-szintű tartalék**    | Automatikus útvonal: Előfizetés → API-kulcs → Olcsó → Ingyenes                              |
| 📊 **Valós idejű kvótakövetés**         | Élő tokenszám + visszaszámlálás visszaállítása szolgáltatónként                             |
| 🔄 **Formátum fordítás**                | OpenAI ↔ Claude ↔ Gemini ↔ Kurzor ↔ Kiro zökkenőmentes + válaszfertőtlenítés                |
| 👥 **Többfiókos támogatás**             | Több fiók szolgáltatónként intelligens kiválasztással                                       |
| 🔄 **Automatikus token frissítés**      | Az OAuth-tokenek automatikusan frissülnek                                                   |
| 🎨 **Egyéni kombók**                    | 6 stratégia: fill-first, round-robin, p2c, random, legkevésbé használt, költségoptimalizált |
| 🧩 **Egyedi modellek**                  | Adjon hozzá bármilyen modellazonosítót bármely szolgáltatóhoz                               |
| 🌐 **Wildcard Router**                  | `provider/*` minták továbbítása bármely szolgáltatóhoz dinamikusan                          |
| 🧠 **Átgondolt költségvetés**           | Átjárási, automatikus, egyéni és adaptív módok érvelési modellekhez                         |
| 🔀 **Model Aliases**                    | Auto-forward deprecated model IDs to current replacements (built-in + custom)               |
| ⚡ **Background Degradation**           | Auto-route background tasks (titles, summaries) to cheaper models                           |
| 💬 **Rendszer azonnali befecskendezés** | Globális rendszerkérdés minden kérelemre érvényes                                           |
| 📄 **Responses API**                    | Teljes OpenAI Responses API (`/v1/responses`) támogatás a Codexhez                          |

### 🎵 Multimodális API-k

| Funkció                | Mit csinál                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Képgenerálás**    | `/v1/images/generations` — 4 szolgáltató, 9+ modell                                                                                                                        |
| 📐 **Beágyazás**       | `/v1/embeddings` — 6 szolgáltató, 9+ modell                                                                                                                                |
| 🎤 **Audio átírás**    | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Szövegfelolvasó** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderálás**       | `/v1/moderations` — Tartalombiztonsági ellenőrzések                                                                                                                        |
| 🔀 **Átsorolás**       | `/v1/rerank` — A dokumentumok relevancia szerinti átsorolása                                                                                                               |

### 🛡️ Rugalmasság és biztonság

| Funkció                           | Mit csinál                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| 🔌 **Megszakító**                 | Automatikus megnyitás/bezárás szolgáltatónként konfigurálható küszöbértékekkel            |
| 🛡️ **Menydörgésellenes csorda**   | Mutex + szemafor sebességkorlátozás API-kulcs-szolgáltatók számára                        |
| 🧠 **Szemantikus gyorsítótár**    | A kétszintű gyorsítótár (aláírás + szemantikai) csökkenti a költségeket és a késleltetést |
| ⚡ **Idempotencia kérése**        | 5s dedup ablak ismétlődő kérésekhez                                                       |
| 🔒 **TLS ujjlenyomat-hamisítás**  | A TLS-alapú botészlelés megkerülése a wreq-js segítségével                                |
| 🌐 **IP-szűrés**                  | Allowlist/blokkolista API hozzáférés-vezérléshez                                          |
| 📊 **Szerkeszthető díjkorlátok**  | Konfigurálható fordulatszám, minimális rés és maximális egyidejű rendszerszinten          |
| 💾 **Rate Limit Persistence**     | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness              |
| 🔄 **Token Refresh Resilience**   | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                    |
| 🛡 **API Endpoint Protection**    | Auth kapuzás + szolgáltató blokkolása a `/models` végponthoz                              |
| 🔒 **Proxy láthatósága**          | Színkódolt jelvények: 🟢 globális, 🟡 szolgáltató, 🔵 kapcsolatonként IP kijelzővel       |
| 🌐 **3-szintű proxykonfiguráció** | Proxyk konfigurálása globális, szolgáltatónkénti vagy kapcsolatonkénti szinten            |

### 📊 Megfigyelhetőség és elemzés

| Funkció                          | Mit csinál                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| 📝 **Naplózás kérése**           | Hibakeresési mód teljes kérés/válasz naplókkal                                                  |
| 💾 **SQLite proxynaplók**        | Az állandó proxynaplók túlélik a szerver újraindítását                                          |
| 📊 **Analytics Dashboard**       | Újragrafikusok: statisztikai kártyák, modellhasználati táblázat, szolgáltatói táblázat          |
| 📈 **Haladáskövetés**            | SSE előrehaladási események engedélyezése streaming                                             |
| 🧪 **LLM értékelések**           | Aranykészlet tesztelése 4 meccsstratégiával                                                     |
| 🔍 **Telemetria kérése**         | p50/p95/p99 késleltetési összesítés + X-Request-Id nyomkövetés                                  |
| 📋 **Logs Dashboard**            | Egységes 4 lapos oldal: Kérelemnaplók, Proxynaplók, Auditnaplók, Konzol                         |
| 🖥️ **Console Log Viewer**        | Valós idejű terminál stílusú megjelenítő szintszűrővel, kereséssel, automatikus görgetéssel     |
| 📑 **Fájlalapú naplózás**        | A konzolelfogó az összes kimenetet JSON-naplófájlba rögzíti                                     | forgatással |
| 🏥 **Egészségügyi irányítópult** | A rendszer üzemideje, az áramkör megszakítói állapotai, a zárolások, a gyorsítótár statisztikái |
| 💰 **Költségkövetés**            | Költségvetés-kezelés + modellenkénti árképzés                                                   |

### ☁️ Telepítés és szinkronizálás

| Funkció                       | Mit csinál                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------------- | ------------ |
| 💾 **Cloud Sync**             | Szinkronizálja a konfigurációt az eszközök között a Cloudflare Workers                        | segítségével |
| 🌐 **Deploy Anywhere**        | Localhost, VPS, Docker, Cloudflare Workers                                                    |
| 🔑 **API-kulcskezelés**       | API-kulcsok generálása, forgatása és hatóköre szolgáltatónként                                |
| 🧙 **Bevezető varázsló**      | 4 lépésben irányított beállítás első felhasználók számára                                     |
| 🔧 **CLI Tools Dashboard**    | Egy kattintással konfigurálja a Claude, Codex, Cline, OpenClaw, Kilo, Antigravity             |
| 🔄 **DB biztonsági mentések** | Automatikus biztonsági mentés, visszaállítás, exportálás és importálás az összes beállításhoz |
| 🌐 **Nemzetközivé válás**     | Teljes i18n next-intl-vel – angol + portugál (Brazília) támogatás                             |
| 🌍 **Nyelvválasztó**          | Globe ikon a fejlécben a valós idejű nyelvváltáshoz (🇺🇸/🇧🇷)                                   |
| 📂 **Egyéni adattár**         | `DATA_DIR` env var felülírja az alapértelmezett `~/.omniroute` tárolási útvonalat             |

<details>
<summary><b>📖 Funkció részletei</b></summary>

### 🎯 Intelligens 4 szintes tartalék

Hozzon létre kombókat automatikus visszaállítással:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Valós idejű kvótakövetés

- Token fogyasztás szolgáltatónként
- Visszaszámlálás visszaállítása (5 órás, napi, heti)
- Költségbecslés a fizetett szintekre
- Havi kiadási jelentések

### 🔄 Formátum fordítás

Zökkenőmentes fordítás a formátumok között:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI válaszok**
- A CLI eszköz OpenAI formátumot küld → OmniRoute lefordítja → szolgáltató natív formátumot kap
- Minden olyan eszközzel működik, amely támogatja az egyéni OpenAI végpontokat
- **Válaszfertőtlenítés** - Törli a nem szabványos mezőket a szigorú OpenAI SDK-kompatibilitás érdekében
- **Szerepnormalizálás** — `developer` → `system` nem OpenAI esetén; `system` → `user` GLM/ERNIE modellekhez
- **Gondolkodó címke kivonatolás** — `<think>` blokkok → `reasoning_content` gondolkodó modellekhez
- **Strukturált kimenet** — `json_schema` → Gemini's `responseMimeType`/`responseSchema`

### 👥 Többfiókos támogatás

- Több fiók hozzáadása szolgáltatónként
- Automatikus körbefutó vagy prioritás alapú útvonalválasztás
- Visszatérés a következő fiókhoz, ha valamelyik eléri a kvótát

### 🔄 Token automatikus frissítése

- Az OAuth-tokenek a lejárat előtt automatikusan frissülnek
- Nincs szükség manuális újrahitelesítésre
- Zökkenőmentes tapasztalat az összes szolgáltatónál

### 🎨 Egyéni kombók

- Korlátlan számú modellkombináció létrehozása
- 6 stratégia: töltsd ki először, körbefutó, kettős választási lehetőség, véletlenszerű, legkevésbé használt, költségoptimalizált
- Oszd meg a kombinációkat az eszközök között a Cloud Sync segítségével

### 🏥 Egészségügyi irányítópult

- Rendszerállapot (üzemidő, verzió, memóriahasználat)
- A megszakítók állapotai szolgáltatónként (zárt/nyitott/félig nyitva)
- Díjkorlát állapot és aktív zárolások
- Az aláírás gyorsítótár statisztikái
- Késési telemetria (p50/p95/p99) + gyorsítótár
- Állítsa vissza az egészségi állapotot egyetlen kattintással

### 🔧 Fordítói Játszótér

Az OmniRoute egy erőteljes beépített fordítói játszóteret tartalmaz **4 móddal** az API-fordítások hibakereséséhez, teszteléséhez és figyeléséhez:

| mód                | Leírás                                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Játszótér**   | Közvetlen formátumfordítás – illessze be az API kérés törzsét, és azonnal megtudhatja, hogyan fordítja le az OmniRoute azt a szolgáltatói formátumok között (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Példa sablonokat és formátum automatikus felismerést tartalmaz. |
| **💬 Chat Tester** | Küldjön valódi csevegési kérelmeket az OmniRoute-on keresztül, és tekintse meg a teljes körutazást: a bemenetet, a lefordított kérést, a szolgáltatói választ és a visszafordított választ. Felbecsülhetetlen a kombinált útválasztás érvényesítéséhez.                 |
| **🧪 Tesztpad**    | Kötegelt tesztelési mód — határozzon meg több tesztesetet különböző bemenetekkel és várható kimenetekkel, futtassa le egyszerre, és hasonlítsa össze a szolgáltatók és modellek eredményeit.                                                                            |
| **📱 Élő monitor** | Valós idejű kérések figyelése – figyelje a bejövő kéréseket, ahogy azok az OmniRoute-on keresztül áramlanak, nézze meg a formátumfordításokat élőben, és azonnal azonosítsa a problémákat.                                                                              |

**Hozzáférés:** Irányítópult → Fordító (oldalsáv)

### 💾 Cloud Sync

- Szinkronizálja a szolgáltatókat, kombinációkat és beállításokat az eszközök között
- Automatikus háttérszinkronizálás
- Biztonságos titkosított tárhely

</details>

## 🧪 Értékelések (Evals)

Az OmniRoute egy beépített értékelési keretrendszert tartalmaz az LLM-válasz minőségének tesztelésére egy aranykészlettel összehasonlítva. Az irányítópult **Analytics → Evals** menüpontjában érheti el.

### Beépített arany készlet

Az előre feltöltött "OmniRoute Golden Set" 10 tesztesetet tartalmaz, amelyek lefedik:

- Üdvözlet, matematika, földrajz, kódgenerálás
- JSON formátum megfelelés, fordítás, leértékelés
- Biztonsági elutasítás (káros tartalom), számlálás, logikai logika

### Értékelési stratégiák

| Stratégia  | Leírás                                                                                            | Példa                            |
| ---------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| `exact`    | A kimenetnek pontosan meg kell egyeznie                                                           | `"4"`                            |
| `contains` | A kimenetnek tartalmaznia kell részkarakterláncot (a kis- és nagybetűk nem különböznek egymástól) | `"Paris"`                        |
| `regex`    | A kimenetnek meg kell egyeznie a regex mintával                                                   | `"1.*2.*3"`                      |
| `custom`   | Az egyéni JS függvény igaz/hamis                                                                  | `(output) => output.length > 10` |

---

## 📖 Beállítási útmutató

<details>
<summary><b>💳 Előfizetési szolgáltatók</b></summary>

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

**Profi tipp:** Használja az Opust összetett feladatokhoz, a Sonnet pedig a sebességhez. Az OmniRoute nyomkövetési kvóta modellenként!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (INGYENES 180 000/hó!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Legjobb érték:** Hatalmas ingyenes szint! Használja ezt a fizetett szintek előtt.

### GitHub másodpilóta

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
<summary><b>🔑 API kulcs szolgáltatók</b></summary>

### NVIDIA NIM (INGYENES 1000 kredit!)

1. Regisztráljon: [build.nvidia.com](https://build.nvidia.com)
2. Ingyenes API-kulcs beszerzése (1000 következtetési kredit)
3. Irányítópult → Szolgáltató hozzáadása → NVIDIA NIM:
   - API-kulcs: `nvapi-your-key`

**Modellek:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` és több mint 50

**Profi tipp:** OpenAI-kompatibilis API – zökkenőmentesen működik az OmniRoute formátumfordításával!

### DeepSeek

1. Regisztráljon: [platform.deepseek.com](https://platform.deepseek.com)
2. Szerezze be az API-kulcsot
3. Irányítópult → Szolgáltató hozzáadása → DeepSeek

**Modellek:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (ingyenes szint elérhető!)

1. Regisztráljon: [console.groq.com](https://console.groq.com)
2. API-kulcs beszerzése (ingyenes szint tartalmazza)
3. Irányítópult → Szolgáltató hozzáadása → Groq

**Modellek:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Profi tipp:** Ultragyors következtetés – a legjobb valós idejű kódoláshoz!

### OpenRouter (100+ modell)

1. Regisztráljon: [openrouter.ai](https://openrouter.ai)
2. Szerezze be az API-kulcsot
3. Irányítópult → Szolgáltató hozzáadása → OpenRouter

**Modellek:** Hozzáférés több mint 100 modellhez az összes főbb szolgáltatótól egyetlen API-kulccsal.

</details>

<details>
<summary><b>💰 Olcsó szolgáltatók (tartalék)</b></summary>

### GLM-4.7 (napi visszaállítás, 0,6 USD/1 millió)

1. Regisztráljon: [Zhipu AI](https://open.bigmodel.cn/)
2. Szerezze be az API-kulcsot a Coding Plan-ból
3. Irányítópult → API-kulcs hozzáadása:
   - Szolgáltató: `glm`
   - API-kulcs: `your-key`

**Használd:** `glm/glm-4.7`

**Profi tipp:** A kódolási terv 3-szoros kvótát kínál 1/7 költséggel! Visszaállítás naponta 10:00.

### MiniMax M2.1 (5 óra visszaállítás, 0,20 USD/1 millió)

1. Regisztráljon: [MiniMax](https://www.minimax.io/)
2. Szerezze be az API-kulcsot
3. Irányítópult → API-kulcs hozzáadása

**Használd:** `minimax/MiniMax-M2.1`

**Profi tipp:** A legolcsóbb lehetőség hosszú kontextushoz (1 millió token)!

### Kimi K2 (9 USD/hó lakás)

1. Feliratkozás: [Moonshot AI](https://platform.moonshot.ai/)
2. Szerezze be az API-kulcsot
3. Irányítópult → API-kulcs hozzáadása

**Használat:** `kimi/kimi-latest`

**Profi tipp:** Fix 9 USD/hó 10 millió token esetén = 0,90 USD/1 millió tényleges költség!

</details>

<details>
<summary><b>🆓 INGYENES szolgáltatók (vészhelyzeti biztonsági mentés)</b></summary>

### iFlow (8 INGYENES modell)

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

### Qwen (3 INGYENES modell)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude INGYENES)

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
<summary><b>🎨 Kombók létrehozása</b></summary>

### 1. példa: Előfizetés maximalizálása → Olcsó biztonsági mentés

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### 2. példa: Csak ingyenes (nulla költség)

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
<summary><b>🔧 CLI-integráció</b></summary>

### Kurzor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Használja az irányítópult **CLI Tools** oldalát az egykattintásos konfiguráláshoz, vagy szerkessze manuálisan a `~/.claude/settings.json` fájlt.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**1. lehetőség – Irányítópult (ajánlott):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**2. lehetőség – Kézi:** Szerkesztés `~/.openclaw/openclaw.json`:

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

> **Megjegyzés:** Az OpenClaw csak a helyi OmniRoute-tal működik. Használja az `127.0.0.1` `localhost` helyett az IPv6-feloldási problémák elkerülése érdekében.

### Cline / Folytatás / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Hibaelhárítás

<details>
<summary><b>Kattintson a hibaelhárítási útmutató kibontásához</b></summary>

**"A nyelvi modell nem adott üzenetet"**

- A szolgáltatói kvóta kimerült → Ellenőrizze az irányítópult kvótakövetőjét
- Megoldás: Használjon kombinált tartalékot, vagy váltson olcsóbb szintre

**Drátakorlát**

- Előfizetési kvóta lejárt → Tartalék a GLM/MiniMax-hoz
- Kombinó hozzáadása: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth token lejárt**

- Az OmniRoute automatikusan frissíti
- Ha a problémák továbbra is fennállnak: Irányítópult → Szolgáltató → Újracsatlakozás

**Magas költségek**

- Ellenőrizze a használati statisztikákat az Irányítópult → Költségek menüpontban
- Állítsa át az elsődleges modellt GLM/MiniMax-ra
- Használjon ingyenes réteget (Gemini CLI, iFlow) a nem kritikus feladatokhoz

**A műszerfal rossz porton nyílik meg**

- `PORT=20128` és `NEXT_PUBLIC_BASE_URL=http://localhost:20128` beállítása

**Felhő szinkronizálási hibák**

- Ellenőrizze, hogy `BASE_URL` mutat a futó példányra
- Ellenőrizzen `CLOUD_URL` pontot a várható felhő-végponthoz
- Tartsa az `NEXT_PUBLIC_*` értékeket a szerveroldali értékekkel összhangban

**Az első bejelentkezés nem működik**

- Ellenőrizze a `INITIAL_PASSWORD`-t itt: `.env`
- Ha nincs beállítva, a tartalék jelszó: `123456`

**Nincs kérésnapló**

- Állítsa be `ENABLE_REQUEST_LOGS=true` a `.env`-ban

**A csatlakozási teszt „Érvénytelen” üzenetet mutat az OpenAI-kompatibilis szolgáltatók esetében**

- Sok szolgáltató nem tesz közzé `/models` végpontot
- Az OmniRoute v1.0.6+ tartalmazza a tartalék érvényesítést a csevegés befejezésén keresztül
- Győződjön meg arról, hogy az alap URL tartalmazza a `/v1` utótagot

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ FONTOS az OmniRoute em VPS/Docker/servidor Remoto használatához**

### OAuth

Az **Antigravitáció** és a **Gemini CLI** usam **Google OAuth 2.0** hitelesítése. A Google exige que a `redirect_uri` nincs fluxo OAuth seja **exatamente** uma das URI-k pre-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor Remoto (pl.: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Megoldás: A suas próprias credenciais OAuth konfigurálása

Você precisa criar um **OAuth 2.0 ügyfél-azonosító** nincs Google Cloud Console com egy URI do seu servidor.

#### Passo a passo

**1. Acesse o Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo OAuth 2.0 ügyfél-azonosító**

- Kattintson a gombra **"+ Hitelesítési adatok létrehozása"** → **"OAuth-kliens-azonosító"**
- Tipo de Aplicativo: **"Web alkalmazás"**
- Név: escolha qualquer nome (pl.: `OmniRoute Remote`)

**3. Adicione mint engedélyezett átirányítási URI**

No campo **"Engedélyezett átirányítási URI-k"**, kiegészítés:

```
https://seu-servidor.com/callback
```

> Helyettesítő `seu-servidor.com` pelo domínio vagy IP do seu servidor (beleértve a porta se necessário-t is, pl.: `http://45.33.32.156:20128/callback`).

**4. Másolat mentése hitelesítésként**

Após criar, o Google mostrará o **Client ID** e o **Client Secret**.

**5. Konfigurálás variáveis de ambienteként**

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

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Irányítópult → Szolgáltatók → Antigravity (vagy Gemini CLI) → OAuth

Agora o Google redirecionará corretamente para `https://seu-servidor.com/callback` e a autenticação funcionará.

---

### Kerülő megoldás temporário (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute abrirá a Google autorização URL-jét
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. ** Teljes URL másolása** da barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kattintson a **"Connect"** gombra

> Este workaround funciona porque o código de autorização na URL é válido independente do redirect ter carregado ou não.

</details>

---

## 🛠️

- **Futtatási idejű**: Node.js 18–22 LTS (⚠️ A Node.js 24+ **nem támogatott** - A `better-sqlite3` natív binárisok nem kompatibilisek)
- **Nyelv**: TypeScript 5.9 – **100% TypeScript** `src/` és `open-sse/` (v1.0.6) között
- **Keretrendszer**: Next.js 16 + React 19 + Tailwind CSS 4
- **Adatbázis**: LowDB (JSON) + SQLite (tartomány állapota + proxynaplók)
- **Streaming**: Szerver által küldött események (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API kulcsok
- **Tesztelés**: Node.js tesztfutó (368+ egységteszt)
- **CI/CD**: GitHub Actions (automatikus npm közzététel + Docker Hub kiadáskor)
- **Webhely**: [omniroute.online](https://omniroute.online)
- **Csomag**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Dokker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Rugalmasság**: megszakító, exponenciális visszakapcsolás, mennydörgés elleni csorda, TLS-hamisítás

---

## 📖 Dokumentáció

| dokumentum                                   | Leírás                                             |
| -------------------------------------------- | -------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Szolgáltatók, kombók, CLI-integráció, telepítés    |
| [API Reference](docs/API_REFERENCE.md)       | Minden végpont példákkal                           |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Gyakori problémák és megoldások                    |
| [Architecture](docs/ARCHITECTURE.md)         | Rendszerarchitektúra és belső elemek               |
| [Contributing](CONTRIBUTING.md)              | Fejlesztési beállítások és irányelvek              |
| [OpenAPI Spec](docs/openapi.yaml)            | OpenAPI 3.0 specifikáció                           |
| [Security Policy](SECURITY.md)               | Sebezhetőségi jelentések és biztonsági gyakorlatok |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Teljes útmutató: VM + nginx + Cloudflare beállítás |
| [Features Gallery](docs/FEATURES.md)         | Vizuális irányítópult bemutató képernyőképekkel    |

### 📸 Irányítópult előnézete

<details>
<summary><b>Kattintson az irányítópult képernyőképeinek megtekintéséhez</b></summary>

| Oldal                 | Képernyőkép                                       |
| --------------------- | ------------------------------------------------- |
| **Szolgáltatók**      | ![Providers](docs/screenshots/01-providers.png)   |
| **Combos**            | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**         | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Egészség**          | ![Health](docs/screenshots/04-health.png)         |
| **Fordító**           | ![Translator](docs/screenshots/05-translator.png) |
| **Beállítások**       | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI eszközök**      | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Használati naplók** | ![Usage](docs/screenshots/08-usage.png)           |
| **Végpont**           | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

Az OmniRoute **210+ funkciót tervez** több fejlesztési fázisban. Íme a legfontosabb területek:

| Kategória                           | Tervezett funkciók | Kiemelések                                                                                             |
| ----------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| 🧠 **Útválasztás és intelligencia** | 25+                | Legkisebb késleltetésű útválasztás, címke alapú útválasztás, kvóta elővizsgálat, P2C-fiók kiválasztása |
| 🔒 **Biztonság és megfelelőség**    | 20+                | SSRF keményítés, hitelesítő adatok álcázása, végpontonkénti sebességkorlát, felügyeleti kulcs hatóköre |
| 📊 **Megfigyelhetőség**             | 15+                | OpenTelemetry integráció, valós idejű kvótafigyelés, modellenkénti költségkövetés                      |
| 🔄 ** Szolgáltatói integrációk**    | 20+                | Dinamikus modellnyilvántartás, szolgáltatói leállások, többfiókos Codex, másodpilóta kvótaelemzés      |
| ⚡ **Teljesítmény**                 | 15+                | Kettős gyorsítótárréteg, gyorsítótár, válaszgyorsítótár, folyamatos adatfolyam, kötegelt API           |
| 🌐 **Ökoszisztéma**                 | 10+                | WebSocket API, config hot-reload, elosztott konfigurációs tároló, kereskedelmi mód                     |

### 🔜 Hamarosan

- 🔗 **OpenCode integráció** - Natív szolgáltatói támogatás az OpenCode AI kódoló IDE-hez
- 🔗 **TRAE integráció** — A TRAE AI fejlesztési keret teljes támogatása
- 📦 **Batch API** - Aszinkron kötegelt feldolgozás tömeges kérésekhez
- 🎯 **Címke alapú útválasztás** - Egyéni címkéken és metaadatokon alapuló útvonalkérések
- 💰 **Legalacsonyabb költségű stratégia** - Automatikusan válassza ki a legolcsóbb elérhető szolgáltatót

> 📝 A teljes funkció specifikációi a [link](docs/new-features/) címen érhetők el (217 részletes specifikáció)

---

## 👥 Közreműködők

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Hogyan járuljunk hozzá

1. Fork a tároló
2. Hozza létre saját jellemző ágát (`git checkout -b feature/amazing-feature`)
3. Végezze el módosításait (`git commit -m 'Add amazing feature'`)
4. Nyomja az ágra (`git push origin feature/amazing-feature`)
5. Nyisson meg egy lehívási kérelmet

A részletes útmutatásért lásd: [CONTRIBUTING.md](CONTRIBUTING.md).

### Új verzió kiadása

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Csillagtörténet

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Köszönetnyilvánítás

Külön köszönet **[9router](https://github.com/decolua/9router)**, **[decolua](https://github.com/decolua)** – az eredeti projekt, amely ezt a villát inspirálta. Az OmniRoute erre a hihetetlen alapra épít további funkciókkal, multimodális API-kkal és teljes TypeScript-újraírással.

Külön köszönet **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** – az eredeti Go implementációnak, amely ihlette ezt a JavaScript-portot.

---

## 📄 Licenc

MIT-licenc – a részletekért lásd: [LICENSE](LICENSE).

---

<div align="center">
  <sub>A ❤️ segítségével készült a 24/7 kódoló fejlesztőknek</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
