# Task 3.07 — Test: OAuth Provider Configs

## Metadata
- **Phase**: 3
- **Source files**: All 13 files in `src/lib/oauth/providers/` (46.37% coverage)
- **Test file to create**: `tests/unit/oauth-providers-config.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read: `src/lib/oauth/providers/index.ts` (provider registry)
2. Read each provider file: `claude.ts`, `codex.ts`, `cursor.ts`, `antigravity.ts`, `github.ts`, `qwen.ts`, `gemini.ts`, `kilocode.ts`, `cline.ts`, `kimi-coding.ts`, `qoder.ts`, `kiro.ts`
3. Read: `src/lib/oauth/constants/oauth.ts`

## Context

Each OAuth provider exports configuration: client ID, auth URL, token URL, scopes, redirect URI, and provider-specific fields. These are static config validations — no HTTP calls needed.

## Test Scenarios

### For each provider config (~2-3 tests each):
```
1. Config export has required fields (clientId pattern, authUrl, tokenUrl)
2. Auth URL is valid HTTPS URL
3. Token URL is valid HTTPS URL
4. Scopes is non-empty array or string
5. Provider name matches expected value
```

### Cross-cutting validations:
```
26. All providers registered in index.ts
27. No duplicate provider IDs
28. All auth URLs are HTTPS (security)
29. Provider-specific data schemas are valid
30. OAuth constants contain all provider entries
```

## Testing Approach

Import each provider config and validate its shape programmatically. Use a loop for common assertions:

```javascript
const providers = await import("../../src/lib/oauth/providers/index.ts");
for (const [name, config] of Object.entries(providers)) {
  it(`${name} has valid authUrl`, () => {
    assert.ok(config.authUrl.startsWith("https://"), `${name} authUrl must be HTTPS`);
  });
}
```

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] oauth/providers/ coverage reaches ≥ 70%
