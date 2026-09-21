# Quality Gates Reference (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Този документ е авторитетният справочник за всички контроли за качество в CI на OmniRoute.
Той описва всяка контрола, какво валидира, в коя CI задача се изпълнява, дали използва
базова линия с храпов механизъм или политика за успешно/неуспешно преминаване и дали блокира компилацията, или е само препоръчителна.

За кратко обобщение и политиката за списъка с разрешения вижте раздела „Quality Gates & Ratchets“
в `AGENTS.md`. За критичната оценка, класификацията на зрелостта и независимия от конкретни инструменти
план за възпроизвеждане на същата система вижте
[Наръчника за контроли за качество](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Инвентар на проверките (~90 скрипта)

Скриптовете се намират в `scripts/check/` (проверки за правила) и `scripts/quality/` (механизъм с храпов ефект).
Източникът на истина за CI е `.github/workflows/ci.yml`.

### Ускорен път за PR към издание (`quality.yml`)

`.github/workflows/quality.yml` се изпълнява за PR-и, насочени към `release/**`. Той позволява работата по клоновете на сътрудниците да продължава чрез бързи проверки, филтрирани по пътища, плюс един консултативен сигнал от продукционната компилация при промени в кода:

| Задание                                          | Обхват                                                                                                                                                                                                                                               | Блокиращо                                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR-и с код, които не са чернови, и клонове от опашката на Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` с `OMNIROUTE_USE_TURBOPACK=1`; без качване на артефакт, защото никое последващо задание за качество не го използва | **Консултативно** (`continue-on-error: true`; премахнете след една седмица стабилни изпълнения за PR-и към издание) |
| `Docs Gates (fast-path)`                         | PR-и с документация/код; препратки към API документацията и docs-all                                                                                                                                                                                 | Да                                                                                                                  |
| `Fast Quality Gates`                             | PR-и с код; статични проверки, проверка на типовете, проверка на типовете на таблото, засегнати модулни тестове                                                                                                                                      | Да                                                                                                                  |
| `Forgotten sibling tests`                        | PR-и с код; променените модули се проследяват до статичните потребители и потенциалните сродни тестове; пътищата през barrel и динамичен import се отчитат като консултативна диагностика, заедно с посочените изключения от списъка с разрешения    | **Консултативно**                                                                                                   |
| `Vitest (fast-path)`                             | PR-и с код; бърз набор от тестове на vitest                                                                                                                                                                                                          | Да                                                                                                                  |
| `Unit Tests fast-path`                           | PR-и с код; набор от модулни тестове в 4 шарда                                                                                                                                                                                                       | Да                                                                                                                  |
| `No new ESLint warnings`                         | PR-и с код; проверка на lint, отчитаща потисканията                                                                                                                                                                                                  | Да за PR-и от същото хранилище, консултативно за fork-ове                                                           |
| `Merge integrity (changelog + generated skills)` | PR-и, които не са чернови; синхронизиране на changelog и генерираните skills                                                                                                                                                                         | Да за PR-и от същото хранилище, консултативно за fork-ове                                                           |

#### Отчет за забравени сродни тестове

`npm run check:forgotten-sibling-tests` използва повторно механизма за разрешаване на импорти, стоящ зад картата на въздействието върху тестовете.
За всеки променен продукционен модул той отчита детерминистични вериги
`променен модул/символ -> статичен потребител -> потенциален сроден тест`, когато потенциалният
тест отсъства от diff-а на pull request-а. Markdown обобщението и JSON резултатът се запазват като
артефакта `forgotten-sibling-tests` на workflow-а за калибриране преди евентуално въвеждане като блокираща проверка.

Barrel реекспортите и динамичните импорти служат само за диагностика на разрешаването; те никога не създават
блокираща констатация. Прегледаните изключения се намират в
`config/quality/forgotten-sibling-allowlist.json`. Всеки запис трябва да посочва потребителя и потенциалния
тест, да предоставя конкретна обосновка и да съдържа връзка към GitHub issue или pull request. Неправилно оформените записи водят
до отказ по подразбиране. Изключенията не могат да потиснат изтрит потенциален тест или diff, който добавя `.skip`/`.todo`;
отслабването на твърденията и други форми на прикриване остават отговорност на независимо блокиращата
проверка `check:test-masking`.

### Задание: `lint`

Изпълнява се при всеки PR към `main`. Блокира сливането при неуспех.

| Скрипт (`npm run ...`)            | Проверява                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Блокиращ                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Версията на Node.js е в поддържания диапазон                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                            |
| `check:cycles`                    | Циклични импорти — всички модули в `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                            |
| `check:route-validation:t06`      | Наличие на Zod схеми за всички маршрути (правило от ниво 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Да                                            |
| `check:any-budget:t11`            | Броят на `@ts-expect-error // any` не надвишава допустимия лимит (catraca от ниво 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                            |
| `check:provider-consistency`      | Всеки доставчик в `providers.ts` има съответстващ запис в `providerRegistry.ts` (и обратно, в рамките на списъка с разрешени елементи)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Да                                            |
| `check:model-lifecycle`           | Трите ръчно поддържани таблици за маршрутизиране остават съгласувани с включената в хранилището моментна снимка на жизнения цикъл (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оценява нито един изведен от употреба идентификатор, който `REGISTRY` може да маршрутизира; всяка цел на `BUILT_IN_ALIASES` присъства в `REGISTRY` и отсъства от моментната снимка на изведените от употреба идентификатори; всеки изведен от употреба идентификатор, който все още е в `REGISTRY`, се препраща или е посочен в `allowedRetiredInCatalog`; и нито един източник или цел на `DEFAULT_DEGRADATION_MAP` не е отбелязан като изведен от употреба в тази моментна снимка. Това не доказва, че даден модел в момента се обслужва от активна външна услуга. Офлайн — сравнява с `config/quality/model-lifecycle.json`, обновяван ръчно чрез `npm run quality:refresh-model-lifecycle` (изисква мрежа; не е включен в CI). `allowedRetiredInCatalog` е механизъм с постепенно намаляващ праг: добавяйте запис само при наличие на задача за проследяване. | Да                                            |
| `check:fetch-targets`             | Всеки `fetch("/api/...")` в клиентския `src/` се разрешава до реален `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                            |
| `check:deps`                      | Всички зависимости във всеки `package.json` в хранилището, които могат да бъдат инсталирани чрез `npm install`, присъстват в `dependency-allowlist.json`; новите зависимости без фиксирана версия или с имена, наподобяващи други пакети, се отбелязват                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                            |
| `audit:deps`                      | `npm audit` (основен проект + Electron) — няма предупреждения с висока/критична тежест (припокрива се с OSV `check:vuln-ratchet`; вижте регистъра за последващо рационализиране)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Да                                            |
| `check:lockfile`                  | Цялост на `package-lock.json` — HTTPS регистър, хешове за цялост, без замествания на хостове                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                            |
| `check:licenses`                  | Списък с разрешени SPDX лицензи за производствени зависимости                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                            |
| `check:tracked-artifacts`         | Без артефакти от компилация / запазени в хранилището символни връзки към `node_modules` (изпълнява се и в husky pre-commit; pre-push умишлено е лек — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Да                                            |
| `check:vitest-exclusions`         | Всяко изключение на Vitest посочва задача за проследяване и присъства в `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Да                                            |
| `check:file-size`                 | Никой файл с изходен код не надвишава ограничението за съответното разширение (ratchet: фиксирани големи файлове в списъка `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Да                                            |
| `check:error-helper`              | Отговорите за грешки в изпълнителите/обработчиците използват `buildErrorBody()` / `sanitizeErrorMessage()` (Строго правило №12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Да                                            |
| `check:migration-numbering`       | SQL файловете за миграции са номерирани последователно, без пропуски или дублирания                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                            |
| `check:public-creds`              | Няма литерални OAuth `client_id`/`client_secret` или Firebase Web ключове извън `publicCreds.ts` (строго правило №11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Да                                            |
| `check:db-rules`                  | Няма необработен SQL извън модулите в `src/lib/db/`; няма обобщаващи импорти от `localDb.ts` (строги правила №2/№5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Да                                            |
| `check:known-symbols`             | Изпълнителите на доставчици, стратегиите за маршрутизиране и трансформаторите, регистрирани в съответните им таблици за диспечиране, съвпадат с файловете на диска — няма осиротели или недекларирани символи                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                            |
| `check:route-guard-membership`    | Всеки маршрут, който стартира дъщерен процес, е класифициран чрез `isLocalOnlyPath()` (строги правила №15/№17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Да                                            |
| `check:test-discovery`            | Всеки файл `*.test.ts` / `*.spec.ts` в хранилището се открива от поне един инструмент за изпълнение на тестове (ratchet: списъкът с осиротели файлове в `test-discovery-baseline.json` може само да намалява)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Да                                            |
| `check:agent-skills-sync`         | Генерираните артефакти за умения на агента съответстват на изходния им каталог (без разминаване)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Логата/ресурсите на доставчиците имат запис за произход                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON конфигурационните файлове се анализират успешно и отговарят на правилата за lint на хранилището                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `typecheck:core`                  | Компилация на TypeScript без грешки (само консултативни предупреждения)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Да                                            |
| `typecheck:noimplicit:core`       | Строг `noImplicitAny` — с поглед към бъдещето; много съществуващи места на извикване все още се нуждаят от анотации                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Консултативно** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, ограничен до `src/app/(dashboard)/**` (#7033) — внимателно подбраният списък с 27 файла на `typecheck:core` не включва dashboard TSX файлове, а `next build` също никога не извършва проверка на типовете им (`next.config.mjs` задава `ignoreBuildErrors: true`), така че регресиите с несвързани идентификатори там (#6625/#6909) оставаха невидими за CI. Сравнява със замразена базова линия на броя по файл/TS код (`config/quality/dashboard-typecheck-baseline.json`, със същия модел за налагане при остаряване като `check:known-symbols`) — само НОВИ грешки над базовия брой водят до неуспех на проверката; намалявайте базовата стойност с `--update`, когато съществуваща грешка бъде поправена.                                                                                                                                                                                                                                                                                                                               | Да                                            |

### Задача: `quality-gate`

Изпълнява се след `test-coverage`. Блокира сливането при неуспех.

| Скрипт                       | Проверява                                                                                                                                                                                                  | Блокираща                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `quality:collect`            | Генерира `quality-metrics.json` (брой предупреждения от ESLint, покритие от обединения отчет на сегментите)                                                                                                | Да (предхожда механизма с базова линия) |
| `quality:ratchet`            | Нито един показател в `quality-baseline.json` не се е влошил (предупреждения от ESLint ≤ базовата стойност; покритие ≥ базовата стойност)                                                                  | Да                                      |
| `check:duplication`          | Дублирането на код (jscpd@4) не надвишава базовата стойност в `quality-baseline.json`                                                                                                                      | Да                                      |
| `check:complexity`           | Цикломатичната сложност на ниво файл не надвишава ограничението (основните правила на ESLint `complexity` + `max-lines-per-function`)                                                                      | Да                                      |
| `check:cognitive-complexity` | Механизъм с базова линия за когнитивна сложност (`eslint-plugin-sonarjs`) — отделно изпълнение на ESLint; CI изпълнява и двете обединени в една стъпка `check:complexity-ratchets`                         | Да                                      |
| `check:dead-code`            | Механизмът с базова линия за неизползвани експорти / файлове (knip) не регресира спрямо базовата стойност                                                                                                  | Да                                      |
| `check:compression-budget`   | Бюджет за сравнителния тест на компресията — минималните прагове за спестяване на токени за всяка машина не трябва да регресират                                                                           | Да                                      |
| `check:type-coverage`        | Механизмът с базова линия за процента типизиран код (`type-coverage`) не регресира; до голяма степен обхваща `typecheck:noimplicit:core`                                                                   | Да                                      |
| `check:codeql-ratchet`       | Броят на отворените сигнали от CodeQL не регресира (чете чрез `gh api`; пропуска коректно без токен) — за честотата на обновяване и ръчното задействане вижте „Механизъм с базова линия за CodeQL“ по-долу | Да                                      |

### Задача: `quality-extended`

Цялата задача е консултативна (`continue-on-error: true`). Проверките с праг, базирани на npm, се изпълняват
реално; външните скенери се инсталират чрез `gh release download` и се пропускат автоматично (exit 0),
когато даден двоичен файл все още липсва.

| Скрипт                   | Проверява                                                                                                                                                                                                       | Блокираща |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:circular-deps`    | Няма циклични зависимости (dpdm)                                                                                                                                                                                | **Не**    |
| `check:bundle-size`      | Размерът на пакета не надвишава лимита                                                                                                                                                                          | **Не**    |
| `check:secrets`          | Сканиране за тайни (gitleaks) — пропуска се, ако двоичният файл липсва                                                                                                                                          | **Не**    |
| `check:vuln-ratchet`     | Уязвимостите в зависимостите (osv-scanner) не се увеличават — пропуска се, ако двоичният файл липсва                                                                                                            | **Не**    |
| `check:workflows`        | Проверка на работните потоци (actionlint + zizmor) — пропуска се, ако двоичните файлове липсват                                                                                                                 | **Не**    |
| `check:openapi-breaking` | Несъвместими промени в публичния API договор (`openapi.yaml`) спрямо базовия клон (oasdiff) — извежда `openapiBreaking=N`; пропуска се, ако oasdiff липсва или базовата спецификация не може да бъде определена | **Не**    |

### Задача: `docs-sync-strict`

Изпълнява се при всяка PR заявка към `main`. Блокира сливането при неуспех.

| Скрипт                         | Проверява                                                                                                                                                                                                       | Блокираща                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Мета-проверка, която изпълнява последователно 6-те подпроверки по-долу                                                                                                                                          | Да                        |
| ↳ `check:docs-sync`            | Съгласуваност на версиите в CHANGELOG / OpenAPI / llm.txt                                                                                                                                                       | Да                        |
| ↳ `check:docs-counts`          | Броевете в текста (брой доставчици, брой миграции и т.н.) са в допустимия прозорец спрямо реалните стойности                                                                                                    | Да                        |
| ↳ `check:env-doc-sync`         | Всяка променлива на средата в `.env.example` е документирана в таблица в документацията и обратно                                                                                                               | Да                        |
| ↳ `check:deprecated-versions`  | В документацията няма низове с оттеглени версии                                                                                                                                                                 | Да                        |
| ↳ `check:doc-links`            | Вътрешните markdown връзки в документацията сочат към реални файлове (формат `[text]`/`(path)`)                                                                                                                 | Да                        |
| ↳ `check:fabricated-docs`      | Маршрутите, променливите на средата, CLI командите, имената на hook-ове и файловите пътища, посочени в документацията, съществуват в кодовата база. Строга проверка чрез `--strict`; допуска неуспех без флага. | Да (чрез `--strict` в CI) |
| `check:cli-i18n`               | Низовете на CLI командите присъстват във всички i18n файлове за локализация                                                                                                                                     | Да                        |
| `check:openapi-coverage`       | OpenAPI спецификацията покрива поне определения чрез праг минимум от реалните маршрути                                                                                                                          | Да                        |
| `check:openapi-security-tiers` | Анотациите за нивата на сигурност в `openapi.yaml` съответстват на класификациите в `routeGuard.ts`                                                                                                             | **Не**                    |
| `check:openapi-routes`         | Всеки път в `openapi.yaml` съответства на реален `route.ts` (защита срещу халюцинации)                                                                                                                          | Да                        |
| `check:docs-symbols`           | Всяка препратка към `/api/...` в `docs/**/*.md` съответства на реален `route.ts` (защита срещу халюцинации)                                                                                                     | Да                        |
| `i18n translation drift`       | Непреведени ключове във файловете за i18n локализация — само предупреждение                                                                                                                                     | **Не**                    |

### Задача: `i18n-ui-coverage`

| Скрипт                             | Проверява                                                                                                                                                                                                                       | Блокиращ           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (вграден) | Покритието на ключовете за i18n на потребителския интерфейс е ≥ 65%                                                                                                                                                             | Да                 |
| `check-ui-value-drift` (вграден)   | Пренаписана английска **стойност** не оставя остарял превод                                                                                                                                                                     | Да                 |
| `check-new-key-coverage` (вграден) | **Нов** английски ключ е преведен за всеки локал — маркерът `__MISSING__:` се отхвърля                                                                                                                                          | Да                 |
| `check-translation-ratio`          | Делът на реалните преводи за всеки локал (идентични с английския / заместващи / липсващи крайни стойности извън списъка с разрешени) не трябва да надвишава `config/quality/i18n-translation-baseline.json` + допустимия резерв | **Препоръчителен** |

Изисква `fetch-depth: 0` — проверката за отклонение на стойностите сравнява `en.json` с базата за сливане.

#### `check-ui-value-drift` — проверка за остарели преводи

Улавя единствената i18n регресия, която останалите проверки структурно не могат да открият: английска стойност
е пренаписана, а преводите, направени по _предишния_ английски текст, остават, така че
потребителите, които не използват английски, продължават да четат уверено формулиран, но вече грешен текст.

Това действително беше пуснато в продукция. `oauthModal.googleOAuthWarning` беше пренаписан при добавянето на помощната
функция за вход в Antigravity (#5203); **39 от 43 локала** запазиха текст, указващ на операторите да „копират
целия URL адрес и да го поставят по-долу“ — процес, който не може да бъде завършен за този доставчик. Това остана
незабелязано до #8463, защото:

- `sync-ui-keys` попълва само ключове, които **липсват**, но никога такива, които са **остарели**;
- `check-ui-keys-coverage` отчита _наличието_ на ключа, така че остарял превод се брои като покрит;
- `check-translation-drift` проследява огледалните копия на документацията в `docs/i18n/<locale>/**.md` —
  той никога не чете `src/i18n/messages/*.json`. Блокиращ в задачата `docs-sync-strict` след повторната
  синхронизация от 2026-09: редактиране на основен документ → `npm run i18n:run -- --files=<doc>` (на ниво раздел, евтино).

**Взема предвид разликите, без да използва базова линия.** Сравнява `en.json` при базата за сливане с
работното дърво; за всеки ключ, чиято английска стойност е променена, всеки локал, който все още съдържа
непроменен превод, е остарял. Това умишлено **замразява съществуващия дълг** — разликата
не може да покаже от коя стара английска версия произлиза отдавна съществуващ превод, затова проверката оценява
само засегнатото от текущата промяна. Алтернативата (базова линия с хеш за всеки ключ) би изисквала
генериран файл с размер ~600 KB, 3 пъти по-голям от най-голямата съществуваща базова линия, който би се променял при всяка i18n заявка за изтегляне.

Има два начина да бъде удовлетворена проверката:

1. актуализирайте засегнатите преводи или
2. задайте им `__MISSING__:<new english>` — по време на изпълнение тогава се предоставя коригираният английски текст
   (`src/i18n/request.ts::deepMergeFallback`, #7258), а ключът се нарежда на опашка за превод.

Ако **значението** на низа се е променило, предпочитайте **преименуване на ключа**: нов ключ не може да наследи
остарял превод. Това е подходът, използван в #8463.

```bash
npm run i18n:check-value-drift          # строг режим (изпълняваното от CI)
npm run i18n:check-value-drift:warn     # само отчет
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завършва с код 0 и `SKIP reason=base-unresolved`, когато базовият каталог не може да бъде прочетен (плитко
клониране без базовата референция), аналогично на `check-openapi-breaking`.

### Задача: `i18n`

Пълна матрица за валидиране на i18n (по една задача за всеки локал). Цялата задача е препоръчителна.

| Скрипт                          | Проверява                         | Блокиращ                                                        |
| ------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| `validate_translation.py quick` | Пълнота на превода за всеки локал | **Препоръчителен** (`continue-on-error: true` за цялата задача) |

### Задача: `pr-test-policy`

Изпълнява се само при заявки за изтегляне.

| Скрипт                 | Проверява                                                                                                                                                                                        | Блокиращ |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | Заявките за изтегляне, които променят продукционен код в `src/`, `open-sse/`, `electron/` или `bin/`, трябва да включват или актуализират тестове (Строго правило №8)                            | Да       |
| `check:test-masking`   | Променените тестови файлове не намаляват общия брой проверки и не добавят тавтологии от вида `assert.ok(true)`                                                                                   | Да       |
| `check:pr-evidence`    | Описанието на заявката за изтегляне посочва доказателства от тестове/VPS за промяната (автоматизира Строго правило №18 чрез търсене в текста на заявката — ненадеждно, вижте списъка със задачи) | Да       |

### Задача: `test-vitest`

Изпълнява се след `build`. При неуспех блокира сливането.

| Набор            | Проверява                                                    | Блокиращ                                                                                                                                              |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP сървър (110 инструмента), autoCombo, кеш — vitest runner | Да                                                                                                                                                    |
| `test:vitest:ui` | Тестове на UI компоненти — vitest runner                     | **Блокиращ** — предварително съществуващите неуспешни тестове са изрично изключени във `vitest.config.ts`; новите неуспешни тестове провалят задачата |

### Нощни работни процеси (планирани, препоръчителни)

Те се изпълняват по cron график (и чрез `workflow_dispatch`), но никога при PR. Всички са препоръчителни.

| Работен процес         | Проверява                                                                                                                                                                     | Блокиращ           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | fast-check тестове на свойства с произволна начална стойност и голям брой изпълнения                                                                                          | **Препоръчителен** |
| `nightly-resilience`   | праг за нарастване на heap паметта, хаотично инжектиране на грешки, k6 тестове за натоварване/продължително натоварване                                                       | **Препоръчителен** |
| `nightly-llm-security` | promptfoo защита срещу инжектиране (режим на блокиране) + garak проби (пропускат се без тайна за доставчик)                                                                   | **Препоръчителен** |
| `nightly-schemathesis` | Fuzz тестване на OpenAPI договора (schemathesis) спрямо работещ OmniRoute чрез `docs/openapi.yaml` — открива нарушения на спецификацията/необработени грешки 500 (Фаза 8 B.4) | **Препоръчителен** |
| `nightly-mutation`     | Резултат от Stryker мутационно тестване върху бързия поток за модулни тестове — оцелелите мутанти разкриват слаби проверки                                                    | **Препоръчителен** |
| `nightly-compat`       | Матрица за съвместимост с версии на Node във всички поддържани диапазони на `engines.node`                                                                                    | **Препоръчителен** |

---

## Фаза на ускорение (2026-08-30 → v4.0 LTS): всяка базова стойност е разхлабена с 20%

Решение на отговорника (2026-08-30): до модуларизацията във v4.0 скоростта на доставяне е по-важна
от ограничаването на техническия дълг. Всяка **числова** базова стойност на храповия механизъм беше разхлабена с 20% чрез една
одитируема операция, а фазата е декларирана в `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Какво се промени                                                                                                                                                                                                                              | Къде                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — бройките, при които по-ниското е по-добро, ×1.2; процентите, при които по-високото е по-добро, ÷1.2 (минималното покритие 60 е запазено, `eslintErrors` остава 0, `eslintWarnings` 0 → 20% от замразения брой потискания) | `quality-baseline.json` (бележката `_relax_velocity_2026_08_30` изброява всяка стойност преди → след)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ограничението за редове за всеки `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                         | `file-size-baseline.json`                                                                              |
| бройките за отделен файл / отделен TS код ×1.2                                                                                                                                                                                                | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` става препоръчителен, докато `_policy.requireTighten === false`                                                                                                                                                           | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| нощната задача `bank-ratchet-shrinks` е поставена на пауза (тя би запазила измереното свиване и би премахнала свободния резерв)                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Списъците с разрешения (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **не** са бюджети и не бяха променени. Политиките за преминаване/неуспех на контролните механизми (тайни, SQL правила,
договор за документация/среда, съответствие на i18n, модулни тестове) не са променени — неуспешният тест си остава неуспешен тест.

**Инструменти**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — еднократното
  разхлабване (`scripts/quality/relax-baselines.mjs`); отказва да се изпълни два пъти с една и съща
  бележка.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  измерва всеки числов контролен механизъм по същия начин като CI и извежда оставащия резерв за всеки механизъм
  (`scripts/quality/baseline-headroom.mjs`). Нощната задача `baseline-headroom` публикува
  таблицата в текущия issue **📈 Резерв на базовите стойности (фаза на ускорение)** и добавя етикета
  `headroom-alert`, когато някой механизъм е в рамките на 10% от лимита си или вече го надвишава. Този issue
  служи за ранно предупреждение: бюджет, който се запълва за дни, означава, че разхлабването се изчерпва от
  няколко PR-а, а не от целия екип — прегледайте бележките `_rebaseline_*` на проблемния механизъм.

**Режим за нов код (Clean-as-You-Code) — от 2026-08-30, само за бързия път при PR**

При събития `pull_request` `quality.yml` подава `--base-ref <PR base SHA>` към `check:file-size`,
`check:complexity-ratchets` и `check:dead-code`. В този режим механизмът сравнява HEAD с
merge-base, **ограничено до файловете, променени от PR-а** (`scripts/check/newCodeMode.mjs`:
merge-base се материализира във временен `git worktree`, ESLint/knip се изпълняват там и върху HEAD, след което
бройките за отделните файлове се сравняват):

- **блокиращо** — PR-ът е добавил нарушения на цикломатичната/когнитивната сложност или неизползвани експорти във файловете, които е променил
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` в регистрационния файл);
- **препоръчително** — глобалната обща стойност спрямо замразената базова стойност. Наследеното отклонение никога не прави
  невинен PR неуспешен; отклонението се замразява отново при съгласуването за издание и се наблюдава от задачата за резерва.

Изпълненията чрез `workflow_dispatch`, проверката release-green и нощната задача за резерва нямат базова стойност от PR
и запазват абсолютното (глобално) сравнение. Покритието, дублирането и покритието на типовете засега остават глобални
(техните инструменти не създават евтино разлика за отделен файл) — те са кандидати за същия подход.

**Приключване на фазата във v4.0 (LTS = по-строго отпреди, а не „връщане към нормалното“)

1. Върху чистия връх на `release/v4.0.0`: изпълнете `npm run quality:headroom --json` за протокола, след това
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, както и
   `--update` за всяка проверка на типовете — всяка базова стойност спада до измерената стойност.
2. Изтрийте `_policy` от `quality-baseline.json` (активира отново `--require-tighten` и нощното
   натрупване), възстановете `THRESHOLD = 36` (или по-висока стойност) в `check-openapi-coverage.mjs`.
3. Затегнете ограниченията отвъд измереното там, където модуларизацията е дала резултат: върнете `cap` за размера на файловете на 1000
   (или 800), увеличете минималните прагове за покритие с 5, задайте 0 неизползвани експорти за модуларизираните пакети.

## Базова линия с храпов механизъм (`quality-baseline.json`)

Механизмът с храпов принцип (`scripts/quality/check-quality-ratchet.mjs`) прочита `quality-baseline.json`
и го сравнява с току-що събрания `quality-metrics.json`. Всяка метрика, която се влоши
с повече от нейния епсилон, води до неуспешно компилиране.

Текущо проследявани метрики:

| Метрика               | Посока | Значение                                          |
| --------------------- | ------ | ------------------------------------------------- |
| `eslintWarnings`      | `down` | Броят предупреждения от ESLint не трябва да расте |
| `coverage.statements` | `up`   | Покритието на операторите не трябва да спада      |
| `coverage.lines`      | `up`   | Покритието на редовете не трябва да спада         |
| `coverage.functions`  | `up`   | Покритието на функциите не трябва да спада        |
| `coverage.branches`   | `up`   | Покритието на разклоненията не трябва да спада    |

За да актуализирате базовата линия след реално подобрение:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Флагът `--update` записва текущите измерени стойности в `quality-baseline.json`.
Включете този файл в същия commit като промяната, подобрила метриката. PR, който подобрява
метрика, без да актуализира базовата линия, ще бъде засечен от `--require-tighten` (Фаза 6A.5,
предстои реализация).

### Храпов механизъм за CodeQL: честота на опресняване и ръчно задействане

`check:codeql-ratchet` прочита **състоянието на хранилището, опреснявано по график — не за всеки PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` отчита
`state: configured`, `schedule: weekly`: сканиране чрез настройката по подразбиране на GitHub, а не анализ при всяко изпращане.
Следствие: след сливане на PR, който ПОПРАВЯ предупреждения, храповият механизъм продължава да отчита
стария, по-висок брой, докато не се изпълни следващото планирано сканиране — затова отчита регресия
за всеки отворен PR, включително за последващите PR-и към самата поправка, докато сканирането не се актуализира.

**Ръчно опресняване**: `gh workflow run codeql.yml --ref release/vX.Y.Z` изпълнява анализа
отново и публикува повторно предупрежденията в рамките на минути. Първо прочетете `.github/workflows/codeql.yml`
— заглавната му част обяснява, че той е само за `workflow_dispatch`, **защото влиза в конфликт с
„настройката по подразбиране“ на GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Възстановяването на задействанията чрез `push`/`pull_request`/
`schedule` първо изисква **действие от собственик**: Settings → Code security →
CodeQL: Default → Advanced. Не добавяйте задействане `schedule:`, без да направите това превключване — то
само ще доведе до неуспешни изпълнения.

**Затегнете базовата линия, след като броят спадне** — `node scripts/check/check-codeql-ratchet.mjs
--update` записва новия измерен брой в `quality-baseline.json` →
`metrics.codeqlAlerts.value`, така че храповият механизъм да не допуска незабелязано връщане на регресията
до стария таван. Практически пример (2026-09-02/03): PR #12502 поправи 7 реални предупреждения
(13 → 6 измерени отворени); PR #12530 затегна фиксираната базова линия от 11 → 6, за да съответства; след това
останалите 6 бяха отхвърлени с индивидуална обосновка за всяко предупреждение, докато отворените станаха 0.

**Отхвърлянията са решение на оператора (Строго правило #14)** — никога не отхвърляйте предупреждение от CodeQL,
без да запишете техническата обосновка в коментара за отхвърляне: `won't fix` за
изискване на външен протокол, `used in tests` за тестова фикстура, `false positive`
за средство за пречистване на данни, което CodeQL не може да разпознае (прецедент: `docs/security/ERROR_SANITIZATION.md`).

---

## Политика за повторно изпълнение на тестове (WS5.4, v3.8.49)

Повторното изпълнение се задава за всеки runner поотделно, никога глобално за всички — глобалното повторно изпълнение превръща реалните регресии
в невидими нестабилни тестове:

| Runner           | Политика                                                                                                                                               | Защо                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` само в CI, с `trace: on-first-retry`                                                                                                      | Времената на браузъра/мрежата са действително недетерминистични; едно повторно изпълнение с trace превръща нестабилността в артефакт, който може да бъде диагностициран |
| Vitest           | БЕЗ глобално повторно изпълнение. Доказано нестабилен тест получава изрично повторно изпълнение за конкретния тест (видимо в diff-а и прегледано в PR) | Поддържа списъка с карантинирани тестове в repo-то, без никога да бъде непрозрачен                                                                                      |
| node:test (unit) | НИКОГА без повторно изпълнение                                                                                                                         | Нестабилният unit тест е дефект в теста — поправете го, не го изпълнявайте отново с надеждата да мине                                                                   |

Целеви SLO след въвеждането на телеметрията за нестабилност (WS5.2/5.3): <1% честота на нестабилност за тест
(праг „поправете незабавно“), ≥95% успеваемост за pipeline. Референтни стойности за индустрията —
калибрирайте ги спрямо собствените ни измервания.

## Отклонение на ratchet-а на ниво release (WS5.5, v3.8.49)

Когато ratchet (размер на файл, сложност, предупреждения от eslint) регресира върху ЧИСТИЯ връх на release-а
— т.е. КОМБИНАЦИЯТА от merge-ове го е влошила и нито един отделен PR не възпроизвежда
регресията в собствения си branch — поправката е отговорност на **release captain, еднократно, в
release branch-а**: предпочитайте извличане/refactor; актуализирайте baseline-а само с документиран
запис с обосновка. Никога не прехвърляйте отклонение от комбинация върху PR на contributor и никога
не актуализирайте baseline-а за всеки PR поотделно (това скрива реални регресии). Първо направете разграничението: възпроизведете
червения статус спрямо чистия връх в probe worktree, преди да приемете, че вашият PR го е причинил.

## Запазване на пониженията на ratchet-а — посоката надолу (#8584)

Ratchet-ът е автоматичен само наполовина, и то в грешната половина. **Повишаването** на лимит е
ръчна редакция на JSON, която отнема десет секунди и е най-бързият начин да се отблокира червен PR.
**Понижаването** му изисква някой да изпълни `--update` и да commit-не резултата — а докато
job-ът `bank-ratchet-shrinks` не беше въведен, никой workflow не го изпълняваше. Измерените последствия
(2026-07-25): 18 замразени файла вече са на или под лимита от 800 реда за нов файл, като най-лошият
е на 132× (`src/shared/validation/schemas.ts`, 19 реда с лимит 2,523); таванът за
сложност се придвижи от `1794 → 2169` в рамките на ~37 бележки за актуализиране на baseline-а, с точно едно
понижение (−1); а „затегнете чрез `--update` в следващия цикъл“ беше написано 31 пъти и изпълнено
веднъж. Лимит, който надживява кода, заради който е бил въведен, безшумно превръща всяко завършено
разделяне в разрешение за растеж за следващия, който редактира файла.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** затваря този цикъл:

|                  |                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Изпълнява се при | `schedule` (3×/ден) + `workflow_dispatch` — умишлено **не** при `push`                                         |
| Измерва          | най-високия `release/vX.Y.Z`, със същата резолюция + защита срещу инжектиране като `release-green`             |
| Записва          | `check:file-size --update` и `check:complexity-ratchets --update` (и двете по замисъл могат само да понижават) |
| Проверява        | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                       |
| Доставя          | един винаги актуален PR към release branch-а — принудително актуализиран, без спам                             |

Запазването се извършва пакетно, а не при всеки push, защото няма изискване за латентност (понижение,
запазено в рамките на 8 часа, е приемливо), докато изпълнение при всеки merge би изграждало многократно PR branch-а
по време на кампании за merge и би плащало цената на пълно обхождане от ESLint всеки път. Откриването остава при
push (`release-green`); само запазването се извършва пакетно.

### Проверка за безопасност

Job-ът записва в baseline-ите без надзор, затова `verify-ratchet-bank.mjs` прави
това приемливо. Той сравнява дървото след `--update` спрямо `HEAD` и **прекратява job-а,
преди да съществува какъвто и да е commit** — без да отваря PR — освен ако всяка промяна не е една от следните:

- числова стойност в `frozen` / `testFrozen`, която е **понижена** или **премахната**
- `complexity-baseline.json` → `count` е **понижена**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` е **понижена**

Всичко друго води до неуспех: повишаване на число, добавяне на запис, промяна на `cap`/`testCap` или
изтриване/пренаписване на бележка `_rebaseline_*` (тези бележки са одитната следа за причината за съществуването на всеки
таван и се съхраняват в същия обект `frozen` като записите за файловете).
Бот, който може да повишава лимит, би бил категорично по-лош от текущото положение. Защита срещу регресии:
`tests/unit/verify-ratchet-bank.test.ts`.

Job-ът никога не прави push към `release/*` — човек merge-ва PR-а, така че неправилно измерване
не може да бъде приложено без преглед.

## Политика за списъка с разрешени изключения

Всяка проверка, която не може да се провали заради вече съществуващи нарушения, използва замразен списък с разрешени изключения
(напр. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Политиката е:

**Отстранете първопричината; използвайте списъка с разрешени изключения само когато нарушението вече е съществувало и
не може да бъде отстранено в същата PR.**

Когато добавяте запис към списък с разрешени изключения:

1. Включете коментар с обосновка.
2. Посочете задачата за проследяване (напр. `// #3498 — Функционалност от фаза 2, която все още не е реализирана`).
3. Премахнете записа в същата PR, която отстранява нарушението — остарял запис, който вече
   не потиска активно нарушение, сам по себе си е дефект (проверката за остаряло прилагане 6A.3 ще
   доведе до неуспех на проверката при осиротял запис в списъка с разрешени изключения, след като бъде реализирана).

**Не** добавяйте записи в списъка с разрешени изключения, за да накарате тестовете да преминат по-бързо. Успешна проверка с нарастващ
списък с разрешени изключения създава фалшиво усещане за качество.

### Когато проверка се провали за вашата PR

1. **Прочетете внимателно изхода от проверката** — той ви казва точно кой файл или символ нарушава
   правилото.
2. **Отстранете нарушението** — повечето проверки са детерминистични проверки на файловата система, които преминават веднага щом
   кодът е коректен.
3. **Ако нарушението вече е съществувало** (т.е. не сте го въвели вие, но проверката вече
   го обхваща): добавете запис в списъка с разрешени изключения с коментар за обосновка и задача за проследяване.
4. **Ако проверката е тип ratchet** (покритие, предупреждения от ESLint, дублиране, сложност):
   вашата промяна е влошила показателя. Отстранете основния проблем или (в редки случаи) изпълнете
   `npm run quality:ratchet -- --update`, ако промяната е умишлена и влошаването на показателя
   е приемливо — но документирайте причината в описанието на PR.
5. **Препоръчителните проверки** (`continue-on-error: true`) са информативни — те не блокират
   сливането, но се показват в обобщението на CI. Въпреки това ги коригирайте.

---

## Добавяне на нова проверка

1. Създайте `scripts/check/check-<name>.mjs` (или `.ts`). Проверките за политики завършват с код 0/1.
   Проверките от тип ratchet записват показател в `quality-metrics.json` чрез `collect-metrics.mjs`.
2. Добавете `"check:<name>": "node scripts/check/check-<name>.mjs"` към `package.json`.
3. Свържете я в `.github/workflows/ci.yml` под подходящата задача
   (политика → `lint` или `docs-sync-strict`; ratchet → `quality-gate`).
4. Ако има списък с разрешени изключения, приложете `reportStaleEntries()` от
   `scripts/check/lib/allowlist.mjs`, така че остарелите записи да се откриват автоматично.
5. Напишете тест в `tests/unit/build/`, който покрива логиката за откриване на проверката.
6. Актуализирайте този документ (добавете ред към съответната таблица на задачата).

---

## Инструменти за агенти: LSP-in-the-loop (по избор)

Освен CI проверките, OmniRoute предоставя **незадължителна** заготовка `agent-lsp`
(проектен `.mcp.json`, Фаза 7, задача 15). Създайте `.mcp.json`,
за да предоставите TypeScript езиков сървър на агентите за програмиране, така че те да разрешават символи /
диагностика **преди** писането на код — допълнение към `typecheck:core` за компилиране преди заявяване на готовност,
което премахва грешките от „измислени символи“ още при източника. Умишлено
не се зарежда автоматично (вие избирате и проверявате моста MCP↔LSP); повреден запис само регистрира
грешка при свързване и никога не прекъсва сесиите.

---

## Списък за рационализация (преглед на ROI — Фаза 9 Вълна 3)

Този опис беше съгласуван с `ci.yml` на 2026-06-17 (предишната версия пропускаше
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Прегледът на ROI на съгласувания набор
идентифицира следните кандидати за рационализация. **Обединяванията са механични промени
по CI; превключванията/премахванията са решения по правилата, запазени за оператора.** Нищо
от посоченото по-долу все още не е приложено.

**Също недокументирани по-горе** (препоръчителни, слаб сигнал): задачата `docs-lint`
(markdownlint + Vale, цялата задача е с `continue-on-error`) и самостоятелните работни процеси за сканиране
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` присъства в
`quality-baseline.json`, но не е свързано с блокиращ ограничител в `ci.yml` — метриката
в момента е изолирана.

### Обединяване / премахване на дублирането (механично, с по-нисък риск)

Всеки кандидат беше валидиран спрямо актуалното състояние на проверките на 2026-06-17 (доверявай се, но проверявай);
няколко „очевидни“ обединявания се оказаха прикриващи технически дълг и **не** могат да бъдат директно приложени.

- **`check:docs-sync` се изпълнява два пъти** — самостоятелно в задачата `lint` и отново в `check:docs-all` (`docs-sync-strict`), както и в pre-commit куката на husky. ✅ **ГОТОВО** — самостоятелното извикване в `lint` е премахнато.
- **Сканиране за CVE** — ❌ **НЕ е подходящо за директно обединяване.** `audit:deps` приключва с грешка при всяка CVE с висока/критична тежест; `check:vuln-ratchet` (osv) се проваля само при _регресия_ спрямо базовото ниво (в момента 1 MODERATE). Семантиките са различни — премахването на `audit:deps` би премахнало абсолютната проверка за висока/критична тежест. Запазете и двете.
- **Откриване на цикли** — ❌ **НЕ е подходящо за директно обединяване.** `check:circular-deps` (dpdm) отчита **91 цикъла** (затова е препоръчителна проверка); тя не може да бъде направена блокираща, без те първо да бъдат отстранени, и има по-широк обхват от успешната, внимателно подбрана `check:cycles`. Запазете `check:cycles` като блокираща; отстраняването на 91-те цикъла на dpdm е самостоятелна задача.
- **Сложност** — ✅ **ГОТОВО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): едно обхождане с ESLint, броене по ruleId, така че базовите нива за цикломатична сложност + максимален брой редове и когнитивна сложност да останат независими; отделните `check:complexity` / `check:cognitive-complexity` се запазват за локално изпълнение с `--update`.
- **Защита срещу халюцинации за `/api`** — ✅ **ГОТОВО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): един опис на файловата система за `src/app/api`, като openapi-routes + docs-symbols продължават да докладват независимо; отделните проверки се запазват за локално изпълнение.
- **`check:node-runtime` се изпълнява в 11 задачи** — ⚠️ **ниска ROI.** Всяка е на отделен runner и проверката отнема <1s; общото спестяване е ~10s, срещу загубата на евтина защита за всяка задача. Не си струва сътресението.
- **`typecheck:noimplicit:core` в CI lint** — ✅ **премахнато от задачата lint** (беше препоръчителна проверка с `continue-on-error`); блокиращата повърхност за типовете е `typecheck:core` + `check:type-coverage`. Локалният скрипт е запазен.

### Превключване / решение (правила на оператора)

- `check:openapi-security-tiers` (препоръчителна) — ❌ **НЕ може да бъде директно превключена.** Завършва с код 0, но предупреждава, че на няколко маршрута на `traffic-inspector` под `LOCAL_ONLY_API_PREFIXES` липсва анотацията `x-loopback-only: true`. Налагането ѝ изисква първо добавяне на тези анотации в `openapi.yaml`.
- `typecheck:noimplicit:core` (препоръчителна) — до голяма степен е покрита от блокиращия ограничител `check:type-coverage`. Превключете я към ограничител или премахнете излишното второ изпълнение на `tsc`.
- `test:vitest:ui` (вече **блокираща**) — съществуващите отпреди грешки са изрично изключени във `vitest.config.ts` с проследяващи коментари `// #8618`; новите грешки провалят задачата.
- `check:secrets` (gitleaks, блокиращ ограничител, замразен на 3 документирани фалшиво положителни резултата) — добавете трите в списъка с позволени, за да достигнете 0, или понижете проверката до препоръчителна. Припокрива се с вграденото сканиране за тайни на GitHub + `check:public-creds`.
- `check:pr-evidence` (блокираща, търси чрез grep в прозата на тялото на PR) — висок риск от фалшиво положителни резултати; премахването ѝ отслабва прилагането на строго правило №18, така че това е реално решение по правилата.
- `semgrep` (самостоятелна препоръчителна проверка) — припокрива се с CodeQL за категориите на OWASP; свържете базовото ѝ ниво с ограничител или я премахнете.

---

## Свързана документация

- Верига за доставки (произход, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — проверка за съответствие на наборите от ключове

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, задача `i18n-ui-coverage`).
Сравнява набора от крайни ключове на всеки `src/i18n/messages/<locale>.json` с `en.json` и завършва
с грешка при всеки липсващ или излишен краен ключ, независимо кога е бил добавен ключът. Заместващите
маркери `__MISSING__:` се считат за налични (тяхното съдържание е отговорност на проверката за съотношението).
Това е абсолютното допълнение към двете проверки, базирани на разлики/проценти: `check-ui-keys-coverage`
налага минимално покритие от 80 % за всяка локализация (43 липсващи ключа от общо ~13 000 все още дават
99,7 %), а `check-new-key-coverage` оценява само ключовете, които дадена PR заявка добавя към `en.json`.
Пакет от локализации се генерира от актуалния `en.json` в деня на създаване на неговия клон и се превежда
в продължение на дни, докато базовият клон продължава да добавя ключове; самата PR заявка на пакета не
добавя ключове, затова и двете сродни проверки останаха безмълвни, когато пакет 1 (#13044) беше слят с
43 липсващи ключа в девет локализации, а пакет 2 (#13660) — с 10 липсващи ключа в осем (2026-09-15).
Поправете неуспешната проверка с
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; краен ключ `extra`
означава, че източникът го е премахнал — изтрийте го от локализацията. `--warn` докладва, без да
причинява неуспех. `--catalog=cli` изпълнява същото сравнение върху `bin/cli/locales`
(`npm run i18n:check-keys:cli`); и двете стъпки са част от задачата `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n проверка за нови ключове

Сродна проверка на `check-ui-value-drift`. Последната открива английска стойност, която е била
**пренаписана**, докато преводите ѝ са останали непроменени; тази открива английски ключ, който е бил
**добавен**, но някои локализации никога не са го получили.

`check-ui-keys-coverage` не може да открие този тип проблем: тя налага минимален процент за всяка
локализация, а единадесет липсващи ключа от ~13 000 оставят покритието на 99,9%. Процентът за отделен
език не може да изрази „тази функционалност беше пусната без превод“ — цяла функционалност може да
попадне в нова локализация без никакъв текст, без това изобщо да промени стойността.

Инцидентът, който тя формализира: фаза 3 на Orchestration Canvas преведе своите единадесет ключа във
всичките 42 локализации, съществуващи по това време. Часове по-късно пакетът с езици на ЕС (#13044)
увеличи локализациите в хранилището до 51, а деветте нови (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`,
`sl`, `sr`) никога не ги получиха. `deepMergeFallback` замества липсващ ключ с английския текст, така
че проблемът се прояви като непреведен, а не празен потребителски интерфейс — реален проблем, който
по замисъл остана незабелязан.

Подобно на сродната си проверка, тя **взема предвид разликите**, като сравнява английския текст в
базата за сливане с работното дърво, така че вече съществуващите пропуски остават замразени и за
включването на проверката не беше необходима миграция.

**Маркерът `__MISSING__:<english>` не удовлетворява проверката (от 2026-09-17).** Преди той беше
документираният начин за отлагане — по време на изпълнение се използва резервният правилен английски
текст — докато осем PR заявки за функционалности на 2026-09-16 не добавиха 61 ключа и не поставиха
маркера във всичките 65 локализации вместо преводи: тази проверка прие всяка от тях, нищо не блокира
PR заявките, а след това блокиращата проверка за съотношението на реалните преводи се провали на върха
на клона за изданието за всички (pt-BR 3,2 % > 2,5 % + 0,5). Сега маркерът се оценява като липсващ
превод. Поправете неуспешната проверка с
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` или
всички локализации паралелно с `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
безопасен при отделен HEAD, отказва да стартира без променливите на средата `OMNIROUTE_TRANSLATION_*`).
Ключ, който трябва да остане на английски (фиксирано име на продукт/движок/флаг), трябва да бъде в
`scripts/i18n/untranslatable-keys.json`, никога зад маркер. `vi` забранява маркерите изцяло
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — проверка за временно изключени тестове

Файл в списъка `exclude` на `vitest.config.ts` е тест, който не се изпълнява, но изглежда като покритие
за всеки, който разглежда дървото. Шестдесет и два файла се натрупаха зад коментара
`// #8618 — вече съществуваща грешка; премахнете това изключване, когато бъде поправена`. Задача #8618
беше затворена на 2026-08-11, докато проследяваният от нея списък нарасна от 45 на 62 записа, като
всеки нов наследяваше коментар, сочещ към затворена задача. Когато списъкът най-накрая беше измерен
файл по файл (#13204), **51 от 62 преминаха успешно спрямо текущото дърво без никаква промяна в
изходния код**.

Проверката изисква всяко изключване, което сочи към реален файл, (a) да посочва задача за проследяване
и (b) да присъства в `config/quality/vitest-exclusions.json` с измерения си статус, така че добавянето
му да бъде разлика, подлежаща на преглед в специален файл, вместо поредния ред в масив с 60 записа.
Тя умишлено не изпълнява повторно изключените тестове — това отнема ~10 минути и принадлежи на
периодична задача; регистърът записва кога всеки от тях е бил измерен за последно.
