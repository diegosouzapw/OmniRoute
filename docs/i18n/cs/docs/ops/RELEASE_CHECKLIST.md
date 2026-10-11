# Release Checklist (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Poslední aktualizace:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydávání, který k automatizaci využívá dovednosti Claude Code.
>
> **Udržujte frontu/větev mezi vydáními v zeleném stavu:** viz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + noční běh). Pravidelné
> spouštění — a zejména **před** tímto kontrolním seznamem — zajistí, že PR vydání začne v zeleném stavu.

## Stručně

```bash
# 1. Zvyšte verzi + vygenerujte CHANGELOG (dovednost)
/version-bump-cc patch    # nebo minor/major

# 2. Spusťte místní kontrolu kvality
npm run check              # lint + testy
npm run test:coverage      # úplná kontrola pokrytí (60/60/60/60)

# 3. Sestavte a proveďte základní test
npm run build
npm run test:e2e           # volitelné, ale doporučené

# 4. Vygenerujte vydání (dovednost)
/generate-release-cc

# 5. Nasaďte (dovednost)
/deploy-vps-both-cc        # nebo akamai-cc / local-cc

# 6. Zachyťte důkazy o vydání (dovednost)
/capture-release-evidences-cc
```

## Důvěryhodné publikování npm (výchozí od v3.8.51) — na vyžádání fázované, jako záložní možnost přímé

`npm-publish.yml` ve výchozím nastavení publikuje prostřednictvím **npm Trusted Publishing (OIDC)**:
úloha `stage-npm` (hostovaná na GitHubu) vymění id-token GitHubu za krátkodobé
přihlašovací údaje npm pro daný běh — bez dlouhodobého tokenu npm v tajných údajích repozitáře,
bez výzvy k 2FA a s připojeným dokladem původu.
Jde o mechanismus, který npm nyní schvaluje namísto rušených tokenů obcházejících 2FA;
obnovuje plně automatický proces, který projekt používal až do v3.8.48, a současně zachovává
záruku WS1.3 (uniklý token sám o sobě nemůže publikovat — žádný token neexistuje).

**Jednorázové nastavení (vlastník):** npmjs.com → balíček `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitář `OmniRoute`, pracovní postup `npm-publish.yml`
(prostředí: none). Dokud toto nastavení neexistuje, automatický krok selže s `ENEEDAUTH`:
spusťte jej znovu s `publish_mode=staged` (níže) nebo `direct`.

### Fázované publikování (na vyžádání — `publish_mode=staged`)

Pracovní postup npm-publish již nepublikuje přímo: spustí zabalený tarball
(`check:pack-boot`) a poté provede `npm stage publish` — přesné bajty jsou uloženy
v registru, ale **nelze je nainstalovat**, dokud je vlastník neschválí. Lidská kontrola 2FA
se přesunula až ZA ověření, nikoli před něj.

**Postup vlastníka poté, co pracovní postup přejde do zeleného stavu:**

1. `npm stage list omniroute` — vyhledejte ID fáze (je také uvedeno v souhrnu pracovního postupu).
2. Ověřte fázované bajty (doporučeno): `npm stage download <id>`, poté nainstalujte
   stažený tarball do dočasného prefixu a spusťte jej (`npm run check:pack-boot` automatizuje
   stejný verdikt zabalení→instalace→spuštění v CI).
3. `npm stage approve <id>` — výzva k 2FA JE samotným publikováním. `npm stage reject <id>` obsah zahodí.
4. Pojistka po publikování: ověřovací proces po publikování (WS1.4 plánu v3.8.49) nainstaluje
   publikovanou verzi z veřejného registru v čistém kontejneru a spustí ji.

**Nouzová záložní možnost:** `workflow_dispatch` s `publish_mode=direct` obnoví
původní okamžité `npm publish` (použijte pouze v případě, že samotné fázování nefunguje správně;
zaznamenejte důvod).

**Jednorázové zabezpečení (vlastník, npmjs.com):** nakonfigurujte Trusted Publisher pro
`omniroute` v režimu pouze fázovaného publikování, aby uniklý dlouhodobý token nemohl provést
`npm publish` přímo odkudkoli — CI může pouze připravit fázi; vydání může provést pouze vlastník
pomocí 2FA.

**Postup při poškozeném artefaktu (beze změny):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako výchozí reakce (trvá minuty, je vratná); `npm unpublish` pouze v rámci 72hodinového okna
bez závislých balíčků a nikdy ne jako první krok. Docker: nikdy nepřepisujte značku verze —
návrat zpět znamená přesměrování `latest` na poslední funkční digest.

**Docker Hub `latest` (povinné při každém publikování stabilní verze SemVer):**
pracovní postup `docker-publish` musí označit **jak** `X.Y.Z`, **tak**, pokud
`should-promote-latest.sh` potvrdí, že jde o nejvyšší stabilní SemVer, také `:latest`
se **stejným digestem**. Po dokončení úlohy: digest `latest` na Hubu se rovná digestu nové
verze SemVer a `last_updated` se změnil. Nenechávejte `:latest` odkazovat na starší
sestavení, zatímco poznámky k vydání popisují opravy, které existují pouze v gitu. Rychlé
úvodní konfigurace Compose používají `:latest`; GitOps by měl nadále připínat `X.Y.Z`. Viz
[Kanály vydání Dockeru](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrychlený režim pro opravy (štítek `hotfix`)

PR označený štítkem `hotfix` přeskočí náročnou matici CI (E2E s 9 shardy, kontrolu navyšování pokrytí,
quality-gate, quality-extended) a ponechá rychlé kontroly s vysokou vypovídací hodnotou: sestavení,
shardy jednotkových testů, integrační testy, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
a základní test spuštění z tarballu (`check:pack-boot`). Cíl: zelený výsledek do ≤15 min namísto ~33 min.

**Podmínky použití — všechny čtyři jsou povinné (podle nouzových režimů Chromium/VS Code/Node):**

1. **Závažnost**: produkce je nefunkční — publikovaný artefakt při spuštění selhává /
   bezpečnostní oprava / problém se týká každého uživatele daného vydání. „Důležité“ neznamená „nefunkční“.
2. **Oprávnění**: štítek `hotfix` přidává pouze vlastník repozitáře. Štítek JE
   schválením — nikdy jej nepřidávejte sami u PR v rámci kampaně.
3. **Důkazy**: tělo PR odkazuje na předchozí plně zelený náročný běh (sadu, kterou
   by přeskočené úlohy znovu ověřily) a také na vlastní test opravy, který nejprve selže a poté projde.
4. **Rozsah**: pouze cherry-pick — minimální oprava, žádné refaktorizace ani přidružené změny.

Přeskočené kontroly pokrytí/navyšování jsou znovu ověřeny následujícím úplným během ve
větvi vydání (průběžně zelené vydání) — tento režim přeskočí ČEKÁNÍ, nikdy ne validaci.
Změny pouze v testech (všechny soubory pod `tests/`, žádné pod `tests/e2e/`) přeskočí matici E2E
automaticky, bez jakéhokoli štítku.

## Podrobný kontrolní seznam

### Před vydáním

- [ ] Všechny PR určené pro toto vydání jsou sloučeny do `release/vX.Y.0`
- [ ] Všechny otevřené položky v Linear / issues pro tuto verzi jsou uzavřeny nebo přesunuty do dalšího milníku
- [ ] CI je ve větvi `release/vX.Y.0` zelené
- [ ] V kódu nejsou žádné značky `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Základní image Dockeru je aktuální (momentálně `node:24.15.0-trixie-slim`)

### Verze a přehled změn

- [ ] Spusťte `/version-bump-cc <patch|minor|major>` (dovednost Claude Code)
  - Navýší verzi v `package.json`, `electron/package.json`
  - Znovu vygeneruje `CHANGELOG.md` z commitů gitu od posledního tagu
  - Aktualizuje odznaky v README.md
- [ ] Ručně zkontrolujte CHANGELOG.md a v případě potřeby upravte zprávy commitů
- [ ] Ověřte, že nejnovější sekce semver v `CHANGELOG.md` odpovídá verzi v `package.json`
- [ ] Zachovejte `## [Unreleased]` jako první sekci přehledu změn pro nadcházející práci
- [ ] Aktualizujte `docs/openapi.yaml` → `info.version` musí odpovídat verzi v `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chyb (varování již existovala)
- [ ] `npm run typecheck:core` — bez chyb
- [ ] `npm run typecheck:noimplicit:core` — bez chyb (striktní)
- [ ] `npm run check:cycles` — žádné kruhové závislosti
- [ ] `npm run check:any-budget:t11` — v rámci limitu
- [ ] `npm run check:route-validation:t06` — bez chyb
- [ ] `npm run check:node-runtime` — splněna minimální podporovaná verze běhového prostředí (`>=22.22.2 <23`, `>=24.0.0 <27`, podle `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; v souladu s `engines` v `package.json`)

### Testování

- [ ] `npm run test:unit` — projde
- [ ] `npm run test:vitest` — projde (server MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — splněna hranice 60/60/60/60 (příkazy/řádky/funkce/větve)
- [ ] `npm run test:integration` — projde (pokud se změny týkají DB / obslužných rutin)
- [ ] `npm run test:combo:matrix` — projde (matice kombinovaných strategií: deterministicky ověřuje rozhodnutí o výběru všech 19 veřejných strategií směrování; spusťte při změnách kombinovaného směrování, řešení strategií nebo záložní logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **volitelné/ruční** (základní test vůči skutečným upstreamům chráněný podmínkou; načítá snapshot DB pouze pro čtení z VPS `root@192.168.0.15`; používá skutečné poskytovatele, spotřebovává kredity; nikdy se nespouští v CI; bez splnění podmínky se korektně přeskočí)
- [ ] `npm run test:combo:live:vps` — **volitelné/ruční** (živý základní test VPS fáze 3: 7 scénářů HTTP proti živému serveru `.15` prostřednictvím čistého Node ESM; vyžaduje `ssh root@192.168.0.15`; vytváří/odstraňuje pouze kombinace `__live_test__*`; používá skutečné poskytovatele; nikdy se nespouští v CI)
- [ ] `npm run test:e2e` — projde (změny uživatelského rozhraní)
- [ ] `npm run test:protocols:e2e` — projde (změny MCP/A2A)
- [ ] `npm run test:ecosystem` — projde

### Hooky (ověřené pomocí Husky)

Hooky Husky jsou umístěny v `.husky/` a spouštějí se automaticky při operacích gitu.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** rychlé deterministické kontroly — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivováno 2026-06-13). Záměrně nezahrnuje `test:unit` (pomalé; pokryté úlohou CI `test-unit`).
  - Před odesláním větví vydání spusťte `npm run test:unit` ručně.

Pokud hook selže: opravte příčinu problému, neobcházejte jej pomocí `--no-verify`.

### Conventional Commits

Všechny commity určené pro vydání musí dodržovat formát `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Zpětně nekompatibilní změny: přidejte zápatí `BREAKING CHANGE:` nebo `!` za rozsah (např. `feat(api)!: drop /v0`).

### Dokumentace

- [ ] `npm run check:docs-sync` projde (automaticky spouštěno hookem pre-commit)
- [ ] `npm run check:docs-all` projde (souhrnná kontrola: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` skončí s kódem 0 — kontrakt proměnných prostředí mezi kódem ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je zachován
- [ ] `npm run check:doc-links` skončí s kódem 0 — po restrukturalizaci nejsou žádné nefunkční interní odkazy v Markdownu
- [ ] Soubor `docs/architecture/ARCHITECTURE.md` byl zkontrolován kvůli nesrovnalostem v úložišti a běhovém prostředí
- [ ] Soubor `docs/guides/TROUBLESHOOTING.md` byl zkontrolován kvůli nesrovnalostem v proměnných prostředí a provozních postupech
- [ ] Pokud se změnil `.env.example`: aktualizovat `docs/reference/ENVIRONMENT.md`
- [ ] Pokud má nová funkce uživatelské rozhraní: zmínit ji v `docs/guides/USER_GUIDE.md`
- [ ] Pokud má nová funkce API: aktualizovat `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Pokud je nová funkce modulem: musí existovat samostatný soubor `docs/<MODULE>.md`
- [ ] Pokud jde o nekompatibilní změnu: přidat pokyny k migraci do `docs/guides/TROUBLESHOOTING.md`

### i18n

- [ ] `npm run i18n:check` skončí s kódem 0 — stav překladů (`.i18n-state.json`) je synchronizován se zdrojovou dokumentací (v přísném režimu žádné zdroje s nesrovnalostmi; upozornění v režimu varování je přijatelné pro úpravy dokumentace na poslední chvíli, ale před vytvořením tagu by měl být výsledek 0)
- [ ] `npm run i18n:check-ui-coverage` skončí s kódem 0 — každá lokalizace uživatelského rozhraní dosahuje alespoň minimálního pokrytí 80 %
- [ ] `npm run i18n:sync-ui:dry` nahlásí 0 chybějících klíčů ve všech 42 lokalizacích
- [ ] Pokud se změnila zdrojová dokumentace v angličtině, spusťte před vytvořením tagu `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Příspěvky k překladům lze v případě drobných změn odložit na další vydání (evidujte v CHANGELOG)

### Migrace databáze

- [ ] Pokud `src/lib/db/migrations/` obsahuje nové soubory:
  - [ ] Každá migrace je idempotentní (`CREATE TABLE IF NOT EXISTS` atd.)
  - [ ] Migrace jsou obaleny transakcemi
  - [ ] Jsou správně očíslované (bez mezer v posloupnosti)
- [ ] Otestovat na čisté instalaci: odstranit `~/.omniroute/omniroute.db` a spustit `npm run dev`
- [ ] Otestovat na existující instalaci: zazálohovat databázi, spustit migraci a ověřit schéma
- [ ] Pokud migrace přepisuje tabulky, musí být soubory WAL (`-wal`, `-shm`) zpracovány správně

### Katalog poskytovatelů (validovaný pomocí Zod)

- [ ] Schéma Zod v `src/shared/constants/providers.ts` je při načtení platné
  - [ ] Všichni poskytovatelé mají povinná pole (`id`, `label`, `kind` atd.)
  - [ ] Pro nové bezplatné poskytovatele je uvedeno `freeNote`
  - [ ] Poskytovatelé OAuth mají `oauthConfig` zaregistrovaný v `src/lib/oauth/constants/oauth.ts`
- [ ] Pokud byl přidán nový poskytovatel: odpovídající executor v `open-sse/executors/`
- [ ] Pokud nejde o formát OpenAI: překladač v `open-sse/translator/`
- [ ] Modely jsou zaregistrovány v `open-sse/config/providerRegistry.ts`
- [ ] Jednotkové testy v `tests/unit/` pokrývají klasifikaci poskytovatelů a směrování

### Desktopová aplikace (Electron)

Pokud se změnil `electron/`:

- [ ] `npm run electron:smoke:packaged` projde
- [ ] Sestavení byla otestována alespoň pro jednu z platforem `:win`, `:mac`, `:linux`
- [ ] Certifikáty pro podepisování kódu nejsou prošlé (pokud se podepisuje)
- [ ] Verze v `electron/package.json` odpovídá kořenovému `package.json`
- [ ] Pokud se vydává do kanálu `stable`, byl aktualizován ukazatel kanálu automatických aktualizací

### Rozvržení sestavení

Repozitář používá tři různé výstupní adresáře — nikdy je nezaměňujte:

| Adresář   | Účel                                                                 | Sledován?        |
| --------- | -------------------------------------------------------------------- | ---------------- |
| `src/`    | Zdrojový kód aplikace (TypeScript / TSX)                             | Ano              |
| `.build/` | Meziprodukty sestavení — výstup `next build` (`distDir`)             | Ne (v gitignore) |
| `dist/`   | Distribuovatelný balíček npm — sestavený pomocí `assembleStandalone` | Ne (v gitignore) |

> **Poznámka pro operátora:** adresář obrazu na vzdáleném VPS zůstává `/usr/lib/node_modules/omniroute/app/`.
> Přesunul se pouze výstup sestavení **v repozitáři** (`app/` → `dist/`). Nástroje pro nasazení synchronizují pomocí rsync
> obsah `dist/` do vzdáleného adresáře `app/` — nejsou vyžadovány žádné změny cest na VPS.

**Postup jediného sestavení:**

```
npm run build:release
  └─ rm -rf .build dist          (vyčištění)
  └─ next build → .build/next/   (meziprodukty)
  └─ assembleStandalone          (zkopíruje samostatné sestavení + statické soubory + veřejné soubory + nativní soubory → dist/)
  └─ zapíše dist/BUILD_SHA       (kontrolní značka HEAD)
```

Pro nasazení NEPOUŠTĚJTE `npm run build` následovaný samostatným `npm run build:cli` — použijte
`npm run build:release`, který provede čisté opětovné sestavení a vytvoří kontrolní značku jediným příkazem.

### Ověření artefaktu

- [ ] `npm run build:release` proběhne úspěšně a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` proběhne bez nálezů — žádné `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani jiné lokální pozůstatky
- [ ] Po sestavení existuje `dist/server.js`
- [ ] Volitelný lokální test zabaleného běhového prostředí: `npm run dev:candidate -- validate` po `npm run dev:candidate -- build` spustí zabalený tarball s izolovaným `DATA_DIR` a zkontroluje `/api/health` + `/v1/models` (viz [Doporučený postup přispívání](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Vytvoření tagu a vydání

- [ ] Spustit `/generate-release-cc` (nástroj Claude Code):
  - Vytvoří tag `vX.Y.Z`
  - Odešle tag a větev
  - Vytvoří vydání na GitHubu s obsahem seznamu změn
  - Připojí instalační soubory Electronu (pokud byly sestaveny)
- [ ] Nebo ručně:
  ```bash
  git tag -a vX.Y.Z -m "Vydání vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasazení

Nástroje pro nasazení používají odlehčený postup s rsync — bez `npm pack`, bez `npm i -g`:

- [ ] Použijte dovednost pro nasazení odpovídající cíli:
  - `/deploy-vps-local-cc` — místní VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — obě
- [ ] Před nasazením ověřte, že `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Sestavení musí proběhnout tam, kde je `node_modules` skutečný adresář (hlavní pracovní kopie nebo worktree, ve kterém bylo spuštěno `npm ci` — NE worktree se symbolickým odkazem)
- [ ] Proveďte základní test nasazené instance:
  - Otevřete `/dashboard/health` → zkontrolujte, zda řetězec verze odpovídá vydání
  - Spusťte požadavek `/v1/chat/completions` vůči známému poskytovateli
  - Ověřte, že `/api/monitoring/health` vrací jističe ve stavu `CLOSED`
  - Potvrďte, že transporty MCP odpovídají (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydání

- [ ] Spusťte `/capture-release-evidences-cc` (dovednost Claude Code)
  - Pořídí snímky obrazovky / záznamy nových funkcí ve formátu WebP
  - Připojí je k poznámkám k vydání / příspěvku na blogu
- [ ] Aktualizujte GitHub Discussions / Discord oznámením o vydání
- [ ] Otevřete milník pro další verzi
- [ ] Pokud je vydání kritické: připněte diskusi nebo zveřejněte záznam v `news.json` pro banner v aplikaci

### Podmínky veřejného spuštění Radaru

Oznámení Radaru je záměrně commitnuto s `active: false`. Aktivace je samostatná
změna provedená až poté, co bude doloženo splnění všech níže uvedených bodů:

- [ ] Všechny navazující PR pro Radar jsou sloučeny a CI pro špičku vydání je úspěšné
- [ ] Nasaďte a proveďte základní test OSS tras Radaru, přičemž `RADAR_ENABLED` zůstane ve výchozím nastavení vypnuté
- [ ] Proveďte základní testy `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na určeném hostiteli Radaru
- [ ] Zaznamenejte identitu / kontakt / adresu provozovatele a vlastníkem schválenou právní revizi v privátní službě
- [ ] Otestujte Stripe Checkout a podepsaný webhook pouze v testovacím režimu
- [ ] Otestujte jedno šifrované doručení transakčního e-mailu se schváleným odesílatelem / doménou
- [ ] Prokažte obnovení ze zálohy a jedno kontrolované spuštění výzkumu s omezeným rozpočtem
- [ ] Před přijetím dokladů o darech schvalte zásady kontroly BRL/PIX
- [ ] Veřejný Checkout povolte až po splnění předchozích podmínek a poté aktivujte nové ID v `news.json`
- [ ] Ověřte, že banner na domovské stránce používá lokalizovaný text a že se nové ID znovu zobrazí po zavření staršího ID

## Rychlý test vestavěných služeb (v3.8.4+)

Před vydáním jakékoli verze, která obsahuje změny vestavěných služeb, ověřte:

### Spuštění s novou DB (odhalí kolize migrací — přidáno po opravě v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkejte 10 s na spuštění
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrátí `"9router"` (NE 404, NE 500). Potvrzuje, že byla použita migrace `071_services.sql` a vložen počáteční řádek.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrátí 3 řádky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrátí 2 řádky (ověřuje použití `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` projde — chrání před budoucími kolizemi.

### 9Router

- [ ] `POST /api/services/9router/install` vrátí do 2 min stav 200 s `installedVersion`
- [ ] `POST /api/services/9router/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlásí `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vrátí 200 (směrování přes 9Router od začátku do konce)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí nativní uživatelské rozhraní 9Router uvnitř proxy (žádný přímý iframe s `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrátí `{ keyRotated: true }` a služba se bez problémů restartuje
- [ ] `POST /api/services/9router/stop` vrátí 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrátí stream SSE s událostí `snapshot` obsahující nedávné řádky
- [ ] Instalace v prostředí bez `npm` v PATH vrátí 500 s přívětivou chybovou zprávou (bez trasování zásobníku)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrátí do 2 min stav 200
- [ ] `POST /api/services/cliproxy/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/cliproxy/status` hlásí `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrátí 200 a `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrátí stream SSE

### Bezpečnostní regrese

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrátí `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrátí `403 LOCAL_ONLY`
- [ ] Chybové odpovědi z `/api/services/*` neobsahují `err.stack` ani absolutní cesty k souborům

## Kontroly pro v3.8.0+

Před vydáním jakékoli verze v3.8.x ověřte také následující položky:

- [ ] `omniroute --tray` se spustí v systému macOS (systray2 je nainstalován do `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se spustí v systému Linux (vyžaduje DISPLAY; pokud není nastavena, zobrazí srozumitelnou chybu)
- [ ] `omniroute --tray` se spustí v systému Windows (PowerShell NotifyIcon, žádné další binární soubory)
- [ ] `omniroute config tray enable` vytvoří položku automatického spuštění; zakázání ji odstraní
- [ ] `npm install -g omniroute@<this-version>` provede postinstall bez kritického ukončení
- [ ] Proces aktualizace zachová volitelné závislosti: `omniroute update --apply` a automatický aktualizační nástroj
      spouštějí `npm install -g … --include=optional`, aby `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) přežily aktualizaci. Úroveň SLM ultra s `modelPath` také vyžaduje
      model tinybert, který se při prvním použití automaticky stáhne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) poté umístí volitelný uzávěr SLM společně do
      `dist/node_modules`, aby worker načetl JEDINOU instanci `@huggingface/transformers` ^4.2.0
      — samostatné trasování zahrnuje pouze transformers, nikoli dynamicky importované
      volitelné závislosti, takže bez tohoto kroku by worker načetl llmlingua-2 s transformers z kořenového adresáře
      a úroveň SLM by bez upozornění přešla do záložního režimu.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, pouze loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vrátí 401 (vždy chráněná trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrátí 401 (ochrana loopbacku)
- [ ] Běhové prostředí SQLite se při prvním spuštění přeloží na `bundled` (přibalený binární soubor je platný pro danou platformu)
- [ ] Běhové prostředí SQLite přejde na `runtime`, když je odstraněn `node_modules/better-sqlite3`
- [ ] Inteligentní filtr MCP komprimuje skutečný výstup `playwright-mcp browser_snapshot` (zmenšení ≥50 %)
- [ ] Všech 10 souborů `skills/omniroute*/SKILL.md` je veřejně dostupných prostřednictvím přímé adresy URL na GitHubu
- [ ] Průvodce úvodním nastavením při nové instalaci zobrazí krok prohlídky úrovní „Jak to funguje“
- [ ] Widget pokrytí úrovní na domovském řídicím panelu zobrazuje počty nakonfigurovaných/aktivních položek

---

## Vydání 3.9.0 LTS (nacvičeno ve verzi 3.8.58)

Po verzi v3.8.59 následuje verze 3.9.0 a její špička se stane základem dvou dlouhodobých větví:
`stable/v3` (řada v3 LTS, npm `latest`) a `develop` (v4, navýšená na 4.0.0, npm
`nightly`). Model větví/kanálů, dopředné portování a štítky jsou popsány v
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); plán je v dokumentu [ROADMAP](../../ROADMAP.md) (fáze 3). Vydání proběhne pouze jednou;
verze 3.8.58 jej kompletně nacvičí na forku a verze 3.8.59 bude uzavřena pomocí
[kontrolního seznamu GO/NO-GO](./LTS_GO_NO_GO.md).

### Zkušební běh (pouze pro čtení, kdykoli bezpečný)

```bash
npm run release:dry-run-lts-cut                       # skutečné vydání: 3.9.0 z HEAD, předchozí značka v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # připnutí zdrojového commitu
```

`scripts/release/dry-run-lts-cut.mjs` nic neprovádí: čte informace z git a `gh` a vypíše
celou posloupnost — předpoklady (zdroj lze přeložit na commit, předchozí značka existuje, soubor `package.json` obsahuje
cílovou verzi, je otevřen issue `release-freeze`, není otevřen žádný issue `Release branch not green`
pro existující release větev — neexistující větev je hlášena jako `?` neznámá, nikdy jako
zelená — je nakonfigurována fronta Mergify `release` (G11: `queue_rules`, `checks_timeout`,
štítek `queue`), sada pravidel `release/*` stále blokuje odstranění a vynucené pushnutí a
`stable/v3` ani `develop` zatím neexistují), dva kroky vytvoření větví, které spouštěče neaktivních workflow
a podmínky `if:` se stanou pravdivými (a které zůstanou blokované proměnnou repozitáře nebo
připnuté ke kanonickému repozitáři), očekávané dist-tag značky (`latest` → 3.9.0, `next` a
`nightly` prázdné) a postup vrácení změn. Návratový kód `0` = `RESULT: READY`, `1` = nesplněný
blokující předpoklad (`✗`), `2` = chyba použití. `--advisory <id,...>` sníží závažnost kontroly
na varování (`!`), aniž by ji skryl.

Spusťte zkušební běh skutečného vydání, dokud je zmrazení vydání 3.9.0 stále aktivní — větve
se vytvoří po značce a před tím, než fáze 12c zmrazení ukončí.

### Nácvik verze 3.8.58 (pouze fork)

```bash
# 1. Zkušební běh na aktuální špičce s parametry nácviku
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Provedení vůči vzdálenému FORKU (origin nebo jakýkoli vzdálený repozitář, jehož URL odpovídá
#    kanonickému repozitáři, bude odmítnut; každý krok vyžaduje potvrzení v terminálu)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Vyzkoušení neaktivních workflow ve forku (workflow_dispatch tam, kde zkušební běh
#    hlásí připnutí ke kanonickému repozitáři), poté vrácení změn
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit navyšující verzi ve větvi develop je vytvořen pomocí nízkoúrovňových nástrojů git (pracovní strom
se nemění) a aktualizuje stejných pět souborů jako commit otevírající cyklus: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` a `docs/openapi.yaml`. Sekce `[4.0.0]`
v souboru CHANGELOG a její lokalizované varianty se následně otevřou ve větvi `develop`, ještě před jejím prvním
PR. Skript nikdy nemění dist-tag značky npm — nacvičte je na pomocném balíčku.

### Artefakt náhledu PR (sestavit jednou, propagovat stejné bajty)

`.github/workflows/preview-artifact.yml` sestaví jeden produkční tarball ze špičky PR a
ověří přesně toto sestavení (část (a) úkolu #8084). Pouze PR ze stejného repozitáře; nic se nepublikuje.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # nebo přidejte štítek `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalace náhledu
```

Běh provede `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, zabalí
tarball, spustí `npm run check:pack-boot` (falešné tajné údaje, dočasný datový adresář), znovu jej zabalí a
selže, pokud kontrolní součet není totožný. Poté zaznamená `artifact-identity.json` (SHA špičky, SHA
základní větve, hash zamykacího souboru, platforma, architektura, ABI Node, bundler, zásady sestavení —
`scripts/release/artifact-identity.mjs`) a v samostatném jobu vytvoří atestaci tarballu. Propagace
náhledu znamená instalaci tohoto tarballu: nikdy jej znovu nesestavujte ze zdrojového kódu.

### Vydání (3.9.0, po rozhodnutí GO)

1. Rozhodnutí GO je zaznamenáno v [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` vypíše `RESULT: READY`.
3. Vytvořte větve na `origin` ručně pomocí příkazů vypsaných zkušebním během — skript
   odmítne pushnout do `origin`. Chcete-li znovu použít zkontrolovaný commit pro větev develop, spusťte nejprve
   nácvik s parametrem `--execute` na špičce 3.9.0 vůči svému forku; vypíše obě SHA a
   stejné commity lze pushnout:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Před začleněním prvního PR nastavte ochranu větví `stable/v3` a `develop` (sady pravidel + fronta začlenění).
5. Neaktivní workflow se zapnou na základě existence větví: `forward-port.yml` (push do
   `stable/v3`), `validate-stable-pr.yml` (PR do `stable/v3`) a `nightly-v4-build.yml`
   (sestavuje `develop`). Před ostrým spuštěním nastavte tajný údaj repozitáře `secrets.FORWARD_PORT_TOKEN` (aby se CI spouštělo
   pro PR s dopředným portem); publikování nočních sestavení zůstane vypnuté, dokud vlastník nenastaví proměnnou repozitáře
   `vars.NIGHTLY_PUBLISH` na `true` a služba npm Trusted Publishing nepovolí
   `nightly-v4-build.yml`. Kanál určuje `scripts/release/dist-tag.mjs`, stejný
   resolver, který používá `npm-publish.yml`.
6. Ověřte kanály: `npm view omniroute dist-tags --json` zobrazí `latest` = 3.9.0 a žádné
   `next` / `nightly`, dokud nebude publikována v4.
7. Vrácení změn v případě potřeby: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   a `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vrácení změn

Pokud má vydání kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí vydání jako neaktuální)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (pouze pokud jej už uživatelé nezačali používat)
3. Nebo: oprava hotfix ve větvi `release/vX.Y.0` → opravné vydání `vX.Y.(Z+1)`
4. Okamžitě informujte uživatele v GitHub Discussions a na Discordu

## Pevná pravidla

- Nikdy neprovádějte commity přímo do větve `main`
- Nikdy nepoužívejte `git push --force` pro větev `main` ani větve `release/*`
- Nikdy nepřeskakujte hooky Husky (`--no-verify`)
- Nikdy neukládejte do repozitáře tajné údaje, přihlašovací údaje ani soubory `.env`
- Pokrytí musí zůstat ≥60/60/60/60 (příkazy/řádky/funkce/větve)
- Při změně produkčního kódu v `src/`, `open-sse/`, `electron/` nebo `bin/` vždy zahrňte nebo aktualizujte testy

## Automatická kontrola synchronizace

Před otevřením PR spusťte místně kontrolu synchronizace dokumentace:

```bash
npm run check:docs-sync
```

CI tuto kontrolu spouští také v `.github/workflows/ci.yml` (úloha lint).
