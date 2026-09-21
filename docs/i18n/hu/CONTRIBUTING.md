# Contributing to OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Fejlesztői környezet beállítása

### Előfeltételek

- **Node.js** `>=22.22.3 <23` vagy `>=24.0.0 <27` (ajánlott: 24 LTS)
- **npm** 10+

> **npm v11+ felhasználók (Node 24+):** Az `npm install` futtatása után ellenőrizze, hogy a natív modulok telepítve lettek-e:
> `node -e "require('better-sqlite3')"`. Ha `MODULE_NOT_FOUND` hibával meghiúsul,
> futtassa az `npm approve-scripts better-sqlite3 && npm install` parancsot. Lásd:
> [Hibaelhárítás](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klónozás és telepítés

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Környezeti változók

```bash
# Hozza létre a .env fájlt a sablonból
cp .env.example .env

# Hozza létre a szükséges titkos értékeket
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

A fejlesztéshez szükséges főbb változók:

| Változó                | Fejlesztési alapérték    | Leírás                           |
| ---------------------- | ------------------------ | -------------------------------- |
| `PORT`                 | `20128`                  | A kiszolgáló portja              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | A frontend alap-URL-je           |
| `JWT_SECRET`           | (fent hozza létre)       | A JWT aláírási titka             |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Az első bejelentkezés jelszava   |
| `APP_LOG_LEVEL`        | `info`                   | A naplózás részletességi szintje |

### Vezérlőpult-beállítások

A vezérlőpult felületi kapcsolókat biztosít olyan funkciókhoz, amelyek környezeti változókkal is konfigurálhatók:

| Beállítás helye         | Kapcsoló             | Leírás                                           |
| ----------------------- | -------------------- | ------------------------------------------------ |
| Beállítások → Speciális | Hibakeresési mód     | Hibakeresési kérésnaplók engedélyezése (UI)      |
| Beállítások → Általános | Oldalsáv láthatósága | Az oldalsáv szakaszainak megjelenítése/elrejtése |

Ezeket a beállításokat az adatbázis tárolja, és újraindítás után is megmaradnak; beállításuk esetén felülírják a környezeti változók alapértékeit.

### Helyi futtatás

```bash
# Fejlesztői mód (automatikus újratöltés)
npm run dev

# Éles build
npm run build    # next build → .build/next/, majd assembleStandalone → dist/
npm run start

# Gyors, csak backend/API-fordítás a közreműködői módosításokhoz
npm run build:contributor

# Kiadási build (tiszta újrafordítás + HEAD-ellenőrzőfájl — telepítéshez kötelező)
npm run build:release   # rm -rf .build dist && build + létrehozza a dist/BUILD_SHA fájlt

# Gyakori portkonfiguráció
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

A közreműködői build csak fordítási ellenőrzést végez: nem állítja össze az önálló
disztribúciót, és nem készíti el az opcionális natív csomagolási elemeket. Használja a szokásos éles buildet, amikor
a szállítható csomagot kell ellenőriznie.

### A build kimeneti elrendezése

| Könyvtár  | Tartalom                                                                                            | Verziókövetett |
| --------- | --------------------------------------------------------------------------------------------------- | -------------- |
| `src/`    | Az alkalmazás forráskódja (TypeScript / TSX)                                                        | Igen           |
| `.build/` | Köztes fájlok — a `next build` kimenete (git által figyelmen kívül hagyva, `distDir = .build/next`) | Nem            |
| `dist/`   | Szállítható csomag — az `assembleStandalone` állítja össze (git által figyelmen kívül hagyva)       | Nem            |

A buildfolyamat egyetlen menetből áll:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-kimenet)
  └─ assembleStandalone()                 (átmásolja az önálló + statikus + nyilvános + natív elemeket)
       └─ kimenet: dist/                  (server.js, .next/static/, public/, node_modules/)
```

Az `npm run build:release` emellett először mindkét könyvtárat törli, majd létrehozza a
`dist/BUILD_SHA` fájlt (= `git rev-parse --short HEAD`) a telepítés integritását jelző ellenőrzőfájlként.

Az `npm run build:contributor` a csak backendet tartalmazó buildprofilt használja. A fordítás idejére ideiglenesen helyettesíti
a vezérlőpult UI-fájljait, megtartja az API-útvonalkezelőket, majd a build után visszaállítja az eredeti fájlokat.
A vezérlőpult felhasználói felületét érintő módosításokhoz vagy a teljes kiadás ellenőrzéséhez használja az `npm run build` parancsot;
a közreműködői profil nem helyettesíti a kiadási buildet.

> **VPS-telepítési megjegyzés:** a távoli lemezkép `/usr/lib/node_modules/omniroute/app/`
> könyvtára változatlan. A telepítési automatizmusok az `dist/` tartalmát szinkronizálják bele az rsync segítségével.
> Csak a tárolón belüli buildkimenet útvonala változott (`app/` → `dist/`).

Alapértelmezett URL-ek:

- **Vezérlőpult**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-munkafolyamat

> ⚠️ **SOHA ne commitolj közvetlenül a `main` ágra.** Mindig használj funkcióágakat.
>
> **PR alapága:** az aktív `release/vX.Y.Z` ágat célozd meg (ne a `main` ágat). Az
> ágankénti kiadás + kiadáskori címkézés modelljéről lásd:
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Hozz létre ágat az aktív kiadási ág legfrissebb állapotából (például: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... végezd el a módosításokat ...
git commit -m "feat: írd le a módosítást"
git push -u origin feat/your-feature-name
# Nyiss Pull Requestet a következő alapággal: release/v3.8.49
```

### Ágak elnevezése

| Előtag      | Cél                         |
| ----------- | --------------------------- |
| `feat/`     | Új funkciók                 |
| `fix/`      | Hibajavítások               |
| `refactor/` | A kód átszervezése          |
| `docs/`     | Dokumentáció módosításai    |
| `test/`     | Tesztek hozzáadása/javítása |
| `chore/`    | Eszközök, CI, függőségek    |

### Commitüzenetek

Kövesd a [Conventional Commits](https://www.conventionalcommits.org/) szabványt:

```
feat: áramkör-megszakító hozzáadása a szolgáltatói hívásokhoz
fix: a JWT-titok ellenőrzési peremfeltételének megoldása
docs: a SECURITY.md frissítése a PII védelmével
test: megfigyelhetőségi egységtesztek hozzáadása
refactor(db): a sebességkorlátozási táblák összevonása
```

Hatókörök (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tesztek futtatása

```bash
# Minden teszt (unit + vitest + ecosystem + e2e)
npm run test:all

# Egyetlen tesztfájl (a Node.js natív tesztfuttatója — a legtöbb teszt ezt használja)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Csak a módosítás által érintett unit tesztek (ugyanaz a TIA-szelektor, mint a CI ellenőrzésénél, #8084)
npm run test:scoped            # az utolsó commitban (vagy a munkafában) lévő módosítások
npm run test:scoped:staged     # csak a stage-elt módosítások — jól használható pre-commit futtatással
npm run test:scoped:full       # először újraépíti az importgráf-térképet (fájlok hozzáadása/áthelyezése után)
# Az 1-es kilépési kód + "run the full suite" azt jelenti, hogy egy központi fájl (tsconfig, package.json, …) vagy egy
# nem feltérképezett forrás módosult — a szelektor biztonságosan hibázik, soha nem hagy ki csendben teszteket.

# Vitest (MCP-kiszolgáló, autoCombo, gyorsítótár)
npm run test:vitest

# E2E tesztek (Playwright szükséges)
npm run test:e2e

# Protokollkliensek E2E tesztjei (MCP-transzportok, A2A)
npm run test:protocols:e2e

# Ökoszisztéma-kompatibilitási tesztek
npm run test:ecosystem

# Lefedettségi küszöb: 60% utasítás-/sor-/függvény-/áglefedettség
npm run test:coverage
npm run coverage:report

# Lintelés + formázás ellenőrzése
npm run lint
npm run check

# Feltételes, valós upstream combo smoke teszt (VPS-hozzáférést és valós szolgáltatói krediteket igényel)
# VALÓS szolgáltatókat ér el — kis költséggel jár. SOHA nem fut CI-ben. A feltétel nélkül szabályosan kihagyásra kerül.
# Szükséges: ssh root@192.168.0.15 hozzáférés (egy írásvédett DB-pillanatképet tölt be a VPS-ről).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. fázisú élő VPS smoke teszt — egyszerű Node ESM-szkriptek, amelyek közvetlenül az élő .15-ös kiszolgálót érik el.
# Szükséges: ssh root@192.168.0.15 hozzáférés (a combók létrehozása/lebontása SSH-n keresztül, sqlite használatával történik).
# VALÓS szolgáltatókat ér el (kis költséggel). Csak __live_test__* combókat hoz létre/töröl. SOHA nem fut CI-ben.
# A .15-ös gépen REQUIRE_API_KEY=false, ezért nincs szükség API-kulcsra, de ha be vannak állítva, figyelembe veszi a COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY értékét.
npm run test:combo:live:vps              # 7 HTTP-forgatókönyv (prioritásos/round-robin/súlyozott/költségalapú/fúziós/automatikus + állapot)
npm run test:combo:live:vps:failover     # hozzáad egy valós, szolgáltatók közötti feladatátvételi forgatókönyvet (összesen 8)
```

Megjegyzések a lefedettségről:

- Az `npm run test:coverage` méri a forráskód lefedettségét a fő unit tesztcsomaghoz, kizárja a `tests/**` fájlokat, és tartalmazza az `open-sse/**` fájlokat
- A pull requesteknek fenn kell tartaniuk a **60%+** utasítás-/sor-/függvény-/áglefedettségi küszöböt
- Ha egy PR módosítja a `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárban lévő éles kódot, ugyanabban a PR-ben automatizált teszteket is hozzá kell adnia vagy frissítenie kell
- Az `npm run coverage:report` kiírja a legutóbbi lefedettségi futtatás részletes, fájlonkénti jelentését
- Az `npm run test:coverage:legacy` megőrzi a régebbi mérőszámot a korábbi eredményekkel való összehasonlításhoz
- A lefedettség szakaszos fejlesztési ütemtervét lásd a `docs/ops/COVERAGE_PLAN.md` fájlban

### Pull request követelményei

PR megnyitása előtt használd a
[hozzájárulási Golden Path útmutatót](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), hogy lefuttasd a módosításaidhoz
tartozó célzott ciklust. A teljes unit tesztcsomag (4 CI-shard), a Vitest, a **60%+** lefedettségi küszöb és
az éles build a CI felelőssége — helyi futtatásuk nem ad olyan további információt, amelyet a PR
ellenőrzései ne biztosítanának, kisebb gépeken pedig túlterhelhetik a rendszert (#8084):

- Futtasd a módosításodat lefedő tesztfájlokat: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Futtasd az `npm run lint` parancsot
- Éles kód módosításakor ugyanabban a PR-ben adj hozzá vagy frissíts automatizált teszteket
- Ha az éles kód módosult, a PR leírásában tüntesd fel a módosított vagy hozzáadott tesztfájlokat
- Ellenőrizd a SonarQube eredményét a PR-ben, ha a projekt titkos értékei be vannak állítva a CI-ben

A tesztek jelenlegi állapota: **122 unit tesztfájl**, amelyek az alábbiakat fedik le:

- Szolgáltatói fordítók és formátumkonverzió
- Sebességkorlátozás, áramkör-megszakító és hibatűrés
- Szemantikus gyorsítótár, idempotencia, folyamatkövetés
- Adatbázis-műveletek és séma (21 DB-modul)
- OAuth-folyamatok és hitelesítés
- API-végpontok validációja (Zod v4)
- MCP-kiszolgálóeszközök és hatókörök kikényszerítése
- Memória- és Skills-rendszerek

---

## Kódstílus

- **ESLint** — Véglegesítés előtt futtasd az `npm run lint` parancsot
- **Prettier** — Véglegesítéskor a `lint-staged` automatikusan formázza (2 szóköz, pontosvesszők, dupla idézőjelek, 100 karakteres sorszélesség, es5 záróvesszők)
- **TypeScript** — A `src/` teljes kódja `.ts`/`.tsx` fájlokat használ; az `open-sse/` `.ts`/`.js` fájlokat használ; a dokumentáláshoz használj TSDoc formátumot (`@param`, `@returns`, `@throws`)
- **Tilos az `eval()`** — Az ESLint kikényszeríti a `no-eval`, `no-implied-eval`, `no-new-func` szabályokat
- **Zod-validáció** — Minden API-bemenet validálásához Zod v4 sémákat használj
- **Elnevezés**: fájlok = camelCase/kebab-case, komponensek = PascalCase, konstansok = UPPER_SNAKE

### Hibakezelés / üres catch blokkok

Soha ne hagyj egy `catch` blokkot magyarázat nélkül. Sorold be az alábbi két kategória
egyikébe (ez teszi gyakorlatban alkalmazhatóvá a „soha ne nyeld el csendben a hibákat az SSE-adatfolyamokban”
szigorú szabályt):

- **Szándékos (saját, lehetőség szerinti tisztításunk/telemetriánk)** — az itteni hiba várható és
  ártalmatlan; adj hozzá egysoros indoklást, naplózás nélkül (ez a konvenció az egyes kérésekhez
  tartozó naplózásból eredő zajt hivatott elkerülni).

  ```ts
  } catch {} // a kliens leválása után egy már lezárt vezérlő lezárása várható
  ```

- **Naplózandó (külső/hívó által megadott kód, vagy az elnyelés megváltoztatja a vezérlési folyamatot)** — tartsd
  meg a catch blokkot (soha ne engedd, hogy megszakítsa az adatfolyamot), de adj ki kontextust tartalmazó `console.debug`/`warn`
  üzenetet, hogy a hiba észlelhető legyen.

  ```ts
  } catch (e) {
    console.debug("[STREAM] hiba az onFailure visszahívásban:", e);
  }
  ```

Alkalmazott példákért lásd az `open-sse/utils/stream.ts` és az `open-sse/utils/streamHandler.ts` fájlokat.

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

## Új szolgáltató hozzáadása

### 1. lépés: A szolgáltatói konstansok regisztrálása

Adja hozzá a `src/shared/constants/providers.ts` fájlhoz — a Zod a modul betöltésekor validálja.

### 2. lépés: Végrehajtó hozzáadása (ha egyéni logika szükséges)

Hozzon létre egy, az alap-végrehajtót kiterjesztő végrehajtót az `open-sse/executors/your-provider.ts` fájlban.

### 3. lépés: Átalakító hozzáadása (ha a formátum nem OpenAI-kompatibilis)

Hozza létre a kérés- és válaszátalakítókat az `open-sse/translator/` könyvtárban.

### 4. lépés: OAuth-konfiguráció hozzáadása (OAuth-alapú szolgáltató esetén)

Adja hozzá az OAuth-hitelesítő adatokat a `src/lib/oauth/constants/oauth.ts` fájlban, a szolgáltatást pedig a `src/lib/oauth/services/` könyvtárban.

Ha a külső szolgáltató nyilvános OAuth client_id/secret értéket vagy Firebase Web API-kulcsot terjeszt a nyilvános CLI-jében/böngészős csomagjában, **ne** ágyazza be azt sztringliterálként. Használja az `open-sse/utils/publicCreds.ts` fájlban található `resolvePublicCred()` függvényt, és adjon hozzá egy maszkolt bájtbejegyzést az `EMBEDDED_DEFAULTS` elemhez. A teljes kötelező munkafolyamat dokumentációja itt található: [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

A kezelőkön/végrehajtókon belül a klienshez eljutó hibaüzeneteknek az `open-sse/utils/error.ts` fájlban található `buildErrorBody()` / `sanitizeErrorMessage()` függvényeken kell áthaladniuk — soha ne helyezze a nyers `err.stack` vagy `err.message` értéket egy Response törzsébe. Lásd: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5. lépés: Modellek regisztrálása

Adja hozzá a modelldefiníciókat az `open-sse/config/providerRegistry.ts` fájlban.

### 6. lépés: Tesztek hozzáadása

Írjon egységteszteket a `tests/unit/` könyvtárban, amelyek legalább a következőket lefedik:

- A szolgáltató regisztrációja
- A kérések/válaszok átalakítása
- Hibakezelés

---

## Pull Request ellenőrzőlista

- [ ] A tesztek sikeresen lefutnak (`npm test`)
- [ ] A lintelés sikeresen lefut (`npm run lint`)
- [ ] A build sikeresen elkészül (`npm run build`)
- [ ] TypeScript-típusok hozzáadva az új nyilvános függvényekhez és interfészekhez
- [ ] Nincsenek beégetett titkos adatok vagy tartalékértékek
- [ ] A nyilvános upstream hitelesítő adatok beágyazása a `resolvePublicCred()` használatával történik (lásd: [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), soha nem literálként
- [ ] A hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeken keresztül haladnak — a válaszok törzsében nincsenek nyers veremkiírások (lásd: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] A shell-parancsok (`exec` / `spawn`) a futásidejű értékeket az `env` használatával, nem pedig karakterlánc-interpolációval adják át
- [ ] Minden bemenet Zod-sémákkal van validálva
- [ ] A felhasználókat érintő változásokhoz **változásnapló-töredék** hozzáadva a `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` alatt (lásd: [`changelog.d/README.md`](./changelog.d/README.md)) — a `CHANGELOG.md` fájlt **ne** szerkeszd közvetlenül; a töredékeket a kiadáskor összesítik, és soha nem okoznak ütközést a PR-ok között
- [ ] A dokumentáció frissítve (ha alkalmazható)
- [ ] Nem keletkezett új CodeQL- vagy Secret-Scanning-riasztás, vagy mindegyik el lett utasítva a vonatkozó `docs/security/` dokumentumra hivatkozó műszaki indoklással
- [ ] A gyermekfolyamatokat indító útvonalak (`/api/mcp/`, `/api/cli-tools/runtime/`) `isLocalOnlyPath()` besorolást kaptak a `src/server/authz/routeGuard.ts` fájlban — lásd: [15. szigorú szabály](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] A commitüzenetekben nincsenek `Co-Authored-By` zárósorok — a commitoknak kizárólag a tároló tulajdonosának Git-identitása alatt kell megjelenniük (16. szigorú szabály)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Segítségkérés

- **Architektúra**: Lásd: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-referencia**: Lásd: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Biztonsági dokumentáció**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Üzemeltetési dokumentáció**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problémák**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-ek**: Az architekturális döntési feljegyzéseket a `docs/adr/` könyvtárban találja.
