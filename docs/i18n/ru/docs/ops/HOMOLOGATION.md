# Homologation Suite (`npm run homolog`) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

E2E-проверка развёртывания OmniRoute в реальном окружении на приёмочном VPS
(`HOMOLOG_BASE_URL`, например `http://192.168.0.15:20128`). Одна команда заменяет ручной
контрольный список STOP #2 перед выпуском автоматизированным запуском, формирующим подтверждающие материалы.

## Что проверяется

| Уровень                             | Что проверяется                                                                                                                                                                                                                                 | Реализация                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — работоспособность/соответствие | `/api/monitoring/health` отвечает кодом `200`, возвращает `status: "healthy"` и ожидаемую версию                                                                                                                                                | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — временный ключ                | Вход администратора → `POST /api/keys` создаёт API-ключ с ограниченной областью действия для текущего запуска; ключ отзывается (`DELETE /api/keys/:id`) в блоке `finally` независимо от результата                                              | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — поверхность API               | Каталог `/v1/models`, реальный непотоковый запрос завершения чата (критически важная для уровня модель, `max_tokens: 5`), ответ `401` для недействительного ключа и общедоступный `/api/monitoring/health`                                      | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — потоковая передача SSE        | Реальный потоковый запрос завершения чата; проверяется `text/event-stream`, наличие хотя бы одного фрагмента содержимого и завершающего маркера `[DONE]`                                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — реальные провайдеры            | По одному запросу чата с минимальной стоимостью для каждого критически важного провайдера, присутствующего в рабочем каталоге `/v1/models`; запросы генерируются на лету с помощью promptfoo                                                    | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — аутентификация в UI           | Однократный вход через реальную форму входа и повторное использование сессии (`storageState`) на всём уровне UI                                                                                                                                 | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — маршруты UI                   | Каждая статическая страница `page.tsx` в `src/app/(dashboard)/dashboard` (обнаруживается в файловой системе; динамические маршруты `[param]` пропускаются) загружается без HTTP-ошибки, ошибки страницы или срабатывания границы ошибок Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — критически важный сценарий UI | API-ключ создаётся через UI панели управления, а затем отзывается (на VPS не остаётся остаточных данных)                                                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — единый отчёт                   | Объединяет httpYac (через `junit-to-ctrf`), адаптер promptfoo→CTRF и CTRF-репортёр Playwright в один файл `homolog-ctrf.json`, а также создаёт удобочитаемый отчёт `homolog-report/summary.md`                                                  | `scripts/homolog/run.mjs`                                                     |

При самом повторном прогоне LLM не используются — это детерминированный набор регрессионных
тестов, а не оценивание. ИИ задействуется только в будущих работах по сопровождению (см. дорожную карту ниже).

## Предварительные требования

1. Скопируйте `.env.homolog.example` в `.env.homolog` (файл игнорируется git — никогда не добавляйте его в коммиты) и заполните:
   - `HOMOLOG_BASE_URL` — целевой развёрнутый экземпляр, например `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — пароль управления панелью для этого развёрнутого экземпляра.
   - `HOMOLOG_CRITICAL_PROVIDERS` — разделённые запятыми префиксы провайдеров, для которых выполняется реальный
     smoke-запрос чата (например, `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — при обычных запусках оставьте пустым; набор тестов создаёт и отзывает
     собственный временный ключ. Указывайте его только для изолированной отладки одного уровня.
2. Выполните `npm install` в репозитории (зависимости набора тестов — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — являются обычными devDependencies).
3. Выполните `npx playwright install`, если браузерные бинарные файлы ещё не установлены.

## Как запустить

```bash
npm run homolog
```

Чтобы выполнить проверку развёрнутого экземпляра, версия которого не совпадает с локальным `package.json`
(например, если стенд приёмочного тестирования всё ещё работает на предыдущем патч-релизе), явно переопределите
ожидаемую версию:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Процесс завершается с ненулевым кодом, если какой-либо уровень завершается неудачно, и всегда пытается отозвать созданный временный
API-ключ даже при сбое (блок `finally` в `scripts/homolog/run.mjs`).

## Чтение отчёта

Все результаты сохраняются в `homolog-report/` (игнорируется git):

- `summary.md` — та же таблица, которая выводится в stdout, с одной строкой на каждый уровень (✅/❌ + подробности).
- `homolog-ctrf.json` — объединённый отчёт CTRF (API/SSE, smoke-тесты провайдеров и
  результаты UI) — этот артефакт следует приложить к контрольному списку STOP #2 для релиза.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — необработанные/промежуточные
  отчёты по отдельным уровням.
- `promptfooconfig.yaml`, `provider-misses.json` — сгенерированная конфигурация promptfoo для
  текущего запуска и список критических провайдеров, отсутствовавших в рабочем каталоге.

Сбой L0 немедленно прерывает выполнение (временный ключ не создаётся), поскольку несовпадение версии или состояния работоспособности
означает, что все последующие уровни проверяли бы не тот развёрнутый экземпляр.

## Обновление эталонов при правомерных изменениях UI

L4b (smoke-тест маршрутов) и L4c (UI-сценарий работы с API-ключом) используют реальные DOM-локаторы, а не
снимки, поэтому большинство правомерных изменений UI не требуют обновления набора тестов. Если изменение
всё же нарушает работу локатора (например, переименована кнопка или перемещена страница настроек):

1. Повторно сверьте локатор с текущим исходным кодом (в спецификациях уже указано, в каком
   файле и в какой строке был подтверждён каждый локатор — следуйте тому же шаблону, не гадайте).
2. Обновите спецификацию в `tests/homolog/ui/`.
3. Повторно выполните `npm run homolog` (или только затронутую спецификацию Playwright) на VPS, чтобы
   подтвердить исправление, а затем создайте коммит.

В этом наборе тестов нет визуального/пиксельного эталона (F1) — см. дорожную карту.

## Дорожная карта (F2 / F3)

Проектирование и поэтапное внедрение описаны во внутренней спецификации планирования
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ссылка не приводится — это внутренний
артефакт `_tasks/`, не входящий в отслеживаемую документацию этого репозитория). Краткое описание:

- **F2** — полная запись пошагового сценария → Playwright Test Agents (`planner`/`generator`)
  преобразуют её в спецификации сценариев (создание комбинации, тестирование провайдера, изменение настроек, инструменты MCP) +
  эталон визуальной регрессии (Lost Pixel) с масками поверх динамических данных (метрики,
  временные метки, журналы) + процедура обслуживания `healer` для каждого релиза.
- **F3** — покрытие устойчивости, контрактов и интеграции: toxiproxy + поддельный OpenAI-совместимый
  провайдер на devbox, комбинация `homolog-resilience` на VPS, направленная на него
  (внедрённый тайм-аут → проверка резервного переключения + размыкание/замыкание автоматического выключателя через
  `/api/monitoring/health`); запускаемое по условию контрактное тестирование Schemathesis по
  `docs/openapi.yaml` (малое значение `--max-examples`, фиксированные начальные значения, только конечные точки без LLM); а также
  встраивание `npm run homolog` и его `summary.md` в этап STOP #2 процесса `/generate-release`.
