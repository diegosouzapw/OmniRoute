# Contributing to OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Täname huvi eest panustamise vastu! See juhend hõlmab kõike, mida alustamiseks vajate.

Ametliku muudatusepõhise töövoo jaoks alustage
[panustamise põhiteest](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). See seob teenusepakkuja, marsruutimise,
UI/UX-i, i18n-i, CLI, andmebaasi ning koostamise/juurutamise muudatused nende lepingute, suunatud testide, CI
katvuse ja vastavusse viimise sammudega.

---

## Arenduskeskkonna seadistamine

### Eeltingimused

- **Node.js** `>=22.22.2 <23` või `>=24.0.0 <27` (soovitatav: 24 LTS)
- **npm** 10+

> **npm v11+ kasutajad (Node 24+):** Pärast käsku `npm install` kontrollige, kas omamoodulid installiti:
> `node -e "require('better-sqlite3')"`. Kui see ebaõnnestub veaga `MODULE_NOT_FOUND`,
> käivitage `npm approve-scripts better-sqlite3 && npm install`. Vaadake jaotist
> [Tõrkeotsing](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloonimine ja installimine

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Keskkonnamuutujad

```bash
# Looge malli põhjal oma .env
cp .env.example .env

# Genereerige nõutavad saladused
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Peamised arenduskeskkonna muutujad:

| Muutuja                | Arenduskeskkonna vaikeväärtus | Kirjeldus                       |
| ---------------------- | ----------------------------- | ------------------------------- |
| `PORT`                 | `20128`                       | Serveri port                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`      | Kasutajaliidese baas-URL        |
| `JWT_SECRET`           | (genereerige ülal)            | JWT allkirjastamise saladus     |
| `INITIAL_PASSWORD`     | `CHANGEME`                    | Esmakordse sisselogimise parool |
| `APP_LOG_LEVEL`        | `info`                        | Logimise detailsusaste          |

### Juhtpaneeli seaded

Juhtpaneel pakub funktsioonide jaoks kasutajaliidese lüliteid, mida saab seadistada ka keskkonnamuutujate kaudu:

| Seadete asukoht   | Lüliti            | Kirjeldus                                    |
| ----------------- | ----------------- | -------------------------------------------- |
| Seaded → Täpsemad | Silumisrežiim     | Luba päringute silumislogid (kasutajaliides) |
| Seaded → Üldine   | Külgriba nähtavus | Kuva või peida külgriba jaotised             |

Need seaded salvestatakse andmebaasi ja säilivad taaskäivituste vahel, alistades määramise korral keskkonnamuutujate vaikeväärtused.

### Kohalik käivitamine

```bash
# Arendusrežiim (automaatne taaslaadimine)
npm run dev

# Tootmisversiooni koostamine
npm run build    # next build → .build/next/, seejärel assembleStandalone → dist/
npm run start

# Kiire, ainult taustsüsteemi/API kompileerimine kaastöötajate muudatuste jaoks
npm run build:contributor

# Väljalaske koostamine (puhas korduskoostamine + HEAD-valvur — juurutamiseks kohustuslik)
npm run build:release   # rm -rf .build dist && build + kirjutab faili dist/BUILD_SHA

# Levinud pordikonfiguratsioon
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Kaastöötaja koostamine teostab ainult kompileerimise valideerimise: see ei koosta autonoomset
jaotust ega valikulisi omarakenduse pakendamise ressursse. Kasutage tavalist tootmiskoostamist,
kui peate kontrollima väljastatavat paketti.

### Koostamisväljundi paigutus

| Kataloog  | Sisu                                                                                      | Versioonihalduses |
| --------- | ----------------------------------------------------------------------------------------- | ----------------- |
| `src/`    | Rakenduse lähtekood (TypeScript / TSX)                                                    | Jah               |
| `.build/` | Vahefailid — käsu `next build` väljund (gitignore’iga eiratud, `distDir = .build/next`)   | Ei                |
| `dist/`   | Väljastatav pakett — koostatud funktsiooniga `assembleStandalone` (gitignore’iga eiratud) | Ei                |

Koostamiskonveier läbitakse ühe korraga:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-i väljund)
  └─ assembleStandalone()                 (kopeerib autonoomse väljundi + staatilised failid + avalikud failid + omarakenduse ressursid)
       └─ väljund: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` puhastab esmalt mõlemad kataloogid ja kirjutab juurutuse tervikluse
valvurina faili `dist/BUILD_SHA` (= `git rev-parse --short HEAD`).

`npm run build:contributor` kasutab ainult taustsüsteemi koostamisprofiili. See asendab koostamise
ajaks juhtpaneeli kasutajaliidese failid ajutiselt tüvifailidega, säilitab API marsruudikäitlejad
ja taastab pärast koostamist algsed failid. Kasutage käsku `npm run build` muudatuste puhul,
mis mõjutavad juhtpaneeli kasutajaliidest, või väljalaske täielikuks valideerimiseks;
kaastöötaja profiil ei asenda väljalaske koostamist.

> **Märkus VPS-i juurutamise kohta:** kaugserveri tõmmise kataloog `/usr/lib/node_modules/omniroute/app/`
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
├── app/                    # Next.js 16 rakenduse ruuter
│   ├── (dashboard)/        # Töölaua lehed (23 jaotist)
│   ├── api/                # API marsruudid (51 kataloogi)
│   └── login/              # Autentimislehed (.tsx)
├── domain/                 # Reeglimootor (policyEngine, comboResolver, costRules jne)
├── lib/                    # Põhiline äriloogika (.ts)
│   ├── a2a/                # Agentidevahelise v0.3 protokolli server
│   ├── acp/                # Agent Communication Protocol register
│   ├── compliance/         # Vastavusreeglite mootor
│   ├── db/                 # SQLite'i domeenimoodulid + 130 migratsiooni
│   ├── memory/             # Püsiv vestlusmälu
│   ├── oauth/              # OAuthi pakkujad, teenused ja utiliidid
│   ├── skills/             # Laiendatav oskuste raamistik
│   ├── usage/              # Kasutuse jälgimine ja kulude arvutamine
│   └── localDb.ts          # Ainult reeksportimise kiht — ära lisa siia kunagi loogikat
├── middleware/              # Päringute vahevara (promptInjectionGuard)
├── mitm/                   # MITM-puhverserver (sertifikaat, DNS, sihtkohta marsruutimine)
├── shared/
│   ├── components/         # Reacti komponendid (.tsx)
│   ├── constants/          # Pakkujate definitsioonid (329), MCP ulatused, 21 marsruutimisstrateegiat
│   ├── utils/              # Kaitselüliti, puhastaja, autentimise abifunktsioonid
│   └── validation/         # Zod v4 skeemid
└── sse/                    # SSE-puhverserveri konveier

open-sse/                   # @omniroute/open-sse tööruum
├── executors/              # 150 täiturimoodulit (täituriklassid + pakkujapõhised abifunktsioonid)
├── handlers/               # 11 päringutöötlejat (vestlus, vastused, manused, pildid jne)
├── mcp-server/             # MCP-server (110 unikaalset tööriista, 3 transporti, 33 ulatust)
├── services/               # 178 tipptaseme teenust (combo, autoCombo, rateLimitManager jne)
├── translator/             # Vorminguteisendajad (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API teisendaja
└── utils/                  # 22 utiliidimoodulit (voog, TLS, puhverserver, logimine)

electron/                   # Electroni töölauarakendus (platvormideülene)

tests/
├── unit/                   # Node.js-i testikäitaja (1574 testifaili)
├── integration/            # Integratsioonitestid
├── e2e/                    # Playwrighti testid
├── security/               # Turbetestid
├── translator/             # Teisendajapõhised testid
└── load/                   # Koormustestid

docs/
├── adr/                     # Arhitektuuriotsuste kirjed
├── architecture/            # Süsteemi arhitektuur ja vastupidavus
├── comparison/              # OmniRoute võrreldes alternatiividega
├── compression/             # Tihendamisjuhendid ja -reeglid
├── dev/                     # Arendusjuhendid
├── diagrams/                # Arhitektuuriskeemid
├── frameworks/              # MCP, A2A, OpenCode, mälu, oskused
├── guides/                  # Kasutusjuhend, Docker, seadistamine, tõrkeotsing
├── i18n/                    # Lokaliseeritud README tõlked
├── marketing/               # Turundusmaterjalid
├── ops/                     # Juurutus, puhverserver, katvus, väljalasked
├── providers/               # Pakkujapõhine dokumentatsioon
├── reference/               # API teatmik, keskkonnamuutujad, CLI-tööriistad, tasuta paketid
├── releases/                # Väljalaskemärkmed
├── routing/                 # Automaatkombinatsioonide mootor, arutluskäigu taasesitus
├── screenshots/             # Töölaua kuvatõmmised
├── security/                # Kaitsepiirded, vastavus, varjatus, tõendid
└── specs/                   # Disainispetsifikatsioonid
```

---

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

## Tõmbetaotluse kontrollnimekiri

- [ ] Testid läbivad edukalt (`npm test`)
- [ ] Lintimine läbib edukalt (`npm run lint`)
- [ ] Järk õnnestub (`npm run build`)
- [ ] Uutele avalikele funktsioonidele ja liidestele on lisatud TypeScripti tüübid
- [ ] Puuduvad kõvakodeeritud saladused või varuväärtused
- [ ] Avalikud ülesvoolu pääsutunnused on manustatud `resolvePublicCred()` kaudu (vt [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), mitte kunagi literaalidena
- [ ] Veavastused läbivad `buildErrorBody()` / `sanitizeErrorMessage()` — vastuste kehades pole töötlemata pinujälgi (vt [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Kestakäsud (`exec` / `spawn`) edastavad käitusaegsed väärtused `env` kaudu, mitte stringinterpolatsiooni abil
- [ ] Kõik sisendid on valideeritud Zodi skeemidega
- [ ] Kasutajale nähtavate muudatuste jaoks on lisatud muudatuste logi **fragment** asukohta `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (vt [`changelog.d/README.md`](./changelog.d/README.md)) — ärge muutke faili `CHANGELOG.md` otse; fragmendid koondatakse väljalaske ajal ega lähe tõmbetaotluste vahel kunagi konflikti
- [ ] Dokumentatsioon on värskendatud (kui kohaldatav)
- [ ] Uusi CodeQL-i / saladuste skannimise hoiatusi pole avatud või iga hoiatus on tagasi lükatud tehnilise põhjendusega, mis viitab asjakohasele dokumendile kataloogis `docs/security/`
- [ ] Alamprotsesse käivitavad marsruudid (`/api/mcp/`, `/api/cli-tools/runtime/`) on failis `src/server/authz/routeGuard.ts` liigitatud funktsiooniga `isLocalOnlyPath()` — vt [ranget reeglit nr 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Sissekannete sõnumites pole tehisintellekti/roboti `Co-authored-by` järelridu (range reegel nr 16) — inimkaastöötajaid, kelle tööd taaskasutatakse, tunnustatakse standardsete `Co-authored-by: Name <email>` järelridadega

---

## Avaldamine

Avaldusi haldab töövoog `/generate-release`. Kui luuakse uus GitHub Release, avaldatakse pakett **automaatselt npm-i** GitHub Actions'i kaudu.

VPS desployimiseks kasuta käsku `npm run build:release` (mitte `npm run build`) — see teostab puhta
taastöötluse, koondab kimpude kokku kausta `dist/` ja kirjutab lähtefaili `dist/BUILD_SHA`.
Seejärel kasuta töövooge `/deploy-vps-*-cc`, mis kasutavad rsync-i `dist/` edastamiseks kaugserveri kataloogi `app/`.

---

## Abi saamine

- **Arhitektuur**: Vaadake faili [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API viitedokumentatsioon**: Vaadake faili [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Turbedokumentatsioon**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Käitlusdokumentatsioon**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Probleemid**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
