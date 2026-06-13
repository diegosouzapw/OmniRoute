# Tool Call Integrity Fix

## Problem

In OmniRoute v3.8.21, during streaming tool calls, function arguments could become corrupted on the client side due to duplication or re-insertion of fragments. For example, `find` would turn into `fifnd`, and `grep` into `grreep`. The symptom appeared only on machine JSON fields of tool calls (`function.arguments` / `partial_json`) and was independent of the provider, because the corruption occurred within the shared OmniRoute SSE/translation pipeline after the upstream response.

## Root Cause

Tool-call argument chunks were being processed as regular human-readable text across several shared layers:

- `src/lib/sseTextTransform.ts` recursively passed string fields like `arguments` and `partial_json` to the text processor.
- `src/lib/streamingPiiTransform.ts` buffered these fields through a rolling-window PII sanitizer. This is unacceptable for machine JSON deltas: a chunk could be a delta, a snapshot, or an overlap-fragment, and the sanitizer does not understand the semantics of tool-call JSON.
- `open-sse/transformer/responsesTransformer.ts`, `open-sse/translator/response/openai-to-claude.ts`, `open-sse/translator/response/openai-responses.ts`, and `open-sse/handlers/sseParser.ts` accumulated arguments using a simple `+=`. As a result, a repeated snapshot or overlapping delta was added a second time.

Regular chat was not broken because text `content` deltas tolerate sanitization and buffering. Tool calls were broken because `arguments` is a machine JSON contract that must pass byte-preserving to the client.

## Fix

Explicit protection for tool-call JSON was added to the core source:

1. `src/lib/sseTextTransform.ts` skips `toolArgs` and `partialJson` without applying the text processor.
2. `src/lib/streamingPiiTransform.ts` returns `toolArgs` and `partialJson` as-is, bypassing rolling-window buffering.
3. Shared stream assemblers now use `appendToolCallArgumentDelta()` instead of blindly using `+=`, ensuring that repeated snapshots and overlapping chunks are added exactly once.
4. Responses/OpenAI/Claude translation paths emit only the new suffix of tool arguments to the client, rather than repeating the snapshot.

## How to Prevent Regression

- `tool_calls.function.name`, `tool_calls.function.arguments`, Responses `function_call.arguments`, and Claude `input_json_delta.partial_json` must never pass through text/PII/compression/dedup transforms.
- Any transform for SSE must distinguish between human text (`content`, `reasoning`) and machine JSON (`arguments`, `partial_json`).
- Regression tests are located in:
  - `tests/unit/sseTextTransform.test.ts`
  - `tests/unit/streamingPiiTransform.test.ts`
  - `tests/unit/sse-parser.test.ts`
  - `tests/unit/responses-transformer.test.ts`
  - `tests/unit/translator-resp-openai-responses.test.ts`
- E2E smoke script: `tests/e2e-tool-calls.sh`.

## Configuration

For coding sessions, you can optionally disable risky text transforms:

```env
PII_RESPONSE_SANITIZATION=false
COMPRESSION_LEVEL=off
RTK_ENABLED=false
CAVEMAN_ENABLED=false
```

The core fix does not depend on these env variables: machine tool-call JSON is protected in the core pipeline and should not be modified even if PII response sanitization is enabled.
