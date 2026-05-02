# Task 14 - Add Caveman Output Mode Via System Instruction

> **Priority**: P0
> **Effort**: 120 min
> **Dependencies**: Tasks 01, 02, 03, 07, 11
> **Branch**: `release/v3.7.9`

---

## Problem

The original Caveman project's primary token saving comes from model **output** behavior:
it instructs the agent/model to answer tersely. OmniRoute currently compresses mostly
the **input/context** before the upstream request. That does not guarantee the provider's
new response will avoid verbose openings like "Sure, I'd be happy to help".

Without this task, OmniRoute is an input compressor inspired by Caveman, not full
Caveman parity.

---

## Solution

Add an opt-in output mode that injects a concise system instruction before dispatch.
Do not post-process generated output. The upstream model should produce terse text
itself.

Suggested setting:

```typescript
export type CavemanOutputMode = "off" | "lite" | "full" | "ultra";

export interface CavemanConfig {
  // existing fields...
  outputMode?: CavemanOutputMode;
  outputAutoClarity?: boolean;
}
```

Default must be `off` for compatibility.

---

## Files

- `open-sse/services/compression/types.ts`
- New: `open-sse/services/compression/outputMode.ts`
- `open-sse/services/compression/index.ts`
- `open-sse/handlers/chatCore.ts`
- `src/lib/db/compression.ts`
- `src/app/api/settings/compression/route.ts`
- `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`
- Tests under `tests/unit/compression/`

---

## Implementation Notes

Create `applyCavemanOutputInstruction(body, config, context)` that:

1. Returns original body when `outputMode` is `off`.
2. Detects chat-like message arrays only.
3. Adds a system instruction if no system message exists, or prepends a short instruction
   to the first system message if safe.
4. Marks injected instruction so repeated calls are idempotent.
5. Honors provider/source format constraints.
6. Runs before request translation, after skills/context injection.

Instruction examples:

```text
Caveman output mode: answer terse, preserve technical accuracy. Drop articles,
filler, pleasantries, hedging. Keep code, API names, errors exact.
```

For `ultra`:

```text
Caveman output ultra: terse fragments. Use common prose abbreviations only
outside code/symbols. Preserve code, function names, API names, errors exact.
```

---

## Auto-Clarity Bypass

When `outputAutoClarity` is true, skip output-mode injection for:

- security warnings;
- irreversible/destructive action confirmations;
- user asks for clarification or repeats question;
- multi-step instructions where omitted conjunctions could change order;
- prompts containing high-risk words like `delete`, `drop table`, `wipe`, `rotate key`,
  `revoke`, `production`, `migration`, `backup first`.

This bypass must be conservative. If unsure, skip Caveman output mode.

---

## Tests

Add tests for:

- `off` leaves body unchanged.
- `lite/full/ultra` inject expected instruction.
- Existing system prompt is preserved and instruction is idempotent.
- Auto-clarity skips destructive prompts.
- Output mode does not modify user content.
- Works with Responses API-compatible `input` shape if supported; otherwise explicitly no-op.

Suggested command:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/unit/compression/caveman-output-mode.test.ts
```

---

## Acceptance Criteria

- Output Caveman mode is opt-in and disabled by default.
- No response post-processing is introduced.
- Injection is idempotent.
- Auto-clarity bypass is covered by tests.
- Settings API and dashboard can configure output mode.
- Existing compression tests still pass.

---

## Rollback

Remove `outputMode.ts`, remove type/settings fields, remove chatCore integration, and
remove tests/UI controls.
