# Contributing to OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Utvecklingsmiljö

### Förutsättningar

- **Node.js** `>=22.22.2 <23` eller `>=24.0.0 <27` (rekommenderat: 24 LTS)
- **npm** 10+

> **För användare av npm v11+ (Node 24+):** Efter `npm install`, verifiera att de systemspecifika modulerna har installerats:
> `node -e "require('better-sqlite3')"`. Om kommandot misslyckas med `MODULE_NOT_FOUND`,
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

| Variabel               | Standardvärde för utveckling | Beskrivning                      |
| ---------------------- | ---------------------------- | -------------------------------- |
| `PORT`                 | `20128`                      | Serverport                       |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | Bas-URL för frontend             |
| `JWT_SECRET`           | (generera ovan)              | Hemlighet för JWT-signering      |
| `INITIAL_PASSWORD`     | `CHANGEME`                   | Lösenord vid första inloggningen |
| `APP_LOG_LEVEL`        | `info`                       | Detaljnivå för loggning          |

### Inställningar i kontrollpanelen

Kontrollpanelen innehåller reglage för funktioner som även kan konfigureras via miljövariabler:

| Inställningens plats      | Reglage               | Beskrivning                               |
| ------------------------- | --------------------- | ----------------------------------------- |
| Inställningar → Avancerat | Felsökningsläge       | Aktivera felsökningsloggar för anrop (UI) |
| Inställningar → Allmänt   | Sidofältets synlighet | Visa/dölj avsnitt i sidofältet            |

Dessa inställningar lagras i databasen och finns kvar efter omstarter. När de har angetts åsidosätter de miljövariablernas standardvärden.

### Köra lokalt

```bash
# Utvecklingsläge (automatisk omladdning)
npm run dev

# Produktionsbygge
npm run build    # next build → .build/next/ och därefter assembleStandalone → dist/
npm run start

# Snabb kompilering enbart av backend/API för bidragsgivares ändringar
npm run build:contributor

# Versionsbygge (ren ombyggnad + HEAD-kontrollmarkör — krävs för driftsättning)
npm run build:release   # rm -rf .build dist && bygger + skriver dist/BUILD_SHA

# Vanlig portkonfiguration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Bygget för bidragsgivare utför endast kompileringsvalidering: det skapar inte den fristående
distributionen och bygger inte heller valfria systemspecifika paketeringsresurser. Använd det vanliga produktionsbygget när
du behöver validera det leveransklara paketet.

### Katalogstruktur för byggutdata

| Katalog   | Innehåll                                                                              | Versionshanterad |
| --------- | ------------------------------------------------------------------------------------- | ---------------- |
| `src/`    | Applikationens källkod (TypeScript / TSX)                                             | Ja               |
| `.build/` | Mellanresultat — utdata från `next build` (ignoreras av Git, `distDir = .build/next`) | Nej              |
| `dist/`   | Leveransklart paket — sammanställt av `assembleStandalone` (ignoreras av Git)         | Nej              |

Byggprocessen utförs i ett enda steg:

```
npm run build
  └─ next build → .build/next/standalone  (utdata från Next.js)
  └─ assembleStandalone()                 (kopierar fristående paket + statiska filer + offentliga filer + systemspecifika resurser)
       └─ utdata: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` rensar dessutom båda katalogerna först och skriver
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) som en kontrollmarkör för driftsättningens integritet.

`npm run build:contributor` använder byggprofilen enbart för backend. Den ersätter tillfälligt
kontrollpanelens UI-filer med stubbar under bygget, behåller API-rutthanterarna och återställer originalfilerna
efter bygget. Använd `npm run build` för ändringar som påverkar kontrollpanelens UI eller för fullständig
versionsvalidering; bidragsgivarprofilen ersätter inte versionsbygget.

> **Anmärkning om driftsättning på VPS:** fjärrbildens katalog `/usr/lib/node_modules/omniroute/app/`
> är oförändrad. Driftsättningsverktygen använder rsync för att synkronisera innehållet i `dist/` till den.
> Endast sökvägen för byggutdata i kodförrådet har ändrats (`app/` → `dist/`).

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

## Projektstruktur

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Kontrollpanelsidor (23 sektioner)
│   ├── api/                # API-rutter (51 kataloger)
│   └── login/              # Autentiseringssidor (.tsx)
├── domain/                 # Policymotor (policyEngine, comboResolver, costRules osv.)
├── lib/                    # Central affärslogik (.ts)
│   ├── a2a/                # Server för Agent-to-Agent v0.3-protokollet
│   ├── acp/                # Register för Agent Communication Protocol
│   ├── compliance/         # Policymotor för regelefterlevnad
│   ├── db/                 # SQLite-domänmoduler + 130 migreringar
│   ├── memory/             # Beständigt konversationsminne
│   ├── oauth/              # OAuth-leverantörer, tjänster och verktyg
│   ├── skills/             # Utbyggbart färdighetsramverk
│   ├── usage/              # Användningsspårning och kostnadsberäkning
│   └── localDb.ts          # Endast lager för återexport — lägg aldrig till logik här
├── middleware/              # Middleware för begäranden (promptInjectionGuard)
├── mitm/                   # MITM-proxy (certifikat, DNS, målroutning)
├── shared/
│   ├── components/         # React-komponenter (.tsx)
│   ├── constants/          # Leverantörsdefinitioner (329), MCP-omfattningar, 21 routningsstrategier
│   ├── utils/              # Kretsbrytare, sanerare, autentiseringshjälpare
│   └── validation/         # Zod v4-scheman
└── sse/                    # SSE-proxypipeline

open-sse/                   # @omniroute/open-sse-arbetsyta
├── executors/              # 150 exekveringsmoduler (exekveringsklasser + leverantörsspecifika hjälpare)
├── handlers/               # 11 begärandehanterare (chatt, svar, inbäddningar, bilder osv.)
├── mcp-server/             # MCP-server (110 unika verktyg, 3 transporter, 33 omfattningar)
├── services/               # 178 tjänster på toppnivå (combo, autoCombo, rateLimitManager osv.)
├── translator/             # Formatöversättare (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformerare för Responses API
└── utils/                  # 22 verktygsmoduler (strömning, TLS, proxy, loggning)

electron/                   # Electron-skrivbordsapp (plattformsoberoende)

tests/
├── unit/                   # Node.js-testkörare (1 574 testfiler)
├── integration/            # Integrationstester
├── e2e/                    # Playwright-tester
├── security/               # Säkerhetstester
├── translator/             # Översättarspecifika tester
└── load/                   # Belastningstester

docs/
├── adr/                     # Arkitekturbeslutsdokument
├── architecture/            # Systemarkitektur och motståndskraft
├── comparison/              # OmniRoute jämfört med alternativ
├── compression/             # Komprimeringsguider och regler
├── dev/                     # Utvecklingsguider
├── diagrams/                # Arkitekturdiagram
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Användarguide, Docker, konfiguration, felsökning
├── i18n/                    # Internationaliserade README-översättningar
├── marketing/               # Marknadsföringsmaterial
├── ops/                     # Driftsättning, proxy, täckning, utgåvor
├── providers/               # Leverantörsspecifik dokumentation
├── reference/               # API-referens, miljövariabler, CLI-verktyg, kostnadsfria nivåer
├── releases/                # Versionsinformation
├── routing/                 # Automatisk kombinationsmotor, återuppspelning av resonemang
├── screenshots/             # Skärmbilder av kontrollpanelen
├── security/                # Skyddsräcken, regelefterlevnad, smygläge, token
└── specs/                   # Designspecifikationer
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

- [ ] Testerna godkänns (`npm test`)
- [ ] Lintningen godkänns (`npm run lint`)
- [ ] Bygget lyckas (`npm run build`)
- [ ] TypeScript-typer har lagts till för nya publika funktioner och gränssnitt
- [ ] Inga hårdkodade hemligheter eller reservvärden
- [ ] Publika autentiseringsuppgifter för uppströmskällor bäddas in via `resolvePublicCred()` (se [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), aldrig som literaler
- [ ] Felsvar hanteras via `buildErrorBody()` / `sanitizeErrorMessage()` — inga råa stackspårningar i svarskroppar (se [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Skalkommandon (`exec` / `spawn`) skickar körtidsvärden via `env`, inte via stränginterpolering
- [ ] Alla indata valideras med Zod-scheman
- [ ] Ett **fragment** för ändringsloggen har lagts till under `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` för användarsynliga ändringar (se [`changelog.d/README.md`](./changelog.d/README.md)) — redigera **inte** `CHANGELOG.md` direkt; fragmenten sammanställs vid lansering och orsakar aldrig konflikter mellan pull requests
- [ ] Dokumentationen har uppdaterats (om tillämpligt)
- [ ] Inga nya CodeQL-/Secret-Scanning-varningar har skapats, eller så har var och en avfärdats med en teknisk motivering som hänvisar till relevant dokument under `docs/security/`
- [ ] Rutter som startar underordnade processer (`/api/mcp/`, `/api/cli-tools/runtime/`) har klassificerats som `isLocalOnlyPath()` i `src/server/authz/routeGuard.ts` — se [Hård regel nr 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Inga `Co-authored-by`-trailrar för AI/botar i commit-meddelanden (Hård regel nr 16) — mänskliga medarbetare vars arbete återanvänds krediteras med vanliga `Co-authored-by: Name <email>`-trailrar

---

## Lansering

Lanseringar hanteras via arbetsflödet `/generate-release`. När en ny GitHub Release skapas publiceras paketet **automatiskt till npm** via GitHub Actions.

För distributioner till VPS använder du `npm run build:release` (inte `npm run build`) – det utför en ren ombyggnad, sammanställer paketet i `dist/` och skriver sentinel-filen `dist/BUILD_SHA`.
Använd sedan färdigheterna `/deploy-vps-*-cc`, som synkroniserar `dist/` med fjärrkatalogen `app/` via rsync.

---

## Få hjälp

- **Arkitektur**: Se [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referens**: Se [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Säkerhetsdokumentation**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Driftdokumentation**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemrapporter**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
