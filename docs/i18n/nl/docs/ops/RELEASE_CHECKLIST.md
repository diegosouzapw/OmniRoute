# Release Checklist (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Laatst bijgewerkt:** 2026-08-28 — v3.8.51
> Gestroomlijnd releaseproces dat Claude Code-skills gebruikt voor automatisering.
>
> **Houd de wachtrij/branch groen tussen releases:** zie [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (`/green-prs`-familie + `npm run check:release-green` + `/babysit` + nightly). Door dit
> periodiek uit te voeren — en vooral **vóór** deze checklist — begint de release-PR groen.

## Kort samengevat

```bash
# 1. Verhoog de versie + genereer CHANGELOG (skill)
/version-bump-cc patch    # of minor/major

# 2. Voer de kwaliteitscontrole lokaal uit
npm run check              # linting + tests
npm run test:coverage      # volledige dekkingscontrole (60/60/60/60)

# 3. Bouw en voer een rooktest uit
npm run build
npm run test:e2e           # optioneel maar aanbevolen

# 4. Genereer de release (skill)
/generate-release-cc

# 5. Implementeer (skill)
/deploy-vps-both-cc        # of akamai-cc / local-cc

# 6. Leg releasebewijzen vast (skill)
/capture-release-evidences-cc
```

## npm Trusted Publishing (standaard sinds v3.8.51) — gefaseerd op verzoek, direct als terugvaloptie

`npm-publish.yml` publiceert standaard via **npm Trusted Publishing (OIDC)**: de
`stage-npm`-job (gehost door GitHub) wisselt het id-token van GitHub in voor tijdelijke
npm-referenties voor die uitvoering — geen langlevend npm-token in de repositorygeheimen, geen 2FA-prompt, provenance toegevoegd.
Dat is de door npm goedgekeurde omzeiling nu tokens die 2FA overslaan worden uitgefaseerd;
het herstelt de volledig automatische workflow die het project tot en met v3.8.48 had, met behoud van de
WS1.3-garantie (een gelekt token kan niet zelfstandig publiceren — er is geen token).

**Eenmalige configuratie (eigenaar):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Totdat dit bestaat, mislukt de automatische stap met `ENEEDAUTH`:
start opnieuw met `publish_mode=staged` (hieronder) of `direct`.

### Gefaseerd publiceren (op verzoek — `publish_mode=staged`)

De npm-publish-workflow publiceert niet langer rechtstreeks: deze start de ingepakte tarball
(`check:pack-boot`) en voert vervolgens `npm stage publish` uit — exact dezelfde bytes worden in
het register geparkeerd en zijn **niet installeerbaar** totdat de eigenaar ze goedkeurt. De menselijke 2FA-controle is verplaatst
naar NA het bewijs, niet ervoor.

**Workflow voor de eigenaar nadat de workflow groen wordt:**

1. `npm stage list omniroute` — zoek de stage-id (ook vermeld in het workflowoverzicht).
2. Verifieer de gefaseerde bytes (aanbevolen): `npm stage download <id>` en installeer vervolgens de
   gedownloade tarball in een tijdelijke prefix en start deze (`npm run check:pack-boot` automatiseert
   hetzelfde pack→install→boot-oordeel in CI).
3. `npm stage approve <id>` — de 2FA-prompt IS de publicatie. `npm stage reject <id>` verwijdert de stage.
4. Vangnet na publicatie: de post-publish-verificatie (WS1.4 van het v3.8.49-plan) installeert de
   gepubliceerde versie vanuit het openbare register in een schone container en start deze.

**Noodoplossing:** `workflow_dispatch` met `publish_mode=direct` herstelt de
oude directe `npm publish` (alleen gebruiken als staging zelf niet goed werkt; leg vast waarom).

**Eenmalige beveiliging (eigenaar, npmjs.com):** configureer de Trusted Publisher voor
`omniroute` in de modus alleen-staging, zodat een gelekt langlevend token niet rechtstreeks
vanaf een willekeurige locatie `npm publish` kan uitvoeren — CI kan alleen staging uitvoeren; alleen de 2FA van de eigenaar geeft vrij.

**Draaiboek voor defecte artefacten (ongewijzigd):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
als standaardreactie (minuten, omkeerbaar); `npm unpublish` alleen binnen het venster van 72 uur/geen afhankelijke pakketten
en nooit als eerste stap. Docker: overschrijf nooit een versietag — terugdraaien betekent dat
`latest` opnieuw naar de laatst werkende digest wordt verwezen.

**Docker Hub `latest` (vereist bij elke stabiele SemVer-publicatie):** de
`docker-publish`-workflow moet **zowel** `X.Y.Z` taggen als, wanneer
`should-promote-latest.sh` bevestigt dat dit de hoogste stabiele SemVer is, `:latest`,
met **dezelfde digest**. Na de job: de `latest`-digest op Hub is gelijk aan de nieuwe
SemVer-digest en `last_updated` is bijgewerkt. Laat `:latest` niet naar een oudere
build verwijzen terwijl de releaseopmerkingen oplossingen bespreken die alleen in git bestaan. Compose-
quickstarts gebruiken `:latest`; GitOps moet `X.Y.Z` vastgepind blijven gebruiken. Zie
[Docker-releasekanalen](../guides/DOCKER_GUIDE.md#release-channels) en #10317.

## Hotfix-sneltraject (label `hotfix`)

Een PR met het label `hotfix` slaat de zware CI-matrix over (E2E met 9 shards, coverage-ratchet,
quality-gate, quality-extended) en behoudt de snelle controles met een sterk signaal: build,
unit-shards, integratie, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
en de boot-smoketest van de tarball (`check:pack-boot`). Doel: groen binnen ≤15 min in plaats van ~33 min.

**Toelatingsbeleid — alle vier vereist (gebaseerd op noodtrajecten van Chromium/VS Code/Node):**

1. **Ernst**: productie is defect — een gepubliceerd artifact crasht tijdens het opstarten / een
   beveiligingsoplossing / elke gebruiker van de release wordt getroffen. "Belangrijk" is niet hetzelfde als "defect".
2. **Bevoegdheid**: alleen de eigenaar van de repository past het label `hotfix` toe. Het label IS
   de goedkeuring — pas dit nooit zelf toe op een campagne-PR.
3. **Bewijs**: de PR-beschrijving bevat een link naar de vorige volledig groene zware run (de suite die
   de overgeslagen jobs opnieuw zouden valideren), plus de eigen test van de fix die eerst faalde en daarna slaagde.
4. **Bereik**: uitsluitend cherry-pick — de minimale fix, geen refactors, geen meeliftende wijzigingen.

Het overgeslagen coverage-/ratchet-oppervlak wordt opnieuw gevalideerd door de volgende volledige run op de
releasebranch (doorlopend groene release) — het traject slaat alleen het WACHTEN over, nooit de validatie.
Diffs met uitsluitend tests (alle bestanden onder `tests/`, geen onder `tests/e2e/`) slaan de E2E-
matrix automatisch over, zonder label.

## Gedetailleerde checklist

### Vóór de release

- [ ] Alle PR's die voor deze release zijn bestemd, zijn samengevoegd in `release/vX.Y.0`
- [ ] Alle openstaande Linear-/issue-items voor deze versie zijn gesloten of naar de volgende milestone verplaatst
- [ ] CI is groen op de branch `release/vX.Y.0`
- [ ] Geen `TODO(release)`-markeringen in de code: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker-basisimage is up-to-date (momenteel `node:24.15.0-trixie-slim`)

### Versie en changelog

- [ ] Voer `/version-bump-cc <patch|minor|major>` uit (Claude Code-skill)
  - Verhoogt de versie in `package.json`, `electron/package.json`
  - Genereert `CHANGELOG.md` opnieuw op basis van git-commits sinds de laatste tag
  - Werkt badges in README.md bij
- [ ] Controleer CHANGELOG.md handmatig en ruim commitberichten indien nodig op
- [ ] Zorg dat de nieuwste semver-sectie in `CHANGELOG.md` gelijk is aan de versie in `package.json`
- [ ] Behoud `## [Unreleased]` als de eerste changelogsectie voor aankomend werk
- [ ] Werk `docs/openapi.yaml` bij → `info.version` moet gelijk zijn aan de versie in `package.json`

### Codekwaliteit

- [ ] `npm run lint` — 0 fouten (waarschuwingen bestonden al)
- [ ] `npm run typecheck:core` — zonder problemen
- [ ] `npm run typecheck:noimplicit:core` — zonder problemen (strikt)
- [ ] `npm run check:cycles` — geen circulaire afhankelijkheden
- [ ] `npm run check:any-budget:t11` — binnen het budget
- [ ] `npm run check:route-validation:t06` — zonder problemen
- [ ] `npm run check:node-runtime` — ondersteunde minimale runtimeversie gehaald (`>=22.22.2 <23`, `>=24.0.0 <27`, volgens `SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`; afgestemd op `engines` in `package.json`)

### Testen

- [ ] `npm run test:unit` — geslaagd
- [ ] `npm run test:vitest` — geslaagd (MCP-server, autoCombo, cache)
- [ ] `npm run test:coverage` — drempel van 60/60/60/60 gehaald (statements/lines/functions/branches)
- [ ] `npm run test:integration` — geslaagd (als wijzigingen betrekking hebben op DB / handlers)
- [ ] `npm run test:combo:matrix` — geslaagd (matrix van combostrategieën: bewijst op deterministische wijze de selectiebeslissingen van alle 19 publieke routeringsstrategieën; uitvoeren bij wijzigingen aan combo-routering, strategieoplossing of fallbacklogica)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **optioneel/handmatig** (afgeschermde smoketest met echte upstreams; haalt een alleen-lezen DB-snapshot op van VPS `root@192.168.0.15`; benadert echte providers, kost credits; wordt nooit uitgevoerd in CI; wordt zonder de activering netjes overgeslagen)
- [ ] `npm run test:combo:live:vps` — **optioneel/handmatig** (live VPS-smoketest voor fase 3: 7 HTTP-scenario's tegen de live `.15`-server via gewone Node ESM; vereist `ssh root@192.168.0.15`; maakt/verwijdert alleen combo's met `__live_test__*`; benadert echte providers; wordt nooit uitgevoerd in CI)
- [ ] `npm run test:e2e` — geslaagd (UI-wijzigingen)
- [ ] `npm run test:protocols:e2e` — geslaagd (MCP-/A2A-wijzigingen)
- [ ] `npm run test:ecosystem` — geslaagd

### Hooks (gevalideerd door Husky)

Husky-hooks bevinden zich in `.husky/` en worden automatisch uitgevoerd bij git-bewerkingen.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** snelle deterministische controles — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (geactiveerd op 2026-06-13). Sluit `test:unit` bewust uit (traag; afgedekt door de CI-job `test-unit`).
  - Voer `npm run test:unit` handmatig uit voordat releasebranches worden gepusht.

Als een hook faalt: los het onderliggende probleem op en omzeil de hook niet met `--no-verify`.

### Conventional Commits

Alle commits die voor een release zijn bestemd, moeten de notatie `type(scope): subject` volgen.

**Geldige typen:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Geldige scopes:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Incompatibele wijzigingen: voeg een `BREAKING CHANGE:`-footer toe of een `!` na de scope (bijvoorbeeld `feat(api)!: drop /v0`).

### Documentatie

- [ ] `npm run check:docs-sync` slaagt (automatisch uitgevoerd door pre-commit)
- [ ] `npm run check:docs-all` slaagt (overkoepelend: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` eindigt met 0 — het env-contract tussen code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` is intact
- [ ] `npm run check:doc-links` eindigt met 0 — geen verbroken interne markdown-verwijzingen na de herstructurering
- [ ] `docs/architecture/ARCHITECTURE.md` gecontroleerd op afwijkingen in opslag/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` gecontroleerd op afwijkingen in omgevingsvariabelen en operationele informatie
- [ ] Als `.env.example` is gewijzigd: `docs/reference/ENVIRONMENT.md` bijgewerkt
- [ ] Als een nieuwe functie een UI heeft: `docs/guides/USER_GUIDE.md` vermeldt deze
- [ ] Als een nieuwe functie een API heeft: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` bijgewerkt
- [ ] Als een nieuwe functie een module is: er bestaat een afzonderlijk bestand `docs/<MODULE>.md`
- [ ] Bij een brekende wijziging: `docs/guides/TROUBLESHOOTING.md` bevat een migratieopmerking

### i18n

- [ ] `npm run i18n:check` eindigt met 0 — vertaalstatus (`.i18n-state.json`) is gesynchroniseerd met de brondocumentatie (geen afgeweken bronnen in strikte modus; een waarschuwing in waarschuwingsmodus is acceptabel voor documentatieaanpassingen op het laatste moment, maar moet 0 zijn vóór het taggen)
- [ ] `npm run i18n:check-ui-coverage` eindigt met 0 — elke UI-locale bevindt zich op of boven de minimale dekkingsgraad van 80%
- [ ] `npm run i18n:sync-ui:dry` rapporteert 0 ontbrekende sleutels voor alle 42 locales
- [ ] Als de Engelse brondocumentatie is gewijzigd, voer dan vóór het taggen `npm run i18n:run` uit (vereist `OMNIROUTE_TRANSLATION_API_KEY` in `.env`)
- [ ] Vertaalbijdragen kunnen bij kleine wijzigingen worden uitgesteld tot de volgende release (bijhouden in CHANGELOG)

### Databasemigraties

- [ ] Als `src/lib/db/migrations/` nieuwe bestanden bevat:
  - [ ] Elke migratie is idempotent (`CREATE TABLE IF NOT EXISTS`, enz.)
  - [ ] Migraties zijn verpakt in transacties
  - [ ] Correct genummerd (geen gaten in de reeks)
- [ ] Test bij een nieuwe installatie: verwijder `~/.omniroute/omniroute.db` en voer `npm run dev` uit
- [ ] Test bij een bestaande installatie: maak een back-up van de database, voer de migratie uit en controleer het schema
- [ ] WAL-bestanden (`-wal`, `-shm`) worden correct afgehandeld als de migratie tabellen herschrijft

### Providercatalogus (gevalideerd met Zod)

- [ ] Zod-schema van `src/shared/constants/providers.ts` is geldig tijdens het laden
  - [ ] Alle providers hebben de vereiste velden (`id`, `label`, `kind`, enz.)
  - [ ] `freeNote` is opgegeven voor nieuwe gratis providers
  - [ ] OAuth-providers hebben een `oauthConfig` die is geregistreerd in `src/lib/oauth/constants/oauth.ts`
- [ ] Als een nieuwe provider is toegevoegd: bijbehorende executor in `open-sse/executors/`
- [ ] Bij een niet-OpenAI-indeling: translator in `open-sse/translator/`
- [ ] Modellen geregistreerd in `open-sse/config/providerRegistry.ts`
- [ ] Unittests in `tests/unit/` dekken providerclassificatie en routering

### Desktop (Electron)

Als `electron/` is gewijzigd:

- [ ] `npm run electron:smoke:packaged` slaagt
- [ ] Builds getest voor ten minste één van `:win`, `:mac`, `:linux`
- [ ] Certificaten voor codeondertekening zijn niet verlopen (indien ondertekening wordt gebruikt)
- [ ] Versie in `electron/package.json` komt overeen met die in het hoofd-`package.json`
- [ ] Verwijzing naar het kanaal voor automatische updates bijgewerkt bij een release naar `stable`

### Buildindeling

De repository gebruikt drie afzonderlijke uitvoermappen — haal ze nooit door elkaar:

| Map       | Doel                                                                | Bijgehouden?             |
| --------- | ------------------------------------------------------------------- | ------------------------ |
| `src/`    | Applicatiebroncode (TypeScript / TSX)                               | Ja                       |
| `.build/` | Tussenproducten van de build — uitvoer van `next build` (`distDir`) | Nee (genegeerd door git) |
| `dist/`   | Distribueerbare npm-bundel — samengesteld door `assembleStandalone` | Nee (genegeerd door git) |

> **Opmerking voor operators:** de map van de externe VPS-image blijft `/usr/lib/node_modules/omniroute/app/`.
> Alleen de builduitvoer **in de repository** is verplaatst (`app/` → `dist/`). De deploy-skills synchroniseren
> de inhoud van `dist/` via rsync naar de externe map `app/` — er zijn geen wijzigingen aan VPS-paden nodig.

**Flow met één build:**

```
npm run build:release
  └─ rm -rf .build dist          (opschonen)
  └─ next build → .build/next/   (tussenproducten)
  └─ assembleStandalone          (kopieert standalone + static + public + natives → dist/)
  └─ schrijft dist/BUILD_SHA     (HEAD-controlebestand)
```

Voer voor deployment NIET eerst `npm run build` uit gevolgd door een afzonderlijke `npm run build:cli` — gebruik
`npm run build:release`, waarmee in één opdracht een schone rebuild wordt uitgevoerd en het controlebestand wordt aangemaakt.

### Artefactvalidatie

- [ ] `npm run build:release` slaagt en `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` is schoon — geen `app.__qa_backup`, `scripts/scratch`, `package-lock.json` of andere lokale restbestanden
- [ ] `dist/server.js` bestaat na de build

### Taggen & release

- [ ] Voer `/generate-release-cc` uit (Claude Code-skill):
  - Maakt tag `vX.Y.Z`
  - Pusht tag en branch
  - Opent een GitHub-release met de changelogtekst
  - Voegt Electron-installatieprogramma's toe (indien gebouwd)
- [ ] Of handmatig:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deployment

Deploy-skills gebruiken de lichte rsync-flow — geen `npm pack`, geen `npm i -g`:

- [ ] Gebruik de deploy-skill die overeenkomt met het doel:
  - `/deploy-vps-local-cc` — lokale VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai-VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — beide
- [ ] Controleer vóór de deployment dat `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] De build moet worden uitgevoerd waar `node_modules` echt is (hoofdcheckout of worktree waarop `npm ci` is uitgevoerd — GEEN worktree met symbolische koppelingen)
- [ ] Voer een rooktest uit op de gedeployde instantie:
  - Open `/dashboard/health` → controleer of de versietekenreeks overeenkomt met de release
  - Voer een `/v1/chat/completions`-aanvraag uit bij een bekende provider
  - Controleer of `/api/monitoring/health` circuitbreakers met status `CLOSED` retourneert
  - Bevestig dat MCP-transports reageren (`/mcp` HTTP, `/mcp-sse` SSE)

### Na de release

- [ ] Voer `/capture-release-evidences-cc` uit (Claude Code-skill)
  - Maakt WebP-schermafbeeldingen/-opnamen van nieuwe functies
  - Voegt deze toe aan releaseopmerkingen / blogbericht
- [ ] Werk GitHub Discussions / Discord bij met de releaseaankondiging
- [ ] Open een milestone voor de volgende versie
- [ ] Indien kritiek: zet de discussie vast of plaats deze in `news.json` voor een banner in de app

### Radar-gate voor publieke lancering

De Radar-aankondiging is bewust gecommit met `active: false`. Activering is een afzonderlijke
wijziging nadat voor elk onderstaand punt bewijs is geleverd:

- [ ] Alle gestapelde Radar-PR's zijn gemerged en de CI voor de release-tip is groen
- [ ] Implementeer de OSS Radar-routes en voer er smoketests op uit terwijl `RADAR_ENABLED` standaard nog uitgeschakeld is
- [ ] Voer smoketests uit op `GET /planos`, `/termos`, `/privacidade` en `/reembolso` op de genoemde Radar-host
- [ ] Leg de identiteit/contactgegevens/het adres van de beheerder en de door de eigenaar goedgekeurde juridische beoordeling vast in de privéservice
- [ ] Test Stripe Checkout en de ondertekende webhook uitsluitend in de testmodus
- [ ] Test één versleutelde levering van een transactionele e-mail met de goedgekeurde afzender/het goedgekeurde domein
- [ ] Toon aan dat een back-up kan worden hersteld en voer één begeleide onderzoekstaak uit met een budgetlimiet
- [ ] Keur het BRL/PIX-beoordelingsbeleid goed voordat donatiebewijzen worden geaccepteerd
- [ ] Schakel openbare Checkout pas in nadat aan de voorgaande gates is voldaan en activeer vervolgens de nieuwe `news.json`-ID
- [ ] Controleer of de Home-banner gelokaliseerde tekst gebruikt en of een nieuwe ID opnieuw verschijnt nadat een oudere ID is gesloten

## Smoke-test voor Embedded Services (v3.8.4+)

Controleer vóór het uitbrengen van een release met wijzigingen aan embedded services:

### Opstarten met een nieuwe database (detecteert migratieconflicten — toegevoegd na de v3.8.4-hotfix)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — wacht 10 s op het opstarten
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` retourneert `"9router"` (NIET 404, NIET 500). Bevestigt dat migratie `071_services.sql` is toegepast en de rij is aangemaakt.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` retourneert 3 rijen.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` retourneert 2 rijen (valideert dat `070_webhooks_kind_metadata.sql` is toegepast).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` slaagt — beschermt tegen toekomstige conflicten.

### 9Router

- [ ] `POST /api/services/9router/install` retourneert binnen 2 min een 200-respons met `installedVersion`
- [ ] `POST /api/services/9router/start` retourneert binnen 30 s een 200-respons en `state: "running"`
- [ ] `GET /api/services/9router/status` rapporteert `health: "healthy"`
- [ ] `POST /v1/chat/completions` met `"model": "9router/auto/..."` retourneert 200 (end-to-end-routering via 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` geeft de native gebruikersinterface van 9Router binnen de proxy weer (geen directe `127.0.0.1:port`-iframe)
- [ ] `POST /api/services/9router/rotate-key` retourneert `{ keyRotated: true }` en de service start zonder problemen opnieuw
- [ ] `POST /api/services/9router/stop` retourneert 200 en `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` retourneert een SSE-stream met een `snapshot`-event dat recente regels bevat
- [ ] Installatie in een omgeving zonder `npm` in PATH retourneert 500 met een duidelijke foutmelding (zonder stacktrace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` retourneert binnen 2 min een 200-respons
- [ ] `POST /api/services/cliproxy/start` retourneert binnen 30 s een 200-respons en `state: "running"`
- [ ] `GET /api/services/cliproxy/status` rapporteert `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` retourneert 200 en `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` retourneert een SSE-stream

### Beveiligingsregressie

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` retourneert `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` retourneert `403 LOCAL_ONLY`
- [ ] Foutresponsen van `/api/services/*` bevatten geen `err.stack` of absolute bestandspaden

## Controles voor v3.8.0+

Controleer vóór het uitbrengen van een v3.8.x-release ook deze aanvullende punten:

- [ ] `omniroute --tray` start op macOS (systray2 geïnstalleerd in `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` start op Linux (vereist DISPLAY; duidelijke foutmelding als dit niet is ingesteld)
- [ ] `omniroute --tray` start op Windows (PowerShell NotifyIcon, geen extra binaire bestanden)
- [ ] `omniroute config tray enable` maakt een autostartvermelding aan; uitschakelen verwijdert deze
- [ ] `npm install -g omniroute@<this-version>` voert postinstall uit zonder fatale afsluiting
- [ ] Het updatepad behoudt optionele afhankelijkheden: `omniroute update --apply` en de automatische updater
      voeren `npm install -g … --include=optional` uit, zodat `optionalDependencies` (better-sqlite3,
      keytar, tls-client en de llmlingua SLM-stack: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) een update overleven. De ultra-`modelPath`-SLM-laag heeft ook het
      tinybert-model nodig, dat bij het eerste gebruik automatisch naar `${DATA_DIR}/models/llmlingua` wordt gedownload. Postinstall
      (`scripts/build/colocateOptionals.mjs`) plaatst vervolgens de optionele SLM-closure samen in
      `dist/node_modules`, zodat de worker één ENKELE instantie van `@huggingface/transformers` ^4.2.0
      resolveert — de zelfstandige trace bundelt alleen transformers, niet de dynamisch geïmporteerde
      optionele afhankelijkheden; zonder dit zou de worker llmlingua-2 laden met de transformers van de root
      en zou de SLM-laag stilzwijgend fail-open werken.
- [ ] `omniroute status` werkt zonder `.env` (CLI-tokenpad, alleen loopback)
- [ ] `curl http://localhost:20128/api/shutdown` retourneert 401 (altijd beveiligde route)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` retourneert 401 (loopbackbeveiliging)
- [ ] De SQLite-runtime resolveert bij de eerste uitvoering naar `bundled` (gebundeld binair bestand is geldig voor het platform)
- [ ] De SQLite-runtime valt terug op `runtime` wanneer `node_modules/better-sqlite3` is verwijderd
- [ ] Het slimme MCP-filter comprimeert echte `playwright-mcp browser_snapshot`-uitvoer (≥50% reductie)
- [ ] Alle 10 `skills/omniroute*/SKILL.md`-bestanden zijn openbaar op te halen via een onbewerkte GitHub-URL
- [ ] De onboardingwizard toont bij een nieuwe configuratie de rondleidingsstap "Hoe het werkt" voor de lagen
- [ ] De widget voor laagdekking op het startdashboard toont de aantallen geconfigureerde/actieve lagen

---

## Terugdraaien

Als een release een kritiek probleem heeft:

1. `gh release edit vX.Y.Z --prerelease` (markeert deze als niet de nieuwste)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (alleen als deze nog niet door gebruikers is overgenomen)
3. Of: hotfix op `release/vX.Y.0` → patchrelease `vX.Y.(Z+1)`
4. Communiceer onmiddellijk via GitHub Discussions en Discord

## Strikte regels

- Commit nooit rechtstreeks naar `main`
- Gebruik nooit `git push --force` naar `main`- of `release/*`-branches
- Sla Husky-hooks nooit over (`--no-verify`)
- Commit nooit geheimen, inloggegevens of `.env`-bestanden
- De dekking moet ≥60/60/60/60 blijven (statements/regels/functies/branches)
- Voeg altijd tests toe of werk ze bij wanneer je productiecode wijzigt in `src/`, `open-sse/`, `electron/` of `bin/`

## Geautomatiseerde synchronisatiecontrole

Voer de synchronisatiecontrole voor documentatie lokaal uit voordat je een PR opent:

```bash
npm run check:docs-sync
```

CI voert deze controle ook uit in `.github/workflows/ci.yml` (lint-job).
