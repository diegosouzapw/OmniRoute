# Használati útmutató

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Teljes útmutató a szolgáltatók konfigurálásához, kombinációk létrehozásához, a CLI-eszközök integrálásához és az OmniRoute telepítéséhez.

---

## Tartalomjegyzék

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Árazás egy pillantásra

| Tier              | Szolgáltató        | Költség                 | Kvóta visszaállítása   | Legjobb a                       |
| ----------------- | ------------------ | ----------------------- | ---------------------- | ------------------------------- |
| **💳 ELŐFIZETÉS** | Claude Code (Pro)  | 20 USD/hó               | 5 óra + heti           | Már előfizetett                 |
|                   | Codex (Plus/Pro)   | 20-200 USD/hó           | 5 óra + heti           | OpenAI felhasználók             |
|                   | Gemini CLI         | **INGYENES**            | 180 000/hó + 1 000/nap | Mindenki!                       |
|                   | GitHub másodpilóta | 10-19 USD/hó            | Havi                   | GitHub felhasználók             |
| **🔑 API KULCS**  | DeepSeek           | Fizetés használatonként | Nincs                  | Olcsó érvelés                   |
|                   | Groq               | Fizetés használatonként | Nincs                  | Ultragyors következtetés        |
|                   | xAI (Grok)         | Fizetés használatonként | Nincs                  | Grok 4 okfejtés                 |
|                   | Mistral            | Fizetés használatonként | Nincs                  | EU-ban működő modellek          |
|                   | Zavartság          | Fizetés használatonként | Nincs                  | Keresés-bővített                |
|                   | Együtt AI          | Fizetés használatonként | Nincs                  | Nyílt forráskódú modellek       |
|                   | Tűzijáték AI       | Fizetés használatonként | Nincs                  | Gyors FLUX képek                |
|                   | Cerebrák           | Fizetés használatonként | Nincs                  | Ostya léptékű sebesség          |
|                   | Cohere             | Fizetés használatonként | Nincs                  | Parancs R+ RAG                  |
|                   | NVIDIA NIM         | Fizetés használatonként | Nincs                  | Vállalati modellek              |
| **💰 OLCSÓ**      | GLM-4.7            | 0,6 USD/1M              | Naponta 10:00          | Költségvetési biztonsági mentés |
|                   | MiniMax M2.1       | 0,2 USD/1M              | 5 órás gurulás         | Legolcsóbb lehetőség            |
|                   | Kimi K2            | 9 USD/hó lakás          | 10 millió token/hó     | Előrelátható költség            |
| **🆓 INGYENES**   | iFlow              | $0                      | Korlátlan              | 8 modell ingyenes               |
|                   | Qwen               | $0                      | Korlátlan              | 3 modell ingyenes               |
|                   | Kiro               | $0                      | Korlátlan              | Claude ingyen                   |

**💡 Pro tipp:** Kezdje a Gemini CLI-vel (180 000 ingyenes/hónap) + iFlow (korlátlan ingyenes) kombináció = 0 USD költség!

---

## 🎯 Használati esetek

### 1. eset: "Claude Pro előfizetésem van"

**Probléma:** A kvóta lejár, kihasználatlanul, sebességkorlátozások erős kódolás közben

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### 2. eset: "Nulla költséget akarok"

**Probléma:** Nem engedheti meg magának az előfizetést, megbízható mesterséges intelligencia kódolásra van szüksége

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### 3. eset: "24 órás kódolásra van szükségem, megszakítás nélkül"

**Probléma:** Határidők, nem engedheti meg magának az állásidőt

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### 4. eset: "INGYENES AI-t akarok az OpenClawban"

**Probléma:** AI-asszisztens szükséges az üzenetküldő alkalmazásokhoz, teljesen ingyenes

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Szolgáltató beállítása

### 🔐 Előfizetéses szolgáltatók

#### Claude Code (Pro/Max)

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

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (INGYENES 180 000/hó!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Legjobb érték:** Hatalmas ingyenes szint! Használja ezt a fizetett szintek előtt.

#### GitHub másodpilóta

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Olcsó szolgáltatók

#### GLM-4.7 (napi visszaállítás, 0,6 USD/1 millió)

1. Regisztráljon: [Zhipu AI](https://open.bigmodel.cn/)
2. Szerezze be az API-kulcsot a Coding Plan-ból
3. Irányítópult → API-kulcs hozzáadása: Szolgáltató: `glm`, API-kulcs: `your-key`

**Használat:** `glm/glm-4.7` — **Profi tipp:** A kódolási terv 3-szoros kvótát kínál 1/7 költséggel! Visszaállítás naponta 10:00.

#### MiniMax M2.1 (5 óra visszaállítás, 0,20 USD/1 millió)

1. Regisztráljon: [MiniMax](https://www.minimax.io/)
2. API-kulcs lekérése → Irányítópult → API-kulcs hozzáadása

**Használat:** `minimax/MiniMax-M2.1` — **Profi tipp:** A legolcsóbb lehetőség hosszú kontextushoz (1 millió token)!

#### Kimi K2 (9 USD/hó lakás)

1. Feliratkozás: [Moonshot AI](https://platform.moonshot.ai/)
2. API-kulcs lekérése → Irányítópult → API-kulcs hozzáadása

**Használat:** `kimi/kimi-latest` — **Profi tipp:** Fix 9 USD/hó 10 millió tokenek esetén = 0,90 USD/1 millió tényleges költség!

### 🆓 INGYENES szolgáltatók

#### iFlow (8 INGYENES modell)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 INGYENES modell)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude INGYENES)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 kombók

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

---

## 🔧 CLI integráció

### Kurzor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

`~/.claude/config.json` szerkesztése:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

`~/.openclaw/openclaw.json` szerkesztése:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Vagy használja az Irányítópultot:** CLI Tools → OpenClaw → Auto-config

### Cline / Folytatás / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Bevezetés

### VPS telepítés

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

A CLI binárisokkal rendelkező gazdagépbe integrált módhoz lásd a Docker szakaszt a fő dokumentumokban.

### Környezeti változók

| Változó               | Alapértelmezett                      | Leírás                                                                      |
| --------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT aláírási titok (**változás a gyártásban**)                              |
| `INITIAL_PASSWORD`    | `123456`                             | Első bejelentkezési jelszó                                                  |
| `DATA_DIR`            | `~/.omniroute`                       | Adatkönyvtár (db, használat, naplók)                                        |
| `PORT`                | keretrendszer alapértelmezett        | Szervizport (`20128` a példákban)                                           |
| `HOSTNAME`            | keretrendszer alapértelmezett        | Gazda kötése (a Docker alapértelmezett értéke `0.0.0.0`)                    |
| `NODE_ENV`            | futásidejű alapértelmezett           | Állítsa be az `production` értéket a telepítéshez                           |
| `BASE_URL`            | `http://localhost:20128`             | Szerveroldali belső alap URL                                                |
| `CLOUD_URL`           | `https://omniroute.dev`              | Felhőszinkronizálási végpont alap URL-je                                    |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | HMAC titkos a generált API-kulcsokhoz                                       |
| `REQUIRE_API_KEY`     | `false`                              | Bearer API kulcs kényszerítése a következőn: `/v1/*`                        |
| `ENABLE_REQUEST_LOGS` | `false`                              | Engedélyezi a kérés/válasz naplózást                                        |
| `AUTH_COOKIE_SECURE`  | `false`                              | `Secure` hitelesítési cookie kényszerítése (a HTTPS fordított proxy mögött) |

A teljes környezeti változó hivatkozását lásd: [README](../README.md).

---

## 📊 Elérhető modellek

<details>
<summary><b>Az összes elérhető modell megtekintése</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Kód (`cx/`)** – Plusz/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** – INGYENES: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub másodpilóta (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** – 0,6 USD/1 millió: `glm/glm-4.7`

**MiniMax (`minimax/`)** – 0,2 USD/1 millió: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** – INGYENES: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** – INGYENES: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** – INGYENES: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Zavarság (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Együtt AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Agy (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Speciális funkciók

### Egyedi modellek

Adjon hozzá bármilyen modellazonosítót bármely szolgáltatóhoz anélkül, hogy az alkalmazás frissítésére várna:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Vagy használja az Irányítópultot: **Providers → [Provider] → Custom Models**.

### Dedikált szolgáltatói útvonalak

A kérések közvetlenül egy adott szolgáltatóhoz irányíthatók modellellenőrzéssel:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

A szolgáltató előtagja automatikusan hozzáadódik, ha hiányzik. A nem egyező modellek a következőt adják vissza: `400`.

### Hálózati proxy konfiguráció

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Precencia:** Kulcsspecifikus → Kombinált → Szolgáltató-specifikus → Globális → Környezet.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

A modelleket szolgáltató szerint csoportosítva adja vissza típusokkal (`chat`, `embedding`, `image`).

### Cloud Sync

- Szinkronizálja a szolgáltatókat, kombinációkat és beállításokat az eszközök között
- Automatikus háttérszinkronizálás időtúllépéssel + hibamentes
- Szerveroldali `BASE_URL`/`CLOUD_URL` előnyben részesítése éles környezetben

### LLM Gateway Intelligence (9. fázis)

- **Szemantikus gyorsítótár** – Automatikus gyorsítótárak, nem streamelés, hőmérséklet = 0 válasz (kihagyás a `X-OmniRoute-No-Cache: true` segítségével)
- **Idempotency kérése** – 5 másodpercen belül deduplikálja a kéréseket a `Idempotency-Key` vagy `X-Request-Id` fejlécen keresztül
- **Előrehaladás követése** — SSE `event: progress` események engedélyezése a `X-OmniRoute-Progress: true` fejlécen keresztül

---

### Fordítói Játszótér

Hozzáférés az **Irányítópult → Fordító** segítségével. Hibakeresés és vizualizálás, hogy az OmniRoute hogyan fordítja le az API-kéréseket a szolgáltatók között.

| mód                   | Cél                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Játszótér**         | Válassza ki a forrás-/célformátumokat, illesszen be egy kérést, és azonnal megtekintheti a lefordított kimenetet |
| **Csevegés tesztelő** | Küldjön élő csevegési üzeneteket a proxyn keresztül, és ellenőrizze a teljes kérés/válasz ciklust                |
| **Próbapad**          | Futtasson kötegelt teszteket több formátumkombinációra a fordítás helyességének ellenőrzéséhez                   |
| **Élő monitor**       | Nézze meg a valós idejű fordításokat, ahogy a kérések a proxyn keresztül áramlanak                               |

**Használati esetek:**

- Hibakeresés, miért nem sikerül egy adott ügyfél/szolgáltató kombináció
- Ellenőrizze, hogy a gondolkodó címkék, az eszközhívások és a rendszerkérések helyesen fordítódnak-e
- Hasonlítsa össze a formátumbeli különbségeket az OpenAI, Claude, Gemini és Responses API formátumok között

---

### Útválasztási stratégiák

Konfigurálás a **Irányítópult → Beállítások → Útválasztás** menüpontban.

| Stratégia                      | Leírás                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Először töltse ki**          | A fiókokat prioritási sorrendben használja – az elsődleges fiók minden kérést kezel, amíg el nem éri             |
| **Round Robin**                | A konfigurálható ragadós korláttal rendelkező összes fiókot végigjárja (alapértelmezett: fiókonként 3 hívás)     |
| **P2C (Power of Two Choices)** | 2 véletlenszerű fiókot választ, és az egészségesebbhez vezet – egyensúlyba hozza a terhelést az egészségtudattal |
| **Véletlen**                   | Véletlenszerűen kiválaszt egy fiókot minden egyes kérelemhez a Fisher-Yates shuffle                              |
| **Legkevésbé használt**        | Útvonalak a legrégebbi `lastUsedAt` időbélyeggel rendelkező fiókhoz, a forgalom egyenletes elosztása             |
| **Költségoptimalizált**        | Útvonalak a legalacsonyabb prioritású fiókhoz, a legalacsonyabb költségű szolgáltatókra optimalizálva            |

#### Helyettesítő modell álnevek

Hozzon létre helyettesítő karakteres mintákat a modellnevek újratervezéséhez:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

A helyettesítő karakterek támogatják a `*` (bármilyen karakter) és az `?` (egykarakteres).

#### Tartalékláncok

Határozzon meg globális tartalék láncokat, amelyek minden kérelemre vonatkoznak:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Rugalmasság és megszakítók

Konfigurálás a **Irányítópult → Beállítások → Ellenállás** menüpontban.

Az OmniRoute szolgáltatói szintű rugalmasságot valósít meg négy összetevőből:

1. **Szolgáltatói profilok** — Szolgáltatónkénti konfiguráció a következőkhöz:
   - Meghibásodási küszöb (hány hiba történt a nyitás előtt)
   - Lehűlés időtartama
   - Sebességkorlát érzékelési érzékenység
   - Exponenciális backoff paraméterek

2. **Szerkeszthető díjkorlátok** — Az irányítópulton konfigurálható rendszerszintű alapértékek:
   - **Percenkénti kérések (RPM)** – A percenkénti kérések száma fiókonként
   - **Minimális idő a kérések között** - Minimális eltérés ezredmásodpercben a kérések között
   - **Maximális egyidejű kérések** - Maximális egyidejű kérések száma fiókonként
   - Kattintson a **Szerkesztés** gombra a módosításhoz, majd a **Mentés** vagy a **Mégse** gombra. Az értékek a rezilience API-n keresztül megmaradnak.

3. **Circuit Breaker** – Nyomon követi a hibákat szolgáltatónként, és automatikusan megnyitja az áramkört egy küszöbérték elérésekor:
   - **ZÁRVA** (egészséges) – A kérések normálisan futnak
   - **NYITVA** — A szolgáltató ideiglenesen blokkolva van ismétlődő hibák után
   - **HALF_OPEN** — Tesztelés, hogy a szolgáltató helyreállt-e

4. **Policies & Locked Identifiers** — Megjeleníti a megszakító állapotát és a zárolt azonosítókat kényszer-feloldási képességgel.

5. **Díjkorlát automatikus észlelése** – Figyeli a `429` és `Retry-After` fejléceket, hogy proaktívan elkerülje a szolgáltatói díjkorlátok átlépését.

**Profi tipp:** Használja a **Reset All** gombot az összes megszakító és leállás törléséhez, amikor a szolgáltató felépül egy kiesésből.

---

### Adatbázis exportálása/importálása

Az adatbázis-mentéseket az **Irányítópult → Beállítások → Rendszer és tárhely** menüpontban kezelheti.

| Akció                               | Leírás                                                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adatbázis exportálása**           | Letölti az aktuális SQLite adatbázist `.sqlite` fájlként                                                                                                                           |
| **Az összes exportálása (.tar.gz)** | Letölt egy teljes biztonsági másolat archívumot, beleértve: adatbázist, beállításokat, kombinációkat, szolgáltatói kapcsolatokat (hitelesítő adatok nélkül), API kulcs metaadatait |
| **Adatbázis importálása**           | Töltsön fel egy `.sqlite` fájlt az aktuális adatbázis lecseréléséhez. Az importálás előtti biztonsági másolat automatikusan létrejön                                               |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Importálás ellenőrzése:** Az importált fájl integritását (SQLite pragma ellenőrzés), a szükséges táblákat (`provider_connections`, `provider_nodes`, `combos`, \_\_OMNI_TOKEN_136_x ) és 0 MB-ot (0 MB_x ) ellenőrzik.

**Használati esetek:**

- Az OmniRoute áttelepítése a gépek között
- Készítsen külső biztonsági másolatot a katasztrófa utáni helyreállításhoz
- A konfigurációk megosztása a csapattagok között (összes exportálása → archívum megosztása)

---

### Beállítások irányítópultja

A beállítási oldal 5 lapra van felosztva a könnyű navigáció érdekében:

| Tab             | Tartalom                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Biztonság**   | Bejelentkezés/jelszó beállítások, IP-hozzáférés-vezérlés, API-hitelesítés a `/models`-hoz és Szolgáltató blokkolása               |
| **Útválasztás** | Globális útválasztási stratégia (6 lehetőség), helyettesítő karakteres modellálnevek, tartalék láncok, kombinált alapértelmezések |
| **rugalmasság** | Szolgáltatói profilok, szerkeszthető sebességkorlátok, megszakító állapota, szabályzatok és zárolt azonosítók                     |
| **AI**          | Átgondolt költségkeret-konfiguráció, globális rendszerbefecskendezés, gyorsítótár-statisztikák                                    |
| **Speciális**   | Globális proxykonfiguráció (HTTP/SOCKS5)                                                                                          |

---

### Költségek és költségvetés kezelése

Hozzáférés az **Irányítópult → Költségek** menüponton keresztül.

| Tab              | Cél                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Költségvetés** | Költési korlátok beállítása API-kulcsonként napi/heti/havi költségkerettel és valós idejű követéssel                   |
| **Árak**         | Modellárazási bejegyzések megtekintése és szerkesztése – szolgáltatónként 1 000 bemeneti/kimeneti tokenenkénti költség |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Költségkövetés:** Minden kérés naplózza a tokenhasználatot, és az ártáblázat segítségével kiszámítja a költségeket. Tekintse meg az **Irányítópult → Használat** szolgáltató, modell és API-kulcs szerinti lebontását.

---

### Hangátírás

Az OmniRoute támogatja a hang átírását az OpenAI-kompatibilis végponton keresztül:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Elérhető szolgáltatók: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Támogatott hangformátumok: `mp3`, `wav`, `m4a`, `flac`, `ogg`, \_\_OMNI_TOKEN_145_TOKEN_1.

---

### Kombinált egyensúlyozási stratégiák

Konfigurálja a kombinált egyensúlyozást az **Irányítópult → Kombók → Létrehozás/Szerkesztés → Stratégia** menüpontban.

| Stratégia               | Leírás                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| **Round-Robin**         | Sorozatosan forgatja a modelleket                                                                |
| **Prioritás**           | Mindig az első modellt próbálja ki; csak hibára esik vissza                                      |
| **Véletlen**            | Véletlenszerű modellt választ a kombinációból minden egyes kéréshez                              |
| **Súlyozott**           | Útvonalak arányosan a modellenként hozzárendelt súlyok alapján                                   |
| **Legkevésbé használt** | Útvonalak a legutóbbi legkevesebb kéréssel rendelkező modellhez (kombinált mérőszámokat használ) |
| **Költségoptimalizált** | Útvonalak a legolcsóbb elérhető modellhez (árazási táblázatot használ)                           |

A globális kombinált alapértelmezések az **Irányítópult → Beállítások → Útválasztás → Kombinált alapértelmezések** menüpontban állíthatók be.

---

### Egészségügyi irányítópult

Hozzáférés az **Irányítópult → Egészség** menüponton keresztül. Valós idejű rendszerállapot-áttekintés 6 kártyával:

| Kártya                    | Mit mutat                                                              |
| ------------------------- | ---------------------------------------------------------------------- |
| **Rendszerállapot**       | Üzemidő, verzió, memóriahasználat, adatkönyvtár                        |
| **Szolgáltatói egészség** | Szolgáltatónkénti megszakító állapota (Zárt/Nyitott/Félig nyitva)      |
| **Díjkorlátok**           | Aktív sebességkorlátozások fiókonként a hátralévő idővel               |
| **Aktív kizárások**       | A kizárási szabályzat által ideiglenesen letiltott szolgáltatók        |
| **Aláírás-gyorsítótár**   | Deduplikációs gyorsítótár statisztikái (aktív kulcsok, találati arány) |
| **Latencia telemetria**   | p50/p95/p99 késleltetési összesítés szolgáltatónként                   |

**Profi tipp:** Az Egészség oldal 10 másodpercenként automatikusan frissül. Használja a megszakító kártyát annak azonosítására, hogy mely szolgáltatók tapasztaltak problémákat.
