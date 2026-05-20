# Requirements: Kiro multi-account support: independent OAuth sessions per connection

> Feature Idea: [#2328](./2328-kiro-multi-account-support.md)
> Research Date: 2026-05-19
> Verdict: ✅ VIABLE

## 🔍 Research Summary

The user correctly identified that Kiro's backend invalidates refresh tokens if multiple authentications happen under the same registered OIDC client. OmniRoute currently has an implementation of `registerClient()` inside `src/lib/oauth/services/kiro.ts` that dynamically generates `clientId` and `clientSecret`. We can utilize this dynamic client registration to isolate each imported Kiro account, saving the unique pair in `providerSpecificData`.

## 📚 Reference Implementations

N/A - Solution is internal to the provided codebase.

## 📐 Proposed Solution Architecture

### Approach

Modify the Kiro token import flow or the token refresh flow:
When we need to refresh a Kiro token (or when we import one), we check if `providerSpecificData.kiroClientId` exists.
If not, we call `kiroService.registerClient()`, obtain a new pair, save it in the database via the connection's `providerSpecificData`, and use it for the refresh operation.
Since each connection gets its own client registration, they no longer conflict with each other or the CLI.

### Modified Files

| File | Changes |
| ---- | ------- |
| `src/lib/oauth/services/kiro.ts` | Update `refreshToken` to accept or fetch `clientId`/`clientSecret`, or register a new client if none exists. |
| `src/app/api/v1/providers/route.ts` or Token import logic | Update to store the new client pair inside `providerSpecificData`. |

### Database Changes
- None (uses existing JSON `providerSpecificData` column).

### API Changes
- None.

### UI Changes
- None.

## ⚙️ Implementation Effort
- **Estimated complexity**: Medium
- **Estimated files changed**: 2-3
- **Dependencies needed**: None
- **Breaking changes**: No

## ⚠️ Open Questions
- Do we register the client on import, or lazily on the first refresh? (Lazy on first refresh might be easier because token import might not always hit the Kiro-specific logic).
