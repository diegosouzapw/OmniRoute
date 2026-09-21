# Release Checklist (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Sist oppdatert:** 2026-08-28 — v3.8.51
> Effektivisert utgivelsesflyt som bruker Claude Code-ferdigheter til automatisering.
>
> **Hold køen/grenen grønn mellom utgivelser:** se [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-familien + `npm run check:release-green` + `/babysit` + nattlig kjøring). Kjør
> dette regelmessig — og spesielt **før** denne sjekklisten — slik at utgivelses-PR-en starter grønt.

## Kort fortalt

```bash
# 1. Oppdater versjonen + generer CHANGELOG (ferdighet)
/version-bump-cc patch    # eller minor/major

# 2. Kjør kvalitetskontrollen lokalt
npm run check              # linting + tester
npm run test:coverage      # full dekningskontroll (60/60/60/60)

# 3. Bygg og kjør en enkel funksjonstest
npm run build
npm run test:e2e           # valgfritt, men anbefalt

# 4. Generer utgivelsen (ferdighet)
/generate-release-cc

# 5. Distribuer (ferdighet)
/deploy-vps-both-cc        # eller akamai-cc / local-cc

# 6. Samle inn utgivelsesbevis (ferdighet)
/capture-release-evidences-cc
```

## npm Trusted Publishing (standard siden v3.8.51) — klargjort ved forespørsel, direkte som reserve

`npm-publish.yml` publiserer som standard gjennom **npm Trusted Publishing (OIDC)**:
`stage-npm`-jobben (GitHub-driftet) utveksler GitHubs ID-token mot en kortlivet npm-
legitimasjon for den kjøringen — ingen langlivet npm-token i repohemmelighetene, ingen 2FA-forespørsel, med opprinnelsesbevis vedlagt.
Dette er omgåelsen npm nå godkjenner når tokener som hopper over 2FA, fases ut;
den gjenoppretter den helautomatiske flyten prosjektet hadde frem til v3.8.48, samtidig som
WS1.3-garantien beholdes (et lekket token kan ikke publisere alene — det finnes ikke noe token).

**Engangsoppsett (eier):** npmjs.com → pakken `omniroute` → Settings → _Trusted
Publisher_ → GitHub: eier `diegosouzapw`, repo `OmniRoute`, arbeidsflyt `npm-publish.yml`
(miljø: ingen). Frem til dette finnes, mislykkes det automatiske trinnet med `ENEEDAUTH`:
start på nytt med `publish_mode=staged` (nedenfor) eller `direct`.

### Klargjort publisering (ved forespørsel — `publish_mode=staged`)

npm-publish-arbeidsflyten publiserer ikke lenger direkte: den starter den pakkede tarball-filen
(`check:pack-boot`) og kjører deretter `npm stage publish` — de nøyaktige bytene parkeres i
registeret, men er **ikke installerbare** før eieren godkjenner dem. Den menneskelige 2FA-kontrollen er flyttet
til ETTER beviset, ikke før det.

**Eierens flyt etter at arbeidsflyten blir grønn:**

1. `npm stage list omniroute` — finn stage-ID-en (den skrives også ut i arbeidsflytsammendraget).
2. Verifiser de klargjorte bytene (anbefalt): `npm stage download <id>`, installer deretter den
   nedlastede tarball-filen i et midlertidig prefiks og start den (`npm run check:pack-boot` automatiserer
   den samme pack→install→boot-vurderingen i CI).
3. `npm stage approve <id>` — 2FA-forespørselen ER publiseringen. `npm stage reject <id>` forkaster den.
4. Sikkerhetsnett etter publisering: verifikatoren etter publisering (WS1.4 i v3.8.49-planen) installerer den
   publiserte versjonen fra det offentlige registeret i en ren container og starter den.

**Nødreserve:** `workflow_dispatch` med `publish_mode=direct` gjenoppretter den
eldre, umiddelbare `npm publish`-flyten (brukes bare hvis selve klargjøringen ikke fungerer; dokumenter hvorfor).

**Engangsherding (eier, npmjs.com):** konfigurer Trusted Publisher for
`omniroute` i modus for kun klargjøring, slik at et lekket langlivet token ikke kan kjøre `npm publish`
direkte fra noe sted — CI kan bare klargjøre; kun eierens 2FA kan utgi.

**Prosedyre for ødelagte artefakter (uendret):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
som standardreaksjon (minutter, reverserbart); `npm unpublish` kun innenfor vinduet på 72 timer/ingen avhengige
og aldri som første tiltak. Docker: skriv aldri over en versjonstagg — tilbakerulling innebærer å
peke `latest` mot den siste fungerende digesten.

**Docker Hub `latest` (påkrevd ved hver stabile SemVer-publisering):**
`docker-publish`-arbeidsflyten må tagge **både** `X.Y.Z` og, når
`should-promote-latest.sh` bekrefter at dette er den høyeste stabile SemVer-versjonen, `:latest`
med **samme digest**. Etter jobben: Hub-digesten for `latest` er lik den nye
SemVer-digesten, og `last_updated` er oppdatert. Ikke la `:latest` peke på et eldre
bygg mens utgivelsesmerknadene omtaler rettelser som bare finnes i git. Compose-
hurtigstarter bruker `:latest`; GitOps bør fortsette å feste til `X.Y.Z`. Se
[Docker-utgivelseskanaler](../guides/DOCKER_GUIDE.md#release-channels) og #10317.

## Hurtigspor for kritiske feilrettinger (etiketten `hotfix`)

En PR merket med `hotfix` hopper over den omfattende CI-matrisen (E2E med 9 deljobber, coverage ratchet,
quality-gate, quality-extended) og beholder de raske kontrollene med høy signalverdi: bygging,
deljobber for enhetstester, integrasjon, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
og oppstarts-røyktesten for tarballen (`check:pack-boot`). Mål: grønt resultat på ≤15 min i stedet for ~33 min.

**Kriterier for bruk — alle fire er påkrevd (modellert etter nødsporene i Chromium/VS Code/Node):**

1. **Alvorlighetsgrad**: produksjonen er ute av drift — en publisert artefakt krasjer ved oppstart / en
   sikkerhetsretting / alle brukere av utgivelsen er berørt. «Viktig» er ikke det samme som «ute av drift».
2. **Myndighet**: bare eieren av repositoriet kan bruke etiketten `hotfix`. Etiketten ER
   godkjenningen — den skal aldri brukes på eget initiativ på en kampanje-PR.
3. **Dokumentasjon**: PR-beskrivelsen lenker til den forrige fullstendig grønne, omfattende kjøringen (testpakken som
   jobbene det hoppes over ellers ville validert på nytt), samt rettingens egen test som først feiler og deretter består.
4. **Omfang**: kun cherry-pick — den minste mulige rettingen, ingen refaktoreringer eller andre medfølgende endringer.

Området for coverage/ratchet som hoppes over, valideres på nytt ved neste fullstendige kjøring på
utgivelsesgrenen (kontinuerlig grønn utgivelse) — sporet hopper over VENTING, aldri validering.
Differ som kun inneholder tester (alle filer under `tests/`, ingen under `tests/e2e/`), hopper over E2E-
matrisen automatisk, uten noen etikett.

## Detaljert sjekkliste

### Før utgivelse

- [ ] Alle PR-er som er rettet mot denne utgivelsen, er slått sammen til `release/vX.Y.0`
- [ ] Alle åpne Linear-/saksoppføringer for denne versjonen er lukket eller flyttet til neste milepæl
- [ ] CI er grønn på grenen `release/vX.Y.0`
- [ ] Ingen `TODO(release)`-markører i koden: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker-grunnimaget er oppdatert (for øyeblikket `node:24.15.0-trixie-slim`)

### Versjon og endringslogg

- [ ] Kjør `/version-bump-cc <patch|minor|major>` (Claude Code-ferdighet)
  - Oppdaterer versjonen i `package.json`, `electron/package.json`
  - Regenererer `CHANGELOG.md` fra git-commits siden siste tagg
  - Oppdaterer merkene i README.md
- [ ] Gå manuelt gjennom CHANGELOG.md og rydd opp i commit-meldinger ved behov
- [ ] Kontroller at den nyeste semver-seksjonen i `CHANGELOG.md` samsvarer med versjonen i `package.json`
- [ ] Behold `## [Unreleased]` som den første seksjonen i endringsloggen for kommende arbeid
- [ ] Oppdater `docs/openapi.yaml` → `info.version` må samsvare med versjonen i `package.json`

### Kodekvalitet

- [ ] `npm run lint` — 0 feil (advarsler finnes fra før)
- [ ] `npm run typecheck:core` — uten feil
- [ ] `npm run typecheck:noimplicit:core` — uten feil (streng)
- [ ] `npm run check:cycles` — ingen sirkulære avhengigheter
- [ ] `npm run check:any-budget:t11` — innenfor budsjettet
- [ ] `npm run check:route-validation:t06` — uten feil
- [ ] `npm run check:node-runtime` — minimumskravet til støttet kjøretidsmiljø er oppfylt (`>=22.22.2 <23`, `>=24.0.0 <27`, i henhold til `SUPPORTED_NODE_RANGE` i `src/shared/utils/nodeRuntimeSupport.ts`; samkjørt med `engines` i `package.json`)

### Testing

- [ ] `npm run test:unit` — består
- [ ] `npm run test:vitest` — består (MCP-server, autoCombo, hurtigbuffer)
- [ ] `npm run test:coverage` — kravet 60/60/60/60 er oppfylt (setninger/linjer/funksjoner/grener)
- [ ] `npm run test:integration` — består (hvis endringene berører DB/behandlere)
- [ ] `npm run test:combo:matrix` — består (matrise for kombinasjonsstrategier: beviser deterministisk valgene til alle de 19 offentlige rutingsstrategiene; kjøres ved endringer i kombinasjonsruting, strategioppløsning eller reservelogikk)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **valgfri/manuell** (røyktest mot reelle oppstrømstjenester med tilgangskontroll; henter et skrivebeskyttet DB-øyeblikksbilde fra VPS-en `root@192.168.0.15`; bruker reelle leverandører og koster kreditter; kjøres aldri i CI; hoppes over uten feil når kontrollvariabelen mangler)
- [ ] `npm run test:combo:live:vps` — **valgfri/manuell** (direkte VPS-røyktest for fase 3: 7 HTTP-scenarioer mot den aktive `.15`-serveren via ren Node ESM; krever `ssh root@192.168.0.15`; oppretter/sletter bare `__live_test__*`-kombinasjoner; bruker reelle leverandører; kjøres aldri i CI)
- [ ] `npm run test:e2e` — består (UI-endringer)
- [ ] `npm run test:protocols:e2e` — består (MCP-/A2A-endringer)
- [ ] `npm run test:ecosystem` — består

### Hooks (validert av Husky)

Husky-hooks ligger i `.husky/` og kjøres automatisk ved git-operasjoner.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** raske, deterministiske kontroller — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivert 2026-06-13). Utelater bevisst `test:unit` (treg; dekkes av CI-jobben `test-unit`).
  - Kjør `npm run test:unit` manuelt før du pusher utgivelsesgrener.

Hvis en hook feiler: rett det underliggende problemet, ikke omgå den med `--no-verify`.

### Konvensjonelle commits

Alle commits som skal inngå i en utgivelse, må følge formatet `type(scope): subject`.

**Gyldige typer:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Gyldige omfang:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Inkompatible endringer: legg til bunnteksten `BREAKING CHANGE:` eller `!` etter omfanget (f.eks. `feat(api)!: drop /v0`).

### Dokumentasjon

- [ ] `npm run check:docs-sync` består (kjøres automatisk av pre-commit)
- [ ] `npm run check:docs-all` består (samlet sjekk: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` avsluttes med 0 — miljøkontrakten mellom kode ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` er intakt
- [ ] `npm run check:doc-links` avsluttes med 0 — ingen brutte interne Markdown-referanser etter restrukturering
- [ ] `docs/architecture/ARCHITECTURE.md` gjennomgått for avvik i lagring/kjøretidsmiljø
- [ ] `docs/guides/TROUBLESHOOTING.md` gjennomgått for avvik i miljøvariabler og drift
- [ ] Hvis `.env.example` er endret: `docs/reference/ENVIRONMENT.md` er oppdatert
- [ ] Hvis en ny funksjon har et brukergrensesnitt: `docs/guides/USER_GUIDE.md` omtaler den
- [ ] Hvis en ny funksjon har et API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` er oppdatert
- [ ] Hvis en ny funksjon er en modul: en egen `docs/<MODULE>.md` finnes
- [ ] Ved en inkompatibel endring: `docs/guides/TROUBLESHOOTING.md` har et migreringsnotat

### i18n

- [ ] `npm run i18n:check` avsluttes med 0 — oversettelsestilstanden (`.i18n-state.json`) er synkronisert med kildedokumentasjonen (ingen avvikende kilder i streng modus; advarselsmodus er akseptabel for dokumentasjonsjusteringer i siste liten, men resultatet bør være 0 før tagging)
- [ ] `npm run i18n:check-ui-coverage` avsluttes med 0 — alle språkinnstillinger for brukergrensesnittet er på eller over dekningsgrensen på 80 %
- [ ] `npm run i18n:sync-ui:dry` rapporterer 0 manglende nøkler på tvers av alle de 42 språkinnstillingene
- [ ] Hvis den engelske kildedokumentasjonen er endret, kjør `npm run i18n:run` (krever `OMNIROUTE_TRANSLATION_API_KEY` i `.env`) før tagging
- [ ] Oversettelsesbidrag kan utsettes til neste utgivelse hvis de er mindre omfattende (spor dem i CHANGELOG)

### Databasemigreringer

- [ ] Hvis `src/lib/db/migrations/` har nye filer:
  - [ ] Hver migrering er idempotent (`CREATE TABLE IF NOT EXISTS` osv.)
  - [ ] Migreringer er pakket inn i transaksjoner
  - [ ] Riktig nummerert (ingen hull i sekvensen)
- [ ] Test på en ny installasjon: slett `~/.omniroute/omniroute.db` og kjør `npm run dev`
- [ ] Test på en eksisterende installasjon: sikkerhetskopier databasen, kjør migreringen og kontroller skjemaet
- [ ] WAL-filer (`-wal`, `-shm`) håndteres riktig hvis migreringen skriver om tabeller

### Leverandørkatalog (Zod-validert)

- [ ] Zod-skjemaet i `src/shared/constants/providers.ts` er gyldig ved innlasting
  - [ ] Alle leverandører har obligatoriske felt (`id`, `label`, `kind` osv.)
  - [ ] `freeNote` er angitt for nye gratisleverandører
  - [ ] OAuth-leverandører har `oauthConfig` registrert i `src/lib/oauth/constants/oauth.ts`
- [ ] Hvis en ny leverandør er lagt til: tilsvarende eksekveringsmodul i `open-sse/executors/`
- [ ] Hvis formatet ikke er OpenAI: oversetter i `open-sse/translator/`
- [ ] Modeller er registrert i `open-sse/config/providerRegistry.ts`
- [ ] Enhetstester i `tests/unit/` dekker klassifisering og ruting av leverandører

### Skrivebord (Electron)

Hvis `electron/` er endret:

- [ ] `npm run electron:smoke:packaged` består
- [ ] Bygg er testet for minst ett av `:win`, `:mac`, `:linux`
- [ ] Sertifikater for kodesignering er ikke utløpt (hvis signering brukes)
- [ ] Versjonen i `electron/package.json` samsvarer med rotens `package.json`
- [ ] Pekeren til kanalen for automatiske oppdateringer er oppdatert ved utgivelse til `stable`

### Byggoppsett

Repoet bruker tre separate utdatakataloger — bland dem aldri:

| Katalog   | Formål                                                            | Sporet?               |
| --------- | ----------------------------------------------------------------- | --------------------- |
| `src/`    | Applikasjonskilde (TypeScript / TSX)                              | Ja                    |
| `.build/` | Mellomprodukter fra bygging — utdata fra `next build` (`distDir`) | Nei (ignorert av git) |
| `dist/`   | Distribuerbar npm-pakke — satt sammen av `assembleStandalone`     | Nei (ignorert av git) |

> **Merknad til operatøren:** bildekatalogen på den eksterne VPS-en forblir `/usr/lib/node_modules/omniroute/app/`.
> Bare byggutdataene **i repoet** er flyttet (`app/` → `dist/`). Distribusjonsfunksjonene bruker rsync til å
> kopiere innholdet i `dist/` til den eksterne `app/`-katalogen — ingen endringer i VPS-baner er nødvendige.

**Flyt med ett bygg:**

```
npm run build:release
  └─ rm -rf .build dist          (opprydding)
  └─ next build → .build/next/   (mellomprodukter)
  └─ assembleStandalone          (kopierer standalone + statiske filer + public + native komponenter → dist/)
  └─ skriver dist/BUILD_SHA      (HEAD-kontrollmarkør)
```

IKKE kjør `npm run build` etterfulgt av en separat `npm run build:cli` for distribusjon — bruk
`npm run build:release`, som utfører en ren ombygging + kontrollmarkør i én kommando.

### Validering av artefakter

- [ ] `npm run build:release` fullføres, og `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` er ren — ingen `app.__qa_backup`, `scripts/scratch`, `package-lock.json` eller andre lokale rester
- [ ] `dist/server.js` finnes etter bygging

### Tagging og utgivelse

- [ ] Kjør `/generate-release-cc` (Claude Code-funksjon):
  - Oppretter taggen `vX.Y.Z`
  - Pusher taggen og grenen
  - Oppretter en GitHub-utgivelse med endringsloggen i beskrivelsen
  - Legger ved Electron-installasjonsfiler (hvis de er bygget)
- [ ] Eller manuelt:
  ```bash
  git tag -a vX.Y.Z -m "Utgivelse vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Distribusjon

Distribusjonsfunksjonene bruker en lettvektsflyt med rsync — ingen `npm pack`, ingen `npm i -g`:

- [ ] Bruk distribusjonsfunksjonen som samsvarer med målet:
  - `/deploy-vps-local-cc` — lokal VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai-VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — begge
- [ ] Før distribusjon må du bekrefte at `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Bygget må kjøres der `node_modules` er reell (hovedutsjekking eller et arbeidsområde der `npm ci` er kjørt — IKKE et symlenket arbeidsområde)
- [ ] Kjør en enkel funksjonstest av den distribuerte instansen:
  - Åpne `/dashboard/health` → kontroller at versjonsstrengen samsvarer med utgivelsen
  - Kjør en `/v1/chat/completions`-forespørsel mot en kjent leverandør
  - Kontroller at `/api/monitoring/health` returnerer `CLOSED`-effektbrytere
  - Bekreft at MCP-transportene svarer (`/mcp` HTTP, `/mcp-sse` SSE)

### Etter utgivelsen

- [ ] Kjør `/capture-release-evidences-cc` (Claude Code-ferdighet)
  - Tar WebP-skjermbilder/-opptak av nye funksjoner
  - Legger dem ved versjonsmerknadene/blogginnlegget
- [ ] Oppdater GitHub Discussions / Discord med lanseringskunngjøringen
- [ ] Opprett en milepæl for neste versjon
- [ ] Hvis kritisk: fest diskusjonen eller publiser i `news.json` for banneret i appen

### Kontrollpunkt for offentlig lansering av Radar

Radar-kunngjøringen er med hensikt lagt inn med `active: false`. Aktivering er en separat
endring etter at det foreligger dokumentasjon for hvert punkt nedenfor:

- [ ] Alle stablede Radar-PR-er er slått sammen, og CI-en for release-tip er grønn
- [ ] Distribuer og utfør en røykprøve av OSS-rutene for Radar mens `RADAR_ENABLED` fortsatt er av som standard
- [ ] Utfør en røykprøve av `GET /planos`, `/termos`, `/privacidade` og `/reembolso` på den angitte Radar-verten
- [ ] Registrer operatørens identitet/kontaktinformasjon/adresse og eiergodkjent juridisk gjennomgang i den private tjenesten
- [ ] Test Stripe Checkout og den signerte webhooken kun i testmodus
- [ ] Test én kryptert levering av transaksjons-e-post med den godkjente avsenderen/domenet
- [ ] Dokumenter gjenoppretting fra sikkerhetskopi og én overvåket forskningskjøring med budsjetttak
- [ ] Godkjenn gjennomgangspolicyen for BRL/PIX før donasjonsdokumentasjon godtas
- [ ] Aktiver offentlig Checkout først etter de foregående kontrollpunktene, og aktiver deretter den nye `news.json`-ID-en
- [ ] Kontroller at Home-banneret bruker lokalisert tekst, og at en ny ID vises igjen etter at en eldre ID er avvist

## Røyktest for innebygde tjenester (v3.8.4+)

Før en utgivelse som inneholder endringer i innebygde tjenester publiseres, må du kontrollere:

### Oppstart med ny database (avdekker migreringskollisjoner — lagt til etter hurtigrettingen i v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — vent 10 s på oppstart
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` returnerer `"9router"` (IKKE 404, IKKE 500). Bekrefter at migreringen `071_services.sql` er utført og at raden er opprettet.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` returnerer 3 rader.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` returnerer 2 rader (bekrefter at `070_webhooks_kind_metadata.sql` er utført).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` består — beskytter mot fremtidige kollisjoner.

### 9Router

- [ ] `POST /api/services/9router/install` returnerer 200 med `installedVersion` på under 2 min
- [ ] `POST /api/services/9router/start` returnerer 200 og `state: "running"` på under 30 s
- [ ] `GET /api/services/9router/status` rapporterer `health: "healthy"`
- [ ] `POST /v1/chat/completions` med `"model": "9router/auto/..."` returnerer 200 (ende-til-ende-ruting gjennom 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` gjengir det integrerte brukergrensesnittet til 9Router inne i proxyen (ingen iframe direkte til `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` returnerer `{ keyRotated: true }`, og tjenesten starter på nytt uten feil
- [ ] `POST /api/services/9router/stop` returnerer 200 og `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` returnerer en SSE-strøm med en `snapshot`-hendelse som inneholder nylige linjer
- [ ] Installasjon i et miljø uten `npm` i PATH returnerer 500 med en forståelig feilmelding (uten stakksporing)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` returnerer 200 på under 2 min
- [ ] `POST /api/services/cliproxy/start` returnerer 200 og `state: "running"` på under 30 s
- [ ] `GET /api/services/cliproxy/status` rapporterer `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` returnerer 200 og `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` returnerer en SSE-strøm

### Sikkerhetsregresjon

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` returnerer `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` returnerer `403 LOCAL_ONLY`
- [ ] Feilsvar fra `/api/services/*` inneholder ikke `err.stack` eller absolutte filbaner

## Kontroller for v3.8.0+

Før en v3.8.x-utgivelse publiseres, må du kontrollere disse tilleggspunktene:

- [ ] `omniroute --tray` starter på macOS (systray2 installert i `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` starter på Linux (krever DISPLAY; forståelig feil hvis den ikke er angitt)
- [ ] `omniroute --tray` starter på Windows (PowerShell NotifyIcon, ingen ekstra binærfiler)
- [ ] `omniroute config tray enable` oppretter en autostartoppføring; deaktivering fjerner den
- [ ] `npm install -g omniroute@<this-version>` kjører postinstall uten fatal avslutning
- [ ] Oppdateringsbanen beholder valgfrie avhengigheter: `omniroute update --apply` og den automatiske oppdatereren
      kjører `npm install -g … --include=optional`, slik at `optionalDependencies` (better-sqlite3,
      keytar, tls-client og llmlingua SLM-stakken: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) overlever en oppdatering. SLM-nivået ultra `modelPath` trenger også
      tinybert-modellen, som lastes automatisk ned til `${DATA_DIR}/models/llmlingua` ved første gangs bruk. Postinstall
      (`scripts/build/colocateOptionals.mjs`) samlokaliserer deretter den valgfrie SLM-avhengighetskjeden i
      `dist/node_modules`, slik at workeren løser til ÉN forekomst av `@huggingface/transformers` ^4.2.0
      — den frittstående sporingen pakker bare transformers, ikke de dynamisk importerte
      valgfrie avhengighetene, så uten dette ville workeren laste llmlingua-2 mot transformers i roten,
      og SLM-nivået ville i stillhet gå over til åpen modus.
- [ ] `omniroute status` fungerer uten `.env` (CLI-tokenbane, kun loopback)
- [ ] `curl http://localhost:20128/api/shutdown` returnerer 401 (alltid beskyttet rute)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` returnerer 401 (loopback-beskyttelse)
- [ ] SQLite-kjøretidsmiljøet løses til `bundled` ved første kjøring (den medfølgende binærfilen er gyldig for plattformen)
- [ ] SQLite-kjøretidsmiljøet faller tilbake til `runtime` når `node_modules/better-sqlite3` slettes
- [ ] Smart MCP-filteret komprimerer reelle utdata fra `playwright-mcp browser_snapshot` (≥50 % reduksjon)
- [ ] Alle de 10 `skills/omniroute*/SKILL.md`-filene er offentlig tilgjengelige via en rå GitHub-URL
- [ ] Innføringsveiviseren viser omvisningstrinnet «Slik fungerer det» for nivåene ved nytt oppsett
- [ ] Nivådekningsmodulen på startoversikten viser antall konfigurerte/aktive

---

## Tilbakerulling

Hvis utgivelsen har et kritisk problem:

1. `gh release edit vX.Y.Z --prerelease` (markerer den som ikke nyeste)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (bare hvis den ennå ikke er tatt i bruk av brukere)
3. Eller: hurtigretting på `release/vX.Y.0` → feilrettingsutgivelse `vX.Y.(Z+1)`
4. Kommuniser umiddelbart i GitHub Discussions og Discord

## Ufravikelige regler

- Aldri foreta en commit direkte til `main`
- Aldri bruk `git push --force` til `main`- eller `release/*`-grener
- Aldri hopp over Husky-hooks (`--no-verify`)
- Aldri legg inn hemmeligheter, påloggingsinformasjon eller `.env`-filer i en commit
- Kodedekningen må forbli ≥60/60/60/60 (setninger/linjer/funksjoner/grener)
- Inkluder eller oppdater alltid tester når du endrer produksjonskode i `src/`, `open-sse/`, `electron/` eller `bin/`

## Automatisert synkroniseringskontroll

Kjør synkroniseringskontrollen for dokumentasjonen lokalt før du åpner en PR:

```bash
npm run check:docs-sync
```

CI kjører også denne kontrollen i `.github/workflows/ci.yml` (lint-jobben).
