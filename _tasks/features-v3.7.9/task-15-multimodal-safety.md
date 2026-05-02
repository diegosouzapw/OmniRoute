# Task 15 - Make Aggressive and Ultra Multimodal-Safe

> **Priority**: P0
> **Effort**: 90 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

`standard` mode intentionally skips multi-part `content` arrays. `aggressive` and
`ultra` do not provide the same safety.

Current risks:

- `aggressive.ts::setContent()` replaces array content with `[{ type: "text", text: ... }]`,
  which can drop `image_url` parts.
- `ultra.ts` concatenates all text parts and writes the same compressed text back into each
  text part, which can duplicate or reorder content.

This can corrupt multimodal requests before they reach the upstream provider.

---

## Solution

Introduce a shared helper for message content transformations:

```typescript
mapTextContentParts(message, transformText): message
```

Rules:

1. String content may be transformed as today.
2. Array content must preserve every non-text part byte-for-byte.
3. Each `{ type: "text", text }` part must be transformed independently.
4. Empty text parts remain empty.
5. Tool/function messages that are strings can still use tool-result compression.
6. If a compressor cannot safely preserve array shape, it must skip that message.

---

## Files

- `open-sse/services/compression/aggressive.ts`
- `open-sse/services/compression/ultra.ts`
- Optional new helper: `open-sse/services/compression/messageContent.ts`
- `tests/unit/compression/compression-aggressive.test.ts`
- `tests/unit/compression/ultra.test.ts`
- New: `tests/unit/compression/multimodal-safety.test.ts`

---

## Tests

Add tests proving:

- `aggressive` preserves `image_url` parts.
- `aggressive` compresses only text parts in array content.
- `ultra` preserves `image_url` parts.
- `ultra` does not duplicate concatenated text into every text part.
- Function/tool string messages still compress.
- Non-text unknown parts are preserved.

Suggested command:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test \
  tests/unit/compression/multimodal-safety.test.ts \
  tests/unit/compression/compression-aggressive.test.ts \
  tests/unit/compression/ultra.test.ts
```

---

## Acceptance Criteria

- No compression mode removes or rewrites non-text multimodal parts.
- Text parts are compressed independently or skipped.
- Full compression unit gate remains green.

---

## Rollback

Revert helper and tests. Keep compression disabled for `aggressive`/`ultra` on array
content if a safe implementation cannot be completed.
