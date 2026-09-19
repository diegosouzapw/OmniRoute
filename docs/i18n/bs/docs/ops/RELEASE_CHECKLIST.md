# RELEASE_CHECKLIST (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

# Checklist za izdavanje (Release Checklist)

> **Zadnje ažurirano:** 2026-08-28 — v3.8.51
> Optimizovan proces izdavanja koji koristi Claude Code vještine za automatizaciju.
>
> **Održavajte queue/branch zelenim između izdanja:** pogledajte [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs` porodica + `npm run check:release-green` + `/babysit` + nightly). Periodično pokretanje
> ovoga — i posebno **prije** ovog checklista — čini da release PR krene kao zelen.

## TL;DR

```bash
# 1. Povećaj verziju + generiši CHANGELOG (vještina)
/version-bump-cc patch    # ili minor/major

# 2. Pokreni quality gate lokalno
npm run check              # lint + testovi
npm run test:coverage      # potpuni coverage gate (60/60/60/60)

# 3. Build & smoke
npm run build
npm run test:e2e           # opcionalno, ali preporučeno

# 4. Generiši release (vještina)
/generate-release-cc

# 5. Deploy (vještina)
/deploy-vps-both-cc        # ili akamai-cc / local-cc

# 6. Zapiši dokaze o izdanju (vještina)
/capture-release-evidences-cc
```

## npm Trusted Publishing (podrazumijevano od v3.8.51) — staged na zahtjev, direct kao fallback

`npm-publish.yml` objavljuje putem **npm Trusted Publishing (OIDC)** po defaultu:
`stage-npm` posao (hostovan na GitHub-u) zamjenjuje GitHub-ov id-token kratkotrajnim npm
credentialom za to pokretanje — nema dugotrajnih npm tokena u tajnama repozitorija, nema 2FA
zahtjeva, a provenance je priložen. To je zaobilaznica za npm sankcije sada kada se tokeni koji
zaobilaze 2FA povlače; to vraća potpuno automatski tok koji je projekat imao do v3.8.48, dok
zadržava WS1.3 garanciju (curenje tokena ne može samo po sebi objaviti — token ne postoji).

**Jednokratno podešavanje (vlasnik):** npmjs.com → paket `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Dok to ne bude kreirano, automatski korak će pasti sa `ENEEDAUTH`:
ponovite dispatch sa `publish_mode=staged` (ispod) ili `direct`.

### Staged objavljivanje (na zahtjev — `publish_mode=staged`)

npm-publish workflow više ne objavljuje direktno: on pokreće zapakovani tarball
(`check:pack-boot`) i zatim pokreće `npm stage publish` — tačni bajtovi su parkirani na
registru, **nisu instalabilni** dok vlasnik ne odobri. Ljudski 2FA gate je pomjeren
NAKON dokaza, a ne prije njega.

**Tok za vlasnika nakon što workflow postane zelen:**

1. `npm stage list omniroute` — pronađite stage id (također ispisan u workflow summary-ju).
2. Verifikujte staged bajtove (preporučeno): `npm stage download <id>`, zatim instalirajte
   preuzeti tarball u temp prefix i pokrenite ga (`npm run check:pack-boot` automatizuje
   isti pack→install→boot verdict u CI-ju).
3. `npm stage approve <id>` — 2FA zahtjev JE zapravo objavljivanje. `npm stage reject <id>` odbacuje.
4. Post-publish mreža: post-publish verifikator (WS1.4 plana v3.8.49) instalira
   objavljenu verziju sa javnog registra u čistom kontejneru i pokreće je.

**Hitni fallback:** `workflow_dispatch` sa `publish_mode=direct` vraća
naslijeđeni trenutni `npm publish` (koristiti samo ako staging sam po sebi ne radi ispravno; zabilježiti zašto).

**Jednokratno ojačavanje (vlasnik, npmjs.com):** konfigurišite Trusted Publisher za
`omniroute` u stage-only modu tako da curenje dugotrajnog tokena ne može `npm publish`
direktno s bilo kojeg mjesta — CI može samo stage-ovati; samo vlasnikov 2FA objavljuje.

**Playbook za neispravne artefakte (nepromijenjeno):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
kao defaultni refleks (minuti, reverzibilno); `npm unpublish` samo unutar prozora od 72h/bez-zavisnosti
i nikada kao prvi potez. Docker: nikada ne prepisujte tag verzije — rollback je
preusmjeravanje `latest` na posljednji ispravan digest.

**Docker Hub `latest` (obavezno pri svakom stabilnom SemVer objavljivanju):**
`docker-publish` workflow mora tagovati **i** `X.Y.Z` i, kada
`should-promote-latest.sh` potvrdi da je ovo najviši stabilni SemVer, `:latest`
sa **istim digestom**. Nakon posla: Hub `latest` digest je jednak novom
SemVer digestu i `last_updated` je pomjeren. Ne ostavljajte `:latest` na starijem
build-u dok release notes govore o ispravkama koje postoje samo na git-u. Compose
quickstarts koriste `:latest`; GitOps bi trebao nastaviti pinovati `X.Y.Z`. Pogledajte
[Docker release channels](../guides/DOCKER_GUIDE.md#release-channels) i #10317.

## Hotfix Fast-Lane (label `hotfix`)

PR označen sa `hotfix` preskače tešku CI matricu (9-shard E2E, coverage ratchet, Quality-gate, quality-extended) i zadržava brze gate-ove sa visokim signalom: build, Unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact` i tarball boot-smoke (`check:pack-boot`). Cilj: zeleno u ≤15min umjesto ~33min.

**Ulazna polisa — svih četiri su obavezne (modelirano prema Chromium/VS Code/Node hitnim trakama):**

1. **Ozbiljnost (Severity)**: produkcija je pokvarena — objavljeni artefakt puca pri pokretanju / sigurnosna ispravka / svaki korisnik verzije je pogođen. "Važno" nije isto što i "pokvareno".
2. **Autoritet**: samo vlasnik repozitorija dodaje `hotfix` labelu. Labela JE odobrenje — nikada ne radite samostalno na kampanjskom PR-u.
3. **Dokaz**: tijelo PR-a linkuje prethodno potpuno zeleno teško pokretanje (skup poslova koje preskočeni job-ovi bi ponovo validirali) plus test same ispravke koji je prvo pao, a zatim prošao.
4. **Opseg (Scope)**: samo cherry-pick — minimalna ispravka, bez refaktoringa, bez dodatnih promjena.

Preskočena površina coverage/ratchet-a ponovo se validira sljedećim punim pokretanjem na release grani (kontinuirano release-green) — ova traka preskače ČEKANJE, nikada validaciju. Diff-ovi koji sadrže samo testove (svi fajlovi pod `tests/`, nijedan pod `tests/e2e/`) automatski preskaču E2E matricu, bez ikakve labele.

## Detaljan Checklist

### Pre-release

- [ ] Svi PR-ovi namijenjeni ovom izdanju su merge-ovani u `release/vX.Y.0`
- [ ] Svi otvoreni Linear/issue stavke za ovu verziju su zatvorene ili pomjerene na sljedeći milestone
- [ ] CI je zelen na `release/vX.Y.0` grani
- [ ] Nema `TODO(release)` markera u kodu: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker bazna slika je ažurirana (`node:24.15.0-trixie-slim`)

### Verzija & Changelog

- [ ] Pokreni `/version-bump-cc <patch|minor|major>` (Claude Code skill)
- Povećava verziju u `package.json`, `electron/package.json`
- Ponovo generiše `CHANGELOG.md` iz git commit-ova od zadnjeg taga
- Ažurira README.md bedževe
- [ ] Ručno pregledaj CHANGELOG.md i očisti poruke commit-ova ako je potrebno
- [ ] Provjeri da li najnoviji semver sekcija u `CHANGELOG.md` odgovara verziji u `package.json`
- [ ] Zadrži `## [Unreleased]` kao prvu sekciju changeloga za predstojeći rad
- [ ] Ažuriraj `docs/openapi.yaml` → `info.version` mora odgovarati verziji u `package.json`

### Kvalitet koda

- [ ] `npm run lint` — 0 grešaka (upozorenja su već postojala)
- [ ] `npm run typecheck:core` — čisto
- [ ] `npm run typecheck:noimplicit:core` — čisto (strogo)
- [ ] `npm run check:cycles` — nema kružnih zavisnosti
- [ ] `npm run check:any-budget:t11` — unutar budžeta
- [ ] `npm run check:route-validation:t06` — čisto
- [ ] `npm run check:node-runtime` — ispunjen minimalni podržani runtime (`>=22.22.2 <23`, `>=24.0.0 <27`, prema `SUPPORTED_NODE_RANGE` u `src/shared/utils/nodeRuntimeSupport.ts`; usklađeno sa `package.json` `engines`)

### Testiranje

- [ ] `npm run test:unit` — prošlo
- [ ] `npm run test:vitest` — prošlo (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — gate 60/60/60/60 zadovoljen (statements/lines/functions/branches)
- [ ] `npm run test:integration` — prošlo (ako promjene dotiču DB / handlere)
- [ ] `npm run test:combo:matrix` — prošlo (combo strategija matrica: dokazuje determinističke odluke o selekciji svih 19 javnih routing strategija; pokrenuti kada se dira combo routing, rezolucija strategije ili fallback logika)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcionalno/ručno** (gated real-upstream smoke; koristi read-only DB snapshot sa VPS-a `root@192.168.0.15`; kontaktira stvarne provajdere, troši kredite; nikada se ne pokreće u CI; preskače čisto bez gate-a)
- [ ] `npm run test:combo:live:vps` — **opcionalno/ručno** (Phase-3 VPS live smoke: 7 HTTP scenarija protiv live `.15` servera putem običnog Node ESM; zahtijeva `ssh root@192.168.0.15`; kreira/briše samo `__live_test__*` combo-e; kontaktira stvarne provajdere; nikada se ne pokreće u CI)
- [ ] `npm run test:e2e` — prošlo (UI promjene)
- [ ] `npm run test:protocols:e2e` — prošlo (MCP/A2A promjene)
- [ ] `npm run test:ecosystem` — prošlo

### Hook-ovi (Husky validirani)

Husky hook-ovi se nalaze u `.husky/` i pokreću se automatski prilikom git operacija.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** brzi deterministički gate-ovi — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivirano 2026-06-13). Namjerno isključuje `test:unit` (spor; pokriven CI `test-unit` job-om).
- Pokreni `npm run test:unit` ručno prije push-ovanja release grana.

Ako hook ne uspije: popravi osnovni problem, nemoj zaobilaziti pomoću `--no-verify`.

### Conventional Commits

Svi commit-ovi namijenjeni izdanju moraju pratiti format `type(scope): subject`.

**Validni tipovi:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Validni opsezi (scopes):** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking promjene: dodaj `BREAKING CHANGE:` u footer ili `!` nakon opsega (npr. `feat(api)!: drop /v0`).

### Dokumentacija

- [ ] `npm run check:docs-sync` prolazi (automatski pokreće pre-commit)
- [ ] `npm run check:docs-all` prolazi (krovni test: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` izlazi sa 0 — ugovor o okruženju između koda ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je netaknut
- [ ] `npm run check:doc-links` izlazi sa 0 — nema pokvarenih internih markdown referenci nakon restrukturiranja
- [ ] `docs/architecture/ARCHITECTURE.md` pregledan na račun odstupanja u skladištenju/runtime-u
- [ ] `docs/guides/TROUBLESHOOTING.md` pregledan na račun odstupanja u env varijablama i operacijama
- [ ] Ako je `.env.example` izmijenjen: `docs/reference/ENVIRONMENT.md` je ažuriran
- [ ] Ako nova funkcionalnost ima UI: `docs/guides/USER_GUIDE.md` je spominje
- [ ] Ako nova funkcionalnost ima API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` su ažurirani
- [ ] Ako je nova funkcionalnost modul: postoji namjenski `docs/<MODULE>.md`
- [ ] Ako postoji breaking change: `docs/guides/TROUBLESHOOTING.md` sadrži napomenu o migraciji

### i18n

- [ ] `npm run i18n:check` izlazi sa 0 — stanje prevoda (`.i18n-state.json`) je usklađeno sa izvornom dokumentacijom (nema odstupanja izvora u strict modu; warn-mode savjet je prihvatljiv za zadnje izmjene dokumentacije, ali treba biti 0 prije tagiranja)
- [ ] `npm run i18n:check-ui-coverage` izlazi sa 0 — svaki UI lokal je na ili iznad praga pokrivenosti od 80%
- [ ] `npm run i18n:sync-ui:dry` prijavljuje 0 nedostajućih ključeva kroz svih 42 lokala
- [ ] Ako su izvorne engleske dokumentacije izmijenjene, pokrenite `npm run i18n:run` (zahtijeva `OMNIROUTE_TRANSLATION_API_KEY` u `.env`) prije tagiranja
- [ ] Doprinosi prevodima se mogu odgoditi za sljedeće izdanje ako su minorne (pratiti u CHANGELOG-u)

### Migracije baze podataka

- [ ] Ako `src/lib/db/migrations/` ima nove datoteke:
  - [ ] Svaka migracija je idempotentna (`CREATE TABLE IF NOT EXISTS`, itd.)
  - [ ] Migracije su obavijene transakcijama
  - [ ] Ispravno numerisane (bez praznina u sekvenci)
- [ ] Testirajte na svježoj instalaciji: obrišite `~/.omniroute/omniroute.db` i pokrenite `npm run dev`
- [ ] Testirajte na postojećoj instalaciji: napravite backup baze, pokrenite migraciju, verifikujte šemu
- [ ] WAL datoteke (`-wal`, `-shm`) su ispravno obrađene ako migracija ponovo piše tabele

### Katalog provajdera (Zod-validirano)

- [ ] `src/shared/constants/providers.ts` Zod šema je validna prilikom učitavanja
  - [ ] Svi provajderi imaju zahtijevana polja (`id`, `label`, `kind`, itd.)
  - [ ] `freeNote` je dostavljen za nove besplatne provajdere
  - [ ] OAuth provajderi imaju registrovani `oauthConfig` u `src/lib/oauth/constants/oauth.ts`
- [ ] Ako je dodan novi provajder: odgovarajući executor u `open-sse/executors/`
- [ ] Ako nije u OpenAI formatu: translator u `open-sse/translator/`
- [ ] Modeli registrovani u `open-sse/config/providerRegistry.ts`
- [ ] Unit testovi u `tests/unit/` pokrivaju klasifikaciju i rutiranje provajdera

### Desktop (Electron)

Ako je `electron/` izmijenjen:

- [ ] `npm run electron:smoke:packaged` prolazi
- [ ] Buildovi testirani za barem jedan od `:win`, `:mac`, `:linux`
- [ ] Certifikati za potpisivanje koda nisu istekli (ako se potpisuje)
- [ ] Verzija u `electron/package.json` se podudara sa root `package.json`
- [ ] Pokazivač kanala za auto-update je ažuriran ako se izdaje u `stable`

### Build Layout

Repozitorij koristi tri različita izlazna direktorija — nikada ih nemojte miješati:

| Direktorij | Svrha                                                        | Praćeno?        |
| ---------- | ------------------------------------------------------------ | --------------- |
| `src/`     | Izvor aplikacije (TypeScript / TSX)                          | Da              |
| `.build/`  | Build intermediari — `next build` izlaz (`distDir`)          | Ne (gitignored) |
| `dist/`    | Shippable npm bundle — sastavljen putem `assembleStandalone` | Ne (gitignored) |

> **Napomena za operatora:** direktorij udaljene VPS slike ostaje `/usr/lib/node_modules/omniroute/app/`.
> Samo je izlaz builda **unutar repozitorija** pomjeren (`app/` → `dist/`). Deploy skillovi rsync-uju
> sadržaj `dist/` u udaljeni `app/` dir — nisu potrebne promjene putanje na VPS-u.

**Single-build tok:**

```
npm run build:release
  └─ rm -rf .build dist          (čišćenje)
  └─ next build → .build/next/   (intermediari)
  └─ assembleStandalone          (kopira standalone + static + public + natives → dist/)
  └─ piše dist/BUILD_SHA       (HEAD sentinel)
```

NE pokrećite `npm run build` a zatim zaseban `npm run build:cli` za deploy — koristite
`npm run build:release` koji vrši čisti rebuild + sentinel u jednoj komandi.

### Validacija artefakata

- [ ] `npm run build:release` uspijeva i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` je čist — nema `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, ili drugih lokalnih ostataka
- [ ] `dist/server.js` postoji nakon builda

### Tagiranje i Release

- [ ] Pokrenite `/generate-release-cc` (Claude Code skill):
  - Kreira tag `vX.Y.Z`
  - Push-uje tag i granu
  - Otvara GitHub Release sa changelog tijelom
  - Prilaže Electron instalere (ako su buildovani)
- [ ] Ili ručno:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Deploy skillovi koriste lagani rsync tok — bez `npm pack`, bez `npm i -g`:

- [ ] Koristite deploy skill koji odgovara cilju:
  - `/deploy-vps-local-cc` — lokalni VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Prije deploy-a, potvrdite da je `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build mora biti pokrenut tamo gdje je `node_modules` stvaran (glavni checkout ili `npm ci`'d worktree — NE symlinked worktree)
- [ ] Smoke test deployovane instance:
  - Otvorite `/dashboard/health` → provjerite da li se string verzije podudara sa release-om
  - Pokrenite `/v1/chat/completions` zahtjev prema poznatom provajderu
  - Verifikujte da `/api/monitoring/health` vraća `CLOSED` circuit breakere
  - Potvrdite da MCP transporti odgovaraju (`/mcp` HTTP, `/mcp-sse` SSE)

### Post-release

- [ ] Pokreni `/capture-release-evidences-cc` (Claude Code skill)
  - Snima WebP screenshotove/snimke novih funkcionalnosti
  - Prilaže ih uz release notes / blog post
- [ ] Ažuriraj GitHub Discussions / Discord sa objavom o izlaženju verzije
- [ ] Otvori milestone za sljedeću verziju
- [ ] Ako je kritično: zakači (pin) diskusiju ili objavi u `news.json` za in-app banner

### Radar public-launch gate

Radar obavijest je namjerno commitovana sa `active: false`. Aktivacija je zasebna
promjena nakon što se za svaku stavku ispod prilože dokazi:

- [ ] Svi nagomilani (stacked) Radar PR-ovi su merge-ovani i release-tip CI je zelen
- [ ] Deploy-uj i testiraj (smoke test) OSS Radar rute dok je `RADAR_ENABLED` i dalje isključen po defaultu
- [ ] Testiraj `GET /planos`, `/termos`, `/privacidade`, i `/reembolso` na imenovanom Radar hostu
- [ ] Zapiši identitet/kontakt/adresu operatora i pravni pregled odobren od strane vlasnika u privatnom servisu
- [ ] Testiraj Stripe Checkout i potpisani webhook isključivo u test modu
- [ ] Testiraj jednu isporuku enkriptovanog transakcijskog emaila sa odobrenim pošiljateljem/domenom
- [ ] Dokaži restore backup-a i jedno nadzirano, budžetski ograničeno istraživačko pokretanje (research run)
- [ ] Odobri BRL/PIX polisu pregleda prije prihvatanja dokaza o donacijama
- [ ] Omogući javni Checkout tek nakon prethodnih koraka, zatim aktiviraj novi `news.json` ID
- [ ] Provjeri da li Home banner koristi lokalizovani tekst i da li se novi ID ponovo pojavljuje nakon što je stari ID zatvoren

## Embedded Services smoke (v3.8.4+)

Prije slanja bilo kojeg release-a koji uključuje izmjene u embedded servisima, provjerite:

### Fresh-DB boot (hvata kolizije migracija — dodano nakon v3.8.4 hotfix-a)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — sačekajte 10 s za boot
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vraća `"9router"` (NE 404, NE 500). Potvrđuje da je migracija `071_services.sql` primijenjena + red je seed-ovan.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vraća 3 reda.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vraća 2 reda (validira da je `070_webhooks_kind_metadata.sql` primijenjena).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prolazi — štiti od budućih kolizija.

### 9Router

- [ ] `POST /api/services/9router/install` vraća 200 sa `installedVersion` za manje od 2 min
- [ ] `POST /api/services/9router/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/9router/status` izvještava `health: "healthy"`
- [ ] `POST /v1/chat/completions` sa `"model": "9router/auto/..."` vraća 200 (end-to-end rutiranje kroz 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderuje 9Router native UI unutar proxy-ja (bez direktnog `127.0.0.1:port` iframe-a)
- [ ] `POST /api/services/9router/rotate-key` vraća `{ keyRotated: true }` i servis se ponovo pokreće bez grešaka
- [ ] `POST /api/services/9router/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vraća SSE stream sa `snapshot` eventom koji sadrži nedavne linije
- [ ] Instalacija u okruženju bez `npm` u PATH-u vraća 500 sa ljubaznom porukom o grešci (bez stack-trace-a)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vraća 200 za manje od 2 min
- [ ] `POST /api/services/cliproxy/start` vraća 200 i `state: "running"` za manje od 30 s
- [ ] `GET /api/services/cliproxy/status` izvještava `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vraća 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vraća SSE stream

### Security regression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vraća `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vraća `403 LOCAL_ONLY`
- [ ] Odgovori na greške sa `/api/services/*` ne sadrže `err.stack` ili apsolutne putanje do datoteka

## v3.8.0+ provjere

Prije slanja bilo kojeg v3.8.x release-a, provjerite ove dodatne stavke:

- [ ] `omniroute --tray` se pokreće na macOS-u (systray2 instaliran u `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se pokreće na Linux-u (zahtijeva DISPLAY; ljubazna greška ako nije postavljen)
- [ ] `omniroute --tray` se pokreće na Windows-u (PowerShell NotifyIcon, bez dodatnih binarnih datoteka)
- [ ] `omniroute config tray enable` kreira unos za autostart; disable ga uklanja
- [ ] `npm install -g omniroute@<this-version>` pokreće postinstall bez fatalnog izlaska
- [ ] Putanja za update zadržava opcionalne zavisnosti: `omniroute update --apply` i auto-updater
      pokreću `npm install -g … --include=optional` tako da `optionalDependencies` (better-sqlite3,
      keytar, tls-client, i llmlingua SLM stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) prežive update. Ultra `modelPath` SLM tier također zahtijeva
      tinybert model, koji se automatski preuzima u `${DATA_DIR}/models/llmlingua` pri prvoj upotrebi. Postinstall
      (`scripts/build/colocateOptionals.mjs`) zatim kolocira SLM opcionalni closure u
      `dist/node_modules` tako da worker razriješi JEDNU `@huggingface/transformers` ^4.2.0
      instancu — standalone trace bundle sadrži samo transformers, ne i dinamički-importovane
      opcionalne zavisnosti, pa bi bez ovoga worker učitao llmlingua-2 protiv root-ovih transformers-a
      i SLM tier bi tiho zakazao (fail-open).
- [ ] `omniroute status` radi bez `.env` (CLI token putanja, samo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vraća 401 (uvijek zaštićena ruta)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vraća 401 (loopback zaštita)
- [ ] SQLite runtime se razriješi kao `bundled` pri prvom pokretanju (bundled binarni fajl validan za platformu)
- [ ] SQLite runtime se povlači na `runtime` kada je `node_modules/better-sqlite3` obrisan
- [ ] Smart MCP filter kompresuje pravi `playwright-mcp browser_snapshot` output (≥50% redukcije)
- [ ] Svih 10 `skills/omniroute*/SKILL.md` datoteka su javno dostupne putem raw GitHub URL-a
- [ ] Onboarding wizard prikazuje "How It Works" tier tour korak pri novoj instalaciji
- [ ] Home dashboard tier coverage widget prikazuje konfigurisane/aktivne brojeve

---

## Povlačenje izmjena (Rollback)

Ako verzija ima kritičan problem:

1. `gh release edit vX.Y.Z --prerelease` (označava kao ne-najnoviju)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo ako korisnici još nisu usvojili verziju)
3. Ili: hotfix na `release/vX.Y.0` → patch verzija `vX.Y.(Z+1)`
4. Odmah obavijestite korisnike putem GitHub Discussions i Discorda

## Stroga pravila

- Nikada ne radite commit direktno u `main`
- Nikada ne koristite `git push --force` na `main` ili `release/*` grane
- Nikada ne preskačite Husky hook-ove (`--no-verify`)
- Nikada ne commit-ujte tajne, kredencijale ili `.env` datoteke
- Pokrivenost (Coverage) mora ostati ≥60/60/60/60 (iskazi/linije/funkcije/grane)
- Uvijek uključite ili ažurirajte testove kada mijenjate produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`

## Automatska provjera sinhronizacije

Pokrenite čuvar sinhronizacije dokumentacije lokalno prije otvaranja PR-a:

```bash
npm run check:docs-sync
```

CI također pokreće ovu provjeru u `.github/workflows/ci.yml` (lint job).
