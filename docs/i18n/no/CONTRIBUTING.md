# Contributing to OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Utviklingsoppsett

### Forutsetninger

- **Node.js** `>=22.22.3 <23`, eller `>=24.0.0 <27` (anbefalt: 24 LTS)
- **npm** 10+

> **Brukere av npm v11+ (Node 24+):** Etter `npm install`, kontroller at native moduler ble installert:
> `node -e "require('better-sqlite3')"`. Hvis kommandoen mislykkes med `MODULE_NOT_FOUND`,
> kjør `npm approve-scripts better-sqlite3 && npm install`. Se
> [Feilsøking](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloning og installasjon

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Miljøvariabler

```bash
# Opprett .env fra malen
cp .env.example .env

# Generer nødvendige hemmeligheter
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Viktige variabler for utvikling:

| Variabel               | Standardverdi for utvikling | Beskrivelse                   |
| ---------------------- | --------------------------- | ----------------------------- |
| `PORT`                 | `20128`                     | Serverport                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Basis-URL for grensesnittet   |
| `JWT_SECRET`           | (generer ovenfor)           | Hemmelighet for JWT-signering |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | Passord ved første innlogging |
| `APP_LOG_LEVEL`        | `info`                      | Detaljnivå for logging        |

### Innstillinger for kontrollpanelet

Kontrollpanelet har brytere for funksjoner som også kan konfigureres via miljøvariabler:

| Plassering av innstilling | Bryter                  | Beskrivelse                                     |
| ------------------------- | ----------------------- | ----------------------------------------------- |
| Innstillinger → Avansert  | Feilsøkingsmodus        | Aktiver logger for feilsøkingsforespørsler (UI) |
| Innstillinger → Generelt  | Synlighet for sidepanel | Vis/skjul deler av sidepanelet                  |

Disse innstillingene lagres i databasen og beholdes etter omstarter. Når de er angitt, overstyrer de standardverdiene fra miljøvariablene.

### Lokal kjøring

```bash
# Utviklingsmodus (automatisk innlasting)
npm run dev

# Produksjonsbygg
npm run build    # next build → .build/next/ og deretter assembleStandalone → dist/
npm run start

# Rask kompilering kun av bakenden/API-et for bidragsyterendringer
npm run build:contributor

# Utgivelsesbygg (ren ombygging + HEAD-sentinel — kreves for utrulling)
npm run build:release   # rm -rf .build dist && build + skriver dist/BUILD_SHA

# Vanlig portkonfigurasjon
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Bidragsyterbygget utfører kun kompileringsvalidering: Det setter ikke sammen den frittstående
distribusjonen eller bygger valgfrie native pakkeressurser. Bruk det vanlige produksjonsbygget når
du må validere den distribuerbare pakken.

### Utformingen av byggresultatet

| Mappe     | Innhold                                                                            | Sporet |
| --------- | ---------------------------------------------------------------------------------- | ------ |
| `src/`    | Applikasjonens kildekode (TypeScript / TSX)                                        | Ja     |
| `.build/` | Mellomresultater — resultat fra `next build` (gitignored, `distDir = .build/next`) | Nei    |
| `dist/`   | Distribuerbar pakke — satt sammen av `assembleStandalone` (gitignored)             | Nei    |

Byggeprosessen består av én gjennomkjøring:

```
npm run build
  └─ next build → .build/next/standalone  (resultat fra Next.js)
  └─ assembleStandalone()                 (kopierer standalone + static + public + native ressurser)
       └─ resultat: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` rydder i tillegg først begge mappene og skriver
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) som en integritetssentinel for utrulling.

`npm run build:contributor` bruker byggeprofilen kun for bakenden. Den erstatter midlertidig
UI-filene til kontrollpanelet med plassholdere under byggingen, beholder API-rutebehandlerne og gjenoppretter originalfilene
etter byggingen. Bruk `npm run build` for endringer som påvirker kontrollpanelets brukergrensesnitt, eller for fullstendig
utgivelsesvalidering. Bidragsyterprofilen er ikke en erstatning for utgivelsesbygget.

> **Merknad om VPS-utrulling:** Den eksterne image-mappen `/usr/lib/node_modules/omniroute/app/`
> er uendret. Utrullingsverktøyene synkroniserer innholdet i `dist/` til den med rsync.
> Bare banen til byggresultatet i repositoriet er flyttet (`app/` → `dist/`).

Standard-URL-er:

- **Kontrollpanel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-arbeidsflyt

> ⚠️ **Commit ALDRI direkte til `main`.** Bruk alltid funksjonsgrener.
>
> **PR-base:** Bruk den aktive `release/vX.Y.Z`-grenen som mål (ikke `main`). Se
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) for modellen med
> én gren per utgivelse + tagging ved lansering.

```bash
# Opprett en gren fra spissen av den aktive utgivelsesgrenen (eksempel: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... gjør endringer ...
git commit -m "feat: beskriv endringen din"
git push -u origin feat/your-feature-name
# Åpne en pull-forespørsel med base = release/v3.8.49
```

### Navngivning av grener

| Prefiks     | Formål                     |
| ----------- | -------------------------- |
| `feat/`     | Nye funksjoner             |
| `fix/`      | Feilrettinger              |
| `refactor/` | Omstrukturering av kode    |
| `docs/`     | Dokumentasjonsendringer    |
| `test/`     | Nye/rettede tester         |
| `chore/`    | Verktøy, CI, avhengigheter |

### Commit-meldinger

Følg [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: legg til effektbryter for leverandørkall
fix: løs kanttilfelle ved validering av JWT-hemmelighet
docs: oppdater SECURITY.md med beskyttelse av PII
test: legg til enhetstester for observerbarhet
refactor(db): slå sammen tabeller for hastighetsbegrensning
```

Omfang (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Kjøre tester

```bash
# Alle tester (enhet + vitest + økosystem + e2e)
npm run test:all

# Én enkelt testfil (Node.js' innebygde testkjører – de fleste testene bruker denne)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Bare enhetstestene som påvirkes av endringen din (samme TIA-velger som CI-porten, #8084)
npm run test:scoped            # endringer i siste commit (eller arbeidstreet)
npm run test:scoped:staged     # bare staged-endringer – passer godt med en pre-commit-kjøring
npm run test:scoped:full       # bygg kartet over importgrafen på nytt først (etter at filer er lagt til/flyttet)
# Exit 1 + «run the full suite» betyr at en sentral fil (tsconfig, package.json, …) eller en
# ikke-kartlagt kilde ble endret – velgeren feiler på en sikker måte og hopper aldri over noe i stillhet.

# Vitest (MCP-server, autoCombo, hurtigbuffer)
npm run test:vitest

# E2E-tester (krever Playwright)
npm run test:e2e

# E2E for protokollklienter (MCP-transporter, A2A)
npm run test:protocols:e2e

# Kompatibilitetstester for økosystemet
npm run test:ecosystem

# Dekningsport: 60 % setninger/linjer/funksjoner/grener
npm run test:coverage
npm run coverage:report

# Linting + formateringskontroll
npm run lint
npm run check

# Begrenset smoke-test med reelle oppstrømstjenester i kombinasjon (krever VPS-tilgang + kreditter hos reelle leverandører)
# Treffer REELLE leverandører – koster litt. Kjøres ALDRI i CI. Hoppes over uten feil når porten mangler.
# Krever: tilgang med ssh root@192.168.0.15 (henter et skrivebeskyttet DB-øyeblikksbilde fra VPS-en).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Fase 3-smoke-test mot aktiv VPS – vanlige Node ESM-skript som treffer den aktive .15-serveren direkte.
# Krever: tilgang med ssh root@192.168.0.15 (kombinasjoner opprettes/fjernes via SSH sqlite).
# Treffer REELLE leverandører (liten kostnad). Oppretter/sletter bare __live_test__*-kombinasjoner. Kjøres ALDRI i CI.
# REQUIRE_API_KEY=false på .15, så ingen API-nøkkel er nødvendig, men COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY respekteres hvis de er angitt.
npm run test:combo:live:vps              # 7 HTTP-scenarioer (prioritet/round-robin/vektet/kostnad/fusion/auto + tilstand)
npm run test:combo:live:vps:failover     # legger til et reelt failover-scenario på tvers av leverandører (totalt 8)
```

Merknader om dekning:

- `npm run test:coverage` måler kildedekning for hovedpakken med enhetstester, ekskluderer `tests/**` og inkluderer `open-sse/**`
- Pull requests må holde dekningsporten på **60 %+** for setninger/linjer/funksjoner/grener
- Hvis en PR endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/`, må den legge til eller oppdatere automatiserte tester i samme PR
- `npm run coverage:report` skriver ut den detaljerte rapporten fil for fil fra den siste dekningskjøringen
- `npm run test:coverage:legacy` bevarer den eldre måleverdien for historisk sammenligning
- Se `docs/ops/COVERAGE_PLAN.md` for den faseinndelte planen for forbedring av dekningen

### Krav til pull requests

Før du åpner en PR, bruker du
[anbefalt bidragsprosess](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) for å kjøre den fokuserte løkken for
det du har endret. Hele enhetstestpakken (4 CI-sharder), Vitest, dekningsporten på **60 %+** og
produksjonsbygget er CIs ansvar – å kjøre dem lokalt gir ingen informasjon som PR-kontrollene
ikke allerede gir deg, og på mindre maskiner kan det overbelaste verten (#8084):

- Kjør testfilene som dekker endringen din: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Kjør `npm run lint`
- Inkluder eller oppdater automatiserte tester i samme PR hver gang produksjonskoden endres
- Oppgi de endrede eller tillagte testfilene i PR-beskrivelsen når produksjonskoden er endret
- Kontroller SonarQube-resultatet i PR-en når prosjektets hemmeligheter er konfigurert i CI

Gjeldende teststatus: **122 enhetstestfiler** som dekker:

- Leverandøroversettere og formatkonvertering
- Hastighetsbegrensning, circuit breaker og robusthet
- Semantisk hurtigbuffer, idempotens og fremdriftssporing
- Databaseoperasjoner og skjema (21 DB-moduler)
- OAuth-flyter og autentisering
- Validering av API-endepunkter (Zod v4)
- MCP-serververktøy og håndheving av tilgangsomfang
- Memory- og Skills-systemene

---

## Kodestil

- **ESLint** — Kjør `npm run lint` før du committer
- **Prettier** — Formateres automatisk via `lint-staged` ved commit (2 mellomrom, semikolon, doble anførselstegn, linjebredde på 100 tegn, avsluttende kommaer i es5-stil)
- **TypeScript** — All kode i `src/` bruker `.ts`/`.tsx`; `open-sse/` bruker `.ts`/`.js`; dokumenter med TSDoc (`@param`, `@returns`, `@throws`)
- **Ingen `eval()`** — ESLint håndhever `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validering** — Bruk Zod v4-skjemaer for all validering av API-inndata
- **Navngivning**: Filer = camelCase/kebab-case, komponenter = PascalCase, konstanter = UPPER_SNAKE

### Feilhåndtering / tomme catch-blokker

La aldri en `catch` være uforklart. Klassifiser den i én av to kategorier (dette gjør
den absolutte regelen «aldri ignorer feil i SSE-strømmer i stillhet» operativ):

- **Tilsiktet (vår egen best-effort-opprydding/-telemetri)** — en feil her er forventet og
  ufarlig; legg til en begrunnende kommentar på én linje, uten logging (logging for hver forespørsel er
  støyen denne konvensjonen unngår).

  ```ts
  } catch {} // det er forventet at en allerede lukket kontroller lukkes etter at klienten kobler fra
  ```

- **Skal logges (ekstern kode / kode levert av kalleren, eller ignoreringen endrer kontrollflyten)** — behold
  catch-blokken (la den aldri bryte strømmen), men skriv en kontekstuell melding med `console.debug`/`warn`, slik at
  feilen kan oppdages.

  ```ts
  } catch (e) {
    console.debug("[STREAM] feil i onFailure-tilbakekall:", e);
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

## Legge til en ny leverandør

### Trinn 1: Registrer leverandørkonstanter

Legg til i `src/shared/constants/providers.ts` — Zod-validert ved modulinnlasting.

### Trinn 2: Legg til en eksekutor (hvis egendefinert logikk er nødvendig)

Opprett en eksekutor i `open-sse/executors/your-provider.ts` som utvider basiseksekutoren.

### Trinn 3: Legg til en oversetter (hvis formatet ikke er OpenAI)

Opprett oversettere for forespørsler/svar i `open-sse/translator/`.

### Trinn 4: Legg til OAuth-konfigurasjon (hvis OAuth-basert)

Legg til OAuth-legitimasjon i `src/lib/oauth/constants/oauth.ts` og en tjeneste i `src/lib/oauth/services/`.

Hvis oppstrømsleverandøren distribuerer en offentlig OAuth `client_id`/hemmelighet eller Firebase Web API-nøkkel i sin offentlige CLI-/nettleserpakke, skal den **ikke** bygges inn som en strengliteral. Bruk `resolvePublicCred()` fra `open-sse/utils/publicCreds.ts`, og legg til en maskert byteoppføring i `EMBEDDED_DEFAULTS`. Den fullstendige obligatoriske arbeidsflyten er dokumentert i [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

I handlere/eksekutorer må feilmeldinger som når klienten, gå gjennom `buildErrorBody()` / `sanitizeErrorMessage()` fra `open-sse/utils/error.ts` — legg aldri rå `err.stack` eller `err.message` i en Response-kropp. Se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Trinn 5: Registrer modeller

Legg til modelldefinisjoner i `open-sse/config/providerRegistry.ts`.

### Trinn 6: Legg til tester

Skriv enhetstester i `tests/unit/` som minst dekker:

- Registrering av leverandør
- Oversettelse av forespørsler/svar
- Feilhåndtering

---

## Sjekkliste for pull request

- [ ] Tester består (`npm test`)
- [ ] Linting består (`npm run lint`)
- [ ] Bygging lykkes (`npm run build`)
- [ ] TypeScript-typer er lagt til for nye offentlige funksjoner og grensesnitt
- [ ] Ingen hardkodede hemmeligheter eller reserveverdier
- [ ] Offentlig tilgjengelig oppstrømslegitimasjon er innebygd via `resolvePublicCred()` (se [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), aldri som literalverdier
- [ ] Feilsvar går gjennom `buildErrorBody()` / `sanitizeErrorMessage()` — ingen rå stakkspor i svarinnholdet (se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Skallkommandoer (`exec` / `spawn`) sender kjøretidsverdier via `env`, ikke via strenginterpolasjon
- [ ] Alle inndata valideres med Zod-skjemaer
- [ ] Et **fragment** til endringsloggen er lagt til under `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` for endringer som er synlige for brukerne (se [`changelog.d/README.md`](./changelog.d/README.md)) — **ikke** rediger `CHANGELOG.md` direkte; fragmentene samles ved utgivelse og skaper aldri konflikter mellom pull requests
- [ ] Dokumentasjonen er oppdatert (hvis aktuelt)
- [ ] Ingen nye CodeQL-varsler eller varsler fra Secret-Scanning er åpnet, eller hvert varsel er avvist med en teknisk begrunnelse som henviser til det relevante dokumentet under `docs/security/`
- [ ] Ruter som starter underprosesser (`/api/mcp/`, `/api/cli-tools/runtime/`), er klassifisert som `isLocalOnlyPath()` i `src/server/authz/routeGuard.ts` — se [ufravikelig regel nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Ingen `Co-Authored-By`-trailere i commit-meldinger — commits må utelukkende vises under repository-eierens Git-identitet (ufravikelig regel nr. 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Få hjelp

- **Arkitektur**: Se [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referanse**: Se [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sikkerhetsdokumentasjon**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Driftsdokumentasjon**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemer**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-er**: Se `docs/adr/` for arkitekturbeslutningslogger
