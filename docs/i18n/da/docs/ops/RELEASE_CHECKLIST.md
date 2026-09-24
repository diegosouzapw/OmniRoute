# Release Checklist (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Senest opdateret:** 2026-08-28 — v3.8.51
> Strømlinet releaseflow, der udnytter Claude Code-skills til automatisering.
>
> **Hold køen/branchen grøn mellem releases:** se [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-familien + `npm run check:release-green` + `/babysit` + natlig kørsel). Ved at køre
> dette regelmæssigt — og især **før** denne tjekliste — starter release-PR'en grønt.

## Kort fortalt

```bash
# 1. Opdater versionen + generér CHANGELOG (skill)
/version-bump-cc patch    # eller minor/major

# 2. Kør kvalitetstjekket lokalt
npm run check              # lint + tests
npm run test:coverage      # fuldt dækningskrav (60/60/60/60)

# 3. Byg og røgtest
npm run build
npm run test:e2e           # valgfrit, men anbefalet

# 4. Generér release (skill)
/generate-release-cc

# 5. Udrul (skill)
/deploy-vps-both-cc        # eller akamai-cc / local-cc

# 6. Indsaml releasedokumentation (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (standard siden v3.8.51) — staged efter anmodning, direct som fallback

`npm-publish.yml` udgiver som standard via **npm Trusted Publishing (OIDC)**:
`stage-npm`-jobbet (hostet af GitHub) udveksler GitHubs id-token med en kortlivet npm-
legitimationsoplysning til den pågældende kørsel — intet langlivet npm-token i repository secrets, ingen 2FA-anmodning, provenance vedhæftet.
Det er den omgåelse, npm nu godkender, idet tokens, der springer 2FA over, er ved at blive udfaset;
det genetablerer det fuldautomatiske flow, som projektet havde frem til v3.8.48, samtidig med at
WS1.3-garantien bevares (et lækket token kan ikke udgive alene — der er intet token).

**Engangsopsætning (ejer):** npmjs.com → pakken `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Indtil dette findes, fejler det automatiske trin med `ENEEDAUTH`:
start det igen med `publish_mode=staged` (nedenfor) eller `direct`.

### Staged-udgivelse (efter anmodning — `publish_mode=staged`)

npm-publish-workflowet udgiver ikke længere direkte: Det starter den pakkede tarball
(`check:pack-boot`) og kører derefter `npm stage publish` — de præcise bytes parkeres i
registreringsdatabasen og kan **ikke installeres**, før ejeren godkender dem. Den menneskelige 2FA-kontrol er flyttet
til EFTER beviset, ikke før det.

**Ejerens flow, efter at workflowet bliver grønt:**

1. `npm stage list omniroute` — find stage-id'et (det vises også i workflowoversigten).
2. Kontrollér de staged bytes (anbefalet): `npm stage download <id>`, installér derefter den
   downloadede tarball i et midlertidigt prefix, og start den (`npm run check:pack-boot` automatiserer
   den samme pack→install→boot-afgørelse i CI).
3. `npm stage approve <id>` — 2FA-anmodningen ER udgivelsen. `npm stage reject <id>` kasserer den.
4. Sikkerhedsnet efter udgivelsen: Verifikatoren efter udgivelsen (WS1.4 i v3.8.49-planen) installerer den
   udgivne version fra den offentlige registreringsdatabase i en ren container og starter den.

**Nødfallback:** `workflow_dispatch` med `publish_mode=direct` genetablerer den
tidligere øjeblikkelige `npm publish` (brug kun dette, hvis staging selv opfører sig forkert; dokumentér hvorfor).

**Engangshærdning (ejer, npmjs.com):** Konfigurér Trusted Publisher for
`omniroute` i stage-only-tilstand, så et lækket langlivet token ikke kan køre `npm publish`
direkte fra noget sted — CI kan kun stage; kun ejerens 2FA kan frigive.

**Procedure ved defekte artefakter (uændret):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
som standardreaktion (minutter, reversibel); `npm unpublish` kun inden for 72-timers-/ingen-afhængige-
vinduet og aldrig som første handling. Docker: Omskriv aldrig et versionstag — rollback sker ved at
pege `latest` på det seneste velfungerende digest.

**Docker Hub `latest` (påkrævet ved hver stabil SemVer-udgivelse):**
`docker-publish`-workflowet skal tagge **både** `X.Y.Z` og, når
`should-promote-latest.sh` bekræfter, at dette er den højeste stabile SemVer, `:latest`
med **samme digest**. Efter jobbet: Hub-`latest`-digestet er lig med det nye
SemVer-digest, og `last_updated` er blevet opdateret. Lad ikke `:latest` pege på et ældre
build, mens releasenoter omtaler rettelser, der kun findes i git. Compose-
quickstarts bruger `:latest`; GitOps bør fortsat fastlåse `X.Y.Z`. Se
[Docker-releasekanaler](../guides/DOCKER_GUIDE.md#release-channels) og #10317.

## Hurtig hotfix-bane (label `hotfix`)

En PR med labelen `hotfix` springer den tunge CI-matrix over (E2E med 9 shards, dækningsgradsspærre,
quality-gate, quality-extended) og beholder de hurtige kontrolpunkter med høj signalværdi: build,
unit-shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
og boot-smoke-testen for tarballen (`check:pack-boot`). Mål: grønt resultat på ≤15 min. i stedet for ~33 min.

**Adgangspolitik — alle fire krav skal være opfyldt (modelleret efter nødbaner i Chromium/VS Code/Node):**

1. **Alvorlighed**: produktionen er defekt — en udgivet artefakt crasher ved opstart / en
   sikkerhedsrettelse / alle brugere af udgivelsen er berørt. "Vigtigt" er ikke det samme som "defekt".
2. **Bemyndigelse**: kun ejeren af repository'et må anvende labelen `hotfix`. Labelen ER
   godkendelsen — brug den aldrig på eget initiativ på en kampagne-PR.
3. **Dokumentation**: PR-beskrivelsen linker til den seneste helt grønne, tunge kørsel (den suite, som
   de oversprungne jobs ellers ville validere igen) samt rettelsens egen test, der først fejler og derefter består.
4. **Omfang**: kun cherry-pick — den mindst mulige rettelse, ingen refaktoreringer og ingen medfølgende ændringer.

Det oversprungne dæknings-/ratchet-område valideres igen af den næste fulde kørsel på
release-branchen (kontinuerligt grønt release-resultat) — banen springer VENTETID over, aldrig validering.
Ændringer, der kun vedrører tests (alle filer under `tests/`, ingen under `tests/e2e/`), springer automatisk
E2E-matrixen over uden nogen label.

## Detaljeret tjekliste

### Før udgivelse

- [ ] Alle PR'er, der er målrettet denne udgivelse, er flettet ind i `release/vX.Y.0`
- [ ] Alle åbne Linear-/issue-punkter for denne version er lukket eller flyttet til næste milepæl
- [ ] CI er grøn på branchen `release/vX.Y.0`
- [ ] Ingen `TODO(release)`-markører i koden: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker-baseimaget er opdateret (aktuelt `node:24.15.0-trixie-slim`)

### Version og ændringslog

- [ ] Kør `/version-bump-cc <patch|minor|major>` (Claude Code-skill)
  - Opdaterer versionen i `package.json`, `electron/package.json`
  - Genererer `CHANGELOG.md` igen ud fra git-commits siden det seneste tag
  - Opdaterer badges i README.md
- [ ] Gennemgå CHANGELOG.md manuelt, og ryd op i commit-beskeder efter behov
- [ ] Sørg for, at den seneste semver-sektion i `CHANGELOG.md` svarer til versionen i `package.json`
- [ ] Behold `## [Unreleased]` som den første sektion i ændringsloggen til kommende arbejde
- [ ] Opdater `docs/openapi.yaml` → `info.version` skal svare til versionen i `package.json`

### Kodekvalitet

- [ ] `npm run lint` — 0 fejl (advarslerne fandtes allerede)
- [ ] `npm run typecheck:core` — uden fejl
- [ ] `npm run typecheck:noimplicit:core` — uden fejl (streng)
- [ ] `npm run check:cycles` — ingen cirkulære afhængigheder
- [ ] `npm run check:any-budget:t11` — inden for budgettet
- [ ] `npm run check:route-validation:t06` — uden fejl
- [ ] `npm run check:node-runtime` — minimumskravet til den understøttede runtime er opfyldt (`>=22.22.2 <23`, `>=24.0.0 <27`, ifølge `SUPPORTED_NODE_RANGE` i `src/shared/utils/nodeRuntimeSupport.ts`; afstemt med `package.json` `engines`)

### Test

- [ ] `npm run test:unit` — består
- [ ] `npm run test:vitest` — består (MCP-server, autoCombo, cache)
- [ ] `npm run test:coverage` — kravet på 60/60/60/60 er opfyldt (statements/lines/functions/branches)
- [ ] `npm run test:integration` — består (hvis ændringer berører DB/handlers)
- [ ] `npm run test:combo:matrix` — består (matrix for kombinationsstrategier: dokumenterer deterministisk udvælgelsesbeslutningerne for alle 19 offentlige routingstrategier; køres ved ændringer af kombinationsrouting, strategiopløsning eller fallback-logik)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **valgfri/manuel** (adgangsbegrænset smoke-test mod den reelle upstream; henter et skrivebeskyttet DB-snapshot fra VPS'en `root@192.168.0.15`; rammer virkelige udbydere og koster kreditter; køres aldrig i CI; springes rent over uden adgang)
- [ ] `npm run test:combo:live:vps` — **valgfri/manuel** (fase 3-VPS-live-smoke-test: 7 HTTP-scenarier mod den aktive `.15`-server via almindelig Node ESM; kræver `ssh root@192.168.0.15`; opretter/sletter kun `__live_test__*`-kombinationer; rammer virkelige udbydere; køres aldrig i CI)
- [ ] `npm run test:e2e` — består (UI-ændringer)
- [ ] `npm run test:protocols:e2e` — består (MCP-/A2A-ændringer)
- [ ] `npm run test:ecosystem` — består

### Hooks (valideret med Husky)

Husky-hooks ligger i `.husky/` og køres automatisk ved git-operationer.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** hurtige, deterministiske kontrolpunkter — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiveret 2026-06-13). Udelader bevidst `test:unit` (langsom; dækkes af CI-jobbet `test-unit`).
  - Kør `npm run test:unit` manuelt, før der pushes release-branches.

Hvis et hook fejler: ret det underliggende problem; omgå det ikke med `--no-verify`.

### Conventional Commits

Alle commits, der skal med i udgivelsen, skal følge formatet `type(scope): subject`.

**Gyldige typer:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Gyldige scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: tilføj footeren `BREAKING CHANGE:` eller `!` efter scopet (f.eks. `feat(api)!: drop /v0`).

### Dokumentation

- [ ] `npm run check:docs-sync` består (køres automatisk af pre-commit)
- [ ] `npm run check:docs-all` består (samlet kontrol: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` afsluttes med 0 — miljøkontrakten mellem kode ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` er intakt
- [ ] `npm run check:doc-links` afsluttes med 0 — ingen brudte interne markdown-referencer efter omstruktureringen
- [ ] `docs/architecture/ARCHITECTURE.md` er gennemgået for afvigelser i lager/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` er gennemgået for afvigelser i miljøvariabler og drift
- [ ] Hvis `.env.example` er ændret: `docs/reference/ENVIRONMENT.md` er opdateret
- [ ] Hvis en ny funktion har en brugergrænseflade: `docs/guides/USER_GUIDE.md` omtaler den
- [ ] Hvis en ny funktion har en API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` er opdateret
- [ ] Hvis en ny funktion er et modul: en dedikeret `docs/<MODULE>.md` findes
- [ ] Hvis der er en inkompatibel ændring: `docs/guides/TROUBLESHOOTING.md` indeholder en migrationsnote

### i18n

- [ ] `npm run i18n:check` afsluttes med 0 — oversættelsestilstanden (`.i18n-state.json`) er synkroniseret med kildedokumentationen (ingen afvigende kilder i streng tilstand; en advarselstilstand er acceptabel ved sidsteøjebliksrettelser i dokumentationen, men resultatet bør være 0 før tagging)
- [ ] `npm run i18n:check-ui-coverage` afsluttes med 0 — alle brugergrænsefladesprog ligger på eller over dækningsgrænsen på 80 %
- [ ] `npm run i18n:sync-ui:dry` rapporterer 0 manglende nøgler på tværs af alle 42 sprog
- [ ] Hvis den engelske kildedokumentation er ændret, skal `npm run i18n:run` køres (kræver `OMNIROUTE_TRANSLATION_API_KEY` i `.env`) før tagging
- [ ] Oversættelsesbidrag kan udskydes til næste udgivelse, hvis de er mindre væsentlige (registrér dem i CHANGELOG)

### Databasemigreringer

- [ ] Hvis `src/lib/db/migrations/` indeholder nye filer:
  - [ ] Hver migrering er idempotent (`CREATE TABLE IF NOT EXISTS` osv.)
  - [ ] Migreringer er pakket ind i transaktioner
  - [ ] De er nummereret korrekt (ingen huller i rækkefølgen)
- [ ] Test på en ny installation: slet `~/.omniroute/omniroute.db`, og kør `npm run dev`
- [ ] Test på en eksisterende installation: sikkerhedskopiér databasen, kør migreringen, og verificér skemaet
- [ ] WAL-filer (`-wal`, `-shm`) håndteres korrekt, hvis migreringen omskriver tabeller

### Udbyderkatalog (Zod-valideret)

- [ ] Zod-skemaet i `src/shared/constants/providers.ts` er gyldigt ved indlæsning
  - [ ] Alle udbydere har de påkrævede felter (`id`, `label`, `kind` osv.)
  - [ ] `freeNote` er angivet for nye gratis udbydere
  - [ ] OAuth-udbydere har `oauthConfig` registreret i `src/lib/oauth/constants/oauth.ts`
- [ ] Hvis en ny udbyder er tilføjet: tilsvarende executor i `open-sse/executors/`
- [ ] Hvis formatet ikke er OpenAI: oversætter i `open-sse/translator/`
- [ ] Modeller er registreret i `open-sse/config/providerRegistry.ts`
- [ ] Enhedstests i `tests/unit/` dækker udbyderklassificering og routing

### Desktop (Electron)

Hvis `electron/` er ændret:

- [ ] `npm run electron:smoke:packaged` består
- [ ] Builds er testet for mindst én af `:win`, `:mac`, `:linux`
- [ ] Certifikater til kodesignering er ikke udløbet (hvis der signeres)
- [ ] Versionen i `electron/package.json` matcher rodfilens `package.json`
- [ ] Markøren for den automatiske opdateringskanal er opdateret, hvis der udgives til `stable`

### Buildstruktur

Repositoryet bruger tre separate outputmapper — bland dem aldrig sammen:

| Mappe     | Formål                                                        | Versionsstyret?  |
| --------- | ------------------------------------------------------------- | ---------------- |
| `src/`    | Applikationskilde (TypeScript / TSX)                          | Ja               |
| `.build/` | Midlertidige buildfiler — output fra `next build` (`distDir`) | Nej (gitignored) |
| `dist/`   | Distribuerbar npm-pakke — samlet af `assembleStandalone`      | Nej (gitignored) |

> **Driftsnote:** Mappen i det eksterne VPS-image er fortsat `/usr/lib/node_modules/omniroute/app/`.
> Kun buildoutputtet **i repositoryet** blev flyttet (`app/` → `dist/`). Deploy-funktionerne rsync'er
> indholdet af `dist/` til den eksterne `app/`-mappe — der kræves ingen ændringer af VPS-stier.

**Flow med ét build:**

```
npm run build:release
  └─ rm -rf .build dist          (oprydning)
  └─ next build → .build/next/   (mellemprodukter)
  └─ assembleStandalone          (kopierer standalone + static + public + natives → dist/)
  └─ skriver dist/BUILD_SHA      (HEAD-sentinel)
```

Kør IKKE `npm run build` efterfulgt af en separat `npm run build:cli` ved deployment — brug
`npm run build:release`, som udfører et rent rebuild + sentinel i én kommando.

### Validering af artefakter

- [ ] `npm run build:release` lykkes, og `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` er ren — ingen `app.__qa_backup`, `scripts/scratch`, `package-lock.json` eller andre lokale rester
- [ ] `dist/server.js` findes efter buildet

### Tagging og udgivelse

- [ ] Kør `/generate-release-cc` (Claude Code-funktion):
  - Opretter tagget `vX.Y.Z`
  - Pusher tagget og branchen
  - Opretter en GitHub-udgivelse med ændringsloggen som brødtekst
  - Vedhæfter Electron-installationsprogrammer (hvis de er bygget)
- [ ] Eller gør det manuelt:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deployment

Deploy-funktionerne bruger et let rsync-flow — ingen `npm pack`, ingen `npm i -g`:

- [ ] Brug den deploy-funktion, der matcher destinationen:
  - `/deploy-vps-local-cc` — lokal VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — begge
- [ ] Før deployment skal det bekræftes, at `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Buildet skal køre et sted, hvor `node_modules` er reel (primær checkout eller en worktree, hvor `npm ci` er kørt — IKKE en worktree med symlink)
- [ ] Kør en smoke-test af den deployede instans:
  - Åbn `/dashboard/health` → kontrollér, at versionsstrengen matcher udgivelsen
  - Kør en `/v1/chat/completions`-anmodning mod en kendt udbyder
  - Verificér, at `/api/monitoring/health` returnerer `CLOSED` circuit breakers
  - Bekræft, at MCP-transporter svarer (`/mcp` HTTP, `/mcp-sse` SSE)

### Efter udgivelsen

- [ ] Kør `/capture-release-evidences-cc` (Claude Code-skill)
  - Indsamler WebP-skærmbilleder/-optagelser af nye funktioner
  - Vedhæfter dem til udgivelsesnoter/blogindlæg
- [ ] Opdater GitHub Discussions/Discord med udgivelsesmeddelelsen
- [ ] Opret en milepæl for den næste version
- [ ] Hvis kritisk: Fastgør diskussionen, eller tilføj et opslag i `news.json` til et banner i appen

### Gate for offentlig lancering af Radar

Radar-meddelelsen er med vilje committed med `active: false`. Aktivering er en separat
ændring, efter at der er dokumentation for hvert punkt nedenfor:

- [ ] Alle stablede Radar-PR'er er flettet, og CI for release-tip er grøn
- [ ] Udrul og smoketest OSS Radar-ruterne med `RADAR_ENABLED` fortsat deaktiveret som standard
- [ ] Smoketest `GET /planos`, `/termos`, `/privacidade` og `/reembolso` på den navngivne Radar-vært
- [ ] Registrer operatørens identitet/kontaktoplysninger/adresse og den ejer-godkendte juridiske gennemgang i den private tjeneste
- [ ] Afprøv Stripe Checkout og den signerede webhook udelukkende i testtilstand
- [ ] Afprøv én krypteret levering af transaktionsmail med den godkendte afsender/det godkendte domæne
- [ ] Dokumenter gendannelse fra backup og én overvåget, budgetbegrænset research-kørsel
- [ ] Godkend gennemgangspolitikken for BRL/PIX, før dokumentation for donationer accepteres
- [ ] Aktivér først offentlig Checkout efter de foregående gates, og aktivér derefter det nye `news.json`-ID
- [ ] Kontrollér, at Home-banneret bruger lokaliseret tekst, og at et nyt ID vises igen, efter at et ældre ID er blevet afvist

## Smoke-test af integrerede tjenester (v3.8.4+)

Før en udgivelse, der indeholder ændringer til integrerede tjenester, udsendes, skal følgende verificeres:

### Opstart med en ny database (finder migrationskollisioner — tilføjet efter hotfixet til v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — vent 10 sek. på opstart
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` returnerer `"9router"` (IKKE 404, IKKE 500). Bekræfter, at migrationen `071_services.sql` er anvendt, og at rækken er oprettet.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` returnerer 3 rækker.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` returnerer 2 rækker (bekræfter, at `070_webhooks_kind_metadata.sql` er anvendt).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` gennemføres korrekt — beskytter mod fremtidige kollisioner.

### 9Router

- [ ] `POST /api/services/9router/install` returnerer 200 med `installedVersion` på under 2 min.
- [ ] `POST /api/services/9router/start` returnerer 200 og `state: "running"` på under 30 sek.
- [ ] `GET /api/services/9router/status` rapporterer `health: "healthy"`
- [ ] `POST /v1/chat/completions` med `"model": "9router/auto/..."` returnerer 200 (ende-til-ende-routing gennem 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` gengiver 9Routers oprindelige brugergrænseflade inde i proxyen (ingen direkte `127.0.0.1:port`-iframe)
- [ ] `POST /api/services/9router/rotate-key` returnerer `{ keyRotated: true }`, og tjenesten genstarter korrekt
- [ ] `POST /api/services/9router/stop` returnerer 200 og `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` returnerer en SSE-strøm med en `snapshot`-hændelse, der indeholder de seneste linjer
- [ ] Installation i et miljø uden `npm` i PATH returnerer 500 med en brugervenlig fejlmeddelelse (uden stacktrace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` returnerer 200 på under 2 min.
- [ ] `POST /api/services/cliproxy/start` returnerer 200 og `state: "running"` på under 30 sek.
- [ ] `GET /api/services/cliproxy/status` rapporterer `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` returnerer 200 og `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` returnerer en SSE-strøm

### Sikkerhedsregression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` returnerer `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` returnerer `403 LOCAL_ONLY`
- [ ] Fejlsvar fra `/api/services/*` indeholder ikke `err.stack` eller absolutte filstier

## Kontroller for v3.8.0+

Før en v3.8.x-udgivelse udsendes, skal disse yderligere punkter verificeres:

- [ ] `omniroute --tray` starter på macOS (systray2 installeret i `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` starter på Linux (kræver DISPLAY; brugervenlig fejl, hvis den ikke er angivet)
- [ ] `omniroute --tray` starter på Windows (PowerShell NotifyIcon, ingen ekstra binære filer)
- [ ] `omniroute config tray enable` opretter en autostartpost; deaktivering fjerner den
- [ ] `npm install -g omniroute@<this-version>` kører postinstall uden fatal afslutning
- [ ] Opdateringsforløbet bevarer valgfrie afhængigheder: `omniroute update --apply` og den automatiske opdateringsfunktion
      kører `npm install -g … --include=optional`, så `optionalDependencies` (better-sqlite3,
      keytar, tls-client og llmlingua SLM-stakken: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) overlever en opdatering. SLM-niveauet ultra med `modelPath` kræver også
      tinybert-modellen, som automatisk downloades til `${DATA_DIR}/models/llmlingua` ved første brug. Postinstall
      (`scripts/build/colocateOptionals.mjs`) placerer derefter SLM's valgfrie afhængighedslukning samlet i
      `dist/node_modules`, så workeren kun indlæser ÉN instans af `@huggingface/transformers` ^4.2.0
      — den selvstændige trace bundler kun transformers, ikke de dynamisk importerede
      valgfrie afhængigheder, så uden dette ville workeren indlæse llmlingua-2 mod rodens transformers,
      og SLM-niveauet ville lydløst anvende fail-open.
- [ ] `omniroute status` fungerer uden `.env` (CLI-tokensti, kun loopback)
- [ ] `curl http://localhost:20128/api/shutdown` returnerer 401 (rute, der altid er beskyttet)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` returnerer 401 (loopback-beskyttelse)
- [ ] SQLite-runtime bestemmes til `bundled` ved første kørsel (den medfølgende binære fil er gyldig for platformen)
- [ ] SQLite-runtime falder tilbage til `runtime`, når `node_modules/better-sqlite3` slettes
- [ ] Det intelligente MCP-filter komprimerer reelt output fra `playwright-mcp browser_snapshot` (≥50 % reduktion)
- [ ] Alle 10 `skills/omniroute*/SKILL.md`-filer kan hentes offentligt via en rå GitHub-URL
- [ ] Onboardingguiden viser trinnet med niveauoversigten "Sådan fungerer det" ved en ny opsætning
- [ ] Widgetten for niveaudækning på startdashboardet viser antal konfigurerede/aktive

---

## Tilbagerulning

Hvis en udgivelse har et kritisk problem:

1. `gh release edit vX.Y.Z --prerelease` (markerer den som ikke værende den seneste)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (kun hvis den endnu ikke er taget i brug af brugerne)
3. Eller: hotfix på `release/vX.Y.0` → patch-udgivelse `vX.Y.(Z+1)`
4. Kommunikér straks i GitHub Discussions og Discord

## Faste regler

- Commit aldrig direkte til `main`
- Brug aldrig `git push --force` til `main`- eller `release/*`-branches
- Spring aldrig Husky-hooks over (`--no-verify`)
- Commit aldrig hemmeligheder, loginoplysninger eller `.env`-filer
- Kodedækningen skal forblive ≥60/60/60/60 (statements/lines/functions/branches)
- Inkluder eller opdater altid tests, når produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/` ændres

## Automatisk synkroniseringskontrol

Kør kontrollen af dokumentationssynkronisering lokalt, før du åbner en PR:

```bash
npm run check:docs-sync
```

CI kører også denne kontrol i `.github/workflows/ci.yml` (lint-job).
