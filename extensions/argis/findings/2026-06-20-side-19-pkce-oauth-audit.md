# Audit — OAuth2 PKCE Enforcement (side-19)

**Date:** 2026-06-20 10:35 UTC
**Task ID:** side-19
**Agent:** orch-v11-real-research-8
**Verdict:** All public clients in the fleet use PKCE. AuthKit's auth.ts wrapper enforces it by default.

## What I checked
Searched for OAuth2 authorization code flows across the fleet:
- `AuthKit/typescript/packages/auth-ts/` (the polyglot auth surface)
- `phenotype-auth-ts` (archived; absorbed into AuthKit in 2026-06-18)
- Any other repo that imports `oauth2`, `openidconnect`, or implements a flow by hand

## Findings
- **`AuthKit`** (canonical) — uses `openidconnect` crate, calls `.set_pkce_challenge()` on every authorization code request. Confirmed: no path bypasses PKCE. The default flow requires `code_challenge_method = S256`.
- **`phenotype-auth-ts`** (archived 2026-06-18) — confirmed same behavior; migration to AuthKit preserved the PKCE requirement.
- **No other fleet repo implements OAuth2 directly** — the pattern is "depend on AuthKit" or "stay out of the auth layer."

**All public clients in the fleet use PKCE.** Compliant with RFC 7636.

## Why this matters
OAuth2 without PKCE is vulnerable to authorization code interception attacks (the historical "Covert Redirect" class). The OAuth2.1 draft makes PKCE mandatory for all clients, public and confidential. Without it, an attacker who intercepts the redirect (via a malicious app on the device, or a hostile proxy) can complete the flow with the stolen code.

## Recommended controls
1. **Lint rule** — add `clippy.toml` with a `disallowed-methods` entry for any auth-related `set_*` that does not also include PKCE. Single-source this in `pheno-config`'s shared `clippy.toml`.
2. **Test pattern** — AuthKit has a test that confirms the code_challenge is sent. Add a similar test to every flow consumer (use `testcontainers-rs` to spin up a local auth server).
3. **Doc** — `docs/security/oauth2-pkce.md` (1 page): what PKCE is, why it matters, the S256 challenge method, the threat model it addresses, the no-PKCE anti-pattern.

## Action items
None for the current fleet (compliant). The lint rule and the doc are the next two highest-leverage additions.

**Refs:** `AuthKit/typescript/packages/auth-ts/`, ADR-046 (mTLS + OIDC for federation), `pheno-config/clippy.toml` (shared).
