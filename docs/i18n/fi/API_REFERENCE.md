# API-viite

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Täydellinen viite kaikille OmniRoute API -päätepisteille.

---

## Sisällysluettelo

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Chatin valmistuminen

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Mukautetut otsikot

| Otsikko                  | Suunta  | Kuvaus                                    |
| ------------------------ | ------- | ----------------------------------------- |
| `X-OmniRoute-No-Cache`   | Pyyntö  | Aseta `true` ohittaaksesi välimuistin     |
| `X-OmniRoute-Progress`   | Pyyntö  | Aseta arvoon `true` edistymistapahtumille |
| `Idempotency-Key`        | Pyyntö  | Dedup-avain (5s ikkuna)                   |
| `X-Request-Id`           | Pyyntö  | Vaihtoehtoinen dedup-avain                |
| `X-OmniRoute-Cache`      | Vastaus | `HIT` tai `MISS` (ei suoratoistoa)        |
| `X-OmniRoute-Idempotent` | Vastaus | `true` jos kopiointi poistetaan           |
| `X-OmniRoute-Progress`   | Vastaus | `enabled` jos edistymisen seuranta on     |

---

## Upotukset

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Saatavilla olevat toimittajat: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Kuvan luominen

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Saatavilla olevat toimittajat: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Listaa mallit

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Yhteensopivuuden päätepisteet

| Menetelmä | Polku                       | Muoto                        |
| --------- | --------------------------- | ---------------------------- |
| POST      | `/v1/chat/completions`      | OpenAI                       |
| POST      | `/v1/messages`              | Antrooppinen                 |
| POST      | `/v1/responses`             | OpenAI-vastaukset            |
| POST      | `/v1/embeddings`            | OpenAI                       |
| POST      | `/v1/images/generations`    | OpenAI                       |
| HANKI     | `/v1/models`                | OpenAI                       |
| POST      | `/v1/messages/count_tokens` | Antrooppinen                 |
| HANKI     | `/v1beta/models`            | Kaksoset                     |
| POST      | `/v1beta/models/{...path}`  | Kaksoset generoivat sisältöä |
| POST      | `/v1/api/chat`              | Ollama                       |

### Palveluntarjoajan reitit

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Palveluntarjoajan etuliite lisätään automaattisesti, jos se puuttuu. Yhteensopimattomat mallit palauttavat `400`.

---

## Semanttinen välimuisti

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Vastausesimerkki:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Kojelauta ja hallinta

### Todennus

| Päätepiste                    | Menetelmä | Kuvaus                               |
| ----------------------------- | --------- | ------------------------------------ |
| `/api/auth/login`             | POST      | Kirjaudu                             |
| `/api/auth/logout`            | POST      | Kirjaudu ulos                        |
| `/api/settings/require-login` | GET/PUT   | Vaihda sisäänkirjautuminen vaaditaan |

### Palveluntarjoajan hallinta

| Päätepiste                   | Menetelmä           | Kuvaus                                   |
| ---------------------------- | ------------------- | ---------------------------------------- |
| `/api/providers`             | HANKI/LÄHETÄ        | Luettelo / luo palveluntarjoajat         |
| `/api/providers/[id]`        | GET/PUT/DELETE      | Hallinnoi palveluntarjoajaa              |
| `/api/providers/[id]/test`   | POST                | Testaa palveluntarjoajan yhteyttä        |
| `/api/providers/[id]/models` | HANKI               | Luettelo tarjoajan mallit                |
| `/api/providers/validate`    | POST                | Tarkista palveluntarjoajan konfiguraatio |
| `/api/provider-nodes*`       | Erilaisia ​​        | Palveluntarjoajan solmuhallinta          |
| `/api/provider-models`       | HANKI/LÄHETÄ/POISTA | Räätälöidyt mallit                       |

### OAuth-kulkuja

| Päätepiste                       | Menetelmä    | Kuvaus                          |
| -------------------------------- | ------------ | ------------------------------- |
| `/api/oauth/[provider]/[action]` | Erilaisia ​​ | Palveluntarjoajakohtainen OAuth |

### Reititys ja konfigurointi

| Päätepiste            | Menetelmä    | Kuvaus                                    |
| --------------------- | ------------ | ----------------------------------------- |
| `/api/models/alias`   | HANKI/LÄHETÄ | Mallialiakset                             |
| `/api/models/catalog` | HANKI        | Kaikki mallit toimittajan + tyypin mukaan |
| `/api/combos*`        | Erilaisia ​​ | Yhdistelmähallinta                        |
| `/api/keys*`          | Erilaisia ​​ | API-avainten hallinta                     |
| `/api/pricing`        | HANKI        | Mallin hinnoittelu                        |

### Käyttö ja analyysi

| Päätepiste                  | Menetelmä | Kuvaus                 |
| --------------------------- | --------- | ---------------------- |
| `/api/usage/history`        | HANKI     | Käyttöhistoria         |
| `/api/usage/logs`           | HANKI     | Käyttölokit            |
| `/api/usage/request-logs`   | HANKI     | Pyyntötason lokit      |
| `/api/usage/[connectionId]` | HANKI     | Yhteyskohtainen käyttö |

### Asetukset

| Päätepiste                      | Menetelmä | Kuvaus                             |
| ------------------------------- | --------- | ---------------------------------- |
| `/api/settings`                 | GET/PUT   | Yleiset asetukset                  |
| `/api/settings/proxy`           | GET/PUT   | Verkon välityspalvelimen asetukset |
| `/api/settings/proxy/test`      | POST      | Testaa välityspalvelinyhteyttä     |
| `/api/settings/ip-filter`       | GET/PUT   | IP-sallitut/estolistat             |
| `/api/settings/thinking-budget` | GET/PUT   | Perustelujen merkkibudjetti        |
| `/api/settings/system-prompt`   | GET/PUT   | Globaali järjestelmäkehote         |

### Valvonta

| Päätepiste               | Menetelmä    | Kuvaus                        |
| ------------------------ | ------------ | ----------------------------- |
| `/api/sessions`          | HANKI        | Aktiivinen istunnon seuranta  |
| `/api/rate-limits`       | HANKI        | Tilikohtaiset korkorajat      |
| `/api/monitoring/health` | HANKI        | Terveystarkastus              |
| `/api/cache`             | HANKI/POISTA | Välimuistitilastot / tyhjennä |

### Varmuuskopiointi ja vienti/tuonti

| Päätepiste                  | Menetelmä | Kuvaus                                           |
| --------------------------- | --------- | ------------------------------------------------ |
| `/api/db-backups`           | HANKI     | Luettelo käytettävissä olevista varmuuskopioista |
| `/api/db-backups`           | PUT       | Luo manuaalinen varmuuskopio                     |
| `/api/db-backups`           | POST      | Palauta tietystä varmuuskopiosta                 |
| `/api/db-backups/export`    | HANKI     | Lataa tietokanta .sqlite-tiedostona              |
| `/api/db-backups/import`    | POST      | Lataa .sqlite-tiedosto korvataksesi tietokannan  |
| `/api/db-backups/exportAll` | HANKI     | Lataa koko varmuuskopio .tar.gz-arkistona        |

### Cloud Sync

| Päätepiste             | Menetelmä    | Kuvaus                     |
| ---------------------- | ------------ | -------------------------- |
| `/api/sync/cloud`      | Erilaisia ​​ | Pilvisynkronointitoiminnot |
| `/api/sync/initialize` | POST         | Alusta synkronointi        |
| `/api/cloud/*`         | Erilaisia ​​ | Pilvihallinta              |

### CLI-työkalut

| Päätepiste                         | Menetelmä | Kuvaus              |
| ---------------------------------- | --------- | ------------------- |
| `/api/cli-tools/claude-settings`   | HANKI     | Claude CLI tila     |
| `/api/cli-tools/codex-settings`    | HANKI     | Codex CLI -tila     |
| `/api/cli-tools/droid-settings`    | HANKI     | Droidin CLI-tila    |
| `/api/cli-tools/openclaw-settings` | HANKI     | OpenClaw CLI tila   |
| `/api/cli-tools/runtime/[toolId]`  | HANKI     | Yleinen CLI-ajoaika |

CLI-vastauksia ovat: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resilience & Rate Limits

| Päätepiste              | Menetelmä | Kuvaus                            |
| ----------------------- | --------- | --------------------------------- |
| `/api/resilience`       | GET/PUT   | Hanki/päivitä joustavuusprofiilit |
| `/api/resilience/reset` | POST      | Nollaa katkaisijat                |
| `/api/rate-limits`      | HANKI     | Tilikohtaisen koron rajan tila    |
| `/api/rate-limit`       | HANKI     | Yleisen nopeusrajan määritys      |

### Evals

| Päätepiste   | Menetelmä    | Kuvaus                                  |
| ------------ | ------------ | --------------------------------------- |
| `/api/evals` | HANKI/LÄHETÄ | Listaa eval-sviitit / suorita arviointi |

### Käytännöt

| Päätepiste      | Menetelmä           | Kuvaus                      |
| --------------- | ------------------- | --------------------------- |
| `/api/policies` | HANKI/LÄHETÄ/POISTA | Hallitse reitityskäytäntöjä |

### Vaatimustenmukaisuus

| Päätepiste                  | Menetelmä | Kuvaus                                             |
| --------------------------- | --------- | -------------------------------------------------- |
| `/api/compliance/audit-log` | HANKI     | Vaatimustenmukaisuuden tarkastusloki (viimeinen N) |

### v1beta (Gemini-yhteensopiva)

| Päätepiste                 | Menetelmä | Kuvaus                              |
| -------------------------- | --------- | ----------------------------------- |
| `/v1beta/models`           | HANKI     | Listaa mallit Gemini-muodossa       |
| `/v1beta/models/{...path}` | POST      | Gemini `generateContent` päätepiste |

Nämä päätepisteet heijastavat Geminin API-muotoa asiakkaille, jotka odottavat natiivi Gemini SDK -yhteensopivuutta.

### Sisäiset / järjestelmäsovellusliittymät

| Päätepiste      | Menetelmä | Kuvaus                                                             |
| --------------- | --------- | ------------------------------------------------------------------ |
| `/api/init`     | HANKI     | Sovelluksen alustuksen tarkistus (käytetty ensimmäisellä kerralla) |
| `/api/tags`     | HANKI     | Ollama-yhteensopivat mallitunnisteet (Ollama-asiakkaille)          |
| `/api/restart`  | POST      | Käynnistä siro palvelimen uudelleenkäynnistys                      |
| `/api/shutdown` | POST      | Laukaise siro palvelimen sammutus                                  |

> **Huomaa:** Näitä päätepisteitä käytetään sisäisesti järjestelmässä tai Ollama-asiakasyhteensopivuuden vuoksi. Loppukäyttäjät eivät yleensä soita niihin.

---

## Äänen transkriptio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Literoi äänitiedostot Deepgramilla tai AssemblyAI:lla.

**Pyyntö:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Vastaus:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Tuetut palveluntarjoajat:** `deepgram/nova-3`, `assemblyai/best`.

**Tuetut muodot:** `mp3`, `wav`, `m4a`, `flac`, `ogg`,

---

## Ollama-yhteensopivuus

Asiakkaille, jotka käyttävät Ollaman API-muotoa:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Pyynnöt käännetään automaattisesti Ollaman ja sisäisten muotojen välillä.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Vastaus:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Budjetti

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Mallin saatavuus

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Pyynnön käsittely

1. Asiakas lähettää pyynnön osoitteeseen `/v1/*`
2. Reitinkäsittelijän kutsut `handleChat`, `handleEmbedding`, `handleAudioTranscription` tai `handleImageGeneration`
3. Malli on ratkaistu (suora toimittaja/malli tai alias/yhdistelmä)
4. Tunnustiedot on valittu paikallisesta tietokannasta tilin saatavuussuodatuksella
5. Chat: `handleChatCore` — muodon tunnistus, käännös, välimuistin tarkistus, idempotenssin tarkistus
6. Palveluntarjoajan toteuttaja lähettää alkupään pyynnön
7. Vastaus käännetty takaisin asiakasmuotoon (chat) tai palautettu sellaisenaan (upotukset/kuvat/ääni)
8. Käyttö/loki kirjattu
9. Varmennus koskee virheitä yhdistelmäsääntöjen mukaisesti

Koko arkkitehtuuriviite: [link](ARCHITECTURE.md)

---

## Todennus

- Hallintapaneelireitit (`/dashboard/*`) käyttävät `auth_token` evästettä
- Kirjautuminen käyttää tallennettua salasanahajautusta; varaa `INITIAL_PASSWORD`
- `requireLogin` vaihdettavissa kautta `/api/settings/require-login`
- `/v1/*` reitit vaativat valinnaisesti Bearer API -avaimen, kun `REQUIRE_API_KEY=true`
