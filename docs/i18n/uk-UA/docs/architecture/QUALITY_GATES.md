# Quality Gates Reference (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Цей документ є авторитетним довідником щодо всіх шлюзів якості CI в OmniRoute.
У ньому описано кожен шлюз, що він перевіряє, у якому завданні CI запускається, чи використовує
базову лінію з храповим механізмом або політику успішного/неуспішного проходження, а також чи блокує він збірку або має рекомендаційний характер.

Короткий огляд і політику списку дозволів див. у розділі "Шлюзи якості та храпові механізми"
у `AGENTS.md`. Критичну оцінку, класифікацію зрілості та незалежний від інструментів
план відтворення цієї ж системи див. у
[Посібнику зі шлюзів якості](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Інвентаризація гейтів (~90 скриптів)

Скрипти розташовані в `scripts/check/` (гейти політик) і `scripts/quality/` (рушій поступового посилення).
Джерелом істини для CI є `.github/workflows/ci.yml`.

### Швидкий шлях для PR до релізу (`quality.yml`)

`.github/workflows/quality.yml` запускається для PR, націлених на `release/**`. Він забезпечує просування гілок контриб'юторів завдяки швидким гейтам із фільтрацією за шляхами, а також надає один рекомендаційний сигнал щодо продакшн-збірки для змін коду:

| Завдання                                         | Область                                                                                                                                                                                                                                                 | Блокування                                                                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR із кодом, що не є чернетками, і гілки черги Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` з `OMNIROUTE_USE_TURBOPACK=1`; без завантаження артефактів, оскільки жодне подальше завдання перевірки якості їх не використовує | **Рекомендаційне** (`continue-on-error: true`; видалити після одного тижня стабільних запусків для релізних PR) |
| `Docs Gates (fast-path)`                         | PR із документацією/кодом; посилання в документації API та повна перевірка документації                                                                                                                                                                 | Так                                                                                                             |
| `Fast Quality Gates`                             | PR із кодом; статичні перевірки, перевірка типів, перевірка типів панелі керування, тести модулів, на які вплинули зміни                                                                                                                                | Так                                                                                                             |
| `Forgotten sibling tests`                        | PR із кодом; трасування змінених модулів до статичних споживачів і потенційних споріднених тестів; шляхи через файли-агрегатори та динамічні імпорти подаються як рекомендаційна діагностика з посиланнями на винятки зі списку дозволів                | **Рекомендаційне**                                                                                              |
| `Vitest (fast-path)`                             | PR із кодом; швидкий набір тестів vitest                                                                                                                                                                                                                | Так                                                                                                             |
| `Unit Tests fast-path`                           | PR із кодом; набір модульних тестів у 4 шардах                                                                                                                                                                                                          | Так                                                                                                             |
| `No new ESLint warnings`                         | PR із кодом; перевірка lint з урахуванням приглушень                                                                                                                                                                                                    | Так для PR із власного репозиторію, рекомендаційне для форків                                                   |
| `Merge integrity (changelog + generated skills)` | PR, що не є чернетками; синхронізація журналу змін і згенерованих навичок                                                                                                                                                                               | Так для PR із власного репозиторію, рекомендаційне для форків                                                   |

#### Звіт про забуті споріднені тести

`npm run check:forgotten-sibling-tests` повторно використовує механізм розв'язання імпортів, що лежить в основі карти впливу на тести.
Для кожного зміненого продакшн-модуля він повідомляє про детерміновані ланцюжки
`змінений модуль/символ -> статичний споживач -> потенційний споріднений тест`, коли потенційний
тест відсутній у різниці змін pull request. Підсумок у форматі Markdown і результат JSON зберігаються як
артефакт робочого процесу `forgotten-sibling-tests` для калібрування перед будь-яким упровадженням блокування.

Повторні експорти через файли-агрегатори та динамічні імпорти є лише діагностикою розв'язання; вони ніколи не створюють
блокувального результату. Перевірені винятки містяться у
`config/quality/forgotten-sibling-allowlist.json`. Кожен запис має вказувати споживача й потенційний
тест, містити конкретне обґрунтування та посилання на issue або pull request у GitHub. Некоректно сформовані записи спричиняють
відмову за замовчуванням. Винятки не можуть приховати видалений потенційний тест або різницю змін, яка додає `.skip`/`.todo`;
послаблення перевірок та інші способи маскування залишаються сферою відповідальності незалежного блокувального
гейта `check:test-masking`.

### Завдання: `lint`

Запускається для кожного PR до `main`. У разі невдачі блокує злиття.

| Скрипт (`npm run ...`)            | Перевіряє                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Блокувальний                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `check:node-runtime`              | Версія Node.js перебуває в підтримуваному діапазоні                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Так                                             |
| `check:cycles`                    | Циклічні імпорти — усі модулі `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Так                                             |
| `check:route-validation:t06`      | Наявність схем Zod у всіх маршрутах (політика рівня 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Так                                             |
| `check:any-budget:t11`            | Кількість `@ts-expect-error // any` не перевищує встановлений ліміт (catraca рівня 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Так                                             |
| `check:provider-consistency`      | Кожен провайдер у `providers.ts` має відповідний запис у `providerRegistry.ts` (і навпаки, у межах списку дозволених)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Так                                             |
| `check:model-lifecycle`           | Три таблиці маршрутизації, які підтримуються вручну, залишаються узгодженими зі збереженим у репозиторії знімком життєвого циклу (#11503): `FITNESS_TABLE` (`taskFitness.ts`) не оцінює жодного виведеного з експлуатації ідентифікатора, який може маршрутизувати `REGISTRY`; кожна ціль `BUILT_IN_ALIASES` присутня в `REGISTRY` і відсутня у знімку виведених з експлуатації ідентифікаторів; кожен виведений з експлуатації ідентифікатор, який усе ще є в `REGISTRY`, перенаправляється або зазначений у `allowedRetiredInCatalog`; і жодне джерело чи ціль `DEFAULT_DEGRADATION_MAP` не позначені як виведені з експлуатації в цьому знімку. Це не доводить, що модель наразі обслуговується активним зовнішнім сервісом. Автономна перевірка — порівнює з `config/quality/model-lifecycle.json`, який оновлюється вручну за допомогою `npm run quality:refresh-model-lifecycle` (потребує мережі; не інтегровано в CI). `allowedRetiredInCatalog` — це храповий механізм поступового скорочення: додавайте запис лише за наявності задачі для відстеження. | Так                                             |
| `check:fetch-targets`             | Кожен `fetch("/api/...")` у клієнтському коді `src/` відповідає реальному `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Так                                             |
| `check:deps`                      | Усі залежності, які можна встановити через `npm install`, у кожному `package.json` репозиторію присутні в `dependency-allowlist.json`; нові незакріплені пакети або пакети з назвами, схожими на легітимні, позначаються                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Так                                             |
| `audit:deps`                      | `npm audit` (корінь + electron) — немає сповіщень високого/критичного рівня (частково дублює osv `check:vuln-ratchet`; див. журнал обґрунтування)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Так                                             |
| `check:lockfile`                  | Цілісність `package-lock.json` — реєстр https, хеші цілісності, відсутність перевизначень хостів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Так                                             |
| `check:licenses`                  | Список дозволених ліцензій SPDX для залежностей, що використовуються у виробничому середовищі                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Так                                             |
| `check:tracked-artifacts`         | Відсутні артефакти збірки / закомічені символічні посилання `node_modules` (також запускається в husky pre-commit; pre-push навмисно залишається легким — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Так                                             |
| `check:ai-attribution`            | Відсутні трейлер `Co-Authored-By` від ШІ/бота або примітка про генерацію ШІ в комітах, заголовку чи описі PR — Жорстке правило №16 (у циклі швидких перевірок `quality.yml` для PR→`release/**` — читає дані події, не виконує дій поза PR — і на кроці лише для PR у lint-завданні `ci.yml` для PR→`main`; також у хуку husky `commit-msg`; співавтори-люди дозволені; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Кожен виняток Vitest містить посилання на задачу відстеження та присутній у `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                             |
| `check:file-size`                 | Жоден файл вихідного коду не перевищує обмеження для відповідного розширення (храповий механізм: зафіксовані великі файли в списку `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                             |
| `check:error-helper`              | Відповіді про помилки у виконавцях/обробниках використовують `buildErrorBody()` / `sanitizeErrorMessage()` (Жорстке правило №12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Так                                             |
| `check:migration-numbering`       | SQL-файли міграцій мають послідовну нумерацію, без пропусків і дублікатів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Так                                             |
| `check:public-creds`              | Немає літеральних значень OAuth `client_id`/`client_secret` або вебключів Firebase поза `publicCreds.ts` (жорстке правило №11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                             |
| `check:db-rules`                  | Немає необробленого SQL поза модулями `src/lib/db/`; немає імпортів через barrel-файли з `localDb.ts` (жорсткі правила №2/№5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Так                                             |
| `check:known-symbols`             | Виконавці провайдерів, стратегії маршрутизації та перекладачі, зареєстровані у відповідних таблицях диспетчеризації, відповідають файлам на диску — немає осиротілих або неоголошених символів                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Так                                             |
| `check:route-guard-membership`    | Кожен маршрут, що запускає дочірній процес, класифіковано за допомогою `isLocalOnlyPath()` (жорсткі правила №15/№17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Так                                             |
| `check:test-discovery`            | Кожен файл `*.test.ts` / `*.spec.ts` у репозиторії виявляється принаймні одним засобом запуску тестів (храповий механізм: список осиротілих тестів у `test-discovery-baseline.json` може лише скорочуватися)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Так                                             |
| `check:agent-skills-sync`         | Згенеровані артефакти навичок агента відповідають їхньому вихідному каталогу (без розбіжностей)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Логотипи/ресурси провайдерів мають зареєстрований запис про походження                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Файли конфігурації JSON успішно аналізуються та відповідають правилам лінтингу репозиторію                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Компіляція TypeScript без помилок (лише рекомендаційні попередження)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Так                                             |
| `typecheck:noimplicit:core`       | Суворий режим `noImplicitAny` — орієнтований на майбутнє; багато наявних місць виклику все ще потребують анотацій                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Рекомендаційний** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, обмежений областю `src/app/(dashboard)/**` (#7033), — сформований вручну список дозволених 27 файлів у `typecheck:core` не містить жодного TSX-файлу панелі керування, а `next build` також ніколи не перевіряє їхні типи (`next.config.mjs` задає `ignoreBuildErrors: true`), тому регресії з осиротілими ідентифікаторами в них (#6625/#6909) були невидимими для CI. Відмінності порівнюються із зафіксованим базовим рівнем кількості помилок для кожного файлу та коду TS (`config/quality/dashboard-typecheck-baseline.json`, той самий шаблон перевірки застарілості, що й у `check:known-symbols`) — лише НОВІ помилки понад базову кількість спричиняють збій перевірки; коли наявну помилку виправлено, зменшуйте базовий рівень за допомогою `--update`.                                                                                                                                                                                                                                                                                        | Так                                             |

### Завдання: `quality-gate`

Запускається після `test-coverage`. У разі невдачі блокує злиття.

| Скрипт                       | Перевіряє                                                                                                                                                                                 | Блокувальний          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `quality:collect`            | Створює `quality-metrics.json` (кількість попереджень ESLint, покриття з об’єднаного звіту сегментів)                                                                                     | Так (передує ratchet) |
| `quality:ratchet`            | Жодна метрика в `quality-baseline.json` не погіршилася (попередження ESLint ≤ базового рівня; покриття ≥ базового рівня)                                                                  | Так                   |
| `check:duplication`          | Дублювання коду (jscpd@4) не перевищує базового рівня в `quality-baseline.json`                                                                                                           | Так                   |
| `check:complexity`           | Цикломатична складність на рівні файлу не перевищує граничного значення (основні правила ESLint `complexity` + `max-lines-per-function`)                                                  | Так                   |
| `check:cognitive-complexity` | Ratchet когнітивної складності (`eslint-plugin-sonarjs`) — окремий прохід ESLint; у CI обидві перевірки об’єднано в один крок `check:complexity-ratchets`                                 | Так                   |
| `check:dead-code`            | Ratchet невикористовуваних експортів / файлів (knip) не погіршується порівняно з базовим рівнем                                                                                           | Так                   |
| `check:compression-budget`   | Бюджет еталонного тесту стиснення — мінімальні пороги економії токенів для кожного рушія не повинні погіршуватися                                                                         | Так                   |
| `check:type-coverage`        | Ratchet відсотка типізованого коду (`type-coverage`) не погіршується; значною мірою охоплює `typecheck:noimplicit:core`                                                                   | Так                   |
| `check:codeql-ratchet`       | Кількість відкритих сповіщень CodeQL не збільшується (зчитується через `gh api`; коректний пропуск без токена) — частоту оновлення та ручний запуск див. нижче в розділі «Ratchet CodeQL» | Так                   |

### Завдання: `quality-extended`

Усе завдання має рекомендаційний характер (`continue-on-error: true`). Ratchet-перевірки на основі npm виконуються
насправді; зовнішні сканери встановлюються через `gh release download` і самостійно пропускають перевірку (exit 0),
якщо виконуваний файл усе ще відсутній.

| Скрипт                   | Перевіряє                                                                                                                                                                                                        | Блокувальний        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `check:circular-deps`    | Відсутність циклічних залежностей (dpdm)                                                                                                                                                                         | **Рекомендаційний** |
| `check:bundle-size`      | Розмір пакета не перевищує граничного значення                                                                                                                                                                   | **Рекомендаційний** |
| `check:secrets`          | Сканування секретів (gitleaks) — пропускається, якщо виконуваний файл відсутній                                                                                                                                  | **Рекомендаційний** |
| `check:vuln-ratchet`     | Вразливості залежностей (osv-scanner) не збільшуються — пропускається, якщо виконуваний файл відсутній                                                                                                           | **Рекомендаційний** |
| `check:workflows`        | Лінтинг робочих процесів (actionlint + zizmor) — пропускається, якщо виконувані файли відсутні                                                                                                                   | **Рекомендаційний** |
| `check:openapi-breaking` | Несумісні зміни публічного контракту API (`openapi.yaml`) порівняно з базовою гілкою (oasdiff) — виводить `openapiBreaking=N`; пропускається, якщо oasdiff відсутній або базову специфікацію неможливо визначити | **Рекомендаційний** |

### Завдання: `docs-sync-strict`

Виконується для кожного PR до `main`. У разі невдачі блокує злиття.

| Скрипт                         | Що перевіряє                                                                                                                                                                                   | Блокувальний                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Мета-перевірка, яка послідовно запускає 6 наведених нижче підперевірок                                                                                                                         | Так                         |
| ↳ `check:docs-sync`            | Узгодженість версій у CHANGELOG / OpenAPI / llm.txt                                                                                                                                            | Так                         |
| ↳ `check:docs-counts`          | Числові значення в тексті (кількість провайдерів, міграцій тощо) перебувають у межах порогового вікна відносно фактичних значень                                                               | Так                         |
| ↳ `check:env-doc-sync`         | Кожна змінна середовища з `.env.example` задокументована в таблиці документації, і навпаки                                                                                                     | Так                         |
| ↳ `check:deprecated-versions`  | У документації немає рядків із застарілими версіями                                                                                                                                            | Так                         |
| ↳ `check:doc-links`            | Внутрішні markdown-посилання в документації ведуть до реальних файлів (формат `[text]`/`(path)`)                                                                                               | Так                         |
| ↳ `check:fabricated-docs`      | Маршрути, змінні середовища, команди CLI, назви хуків і шляхи до файлів, згадані в документації, існують у кодовій базі. Жорстка перевірка через `--strict`; без прапорця помилки не блокують. | Так (через `--strict` у CI) |
| `check:cli-i18n`               | Рядки команд CLI наявні у всіх файлах локалей i18n                                                                                                                                             | Так                         |
| `check:openapi-coverage`       | Специфікація OpenAPI охоплює щонайменше поступово підвищуваний мінімум реальних маршрутів                                                                                                      | Так                         |
| `check:openapi-security-tiers` | Анотації рівнів безпеки в `openapi.yaml` узгоджені з класифікаціями в `routeGuard.ts`                                                                                                          | **Рекомендаційний**         |
| `check:openapi-routes`         | Кожен шлях у `openapi.yaml` відповідає реальному `route.ts` (захист від галюцинацій)                                                                                                           | Так                         |
| `check:docs-symbols`           | Кожне посилання `/api/...` у `docs/**/*.md` відповідає реальному `route.ts` (захист від галюцинацій)                                                                                           | Так                         |
| `i18n translation drift`       | Неперекладені ключі у файлах локалей i18n — лише попередження                                                                                                                                  | **Рекомендаційний**         |

### Завдання: `i18n-ui-coverage`

| Скрипт                            | Що перевіряє                                                                                                                                                                                                                                     | Блокувальний        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `check-ui-keys-coverage` (inline) | Покриття ключів i18n інтерфейсу становить ≥ 65%                                                                                                                                                                                                  | Так                 |
| `check-ui-value-drift` (inline)   | Після перезаписування англійського **значення** не залишається застарілих перекладів                                                                                                                                                             | Так                 |
| `check-new-key-coverage` (inline) | **Новий** англійський ключ перекладено в кожній локалі — маркер `__MISSING__:` не допускається                                                                                                                                                   | Так                 |
| `check-translation-ratio`         | Частка справжніх перекладів для кожної локалі (листків, що збігаються з англійськими / є заповнювачами / відсутні та не входять до списку дозволених) не повинна перевищувати `config/quality/i18n-translation-baseline.json` + допустимий запас | **Рекомендаційний** |

Потребує `fetch-depth: 0` — перевірка розбіжностей значень порівнює `en.json` із базою злиття.

#### `check-ui-value-drift` — перевірка застарілих перекладів

Виявляє одну регресію i18n, яку інші перевірки структурно не здатні побачити: англійське значення
перезаписано, а переклади, створені на основі _попереднього_ англійського тексту, залишаються без змін, тому
неангломовні користувачі продовжують читати впевнено сформульований, але тепер уже неправильний текст.

Це справді потрапило у випуск. `oauthModal.googleOAuthWarning` було перезаписано після появи допоміжного
засобу входу Antigravity (#5203); у **39 із 43 локалей** залишився текст, який радив операторам «скопіювати
повну URL-адресу та вставити її нижче» — для цього провайдера такий процес неможливо завершити. Проблема
залишалася непоміченою до #8463, оскільки:

- `sync-ui-keys` додає лише **відсутні** ключі й ніколи не оновлює **застарілі**;
- `check-ui-keys-coverage` враховує _наявність_ ключа, тому застарілий переклад вважається покритим;
- `check-translation-drift` відстежує дзеркальні копії документації `docs/i18n/<locale>/**.md` —
  він ніколи не читає `src/i18n/messages/*.json`. Є блокувальною перевіркою в завданні `docs-sync-strict` після
  повторної синхронізації 2026-09: відредагуйте основний документ → `npm run i18n:run -- --files=<doc>` (на рівні розділу, дешево).

**Враховує різницю, а не спирається на базову лінію.** Він порівнює `en.json` у базі злиття
з робочим деревом; для кожного ключа, англійське значення якого змінилося, будь-яка локаль,
що досі містить незмінений переклад, вважається застарілою. Це навмисно **заморожує наявний
технічний борг** — різниця не може показати, з якої старої англійської версії походить давній
переклад, тому перевірка оцінює лише те, чого торкається поточна зміна. Альтернатива (базова
лінія хешів для кожного ключа) потребувала б згенерованого файла розміром близько 600 КБ,
що втричі перевищує найбільшу наявну базову лінію та змінювалося б із кожним PR локалізації.

Є два способи пройти перевірку:

1. оновити відповідні переклади або
2. установити для них значення `__MISSING__:<new english>` — тоді середовище виконання
   надаватиме виправлений англійський текст (`src/i18n/request.ts::deepMergeFallback`, #7258),
   а ключ буде поставлено в чергу на переклад.

Якщо змінився **зміст** рядка, краще **перейменувати ключ**: новий ключ не може успадкувати
застарілий переклад. Саме цей підхід було використано в #8463.

```bash
npm run i18n:check-value-drift          # суворий режим (використовується в CI)
npm run i18n:check-value-drift:warn     # лише звіт
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Завершується з кодом 0 і повідомленням `SKIP reason=base-unresolved`, якщо базовий каталог
неможливо прочитати (поверхневе клонування без базового посилання), аналогічно до
`check-openapi-breaking`.

### Завдання: `i18n`

Повна матриця перевірки i18n (одне завдання для кожної локалі). Усе завдання має
рекомендаційний характер.

| Скрипт                          | Що перевіряє                        | Блокування                                                         |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `validate_translation.py quick` | Повноту перекладу для кожної локалі | **Рекомендаційне** (`continue-on-error: true` для всього завдання) |

### Завдання: `pr-test-policy`

Виконується лише для запитів на злиття.

| Скрипт                 | Що перевіряє                                                                                                                                                          | Блокування |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR, які змінюють робочий код у `src/`, `open-sse/`, `electron/` або `bin/`, мають містити нові чи оновлені тести (Жорстке правило №8)                                 | Так        |
| `check:test-masking`   | Змінені тестові файли не зменшують загальну кількість перевірок і не додають тавтологій `assert.ok(true)`                                                             | Так        |
| `check:pr-evidence`    | Текст PR містить посилання на докази тестування/VPS для зміни (автоматизує Жорстке правило №18 шляхом пошуку в тексті PR — ненадійно, див. список запланованих робіт) | Так        |

### Завдання: `test-vitest`

Виконується після `build`. Блокує злиття в разі невдачі.

| Набір            | Що перевіряє                                                         | Блокування                                                                                                        |
| ---------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Сервер MCP (110 інструментів), autoCombo, кеш — засіб запуску vitest | Так                                                                                                               |
| `test:vitest:ui` | Тести компонентів інтерфейсу — засіб запуску vitest                  | **Блокує** — наявні раніше помилки явно виключено у `vitest.config.ts`; нові помилки спричиняють невдачу завдання |

### Нічні робочі процеси (за розкладом, рекомендаційні)

Вони запускаються за розкладом cron (і через `workflow_dispatch`), але ніколи не запускаються
для PR. Усі вони мають рекомендаційний характер.

| Робочий процес         | Що перевіряє                                                                                                                                                                | Блокування         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | Тести властивостей fast-check із випадковим початковим значенням і великою кількістю запусків                                                                               | **Рекомендаційне** |
| `nightly-resilience`   | Перевірку зростання купи, хаотичне внесення відмов, навантажувальне/тривале тестування k6                                                                                   | **Рекомендаційне** |
| `nightly-llm-security` | Захист promptfoo від ін’єкцій (режим блокування) і зондування garak (пропускається без секрету провайдера)                                                                  | **Рекомендаційне** |
| `nightly-schemathesis` | Фазинг контракту OpenAPI (schemathesis) на запущеному OmniRoute з використанням `docs/openapi.yaml` — виявляє порушення специфікації / необроблені помилки 500 (Етап 8 B.4) | **Рекомендаційне** |
| `nightly-mutation`     | Показник мутаційного тестування Stryker для швидкого набору модульних тестів — мутації, що вижили, виявляють слабкі перевірки                                               | **Рекомендаційне** |
| `nightly-compat`       | Матрицю сумісності рушія Node в усіх підтримуваних діапазонах `engines.node`                                                                                                | **Рекомендаційне** |

---

## Фаза швидкості (2026-08-30 → v4.0 LTS): усі базові рівні послаблено на 20%

Рішення власника (2026-08-30): до модульної перебудови v4.0 швидкість випуску важливіша
за стримування технічного боргу. Кожен **числовий** базовий рівень храповика було послаблено на 20% за один
прохід із можливістю аудиту, а фазу оголошено в `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Що змінило                                                                                                                                                                                                              | Де                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — лічильники, де менше — краще, ×1.2; відсотки, де більше — краще, ÷1.2 (мінімальне покриття 60 збережено, `eslintErrors` лишається 0, `eslintWarnings` 0 → 20% від зафіксованої кількості придушень) | `quality-baseline.json` (примітка `_relax_velocity_2026_08_30` містить усі значення до → після)        |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, обмеження рядків для кожного `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                       | `file-size-baseline.json`                                                                              |
| кількість на файл / на код TS ×1.2                                                                                                                                                                                      | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` стає рекомендаційним, поки `_policy.requireTighten === false`                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| нічний процес `bank-ratchet-shrinks` призупиняється (інакше він зафіксував би виміряне скорочення й скасував би запас)                                                                                                  | `.github/workflows/nightly-release-green.yml`                                                          |

Списки дозволів (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **не** є бюджетами й не змінювалися. Політики перевірок «пройдено/не пройдено» (секрети, правила SQL,
контракт документації/середовища, паритет i18n, модульні тести) не змінилися — червоний тест усе ще лишається червоним.

**Інструменти**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — одноразове
  послаблення (`scripts/quality/relax-baselines.mjs`); відмовляється запускатися двічі з тією самою
  приміткою.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  вимірює кожне числове обмеження так само, як CI, і виводить залишок запасу для кожної перевірки
  (`scripts/quality/baseline-headroom.mjs`). Нічне завдання `baseline-headroom` публікує
  таблицю в активній задачі **📈 Запас базового рівня (фаза швидкості)** й додає
  мітку `headroom-alert`, коли будь-яка перевірка перебуває в межах 10% від свого ліміту або вже перевищила його. Ця задача
  слугує раннім попередженням: бюджет, який вичерпується за кілька днів, означає, що послаблення використовують
  кілька PR, а не вся команда — перегляньте примітки `_rebaseline_*` відповідної перевірки.

**Режим нового коду (Clean-as-You-Code) — з 2026-08-30, лише швидкий шлях для PR**

Для подій `pull_request` файл `quality.yml` передає `--base-ref <PR base SHA>` до `check:file-size`,
`check:complexity-ratchets` і `check:dead-code`. У цьому режимі перевірка порівнює HEAD з
базою злиття **лише для файлів, змінених у PR** (`scripts/check/newCodeMode.mjs`:
база злиття матеріалізується в тимчасовому `git worktree`, ESLint/knip запускаються там і на HEAD, після чого
порівнюються різниці кількості для кожного файла):

- **блокувальне** — PR додав порушення цикломатичної/когнітивної складності або мертві експорти у змінених ним файлах
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` у журналі);
- **рекомендаційне** — глобальний підсумок порівняно із зафіксованим базовим рівнем. Успадковане відхилення ніколи не робить
  невинний PR червоним; відхилення повторно фіксується під час узгодження релізу й відстежується завданням контролю запасу.

Запуски `workflow_dispatch`, перевірка release-green і нічне завдання контролю запасу не мають бази PR
і зберігають абсолютне (глобальне) порівняння. Покриття, дублювання та покриття типами наразі лишаються глобальними
(їхні інструменти не дають змоги дешево отримати різницю для кожного файла) — це кандидати на таку саму обробку.

**Завершення фази у v4.0 (LTS = суворіше, ніж раніше, а не «повернення до норми»)**

1. На чистій вершині `release/v4.0.0`: виконайте `npm run quality:headroom --json` для фіксації результату, потім
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, а також
   `--update` для кожного бар’єра перевірки типів — кожен базовий рівень знижується
   до виміряного значення.
2. Видаліть `_policy` з `quality-baseline.json` (це повторно активує `--require-tighten`
   і щонічне накопичення), відновіть `THRESHOLD = 36` (або вище) у
   `check-openapi-coverage.mjs`.
3. Посильте вимоги понад виміряні значення там, де модульність дала результат:
   поверніть `cap` розміру файлу до 1000 (або 800), підвищте мінімальні пороги
   покриття на 5, установіть кількість невикористовуваних експортів на 0 для
   модульних пакетів.

## Базовий рівень храповика (`quality-baseline.json`)

Механізм храповика (`scripts/quality/check-quality-ratchet.mjs`) зчитує `quality-baseline.json`
і порівнює його зі щойно зібраним `quality-metrics.json`. Будь-яка метрика, що погіршується
понад допустиме значення epsilon, призводить до невдалої збірки.

Метрики, які наразі відстежуються:

| Метрика               | Напрямок | Значення                                         |
| --------------------- | -------- | ------------------------------------------------ |
| `eslintWarnings`      | `down`   | Кількість попереджень ESLint не повинна зростати |
| `coverage.statements` | `up`     | Покриття інструкцій не повинно зменшуватися      |
| `coverage.lines`      | `up`     | Покриття рядків не повинно зменшуватися          |
| `coverage.functions`  | `up`     | Покриття функцій не повинно зменшуватися         |
| `coverage.branches`   | `up`     | Покриття гілок не повинно зменшуватися           |

Щоб оновити базовий рівень після фактичного покращення:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Прапорець `--update` записує поточні виміряні значення у `quality-baseline.json`.
Зафіксуйте цей файл у тому самому коміті, що й зміну, яка покращила метрику. PR, який покращує
метрику без оновлення базового рівня, буде виявлено за допомогою `--require-tighten` (Фаза 6A.5,
очікує на реалізацію).

### Храповик CodeQL: частота оновлення та ручний запуск

`check:codeql-ratchet` зчитує **стан репозиторію, що оновлюється за розкладом, а не для кожного PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` повідомляє
`state: configured`, `schedule: weekly`: це сканування стандартного налаштування GitHub, а не аналіз
для кожного надсилання змін. Наслідок: після злиття PR, який ВИПРАВЛЯЄ сповіщення, храповик продовжує
зчитувати стару, більшу кількість до наступного запланованого сканування — тому він повідомляє про
регресію для кожного відкритого PR, включно з подальшими змінами самого виправного PR, доки
сканування не наздожене актуальний стан.

**Ручне оновлення**: `gh workflow run codeql.yml --ref release/vX.Y.Z` повторно запускає
аналіз і повторно публікує сповіщення протягом кількох хвилин. Спочатку прочитайте `.github/workflows/codeql.yml`
— його заголовок пояснює, що він призначений лише для `workflow_dispatch` **через конфлікт зі
«стандартним налаштуванням» GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Для відновлення тригерів `push`/`pull_request`/
`schedule` спочатку потрібна **дія власника**: Settings → Code security →
CodeQL: Default → Advanced. Не додавайте тригер `schedule:` без цього перемикання — він
лише спричинятиме невдалі запуски.

**Посильте базовий рівень після зменшення кількості** — `node scripts/check/check-codeql-ratchet.mjs
--update` записує нову виміряну кількість у `quality-baseline.json` →
`metrics.codeqlAlerts.value`, щоб храповик не дозволяв непомітно повернутися до старої верхньої
межі. Практичний приклад (2026-09-02/03): PR #12502 виправив 7 реальних сповіщень
(13 → 6 виміряних відкритих); PR #12530 посилив зафіксований базовий рівень з 11 → 6 відповідно
до результату; решту 6 потім було відхилено з окремим обґрунтуванням для кожного сповіщення,
зменшивши кількість відкритих до 0.

**Відхилення — рішення оператора (Жорстке правило #14)** — ніколи не відхиляйте сповіщення CodeQL
без зазначення технічного обґрунтування в коментарі до відхилення: `won't fix` для вимоги
зовнішнього протоколу, `used in tests` для тестової фікстури, `false positive`
для санітайзера, який CodeQL не може виявити (прецедент: `docs/security/ERROR_SANITIZATION.md`).

---

## Політика повторного запуску тестів (WS5.4, v3.8.49)

Повторний запуск налаштовується для кожного раннера окремо, а не глобально — глобальний повторний запуск перетворює реальні регресії
на непомітні нестабільні збої:

| Раннер           | Політика                                                                                                                                                   | Чому                                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` лише в CI, з `trace: on-first-retry`                                                                                                          | Часові характеристики браузера/мережі справді недетерміновані; один повторний запуск із трасуванням перетворює нестабільний збій на артефакт, придатний для діагностики |
| Vitest           | БЕЗ глобального повторного запуску. Тест із підтвердженою нестабільністю отримує явний повторний запуск на рівні тесту (видимий у diff і перевірений у PR) | Зберігає список карантину в репозиторії, а не в непрозорому вигляді                                                                                                     |
| node:test (unit) | БЕЗ повторних запусків за жодних обставин                                                                                                                  | Нестабільний модульний тест — це помилка в тесті: виправте її, а не запускайте тест навмання повторно                                                                   |

Цільові SLO після впровадження телеметрії нестабільних тестів (WS5.2/5.3): частота нестабільних збоїв <1% на тест
(поріг «виправити негайно»), частка успішних проходжень ≥95% на пайплайн. Значення, прийняті в галузі як орієнтири, —
їх слід відкалібрувати за нашими власними вимірюваннями.

## Дрейф храповика на рівні релізу (WS5.5, v3.8.49)

Коли храповик (розмір файлу, складність, попередження eslint) регресує на ЧИСТІЙ верхівці гілки релізу
— тобто регресію спричинила КОМБІНАЦІЯ злиттів, а жоден окремий PR не відтворює її
у власній гілці, — виправлення має виконати **капітан релізу, один раз, у
гілці релізу**: надавайте перевагу виділенню коду/рефакторингу; змінюйте базову лінію лише з документованим
обґрунтуванням. Ніколи не перекладайте комбінований дрейф на PR учасника та ніколи
не змінюйте базову лінію окремо для кожного PR (це приховує реальні регресії). Спочатку розрізніть причини: відтворіть
помилку на чистій верхівці в тестовому worktree, перш ніж припускати, що її спричинив ваш PR.

## Фіксація знижень храповика — рух донизу (#8584)

Храповик автоматизований лише наполовину, до того ж не в той бік. **Підвищення** ліміту — це
ручне редагування JSON, що займає десять секунд і є найшвидшим способом розблокувати червоний PR.
**Зниження** ліміту вимагає, щоб хтось запустив `--update` і закомітив результат — а до
появи завдання `bank-ratchet-shrinks` жоден робочий процес цього не робив. Виміряний наслідок
(2026-07-25): 18 заморожених файлів уже мали не більше ніж 800 рядків — ліміт для нових файлів; найгірший випадок
перевищував фактичний розмір у 132 рази (`src/shared/validation/schemas.ts`, 19 рядків із лімітом 2 523);
стеля складності зросла з `1794 → 2169` упродовж ~37 приміток про зміну базової лінії, лише з одним
зниженням (−1); а фразу «посилити через `--update` у наступному циклі» написали 31 раз, але виконали
лише один раз. Ліміт, який пережив код, через який його запровадили, непомітно перетворює кожну завершену
декомпозицію на дозвіл збільшувати код для наступного, хто редагуватиме файл.

`nightly-release-green.yml` → завдання **`bank-ratchet-shrinks`** замикає цей цикл:

|           |                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Запуск    | `schedule` (3×/день) + `workflow_dispatch` — навмисно **не** `push`                                                                    |
| Вимірює   | найвищу `release/vX.Y.Z`, з тією самою логікою визначення та захистом від ін’єкцій, що й `release-green`                               |
| Записує   | `check:file-size --update` і `check:complexity-ratchets --update` (обидві команди за своєю структурою можуть лише зменшувати значення) |
| Перевіряє | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                               |
| Доставляє | один завжди актуальний PR до гілки релізу — примусово оновлюваний, без спаму                                                           |

Фіксація виконується пакетно, а не під час кожного push, оскільки вона не має вимог щодо затримки (зафіксувати
зниження протягом 8 годин цілком прийнятно), тоді як запуск під час кожного злиття неодноразово перебудовував би гілку PR
під час кампаній зі злиття та щоразу оплачував би повний прохід ESLint. Виявлення залишається на
push (`release-green`); пакетно виконується лише фіксація.

### Перевірка безпеки

Завдання змінює базові лінії без нагляду, тому саме `verify-ratchet-bank.mjs` робить
це прийнятним. Він порівнює дерево після `--update` з `HEAD` і **перериває завдання
ще до створення будь-якого коміту** — не відкриваючи PR, — якщо не кожна зміна належить до одного з таких типів:

- числовий запис `frozen` / `testFrozen` **знижено** або **видалено**
- `complexity-baseline.json` → `count` **знижено**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **знижено**

Усе інше спричиняє помилку: підвищення числа, додавання запису, зміна `cap`/`testCap` або
видалення/перезапис примітки `_rebaseline_*` (ці примітки є журналом аудиту причин існування кожної
стелі та зберігаються всередині того самого об’єкта `frozen`, що й записи файлів).
Бот, здатний підвищувати ліміт, був би однозначно гіршим за поточний стан. Захист від
регресій: `tests/unit/verify-ratchet-bank.test.ts`.

Завдання ніколи не виконує push до `release/*` — PR зливає людина, тож помилковий результат вимірювання
не може потрапити до гілки без перевірки.

## Політика списку дозволеного

Кожен бар’єр, який не може завершитися невдало через уже наявні порушення, використовує заморожений список дозволеного
(наприклад, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Політика така:

**Усувайте першопричину; використовуйте список дозволеного лише тоді, коли порушення вже існувало
й не може бути виправлене в тому самому PR.**

Додаючи запис до списку дозволеного:

1. Додайте коментар з обґрунтуванням.
2. Укажіть посилання на задачу для відстеження (наприклад, `// #3498 — Функція фази 2, ще не реалізована`).
3. Видаліть запис у тому самому PR, який виправляє порушення, — застарілий запис, що більше
   не приховує активне порушення, сам є дефектом (перевірка застарілих правил 6A.3 після
   реалізації призведе до невдалого проходження бар’єра через осиротілий запис у списку дозволеного).

**Не** додавайте записи до списку дозволеного, щоб тести проходили швидше. Зелений бар’єр зі списком
дозволеного, що зростає, створює хибне відчуття якості.

### Коли бар’єр не проходить у вашому PR

1. **Уважно прочитайте вивід бар’єра** — у ньому точно вказано, який файл або символ порушив
   правило.
2. **Виправте порушення** — більшість бар’єрів є детермінованими перевірками файлової системи, які проходять,
   щойно код виправлено.
3. **Якщо порушення вже існувало** (тобто ви його не внесли, але тепер воно
   охоплюється бар’єром): додайте запис до списку дозволеного з коментарем-обґрунтуванням і задачею для відстеження.
4. **Якщо бар’єр працює за принципом храповика** (покриття, попередження ESLint, дублювання, складність):
   ваша зміна погіршила метрику. Виправте першопричину або (у рідкісних випадках) виконайте
   `npm run quality:ratchet -- --update`, якщо зміна навмисна й погіршення
   метрики є прийнятним, — але поясніть причину в описі PR.
5. **Рекомендаційні бар’єри** (`continue-on-error: true`) мають інформаційний характер — вони не блокують
   злиття, але відображаються в підсумку CI. Усе одно виправляйте їх.

---

## Додавання нового бар’єра

1. Створіть `scripts/check/check-<name>.mjs` (або `.ts`). Бар’єри політик завершуються з кодом 0/1.
   Бар’єри типу «храповик» записують метрику до `quality-metrics.json` через `collect-metrics.mjs`.
2. Додайте `"check:<name>": "node scripts/check/check-<name>.mjs"` до `package.json`.
3. Підключіть його в `.github/workflows/ci.yml` у відповідному завданні
   (політика → `lint` або `docs-sync-strict`; храповик → `quality-gate`).
4. Якщо він має список дозволеного, застосуйте `reportStaleEntries()` з
   `scripts/check/lib/allowlist.mjs`, щоб застарілі записи виявлялися автоматично.
5. Напишіть тест у `tests/unit/build/`, що охоплює логіку виявлення бар’єра.
6. Оновіть цей документ (додайте рядок до таблиці відповідного завдання).

---

## Інструменти агента: LSP у циклі (за бажанням)

Окрім бар’єрів CI, OmniRoute постачається з **необов’язковим** каркасом `agent-lsp`
(файл `.mcp.json` на рівні проєкту, фаза 7, завдання 15). Створіть `.mcp.json`,
щоб надати агентам програмування доступ до мовного сервера TypeScript, аби вони знаходили символи /
діагностику **до** написання коду — це доповнення до `typecheck:core` за принципом «компіляція перед твердженням»,
яке усуває помилки з «вигаданими символами» в самому джерелі. Він навмисно
не завантажується автоматично (ви самі обираєте й перевіряєте міст MCP↔LSP); некоректний запис лише фіксує
помилку підключення в журналі й ніколи не порушує роботу сеансів.

---

## Беклог раціоналізації (перегляд ROI — Фаза 9 Хвиля 3)

Цей перелік було звірено з `ci.yml` 2026-06-17 (у попередній версії було пропущено
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Перегляд ROI звіреного набору
виявив наведені нижче кандидатури для раціоналізації. **Об’єднання є механічними змінами CI;
перемикання/видалення є політичними рішеннями, зарезервованими за оператором.** Наразі нічого
з наведеного нижче не застосовано.

**Також не задокументовано вище** (рекомендаційне, низька інформативність): завдання `docs-lint`
(markdownlint + Vale, усе завдання з `continue-on-error`) та окремі робочі процеси сканерів
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` міститься у
`quality-baseline.json`, але не підключено до блокувального храповика в `ci.yml` — метрика
наразі не використовується.

### Об’єднання / усунення дублювання (механічне, нижчий ризик)

Кожного кандидата було перевірено на відповідність актуальному стану шлюзів 2026-06-17 (довіряй, але перевіряй);
виявилося, що кілька «очевидних» об’єднань приховують технічний борг і **не** є готовими прямими замінами.

- **`check:docs-sync` запускається двічі** — окремо в завданні `lint` і ще раз усередині `check:docs-all` (`docs-sync-strict`) та хука husky pre-commit. ✅ **ВИКОНАНО** — окремий виклик у `lint` видалено.
- **Сканування CVE** — ❌ **НЕ є простим об’єднанням.** `audit:deps` завершується жорсткою помилкою за будь-якої CVE високої/критичної важливості; `check:vuln-ratchet` (osv) завершується помилкою лише в разі _регресії_ відносно базового рівня (наразі 1 MODERATE). Семантика різна — видалення `audit:deps` призвело б до втрати абсолютного шлюзу для високої/критичної важливості. Залишити обидва.
- **Виявлення циклів** — ❌ **НЕ є простим об’єднанням.** `check:circular-deps` (dpdm) повідомляє про **91 цикл** (саме тому він має рекомендаційний статус); його не можна зробити блокувальним, не усунувши їх спочатку, і він має ширше охоплення, ніж успішний, ретельно підібраний `check:cycles`. Залишити `check:cycles` блокувальним; усунення 91 циклу dpdm є окремим пунктом беклогу.
- **Складність** — ✅ **ВИКОНАНО** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): один прохід ESLint, підрахунок за ruleId, щоб базові рівні цикломатичної складності+максимальної кількості рядків і когнітивної складності залишалися незалежними; окремі `check:complexity` / `check:cognitive-complexity` збережено для локального `--update`.
- **Антигалюцинація `/api`** — ✅ **ВИКОНАНО** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): один перелік FS для `src/app/api`, openapi-routes + docs-symbols і надалі звітують незалежно; окремі перевірки збережено для локальних запусків.
- **`check:node-runtime` запускається в 11 завданнях** — ⚠️ **низький ROI.** Кожне виконується на окремому runner, а перевірка триває <1с; загальна економія ~10с ціною втрати дешевого запобіжника для кожного завдання. Не варте супутніх змін.
- **`typecheck:noimplicit:core` у lint CI** — ✅ **видалено із завдання lint** (мало рекомендаційний статус `continue-on-error`); блокувальна поверхня типів — `typecheck:core` + `check:type-coverage`. Локальний скрипт збережено.

### Перемкнути / вирішити (політика оператора)

- `check:openapi-security-tiers` (рекомендаційний) — ❌ **НЕ можна просто перемкнути.** Він завершується з кодом 0, але попереджає, що в кількох маршрутах `traffic-inspector` у `LOCAL_ONLY_API_PREFIXES` немає анотації `x-loopback-only: true`. Для примусового застосування спочатку потрібно додати ці анотації до `openapi.yaml`.
- `typecheck:noimplicit:core` (рекомендаційний) — значною мірою охоплюється блокувальним храповиком `check:type-coverage`. Перетворити на храповик або видалити надлишковий другий прохід `tsc`.
- `test:vitest:ui` (тепер **блокувальний**) — попередньо наявні збої явно виключено у `vitest.config.ts` за допомогою коментарів відстеження `// #8618`; нові збої спричиняють падіння завдання.
- `check:secrets` (gitleaks, блокувальний храповик, зафіксований на рівні 3 задокументованих хибнопозитивних спрацювань) — додати ці 3 випадки до списку дозволів, щоб досягти 0, або понизити до рекомендаційного статусу. Перетинається з нативним скануванням секретів GitHub + `check:public-creds`.
- `check:pr-evidence` (блокувальний, виконує grep у прозовому тексті тіла PR) — високий ризик хибнопозитивних спрацювань; видалення послабить забезпечення виконання Жорсткого правила №18, тож це справді політичне рішення.
- `semgrep` (окремий рекомендаційний процес) — перетинається з CodeQL для сімейств OWASP; підключити його базовий рівень до храповика або видалити.

---

## Пов’язана документація

- Ланцюг постачання (походження, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — шлюз паритету наборів ключів

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, завдання `i18n-ui-coverage`).
Порівнює набір кінцевих ключів кожного `src/i18n/messages/<locale>.json` з `en.json` і завершується
помилкою за наявності будь-якого відсутнього або зайвого кінцевого ключа, незалежно від того, коли
цей ключ було додано. Заповнювачі `__MISSING__:` вважаються наявними (їхній вміст належить до сфери
відповідальності шлюзу співвідношення). Це абсолютне доповнення двох шлюзів на основі різниці/
відсотків: `check-ui-keys-coverage` забезпечує мінімальне покриття 80 % для кожної локалі
(43 відсутні ключі з ~13 000 усе одно дають 99,7 %), а `check-new-key-coverage` оцінює лише ключі,
які PR додає до `en.json`. Пакет локалей генерується з актуального на день створення гілки
`en.json` і перекладається протягом кількох днів, поки до базової гілки продовжують додавати ключі;
сам пакетний PR не додає жодного ключа, тому обидва сусідні шлюзи промовчали, коли пакет 1
(#13044) було інтегровано з нестачею 43 ключів у дев’яти локалях, а пакет 2 (#13660) — з нестачею
10 ключів у восьми (2026-09-15). Щоб усунути помилку, виконайте
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; кінцевий ключ `extra`
означає, що його було видалено з джерела — видаліть його з локалі. `--warn` повідомляє про
проблему без завершення з помилкою. `--catalog=cli` виконує таке саме порівняння для
`bin/cli/locales` (`npm run i18n:check-keys:cli`); обидва кроки виконуються в завданні
`i18n-ui-coverage`.

#### `check-new-key-coverage` — шлюз i18n для нових ключів

Сусідній шлюз для `check-ui-value-drift`. Той виявляє випадок, коли англійське значення було
**переписано**, а його переклади залишилися без змін; цей виявляє випадок, коли англійський ключ
було **додано**, але деякі локалі так його й не отримали.

`check-ui-keys-coverage` не може виявити цей клас проблем: він забезпечує мінімальний відсоток
покриття для кожної локалі, а одинадцять відсутніх ключів із ~13 000 залишають покриття на рівні
99,9 %. Відсоток для окремої мови не може виразити твердження «цю функцію випущено без перекладу» —
ціла функція може потрапити до нової локалі без жодного тексту й ніяк не змінити показник.

Інцидент, який він формалізує: на етапі 3 Orchestration Canvas одинадцять його ключів було
перекладено для 42 локалей, що існували на той момент. Кілька годин потому пакет мов ЄС (#13044)
збільшив кількість локалей у репозиторії до 51, а дев’ять нових локалей (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) так і не отримали ці ключі. `deepMergeFallback` підставляє англійський
текст для відсутнього ключа, тому проявом помилки був неперекладений, а не порожній інтерфейс —
реальна проблема, яка за своєю природою залишалася непомітною.

Як і споріднений шлюз, він **враховує різницю**, порівнюючи англійську версію в базі злиття з
робочим деревом, тому попередні прогалини залишаються зафіксованими, а для ввімкнення шлюзу
не знадобилася міграція.

**Маркер `__MISSING__:<english>` не задовольняє його вимоги (з 2026-09-17).** Раніше це був
задокументований спосіб відкласти переклад — під час виконання система повертається до коректного
англійського тексту, — доки вісім PR із функціональністю від 2026-09-16 не додали 61 ключ і не
проставили цей маркер у всіх 65 локалях замість перекладу: цей шлюз прийняв кожен із них, ніщо
не заблокувало PR, а блокувальний шлюз співвідношення справжніх перекладів потім завершився
помилкою на вершині гілки випуску для всіх (pt-BR 3,2 % > 2,5 % + 0,5). Тепер маркер оцінюється
як відсутній переклад. Щоб усунути помилку, виконайте
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` або
обробіть усі локалі паралельно за допомогою `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, безпечно для від’єднаного запуску, відмовляється запускатися
без змінних середовища `OMNIROUTE_TRANSLATION_*`). Ключ, який має залишатися англійською
(зафіксована назва продукту/рушія/прапорця), слід додати до
`scripts/i18n/untranslatable-keys.json`, а не приховувати за маркером. `vi` повністю забороняє
маркери (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — шлюз відкладених тестів

Файл у списку `exclude` в `vitest.config.ts` — це тест, який не виконується, хоча для того, хто
переглядає дерево, він виглядає як частина покриття. Шістдесят два файли накопичилися за
коментарем `// #8618 — наявна раніше помилка; видаліть це виключення після виправлення`.
Завдання #8618 було закрито 2026-08-11, тоді як відстежуваний ним список виріс із 45 до 62 записів,
кожен новий запис успадковував коментар із посиланням на вже закрите завдання. Коли список нарешті
перевірили файл за файлом (#13204), **51 із 62 тестів пройшов на поточному дереві без жодної зміни
вихідного коду**.

Шлюз вимагає, щоб кожне виключення, яке відповідає реальному файлу, (a) містило номер завдання
для відстеження та (b) було внесено до `config/quality/vitest-exclusions.json` із виміряним
статусом, тож додавання виключення стає доступною для перевірки різницею у спеціальному файлі,
а не ще одним рядком у масиві з 60 записів. Він навмисно не запускає виключені тести повторно —
це займає ~10 хвилин і має виконуватися в періодичному завданні; в інвентарі фіксується дата
останньої перевірки кожного з них.
