# Contributing to OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala za zanimanje za sodelovanje! Ta vodnik zajema vse, kar potrebujete za začetek.

Za uradni potek dela za posamezno spremembo začnite z dokumentom
[Zlata pot prispevanja](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ta povezuje spremembe ponudnikov, usmerjanja,
UI/UX, i18n, CLI-ja, podatkovne zbirke ter gradnje/uvajanja z njihovimi pogodbami, ciljno usmerjenimi preizkusi, pokritostjo
CI in koraki usklajevanja.

---

## Nastavitev razvojnega okolja

### Predpogoji

- **Node.js** `>=22.22.3 <23` ali `>=24.0.0 <27` (priporočeno: 24 LTS)
- **npm** 10+

> **Uporabniki npm v11+ (Node 24+):** Po ukazu `npm install` preverite, ali so bili izvorni moduli nameščeni:
> `node -e "require('better-sqlite3')"`. Če ukaz ne uspe z napako `MODULE_NOT_FOUND`,
> zaženite `npm approve-scripts better-sqlite3 && npm install`. Glejte
> [Odpravljanje težav](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloniranje in namestitev

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Okoljske spremenljivke

```bash
# Ustvarite datoteko .env iz predloge
cp .env.example .env

# Ustvarite zahtevane skrivnosti
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne spremenljivke za razvoj:

| Spremenljivka          | Privzeta vrednost za razvoj | Opis                               |
| ---------------------- | --------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                     | Vrata strežnika                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Osnovni URL za uporabniški vmesnik |
| `JWT_SECRET`           | (ustvarite zgoraj)          | Skrivnost za podpisovanje JWT      |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | Geslo za prvo prijavo              |
| `APP_LOG_LEVEL`        | `info`                      | Raven podrobnosti dnevnika         |

### Nastavitve nadzorne plošče

Nadzorna plošča ponuja preklopnike uporabniškega vmesnika za funkcije, ki jih je mogoče nastaviti tudi prek okoljskih spremenljivk:

| Mesto nastavitve      | Preklopnik                  | Opis                                               |
| --------------------- | --------------------------- | -------------------------------------------------- |
| Nastavitve → Napredno | Način za odpravljanje napak | Omogoči dnevnike zahtev za odpravljanje napak (UI) |
| Nastavitve → Splošno  | Vidnost stranske vrstice    | Prikaže/skrije razdelke stranske vrstice           |

Te nastavitve so shranjene v podatkovni zbirki in se ohranijo med ponovnimi zagoni, pri čemer po nastavitvi preglasijo privzete vrednosti okoljskih spremenljivk.

### Lokalni zagon

```bash
# Razvojni način (samodejno ponovno nalaganje)
npm run dev

# Produkcijska gradnja
npm run build    # next build → .build/next/, nato assembleStandalone → dist/
npm run start

# Hitro prevajanje samo zaledja/API-ja za spremembe sodelujočih
npm run build:contributor

# Izdajna gradnja (čista ponovna gradnja + kontrolna oznaka HEAD — zahtevano za uvedbo)
npm run build:release   # rm -rf .build dist, nato gradnja + zapis dist/BUILD_SHA

# Običajna nastavitev vrat
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Gradnja za sodelujoče izvede samo preverjanje prevajanja: ne sestavi samostojne
distribucije in ne zgradi izbirnih sredstev izvornega pakiranja. Običajno produkcijsko gradnjo uporabite, ko
morate preveriti paket, pripravljen za distribucijo.

### Razporeditev izhodnih datotek gradnje

| Imenik    | Vsebina                                                                       | Sledeno |
| --------- | ----------------------------------------------------------------------------- | ------- |
| `src/`    | Izvorna koda aplikacije (TypeScript / TSX)                                    | Da      |
| `.build/` | Vmesne datoteke — izhod `next build` (prezrt v Gitu, `distDir = .build/next`) | Ne      |
| `dist/`   | Paket za distribucijo — sestavi ga `assembleStandalone` (prezrt v Gitu)       | Ne      |

Gradbeni cevovod se izvede v enem prehodu:

```
npm run build
  └─ next build → .build/next/standalone  (izhod Next.js)
  └─ assembleStandalone()                 (kopira standalone + static + public + izvorna sredstva)
       └─ izhod: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` poleg tega najprej počisti oba imenika in zapiše
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kot kontrolno oznako celovitosti uvedbe.

`npm run build:contributor` uporablja profil gradnje samo za zaledje. Med gradnjo začasno nadomesti
datoteke uporabniškega vmesnika nadzorne plošče z nadomestnimi datotekami, ohrani obdelovalnike poti API in po gradnji obnovi izvirne datoteke.
Za spremembe, ki vplivajo na uporabniški vmesnik nadzorne plošče, ali za celovito preverjanje izdaje uporabite `npm run build`;
profil za sodelujoče ni nadomestilo za izdajno gradnjo.

> **Opomba za uvedbo na VPS:** oddaljeni imenik slike `/usr/lib/node_modules/omniroute/app/`
> ostaja nespremenjen. Orodja za uvedbo z rsync sinhronizirajo vsebino imenika `dist/` vanj.
> Spremenila se je le pot izhoda gradnje znotraj repozitorija (`app/` → `dist/`).

Privzeti URL-ji:

- **Nadzorna plošča**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Potek dela z Gitom

> ⚠️ **NIKOLI ne izvajajte commitov neposredno v `main`.** Vedno uporabljajte veje za funkcionalnosti.
>
> **Osnova PR-ja:** za cilj izberite aktivno vejo `release/vX.Y.Z` (ne `main`). Glejte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za model
> ene veje na izdajo in označevanja ob izdaji.

```bash
# Ustvarite vejo iz vrha aktivne veje izdaje (primer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... izvedite spremembe ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Odprite zahtevo za spojitev z osnovo = release/v3.8.49
```

### Poimenovanje vej

| Predpona    | Namen                     |
| ----------- | ------------------------- |
| `feat/`     | Nove funkcionalnosti      |
| `fix/`      | Popravki napak            |
| `refactor/` | Prestrukturiranje kode    |
| `docs/`     | Spremembe dokumentacije   |
| `test/`     | Dodajanje/popravki testov |
| `chore/`    | Orodja, CI, odvisnosti    |

### Sporočila commitov

Upoštevajte [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Obsegi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Izvajanje testov

```bash
# Vsi testi (enotski + vitest + ekosistem + e2e)
npm run test:all

# Posamezna testna datoteka (izvorni izvajalnik testov Node.js — uporablja ga večina testov)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo enotski testi, na katere vpliva vaša sprememba (isti izbirnik TIA kot pri kontrolni točki CI, #8084)
npm run test:scoped            # spremembe v zadnjem commitu (ali delovnem drevesu)
npm run test:scoped:staged     # samo pripravljene spremembe — dobro se ujema z izvajanjem pred commitom
npm run test:scoped:full       # najprej znova zgradi preslikavo grafa uvozov (po dodajanju/premikanju datotek)
# Izhod 1 + »run the full suite« pomeni, da se je spremenila osrednja datoteka (tsconfig, package.json, …) ali
# nepreslikana izvorna koda — izbirnik varno odpove in nikoli ničesar tiho ne preskoči.

# Vitest (strežnik MCP, autoCombo, predpomnilnik)
npm run test:vitest

# Testi E2E (zahtevajo Playwright)
npm run test:e2e

# E2E odjemalcev protokolov (transporti MCP, A2A)
npm run test:protocols:e2e

# Testi združljivosti ekosistema
npm run test:ecosystem

# Kontrolna točka pokritosti: 60 % stavkov/vrstic/funkcij/vej
npm run test:coverage
npm run coverage:report

# Preverjanje lintinga in oblikovanja
npm run lint
npm run check

# Nadzorovani preizkus kombinacije z resničnimi zunanjimi sistemi (zahteva dostop do VPS-a in dobroimetje pri resničnem ponudniku)
# Uporablja RESNIČNE ponudnike — povzroči majhen strošek. NIKOLI se ne izvaja v CI-ju. Brez kontrolnega pogoja se čisto preskoči.
# Potrebuje: dostop ssh root@192.168.0.15 (naloži posnetek podatkovne zbirke samo za branje iz VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Preizkus delovanja 3. faze v živo na VPS-u — navadni skripti Node ESM, ki neposredno uporabljajo strežnik .15 v živo.
# Zahteva: dostop ssh root@192.168.0.15 (kombinacije se ustvarijo/odstranijo prek SSH sqlite).
# Uporablja RESNIČNE ponudnike (majhen strošek). Ustvari/izbriše samo kombinacije __live_test__*. NIKOLI se ne izvaja v CI-ju.
# REQUIRE_API_KEY=false na .15, zato ključ API ni potreben, vendar upošteva COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, če sta nastavljena.
npm run test:combo:live:vps              # 7 scenarijev HTTP (prednostni/krožni/uteženi/stroškovni/fuzijski/samodejni + stanje)
npm run test:combo:live:vps:failover     # doda resnični scenarij preklopa med ponudniki ob napaki (skupaj 8)
```

Opombe o pokritosti:

- `npm run test:coverage` meri pokritost izvorne kode za glavni nabor enotskih testov, izključuje `tests/**` in vključuje `open-sse/**`
- Zahteve za spojitev morajo ohraniti kontrolno točko pokritosti na **60 % ali več** stavkov/vrstic/funkcij/vej
- Če PR spremeni produkcijsko kodo v `src/`, `open-sse/`, `electron/` ali `bin/`, mora v istem PR-ju dodati ali posodobiti avtomatizirane teste
- `npm run coverage:report` izpiše podrobno poročilo po posameznih datotekah iz zadnjega izvajanja pokritosti
- `npm run test:coverage:legacy` ohrani starejšo metriko za zgodovinsko primerjavo
- Glejte `docs/ops/COVERAGE_PLAN.md` za fazni načrt izboljševanja pokritosti

### Zahteve za zahteve za spojitev

Preden odprete PR, uporabite
[zlato pot prispevanja](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), da izvedete osredotočeno zanko za
to, kar ste spremenili. Za celoten nabor enotskih testov (4 segmenti CI), Vitest, kontrolno točko
pokritosti **60 % ali več** in produkcijsko gradnjo je odgovoren CI — lokalno izvajanje ne zagotavlja
dodatnih informacij, ki jih preverjanja PR-ja ne bi že podala, na manjših računalnikih pa lahko preobremeni gostitelja (#8084):

- Zaženite testne datoteke, ki pokrivajo vašo spremembo: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Zaženite `npm run lint`
- Ob vsaki spremembi produkcijske kode vključite ali posodobite avtomatizirane teste v istem PR-ju
- Ko se spremeni produkcijska koda, v opis PR-ja vključite spremenjene ali dodane testne datoteke
- Ko so skrivnosti projekta konfigurirane v CI-ju, preverite rezultat SonarQube v PR-ju

Trenutno stanje testov: **122 datotek enotskih testov**, ki pokrivajo:

- Prevajalnike ponudnikov in pretvorbo formatov
- Omejevanje pogostosti, odklopnik in odpornost
- Semantični predpomnilnik, idempotentnost in spremljanje napredka
- Operacije podatkovne zbirke in shemo (21 modulov DB)
- Tokove OAuth in avtentikacijo
- Preverjanje končnih točk API (Zod v4)
- Orodja strežnika MCP in uveljavljanje obsegov
- Sistema Memory in Skills

---

## Slog kode

- **ESLint** — Pred potrditvijo sprememb zaženite `npm run lint`
- **Prettier** — Samodejno oblikovanje prek `lint-staged` ob potrditvi sprememb (2 presledka, podpičja, dvojni narekovaji, širina 100 znakov, končne vejice es5)
- **TypeScript** — Vsa koda v `src/` uporablja `.ts`/`.tsx`; `open-sse/` uporablja `.ts`/`.js`; dokumentirajte s TSDoc (`@param`, `@returns`, `@throws`)
- **Brez `eval()`** — ESLint uveljavlja `no-eval`, `no-implied-eval`, `no-new-func`
- **Preverjanje z Zod** — Za preverjanje vseh vhodnih podatkov API-ja uporabljajte sheme Zod v4
- **Poimenovanje**: Datoteke = camelCase/kebab-case, komponente = PascalCase, konstante = UPPER_SNAKE

### Obravnava napak / prazni bloki catch

Nikoli ne pustite bloka `catch` brez pojasnila. Razvrstite ga v eno od dveh kategorij (s tem se
udejanja strogo pravilo »nikoli tiho ne prezrite napak v tokovih SSE«):

- **Namerno (naše lastno čiščenje/telemetrija po najboljših močeh)** — napaka je tukaj pričakovana in
  neškodljiva; dodajte enovrstični komentar z utemeljitvijo, brez beleženja (ta dogovor preprečuje
  šum, ki bi ga povzročilo beleženje ob vsaki zahtevi).

  ```ts
  } catch {} // zapiranje že zaprtega krmilnika po prekinitvi povezave odjemalca je pričakovano
  ```

- **Treba je zabeležiti (zunanja koda/koda, ki jo posreduje klicatelj, ali pa prezrtje spremeni potek izvajanja)** — ohranite
  blok catch (nikoli ne dovolite, da prekine tok), vendar izpišite kontekstualno sporočilo z `console.debug`/`warn`, da je
  napako mogoče odkriti.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Za uporabljene primere glejte `open-sse/utils/stream.ts` in `open-sse/utils/streamHandler.ts`.

---

## Struktura projekta

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Strani nadzorne plošče (23 razdelkov)
│   ├── api/                # Poti API-ja (51 imenikov)
│   └── login/              # Strani za preverjanje pristnosti (.tsx)
├── domain/                 # Mehanizem pravilnikov (policyEngine, comboResolver, costRules itd.)
├── lib/                    # Osrednja poslovna logika (.ts)
│   ├── a2a/                # Strežnik protokola Agent-to-Agent v0.3
│   ├── acp/                # Register protokola Agent Communication Protocol
│   ├── compliance/         # Mehanizem pravilnikov skladnosti
│   ├── db/                 # Domenski moduli SQLite + 130 migracij
│   ├── memory/             # Trajni pomnilnik pogovorov
│   ├── oauth/              # Ponudniki, storitve in pripomočki OAuth
│   ├── skills/             # Razširljivo ogrodje veščin
│   ├── usage/              # Spremljanje uporabe in izračun stroškov
│   └── localDb.ts          # Samo plast za ponovni izvoz — sem nikoli ne dodajajte logike
├── middleware/              # Vmesna programska oprema zahtev (promptInjectionGuard)
├── mitm/                   # Posredniški strežnik MITM (potrdilo, DNS, usmerjanje ciljev)
├── shared/
│   ├── components/         # Komponente React (.tsx)
│   ├── constants/          # Definicije ponudnikov (329), obsegi MCP, 19 strategij usmerjanja
│   ├── utils/              # Odklopnik, čistilnik in pripomočki za preverjanje pristnosti
│   └── validation/         # Sheme Zod v4
└── sse/                    # Posredniški cevovod SSE

open-sse/                   # Delovni prostor @omniroute/open-sse
├── executors/              # 89 modulov izvedbene implementacije
├── handlers/               # 11 obdelovalnikov zahtev (klepet, odzivi, vdelave, slike itd.)
├── mcp-server/             # Strežnik MCP (110 edinstvenih orodij, 3 transporti, 33 obsegov)
├── services/               # 178 storitev najvišje ravni (combo, autoCombo, rateLimitManager itd.)
├── translator/             # Prevajalniki formatov (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Pretvornik API-ja Responses
└── utils/                  # 22 pomožnih modulov (tok, TLS, posredniški strežnik, beleženje)

electron/                   # Namizna aplikacija Electron (za več platform)

tests/
├── unit/                   # Izvajalnik testov Node.js (1.574 testnih datotek)
├── integration/            # Integracijski testi
├── e2e/                    # Testi Playwright
├── security/               # Varnostni testi
├── translator/             # Testi, specifični za prevajalnik
└── load/                   # Obremenitveni testi

docs/
├── adr/                     # Zapisi arhitekturnih odločitev
├── architecture/            # Arhitektura sistema in odpornost
├── comparison/              # OmniRoute v primerjavi z alternativami
├── compression/             # Vodniki in pravila za stiskanje
├── dev/                     # Razvojni vodniki
├── diagrams/                # Arhitekturni diagrami
├── frameworks/              # MCP, A2A, OpenCode, pomnilnik, veščine
├── guides/                  # Uporabniški vodnik, Docker, nastavitev, odpravljanje težav
├── i18n/                    # Internacionalizirani prevodi README
├── marketing/               # Trženjska gradiva
├── ops/                     # Uvajanje, posredniški strežnik, pokritost, izdaje
├── providers/               # Dokumentacija, specifična za ponudnike
├── reference/               # Referenca API-ja, okoljske spremenljivke, orodja CLI, brezplačne ravni
├── releases/                # Opombe ob izdajah
├── routing/                 # Mehanizem samodejnih kombinacij, ponovno predvajanje sklepanja
├── screenshots/             # Posnetki zaslona nadzorne plošče
├── security/                # Zaščitni mehanizmi, skladnost, prikritost, žetoni
└── specs/                   # Specifikacije zasnove
```

---

## Dodajanje novega ponudnika

### 1. korak: Registrirajte konstante ponudnika

Dodajte jih v `src/shared/constants/providers.ts` — ob nalaganju modula se preverijo z Zodom.

### 2. korak: Dodajte izvajalnik (če je potrebna logika po meri)

Ustvarite izvajalnik v `open-sse/executors/your-provider.ts`, ki razširja osnovni izvajalnik.

### 3. korak: Dodajte pretvornik (če oblika ni združljiva z OpenAI)

Ustvarite pretvornike zahtev in odgovorov v `open-sse/translator/`.

### 4. korak: Dodajte konfiguracijo OAuth (če temelji na OAuth)

Dodajte poverilnice OAuth v `src/lib/oauth/constants/oauth.ts` in storitev v `src/lib/oauth/services/`.

Če izvorni ponudnik distribuira javni OAuth client_id/secret ali ključ Firebase Web API v svojem javnem CLI-ju oziroma brskalniškem paketu, ga **ne** vdelajte kot nizovni literal. Uporabite `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` in dodajte maskiran bajtni vnos v `EMBEDDED_DEFAULTS`. Celoten obvezni postopek je dokumentiran v [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

V obdelovalnikih/izvajalnikih morajo sporočila o napakah, ki dosežejo odjemalca, iti skozi `buildErrorBody()` / `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — neobdelanega `err.stack` ali `err.message` nikoli ne vključite v telo odgovora. Glejte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5. korak: Registrirajte modele

Dodajte definicije modelov v `open-sse/config/providerRegistry.ts`.

### 6. korak: Dodajte teste

Napišite teste enot v `tests/unit/`, ki zajemajo najmanj:

- Registracijo ponudnika
- Pretvorbo zahtev/odgovorov
- Obravnavo napak

---

## Kontrolni seznam za zahtevo za združitev

- [ ] Testi so uspešni (`npm test`)
- [ ] Preverjanje sloga kode je uspešno (`npm run lint`)
- [ ] Gradnja je uspešna (`npm run build`)
- [ ] Tipi TypeScript so dodani za nove javne funkcije in vmesnike
- [ ] Ni trdo kodiranih skrivnosti ali nadomestnih vrednosti
- [ ] Javne poverilnice izvornega ponudnika so vdelane prek `resolvePublicCred()` (glejte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikoli kot literali
- [ ] Odgovori o napakah potekajo skozi `buildErrorBody()` / `sanitizeErrorMessage()` — v telesih odgovorov ni neobdelanih skladovnih sledi (glejte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Lupinski ukazi (`exec` / `spawn`) posredujejo vrednosti izvajalnega okolja prek `env`, ne prek interpolacije nizov
- [ ] Vsi vnosi so preverjeni s shemami Zod
- [ ] **Fragment** dnevnika sprememb je za spremembe, vidne uporabnikom, dodan v `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (glejte [`changelog.d/README.md`](./changelog.d/README.md)) — datoteke `CHANGELOG.md` **ne** urejajte neposredno; fragmenti se združijo ob izdaji in med zahtevami za združitev nikoli ne povzročajo sporov
- [ ] Dokumentacija je posodobljena (če je ustrezno)
- [ ] Ni novih opozoril CodeQL / Secret-Scanning oziroma je vsako zavrnjeno s tehnično utemeljitvijo, ki se sklicuje na ustrezen dokument v `docs/security/`
- [ ] Poti, ki ustvarjajo podrejene procese (`/api/mcp/`, `/api/cli-tools/runtime/`), so razvrščene kot `isLocalOnlyPath()` v `src/server/authz/routeGuard.ts` — glejte [Strogo pravilo št. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] V sporočilih potrditev ni zaključnih vrstic `Co-Authored-By` — potrditve morajo biti prikazane izključno pod identiteto Git lastnika repozitorija (Strogo pravilo št. 16)

---

## Izdajanje

Izdaje se upravljajo prek poteka dela `/generate-release`. Ko je ustvarjena nova izdaja GitHub Release, je paket prek GitHub Actions **samodejno objavljen v npm**.

Za uvajanje na VPS uporabite `npm run build:release` (ne `npm run build`) — ta ukaz izvede čisto
vnovično gradnjo, sestavi paket v `dist/` in zapiše nadzorno datoteko `dist/BUILD_SHA`.
Nato uporabite veščine `/deploy-vps-*-cc`, ki z rsync sinhronizirajo `dist/` z oddaljenim imenikom `app/`.

---

## Pridobivanje pomoči

- **Arhitektura**: Glejte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenca API-ja**: Glejte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Varnostna dokumentacija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operativna dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Težave**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-ji**: Zapise arhitekturnih odločitev najdete v `docs/adr/`
