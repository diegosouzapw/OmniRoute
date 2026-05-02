# Task 17 - Fix MCP Compression Configure and Status Contracts

> **Priority**: P1
> **Effort**: 60 min
> **Dependencies**: Task 10 recommended but not required
> **Branch**: `release/v3.7.9`

---

## Problem

The MCP compression management tools currently expose inconsistent contracts.

Issues:

- `strategy` is `string`, not a strict enum.
- Description mentions `none`, but runtime mode is `off`.
- Description omits `lite`.
- `aggressiveness` is described as `low/medium/high` but is written to `defaultMode`.
- Status counts only `standard` mode:
  - `compressedRequests = analyticsSummary.byMode?.standard?.count || 0`
  - `avgCompressionRatio = analyticsSummary.byMode?.standard?.avgSavingsPct || 0`

This makes MCP status/configure misleading when users run `lite`, `aggressive`, or `ultra`.

---

## Solution

1. Replace string schemas with:

```typescript
z.enum(["off", "lite", "standard", "aggressive", "ultra"])
```

2. Map legacy `none` to `off` if backward compatibility is needed.
3. Remove `aggressiveness`, or redefine it as a real nested setting for aggressive/ultra.
4. Report aggregate analytics:
   - `compressedRequests`: all compression rows or rows with `tokens_saved > 0`.
   - `avgCompressionRatio`: `analyticsSummary.avgSavingsPct`.
   - add `byMode` to the output.
5. Update README/tool schema descriptions.

---

## Files

- `open-sse/mcp-server/tools/compressionTools.ts`
- `open-sse/mcp-server/schemas/tools.ts`
- `open-sse/mcp-server/README.md`
- `tests/unit/compression/compressionMcpTools.test.ts`

---

## Tests

Add tests for:

- accepts all valid modes, including `lite` and `off`;
- maps `none` to `off` only if compatibility is kept;
- rejects invalid mode;
- status aggregates all modes;
- `byMode` is present and stable;
- `aggressiveness` no longer silently writes invalid `defaultMode`.

---

## Acceptance Criteria

- MCP configure cannot persist invalid compression modes.
- MCP status reflects all modes.
- Schema descriptions match runtime behavior.

---

## Rollback

Restore previous string fields and remove aggregate status fields. Avoid this unless a
client compatibility issue is confirmed.
