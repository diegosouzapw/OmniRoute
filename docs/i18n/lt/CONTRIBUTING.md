# Contributing to OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Dėkojame, kad domitės galimybe prisidėti! Šiame vadove rasite viską, ko reikia norint pradėti.

Oficiali darbo eiga, taikoma kiekvienam pakeitimui, aprašyta
[Indėlio auksiniame kelyje](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Jame tiekėjų, maršruto parinkimo,
UI/UX, i18n, CLI, duomenų bazės ir kūrimo / diegimo pakeitimai susiejami su jų sutartimis, tiksliniais testais, CI
aprėptimi ir suderinimo veiksmais.

---

## Kūrimo aplinkos paruošimas

### Būtinosios sąlygos

- **Node.js** `>=22.22.3 <23` arba `>=24.0.0 <27` (rekomenduojama: 24 LTS)
- **npm** 10+

> **npm v11+ naudotojams (Node 24+):** Paleidę `npm install`, patikrinkite, ar įdiegti savieji moduliai:
> `node -e "require('better-sqlite3')"`. Jei komanda nepavyksta ir pateikiama klaida `MODULE_NOT_FOUND`,
> paleiskite `npm approve-scripts better-sqlite3 && npm install`. Žr.
> [Trikčių diagnostiką](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonavimas ir diegimas

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Aplinkos kintamieji

```bash
# Sukurkite savo .env pagal šabloną
cp .env.example .env

# Sugeneruokite reikalingas slaptąsias reikšmes
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Pagrindiniai kūrimui skirti kintamieji:

| Kintamasis             | Numatytoji kūrimo reikšmė | Aprašymas                        |
| ---------------------- | ------------------------- | -------------------------------- |
| `PORT`                 | `20128`                   | Serverio prievadas               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | Kliento sąsajos bazinis URL      |
| `JWT_SECRET`           | (sugeneruokite pirmiau)   | JWT pasirašymo paslaptis         |
| `INITIAL_PASSWORD`     | `CHANGEME`                | Pirmojo prisijungimo slaptažodis |
| `APP_LOG_LEVEL`        | `info`                    | Žurnalų išsamumo lygis           |

### Valdymo skydelio nustatymai

Valdymo skydelyje pateikiami funkcijų UI jungikliai, kuriuos taip pat galima konfigūruoti naudojant aplinkos kintamuosius:

| Nustatymo vieta           | Jungiklis                 | Aprašymas                               |
| ------------------------- | ------------------------- | --------------------------------------- |
| Nustatymai → Išplėstiniai | Derinimo režimas          | Įjungti derinimo užklausų žurnalus (UI) |
| Nustatymai → Bendrieji    | Šoninės juostos matomumas | Rodyti / slėpti šoninės juostos skiltis |

Šie nustatymai saugomi duomenų bazėje ir išlieka paleidus sistemą iš naujo, o juos nustačius pakeičiamos numatytosios aplinkos kintamųjų reikšmės.

### Paleidimas vietoje

```bash
# Kūrimo režimas (automatinis perkrovimas)
npm run dev

# Produkcinis kūrimas
npm run build    # next build → .build/next/, tada assembleStandalone → dist/
npm run start

# Spartus tik galinės sistemos / API kompiliavimas prisidedančiųjų pakeitimams
npm run build:contributor

# Leidimo kūrimas (švarus perkūrimas + HEAD kontrolinė reikšmė — būtina diegimui)
npm run build:release   # rm -rf .build dist && build + įrašo dist/BUILD_SHA

# Įprasta prievado konfigūracija
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Prisidedantiesiems skirtas kūrimas atlieka tik kompiliavimo patikrą: jis nesurenka autonominio
platinamojo paketo ir nekuria pasirinktinių savųjų paketavimo išteklių. Kai reikia
patikrinti platinti paruoštą paketą, naudokite įprastą produkcinį kūrimą.

### Kūrimo išvesties struktūra

| Katalogas | Turinys                                                                                   | Sekamas |
| --------- | ----------------------------------------------------------------------------------------- | ------- |
| `src/`    | Programos pirminis kodas (TypeScript / TSX)                                               | Taip    |
| `.build/` | Tarpiniai failai — `next build` išvestis (git ignoruojama, `distDir = .build/next`)       | Ne      |
| `dist/`   | Platinti paruoštas paketas — surenkamas naudojant `assembleStandalone` (git ignoruojamas) | Ne      |

Kūrimo konvejeris vykdomas vienu etapu:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js išvestis)
  └─ assembleStandalone()                 (nukopijuoja autonominį paketą + statinius + viešuosius + savuosius išteklius)
       └─ išvestis: dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` taip pat pirmiausia išvalo abu katalogus ir įrašo
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kaip diegimo vientisumo kontrolinę reikšmę.

`npm run build:contributor` naudoja tik galinei sistemai skirtą kūrimo profilį. Kūrimo metu jis laikinai pakeičia
valdymo skydelio UI failus imitaciniais failais, išsaugo API maršrutų apdorojimo programas ir po kūrimo atkuria pradinius failus.
Pakeitimams, turintiems įtakos valdymo skydelio UI, arba visapusiškai leidimo patikrai naudokite `npm run build`;
prisidedantiesiems skirtas profilis nepakeičia leidimo kūrimo.

> **Pastaba dėl diegimo VPS:** nuotolinis atvaizdo katalogas `/usr/lib/node_modules/omniroute/app/`
> nepasikeitė. Diegimo priemonės sinchronizuoja `dist/` turinį į jį naudodamos rsync.
> Pasikeitė tik saugyklos viduje esantis kūrimo išvesties kelias (`app/` → `dist/`).

Numatytieji URL:

- **Valdymo skydelis**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git darbo eiga

> ⚠️ **NIEKADA neįrašykite pakeitimų tiesiogiai į `main`.** Visada naudokite funkcionalumo šakas.
>
> **PR bazė:** pasirinkite aktyvią `release/vX.Y.Z` šaką (ne `main`). Išleidimo šakų ir
> išleidimo metu kuriamų žymų modelis aprašytas
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Sukurkite šaką nuo aktyvios leidimo šakos viršūnės (pavyzdys: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... atlikite pakeitimus ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Atidarykite Pull Request, kurio bazė = release/v3.8.49
```

### Šakų pavadinimai

| Priešdėlis  | Paskirtis                      |
| ----------- | ------------------------------ |
| `feat/`     | Naujos funkcijos               |
| `fix/`      | Klaidų taisymai                |
| `refactor/` | Kodo pertvarkymas              |
| `docs/`     | Dokumentacijos pakeitimai      |
| `test/`     | Testų papildymai ir pataisymai |
| `chore/`    | Įrankiai, CI, priklausomybės   |

### Įrašų pranešimai

Laikykitės [„Conventional Commits“](https://www.conventionalcommits.org/) standarto:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Sritys (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testų vykdymas

```bash
# Visi testai (modulių + vitest + ekosistemos + e2e)
npm run test:all

# Vienas testo failas (savasis Node.js testų vykdiklis — jį naudoja dauguma testų)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tik jūsų pakeitimo paveikti modulių testai (tas pats TIA parinkiklis kaip ir CI patikroje, #8084)
npm run test:scoped            # paskutinio įrašo (arba darbinio medžio) pakeitimai
npm run test:scoped:staged     # tik parengti pakeitimai — patogu naudoti prieš įrašant pakeitimus
npm run test:scoped:full       # pirmiausia iš naujo sukurti importų grafo žemėlapį (pridėjus ar perkėlus failus)
# Exit 1 + „paleiskite visą rinkinį“ reiškia, kad pasikeitė centrinis failas (tsconfig, package.json, …) arba
# nesusietas pirminio kodo failas — parinkiklis saugiai nutraukia darbą ir niekada tyliai nepraleidžia testų.

# Vitest (MCP serveris, autoCombo, podėlis)
npm run test:vitest

# E2E testai (reikalingas Playwright)
npm run test:e2e

# Protokolų klientų E2E testai (MCP transportai, A2A)
npm run test:protocols:e2e

# Ekosistemos suderinamumo testai
npm run test:ecosystem

# Aprėpties riba: 60% sakinių / eilučių / funkcijų / šakų
npm run test:coverage
npm run coverage:report

# Lint ir formatavimo patikra
npm run lint
npm run check

# Sąlygine prieiga apsaugotas bazinis combo testas su tikrais išoriniais tiekėjais (reikalinga prieiga prie VPS ir tikrų tiekėjų kreditai)
# Kreipiamasi į TIKRUS tiekėjus — tai šiek tiek kainuoja. NIEKADA nevykdoma CI. Be prieigos sąlygos tvarkingai praleidžiama.
# Reikalinga: ssh root@192.168.0.15 prieiga (iš VPS gaunama tik skaitoma DB momentinė kopija).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3-iojo etapo bazinis testas veikiančiame VPS — paprasti Node ESM scenarijai, tiesiogiai pasiekiantys veikiantį .15 serverį.
# Reikalinga: ssh root@192.168.0.15 prieiga (combos sukuriami ir pašalinami per SSH sqlite).
# Kreipiamasi į TIKRUS tiekėjus (nedidelė kaina). Sukuriami ir pašalinami tik __live_test__* combos. NIEKADA nevykdoma CI.
# .15 serveryje REQUIRE_API_KEY=false, todėl API rakto nereikia, tačiau, jei nustatyti, naudojami COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY.
npm run test:combo:live:vps              # 7 HTTP scenarijai (prioritetas / ciklinis / svertinis / kaina / sujungimas / automatinis + būklė)
npm run test:combo:live:vps:failover     # pridedamas tikras perjungimo tarp tiekėjų scenarijus (iš viso 8)
```

Aprėpties pastabos:

- `npm run test:coverage` matuoja pagrindinio modulių testų rinkinio pirminio kodo aprėptį, neįtraukia `tests/**` ir įtraukia `open-sse/**`
- Pull request turi išlaikyti **60%+** sakinių / eilučių / funkcijų / šakų aprėpties ribą
- Jei PR pakeičia produkcinį kodą kataloguose `src/`, `open-sse/`, `electron/` arba `bin/`, tame pačiame PR turi būti pridėti arba atnaujinti automatiniai testai
- `npm run coverage:report` išspausdina išsamią naujausio aprėpties vykdymo ataskaitą pagal failus
- `npm run test:coverage:legacy` išsaugo senesnį rodiklį istoriniam palyginimui
- Etapinis aprėpties gerinimo planas pateiktas `docs/ops/COVERAGE_PLAN.md`

### Pull Request reikalavimai

Prieš atidarydami PR, vadovaukitės
[rekomenduojama pakeitimų pateikimo seka](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), kad atliktumėte tikslinį
pakeistos dalies patikrų ciklą. Už visą modulių testų rinkinį (4 CI dalys), Vitest, **60%+**
aprėpties ribą ir produkcinį komponavimą atsakinga CI — vykdant juos vietoje negaunama jokios
papildomos informacijos, kurios jau nepateiktų PR patikros, o mažesniuose kompiuteriuose gali būti
išnaudoti visi pagrindinio kompiuterio ištekliai (#8084):

- Paleiskite jūsų pakeitimą tikrinančius testų failus: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Paleiskite `npm run lint`
- Pakeitę produkcinį kodą, tame pačiame PR pridėkite arba atnaujinkite automatinius testus
- Jei pasikeitė produkcinis kodas, PR apraše nurodykite pakeistus arba pridėtus testų failus
- Kai projekto slaptieji duomenys sukonfigūruoti CI, patikrinkite PR SonarQube rezultatą

Dabartinė testų būsena: **122 modulių testų failai**, apimantys:

- Tiekėjų vertiklius ir formatų konvertavimą
- Užklausų dažnio ribojimą, grandinės pertraukiklį ir atsparumą
- Semantinį podėlį, idempotentiškumą ir eigos stebėjimą
- Duomenų bazės operacijas ir schemą (21 DB modulis)
- OAuth eigas ir autentifikavimą
- API galinių taškų tikrinimą (Zod v4)
- MCP serverio įrankius ir sričių apribojimų užtikrinimą
- Memory ir Skills sistemas

---

## Kodo stilius

- **ESLint** — prieš patvirtindami pakeitimus paleiskite `npm run lint`
- **Prettier** — patvirtinant pakeitimus automatiškai formatuojama per `lint-staged` (2 tarpai, kabliataškiai, dvigubos kabutės, 100 simbolių eilutės plotis, es5 baigiamieji kableliai)
- **TypeScript** — visas `src/` kodas naudoja `.ts`/`.tsx`; `open-sse/` naudoja `.ts`/`.js`; dokumentuokite naudodami TSDoc (`@param`, `@returns`, `@throws`)
- **Jokio `eval()`** — ESLint užtikrina `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validavimas** — visų API įvesčių validavimui naudokite Zod v4 schemas
- **Pavadinimai**: failai = camelCase/kebab-case, komponentai = PascalCase, konstantos = UPPER_SNAKE

### Klaidų apdorojimas / tušti catch blokai

Niekada nepalikite `catch` be paaiškinimo. Priskirkite jį vienai iš dviejų kategorijų (taip praktiškai
įgyvendinama griežta taisyklė „SSE srautuose niekada tyliai nepraleisti klaidų“):

- **Tyčinis (mūsų pačių neprivalomas valymas / telemetrija)** — gedimas čia yra tikėtinas ir
  nekenksmingas; pridėkite vienos eilutės paaiškinamąjį komentarą, bet neregistruokite žurnale (registravimas
  kiekvienai užklausai sukeltų triukšmą, kurio šiuo susitarimu siekiama išvengti).

  ```ts
  } catch {} // po kliento atsijungimo tikėtina, kad bus uždaromas jau uždarytas valdiklis
  ```

- **Reikėtų registruoti žurnale (išorinis / kvietėjo pateiktas kodas arba klaidos praleidimas pakeičia valdymo eigą)** — palikite
  catch bloką (niekada neleiskite jam nutraukti srauto), bet pateikite kontekstinį `console.debug`/`warn`, kad
  gedimą būtų galima aptikti.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback klaida:", e);
  }
  ```

Pritaikymo pavyzdžių rasite `open-sse/utils/stream.ts` ir `open-sse/utils/streamHandler.ts`.

---

## Projekto struktūra

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Valdymo skydelio puslapiai (23 skyriai)
│   ├── api/                # API maršrutai (51 katalogas)
│   └── login/              # Autentifikavimo puslapiai (.tsx)
├── domain/                 # Politikų variklis (policyEngine, comboResolver, costRules ir kt.)
├── lib/                    # Pagrindinė verslo logika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokolo serveris
│   ├── acp/                # Agent Communication Protocol registras
│   ├── compliance/         # Atitikties politikų variklis
│   ├── db/                 # SQLite domeno moduliai ir 130 migracijų
│   ├── memory/             # Išliekamoji pokalbių atmintis
│   ├── oauth/              # OAuth teikėjai, paslaugos ir pagalbinės priemonės
│   ├── skills/             # Išplečiama įgūdžių sistema
│   ├── usage/              # Naudojimo stebėjimas ir kainos skaičiavimas
│   └── localDb.ts          # Tik reeksportavimo sluoksnis — niekada čia nepridėkite logikos
├── middleware/              # Užklausų tarpinė programinė įranga (promptInjectionGuard)
├── mitm/                   # MITM tarpinis serveris (sertifikatai, DNS, paskirties maršruto parinkimas)
├── shared/
│   ├── components/         # React komponentai (.tsx)
│   ├── constants/          # Teikėjų apibrėžtys (329), MCP aprėptys, 19 maršruto parinkimo strategijų
│   ├── utils/              # Grandinės pertraukiklis, išvalymo priemonė, autentifikavimo pagalbinės priemonės
│   └── validation/         # Zod v4 schemos
└── sse/                    # SSE tarpinio serverio konvejeris

open-sse/                   # @omniroute/open-sse darbo sritis
├── executors/              # 89 vykdytojų realizavimo moduliai
├── handlers/               # 11 užklausų apdorojimo programų (pokalbiai, atsakymai, įterpiniai, vaizdai ir kt.)
├── mcp-server/             # MCP serveris (110 unikalių įrankių, 3 transportai, 33 aprėptys)
├── services/               # 178 aukščiausio lygio paslaugos (combo, autoCombo, rateLimitManager ir kt.)
├── translator/             # Formatų vertikliai (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformavimo priemonė
└── utils/                  # 22 pagalbiniai moduliai (srautai, TLS, tarpinis serveris, žurnalų registravimas)

electron/                   # Electron darbalaukio programa (kelioms platformoms)

tests/
├── unit/                   # Node.js testų vykdyklė (1 574 testų failai)
├── integration/            # Integraciniai testai
├── e2e/                    # Playwright testai
├── security/               # Saugumo testai
├── translator/             # Vertikliui skirti testai
└── load/                   # Apkrovos testai

docs/
├── adr/                     # Architektūrinių sprendimų įrašai
├── architecture/            # Sistemos architektūra ir atsparumas
├── comparison/              # OmniRoute palyginimas su alternatyvomis
├── compression/             # Glaudinimo vadovai ir taisyklės
├── dev/                     # Kūrimo vadovai
├── diagrams/                # Architektūros diagramos
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Naudotojo vadovas, Docker, sąranka, trikčių šalinimas
├── i18n/                    # Internacionalizuoti README vertimai
├── marketing/               # Rinkodaros medžiaga
├── ops/                     # Diegimas, tarpinis serveris, aprėptis, leidimai
├── providers/               # Konkretiems teikėjams skirta dokumentacija
├── reference/               # API žinynas, aplinkos kintamieji, CLI įrankiai, nemokami planai
├── releases/                # Leidimų pastabos
├── routing/                 # Automatinio derinių sudarymo variklis, samprotavimo atkūrimas
├── screenshots/             # Valdymo skydelio ekrano kopijos
├── security/                # Apsaugos priemonės, atitiktis, maskavimas, prieigos raktai
└── specs/                   # Projektavimo specifikacijos
```

---

## Naujo teikėjo pridėjimas

### 1 veiksmas: užregistruokite teikėjo konstantas

Pridėkite jas į `src/shared/constants/providers.ts` — įkeliant modulį jos patikrinamos naudojant Zod.

### 2 veiksmas: pridėkite vykdyklę (jei reikalinga pasirinktinė logika)

Sukurkite vykdyklę faile `open-sse/executors/your-provider.ts`, išplėsdami bazinę vykdyklę.

### 3 veiksmas: pridėkite transformatorių (jei naudojamas ne OpenAI formatas)

Sukurkite užklausų ir atsakymų transformatorius kataloge `open-sse/translator/`.

### 4 veiksmas: pridėkite OAuth konfigūraciją (jei naudojamas OAuth)

Pridėkite OAuth prisijungimo duomenis faile `src/lib/oauth/constants/oauth.ts`, o paslaugą — kataloge `src/lib/oauth/services/`.

Jei pirminis teikėjas platina viešą OAuth `client_id` / paslaptį arba Firebase Web API raktą savo viešame CLI / naršyklės pakete, **neįterpkite** jo kaip eilutės literalo. Naudokite `resolvePublicCred()` iš `open-sse/utils/publicCreds.ts` ir pridėkite užmaskuotų baitų įrašą į `EMBEDDED_DEFAULTS`. Visa privaloma darbo eiga aprašyta dokumente [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Apdorojimo funkcijose / vykdyklėse klientą pasiekiantys klaidų pranešimai turi būti apdorojami naudojant `buildErrorBody()` / `sanitizeErrorMessage()` iš `open-sse/utils/error.ts` — niekada nedėkite neapdoroto `err.stack` ar `err.message` į Response turinį. Žr. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5 veiksmas: užregistruokite modelius

Pridėkite modelių aprašus faile `open-sse/config/providerRegistry.ts`.

### 6 veiksmas: pridėkite testus

Parašykite vienetinius testus kataloge `tests/unit/`, kurie apimtų bent:

- Teikėjo registravimą
- Užklausų / atsakymų transformavimą
- Klaidų tvarkymą

---

## Pull Request kontrolinis sąrašas

- [ ] Testai sėkmingi (`npm test`)
- [ ] Linting patikra sėkminga (`npm run lint`)
- [ ] Kompiliavimas sėkmingas (`npm run build`)
- [ ] Pridėti naujų viešųjų funkcijų ir sąsajų TypeScript tipai
- [ ] Nėra kode įrašytų paslapčių ar atsarginių reikšmių
- [ ] Vieši pirminio teikėjo prisijungimo duomenys įterpti naudojant `resolvePublicCred()` (žr. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), o ne kaip literalai
- [ ] Klaidų atsakymai apdorojami naudojant `buildErrorBody()` / `sanitizeErrorMessage()` — atsakymų turinyje nėra neapdorotų dėklo išklotinių (žr. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Apvalkalo komandos (`exec` / `spawn`) vykdymo meto reikšmes perduoda per `env`, o ne naudodamos eilučių interpoliaciją
- [ ] Visos įvestys patikrintos naudojant Zod schemas
- [ ] Naudotojams matomiems pakeitimams pridėtas pakeitimų žurnalo **fragmentas** kataloge `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (žr. [`changelog.d/README.md`](./changelog.d/README.md)) — **neredaguokite** `CHANGELOG.md` tiesiogiai; fragmentai sujungiami leidimo metu ir niekada nesukelia konfliktų tarp PR
- [ ] Dokumentacija atnaujinta (jei taikoma)
- [ ] Neatsirado naujų CodeQL / Secret-Scanning įspėjimų arba kiekvienas iš jų atmestas pateikus techninį pagrindimą su nuoroda į atitinkamą `docs/security/` dokumentą
- [ ] Maršrutai, paleidžiantys antrinius procesus (`/api/mcp/`, `/api/cli-tools/runtime/`), faile `src/server/authz/routeGuard.ts` klasifikuojami kaip `isLocalOnlyPath()` — žr. [Griežtąją taisyklę Nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Įvykdymo pranešimuose nėra `Co-Authored-By` galinių eilučių — įvykdymai turi būti rodomi tik su saugyklos savininko Git tapatybe (Griežtoji taisyklė Nr. 16)

---

## Leidimų publikavimas

Leidimai valdomi naudojant `/generate-release` darbo eigą. Sukūrus naują GitHub leidimą, paketas per GitHub Actions **automatiškai publikuojamas npm**.

Diegimams VPS aplinkoje naudokite `npm run build:release` (ne `npm run build`) — ši komanda atlieka švarų
perkompiliavimą, suformuoja paketą kataloge `dist/` ir įrašo kontrolinį failą `dist/BUILD_SHA`.
Tada naudokite `/deploy-vps-*-cc` įgūdžius, kurie per rsync nukopijuoja `dist/` į nuotolinį katalogą `app/`.

---

## Pagalba

- **Architektūra**: žr. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API dokumentacija**: žr. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Saugumo dokumentai**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Eksploatavimo dokumentai**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemos**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: architektūrinių sprendimų įrašus rasite `docs/adr/`
