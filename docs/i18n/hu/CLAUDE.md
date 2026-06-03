# CLAUDE.md (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Ez a fájl útmutatást nyújt a Claude Code (claude.ai/code) számára, amikor a kóddal dolgozik ebben a tárolóban.

## Gyors kezdés

```bash
npm install                    # Függőségek telepítése (automatikusan generálja a .env fájlt a .env.example-ból)
npm run dev                    # Fejlesztői szerver a http://localhost:20128 címen
npm run build                  # Termelési build (Next.js 16 önálló)
npm run lint                   # ESLint (0 hiba várható; figyelmeztetések már meglévők)
npm run typecheck:core         # TypeScript ellenőrzés (tiszta kell legyen)
npm run typecheck:noimplicit:core  # Szigorú ellenőrzés (nincs implicit any)
npm run test:coverage          # Egységtesztek + lefedettségi küszöb (75/75/75/70 — állítások/sorok/funkciók/ágak)
npm run check                  # lint + teszt kombinálva
npm run check:cycles           # Körkörös függőségek észlelése
```

### Tesztek futtatása

```bash
# Egyetlen tesztfájl (Node.js natív tesztfuttató — a legtöbb teszt)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP szerver, autoCombo, cache)
npm run test:vitest

# Minden tesztcsomag
npm run test:all
```

A teljes tesztmátrixért lásd a `CONTRIBUTING.md` → "Tesztek futtatása" részt. A mély architektúráért lásd az `AGENTS.md`-t.

---

## Projekt áttekintése

**OmniRoute** — egységes AI proxy/router. Egy végpont, 160+ LLM szolgáltató, automatikus visszaesés.

| Réteg          | Helyszín                | Cél                                                                   |
| -------------- | ----------------------- | --------------------------------------------------------------------- |
| API Útvonalak  | `src/app/api/v1/`       | Next.js App Router — belépési pontok                                  |
| Kezelők        | `open-sse/handlers/`    | Kérés feldolgozás (chat, beágyazások, stb.)                           |
| Végrehajtók    | `open-sse/executors/`   | Szolgáltató-specifikus HTTP küldés                                    |
| Fordítók       | `open-sse/translator/`  | Formátum átalakítás (OpenAI↔Claude↔Gemini)                            |
| Átalakító      | `open-sse/transformer/` | Válaszok API ↔ Chat Befejezések                                       |
| Szolgáltatások | `open-sse/services/`    | Kombinált útvonalak, sebességkorlátok, gyorsítótárazás, stb.          |
| Adatbázis      | `src/lib/db/`           | SQLite domain modulok (45+ fájl, 55 migráció)                         |
| Domain/Szabály | `src/domain/`           | Szabálymotor, költségszabályok, visszaesési logika                    |
| MCP Szerver    | `open-sse/mcp-server/`  | 37 eszköz (30 alap + 3 memória + 4 készség), 3 szállítás, ~13 hatókör |
| A2A Szerver    | `src/lib/a2a/`          | JSON-RPC 2.0 ügynök protokoll                                         |
| Készségek      | `src/lib/skills/`       | Kiterjeszthető készségkeretrendszer                                   |
| Memória        | `src/lib/memory/`       | Tartós beszélgetési memória                                           |

Monorepo: `src/` (Next.js 16 alkalmazás), `open-sse/` (streaming engine munkaterület), `electron/` (asztali alkalmazás), `tests/`, `bin/` (CLI belépési pont).

## Kérés Pipeline

```
Client → /v1/chat/completions (Next.js útvonal)
  → CORS → Zod validáció → auth? → irányelv ellenőrzés → prompt injekció védelem
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache ellenőrzés → sebességkorlátozás → combo routing?
      → resolveComboTargets() → handleSingleModel() célonként
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → újrapróbálkozás visszatartással
    → válasz fordítás → SSE stream vagy JSON
    → Ha Responses API: responsesTransformer.ts TransformStream
```

Az API útvonalak következetes mintát követnek: `Útvonal → CORS előzetes ellenőrzés → Zod testtartalom validáció → Opcionális auth (extractApiKey/isValidApiKey) → API kulcs irányelv érvényesítése → Handler delegálás (open-sse)`. Nincs globális Next.js middleware — az elfogás útvonal-specifikus.

**Combo routing** (`open-sse/services/combo.ts`): 14 stratégia (prioritás, súlyozott, fill-first, round-robin, P2C, véletlenszerű, legkevésbé használt, költségoptimalizált, reset-tudatos, szigorú-véletlenszerű, automatikus, lkgp, kontextus-optimalizált, kontextus-relais). Minden cél hívja a `handleSingleModel()`-t, amely a `handleChatCore()`-t körülveszi célonkénti hibakezeléssel és áramkör megszakító ellenőrzésekkel. Lásd a `docs/routing/AUTO-COMBO.md`-t a 9-faktoros Auto-Combo pontozásért és a `docs/architecture/RESILIENCE_GUIDE.md`-t a 3 ellenállási rétegért.

---

## Ellenállás Futási Állapot

Az OmniRoute három kapcsolódó, de különálló ideiglenes hiba mechanizmust tartalmaz. Tartsd a hatókörüket külön, amikor a routing viselkedést hibakeresed. Lásd a
[3-rétegű ellenállás diagramot](./docs/diagrams/exported/resilience-3layers.svg)
(forrás: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
egy pillantásra való térképhez.

### Szolgáltató Áramkör Megszakító

**Hatókör**: egész szolgáltató, pl. `glm`, `openai`, `anthropic`.

**Cél**: megállítani a forgalom küldését egy szolgáltatóhoz, amely folyamatosan hibázik a
upstream/szolgáltatás szinten, így egy egészségtelen szolgáltató nem lassítja le minden kérdést.

**Megvalósítás**:

- Alap osztály: `src/shared/utils/circuitBreaker.ts`
- Chat kapu/végrehajtási vezetékezés: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Futási állapot API: `src/app/api/monitoring/health/route.ts`
- Megosztott burkolók: `open-sse/services/accountFallback.ts`
- Megtartott állapot tábla: `domain_circuit_breakers`

**Állapotok**:

- `CLOSED`: normál forgalom engedélyezett.
- `OPEN`: a szolgáltató ideiglenesen blokkolva van; a hívók szolgáltató-áramkör-nyitott választ kapnak
  vagy a combo routing átugrik egy másik célra.
- `HALF_OPEN`: a reset időtúllépés eltelt; engedélyez egy próba kérést. A siker bezárja a
  megszakítót, a hiba újra megnyitja.

**Alapértelmezések** (`open-sse/config/constants.ts`):

- OAuth szolgáltatók: küszöb `3`, reset időtúllépés `60s`.
- API-kulcs szolgáltatók: küszöb `5`, reset időtúllépés `30s`.
- Helyi szolgáltatók: küszöb `2`, reset időtúllépés `15s`.

Csak a szolgáltató szintű hiba állapotoknak kell aktiválniuk a szolgáltató megszakítót:

```ts
(408, 500, 502, 503, 504);
```

Ne aktiváld a teljes szolgáltató megszakítót normál fiók/kulcs/modell hibák miatt, mint a legtöbb
`401`, `403`, vagy `429` eset. Ezek általában a kapcsolat lehűléséhez vagy a modell
lezárásához tartoznak. Egy általános API-kulcs szolgáltató `403`-nak helyreállíthatónak kell lennie, hacsak nem minősül végső szolgáltató/fiók hibának.

A megszakító lusta helyreállítást használ, nem háttéridőzítőt. Amikor az `OPEN` lejár, az olyan
olvasások, mint a `getStatus()`, `canExecute()`, és `getRetryAfterMs()` frissítik az állapotot
`HALF_OPEN`-ra, így a műszerfalak és a combo jelölt építők nem zárják ki folyamatosan az
lejárt szolgáltatót.

### Kapcsolat Lehűlés

**Hatókör**: egy szolgáltató kapcsolat/fiók/kulcs.

**Cél**: ideiglenesen kihagyni egy rossz kulcsot/fiókot, miközben lehetővé teszi, hogy más kapcsolatok
ugyanazon szolgáltató számára továbbra is kiszolgálják a kéréseket.

**Megvalósítás**:

- Írás/frissítés útvonal: `src/sse/services/auth.ts::markAccountUnavailable()`
- Fiók kiválasztás/szűrés: `src/sse/services/auth.ts::getProviderCredentials...`
- Lehűlés számítás: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

Fontos mezők a szolgáltató kapcsolatokon:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

A fiók kiválasztásakor egy kapcsolatot kihagynak, amikor:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

A lehűlések is lusták: amikor a `rateLimitedUntil` a múltban van, a kapcsolat újra jogosulttá válik. Sikeres használat esetén a `clearAccountError()` törli a `testStatus`,
`rateLimitedUntil`, hiba mezőket és a `backoffLevel`-t.

Alapértelmezett kapcsolat lehűlés viselkedés:

- OAuth alap lehűlés: `5s`.
- API-kulcs alap lehűlés: `3s`.
- API-kulcs `429` esetén előnyben kell részesíteni az upstream újrapróbálkozási utasításokat (`Retry-After`, reset fejlécek, vagy
  elemezhető reset szöveg), ha elérhető.
- Ismételt helyreállítható hibák exponenciális visszatartást használnak:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Az anti-thundering-herd védelem megakadályozza, hogy a ugyanazon kapcsolaton belüli egyidejű hibák
folyamatosan meghosszabbítsák a lehűlést vagy duplán növeljék a `backoffLevel`-t.

A végső állapotok nem lehűlések. A `banned`, `expired`, és `credits_exhausted` állapotoknak
elérhetetlennek kell maradniuk, amíg a hitelesítési adatok/beállítások meg nem változnak, vagy egy operátor nem állítja vissza őket. Ne írj felül végső állapotokat átmeneti lehűlési állapottal.

### Modell Lezárás

**Hatókör**: szolgáltató + kapcsolat + modell.

**Cél**: elkerülni, hogy egy egész kapcsolat le legyen tiltva, amikor csak egy modell nem elérhető vagy
kvóta-korlátozott az adott kapcsolathoz.

Példák:

- Modellenkénti kvóta szolgáltatók, amelyek `429`-et adnak vissza.
- Helyi szolgáltatók, amelyek `404`-et adnak vissza egy hiányzó modell miatt.
- Szolgáltató-specifikus mód/modell engedélyezési hibák, mint például a kiválasztott Grok módok.

A modell lezárás az `open-sse/services/accountFallback.ts`-ben található, és lehetővé teszi, hogy ugyanaz a
kapcsolat továbbra is kiszolgálja a többi modellt.

### Hibakeresési Útmutató

- Ha egy szolgáltató összes kulcsa ki van hagyva, ellenőrizd a szolgáltató megszakító állapotát és minden
  kapcsolat `rateLimitedUntil`/`testStatus`-át.
- Ha egy szolgáltató véglegesen kizártnak tűnik a reset ablak után, ellenőrizd, hogy a kód
  nyers `state`-et olvas-e ahelyett, hogy a `getStatus()`/`canExecute()`-t használná.
- Ha egy szolgáltató kulcs hibázik, de másoknak működniük kellene, előnyben részesítsd a kapcsolat lehűlést a
  szolgáltató megszakítóval szemben.
- Ha csak egy modell hibázik, előnyben részesítsd a modell lezárást a kapcsolat lehűléssel szemben.
- Ha egy állapotnak önmagát kell helyreállítania, jövőbeli időbélyeggel/reset időtúllépéssel kell rendelkeznie, és egy
  olvasási útnak, amely frissíti a lejárt állapotot. A végleges állapotok kézi hitelesítési
  vagy konfigurációs változtatásokat igényelnek.

## Kulcsfontosságú Konvenciók

### Kód Stílus

- **2 szóköz**, pontosvesszők, dupla idézőjelek, 100 karakter szélesség, es5 végső vesszők (lint-staged által a Prettier-en keresztül érvényesítve)
- **Importok**: külső → belső (`@/`, `@omniroute/open-sse`) → relatív
- **Elnevezés**: fájlok=camelCase/kebab, komponensek=PascalCase, konstansok=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = hiba mindenhol; `no-explicit-any` = figyelmeztetés az `open-sse/` és `tests/` mappákban
- **TypeScript**: `strict: false`, cél ES2022, modul esnext, felbontás bundler. Előnyben részesítjük a kifejezett típusokat.

### Adatbázis

- **Mindig** a `src/lib/db/` domain modulokon keresztül haladjunk — **soha** ne írj nyers SQL-t az útvonalakban vagy kezelőkben
- **Soha** ne adj logikát a `src/lib/localDb.ts` fájlhoz (csak újraexportáló réteg)
- **Soha** ne barrel-importálj a `localDb.ts`-ből — inkább importáld a konkrét `db/` modulokat
- DB singleton: `getDbInstance()` a `src/lib/db/core.ts`-ből (WAL naplózás)
- Migrációk: `src/lib/db/migrations/` — verziózott SQL fájlok, idempotens, tranzakciókban futnak

### Hiba Kezelés

- try/catch specifikus hibatípusokkal, naplózás pino kontextussal
- Soha ne nyelj el hibákat SSE stream-ekben — használj abort jelzéseket a takarításhoz
- Térj vissza megfelelő HTTP státuszkódokkal (4xx/5xx)

### Biztonság

- **Soha** ne használd az `eval()`, `new Function()`, vagy implikált eval-t
- Érvényesítsd az összes bemenetet Zod sémákkal
- Titkosítsd a hitelesítő adatokat nyugalomban (AES-256-GCM)
- Felsőbb szintű fejléc tiltólista: `src/shared/constants/upstreamHeaders.ts` — tartsd a tisztítást, Zod sémákat és egységteszteket összhangban a szerkesztés során
- **Nyilvános felsőbb szintű hitelesítő adatok** (Gemini/Antigravity/Windsurf-stílusú OAuth client_id/secret + Firebase Web kulcsok, amelyeket nyilvános CLI-kből nyerünk ki): **KÖTELEZŐ** beágyazni a `resolvePublicCred()` segítségével az `open-sse/utils/publicCreds.ts`-ből — **soha** ne string literálként. Lásd a `docs/security/PUBLIC_CREDS.md`-t a kötelező mintáért.
- **Hiba válaszok** (HTTP / SSE / végrehajtó / MCP kezelő): **KÖTELEZŐ** átirányítani a `buildErrorBody()` vagy `sanitizeErrorMessage()` segítségével az `open-sse/utils/error.ts`-ből — **soha** ne tedd a nyers `err.stack` vagy `err.message`-t a válasz törzsbe. Lásd a `docs/security/ERROR_SANITIZATION.md`-t.
- **Shell parancsok változókból**: amikor `exec()`/`spawn()`-t hívsz egy olyan szkripttel, amely futási értékeket igényel, add át őket az `env` opcióval (automatikusan shell-escaped) — **soha** ne interpolálj megbízhatatlan/external útvonalakat a szkript törzsébe. Hivatkozás: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biztonságos alapértelmezett könyvtárak** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): előnyben részesítjük a Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink használatát a saját megvalósításokkal szemben, amikor új biztonságérzékeny felületeket adunk hozzá.

---

## Gyakori Módosítási Szenáriók

### Új Szolgáltató Hozzáadása

1. Regisztrálj a `src/shared/constants/providers.ts`-ben (Zod-érvényesítve betöltéskor)
2. Adj hozzá végrehajtót az `open-sse/executors/`-ban, ha egyedi logikára van szükség (bővítsd a `BaseExecutor`-t)
3. Adj hozzá fordítót az `open-sse/translator/`-ban, ha nem OpenAI formátum
4. Adj hozzá OAuth konfigurációt a `src/lib/oauth/constants/oauth.ts`-ban, ha OAuth-alapú — ha a felsőbb CLI nyilvános client_id/secret-et szállít, ágyazd be a `resolvePublicCred()` segítségével (lásd a `docs/security/PUBLIC_CREDS.md`-t), **soha** ne literálként
5. Regisztráld a modelleket a `open-sse/config/providerRegistry.ts`-ben
6. Írj teszteket a `tests/unit/`-ban (tartalmazza a publicCreds forma állítást, ha új beágyazott alapértelmezettet adtál hozzá)

### Új API Útvonal Hozzáadása

1. Hozz létre egy könyvtárat a `src/app/api/v1/your-route/` alatt
2. Hozz létre `route.ts`-t `GET`/`POST` kezelőkkel
3. Kövesd a mintát: CORS → Zod törzs érvényesítés → opcionális hitelesítés → kezelő delegálás
4. A kezelő az `open-sse/handlers/`-ban van (onnan importálj, ne inline)
5. A hiba válaszok használják a `buildErrorBody()` / `errorResponse()`-t az `open-sse/utils/error.ts`-ből (automatikusan tisztítva — soha ne tedd a `err.stack` vagy `err.message` nyers formáját a törzsbe). Lásd a `docs/security/ERROR_SANITIZATION.md`-t.
6. Adj hozzá teszteket — beleértve legalább egy állítást, hogy a hiba válaszok ne szivárogjanak stack trace-eket (`!body.error.message.includes("at /")`)

### Új DB Modul Hozzáadása

1. Hozz létre `src/lib/db/yourModule.ts` — importáld a `getDbInstance`-t a `./core.ts`-ből
2. Exportáld a CRUD funkciókat a domain tábláidhoz
3. Adj hozzá migrációt a `src/lib/db/migrations/`-ban, ha új táblákra van szükség
4. Újraexportálás a `src/lib/localDb.ts`-ből (csak a re-export listához add hozzá)
5. Írj teszteket

### Új MCP Eszköz Hozzáadása

1. Adj eszköz definíciót az `open-sse/mcp-server/tools/`-ban Zod bemeneti séma + aszinkron kezelő
2. Regisztráld az eszközkészletben (a `createMcpServer()` által vezérelve)
3. Rendeld hozzá a megfelelő hatókörökhöz
4. Írj teszteket (az eszköz hívás naplózva a `mcp_audit` táblába)

### Új A2A Képesség Hozzáadása

1. Hozz létre képességet a `src/lib/a2a/skills/`-ban (5 már létezik: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. A képesség feladatkörnyezetet kap (üzenetek, metaadatok) → strukturált eredményt ad vissza
3. Regisztráld az `A2A_SKILL_HANDLERS`-ben a `src/lib/a2a/taskExecution.ts`-ben
4. Tedd elérhetővé a `src/app/.well-known/agent.json/route.ts`-ban (Agent Card)
5. Írj teszteket a `tests/unit/`-ban
6. Dokumentáld a `docs/frameworks/A2A-SERVER.md` képesség táblázatban

### Új Felhő Ügynök Hozzáadása

1. Hozz létre ügynök osztályt a `src/lib/cloudAgent/agents/`-ban, amely kiterjeszti a `CloudAgentBase`-t (3 már létezik: codex-cloud, devin, jules)
2. Implementáld a `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` funkciókat
3. Regisztráld a `src/lib/cloudAgent/registry.ts`-ben
4. Adj hozzá OAuth/hitelesítő adatkezelést, ha szükséges (`src/lib/oauth/providers/`)
5. Tesztek + dokumentáció a `docs/frameworks/CLOUD_AGENT.md`-ban

### Új Guardrail / Eval / Képesség / Webhook esemény Hozzáadása

- Guardrail: `src/lib/guardrails/` → dokumentáció: `docs/security/GUARDRAILS.md`
- Eval csomag: `src/lib/evals/` → dokumentáció: `docs/frameworks/EVALS.md`
- Képesség (sandbox): `src/lib/skills/` → dokumentáció: `docs/frameworks/SKILLS.md`
- Webhook esemény: `src/lib/webhookDispatcher.ts` → dokumentáció: `docs/frameworks/WEBHOOKS.md`

## Referencia Dokumentáció

Bármilyen nem triviális változtatás előtt olvasd el a megfelelő mélyreható anyagot:

| Terület                                        | Dokumentum                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| Repo navigáció                                 | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architektúra                                   | `docs/architecture/ARCHITECTURE.md`                               |
| Mérnöki referencia                             | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktoros pontozás, 14 stratégia) | `docs/routing/AUTO-COMBO.md`                                      |
| Ellenállás (3 mechanizmus)                     | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Érvelés újrajátszása                           | `docs/routing/REASONING_REPLAY.md`                                |
| Készségek keretrendszere                       | `docs/frameworks/SKILLS.md`                                       |
| Memória rendszer (FTS5 + Qdrant)               | `docs/frameworks/MEMORY.md`                                       |
| Felhő ügynökök                                 | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Védőkorlátok (PII / injekció / látás)          | `docs/security/GUARDRAILS.md`                                     |
| Nyilvános upstream hitelesítések (Gemini/stb.) | `docs/security/PUBLIC_CREDS.md`                                   |
| Hibaüzenetek tisztítása                        | `docs/security/ERROR_SANITIZATION.md`                             |
| Értékelések                                    | `docs/frameworks/EVALS.md`                                        |
| Megfelelőség / audit                           | `docs/security/COMPLIANCE.md`                                     |
| Webhookok                                      | `docs/frameworks/WEBHOOKS.md`                                     |
| Engedélyezési folyamat                         | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Rejtőzködés (TLS / ujjlenyomat)                | `docs/security/STEALTH_GUIDE.md`                                  |
| Ügynök protokollok (A2A / ACP / Felhő)         | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP szerver                                    | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A szerver                                    | `docs/frameworks/A2A-SERVER.md`                                   |
| API referencia + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Szolgáltató katalógus (automatikusan generált) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Kiadási folyamat                               | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Tesztelés

| Mi                      | Parancs                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| Egységtesztek           | `npm run test:unit`                                                   |
| Egyetlen fájl           | `node --import tsx/esm --test tests/unit/file.test.ts`                |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                 |
| E2E (Playwright)        | `npm run test:e2e`                                                    |
| Protokoll E2E (MCP+A2A) | `npm run test:protocols:e2e`                                          |
| Ökoszisztéma            | `npm run test:ecosystem`                                              |
| Lefedettségi küszöb     | `npm run test:coverage` (75/75/75/70 — állítások/sorok/funkciók/ágak) |
| Lefedettségi jelentés   | `npm run coverage:report`                                             |

**PR szabály**: Ha megváltoztatod a termelési kódot a `src/`, `open-sse/`, `electron/` vagy `bin/` mappákban, akkor teszteket kell hozzáadnod vagy frissítened ugyanabban a PR-ben.

**Teszt réteg preferencia**: egység először → integráció (több modul vagy DB állapot) → e2e (UI/munkafolyamat csak). A hibák reprodukálását automatizált tesztekké kell alakítani a javítás előtt vagy annak mellett.

**Copilot lefedettségi irányelv**: Amikor egy PR megváltoztatja a termelési kódot és a lefedettség 75% alatt van (állítások/sorok/funkciók) vagy 70% alatt (ágak), ne csak jelentsd — adj hozzá vagy frissíts teszteket, futtasd újra a lefedettségi küszöböt, majd kérj megerősítést. A PR jelentésben tüntesd fel a futtatott parancsokat, a megváltozott tesztfájlokat és a végső lefedettségi eredményt.

---

## Git Munkafolyamat

```bash
# Soha ne kötelezz közvetlenül a main-re
git checkout -b feat/your-feature
git commit -m "feat: írd le a változtatásodat"
git push -u origin feat/your-feature
```

**Ág előtagok**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Kötelezési formátum** (Hagyományos Kötelezések): `feat(db): add circuit breaker` — területek: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hook-ok**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Környezet

- **Futtatás**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, cél ES2022, modul esnext, felbontás bundler
- **Útvonal aliasok**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Alapértelmezett port**: 20128 (API + dashboard ugyanazon a porton)
- **Adatkönyvtár**: `DATA_DIR` környezeti változó, alapértelmezett: `~/.omniroute/`
- **Kulcs környezeti változók**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Beállítás: `cp .env.example .env`, majd generálj `JWT_SECRET`-et (`openssl rand -base64 48`) és `API_KEY_SECRET`-et (`openssl rand -hex 32`)

---

## Kemény Szabályok

1. Soha ne kötelezz titkokat vagy hitelesítő adatokat
2. Soha ne adj hozzá logikát a `localDb.ts`-hez
3. Soha ne használd az `eval()` / `new Function()` / implikált eval
4. Soha ne kötelezz közvetlenül a `main`-re
5. Soha ne írj nyers SQL-t az útvonalakban — használd a `src/lib/db/` modulokat
6. Soha ne nyelj el csendben hibákat az SSE folyamokban
7. Mindig érvényesítsd a bemeneteket Zod sémákkal
8. Mindig tartalmazz teszteket, amikor megváltoztatod a termelési kódot
9. A lefedettségnek ≥75%-on (állítások, sorok, funkciók) / ≥70%-on (ágak) kell maradnia. Jelenlegi mért: ~82%.
10. Soha ne kerüld meg a Husky hook-okat (`--no-verify`, `--no-gpg-sign`) kifejezett operátori jóváhagyás nélkül.
11. Soha ne ágyazz be nyilvános upstream OAuth client_id/secret vagy Firebase Web kulcsokat szöveges literálokként — mindig a `resolvePublicCred()`-en keresztül járj el (`open-sse/utils/publicCreds.ts`). Lásd: `docs/security/PUBLIC_CREDS.md`.
12. Soha ne térj vissza nyers `err.stack` / `err.message` értékekkel HTTP / SSE / végrehajtó válaszokban — mindig a `buildErrorBody()` vagy `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) útvonalon keresztül járj el. Lásd: `docs/security/ERROR_SANITIZATION.md`.
13. Soha ne interpolálj külső útvonalakat vagy futási értékeket shell szkriptekbe, amelyeket az `exec()`/`spawn()`-nak adsz át — inkább az `env` opcióval add át. Hivatkozás: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Soha ne utasíts el egy CodeQL / Secret-Scanning riasztást anélkül, hogy (a) először ellenőriznéd a fenti mintázat dokumentációját, hogy lássad, alkalmazható-e a segédprogram, és (b) rögzítenéd a technikai indoklást az elutasító megjegyzésben. Precedens: `js/stack-trace-exposure` emelt a hívási helyeken, amelyek már a `sanitizeErrorMessage()`-en keresztül haladnak, egy ismert CodeQL korlátozás (egyedi szűrők nem ismertek) — utasítsd el `false positive`-ként, hivatkozva a `docs/security/ERROR_SANITIZATION.md`-ra.
15. Soha ne tedd közzé azokat az útvonalakat, amelyek gyermek folyamatokat indítanak (`/api/mcp/`, `/api/cli-tools/runtime/`) anélkül, hogy a `isLocalOnlyPath()` osztályozás szerepelne a `src/server/authz/routeGuard.ts`-ben. A hurok visszahatása feltétel nélkül megtörténik bármilyen hitelesítési ellenőrzés előtt — a csatornán keresztül kiszivárgott JWT nem indíthat folyamatot. Lásd: `docs/security/ROUTE_GUARD_TIERS.md`.
16. Soha ne tartalmazz `Co-Authored-By` trailer-eket, amelyek AI-asszisztenst, LLM-et vagy automatizálási fiókot ismernek el (pl. "Claude", "GPT", "Copilot", "Bot" tartalmú nevek; `anthropic.com` / `openai.com` / bot tulajdonú `noreply.github.com` címeken lévő e-mailek). Az ilyen trailer-ek a commit-attribúciót a bot fiókhoz irányítják a GitHubon, elrejtve a valódi szerzőt (`diegosouzapw`) a PR-történetben. Az emberi közreműködők — beleértve az upstream PR-szerzőket és az OmniRoute-ba portolt issue-bejelentőket — szabványos `Co-authored-by: Name <email>` trailer-ekkel jóváírhatók és JÓVÁ KELL ÍRNI; az upstream-port munkafolyamatok (`/port-upstream-features`, `/port-upstream-issues`) ettől függenek.
