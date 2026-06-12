# Tool Call Integrity Fix

## Проблема

В OmniRoute v3.8.21 при streaming tool calls аргументы функций могли
искажаться в клиенте дублированием или повторной вставкой фрагментов, например
`find` превращался в `fifnd`, а `grep` — в `grreep`. Симптом проявлялся только
на machine JSON полях tool calls (`function.arguments` / `partial_json`) и был
независим от провайдера, потому что повреждение происходило в общем
OmniRoute SSE/translation pipeline после upstream-ответа.

## Корневая причина

Tool-call argument chunks обрабатывались как обычный человекочитаемый текст в
нескольких общих слоях:

- `src/lib/sseTextTransform.ts` рекурсивно передавал строковые поля
  `arguments` и `partial_json` в текстовый processor.
- `src/lib/streamingPiiTransform.ts` буферизовал эти поля через rolling-window
  PII sanitizer. Для machine JSON deltas это недопустимо: chunk может быть
  дельтой, snapshot или overlap-fragment, а sanitizer не знает семантику
  tool-call JSON.
- `open-sse/transformer/responsesTransformer.ts`,
  `open-sse/translator/response/openai-to-claude.ts`,
  `open-sse/translator/response/openai-responses.ts` и
  `open-sse/handlers/sseParser.ts` накапливали аргументы простым `+=`, поэтому
  повторный snapshot или overlapping delta добавлялся второй раз.

Обычный чат не ломался, потому что текстовые `content` deltas допускают
санитизацию и буферизацию. Tool calls ломались, потому что `arguments` — это
машинный JSON-контракт, который должен проходить byte-preserving до клиента.

## Исправление

В core source добавлена явная защита tool-call JSON:

1. `src/lib/sseTextTransform.ts` пропускает `toolArgs` и `partialJson` без
   текстового processor.
2. `src/lib/streamingPiiTransform.ts` возвращает `toolArgs` и `partialJson`
   как есть, без rolling-window buffering.
3. Общие stream assemblers используют `appendToolCallArgumentDelta()` вместо
   слепого `+=`, чтобы повторные snapshots и overlapping chunks добавлялись
   ровно один раз.
4. Responses/OpenAI/Claude translation paths эмитят клиенту только новый suffix
   tool arguments, а не повторный snapshot.

## Как предотвратить регрессию

- `tool_calls.function.name`, `tool_calls.function.arguments`, Responses
  `function_call.arguments` и Claude `input_json_delta.partial_json` никогда не
  должны проходить через text/PII/compression/dedup transforms.
- Любой transform для SSE должен различать human text (`content`, `reasoning`)
  и machine JSON (`arguments`, `partial_json`).
- Regression tests находятся в:
  - `tests/unit/sseTextTransform.test.ts`
  - `tests/unit/streamingPiiTransform.test.ts`
  - `tests/unit/sse-parser.test.ts`
  - `tests/unit/responses-transformer.test.ts`
  - `tests/unit/translator-resp-openai-responses.test.ts`
- E2E smoke script: `tests/e2e-tool-calls.sh`.

## Конфигурация

Для coding-сессий можно дополнительно отключить risky text transforms:

```env
PII_RESPONSE_SANITIZATION=false
COMPRESSION_LEVEL=off
RTK_ENABLED=false
CAVEMAN_ENABLED=false
```

Основной фикс не зависит от этих env-переменных: machine tool-call JSON
защищён в core pipeline и не должен изменяться даже при включённой PII
response sanitization.
