# OpenCode Integration (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Статус:** Общодостъпно.
> **Аудитория:** Оператори, свързващи OpenCode към внедряване на OmniRoute.
> **Основен източник (конфигурационна схема):** `src/shared/services/opencodeConfig.ts`
> **Основен източник (npm пакет):** `@omniroute/opencode-provider/` (работно пространство, което може да бъде публикувано)

[OpenCode](https://opencode.ai) е агентен CLI/настолен AI клиент. Той прочита каталога си с доставчици от `~/.config/opencode/opencode.json` (или `opencode.jsonc`) и следва схемата на `https://opencode.ai/config.json`. OmniRoute се представя пред OpenCode като един от тези доставчици — всяка заявка преминава през стандартния, съвместим с OpenAI интерфейс `/v1` на OmniRoute, така че OpenCode автоматично се възползва от маршрутизиране чрез Auto-Combo, прекъсвачи на вериги, политики за ключове, наблюдаемост и др.

Поддържат се **два начина за интеграция**. Изберете един — и двата генерират една и съща конфигурация.

---

## Начин 1 — CLI генератор (без инсталиране чрез npm)

Препоръчва се за крайни потребители. Доставя се с OmniRoute. Записва директно в `opencode.json`.

```bash
# След инсталиране на OmniRoute (npm i -g @omniroute/cli или локално клониране)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Зад кулисите CLI извиква `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), така че съществуващият `opencode.json` запазва останалите си доставчици и коментари. Записът за OmniRoute се добавя/заменя атомарно.

Полученият файл (каталог с модели по подразбиране):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<вашият-ключ>",
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

## Начин 2 — npm пакет `@omniroute/opencode-provider`

Препоръчва се, когато автоматизирате конфигурацията чрез Node/TS (CI конвейери, монорепозитории, персонализирани процеси за инсталиране).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // По избор: заменете каталога с модели, предоставен на OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

За сливане без разрушителни промени със съществуващ файл възпроизведете `mergeOpenCodeConfigText()` от `opencodeConfig.ts` или извикайте CLI генератора.

Вижте [README на пакета](../../@omniroute/opencode-provider/README.md) за пълния API.

---

## Какво всъщност прави средата за изпълнение

И двата начина създават една и съща стойност `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. По време на изпълнение OpenCode зарежда `@ai-sdk/openai-compatible` (вече транзитивна зависимост на OpenCode) и го конфигурира с `baseURL` + `apiKey`. Оттам нататък:

```
Потребителски интерфейс/агент на OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OpenAI интерфейс на OmniRoute)
         → манипулатор на OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → комбинирано маршрутизиране / Auto-Combo / изпълнител
               → външен доставчик
```

Добавката никога не взаимодейства с HTTP. Тя единствено генерира конфигурация.

---

## Настройки по подразбиране на каталога с модели

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Можете да ги замените чрез `models: [...]`. Препоръчителни допълнения:

- `"auto"` — предоставя достъп до маршрутизатора [Auto-Combo](../routing/AUTO-COMBO.md) на OmniRoute, който не изисква конфигуриране. Позволява на OpenCode да избере „най-добрия наличен модел“, без да задавате каталога директно в кода.
- `"<combo-name>"` — всяка комбинация, която сте дефинирали в таблото за управление; OmniRoute я разрешава прозрачно.

---

## Нормализиране на URL адреси

Помощната функция приема и двете форми и добавя точно един `/v1`:

| Вход                           | Изход (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Това премахване на дублирането е **най-често срещаната причина за неизправности** при по-стари конфигурации. Ако имате `opencode.json` отпреди v3.8.0, който сочи към `/v1/v1/...`, стартирайте генератора отново или извикайте `createOmniRouteProvider` отново.

---

## Режими на удостоверяване

| Настройка на OmniRoute                            | Препоръчителна стойност за `apiKey`                            |
| ------------------------------------------------- | -------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (по подразбиране локално) | `sk_omniroute` (буквален заместител)                           |
| `REQUIRE_API_KEY=true`                            | Реален API ключ за отделния потребител от Табло → API ключове. |

За клиенти в стила на Anthropic, които изпращат `x-api-key` + `anthropic-version`, `extractApiKey` на OmniRoute също приема ключа от `x-api-key`. OpenCode използва интерфейса на OpenAI, така че винаги ще изпраща `Authorization: Bearer ${apiKey}` — тук не се прилага специална обработка за Anthropic.

---

## Отстраняване на неизправности

| Симптом                                              | Причина                                                                                       | Решение                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `404` при всяка заявка с URL, съдържащ `/v1/v1/`     | Остаряла конфигурация от плъгин преди v3.8, който добавя `/v1` два пъти.                      | Генерирайте я отново чрез Път 1 или 2.                                                                                  |
| `401 Invalid API key`                                | OmniRoute е с `REQUIRE_API_KEY=true`, а ключът е неизвестен.                                  | Създайте ключа в таблото за управление или задайте `REQUIRE_API_KEY=false` (само локално) и използвайте `sk_omniroute`. |
| Списъкът с модели в интерфейса на OpenCode е празен  | И 4-те модела по подразбиране са скрити в настройките за видимост на доставчика на OmniRoute. | Подайте `models: ["auto", ...]`, за да покажете тези, които сте активирали.                                             |
| OpenCode връща 500 с `cannot read property 'models'` | По-старите версии на OpenCode (< 0.1.x) не приемаха вградена настройка `models`.              | Надстройте OpenCode до версия, която следва схемата v1 (`opencode.ai/config.json`).                                     |

---

## Вижте също

- [Справочник за API](../reference/API_REFERENCE.md) — пълният REST интерфейс на OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — какво означава `model: "auto"`
- [README на `@omniroute/opencode-provider`](../../@omniroute/opencode-provider/README.md)
- Изходен код: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
