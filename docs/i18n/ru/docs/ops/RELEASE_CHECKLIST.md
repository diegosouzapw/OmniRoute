# Release Checklist (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последнее обновление:** 2026-08-28 — v3.8.51
> Оптимизированный процесс выпуска, использующий навыки Claude Code для автоматизации.
>
> **Поддерживайте очередь/ветку в рабочем состоянии между выпусками:** см. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейство `/green-prs` + `npm run check:release-green` + `/babysit` + ночной запуск). Периодический запуск
> этого процесса — и особенно **перед** выполнением этого контрольного списка — позволяет начать работу над PR выпуска с успешно пройденными проверками.

## Кратко

```bash
# 1. Обновите версию и сгенерируйте CHANGELOG (навык)
/version-bump-cc patch    # или minor/major

# 2. Локально выполните проверку качества
npm run check              # линтинг + тесты
npm run test:coverage      # полная проверка покрытия (60/60/60/60)

# 3. Выполните сборку и быструю проверку
npm run build
npm run test:e2e           # необязательно, но рекомендуется

# 4. Сгенерируйте выпуск (навык)
/generate-release-cc

# 5. Выполните развёртывание (навык)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Соберите подтверждения выпуска (навык)
/capture-release-evidences-cc
```

## npm Trusted Publishing (по умолчанию с v3.8.51) — по запросу через промежуточную публикацию, напрямую как резервный вариант

`npm-publish.yml` по умолчанию выполняет публикацию через **npm Trusted Publishing (OIDC)**:
задача `stage-npm` (на GitHub-hosted раннере) обменивает id-token GitHub на краткосрочные учётные
данные npm для этого запуска — без долгосрочного токена npm в секретах репозитория, без запроса 2FA и с прикреплённым подтверждением происхождения.
Это обходной путь, который теперь допускает npm в связи с прекращением поддержки токенов, позволяющих пропускать 2FA;
он восстанавливает полностью автоматический процесс, который использовался в проекте до v3.8.48, сохраняя при этом
гарантию WS1.3 (утёкший токен сам по себе не позволяет выполнить публикацию — токена вообще нет).

**Однократная настройка (владелец):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: владелец `diegosouzapw`, репозиторий `OmniRoute`, рабочий процесс `npm-publish.yml`
(окружение: отсутствует). Пока такая настройка не выполнена, автоматический шаг завершается ошибкой `ENEEDAUTH`:
запустите его повторно с `publish_mode=staged` (см. ниже) или `direct`.

### Промежуточная публикация (по запросу — `publish_mode=staged`)

Рабочий процесс npm-publish больше не публикует пакет напрямую: он запускает упакованный tarball
(`check:pack-boot`), а затем выполняет `npm stage publish` — точные байты размещаются в реестре,
но **недоступны для установки**, пока владелец не подтвердит публикацию. Контрольная точка 2FA с участием человека
перенесена на этап ПОСЛЕ проверки, а не до неё.

**Действия владельца после успешного завершения рабочего процесса:**

1. `npm stage list omniroute` — найдите идентификатор промежуточной публикации (он также выводится в сводке рабочего процесса).
2. Проверьте подготовленные байты (рекомендуется): `npm stage download <id>`, затем установите
   загруженный tarball во временный префикс и запустите его (`npm run check:pack-boot` автоматизирует
   такую же проверку «упаковка → установка → запуск» в CI).
3. `npm stage approve <id>` — запрос 2FA И ЕСТЬ публикация. `npm stage reject <id>` отменяет её.
4. Защита после публикации: средство проверки после публикации (WS1.4 плана v3.8.49) устанавливает
   опубликованную версию из общедоступного реестра в чистом контейнере и запускает её.

**Аварийный резервный вариант:** `workflow_dispatch` с `publish_mode=direct` восстанавливает
прежнюю немедленную команду `npm publish` (используйте только при некорректной работе промежуточной публикации; зафиксируйте причину).

**Однократное усиление защиты (владелец, npmjs.com):** настройте Trusted Publisher для
`omniroute` в режиме только промежуточной публикации, чтобы утёкший долгосрочный токен не мог выполнить `npm publish`
напрямую откуда-либо — CI может только подготовить публикацию; выпустить её может только владелец с помощью 2FA.

**Порядок действий при повреждённом артефакте (без изменений):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
в качестве стандартной первой меры (занимает минуты, обратимо); используйте `npm unpublish` только в пределах окна 72 часа/при отсутствии зависимых пакетов
и никогда не делайте это первым действием. Docker: никогда не перезаписывайте тег версии — откат
выполняется переназначением `latest` на последний исправный дайджест.

**Docker Hub `latest` (обязательно при каждой публикации стабильной версии SemVer):**
рабочий процесс `docker-publish` должен устанавливать **оба** тега — `X.Y.Z` и, если
`should-promote-latest.sh` подтверждает, что это самая высокая стабильная версия SemVer, `:latest` —
с **одинаковым дайджестом**. После выполнения задачи: дайджест `latest` в Hub должен совпадать с дайджестом новой
версии SemVer, а значение `last_updated` должно обновиться. Не оставляйте `:latest` указывающим на более старую
сборку, если в примечаниях к выпуску описаны исправления, присутствующие только в git. В примерах быстрого запуска Compose
используется `:latest`; в GitOps следует продолжать фиксировать `X.Y.Z`. См.
[Каналы выпусков Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Ускоренный путь для экстренных исправлений (метка `hotfix`)

PR с меткой `hotfix` пропускает тяжёлую матрицу CI (9-сегментные E2E, контроль порога покрытия,
quality-gate, quality-extended) и сохраняет быстрые, высокоинформативные проверки: сборку,
сегменты модульных тестов, интеграционные тесты, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
и проверку запуска из tarball (`check:pack-boot`). Цель: получить зелёный статус за ≤15 мин вместо ~33 мин.

**Условия допуска — обязательны все четыре (по образцу экстренных путей Chromium/VS Code/Node):**

1. **Критичность**: продакшен сломан — опубликованный артефакт аварийно завершается при запуске /
   исправление безопасности / проблема затрагивает каждого пользователя релиза. «Важно» не означает «сломано».
2. **Полномочия**: только владелец репозитория может применить метку `hotfix`. Сама метка ЯВЛЯЕТСЯ
   одобрением — никогда не применяйте её самостоятельно к PR кампании.
3. **Доказательства**: в описании PR есть ссылка на предыдущий полностью зелёный тяжёлый прогон (набор,
   который повторно проверили бы пропущенные задания), а также тест самого исправления, который сначала падает, а затем проходит.
4. **Объём изменений**: только cherry-pick — минимальное исправление, без рефакторинга и попутных изменений.

Пропущенные проверки покрытия и порогов повторно выполняются при следующем полном прогоне в
ветке релиза (непрерывный зелёный статус релиза) — этот путь пропускает ОЖИДАНИЕ, но никогда не пропускает валидацию.
Изменения только в тестах (все файлы находятся в `tests/`, ни одного в `tests/e2e/`) автоматически пропускают матрицу
E2E без какой-либо метки.

## Подробный контрольный список

### Перед релизом

- [ ] Все PR, предназначенные для этого релиза, влиты в `release/vX.Y.0`
- [ ] Все открытые элементы Linear/issue для этой версии закрыты или перенесены на следующий этап
- [ ] CI в ветке `release/vX.Y.0` имеет зелёный статус
- [ ] В коде нет маркеров `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовый образ Docker актуален (сейчас `node:24.15.0-trixie-slim`)

### Версия и журнал изменений

- [ ] Выполнить `/version-bump-cc <patch|minor|major>` (навык Claude Code)
  - Обновляет версии в `package.json`, `electron/package.json`
  - Повторно генерирует `CHANGELOG.md` из коммитов git с момента последнего тега
  - Обновляет значки в README.md
- [ ] Вручную проверить CHANGELOG.md и при необходимости привести сообщения коммитов в порядок
- [ ] Убедиться, что последний раздел semver в `CHANGELOG.md` соответствует версии в `package.json`
- [ ] Сохранить `## [Unreleased]` первым разделом журнала изменений для предстоящей работы
- [ ] Обновить `docs/openapi.yaml` → `info.version` должна соответствовать версии в `package.json`

### Качество кода

- [ ] `npm run lint` — 0 ошибок (предупреждения существовали ранее)
- [ ] `npm run typecheck:core` — без ошибок
- [ ] `npm run typecheck:noimplicit:core` — без ошибок (строгий режим)
- [ ] `npm run check:cycles` — нет циклических зависимостей
- [ ] `npm run check:any-budget:t11` — в пределах бюджета
- [ ] `npm run check:route-validation:t06` — без ошибок
- [ ] `npm run check:node-runtime` — соблюдена нижняя граница поддерживаемой среды выполнения (`>=22.22.2 <23`, `>=24.0.0 <27`, согласно `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; согласовано с `engines` в `package.json`)

### Тестирование

- [ ] `npm run test:unit` — успешно
- [ ] `npm run test:vitest` — успешно (сервер MCP, autoCombo, кеш)
- [ ] `npm run test:coverage` — порог 60/60/60/60 соблюдён (инструкции/строки/функции/ветви)
- [ ] `npm run test:integration` — успешно (если изменения затрагивают БД / обработчики)
- [ ] `npm run test:combo:matrix` — успешно (матрица стратегий combo: детерминированно подтверждает решения о выборе для всех 19 публичных стратегий маршрутизации; запускать при изменении маршрутизации combo, разрешения стратегий или логики отката)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **необязательно/вручную** (ограниченная проверка на реальных внешних сервисах; получает снимок БД только для чтения с VPS `root@192.168.0.15`; обращается к реальным провайдерам и расходует кредиты; никогда не запускается в CI; корректно пропускается без разрешающего параметра)
- [ ] `npm run test:combo:live:vps` — **необязательно/вручную** (проверка Phase-3 на рабочем VPS: 7 HTTP-сценариев на действующем сервере `.15` через обычный Node ESM; требуется `ssh root@192.168.0.15`; создаёт/удаляет только комбинации `__live_test__*`; обращается к реальным провайдерам; никогда не запускается в CI)
- [ ] `npm run test:e2e` — успешно (изменения UI)
- [ ] `npm run test:protocols:e2e` — успешно (изменения MCP/A2A)
- [ ] `npm run test:ecosystem` — успешно

### Хуки (проверяются Husky)

Хуки Husky находятся в `.husky/` и автоматически запускаются при операциях git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** быстрые детерминированные проверки — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активированы 2026-06-13). Намеренно не включает `test:unit` (медленный; выполняется заданием CI `test-unit`).
  - Перед отправкой веток релиза вручную запустите `npm run test:unit`.

Если хук завершается с ошибкой: устраните основную проблему, не обходите проверку с помощью `--no-verify`.

### Conventional Commits

Все коммиты, предназначенные для релиза, должны соответствовать формату `type(scope): subject`.

**Допустимые типы:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Допустимые области:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Критические изменения: добавьте нижний колонтитул `BREAKING CHANGE:` или `!` после области (например, `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` завершается успешно (автоматически запускается перед коммитом)
- [ ] `npm run check:docs-all` завершается успешно (общая проверка: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завершается с кодом 0 — контракт переменных окружения между кодом ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` не нарушен
- [ ] `npm run check:doc-links` завершается с кодом 0 — после реструктуризации нет неработающих внутренних ссылок Markdown
- [ ] `docs/architecture/ARCHITECTURE.md` проверен на расхождения в описании хранилища и среды выполнения
- [ ] `docs/guides/TROUBLESHOOTING.md` проверен на расхождения в переменных окружения и эксплуатационных процедурах
- [ ] Если `.env.example` изменён: обновлён `docs/reference/ENVIRONMENT.md`
- [ ] Если новая функция имеет пользовательский интерфейс: она упомянута в `docs/guides/USER_GUIDE.md`
- [ ] Если новая функция имеет API: обновлены `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Если новая функция является модулем: существует отдельный файл `docs/<MODULE>.md`
- [ ] Если изменение нарушает обратную совместимость: в `docs/guides/TROUBLESHOOTING.md` есть примечание о миграции

### i18n

- [ ] `npm run i18n:check` завершается с кодом 0 — состояние переводов (`.i18n-state.json`) синхронизировано с исходной документацией (в строгом режиме нет рассинхронизированных исходных файлов; предупреждения в режиме warn допустимы для внесённых в последний момент правок документации, но перед созданием тега результат должен быть 0)
- [ ] `npm run i18n:check-ui-coverage` завершается с кодом 0 — покрытие каждой локали пользовательского интерфейса не ниже порога 80%
- [ ] `npm run i18n:sync-ui:dry` сообщает об отсутствии недостающих ключей во всех 42 локалях
- [ ] Если исходная документация на английском языке изменилась, перед созданием тега выполните `npm run i18n:run` (требуется `OMNIROUTE_TRANSLATION_API_KEY` в `.env`)
- [ ] Небольшие изменения переводов можно отложить до следующего выпуска (зафиксируйте это в CHANGELOG)

### Миграции базы данных

- [ ] Если в `src/lib/db/migrations/` появились новые файлы:
  - [ ] Каждая миграция идемпотентна (`CREATE TABLE IF NOT EXISTS` и т. д.)
  - [ ] Миграции выполняются в транзакциях
  - [ ] Нумерация корректна (без пропусков в последовательности)
- [ ] Проверка при чистой установке: удалите `~/.omniroute/omniroute.db` и выполните `npm run dev`
- [ ] Проверка при существующей установке: создайте резервную копию БД, выполните миграцию и проверьте схему
- [ ] Файлы WAL (`-wal`, `-shm`) обрабатываются корректно, если миграция перезаписывает таблицы

### Каталог провайдеров (с валидацией Zod)

- [ ] Схема Zod в `src/shared/constants/providers.ts` проходит валидацию при загрузке
  - [ ] У всех провайдеров имеются обязательные поля (`id`, `label`, `kind` и т. д.)
  - [ ] Для новых бесплатных провайдеров указано поле `freeNote`
  - [ ] OAuth-провайдеры имеют `oauthConfig`, зарегистрированный в `src/lib/oauth/constants/oauth.ts`
- [ ] Если добавлен новый провайдер: в `open-sse/executors/` есть соответствующий исполнитель
- [ ] Если используется формат, отличный от OpenAI: в `open-sse/translator/` есть преобразователь
- [ ] Модели зарегистрированы в `open-sse/config/providerRegistry.ts`
- [ ] Модульные тесты в `tests/unit/` охватывают классификацию и маршрутизацию провайдеров

### Настольное приложение (Electron)

Если изменён каталог `electron/`:

- [ ] `npm run electron:smoke:packaged` завершается успешно
- [ ] Сборки протестированы как минимум для одной из платформ: `:win`, `:mac`, `:linux`
- [ ] Срок действия сертификатов подписи кода не истёк (если используется подпись)
- [ ] Версия в `electron/package.json` соответствует версии в корневом `package.json`
- [ ] При выпуске в канал `stable` обновлён указатель канала автоматического обновления

### Структура сборки

Репозиторий использует три отдельных каталога вывода — никогда не путайте их:

| Каталог   | Назначение                                                  | Отслеживается?    |
| --------- | ----------------------------------------------------------- | ----------------- |
| `src/`    | Исходный код приложения (TypeScript / TSX)                  | Да                |
| `.build/` | Промежуточные файлы сборки — вывод `next build` (`distDir`) | Нет (в gitignore) |
| `dist/`   | Публикуемый npm-пакет — формируется `assembleStandalone`    | Нет (в gitignore) |

> **Примечание для оператора:** каталог образа на удалённом VPS по-прежнему находится по пути `/usr/lib/node_modules/omniroute/app/`.
> Изменился только вывод сборки **внутри репозитория** (`app/` → `dist/`). Сценарии развёртывания синхронизируют
> содержимое `dist/` с помощью rsync в удалённый каталог `app/` — изменять пути на VPS не требуется.

**Процесс однократной сборки:**

```
npm run build:release
  └─ rm -rf .build dist          (очистка)
  └─ next build → .build/next/   (промежуточные файлы)
  └─ assembleStandalone          (копирует standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (контрольный файл HEAD)
```

Для развёртывания НЕ запускайте `npm run build`, а затем отдельно `npm run build:cli` — используйте
`npm run build:release`, который выполняет чистую повторную сборку и создаёт контрольный файл одной командой.

### Проверка артефактов

- [ ] `npm run build:release` завершается успешно, и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` завершается без замечаний — отсутствуют `app.__qa_backup`, `scripts/scratch`, `package-lock.json` и другие локальные остаточные файлы
- [ ] После сборки существует `dist/server.js`

### Создание тега и выпуск

- [ ] Выполните `/generate-release-cc` (навык Claude Code):
  - Создаёт тег `vX.Y.Z`
  - Отправляет тег и ветку
  - Создаёт выпуск GitHub с текстом журнала изменений
  - Прикрепляет установщики Electron (если они собраны)
- [ ] Или выполните действия вручную:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Развёртывание

Навыки развёртывания используют облегчённый процесс rsync — без `npm pack` и `npm i -g`:

- [ ] Используйте навык развёртывания, соответствующий целевой среде:
  - `/deploy-vps-local-cc` — локальный VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — оба
- [ ] Перед развёртыванием убедитесь, что `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Сборка должна выполняться там, где `node_modules` является реальным каталогом (основная рабочая копия или рабочее дерево после `npm ci` — НЕ рабочее дерево с символической ссылкой)
- [ ] Выполните дымовое тестирование развёрнутого экземпляра:
  - Откройте `/dashboard/health` → убедитесь, что строка версии соответствует выпуску
  - Выполните запрос к `/v1/chat/completions` через известного провайдера
  - Убедитесь, что `/api/monitoring/health` возвращает автоматические выключатели в состоянии `CLOSED`
  - Убедитесь, что транспорты MCP отвечают (`/mcp` HTTP, `/mcp-sse` SSE)

### После выпуска

- [ ] Запустить `/capture-release-evidences-cc` (навык Claude Code)
  - Создаёт снимки экрана/записи новых функций в формате WebP
  - Прикрепляет их к примечаниям к выпуску / публикации в блоге
- [ ] Опубликовать анонс выпуска в GitHub Discussions / Discord
- [ ] Создать этап для следующей версии
- [ ] Если выпуск критически важен: закрепить обсуждение или опубликовать запись в `news.json` для баннера в приложении

### Условия публичного запуска Radar

Анонс Radar намеренно добавлен с параметром `active: false`. Активация выполняется отдельным
изменением после подтверждения выполнения всех перечисленных ниже пунктов:

- [ ] Все связанные PR Radar объединены, а CI для release-tip успешно пройден
- [ ] Развернуть и провести дымовое тестирование маршрутов OSS Radar, оставив `RADAR_ENABLED` по умолчанию отключённым
- [ ] Провести дымовое тестирование `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на указанном хосте Radar
- [ ] Зафиксировать личность/контактные данные/адрес оператора и одобренную владельцем юридическую проверку в закрытом сервисе
- [ ] Проверить Stripe Checkout и подписанный вебхук только в тестовом режиме
- [ ] Проверить одну доставку зашифрованного транзакционного электронного письма с использованием одобренного отправителя/домена
- [ ] Подтвердить восстановление из резервной копии и один контролируемый исследовательский запуск с ограниченным бюджетом
- [ ] Утвердить политику проверки BRL/PIX до приёма подтверждений пожертвований
- [ ] Включить публичный Checkout только после прохождения предыдущих этапов, а затем активировать новый ID в `news.json`
- [ ] Убедиться, что баннер на главной странице использует локализованный текст, а баннер с новым ID появляется после отклонения баннера со старым ID

## Дымовое тестирование встроенных сервисов (v3.8.4+)

Перед выпуском любого релиза, включающего изменения встроенных сервисов, проверьте:

### Запуск с новой БД (выявляет конфликты миграций — добавлено после исправления v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — подождите 10 с до завершения запуска
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` возвращает `"9router"` (НЕ 404 и НЕ 500). Подтверждает, что миграция `071_services.sql` применена и строка добавлена.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` возвращает 3 строки.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` возвращает 2 строки (подтверждает применение `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` выполняется успешно — защищает от конфликтов в будущем.

### 9Router

- [ ] `POST /api/services/9router/install` возвращает 200 с `installedVersion` менее чем за 2 мин
- [ ] `POST /api/services/9router/start` возвращает 200 и `state: "running"` менее чем за 30 с
- [ ] `GET /api/services/9router/status` сообщает `health: "healthy"`
- [ ] `POST /v1/chat/completions` с `"model": "9router/auto/..."` возвращает 200 (сквозная маршрутизация через 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` отображает нативный интерфейс 9Router внутри прокси (без прямого iframe с `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` возвращает `{ keyRotated: true }`, а сервис корректно перезапускается
- [ ] `POST /api/services/9router/stop` возвращает 200 и `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` возвращает поток SSE с событием `snapshot`, содержащим последние строки
- [ ] Установка в окружении без `npm` в PATH возвращает 500 с понятным сообщением об ошибке (без трассировки стека)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` возвращает 200 менее чем за 2 мин
- [ ] `POST /api/services/cliproxy/start` возвращает 200 и `state: "running"` менее чем за 30 с
- [ ] `GET /api/services/cliproxy/status` сообщает `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` возвращает 200 и `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` возвращает поток SSE

### Регрессионное тестирование безопасности

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` возвращает `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` возвращает `403 LOCAL_ONLY`
- [ ] Ответы с ошибками от `/api/services/*` не содержат `err.stack` или абсолютных путей к файлам

## Проверки для v3.8.0+

Перед выпуском любого релиза v3.8.x проверьте также следующее:

- [ ] `omniroute --tray` запускается на macOS (systray2 установлен в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` запускается на Linux (требуется DISPLAY; при отсутствии переменной выводится корректное сообщение об ошибке)
- [ ] `omniroute --tray` запускается на Windows (PowerShell NotifyIcon, без дополнительных бинарных файлов)
- [ ] `omniroute config tray enable` создаёт запись автозапуска; отключение удаляет её
- [ ] `npm install -g omniroute@<this-version>` выполняет postinstall без аварийного завершения
- [ ] В процессе обновления сохраняются необязательные зависимости: `omniroute update --apply` и средство автоматического обновления
      запускают `npm install -g … --include=optional`, чтобы `optionalDependencies` (better-sqlite3,
      keytar, tls-client и стек SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) сохранялись после обновления. Для уровня SLM ultra с `modelPath` также требуется
      модель tinybert, автоматически загружаемая в `${DATA_DIR}/models/llmlingua` при первом использовании. Затем postinstall
      (`scripts/build/colocateOptionals.mjs`) размещает замыкание необязательных зависимостей SLM в
      `dist/node_modules`, чтобы воркер разрешал ЕДИНСТВЕННЫЙ экземпляр `@huggingface/transformers` ^4.2.0
      — автономная трассировка включает только transformers, но не динамически импортируемые
      необязательные зависимости, поэтому без этого воркер загрузил бы llmlingua-2 с transformers из корневого каталога,
      а уровень SLM незаметно переключился бы в отказоустойчивый режим.
- [ ] `omniroute status` работает без `.env` (путь токена CLI, только loopback)
- [ ] `curl http://localhost:20128/api/shutdown` возвращает 401 (маршрут всегда защищён)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` возвращает 401 (защита loopback)
- [ ] При первом запуске среда выполнения SQLite разрешается как `bundled` (встроенный бинарный файл подходит для платформы)
- [ ] Среда выполнения SQLite переключается на `runtime`, если `node_modules/better-sqlite3` удалён
- [ ] Умный фильтр MCP сжимает реальные выходные данные `playwright-mcp browser_snapshot` (сокращение ≥50%)
- [ ] Все 10 файлов `skills/omniroute*/SKILL.md` общедоступны по необработанному URL GitHub
- [ ] При новой настройке мастер первоначальной настройки отображает шаг обзора уровней «Как это работает»
- [ ] Виджет покрытия уровней на главной панели мониторинга отображает количество настроенных/активных уровней

---

## Откат

Если в релизе обнаружена критическая проблема:

1. `gh release edit vX.Y.Z --prerelease` (помечает релиз как не являющийся последним)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (только если пользователи ещё не начали его использовать)
3. Или: срочное исправление в `release/vX.Y.0` → патч-релиз `vX.Y.(Z+1)`
4. Немедленно сообщите об этом в GitHub Discussions и Discord

## Строгие правила

- Никогда не создавайте коммиты напрямую в `main`
- Никогда не используйте `git push --force` для веток `main` или `release/*`
- Никогда не пропускайте хуки Husky (`--no-verify`)
- Никогда не добавляйте в коммиты секреты, учётные данные или файлы `.env`
- Покрытие должно оставаться на уровне ≥60/60/60/60 (инструкции/строки/функции/ветви)
- При изменении рабочего кода в `src/`, `open-sse/`, `electron/` или `bin/` всегда добавляйте или обновляйте тесты

## Автоматическая проверка синхронизации

Перед созданием PR локально запустите проверку синхронизации документации:

```bash
npm run check:docs-sync
```

CI также запускает эту проверку в `.github/workflows/ci.yml` (задача lint).
