# RELEASE_CHECKLIST (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Kontrolna Lista Izdanja"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Kontrolna Lista Izdanja

> **Posljednje ažuriranje:** 2026-08-28 — v3.8.51
> Pojednostavljen tok izdavanja koji koristi Claude Code vještine za automatizaciju.
>
> **Održavajte red čekanja/granu zelenom između izdanja:** pogledajte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` obitelj + `npm run check:release-green` + `/babysit` + noćni). Pokretanje
> ovoga periodično — i posebno **prije** ove kontrolne liste — osigurava da PR izdanja počne zelenim.

## TL;DR

```bash
# 1. Povećaj verziju + generiraj CHANGELOG (vještina)
/version-bump-cc patch    # ili minor/major

# 2. Pokrenite kontrolu kvalitete lokalno
npm run check              # lint + testovi
npm run test:coverage      # potpuna provjera pokrivenosti (60/60/60/60)

# 3. Izgradnja i provjera dima
npm run build
npm run test:e2e           # opcionalno ali preporučeno

# 4. Generiraj izdanje (vještina)
/generate-release-cc

# 5. Objavi (vještina)
/deploy-vps-both-cc        # ili akamai-cc / local-cc

# 6. Prikupi dokaze o izdanju (vještina)
/capture-release-evidences-cc
```

## npm Pouzdano Objavljivanje (zadano od v3.8.51) — fazno na zahtjev, izravno kao rezerva

`npm-publish.yml` objavljuje putem **npm Pouzdanog Objavljivanja (OIDC)** prema zadanim postavkama: posao
`stage-npm` (hostirano na GitHubu) razmjenjuje GitHub-ov id-token za kratkoročnu npm
vjerodajnicu za taj pokret — bez dugoročnog npm tokena u tajnama repozitorija, bez 2FA upita, s priloženom provenijencom.
To je zaobilaženje npm sankcija sada kada se povlače tokeni koji preskakuju 2FA;
obnavlja potpuno automatski tok koji je projekt imao do v3.8.48 uz zadržavanje
WS1.3 jamstva (procurjeli token ne može objaviti sam — nema tokena).

**Jednokratna postavka (vlasnik):** npmjs.com → paket `omniroute` → Postavke → _Trusted
Publisher_ → GitHub: vlasnik `diegosouzapw`, repozitorij `OmniRoute`, radni tok `npm-publish.yml`
(okruženje: nijedno). Dok to ne postoji, automatski korak neće uspjeti s `ENEEDAUTH`:
ponovno pokrenite s `publish_mode=staged` (ispod) ili `direct`.

### Fazno objavljivanje (na zahtjev — `publish_mode=staged`)

Radni tok npm-publish više ne objavljuje izravno: pokreće zapakiranu arhivu
(`check:pack-boot`) i zatim pokreće `npm stage publish` — točni bajtovi su parkirani na
registru, **nisu dostupni za instalaciju** dok ih vlasnik ne odobri. Ljudska 2FA provjera premještena je
na NAKON dokaza, a ne prije njega.

**Tok vlasnika nakon što radni tok postane zelen:**

1. `npm stage list omniroute` — pronađite id faze (ispisan je i u sažetku radnog toka).
2. Provjerite fazne bajtove (preporučeno): `npm stage download <id>`, zatim instalirajte
   preuzetu arhivu u privremeni prefiks i pokrenite je (`npm run check:pack-boot` automatizira
   isti verdikt pack→install→boot u CI-u).
3. `npm stage approve <id>` — 2FA upit JEST objava. `npm stage reject <id>` odbacuje.
4. Post-objava mreža: post-objava provjera (WS1.4 plana v3.8.49) instalira objavljenu verziju iz javnog registra u čistom spremniku i pokreće je.

**Hitna rezerva:** `workflow_dispatch` s `publish_mode=direct` vraća
nasljeđeni trenutni `npm publish` (koristite samo ako samo faziranje ne funkcionira ispravno; zabilježite razlog).

**Jednokratno ojačavanje (vlasnik, npmjs.com):** konfigurirajte Pouzdanog Izdavača za
`omniroute` u načinu samo-faziranja kako procurjeli dugoročni token ne bi mogao izravno pokrenuti `npm publish`
s bilo kojeg mjesta — CI može samo fazirati; samo vlasnikov 2FA objavljuje.

**Priručnik za pokvarene artefakte (nepromijenjen):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
kao zadani refleks (minute, reverzibilno); `npm unpublish` samo unutar prozora 72h/bez-zavisnosti
i nikad kao prvi potez. Docker: nikad ne prepisujte oznaku verzije — povratak na prethodno stanje je
usmjeravanje `latest` na posljednji ispravan sažetak.

**Docker Hub `latest` (obavezno pri svakoj stabilnoj SemVer objavi):** radni tok
`docker-publish` mora označiti **i** `X.Y.Z` i, kada
`should-promote-latest.sh` potvrdi da je ovo najviši stabilni SemVer, `:latest`
s **istim sažetkom**. Nakon posla: Hub `latest` sažetak jednak je novom
SemVer sažetku i `last_updated` se promijenio. Ne ostavljajte `:latest` na starijoj
izgradnji dok bilješke o izdanju govore o ispravcima koji postoje samo na gitu. Compose
kratki vodiči za pokretanje koriste `:latest`; GitOps treba nastaviti prikvačiti `X.Y.Z`. Pogledajte
[Docker kanali izdavanja](../guides/DOCKER_GUIDE.md#release-channels) i #10317.

## Brza traka za hitne zakrpe (oznaka `hotfix`)

PR označen s `hotfix` preskače tešku CI matricu (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) i zadržava brze, visoko-signalne provjere: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
i tarball boot-smoke (`check:pack-boot`). Cilj: zeleno za ≤15 min umjesto ~33 min.

**Pravila ulaska — sva četiri su obavezna (modelirana po Chromium/VS Code/Node hitnim trakama):**

1. **Ozbiljnost**: produkcija je pokvarena — objavljeni artefakt pada pri pokretanju /
   sigurnosna zakrpa / svaki korisnik izdanja je pogođen. "Važno" nije "pokvareno".
2. **Ovlaštenje**: samo vlasnik repozitorija primjenjuje oznaku `hotfix`. Oznaka JE
   odobrenje — nikada ne koristite samoposlužno na kampanjskom PR-u.
3. **Dokaz**: tijelo PR-a povezuje prethodno potpuno zeleno teško izvođenje (skup koji bi
   preskočeni poslovi ponovno validirali) plus vlastiti test zakrpe koji je bio neuspješan pa je prošao.
4. **Opseg**: samo cherry-pick — minimalna zakrpa, bez refaktorizacija, bez popratnih promjena.

Preskočena pokrivenost/ratchet površina ponovno se validira sljedećim punim izvođenjem na
granu izdanja (continuous release-green) — traka preskače ČEKANJE, nikada validaciju.
Razlike samo s testovima (sve datoteke pod `tests/`, ništa pod `tests/e2e/`) automatski
preskaču E2E matricu, bez ikakve oznake.

## Detaljna kontrolna lista

### Pred-izdanje

- [ ] Svi PR-ovi usmjereni na ovo izdanje su spojeni u `release/vX.Y.0`
- [ ] Sve otvorene stavke Linear/issue za ovu verziju su zatvorene ili prebačene na sljedeći milestone
- [ ] CI zeleno na grani `release/vX.Y.0`
- [ ] Nema oznaka `TODO(release)` u kodu: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker osnovna slika je ažurna (trenutno `node:24.15.0-trixie-slim`)

### Verzija i dnevnik promjena

- [ ] Pokrenite `/version-bump-cc <patch|minor|major>` (Claude Code vještina)
  - Povećava `package.json`, `electron/package.json`
  - Regenerira `CHANGELOG.md` iz git commitova od zadnje oznake
  - Ažurira značke u README.md
- [ ] Ručno pregledajte CHANGELOG.md i po potrebi uredite poruke commitova
- [ ] Provjerite da li najnoviji semver odjeljak u `CHANGELOG.md` odgovara verziji iz `package.json`
- [ ] Zadržite `## [Unreleased]` kao prvi odjeljak dnevnika promjena za nadolazeći rad
- [ ] Ažurirajte `docs/openapi.yaml` → `info.version` mora odgovarati verziji iz `package.json`

### Kvaliteta koda

- [ ] `npm run lint` — 0 grešaka (upozorenja su prethodno postojeća)
- [ ] `npm run typecheck:core` — čisto
- [ ] `npm run typecheck:noimplicit:core` — čisto (strogo)
- [ ] `npm run check:cycles` — nema kružnih ovisnosti
- [ ] `npm run check:any-budget:t11` — unutar budžeta
- [ ] `npm run check:route-validation:t06` — čisto
- [ ] `npm run check:node-runtime` — zadovoljena minimalna podržana verzija izvođenja (`>=22.22.2 <23`, `>=24.0.0 <27`, prema `SUPPORTED_NODE_RANGE` u `src/shared/utils/nodeRuntimeSupport.ts`; usklađeno s `engines` u `package.json`)

### Testiranje

- [ ] `npm run test:unit` — prolazi
- [ ] `npm run test:vitest` — prolazi (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — prolaz praga 60/60/60/60 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — prolazi (ako promjene diraju DB / handlere)
- [ ] `npm run test:combo:matrix` — prolazi (combo strategija matrica: dokazuje deterministički odabir svih 19 javnih strategija rutiranja; pokrenite pri promjenama combo rutiranja, razrješavanja strategija ili logike povratnog odabira)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **neobavezno/ručno** (zaštićeni real-upstream smoke; učitava snimak DB samo za čitanje s VPS-a `root@192.168.0.15`; pogađa prave pružatelje, troši kredite; nikada ne pokreće u CI-u; čisto preskače bez zastavice)
- [ ] `npm run test:combo:live:vps` — **neobavezno/ručno** (Phase-3 VPS live smoke: 7 HTTP scenarija prema živom `.15` serveru putem plain Node ESM; zahtijeva `ssh root@192.168.0.15`; stvara/briše samo `__live_test__*` komboe; pogađa prave pružatelje; nikada ne pokreće u CI-u)
- [ ] `npm run test:e2e` — prolazi (UI promjene)
- [ ] `npm run test:protocols:e2e` — prolazi (MCP/A2A promjene)
- [ ] `npm run test:ecosystem` — prolazi

### Hooks (Husky validiran)

Husky hooks nalaze se u `.husky/` i automatski se pokreću na git operacijama.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** brze deterministične provjere — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namjerno isključuje `test:unit` (sporo; pokriveno CI poslom `test-unit`).
  - Pokrenite `npm run test:unit` ručno prije guranja grana izdanja.

Ako hook ne uspije: ispravite temeljni problem, ne zaobilazte s `--no-verify`.

### Konvencionalni commitovi

Svi commitovi vezani uz izdanje moraju slijediti format `type(scope): subject`.

**Valjani tipovi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Valjani opsezi:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Prekidajuće promjene: dodajte podnožje `BREAKING CHANGE:` ili `!` nakon opsega (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` prolazi (automatski pokreće pre-commit)
- [ ] `npm run check:docs-all` prolazi (krovni: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` izlazi s 0 — ugovor o varijablama okoline između koda ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je neoštećen
- [ ] `npm run check:doc-links` izlazi s 0 — nema slomljenih internih markdown referenci nakon restrukturiranja
- [ ] `docs/architecture/ARCHITECTURE.md` pregledan radi pomaka pohrane/izvođenja
- [ ] `docs/guides/TROUBLESHOOTING.md` pregledan radi pomaka varijabli okoline i operativnih promjena
- [ ] Ako se `.env.example` promijenio: ažuriran `docs/reference/ENVIRONMENT.md`
- [ ] Ako nova značajka ima UI: `docs/guides/USER_GUIDE.md` ju spominje
- [ ] Ako nova značajka ima API: ažurirani `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Ako je nova značajka modul: postoji namjenski `docs/<MODULE>.md`
- [ ] Ako je prekidajuća promjena: `docs/guides/TROUBLESHOOTING.md` ima napomenu o migraciji

### i18n

- [ ] `npm run i18n:check` izlazi s 0 — stanje prijevoda (`.i18n-state.json`) usklađeno s izvornim dokumentima (nema pomaknutih izvora u strogom načinu; upozorenje u warn-modu je prihvatljivo za posljednje dorade dokumenata, ali treba biti 0 prije označavanja)
- [ ] `npm run i18n:check-ui-coverage` izlazi s 0 — svaki UI locale na ili iznad minimalne pokrivenosti od 80%
- [ ] `npm run i18n:sync-ui:dry` prijavljuje 0 nedostajućih ključeva u svih 42 locale-a
- [ ] Ako su se izvorni engleski dokumenti promijenili, pokrenite `npm run i18n:run` (zahtijeva `OMNIROUTE_TRANSLATION_API_KEY` u `.env`) prije označavanja
- [ ] Doprinosi prijevoda mogu biti odgođeni za sljedeće izdanje ako su manji (pratite u CHANGELOG-u)

### Migracije baze podataka

- [ ] Ako `src/lib/db/migrations/` ima nove datoteke:
  - [ ] Svaka migracija je idempotentna (`CREATE TABLE IF NOT EXISTS`, itd.)
  - [ ] Migracije omotane u transakcije
  - [ ] Pravilno numerirane (bez praznina u redoslijedu)
- [ ] Testirajte na svježoj instalaciji: obrišite `~/.omniroute/omniroute.db` i pokrenite `npm run dev`
- [ ] Testirajte na postojećoj instalaciji: napravite sigurnosnu kopiju DB-a, pokrenite migraciju, provjerite shemu
- [ ] WAL datoteke (`-wal`, `-shm`) se pravilno obrađuju ako migracija prepisuje tablice

### Katalog pružatelja (Zod-validiran)

- [ ] Zod shema `src/shared/constants/providers.ts` valjana pri učitavanju
  - [ ] Svi pružatelji imaju obavezna polja (`id`, `label`, `kind`, itd.)
  - [ ] `freeNote` osiguran za nove besplatne pružatelje
  - [ ] OAuth pružatelji imaju `oauthConfig` registriran u `src/lib/oauth/constants/oauth.ts`
- [ ] Ako je dodan novi pružatelj: odgovarajući executor u `open-sse/executors/`
- [ ] Ako nije OpenAI format: translator u `open-sse/translator/`
- [ ] Modeli registrirani u `open-sse/config/providerRegistry.ts`
- [ ] Unit testovi u `tests/unit/` pokrivaju klasifikaciju pružatelja i rutiranje

### Desktop (Electron)

Ako se `electron/` promijenio:

- [ ] `npm run electron:smoke:packaged` prolazi
- [ ] Buildovi testirani za barem jedno od `:win`, `:mac`, `:linux`
- [ ] Certifikati za potpisivanje koda nisu istekli (ako se potpisuje)
- [ ] Verzija `electron/package.json` odgovara verziji u korijenskom `package.json`
- [ ] Pokazivač kanala za automatsko ažuriranje je ažuriran ako se objavljuje na `stable`

### Raspored builda

Repozitorij koristi tri različita izlazna direktorija — nikada ih ne miješajte:

| Direktorij | Svrha                                                  | Praćen?         |
| ---------- | ------------------------------------------------------ | --------------- |
| `src/`     | Izvorni kod aplikacije (TypeScript / TSX)              | Da              |
| `.build/`  | Međuproizvodi builda — izlaz `next build` (`distDir`)  | Ne (gitignored) |
| `dist/`    | Paket npm za isporuku — sastavlja `assembleStandalone` | Ne (gitignored) |

> **Napomena za operatera:** direktorij slika na udaljenom VPS-u ostaje `/usr/lib/node_modules/omniroute/app/`.
> Premještena je samo **unutar-repozitorijska** izlazna putanja builda (`app/` → `dist/`). Vještine deploya rsynkaju
> sadržaj `dist/` u udaljeni direktorij `app/` — nisu potrebne promjene VPS putanja.

**Tok jednog builda:**

```
npm run build:release
  └─ rm -rf .build dist          (čišćenje)
  └─ next build → .build/next/   (međuproizvodi)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ piše dist/BUILD_SHA         (HEAD sentinel)
```

NE pokrećite `npm run build` praćen zasebnim `npm run build:cli` za deploy — koristite
`npm run build:release` koji radi čisti rebuild + sentinel u jednoj naredbi.

### Validacija artefakta

- [ ] `npm run build:release` uspijeva i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` čisto — nema `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ili drugog lokalnog ostatka
- [ ] `dist/server.js` postoji nakon builda

### Označavanje i izdanje

- [ ] Pokrenite `/generate-release-cc` (Claude Code vještina):
  - Stvara oznaku `vX.Y.Z`
  - Gura oznaku i granu
  - Otvara GitHub Release s tijelom dnevnika promjena
  - Prilaže Electron instalere (ako su izgrađeni)
- [ ] Ili ručno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Vještine deploya koriste lagani rsync tok — bez `npm pack`, bez `npm i -g`:

- [ ] Koristite vještinu deploya koja odgovara cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Prije deploya, potvrdite da `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build mora biti pokrenut tamo gdje je `node_modules` pravi (glavni checkout ili `npm ci`'d worktree — NE symlinked worktree)
- [ ] Smoke test deployane instance:
  - Otvorite `/dashboard/health` → provjerite da string verzije odgovara izdanju
  - Pokrenite zahtjev `/v1/chat/completions` prema poznatom pružatelju
  - Provjerite da `/api/monitoring/health` vraća `CLOSED` circuit breakere
  - Potvrdite da MCP transporti odgovaraju (`/mcp` HTTP, `/mcp-sse` SSE)

### Nakon izdanja

- [ ] Pokrenite `/capture-release-evidences-cc` (Claude Code vještina)
  - Snima WebP snimke zaslona/snimke novih značajki
  - Prilaže bilješkama o izdanju / blog postu
- [ ] Ažurirajte GitHub Discussions / Discord s obavijesti o izdanju
- [ ] Otvorite milestone za sljedeću verziju
- [ ] Ako je kritično: prikvačite raspravu ili objavite u `news.json` za banner unutar aplikacije

### Javna vrata pokretanja Radara

Radar najava je namjerno predana s `active: false`. Aktivacija je zasebna
promjena nakon što su svi donji koraci evidentirani:

- [ ] Svi složeni Radar PR-ovi su spojeni i CI na vrhu izdanja je zelen
- [ ] Deployajte i smoke testirajte OSS Radar rute s `RADAR_ENABLED` i dalje isključenim po zadanom
- [ ] Smoke testirajte `GET /planos`, `/termos`, `/privacidade` i `/reembolso` na imenovanom Radar hostu
- [ ] Zabilježite identitet/kontakt/adresu operatera i pravni pregled odobren od vlasnika u privatnoj usluzi
- [ ] Koristite Stripe Checkout i potpisani webhook samo u testnom načinu
- [ ] Koristite jedno šifrirano transakcijsko slanje e-pošte s odobrenim pošiljateljem/domenom
- [ ] Dokažite obnavljanje iz sigurnosne kopije i jedno nadzirano, budžetom ograničeno istraživačko pokretanje
- [ ] Odobrite BRL/PIX politiku pregleda prije prihvaćanja dokaza o donacijama
- [ ] Omogućite javni Checkout tek nakon prethodnih vrata, zatim aktivirajte novi `news.json` ID
- [ ] Provjerite da Home banner koristi lokalizirani tekst i da se novi ID ponovo pojavljuje nakon što stariji ID bude odbačen

## Smoke testovi ugrađenih servisa (v3.8.4+)

Prije isporuke bilo kojeg izdanja koje uključuje promjene ugrađenih servisa, provjerite:

### Pokretanje s novom bazom podataka (otkriva kolizije migracija — dodano nakon v3.8.4 hotfixa)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — pričekajte 10 s na pokretanje
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vraća `"9router"` (NE 404, NE 500). Potvrđuje da je migracija `071_services.sql` primijenjena i da je redak umetnut.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vraća 3 retka.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vraća 2 retka (potvrđuje da je `070_webhooks_kind_metadata.sql` primijenjen).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prolazi — štiti od budućih kolizija.

### 9Router

- [ ] `POST /api/services/9router/install` vraća 200 s `installedVersion` za manje od 2 min
- [ ] `POST /api/services/9router/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/9router/status` prijavljuje `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vraća 200 (end-to-end usmjeravanje kroz 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` prikazuje nativno korisničko sučelje 9Routera unutar proxyja (bez izravnog `127.0.0.1:port` iframea)
- [ ] `POST /api/services/9router/rotate-key` vraća `{ keyRotated: true }` i servis se čisto ponovno pokreće
- [ ] `POST /api/services/9router/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vraća SSE stream s događajem `snapshot` koji sadrži nedavne retke
- [ ] Instalacija u okruženju bez `npm` u PATH-u vraća 500 s razumljivom (bez stack tracea) porukom o pogrešci

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vraća 200 za manje od 2 min
- [ ] `POST /api/services/cliproxy/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/cliproxy/status` prijavljuje `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vraća SSE stream

### Sigurnosna regresija

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vraća `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vraća `403 LOCAL_ONLY`
- [ ] Odgovori s pogreškama s `/api/services/*` ne sadrže `err.stack` niti apsolutne putanje datoteka

## Provjere za v3.8.0+

Prije isporuke bilo kojeg v3.8.x izdanja, provjerite i ove dodatne stavke:

- [ ] `omniroute --tray` se pokreće na macOS-u (systray2 instaliran u `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se pokreće na Linuxu (zahtijeva DISPLAY; prikazuje razumljivu pogrešku ako nije postavljen)
- [ ] `omniroute --tray` se pokreće na Windowsima (PowerShell NotifyIcon, bez dodatnih binarnih datoteka)
- [ ] `omniroute config tray enable` stvara unos za automatsko pokretanje; disable ga uklanja
- [ ] `npm install -g omniroute@<this-version>` izvršava postinstall bez fatalnog izlaza
- [ ] Put ažuriranja zadržava opcionalne ovisnosti: `omniroute update --apply` i auto-updater
      izvršavaju `npm install -g … --include=optional` kako bi `optionalDependencies` (better-sqlite3,
      keytar, tls-client, i llmlingua SLM stog: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) preživjele ažuriranje. Ultra `modelPath` SLM razina također zahtijeva
      tinybert model, koji se automatski preuzima u `${DATA_DIR}/models/llmlingua` pri prvoj upotrebi. Postinstall
      (`scripts/build/colocateOptionals.mjs`) zatim smješta SLM opcionalni paket u
      `dist/node_modules` kako bi worker razriješio JEDNU `@huggingface/transformers` ^4.2.0
      instancu — samostalni trace bundlovi uključuju samo transformers, ne i dinamički uvezene
      opcionalne pakete, pa bi bez ovoga worker učitao llmlingua-2 uz root-ov transformers
      i SLM razina bi tiho pala na otvoreni način rada.
- [ ] `omniroute status` radi bez `.env` (putanja CLI tokena, samo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vraća 401 (uvijek zaštićena ruta)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vraća 401 (loopback zaštita)
- [ ] SQLite runtime se razrješava na `bundled` pri prvom pokretanju (bundled binarni paket valjan za platformu)
- [ ] SQLite runtime pada na `runtime` kada se `node_modules/better-sqlite3` obriše
- [ ] Pametni MCP filter komprimira stvarni izlaz `playwright-mcp browser_snapshot` (smanjenje ≥50%)
- [ ] Svih 10 `skills/omniroute*/SKILL.md` datoteka je javno dostupno putem raw GitHub URL-a
- [ ] Čarobnjak za uključivanje prikazuje korak „Kako funkcionira" s pregledom razina pri svježem postavljanju
- [ ] Widget pokrivenosti razina na početnoj nadzornoj ploči prikazuje broj konfiguriranih/aktivnih

---

## Vraćanje na prethodnu verziju

Ako izdanje ima kritičan problem:

1. `gh release edit vX.Y.Z --prerelease` (označava kao nije najnovije)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo ako korisnici još nisu preuzeli)
3. Ili: hitni popravak na `release/vX.Y.0` → zakrpno izdanje `vX.Y.(Z+1)`
4. Odmah obavijestiti putem GitHub Discussions i Discorda

## Stroga pravila

- Nikada ne commitati izravno na `main`
- Nikada ne koristiti `git push --force` na `main` ili `release/*` granama
- Nikada ne preskakati Husky hookove (`--no-verify`)
- Nikada ne commitati tajne podatke, vjerodajnice ili `.env` datoteke
- Pokrivenost mora ostati ≥60/60/60/60 (naredbe/linije/funkcije/grane)
- Uvijek uključiti ili ažurirati testove pri izmjeni produkcijskog koda u `src/`, `open-sse/`, `electron/` ili `bin/`

## Automatska provjera sinkronizacije

Pokrenite lokalnu provjeru sinkronizacije dokumentacije prije otvaranja PR-a:

```bash
npm run check:docs-sync
```

CI također pokreće ovu provjeru u `.github/workflows/ci.yml` (lint zadatak).
