# Release Checklist (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Posledná aktualizácia:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydávania, ktorý využíva zručnosti Claude Code na automatizáciu.
>
> **Udržiavajte frontu/vetvu zelenú medzi vydaniami:** pozrite si [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + nočné spúšťanie). Pravidelné
> spúšťanie — a najmä **pred** týmto kontrolným zoznamom — zabezpečí, že PR vydania začne zelený.

## V skratke

```bash
# 1. Zvýšte verziu + vygenerujte CHANGELOG (zručnosť)
/version-bump-cc patch    # alebo minor/major

# 2. Spustite lokálne kontrolu kvality
npm run check              # lintovanie + testy
npm run test:coverage      # úplná kontrola pokrytia (60/60/60/60)

# 3. Zostavte a vykonajte základný test
npm run build
npm run test:e2e           # voliteľné, ale odporúčané

# 4. Vygenerujte vydanie (zručnosť)
/generate-release-cc

# 5. Nasaďte (zručnosť)
/deploy-vps-both-cc        # alebo akamai-cc / local-cc

# 6. Zachyťte dôkazy o vydaní (zručnosť)
/capture-release-evidences-cc
```

## Dôveryhodné publikovanie npm (predvolené od v3.8.51) — na požiadanie fázované, ako záloha priame

`npm-publish.yml` predvolene publikuje prostredníctvom **dôveryhodného publikovania npm (OIDC)**:
úloha `stage-npm` (hosťovaná na GitHube) vymení id-token GitHubu za krátkodobé prihlasovacie
údaje npm pre dané spustenie — žiadny dlhodobý token npm v tajných údajoch repozitára, žiadna výzva 2FA, pripojený pôvod.
Toto je spôsob obídenia, ktorý npm povoľuje po ukončovaní podpory tokenov preskakujúcich 2FA;
obnovuje plne automatický proces, ktorý projekt používal až do v3.8.48, a zároveň zachováva
záruku WS1.3 (uniknutý token sám osebe nemôže publikovať — žiadny token neexistuje).

**Jednorazové nastavenie (vlastník):** npmjs.com → balík `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitár `OmniRoute`, pracovný postup `npm-publish.yml`
(prostredie: žiadne). Kým toto nastavenie neexistuje, automatický krok zlyhá s `ENEEDAUTH`:
spustite ho znova s `publish_mode=staged` (nižšie) alebo `direct`.

### Fázované publikovanie (na požiadanie — `publish_mode=staged`)

Pracovný postup npm-publish už nepublikuje priamo: spustí zabalený archív tar
(`check:pack-boot`) a potom vykoná `npm stage publish` — presné bajty sú uložené
v registri, ale **nemožno ich nainštalovať**, kým ich vlastník neschváli. Ľudská kontrola 2FA sa
presunula až ZA overenie, nie predň.

**Postup vlastníka po úspešnom dokončení pracovného postupu:**

1. `npm stage list omniroute` — nájdite ID fázy (je uvedené aj v súhrne pracovného postupu).
2. Overte fázované bajty (odporúčané): `npm stage download <id>`, potom nainštalujte
   stiahnutý archív tar do dočasného prefixu a spustite ho (`npm run check:pack-boot` automatizuje
   rovnaké vyhodnotenie zabalenie→inštalácia→spustenie v CI).
3. `npm stage approve <id>` — výzva 2FA JE publikovaním. `npm stage reject <id>` obsah zahodí.
4. Ochrana po publikovaní: overovač po publikovaní (WS1.4 plánu v3.8.49) nainštaluje
   publikovanú verziu z verejného registra v čistom kontajneri a spustí ju.

**Núdzová záloha:** `workflow_dispatch` s `publish_mode=direct` obnoví
staršie okamžité `npm publish` (použite iba vtedy, ak samotné fázovanie nefunguje správne; zaznamenajte dôvod).

**Jednorazové posilnenie zabezpečenia (vlastník, npmjs.com):** nakonfigurujte dôveryhodného vydavateľa pre
`omniroute` v režime iba fázovania, aby uniknutý dlhodobý token nemohol vykonať `npm publish`
priamo odkiaľkoľvek — CI môže iba vytvoriť fázu; publikovať môže iba vlastník prostredníctvom 2FA.

**Postup pri poškodenom artefakte (bez zmeny):** predvolenou prvou reakciou je
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
(trvá niekoľko minút, je vratná); `npm unpublish` použite iba v rámci 72-hodinového obdobia/ak neexistujú závislé balíky
a nikdy nie ako prvý krok. Docker: nikdy neprepisujte značku verzie — návrat späť znamená
presmerovanie `latest` na posledný funkčný digest.

**Docker Hub `latest` (povinné pri každom stabilnom publikovaní SemVer):**
pracovný postup `docker-publish` musí označiť **oba** obrazy, `X.Y.Z`, a keď
`should-promote-latest.sh` potvrdí, že ide o najvyššiu stabilnú verziu SemVer, aj `:latest`,
s **rovnakým digestom**. Po dokončení úlohy: digest `latest` na Hube sa rovná digestu novej
verzie SemVer a hodnota `last_updated` sa zmenila. Nenechávajte `:latest` ukazovať na staršiu
zostavu, zatiaľ čo poznámky k vydaniu hovoria o opravách, ktoré existujú iba v gite. Rýchle
postupy Compose používajú `:latest`; GitOps by mal naďalej pripínať `X.Y.Z`. Pozrite si
[Kanály vydaní Docker](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrýchlený režim pre hotfixy (štítok `hotfix`)

PR označený štítkom `hotfix` preskočí rozsiahlu maticu CI (9-dielne E2E, sprísňovanie pokrytia,
quality-gate, quality-extended) a ponechá rýchle kontroly s vysokou výpovednou hodnotou: zostavenie,
diely jednotkových testov, integráciu, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
a boot-smoke test tarballu (`check:pack-boot`). Cieľ: zelený výsledok do ≤15 min namiesto ~33 min.

**Podmienky vstupu — vyžadujú sa všetky štyri (podľa vzoru núdzových režimov Chromium/VS Code/Node):**

1. **Závažnosť**: produkcia je nefunkčná — publikovaný artefakt zlyhá pri spustení /
   bezpečnostná oprava / problém sa týka každého používateľa vydania. „Dôležité“ neznamená „nefunkčné“.
2. **Oprávnenie**: štítok `hotfix` môže pridať iba vlastník repozitára. Samotný štítok JE
   schválením — na PR v rámci kampane ho nikdy nepridávajte sami.
3. **Dôkazy**: telo PR odkazuje na predchádzajúci úplne zelený rozsiahly beh (sadu, ktorú
   by preskočené úlohy opätovne overili) a tiež na test samotnej opravy, ktorý najprv zlyhá a potom prejde.
4. **Rozsah**: výhradne cherry-pick — iba minimálna oprava, bez refaktoringu a sprievodných zmien.

Preskočené pokrytie a sprísňovanie sa opätovne overia pri nasledujúcom úplnom behu na
release vetve (nepretržite zelené vydanie) — tento režim preskakuje ČAKANIE, nikdy nie overenie.
Zmeny týkajúce sa iba testov (všetky súbory pod `tests/`, žiadne pod `tests/e2e/`) preskočia maticu E2E
automaticky bez akéhokoľvek štítku.

## Podrobný kontrolný zoznam

### Pred vydaním

- [ ] Všetky PR určené pre toto vydanie sú zlúčené do `release/vX.Y.0`
- [ ] Všetky otvorené položky v Linear/problémy pre túto verziu sú uzavreté alebo presunuté do ďalšieho míľnika
- [ ] CI je zelené na vetve `release/vX.Y.0`
- [ ] V kóde nie sú žiadne značky `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Základný obraz Dockeru je aktuálny (momentálne `node:24.15.0-trixie-slim`)

### Verzia a zoznam zmien

- [ ] Spustite `/version-bump-cc <patch|minor|major>` (zručnosť Claude Code)
  - Zvýši verziu v `package.json`, `electron/package.json`
  - Opätovne vygeneruje `CHANGELOG.md` z git commitov od posledného tagu
  - Aktualizuje odznaky v README.md
- [ ] Manuálne skontrolujte CHANGELOG.md a v prípade potreby upravte správy commitov
- [ ] Uistite sa, že najnovšia sekcia semver v `CHANGELOG.md` zodpovedá verzii v `package.json`
- [ ] Ponechajte `## [Unreleased]` ako prvú sekciu zoznamu zmien pre pripravovanú prácu
- [ ] Aktualizujte `docs/openapi.yaml` → `info.version` musí zodpovedať verzii v `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chýb (upozornenia už existovali)
- [ ] `npm run typecheck:core` — bez problémov
- [ ] `npm run typecheck:noimplicit:core` — bez problémov (striktné)
- [ ] `npm run check:cycles` — žiadne cyklické závislosti
- [ ] `npm run check:any-budget:t11` — v rámci rozpočtu
- [ ] `npm run check:route-validation:t06` — bez problémov
- [ ] `npm run check:node-runtime` — splnená minimálna podporovaná verzia runtime (`>=22.22.2 <23`, `>=24.0.0 <27`, podľa `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; zosúladené s `engines` v `package.json`)

### Testovanie

- [ ] `npm run test:unit` — prejde
- [ ] `npm run test:vitest` — prejde (server MCP, autoCombo, vyrovnávacia pamäť)
- [ ] `npm run test:coverage` — splnená hranica 60/60/60/60 (príkazy/riadky/funkcie/vetvy)
- [ ] `npm run test:integration` — prejde (ak sa zmeny týkajú DB / handlerov)
- [ ] `npm run test:combo:matrix` — prejde (matica stratégií combo: deterministicky dokazuje rozhodnutia výberu všetkých 19 verejných stratégií smerovania; spustite pri zmenách smerovania combo, rozlišovania stratégií alebo záložnej logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **voliteľné/manuálne** (podmienený smoke test skutočného upstreamu; načíta snímku DB iba na čítanie z VPS `root@192.168.0.15`; volá skutočných poskytovateľov, spotrebúva kredity; nikdy sa nespúšťa v CI; bez povolenia sa korektne preskočí)
- [ ] `npm run test:combo:live:vps` — **voliteľné/manuálne** (živý smoke test VPS pre fázu 3: 7 scenárov HTTP proti živému serveru `.15` prostredníctvom čistého Node ESM; vyžaduje `ssh root@192.168.0.15`; vytvára/odstraňuje iba combo s názvom `__live_test__*`; volá skutočných poskytovateľov; nikdy sa nespúšťa v CI)
- [ ] `npm run test:e2e` — prejde (zmeny používateľského rozhrania)
- [ ] `npm run test:protocols:e2e` — prejde (zmeny MCP/A2A)
- [ ] `npm run test:ecosystem` — prejde

### Hooky (overené pomocou Husky)

Hooky Husky sa nachádzajú v `.husky/` a spúšťajú sa automaticky pri operáciách gitu.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** rýchle deterministické kontroly — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivované 2026-06-13). Zámerne nezahŕňa `test:unit` (pomalé; pokryté úlohou CI `test-unit`).
  - Pred odoslaním release vetiev manuálne spustite `npm run test:unit`.

Ak hook zlyhá: opravte základný problém, neobchádzajte ho pomocou `--no-verify`.

### Conventional Commits

Všetky commity určené na vydanie musia dodržiavať formát `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Nekompatibilné zmeny: pridajte pätu `BREAKING CHANGE:` alebo `!` za rozsah (napr. `feat(api)!: drop /v0`).

### Dokumentácia

- [ ] `npm run check:docs-sync` prejde (automaticky spúšťané cez pre-commit)
- [ ] `npm run check:docs-all` prejde (zastrešujúca kontrola: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` skončí s kódom 0 — kontrakt premenných prostredia medzi kódom ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je zachovaný
- [ ] `npm run check:doc-links` skončí s kódom 0 — po reštrukturalizácii neexistujú žiadne nefunkčné interné odkazy v markdowne
- [ ] `docs/architecture/ARCHITECTURE.md` bol skontrolovaný z hľadiska odchýlok v úložisku a behovom prostredí
- [ ] `docs/guides/TROUBLESHOOTING.md` bol skontrolovaný z hľadiska odchýlok v premenných prostredia a prevádzke
- [ ] Ak sa zmenil `.env.example`: aktualizoval sa `docs/reference/ENVIRONMENT.md`
- [ ] Ak má nová funkcia používateľské rozhranie: je uvedená v `docs/guides/USER_GUIDE.md`
- [ ] Ak má nová funkcia API: aktualizovali sa `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Ak je nová funkcia modulom: existuje samostatný súbor `docs/<MODULE>.md`
- [ ] Ak ide o nekompatibilnú zmenu: `docs/guides/TROUBLESHOOTING.md` obsahuje poznámku k migrácii

### i18n

- [ ] `npm run i18n:check` skončí s kódom 0 — stav prekladov (`.i18n-state.json`) je synchronizovaný so zdrojovou dokumentáciou (v striktnom režime žiadne odchýlky zdrojov; upozornenie v režime varovania je prijateľné pri úpravách dokumentácie na poslednú chvíľu, ale pred označením verzie by mal byť výsledok 0)
- [ ] `npm run i18n:check-ui-coverage` skončí s kódom 0 — každý jazyk používateľského rozhrania dosahuje aspoň minimálne 80 % pokrytie
- [ ] `npm run i18n:sync-ui:dry` hlási 0 chýbajúcich kľúčov vo všetkých 42 jazykoch
- [ ] Ak sa zmenila zdrojová anglická dokumentácia, pred označením verzie spustite `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Menšie príspevky k prekladom možno odložiť do ďalšieho vydania (zaznamenajte ich v CHANGELOG)

### Migrácie databázy

- [ ] Ak `src/lib/db/migrations/` obsahuje nové súbory:
  - [ ] Každá migrácia je idempotentná (`CREATE TABLE IF NOT EXISTS` atď.)
  - [ ] Migrácie sú obalené v transakciách
  - [ ] Sú správne očíslované (bez medzier v poradí)
- [ ] Otestujte na čistej inštalácii: odstráňte `~/.omniroute/omniroute.db` a spustite `npm run dev`
- [ ] Otestujte na existujúcej inštalácii: zálohujte databázu, spustite migráciu a overte schému
- [ ] Ak migrácia prepisuje tabuľky, súbory WAL (`-wal`, `-shm`) sa spracujú správne

### Katalóg poskytovateľov (validovaný pomocou Zod)

- [ ] Schéma Zod v `src/shared/constants/providers.ts` je platná pri načítaní
  - [ ] Všetci poskytovatelia majú povinné polia (`id`, `label`, `kind` atď.)
  - [ ] Pre nových bezplatných poskytovateľov je uvedené `freeNote`
  - [ ] Poskytovatelia OAuth majú `oauthConfig` zaregistrované v `src/lib/oauth/constants/oauth.ts`
- [ ] Ak bol pridaný nový poskytovateľ: zodpovedajúci vykonávací modul v `open-sse/executors/`
- [ ] Ak nejde o formát OpenAI: prekladač v `open-sse/translator/`
- [ ] Modely sú zaregistrované v `open-sse/config/providerRegistry.ts`
- [ ] Jednotkové testy v `tests/unit/` pokrývajú klasifikáciu poskytovateľov a smerovanie

### Desktopová aplikácia (Electron)

Ak sa zmenil `electron/`:

- [ ] `npm run electron:smoke:packaged` prejde
- [ ] Zostavenia boli otestované aspoň pre jednu z možností `:win`, `:mac`, `:linux`
- [ ] Certifikáty na podpisovanie kódu nie sú exspirované (ak sa používa podpisovanie)
- [ ] Verzia v `electron/package.json` sa zhoduje s koreňovým `package.json`
- [ ] Ak sa vydáva do kanála `stable`, ukazovateľ kanála automatických aktualizácií bol aktualizovaný

### Rozloženie zostavenia

Repozitár používa tri samostatné výstupné adresáre — nikdy ich nezamieňajte:

| Adresár   | Účel                                                                | Sledovaný?       |
| --------- | ------------------------------------------------------------------- | ---------------- |
| `src/`    | Zdrojový kód aplikácie (TypeScript / TSX)                           | Áno              |
| `.build/` | Medzivýstupy zostavenia — výstup `next build` (`distDir`)           | Nie (gitignored) |
| `dist/`   | Distribuovateľný balík npm — zostavený pomocou `assembleStandalone` | Nie (gitignored) |

> **Poznámka pre operátora:** adresár obrazu na vzdialenom VPS zostáva `/usr/lib/node_modules/omniroute/app/`.
> Presunul sa iba výstup zostavenia **v repozitári** (`app/` → `dist/`). Nasadzovacie zručnosti synchronizujú pomocou rsync
> obsah `dist/` do vzdialeného adresára `app/` — nie sú potrebné žiadne zmeny ciest na VPS.

**Tok jedného zostavenia:**

```
npm run build:release
  └─ rm -rf .build dist          (vyčistenie)
  └─ next build → .build/next/   (medzivýstupy)
  └─ assembleStandalone          (skopíruje samostatné súbory + statické súbory + verejné súbory + natívne moduly → dist/)
  └─ zapíše dist/BUILD_SHA       (kontrolná hodnota HEAD)
```

Pri nasadzovaní NEspúšťajte `npm run build` a následne samostatne `npm run build:cli` — použite
`npm run build:release`, ktorý vykoná čisté zostavenie + vytvorenie kontrolnej hodnoty jediným príkazom.

### Overenie artefaktu

- [ ] `npm run build:release` uspeje a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` prejde bez nálezov — žiadne `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani iné lokálne zvyšky
- [ ] Po zostavení existuje `dist/server.js`
- [ ] Voliteľný lokálny základný test zabaleného behového prostredia: `npm run dev:candidate -- validate` po `npm run dev:candidate -- build` spustí zabalený tarball v izolovanom `DATA_DIR` a skontroluje `/api/health` + `/v1/models` (pozrite si [Odporúčaný postup prispievania](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Označenie verzie a vydanie

- [ ] Spustite `/generate-release-cc` (zručnosť Claude Code):
  - Vytvorí značku `vX.Y.Z`
  - Odošle značku a vetvu
  - Vytvorí vydanie na GitHube s textom zoznamu zmien
  - Priloží inštalátory Electron (ak boli zostavené)
- [ ] Alebo manuálne:
  ```bash
  git tag -a vX.Y.Z -m "Vydanie vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasadenie

Nasadzovacie zručnosti používajú jednoduchý postup rsync — bez `npm pack`, bez `npm i -g`:

- [ ] Použite zručnosť nasadenia zodpovedajúcu cieľu:
  - `/deploy-vps-local-cc` — lokálny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Pred nasadením potvrďte, že `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Zostavenie sa musí spustiť tam, kde je `node_modules` skutočný (hlavný checkout alebo worktree s vykonaným `npm ci` — NIE worktree so symbolickým odkazom)
- [ ] Vykonajte základný test nasadenej inštancie:
  - Otvorte `/dashboard/health` → skontrolujte, či reťazec verzie zodpovedá vydaniu
  - Spustite požiadavku `/v1/chat/completions` voči známemu poskytovateľovi
  - Overte, že `/api/monitoring/health` vracia ističe v stave `CLOSED`
  - Potvrďte, že transporty MCP odpovedajú (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydaní

- [ ] Spustite `/capture-release-evidences-cc` (zručnosť Claude Code)
  - Zachytí snímky obrazovky/záznamy nových funkcií vo formáte WebP
  - Pripojí ich k poznámkam k vydaniu/blogovému príspevku
- [ ] Aktualizujte GitHub Discussions/Discord oznámením o vydaní
- [ ] Otvorte míľnik pre nasledujúcu verziu
- [ ] Ak je vydanie kritické: pripnite diskusiu alebo pridajte príspevok do `news.json` pre banner v aplikácii

### Podmienky verejného spustenia Radaru

Oznámenie Radaru je zámerne commitnuté s `active: false`. Aktivácia je samostatná
zmena, ktorá sa vykoná až po zdokumentovaní každej položky nižšie:

- [ ] Všetky na seba nadväzujúce PR Radaru sú zlúčené a CI pre špičku vydania je zelené
- [ ] Nasaďte a vykonajte základný test OSS trás Radaru, pričom `RADAR_ENABLED` zostane predvolene vypnuté
- [ ] Otestujte `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na určenom hostiteľovi Radaru
- [ ] Zaznamenajte identitu/kontakt/adresu prevádzkovateľa a vlastníkom schválené právne posúdenie v súkromnej službe
- [ ] Otestujte Stripe Checkout a podpísaný webhook iba v testovacom režime
- [ ] Otestujte jedno šifrované doručenie transakčného e-mailu so schváleným odosielateľom/doménou
- [ ] Preukážte obnovenie zo zálohy a jedno kontrolované výskumné spustenie s obmedzeným rozpočtom
- [ ] Pred prijatím dokladu o darovaní schváľte zásady kontroly BRL/PIX
- [ ] Verejný Checkout povoľte až po splnení predchádzajúcich podmienok, potom aktivujte nové ID v `news.json`
- [ ] Overte, že banner na domovskej stránke používa lokalizovaný text a že sa nové ID znova zobrazí po zatvorení staršieho ID

## Rýchly test vstavaných služieb (v3.8.4+)

Pred vydaním akejkoľvek verzie, ktorá obsahuje zmeny vstavaných služieb, overte:

### Spustenie s novou databázou (odhaľuje kolízie migrácií — pridané po rýchlej oprave v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkajte 10 s na spustenie
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vráti `"9router"` (NIE 404, NIE 500). Potvrdzuje, že migrácia `071_services.sql` bola použitá a riadok bol vytvorený.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vráti 3 riadky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vráti 2 riadky (overuje použitie migrácie `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prejde — chráni pred budúcimi kolíziami.

### 9Router

- [ ] `POST /api/services/9router/install` vráti do 2 minút stav 200 s `installedVersion`
- [ ] `POST /api/services/9router/start` vráti do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlási `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vráti stav 200 (smerovanie od začiatku do konca cez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí natívne používateľské rozhranie 9Router v rámci proxy (žiadny priamy prvok iframe s `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vráti `{ keyRotated: true }` a služba sa korektne reštartuje
- [ ] `POST /api/services/9router/stop` vráti stav 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vráti prúd SSE s udalosťou `snapshot` obsahujúcou najnovšie riadky
- [ ] Inštalácia v prostredí bez `npm` v PATH vráti stav 500 s používateľsky zrozumiteľným chybovým hlásením (bez výpisu zásobníka)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vráti do 2 minút stav 200
- [ ] `POST /api/services/cliproxy/start` vráti do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/cliproxy/status` hlási `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vráti stav 200 a `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vráti prúd SSE

### Regresia zabezpečenia

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vráti `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vráti `403 LOCAL_ONLY`
- [ ] Chybové odpovede z `/api/services/*` neobsahujú `err.stack` ani absolútne cesty k súborom

## Kontroly pre v3.8.0+

Pred vydaním akejkoľvek verzie v3.8.x overte aj tieto položky:

- [ ] `omniroute --tray` sa spustí v systéme macOS (systray2 je nainštalovaný v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` sa spustí v systéme Linux (vyžaduje DISPLAY; ak nie je nastavená, zobrazí sa zrozumiteľná chyba)
- [ ] `omniroute --tray` sa spustí v systéme Windows (PowerShell NotifyIcon, bez ďalších binárnych súborov)
- [ ] `omniroute config tray enable` vytvorí položku automatického spustenia; jej deaktivovanie ju odstráni
- [ ] `npm install -g omniroute@<this-version>` spustí postinstall bez fatálneho ukončenia
- [ ] Proces aktualizácie zachová voliteľné závislosti: `omniroute update --apply` a automatický aktualizátor
      spúšťajú `npm install -g … --include=optional`, aby `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) zostali zachované aj po aktualizácii. Úroveň SLM ultra s `modelPath` tiež vyžaduje
      model tinybert, ktorý sa pri prvom použití automaticky stiahne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) následne umiestni uzáver voliteľných závislostí SLM do
      `dist/node_modules`, aby worker používal JEDINÚ inštanciu `@huggingface/transformers` ^4.2.0
      — samostatné sledovanie zahŕňa iba transformers, nie dynamicky importované
      voliteľné závislosti, takže bez toho by worker načítal llmlingua-2 voči transformers z koreňového adresára
      a úroveň SLM by v prípade chyby bez upozornenia prešla na záložné správanie.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, iba loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vráti stav 401 (trvalo chránená trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vráti stav 401 (ochrana loopback)
- [ ] Runtime SQLite sa pri prvom spustení nastaví na `bundled` (pribalený binárny súbor je platný pre danú platformu)
- [ ] Runtime SQLite prejde na `runtime`, keď je `node_modules/better-sqlite3` odstránený
- [ ] Inteligentný filter MCP skomprimuje skutočný výstup `playwright-mcp browser_snapshot` (zmenšenie o ≥50 %)
- [ ] Všetkých 10 súborov `skills/omniroute*/SKILL.md` je verejne dostupných prostredníctvom priamej URL adresy GitHubu
- [ ] Sprievodca úvodným nastavením pri novom nastavení zobrazí krok prehliadky úrovní „Ako to funguje“
- [ ] Widget pokrytia úrovní na domovskom paneli zobrazuje počty nakonfigurovaných/aktívnych položiek

---

## Vytvorenie 3.9.0 LTS (odskúšané vo verzii 3.8.58)

Po v3.8.59 nasleduje verzia 3.9.0 a jej špička sa stane základom dvoch dlhodobých vetiev:
`stable/v3` (línia v3 LTS, npm `latest`) a `develop` (v4, zvýšená na 4.0.0, npm
`nightly`). Model vetiev/kanálov, forward-port a štítky sú opísané v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plán sa nachádza v dokumente [ROADMAP](../../ROADMAP.md) (fáza 3). Vytvorenie prebehne raz;
vo verzii 3.8.58 sa celý proces od začiatku do konca odskúša na forku a verzia 3.8.59 sa uzavrie pomocou
[kontrolného zoznamu GO/NO-GO](./LTS_GO_NO_GO.md).

### Skúšobný beh (iba na čítanie, kedykoľvek bezpečný)

```bash
npm run release:dry-run-lts-cut                       # skutočné vytvorenie: 3.9.0 z HEAD, predchádzajúci tag v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # pripnutie zdrojového commitu
```

`scripts/release/dry-run-lts-cut.mjs` nič nevykonáva: načíta git a `gh` a vypíše
celú postupnosť — predpoklady (zdroj je možné rozpoznať, predchádzajúci tag existuje, `package.json` má
cieľovú verziu, je otvorený problém `release-freeze`, nie je otvorený žiadny problém `Release branch not green`
pre existujúcu vydávaciu vetvu — neexistujúca vetva hlási `?` neznáme, nikdy nie
zelené — je nakonfigurovaný front Mergify `release` (G11: `queue_rules`, `checks_timeout`,
štítok `queue`), sada pravidiel `release/*` stále blokuje odstránenie a vynútený push a
`stable/v3` ani `develop` zatiaľ neexistujú), dva kroky vytvorenia vetiev, ktoré spúšťače neaktívnych
workflowov a podmienky `if:` sa stanú pravdivými (a ktoré zostanú blokované premennou repozitára alebo
pripnuté ku kanonickému repozitáru), očakávané dist-tagy (`latest` → 3.9.0, `next` a
`nightly` prázdne) a návrat späť. Návratový kód `0` = `RESULT: READY`, `1` = blokujúci predpoklad
zlyhal (`✗`), `2` = chyba použitia. `--advisory <id,...>` zmení kontrolu na upozornenie (`!`)
bez toho, aby ju skryl.

Skúšobný beh skutočného vytvorenia spustite, kým je zmrazenie vydania 3.9.0 stále aktívne — vetvy sa
vytvoria po tagu a predtým, ako fáza 12c zruší zmrazenie.

### Nácvik verzie 3.8.58 (iba na forku)

```bash
# 1. Skúšobný beh na aktuálnej špičke s parametrami nácviku
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Vykonanie voči vzdialenému FORKU (origin alebo akýkoľvek vzdialený repozitár, ktorého URL
#    zodpovedá kanonickému repozitáru, bude odmietnutý; každý krok vyžaduje potvrdenie v termináli)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Vyskúšanie neaktívnych workflowov vo forku (workflow_dispatch tam, kde skúšobný beh
#    hlási pripnutie ku kanonickému repozitáru), potom návrat späť
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit zvýšenia verzie vo vetve develop sa vytvorí pomocou nízkoúrovňových príkazov systému git (pracovný strom sa nemení) a aktualizuje
rovnakých päť súborov ako commit otvorenia cyklu: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` a `docs/openapi.yaml`. Sekcia `[4.0.0]`
v súbore CHANGELOG a jej lokalizované kópie sa následne otvoria vo vetve `develop` pred jej prvým
PR. Skript nikdy nemení dist-tagy npm — odskúšajte ich na pomocnom balíku.

### Artefakt náhľadu PR (zostaviť raz, propagovať tie isté bajty)

`.github/workflows/preview-artifact.yml` zostaví jeden produkčný tarball z hlavičky PR a
overí presne toto zostavenie (časť (a) problému #8084). Iba PR z rovnakého repozitára; nič sa nezverejňuje.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # alebo pridajte štítok `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # inštalácia náhľadu
```

Beh vykoná `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zabalí
tarball, spustí `npm run check:pack-boot` (fiktívne tajomstvá, dočasný dátový adresár), znova ho zabalí a
zlyhá, ak kontrolný súčet nie je identický. Potom zaznamená `artifact-identity.json` (SHA hlavičky, SHA
základu, hash lockfile, platforma, architektúra, ABI Node, bundler, politika zostavenia —
`scripts/release/artifact-identity.mjs`) a v samostatnej úlohe vytvorí atestáciu tarballu. Propagovanie
náhľadu znamená inštaláciu daného tarballu: nikdy ho znova nezostavujte zo zdrojového kódu.

### Vytvorenie (3.9.0, po GO)

1. GO je zaznamenané v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` vypíše `RESULT: READY`.
3. Vetvy v `origin` vytvorte ručne pomocou príkazov, ktoré vypíše skúšobný beh — skript
   odmietne vykonať push do `origin`. Ak chcete znova použiť skontrolovaný commit vetvy develop, najprv spustite
   nácvik s `--execute` na špičke 3.9.0 voči svojmu forku; vypíše oba SHA a
   rovnaké commity možno odoslať:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Pred zlúčením prvého PR ochráňte `stable/v3` a `develop` (sady pravidiel + front zlučovania).
5. Neaktívne workflowy sa zapnú na základe existencie vetvy: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR do `stable/v3`) a `nightly-v4-build.yml`
   (zostavuje `develop`). Pred spustením nastavte tajomstvo repozitára `secrets.FORWARD_PORT_TOKEN` (aby CI bežalo pre
   forward-port PR); nočné zverejňovanie zostane vypnuté, kým vlastník nenastaví premennú repozitára
   `vars.NIGHTLY_PUBLISH` na `true` a npm Trusted Publishing nepovolí
   `nightly-v4-build.yml`. Rozlíšenie kanála zabezpečuje `scripts/release/dist-tag.mjs`, rovnaký
   resolver, aký používa `npm-publish.yml`.
6. Overte kanály: `npm view omniroute dist-tags --json` zobrazí `latest` = 3.9.0 a žiadne
   `next` / `nightly`, kým sa nezverejní v4.
7. Návrat späť, ak je potrebný: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   a `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vrátenie zmien

Ak má vydanie kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí ho ako nie najnovšie)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (iba ak ho používatelia ešte nezačali používať)
3. Alebo: rýchla oprava vo vetve `release/vX.Y.0` → opravné vydanie `vX.Y.(Z+1)`
4. Okamžite o tom informujte v GitHub Discussions a na Discorde

## Prísne pravidlá

- Nikdy nepotvrdzujte zmeny priamo do vetvy `main`
- Nikdy nepoužívajte `git push --force` pre vetvu `main` ani vetvy `release/*`
- Nikdy nevynechávajte kontroly Husky (`--no-verify`)
- Nikdy nepotvrdzujte tajné údaje, prihlasovacie údaje ani súbory `.env`
- Pokrytie musí zostať ≥60/60/60/60 (príkazy/riadky/funkcie/vetvy)
- Pri zmene produkčného kódu v `src/`, `open-sse/`, `electron/` alebo `bin/` vždy pridajte alebo aktualizujte testy

## Automatizovaná kontrola synchronizácie

Pred otvorením PR lokálne spustite kontrolu synchronizácie dokumentácie:

```bash
npm run check:docs-sync
```

CI túto kontrolu spúšťa aj v `.github/workflows/ci.yml` (úloha lint).
