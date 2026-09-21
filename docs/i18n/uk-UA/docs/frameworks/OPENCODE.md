# OpenCode Integration (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Статус:** Загальнодоступно.
> **Аудиторія:** Оператори, які підключають OpenCode до розгортання OmniRoute.
> **Джерело істини (схема конфігурації):** `src/shared/services/opencodeConfig.ts`
> **Джерело істини (пакет npm):** `@omniroute/opencode-provider/` (робоча область, яку можна опублікувати)

[OpenCode](https://opencode.ai) — це агентний ШІ-клієнт із CLI та графічним інтерфейсом для настільних систем. Він читає каталог постачальників із `~/.config/opencode/opencode.json` (або `opencode.jsonc`) і використовує схему за адресою `https://opencode.ai/config.json`. OmniRoute представляє себе в OpenCode як один із таких постачальників — кожен запит проходить через стандартний OpenAI-сумісний інтерфейс OmniRoute `/v1`, тому OpenCode автоматично отримує переваги маршрутизації Auto-Combo, автоматичних вимикачів, політик ключів, спостережуваності тощо.

Підтримуються **два способи інтеграції**. Виберіть один із них — обидва генерують однакову конфігурацію.

---

## Спосіб 1 — генератор CLI (без встановлення npm)

Рекомендовано для кінцевих користувачів. Постачається разом з OmniRoute. Записує зміни безпосередньо у файл `opencode.json`.

```bash
# Після встановлення OmniRoute (npm i -g @omniroute/cli або локального клонування)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

За лаштунками CLI викликає `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), тому наявний файл `opencode.json` зберігає інших постачальників і коментарі. Запис OmniRoute додається або замінюється атомарно.

Отриманий файл (каталог моделей за замовчуванням):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
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

## Спосіб 2 — пакет npm `@omniroute/opencode-provider`

Рекомендовано, якщо ви автоматизуєте створення конфігурації за допомогою Node/TS (конвеєри CI, монорепозиторії, власні процеси встановлення).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Необов'язково: перевизначте каталог моделей, доступний у OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Для неруйнівного об’єднання з наявним файлом відтворіть `mergeOpenCodeConfigText()` з `opencodeConfig.ts` або викличте генератор CLI.

Повний опис API наведено в [README пакета](../../@omniroute/opencode-provider/README.md).

---

## Що насправді відбувається під час виконання

Обидва способи створюють однаковий запис `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Під час виконання OpenCode завантажує `@ai-sdk/openai-compatible` (який уже є транзитивною залежністю OpenCode) і налаштовує його за допомогою `baseURL` + `apiKey`. Далі відбувається таке:

```
Інтерфейс/агент OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI-сумісний інтерфейс OmniRoute)
         → обробник OmniRoute /v1/chat/completions    (open-sse/handlers/chatCore.ts)
            → комбінована маршрутизація / Auto-Combo / виконавець
               → зовнішній постачальник
```

Плагін ніколи не працює з HTTP безпосередньо. Він лише створює конфігурацію.

---

## Типові налаштування каталогу моделей

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Їх можна перевизначити через `models: [...]`. Рекомендовані доповнення:

- `"auto"` — надає доступ до [Auto-Combo](../routing/AUTO-COMBO.md) від OmniRoute — маршрутизатора, який не потребує налаштування. Дає змогу OpenCode вибрати «найкращу доступну модель» без жорсткого кодування каталогу.
- `"<combo-name>"` — будь-яка комбінація, визначена вами на інформаційній панелі; OmniRoute обробляє її прозоро.

---

## Нормалізація URL

Допоміжна функція приймає обидві форми й додає рівно один `/v1`:

| Вхідні дані                    | Вихідні дані (`options.baseURL`) |
| ------------------------------ | -------------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1`      |
| `http://localhost:20128/`      | `http://localhost:20128/v1`      |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1`      |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1`      |

Таке дублювання є **найпоширенішою причиною несправностей** у старих конфігураціях. Якщо у вас є `opencode.json`, створений до v3.8.0, який указує на `/v1/v1/...`, повторно запустіть генератор або ще раз викличте `createOmniRouteProvider`.

---

## Режими автентифікації

| Налаштування OmniRoute                                     | Рекомендоване значення `apiKey`                                            |
| ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (типово для локального середовища) | `sk_omniroute` (буквальне значення-заповнювач)                             |
| `REQUIRE_API_KEY=true`                                     | Справжній API-ключ окремого користувача з інформаційної панелі → API Keys. |

Для клієнтів у стилі Anthropic, які надсилають `x-api-key` + `anthropic-version`, функція `extractApiKey` OmniRoute також приймає ключ із `x-api-key`. OpenCode використовує інтерфейс OpenAI, тому завжди надсилатиме `Authorization: Bearer ${apiKey}` — особливий випадок для Anthropic тут не застосовується.

---

## Усунення несправностей

| Симптом                                                               | Причина                                                                         | Виправлення                                                                                                                   |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `404` для кожного запиту з URL, що містить `/v1/v1/`                  | Застаріла конфігурація плагіна версії до v3.8, яка двічі додавала суфікс `/v1`. | Повторно згенеруйте її за допомогою способу 1 або 2.                                                                          |
| `401 Invalid API key`                                                 | В OmniRoute встановлено `REQUIRE_API_KEY=true`, а ключ невідомий.               | Створіть ключ на інформаційній панелі або встановіть `REQUIRE_API_KEY=false` (лише локально) і використовуйте `sk_omniroute`. |
| Список моделей в інтерфейсі OpenCode порожній                         | Усі 4 типові моделі приховані в налаштуваннях видимості провайдера OmniRoute.   | Передайте `models: ["auto", ...]`, щоб відобразити ввімкнені вами моделі.                                                     |
| Помилка OpenCode 500 із повідомленням `cannot read property 'models'` | Старіші версії OpenCode (< 0.1.x) не підтримували вбудоване поле `models`.      | Оновіть OpenCode до версії, яка відповідає схемі v1 (`opencode.ai/config.json`).                                              |

---

## Дивіться також

- [Довідник API](../reference/API_REFERENCE.md) — повний опис REST API OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — що означає `model: "auto"`
- [README `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Вихідний код: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
