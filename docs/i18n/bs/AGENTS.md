# OmniRoute agent guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../AGENTS.md) · 🇪🇹 [am](../am/AGENTS.md) · 🇸🇦 [ar](../ar/AGENTS.md) · 🇦🇿 [az](../az/AGENTS.md) · 🇧🇬 [bg](../bg/AGENTS.md) · 🇧🇩 [bn](../bn/AGENTS.md) · 🇨🇿 [cs](../cs/AGENTS.md) · 🇩🇰 [da](../da/AGENTS.md) · 🇩🇪 [de](../de/AGENTS.md) · 🇬🇷 [el](../el/AGENTS.md) · 🇪🇸 [es](../es/AGENTS.md) · 🇪🇪 [et](../et/AGENTS.md) · 🇮🇷 [fa](../fa/AGENTS.md) · 🇫🇮 [fi](../fi/AGENTS.md) · 🇫🇷 [fr](../fr/AGENTS.md) · 🇮🇪 [ga](../ga/AGENTS.md) · 🇮🇳 [gu](../gu/AGENTS.md) · 🇳🇬 [ha](../ha/AGENTS.md) · 🇮🇱 [he](../he/AGENTS.md) · 🇮🇳 [hi](../hi/AGENTS.md) · 🇭🇷 [hr](../hr/AGENTS.md) · 🇭🇺 [hu](../hu/AGENTS.md) · 🇦🇲 [hy](../hy/AGENTS.md) · 🇮🇩 [id](../id/AGENTS.md) · 🇳🇬 [ig](../ig/AGENTS.md) · 🇮🇹 [it](../it/AGENTS.md) · 🇯🇵 [ja](../ja/AGENTS.md) · 🇬🇪 [ka](../ka/AGENTS.md) · 🇰🇭 [km](../km/AGENTS.md) · 🇮🇳 [kn](../kn/AGENTS.md) · 🇰🇷 [ko](../ko/AGENTS.md) · 🇱🇹 [lt](../lt/AGENTS.md) · 🇱🇻 [lv](../lv/AGENTS.md) · 🇮🇳 [ml](../ml/AGENTS.md) · 🇮🇳 [mr](../mr/AGENTS.md) · 🇲🇾 [ms](../ms/AGENTS.md) · 🇲🇹 [mt](../mt/AGENTS.md) · 🇲🇲 [my](../my/AGENTS.md) · 🇳🇵 [ne](../ne/AGENTS.md) · 🇳🇱 [nl](../nl/AGENTS.md) · 🇳🇴 [no](../no/AGENTS.md) · 🇮🇳 [or](../or/AGENTS.md) · 🇮🇳 [pa](../pa/AGENTS.md) · 🇵🇭 [phi](../phi/AGENTS.md) · 🇵🇱 [pl](../pl/AGENTS.md) · 🇵🇹 [pt](../pt/AGENTS.md) · 🇧🇷 [pt-BR](../pt-BR/AGENTS.md) · 🇷🇴 [ro](../ro/AGENTS.md) · 🇷🇺 [ru](../ru/AGENTS.md) · 🇱🇰 [si](../si/AGENTS.md) · 🇸🇰 [sk](../sk/AGENTS.md) · 🇸🇮 [sl](../sl/AGENTS.md) · 🇷🇸 [sr](../sr/AGENTS.md) · 🇸🇪 [sv](../sv/AGENTS.md) · 🇰🇪 [sw](../sw/AGENTS.md) · 🇮🇳 [ta](../ta/AGENTS.md) · 🇮🇳 [te](../te/AGENTS.md) · 🇹🇭 [th](../th/AGENTS.md) · 🇹🇷 [tr](../tr/AGENTS.md) · 🇺🇦 [uk-UA](../uk-UA/AGENTS.md) · 🇵🇰 [ur](../ur/AGENTS.md) · 🇺🇿 [uz](../uz/AGENTS.md) · 🇻🇳 [vi](../vi/AGENTS.md) · 🇳🇬 [yo](../yo/AGENTS.md) · 🇨🇳 [zh-CN](../zh-CN/AGENTS.md) · 🇹🇼 [zh-TW](../zh-TW/AGENTS.md)

---

> **Jedinstveni izvor istine.** Ova datoteka sadrži SVA projektna pravila, konvencije, napomene o arhitekturi
> i stroga pravila za svakog AI asistenta koji radi na ovom repozitoriju (Claude Code, Gemini, Codex,
> Copilot i svaki drugi agent). `CLAUDE.md` i `GEMINI.md` samo dodaju razlike specifične za asistenta
> i upućuju nazad na ovu datoteku. Kada je potrebno promijeniti pravilo, promijenite ga OVDJE — nikada ga nemojte ponovo izdvajati u
> datoteku specifičnu za asistenta.

## Brzi početak

```bash
npm install                    # Instalirajte zavisnosti (automatski generira .env iz .env.example)
npm run dev                    # Razvojni server na http://localhost:20128
npm run build                  # Produkcijska izgradnja (samostalni Next.js 16)
npm run build:release          # Izdanje za objavu
npm run lint                   # ESLint (očekuje se 0 grešaka; upozorenja već postoje)
npm run typecheck:core         # TypeScript provjera (treba proći bez grešaka)
npm run typecheck:noimplicit:core  # Stroga provjera (bez implicitnog any)
npm run test:coverage          # Jedinični testovi + prag pokrivenosti (60/60/60/60 — naredbe/linije/funkcije/grane)
npm run check                  # kombinovani lint + test
npm run check:cycles           # Otkrivanje kružnih zavisnosti (savjetodavno — ispisuje SCC-ove)
npm run check:cycles:ratchet   # Isto skeniranje, blokira iznad gornje granice osnovnog nivoa kvaliteta
npm run check:docs-all         # Pokrenite nakon izmjene dokumentacije (uključuje provjeru izmišljene dokumentacije)
```

### Pokretanje testova

Prvo pokrenite najuže usmjeren test za izmijenjeni kôd:

```bash
# Jedna testna datoteka (izvorni Node.js pokretač testova — većina testova)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, keš)
npm run test:vitest

# Svi testni paketi
npm run test:all
```

Ostali testni paketi: `npm run test:e2e`, `npm run test:protocols:e2e`, `npm run test:ecosystem`.

Za potpunu matricu testova pogledajte `CONTRIBUTING.md` → "Pokretanje testova". Za detaljnu arhitekturu pogledajte
odjeljke Mapa repozitorija i Referentna dokumentacija u nastavku.

---

## Kratak pregled projekta

**OmniRoute** — objedinjeni AI proxy/usmjerivač. Jedna krajnja tačka, 374 LLM pružaoca usluga, automatski rezervni odabir.

| Sloj           | Lokacija                | Svrha                                                                                                                                                                               |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API rute       | `src/app/api/v1/`       | Next.js App Router — ulazne tačke                                                                                                                                                   |
| Rukovaoci      | `open-sse/handlers/`    | Obrada zahtjeva (razgovor, ugrađivanja itd.)                                                                                                                                        |
| Izvršioci      | `open-sse/executors/`   | HTTP prosljeđivanje specifično za pružaoca usluge                                                                                                                                   |
| Prevodioci     | `open-sse/translator/`  | Konverzija formata (OpenAI↔Claude↔Gemini)                                                                                                                                           |
| Transformator  | `open-sse/transformer/` | Responses API ↔ Chat Completions                                                                                                                                                    |
| Servisi        | `open-sse/services/`    | Kombinovano usmjeravanje, ograničenja brzine, keširanje itd.                                                                                                                        |
| Baza podataka  | `src/lib/db/`           | SQLite domenski moduli (202 migracije)                                                                                                                                              |
| Domena/pravila | `src/domain/`           | Mehanizam pravila, pravila troškova, logika rezervnog odabira                                                                                                                       |
| MCP server     | `open-sse/mcp-server/`  | 110 alata (45 kanonskih + moduli za memoriju/vještine/GitHub/skup/gejmifikaciju/dodatke/Notion/Obsidian/lokalni korpus/RTK), 3 prijenosa (stdio / SSE / Streamable HTTP), 33 opsega |
| A2A server     | `src/lib/a2a/`          | JSON-RPC 2.0 protokol za agente                                                                                                                                                     |
| Vještine       | `src/lib/skills/`       | Proširivi okvir za vještine                                                                                                                                                         |
| Memorija       | `src/lib/memory/`       | Trajna konverzacijska memorija                                                                                                                                                      |

Monorepozitorij: `src/` (Next.js 16 aplikacija), `open-sse/` (radni prostor mehanizma za streaming), `electron/` (desktop aplikacija), `tests/`, `bin/` (ulazna tačka CLI-ja).

---

## Tok zahtjeva

```
Klijent → /v1/chat/completions (Next.js ruta)
  → CORS → Zod validacija → autentifikacija? → provjera pravila → zaštita od ubacivanja prompta
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → provjera keša → ograničenje učestalosti → kombinovano usmjeravanje?
      → resolveComboTargets() → handleSingleModel() za svako odredište
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() prema nadređenom servisu → ponovni pokušaj uz postepeno povećavanje čekanja
    → transformacija odgovora → SSE tok ili JSON
    → Ako je Responses API: responsesTransformer.ts TransformStream
```

API rute slijede dosljedan obrazac: `Ruta → CORS preflight → Zod validacija tijela → Opcionalna autentifikacija (extractApiKey/isValidApiKey) → Primjena pravila za API ključ → Delegiranje obrađivaču (open-sse)`. Ne postoji globalni Next.js middleware — presretanje je specifično za rutu.

**Kombinovano usmjeravanje** (`open-sse/services/combo.ts`): 21 javna strategija (priority, weighted, fill-first, round-robin, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, context-relay, fusion, pipeline). Svako odredište poziva `handleSingleModel()`, koji obavija `handleChatCore()` obradom grešaka po odredištu i provjerama prekidača strujnog kruga. Strategija `fusion` je izuzetak: paralelno šalje zahtjeve panelu modela, a zatim model-sudija sintetizira jedan konačni odgovor (`open-sse/services/fusion.ts`). Pogledajte `docs/routing/AUTO-COMBO.md` za Auto-Combo bodovanje sa 16 faktora i potpunu tabelu strategija, a `docs/architecture/RESILIENCE_GUIDE.md` za 3 sloja otpornosti.

---

## Stanje otpornosti tokom izvršavanja

OmniRoute ima tri povezana, ali različita mehanizma za privremene kvarove. Prilikom otklanjanja grešaka u ponašanju usmjeravanja držite njihove opsege odvojenim. Pogledajte
[dijagram otpornosti u 3 sloja](./docs/diagrams/exported/resilience-3layers.svg)
(izvor: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
za pregled na prvi pogled.

### Prekidač strujnog kruga pružaoca usluga

**Opseg**: cijeli pružalac usluga, npr. `glm`, `openai`, `anthropic`.

**Svrha**: prestati slati saobraćaj pružaocu usluga koji opetovano otkazuje na nivou nadređenog sistema/usluge, kako jedan neispravan pružalac usluga ne bi usporavao svaki zahtjev.

**Implementacija**:

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje pristupne provjere/izvršavanja chata: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa tokom izvršavanja: `src/app/api/monitoring/health/route.ts`
- Zajednički omotači: `open-sse/services/accountFallback.ts`
- Tabela trajno pohranjenog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalan saobraćaj je dozvoljen.
- `DEGRADED`: raspon ranog upozorenja — kvarovi su prešli prag degradacije, ali još nisu prešli prag prekidača; saobraćaj i dalje prolazi, a nadzorne ploče prikazuju upozorenje.
- `OPEN`: pružalac usluga je privremeno blokiran; pozivaoci dobijaju odgovor da je prekidač strujnog kruga pružaoca otvoren ili kombinovano usmjeravanje prelazi na drugo odredište.
- `HALF_OPEN`: isteklo je vrijeme čekanja za resetiranje; dozvoljava se probni zahtjev. Uspjeh zatvara prekidač, a neuspjeh ga ponovo otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koriste se putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Prekidač za cijelog pružaoca usluga
radi na osnovu `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira se pri | otvara se pri (`circuitBreakerThreshold`) | resetiranje (`circuitBreakerReset`) |
| --------- | ---------------: | ----------------------------------------: | ----------------------------------: |
| OAuth     |              `5` |                                       `8` |                               `60s` |
| API ključ |              `7` |                                      `12` |                               `30s` |
| Lokalni   |       (izvedeno) |                                       `2` |                               `15s` |

`PROVIDER_PROFILES` također definira `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**prozor provjere opcionalnog globalnog perioda hlađenja pružaoca usluga** (`PROVIDER_COOLDOWN_ENABLED`, zadano
isključeno) — unos na nivou pružaoca usluga u `open-sse/services/providerCooldownTracker.ts` računa se kao
hlađenje tek nakon `providerFailureThreshold` kvarova unutar `providerFailureWindowMs`, a zatim
traje `providerCooldownMs`. To NISU pragovi aktivnog prekidača — nemojte ih podešavati
očekujući ponašanje prekidača. Svaka zadana vrijednost može se zamijeniti putem varijabli okruženja
`OMNIROUTE_PROVIDER_BREAKER_*` i `OMNIROUTE_CIRCUIT_BREAKER_*`; referentna tabela usklađena sa stanjem tokom izvršavanja nalazi se u `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi kvarova na nivou pružaoca usluga trebaju aktivirati prekidač pružaoca usluga:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati prekidač za cijelog pružaoca usluga zbog uobičajenih grešaka računa/ključa/modela, kao što je većina slučajeva
`401`, `403` ili `429`. One obično pripadaju periodu hlađenja veze ili
zaključavanju modela. Generička greška `403` pružaoca API ključa trebala bi biti nadoknadiva, osim ako je klasificirana
kao terminalna greška pružaoca usluga/računa.

Prekidač koristi lijeni oporavak, a ne pozadinski tajmer. Kada stanje `OPEN` istekne, čitanja kao što su
`getStatus()`, `canExecute()` i `getRetryAfterMs()` osvježavaju stanje na
`HALF_OPEN`, tako da nadzorne ploče i sastavljači kombinovanih kandidata ne nastavljaju zauvijek isključivati
pružaoca usluga kojem je period blokade istekao.

### Period hlađenja veze

**Opseg**: jedna veza/račun/ključ pružaoca usluga.

**Svrha**: privremeno preskočiti jedan neispravan ključ/račun, istovremeno omogućavajući drugim vezama
istog pružaoca usluga da nastave obrađivati zahtjeve.

**Implementacija**:

- Putanja upisa/ažuriranja: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun perioda hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na vezama pružaoca usluga:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tokom odabira računa, konekcija se preskače dok vrijedi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Periodi hlađenja su također lijeni: kada je `rateLimitedUntil` u prošlosti, konekcija ponovo
postaje dostupna. Nakon uspješne upotrebe, `clearAccountError()` briše `testStatus`,
`rateLimitedUntil`, polja grešaka i `backoffLevel`.

Zadano ponašanje perioda hlađenja konekcije:

- Osnovni OAuth period hlađenja: `5s`.
- Osnovni period hlađenja za API ključ: `3s`.
- Za API ključ, odgovor `429` treba dati prednost uzvodnim naznakama za ponovni pokušaj (`Retry-After`, zaglavlja za resetiranje ili
  tekst o resetiranju koji se može raščlaniti) kada su dostupne.
- Ponovljeni oporavljivi neuspjesi koriste eksponencijalno odlaganje:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od stampeda sprječava da istovremeni neuspjesi na istoj konekciji
uzastopno produžavaju period hlađenja ili dvostruko povećavaju `backoffLevel`.

Terminalna stanja nisu periodi hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N ograničenih ponovnih pokušaja putem `EXPIRED_RETRY_MAX`) i `credits_exhausted`
trebaju ostati nedostupni dok se vjerodajnice/postavke ne promijene ili ih operater ne resetira.
Nemojte prepisivati terminalna stanja prolaznim stanjem perioda hlađenja.

### Blokiranje modela

**Opseg**: pružalac + konekcija + model.

**Svrha**: izbjeći onemogućavanje cijele konekcije kada je samo jedan model nedostupan ili
ograničen kvotom za tu konekciju.

Primjeri:

- Pružaoci s kvotama po modelu koji vraćaju `429`.
- Lokalni pružaoci koji vraćaju `404` za jedan model koji nedostaje.
- Neuspjesi dozvola specifični za način rada/model pružaoca, poput odabranih Grok načina rada.

Blokiranje modela nalazi se u `open-sse/services/accountFallback.ts` i omogućava istoj
konekciji da nastavi posluživati druge modele.

### Smjernice za otklanjanje grešaka

- Ako su svi ključevi za nekog pružaoca preskočeni, provjerite i stanje prekidača pružaoca i
  `rateLimitedUntil`/`testStatus` svake konekcije.
- Ako se čini da je pružalac trajno isključen nakon perioda resetiranja, provjerite čita li kod
  sirovi `state` umjesto da koristi `getStatus()`/`canExecute()`.
- Ako jedan ključ pružaoca ne uspije, ali bi drugi trebali raditi, dajte prednost periodu hlađenja konekcije nad
  prekidačem pružaoca.
- Ako samo jedan model ne uspije, dajte prednost blokiranju modela nad periodom hlađenja konekcije.
- Ako se stanje treba samo oporaviti, treba imati buduću vremensku oznaku/vremensko ograničenje resetiranja i
  putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne promjene
  vjerodajnica ili konfiguracije.

---

## Mapa repozitorija

Pročitajte najbliži `AGENTS.md` i povezanu detaljnu dokumentaciju prije nego što napravite netrivijalnu izmjenu.

| Oblast                             | Lokacija                                                | Počnite ovdje                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| API rute                           | `src/app/api/v1/`                                       | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Obrada streaming zahtjeva          | `open-sse/handlers/`                                    | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| Izvršavanje i prevođenje pružalaca | `open-sse/executors/`, `open-sse/translator/`           | [`docs/architecture/CODEBASE_DOCUMENTATION.md`](docs/architecture/CODEBASE_DOCUMENTATION.md)                                                     |
| Usmjeravanje i otpornost           | `open-sse/services/`                                    | [`open-sse/services/AGENTS.md`](open-sse/services/AGENTS.md), [`docs/routing/AUTO-COMBO.md`](docs/routing/AUTO-COMBO.md)                         |
| Baza podataka i migracije          | `src/lib/db/`, `src/lib/db/migrations/`                 | [`src/lib/db/AGENTS.md`](src/lib/db/AGENTS.md)                                                                                                   |
| Politika domene                    | `src/domain/`                                           | [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)                                                                         |
| MCP i A2A                          | `open-sse/mcp-server/`, `src/lib/a2a/`                  | [`docs/frameworks/MCP-SERVER.md`](docs/frameworks/MCP-SERVER.md), [`docs/frameworks/A2A-SERVER.md`](docs/frameworks/A2A-SERVER.md)               |
| Funkcionalnosti agenata            | `src/lib/{acp,memory,skills,cloudAgent}/`               | [`docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`](docs/frameworks/AGENT_PROTOCOLS_GUIDE.md), [`docs/frameworks/SKILLS.md`](docs/frameworks/SKILLS.md) |
| Sigurnost i upravljanje            | `src/lib/{guardrails,compliance}/`, `src/server/authz/` | [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md), [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md)             |
| Operacije                          | `src/mitm/`, moduli tunela, `electron/`                 | [`docs/ops/TUNNELS_GUIDE.md`](docs/ops/TUNNELS_GUIDE.md), [`docs/guides/ELECTRON_GUIDE.md`](docs/guides/ELECTRON_GUIDE.md)                       |

---

## Smještaj datoteka i urednost korijena repozitorija

- **Datoteke testova**: SVI jedinični, integracijski, ekosistemski ili Vitest testovi MORAJU biti smješteni isključivo unutar direktorija `tests/` (npr. `tests/unit/`, `tests/integration/`). NIKADA ne kreirajte datoteke testova u korijenu projekta (`/`).
- **Skripte i uslužni alati**: SVE skripte za održavanje, otklanjanje grešaka, generiranje ili eksperimentiranje (`.cjs`, `.mjs`, `.js`, `.ts`) MORAJU biti smještene isključivo unutar jednog od poddirektorija direktorija `scripts/` (`build/`, `dev/`, `check/`, `docs/`, `i18n/`, `ad-hoc/`, `quality/`, `release/`, `ci/`, `ops/`, `perf/`, `research/`, `sre/`, `vps/`, `homolog/`, `packs/`, `skills/`, `test/`, `cli/`, `compression/`, `compression-eval/`, `devin-bridge/`, `docker/`, `features/`, `router-eval/`). Jednokratni ili eksperimentalni kod smješta se u `scripts/ad-hoc/`. NIKADA ne ostavljajte nepovezane skripte u korijenu projekta (`/`) ili u direktoriju najvišeg nivoa `scripts/`.

**Korijen projekta SMIJE sadržavati SAMO:**

- Konfiguracijske datoteke (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, `tsconfig*.json`, `playwright.config.ts`, `prettier.config.mjs`, `postcss.config.mjs`, `sonar-project.properties`, `fly.toml`, `docker-compose*.yml`, `Dockerfile`)
- Datoteke zavisnosti (`package.json`, `package-lock.json`)
- Dokumentacijske datoteke (`README.md`, `CHANGELOG.md`, `ROADMAP.md`, `LICENSE`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `llm.txt`)
- CI/CD datoteke i definicije za ignoriranje (`.gitignore`, `.dockerignore`, `.npmignore`, `.npmrc`, `.node-version`, `.nvmrc`, `.env.example`)

Prilikom kreiranja _bilo kojih_ validacijskih testova ili jednokratnih logičkih skripti, podrazumijevano koristite `scripts/ad-hoc/` ili `tests/unit/`, u skladu sa svojim ciljevima. Ne zatrpavajte korijenski kontekst `/`.

- **Korijenske putanje `_*` su privatne i NIKADA se ne prate** (`_tasks/`, `_references/`, `_mono_repo/`,
  `_ideia/`, `_cache/` i sve buduće `_<name>`): postoje samo na disku, Git ih ignorira putem
  usidrenih obrazaca `/_*/` + `/_*`, a neke od njih su zasebni puni Git repozitoriji (`_tasks` →
  privatni udaljeni repozitorij `_tasks_omniroute`). Nikada nemojte izvršavati `git add` za bilo šta unutar njih (obični `add` je
  već blokiran pravilima ignoriranja; nikada nemojte koristiti `-f`) i nikada ih nemojte „čistiti“ iz glavnog repozitorija —
  prestanak praćenja vrši se pomoću `git rm --cached` kako bi sadržaj ostao na disku. Kontrolna tačka
  `check:tracked-artifacts` (pre-commit + CI) ne prolazi za BILO KOJU praćenu korijensku putanju koja počinje znakom
  `_`, sadašnju ili buduću. Za pojedinosti o `_tasks` pogledajte strogo pravilo br. 23.

---

## Ključne konvencije

### Stil koda

- **2 razmaka**, tačke-zarezi, dvostruki navodnici, širina od 100 znakova, završni zarezi u stilu es5 (provodi lint-staged putem Prettiera) — pokrenite Prettier nad izmijenjenim datotekama
- **Uvozi**: vanjski → interni (`@/`, `@omniroute/open-sse`) → relativni
- **Imenovanje**: datoteke=camelCase/kebab, komponente=PascalCase, konstante=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = greška svuda; `no-explicit-any` = **greška** u `open-sse/` i `tests/` (od #6218 — postojeća kršenja zamrznuta su u `config/quality/eslint-suppressions.json`, a nova se moraju ispraviti; `npm run lint` primjenjuje izuzetke i to je naredba koju CI pokreće)
- **TypeScript**: `strict: false`, ciljni standard ES2022, modul esnext, način razrješavanja bundler. Dajte prednost eksplicitnim tipovima.

### Baza podataka

- **Uvijek** pristupajte putem domenskih modula u `src/lib/db/` — **nikada** ne pišite sirovi SQL u rutama ili obrađivačima
- **Nikada** ne koristite zbirni uvoz iz `localDb.ts` — uvozite specifične module iz `src/lib/db/*`
- Jedinstvena instanca baze podataka: `getDbInstance()` iz `src/lib/db/core.ts` (WAL vođenje dnevnika)
- Migracije: `src/lib/db/migrations/` — verzionirane SQL datoteke, idempotentne, izvršavaju se u transakcijama

### Obrada grešaka

- Koristite try/catch sa specifičnim tipovima grešaka i bilježite ih pomoću pino konteksta
- Nikada ne zanemarujte greške u SSE tokovima — koristite signale prekida za čišćenje
- Vraćajte odgovarajuće HTTP statusne kodove (4xx/5xx)

### Sigurnost

- **Nikada** ne koristite `eval()`, `new Function()` ili implicitni eval
- Validirajte sve ulaze pomoću Zod shema
- Šifrirajte vjerodajnice u stanju mirovanja (AES-256-GCM); nikada ne bilježite SQLite ključeve za šifriranje
- Pročistite korisnički HTML pomoću DOMPurifyja
- Lista zabranjenih zaglavlja prema uzvodnim servisima: `src/shared/constants/upstreamHeaders.ts` — prilikom izmjena održavajte usklađenost pročišćavanja, Zod shema i jediničnih testova
- **Javne vjerodajnice prema uzvodnim servisima** (na primjer, vrijednosti OAuth client_id/secret ili Firebase Web ključevi izdvojeni iz javnih CLI alata): **MORAJU** biti ugrađene pomoću `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` — **nikada** kao string literali. Obavezni obrazac pogledajte u `docs/security/PUBLIC_CREDS.md`.
- **Odgovori o greškama** (HTTP / SSE / izvršitelj / MCP obrađivač): **MORAJU** prolaziti kroz `buildErrorBody()` ili `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — **nikada** ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora. Pogledajte `docs/security/ERROR_SANITIZATION.md`.
- **Shell naredbe sastavljene od varijabli**: kada pozivate `exec()`/`spawn()` sa skriptom kojoj su potrebne vrijednosti u vrijeme izvođenja, proslijedite ih putem opcije `env` (automatski se pravilno izbjegavaju za shell) — **nikada** ne interpolirajte nepouzdane/vanjske putanje kao stringove u tijelo skripte. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Biblioteke sigurne po zadanim postavkama** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): pri dodavanju novih sigurnosno osjetljivih površina dajte prednost bibliotekama Helmet.js, DOMPurify, ssrf-req-filter, safe-regex i Google Tink u odnosu na prilagođene implementacije.

---

## Tačnost dokumentacije

Dokumentacija mora opisivati provjereno ponašanje, a ne vjerovatno ponašanje.

1. Prije dokumentovanja naziva API-ja, krajnje tačke, putanje, CLI naredbe ili varijable okruženja,
   potražite ih: `rg -n "name" src/ open-sse/ bin/`. Ako nema podudaranja u izvornom kodu, nemojte
   ih dokumentovati.
2. Izmjerite promjenjive brojeve umjesto da ih pišete po sjećanju: koristite `wc -l <file>` ili
   naredbu za brojanje specifičnu za direktorij.
3. Kopirajte primjere koda iz funkcionalne upotrebe ili ih pokrenite. Dajte prednost vezi na izvorni kod, kao što je
   `path/to/file.ts:line`, umjesto izmišljenom potpisu.
4. Pokrenite `npm run check:docs-all` za izmjene unutar `docs/`; ta naredba uključuje validaciju
   izmišljene dokumentacije.

---

## Uobičajeni scenariji izmjena

### Dodavanje novog pružaoca usluga

0. Prvo provjerite `docs/reference/REMOVED_PROVIDERS.md` — pružaoci uklonjeni na zahtjev njihovog operatora nikada se ne smiju ponovo uvoditi (zaštićeno testom `tests/unit/removed-providers-blocklist.test.ts`)
1. Registrujte ga u `src/shared/constants/providers.ts` (validira se pomoću Zoda pri učitavanju)
2. Dodajte izvršavač u `open-sse/executors/` ako je potrebna prilagođena logika (proširite `BaseExecutor`)
3. Dodajte prevodilac u `open-sse/translator/` ako format nije OpenAI
4. Dodajte OAuth konfiguraciju u `src/lib/oauth/constants/oauth.ts` ako se zasniva na OAuth-u — ako nadređeni CLI isporučuje javni client_id/secret, ugradite ga pomoću `resolvePublicCred()` (pogledajte `docs/security/PUBLIC_CREDS.md`), **nikada** kao literal
5. Registrujte modele u `open-sse/config/providerRegistry.ts`
6. Napišite testove u `tests/unit/` (uključite provjeru oblika publicCreds ako ste dodali novu ugrađenu zadanu vrijednost)

### Omogućavanje dvostruke autentifikacije (više API ključeva) za pružaoca usluga

1. Dodajte ID pružaoca u skup `DUAL_AUTH_PROVIDER_IDS` u `src/shared/constants/providers.ts`. Ovo signalizira korisničkom interfejsu da prikaže višeredno tekstualno polje za unos više ključeva umjesto jednorednog polja za unos lozinke.
2. Ažurirajte `authHint` za pružaoca (u `src/shared/constants/providers.ts` ili `src/shared/constants/providers/oauth.ts`) kako biste obavijestili korisnike da mogu unijeti više ključeva razdvojenih zarezima.
3. Svaki ključ se pohranjuje kao zaseban red veze s pružaocem (tok masovnog dodavanja obrađuje jedan ključ po redu pomoću `parseBulkApiKeys()` u `src/shared/utils/bulkApiKeyParser.ts`). U trenutku zahtjeva, `getProviderCredentials()` u `src/sse/services/auth.ts` automatski bira, rotira ili se prebacuje između veza pružaoca — pogledajte „Hlađenje veze“ iznad za mehanizme prebacivanja.

### Dodavanje nove API rute

1. Kreirajte direktorij unutar `src/app/api/v1/your-route/`
2. Kreirajte `route.ts` s obrađivačima `GET`/`POST`
3. Slijedite obrazac: CORS → Zod validacija tijela → opcionalna autentifikacija → delegiranje obrađivaču
4. Obrađivač ide u `open-sse/handlers/` (uvozite ga odatle, nemojte ga pisati direktno u ruti)
5. Odgovori o greškama koriste `buildErrorBody()` / `errorResponse()` iz `open-sse/utils/error.ts` (automatski se pročišćavaju — nikada nemojte stavljati neobrađeni `err.stack` ili `err.message` u tijelo). Pogledajte `docs/security/ERROR_SANITIZATION.md`.
6. Dodajte testove — uključujući barem jednu provjeru da odgovori o greškama ne otkrivaju tragove steka (`!body.error.message.includes("at /")`)

### Dodavanje novog DB modula

1. Kreirajte `src/lib/db/yourModule.ts` — uvezite `getDbInstance` iz `./core.ts`
2. Izvezite CRUD funkcije za svoje domenske tabele
3. Dodajte migraciju u `src/lib/db/migrations/` ako su potrebne nove tabele
4. Napišite testove

### Dodavanje novog MCP alata

1. Dodajte definiciju alata u `open-sse/mcp-server/tools/` sa Zod ulaznom shemom i asinhronim obrađivačem
2. Registrujte ga u skupu alata (povezano pomoću `createMcpServer()`)
3. Dodijelite ga odgovarajućem opsegu ili opsezima
4. Napišite testove (pozivanje alata bilježi se u tabelu `mcp_tool_audit`)

### Dodavanje nove A2A vještine

1. Kreirajte vještinu u `src/lib/a2a/skills/` (već postoji 6: smart-routing, quota-management, provider-discovery, cost-analysis, health-report, list-capabilities)
2. Vještina prima kontekst zadatka (poruke, metapodatke) → vraća strukturirani rezultat
3. Registrujte je u `A2A_SKILL_HANDLERS` u `src/lib/a2a/taskExecution.ts`
4. Izložite je u `src/app/.well-known/agent.json/route.ts` (kartica agenta)
5. Napišite testove u `tests/unit/`
6. Dokumentujte je u tabeli vještina u `docs/frameworks/A2A-SERVER.md`

### Dodavanje novog agenta u oblaku

1. Kreirajte klasu agenta u `src/lib/cloudAgent/agents/` koja proširuje `CloudAgentBase` (već postoje 4: codex-cloud, devin, jules, cursor-cloud)
2. Implementirajte `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrujte je u `src/lib/cloudAgent/registry.ts`
4. Dodajte rukovanje OAuth-om/akreditivima ako je potrebno (`src/lib/oauth/providers/`)
5. Dodajte testove i dokumentujte je u `docs/frameworks/CLOUD_AGENT.md`

### Dodavanje nove ugrađene usluge

1. Kreirajte instalacijski program u `src/lib/services/installers/{name}.ts` prema uzoru na `ninerouter.ts` (koristite `runNpm` iz `installers/utils.ts` — bez interpolacije ljuske, strogo pravilo #13).
2. Registrujte uslugu u `src/lib/services/bootstrap.ts` (dodajte je u niz `SERVICES[]` i proširite `buildSpawnArgsFactory()`).
3. Dodajte početni DB red za novu uslugu u `src/lib/db/migrations/` (tabela `version_manager`, `status='not_installed'`, `auto_start=0`).
4. Kreirajte 8 API krajnjih tačaka unutar `src/app/api/services/{name}/` (`_lib.ts`, `install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`). Sve delegiraju greške putem `createErrorResponse()`. Zajednička krajnja tačka `logs` već je povezana putem `[name]/logs/route.ts`.
5. Provjerite da se `/api/services/` nalazi u `LOCAL_ONLY_API_PREFIXES` u `src/server/authz/routeGuard.ts`; ako dodajete novi prefiks, dodajte test koji provjerava da `isLocalOnlyPath()` vraća `true` za njega (strogo pravilo #17).
6. Dodajte karticu korisničkog interfejsa u `src/app/(dashboard)/dashboard/providers/services/tabs/`, ponovo koristeći `ServiceStatusCard`, `ServiceLifecycleButtons`, `ServiceLogsPanel`.
7. Dokumentujte je u `docs/frameworks/EMBEDDED-SERVICES.md` (ažurirajte tabelu usluga u §1 i API referencu u §4) i u `docs/openapi.yaml`.
8. Napišite testove: jedinične (`tests/unit/services/`), integracijske (`tests/integration/services/`, uslovljene s `RUN_SERVICES_INT=1`) i ažurirajte odjeljak brzih provjera u `docs/ops/RELEASE_CHECKLIST.md`.

### Dodavanje nove zaštitne mjere / evaluacije / vještine / webhook događaja

- Zaštitna mjera: `src/lib/guardrails/` → dokumentacija: `docs/security/GUARDRAILS.md`
- Paket evaluacija: `src/lib/evals/` → dokumentacija: `docs/frameworks/EVALS.md`
- Vještina (sandbox): `src/lib/skills/` → dokumentacija: `docs/frameworks/SKILLS.md`
- Webhook događaj: `src/lib/webhookDispatcher.ts` → dokumentacija: `docs/frameworks/WEBHOOKS.md`
- Odredište za izvoz zapisnika: dodajte `src/lib/logExport/destinations/<name>.ts` + jedan red u
  `src/lib/logExport/registry.ts` → dokumentacija: `docs/frameworks/LOG-EXPORT.md`. Izvršitelj, REST sloj
  i obrazac na kontrolnoj ploči čitaju registar, tako da nisu potrebne druge izmjene.

---

## Referentna dokumentacija

Za svaku netrivijalnu izmjenu prvo pročitajte odgovarajući detaljni dokument:

| Oblast                                                              | Dokument                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| Navigacija repozitorija                                             | `docs/architecture/REPOSITORY_MAP.md`                   |
| Arhitektura                                                         | `docs/architecture/ARCHITECTURE.md`                     |
| Inženjerska referenca                                               | `docs/architecture/CODEBASE_DOCUMENTATION.md`           |
| Auto-Combo (bodovanje pomoću 16 faktora, 21 strategija)             | `docs/routing/AUTO-COMBO.md`                            |
| Otpornost (3 mehanizma)                                             | `docs/architecture/RESILIENCE_GUIDE.md`                 |
| Ponovna reprodukcija zaključivanja                                  | `docs/routing/REASONING_REPLAY.md`                      |
| Okvir za vještine                                                   | `docs/frameworks/SKILLS.md`                             |
| Radar (sloj kataloga besplatnih modela)                             | `docs/frameworks/RADAR.md`                              |
| Memorijski sistem (FTS5 + Qdrant)                                   | `docs/frameworks/MEMORY.md`                             |
| Agenti u oblaku                                                     | `docs/frameworks/CLOUD_AGENT.md`                        |
| Zaštitne mjere (PII / ubacivanje instrukcija / vizija)              | `docs/security/GUARDRAILS.md`                           |
| Javni pristupni podaci uzvodnih servisa (Gemini itd.)               | `docs/security/PUBLIC_CREDS.md`                         |
| Sanitizacija poruka o greškama                                      | `docs/security/ERROR_SANITIZATION.md`                   |
| Evaluacije                                                          | `docs/frameworks/EVALS.md`                              |
| Usklađenost / revizija                                              | `docs/security/COMPLIANCE.md`                           |
| Webhookovi                                                          | `docs/frameworks/WEBHOOKS.md`                           |
| Izvoz zapisnika (zapisi poziva → BigQuery/…)                        | `docs/frameworks/LOG-EXPORT.md`                         |
| Proces autorizacije                                                 | `docs/architecture/AUTHZ_GUIDE.md`                      |
| Prikrivenost (TLS / otisak)                                         | `docs/security/STEALTH_GUIDE.md`                        |
| Protokoli agenata (A2A / ACP / Cloud)                               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`              |
| MCP server                                                          | `docs/frameworks/MCP-SERVER.md`                         |
| A2A server                                                          | `docs/frameworks/A2A-SERVER.md`                         |
| API referenca + OpenAPI                                             | `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` |
| Katalog pružalaca usluga (automatski generiran)                     | `docs/reference/PROVIDER_REFERENCE.md`                  |
| Tuneli                                                              | `docs/ops/TUNNELS_GUIDE.md`                             |
| Electron desktop aplikacija                                         | `docs/guides/ELECTRON_GUIDE.md`                         |
| VS Code Copilot Chat (OmniCopilot ekstenzija)                       | `docs/guides/VSCODE-COPILOT.md`                         |
| Proces izdavanja                                                    | `docs/ops/RELEASE_CHECKLIST.md`                         |
| Ugrađene usluge                                                     | `docs/frameworks/EMBEDDED-SERVICES.md`                  |
| Kontrole kvaliteta (~90 skripti, politika liste dozvoljenih stavki) | `docs/architecture/QUALITY_GATES.md`                    |

---

## Testiranje

| Šta                        | Naredba                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------- |
| Jedinični testovi          | `npm run test:unit`                                                                   |
| Pojedinačna datoteka       | `node --import tsx/esm --test tests/unit/your-file.test.ts`                           |
| Vitest (MCP, autoCombo)    | `npm run test:vitest`                                                                 |
| E2E (Playwright)           | `npm run test:e2e`                                                                    |
| Protokolarni E2E (MCP+A2A) | `npm run test:protocols:e2e` (CI zadatak `test-protocols-e2e`, savjetodavni — #10049) |
| Ekosistem                  | `npm run test:ecosystem` (CI zadatak `test-ecosystem`, blokirajući)                   |
| Prag pokrivenosti          | `npm run test:coverage` (60/60/60/60 — iskazi/linije/funkcije/grane)                  |
| Izvještaj o pokrivenosti   | `npm run coverage:report`                                                             |

**Pravilo za PR**: Ako mijenjate produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, morate uključiti ili ažurirati testove u istom PR-u.

**Preferirani redoslijed slojeva testiranja**: prvo jedinični → integracijski (više modula ili stanje baze podataka) → e2e (samo korisničko sučelje/tok rada). Reprodukcije grešaka implementirajte kao automatizirane testove prije ili paralelno s ispravkom.

**Oba pokretača testova moraju proći**: `npm run test:unit` (izvorni Node — većina testova) I `npm run test:vitest` (MCP server, autoCombo, keš) pokrivaju **datoteke koje se ne preklapaju**. Oba su uključena u CI (zadaci `test-unit` i `test-vitest`) i moraju biti uspješna prije spajanja. PR u kojem prođe samo jedan skup testova može neprimjetno isporučiti neispravne MCP alate ili regresije usmjeravanja.

**Protokol za ispravke grešaka / trijažu problema (Strogo pravilo #18)**: Svaka ispravka prijavljenog problema mora biti potvrđena na jedan od sljedećih načina — bez izuzetaka:

1. **TDD (poželjno)** — napišite test koji ne prolazi i reproducira grešku → ispravite je → potvrdite da test prolazi. Test postaje trajna zaštita od regresije. Mijenjajte samo datoteke za koje test dokaže da ih je potrebno promijeniti; ništa više.
2. **Test u stvarnom okruženju (kada TDD nije moguć)** — postavite na produkcijski VPS (`root@192.168.0.15`) i pokrenite dokumentirani test uživo. Zabilježite tačnu naredbu + rezultat u opisu PR-a. Primjenjuje se na: OAuth tokove prema nadređenim servisima, ponašanje nadređenih Cloudflare/WS servisa, regresije koje se odnose samo na korisničko sučelje, ponašanje zavisno od hardvera.
3. „Radilo je lokalno bez testa“ ne računa se. Ispravka bez testa ili zapisa o validaciji na VPS-u nije ispravka — to je nagađanje.

Zašto je ovo važno: ispraviti grešku A uz istovremeno stvaranje greške B gore je nego ne ispraviti ništa. TDD/VPS kontrola osigurava precizan opseg — mijenjate samo ono za šta test koji ne prolazi dokaže da je neispravno. Primjeri gdje se ovo isplatilo: #3090 (claude-web 403), #3113 (WS HTTP rezervna opcija), #3052 (automatska kalibracija heap-guard).

**Copilot pravilo pokrivenosti**: Kada PR mijenja produkcijski kod, a pokrivenost je ispod 60% (iskazi/linije/funkcije/grane), nemojte samo prijaviti stanje — dodajte ili ažurirajte testove, ponovo pokrenite provjeru praga pokrivenosti, a zatim zatražite potvrdu. U izvještaj o PR-u uključite pokrenute naredbe, izmijenjene testne datoteke i konačni rezultat pokrivenosti.

---

## Fokus pregleda

- Držite operacije baze podataka u `src/lib/db/`; nemojte izvršavati sirovi SQL iz ruta.
- Šaljite zahtjeve pružaocima kroz `open-sse/handlers/`.
- Držite MCP i A2A stranice kao kartice unutar `/dashboard/endpoint`.
- Očuvajte SSE čišćenje, parsiranje zaglavlja ograničenja brzine, Zod validaciju i validaciju
  sheme pružaoca.
- Tretirajte Memory i Skills kao međusobno prožimajuće promjene koje mogu uticati na MCP alate, tok obrade
  zahtjeva i A2A vještine.
- Nemojte zatvarati zahtjev za spajanje saradnika nakon korištenja njegovog koda; spojite ga putem GitHuba kako bi
  saradnik dobio priznanje.
- **Nikada nemojte spojiti PR koji mijenja površinu s uputama za agente bez izričitog odobrenja
  operatera** — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `llm.txt` (+ preslike) i
  `skills/**/SKILL.md` izvršavaju se kao autoritativne upute u svakoj AI sesiji; spojena uputa
  ugrožava svako buduće pokretanje agenta. Provjerite pomoću `gh pr diff <N> --name-only` prije svakog
  spajanja. Zapis o incidentu: PR #11770 (2026-09-01) naložio je agentima da izvrše skriptu za
  postavljanje treće strane i uključen je tokom kampanje spajanja; vraćeno u #12249.

---

## Artefakti planiranja i istraživanja

`_tasks/` je **zaseban, izolovan git repozitorij** koji glavni
repo ignorira putem gita (`.gitignore` → `_tasks/`). To je kanonsko mjesto za radne artefakte —
planove, specifikacije/dizajne, istraživanja, primopredaje — kako bi ostali **verzionirani u vlastitom
repozitoriju** umjesto da zagađuju glavno OmniRoute stablo.

**Strogo pravilo — nikada ne zapisujte rezultate planiranja / istraživanja unutar `docs/` ili korijena repozitorija.**
Kad god se u ovom projektu pokrene bilo koji generator plana/specifikacije/istraživanja (superpowers ili drugi),
sačuvajte rezultat u `_tasks/` koristeći konvenciju imenovanja datoteka:

| Artefakt             | Sačuvajte ovdje                                               |
| -------------------- | ------------------------------------------------------------- |
| Planovi              | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Specifikacije/dizajn | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Istraživanja         | `_tasks/research/…`                                           |
| Primopredaje         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Zabilježite te artefakte unutar `_tasks/` repozitorija (`git -C _tasks …`), nikada u glavnom repozitoriju.

---

## Git tok rada

```bash
# Nikada nemojte praviti commit direktno na main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**Prefiksi grana**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commita** (Conventional Commits): `feat(db): add circuit breaker` — opsezi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hookovi**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11` + `check:tracked-artifacts`
- **commit-msg**: `check:ai-attribution` — odbija AI/bot `Co-Authored-By` završne retke i fusnote o AI generiranju u poruci (Strogo pravilo #16; ljudski koautori su dozvoljeni; također je uključeno u `quality.yml` petlju brzih provjera (PR→`release/**`) i PR-only `ci.yml` korak provjere (PR→`main`) — #14436)
- **pre-push**: namjerno je lagan (samo provjera ispravnosti za PATH/npm). `any-budget` + `tracked-artifacts`
  već se pokreću pri pre-commit provjeri; njihovo ponovno pokretanje pri svakom slanju bilo je čisto dvostruko plaćanje. CI i dalje
  provodi obje provjere. (Ranije potpuna pre-push kontrolna tačka Fase 6A.12; premještena u pre-commit u #6716.)

### Izolacija radnog stabla (OBAVEZNA za svaki razvojni zadatak)

Više sesija/agenata paralelno radi na ovom repozitoriju. Glavna radna kopija je **dijeljena**, pa
`git checkout`/promjena grane u njoj neprimjetno odbacuje nepospremljeni rad druge sesije i
izvlači granu ispod svega ostalog što se izvršava (incidenti: 2026-06-05, 2026-06-13).

**Pravilo: nikada nemojte razvijati u dijeljenoj glavnoj radnoj kopiji. Svaki zadatak dobija vlastito git radno stablo na
vlastitoj namjenskoj grani, a prije njegovog kreiranja MORATE potvrditi osnovnu granu s operaterom.**

1. **Prvo pitajte — koja je osnovna grana?** Prije nego što bilo šta kreirate, pitajte operatera (osim ako vam je
   to već rekao) iz koje grane treba izvesti novo radno stablo/granu. NEMOJTE pretpostavljati
   `main` ili „ono na čemu sam trenutno“ — odgovor je obično aktivni `release/vX.Y.Z`, ali može
   biti druga funkcionalna/izdanjska grana. Izričito saznajte osnovnu granu.
2. **Kreirajte izolovano radno stablo + granu izvedenu iz te osnove** (nikada nemojte ponovo koristiti glavnu radnu kopiju).
   **🔴 OBAVEZNA PUTANJA: svako radno stablo nalazi se unutar `.claude/worktrees/` — i nigdje drugdje.**
   Ovo je jedina kanonska lokacija. Git je ignorira I nalazi se među izuzecima u `tsconfig.json` /
   `.dockerignore`, pa radna stabla nikada ne ulaze u opseg izgradnje. **Nikada** nemojte koristiti
   `.worktrees/`, korijen repozitorija ili bilo koju drugu putanju — radno stablo izvan `.claude/worktrees/`
   (a) izbjegava izuzetke opsega izgradnje i narušava `next build` (`tsconfig`
   `include: **/*` globovi obuhvataju ~70× više koda → OOM; incident 2026-06-25) i (b) raspršuje
   radna stabla po dva direktorija.

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← grana koju je operater potvrdio u koraku 1
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".claude/worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".claude/worktrees/${TASK##*/}"
   # Ponovo upotrijebite node_modules iz glavne radne kopije kako biste izbjegli npm install za svako radno stablo.
   # ČVRSTE VEZE (`cp -al`), nikada simbolička veza: ~5 s za cijelo stablo i gotovo bez dodatnog
   # prostora na disku (inodeovi su dijeljeni), a za razliku od simboličke veze ne ometaju razvojni server.
   cp -al "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   # `.husky/_` git ignorira, pa ga novo radno stablo NEMA i
   # `core.hooksPath=.husky/_` tada pokazuje na direktorij koji ne postoji —
   # svaka pre-commit kontrola neprimjetno prestaje raditi. Kopirajte i njega.
   cp -a "$(git -C <main_checkout> rev-parse --show-toplevel)/.husky/_" .husky/_
   ```

`scripts/dev/new-worktree.sh <branch> [base]` radi sve navedeno iznad (kanonska putanja,
čvrsto povezani `node_modules`, `.husky/_`), a zatim **provjerava** da li je hook zaista
izvršiv, stoga mu dajte prednost u odnosu na ručno izvršavanje koraka.

**Nikada nemojte koristiti `ln -s` za node_modules.** Turbopack odbacuje simbolički link koji se razrješava izvan
korijena projekta, pa `npm run dev` prestaje raditi uz FATAL paniku (`Symlink [project]/node_modules
is invalid, it points out of the filesystem root`), dok provjera tipova, lint i programi za
pokretanje testova i dalje prolaze — greška navodi "filesystem root", a ne worktree, pa
izgleda kao greška u Nextu/izgradnji i oduzima mnogo vremena za pronalaženje uzroka (incident 2026-07-31, #9043).

**Worktree bez `.husky/_` NE pokreće nijednu pre-commit provjeru — i ne javlja ništa.** `git`
razrješava `core.hooksPath` relativno u odnosu na vrh worktreeja; kada direktorij nedostaje,
jednostavno ne pronalazi hook i kreira commit. Ništa se ne ispisuje, commit uspijeva, a
provjere identiteta/linta/dokumentacije nikada nisu pokrenute. Tako je 59 commitova sa
zastarjelim prepisivanjem identiteta (ime saradnika + e-mail održavaoca) prošlo pored
`scripts/check/check-git-identity.sh` između 2026-08-29 i 09-02 — svi su napravljeni u
`cp -al` worktreejima. Provjerite pomoću `ls .husky/_/pre-commit` unutar novog worktreeja ili jednostavno koristite
`scripts/dev/new-worktree.sh`, koji glasno prijavljuje grešku kada hook nije izvršiv.

3. **Radite, kreirajte commit, pushajte i otvorite PR — sve iz worktreeja.** Nikada nemojte koristiti `git checkout` za
   drugu granu unutar worktreeja koji bi druga sesija mogla dijeliti.
4. **Uklonite samo vlastiti** worktree + granu kada završite, iz glavnog checkouta:
   `git worktree remove .claude/worktrees/<dir>`, a zatim `git branch -D <task>`. Nikada nemojte masovno brisati
   `fix/*`/`feat/*` — druge sesije imaju vlastite; brišite samo grane koje ste kreirali, navodeći ih po imenu.
5. **Nikada ne dirajte worktree, granu ili necommitovane izmjene druge sesije.** Ako `git worktree
list` prikazuje worktreeje koje niste kreirali, ostavite ih na miru. Završite svaku sesiju tako da glavni
   checkout bude vraćen na granu na kojoj je započeo (aktivnu `release/vX.Y.Z`, nikada `main`).

### Provjera ispravnosti baze (PR-ovi ne smiju nastati crveni)

Prije kreiranja grane, spajanja baze u PR granu, masovnog ponovnog usmjeravanja PR-ova ili otvaranja
PR-a: provjerite je li vrh baze zelen. Workflow `Release-Green (continuous)`
(`.github/workflows/nightly-release-green.yml`) objavljuje rezultat u jednom dedupliciranom
issueu pod naslovom `🔴 Release branch not green: <branch>` (oznaka `base-red`). Jedan poziv zamjenjuje svako
lokalno pokretanje skupa provjera u ovu svrhu:

```bash
gh issue list --repo diegosouzapw/OmniRoute --state open \
  --search "Release branch not green: <base> in:title"
```

Ako je baza crvena: nikada ne tretirajte naslijeđene greške kao nedostatak svoje grane; nikada ih ne
"popravljajte" unutar svoje feature grane (ispravka crvene baze zaseban je, kontrolom zamrzavanja uslovljen
PR `fix/release-vX.Y.Z-basereds`); a ako ipak morate otvoriti PR, dodajte
`⚠️ base-red inherited: #<issue>` u tijelo PR-a kako recenzenti i nadzornici CI-ja ne bi jurili fantomske greške.

### Sync-back spajanja koriste fast-forward, nikada squash

Sync-back `main → release/vX+1` (faza 5 procesa `/generate-release` ili bilo koji kasniji PR za
"prenošenje mainovih post-release commitova") mora stići na release granu kao merge commit kakav već jeste:
`git merge-base --is-ancestor origin/release/vX+1 <head>`, a zatim
`git push origin <head>:refs/heads/release/vX+1` (GitHub označava PR kao spojen). Squash spajanje
uklanja `main` iz historije predaka release grane, pa sljedeći sync-back ponovo izaziva konflikte u svakoj datoteci
koju je main izmijenio (551 konflikt pri syncu v3.8.50 → v3.8.51 prije spajanja u dva koraka). Nakon
spajanja, `git merge-base --is-ancestor origin/main origin/release/vX+1` mora biti tačno — i provjerite
da li su `config/quality/eslint-suppressions.json` / `quality-baseline.json` prenijeli zamrzavanja s maina
(spajaju se kao "ours" bez upozorenja). Detalji: `.agents/skills/generate-release/phases/phase-5-next-cycle.md`.

---

## Doprinosi uzvodnom repozitoriju

Ova radna kopija je fork repozitorija `diegosouzapw/OmniRoute`. Promjene namijenjene samo forku, implementaciji i ličnoj
automatizaciji nemojte uključivati u uzvodne PR-ove.

Rad na uzvodnom repozitoriju započnite iz aktivne zadane uzvodne grane, a ne iz grane `main`:

```bash
git fetch upstream
git switch -c <branch-name> upstream/<default-branch>
```

U zahtjevu za spajanje ciljajte tu istu granu izdanja. Pripremite samo predviđene datoteke, pokrenite
usmjerene provjere i koristite poruku u formatu Conventional Commits (na primjer, `docs: slim AGENTS.md`).

---

## Okruženje

- **Izvršno okruženje**: Node.js ≥22.22.2 <23 || ≥24.0.0 <27, ES Modules. Ovo je **jedino podržano** izvršno okruženje za objavljeni `omniroute` CLI, server i skupove testova (`node:test` + vitest) — `engines.node` je mjerodavan i krajnjim korisnicima Bun nikada nije potreban. Postoji **best-effort put kompatibilnosti za `bun:sqlite`** kako bi se globalna Bun instalacija (`bun install -g omniroute`) mogla pokrenuti bez `better-sqlite3` (adapter upravljačkog programa + pokretanje procesa prilagođeno Bunu); to **nije** podržano izvršno okruženje — bez garancija podrške — i svaka promjena izvršnog okruženja specifična za Bun MORA očuvati lanac Node upravljačkog programa/rezervnog rješenja i uključivati Bun test (`test:bun:db`) ili izričit razlog zašto je putanja namijenjena samo Nodeu.
- **Bun (pokretač skripti za izgradnju/razvoj + samo provjera kompatibilnosti)**: Bun `1.4.2` je fiksiran kao **tačna devDependency** (obezbijeđen putem postojećeg `npm ci` koristeći platformske binarne datoteke `@oven/bun-*` iz lockfilea — bez `setup-bun`/ad hoc instalacije). Koristi se **isključivo** za izvršavanje malog, unaprijed odobrenog skupa TypeScript **skripti kontrolnih tačaka/generatora** (zamjenjujući `node --import tsx` radi bržeg pokretanja): CI provjere `check:provider-consistency`, `check:compression-budget`, `check:known-symbols` i ne-CI skripte `gen:provider-reference`, `bench:compression` — uz usmjereni kompatibilnosni smoke skup `test:bun:db` za best-effort putanju `bun:sqlite`. **NEMOJTE** proširivati upotrebu Buna na `npm install`, izgradnju (`build:cli*`), `check:pack-artifact`, podržano objavljeno izvršno okruženje ili glavne pokretače testova — oni ostaju na Nodeu. Svaka nova skripta kontrolne tačke/generatora koja poziva Bun prvo mora biti potvrđena kao bajt-po-bajt identična svom izlazu iz `node --import tsx`. Nakon povlačenja promjene lockfilea pokrenite `npm install` kako bi se `bun` mogao lokalno pronaći (zastarjeli `node_modules` uzrokovat će neuspjeh tih skripti uz poruku `bun: not found`). **Dva različita Bun kvara, dva različita rješenja — nemojte ih pomiješati.** (a) `bun: not found` → stablo je zastarjelo; pokrenite `npm install`. (b) Bun postoji, ali se odbija pokrenuti → `node_modules/bun/bin/bun.exe` je i dalje **bash zamjenska datoteka** od približno 450 bajtova koju paket isporučuje jer je njegov `postinstall` preskočen (`npm install --ignore-scripts` ili upravitelj paketa koji preskače skripte životnog ciklusa). Stvarna binarna datoteka već se nalazi na disku u paketu za odgovarajuću platformu (npr. `node_modules/@oven/bun-windows-x64/bin/bun.exe`, približno 86 MB), tako da ništa ne nedostaje, a ponovno pokretanje `npm install` nad već zadovoljenim stablom možda neće riješiti problem. Rješenje: `cd node_modules/bun && node install.js`. **Na Windowsu je greška aktivno obmanjujuća** — `cmd.exe` traži od učitavača da pokrene bash skriptu, koja prijavljuje `This version of … is not compatible with the version of Windows you're running`, što djeluje kao problem s operativnim sistemom/arhitekturom, ali zapravo znači „ovo nije izvršna datoteka za Windows“. Potvrdite stvarni uzrok pomoću `ls -l node_modules/bun/bin/bun.exe` (nekoliko stotina bajtova = zamjenska datoteka). U oba slučaja `node --import tsx <script>` je potvrđena bajt-po-bajt identična rezervna opcija za sve četiri skripte.
- **TypeScript**: 6.0+, cilj ES2022, modul esnext, razrješavanje bundler
- **Aliasi putanja**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Zadani port**: 20128 (API + kontrolna ploča na istom portu)
- **Direktorij podataka**: varijabla okruženja `DATA_DIR`, zadano `~/.omniroute/`
- **Ključne varijable okruženja**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Postavljanje: `cp .env.example .env`, a zatim generišite `JWT_SECRET` (`openssl rand -base64 48`) i `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Kontrole kvaliteta i mehanizmi postepenog pooštravanja

OmniRoute ima **~90 skripti za kontrolu kvaliteta** (`scripts/check/` + `scripts/quality/`) povezanih
kroz **9 poslova za pokretanje kontrola** u `.github/workflows/ci.yml` (`lint`, `quality-gate`,
`quality-extended`, `docs-sync-strict`, `i18n-ui-coverage`, `i18n`, `pr-test-policy`,
`test-vitest`, `sonarqube`), kao i posao za brze kontrole u `quality.yml` (PR→`release/**`) i
5 noćnih radnih tokova za kvalitet (`nightly-property`, `nightly-resilience`,
`nightly-llm-security`, `nightly-mutation`, `nightly-schemathesis`). Potpuni inventar, pregled po poslovima i operativne
procedure nalaze se u [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md).

**Brzi pregled:**

- Kontrole u poslovima `lint` + `docs-sync-strict`: kontrole pravila s rezultatom prolaz/pad —
  ispravite kršenje ili dodajte unos na listu dozvoljenih uz komentar s obrazloženjem + problem za praćenje.
- Kontrole u poslu `quality-gate`: postepeno pooštravanje — metrike (ESLint upozorenja, pokrivenost koda, dupliciranje,
  složenost) ne smiju nazadovati u odnosu na `quality-baseline.json`. Ažurirajte putem
  `npm run quality:ratchet -- --update` kada se metrika zaista poboljša.
- Posao `test-vitest` pokreće `npm run test:vitest` (MCP alati, autoCombo, predmemorija) — blokirajuće.
  `test:vitest:ui` je blokirajući od PR-a #7127.
- **Faza brzine (2026-08-30 → v4.0)**: svaka numerička referentna vrijednost ublažena je za 20%, a
  `--require-tighten` je savjetodavan (`quality-baseline.json` → `_policy`); noćni posao
  `baseline-headroom` prati koliko je budžeta preostalo u problemu
  "📈 Prostor do referentne granice". Pogledajte `docs/architecture/QUALITY_GATES.md` → "Faza brzine".

**Pravila liste dozvoljenih (skraćeno):** Ispravite uzrok; koristite listu dozvoljenih samo za prethodno postojeća
kršenja koja ne možete ispraviti u istom PR-u. Dodajte komentar s obrazloženjem + brojem problema.
Zastarjele unose na listi dozvoljenih (koji potiskuju kršenje koje više ne postoji) otkrit će
provjera zastarjelosti dodana u Fazi 6A.3.

---

## Stroga pravila

1. Nikada ne commitujte tajne ili pristupne podatke
2. Nikada nemojte koristiti barrel import iz `localDb.ts` — uvozite konkretne module iz `src/lib/db/*`
3. Nikada nemojte koristiti `eval()` / `new Function()` / implicitni eval
4. Nikada nemojte commitovati direktno na `main`
5. Nikada nemojte pisati sirovi SQL u rutama — koristite module iz `src/lib/db/`
6. Nikada nemojte prešutno zanemarivati greške u SSE tokovima
7. Uvijek validirajte ulaze pomoću Zod shema
8. Uvijek uključite testove kada mijenjate produkcijski kôd
9. Pokrivenost ne smije pasti ispod osnovne vrijednosti zamrznute u `quality-baseline.json` (ratchet); apsolutni minimum je 60% (naredbe/linije/funkcije/grane). Ažurirajte osnovnu vrijednost putem `npm run quality:ratchet -- --update` samo kada se pokrivenost stvarno poboljša. Pogledajte `docs/architecture/QUALITY_GATES.md`.
10. Nikada nemojte zaobilaziti Husky hookove (`--no-verify`, `--no-gpg-sign`) bez izričitog odobrenja operatera.
11. Nikada nemojte ugrađivati javni uzvodni OAuth client_id/secret ili Firebase Web ključeve kao string literale — uvijek ih pribavljajte putem `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Pogledajte `docs/security/PUBLIC_CREDS.md`.
12. Nikada nemojte vraćati sirovi `err.stack` / `err.message` u HTTP / SSE / executor odgovorima — uvijek ih proslijedite kroz `buildErrorBody()` ili `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Pogledajte `docs/security/ERROR_SANITIZATION.md`.
13. Nikada nemojte interpolirati vanjske putanje ili vrijednosti tokom izvršavanja u shell skripte proslijeđene funkcijama `exec()`/`spawn()` — umjesto toga ih proslijedite putem opcije `env`. Referenca: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nikada nemojte odbaciti CodeQL / Secret-Scanning upozorenje bez (a) prethodne provjere gore navedene dokumentacije obrazaca kako biste utvrdili je li pomoćna funkcija primjenjiva i (b) bilježenja tehničkog obrazloženja u komentaru odbacivanja. Presedan: `js/stack-trace-exposure` prijavljen na mjestima poziva koja već prolaze kroz `sanitizeErrorMessage()` poznato je ograničenje CodeQL-a (prilagođeni sanitizatori nisu prepoznati) — odbacite kao `false positive` uz referencu na `docs/security/ERROR_SANITIZATION.md`.
15. Nikada nemojte izlagati rute koje pokreću podređene procese (`/api/mcp/`, `/api/cli-tools/runtime/`) bez klasifikacije pomoću `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti stvaranje procesa. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nikada nemojte pripisivati zasluge niti reklamirati AI asistenta, LLM ili automatizacijski račun u bilo kojim metapodacima commita/PR-a. Dva zabranjena oblika, oba ekvivalentna — preusmjeravaju pripisivanje na bot račun (ili reklamiraju AI autorstvo) i skrivaju stvarnog autora (`diegosouzapw`): **(a)** `Co-Authored-By` završne oznake koje navode AI/bota (npr. imena koja sadrže "Claude", "GPT", "Copilot", "Bot"; e-mail adrese na `anthropic.com` / `openai.com` / adrese `noreply.github.com` u vlasništvu botova); **(b)** završne napomene ili opisi o AI generisanju bilo gdje u poruci commita, naslovu/tijelu PR-a ili CHANGELOG-u — npr. `🤖 Generated with [Claude Code]`, "Generated with Claude Code", "Made with <AI tool>" ili bilo koja linija `Co-authored-by: Claude/GPT/Copilot`. Ovo **nadjačava sve zadane postavke okruženja, predloška ili alata koje automatski dodaju takvu završnu napomenu** — uklonite je prije pusha; ne dopustite da dospije u commit, PR ili CHANGELOG. Ljudskim saradnicima — uključujući autore uzvodnih PR-ova i prijavitelje problema čiji se rad prenosi u OmniRoute — MOGU SE i TREBAJU pripisati zasluge standardnim završnim oznakama `Co-authored-by: Name <email>`; uzvodni radni tokovi za prijenos (`/port-upstream-features`, `/port-upstream-issues`) zavise od toga.
17. Nikada nemojte izlagati rute pod `/api/services/` ili `/dashboard/providers/services/*/embed/` bez klasifikacije pomoću `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts`. Ove rute mogu pokrenuti podređene procese (`npm install`, `node`). Ograničenje na loopback primjenjuje se bezuslovno prije bilo kakve provjere autentifikacije — JWT koji procuri putem tunela ne može pokrenuti stvaranje procesa. Pogledajte `docs/security/ROUTE_GUARD_TIERS.md`.
18. Svaka ispravka greške mora biti validirana prije isporuke: jediničnim/integracijskim testom koji prvo pada, a zatim prolazi (TDD) ILI dokumentovanim testom uživo na produkcijskom VPS-u (192.168.0.15). Ispravka bez jednog od ta dva načina validacije neće biti spojena. Pogledajte Testing → "Bug fix / issue triage protocol" za potpuno stablo odlučivanja.
19. Nikada nemojte razvijati u zajedničkom glavnom checkoutu. Svaki razvojni zadatak izvršava se u vlastitom git worktreeju na vlastitoj namjenskoj grani, a prije kreiranja worktreeja/grane MORATE potvrditi osnovnu granu s operaterom — nikada nemojte pretpostaviti da je to `main` ili trenutno checkoutovana grana. `git checkout` u zajedničkom checkoutu neprimjetno uništava necommitovane izmjene drugih sesija. Uklanjajte samo worktreejeve/grane koje ste vi kreirali (po imenu, nikada pomoću džoker-obrazaca `fix/*`/`feat/*`), ne dirajte worktreejeve drugih sesija i završite na grani na kojoj ste počeli (aktivnoj `release/vX.Y.Z`, nikada na `main`). Pogledajte Git Workflow → "Worktree isolation".
20. Redakcija/sanitizacija PII podataka je **opcionalna — nikada nije zadano uključena**. OmniRoute djeluje kao proxy za samostalno hostovane/lokalne LLM-ove gdje operater posjeduje podatke, pa bi zadano mijenjanje sadržaja zahtjeva/odgovora neprimjetno oštetilo legitiman saobraćaj. Dvije zastavice PII funkcionalnosti koje mijenjaju podatke **MORAJU** zadržati `defaultValue: "false"` u `src/shared/constants/featureFlagDefinitions.ts`: `PII_REDACTION_ENABLED` (na strani zahtjeva) i `PII_RESPONSE_SANITIZATION` (odgovor + streaming). Sve tri tačke primjene — `src/lib/guardrails/piiMasker.ts` (zaštitna kontrola zahtjeva), `src/lib/piiSanitizer.ts` (odgovor), `src/lib/streamingPiiTransform.ts` (SSE) — kontrolisane su ovim zastavicama; kada su obje isključene, zaštitna kontrola `pii-masker` i dalje se izvršava, ali nikada ne mijenja sadržaj (podaci prolaze netaknuti). Promjena bilo koje zadane vrijednosti na `"true"` zahtijeva izričito odobrenje operatera. Zaštita od regresije je `tests/unit/pii-opt-in-default.test.ts` (provjerava obje zadane vrijednosti definicija + prolazak bez promjena u ponašanju). Uključivanje je pojedinačno za svakog operatera putem okruženja ili postavki/DB premošćavanja (`src/lib/db/featureFlags.ts`), nikada kao prešutna zadana vrijednost. Pogledajte `docs/security/GUARDRAILS.md`.
21. **Zamrzavanje izdanja — ZAMRZNUTA grana izdanja pripada voditelju izdanja; razvoj se NE zaustavlja (model paralelnog ciklusa, 2026-07-04).** `/generate-release` otvara označeni problem s oznakom `release-freeze` na početku usklađivanja (Faza 0a), **odmah odvaja granu sljedećeg ciklusa `release/vX+1` od zamrznutog vrha (Faza 0a.0b — povećanje verzije + aktivni PR izdanja + premještanje otvorenih PR-ova)** i završava zamrzavanje nakon što se PR izdanja squash-mergeuje u `main`. Prije spajanja **bilo kojeg** PR-a, svaki radni tok kampanje (`/review-prs`, `/review-group-prs`, `/merge-prs`, `/triage-fix-bugs`, `/implement-fix-bugs`, `/triage-features`, `/implement-features`, `/green-prs`, `/port-upstream-*`) **MORA** provjeriti `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open` — ako je zamrzavanje aktivno: **NIKADA nemojte spajati u zamrznutu `release/vX.Y.Z` navedenu u naslovu zamrzavanja**; umjesto toga odredite AKTIVNU razvojnu granu (**najvišu** `release/v*` prema semveru — obično `release/vX+1`, objavljenu u komentaru problema zamrzavanja) i **preusmjerite PR na nju** (`gh pr edit <N> --base release/vX+1`, zatim PROVJERITE pomoću `gh pr view <N> --json baseRefName` — uređivanje neprimjetno može podbaciti) te ga spojite na uobičajen način. **ZADRŽITE samo kada najviša grana release/v\* JEST zamrznuta grana** (kratki period prije završetka 0a.0b ili izdanje prije modela paralelnog ciklusa) — u tom slučaju ostavite PR spreman i otvoren, obavijestite operatera i nastavite kada se pojavi sljedeća grana ili se zamrzavanje ukine. Upravo isporučene ispravke stižu u `release/vX+1` putem sinhronizacije nazad u Fazi 5 (`scripts/release/sync-next-cycle.mjs`); nemojte pokušavati sinhronizaciju usred izdanja. Ovo je **koordinacijski signal, a ne zaključavanje dozvola**: voditelj izdanja i sesije kampanje dijele identitet `diegosouzapw`, pa GitHub zaštita grane ne može praviti razliku između njih — samo poštivanje ovog markera sprečava utrke commitova usred izdanja koje su prisilile potpuno ponovno usklađivanje CHANGELOG-a u v3.8.40/v3.8.41 (paralelna kampanja pomjerila je `release/vX.Y.Z` za 34 commita usred izvršavanja). Vlastiti pushovi voditelja izdanja za usklađivanje/otvaranje ciklusa izuzeti su — oni _jesu_ izdanje. Ispravke koje moraju biti uključene tokom zamrzavanja (nalaz homologacije) slijede pravilo samo za čitanje nakon spajanja: prvo se uključuju u `main` putem `fix/release-vX.Y.Z-*`. **⛔ SAMO `/generate-release` smije pokrenuti zamrzavanje izdanja i to SAMO u svojoj Fazi 0a (početak generisanja nove verzije) — ukida se u Fazi 12c nakon squash-mergea u `main`.** Nijedna kampanja, sesija ili agent ne smije otvoriti marker `release-freeze` u bilo kojem drugom trenutku — zamrzavanje **nikada** nije koordinacijski alat usred razvoja. Ako sesija ikada smatra da je zamrzavanje zaista i neizbježno potrebno izvan toka `/generate-release`, ona **MORA prvo pitati operatera (`diegosouzapw`) u chatu, izričito upozoriti "kreiram zamrzavanje" i dobiti izričito odobrenje** — nikada nemojte autonomno otvoriti, produžiti ili ponovo otvoriti `release-freeze`. Nasuprot tome, **nemojte** zatvarati/ukidati aktivno zamrzavanje iz `/generate-release` kako biste omogućili spajanje kampanjskih promjena: ono štiti jedno čisto CI izvršavanje voditelja i automatski se ukida u Fazi 12c — prerano zatvaranje ponovo pokreće upravo onu utrku commitova koju sprečava. Prije postupanja provjerite je li zamrzavanje legitimno: otvoreni `release-freeze` čiji naslov/tijelo upućuje na **OTVORENI** PR izdanja (`gh pr view <N> --json state`) predstavlja ovlašteno zamrzavanje voditelja — zadržite promjene, ne dirajte ga. (Prijedlog modela ciklusa: `_tasks/finished/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md`.)
22. **Sigurnost između sesija — na ovom repozitoriju istovremeno radi MNOGO paralelnih sesija/agenata; nikada nemojte ometati tuđi rad u toku.** Dvije apsolutne zabrane, obje zasnovane na incidentima koji se ponavljaju (ovo pravilo postoji zato što se oni stalno događaju):
    - **(a) Nikada nemojte koristiti `git stash` / `git stash pop` — NIGDJE u ovom repozitoriju, uključujući unutar izolovanog worktreeja i unutar bilo kojeg podagenta kojeg pokrenete.** `git stash` djeluje nad **zajedničkim spremištem objekata repozitorija**, a ne nad radnim stablom pojedinačnog worktreeja — zato stash koji jedna sesija doda ili primijeni može neprimjetno pregaziti ili vratiti necommitovane izmjene druge paralelne sesije. Ovo nije hipotetično: 2026-07-02 izmjena `#5923` za quotaCache procurila je u nepovezani worktree `#2296` putem globalnog `stash pop`, a ista klasa incidenta ponovila se preko **podagenta**. Za poređenje radnih izmjena s osnovnom referencom **bez** stasha koristite `git show <ref>:<path>` ili `git diff <ref> -- <path>`; da potvrdite je li typecheck/lint greška već postojala na osnovi, direktno pregledajte osnovnu referencu (`git show origin/release/vX.Y.Z:<path>`) — nikada nemojte skloniti svoje stablo u stash da biste ga "očistili". **Uvrstite ovu zabranu doslovno u prompt svakog podagenta koji radi s gitom** (agenti ne nasljeđuju kontekst ove datoteke — ponavljanje je uzrokovao podagent).
    - **(b) Nikada nemojte spajati, pushovati, rebaseovati niti force-pushovati PR / granu / worktree na kojem druga sesija aktivno radi.** Otvoreni PR čiji je head aktivni worktree ispravke u `.claude/worktrees/` koji vi **niste** kreirali (npr. `fix-5852`/`fix-5923` s nedavnim commitovima, čak i kada dijele vaš identitet `diegosouzapw`) ili bilo koja grana u vlasništvu druge sesije **nedostupni su — ZADRŽITE ih**, i prepustite sesiji vlasniku da ih spoji. **Prije** spajanja ili pusha na bilo koji PR koji niste kreirali u _ovoj_ sesiji, pokrenite `git worktree list` kako biste provjerili postoji li odgovarajući aktivni worktree i ponovo provjerite `gh pr view <N> --json state,headRefOid`. Samo sesija vlasnik spaja vlastiti aktivni PR; spajanja usred rada ulaze u utrku s vlasnikom i ponovo pokreću upravo one utrke commitova/CHANGELOG-a od kojih štite Pravilo #19 i Pravilo #21. (Pojačava Pravilo #19.)
23. **Struktura `_tasks/` je NEDODIRLJIVA — dozvoljeno je samo dodavanje/uređivanje.** To je ZASEBAN git repozitorij
    (privatni remote `diegosouzapw/_tasks_omniroute`) montiran kao stvarni direktorij u korijenu
    glavnog checkouta. Apsolutna pravila: (a) NIKADA nemojte premještati, preimenovati, brisati, prazniti niti
    pretvarati `_tasks` u symlink; sesije smiju samo KREIRATI ili UREĐIVATI datoteke unutar njega;
    (b) NIKADA nemojte pratiti `_tasks` (čak ni kao symlink) u glavnom repozitoriju — praćeni blob bio je
    osnovni uzrok DVA brisanja (2026-08-08 i 2026-08-10: `git reset --hard` materijalizovao je
    praćeni symlink preko stvarnog direktorija, a git je bez upozorenja izbrisao sav ignorisani sadržaj);
    (c) nakon svakog značajnog upisa, `git -C _tasks add -A && git -C _tasks commit
&& git -C _tasks push` — česti push je stvarna sigurnosna kopija; (d) ponovite ovu zabranu
    DOSLOVNO u promptu svakog podagenta koji radi s gitom; (e) ako se `_tasks` pojavi kao neispravan symlink,
    NEMOJTE ništa commitovati — vratite ga s remotea i obavijestite operatera. Gate
    `check:tracked-artifacts` (pre-commit + CI) blokira praćeni `_tasks` u bilo kojem obliku.

---

## Saznanja o sanitizaciji PII podataka i tokova

### 1. Sigurnost regularnih izraza (ReDoS)

Svi obrasci regularnih izraza koji odgovaraju nizovima promjenjive dužine (npr. IPv6 adrese, kreditne kartice) moraju koristiti strogo ograničene sekvence koje se ne preklapaju (npr. ograničiti broj ponavljanja pomoću raspona `{1,7}`) kako bi se spriječilo katastrofalno vraćanje unazad prilikom obrade nepouzdanih ulaznih podataka.

### 2. Obrada SSE snimaka

Prilikom parsiranja protočnih LLM odgovora (npr. Responses API), provjerite predstavlja li fragment završnu snimku (događaji `done` ili `completed`). Tekst snimke mora se direktno sanitizirati kao samostalan niz znakova (zaobilazeći klizne međuspremnike razlika) kako bi se spriječilo dupliciranje teksta na kraju toka.

### 3. Veze s bazom podataka u testovima

Osigurajte da svi jedinični testovi koji pokreću migracije baze podataka ili uspostavljaju SQLite veze pozovu `resetDbInstance()` i pravilno očiste/zatvore sve veze s bazom podataka u `test.after(...)` kuki. Ako se veze s bazom podataka ne oslobode, Nodeov izvorni pokretač testova će ostati beskonačno blokiran.

---

## Pristup lokalnom razvojnom okruženju

Kontrolna ploča je dostupna na URL-u/portu koji odabere operater (zadano `http://localhost:20128`). Pristupni podaci su specifični za svakog operatera:

- **Početna administratorska lozinka** čita se iz varijable okruženja `INITIAL_PASSWORD` pri prvoj instalaciji (zadana vrijednost je `CHANGEME` u `.env.example`; promijenite je odmah nakon prve prijave).
- **Lokalni VPS / dijeljena razvojna okruženja**: zatražite od operatera URL i trenutne pristupne podatke — nalaze se u njegovom ličnom trezoru, NE u ovom repozitoriju.

> Sve pristupne podatke pronađene u prethodnoj verziji ove datoteke treba smatrati neprodukcijskim demonstracijskim vrijednostima; tretirajte ih kao kompromitirane i nemojte ih ponovo koristiti.

<!-- BEGIN:nextjs-agent-rules -->

# Ovo NIJE Next.js koji poznajete

Ova verzija sadrži promjene koje narušavaju kompatibilnost — API-ji, konvencije i struktura datoteka mogu se razlikovati od podataka na kojima ste obučeni. Prije pisanja bilo kakvog koda pročitajte odgovarajući vodič u `node_modules/next/dist/docs/` (putanja se određuje u odnosu na direktorij ove datoteke; u monorepozitorijima paket `next` možda neće biti vidljiv iz korijena repozitorija). Obratite pažnju na obavijesti o zastarjelosti.

Ovaj blok zapisuje i ponovo dodaje `next dev` — provjerite u `node_modules/next/dist/server/lib/generate-agent-files.js`. Njegovo uklanjanje iz razlike samo ponovo stvara nepotvrđenu promjenu; uključivanje bloka u commit zajedno s vašim izmjenama održava radno stablo čistim.

<!-- END:nextjs-agent-rules -->
