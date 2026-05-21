# CLAUDE.md (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Tento soubor poskytuje pokyny pro Claude Code (claude.ai/code) při práci s kódem v tomto repozitáři.

## Rychlý start

```bash
npm install                    # Nainstalujte závislosti (automaticky vygeneruje .env z .env.example)
npm run dev                    # Vývojový server na http://localhost:20128
npm run build                  # Produkční build (Next.js 16 standalone)
npm run lint                   # ESLint (0 chyb očekáváno; varování jsou předchozí)
npm run typecheck:core         # Kontrola TypeScriptu (mělo by být čisté)
npm run typecheck:noimplicit:core  # Přísná kontrola (žádné implicitní any)
npm run test:coverage          # Jednotkové testy + pokrytí (75/75/75/70 — prohlášení/řádky/funkce/větve)
npm run check                  # lint + testy dohromady
npm run check:cycles           # Detekce cyklických závislostí
```

### Spouštění testů

```bash
# Jediný testovací soubor (nativní testovací běžec Node.js — většina testů)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Všechny sady
npm run test:all
```

Pro plnou testovací matici viz `CONTRIBUTING.md` → "Spouštění testů". Pro hlubokou architekturu viz `AGENTS.md`.

---

## Projekt na první pohled

**OmniRoute** — jednotný AI proxy/router. Jeden koncový bod, 160+ poskytovatelů LLM, automatické zálohování.

| Vrstva        | Umístění                | Účel                                                                            |
| ------------- | ----------------------- | ------------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — vstupní body                                               |
| Handlers      | `open-sse/handlers/`    | Zpracování požadavků (chat, embeddings, atd.)                                   |
| Executors     | `open-sse/executors/`   | HTTP dispatch specifický pro poskytovatele                                      |
| Translators   | `open-sse/translator/`  | Konverze formátu (OpenAI↔Claude↔Gemini)                                         |
| Transformer   | `open-sse/transformer/` | API odpovědí ↔ Dokončení chatu                                                  |
| Services      | `open-sse/services/`    | Kombinované směrování, limity rychlosti, caching, atd.                          |
| Database      | `src/lib/db/`           | SQLite doménové moduly (45+ souborů, 55 migrací)                                |
| Domain/Policy | `src/domain/`           | Engin politiky, pravidla nákladů, logika zálohování                             |
| MCP Server    | `open-sse/mcp-server/`  | 37 nástrojů (30 základních + 3 paměť + 4 dovednosti), 3 transporty, ~13 rozsahů |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 agent protokol                                                     |
| Skills        | `src/lib/skills/`       | Rozšiřitelný rámec dovedností                                                   |
| Memory        | `src/lib/memory/`       | Trvalá konverzační paměť                                                        |

Monorepo: `src/` (Next.js 16 aplikace), `open-sse/` (pracovní prostor streamovacího enginu), `electron/` (desktopová aplikace), `tests/`, `bin/` (CLI vstupní bod).

---

## Pipeline požadavků

```
Klient → /v1/chat/completions (Next.js route)
  → CORS → Zod validace → auth? → kontrola politiky → ochrana proti injekci promptu
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → kontrola cache → limit rychlosti → combo routing?
      → resolveComboTargets() → handleSingleModel() pro každý cíl
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → opakování s backoff
    → překlad odpovědi → SSE stream nebo JSON
    → Pokud Responses API: responsesTransformer.ts TransformStream
```

API trasy následují konzistentní vzor: `Route → CORS preflight → Zod validace těla → Volitelná autentizace (extractApiKey/isValidApiKey) → Vynucení politiky API klíče → Delegace handleru (open-sse)`. Žádný globální Next.js middleware — interceptace je specifická pro trasu.

**Combo routing** (`open-sse/services/combo.ts`): 14 strategií (priorita, vážené, fill-first, round-robin, P2C, náhodné, nejméně používané, optimalizované podle nákladů, reset-aware, strict-random, auto, lkgp, optimalizované podle kontextu, kontext-relay). Každý cíl volá `handleSingleModel()`, který obaluje `handleChatCore()` s chybovým zpracováním a kontrolami obvodu pro každý cíl. Viz `docs/routing/AUTO-COMBO.md` pro 9-faktorové hodnocení Auto-Combo a `docs/architecture/RESILIENCE_GUIDE.md` pro 3 vrstvy odolnosti.

---

## Stav běhu odolnosti

OmniRoute má tři související, ale odlišné mechanismy dočasného selhání. Udržujte jejich rozsah oddělený při ladění chování routování. Viz
[diagram odolnosti ve 3 vrstvách](./docs/diagrams/exported/resilience-3layers.svg)
(zdroj: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
pro rychlý přehled.

### Obvod poskytovatele

**Rozsah**: celý poskytovatel, např. `glm`, `openai`, `anthropic`.

**Účel**: zastavit posílání provozu k poskytovateli, který opakovaně selhává na úrovni upstream/služby, aby jeden nezdravý poskytovatel nezpomalil každý požadavek.

**Implementace**:

- Hlavní třída: `src/shared/utils/circuitBreaker.ts`
- Chat gate/execution wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stavu běhu: `src/app/api/monitoring/health/route.ts`
- Sdílené obaly: `open-sse/services/accountFallback.ts`
- Tabulka trvalého stavu: `domain_circuit_breakers`

**Stavy**:

- `CLOSED`: normální provoz je povolen.
- `OPEN`: poskytovatel je dočasně zablokován; volající dostanou odpověď provider-circuit-open
  nebo combo routing přeskočí na jiný cíl.
- `HALF_OPEN`: resetovací timeout uplynul; povolit zkušební požadavek. Úspěch uzavírá
  obvod, selhání jej znovu otevírá.

**Výchozí hodnoty** (`open-sse/config/constants.ts`):

- OAuth poskytovatelé: práh `3`, resetovací timeout `60s`.
- API-klíč poskytovatelé: práh `5`, resetovací timeout `30s`.
- Lokální poskytovatelé: práh `2`, resetovací timeout `15s`.

Pouze stavy selhání na úrovni poskytovatele by měly spustit obvod poskytovatele:

```ts
(408, 500, 502, 503, 504);
```

Nespouštějte obvod celého poskytovatele pro normální chyby účtu/klíče/modelu jako většina
případů `401`, `403` nebo `429`. Ty obvykle patří do cooldownu připojení nebo uzamčení modelu. Obecný API-klíč poskytovatel `403` by měl být obnovitelný, pokud není klasifikován
jako terminální chyba poskytovatele/účtu.

Obvod používá lenivou obnovu, ne pozadí časovač. Když `OPEN` vyprší, čtení jako
`getStatus()`, `canExecute()`, a `getRetryAfterMs()` obnoví stav na
`HALF_OPEN`, takže panely a stavitelé kandidátů na combo nebudou navždy vylučovat vypršeného poskytovatele.

### Cooldown připojení

**Rozsah**: jedno připojení/účet/klíč poskytovatele.

**Účel**: dočasně přeskočit jeden špatný klíč/účet, zatímco ostatní připojení pro
stejného poskytovatele mohou pokračovat v obsluze požadavků.

**Implementace**:

- Cesta zápisu/aktualizace: `src/sse/services/auth.ts::markAccountUnavailable()`
- Výběr/filtrování účtu: `src/sse/services/auth.ts::getProviderCredentials...`
- Výpočet cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nastavení: `src/lib/resilience/settings.ts`

Důležitá pole na připojeních poskytovatele:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Během výběru účtu je připojení přeskočeno, pokud:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny jsou také lenivé: když je `rateLimitedUntil` v minulosti, připojení se opět stává
způsobilým. Při úspěšném použití `clearAccountError()` vymaže `testStatus`,
`rateLimitedUntil`, chybová pole a `backoffLevel`.

Výchozí chování cooldownu připojení:

- Základní cooldown OAuth: `5s`.
- Základní cooldown API-klíče: `3s`.
- API-klíč `429` by měl preferovat upstream retry hints (`Retry-After`, resetovací hlavičky, nebo
  parsovatelný reset text) když jsou k dispozici.
- Opakované obnovitelné selhání používá exponenciální backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ochrana proti thundering-herd zabraňuje souběžným selháním na stejném připojení v
opakovaném prodlužování cooldownu nebo dvojitému zvyšování `backoffLevel`.

Terminální stavy nejsou cooldowny. `banned`, `expired`, a `credits_exhausted` jsou
určeny k tomu, aby zůstaly nedostupné, dokud se nezmění pověření/nastavení nebo je operátor
neobnoví. Nepřepisujte terminální stavy do přechodného stavu cooldownu.

### Uzamčení modelu

**Rozsah**: poskytovatel + připojení + model.

**Účel**: vyhnout se deaktivaci celého připojení, když je k dispozici pouze jeden model
nebo je omezený kvótou pro toto připojení.

Příklady:

- Poskytovatelé s kvótou na model vracející `429`.
- Lokální poskytovatelé vracející `404` pro jeden chybějící model.
- Chyby oprávnění specifické pro poskytovatele/model, jako jsou vybrané režimy Grok.

Uzamčení modelu žije v `open-sse/services/accountFallback.ts` a umožňuje stejnému
připojení pokračovat v obsluze dalších modelů.

### Pokyny pro ladění

- Pokud jsou všechny klíče pro poskytovatele přeskočeny, zkontrolujte jak stav obvodu poskytovatele, tak
  `rateLimitedUntil`/`testStatus` každého připojení.
- Pokud se zdá, že je poskytovatel trvale vyloučen po resetovacím okně, zkontrolujte, zda kód
  čte surový `state` místo používání `getStatus()`/`canExecute()`.
- Pokud jeden klíč poskytovatele selže, ale ostatní by měly fungovat, preferujte cooldown připojení před
  obvodem poskytovatele.
- Pokud selže pouze jeden model, preferujte uzamčení modelu před cooldownem připojení.
- Pokud by se měl stav sám obnovit, měl by mít budoucí časové razítko/resetovací timeout a
  čtecí cestu, která obnovuje vypršený stav. Trvalé stavy vyžadují ruční změny pověření
  nebo konfigurace.

## Klíčové konvence

### Styl kódu

- **2 mezery**, středníky, dvojité uvozovky, šířka 100 znaků, es5 koncové čárky (vynuceno lint-staged pomocí Prettier)
- **Importy**: externí → interní (`@/`, `@omniroute/open-sse`) → relativní
- **Pojmenování**: soubory=camelCase/kebab, komponenty=PascalCase, konstanty=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = chyba všude; `no-explicit-any` = varování v `open-sse/` a `tests/`
- **TypeScript**: `strict: false`, cíl ES2022, modul esnext, rozlišení bundler. Preferujte explicitní typy.

### Databáze

- **Vždy** procházejte doménovými moduly `src/lib/db/` — **nikdy** nepíšete surové SQL v trasách nebo obslužných funkcích
- **Nikdy** nepřidávejte logiku do `src/lib/localDb.ts` (pouze vrstva pro opětovný export)
- **Nikdy** neprovádějte barrel-import z `localDb.ts` — místo toho importujte konkrétní moduly `db/`
- DB singleton: `getDbInstance()` z `src/lib/db/core.ts` (WAL žurnálování)
- Migrace: `src/lib/db/migrations/` — verzované SQL soubory, idempotentní, prováděné v transakcích

### Zpracování chyb

- try/catch se specifickými typy chyb, logování s kontextem pino
- Nikdy nezapomínejte na chyby ve SSE streamech — použijte signály pro zrušení pro úklid
- Vraťte správné HTTP status kódy (4xx/5xx)

### Bezpečnost

- **Nikdy** nepoužívejte `eval()`, `new Function()`, nebo implicitní eval
- Ověřte všechny vstupy pomocí Zod schémat
- Šifrujte přihlašovací údaje v klidu (AES-256-GCM)
- Seznam zakázaných hlaviček upstream: `src/shared/constants/upstreamHeaders.ts` — udržujte sanitaci, Zod schémata a jednotkové testy v souladu při úpravách
- **Veřejné přihlašovací údaje upstream** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + Firebase Web klíče extrahované z veřejných CLI): **MUSÍ** být vloženy pomocí `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` — **nikdy** jako literály. Viz `docs/security/PUBLIC_CREDS.md` pro povinný vzor.
- **Odpovědi na chyby** (HTTP / SSE / executor / MCP obslužná funkce): **MUSÍ** procházet `buildErrorBody()` nebo `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — **nikdy** nevkládejte surové `err.stack` nebo `err.message` do těla odpovědi. Viz `docs/security/ERROR_SANITIZATION.md`.
- **Shell příkazy vytvořené z proměnných**: při volání `exec()`/`spawn()` se skriptem, který potřebuje hodnoty za běhu, předávejte je pomocí možnosti `env` (automaticky shell-escaped) — **nikdy** neprovádějte interpolaci neověřených/externalních cest do těla skriptu. Odkaz: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Knihovny zabezpečené podle výchozího nastavení** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferujte Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink před vlastními implementacemi při přidávání nových bezpečnostně citlivých povrchů.

---

## Běžné scénáře úprav

### Přidání nového poskytovatele

1. Zaregistrujte v `src/shared/constants/providers.ts` (ověřeno Zod při načítání)
2. Přidejte executor v `open-sse/executors/`, pokud je potřeba vlastní logika (rozšiřte `BaseExecutor`)
3. Přidejte překladač v `open-sse/translator/`, pokud není ve formátu OpenAI
4. Přidejte OAuth konfiguraci v `src/lib/oauth/constants/oauth.ts`, pokud je založena na OAuth — pokud upstream CLI dodává veřejný client_id/secret, vložte pomocí `resolvePublicCred()` (viz `docs/security/PUBLIC_CREDS.md`), **nikdy** jako literál
5. Zaregistrujte modely v `open-sse/config/providerRegistry.ts`
6. Napište testy v `tests/unit/` (zahrňte ověření tvaru publicCreds, pokud jste přidali nový vložený výchozí)

### Přidání nové API trasy

1. Vytvořte adresář pod `src/app/api/v1/your-route/`
2. Vytvořte `route.ts` s obslužnými funkcemi `GET`/`POST`
3. Dodržujte vzor: CORS → Zod ověření těla → volitelná autentizace → delegace obslužné funkce
4. Obslužná funkce jde do `open-sse/handlers/` (importujte odtud, ne inline)
5. Odpovědi na chyby používají `buildErrorBody()` / `errorResponse()` z `open-sse/utils/error.ts` (automaticky sanitizováno — nikdy nevkládejte `err.stack` nebo `err.message` surově do těla). Viz `docs/security/ERROR_SANITIZATION.md`.
6. Přidejte testy — včetně alespoň jednoho ověření, že odpovědi na chyby neunikají stopy (`!body.error.message.includes("at /")`)

### Přidání nového DB modulu

1. Vytvořte `src/lib/db/yourModule.ts` — importujte `getDbInstance` z `./core.ts`
2. Exportujte CRUD funkce pro vaše doménové tabulky
3. Přidejte migraci v `src/lib/db/migrations/`, pokud jsou potřeba nové tabulky
4. Znovu exportujte z `src/lib/localDb.ts` (přidejte pouze do seznamu pro opětovný export)
5. Napište testy

### Přidání nového MCP nástroje

1. Přidejte definici nástroje v `open-sse/mcp-server/tools/` s Zod vstupním schématem + asynchronní obslužnou funkcí
2. Zaregistrujte v sadě nástrojů (propojeno pomocí `createMcpServer()`)
3. Přiřaďte k příslušným rozsahům
4. Napište testy (vyvolání nástroje je zaznamenáno do tabulky `mcp_audit`)

### Přidání nové A2A dovednosti

1. Vytvořte dovednost v `src/lib/a2a/skills/` (5 již existuje: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Dovednost přijímá kontext úkolu (zprávy, metadata) → vrací strukturovaný výsledek
3. Zaregistrujte v `A2A_SKILL_HANDLERS` v `src/lib/a2a/taskExecution.ts`
4. Exponujte v `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Napište testy v `tests/unit/`
6. Dokumentujte v `docs/frameworks/A2A-SERVER.md` tabulka dovedností

### Přidání nového cloudového agenta

1. Vytvořte třídu agenta v `src/lib/cloudAgent/agents/` rozšiřující `CloudAgentBase` (3 již existují: codex-cloud, devin, jules)
2. Implementujte `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Zaregistrujte v `src/lib/cloudAgent/registry.ts`
4. Přidejte zpracování OAuth/přihlašovacích údajů, pokud je potřeba (`src/lib/oauth/providers/`)
5. Testy + dokumentujte v `docs/frameworks/CLOUD_AGENT.md`

### Přidání nového guardrail / eval / dovednosti / webhook události

- Guardrail: `src/lib/guardrails/` → dokumentace: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → dokumentace: `docs/frameworks/EVALS.md`
- Dovednost (sandbox): `src/lib/skills/` → dokumentace: `docs/frameworks/SKILLS.md`
- Webhook událost: `src/lib/webhookDispatcher.ts` → dokumentace: `docs/frameworks/WEBHOOKS.md`

## Referenční dokumentace

Před jakoukoli netriviální změnou si nejprve přečtěte odpovídající podrobnou analýzu:

| Oblast                                           | Dokument                                                          |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| Navigace repozitářem                             | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architektura                                     | `docs/architecture/ARCHITECTURE.md`                               |
| Odkaz na inženýrství                             | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktorové hodnocení, 14 strategií) | `docs/routing/AUTO-COMBO.md`                                      |
| Odolnost (3 mechanismy)                          | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Opakování uvažování                              | `docs/routing/REASONING_REPLAY.md`                                |
| Rámec dovedností                                 | `docs/frameworks/SKILLS.md`                                       |
| Systém paměti (FTS5 + Qdrant)                    | `docs/frameworks/MEMORY.md`                                       |
| Cloudoví agenti                                  | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Ochranné prvky (PII / injekce / vize)            | `docs/security/GUARDRAILS.md`                                     |
| Veřejné přihlašovací údaje (Gemini atd.)         | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitizace chybových zpráv                       | `docs/security/ERROR_SANITIZATION.md`                             |
| Hodnocení                                        | `docs/frameworks/EVALS.md`                                        |
| Soulad / audit                                   | `docs/security/COMPLIANCE.md`                                     |
| Webhooky                                         | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorizační pipeline                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / otisk)                            | `docs/security/STEALTH_GUIDE.md`                                  |
| Protokoly agentů (A2A / ACP / Cloud)             | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                       | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                       | `docs/frameworks/A2A-SERVER.md`                                   |
| Odkaz na API + OpenAPI                           | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalog poskytovatelů (automaticky generovaný)   | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Tok vydání                                       | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testování

| Co                      | Příkaz                                                             |
| ----------------------- | ------------------------------------------------------------------ |
| Jednotkové testy        | `npm run test:unit`                                                |
| Jediný soubor           | `node --import tsx/esm --test tests/unit/file.test.ts`             |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                              |
| E2E (Playwright)        | `npm run test:e2e`                                                 |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                       |
| Ekosystém               | `npm run test:ecosystem`                                           |
| Brána pokrytí           | `npm run test:coverage` (75/75/75/70 — příkazy/řádky/funkce/větve) |
| Zpráva o pokrytí        | `npm run coverage:report`                                          |

**Pravidlo PR**: Pokud změníte produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musíte zahrnout nebo aktualizovat testy ve stejném PR.

**Preferovaný testovací vrstvy**: jednotkové testy první → integrace (více modulů nebo stav DB) → e2e (pouze UI/workflow). Kódování reprodukcí chyb jako automatizovaných testů před nebo spolu s opravou.

**Politika pokrytí Copilot**: Když PR změní produkční kód a pokrytí je pod 75% (příkazy/řádky/funkce) nebo 70% (větve), nehlaste pouze — přidejte nebo aktualizujte testy, znovu spusťte bránu pokrytí a poté požádejte o potvrzení. Zahrňte provedené příkazy, změněné testovací soubory a konečný výsledek pokrytí do zprávy PR.

---

## Git Workflow

```bash
# Nikdy neprovádějte commit přímo do main
git checkout -b feat/your-feature
git commit -m "feat: popište svou změnu"
git push -u origin feat/your-feature
```

**Předpony větví**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formát commitu** (Conventional Commits): `feat(db): přidat circuit breaker` — rozsahy: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Prostředí

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES moduly
- **TypeScript**: 5.9+, cíl ES2022, modul esnext, rozlišení bundler
- **Cestovní aliasy**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Výchozí port**: 20128 (API + dashboard na stejném portu)
- **Adresář dat**: `DATA_DIR` env var, výchozí hodnota `~/.omniroute/`
- **Klíčové env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Nastavení: `cp .env.example .env` poté vygenerujte `JWT_SECRET` (`openssl rand -base64 48`) a `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Přísná pravidla

1. Nikdy neprovádějte commit tajemství nebo přihlašovacích údajů
2. Nikdy nepřidávejte logiku do `localDb.ts`
3. Nikdy nepoužívejte `eval()` / `new Function()` / implicitní eval
4. Nikdy neprovádějte commit přímo do `main`
5. Nikdy nepíšete surový SQL v trasách — používejte moduly `src/lib/db/`
6. Nikdy tiše nezachycujte chyby ve SSE streamech
7. Vždy validujte vstupy pomocí Zod schémat
8. Vždy zahrňte testy při změně produkčního kódu
9. Pokrytí musí zůstat ≥75% (příkazy, řádky, funkce) / ≥70% (větve). Aktuálně měřeno: ~82%.
10. Nikdy neobcházejte Husky hooky (`--no-verify`, `--no-gpg-sign`) bez explicitního schválení operátora.
11. Nikdy nezahrnujte veřejné upstream OAuth client_id/secret nebo Firebase Web klíče jako řetězcové literály — vždy používejte `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Viz `docs/security/PUBLIC_CREDS.md`.
12. Nikdy nevracejte surový `err.stack` / `err.message` v HTTP / SSE / odpovědích executorů — vždy procházejte přes `buildErrorBody()` nebo `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Viz `docs/security/ERROR_SANITIZATION.md`.
13. Nikdy neprovádějte interpolaci řetězců externích cest nebo runtime hodnot do shell skriptů předávaných do `exec()`/`spawn()` — předávejte je místo toho přes možnost `env`. Odkaz: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikdy neignorujte upozornění CodeQL / Secret-Scanning bez (a) nejprve zkontrolování dokumentace vzoru výše, abyste zjistili, zda se pomocník vztahuje, a (b) zaznamenání technického odůvodnění do komentáře o zamítnutí. Precedent: `js/stack-trace-exposure` vznesený na místech volání, která již procházejí přes `sanitizeErrorMessage()`, je známé omezení CodeQL (vlastní sanitizátory nejsou rozpoznány) — zamítněte jako `false positive` s odkazem na `docs/security/ERROR_SANITIZATION.md`.
15. Nikdy nezveřejňujte trasy, které spouštějí podřízené procesy (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikace `isLocalOnlyPath()` v `src/server/authz/routeGuard.ts`. Vynucení loopbacku probíhá bezpodmínečně před jakýmkoli ověřením — uniklý JWT přes tunel nemůže spustit proces. Viz `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikdy nezahrnujte `Co-Authored-By` přílohy do zpráv o commitech. Commity musí být zobrazeny pouze pod Git identitou vlastníka repozitáře (`diegosouzapw`). Řádek `Co-Authored-By: Claude …` způsobuje, že GitHub přičítá commity k účtu `claude` Anthropic, což skrývá skutečného autora v historii PR.
