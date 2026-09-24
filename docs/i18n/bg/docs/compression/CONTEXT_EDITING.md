# Delegated Context Editing (Anthropic) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

Делегираното **редактиране на контекста** е функция за управление на контекста, налична само за Claude. За разлика от локалните механизми за компресиране на OmniRoute (Caveman, RTK, LLMLingua, комбинирани конвейери) — които пренаписват тялото на заявката, _преди_ тя да напусне проксито — редактирането на контекста изисква от **доставчика** да изчисти остарелите блокове за използване на инструменти/резултати от инструменти от собствения си текущ контекстен прозорец. OmniRoute само добавя параметър към тялото (`context_management.edits[]`); Claude извършва самото изчистване според собствения си токенизатор.

По своята същност това е делегирана възможност: другите доставчици отхвърлят параметъра, затова OmniRoute ограничава използването му стриктно до Claude и съвместими с Claude Code междинни услуги.

Източник на истина: `open-sse/config/contextEditing.ts` (идентификатори на стратегии, добавяне към тялото, извличане на телеметрични данни), `open-sse/executors/base.ts` (условие за добавяне + резервно поведение при грешка 400) и `open-sse/services/compression/types.ts` (структура на конфигурацията + стойност по подразбиране).

## Какво прави `clear_tool_uses`

OmniRoute добавя една редакция към изходящото тяло на Anthropic Messages:

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

- `type: "clear_tool_uses_20250919"` — датираният идентификатор на стратегията на Anthropic (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — когато входните токени на заявката надхвърлят този праг, Claude започва да изчиства старите двойки използване на инструмент/резултат (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, стойността по подразбиране на Anthropic).
- `keep.value: 3` — последните N двойки използване на инструмент/резултат се запазват непроменени (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

Бета-функцията се обявява чрез заглавката `anthropic-beta: context-management-2025-06-27`, която OmniRoute вече изпраща при заявки към Claude.

Добавянето се извършва от `applyContextEditingToBody()` и е **идемпотентно**: ако в тялото вече съществува редакция `clear_tool_uses` (добавена от предишно извикване или подадена от клиента), тялото се оставя непроменено. Ако присъства и редакция `clear_thinking_20251015`, OmniRoute извършва стабилно сортиране, за да премести редакцията `clear_thinking` в началото, тъй като Anthropic изисква `clear_thinking` да предхожда `clear_tool_uses` в масива `edits[]`.

## Превключвателят за активиране за всяка комбинация

Редактирането на контекста е **изключено по подразбиране** и се активира изрично. Превключвателят е единична булева стойност, съдържаща се в конфигурацията за компресиране:

- Ключ на настройката: `contextEditing.enabled` (camelCase — **не** `context_editing` / `context-editing`).
- Тип: `ContextEditingConfig { enabled: boolean }` в
  `open-sse/services/compression/types.ts`.
- Стойност по подразбиране: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod схема: `contextEditingConfigSchema` в `src/shared/validation/compressionConfigSchemas.ts`.
- Съхранение: запазва се заедно с останалите настройки за компресиране (нормализира се в
  `src/lib/db/compression.ts`).

В таблото за управление превключвателят се намира в центъра за компресиране
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) и записва
`{ contextEditing: { enabled: … } }` чрез `saveSettings()`. Тъй като е част от обекта с настройки за компресиране, той се комбинира с профила за компресиране за съответната комбинация, вместо да представлява напълно независима настройка — конфигурацията съдържа само флага за включване/изключване; всички прагове (`trigger`, `keep`) са константите, документирани по-горе.

## Ограничаване само до Claude

Инжектирането се извършва само за истински Claude или съвместими с Claude Code релейни услуги. Проверката в
`open-sse/executors/base.ts` е:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — истински ключ/OAuth за Anthropic.
- `isClaudeCodeCompatible(this.provider)` — релейни услуги, чийто идентификатор на доставчика започва с префикса
  `anthropic-compatible-cc-` (те декларират съвместимост с Claude Code, затова е най-вероятно да приемат бета функционалността). Вижте `open-sse/services/provider.ts`.

Умишлено **изключени**:

- `claude-web` — браузърна релейна услуга с формат на заявката `create_conversation_params`, който никога не получава
  `context_management`.
- Общи релейни услуги `anthropic-compatible-*` (без префикса `-cc-`) — крайни точки на трети страни с
  несигурна поддръжка на бета функционалността.

Доставчиците, различни от Claude, никога не получават параметъра `context_management`, дори когато превключвателят е включен.

## Резервното поведение при 400 / покритие на релейните услуги

Съвместима с Claude релейна услуга може да декларира поддръжка на бета функционалността, но въпреки това да отхвърли параметъра `context_management`
с HTTP 400. За да се премине към ограничен режим без неуспех на заявката, изпълнителят премахва
параметъра и опитва повторно същия URL адрес **веднъж**:

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

Поведение:

1. Задейства се само при `400`, когато редактирането на контекста е активирано и тялото действително съдържа
   `context_management`.
2. Тялото на отговора 400 се прочита чрез `clone()`, така че оригиналният отговор да остане непокътнат за пътя
   без съвпадение.
3. Текстът на грешката трябва да съвпада с `/context[_-]management|context editing/i` — несвързана грешка 400 (напр.
   `max_tokens must be >= 1`) **не** задейства резервното поведение; оригиналната грешка се предава нататък.
4. При съвпадение се задава `contextEditingDisabled = true` (което предотвратява повторното инжектиране, ако по-късно бъде създадено ново
   `transformedBody` за повторен опит/резервен URL адрес), изтрива се `context_management`,
   тялото се подписва отново за Claude / съвместими с Claude Code релейни услуги (`signRequestBody`) и заявката към
   същия URL адрес се повтаря веднъж.

Истинският Claude включва бета функционалността в `ANTHROPIC_BETA_BASE` и не преминава по този резервен път.

## Телеметрия за `applied_edits`

След отговор от Claude OmniRoute записва каква част от контекста доставчикът действително е изчистил. Тази информация
**не** се предава поточно — тя се извлича при възможност от тялото на непоточния отговор и никога
не влияе на отговора (грешките в телеметрията се игнорират).

- Извличане: `extractContextEditingTelemetry(responseBody)` в `open-sse/config/contextEditing.ts`.
  Функцията проверява за `applied_edits` на три места (предпазна мярка за различни формати на отговора):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Полета за всяка редакция, прочитани от всеки запис: `cleared_input_tokens` и `cleared_tool_uses`
  (snake_case, естественият формат на Anthropic), с резервни варианти `clearedInputTokens` / `clearedToolUses` в camelCase.
- Връща `null`, когато не бъде намерен масив `applied_edits` или в действителност не е изчистено нищо.

Форматът на записа е `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Записването се извършва в `open-sse/handlers/chatCore.ts` (ограничено до `provider === "claude"`) чрез
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), което записва ред с анализи за компресията, маркиран с:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = броят на изчистените входни токени
- `request_id` с добавен суфикс `::context-editing`

Така делегираното изчистване се показва в анализите за компресията заедно с локалните механизми, под етикета на механизма
`context-editing`, и може да бъде разграничено от спестяванията чрез RTK/Caveman/LLMLingua.

## Връзка с локалните механизми за компресиране

| Аспект                      | Локални механизми (Caveman / RTK / LLMLingua / stacked) | Делегирано редактиране на контекста                                  |
| --------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| Къде се изпълнява           | В OmniRoute, преди заявката да напусне проксито         | В доставчика (Claude), от страната на сървъра                        |
| Какво редактира             | Текст на промпта / контекста / резултата от инструмент  | Стари блокове за използване на инструменти / резултати               |
| Обхват на доставчиците      | Всички доставчици                                       | Само `claude` + `anthropic-compatible-cc-*`                          |
| Превключвател               | Настройки за режима на компресиране                     | `contextEditing.enabled`                                             |
| Поведение при грешка        | Продължава без компресиране (оригиналният текст)        | Резервен вариант при 400: премахва параметъра и опитва отново веднъж |
| Телеметрия за спестяванията | `engine: <engine id>`                                   | `engine: "context-editing"`                                          |

Двата подхода се допълват взаимно: локалните механизми компресират байтовете, които OmniRoute изпраща; редактирането на контекста позволява на
Claude да съкращава текущия контекст между отделните ходове. Те могат да бъдат активирани едновременно.

## Вижте също

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — регистър на механизмите и локалните механизми за компресиране
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — компресиране на команди/изходни данни от инструменти
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — компресиране на MCP описания и
  намаляване на броя инструменти
- Изходен код: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
