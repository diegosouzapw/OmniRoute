# CLAUDE.md (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Denne filen gir veiledning til Claude Code (claude.ai/code) når du arbeider med kode i dette depotet.

## Rask start

```bash
npm install                    # Installer avhengigheter (genererer automatisk .env fra .env.example)
npm run dev                    # Utviklingsserver på http://localhost:20128
npm run build                  # Produksjonsbygg (Next.js 16 standalone)
npm run lint                   # ESLint (0 feil forventet; advarsler er eksisterende)
npm run typecheck:core         # TypeScript-sjekk (bør være ren)
npm run typecheck:noimplicit:core  # Streng sjekk (ingen implicit any)
npm run test:coverage          # Enhetstester + dekning (75/75/75/70 — utsagn/linjer/funksjoner/grener)
npm run check                  # lint + test kombinert
npm run check:cycles           # Oppdag sirkulære avhengigheter
```

### Kjøring av tester

```bash
# Enkel testfil (Node.js innebygd testkjører — de fleste tester)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# Alle suite
npm run test:all
```

For full testmatrise, se `CONTRIBUTING.md` → "Kjøring av tester". For dyp arkitektur, se `AGENTS.md`.

---

## Prosjektet i et nøtteskall

**OmniRoute** — enhetlig AI proxy/ruter. Ett endepunkt, 160+ LLM-leverandører, automatisk fallback.

| Lag             | Sted                    | Formål                                                                  |
| --------------- | ----------------------- | ----------------------------------------------------------------------- |
| API-ruter       | `src/app/api/v1/`       | Next.js App Router — inngangspunkter                                    |
| Håndterere      | `open-sse/handlers/`    | Behandling av forespørsel (chat, embeddings, osv.)                      |
| Utøvere         | `open-sse/executors/`   | Leverandørspesifikk HTTP-dispatch                                       |
| Oversettere     | `open-sse/translator/`  | Formatkonvertering (OpenAI↔Claude↔Gemini)                               |
| Transformer     | `open-sse/transformer/` | Respons API ↔ Chat Fullføringer                                         |
| Tjenester       | `open-sse/services/`    | Kombinasjonsruting, hastighetsbegrensninger, caching, osv.              |
| Database        | `src/lib/db/`           | SQLite domene moduler (45+ filer, 55 migrasjoner)                       |
| Domene/Politikk | `src/domain/`           | Politikkmotor, kostnadsregler, fallback-logikk                          |
| MCP-server      | `open-sse/mcp-server/`  | 37 verktøy (30 base + 3 minne + 4 ferdigheter), 3 transport, ~13 omfang |
| A2A-server      | `src/lib/a2a/`          | JSON-RPC 2.0 agentprotokoll                                             |
| Ferdigheter     | `src/lib/skills/`       | Utvidbar ferdighetsrammeverk                                            |
| Minne           | `src/lib/memory/`       | Vedvarende samtaleminne                                                 |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine arbeidsområde), `electron/` (desktop app), `tests/`, `bin/` (CLI inngangspunkt).

---

## Forespørsel Pipeline

```
Klient → /v1/chat/completions (Next.js rute)
  → CORS → Zod validering → auth? → policy sjekk → prompt injeksjonsbeskyttelse
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache sjekk → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per mål
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → respons oversettelse → SSE strøm eller JSON
    → Hvis Responses API: responsesTransformer.ts TransformStream
```

API-ruter følger et konsistent mønster: `Rute → CORS preflight → Zod body validering → Valgfri auth (extractApiKey/isValidApiKey) → API-nøkkel policy håndheving → Handler delegasjon (open-sse)`. Ingen global Next.js middleware — avbrudd er rute-spesifikk.

**Combo routing** (`open-sse/services/combo.ts`): 14 strategier (prioritet, vektet, fyll-først, rund-robin, P2C, tilfeldig, minst-brukt, kostnadsoptimalisert, reset-bevisst, streng-tilfeldig, auto, lkgp, kontekst-optimalisert, kontekst-rele). Hvert mål kaller `handleSingleModel()` som omslutter `handleChatCore()` med per-mål feilhåndtering og kretsbryter sjekker. Se `docs/routing/AUTO-COMBO.md` for 9-faktor Auto-Combo poengsetting og `docs/architecture/RESILIENCE_GUIDE.md` for de 3 motstandsdyktighetslagene.

---

## Motstandsdyktighet Kjøretid Tilstand

OmniRoute har tre relaterte, men distinkte mekanismer for midlertidig feil. Hold deres
omfang adskilt når du feilsøker rutingadferd. Se den
[3-lags motstandsdyktighetsdiagram](./docs/diagrams/exported/resilience-3layers.svg)
(kilde: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
for et oversiktskart.

### Leverandør Kretsbryter

**Omfang**: hele leverandøren, f.eks. `glm`, `openai`, `anthropic`.

**Formål**: stoppe sending av trafikk til en leverandør som gjentatte ganger feiler på
upstream/tjenestenivå, slik at en usunn leverandør ikke bremser ned hver forespørsel.

**Implementering**:

- Kjerneklasse: `src/shared/utils/circuitBreaker.ts`
- Chat gate/utførelsesledninger: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Kjøretidsstatus API: `src/app/api/monitoring/health/route.ts`
- Delte omslag: `open-sse/services/accountFallback.ts`
- Persistert tilstandstabell: `domain_circuit_breakers`

**Stater**:

- `CLOSED`: normal trafikk er tillatt.
- `OPEN`: leverandøren er midlertidig blokkert; innringere får et provider-krets-åpen svar
  eller combo routing hopper til et annet mål.
- `HALF_OPEN`: reset timeout har utløpt; tillat en probe forespørsel. Succes lukker
  bryteren, feil åpner den igjen.

**Standarder** (`open-sse/config/constants.ts`):

- OAuth-leverandører: terskel `3`, reset timeout `60s`.
- API-nøkkel leverandører: terskel `5`, reset timeout `30s`.
- Lokale leverandører: terskel `2`, reset timeout `15s`.

Bare leverandør-nivå feilstater bør utløse leverandørbryteren:

```ts
(408, 500, 502, 503, 504);
```

Ikke utløse hele-leverandørbryteren for normale konto/nøkkel/modellfeil som de fleste
`401`, `403`, eller `429` tilfeller. De tilhører vanligvis tilkoblings cooldown eller modell
låsing. En generell API-nøkkel leverandør `403` bør være gjenopprettbar med mindre den er klassifisert
som en terminal leverandør/konto feil.

Bryteren bruker lat recovery, ikke en bakgrunnstimer. Når `OPEN` utløper, leser som
`getStatus()`, `canExecute()`, og `getRetryAfterMs()` oppdaterer tilstanden til
`HALF_OPEN`, slik at dashbord og combo kandidatbyggere ikke fortsetter å ekskludere en
utløpt leverandør for alltid.

### Tilkoblings Cooldown

**Omfang**: én leverandør tilkobling/konto/nøkkel.

**Formål**: midlertidig hoppe over en dårlig nøkkel/konto mens andre tilkoblinger for
den samme leverandøren kan fortsette å betjene forespørselene.

**Implementering**:

- Skriv/oppdater sti: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoseleksjon/filtering: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown beregning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Innstillinger: `src/lib/resilience/settings.ts`

Viktige felt på leverandørtilkoblinger:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontoseleksjon, blir en tilkobling hoppet over mens:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns er også late: når `rateLimitedUntil` er i fortiden, blir tilkoblingen
berettiget igjen. Ved vellykket bruk, `clearAccountError()` fjerner `testStatus`,
`rateLimitedUntil`, feilkoder, og `backoffLevel`.

Standard tilkoblings cooldown oppførsel:

- OAuth grunn cooldown: `5s`.
- API-nøkkel grunn cooldown: `3s`.
- API-nøkkel `429` bør foretrekke upstream retry hints (`Retry-After`, reset headers, eller
  parsebar reset tekst) når tilgjengelig.
- Gjentatte gjenopprettbare feil bruker eksponentiell backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd beskyttelsen forhindrer samtidige feil på samme tilkobling fra
gjentatte ganger å forlenge cooldown eller doble-incrementere `backoffLevel`.

Terminalstater er ikke cooldowns. `banned`, `expired`, og `credits_exhausted` er
ment å forbli utilgjengelige inntil legitimasjon/innstillinger endres eller en operatør tilbakestiller
dem. Ikke overskriv terminalstater med midlertidig cooldown tilstand.

### Modell Låsing

**Omfang**: leverandør + tilkobling + modell.

**Formål**: unngå å deaktivere en hel tilkobling når bare én modell er utilgjengelig eller
kvote-limite for den tilkoblingen.

Eksempler:

- Per-modell kvote leverandører som returnerer `429`.
- Lokale leverandører som returnerer `404` for én manglende modell.
- Leverandør-spesifikke modus/modell tillatelsesfeil som valgte Grok-moduser.

Modell låsing lever i `open-sse/services/accountFallback.ts` og lar den samme
tilkoblingen fortsette å betjene andre modeller.

### Feilsøkingsveiledning

- Hvis alle nøkler for en leverandør blir hoppet over, inspiser både leverandørbryter tilstand og hver
  tilkoblings `rateLimitedUntil`/`testStatus`.
- Hvis en leverandør ser ut til å være permanent ekskludert etter resetvinduet, sjekk om koden
  leser rå `state` i stedet for å bruke `getStatus()`/`canExecute()`.
- Hvis én leverandørnøkkel feiler, men andre bør fungere, foretrekk tilkoblings cooldown over
  leverandørbryteren.
- Hvis bare én modell feiler, foretrekk modell låsing over tilkoblings cooldown.
- Hvis en tilstand skal selv-gjenopprette, bør den ha et fremtidig tidsstempel/reset timeout og en
  lesevei som oppdaterer utløpt tilstand. Permanente statuser krever manuelle legitimasjon
  eller konfigurasjonsendringer.

## Nøkkelkonvensjoner

### Kode Stil

- **2 mellomrom**, semikolon, doble anførselstegn, 100 tegn bredde, es5 trailing commas (håndhevet av lint-staged via Prettier)
- **Imports**: ekstern → intern (`@/`, `@omniroute/open-sse`) → relativ
- **Navngivning**: filer=camelCase/kebab, komponenter=PascalCase, konstanter=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = feil overalt; `no-explicit-any` = advarsel i `open-sse/` og `tests/`
- **TypeScript**: `strict: false`, mål ES2022, modul esnext, oppløsning bundler. Foretrekk eksplisitte typer.

### Database

- **Alltid** gå gjennom `src/lib/db/` domenemoduler — **aldri** skriv rå SQL i ruter eller håndterere
- **Aldri** legg til logikk i `src/lib/localDb.ts` (re-export lag kun)
- **Aldri** barrel-import fra `localDb.ts` — importer spesifikke `db/` moduler i stedet
- DB singleton: `getDbInstance()` fra `src/lib/db/core.ts` (WAL journaling)
- Migrasjoner: `src/lib/db/migrations/` — versjonerte SQL-filer, idempotente, kjør i transaksjoner

### Feilhåndtering

- try/catch med spesifikke feiltyper, logg med pino kontekst
- Aldri sluk feil i SSE-strømmer — bruk abortsignaler for opprydding
- Returner riktige HTTP-statuskoder (4xx/5xx)

### Sikkerhet

- **Aldri** bruk `eval()`, `new Function()`, eller implisert eval
- Valider alle innganger med Zod-skjemaer
- Krypter legitimasjon i ro (AES-256-GCM)
- Oppstrøms header denylist: `src/shared/constants/upstreamHeaders.ts` — hold sanitere, Zod-skjemaer, og enhetstester i samsvar når du redigerer
- **Offentlige oppstrøms legitimasjoner** (Gemini/Antigravity/Windsurf-stil OAuth client_id/secret + Firebase Web-nøkler hentet fra offentlige CLI-er): **MÅ** være innebygd via `resolvePublicCred()` fra `open-sse/utils/publicCreds.ts` — **aldri** som strengliteraler. Se `docs/security/PUBLIC_CREDS.md` for den obligatoriske malen.
- **Feilrespons** (HTTP / SSE / executor / MCP-håndterer): **MÅ** rutes gjennom `buildErrorBody()` eller `sanitizeErrorMessage()` fra `open-sse/utils/error.ts` — **aldri** sett rå `err.stack` eller `err.message` i en responsbody. Se `docs/security/ERROR_SANITIZATION.md`.
- **Shell-kommandoer bygget fra variabler**: når du kaller `exec()`/`spawn()` med et skript som trenger kjøretidsverdier, send dem via `env`-alternativet (shell-escaped automatisk) — **aldri** string-interpoler ubetrodde/eksterne stier inn i skriptkroppen. Referanse: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Sikre-bygge-biblioteker** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): foretrekk Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink over tilpassede implementeringer når du legger til nye sikkerhetsfølsomme flater.

---

## Vanlige Modifikasjons Scenarier

### Legge til en Ny Leverandør

1. Registrer i `src/shared/constants/providers.ts` (Zod-validert ved last)
2. Legg til executor i `open-sse/executors/` hvis tilpasset logikk er nødvendig (utvid `BaseExecutor`)
3. Legg til oversetter i `open-sse/translator/` hvis ikke-OpenAI format
4. Legg til OAuth-konfigurasjon i `src/lib/oauth/constants/oauth.ts` hvis OAuth-basert — hvis den oppstrøms CLI-en leverer en offentlig client_id/secret, innebygg via `resolvePublicCred()` (se `docs/security/PUBLIC_CREDS.md`), **aldri** som en literal
5. Registrer modeller i `open-sse/config/providerRegistry.ts`
6. Skriv tester i `tests/unit/` (inkluder publicCreds formassertion hvis du la til en ny innebygd standard)

### Legge til en Ny API Rute

1. Opprett katalog under `src/app/api/v1/your-route/`
2. Opprett `route.ts` med `GET`/`POST` håndterere
3. Følg mønster: CORS → Zod body validering → valgfri autentisering → håndterer delegasjon
4. Håndterer går i `open-sse/handlers/` (importer derfra, ikke inline)
5. Feilrespons bruker `buildErrorBody()` / `errorResponse()` fra `open-sse/utils/error.ts` (auto-sanitized — aldri sett `err.stack` eller `err.message` rått i kroppen). Se `docs/security/ERROR_SANITIZATION.md`.
6. Legg til tester — inkludert minst en påstand om at feilresponsene ikke lekker stakkspor (`!body.error.message.includes("at /")`)

### Legge til en Ny DB Modul

1. Opprett `src/lib/db/yourModule.ts` — importer `getDbInstance` fra `./core.ts`
2. Eksporter CRUD-funksjoner for din domenetabell(er)
3. Legg til migrasjon i `src/lib/db/migrations/` hvis nye tabeller er nødvendige
4. Re-export fra `src/lib/localDb.ts` (legg til i re-export listen kun)
5. Skriv tester

### Legge til et Nytt MCP Verktøy

1. Legg til verktøydefinisjon i `open-sse/mcp-server/tools/` med Zod inngangsskjema + asynkron håndterer
2. Registrer i verktøysettet (koblet av `createMcpServer()`)
3. Tildel til passende omfang
4. Skriv tester (verktøyinnkalling logget til `mcp_audit` tabell)

### Legge til en Ny A2A Ferdighet

1. Opprett ferdighet i `src/lib/a2a/skills/` (5 eksisterer allerede: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Ferdigheten mottar oppgavekontekst (meldinger, metadata) → returnerer strukturert resultat
3. Registrer i `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`
4. Eksponer i `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Skriv tester i `tests/unit/`
6. Dokumenter i `docs/frameworks/A2A-SERVER.md` ferdighetstabell

### Legge til en Ny Cloud Agent

1. Opprett agentklasse i `src/lib/cloudAgent/agents/` som utvider `CloudAgentBase` (3 eksisterer allerede: codex-cloud, devin, jules)
2. Implementer `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrer i `src/lib/cloudAgent/registry.ts`
4. Legg til OAuth/legitimasjonshåndtering hvis nødvendig (`src/lib/oauth/providers/`)
5. Tester + dokumenter i `docs/frameworks/CLOUD_AGENT.md`

### Legge til en Ny Guardrail / Eval / Ferdighet / Webhook-hendelse

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Ferdighet (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook-hendelse: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Referansedokumentasjon

For enhver ikke-triviell endring, les den tilhørende dybdeanalysen først:

| Område                                           | Dokument                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| Repo-navigasjon                                  | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arkitektur                                       | `docs/architecture/ARCHITECTURE.md`                               |
| Ingeniørreferanse                                | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktor poengsum, 14 strategier)    | `docs/routing/AUTO-COMBO.md`                                      |
| Motstandsdyktighet (3 mekanismer)                | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Resonnement replay                               | `docs/routing/REASONING_REPLAY.md`                                |
| Ferdighetsramme                                  | `docs/frameworks/SKILLS.md`                                       |
| Minne system (FTS5 + Qdrant)                     | `docs/frameworks/MEMORY.md`                                       |
| Skyagenter                                       | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Beskyttelsesrammer (PII / injeksjon / visjon)    | `docs/security/GUARDRAILS.md`                                     |
| Offentlige upstream-legitimasjoner (Gemini/osv.) | `docs/security/PUBLIC_CREDS.md`                                   |
| Rensing av feilmeldinger                         | `docs/security/ERROR_SANITIZATION.md`                             |
| Evalueringer                                     | `docs/frameworks/EVALS.md`                                        |
| Overholdelse / revisjon                          | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                         | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorisasjonspipeline                            | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingeravtrykk)                    | `docs/security/STEALTH_GUIDE.md`                                  |
| Agentprotokoller (A2A / ACP / Sky)               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP-server                                       | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A-server                                       | `docs/frameworks/A2A-SERVER.md`                                   |
| API-referanse + OpenAPI                          | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Leverandørkatalog (auto-generert)                | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Utgivelsesflyt                                   | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testing

| Hva                     | Kommando                                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| Enhetstester            | `npm run test:unit`                                                     |
| Enkel fil               | `node --import tsx/esm --test tests/unit/file.test.ts`                  |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                   |
| E2E (Playwright)        | `npm run test:e2e`                                                      |
| Protokoll E2E (MCP+A2A) | `npm run test:protocols:e2e`                                            |
| Økosystem               | `npm run test:ecosystem`                                                |
| Dekningsgrense          | `npm run test:coverage` (75/75/75/70 — utsagn/linjer/funksjoner/grener) |
| Dekningsrapport         | `npm run coverage:report`                                               |

**PR-regel**: Hvis du endrer produksjonskode i `src/`, `open-sse/`, `electron/`, eller `bin/`, må du inkludere eller oppdatere tester i samme PR.

**Testlagpreferanse**: enhet først → integrasjon (multi-modul eller DB-tilstand) → e2e (UI/arbeidsflyt kun). Kode feilreproduksjoner som automatiserte tester før eller sammen med fiksen.

**Copilot dekning policy**: Når en PR endrer produksjonskode og dekningen er under 75% (utsagn/linjer/funksjoner) eller 70% (grener), rapporter ikke bare — legg til eller oppdater tester, kjør dekningstesten på nytt, og be om bekreftelse. Inkluder kjørte kommandoer, endrede testfiler, og sluttresultatet for dekning i PR-rapporten.

---

## Git Workflow

```bash
# Aldri commit direkte til main
git checkout -b feat/your-feature
git commit -m "feat: beskriv endringen din"
git push -u origin feat/your-feature
```

**Grenprefikser**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit-format** (Conventional Commits): `feat(db): legg til kretsbryter` — omfang: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Miljø

- **Kjøretid**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES-moduler
- **TypeScript**: 5.9+, mål ES2022, modul esnext, oppløsning bundler
- **Sti-aliaser**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Standardport**: 20128 (API + dashboard på samme port)
- **Datakatalog**: `DATA_DIR` miljøvariabel, standard til `~/.omniroute/`
- **Nøkkel miljøvariabler**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Oppsett: `cp .env.example .env` og deretter generer `JWT_SECRET` (`openssl rand -base64 48`) og `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Harde regler

1. Aldri commit hemmeligheter eller legitimasjon
2. Aldri legg til logikk i `localDb.ts`
3. Aldri bruk `eval()` / `new Function()` / implisitt eval
4. Aldri commit direkte til `main`
5. Aldri skriv rå SQL i ruter — bruk `src/lib/db/` moduler
6. Aldri stilltiende sluk feil i SSE-strømmer
7. Alltid valider innganger med Zod-skjemaer
8. Alltid inkludere tester når du endrer produksjonskode
9. Dekningen må forbli ≥75% (utsagn, linjer, funksjoner) / ≥70% (grener). Nåværende målt: ~82%.
10. Aldri omgå Husky hooks (`--no-verify`, `--no-gpg-sign`) uten eksplisitt godkjenning fra operatøren.
11. Aldri innebygde offentlige upstream OAuth client_id/hemmelighet eller Firebase Web-nøkler som strenglitteraler — gå alltid gjennom `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Se `docs/security/PUBLIC_CREDS.md`.
12. Aldri returner rå `err.stack` / `err.message` i HTTP / SSE / executor-responser — alltid rute gjennom `buildErrorBody()` eller `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Se `docs/security/ERROR_SANITIZATION.md`.
13. Aldri strenge-interpolere eksterne stier eller kjøretidsverdier inn i shell-skript som sendes til `exec()`/`spawn()` — send via `env`-alternativet i stedet. Referanse: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Aldri avvis en CodeQL / Secret-Scanning varsling uten (a) først å sjekke mønsterdokumentene ovenfor for å se om hjelpen gjelder, og (b) registrere den tekniske begrunnelsen i avvisningskommentaren. Presedens: `js/stack-trace-exposure` hevet på kallsteder som allerede ruter gjennom `sanitizeErrorMessage()` er en kjent CodeQL-begrensning (tilpassede sanitizere ikke gjenkjent) — avvis som `false positive` med referanse til `docs/security/ERROR_SANITIZATION.md`.
15. Aldri eksponer ruter som starter barneprosesser (`/api/mcp/`, `/api/cli-tools/runtime/`) uten `isLocalOnlyPath()` klassifisering i `src/server/authz/routeGuard.ts`. Loopback-håndheving skjer ubetinget før noen autentisering sjekk — lekket JWT via tunnel kan ikke utløse prosessstart. Se `docs/security/ROUTE_GUARD_TIERS.md`.
16. Aldri inkluder `Co-Authored-By` trailers i commit-meldinger. Commits må vises utelukkende under repository-eierens Git-identitet (`diegosouzapw`). Linjen `Co-Authored-By: Claude …` får GitHub til å tilskrive commits til `claude` Anthropic-kontoen, og skjuler den virkelige forfatteren i PR-historikken.
