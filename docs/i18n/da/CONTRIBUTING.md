# Contributing to OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Udviklingsopsætning

### Forudsætninger

- **Node.js** `>=22.22.3 <23` eller `>=24.0.0 <27` (anbefalet: 24 LTS)
- **npm** 10+

> **Brugere af npm v11+ (Node 24+):** Efter `npm install` skal du kontrollere, at de oprindelige moduler blev installeret:
> `node -e "require('better-sqlite3')"`. Hvis kommandoen mislykkes med `MODULE_NOT_FOUND`,
> skal du køre `npm approve-scripts better-sqlite3 && npm install`. Se
> [Fejlfinding](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloning og installation

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Miljøvariabler

```bash
# Opret din .env ud fra skabelonen
cp .env.example .env

# Generér de nødvendige hemmeligheder
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Vigtige variabler til udvikling:

| Variabel               | Standardværdi for udvikling | Beskrivelse                    |
| ---------------------- | --------------------------- | ------------------------------ |
| `PORT`                 | `20128`                     | Serverport                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Basis-URL til frontend         |
| `JWT_SECRET`           | (generér ovenfor)           | Hemmelighed til JWT-signering  |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | Adgangskode til første login   |
| `APP_LOG_LEVEL`        | `info`                      | Detaljeringsniveau for logning |

### Indstillinger for kontrolpanelet

Kontrolpanelet indeholder UI-indstillinger for funktioner, som også kan konfigureres via miljøvariabler:

| Placering af indstilling  | Indstilling            | Beskrivelse                                     |
| ------------------------- | ---------------------- | ----------------------------------------------- |
| Indstillinger → Avanceret | Fejlfindingstilstand   | Aktivér logning af fejlfindingsanmodninger (UI) |
| Indstillinger → Generelt  | Sidepanelets synlighed | Vis/skjul sektioner i sidepanelet               |

Disse indstillinger gemmes i databasen og bevares på tværs af genstarter. Når de er angivet, tilsidesætter de standardværdierne fra miljøvariablerne.

### Lokal kørsel

```bash
# Udviklingstilstand (automatisk genindlæsning)
npm run dev

# Produktionsbuild
npm run build    # next build → .build/next/ og derefter assembleStandalone → dist/
npm run start

# Hurtig kompilering af kun backend/API til bidragyderændringer
npm run build:contributor

# Udgivelsesbuild (ren genopbygning + HEAD-kontrolmarkør — påkrævet til udrulning)
npm run build:release   # rm -rf .build dist && build + skriver dist/BUILD_SHA

# Almindelig portkonfiguration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Bidragyderbuildet udfører kun validering ved kompilering: Det samler ikke den selvstændige
distribution eller bygger valgfrie oprindelige pakkeaktiver. Brug det almindelige produktionsbuild,
når du har brug for at validere den distributionsklare pakke.

### Struktur for buildoutput

| Mappe     | Indhold                                                                                | Versionsstyret |
| --------- | -------------------------------------------------------------------------------------- | -------------- |
| `src/`    | Applikationens kildekode (TypeScript / TSX)                                            | Ja             |
| `.build/` | Mellemresultater — output fra `next build` (ignoreret af Git, `distDir = .build/next`) | Nej            |
| `dist/`   | Distributionsklar pakke — samlet af `assembleStandalone` (ignoreret af Git)            | Nej            |

Buildprocessen gennemføres i én arbejdsgang:

```
npm run build
  └─ next build → .build/next/standalone  (output fra Next.js)
  └─ assembleStandalone()                 (kopierer standalone + static + public + oprindelige aktiver)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` rydder desuden først begge mapper og skriver
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) som en kontrolmarkør for udrulningsintegritet.

`npm run build:contributor` bruger buildprofilen, der kun omfatter backend. Den erstatter midlertidigt
kontrolpanelets UI-filer med stubbe under buildprocessen, beholder API-rutehåndteringerne og gendanner de oprindelige filer
efter buildet. Brug `npm run build` til ændringer, der påvirker kontrolpanelets UI, eller til fuld
validering af en udgivelse. Bidragyderprofilen erstatter ikke udgivelsesbuildet.

> **Bemærkning om VPS-udrulning:** Den eksterne image-mappe `/usr/lib/node_modules/omniroute/app/`
> er uændret. Udrulningsfunktionerne synkroniserer indholdet af `dist/` til den via rsync.
> Kun stien til buildoutput i repositoryet er flyttet (`app/` → `dist/`).

Standard-URL'er:

- **Kontrolpanel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-workflow

> ⚠️ **Commit ALDRIG direkte til `main`.** Brug altid feature-branches.
>
> **PR-base:** Brug den aktive `release/vX.Y.Z`-branch som mål (ikke `main`). Se
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) for modellen med
> én release pr. branch og tagging ved udgivelse.

```bash
# Opret en branch fra spidsen af den aktive release (eksempel: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... foretag ændringer ...
git commit -m "feat: beskriv din ændring"
git push -u origin feat/your-feature-name
# Åbn en Pull Request med base = release/v3.8.49
```

### Navngivning af branches

| Præfiks     | Formål                          |
| ----------- | ------------------------------- |
| `feat/`     | Nye funktioner                  |
| `fix/`      | Fejlrettelser                   |
| `refactor/` | Omstrukturering af kode         |
| `docs/`     | Dokumentationsændringer         |
| `test/`     | Tilføjelser/rettelser til tests |
| `chore/`    | Værktøjer, CI, afhængigheder    |

### Commitbeskeder

Følg [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tilføj circuit breaker til provider-kald
fix: løs edge case i validering af JWT-hemmelighed
docs: opdater SECURITY.md med beskyttelse af PII
test: tilføj enhedstests for observerbarhed
refactor(db): konsolider tabeller til hastighedsbegrænsning
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Kørsel af tests

```bash
# Alle tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Enkelt testfil (Node.js' indbyggede testkørsel — de fleste tests bruger denne)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Kun de enhedstests, der påvirkes af din ændring (samme TIA-vælger som CI-kontrollen, #8084)
npm run test:scoped            # ændringer i den seneste commit (eller arbejdstræet)
npm run test:scoped:staged     # kun klargjorte ændringer — fungerer godt med en pre-commit-kørsel
npm run test:scoped:full       # genopbyg først importgrafkortet (efter tilføjelse/flytning af filer)
# Afslutningskode 1 + "run the full suite" betyder, at en central fil (tsconfig, package.json, …) eller en
# ikke-kortlagt kildefil er ændret — vælgeren fejler sikkert og springer aldrig over uden at oplyse det.

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# E2E-tests (kræver Playwright)
npm run test:e2e

# E2E for protokolklienter (MCP-transporter, A2A)
npm run test:protocols:e2e

# Kompatibilitetstests for økosystemet
npm run test:ecosystem

# Dækningskrav: 60 % af statements/linjer/funktioner/grene
npm run test:coverage
npm run coverage:report

# Kontrol af lint + formatering
npm run lint
npm run check

# Kontrolleret smoke-test af kombinationer mod faktiske upstream-tjenester (kræver VPS-adgang + rigtige udbyderkreditter)
# Rammer RIGTIGE udbydere — koster lidt. Kører ALDRIG i CI. Springes problemfrit over uden kontrollen.
# Kræver: adgang via ssh root@192.168.0.15 (indlæser et skrivebeskyttet DB-snapshot fra VPS'en).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Fase 3-smoke-test direkte mod VPS — almindelige Node ESM-scripts, der rammer live-serveren på .15 direkte.
# Kræver: adgang via ssh root@192.168.0.15 (kombinationer oprettes/nedlægges via SSH sqlite).
# Rammer RIGTIGE udbydere (lille omkostning). Opretter/sletter kun kombinationer af typen __live_test__*. Kører ALDRIG i CI.
# REQUIRE_API_KEY=false på .15, så der kræves ingen API-nøgle, men COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY respekteres, hvis de er angivet.
npm run test:combo:live:vps              # 7 HTTP-scenarier (prioritet/round-robin/vægtet/omkostning/fusion/auto + tilstand)
npm run test:combo:live:vps:failover     # tilføjer et reelt failover-scenarie på tværs af udbydere (8 i alt)
```

Bemærkninger om dækning:

- `npm run test:coverage` måler kildedækningen for den primære enhedstestsuite, udelukker `tests/**` og inkluderer `open-sse/**`
- Pull requests skal opretholde dækningskravet på **60 %+** for statements/linjer/funktioner/grene
- Hvis en PR ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal den tilføje eller opdatere automatiserede tests i samme PR
- `npm run coverage:report` udskriver den detaljerede rapport fil for fil fra den seneste dækningskørsel
- `npm run test:coverage:legacy` bevarer det ældre målepunkt til historisk sammenligning
- Se `docs/ops/COVERAGE_PLAN.md` for den faseopdelte køreplan til forbedring af dækningen

### Krav til pull requests

Før du åbner en PR, skal du bruge
[den anbefalede bidragsproces](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) til at køre den fokuserede løkke for
det, du har ændret. Den fulde enhedstestsuite (4 CI-shards), Vitest, dækningskravet på **60 %+** og
produktions-buildet er CI's ansvar — lokal kørsel af dem giver ingen oplysninger, som PR-
kontrollerne ikke allerede giver dig, og på mindre maskiner kan det overbelaste værten (#8084):

- Kør de testfiler, der dækker din ændring: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Kør `npm run lint`
- Medtag eller opdater automatiserede tests i samme PR, når produktionskode ændres
- Medtag de ændrede eller tilføjede testfiler i PR-beskrivelsen, når produktionskode er ændret
- Kontrollér SonarQube-resultatet på PR'en, når projektets hemmeligheder er konfigureret i CI

Aktuel teststatus: **122 enhedstestfiler**, der dækker:

- Udbyderoversættere og formatkonvertering
- Hastighedsbegrænsning, circuit breaker og robusthed
- Semantisk cache, idempotens og statussporing
- Databaseoperationer og -skema (21 DB-moduler)
- OAuth-flows og godkendelse
- Validering af API-endpoints (Zod v4)
- MCP-serverværktøjer og håndhævelse af scopes
- Memory- og Skills-systemer

---

## Kodestil

- **ESLint** — Kør `npm run lint`, før du committer
- **Prettier** — Automatisk formateret via `lint-staged` ved commit (2 mellemrum, semikoloner, dobbelte anførselstegn, linjebredde på 100 tegn, afsluttende kommaer i es5-stil)
- **TypeScript** — Al kode i `src/` bruger `.ts`/`.tsx`; `open-sse/` bruger `.ts`/`.js`; dokumentér med TSDoc (`@param`, `@returns`, `@throws`)
- **Ingen `eval()`** — ESLint håndhæver `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validering** — Brug Zod v4-skemaer til al validering af API-input
- **Navngivning**: Filer = camelCase/kebab-case, komponenter = PascalCase, konstanter = UPPER_SNAKE

### Fejlhåndtering / tomme catch-blokke

Efterlad aldrig en `catch` uden forklaring. Klassificér den i én af to kategorier (dette
omsætter den faste regel "ignorer aldrig fejl i SSE-streams uden videre" til praksis):

- **Tilsigtet (vores egen best-effort-oprydning/-telemetri)** — en fejl her er forventet og
  harmløs; tilføj en begrundende kommentar på én linje, uden logning (logning ved hver anmodning
  er den støj, som denne konvention undgår).

  ```ts
  } catch {} // lukning af en controller, der allerede er lukket efter klientens afbrydelse, er forventet
  ```

- **Bør logges (ekstern kode/kode leveret af kalderen, eller når ignorering ændrer kontrolflowet)** — behold
  catch-blokken (lad den aldrig afbryde streamen), men udsend en kontekstuel `console.debug`/`warn`, så
  fejlen kan opdages.

  ```ts
  } catch (e) {
    console.debug("[STREAM] fejl i onFailure-callback:", e);
  }
  ```

Se `open-sse/utils/stream.ts` og `open-sse/utils/streamHandler.ts` for anvendte eksempler.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Tilføjelse af en ny udbyder

### Trin 1: Registrer udbyderkonstanter

Tilføj dem i `src/shared/constants/providers.ts` — Zod-valideres ved modulindlæsning.

### Trin 2: Tilføj en executor (hvis brugerdefineret logik er nødvendig)

Opret en executor i `open-sse/executors/your-provider.ts`, som udvider basisexecutoren.

### Trin 3: Tilføj en translator (hvis formatet ikke er OpenAI-format)

Opret translators til anmodninger/svar i `open-sse/translator/`.

### Trin 4: Tilføj OAuth-konfiguration (hvis OAuth-baseret)

Tilføj OAuth-legitimationsoplysninger i `src/lib/oauth/constants/oauth.ts` og en service i `src/lib/oauth/services/`.

Hvis upstream-udbyderen distribuerer en offentlig OAuth client_id/secret eller Firebase Web API-nøgle i sin offentlige CLI-/browserpakke, må du **ikke** indlejre den som en strengliteral. Brug `resolvePublicCred()` fra `open-sse/utils/publicCreds.ts`, og tilføj en maskeret bytepost i `EMBEDDED_DEFAULTS`. Den fulde obligatoriske arbejdsgang er dokumenteret i [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

I handlers/executors skal fejlmeddelelser, der når klienten, behandles via `buildErrorBody()` / `sanitizeErrorMessage()` fra `open-sse/utils/error.ts` — anbring aldrig rå `err.stack` eller `err.message` i en Response-body. Se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Trin 5: Registrer modeller

Tilføj modeldefinitioner i `open-sse/config/providerRegistry.ts`.

### Trin 6: Tilføj tests

Skriv enhedstests i `tests/unit/`, som som minimum dækker:

- Registrering af udbyder
- Oversættelse af anmodninger/svar
- Fejlhåndtering

---

## Tjekliste for pull request

- [ ] Tests består (`npm test`)
- [ ] Linting består (`npm run lint`)
- [ ] Build lykkes (`npm run build`)
- [ ] TypeScript-typer er tilføjet for nye offentlige funktioner og interfaces
- [ ] Ingen hardcodede hemmeligheder eller reserveværdier
- [ ] Offentlige upstream-legitimationsoplysninger indlejres via `resolvePublicCred()` (se [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), aldrig som litteraler
- [ ] Fejlsvar føres gennem `buildErrorBody()` / `sanitizeErrorMessage()` — ingen rå stack traces i svarenes bodies (se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell-kommandoer (`exec` / `spawn`) videregiver runtime-værdier via `env`, ikke via strenginterpolation
- [ ] Alle input valideres med Zod-skemaer
- [ ] Changelog-**fragment** tilføjet under `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` for brugerrettede ændringer (se [`changelog.d/README.md`](./changelog.d/README.md)) — rediger **ikke** `CHANGELOG.md` direkte; fragmenter samles ved udgivelsestidspunktet og skaber aldrig konflikter mellem pull requests
- [ ] Dokumentationen er opdateret (hvis relevant)
- [ ] Ingen nye CodeQL- / Secret-Scanning-advarsler er åbnet, eller hver enkelt er afvist med en teknisk begrundelse, der henviser til det relevante dokument under `docs/security/`
- [ ] Ruter, der starter underprocesser (`/api/mcp/`, `/api/cli-tools/runtime/`), er klassificeret som `isLocalOnlyPath()` i `src/server/authz/routeGuard.ts` — se [ufravigelig regel nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Ingen `Co-Authored-By`-trailere i commitbeskeder — commits må udelukkende fremstå under repository-ejerens Git-identitet (ufravigelig regel nr. 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Få hjælp

- **Arkitektur**: Se [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-reference**: Se [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sikkerhedsdokumentation**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Driftsdokumentation**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR'er**: Se `docs/adr/` for arkitekturbeslutningsregistreringer
