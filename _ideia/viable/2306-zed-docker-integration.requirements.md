# Requirements: Support Zed IDE Integration When OmniRoute Runs in Docker

> Feature Idea: [#2306](./2306-zed-docker-integration.md)
> Research Date: 2026-05-19
> Verdict: ✅ VIABLE

## 🔍 Research Summary

Docker isolates processes, so OmniRoute cannot find or execute the Zed binary located on the host OS. Exposing the binary via volume mounts is prone to failure due to glibc/OS differences or missing dependencies in the container.
The best solution is to allow users to manually extract their Zed API token (e.g. from `~/.config/zed/` or the Zed dashboard) and paste it into OmniRoute, bypassing the need to execute the Zed binary from the backend.

## 📚 Reference Implementations

- Cursor and GitHub Copilot providers already support "Manual Import" tabs where the user pastes tokens.

## 📐 Proposed Solution Architecture

### Approach

Modify the Zed provider UI component to include a "Manual" tab for token import. The backend already handles saving the token; we just need a way to submit it without triggering the native executable extraction logic.

### Modified Files

| File | Changes |
| ---- | ------- |
| `src/components/providers/zed/ZedSetupModal.tsx` (or equivalent) | Add a manual token paste input. |

### Database Changes
- None.

### API Changes
- None.

### UI Changes
- "Manual Token" input for Zed.

## ⚙️ Implementation Effort
- **Estimated complexity**: Low
- **Estimated files changed**: 1-2
- **Dependencies needed**: None
- **Breaking changes**: No

## ⚠️ Open Questions
- Where is the exact UI file located for Zed setup?
