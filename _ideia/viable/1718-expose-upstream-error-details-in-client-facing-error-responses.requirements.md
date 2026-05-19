# Requirements: expose upstream error details in client-facing error responses

> Feature Idea: [#1718](./1718-expose-upstream-error-details-in-client-facing-error-responses.md)
> Research Date: 2026-05-01
> Verdict: ✅ VIABLE

## 🔍 Research Summary

Expose the upstream error body (e.g. context_length_exceeded) directly in the error response under an `upstream_details` key, without breaking OpenAI compatibility.

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | OmniRoute Source | -     | 2026-05-01   | Internal | High         |

## 📐 Proposed Solution Architecture

### Approach

Modify the central error generation functions (like `buildErrorBody`) to optionally accept an `upstreamDetails` object. Update the request executors to pass the JSON parsed error from the upstream response into this new parameter when a request fails.

### Modified Files

| File | Changes |
|---|---|
| `open-sse/utils/errors.ts` | Update `buildErrorBody` to include `upstream_details`. |
| `open-sse/executors/base.ts` | Extract response body on failure and pass to error builder. |

## ⚙️ Implementation Effort

- **Estimated complexity**: Low. A few files changed. No breaking changes.
- **Breaking changes**: No
