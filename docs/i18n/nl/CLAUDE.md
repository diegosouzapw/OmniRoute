# CLAUDE.md (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Dit bestand biedt richtlijnen voor Claude Code (claude.ai/code) bij het werken met code in deze repository.

## Snelle Start

```bash
npm install                    # Installeer afhankelijkheden (genereert automatisch .env vanuit .env.example)
npm run dev                    # Dev-server op http://localhost:20128
npm run build                  # Productiebouw (Next.js 16 standalone)
npm run lint                   # ESLint (0 fouten verwacht; waarschuwingen zijn al aanwezig)
npm run typecheck:core         # TypeScript controle (zou schoon moeten zijn)
npm run typecheck:noimplicit:core  # Strikte controle (geen impliciete any)
npm run test:coverage          # Eenheidstests + dekkingseis (75/75/75/70 — statements/lines/functions/branches)
npm run check                  # lint + test gecombineerd
npm run check:cycles           # Detecteer circulaire afhankelijkheden
```

### Tests Uitvoeren

```bash
# Enkele testbestand (Node.js native test runner — de meeste tests)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# Alle suites
npm run test:all
```

Voor de volledige testmatrix, zie `CONTRIBUTING.md` → "Tests Uitvoeren". Voor diepgaande architectuur, zie `AGENTS.md`.

---

## Project in een Oogopslag

**OmniRoute** — verenigde AI proxy/router. Eén eindpunt, 160+ LLM-providers, automatische fallback.

| Laag          | Locatie                 | Doel                                                                         |
| ------------- | ----------------------- | ---------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — toegangspunten                                          |
| Handlers      | `open-sse/handlers/`    | Verzoekverwerking (chat, embeddings, enz.)                                   |
| Executors     | `open-sse/executors/`   | Provider-specifieke HTTP dispatch                                            |
| Translators   | `open-sse/translator/`  | Formaatconversie (OpenAI↔Claude↔Gemini)                                      |
| Transformer   | `open-sse/transformer/` | Antwoorden API ↔ Chat Completes                                              |
| Services      | `open-sse/services/`    | Combo-routing, snelheidslimieten, caching, enz.                              |
| Database      | `src/lib/db/`           | SQLite domeinmodules (45+ bestanden, 55 migraties)                           |
| Domein/Beleid | `src/domain/`           | Beleid engine, kostenregels, fallback-logica                                 |
| MCP Server    | `open-sse/mcp-server/`  | 37 tools (30 basis + 3 geheugen + 4 vaardigheden), 3 transporten, ~13 scopes |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agentprotocol                                                   |
| Vaardigheden  | `src/lib/skills/`       | Uitbreidbaar vaardighedenframework                                           |
| Geheugen      | `src/lib/memory/`       | Persistente conversatiemonitor                                               |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine workspace), `electron/` (desktop app), `tests/`, `bin/` (CLI-toegangspunt).

---

## Verzoekpijplijn

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod-validatie → auth? → beleidscontrole → promptinjectiebescherming
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cachecontrole → snelheidslimiet → combo-routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → opnieuw proberen met backoff
    → responsvertaling → SSE-stream of JSON
    → Als Responses API: responsesTransformer.ts TransformStream
```

API-routes volgen een consistent patroon: `Route → CORS preflight → Zod body validatie → Optionele auth (extractApiKey/isValidApiKey) → Handhaving van API-sleutelbeleid → Handler delegatie (open-sse)`. Geen globale Next.js middleware — onderschepping is route-specifiek.

**Combo-routing** (`open-sse/services/combo.ts`): 14 strategieën (prioriteit, gewogen, vul-eerst, round-robin, P2C, willekeurig, minst-gebruikt, kosten-geoptimaliseerd, reset-bewust, strikt-willekeurig, auto, lkgp, context-geoptimaliseerd, context-relay). Elke target roept `handleSingleModel()` aan, dat `handleChatCore()` omhult met foutafhandeling per target en circuitbreaker-controles. Zie `docs/routing/AUTO-COMBO.md` voor de 9-factor Auto-Combo scoring en `docs/architecture/RESILIENCE_GUIDE.md` voor de 3 veerkrachtlagen.

---

## Veerkracht Runtime Status

OmniRoute heeft drie gerelateerde maar verschillende mechanismen voor tijdelijke fouten. Houd hun
bereik gescheiden bij het debuggen van routeringsgedrag. Zie het
[3-laags veerkracht diagram](./docs/diagrams/exported/resilience-3layers.svg)
(bron: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
voor een overzichtskaart.

### Provider Circuit Breaker

**Bereik**: hele provider, bijv. `glm`, `openai`, `anthropic`.

**Doel**: stop met het verzenden van verkeer naar een provider die herhaaldelijk faalt op het
upstream/service-niveau, zodat één ongezonde provider niet elke aanvraag vertraagt.

**Implementatie**:

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Chat gate/executiewiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Gedeelde wrappers: `open-sse/services/accountFallback.ts`
- Persistente status tabel: `domain_circuit_breakers`

**Statussen**:

- `CLOSED`: normaal verkeer is toegestaan.
- `OPEN`: provider is tijdelijk geblokkeerd; aanroepers krijgen een provider-circuit-open respons
  of combo-routing slaat over naar een andere target.
- `HALF_OPEN`: resettimeout is verstreken; sta een probe-aanroep toe. Succes sluit de
  breaker, falen opent deze opnieuw.

**Standaarden** (`open-sse/config/constants.ts`):

- OAuth-providers: drempel `3`, resettimeout `60s`.
- API-sleutelproviders: drempel `5`, resettimeout `30s`.
- Lokale providers: drempel `2`, resettimeout `15s`.

Alleen provider-niveau foutstatussen zouden de provider breaker moeten activeren:

```ts
(408, 500, 502, 503, 504);
```

Activeer de hele-provider breaker niet voor normale account/sleutel/model fouten zoals de meeste
`401`, `403`, of `429` gevallen. Die behoren meestal tot verbinding cooldown of model
lockout. Een generieke API-sleutelprovider `403` zou hersteld moeten kunnen worden, tenzij deze wordt geclassificeerd
als een terminal provider/account fout.

De breaker gebruikt luie herstel, geen achtergrondtimer. Wanneer `OPEN` verloopt, lezen zoals
`getStatus()`, `canExecute()`, en `getRetryAfterMs()` vernieuwen de status naar
`HALF_OPEN`, zodat dashboards en combo-kandidaatbouwers niet blijven uitsluiten van een
verlopen provider voor altijd.

### Verbinding Cooldown

**Bereik**: één providerverbinding/account/sleutel.

**Doel**: tijdelijk één slechte sleutel/account overslaan terwijl andere verbindingen voor
dezelfde provider doorgaan met het bedienen van aanvragen.

**Implementatie**:

- Schrijf/update pad: `src/sse/services/auth.ts::markAccountUnavailable()`
- Accountselectie/filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown-berekening: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Instellingen: `src/lib/resilience/settings.ts`

Belangrijke velden op providerverbindingen:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tijdens accountselectie wordt een verbinding overgeslagen terwijl:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns zijn ook lui: wanneer `rateLimitedUntil` in het verleden ligt, wordt de verbinding
weer in aanmerking genomen. Bij succesvol gebruik, `clearAccountError()` wist `testStatus`,
`rateLimitedUntil`, foutvelden en `backoffLevel`.

Standaardgedrag voor verbinding cooldown:

- OAuth basis cooldown: `5s`.
- API-sleutel basis cooldown: `3s`.
- API-sleutel `429` zou de voorkeur moeten geven aan upstream retry hints (`Retry-After`, resetheaders, of
  parseerbare resettekst) wanneer beschikbaar.
- Herhaalde herstelbare fouten gebruiken exponentiële backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

De anti-thundering-herd bescherming voorkomt dat gelijktijdige fouten op dezelfde verbinding
herhaaldelijk de cooldown verlengen of `backoffLevel` dubbel verhogen.

Terminal statussen zijn geen cooldowns. `banned`, `expired`, en `credits_exhausted` zijn
bedoeld om onbeschikbaar te blijven totdat inloggegevens/instellingen veranderen of een operator
ze reset. Overschrijf terminal statussen niet met tijdelijke cooldownstatus.

### Model Lockout

**Bereik**: provider + verbinding + model.

**Doel**: voorkom dat een hele verbinding wordt uitgeschakeld wanneer slechts één model niet beschikbaar of
quota-beperkt is voor die verbinding.

Voorbeelden:

- Per-model quota providers die `429` retourneren.
- Lokale providers die `404` retourneren voor één ontbrekend model.
- Provider-specifieke modus/model toestemming fouten zoals geselecteerde Grok-modi.

Model lockout bevindt zich in `open-sse/services/accountFallback.ts` en laat dezelfde
verbinding andere modellen blijven bedienen.

### Debugging Richtlijnen

- Als alle sleutels voor een provider worden overgeslagen, inspecteer zowel de provider breaker status als elke
  verbinding's `rateLimitedUntil`/`testStatus`.
- Als een provider permanent uitgesloten lijkt na het resetvenster, controleer of de code
  ruwe `state` leest in plaats van `getStatus()`/`canExecute()`.
- Als één provider sleutel faalt maar anderen zouden moeten werken, geef de voorkeur aan verbinding cooldown boven
  provider breaker.
- Als slechts één model faalt, geef de voorkeur aan model lockout boven verbinding cooldown.
- Als een status zichzelf zou moeten herstellen, moet deze een toekomstige timestamp/resettimeout hebben en een
  leespad dat verlopen status vernieuwt. Permanente statussen vereisen handmatige wijziging van inloggegevens
  of configuratie.

## Belangrijke Conventies

### Code Stijl

- **2 spaties**, puntkomma's, dubbele aanhalingstekens, 100 tekens breed, es5 trailing commas (afgedwongen door lint-staged via Prettier)
- **Imports**: extern → intern (`@/`, `@omniroute/open-sse`) → relatief
- **Naming**: bestanden=camelCase/kebab, componenten=PascalCase, constanten=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = fout overal; `no-explicit-any` = waarschuwing in `open-sse/` en `tests/`
- **TypeScript**: `strict: false`, doel ES2022, module esnext, resolutie bundelaar. Geef de voorkeur aan expliciete types.

### Database

- **Ga altijd** via `src/lib/db/` domeinmodules — **schrijf nooit** ruwe SQL in routes of handlers
- **Voeg nooit** logica toe aan `src/lib/localDb.ts` (alleen re-exportlaag)
- **Barrel-import nooit** van `localDb.ts` — importeer in plaats daarvan specifieke `db/` modules
- DB singleton: `getDbInstance()` van `src/lib/db/core.ts` (WAL journaling)
- Migraties: `src/lib/db/migrations/` — versiegebonden SQL-bestanden, idempotent, uitgevoerd in transacties

### Foutafhandeling

- try/catch met specifieke fouttypes, log met pino context
- Slurp nooit fouten in SSE-stromen — gebruik abort-signalen voor opruiming
- Geef juiste HTTP-statuscodes terug (4xx/5xx)

### Beveiliging

- **Gebruik nooit** `eval()`, `new Function()`, of impliciete eval
- Valideer alle invoer met Zod-schema's
- Versleutel inloggegevens in rust (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — houd sanitization, Zod-schema's en eenheidstests in lijn bij het bewerken
- **Openbare upstream inloggegevens** (Gemini/Antigravity/Windsurf-stijl OAuth client_id/secret + Firebase Web-sleutels geëxtraheerd uit openbare CLI's): **MOETEN** worden ingebed via `resolvePublicCred()` van `open-sse/utils/publicCreds.ts` — **nooit** als string literals. Zie `docs/security/PUBLIC_CREDS.md` voor het verplichte patroon.
- **Foutreacties** (HTTP / SSE / executor / MCP handler): **MOETEN** door `buildErrorBody()` of `sanitizeErrorMessage()` van `open-sse/utils/error.ts` worden geleid — **nooit** ruwe `err.stack` of `err.message` in een reactiebody plaatsen. Zie `docs/security/ERROR_SANITIZATION.md`.
- **Shell-opdrachten opgebouwd uit variabelen**: bij het aanroepen van `exec()`/`spawn()` met een script dat runtime-waarden nodig heeft, geef ze door via de `env` optie (automatisch shell-escaped) — **nooit** onbetrouwbare/externe paden in de scriptbody interpoleren. Referentie: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Secure-by-default bibliotheken** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): geef de voorkeur aan Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink boven aangepaste implementaties wanneer je nieuwe beveiligingsgevoelige oppervlakken toevoegt.

---

## Veelvoorkomende Wijzigingsscenario's

### Een Nieuwe Provider Toevoegen

1. Registreer in `src/shared/constants/providers.ts` (Zod-gevalideerd bij laden)
2. Voeg executor toe in `open-sse/executors/` als aangepaste logica nodig is (verleng `BaseExecutor`)
3. Voeg vertaler toe in `open-sse/translator/` als niet-OpenAI formaat
4. Voeg OAuth-configuratie toe in `src/lib/oauth/constants/oauth.ts` als op OAuth gebaseerd — als de upstream CLI een openbare client_id/secret levert, embed dan via `resolvePublicCred()` (zie `docs/security/PUBLIC_CREDS.md`), **nooit** als een literal
5. Registreer modellen in `open-sse/config/providerRegistry.ts`
6. Schrijf tests in `tests/unit/` (inclusief de publicCreds shape assertion als je een nieuwe ingebedde standaard hebt toegevoegd)

### Een Nieuwe API Route Toevoegen

1. Maak een directory onder `src/app/api/v1/your-route/`
2. Maak `route.ts` met `GET`/`POST` handlers
3. Volg het patroon: CORS → Zod body validatie → optionele auth → handler delegatie
4. Handler gaat in `open-sse/handlers/` (importeer van daar, niet inline)
5. Foutreacties gebruiken `buildErrorBody()` / `errorResponse()` van `open-sse/utils/error.ts` (automatisch gesanitiseerd — plaats nooit `err.stack` of `err.message` ruw in de body). Zie `docs/security/ERROR_SANITIZATION.md`.
6. Voeg tests toe — inclusief ten minste één assertion dat foutreacties geen stack traces lekken (`!body.error.message.includes("at /")`)

### Een Nieuwe DB Module Toevoegen

1. Maak `src/lib/db/yourModule.ts` — importeer `getDbInstance` van `./core.ts`
2. Exporteer CRUD-functies voor je domeintabel(len)
3. Voeg migratie toe in `src/lib/db/migrations/` als nieuwe tabellen nodig zijn
4. Re-exporteer van `src/lib/localDb.ts` (voeg alleen toe aan de re-exportlijst)
5. Schrijf tests

### Een Nieuwe MCP Tool Toevoegen

1. Voeg tooldefinitie toe in `open-sse/mcp-server/tools/` met Zod invoerschema + asynchrone handler
2. Registreer in de toolset (verbonden door `createMcpServer()`)
3. Wijs toe aan de juiste scope(s)
4. Schrijf tests (toolaanroep gelogd in `mcp_audit` tabel)

### Een Nieuwe A2A Skill Toevoegen

1. Maak skill in `src/lib/a2a/skills/` (5 bestaan al: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Skill ontvangt taakcontext (berichten, metadata) → retourneert gestructureerd resultaat
3. Registreer in `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`
4. Expose in `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Schrijf tests in `tests/unit/`
6. Documenteer in `docs/frameworks/A2A-SERVER.md` skill tabel

### Een Nieuwe Cloud Agent Toevoegen

1. Maak agentklasse in `src/lib/cloudAgent/agents/` die `CloudAgentBase` uitbreidt (3 bestaan al: codex-cloud, devin, jules)
2. Implementeer `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registreer in `src/lib/cloudAgent/registry.ts`
4. Voeg OAuth/inloggegevensverwerking toe indien nodig (`src/lib/oauth/providers/`)
5. Tests + documenteer in `docs/frameworks/CLOUD_AGENT.md`

### Een Nieuwe Guardrail / Eval / Skill / Webhook evenement Toevoegen

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook evenement: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Referentiedocumentatie

Voor elke niet-triviale wijziging, lees eerst de bijbehorende diepgaande analyse:

| Gebied                                           | Document                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| Repo-navigatie                                   | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architectuur                                     | `docs/architecture/ARCHITECTURE.md`                               |
| Engineeringreferentie                            | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-factor scoring, 14 strategieën)    | `docs/routing/AUTO-COMBO.md`                                      |
| Veerkracht (3 mechanismen)                       | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Redeneringsherhaling                             | `docs/routing/REASONING_REPLAY.md`                                |
| Vaardighedenkader                                | `docs/frameworks/SKILLS.md`                                       |
| Geheugensysteem (FTS5 + Qdrant)                  | `docs/frameworks/MEMORY.md`                                       |
| Cloudagenten                                     | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Beveiligingsmaatregelen (PII / injectie / visie) | `docs/security/GUARDRAILS.md`                                     |
| Publieke upstream referenties (Gemini/etc.)      | `docs/security/PUBLIC_CREDS.md`                                   |
| Foutmelding sanering                             | `docs/security/ERROR_SANITIZATION.md`                             |
| Evaluaties                                       | `docs/frameworks/EVALS.md`                                        |
| Naleving / audit                                 | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                         | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorisatiepipeline                              | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / vingerafdruk)                     | `docs/security/STEALTH_GUIDE.md`                                  |
| Agentprotocollen (A2A / ACP / Cloud)             | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP-server                                       | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A-server                                       | `docs/frameworks/A2A-SERVER.md`                                   |
| API-referentie + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Leveranciercatalogus (automatisch gegenereerd)   | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Releaseflow                                      | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testen

| Wat                     | Opdracht                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| Eenheidstests           | `npm run test:unit`                                                         |
| Enkel bestand           | `node --import tsx/esm --test tests/unit/file.test.ts`                      |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                       |
| E2E (Playwright)        | `npm run test:e2e`                                                          |
| Protocol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                                |
| Ecosysteem              | `npm run test:ecosystem`                                                    |
| Dekking poort           | `npm run test:coverage` (75/75/75/70 — statements/lines/functions/branches) |
| Dekking rapport         | `npm run coverage:report`                                                   |

**PR-regel**: Als je productiecodes in `src/`, `open-sse/`, `electron/`, of `bin/` wijzigt, moet je tests in dezelfde PR opnemen of bijwerken.

**Voorkeur testlaag**: eenheid eerst → integratie (multi-module of DB-status) → e2e (UI/workflow alleen). Encodeer bugreproducties als geautomatiseerde tests vóór of samen met de oplossing.

**Copilot dekking beleid**: Wanneer een PR productiecodes wijzigt en de dekking onder 75% (statements/lines/functions) of 70% (branches) ligt, rapporteer dan niet alleen — voeg tests toe of werk ze bij, voer de dekking poort opnieuw uit, en vraag vervolgens om bevestiging. Neem uitgevoerde opdrachten, gewijzigde testbestanden en het uiteindelijke dekkingsresultaat op in het PR-rapport.

---

## Git Workflow

```bash
# Nooit rechtstreeks naar main committen
git checkout -b feat/your-feature
git commit -m "feat: beschrijf je wijziging"
git push -u origin feat/your-feature
```

**Branch-prefixen**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commitformaat** (Conventional Commits): `feat(db): voeg circuit breaker toe` — scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Omgeving

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, resolution bundler
- **Padaliassen**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Standaardpoort**: 20128 (API + dashboard op dezelfde poort)
- **Gegevensdirectory**: `DATA_DIR` omgevingsvariabele, standaard `~/.omniroute/`
- **Belangrijke omgevingsvariabelen**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` en genereer vervolgens `JWT_SECRET` (`openssl rand -base64 48`) en `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Strikte Regels

1. Nooit geheimen of inloggegevens committen
2. Nooit logica toevoegen aan `localDb.ts`
3. Nooit `eval()` / `new Function()` / impliciete eval gebruiken
4. Nooit rechtstreeks naar `main` committen
5. Nooit ruwe SQL in routes schrijven — gebruik `src/lib/db/` modules
6. Nooit stilletjes fouten in SSE-stromen negeren
7. Altijd invoer valideren met Zod-schema's
8. Altijd tests opnemen bij het wijzigen van productiecodes
9. Dekking moet ≥75% (statements, lines, functions) / ≥70% (branches) blijven. Huidige meting: ~82%.
10. Nooit Husky hooks omzeilen (`--no-verify`, `--no-gpg-sign`) zonder expliciete goedkeuring van de operator.
11. Nooit openbare upstream OAuth client_id/secret of Firebase Web-sleutels als stringliteral opnemen — altijd via `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Zie `docs/security/PUBLIC_CREDS.md`.
12. Nooit ruwe `err.stack` / `err.message` retourneren in HTTP / SSE / executor-responses — altijd doorsturen via `buildErrorBody()` of `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Zie `docs/security/ERROR_SANITIZATION.md`.
13. Nooit externe paden of runtime-waarden in shell-scripts die aan `exec()`/`spawn()` worden doorgegeven, string-interpoleren — geef in plaats daarvan door via de `env` optie. Referentie: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nooit een CodeQL / Secret-Scanning waarschuwing negeren zonder (a) eerst de patroon-documentatie hierboven te controleren om te zien of de helper van toepassing is, en (b) de technische rechtvaardiging in de afwijscommentaar vast te leggen. Precedent: `js/stack-trace-exposure` opgegooid op callsites die al via `sanitizeErrorMessage()` gaan, is een bekende CodeQL-beperking (aangepaste sanitizers niet herkend) — afwijzen als `false positive` met verwijzing naar `docs/security/ERROR_SANITIZATION.md`.
15. Nooit routes blootstellen die kindprocessen opstarten (`/api/mcp/`, `/api/cli-tools/runtime/`) zonder `isLocalOnlyPath()` classificatie in `src/server/authz/routeGuard.ts`. Loopback-afdwinging gebeurt onvoorwaardelijk vóór elke auth-controle — gelekte JWT via tunnel kan geen procesopstarten activeren. Zie `docs/security/ROUTE_GUARD_TIERS.md`.
16. Neem nooit `Co-Authored-By`-trailers op die een AI-assistent, LLM of automatiseringsaccount crediteren (bijv. namen met "Claude", "GPT", "Copilot", "Bot"; e-mails op `anthropic.com` / `openai.com` / `noreply.github.com`-adressen die eigendom zijn van bots). Dergelijke trailers leiden commit-attributie naar het botaccount op GitHub, waardoor de werkelijke auteur (`diegosouzapw`) in de PR-geschiedenis verborgen blijft. Menselijke medewerkers — inclusief upstream PR-auteurs en issue-rapporteurs die naar OmniRoute worden geport — MOGEN en MOETEN worden gecrediteerd met standaard `Co-authored-by: Name <email>`-trailers; de upstream-port workflows (`/port-upstream-features`, `/port-upstream-issues`) zijn hiervan afhankelijk.
