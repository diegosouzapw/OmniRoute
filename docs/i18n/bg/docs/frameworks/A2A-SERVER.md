# OmniRoute A2A Server Documentation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Протокол Agent-to-Agent v0.3 — OmniRoute като интелигентен агент за маршрутизиране

A2A интерфейсът има две лица:

- **JSON-RPC 2.0** на `POST /a2a` (каноничната входна точка, дефинирана в `src/app/a2a/route.ts`).
- **REST** под `/api/a2a/*` за табла и инструменти (състояние, списък със задачи, отмяна).

Задачите се проследяват от `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL по подразбиране от 5 минути). Уменията се изпращат чрез `A2A_SKILL_HANDLERS` в `src/lib/a2a/taskExecution.ts`.

## Откриване на агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Връща картата на агента, описваща възможностите, уменията и изискванията за удостоверяване на OmniRoute.

Полето `version` на картата на агента се извлича от `process.env.npm_package_version` (вижте `src/app/.well-known/agent.json/route.ts:13`), така че остава автоматично синхронизирано с `package.json` при всяко издание.

---

## Удостоверяване

Всички заявки към `/a2a` изискват API ключ чрез заглавката `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Ако на сървъра не е конфигуриран API ключ, удостоверяването се пропуска.

## Активиране

A2A се управлява чрез превключвателя **Крайни точки → A2A** и по подразбиране е деактивиран. Когато е деактивиран,
`GET /api/a2a/status` връща `status: "disabled"` и `online: false`; JSON-RPC извикванията към
`POST /a2a` връщат HTTP 503 с JSON-RPC код за грешка `-32000`.

---

## Методи на JSON-RPC 2.0

### `message/send` — Синхронно изпълнение

Изпраща съобщение към умение и изчаква пълния отговор.

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

**Отговор:**

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

### `message/stream` — SSE поточно предаване

Същото като `message/send`, но връща Server-Sent Events за поточно предаване в реално време.

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

**SSE събития:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Проверка на състоянието на задача

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Отмяна на задача

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Налични умения

OmniRoute предоставя 6 A2A умения, свързани в `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Всеки модул за умение се намира в `src/lib/a2a/skills/`.

| Умение                      | ID                   | Описание                                                                                                                                                            | Етикети                    | Примери                                            |
| :-------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------- | :------------------------------------------------- |
| Интелигентно маршрутизиране | `smart-routing`      | Маршрутизира подкана през оптималния доставчик/комбинация, използвайки механизма за комбинации и оценяване на OmniRoute                                             | маршрутизиране, доставчици | „Маршрутизирай тази подкана чрез най-добрия модел“ |
| Управление на квотите       | `quota-management`   | Отчита състоянието на квотите за всеки доставчик и помага на извикващите страни да решат кога да ограничат заявките или да превключат към друг доставчик            | квота, доставчици          | „Провери квотата за anthropic“                     |
| Откриване на доставчици     | `provider-discovery` | Изброява инсталираните доставчици с техните възможности, индикатори за безплатно ниво и OAuth състояние                                                             | доставчици, откриване      | „Какви доставчици са налични?“                     |
| Анализ на разходите         | `cost-analysis`      | Оценява разходите за заявка/разговор въз основа на каталога и скорошното потребление                                                                                | разходи, потребление       | „Оцени разходите за този разговор“                 |
| Отчет за състоянието        | `health-report`      | Обобщава състоянието на прекъсвача на веригата, периода за изчакване и блокирането за всеки доставчик                                                               | състояние, устойчивост     | „Покажи състоянието на всички доставчици“          |
| Списък с възможности        | `list-capabilities`  | Връща пълния каталог с 45 Agent Skills записа (23 API + 21 CLI + 1 конфигурационен) като markdown таблица с директни SKILL.md URL адреси за инжектиране на контекст | каталог, откриване, умения | „Покажи всички възможности на OmniRoute“           |

> Картата на агента трябва да се поддържа синхронизирана с актуалния каталог от 352 доставчика; броят на доставчиците и метаданните за безплатен достъп/достъп без удостоверяване се извличат от регистъра по време на изпълнение.

### Подробности за умението `list-capabilities`

Умението `list-capabilities` е особено полезно за външни агенти, които трябва да открият какво предоставя OmniRoute, преди да изпратят API извиквания. То връща артефакт със структурирана markdown таблица:

```
| ID | Име | Категория | Област | Крайни точки/команди | Директен URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Удостоверяване и сесии | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Всеки ред включва колоната `rawUrl`, така че агентите да могат незабавно да извлекат пълния SKILL.md. Полето `metadata.totalSkills` отразява размера на каталога (днес 45). Имплементация: `src/lib/a2a/skills/listCapabilities.ts`. Вижте също [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (спомагателен)

JSON-RPC крайната точка `/a2a` е каноничната входна точка за A2A. REST крайните точки по-долу предоставят спомагателен достъп за табла и външни инструменти:

| Крайна точка                 | Метод | Описание                                                       | Удостоверяване                                   |
| :--------------------------- | :---- | :------------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET   | Състояние на сървъра, регистрирани умения                      | (публично)                                       |
| `/api/a2a/tasks`             | GET   | Списък със задачи с филтри                                     | управление                                       |
| `/api/a2a/tasks/[id]`        | GET   | Получаване на задача по ID                                     | управление                                       |
| `/api/a2a/tasks/[id]/cancel` | POST  | Отмяна на изпълняваща се задача                                | управление                                       |
| `/.well-known/agent.json`    | GET   | Карта на агента (A2A откриване)                                | (публично, кеширано за 3600s)                    |
| `/api/a2a/tasks`             | POST  | Входящо делегиране към флота OmniConductor (Conductor PRD RF5) | Bearer спрямо `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Входящо делегиране от Conductor (`POST /api/a2a/tasks`):** външни A2A агенти делегират работа по програмиране на флота OmniConductor чрез OmniRoute. Тяло: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — могат да бъдат делегирани само уменията на флота Conductor (тези, които са обявени в Картата на агента); `metadata.conductor.repo.url` е задължително (флотът работи с git хранилища). Маршрутът се преобразува към `POST /v1/tasks` на централния възел, използвайки сървърния `CONDUCTOR_ORCHESTRATOR_TOKEN` (резервен вариант: `CONDUCTOR_HUB_TOKEN`), и връща `201 { conductor_task_id, state: "submitted" }`; състоянията на задачите се предават обратно чрез огледалния механизъм SSE→A2A (RF1) и са видими чрез `GET /api/a2a/tasks?skill=conductor`.

---

## Добавяне на ново умение

1. **Създайте файл за умението:** `src/lib/a2a/skills/<your-skill>.ts`

   Експортирайте асинхронна функция `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Следвайте структурата на съществуващи умения, като например `smartRouting.ts`.

2. **Регистрирайте манипулатора:** в `src/lib/a2a/taskExecution.ts` добавете запис към `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...съществуващи умения
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Представете го в Картата на агента:** в `src/app/.well-known/agent.json/route.ts` го добавете към масива `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Вашето умение",
     "description": "Кратко описание, фокусирано върху намерението",
     "tags": ["маршрутизиране", "квота"],
     "examples": ["Примерно извикване на естествен език"]
   }
   ```

4. **Напишете тестове:** `tests/unit/a2a-<your-skill>.test.ts`. Покрийте успешния сценарий и сценария с грешка.

5. **Документирайте** новото умение в таблицата `Available Skills` на този файл.

---

## TTL на задачите

Задачите изтичат след `ttlMinutes` (по подразбиране 5 минути) — конфигурира се в конструктора на `A2ATaskManager` в `src/lib/a2a/taskManager.ts:82`. За да го персонализирате, създайте разклонение на инстанцирането на `A2ATaskManager` и подайте различна стойност (напр. `new A2ATaskManager(15)` за TTL от 15 минути). Фонов интервал проверява за изтекли задачи на всеки 60 секунди.

---

## Жизнен цикъл на задачите

```
подадена → изпълнява се → завършена
                        → неуспешна
                        → отменена
```

- По подразбиране задачите изтичат след 5 минути (вижте [TTL на задачите](#task-ttl))
- Крайни състояния: `completed`, `failed`, `cancelled`
- Дневникът на събитията проследява всеки преход между състоянията

---

## Кодове за грешки

| Код    | Значение                                |
| :----- | :-------------------------------------- |
| -32700 | Грешка при анализиране (невалиден JSON) |
| -32600 | Невалидна заявка / Неупълномощен        |
| -32601 | Методът или умението не е намерено      |
| -32602 | Невалидни параметри                     |
| -32603 | Вътрешна грешка                         |
| -32000 | A2A крайната точка е деактивирана       |

---

## Примери за интеграция

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
