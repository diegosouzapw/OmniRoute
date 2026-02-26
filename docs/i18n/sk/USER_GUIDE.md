# Používateľská príručka

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Kompletný sprievodca pre konfiguráciu poskytovateľov, vytváranie komb, integráciu nástrojov CLI a nasadenie OmniRoute.

---

## Obsah

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prehľad cien

| Úroveň            | Poskytovateľ      | Náklady             | Obnovenie kvóty              | Najlepšie pre               |
| ----------------- | ----------------- | ------------------- | ---------------------------- | --------------------------- |
| **💳 PREDPLATNÉ** | Claude Code (Pro) | 20 USD/mesiac       | 5h + týždenne                | Už prihlásené               |
|                   | Codex (Plus/Pro)  | 20 – 200 USD/mesiac | 5h + týždenne                | Používatelia OpenAI         |
|                   | Gemini CLI        | **ZADARMO**         | 180 tis./mesiac + 1 tis./deň | Všetci!                     |
|                   | GitHub Copilot    | 10 – 19 USD/mes.    | Mesačne                      | Používatelia GitHubu        |
| **🔑 API KEY**    | DeepSeek          | Platba za použitie  | Žiadne                       | Lacné uvažovanie            |
|                   | Groq              | Platba za použitie  | Žiadne                       | Ultra-rýchle odvodenie      |
|                   | xAI (Grok)        | Platba za použitie  | Žiadne                       | Grok 4 zdôvodnenie          |
|                   | Mistral           | Platba za použitie  | Žiadne                       | Modely hostené v EÚ         |
|                   | Zmätok            | Platba za použitie  | Žiadne                       | Rozšírené vyhľadávanie      |
|                   | Spolu AI          | Platba za použitie  | Žiadne                       | Modely s otvoreným zdrojom  |
|                   | Ohňostroje AI     | Platba za použitie  | Žiadne                       | Fast FLUX obrázky           |
|                   | Cerebras          | Platba za použitie  | Žiadne                       | Rýchlosť plátkovej stupnice |
|                   | Cohere            | Platba za použitie  | Žiadne                       | Príkaz R+ RAG               |
|                   | NVIDIA NIM        | Platba za použitie  | Žiadne                       | Podnikové modely            |
| **💰 LACNO**      | GLM-4,7           | 0,6 USD/1 milión    | Denne 10:00                  | Záloha rozpočtu             |
|                   | MiniMax M2.1      | 0,2 USD/1 milión    | 5-hodinové valcovanie        | Najlacnejšia možnosť        |
|                   | Kimi K2           | 9 USD/mesiac byt    | 10 miliónov tokenov/mesiac   | Predvídateľné náklady       |
| **🆓 ZDARMA**     | iFlow             | 0 USD               | Neobmedzené                  | 8 modelov zadarmo           |
|                   | Qwen              | 0 USD               | Neobmedzené                  | 3 modely zadarmo            |
|                   | Kiro              | 0 USD               | Neobmedzené                  | Claude zadarmo              |

**💡 Tip pre profesionálov:** Začnite s kombináciou Gemini CLI (180 000 zadarmo/mesiac) + iFlow (neobmedzene zadarmo) = cena 0 $!

---

## 🎯 Prípady použitia

### Prípad 1: „Mám predplatné Claude Pro“

**Problém:** Platnosť kvóty vyprší nevyužitá, obmedzenia sadzieb počas náročného kódovania

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Prípad 2: „Chcem nulové náklady“

**Problém:** Nemôžem si dovoliť predplatné, potrebujem spoľahlivé kódovanie AI

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Prípad 3: „Potrebujem kódovanie 24/7, žiadne prerušenia“

**Problém:** Termíny, nemôžem si dovoliť prestoje

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

### Prípad 4: „Chcem AI ZDARMA v OpenClaw“

**Problém:** Potrebujete asistenta AI v aplikáciách na odosielanie správ, úplne zadarmo

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Nastavenie poskytovateľa

### 🔐 Poskytovatelia predplatného

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

**Tip pre profesionálov:** Používajte Opus na zložité úlohy, Sonnet na rýchlosť. OmniRoute sleduje kvótu na model!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (ZADARMO 180 000/mesiac!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Najlepšia hodnota:** Obrovská bezplatná úroveň! Použite to pred platenými úrovňami.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Lacní poskytovatelia

#### GLM-4,7 (denný reset, 0,6 $/1 milión)

1. Zaregistrujte sa: [Zhipu AI](https://open.bigmodel.cn/)
2. Získajte kľúč API z plánu kódovania
3. Dashboard → Pridať kľúč API: Poskytovateľ: `glm`, kľúč API: `your-key`

**Použite:** `glm/glm-4.7` — **Tip pre profesionálov:** Kódovací plán ponúka 3× kvótu za 1/7 cenu! Resetovať denne o 10:00.

#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zaregistrujte sa: [MiniMax](https://www.minimax.io/)
2. Získať kľúč API → Dashboard → Pridať kľúč API

**Použitie:** `minimax/MiniMax-M2.1` — **Tip pre profesionálov:** Najlacnejšia možnosť pre dlhý kontext (1 milión tokenov)!

#### Kimi K2 (9 USD/mesiac)

1. Prihlásiť sa na odber: [Moonshot AI](https://platform.moonshot.ai/)
2. Získať kľúč API → Dashboard → Pridať kľúč API

**Použitie:** `kimi/kimi-latest` — **Tip pre profesionálov:** Pevné 9 $/mesiac za 10 miliónov tokenov = 0,90 $/1 milión efektívnych nákladov!

### 🆓 BEZPLATNÍ poskytovatelia

#### iFlow (8 modelov ZDARMA)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modely ZDARMA)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombinácie

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

---

## 🔧 Integrácia CLI

### IDE kurzora

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Upraviť `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Kódex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Upraviť `~/.openclaw/openclaw.json`:

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

**Alebo použite Dashboard:** Nástroje CLI → OpenClaw → Automatická konfigurácia

### Cline / Pokračovať / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Nasadenie

### Nasadenie VPS

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

Informácie o režime integrovanom s hostiteľom s binárnymi súbormi CLI nájdete v časti Docker v hlavných dokumentoch.

### Premenné prostredia

| Premenná              | Predvolené                           | Popis                                                                         |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Tajomstvo podpisu JWT (**zmena vo výrobe**)                                   |
| `INITIAL_PASSWORD`    | `123456`                             | Prvé prihlasovacie heslo                                                      |
| `DATA_DIR`            | `~/.omniroute`                       | Adresár údajov (db, využitie, protokoly)                                      |
| `PORT`                | štandardný rámec                     | Servisný port (v príkladoch `20128`)                                          |
| `HOSTNAME`            | štandardný rámec                     | Bind host (Docker predvolene `0.0.0.0`)                                       |
| `NODE_ENV`            | runtime default                      | Nastaviť `production` na nasadenie                                            |
| `BASE_URL`            | `http://localhost:20128`             | Interná základná adresa URL na strane servera                                 |
| `CLOUD_URL`           | `https://omniroute.dev`              | Základná adresa URL koncového bodu synchronizácie v cloude                    |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Tajný kľúč HMAC pre vygenerované kľúče API                                    |
| `REQUIRE_API_KEY`     | `false`                              | Vynútiť kľúč rozhrania Bearer API na `/v1/*`                                  |
| `ENABLE_REQUEST_LOGS` | `false`                              | Povolí protokoly požiadaviek/odpovedí                                         |
| `AUTH_COOKIE_SECURE`  | `false`                              | Vynútiť `Secure` autorizačný súbor cookie (za HTTPS reverzným proxy serverom) |

Úplnú referenciu premenných prostredia nájdete v [README](../README.md).

---

## 📊 Dostupné modely

<details>
<summary><b>Zobraziť všetky dostupné modely</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — ZDARMA: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** – 0,6 USD/1 milión: `glm/glm-4.7`

**MiniMax (`minimax/`)** – 0,2 USD/1 milión: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — ZDARMA: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** – ZDARMA: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** – ZDARMA: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Zmätok (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Umelá inteligencia ohňostrojov (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Pokročilé funkcie

### Vlastné modely

Pridajte akékoľvek ID modelu k akémukoľvek poskytovateľovi bez čakania na aktualizáciu aplikácie:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Alebo použite Dashboard: **Poskytovatelia → [Poskytovateľ] → Vlastné modely**.

### Vyhradené trasy poskytovateľa

Smerujte požiadavky priamo ku konkrétnemu poskytovateľovi s overením modelu:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Ak chýba predpona poskytovateľa, automaticky sa pridá. Nezhodné modely vrátia `400`.

### Konfigurácia sieťového proxy

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

**Prednosť:** Špecifické pre kľúč → Špecifické pre kombináciu → Špecifické pre poskytovateľa → Globálne → Prostredie.

### API katalógu modelov

```bash
curl http://localhost:20128/api/models/catalog
```

Vráti modely zoskupené podľa poskytovateľa s typmi (`chat`, `embedding`, `image`).

### Cloud Sync

- Synchronizujte poskytovateľov, kombinácie a nastavenia medzi zariadeniami
- Automatická synchronizácia na pozadí s časovým limitom + rýchle zlyhanie
- Vo výrobe uprednostňujete `BASE_URL`/`CLOUD_URL` na strane servera

### LLM Gateway Intelligence (9. fáza)

- **Sémantická vyrovnávacia pamäť** – Automatické ukladanie do vyrovnávacej pamäte bez streamovania, teplota = 0 odoziev (obíďte pomocou `X-OmniRoute-No-Cache: true`)
  – **Idempotencia žiadosti** – Deduplikuje žiadosti do 5 s prostredníctvom hlavičky `Idempotency-Key` alebo `X-Request-Id`
  – **Sledovanie pokroku** – Prihláste sa do udalostí SSE `event: progress` prostredníctvom hlavičky `X-OmniRoute-Progress: true`

---

### Ihrisko pre prekladateľov

Prístup cez **Dashboard → Translator**. Laďte a vizualizujte, ako OmniRoute prekladá požiadavky API medzi poskytovateľmi.

| Režim                 | Účel                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------ |
| **Ihrisko**           | Vyberte zdrojové/cieľové formáty, vložte požiadavku a okamžite si pozrite preložený výstup |
| **Tester chatu**      | Posielajte správy živého chatu cez proxy a skontrolujte celý cyklus žiadostí/odpovedí      |
| **Testovacia lavica** | Spustite dávkové testy vo viacerých kombináciách formátov na overenie správnosti prekladu  |
| **Živý monitor**      | Sledujte preklady v reálnom čase, keď požiadavky prechádzajú cez server proxy              |

**Prípady použitia:**

- Odlaďte, prečo konkrétna kombinácia klient/poskytovateľ zlyhá
- Overte, či sa značky myslenia, volania nástrojov a systémové výzvy prekladajú správne
- Porovnajte rozdiely medzi formátmi OpenAI, Claude, Gemini a Responses API

---

### Stratégie smerovania

Konfigurujte cez **Dashboard → Nastavenia → Smerovanie**.

| Stratégia                     | Popis                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Vyplňte ako prvé**          | Používa účty v poradí podľa priority – primárny účet spracováva všetky požiadavky, kým nie je dostupný |
| **Round Robin**               | Prechádza cez všetky účty s konfigurovateľným fixným limitom (predvolené: 3 hovory na účet)            |
| **P2C (sila dvoch možností)** | Vyberie 2 náhodné účty a cesty k zdravšiemu — vyrovnáva záťaž s uvedomením si zdravia                  |
| **Náhodné**                   | Náhodne vyberie účet pre každú požiadavku pomocou Fisher-Yates shuffle                                 |
| **Najmenej používané**        | Smeruje na účet s najstaršou časovou pečiatkou `lastUsedAt`, rovnomerne rozdeľuje návštevnosť          |
| **Costovo optimalizované**    | Smeruje na účet s najnižšou prioritou, optimalizácia pre poskytovateľov s najnižšou cenou              |

#### Aliasy modelu so zástupnými znakmi

Vytvorte vzory zástupných znakov na premapovanie názvov modelov:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Zástupné znaky podporujú `*` (ľubovoľné znaky) a `?` (jeden znak).

#### Záložné reťazce

Definujte globálne záložné reťazce, ktoré platia pre všetky požiadavky:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Odolnosť a ističe

Konfigurujte cez **Dashboard → Nastavenia → Odolnosť**.

OmniRoute implementuje odolnosť na úrovni poskytovateľa so štyrmi komponentmi:

1. **Profily poskytovateľa** — Konfigurácia podľa jednotlivých poskytovateľov pre:
   - Prah zlyhania (koľko porúch pred otvorením)
   - Trvanie chladenia
   - Citlivosť detekcie limitu rýchlosti
   - Exponenciálne parametre backoff

2. **Upraviteľné limity rýchlosti** — Predvolené nastavenia na úrovni systému konfigurovateľné na paneli:
   - **Požiadavky za minútu (RPM)** – Maximálny počet žiadostí za minútu na účet
   - **Min Time Between Requests** – Minimálna medzera v milisekundách medzi požiadavkami
   - **Max Concurrent Requests** – Maximálny počet simultánnych požiadaviek na účet
   - Kliknite na **Upraviť** a upravte, potom na **Uložiť** alebo **Zrušiť**. Hodnoty pretrvávajú prostredníctvom rozhrania API odolnosti.

3. **Circuit Breaker** – Sleduje zlyhania podľa poskytovateľa a automaticky otvára okruh, keď sa dosiahne prah:
   - **ZATVORENÉ** (zdravé) – požiadavky prebiehajú normálne
   - **OPEN** — Poskytovateľ je po opakovaných zlyhaniach dočasne zablokovaný
   - **HALF_OPEN** – Testuje sa, či sa poskytovateľ zotavil

4. **Policies & Locked Identifiers** – Zobrazuje stav ističa a uzamknuté identifikátory s možnosťou vynútenia odomknutia.

5. **Automatická detekcia limitu sadzby** — Monitoruje hlavičky `429` a `Retry-After`, aby sa proaktívne vyhlo prekročeniu limitov sadzby poskytovateľa.

**Tip pre profesionálov:** Pomocou tlačidla **Resetovať všetko** vymažte všetky ističe a chladenia, keď sa poskytovateľ zotaví z výpadku.

---

### Export/Import databázy

Spravujte zálohy databázy v **Dashboard → Nastavenia → Systém a úložisko**.

| Akcia                           | Popis                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Exportovať databázu**         | Stiahne aktuálnu databázu SQLite ako súbor `.sqlite`                                                                            |
| **Exportovať všetko (.tar.gz)** | Stiahne celý záložný archív vrátane: databázy, nastavení, kombinácií, pripojení poskytovateľa (bez poverení), metadát kľúča API |
| **Importovať databázu**         | Ak chcete nahradiť aktuálnu databázu, nahrajte súbor `.sqlite`. Automaticky sa vytvorí záloha pred importom                     |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Overenie importu:** Overí sa integrita importovaného súboru (kontrola SQLite pragma), požadované tabuľky (`provider_connections`, `provider_nodes`, `combos`, ) a veľkosť (max. 0 MB).

**Prípady použitia:**

- Migrujte OmniRoute medzi strojmi
- Vytvorte externé zálohy na obnovu po havárii
- Zdieľanie konfigurácií medzi členmi tímu (exportovať všetko → zdieľať archív)

---

### Panel nastavení

Stránka nastavení je usporiadaná do 5 kariet pre jednoduchú navigáciu:

| Tab            | Obsah                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Bezpečnosť** | Nastavenia prihlasovacieho mena/hesla, riadenie prístupu IP, overenie API pre `/models` a blokovanie poskytovateľa           |
| **Smerovanie** | Globálna stratégia smerovania (6 možností), aliasy modelu so zástupnými znakmi, záložné reťazce, predvolené nastavenia komba |
| **Odolnosť**   | Profily poskytovateľov, upraviteľné limity sadzieb, stav ističa, zásady a zamknuté identifikátory                            |
| **AI**         | Konfigurácia rozpočtu myslenia, rýchle vloženie globálneho systému, rýchle štatistiky vyrovnávacej pamäte                    |
| **Pokročilé**  | Globálna konfigurácia proxy (HTTP/SOCKS5)                                                                                    |

---

### Správa nákladov a rozpočtu

Prístup cez **Dashboard → Náklady**.

| Tab          | Účel                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| **Rozpočet** | Nastavte limity výdavkov na kľúč API s dennými/týždennými/mesačnými rozpočtami a sledovaním v reálnom čase |
| **Ceny**     | Zobrazenie a úprava položiek cien modelu – cena za 1 000 vstupných/výstupných tokenov na poskytovateľa     |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Sledovanie nákladov:** Každá požiadavka zaznamenáva používanie tokenu a vypočítava náklady pomocou cenovej tabuľky. Pozrite si rozpisy v **Dashboard → Použitie** podľa poskytovateľa, modelu a kľúča API.

---

### Zvukový prepis

OmniRoute podporuje prepis zvuku cez koncový bod kompatibilný s OpenAI:

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

Dostupní poskytovatelia: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`,

---

### Kombinované stratégie vyvažovania

Nakonfigurujte vyváženie jednotlivých kombinácií v **Dashboard → Combos → Create/Edit → Strategy**.

| Stratégia                    | Popis                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| **Round-Robin**              | Postupne rotuje medzi modelmi                                                           |
| **Priorita**                 | Vždy vyskúšajte prvý model; vracia sa len pri chybe                                     |
| **Náhodné**                  | Vyberie náhodný model z kombinácie pre každú požiadavku                                 |
| **Vážený**                   | Trasy proporcionálne na základe pridelených hmotností na model                          |
| **Najmenej používané**       | Smeruje k modelu s najmenším počtom nedávnych požiadaviek (používa kombinovanú metriku) |
| **Nákladovo optimalizované** | Trasy k najlacnejšiemu dostupnému modelu (používa cenovú tabuľku)                       |

Globálne predvolené nastavenia pre kombináciu je možné nastaviť v **Dashboard → Settings → Routing → Combo Defaults**.

---

### Informačný panel zdravia

Prístup cez **Dashboard → Health**. Prehľad stavu systému v reálnom čase so 6 kartami:

| Karta                           | Čo ukazuje                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------- |
| **Stav systému**                | Uptime, verzia, využitie pamäte, dátový adresár                              |
| **Zdravie poskytovateľa**       | Stav ističa podľa poskytovateľa (zatvorené/otvorené/polootvorené)            |
| **Obmedzenia sadzieb**          | Aktívne zníženia rýchlosti limitu na účet so zostávajúcim časom              |
| **Aktívne blokovania**          | Poskytovatelia dočasne zablokovaní politikou uzamknutia                      |
| **Vyrovnávacia pamäť podpisov** | Štatistiky vyrovnávacej pamäte deduplikácie (aktívne kľúče, počet prístupov) |
| **Telemetria latencie**         | p50/p95/p99 agregácia latencie podľa poskytovateľa                           |

**Tip pre profesionálov:** Stránka Zdravie sa automaticky obnovuje každých 10 sekúnd. Pomocou karty ističa identifikujte, ktorí poskytovatelia majú problémy.
