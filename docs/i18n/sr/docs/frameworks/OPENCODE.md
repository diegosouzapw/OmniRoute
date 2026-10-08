# OpenCode Integration (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Статус:** Опште доступно.
> **Публика:** Оператери који повезују OpenCode са OmniRoute имплементацијом.
> **Извор истине (шема конфигурације):** `src/shared/services/opencodeConfig.ts`
> **Извор истине (npm пакет):** `@omniroute/opencode-provider/` (радни простор који се може објавити)

[OpenCode](https://opencode.ai) је агентски CLI/десктоп AI клијент. Свој каталог добављача чита из `~/.config/opencode/opencode.json` (или `opencode.jsonc`) и прати шему на адреси `https://opencode.ai/config.json`. OmniRoute се OpenCode-у представља као један од тих добављача — сваки захтев пролази кроз OmniRoute-ов стандардни `/v1` интерфејс компатибилан са OpenAI-јем, тако да OpenCode аутоматски користи предности Auto-Combo усмеравања, прекидача кола, политика кључева, опсервабилности итд.

Постоје **два подржана начина интеграције**. Изаберите један — оба генеришу исту конфигурацију.

---

## Путања 1 — CLI генератор (без npm инсталације)

Препоручује се крајњим корисницима. Испоручује се уз OmniRoute. Уписује измене директно у `opencode.json`.

```bash
# Након инсталирања OmniRoute-а (npm i -g @omniroute/cli или локални клон)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

CLI у позадини позива `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), тако да постојећи `opencode.json` задржава остале добављаче и коментаре. OmniRoute унос се атомски додаје или замењује.

Добијена датотека (подразумевани каталог модела):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<ваш-кључ>",
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

## Путања 2 — npm пакет `@omniroute/opencode-provider`

Препоручује се када конфигурацију скриптујете из Node/TS-а (CI токови, монорепозиторијуми, прилагођени токови инсталације).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Опционо: замените каталог модела изложен OpenCode-у
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

За недеструктивно обједињавање са постојећом датотеком, поновите логику из `mergeOpenCodeConfigText()` у `opencodeConfig.ts` или позовите CLI генератор.

Комплетан API потражите у [README-у пакета](../../@omniroute/opencode-provider/README.md).

---

## Шта окружење за извршавање заправо ради

Обе путање производе исти `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Током извршавања, OpenCode учитава `@ai-sdk/openai-compatible` (који је већ транзитивна зависност OpenCode-а) и конфигурише га помоћу `baseURL` + `apiKey`. Након тога:

```
OpenCode кориснички интерфејс/агент
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI интерфејс)
         → OmniRoute /v1/chat/completions обрађивач   (open-sse/handlers/chatCore.ts)
            → комбиновано усмеравање / Auto-Combo / извршилац
               → узводни добављач
```

Додатак никада не приступа HTTP-у. Он само генерише конфигурацију.

---

## Подразумеване вредности каталога модела

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Можете их заменити помоћу `models: [...]`. Препоручени додаци:

- `"auto"` — омогућава OmniRoute [Auto-Combo](../routing/AUTO-COMBO.md) рутер без потребе за конфигурацијом. Омогућава OpenCode-у да изабере „најбољи доступни модел“ без ручног навођења каталога.
- `"<combo-name>"` — било која комбинација коју сте дефинисали на контролној табли; OmniRoute је разрешава неприметно.

---

## Нормализација URL-а

Помоћна функција прихвата оба облика и додаје тачно један `/v1`:

| Улаз                           | Излаз (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Ово уклањање дупликата је **најчешћи узрок неисправности** у старијим конфигурацијама. Ако имате `opencode.json` из периода пре верзије v3.8.0 који упућује на `/v1/v1/...`, поново покрените генератор или поново позовите `createOmniRouteProvider`.

---

## Режими аутентификације

| OmniRoute поставка                              | Препоручена вредност за `apiKey`                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (подразумевано локално) | `sk_omniroute` (дословна вредност чувара места)                              |
| `REQUIRE_API_KEY=true`                          | Стварни API кључ за појединачног корисника из Контролна табла → API кључеви. |

За клијенте у Anthropic стилу који шаљу `x-api-key` + `anthropic-version`, OmniRoute `extractApiKey` такође прихвата кључ из `x-api-key`. OpenCode користи OpenAI интерфејс, па ће увек слати `Authorization: Bearer ${apiKey}` — Anthropic посебан случај се овде не примењује.

---

## Решавање проблема

| Симптом                                                  | Узрок                                                                                     | Решење                                                                                                              |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `404` на сваком захтеву чији URL садржи `/v1/v1/`        | Застарела конфигурација додатка пре v3.8 која је двапут додавала `/v1`.                   | Поново генеришите помоћу путање 1 или 2.                                                                            |
| `401 Invalid API key`                                    | OmniRoute има `REQUIRE_API_KEY=true`, а кључ није познат.                                 | Направите кључ на контролној табли или поставите `REQUIRE_API_KEY=false` (само локално) и користите `sk_omniroute`. |
| Листа модела је празна у OpenCode корисничком интерфејсу | Сва 4 подразумевана модела су скривена у подешавањима видљивости добављача у OmniRoute-у. | Проследите `models: ["auto", ...]` да бисте приказали оне које сте омогућили.                                       |
| OpenCode 500 са `cannot read property 'models'`          | Старији OpenCode (< 0.1.x) није прихватао уграђени `models`.                              | Надоградите OpenCode на верзију која прати v1 шему (`opencode.ai/config.json`).                                     |

---

## Такође погледајте

- [Референца API-ја](../reference/API_REFERENCE.md) — комплетан OmniRoute REST интерфејс
- [Auto-Combo](../routing/AUTO-COMBO.md) — шта значи `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Извор: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
