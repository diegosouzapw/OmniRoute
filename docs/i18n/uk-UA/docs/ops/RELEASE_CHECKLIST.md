# Release Checklist (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Останнє оновлення:** 2026-08-28 — v3.8.51
> Спрощений процес випуску, що використовує навички Claude Code для автоматизації.
>
> **Підтримуйте чергу/гілку в справному стані між випусками:** див. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (сімейство `/green-prs` + `npm run check:release-green` + `/babysit` + нічний запуск). Періодичне
> виконання цього процесу — і особливо **перед** цим контрольним списком — гарантує, що PR випуску від початку матиме успішні перевірки.

## Коротко

```bash
# 1. Оновіть версію та згенеруйте CHANGELOG (навичка)
/version-bump-cc patch    # або minor/major

# 2. Запустіть локально перевірку якості
npm run check              # лінтинг + тести
npm run test:coverage      # повна перевірка покриття (60/60/60/60)

# 3. Зберіть і виконайте базову перевірку
npm run build
npm run test:e2e           # необов’язково, але рекомендовано

# 4. Згенеруйте випуск (навичка)
/generate-release-cc

# 5. Розгорніть (навичка)
/deploy-vps-both-cc        # або akamai-cc / local-cc

# 6. Зберіть докази випуску (навичка)
/capture-release-evidences-cc
```

## Довірена публікація npm (типово з v3.8.51) — поетапна за запитом, пряма як резервний варіант

`npm-publish.yml` типово виконує публікацію через **довірену публікацію npm (OIDC)**:
завдання `stage-npm` (на хостингу GitHub) обмінює id-токен GitHub на короткострокові облікові
дані npm для цього запуску — без довгострокового токена npm у секретах репозиторію, без запиту 2FA, з доданим підтвердженням походження.
Це механізм обходу, який npm дозволяє тепер, коли токени, що пропускають 2FA, виводяться з обігу;
він відновлює повністю автоматичний процес, який проєкт мав до v3.8.48, водночас зберігаючи
гарантію WS1.3 (витік токена сам по собі не дає змоги виконати публікацію — токена немає).

**Одноразове налаштування (власник):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: власник `diegosouzapw`, репозиторій `OmniRoute`, робочий процес `npm-publish.yml`
(середовище: немає). Доки це не налаштовано, автоматичний крок завершується помилкою `ENEEDAUTH`:
повторно запустіть із `publish_mode=staged` (див. нижче) або `direct`.

### Поетапна публікація (за запитом — `publish_mode=staged`)

Робочий процес npm-publish більше не публікує безпосередньо: він запускає запакований tarball
(`check:pack-boot`), а потім виконує `npm stage publish` — точні байти розміщуються в реєстрі,
але **недоступні для встановлення**, доки власник не надасть схвалення. Людський контроль через 2FA
перенесено на етап ПІСЛЯ перевірки, а не до неї.

**Дії власника після успішного завершення робочого процесу:**

1. `npm stage list omniroute` — знайдіть ідентифікатор етапу (його також наведено в підсумку робочого процесу).
2. Перевірте підготовлені байти (рекомендовано): `npm stage download <id>`, потім установіть
   завантажений tarball у тимчасовий префікс і запустіть його (`npm run check:pack-boot` автоматизує
   таку саму перевірку «пакування→встановлення→запуск» у CI).
3. `npm stage approve <id>` — запит 2FA І Є публікацією. `npm stage reject <id>` відхиляє її.
4. Страхувальна перевірка після публікації: засіб перевірки після публікації (WS1.4 плану v3.8.49) установлює
   опубліковану версію з публічного реєстру в чистому контейнері та запускає її.

**Аварійний резервний варіант:** `workflow_dispatch` із `publish_mode=direct` відновлює
застарілий негайний `npm publish` (використовуйте лише тоді, коли сама поетапна публікація працює некоректно; зафіксуйте причину).

**Одноразове посилення захисту (власник, npmjs.com):** налаштуйте Trusted Publisher для
`omniroute` у режимі лише поетапної публікації, щоб витік довгострокового токена не давав змоги виконати `npm publish`
безпосередньо звідки завгодно — CI може лише підготувати публікацію; випуск здійснюється лише через 2FA власника.

**Інструкція щодо пошкодженого артефакту (без змін):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
як типова перша реакція (виконується за лічені хвилини, з можливістю скасування); `npm unpublish` — лише в межах
72-годинного періоду та за відсутності залежних пакетів і ніколи не як перша дія. Docker: ніколи не перезаписуйте тег версії — відкат
означає перепризначення `latest` на останній справний дайджест.

**Docker Hub `latest` (обов’язково для кожної публікації стабільної версії SemVer):**
робочий процес `docker-publish` має позначати тегами **одночасно** `X.Y.Z` і, коли
`should-promote-latest.sh` підтверджує, що це найвища стабільна версія SemVer, `:latest`
з **однаковим дайджестом**. Після виконання завдання: дайджест Hub `latest` дорівнює дайджесту нової
версії SemVer, а `last_updated` оновлено. Не залишайте `:latest` на старішій
збірці, коли примітки до випуску описують виправлення, доступні лише в git. Початкові
конфігурації Compose використовують `:latest`; GitOps має й надалі фіксувати `X.Y.Z`. Див.
[Канали випуску Docker](../guides/DOCKER_GUIDE.md#release-channels) і #10317.

## Швидкий шлях для термінових виправлень (мітка `hotfix`)

PR із міткою `hotfix` пропускає важку матрицю CI (9-сегментний E2E, контрольне підвищення покриття,
quality-gate, quality-extended) і зберігає швидкі та інформативні перевірки: збірку,
сегменти модульних тестів, інтеграційні тести, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
і перевірку запуску з tarball (`check:pack-boot`). Мета: успішне завершення за ≤15 хв замість ~33 хв.

**Політика допуску — обов’язкові всі чотири умови (за зразком аварійних шляхів Chromium/VS Code/Node):**

1. **Критичність**: продакшен не працює — опублікований артефакт аварійно завершується під час запуску /
   виправлення безпеки / проблема стосується кожного користувача релізу. «Важливо» не означає «не працює».
2. **Повноваження**: лише власник репозиторію застосовує мітку `hotfix`. Мітка І Є
   схваленням — ніколи не застосовуйте її самостійно до PR кампанії.
3. **Докази**: тіло PR містить посилання на попередній повністю успішний важкий запуск (набір,
   який повторно перевірили б пропущені завдання), а також на власний тест виправлення, який спочатку завершується невдало, а потім успішно.
4. **Обсяг**: лише cherry-pick — мінімальне виправлення, без рефакторингу та супутніх змін.

Пропущена поверхня покриття/контрольного підвищення повторно перевіряється наступним повним запуском у
гілці релізу (безперервно успішний стан релізу) — цей шлях пропускає ОЧІКУВАННЯ, але ніколи не пропускає перевірку.
Зміни лише в тестах (усі файли в `tests/`, жодного в `tests/e2e/`) пропускають матрицю E2E
автоматично, без будь-якої мітки.

## Докладний контрольний список

### Перед релізом

- [ ] Усі PR, призначені для цього релізу, об’єднано з `release/vX.Y.0`
- [ ] Усі відкриті елементи Linear/задачі для цієї версії закрито або перенесено до наступного етапу
- [ ] CI успішний у гілці `release/vX.Y.0`
- [ ] У коді немає маркерів `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовий образ Docker актуальний (наразі `node:24.15.0-trixie-slim`)

### Версія та журнал змін

- [ ] Виконайте `/version-bump-cc <patch|minor|major>` (навичка Claude Code)
  - Підвищує версії в `package.json`, `electron/package.json`
  - Повторно генерує `CHANGELOG.md` із комітів git після останнього тегу
  - Оновлює значки README.md
- [ ] Вручну перегляньте CHANGELOG.md і за потреби виправте повідомлення комітів
- [ ] Переконайтеся, що останній розділ semver у `CHANGELOG.md` відповідає версії в `package.json`
- [ ] Залишайте `## [Unreleased]` першим розділом журналу змін для майбутньої роботи
- [ ] Оновіть `docs/openapi.yaml` → `info.version` має відповідати версії в `package.json`

### Якість коду

- [ ] `npm run lint` — 0 помилок (попередження існували раніше)
- [ ] `npm run typecheck:core` — без помилок
- [ ] `npm run typecheck:noimplicit:core` — без помилок (суворий режим)
- [ ] `npm run check:cycles` — немає циклічних залежностей
- [ ] `npm run check:any-budget:t11` — у межах бюджету
- [ ] `npm run check:route-validation:t06` — без помилок
- [ ] `npm run check:node-runtime` — дотримано мінімальну підтримувану версію середовища виконання (`>=22.22.2 <23`, `>=24.0.0 <27`, відповідно до `SUPPORTED_NODE_RANGE` у `src/shared/utils/nodeRuntimeSupport.ts`; узгоджено з `engines` у `package.json`)

### Тестування

- [ ] `npm run test:unit` — успішно
- [ ] `npm run test:vitest` — успішно (сервер MCP, autoCombo, кеш)
- [ ] `npm run test:coverage` — поріг 60/60/60/60 виконано (інструкції/рядки/функції/гілки)
- [ ] `npm run test:integration` — успішно (якщо зміни стосуються БД / обробників)
- [ ] `npm run test:combo:matrix` — успішно (матриця комбінованих стратегій: детерміновано підтверджує рішення щодо вибору для всіх 19 загальнодоступних стратегій маршрутизації; запускайте під час змін комбінованої маршрутизації, визначення стратегії або резервної логіки)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **необов’язково/вручну** (керована прапорцем перевірка з реальними зовнішніми сервісами; отримує доступний лише для читання знімок БД із VPS `root@192.168.0.15`; звертається до реальних провайдерів, витрачає кредити; ніколи не запускається в CI; без прапорця коректно пропускається)
- [ ] `npm run test:combo:live:vps` — **необов’язково/вручну** (перевірка на реальному VPS для фази 3: 7 HTTP-сценаріїв із живим сервером `.15` через звичайний Node ESM; потребує `ssh root@192.168.0.15`; створює/видаляє лише комбінації `__live_test__*`; звертається до реальних провайдерів; ніколи не запускається в CI)
- [ ] `npm run test:e2e` — успішно (зміни інтерфейсу)
- [ ] `npm run test:protocols:e2e` — успішно (зміни MCP/A2A)
- [ ] `npm run test:ecosystem` — успішно

### Хуки (перевірено Husky)

Хуки Husky розташовані в `.husky/` і запускаються автоматично під час операцій git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** швидкі детерміновані перевірки — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активовано 2026-06-13). Навмисно виключає `test:unit` (повільний; охоплюється завданням CI `test-unit`).
  - Запускайте `npm run test:unit` вручну перед надсиланням гілок релізу.

Якщо хук завершується невдало: виправте першопричину, не обходьте його за допомогою `--no-verify`.

### Conventional Commits

Усі коміти, призначені для релізу, мають відповідати формату `type(scope): subject`.

**Допустимі типи:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Допустимі області:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Несумісні зміни: додайте нижній колонтитул `BREAKING CHANGE:` або `!` після області (наприклад, `feat(api)!: drop /v0`).

### Документація

- [ ] `npm run check:docs-sync` проходить успішно (автоматично запускається через pre-commit)
- [ ] `npm run check:docs-all` проходить успішно (сукупна перевірка: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завершується з кодом 0 — контракт змінних середовища між кодом ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` не порушено
- [ ] `npm run check:doc-links` завершується з кодом 0 — після реструктуризації немає пошкоджених внутрішніх посилань Markdown
- [ ] `docs/architecture/ARCHITECTURE.md` перевірено на розбіжності щодо сховища та середовища виконання
- [ ] `docs/guides/TROUBLESHOOTING.md` перевірено на розбіжності щодо змінних середовища та експлуатації
- [ ] Якщо `.env.example` змінено: `docs/reference/ENVIRONMENT.md` оновлено
- [ ] Якщо нова функція має інтерфейс користувача: її згадано в `docs/guides/USER_GUIDE.md`
- [ ] Якщо нова функція має API: оновлено `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Якщо нова функція є модулем: існує окремий файл `docs/<MODULE>.md`
- [ ] Якщо зміна порушує зворотну сумісність: у `docs/guides/TROUBLESHOOTING.md` є примітка щодо міграції

### i18n

- [ ] `npm run i18n:check` завершується з кодом 0 — стан перекладів (`.i18n-state.json`) синхронізовано з початковою документацією (у суворому режимі немає джерел із розбіжностями; попередження в режимі попереджень прийнятні для правок документації в останню хвилину, але перед створенням тегу код завершення має бути 0)
- [ ] `npm run i18n:check-ui-coverage` завершується з кодом 0 — кожна локаль інтерфейсу користувача має покриття не нижче за мінімальний поріг 80%
- [ ] `npm run i18n:sync-ui:dry` повідомляє про 0 відсутніх ключів у всіх 42 локалях
- [ ] Якщо початкову англомовну документацію змінено, перед створенням тегу запустіть `npm run i18n:run` (потребує `OMNIROUTE_TRANSLATION_API_KEY` у `.env`)
- [ ] Незначні доповнення до перекладів можна відкласти до наступного випуску (зафіксуйте це в CHANGELOG)

### Міграції бази даних

- [ ] Якщо в `src/lib/db/migrations/` є нові файли:
  - [ ] Кожна міграція є ідемпотентною (`CREATE TABLE IF NOT EXISTS` тощо)
  - [ ] Міграції загорнуто в транзакції
  - [ ] Нумерація правильна (без пропусків у послідовності)
- [ ] Перевірте на чистому встановленні: видаліть `~/.omniroute/omniroute.db` і запустіть `npm run dev`
- [ ] Перевірте на наявному встановленні: створіть резервну копію БД, запустіть міграцію та перевірте схему
- [ ] Якщо міграція перезаписує таблиці, файли WAL (`-wal`, `-shm`) обробляються правильно

### Каталог постачальників (із перевіркою Zod)

- [ ] Схема Zod у `src/shared/constants/providers.ts` є дійсною під час завантаження
  - [ ] Усі постачальники мають обов’язкові поля (`id`, `label`, `kind` тощо)
  - [ ] Для нових безкоштовних постачальників указано `freeNote`
  - [ ] Постачальники OAuth мають `oauthConfig`, зареєстровану в `src/lib/oauth/constants/oauth.ts`
- [ ] Якщо додано нового постачальника: у `open-sse/executors/` є відповідний виконавець
- [ ] Якщо формат відрізняється від OpenAI: у `open-sse/translator/` є перетворювач
- [ ] Моделі зареєстровано в `open-sse/config/providerRegistry.ts`
- [ ] Модульні тести в `tests/unit/` охоплюють класифікацію постачальників і маршрутизацію

### Настільний застосунок (Electron)

Якщо `electron/` змінено:

- [ ] `npm run electron:smoke:packaged` проходить успішно
- [ ] Збірки перевірено принаймні для однієї з платформ: `:win`, `:mac`, `:linux`
- [ ] Сертифікати підписування коду не прострочені (якщо використовується підписування)
- [ ] Версія в `electron/package.json` відповідає кореневому `package.json`
- [ ] Якщо випуск призначено для `stable`, вказівник каналу автоматичного оновлення оновлено

### Структура збірки

Репозиторій використовує три окремі каталоги результатів — ніколи не плутайте їх:

| Каталог   | Призначення                                                               | Відстежується?   |
| --------- | ------------------------------------------------------------------------- | ---------------- |
| `src/`    | Початковий код застосунку (TypeScript / TSX)                              | Так              |
| `.build/` | Проміжні файли збірки — результат `next build` (`distDir`)                | Ні (у gitignore) |
| `dist/`   | Готовий до розповсюдження пакет npm — зібраний через `assembleStandalone` | Ні (у gitignore) |

> **Примітка для оператора:** каталог образу на віддаленому VPS залишається `/usr/lib/node_modules/omniroute/app/`.
> Змінився лише результат збірки **в репозиторії** (`app/` → `dist/`). Сценарії розгортання синхронізують
> вміст `dist/` через rsync із віддаленим каталогом `app/` — змінювати шляхи на VPS не потрібно.

**Процес єдиної збірки:**

```
npm run build:release
  └─ rm -rf .build dist          (очищення)
  └─ next build → .build/next/   (проміжні файли)
  └─ assembleStandalone          (копіює standalone + static + public + нативні компоненти → dist/)
  └─ записує dist/BUILD_SHA      (контрольний маркер HEAD)
```

Для розгортання НЕ запускайте `npm run build`, а потім окремо `npm run build:cli` — використовуйте
`npm run build:release`, що виконує чисту повторну збірку та створює контрольний маркер однією командою.

### Перевірка артефактів

- [ ] `npm run build:release` завершується успішно, а `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` не виявляє проблем — немає `app.__qa_backup`, `scripts/scratch`, `package-lock.json` чи інших локальних залишкових файлів
- [ ] Після збірки існує `dist/server.js`

### Створення тегу та випуск

- [ ] Запустіть `/generate-release-cc` (навичка Claude Code):
  - Створює тег `vX.Y.Z`
  - Надсилає тег і гілку
  - Створює випуск GitHub з описом зі списку змін
  - Додає інсталятори Electron (якщо їх зібрано)
- [ ] Або вручну:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Розгортання

Сценарії розгортання використовують полегшений процес rsync — без `npm pack` і без `npm i -g`:

- [ ] Використовуйте сценарій розгортання, що відповідає цільовому середовищу:
  - `/deploy-vps-local-cc` — локальний VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — обидва
- [ ] Перед розгортанням переконайтеся, що `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Збірка має виконуватися там, де `node_modules` є справжнім каталогом (основна робоча копія або робоче дерево після `npm ci` — НЕ робоче дерево із символічним посиланням)
- [ ] Виконайте димове тестування розгорнутого екземпляра:
  - Відкрийте `/dashboard/health` → перевірте, чи рядок версії відповідає випуску
  - Виконайте запит до `/v1/chat/completions` із відомим постачальником
  - Переконайтеся, що `/api/monitoring/health` повертає автоматичні вимикачі зі станом `CLOSED`
  - Переконайтеся, що транспорти MCP відповідають (`/mcp` HTTP, `/mcp-sse` SSE)

### Після випуску

- [ ] Запустити `/capture-release-evidences-cc` (навичка Claude Code)
  - Створює знімки екрана/записи нових функцій у форматі WebP
  - Додає їх до приміток до випуску / допису в блозі
- [ ] Оновити GitHub Discussions / Discord, додавши оголошення про випуск
- [ ] Відкрити етап для наступної версії
- [ ] Якщо випуск критично важливий: закріпити обговорення або опублікувати його в `news.json` для банера в застосунку

### Умови публічного запуску Radar

Оголошення Radar навмисно закомічено з `active: false`. Активація є окремою
зміною, яку слід виконати після документального підтвердження кожного пункту нижче:

- [ ] Усі послідовно залежні PR Radar об’єднано, а CI вершини гілки випуску успішно пройдено
- [ ] Розгорнути та виконати базову перевірку маршрутів OSS Radar, залишивши `RADAR_ENABLED` вимкненим за замовчуванням
- [ ] Виконати базову перевірку `GET /planos`, `/termos`, `/privacidade` та `/reembolso` на вказаному хості Radar
- [ ] Записати ідентифікаційні дані/контактну інформацію/адресу оператора та схвалений власником результат юридичної перевірки в приватному сервісі
- [ ] Перевірити Stripe Checkout і підписаний вебхук лише в тестовому режимі
- [ ] Перевірити одне доставлення зашифрованого транзакційного електронного листа із затвердженими відправником/доменом
- [ ] Підтвердити відновлення з резервної копії та один контрольований дослідницький запуск з обмеженим бюджетом
- [ ] Затвердити політику перевірки BRL/PIX перед прийняттям підтвердження пожертви
- [ ] Увімкнути публічний Checkout лише після проходження попередніх етапів, а потім активувати новий ID у `news.json`
- [ ] Переконатися, що банер на головній сторінці використовує локалізований текст, а новий ID з’являється після відхилення старішого ID

## Smoke-тест вбудованих сервісів (v3.8.4+)

Перед випуском будь-якого релізу, що містить зміни у вбудованих сервісах, перевірте:

### Запуск із новою БД (виявляє конфлікти міграцій — додано після термінового виправлення v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — зачекайте 10 с на запуск
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` повертає `"9router"` (НЕ 404, НЕ 500). Підтверджує, що міграцію `071_services.sql` застосовано й початковий рядок додано.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` повертає 3 рядки.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` повертає 2 рядки (підтверджує застосування `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` успішно виконується — захищає від майбутніх конфліктів.

### 9Router

- [ ] `POST /api/services/9router/install` повертає 200 з `installedVersion` менш ніж за 2 хв
- [ ] `POST /api/services/9router/start` повертає 200 і `state: "running"` менш ніж за 30 с
- [ ] `GET /api/services/9router/status` повідомляє `health: "healthy"`
- [ ] `POST /v1/chat/completions` із `"model": "9router/auto/..."` повертає 200 (наскрізна маршрутизація через 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` відображає нативний інтерфейс 9Router усередині проксі (без прямого iframe із `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` повертає `{ keyRotated: true }`, а сервіс коректно перезапускається
- [ ] `POST /api/services/9router/stop` повертає 200 і `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` повертає потік SSE з подією `snapshot`, що містить останні рядки
- [ ] Установлення в середовищі без `npm` у PATH повертає 500 зі зрозумілим повідомленням про помилку (без трасування стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` повертає 200 менш ніж за 2 хв
- [ ] `POST /api/services/cliproxy/start` повертає 200 і `state: "running"` менш ніж за 30 с
- [ ] `GET /api/services/cliproxy/status` повідомляє `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` повертає 200 і `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` повертає потік SSE

### Регресія безпеки

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` повертає `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` повертає `403 LOCAL_ONLY`
- [ ] Відповіді з помилками від `/api/services/*` не містять `err.stack` або абсолютних шляхів до файлів

## Перевірки для v3.8.0+

Перед випуском будь-якого релізу v3.8.x перевірте також такі пункти:

- [ ] `omniroute --tray` запускається на macOS (systray2 установлено в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` запускається на Linux (потрібна змінна DISPLAY; коректна помилка, якщо її не задано)
- [ ] `omniroute --tray` запускається на Windows (PowerShell NotifyIcon, без додаткових бінарних файлів)
- [ ] `omniroute config tray enable` створює запис автозапуску; вимкнення видаляє його
- [ ] `npm install -g omniroute@<this-version>` виконує postinstall без аварійного завершення
- [ ] Процес оновлення зберігає необов’язкові залежності: `omniroute update --apply` і засіб автоматичного оновлення
      виконують `npm install -g … --include=optional`, щоб `optionalDependencies` (better-sqlite3,
      keytar, tls-client і стек SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) зберігалися після оновлення. Рівню SLM ultra з `modelPath` також потрібна
      модель tinybert, яка автоматично завантажується до `${DATA_DIR}/models/llmlingua` під час першого використання. Потім postinstall
      (`scripts/build/colocateOptionals.mjs`) розміщує замикання необов’язкових залежностей SLM у
      `dist/node_modules`, щоб воркер використовував ЄДИНИЙ екземпляр `@huggingface/transformers` ^4.2.0
      — автономне трасування включає лише transformers, а не динамічно імпортовані
      необов’язкові залежності, тому без цього воркер завантажував би llmlingua-2 із кореневою версією transformers,
      а рівень SLM непомітно переходив би до резервного режиму.
- [ ] `omniroute status` працює без `.env` (шлях токена CLI, лише loopback)
- [ ] `curl http://localhost:20128/api/shutdown` повертає 401 (маршрут завжди захищений)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` повертає 401 (захист loopback)
- [ ] Середовище виконання SQLite визначається як `bundled` під час першого запуску (вбудований бінарний файл дійсний для платформи)
- [ ] Середовище виконання SQLite переходить до `runtime`, коли `node_modules/better-sqlite3` видалено
- [ ] Розумний фільтр MCP стискає реальний вивід `playwright-mcp browser_snapshot` (скорочення ≥50%)
- [ ] Усі 10 файлів `skills/omniroute*/SKILL.md` доступні публічно через необроблену URL-адресу GitHub
- [ ] Майстер початкового налаштування показує крок огляду рівнів "Як це працює" під час нового налаштування
- [ ] Віджет покриття рівнів на головній інформаційній панелі показує кількість налаштованих/активних рівнів

---

## Відкочування

Якщо випуск має критичну проблему:

1. `gh release edit vX.Y.Z --prerelease` (позначає як не найновіший)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (лише якщо користувачі ще не почали його використовувати)
3. Або: термінове виправлення в `release/vX.Y.0` → випуск виправлення `vX.Y.(Z+1)`
4. Негайно повідомте про це в GitHub Discussions і Discord

## Суворі правила

- Ніколи не робіть коміти безпосередньо в `main`
- Ніколи не використовуйте `git push --force` для гілок `main` або `release/*`
- Ніколи не пропускайте хуки Husky (`--no-verify`)
- Ніколи не додавайте до комітів секрети, облікові дані або файли `.env`
- Покриття має залишатися ≥60/60/60/60 (оператори/рядки/функції/гілки)
- Завжди додавайте або оновлюйте тести під час зміни робочого коду в `src/`, `open-sse/`, `electron/` або `bin/`

## Автоматизована перевірка синхронізації

Перед відкриттям PR локально запустіть перевірку синхронізації документації:

```bash
npm run check:docs-sync
```

CI також запускає цю перевірку в `.github/workflows/ci.yml` (завдання lint).
