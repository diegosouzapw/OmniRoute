# RELEASE_CHECKLIST (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Kontrolni seznam za izdajo"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Kontrolni seznam za izdajo

> **Nazadnje posodobljeno:** 2026-08-28 — v3.8.51
> Poenostavljen postopek izdaje, ki za avtomatizacijo uporablja veščine Claude Code.
>
> **Med izdajami ohranjajte čakalno vrsto/vejo v zelenem stanju:** glejte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (družina `/green-prs` + `npm run check:release-green` + `/babysit` + nočno izvajanje). Redno izvajanje
> tega postopka — še posebej **pred** tem kontrolnim seznamom — zagotovi, da se PR za izdajo začne v zelenem stanju.

## Na kratko

```bash
# 1. Zvišajte različico in ustvarite CHANGELOG (veščina)
/version-bump-cc patch    # ali minor/major

# 2. Lokalno zaženite preverjanje kakovosti
npm run check              # lint + testi
npm run test:coverage      # celovito preverjanje pokritosti (60/60/60/60)

# 3. Izvedite gradnjo in osnovni preizkus
npm run build
npm run test:e2e           # neobvezno, vendar priporočeno

# 4. Ustvarite izdajo (veščina)
/generate-release-cc

# 5. Izvedite namestitev (veščina)
/deploy-vps-both-cc        # ali akamai-cc / local-cc

# 6. Zajemite dokazila o izdaji (veščina)
/capture-release-evidences-cc
```

## Zaupanja vredno objavljanje npm (privzeto od v3.8.51) — na zahtevo postopno, neposredno kot rezervna možnost

`npm-publish.yml` privzeto objavlja prek **zaupanja vrednega objavljanja npm (OIDC)**: opravilo
`stage-npm` (ki ga gosti GitHub) zamenja GitHubov id-token za kratkotrajno poverilnico npm
za to izvajanje — brez dolgoročnega žetona npm v skrivnostih repozitorija, brez poziva za 2FA, z dodanim dokazilom o izvoru.
To je obvod, ki ga npm zdaj dovoljuje zaradi postopnega opuščanja žetonov, ki preskočijo 2FA;
obnavlja popolnoma samodejen postopek, ki ga je projekt uporabljal do v3.8.48, hkrati pa ohranja
zagotovilo WS1.3 (razkriti žeton sam ne more objavljati — žetona sploh ni).

**Enkratna nastavitev (lastnik):** npmjs.com → paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: lastnik `diegosouzapw`, repozitorij `OmniRoute`, delovni tok `npm-publish.yml`
(okolje: brez). Dokler to ni nastavljeno, samodejni korak ne uspe z napako `ENEEDAUTH`:
znova ga sprožite s `publish_mode=staged` (spodaj) ali `direct`.

### Postopno objavljanje (na zahtevo — `publish_mode=staged`)

Delovni tok npm-publish ne objavlja več neposredno: zažene zapakirani tarball
(`check:pack-boot`) in nato izvede `npm stage publish` — točno določeni bajti so shranjeni v
registru, vendar jih **ni mogoče namestiti**, dokler jih lastnik ne odobri. Človeško preverjanje 2FA
je prestavljeno PO dokazovanju, ne pred njega.

**Postopek lastnika, ko delovni tok postane zelen:**

1. `npm stage list omniroute` — poiščite ID stopnje (izpisan je tudi v povzetku delovnega toka).
2. Preverite shranjene bajte (priporočeno): `npm stage download <id>`, nato namestite
   preneseni tarball v začasno predpono in ga zaženite (`npm run check:pack-boot` v CI avtomatizira
   enako preverjanje pakiranje→namestitev→zagon).
3. `npm stage approve <id>` — poziv za 2FA JE objava. `npm stage reject <id>` vsebino zavrže.
4. Varnostna mreža po objavi: preverjevalnik po objavi (WS1.4 načrta v3.8.49) namesti
   objavljeno različico iz javnega registra v čistem vsebniku in jo zažene.

**Rezervna možnost v sili:** `workflow_dispatch` z `publish_mode=direct` obnovi
starejši način takojšnjega `npm publish` (uporabite samo, če postopno objavljanje ne deluje pravilno; zabeležite razlog).

**Enkratna utrditev (lastnik, npmjs.com):** za `omniroute` konfigurirajte Trusted Publisher
v načinu samo za postopno objavljanje, tako da razkriti dolgoročni žeton ne more neposredno izvesti `npm publish`
od nikoder — CI lahko vsebino samo pripravi; izda jo lahko le lastnik s 2FA.

**Postopek za okvarjen artefakt (nespremenjen):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
kot privzeti prvi odziv (traja nekaj minut in je povraten); `npm unpublish` samo znotraj 72-urnega obdobja/brez odvisnih paketov
in nikoli kot prva poteza. Docker: nikoli ne prepišite oznake različice — povrnitev pomeni
preusmeritev `latest` na zadnjo delujočo zgoščeno vrednost.

**Docker Hub `latest` (obvezno ob vsaki objavi stabilne različice SemVer):**
delovni tok `docker-publish` mora označiti **oba**, `X.Y.Z` in, kadar
`should-promote-latest.sh` potrdi, da gre za najvišjo stabilno različico SemVer, tudi `:latest`,
z **isto zgoščeno vrednostjo**. Po opravilu: zgoščena vrednost oznake `latest` v Hubu je enaka novi
zgoščeni vrednosti SemVer in `last_updated` je posodobljen. Oznaka `:latest` ne sme ostati na starejši
gradnji, medtem ko opombe ob izdaji omenjajo popravke, ki obstajajo samo v git. Hitri začetni primeri
Compose uporabljajo `:latest`; GitOps naj še naprej pripenja `X.Y.Z`. Glejte
[Kanali izdaj Docker](../guides/DOCKER_GUIDE.md#release-channels) in #10317.

## Hitri pas za nujne popravke (oznaka `hotfix`)

PR z oznako `hotfix` preskoči obsežno matriko CI (9-delni E2E, stopnjevanje pokritosti,
quality-gate, quality-extended) in ohrani hitra preverjanja z visoko signalno vrednostjo: gradnjo,
dele enotnih testov, integracijske teste, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
in zagonski preizkus tarballa (`check:pack-boot`). Cilj: uspešen rezultat v ≤15 min namesto v ~33 min.

**Pravila za vstop — zahtevani so vsi štirje pogoji (po vzoru nujnih pasov Chromium/VS Code/Node):**

1. **Resnost**: produkcija ne deluje — objavljeni artefakt se ob zagonu sesuje /
   varnostni popravek / prizadet je vsak uporabnik izdaje. »Pomembno« ne pomeni »pokvarjeno«.
2. **Pooblastilo**: oznako `hotfix` lahko doda samo lastnik repozitorija. Oznaka JE
   odobritev — nikoli je ne dodajte sami na kampanjski PR.
3. **Dokazi**: telo PR-ja vsebuje povezavo do prejšnjega v celoti uspešnega obsežnega izvajanja
   (zbirke, ki bi jo preskočena opravila ponovno preverila) in do testa samega popravka, ki je
   najprej spodletel, nato pa uspel.
4. **Obseg**: samo cherry-pick — minimalni popravek, brez refaktoriranja in brez spremljajočih sprememb.

Preskočena površina pokritosti/stopnjevanja se ponovno preveri pri naslednjem polnem izvajanju na
veji izdaje (neprekinjeno uspešno stanje izdaje) — pas preskoči ČAKANJE, nikoli preverjanja.
Spremembe samo v testih (vse datoteke pod `tests/`, nobena pod `tests/e2e/`) samodejno
preskočijo matriko E2E brez kakršne koli oznake.

## Podroben kontrolni seznam

### Pred izdajo

- [ ] Vsi PR-ji, namenjeni tej izdaji, so združeni v `release/vX.Y.0`
- [ ] Vsi odprti elementi Linear/issue za to različico so zaprti ali prestavljeni v naslednji mejnik
- [ ] CI je uspešen na veji `release/vX.Y.0`
- [ ] V kodi ni označevalnikov `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Osnovna slika Docker je posodobljena (trenutno `node:24.15.0-trixie-slim`)

### Različica in dnevnik sprememb

- [ ] Zaženite `/version-bump-cc <patch|minor|major>` (veščina Claude Code)
  - Poviša različico v `package.json`, `electron/package.json`
  - Ponovno ustvari `CHANGELOG.md` iz zapisov git od zadnje oznake
  - Posodobi značke v README.md
- [ ] Ročno preglejte CHANGELOG.md in po potrebi uredite sporočila potrditev
- [ ] Zagotovite, da je najnovejši razdelek semver v `CHANGELOG.md` enak različici v `package.json`
- [ ] Ohranite `## [Unreleased]` kot prvi razdelek dnevnika sprememb za prihodnje delo
- [ ] Posodobite `docs/openapi.yaml` → `info.version` mora biti enak različici v `package.json`

### Kakovost kode

- [ ] `npm run lint` — 0 napak (opozorila so obstajala že prej)
- [ ] `npm run typecheck:core` — brez napak
- [ ] `npm run typecheck:noimplicit:core` — brez napak (strogo)
- [ ] `npm run check:cycles` — brez krožnih odvisnosti
- [ ] `npm run check:any-budget:t11` — znotraj proračuna
- [ ] `npm run check:route-validation:t06` — brez napak
- [ ] `npm run check:node-runtime` — dosežena je najnižja podprta različica izvajalnega okolja (`>=22.22.2 <23`, `>=24.0.0 <27`, skladno z `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; usklajeno z `engines` v `package.json`)

### Testiranje

- [ ] `npm run test:unit` — uspešno
- [ ] `npm run test:vitest` — uspešno (strežnik MCP, autoCombo, predpomnilnik)
- [ ] `npm run test:coverage` — prag 60/60/60/60 dosežen (stavki/vrstice/funkcije/veje)
- [ ] `npm run test:integration` — uspešno (če se spremembe dotikajo DB / obravnavalnikov)
- [ ] `npm run test:combo:matrix` — uspešno (matrika kombiniranih strategij: deterministično dokazuje odločitve izbire vseh 19 javnih strategij usmerjanja; zaženite ob spremembah kombiniranega usmerjanja, razreševanja strategij ali nadomestne logike)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **izbirno/ročno** (omejeni preizkus z resničnimi nadrejenimi storitvami; uporablja posnetek DB samo za branje iz VPS `root@192.168.0.15`; dostopa do resničnih ponudnikov in porablja dobroimetje; nikoli se ne izvaja v CI; brez omogočitve se pravilno preskoči)
- [ ] `npm run test:combo:live:vps` — **izbirno/ročno** (živi preizkus VPS faze 3: 7 scenarijev HTTP proti živemu strežniku `.15` prek navadnega Node ESM; zahteva `ssh root@192.168.0.15`; ustvari/izbriše samo kombinacije `__live_test__*`; dostopa do resničnih ponudnikov; nikoli se ne izvaja v CI)
- [ ] `npm run test:e2e` — uspešno (spremembe uporabniškega vmesnika)
- [ ] `npm run test:protocols:e2e` — uspešno (spremembe MCP/A2A)
- [ ] `npm run test:ecosystem` — uspešno

### Kavlji (preverjeno s Husky)

Kavlji Husky so v `.husky/` in se samodejno izvajajo med operacijami git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** hitra deterministična preverjanja — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namenoma izključuje `test:unit` (počasno; pokriva ga opravilo CI `test-unit`).
  - Pred potiskanjem vej izdaje ročno zaženite `npm run test:unit`.

Če kavelj spodleti: odpravite osnovno težavo in ga ne zaobidite z `--no-verify`.

### Dogovorjene potrditve

Vse potrditve, namenjene izdaji, morajo slediti obliki `type(scope): subject`.

**Veljavne vrste:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Veljavni obsegi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Prelomne spremembe: dodajte nogo `BREAKING CHANGE:` ali `!` za obsegom (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` je uspešen (samodejno ga zažene pre-commit)
- [ ] `npm run check:docs-all` je uspešen (krovno preverjanje: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` se konča s kodo 0 — pogodba okolja med kodo ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je nespremenjena
- [ ] `npm run check:doc-links` se konča s kodo 0 — po prestrukturiranju ni pokvarjenih notranjih referenc markdown
- [ ] `docs/architecture/ARCHITECTURE.md` je pregledan glede odstopanj shrambe/izvajalnega okolja
- [ ] `docs/guides/TROUBLESHOOTING.md` je pregledan glede odstopanj spremenljivk okolja in delovanja
- [ ] Če je bila spremenjena `.env.example`: posodobljen je `docs/reference/ENVIRONMENT.md`
- [ ] Če ima nova funkcionalnost uporabniški vmesnik: omenjena je v `docs/guides/USER_GUIDE.md`
- [ ] Če ima nova funkcionalnost API: posodobljena sta `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Če je nova funkcionalnost modul: obstaja namenska datoteka `docs/<MODULE>.md`
- [ ] Če gre za prelomno spremembo: `docs/guides/TROUBLESHOOTING.md` vsebuje opombo o selitvi

### i18n

- [ ] `npm run i18n:check` se konča s kodo 0 — stanje prevodov (`.i18n-state.json`) je sinhronizirano z izvorno dokumentacijo (v strogem načinu ni odstopajočih virov; svetovalno opozorilo v načinu opozarjanja je sprejemljivo za zadnje manjše popravke dokumentacije, vendar mora biti pred označevanjem rezultat 0)
- [ ] `npm run i18n:check-ui-coverage` se konča s kodo 0 — vsak jezik uporabniškega vmesnika dosega ali presega 80-odstotni prag pokritosti
- [ ] `npm run i18n:sync-ui:dry` poroča o 0 manjkajočih ključih v vseh 42 jezikih
- [ ] Če se je spremenila izvorna angleška dokumentacija, pred označevanjem zaženite `npm run i18n:run` (zahteva `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Prispevke k prevodom je mogoče prestaviti v naslednjo izdajo, če so manjši (zabeležite v CHANGELOG)

### Selitve podatkovne zbirke

- [ ] Če ima `src/lib/db/migrations/` nove datoteke:
  - [ ] Vsaka selitev je idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Selitve so ovite v transakcije
  - [ ] Pravilno so oštevilčene (brez vrzeli v zaporedju)
- [ ] Preizkusite pri sveži namestitvi: izbrišite `~/.omniroute/omniroute.db` in zaženite `npm run dev`
- [ ] Preizkusite pri obstoječi namestitvi: varnostno kopirajte DB, zaženite selitev in preverite shemo
- [ ] Datoteke WAL (`-wal`, `-shm`) so pravilno obravnavane, če selitev prepisuje tabele

### Katalog ponudnikov (preverjen z Zod)

- [ ] Shema Zod v `src/shared/constants/providers.ts` je veljavna ob nalaganju
  - [ ] Vsi ponudniki imajo zahtevana polja (`id`, `label`, `kind` itd.)
  - [ ] Za nove brezplačne ponudnike je naveden `freeNote`
  - [ ] Ponudniki OAuth imajo `oauthConfig`, registriran v `src/lib/oauth/constants/oauth.ts`
- [ ] Če je dodan nov ponudnik: ustrezen izvajalnik v `open-sse/executors/`
- [ ] Če oblika ni OpenAI: prevajalnik v `open-sse/translator/`
- [ ] Modeli so registrirani v `open-sse/config/providerRegistry.ts`
- [ ] Enotni testi v `tests/unit/` pokrivajo razvrščanje ponudnikov in usmerjanje

### Namizna aplikacija (Electron)

Če je bil spremenjen `electron/`:

- [ ] `npm run electron:smoke:packaged` je uspešen
- [ ] Gradnje so preizkušene za vsaj eno od možnosti `:win`, `:mac`, `:linux`
- [ ] Potrdila za podpisovanje kode niso potekla (če se uporablja podpisovanje)
- [ ] Različica v `electron/package.json` se ujema s korenskim `package.json`
- [ ] Kazalec kanala samodejnih posodobitev je posodobljen, če se izdaja v `stable`

### Razporeditev gradnje

Repozitorij uporablja tri različne izhodne imenike — nikoli jih ne zamenjajte:

| Imenik    | Namen                                                       | Sleden?         |
| --------- | ----------------------------------------------------------- | --------------- |
| `src/`    | Izvorna koda aplikacije (TypeScript / TSX)                  | Da              |
| `.build/` | Vmesni rezultati gradnje — izhod `next build` (`distDir`)   | Ne (gitignored) |
| `dist/`   | Paket npm za distribucijo — sestavi ga `assembleStandalone` | Ne (gitignored) |

> **Opomba za operaterja:** imenik slike na oddaljenem VPS ostaja `/usr/lib/node_modules/omniroute/app/`.
> Premaknjen je bil samo izhod gradnje **znotraj repozitorija** (`app/` → `dist/`). Veščine za uvajanje z rsync
> prenesejo vsebino `dist/` v oddaljeni imenik `app/` — spremembe poti VPS niso potrebne.

**Potek z eno gradnjo:**

```
npm run build:release
  └─ rm -rf .build dist          (čiščenje)
  └─ next build → .build/next/   (vmesni rezultati)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (kontrolna vrednost HEAD)
```

Za uvajanje NE zaženite `npm run build`, ki mu sledi ločen `npm run build:cli` — uporabite
`npm run build:release`, ki v enem ukazu izvede čisto ponovno gradnjo in zapiše kontrolno vrednost.

### Preverjanje artefakta

- [ ] `npm run build:release` uspe in `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` je brez napak — brez `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ali drugih lokalnih ostankov
- [ ] Po gradnji obstaja `dist/server.js`

### Označevanje in izdaja

- [ ] Zaženite `/generate-release-cc` (veščina Claude Code):
  - Ustvari oznako `vX.Y.Z`
  - Potisne oznako in vejo
  - Odpre izdajo GitHub z vsebino dnevnika sprememb
  - Priloži namestitvene programe Electron (če so bili zgrajeni)
- [ ] Ali ročno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Uvajanje

Veščine za uvajanje uporabljajo lahki potek rsync — brez `npm pack`, brez `npm i -g`:

- [ ] Uporabite veščino za uvajanje, ki ustreza cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Pred uvajanjem potrdite, da je `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Gradnja se mora izvajati tam, kjer je `node_modules` dejanski imenik (glavna delovna kopija ali delovno drevo z izvedenim `npm ci` — NE delovno drevo s simbolno povezavo)
- [ ] Izvedite preizkus uvedenega primerka:
  - Odprite `/dashboard/health` → preverite, ali se niz različice ujema z izdajo
  - Izvedite zahtevo `/v1/chat/completions` proti znanemu ponudniku
  - Preverite, ali `/api/monitoring/health` vrne odklopnike v stanju `CLOSED`
  - Potrdite, da se transporti MCP odzivajo (`/mcp` HTTP, `/mcp-sse` SSE)

### Po izdaji

- [ ] Zaženite `/capture-release-evidences-cc` (veščina Claude Code)
  - Zajame posnetke zaslona/posnetke novih funkcionalnosti v obliki WebP
  - Priloži jih opombam ob izdaji / objavi v spletnem dnevniku
- [ ] Posodobite GitHub Discussions / Discord z obvestilom o izdaji
- [ ] Odprite mejnik za naslednjo različico
- [ ] Če je kritično: pripnite razpravo ali objavite v `news.json` za pasico v aplikaciji

### Kontrolna točka za javno objavo Radarja

Obvestilo Radar je namenoma potrjeno z `active: false`. Aktivacija je ločena
sprememba, potem ko so dokazani vsi spodnji elementi:

- [ ] Vsi naloženi PR-ji Radar so združeni in CI na vrhu izdaje je uspešen
- [ ] Uvedite in preizkusite odprtokodne poti Radar, pri čemer `RADAR_ENABLED` privzeto ostane izklopljen
- [ ] Preizkusite `GET /planos`, `/termos`, `/privacidade` in `/reembolso` na imenovanem gostitelju Radar
- [ ] V zasebni storitvi zabeležite identiteto/kontakt/naslov operaterja in pravni pregled, ki ga je odobril lastnik
- [ ] Preizkusite Stripe Checkout in podpisani webhook samo v preizkusnem načinu
- [ ] Preizkusite eno šifrirano dostavo transakcijske e-pošte z odobrenim pošiljateljem/domeno
- [ ] Dokažite obnovitev varnostne kopije in eno nadzorovano raziskovalno izvajanje z omejenim proračunom
- [ ] Pred sprejemanjem dokazil o donacijah odobrite pravilnik pregleda BRL/PIX
- [ ] Javni Checkout omogočite šele po predhodnih preverjanjih, nato aktivirajte novi ID v `news.json`
- [ ] Preverite, ali domača pasica uporablja lokalizirano besedilo in ali se novi ID ponovno prikaže po zavrnitvi starejšega ID-ja

## Preizkus delovanja vdelanih storitev (v3.8.4+)

Pred izdajo katere koli različice, ki vključuje spremembe vdelanih storitev, preverite:

### Zagon s svežo zbirko podatkov (odkrije kolizije migracij — dodano po hitrem popravku v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počakajte 10 s na zagon
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrne `"9router"` (NE 404, NE 500). Potrjuje, da je bila migracija `071_services.sql` izvedena in vrstica ustvarjena.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrne 3 vrstice.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrne 2 vrstici (potrjuje, da je bila migracija `070_webhooks_kind_metadata.sql` izvedena).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` uspe — ščiti pred prihodnjimi kolizijami.

### 9Router

- [ ] `POST /api/services/9router/install` vrne 200 z `installedVersion` v manj kot 2 min
- [ ] `POST /api/services/9router/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/9router/status` sporoči `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` vrne 200 (usmerjanje od začetka do konca prek 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` prikaže izvorni uporabniški vmesnik 9Router znotraj posredniškega strežnika (brez neposrednega okvirja iframe z `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrne `{ keyRotated: true }` in storitev se ponovno zažene brez težav
- [ ] `POST /api/services/9router/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrne tok SSE z dogodkom `snapshot`, ki vsebuje nedavne vrstice
- [ ] Namestitev v okolju brez `npm` v PATH vrne 500 s prijaznim sporočilom o napaki (brez sledenja sklada)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrne 200 v manj kot 2 min
- [ ] `POST /api/services/cliproxy/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/cliproxy/status` sporoči `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrne tok SSE

### Regresija varnosti

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrne `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrne `403 LOCAL_ONLY`
- [ ] Odzivi z napakami iz `/api/services/*` ne vsebujejo `err.stack` ali absolutnih poti datotek

## Preverjanja za v3.8.0+

Pred izdajo katere koli različice v3.8.x preverite še naslednje:

- [ ] `omniroute --tray` se zažene v sistemu macOS (systray2 je nameščen v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se zažene v sistemu Linux (zahteva DISPLAY; prijazna napaka, če ni nastavljen)
- [ ] `omniroute --tray` se zažene v sistemu Windows (PowerShell NotifyIcon, brez dodatnih izvršljivih datotek)
- [ ] `omniroute config tray enable` ustvari vnos za samodejni zagon; onemogočanje ga odstrani
- [ ] `npm install -g omniroute@<this-version>` izvede postinstall brez usodnega izhoda
- [ ] Pot posodobitve ohrani neobvezne odvisnosti: `omniroute update --apply` in samodejni posodabljalnik
      izvedeta `npm install -g … --include=optional`, tako da `optionalDependencies` (better-sqlite3,
      keytar, tls-client in sklad SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) preživijo posodobitev. Stopnja SLM ultra `modelPath` potrebuje tudi model
      tinybert, ki se ob prvi uporabi samodejno prenese v `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) nato razmesti neobvezno zaprtje SLM v
      `dist/node_modules`, tako da delavec razreši EN SAM primerek `@huggingface/transformers` ^4.2.0
      — samostojno sledenje vključuje le transformers, ne pa dinamično uvoženih
      neobveznih odvisnosti, zato bi brez tega delavec naložil llmlingua-2 s transformers iz korena,
      stopnja SLM pa bi se neopazno preklopila v odprto delovanje ob napaki.
- [ ] `omniroute status` deluje brez `.env` (pot žetona CLI, samo povratna zanka)
- [ ] `curl http://localhost:20128/api/shutdown` vrne 401 (vedno zaščitena pot)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrne 401 (varovalo povratne zanke)
- [ ] Izvajalno okolje SQLite se ob prvem zagonu razreši na `bundled` (priložena binarna datoteka je veljavna za platformo)
- [ ] Izvajalno okolje SQLite preklopi na `runtime`, ko je `node_modules/better-sqlite3` izbrisan
- [ ] Pametni filter MCP stisne dejanski izhod `playwright-mcp browser_snapshot` (≥50-odstotno zmanjšanje)
- [ ] Vseh 10 datotek `skills/omniroute*/SKILL.md` je javno dostopnih prek neobdelanega URL-ja GitHub
- [ ] Čarovnik za uvodno nastavitev pri sveži namestitvi prikaže korak predstavitve stopenj »Kako deluje«
- [ ] Pripomoček za pokritost stopenj na domači nadzorni plošči prikazuje število konfiguriranih/aktivnih stopenj

---

## Povrnitev različice

Če ima izdaja kritično težavo:

1. `gh release edit vX.Y.Z --prerelease` (označi jo kot ne-najnovejšo)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo če je uporabniki še niso začeli uporabljati)
3. Ali: hitri popravek na `release/vX.Y.0` → izdaja popravka `vX.Y.(Z+1)`
4. Takoj obvestite uporabnike v GitHub Discussions in na Discordu

## Stroga pravila

- Nikoli ne potrjujte sprememb neposredno v `main`
- Nikoli ne uporabljajte `git push --force` za veje `main` ali `release/*`
- Nikoli ne preskočite kavljev Husky (`--no-verify`)
- Nikoli ne potrjujte skrivnosti, poverilnic ali datotek `.env`
- Pokritost mora ostati ≥60/60/60/60 (stavki/vrstice/funkcije/veje)
- Pri spreminjanju produkcijske kode v `src/`, `open-sse/`, `electron/` ali `bin/` vedno vključite ali posodobite teste

## Samodejno preverjanje sinhronizacije

Pred odprtjem PR-ja lokalno zaženite preverjanje sinhronizacije dokumentacije:

```bash
npm run check:docs-sync
```

CI to preverjanje izvaja tudi v `.github/workflows/ci.yml` (opravilo lint).
