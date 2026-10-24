# Release Checklist (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Последнее обновление:** 2026-08-28 — v3.8.51
> Оптимизированный процесс выпуска, использующий навыки Claude Code для автоматизации.
>
> **Поддерживайте очередь/ветку в рабочем состоянии между выпусками:** см. [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (семейство `/green-prs` + `npm run check:release-green` + `/babysit` + ночной запуск). Периодическое выполнение
> этих действий — и особенно **перед** этим контрольным списком — позволяет начать работу над PR выпуска без ошибок.

## Кратко

```bash
# 1. Обновите версию и сгенерируйте CHANGELOG (навык)
/version-bump-cc patch    # или minor/major

# 2. Запустите локальную проверку качества
npm run check              # линтинг + тесты
npm run test:coverage      # полная проверка покрытия (60/60/60/60)

# 3. Выполните сборку и дымовое тестирование
npm run build
npm run test:e2e           # необязательно, но рекомендуется

# 4. Сгенерируйте выпуск (навык)
/generate-release-cc

# 5. Выполните развёртывание (навык)
/deploy-vps-both-cc        # или akamai-cc / local-cc

# 6. Соберите свидетельства выпуска (навык)
/capture-release-evidences-cc
```

## Доверенная публикация npm (по умолчанию с v3.8.51) — по запросу с промежуточным размещением, прямая как резервный вариант

`npm-publish.yml` по умолчанию публикует через **доверенную публикацию npm (OIDC)**:
задание `stage-npm` (на инфраструктуре GitHub) обменивает id-token GitHub на краткосрочные
учётные данные npm для этого запуска — без долгоживущего токена npm в секретах репозитория,
без запроса 2FA и с прикреплённым подтверждением происхождения.
Это разрешённый npm способ обхода в условиях отказа от токенов, позволяющих пропускать 2FA;
он восстанавливает полностью автоматический процесс, использовавшийся в проекте до v3.8.48,
сохраняя при этом гарантию WS1.3 (утёкший токен сам по себе не позволяет выполнить публикацию —
токена вообще нет).

**Однократная настройка (владелец):** npmjs.com → пакет `omniroute` → Settings → _Trusted
Publisher_ → GitHub: владелец `diegosouzapw`, репозиторий `OmniRoute`, рабочий процесс `npm-publish.yml`
(окружение: отсутствует). Пока эта настройка не выполнена, автоматический шаг завершается ошибкой `ENEEDAUTH`:
повторно запустите его с `publish_mode=staged` (см. ниже) или `direct`.

### Публикация с промежуточным размещением (по запросу — `publish_mode=staged`)

Рабочий процесс npm-publish больше не публикует пакет напрямую: он запускает упакованный tar-архив
(`check:pack-boot`), а затем выполняет `npm stage publish` — в реестре размещаются в точности те же байты,
но установить их **нельзя**, пока владелец не даст одобрение. Проверка 2FA человеком перенесена
на этап ПОСЛЕ проверки, а не до неё.

**Действия владельца после успешного завершения рабочего процесса:**

1. `npm stage list omniroute` — найдите идентификатор промежуточного размещения (он также выводится в сводке рабочего процесса).
2. Проверьте размещённые байты (рекомендуется): выполните `npm stage download <id>`, затем установите
   загруженный tar-архив во временный префикс и запустите его (`npm run check:pack-boot` автоматизирует
   в CI аналогичную проверку упаковки→установки→запуска).
3. `npm stage approve <id>` — запрос 2FA ЯВЛЯЕТСЯ публикацией. `npm stage reject <id>` отменяет размещение.
4. Защита после публикации: средство проверки после публикации (WS1.4 плана v3.8.49) устанавливает
   опубликованную версию из общедоступного реестра в чистом контейнере и запускает её.

**Аварийный резервный вариант:** `workflow_dispatch` с `publish_mode=direct` восстанавливает
прежний режим немедленного выполнения `npm publish` (используйте только при сбоях самого промежуточного
размещения; зафиксируйте причину).

**Однократное усиление защиты (владелец, npmjs.com):** настройте доверенного издателя для
`omniroute` в режиме только промежуточного размещения, чтобы утёкший долгоживущий токен не позволял
выполнить `npm publish` напрямую откуда-либо — CI может лишь разместить пакет; выпустить его может
только владелец с помощью 2FA.

**Порядок действий при повреждённом артефакте (без изменений):** по умолчанию сразу выполняйте
`npm deprecate omniroute@<bad> "<reason> — use <fixed>"` (занимает несколько минут, обратимо);
используйте `npm unpublish` только в пределах 72 часов при отсутствии зависимых пакетов и никогда
не прибегайте к нему в первую очередь. Docker: никогда не перезаписывайте тег версии — для отката
перенаправьте `latest` на последний рабочий дайджест.

**Docker Hub `latest` (обязательно для каждой публикации стабильной версии SemVer):**
рабочий процесс `docker-publish` должен назначить теги **и** `X.Y.Z`, **и**, если
`should-promote-latest.sh` подтверждает, что это самая высокая стабильная версия SemVer, `:latest`
с **одним и тем же дайджестом**. После выполнения задания: дайджест `latest` в Hub должен совпадать
с дайджестом новой версии SemVer, а значение `last_updated` должно обновиться. Не оставляйте `:latest`
на более старой сборке, когда в примечаниях к выпуску говорится об исправлениях, существующих только
в git. Примеры быстрого запуска Compose используют `:latest`; в GitOps следует по-прежнему закреплять
`X.Y.Z`. См. [Каналы выпусков Docker](../guides/DOCKER_GUIDE.md#release-channels) и #10317.

## Ускоренный процесс для хотфиксов (метка `hotfix`)

PR с меткой `hotfix` пропускает ресурсоёмкую матрицу CI (E2E с 9 шардами, контроль порогов покрытия,
quality-gate, quality-extended), сохраняя быстрые и информативные проверки: сборку,
шарды модульных тестов, интеграционные тесты, vitest, линтинг/проверку типов, синхронизацию документации, `check:pack-artifact`
и проверку запуска из tarball (`check:pack-boot`). Цель: получить зелёный статус не более чем за 15 минут вместо ~33 минут.

**Политика допуска — обязательны все четыре условия (по модели аварийных процессов Chromium/VS Code/Node):**

1. **Критичность**: продакшен не работает — опубликованный артефакт аварийно завершается при запуске /
   требуется исправление безопасности / затронут каждый пользователь релиза. «Важно» не означает «сломано».
2. **Полномочия**: метку `hotfix` применяет только владелец репозитория. Сама метка ЯВЛЯЕТСЯ
   одобрением — никогда не назначайте её самостоятельно в PR кампании.
3. **Доказательства**: в описании PR есть ссылка на предыдущий полностью успешный ресурсоёмкий запуск (набор проверок,
   который повторно выполнили бы пропущенные задания), а также собственный тест исправления, сначала завершавшийся ошибкой, а затем успешно.
4. **Объём изменений**: только cherry-pick — минимальное исправление, без рефакторинга и попутных изменений.

Пропущенные проверки покрытия/порогов повторно выполняются при следующем полном запуске в
ветке релиза (непрерывное поддержание зелёного статуса релиза) — ускоренный процесс пропускает ОЖИДАНИЕ, но не проверку.
Изменения только в тестах (все файлы находятся в `tests/`, ни одного в `tests/e2e/`) автоматически пропускают
матрицу E2E без какой-либо метки.

## Подробный контрольный список

### Перед выпуском

- [ ] Все PR, предназначенные для этого выпуска, объединены в `release/vX.Y.0`
- [ ] Все открытые элементы Linear/задачи для этой версии закрыты или перенесены на следующий этап
- [ ] CI успешно проходит в ветке `release/vX.Y.0`
- [ ] В коде отсутствуют маркеры `TODO(release)`: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Базовый образ Docker обновлён до актуальной версии (сейчас `node:24.15.0-trixie-slim`)

### Версия и журнал изменений

- [ ] Запустить `/version-bump-cc <patch|minor|major>` (навык Claude Code)
  - Повышает версии в `package.json`, `electron/package.json`
  - Повторно генерирует `CHANGELOG.md` на основе коммитов git после последнего тега
  - Обновляет значки в README.md
- [ ] Вручную проверить CHANGELOG.md и при необходимости привести сообщения коммитов в порядок
- [ ] Убедиться, что последний раздел semver в `CHANGELOG.md` соответствует версии в `package.json`
- [ ] Оставить `## [Unreleased]` первым разделом журнала изменений для предстоящей работы
- [ ] Обновить `docs/openapi.yaml` → `info.version` должна соответствовать версии в `package.json`

### Качество кода

- [ ] `npm run lint` — 0 ошибок (предупреждения существовали ранее)
- [ ] `npm run typecheck:core` — без ошибок
- [ ] `npm run typecheck:noimplicit:core` — без ошибок (строгий режим)
- [ ] `npm run check:cycles:ratchet` — в пределах зафиксированного ограничения `metrics.cycles` (обычный `check:cycles` завершается с кодом 1 при наличии любого цикла, #15281)
- [ ] `npm run check:any-budget:t11` — в пределах бюджета
- [ ] `npm run check:route-validation:t06` — без ошибок
- [ ] `npm run check:node-runtime` — соблюдён нижний порог поддерживаемой среды выполнения (`>=22.22.2 <23`, `>=24.0.0 <27`, согласно `SUPPORTED_NODE_RANGE` в `src/shared/utils/nodeRuntimeSupport.ts`; согласовано с `engines` в `package.json`)

### Тестирование

- [ ] `npm run test:unit` — успешно
- [ ] `npm run test:vitest` — успешно (сервер MCP, autoCombo, кэш)
- [ ] `npm run test:coverage` — порог 60/60/60/60 соблюдён (операторы/строки/функции/ветви)
- [ ] `npm run test:integration` — успешно (если изменения затрагивают БД / обработчики)
- [ ] `npm run test:combo:matrix` — успешно (матрица комбинированных стратегий: детерминированно проверяет решения о выборе для всех 21 публичной стратегии маршрутизации; запускать при изменении комбинированной маршрутизации, разрешения стратегий или логики отката)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **необязательно/вручную** (ограниченная флагом smoke-проверка реальных вышестоящих сервисов; использует снимок БД только для чтения с VPS `root@192.168.0.15`; обращается к реальным провайдерам и расходует кредиты; никогда не запускается в CI; корректно пропускается без флага)
- [ ] `npm run test:combo:live:vps` — **необязательно/вручную** (VPS smoke-проверка фазы 3: 7 HTTP-сценариев для рабочего сервера `.15` через обычный Node ESM; требуется `ssh root@192.168.0.15`; создаёт/удаляет только комбинации `__live_test__*`; обращается к реальным провайдерам; никогда не запускается в CI)
- [ ] `npm run test:e2e` — успешно (изменения пользовательского интерфейса)
- [ ] `npm run test:protocols:e2e` — успешно (изменения MCP/A2A)
- [ ] `npm run test:ecosystem` — успешно

### Хуки (проверено Husky)

Хуки Husky находятся в `.husky/` и автоматически запускаются при операциях git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** быстрые детерминированные проверки — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (активировано 2026-06-13). Намеренно не включает `test:unit` (медленный; выполняется заданием CI `test-unit`).
  - Перед отправкой веток выпуска запустите `npm run test:unit` вручную.

Если хук завершается с ошибкой: устраните основную проблему, не обходите проверку с помощью `--no-verify`.

### Conventional Commits

Все коммиты, предназначенные для выпуска, должны соответствовать формату `type(scope): subject`.

**Допустимые типы:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Допустимые области:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Критические изменения: добавьте нижний колонтитул `BREAKING CHANGE:` или `!` после области (например, `feat(api)!: drop /v0`).

### Документация

- [ ] `npm run check:docs-sync` выполняется успешно (автоматически запускается перед коммитом)
- [ ] `npm run check:docs-all` выполняется успешно (общая проверка: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` завершается с кодом 0 — контракт переменных окружения между кодом ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` не нарушен
- [ ] `npm run check:doc-links` завершается с кодом 0 — после реструктуризации нет неработающих внутренних ссылок Markdown
- [ ] `docs/architecture/ARCHITECTURE.md` проверен на расхождения в хранилище/среде выполнения
- [ ] `docs/guides/TROUBLESHOOTING.md` проверен на расхождения в переменных окружения и операционных процедурах
- [ ] Если `.env.example` изменён: обновлён `docs/reference/ENVIRONMENT.md`
- [ ] Если у новой функции есть пользовательский интерфейс: она упомянута в `docs/guides/USER_GUIDE.md`
- [ ] Если у новой функции есть API: обновлены `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Если новая функция является модулем: существует отдельный документ `docs/<MODULE>.md`
- [ ] Если внесено критическое изменение: в `docs/guides/TROUBLESHOOTING.md` есть примечание о миграции

### i18n

- [ ] `npm run i18n:check` завершается с кодом 0 — состояние перевода (`.i18n-state.json`) синхронизировано с исходной документацией (в строгом режиме нет рассинхронизированных исходных файлов; предупреждение в рекомендательном режиме допустимо для правок документации в последний момент, но перед созданием тега результат должен быть 0)
- [ ] `npm run i18n:check-ui-coverage` завершается с кодом 0 — покрытие каждой локали пользовательского интерфейса не ниже порога 80%
- [ ] `npm run i18n:sync-ui:dry` сообщает об отсутствии недостающих ключей во всех 66 целевых локалях (в каждой локали, кроме исходной `en`)
- [ ] Если исходная документация на английском языке изменилась, перед созданием тега запустите `npm run i18n:run` (требуется `OMNIROUTE_TRANSLATION_API_KEY` в `.env`)
- [ ] Вклад в переводы можно отложить до следующего выпуска, если изменения незначительны (зафиксировать в CHANGELOG)

### Миграции базы данных

- [ ] Если в `src/lib/db/migrations/` появились новые файлы:
  - [ ] Каждая миграция идемпотентна (`CREATE TABLE IF NOT EXISTS` и т. д.)
  - [ ] Миграции выполняются в транзакциях
  - [ ] Нумерация выполнена правильно (без пропусков в последовательности)
- [ ] Проверить на чистой установке: удалить `~/.omniroute/omniroute.db` и запустить `npm run dev`
- [ ] Проверить на существующей установке: создать резервную копию БД, запустить миграцию, проверить схему
- [ ] Файлы WAL (`-wal`, `-shm`) обрабатываются корректно, если миграция перезаписывает таблицы

### Каталог провайдеров (с проверкой Zod)

- [ ] Схема Zod в `src/shared/constants/providers.ts` корректна при загрузке
  - [ ] У всех провайдеров есть обязательные поля (`id`, `label`, `kind` и т. д.)
  - [ ] Для новых бесплатных провайдеров указано `freeNote`
  - [ ] Для OAuth-провайдеров зарегистрирован `oauthConfig` в `src/lib/oauth/constants/oauth.ts`
- [ ] Если добавлен новый провайдер: соответствующий исполнитель находится в `open-sse/executors/`
- [ ] Если используется формат, отличный от OpenAI: преобразователь находится в `open-sse/translator/`
- [ ] Модели зарегистрированы в `open-sse/config/providerRegistry.ts`
- [ ] Модульные тесты в `tests/unit/` покрывают классификацию и маршрутизацию провайдеров

### Настольное приложение (Electron)

Если изменён `electron/`:

- [ ] `npm run electron:smoke:packaged` выполняется успешно
- [ ] Сборки протестированы хотя бы для одной из целей: `:win`, `:mac`, `:linux`
- [ ] Срок действия сертификатов подписи кода не истёк (если используется подпись)
- [ ] Версия в `electron/package.json` совпадает с версией в корневом `package.json`
- [ ] Указатель канала автоматического обновления обновлён при выпуске в `stable`

### Структура сборки

В репозитории используются три отдельных каталога вывода — никогда не путайте их:

| Каталог   | Назначение                                                      | Отслеживается?   |
| --------- | --------------------------------------------------------------- | ---------------- |
| `src/`    | Исходный код приложения (TypeScript / TSX)                      | Да               |
| `.build/` | Промежуточные файлы сборки — вывод `next build` (`distDir`)     | Нет (gitignored) |
| `dist/`   | Готовый к поставке npm-пакет — формируется `assembleStandalone` | Нет (gitignored) |

> **Примечание для оператора:** каталог образа на удалённом VPS по-прежнему находится по пути `/usr/lib/node_modules/omniroute/app/`.
> Изменился только вывод сборки **в репозитории** (`app/` → `dist/`). Навыки развёртывания синхронизируют через rsync
> содержимое `dist/` с удалённым каталогом `app/` — изменять пути на VPS не требуется.

**Процесс одной сборки:**

```
npm run build:release
  └─ rm -rf .build dist          (очистка)
  └─ next build → .build/next/   (промежуточные файлы)
  └─ assembleStandalone          (копирует standalone + static + public + нативные модули → dist/)
  └─ записывает dist/BUILD_SHA   (маркер HEAD)
```

НЕ запускайте `npm run build`, а затем отдельно `npm run build:cli` для развёртывания — используйте
`npm run build:release`, который выполняет чистую пересборку и создаёт маркер одной командой.

### Проверка артефакта

- [ ] `npm run build:release` выполняется успешно, и `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` завершается без замечаний — отсутствуют `app.__qa_backup`, `scripts/scratch`, `package-lock.json` и другие локальные остаточные файлы
- [ ] После сборки существует `dist/server.js`
- [ ] Необязательная локальная smoke-проверка упакованной среды выполнения: `npm run dev:candidate -- validate` после `npm run dev:candidate -- build` запускает упакованный tarball с изолированным `DATA_DIR` и проверяет `/api/health` + `/v1/models` (см. [Рекомендуемый процесс внесения изменений](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Создание тега и релиза

- [ ] Запустите `/generate-release-cc` (навык Claude Code):
  - Создаёт тег `vX.Y.Z`
  - Отправляет тег и ветку
  - Создаёт GitHub Release с журналом изменений
  - Прикрепляет установщики Electron (если они собраны)
- [ ] Или выполните вручную:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Развёртывание

Навыки развёртывания используют облегчённый процесс rsync — без `npm pack` и `npm i -g`:

- [ ] Используйте навык развёртывания, соответствующий целевой системе:
  - `/deploy-vps-local-cc` — локальный VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — оба
- [ ] Перед развёртыванием убедитесь, что `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Сборка должна выполняться там, где `node_modules` является настоящим каталогом (основной checkout или worktree после `npm ci` — НЕ worktree с символической ссылкой)
- [ ] Выполните smoke-тест развёрнутого экземпляра:
  - Откройте `/dashboard/health` → проверьте, что строка версии соответствует релизу
  - Выполните запрос `/v1/chat/completions` к известному провайдеру
  - Убедитесь, что `/api/monitoring/health` возвращает автоматические выключатели в состоянии `CLOSED`
  - Убедитесь, что транспорты MCP отвечают (`/mcp` HTTP, `/mcp-sse` SSE)

### После релиза

- [ ] Запустите `/capture-release-evidences-cc` (навык Claude Code)
  - Создаёт снимки экрана и записи в формате WebP для новых функций
  - Прикрепляет их к примечаниям к релизу / публикации в блоге
- [ ] Опубликуйте объявление о релизе в GitHub Discussions / Discord
- [ ] Создайте этап для следующей версии
- [ ] Если релиз критически важен: закрепите обсуждение или добавьте публикацию в `news.json` для баннера внутри приложения

### Условия публичного запуска Radar

Объявление Radar намеренно зафиксировано с `active: false`. Активация выполняется отдельным
изменением после предоставления подтверждений по каждому пункту ниже:

- [ ] Все последовательные PR Radar объединены, и CI для вершины релиза завершается успешно
- [ ] Разверните и выполните smoke-тест маршрутов OSS Radar, пока `RADAR_ENABLED` по умолчанию остаётся выключенной
- [ ] Выполните smoke-тест `GET /planos`, `/termos`, `/privacidade` и `/reembolso` на указанном хосте Radar
- [ ] Зафиксируйте личность, контактные данные и адрес оператора, а также одобренную владельцем юридическую проверку в приватном сервисе
- [ ] Проверьте Stripe Checkout и подписанный webhook только в тестовом режиме
- [ ] Проверьте одну доставку зашифрованного транзакционного письма с одобренным отправителем/доменом
- [ ] Подтвердите восстановление резервной копии и один контролируемый исследовательский запуск с ограниченным бюджетом
- [ ] Утвердите политику проверки BRL/PIX до принятия подтверждений пожертвований
- [ ] Включите публичный Checkout только после прохождения предыдущих этапов, затем активируйте новый идентификатор в `news.json`
- [ ] Убедитесь, что баннер на главной странице использует локализованный текст, а новый идентификатор появляется после закрытия более старого идентификатора

## Дымовая проверка встроенных сервисов (v3.8.4+)

Перед выпуском любого релиза, включающего изменения встроенных сервисов, проверьте:

### Запуск с чистой БД (выявляет конфликты миграций — добавлено после хотфикса v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — подождите 10 с, пока завершится запуск
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` возвращает `"9router"` (НЕ 404 и НЕ 500). Это подтверждает, что миграция `071_services.sql` применена и строка добавлена.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` возвращает 3 строки.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` возвращает 2 строки (подтверждает применение `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` выполняется успешно — защищает от будущих конфликтов.

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

### Проверка регрессий безопасности

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` возвращает `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` возвращает `403 LOCAL_ONLY`
- [ ] Ответы с ошибками от `/api/services/*` не содержат `err.stack` или абсолютных путей к файлам

## Проверки для v3.8.0+

Перед выпуском любого релиза v3.8.x проверьте следующие дополнительные пункты:

- [ ] `omniroute --tray` запускается в macOS (systray2 установлен в `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` запускается в Linux (требуется DISPLAY; корректная ошибка, если он не задан)
- [ ] `omniroute --tray` запускается в Windows (PowerShell NotifyIcon, без дополнительных исполняемых файлов)
- [ ] `omniroute config tray enable` создаёт запись автозапуска; отключение удаляет её
- [ ] `npm install -g omniroute@<this-version>` выполняет postinstall без аварийного завершения
- [ ] Процесс обновления сохраняет необязательные зависимости: `omniroute update --apply` и автоматическое обновление
      запускают `npm install -g … --include=optional`, чтобы `optionalDependencies` (better-sqlite3,
      keytar, tls-client и стек SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) сохранялись после обновления. Для уровня SLM ultra с `modelPath` также необходима
      модель tinybert, автоматически загружаемая в `${DATA_DIR}/models/llmlingua` при первом использовании. Затем postinstall
      (`scripts/build/colocateOptionals.mjs`) размещает замыкание необязательных зависимостей SLM в
      `dist/node_modules`, чтобы воркер разрешал ЕДИНСТВЕННЫЙ экземпляр `@huggingface/transformers` ^4.2.0
      — автономная трассировка включает в пакет только transformers, но не динамически импортируемые
      необязательные зависимости, поэтому без этого воркер загрузил бы llmlingua-2 с transformers из корня,
      а уровень SLM незаметно перешёл бы в режим открытого отказа.
- [ ] `omniroute status` работает без `.env` (путь токена CLI, только loopback)
- [ ] `curl http://localhost:20128/api/shutdown` возвращает 401 (маршрут всегда защищён)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` возвращает 401 (защита loopback)
- [ ] Среда выполнения SQLite при первом запуске разрешается в `bundled` (встроенный бинарный файл подходит для платформы)
- [ ] Среда выполнения SQLite переключается на `runtime`, когда `node_modules/better-sqlite3` удалён
- [ ] Умный фильтр MCP сжимает реальные выходные данные `playwright-mcp browser_snapshot` (сокращение ≥50%)
- [ ] Все 10 файлов `skills/omniroute*/SKILL.md` общедоступны по прямому URL GitHub
- [ ] При первоначальной настройке мастер адаптации показывает этап обзора уровней «Как это работает»
- [ ] Виджет покрытия уровней на главной панели мониторинга показывает количество настроенных/активных уровней

---

## Ответвление 3.9.0 LTS (репетиция в 3.8.58)

После v3.8.59 следующей версией будет 3.9.0, а её верхушка станет основой двух долгоживущих веток:
`stable/v3` (линейка v3 LTS, npm `latest`) и `develop` (v4, версия повышена до 4.0.0, npm
`nightly`). Модель веток/каналов, перенос изменений вперёд и метки описаны в
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); план приведён в [ROADMAP](../../ROADMAP.md) (этап 3). Ответвление выполняется один раз;
в 3.8.58 оно полностью репетируется в форке, а работа над 3.8.59 завершается
[контрольным списком GO/NO-GO](./LTS_GO_NO_GO.md).

### Пробный запуск (только чтение, безопасен в любое время)

```bash
npm run release:dry-run-lts-cut                       # реальное ответвление: 3.9.0 из HEAD, предыдущий тег v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # зафиксировать исходный коммит
```

`scripts/release/dry-run-lts-cut.mjs` ничего не выполняет: он считывает данные из git и `gh` и выводит
всю последовательность — предварительные условия (исходная ссылка разрешается, исходный репозиторий содержит полную историю —
из поверхностного клона нельзя отправить `stable/v3`, принимающая сторона отклонит пакет на первом
искусственно присоединённом родительском коммите, поэтому сначала выполняйте ответвление из полного клона или запустите
`git fetch --unshallow origin`; предыдущий тег существует, в `package.json` указана целевая версия,
открыта задача `release-freeze`, нет открытой задачи `Release branch not green`
для существующей релизной ветки — для несуществующей ветки выводится `?`, то есть неизвестное состояние, но никогда
не зелёное; очередь Mergify `release` настроена (G11: `queue_rules`, `checks_timeout`,
метка `queue`), набор правил `release/*` по-прежнему запрещает удаление и принудительную отправку, а
`stable/v3` и `develop` ещё не существуют), два шага создания веток, какие триггеры неактивных рабочих процессов
и условия `if:` становятся истинными (и какие остаются заблокированными переменной репозитория или
привязанными к каноническому репозиторию), ожидаемые dist-теги (`latest` → 3.9.0, `next` и
`nightly` пусты) и откат. Код выхода `0` = `RESULT: READY`, `1` = не выполнено блокирующее предварительное
условие (`✗`), `2` = ошибка использования. `--advisory <id,...>` понижает проверку до предупреждения (`!`),
не скрывая её.

Выполните пробный запуск реального ответвления, пока заморозка релиза 3.9.0 ещё действует — ветки
создаются после тега и до снятия заморозки на этапе 12c.

### Репетиция 3.8.58 (только в форке)

```bash
# 1. Пробный запуск на текущей верхушке с параметрами репетиции
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Выполнение с удалённым репозиторием-ФОРКОМ (origin или любой удалённый репозиторий, URL которого
#    указывает на канонический репозиторий, будет отклонён; каждый шаг запрашивает подтверждение в терминале)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Запуск неактивных рабочих процессов в форке (workflow_dispatch там, где пробный запуск
#    сообщает о привязке к каноническому репозиторию), затем откат
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Коммит повышения версии в develop создаётся с помощью низкоуровневых средств git (рабочее дерево не затрагивается) и обновляет
те же пять файлов, что и коммит открытия цикла: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` и `docs/openapi.yaml`. Раздел `[4.0.0]`
в CHANGELOG и его локализованные копии открываются в `develop` после этого, до первого
PR. Скрипт никогда не изменяет dist-теги npm — репетируйте эти действия на тестовом пакете.

### Артефакт предварительной сборки PR (собрать один раз, продвигать те же байты)

`.github/workflows/preview-artifact.yml` создаёт один рабочий tarball из верхушки PR и
проверяет именно эту сборку (часть (a) задачи #8084). Только для PR из того же репозитория; ничего не публикуется.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # или добавьте метку `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # установка предварительной сборки
```

При запуске выполняются `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, упаковка
tarball, запуск `npm run check:pack-boot` (фиктивные секреты, временный каталог данных), повторная упаковка
и завершение с ошибкой, если хеш отличается; затем записывается `artifact-identity.json` (SHA верхушки, SHA
базовой ветки, хеш lock-файла, платформа, архитектура, ABI Node, сборщик, политика сборки —
`scripts/release/artifact-identity.mjs`), а tarball аттестуется в отдельной задаче. Продвижение
предварительной сборки означает установку этого tarball: никогда не пересобирайте его из исходного кода.

### Ответвление (3.9.0, после GO)

1. Решение GO зафиксировано в [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` выводит `RESULT: READY`.
3. Создайте ветки в `origin` вручную с помощью команд, выведенных пробным запуском, —
   скрипт отказывается отправлять изменения в `origin`. Чтобы повторно использовать проверенный коммит develop, сначала запустите
   репетицию с `--execute` на верхушке 3.9.0 в своём форке; скрипт выведет оба SHA, после чего
   можно отправить те же коммиты:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Защитите `stable/v3` и `develop` (наборы правил + очередь слияния) до принятия первого PR.
5. Неактивные рабочие процессы включаются при наличии ветки: `forward-port.yml` (отправка изменений в
   `stable/v3`), `validate-stable-pr.yml` (PR в `stable/v3`) и `nightly-v4-build.yml`
   (сборка `develop`). Перед вводом в эксплуатацию задайте секрет репозитория `secrets.FORWARD_PORT_TOKEN` (чтобы CI запускался для
   PR с переносом изменений вперёд); ночная публикация останется отключённой, пока владелец не задаст переменной репозитория
   `vars.NIGHTLY_PUBLISH` значение `true` и npm Trusted Publishing не разрешит
   `nightly-v4-build.yml`. Канал определяется скриптом `scripts/release/dist-tag.mjs` — тем же
   средством определения, которое использует `npm-publish.yml`.
6. Проверьте каналы: вывод `npm view omniroute dist-tags --json` должен показывать `latest` = 3.9.0 и отсутствие
   `next` / `nightly` до публикации v4.
7. Откат при необходимости: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   и `npm dist-tag add omniroute@3.8.59 latest`.

---

## Откат

Если в релизе обнаружена критическая проблема:

1. `gh release edit vX.Y.Z --prerelease` (помечает релиз как не являющийся последним)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (только если пользователи ещё не начали его использовать)
3. Или: исправление в `release/vX.Y.0` → патч-релиз `vX.Y.(Z+1)`
4. Немедленно сообщите об этом в GitHub Discussions и Discord

## Строгие правила

- Никогда не выполняйте коммиты напрямую в `main`
- Никогда не используйте `git push --force` для веток `main` или `release/*`
- Никогда не пропускайте хуки Husky (`--no-verify`)
- Никогда не добавляйте в коммиты секреты, учётные данные или файлы `.env`
- Покрытие должно оставаться ≥60/60/60/60 (операторы/строки/функции/ветви)
- При изменении рабочего кода в `src/`, `open-sse/`, `electron/` или `bin/` всегда добавляйте или обновляйте тесты

## Автоматическая проверка синхронизации

Перед созданием PR локально запустите проверку синхронизации документации:

```bash
npm run check:docs-sync
```

CI также запускает эту проверку в `.github/workflows/ci.yml` (задача lint).
