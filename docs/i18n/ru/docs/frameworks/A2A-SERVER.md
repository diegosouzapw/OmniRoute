# OmniRoute A2A Server Documentation (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Протокол Agent-to-Agent v0.3 — OmniRoute как интеллектуальный агент маршрутизации

Интерфейс A2A представлен в двух вариантах:

- **JSON-RPC 2.0** по адресу `POST /a2a` (каноническая точка входа, определённая в `src/app/a2a/route.ts`).
- **REST** по адресам `/api/a2a/*` для панелей мониторинга и инструментов (состояние, список задач, отмена).

Задачи отслеживаются с помощью `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL по умолчанию — 5 минут). Навыки направляются соответствующим обработчикам через `A2A_SKILL_HANDLERS` в `src/lib/a2a/taskExecution.ts`.

## Обнаружение агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Возвращает карточку агента с описанием возможностей, навыков и требований к аутентификации OmniRoute.

Поле `version` карточки агента берётся из `process.env.npm_package_version` (см. `src/app/.well-known/agent.json/route.ts:13`), поэтому при каждом выпуске оно автоматически синхронизируется с `package.json`.

---

## Аутентификация

Для всех запросов к `/a2a` требуется API-ключ, передаваемый через заголовок `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Если на сервере не настроен API-ключ, аутентификация пропускается.

## Включение

A2A управляется переключателем **Endpoints → A2A** и по умолчанию отключён. Когда A2A отключён,
`GET /api/a2a/status` сообщает `status: "disabled"` и `online: false`; вызовы JSON-RPC к
`POST /a2a` возвращают HTTP 503 с кодом ошибки JSON-RPC `-32000`.

---

## Методы JSON-RPC 2.0

### `message/send` — Синхронное выполнение

Отправляет сообщение навыку и ожидает полного ответа.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Ответ:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — Потоковая передача через SSE

Аналогичен `message/send`, но возвращает события Server-Sent Events для потоковой передачи в реальном времени.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**События SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Запрос состояния задачи

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Отмена задачи

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Доступные навыки

OmniRoute предоставляет 6 навыков A2A, подключённых в `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Модуль каждого навыка находится в `src/lib/a2a/skills/`.

| Навык                   | ID                   | Описание                                                                                                                                                                        | Теги                          | Примеры                               |
| :---------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- | :------------------------------------ |
| Умная маршрутизация     | `smart-routing`      | Направляет запрос оптимальному провайдеру или комбинации, используя механизм комбинаций и систему оценки OmniRoute                                                              | маршрутизация, провайдеры     | "Направь этот запрос лучшей модели"   |
| Управление квотами      | `quota-management`   | Сообщает состояние квоты для каждого провайдера и помогает вызывающим сторонам определить, когда следует ограничить запросы или переключить провайдера                          | квота, провайдеры             | "Проверь квоту для anthropic"         |
| Обнаружение провайдеров | `provider-discovery` | Выводит список установленных провайдеров с их возможностями, признаками бесплатного уровня и статусом OAuth                                                                     | провайдеры, обнаружение       | "Какие провайдеры доступны?"          |
| Анализ стоимости        | `cost-analysis`      | Оценивает стоимость запроса или диалога на основе каталога и недавнего использования                                                                                            | стоимость, использование      | "Оцени стоимость этого диалога"       |
| Отчёт о состоянии       | `health-report`      | Объединяет данные об автоматическом выключателе, периоде ожидания и состоянии блокировки для каждого провайдера                                                                 | состояние, отказоустойчивость | "Покажи состояние всех провайдеров"   |
| Список возможностей     | `list-capabilities`  | Возвращает полный каталог Agent Skills из 45 записей (23 API + 21 CLI + 1 конфигурация) в виде таблицы markdown с необработанными URL-адресами SKILL.md для внедрения контекста | каталог, обнаружение, навыки  | "Перечисли все возможности OmniRoute" |

> Карточку агента следует поддерживать в соответствии с актуальным каталогом из 352 провайдеров; количество провайдеров и метаданные о бесплатном доступе и отсутствии необходимости аутентификации берутся из реестра среды выполнения.

### Подробности навыка `list-capabilities`

Навык `list-capabilities` особенно полезен внешним агентам, которым необходимо узнать, какие возможности предоставляет OmniRoute, прежде чем отправлять вызовы API. Он возвращает структурированный артефакт в виде таблицы markdown:

```
| ID | Название | Категория | Область | Конечные точки/Команды | Необработанный URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Аутентификация и сеансы | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Каждая строка содержит столбец `rawUrl`, поэтому агенты могут немедленно получить полный файл SKILL.md. Поле `metadata.totalSkills` отражает размер каталога (на сегодняшний день — 45). Реализация: `src/lib/a2a/skills/listCapabilities.ts`. См. также [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (вспомогательный)

Конечная точка JSON-RPC `/a2a` является канонической точкой входа A2A. Приведённые ниже конечные точки REST обеспечивают вспомогательный доступ для панелей мониторинга и внешних инструментов:

| Конечная точка               | Метод | Описание                                                       | Аутентификация                              |
| :--------------------------- | :---- | :------------------------------------------------------------- | :------------------------------------------ |
| `/api/a2a/status`            | GET   | Состояние сервера, зарегистрированные навыки                   | (публичный доступ)                          |
| `/api/a2a/tasks`             | GET   | Список задач с фильтрами                                       | управление                                  |
| `/api/a2a/tasks/[id]`        | GET   | Получение задачи по ID                                         | управление                                  |
| `/api/a2a/tasks/[id]/cancel` | POST  | Отмена выполняющейся задачи                                    | управление                                  |
| `/.well-known/agent.json`    | GET   | Карточка агента (обнаружение A2A)                              | (публичный доступ, кэширование 3600 с)      |
| `/api/a2a/tasks`             | POST  | Входящее делегирование флоту OmniConductor (Conductor PRD RF5) | Bearer и `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Входящее делегирование Conductor (`POST /api/a2a/tasks`):** внешние агенты A2A делегируют работу с кодом флоту OmniConductor через OmniRoute. Тело запроса: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — делегировать можно только навыки флота Conductor (объявленные в карточке агента); поле `metadata.conductor.repo.url` является обязательным (флот работает с репозиториями git). Маршрут преобразуется в запрос `POST /v1/tasks` к хабу с использованием серверного токена `CONDUCTOR_ORCHESTRATOR_TOKEN` (с резервным использованием `CONDUCTOR_HUB_TOKEN`) и возвращает `201 { conductor_task_id, state: "submitted" }`; состояния задач передаются обратно через зеркало SSE→A2A (RF1) и доступны через `GET /api/a2a/tasks?skill=conductor`.

---

## Добавление нового навыка

1. **Создайте файл навыка:** `src/lib/a2a/skills/<your-skill>.ts`

   Экспортируйте асинхронную функцию `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Следуйте структуре существующих навыков, таких как `smartRouting.ts`.

2. **Зарегистрируйте обработчик:** в `src/lib/a2a/taskExecution.ts` добавьте запись в `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...существующие навыки
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Добавьте в карточку агента:** в `src/app/.well-known/agent.json/route.ts` добавьте элемент в массив `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Ваш навык",
     "description": "Краткое описание, ориентированное на назначение",
     "tags": ["routing", "quota"],
     "examples": ["Пример вызова на естественном языке"]
   }
   ```

4. **Напишите тесты:** `tests/unit/a2a-<your-skill>.test.ts`. Покройте успешный сценарий и сценарий с ошибкой.

5. **Задокументируйте** новый навык в таблице `Available Skills` этого файла.

---

## TTL задачи

Срок действия задач истекает через `ttlMinutes` (по умолчанию 5 минут) — этот параметр задаётся в конструкторе `A2ATaskManager` в `src/lib/a2a/taskManager.ts:82`. Чтобы изменить его, создайте собственный экземпляр `A2ATaskManager` и передайте другое значение (например, `new A2ATaskManager(15)` для TTL длительностью 15 минут). Фоновый процесс удаляет задачи с истёкшим сроком действия каждые 60 секунд.

---

## Жизненный цикл задачи

```
отправлена → выполняется → завершена
                        → завершена с ошибкой
                        → отменена
```

- По умолчанию срок действия задач истекает через 5 минут (см. [TTL задачи](#task-ttl))
- Терминальные состояния: `completed`, `failed`, `cancelled`
- Журнал событий отслеживает каждый переход между состояниями

---

## Коды ошибок

| Код    | Значение                              |
| :----- | :------------------------------------ |
| -32700 | Ошибка разбора (недопустимый JSON)    |
| -32600 | Недопустимый запрос / Нет авторизации |
| -32601 | Метод или навык не найден             |
| -32602 | Недопустимые параметры                |
| -32603 | Внутренняя ошибка                     |
| -32000 | Конечная точка A2A отключена          |

---

## Примеры интеграции

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
