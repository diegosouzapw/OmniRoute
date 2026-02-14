# ADR-003: OAuth Strategy — Multi-Flow Support

**Date:** 2025-11-01  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

OmniRoute supports 12+ providers, each with different OAuth implementations:

- Authorization Code + PKCE (Claude, Codex, Gemini, Antigravity, iFlow)
- Device Code Flow (Qwen, GitHub, Kiro, Kilocode, Kimi-Coding, Cline)
- Token Import (Cursor — extracted from local SQLite)

A unified approach is needed to manage authentication across all providers.

## Decision

Use a **base class + strategy pattern**:

1. `OAuthService` base class (`src/lib/oauth/services/oauth.js`) — handles common authorization code flow with PKCE
2. Provider-specific subclasses (e.g., `GitHubService`, `ClaudeService`) — override authentication methods
3. Provider registry (`src/lib/oauth/providers.js`) — declarative config per provider with `flowType`, `buildAuthUrl`, `exchangeToken`, `mapTokens`
4. Constants centralized in `src/lib/oauth/constants/oauth.js`

Each provider defines:

- `flowType`: `authorization_code_pkce` | `authorization_code` | `device_code` | `import_token`
- Required hooks: `buildAuthUrl()`, `exchangeToken()`, `mapTokens()`
- Optional hooks: `postExchange()` for provider-specific post-auth logic

## Consequences

### Positive

- Adding new providers requires only a config entry + optional subclass
- PKCE, state validation, and token exchange are shared (DRY)
- Device code flow providers share polling logic

### Negative

- Some providers have unique quirks (Kiro uses AWS SSO OIDC with client registration)
- Testing requires mocking external OAuth endpoints

### Neutral

- ~1050 lines in `providers.js` — could be further split per provider if needed
