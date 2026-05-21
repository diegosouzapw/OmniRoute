# CLAUDE.md (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Tento súbor poskytuje pokyny pre Claude Code (claude.ai/code) pri práci s kódom v tomto repozitári.

## Rýchly štart

```bash
npm install                    # Nainštalujte závislosti (automaticky generuje .env z .env.example)
npm run dev                    # Vývojový server na http://localhost:20128
npm run build                  # Produkčná zostava (Next.js 16 samostatne)
npm run lint                   # ESLint (očakáva sa 0 chýb; varovania sú predchádzajúce)
npm run typecheck:core         # Kontrola TypeScript (mala by byť čistá)
npm run typecheck:noimplicit:core  # Prísna kontrola (žiadne implicitné any)
npm run test:coverage          # Jednotkové testy + pokrytie (75/75/75/70 — vyhlásenia/riadky/funkcie/vetvy)
npm run check                  # kombinácia lint + test
npm run check:cycles           # Detekcia cyklických závislostí
```

### Spúšťanie testov

```bash
# Jediný testovací súbor (nativný testovací bežec Node.js — väčšina testov)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Všetky sady
npm run test:all
```

Pre úplnú testovaciu maticu pozrite `CONTRIBUTING.md` → "Spúšťanie testov". Pre hlbokú architektúru pozrite `AGENTS.md`.

---

## Projekt na prvý pohľad

**OmniRoute** — unified AI proxy/router. Jeden koncový bod, 160+ poskytovateľov LLM, automatické zálohovanie.

| Vrstva        | Umiestnenie             | Účel                                                                          |
| ------------- | ----------------------- | ----------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — vstupné body                                             |
| Handlers      | `open-sse/handlers/`    | Spracovanie požiadaviek (chat, embeddings, atď.)                              |
| Executors     | `open-sse/executors/`   | HTTP dispatch špecifický pre poskytovateľa                                    |
| Translators   | `open-sse/translator/`  | Konverzia formátu (OpenAI↔Claude↔Gemini)                                      |
| Transformer   | `open-sse/transformer/` | API odpovedí ↔ Chat Completions                                               |
| Services      | `open-sse/services/`    | Kombinované smerovanie, obmedzenia rýchlosti, caching, atď.                   |
| Database      | `src/lib/db/`           | SQLite doménové moduly (45+ súborov, 55 migrácií)                             |
| Domain/Policy | `src/domain/`           | Engin politiky, pravidlá nákladov, logika zálohovania                         |
| MCP Server    | `open-sse/mcp-server/`  | 37 nástrojov (30 základných + 3 pamäť + 4 zručnosti), 3 prenosy, ~13 rozsahov |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protokol                                                   |
| Skills        | `src/lib/skills/`       | Rozšíriteľný rámec zručností                                                  |
| Memory        | `src/lib/memory/`       | Trvalá konverzačná pamäť                                                      |

Monorepo: `src/` (Next.js 16 aplikácia), `open-sse/` (pracovisko streaming engine), `electron/` (desktopová aplikácia), `tests/`, `bin/` (CLI vstupný bod).

---

## Žiadosť Pipeline

```
Klient → /v1/chat/completions (Next.js trasa)
  → CORS → Zod validácia → autentifikácia? → kontrola politiky → ochrana proti injekcii promptu
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → kontrola cache → limitovanie požiadaviek → combo routing?
      → resolveComboTargets() → handleSingleModel() pre cieľ
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → preklad odpovede → SSE stream alebo JSON
    → Ak Responses API: responsesTransformer.ts TransformStream
```

API trasy nasledujú konzistentný vzor: `Trasa → CORS preflight → Zod validácia tela → Voliteľná autentifikácia (extractApiKey/isValidApiKey) → Vynucovanie politiky API kľúča → Delegovanie handlera (open-sse)`. Žiadne globálne Next.js middleware — interceptácia je špecifická pre trasu.

**Combo routing** (`open-sse/services/combo.ts`): 14 stratégií (priorita, vážené, fill-first, round-robin, P2C, náhodné, najmenej používané, optimalizované náklady, reset-aware, strict-random, auto, lkgp, optimalizované pre kontext, kontext-relay). Každý cieľ volá `handleSingleModel()`, ktorý obalí `handleChatCore()` s chybovým spracovaním pre každý cieľ a kontrolami obvodu. Pozrite sa na `docs/routing/AUTO-COMBO.md` pre 9-faktorové hodnotenie Auto-Combo a `docs/architecture/RESILIENCE_GUIDE.md` pre 3 vrstvy odolnosti.

---

## Stav odolnosti v čase behu

OmniRoute má tri súvisiace, ale odlišné mechanizmy dočasného zlyhania. Udržujte ich
rozsah oddelený pri ladení správania routingu. Pozrite sa na
[diagram odolnosti s 3 vrstvami](./docs/diagrams/exported/resilience-3layers.svg)
(zdroj: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
pre rýchly prehľad.

### Obvod poskytovateľa

**Rozsah**: celý poskytovateľ, napr. `glm`, `openai`, `anthropic`.

**Účel**: zastaviť posielanie prevádzky k poskytovateľovi, ktorý opakovane zlyháva na
úrovni upstream/služby, aby jeden nezdravý poskytovateľ nezpomalil každú požiadavku.

**Implementácia**:

- Hlavná trieda: `src/shared/utils/circuitBreaker.ts`
- Chat gate/exekučné zapojenie: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu behu: `src/app/api/monitoring/health/route.ts`
- Zdieľané obaly: `open-sse/services/accountFallback.ts`
- Persistovaná stavová tabuľka: `domain_circuit_breakers`

**Stavy**:

- `CLOSED`: normálna prevádzka je povolená.
- `OPEN`: poskytovateľ je dočasne zablokovaný; volajúci dostanú odpoveď provider-circuit-open
  alebo combo routing preskočí na iný cieľ.
- `HALF_OPEN`: uplynul časový limit resetu; povoliť probe požiadavku. Úspech uzatvára
  obvod, zlyhanie ho opäť otvára.

**Predvolené hodnoty** (`open-sse/config/constants.ts`):

- OAuth poskytovatelia: prah `3`, reset timeout `60s`.
- API-kľúč poskytovatelia: prah `5`, reset timeout `30s`.
- Lokálni poskytovatelia: prah `2`, reset timeout `15s`.

Iba stavy zlyhania na úrovni poskytovateľa by mali spustiť obvod poskytovateľa:

```ts
(408, 500, 502, 503, 504);
```

Nespúšťajte obvod celého poskytovateľa pre normálne chyby účtu/kľúča/modelu ako väčšina
`401`, `403`, alebo `429` prípadov. Tieto zvyčajne patrí do cooldown pripojenia alebo
uzamknutia modelu. Generický API-kľúč poskytovateľa `403` by mal byť obnoviteľný, pokiaľ nie je klasifikovaný
ako terminálna chyba poskytovateľa/účtu.

Obvod používa lenivú obnovu, nie časovač na pozadí. Keď `OPEN` vyprší, čítania ako
`getStatus()`, `canExecute()`, a `getRetryAfterMs()` obnovujú stav na
`HALF_OPEN`, takže panely a stavitelia kandidátov na combo nebudú navždy vylučovať vypršaného poskytovateľa.

### Cooldown pripojenia

**Rozsah**: jedno pripojenie účtu/kľúča poskytovateľa.

**Účel**: dočasne preskočiť jeden zlý kľúč/účet, zatiaľ čo ostatné pripojenia pre
rovnakého poskytovateľa môžu pokračovať v obsluhe požiadaviek.

**Implementácia**:

- Cesta zápisu/aktualizácie: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výber/filtrácia účtu: `src/sse/services/auth.ts::getProviderCredentials...`
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavenia: `src/lib/resilience/settings.ts`

Dôležité polia na pripojeniach poskytovateľa:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Počas výberu účtu je pripojenie preskočené, keď:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny sú tiež lenivé: keď je `rateLimitedUntil` v minulosti, pripojenie sa opäť stáva
oprávneným. Pri úspešnom použití `clearAccountError()` vymaže `testStatus`,
`rateLimitedUntil`, chybové polia a `backoffLevel`.

Predvolené správanie cooldownu pripojenia:

- Základný cooldown OAuth: `5s`.
- Základný cooldown API-kľúča: `3s`.
- API-kľúč `429` by mal uprednostniť upstream retry hints (`Retry-After`, reset hlavičky, alebo
  analyzovateľný reset text) keď sú k dispozícii.
- Opakované obnoviteľné zlyhania používajú exponenciálne backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ochrana proti hromadnému zlyhaniu zabraňuje súbežným zlyhaniam na rovnakom pripojení od
opakovaného predlžovania cooldownu alebo dvojitého zvyšovania `backoffLevel`.

Terminálne stavy nie sú cooldowny. `banned`, `expired`, a `credits_exhausted` sú
určené na to, aby zostali nedostupné, kým sa nezmenia poverenia/nastavenia alebo kým ich operátor
neobnoví. Neprepisujte terminálne stavy do prechodného cooldown stavu.

### Uzamknutie modelu

**Rozsah**: poskytovateľ + pripojenie + model.

**Účel**: vyhnúť sa deaktivácii celého pripojenia, keď je nedostupný iba jeden model alebo
kvótovo obmedzený pre to pripojenie.

Príklady:

- Poskytovatelia s kvótou na model, ktorí vracajú `429`.
- Lokálni poskytovatelia vracajúci `404` pre jeden chýbajúci model.
- Zlyhania povolenia režimu/modelu špecifické pre poskytovateľa, ako sú vybrané režimy Grok.

Uzamknutie modelu žije v `open-sse/services/accountFallback.ts` a umožňuje rovnakému
pripojeniu pokračovať v obsluhe iných modelov.

### Pokyny na ladenie

- Ak sú všetky kľúče pre poskytovateľa preskočené, skontrolujte stav obvodu poskytovateľa a každý
  stav `rateLimitedUntil`/`testStatus`.
- Ak sa poskytovateľ zdá byť trvalo vylúčený po resetovom okne, skontrolujte, či kód
  číta surový `state` namiesto používania `getStatus()`/`canExecute()`.
- Ak jeden kľúč poskytovateľa zlyhá, ale ostatné by mali fungovať, uprednostnite cooldown pripojenia pred
  obvodom poskytovateľa.
- Ak zlyhá iba jeden model, uprednostnite uzamknutie modelu pred cooldownom pripojenia.
- Ak by sa mal stav sám obnoviť, mal by mať budúci časový pečiatok/reset timeout a
  čítaciu cestu, ktorá obnovuje vypršaný stav. Trvalé stavy vyžadujú manuálne zmeny poverení
  alebo konfigurácie.

## Kľúčové konvencie

### Štýl kódu

- **2 medzery**, bodkočiarky, dvojité úvodzovky, šírka 100 znakov, es5 koncové čiarky (vynútené lint-staged cez Prettier)
- **Importy**: externé → interné (`@/`, `@omniroute/open-sse`) → relatívne
- **Názvy**: súbory=camelCase/kebab, komponenty=PascalCase, konštanty=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = chyba všade; `no-explicit-any` = varovanie v `open-sse/` a `tests/`
- **TypeScript**: `strict: false`, cieľ ES2022, modul esnext, rozlíšenie bundler. Preferujte explicitné typy.

### Databáza

- **Vždy** prechádzajte cez `src/lib/db/` doménové moduly — **nikdy** nepíšte surové SQL v trasách alebo obslužných funkciách
- **Nikdy** nepridávajte logiku do `src/lib/localDb.ts` (iba re-exportná vrstva)
- **Nikdy** neimportujte z `localDb.ts` — namiesto toho importujte konkrétne `db/` moduly
- DB singleton: `getDbInstance()` z `src/lib/db/core.ts` (WAL žurnálovanie)
- Migrácie: `src/lib/db/migrations/` — verzionované SQL súbory, idempotentné, spúšťané v transakciách

### Správa chýb

- try/catch so špecifickými typmi chýb, logujte s kontextom pino
- Nikdy nezahŕňajte chyby v SSE prúdoch — použite signály na zrušenie na vyčistenie
- Vráťte správne HTTP stavové kódy (4xx/5xx)

### Bezpečnosť

- **Nikdy** nepoužívajte `eval()`, `new Function()`, alebo implicitné eval
- Validujte všetky vstupy pomocou Zod schém
- Šifrujte poverenia v pokoji (AES-256-GCM)
- Zoznam hlavičiek na zamietnutie: `src/shared/constants/upstreamHeaders.ts` — udržujte sanitáciu, Zod schémy a jednotkové testy v súlade pri úpravách
- **Verejné upstream poverenia** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + Firebase Web kľúče extrahované z verejných CLI): **MUSIA** byť vložené cez `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` — **nikdy** ako reťazcové literály. Pozrite `docs/security/PUBLIC_CREDS.md` pre povinný vzor.
- **Odpovede na chyby** (HTTP / SSE / executor / MCP obslužná funkcia): **MUSIA** prechádzať cez `buildErrorBody()` alebo `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — **nikdy** nevkladajte surové `err.stack` alebo `err.message` do tela odpovede. Pozrite `docs/security/ERROR_SANITIZATION.md`.
- **Shell príkazy vytvorené z premenných**: pri volaní `exec()`/`spawn()` so skriptom, ktorý potrebuje hodnoty za behu, preneste ich cez možnosť `env` (automaticky shell-escaped) — **nikdy** neinterpolujte nespoľahlivé/externe cesty do tela skriptu. Referencia: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Knižnice zabezpečené predvolene** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): uprednostnite Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink pred vlastnými implementáciami vždy, keď pridávate nové povrchy citlivé na bezpečnosť.

---

## Bežné scenáre úprav

### Pridanie nového poskytovateľa

1. Zaregistrujte v `src/shared/constants/providers.ts` (Zod-validated pri načítaní)
2. Pridajte executor v `open-sse/executors/`, ak je potrebná vlastná logika (rozšírte `BaseExecutor`)
3. Pridajte prekladateľa v `open-sse/translator/`, ak nie je vo formáte OpenAI
4. Pridajte OAuth konfiguráciu v `src/lib/oauth/constants/oauth.ts`, ak je založená na OAuth — ak upstream CLI dodáva verejný client_id/secret, vložte cez `resolvePublicCred()` (pozrite `docs/security/PUBLIC_CREDS.md`), **nikdy** ako literál
5. Zaregistrujte modely v `open-sse/config/providerRegistry.ts`
6. Napíšte testy v `tests/unit/` (zahrňte asertáciu tvaru publicCreds, ak ste pridali nový vložený predvolený)

### Pridanie novej API trasy

1. Vytvorte adresár pod `src/app/api/v1/your-route/`
2. Vytvorte `route.ts` s obslužnými funkciami `GET`/`POST`
3. Dodržujte vzor: CORS → Zod validácia tela → voliteľná autentifikácia → delegácia obslužnej funkcie
4. Obslužná funkcia ide do `open-sse/handlers/` (importujte odtiaľ, nie inline)
5. Odpovede na chyby používajú `buildErrorBody()` / `errorResponse()` z `open-sse/utils/error.ts` (automaticky sanitizované — nikdy nevkladajte surové `err.stack` alebo `err.message` do tela). Pozrite `docs/security/ERROR_SANITIZATION.md`.
6. Pridajte testy — vrátane aspoň jednej asertácie, že odpovede na chyby neunikajú stopy zásobníka (`!body.error.message.includes("at /")`)

### Pridanie nového DB modulu

1. Vytvorte `src/lib/db/yourModule.ts` — importujte `getDbInstance` z `./core.ts`
2. Exportujte CRUD funkcie pre vaše doménové tabuľky
3. Pridajte migráciu v `src/lib/db/migrations/`, ak sú potrebné nové tabuľky
4. Re-exportujte z `src/lib/localDb.ts` (pridajte iba do zoznamu re-exportov)
5. Napíšte testy

### Pridanie nového MCP nástroja

1. Pridajte definíciu nástroja v `open-sse/mcp-server/tools/` so Zod vstupnou schémou + asynchrónnou obslužnou funkciou
2. Zaregistrujte v súbore nástrojov (prepojené cez `createMcpServer()`)
3. Priraďte k príslušným rozsahom
4. Napíšte testy (vyvolanie nástroja sa zaznamenáva do tabuľky `mcp_audit`)

### Pridanie novej A2A zručnosti

1. Vytvorte zručnosť v `src/lib/a2a/skills/` (už existujú 5: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Zručnosť prijíma kontext úlohy (správy, metadata) → vracia štruktúrovaný výsledok
3. Zaregistrujte v `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`
4. Exponujte v `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Napíšte testy v `tests/unit/`
6. Dokumentujte v `docs/frameworks/A2A-SERVER.md` tabuľku zručností

### Pridanie nového cloud agenta

1. Vytvorte triedu agenta v `src/lib/cloudAgent/agents/` rozširujúcu `CloudAgentBase` (už existujú 3: codex-cloud, devin, jules)
2. Implementujte `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Zaregistrujte v `src/lib/cloudAgent/registry.ts`
4. Pridajte spracovanie OAuth/poverenia, ak je to potrebné (`src/lib/oauth/providers/`)
5. Testy + dokumentujte v `docs/frameworks/CLOUD_AGENT.md`

### Pridanie nového guardrailu / eval / zručnosti / webhook udalosti

- Guardrail: `src/lib/guardrails/` → dokumenty: `docs/security/GUARDRAILS.md`
- Eval súprava: `src/lib/evals/` → dokumenty: `docs/frameworks/EVALS.md`
- Zručnosť (sandbox): `src/lib/skills/` → dokumenty: `docs/frameworks/SKILLS.md`
- Webhook udalosť: `src/lib/webhookDispatcher.ts` → dokumenty: `docs/frameworks/WEBHOOKS.md`

## Referenčná dokumentácia

Pre akúkoľvek netriviálnu zmenu si najprv prečítajte zodpovedajúci hĺbkový pohľad:

| Oblasť                                            | Dokument                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| Navigácia v repozitári                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architektúra                                      | `docs/architecture/ARCHITECTURE.md`                               |
| Referencia inžinierstva                           | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktorové hodnotenie, 14 stratégií) | `docs/routing/AUTO-COMBO.md`                                      |
| Odolnosť (3 mechanizmy)                           | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Opakovanie uvažovania                             | `docs/routing/REASONING_REPLAY.md`                                |
| Rámec zručností                                   | `docs/frameworks/SKILLS.md`                                       |
| Systém pamäte (FTS5 + Qdrant)                     | `docs/frameworks/MEMORY.md`                                       |
| Cloudové agenti                                   | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Ochranné opatrenia (PII / injekcia / vízia)       | `docs/security/GUARDRAILS.md`                                     |
| Verejné poverenia upstream (Gemini/atď.)          | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitizácia chybových hlásení                     | `docs/security/ERROR_SANITIZATION.md`                             |
| Vyhodnotenia                                      | `docs/frameworks/EVALS.md`                                        |
| Dodržiavanie / audit                              | `docs/security/COMPLIANCE.md`                                     |
| Webhooky                                          | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorizačný pipeline                              | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Neviditeľnosť (TLS / odtlačok)                    | `docs/security/STEALTH_GUIDE.md`                                  |
| Protokoly agentov (A2A / ACP / Cloud)             | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                        | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                        | `docs/frameworks/A2A-SERVER.md`                                   |
| Referencia API + OpenAPI                          | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalóg poskytovateľov (automaticky generovaný)   | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Tok vydania                                       | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testovanie

| Čo                      | Príkaz                                                                  |
| ----------------------- | ----------------------------------------------------------------------- |
| Jednotkové testy        | `npm run test:unit`                                                     |
| Jediný súbor            | `node --import tsx/esm --test tests/unit/file.test.ts`                  |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                   |
| E2E (Playwright)        | `npm run test:e2e`                                                      |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                            |
| Ekosystém               | `npm run test:ecosystem`                                                |
| Pokrytie                | `npm run test:coverage` (75/75/75/70 — vyhlásenia/riadky/funkcie/vetvy) |
| Správa pokrytia         | `npm run coverage:report`                                               |

**PR pravidlo**: Ak zmeníte produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musíte zahrnúť alebo aktualizovať testy v tej istej PR.

**Preferencia testovacej vrstvy**: najprv jednotkové → integrácia (multi-modulový alebo DB stav) → e2e (iba UI/workflow). Kódy reprodukcií chýb zakódujte ako automatizované testy pred alebo spolu s opravou.

**Politika pokrytia Copilot**: Keď PR mení produkčný kód a pokrytie je pod 75% (vyhlásenia/riadky/funkcie) alebo 70% (vetvy), nehláste len — pridajte alebo aktualizujte testy, znovu spustite pokrytie, potom požiadajte o potvrdenie. Zahrňte spustené príkazy, zmenené testovacie súbory a konečný výsledok pokrytia v správe PR.

---

## Git Workflow

```bash
# Nikdy nekomitujte priamo do main
git checkout -b feat/your-feature
git commit -m "feat: popíšte svoju zmenu"
git push -u origin feat/your-feature
```

**Prefixy vetiev**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formát commitu** (Conventional Commits): `feat(db): pridať obvodový spínač` — rozsahy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Prostredie

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES moduly
- **TypeScript**: 5.9+, cieľ ES2022, modul esnext, rozlíšenie bundler
- **Cestné aliasy**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Predvolený port**: 20128 (API + dashboard na rovnakom porte)
- **Adresár dát**: `DATA_DIR` env var, predvolene `~/.omniroute/`
- **Kľúčové env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Nastavenie: `cp .env.example .env` potom vygenerujte `JWT_SECRET` (`openssl rand -base64 48`) a `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Tvrdé pravidlá

1. Nikdy nekomitujte tajomstvá alebo poverenia
2. Nikdy nepridávajte logiku do `localDb.ts`
3. Nikdy nepoužívajte `eval()` / `new Function()` / implicitné eval
4. Nikdy nekomitujte priamo do `main`
5. Nikdy nepíšte surové SQL v trasách — používajte moduly `src/lib/db/`
6. Nikdy ticho nezachytávajte chyby v SSE prúdoch
7. Vždy validujte vstupy pomocou Zod schém
8. Vždy zahrňte testy pri zmene produkčného kódu
9. Pokrytie musí zostať ≥75% (vyhlásenia, riadky, funkcie) / ≥70% (vetvy). Aktuálne merané: ~82%.
10. Nikdy neobchádzajte Husky hooky (`--no-verify`, `--no-gpg-sign`) bez explicitného schválenia operátora.
11. Nikdy nezahŕňajte verejné upstream OAuth client_id/secret alebo Firebase Web kľúče ako reťazcové literály — vždy prechádzajte cez `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pozrite `docs/security/PUBLIC_CREDS.md`.
12. Nikdy nevracajte surové `err.stack` / `err.message` v HTTP / SSE / executor odpovediach — vždy prechádzajte cez `buildErrorBody()` alebo `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pozrite `docs/security/ERROR_SANITIZATION.md`.
13. Nikdy neinterpolujte externé cesty alebo hodnoty runtime do shell skriptov odovzdaných do `exec()`/`spawn()` — namiesto toho ich odovzdajte cez možnosť `env`. Referencia: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikdy neignorujte upozornenie CodeQL / Secret-Scanning bez (a) najprv skontrolovania dokumentov vzoru vyššie, aby ste zistili, či sa pomocník uplatňuje, a (b) zaznamenania technického odôvodnenia v komentári o zamietnutí. Precedens: `js/stack-trace-exposure` vyvolané na miestach volania, ktoré už prechádzajú cez `sanitizeErrorMessage()` je známa obmedzenie CodeQL (vlastné sanitizéry nie sú rozpoznané) — zamietnite ako `false positive` s odkazom na `docs/security/ERROR_SANITIZATION.md`.
15. Nikdy nezverejňujte trasy, ktoré spúšťajú podprocesy (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikácie `isLocalOnlyPath()` v `src/server/authz/routeGuard.ts`. Presadzovanie loopback sa deje bezpodmienečne pred akoukoľvek autentifikačnou kontrolou — uniknutý JWT cez tunel nemôže spustiť proces. Pozrite `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikdy nezahŕňajte `Co-Authored-By` prívesy v správach commitov. Commity musia byť zobrazené výlučne pod Git identitou vlastníka repozitára (`diegosouzapw`). Riadok `Co-Authored-By: Claude …` spôsobuje, že GitHub pripisuje commity účtu `claude` Anthropic, čím skrýva skutočného autora v histórii PR.
