# Ghidul utilizatorului

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Ghid complet pentru configurarea furnizorilor, crearea combo-urilor, integrarea instrumentelor CLI și implementarea OmniRoute.

---

## Cuprins

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Prețurile dintr-o privire

| Nivelul          | Furnizor          | Cost               | Resetare cotă               | Cel mai bun pentru        |
| ---------------- | ----------------- | ------------------ | --------------------------- | ------------------------- |
| **💳 ABONARE**   | Claude Code (Pro) | 20 USD/lună        | 5h + săptămânal             | Deja abonat               |
|                  | Codex (Plus/Pro)  | 20-200 USD/lună    | 5h + săptămânal             | Utilizatori OpenAI        |
|                  | Gemeni CLI        | **GRATIS**         | 180K/lună + 1K/zi           | Toată lumea!              |
|                  | GitHub Copilot    | 10-19 USD/lună     | Lunar                       | utilizatorii GitHub       |
| **🔑 CHEIA API** | DeepSeek          | Plată pe utilizare | Niciuna                     | Raționament ieftin        |
|                  | Groq              | Plată pe utilizare | Niciuna                     | Inferență ultra-rapidă    |
|                  | xAI (Grok)        | Plată pe utilizare | Niciuna                     | Grok 4 raționament        |
|                  | Mistral           | Plată pe utilizare | Niciuna                     | Modele găzduite de UE     |
|                  | Nedumerire        | Plată pe utilizare | Niciuna                     | Căutare sporită           |
|                  | Împreună AI       | Plată pe utilizare | Niciuna                     | Modele open-source        |
|                  | Artificii AI      | Plată pe utilizare | Niciuna                     | Imagini Fast FLUX         |
|                  | Cerebre           | Plată pe utilizare | Niciuna                     | Viteza la scara plachetei |
|                  | Cohere            | Plată pe utilizare | Niciuna                     | Comanda R+ RAG            |
|                  | NVIDIA NIM        | Plată pe utilizare | Niciuna                     | Modele de întreprindere   |
| **💰 IEFTIN**    | GLM-4.7           | 0,6 USD/1 milion   | Zilnic 10:00                | Backup buget              |
|                  | MiniMax M2.1      | 0,2 USD/1 milion   | rulare de 5 ore             | Cea mai ieftină opțiune   |
|                  | Kimi K2           | 9 USD/lună plat    | 10 milioane de jetoane/lună | Cost previzibil           |
| **🆓 GRATUIT**   | iFlow             | $0                 | Nelimitat                   | 8 modele gratuite         |
|                  | Qwen              | $0                 | Nelimitat                   | 3 modele gratuite         |
|                  | Kiro              | $0                 | Nelimitat                   | Claude liber              |

**💡 Sfat profesionist:** Începeți cu Gemini CLI (180K gratuit/lună) + iFlow (gratuit nelimitat) combo = cost 0 USD!

---

## 🎯 Cazuri de utilizare

### Cazul 1: „Am abonament Claude Pro”

**Problemă:** Cota expiră neutilizată, limitele ratei în timpul codării grele

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Cazul 2: „Vreau cost zero”

**Problemă:** Nu-mi permit abonamente, au nevoie de codare AI de încredere

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Cazul 3: „Am nevoie de codare 24/7, fără întreruperi”

**Problemă:** Termenele limită, nu-mi permit timpi de nefuncționare

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

### Cazul 4: „Vreau AI GRATUIT în OpenClaw”

**Problemă:** Aveți nevoie de asistent AI în aplicațiile de mesagerie, complet gratuit

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Configurarea furnizorului

### 🔐 Furnizori de abonament

#### Cod Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Sfat profesionist:** Folosiți Opus pentru sarcini complexe, Sonnet pentru viteză. OmniRoute urmărește cota per model!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRATIS 180K/lună!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Cea mai bună valoare:** Nivel gratuit imens! Utilizați acest lucru înainte de nivelurile plătite.

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

### 💰 Furnizori ieftini

#### GLM-4.7 (Resetare zilnică, 0,6 USD/1 milion)

1. Înscrieți-vă: [Zhipu AI](https://open.bigmodel.cn/)
2. Obțineți cheia API din Coding Plan
3. Tabloul de bord → Adăugați cheie API: Furnizor: `glm`, Cheie API: `your-key`

**Utilizați:** `glm/glm-4.7` — **Sfat profesionist:** Planul de codare oferă cotă de 3 ori la 1/7 cost! Resetați zilnic la 10:00.

#### MiniMax M2.1 (resetare în 5 ore, 0,20 USD/1 milion)

1. Înscrieți-vă: [MiniMax](https://www.minimax.io/)
2. Obțineți cheia API → Tabloul de bord → Adăugați cheia API

**Utilizați:** `minimax/MiniMax-M2.1` — **Sfat profesionist:** Cea mai ieftină opțiune pentru context lung (1 milion de jetoane)!

#### Kimi K2 (9 USD/lună fix)

1. Abonați-vă: [Moonshot AI](https://platform.moonshot.ai/)
2. Obțineți cheia API → Tabloul de bord → Adăugați cheia API

**Utilizați:** `kimi/kimi-latest` — **Sfat pro:** Fix 9 USD/lună pentru 10 milioane de jetoane = 0,90 USD/1 milion cost efectiv!

### 🆓 Furnizori GRATUITI

#### iFlow (8 modele GRATUITE)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 modele GRATUITE)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATUIT)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combo

### Exemplul 1: Maximizați abonamentul → Backup ieftin

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Exemplul 2: Numai gratuit (cost zero)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Integrare CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Cod

Editați `~/.claude/config.json`:

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

Editați `~/.openclaw/openclaw.json`:

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

**Sau utilizați Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Continuare / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Desfășurare

### Implementare VPS

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

Pentru modul integrat în gazdă cu binare CLI, consultați secțiunea Docker din documentele principale.

### Variabile de mediu

| Variabila             | Implicit                             | Descriere                                                                        |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Secret de semnare JWT (**schimbarea producției**)                                |
| `INITIAL_PASSWORD`    | `123456`                             | Prima parolă de conectare                                                        |
| `DATA_DIR`            | `~/.omniroute`                       | Director de date (db, utilizare, jurnale)                                        |
| `PORT`                | cadru implicit                       | Port de serviciu (`20128` în exemple)                                            |
| `HOSTNAME`            | cadru implicit                       | Leagă gazdă (Docker este implicit la `0.0.0.0`)                                  |
| `NODE_ENV`            | implicit de rulare                   | Setați `production` pentru implementare                                          |
| `BASE_URL`            | `http://localhost:20128`             | Adresa URL de bază internă pe partea serverului                                  |
| `CLOUD_URL`           | `https://omniroute.dev`              | Adresa URL de bază a punctului final de sincronizare în cloud                    |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Secret HMAC pentru cheile API generate                                           |
| `REQUIRE_API_KEY`     | `false`                              | Aplicați cheia API Bearer pe `/v1/*`                                             |
| `ENABLE_REQUEST_LOGS` | `false`                              | Activează jurnalele cereri/răspuns                                               |
| `AUTH_COOKIE_SECURE`  | `false`                              | Forțați cookie-ul de autentificare `Secure` (în spatele proxy-ului invers HTTPS) |

Pentru referința completă a variabilei de mediu, consultați [README](../README.md).

---

## 📊 Modele disponibile

<details>
<summary><b>Vedeți toate modelele disponibile</b></summary>

**Cod Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**CLI Gemini (`gc/`)** — GRATUIT: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 USD/1 milion: `glm/glm-4.7`

**MiniMax (`minimax/`)** — 0,2 USD/1 milion: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATUIT: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATUIT: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATUIT: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexitate (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Focuri de artificii AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebre (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Funcții avansate

### Modele personalizate

Adăugați orice ID de model oricărui furnizor fără a aștepta o actualizare a aplicației:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Sau utilizați Tabloul de bord: **Furnizori → [Furnizor] → Modele personalizate**.

### Rute de furnizori dedicate

Dirijați cererile direct către un anumit furnizor cu validarea modelului:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Prefixul furnizorului este adăugat automat dacă lipsește. Modelele nepotrivite revin `400`.

### Configurare proxy de rețea

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

**Precedență:** Specific cheie → Specific combo → Specific furnizor → Global → Mediu.

### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnează modele grupate după furnizor cu tipuri (`chat`, `embedding`, `image`).

### Cloud Sync

- Sincronizați furnizorii, combo-urile și setările pe dispozitive
- Sincronizare automată în fundal cu timeout + fail-rapid
- Prefer partea serverului `BASE_URL`/`CLOUD_URL` în producție

### LLM Gateway Intelligence (Faza 9)

- **Cache semantic** — Memorează automat în cache non-streaming, temperatură=0 răspunsuri (ocolire cu `X-OmniRoute-No-Cache: true`)
- **Solicitare Idempotency** — Deduplică cererile în 5s prin antetul \_\_OMNI_TOKEN_1 sau `X-Request-Id`
- **Urmărirea progresului** — Opt-in SSE `event: progress` evenimente prin antetul `X-OmniRoute-Progress: true`

---

### Translator Playground

Acces prin **Tabloul de bord → Translator**. Depanați și vizualizați modul în care OmniRoute traduce cererile API între furnizori.

| Modul               | Scop                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Teren de joacă**  | Selectați formatele sursă/țintă, inserați o solicitare și vedeți instantaneu rezultatul tradus        |
| **Tester de chat**  | Trimiteți mesaje de chat live prin proxy și inspectați întregul ciclu de solicitare/răspuns           |
| **Banc de testare** | Rulați teste în loturi în mai multe combinații de formate pentru a verifica corectitudinea traducerii |
| **Monitor live**    | Urmăriți traducerile în timp real pe măsură ce solicitările curg prin proxy                           |

**Cazuri de utilizare:**

- Depanați de ce o anumită combinație client/furnizor eșuează
- Verificați dacă etichetele de gândire, apelurile de instrumente și instrucțiunile de sistem se traduc corect
- Comparați diferențele de format dintre formatele OpenAI, Claude, Gemini și Responses API

---

### Strategii de rutare

Configurați prin **Tablou de bord → Setări → Rutare**.

| Strategie                        | Descriere                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Umpleți mai întâi**            | Utilizează conturile în ordine de prioritate — contul principal gestionează toate solicitările până când nu sunt disponibile |
| **Round Robin**                  | Parcurge toate conturile cu o limită stabilă configurabilă (implicit: 3 apeluri per cont)                                    |
| **P2C (Puterea a două opțiuni)** | Alege 2 conturi aleatorii și rute către cel mai sănătos — echilibrează sarcina cu conștientizarea sănătății                  |
| **La întâmplare**                | Selectează aleatoriu un cont pentru fiecare solicitare folosind Fisher-Yates shuffle                                         |
| **Cel mai puțin folosit**        | Rute către contul cu cea mai veche amprentă temporală `lastUsedAt`, distribuind traficul uniform                             |
| **Cost optimizat**               | Rute către contul cu cea mai mică valoare de prioritate, optimizare pentru furnizorii cu cel mai mic cost                    |

#### Aliasuri de model cu caractere wildcard

Creați modele de metacară pentru a remapa numele modelelor:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Wildcard-urile acceptă `*` (orice caractere) și `?` (un singur caracter).

#### Lanțuri de rezervă

Definiți lanțuri globale de rezervă care se aplică tuturor solicitărilor:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Reziliență și întrerupătoare de circuit

Configurați prin **Tabloul de bord → Setări → Reziliență**.

OmniRoute implementează rezistența la nivel de furnizor cu patru componente:

1. **Profiluri de furnizor** — Configurație per furnizor pentru:
   - Pragul de eșec (cate defecțiuni înainte de deschidere)
   - Durata de răcire
   - Sensibilitatea de detectare a limitei ratei
   - Parametrii de backoff exponenţial

2. **Limite de rată editabile** — Setări implicite la nivel de sistem configurabile în tabloul de bord:
   - **Solicitări pe minut (RPM)** — Numărul maxim de solicitări pe minut per cont
   - **Timp minim între solicitări** — Intervalul minim în milisecunde între solicitări
   - **Max. de solicitări simultane** — Maxim de solicitări simultane per cont
   - Faceți clic pe **Editați** pentru a modifica, apoi pe **Salvați** sau **Anulați**. Valorile persistă prin intermediul API-ului de rezistență.

3. **Circuit Breaker** — Urmărește defecțiunile pentru fiecare furnizor și deschide automat circuitul când este atins un prag:
   - **ÎNCHIS** (sănătos) — Solicitările curg normal
   - **DESCHIS** — Furnizorul este blocat temporar după eșecuri repetate
   - **HALF_OPEN** — Se testează dacă furnizorul și-a revenit

4. **Politici și identificatori blocați** — Afișează starea întrerupătorului și identificatorii blocați cu capacitatea de deblocare forțată.

5. **Detecție automată a limitei ratei** — Monitorizează anteturile `429` și `Retry-After` pentru a evita în mod proactiv atingerea limitelor ratei furnizorului.

**Sfat profesionist:** Folosiți butonul **Reset All** pentru a șterge toate întreruptoarele de circuit și perioadele de răcire atunci când un furnizor își revine după o întrerupere.

---

### Export/Import baze de date

Gestionați copiile de rezervă ale bazei de date în **Tabloul de bord → Setări → Sistem și stocare**.

| Acțiune                       | Descriere                                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Exportați baza de date**    | Descarcă baza de date SQLite curentă ca fișier `.sqlite`                                                                                         |
| **Exportați toate (.tar.gz)** | Descărcă o arhivă de rezervă completă, inclusiv: bază de date, setări, combinații, conexiuni la furnizor (fără acreditări), metadatele cheii API |
| **Importă baza de date**      | Încărcați un fișier `.sqlite` pentru a înlocui baza de date curentă. O copie de rezervă pre-import este creată automat                           |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Validare import:** Fișierul importat este validat pentru integritate (verificare pragma SQLite), tabelele necesare (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) și dimensiune (max. 100 MB).

**Cazuri de utilizare:**

- Migrați OmniRoute între mașini
- Creați copii de rezervă externe pentru recuperarea în caz de dezastru
- Partajați configurațiile între membrii echipei (exportați toate → partajați arhiva)

---

### Tabloul de bord pentru setări

Pagina de setări este organizată în 5 file pentru o navigare ușoară:

| Tab            | Cuprins                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Securitate** | Setări de conectare/parolă, control acces IP, autentificare API pentru `/models` și blocare furnizor                    |
| **Dirutare**   | Strategie globală de rutare (6 opțiuni), aliasuri de model cu wildcard, lanțuri de rezervă, valori implicite combo      |
| **Reziliență** | Profilurile furnizorilor, limitele de rată modificabile, starea întrerupătorului, politicile și identificatorii blocați |
| **AI**         | Gândire la configurația bugetului, injectarea promptă a sistemului global, statisticile cache prompte                   |
| **Avansat**    | Configurație globală proxy (HTTP/SOCKS5)                                                                                |

---

### Costuri și management bugetar

Acces prin **Tabloul de bord → Costuri**.

| Tab         | Scop                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| **Buget**   | Setați limite de cheltuieli pentru fiecare cheie API cu bugete zilnice/săptămânale/lunare și urmărire în timp real |
| **Prețuri** | Vizualizați și editați intrările de prețuri ale modelului — cost pe 1K jetonuri de intrare/ieșire per furnizor     |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Urmărirea costurilor:** Fiecare solicitare înregistrează utilizarea simbolurilor și calculează costul utilizând tabelul de prețuri. Vedeți defalcări în **Tabloul de bord → Utilizare** în funcție de furnizor, model și cheie API.

---

### Transcriere audio

OmniRoute acceptă transcrierea audio prin punctul final compatibil cu OpenAI:

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

Furnizori disponibili: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Formate audio acceptate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, **OMNI_TOKEN**14.

---

### Strategii de echilibrare combinate

Configurați echilibrarea per-combo în **Tabloul de bord → Combo → Creare/Editare → Strategie**.

| Strategie                                       | Descriere                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Round-Robin**                                 | Se rotește succesiv prin modele                                                       |
| **Prioritate**                                  | Încearcă întotdeauna primul model; cade înapoi numai pe eroare                        |
| **La întâmplare**                               | Alege un model aleatoriu din combo pentru fiecare cerere                              |
| **Ponderat**                                    | Rute proporționale pe baza greutăților atribuite per model                            |
| **Cel mai puțin folosit**                       | Rute către modelul cu cele mai puține solicitări recente (folosește valori combinate) |
| **Optimizat din punct de vedere al costurilor** | Rute către cel mai ieftin model disponibil (folosește tabelul de prețuri)             |

Valorile implicite globale ale combo pot fi setate în **Tabloul de bord → Setări → Rutare → Setări implicite combo**.

---

### Tabloul de bord pentru sănătate

Acces prin **Tabloul de bord → Sănătate**. Prezentare generală a stării sistemului în timp real cu 6 carduri:

| Card                       | Ce arată                                                                        |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Stare sistem**           | Uptime, versiune, utilizare a memoriei, director de date                        |
| **Sănătatea furnizorului** | Stare întrerupător pentru fiecare furnizor (Închis/Deschis/Pe jumătate deschis) |
| **Limite de rate**         | Reduceri de reducere a limitei ratei active per cont cu timpul rămas            |
| **Blocari active**         | Furnizori blocați temporar de politica de blocare                               |
| **Cache pentru semnături** | Statistici cache de deduplicare (chei active, rata de accesare)                 |
| **Telemetrie de latență**  | agregarea latenței p50/p95/p99 per furnizor                                     |

**Sfat profesional:** Pagina Sănătate se reîmprospătează automat la fiecare 10 secunde. Utilizați cardul de întrerupător pentru a identifica furnizorii care se confruntă cu probleme.
