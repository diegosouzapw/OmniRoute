# OmniRoute A2A Server Documentation (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Протокол Agent-to-Agent v0.3 — OmniRoute як інтелектуальний агент маршрутизації

Інтерфейс A2A має дві форми:

- **JSON-RPC 2.0** за адресою `POST /a2a` (канонічна точка входу, визначена в `src/app/a2a/route.ts`).
- **REST** у просторі `/api/a2a/*` для панелей моніторингу та інструментів (стан, список завдань, скасування).

Завдання відстежуються за допомогою `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL за замовчуванням — 5 хвилин). Навички спрямовуються через `A2A_SKILL_HANDLERS` у `src/lib/a2a/taskExecution.ts`.

## Виявлення агента

```bash
curl http://localhost:20128/.well-known/agent.json
```

Повертає картку агента, яка описує можливості, навички та вимоги до автентифікації OmniRoute.

Поле `version` картки агента отримується з `process.env.npm_package_version` (див. `src/app/.well-known/agent.json/route.ts:13`), тому воно автоматично синхронізується з `package.json` під час кожного випуску.

---

## Автентифікація

Усі запити до `/a2a` вимагають API-ключа в заголовку `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Якщо на сервері не налаштовано API-ключ, автентифікація пропускається.

## Увімкнення

A2A керується перемикачем **Endpoints → A2A** і за замовчуванням вимкнений. Коли його вимкнено,
`GET /api/a2a/status` повідомляє `status: "disabled"` і `online: false`; виклики JSON-RPC до
`POST /a2a` повертають HTTP 503 із кодом помилки JSON-RPC `-32000`.

---

## Методи JSON-RPC 2.0

### `message/send` — Синхронне виконання

Надсилає повідомлення навичці та очікує на повну відповідь.

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

**Відповідь:**

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

### `message/stream` — Потокове передавання через SSE

Працює так само, як `message/send`, але повертає події Server-Sent Events для потокового передавання в реальному часі.

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

**Події SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Отримання стану завдання

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Скасування завдання

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Доступні навички

OmniRoute надає 6 навичок A2A, підключених у `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Модуль кожної навички розташований у `src/lib/a2a/skills/`.

| Навичка                  | ID                   | Опис                                                                                                                                                              | Теги                         | Приклади                                  |
| :----------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------- | :---------------------------------------- |
| Розумна маршрутизація    | `smart-routing`      | Маршрутизує запит через оптимального постачальника або комбінацію, використовуючи механізм комбінацій і оцінювання OmniRoute                                      | маршрутизація, постачальники | "Спрямуй цей запит через найкращу модель" |
| Керування квотами        | `quota-management`   | Повідомляє стан квоти для кожного постачальника та допомагає клієнтам вирішити, коли обмежити частоту запитів або перемкнутися                                    | квота, постачальники         | "Перевір квоту для anthropic"             |
| Виявлення постачальників | `provider-discovery` | Перелічує встановлених постачальників із зазначенням можливостей, ознак безкоштовного рівня та стану OAuth                                                        | постачальники, виявлення     | "Які постачальники доступні?"             |
| Аналіз вартості          | `cost-analysis`      | Оцінює вартість запиту або розмови на основі каталогу та нещодавнього використання                                                                                | вартість, використання       | "Оціни вартість цієї розмови"             |
| Звіт про стан            | `health-report`      | Агрегує стан автоматичного вимикача, періоду очікування та блокування для кожного постачальника                                                                   | стан, стійкість              | "Покажи стан усіх постачальників"         |
| Перелік можливостей      | `list-capabilities`  | Повертає повний каталог із 45 навичок агента (23 API + 21 CLI + 1 конфігурація) як markdown-таблицю з необробленими URL-адресами SKILL.md для додавання контексту | каталог, виявлення, навички  | "Перелічи всі можливості OmniRoute"       |

> Картку агента слід підтримувати узгодженою з актуальним каталогом із 352 постачальників; кількість постачальників і метадані щодо безкоштовного доступу або відсутності автентифікації отримуються з реєстру середовища виконання.

### Докладний опис навички `list-capabilities`

Навичка `list-capabilities` особливо корисна для зовнішніх агентів, яким потрібно з’ясувати, що надає OmniRoute, перш ніж надсилати виклики API. Вона повертає артефакт у вигляді структурованої markdown-таблиці:

```
| ID | Назва | Категорія | Область | Кінцеві точки/команди | Необроблена URL-адреса |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Автентифікація та сеанси | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Кожен рядок містить стовпець `rawUrl`, щоб агенти могли негайно отримати повний файл SKILL.md. Поле `metadata.totalSkills` відповідає розміру каталогу (наразі 45). Реалізація: `src/lib/a2a/skills/listCapabilities.ts`. Див. також [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## REST API (допоміжний)

Кінцева точка JSON-RPC `/a2a` є канонічною точкою входу A2A. Наведені нижче кінцеві точки REST забезпечують допоміжний доступ для інформаційних панелей і зовнішніх інструментів:

| Кінцева точка                | Метод | Опис                                                       | Авторизація                                        |
| :--------------------------- | :---- | :--------------------------------------------------------- | :------------------------------------------------- |
| `/api/a2a/status`            | GET   | Стан сервера, зареєстровані навички                        | (публічна)                                         |
| `/api/a2a/tasks`             | GET   | Список завдань із фільтрами                                | керування                                          |
| `/api/a2a/tasks/[id]`        | GET   | Отримати завдання за ID                                    | керування                                          |
| `/api/a2a/tasks/[id]/cancel` | POST  | Скасувати виконуване завдання                              | керування                                          |
| `/.well-known/agent.json`    | GET   | Картка агента (виявлення A2A)                              | (публічна, кешується 3600 с)                       |
| `/api/a2a/tasks`             | POST  | Вхідне делегування флоту OmniConductor (Conductor PRD RF5) | Bearer відносно `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Вхідне делегування Conductor (`POST /api/a2a/tasks`):** зовнішні агенти A2A делегують роботу з кодом флоту OmniConductor через OmniRoute. Тіло: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — делегувати можна лише навички флоту Conductor (оголошені в картці агента); `metadata.conductor.repo.url` є обов’язковим (флот працює з git-репозиторіями). Маршрут перетворюється на `POST /v1/tasks` хаба з використанням серверного `CONDUCTOR_ORCHESTRATOR_TOKEN` (резервний варіант — `CONDUCTOR_HUB_TOKEN`) і повертає `201 { conductor_task_id, state: "submitted" }`; стани завдань передаються назад через дзеркало SSE→A2A (RF1) і доступні через `GET /api/a2a/tasks?skill=conductor`.

---

## Додавання нової навички

1. **Створіть файл навички:** `src/lib/a2a/skills/<your-skill>.ts`

   Експортуйте асинхронну функцію `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Дотримуйтеся структури наявних навичок, як-от `smartRouting.ts`.

2. **Зареєструйте обробник:** у `src/lib/a2a/taskExecution.ts` додайте запис до `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...наявні навички
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Опублікуйте в картці агента:** у `src/app/.well-known/agent.json/route.ts` додайте до масиву `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Напишіть тести:** `tests/unit/a2a-<your-skill>.test.ts`. Перевірте успішний сценарій і сценарій помилки.

5. **Задокументуйте** нову навичку в таблиці `Available Skills` цього файлу.

---

## TTL завдання

Термін дії завдань спливає через `ttlMinutes` (за замовчуванням — 5 хв) — це налаштовується в конструкторі `A2ATaskManager` у `src/lib/a2a/taskManager.ts:82`. Щоб змінити це значення, створіть власний екземпляр `A2ATaskManager` і передайте інше значення (наприклад, `new A2ATaskManager(15)` для TTL тривалістю 15 хвилин). Фоновий інтервал перевіряє та видаляє прострочені завдання кожні 60 секунд.

---

## Життєвий цикл завдання

```
submitted → working → completed
                    → failed
                    → cancelled
```

- За замовчуванням термін дії завдань спливає через 5 хвилин (див. [TTL завдання](#task-ttl))
- Кінцеві стани: `completed`, `failed`, `cancelled`
- Журнал подій відстежує кожен перехід між станами

---

## Коди помилок

| Код    | Значення                                         |
| :----- | :----------------------------------------------- |
| -32700 | Помилка синтаксичного аналізу (некоректний JSON) |
| -32600 | Некоректний запит / Немає авторизації            |
| -32601 | Метод або навичку не знайдено                    |
| -32602 | Некоректні параметри                             |
| -32603 | Внутрішня помилка                                |
| -32000 | Кінцеву точку A2A вимкнено                       |

---

## Приклади інтеграції

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
