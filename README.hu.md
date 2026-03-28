# 🚀 OmniRoute – Az ingyenes mesterséges intelligencia átjáró

### Soha ne hagyd abba a kódolást. Intelligens útválasztás **INGYENES és alacsony költségű mesterséges intelligencia modellekhez** automatikus visszaállítással.

_Az univerzális API-proxy – egy végpont, 67+ szolgáltató, nulla állásidő. Most **MCP és A2A** ügynök hangszereléssel._

**Csevegés befejezése • Beágyazások • Képgenerálás • Videó • Zene • Hang • Újrarangsorolás • **Webes keresés** • MCP-szerver • A2A protokoll • 100% TypeScript**

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

🌐 **Elérhető:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 A v3.0.0 újdonságai

> **Frissítés a 2.9.5-ös verzióról?** — Az összes változást lásd a [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) dokumentumban.

| Terület                                   | Változás                                                                                                                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **CodeQL Security**                    | Javított 10+ CodeQL riasztás: polinomiális újraadás, bizonytalan véletlenszerűség, shell-injekciós helyreállítás                                                                                                            |
| ✅ **Útvonal ellenőrzése**                | Mind a 176 API-útvonal érvényes Zod-sémákkal + `validateBody()` — CI `check:route-validation:t06`                                                                                                                           |
| 🐛 **omniModel címkeszivárgás**           | A belső `<omniModel>` címkék többé nem szivárognak ki az ügyfelekhez az SSE streaming válaszaiban (#585)                                                                                                                    |
| 🔑 **Regisztrált kulcsok API**            | API-kulcsok automatikus rendelkezésre bocsátása a `POST /api/v1/registered-keys`-on keresztül szolgáltatónkénti/fiókonkénti kvóta-érvényesítéssel, idempotenciával, SHA-256 tárhellyel és opcionális GitHub-hibajelentéssel |
| 🎨 ** Szolgáltatói ikonok**               | 130+ szolgáltatói logó a `@lobehub/icons` (SVG)-n keresztül PNG-vel → általános tartaléklánc                                                                                                                                |
| 🔄 **Modell automatikus szinkronizálása** | 24 órás ütemező és kézi felhasználói felület kapcsoló a beépített és egyéni OpenAI-kompatibilis szolgáltatók modelllistáinak szinkronizálásához                                                                             |
| 🌐 **OpenCode Zen/Go**                    | Két új szolgáltató a @kang-heewontól a PR #530-on keresztül: ingyenes szint + előfizetési szint a következőn keresztül: `OpencodeExecutor`                                                                                  |
| 🐛 **Gemini CLI OAuth**                   | Intézhető hiba, amikor a `GEMINI_OAUTH_CLIENT_SECRET` hiányzik a Dockerből (rejtélyes Google-hiba volt)                                                                                                                     |
| 🐛 **OpenCode konfiguráció**              | `saveOpenCodeConfig()` most helyesen írja a TOML-t a `XDG_CONFIG_HOME`-ba                                                                                                                                                   |
| 🐛 **Rögzített modell felülbírálása**     | `body.model` helyesen `pinnedModel` értékre állítva a környezet-gyorsítótár védelemben                                                                                                                                      |
| 🐛 **Codex/Claude hurok**                 | `tool_result` blokkok szöveggé konvertálva a végtelen hurkok leállítására                                                                                                                                                   |
| 🐛 **Bejelentkezés átirányítása**         | A bejelentkezés már nem fagy le, miután kihagyta a jelszóbeállítást                                                                                                                                                         |
| 🐛 **Windows útvonalak**                  | Az MSYS2/Git-Bash elérési utak (`/c/...`) automatikusan `C:\...`-ra normalizálva                                                                                                                                            |

---

## 🖼️ Fő irányítópult

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Irányítópult előnézete

<details>
<summary><b>Kattintson az irányítópult képernyőképeinek megtekintéséhez</b></summary>

| oldal                 | Képernyőkép                                       |
| --------------------- | ------------------------------------------------- |
| **Szolgáltatók**      | ![Providers](docs/screenshots/01-providers.png)   |
| **Combos**            | ![Combos](docs/screenshots/02-combos.png)         |
| **Analytics**         | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Egészség**          | ![Health](docs/screenshots/04-health.png)         |
| **Fordító**           | ![Translator](docs/screenshots/05-translator.png) |
| **Beállítások**       | ![Settings](docs/screenshots/06-settings.png)     |
| **CLI eszközök**      | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Használati naplók** | ![Usage](docs/screenshots/08-usage.png)           |
| **Végpontok**         | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Ingyenes mesterséges intelligencia szolgáltató kedvenc kódoló ügynökei számára

_Csatlakoztasson bármilyen mesterséges intelligencia-alapú IDE-t vagy CLI-eszközt az OmniRoute-on keresztül – ingyenes API-átjáró a korlátlan kódoláshoz._

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

<sub>📡 Minden ügynök a következőn keresztül csatlakozik: <code>http://localhost:20128/v1</code> vagy <code>http://cloud.omni_TOKEN_465\_\_http://cloud.omniroute konfiguráció, korlátlan modellek és kvóta</sub>

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
- **Hozzájárulás**: Lásd [CONTRIBUTING.md](CONTRIBUTING.md), nyisson PR-t, vagy válasszon egy `good first issue`
- **Eredeti projekt**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Hibát jelent?

Egy probléma megnyitásakor futtassa a system-info parancsot, és csatolja a generált fájlt:

```bash
npm run system-info
```

Ez létrehoz egy `system-info.txt`-t a Node.js verziójával, az OmniRoute verziójával, az operációs rendszer részleteivel, a telepített CLI-eszközökkel (iflow, gemini, claude, codex, antigravitáció, droid stb.), Docker/PM2 állapottal és rendszercsomagokkal – mindennel, amire szükségünk van a probléma gyors reprodukálásához. Csatolja a fájlt közvetlenül a GitHub-problémához.

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
<summary><b>💸 1. "Drága előfizetésért fizetek, de még mindig megszakítanak a korlátok"</b></summary>

A fejlesztők havi 20–200 dollárt fizetnek a Claude Pro, Codex Pro vagy GitHub Copilotért. A kvótának még fizetés esetén is van felső határa – 5 óra használat, heti limitek vagy percdíjkorlátok. A kódolási munkamenet közepén a szolgáltató leáll, és a fejlesztő elveszíti a folyamatot és a termelékenységet.

**Hogyan oldja meg az OmniRoute:**

- **Smart 4-Tier Fallback** – Ha az előfizetési kvóta kimerül, automatikusan átirányítja az API-kulcs → Olcsó → Ingyenes, manuális beavatkozás nélkül
- **Valós idejű kvótakövetés** – Valós időben mutatja a token felhasználást, visszaszámlálással (5 óra, napi, heti)
- **Több fiók támogatása** - Több fiók szolgáltatónként automatikus körváltással - ha az egyik elfogy, átvált a következőre
- **Egyéni kombók** — Testreszabható tartalék láncok 6 kiegyensúlyozási stratégiával (fill-first, round-robin, P2C, véletlenszerű, legkevésbé használt, költségoptimalizált)
- **Codex üzleti kvóták** — Üzleti/csapat munkaterület-kvóta figyelése közvetlenül az irányítópulton

</details>

<details>
<summary><b>🔌 2. "Több szolgáltatót kell használnom, de mindegyiknek más az API"</b></summary>

Az OpenAI egy formátumot használ, a Claude (Anthropic) egy másikat, a Gemini pedig egy másikat. Ha egy fejlesztő különböző szolgáltatók modelljeit szeretné tesztelni, vagy tartalékot szeretne közöttük, akkor újra kell konfigurálnia az SDK-kat, módosítania kell a végpontokat, és kezelnie kell az inkompatibilis formátumokat. Az egyéni szolgáltatók (FriendLI, NIM) nem szabványos modellvégpontokkal rendelkeznek.

**Hogyan oldja meg az OmniRoute:**

- **Egységes végpont** - Egyetlen `http://localhost:20128/v1` proxyként szolgál mind a 67+ szolgáltató számára
- **Formátumfordítás** - Automatikus és átlátható: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Response Sanitization** – Törli azokat a nem szabványos mezőket (`x_groq`, `usage_breakdown`, `service_tier`), amelyek megsértik az OpenAI SDK v1.83+ verzióját
- **Szerepek normalizálása** — `developer` → `system` konvertálása nem OpenAI szolgáltatók számára; `system` → `user` a GLM/ERNIE számára
- **Think Tag Extraction** – `<think>` blokkot bont ki olyan modellekből, mint a DeepSeek R1 szabványos `reasoning_content`
- **Strukturált kimenet a Gemini számára** — `json_schema` → `responseMimeType`/`responseSchema` automatikus átalakítás
- **`stream` alapértelmezett értéke `false`** - Az OpenAI specifikációhoz igazodik, elkerülve a váratlan SSE-t a Python/Rust/Go SDK-kban

</details>

<details>
<summary><b>🌐 3. "Az AI-szolgáltatóm blokkolja a régiómat/országomat"</b></summary>

Az olyan szolgáltatók, mint az OpenAI/Codex, blokkolják a hozzáférést bizonyos földrajzi régiókból. A felhasználók olyan hibákat kapnak, mint az `unsupported_country_region_territory` az OAuth- és API-kapcsolatok során. Ez különösen frusztráló a fejlődő országok fejlesztői számára.

**Hogyan oldja meg az OmniRoute:**

- **3-szintű proxykonfiguráció** – 3 szinten konfigurálható proxy: globális (teljes forgalom), szolgáltatónként (csak egy szolgáltató) és kapcsolatonként/kulcsonként
- **Színes proxy jelvények** - Vizuális jelzők: 🟢 globális proxy, 🟡 szolgáltató proxy, 🔵 kapcsolat proxy, mindig az IP-t mutatja
- **OAuth-tokencsere proxyn keresztül** - Az OAuth-folyamat a proxyn keresztül is megy, megoldva a `unsupported_country_region_territory`
- **Kapcsolódási tesztek proxyn keresztül** - A csatlakozási tesztek a konfigurált proxyt használják (nincs többé közvetlen kiiktatás)
- **SOCKS5 támogatás** — Teljes SOCKS5 proxy támogatás a kimenő útválasztáshoz
- **TLS-ujjlenyomat-hamisítás** — Böngészőszerű TLS-ujjlenyomat a `wreq-js`-on keresztül a botészlelés megkerüléséhez
- **🔏 CLI Fingerprint Matching** – A fejlécek és törzsmezők átrendezése a natív CLI bináris aláírásokhoz igazodva, drasztikusan csökkentve a fiók megjelölésének kockázatát. A proxy IP-címe megmarad – egyszerre kapja meg a lopakodó **és** IP-maszkolást

</details>

<details>
<summary><b>🆓 4. "AI-t akarok használni kódoláshoz, de nincs pénzem"</b></summary>

Nem mindenki fizethet havi 20–200 dollárt az AI-előfizetésekért. A feltörekvő országok diákjainak, fejlesztőinek, amatőröknek és szabadúszóknak nulla költséggel kell hozzáférniük a minőségi modellekhez.

**Hogyan oldja meg az OmniRoute:**

- **Beépített ingyenes szolgáltatók** - Natív támogatás a 100%-ban ingyenes szolgáltatókhoz: iFlow (5 korlátlan modell az OAuth-on keresztül: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen-modellek: 4 unqlim-plus3 qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID ingyen), Gemini CLI (180 000 token/hónap ingyenes)
- **Ollama Cloud** – Felhőben tárolt Ollama modellek a `api.ollama.com` címen ingyenes „Light usage” szinttel; használja az `ollamacloud/<model>` előtagot
- **Csak ingyenes kombók** - Lánc `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = 0 USD/hó nulla állásidővel
- **NVIDIA NIM ingyenes hozzáférés** – ~40 RPM fejlesztői örökké ingyenes hozzáférés több mint 70 modellhez a build.nvidia.com oldalon (áttérés a kreditekről a tiszta sebességkorlátokra)
- **Költségoptimalizált stratégia** — Útválasztási stratégia, amely automatikusan a legolcsóbb elérhető szolgáltatót választja

</details>

<details>
<summary><b>🔒 5. "Meg kell védenem a mesterséges intelligencia átjárómat a jogosulatlan hozzáféréstől"</b></summary>

Ha AI átjárót teszünk ki a hálózatnak (LAN, VPS, Docker), a cím birtokában bárki felhasználhatja a fejlesztő tokenjeit/kvótáját. Védelem nélkül az API-k sebezhetőek a visszaélésekkel, azonnali befecskendezéssel és visszaélésekkel szemben.

**Hogyan oldja meg az OmniRoute:**

- **API-kulcskezelés** – Generálás, rotáció és hatókör szolgáltatónként egy dedikált `/dashboard/api-manager` oldallal
- **Modell-szintű engedélyek** – API-kulcsok korlátozása adott modellekre (`openai/*`, helyettesítő karakteres minták), az Összes engedélyezése/Korlátozása kapcsolóval
- **API Endpoint Protection** – Kulcs szükséges a `/v1/models` számára, és bizonyos szolgáltatók letiltása a listáról
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

- **Megszakító típusonként** - Automatikus nyitás/zárás konfigurálható küszöbértékekkel és lehűtéssel (zárt/nyitott/félig nyitott), modellenkénti hatókör a lépcsőzetes blokkok elkerülése érdekében
- **Exponenciális visszalépés** — Progresszív újrapróbálkozási késések
- **Mennydörgés elleni csorda** - Mutex + szemafor védelem az egyidejű újrapróbálkozási viharok ellen
- **Kombinált tartalék láncok** – Ha az elsődleges szolgáltató meghibásodik, automatikusan, beavatkozás nélkül átesik a láncon
- **Combo Circuit Breaker** – Automatikusan letiltja a hibás szolgáltatókat a kombinált láncon belül
- **Egészségügyi irányítópult** — Üzemidő-figyelés, áramkör-megszakító állapotok, zárolások, gyorsítótár-statisztika, p50/p95/p99 késleltetés

</details>

<details>
<summary><b>🔧 7. „Az egyes mesterséges intelligencia-eszközök konfigurálása fárasztó és ismétlődő”</b></summary>

A fejlesztők Cursort, Claude Code-ot, Codex CLI-t, OpenClaw-ot, Gemini CLI-t, Kilo Code-ot használnak... Minden eszköznek más konfigurációra van szüksége (API végpont, kulcs, modell). Az újrakonfigurálás szolgáltató- vagy modellváltáskor időpocsékolás.

**Hogyan oldja meg az OmniRoute:**

- **CLI Tools Dashboard** - Dedikált oldal egykattintásos beállítással a Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline számára
- **GitHub másodpilóta konfigurációs generátor** – `chatLanguageModels.json` generál VS kódhoz tömeges modellválasztással
- **Bevezető varázsló** – Irányított 4 lépéses beállítás első felhasználók számára
- **Egy végpont, minden modell** - A `http://localhost:20128/v1` egyszeri konfigurálása, 67+ szolgáltató elérése

</details>

<details>
<summary><b>🔑 8. "A több szolgáltatótól származó OAuth-tokenek kezelése pokol"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot – mindegyik az OAuth 2.0-t használja lejáró tokenekkel. A fejlesztőknek folyamatosan újra kell hitelesíteniük, kezelniük kell a `client_secret is missing`, `redirect_uri_mismatch` és a távoli kiszolgálók hibáit. Az OAuth a LAN/VPS-en különösen problémás.

**Hogyan oldja meg az OmniRoute:**

- **Automatikus tokenfrissítés** - Az OAuth-tokenek a háttérben frissülnek a lejárat előtt
- **OAuth 2.0 (PKCE) beépített** - Automatikus áramlás Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow számára
- **Multi-Account OAuth** - Több fiók szolgáltatónként a JWT/ID token kivonattal
- **OAuth LAN/Távoli javítás** - Privát IP-észlelés a `redirect_uri` számára + kézi URL mód távoli szerverekhez
- **OAuth az Nginx mögött** - A `window.location.origin` kódot használja a fordított proxy kompatibilitáshoz
- **Távoli OAuth útmutató** – Lépésről lépésre útmutató a Google Cloud hitelesítő adataihoz VPS/Docker rendszeren

</details>

<details>
<summary><b>📊 9. "Nem tudom, mennyit költök és hol"</b></summary>

A fejlesztők több fizetős szolgáltatót használnak, de nincs egységes nézetük a kiadásokról. Minden szolgáltató saját számlázási irányítópulttal rendelkezik, de nincs összevont nézet. A váratlan költségek felhalmozódhatnak.

**Hogyan oldja meg az OmniRoute:**

- **Költségelemzési irányítópult** – Tokenenkénti költségkövetés és költségkeret-kezelés szolgáltatónként
- **Költségkeret-korlátok rétegenként** - Költési felső határ szintenként, amely automatikus visszalépést vált ki
- **Per-Model Pricing Configuration** — Configurable prices per model
- **Használati statisztika API-kulcsonként** — A kérések száma és az utoljára használt időbélyeg kulcsonként
- **Analytics Dashboard** — Statisztikai kártyák, modellhasználati diagram, szolgáltatói táblázat sikerarányokkal és késleltetéssel

</details>

<details>
<summary><b>🐛 10. "Nem tudom diagnosztizálni a hibákat és problémákat az AI-hívásoknál"</b></summary>

Ha egy hívás meghiúsul, a fejlesztő nem tudja, hogy sebességkorlátozás, lejárt token, rossz formátum vagy szolgáltatói hiba volt-e. Töredezett naplók a különböző terminálokon. Megfigyelhetőség nélkül a hibakeresés próba és hiba.

**Hogyan oldja meg az OmniRoute:**

- **Unified Logs Dashboard** — 4 tabs: Request Logs, Proxy Logs, Audit Logs, Console
- **Konzolnapló-nézegető** — Valós idejű terminál stílusú megjelenítő színkódolt szintekkel, automatikus görgetés, keresés, szűrés
- **SQLite proxynaplók** – Állandó naplók, amelyek túlélik a szerver újraindítását
- **Translator Playground** – 4 hibakeresési mód: Playground (formátum fordítás), Chat Tester (oda-vissza út), Tesztpad (kötegelt), Élő monitor (valós idejű)
- **Request Telemetria** – p50/p95/p99 késleltetés + X-Request-Id nyomkövetés
- **Fájlalapú naplózás elforgatással** - A konzolelfogó mindent JSON-naplóba rögzít méretalapú elforgatással
- **Rendszerinformációs jelentés** — A `npm run system-info` a teljes környezettel (Node-verzió, OmniRoute-verzió, OS, CLI-eszközök, Docker/PM2 állapot) `system-info.txt`-t generál. Csatolja, amikor az azonnali osztályozással kapcsolatos problémákat jelent be.

</details>

<details>
<summary><b>🏗️ 11. "Az átjáró telepítése és karbantartása összetett"</b></summary>

Az AI-proxy telepítése, konfigurálása és karbantartása különböző környezetekben (helyi, VPS, Docker, felhő) munkaigényes. Az olyan problémák, mint a keménykódolt elérési utak, a `EACCES` a könyvtárakon, a portütközések és a többplatformos buildek súrlódást okoznak.

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

- **I18n irányítópult – 30 nyelv** – Mind az 500+ billentyű lefordítva, beleértve arab, bolgár, dán, német, spanyol, finn, francia, héber, hindi, magyar, indonéz, olasz, japán, koreai, maláj, holland, norvég, lengyel, portugál (PT/BR), román, thai, orosz, szlovák, svéd, filippínó, angol, thai, orosz, kínai, filippínó
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
- **Szövegfelolvasó** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + meglévő szolgáltatók
- **Moderálás** - `/v1/moderations` - Tartalombiztonsági ellenőrzések
- **Újrarangsorolás** - `/v1/rerank` - Dokumentumreleváns átsorolás
- **Responses API** - Teljes `/v1/responses` támogatás a Codex számára

</details>

<details>
<summary><b>🧪 14. "Nincs módom tesztelni és összehasonlítani a modellek minőségét"</b></summary>

A fejlesztők szeretnék tudni, hogy melyik modell a legjobb az ő használati esetükben – kód, fordítás, érvelés –, de a manuális összehasonlítás lassú. Nem léteznek integrált eval eszközök.

**Hogyan oldja meg az OmniRoute:**

- **LLM-értékelések** — Arany készlet tesztelése 10 előre betöltött esettel, beleértve az üdvözlést, a matematikát, a földrajzot, a kódgenerálást, a JSON-megfelelőséget, a fordítást, a leértékelést, a biztonsági megtagadást
- **4 egyezési stratégia** — `exact`, `contains`, `regex`, `custom` (JS függvény)
- **Translator Playground Test Bench** - Kötegelt tesztelés több bemenettel és várható kimenettel, szolgáltatók közötti összehasonlítás
- **Csevegés tesztelő** - Teljes körút vizuális válaszmegjelenítéssel
- **Élő monitor** – Valós idejű adatfolyam a proxyn keresztül folyó összes kérésről

</details>

<details>
<summary><b>📈 15. "A teljesítmény elvesztése nélkül kell méreteznem"</b></summary>

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
<summary><b>🤖 16. "Globálisan szeretném irányítani a modell viselkedését"</b></summary>

Azok a fejlesztők, akik minden választ egy adott nyelven, egy adott hangnemben szeretnének, vagy korlátozni szeretnék az érvelési tokeneket. Ennek konfigurálása minden eszközben/kérelemben nem praktikus.

**Hogyan oldja meg az OmniRoute:**

- **Rendszerprompt Injection** — Globális prompt minden kérelemre vonatkozik
- **A költségkeret átgondolásának ellenőrzése** – Indoklási token-kiosztás ellenőrzése kérésenként (áthaladó, automatikus, egyéni, adaptív)
- **6 Útválasztási stratégia** – Globális stratégiák, amelyek meghatározzák a kérések elosztását
- **Wildcard Router** - `provider/*` minták dinamikusan továbbítanak bármely szolgáltatóhoz
- **Kombinációs engedélyezés/letiltás váltás** - A kombók váltása közvetlenül az irányítópultról
- **Provider Toggle** — Egy szolgáltató összes kapcsolatának engedélyezése/letiltása egyetlen kattintással
- **Letiltott szolgáltatók** - Adott szolgáltatók kizárása a `/v1/models` listáról

</details>

<details>
<summary><b>🧰 17. "MCP-eszközökre van szükségem, mint első osztályú termékképességekre"</b></summary>

Sok mesterséges intelligencia-átjáró csak rejtett megvalósítási részletként teszi közzé az MCP-t. A csapatoknak látható, kezelhető műveleti rétegre van szükségük.

**Hogyan oldja meg az OmniRoute:**

- Az MCP megjelenik az irányítópult navigációs és végponti protokoll lapján
- Dedikált MCP-kezelési oldal folyamatokkal, eszközökkel, hatókörökkel és audittal
- Beépített gyorsindítás a `omniroute --mcp` és a kliens bevezetéséhez

</details>

<details>
<summary><b>🧠 18. "A2A hangszerelésre van szükségem szinkronizálással + adatfolyam feladatútvonalak"</b></summary>

Az ügynöki munkafolyamatokhoz közvetlen válaszokra és hosszú távú, streamelt végrehajtásra van szükség életciklus-vezérléssel.

**Hogyan oldja meg az OmniRoute:**

- A2A JSON-RPC végpont (`POST /a2a`) `message/send` és `message/stream`
- SSE streaming terminál állapot terjesztéssel
- Feladat életciklus API-k a `tasks/get` és `tasks/cancel` számára

</details>

<details>
<summary><b>🛰️ 19. "Valódi MCP folyamatállapotra van szükségem, nem kitalált állapotra"</b></summary>

Az operatív csapatoknak tudniuk kell, hogy az MCP valóban életben van-e, nem csak azt, hogy egy API elérhető-e.

**Hogyan oldja meg az OmniRoute:**

- Futásidejű szívverés fájl PID-vel, időbélyegekkel, szállítással, szerszámszámmal és hatókör móddal
- MCP állapot API, amely kombinálja a szívverést + a legutóbbi tevékenységet
- UI állapotkártyák a folyamat/üzemidő/szívverés frissességéhez

</details>

<details>
<summary><b>📋 20. "Kivizsgálható MCP-eszköz-végrehajtásra van szükségem"</b></summary>

Amikor az eszközök módosítják a konfigurációt vagy működési műveleteket indítanak el, a csapatoknak kriminalisztikai nyomon követhetőségre van szükségük.

**Hogyan oldja meg az OmniRoute:**

- SQLite-alapú auditnaplózás MCP-eszközhívásokhoz
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
<summary><b>⚙️ 22. "Üzemeltetési vezérlőkre van szükségem újratelepítés nélkül"</b></summary>

A csapatoknak gyors futásidejű változtatásokra van szükségük incidensek vagy költségesemények során.

**Hogyan oldja meg az OmniRoute:**

- A kombinált aktiválás váltása közvetlenül az MCP műszerfaláról
- Rugalmassági profilok alkalmazása előre meghatározott házirend-csomagokból
- Állítsa vissza a megszakító állapotát ugyanarról a kezelőpanelről

</details>

<details>
<summary><b>🔄 23. "Szükségem van élő A2A-feladatok életciklusának láthatóságára és törlésére"</b></summary>

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
<summary><b>🪪 25. "Szabványos ügynökfelderítésre van szükségem az ügyfelek számára"</b></summary>

A külső klienseknek és hangszerelőknek géppel olvasható metaadatokra van szükségük a bevezetéshez.

**Hogyan oldja meg az OmniRoute:**

- Ügynökkártya közzétéve: `/.well-known/agent.json`
- A menedzsment felületen látható képességek és készségek
- Az A2A állapot API felfedezési metaadatokat tartalmaz az automatizáláshoz

</details>

<details>
<summary><b>🧭 26. "Protokoll felfedezhetőségre van szükségem az UX termékben"</b></summary>

Ha a felhasználók nem fedezik fel a protokollfelületeket, az elfogadás és a támogatás minősége csökken.

**Hogyan oldja meg az OmniRoute:**

- Összevont **Végpontok** oldal a proxy, MCP, A2A és API végpontok lapjaival
- Inline szolgáltatás állapotát váltja (Online/Offline) MCP és A2A esetén
- Hivatkozások az áttekintésből a dedikált kezelőlapokhoz

</details>

<details>
<summary><b>🧪 27. "Végponttól végpontig terjedő protokoll-érvényesítésre van szükségem valódi kliensekkel"</b></summary>

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
<summary><b>💼 29. "Egy futási környezetre van szükségem a proxyhoz + eszközökhöz + ügynök hangszereléshez"</b></summary>

Számos külön szolgáltatás futtatása növeli a működési költségeket és a hibamódokat.

**Hogyan oldja meg az OmniRoute:**

- OpenAI-kompatibilis proxy, MCP szerver és A2A szerver egy veremben
- Megosztott hitelesítés, rugalmasság, adattárolás és megfigyelhetőség
- Konzisztens politikai modell az összes interakciós felületen

</details>

<details>
<summary><b>🚀 30. "Az ügynöki munkafolyamatokat ragasztókód szétszóródása nélkül kell szállítanom"</b></summary>

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Indítás ingyenes – nulla konfigurációs költség

> Állítsa be az AI-kódolást percek alatt **0 USD/hó** áron. Connect these free accounts and use the built-in **Free Stack** combo.

| lépés | Akció                                                | Szolgáltatók feloldva                                                 |
| ----- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| 1     | Csatlakozás **Kiro** (AWS Builder ID OAuth)          | Claude Sonnet 4.5, Haiku 4.5 — **korlátlan**                          |
| 2     | Csatlakoztassa az **iFlow-t** (Google OAuth)         | kimi-k2-gondolkodás, qwen3-coder-plus, deepseek-r1... — **korlátlan** |
| 3     | Csatlakoztassa a **Qwen** (eszközkód)                | qwen3-coder-plus, qwen3-coder-flash... — **korlátlan**                |
| 4     | Csatlakozás **Gemini CLI** (Google OAuth)            | gemini-3-flash, gemini-2.5-pro – **180K/hó ingyenes**                 |
| 5     | `/dashboard/combos` → **Ingyenes köteg ($0)** sablon | Körbe-körbe minden ingyenes szolgáltató automatikusan                 |

**Mutasson bármely IDE/CLI-t a következőre:** `http://localhost:20128/v1` · API-kulcs: `any-string` · Kész.

> **Opcionális extra lefedettség (szintén ingyenes):** Groq API kulcs (30 RPM ingyenes), NVIDIA NIM (40 RPM ingyenes, 70+ modell), Cerebras (1 millió tok/nap), LongCat API kulcs (50 millió token/nap!), Cloudflare Workers AI (10 000 neuron/nap, 50+ modell).

## ⚡ Gyors kezdés

### 1) Telepítse és futtassa

```bash
npm install -g omniroute
omniroute
```

> **pnpm felhasználók:** Futtassa a `pnpm approve-builds -g` programot a telepítés után, hogy engedélyezze az `better-sqlite3` és `@swc/core` által megkövetelt natív build szkripteket:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Az irányítópult a `http://localhost:20128` címen nyílik meg, az API alap URL-je pedig `http://localhost:20128/v1`.

| Parancs                 | Leírás                                                                  |
| ----------------------- | ----------------------------------------------------------------------- |
| `omniroute`             | Szerver indítása (`PORT=20128`, API és irányítópult ugyanazon a porton) |
| `omniroute --port 3000` | A kanonikus/API port beállítása 3000                                    |
| `omniroute --mcp`       | MCP-kiszolgáló indítása (stdio szállítás)                               |
| `omniroute --no-open`   | Ne nyissa meg automatikusan a böngészőt                                 |
| `omniroute --help`      | Segítség megjelenítése                                                  |

Opcionális osztott portos mód:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Csatlakoztassa a szolgáltatókat, és hozza létre az API-kulcsot

1. Nyissa meg az Irányítópult → `Providers` menüpontot, és csatlakoztasson legalább egy szolgáltatót (OAuth- vagy API-kulcs).
2. Nyissa meg a Dashboard → `Endpoints` menüpontot, és hozzon létre egy API-kulcsot.
3. (Opcionális) Nyissa meg az Irányítópult → `Combos` menüpontot, és állítsa be a tartalék láncot.

### 3) Irányítsa kódoló eszközét az OmniRoute-ra

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode és OpenAI-kompatibilis SDK-kkal működik.

### 4) Protokollok engedélyezése és ellenőrzése (v2.0)

**MCP (szerszámvezérelt műveletekhez):**

```bash
omniroute --mcp
```

Ezután csatlakoztassa MCP-kliensét `stdio`-on keresztül, és tesztelje az olyan eszközöket, mint:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (ügynök-ügynök munkafolyamatokhoz):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Érvényesítsen mindent a végétől a végéig (ajánlott)

```bash
npm run test:protocols:e2e
```

Ez a csomag érvényesíti a valódi MCP- és A2A-kliensfolyamokat egy futó alkalmazással szemben.

### Alternatív megoldás: futtassa a forrásból

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
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

## 🖥️ Asztali alkalmazás – offline és mindig bekapcsolt állapotban

> 🆕 **ÚJ!** Az OmniRoute már elérhető **natív asztali alkalmazásként** Windows, macOS és Linux rendszeren.

Futtassa az OmniRoute-ot önálló asztali alkalmazásként – nincs terminál, nincs böngésző, nincs szükség internetre a helyi modellekhez. Az elektron alapú alkalmazás a következőket tartalmazza:

- 🖥️ **Natív ablak** - Dedikált alkalmazásablak rendszertálca-integrációval
- 🔄 **Automatikus indítás** - Indítsa el az OmniRoute alkalmazást a rendszerbe való bejelentkezéskor
- 🔔 **Natív értesítések** - Értesítést kaphat a kvóta kimerüléséről vagy a szolgáltatói problémákról
- ⚡ **Egykattintásos telepítés** - NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline mód** - Teljesen offline módban működik a mellékelt szerverrel

### Gyors kezdés

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Rendszertálca

Ha minimalizálja, az OmniRoute a tálcán él, gyors műveletekkel:

- Nyissa meg a műszerfalat
- Szerver port módosítása
- Lépjen ki az alkalmazásból

📖 Teljes dokumentáció: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Árazás egy pillantásra

| Tier              | Szolgáltató                   | Költség                             | Kvóta visszaállítása   | Legjobb a                               |
| ----------------- | ----------------------------- | ----------------------------------- | ---------------------- | --------------------------------------- |
| **💳 ELŐFIZETÉS** | Claude Code (Pro)             | 20 USD/hó                           | 5 óra + heti           | Már előfizetett                         |
|                   | Codex (Plus/Pro)              | 20-200 USD/hó                       | 5 óra + heti           | OpenAI felhasználók                     |
|                   | Gemini CLI                    | **INGYENES**                        | 180 000/hó + 1 000/nap | Mindenki!                               |
|                   | GitHub másodpilóta            | 10-19 USD/hó                        | Havi                   | GitHub felhasználók                     |
| **🔑 API KEY**    | NVIDIA NIM                    | **INGYENES** (végre fejlesztő)      | ~40 RPM                | 70+ nyitott modell                      |
|                   | Cerebrák                      | **INGYENES** (1 millió tok/nap)     | 60K TPM / 30 RPM       | A világ leggyorsabb                     |
|                   | Groq                          | **INGYENES** (30 RPM)               | 14,4K RPD              | Ultragyors Llama/Gemma                  |
|                   | DeepSeek V3.2                 | 0,27 USD/1,10 USD/1 millió          | Nincs                  | Legjobb ár/minőség érvelés              |
|                   | xAI Grok-4 Fast               | **0,20 USD/0,50 USD/1 millió** 🆕   | Nincs                  | Leggyorsabb + szerszámhívás, ultralow   |
|                   | xAI Grok-4 (standard)         | 0,20 USD/1,50 USD/1M 🆕             | Nincs                  | Oktatás zászlóshajója az xAI-tól        |
|                   | Mistral                       | Ingyenes próbaverzió + fizetett     | Ár korlátozott         | Európai AI                              |
|                   | OpenRouter                    | Felhasználásonkénti fizetés         | Nincs                  | 100+ modell aggr.                       |
| **💰 OLCSÓ**      | GLM-5 (a Z.AI-n keresztül) 🆕 | 0,5 USD/1M                          | Naponta 10:00          | 128K teljesítmény, legújabb zászlóshajó |
|                   | GLM-4.7                       | 0,6 USD/1M                          | Naponta 10:00          | Költségvetési biztonsági mentés         |
|                   | MiniMax M2.5 🆕               | 0,3 USD/1 millió bemenet            | 5 órás gurulás         | Érvelés + ügynöki feladatok             |
|                   | MiniMax M2.1                  | 0,2 USD/1M                          | 5 órás gurulás         | Legolcsóbb lehetőség                    |
|                   | Kimi K2.5 (Moonshot API) 🆕   | Felhasználásonkénti fizetés         | Nincs                  | Közvetlen Moonshot API hozzáférés       |
|                   | Kimi K2                       | 9 USD/hó lakás                      | 10 millió token/hó     | Előrelátható költség                    |
| **🆓 INGYENES**   | iFlow                         | **0 USD**                           | Korlátlan              | 5 modell korlátlan                      |
|                   | Qwen                          | **0 USD**                           | Korlátlan              | 4 modell korlátlan                      |
|                   | Kiro                          | **0 USD**                           | Korlátlan              | Claude Sonnet/Haiku (AWS Builder)       |
|                   | LongCat Flash-Lite 🆕         | **0 USD** (50 millió tok/nap 🔥)    | 1 RPS                  | A legnagyobb ingyenes kvóta a Földön    |
|                   | Beporzások AI 🆕              | **0 USD** (nincs szükség kulcsra)   | 1 rekv/15mp            | GPT-5, Claude, DeepSeek, Llama 4        |
|                   | Cloudflare Workers AI 🆕      | **0 USD** (10 000 neuron/nap)       | ~150 ill./nap          | 50+ modell, globális élvonal            |
|                   | Scaleway AI 🆕                | **0 USD** (összesen 1 millió token) | Ár korlátozott         | EU/GDPR, Qwen3 235B, Llama 70B          |

> 🆕 **Új modellek hozzáadva (2026. március):** Grok-4 Fast család 0,20 USD/0,50 USD/M áron (1143 ms-os referenciaérték – 30%-kal gyorsabb, mint a Gemini 2.5 Flash), GLM-5 Z.AI-n keresztül 128K kimenettel, MiniMax M2.5 Vc3-on keresztül, K.2.5-ös okfejtéssel, KiepSeed2-vel. Moonshot közvetlen API.

**💡 0 dolláros kombinált halom – a teljes ingyenes beállítás:**

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

**Zéró költség. Soha nem hagyja abba a kódolást.** Konfigurálja ezt egyetlen OmniRoute-kombóként, és minden visszaesés automatikusan megtörténik – soha nincs kézi váltás.

---

---

## 🆓 Ingyenes modellek – Amit valójában kapsz

> Minden alábbi modell **100%-ban ingyenes, hitelkártya nélkül**. Az OmniRoute automatikus útvonalakat indít közöttük, ha egy kvóta kifogy – kombinálja őket egy feltörhetetlen 0 dolláros kombinációért.

### 🔵 CLAUDE MODELLEK (Kiron keresztül – AWS Builder ID)

| Modell              | Előtag | Limit         | Rate Limit                         |
| ------------------- | ------ | ------------- | ---------------------------------- |
| `claude-sonnet-4.5` | `kr/`  | **Korlátlan** | Nincs bejelentett napi felső határ |
| `claude-haiku-4.5`  | `kr/`  | **Korlátlan** | Nincs bejelentett napi felső határ |
| `claude-opus-4.6`   | `kr/`  | **Korlátlan** | Legújabb Opus via Kiro             |

### IFLOW MODELLEK (ingyenes OAuth – hitelkártya nélkül)

| Modell             | Előtag | Limit         | Rate Limit                    |
| ------------------ | ------ | ------------- | ----------------------------- |
| `kimi-k2-thinking` | `if/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `qwen3-coder-plus` | `if/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `deepseek-r1`      | `if/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `minimax-m2.1`     | `if/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `kimi-k2`          | `if/`  | **Korlátlan** | Nincs bejelentett felső határ |

### 🟡 QWEN MODELLEK (Eszközkód hitelesítés)

| Modell              | Előtag | Limit         | Rate Limit                    |
| ------------------- | ------ | ------------- | ----------------------------- |
| `qwen3-coder-plus`  | `qw/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `qwen3-coder-flash` | `qw/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `qwen3-coder-next`  | `qw/`  | **Korlátlan** | Nincs bejelentett felső határ |
| `vision-model`      | `qw/`  | **Korlátlan** | Multimodális (képek)          |

### 🟣 GEMINI CLI (Google OAuth)

| Modell                   | Előtag | Limit                           | Rate Limit         |
| ------------------------ | ------ | ------------------------------- | ------------------ |
| `gemini-3-flash-preview` | `gc/`  | **180 000 tok/hó** + 1 000/nap  | Havi visszaállítás |
| `gemini-2.5-pro`         | `gc/`  | 180 000/hó (megosztott medence) | Kiváló minőségű    |

### ⚫ NVIDIA NIM (ingyenes API-kulcs – build.nvidia.com)

| Tier                 | Napi limit      | Rate Limit  | Megjegyzések                                           |
| -------------------- | --------------- | ----------- | ------------------------------------------------------ |
| Ingyenes (fejlesztő) | Nincs token cap | **~40 RPM** | 70+ modell; átállás a tiszta díjhatárokra 2025 közepén |

Népszerű ingyenes modellek: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`\_, \_\_EN_18

### ⚪ CEREBRAS (ingyenes API-kulcs – inference.cerebras.ai)

| Tier     | Napi limit             | Rate Limit       | Megjegyzések                                                  |
| -------- | ---------------------- | ---------------- | ------------------------------------------------------------- |
| Ingyenes | **1 millió token/nap** | 60K TPM / 30 RPM | A világ leggyorsabb LLM-következtetése; naponta visszaállítja |

Ingyenesen elérhető: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (ingyenes API-kulcs – console.groq.com)

| Tier     | Napi limit    | Rate Limit                 | Megjegyzések                                 |
| -------- | ------------- | -------------------------- | -------------------------------------------- |
| Ingyenes | **14,4K RPD** | 30 ford./perc modellenként | Nincs hitelkártya; 429 limiten, nem terhelik |

Ingyenesen elérhető: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (ingyenes API kulcs – longcat.chat) 🆕

| Modell                        | Előtag | Napi ingyenes kvóta    | Megjegyzések                            |
| ----------------------------- | ------ | ---------------------- | --------------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50 millió token** 💥 | A valaha volt legnagyobb ingyenes kvóta |
| `LongCat-Flash-Chat`          | `lc/`  | 500 000 token          | Többfordulós csevegés                   |
| `LongCat-Flash-Thinking`      | `lc/`  | 500 000 token          | Érvelés / CoT                           |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500 000 token          | 2026. januári verzió                    |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500 000 token          | Multimodális                            |

> 100%-ban ingyenes nyilvános bétaverzióban. Regisztráljon a [longcat.chat](https://longcat.chat) címen e-mailben vagy telefonon. Napi alaphelyzetbe állítás 00:00 UTC.

### 🟢 POLLINATIONS AI (nincs szükség API-kulcsra) 🆕

| Modell     | Előtag | Rate Limit  | Szolgáltató mögött |
| ---------- | ------ | ----------- | ------------------ |
| `openai`   | `pol/` | 1 rekv/15mp | GPT-5              |
| `claude`   | `pol/` | 1 rekv/15mp | Antropikus Claude  |
| `gemini`   | `pol/` | 1 rekv/15mp | Google Gemini      |
| `deepseek` | `pol/` | 1 rekv/15mp | DeepSeek V3        |
| `llama`    | `pol/` | 1 rekv/15mp | Meta Llama 4 Scout |
| `mistral`  | `pol/` | 1 rekv/15mp | Mistral AI         |

> ✨ **Zéró súrlódás:** Nincs regisztráció, nincs API-kulcs. Adja hozzá a Pollinations szolgáltatót egy üres kulcsmezővel, és azonnal működik.

### 🟠 CLOUDFLARE WORKERS AI (ingyenes API-kulcs – cloudflare.com) 🆕

| Tier     | Napi neuronok | Egyenértékű használat                    | Megjegyzések                 |
| -------- | ------------- | ---------------------------------------- | ---------------------------- |
| Ingyenes | **10 000**    | ~150 LLM ill / 500s hang / 15K beágyazás | Globális élvonal, 50+ modell |

Népszerű ingyenes modellek: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (ingyenes hang!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> API-token + fiókazonosító szükséges a következőtől: [dash.cloudflare.com](https://dash.cloudflare.com). Tárolja fiókazonosítóját a szolgáltató beállításaiban.

### 🟣 SCALEWAY AI (1 millió ingyenes token – scaleway.com) 🆕

| Tier     | Ingyenes kvóta | Helyszín      | Megjegyzések                                   |
| -------- | -------------- | ------------- | ---------------------------------------------- |
| Ingyenes | **1M token**   | 🇫🇷 Párizs, EU | Nincs szükség hitelkártyára a korlátokon belül |

Ingyenesen elérhető: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> EU/GDPR kompatibilis. Szerezze be az API-kulcsot a [console.scaleway.com](https://console.scaleway.com) címen.

> **💡 The Ultimate Free Stack (11 szolgáltató, 0 USD örökké):**
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

## 🎙️ Ingyenes átírási kombó

> Bármilyen hang/videó átírása **0 USD-ért** – Deepgram vezet 200 USD ingyenes, AssemblyAI 50 USD tartalék, Groq Whisper korlátlan vészhelyzeti tartalékként.

| Szolgáltató       | Ingyenes kreditek                   | Legjobb modell                                                    | Rate Limit                               |
| ----------------- | ----------------------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| 🟢 **Deepgram**   | **200 USD ingyenes** (regisztráció) | `nova-3` — a legjobb pontosság, több mint 30 nyelv                | Nincs RPM-korlát az ingyenes krediteknél |
| 🔵 **AssemblyAI** | **50 USD ingyenes** (regisztráció)  | `universal-3-pro` — fejezetek, hangulat, személyazonossági adatok | Nincs RPM-korlát az ingyenes krediteknél |
| 🔴 **Groq**       | **Örökre ingyenes**                 | `whisper-large-v3` — OpenAI Whisper                               | 30 RPM (korlátozott sebesség)            |

**Javasolt kombináció itt: `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Ezután a `/dashboard/media` → **Átírás** lapon: töltsön fel bármilyen hang- vagy videofájlt → válassza ki a kombinált végpontot → kérje le az átírást a támogatott formátumokban.

## 💡 Főbb jellemzők

Az OmniRoute v2.0 működési platformként készült, nem csak közvetítő proxyként.

### 🆕 Új – ClawRouter által inspirált fejlesztések (2026. március)

| Funkció                                  | Mit csinál                                                                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**                | xAI modellek 0,20 USD/0,50 USD/M áron – 1143 ms benchmark (30%-kal gyorsabb, mint a Gemini 2.5 Flash)                                 |
| 🧠 **GLM-5 a Z.AI-n keresztül**          | 128 000 kimeneti kontextus, 0,5 USD/1 millió – a GLM család legújabb zászlóshajója                                                    |
| 🔮 **MiniMax M2.5**                      | Érvelés + ügynöki feladatok 0,30 USD/1M áron – jelentős fejlesztés az M2.1-hez képest                                                 |
| 🎯 **ToolCalling Flag modellenként**     | Modellenkénti `toolCalling: true/false` a rendszerleíró adatbázisban – Az AutoCombo kihagyja az eszközökkel nem rendelkező modelleket |
| 🌍 **Többnyelvű szándékfelismerés**      | PT/ZH/ES/AR kulcsszavak az AutoCombo pontozásban – jobb modellválasztás nem angol nyelvű tartalomhoz                                  |
| 📊 **Benchmark-vezérelt tartalékok**     | Valódi p95 késés az élő kérések hírcsatornáiból, kombinált pontozásból – Az AutoCombo tanul a tényleges adatokból                     |
| 🔁 **Duplikáció visszavonásának kérése** | Tartalom-kivonat alapú dedup ablak – többügynök biztonságos, megakadályozza az ismétlődő terheléseket                                 |
| 🔌 **Pluggable RouterStrategy**          | Bővíthető `RouterStrategy` interfész – egyéni útválasztási logika hozzáadása bővítményekként                                          |

### 🚀 Előző v2.0.9+ – Játszótér, CLI ujjlenyomatok és ACP

| Funkció                                      | Mit csinál                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Játszótér modell**                      | Irányítópult oldal bármely modell közvetlen teszteléséhez – szolgáltató/modell/végpont választó, Monaco Editor, adatfolyam, megszakítás, időzítés                                                                                                                                                             |
| 🔏 **CLI ujjlenyomat-egyeztetés**            | Szolgáltatónkénti fejléc/törzs rendezés a natív CLI-aláírásoknak megfelelően – váltson szolgáltatónként a Beállítások > Biztonság menüpontban. **A proxy IP-címe megmarad**                                                                                                                                   |
| 🤝 **ACP-támogatás (Agent Client Protocol)** | CLI ügynök felderítés (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 további), folyamat spawner, `/api/acp/agents` végpont                                                                                                                                                                                   |
| 🤖 **ACP Agents Dashboard**                  | Hibakeresés › Ügynökök oldal – 14 ügynökből álló rács telepítési állapottal, verzióval, egyéni ügynök űrlappal bármely CLI-eszközhöz. Az **OpenCode** felhasználók egy „Opencode.json letöltése” gombot kapnak, amely automatikusan létrehoz egy használatra kész konfigurációt az összes elérhető modellhez. |
| 🔧 **Egyéni modell `apiFormat` Útválasztás** | Egyéni modellek `apiFormat: "responses"` most megfelelően irányítják a Responses API fordítóhoz                                                                                                                                                                                                               |
| 🏢 ** Codex Workspace Isolation**            | E-mailenként több Codex-munkaterület – az OAuth megfelelően választja el a kapcsolatokat a munkaterület-azonosító                                                                                                                                                                                             |
| 🔄 **Elektronikus automatikus frissítés**    | Az asztali alkalmazás ellenőrzi a frissítéseket + automatikus telepítés újraindításkor                                                                                                                                                                                                                        |

### 🤖 Ügynök- és protokollműveletek (v2.0)

| Funkció                                               | Mit csinál                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP szerver (16 eszköz)**                        | IDE/ügynök eszközök 3 átvitelen keresztül: stdio, SSE (`/api/mcp/sse`), streamelhető HTTP (`/api/mcp/stream`) |
| 🤝 **A2A szerver (JSON-RPC + SSE)**                   | Ügynök-ügynök feladatvégrehajtás szinkronizálási és adatfolyam-folyamokkal                                    |
| 🧭 **Konszolidált végpontok oldal**                   | Lapos kezelőoldal Endpoint Proxy, MCP, A2A és API Endpoints lapokkal                                          |
| 🎚️ **Szolgáltatás engedélyezése/letiltása kapcsolók** | BE/KI kapcsolók az MCP-hez és az A2A-hoz a beállítások fennmaradásával (alapértelmezett: KI)                  |
| 🛰️ **MCP Runtime Heartbeat**                          | Valós folyamatállapot (pid, üzemidő, szívverés kora, szállítás, hatókör mód)                                  |
| 📋 **MCP Audit Trail**                                | Szűrhető auditnaplók sikerrel/sikertelenséggel és kulcshozzárendeléssel                                       |
| 🔐 **MCP Scope Enforcement**                          | 9 részletes hatókörű engedély az ellenőrzött szerszám-hozzáféréshez                                           |
| 📡 **A2A Task Lifecycle Management**                  | Feladatok listázása/szűrése, események/műtermékek ellenőrzése, futó feladatok megszakítása                    |
| 📋 **Agent Card Discovery**                           | `/.well-known/agent.json` az ügyfél automatikus felfedezéséhez                                                |
| 🧪 **E2E protokoll tesztkábel**                       | Valódi MCP SDK + A2A kliens folyamatok `test:protocols:e2e`                                                   |
| ⚙️ **Működési vezérlők**                              | Váltókombó, rugalmassági profilok alkalmazása, megszakítók alaphelyzetbe állítása egyetlen vezérlőfelületről  |

### 🧠 Útválasztás és intelligencia

| Funkció                                        | Mit csinál                                                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| 🎯 **Intelligens 4-szintű tartalék**           | Automatikus útvonal: Előfizetés → API-kulcs → Olcsó → Ingyenes                          |
| 📊 **Valós idejű kvótakövetés**                | Élő tokenszám + visszaszámlálás visszaállítása szolgáltatónként                         |
| 🔄 **Formátum fordítás**                       | OpenAI ↔ Claude ↔ Gemini ↔ Válaszok sémabiztos konverziókkal                            |
| 👥 **Többfiókos támogatás**                    | Több fiók szolgáltatónként intelligens kiválasztással                                   |
| 🔄 **Automatikus token frissítés**             | Az OAuth-tokenek automatikusan frissülnek                                               |
| 🎨 **Egyéni kombók**                           | 6 kiegyensúlyozási stratégia + tartalék láncvezérlés                                    |
| 🌐 **Wildcard Router**                         | `provider/*` dinamikus útválasztás                                                      |
| 🧠 **A költségvetési szabályozás átgondolása** | Áthaladási, automatikus, egyéni és adaptív érvelési korlátok                            |
| 🔀 **Modell álnevek**                          | Beépített + egyedi modell alias és migrációs biztonság                                  |
| ⚡ **Háttérromlás**                            | Alacsony prioritású háttérfeladatok irányítása olcsóbb modellek felé                    |
| 🧪 **Feladattudatos intelligens útválasztás**  | Modell automatikus kiválasztása tartalomtípus szerint (kódolás/látás/elemzés/összegzés) |
| 💬 **Rendszer azonnali befecskendezés**        | Következetesen alkalmazott globális viselkedésszabályozás                               |
| 📄 **Responses API-kompatibilitás**            | Teljes `/v1/responses` támogatás a Codexhez és a speciális ügynöki munkafolyamatokhoz   |

### 🎵 Multimodális API-k

| Funkció                      | Mit csinál                                                                                                                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Képgenerálás**          | `/v1/images/generations` felhővel és helyi háttérrendszerekkel                                                                                                                    |
| 📐 **Beágyazás**             | `/v1/embeddings` keresési és RAG-folyamatokhoz                                                                                                                                    |
| 🎤 **Audio átírás**          | `/v1/audio/transcriptions` — 7 szolgáltató (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), automatikus nyelvérzékelés, MP4/MP3/WAV támogatás |
| 🔊 **Szövegfelolvasó**       | `/v1/audio/speech` — 10 szolgáltató (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) helyes hibaüzenetekkel                    |
| 🎬 **Videogeneráció**        | `/v1/videos/generations` (ComfyUI + SD WebUI munkafolyamatok)                                                                                                                     |
| 🎵 **Zenegeneráció**         | `/v1/music/generations` (ComfyUI munkafolyamatok)                                                                                                                                 |
| 🛡️ **Moderálás**             | `/v1/moderations` biztonsági ellenőrzések                                                                                                                                         |
| 🔀 **Átsorolás**             | `/v1/rerank` a relevancia pontozáshoz                                                                                                                                             |
| 🔍 **Internetes keresés** 🆕 | `/v1/search` — 5 szolgáltató (Serper, Brave, Perplexity, Exa, Tavily), 6500+ ingyenes/hó, automatikus feladatátvétel, gyorsítótár                                                 |

### 🛡️ Rugalmasság, biztonság és kormányzás

| Funkció                                  | Mit csinál                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 🔌 **Megszakítók**                       | Modellenkénti kioldás/helyreállítás küszöbérték-vezérlőkkel                                                       |
| 🎯 **Végpont-tudatos modellek**          | Az egyéni modellek deklarálják a támogatott végpontokat + API formátumot                                          |
| 🛡️ **Menydörgésellenes csorda**          | Mutex + szemafor védelem az újrapróbálkozás/rate eseményeknél                                                     |
| 🧠 **Szemantikai + aláírás gyorsítótár** | Költség/késleltetés csökkentése két gyorsítótár-réteggel                                                          |
| ⚡ **Idempotencia kérése**               | Megkettőzött védőablak                                                                                            |
| 🔒 **TLS ujjlenyomat-hamisítás**         | Böngészőszerű TLS-ujjlenyomat – **csökkenti a botfelismerést és a fiók megjelölését**                             |
| 🔏 **CLI ujjlenyomat-egyeztetés**        | Megfelel a natív CLI-kérés aláírásainak — **csökkenti a kitiltási kockázatot, miközben megőrzi a proxy IP-címét** |
| 🌐 **IP-szűrés**                         | Engedélyezési lista/blokkolista vezérlés a nyílt telepítésekhez                                                   |
| 📊 **Szerkeszthető díjkorlátok**         | Konfigurálható globális/szolgáltatói szintű korlátozások tartósan                                                 |
| 🔑 **API-kulcskezelés + hatókör**        | A kulcsok biztonságos kiadása/forgatása és a modell/szolgáltató vezérlői                                          |
| 🛡️ **Védett `/models`**                  | Opcionális hitelesítési kapu és szolgáltatói elrejtés a modellkatalógushoz                                        |

### 📊 Observability & Analytics

| Feature                         | What It Does                                          |
| ------------------------------- | ----------------------------------------------------- |
| 📝 **Request + Proxy Logging**  | Full request/response and proxy logging               |
| 📋 **Unified Logs Dashboard**   | Request, proxy, audit, and console views in one page  |
| 🔍 **Request Telemetry**        | p50/p95/p99 latency and request tracing               |
| 🏥 **Health Dashboard**         | Uptime, breaker states, lockouts, cache stats         |
| 💰 **Cost Tracking**            | Budget controls and per-model pricing visibility      |
| 📈 **Analytics Visualizations** | Model/provider usage insights and trend views         |
| 🧪 **Evaluation Framework**     | Golden set testing with configurable match strategies |

### ☁️ Deployment & Platform

| Funkció                                | Mit csinál                                                              |
| -------------------------------------- | ----------------------------------------------------------------------- |
| 🌐 **Deploy Anywhere**                 | Localhost, VPS, Docker, Cloud környezetek                               |
| 💾 **Cloud Sync**                      | Konfiguráció szinkronizálása felhőkezelőn keresztül                     |
| 🔄 **Biztonsági mentés/visszaállítás** | Export/import és katasztrófa utáni helyreállítási folyamatok            |
| 🧙 **Bevezető varázsló**               | Első futtatás irányított beállítás                                      |
| 🔧 **CLI Tools Dashboard**             | Egykattintásos beállítás a népszerű kódolóeszközökhöz                   |
| 🎮 **Játszótér modell**                | Teszteljen bármely szolgáltatót/modellt/végpontot az irányítópultról    |
| 🔏 **CLI ujjlenyomat kapcsoló**        | Szolgáltatónkénti ujjlenyomat-egyeztetés a Beállítások > Biztonság      |
| 🌐 **i18n (30 nyelv)**                 | Teljes irányítópult + dokumentumok nyelvi támogatása RTL lefedettséggel |
| 🧹 **Minden modell törlése**           | Egykattintásos modelllista törlése a szolgáltató adatai között          |
| 📋 **Kiadássablonok**                  | Szabványos GitHub-sablonok hibákhoz és szolgáltatásokhoz                |
| 📂 **Egyéni adattár**                  | `DATA_DIR` felülírása a tárolási helyhez                                |

### Feature Deep Dive

#### Intelligens tartalék praktikus költségszabályozással

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Ha a kvóta, arány vagy állapot meghiúsul, az OmniRoute kézi váltás nélkül automatikusan a következő jelöltre lép.

#### Látható és működőképes protokollkezelés

- Az MCP + A2A felfedezhető a felhasználói felületen és a dokumentumokban (nem rejtett)
- A protokollállapot API-k élő működési adatokat tesznek közzé (`/api/mcp/*`, `/api/a2a/*`)
- Az irányítópultok tartalmaznak műveleteket a 2. napi műveletekhez (kombinált kapcsolók, megszakítók alaphelyzetbe állítása, feladat törlése)

#### Fordító + érvényesítési munkafolyamat

A Fordító terület a következőket tartalmazza:

- **Játszótér**: kérjen átalakítási ellenőrzéseket
- **Csevegés tesztelő**: teljes kérés/válasz oda-vissza út
- **Test Bench**: több eset egy menetben
- **Élő monitor**: valós idejű forgalmi nézet

Plusz a protokoll érvényesítése valós ügyfelekkel a `npm run test:protocols:e2e` segítségével.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Eszközreferencia, IDE konfigurációk és példák kliensekre
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Készségek, JSON-RPC módszerek, adatfolyamok és feladatok életciklusa

## 🧪 Értékelések (Evals)

Az OmniRoute egy beépített kiértékelő keretrendszert tartalmaz, amellyel az LLM válaszminőségét egy aranykészlettel összehasonlítva tesztelheti. Az irányítópulton az **Analytics → Evals** menüpontban érheti el.

### Beépített arany készlet

Az előre feltöltött "OmniRoute Golden Set" teszteseteket tartalmaz:

- Üdvözlet, matematika, földrajz, kódgenerálás
- JSON formátum megfelelőség, fordítás, leértékelés generálása
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

### Protokollbeállítás (MCP + A2A)

<details>
<summary><b>🧩 MCP beállítása (Model Context Protocol)</b></summary>

Indítsa el az MCP-átvitelt stdio módban:

```bash
omniroute --mcp
```

Javasolt érvényesítési folyamat:

1. Csatlakoztassa az MCP-klienst az stdio-n keresztül.
2. Futtassa a `omniroute_get_health`.
3. Futtassa a `omniroute_list_combos`.
4. Nyissa meg a `/dashboard/mcp` oldalt a szívverés, a tevékenység és az ellenőrzés megerősítéséhez.

Hasznos API-k az automatizáláshoz:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A beállítás (Agent2Agent)</b></summary>

Fedezze fel az ügynököt:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Feladat küldése:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Életciklus kezelése:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Működési UI:

- `/dashboard/a2a` a feladat/állapot/folyam megfigyelhetőségéhez és füstműveletekhez

</details>

<details>
<summary><b>🧪 Végpontok közötti protokoll érvényesítés</b></summary>

Érvényesítse mindkét protokollt valódi ügyfelekkel:

```bash
npm run test:protocols:e2e
```

Ez igazolja:

- MCP SDK kliens csatlakozás/lista/hívás
- A2A felfedezés/küldés/stream/get/cancel
- Az MCP audit és A2A feladatkezelő API-k adatainak keresztellenőrzése

</details>

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

#### Codex fióklimit-kezelés (5 óra + heti)

Minden Codex-fiók rendelkezik házirend-kapcsolókkal a `Dashboard -> Providers`-ban:

- `5h` (BE/KI): érvényesítse az 5 órás ablak küszöbszabályát.
- `Weekly` (BE/KI): érvényesítse a heti ablak küszöbére vonatkozó szabályzatot.
- Küszöbbeli viselkedés: ha egy engedélyezett ablak eléri a >=90%-os használatot, a fiók kimarad.
- Forgatási viselkedés: Az OmniRoute automatikusan a következő jogosult Codex-fiókhoz irányít.
- Visszaállítási viselkedés: amikor a szolgáltató `resetAt` ideje letelik, a fiók automatikusan újra jogosulttá válik.

Forgatókönyvek:

- `5h ON` + `Weekly ON`: a fiók kimarad, ha bármelyik ablak eléri a küszöböt.
- `5h OFF` + `Weekly ON`: csak heti használat blokkolhatja a fiókot.
- `5h ON` + `Weekly OFF`: csak 5 órás használat blokkolhatja a fiókot.
- `resetAt` sikeres: a fiók automatikusan újra rotációba lép (nincs kézi újraengedélyezés).

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

### NVIDIA NIM (INGYENES fejlesztői hozzáférés – 70+ modell)

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

**Használat:** `glm/glm-4.7`

**Profi tipp:** A kódolási terv 3-szoros kvótát kínál 1/7 költséggel! Visszaállítás naponta 10:00.

### MiniMax M2.1 (5 óra visszaállítás, 0,20 USD/1 millió)

1. Regisztráljon: [MiniMax](https://www.minimax.io/)
2. Szerezze be az API-kulcsot
3. Irányítópult → API-kulcs hozzáadása

**Használat:** `minimax/MiniMax-M2.1`

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

### iFlow (5 INGYENES modell OAuth-on keresztül)

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

### Qwen (4 INGYENES modell az eszközkódon keresztül)

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
<summary><b>🔧 CLI integráció</b></summary>

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

### OpenCode

**1. lépés:** Az OmniRoute hozzáadása egyéni szolgáltatóként:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**2. lépés:** Hozzon létre/szerkesszen `opencode.json` projektjének gyökérkönyvtárában:

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

**3. lépés:** Válassza ki a modellt az OpenCode-ban:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tipp:** Adja hozzá az OmniRoute `/v1/models` végpontjában elérhető bármely modellt a `models` szakaszhoz. Használja a `provider/model-id` formátumot az OmniRoute irányítópultján.

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

**Az irányítópult/API portok hibásak**

- `PORT` a kanonikus alapport (és alapértelmezés szerint API-port)
- Az `API_PORT` csak az OpenAI-kompatibilis API figyelőt írja felül
- Az `DASHBOARD_PORT` csak az irányítópultot/Next.js figyelőt írja felül
- Állítsa be a `NEXT_PUBLIC_BASE_URL`-t az irányítópultjára/nyilvános URL-címére (OAuth-visszahívásokhoz)

**Felhő szinkronizálási hibák**

- Ellenőrizze, hogy `BASE_URL` mutat a futó példányra
- Ellenőrizze `CLOUD_URL` pontot a várható felhő-végponthoz
- Tartsa az `NEXT_PUBLIC_*` értékeket a szerveroldali értékekkel összhangban

**Az első bejelentkezés nem működik**

- Ellenőrizze a `INITIAL_PASSWORD`-t itt: `.env`
- Ha nincs beállítva, a tartalék jelszó: `123456`

**Nincs kérésnapló**

- `ENABLE_REQUEST_LOGS=true` beállítása a `.env`-ban

**A csatlakozási teszt „Érvénytelen” üzenetet mutat az OpenAI-kompatibilis szolgáltatók esetében**

- Sok szolgáltató nem tesz közzé `/models` végpontot
- Az OmniRoute v1.0.6+ tartalmazza a tartalék érvényesítést a csevegés befejezésén keresztül
- Győződjön meg arról, hogy az alap URL tartalmazza a `/v1` utótagot

### 🔐 OAuth távoli szerveren

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Fontos az OmniRoute-ot VPS-en, Dockeren vagy bármely távoli szerveren futtató felhasználók számára**

#### Miért nem működik az Antigravity / Gemini CLI OAuth távoli szervereken?

Az **Antigravity** és **Gemini CLI** szolgáltatók a **Google OAuth 2.0** szolgáltatást használják. A Google megköveteli, hogy az OAuth folyamatban szereplő `redirect_uri` pontosan egyezzen az alkalmazás Google Cloud Console-jában előregisztrált URI-k egyikével.

Az OmniRoute csomagban található OAuth hitelesítő adatok **csak a `localhost` számára vannak regisztrálva**. Amikor egy távoli szerveren éri el az OmniRoute szolgáltatást (pl. `https://omniroute.myserver.com`), a Google a következőkkel utasítja el a hitelesítést:

```
Error 400: redirect_uri_mismatch
```

#### Megoldás: Állítsa be saját OAuth hitelesítő adatait

Létre kell hoznia egy **OAuth 2.0 ügyfél-azonosítót** a Google Cloud Console-ban a szerver URI-jával.

#### Lépésről lépésre

**1. Nyissa meg a Google Cloud Console-t**

Ugrás ide: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Új OAuth 2.0 ügyfél-azonosító létrehozása**

- Kattintson a **„+ Hitelesítési adatok létrehozása”** → **„OAuth-ügyfélazonosító”** elemre.
- Alkalmazás típusa: **"Web alkalmazás"**
- Név: bármi, ami tetszik (pl. `OmniRoute Remote`)

**3. Engedélyezett átirányítási URI-k hozzáadása**

Az **"Engedélyezett átirányítási URI-k"** mezőbe írja be:

```
https://your-server.com/callback
```

> Cserélje ki a `your-server.com` értéket a szerver domainjére vagy IP-címére (ha szükséges, adja meg a portot, pl. `http://45.33.32.156:20128/callback`).

**4. Mentse és másolja a hitelesítő adatokat**

A létrehozás után a Google megjeleníti az **Client ID** és **Client Secret** kódot.

**5. Környezeti változók beállítása**

A `.env` (vagy a Docker környezeti változókban):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Az OmniRoute újraindítása**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Próbáljon újra csatlakozni**

Irányítópult → Szolgáltatók → Antigravity (vagy Gemini CLI) → OAuth

A Google most megfelelően átirányítja a következőre: `https://your-server.com/callback`.

---

#### Ideiglenes megoldás (egyéni hitelesítő adatok nélkül)

Ha most nem szeretné beállítani a saját hitelesítő adatait, továbbra is használhatja a **manuális URL-folyamatot**:

1. Az OmniRoute megnyitja a Google engedélyezési URL-címét
2. Az engedélyezés után a Google megpróbál átirányítani a `localhost` címre (ami a távoli szerveren meghiúsul)
3. **Másolja ki a teljes URL-t** a böngésző címsorából (még akkor is, ha az oldal nem töltődik be)
4. Illessze be az URL-t az OmniRoute csatlakozási módban látható mezőbe
5. Kattintson a **"Csatlakozás"** gombra.

> Ez azért működik, mert az URL-ben szereplő engedélyezési kód attól függetlenül érvényes, hogy az átirányítási oldal betöltődött-e.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Az OAuth do Antigravity / Gemini CLI falha em servidores remotos?

Az **Antigravitáció** és a **Gemini CLI** usam **Google OAuth 2.0** hitelesítése. A Google exige que a `redirect_uri` nincs fluxo OAuth seja **exatamente** uma das URI-k pre-cadastradas no Google Cloud Console do aplicativo.

As credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. Quando você acessa o OmniRoute em um servidor Remoto (pl.: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Megoldás: A suas próprias credenciais OAuth konfigurálása

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

#### Kerülő megoldás temporário (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. OmniRoute abrirá a Google autorização URL-jét
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. ** Teljes URL másolása** da barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Kattintson a **"Connect"** gombra

> Este workaround funciona porque o código de autorização na URL é válido independente do redirect ter carregado ou não.

</details>

---

</details>

## 🛠️ Tech Stack

<details>
<summary><b>Kattintson a technológiai verem részleteinek kibontásához</b></summary>

- **Futtatási idejű**: Node.js 18–22 LTS (⚠️ A Node.js 24+ **nem támogatott** - A `better-sqlite3` natív binárisok nem kompatibilisek)
- **Nyelv**: TypeScript 5.9 – **100% TypeScript** a `src/` és `open-sse/` között (nulla `any` az alapmodulokban a v2.0 óta)
- **Keretrendszer**: Next.js 16 + React 19 + Tailwind CSS 4
- **Adatbázis**: LowDB (JSON) + SQLite (tartomány állapota + proxynaplók + MCP-audit + útválasztási döntések)
- **Sémák**: Zod (MCP-eszköz I/O-ellenőrzése, API-szerződések)
- **Protokollok**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Szerver által küldött események (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API-kulcsok + MCP-hatókörű engedélyezés
- **Tesztelés**: Node.js tesztfutó + Vitest (900+ teszt, beleértve az egységet, az integrációt, az E2E-t)
- **CI/CD**: GitHub Actions (automatikus npm közzététel + Docker Hub kiadáskor)
- **Webhely**: [omniroute.online](https://omniroute.online)
- **Csomag**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Dokker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Rugalmasság**: megszakító, exponenciális visszakapcsolás, mennydörgés elleni csorda, TLS-hamisítás, automatikus kombinált öngyógyítás

</details>

---

## 📖 Dokumentáció

| dokumentum                                     | Leírás                                                      |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Szolgáltatók, kombók, CLI-integráció, telepítés             |
| [API Reference](docs/API_REFERENCE.md)         | Minden végpont példákkal                                    |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 MCP-eszköz, IDE konfigurációk, Python/TS/Go kliensek     |
| [A2A Server](src/lib/a2a/README.md)            | JSON-RPC 2.0 protokoll, készségek, adatfolyam, feladat mgmt |
| [Auto-Combo Engine](docs/auto-combo.md)        | 6 faktoros pontozás, módcsomagok, öngyógyító                |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Gyakori problémák és megoldások                             |
| [Architecture](docs/ARCHITECTURE.md)           | Rendszerarchitektúra és belső elemek                        |
| [Contributing](CONTRIBUTING.md)                | Fejlesztési beállítások és irányelvek                       |
| [OpenAPI Spec](docs/openapi.yaml)              | OpenAPI 3.0 specifikáció                                    |
| [Security Policy](SECURITY.md)                 | Sebezhetőségi jelentések és biztonsági gyakorlatok          |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Teljes útmutató: VM + nginx + Cloudflare beállítás          |
| [Features Gallery](docs/FEATURES.md)           | Vizuális irányítópult bemutató képernyőképekkel             |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Kiadás előtti érvényesítési lépések                         |

---

## 🗺️ Útiterv

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

> 📝 A teljes funkció specifikációi a [**OMNI_TOKEN_342**](docs/new-features/) címen érhetők el (217 részletes specifikáció)

---

## 👥 Közreműködők

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Hogyan járuljunk hozzá

1. Fork a tároló
2. Hozza létre saját jellemzői ágát (`git checkout -b feature/amazing-feature`)
3. Végezze el módosításait (`git commit -m 'Add amazing feature'`)
4. Nyomja az ágra (`git push origin feature/amazing-feature`)
5. Nyisson meg egy lehívási kérelmet

A részletes útmutatásért lásd: [CONTRIBUTING.md](CONTRIBUTING.md).

### Új verzió kiadása

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Csillagtörténet

## Stargazers idővel

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
<!-- A GitHub-beszélgetések engedélyezve a közösségi kérdések és válaszok számára -->
