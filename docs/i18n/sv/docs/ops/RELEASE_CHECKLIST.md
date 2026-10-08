# Release Checklist (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Senast uppdaterad:** 2026-08-28 — v3.8.51
> Effektiviserat versionsflöde som använder Claude Code-färdigheter för automatisering.
>
> **Håll kön/grenen grön mellan releaser:** se [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-familjen + `npm run check:release-green` + `/babysit` + nattlig körning). Att köra
> detta regelbundet — och särskilt **före** denna checklista — gör att release-PR:en börjar grönt.

## Kort sammanfattning

```bash
# 1. Höj versionen + generera CHANGELOG (färdighet)
/version-bump-cc patch    # eller minor/major

# 2. Kör kvalitetskontrollen lokalt
npm run check              # lintning + tester
npm run test:coverage      # fullständig täckningskontroll (60/60/60/60)

# 3. Bygg och röktesta
npm run build
npm run test:e2e           # valfritt men rekommenderas

# 4. Generera release (färdighet)
/generate-release-cc

# 5. Driftsätt (färdighet)
/deploy-vps-both-cc        # eller akamai-cc / local-cc

# 6. Samla in releasebevis (färdighet)
/capture-release-evidences-cc
```

## Betrodd npm-publicering (standard sedan v3.8.51) — stegvis på begäran, direkt som reservlösning

`npm-publish.yml` publicerar som standard genom **npm Trusted Publishing (OIDC)**:
jobbet `stage-npm` (GitHub-hostat) växlar GitHubs id-token mot en kortlivad npm-
autentiseringsuppgift för den körningen — ingen långlivad npm-token i repositoriets hemligheter, ingen 2FA-prompt, proveniens bifogas.
Detta är den förbikoppling som npm tillåter nu när token som kringgår 2FA håller på att fasas ut;
den återställer det helt automatiska flöde som projektet hade fram till v3.8.48 samtidigt som
WS1.3-garantin bibehålls (en läckt token kan inte publicera på egen hand — det finns ingen token).

**Engångskonfiguration (ägare):** npmjs.com → paketet `omniroute` → Settings → _Trusted
Publisher_ → GitHub: ägare `diegosouzapw`, repo `OmniRoute`, arbetsflöde `npm-publish.yml`
(miljö: ingen). Tills detta finns misslyckas det automatiska steget med `ENEEDAUTH`:
starta om med `publish_mode=staged` (nedan) eller `direct`.

### Stegvis publicering (på begäran — `publish_mode=staged`)

Arbetsflödet npm-publish publicerar inte längre direkt: det startar den paketerade tarball-filen
(`check:pack-boot`) och kör sedan `npm stage publish` — exakt dessa byte placeras i vänteläge i
registret och är **inte installerbara** förrän ägaren godkänner dem. Den mänskliga 2FA-kontrollen har flyttats
till EFTER verifieringen, inte före den.

**Ägarens flöde efter att arbetsflödet blivit grönt:**

1. `npm stage list omniroute` — hitta stegets id (visas även i arbetsflödessammanfattningen).
2. Verifiera de stegvis publicerade byten (rekommenderas): `npm stage download <id>`, installera sedan den
   hämtade tarball-filen i ett temporärt prefix och starta den (`npm run check:pack-boot` automatiserar
   samma packa→installera→starta-bedömning i CI).
3. `npm stage approve <id>` — 2FA-prompten ÄR publiceringen. `npm stage reject <id>` kasserar den.
4. Skydd efter publicering: verifieraren efter publicering (WS1.4 i planen för v3.8.49) installerar den
   publicerade versionen från det offentliga registret i en ren container och startar den.

**Reservlösning för nödlägen:** `workflow_dispatch` med `publish_mode=direct` återställer den
äldre omedelbara `npm publish` (använd endast om själva den stegvisa publiceringen inte fungerar; dokumentera varför).

**Engångshärdning (ägare, npmjs.com):** konfigurera Trusted Publisher för
`omniroute` i ett läge som endast tillåter stegvis publicering, så att en läckt långlivad token inte kan köra `npm publish`
direkt någonstans ifrån — CI kan endast placera versionen i vänteläge; endast ägarens 2FA kan släppa den.

**Åtgärdsplan för trasiga artefakter (oförändrad):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
som standardåtgärd (tar minuter, kan återställas); `npm unpublish` endast inom tidsfönstret på 72 timmar/inga beroenden
och aldrig som första åtgärd. Docker: skriv aldrig om en versionstagg — återställning innebär att
peka om `latest` till den senaste fungerande digesten.

**Docker Hub `latest` (krävs vid varje stabil SemVer-publicering):**
arbetsflödet `docker-publish` måste tagga **både** `X.Y.Z` och, när
`should-promote-latest.sh` bekräftar att detta är den högsta stabila SemVer-versionen, `:latest`
med **samma digest**. Efter jobbet: Hub-digesten för `latest` är samma som den nya
SemVer-digesten och `last_updated` har ändrats. Lämna inte `:latest` på ett äldre
bygge medan releaseinformationen beskriver korrigeringar som endast finns i git. Compose-
snabbstarter använder `:latest`; GitOps bör fortsätta att fästa vid `X.Y.Z`. Se
[Docker-releasekanaler](../guides/DOCKER_GUIDE.md#release-channels) och #10317.

## Snabbspår för akuta korrigeringar (etiketten `hotfix`)

En PR märkt med `hotfix` hoppar över den omfattande CI-matrisen (E2E med 9 shardar, successiv täckningshöjning,
quality-gate, quality-extended) och behåller de snabba kontrollerna med hög signalnivå: bygge,
enhetstestshardar, integration, vitest, lint/typkontroll, dokumentsynkronisering, `check:pack-artifact`
och uppstarts-röktestet för tarball-paketet (`check:pack-boot`). Mål: grönt inom ≤15 min i stället för ~33 min.

**Krav för användning — alla fyra måste vara uppfyllda (utformat efter Chromium/VS Code/Nodes snabbspår för nödlägen):**

1. **Allvarlighetsgrad**: produktionen är trasig — en publicerad artefakt kraschar vid start/en
   säkerhetskorrigering/alla användare av utgåvan påverkas. ”Viktigt” är inte samma sak som ”trasigt”.
2. **Behörighet**: endast kodarkivets ägare får lägga till etiketten `hotfix`. Etiketten ÄR
   godkännandet — använd den aldrig på eget initiativ för en kampanj-PR.
3. **Bevis**: PR-beskrivningen länkar till den föregående helt gröna omfattande körningen (sviten som
   de överhoppade jobben annars skulle verifiera på nytt) samt korrigeringens eget test som först misslyckas och sedan godkänns.
4. **Omfattning**: endast cherry-pick — den minsta möjliga korrigeringen, inga refaktoreringar, inga medföljande ändringar.

Den överhoppade ytan för täckning/successiv täckningshöjning verifieras på nytt av nästa fullständiga körning på
release-grenen (kontinuerligt grön release) — snabbspåret hoppar över VÄNTAN, aldrig validering.
Ändringar som endast berör tester (alla filer under `tests/`, inga under `tests/e2e/`) hoppar automatiskt över E2E-
matrisen, utan någon etikett.

## Detaljerad checklista

### Före release

- [ ] Alla PR:er som är avsedda för denna release har slagits samman till `release/vX.Y.0`
- [ ] Alla öppna Linear-/ärendeobjekt för denna version är stängda eller flyttade till nästa milstolpe
- [ ] CI är grön på grenen `release/vX.Y.0`
- [ ] Inga `TODO(release)`-markörer i koden: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker-basavbildningen är uppdaterad (för närvarande `node:24.15.0-trixie-slim`)

### Version och ändringslogg

- [ ] Kör `/version-bump-cc <patch|minor|major>` (Claude Code-färdighet)
  - Höjer versionen i `package.json`, `electron/package.json`
  - Genererar om `CHANGELOG.md` från git-commits sedan den senaste taggen
  - Uppdaterar märken i README.md
- [ ] Granska CHANGELOG.md manuellt och rensa commit-meddelanden vid behov
- [ ] Säkerställ att det senaste semver-avsnittet i `CHANGELOG.md` motsvarar versionen i `package.json`
- [ ] Behåll `## [Unreleased]` som det första avsnittet i ändringsloggen för kommande arbete
- [ ] Uppdatera `docs/openapi.yaml` → `info.version` måste motsvara versionen i `package.json`

### Kodkvalitet

- [ ] `npm run lint` — 0 fel (varningarna är befintliga sedan tidigare)
- [ ] `npm run typecheck:core` — utan anmärkningar
- [ ] `npm run typecheck:noimplicit:core` — utan anmärkningar (strikt)
- [ ] `npm run check:cycles` — inga cirkulära beroenden
- [ ] `npm run check:any-budget:t11` — inom budgeten
- [ ] `npm run check:route-validation:t06` — utan anmärkningar
- [ ] `npm run check:node-runtime` — lägsta stödda körningsversion uppfylld (`>=22.22.2 <23`, `>=24.0.0 <27`, enligt `SUPPORTED_NODE_RANGE` i `src/shared/utils/nodeRuntimeSupport.ts`; i linje med `package.json` `engines`)

### Testning

- [ ] `npm run test:unit` — godkänt
- [ ] `npm run test:vitest` — godkänt (MCP-server, autoCombo, cache)
- [ ] `npm run test:coverage` — gränsvärdet 60/60/60/60 uppfyllt (satser/rader/funktioner/grenar)
- [ ] `npm run test:integration` — godkänt (om ändringarna berör DB/hanterare)
- [ ] `npm run test:combo:matrix` — godkänt (matris för kombinationsstrategier: bevisar deterministiskt urvalsbesluten för alla 19 offentliga routningsstrategier; kör vid ändringar av kombinationsroutning, strategiupplösning eller reservlogik)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **valfritt/manuellt** (röktest mot verklig uppströmstjänst bakom spärr; hämtar ett skrivskyddat DB-ögonblick från VPS `root@192.168.0.15`; anropar verkliga leverantörer, kostar krediter; körs aldrig i CI; hoppas över utan problem om spärren saknas)
- [ ] `npm run test:combo:live:vps` — **valfritt/manuellt** (live-röktest för VPS i fas 3: 7 HTTP-scenarier mot den aktiva `.15`-servern via vanlig Node ESM; kräver `ssh root@192.168.0.15`; skapar/raderar endast kombinationer med namnet `__live_test__*`; anropar verkliga leverantörer; körs aldrig i CI)
- [ ] `npm run test:e2e` — godkänt (UI-ändringar)
- [ ] `npm run test:protocols:e2e` — godkänt (MCP-/A2A-ändringar)
- [ ] `npm run test:ecosystem` — godkänt

### Krokar (validerade av Husky)

Husky-krokar finns i `.husky/` och körs automatiskt vid git-åtgärder.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** snabba deterministiska kontroller — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktiverat 2026-06-13). Utesluter avsiktligt `test:unit` (långsamt; täcks av CI-jobbet `test-unit`).
  - Kör `npm run test:unit` manuellt innan release-grenar pushas.

Om en krok misslyckas: åtgärda det underliggande problemet, kringgå den inte med `--no-verify`.

### Konventionella commits

Alla commits som ska ingå i en release måste följa formatet `type(scope): subject`.

**Giltiga typer:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Giltiga omfattningar:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Brytande ändringar: lägg till sidfoten `BREAKING CHANGE:` eller `!` efter omfattningen (t.ex. `feat(api)!: drop /v0`).

### Dokumentation

- [ ] `npm run check:docs-sync` godkänns (körs automatiskt av pre-commit)
- [ ] `npm run check:docs-all` godkänns (paraplykommando: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` avslutas med 0 — miljökontraktet mellan kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` är intakt
- [ ] `npm run check:doc-links` avslutas med 0 — inga trasiga interna markdown-referenser efter omstruktureringen
- [ ] `docs/architecture/ARCHITECTURE.md` har granskats avseende avvikelser i lagring/körningsmiljö
- [ ] `docs/guides/TROUBLESHOOTING.md` har granskats avseende avvikelser i miljövariabler och drift
- [ ] Om `.env.example` har ändrats: `docs/reference/ENVIRONMENT.md` har uppdaterats
- [ ] Om den nya funktionen har ett användargränssnitt: `docs/guides/USER_GUIDE.md` nämner den
- [ ] Om den nya funktionen har ett API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` har uppdaterats
- [ ] Om den nya funktionen är en modul: en dedikerad `docs/<MODULE>.md` finns
- [ ] Vid en brytande ändring: `docs/guides/TROUBLESHOOTING.md` innehåller en migreringsnotering

### i18n

- [ ] `npm run i18n:check` avslutas med 0 — översättningsstatusen (`.i18n-state.json`) är synkroniserad med källdokumentationen (inga avvikande källor i strikt läge; varningslägets rekommendationer är acceptabla för dokumentationsjusteringar i sista minuten, men resultatet bör vara 0 före taggning)
- [ ] `npm run i18n:check-ui-coverage` avslutas med 0 — varje UI-språkvariant ligger på eller över täckningsgränsen på 80 %
- [ ] `npm run i18n:sync-ui:dry` rapporterar 0 saknade nycklar för samtliga 42 språkvarianter
- [ ] Om den engelska källdokumentationen har ändrats, kör `npm run i18n:run` (kräver `OMNIROUTE_TRANSLATION_API_KEY` i `.env`) före taggning
- [ ] Översättningsbidrag kan skjutas upp till nästa version om de är mindre omfattande (spåra i CHANGELOG)

### Databasmigreringar

- [ ] Om `src/lib/db/migrations/` innehåller nya filer:
  - [ ] Varje migrering är idempotent (`CREATE TABLE IF NOT EXISTS` osv.)
  - [ ] Migreringarna är omslutna av transaktioner
  - [ ] Korrekt numrerade (inga luckor i sekvensen)
- [ ] Testa på en ny installation: ta bort `~/.omniroute/omniroute.db` och kör `npm run dev`
- [ ] Testa på en befintlig installation: säkerhetskopiera databasen, kör migreringen och verifiera schemat
- [ ] WAL-filer (`-wal`, `-shm`) hanteras korrekt om migreringen skriver om tabeller

### Leverantörskatalog (Zod-validerad)

- [ ] Zod-schemat i `src/shared/constants/providers.ts` är giltigt vid inläsning
  - [ ] Alla leverantörer har obligatoriska fält (`id`, `label`, `kind` osv.)
  - [ ] `freeNote` har angetts för nya kostnadsfria leverantörer
  - [ ] OAuth-leverantörer har `oauthConfig` registrerad i `src/lib/oauth/constants/oauth.ts`
- [ ] Om en ny leverantör har lagts till: motsvarande exekverare i `open-sse/executors/`
- [ ] Om formatet inte är OpenAI: översättare i `open-sse/translator/`
- [ ] Modeller registrerade i `open-sse/config/providerRegistry.ts`
- [ ] Enhetstester i `tests/unit/` täcker leverantörsklassificering och dirigering

### Skrivbord (Electron)

Om `electron/` har ändrats:

- [ ] `npm run electron:smoke:packaged` godkänns
- [ ] Byggen har testats för minst ett av `:win`, `:mac`, `:linux`
- [ ] Certifikat för kodsignering har inte gått ut (om signering används)
- [ ] Versionen i `electron/package.json` matchar rotens `package.json`
- [ ] Pekaren för den automatiska uppdateringskanalen har uppdaterats vid lansering till `stable`

### Bygglayout

Kodbasen använder tre separata utdatakataloger — blanda aldrig ihop dem:

| Katalog   | Syfte                                                              | Versionshanterad? |
| --------- | ------------------------------------------------------------------ | ----------------- |
| `src/`    | Applikationens källkod (TypeScript / TSX)                          | Ja                |
| `.build/` | Mellanprodukter från bygget — utdata från `next build` (`distDir`) | Nej (gitignored)  |
| `dist/`   | Levererbart npm-paket — sammanställt av `assembleStandalone`       | Nej (gitignored)  |

> **Driftanteckning:** bildkatalogen på fjärr-VPS:en är fortfarande `/usr/lib/node_modules/omniroute/app/`.
> Endast byggutdata **i kodbasen** har flyttats (`app/` → `dist/`). Driftsättningsfunktionerna synkroniserar
> innehållet i `dist/` via rsync till fjärrkatalogen `app/` — inga ändringar av VPS-sökvägar krävs.

**Flöde med ett enda bygge:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

Kör INTE `npm run build` följt av ett separat `npm run build:cli` för driftsättning — använd
`npm run build:release`, som utför ett rent ombygge + kontrollmarkör med ett enda kommando.

### Validering av artefakter

- [ ] `npm run build:release` slutförs och `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` är ren — ingen `app.__qa_backup`, `scripts/scratch`, `package-lock.json` eller andra lokala rester
- [ ] `dist/server.js` finns efter bygget

### Taggning och lansering

- [ ] Kör `/generate-release-cc` (Claude Code-funktion):
  - Skapar taggen `vX.Y.Z`
  - Pushar taggen och grenen
  - Skapar en GitHub-version med ändringsloggen som beskrivning
  - Bifogar Electron-installationsfiler (om de har byggts)
- [ ] Eller manuellt:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Driftsättning

Driftsättningsfunktionerna använder det lätta rsync-flödet — inget `npm pack`, inget `npm i -g`:

- [ ] Använd den driftsättningsfunktion som matchar målet:
  - `/deploy-vps-local-cc` — lokal VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai-VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — båda
- [ ] Bekräfta före driftsättning att `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Bygget måste köras där `node_modules` är verklig (huvudutcheckningen eller ett worktree där `npm ci` har körts — INTE ett symlänkat worktree)
- [ ] Röktesta den driftsatta instansen:
  - Öppna `/dashboard/health` → kontrollera att versionssträngen matchar versionen
  - Kör en `/v1/chat/completions`-begäran mot en känd leverantör
  - Verifiera att `/api/monitoring/health` returnerar kretsbrytare med statusen `CLOSED`
  - Bekräfta att MCP-transporterna svarar (`/mcp` HTTP, `/mcp-sse` SSE)

### Efter lansering

- [ ] Kör `/capture-release-evidences-cc` (Claude Code-skill)
  - Tar WebP-skärmbilder/inspelningar av nya funktioner
  - Bifogar dem till versionskommentarerna/blogginlägget
- [ ] Uppdatera GitHub Discussions/Discord med versionsmeddelandet
- [ ] Öppna en milstolpe för nästa version
- [ ] Om kritiskt: fäst diskussionen eller publicera i `news.json` för en banner i appen

### Villkor för offentlig lansering av Radar

Radar-meddelandet checkas avsiktligt in med `active: false`. Aktivering sker genom en separat
ändring efter att det finns belägg för varje punkt nedan:

- [ ] Alla staplade Radar-PR:er har slagits samman och CI för release-tip är grön
- [ ] Driftsätt och smoke-testa OSS-rutterna för Radar med `RADAR_ENABLED` fortfarande avstängt som standard
- [ ] Smoke-testa `GET /planos`, `/termos`, `/privacidade` och `/reembolso` på den angivna Radar-värden
- [ ] Registrera operatörens identitet/kontaktuppgifter/adress och ägargodkänd juridisk granskning i den privata tjänsten
- [ ] Testa Stripe Checkout och den signerade webhooken endast i testläge
- [ ] Testa en krypterad leverans av transaktionsmejl med den godkända avsändaren/domänen
- [ ] Verifiera återställning från säkerhetskopia och en övervakad forskningskörning med budgettak
- [ ] Godkänn granskningspolicyn för BRL/PIX innan donationsunderlag accepteras
- [ ] Aktivera offentlig Checkout först efter föregående villkor och aktivera sedan det nya `news.json`-ID:t
- [ ] Verifiera att bannern på startsidan använder lokaliserad text och att ett nytt ID visas igen efter att ett äldre ID har avfärdats

## Röktest för inbäddade tjänster (v3.8.4+)

Innan en version som innehåller ändringar av inbäddade tjänster släpps, verifiera följande:

### Start med ny databas (upptäcker migreringskollisioner — tillagt efter snabbkorrigeringen för v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — vänta 10 s på uppstart
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` returnerar `"9router"` (INTE 404, INTE 500). Bekräftar att migreringen `071_services.sql` har tillämpats och att raden har skapats.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` returnerar 3 rader.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` returnerar 2 rader (verifierar att `070_webhooks_kind_metadata.sql` har tillämpats).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` godkänns — skyddar mot framtida kollisioner.

### 9Router

- [ ] `POST /api/services/9router/install` returnerar 200 med `installedVersion` inom 2 min
- [ ] `POST /api/services/9router/start` returnerar 200 och `state: "running"` inom 30 s
- [ ] `GET /api/services/9router/status` rapporterar `health: "healthy"`
- [ ] `POST /v1/chat/completions` med `"model": "9router/auto/..."` returnerar 200 (heltäckande routning genom 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderar 9Routers inbyggda gränssnitt inuti proxyn (ingen direkt iframe för `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` returnerar `{ keyRotated: true }` och tjänsten startas om korrekt
- [ ] `POST /api/services/9router/stop` returnerar 200 och `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` returnerar en SSE-ström med en `snapshot`-händelse som innehåller de senaste raderna
- [ ] Installation i en miljö utan `npm` i PATH returnerar 500 med ett lättbegripligt felmeddelande (utan stackspårning)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` returnerar 200 inom 2 min
- [ ] `POST /api/services/cliproxy/start` returnerar 200 och `state: "running"` inom 30 s
- [ ] `GET /api/services/cliproxy/status` rapporterar `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` returnerar 200 och `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` returnerar en SSE-ström

### Säkerhetsregression

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` returnerar `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` returnerar `403 LOCAL_ONLY`
- [ ] Felsvar från `/api/services/*` innehåller inte `err.stack` eller absoluta filsökvägar

## Kontroller för v3.8.0+

Innan en v3.8.x-version släpps, verifiera även följande:

- [ ] `omniroute --tray` startar på macOS (systray2 installerat i `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` startar på Linux (kräver DISPLAY; begripligt fel om det inte har angetts)
- [ ] `omniroute --tray` startar på Windows (PowerShell NotifyIcon, inga ytterligare binärfiler)
- [ ] `omniroute config tray enable` skapar en autostartpost; inaktivering tar bort den
- [ ] `npm install -g omniroute@<this-version>` kör postinstall utan att avslutas med ett allvarligt fel
- [ ] Uppdateringssökvägen behåller valfria beroenden: `omniroute update --apply` och den automatiska uppdateraren
      kör `npm install -g … --include=optional` så att `optionalDependencies` (better-sqlite3,
      keytar, tls-client och llmlingua SLM-stacken: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) finns kvar efter en uppdatering. SLM-nivån ultra med `modelPath` behöver även
      tinybert-modellen, som hämtas automatiskt till `${DATA_DIR}/models/llmlingua` vid första användningen. Postinstall
      (`scripts/build/colocateOptionals.mjs`) placerar sedan den valfria SLM-beroendekedjan tillsammans i
      `dist/node_modules` så att workern använder EN ENDA instans av `@huggingface/transformers` ^4.2.0
      — den fristående spårningen paketerar endast transformers, inte de dynamiskt importerade
      valfria beroendena, så utan detta skulle workern läsa in llmlingua-2 mot rotens transformers
      och SLM-nivån skulle obemärkt fortsätta utan komprimering.
- [ ] `omniroute status` fungerar utan `.env` (sökväg för CLI-token, endast loopback)
- [ ] `curl http://localhost:20128/api/shutdown` returnerar 401 (alltid skyddad route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` returnerar 401 (loopback-skydd)
- [ ] SQLite-körningen använder `bundled` vid första körningen (den medföljande binärfilen är giltig för plattformen)
- [ ] SQLite-körningen faller tillbaka på `runtime` när `node_modules/better-sqlite3` tas bort
- [ ] Smart MCP-filter komprimerar verkliga utdata från `playwright-mcp browser_snapshot` (≥50 % minskning)
- [ ] Alla 10 `skills/omniroute*/SKILL.md`-filer är offentligt åtkomliga via råa GitHub-URL:er
- [ ] Introduktionsguiden visar steget "Så fungerar det" med en genomgång av nivåerna vid en ny installation
- [ ] Nivåtäckningswidgeten på startpanelen visar antalet konfigurerade/aktiva

---

## Återställning

Om en release har ett kritiskt problem:

1. `gh release edit vX.Y.Z --prerelease` (markerar den som inte den senaste)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (endast om användarna ännu inte har börjat använda den)
3. Eller: hotfix på `release/vX.Y.0` → patchrelease `vX.Y.(Z+1)`
4. Kommunicera omedelbart i GitHub Discussions och Discord

## Strikta regler

- Checka aldrig in direkt till `main`
- Använd aldrig `git push --force` till `main`- eller `release/*`-grenar
- Hoppa aldrig över Husky-hooks (`--no-verify`)
- Checka aldrig in hemligheter, autentiseringsuppgifter eller `.env`-filer
- Täckningsgraden måste förbli ≥60/60/60/60 (satser/rader/funktioner/grenar)
- Inkludera eller uppdatera alltid tester när produktionskod ändras i `src/`, `open-sse/`, `electron/` eller `bin/`

## Automatisk synkroniseringskontroll

Kör dokumentationens synkroniseringskontroll lokalt innan du öppnar en PR:

```bash
npm run check:docs-sync
```

CI kör också den här kontrollen i `.github/workflows/ci.yml` (lint-jobbet).
