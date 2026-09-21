# Delegated Context Editing (Anthropic) (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Делегирано **уређивање контекста** је функција управљања контекстом доступна само за Claude. За разлику од OmniRoute-ових локалних
механизама за компресију (Caveman, RTK, LLMLingua, сложени токови) — који преписују тело захтева
_пре_ него што напусти прокси — уређивање контекста тражи од **провајдера** да уклони застареле
блокове употребе алата / резултата алата из сопственог активног контекстног прозора. OmniRoute само додаје параметар
тела (`context_management.edits[]`); Claude обавља стварно уклањање у складу са сопственим токенизатором.

Ово је по својој природи делегирана могућност: други провајдери одбацују овај параметар, па га OmniRoute
строго ограничава на Claude и релеје компатибилне са Claude Code-ом.

Извор истине: `open-sse/config/contextEditing.ts` (идентификатори стратегија, уметање у тело, издвајање
телеметрије), `open-sse/executors/base.ts` (услов за уметање + резервни поступак за 400) и
`open-sse/services/compression/types.ts` (структура конфигурације + подразумевана вредност).

## Шта `clear_tool_uses` ради

OmniRoute умеће једну измену у одлазно тело Anthropic Messages захтева:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — датирани идентификатор Anthropic стратегије (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — када улазни токени захтева премаше овај праг, Claude почиње да
  уклања старе парове употребе алата/резултата (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic-ова подразумевана вредност).
- `keep.value: 3` — N најновијих парова употребе алата/резултата остаје непромењено
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Бета функција се оглашава путем заглавља `anthropic-beta: context-management-2025-06-27`, које
OmniRoute већ шаље у Claude захтевима.

Уметање обавља `applyContextEditingToBody()` и оно је **идемпотентно**: ако измена `clear_tool_uses`
већ постоји у телу (додата претходним позивом или прослеђена од стране клијента), тело остаје
непромењено. Ако је присутна и измена `clear_thinking_20251015`, OmniRoute стабилно сортира
измену `clear_thinking` на почетак, јер Anthropic захтева да `clear_thinking` претходи
`clear_tool_uses` у низу `edits[]`.

## Прекидач за омогућавање по комбинацији

Уређивање контекста је **подразумевано искључено** и мора се изричито омогућити. Прекидач је једна логичка вредност која се налази у
конфигурацији компресије:

- Кључ подешавања: `contextEditing.enabled` (camelCase — **не** `context_editing` / `context-editing`).
- Тип: `ContextEditingConfig { enabled: boolean }` у
  `open-sse/services/compression/types.ts`.
- Подразумевана вредност: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod шема: `contextEditingConfigSchema` у `src/shared/validation/compressionConfigSchemas.ts`.
- Складиштење: чува се заједно са осталим подешавањима компресије (нормализовано у
  `src/lib/db/compression.ts`).

На контролној табли прекидач се налази у центру за компресију
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) и уписује
`{ contextEditing: { enabled: … } }` назад преко `saveSettings()`. Пошто се преноси у оквиру
објекта подешавања компресије, комбинује се са профилом компресије за сваку комбинацију, уместо да буде
потпуно независна целина — конфигурација садржи само ознаку за укључивање/искључивање; сви прагови (`trigger`,
`keep`) су константе документоване изнад.

## Ограничавање само на Claude

Убризгавање се дешава само за прави Claude или релеје компатибилне са Claude Code-ом. Услов у
`open-sse/executors/base.ts` је:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — прави Anthropic кључ/OAuth.
- `isClaudeCodeCompatible(this.provider)` — релеји чији идентификатор добављача почиње префиксом
  `anthropic-compatible-cc-` (оглашавају компатибилност са Claude Code-ом, па су то релеји за које је
  највероватније да ће прихватити бета функцију). Погледајте `open-sse/services/provider.ts`.

Намерно су **искључени**:

- `claude-web` — прегледачки релеј са обликом захтева `create_conversation_params` који никада не види
  `context_management`.
- Генерички `anthropic-compatible-*` релеји (без префикса `-cc-`) — крајње тачке трећих страна са
  неизвесном подршком за бета функцију.

Добављачи који нису Claude никада не добијају параметар `context_management`, чак ни када је прекидач укључен.

## Резервни механизам за 400 / покривеност релеја

Релеј компатибилан са Claude-ом може оглашавати бета функцију, али ипак одбити параметар
`context_management` HTTP статусом 400. Да би се функционалност постепено умањила уместо да захтев
не успе, извршилац уклања параметар и поново покушава са истим URL-ом **једном**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Понашање:

1. Активира се само при статусу `400`, док је уређивање контекста омогућено и тело заиста садржи
   `context_management`.
2. Тело одговора са статусом 400 чита се преко `clone()` како би оригинални одговор остао нетакнут за
   путању која се не подудара.
3. Текст грешке мора да се подудара са `/context[_-]management|context editing/i` — неповезана грешка
   400 (нпр. `max_tokens must be >= 1`) **не** активира резервни механизам; оригинална грешка се прослеђује.
4. При подударању поставља `contextEditingDisabled = true` (што спречава поновно убризгавање ако се
   касније направи нови `transformedBody` за поновни покушај/резервни URL), брише `context_management`,
   поново потписује тело за Claude / релеје компатибилне са Claude Code-ом (`signRequestBody`) и
   једном поново покушава са истим URL-ом.

Прави Claude садржи бета функцију у `ANTHROPIC_BETA_BASE` и не улази у ову путању резервног механизма.

## Телеметрија `applied_edits`

Након Claude одговора, OmniRoute бележи колико је контекста добављач заиста очистио. Ово се
**не** стримује — издваја се из тела одговора који се не стримује, по принципу најбољег покушаја, и
никада не утиче на одговор (грешке телеметрије се игноришу).

- Издвајање: `extractContextEditingTelemetry(responseBody)` у `open-sse/config/contextEditing.ts`.
  Проверава `applied_edits` на три локације (ради заштите од различитих облика одговора):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Поља која се читају из сваког уноса: `cleared_input_tokens` и `cleared_tool_uses`
  (snake_case, изворни Anthropic формат), са резервним camelCase варијантама `clearedInputTokens` /
  `clearedToolUses`.
- Враћа `null` када низ `applied_edits` није пронађен или ништа заправо није очишћено.

Структура записа је `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Бележи се у `open-sse/handlers/chatCore.ts` (ограничено условом `provider === "claude"`) преко
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), који уписује ред аналитике
компресије означен са:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = број очишћених улазних токена
- `request_id` са суфиксом `::context-editing`

Тако се делегирано чишћење појављује у аналитици компресије заједно са локалним механизмима, под
ознаком механизма `context-editing`, и може се разликовати од уштеда које остварују RTK/Caveman/LLMLingua.

## Однос према локалним механизмима за компресију

| Аспект              | Локални механизми (Caveman / RTK / LLMLingua / stacked) | Делегирано уређивање контекста                                    |
| ------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| Где се извршава     | У OmniRoute-у, пре него што захтев напусти прокси       | Код добављача (Claude), на страни сервера                         |
| Шта уређује         | Текст упита / контекста / резултата алата               | Старе блокове употребе алата / резултата алата                    |
| Опсег добављача     | Сви добављачи                                           | Само `claude` + `anthropic-compatible-cc-*`                       |
| Прекидач            | Подешавања режима компресије                            | `contextEditing.enabled`                                          |
| Понашање при грешци | Наставак без компресије (изворни текст)                 | Резервни поступак за 400: уклони параметар, па покушај још једном |
| Телеметрија уштеде  | `engine: <engine id>`                                   | `engine: "context-editing"`                                       |

Ова два приступа се допуњују: локални механизми компримују бајтове које OmniRoute шаље; уређивање контекста омогућава систему Claude да уклања непотребан садржај из текућег контекста током више интеракција. Могу бити омогућени истовремено.

## Погледајте и

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — регистар механизама и локални механизми за
  компресију
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — компресија излаза команди/алата
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — компресија MCP описа и
  смањење броја алата
- Извор: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
