# RELEASE_CHECKLIST (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Izlaiduma saraksts"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Izlaiduma saraksts

> **Pēdējoreiz atjaunināts:** 2026-08-28 — v3.8.51
> Vienkāršota izlaiduma plūsma, kas izmanto Claude Code prasmes automatizācijai.
>
> **Saglabājiet rindu/pavedienu zaļu starp izlaidumiem:** skatiet [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` saime + `npm run check:release-green` + `/babysit` + nakts būves). Periodiski izpildot
> šo — un jo īpaši **pirms** šī saraksta — izlaiduma PR sākas zaļš.

## TL;DR

```bash
# 1. Paaugstina versiju + ģenerē CHANGELOG (prasme)
/version-bump-cc patch    # vai minor/major

# 2. Lokāli palaiž kvalitātes vārtu
npm run check              # lint + testi
npm run test:coverage      # pilna pārklājuma vārte (60/60/60/60)

# 3. Būvē un dūmu testē
npm run build
npm run test:e2e           # opcionali, bet ieteicams

# 4. Ģenerē izlaidumu (prasme)
/generate-release-cc

# 5. Izvieto (prasme)
/deploy-vps-both-cc        # vai akamai-cc / local-cc

# 6. Fiksē izlaiduma pierādījumus (prasme)
/capture-release-evidences-cc
```

## npm Uzticamā publicēšana (noklusējums kopš v3.8.51) — pēc pieprasījuma pakāpeniska, kā rezerves variants tieša

`npm-publish.yml` pēc noklusējuma publicē caur **npm Uzticamo publicēšanu (OIDC)**: darba
`stage-npm` (github-hosted) apmaina GitHub's id-token pret īslaicīgu npm
akreditāciju šai darbībai — nav ilgtermiņa npm tokena repozitorija noslēpumos, nav 2FA pieprasījuma, pievienota izcelsme.
Tas ir apiet npm sankcijas tagad, kad tokeni, kas izlaiž 2FA, tiek atcelti;
atjauno pilnībā automātisko plūsmu, kāda projektam bija līdz v3.8.48, vienlaikus saglabājot
WS1.3 garantiju (noplūdis tokens nevar publicēt viens — tāda nav).

**Vienreizēja iestatīšana (īpašnieks):** npmjs.com → pakete `omniroute` → Settings → _Trusted
Publisher_ → GitHub: īpašnieks `diegosouzapw`, repo `OmniRoute`, darbplūsma `npm-publish.yml`
(vides: nav). Kamēr tas nepastāv, automātiskais solis neizdodas ar `ENEEDAUTH`:
atkārtoti izsūta ar `publish_mode=staged` (tālāk) vai `direct`.

### Pakāpeniska publicēšana (pēc pieprasījuma — `publish_mode=staged`)

npm-publish darbplūsma vairs nepublicē tieši: tā ielādē saspiestu tarball
(`check:pack-boot`) un pēc tam palaiž `npm stage publish` — tieši baiti tiek novietoti reģistrā,
**nav instalējami** līdz īpašnieks apstiprina. Cilvēka 2FA vārti pārcēlās UZ PĒC pierādījuma, ne pirms tā.

**Īpašnieka plūsma pēc tam, kad darbplūsma kļūst zaļa:**

1. `npm stage list omniroute` — atrodiet pakāpes id (arī izdrukāts darbplūsmas kopsavilkumā).
2. Pārbaudiet pakāpeniskos baitus (ieteicams): `npm stage download <id>`, tad instalējiet
   lejupielādēto tarball pagaidu prefiksā un ielādiet to (`npm run check:pack-boot` automatizē
   to pašu pack→install→boot spriedumu CI).
3. `npm stage approve <id>` — 2FA pieprasījums IR publicēšana. `npm stage reject <id>` atmet.
4. Pēc publicēšanas tīkls: pēc publicēšanas verifikators (v3.8.49 plāna WS1.4) instalē
   publicēto versiju no publiskā reģistra tīrā konteinerā un to ielādē.

**Ārkārtas rezerves variants:** `workflow_dispatch` ar `publish_mode=direct` atjauno
mantoto tūlītējo `npm publish` (lietojiet tikai, ja pati pakāpeniskā publicēšana nedarbojas; ierakstiet kāpēc).

**Vienreizēja nostiprināšana (īpašnieks, npmjs.com):** konfigurējiet Uzticamo publicētāju
`omniroute` tikai pakāpeniskajā režīmā, lai noplūdis ilgtermiņa tokens nevarētu `npm publish`
tieši no jebkurienes — CI var tikai pakāpeniski; tikai īpašnieka 2FA izlaiž.

**Bojāta artefakta rokasgrāmata (nemainīta):** `npm deprecate omniroute@<bad> "<iemesls> — lietojiet <labots>"`
kā noklusējuma refleksu (minūtēs, atgriezenisks); `npm unpublish` tikai 72h/atkarību
loga ietvaros un nekad kā pirmo soli. Docker: nekad nepārrakstiet versijas tagu — atgriešana ir
`latest` pārvēršana uz pēdējo labo sastāvu.

**Docker Hub `latest` (obligāts katrā stabilā SemVer publicēšanā):** darbplūsma
`docker-publish` jāatgādina **gan** `X.Y.Z`, gan, kad
`should-promote-latest.sh` piekrīt, ka šis ir augstākais stabilais SemVer, `:latest`
ar **to pašu sastāvu**. Pēc darbības: Hub `latest` sastāvs ir vienāds ar jauno
SemVer sastāvu un `last_updated` pārvietojies. Neatstājiet `:latest` uz vecākas
būves, kamēr izlaiduma piezīmes runā par labojumiem, kas pastāv tikai gitā. Compose
īsinājuma ceļveidi izmanto `:latest`; GitOps saglabāt fiksēšanu `X.Y.Z`. Skatīt
[Docker izlaiduma kanālus](../guides/DOCKER_GUIDE.md#release-channels) un #10317.

## Ātrā labojuma ātrā josla (etikete `hotfix`)

Ar etiketi `hotfix` apzīmēts PR izlaiž smago CI matricu (9 daļu E2E, seguma ratchet,
kvalitātes vārti, kvalitātes paplašinājumi) un saglabā ātros, augstas precizitātes vārtus: būvējumu,
vienību daļas, integrācijas, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
un tarball boot-smoke (`check:pack-boot`). Mērķis: zaļš ≤15minūtēs, nevis ~33minūtes.

**Ieejas politika — visi četri obligāti (modelēts pēc Chromium/VS Code/Node ārkārtas joslām):**

1. **Smagums**: ražošana ir salauzta — publicēts artifacts crasho pie palaišanas / drošības labojums / katrs šīs versijas lietotājs ir ietekmēts. "Svarīgs" nav tas pats, kas "salauzts".
2. **Pilnvara**: tikai repozitorija īpašnieks piemēro `hotfix` etiketi. Etikete IR apstiprinājums — nekad neatliekiet kampaņas PR pašapkalpošanos.
3. **Pierādījums**: PR aprakstā ir saite uz iepriekšējo pilnībā zaļo smago izpildi (suīte, ko izlaistie darbi atkārtoti pārbaudītu) plus paša labojuma neizdošanās-uz-veiksmi testi.
4. **Apjoms**: tikai cherry-pick — minimāls labojums, nekādas refaktorijas, nekādas papildu izmaiņas.

Izlaistais seguma/ratchet laukums tiek pārbaudīts ar nākamo pilno izpildi izlaiduma zarā
(nepārtraukts release-green) — josla izlaiž GADĪŠANU, nekad ne pārbaudi.
Testu-atšķirības (visi faili zem `tests/`, neviens zem `tests/e2e/`) automātiski izlaiž E2E
matricu, bez jebkādas etiketes.

## Detalizēta kontrolsaraksta

### Pirms izlaiduma

- [ ] Visi uz šo izlaidumu mērķtieši PR ir iestrēdzuši `release/vX.Y.0`
- [ ] Visi atvērtie Linear/issues ieraksti šai versijai ir slēgti vai pārvietoti uz nākamo milestones
- [ ] CI zaļš uz `release/vX.Y.0` zara
- [ ] Nav `TODO(release)` marķieru kodā: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker bāzes attēls atjaunināts (pašlaik `node:24.15.0-trixie-slim`)

### Versija un izmaiņu žurnāls

- [ ] Palaist `/version-bump-cc <patch|minor|major>` (Claude Code prasme)
  - Palielina `package.json`, `electron/package.json`
  - ģenerē `CHANGELOG.md` no git komitiem kopš pēdējās etiķetes
  - Atjaunina README.md badge
- [ ] Manuāli pārskatīt CHANGELOG.md un iztīrīt komitus, ja nepieciešams
- [ ] Nodrošināt, ka jaunākā semver sadaļa `CHANGELOG.md` atbilst `packagejson` versijai
- [ ] Paturēt `## [Unreleased]` kā pirmo izmaiņu žurnāla sadaļu gaidāmajiem darbiem
- [ ] Atjaunināt `docs/openapi.yaml` → `info.version` jābūt vienādam ar `package.json` versiju

### Koda kvalitāte

- [ ] `npm run lint` — 0 kļūdas (brīdinājumi jau pastāv)
- [ ] `npm run typecheck:core` — tīrs
- [ ] `npm run typecheck:noimplicit:core` — tīrs (strikti)
- [ ] `npm run check:cycles` — nav ciklisko atkarību
- [ ] `npm run check:any-budget:t11` — budžetā
- [ ] `npm run check:route-validation:t06` — tīrs
- [ ] `npm run check:node-runtime` — atbalstītais runtimes grīda sasniegta (`>=22.22.2 <23`, `>=24.0.0 <27`, pēc `SUPPORTED_NODE_RANGE` `src/shared/utils/nodeRuntimeSupport.ts`; saskaņots ar `package.json` `engines`)

### Testēšana

- [ ] `npm run test:unit` — iziets
- [ ] `npm run test:vitest` — iziets (MCP serveris, autoCombo, kešatmiņa)
- [ ] `npm run test:coverage` — vārti 60/60/60/60 apmierināti (paziņojumi/līnijas/funkcijas/zarojumi)
- [ ] `npm run test:integration` — iziets (ja izmaiņas skar DB/handlerus)
- [ ] `npm run test:combo:matrix` — iziets (combo stratēģijas matrica: pierāda visas 19 publiskās maršrutēšanas stratēģiju izvēles lēmumus deterministiski; jāpalaiž, pieskaroties combo maršrutēšanai, stratēģijas atrisināšanai vai atkāpšanās loģikai)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **pēc izvēles/manuāli** (vārtoti reālās-ūdens piegādes smēķi; piegādā tikai-lasīt DB momentuzņēmumu no VPS `root@192.168.0.15`; piekļūst reāliem piegādātājiem, izmanto kredītus; nekad nepalaižas CI; izlaiž tīri bez vārtiem)
- [ ] `npm run test:combo:live:vps` — **pēc izvēles/manuāli** (3. fāzes VPS reālā smēķi: 7 HTTP scenāriji pret reālo `.15` serveri caur parasto Node ESM; prasa `ssh root@192.168.0.15`; izveido/dzēš tikai `__live_test__*` combos; piekļūst reāliem piegādātājiem; nekad nepalaižas CI)
- [ ] `npm run test:e2e` — iziets (UI izmaiņas)
- [ ] `npm run test:protocols:e2e` — iziets (MCP/A2A izmaiņas)
- [ ] `npm run test:ecosystem` — iziets

### Āķi (Husky validēti)

Husky āķi atrodas `.husky/` un automātiski palaižas git operāciju laikā.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** ātri deterministiski vārti — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivizēts 2026-06-13). Apzināti izslēdz `test:unit` (lēns; sedzts ar CI `test-unit` darbu).
  - Pirms izlaiduma zaru padošanas manuāli palaist `npm run test:unit`.

Ja āķis neizdodas: labojiet pamatproblēmu, neapietiet ar `--no-verify`.

### Pārveidotie komiti

Visiem uz izlaidumu saistītiem komitiem jāievēro `type(scope): subject` formāts.

**Derīgi tipi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Derīgi mērogi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Lauztas izmaiņas: pievienojiet `BREAKING CHANGE:` kājeredi vai `!` pēc mēroga (piemēram, `feat(api)!: drop /v0`).

### Dokumentācija

- [ ] `npm run check:docs-sync` iziets (automātiski palaists ar pre-commit)
- [ ] `npm run check:docs-all` iziets (lietuvā: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` iziet 0 — kodā ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` env līgums ir neskarts
- [ ] `npm run check:doc-links` iziet 0 — nav salauztu iekšējo markdown atsaucju pēc restruktorizācijas
- [ ] `docs/architecture/ARCHITECTURE.md` pārskatīts attiecībā uz glabāšanas/runtime novirzi
- [ ] `docs/guides/TROUBLESHOOTING.md` pārskatīts attiecībā uz vides mainīgajiem un ekspluatācijas novirzi
- [ ] Ja `.env.example` mainīts: `docs/reference/ENVIRONMENT.md` atjaunināts
- [ ] Ja jaunai funkcijai ir UI: `docs/guides/USER_GUIDE.md` to piemin
- [ ] Ja jaunai funkcijai ir API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` atjaunināts
- [ ] Ja jauna funkcija ir modulis: eksistē veltīts `docs/<MODULE>.md`
- [ ] Ja lauztas izmaiņas: `docs/guides/TROUBLESHOOTING.md` ir migrācijas piezīme

### i18n

- [ ] `npm run i18n:check` iziet 0 — tulkojuma stāvoklis (`.i18n-state.json`) sinhronizēts ar avota dokumentiem (strikta režīmā nav novirzījušos avotu; brīdinājuma režīma konsultatīvā piezīme ir pieņemama pēdējā brīža dokumenta pielāgojumiem, bet pirms tagošanas tai jābūt 0)
- [ ] `npm run i18n:check-ui-coverage` iziet 0 — katra UI locale ir vai nu 80% seguma grīdā, vai virs tās
- [ ] `npm run i18n:sync-ui:dry` ziņo 0 trūkstošus atslēgas visās 42 locales
- [ ] Ja avota angļu dokumenti mainīti, pirms tagošanas palaist `npm run i18n:run` (prasa `OMNIROUTE_TRANSLATION_API_KEY` `.env`)
- [ ] Tulkojumu ieguldījumus var atlikt uz nākamo izlaidumu, ja tie ir niecīgi (izsekot CHANGELOG)

### DB migrācijas

- [ ] Ja `src/lib/db/migrations/` ir jauni faili:
  - [ ] Katra migrācija ir idempotenta (`CREATE TABLE IF NOT EXISTS` utt.)
  - [ ] Migrācijas ietītas transakcijās
  - [ ] Pareizi numurētas (nav caurumu secībā)
- [ ] Testēt uz jaunas instalācijas: izdzēst `~/.omniroute/omniroute.db` un palaist `npm run dev`
- [ ] Testēt uz esošas instalācijas: rezerves kopēt DB, palaist migrāciju, pārbaudīt shēmu
- [ ] WAL failus (`-wal`, `-shm`) apstrādāt pareizi, ja migrācija pārraksta tabulas

### Piegādātāju katalogs (Zod validēts)

- [ ] `src/shared/constants/providers.ts` Zod shēma derīga ielādes laikā
  - [ ] Visiem piegādātājiem ir obligātie lauki (`id`, `label`, `kind` utt.)
  - [ ] `freeNote` sniegts jauniem bezmaksas piegādātājiem
  - [ ] OAuth piegādātājiem ir `oauthConfig` reģistrēts `src/lib/oauth/constants/oauth.ts`
- [ ] Ja pievienots jauns piegādātājs: atbilstošais izpildītājs `open-sse/executors/`
- [ ] Ja ne-OpenAI formāts: tulks `open-sse/translator/`
- [ ] Modeļi reģistrēti `open-sse/config/providerRegistry.ts`
- [ ] Vienību testi `tests/unit/` sedz piegādātāju klasifikāciju un maršrutēšanu

### Darbvirsmas (Electron)

Ja `electron/` mainīts:

- [ ] `npm run electron:smoke:packaged` iziets
- [ ] Būvējumi testēti vismaz vienam no `:win`, `:mac`, `:linux`
- [ ] Paraksta sertifikāti nav beigušies (ja parakstās)
- [ ] `electron/package.json` versija atbilst saknes `package.json`
- [ ] Auto-atjaunināšanas kanāla rādītājs atjaunināts, ja izdod `stable`

### Būvējuma izkārtojums

Repozitorijam ir trīs atšķirīgi izvades direktoriji — nekad tos nesajauciet:

| Direktorija | Mērķis                                                | Izmeklēts?     |
| ----------- | ----------------------------------------------------- | -------------- |
| `src/`      | Lietojumprogrammas avots (TypeScript / TSX)           | Jā             |
| `.build/`   | Būvējuma starpnieki — `next build` izvade (`distDir`) | Nē (gitignore) |
| `dist/`     | Sūtāms npm saišķis — salikts ar `assembleStandalone`  | Nē (gitignore) |

> **Operators piezīme:** attālā VPS attēla direktorijs paliek `/usr/lib/node_modules/omniroute/app/`.
> Tikai **repozitorijā** esošā būvējuma izvade ir pārvietota (`app/` → `dist/`). Izpildīšanas prasmes rsync
> `dist/` saturu uz attālo `app/` direktoriju — nav nepieciešami VPS ceļu maiņas.

**Viena būvējuma plūsma:**

````
npm run build:release
  └─ rm -rf .build dist          (attīrīt)
  └─ next build → .build/next/   (starpnieki)
  └─ assembleStandalone          (kopē standalone + static + public + natives → dist/)
  └─ raksta dist/BUILD_SHA       (HEAD sūtnis)
}

NEpalaist `npm run build` sekojot atsevišķam `npm run build:cli` izpildei — izmantojiet
`npm run build:release`, kas veic tīru pārbūvējumu + sūtni vienā komandā.

### Artifacts validācija

- [ ] `npm run build:release` izdodas un `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` tīrs — nav `app.__qa_backup`, `scripts/scratch`, `package-lock.json` vai citu vietējo atlieku
- [ ] `dist/server.js` eksistē pēc būvējuma

### Tagošana un izlaidums

- [ ] Palaist `/generate-release-cc` (Claude Code prasme):
  - Izveido etiķeti `vX.Y.Z`
  - Nospiež etiķeti un zaru
  - Atver GitHub Release ar izmaiņu žurnāla saturu
  - Pievieno Electron instalētājus (ja būvēts)
- [ ] Vai manuāli:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
````

### Izvietošana

Izpildīšanas prasmes izmanto vieglo rsync plūsmu — bez `npm pack`, bez `npm i -g`:

- [ ] Izmantojiet izpildīšanas prasmi, kas atbilst mērķim:
  - `/deploy-vps-local-cc` — vietējais VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — abi
- [ ] Pirms izvietošanas apstipriniet `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Būvējums jāpalaiž tur, kur `node_modules` ir reāls (galvenais checkout vai `npm ci` worktree — NAV saiņots worktree)
- [ ] Smēķēt izvietoto instanci:
  - Atvērt `/dashboard/health` → pārbaudīt, ka versijas rinda atbilst izlaidumam
  - Palaist `/v1/chat/completions` pieprasījumu pret zināmu piegādātāju
  - Pārbaudīt, ka `/api/monitoring/health` atgriež `CLOSED` slēgtos pārtraucējus
  - Apstiprināt, ka MCP transporti atbild (`/mcp` HTTP, `/mcp-sse` SSE)

### Pēc izlaiduma

- [ ] Palaist `/capture-release-evidences-cc` (Claude Code prasme)
  - Uzņem WebP ekrānuzņēmumus/ierakstus jaunām funkcijām
  - Pievieno pie izlaiduma piezīmēm / bloga ziņas
- [ ] Atjaunināt GitHub Discussions / Discord ar izlaiduma paziņojumu
- [ ] Atvērt milestone nākamajai versijai
- [ ] Ja kritiski: piespraust diskusiju vai ievietot `news.json` lietotnes banerim

### Radar publiskā palaišanas vārti

Radar paziņojums apzināti ir iestrēdzis ar `active: false`. Aktivizēšana ir atsevišķa
izmaiņa pēc tam, kad katrs zemāk esošais vienums ir pierādīts:

- [ ] Visi sakrautie Radar PR ir iestrēdzuši un izlaiduma galda CI ir zaļš
- [ ] Izvietot un smēķēt OSS Radar maršrutus ar `RADAR_ENABLED` joprojām noklusējuma izslēgtu
- [ ] Smēķēt `GET /planos`, `/termos`, `/privacidade` un `/reembolso` nosauktajā Radar hostā
- [ ] Reģistrēt operatora identitāti/kontakta/adresi un īpašnieka apstiprinātu tiesisku pārskatu privātajā pakalpojumā
- [ ] Pārbaudīt Stripe Checkout un parakstīto webhook testa režīmā
- [ ] Pārbaudīt vienu šifrētu transakcionālo e-pasta piegādi ar apstiprinātu sūtītāju/domēnu
- [ ] Pierādīt rezerves kopas atjaunošanu un vienu uzraudzītu, budžetā ierobežotu pētījuma izpildi
- [ ] Apstiprināt BRL/PIX pārskatīšanas politiku pirms ziedojumu pierādījumu pieņemšanas
- [ ] Atļaut publisko Checkout tikai pēc iepriekšējiem vārtiem, tad aktivizēt jauno `news.json` ID
- [ ] Pārbaudīt, ka Home baneris izmanto lokalizētu kopiju un jauns ID parādās pēc vecāka ID noraidīšanas

## Iegulto pakalpojumu dūmu tests (v3.8.4+)

Pirms jebkura laišanas, kas ietver iegulto pakalpojumu izmaiņas, pārbaudiet:

### Tīras datubāzes sāknēšana (atklāj migrāciju konfliktus — pievienots pēc v3.8.4 karstā labojuma)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — gaidiet 10 s, lai notiktu sāknēšana
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` atgriež `"9router"` (NAV 404, NAV 500). Apstiprina, ka migrācija `071_services.sql` ir piemērota + ieraksts ir ievadīts.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` atgriež 3 rindas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` atgriež 2 rindas (apstiprina, ka `070_webhooks_kind_metadata.sql` ir piemērots).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` iziet — aizsargā pret turpmākiem konfliktiem.

### 9Router

- [ ] `POST /api/services/9router/install` atgriež 200 ar `installedVersion` mazāk nekā 2 minūtēs
- [ ] `POST /api/services/9router/start` atgriež 200 un `state: "running"` mazāk nekā 30 sekundēs
- [ ] `GET /api/services/9router/status` ziņo par `health: "healthy"`
- [ ] `POST /v1/chat/completions` ar `"model": "9router/auto/..."` atgriež 200 (end-to-end maršrutēšana caur 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderē 9Router natively UI starpniekprogrammā (nav tiešas `127.0.0.1:port` iframe)
- [ ] `POST /api/services/9router/rotate-key` atgriež `{ keyRotated: true }` un pakalpojums restartējas korekti
- [ ] `POST /api/services/9router/stop` atgriež 200 un `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` atgriež SSE straumi ar `snapshot` notikumu, kas satur nesenās rindas
- [ ] Uzstādīšana vidē bez `npm` PATH atgriež 500 ar draudzīgu (bez kaudzes pēdas) kļūdas ziņojumu

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` atgriež 200 mazāk nekā 2 minūtēs
- [ ] `POST /api/services/cliproxy/start` atgriež 200 un `state: "running"` mazāk nekā 30 sekundēs
- [ ] `GET /api/services/cliproxy/status` ziņo par `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` atgriež 200 un `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` atgriež SSE straumi

### Drošības regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` atgriež `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` atgriež `403 LOCAL_ONLY`
- [ ] Kļūdu atbildes no `/api/services/*` nesatur `err.stack` vai absolūtos failu ceļus

## v3.8.0+ pārbaudes

Pirms jebkuras v3.8.x laišanas, pārbaudiet šos papildu vienumus:

- [ ] `omniroute --tray` sāknējas macOS (systray2 instalēts `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` sāknējas Linux (nepieciešams DISPLAY; elegantu kļūdu, ja nav iestatīts)
- [ ] `omniroute --tray` sāknējas Windows (PowerShell NotifyIcon, nav papildu bināro failu)
- [ ] `omniroute config tray enable` izveido automātiskās startēšanas ierakstu; disable to noņem
- [ ] `npm install -g omniroute@<this-version>` izpilda postinstall bez fatālas izejas
- [ ] Atjaunināšanas ceļš saglabā izvēles atkarības: `omniroute update --apply` un automātiskais atjauninātājs
      izpilda `npm install -g … --include=optional`, lai `optionalDependencies` (better-sqlite3,
      keytar, tls-client un llmlingua SLM kaudze: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) izdzīvo atjaunināšanu. Ultra `modelPath` SLM līmenim nepieciešams arī
      tinybert modelis, automātiski lejupielādēts uz `${DATA_DIR}/models/llmlingua` pirmajā lietošanas reizē. Postinstall
      (`scripts/build/colocateOptionals.mjs`) pēc tam līdzvieto SLM izvēles noslēgumu
      `dist/node_modules`, lai darbinieks izšķirtu VIENU `@huggingface/transformers` ^4.2.0
      instanci — patstāvīgais trace bundle satur tikai transformers, nevis dinamiski importētās
      izvēles, tāpēc bez tā darbinieks ielādētu llmlingua-2 pret saknes transformers
      un SLM līmenis klusi kļūtu par atvērtu.
- [ ] `omniroute status` strādā bez `.env` (CLI token ceļš, tikai atpakaļsaite)
- [ ] `curl http://localhost:20128/api/shutdown` atgriež 401 (vienmēr aizsargāts maršruts)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` atgriež 401 (atpakaļsaistes aizsargs)
- [ ] SQLite runtime pirmajā palaišanas reizē nosaka `bundled` (bundled binārais derīgs platformai)
- [ ] SQLite runtime atgriežas uz `runtime`, kad `node_modules/better-sqlite3` ir dzēsts
- [ ] Viedais MCP filtrs saspiež reālo `playwright-mcp browser_snapshot` izvadi (≥50% samazinājums)
- [ ] Visi 10 `skills/omniroute*/SKILL.md` faili ir publiski pieejami caur raw GitHub URL
- [ ] Iepazīšanās vednis svaigā iestatīšanā rāda "Kā tas darbojas" līmeņu tūres soli
- [ ] Galvenā informācijas panela līmeņu pārklājuma logrādis rāda konfigurēto/aktīvo skaitu

## Atgriešana

Ja laidienā ir kritiska problēma:

1. `gh release edit vX.Y.Z --prerelease` (atzīmē kā nejaunāko)
2. `git tag -d vX.Y.Z && git push --delete origin vX.V.Z` (tikai, ja vēl nav pieņemts lietotāju)
3. Vai: ātrais labojums `release/vX.Y.0` → papildlaidiena atjauninājums `vX.Y.(Z+1)`
4. Nekavējoties paziņojiet GitHub Discussions un Discord

## Stingrie Noteikumi

- Nekad nelieciet tieši `main`
- Nekad neizmantojiet `git push --force` uz `main` vai `release/*` zarām
- Nekad neizlaidiet Husky āķus (`--no-verify`)
- Nekad nelieciet noslēpumus, akreditācijas datus vai `.env` failus
- Pārklājumam jāsaglabājas ≥60/60/60/60 (paziņojumi/rindiņas/funkcijas/zari)
- Vienmēr iekļaujiet vai atjauniniet testus, mainot ražošanas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`

## Automātiskā Sinhronizācijas Pārbaude

Pirms PR atvēršanas palaidiet dokumentu sinhronizācijas sargu lokāli:

```bash
npm run check:docs-sync
```

CI arī veic šo pārbaudi failā `.github/workflows/ci.yml` (lint uzdevums).
