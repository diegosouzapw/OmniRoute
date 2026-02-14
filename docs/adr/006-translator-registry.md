# ADR-006: Translator Registry Pattern

**Date:** 2025-12-01  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

OmniRoute translates requests between different LLM API formats (OpenAI ↔ Anthropic ↔ Google ↔ etc.). Each provider has a unique request/response schema. The translator must:

- Convert incoming requests to the target provider's format
- Convert streaming responses back to the client's expected format
- Handle provider-specific features (tool calls, vision, system prompts)

## Decision

Use a **registry pattern** for translators:

1. Each provider pair has a translator module in `src/sse/translators/`
2. Translators are registered by `(sourceFormat, targetFormat)` key
3. The `translateRequest()` function auto-detects source format and applies the appropriate translator
4. Translators handle both request translation and response stream mapping

Key translators:

- `openai → anthropic` (and reverse)
- `openai → google` (and reverse)
- `anthropic → google` (and reverse)
- Identity translators for same-format routing

## Consequences

### Positive

- Adding a new provider requires only a new translator module
- Each translator is independently testable
- Auto-detection reduces configuration burden on users
- Supports chained translation (A → B → C) if needed

### Negative

- O(n²) translator combinations as providers grow (mitigated by identity translators)
- Some edge cases in format conversion (e.g., tool call schemas differ significantly)

### Neutral

- The Translator Playground UI provides visual testing of translation chains
- Performance overhead is minimal (JSON transformation, no network calls)
