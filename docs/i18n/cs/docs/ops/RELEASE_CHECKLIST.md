# Release Checklist (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Naposledy aktualizováno:** 2026-08-28 — v3.8.51
> Zjednodušený proces vydání využívající dovednosti Claude Code k automatizaci.
>
> **Mezi vydáními udržujte frontu/větev v zeleném stavu:** viz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodina `/green-prs` + `npm run check:release-green` + `/babysit` + noční běh). Pravidelné
> spouštění — a zejména **před** tímto kontrolním seznamem — zajistí, že PR s vydáním začne v zeleném stavu.

## Stručně

```bash
# 1. Zvyšte verzi + vygenerujte CHANGELOG (dovednost)
/version-bump-cc patch    # nebo minor/major

# 2. Spusťte lokálně kontrolu kvality
npm run check              # lint + testy
npm run test:coverage      # úplná kontrola pokrytí (60/60/60/60)

# 3. Sestavte a proveďte základní kontrolu
npm run build
npm run test:e2e           # volitelné, ale doporučené

# 4. Vygenerujte vydání (dovednost)
/generate-release-cc

# 5. Nasaďte (dovednost)
/deploy-vps-both-cc        # nebo akamai-cc / local-cc

# 6. Zachyťte důkazy o vydání (dovednost)
/capture-release-evidences-cc
```

## Důvěryhodné publikování npm (výchozí od v3.8.51) — na vyžádání připravené, přímé jako záložní možnost

`npm-publish.yml` ve výchozím nastavení publikuje prostřednictvím **npm Trusted Publishing (OIDC)**:
úloha `stage-npm` (hostovaná na GitHubu) vymění id-token GitHubu za krátkodobé přihlašovací
údaje npm pro daný běh — žádný dlouhodobý token npm v tajných údajích repozitáře, žádná výzva 2FA,
připojený doklad o původu. Toto je způsob obejití, který npm podporuje nyní, když jsou rušeny tokeny
přeskakující 2FA; obnovuje plně automatický proces, který projekt používal až do v3.8.48, a současně
zachovává záruku WS1.3 (uniklý token nemůže sám publikovat — žádný token neexistuje).

**Jednorázové nastavení (vlastník):** npmjs.com → balíček `omniroute` → Settings → _Trusted
Publisher_ → GitHub: vlastník `diegosouzapw`, repozitář `OmniRoute`, workflow `npm-publish.yml`
(prostředí: žádné). Dokud toto nastavení neexistuje, automatický krok selže s `ENEEDAUTH`:
spusťte jej znovu s `publish_mode=staged` (níže) nebo `direct`.

### Připravené publikování (na vyžádání — `publish_mode=staged`)

Workflow npm-publish již nepublikuje přímo: spustí zabalený tarball
(`check:pack-boot`) a poté provede `npm stage publish` — přesné bajty jsou uloženy
v registru, ale **nelze je nainstalovat**, dokud je vlastník neschválí. Lidská brána 2FA
se přesunula ZA ověření, nikoli před něj.

**Postup vlastníka poté, co workflow zezelená:**

1. `npm stage list omniroute` — vyhledejte ID připraveného vydání (je také vypsáno v souhrnu workflow).
2. Ověřte připravené bajty (doporučeno): `npm stage download <id>`, poté nainstalujte
   stažený tarball do dočasného prefixu a spusťte jej (`npm run check:pack-boot` automatizuje
   stejný výsledek zabalení→instalace→spuštění v CI).
3. `npm stage approve <id>` — výzva 2FA JE publikováním. `npm stage reject <id>` připravené vydání zahodí.
4. Pojistka po publikování: ověřovač po publikování (WS1.4 plánu v3.8.49) nainstaluje
   publikovanou verzi z veřejného registru v čistém kontejneru a spustí ji.

**Nouzová záložní možnost:** `workflow_dispatch` s `publish_mode=direct` obnoví
původní okamžité `npm publish` (použijte pouze v případě, že samotné připravené publikování nefunguje správně; zaznamenejte důvod).

**Jednorázové posílení zabezpečení (vlastník, npmjs.com):** nakonfigurujte Trusted Publisher pro
`omniroute` v režimu pouze pro přípravu, aby uniklý dlouhodobý token nemohl provést `npm publish`
přímo odkudkoli — CI může pouze připravit vydání; vydat jej může pouze vlastník pomocí 2FA.

**Postup při poškozeném artefaktu (beze změny):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako výchozí reakce (minuty, vratné); `npm unpublish` pouze v rámci 72hodinového období / bez závislých
balíčků a nikdy jako první krok. Docker: nikdy nepřepisujte značku verze — vrácení změn znamená
přesměrování `latest` na poslední funkční digest.

**Docker Hub `latest` (povinné při každém publikování stabilní verze SemVer):**
workflow `docker-publish` musí označit **jak** `X.Y.Z`, tak v případě, že
`should-promote-latest.sh` potvrdí, že jde o nejvyšší stabilní verzi SemVer, také `:latest`,
a to **stejným digestem**. Po dokončení úlohy: digest `latest` na Hubu odpovídá novému
digestu SemVer a hodnota `last_updated` se změnila. Nenechávejte `:latest` na starším
sestavení, zatímco poznámky k vydání popisují opravy, které existují pouze v gitu. Rychlé
úvodní konfigurace Compose používají `:latest`; GitOps by měl nadále připínat `X.Y.Z`. Viz
[Kanály vydání Dockeru](../guides/DOCKER_GUIDE.md#release-channels) a #10317.

## Zrychlený režim pro hotfixy (štítek `hotfix`)

PR označený štítkem `hotfix` přeskočí náročnou matici CI (E2E s 9 shardy, ratchet pokrytí,
quality-gate, quality-extended) a ponechá rychlé kontroly s vysokou vypovídací hodnotou: sestavení,
shardy jednotkových testů, integrační testy, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
a kontrolu spuštění z tarballu (`check:pack-boot`). Cíl: zelený stav za ≤15 min namísto ~33 min.

**Podmínky vstupu — vyžadovány jsou všechny čtyři (podle nouzových režimů Chromium/VS Code/Node):**

1. **Závažnost**: produkce je nefunkční — publikovaný artefakt při spuštění selže /
   bezpečnostní oprava / problém se týká každého uživatele daného vydání. „Důležité“ neznamená „nefunkční“.
2. **Oprávnění**: štítek `hotfix` smí přidat pouze vlastník repozitáře. Samotný štítek JE
   schválením — nikdy jej nepřidávejte sami na PR v rámci kampaně.
3. **Důkazy**: tělo PR odkazuje na předchozí zcela úspěšný náročný běh (sadu, kterou by
   přeskočené úlohy znovu ověřily) a také na test samotné opravy, který nejprve selhal a poté prošel.
4. **Rozsah**: pouze cherry-pick — minimální oprava, žádné refaktorizace ani přidružené změny.

Přeskočená oblast pokrytí/ratchetu se znovu ověří při následujícím úplném běhu na
větvi vydání (průběžně zelené vydání) — tento režim přeskakuje ČEKÁNÍ, nikdy ne validaci.
Změny pouze v testech (všechny soubory pod `tests/`, žádné pod `tests/e2e/`) přeskočí matici E2E
automaticky, bez jakéhokoli štítku.

## Podrobný kontrolní seznam

### Před vydáním

- [ ] Všechny PR určené pro toto vydání jsou sloučeny do `release/vX.Y.0`
- [ ] Všechny otevřené položky v Linear / issues pro tuto verzi jsou uzavřeny nebo přesunuty do dalšího milníku
- [ ] CI na větvi `release/vX.Y.0` je zelené
- [ ] V kódu nejsou žádné značky `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Základní image Dockeru je aktuální (nyní `node:24.15.0-trixie-slim`)

### Verze a seznam změn

- [ ] Spusťte `/version-bump-cc <patch|minor|major>` (dovednost Claude Code)
  - Zvýší verzi v `package.json`, `electron/package.json`
  - Znovu vygeneruje `CHANGELOG.md` z commitů gitu od posledního tagu
  - Aktualizuje odznaky v README.md
- [ ] Ručně zkontrolujte CHANGELOG.md a v případě potřeby upravte zprávy commitů
- [ ] Ověřte, že nejnovější sekce semver v `CHANGELOG.md` odpovídá verzi v `package.json`
- [ ] Ponechte `## [Unreleased]` jako první sekci seznamu změn pro nadcházející práci
- [ ] Aktualizujte `docs/openapi.yaml` → `info.version` musí odpovídat verzi v `package.json`

### Kvalita kódu

- [ ] `npm run lint` — 0 chyb (varování existovala již dříve)
- [ ] `npm run typecheck:core` — bez problémů
- [ ] `npm run typecheck:noimplicit:core` — bez problémů (striktní)
- [ ] `npm run check:cycles` — žádné cyklické závislosti
- [ ] `npm run check:any-budget:t11` — v rámci rozpočtu
- [ ] `npm run check:route-validation:t06` — bez problémů
- [ ] `npm run check:node-runtime` — splněna minimální podporovaná verze běhového prostředí (`>=22.22.2 <23`, `>=24.0.0 <27`, podle `SUPPORTED_NODE_RANGE` v `src/shared/utils/nodeRuntimeSupport.ts`; v souladu s `engines` v `package.json`)

### Testování

- [ ] `npm run test:unit` — projde
- [ ] `npm run test:vitest` — projde (server MCP, autoCombo, mezipaměť)
- [ ] `npm run test:coverage` — splněna hranice 60/60/60/60 (příkazy/řádky/funkce/větve)
- [ ] `npm run test:integration` — projde (pokud se změny týkají DB / handlerů)
- [ ] `npm run test:combo:matrix` — projde (matice kombinovaných strategií: deterministicky ověřuje rozhodování při výběru u všech 19 veřejných směrovacích strategií; spusťte při změnách kombinovaného směrování, rozpoznávání strategií nebo záložní logiky)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **volitelné/ruční** (podmíněný smoke test se skutečnými upstreamy; načte snapshot DB pouze pro čtení z VPS `root@192.168.0.15`; využívá skutečné poskytovatele a spotřebovává kredity; nikdy se nespouští v CI; bez aktivační podmínky se korektně přeskočí)
- [ ] `npm run test:combo:live:vps` — **volitelné/ruční** (živý smoke test VPS ve 3. fázi: 7 scénářů HTTP proti živému serveru `.15` prostřednictvím prostého Node ESM; vyžaduje `ssh root@192.168.0.15`; vytváří a odstraňuje pouze kombinace `__live_test__*`; využívá skutečné poskytovatele; nikdy se nespouští v CI)
- [ ] `npm run test:e2e` — projde (změny UI)
- [ ] `npm run test:protocols:e2e` — projde (změny MCP/A2A)
- [ ] `npm run test:ecosystem` — projde

### Hooky (ověřované pomocí Husky)

Hooky Husky se nacházejí v `.husky/` a spouštějí se automaticky při operacích gitu.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** rychlé deterministické kontroly — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktivováno 2026-06-13). Záměrně nezahrnuje `test:unit` (je pomalý; pokrývá jej úloha CI `test-unit`).
  - Před odesláním větví vydání spusťte `npm run test:unit` ručně.

Pokud hook selže: opravte příčinu problému, neobcházejte jej pomocí `--no-verify`.

### Conventional Commits

Všechny commity určené pro vydání musí dodržovat formát `type(scope): subject`.

**Platné typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Platné rozsahy:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Zpětně nekompatibilní změny: přidejte patičku `BREAKING CHANGE:` nebo `!` za rozsah (např. `feat(api)!: drop /v0`).

### Dokumentace

- [ ] `npm run check:docs-sync` projde (automaticky spouštěno hookem pre-commit)
- [ ] `npm run check:docs-all` projde (souhrnná kontrola: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` skončí s kódem 0 — kontrakt proměnných prostředí mezi kódem ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` je zachován
- [ ] `npm run check:doc-links` skončí s kódem 0 — po změně struktury nejsou žádné nefunkční interní odkazy v markdownu
- [ ] `docs/architecture/ARCHITECTURE.md` zkontrolován s ohledem na odchylky úložiště a běhového prostředí
- [ ] `docs/guides/TROUBLESHOOTING.md` zkontrolován s ohledem na odchylky proměnných prostředí a provozního chování
- [ ] Pokud se změnil `.env.example`: aktualizován `docs/reference/ENVIRONMENT.md`
- [ ] Pokud má nová funkce uživatelské rozhraní: je zmíněna v `docs/guides/USER_GUIDE.md`
- [ ] Pokud má nová funkce API: aktualizovány `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Pokud je nová funkce modulem: existuje vyhrazený soubor `docs/<MODULE>.md`
- [ ] Pokud jde o nekompatibilní změnu: `docs/guides/TROUBLESHOOTING.md` obsahuje poznámku k migraci

### i18n

- [ ] `npm run i18n:check` skončí s kódem 0 — stav překladů (`.i18n-state.json`) je synchronizován se zdrojovou dokumentací (v přísném režimu nejsou žádné odchýlené zdroje; upozornění v režimu varování je přijatelné pro úpravy dokumentace na poslední chvíli, ale před vytvořením tagu by měl být výsledek 0)
- [ ] `npm run i18n:check-ui-coverage` skončí s kódem 0 — každé národní prostředí uživatelského rozhraní dosahuje alespoň minimálního pokrytí 80 %
- [ ] `npm run i18n:sync-ui:dry` hlásí 0 chybějících klíčů ve všech 42 národních prostředích
- [ ] Pokud se změnila zdrojová anglická dokumentace, spusťte před vytvořením tagu `npm run i18n:run` (vyžaduje `OMNIROUTE_TRANSLATION_API_KEY` v `.env`)
- [ ] Překladatelské příspěvky lze v případě drobných změn odložit na další vydání (evidujte v CHANGELOGu)

### Migrace databáze

- [ ] Pokud `src/lib/db/migrations/` obsahuje nové soubory:
  - [ ] Každá migrace je idempotentní (`CREATE TABLE IF NOT EXISTS` atd.)
  - [ ] Migrace jsou obaleny transakcemi
  - [ ] Jsou správně očíslovány (bez mezer v posloupnosti)
- [ ] Otestujte na nové instalaci: odstraňte `~/.omniroute/omniroute.db` a spusťte `npm run dev`
- [ ] Otestujte na existující instalaci: zazálohujte databázi, spusťte migraci a ověřte schéma
- [ ] Pokud migrace přepisuje tabulky, soubory WAL (`-wal`, `-shm`) musí být zpracovány správně

### Katalog poskytovatelů (validovaný pomocí Zod)

- [ ] Schéma Zod v `src/shared/constants/providers.ts` je při načtení platné
  - [ ] Všichni poskytovatelé mají povinná pole (`id`, `label`, `kind` atd.)
  - [ ] Pro nové bezplatné poskytovatele je uvedeno `freeNote`
  - [ ] Poskytovatelé OAuth mají `oauthConfig` zaregistrovanou v `src/lib/oauth/constants/oauth.ts`
- [ ] Pokud byl přidán nový poskytovatel: odpovídající executor v `open-sse/executors/`
- [ ] Pokud formát není kompatibilní s OpenAI: translator v `open-sse/translator/`
- [ ] Modely zaregistrovány v `open-sse/config/providerRegistry.ts`
- [ ] Jednotkové testy v `tests/unit/` pokrývají klasifikaci poskytovatelů a směrování

### Desktopová aplikace (Electron)

Pokud se změnil `electron/`:

- [ ] `npm run electron:smoke:packaged` projde
- [ ] Sestavení otestována alespoň pro jednu z platforem `:win`, `:mac`, `:linux`
- [ ] Certifikáty pro podepisování kódu nejsou prošlé (pokud se podepisuje)
- [ ] Verze v `electron/package.json` odpovídá kořenovému `package.json`
- [ ] Ukazatel kanálu automatických aktualizací je při vydání do kanálu `stable` aktualizován

### Rozložení sestavení

Repozitář používá tři odlišné výstupní adresáře — nikdy je nezaměňujte:

| Adresář   | Účel                                                                 | Sledován?            |
| --------- | -------------------------------------------------------------------- | -------------------- |
| `src/`    | Zdrojový kód aplikace (TypeScript / TSX)                             | Ano                  |
| `.build/` | Mezivýstupy sestavení — výstup `next build` (`distDir`)              | Ne (ignorován gitem) |
| `dist/`   | Distribuovatelný balíček npm — sestavený pomocí `assembleStandalone` | Ne (ignorován gitem) |

> **Poznámka pro operátora:** adresář obrazu na vzdáleném VPS zůstává `/usr/lib/node_modules/omniroute/app/`.
> Přesunul se pouze výstup sestavení **v repozitáři** (`app/` → `dist/`). Nástroje pro nasazení synchronizují
> obsah `dist/` pomocí rsync do vzdáleného adresáře `app/` — cesty na VPS není nutné měnit.

**Postup s jediným sestavením:**

```
npm run build:release
  └─ rm -rf .build dist          (vyčištění)
  └─ next build → .build/next/   (mezivýstupy)
  └─ assembleStandalone          (zkopíruje standalone + static + public + natives → dist/)
  └─ zapíše dist/BUILD_SHA       (kontrolní hodnota HEAD)
```

Pro nasazení NESPOUŠTĚJTE `npm run build` následované samostatným `npm run build:cli` — použijte
`npm run build:release`, který provede čisté sestavení + vytvoření kontrolní hodnoty jediným příkazem.

### Ověření artefaktu

- [ ] `npm run build:release` proběhne úspěšně a `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` proběhne bez nálezů — žádné `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani jiné místní pozůstatky
- [ ] Po sestavení existuje `dist/server.js`

### Vytvoření tagu a vydání

- [ ] Spusťte `/generate-release-cc` (nástroj Claude Code):
  - Vytvoří tag `vX.Y.Z`
  - Odešle tag a větev
  - Vytvoří vydání na GitHubu s changelogem v popisu
  - Přiloží instalační programy Electronu (pokud byly sestaveny)
- [ ] Nebo ručně:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Nasazení

Nástroje pro nasazení používají odlehčený postup s rsync — bez `npm pack` a bez `npm i -g`:

- [ ] Použijte nástroj pro nasazení odpovídající cíli:
  - `/deploy-vps-local-cc` — místní VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Před nasazením ověřte, že `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Sestavení musí proběhnout tam, kde je `node_modules` skutečný adresář (hlavní pracovní kopie nebo worktree připravený pomocí `npm ci` — NE worktree se symbolickým odkazem)
- [ ] Proveďte základní ověření nasazené instance:
  - Otevřete `/dashboard/health` → ověřte, že řetězec verze odpovídá vydání
  - Spusťte požadavek na `/v1/chat/completions` vůči známému poskytovateli
  - Ověřte, že `/api/monitoring/health` vrací jističe ve stavu `CLOSED`
  - Ověřte, že transporty MCP odpovídají (`/mcp` HTTP, `/mcp-sse` SSE)

### Po vydání

- [ ] Spusťte `/capture-release-evidences-cc` (dovednost Claude Code)
  - Pořídí snímky obrazovky / záznamy nových funkcí ve formátu WebP
  - Připojí je k poznámkám k vydání / příspěvku na blogu
- [ ] Aktualizujte GitHub Discussions / Discord oznámením o vydání
- [ ] Otevřete milník pro příští verzi
- [ ] Pokud je vydání kritické: připněte diskusi nebo jej zveřejněte v `news.json` jako banner v aplikaci

### Podmínky veřejného spuštění Radaru

Oznámení Radaru je záměrně začleněno s nastavením `active: false`. Aktivace je samostatná
změna provedená až poté, co bude doloženo splnění všech následujících položek:

- [ ] Všechny na sebe navazující PR Radaru jsou sloučeny a CI pro release-tip je úspěšné
- [ ] Nasaďte a zběžně otestujte OSS trasy Radaru, přičemž `RADAR_ENABLED` zůstane ve výchozím nastavení vypnuté
- [ ] Zběžně otestujte `GET /planos`, `/termos`, `/privacidade` a `/reembolso` na určeném hostiteli Radaru
- [ ] Zaznamenejte identitu / kontakt / adresu provozovatele a vlastníkem schválenou právní kontrolu v privátní službě
- [ ] Otestujte Stripe Checkout a podepsaný webhook pouze v testovacím režimu
- [ ] Otestujte jedno doručení šifrovaného transakčního e-mailu se schváleným odesílatelem / doménou
- [ ] Ověřte obnovení ze zálohy a jeden kontrolovaný výzkumný běh s omezeným rozpočtem
- [ ] Před přijetím dokladu o daru schvalte zásady kontroly BRL/PIX
- [ ] Veřejný Checkout povolte až po splnění předchozích podmínek a poté aktivujte nové ID v `news.json`
- [ ] Ověřte, že banner na domovské stránce používá lokalizovaný text a že se nové ID zobrazí po odmítnutí staršího ID

## Smoke test vestavěných služeb (v3.8.4+)

Před vydáním jakékoli verze, která obsahuje změny vestavěných služeb, ověřte:

### Spuštění s novou databází (odhaluje kolize migrací — přidáno po opravě v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — počkejte 10 s na spuštění
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` vrátí `"9router"` (NE 404, NE 500). Potvrzuje, že byla použita migrace `071_services.sql` a vložen výchozí řádek.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` vrátí 3 řádky.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` vrátí 2 řádky (ověřuje použití migrace `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` projde — chrání před budoucími kolizemi.

### 9Router

- [ ] `POST /api/services/9router/install` vrátí do 2 min stav 200 s `installedVersion`
- [ ] `POST /api/services/9router/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/9router/status` hlásí `health: "healthy"`
- [ ] `POST /v1/chat/completions` s `"model": "9router/auto/..."` vrátí stav 200 (směrování typu end-to-end přes 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` vykreslí nativní uživatelské rozhraní 9Router uvnitř proxy (žádný přímý iframe `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` vrátí `{ keyRotated: true }` a služba se čistě restartuje
- [ ] `POST /api/services/9router/stop` vrátí stav 200 a `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` vrátí stream SSE s událostí `snapshot` obsahující nedávné řádky
- [ ] Instalace v prostředí bez `npm` v PATH vrátí stav 500 s přívětivou chybovou zprávou (bez trasování zásobníku)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` vrátí do 2 min stav 200
- [ ] `POST /api/services/cliproxy/start` vrátí do 30 s stav 200 a `state: "running"`
- [ ] `GET /api/services/cliproxy/status` hlásí `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` vrátí stav 200 a `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` vrátí stream SSE

### Regrese zabezpečení

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` vrátí `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` vrátí `403 LOCAL_ONLY`
- [ ] Chybové odpovědi z `/api/services/*` neobsahují `err.stack` ani absolutní cesty k souborům

## Kontroly pro v3.8.0+

Před vydáním jakékoli verze v3.8.x ověřte také následující položky:

- [ ] `omniroute --tray` se spustí v systému macOS (systray2 je nainstalován do `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` se spustí v systému Linux (vyžaduje DISPLAY; pokud není nastaveno, zobrazí korektní chybu)
- [ ] `omniroute --tray` se spustí v systému Windows (PowerShell NotifyIcon, žádné další binární soubory)
- [ ] `omniroute config tray enable` vytvoří položku automatického spuštění; její zakázání ji odstraní
- [ ] `npm install -g omniroute@<this-version>` spustí postinstall bez fatálního ukončení
- [ ] Cesta aktualizace zachovává volitelné závislosti: `omniroute update --apply` a automatický aktualizační nástroj
      spouštějí `npm install -g … --include=optional`, takže `optionalDependencies` (better-sqlite3,
      keytar, tls-client a zásobník SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) zůstanou po aktualizaci zachovány. Úroveň SLM ultra s `modelPath` také potřebuje
      model tinybert, který se při prvním použití automaticky stáhne do `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) poté umístí uzávěr volitelných závislostí SLM do
      `dist/node_modules`, aby worker používal JEDINOU instanci `@huggingface/transformers` ^4.2.0
      — samostatný trace balíček zahrnuje pouze transformers, nikoli dynamicky importované
      volitelné závislosti, takže bez tohoto kroku by worker načetl llmlingua-2 proti transformers z kořenového adresáře
      a úroveň SLM by tiše přešla do režimu fail-open.
- [ ] `omniroute status` funguje bez `.env` (cesta tokenu CLI, pouze loopback)
- [ ] `curl http://localhost:20128/api/shutdown` vrátí stav 401 (vždy chráněná trasa)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` vrátí stav 401 (ochrana loopback)
- [ ] Běhové prostředí SQLite se při prvním spuštění přepne na `bundled` (přibalený binární soubor je platný pro danou platformu)
- [ ] Běhové prostředí SQLite přejde na `runtime`, když je odstraněn `node_modules/better-sqlite3`
- [ ] Inteligentní filtr MCP komprimuje skutečný výstup `playwright-mcp browser_snapshot` (snížení o ≥50 %)
- [ ] Všech 10 souborů `skills/omniroute*/SKILL.md` je veřejně dostupných prostřednictvím přímé adresy URL GitHubu
- [ ] Průvodce úvodním nastavením při nové instalaci zobrazí krok s přehledem úrovní „Jak to funguje“
- [ ] Widget pokrytí úrovní na domovském řídicím panelu zobrazuje počty nakonfigurovaných/aktivních položek

---

## Vrácení změn

Pokud má vydání kritický problém:

1. `gh release edit vX.Y.Z --prerelease` (označí vydání jako neaktuální)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (pouze pokud jej už uživatelé nezačali používat)
3. Nebo: oprava na `release/vX.Y.0` → opravné vydání `vX.Y.(Z+1)`
4. Okamžitě informujte uživatele v GitHub Discussions a na Discordu

## Závazná pravidla

- Nikdy neprovádějte commit přímo do větve `main`
- Nikdy nepoužívejte `git push --force` pro větev `main` ani větve `release/*`
- Nikdy nepřeskakujte hooky Husky (`--no-verify`)
- Nikdy neukládejte do repozitáře tajné údaje, přihlašovací údaje ani soubory `.env`
- Pokrytí musí zůstat ≥60/60/60/60 (příkazy/řádky/funkce/větve)
- Při změně produkčního kódu v `src/`, `open-sse/`, `electron/` nebo `bin/` vždy zahrňte nebo aktualizujte testy

## Automatická kontrola synchronizace

Před otevřením PR spusťte lokálně kontrolu synchronizace dokumentace:

```bash
npm run check:docs-sync
```

CI tuto kontrolu spouští také v `.github/workflows/ci.yml` (úloha lint).
