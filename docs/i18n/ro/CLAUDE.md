# CLAUDE.md (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Acest fișier oferă îndrumări pentru Claude Code (claude.ai/code) atunci când se lucrează cu cod în acest depozit.

## Începere rapidă

```bash
npm install                    # Instalează dependențele (generează automat .env din .env.example)
npm run dev                    # Server de dezvoltare la http://localhost:20128
npm run build                  # Build de producție (Next.js 16 standalone)
npm run lint                   # ESLint (0 erori așteptate; avertizările sunt preexistente)
npm run typecheck:core         # Verificare TypeScript (ar trebui să fie curat)
npm run typecheck:noimplicit:core  # Verificare strictă (fără implicit any)
npm run test:coverage          # Teste unitare + prag de acoperire (75/75/75/70 — declarații/linii/funcții/ramuri)
npm run check                  # lint + test combinate
npm run check:cycles           # Detectează dependențe circulare
```

### Rularea Testelor

```bash
# Fișier de test unic (rulant de teste nativ Node.js — cele mai multe teste)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Toate suitele
npm run test:all
```

Pentru matricea completă a testelor, consultați `CONTRIBUTING.md` → "Rularea Testelor". Pentru arhitectură detaliată, consultați `AGENTS.md`.

---

## Proiect pe scurt

**OmniRoute** — proxy/router AI unificat. Un endpoint, 160+ furnizori LLM, fallback automat.

| Strat            | Locație                 | Scop                                                                          |
| ---------------- | ----------------------- | ----------------------------------------------------------------------------- |
| Rute API         | `src/app/api/v1/`       | Router aplicație Next.js — puncte de intrare                                  |
| Handleri         | `open-sse/handlers/`    | Procesarea cererilor (chat, embeddings, etc)                                  |
| Executorii       | `open-sse/executors/`   | Dispatch HTTP specific furnizor                                               |
| Traducători      | `open-sse/translator/`  | Conversie de format (OpenAI↔Claude↔Gemini)                                    |
| Transformator    | `open-sse/transformer/` | API de răspunsuri ↔ Completări chat                                           |
| Servicii         | `open-sse/services/`    | Rutare combinată, limite de rată, caching, etc                                |
| Bază de date     | `src/lib/db/`           | Module de domeniu SQLite (45+ fișiere, 55 migrații)                           |
| Domeniu/Politică | `src/domain/`           | Motor de politici, reguli de cost, logică de fallback                         |
| Server MCP       | `open-sse/mcp-server/`  | 37 unelte (30 de bază + 3 memorie + 4 abilități), 3 transporturi, ~13 domenii |
| Server A2A       | `src/lib/a2a/`          | Protocol agent JSON-RPC 2.0                                                   |
| Abilități        | `src/lib/skills/`       | Cadru extensibil pentru abilități                                             |
| Memorie          | `src/lib/memory/`       | Memorie conversațională persistentă                                           |

Monorepo: `src/` (aplicație Next.js 16), `open-sse/` (spațiu de lucru pentru motor de streaming), `electron/` (aplicație desktop), `tests/`, `bin/` (punct de intrare CLI).

---

## Pipeline de Cerere

```
Client → /v1/chat/completions (ruta Next.js)
  → CORS → validare Zod → auth? → verificare politică → protecție împotriva injecției de prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → verificare cache → limită de rată → rutare combo?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → traducerea răspunsului → flux SSE sau JSON
    → Dacă Responses API: responsesTransformer.ts TransformStream
```

Rutele API urmează un model consistent: `Ruta → CORS preflight → validare corp Zod → Auth opțional (extractApiKey/isValidApiKey) → aplicarea politicii cheii API → delegarea handler-ului (open-sse)`. Nu există middleware global Next.js — interceptarea este specifică rutei.

**Rutare combo** (`open-sse/services/combo.ts`): 14 strategii (prioritate, ponderată, umple-primul, rotativ, P2C, aleatorie, cel mai puțin utilizată, optimizată pentru cost, conștientă de resetare, strict-aleatorie, auto, lkgp, optimizată pentru context, relay de context). Fiecare țintă apelează `handleSingleModel()` care învăluie `handleChatCore()` cu gestionarea erorilor per țintă și verificări ale circuit breaker-ului. Consultați `docs/routing/AUTO-COMBO.md` pentru scorul Auto-Combo cu 9 factori și `docs/architecture/RESILIENCE_GUIDE.md` pentru cele 3 straturi de reziliență.

---

## Starea de Execuție a Rezilienței

OmniRoute are trei mecanisme de eșec temporar, legate dar distincte. Mențineți domeniul lor separat atunci când depanați comportamentul rutării. Consultați diagrama [rezilienței cu 3 straturi](./docs/diagrams/exported/resilience-3layers.svg)
(sursa: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
pentru o hartă rapidă.

### Circuit Breaker al Provider-ului

**Domeniu**: întregul provider, de exemplu `glm`, `openai`, `anthropic`.

**Scop**: opriți trimiterea traficului către un provider care eșuează repetat la nivelul upstream/serviciu, astfel încât un provider nesănătos să nu încetinească fiecare cerere.

**Implementare**:

- Clasă de bază: `src/shared/utils/circuitBreaker.ts`
- Conexiune gate/executare chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de stare de execuție: `src/app/api/monitoring/health/route.ts`
- Wrapper-uri partajate: `open-sse/services/accountFallback.ts`
- Tabel de stare persistată: `domain_circuit_breakers`

**Stări**:

- `CLOSED`: traficul normal este permis.
- `OPEN`: provider-ul este temporar blocat; apelanții primesc un răspuns provider-circuit-open
  sau rutarea combo sare la o altă țintă.
- `HALF_OPEN`: timeout-ul de resetare a expirat; permite o cerere de sondaj. Succesul închide
  circuit breaker-ul, eșecul îl deschide din nou.

**Imposturi** (`open-sse/config/constants.ts`):

- Provideri OAuth: prag `3`, timeout de resetare `60s`.
- Provideri cu cheie API: prag `5`, timeout de resetare `30s`.
- Provideri locali: prag `2`, timeout de resetare `15s`.

Numai stările de eșec la nivel de provider ar trebui să declanșeze circuit breaker-ul provider-ului:

```ts
(408, 500, 502, 503, 504);
```

Nu declanșa circuit breaker-ul întregului provider pentru erori normale de cont/cheie/model precum majoritatea
cazurilor `401`, `403`, sau `429`. Acestea aparțin de obicei cooldown-ul conexiunii sau blocarea modelului. O cheie API generică `403` ar trebui să fie recuperabilă, cu excepția cazului în care este clasificată
ca o eroare terminală de provider/cont.

Circuit breaker-ul folosește recuperare leneșă, nu un timer de fundal. Când `OPEN` expiră, citirile precum `getStatus()`, `canExecute()`, și `getRetryAfterMs()` reîmprospătează starea la
`HALF_OPEN`, astfel încât tablourile de bord și constructorii de candidați combo să nu continue să excludă un
provider expirat pentru totdeauna.

### Cooldown de Conexiune

**Domeniu**: o conexiune/provider/cheie.

**Scop**: să sară temporar o cheie/cont proastă, permițând altor conexiuni pentru
același provider să continue să servească cereri.

**Implementare**:

- Calea de scriere/actualizare: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selecția/filtrarea contului: `src/sse/services/auth.ts::getProviderCredentials...`
- Calculul cooldown-ului: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Setări: `src/lib/resilience/settings.ts`

Câmpuri importante pe conexiunile provider-ului:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

În timpul selecției contului, o conexiune este sărită în timp ce:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown-urile sunt de asemenea leneșe: când `rateLimitedUntil` este în trecut, conexiunea devine
eligibilă din nou. La utilizarea cu succes, `clearAccountError()` șterge `testStatus`,
`rateLimitedUntil`, câmpurile de eroare și `backoffLevel`.

Comportamentul implicit al cooldown-ului de conexiune:

- Cooldown de bază OAuth: `5s`.
- Cooldown de bază pentru cheie API: `3s`.
- Cheia API `429` ar trebui să prefere indicii de retry upstream (`Retry-After`, antete de resetare, sau
  text de resetare parsabil) atunci când sunt disponibile.
- Eșecurile recuperabile repetate folosesc backoff exponențial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Gardianul anti-thundering-herd previne eșecurile concurente pe aceeași conexiune de a
extinde repetat cooldown-ul sau de a incrementa dublu `backoffLevel`.

Stările terminale nu sunt cooldown-uri. `banned`, `expired`, și `credits_exhausted` sunt
destinate să rămână indisponibile până când acreditivele/setările se schimbă sau un operator le resetează.
Nu suprascrieți stările terminale cu starea temporară de cooldown.

### Blocarea Modelului

**Domeniu**: provider + conexiune + model.

**Scop**: evitați dezactivarea unei întregi conexiuni atunci când doar un singur model este indisponibil sau
limită de cotă pentru acea conexiune.

Exemple:

- Provideri cu cotă pe model care returnează `429`.
- Provideri locali care returnează `404` pentru un model lipsă.
- Eșecuri de permisiune specifice provider-ului pentru mod/model, cum ar fi modurile Grok selectate.

Blocarea modelului se află în `open-sse/services/accountFallback.ts` și permite aceleași
conexiuni să continue să servească alte modele.

### Ghid de Depanare

- Dacă toate cheile pentru un provider sunt sărite, inspectați atât starea circuit breaker-ului provider, cât și
  `rateLimitedUntil`/`testStatus` ale fiecărei conexiuni.
- Dacă un provider pare permanent exclus după fereastra de resetare, verificați dacă codul
  citește `state` brut în loc să folosească `getStatus()`/`canExecute()`.
- Dacă o cheie de provider eșuează, dar altele ar trebui să funcționeze, preferați cooldown-ul conexiunii în locul
  circuit breaker-ului provider.
- Dacă doar un model eșuează, preferați blocarea modelului în locul cooldown-ului conexiunii.
- Dacă o stare ar trebui să se recupereze singură, ar trebui să aibă un timestamp/reset timeout în viitor și o
  cale de citire care reîmprospătează starea expirat. Stările permanente necesită modificări manuale ale acreditivelor
  sau configurației.

## Convenții Cheie

### Stil de Cod

- **2 spații**, puncte și virgule, ghilimele duble, lățime de 100 caractere, virgule de final es5 (impuse de lint-staged prin Prettier)
- **Importuri**: externe → interne (`@/`, `@omniroute/open-sse`) → relative
- **Nomenclatură**: fișiere=camelCase/kebab, componente=PascalCase, constante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = eroare peste tot; `no-explicit-any` = avertizare în `open-sse/` și `tests/`
- **TypeScript**: `strict: false`, țintă ES2022, modul esnext, rezolvare bundler. Preferă tipuri explicite.

### Bază de Date

- **Întotdeauna** treci prin modulele de domeniu `src/lib/db/` — **niciodată** nu scrie SQL brut în rute sau manipulatoare
- **Niciodată** nu adăuga logică în `src/lib/localDb.ts` (doar strat de re-export)
- **Niciodată** nu importa prin barrel din `localDb.ts` — importă module specifice `db/` în schimb
- Singleton DB: `getDbInstance()` din `src/lib/db/core.ts` (jurnalizare WAL)
- Migrații: `src/lib/db/migrations/` — fișiere SQL versionate, idempotente, rulate în tranzacții

### Gestionarea Erorilor

- try/catch cu tipuri de erori specifice, logare cu context pino
- Niciodată nu înghiți erori în fluxurile SSE — folosește semnale de abort pentru curățare
- Returnează coduri de stare HTTP corecte (4xx/5xx)

### Securitate

- **Niciodată** nu folosi `eval()`, `new Function()`, sau eval implicit
- Validare a tuturor intrărilor cu scheme Zod
- Criptează acreditivii în repaus (AES-256-GCM)
- Lista de denylist pentru antete upstream: `src/shared/constants/upstreamHeaders.ts` — menține sanitizarea, schemele Zod și testele unitare aliniate când editezi
- **Acreditivele publice upstream** (client_id/secret OAuth de tip Gemini/Antigravity/Windsurf + chei Web Firebase extrase din CLI-uri publice): **TREBUIE** să fie încorporate prin `resolvePublicCred()` din `open-sse/utils/publicCreds.ts` — **niciodată** ca litere string. Vezi `docs/security/PUBLIC_CREDS.md` pentru modelul obligatoriu.
- **Răspunsurile de eroare** (HTTP / SSE / executor / MCP handler): **TREBUIE** să treacă prin `buildErrorBody()` sau `sanitizeErrorMessage()` din `open-sse/utils/error.ts` — **niciodată** nu pune `err.stack` sau `err.message` brut în corpul răspunsului. Vezi `docs/security/ERROR_SANITIZATION.md`.
- **Comenzi shell construite din variabile**: când apelezi `exec()`/`spawn()` cu un script care are nevoie de valori de runtime, transmite-le prin opțiunea `env` (escapate automat) — **niciodată** nu interpolare stringuri de căi externe/neîncrezătoare în corpul scriptului. Referință: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteci securizate prin default** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferă Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink în locul implementărilor personalizate ori de câte ori adaugi noi suprafețe sensibile la securitate.

---

## Scenarii Comune de Modificare

### Adăugarea unui Nou Furnizor

1. Înregistrează în `src/shared/constants/providers.ts` (validat Zod la încărcare)
2. Adaugă executor în `open-sse/executors/` dacă este necesară o logică personalizată (extinde `BaseExecutor`)
3. Adaugă translator în `open-sse/translator/` dacă formatul nu este OpenAI
4. Adaugă configurația OAuth în `src/lib/oauth/constants/oauth.ts` dacă este bazată pe OAuth — dacă CLI-ul upstream livrează un client_id/secret public, încorporează prin `resolvePublicCred()` (vezi `docs/security/PUBLIC_CREDS.md`), **niciodată** ca literal
5. Înregistrează modelele în `open-sse/config/providerRegistry.ts`
6. Scrie teste în `tests/unit/` (includerea aserțiunii de formă publicCreds dacă ai adăugat un nou default încorporat)

### Adăugarea unei Noi Rute API

1. Creează un director sub `src/app/api/v1/your-route/`
2. Creează `route.ts` cu manipulatoare `GET`/`POST`
3. Urmează modelul: CORS → validare a corpului Zod → autentificare opțională → delegare a manipulatoarelor
4. Manipulatorul merge în `open-sse/handlers/` (importă de acolo, nu inline)
5. Răspunsurile de eroare folosesc `buildErrorBody()` / `errorResponse()` din `open-sse/utils/error.ts` (auto-sanitizate — niciodată nu pune `err.stack` sau `err.message` brut în corp). Vezi `docs/security/ERROR_SANITIZATION.md`.
6. Adaugă teste — inclusiv cel puțin o aserțiune că răspunsurile de eroare nu scurg trasări de stivă (`!body.error.message.includes("at /")`)

### Adăugarea unui Nou Modul DB

1. Creează `src/lib/db/yourModule.ts` — importă `getDbInstance` din `./core.ts`
2. Exportă funcții CRUD pentru tabelul(tabelele) tale de domeniu
3. Adaugă migrație în `src/lib/db/migrations/` dacă sunt necesare tabele noi
4. Re-exportă din `src/lib/localDb.ts` (adaugă doar la lista de re-export)
5. Scrie teste

### Adăugarea unui Nou Instrument MCP

1. Adaugă definiția instrumentului în `open-sse/mcp-server/tools/` cu schema de intrare Zod + manipulatoare asincrone
2. Înregistrează în setul de instrumente (conectat prin `createMcpServer()`)
3. Atribuie la domeniile corespunzătoare
4. Scrie teste (invocarea instrumentului este înregistrată în tabela `mcp_audit`)

### Adăugarea unei Noi Abilități A2A

1. Creează abilitate în `src/lib/a2a/skills/` (5 există deja: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Abilitatea primește contextul sarcinii (mesaje, metadate) → returnează un rezultat structurat
3. Înregistrează în `A2A_SKILL_HANDLERS` în `src/lib/a2a/taskExecution.ts`
4. Expune în `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Scrie teste în `tests/unit/`
6. Documentează în `docs/frameworks/A2A-SERVER.md` tabela abilităților

### Adăugarea unui Nou Agent Cloud

1. Creează clasa agentului în `src/lib/cloudAgent/agents/` extinzând `CloudAgentBase` (3 există deja: codex-cloud, devin, jules)
2. Implementează `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Înregistrează în `src/lib/cloudAgent/registry.ts`
4. Adaugă gestionarea OAuth/acreditivelor dacă este necesar (`src/lib/oauth/providers/`)
5. Teste + documentează în `docs/frameworks/CLOUD_AGENT.md`

### Adăugarea unei Noi Reguli de Securitate / Eval / Abilitate / Eveniment Webhook

- Regulă de securitate: `src/lib/guardrails/` → documente: `docs/security/GUARDRAILS.md`
- Suita Eval: `src/lib/evals/` → documente: `docs/frameworks/EVALS.md`
- Abilitate (sandbox): `src/lib/skills/` → documente: `docs/frameworks/SKILLS.md`
- Eveniment Webhook: `src/lib/webhookDispatcher.ts` → documente: `docs/frameworks/WEBHOOKS.md`

## Documentație de Referință

Pentru orice modificare non-trivială, citiți mai întâi analiza corespunzătoare:

| Domeniu                                         | Document                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| Navigare în repo                                | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arhitectură                                     | `docs/architecture/ARCHITECTURE.md`                               |
| Referință inginerie                             | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (scor 9-factori, 14 strategii)       | `docs/routing/AUTO-COMBO.md`                                      |
| Reziliență (3 mecanisme)                        | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Repetare raționare                              | `docs/routing/REASONING_REPLAY.md`                                |
| Cadru de abilități                              | `docs/frameworks/SKILLS.md`                                       |
| Sistem de memorie (FTS5 + Qdrant)               | `docs/frameworks/MEMORY.md`                                       |
| Agenți cloud                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Ghiduri de protecție (PII / injecție / viziune) | `docs/security/GUARDRAILS.md`                                     |
| Credite publice upstream (Gemini/etc.)          | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitizarea mesajelor de eroare                 | `docs/security/ERROR_SANITIZATION.md`                             |
| Evaluări                                        | `docs/frameworks/EVALS.md`                                        |
| Conformitate / audit                            | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                        | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline de autorizare                          | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / amprentă)                        | `docs/security/STEALTH_GUIDE.md`                                  |
| Protocoale agenți (A2A / ACP / Cloud)           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Server MCP                                      | `docs/frameworks/MCP-SERVER.md`                                   |
| Server A2A                                      | `docs/frameworks/A2A-SERVER.md`                                   |
| Referință API + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catalog furnizori (generat automat)             | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Flux de lansare                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testare

| Ce                      | Comandă                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| Teste unitare           | `npm run test:unit`                                                     |
| Fișier unic             | `node --import tsx/esm --test tests/unit/file.test.ts`                  |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                   |
| E2E (Playwright)        | `npm run test:e2e`                                                      |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                            |
| Ecosistem               | `npm run test:ecosystem`                                                |
| Poarta de acoperire     | `npm run test:coverage` (75/75/75/70 — declarații/linie/funcții/ramuri) |
| Raport de acoperire     | `npm run coverage:report`                                               |

**Regula PR**: Dacă schimbi codul de producție în `src/`, `open-sse/`, `electron/`, sau `bin/`, trebuie să incluzi sau să actualizezi teste în același PR.

**Preferința pentru stratul de testare**: unitate mai întâi → integrare (multi-modul sau stare DB) → e2e (doar UI/workflow). Codifică reproducerea bug-urilor ca teste automate înainte sau împreună cu soluția.

**Politica de acoperire Copilot**: Când un PR schimbă codul de producție și acoperirea este sub 75% (declarații/linie/funcții) sau 70% (ramuri), nu raporta doar — adaugă sau actualizează teste, rulează din nou poarta de acoperire, apoi cere confirmare. Include comenzile rulate, fișierele de test schimbate și rezultatul final al acoperirii în raportul PR.

---

## Fluxul de lucru Git

```bash
# Nu face niciodată commit direct pe main
git checkout -b feat/your-feature
git commit -m "feat: descrie schimbarea ta"
git push -u origin feat/your-feature
```

**Prefixe pentru ramuri**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formatul commit-ului** (Conventional Commits): `feat(db): adaugă circuit breaker` — domenii: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Hooks Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Mediu

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Module ES
- **TypeScript**: 5.9+, target ES2022, modul esnext, rezolvare bundler
- **Aliasuri de cale**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Port implicit**: 20128 (API + dashboard pe același port)
- **Director de date**: `DATA_DIR` variabilă de mediu, implicit `~/.omniroute/`
- **Variabile de mediu cheie**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configurare: `cp .env.example .env` apoi generează `JWT_SECRET` (`openssl rand -base64 48`) și `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Reguli stricte

1. Nu face niciodată commit pentru secrete sau acreditive
2. Nu adăuga niciodată logică în `localDb.ts`
3. Nu folosi niciodată `eval()` / `new Function()` / eval implicit
4. Nu face niciodată commit direct pe `main`
5. Nu scrie niciodată SQL brut în rute — folosește modulele din `src/lib/db/`
6. Nu ascunde niciodată în tăcere erorile în fluxurile SSE
7. Întotdeauna validează intrările cu scheme Zod
8. Întotdeauna include teste atunci când schimbi codul de producție
9. Acoperirea trebuie să rămână ≥75% (declarații, linii, funcții) / ≥70% (ramuri). Măsurată în prezent: ~82%.
10. Nu ocoli niciodată hooks-urile Husky (`--no-verify`, `--no-gpg-sign`) fără aprobarea explicită a operatorului.
11. Nu încorpora niciodată client_id/secret public OAuth sau chei Web Firebase ca litere string — treci întotdeauna prin `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Vezi `docs/security/PUBLIC_CREDS.md`.
12. Nu returna niciodată `err.stack` / `err.message` brut în răspunsurile HTTP / SSE / executor — întotdeauna rotește prin `buildErrorBody()` sau `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Vezi `docs/security/ERROR_SANITIZATION.md`.
13. Nu interpolare niciodată string-uri externe sau valori de runtime în scripturi shell transmise la `exec()`/`spawn()` — treci prin opțiunea `env` în schimb. Referință: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nu ignora niciodată un alert CodeQL / Secret-Scanning fără (a) să verifici mai întâi documentele de model de mai sus pentru a vedea dacă ajutorul se aplică, și (b) să înregistrezi justificarea tehnică în comentariul de respingere. Precedent: `js/stack-trace-exposure` ridicat pe callsites care deja rotează prin `sanitizeErrorMessage()` este o limitare cunoscută CodeQL (sanitizatori personalizați nerecunoscuți) — respinge ca `false positive` referindu-te la `docs/security/ERROR_SANITIZATION.md`.
15. Nu expune niciodată rute care generează procese copil (`/api/mcp/`, `/api/cli-tools/runtime/`) fără clasificarea `isLocalOnlyPath()` în `src/server/authz/routeGuard.ts`. Aplicarea loopback-ului se întâmplă necondiționat înainte de orice verificare de autentificare — un JWT scurs prin tunel nu poate declanșa generarea procesului. Vezi `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nu include niciodată trailer-uri `Co-Authored-By` în mesajele de commit. Commits trebuie să apară exclusiv sub identitatea Git a proprietarului repository-ului (`diegosouzapw`). Linia `Co-Authored-By: Claude …` face ca GitHub să atribuie commits contului `claude` Anthropic, ascunzând adevăratul autor în istoricul PR.
