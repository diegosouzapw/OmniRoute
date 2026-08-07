# Routing Analysis: Priority vs Capability Routing

## Current Flow Issues

1. **Blind Priority Selection**: Routing relies heavily on static priority scores, bypassing strict capability validation (e.g. tool calling, vision support).
2. **Retry Loop Trigger**: Incompatible model selection returns API errors, which are caught and retried through the same flawed selector, causing infinite loops and memory growth.
3. **Context Cache**: Misapplied pinning and reuse rules force invalid model bindings.

## Corrected Flow

1. Capability Analysis
2. Candidate Filtering
3. Routing Strategy (`auto` instead of blind `priority`)
4. Health Check
5. Execution with safe fallback
