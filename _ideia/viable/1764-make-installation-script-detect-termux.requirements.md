# Requirements: Make installation script detect termux

> Feature Idea: [#1764](./1764-make-installation-script-detect-termux.md)
> Research Date: 2026-05-01
> Verdict: ✅ VIABLE

## 🔍 Research Summary

Detect termux environments during installation or runtime and gracefully handle the `wreq-js` native module failure, allowing the rest of OmniRoute to function.

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | OmniRoute Source | -     | 2026-05-01   | Internal | High         |

## 📐 Proposed Solution Architecture

### Approach

Modify `scripts/postinstall.mjs` or the wreq-js loader logic. If `process.env.PREFIX && process.env.PREFIX.includes('termux')` is true, avoid hard crashing on wreq-js load failures.

### Modified Files

| File | Changes |
|---|---|
| `scripts/postinstall.mjs` | Add termux detection and warning. |
| `open-sse/utils/env.ts` (or similar) | Graceful downgrade. |

## ⚙️ Implementation Effort

- **Estimated complexity**: Low. Very localized fix.
- **Breaking changes**: No
