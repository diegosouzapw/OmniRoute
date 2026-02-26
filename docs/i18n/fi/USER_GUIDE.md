# Käyttöopas

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Täydellinen opas palveluntarjoajien määrittämiseen, yhdistelmien luomiseen, CLI-työkalujen integrointiin ja OmniRouten käyttöönottoon.

---

## Sisällysluettelo

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Hinnoittelu yhdellä silmäyksellä

| Taso             | Palveluntarjoaja  | Kustannukset         | Kiintiön nollaus       | Paras                      |
| ---------------- | ----------------- | -------------------- | ---------------------- | -------------------------- |
| **💳 TILAUS**    | Claude Code (Pro) | 20 dollaria/kk       | 5h + viikoittain       | jo tilattu                 |
|                  | Codex (Plus/Pro)  | 20-200 $/kk          | 5h + viikoittain       | OpenAI-käyttäjät           |
|                  | Gemini CLI        | **ILMAINEN**         | 180 tk/kk + 1 tk/päivä | Kaikki!                    |
|                  | GitHub Copilot    | 10-19 $/kk           | Kuukausittain          | GitHub-käyttäjät           |
| **🔑 API-AVAIN** | DeepSeek          | Maksu per käyttö     | Ei yhtään              | Halpa perustelu            |
|                  | Groq              | Maksu per käyttö     | Ei yhtään              | Erittäin nopea johtopäätös |
|                  | xAI (Grok)        | Maksu per käyttö     | Ei yhtään              | Grok 4 perustelut          |
|                  | Mistral           | Maksu per käyttö     | Ei yhtään              | EU:n isännöimät mallit     |
|                  | Hämmennys         | Maksu per käyttö     | Ei yhtään              | Haku-lisätty               |
|                  | Yhdessä AI        | Maksu per käyttö     | Ei yhtään              | Avoimen lähdekoodin mallit |
|                  | Ilotulitus AI     | Maksu per käyttö     | Ei yhtään              | Nopeat FLUX-kuvat          |
|                  | Aivot             | Maksu per käyttö     | Ei yhtään              | Kiekon mittakaavanopeus    |
|                  | Cohere            | Maksu per käyttö     | Ei yhtään              | Komento R+ RAG             |
|                  | NVIDIA NIM        | Maksu per käyttö     | Ei yhtään              | Yritysmallit               |
| **💰 EDULLISET** | GLM-4.7           | 0,6 $/1 milj.        | Päivittäin klo 10      | Budjetin varmuuskopio      |
|                  | MiniMax M2.1      | 0,2 $/1 milj.        | 5 tunnin rullaus       | Halvin vaihtoehto          |
|                  | Kimi K2           | 9 dollaria/kk asunto | 10 milj. rahakkeita/kk | Ennustettavat kustannukset |
| **🆓 ILMAINEN**  | iFlow             | 0 dollaria           | Rajoittamaton          | 8 mallia ilmaiseksi        |
|                  | Qwen              | 0 dollaria           | Rajoittamaton          | 3 mallia ilmaiseksi        |
|                  | Kiro              | 0 dollaria           | Rajoittamaton          | Claude ilmaiseksi          |

**💡 Pro-vinkki:** Aloita Gemini CLI:llä (180 000 ilmaista kuukaudessa) + iFlow (rajoittamaton ilmainen) -yhdistelmä = 0 dollarin hinta!

---

## 🎯 Käyttökotelot

### Tapaus 1: "Minulla on Claude Pro -tilaus"

**Ongelma:** Kiintiö vanhenee käyttämättä, nopeusrajoitukset raskaan koodauksen aikana

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Tapaus 2: "Haluan ilman kustannuksia"

**Ongelma:** Ei ole varaa tilauksiin, tarvitaan luotettavaa tekoälykoodausta

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Tapaus 3: "Tarvitsen 24/7-koodausta, ei keskeytyksiä"

**Ongelma:** Määräajat, seisokkeihin ei ole varaa

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

### Tapaus 4: "Haluan ILMAISTA tekoälyä OpenClawissa"

**Ongelma:** Tarvitset AI-avustajan viestisovelluksissa, täysin ilmainen

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Palveluntarjoajan asetukset

### 🔐 Tilauspalveluntarjoajat

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

**Provinkki:** Käytä Opusta monimutkaisiin tehtäviin ja Sonnetia nopeutta varten. OmniRoute jäljityskiintiö mallia kohden!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (ILMAINEN 180 000/kk!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Paras hinta-laatusuhde:** Valtava ilmainen taso! Käytä tätä ennen maksettuja tasoja.

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

### 💰 Halvat palveluntarjoajat

#### GLM-4.7 (päivittäinen nollaus, 0,6 $/1 milj.)

1. Rekisteröidy: [Zhipu AI](https://open.bigmodel.cn/)
2. Hanki API-avain Coding Planista
3. Hallintapaneeli → Lisää API-avain: Palveluntarjoaja: `glm`, API-avain: `your-key`

**Käytä:** `glm/glm-4.7` — **Provinkki:** Koodaussuunnitelma tarjoaa 3× kiintiön 1/7 hinnalla! Nollaa päivittäin klo 10.00.

#### MiniMax M2.1 (5 h nollaus, 0,20 $/1 milj.)

1. Rekisteröidy: [MiniMax](https://www.minimax.io/)
2. Hanki API-avain → Dashboard → Add API Key

**Käytä:** `minimax/MiniMax-M2.1` — **Ammattilaisen vinkki:** Halvin vaihtoehto pitkälle kontekstille (1 milj. merkkiä)!

#### Kimi K2 (9 dollaria/kk asunto)

1. Tilaa: [Moonshot AI](https://platform.moonshot.ai/)
2. Hanki API-avain → Dashboard → Add API Key

**Käyttö:** `kimi/kimi-latest` — **Ammattilaisen vinkki:** Kiinteä 9 dollaria kuukaudessa 10 miljoonalle rahakkeelle = 0,90 dollaria / 1 miljoona todellista hintaa!

### 🆓 ILMAISIA palveluntarjoajia

#### iFlow (8 ILMAISTA mallia)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 ILMAISTA mallia)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude ILMAINEN)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Yhdistelmät

### Esimerkki 1: Maksimoi tilaus → Halpa varmuuskopio

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Esimerkki 2: Vain ilmainen (nollahinta)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI-integraatio

### Kohdistimen IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Muokkaa `~/.claude/config.json`:

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

Muokkaa `~/.openclaw/openclaw.json`:

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

**Tai käytä Dashboardia:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Käyttöönotto

### VPS-käyttöönotto

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

Katso isäntäintegroitu tila CLI-binaarien kanssa pääasiakirjojen Docker-osiosta.

### Ympäristömuuttujat

| Muuttuja              | Oletus                               | Kuvaus                                                                     |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | JWT:n allekirjoitussalaisuus (**muutos tuotannossa**)                      |
| `INITIAL_PASSWORD`    | `123456`                             | Ensimmäisen kirjautumisen salasana                                         |
| `DATA_DIR`            | `~/.omniroute`                       | Tietohakemisto (db, käyttö, lokit)                                         |
| `PORT`                | oletuskehys                          | Huoltoportti (`20128` esimerkeissä)                                        |
| `HOSTNAME`            | oletuskehys                          | Sido isäntä (Dockerin oletusarvo on `0.0.0.0`)                             |
| `NODE_ENV`            | ajonaikainen oletus                  | Aseta `production` käyttöönottoa varten                                    |
| `BASE_URL`            | `http://localhost:20128`             | Palvelinpuolen sisäinen perus-URL                                          |
| `CLOUD_URL`           | `https://omniroute.dev`              | Pilvisynkronoinnin päätepisteen perus-URL                                  |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Luotujen API-avaimien HMAC-salaisuus                                       |
| `REQUIRE_API_KEY`     | `false`                              | Pakota Bearer API-avain `/v1/*`                                            |
| `ENABLE_REQUEST_LOGS` | `false`                              | Ottaa käyttöön pyyntö-/vastauslokit                                        |
| `AUTH_COOKIE_SECURE`  | `false`                              | Pakota `Secure` todennuseväste (HTTPS-käänteisen välityspalvelimen takana) |

Täydellinen ympäristömuuttujaviittaus on kohdassa [README](../README.md).

---

## 📊 Saatavilla olevat mallit

<details>
<summary><b>Näytä kaikki saatavilla olevat mallit</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Koodi (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** – ILMAISEKSI: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** – 0,6 $/1 milj.: `glm/glm-4.7`

**MiniMax (`minimax/`)** – 0,2 $/1 milj.: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** – ILMAISEKSI: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** – ILMAISEKSI: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** – ILMAISEKSI: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Epäselvyys (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Yhdessä AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Ilotulitus AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Aivot (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Yhdenmukainen (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Lisäominaisuudet

### Mukautetut mallit

Lisää mikä tahansa mallitunnus mille tahansa palveluntarjoajalle odottamatta sovelluspäivitystä:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Tai käytä Dashboardia: **Providers → [Provider] → Custom Models**.

### Palveluntarjoajan reitit

Reititä pyynnöt suoraan tietylle palveluntarjoajalle mallin validoinnilla:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Palveluntarjoajan etuliite lisätään automaattisesti, jos se puuttuu. Yhteensopimattomat mallit palauttavat `400`.

### Verkkovälityspalvelimen asetukset

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

**Ensisijaisuus:** Avainkohtainen → Yhdistelmäkohtainen → Palveluntarjoajakohtainen → Globaali → Ympäristö.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Palauttaa mallit ryhmiteltyinä tarjoajan mukaan tyypeillä (`chat`, `embedding`, `image`).

### Cloud Sync

- Synkronoi palveluntarjoajat, yhdistelmät ja asetukset eri laitteiden välillä
- Automaattinen taustasynkronointi aikakatkaisulla + Fast Fast
- Valitse palvelinpuolen `BASE_URL`/`CLOUD_URL` tuotannossa

### LLM Gateway Intelligence (vaihe 9)

- **Semanttinen välimuisti** — Tallentaa automaattisesti välimuistiin ei-suoratoistoa, lämpötila = 0 vastausta (ohita `X-OmniRoute-No-Cache: true`)
- **Request Idempotency** – Poistaa pyyntöjen päällekkäisyydet 5 sekunnissa `Idempotency-Key`- tai `X-Request-Id`-otsikon kautta
- **Edistyksen seuranta** — Ota SSE `event: progress` -tapahtumat käyttöön `X-OmniRoute-Progress: true`-otsikon kautta

---

### Kääntäjän leikkikenttä

Pääsy **Dashboard → Kääntäjän** kautta. Tee virheenkorjaus ja visualisoi, kuinka OmniRoute kääntää API-pyynnöt palveluntarjoajien välillä.

| Tila                      | Tarkoitus                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| **Leikkikenttä**          | Valitse lähde-/kohdemuodot, liitä pyyntö ja näet käännetyn tulosteen välittömästi        |
| **Pikaviestien testaaja** | Lähetä live-chat-viestejä välityspalvelimen kautta ja tarkista koko pyyntö-/vastausjakso |
| **Testipenkki**           | Suorita erätestejä useille muotoyhdistelmille varmistaaksesi käännöksen oikeellisuuden   |
| **Live Monitor**          | Katso reaaliaikaisia ​​käännöksiä, kun pyynnöt kulkevat välityspalvelimen kautta         |

**Käyttötapaukset:**

- Selvitä, miksi tietty asiakas/toimittaja-yhdistelmä epäonnistuu
- Varmista, että ajattelutunnisteet, työkalukutsut ja järjestelmäkehotteet käännetään oikein
- Vertaa muotoeroja OpenAI-, Claude-, Gemini- ja Responses API -muotojen välillä

---

### Reititysstrategiat

Määritä kohdasta **Kojelauta → Asetukset → Reititys**.

| Strategia                      | Kuvaus                                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Täytä ensin**                | Käyttää tilejä tärkeysjärjestyksessä — ensisijainen tili käsittelee kaikki pyynnöt, kunnes ne eivät ole käytettävissä |
| **Round Robin**                | Selaa kaikki tilit, joilla on määritettävissä oleva rajoitus (oletus: 3 puhelua tiliä kohden)                         |
| **P2C (Kahden valinnan teho)** | Valitsee 2 satunnaista tiliä ja reitit terveempään tiliin – tasapainottaa kuormituksen terveystietoisuuden kanssa     |
| **Satunnainen**                | Valitsee satunnaisesti tilin kullekin pyynnölle käyttämällä Fisher-Yates shuffle                                      |
| **Vähiten käytetty**           | Reitit tilille, jolla on vanhin `lastUsedAt` aikaleima, jakaen liikenteen tasaisesti                                  |
| **Kustannusoptimoitu**         | Reitit tilille, jolla on alhaisin prioriteettiarvo, optimointi edullisimpien palveluntarjoajien mukaan                |

#### Jokerimerkkimallin aliakset

Luo jokerimerkkikuvioita mallien nimien yhdistämiseksi uudelleen:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Jokerimerkit tukevat `*` (kaikki merkit) ja `?` (yksi merkki).

#### Varaketjut

Määritä maailmanlaajuiset varaketjut, jotka koskevat kaikkia pyyntöjä:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Kestävyys ja katkaisijat

Määritä kohdasta **Kojelauta → Asetukset → Resilience**.

OmniRoute toteuttaa toimittajatason joustavuutta neljällä osalla:

1. **Toimittajan profiilit** — Palveluntarjoajakohtainen määritys:
   - Vikakynnys (kuinka monta vikaa ennen avaamista)
   - Jäähdytyskesto
   - Nopeusrajan tunnistusherkkyys
   - Eksponentiaaliset peruutusparametrit

2. **Muokattavat nopeusrajoitukset** — Järjestelmätason oletusasetukset, jotka voidaan määrittää kojelaudassa:
   - **Pyynnöt minuutissa (RPM)** – Pyyntöjen enimmäismäärä minuutissa per tili
   - **Pyyntöjen välinen vähimmäisaika** - pyyntöjen välinen vähimmäisero millisekunteina
   - **Samanaikaisten pyyntöjen enimmäismäärä** — Samanaikaisten pyyntöjen enimmäismäärä tiliä kohden
   - Napsauta **Muokkaa** muokataksesi ja sitten **Tallenna** tai **Peruuta**. Arvot säilyvät resilience API:n kautta.

3. **Circuit Breaker** – Seuraa vikoja palveluntarjoajakohtaisesti ja avaa piirin automaattisesti, kun kynnys saavutetaan:
   - **SULJETTU** (terve) — Pyynnöt kulkevat normaalisti
   - **AUKI** — Palveluntarjoaja on tilapäisesti estetty toistuvien vikojen jälkeen
   - **HALF_OPEN** — Testataan, onko palveluntarjoaja palautunut

4. **Policies & Locked Identifiers** — Näyttää katkaisijan tilan ja lukitut tunnisteet, joissa on pakko-avaaminen.

5. **Automaattinen nopeusrajoituksen tunnistus** — Valvoo `429`- ja `Retry-After`-otsikoita välttääkseen ennakoivasti palveluntarjoajan nopeusrajojen ylittymisen.

**Ammattilaisen vinkki:** Käytä **Nollaa kaikki** -painiketta tyhjentääksesi kaikki katkaisijat ja jäähdytykset, kun palveluntarjoaja toipuu katkosta.

---

### Tietokannan vienti/tuonti

Hallitse tietokannan varmuuskopioita kohdassa **Käyttöpaneeli → Asetukset → Järjestelmä ja tallennus**.

| Toiminta                 | Kuvaus                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vie tietokanta**       | Lataa nykyisen SQLite-tietokannan `.sqlite`-tiedostona                                                                                                         |
| **Vie kaikki (.tar.gz)** | Lataa täyden varmuuskopioarkiston, joka sisältää: tietokannan, asetukset, yhdistelmät, palveluntarjoajan yhteydet (ei tunnistetietoja), API-avaimen metatiedot |
| **Tuo tietokanta**       | Lataa `.sqlite`-tiedosto nykyisen tietokannan tilalle. Tuontia edeltävä varmuuskopio luodaan automaattisesti                                                   |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Tuonnin vahvistus:** Tuodun tiedoston eheys (SQLite pragma check), vaaditut taulukot (`provider_connections`, `provider_nodes`, `combos`, ) ja koko 0 (0 MB) tarkistetaan.

**Käyttötapaukset:**

- Siirrä OmniRoute koneiden välillä
- Luo ulkoisia varmuuskopioita katastrofipalautusta varten
- Jaa kokoonpanot tiimin jäsenten välillä (vie kaikki → jaa arkisto)

---

### Asetukset Dashboard

Asetussivu on järjestetty viiteen välilehteen navigoinnin helpottamiseksi:

| Välilehti         | Sisältö                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| **Turvallisuus**  | Kirjautumis-/salasana-asetukset, IP-käytön valvonta, API-todennus kohteelle `/models` ja palveluntarjoajan esto |
| **Reititys**      | Globaali reititysstrategia (6 vaihtoehtoa), jokerimerkkimallien aliakset, varaketjut, yhdistelmäoletukset       |
| **Kestävyys**     | Palveluntarjoajan profiilit, muokattavat nopeusrajoitukset, katkaisijan tila, käytännöt ja lukitut tunnisteet   |
| **AI**            | Ajatteleva budjettimäärittely, globaali järjestelmäkehote, nopea välimuistitilastot                             |
| **Lisäasetukset** | Yleiset välityspalvelimen asetukset (HTTP/SOCKS5)                                                               |

---

### Kustannukset ja budjetin hallinta

Pääsy kohdasta **Käyttöpaneeli → Kulut**.

| Välilehti       | Tarkoitus                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Budjetti**    | Aseta kulutusrajat API-avaimelle päivä-/viikko-/kuukausibudjeteilla ja reaaliaikaisella seurannalla             |
| **Hinnoittelu** | Tarkastele ja muokkaa mallin hinnoittelumerkintöjä – hinta per 1 000 syöttö-/tulostustunnusta toimittajaa kohti |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Kustannusten seuranta:** Jokainen pyyntö kirjaa tunnuksen käytön ja laskee kustannukset hinnoittelutaulukon avulla. Näytä erittelyt kohdassa **Käyttöpaneeli → Käyttö** tarjoajan, mallin ja API-avaimen mukaan.

---

### Äänen transkriptio

OmniRoute tukee äänen transkriptiota OpenAI-yhteensopivan päätepisteen kautta:

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

Saatavilla olevat palveluntarjoajat: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Tuetut äänimuodot: `mp3`, `wav`, `m4a`, `flac`, `ogg`,

---

### Yhdistelmätasapainotusstrategiat

Määritä yhdistelmäkohtainen tasapainotus kohdassa **Käyttöpaneeli → Yhdistelmät → Luo/muokkaa → Strategia**.

| Strategia              | Kuvaus                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Round-Robin**        | Pyörii mallien välillä peräkkäin                                                         |
| **Etusija**            | Kokeilee aina ensimmäistä mallia; palautuu vain virheen yhteydessä                       |
| **Satunnainen**        | Valitsee satunnaisen mallin yhdistelmästä jokaiselle pyynnölle                           |
| **Painotettu**         | Reitit suhteellisesti mallikohtaisten painojen perusteella                               |
| **Vähiten käytetty**   | Reitit malliin, jolla on vähiten viimeaikaisia ​​pyyntöjä (käyttää yhdistelmämittareita) |
| **Kustannusoptimoitu** | Reitit halvimpaan saatavilla olevaan malliin (käyttää hinnoittelutaulukkoa)              |

Yleiset yhdistelmäoletukset voidaan asettaa kohdassa **Kojelauta → Asetukset → Reititys → Yhdistelmäoletukset**.

---

### Terveyden hallintapaneeli

Pääsy kohdasta **Dashboard → Health**. Reaaliaikainen järjestelmän kunnon yleiskatsaus 6 kortilla:

| Kortti                      | Mitä se näyttää                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------ |
| **Järjestelmän tila**       | Käyttöaika, versio, muistin käyttö, tietohakemisto                                   |
| **Tarjoajan terveys**       | Palveluntarjoajakohtainen katkaisijan tila (suljettu/auki/puoliauki)                 |
| **Rate Limits**             | Aktiivisen nopeuden rajan viilennyksiä tiliä kohti jäljellä olevan ajan kanssa       |
| **Aktiiviset lukitukset**   | Palveluntarjoajat, jotka on tilapäisesti estetty lukituskäytännön vuoksi             |
| **Allekirjoitusvälimuisti** | Päällekkäisyyden poistamisen välimuistitilastot (aktiiviset avaimet, osumaprosentti) |
| **Viiveen telemetria**      | p50/p95/p99 latenssin yhteenlaskettu palveluntarjoajakohtainen                       |

**Provinkki:** Terveys-sivu päivittyy automaattisesti 10 sekunnin välein. Käytä katkaisijakorttia tunnistaaksesi, millä palveluntarjoajilla on ongelmia.
