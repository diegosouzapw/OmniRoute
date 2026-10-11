# Release Checklist (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Posljednje ažuriranje:** 2026-08-28 — v3.8.51
> Pojednostavljen tok izdanja koji koristi vještine Claude Codea za automatizaciju.
>
> **Održavajte red čekanja/granu zelenom između izdanja:** pogledajte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` porodica + `npm run check:release-green` + `/babysit` + noćno pokretanje). Periodično pokretanje
> ovoga — a naročito **prije** ove kontrolne liste — osigurava da PR izdanja započne zeleno.

## Ukratko

```bash
# 1. Povećajte verziju + generišite CHANGELOG (vještina)
/version-bump-cc patch    # ili minor/major

# 2. Lokalno pokrenite provjeru kvaliteta
npm run check              # lintanje + testovi
npm run test:coverage      # potpuna provjera pokrivenosti (60/60/60/60)

# 3. Izgradite i obavite osnovnu provjeru
npm run build
npm run test:e2e           # opcionalno, ali preporučeno

# 4. Generišite izdanje (vještina)
/generate-release-cc

# 5. Izvršite implementaciju (vještina)
/deploy-vps-both-cc        # ili akamai-cc / local-cc

# 6. Prikupite dokaze o izdanju (vještina)
/capture-release-evidences-cc
```

## npm Trusted Publishing (zadano od v3.8.51) — etapno na zahtjev, direktno kao rezervna opcija

`npm-publish.yml` zadano objavljuje putem **npm Trusted Publishinga (OIDC)**: zadatak
`stage-npm` (koji hostuje GitHub) razmjenjuje GitHubov id-token za kratkotrajnu npm
vjerodajnicu za to pokretanje — bez dugotrajnog npm tokena u tajnama repozitorija, bez 2FA upita, uz priložene podatke o porijeklu.
To je zaobilazni način koji npm odobrava sada kada se povlače tokeni koji preskaču 2FA;
vraća potpuno automatizovani tok koji je projekat imao do v3.8.48, uz zadržavanje
WS1.3 garancije (procurjeli token ne može samostalno izvršiti objavljivanje — token ne postoji).

**Jednokratno postavljanje (vlasnik):** npmjs.com → paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlasnik `diegosouzapw`, repozitorij `OmniRoute`, radni tok `npm-publish.yml`
(okruženje: nema). Dok to ne bude postavljeno, automatski korak neće uspjeti i prikazat će `ENEEDAUTH`:
ponovo ga pokrenite s `publish_mode=staged` (ispod) ili `direct`.

### Etapno objavljivanje (na zahtjev — `publish_mode=staged`)

Radni tok npm-publish više ne objavljuje direktno: pokreće zapakovanu tarball arhivu
(`check:pack-boot`), a zatim izvršava `npm stage publish` — tačni bajtovi se pohranjuju u
registru, ali ih **nije moguće instalirati** dok vlasnik ne odobri. Ljudska 2FA provjera pomjerena je
NAKON dokaza, a ne prije njega.

**Tok za vlasnika nakon što radni tok postane zelen:**

1. `npm stage list omniroute` — pronađite ID etape (ispisuje se i u sažetku radnog toka).
2. Provjerite etapno pohranjene bajtove (preporučeno): `npm stage download <id>`, zatim instalirajte
   preuzetu tarball arhivu u privremeni prefiks i pokrenite je (`npm run check:pack-boot` automatizuje
   istu provjeru pakovanje→instalacija→pokretanje u CI-ju).
3. `npm stage approve <id>` — 2FA upit JESTE objavljivanje. `npm stage reject <id>` odbacuje etapu.
4. Zaštita nakon objavljivanja: verifikator nakon objavljivanja (WS1.4 plana za v3.8.49) instalira
   objavljenu verziju iz javnog registra u čistom kontejneru i pokreće je.

**Rezervna opcija za hitne slučajeve:** `workflow_dispatch` s `publish_mode=direct` vraća
naslijeđeno trenutno `npm publish` objavljivanje (koristite samo ako samo etapno objavljivanje ne radi ispravno; zabilježite razlog).

**Jednokratno pooštravanje sigurnosti (vlasnik, npmjs.com):** konfigurišite Trusted Publisher za
`omniroute` u režimu samo za etapno objavljivanje, tako da procurjeli dugotrajni token ne može izvršiti `npm publish`
direktno ni s jedne lokacije — CI može samo pripremiti etapu; samo vlasnikov 2FA može objaviti izdanje.

**Procedura za neispravne artefakte (nepromijenjena):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
kao zadana prva reakcija (traje nekoliko minuta, reverzibilno je); `npm unpublish` samo unutar perioda od 72 sata/bez zavisnih paketa
i nikada kao prvi potez. Docker: nikada nemojte prepisivati oznaku verzije — vraćanje na prethodno stanje znači
preusmjeravanje oznake `latest` na posljednji ispravan digest.

**Docker Hub `latest` (obavezno pri svakom objavljivanju stabilne SemVer verzije):**
radni tok `docker-publish` mora označiti **i** `X.Y.Z` i, kada
`should-promote-latest.sh` potvrdi da je to najviša stabilna SemVer verzija, `:latest`
**istim digestom**. Nakon zadatka: digest oznake `latest` na Hubu jednak je digestu nove
SemVer verzije i vrijednost `last_updated` je ažurirana. Nemojte ostavljati `:latest` na starijoj
izgradnji dok bilješke o izdanju govore o ispravkama koje postoje samo u gitu. Compose
upute za brzo pokretanje koriste `:latest`; GitOps bi trebao nastaviti vezivati verzije na `X.Y.Z`. Pogledajte
[Docker kanale izdanja](../guides/DOCKER_GUIDE.md#release-channels) i #10317.

## Ubrzana traka za hitne ispravke (oznaka `hotfix`)

PR označen s `hotfix` preskače opsežnu CI matricu (E2E s 9 dijelova, prag pokrivenosti,
quality-gate, quality-extended) i zadržava brze provjere s visokim signalom: izgradnju,
dijelove jediničnih testova, integracijske testove, vitest, lint/provjeru tipova, docs-sync, `check:pack-artifact`
i provjeru pokretanja tarball paketa (`check:pack-boot`). Cilj: uspješan rezultat za ≤15 min umjesto ~33 min.

**Pravila za pristup — sva četiri uslova su obavezna (po uzoru na hitne trake projekata Chromium/VS Code/Node):**

1. **Ozbiljnost**: produkcija ne radi — objavljeni artefakt se ruši pri pokretanju /
   sigurnosna ispravka / pogođen je svaki korisnik izdanja. „Važno” ne znači „ne radi”.
2. **Ovlaštenje**: samo vlasnik repozitorija primjenjuje oznaku `hotfix`. Oznaka JESTE
   odobrenje — nikada je nemojte samostalno primjenjivati na PR kampanje.
3. **Dokazi**: tijelo PR-a sadrži poveznicu na prethodno potpuno uspješno opsežno izvršavanje (skup testova koji bi
   preskočeni poslovi ponovo validirali), kao i vlastiti test ispravke koji prvo ne prolazi, a zatim prolazi.
4. **Opseg**: isključivo cherry-pick — minimalna ispravka, bez refaktorizacije i bez usputnih izmjena.

Preskočena površina pokrivenosti/praga ponovo se validira pri sljedećem potpunom izvršavanju na
grani izdanja (kontinuirano uspješno stanje izdanja) — traka preskače ČEKANJE, nikada validaciju.
Izmjene koje obuhvataju samo testove (sve datoteke unutar `tests/`, nijedna unutar `tests/e2e/`) automatski preskaču E2E
matricu, bez ikakve oznake.

## Detaljna kontrolna lista

### Prije izdanja

- [ ] Svi PR-ovi namijenjeni ovom izdanju spojeni su u `release/vX.Y.0`
- [ ] Sve otvorene Linear/stavke problema za ovu verziju zatvorene su ili premještene u sljedeću prekretnicu
- [ ] CI je uspješan na grani `release/vX.Y.0`
- [ ] Nema oznaka `TODO(release)` u kodu: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Osnovna Docker slika je ažurirana (trenutno `node:24.15.0-trixie-slim`)

### Verzija i dnevnik izmjena

- [ ] Pokrenite `/version-bump-cc <patch|minor|major>` (Claude Code vještina)
  - Povećava verziju u `package.json`, `electron/package.json`
  - Ponovo generiše `CHANGELOG.md` iz git commitova od posljednje oznake
  - Ažurira značke u README.md
- [ ] Ručno pregledajte CHANGELOG.md i po potrebi uredite poruke commitova
- [ ] Osigurajte da najnoviji semver odjeljak u `CHANGELOG.md` odgovara verziji u `package.json`
- [ ] Zadržite `## [Unreleased]` kao prvi odjeljak dnevnika izmjena za predstojeći rad
- [ ] Ažurirajte `docs/openapi.yaml` → `info.version` mora odgovarati verziji u `package.json`

### Kvalitet koda

- [ ] `npm run lint` — 0 grešaka (upozorenja su postojala ranije)
- [ ] `npm run typecheck:core` — bez grešaka
- [ ] `npm run typecheck:noimplicit:core` — bez grešaka (strogo)
- [ ] `npm run check:cycles` — nema kružnih zavisnosti
- [ ] `npm run check:any-budget:t11` — unutar budžeta
- [ ] `npm run check:route-validation:t06` — bez grešaka
- [ ] `npm run check:node-runtime` — zadovoljena je minimalna podržana verzija okruženja (`>=22.22.2 <23`, `>=24.0.0 <27`, prema `SUPPORTED_NODE_RANGE` u `src/shared/utils/nodeRuntimeSupport.ts`; usklađeno s `engines` u `package.json`)

### Testiranje

- [ ] `npm run test:unit` — prolazi
- [ ] `npm run test:vitest` — prolazi (MCP server, autoCombo, keš)
- [ ] `npm run test:coverage` — zadovoljen prag 60/60/60/60 (naredbe/linije/funkcije/grane)
- [ ] `npm run test:integration` — prolazi (ako izmjene obuhvataju bazu podataka / rukovaoce)
- [ ] `npm run test:combo:matrix` — prolazi (matrica kombinovanih strategija: deterministički dokazuje odluke o odabiru za svih 19 javnih strategija usmjeravanja; pokrenuti pri izmjenama kombinovanog usmjeravanja, razrješavanja strategija ili rezervne logike)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcionalno/ručno** (kontrolisana provjera na stvarnom uzvodnom sistemu; učitava snimak baze podataka samo za čitanje s VPS-a `root@192.168.0.15`; koristi stvarne pružaoce usluga i troši kredite; nikada se ne izvršava u CI-ju; uredno se preskače bez kontrolnog uslova)
- [ ] `npm run test:combo:live:vps` — **opcionalno/ručno** (provjera uživo VPS-a faze 3: 7 HTTP scenarija prema aktivnom `.15` serveru putem običnog Node ESM-a; zahtijeva `ssh root@192.168.0.15`; kreira/briše samo `__live_test__*` kombinacije; koristi stvarne pružaoce usluga; nikada se ne izvršava u CI-ju)
- [ ] `npm run test:e2e` — prolazi (izmjene korisničkog interfejsa)
- [ ] `npm run test:protocols:e2e` — prolazi (MCP/A2A izmjene)
- [ ] `npm run test:ecosystem` — prolazi

### Hookovi (validirani Huskyjem)

Husky hookovi nalaze se u `.husky/` i automatski se izvršavaju tokom git operacija.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** brze determinističke provjere — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namjerno isključuje `test:unit` (sporo; pokriveno CI poslom `test-unit`).
  - Ručno pokrenite `npm run test:unit` prije slanja grana izdanja.

Ako hook ne uspije: ispravite osnovni problem, nemojte ga zaobilaziti pomoću `--no-verify`.

### Konvencionalni commitovi

Svi commitovi namijenjeni izdanju moraju pratiti format `type(scope): subject`.

**Važeći tipovi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Važeći opsezi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Neusklađene izmjene: dodajte podnožje `BREAKING CHANGE:` ili `!` nakon opsega (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` prolazi (automatski se pokreće putem pre-commit hooka)
- [ ] `npm run check:docs-all` prolazi (objedinjena provjera: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` završava s kodom 0 — ugovor za varijable okruženja između koda ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` ostaje usklađen
- [ ] `npm run check:doc-links` završava s kodom 0 — nema neispravnih internih markdown referenci nakon restrukturiranja
- [ ] `docs/architecture/ARCHITECTURE.md` pregledan radi odstupanja u pohrani/pokretačkom okruženju
- [ ] `docs/guides/TROUBLESHOOTING.md` pregledan radi odstupanja u varijablama okruženja i operativnim postupcima
- [ ] Ako je `.env.example` promijenjen: `docs/reference/ENVIRONMENT.md` je ažuriran
- [ ] Ako nova funkcionalnost ima korisnički interfejs: spomenuta je u `docs/guides/USER_GUIDE.md`
- [ ] Ako nova funkcionalnost ima API: ažurirani su `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Ako je nova funkcionalnost modul: postoji namjenski dokument `docs/<MODULE>.md`
- [ ] Ako je promjena nekompatibilna s prethodnim verzijama: `docs/guides/TROUBLESHOOTING.md` sadrži napomenu o migraciji

### i18n

- [ ] `npm run i18n:check` završava s kodom 0 — stanje prijevoda (`.i18n-state.json`) usklađeno je s izvornom dokumentacijom (nema odstupanja izvora u strogom režimu; upozorenje u režimu upozorenja prihvatljivo je za izmjene dokumentacije u posljednjem trenutku, ali rezultat treba biti 0 prije označavanja izdanja)
- [ ] `npm run i18n:check-ui-coverage` završava s kodom 0 — svaki lokal korisničkog interfejsa doseže ili premašuje minimalnu pokrivenost od 80%
- [ ] `npm run i18n:sync-ui:dry` prijavljuje 0 ključeva koji nedostaju u sva 42 lokala
- [ ] Ako je izvorna dokumentacija na engleskom promijenjena, pokrenite `npm run i18n:run` (zahtijeva `OMNIROUTE_TRANSLATION_API_KEY` u `.env`) prije označavanja izdanja
- [ ] Doprinosi prijevodima mogu se odgoditi do sljedećeg izdanja ako su manji (evidentirati u CHANGELOG-u)

### Migracije baze podataka

- [ ] Ako `src/lib/db/migrations/` sadrži nove datoteke:
  - [ ] Svaka migracija je idempotentna (`CREATE TABLE IF NOT EXISTS`, itd.)
  - [ ] Migracije su obuhvaćene transakcijama
  - [ ] Ispravno su numerisane (bez praznina u slijedu)
- [ ] Testirajte na svježoj instalaciji: izbrišite `~/.omniroute/omniroute.db` i pokrenite `npm run dev`
- [ ] Testirajte na postojećoj instalaciji: napravite sigurnosnu kopiju baze podataka, pokrenite migraciju i provjerite shemu
- [ ] WAL datoteke (`-wal`, `-shm`) pravilno se obrađuju ako migracija ponovo zapisuje tabele

### Katalog pružalaca usluga (validiran pomoću Zoda)

- [ ] Zod shema u `src/shared/constants/providers.ts` valjana je pri učitavanju
  - [ ] Svi pružaoci usluga imaju obavezna polja (`id`, `label`, `kind`, itd.)
  - [ ] `freeNote` je naveden za nove besplatne pružaoce usluga
  - [ ] OAuth pružaoci usluga imaju `oauthConfig` registriran u `src/lib/oauth/constants/oauth.ts`
- [ ] Ako je dodan novi pružalac usluga: postoji odgovarajući izvršitelj u `open-sse/executors/`
- [ ] Ako format nije OpenAI: postoji prevodilac u `open-sse/translator/`
- [ ] Modeli su registrirani u `open-sse/config/providerRegistry.ts`
- [ ] Jedinični testovi u `tests/unit/` pokrivaju klasifikaciju pružalaca usluga i usmjeravanje

### Desktop (Electron)

Ako je `electron/` promijenjen:

- [ ] `npm run electron:smoke:packaged` prolazi
- [ ] Buildovi su testirani za najmanje jedan od `:win`, `:mac`, `:linux`
- [ ] Certifikati za potpisivanje koda nisu istekli (ako se koristi potpisivanje)
- [ ] Verzija u `electron/package.json` odgovara verziji u korijenskom `package.json`
- [ ] Pokazivač kanala za automatsko ažuriranje ažuriran je ako se izdaje na kanal `stable`

### Raspored build izlaza

Repozitorij koristi tri različita direktorija za izlaz — nikada ih nemojte pomiješati:

| Direktorij | Namjena                                                               | Prati se?       |
| ---------- | --------------------------------------------------------------------- | --------------- |
| `src/`     | Izvorni kod aplikacije (TypeScript / TSX)                             | Da              |
| `.build/`  | Međurezultati builda — izlaz naredbe `next build` (`distDir`)         | Ne (gitignored) |
| `dist/`    | npm paket spreman za distribuciju — sastavlja ga `assembleStandalone` | Ne (gitignored) |

> **Napomena za operatera:** direktorij slike na udaljenom VPS-u ostaje `/usr/lib/node_modules/omniroute/app/`.
> Premješten je samo build izlaz **unutar repozitorija** (`app/` → `dist/`). Deploy vještine putem rsynca kopiraju
> sadržaj direktorija `dist/` u udaljeni direktorij `app/` — nisu potrebne promjene putanja na VPS-u.

**Tok jednog builda:**

```
npm run build:release
  └─ rm -rf .build dist          (čišćenje)
  └─ next build → .build/next/   (međurezultati)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD kontrolna oznaka)
```

NEMOJTE pokretati `npm run build`, a zatim zasebno `npm run build:cli` za deploy — koristite
`npm run build:release`, koji obavlja čistu ponovnu izgradnju + zapisuje kontrolnu oznaku jednom naredbom.

### Validacija artefakata

- [ ] `npm run build:release` uspješno se izvršava i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` prolazi bez nalaza — nema `app.__qa_backup`, `scripts/scratch`, `package-lock.json` niti drugih lokalnih ostataka
- [ ] `dist/server.js` postoji nakon builda
- [ ] Opcionalna lokalna provjera zapakiranog pokretačkog okruženja: `npm run dev:candidate -- validate` nakon `npm run dev:candidate -- build` pokreće zapakirani tarball u izoliranom `DATA_DIR` i provjerava `/api/health` + `/v1/models` (pogledajte [Preporučeni postupak doprinosa](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Označavanje i izdavanje

- [ ] Pokrenite `/generate-release-cc` (Claude Code vještina):
  - Kreira oznaku `vX.Y.Z`
  - Objavljuje oznaku i granu
  - Otvara GitHub izdanje s tekstom dnevnika promjena
  - Prilaže Electron instalacijske pakete (ako su izrađeni)
- [ ] Ili ručno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy vještine koriste jednostavni rsync tok — bez `npm pack`, bez `npm i -g`:

- [ ] Koristite vještinu za implementaciju koja odgovara cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Prije implementacije potvrdite da je `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Izgradnja se mora izvršiti tamo gdje je `node_modules` stvaran (glavno radno stablo ili radno stablo na kojem je izvršen `npm ci` — NE radno stablo sa simboličkom vezom)
- [ ] Izvršite osnovno testiranje implementirane instance:
  - Otvorite `/dashboard/health` → provjerite odgovara li string verzije izdanju
  - Izvršite `/v1/chat/completions` zahtjev prema poznatom pružaocu usluga
  - Provjerite vraća li `/api/monitoring/health` osigurače stanja `CLOSED`
  - Potvrdite da MCP transporti odgovaraju (`/mcp` HTTP, `/mcp-sse` SSE)

### Nakon izdanja

- [ ] Pokrenite `/capture-release-evidences-cc` (Claude Code vještina)
  - Snima WebP snimke ekrana/videozapise novih funkcionalnosti
  - Prilaže ih bilješkama o izdanju / objavi na blogu
- [ ] Ažurirajte GitHub Discussions / Discord najavom izdanja
- [ ] Otvorite prekretnicu za sljedeću verziju
- [ ] Ako je kritično: zakačite diskusiju ili objavite u `news.json` za baner unutar aplikacije

### Kontrolna tačka za javno pokretanje Radara

Najava Radara namjerno je pohranjena s `active: false`. Aktivacija je zasebna
izmjena nakon što se dokumentuje svaka stavka u nastavku:

- [ ] Svi naslagani Radar PR-ovi su spojeni i CI vrha izdanja je zelen
- [ ] Implementirajte i osnovno testirajte OSS Radar rute dok je `RADAR_ENABLED` još uvijek podrazumijevano isključen
- [ ] Osnovno testirajte `GET /planos`, `/termos`, `/privacidade` i `/reembolso` na imenovanom Radar hostu
- [ ] Zabilježite identitet/kontakt/adresu operatera i pravni pregled koji je odobrio vlasnik u privatnom servisu
- [ ] Testirajte Stripe Checkout i potpisani webhook samo u testnom načinu rada
- [ ] Testirajte jednu šifriranu isporuku transakcijske e-pošte s odobrenim pošiljaocem/domenom
- [ ] Dokažite vraćanje sigurnosne kopije i jedno nadzirano pokretanje istraživanja s ograničenim budžetom
- [ ] Odobrite politiku pregleda za BRL/PIX prije prihvatanja dokaza o donaciji
- [ ] Omogućite javni Checkout tek nakon prethodnih kontrolnih tačaka, a zatim aktivirajte novi ID u `news.json`
- [ ] Provjerite koristi li početni baner lokalizirani tekst i pojavljuje li se novi ID nakon što se stariji ID odbaci

## Brza provjera ugrađenih servisa (v3.8.4+)

Prije objavljivanja bilo kojeg izdanja koje uključuje izmjene ugrađenih servisa, provjerite:

### Pokretanje sa svježom bazom podataka (otkriva kolizije migracija — dodano nakon hitne ispravke v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — pričekajte 10 s da se pokrene
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vraća `"9router"` (NIJE 404, NIJE 500). Potvrđuje da je migracija `071_services.sql` primijenjena i da je red inicijalno dodan.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vraća 3 reda.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vraća 2 reda (potvrđuje da je `070_webhooks_kind_metadata.sql` primijenjen).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prolazi — štiti od budućih kolizija.

### 9Router

- [ ] `POST /api/services/9router/install` vraća 200 sa `installedVersion` za manje od 2 min
- [ ] `POST /api/services/9router/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/9router/status` prijavljuje `health: "healthy"`
- [ ] `POST /v1/chat/completions` sa `"model": "9router/auto/..."` vraća 200 (usmjeravanje od početka do kraja kroz 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` prikazuje izvorni 9Router UI unutar proxyja (bez direktnog `127.0.0.1:port` iframea)
- [ ] `POST /api/services/9router/rotate-key` vraća `{ keyRotated: true }` i servis se ponovo pokreće bez grešaka
- [ ] `POST /api/services/9router/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vraća SSE tok sa `snapshot` događajem koji sadrži nedavne redove
- [ ] Instalacija u okruženju bez `npm` u PATH-u vraća 500 s jasnom porukom o grešci (bez praćenja steka)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vraća 200 za manje od 2 min
- [ ] `POST /api/services/cliproxy/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/cliproxy/status` prijavljuje `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vraća SSE tok

### Sigurnosna regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vraća `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vraća `403 LOCAL_ONLY`
- [ ] Odgovori o greškama iz `/api/services/*` ne sadrže `err.stack` niti apsolutne putanje datoteka

## Provjere za v3.8.0+

Prije objavljivanja bilo kojeg izdanja v3.8.x, provjerite i sljedeće stavke:

- [ ] `omniroute --tray` pokreće se na macOS-u (systray2 instaliran u `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` pokreće se na Linuxu (zahtijeva DISPLAY; jasna greška ako nije postavljen)
- [ ] `omniroute --tray` pokreće se na Windowsu (PowerShell NotifyIcon, bez dodatnih binarnih datoteka)
- [ ] `omniroute config tray enable` kreira unos za automatsko pokretanje; onemogućavanje ga uklanja
- [ ] `npm install -g omniroute@<this-version>` izvršava postinstall bez fatalnog prekida
- [ ] Putanja ažuriranja zadržava opcionalne zavisnosti: `omniroute update --apply` i program za automatsko ažuriranje
      pokreću `npm install -g … --include=optional` kako bi `optionalDependencies` (better-sqlite3,
      keytar, tls-client i llmlingua SLM stek: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) ostale sačuvane nakon ažuriranja. Ultra `modelPath` SLM nivo također zahtijeva
      tinybert model, koji se pri prvoj upotrebi automatski preuzima u `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) zatim smješta opcionalno SLM stablo zavisnosti u
      `dist/node_modules` kako bi worker koristio JEDNU instancu `@huggingface/transformers` ^4.2.0
      — samostalni trace paket uključuje samo transformers, a ne dinamički uvezene
      opcionalne zavisnosti, pa bi bez ovoga worker učitao llmlingua-2 uz transformers iz korijenskog direktorija
      i SLM nivo bi neprimjetno prešao u otvoreni način rada.
- [ ] `omniroute status` radi bez `.env` (putanja CLI tokena, samo povratna petlja)
- [ ] `curl http://localhost:20128/api/shutdown` vraća 401 (ruta koja je uvijek zaštićena)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vraća 401 (zaštita povratne petlje)
- [ ] SQLite okruženje se pri prvom pokretanju razrješava na `bundled` (uključena binarna datoteka valjana je za platformu)
- [ ] SQLite okruženje prelazi na `runtime` kada se `node_modules/better-sqlite3` izbriše
- [ ] Pametni MCP filter komprimira stvarni `playwright-mcp browser_snapshot` izlaz (smanjenje ≥50%)
- [ ] Svih 10 datoteka `skills/omniroute*/SKILL.md` javno je dostupno putem sirovog GitHub URL-a
- [ ] Čarobnjak za početno postavljanje prikazuje korak obilaska nivoa "Kako radi" pri novom postavljanju
- [ ] Widget pokrivenosti nivoa na početnoj kontrolnoj ploči prikazuje broj konfiguriranih/aktivnih nivoa

---

## Izdvajanje 3.9.0 LTS-a (uvježbano u 3.8.58)

Nakon v3.8.59 sljedeća verzija je 3.9.0, a njen vrh postaje osnova za dvije dugotrajne grane:
`stable/v3` (v3 LTS linija, npm `latest`) i `develop` (v4, povećana na 4.0.0, npm
`nightly`). Model grana/kanala, prosljeđivanje promjena i oznake opisani su u
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plan je u dokumentu [ROADMAP](../../ROADMAP.md) (Faza 3). Izdvajanje se izvršava jednom;
3.8.58 ga uvježbava od početka do kraja na forku, a 3.8.59 završava
[GO/NO-GO kontrolnom listom](./LTS_GO_NO_GO.md).

### Probno pokretanje (samo za čitanje, sigurno u bilo kojem trenutku)

```bash
npm run release:dry-run-lts-cut                       # stvarno izdvajanje: 3.9.0 iz HEAD-a, prethodna oznaka v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # fiksiranje izvornog commita
```

`scripts/release/dry-run-lts-cut.mjs` ne izvršava ništa: čita git i `gh` te ispisuje
cijeli slijed — preduslove (izvor se može razriješiti, prethodna oznaka postoji, `package.json` ima
ciljnu verziju, otvoren je problem `release-freeze`, nema otvorenog problema `Release branch not green`
na postojećoj grani izdanja — grana koja ne postoji prijavljuje `?` nepoznato, nikada
zeleno — konfiguriran je Mergify red `release` (G11: `queue_rules`, `checks_timeout`,
oznaka `queue`), skup pravila `release/*` i dalje blokira brisanje i prisilno slanje, a
`stable/v3` i `develop` još ne postoje), dva koraka za grane, koji se okidači neaktivnih radnih tokova
i `if:` uslovi aktiviraju (a koji ostaju blokirani varijablom repozitorija ili
fiksirani na kanonski repozitorij), očekivane dist-oznake (`latest` → 3.9.0, `next` i
`nightly` prazne) i vraćanje promjena. Izlazni kod `0` = `RESULT: READY`, `1` = blokirajući preduslov
nije ispunjen (`✗`), `2` = greška pri korištenju. `--advisory <id,...>` snižava provjeru na upozorenje (`!`)
bez njenog skrivanja.

Pokrenite probno pokretanje stvarnog izdvajanja dok je zamrzavanje izdanja 3.9.0 još aktivno — grane se
kreiraju nakon oznake i prije nego što Faza 12c ukine zamrzavanje.

### Proba za 3.8.58 (samo fork)

```bash
# 1. Probno pokretanje na trenutnom vrhu s parametrima za probu
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Izvršavanje prema FORK udaljenom repozitoriju (origin ili bilo koji udaljeni repozitorij čiji je URL kanonski
#    repozitorij biva odbijen; svaki korak traži potvrdu u terminalu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Isprobavanje neaktivnih radnih tokova u forku (workflow_dispatch tamo gdje probno pokretanje
#    prijavi fiksiranje na kanonski repozitorij), a zatim vraćanje promjena
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit povećanja verzije grane `develop` izrađuje se pomoću git plumbing komandi (radno stablo se ne mijenja) i povećava
verziju u istih pet datoteka kao commit za otvaranje ciklusa: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` i `docs/openapi.yaml`. Odjeljak `[4.0.0]`
u CHANGELOG-u i njegove i18n kopije naknadno se otvaraju na grani `develop`, prije njenog prvog
PR-a. Skripta nikada ne mijenja npm dist-oznake — uvježbajte ih na probnom paketu.

### Artefakt za pregled PR-a (izgradite jednom, promovirajte iste bajtove)

`.github/workflows/preview-artifact.yml` izrađuje jednu produkcijsku tarball arhivu iz vrha PR-a i
validira upravo tu verziju (#8084 dio (a)). Samo PR-ovi iz istog repozitorija; ništa se ne objavljuje.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # ili dodajte oznaku `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalacija verzije za pregled
```

Pokretanje izvršava `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, pakuje
tarball arhivu, pokreće `npm run check:pack-boot` (lažne tajne, privremeni direktorij podataka), ponovo je pakuje i
ne uspijeva ako sažetak nije identičan, zatim bilježi `artifact-identity.json` (SHA vrha, SHA osnove,
hash datoteke zaključavanja, platformu, arhitekturu, node ABI, alat za objedinjavanje, pravilo izgradnje —
`scripts/release/artifact-identity.mjs`) te potvrđuje tarball arhivu u zasebnom zadatku. Promoviranje
verzije za pregled znači instaliranje te tarball arhive: nikada je nemojte ponovo izgrađivati iz izvornog koda.

### Izdvajanje (3.9.0, nakon odluke GO)

1. Odluka GO zabilježena je u [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` ispisuje `RESULT: READY`.
3. Ručno kreirajte grane na `origin` pomoću komandi koje ispiše probno pokretanje — skripta
   odbija slanje na `origin`. Da biste ponovo upotrijebili pregledani commit grane `develop`, prvo pokrenite
   probu s opcijom `--execute` na vrhu 3.9.0 prema svom forku; ona ispisuje oba SHA-a, a
   isti commitovi mogu se poslati:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Zaštitite `stable/v3` i `develop` (skupovi pravila + red za spajanje) prije spajanja prvog PR-a.
5. Neaktivni radni tokovi uključuju se kada grane počnu postojati: `forward-port.yml` (slanje na
   `stable/v3`), `validate-stable-pr.yml` (PR-ovi prema `stable/v3`) i `nightly-v4-build.yml`
   (izrađuje `develop`). Prije puštanja u rad postavite tajnu repozitorija `secrets.FORWARD_PORT_TOKEN` (kako bi se CI pokretao na
   PR-ovima za prosljeđivanje promjena); noćno objavljivanje ostaje isključeno dok vlasnik ne postavi varijablu
   repozitorija `vars.NIGHTLY_PUBLISH` na `true` i npm Trusted Publishing ne prihvati
   `nightly-v4-build.yml`. Razrješavanje kanala obavlja `scripts/release/dist-tag.mjs`, isti
   razrješivač koji koristi `npm-publish.yml`.
6. Provjerite kanale: `npm view omniroute dist-tags --json` prikazuje `latest` = 3.9.0 i nema
   `next` / `nightly` dok se v4 ne objavi.
7. Vraćanje promjena, ako je potrebno: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   i `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vraćanje na prethodnu verziju

Ako izdanje ima kritičan problem:

1. `gh release edit vX.Y.Z --prerelease` (označava da nije najnovije)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo ako ga korisnici još nisu počeli koristiti)
3. Ili: hitna ispravka na `release/vX.Y.0` → izdanje zakrpe `vX.Y.(Z+1)`
4. Odmah obavijestite korisnike putem GitHub Discussionsa i Discorda

## Stroga pravila

- Nikada ne šaljite izmjene direktno na `main`
- Nikada ne koristite `git push --force` za `main` ili grane `release/*`
- Nikada ne preskačite Husky hookove (`--no-verify`)
- Nikada ne šaljite tajne, pristupne podatke ili `.env` datoteke
- Pokrivenost mora ostati ≥60/60/60/60 (naredbe/linije/funkcije/grane)
- Prilikom izmjene produkcijskog koda u `src/`, `open-sse/`, `electron/` ili `bin/` uvijek uključite ili ažurirajte testove

## Automatizirana provjera sinhronizacije

Pokrenite lokalnu provjeru sinhronizacije dokumentacije prije otvaranja PR-a:

```bash
npm run check:docs-sync
```

CI također pokreće ovu provjeru u `.github/workflows/ci.yml` (lint zadatak).
