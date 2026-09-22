# Chaos Mode (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Панель керування:** **Chaos Mode** (бічна панель) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (сеанс панелі керування) · `POST /api/skills/collect/chaos` (ключ API)  
> **Вихідний код:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode надсилає **одне завдання кільком постачальникам одночасно** — кожен залучений постачальник
надає один екземпляр моделі, а ви отримуєте всі відповіді поруч (або послідовно в ланцюжку). Це
інтерфейс виконання з кількома моделями, а не стратегія маршрутизації: він ніколи не впливає на ваш
звичайний трафік `/v1/chat/completions`.

**Уточнення — постачаються три різні компоненти зі словом "chaos" у назві:**

| Компонент                     | Що це таке                                                                                                                                 | Де задокументовано                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**                | Описані тут сторінка панелі керування та API: розподіл одного завдання між багатьма постачальниками (паралельно або спільно).              | Цей посібник                                 |
| `auto/chaos`                  | Ідентифікатор моделі Auto-Combo з вагами оцінювання для ін’єкції збоїв, призначений для тестування стійкості. Налаштування не потрібне.    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Конфігурація комбінації Chaos | Збережена комбінація, у якій `config.chaos.enabled` розподіляє запит між групою моделей із необов’язковою моделлю-суддею (лише через API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Налаштування

1. Відкрийте **Панель керування → Chaos Mode** (`/dashboard/chaos`).
2. **Увімкніть** його — Chaos Mode постачається **вимкненим за замовчуванням** (`enabled: false` у
   `src/lib/chaos/chaosConfig.ts`). Коли його вимкнено, `POST /api/chaos/run` повертає
   `400 — "Chaos Mode не ввімкнено. Увімкніть його в Панель керування → Chaos Mode."`.
3. Виберіть учасників і значення за замовчуванням (зберігаються окремо для кожного екземпляра через сховище налаштувань):

   | Поле                | Значення                                                                          | Значення за замовчуванням / обмеження              |
   | ------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
   | `enabled`           | Головний перемикач                                                                | `false`                                            |
   | `defaultMode`       | `parallel` або `collaborative` (див. нижче)                                       | `parallel`                                         |
   | `providerOverrides` | Участь окремих постачальників (`providerId`, необов’язковий `modelId`, `enabled`) | порожньо = усі активні постачальники, максимум 200 |
   | `systemPrompt`      | Перевизначення вбудованого системного запиту Chaos                                | необов’язково, максимум 10 000 символів            |
   | `timeoutMs`         | Максимальний час одного виклику моделі                                            | `120000` (5 000–600 000)                           |
   | `maxTokens`         | `max_tokens` для одного виклику моделі                                            | `4096` (256–128 000)                               |

4. Запустіть **тест безпосередньо зі сторінки** — панель результатів показує відповідь,
   стан і тривалість для кожного постачальника.

## Режими виконання

- **`parallel`** — кожна модель одночасно отримує те саме завдання; ви отримуєте всі відповіді
  незалежно одна від одної.
- **`collaborative`** — моделі запускаються **ланцюжком**: кожна з них бачить результат попередньої моделі й
  отримує запит уточнити, розширити, критично оцінити його або запропонувати альтернативу. Поле `summary`
  у відповіді об’єднує успішні результати в порядку ланцюжка (паралельні запуски не мають `summary`).

## API

### `POST /api/chaos/run` — сеанс панелі керування

Автентифікація за допомогою cookie (сеанс керування — див.
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); використовується сторінкою панелі керування.

```jsonc
// тіло запиту
{
  "task": "Compare approaches to X", // обов’язково
  "providers": ["glm", "kimi"], // необов’язковий фільтр
  "mode": "parallel", // необов’язково — перевизначає defaultMode
  "systemPrompt": "…", // необов’язкове перевизначення
  "maxTokens": 4096, // необов’язкове перевизначення
}
```

### `POST /api/skills/collect/chaos` — ключ API

Варіант із токеном Bearer для зовнішніх клієнтів. Ключ повинен мати **дозвіл Chaos Mode**
(`chaosModeEnabled`), який **вимкнений за замовчуванням** — увімкніть його окремо для кожного ключа в
**Панель керування → API Manager → редагування ключа → дозволи → Chaos Mode**. Тіло запиту таке саме, як вище.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Обидві кінцеві точки повертають дані однакової структури:

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
  "summary": "…", // лише для collaborative mode
}
```

## Усунення несправностей

- **`400 Chaos Mode is not enabled`** — див. крок 2 вище: глобальний перемикач вимкнений.
- **Ключ API відхиляється на `/api/skills/collect/chaos`** — ключ не має окремого дозволу
  `chaosModeEnabled` (вимкнений за замовчуванням; це налаштування, а не помилка).
- **Очікуваний постачальник відсутній у результатах** — перевірте `providerOverrides` на сторінці
  Chaos Mode (вимкнене перевизначення виключає його), а також чи активне підключення постачальника.
