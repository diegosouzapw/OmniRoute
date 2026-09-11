# RELEASE_CHECKLIST (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Väljalaske kontrollnimekiri"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Väljalaske kontrollnimekiri

> **Viimati uuendatud:** 2026-08-28 — v3.8.51
> Lihtsustatud väljalaske voog, mis kasutab automatiseerimiseks Claude Code oskusi (skills).
>
> **Hoia järjekord/haru väljalaskete vahel roheline:** vaata [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` perekond + `npm run check:release-green` + `/babysit` + öine käivitus). Selle
> perioodiline käivitamine — ja eriti **enne** seda kontrollnimekirja — tagab, et väljalaske PR alustab rohelisena.

## TL;DR

```bash
# 1. Suurenda versiooni + genereeri CHANGELOG (skill)
/version-bump-cc patch    # või minor/major

# 2. Käivita kvaliteedivärav lokaalselt
npm run check              # lint + testid
npm run test:coverage      # täielik katvuse värav (60/60/60/60)

# 3. Ehita ja tee suitsutest
npm run build
npm run test:e2e           # valikuline, aga soovituslik

# 4. Genereeri väljalase (skill)
/generate-release-cc

# 5. Juuruta (skill)
/deploy-vps-both-cc        # või akamai-cc / local-cc

# 6. Jäädvusta väljalaske tõendid (skill)
/capture-release-evidences-cc
```

## npm usaldusväärne avaldamine (vaikimisi alates v3.8.51) — soovi korral etapiviisiline, otseavaldamine varulahendusena

`npm-publish.yml` avaldab vaikimisi **npm Trusted Publishing (OIDC)** kaudu: `stage-npm`
töö (github-hostitud) vahetab GitHubi id-token'i selle käivituse jaoks lühiealise npm
mandaadi vastu — repositooriumi saladustes ei ole pikaajalist npm tokenit, 2FA nõudmist ei tule ette, provenance on lisatud.
See on möödaviik npm sanktsioonidest, kuna 2FA-t vahele jätvad tokenid on kasutusest kõrvaldamisel;
see taastab täisautomaatse voo, mis projektil oli kuni v3.8.48-ni, hoides samal ajal
WS1.3 tagatist (lekkinud token üksinda ei saa avaldada — tokenit ei ole olemas).

**Ühekordne seadistus (omanik):** npmjs.com → paketi `omniroute` → Settings → _Trusted
Publisher_ → GitHub: omanik `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(keskkond: puudub). Kuni seda pole seadistatud, ebaõnnestub automaatne etapp veaga `ENEEDAUTH`:
saada uuesti käivitatuna parameetriga `publish_mode=staged` (vaata allpool) või `direct`.

### Etapiviisiline avaldamine (soovi korral — `publish_mode=staged`)

npm-publish töövoog ei avalda enam otse: see käivitab pakitud tarball'i
(`check:pack-boot`) ja jooksutab siis `npm stage publish` — täpsed baidid pargitakse
registrisse, **ei ole paigaldatavad**, kuni omanik neid heaks kiidab. Inimlik 2FA värav
liikus tõestuse JÄRELE, mitte enne selle.

**Omaniku vooskeem pärast töövoo rohelist tulemust:**

1. `npm stage list omniroute` — leia stage id (kuvatakse ka töövoo kokkuvõttes).
2. Kontrolli pargitud baite (soovituslik): `npm stage download <id>`, seejärel paigalda
   allalaaditud tarball ajutisse prefiksisse ja käivita see (`npm run check:pack-boot` automatiseerib
   sama pack→install→boot verdikti CI-s).
3. `npm stage approve <id>` — 2FA nõudmine ONGI avaldamine. `npm stage reject <id>` tühistab selle.
4. Avaldamisjärgne kontroll: avaldamisjärgne kinnitaja (v3.8.49 plaani WS1.4) paigaldab
   avaldatud versiooni avalikust registrist puhtas konteineris ja käivitab selle.

**Hädaolukorra varulahendus:** `workflow_dispatch` parameetriga `publish_mode=direct` taastab
vana kohese `npm publish` toimingu (kasuta ainult siis, kui etapiviisiline protsess ise ei toimi korrektselt; dokumenteeri põhjus).

**Ühekordne karastamine (omanik, npmjs.com):** seadista `omniroute` jaoks Trusted Publisher
ainult-etapiviisilisse režiimi, et lekkinud pikaajaline token ei saaks teha `npm publish`
otse kusagilt — CI saab ainult etapistada; ainult omaniku 2FA vabastab avaldamise.

**Katkise artefakti tegevuskava (muutumatu):** `npm deprecate omniroute@<bad> "<põhjus> — kasuta <fixed>"`
on vaikimisi reaktsioon (minutid, tühistatav); `npm unpublish` kasutatakse ainult 72h/mitte-sõltuvuste
akna sees ja mitte kunagi esimese sammuna. Docker: ära kirjuta versioonimärgendit üle — tagasipöördumine
tähendab `latest` viitamist ümber viimasele töötavale digestile.

**Docker Hub `latest` (kohustuslik igal stabiilsel SemVer avaldamisel):** `docker-publish`
töövoog peab märgistama **nii** `X.Y.Z` kui ka, kui `should-promote-latest.sh`
kinnitab, et see on kõrgeim stabiilne SemVer, ka `:latest`
**samasuguse digestiga**. Pärast tööd: Hub `latest` digest võrdub uue
SemVer digestiga ja `last_updated` on liikunud. Ei tohi jätta `:latest` vanemale
ehitusele, kui väljalaskemärkmed räägivad parandustest, mis eksisteerivad ainult git'is. Compose
kiirjuhendid kasutavad `:latest`; GitOps peaks jätkuvalt fikseerima `X.Y.Z`. Vaata
[Docker'i väljalaske kanalid](../guides/DOCKER_GUIDE.md#release-channels) ja #10317.

## Hädalapi kiirtee (märgis `hotfix`)

PR, mis on märgistatud `hotfix`, jätab vahele raske CI maatriksi (9-fragmendiline E2E, katvuse pingutusmehhanism (ratchet), kvaliteediväravad, laiendatud kvaliteedivärav) ning säilitab kiired, kõrge signaaliga kontrollid: build, ühiktestide fragmendid, integratsioon, vitest, lint/typecheck, docs-sync, `check:pack-artifact` ja tarball boot-smoke test (`check:pack-boot`). Eesmärk: roheline ≤15 min jooksul, mitte ~33 min.

**Sisenemispoliitika — kõik neli on kohustuslikud (eeskujuks Chromium/VS Code/Node hädaolukorra kiirteed):**

1. **Tõsidus**: toodang on katki — avaldatud artefakt jookseb kokku käivitamisel / turvaparandus / kõik väljalaske kasutajad on mõjutatud. "Oluline" ei tähenda "katki".
2. **Autoriteet**: ainult repositooriumi omanik lisab `hotfix` märgise. Märgis ON heakskiit — mitte kunagi ise-teenindatud kampaania-PR-il.
3. **Tõendid**: PR kirjelduses on link eelmisele täielikult rohelisele raskele käivitusele (see suite, mille vahelejäetud tööd taaskontrolliksid), pluss parandusega seotud test, mis esmalt ebaõnnestub ja seejärel läbib.
4. **Ulatus**: ainult cherry-pick — minimaalne parandus, mitte ümberkorraldusi, mitte kaasajooksvaid muudatusi.

Vahele jäetud katvuse/ratchet-pindala kontrollitakse uuesti järgmise täieliku käiguga väljalaske harul (pidev väljalaske-roheline) — see kiirtee jätab vahele OOTAMISE, mitte kunagi valideerimist.
Ainult testide diffid (kõik failid kausta `tests/` all, mitte ühtegi kausta `tests/e2e/` all) jätavad E2E maatriksi automaatselt vahele, ilma ühegi märgiseta.

## Detailne kontrollnimekiri

### Väljalaske-eelne etapp

- [ ] Kõik selle väljalaskega seotud PR-id on liidetud harusse `release/vX.Y.0`
- [ ] Kõik avatud Linear/probleemi kirjed selle versiooni kohta on suletud või lükatud edasi järgmisesse verstaposti
- [ ] CI on roheline harul `release/vX.Y.0`
- [ ] Koodis ei ole `TODO(release)` märgistusi: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker'i baaspilt on ajakohane (praegu `node:24.15.0-trixie-slim`)

### Versioon ja muudatuste logi

- [ ] Käivita `/version-bump-cc <patch|minor|major>` (Claude Code oskus)
  - Suurendab `package.json`, `electron/package.json` versiooninumbreid
  - Genereerib `CHANGELOG.md` uuesti git-committide põhjal alates viimasest märgisest
  - Uuendab README.md märke (badges)
- [ ] Vaata CHANGELOG.md käsitsi läbi ja korrasta vajadusel committi sõnumeid
- [ ] Kontrolli, et `CHANGELOG.md` viimane semver-sektsioon on võrdne `package.json` versiooniga
- [ ] Hoia `## [Unreleased]` esimesena muudatuste logi sektsioonina tulevaste tööde jaoks
- [ ] Uuenda `docs/openapi.yaml` → `info.version` peab olema võrdne `package.json` versiooniga

### Koodikvaliteet

- [ ] `npm run lint` — 0 viga (hoiatused on juba varem eksisteerinud)
- [ ] `npm run typecheck:core` — puhas
- [ ] `npm run typecheck:noimplicit:core` — puhas (range)
- [ ] `npm run check:cycles` — ei ole ringsõltuvusi
- [ ] `npm run check:any-budget:t11` — eelarve piires
- [ ] `npm run check:route-validation:t06` — puhas
- [ ] `npm run check:node-runtime` — toetatud runtime alammäär on täidetud (`>=22.22.2 <23`, `>=24.0.0 <27`, vastavalt `SUPPORTED_NODE_RANGE`-le failis `src/shared/utils/nodeRuntimeSupport.ts`; ühtlustatud `package.json` `engines`-väljaga)

### Testimine

- [ ] `npm run test:unit` — läbib
- [ ] `npm run test:vitest` — läbib (MCP server, autoCombo, vahemälu)
- [ ] `npm run test:coverage` — värav 60/60/60/60 on täidetud (laused/read/funktsioonid/harud)
- [ ] `npm run test:integration` — läbib (kui muudatused mõjutavad andmebaasi/haldureid)
- [ ] `npm run test:combo:matrix` — läbib (kombinatsioonistrateegiate maatriks: tõestab deterministlikult kõigi 19 avaliku ruutimisstrateegia valikuotsuseid; käivita, kui muudatused mõjutavad kombo-ruutimist, strateegia lahendamist või tagavarapesa loogikat)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **vabatahtlik/käsitsi** (piiratud pärisandmete allikaga live-suits (smoke test); ammutab kirjutuskaitstud andmebaasi hetktõmmise VPS-ilt `root@192.168.0.15`; puutub tegelikke teenusepakkujaid, kulutab krediiti; ei jooksta kunagi CI-s; jäetakse ilma väravaseadeta puhtalt vahele)
- [ ] `npm run test:combo:live:vps` — **vabatahtlik/käsitsi** (Faasi-3 VPS live-suits: 7 HTTP stsenaariumi live `.15`-serveri vastu tavalise Node ESM-i kaudu; vajab `ssh root@192.168.0.15`; loob/kustutab ainult `__live_test__*` kombosid; puutub tegelikke teenusepakkujaid; ei jooksta kunagi CI-s)
- [ ] `npm run test:e2e` — läbib (UI muudatused)
- [ ] `npm run test:protocols:e2e` — läbib (MCP/A2A muudatused)
- [ ] `npm run test:ecosystem` — läbib

### Hookid (Husky valideeritud)

Husky hookid asuvad kaustas `.husky/` ja käivituvad automaatselt git-operatsioonide käigus.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** kiired deterministlikud väravad — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiveeritud 2026-06-13). Jätab tahtlikult välja `test:unit` (aeglane; kaetud CI `test-unit` tööga).
  - Käivita `npm run test:unit` käsitsi enne väljalaske harude pushimist.

Kui hook ebaõnnestub: paranda alusprobleem, ei möödasõiduta `--no-verify` lipuga.

### Kokkuleppelised committid (Conventional Commits)

Kõik väljalaskega seotud committid peavad järgima vormingut `type(scope): subject`.

**Kehtivad tüübid:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Kehtivad ulatused:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Katkestavad muudatused (breaking changes): lisa jaluses `BREAKING CHANGE:` või `!` pärast ulatust (nt `feat(api)!: drop /v0`).

### Dokumentatsioon

- [ ] `npm run check:docs-sync` läbib (käivitatakse automaatselt pre-commit poolt)
- [ ] `npm run check:docs-all` läbib (koondkontroll: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` väljub kood 0-ga — koodi ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` keskkonnamuutujate leping on terve
- [ ] `npm run check:doc-links` väljub kood 0-ga — pärast ümberkorraldust ei ole katkiseid sisemisi markdown-viiteid
- [ ] `docs/architecture/ARCHITECTURE.md` on läbi vaadatud salvestuse/käitusaja lahknevuste suhtes
- [ ] `docs/guides/TROUBLESHOOTING.md` on läbi vaadatud keskkonnamuutujate ja operatiivsete lahknevuste suhtes
- [ ] Kui `.env.example` muutus: `docs/reference/ENVIRONMENT.md` on uuendatud
- [ ] Kui uuel funktsioonil on kasutajaliides: `docs/guides/USER_GUIDE.md` mainib seda
- [ ] Kui uuel funktsioonil on API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` on uuendatud
- [ ] Kui uus funktsioon on moodul: on olemas eraldi `docs/<MODULE>.md`
- [ ] Kui muudatus on katkestav: `docs/guides/TROUBLESHOOTING.md` sisaldab migratsioonimärkust

### i18n

- [ ] `npm run i18n:check` väljub kood 0-ga — tõlke olek (`.i18n-state.json`) on kooskõlas lähtedokumentidega (range režiimis ei ole lahknenud lähteid; hoiatusrežiimi nõuandev osa on aktsepteeritav viimase hetke dokumendiparandusteks, kuid peaks olema 0 enne märgistamist)
- [ ] `npm run i18n:check-ui-coverage` väljub kood 0-ga — kõik UI keeled on 80% katvuse alammäärast kõrgemal
- [ ] `npm run i18n:sync-ui:dry` teatab 0 puuduvat võtit kõigis 42 keeles
- [ ] Kui lähte-ingliskeelsed dokumendid muutusid, käivita `npm run i18n:run` (vajab `.env` failis `OMNIROUTE_TRANSLATION_API_KEY`-d) enne märgistamist
- [ ] Tõlkepanuseid võib lükata edasi järgmisse väljalaskesse, kui need on väikesed (jälgi CHANGELOG-is)

### Andmebaasi migratsioonid

- [ ] Kui kaustas `src/lib/db/migrations/` on uusi faile:
  - [ ] Iga migratsioon on idempotentne (`CREATE TABLE IF NOT EXISTS` jne)
  - [ ] Migratsioonid on pakitud transaktsioonidesse
  - [ ] Numeratsioon on õige (järjekorras ei ole tühikuid)
- [ ] Testi värskel paigaldusel: kustuta `~/.omniroute/omniroute.db` ja käivita `npm run dev`
- [ ] Testi olemasoleval paigaldusel: varunda andmebaas, käivita migratsioon, kontrolli skeemi
- [ ] WAL-failid (`-wal`, `-shm`) käsitletakse õigesti, kui migratsioon kirjutab tabeleid ümber

### Teenusepakkujate katalog (Zod-valideeritud)

- [ ] `src/shared/constants/providers.ts` Zod-skeem on laadimisel kehtiv
  - [ ] Kõigil teenusepakkujatel on kohustuslikud väljad (`id`, `label`, `kind` jne)
  - [ ] Uutel tasuta teenusepakkujatel on olemas `freeNote`
  - [ ] OAuth teenusepakkujatel on registreeritud `oauthConfig` failis `src/lib/oauth/constants/oauth.ts`
- [ ] Kui lisati uus teenusepakkuja: vastav täitur (executor) kaustas `open-sse/executors/`
- [ ] Kui vorming ei ole OpenAI-vorming: tõlkur (translator) kaustas `open-sse/translator/`
- [ ] Mudelid on registreeritud failis `open-sse/config/providerRegistry.ts`
- [ ] Ühiktestid kaustas `tests/unit/` katavad teenusepakkuja klassifitseerimist ja ruutimist

### Desktop (Electron)

Kui `electron/` muutus:

- [ ] `npm run electron:smoke:packaged` läbib
- [ ] Buildid on testitud vähemalt üht sihtplatvormi kasutades: `:win`, `:mac`, `:linux`
- [ ] Koodi allkirjastamise sertifikaadid ei ole aegunud (kui allkirjastatakse)
- [ ] `electron/package.json` versioon vastab juurkataloogi `package.json` versioonile
- [ ] Automaatuuenduse kanaliviide on uuendatud, kui väljalase on suunatud `stable`-kanalile

### Buildi paigutus

Repositoorium kasutab kolme eraldi väljundkataloogi — ei tohi neid segamini ajada:

| Kataloog  | Eesmärk                                                  | Jälgitud?         |
| --------- | -------------------------------------------------------- | ----------------- |
| `src/`    | Rakenduse lähtekood (TypeScript / TSX)                   | Jah               |
| `.build/` | Buildi vahetulemused — `next build` väljund (`distDir`)  | Ei (gitignoritud) |
| `dist/`   | Tarnitav npm-pakett — koostatud `assembleStandalone`-iga | Ei (gitignoritud) |

> **Operaatori märkus:** kaugem VPS-i pildikataloog on jätkuvalt `/usr/lib/node_modules/omniroute/app/`.
> Liikunud on ainult **repositooriumisisene** buildi väljund (`app/` → `dist/`). Juurutamisoskused rsync'ivad
> `dist/` sisu kaugesse `app/` kataloogi — VPS-i teekondade muutmine ei ole vajalik.

**Ühe-buildi voog:**

```
npm run build:release
  └─ rm -rf .build dist          (puhastamine)
  └─ next build → .build/next/   (vahetulemused)
  └─ assembleStandalone          (kopeerib standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD-i turvamärgend)
```

MITTE käivita `npm run build`, millele järgneb eraldi `npm run build:cli` juurutamiseks — kasuta
`npm run build:release`, mis teeb puhta ülesehituse + turvamärgendi ühe käsuga.

### Artefaktide valideerimine

- [ ] `npm run build:release` läbib edukalt ja `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` on puhas — pole `app.__qa_backup`, `scripts/scratch`, `package-lock.json` või muid kohalikke jääke
- [ ] `dist/server.js` eksisteerib pärast buildi

### Märgistamine ja väljalase

- [ ] Käivita `/generate-release-cc` (Claude Code oskus):
  - Loob märgise `vX.Y.Z`
  - Pushib märgise ja haru
  - Avab GitHub Release'i koos muudatuste logi sisuga
  - Lisab Electron installerid (kui koostatud)
- [ ] Või käsitsi:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Juurutamine

Juurutamisoskused kasutavad kerget rsync-voogu — ilma `npm pack`, ilma `npm i -g`:

- [ ] Kasuta sihtkohale vastavat juurutamisoskust:
  - `/deploy-vps-local-cc` — kohalik VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — mõlemad
- [ ] Enne juurutamist kinnita, et `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build peab jooksma seal, kus `node_modules` on tegelik (peamine checkout või `npm ci`-tud töökataloog — MITTE sümlingitud töökataloog)
- [ ] Testi juurutatud eksemplari:
  - Ava `/dashboard/health` → kontrolli, kas versiooniinfo vastab väljalaskele
  - Käivita `/v1/chat/completions` päring tuntud teenusepakkuja vastu
  - Kontrolli, et `/api/monitoring/health` tagastab olekud `CLOSED` (lülitid on suletud)
  - Kinnita, et MCP transpordid vastavad (`/mcp` HTTP, `/mcp-sse` SSE)

### Väljalaske-järgne etapp

- [ ] Käivita `/capture-release-evidences-cc` (Claude Code oskus)
  - Jäädvustab uute funktsioonide WebP-vormingus ekraanipilte/salvestisi
  - Lisab need väljalaske teatele / blogipostitusele
- [ ] Uuenda GitHub Discussions / Discordi väljalaske teatega
- [ ] Ava verstapost järgmise versiooni jaoks
- [ ] Kui kriitiline: kinnita arutelu või postita `news.json`-i rakendusesisese bänneri jaoks

### Radari avaliku käivituse värav

Radari teadaanne on tahtlikult liidetud olekuga `active: false`. Aktiveerimine on eraldi
muudatus pärast seda, kui igaüks allolevatest punktidest on tõenditega kinnitatud:

- [ ] Kõik virnastatud Radari PR-id on liidetud ja väljalaske-tipu CI on roheline
- [ ] OSS Radari teed on juurutatud ja testitud suitsu-testiga, `RADAR_ENABLED` on vaikimisi endiselt väljas
- [ ] Testi `GET /planos`, `/termos`, `/privacidade` ja `/reembolso` nimetatud Radari hostil
- [ ] Registreeri operaatori isik/kontakt/aadress ja omaniku heakskiidetud juriidiline läbivaatus privaatses teenuses
- [ ] Käivita Stripe Checkout ja allkirjastatud veebihaak (webhook) ainult testrežiimis
- [ ] Käivita üks krüpteeritud tehingu-e-kirja saatmine heakskiidetud saatja/domeeni kaudu
- [ ] Tõesta varunduse taastamine ja üks juhitud, eelarvega piiratud uurimiskäik
- [ ] Kinnita BRL/PIX läbivaatuspoliitika enne annetustõendite vastuvõtmist
- [ ] Luba avalik Checkout ainult pärast eelnevate väravate läbimist, seejärel aktiveeri uus `news.json` ID
- [ ] Kontrolli, et avaleht kasutab lokaliseeritud sisu ja uus ID ilmub taas pärast vanema ID sulgemist

## Manustatud teenuste (Embedded Services) suitsutest (v3.8.4+)

Enne mistahes väljalaske saatmist, mis sisaldab manustatud teenuste muudatusi, kontrolli:

### Värske andmebaasi käivitus (tabab rände (migration) kollisioonid — lisatud pärast v3.8.4 kiirparandust)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — oota käivitumist 10 s
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` tagastab `"9router"` (MITTE 404, MITTE 500). Kinnitab, et rakendus `071_services.sql` on rakendatud ja rida on lisatud (seeded).
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` tagastab 3 rida.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` tagastab 2 rida (kinnitab, et `070_webhooks_kind_metadata.sql` on rakendatud).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` läbib — kaitseb edaspidiste kollisioonide vastu.

### 9Router

- [ ] `POST /api/services/9router/install` tagastab 200 koos `installedVersion`-iga alla 2 minuti
- [ ] `POST /api/services/9router/start` tagastab 200 ja `state: "running"` alla 30 sekundi
- [ ] `GET /api/services/9router/status` teatab `health: "healthy"`
- [ ] `POST /v1/chat/completions` väärtusega `"model": "9router/auto/..."` tagastab 200 (otsast-lõpuni ruutimine (routing) läbi 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderdab 9Router native kasutajaliidese puhverserveri (proxy) sees (ilma otsese `127.0.0.1:port` iframe'ita)
- [ ] `POST /api/services/9router/rotate-key` tagastab `{ keyRotated: true }` ja teenus taaskäivitub puhtalt
- [ ] `POST /api/services/9router/stop` tagastab 200 ja `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` tagastab SSE voo koos `snapshot` sündmusega, mis sisaldab viimaseid ridu
- [ ] Paigaldamine keskkonnas, kus `npm` puudub PATH-is, tagastab 500 koos sõbraliku (ei ole stack trace) veateatega

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` tagastab 200 alla 2 minuti
- [ ] `POST /api/services/cliproxy/start` tagastab 200 ja `state: "running"` alla 30 sekundi
- [ ] `GET /api/services/cliproxy/status` teatab `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` tagastab 200 ja `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` tagastab SSE voo

### Turvalisuse regressioon

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` tagastab `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` tagastab `403 LOCAL_ONLY`
- [ ] `/api/services/*` veavastused ei sisalda `err.stack` ega absoluutseid failiteid

## v3.8.0+ kontrollid

Enne mistahes v3.8.x väljalaske saatmist kontrolli neid täiendavaid punkte:

- [ ] `omniroute --tray` käivitub macOS-il (systray2 paigaldatud `~/.omniroute/runtime/`-i)
- [ ] `omniroute --tray` käivitub Linuxil (vajab DISPLAY muutujat; sujuv veateade, kui see ei ole seatud)
- [ ] `omniroute --tray` käivitub Windowsil (PowerShell NotifyIcon, lisabinaarfailideta)
- [ ] `omniroute config tray enable` loob autostardi kirje; disable eemaldab selle
- [ ] `npm install -g omniroute@<see-versioon>` käivitab postinstall'i ilma fataalse väljumiseta
- [ ] Uuendustee säilitab valikulised sõltuvused (optional deps): `omniroute update --apply` ja automaatuuendaja
      käivitavad `npm install -g … --include=optional`, et `optionalDependencies` (better-sqlite3,
      keytar, tls-client, ja llmlingua SLM pakett: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) säiliksid uuenduse ajal. Ultra `modelPath` SLM tase vajab lisaks
      tinybert mudelit, mis laaditakse automaatselt alla `${DATA_DIR}/models/llmlingua` esimesel kasutamisel. Postinstall
      (`scripts/build/colocateOptionals.mjs`) seejärel koondab SLM valikulise sulundi (closure) kausta
      `dist/node_modules`, et töölõim (worker) laheneks ÜHE `@huggingface/transformers` ^4.2.0
      instantsi kaudu — iseseisev jälituspakett (standalone trace bundle) sisaldab vaid transformers-it, mitte dünaamiliselt imporditud
      valikulisi sõltuvusi, mistõttu selle puudumisel laadiks töölõim llmlingua-2 juuruse transformers-i vastu
      ja SLM tase ebaõnnestuks vaikimisi (fail-open) märkamatult.
- [ ] `omniroute status` töötab ilma `.env`-ita (CLI tokeni tee, ainult loopback)
- [ ] `curl http://localhost:20128/api/shutdown` tagastab 401 (alati kaitstud marsruut)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` tagastab 401 (loopback kaitse)
- [ ] SQLite käitusaeg (runtime) lahendub esimesel käivitusel väärtuseks `bundled` (kaasapandud binaarfail on platvormile sobiv)
- [ ] SQLite käitusaeg taandub väärtuseks `runtime`, kui `node_modules/better-sqlite3` kustutatakse
- [ ] Nutikas MCP filter tihendab tegelikku `playwright-mcp browser_snapshot` väljundit (≥50% vähenemine)
- [ ] Kõik 10 `skills/omniroute*/SKILL.md` faili on avalikult kättesaadavad raw GitHub URL-i kaudu
- [ ] Sisseelamise juhendaja (onboarding wizard) näitab "How It Works" tasemetuuri sammu värske seadistuse korral
- [ ] Avapaneeli (home dashboard) tasemekattuvuse vidin näitab konfigureeritud/aktiivseid loendeid

---

## Rollback

Kui väljalaskel on kriitiline probleem:

1. `gh release edit vX.Y.Z --prerelease` (märgib mitte kõige uuemana)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (ainult siis, kui kasutajad pole seda veel kasutusele võtnud)
3. Või: hotfix `release/vX.Y.0` harul → plaaster väljalase `vX.Y.(Z+1)`
4. Teavita kohe GitHub Discussions ja Discord kanalites

## Karmid Reeglid

- Mitte kunagi ei tohi otse `main` harule kinnitada (commit)
- Mitte kunagi ei tohi kasutada `git push --force` `main` või `release/*` harudele
- Mitte kunagi ei tohi vahele jätta Husky konkse (`--no-verify`)
- Mitte kunagi ei tohi kinnitada saladusi, mandaate ega `.env` faile
- Katvus peab jääma ≥60/60/60/60 (laused/read/funktsioonid/harud)
- Alati lisa või uuenda teste, kui muudad tootmiskoodi `src/`, `open-sse/`, `electron/` või `bin/` kaustades

## Automatiseeritud Sünkroonimise Kontroll

Käivita dokumentatsiooni sünkroonimise kaitse enne PR-i avamist:

```bash
npm run check:docs-sync
```

CI käivitab selle kontrolli ka `.github/workflows/ci.yml` failis (lint töö).
