# Довідник API

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

Повний довідник для всіх API endpoints OmniRoute.

---

## Зміст

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Генерація зображень](#генерація-зображень)
- [Список моделей](#список-моделей)
- [Endpoints сумісності](#endpoints-сумісності)
- [Семантичний кеш](#семантичний-кеш)
- [Панель керування та управління](#панель-керування-та-управління)
- [Обробка запитів](#обробка-запитів)
- [Автентифікація](#автентифікація)

---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Користувацькі заголовки

| Заголовок                | Напрямок  | Опис                                                    |
| ------------------------ | --------- | ------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Запит     | Встановіть `true` для обходу кешу                       |
| `X-OmniRoute-Progress`   | Запит     | Встановіть `true` для подій прогресу                    |
| `X-Session-Id`           | Запит     | Ключ липкої сесії для зовнішньої прив'язки сесії        |
| `x_session_id`           | Запит     | Варіант з підкресленням також приймається (прямий HTTP) |
| `Idempotency-Key`        | Запит     | Ключ дедуплікації (вікно 5с)                            |
| `X-Request-Id`           | Запит     | Альтернативний ключ дедуплікації                        |
| `X-OmniRoute-Cache`      | Відповідь | `HIT` або `MISS` (без потокової передачі)               |
| `X-OmniRoute-Idempotent` | Відповідь | `true` якщо дедупліковано                               |
| `X-OmniRoute-Progress`   | Відповідь | `enabled` якщо відстеження прогресу увімкнено           |
| `X-OmniRoute-Session-Id` | Відповідь | Ефективний ID сесії, використаний OmniRoute             |

> Примітка Nginx: якщо ви покладаєтесь на заголовки з підкресленням (наприклад `x_session_id`), увімкніть `underscores_in_headers on;`.

---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Доступні провайдери: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA, **OpenRouter**, **GitHub Models**.

```bash
# Список всіх моделей embeddings
GET /v1/embeddings
```

---

## Генерація зображень

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Доступні провайдери: OpenAI (DALL-E, GPT Image 1), xAI (Grok Image), Together AI (FLUX), Fireworks AI, Nebius (FLUX), Hyperbolic, NanoBanana, **OpenRouter**, SD WebUI (локальний), ComfyUI (локальний).

```bash
# Список всіх моделей зображень
GET /v1/images/generations
```

---

## Список моделей

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Повертає всі моделі чату, embeddings та зображень + комбо у форматі OpenAI
```

---

## Endpoints сумісності

| Метод | Шлях                        | Формат                 |
| ----- | --------------------------- | ---------------------- |
| POST  | `/v1/chat/completions`      | OpenAI                 |
| POST  | `/v1/messages`              | Anthropic              |
| POST  | `/v1/responses`             | OpenAI Responses       |
| POST  | `/v1/embeddings`            | OpenAI                 |
| POST  | `/v1/images/generations`    | OpenAI                 |
| GET   | `/v1/models`                | OpenAI                 |
| POST  | `/v1/messages/count_tokens` | Anthropic              |
| GET   | `/v1beta/models`            | Gemini                 |
| POST  | `/v1beta/models/{...path}`  | Gemini generateContent |
| POST  | `/v1/api/chat`              | Ollama                 |

### Виділені маршрути провайдерів

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Префікс провайдера додається автоматично, якщо відсутній. Невідповідні моделі повертають `400`.

---

## Семантичний кеш

```bash
# Отримати статистику кешу
GET /api/cache/stats

# Очистити всі кеші
DELETE /api/cache/stats
```

Приклад відповіді:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Панель керування та управління

### Автентифікація

| Endpoint                      | Метод   | Опис                          |
| ----------------------------- | ------- | ----------------------------- |
| `/api/auth/login`             | POST    | Вхід                          |
| `/api/auth/logout`            | POST    | Вихід                         |
| `/api/settings/require-login` | GET/PUT | Перемикач обов'язкового входу |

### Управління провайдерами

| Endpoint                     | Метод                 | Опис                                                                 |
| ---------------------------- | --------------------- | -------------------------------------------------------------------- |
| `/api/providers`             | GET/POST              | Список / створення провайдерів                                       |
| `/api/providers/[id]`        | GET/PUT/DELETE        | Управління провайдером                                               |
| `/api/providers/[id]/test`   | POST                  | Тест з'єднання провайдера                                            |
| `/api/providers/[id]/models` | GET                   | Список моделей провайдера                                            |
| `/api/providers/validate`    | POST                  | Валідація конфігурації провайдера                                    |
| `/api/provider-nodes*`       | Різні                 | Управління вузлами провайдера                                        |
| `/api/provider-models`       | GET/POST/PATCH/DELETE | Користувацькі моделі (додати, оновити, приховати/показати, видалити) |

### OAuth потоки

| Endpoint                         | Метод | Опис                             |
| -------------------------------- | ----- | -------------------------------- |
| `/api/oauth/[provider]/[action]` | Різні | OAuth специфічний для провайдера |

### Маршрутизація та конфігурація

| Endpoint              | Метод    | Опис                            |
| --------------------- | -------- | ------------------------------- |
| `/api/models/alias`   | GET/POST | Псевдоніми моделей              |
| `/api/models/catalog` | GET      | Всі моделі за провайдером + тип |
| `/api/combos*`        | Різні    | Управління комбо                |
| `/api/keys*`          | Різні    | Управління API ключами          |
| `/api/pricing`        | GET      | Ціни моделей                    |

### Використання та аналітика

| Endpoint                    | Метод | Опис                      |
| --------------------------- | ----- | ------------------------- |
| `/api/usage/history`        | GET   | Історія використання      |
| `/api/usage/logs`           | GET   | Логи використання         |
| `/api/usage/request-logs`   | GET   | Логи на рівні запитів     |
| `/api/usage/[connectionId]` | GET   | Використання на з'єднання |

### Налаштування

| Endpoint                        | Метод         | Опис                           |
| ------------------------------- | ------------- | ------------------------------ |
| `/api/settings`                 | GET/PUT/PATCH | Загальні налаштування          |
| `/api/settings/proxy`           | GET/PUT       | Конфігурація мережевого проксі |
| `/api/settings/proxy/test`      | POST          | Тест з'єднання проксі          |
| `/api/settings/ip-filter`       | GET/PUT       | Білий/чорний список IP         |
| `/api/settings/thinking-budget` | GET/PUT       | Бюджет токенів міркування      |
| `/api/settings/system-prompt`   | GET/PUT       | Глобальний системний промпт    |

### Моніторинг

| Endpoint                 | Метод      | Опис                                                                                                           |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `/api/sessions`          | GET        | Відстеження активних сесій                                                                                     |
| `/api/rate-limits`       | GET        | Обмеження швидкості на акаунт                                                                                  |
| `/api/monitoring/health` | GET        | Перевірка здоров'я + зведення провайдерів (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats`       | GET/DELETE | Статистика кешу / очищення                                                                                     |

### Резервне копіювання та експорт/імпорт

| Endpoint                    | Метод | Опис                                              |
| --------------------------- | ----- | ------------------------------------------------- |
| `/api/db-backups`           | GET   | Список доступних резервних копій                  |
| `/api/db-backups`           | PUT   | Створити ручну резервну копію                     |
| `/api/db-backups`           | POST  | Відновити з конкретної резервної копії            |
| `/api/db-backups/export`    | GET   | Завантажити базу даних як .sqlite файл            |
| `/api/db-backups/import`    | POST  | Завантажити .sqlite файл для заміни бази даних    |
| `/api/db-backups/exportAll` | GET   | Завантажити повну резервну копію як .tar.gz архів |

### Хмарна синхронізація

| Endpoint               | Метод | Опис                           |
| ---------------------- | ----- | ------------------------------ |
| `/api/sync/cloud`      | Різні | Операції хмарної синхронізації |
| `/api/sync/initialize` | POST  | Ініціалізація синхронізації    |
| `/api/cloud/*`         | Різні | Управління хмарою              |

### Тунелі

| Endpoint                   | Метод | Опис                                                                      |
| -------------------------- | ----- | ------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET   | Читання статусу встановлення/виконання Cloudflare Quick Tunnel для панелі |
| `/api/tunnels/cloudflared` | POST  | Увімкнути або вимкнути Cloudflare Quick Tunnel (`action=enable/disable`)  |

### CLI інструменти

| Endpoint                           | Метод | Опис                  |
| ---------------------------------- | ----- | --------------------- |
| `/api/cli-tools/claude-settings`   | GET   | Статус Claude CLI     |
| `/api/cli-tools/codex-settings`    | GET   | Статус Codex CLI      |
| `/api/cli-tools/droid-settings`    | GET   | Статус Droid CLI      |
| `/api/cli-tools/openclaw-settings` | GET   | Статус OpenClaw CLI   |
| `/api/cli-tools/runtime/[toolId]`  | GET   | Загальний CLI runtime |

Відповіді CLI включають: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### ACP агенти

| Endpoint          | Метод  | Опис                                                                  |
| ----------------- | ------ | --------------------------------------------------------------------- |
| `/api/acp/agents` | GET    | Список всіх виявлених агентів (вбудовані + користувацькі) зі статусом |
| `/api/acp/agents` | POST   | Додати користувацького агента або оновити кеш виявлення               |
| `/api/acp/agents` | DELETE | Видалити користувацького агента за параметром запиту `id`             |

Відповідь GET включає `agents[]` (id, name, binary, version, installed, protocol, isCustom) та `summary` (total, installed, notFound, builtIn, custom).

### Стійкість та обмеження швидкості

| Endpoint                | Метод     | Опис                                       |
| ----------------------- | --------- | ------------------------------------------ |
| `/api/resilience`       | GET/PATCH | Отримати/оновити профілі стійкості         |
| `/api/resilience/reset` | POST      | Скинути circuit breakers                   |
| `/api/rate-limits`      | GET       | Статус обмеження швидкості на акаунт       |
| `/api/rate-limit`       | GET       | Глобальна конфігурація обмеження швидкості |

### Оцінки

| Endpoint     | Метод    | Опис                                  |
| ------------ | -------- | ------------------------------------- |
| `/api/evals` | GET/POST | Список наборів оцінок / запуск оцінки |

### Політики

| Endpoint        | Метод           | Опис                                |
| --------------- | --------------- | ----------------------------------- |
| `/api/policies` | GET/POST/DELETE | Управління політиками маршрутизації |

### Відповідність

| Endpoint                    | Метод | Опис                                    |
| --------------------------- | ----- | --------------------------------------- |
| `/api/compliance/audit-log` | GET   | Журнал аудиту відповідності (останні N) |

### v1beta (сумісний з Gemini)

| Endpoint                   | Метод | Опис                              |
| -------------------------- | ----- | --------------------------------- |
| `/v1beta/models`           | GET   | Список моделей у форматі Gemini   |
| `/v1beta/models/{...path}` | POST  | Endpoint Gemini `generateContent` |

Ці endpoints відображають формат API Gemini для клієнтів, які очікують нативної сумісності з Gemini SDK.

### Внутрішні / системні API

| Endpoint                 | Метод | Опис                                                                   |
| ------------------------ | ----- | ---------------------------------------------------------------------- |
| `/api/init`              | GET   | Перевірка ініціалізації додатка (використовується при першому запуску) |
| `/api/tags`              | GET   | Теги моделей сумісні з Ollama (для клієнтів Ollama)                    |
| `/api/restart`           | POST  | Запустити плавний перезапуск сервера                                   |
| `/api/shutdown`          | POST  | Запустити плавне вимкнення сервера                                     |
| `/api/system/env/repair` | POST  | Відновити змінні середовища OAuth провайдера                           |
| `/api/system-info`       | GET   | Згенерувати звіт системної діагностики                                 |

> **Примітка:** Ці endpoints використовуються внутрішньо системою або для сумісності з клієнтами Ollama. Вони зазвичай не викликаються кінцевими користувачами.

### Відновлення середовища OAuth _(v3.6.1+)_

```bash
POST /api/system/env/repair
Content-Type: application/json

{
  "provider": "claude-code"
}
```

Відновлює відсутні або пошкоджені змінні середовища OAuth для конкретного провайдера. Повертає:

```json
{
  "success": true,
  "repaired": ["CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_OAUTH_CLIENT_SECRET"],
  "backupPath": "/home/user/.omniroute/backups/env-repair-2026-04-11.bak"
}
```

---

## Транскрипція аудіо

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Транскрибуйте аудіофайли за допомогою Deepgram або AssemblyAI.

**Запит:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Відповідь:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Підтримувані провайдери:** `deepgram/nova-3`, `assemblyai/best`.

**Підтримувані формати:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Сумісність з Ollama

Для клієнтів, які використовують формат API Ollama:

```bash
# Endpoint чату (формат Ollama)
POST /v1/api/chat

# Список моделей (формат Ollama)
GET /api/tags
```

Запити автоматично перекладаються між форматами Ollama та внутрішніми форматами.

---

## Телеметрія

```bash
# Отримати зведення телеметрії затримки (p50/p95/p99 на провайдера)
GET /api/telemetry/summary
```

**Відповідь:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Бюджет

```bash
# Отримати статус бюджету для всіх API ключів
GET /api/usage/budget

# Встановити або оновити бюджет
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Доступність моделей

```bash
# Отримати доступність моделей у реальному часі для всіх провайдерів
GET /api/models/availability

# Перевірити доступність для конкретної моделі
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Обробка запитів

1. Клієнт надсилає запит до `/v1/*`
2. Обробник маршруту викликає `handleChat`, `handleEmbedding`, `handleAudioTranscription` або `handleImageGeneration`
3. Модель розв'язується (прямий провайдер/модель або псевдонім/комбо)
4. Облікові дані вибираються з локальної БД з фільтрацією доступності акаунта
5. Для чату: `handleChatCore` — виявлення формату, переклад, перевірка кешу, перевірка ідемпотентності
6. Виконавець провайдера надсилає запит вище за течією
7. Відповідь перекладається назад у формат клієнта (чат) або повертається як є (embeddings/зображення/аудіо)
8. Використання/логування записується
9. Резервний варіант застосовується при помилках відповідно до правил комбо

Повний довідник архітектури: [`ARCHITECTURE.md`](../../../../docs/ARCHITECTURE.md)

---

## Автентифікація

- Маршрути панелі (`/dashboard/*`) використовують cookie `auth_token`
- Вхід використовує збережений хеш пароля; резервний варіант до `INITIAL_PASSWORD`
- `requireLogin` перемикається через `/api/settings/require-login`
- Маршрути `/v1/*` опціонально вимагають Bearer API ключ, коли `REQUIRE_API_KEY=true`
