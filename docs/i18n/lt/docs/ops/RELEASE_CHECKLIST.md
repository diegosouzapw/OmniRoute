# RELEASE_CHECKLIST (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Leidimo kontrolinis sąrašas"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Leidimo kontrolinis sąrašas

> **Paskutinį kartą atnaujinta:** 2026-08-28 — v3.8.51
> Supaprastintas leidimo procesas, automatizavimui naudojantis Claude Code įgūdžius.
>
> **Tarp leidimų palaikykite eilę / šaką tvarkingą:** žr. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` grupė + `npm run check:release-green` + `/babysit` + naktinis vykdymas). Periodiškai vykdant
> šiuos veiksmus — ypač **prieš** naudojant šį kontrolinį sąrašą — leidimo PR nuo pat pradžių bus tvarkingas.

## Trumpai

```bash
# 1. Atnaujinkite versiją ir sugeneruokite CHANGELOG (įgūdis)
/version-bump-cc patch    # arba minor/major

# 2. Vietoje paleiskite kokybės patikrą
npm run check              # lint patikra ir testai
npm run test:coverage      # visa aprėpties patikra (60/60/60/60)

# 3. Sukurkite komponuotę ir atlikite bazinį patikrinimą
npm run build
npm run test:e2e           # neprivaloma, bet rekomenduojama

# 4. Sugeneruokite leidimą (įgūdis)
/generate-release-cc

# 5. Įdiekite (įgūdis)
/deploy-vps-both-cc        # arba akamai-cc / local-cc

# 6. Užfiksuokite leidimo įrodymus (įgūdis)
/capture-release-evidences-cc
```

## npm patikimas publikavimas (numatytasis nuo v3.8.51) — etapinis pagal užklausą, tiesioginis kaip atsarginis būdas

Pagal numatytąją nuostatą `npm-publish.yml` publikuoja naudodamas **npm Trusted Publishing (OIDC)**:
`stage-npm` užduotis (vykdoma GitHub infrastruktūroje) iškeičia GitHub id-token į trumpalaikius npm
prisijungimo duomenis, skirtus tam vykdymui — saugyklos paslaptyse nėra ilgalaikio npm prieigos rakto, nėra 2FA raginimo, pridedama kilmės informacija.
Tai yra npm leidžiama išimtis, nes prieigos raktai, leidžiantys apeiti 2FA, šiuo metu palaipsniui naikinami;
taip atkuriamas visiškai automatinis procesas, kurį projektas turėjo iki v3.8.48, kartu išlaikant
WS1.3 garantiją (nutekėjęs prieigos raktas vienas pats negali publikuoti — jokio prieigos rakto nėra).

**Vienkartinė sąranka (savininkui):** npmjs.com → paketas `omniroute` → Settings → _Trusted
Publisher_ → GitHub: savininkas `diegosouzapw`, saugykla `OmniRoute`, darbo eiga `npm-publish.yml`
(aplinka: nėra). Kol ši sąranka neatlikta, automatinis veiksmas nepavyks ir bus pateikta klaida `ENEEDAUTH`:
paleiskite jį iš naujo naudodami `publish_mode=staged` (žr. toliau) arba `direct`.

### Etapinis publikavimas (pagal užklausą — `publish_mode=staged`)

npm-publish darbo eiga nebevykdo tiesioginio publikavimo: ji paleidžia supakuotą tar archyvą
(`check:pack-boot`), o tada vykdo `npm stage publish` — tiksliai tie patys baitai rezervuojami
registre, tačiau jų **negalima įdiegti**, kol savininkas nepatvirtina. Žmogaus atliekama 2FA patikra
perkelta PO patvirtinimo įrodymo, o ne prieš jį.

**Savininko veiksmai, kai darbo eiga sėkmingai baigiama:**

1. `npm stage list omniroute` — raskite etapo ID (jis taip pat pateikiamas darbo eigos suvestinėje).
2. Patikrinkite etapinius baitus (rekomenduojama): `npm stage download <id>`, tada įdiekite
   atsisiųstą tar archyvą į laikiną prefiksą ir jį paleiskite (`npm run check:pack-boot` automatizuoja
   tokį patį pakavimo → diegimo → paleidimo patikrinimą CI aplinkoje).
3. `npm stage approve <id>` — 2FA raginimas IR YRA publikavimas. `npm stage reject <id>` atmeta etapą.
4. Apsauga po publikavimo: tikrintuvas po publikavimo (v3.8.49 plano WS1.4) švariame konteineryje
   įdiegia publikuotą versiją iš viešojo registro ir ją paleidžia.

**Avarinis atsarginis būdas:** `workflow_dispatch` su `publish_mode=direct` atkuria
ankstesnį tiesioginį `npm publish` (naudokite tik tada, jei pats etapinis publikavimas veikia netinkamai; užfiksuokite priežastį).

**Vienkartinis saugumo sustiprinimas (savininkui, npmjs.com):** sukonfigūruokite Trusted Publisher,
skirtą `omniroute`, tik etapiniu režimu, kad nutekėjęs ilgalaikis prieigos raktas negalėtų tiesiogiai
vykdyti `npm publish` iš jokios vietos — CI gali tik parengti etapą; leidimą publikuoja tik savininko 2FA.

**Sugadinto artefakto veiksmų planas (nepakitęs):** numatytoji reakcija yra
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (užtrunka kelias minutes, galima atšaukti);
`npm unpublish` naudokite tik per 72 val. laikotarpį, kai nėra priklausomų paketų, ir niekada ne kaip pirmą veiksmą.
Docker atveju niekada neperrašykite versijos žymos — grąžinimas atliekamas nukreipiant `latest` į paskutinę tinkamą maišos reikšmę.

**Docker Hub `latest` (privaloma kiekvieną kartą publikuojant stabilią SemVer versiją):**
`docker-publish` darbo eiga turi pažymėti **ir** `X.Y.Z`, **ir**, kai
`should-promote-latest.sh` patvirtina, kad tai yra aukščiausia stabili SemVer versija, `:latest`
naudojant **tą pačią maišos reikšmę**. Užduočiai pasibaigus, Hub `latest` maišos reikšmė turi sutapti su naujos
SemVer versijos maišos reikšme, o `last_updated` turi būti atnaujinta. Nepalikite `:latest`, nurodančios senesnę
komponuotę, kai leidimo pastabose aprašomos pataisos, esančios tik git. Compose
greitojo paleidimo konfigūracijose naudojama `:latest`; GitOps ir toliau turėtų fiksuoti `X.Y.Z`. Žr.
[Docker leidimo kanalai](../guides/DOCKER_GUIDE.md#release-channels) ir #10317.

## Skubusis kritinių pataisų kelias (žyma `hotfix`)

PR su žyma `hotfix` praleidžia sunkiąją CI matricą (9 segmentų E2E, aprėpties kartelę,
quality-gate, quality-extended) ir išlaiko greitas, didelės signalinės vertės patikras: komponavimą,
vienetinių testų segmentus, integracinius testus, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
ir tar archyvo paleidimo patikrą (`check:pack-boot`). Tikslas: žalia būsena per ≤15 min., o ne per ~33 min.

**Patekimo politika — privalomos visos keturios sąlygos (parengta pagal Chromium/VS Code/Node avarinius kelius):**

1. **Kritiškumas**: produkcinė aplinka neveikia — paskelbtas artefaktas nulūžta paleidžiant /
   saugumo pataisa / paveikti visi leidimo naudotojai. „Svarbu“ nereiškia „neveikia“.
2. **Įgaliojimas**: tik saugyklos savininkas priskiria žymą `hotfix`. Žyma YRA
   patvirtinimas — niekada nepriskirkite jos patys kampanijos PR.
3. **Įrodymai**: PR apraše pateikiama nuoroda į ankstesnį visiškai žalią sunkiosios patikros vykdymą (rinkinį, kurį
   praleistos užduotys patikrintų iš naujo) ir pačios pataisos testą, kuris iš pradžių nepavyko, o vėliau buvo sėkmingas.
4. **Apimtis**: tik cherry-pick — minimali pataisa, be refaktorizavimo ir pašalinių pakeitimų.

Praleista aprėpties / kartelės sritis iš naujo patikrinama per kitą visą vykdymą
leidimo šakoje (nepertraukiamai žalias leidimas) — šis kelias praleidžia LAUKIMĄ, bet niekada ne patikrą.
Pakeitimai, apimantys tik testus (visi failai yra po `tests/`, nė vieno po `tests/e2e/`), automatiškai praleidžia E2E
matricą be jokios žymos.

## Išsamus kontrolinis sąrašas

### Prieš leidimą

- [ ] Visi šiam leidimui skirti PR sujungti į `release/vX.Y.0`
- [ ] Visi atviri šios versijos Linear / problemų elementai uždaryti arba perkelti į kitą etapą
- [ ] CI žalias šakoje `release/vX.Y.0`
- [ ] Kode nėra `TODO(release)` žymeklių: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Bazinis Docker atvaizdas atnaujintas (šiuo metu `node:24.15.0-trixie-slim`)

### Versija ir pakeitimų žurnalas

- [ ] Paleiskite `/version-bump-cc <patch|minor|major>` (Claude Code įgūdis)
  - Padidina versijas failuose `package.json`, `electron/package.json`
  - Iš naujo sugeneruoja `CHANGELOG.md` iš git pakeitimų nuo paskutinės žymos
  - Atnaujina README.md ženklelius
- [ ] Rankiniu būdu peržiūrėkite CHANGELOG.md ir, jei reikia, sutvarkykite pakeitimų pranešimus
- [ ] Užtikrinkite, kad naujausia semver skiltis faile `CHANGELOG.md` atitiktų `package.json` versiją
- [ ] Palikite `## [Unreleased]` kaip pirmąją pakeitimų žurnalo skiltį būsimiems darbams
- [ ] Atnaujinkite `docs/openapi.yaml` → `info.version` turi atitikti `package.json` versiją

### Kodo kokybė

- [ ] `npm run lint` — 0 klaidų (įspėjimai egzistavo anksčiau)
- [ ] `npm run typecheck:core` — be klaidų
- [ ] `npm run typecheck:noimplicit:core` — be klaidų (griežtas režimas)
- [ ] `npm run check:cycles` — nėra ciklinių priklausomybių
- [ ] `npm run check:any-budget:t11` — neviršija biudžeto
- [ ] `npm run check:route-validation:t06` — be klaidų
- [ ] `npm run check:node-runtime` — pasiekta minimali palaikoma vykdymo aplinkos versija (`>=22.22.2 <23`, `>=24.0.0 <27`, pagal `SUPPORTED_NODE_RANGE` faile `src/shared/utils/nodeRuntimeSupport.ts`; suderinta su `package.json` `engines`)

### Testavimas

- [ ] `npm run test:unit` — sėkmingas
- [ ] `npm run test:vitest` — sėkmingas (MCP serveris, autoCombo, podėlis)
- [ ] `npm run test:coverage` — tenkinama 60/60/60/60 kartelė (sakiniai / eilutės / funkcijos / šakos)
- [ ] `npm run test:integration` — sėkmingas (jei pakeitimai liečia DB / apdorojimo funkcijas)
- [ ] `npm run test:combo:matrix` — sėkmingas (kombinavimo strategijų matrica: deterministiškai įrodo visų 19 viešųjų maršruto parinkimo strategijų pasirinkimo sprendimus; paleiskite keisdami kombinavimo maršruto parinkimą, strategijos nustatymą arba atsarginę logiką)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **neprivalomas / rankinis** (prieigos sąlyga apsaugota tikro išorinio šaltinio patikra; gauna tik skaitomą DB momentinę kopiją iš VPS `root@192.168.0.15`; kreipiasi į tikrus teikėjus, naudoja kreditus; niekada nevykdomas CI; tvarkingai praleidžiamas be prieigos sąlygos)
- [ ] `npm run test:combo:live:vps` — **neprivalomas / rankinis** (3 etapo tikro VPS patikra: 7 HTTP scenarijai tikrame `.15` serveryje naudojant gryną Node ESM; reikia `ssh root@192.168.0.15`; sukuria / pašalina tik `__live_test__*` kombinacijas; kreipiasi į tikrus teikėjus; niekada nevykdomas CI)
- [ ] `npm run test:e2e` — sėkmingas (UI pakeitimai)
- [ ] `npm run test:protocols:e2e` — sėkmingas (MCP / A2A pakeitimai)
- [ ] `npm run test:ecosystem` — sėkmingas

### Kabliai (patikrinti Husky)

Husky kabliai yra `.husky/` ir automatiškai vykdomi atliekant git operacijas.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** greitos deterministinės patikros — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktyvinta 2026-06-13). Sąmoningai neįtraukia `test:unit` (lėtas; jį apima CI `test-unit` užduotis).
  - Prieš siųsdami leidimo šakas, rankiniu būdu paleiskite `npm run test:unit`.

Jei kablio vykdymas nepavyksta: ištaisykite pagrindinę problemą, neapeikite naudodami `--no-verify`.

### Sutartiniai pakeitimų pranešimai

Visi leidimui skirti pakeitimai turi atitikti formatą `type(scope): subject`.

**Leistini tipai:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Leistinos sritys:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Nesuderinami pakeitimai: pridėkite `BREAKING CHANGE:` poraštę arba `!` po srities (pvz., `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` sėkmingas (automatiškai vykdomas per pre-commit)
- [ ] `npm run check:docs-all` sėkmingas (bendroji patikra: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` baigiamas su kodu 0 — kodo ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` aplinkos sutartis nepažeista
- [ ] `npm run check:doc-links` baigiamas su kodu 0 — po pertvarkymo nėra neveikiančių vidinių markdown nuorodų
- [ ] `docs/architecture/ARCHITECTURE.md` peržiūrėtas dėl saugyklos / vykdymo aplinkos neatitikimų
- [ ] `docs/guides/TROUBLESHOOTING.md` peržiūrėtas dėl aplinkos kintamųjų ir eksploatacinių neatitikimų
- [ ] Jei pakeistas `.env.example`: atnaujintas `docs/reference/ENVIRONMENT.md`
- [ ] Jei nauja funkcija turi UI: ji paminėta `docs/guides/USER_GUIDE.md`
- [ ] Jei nauja funkcija turi API: atnaujinti `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Jei nauja funkcija yra modulis: yra atskiras `docs/<MODULE>.md`
- [ ] Jei tai nesuderinamas pakeitimas: `docs/guides/TROUBLESHOOTING.md` turi perkėlimo pastabą

### i18n

- [ ] `npm run i18n:check` baigiamas su kodu 0 — vertimų būsena (`.i18n-state.json`) sinchronizuota su pirminiais dokumentais (griežtu režimu nėra pakitusių šaltinių; įspėjimų režimo rekomendacijos priimtinos paskutinės minutės dokumentacijos pataisoms, tačiau prieš žymint leidimą rezultatas turėtų būti 0)
- [ ] `npm run i18n:check-ui-coverage` baigiamas su kodu 0 — kiekvienos UI lokalės aprėptis siekia arba viršija 80 % ribą
- [ ] `npm run i18n:sync-ui:dry` praneša apie 0 trūkstamų raktų visose 42 lokalėse
- [ ] Jei pakeisti pirminiai angliški dokumentai, prieš žymėdami leidimą paleiskite `npm run i18n:run` (reikia `OMNIROUTE_TRANSLATION_API_KEY` faile `.env`)
- [ ] Nedidelius vertimo papildymus galima atidėti kitam leidimui (užregistruokite CHANGELOG)

### Duomenų bazės migracijos

- [ ] Jei `src/lib/db/migrations/` turi naujų failų:
  - [ ] Kiekviena migracija yra idempotentinė (`CREATE TABLE IF NOT EXISTS` ir pan.)
  - [ ] Migracijos apgaubtos transakcijomis
  - [ ] Tinkamai sunumeruotos (sekoje nėra tarpų)
- [ ] Išbandykite naujame diegime: pašalinkite `~/.omniroute/omniroute.db` ir paleiskite `npm run dev`
- [ ] Išbandykite esamame diegime: sukurkite atsarginę DB kopiją, paleiskite migraciją, patikrinkite schemą
- [ ] Jei migracija perrašo lenteles, WAL failai (`-wal`, `-shm`) apdorojami tinkamai

### Teikėjų katalogas (tikrinamas naudojant Zod)

- [ ] `src/shared/constants/providers.ts` Zod schema galioja įkėlimo metu
  - [ ] Visi teikėjai turi privalomus laukus (`id`, `label`, `kind` ir kt.)
  - [ ] Naujiems nemokamiems teikėjams pateiktas `freeNote`
  - [ ] OAuth teikėjų `oauthConfig` užregistruotas faile `src/lib/oauth/constants/oauth.ts`
- [ ] Jei pridėtas naujas teikėjas: atitinkamas vykdytojas yra `open-sse/executors/`
- [ ] Jei formatas ne OpenAI: vertiklis yra `open-sse/translator/`
- [ ] Modeliai užregistruoti faile `open-sse/config/providerRegistry.ts`
- [ ] Vienetiniai testai kataloge `tests/unit/` apima teikėjų klasifikavimą ir maršruto parinkimą

### Darbalaukio programa (Electron)

Jei pakeistas `electron/`:

- [ ] `npm run electron:smoke:packaged` sėkmingas
- [ ] Komponavimo rezultatai išbandyti bent vienai iš `:win`, `:mac`, `:linux`
- [ ] Kodo pasirašymo sertifikatų galiojimas nepasibaigęs (jei pasirašoma)
- [ ] `electron/package.json` versija atitinka šakninio `package.json` versiją
- [ ] Automatinio naujinimo kanalo rodyklė atnaujinta, jei leidžiama į `stable`

### Komponavimo struktūra

Saugykloje naudojami trys atskiri išvesties katalogai — niekada jų nesumaišykite:

| Katalogas | Paskirtis                                                          | Stebimas?       |
| --------- | ------------------------------------------------------------------ | --------------- |
| `src/`    | Programos pirminis kodas (TypeScript / TSX)                        | Taip            |
| `.build/` | Tarpiniai komponavimo failai — `next build` išvestis (`distDir`)   | Ne (gitignored) |
| `dist/`   | Platinamas npm paketas — surenkamas naudojant `assembleStandalone` | Ne (gitignored) |

> **Pastaba operatoriui:** nuotolinio VPS atvaizdo katalogas lieka `/usr/lib/node_modules/omniroute/app/`.
> Pasikeitė tik **saugyklos viduje** esanti komponavimo išvestis (`app/` → `dist/`). Diegimo įgūdžiai per rsync
> perkelia `dist/` turinį į nuotolinį `app/` katalogą — VPS kelių keisti nereikia.

**Vieno komponavimo eiga:**

```
npm run build:release
  └─ rm -rf .build dist          (išvalymas)
  └─ next build → .build/next/   (tarpiniai failai)
  └─ assembleStandalone          (nukopijuoja standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD kontrolinis žymeklis)
```

Diegdami NEPALEISKITE `npm run build`, o tada atskirai `npm run build:cli` — naudokite
`npm run build:release`, kuris viena komanda atlieka švarų perkomponavimą ir sukuria kontrolinį žymeklį.

### Artefakto tikrinimas

- [ ] `npm run build:release` sėkmingas ir `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` be klaidų — nėra `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ar kitų vietinių likučių
- [ ] Po komponavimo yra `dist/server.js`

### Žymėjimas ir leidimas

- [ ] Paleiskite `/generate-release-cc` (Claude Code įgūdis):
  - Sukuria žymą `vX.Y.Z`
  - Išsiunčia žymą ir šaką
  - Atidaro GitHub leidimą su pakeitimų žurnalo turiniu
  - Prideda Electron diegimo programas (jei sukomponuotos)
- [ ] Arba rankiniu būdu:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Diegimas

Diegimo įgūdžiai naudoja lengvąją rsync eigą — be `npm pack`, be `npm i -g`:

- [ ] Naudokite tikslą atitinkantį diegimo įgūdį:
  - `/deploy-vps-local-cc` — vietinis VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — abu
- [ ] Prieš diegdami patvirtinkite, kad `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Komponavimas turi būti vykdomas ten, kur `node_modules` yra tikras (pagrindinėje darbinėje kopijoje arba naudojant `npm ci` paruoštame worktree — NE worktree su simboline nuoroda)
- [ ] Atlikite įdiegtos egzemplioriaus patikrą:
  - Atidarykite `/dashboard/health` → patikrinkite, ar versijos eilutė atitinka leidimą
  - Išsiųskite `/v1/chat/completions` užklausą žinomam teikėjui
  - Patikrinkite, ar `/api/monitoring/health` grąžina `CLOSED` grandinės pertraukiklius
  - Patvirtinkite, kad MCP transportai atsako (`/mcp` HTTP, `/mcp-sse` SSE)

### Po leidimo

- [ ] Paleiskite `/capture-release-evidences-cc` (Claude Code įgūdis)
  - Užfiksuoja naujų funkcijų WebP ekrano kopijas / įrašus
  - Prideda juos prie leidimo pastabų / tinklaraščio įrašo
- [ ] Atnaujinkite GitHub Discussions / Discord, paskelbdami apie leidimą
- [ ] Atidarykite kitos versijos etapą
- [ ] Jei kritiška: prisekite diskusiją arba paskelbkite `news.json`, kad būtų rodoma programėlės reklamjuostėje

### Radar viešo paleidimo vartai

Radar pranešimas sąmoningai įtrauktas su `active: false`. Aktyvinimas yra atskiras
pakeitimas, atliekamas pateikus visų toliau nurodytų punktų įrodymus:

- [ ] Visi vienas ant kito sudėti Radar PR sujungti, o leidimo viršūnės CI yra žalias
- [ ] Įdiekite ir patikrinkite OSS Radar maršrutus, kai `RADAR_ENABLED` pagal numatytąją nuostatą vis dar išjungtas
- [ ] Nurodytame Radar prieglobos serveryje patikrinkite `GET /planos`, `/termos`, `/privacidade` ir `/reembolso`
- [ ] Privačioje paslaugoje užregistruokite operatoriaus tapatybę / kontaktinius duomenis / adresą ir savininko patvirtintą teisinę peržiūrą
- [ ] Išbandykite Stripe Checkout ir pasirašytą webhook tik testavimo režimu
- [ ] Išbandykite vieną šifruoto transakcinio el. laiško pristatymą su patvirtintu siuntėju / domenu
- [ ] Įrodykite atsarginės kopijos atkūrimą ir vieną prižiūrimą, riboto biudžeto tyrimo vykdymą
- [ ] Prieš priimdami aukojimo įrodymus patvirtinkite BRL / PIX peržiūros politiką
- [ ] Viešą Checkout įjunkite tik įvykdę ankstesnes patikras, tada aktyvinkite naują `news.json` ID
- [ ] Patikrinkite, ar pradžios puslapio reklamjuostėje naudojamas lokalizuotas tekstas ir ar naujas ID vėl pasirodo atmetus senesnį ID

## Įterptųjų paslaugų bazinis patikrinimas (v3.8.4+)

Prieš išleisdami bet kurį leidimą, kuriame yra įterptųjų paslaugų pakeitimų, patikrinkite:

### Paleidimas su nauja DB (aptinka migracijų kolizijas — pridėta po v3.8.4 skubaus pataisymo)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — palaukite 10 s, kol sistema bus paleista
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` grąžina `"9router"` (NE 404, NE 500). Tai patvirtina, kad migracija `071_services.sql` pritaikyta ir pradinis įrašas sukurtas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` grąžina 3 eilutes.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` grąžina 2 eilutes (patvirtina, kad `070_webhooks_kind_metadata.sql` pritaikyta).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` įvykdomas sėkmingai — apsaugo nuo būsimų kolizijų.

### 9Router

- [ ] `POST /api/services/9router/install` per mažiau nei 2 min. grąžina 200 su `installedVersion`
- [ ] `POST /api/services/9router/start` per mažiau nei 30 s grąžina 200 ir `state: "running"`
- [ ] `GET /api/services/9router/status` nurodo `health: "healthy"`
- [ ] `POST /v1/chat/completions` su `"model": "9router/auto/..."` grąžina 200 (visapusis maršruto parinkimas per 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` atvaizduoja savąją 9Router naudotojo sąsają tarpiniame serveryje (be tiesioginio `127.0.0.1:port` iframe)
- [ ] `POST /api/services/9router/rotate-key` grąžina `{ keyRotated: true }`, o paslauga švariai paleidžiama iš naujo
- [ ] `POST /api/services/9router/stop` grąžina 200 ir `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` grąžina SSE srautą su `snapshot` įvykiu, kuriame yra naujausios eilutės
- [ ] Diegimas aplinkoje, kurioje PATH neturi `npm`, grąžina 500 su aiškiu klaidos pranešimu (be dėklo išklotinės)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` per mažiau nei 2 min. grąžina 200
- [ ] `POST /api/services/cliproxy/start` per mažiau nei 30 s grąžina 200 ir `state: "running"`
- [ ] `GET /api/services/cliproxy/status` nurodo `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` grąžina 200 ir `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` grąžina SSE srautą

### Saugumo regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` grąžina `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` grąžina `403 LOCAL_ONLY`
- [ ] Klaidų atsakymuose iš `/api/services/*` nėra `err.stack` ar absoliučių failų kelių

## v3.8.0+ patikros

Prieš išleisdami bet kurį v3.8.x leidimą, patikrinkite ir šiuos punktus:

- [ ] `omniroute --tray` paleidžiama macOS sistemoje (systray2 įdiegta į `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` paleidžiama Linux sistemoje (reikalingas DISPLAY; jei nenustatytas, pateikiama aiški klaida)
- [ ] `omniroute --tray` paleidžiama Windows sistemoje (PowerShell NotifyIcon, be papildomų dvejetainių failų)
- [ ] `omniroute config tray enable` sukuria automatinio paleidimo įrašą; išjungimas jį pašalina
- [ ] `npm install -g omniroute@<this-version>` įvykdo podiegiminį veiksmą be lemtingos klaidos
- [ ] Atnaujinimo kelias išsaugo pasirinktines priklausomybes: `omniroute update --apply` ir automatinio atnaujinimo priemonė
      vykdo `npm install -g … --include=optional`, todėl `optionalDependencies` (better-sqlite3,
      keytar, tls-client ir llmlingua SLM rinkinys: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) išlieka po atnaujinimo. Ultra `modelPath` SLM lygiui taip pat reikia
      tinybert modelio, kuris pirmą kartą naudojant automatiškai atsisiunčiamas į `${DATA_DIR}/models/llmlingua`. Podiegiminis veiksmas
      (`scripts/build/colocateOptionals.mjs`) tada sutelkia SLM pasirinktinių priklausomybių uždarinį į
      `dist/node_modules`, kad vykdyklė naudotų VIENĄ `@huggingface/transformers` ^4.2.0
      egzempliorių — autonominė sekimo versija įtraukia tik transformers, o ne dinamiškai importuojamas
      pasirinktines priklausomybes, todėl be šio veiksmo vykdyklė įkeltų llmlingua-2 su šakninio projekto transformers
      ir SLM lygis nepastebimai persijungtų į nesugriežtintą veikimą.
- [ ] `omniroute status` veikia be `.env` (CLI prieigos rakto kelias, tik vietinio ciklo sąsajoje)
- [ ] `curl http://localhost:20128/api/shutdown` grąžina 401 (visada apsaugotas maršrutas)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` grąžina 401 (vietinio ciklo sąsajos apsauga)
- [ ] Pirmą kartą paleidus SQLite vykdymo aplinka parenkama kaip `bundled` (įtrauktas dvejetainis failas tinkamas platformai)
- [ ] Pašalinus `node_modules/better-sqlite3`, SQLite vykdymo aplinka grįžta prie `runtime`
- [ ] Išmanusis MCP filtras suglaudina tikrą `playwright-mcp browser_snapshot` išvestį (sumažina ≥50 %)
- [ ] Visi 10 `skills/omniroute*/SKILL.md` failų yra viešai pasiekiami naudojant tiesioginį GitHub URL
- [ ] Pradinės sąrankos vediklis naujoje sąrankoje rodo lygių apžvalgos veiksmą „Kaip tai veikia“
- [ ] Pradžios suvestinės lygių aprėpties valdiklis rodo sukonfigūruotų ir aktyvių elementų skaičių

---

## Grąžinimas į ankstesnę versiją

Jei leidime yra kritinė problema:

1. `gh release edit vX.Y.Z --prerelease` (pažymi kaip ne naujausią)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (tik jei naudotojai dar nepradėjo jo naudoti)
3. Arba: skubus pataisymas šakoje `release/vX.Y.0` → pataisų leidimas `vX.Y.(Z+1)`
4. Nedelsdami praneškite „GitHub Discussions“ ir „Discord“

## Griežtos taisyklės

- Niekada neįkelkite pakeitimų tiesiogiai į `main`
- Niekada nenaudokite `git push --force` šakai `main` ar `release/*` šakoms
- Niekada nepraleiskite „Husky“ kablių (`--no-verify`)
- Niekada neįtraukite paslapčių, prisijungimo duomenų ar `.env` failų
- Testų aprėptis turi išlikti ≥60/60/60/60 (teiginiai/eilutės/funkcijos/šakos)
- Keisdami darbinį kodą kataloguose `src/`, `open-sse/`, `electron/` ar `bin/`, visada įtraukite arba atnaujinkite testus

## Automatinė sinchronizavimo patikra

Prieš atidarydami PR, vietinėje aplinkoje paleiskite dokumentacijos sinchronizavimo apsaugą:

```bash
npm run check:docs-sync
```

CI taip pat vykdo šią patikrą faile `.github/workflows/ci.yml` („lint“ užduotyje).
