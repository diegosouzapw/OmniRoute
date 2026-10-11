# Release Checklist (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последње ажурирање:** 2026-08-28 — v3.8.51
> Поједностављен ток издавања који користи вештине Claude Code-а за аутоматизацију.
>
> **Одржавајте ред/грану у исправном стању између издања:** погледајте [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (породица `/green-prs` + `npm run check:release-green` + `/babysit` + ноћно покретање). Периодично покретање
> овога — а нарочито **пре** ове контролне листе — обезбеђује да PR за издање од почетка буде исправан.

## Укратко

```bash
# 1. Повећајте верзију + генеришите CHANGELOG (вештина)
/version-bump-cc patch    # или minor/major

# 2. Локално покрените проверу квалитета
npm run check              # lint + тестови
npm run test:coverage      # пуна провера покривености (60/60/60/60)

# 3. Изградња и основна провера
npm run build
npm run test:e2e           # опционално, али препоручено

# 4. Генеришите издање (вештина)
/generate-release-cc

# 5. Примените издање (вештина)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Прикупите доказе о издању (вештина)
/capture-release-evidences-cc
```

## npm поуздано објављивање (подразумевано од v3.8.51) — припремно објављивање на захтев, директно као резервна опција

`npm-publish.yml` подразумевано објављује путем **npm поузданог објављивања (OIDC)**:
задатак `stage-npm` (који се извршава на GitHub инфраструктури) размењује GitHub id-token за краткотрајни npm
акредитив за то покретање — без дуготрајног npm токена у тајнама репозиторијума, без 2FA упита, уз приложен доказ о пореклу.
То је заобилазни механизам који npm сада одобрава, пошто се токени који прескачу 2FA повлаче из употребе;
њиме се враћа потпуно аутоматизован ток који је пројекат имао до v3.8.48, уз задржавање
WS1.3 гаранције (процурели токен не може самостално да објави пакет — јер токен не постоји).

**Једнократно подешавање (власник):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: власник `diegosouzapw`, репозиторијум `OmniRoute`, радни ток `npm-publish.yml`
(окружење: нема). Док то не буде подешено, аутоматски корак се завршава грешком `ENEEDAUTH`:
поново га покрените са `publish_mode=staged` (испод) или `direct`.

### Припремно објављивање (на захтев — `publish_mode=staged`)

Радни ток npm-publish више не објављује директно: покреће упаковану tarball архиву
(`check:pack-boot`), а затим извршава `npm stage publish` — идентични бајтови се смештају у
регистар, али их **није могуће инсталирати** док их власник не одобри. Људска 2FA контрола премештена је
НАКОН провере, а не пре ње.

**Ток за власника након што радни ток успешно прође:**

1. `npm stage list omniroute` — пронађите ID припремне верзије (такође се приказује у сажетку радног тока).
2. Проверите припремљене бајтове (препоручено): `npm stage download <id>`, а затим инсталирајте
   преузету tarball архиву у привремени префикс и покрените је (`npm run check:pack-boot` аутоматизује
   исту pack→install→boot проверу у CI-ју).
3. `npm stage approve <id>` — 2FA упит ЈЕ објављивање. `npm stage reject <id>` одбацује припремну верзију.
4. Заштита након објављивања: провера након објављивања (WS1.4 плана за v3.8.49) инсталира
   објављену верзију из јавног регистра у чистом контејнеру и покреће је.

**Резервна опција за хитне случајеве:** `workflow_dispatch` са `publish_mode=direct` враћа
раније непосредно `npm publish` понашање (користите само ако само припремно објављивање не функционише исправно; забележите разлог).

**Једнократно ојачавање безбедности (власник, npmjs.com):** подесите Trusted Publisher за
`omniroute` у режиму који дозвољава само припремно објављивање, тако да процурели дуготрајни токен не може директно да изврши `npm publish`
ни са једног места — CI може само да припреми верзију; само власников 2FA може да је објави.

**Поступак за неисправан артефакт (непромењен):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
као подразумевана реакција (траје неколико минута и може се поништити); `npm unpublish` користите само унутар периода од 72 сата/ако нема зависних пакета
и никада као први корак. Docker: никада немојте поново уписивати ознаку верзије — враћање претходне верзије подразумева
преусмеравање ознаке `latest` на последњи исправан digest.

**Docker Hub `latest` (обавезно при сваком објављивању стабилне SemVer верзије):**
радни ток `docker-publish` мора да означи **и** `X.Y.Z` и, када
`should-promote-latest.sh` потврди да је то највиша стабилна SemVer верзија, `:latest`
са **истим digest-ом**. Након задатка: digest за Hub `latest` мора бити једнак digest-у нове
SemVer верзије, а `last_updated` мора бити ажуриран. Не остављајте `:latest` на старијој
изградњи док напомене о издању говоре о исправкама које постоје само у git-у. Compose
водичи за брзи почетак користе `:latest`; GitOps треба и даље да фиксира `X.Y.Z`. Погледајте
[Docker канале издања](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Брза трака за хитне исправке (ознака `hotfix`)

PR са ознаком `hotfix` прескаче обимну CI матрицу (E2E са 9 делова, праг покривености,
quality-gate, quality-extended) и задржава брзе провере високог значаја: израду,
делове јединичних тестова, интеграционе тестове, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и проверу покретања из tarball пакета (`check:pack-boot`). Циљ: успешно извршавање за ≤15 минута уместо за ~33 минута.

**Услови за улазак — сва четири су обавезна (по узору на Chromium/VS Code/Node траке за хитне случајеве):**

1. **Озбиљност**: продукција не ради — објављени артефакт отказује при покретању /
   безбедносна исправка / погођен је сваки корисник издања. „Важно“ не значи „не ради“.
2. **Овлашћење**: само власник репозиторијума поставља ознаку `hotfix`. Ознака ЈЕ
   одобрење — никада је немојте самостално постављати на PR кампање.
3. **Докази**: опис PR-а садржи везу ка претходном потпуно успешном обимном извршавању (скупу тестова
   који би прескочени послови поново проверили), као и тесту саме исправке који је прво био неуспешан, а затим успешан.
4. **Обим**: искључиво cherry-pick — минимална исправка, без рефакторисања и успутних измена.

Прескочене провере покривености и прагова поново се извршавају при следећем потпуном покретању на
грани издања (континуирано успешно стање издања) — трака прескаче ЧЕКАЊЕ, никада валидацију.
Измене које се односе само на тестове (све датотеке у `tests/`, ниједна у `tests/e2e/`) аутоматски прескачу E2E
матрицу, без икакве ознаке.

## Детаљна контролна листа

### Пре издања

- [ ] Сви PR-ови намењени овом издању спојени су у `release/vX.Y.0`
- [ ] Све отворене Linear/issue ставке за ову верзију су затворене или премештене у следећу прекретницу
- [ ] CI је успешан на грани `release/vX.Y.0`
- [ ] У коду нема ознака `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Основна Docker слика је ажурна (тренутно `node:24.15.0-trixie-slim`)

### Верзија и евиденција измена

- [ ] Покрените `/version-bump-cc <patch|minor|major>` (Claude Code вештина)
  - Повећава верзије у `package.json`, `electron/package.json`
  - Поново генерише `CHANGELOG.md` из git commit-ова од последње ознаке
  - Ажурира значке у README.md
- [ ] Ручно прегледајте CHANGELOG.md и по потреби уредите поруке commit-ова
- [ ] Проверите да ли је најновији semver одељак у `CHANGELOG.md` једнак верзији у `package.json`
- [ ] Задржите `## [Unreleased]` као први одељак евиденције измена за предстојећи рад
- [ ] Ажурирајте `docs/openapi.yaml` → `info.version` мора бити једнак верзији у `package.json`

### Квалитет кода

- [ ] `npm run lint` — 0 грешака (упозорења су постојала и раније)
- [ ] `npm run typecheck:core` — без грешака
- [ ] `npm run typecheck:noimplicit:core` — без грешака (строго)
- [ ] `npm run check:cycles` — нема кружних зависности
- [ ] `npm run check:any-budget:t11` — у оквиру ограничења
- [ ] `npm run check:route-validation:t06` — без грешака
- [ ] `npm run check:node-runtime` — испуњена је најнижа подржана верзија окружења (`>=22.22.2 <23`, `>=24.0.0 <27`, према `SUPPORTED_NODE_RANGE` у `src/shared/utils/nodeRuntimeSupport.ts`; усклађено са `package.json` `engines`)

### Тестирање

- [ ] `npm run test:unit` — успешно
- [ ] `npm run test:vitest` — успешно (MCP сервер, autoCombo, кеш)
- [ ] `npm run test:coverage` — задовољен праг 60/60/60/60 (искази/линије/функције/гране)
- [ ] `npm run test:integration` — успешно (ако измене утичу на DB / обрађиваче)
- [ ] `npm run test:combo:matrix` — успешно (матрица комбинованих стратегија: детерминистички доказује одлуке о избору за свих 19 јавних стратегија усмеравања; покренути при изменама комбинованог усмеравања, разрешавања стратегије или резервне логике)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **опционо/ручно** (условљена провера са стварним спољним сервисима; учитава снимак базе података само за читање са VPS-а `root@192.168.0.15`; позива стварне добављаче, троши кредите; никада се не покреће у CI-ју; уредно се прескаче ако услов није испуњен)
- [ ] `npm run test:combo:live:vps` — **опционо/ручно** (VPS провера уживо у фази 3: 7 HTTP сценарија на активном `.15` серверу преко чистог Node ESM-а; захтева `ssh root@192.168.0.15`; креира/брише само `__live_test__*` комбинације; позива стварне добављаче; никада се не покреће у CI-ју)
- [ ] `npm run test:e2e` — успешно (измене корисничког интерфејса)
- [ ] `npm run test:protocols:e2e` — успешно (MCP/A2A измене)
- [ ] `npm run test:ecosystem` — успешно

### Hook-ови (проверено помоћу Husky-ја)

Husky hook-ови се налазе у `.husky/` и аутоматски се покрећу током git операција.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** брзе детерминистичке провере — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активирано 2026-06-13). Намерно изоставља `test:unit` (споро; покривено CI послом `test-unit`).
  - Ручно покрените `npm run test:unit` пре слања грана издања.

Ако hook не успе: отклоните основни проблем, немојте га заобилазити помоћу `--no-verify`.

### Конвенционални commit-ови

Сви commit-ови намењени издању морају пратити формат `type(scope): subject`.

**Важећи типови:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Важећи опсези:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Промене које нарушавају компатибилност: додајте подножје `BREAKING CHANGE:` или `!` после опсега (нпр. `feat(api)!: drop /v0`).

### Документација

- [ ] `npm run check:docs-sync` пролази (аутоматски се покреће преко pre-commit механизма)
- [ ] `npm run check:docs-all` пролази (обједињује: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завршава се кодом 0 — уговор окружења између кода ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` остаје очуван
- [ ] `npm run check:doc-links` завршава се кодом 0 — нема неисправних интерних markdown референци након реструктурирања
- [ ] `docs/architecture/ARCHITECTURE.md` је прегледан ради одступања у складишту/извршном окружењу
- [ ] `docs/guides/TROUBLESHOOTING.md` је прегледан ради одступања у променљивама окружења и оперативним процедурама
- [ ] Ако је `.env.example` измењен: `docs/reference/ENVIRONMENT.md` је ажуриран
- [ ] Ако нова функција има кориснички интерфејс: поменута је у `docs/guides/USER_GUIDE.md`
- [ ] Ако нова функција има API: ажурирани су `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Ако је нова функција модул: постоји наменски документ `docs/<MODULE>.md`
- [ ] Ако је промена некомпатибилна: `docs/guides/TROUBLESHOOTING.md` садржи напомену о миграцији

### i18n

- [ ] `npm run i18n:check` завршава се кодом 0 — стање превода (`.i18n-state.json`) синхронизовано је са изворном документацијом (нема извора са одступањима у строгом режиму; упозорење у режиму упозорења прихватљиво је за последње мање дораде документације, али резултат треба да буде 0 пре означавања издања)
- [ ] `npm run i18n:check-ui-coverage` завршава се кодом 0 — сваки локал корисничког интерфејса има покривеност од најмање 80%
- [ ] `npm run i18n:sync-ui:dry` пријављује 0 кључева који недостају у сва 42 локала
- [ ] Ако је изворна документација на енглеском измењена, покрените `npm run i18n:run` (захтева `OMNIROUTE_TRANSLATION_API_KEY` у `.env`) пре означавања издања
- [ ] Доприноси преводима могу се одложити до следећег издања ако су мањег обима (евидентирати у CHANGELOG-у)

### Миграције базе података

- [ ] Ако `src/lib/db/migrations/` садржи нове датотеке:
  - [ ] Свака миграција је идемпотентна (`CREATE TABLE IF NOT EXISTS`, итд.)
  - [ ] Миграције су обухваћене трансакцијама
  - [ ] Исправно су нумерисане (без празнина у редоследу)
- [ ] Тестирајте на новој инсталацији: избришите `~/.omniroute/omniroute.db` и покрените `npm run dev`
- [ ] Тестирајте на постојећој инсталацији: направите резервну копију базе података, покрените миграцију и проверите шему
- [ ] WAL датотекама (`-wal`, `-shm`) исправно се рукује ако миграција поново уписује табеле

### Каталог провајдера (проверен помоћу Zod-а)

- [ ] Zod шема у `src/shared/constants/providers.ts` важећа је приликом учитавања
  - [ ] Сви провајдери имају обавезна поља (`id`, `label`, `kind`, итд.)
  - [ ] `freeNote` је наведено за нове бесплатне провајдере
  - [ ] OAuth провајдери имају `oauthConfig` регистрован у `src/lib/oauth/constants/oauth.ts`
- [ ] Ако је додат нови провајдер: постоји одговарајући извршилац у `open-sse/executors/`
- [ ] Ако формат није OpenAI: постоји преводилац у `open-sse/translator/`
- [ ] Модели су регистровани у `open-sse/config/providerRegistry.ts`
- [ ] Јединични тестови у `tests/unit/` покривају класификацију провајдера и усмеравање

### Стони рачунари (Electron)

Ако је `electron/` измењен:

- [ ] `npm run electron:smoke:packaged` пролази
- [ ] Верзије су тестиране за најмање једну од платформи `:win`, `:mac`, `:linux`
- [ ] Сертификати за потписивање кода нису истекли (ако се користи потписивање)
- [ ] Верзија у `electron/package.json` одговара верзији у коренском `package.json`
- [ ] Показивач канала за аутоматско ажурирање је ажуриран ако се издање објављује на каналу `stable`

### Распоред излазних директоријума изградње

Репозиторијум користи три различита излазна директоријума — никада их немојте мешати:

| Директоријум | Намена                                                           | Праћен?              |
| ------------ | ---------------------------------------------------------------- | -------------------- |
| `src/`       | Изворни код апликације (TypeScript / TSX)                        | Да                   |
| `.build/`    | Међурезултати изградње — излаз команде `next build` (`distDir`)  | Не (игнорише га git) |
| `dist/`      | npm пакет спреман за испоруку — саставља га `assembleStandalone` | Не (игнорише га git) |

> **Напомена за оператера:** директоријум слике на удаљеном VPS-у остаје `/usr/lib/node_modules/omniroute/app/`.
> Премештен је само излаз изградње **унутар репозиторијума** (`app/` → `dist/`). Вештине за постављање користе rsync за пренос
> садржаја директоријума `dist/` у удаљени директоријум `app/` — нису потребне никакве измене путања на VPS-у.

**Ток једнократне изградње:**

```
npm run build:release
  └─ rm -rf .build dist          (чишћење)
  └─ next build → .build/next/   (међурезултати)
  └─ assembleStandalone          (копира самостални пакет + статичке датотеке + јавне датотеке + изворне модуле → dist/)
  └─ writes dist/BUILD_SHA       (HEAD контролна ознака)
```

НЕМОЈТЕ покретати `npm run build`, а затим засебно `npm run build:cli` ради постављања — користите
`npm run build:release`, који једном командом обавља чисту поновну изградњу и уписује контролну ознаку.

### Провера артефаката

- [ ] `npm run build:release` успешно се завршава и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` пролази без проблема — нема `app.__qa_backup`, `scripts/scratch`, `package-lock.json` нити других локалних остатака
- [ ] `dist/server.js` постоји након изградње
- [ ] Опционална локална провера упакованог извршног окружења: `npm run dev:candidate -- validate` након `npm run dev:candidate -- build` покреће упаковани tarball у изолованом `DATA_DIR` и проверава `/api/health` + `/v1/models` (погледајте [Препоручени поступак за доприносе](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Означавање и издавање

- [ ] Покрените `/generate-release-cc` (Claude Code вештина):
  - Прави ознаку `vX.Y.Z`
  - Прослеђује ознаку и грану
  - Отвара GitHub издање са телом дневника измена
  - Прилаже Electron инсталационе пакете (ако су изграђени)
- [ ] Или ручно:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Постављање

Вештине за постављање користе поједностављени rsync ток — без `npm pack`, без `npm i -g`:

- [ ] Користите вештину за постављање која одговара циљу:
  - `/deploy-vps-local-cc` — локални VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — оба
- [ ] Пре постављања потврдите да је `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Изградња мора да се покрене тамо где је `node_modules` стварни директоријум (главна радна копија или радна копија над којом је покренут `npm ci` — НЕ радна копија са симболичком везом)
- [ ] Спроведите основни тест постављене инстанце:
  - Отворите `/dashboard/health` → проверите да ли ниска верзије одговара издању
  - Покрените `/v1/chat/completions` захтев према познатом добављачу
  - Проверите да ли `/api/monitoring/health` враћа прекидаче кола у стању `CLOSED`
  - Потврдите да MCP транспорти одговарају (`/mcp` HTTP, `/mcp-sse` SSE)

### Након издања

- [ ] Покрените `/capture-release-evidences-cc` (Claude Code вештина)
  - Снима WebP снимке екрана/записе нових функција
  - Прилаже их напоменама о издању / објави на блогу
- [ ] Ажурирајте GitHub Discussions / Discord обавештењем о издању
- [ ] Отворите прекретницу за следећу верзију
- [ ] Ако је критично: закачите дискусију или објавите у `news.json` ради банера у апликацији

### Услов за јавно покретање Radar-а

Обавештење о Radar-у је намерно предато са `active: false`. Активација је засебна
измена након што се документује свака ставка у наставку:

- [ ] Сви наслагани Radar PR-ови су спојени и CI за врх издања је зелен
- [ ] Поставите и спроведите основни тест OSS Radar рута док је `RADAR_ENABLED` и даље подразумевано искључен
- [ ] Тестирајте `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на именованом Radar хосту
- [ ] Забележите идентитет/контакт/адресу оператера и правну проверу коју је власник одобрио у приватној услузи
- [ ] Тестирајте Stripe Checkout и потписани webhook искључиво у тестном режиму
- [ ] Тестирајте једну шифровану испоруку трансакционе е-поште са одобреним пошиљаоцем/доменом
- [ ] Докажите враћање резервне копије и једно надгледано истраживачко покретање са ограниченим буџетом
- [ ] Одобрите смернице за проверу BRL/PIX пре прихватања доказа о донацији
- [ ] Омогућите јавни Checkout тек након претходних услова, а затим активирајте нови `news.json` ID
- [ ] Проверите да почетни банер користи локализовани текст и да се нови ID поново појављује након одбацивања старијег ID-а

## Провера уграђених сервиса (v3.8.4+)

Пре објављивања било ког издања које укључује измене уграђених сервиса, проверите:

### Покретање са новом базом података (открива сукобе миграција — додато након хитне исправке за v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — сачекајте 10 s да се покрене
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` враћа `"9router"` (НЕ 404, НЕ 500). Потврђује да је миграција `071_services.sql` примењена и да је ред унет.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` враћа 3 реда.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` враћа 2 реда (потврђује да је `070_webhooks_kind_metadata.sql` примењена).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` пролази — штити од будућих сукоба.

### 9Router

- [ ] `POST /api/services/9router/install` враћа 200 са `installedVersion` за мање од 2 min
- [ ] `POST /api/services/9router/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/9router/status` пријављује `health: "healthy"`
- [ ] `POST /v1/chat/completions` са `"model": "9router/auto/..."` враћа 200 (усмеравање од почетка до краја кроз 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` приказује изворни кориснички интерфејс 9Router-а унутар проксија (без директног `127.0.0.1:port` iframe-а)
- [ ] `POST /api/services/9router/rotate-key` враћа `{ keyRotated: true }` и сервис се поново покреће без грешака
- [ ] `POST /api/services/9router/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` враћа SSE ток са догађајем `snapshot` који садржи недавне редове
- [ ] Инсталација у окружењу без `npm` у PATH-у враћа 500 са разумљивом поруком о грешци (без трага стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` враћа 200 за мање од 2 min
- [ ] `POST /api/services/cliproxy/start` враћа 200 и `state: "running"` за мање од 30 s
- [ ] `GET /api/services/cliproxy/status` пријављује `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` враћа 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` враћа SSE ток

### Провера безбедносне регресије

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` враћа `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` враћа `403 LOCAL_ONLY`
- [ ] Одговори са грешком из `/api/services/*` не садрже `err.stack` нити апсолутне путање до датотека

## Провере за v3.8.0+

Пре објављивања било ког издања v3.8.x, проверите и следеће ставке:

- [ ] `omniroute --tray` се покреће на macOS-у (systray2 је инсталиран у `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` се покреће на Linux-у (захтева DISPLAY; разумљива грешка ако није подешен)
- [ ] `omniroute --tray` се покреће на Windows-у (PowerShell NotifyIcon, без додатних бинарних датотека)
- [ ] `omniroute config tray enable` прави ставку за аутоматско покретање; онемогућавање је уклања
- [ ] `npm install -g omniroute@<this-version>` извршава postinstall без критичног прекида
- [ ] Путања ажурирања задржава опционе зависности: `omniroute update --apply` и аутоматски програм за ажурирање
      покрећу `npm install -g … --include=optional` како би `optionalDependencies` (better-sqlite3,
      keytar, tls-client и llmlingua SLM стек: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) опстале након ажурирања. Ултра `modelPath` SLM ниво такође захтева
      tinybert модел, који се при првој употреби аутоматски преузима у `${DATA_DIR}/models/llmlingua`. Postinstall
      (`scripts/build/colocateOptionals.mjs`) затим смешта опциони SLM скуп зависности у
      `dist/node_modules` како би worker разрешио ЈЕДНУ инстанцу `@huggingface/transformers` ^4.2.0
      — самостални trace пакети садрже само transformers, а не и динамички увезене
      опционе зависности, па би без овога worker учитао llmlingua-2 са transformers пакетом из корена,
      а SLM ниво би неприметно наставио рад без те функционалности.
- [ ] `omniroute status` ради без `.env` (путања CLI токена, само loopback)
- [ ] `curl http://localhost:20128/api/shutdown` враћа 401 (рута је увек заштићена)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` враћа 401 (loopback заштита)
- [ ] SQLite runtime се при првом покретању разрешава као `bundled` (уграђена бинарна датотека је важећа за платформу)
- [ ] SQLite runtime прелази на `runtime` када се `node_modules/better-sqlite3` избрише
- [ ] Паметни MCP филтер компресује стварни излаз `playwright-mcp browser_snapshot` (смањење ≥50%)
- [ ] Свих 10 датотека `skills/omniroute*/SKILL.md` јавно су доступне преко директног GitHub URL-а
- [ ] Чаробњак за почетно подешавање приказује корак обиласка нивоа „Како функционише“ при новом подешавању
- [ ] Виџет покривености нивоа на почетној контролној табли приказује број конфигурисаних/активних нивоа

---

## 3.9.0 LTS издвајање (увежбано у 3.8.58)

После v3.8.59 следећа верзија је 3.9.0, а њен врх постаје основа за две дуготрајне гране:
`stable/v3` (v3 LTS линија, npm `latest`) и `develop` (v4, подигнута на 4.0.0, npm
`nightly`). Модел грана/канала, прослеђивање измена и ознаке описани су у
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); план се налази у [ROADMAP](../../ROADMAP.md) (фаза 3). Издвајање се обавља једном;
3.8.58 га увежбава од почетка до краја на форку, а 3.8.59 се завршава
[GO/NO-GO контролном листом](./LTS_GO_NO_GO.md).

### Пробно покретање (само за читање, безбедно у сваком тренутку)

```bash
npm run release:dry-run-lts-cut                       # стварно издвајање: 3.9.0 из HEAD, претходна ознака v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # фиксирање изворног комита
```

`scripts/release/dry-run-lts-cut.mjs` не извршава ништа: чита git и `gh` и исписује
цео низ — предуслове (извор се разрешава, претходна ознака постоји, `package.json` има
циљну верзију, отворен је проблем `release-freeze`, нема отвореног проблема `Release branch not green`
на постојећој грани издања — грана која не постоји пријављује `?` непознато, никада
зелено — Mergify ред `release` је конфигурисан (G11: `queue_rules`, `checks_timeout`,
ознака `queue`), скуп правила `release/*` и даље блокира брисање и принудно отпремање, а
`stable/v3` и `develop` још не постоје), два корака за гране, који окидачи неактивних токова посла
и `if:` услови постају истинити (а који остају ограничени променљивом репозиторијума или
фиксирани на канонски репозиторијум), очекиване dist-tags ознаке (`latest` → 3.9.0, `next` и
`nightly` празни) и враћање на претходно стање. Излаз `0` = `RESULT: READY`, `1` = блокирајући предуслов
није испуњен (`✗`), `2` = грешка при употреби. `--advisory <id,...>` своди проверу на упозорење (`!`)
без њеног скривања.

Покрените пробно извршавање стварног издвајања док је замрзавање издања 3.9.0 још увек активно — гране се
праве након ознаке и пре него што фаза 12c укине замрзавање.

### Проба за 3.8.58 (само форк)

```bash
# 1. Пробно покретање на тренутном врху са параметрима за пробу
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Извршавање над удаљеним ФОРКОМ (origin или било који удаљени репозиторијум чији је URL канонски
#    репозиторијум биће одбијен; сваки корак тражи потврду у терминалу)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Испробавање неактивних токова посла у форку (workflow_dispatch тамо где пробно покретање
#    пријављује фиксирање на канонски репозиторијум), а затим враћање на претходно стање
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Комит за подизање верзије на грани develop прави се помоћу git plumbing механизама (радно стабло се не мења) и ажурира
истих пет датотека као комит за отварање циклуса: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Одељак `[4.0.0]`
у CHANGELOG-у и његове i18n копије затим се отварају на грани `develop`, пре њеног првог
PR-а. Скрипта никада не мења npm dist-tags ознаке — њих увежбајте на пробном пакету.

### Артефакт за преглед PR-а (направите једном, унапредите исте бајтове)

`.github/workflows/preview-artifact.yml` прави један продукциони tarball из врха PR-а и
проверава управо ту верзију (#8084 део (a)). Само PR-ови из истог репозиторијума; ништа се не објављује.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или додајте ознаку `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # инсталација верзије за преглед
```

Покретање извршава `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, пакује
tarball, покреће `npm run check:pack-boot` (лажне тајне, привремени директоријум података), поново пакује и
завршава неуспехом ако сажетак није идентичан, а затим бележи `artifact-identity.json` (SHA врха, SHA
основе, хеш lockfile датотеке, платформа, архитектура, node ABI, алат за обједињавање, смернице изградње —
`scripts/release/artifact-identity.mjs`) и потврђује tarball у засебном задатку. Унапређивање
верзије за преглед значи инсталирање тог tarball-а: никада је немојте поново правити из изворног кода.

### Издвајање (3.9.0, након GO)

1. GO је забележен у [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` исписује `RESULT: READY`.
3. Ручно направите гране на `origin` помоћу команди које исписује пробно покретање —
   скрипта одбија отпремање на `origin`. Да бисте поново употребили прегледани develop комит, прво покрените
   `--execute` пробу на врху 3.9.0 над својим форком; она исписује оба SHA-а, а
   исти комити могу да се отпреме:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Заштитите `stable/v3` и `develop` (скупови правила + ред за спајање) пре него што први PR буде спојен.
5. Неактивни токови посла укључују се када грана почне да постоји: `forward-port.yml` (отпремање на
   `stable/v3`), `validate-stable-pr.yml` (PR-ови ка `stable/v3`) и `nightly-v4-build.yml`
   (прави `develop`). Пре пуштања у рад, подесите тајну репозиторијума `secrets.FORWARD_PORT_TOKEN` (како би се CI покретао на
   PR-овима за прослеђивање измена); nightly објављивање остаје искључено док власник не постави променљиву
   репозиторијума `vars.NIGHTLY_PUBLISH` на `true` и док npm Trusted Publishing не прихвати
   `nightly-v4-build.yml`. Разрешавање канала обавља `scripts/release/dist-tag.mjs`, исти
   разрешивач који користи `npm-publish.yml`.
6. Проверите канале: `npm view omniroute dist-tags --json` приказује `latest` = 3.9.0 и нема
   `next` / `nightly` док се v4 не објави.
7. Враћање на претходно стање, ако је потребно: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   и `npm dist-tag add omniroute@3.8.59 latest`.

---

## Vraćanje na prethodnu verziju

Ako izdanje ima kritičan problem:

1. `gh release edit vX.Y.Z --prerelease` (označava ga kao izdanje koje nije najnovije)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (samo ako ga korisnici još nisu usvojili)
3. Ili: hitna ispravka na `release/vX.Y.0` → zakrpljeno izdanje `vX.Y.(Z+1)`
4. Odmah obavestite korisnike putem GitHub Discussions i Discord-a

## Stroga pravila

- Nikada nemojte direktno praviti commit na grani `main`
- Nikada nemojte koristiti `git push --force` na granama `main` ili `release/*`
- Nikada nemojte preskakati Husky hooks (`--no-verify`)
- Nikada nemojte uključivati tajne, pristupne podatke ili `.env` datoteke u commit
- Pokrivenost mora ostati ≥60/60/60/60 (iskazi/linije/funkcije/grane)
- Pri izmeni produkcionog koda u `src/`, `open-sse/`, `electron/` ili `bin/` uvek uključite ili ažurirajte testove

## Automatizovana provera sinhronizacije

Lokalno pokrenite zaštitnu proveru sinhronizacije dokumentacije pre otvaranja PR-a:

```bash
npm run check:docs-sync
```

CI takođe pokreće ovu proveru u `.github/workflows/ci.yml` (lint zadatak).
