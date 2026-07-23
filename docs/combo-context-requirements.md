# Combo Context Requirements Feature

## Overview

The Context Requirements feature allows combo configurations to filter and sort targets based on their context window size. This is useful for use cases requiring large context windows like:

- Long document processing (100k+ tokens)
- Large codebase analysis
- Extensive conversation histories
- Multi-file code reviews

## Configuration

### Schema

Add `contextRequirements` to your combo's runtime config:

```json
{
  "contextRequirements": {
    "minContextWindow": 128000,
    "preferLargeContext": true,
    "contextFilterMode": "strict"
  }
}
```

### Fields

#### `minContextWindow` (optional)

- **Type**: `number` (0 to 10,000,000)
- **Default**: `undefined` (no filtering)
- **Description**: Filters out models with context windows below this threshold

**Examples**:

- `32000` - Filter out models with <32K context
- `128000` - Require 128K+ context (GPT-4 Turbo, Claude 3)
- `200000` - Require 200K+ context (Claude 3 Opus)
- `1000000` - Require 1M+ context (Gemini 1.5 Pro)

#### `preferLargeContext` (optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, sorts remaining targets by context size (descending). Large context models are tried first.

#### `contextFilterMode` (optional)

- **Type**: `"strict"` | `"lenient"`
- **Default**: `"lenient"`
- **Description**: How to handle models with unknown context window limits
  - `"strict"`: Excludes models with unknown context limits
  - `"lenient"`: Includes models with unknown context limits

## Behavior

### Filtering Pipeline

Context requirements are applied after `filterTargetsByRequestCompatibility()`:

1. **Request compatibility filtering** - Removes models incompatible with request (tools, vision, structured output)
2. **Context requirements filtering** - Applies `minContextWindow` and `contextFilterMode`
3. **Context-based sorting** - If `preferLargeContext` is true, sorts by context size descending

### Filter Mode Logic

When `minContextWindow` is set:

**Lenient mode** (default):

- ✅ Includes models with context >= minContextWindow
- ✅ Includes models with unknown context limits
- ❌ Excludes models with context < minContextWindow

**Strict mode**:

- ✅ Includes models with context >= minContextWindow
- ❌ Excludes models with unknown context limits
- ❌ Excludes models with context < minContextWindow

### Sorting Logic

When `preferLargeContext` is true:

- Models are sorted by context window size (descending)
- Unknown context models sort to the end
- Original strategy order is used as a tiebreaker

## Use Cases

### Example 1: Long Document Processing

```json
{
  "name": "Document Analysis",
  "strategy": "fusion",
  "config": {
    "contextRequirements": {
      "minContextWindow": 128000,
      "preferLargeContext": true,
      "contextFilterMode": "strict"
    }
  }
}
```

This configuration:

- Requires 128K+ context window
- Prefers larger context models (Gemini 1.5 Pro > Claude 3 Opus > GPT-4 Turbo)
- Excludes models with unknown context limits

### Example 2: Large Codebase Analysis

```json
{
  "name": "Code Review",
  "strategy": "auto",
  "config": {
    "contextRequirements": {
      "minContextWindow": 200000,
      "preferLargeContext": true,
      "contextFilterMode": "lenient"
    }
  }
}
```

This configuration:

- Requires 200K+ context window
- Prefers larger context models
- Includes models with unknown limits (lenient)

### Example 3: Prefer Large Context Without Strict Requirements

```json
{
  "name": "Flexible Chat",
  "strategy": "weighted",
  "config": {
    "contextRequirements": {
      "preferLargeContext": true
    }
  }
}
```

This configuration:

- No minimum requirement (all models eligible)
- Sorts by context size (largest first)
- Useful when large context is preferred but not required

## API Response

When context requirements filter targets, the combo logger outputs:

```
[COMBO] Context requirements: filtered 10 → 3 targets (minContextWindow: 128000, mode: strict)
[COMBO] Context requirements: kept models gemini-1.5-pro, claude-3-opus-20240229, gpt-4-turbo
[COMBO] Context requirements: sorted by context size (descending): gemini-1.5-pro(1000000), claude-3-opus-20240229(200000), gpt-4-turbo(128000)
```

## Implementation Details

### Backend Module

`open-sse/services/combo/contextRequirements.ts`:

- `applyContextRequirements()` - Main filtering function
- `getTargetContextWindow()` - Context lookup helper
- Uses `getModelContextLimit()` from `modelCapabilities.ts`

### Integration Point

`open-sse/services/combo.ts` line 1187:

```typescript
orderedTargets = filterTargetsByRequestCompatibility(orderedTargets, body, log);
orderedTargets = applyContextRequirements(orderedTargets, config.contextRequirements, log);
```

### Schema Definition

`src/shared/validation/schemas/combo.ts`:

```typescript
contextRequirements: z
  .object({
    minContextWindow: z.coerce.number().int().min(0).max(10_000_000).optional(),
    preferLargeContext: z.boolean().optional(),
    contextFilterMode: z.enum(["strict", "lenient"]).optional(),
  })
  .strict()
  .optional(),
```

## Testing

### Run Tests

```bash
# Unit tests (schema + logic)
npm test tests/unit/combo-context-requirements.test.ts

# Integration tests (end-to-end)
npm test tests/unit/combo/context-requirements-integration.test.ts
```

### Test Coverage

- Schema validation: 6 tests
- Filtering logic: 6 tests
- Integration: 5 tests
- **Total**: 17/17 passing ✅

## Troubleshooting

### All targets filtered out

**Problem**: All targets removed, combo returns "no compatible models"

**Solutions**:

1. Lower `minContextWindow` threshold
2. Switch to `"lenient"` mode to include unknown context models
3. Remove `minContextWindow` and use only `preferLargeContext`

### Unknown context models excluded

**Problem**: Custom/new models excluded even though they have large context

**Solutions**:

1. Switch to `"lenient"` mode (default)
2. Add model context limit to `modelCapabilities.ts`
3. Remove context filtering and rely on strategy order

### Sorting not applied

**Problem**: `preferLargeContext` doesn't change order

**Check**:

1. Verify `preferLargeContext: true` in config
2. Check if all targets have unknown context (all sort equal)
3. Verify multiple targets remain after filtering

## Related

- [Auto-Combo Routing Strategies](./routing/AUTO-COMBO.md)
- [Resilience Guide](./architecture/RESILIENCE_GUIDE.md)

## Version History

- **v3.8.47**: Initial implementation
  - Added `contextRequirements` config
  - Created backend filtering module
  - Full test coverage (no dedicated dashboard UI yet — configure via combo JSON)
