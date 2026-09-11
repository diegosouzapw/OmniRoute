# Contributing to OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Täname huvi eest panustamise vastu! See juhend hõlmab kõike, mida alustamiseks vajate.

Ametliku muudatusepõhise töövoo jaoks alustage
[panustamise põhiteest](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). See seob teenusepakkuja, marsruutimise,
UI/UX-i, i18n-i, CLI, andmebaasi ning koostamise/juurutamise muudatused nende lepingute, suunatud testide, CI
katvuse ja vastavusse viimise sammudega.

---

## Arenduskeskkonna seadistamine

### Eeltingimused

- **Node.js** `>=22.22.3 <23` või `>=24.0.0 <27` (soovitatav: 24 LTS)
- **npm** 10+

> **npm v11+ kasutajad (Node 24+):** Pärast käsku `npm install` kontrollige, et omamoodulid oleksid installitud:
> `node -e "require('better-sqlite3')"`. Kui see nurjub veaga `MODULE_NOT_FOUND`,
> käivitage `npm approve-scripts better-sqlite3 && npm install`. Vaadake
> [tõrkeotsingut](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloonimine ja installimine

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Keskkonnamuutujad

```bash
# Looge mallist oma .env
cp .env.example .env

# Genereerige nõutavad saladused
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Peamised arenduseks vajalikud muutujad:

| Muutuja                | Arenduse vaikeväärtus    | Kirjeldus                    |
| ---------------------- | ------------------------ | ---------------------------- |
| `PORT`                 | `20128`                  | Serveri port                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Kasutajaliidese baas-URL     |
| `JWT_SECRET`           | (genereerige ülal)       | JWT allkirjastussaladus      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Esimese sisselogimise parool |
| `APP_LOG_LEVEL`        | `info`                   | Logimise detailsusaste       |

### Juhtpaneeli seaded

Juhtpaneel pakub funktsioonide jaoks kasutajaliidese lüliteid, mida saab seadistada ka keskkonnamuutujate kaudu:

| Seadistuse asukoht | Lüliti            | Kirjeldus                        |
| ------------------ | ----------------- | -------------------------------- |
| Seaded → Täpsemad  | Silumisrežiim     | Luba silumispäringute logid (UI) |
| Seaded → Üldine    | Külgriba nähtavus | Kuva või peida külgriba jaotised |

Need seaded salvestatakse andmebaasi ja säilivad taaskäivitamiste vahel, alistades määramise korral keskkonnamuutujate vaikeväärtused.

### Kohalik käitamine

```bash
# Arendusrežiim (automaatne taaslaadimine)
npm run dev

# Tootmisversiooni koostamine
npm run build    # next build → .build/next/, seejärel assembleStandalone → dist/
npm run start

# Kiire ainult taustsüsteemi/API kompileerimine panustaja muudatuste jaoks
npm run build:contributor

# Väljalaske koostamine (puhas uuesti koostamine + HEAD-i kontrolltähis — juurutamiseks nõutav)
npm run build:release   # rm -rf .build dist && build + kirjutab faili dist/BUILD_SHA

# Levinud pordi konfiguratsioon
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Panustaja koostamine teostab ainult kompileerimise valideerimise: see ei pane kokku eraldiseisvat
distributsiooni ega koosta valikulisi omapakenduse ressursse. Kasutage tavalist tootmisversiooni koostamist, kui
peate valideerima tarnitavat komplekti.

### Koostamisväljundi paigutus

| Kataloog  | Sisu                                                                                   | Versioonihalduses |
| --------- | -------------------------------------------------------------------------------------- | ----------------- |
| `src/`    | Rakenduse lähtekood (TypeScript / TSX)                                                 | Jah               |
| `.build/` | Vahefailid — käsu `next build` väljund (gitignore'itud, `distDir = .build/next`)       | Ei                |
| `dist/`   | Tarnitav komplekt — pannakse kokku funktsiooniga `assembleStandalone` (gitignore'itud) | Ei                |

Koostamiskonveier töötab ühe läbimisega:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-i väljund)
  └─ assembleStandalone()                 (kopeerib eraldiseisva versiooni + staatilised failid + avalikud failid + omavarad)
       └─ väljund: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` puhastab esmalt ka mõlemad kataloogid ja kirjutab
juurutuse tervikluse kontrolltähisena faili `dist/BUILD_SHA` (= `git rev-parse --short HEAD`).

`npm run build:contributor` kasutab ainult taustsüsteemi koostamisprofiili. See asendab koostamise ajaks
juhtpaneeli UI failid ajutiselt asendusfailidega, säilitab API marsruutide töötlejad ja taastab algsed failid
pärast koostamist. Kasutage käsku `npm run build` muudatuste puhul, mis mõjutavad juhtpaneeli UI-d, või täielikuks
väljalaske valideerimiseks; panustaja profiil ei asenda väljalaske koostamist.

> **Märkus VPS-i juurutamise kohta:** kaugkujutise kataloog `/usr/lib/node_modules/omniroute/app/`
> ei ole muutunud. Juurutusoskused sünkroonivad käsuga rsync kataloogi `dist/` sisu sinna.
> Muutus ainult hoidlasisese koostamisväljundi asukoht (`app/` → `dist/`).

Vaikimisi URL-id:

- **Juhtpaneel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Giti töövoog

> ⚠️ **ÄRA KUNAGI commiti otse harusse `main`.** Kasuta alati funktsionaalsusharusid.
>
> **PR-i baasharu:** sihi aktiivset haru `release/vX.Y.Z` (mitte `main`). Harupõhise väljalaske
> ja avaldamisel sildistamise mudelit kirjeldab
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Loo haru aktiivse väljalaske tipust (näide: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... tee muudatused ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Ava Pull Request, mille base = release/v3.8.49
```

### Harude nimetamine

| Prefiks     | Otstarve                     |
| ----------- | ---------------------------- |
| `feat/`     | Uued funktsioonid            |
| `fix/`      | Veaparandused                |
| `refactor/` | Koodi ümberstruktureerimine  |
| `docs/`     | Dokumentatsiooni muudatused  |
| `test/`     | Testide lisamised/parandused |
| `chore/`    | Tööriistad, CI, sõltuvused   |

### Commiti sõnumid

Järgi standardit [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Ulatused (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testide käitamine

```bash
# Kõik testid (ühiktestid + vitest + ökosüsteem + e2e)
npm run test:all

# Üks testifail (Node.js-i sisseehitatud testikäitaja — enamik teste kasutab seda)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Ainult sinu muudatusest mõjutatud ühiktestid (sama TIA valija nagu CI kontrollis, #8084)
npm run test:scoped            # viimase commiti muudatused (või tööpuu muudatused)
npm run test:scoped:staged     # ainult etapistatud muudatused — sobib hästi commiti-eelse käitusega
npm run test:scoped:full       # loo esmalt uuesti impordigraafi kaart (pärast failide lisamist/teisaldamist)
# Väljumiskood 1 + „käita kogu komplekt“ tähendab, et muutus keskne fail (tsconfig, package.json, …) või
# kaardistamata lähtekood — valija rakendab turvalist tõrget ega jäta kunagi midagi märkamatult vahele.

# Vitest (MCP server, autoCombo, vahemälu)
npm run test:vitest

# E2E-testid (nõuab Playwrighti)
npm run test:e2e

# Protokolliklientide E2E (MCP transpordid, A2A)
npm run test:protocols:e2e

# Ökosüsteemi ühilduvustestid
npm run test:ecosystem

# Katvuse kontroll: 60% lausetest/ridadest/funktsioonidest/harudest
npm run test:coverage
npm run coverage:report

# Lintimise + vorminduse kontroll
npm run lint
npm run check

# Kontrollitud päris ülesvoolu kombinatsiooni suitsutest (nõuab VPS-i juurdepääsu + päris teenusepakkuja krediiti)
# Pöördub PÄRIS teenusepakkujate poole — maksab veidi. Seda EI käitata KUNAGI CI-s. Ilma kontrollmuutujata jäetakse test korrektselt vahele.
# Nõuab: ssh root@192.168.0.15 juurdepääsu (laadib VPS-ist kirjutuskaitstud DB hetktõmmise).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. etapi VPS-i reaalne suitsutest — tavalised Node ESM-i skriptid, mis pöörduvad otse töötava .15 serveri poole.
# Nõuab: ssh root@192.168.0.15 juurdepääsu (kombinatsioonid luuakse/eemaldatakse SSH kaudu sqlite'is).
# Pöördub PÄRIS teenusepakkujate poole (väike kulu). Loob/kustutab ainult __live_test__* kombinatsioone. Seda EI käitata KUNAGI CI-s.
# REQUIRE_API_KEY=false serveris .15, seega API-võtit pole vaja, kuid kasutab määramise korral väärtusi COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY.
npm run test:combo:live:vps              # 7 HTTP-stsenaariumi (prioriteet/tsükliline/kaalutud/kulu/fusioon/automaatne + seisund)
npm run test:combo:live:vps:failover     # lisab päris teenusepakkujatevahelise tõrkesiirde stsenaariumi (kokku 8)
```

Märkused katvuse kohta:

- `npm run test:coverage` mõõdab peamise ühiktestide komplekti lähtekoodi katvust, välistab `tests/**` ja hõlmab `open-sse/**`
- Pull Requestid peavad säilitama katvuse kontrollis lausete/ridade/funktsioonide/harude katvuse tasemel **60%+**
- Kui PR muudab tootmiskoodi kataloogis `src/`, `open-sse/`, `electron/` või `bin/`, tuleb samas PR-is lisada või värskendada automatiseeritud teste
- `npm run coverage:report` väljastab viimase katvuskäituse üksikasjaliku failipõhise aruande
- `npm run test:coverage:legacy` säilitab ajalooliseks võrdluseks vanema mõõdiku
- Katvuse parandamise etapiviisilist tegevuskava kirjeldab `docs/ops/COVERAGE_PLAN.md`

### Pull Requesti nõuded

Enne PR-i avamist kasuta juhendit
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), et käitada tehtud
muudatustele keskenduv tsükkel. Täielik ühiktestide komplekt (4 CI jaotist), Vitest, **60%+**
katvuse kontroll ja tootmisjärk on CI vastutusel — nende kohalik käitamine ei anna lisateavet,
mida PR-i kontrollid juba ei annaks, ning väiksemates masinates võib see süsteemi üle koormata (#8084):

- Käita oma muudatust katvaid testifaile: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Käita `npm run lint`
- Tootmiskoodi muutmisel lisa või värskenda samas PR-is automatiseeritud teste
- Kui tootmiskood muutus, lisa muudetud või lisatud testifailid PR-i kirjeldusse
- Kontrolli PR-is SonarQube'i tulemust, kui projekti saladused on CI-s seadistatud

Testide praegune olek: **122 ühiktestifaili**, mis hõlmavad järgmist:

- Teenusepakkujate tõlkijad ja vormingute teisendamine
- Kiiruse piiramine, kaitselüliti ja tõrkekindlus
- Semantiline vahemälu, idempotentsus ja edenemise jälgimine
- Andmebaasitoimingud ja skeem (21 DB moodulit)
- OAuthi vood ja autentimine
- API otspunktide valideerimine (Zod v4)
- MCP serveri tööriistad ja ulatuse jõustamine
- Mälu- ja oskustesüsteemid

---

## Koodistiil

- **ESLint** — Käivita `npm run lint` enne commitimist
- **Prettier** — Automaatselt vormindatud `lint-staged` abil commitimisel (2 tühikut, semikoolonid, kahekordsed jutumärgid, 100 märgi laius, es5 järgnevad komad)
- **TypeScript** — Kogu `src/` kood kasutab `.ts`/`.tsx`; `open-sse/` kasutab `.ts`/`.js`; dokumendi TSDoc-ga (`@param`, `@returns`, `@throws`)
- **Keelatud `eval()`** — ESLint rakendab `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod valideerimine** — Kasuta Zod v4 skeeme kõigi API sisendi valideerimiseks
- **Nimetamine**: Failid = camelCase/kebab-case, komponendid = PascalCase, konstantid = UPPER_SNAKE

### Vigade töötlemine / tühjad catch-blokid

Ära jäta `catch` kunagi selgitamata. Klasifitseeri see kahe kategooriasse (operationaliseerib kange reegli "mitte kunagi vaikselt loe SSE voogudes vigu"):

- **Intentsionaalne (oma parima püüdluse puhastus/telemeetria)** — ebaõnnestumine siin on oodatud ja
  kahjutus; lisa ühe rea põhjendav kommentaar, logimata (iga päringu logimine on see müra, mida see konventsioon vältib).

  ```ts
  } catch {} // juba suletud kontrolleri sulgemine kliendi discconnecti järel on oodatud
  ```

- **Peab logima (väline/hüvitaja kood, või niitamine muudab kontrollivoolu)** — hoia
  catch (kunagi lase see voogu murda) aga emiteeri kontekstuaalne `console.debug`/`warn`, et
  ebaõnnestumine on avastatav.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Vaata `open-sse/utils/stream.ts` ja `open-sse/utils/streamHandler.ts` rakendatud näidete jaoks.

---

## Projekti struktuur

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard lehed (23 sektsiooni)
│   ├── api/                # API marsruudid (51 kataloogi)
│   └── login/              # Autentimise lehed (.tsx)
├── domain/                 # Poliitika mootor (policyEngine, comboResolver, costRules, jne)
├── lib/                    # Põhiline äriloogika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokolli server
│   ├── acp/                # Agent Communication Protocol registri
│   ├── compliance/         # Vastavuse poliitika mootor
│   ├── db/                 # SQLite domeeni moodulid + 130 migreerimist
│   ├── memory/             # Pidev konversatsioonimälu
│   ├── oauth/              # OAuth pakkujad, teenused ja utiliidid
│   ├── skills/             # Laiendatav oskuste raamistik
│   ├── usage/              # Kasutuse jälgimine ja kulude arvutamine
│   └── localDb.ts          # Ainult re-eksporti kihi — kunagi ei lisa loogikat siia
├── middleware/              # Päringu middleware (promptInjectionGuard)
├── mitm/                   # MITM proksi (sert, DNS, sihtmarsruutimine)
├── shared/
│   ├── components/         # React komponendid (.tsx)
│   ├── constants/          # Pakkuja definitsioonid (329), MCP skoobid, 19 marsruutimisstrategiat
│   ├── utils/              # Ringi katkestaja, sanitaizer, autentimise abid
│   └── validation/         # Zod v4 skeemid
└── sse/                    # SSE proksi pipeline

open-sse/                   # @omniroute/open-sse tööruum
├── executors/              # 89 eksikuteeri implementatsiooni moodulit
├── handlers/               # 11 päringu käsitlejat (vestlus, vastused, embeddings, pildid, jne)
├── mcp-server/             # MCP server (110 unikaalset tööriista, 3 transpordi, 33 skoobi)
├── services/               # 178 ülemise taseme teenust (combo, autoCombo, rateLimitManager, jne)
├── translator/             # Formaadi tõlkijad (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformeri
└── utils/                  # 22 utiliidi moodulit (voog, TLS, proksi, logimine)

electron/                   # Electroni töölauarakendus (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 testifaili)
├── integration/            # Integratsioonitestid
├── e2e/                    # Playwright testid
├── security/               # Turvatestid
├── translator/             # Tõlke-spetsiifilised testid
└── load/                   # Koormustestid

docs/
├── adr/                     # Arhitektuuripõhiste otsuste kirjed
├── architecture/            # Süsteemi arhitektuur ja vastupidavus
├── comparison/              # OmniRoute vs alternatiivid
├── compression/             # Pakkimise juhised ja reeglid
├── dev/                     # Arendamise juhised
├── diagrams/                # Arhitektuuridiagrammid
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Kasutajajuhend, Docker, seadistamine, tõrkeotsing
├── i18n/                    # Rahvusvahelised README tõlked
├── marketing/               # Turundusmaterjalid
├── ops/                     # Juurutamine, proksi, katvus, väljalasked
├── providers/               # Pakkuja-spetsiifilised dokumendid
├── reference/               # API viide, keskkonna muutujad, CLI tööriistad, tasuta kihid
├── releases/                # Väljalaskemärkmed
├── routing/                 # Auto-combo mootor, põhjenduse uuesti mängimine
├── screenshots/             # Dashboardi ekraanipildid
├── security/                # Kaitsekaitsed, vastavus, saladus, märgid
└── specs/                   # Disainispetsifikatsioonid
```

## Uue tarnija lisamine

### 1. samm: Registreeri tarnija konstandid

Lisa `src/shared/constants/providers.ts` — Zod-valideeritud moduli laadimisel.

### 2. samm: Lisa käivitaja (kui on vaja kohandatud loogikat)

Loo käivitaja `open-sse/executors/your-provider.ts`, laiendades baaskäivitajat.

### 3. samm: Lisa tõlkija (kui formaat pole OpenAI)

Loo päringu/vastuse tõlkijad `open-sse/translator/` kataloogi.

### 4. samm: Lisa OAuth konfiguratsioon (kui põhineb OAuth-il)

Lisa OAuth volikirjad `src/lib/oauth/constants/oauth.ts` ja teenus `src/lib/oauth/services/` kataloogi.

Kui ülemine tarnija levitab avalikku OAuth kliendi_id/secret või Firebase Web API võtit oma avalikus CLI / brauseri paketis, **ära** pea seda sõna-sõnalt stringina. Kasuta `resolvePublicCred()` funktsiooni `open-sse/utils/publicCreds.ts` failist ja lis maskeeritud baitide kiri `EMBEDDED_DEFAULTS` massiivi. Täielik kohustuslik töövoog on dokumenteeritud [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) dokumendis.

Käitlejate/käivitajate sees peavad kliendini jõudvad veateated läbima `buildErrorBody()` / `sanitizeErrorMessage()` funktsioonid `open-sse/utils/error.ts` failist — ära pane kunagi tooret `err.stack` või `err.message` Response kehasse. Vaata [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) dokumenti.

### 5. samm: Registreeri mudelid

Lisa määratlused `open-sse/config/providerRegistry.ts` failis.

### 6. samm: Lisa testid

Kirjuta üksiktestid `tests/unit/` kataloogi, kattes vähemalt:

- Tarnija registreerimine
- Päringu/vastuse tõlkimine
- Vigade käsitlemine

---

## Pull requesti kontrollnimekiri

- [ ] Testid läbivad (`npm test`)
- [ ] Linting läbib (`npm run lint`)
- [ ] Ehitamine õnnestub (`npm run build`)
- [ ] TypeScripti tüübid lisatud uutele avalikele funktsioonidele ja liidestele
- [ ] Pole peidetud salajasi väärtusi ega fallback väärtusi
- [ ] Avalikud ülemised volikirjad sisestatud `resolvePublicCred()` kaudu (vaata [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), mitte kunagi sõna-sõnalt
- [ ] Vigavastused suunatakse läbi `buildErrorBody()` / `sanitizeErrorMessage()` — vastuste kehades ei ole toored stack trace'id (vaata [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Käsurea käsud (`exec` / `spawn`) edastavad käitusväärtused `env` kaudu, mitte stringi interpoleerimise teel
- [ ] Kõik sisendid valideeritud skeemidega
- [ ] Muudatuste logi **fragment** lisatud `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` alla kasutajate suunatud muudatuste jaoks (vaata [`changelog.d/README.md`](./changelog.d/README.md)) — **ära** muuda `CHANGELOG.md` otse; fragmendid kogutakse väljaandmise ajal ja ei tekki kunagi konflikte
- [ ] Dokumentatsioon uuendatud (kohaldatavatel juhtudel)
- [ ] Uusi CodeQL / Secret-Scanning hoiatusi ei avatud, või iga neist lükati tagasi tehnilise põhjendusega, viidates asjakohasele `docs/security/` dokumendile
- [ ] Marsruudid, mis käivitavad lapseprotsesse (`/api/mcp/`, `/api/cli-tools/runtime/`), on klassifitseeritud `isLocalOnlyPath()` abil `src/server/authz/routeGuard.ts` failis — vaata [Rangedreegel nr 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Kommitedetsioonides pole `Co-Authored-By` trailerid — kommid peavad ilmuma ainult hoidla omaniku Git identiteedi all (Rangedreegel nr 16)

---

## Avaldamine

Avaldusi haldab töövoog `/generate-release`. Kui luuakse uus GitHub Release, avaldatakse pakett **automaatselt npm-i** GitHub Actions'i kaudu.

VPS desployimiseks kasuta käsku `npm run build:release` (mitte `npm run build`) — see teostab puhta
taastöötluse, koondab kimpude kokku kausta `dist/` ja kirjutab lähtefaili `dist/BUILD_SHA`.
Seejärel kasuta töövooge `/deploy-vps-*-cc`, mis kasutavad rsync-i `dist/` edastamiseks kaugserveri kataloogi `app/`.

---

## Abi saamine

- **Arhitektuur**: Vaata [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API viide**: Vaata [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Turvadokumendid**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Toimingute dokumendid**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Probleemid**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arhitektuurilised otsused**: Vaata kausta `docs/adr/` arhitektuuriliste otsuste kirjelduste jaoks
