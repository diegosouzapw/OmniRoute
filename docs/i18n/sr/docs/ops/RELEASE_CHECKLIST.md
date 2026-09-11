# RELEASE_CHECKLIST (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

---

title: "Release Checklist"
version: 3.8.51
lastUpdated: 2026-08-28
---

# Контролна листа за издавање (Release Checklist)

> **Последње ажурирање:** 2026-08-28 — v3.8.51
> Оптимизован ток издавања (release flow) који користи Claude Code skills за аутоматизацију.
>
> **Одржавајте queue/branch зеленим између издавања:** видети [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` фамилија + `npm run check:release-green` + `/babysit` + noćno извршавање). Периодично покретање
> овога — а посебно **пре** ове контролне листе — доводи до тога да release PR почне зелено.

## TL;DR

```bash
# 1. Повећајте верзију + генеришите CHANGELOG (skill)
/version-bump-cc patch    # или minor/major

# 2. Локално покрените quality gate
npm run check              # lint + testovi
npm run test:coverage      # потпуни coverage gate (60/60/60/60)

# 3. Build & smoke
npm run build
npm run test:e2e           # опционо, али препоручено

# 4. Генеришите release (skill)
/generate-release-cc

# 5. Deploy (skill)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Snimite dokaze o izdanju (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (подразумевано од v3.8.51) — staged на захтев, direct као резервни план

`npm-publish.yml` подразумевано објављује путем **npm Trusted Publishing (OIDC)**: посао
`stage-npm` (github-hosted) размењује GitHub-ов id-token за краткотрајну npm
акредитацију за то извршавање — нема дуготрајног npm token-а у repository secrets, нема 2FA упита, provenance је прикачен.
То је начин да се заобиђу npm санкције сада када се токени који заобилазе 2FA повлаче;
то враћа потпуно аутоматски ток који је овај пројекат имао до v3.8.48, задржавајући
WS1.3 гаранцију (компромитован token сам не може да објави — token не постоји).

**Једнократно подешавање (owner):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Док то не постоји, аутоматски корак не успева са `ENEEDAUTH`:
поново покрените dispatch са `publish_mode=staged` (испод) или `direct`.

### Staged објављивање (на захтев — `publish_mode=staged`)

npm-publish workflow више не објављује директно: он бутује (boot) упакован tarball
(`check:pack-boot`) и затим покреће `npm stage publish` — тачни бајтови се паркирају на
registry-у, **нису инсталабилни** до одобрења owner-а. Хумана 2FA капија је премештена
на ПОСЛЕ доказа, а не пре њега.

**Ток за owner-а након што workflow постане зелен:**

1. `npm stage list omniroute` — пронаћи stage id (такође исписан у сажетку workflow-а).
2. Верификовати staged бајтове (препоручено): `npm stage download <id>`, затим инсталирати
   преузети tarball у temp prefix и bootovati га (`npm run check:pack-boot` аутоматизује
   исти pack→install→boot verdikt у CI).
3. `npm stage approve <id>` — 2FA упит JESTE публиковање. `npm stage reject <id>` одбацује.
4. Post-publish net: post-publish верификатор (WS1.4 из v3.8.49 плана) инсталира
   објавлену верзију из јавног registry-а у чист container и bootuje је.

**Хитан резервни план (emergency fallback):** `workflow_dispatch` са `publish_mode=direct` враћа
legacy тренутно `npm publish` (користити само ако staging сам показује проблеме; записати разлог).

**Једнократно ојачавање (owner, npmjs.com):** конфигурисати Trusted Publisher за
`omniroute` у stage-only режиму тако да компромитован дуготрајан token не може директно
да изврши `npm publish` ниоткуда — CI може само да stage-ује; само owner-ова 2FA ослобађа издавање.

**Playbook за оштећен артефакт (непромењен):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
као подразумевани рефлекс (минути, реверзибилно); `npm unpublish` само унутар 72h/no-dependents
прозора и никад као први потез. Docker: никада не преписивати version tag — rollback значи
поново усмеравање `latest` на последњи добар digest.

**Docker Hub `latest` (обавезно код сваког стабилног SemVer објављивања):**
`docker-publish` workflow мора да таг-ује **и** `X.Y.Z` **и**, када
`should-promote-latest.sh` потврди да је ово највиши стабилни SemVer, `:latest`
са **истим digest-ом**. Након посла: Hub `latest` digest се поклапа са новим
SemVer digest-ом и `last_updated` је ажуриран. Не остављати `:latest` на старијем
build-у док release notes говоре о исправкама које постоје само на git-у. Compose
quickstarts користе `:latest`; GitOps треба да настави да pinuje `X.Y.Z`. Видети
[Docker release channels](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Hotfix brza traka (oznaka `hotfix`)

PR sa oznakom `hotfix` preskače tešku CI matricu (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) i zadržava brze gejtove sa visokim signalom: build, unit shard-ove, integraciju, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
i tarball boot-smoke (`check:pack-boot`). Cilj: zeleno u ≤15min umesto ~33min.

**Politika ulaska — sve četiri obavezne (po uzoru na Chromium/VS Code/Node hitne trake):**

1. **Ozbiljnost**: produkcija je pokvarena — objavljeni artefakt se ruši na pokretanju / bezbednosna ispravka /
   svi korisnici izdanja su pogođeni. "Važno" nije "pokvareno".
2. **Autoritet**: samo vlasnik repozitorijuma dodaje oznaku `hotfix`. Oznaka JESTE
   odobrenje — nikada nemojte sami sebi dodeljivati oznaku na kampanjskom PR-u.
3. **Dokaz**: opis PR-a sadrži link na prethodni potpuno zeleni "heavy" pokretanje (skup koji bi
   preskočeni poslovi ponovo validirali) plus sopstveni test ispravke koji je najpre neuspešan, a potom prolazi.
4. **Obim**: samo cherry-pick — minimalna ispravka, bez refaktorisanja, bez propratnih izmena.

Preskočena površina coverage/ratchet ponovo se validira u sledećem potpunom pokretanju na
release grani (continuous release-green) — traka preskače ČEKANJE, nikada validaciju.
Diff-ovi koji sadrže samo testove (svi fajlovi pod `tests/`, nijedan pod `tests/e2e/`) automatski
preskaču E2E matricu, bez potrebe za oznakom.

## Detaljna kontrolna lista

### Pre izdavanja

- [ ] Svi PR-ovi usmereni na ovo izdanje su spojeni u `release/vX.Y.0`
- [ ] Svi otvoreni Linear/issue stavke za ovu verziju su zatvorene ili prebačene na sledeći milestone
- [ ] CI zeleno na `release/vX.Y.0` grani
- [ ] Nema `TODO(release)` markera u kodu: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker bazna slika je ažurna (trenutno `node:24.15.0-trixie-slim`)

### Verzija i Changelog

- [ ] Pokrenite `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - Povećava verziju u `package.json`, `electron/package.json`
  - Regeneriše `CHANGELOG.md` iz git commit-ova od poslednjeg taga
  - Ažurira README.md bedževe
- [ ] Ručno pregledajte CHANGELOG.md i po potrebi uredite commit poruke
- [ ] Osigurajte da najnovija semver sekcija u `CHANGELOG.md` odgovara verziji u `package.json`
- [ ] Zadržite `## [Unreleased]` kao prvu changelog sekciju za budući rad
- [ ] Ažurirajte `docs/openapi.yaml` → `info.version` mora biti jednak verziji u `package.json`

### Kvalitet koda

- [ ] `npm run lint` — 0 greška (upozorenja su postojeća)
- [ ] `npm run typecheck:core` — čisto
- [ ] `npm run typecheck:noimplicit:core` — čisto (strogo)
- [ ] `npm run check:cycles` — nema kružnih zavisnosti
- [ ] `npm run check:any-budget:t11` — u okviru budžeta
- [ ] `npm run check:route-validation:t06` — čisto
- [ ] `npm run check:node-runtime` — podržani runtime prag ispunjen (`>=22.22.2 <23`, `>=24.0.0 <27`, prema `SUPPORTED_NODE_RANGE` u `src/shared/utils/nodeRuntimeSupport.ts`; usklađeno sa `engines` u `package.json`)

### Testiranje

- [ ] `npm run test:unit` — prolazi
- [ ] `npm run test:vitest` — prolazi (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gejt 60/60/60/60 zadovoljen (statements/lines/functions/branches)
- [ ] `npm run test:integration` — prolazi (ako izmene dodiruju DB / handlere)
- [ ] `npm run test:combo:matrix` — prolazi (matrica combo strategija: dokazuje da svih 19 javnih strategija rutiranja donose determinističke odluke o izboru; pokrenite kada dodirujete combo rutiranje, rešavanje strategija ili fallback logiku)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opciono/ručno** (portovan real-upstream smoke test; preuzima read-only DB snapshot sa VPS `root@192.168.0.15`; pogađa realne provajdere, troši kredite; nikada se ne pokreće u CI; čisto se preskače bez gejta)
- [ ] `npm run test:combo:live:vps` — **opciono/ručno** (Phase-3 VPS live smoke: 7 HTTP scenarija naspram live `.15` servera preko čistog Node ESM; zahteva `ssh root@192.168.0.15`; kreira/briše samo `__live_test__*` combo-e; pogađa realne provajdere; nikada se ne pokreće u CI)
- [ ] `npm run test:e2e` — prolazi (UI izmene)
- [ ] `npm run test:protocols:e2e` — prolazi (MCP/A2A izmene)
- [ ] `npm run test:ecosystem` — prolazi

### Hook-ovi (validirano Husky-jem)

Husky hook-ovi se nalaze u `.husky/` i automatski se pokreću tokom git operacija.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** brzi deterministički gejtovi — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namerno isključuje `test:unit` (sporo; obuhvaćeno CI poslom `test-unit`).
  - Pokrenite `npm run test:unit` ručno pre push-a release grana.

Ako hook ne uspe: ispravite osnovni problem, ne zaobilazite sa `--no-verify`.

### Conventional Commits

Svi commit-ovi vezani za izdanje moraju pratiti format `type(scope): subject`.

**Validni tipovi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Validni opsezi (scope):** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Prelomne izmene (breaking changes): dodajte `BREAKING CHANGE:` footer ili `!` nakon scope-a (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` prolazi (automatski pokreće pre-commit)
- [ ] `npm run check:docs-all` prolazi (nadgejt: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` izlazi sa 0 — ugovor o env promenljivama kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je netaknut
- [ ] `npm run check:doc-links` izlazi sa 0 — nema polomljenih internih markdown referenci nakon restrukturiranja
- [ ] `docs/architecture/ARCHITECTURE.md` pregledan zbog odstupanja u storage/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` pregledan zbog odstupanja u env promenljivama i operativnim aspektima
- [ ] Ako je `.env.example` izmenjen: `docs/reference/ENVIRONMENT.md` je ažuriran
- [ ] Ako nova funkcionalnost ima UI: `docs/guides/USER_GUIDE.md` je pominje
- [ ] Ako nova funkcionalnost ima API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` su ažurirani
- [ ] Ako je nova funkcionalnost modul: postoji posvećen `docs/<MODULE>.md`
- [ ] Ako je prelomna izmena: `docs/guides/TROUBLESHOOTING.md` sadrži napomenu o migraciji

### i18n

- [ ] `npm run i18n:check` izlazi sa 0 — stanje prevoda (`.i18n-state.json`) je u sinhronizaciji sa izvornom dokumentacijom (nema odstupljenih izvora u strogom modu; savetodavno upozorenje je prihvatljivo za izmene dokumentacije u zadnji čas, ali treba da bude 0 pre tagovanja)
- [ ] `npm run i18n:check-ui-coverage` izlazi sa 0 — svaki UI lokal je na ili iznad praga pokrivenosti od 80%
- [ ] `npm run i18n:sync-ui:dry` izveštava o 0 nedostajućih ključeva u svih 42 lokala
- [ ] Ako su izvorni engleski dokumenti izmenjeni, pokrenite `npm run i18n:run` (zahteva `OMNIROUTE_TRANSLATION_API_KEY` u `.env`) pre tagovanja
- [ ] Prevodilački doprinosi mogu biti odloženi za sledeće izdanje ako su manji (pratite u CHANGELOG-u)

### Migracije baze podataka

- [ ] Ako `src/lib/db/migrations/` sadrži nove fajlove:
  - [ ] Svaka migracija je idempotentna (`CREATE TABLE IF NOT EXISTS`, itd.)
  - [ ] Migracije su umotane u transakcije
  - [ ] Numeracija je ispravna (nema praznina u sekvenci)
- [ ] Testirajte na svežoj instalaciji: obrišite `~/.omniroute/omniroute.db` i pokrenite `npm run dev`
- [ ] Testirajte na postojećoj instalaciji: napravite backup baze, pokrenite migraciju, provjerite šemu
- [ ] WAL fajlovi (`-wal`, `-shm`) su ispravno obrađeni ako migracija ponovo piše tabele

### Katalog provajdera (Zod-validiran)

- [ ] Zod šema u `src/shared/constants/providers.ts` je validna pri učitavanju
  - [ ] Svi provajderi imaju obavezna polja (`id`, `label`, `kind`, itd.)
  - [ ] `freeNote` je obezbeđen za nove besplatne provajdere
  - [ ] OAuth provajderi imaju `oauthConfig` registrovan u `src/lib/oauth/constants/oauth.ts`
- [ ] Ako je dodat novi provajder: odgovarajući executor u `open-sse/executors/`
- [ ] Ako format nije OpenAI: translator u `open-sse/translator/`
- [ ] Modeli registrovani u `open-sse/config/providerRegistry.ts`
- [ ] Unit testovi u `tests/unit/` pokrivaju klasifikaciju provajdera i rutiranje

### Desktop (Electron)

Ako je `electron/` izmenjen:

- [ ] `npm run electron:smoke:packaged` prolazi
- [ ] Build-ovi testirani za bar jedan od `:win`, `:mac`, `:linux`
- [ ] Sertifikati za potpisivanje koda nisu istekli (ako se potpisuje)
- [ ] Verzija u `electron/package.json` se poklapa sa root `package.json`
- [ ] Auto-update kanal pokazivač je ažuriran ako se izdaje na `stable`

### Build raspored

Repozitorijum koristi tri odvojena izlazna direktorijuma — nikada ih ne pomešajte:

| Direktorijum | Namena                                                            | Praćen?         |
| ------------ | ----------------------------------------------------------------- | --------------- |
| `src/`       | Izvorni kod aplikacije (TypeScript / TSX)                         | Da              |
| `.build/`    | Build intermediates — izlaz `next build`-a (`distDir`)            | Ne (gitignored) |
| `dist/`      | Spremni za slanje npm bundle — sastavljen od `assembleStandalone` | Ne (gitignored) |

> **Napomena operatera:** direktorijum slike na udaljenom VPS-u ostaje `/usr/lib/node_modules/omniroute/app/`.
> Samo se **u-repozitorijumski** build izlaz premestio (`app/` → `dist/`). Deploy skill-ovi rsync-uju
> sadržaj `dist/` u udaljeni `app/` direktorijum — nisu potrebne izmene VPS putanja.

**Tok jednog build-a:**

```
npm run build:release
  └─ rm -rf .build dist          (čišćenje)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ upisuje dist/BUILD_SHA       (HEAD sentinel)
```

NE pokrećite `npm run build` nakon čega slijedi odvojen `npm run build:cli` za deploy — koristite
`npm run build:release` koji radi čist rebuild + sentinel u jednoj komandi.

### Validacija artefakta

- [ ] `npm run build:release` uspešno se izvršava i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` čisto — nema `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, ili drugih lokalnih ostataka
- [ ] `dist/server.js` postoji nakon build-a

### Tagovanje i izdavanje

- [ ] Pokrenite `/generate-release-cc` (Claude Code skill):
  - Kreira tag `vX.Y.Z`
  - Push-uje tag i granu
  - Otvara GitHub Release sa changelog telom
  - Prilaže Electron instalatore (ako su izgrađeni)
- [ ] Ili ručno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skill-ovi koriste laki rsync tok — bez `npm pack`, bez `npm i -g`:

- [ ] Koristite deploy skill koji odgovara cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Pre deploy-a, potvrdite da `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build mora da se izvrši gde je `node_modules` stvaran (glavni checkout ili `npm ci`-ovan worktree — NE simlinkovan worktree)
- [ ] Smoke test deployovane instance:
  - Otvorite `/dashboard/health` → provjerite da string verzije odgovara izdanju
  - Pokrenite `/v1/chat/completions` zahtev naspram poznatog provajdera
  - Provjerite da `/api/monitoring/health` vraća `CLOSED` circuit breaker-e
  - Potvrdite da MCP transporti odgovaraju (`/mcp` HTTP, `/mcp-sse` SSE)

### Post-izdavanje

- [ ] Pokrenite `/capture-release-evidences-cc` (Claude Code skill)
  - Snima WebP screenshot-ove/snimke novih funkcionalnosti
  - Prilaže uz release notes / blog post
- [ ] Ažurirajte GitHub Discussions / Discord sa najavom izdanja
- [ ] Otvorite milestone za sledeću verziju
- [ ] Ako je kritično: prikačite (pin) diskusiju ili objavite u `news.json` za in-app baner

### Radar gejt javnog lansiranja

Radar najava je namerno commit-ovana sa `active: false`. Aktivacija je posebna
izmena nakon što je svaka stavka ispod dokazana:

- [ ] Svi naslagani Radar PR-ovi su spojeni i CI na vrhu release grane je zelen
- [ ] Deploy-ujte i smoke testirajte OSS Radar rute sa `RADAR_ENABLED` još isključenim po podrazumevanju
- [ ] Smoke testirajte `GET /planos`, `/termos`, `/privacidade`, i `/reembolso` na imenovanom Radar host-u
- [ ] Zabeležite identitet/kontakt/adresu operatera i pravni pregled odobren od vlasnika u privatnom servisu
- [ ] Isprobajte Stripe Checkout i potpisan webhook samo u test modu
- [ ] Isprobajte jednu isporuku enkriptovane transakcione e-poruke sa odobrenim pošiljaocem/domenom
- [ ] Dokažite backup restore i jedno nadgledano, budžetom ograničeno istraživačko pokretanje
- [ ] Odobrite politiku pregleda BRL/PIX pre prihvatanja dokaza o donaciji
- [ ] Omogućite javni Checkout samo nakon prethodnih gejtova, zatim aktivirajte novi `news.json` ID
- [ ] Provjerite da Home baner koristi lokalizovan tekst i da se novi ID ponovo pojavljuje nakon što je stariji ID odbačen

## Провера рада уграђених сервиса (v3.8.4+)

Пре објављивања сваке верзије која садржи измене уграђених сервиса, проверите:

### Покретање са свежом базом (открива сукобе миграција — додато после хотфикса v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — сачекајте 10 s за покретање
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` враћа `"9router"` (НЕ 404, НЕ 500). Потврђује да је миграција `071_services.sql` примењена + да је ред попуњен.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` враћа 3 реда.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` враћа 2 реда (потврђује да је `070_webhooks_kind_metadata.sql` примењена).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` пролази — штити од будућих сукоба.

### 9Router

- [ ] `POST /api/services/9router/install` враћа 200 са `installedVersion` за мање од 2 минута
- [ ] `POST /api/services/9router/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/9router/status` пријављује `health: "healthy"`
- [ ] `POST /v1/chat/completions` са `"model": "9router/auto/..."` враћа 200 (end-to-end рутирање кроз 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` рендерује изворни 9Router кориснички интерфејс унутар proxy-ja (без директног `127.0.0.1:port` iframe-а)
- [ ] `POST /api/services/9router/rotate-key` враћа `{ keyRotated: true }` и сервис се уредно поново покреће
- [ ] `POST /api/services/9router/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` враћа SSE стрим са `snapshot` догађајем који садржи недавне линије
- [ ] Инсталација у окружењу без `npm` у PATH-у враћа 500 са пријатељском (не stack-trace) поруком о грешци

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` враћа 200 за мање од 2 минута
- [ ] `POST /api/services/cliproxy/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/cliproxy/status` пријављује `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` враћа SSE стрим

### Безбедносна регресија

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` враћа `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` враћа `403 LOCAL_ONLY`
- [ ] Одговори са грешкама из `/api/services/*` не садрже `err.stack` ни апсолутне путеве до фајлова

## Провере за v3.8.0+

Пре објављивања сваке v3.8.x верзије, проверите ове додатне ставке:

- [ ] `omniroute --tray` се покреће на macOS-у (systray2 инсталиран у `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се покреће на Linux-у (захтева DISPLAY; учтива грешка ако није подешен)
- [ ] `omniroute --tray` се покреће на Windows-у (PowerShell NotifyIcon, без додатних бинарних фајлова)
- [ ] `omniroute config tray enable` креира autostart унос; disable га уклања
- [ ] `npm install -g omniroute@<this-version>` покреће postinstall без фаталног прекида
- [ ] Путања ажурирања чува опционе зависности: `omniroute update --apply` и аутоматски updater
      покрећу `npm install -g … --include=optional` тако да `optionalDependencies` (better-sqlite3,
      keytar, tls-client, и llmlingua SLM стек: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) преживе ажурирање. Ultra `modelPath` SLM ниво такође захтева
      tinybert модел, који се аутоматски преузима у `${DATA_DIR}/models/llmlingua` при првом коришћењу. Postinstall
      (`scripts/build/colocateOptionals.mjs`) затим смешта затвориште SLM опционих зависности у
      `dist/node_modules` тако да worker разреши ЈЕДНУ инстанцу `@huggingface/transformers` ^4.2.0
      — самосталан trace bundle укључује само transformers, а не динамички увезене
      опционе зависности, тако да без овога worker би учитао llmlingua-2 наспрам transformers-а из корена
      и SLM ниво би тихо fail-open-овао.
- [ ] `omniroute status` радi без `.env` фајла (путања CLI токена, само loopback)
- [ ] `curl http://localhost:20128/api/shutdown` враћа 401 (увек заштићена рута)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` враћа 401 (loopback заштита)
- [ ] SQLite runtime се разрешава на `bundled` при првом покретању (bundled бинарни фајл важи за платформу)
- [ ] SQLite runtime се пребацује на `runtime` када се обрише `node_modules/better-sqlite3`
- [ ] Smart MCP филтер компримује стварни излаз `playwright-mcp browser_snapshot` (≥50% смањења)
- [ ] Свих 10 `skills/omniroute*/SKILL.md` фајлова су јавно доступни путем raw GitHub URL-а
- [ ] Чаробњак за онбординг приказује корак обиласка нивоа "How It Works" при свежем подешавању
- [ ] Виджет покривености нивоа на почетној контролној табли приказује конфигурисане/активне бројеве

---

## Враћање на претходну верзију (Rollback)

Ако издање има критичан проблем:

1. `gh release edit vX.Y.Z --prerelease` (означава као не-најновије)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (само ако корисници још нису усвојили)
3. Или: hotfix на `release/vX.Y.0` → patch издање `vX.Y.(Z+1)`
4. Одмах обавестити заједницу на GitHub Discussions и Discord-у

## Стриктна правила

- Никада немојте директно комитовати на `main`
- Никада немојте користити `git push --force` на `main` или `release/*` гранама
- Никада немојте прескакати Husky hooks (`--no-verify`)
- Никада немојте комитовати тајне, креденцијале или `.env` фајлове
- Покривеност мора остати ≥60/60/60/60 (statements/lines/functions/branches)
- Увек укључите или ажурирајте тестове када мењате продукциони код у `src/`, `open-sse/`, `electron/` или `bin/`

## Аутоматизована провера синхронизације

Покрените локалну проверу синхронизације документације пре отварања PR-а:

```bash
npm run check:docs-sync
```

CI такође покреће ову проверу у `.github/workflows/ci.yml` (lint job).
