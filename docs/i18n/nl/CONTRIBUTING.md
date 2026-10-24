# Contributing to OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Ontwikkelomgeving instellen

### Vereisten

- **Node.js** `>=22.22.2 <23`, of `>=24.0.0 <27` (aanbevolen: 24 LTS)
- **npm** 10+

> **Gebruikers van npm v11+ (Node 24+):** Controleer na `npm install` of de native modules zijn geïnstalleerd:
> `node -e "require('better-sqlite3')"`. Als dit mislukt met `MODULE_NOT_FOUND`,
> voer dan `npm approve-scripts better-sqlite3 && npm install` uit. Zie
> [Probleemoplossing](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonen en installeren

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Omgevingsvariabelen

```bash
# Maak uw .env aan op basis van de sjabloon
cp .env.example .env

# Genereer de vereiste geheimen
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Belangrijke variabelen voor ontwikkeling:

| Variabele              | Standaardwaarde voor ontwikkeling | Beschrijving                    |
| ---------------------- | --------------------------------- | ------------------------------- |
| `PORT`                 | `20128`                           | Serverpoort                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`          | Basis-URL voor de frontend      |
| `JWT_SECRET`           | (hierboven genereren)             | Geheim voor JWT-ondertekening   |
| `INITIAL_PASSWORD`     | `CHANGEME`                        | Wachtwoord voor eerste login    |
| `APP_LOG_LEVEL`        | `info`                            | Detailniveau van logregistratie |

### Dashboardinstellingen

Het dashboard biedt UI-schakelaars voor functies die ook via omgevingsvariabelen kunnen worden geconfigureerd:

| Locatie van instelling     | Schakelaar            | Beschrijving                                   |
| -------------------------- | --------------------- | ---------------------------------------------- |
| Instellingen → Geavanceerd | Debugmodus            | Logboeken voor debugverzoeken inschakelen (UI) |
| Instellingen → Algemeen    | Zichtbaarheid zijbalk | Secties in de zijbalk tonen/verbergen          |

Deze instellingen worden in de database opgeslagen en blijven behouden na herstarts. Wanneer ze zijn ingesteld, overschrijven ze de standaardwaarden van omgevingsvariabelen.

### Lokaal uitvoeren

```bash
# Ontwikkelmodus (automatisch herladen)
npm run dev

# Productiebuild
npm run build    # next build → .build/next/ en vervolgens assembleStandalone → dist/
npm run start

# Snelle compilatie van alleen backend/API voor wijzigingen van bijdragers
npm run build:contributor

# Releasebuild (schone herbouw + HEAD-controlebestand — vereist voor implementatie)
npm run build:release   # rm -rf .build dist && build + schrijft dist/BUILD_SHA

# Gebruikelijke poortconfiguratie
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

De bijdragersbuild voert alleen compilatievalidatie uit: deze stelt de zelfstandige
distributie niet samen en bouwt geen optionele native pakketassets. Gebruik de reguliere productiebuild wanneer
u de distribueerbare bundel moet valideren.

### Indeling van builduitvoer

| Map       | Inhoud                                                                                   | Bijgehouden |
| --------- | ---------------------------------------------------------------------------------------- | ----------- |
| `src/`    | Broncode van de applicatie (TypeScript / TSX)                                            | Ja          |
| `.build/` | Tussenbestanden — uitvoer van `next build` (genegeerd door Git, `distDir = .build/next`) | Nee         |
| `dist/`   | Distribueerbare bundel — samengesteld door `assembleStandalone` (genegeerd door Git)     | Nee         |

De buildpipeline bestaat uit één doorgang:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-uitvoer)
  └─ assembleStandalone()                 (kopieert standalone + static + public + native assets)
       └─ uitvoer: dist/                  (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` maakt bovendien eerst beide mappen leeg en schrijft
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) als controlebestand voor de integriteit van de implementatie.

`npm run build:contributor` gebruikt het buildprofiel voor alleen de backend. Tijdens het builden worden
dashboard-UI-bestanden tijdelijk vervangen door stubs, blijven API-routehandlers behouden en worden de oorspronkelijke bestanden
na de build hersteld. Gebruik `npm run build` voor wijzigingen die invloed hebben op de dashboard-UI of voor volledige
releasevalidatie; het bijdragersprofiel is geen vervanging voor de releasebuild.

> **Opmerking voor VPS-implementatie:** de externe image-map `/usr/lib/node_modules/omniroute/app/`
> blijft ongewijzigd. De implementatietaken synchroniseren de inhoud van `dist/` er via rsync naartoe.
> Alleen het pad voor builduitvoer binnen de repository is gewijzigd (`app/` → `dist/`).

Standaard-URL's:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-workflow

> ⚠️ **Commit NOOIT rechtstreeks naar `main`.** Gebruik altijd featurebranches.
>
> **PR-basis:** richt de PR op de actieve `release/vX.Y.Z`-branch (niet op `main`). Zie
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) voor het
> model met één release per branch en een tag bij de oplevering.

```bash
# Maak een branch vanaf de tip van de actieve releasebranch (voorbeeld: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... breng wijzigingen aan ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open een Pull Request met base = release/v3.8.49
```

### Branchnamen

| Voorvoegsel | Doel                              |
| ----------- | --------------------------------- |
| `feat/`     | Nieuwe functionaliteit            |
| `fix/`      | Bugfixes                          |
| `refactor/` | Herstructurering van code         |
| `docs/`     | Documentatiewijzigingen           |
| `test/`     | Toevoegingen/correcties van tests |
| `chore/`    | Tooling, CI, afhankelijkheden     |

### Commitberichten

Volg [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: voeg een circuitonderbreker toe voor provideraanroepen
fix: los een randgeval bij de validatie van het JWT-secret op
docs: werk SECURITY.md bij met bescherming van PII
test: voeg unittests voor observability toe
refactor(db): consolideer tabellen voor rate limiting
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tests uitvoeren

```bash
# Alle tests (unit + vitest + ecosysteem + e2e)
npm run test:all

# Eén testbestand (native Node.js-testrunner — de meeste tests gebruiken deze)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Alleen de unittests waarop je wijziging invloed heeft (dezelfde TIA-selector als de CI-gate, #8084)
npm run test:scoped            # wijzigingen in de laatste commit (of de werkmap)
npm run test:scoped:staged     # alleen gestagede wijzigingen — werkt goed in combinatie met een pre-commit-run
npm run test:scoped:full       # bouw eerst de importgrafiek opnieuw op (na het toevoegen/verplaatsen van bestanden)
# Exitcode 1 + "voer de volledige suite uit" betekent dat een centraal bestand (tsconfig, package.json, …) of een
# niet-toegewezen bronbestand is gewijzigd — de selector faalt veilig en slaat nooit stilzwijgend iets over.

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# E2E-tests (vereist Playwright)
npm run test:e2e

# E2E voor protocolclients (MCP-transports, A2A)
npm run test:protocols:e2e

# Compatibiliteitstests voor het ecosysteem
npm run test:ecosystem

# Dekkingsdrempel: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint- en opmaakcontrole
npm run lint
npm run check

# Afgeschermde combo-rooktest met echte upstreams (vereist VPS-toegang + tegoed bij echte providers)
# Benadert ECHTE providers — kost een klein bedrag. Wordt NOOIT uitgevoerd in CI. Wordt netjes overgeslagen zonder de gate.
# Vereist: toegang via ssh root@192.168.0.15 (haalt een alleen-lezen DB-snapshot op van de VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Fase 3-live-rooktest voor de VPS — gewone Node ESM-scripts die de live .15-server rechtstreeks benaderen.
# Vereist: toegang via ssh root@192.168.0.15 (combo's worden via SSH sqlite aangemaakt/verwijderd).
# Benadert ECHTE providers (lage kosten). Maakt/verwijdert alleen combo's met __live_test__*. Wordt NOOIT uitgevoerd in CI.
# REQUIRE_API_KEY=false op .15, dus er is geen API-sleutel nodig, maar COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY worden gebruikt indien ingesteld.
npm run test:combo:live:vps              # 7 HTTP-scenario's (prioriteit/round-robin/gewogen/kosten/fusie/automatisch + status)
npm run test:combo:live:vps:failover     # voegt een echt failoverscenario tussen providers toe (8 in totaal)
```

Opmerkingen over dekking:

- `npm run test:coverage` meet de broncodedekking voor de belangrijkste unittestsuite, sluit `tests/**` uit en neemt `open-sse/**` mee
- Pull requests moeten de dekkingsdrempel voor statements/lines/functions/branches op **60%+** houden
- Als een PR productiecode in `src/`, `open-sse/`, `electron/` of `bin/` wijzigt, moeten in dezelfde PR geautomatiseerde tests worden toegevoegd of bijgewerkt
- `npm run coverage:report` toont het gedetailleerde rapport per bestand van de meest recente dekkingsrun
- `npm run test:coverage:legacy` behoudt de oudere meetwaarde voor historische vergelijking
- Zie `docs/ops/COVERAGE_PLAN.md` voor de gefaseerde roadmap om de dekking te verbeteren

### Vereisten voor pull requests

Gebruik voordat je een PR opent het
[standaardtraject voor bijdragen](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) om de gerichte cyclus uit te voeren voor
wat je hebt gewijzigd. De volledige unittestsuite (4 CI-shards), Vitest, de dekkingsdrempel van **60%+** en
de productiebuild vallen onder de verantwoordelijkheid van CI — ze lokaal uitvoeren levert geen extra signaal op dat de
PR-controles je niet al geven, en op kleinere machines kan dit de host overbelasten (#8084):

- Voer de testbestanden uit die je wijziging dekken: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Voer `npm run lint` uit
- Voeg geautomatiseerde tests toe of werk ze bij in dezelfde PR wanneer productiecode wordt gewijzigd
- Vermeld de gewijzigde of toegevoegde testbestanden in de PR-beschrijving wanneer productiecode is gewijzigd
- Controleer het SonarQube-resultaat van de PR wanneer de projectgeheimen in CI zijn geconfigureerd

Huidige teststatus: **122 unittestsbestanden** met dekking voor:

- Providervertalers en formaatconversie
- Snelheidsbeperking, circuitbreaker en robuustheid
- Semantische cache, idempotentie en voortgangsregistratie
- Databasebewerkingen en -schema (21 DB-modules)
- OAuth-flows en authenticatie
- Validatie van API-eindpunten (Zod v4)
- MCP-servertools en afdwinging van scopes
- Geheugen- en Skills-systemen

---

## Codestijl

- **ESLint** — Voer `npm run lint` uit voordat je commit
- **Prettier** — Wordt bij het committen automatisch geformatteerd via `lint-staged` (2 spaties, puntkomma's, dubbele aanhalingstekens, regelbreedte van 100 tekens, afsluitende komma's volgens es5)
- **TypeScript** — Alle code in `src/` gebruikt `.ts`/`.tsx`; `open-sse/` gebruikt `.ts`/`.js`; documenteer met TSDoc (`@param`, `@returns`, `@throws`)
- **Geen `eval()`** — ESLint handhaaft `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validatie** — Gebruik Zod v4-schema's voor alle validatie van API-invoer
- **Naamgeving**: bestanden = camelCase/kebab-case, componenten = PascalCase, constanten = UPPER_SNAKE

### Foutafhandeling / lege catch-blokken

Laat een `catch` nooit onverklaard. Deel deze in een van de volgende twee categorieën in (dit operationaliseert
de harde regel "slik fouten in SSE-streams nooit stilzwijgend in"):

- **Opzettelijk (onze eigen best-effort-opruiming/telemetrie)** — een fout is hier te verwachten en
  onschadelijk; voeg een commentaarregel toe met de reden, zonder logging (logging bij elk verzoek is de
  ruis die met deze conventie wordt vermeden).

  ```ts
  } catch {} // het sluiten van een reeds gesloten controller nadat de client de verbinding heeft verbroken, is te verwachten
  ```

- **Moet worden gelogd (externe/door de aanroeper aangeleverde code, of het inslikken verandert de besturingsstroom)** — behoud
  de catch (laat deze nooit de stream onderbreken), maar genereer een contextuele `console.debug`/`warn`, zodat de
  fout kan worden ontdekt.

  ```ts
  } catch (e) {
    console.debug("[STREAM] fout in onFailure-callback:", e);
  }
  ```

Zie `open-sse/utils/stream.ts` en `open-sse/utils/streamHandler.ts` voor toegepaste voorbeelden.

---

## Projectstructuur

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboardpagina's (23 secties)
│   ├── api/                # API-routes (51 mappen)
│   └── login/              # Authenticatiepagina's (.tsx)
├── domain/                 # Beleidsengine (policyEngine, comboResolver, costRules, enz.)
├── lib/                    # Kernlogica voor bedrijfsprocessen (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3-protocolserver
│   ├── acp/                # Register voor het Agent Communication Protocol
│   ├── compliance/         # Beleidsengine voor compliance
│   ├── db/                 # SQLite-domeinmodules + 130 migraties
│   ├── memory/             # Permanent gespreksgeheugen
│   ├── oauth/              # OAuth-providers, -services en -hulpprogramma's
│   ├── skills/             # Uitbreidbaar skill-framework
│   ├── usage/              # Gebruiksregistratie en kostenberekening
│   └── localDb.ts          # Alleen re-exportlaag — voeg hier nooit logica toe
├── middleware/              # Request-middleware (promptInjectionGuard)
├── mitm/                   # MITM-proxy (certificaat, DNS, doelroutering)
├── shared/
│   ├── components/         # React-componenten (.tsx)
│   ├── constants/          # Providerdefinities (329), MCP-scopes, 21 routeringsstrategieën
│   ├── utils/              # Circuitbreaker, sanitizer en authenticatiehulpprogramma's
│   └── validation/         # Zod v4-schema's
└── sse/                    # SSE-proxypijplijn

open-sse/                   # @omniroute/open-sse-workspace
├── executors/              # 150 executormodules (executorklassen + helpers per provider)
├── handlers/               # 11 requesthandlers (chat, responses, embeddings, afbeeldingen, enz.)
├── mcp-server/             # MCP-server (110 unieke tools, 3 transportmethoden, 33 scopes)
├── services/               # 178 services op het hoogste niveau (combo, autoCombo, rateLimitManager, enz.)
├── translator/             # Formaatvertalers (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API-transformer
└── utils/                  # 22 hulpprogrammamodules (stream, TLS, proxy, logging)

electron/                   # Electron-desktopapp (platformonafhankelijk)

tests/
├── unit/                   # Node.js-testrunner (1.574 testbestanden)
├── integration/            # Integratietests
├── e2e/                    # Playwright-tests
├── security/               # Beveiligingstests
├── translator/             # Vertalerspecifieke tests
└── load/                   # Belastingtests

docs/
├── adr/                     # Architectuurbesluiten
├── architecture/            # Systeemarchitectuur en veerkracht
├── comparison/              # OmniRoute versus alternatieven
├── compression/             # Compressiehandleidingen en -regels
├── dev/                     # Ontwikkelhandleidingen
├── diagrams/                # Architectuurdiagrammen
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Gebruikershandleiding, Docker, installatie, probleemoplossing
├── i18n/                    # Geïnternationaliseerde README-vertalingen
├── marketing/               # Marketingmateriaal
├── ops/                     # Implementatie, proxy, dekking, releases
├── providers/               # Providerspecifieke documentatie
├── reference/               # API-referentie, omgevingsvariabelen, CLI-tools, gratis niveaus
├── releases/                # Releaseopmerkingen
├── routing/                 # Auto-combo-engine, herhaling van redeneringen
├── screenshots/             # Dashboardschermafbeeldingen
├── security/                # Vangrails, compliance, stealth, tokens
└── specs/                   # Ontwerpspecificaties
```

---

## Een nieuwe provider toevoegen

### Stap 1: Providerconstanten registreren

Voeg ze toe aan `src/shared/constants/providers.ts` — gevalideerd met Zod bij het laden van de module.

### Stap 2: Executor toevoegen (indien aangepaste logica nodig is)

Maak een executor in `open-sse/executors/your-provider.ts` die de basisexecutor uitbreidt.

### Stap 3: Translator toevoegen (indien geen OpenAI-indeling)

Maak translators voor verzoeken en antwoorden in `open-sse/translator/`.

### Stap 4: OAuth-configuratie toevoegen (indien gebaseerd op OAuth)

Voeg OAuth-inloggegevens toe in `src/lib/oauth/constants/oauth.ts` en een service in `src/lib/oauth/services/`.

Als de upstreamprovider een openbare OAuth-`client_id`/`secret` of Firebase Web API-sleutel in zijn openbare CLI-/browserbundel distribueert, neem deze dan **niet** op als een letterlijke tekenreeks. Gebruik `resolvePublicCred()` uit `open-sse/utils/publicCreds.ts` en voeg een gemaskeerde bytevermelding toe aan `EMBEDDED_DEFAULTS`. De volledige verplichte workflow is gedocumenteerd in [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Binnen handlers/executors moeten foutmeldingen die de client bereiken, worden verwerkt via `buildErrorBody()` / `sanitizeErrorMessage()` uit `open-sse/utils/error.ts` — plaats nooit onbewerkte `err.stack` of `err.message` in de body van een Response. Zie [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Stap 5: Modellen registreren

Voeg modeldefinities toe in `open-sse/config/providerRegistry.ts`.

### Stap 6: Tests toevoegen

Schrijf unittests in `tests/unit/` die minimaal het volgende afdekken:

- Providerregistratie
- Vertaling van verzoeken en antwoorden
- Foutafhandeling

---

## Checklist voor pull requests

- [ ] Tests slagen (`npm test`)
- [ ] Linting slaagt (`npm run lint`)
- [ ] Build slaagt (`npm run build`)
- [ ] TypeScript-typen toegevoegd voor nieuwe openbare functies en interfaces
- [ ] Geen hardgecodeerde geheimen of terugvalwaarden
- [ ] Openbare upstream-inloggegevens ingesloten via `resolvePublicCred()` (zie [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nooit als letterlijke waarden
- [ ] Foutreacties worden verwerkt via `buildErrorBody()` / `sanitizeErrorMessage()` — geen onbewerkte stacktraces in responsbody's (zie [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell-opdrachten (`exec` / `spawn`) geven runtimewaarden door via `env`, niet via tekenreeksinterpolatie
- [ ] Alle invoer gevalideerd met Zod-schema's
- [ ] **Fragment** voor de changelog toegevoegd onder `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` voor gebruikersgerichte wijzigingen (zie [`changelog.d/README.md`](./changelog.d/README.md)) — bewerk `CHANGELOG.md` **niet** rechtstreeks; fragmenten worden bij een release samengevoegd en veroorzaken nooit conflicten tussen pull requests
- [ ] Documentatie bijgewerkt (indien van toepassing)
- [ ] Geen nieuwe CodeQL- of Secret-Scanning-meldingen geopend, of elke melding afgewezen met een technische onderbouwing die verwijst naar het relevante document in `docs/security/`
- [ ] Routes die onderliggende processen starten (`/api/mcp/`, `/api/cli-tools/runtime/`) geclassificeerd als `isLocalOnlyPath()` in `src/server/authz/routeGuard.ts` — zie [harde regel #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Geen AI-/bottrailers met `Co-authored-by` in commitberichten (harde regel #16) — menselijke medewerkers van wie werk wordt hergebruikt, worden vermeld met standaardtrailers in de vorm `Co-authored-by: Name <email>`

---

## Releases uitbrengen

Releases worden beheerd via de `/generate-release`-workflow. Wanneer er een nieuwe GitHub Release wordt aangemaakt, wordt het pakket via GitHub Actions **automatisch naar npm gepubliceerd**.

Gebruik voor VPS-deployments `npm run build:release` (niet `npm run build`) — deze opdracht voert een schone
rebuild uit, stelt de bundel samen in `dist/` en schrijft het sentinelbestand `dist/BUILD_SHA`.
Gebruik vervolgens de `/deploy-vps-*-cc`-skills, die `dist/` via rsync naar de externe map `app/` synchroniseren.

---

## Hulp krijgen

- **Architectuur**: Zie [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referentie**: Zie [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Beveiligingsdocumentatie**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Beheerdocumentatie**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
