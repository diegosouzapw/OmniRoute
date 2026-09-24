# Quality Gates Reference (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Овај документ је меродавна референца за све CI капије квалитета у OmniRoute-у.
Он описује сваку капију, шта она проверава, у оквиру ког CI посла се извршава, да ли користи
референтну основу са механизмом напретка или политику пролаза/пада и да ли блокира израду или је саветодавна.

За кратак резиме и политику листе дозвољених ставки погледајте одељак „Капије квалитета и механизми напретка“
у `AGENTS.md`. За критичку процену, класификацију зрелости и план репликације
истог система који не зависи од конкретних алата, погледајте
[Приручник за капије квалитета](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Инвентар капија (~90 скрипти)

Скрипте се налазе у `scripts/check/` (капије смерница) и `scripts/quality/` (ratchet механизам).
CI извор истине је `.github/workflows/ci.yml`.

### Убрзана путања за release PR-ове (`quality.yml`)

`.github/workflows/quality.yml` се покреће за PR-ове чија је циљна грана `release/**`. Омогућава несметан рад на гранама сарадника помоћу брзих капија филтрираних према путањама, уз један саветодавни сигнал продукционе изградње за измене кода:

| Задатак                                          | Опсег                                                                                                                                                                                                                    | Блокирање                                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Недовршени PR-ови кода и гране Mergify реда; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` са `OMNIROUTE_USE_TURBOPACK=1`; без отпремања артефакта јер га ниједан низводни задатак квалитета не користи | **Саветодавно** (`continue-on-error: true`; уклонити након једне недеље стабилних покретања release PR-ова) |
| `Docs Gates (fast-path)`                         | PR-ови документације/кода; референце API документације и docs-all                                                                                                                                                        | Да                                                                                                          |
| `Fast Quality Gates`                             | PR-ови кода; статичке провере, провера типова, провера типова контролне табле, погођени јединични тестови                                                                                                                | Да                                                                                                          |
| `Forgotten sibling tests`                        | PR-ови кода; праћење измењених модула до статичких потрошача и потенцијалних сродних тестова; путање barrel и динамичког увоза пријављују се као саветодавна дијагностика, уз референциране изузетке са листе дозвољених | **Саветодавно**                                                                                             |
| `Vitest (fast-path)`                             | PR-ови кода; брзи Vitest скуп                                                                                                                                                                                            | Да                                                                                                          |
| `Unit Tests fast-path`                           | PR-ови кода; скуп јединичних тестова у 4 шарда                                                                                                                                                                           | Да                                                                                                          |
| `No new ESLint warnings`                         | PR-ови кода; заштитна lint провера која узима у обзир потискивања                                                                                                                                                        | Да за сопствено порекло, саветодавно за форкове                                                             |
| `Merge integrity (changelog + generated skills)` | Недовршени PR-ови; синхронизација дневника измена и генерисаних вештина                                                                                                                                                  | Да за сопствено порекло, саветодавно за форкове                                                             |

#### Извештај о заборављеним сродним тестовима

`npm run check:forgotten-sibling-tests` поново користи разрешивач увоза који стоји иза мапе утицаја тестова.
За сваки измењени продукциони модул пријављује детерминистичке ланце
`измењени модул/симбол -> статички потрошач -> потенцијални сродни тест` када потенцијални
тест није присутан у разлици pull request-а. Markdown сажетак и JSON резултат чувају се као
артефакт тока рада `forgotten-sibling-tests` ради калибрације пре било каквог увођења блокирања.

Barrel поновни извози и динамички увози служе само за дијагностику разрешавања; они никада не стварају
блокирајући налаз. Прегледани изузеци налазе се у
`config/quality/forgotten-sibling-allowlist.json`. Сваки унос мора да наведе потрошача и потенцијални
тест, пружи конкретно образложење и садржи везу до GitHub issue-а или pull request-а. Неисправно
формирани уноси подразумевано изазивају неуспех. Изузеци не могу да потисну обрисани потенцијални тест нити разлику која додаје `.skip`/`.todo`;
слабљење тврдњи и остало маскирање остају у надлежности независне блокирајуће
капије `check:test-masking`.

### Задатак: `lint`

Покреће се за сваки PR ка `main`. Неуспех блокира спајање.

| Скрипта (`npm run ...`)           | Проверава                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Блокирајуће                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | Верзија Node.js-а је у подржаном опсегу                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:cycles`                    | Цикличне увозе — сви модули у `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:route-validation:t06`      | Zod шеме су присутне на свим рутама (смернице нивоа 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                          |
| `check:any-budget:t11`            | Број `@ts-expect-error // any` не премашује дозвољени праг (контролни механизам нивоа 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                          |
| `check:provider-consistency`      | Сваки провајдер у `providers.ts` има одговарајући унос у `providerRegistry.ts` (и обрнуто, у оквиру листе дозвољених)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Да                                          |
| `check:model-lifecycle`           | Три ручно одржаване табеле рутирања остају усклађене са снимком животног циклуса који је укључен у репозиторијум (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не бодује ниједан повучени id који `REGISTRY` може да рутира; сваки циљ из `BUILT_IN_ALIASES` присутан је у `REGISTRY` и одсутан из снимка повучених id-јева; сваки повучени id који је још увек у `REGISTRY` прослеђује се или је наведен у `allowedRetiredInCatalog`; и ниједан извор или циљ из `DEFAULT_DEGRADATION_MAP` није означен као повучен у том снимку. Ово не доказује да активни спољни добављач тренутно опслужује модел. Ван мреже — пореди са `config/quality/model-lifecycle.json`, који се ручно освежава помоћу `npm run quality:refresh-model-lifecycle` (захтева мрежу; није повезано са CI-јем). `allowedRetiredInCatalog` је једносмерни механизам постепеног смањивања: додајте унос само уз проблем за праћење. | Да                                          |
| `check:fetch-targets`             | Сваки `fetch("/api/...")` у клијентском `src/` разрешава се на стварни `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                          |
| `check:deps`                      | Све зависности које се могу инсталирати помоћу `npm install` у сваком `package.json` у репозиторијуму налазе се у `dependency-allowlist.json`; нови непиновани пакети или пакети са називима налик постојећим пакетима означавају се                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                          |
| `audit:deps`                      | `npm audit` (корен + electron) — нема упозорења високог/критичног нивоа (преклапа се са osv `check:vuln-ratchet`; погледајте Заостатак за рационализацију)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                          |
| `check:lockfile`                  | Интегритет датотеке `package-lock.json` — https регистар, хешеви интегритета, без замене хостова                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                          |
| `check:licenses`                  | SPDX листа дозвољених лиценци за продукционе зависности                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                          |
| `check:tracked-artifacts`         | Нема артефаката изградње / комитованих `node_modules` симболичких веза (такође се покреће у husky pre-commit; pre-push је намерно олакшан — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:ai-attribution`            | Нема AI/bot `Co-Authored-By` завршног реда нити напомене о AI генерисању у PR комитовима, наслову или телу — строго правило #16 (у `quality.yml` fast-gates петљи за PR→`release/**` — чита садржај догађаја, не ради ништа ван PR-ова — и корак само за PR у `ci.yml` lint-у за PR→`main`; такође husky `commit-msg` hook; људски коаутори су дозвољени; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:vitest-exclusions`         | Свако Vitest изузеће наводи issue за праћење и налази се у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                          |
| `check:file-size`                 | Ниједна изворна датотека не премашује ограничење за одговарајућу екстензију (ratchet: замрзнуте велике датотеке на листи `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:error-helper`              | Одговори о грешкама у executor-има/handler-има користе `buildErrorBody()` / `sanitizeErrorMessage()` (строго правило #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                          |
| `check:migration-numbering`       | Migration SQL датотеке су нумерисане редом, без празнина или дупликата                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Да                                          |
| `check:public-creds`              | Нема дословних OAuth `client_id`/`client_secret` вредности нити Firebase Web кључева изван `publicCreds.ts` (строго правило бр. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                          |
| `check:db-rules`                  | Нема необрађеног SQL-а изван модула `src/lib/db/`; нема збирних увоза из `localDb.ts` (строга правила бр. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Да                                          |
| `check:known-symbols`             | Извршиоци добављача, стратегије рутирања и преводиоци регистровани у својим табелама за распоређивање одговарају датотекама на диску — нема неповезаних или недекларисаних симбола                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                          |
| `check:route-guard-membership`    | Свака рута која покреће подређени процес класификована је помоћу `isLocalOnlyPath()` (строга правила бр. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:test-discovery`            | Сваку `*.test.ts` / `*.spec.ts` датотеку у репозиторијуму прикупља најмање један покретач тестова (механизам са затезачем: листа неповезаних датотека у `test-discovery-baseline.json` може само да се смањује)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                          |
| `check:agent-skills-sync`         | Generisani agent-skills artefakti odgovaraju svom izvornom katalogu (bez odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Logotipi/resursi provajdera imaju evidentiran zapis o poreklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `lint:json`                       | JSON konfiguracione datoteke se parsiraju i zadovoljavaju pravila lintovanja repozitorijuma                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                          |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmeren na budućnost; mnoga već postojeća mesta poziva i dalje zahtevaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Savetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabrana lista od 27 datoteka komande `typecheck:core` ne uključuje nijedan dashboard TSX, a ni `next build` ga nikada ne proverava po tipovima (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije sa identifikatorima bez definicije tamo (#6625/#6909) bile nevidljive za CI. Razlike se porede sa zamrznutom osnovom broja grešaka po datoteci/TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac nametanja bez zastarelih stavki kao kod `check:known-symbols`) — samo NOVE greške iznad osnovnog broja dovode do neuspeha kontrole; smanjite osnovu pomoću `--update` kada se ispravi već postojeća greška.                                                                                                                                                                            | Da                                          |

### Posao: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje u slučaju neuspeha.

| Скрипта                      | Проверава                                                                                                                                                                             | Блокирајуће                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Генерише `quality-metrics.json` (број ESLint упозорења, покривеност из обједињеног извештаја делова)                                                                                  | Да (претходи механизму ratchet) |
| `quality:ratchet`            | Ниједна метрика у `quality-baseline.json` није назадовала (ESLint упозорења ≤ основна вредност; покривеност ≥ основна вредност)                                                       | Да                              |
| `check:duplication`          | Дуплирање кода (jscpd@4) не премашује основну вредност у `quality-baseline.json`                                                                                                      | Да                              |
| `check:complexity`           | Цикломатска сложеност на нивоу датотеке не премашује горњу границу (основни ESLint `complexity` + `max-lines-per-function`)                                                           | Да                              |
| `check:cognitive-complexity` | Ratchet когнитивне сложености (`eslint-plugin-sonarjs`) — засебно ESLint извршавање; CI оба обједињује у један корак `check:complexity-ratchets`                                      | Да                              |
| `check:dead-code`            | Ratchet некоришћених извоза / датотека (knip) не назадује у односу на основну вредност                                                                                                | Да                              |
| `check:compression-budget`   | Буџет мерила перформанси компресије — минималне уштеде токена по механизму не смеју назадовати                                                                                        | Да                              |
| `check:type-coverage`        | Ratchet процента типизираног кода (`type-coverage`) не назадује; у великој мери обухвата `typecheck:noimplicit:core`                                                                  | Да                              |
| `check:codeql-ratchet`       | Број отворених CodeQL упозорења не назадује (чита се преко `gh api`; контролисано прескакање без токена) — учесталост освежавања и ручно покретање: погледајте „CodeQL ratchet“ испод | Да                              |

### Посао: `quality-extended`

Цео посао је саветодаван (`continue-on-error: true`). Ratchet провере засноване на npm-у заиста се извршавају; спољни скенери се инсталирају преко `gh release download` и самостално прескачу проверу (излазни кôд 0) када бинарна датотека и даље није присутна.

| Скрипта                  | Проверава                                                                                                                                                                                                        | Блокирајуће     |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:circular-deps`    | Нема кружних зависности (dpdm)                                                                                                                                                                                   | **Саветодавно** |
| `check:bundle-size`      | Величина пакета не премашује горњу границу                                                                                                                                                                       | **Саветодавно** |
| `check:secrets`          | Скенирање тајни (gitleaks) — прескаче се ако бинарна датотека није присутна                                                                                                                                      | **Саветодавно** |
| `check:vuln-ratchet`     | Рањивости зависности (osv-scanner) не назадују — прескаче се ако бинарна датотека није присутна                                                                                                                  | **Саветодавно** |
| `check:workflows`        | Провера радних токова (actionlint + zizmor) — прескаче се ако бинарне датотеке нису присутне                                                                                                                     | **Саветодавно** |
| `check:openapi-breaking` | Неусклађене промене јавног API уговора (`openapi.yaml`) у односу на основну грану (oasdiff) — генерише `openapiBreaking=N`; прескаче се ако oasdiff није присутан или се основна спецификација не може разрешити | **Саветодавно** |

### Посао: `docs-sync-strict`

Извршава се за сваки PR ка грани `main`. Блокира спајање у случају неуспеха.

| Скрипта                        | Проверава                                                                                                                                                                                     | Блокирајуће                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Мета-капија која редом покреће 6 поткапија наведених испод                                                                                                                                    | Да                            |
| ↳ `check:docs-sync`            | Усклађеност верзија у CHANGELOG-у / OpenAPI-ју / llm.txt-у                                                                                                                                    | Да                            |
| ↳ `check:docs-counts`          | Бројеви у тексту (број добављача, број миграција итд.) налазе се у оквиру прозора са механизмом зупчаника у односу на стварне вредности                                                       | Да                            |
| ↳ `check:env-doc-sync`         | Свака променљива окружења из `.env.example` документована је у табели документације и обрнуто                                                                                                 | Да                            |
| ↳ `check:deprecated-versions`  | У документацији нема ниски застарелих верзија                                                                                                                                                 | Да                            |
| ↳ `check:doc-links`            | Интерне markdown везе у документацији воде до стварних датотека (облик `[текст]`/`(путања)`)                                                                                                  | Да                            |
| ↳ `check:fabricated-docs`      | Руте, променљиве окружења, CLI команде, називи кука и путање датотека наведени у документацији постоје у бази кода. Строга капија преко `--strict`; без те заставице грешка није блокирајућа. | Да (преко `--strict` у CI-ју) |
| `check:cli-i18n`               | Ниске CLI команди присутне су у свим i18n датотекама локализације                                                                                                                             | Да                            |
| `check:openapi-coverage`       | OpenAPI спецификација покрива најмање праг стварних рута који се постепено повећава                                                                                                           | Да                            |
| `check:openapi-security-tiers` | Ознаке безбедносних нивоа у `openapi.yaml` усклађене су са класификацијама из `routeGuard.ts`                                                                                                 | **Саветодавно**               |
| `check:openapi-routes`         | Свака путања у `openapi.yaml` води до стварног `route.ts` (спречавање халуцинација)                                                                                                           | Да                            |
| `check:docs-symbols`           | Свака референца `/api/...` у `docs/**/*.md` води до стварног `route.ts` (спречавање халуцинација)                                                                                             | Да                            |
| `i18n translation drift`       | Непреведени кључеви у i18n датотекама локализације — само упозорење                                                                                                                           | **Саветодавно**               |

### Задатак: `i18n-ui-coverage`

| Скрипта                             | Проверава                                                                                                                                                                                                                 | Блокирајуће     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (уграђено) | Покривеност UI i18n кључева је ≥ 65%                                                                                                                                                                                      | Да              |
| `check-ui-value-drift` (уграђено)   | Измењена енглеска **вредност** не оставља за собом застарели превод                                                                                                                                                       | Да              |
| `check-new-key-coverage` (уграђено) | **Нови** енглески кључ преведен је у свакој локализацији — маркер `__MISSING__:` није дозвољен                                                                                                                            | Да              |
| `check-translation-ratio`           | Однос стварних превода по локализацији (листови идентични енглеском / резервисане вредности / листови који недостају ван листе дозвољених) не сме премашити `config/quality/i18n-translation-baseline.json` + толеранцију | **Саветодавно** |

Захтева `fetch-depth: 0` — капија за одступање вредности пореди `en.json` са базом спајања.

#### `check-ui-value-drift` — капија за застареле преводе

Открива ону i18n регресију коју друге капије структурно не могу да уоче: енглеска вредност
се измени, а преводи изведени из _претходне_ енглеске верзије остану непромењени, па
корисници који не говоре енглески настављају да читају самоуверено формулисан, али сада нетачан текст.

Ово је заиста стигло у продукцију. `oauthModal.googleOAuthWarning` је измењен када је додат Antigravity
помоћник за пријављивање (#5203); **39 од 43 локализације** задржало је текст који оператерима говори да „копирају
цео URL и налепе га испод“ — ток који се за тог добављача не може довршити. То је
остало непримећено све до #8463 јер:

- `sync-ui-keys` допуњава само кључеве који су **одсутни**, никада оне који су **застарели**;
- `check-ui-keys-coverage` броји _присуство_ кључева, па се застарели превод рачуна као покривен;
- `check-translation-drift` прати документационе пресликане датотеке `docs/i18n/<locale>/**.md` —
  никада не чита `src/i18n/messages/*.json`. Блокирајуће у задатку `docs-sync-strict` од
  поновне синхронизације 2026-09: измените основни документ → `npm run i18n:run -- --files=<doc>` (на нивоу одељка, брзо).

**Узима у обзир разлике, без ослањања на референтну основу.** Пореди `en.json` у бази спајања са
радним стаблом; за сваки кључ чија је енглеска вредност промењена, застарео је сваки локалитет који и даље садржи
неизмењен превод. Ово намерно **замрзава постојећи дуг** — разлика
не може да открије из које старе енглеске вредности потиче дуготрајни превод, па провера оцењује
само оно што тренутна измена обухвата. Алтернатива (референтна основа са хешом за сваки кључ) захтевала би
генерисану датотеку од ~600 KB, 3× већу од највеће постојеће референтне основе, која би се мењала при сваком i18n PR-у.

Постоје два начина да се провера задовољи:

1. ажурирајте обухваћене преводе или
2. поставите их на `__MISSING__:<new english>` — окружење за извршавање тада испоручује исправљени енглески
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а кључ улази у ред за превођење.

Ако се променило **значење** ниске, пожељно је **преименовати кључ**: нови кључ не може да наследи
застарео превод. Тај образац је коришћен у #8463.

```bash
npm run i18n:check-value-drift          # строго (оно што CI покреће)
npm run i18n:check-value-drift:warn     # само извештај
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завршава се кодом 0 уз `SKIP reason=base-unresolved` када основни каталог не може да се прочита (плитко
клонирање без основне референце), по узору на `check-openapi-breaking`.

### Задатак: `i18n`

Пуна матрица i18n провере (један задатак по локалитету). Цео задатак је саветодаван.

| Скрипта                         | Проверава                       | Блокирање                                                  |
| ------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Потпуност превода по локалитету | **Саветодавно** (`continue-on-error: true` за цео задатак) |

### Задатак: `pr-test-policy`

Покреће се само за захтеве за повлачење.

| Скрипта                | Проверава                                                                                                                                    | Блокирање |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-ови који мењају продукциони кôд у `src/`, `open-sse/`, `electron/` или `bin/` морају да укључе или ажурирају тестове (Строго правило #8)  | Да        |
| `check:test-masking`   | Измењене тест-датотеке не смањују укупан нето број тврдњи нити додају таутологије `assert.ok(true)`                                          | Да        |
| `check:pr-evidence`    | Тело PR-а наводи доказе из тестирања/VPS-а за измену (аутоматизује Строго правило #18 претраживањем текста PR-а — крхко, погледајте Backlog) | Да        |

### Задатак: `test-vitest`

Покреће се након `build`. У случају неуспеха блокира спајање.

| Скуп тестова     | Проверава                                                | Блокирање                                                                                                           |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP сервер (110 алата), autoCombo, кеш — vitest покретач | Да                                                                                                                  |
| `test:vitest:ui` | Тестови UI компоненти — vitest покретач                  | **Блокира** — постојећи неуспешни тестови су изричито искључени у `vitest.config.ts`; нови неуспеси обарају задатак |

### Ноћни токови рада (планирани, саветодавни)

Покрећу се према cron распореду (и путем `workflow_dispatch`), никада за PR-ове. Сви су саветодавни.

| Ток рада               | Проверава                                                                                                                                                      | Блокирање       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check тестови својстава са насумичним почетним бројем + великим бројем покретања                                                                          | **Саветодавно** |
| `nightly-resilience`   | провера раста heap-а, убризгавање кварова ради тестирања хаоса, k6 тестирање оптерећења/дуготрајног рада                                                       | **Саветодавно** |
| `nightly-llm-security` | promptfoo заштита од убризгавања (режим блокирања) + garak сонде (прескачу се без тајне добављача)                                                             | **Саветодавно** |
| `nightly-schemathesis` | OpenAPI фузинг уговора (schemathesis) над активним OmniRoute-ом помоћу `docs/openapi.yaml` — открива кршења спецификације / необрађене грешке 500 (Фаза 8 B.4) | **Саветодавно** |
| `nightly-mutation`     | Stryker резултат мутационог тестирања над брзом путањом јединичних тестова — преживели мутанти откривају слабе тврдње                                          | **Саветодавно** |
| `nightly-compat`       | матрица компатибилности Node окружења у свим подржаним опсезима `engines.node`                                                                                 | **Саветодавно** |

---

## Фаза убрзања (2026-08-30 → v4.0 LTS): свака основна граница ублажена је за 20%

Одлука власника (2026-08-30): до модуларизације у v4.0, брзина испоруке важнија је
од задржавања техничког дуга на постојећем нивоу. Свака **нумеричка** основна граница механизма постепеног пооштравања ублажена је за 20% у једном
проверљивом пролазу, а фаза је декларисана у `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Шта је промењено                                                                                                                                                                                                     | Где                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — бројеви код којих је ниже боље ×1.2, проценти код којих је више боље ÷1.2 (минимална покривеност 60 је задржана, `eslintErrors` остаје 0, `eslintWarnings` 0 → 20% замрзнутог броја потискивања) | `quality-baseline.json` (напомена `_relax_velocity_2026_08_30` наводи сваку вредност пре → после)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ограничење броја линија за сваки `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                | `file-size-baseline.json`                                                                              |
| бројеви по датотеци / по TS коду ×1.2                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` постаје саветодавна провера док је `_policy.requireTighten === false`                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| ноћни `bank-ratchet-shrinks` се паузира (иначе би забележио измерено смањење и поништио расположиву резерву)                                                                                                         | `.github/workflows/nightly-release-green.yml`                                                          |

Листе дозвољених изузетака (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **нису** буџети и нису мењане. Контролне тачке политике са исходом пролаз/пад (тајне, SQL правила,
уговор документације/окружења, i18n паритет, јединични тестови) нису промењене — неуспешан тест је и даље неуспешан тест.

**Алати**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — једнократно
  ублажавање (`scripts/quality/relax-baselines.mjs`); одбија да се покрене двапут са истом
  напоменом.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  мери сваку нумеричку контролну тачку на исти начин као CI и приказује преосталу резерву за сваку контролну тачку
  (`scripts/quality/baseline-headroom.mjs`). Ноћни задатак `baseline-headroom` објављује
  табелу у активној пријави проблема **📈 Преостала резерва основних граница (фаза убрзања)** и додаје
  ознаку `headroom-alert` када је било која контролна тачка на највише 10% од своје горње границе или ју је већ прекорачила. Та пријава
  служи као рано упозорење: буџет који се попуни за неколико дана значи да ублажавање троши
  неколико PR-ова, а не цео тим — погледајте напомене `_rebaseline_*` проблематичне контролне тачке.

**Режим новог кода (Clean-as-You-Code) — од 2026-08-30, само брза путања за PR**

За догађаје `pull_request`, `quality.yml` прослеђује `--base-ref <PR base SHA>` командама `check:file-size`,
`check:complexity-ratchets` и `check:dead-code`. У том режиму контролна тачка пореди HEAD са
заједничким претком **ограничено на датотеке које је PR изменио** (`scripts/check/newCodeMode.mjs`:
заједнички предак се материјализује у привременом `git worktree`, ESLint/knip се покрећу тамо и над HEAD-ом, а
бројеви по датотеци се пореде):

- **блокирајуће** — PR је додао прекорачења цикломатске/когнитивне сложености или неискоришћене извезене симболе у датотекама које је изменио
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` у евиденцији);
- **саветодавно** — глобални укупан број у односу на замрзнуту основну границу. Наслеђено одступање никада не обара
  PR који га није изазвао; одступање се поново замрзава током усаглашавања издања и надгледа га задатак за праћење резерве.

Покретања `workflow_dispatch`, провера спремности издања и ноћни задатак за праћење резерве немају PR основу
и задржавају апсолутно (глобално) поређење. Покривеност, дуплирање и покривеност типовима за сада остају глобални
(њихови алати не могу јефтино да произведу разлику по датотеци) — кандидати су за исти третман.

**Затварање фазе у v4.0 (LTS = строже него раније, а не „повратак у нормалу“)**

1. На чистом врху гране `release/v4.0.0`: покрените `npm run quality:headroom --json` ради евиденције, а затим
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, као и
   `--update` за сваку typecheck контролу — свака основна вредност се спушта на измерену вредност.
2. Избришите `_policy` из `quality-baseline.json` (поново активира `--require-tighten` и ноћно
   чување), вратите `THRESHOLD = 36` (или више) у `check-openapi-coverage.mjs`.
3. Пооштрите вредности испод измерених тамо где се модуларизација исплатила: вратите `cap` за величину датотеке на 1000
   (или 800), повећајте минималне прагове покривености за 5, а број некоришћених извоза поставите на 0 за модуларизоване пакете.

## Основна вредност механизма чегртаљке (`quality-baseline.json`)

Механизам чегртаљке (`scripts/quality/check-quality-ratchet.mjs`) чита `quality-baseline.json`
и пореди га са управо прикупљеним `quality-metrics.json`. Свака метрика која назадује
више од свог епсилона доводи до неуспешне изградње.

Метрике које се тренутно прате:

| Метрика               | Смер   | Значење                               |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Број ESLint упозорења не сме да расте |
| `coverage.statements` | `up`   | Покривеност наредби не сме да опадне  |
| `coverage.lines`      | `up`   | Покривеност линија не сме да опадне   |
| `coverage.functions`  | `up`   | Покривеност функција не сме да опадне |
| `coverage.branches`   | `up`   | Покривеност грана не сме да опадне    |

Да бисте ажурирали основну вредност након стварног побољшања:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Ознака `--update` уписује тренутно измерене вредности у `quality-baseline.json`.
Укључите ову датотеку у исти комит са изменом која је побољшала метрику. PR који побољша
метрику без ажурирања основне вредности биће откривен помоћу `--require-tighten` (Фаза 6A.5,
имплементација је у току).

### CodeQL чегртаљка: учесталост освежавања и ручно покретање

`check:codeql-ratchet` чита **стање репозиторијума које се освежава по распореду — не за сваки PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` пријављује
`state: configured`, `schedule: weekly`: GitHub скенирање са подразумеваним подешавањем, а не анализу
при сваком слању измена. Последица: након спајања PR-а који ИСПРАВЉА упозорења, чегртаљка наставља да чита
стари, већи број све док се не покрене следеће заказано скенирање — па пријављује назадовање
на сваком отвореном PR-у, укључујући и накнадне измене самог PR-а са исправком, све док скенирање не ажурира стање.

**Ручно освежавање**: `gh workflow run codeql.yml --ref release/vX.Y.Z` поново покреће
анализу и за неколико минута поново објављује упозорења. Прво прочитајте `.github/workflows/codeql.yml`
— његово заглавље објашњава да користи само `workflow_dispatch` **зато што је у сукобу са
GitHub-овим „подразумеваним подешавањем“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Враћање окидача `push`/`pull_request`/
`schedule` најпре захтева **радњу власника**: Settings → Code security →
CodeQL: Default → Advanced. Немојте додавати окидач `schedule:` без тог пребацивања — то
ће само произвести неуспешна покретања.

**Пооштрите основну вредност након што број опадне** — `node scripts/check/check-codeql-ratchet.mjs
--update` уписује нови измерени број у `quality-baseline.json` →
`metrics.codeqlAlerts.value`, тако да чегртаљка прећутно не дозволи назадовање до
старе горње границе. Практичан пример (2026-09-02/03): PR #12502 исправио је 7 стварних упозорења
(13 → 6 измерених отворених); PR #12530 пооштрио је замрзнуту основну вредност са 11 → 6 како би се подударала; преосталих
6 упозорења је затим одбачено уз појединачна образложења, чиме је број отворених упозорења сведен на 0.

**Одбацивање је одлука оператера (Строго правило #14)** — никада немојте одбацити CodeQL упозорење
без навођења техничког образложења у коментару о одбацивању: `won't fix` за
захтев надређеног протокола, `used in tests` за тестни фикстур, `false positive`
за санитизатор који CodeQL не може да препозна (преседан: `docs/security/ERROR_SANITIZATION.md`).

---

## Политика поновног покретања тестова (WS5.4, v3.8.49)

Поновно покретање се подешава по покретачу тестова, никада као глобално правило — глобално поновно покретање претвара стварне регресије
у невидљиве нестабилности:

| Покретач              | Политика                                                                                                                                     | Зашто                                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)      | `retries: 1` само у CI-ју, са `trace: on-first-retry`                                                                                        | Временски односи у прегледачу/мрежи заиста су недетерминистички; једно поновно покретање са трагом претвара нестабилност у артефакт погодан за дијагностику |
| Vitest                | БЕЗ глобалног поновног покретања. Доказано нестабилан тест добија изричито поновно покретање по тесту (видљиво у разлици, прегледано у PR-у) | Задржава списак изолованих тестова у репозиторијуму, тако да никада није непрозиран                                                                         |
| node:test (јединични) | БЕЗ поновног покретања, икада                                                                                                                | Нестабилан јединични тест је грешка у тесту — исправите га, немојте га само поново покретати                                                                |

Циљни SLO-ови након што телеметрија нестабилности буде уведена (WS5.2/5.3): стопа нестабилности <1% по тесту
(праг „исправити одмах“), стопа пролазности ≥95% по цевоводу. Референтне вредности из индустрије —
поново их калибрисати на основу наших мерења.

## Одступање чегртаљке на нивоу издања (WS5.5, v3.8.49)

Када чегртаљка (величина датотеке, сложеност, eslint упозорења) назадује на ЧИСТОМ врху издања
— тј. КОМБИНАЦИЈА спајања изазива назадовање, а ниједан појединачни PR не репродукује
регресију на сопственој грани — исправка припада **капетану издања, једнократно, на
грани издања**: предност дати издвајању/рефакторисању; поновно постављање основне вредности дозволити само уз документовани
унос образложења. Никада не пребацујте комбиновано одступање на PR сарадника и никада
не постављајте основну вредност поново за сваки PR (то скрива стварне регресије). Прво утврдите разлику: репродукујте
неуспех на чистом врху у пробном радном стаблу пре него што претпоставите да га је ваш PR изазвао.

## Бележење смањења чегртаљке — смер наниже (#8584)

Чегртаљка је само напола аутоматска, и то погрешна половина. **Повећање** ограничења је
ручна измена JSON-а која траје десет секунди и најбржи је начин да се одблокира неуспели PR.
**Смањење** захтева да неко покрене `--update` и комитује резултат — а док
задатак `bank-ratchet-shrinks` није уведен, ниједан ток рада га није покретао. Измерена последица
(2026-07-25): 18 замрзнутих датотека већ је било на ограничењу од 800 редова за нове датотеке или испод њега, а најгори
случај био је 132× (`src/shared/validation/schemas.ts`, 19 редова са ограничењем од 2,523);
горња граница сложености порасла је `1794 → 2169` кроз ~37 напомена о поновном постављању основне вредности, уз тачно једно
смањење (−1); а „пооштрити помоћу `--update` у следећем циклусу“ написано је 31 пут и испоштовано
једном. Ограничење које надживи кôд због којег је уведено неприметно претвара свако завршено
разлагање у дозволу за раст ономе ко следећи буде уређивао датотеку.

`nightly-release-green.yml` → задатак **`bank-ratchet-shrinks`** затвара ту петљу:

|               |                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Покреће се на | `schedule` (3×/дан) + `workflow_dispatch` — намерно **не** на `push`                                             |
| Мери          | највиши `release/vX.Y.Z`, са истим разрешавањем + заштитом од убацивања као `release-green`                      |
| Уписује       | `check:file-size --update` и `check:complexity-ratchets --update` (оба по конструкцији дозвољавају само смањење) |
| Проверава     | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Испоручује    | један увек ажуран PR према грани издања — принудно ажуриран, без стварања нежељене буке                          |

Бележење се обавља групно, уместо при сваком слању измена, јер нема захтев у погледу кашњења (смањење
забележено у року од 8 сати је прихватљиво), док би покретање при сваком спајању више пута поново изградило PR грану
током кампања спајања и сваки пут платило цену потпуног ESLint пролаза. Откривање остаје при
слању измена (`release-green`); само се бележење обавља групно.

### Безбедносни проверивач

Задатак без надзора уписује у основне вредности, па `verify-ratchet-bank.mjs` то чини
прихватљивим. Он пореди стабло после `--update` са `HEAD` и **прекида задатак
пре него што било који комит постоји** — без отварања PR-а — осим ако је свака измена једна од следећих:

- нумерички унос `frozen` / `testFrozen` је **смањен** или **уклоњен**
- `complexity-baseline.json` → `count` је **смањен**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` је **смањен**

Све остало доводи до неуспеха: повећање броја, додавање уноса, мењање `cap`/`testCap` или
брисање/преписивање напомене `_rebaseline_*` (те напомене су ревизијски траг који објашњава зашто свака
горња граница постоји и чувају се унутар истог објекта `frozen` као и уноси датотека).
Бот који би могао да повећа ограничење био би строго гори од постојећег стања. Заштита од регресије:
`tests/unit/verify-ratchet-bank.test.ts`.

Задатак никада не шаље измене у `release/*` — човек спаја PR, тако да погрешно мерење
не може бити прихваћено без прегледа.

## Политика листе дозвољених изузетака

Свака контрола која не може да падне због већ постојећих прекршаја користи замрзнуту листу дозвољених изузетака
(нпр. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Политика гласи:

**Отклоните основни узрок; користите листу дозвољених изузетака само када је прекршај већ постојао и
не може бити отклоњен у истом PR-у.**

При додавању ставке на листу дозвољених изузетака:

1. Укључите коментар са образложењем.
2. Наведите проблем за праћење (нпр. `// #3498 — Функционалност из фазе 2, још није имплементирана`).
3. Уклоните ставку у истом PR-у који отклања прекршај — застарела ставка која више
   не потискује активан прекршај и сама представља дефект (6A.3 провера застарелих правила ће,
   када буде имплементирана, оборити контролу због напуштене ставке на листи дозвољених изузетака).

**Немојте** додавати ставке на листу дозвољених изузетака да би тестови брже прошли. Зелена контрола уз све већу
листу дозвољених изузетака ствара лажан осећај квалитета.

### Када контрола падне на вашем PR-у

1. **Пажљиво прочитајте излаз контроле** — он вам тачно говори која датотека или симбол крши
   правило.
2. **Отклоните прекршај** — већина контрола су детерминистичке провере система датотека које пролазе чим
   код буде исправан.
3. **Ако је прекршај већ постојао** (тј. нисте га ви увели, али га контрола сада
   обухвата): додајте ставку на листу дозвољених изузетака са коментаром образложења и проблемом за праћење.
4. **Ако је контрола запорна** (покривеност, ESLint упозорења, дуплирање, сложеност):
   ваша измена је погоршала метрику. Отклоните основни проблем или (ретко) покрените
   `npm run quality:ratchet -- --update` ако је измена намерна и погоршање метрике
   прихватљиво — али у опису PR-а документујте зашто.
5. **Саветодавне контроле** (`continue-on-error: true`) су информативне — не блокирају
   спајање, али се појављују у CI резимеу. Ипак их исправите.

---

## Додавање нове контроле

1. Направите `scripts/check/check-<name>.mjs` (или `.ts`). Контроле политика завршавају се кодом 0/1.
   Запорне контроле уписују метрику у `quality-metrics.json` преко `collect-metrics.mjs`.
2. Додајте `"check:<name>": "node scripts/check/check-<name>.mjs"` у `package.json`.
3. Повежите је у `.github/workflows/ci.yml` у оквиру одговарајућег посла
   (политика → `lint` или `docs-sync-strict`; запорна контрола → `quality-gate`).
4. Ако има листу дозвољених изузетака, примените `reportStaleEntries()` из
   `scripts/check/lib/allowlist.mjs` како би се застареле ставке аутоматски откривале.
5. Напишите тест у `tests/unit/build/` који покрива логику откривања те контроле.
6. Ажурирајте овај документ (додајте ред у одговарајућу табелу послова).

---

## Алатке за агенте: LSP-in-the-loop (опционо)

Поред CI контрола, OmniRoute испоручује **опциони** `agent-lsp` оквир
(пројектни `.mcp.json`, Фаза 7, задатак 15). Направите `.mcp.json`
како бисте агентима за програмирање изложили TypeScript језички сервер, тако да разреше симболе /
дијагностику **пре** писања кода — пратећи механизам за компајлирање пре изношења тврдњи уз
`typecheck:core`, који отклања грешке „измишљених симбола“ на самом извору. Намерно се
не учитава аутоматски (ви бирате и проверавате MCP↔LSP мост); неисправна ставка само бележи
грешку при повезивању и никада не прекида сесије.

---

## Заостатак рационализације (преглед ROI — фаза 9, талас 3)

Овај инвентар је усклађен са `ci.yml` 2026-06-17 (претходна верзија је изоставила
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Преглед ROI усклађеног скупа
идентификовао је следеће кандидате за рационализацију. **Спајања су механичке CI
измене; промене статуса/уклањања су одлуке о политици резервисане за оператера.** Ништа од наведеног
још није примењено.

**Такође није документовано изнад** (саветодавно, слаб сигнал): посао `docs-lint`
(markdownlint + Vale, цео посао има `continue-on-error`) и самостални токови рада скенера
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` се налази у
`quality-baseline.json`, али није повезан са блокирајућим прагом у `ci.yml` — метрика је
тренутно неповезана.

### Спајање / уклањање дупликата (механички, мањи ризик)

Сваки кандидат је проверен у односу на актуелно стање контролних механизама 2026-06-17 (веруј, али провери);
испоставило се да неколико „очигледних“ спајања скрива технички дуг и **нису** директне замене без додатних измена.

- **`check:docs-sync` се покреће двапут** — самостално у послу `lint`, а затим поново унутар `check:docs-all` (`docs-sync-strict`) и husky pre-commit куке. ✅ **ЗАВРШЕНО** — самостално позивање у оквиру `lint` је уклоњено.
- **CVE скенирање** — ❌ **НИЈЕ чисто спајање.** `audit:deps` безусловно пада за сваки CVE високог/критичног нивоа; `check:vuln-ratchet` (osv) пада само при _регресији_ у односу на основну вредност (тренутно 1 MODERATE). Различита семантика — уклањањем `audit:deps` изгубила би се апсолутна контрола за високи/критични ниво. Задржати оба.
- **Откривање циклуса** — ❌ **НИЈЕ чисто спајање.** `check:circular-deps` (dpdm) пријављује **91 циклус** (због тога је саветодаван); не може постати блокирајући пре него што се они реше, а има и шири опсег од успешног, пажљиво одабраног `check:cycles`. Задржати `check:cycles` као блокирајући; решавање 91 dpdm циклуса представља засебну ставку заостатка.
- **Сложеност** — ✅ **ЗАВРШЕНО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): један ESLint пролаз, бројање по ruleId тако да основне вредности за цикломатску сложеност+максималан број линија и когнитивну сложеност остану независне; појединачне провере `check:complexity` / `check:cognitive-complexity` остају за локално покретање са `--update`.
- **Спречавање халуцинација за `/api`** — ✅ **ЗАВРШЕНО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): један FS инвентар директоријума `src/app/api`, openapi-routes + docs-symbols и даље извештавају независно; појединачне провере остају за локална покретања.
- **`check:node-runtime` се покреће у 11 послова** — ⚠️ **низак ROI.** Сваки се извршава на засебном покретачу, а провера траје <1s; укупна уштеда је ~10s, по цену губитка јефтине заштите по послу. Није вредно измена.
- **`typecheck:noimplicit:core` у CI lint-у** — ✅ **уклоњен из посла lint** (био је саветодаван са `continue-on-error`); блокирајућу површину типова чине `typecheck:core` + `check:type-coverage`. Локална скрипта је задржана.

### Променити статус / одлучити (политика оператера)

- `check:openapi-security-tiers` (саветодавно) — ❌ **НИЈЕ могуће чисто пребацити.** Завршава се кодом 0, али упозорава да неколико `traffic-inspector` рута под `LOCAL_ONLY_API_PREFIXES` нема анотацију `x-loopback-only: true`. Његово спровођење најпре захтева додавање тих анотација у `openapi.yaml`.
- `typecheck:noimplicit:core` (саветодавно) — у великој мери га обухвата блокирајући праг `check:type-coverage`. Пребацити га на праг или уклонити сувишни други `tsc` пролаз.
- `test:vitest:ui` (сада **блокирајући**) — раније постојећи неуспеси су изричито искључени у `vitest.config.ts` помоћу коментара за праћење `// #8618`; нови неуспеси обарају посао.
- `check:secrets` (gitleaks, блокирајући праг замрзнут на 3 документована лажно позитивна резултата) — додати та 3 резултата на листу дозвољених како би се достигла 0, или спустити проверу на саветодавни ниво. Преклапа се са GitHub-овим изворним скенирањем тајни + `check:public-creds`.
- `check:pr-evidence` (блокирајући, претражује прозни текст тела PR-а) — висок ризик од лажно позитивних резултата; уклањање слаби спровођење строгог правила бр. 18, па је ово стварна одлука о политици.
- `semgrep` (саветодавни самостални ток) — преклапа се са CodeQL-ом за OWASP породице; повезати његову основну вредност са прагом или га уклонити.

---

## Повезана документација

- Ланац снабдевања (порекло, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — контролна капија за подударност скупа кључева

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, посао `i18n-ui-coverage`).
Пореди скуп крајњих кључева сваке датотеке `src/i18n/messages/<locale>.json` са `en.json` и пријављује
неуспех за сваки кључ који недостаје или је сувишан, без обзира на то када је кључ додат. Чувари места
`__MISSING__:` рачунају се као присутни (њихов садржај је предмет контролне капије односа). Ово је потпуна
допуна двеју контролних капија заснованих на разликама/процентима: `check-ui-keys-coverage` намеће доњу
границу од 80 % по локалу (43 одсутна кључа од ~13,000 и даље дају 99.7 %), док `check-new-key-coverage`
оцењује само кључеве које PR додаје у `en.json`. Серија локала генерише се из верзије `en.json` која
постоји на дан прављења њене гране и преводи се данима док основна грана наставља да додаје кључеве;
сам PR серије не додаје ниједан кључ, па су обе сродне контролне капије остале неме када је серија 1
(#13044) обједињена са 43 кључа мање у девет локала, а серија 2 (#13660) са 10 кључева мање у осам
(2026-09-15). Црвену проверу исправите помоћу
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; сувишан (`extra`) крајњи кључ
значи да га је извор уклонио — избришите га из локала. `--warn` пријављује проблем без изазивања
неуспеха. `--catalog=cli` покреће исто поређење над `bin/cli/locales` (`npm run i18n:check-keys:cli`);
оба корака налазе се у послу `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n контролна капија за нове кључеве

Сродна је контроли `check-ui-value-drift`. Она открива вредност на енглеском која је **преписана**
док су њени преводи остали непромењени; ова открива кључ на енглеском који је **додат**
а да га неки локали никада нису добили.

`check-ui-keys-coverage` не може да уочи ову врсту проблема: намеће процентуалну доњу границу по локалу,
а једанаест одсутних кључева од ~13,000 оставља покривеност на 99.9%. Проценат по језику не може да
изрази „ова функционалност је објављена непреведена“ — цела функционалност може да стигне у нови локал
без икаквог текста, а да се број никада не промени.

Инцидент који ова контрола обухвата: фаза 3 оркестрационог платна превела је својих једанаест кључева
у свих 42 локала који су тада постојали. Неколико сати касније, серија језика ЕУ (#13044) довела је
репозиторијум до 51 локала, а девет нових (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) никада
их није добило. `deepMergeFallback` замењује одсутан кључ енглеским текстом, па је последица била
непреведен, а не празан кориснички интерфејс — стваран проблем који је по самој конструкцији остао непримећен.

Као и сродна контрола, она је **свесна разлика** и пореди енглески на основи обједињавања са радним
стаблом, тако да већ постојећи недостаци остају замрзнути и за укључивање контролне капије није била
потребна миграција.

**Ознака `__MISSING__:<english>` не задовољава ову контролу (од 2026-09-17).** Раније је била
документовани начин одлагања — окружење за извршавање се враћа на исправан енглески текст — све док
осам PR-ова функционалности од 2026-09-16 није додало 61 кључ и утиснуло ознаку у свих 65 локала
уместо да их преведе: ова контролна капија је прихватила сваки од њих, ништа није блокирало PR-ове,
а блокирајућа контролна капија односа стварних превода затим није прошла на врху издања ни за кога
(pt-BR 3.2 % > 2.5 % + 0.5). Ознака се сада оцењује као одсутан превод. Црвену проверу исправите помоћу
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, или за
све локале паралелно помоћу `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
безбедно за покретање без прикљученог терминала, одбија да се покрене без променљивих окружења
`OMNIROUTE_TRANSLATION_*`). Кључ који мора да остане на енглеском (фиксирани назив производа/механизма/опције)
припада датотеци `scripts/i18n/untranslatable-keys.json`, никада иза ознаке. `vi` у потпуности забрањује
ознаке (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — контролна капија за паркиране тестове

Датотека на листи `exclude` у `vitest.config.ts` представља тест који се не извршава, а ономе ко чита
стабло изгледа као покривеност. Шездесет две датотеке нагомилале су се иза коментара
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Проблем #8618 затворен је
2026-08-11, док је листа коју је пратио порасла са 45 на 62 ставке, при чему је свака нова наследила
коментар који упућује на затворен проблем. Када је листа коначно измерена датотеку по датотеку (#13204),
**51 од 62 теста прошло је над тренутним стаблом без икакве измене изворног кода**.

Контролна капија захтева да свако изузеће које се разрешава у стварну датотеку (а) наведе проблем за
праћење и (б) буде присутно у `config/quality/vitest-exclusions.json` са својим измереним статусом,
тако да додавање изузећа буде разлика која се може прегледати у наменској датотеци, уместо још једног
реда у низу од 60 ставки. Она намерно не покреће поново изузете тестове — то траје ~10 минута и припада
периодичном послу; евиденција бележи када је сваки од њих последњи пут измерен.
