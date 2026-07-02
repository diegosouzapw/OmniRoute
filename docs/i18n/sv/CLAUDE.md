# CLAUDE.md (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Denna fil ger vägledning till Claude Code (claude.ai/code) när man arbetar med kod i detta repository.

## Snabbstart

```bash
npm install                    # Installera beroenden (auto-genererar .env från .env.example)
npm run dev                    # Utvecklingsserver på http://localhost:20128
npm run build                  # Produktionsbyggnad (Next.js 16 fristående)
npm run lint                   # ESLint (0 fel förväntas; varningar är förhandsbefintliga)
npm run typecheck:core         # TypeScript-kontroll (ska vara ren)
npm run typecheck:noimplicit:core  # Strikt kontroll (inga implicita any)
npm run test:coverage          # Enhetstester + täckningsgräns (75/75/75/70 — satser/rader/funktioner/grenar)
npm run check                  # lint + test kombinerat
npm run check:cycles           # Upptäck cirkulära beroenden
```

### Köra Tester

```bash
# Enstaka testfil (Node.js inbyggda testköraren — de flesta tester)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP-server, autoCombo, cache)
npm run test:vitest

# Alla sviter
npm run test:all
```

För full testmatris, se `CONTRIBUTING.md` → "Köra Tester". För djup arkitektur, se `AGENTS.md`.

---

## Projekt i Korthet

**OmniRoute** — enad AI-proxy/router. En slutpunkt, 160+ LLM-leverantörer, automatisk återkoppling.

| Lager        | Plats                   | Syfte                                                                     |
| ------------ | ----------------------- | ------------------------------------------------------------------------- |
| API-rutter   | `src/app/api/v1/`       | Next.js App Router — ingångspunkter                                       |
| Handlers     | `open-sse/handlers/`    | Begärningsbehandling (chatt, inbäddningar, etc)                           |
| Executors    | `open-sse/executors/`   | Leverantörsspecifik HTTP-dispatch                                         |
| Translators  | `open-sse/translator/`  | Formatkonvertering (OpenAI↔Claude↔Gemini)                                 |
| Transformer  | `open-sse/transformer/` | Svar API ↔ Chattkompletteringar                                           |
| Tjänster     | `open-sse/services/`    | Kombinationsrouting, hastighetsgränser, caching, etc                      |
| Databas      | `src/lib/db/`           | SQLite domänmoduler (45+ filer, 55 migrationer)                           |
| Domän/Policy | `src/domain/`           | Policy-motor, kostnadsregler, återkopplingslogik                          |
| MCP-server   | `open-sse/mcp-server/`  | 37 verktyg (30 bas + 3 minne + 4 färdigheter), 3 transporter, ~13 områden |
| A2A-server   | `src/lib/a2a/`          | JSON-RPC 2.0 agentprotokoll                                               |
| Färdigheter  | `src/lib/skills/`       | Utbyggbar färdighetsramverk                                               |
| Minne        | `src/lib/memory/`       | Persistent konversationsminne                                             |

Monorepo: `src/` (Next.js 16-app), `open-sse/` (streaming engine arbetsyta), `electron/` (skrivbordsapp), `tests/`, `bin/` (CLI-ingångspunkt).

---

## Begärningspipeline

```
Klient → /v1/chat/completions (Next.js-rutt)
  → CORS → Zod-validering → autentisering? → policykontroll → skydd mot promptinjektion
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cachekontroll → hastighetsbegränsning → kombinationsrouting?
      → resolveComboTargets() → handleSingleModel() per mål
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → svaröversättning → SSE-ström eller JSON
    → Om Responses API: responsesTransformer.ts TransformStream
```

API-rutter följer ett konsekvent mönster: `Rutt → CORS preflight → Zod kroppvalidering → Valfri autentisering (extractApiKey/isValidApiKey) → Tillämpning av API-nyckelpolicy → Hanterardelning (open-sse)`. Ingen global Next.js-mellanprogram — avlyssning är rutt-specifik.

**Kombinationsrouting** (`open-sse/services/combo.ts`): 14 strategier (prioritet, viktad, fyll-först, rund-robin, P2C, slumpmässig, minst-använd, kostnadsoptimerad, reset-medveten, strikt-slumpmässig, auto, lkgp, kontext-optimerad, kontext-relä). Varje mål anropar `handleSingleModel()` som omsluter `handleChatCore()` med felhantering per mål och kretsbrytarkontroller. Se `docs/routing/AUTO-COMBO.md` för 9-faktors Auto-Combo poängsättning och `docs/architecture/RESILIENCE_GUIDE.md` för de 3 motståndslager.

---

## Motstånds Runtime-tillstånd

OmniRoute har tre relaterade men distinkta mekanismer för tillfälliga fel. Håll deras
omfång separerat när du felsöker routingbeteende. Se
[3-lagers motståndsdiagram](./docs/diagrams/exported/resilience-3layers.svg)
(källa: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
för en översiktlig karta.

### Leverantörs Kretsbrytare

**Omfång**: hela leverantören, t.ex. `glm`, `openai`, `anthropic`.

**Syfte**: stoppa trafiken till en leverantör som upprepade gånger misslyckas på
upstream/tjänstenivå, så att en ohälsosam leverantör inte saktar ner varje begäran.

**Implementering**:

- Kärnklass: `src/shared/utils/circuitBreaker.ts`
- Chatport/görande koppling: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime-status API: `src/app/api/monitoring/health/route.ts`
- Delade omslag: `open-sse/services/accountFallback.ts`
- Persistenta tillståndstabell: `domain_circuit_breakers`

**Tillstånd**:

- `CLOSED`: normal trafik är tillåten.
- `OPEN`: leverantören är tillfälligt blockerad; anroparna får ett provider-circuit-open-svar
  eller kombinationsrouting hoppar till ett annat mål.
- `HALF_OPEN`: återställningstidsgränsen har löpt ut; tillåt en provbegäran. Framgång stänger
  brytaren, misslyckande öppnar den igen.

**Standarder** (`open-sse/config/constants.ts`):

- OAuth-leverantörer: tröskel `3`, återställningstidsgräns `60s`.
- API-nyckelleverantörer: tröskel `5`, återställningstidsgräns `30s`.
- Lokala leverantörer: tröskel `2`, återställningstidsgräns `15s`.

Endast leverantörsnivåfelstatusar bör utlösa leverantörsbrytaren:

```ts
(408, 500, 502, 503, 504);
```

Utlösa inte hela leverantörsbrytaren för normala konto/nyckel/modellfel som de flesta
`401`, `403`, eller `429` fallen. Dessa tillhör vanligtvis anslutningskylning eller modell
låsningsproblem. En generell API-nyckelleverantör `403` bör vara återställbar om den inte klassificeras
som ett terminalt leverantörs-/konto-fel.

Brytaren använder lat återhämtning, inte en bakgrundstimer. När `OPEN` löper ut, läser sådana
som `getStatus()`, `canExecute()`, och `getRetryAfterMs()` uppdaterar tillståndet till
`HALF_OPEN`, så att instrumentpaneler och kombinationskandidatsbyggare inte fortsätter att utesluta en
utgången leverantör för alltid.

### Anslutningskylning

**Omfång**: en leverantörsanslutning/konto/nyckel.

**Syfte**: tillfälligt hoppa över en dålig nyckel/konto medan andra anslutningar för
samma leverantör kan fortsätta att betjäna begärningar.

**Implementering**:

- Skriv/uppdatera väg: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoval/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Kylberäkning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Inställningar: `src/lib/resilience/settings.ts`

Viktiga fält på leverantörsanslutningar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontovalet, hoppar en anslutning över medan:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Kylningar är också lata: när `rateLimitedUntil` är i det förflutna, blir anslutningen
berättigad igen. Vid framgångsrik användning, `clearAccountError()` rensar `testStatus`,
`rateLimitedUntil`, felfält och `backoffLevel`.

Standardbeteende för anslutningskylning:

- OAuth grundkylning: `5s`.
- API-nyckel grundkylning: `3s`.
- API-nyckel `429` bör föredra upstream retry-hints (`Retry-After`, återställningshuvuden, eller
  parsbar återställningstext) när det är tillgängligt.
- Upprepade återställbara fel använder exponentiell backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd-skyddet förhindrar samtidiga fel på samma anslutning från
upprepade gånger förlänga kylningen eller dubbelt öka `backoffLevel`.

Terminala tillstånd är inte kylningar. `banned`, `expired`, och `credits_exhausted` är
avsedda att förbli otillgängliga tills autentiseringsuppgifter/inställningar ändras eller en operatör återställer
dem. Överskriv inte terminala tillstånd med tillfälligt kylningstillstånd.

### Modellåsningsproblem

**Omfång**: leverantör + anslutning + modell.

**Syfte**: undvika att inaktivera en hel anslutning när endast en modell är otillgänglig eller
kvotbegränsad för den anslutningen.

Exempel:

- Per-modell kvotleverantörer som returnerar `429`.
- Lokala leverantörer som returnerar `404` för en saknad modell.
- Leverantörsspecifika läge/modellbehörighetsfel som valda Grok-lägen.

Modellåsningsproblem finns i `open-sse/services/accountFallback.ts` och låter samma
anslutning fortsätta betjäna andra modeller.

### Felsökningsvägledning

- Om alla nycklar för en leverantör hoppar över, inspektera både leverantörsbrytarens tillstånd och varje
  anslutnings `rateLimitedUntil`/`testStatus`.
- Om en leverantör verkar permanent utesluten efter återställningsfönstret, kontrollera om koden
  läser rå `state` istället för att använda `getStatus()`/`canExecute()`.
- Om en leverantörsnyckel misslyckas men andra bör fungera, föredra anslutningskylning över
  leverantörsbrytaren.
- Om endast en modell misslyckas, föredra modellåsningsproblem över anslutningskylning.
- Om ett tillstånd bör självåterhämta sig, bör det ha en framtida tidsstämpel/återställningstidsgräns och en
  läsväg som uppdaterar utgångna tillstånd. Permanenta statusar kräver manuella autentiserings-
  eller konfigurationsändringar.

## Nyckelkonventioner

### Kodstil

- **2 mellanslag**, semikolon, dubbla citattecken, 100 tecken bredd, es5 avslutande komman (tvingas av lint-staged via Prettier)
- **Importeringar**: extern → intern (`@/`, `@omniroute/open-sse`) → relativ
- **Namngivning**: filer=camelCase/kebab, komponenter=PascalCase, konstanter=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = fel överallt; `no-explicit-any` = varna i `open-sse/` och `tests/`
- **TypeScript**: `strict: false`, mål ES2022, modul esnext, upplösning bundlare. Föredra explicita typer.

### Databas

- **Gå alltid** igenom `src/lib/db/` domänmoduler — **skriv aldrig** rå SQL i rutter eller hanterare
- **Lägg aldrig** till logik i `src/lib/localDb.ts` (endast re-exporteringslager)
- **Lägg aldrig** barrel-import från `localDb.ts` — importera specifika `db/` moduler istället
- DB singleton: `getDbInstance()` från `src/lib/db/core.ts` (WAL journaling)
- Migrationer: `src/lib/db/migrations/` — versionerade SQL-filer, idempotenta, körs i transaktioner

### Felhantering

- try/catch med specifika feltyper, logga med pino-kontext
- Svälj aldrig fel i SSE-strömmar — använd avbryt-signaler för städning
- Återvänd korrekta HTTP-statuskoder (4xx/5xx)

### Säkerhet

- **Använd aldrig** `eval()`, `new Function()`, eller implicit eval
- Validera alla indata med Zod-scheman
- Kryptera autentiseringsuppgifter i vila (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — håll sanera, Zod-scheman och enhetstester i linje vid redigering
- **Offentliga upstream-autentiseringsuppgifter** (Gemini/Antigravity/Windsurf-stil OAuth client_id/secret + Firebase Web-nycklar extraherade från offentliga CLI:er): **MÅSTE** inbäddas via `resolvePublicCred()` från `open-sse/utils/publicCreds.ts` — **aldrig** som strängliteral. Se `docs/security/PUBLIC_CREDS.md` för det obligatoriska mönstret.
- **Felrespons** (HTTP / SSE / exekutor / MCP-hanterare): **MÅSTE** routas genom `buildErrorBody()` eller `sanitizeErrorMessage()` från `open-sse/utils/error.ts` — **aldrig** sätt rå `err.stack` eller `err.message` i en responskropp. Se `docs/security/ERROR_SANITIZATION.md`.
- **Shell-kommandon byggda från variabler**: när du anropar `exec()`/`spawn()` med ett skript som behöver runtime-värden, skicka dem via `env`-alternativet (shell-escapade automatiskt) — **aldrig** sträng-interpolera otillförlitliga/externa sökvägar i skriptkroppen. Referens: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Säkra som standard-bibliotek** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): föredra Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink framför anpassade implementationer när du lägger till nya säkerhetskänsliga ytor.

---

## Vanliga modifieringsscenarier

### Lägga till en ny leverantör

1. Registrera i `src/shared/constants/providers.ts` (Zod-validerad vid laddning)
2. Lägg till exekutor i `open-sse/executors/` om anpassad logik behövs (utöka `BaseExecutor`)
3. Lägg till översättare i `open-sse/translator/` om icke-OpenAI-format
4. Lägg till OAuth-konfiguration i `src/lib/oauth/constants/oauth.ts` om OAuth-baserad — om upstream CLI skickar en offentlig client_id/secret, inbädda via `resolvePublicCred()` (se `docs/security/PUBLIC_CREDS.md`), **aldrig** som en literal
5. Registrera modeller i `open-sse/config/providerRegistry.ts`
6. Skriv tester i `tests/unit/` (inkludera den publicCreds-formen om du har lagt till en ny inbäddad standard)

### Lägga till en ny API-rutt

1. Skapa katalog under `src/app/api/v1/your-route/`
2. Skapa `route.ts` med `GET`/`POST` hanterare
3. Följ mönster: CORS → Zod kroppvalidering → valfri autentisering → hanterardelning
4. Hanteraren går i `open-sse/handlers/` (importera därifrån, inte inline)
5. Felrespons använder `buildErrorBody()` / `errorResponse()` från `open-sse/utils/error.ts` (auto-sanitized — sätt aldrig `err.stack` eller `err.message` rått i kroppen). Se `docs/security/ERROR_SANITIZATION.md`.
6. Lägg till tester — inklusive minst en bekräftelse på att felrespons inte läcker stackspår (`!body.error.message.includes("at /")`)

### Lägga till en ny DB-modul

1. Skapa `src/lib/db/yourModule.ts` — importera `getDbInstance` från `./core.ts`
2. Exportera CRUD-funktioner för din domäntabell(er)
3. Lägg till migration i `src/lib/db/migrations/` om nya tabeller behövs
4. Re-exportera från `src/lib/localDb.ts` (lägg till i re-exportlistan endast)
5. Skriv tester

### Lägga till ett nytt MCP-verktyg

1. Lägg till verktygsdefinition i `open-sse/mcp-server/tools/` med Zod indata-schema + asynkron hanterare
2. Registrera i verktygsuppsättningen (kopplad av `createMcpServer()`)
3. Tilldela till lämpliga omfattningar
4. Skriv tester (verktygsanrop loggas till `mcp_audit`-tabellen)

### Lägga till en ny A2A-färdighet

1. Skapa färdighet i `src/lib/a2a/skills/` (5 finns redan: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Färdigheten får uppgiftskontext (meddelanden, metadata) → returnerar strukturerat resultat
3. Registrera i `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`
4. Exponera i `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Skriv tester i `tests/unit/`
6. Dokumentera i `docs/frameworks/A2A-SERVER.md` färdighets-tabellen

### Lägga till en ny molnagent

1. Skapa agentklass i `src/lib/cloudAgent/agents/` som utökar `CloudAgentBase` (3 finns redan: codex-cloud, devin, jules)
2. Implementera `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrera i `src/lib/cloudAgent/registry.ts`
4. Lägg till OAuth/autentiseringshantering om det behövs (`src/lib/oauth/providers/`)
5. Tester + dokumentera i `docs/frameworks/CLOUD_AGENT.md`

### Lägga till en ny guardrail / eval / färdighet / webhook-händelse

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Färdighet (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook-händelse: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Referensdokumentation

För alla icke-triviala ändringar, läs den matchande djupdykningen först:

| Område                                              | Dokument                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| Repo-navigering                                     | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arkitektur                                          | `docs/architecture/ARCHITECTURE.md`                               |
| Ingenjörsreferens                                   | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktors poängsättning, 14 strategier) | `docs/routing/AUTO-COMBO.md`                                      |
| Motståndskraft (3 mekanismer)                       | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Resonansåterspel                                    | `docs/routing/REASONING_REPLAY.md`                                |
| Kompetensramverk                                    | `docs/frameworks/SKILLS.md`                                       |
| Minnessystem (FTS5 + Qdrant)                        | `docs/frameworks/MEMORY.md`                                       |
| Molnagenter                                         | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Skyddsräcken (PII / injektion / vision)             | `docs/security/GUARDRAILS.md`                                     |
| Offentliga uppströmsreferenser (Gemini/etc.)        | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitering av felmeddelanden                        | `docs/security/ERROR_SANITIZATION.md`                             |
| Utvärderingar                                       | `docs/frameworks/EVALS.md`                                        |
| Efterlevnad / revision                              | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                            | `docs/frameworks/WEBHOOKS.md`                                     |
| Auktoriseringspipeline                              | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingeravtryck)                       | `docs/security/STEALTH_GUIDE.md`                                  |
| Agentprotokoll (A2A / ACP / Moln)                   | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP-server                                          | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A-server                                          | `docs/frameworks/A2A-SERVER.md`                                   |
| API-referens + OpenAPI                              | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Leverantörskatalog (automatiskt genererad)          | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Utgivningsflöde                                     | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testning

| Vad                     | Kommando                                                                   |
| ----------------------- | -------------------------------------------------------------------------- |
| Enhetstester            | `npm run test:unit`                                                        |
| Enskild fil             | `node --import tsx/esm --test tests/unit/file.test.ts`                     |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                      |
| E2E (Playwright)        | `npm run test:e2e`                                                         |
| Protokoll E2E (MCP+A2A) | `npm run test:protocols:e2e`                                               |
| Ekosystem               | `npm run test:ecosystem`                                                   |
| Täckningsgräns          | `npm run test:coverage` (75/75/75/70 — uttalanden/rader/funktioner/grenar) |
| Täckningsrapport        | `npm run coverage:report`                                                  |

**PR-regel**: Om du ändrar produktionskod i `src/`, `open-sse/`, `electron/` eller `bin/`, måste du inkludera eller uppdatera tester i samma PR.

**Testlagerpreferens**: enhet först → integration (multi-modul eller DB-tillstånd) → e2e (UI/arbetsflöde endast). Koda buggreproduktioner som automatiserade tester före eller tillsammans med fixen.

**Copilot täckningspolicy**: När en PR ändrar produktionskod och täckningen är under 75% (uttalanden/rader/funktioner) eller 70% (grenar), rapportera inte bara — lägg till eller uppdatera tester, kör täckningsgränsen igen, och be sedan om bekräftelse. Inkludera körda kommandon, ändrade testfiler och slutlig täckningsresultat i PR-rapporten.

---

## Git Arbetsflöde

```bash
# Kom aldrig direkt till main
git checkout -b feat/your-feature
git commit -m "feat: beskriv din ändring"
git push -u origin feat/your-feature
```

**Grenprefix**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commitformat** (Conventional Commits): `feat(db): lägg till kretsbrytare` — områden: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Miljö

- **Körning**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES-moduler
- **TypeScript**: 5.9+, mål ES2022, modul esnext, upplösning bundler
- **Sökvägsalias**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Standardport**: 20128 (API + dashboard på samma port)
- **Data katalog**: `DATA_DIR` miljövariabel, standard till `~/.omniroute/`
- **Nyckel miljövariabler**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` och generera `JWT_SECRET` (`openssl rand -base64 48`) och `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Hårda Regler

1. Kom aldrig med hemligheter eller referenser
2. Lägg aldrig till logik i `localDb.ts`
3. Använd aldrig `eval()` / `new Function()` / underförstådd eval
4. Kom aldrig direkt till `main`
5. Skriv aldrig rå SQL i rutter — använd `src/lib/db/` moduler
6. Tysta aldrig fel i SSE-strömmar
7. Validera alltid indata med Zod-scheman
8. Inkludera alltid tester när du ändrar produktionskod
9. Täckningen måste förbli ≥75% (uttalanden, rader, funktioner) / ≥70% (grenar). Nuvarande mätt: ~82%.
10. Omgå aldrig Husky hooks (`--no-verify`, `--no-gpg-sign`) utan uttryckligt godkännande från operatören.
11. Inkludera aldrig offentliga upstream OAuth client_id/secret eller Firebase Web-nycklar som stränglitteraler — gå alltid genom `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Se `docs/security/PUBLIC_CREDS.md`.
12. Återvänd aldrig rå `err.stack` / `err.message` i HTTP / SSE / executor-svar — routa alltid genom `buildErrorBody()` eller `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Se `docs/security/ERROR_SANITIZATION.md`.
13. Stränginterpolera aldrig externa sökvägar eller körvärden i shell-skript som skickas till `exec()`/`spawn()` — passera istället via `env`-alternativet. Referens: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Avfärda aldrig en CodeQL / Secret-Scanning-varning utan (a) att först kontrollera mönster-dokumentationen ovan för att se om hjälpen gäller, och (b) dokumentera den tekniska motiveringen i avfärdningskommentaren. Precedens: `js/stack-trace-exposure` som väckts på anropställen som redan routar genom `sanitizeErrorMessage()` är en känd CodeQL-begränsning (anpassade saniterare erkänns inte) — avfärda som `false positive` med hänvisning till `docs/security/ERROR_SANITIZATION.md`.
15. Exponera aldrig rutter som skapar barnprocesser (`/api/mcp/`, `/api/cli-tools/runtime/`) utan `isLocalOnlyPath()` klassificering i `src/server/authz/routeGuard.ts`. Loopback-tillämpning sker ovillkorligt före någon autentisering — läckta JWT via tunnel kan inte utlösa processskapande. Se `docs/security/ROUTE_GUARD_TIERS.md`.
16. Inkludera aldrig `Co-Authored-By`-trailers som krediterar en AI-assistent, LLM eller automatiseringskonto (t.ex. namn som innehåller "Claude", "GPT", "Copilot", "Bot"; e-postmeddelanden på `anthropic.com` / `openai.com` / bot-ägda `noreply.github.com`-adresser). Sådana trailers dirigerar commit-attribution till bot-kontot på GitHub, vilket döljer den verkliga författaren (`diegosouzapw`) i PR-historiken. Mänskliga medarbetare — inklusive upstream PR-författare och issue-rapporterare som portas till OmniRoute — KAN och BÖR krediteras med standard `Co-authored-by: Name <email>`-trailers; upstream-port arbetsflöden (`/port-upstream-features`, `/port-upstream-issues`) beror på detta.
