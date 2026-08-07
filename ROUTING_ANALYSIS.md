# Routing Analysis: OmniRoute & vivanta-ollama

## Overview

Analysis of routing strategies, priority selection, capability filtering, and fallback behavior when integrating with Ollama models.

## Identified Vulnerabilities

1. **Priority-Only Selection**: Selecting models solely based on static priority values without verifying capabilities (e.g. tools support, vision, context window) leads to runtime failures.
2. **Retry Loop on Incompatible Model**: When a request requiring tools/vision hits a priority-selected model lacking those capabilities, the provider returns an error, which triggers an unvalidated retry/fallback loop.
3. **Context Cache Invalidation**: Aggressive context caching can pin incompatible models across requests, repeating failures.

## Recommendations

- Enforce capability validation (`validatePinnedModelForRequest`) prior to execution.
- Default untyped/untested routing strategies to `auto` or fallback gracefully when priority model fails capability checks.
