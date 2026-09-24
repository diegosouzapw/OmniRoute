# OmniRoute agent guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../AGENTS.md)

---

> **Jedinstveni izvor istine.** Ovaj fajl sadrži SVA pravila projekta, konvencije, bilješke o arhitekturi
> i Stroga Pravila za svakog AI asistenta koji radi u ovom repozitoriju (Claude Code, Gemini, Codex,
> Copilot i bilo koji drugi agent). `CLAUDE.md` i `GEMINI.md` samo dodaju specifične razlike za asistenta
> i upućuju natrag ovdje. Kada pravilo treba promijeniti, promijenite ga OVDJE — nikada ga nemojte ponovo forkovati u
> fajl specifičan za asistenta.

## Brzi start

```bash
npm install                    # Instaliraj zavisnosti (automatski generiše .env iz .env.example)
npm run dev                    # Dev server na http://localhost:20128
npm run build                  # Production build (Next.js 16 standalone)
npm run build:release          # Release build
npm run lint                   # ESLint (očekivano 0 grešaka; upozorenja su već postojeća)
npm run typecheck:core         # TypeScript provjera (treba biti čista)
npm run typecheck:noimplicit:core  # Stroga provjera (bez implicitnog any)
npm run test:coverage          # Unit testovi + coverage gate (60/60/60/60 — statements/lines/functions/branches)
npm run check                  # lint + test kombinovano
npm run check:cycles           # Detekcija kružnih zavisnosti
npm run check:docs-all         # Pokreni nakon izmjene dokumentacije (uključuje fabricated-docs validaciju)
```

### Pokretanje testova

Prvo pokrenite najprecizniji test za izmijenjeni kod:

```bash
# Pojedinačni test fajl (Node.js native test runner — većina testova)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Svi suite-ovi
npm run test:all
```

Ostali suite-ovi: `npm run test:e2e`, `npm run test:protocols:e2e`, `npm run test:ecosystem`.

Za punu matricu testova, pogledajte `CONTRIBUTING.md` → "Running Tests". Za duboku arhitekturu, pogledajte sekcije
Repository map i Reference Documentation u nastavku.

---

## Projekt na prvi pogled

**OmniRoute** — jedinstveni AI proxy/router. Jedna krajnja tačka (endpoint), 359 LLM provajdera, auto-fallback.

| Sloj          | Lokacija                | Svrha                                                                                                                                                                     |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — ulazne tačke                                                                                                                                         |
| Handlers      | `open-sse/handlers/`    | Obrada zahtjeva (chat, embeddings, itd)                                                                                                                                   |
| Executors     | `open-sse/executors/`   | Provider-specifični HTTP dispatch                                                                                                                                         |
| Translators   | `open-sse/translator/`  | Konverzija formata (OpenAI↔Claude↔Gemini)                                                                                                                                 |
| Transformer   | `open-sse/transformer/` | Responses API ↔ Chat Completions                                                                                                                                          |
| Services      | `open-sse/services/`    | Combo rutiranje, rate limiti, keširanje, itd                                                                                                                              |
| Database      | `src/lib/db/`           | SQLite domenski moduli (176 migracija)                                                                                                                                    |
| Domain/Policy | `src/domain/`           | Policy engine, pravila troškova, fallback logika                                                                                                                          |
| MCP Server    | `open-sse/mcp-server/`  | 110 alata (45 kanonskih + memory/skill/GitHub/pool/gamification/plugin/Notion/Obsidian/local-corpus/RTK moduli), 3 transporta (stdio / SSE / Streamable HTTP), 33 scope-a |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protokol                                                                                                                                               |
| Skills        | `src/lib/skills/`       | Proširivi framework vještina                                                                                                                                              |
| Memory        | `src/lib/memory/`       | Persistent konverzacijska memorija                                                                                                                                        |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine workspace), `electron/` (desktop app), `tests/`, `bin/` (CLI ulazna tačka).

---

## Pipeline zahtjeva

```
Klijent → /v1/chat/completions (Next.js ruta)
  → CORS → Zod validacija → auth? → provjera polise → zaštita od prompt injection-a
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → provjera cache-a → rate limit → combo rutiranje?
      → resolveComboTargets() → handleSingleModel() po cilju
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry sa backoff-om
    → translacija odgovora → SSE stream ili JSON
    → Ako je Responses API: responsesTransformer.ts TransformStream
```

API rute prate konzistentan obrazac: `Ruta → CORS preflight → Zod validacija tijela → Opcionalni auth (extractApiKey/isValidApiKey) → Primjena polise API ključa → Delegacija handleru (open-sse)`. Nema globalnog Next.js middleware-a — presretanje je specifično za rutu.

**Combo rutiranje** (`open-sse/services/combo.ts`): 19 javnih strategija (priority, weighted, fill-first, round-robin, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, context-relay, fusion, pipeline). Svaki cilj poziva `handleSingleModel()` koji obavija `handleChatCore()` sa specifičnim rukovanjem greškama po cilju i provjerama circuit breaker-a. Strategija `fusion` je izuzetak: ona šalje zahtjeve panelu modela paralelno, nakon čega model sudije sintetizuje jedan finalni odgovor (`open-sse/services/fusion.ts`). Pogledajte `docs/routing/AUTO-COMBO.md` za 16-faktorno Auto-Combo bodovanje + punu tabelu strategija i `docs/architecture/RESILIENCE_GUIDE.md` za 3 sloja otpornosti.

---

## Runtime stanje otpornosti (Resilience)

OmniRoute ima tri povezana, ali različita mehanizma za privremene zakaznice. Držite njihov opseg odvojenim prilikom otklanjanja grešaka u rutiranju. Pogledajte
[dijagram otpornosti u 3 sloja](./docs/diagrams/exported/resilience-3layers.svg)
(izvor: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
za brz pregled.

### Provider Circuit Breaker

**Opseg**: cijeli provider, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje saobraćaja provideru koji kontinuirano zakazuje na upstream/servisnom nivou, kako jedan neispravan provider ne bi usporio svaki zahtjev.

**Implementacija**:

- Glavna klasa: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Zajednički wrapperi: `open-sse/services/accountFallback.ts`
- Tablica perzistiranog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalan saobraćaj je dozvoljen.
- `DEGRADED`: zona ranog upozorenja — zakaznice su prešle prag degradacije, ali još uvijek ne i prag breaker-a; saobraćaj i dalje teče, dashboardi prikazuju upozorenje.
- `OPEN`: provider je privremeno blokiran; pozivaoci dobijaju odgovor "provider-circuit-open" ili combo rutiranje preskače na drugi cilj.
- `HALF_OPEN`: timeout za resetovanje je istekao; dozvoljen je probni zahtjev. Uspjeh zatvara breaker, zakaznica ga ponovo otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, konzumirano putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Breaker za cijelog providera radi na osnovu `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil  | degradira na | otvara na (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| ------- | -----------: | ------------------------------------: | ----------------------------: |
| OAuth   |          `5` |                                   `8` |                         `60s` |
| API key |          `7` |                                  `12` |                         `30s` |
| Local   |   (izvedeno) |                                   `2` |                         `15s` |

`PROVIDER_PROFILES` takođe definiše `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): ovi parametri pokreću
**window gate opcionalnog globalnog Provider Cooldown-a** (`PROVIDER_COOLDOWN_ENABLED`, zadano isključeno) — unos na nivou providera u `open-sse/services/providerCooldownTracker.ts` računa se kao hlađenje tek nakon `providerFailureThreshold` zakaznica unutar `providerFailureWindowMs`, i tada se hladi tokom `providerCooldownMs`. To NISU pragovi aktivnog breaker-a — nemojte ih podešavati očekujući ponašanje breaker-a. Svaka zadana vrijednost može se nadjačati putem
`OMNIROUTE_PROVIDER_BREAKER_*` i `OMNIROUTE_CIRCUIT_BREAKER_*` env varijabli;
precizna referentna tablica za runtime nalazi se u `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi zakaznica na nivou providera trebaju aktivirati provider breaker:

```ts
(408, 500, 502, 503, 504);
```

Ne aktivirajte breaker za cijelog providera zbog normalnih grešaka računa/ključa/modela kao što su većina
`401`, `403`, ili `429` slučajeva. Oni obično pripadaju connection cooldown-u ili blokadi modela. Generička `403` greška API-key providera treba biti oporavljiva osim ako nije klasifikovana kao terminalna greška providera/računa.

Breaker koristi lazy recovery, a ne pozadinski tajmer. Kada `OPEN` istekne, čitanja kao što su `getStatus()`, `canExecute()`, i `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`, tako da dashboardi i combo candidate builderi ne isključuju istekao provider zauvijek.

### Connection Cooldown

**Opseg**: jedna konekcija/račun/ključ providera.

**Svrha**: privremeno preskočiti jedan loš ključ/račun dok se dozvoljavaju ostale konekcije za istog providera da nastave opsluživati zahtjeve.

**Implementacija**:

- Put za pisanje/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selekcija/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Kalkulacija cooldown-a: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na konekcijama providera:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tokom odabira računa, veza se preskače dok je:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown periodi su također "lazy": kada `rateLimitedUntil` ostane u prošlosti, veza ponovo postaje
prikladna. Nakon uspješnog korištenja, `clearAccountError()` briše `testStatus`,
`rateLimitedUntil`, polja za greške i `backoffLevel`.

Podrazumijevano ponašanje cooldown-a veze:

- OAuth osnovni cooldown: `5s`.
- API-key osnovni cooldown: `3s`.
- API-key `429` treba preferirati upstream retry hintove (`Retry-After`, reset zaglavlja ili
  parsirajući reset tekst) kada su dostupni.
- Ponovljeni oporavljivi neuspjesi koriste eksponencijalni backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita protiv "thundering-herd" efekta sprječava da konkurentni neuspjesi na istoj vezi
ponovljeno produžuju cooldown ili dvostruko uvećavaju `backoffLevel`.

Terminalna stanja nisu cooldown-i. `banned`, `expired` (koji postaje terminalan tek nakon N ograničenih pokušaja putem `EXPIRED_RETRY_MAX`) i `credits_exhausted` su
namijenjeni da ostanu nedostupni dok se vjerodajnice/postavke ne promijene ili dok ih operator
ne resetuje. Ne prepisujte terminalna stanja prolaznim cooldown stanjem.

### Model Lockout

**Opseg**: provider + connection + model.

**Svrha**: izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili
ograničen kvotom za tu vezu.

Primjeri:

- Provideri sa kvotom po modelu koji vraćaju `429`.
- Lokalni provideri koji vraćaju `404` za jedan nedostajući model.
- Neuspjesi dozvola za specifične modove/modele providera, kao što su odabrani Grok modovi.

Model lockout se nalazi u `open-sse/services/accountFallback.ts` i omogućava istoj
vezi da nastavi opsluživati ostale modele.

### Smjernice za debugging

- Ako se svi ključevi za jednog providera preskaču, provjerite stanje provider breaker-a i `rateLimitedUntil`/`testStatus` svake
  veze.
- Ako se čini da je provider trajno isključen nakon prozora resetovanja, provjerite da li kod
  čita sirovi `state` umjesto korištenja `getStatus()`/`canExecute()`.
- Ako jedan ključ providera ne uspije, ali bi ostali trebali raditi, preferirajte connection cooldown nad
  provider breaker-om.
- Ako samo jedan model ne uspije, preferirajte model lockout nad connection cooldown-om.
- Ako se stanje treba samostalno oporaviti, treba imati budući vremenski pečat/timeout za resetovanje i
  putanju čitanja koja osvježava isteklo stanje. Permanentni statusi zahtijevaju ručne promjene vjerodajnica
  ili konfiguracije.

---

## Mapa repozitorija

Pročitajte najbliži `AGENTS.md` i povezanu detaljnu dokumentaciju prije nego što napravite bilo kakvu netrivijalnu izmjenu.

| Oblast                          | Lokacija                                                | Počnite ovdje                                                                                                                                    |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| API rute                        | `src/app/api/v1/`                                       | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Rukovanje streaming zahtjevima  | `open-sse/handlers/`                                    | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Izvršavanje provajdera i prevod | `open-sse/executors/`, `open-sse/translator/`           | [`docs/architecture/CODEBASE_DOCUMENTATION.md`](docs/architecture/CODEBASE_DOCUMENTATION.md)                                                     |
| Rutiranje i otpornost           | `open-sse/services/`                                    | [`open-sse/services/AGENTS.md`](open-sse/services/AGENTS.md), [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md)                         |
| Baza podataka i migracije       | `src/lib/db/`, `src/lib/db/migrations/`                 | [`src/lib/db/AGENTS.md`](src/lib/db/AGENTS.md)                                                                                                   |
| Domena politike                 | `src/domain/`                                           | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| MCP i A2A                       | `open-sse/mcp-server/`, `src/lib/a2a/`                  | [`docs/frameworks/MCP-SERVER.md`](docs/frameworks/MCP-SERVER.md), [`docs/frameworks/A2A-SERVER.md`](docs/frameworks/A2A-SERVER.md)               |
| Agent funkcionalnosti           | `src/lib/{acp,memory,skills,cloudAgent}/`               | [`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md), [`docs/frameworks/SKILLS.md`](docs/frameworks/SKILLS.md) |
| Sigurnost i upravljanje         | `src/lib/{guardrails,compliance}/`, `src/server/authz/` | [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md), [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md)             |
| Operacije                       | `src/mitm/`, tunnel moduli, `electron/`                 | [`docs/ops/TUNNELS_GUIDE.md`](docs/ops/TUNNELS_GUIDE.md), [`docs/guides/ELECTRON_GUIDE.md`](docs/guides/ELECTRON_GUIDE.md)                       |

---

## Raspored datoteka i higijena korijena repozitorija

- **Test datoteke**: SVI unit testovi, integracijski testovi, ecosystem testovi ili Vitest datoteke MORAJU biti strogo smješteni unutar `tests/` direktorija (npr. `tests/unit/`, `tests/integration/`). NIKADA ne kreirajte test datoteke u korijenu projekta (`/`).
- **Skripte i pomoćni alati**: SVE skripte za održavanje, debugiranje, generiranje ili eksperimentalne skripte (`.cjs`, `.mjs`, `.js`, `.ts`) MORAJU biti smještene strogo unutar jednog od `scripts/` podfoldera (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). Jednokratni ili eksperimentalni kod ide pod `scripts/ad-hoc/`. NIKADA ne ostavljajte nasumične skripte u korijenu projekta (`/`) ili u glavnom `scripts/` folderu.

**Korijen projekta SMIJE SADRŽATI SAMO:**

- Konfiguracijske datoteke (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Datoteke zavisnosti (`package.json`, `package-lock.json`)
- Dokumentacijske datoteke (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD datoteke i definicije ignoriranja (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Prilikom kreiranja _bilo kojih_ validacijskih testova ili jednokratnih logičkih skripti, po defaultu koristite `scripts/ad-hoc/` ili `tests/unit/` ovisno o vašim ciljevima. Ne zagađujte `/` root kontekst.

- **Root `_*` putanje su privatne i NIKADA se ne prate** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` i bilo koji budući `_<ime>`): one postoje samo na disku, git-ignorirane su putem
  Anchored obrazaca `/_*/` + `/_*`, a neke su zasebni git repozitoriji (`_tasks` →
  Privatni remote `_tasks_omniroute`). Nikada ne radite `git add` bilo čega unutar njih (običan `add` je
  već blokiran ignoriranjem; nikada ne koristite `-f`), i nikada ih ne "čistite" iz glavnog repo-a —
  uklanjanje praćenja vrši se pomoću `git rm --cached` kako bi sadržaj na disku ostao.
  `check:tracked-artifacts` provjera (pre-commit + CI) pada za BILO KOJU praćenu root putanju koja počinje sa
  `_`, sadašnju ili buduću. Pogledajte Hard Rule #23 za specifičnosti `_tasks`.

---

## Ključne konvencije

### Stil koda

- **2 razmaka**, tačka-zarez, dvostruki navodnici, širina od 100 znakova, es5 trailing zarezi (prisiljava lint-staged putem Prettier-a) — pokrenite Prettier na izmijenjenim datotekama
- **Importi**: eksterni → interni (`@/`, `@omniroute/open-sse`) → relativni
- **Imenovanje**: datoteke=camelCase/kebab, komponente=PascalCase, konstante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = greška svuda; `no-explicit-any` = **greška** u `open-sse/` i `tests/` (od #6218 — postojeće prekršaji su zamrznuti u `config/quality/eslint-suppressions.json`, novi moraju biti ispravljeni; `npm run lint` primjenjuje supresije i to je ono što CI pokreće)
- **TypeScript**: `strict: false`, target ES2022, module esnext, resolution bundler. Preferirajte eksplicitne tipove.

### Baza podataka

- **Uvijek** idite kroz `src/lib/db/` domenske module — **nikada** ne pišite raw SQL u rutama ili handlerima
- **Nikada** ne radite barrel-import iz `localDb.ts` — importujte specifične `src/lib/db/*` module
- DB singleton: `getDbInstance()` iz `src/lib/db/core.ts` (WAL journaling)
- Migracije: `src/lib/db/migrations/` — verzionisane SQL datoteke, idempotentne, pokreću se u transakcijama

### Obrada grešaka

- try/catch sa specifičnim tipovima grešaka, logiranje sa pino kontekstom
- Nikada ne gutajte greške u SSE streamovima — koristite abort signale za čišćenje
- Vratite odgovarajuće HTTP statusne kodove (4xx/5xx)

### Sigurnost

- **Nikada** ne koristite `eval()`, `new Function()` ili implicitni eval
- Validirajte sve ulaze pomoću Zod shema
- Encifrirajte vjerodajnice u mirovanju (AES-256-GCM); nikada ne logirajte SQLite ključeve za enkripciju
- Sanitizirajte korisnički HTML pomoću DOMPurify-a
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — održavajte sanitizaciju, Zod sheme i unit testove usklađenim prilikom uređivanja
- **Javne upstream vjerodajnice** (na primjer, OAuth client_id/secret vrijednosti ili Firebase Web ključevi ekstrahovani iz javnih CLI-ja): **MORAJU** biti ugrađeni putem `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` — **nikada** kao string literali. Pogledajte `docs/security/PUBLIC_CREDS.md` za obavezni obrazac.
- **Odgovori na greške** (HTTP / SSE / executor / MCP handler): **MORAJU** prolaziti kroz `buildErrorBody()` ili `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — **nikada** ne stavljajte raw `err.stack` ili `err.message` u tijelo odgovora. Pogledajte `docs/security/ERROR_SANITIZATION.md`.
- **Shell komande izgrađene iz varijabli**: prilikom pozivanja `exec()`/`spawn()` sa skriptom kojoj trebaju runtime vrijednosti, proslijedite ih putem `env` opcije (automatski shell-escaped) — **nikada** ne radite string-interpolaciju nepovjerenih/eksternih putanja u tijelo skripte. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Secure-by-default biblioteke** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferirajte Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink nad custom implementacijama kad god dodajete nove sigurnosno osjetljive površine.

---

## Tačnost dokumentacije

Dokumentacija mora opisivati verifikovano ponašanje, a ne verovatno ponašanje.

1. Prije dokumentovanja imena API-ja, endpointa, putanje, CLI komande ili environment varijable,
   potražite je: `rg -n "name" src/ open-sse/ bin/`. Ako nema poklapanja u izvornom kodu, nemojte je
   dokumentovati.
2. Mjerite promjenljive brojače umjesto da ih pišete iz sjećanja: koristite `wc -l <file>` ili
   komandu za brojanje specifičnu za direktorij.
3. Kopirajte primjere koda iz funkcionalne upotrebe ili ih pokrenite. Preferirajte link do izvora kao što je
   `path/to/file.ts:line` u odnosu na izmišljeni potpis.
4. Pokrenite `npm run check:docs-all` za izmjene u `docs/`; to uključuje validaciju
   izmišljene dokumentacije (fabricated-docs).

---

## Uobičajeni scenariji modifikacije

### Dodavanje novog provajdera (Provider)

0. Prvo provjerite `docs/reference/REMOVED_PROVIDERS.md` — provajderi uklonjeni na zahtjev njihovog operatora nikada ne smiju biti ponovo uvedeni (zaštićeno putem `tests/unit/removed-providers-blocklist.test.ts`)
1. Registrujte u `src/shared/constants/providers.ts` (Zod-validirano prilikom učitavanja)
2. Dodajte executor u `open-sse/executors/` ako je potrebna prilagođena logika (proširite `BaseExecutor`)
3. Dodajte translator u `open-sse/translator/` ako format nije OpenAI
4. Dodajte OAuth konfiguraciju u `src/lib/oauth/constants/oauth.ts` ako je bazirano na OAuth-u — ako upstream CLI isporučuje javni client_id/secret, ugradite ga putem `resolvePublicCred()` (vidi `docs/security/PUBLIC_CREDS.md`), **nikada** kao literal
5. Registrujte modele u `open-sse/config/providerRegistry.ts`
6. Napišite testove u `tests/unit/` (uključite asertaciju oblika publicCreds ako ste dodali novi ugrađeni default)

### Dodavanje nove API rute

1. Kreirajte direktorij pod `src/app/api/v1/your-route/`
2. Kreirajte `route.ts` sa `GET`/`POST` handlerima
3. Pratite obrazac: CORS → Zod validacija tijela (body) → opciona autentifikacija → delegacija handlera
4. Handler ide u `open-sse/handlers/` (importujte odatle, ne inline)
5. Odgovori na greške koriste `buildErrorBody()` / `errorResponse()` iz `open-sse/utils/error.ts` (automatski sanitizovano — nikada ne stavljajte `err.stack` ili `err.message` sirovo u tijelo). Vidi `docs/security/ERROR_SANITIZATION.md`.
6. Dodajte testove — uključujući barem jednu asertaciju da odgovori na greške ne otkrivaju stack trace (`!body.error.message.includes("at /")`)

### Dodavanje novog DB modula

1. Kreirajte `src/lib/db/yourModule.ts` — importujte `getDbInstance` iz `./core.ts`
2. Eksportujte CRUD funkcije za vašu domen tabelu (tabele)
3. Dodajte migraciju u `src/lib/db/migrations/` ako su potrebne nove tabele
4. Napišite testove

### Dodavanje novog MCP alata (Tool)

1. Dodajte definiciju alata u `open-sse/mcp-server/tools/` sa Zod input šemom + async handlerom
2. Registrujte u setu alata (povezano putem `createMcpServer()`)
3. Dodijelite odgovarajućem opsegu (scope)
4. Napišite testove (pozivanje alata se zapisuje u tabelu `mcp_tool_audit`)

### Dodavanje nove A2A vještine (Skill)

1. Kreirajte vještinu u `src/lib/a2a/skills/` (postoje već 6: smart-routing, quota-management, provider-discovery, cost-analysis, health-report, list-capabilities)
2. Vještina prima kontekst zadatka (poruke, metapodaci) → vraća strukturirani rezultat
3. Registrujte u `A2A_SKILL_HANDLERS` u `src/lib/a2a/taskExecution.ts`
4. Izložite u `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Napišite testove u `tests/unit/`
6. Dokumentujte u tabeli vještina u `docs/frameworks/A2A-SERVER.md`

### Dodavanje novog Cloud Agenta

1. Kreirajte klasu agenta u `src/lib/cloudAgent/agents/` koja proširuje `CloudAgentBase` (postoje već 4: codex-cloud, devin, jules, cursor-cloud)
2. Implementirajte `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrujte u `src/lib/cloudAgent/registry.ts`
4. Dodajte rukovanje OAuth-om/akreditivima ako je potrebno (`src/lib/oauth/providers/`)
5. Testovi + dokumentacija u `docs/frameworks/CLOUD_AGENT.md`

### Dodavanje nove ugrađene usluge (Embedded Service)

1. Kreirajte instalater u `src/lib/services/installers/{name}.ts` modeliran prema `ninerouter.ts` (koristite `runNpm` iz `installers/utils.ts` — bez shell interpolacije, strogo pravilo #13).
2. Registrujte uslugu u `src/lib/services/bootstrap.ts` (dodajte u niz `SERVICES[]` i proširite `buildSpawnArgsFactory()`).
3. Dodajte DB seed red za novu uslugu u `src/lib/db/migrations/` (tabela `version_manager`, `status='not_installed'`, `auto_start=0`).
4. Kreirajte 8 API endpointa pod `src/app/api/services/{name}/` (`_lib.ts`, `install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`). Svi delegiraju greške putem `createErrorResponse()`. Zajednički `logs` endpoint je već povezan putem `[name]/logs/route.ts`.
5. Verifikujte da je `/api/services/` u `LOCAL_ONLY_API_PREFIXES` u `src/server/authz/routeGuard.ts`; dodajte test koji potvrđuje da `isLocalOnlyPath()` vraća `true` za novi prefiks ako ga dodate (strogo pravilo #17).
6. Dodajte UI tab u `src/app/(dashboard)/dashboard/providers/services/tabs/` ponovo koristeći `ServiceStatusCard`, `ServiceLifecycleButtons`, `ServiceLogsPanel`.
7. Dokumentujte u `docs/frameworks/EMBEDDED-SERVICES.md` (ažurirajte tabelu usluga u §1 + API referencu u §4) i `docs/openapi.yaml`.
8. Napišite testove: unit (`tests/unit/services/`), integracione (`tests/integration/services/`, ograničeni sa `RUN_SERVICES_INT=1`), i ažurirajte smoke sekciju u `docs/ops/RELEASE_CHECKLIST.md`.

### Dodavanje novog Guardrail-a / Eval-a / Skill-a / Webhook eventa

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook event: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`
- Destinacija za izvoz logova: dodajte `src/lib/logExport/destinations/<name>.ts` + jedan red u
  `src/lib/logExport/registry.ts` → docs: `docs/frameworks/LOG-EXPORT.md`. Runner, REST sloj
  i dashboard svi čitaju registry, tako da ništa drugo ne mijenja.

---

## Referentna dokumentacija

Za svaku značajniju izmjenu, prvo pročitajte odgovarajući detaljni vodič:

| Oblast                                              | Dokument                                                |
| --------------------------------------------------- | ------------------------------------------------------- |
| Navigacija po repozitoriju                          | `docs/architecture/REPOSITORY_MAP.md`                   |
| Arhitektura                                         | `docs/architecture/ARCHITECTURE.md`                     |
| Inženjerska referenca                               | `docs/architecture/CODEBASE_DOCUMENTATION.md`           |
| Auto-Combo (bodovanje sa 16 faktora, 19 strategija) | `docs/routing/AUTO-COMBO.md`                            |
| Otpornost (3 mehanizma)                             | `docs/architecture/RESILIENCE_GUIDE.md`                 |
| Ponovni prikaz zaključivanja (Reasoning replay)     | `docs/routing/REASONING_REPLAY.md`                      |
| Framework vještina (Skills framework)               | `docs/frameworks/SKILLS.md`                             |
| Radar (overlay kataloga besplatnih modela)          | `docs/frameworks/RADAR.md`                              |
| Sistem memorije (FTS5 + Qdrant)                     | `docs/frameworks/MEMORY.md`                             |
| Cloud agenti                                        | `docs/frameworks/CLOUD_AGENT.md`                        |
| Guardrails (PII / injekcija / vizija)               | `docs/security/GUARDRAILS.md`                           |
| Javni upstream kredencijali (Gemini/etc.)           | `docs/security/PUBLIC_CREDS.md`                         |
| Sanitizacija poruka o greškama                      | `docs/security/ERROR_SANITIZATION.md`                   |
| Evals                                               | `docs/frameworks/EVALS.md`                              |
| Usklađenost / revizija                              | `docs/security/COMPLIANCE.md`                           |
| Webhooks                                            | `docs/frameworks/WEBHOOKS.md`                           |
| Izvoz logova (call logs → BigQuery/…)               | `docs/frameworks/LOG-EXPORT.md`                         |
| Pipeline autorizacije                               | `docs/architecture/AUTHZ_GUIDE.md`                      |
| Stealth (TLS / fingerprint)                         | `docs/security/STEALTH_GUIDE.md`                        |
| Protokoli agenata (A2A / ACP / Cloud)               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`              |
| MCP server                                          | `docs/frameworks/MCP-SERVER.md`                         |
| A2A server                                          | `docs/frameworks/A2A-SERVER.md`                         |
| API referenca + OpenAPI                             | `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` |
| Katalog provajdera (automatski generisano)          | `docs/reference/PROVIDER_REFERENCE.md`                  |
| Tuneli                                              | `docs/ops/TUNNELS_GUIDE.md`                             |
| Electron desktop aplikacija                         | `docs/guides/ELECTRON_GUIDE.md`                         |
| VS Code Copilot Chat (OmniCopilot ekstenzija)       | `docs/guides/VSCODE-COPILOT.md`                         |
| Release flow                                        | `docs/ops/RELEASE_CHECKLIST.md`                         |
| Embedded servisi                                    | `docs/frameworks/EMBEDDED-SERVICES.md`                  |
| Quality gates (~90 skripti, allowlist polisa)       | `docs/architecture/QUALITY_GATES.md`                    |

---

## Testiranje

| Šta                      | Komanda                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| Unit testovi             | `npm run test:unit`                                                           |
| Pojedinačni fajl         | `node --import tsx/esm --test tests/unit/your-file.test.ts`                   |
| Vitest (MCP, autoCombo)  | `npm run test:vitest`                                                         |
| E2E (Playwright)         | `npm run test:e2e`                                                            |
| Protocol E2E (MCP+A2A)   | `npm run test:protocols:e2e` (CI job `test-protocols-e2e`, advisory — #10049) |
| Ekosistem                | `npm run test:ecosystem` (CI job `test-ecosystem`, blocking)                  |
| Coverage gate            | `npm run test:coverage` (60/60/60/60 — statements/lines/functions/branches)   |
| Izvještaj o pokrivenosti | `npm run coverage:report`                                                     |

**PR pravilo**: Ako promijenite produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, morate uključiti ili ažurirati testove u istom PR-u.

**Preferencija slojeva testiranja**: prvo unit → integracijski (multi-modul ili DB stanje) → e2e (samo UI/workflow). Kodirajte reprodukcije bagova kao automatizovane testove prije ili uz samu ispravku.

**Oba test runner-a moraju proći**: `npm run test:unit` (Node native — većina testova) I `npm run test:vitest` (MCP server, autoCombo, cache) pokrivaju **fajlove koji se ne preklapaju**. Oba su povezana u CI-u (jobovi `test-unit` i `test-vitest`) i moraju biti zeleni prije spajanja (merge). PR u kojem prolazi samo jedan set testova može nenamjerno uvesti neispravne MCP alate ili regresije u rutiranju.

**Protokol za ispravku bagova / trijažu problema (Strogo pravilo #18)**: Svaka ispravka za prijavljeni problem mora biti validirana jednim od sljedećih načina — bez izuzetaka:

1. **TDD (preferirano)** — napišite test koji ne prolazi i reprodukuje bag → ispravite ga → potvrdite da test prolazi. Test postaje trajna zaštita od regresije. Dirajte samo fajlove za koje test dokazuje da je potrebna promjena; ništa više.
2. **Test u stvarnom okruženju (kada TDD nije moguć)** — deploy-ajte na produkcijski VPS (`root@192.168.0.15`) i pokrenite dokumentovani live test. Zabilježite tačnu komandu + rezultat u opisu PR-a. Primjenjuje se na: OAuth upstream tokove, Cloudflare/WS upstream ponašanje, regresije samo u UI-u, ponašanje zavisno od hardvera.
3. "Radilo je lokalno bez testa" se ne računa. Ispravka bez testa ili zapisa o VPS validaciji nije ispravka — već nagađanje.

Zašto je ovo važno: ispravljanje baga A dok se otvara bag B je gore nego da uopšte nije ništa ispravljano. TDD/VPS filter nameće hirurški opseg — dirate samo ono što neuspješan test dokazuje da je pokvareno. Primjeri gdje je ovo pomoglo: #3090 (claude-web 403), #3113 (WS HTTP fallback), #3052 (heap-guard auto-kalibracija).

**Copilot polisa pokrivenosti**: Kada PR promijeni produkcijski kod, a pokrivenost (coverage) je ispod 60% (statements/lines/functions/branches), nemojte samo to prijaviti — dodajte ili ažurirajte testove, ponovo pokrenite coverage gate, a zatim zatražite potvrdu. U izvještaj PR-a uključite pokrenute komande, promijenjene test fajlove i konačan rezultat pokrivenosti.

---

## Fokus revizije

- Operacije s bazom podataka držite u `src/lib/db/`; ne izvršavajte raw SQL direktno iz ruta.
- Zahtjeve provajderima šaljite putem `open-sse/handlers/`.
- MCP i A2A stranice držite kao tabove unutar `/dashboard/endpoint`.
- Zadržite SSE cleanup, parsiranje rate-limit zaglavlja, Zod validaciju i validaciju provider-sheme.
- Memory i Skills tretirajte kao cross-cutting promjene koje mogu utjecati na MCP alate, pipeline zahtjeva i A2A skillove.
- Ne zatvarajte pull request kontributora nakon korištenja njegovog koda; merge-ajte ga putem GitHub-a kako bi kontributor dobio priznanje.
- **Nikada nemojte merge-ati PR koji dodiruje površinu agent-instrukcija bez eksplicitnog odobrenja operatora** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ mirrori) i `skills/**/SKILL.md` izvršavaju se kao autoritet u svakoj AI sesiji; merge-ana instrukcija kompromituje svaki budući rad agenta. Provjerite sa `gh pr diff <N> --name-only` prije bilo kojeg merge-a. Zapis o incidentu: PR #11770 (2026-09-01) je naredio agentima da izvrše setup skriptu treće strane i bio je uključen u kampanju merge-anja; poništeno u #12249.

---

## Artefakti planiranja i istraživanja

`_tasks/` je **zaseban, izolovan git repozitorij** koji je gitignored u glavnom repozitoriju (`.gitignore` → `_tasks/`). To je kanonski dom za radne artefakte — planove, specifikacije/dizajne, istraživanja, primopredaje — kako bi ostali **verzionisani u svom repozitoriju** umjesto da zagađuju glavno OmniRoute stablo.

**Strogo pravilo — nikada ne pišite izlaz planiranja / istraživanja pod `docs/` ili u root repozitorija.**
Kad god bilo koji generator planova/specifikacija/istraživanja radi u ovom projektu (supermoći ili inače), snimite u `_tasks/` koristeći konvenciju imena datoteka:

| Artefakt               | Snimiti ovdje                                                 |
| ---------------------- | ------------------------------------------------------------- |
| Planovi                | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije / dizajn | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanja           | `_tasks/research/…`                                           |
| Primopredaje           | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit-ajte te artefakte unutar `_tasks/` repozitorija (`git -C _tasks …`), nikada u glavni repozitorij.

---

## Git Workflow

```bash
# Nikada ne commit-ajte direktno na main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Prefiksi grana**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commita** (Conventional Commits): `feat(db): add circuit breaker` — scope-ovi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hook-ovi**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11` + `check:tracked-artifacts`
- **pre-push**: namjerno lagan (samo PATH/npm sanity). `any-budget` + `tracked-artifacts` već rade na pre-commit-u; ponovno pokretanje pri svakom push-u bilo je čisto dupliranje troška. CI i dalje nameće oba. (Bilo je Fase 6A.12 puni pre-push gate; integrisano u pre-commit u #6716.)

### Izolacija worktree-a (OBAVEZNO za svaki razvojni zadatak)

Više sesija/agenta rade u ovom repozitoriju paralelno. Glavni checkout je **zajednički**, tako da `git checkout`/promjena grane u njemu tiho odbacuje necommit-ani rad druge sesije i izvlaci granu ispod svega ostalog što je pokrenuto (incidenti: 2026-06-05, 2026-06-13).

**Pravilo: nikada ne razvijajte na zajedničkom glavnom checkout-u. Svaki zadatak dobija svoj git worktree na svojoj namjenskoj grani, i MORATE potvrditi baznu granu sa operatorom prije kreiranja.**

1. **Prvo pitajte — koja bazna grana?** Prije kreiranja bilo čega, pitajte operatora (osim ako vam već nije rekao) iz koje grane novi worktree/grana treba biti odvojeni. NE pretpostavljajte `main` ili "ono na čemu se trenutno nalazim" — odgovor je obično aktivni `release/vX.Y.Z`, ali može biti druga feature/release grana. Eksplicitno zatražite bazu.
2. **Kreirajte izolovan worktree + granu iz te baze** (nikada ne ponovite glavni checkout).
   **🔴 OBAVEZNA PUTANJA: svaki worktree živi pod `.claude/worktrees/` — i nigdje drugdje.**
   Ovo je jedina kanonička lokacija. Ona je gitignored I nalazi se u `tsconfig.json` / `.dockerignore` isključenjima, tako da worktree-ovi nikada ne procure u scope build-a. **Nikada** ne koristite `.worktrees/`, root repozitorija ili bilo koju drugu putanju — worktree izvan `.claude/worktrees/` (a) izmiče build-scope isključenja i truje `next build` (the `tsconfig` `include: **/*` globs ~70× codebase → OOM; incident 2026-06-25) i (b) raspršuje worktree-ove kroz dva direktorija.

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← grana koju je operator potvrdio u koraku 1
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".claude/worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".claude/worktrees/${TASK##*/}"
   # Ponovite node_modules glavnog checkout-a kako biste preskočili npm install po svakom worktree-u.
   # HARD LINKS (`cp -al`), nikada symlink: ~5s za cijelo stablo i skoro nula dodatnog
   # prostora na disku (inode-ovi su zajednički), i za razliku od symlinka, ne kvari dev server.
   cp -al "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   # `.husky/_` je gitignored, tako da svjež worktree to NEMA i
   # `core.hooksPath=.husky/_` tada pokazuje na direktorij koji ne postoji —
   # svaki pre-commit gate postaje tiho nijem. Kopirajte i to.
   cp -a "$(git -C <main_checkout> rev-parse --show-toplevel)/.husky/_" .husky/_
   ```

   `scripts/dev/new-worktree.sh <branch> [base]` radi sve navedeno (kanonička putanja, hard-link-ani `node_modules`, `.husky/_`) i zatim **verifikuje** da je hook zapravo izvršan, stoga ga preferirajte u odnosu na ručno pokretanje koraka.

**Nikada ne koristite `ln -s` za node_modules.** Turbopack odbija symlink koji se razrešava izvan korijena projekta, tako da `npm run dev` puca sa FATAL panic greškom (`Symlink [project]/node_modules is invalid, it points out of the filesystem root`) dok typecheck, lint i test runneri i dalje prolaze — greška navodi "filesystem root", a ne worktree, pa deluje kao Next/build bug i zahteva mnogo vremena za lociranje (incident 2026-07-31, #9043).

**Worktree bez `.husky/_` ne pokreće NIKAKVA pre-commit ograničenja — i ne javlja ništa.** `git` razrešava `core.hooksPath` relativno u odnosu na vrh worktree-a; kada direktorijum nedostaje, on jednostavno ne pronađe hook i izvrši commit. Ništa nije ispisano, commit uspeva, a identity/lint/docs ograničenja nikada nisu pokrenuta. Tako je 59 commit-a sa zastarelim identity override-om (ime kontributora + e-mail maintainera) prošlo kroz `scripts/check/check-git-identity.sh` između 2026-08-29 i 09-02 — svi su napravljeni u `cp -al` worktree-ima. Verifikujte pomoću `ls .husky/_/pre-commit` unutar novog worktree-a, ili jednostavno koristite `scripts/dev/new-worktree.sh`, koji jasno javlja grešku kada hook nije izvršan.

3. **Radite, commit-ujte, push-ujte, otvorite PR — sve iznutar worktree-a.** Nikada nemojte raditi `git checkout` na drugu granu unutar worktree-a koju bi mogla deliti druga sesija.
4. **Uklonite samo sopstveni** worktree + granu kada završite, iz glavnog checkout-a: `git worktree remove .claude/worktrees/<dir>` zatim `git branch -D <task>`. Nikada nemojte masovno brisati `fix/*`/`feat/*` — druge sesije čuvaju svoje; brišite samo grane koje ste kreirali, po imenu.
5. **Nikada ne dirajte worktree, granu ili necommit-ovane izmene druge sesije.** Ako `git worktree list` prikazuje worktree-e koje niste kreirali, ostavite ih na miru. Završite svaku sesiju tako što ćete vratiti glavni checkout na granu na kojoj je počeo (aktivna `release/vX.Y.Z`, nikada `main`).

### Base-green provera (PR-ovi ne smeju biti "rođeni" crvenim)

Pre kreiranja grane, spajanja baze u PR granu, masovnog promenjivanja ciljeva PR-ova ili otvaranja PR-a: proverite da li je vrh baze "zelen". `Release-Green (continuous)` workflow (`.github/workflows/nightly-release-green.yml`) objavljuje presudu u jednom dedupliciranom issue-u pod nazivom `🔴 Release branch not green: <branch>` (label `base-red`). Jedan poziv zamenjuje bilo koje lokalno pokretanje suite-a u ovu svrhu:

```bash
gh issue list --repo diegosouzapw/OmniRoute --state open \
  --search "Release branch not green: <base> in:title"
```

Ako je baza crvena: nikada ne tretirajte naslijeđene neuspjehe kao defekt vaše grane; nikada ih ne "popravljajte" unutar svoje feature grane (popravak base-red je zaseban freeze-gated `fix/release-vX.Y.Z-basereds` PR); i ako ipak morate otvoriti PR, dodajte `⚠️ base-red inherited: #<issue>` u telo PR-a kako recenzenti i CI nadzornici ne bi jurili duhove.

### Sync-back spajanja su fast-forward, nikada squash

`main → release/vX+1` sync-back (Faza 5 od `/generate-release`, ili bilo koji kasniji PR za "prenošenje post-release commit-ova iz main-a") mora stići do release grane kao merge commit koji već jeste: `git merge-base --is-ancestor origin/release/vX+1 <head>` zatim `git push origin <head>:refs/heads/release/vX+1` (GitHub označava PR kao spojen). Squash-merge izbacuje `main` iz predaka release grane i sledeći sync-back ponovo pravi konflikte u svakom fajlu koji je main dotakao (551 konflikt na v3.8.50 → v3.8.51 sync-u pre dvostrukog merge-a). Nakon spajanja, `git merge-base --is-ancestor origin/main origin/release/vX+1` mora biti true — i proverite da li su `config/quality/eslint-suppressions.json` / `quality-baseline.json` preneli main-ove freeze-ove (oni se spajaju kao "ours" tiho). Detalji: `.agents/skills/generate-release/phases/phase-5-next-cycle.md`.

---

## Upstream doprinosi

Ovaj checkout je fork `diegosouzapw/OmniRoute`. Isključite promjene koje se odnose samo na deployment forka i personalne automatizacije iz upstream PR-ova.

Upstream rad započnite s aktivnom upstream default granom, ne sa `main`:

```bash
git fetch upstream
git switch -c <branch-name> upstream/<default-branch>
```

U pull requestu ciljajte istu release granu. Stage-ajte samo namijenjene datoteke, pokrenite fokusirane provjere i koristite Conventional Commit poruku (na primjer, `docs: slim AGENTS.md`).

---

## Okruženje

- **Runtime**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES Modules. Ovo je **jedini podržani** runtime za objavljeni `omniroute` CLI, server i test suite-ove (`node:test` + vitest) — `engines.node` je autoritativan i krajnjim korisnicima nikada nije potreban Bun. Postoji **put kompatibilnosti `bun:sqlite` na principu "best-effort"** kako bi globalna Bun instalacija (`bun install -g omniroute`) mogla startati bez `better-sqlite3` (adapter drivera + Bun-aware procesno pokretanje); on **nije** podržani runtime — nema garancija podrške — i svaka Bun-specifična promjena runtime-a MORA očuvati Node driver/fallback lanac i uključiti Bun test (`test:bun:db`) ili eksplicitno obrazloženje zašto je put isključivo Node-ov.
- **Bun (build/dev script runner + samo kompatibilnost smoke testova)**: Bun `1.4.2` je fiksiran kao **egzaktna devDependency** (obezbijeđena kroz postojeći `npm ci` putem `@oven/bun-*` platformskih binarnih datoteka u lockfile-u — bez `setup-bun`/ad-hoc instalacije). Koristi se **isključivo** za izvršavanje malog, dopuštenog seta TypeScript **gate/generator skripti** (zamjenjuje `node --import tsx` radi brzine pokretanja): CI provjere `check:provider-consistency`, `check:compression-budget`, `check:known-symbols`, i non-CI `gen:provider-reference`, `bench:compression` — plus fokusirani `test:bun:db` compatibility smoke suite za best-effort `bun:sqlite` put. **NE** proširujte Bun na `npm install`, build (`build:cli*`), `check:pack-artifact`, podržani objavljeni runtime ili glavne test runner-e — oni ostaju na Node-u. Svaka nova gate/generator skripta koja poziva Bun mora prvo biti validirana kao bajt-identična u odnosu na njen `node --import tsx` izlaz. Nakon povlačenja promjene lockfile-a, pokrenite `npm install` kako bi se `bun` lokalno razriješio (zastarjeli `node_modules` će uzrokovati pad tih skripti s greškom `bun: not found`).
- **TypeScript**: 6.0+, target ES2022, module esnext, resolution bundler
- **Path aliasi**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Default port**: 20128 (API + dashboard na istom portu)
- **Direktorijum podataka**: `DATA_DIR` env varijabla, default je `~/.omniroute/`
- **Ključne env varijable**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` zatim generišite `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Quality Gates & Ratchets

OmniRoute ima **~90 quality-gate skripti** (`scripts/check/` + `scripts/quality/`) povezanih
kroz **9 gate-running job-ova** u `.github/workflows/ci.yml` (`lint`, `quality-gate`,
`quality-extended`, `docs-sync-strict`, `i18n-ui-coverage`, `i18n`, `pr-test-policy`,
`test-vitest`, `sonarqube`), plus `quality.yml` fast-gates job (PR→`release/**`) i
5 quality nightly workflow-a (`nightly-property`, `nightly-resilience`,
`nightly-llm-security`, `nightly-mutation`, `nightly-schemathesis`). Potpun inventar, raščlanba po job-ovima i operativne
procedure nalaze se u [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Brza referenca:**

- Gate-ovi u job-ovima `lint` + `docs-sync-strict`: pass/fail policy gate-ovi —
  popravite kršenje ili dodajte unos na allowlistu s komentarom o opravdanju + tracking issue-om.
- Gate-ovi u job-u `quality-gate`: ratchet — metrike (ESLint upozorenja, pokrivenost koda, duplikacija,
  kompleksnost) ne smiju regredirati u odnosu na `quality-baseline.json`. Ažurirajte putem
  `npm run quality:ratchet -- --update` kada metrika stvarno napreduje.
- Job `test-vitest` pokreće `npm run test:vitest` (MCP tools, autoCombo, cache) — blokira.
  `test:vitest:ui` je blokirajući od PR-a #7127.
- **Velocity faza (2026-08-30 → v4.0)**: svaki numerički baseline je ublažen za 20% i
  `--require-tighten` je savjetodavan (`quality-baseline.json` → `_policy`); nightly
  `baseline-headroom` job prati koliko je budžeta preostalo u issue-u
  "📈 Baseline headroom". Pogledajte `docs/architecture/QUALITY_GATES.md` → "Velocity phase".

**Allowlist polisa (skraćeno):** Popravite uzrok; koristite allowlist samo za već postojeća
kršenja koja ne možete popraviti u istom PR-u. Dodajte komentar s opravdanjem + brojem issue-a.
Zastarjeli unosi na allowlisti (koji potiskuje kršenje koje više ne postoji) bit će uhvaćeni
stale-enforcement-om dodanim u Fazi 6A.3.

---

## Stroga pravila

1. Nikada ne commitujte tajne ili kredencijale
2. Nikada ne koristite barrel-import iz `localDb.ts` — importujte specifične `src/lib/db/*` module
3. Nikada ne koristite `eval()` / `new Function()` / implicitni eval
4. Nikada ne commitujte direktno u `main`
5. Nikada ne pišite raw SQL u rutama — koristite `src/lib/db/` module
6. Nikada ne ignorišite greške u tišini u SSE streamovima
7. Uvijek validirajte inpute pomoću Zod shema
8. Uvijek uključite testove prilikom izmjene produkcijskog koda
9. Pokrivenost (coverage) ne smije pasti ispod bazne linije zamrznute u `quality-baseline.json` (ratchet); apsolutni minimum je 60% (statements/lines/functions/branches). Ažurirajte baznu liniju putem `npm run quality:ratchet -- --update` samo kada se pokrivenost stvarno poboljša. Pogledajte `docs/architecture/QUALITY_GATES.md`.
10. Nikada ne zaobilazite Husky hook-ove (`--no-verify`, `--no-gpg-sign`) bez izričite dozvole operatora.
11. Nikada ne ugrađujte javne upstream OAuth client_id/secret ili Firebase Web ključeve kao string literale — uvijek idite preko `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pogledajte `docs/security/PUBLIC_CREDS.md`.
12. Nikada ne vraćajte raw `err.stack` / `err.message` u HTTP / SSE / executor odgovorima — uvijek rutirajte preko `buildErrorBody()` ili `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pogledajte `docs/security/ERROR_SANITIZATION.md`.
13. Nikada ne interpolirajte eksterne putanje ili runtime vrijednosti u shell skripte koje se prosljeđuju u `exec()`/`spawn()` — umjesto toga ih proslijedite putem `env` opcije. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikada ne odbacujte CodeQL / Secret-Scanning upozorenje bez toga da (a) prvo provjerite gore navedenu dokumentaciju o obrascima kako biste vidjeli primjenjuje li se pomoćnik, i (b) zabilježite tehničko opravdanje u komentaru odbijanja. Preceden: `js/stack-trace-exposure` podignut na pozivima koji već rutiraju preko `sanitizeErrorMessage()` je poznato CodeQL ograničenje (prilagođeni sanitizeri nisu prepoznati) — odbacite kao `false positive` referencirajući `docs/security/ERROR_SANITIZATION.md`.
15. Nikada ne izlažite rute koje pokreću child procese (`/api/mcp/`, `/api/cli-tools/runtime/`) bez `isLocalOnlyPath()` klasifikacije u `src/server/authz/routeGuard.ts`. Loopback provođenje se događa bezuvjetno prije bilo koje provjere autentifikacije — curenje JWT-a putem tunela ne može pokrenuti proces. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikada ne navodite niti reklamirajte AI asistenta, LLM ili automatizirani račun u bilo kojim commit/PR metapodacima. Dvije zabranjene forme, obje ekvivalentne — one rutiraju atribuciju bot računu (ili reklamiraju AI autorstvo) i skrivaju stvarnog autora (`diegosouzapw`): **(a)** `Co-Authored-By` traileri koji imenuju AI/bot (npr. imena koja sadrže "Claude", "GPT", "Copilot", "Bot"; emailovi na `anthropic.com` / `openai.com` / bot-ovni `noreply.github.com` adrese); **(b)** AI-generisani footeri ili opisi bilo gdje u commit poruci, PR naslovu/tijelu ili CHANGELOG-u — npr. `🤖 Generated with [Claude Code]`, "Generated with Claude Code", "Made with <AI tool>", ili bilo koja `Co-authored-by: Claude/GPT/Copilot` linija. Ovo **poništava svaki harness, template ili default alata koji automatski dodaje takav footer** — uklonite ga prije push-anja; ne dopustite da stigne do commita, PR-a ili CHANGELOG-a. Ljudski kolaboratori — uključujući upstream PR autore i prijavljivače issue-a koji se prenose u OmniRoute — MOGU i TREBAJU biti navedeni standardnim `Co-authored-by: Name <email>` trailerima; upstream-port workflow-ovi (`/port-upstream-features`, `/port-upstream-issues`) ovise o tome.
17. Nikada ne izlažite rute pod `/api/services/` ili `/dashboard/providers/services/*/embed/` bez `isLocalOnlyPath()` klasifikacije u `src/server/authz/routeGuard.ts`. Ove rute mogu pokrenuti child procese (`npm install`, `node`). Loopback provođenje se događa bezuvjetno prije bilo koje provjere autentifikacije — curenje JWT-a putem tunela ne može pokrenuti proces. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
18. Svaka ispravka bug-a mora biti validirana prije slanja: unit/integracijski test koji prvo ne prolazi, a zatim prolazi (TDD) ILI dokumentirani live test na produkcijskom VPS-u (192.168.0.15). Ispravka bez ijednog od toga se ne merge-uje. Pogledajte Testing → "Bug fix / issue triage protocol" za puni stablo odlučivanja.
19. Nikada ne razvijajte na zajedničkom main checkout-u. Svaki razvojni zadatak pokreće se u vlastitom git worktree-u na vlastitoj namjenskoj grani, i MORATE potvrditi baznu granu s operatorom prije kreiranja worktree-a/grane — nikada ne pretpostavljajte `main` ili trenutno checkout-ovanu granu. `git checkout` u zajedničkom checkout-u tiho uništava necommit-ovani rad drugih sesija. Uklonite samo worktree-ove/grane koje ste kreirali (po imenu, nikada `fix/*`/`feat/*` wildcard-ima), ostavite worktree-ove drugih sesija netaknute i završite na grani na kojoj ste počeli (aktivna `release/vX.Y.Z`, nikada `main`). Pogledajte Git Workflow → "Worktree isolation".
20. Redakcija/sanitizacija PII-a je **opt-in — nikada nije uključena po defaultu**. OmniRoute proxy-uje za self-hosted/lokalne LLM-ove gdje operator posjeduje podatke, tako da bi mutiranje payload-a zahtjeva/odgovora po defaultu tiho korumpiralo legitimni saobraćaj. Dva PII feature flag-a koji mutiraju podatke **MORAJU** zadržati `defaultValue: "false"` u `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (strana zahtjeva) i `PII_RESPONSE_SANITIZATION` (odgovor + streaming). Sve tri aplikacijske tačke — `src/lib/guardrails/piiMasker.ts` (request guardrail), `src/lib/piiSanitizer.ts` (odgovor), `src/lib/streamingPiiTransform.ts` (SSE) — su ograničene ovim flagovima; kada su oba isključena, `pii-masker` guardrail i dalje radi ali nikada ne mutira payload-ove (podaci prolaze netaknuti). Promjena bilo kojeg defaulta u `"true"` zahtijeva izričitu dozvolu operatora. Zaštita od regresije je `tests/unit/pii-opt-in-default.test.ts` (potvrđuje oba defaulta definicije + behavioralni prolaz). Opt-in je po operatoru putem env-a ili settings/DB override-a (`src/lib/db/featureFlags.ts`), nikada tihi default. Pogledajte `docs/security/GUARDRAILS.md`.
21. **Release-freeze — ZAMRZNUTA release grana pripada release captainu; razvoj NE staje (parallel-cycle model, 2026-07-04).** `/generate-release` otvara marker issue označen sa `release-freeze` na početku pomirenja (Faza 0a), **odmah kreira granu za sljedeći ciklus `release/vX+1` iz zamrznutog vrha (Faza 0a.0b — bump + living release PR + prebacivanje otvorenih PR-ova)**, i zatvara freeze kada se release PR squash-merge-uje u `main`. Prije merge-anja **bilo kojeg** PR-a, svaki campaign workflow (`/review-prs`, `/review-group-prs`, `/merge-prs`, `/triage-fix-bugs`, `/implement-fix-bugs`, `/triage-features`, `/implement-features`, `/green-prs`, `/port-upstream-*`) **MORA** provjeriti `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open` — ako je freeze aktivan: **NIKADA ne merge-ujte u zamrznutu `release/vX.Y.Z` navedenu u naslovu freeze-a**; umjesto toga odredite AKTIVNU razvojnu granu (najviša `release/v*` prema semver-u — obično `release/vX+1`, najavljena u komentaru freeze-issue-a) i **preusmjerite PR tamo** (`gh pr edit <N> --base release/vX+1`, zatim VERIFICIRAJTE sa `gh pr view <N> --json baseRefName` — edit može tiho propasti) i merge-ujte normalno. **ČEKAJTE samo kada je najviša release/v\* grana zapravo ona zamrznuta** (kratki prozor prije nego što 0a.0b završi, ili release prije parallel-cycle-a) — u tom slučaju ostavite PR spremnim i otvorenim, obavijestite operatora i nastavite kada se pojavi sljedeća grana ili kada se freeze podigne. Upravo poslane ispravke stižu do `release/vX+1` putem Phase 5 sync-back-a (`scripts/release/sync-next-cycle.mjs`); ne pokušavajte sinkronizirati usred release-a. Ovo je **signal za koordinaciju, a ne zaključavanje dozvole**: release captain i campaign sesije dijele `diegosouzapw` identitet, tako da GitHub branch-protection lock ne može razlikovati njih — samo ovaj poštovani marker sprečava commit race-ove usred release-a koji su forsirali potpuno ponovno pomirenje CHANGELOG-a u v3.8.40/v3.8.41 (paralelna kampanja je pomjerila `release/vX.Y.Z` za 34 commita usred rada). Sopstveni push-ovi release captaina za pomirenje/otvaranje ciklusa su izuzeti — oni _su_ release. Ispravke koje moraju stići tokom freeze-a (nalaz homologacije) prate pravilo read-only nakon merge-a: prvo stižu na `main` putem `fix/release-vX.Y.Z-*`. **⛔ SAMO `/generate-release` smije podići release-freeze, i to SAMO u svojoj Fazi 0a (početak generisanja nove verzije) — podiže se u Fazi 12c nakon squash-merge-a u `main`.** Nijedna kampanja, sesija ili agent ne smije otvoriti `release-freeze` marker u bilo koje drugo vrijeme — freeze **nikada** nije alat za koordinaciju usred razvoja. Ako sesija ikada smatra da je freeze stvarno i neizbježljivo neophodan izvan `/generate-release` toka, ona **MORA prvo pitati operatora (`diegosouzapw`) u chatu, eksplicitno upozoriti "estou criando um freeze" i dobiti izričito "da"** — nikada ne otvarajte, produžavajte ili ponovo otvarajte `release-freeze` autonomno. Nasuprot tome, **nemojte** zatvarati/podizati aktivni `/generate-release` freeze kako biste odblokirali campaign merge-ove: on štiti jedini čisti CI run captaina i automatski se podiže u Fazi 12c — rano zatvaranje ponovo pokreće upravo onaj commit race koji on sprečava. Verificirajte da je freeze legitiman prije nego što djelujete: otvoreni `release-freeze` čiji naslov/tijelo referencira **OTVOREN** release PR (`gh pr view <N> --json state`) je ovlašteni captain freeze — čekajte, ne dirajte. (Predlog ciklusa: `_tasks/finished/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md`.)
22. **Sigurnost između sesija — ovaj repo obrađuju MNOGE paralelne sesije/agenti odjednom; nikada ne smetajte tuđem radu koji je u toku.** Dvije apsolutne zabrane, obje ponovljeni incidenti (ovo pravilo postoji jer se stalno ponavljaju):

- **(a) Nikada ne koristite `git stash` / `git stash pop` — NIGDJE u ovom repu, uključujući izolirane worktree-ove i bilo kog subagenta kojeg dispatch-ujete.** `git stash` operiše na **zajedničkom repository object store-u**, a ne na working tree-u po worktree-u — tako da stash koji je push-ovan ili pop-ovan u jednoj sesiji može tiho pregaziti ili vratiti necommit-ovane izmjene druge paralelne sesije. Ovo nije hipotetičko: 2026-07-02 izmjena quotaCache-a iz `#5923` procurela je u nepovezani `#2296` worktree putem globalnog `stash pop`-a, a ista klasa se ponovila kroz **subagenta**. Da biste uporedili radne izmjene sa baznim ref-om **bez** stashing-a, koristite `git show <ref>:<path>` ili `git diff <ref> -- <path>`; da biste potvrdili da je typecheck/lint greška već postojala na bazi, direktno pregledajte bazni ref (`git show origin/release/vX.Y.Z:<path>`) — nikada ne stash-ujte svoje stablo kako biste ga "očistili". **Stavite ovu zabranu verbatim u prompt svakog subagenta koji dira git** (agenti ne nasljeđuju kontekst ovog fajla — ponavljanje je bilo zbog subagenta).
- **(b) Nikada ne merge-ujte, push-ujte, rebase-ujte ili force-push-ujte PR / granu / worktree na kojem aktivno radi druga sesija.** Otvoreni PR čiji je head live fix worktree u `.claude/worktrees/` koji niste vi kreirali (npr. `fix-5852`/`fix-5923` koji nose svježe commit-ove, čak i kada dijele vaš `diegosouzapw` identitet), ili bilo koja grana koju posjeduje druga sesija, je **zabranjena — ČEKAJTE**, i pustite da je sesija vlasnik merge-uje. **Prije** merge-anja ili push-anja u bilo koji PR koji niste kreirali u _ovoj_ sesiji, pokrenite `git worktree list` da provjerite postoji li odgovarajući in-flight worktree i ponovo provjerite `gh pr view <N> --json state,headRefOid`. Samo sesija vlasnik merge-uje svoj vlastiti in-flight PR; merge-ovi usred leta utrkuju se s vlasnikom i ponovo pokreću upravo one commit/CHANGELOG race-ove koje Pravilo #19 i Pravilo #21 štite. (Pojačava Pravilo #19.)

23. **`_tasks/` je NETAKNIV kao struktura — samo append/edit.** To je ZASEBAN git repozitorij
    (privatni remote `diegosouzapw/_tasks_omniroute`) montiran kao stvarni direktorij u korijenu
    glavnog Checkout-a. Apsolutna pravila: (a) NIKADA ne pomjerajte, preimenujte, brišite, praznite ili
    pretvarajte `_tasks` u symlink; sesije smiju samo KREIRATI ili EDITOVATI fajlove unutar njega;
    (b) NIKADA ne pratite `_tasks` (čak ni kao symlink) u glavnom repu — praćeni blob je bio
    uzrok DVA brisanja (2026-08-08 i 2026-08-10: `git reset --hard` materijalizovao je
    symlink koji je bio praćen preko stvarnog direktorija i git je obrisao sav ignorisani sadržaj bez
    upozorenja); (c) nakon svakog relevantnog pisanja, `git -C _tasks add -A && git -C _tasks commit
 && git -C _tasks push` — čest push je stvarni backup; (d) ponovite ovu zabranu
    VERBATIM u promptu svakog subagenta koji dira git; (e) ako se `_tasks` pojavi kao pokidani
    symlink, NE commitujte ništa — vratite ga sa remote-a i obavijestite operatora. Gate
    `check:tracked-artifacts` (pre-commit + CI) blokira praćeni `_tasks` u bilo kojem obliku.

Please provide the markdown content you would like me to translate. I am ready to begin.

## Pouke o PII-u i sanitizaciji stream-a

### 1. Sigurnost Regex-a (ReDoS)

Svi regex obrasci koji podudaraju stringove promjenjive dužine (npr. IPv6 adrese, kreditne kartice) moraju koristiti strogo ograničene, nepreklapajuće sekvence (npr. ograničite pojavljivanja granicama `{1,7}`) kako bi se spriječio katastrofalni backtracking prilikom obrade nepovjerljivih ulaza.

### 2. Rukovanje SSE snapshot-ima

Prilikom parsiranja streaming LLM odgovora (npr. Responses API), provjerite da li chunk predstavlja finalni snapshot (`done` ili `completed` događaji). Snapshot tekst mora biti sanitiziran direktno kao zaseban string (zaobilazeći rolling delta buffere) kako bi se spriječilo dupliranje teksta na kraju stream-a.

### 3. Database handle-ovi u testovima

Osigurajte da svi unit testovi koji pokreću migracije baze podataka ili uspostavljaju SQLite konekcije pozovu `resetDbInstance()` i pravilno očiste/zatvore sve DB handle-ove u `test.after(...)` hook-u. Neuspjeh u oslobađanju handle-ova konekcije baze podataka uzrokovat će da Node-ov nativni test runner zauvijek ostane zaglavljen (hang).

---

## Pristup lokalnom razvoju

Dashboard je dostupan na URL-u/portu koji je odabrao operator (podrazumijevano `http://localhost:20128`). Akredativi su specifični za operatora:

- **Početna admin lozinka** čita se iz `INITIAL_PASSWORD` env varijable prilikom prve instalacije (podrazumijevano je `CHANGEME` u `.env.example`; promijenite je odmah nakon prve prijave).
- **Lokalni VPS / zajednički dev okručenja**: zatražite od operatora URL i trenutne akreditive — oni se nalaze u njihovom ličnom vault-u, NE u ovom repozitorijumu.

> Bilo koji akreditiv uočeni u prethodnoj verziji ovog fajla bio je demo vrijednost za ne-produkcijsko okručenje; tretirajte ga kao kompromitovan i nemojte ga ponovo koristiti.

<!-- BEGIN:nextjs-agent-rules -->

# Ovo NIJE Next.js koji poznajete

Ova verzija ima breaking promjene — API-ji, konvencije i struktura fajlova mogu se svi razlikovati od vaših trening podataka. Pročitajte relevantni vodič u `node_modules/next/dist/docs/` (resolviran iz direktorijuma ovog fajla; u monorepositorijumima `next` paket možda neće biti vidljiv iz korijena repo-a) prije pisanja bilo kojeg koda. Obratite pažnju na obavještenja o zastarjivanju (deprecation notices).

Ovaj blok je napisan i ponovo dodan od strane `next dev` — verifikujte na `node_modules/next/dist/server/lib/generate-agent-files.js`. Uklanjanje iz diff-a samo ponovo kreira nekomitovanu promjenu; komitovanje zajedno sa vašim radom održava stablo čistim.

<!-- END:nextjs-agent-rules -->
