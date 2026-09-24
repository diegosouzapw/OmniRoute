# Chaos Mode (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Панель управления:** **Chaos Mode** (боковая панель) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (сессия панели управления) · `POST /api/skills/collect/chaos` (ключ API)  
> **Исходный код:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode отправляет **одну задачу сразу нескольким провайдерам** — каждый участвующий провайдер
предоставляет один экземпляр модели, а вы получаете все ответы рядом друг с другом (или в цепочке). Это
интерфейс выполнения с несколькими моделями, а не стратегия маршрутизации: обычный трафик
`/v1/chat/completions` никогда им не затрагивается.

**Уточнение — в продукте есть три разные функции со словом "chaos" в названии:**

| Компонент                     | Что это такое                                                                                                                                      | Где описано                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                | Описанные здесь страница панели управления и API: отправка одной задачи множеству провайдеров (параллельно или совместно).                         | Это руководство                              |
| `auto/chaos`                  | Идентификатор модели Auto-Combo с весами оценки для внедрения сбоев, предназначенный для тестирования устойчивости. Настройка не требуется.        | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Конфигурация комбинации Chaos | Сохранённая комбинация, в которой `config.chaos.enabled` распределяет запрос по группе моделей с необязательной моделью-судьёй (только через API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Настройка

1. Откройте **Панель управления → Chaos Mode** (`/dashboard/chaos`).
2. **Включите** режим — по умолчанию Chaos Mode поставляется **отключённым** (`enabled: false` в
   `src/lib/chaos/chaosConfig.ts`). Пока он отключён, `POST /api/chaos/run` возвращает
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Выберите участников и значения по умолчанию (они сохраняются отдельно для каждого экземпляра через хранилище настроек):

   | Поле                | Значение                                                                          | Значение по умолчанию / ограничения             |
   | ------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | Главный переключатель                                                             | `false`                                         |
   | `defaultMode`       | `parallel` или `collaborative` (см. ниже)                                         | `parallel`                                      |
   | `providerOverrides` | Участие отдельных провайдеров (`providerId`, необязательный `modelId`, `enabled`) | пусто = каждый активный провайдер, максимум 200 |
   | `systemPrompt`      | Переопределение встроенного системного промпта Chaos                              | необязательно, максимум 10 000 символов         |
   | `timeoutMs`         | Максимальное время одного вызова модели                                           | `120000` (5 000–600 000)                        |
   | `maxTokens`         | `max_tokens` для каждого вызова модели                                            | `4096` (256–128 000)                            |

4. Запустите **тест непосредственно на этой странице** — на панели результатов отображаются ответ,
   статус и продолжительность для каждого провайдера.

## Режимы выполнения

- **`parallel`** — каждая модель одновременно получает одну и ту же задачу; все ответы
  возвращаются независимо друг от друга.
- **`collaborative`** — модели запускаются **в цепочке**: каждая из них видит результат предыдущей модели и
  получает запрос на его уточнение, расширение, критику или предложение альтернативы. Поле `summary`
  в ответе объединяет успешные результаты в порядке цепочки (при параллельном запуске `summary` отсутствует).

## API

### `POST /api/chaos/run` — сессия панели управления

Аутентификация с помощью cookie (сессия управления — см.
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); используется страницей панели управления.

```jsonc
// тело запроса
{
  "task": "Compare approaches to X", // обязательно
  "providers": ["glm", "kimi"], // необязательный фильтр
  "mode": "parallel", // необязательно — переопределяет defaultMode
  "systemPrompt": "…", // необязательное переопределение
  "maxTokens": 4096, // необязательное переопределение
}
```

### `POST /api/skills/collect/chaos` — ключ API

Вариант с Bearer-токеном для внешних клиентов. Ключ должен иметь **разрешение Chaos Mode**
(`chaosModeEnabled`), которое **по умолчанию отключено** — включите его отдельно для каждого ключа в разделе
**Панель управления → API Manager → редактировать ключ → разрешения → Chaos Mode**. Тело запроса такое же, как указано выше.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Обе конечные точки возвращают данные одинаковой структуры:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // только для collaborative mode
}
```

## Устранение неполадок

- **`400 Chaos Mode is not enabled`** — см. шаг 2 выше: глобальный переключатель выключен.
- **Ключ API отклоняется при обращении к `/api/skills/collect/chaos`** — у ключа отсутствует отдельное
  разрешение `chaosModeEnabled` (по умолчанию оно отключено; это настройка, а не ошибка).
- **Ожидаемый провайдер отсутствует в результатах** — проверьте `providerOverrides` на странице
  Chaos Mode (отключённое переопределение исключает провайдера), а также активно ли подключение
  к провайдеру.
