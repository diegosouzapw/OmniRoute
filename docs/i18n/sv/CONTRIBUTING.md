# Contributing to OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Utvecklingsmiljö

### Förutsättningar

- **Node.js** `>=22.22.3 <23` eller `>=24.0.0 <27` (rekommenderat: 24 LTS)
- **npm** 10+

> **Användare av npm v11+ (Node 24+):** Efter `npm install`, verifiera att de inbyggda modulerna installerades:
> `node -e "require('better-sqlite3')"`. Om det misslyckas med `MODULE_NOT_FOUND`,
> kör `npm approve-scripts better-sqlite3 && npm install`. Se
> [Felsökning](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klona och installera

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Miljövariabler

```bash
# Skapa din .env från mallen
cp .env.example .env

# Generera nödvändiga hemligheter
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Viktiga variabler för utveckling:

| Variabel               | Standardvärde för utveckling | Beskrivning                    |
| ---------------------- | ---------------------------- | ------------------------------ |
| `PORT`                 | `20128`                      | Serverport                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | Bas-URL för klientdelen        |
| `JWT_SECRET`           | (generera ovan)              | Hemlighet för JWT-signering    |
| `INITIAL_PASSWORD`     | `CHANGEME`                   | Lösenord för första inloggning |
| `APP_LOG_LEVEL`        | `info`                       | Detaljnivå för loggning        |

### Inställningar för kontrollpanelen

Kontrollpanelen innehåller gränssnittsväxlar för funktioner som även kan konfigureras via miljövariabler:

| Inställningens plats      | Växel                 | Beskrivning                                               |
| ------------------------- | --------------------- | --------------------------------------------------------- |
| Inställningar → Avancerat | Felsökningsläge       | Aktivera felsökningsloggar för förfrågningar (gränssnitt) |
| Inställningar → Allmänt   | Sidofältets synlighet | Visa/dölj avsnitt i sidofältet                            |

Dessa inställningar lagras i databasen och kvarstår mellan omstarter. När de har angetts åsidosätter de miljövariablernas standardvärden.

### Köra lokalt

```bash
# Utvecklingsläge (automatisk omladdning)
npm run dev

# Produktionsbygge
npm run build    # next build → .build/next/ och därefter assembleStandalone → dist/
npm run start

# Snabb kompilering enbart av serverdelen/API:t för bidragsgivarändringar
npm run build:contributor

# Versionsbygge (ren ombyggnad + HEAD-kontrollmarkör — krävs för driftsättning)
npm run build:release   # rm -rf .build dist && bygge + skriver dist/BUILD_SHA

# Vanlig portkonfiguration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Bidragsgivarbygget utför endast kompileringsvalidering: det sammanställer inte den fristående
distributionen och bygger inte valfria inbyggda paketeringsresurser. Använd det vanliga produktionsbygget när
du behöver validera det leveransbara paketet.

### Byggutdatans struktur

| Katalog   | Innehåll                                                                              | Versionshanterad |
| --------- | ------------------------------------------------------------------------------------- | ---------------- |
| `src/`    | Applikationens källkod (TypeScript / TSX)                                             | Ja               |
| `.build/` | Mellanresultat — utdata från `next build` (ignoreras av Git, `distDir = .build/next`) | Nej              |
| `dist/`   | Leveransbart paket — sammanställt av `assembleStandalone` (ignoreras av Git)          | Nej              |

Byggprocessen körs i ett enda pass:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-utdata)
  └─ assembleStandalone()                 (kopierar fristående utdata + statiska filer + publika filer + inbyggda resurser)
       └─ utdata: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` rensar dessutom båda katalogerna först och skriver
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) som en kontrollmarkör för driftsättningens integritet.

`npm run build:contributor` använder byggprofilen enbart för serverdelen. Den ersätter tillfälligt
kontrollpanelens gränssnittsfiler med stubbar under bygget, behåller API-rutthanterarna och återställer originalfilerna
efter bygget. Använd `npm run build` för ändringar som påverkar kontrollpanelens gränssnitt eller för fullständig
versionsvalidering. Bidragsgivarprofilen ersätter inte versionsbygget.

> **Anmärkning om VPS-driftsättning:** fjärrkatalogen för avbildningen `/usr/lib/node_modules/omniroute/app/`
> är oförändrad. Driftsättningsfärdigheterna synkroniserar innehållet i `dist/` till den med rsync.
> Endast sökvägen till byggutdata i lagringsplatsen har flyttats (`app/` → `dist/`).

Standard-URL:er:

- **Kontrollpanel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-arbetsflöde

> ⚠️ **Gör ALDRIG en commit direkt till `main`.** Använd alltid funktionsgrenar.
>
> **PR-bas:** välj den aktiva grenen `release/vX.Y.Z` som mål (inte `main`). Se
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) för modellen med
> en gren per version och taggning vid lansering.

```bash
# Skapa en gren från den aktiva versionsgrenens senaste commit (exempel: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... gör ändringar ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Öppna en Pull Request med base = release/v3.8.49
```

### Namngivning av grenar

| Prefix      | Syfte                        |
| ----------- | ---------------------------- |
| `feat/`     | Nya funktioner               |
| `fix/`      | Felrättningar                |
| `refactor/` | Omstrukturering av kod       |
| `docs/`     | Dokumentationsändringar      |
| `test/`     | Tillägg/rättningar av tester |
| `chore/`    | Verktyg, CI, beroenden       |

### Commit-meddelanden

Följ [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: lägg till kretsbrytare för leverantörsanrop
fix: åtgärda specialfall vid validering av JWT-hemlighet
docs: uppdatera SECURITY.md med skydd för personuppgifter
test: lägg till enhetstester för observerbarhet
refactor(db): konsolidera tabeller för hastighetsbegränsning
```

Omfattningar (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Köra tester

```bash
# Alla tester (enhet + vitest + ekosystem + e2e)
npm run test:all

# Enskild testfil (Node.js inbyggda testkörare — de flesta tester använder denna)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Endast de enhetstester som påverkas av din ändring (samma TIA-väljare som CI-grinden, #8084)
npm run test:scoped            # ändringar i den senaste committen (eller arbetskatalogen)
npm run test:scoped:staged     # endast stageade ändringar — passar bra med en körning före commit
npm run test:scoped:full       # bygg först om importgrafkartan (efter att filer lagts till/flyttats)
# Avslutningskod 1 + "run the full suite" betyder att en navfil (tsconfig, package.json, …) eller en
# omappad källfil har ändrats — väljaren avbryter säkert och hoppar aldrig över något i tysthet.

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# E2E-tester (kräver Playwright)
npm run test:e2e

# E2E för protokollklienter (MCP-transporter, A2A)
npm run test:protocols:e2e

# Kompatibilitetstester för ekosystemet
npm run test:ecosystem

# Täckningsgrind: 60 % satser/rader/funktioner/grenar
npm run test:coverage
npm run coverage:report

# Kontroll av lintning + formatering
npm run lint
npm run check

# Grindad smoke-test av kombinationer mot verkliga uppströmstjänster (kräver VPS-åtkomst + krediter hos riktiga leverantörer)
# Anropar VERKLIGA leverantörer — kostar lite. Körs ALDRIG i CI. Hoppas över utan fel om grinden saknas.
# Kräver: åtkomst via ssh root@192.168.0.15 (hämtar en skrivskyddad DB-ögonblicksbild från VPS:en).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Fas 3-live-smoke-test på VPS — vanliga Node ESM-skript som anropar live-servern på .15 direkt.
# Kräver: åtkomst via ssh root@192.168.0.15 (kombinationer skapas/tas bort via SSH sqlite).
# Anropar VERKLIGA leverantörer (liten kostnad). Skapar/raderar endast kombinationer av typen __live_test__*. Körs ALDRIG i CI.
# REQUIRE_API_KEY=false på .15, så ingen API-nyckel behövs, men COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY respekteras om de är angivna.
npm run test:combo:live:vps              # 7 HTTP-scenarier (prioritet/round-robin/viktad/kostnad/fusion/auto + hälsa)
npm run test:combo:live:vps:failover     # lägger till ett verkligt redundansscenario mellan leverantörer (totalt 8)
```

Kommentarer om täckning:

- `npm run test:coverage` mäter källtäckningen för huvudsviten med enhetstester, exkluderar `tests/**` och inkluderar `open-sse/**`
- Pull requests måste hålla täckningsgrinden på **60 %+** för satser/rader/funktioner/grenar
- Om en PR ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/` måste automatiserade tester läggas till eller uppdateras i samma PR
- `npm run coverage:report` skriver ut en detaljerad rapport fil för fil från den senaste täckningskörningen
- `npm run test:coverage:legacy` bevarar det äldre mätvärdet för historisk jämförelse
- Se `docs/ops/COVERAGE_PLAN.md` för den stegvisa planen för förbättrad täckning

### Krav för Pull Requests

Innan du öppnar en PR ska du använda
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) för att köra den fokuserade loopen för
det du har ändrat. Den fullständiga enhetstestsviten (4 CI-shards), Vitest, täckningsgrinden på **60 %+** och
produktionsbygget är CI:s ansvar — att köra dem lokalt tillför ingen information som PR-
kontrollerna inte redan ger dig, och på mindre maskiner kan det överbelasta värddatorn (#8084):

- Kör testfilerna som täcker din ändring: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Kör `npm run lint`
- Lägg till eller uppdatera automatiserade tester i samma PR när produktionskod ändras
- Inkludera de ändrade eller tillagda testfilerna i PR-beskrivningen när produktionskod har ändrats
- Kontrollera SonarQube-resultatet för PR:en när projektets hemligheter är konfigurerade i CI

Aktuell teststatus: **122 enhetstestfiler** som täcker:

- Leverantörsöversättare och formatkonvertering
- Hastighetsbegränsning, kretsbrytare och motståndskraft
- Semantisk cache, idempotens och förloppsspårning
- Databasåtgärder och schema (21 DB-moduler)
- OAuth-flöden och autentisering
- Validering av API-endpoints (Zod v4)
- MCP-serververktyg och tillämpning av behörighetsomfång
- Minnes- och Skills-system

---

## Kodstil

- **ESLint** — Kör `npm run lint` innan du committar
- **Prettier** — Formateras automatiskt via `lint-staged` vid commit (2 blanksteg, semikolon, dubbla citattecken, radbredd på 100 tecken, avslutande kommatecken enligt es5)
- **TypeScript** — All kod i `src/` använder `.ts`/`.tsx`; `open-sse/` använder `.ts`/`.js`; dokumentera med TSDoc (`@param`, `@returns`, `@throws`)
- **Ingen `eval()`** — ESLint upprätthåller `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-validering** — Använd scheman från Zod v4 för all validering av API-indata
- **Namngivning**: Filer = camelCase/kebab-case, komponenter = PascalCase, konstanter = UPPER_SNAKE

### Felhantering/tomma catch-block

Lämna aldrig en `catch` oförklarad. Klassificera den i en av två kategorier (omsätter
den strikta regeln ”ignorera aldrig fel i SSE-strömmar utan förklaring” i praktiken):

- **Avsiktligt (vår egen upprensning/telemetri enligt bästa förmåga)** — ett fel här är förväntat och
  ofarligt; lägg till en kort motiverande kommentar på en rad, utan loggning (loggning vid varje begäran är det
  brus som denna konvention undviker).

  ```ts
  } catch {} // det är förväntat att en redan stängd controller stängs efter att klienten kopplat från
  ```

- **Bör loggas (extern kod/kod från anroparen, eller när ignoreringen ändrar kontrollflödet)** — behåll
  `catch`-blocket (låt det aldrig bryta strömmen), men skriv ut ett kontextuellt `console.debug`/`warn` så att
  felet går att upptäcka.

  ```ts
  } catch (e) {
    console.debug("[STREAM] fel i onFailure-callback:", e);
  }
  ```

Se `open-sse/utils/stream.ts` och `open-sse/utils/streamHandler.ts` för tillämpade exempel.

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

## Lägga till en ny leverantör

### Steg 1: Registrera leverantörskonstanter

Lägg till dem i `src/shared/constants/providers.ts` — Zod-valideras när modulen läses in.

### Steg 2: Lägg till en exekverare (om anpassad logik behövs)

Skapa en exekverare i `open-sse/executors/your-provider.ts` som utökar basexekveraren.

### Steg 3: Lägg till en översättare (om formatet inte är OpenAI-kompatibelt)

Skapa översättare för förfrågningar/svar i `open-sse/translator/`.

### Steg 4: Lägg till OAuth-konfiguration (om OAuth används)

Lägg till OAuth-autentiseringsuppgifter i `src/lib/oauth/constants/oauth.ts` och en tjänst i `src/lib/oauth/services/`.

Om uppströmsleverantören distribuerar ett offentligt OAuth-client_id/client secret eller en Firebase Web API-nyckel i sitt offentliga CLI-/webbläsarpaket ska du **inte** bädda in den som en strängliteral. Använd `resolvePublicCred()` från `open-sse/utils/publicCreds.ts` och lägg till en maskerad bytepost i `EMBEDDED_DEFAULTS`. Det fullständiga obligatoriska arbetsflödet dokumenteras i [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

I hanterare/exekverare måste felmeddelanden som når klienten gå via `buildErrorBody()` / `sanitizeErrorMessage()` från `open-sse/utils/error.ts` — lägg aldrig rå `err.stack` eller `err.message` i en Response-kropp. Se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Steg 5: Registrera modeller

Lägg till modelldefinitioner i `open-sse/config/providerRegistry.ts`.

### Steg 6: Lägg till tester

Skriv enhetstester i `tests/unit/` som minst omfattar:

- Registrering av leverantören
- Översättning av förfrågningar/svar
- Felhantering

---

## Checklista för pull request

- [ ] Tester godkänns (`npm test`)
- [ ] Lintning godkänns (`npm run lint`)
- [ ] Bygget lyckas (`npm run build`)
- [ ] TypeScript-typer har lagts till för nya publika funktioner och gränssnitt
- [ ] Inga hårdkodade hemligheter eller reservvärden
- [ ] Publika autentiseringsuppgifter för uppströmsresurser bäddas in via `resolvePublicCred()` (se [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), aldrig som literaler
- [ ] Felsvar dirigeras via `buildErrorBody()` / `sanitizeErrorMessage()` — inga råa stackspårningar i svarskroppar (se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Skalkommandon (`exec` / `spawn`) skickar värden vid körning via `env`, inte via stränginterpolering
- [ ] Alla indata valideras med Zod-scheman
- [ ] Ett **fragment** för ändringsloggen har lagts till under `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` för användarsynliga ändringar (se [`changelog.d/README.md`](./changelog.d/README.md)) — redigera **inte** `CHANGELOG.md` direkt; fragment sammanställs vid lansering och orsakar aldrig konflikter mellan pull requests
- [ ] Dokumentationen har uppdaterats (om tillämpligt)
- [ ] Inga nya CodeQL-varningar eller varningar från hemlighetsskanning har skapats, alternativt har var och en avfärdats med en teknisk motivering som hänvisar till relevant dokument i `docs/security/`
- [ ] Rutter som startar underprocesser (`/api/mcp/`, `/api/cli-tools/runtime/`) har klassificerats som `isLocalOnlyPath()` i `src/server/authz/routeGuard.ts` — se [hård regel nr 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Inga `Co-Authored-By`-slutrader i commit-meddelanden — commits måste visas enbart under databasägarens Git-identitet (hård regel nr 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Få hjälp

- **Arkitektur**: Se [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referens**: Se [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Säkerhetsdokumentation**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Driftdokumentation**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problem**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR:er**: Se `docs/adr/` för arkitekturbeslutsposter
