# Fix Kiro/Amazon Q 400 Improperly Formed Request

## Type of Change

Bug fix.

## Problem

Newer versions of the Claude Code CLI send Anthropic-specific metadata fields such as `thinking` and `context_management`, along with Anthropic-formatted tool schemas using `input_schema`. When those requests are proxied through OmniRoute to the Kiro backend on Amazon Q / Bedrock, the upstream service rejects them with a `400 Improperly formed request` error because Kiro enforces a stricter request schema.

## Solution

Implemented request sanitization for the Kiro provider so unsupported Anthropic metadata fields are removed before the payload is sent upstream. The tools schema mapping was also corrected to match the Amazon Q / Kiro expectation by wrapping tool definitions as `toolSpecification -> inputSchema -> json`.

## Validation

- Focused unit tests for the Kiro translator and executor pass.
- Regression coverage was added for stripping Anthropic-only fields and for fallback sanitization in the executor.

## Notes

- The fix is intentionally scoped to the Kiro request path.
- An unrelated generated docs file may appear in the working tree from local build tooling, but it is not part of this change.
