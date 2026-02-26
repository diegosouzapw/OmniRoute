# Guida per l'utente

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Guida completa per la configurazione dei provider, la creazione di combinazioni, l'integrazione degli strumenti CLI e la distribuzione di OmniRoute.

---

## Sommario

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prezzi in breve

| Livello            | Fornitore             | Costo             | Reimpostazione quota     | Ideale per               |
| ------------------ | --------------------- | ----------------- | ------------------------ | ------------------------ |
| **💳 ABBONAMENTO** | Codice Claude (Pro)   | $20/mese          | 5 ore + settimanale      | Già iscritto             |
|                    | Codice (Plus/Pro)     | $20-200/mese      | 5 ore + settimanale      | Utenti OpenAI            |
|                    | Gemelli CLI           | **GRATIS**        | 180K/mese + 1K/giorno    | Tutti!                   |
|                    | Copilota GitHub       | $ 10-19/mese      | Mensile                  | Utenti GitHub            |
| **🔑 CHIAVE API**  | Ricerca profonda      | Paga per utilizzo | Nessuno                  | Ragionamento economico   |
|                    | Groq                  | Paga per utilizzo | Nessuno                  | Inferenza ultraveloce    |
|                    | xAI (Grok)            | Paga per utilizzo | Nessuno                  | Grok 4 ragionamento      |
|                    | Maestrale             | Paga per utilizzo | Nessuno                  | Modelli ospitati nell'UE |
|                    | Perplessità           | Paga per utilizzo | Nessuno                  | Ricerca aumentata        |
|                    | Insieme AI            | Paga per utilizzo | Nessuno                  | Modelli open source      |
|                    | Fuochi d'artificio AI | Paga per utilizzo | Nessuno                  | Immagini FLUX veloci     |
|                    | Cerebri               | Paga per utilizzo | Nessuno                  | Velocità su scala wafer  |
|                    | Coerenza              | Paga per utilizzo | Nessuno                  | Comando R+ RAG           |
|                    | NVIDIA NIM            | Paga per utilizzo | Nessuno                  | Modelli di impresa       |
| **💰 ECONOMICO**   | GLM-4.7               | $ 0,6/1 milione   | Tutti i giorni 10:00     | Backup del budget        |
|                    | MiniMax M2.1          | $ 0,2/1 milione   | 5 ore di rotazione       | Opzione più economica    |
|                    | Kimi K2               | $ 9/mese fisso    | 10 milioni di token/mese | Costo prevedibile        |
| **🆓 GRATUITO**    | iFlow                 | $0                | Illimitato               | 8 modelli gratuiti       |
|                    | Qwen                  | $0                | Illimitato               | 3 modelli gratuiti       |
|                    | Kiro                  | $0                | Illimitato               | Claude libero            |

**💡 Suggerimento da professionista:** Inizia con la combinazione Gemini CLI (180.000 gratuiti al mese) + iFlow (gratuito illimitato) = costo $ 0!

---

## 🎯 Casi d'uso

### Caso 1: "Ho un abbonamento Claude Pro"

**Problema:** La quota scade inutilizzata, limiti di velocità durante la codifica pesante

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Caso 2: "Voglio zero costi"

**Problema:** non posso permettermi abbonamenti, ho bisogno di una codifica IA affidabile

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Caso 3: "Ho bisogno di codifica 24 ore su 24, 7 giorni su 7, senza interruzioni"

**Problema:** Scadenze, non posso permettermi tempi di inattività

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

### Caso 4: "Voglio un'intelligenza artificiale GRATUITA in OpenClaw"

**Problema:** È necessario un assistente AI nelle app di messaggistica, completamente gratuito

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Configurazione del fornitore

### 🔐 Fornitori di abbonamenti

#### Codice Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Suggerimento professionale:** usa Opus per attività complesse, Sonnet per la velocità. OmniRoute tiene traccia della quota per modello!

#### Codice OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (180.000 GRATIS al mese!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Miglior rapporto qualità-prezzo:** Enorme livello gratuito! Utilizzalo prima dei livelli a pagamento.

#### Copilota GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Fornitori economici

#### GLM-4.7 (ripristino giornaliero, $ 0,6/1 milione)

1. Iscriviti: [Zhipu AI](https://open.bigmodel.cn/)
2. Ottieni la chiave API dal piano di codifica
3. Dashboard → Aggiungi chiave API: Provider: `glm`, Chiave API: `your-key`

**Utilizza:** `glm/glm-4.7` — **Suggerimento professionale:** Il piano di codifica offre una quota 3× a un costo di 1/7! Resetta ogni giorno alle 10:00.

#### MiniMax M2.1 (ripristino in 5 ore, $ 0,20/1 milione)

1. Iscriviti: [MiniMax](https://www.minimax.io/)
2. Ottieni chiave API → Dashboard → Aggiungi chiave API

**Utilizza:** `minimax/MiniMax-M2.1` — **Suggerimento professionale:** Opzione più economica per contesti lunghi (token da 1 milione)!

#### Kimi K2 ($9/mese fisso)

1. Iscriviti: [Moonshot AI](https://platform.moonshot.ai/)
2. Ottieni chiave API → Dashboard → Aggiungi chiave API

**Utilizza:** `kimi/kimi-latest` — **Suggerimento da professionista:** $ 9/mese fissi per 10 milioni di token = $ 0,90/1 milione di costi effettivi!

### 🆓 Fornitori GRATUITI

#### iFlow (8 modelli GRATUITI)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modelli GRATUITI)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨Combo

### Esempio 1: Massimizza l'abbonamento → Backup economico

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Esempio 2: solo gratuito (costo zero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧Integrazione CLI

### IDE del cursore

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Codice Claude

Modifica `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codice CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Modifica `~/.openclaw/openclaw.json`:

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

**Oppure utilizza Dashboard:** Strumenti CLI → OpenClaw → Configurazione automatica

### Cline / Continua / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Distribuzione

### Distribuzione VPS

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

### Finestra mobile

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Per la modalità integrata nell'host con i file binari della CLI, consulta la sezione Docker nella documentazione principale.

### Variabili d'ambiente

| Variabile             | Predefinito                          | Descrizione                                                                |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Segreto firma JWT (**cambio di produzione**)                               |
| `INITIAL_PASSWORD`    | `123456`                             | Prima password di accesso                                                  |
| `DATA_DIR`            | `~/.omniroute`                       | Directory dati (db, utilizzo, log)                                         |
| `PORT`                | quadro predefinito                   | Porta di servizio (`20128` negli esempi)                                   |
| `HOSTNAME`            | quadro predefinito                   | Associa host (Docker per impostazione predefinita è `0.0.0.0`)             |
| `NODE_ENV`            | impostazione predefinita di runtime  | Imposta `production` per la distribuzione                                  |
| `BASE_URL`            | `http://localhost:20128`             | URL di base interno lato server                                            |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL di base dell'endpoint di sincronizzazione cloud                        |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Segreto HMAC per le chiavi API generate                                    |
| `REQUIRE_API_KEY`     | `false`                              | Applica la chiave API Bearer su `/v1/*`                                    |
| `ENABLE_REQUEST_LOGS` | `false`                              | Abilita i log di richiesta/risposta                                        |
| `AUTH_COOKIE_SECURE`  | `false`                              | Forza il cookie di autenticazione `Secure` (dietro il proxy inverso HTTPS) |

Per il riferimento completo alle variabili di ambiente, vedere [README](../README.md).

---

## 📊 Modelli Disponibili

<details>
<summary><b>Visualizza tutti i modelli disponibili</b></summary>

**Codice Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codice (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATUITO: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilota GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $ 0,6/1 milione: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $ 0,2/1 milione: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATUITO: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATUITO: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATUITO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Maestrale (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplessità (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Insieme AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fuochi d'artificio AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebra (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Coerenza (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Funzionalità avanzate

### Modelli personalizzati

Aggiungi qualsiasi ID modello a qualsiasi provider senza attendere un aggiornamento dell'app:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Oppure utilizza la Dashboard: **Provider → [Provider] → Modelli personalizzati**.

### Percorsi di provider dedicati

Instrada le richieste direttamente a un fornitore specifico con convalida del modello:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Se mancante, il prefisso del provider viene aggiunto automaticamente. I modelli non corrispondenti restituiscono `400`.

### Configurazione del proxy di rete

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

**Precedenza:** Specifico per chiave → Specifico per combo → Specifico per provider → Globale → Ambiente.

### API del catalogo modelli

```bash
curl http://localhost:20128/api/models/catalog
```

Restituisce modelli raggruppati per provider con tipi (`chat`, `embedding`, `image`).

### Sincronizzazione nel cloud

- Sincronizza provider, combo e impostazioni su tutti i dispositivi
- Sincronizzazione automatica in background con timeout + fail-fast
- Preferisci lato server `BASE_URL`/`CLOUD_URL` in produzione

### LLM Gateway Intelligence (Fase 9)

- **Cache semantica**: memorizza automaticamente nella cache le risposte non in streaming, temperatura=0 (ignora con `X-OmniRoute-No-Cache: true`)
- **Idempotenza richiesta**: deduplica le richieste entro 5 secondi tramite l'intestazione `Idempotency-Key` o `X-Request-Id`
- **Monitoraggio dei progressi**: attivazione degli eventi SSE `event: progress` tramite l'intestazione `X-OmniRoute-Progress: true`

---

### Parco giochi per traduttori

Accesso tramite **Dashboard → Traduttore**. Eseguire il debug e visualizzare il modo in cui OmniRoute traduce le richieste API tra provider.

| Modalità                  | Scopo                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Parco giochi**          | Seleziona i formati di origine/destinazione, incolla una richiesta e visualizza immediatamente l'output tradotto |
| **Tester della chat**     | Invia messaggi di chat dal vivo tramite il proxy e controlla l'intero ciclo di richiesta/risposta                |
| **Banco di prova**        | Esegui test batch su più combinazioni di formati per verificare la correttezza della traduzione                  |
| **Monitoraggio dal vivo** | Guarda le traduzioni in tempo reale mentre le richieste passano attraverso il proxy                              |

**Casi d'uso:**

- Debug del motivo per cui una specifica combinazione client/provider non riesce
- Verificare che i tag pensanti, le chiamate agli strumenti e i prompt di sistema vengano tradotti correttamente
- Confronta le differenze di formato tra i formati OpenAI, Claude, Gemini e Responses API

---

### Strategie di instradamento

Configura tramite **Dashboard → Impostazioni → Routing**.

| Strategia                         | Descrizione                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Compila prima**                 | Utilizza gli account in ordine di priorità: l'account principale gestisce tutte le richieste fino a quando non è disponibile |
| **Round Robin**                   | Scorre tutti gli account con un limite permanente configurabile (impostazione predefinita: 3 chiamate per account)           |
| **P2C (il potere di due scelte)** | Scegli 2 account casuali e percorsi verso quello più sano: bilancia il carico con la consapevolezza della salute             |
| **Casuale**                       | Seleziona casualmente un account per ciascuna richiesta utilizzando Fisher-Yates shuffle                                     |
| **Meno usato**                    | Indirizza all'account con il timestamp `lastUsedAt` più vecchio, distribuendo il traffico in modo uniforme                   |
| **Costi ottimizzati**             | Instrada all'account con il valore di priorità più basso, ottimizzando per i fornitori a basso costo                         |

#### Alias ​​del modello con caratteri jolly

Crea modelli con caratteri jolly per rimappare i nomi dei modelli:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

I caratteri jolly supportano `*` (qualsiasi carattere) e `?` (carattere singolo).

#### Catene di riserva

Definisci catene di fallback globali che si applicano a tutte le richieste:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Resilienza e interruttori automatici

Configura tramite **Dashboard → Impostazioni → Resilienza**.

OmniRoute implementa la resilienza a livello di fornitore con quattro componenti:

1. **Profili fornitore**: configurazione per fornitore per:
   - Soglia di guasto (quanti guasti prima dell'apertura)
   - Durata del raffreddamento
   - Sensibilità di rilevamento del limite di velocità
   - Parametri di backoff esponenziale

2. **Limiti di velocità modificabili**: impostazioni predefinite a livello di sistema configurabili nel dashboard:
   - **Richieste al minuto (RPM)**: numero massimo di richieste al minuto per account
   - **Tempo minimo tra le richieste**: intervallo minimo in millisecondi tra le richieste
   - **Numero massimo di richieste simultanee**: numero massimo di richieste simultanee per account
   - Fai clic su **Modifica** per modificare, quindi su **Salva** o **Annulla**. I valori persistono tramite l'API di resilienza.

3. **Interruttore di circuito**: tiene traccia dei guasti per fornitore e apre automaticamente il circuito quando viene raggiunta una soglia:
   - **CHIUSO** (integro): le richieste fluiscono normalmente
   - **APERTO**: il provider è temporaneamente bloccato dopo ripetuti errori
   - **HALF_OPEN**: verifica se il provider è stato ripristinato

4. **Criteri e identificatori bloccati**: mostra lo stato dell'interruttore automatico e gli identificatori bloccati con funzionalità di sblocco forzato.

5. **Rilevamento automatico del limite di velocità**: monitora le intestazioni `429` e `Retry-After` per evitare in modo proattivo di raggiungere i limiti di velocità del provider.

**Suggerimento avanzato:** utilizza il pulsante **Reimposta tutto** per eliminare tutti gli interruttori automatici e i tempi di recupero quando un fornitore si riprende da un'interruzione.

---

### Esportazione/importazione del database

Gestisci i backup del database in **Dashboard → Impostazioni → Sistema e archiviazione**.

| Azione                      | Descrizione                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Esporta database**        | Scarica il database SQLite corrente come file `.sqlite`                                                                                                     |
| **Esporta tutto (.tar.gz)** | Scarica un archivio di backup completo che include: database, impostazioni, combo, connessioni al provider (nessuna credenziale), metadati della chiave API |
| **Importa database**        | Carica un file `.sqlite` per sostituire il database corrente. Viene creato automaticamente un backup pre-importazione                                       |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Convalida dell'importazione:** il file importato viene convalidato per l'integrità (controllo pragma SQLite), le tabelle richieste (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) e le dimensioni (max 100 MB).

**Casi d'uso:**

- Migrare OmniRoute tra macchine
- Creare backup esterni per il ripristino di emergenza
- Condividi le configurazioni tra i membri del team (esporta tutto → condividi archivio)

---

### Pannello delle impostazioni

La pagina delle impostazioni è organizzata in 5 schede per una facile navigazione:

| Scheda         | Contenuto                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Sicurezza**  | Impostazioni accesso/password, controllo accesso IP, autenticazione API per `/models` e blocco provider                                 |
| **Percorso**   | Strategia di routing globale (6 opzioni), alias del modello con caratteri jolly, catene di fallback, impostazioni predefinite combinate |
| **Resilienza** | Profili dei fornitori, limiti di velocità modificabili, stato dell'interruttore automatico, policy e identificatori bloccati            |
| **AI**         | Pensare alla configurazione del budget, all'inserimento dei prompt del sistema globale, alle statistiche della cache dei prompt         |
| **Avanzato**   | Configurazione proxy globale (HTTP/SOCKS5)                                                                                              |

---

### Gestione dei costi e del budget

Accesso tramite **Dashboard → Costi**.

| Scheda       | Scopo                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| **Bilancio** | Imposta limiti di spesa per chiave API con budget giornalieri/settimanali/mensili e monitoraggio in tempo reale |
| **Prezzi**   | Visualizza e modifica le voci dei prezzi dei modelli: costo per token di input/output da 1.000 per fornitore    |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Monitoraggio dei costi:** ogni richiesta registra l'utilizzo del token e calcola il costo utilizzando la tabella dei prezzi. Visualizza i dettagli in **Dashboard → Utilizzo** per provider, modello e chiave API.

---

### Trascrizione audio

OmniRoute supporta la trascrizione audio tramite l'endpoint compatibile con OpenAI:

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

Provider disponibili: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Formati audio supportati: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Strategie di bilanciamento combinate

Configura il bilanciamento per combo in **Dashboard → Combo → Crea/Modifica → Strategia**.

| Strategia                    | Descrizione                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| **Round-Robin**              | Ruota i modelli in sequenza                                                                 |
| **Priorità**                 | Prova sempre il primo modello; ricorre solo in caso di errore                               |
| **Casuale**                  | Sceglie un modello casuale dalla combo per ogni richiesta                                   |
| **Ponderato**                | Percorsi proporzionali in base ai pesi assegnati per modello                                |
| **Meno utilizzato**          | Indirizza al modello con il minor numero di richieste recenti (utilizza metriche combinate) |
| **Ottimizzazione dei costi** | Itinerari verso il modello disponibile più economico (utilizza la tabella dei prezzi)       |

Le impostazioni predefinite globali della combo possono essere impostate in **Dashboard → Impostazioni → Routing → Impostazioni combo**.

---

### Pannello di controllo della salute

Accesso tramite **Dashboard → Salute**. Panoramica sullo stato del sistema in tempo reale con 6 carte:

| Carta                        | Cosa mostra                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **Stato del sistema**        | Tempo di attività, versione, utilizzo della memoria, directory dei dati            |
| **Salute del fornitore**     | Stato dell'interruttore automatico per provider (chiuso/aperto/semiaperto)         |
| **Limiti di tariffa**        | Raffreddamenti del limite di velocità attivi per account con tempo rimanente       |
| **Blocchi attivi**           | Provider temporaneamente bloccati dalla politica di blocco                         |
| **Cache delle firme**        | Statistiche della cache di deduplicazione (chiavi attive, percentuale di successo) |
| **Telemetria della latenza** | Aggregazione della latenza p50/p95/p99 per provider                                |

**Suggerimento avanzato:** la pagina Salute si aggiorna automaticamente ogni 10 secondi. Utilizza la scheda dell'interruttore per identificare quali fornitori stanno riscontrando problemi.
