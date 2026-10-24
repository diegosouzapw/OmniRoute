# Release Checklist (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Zadnja posodobitev:** 2026-08-28 — v3.8.51
> Poenostavljen postopek izdaje, ki za avtomatizacijo uporablja veščine Claude Code.
>
> **Med izdajami ohranjajte čakalno vrsto/vejo v zelenem stanju:** glejte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (družina `/green-prs` + `npm run check:release-green` + `/babysit` + nočno izvajanje). Redno izvajanje
> tega postopka — še posebej **pred** uporabo tega kontrolnega seznama — zagotovi, da se PR za izdajo začne v zelenem stanju.

## Na kratko

```bash
# 1. Povečajte različico in ustvarite CHANGELOG (veščina)
/version-bump-cc patch    # ali minor/major

# 2. Lokalno izvedite preverjanje kakovosti
npm run check              # lint + preizkusi
npm run test:coverage      # celovito preverjanje pokritosti (60/60/60/60)

# 3. Izdelajte in izvedite osnovni preizkus
npm run build
npm run test:e2e           # izbirno, vendar priporočeno

# 4. Ustvarite izdajo (veščina)
/generate-release-cc

# 5. Namestite (veščina)
/deploy-vps-both-cc        # ali akamai-cc / local-cc

# 6. Zajemite dokazila o izdaji (veščina)
/capture-release-evidences-cc
```

## Zaupanja vredno objavljanje npm (privzeto od v3.8.51) — na zahtevo postopno, neposredno kot rezervna možnost

`npm-publish.yml` privzeto objavlja prek **zaupanja vrednega objavljanja npm (OIDC)**:
opravilo `stage-npm` (ki ga gosti GitHub) zamenja GitHubov žeton id-token za kratkotrajno
poverilnico npm za to izvajanje — brez dolgotrajnega žetona npm med skrivnostmi repozitorija, brez poziva za 2FA, s priloženim dokazilom o izvoru.
To je obvod, ki ga npm zdaj odobrava, saj opušča žetone, ki preskočijo 2FA;
obnovi popolnoma samodejen potek, ki ga je projekt uporabljal do v3.8.48, obenem pa ohrani
zagotovilo WS1.3 (razkrit žeton sam ne more objavljati — ker žetona ni).

**Enkratna nastavitev (lastnik):** npmjs.com → paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: lastnik `diegosouzapw`, repozitorij `OmniRoute`, potek dela `npm-publish.yml`
(okolje: brez). Dokler to ni nastavljeno, samodejni korak ne uspe z napako `ENEEDAUTH`:
znova ga sprožite z `publish_mode=staged` (spodaj) ali `direct`.

### Postopno objavljanje (na zahtevo — `publish_mode=staged`)

Potek dela za objavljanje v npm ne objavlja več neposredno: zažene zapakirani arhiv tar
(`check:pack-boot`) in nato izvede `npm stage publish` — natančno ti bajti so shranjeni v
registru, vendar jih **ni mogoče namestiti**, dokler jih lastnik ne odobri. Človeški varnostni korak 2FA je
premaknjen ZA preverjanje, ne pred njega.

**Postopek za lastnika, ko potek dela uspešno zaključi v zelenem stanju:**

1. `npm stage list omniroute` — poiščite ID postopne objave (izpisan je tudi v povzetku poteka dela).
2. Preverite shranjene bajte (priporočeno): `npm stage download <id>`, nato namestite
   preneseni arhiv tar v začasno predpono in ga zaženite (`npm run check:pack-boot` v okolju CI
   avtomatizira enako preverjanje paket→namestitev→zagon).
3. `npm stage approve <id>` — poziv za 2FA JE objava. `npm stage reject <id>` jo zavrže.
4. Varnostno preverjanje po objavi: preverjevalnik po objavi (WS1.4 načrta za v3.8.49) v čistem
   vsebniku namesti objavljeno različico iz javnega registra in jo zažene.

**Rezervna možnost v sili:** `workflow_dispatch` z `publish_mode=direct` obnovi
podedovano takojšnje izvajanje `npm publish` (uporabite samo, če postopno objavljanje ne deluje pravilno; zabeležite razlog).

**Enkratna utrditev (lastnik, npmjs.com):** za
`omniroute` nastavite zaupanja vrednega izdajatelja v način samo za postopno objavljanje, tako da razkrit dolgotrajni žeton ne more izvesti `npm publish`
neposredno od nikoder — CI lahko samo pripravi postopno objavo; izdajo lahko izvede le lastnikova 2FA.

**Postopek za poškodovan artefakt (nespremenjen):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
je privzeti prvi ukrep (traja nekaj minut in je povraten); `npm unpublish` uporabite samo znotraj 72-urnega okna/brez odvisnih paketov
in nikoli kot prvi ukrep. Docker: nikoli ne prepišite oznake različice — povrnitev pomeni
preusmeritev oznake `latest` na zadnjo brezhibno zgoščeno vrednost.

**Docker Hub `latest` (obvezno ob vsaki objavi stabilne različice SemVer):**
potek dela `docker-publish` mora označiti **tako** `X.Y.Z` **kot**, kadar
`should-promote-latest.sh` potrdi, da gre za najvišjo stabilno različico SemVer, `:latest`
z **isto zgoščeno vrednostjo**. Po opravilu: zgoščena vrednost oznake `latest` v Hubu se ujema z zgoščeno vrednostjo nove
različice SemVer, vrednost `last_updated` pa je posodobljena. Oznake `:latest` ne pustite na starejši
gradnji, medtem ko opombe ob izdaji omenjajo popravke, ki obstajajo samo v gitu. Hitri začetni primeri za Compose
uporabljajo `:latest`; GitOps naj še naprej pripenja `X.Y.Z`. Glejte
[Kanali izdaj Docker](../guides/DOCKER_GUIDE.md#release-channels) in #10317.

## Hitra pot za nujne popravke (oznaka `hotfix`)

PR z oznako `hotfix` preskoči obsežno matriko CI (9-delni E2E, preverjanje pokritosti,
quality-gate, quality-extended) in ohrani hitra preverjanja z visoko signalno vrednostjo: gradnjo,
dele enotskih testov, integracijske teste, vitest, lint/preverjanje tipov, docs-sync, `check:pack-artifact`
in zagonski preizkus tarballa (`check:pack-boot`). Cilj: uspešen rezultat v ≤15 min namesto v ~33 min.

**Pravila za vstop — zahtevani so vsi štirje pogoji (po vzoru nujnih poti Chromium/VS Code/Node):**

1. **Resnost**: produkcija je okvarjena — objavljeni artefakt se ob zagonu sesuje /
   varnostni popravek / prizadet je vsak uporabnik izdaje. »Pomembno« ne pomeni »okvarjeno«.
2. **Pooblastilo**: oznako `hotfix` lahko doda samo lastnik repozitorija. Oznaka JE
   odobritev — na kampanjskem PR-ju je nikoli ne dodajajte sami.
3. **Dokazila**: telo PR-ja vsebuje povezavo do prejšnjega v celoti uspešnega obsežnega izvajanja (zbirke,
   ki bi jo preskočena opravila ponovno preverila) ter testa samega popravka, ki je najprej spodletel in nato uspel.
4. **Obseg**: izključno cherry-pick — minimalni popravek, brez refaktoriranja in brez spremljevalnih sprememb.

Preskočena površina pokritosti/preverjanja pragov se ponovno preveri ob naslednjem polnem izvajanju na
veji izdaje (neprekinjeno uspešno stanje izdaje) — ta pot preskoči ČAKANJE, nikoli pa preverjanja.
Spremembe, ki zadevajo samo teste (vse datoteke pod `tests/`, nobena pod `tests/e2e/`), samodejno
preskočijo matriko E2E brez kakršne koli oznake.

## Podroben kontrolni seznam

### Pred izdajo

- [ ] Vsi PR-ji, namenjeni tej izdaji, so združeni v `release/vX.Y.0`
- [ ] Vsi odprti elementi v Linearju oziroma težave za to različico so zaprti ali prestavljeni v naslednji mejnik
- [ ] CI je uspešen na veji `release/vX.Y.0`
- [ ] V kodi ni oznak `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Osnovna slika Docker je posodobljena (trenutno `node:24.15.0-trixie-slim`)

### Različica in dnevnik sprememb

- [ ] Zaženite `/version-bump-cc <patch|minor|major>` (veščina Claude Code)
  - Poviša različico v `package.json`, `electron/package.json`
  - Znova ustvari `CHANGELOG.md` iz potrditev git od zadnje oznake
  - Posodobi značke v README.md
- [ ] Ročno preglejte CHANGELOG.md in po potrebi popravite sporočila potrditev
- [ ] Zagotovite, da je najnovejši razdelek semver v `CHANGELOG.md` enak različici v `package.json`
- [ ] Ohranite `## [Unreleased]` kot prvi razdelek dnevnika sprememb za prihajajoče delo
- [ ] Posodobite `docs/openapi.yaml` → `info.version` mora biti enak različici v `package.json`

### Kakovost kode

- [ ] `npm run lint` — 0 napak (opozorila že obstajajo)
- [ ] `npm run typecheck:core` — brez napak
- [ ] `npm run typecheck:noimplicit:core` — brez napak (strogo)
- [ ] `npm run check:cycles:ratchet` — znotraj zamrznjene zgornje meje `metrics.cycles` (goli `check:cycles` se ob vsakem ciklu konča s kodo 1, #15281)
- [ ] `npm run check:any-budget:t11` — znotraj omejitve
- [ ] `npm run check:route-validation:t06` — brez napak
- [ ] `npm run check:node-runtime` — dosežena je najnižja podprta različica izvajalnega okolja (`>=22.22.2 <23`, `>=24.0.0 <27`, skladno s `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; usklajeno z `engines` v `package.json`)

### Testiranje

- [ ] `npm run test:unit` — uspešno
- [ ] `npm run test:vitest` — uspešno (strežnik MCP, autoCombo, predpomnilnik)
- [ ] `npm run test:coverage` — prag 60/60/60/60 dosežen (stavki/vrstice/funkcije/veje)
- [ ] `npm run test:integration` — uspešno (če spremembe posegajo v podatkovno zbirko/obdelovalnike)
- [ ] `npm run test:combo:matrix` — uspešno (matrika kombiniranih strategij: deterministično dokaže odločitve izbire vseh 21 javnih strategij usmerjanja; zaženite ob posegih v kombinirano usmerjanje, razreševanje strategij ali nadomestno logiko)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **izbirno/ročno** (omejen preizkus z resničnimi nadrejenimi sistemi; pridobi posnetek podatkovne zbirke samo za branje iz VPS `root@192.168.0.15`; uporablja resnične ponudnike in porablja dobroimetje; nikoli se ne izvaja v CI; brez omogočitve se pravilno preskoči)
- [ ] `npm run test:combo:live:vps` — **izbirno/ročno** (preizkus VPS v živo 3. faze: 7 scenarijev HTTP proti strežniku `.15` v živo prek navadnega Node ESM; zahteva `ssh root@192.168.0.15`; ustvari/izbriše samo kombinacije `__live_test__*`; uporablja resnične ponudnike; nikoli se ne izvaja v CI)
- [ ] `npm run test:e2e` — uspešno (spremembe uporabniškega vmesnika)
- [ ] `npm run test:protocols:e2e` — uspešno (spremembe MCP/A2A)
- [ ] `npm run test:ecosystem` — uspešno

### Kavlji (preverjeni s Huskyjem)

Kavlji Husky so v `.husky/` in se samodejno izvedejo med operacijami git.

- **pred potrditvijo:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pred pošiljanjem:** hitra deterministična preverjanja — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namenoma izključuje `test:unit` (počasen; pokriva ga opravilo CI `test-unit`).
  - Pred pošiljanjem vej izdaje ročno zaženite `npm run test:unit`.

Če kavelj ne uspe: odpravite osnovno težavo in ga ne zaobidite z `--no-verify`.

### Konvencionalne potrditve

Vse potrditve, namenjene izdaji, morajo upoštevati obliko `type(scope): subject`.

**Veljavne vrste:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Veljavni obsegi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Prelomne spremembe: dodajte nogo `BREAKING CHANGE:` ali `!` za obsegom (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` je uspešen (samodejno ga zažene kavelj pred potrditvijo)
- [ ] `npm run check:docs-all` je uspešen (krovno preverjanje: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` se konča s kodo 0 — pogodba okolja med kodo ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je nespremenjena
- [ ] `npm run check:doc-links` se konča s kodo 0 — po prestrukturiranju ni pokvarjenih notranjih sklicev Markdown
- [ ] `docs/architecture/ARCHITECTURE.md` je pregledan glede odstopanj v shranjevanju/izvajalnem okolju
- [ ] `docs/guides/TROUBLESHOOTING.md` je pregledan glede odstopanj spremenljivk okolja in delovanja
- [ ] Če je bila datoteka `.env.example` spremenjena: `docs/reference/ENVIRONMENT.md` je posodobljen
- [ ] Če ima nova funkcionalnost uporabniški vmesnik: omenjena je v `docs/guides/USER_GUIDE.md`
- [ ] Če ima nova funkcionalnost API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` sta posodobljena
- [ ] Če je nova funkcionalnost modul: obstaja namenska datoteka `docs/<MODULE>.md`
- [ ] Če gre za prelomno spremembo: `docs/guides/TROUBLESHOOTING.md` vsebuje opombo o selitvi

### i18n

- [ ] `npm run i18n:check` se konča s kodo 0 — stanje prevodov (`.i18n-state.json`) je usklajeno z izvorno dokumentacijo (v strogem načinu ni spremenjenih izvorov; opozorilni način je sprejemljiv za popravke dokumentacije tik pred izdajo, vendar mora biti rezultat pred označevanjem 0)
- [ ] `npm run i18n:check-ui-coverage` se konča s kodo 0 — vsaka področna nastavitev uporabniškega vmesnika dosega ali presega prag 80-odstotne pokritosti
- [ ] `npm run i18n:sync-ui:dry` poroča o 0 manjkajočih ključih v vseh 66 ciljnih področnih nastavitvah (vseh razen izvorne `en`)
- [ ] Če se je spremenila izvorna angleška dokumentacija, pred označevanjem zaženite `npm run i18n:run` (zahteva `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Prispevke k prevodom je mogoče prestaviti v naslednjo izdajo, če so manjši (zabeležite jih v CHANGELOG)

### Selitve podatkovne zbirke

- [ ] Če so v `src/lib/db/migrations/` nove datoteke:
  - [ ] Vsaka selitev je idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Selitve so ovite v transakcije
  - [ ] Pravilno so oštevilčene (brez vrzeli v zaporedju)
- [ ] Preizkusite na sveži namestitvi: izbrišite `~/.omniroute/omniroute.db` in zaženite `npm run dev`
- [ ] Preizkusite na obstoječi namestitvi: varnostno kopirajte podatkovno zbirko, izvedite selitev in preverite shemo
- [ ] Datoteke WAL (`-wal`, `-shm`) so pravilno obravnavane, če selitev prepisuje tabele

### Katalog ponudnikov (preverjen z Zod)

- [ ] Shema Zod v `src/shared/constants/providers.ts` je veljavna ob nalaganju
  - [ ] Vsi ponudniki imajo zahtevana polja (`id`, `label`, `kind` itd.)
  - [ ] Za nove brezplačne ponudnike je podan `freeNote`
  - [ ] Ponudniki OAuth imajo `oauthConfig` registriran v `src/lib/oauth/constants/oauth.ts`
- [ ] Če je dodan nov ponudnik: ustrezen izvajalnik v `open-sse/executors/`
- [ ] Če oblika ni OpenAI: prevajalnik v `open-sse/translator/`
- [ ] Modeli so registrirani v `open-sse/config/providerRegistry.ts`
- [ ] Testi enot v `tests/unit/` pokrivajo razvrščanje ponudnikov in usmerjanje

### Namizna aplikacija (Electron)

Če je bila mapa `electron/` spremenjena:

- [ ] `npm run electron:smoke:packaged` uspešno prestane
- [ ] Gradnje so preizkušene za vsaj enega od `:win`, `:mac`, `:linux`
- [ ] Potrdila za podpisovanje kode niso potekla (če se uporablja podpisovanje)
- [ ] Različica v `electron/package.json` se ujema s korenskim `package.json`
- [ ] Kazalec kanala za samodejne posodobitve je posodobljen, če se izdaja v `stable`

### Razporeditev gradnje

Repozitorij uporablja tri ločene izhodne imenike — nikoli jih ne zamešajte:

| Imenik    | Namen                                                     | Sleden?            |
| --------- | --------------------------------------------------------- | ------------------ |
| `src/`    | Izvorna koda aplikacije (TypeScript / TSX)                | Da                 |
| `.build/` | Vmesni rezultati gradnje — izhod `next build` (`distDir`) | Ne (prezrt v gitu) |
| `dist/`   | Dobavljivi paket npm — sestavi ga `assembleStandalone`    | Ne (prezrt v gitu) |

> **Opomba za operaterja:** imenik slike na oddaljenem VPS ostaja `/usr/lib/node_modules/omniroute/app/`.
> Premaknjen je bil samo izhod gradnje **znotraj repozitorija** (`app/` → `dist/`). Veščine za uvedbo z rsync
> prenesejo vsebino `dist/` v oddaljeni imenik `app/` — spremembe poti na VPS niso potrebne.

**Potek ene gradnje:**

```
npm run build:release
  └─ rm -rf .build dist          (čiščenje)
  └─ next build → .build/next/   (vmesni rezultati)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (kontrolna oznaka HEAD)
```

Za uvedbo NE zaženite `npm run build`, ki mu sledi ločen `npm run build:cli` — uporabite
`npm run build:release`, ki z enim ukazom izvede čisto ponovno gradnjo in ustvari kontrolno oznako.

### Preverjanje artefakta

- [ ] `npm run build:release` uspe in `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` je čist — brez `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ali drugih lokalnih ostankov
- [ ] `dist/server.js` obstaja po gradnji
- [ ] Izbirni lokalni hitri preizkus zapakiranega izvajalnega okolja: `npm run dev:candidate -- validate` po `npm run dev:candidate -- build` zažene zapakirani tarball z izoliranim `DATA_DIR` ter preveri `/api/health` + `/v1/models` (glejte [Zlata pot prispevanja](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Označevanje in izdaja

- [ ] Zaženite `/generate-release-cc` (veščina Claude Code):
  - Ustvari oznako `vX.Y.Z`
  - Potisne oznako in vejo
  - Odpre izdajo GitHub z dnevnikom sprememb v telesu
  - Priloži namestitvene programe Electron (če so bili zgrajeni)
- [ ] Ali ročno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Uvedba

Veščine za uvedbo uporabljajo lahek potek rsync — brez `npm pack` in brez `npm i -g`:

- [ ] Uporabite veščino za uvedbo, ki ustreza cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Pred uvedbo potrdite, da je `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Gradnja se mora izvajati tam, kjer je `node_modules` pravi imenik (glavna delovna kopija ali delovno drevo, v katerem je bil izveden `npm ci` — NE delovno drevo s simbolno povezavo)
- [ ] Izvedite hitri preizkus uvedenega primerka:
  - Odprite `/dashboard/health` → preverite, ali se niz različice ujema z izdajo
  - Izvedite zahtevo `/v1/chat/completions` pri znanem ponudniku
  - Preverite, ali `/api/monitoring/health` vrne odklopnike stanja `CLOSED`
  - Potrdite, da se transporti MCP odzivajo (`/mcp` HTTP, `/mcp-sse` SSE)

### Po izdaji

- [ ] Zaženite `/capture-release-evidences-cc` (veščina Claude Code)
  - Zajame posnetke zaslona/posnetke novih funkcij v obliki WebP
  - Priloži jih opombam ob izdaji / objavi v spletnem dnevniku
- [ ] Posodobite GitHub Discussions / Discord z obvestilom o izdaji
- [ ] Odprite mejnik za naslednjo različico
- [ ] Če je kritično: pripnite razpravo ali objavite v `news.json` za pasico v aplikaciji

### Kontrolna točka za javno uvedbo Radarja

Obvestilo Radar je namenoma potrjeno z `active: false`. Aktivacija je ločena
sprememba, izvedena šele po predložitvi dokazov za vsako spodnjo postavko:

- [ ] Vsi zaporedno naloženi PR-ji za Radar so združeni in CI na konici izdaje je uspešen
- [ ] Uvedite in hitro preizkusite odprtokodne poti Radar, pri čemer je `RADAR_ENABLED` privzeto še vedno izklopljen
- [ ] Hitro preizkusite `GET /planos`, `/termos`, `/privacidade` in `/reembolso` na določenem gostitelju Radar
- [ ] V zasebni storitvi zabeležite identiteto/kontakt/naslov operaterja in pravni pregled, ki ga je odobril lastnik
- [ ] Stripe Checkout in podpisani webhook preizkusite samo v preizkusnem načinu
- [ ] Preizkusite eno šifrirano dostavo transakcijskega e-poštnega sporočila z odobrenim pošiljateljem/domeno
- [ ] Dokažite obnovitev varnostne kopije in eno nadzorovano raziskovalno izvajanje z omejenim proračunom
- [ ] Pred sprejemanjem dokazil o donacijah odobrite pravilnik pregleda BRL/PIX
- [ ] Javni Checkout omogočite šele po uspešno opravljenih predhodnih kontrolnih točkah, nato pa aktivirajte novi ID v `news.json`
- [ ] Preverite, ali domača pasica uporablja lokalizirano besedilo in ali se novi ID znova prikaže po opustitvi starejšega ID-ja

## Hitri preizkus vgrajenih storitev (v3.8.4+)

Pred izdajo katere koli različice, ki vključuje spremembe vgrajenih storitev, preverite:

### Zagon s svežo zbirko podatkov (odkrije kolizije migracij — dodano po hitrem popravku v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počakajte 10 s na zagon
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrne `"9router"` (NE 404, NE 500). Potrjuje, da je bila migracija `071_services.sql` izvedena in vrstica dodana.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrne 3 vrstice.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrne 2 vrstici (potrjuje, da je bila migracija `070_webhooks_kind_metadata.sql` izvedena).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` uspe — ščiti pred prihodnjimi kolizijami.

### 9Router

- [ ] `POST /api/services/9router/install` vrne 200 z `installedVersion` v manj kot 2 min
- [ ] `POST /api/services/9router/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/9router/status` poroča `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` vrne 200 (usmerjanje od začetka do konca prek 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` prikaže izvorni uporabniški vmesnik 9Router znotraj posredniškega strežnika (brez neposrednega okvirja iframe z `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrne `{ keyRotated: true }` in storitev se brez težav znova zažene
- [ ] `POST /api/services/9router/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrne tok SSE z dogodkom `snapshot`, ki vsebuje nedavne vrstice
- [ ] Namestitev v okolju brez `npm` v PATH vrne 500 s prijaznim sporočilom o napaki (brez sledi sklada)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrne 200 v manj kot 2 min
- [ ] `POST /api/services/cliproxy/start` vrne 200 in `state: "running"` v manj kot 30 s
- [ ] `GET /api/services/cliproxy/status` poroča `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrne 200 in `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrne tok SSE

### Varnostna regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrne `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrne `403 LOCAL_ONLY`
- [ ] Odzivi z napakami iz `/api/services/*` ne vsebujejo `err.stack` ali absolutnih poti datotek

## Preverjanja za v3.8.0+

Pred izdajo katere koli različice v3.8.x preverite še naslednje:

- [ ] `omniroute --tray` se zažene v sistemu macOS (systray2 je nameščen v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se zažene v sistemu Linux (zahteva DISPLAY; prijazna napaka, če ni nastavljen)
- [ ] `omniroute --tray` se zažene v sistemu Windows (PowerShell NotifyIcon, brez dodatnih binarnih datotek)
- [ ] `omniroute config tray enable` ustvari vnos za samodejni zagon; onemogočanje ga odstrani
- [ ] `npm install -g omniroute@<this-version>` izvede postinstall brez usodnega izhoda
- [ ] Pot posodobitve ohrani izbirne odvisnosti: `omniroute update --apply` in samodejni posodabljalnik
      izvajata `npm install -g … --include=optional`, tako da `optionalDependencies` (better-sqlite3,
      keytar, tls-client in sklad SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) preživijo posodobitev. Raven SLM ultra `modelPath` potrebuje tudi model
      tinybert, ki se ob prvi uporabi samodejno prenese v `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) nato izbirno zaprtje SLM namesti skupaj v
      `dist/node_modules`, tako da izvajalec razreši EN SAM primerek `@huggingface/transformers` ^4.2.0
      — samostojna sled vsebuje samo transformers, ne pa tudi dinamično uvoženih
      izbirnih odvisnosti, zato bi izvajalec brez tega naložil llmlingua-2 s korenskim transformers,
      raven SLM pa bi ob napaki neopazno nadaljevala brez stiskanja.
- [ ] `omniroute status` deluje brez `.env` (pot žetona CLI, samo povratna zanka)
- [ ] `curl http://localhost:20128/api/shutdown` vrne 401 (vedno zaščitena pot)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrne 401 (zaščita povratne zanke)
- [ ] Izvajalno okolje SQLite se ob prvem zagonu razreši v `bundled` (priložena binarna datoteka je veljavna za platformo)
- [ ] Izvajalno okolje SQLite preklopi na `runtime`, ko je `node_modules/better-sqlite3` izbrisan
- [ ] Pametni filter MCP stisne dejanski izhod `playwright-mcp browser_snapshot` (≥50-% zmanjšanje)
- [ ] Vseh 10 datotek `skills/omniroute*/SKILL.md` je javno dostopnih prek neobdelanega URL-ja GitHub
- [ ] Čarovnik za uvajanje pri sveži namestitvi prikaže korak predstavitve ravni »Kako deluje«
- [ ] Gradnik pokritosti ravni na domači nadzorni plošči prikaže število konfiguriranih/aktivnih ravni

---

## Izdaja 3.9.0 LTS (preizkušena v 3.8.58)

Po v3.8.59 je naslednja različica 3.9.0, njen vrh pa postane izhodišče za dve dolgoročni veji:
`stable/v3` (linija v3 LTS, npm `latest`) in `develop` (v4, zvišana na 4.0.0, npm
`nightly`). Model vej/kanalov, prenos sprememb naprej in oznake so opisani v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); načrt je v dokumentu [ROADMAP](../../ROADMAP.md) (3. faza). Izdaja se izvede enkrat;
3.8.58 jo v celoti preizkusi na razcepu, 3.8.59 pa se zaključi s
[seznamom preverjanj GO/NO-GO](./LTS_GO_NO_GO.md).

### Poskusni zagon (samo za branje, vedno varen)

```bash
npm run release:dry-run-lts-cut                       # dejanska izdaja: 3.9.0 iz HEAD, prejšnja oznaka v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pripni izvorno potrditev
```

`scripts/release/dry-run-lts-cut.mjs` ne izvede ničesar: bere podatke iz git in `gh` ter izpiše
celotno zaporedje — predpogoje (izvor je mogoče razrešiti, izvorni repozitorij ima celotno zgodovino —
plitvi klon ne more potisniti veje `stable/v3`, saj prejemna stran zavrne paket pri prvem
cepljenem nadrejenem elementu, zato izdajo izvedite iz polnega klona ali najprej zaženite
`git fetch --unshallow origin` — prejšnja oznaka obstaja, `package.json` vsebuje ciljno različico,
odprta je težava `release-freeze`, na obstoječi izdajni veji ni odprte težave
`Release branch not green` — veja, ki ne obstaja, je prikazana kot neznana `?`, nikoli
kot zelena — čakalna vrsta Mergify `release` je konfigurirana (G11: `queue_rules`, `checks_timeout`,
oznaka `queue`), nabor pravil `release/*` še vedno preprečuje brisanje in vsiljeno potiskanje ter
veji `stable/v3` in `develop` še ne obstajata), koraka za obe veji, kateri sprožilci nedejavnih
delovnih tokov in pogoji `if:` postanejo izpolnjeni (ter kateri ostanejo omejeni s spremenljivko
repozitorija ali pripeti na kanonični repozitorij), pričakovane oznake distribucije (`latest` → 3.9.0,
`next` in `nightly` sta prazni) ter povrnitev. Izhodna koda `0` = `RESULT: READY`, `1` = blokirajoči
predpogoj ni izpolnjen (`✗`), `2` = napaka pri uporabi. `--advisory <id,...>` spremeni preverjanje
v opozorilo (`!`), ne da bi ga skril.

Poskusni zagon dejanske izdaje izvedite, ko je zamrznitev izdaje 3.9.0 še vedno aktivna — veje se
ustvarijo po oznaki in preden faza 12c odpravi zamrznitev.

### Preizkus z različico 3.8.58 (samo na razcepu)

```bash
# 1. Poskusni zagon na trenutnem vrhu s parametri preizkusa
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Izvedba na oddaljenem RAZCEPU (origin oziroma vsak oddaljeni repozitorij, katerega URL
#    je kanonični repozitorij, je zavrnjen; vsak korak zahteva potrditev v terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Preizkus nedejavnih delovnih tokov v razcepu (workflow_dispatch tam, kjer poskusni zagon
#    sporoči pripetje na kanonični repozitorij), nato povrnitev
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Potrditev zvišanja različice na veji develop je ustvarjena z nizkonivojskimi orodji git (delovno drevo
ostane nedotaknjeno) in zviša različico v istih petih datotekah kot potrditev začetka cikla:
`package.json`, `open-sse/package.json`, `electron/package.json`, `package-lock.json` in
`docs/openapi.yaml`. Razdelek `[4.0.0]` v dnevniku CHANGELOG in njegove zrcalne različice i18n
se nato odprejo na veji `develop`, še pred njeno prvo zahtevo PR. Skript nikoli ne spremeni
oznak distribucije npm — preizkusite jih na začasnem paketu.

### Artefakt predogleda PR (zgradite enkrat, promovirajte iste bajte)

`.github/workflows/preview-artifact.yml` iz vrha zahteve PR zgradi en produkcijski arhiv tar in
preveri točno to gradnjo (del (a) težave #8084). Podprte so samo zahteve PR iz istega
repozitorija; nič se ne objavi.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # ali dodajte oznako `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # namestitev predogleda
```

Zagon izvede `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zapakira arhiv tar,
zažene `npm run check:pack-boot` (lažne skrivnosti, kratkotrajen imenik s podatki), ga znova
zapakira in ne uspe, če izvlečka nista enaka, nato pa zabeleži `artifact-identity.json` (SHA vrha,
SHA osnove, zgoščena vrednost zaklepne datoteke, platforma, arhitektura, ABI okolja node,
pakirnik, pravilnik gradnje — `scripts/release/artifact-identity.mjs`) ter v ločenem opravilu
potrdi izvor arhiva tar. Promoviranje predogleda pomeni namestitev tega arhiva tar: nikoli ga
znova ne zgradite iz izvorne kode.

### Izdaja (3.9.0, po odločitvi GO)

1. Odločitev GO je zabeležena v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` izpiše `RESULT: READY`.
3. Veji na `origin` ustvarite ročno z ukazi, ki jih izpiše poskusni zagon — skript zavrne
   potiskanje na `origin`. Če želite ponovno uporabiti pregledano potrditev za vejo develop,
   najprej izvedite preizkus z možnostjo `--execute` na vrhu različice 3.9.0 proti svojemu
   razcepu; izpiše oba SHA, iste potrditve pa lahko nato potisnete:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zaščitite `stable/v3` in `develop` (nabori pravil + čakalna vrsta za združevanje), preden se združi prvi PR.
5. Neaktivni delovni tokovi se vklopijo ob obstoju veje: `forward-port.yml` (potisk v
   `stable/v3`), `validate-stable-pr.yml` (PR-ji za `stable/v3`) in `nightly-v4-build.yml`
   (gradnje veje `develop`). Pred uvedbo nastavite skrivnost repozitorija `secrets.FORWARD_PORT_TOKEN` (da se CI izvaja za
   PR-je za prenos sprememb naprej); nočno objavljanje ostane izklopljeno, dokler lastnik ne nastavi spremenljivke repozitorija
   `vars.NIGHTLY_PUBLISH` na `true` in npm Trusted Publishing ne sprejme
   `nightly-v4-build.yml`. Razreševanje kanala izvaja `scripts/release/dist-tag.mjs`, isti
   razreševalnik, ki ga uporablja `npm-publish.yml`.
6. Preverite kanale: `npm view omniroute dist-tags --json` prikaže `latest` = 3.9.0 in brez
   `next` / `nightly`, dokler ni objavljena različica v4.
7. Povrnitev, če je potrebna: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   in `npm dist-tag add omniroute@3.8.59 latest`.

---

## Povrnitev na prejšnjo različico

Če ima izdaja kritično težavo:

1. `gh release edit vX.Y.Z --prerelease` (označi izdajo kot ne-najnovejšo)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo če je uporabniki še niso prevzeli)
3. Ali: hitri popravek na `release/vX.Y.0` → popravljalna izdaja `vX.Y.(Z+1)`
4. Nemudoma obvestite uporabnike v GitHub Discussions in Discordu

## Stroga pravila

- Nikoli ne potrjujte sprememb neposredno v `main`
- Nikoli ne uporabite `git push --force` za veje `main` ali `release/*`
- Nikoli ne preskočite kavljev Husky (`--no-verify`)
- Nikoli ne potrdite skrivnosti, poverilnic ali datotek `.env`
- Pokritost mora ostati ≥60/60/60/60 (stavki/vrstice/funkcije/veje)
- Pri spreminjanju produkcijske kode v `src/`, `open-sse/`, `electron/` ali `bin/` vedno vključite ali posodobite teste

## Samodejno preverjanje sinhronizacije

Preden odprete PR, lokalno zaženite varovalo za sinhronizacijo dokumentacije:

```bash
npm run check:docs-sync
```

CI to preverjanje izvaja tudi v `.github/workflows/ci.yml` (opravilo za lintanje).
