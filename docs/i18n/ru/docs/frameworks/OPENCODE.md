# OpenCode Integration (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Статус:** Общедоступно.
> **Аудитория:** Операторы, подключающие OpenCode к развертыванию OmniRoute.
> **Источник истины (схема конфигурации):** `src/shared/services/opencodeConfig.ts`
> **Источник истины (пакет npm):** `@omniroute/opencode-provider/` (публикуемое рабочее пространство)

[OpenCode](https://opencode.ai) — это агентный ИИ-клиент с интерфейсами CLI и настольного приложения. Он считывает каталог провайдеров из `~/.config/opencode/opencode.json` (или `opencode.jsonc`) и использует схему по адресу `https://opencode.ai/config.json`. OmniRoute представляет себя в OpenCode как один из таких провайдеров — каждый запрос проходит через стандартный OpenAI-совместимый интерфейс `/v1` OmniRoute, поэтому OpenCode автоматически получает преимущества маршрутизации Auto-Combo, автоматических выключателей, политик ключей, наблюдаемости и т. д.

Поддерживаются **два способа интеграции**. Выберите один из них — оба создают одинаковую конфигурацию.

---

## Способ 1 — генератор CLI (без установки npm)

Рекомендуется для конечных пользователей. Поставляется вместе с OmniRoute. Записывает изменения непосредственно в `opencode.json`.

```bash
# После установки OmniRoute (npm i -g @omniroute/cli или локального клонирования)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Внутри CLI вызывает `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), поэтому в существующем `opencode.json` сохраняются другие провайдеры и комментарии. Запись OmniRoute добавляется или заменяется атомарно.

Полученный файл (каталог моделей по умолчанию):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<ваш-ключ>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Способ 2 — пакет npm `@omniroute/opencode-provider`

Рекомендуется при создании конфигурации с помощью скриптов Node/TS (конвейеры CI, монорепозитории, пользовательские сценарии установки).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Необязательно: переопределите каталог моделей, доступный в OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Для неразрушающего объединения с существующим файлом воспроизведите `mergeOpenCodeConfigText()` из `opencodeConfig.ts` или вызовите генератор CLI.

Полное описание API см. в [README пакета](../../@omniroute/opencode-provider/README.md).

---

## Что фактически делает среда выполнения

Оба способа создают одинаковое значение `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Во время выполнения OpenCode загружает `@ai-sdk/openai-compatible` (уже являющийся транзитивной зависимостью OpenCode) и настраивает его с помощью `baseURL` + `apiKey`. Далее:

```
Интерфейс/агент OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI-совместимый интерфейс OmniRoute)
         → обработчик OmniRoute /v1/chat/completions  (open-sse/handlers/chatCore.ts)
            → комбинированная маршрутизация / Auto-Combo / исполнитель
               → вышестоящий провайдер
```

Плагин никогда не работает с HTTP напрямую. Он лишь создает конфигурацию.

---

## Модели каталога по умолчанию

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Значения можно переопределить с помощью `models: [...]`. Рекомендуемые дополнения:

- `"auto"` — предоставляет маршрутизатор [Auto-Combo](../routing/AUTO-COMBO.md) от OmniRoute, не требующий настройки. Позволяет OpenCode выбрать «лучшую доступную модель» без жёсткого задания каталога.
- `"<combo-name>"` — любая комбинация, определённая вами на панели управления; OmniRoute обрабатывает её прозрачно.

---

## Нормализация URL

Вспомогательная функция принимает обе формы и добавляет ровно один `/v1`:

| Вход                           | Выход (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Эта дедупликация устраняет **наиболее распространённую причину сбоев** в старых конфигурациях. Если у вас есть `opencode.json`, созданный до v3.8.0 и указывающий на `/v1/v1/...`, повторно запустите генератор или снова вызовите `createOmniRouteProvider`.

---

## Режимы аутентификации

| Настройка OmniRoute                             | Рекомендуемое значение `apiKey`                                      |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (по умолчанию локально) | `sk_omniroute` (буквальное значение-заполнитель)                     |
| `REQUIRE_API_KEY=true`                          | Настоящий пользовательский API-ключ из панели управления → API Keys. |

Для клиентов в стиле Anthropic, отправляющих `x-api-key` + `anthropic-version`, функция `extractApiKey` OmniRoute также учитывает ключ из `x-api-key`. OpenCode использует интерфейс OpenAI, поэтому всегда отправляет `Authorization: Bearer ${apiKey}` — особая обработка Anthropic здесь не применяется.

---

## Устранение неполадок

| Симптом                                               | Причина                                                                      | Решение                                                                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `404` для каждого запроса с URL, содержащим `/v1/v1/` | Устаревшая конфигурация плагина до v3.8, дважды добавляющая суффикс `/v1`.   | Повторно создайте конфигурацию с помощью способа 1 или 2.                                                                 |
| `401 Invalid API key`                                 | В OmniRoute установлено `REQUIRE_API_KEY=true`, и ключ неизвестен.           | Создайте ключ на панели управления или установите `REQUIRE_API_KEY=false` (только локально) и используйте `sk_omniroute`. |
| Список моделей в интерфейсе OpenCode пуст             | Все 4 модели по умолчанию скрыты настройками видимости провайдера OmniRoute. | Передайте `models: ["auto", ...]`, чтобы отобразить включённые вами модели.                                               |
| Ошибка OpenCode 500 с `cannot read property 'models'` | Старые версии OpenCode (< 0.1.x) не поддерживали встроенное поле `models`.   | Обновите OpenCode до версии, соответствующей схеме v1 (`opencode.ai/config.json`).                                        |

---

## См. также

- [Справочник API](../reference/API_REFERENCE.md) — полное описание OmniRoute REST
- [Auto-Combo](../routing/AUTO-COMBO.md) — что означает `model: "auto"`
- [README `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Исходный код: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
