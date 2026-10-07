# Release Checklist (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Posledná aktualizácia:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydávania, ktorý využíva zručnosti Claude Code na automatizáciu.
>
> **Medzi vydaniami udržiavajte front a vetvu v bezchybnom stave:** pozrite si [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + nočné spúšťanie). Pravidelné spúšťanie
> tohto procesu — a najmä **pred** týmto kontrolným zoznamom — zabezpečí, že PR vydania bude od začiatku bez chýb.

## V skratke

```bash
# 1. Zvýšte verziu a vygenerujte CHANGELOG (zručnosť)
/version-bump-cc patch    # alebo minor/major

# 2. Spustite lokálnu kontrolu kvality
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

## Dôveryhodné publikovanie npm (predvolené od v3.8.51) — na požiadanie fázované, s priamym publikovaním ako záložnou možnosťou

`npm-publish.yml` predvolene publikuje prostredníctvom **dôveryhodného publikovania npm (OIDC)**: úloha
`stage-npm` (hosťovaná službou GitHub) vymení token identity služby GitHub za krátkodobé
poverenie npm pre dané spustenie — bez dlhodobo platného tokenu npm v tajných kľúčoch repozitára, bez výzvy na 2FA a s pripojeným dokladom o pôvode.
Ide o obídenie obmedzení, ktoré npm uplatňuje po začatí vyraďovania tokenov preskakujúcich 2FA;
obnovuje sa tým plne automatický proces, ktorý projekt používal až do v3.8.48, pričom sa zachováva
záruka WS1.3 (uniknutý token nedokáže sám publikovať — žiadny token totiž neexistuje).

**Jednorazové nastavenie (vlastník):** npmjs.com → balík `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitár `OmniRoute`, pracovný postup `npm-publish.yml`
(prostredie: žiadne). Kým toto nastavenie neexistuje, automatický krok zlyhá s chybou `ENEEDAUTH`:
spustite ho znova s `publish_mode=staged` (nižšie) alebo `direct`.

### Fázované publikovanie (na požiadanie — `publish_mode=staged`)

Pracovný postup npm-publish už nepublikuje priamo: spustí zabalený tarball
(`check:pack-boot`) a potom vykoná `npm stage publish` — presné bajty sa uložia do
registra, ale **nie je možné ich nainštalovať**, kým ich vlastník neschváli. Ľudská kontrola 2FA sa presunula
ZA overenie, nie pred neho.

**Postup vlastníka po úspešnom dokončení pracovného postupu:**

1. `npm stage list omniroute` — nájdite ID fázy (vypíše sa aj v súhrne pracovného postupu).
2. Overte fázované bajty (odporúčané): `npm stage download <id>`, potom nainštalujte
   stiahnutý tarball do dočasného prefixu a spustite ho (`npm run check:pack-boot` automatizuje
   rovnaké vyhodnotenie zabaliť→nainštalovať→spustiť v CI).
3. `npm stage approve <id>` — výzva na 2FA JE publikovaním. `npm stage reject <id>` obsah zahodí.
4. Ochrana po publikovaní: overovač po publikovaní (WS1.4 plánu v3.8.49) nainštaluje
   publikovanú verziu z verejného registra do čistého kontajnera a spustí ju.

**Núdzová záložná možnosť:** `workflow_dispatch` s `publish_mode=direct` obnoví
pôvodné okamžité `npm publish` (použite iba vtedy, ak samotné fázovanie nefunguje správne; zaznamenajte dôvod).

**Jednorazové zabezpečenie (vlastník, npmjs.com):** nakonfigurujte dôveryhodného vydavateľa pre
`omniroute` v režime výlučne fázovaného publikovania, aby uniknutý dlhodobo platný token nemohol vykonať `npm publish`
priamo odkiaľkoľvek — CI môže iba vytvoriť fázu; publikovať ju môže len vlastník pomocou 2FA.

**Postup pri poškodenom artefakte (bez zmeny):** predvolenou okamžitou reakciou je `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
(trvá niekoľko minút a je vratná); `npm unpublish` používajte iba v rámci 72-hodinového obdobia a pokiaľ neexistujú závislé balíky,
nikdy nie ako prvý krok. Docker: nikdy neprepisujte značku verzie — návrat späť znamená
presmerovanie `latest` na posledný funkčný digest.

**Docker Hub `latest` (povinné pri každom stabilnom vydaní SemVer):** pracovný postup
`docker-publish` musí označiť **oba** obrazy, `X.Y.Z` aj — keď
`should-promote-latest.sh` potvrdí, že ide o najvyššiu stabilnú verziu SemVer — `:latest`,
s **rovnakým digestom**. Po dokončení úlohy: digest `latest` na službe Hub sa musí rovnať digestu novej
verzie SemVer a hodnota `last_updated` sa musí zmeniť. Nenechávajte `:latest` odkazovať na staršiu
zostavu, zatiaľ čo poznámky k vydaniu hovoria o opravách, ktoré existujú iba v gite. Rýchle
úvodné konfigurácie Compose používajú `:latest`; GitOps by mal naďalej pripínať `X.Y.Z`. Pozrite si
[Kanály vydaní Docker](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrýchlená cesta pre hotfixy (štítok `hotfix`)

PR označený štítkom `hotfix` preskočí náročnú maticu CI (9-dielne E2E, sprísňovanie pokrytia,
quality-gate, quality-extended) a zachová rýchle kontroly s vysokou výpovednou hodnotou: zostavenie,
diely jednotkových testov, integračné testy, vitest, lintovanie/kontrolu typov, synchronizáciu dokumentácie, `check:pack-artifact`
a základný test spustenia z tarballu (`check:pack-boot`). Cieľ: úspešný stav do ≤15 min namiesto ~33 min.

**Pravidlá vstupu — vyžadujú sa všetky štyri podmienky (podľa núdzových postupov Chromium/VS Code/Node):**

1. **Závažnosť**: produkcia nefunguje — publikovaný artefakt zlyhá pri spustení /
   bezpečnostná oprava / problém sa týka každého používateľa vydania. „Dôležité“ neznamená „nefunkčné“.
2. **Oprávnenie**: štítok `hotfix` môže pridať iba vlastník repozitára. Tento štítok JE
   schválením — na PR v rámci kampane si ho nikdy nepridávajte sami.
3. **Dôkazy**: telo PR obsahuje odkaz na predchádzajúci plne úspešný náročný beh (súpravu, ktorú
   by preskočené úlohy znova overili) a tiež na test samotnej opravy, ktorý najprv zlyhal a potom prešiel.
4. **Rozsah**: iba cherry-pick — minimálna oprava, žiadne refaktorizácie ani pridružené zmeny.

Preskočená oblasť pokrytia/sprísňovania sa znova overí pri nasledujúcom úplnom behu vo
vetve vydania (priebežne úspešný stav vydania) — táto cesta preskakuje ČAKANIE, nikdy nie validáciu.
Zmeny týkajúce sa iba testov (všetky súbory v `tests/`, žiadny v `tests/e2e/`) preskočia maticu E2E
automaticky, bez akéhokoľvek štítka.

## Podrobný kontrolný zoznam

### Pred vydaním

- [ ] Všetky PR určené pre toto vydanie sú zlúčené do `release/vX.Y.0`
- [ ] Všetky otvorené položky v Linear/problémy pre túto verziu sú uzavreté alebo presunuté do ďalšieho míľnika
- [ ] CI vo vetve `release/vX.Y.0` je úspešné
- [ ] V kóde nie sú žiadne značky `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Základný obraz Dockeru je aktuálny (momentálne `node:24.15.0-trixie-slim`)

### Verzia a denník zmien

- [ ] Spustite `/version-bump-cc <patch|minor|major>` (zručnosť Claude Code)
  - Zvýši verziu v `package.json`, `electron/package.json`
  - Znova vygeneruje `CHANGELOG.md` z commitov git od poslednej značky
  - Aktualizuje odznaky v README.md
- [ ] Manuálne skontrolujte CHANGELOG.md a v prípade potreby upravte správy commitov
- [ ] Uistite sa, že najnovšia sekcia semver v `CHANGELOG.md` zodpovedá verzii v `package.json`
- [ ] Ponechajte `## [Unreleased]` ako prvú sekciu denníka zmien pre nadchádzajúce úpravy
- [ ] Aktualizujte `docs/openapi.yaml` → `info.version` sa musí zhodovať s verziou v `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chýb (upozornenia už existovali)
- [ ] `npm run typecheck:core` — bez problémov
- [ ] `npm run typecheck:noimplicit:core` — bez problémov (striktné)
- [ ] `npm run check:cycles` — žiadne cyklické závislosti
- [ ] `npm run check:any-budget:t11` — v rámci limitu
- [ ] `npm run check:route-validation:t06` — bez problémov
- [ ] `npm run check:node-runtime` — splnená minimálna podporovaná verzia behového prostredia (`>=22.22.2 <23`, `>=24.0.0 <27`, podľa `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; zosúladené s `engines` v `package.json`)

### Testovanie

- [ ] `npm run test:unit` — úspešné
- [ ] `npm run test:vitest` — úspešné (server MCP, autoCombo, vyrovnávacia pamäť)
- [ ] `npm run test:coverage` — limit 60/60/60/60 splnený (príkazy/riadky/funkcie/vetvy)
- [ ] `npm run test:integration` — úspešné (ak sa zmeny týkajú DB / obslužných rutín)
- [ ] `npm run test:combo:matrix` — úspešné (matica kombinovaných stratégií: deterministicky overuje rozhodnutia výberu všetkých 19 verejných stratégií smerovania; spustite pri úpravách kombinovaného smerovania, rozlišovania stratégií alebo záložnej logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **voliteľné/manuálne** (základný test voči skutočným upstreamom chránený podmienkou; načíta snímku DB iba na čítanie z VPS `root@192.168.0.15`; používa skutočných poskytovateľov, spotrebúva kredity; nikdy sa nespúšťa v CI; bez splnenia podmienky sa korektne preskočí)
- [ ] `npm run test:combo:live:vps` — **voliteľné/manuálne** (živý základný test VPS fázy 3: 7 scenárov HTTP voči živému serveru `.15` prostredníctvom čistého Node ESM; vyžaduje `ssh root@192.168.0.15`; vytvára/odstraňuje iba kombinácie `__live_test__*`; používa skutočných poskytovateľov; nikdy sa nespúšťa v CI)
- [ ] `npm run test:e2e` — úspešné (zmeny používateľského rozhrania)
- [ ] `npm run test:protocols:e2e` — úspešné (zmeny MCP/A2A)
- [ ] `npm run test:ecosystem` — úspešné

### Hooky (overené pomocou Husky)

Hooky Husky sa nachádzajú v `.husky/` a spúšťajú sa automaticky pri operáciách git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** rýchle deterministické kontroly — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivované 2026-06-13). Zámerne nezahŕňa `test:unit` (pomalé; zabezpečuje ho úloha CI `test-unit`).
  - Pred odoslaním vetiev vydania manuálne spustite `npm run test:unit`.

Ak hook zlyhá: opravte základný problém, neobchádzajte ho pomocou `--no-verify`.

### Konvenčné commity

Všetky commity určené pre vydanie musia dodržiavať formát `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Nekompatibilné zmeny: pridajte pätu `BREAKING CHANGE:` alebo `!` za rozsah (napr. `feat(api)!: drop /v0`).

### Dokumentácia

- [ ] `npm run check:docs-sync` prejde úspešne (automaticky sa spúšťa cez pre-commit)
- [ ] `npm run check:docs-all` prejde úspešne (zastrešuje: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` skončí s kódom 0 — kontrakt premenných prostredia medzi kódom ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je zachovaný
- [ ] `npm run check:doc-links` skončí s kódom 0 — po reštrukturalizácii neexistujú žiadne nefunkčné interné odkazy Markdown
- [ ] Súbor `docs/architecture/ARCHITECTURE.md` bol skontrolovaný z hľadiska odchýlok v úložisku a behovom prostredí
- [ ] Súbor `docs/guides/TROUBLESHOOTING.md` bol skontrolovaný z hľadiska odchýlok premenných prostredia a prevádzky
- [ ] Ak sa zmenil `.env.example`: bol aktualizovaný súbor `docs/reference/ENVIRONMENT.md`
- [ ] Ak má nová funkcia používateľské rozhranie: je uvedená v `docs/guides/USER_GUIDE.md`
- [ ] Ak má nová funkcia API: boli aktualizované `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Ak je nová funkcia modulom: existuje samostatný súbor `docs/<MODULE>.md`
- [ ] Ak ide o nekompatibilnú zmenu: `docs/guides/TROUBLESHOOTING.md` obsahuje poznámku k migrácii

### i18n

- [ ] `npm run i18n:check` skončí s kódom 0 — stav prekladov (`.i18n-state.json`) je synchronizovaný so zdrojovou dokumentáciou (v striktnom režime nie sú žiadne zdroje s odchýlkami; upozornenie v režime varovania je prijateľné pri úpravách dokumentácie na poslednú chvíľu, ale pred označením verzie by mal byť výsledok 0)
- [ ] `npm run i18n:check-ui-coverage` skončí s kódom 0 — každý jazyk používateľského rozhrania dosahuje minimálne 80 % pokrytie
- [ ] `npm run i18n:sync-ui:dry` hlási 0 chýbajúcich kľúčov vo všetkých 42 jazykoch
- [ ] Ak sa zmenila zdrojová dokumentácia v angličtine, pred označením verzie spustite `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Menšie príspevky k prekladom možno odložiť do ďalšieho vydania (zaznamenajte ich v CHANGELOG)

### Migrácie databázy

- [ ] Ak adresár `src/lib/db/migrations/` obsahuje nové súbory:
  - [ ] Každá migrácia je idempotentná (`CREATE TABLE IF NOT EXISTS` atď.)
  - [ ] Migrácie sú zahrnuté v transakciách
  - [ ] Sú správne očíslované (bez medzier v poradí)
- [ ] Test pri čistej inštalácii: odstráňte `~/.omniroute/omniroute.db` a spustite `npm run dev`
- [ ] Test pri existujúcej inštalácii: zálohujte databázu, spustite migráciu a overte schému
- [ ] So súbormi WAL (`-wal`, `-shm`) sa pri migrácii prepisujúcej tabuľky zaobchádza správne

### Katalóg poskytovateľov (overovaný pomocou Zod)

- [ ] Schéma Zod v `src/shared/constants/providers.ts` je platná pri načítaní
  - [ ] Všetci poskytovatelia majú povinné polia (`id`, `label`, `kind` atď.)
  - [ ] Pre nových bezplatných poskytovateľov je zadané `freeNote`
  - [ ] Poskytovatelia OAuth majú `oauthConfig` zaregistrovanú v `src/lib/oauth/constants/oauth.ts`
- [ ] Ak bol pridaný nový poskytovateľ: zodpovedajúci vykonávací modul sa nachádza v `open-sse/executors/`
- [ ] Ak používa iný formát než OpenAI: prekladač sa nachádza v `open-sse/translator/`
- [ ] Modely sú zaregistrované v `open-sse/config/providerRegistry.ts`
- [ ] Jednotkové testy v `tests/unit/` pokrývajú klasifikáciu poskytovateľov a smerovanie

### Desktopová aplikácia (Electron)

Ak sa zmenil adresár `electron/`:

- [ ] `npm run electron:smoke:packaged` prejde úspešne
- [ ] Zostavenia boli otestované aspoň pre jednu z možností `:win`, `:mac`, `:linux`
- [ ] Certifikáty na podpisovanie kódu nie sú exspirované (ak sa používa podpisovanie)
- [ ] Verzia v `electron/package.json` sa zhoduje s koreňovým súborom `package.json`
- [ ] Ukazovateľ kanála automatických aktualizácií bol pri vydávaní do kanála `stable` aktualizovaný

### Rozloženie zostavenia

Repozitár používa tri samostatné výstupné adresáre — nikdy ich navzájom nezamieňajte:

| Adresár   | Účel                                                            | Sledovaný?       |
| --------- | --------------------------------------------------------------- | ---------------- |
| `src/`    | Zdrojový kód aplikácie (TypeScript / TSX)                       | Áno              |
| `.build/` | Medzivýstupy zostavenia — výstup `next build` (`distDir`)       | Nie (gitignored) |
| `dist/`   | Distribuovateľný balík npm — zostavený cez `assembleStandalone` | Nie (gitignored) |

> **Poznámka pre operátora:** vzdialený adresár obrazu VPS zostáva `/usr/lib/node_modules/omniroute/app/`.
> Presunul sa iba výstup zostavenia **v repozitári** (`app/` → `dist/`). Nástroje na nasadenie synchronizujú
> obsah `dist/` pomocou rsync do vzdialeného adresára `app/` — nie sú potrebné žiadne zmeny ciest na VPS.

**Postup jedného zostavenia:**

```
npm run build:release
  └─ rm -rf .build dist          (vyčistenie)
  └─ next build → .build/next/   (medzivýstupy)
  └─ assembleStandalone          (skopíruje samostatné zostavenie + statické súbory + verejné súbory + natívne moduly → dist/)
  └─ writes dist/BUILD_SHA       (kontrolná hodnota HEAD)
```

Pri nasadzovaní NEspúšťajte `npm run build` a následne samostatne `npm run build:cli` — použite
`npm run build:release`, ktorý vykoná čisté opätovné zostavenie + vytvorenie kontrolnej hodnoty jediným príkazom.

### Overenie artefaktu

- [ ] `npm run build:release` prebehne úspešne a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` prejde bez nálezov — neobsahuje `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani iné lokálne pozostatky
- [ ] Po zostavení existuje `dist/server.js`

### Označenie verzie a vydanie

- [ ] Spustite `/generate-release-cc` (nástroj Claude Code):
  - Vytvorí značku `vX.Y.Z`
  - Odošle značku a vetvu
  - Vytvorí vydanie GitHub s obsahom zoznamu zmien
  - Pripojí inštalátory Electron (ak boli zostavené)
- [ ] Alebo manuálne:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasadenie

Nástroje na nasadenie používajú odľahčený postup rsync — bez `npm pack` a bez `npm i -g`:

- [ ] Použite nástroj na nasadenie zodpovedajúci cieľu:
  - `/deploy-vps-local-cc` — lokálny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Pred nasadením potvrďte, že `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Zostavenie sa musí spustiť tam, kde je `node_modules` skutočný adresár (hlavná pracovná kópia alebo worktree pripravený pomocou `npm ci` — NIE worktree so symbolickým odkazom)
- [ ] Vykonajte základný test nasadenej inštancie:
  - Otvorte `/dashboard/health` → skontrolujte, či reťazec verzie zodpovedá vydaniu
  - Spustite požiadavku `/v1/chat/completions` voči známemu poskytovateľovi
  - Overte, že `/api/monitoring/health` vracia ističe v stave `CLOSED`
  - Potvrďte, že transporty MCP odpovedajú (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydaní

- [ ] Spustite `/capture-release-evidences-cc` (skill Claude Code)
  - Zachytí snímky obrazovky/nahrávky nových funkcií vo formáte WebP
  - Pripojí ich k poznámkam k vydaniu / blogovému príspevku
- [ ] Aktualizujte GitHub Discussions / Discord oznámením o vydaní
- [ ] Otvorte míľnik pre ďalšiu verziu
- [ ] Ak je to kritické: pripnite diskusiu alebo uverejnite príspevok v `news.json` pre banner v aplikácii

### Kontrolná brána verejného spustenia Radaru

Oznámenie Radaru je zámerne commitnuté s `active: false`. Aktivácia predstavuje samostatnú
zmenu po zdokumentovaní všetkých položiek uvedených nižšie:

- [ ] Všetky nadväzujúce Radar PR sú zlúčené a CI pre špičku vydania je úspešné
- [ ] Nasaďte a vykonajte základnú kontrolu OSS trás Radaru, pričom `RADAR_ENABLED` zostane predvolene vypnuté
- [ ] Vykonajte základnú kontrolu `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na určenom hostiteľovi Radaru
- [ ] Zaznamenajte identitu/kontakt/adresu prevádzkovateľa a vlastníkom schválenú právnu kontrolu v súkromnej službe
- [ ] Otestujte Stripe Checkout a podpísaný webhook výhradne v testovacom režime
- [ ] Otestujte jedno šifrované doručenie transakčného e-mailu so schváleným odosielateľom/doménou
- [ ] Preukážte obnovenie zo zálohy a jedno kontrolované spustenie výskumu s rozpočtovým limitom
- [ ] Pred prijatím dokladu o dare schváľte zásady kontroly BRL/PIX
- [ ] Verejný Checkout povoľte až po splnení predchádzajúcich brán a potom aktivujte nové ID v `news.json`
- [ ] Overte, že banner na domovskej stránke používa lokalizovaný text a že nové ID sa znova zobrazí po zavretí staršieho ID

## Rýchly test vstavaných služieb (v3.8.4+)

Pred vydaním akejkoľvek verzie, ktorá zahŕňa zmeny vstavaných služieb, overte:

### Spustenie s novou DB (odhaľuje kolízie migrácií — pridané po rýchlej oprave v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkajte 10 s na spustenie
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vráti `"9router"` (NIE 404, NIE 500). Potvrdzuje, že migrácia `071_services.sql` bola použitá a riadok bol vložený.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vráti 3 riadky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vráti 2 riadky (potvrdzuje použitie migrácie `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` prejde úspešne — chráni pred budúcimi kolíziami.

### 9Router

- [ ] `POST /api/services/9router/install` vráti do 2 minút stav 200 s hodnotou `installedVersion`
- [ ] `POST /api/services/9router/start` vráti do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlási `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vráti stav 200 (smerovanie typu end-to-end cez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí natívne používateľské rozhranie 9Router v rámci proxy (bez priameho prvku iframe s adresou `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vráti `{ keyRotated: true }` a služba sa bez problémov reštartuje
- [ ] `POST /api/services/9router/stop` vráti stav 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vráti prúd SSE s udalosťou `snapshot` obsahujúcou najnovšie riadky
- [ ] Inštalácia v prostredí bez `npm` v PATH vráti stav 500 so zrozumiteľným chybovým hlásením (bez výpisu zásobníka)

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

Pred vydaním akejkoľvek verzie v3.8.x overte tieto dodatočné položky:

- [ ] `omniroute --tray` sa spustí v systéme macOS (systray2 je nainštalovaný v `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` sa spustí v systéme Linux (vyžaduje DISPLAY; ak nie je nastavená, zobrazí zrozumiteľnú chybu)
- [ ] `omniroute --tray` sa spustí v systéme Windows (PowerShell NotifyIcon, bez ďalších binárnych súborov)
- [ ] `omniroute config tray enable` vytvorí položku automatického spustenia; jej zakázanie ju odstráni
- [ ] `npm install -g omniroute@<this-version>` vykoná postinstall bez fatálneho ukončenia
- [ ] Proces aktualizácie zachová voliteľné závislosti: `omniroute update --apply` aj nástroj automatickej aktualizácie
      spustia `npm install -g … --include=optional`, aby `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) prežili aktualizáciu. Úroveň SLM ultra s `modelPath` vyžaduje aj model
      tinybert, ktorý sa pri prvom použití automaticky stiahne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) potom umiestni voliteľný uzáver SLM spoločne do
      `dist/node_modules`, aby worker používal JEDINÚ inštanciu `@huggingface/transformers` ^4.2.0
      — samostatné trasovanie zahŕňa iba transformers, nie dynamicky importované
      voliteľné závislosti, takže bez toho by worker načítal llmlingua-2 voči transformers z koreňového adresára
      a úroveň SLM by potichu prešla do režimu fail-open.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, iba loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vráti stav 401 (vždy chránená trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vráti stav 401 (ochrana loopback)
- [ ] Runtime SQLite sa pri prvom spustení nastaví na `bundled` (pribalený binárny súbor je platný pre danú platformu)
- [ ] Runtime SQLite prejde na `runtime`, keď sa odstráni `node_modules/better-sqlite3`
- [ ] Inteligentný filter MCP komprimuje skutočný výstup `playwright-mcp browser_snapshot` (zmenšenie o ≥50 %)
- [ ] Všetkých 10 súborov `skills/omniroute*/SKILL.md` je verejne dostupných prostredníctvom nespracovanej URL adresy GitHubu
- [ ] Sprievodca úvodným nastavením pri novom nastavení zobrazí krok prehliadky úrovní „Ako to funguje“
- [ ] Widget pokrytia úrovní na domovskom paneli zobrazuje počty nakonfigurovaných/aktívnych položiek

---

## Vrátenie zmien

Ak má vydanie kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí ho ako nie najnovšie)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (iba ak ho používatelia ešte nezačali používať)
3. Alebo: rýchla oprava vo vetve `release/vX.Y.0` → opravné vydanie `vX.Y.(Z+1)`
4. Okamžite informujte používateľov v GitHub Discussions a na Discorde

## Prísne pravidlá

- Nikdy nevytvárajte commity priamo vo vetve `main`
- Nikdy nepoužívajte `git push --force` pre vetvu `main` ani vetvy `release/*`
- Nikdy nepreskakujte hooky Husky (`--no-verify`)
- Nikdy nevkladajte do commitov tajné údaje, prihlasovacie údaje ani súbory `.env`
- Pokrytie musí zostať ≥60/60/60/60 (príkazy/riadky/funkcie/vetvy)
- Pri zmene produkčného kódu v `src/`, `open-sse/`, `electron/` alebo `bin/` vždy pridajte alebo aktualizujte testy

## Automatizovaná kontrola synchronizácie

Pred otvorením PR lokálne spustite kontrolu synchronizácie dokumentácie:

```bash
npm run check:docs-sync
```

CI túto kontrolu spúšťa aj v `.github/workflows/ci.yml` (úloha lint).
