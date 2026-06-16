## Why

Microsoft 365 Enterprise Copilot users cannot use their organization-issued Copilot
access tokens with the current `copilot-web` provider because that provider is bound
to the personal `copilot.microsoft.com` session, validation, and WebSocket protocol.
M365 Copilot uses a Substrate token audience and BizChat WebSocket protocol, so it
needs first-class support without changing personal Copilot behavior.

## What Changes

- Add a separate `copilot-m365-web` provider for Microsoft 365 Enterprise Copilot
  web sessions.
- Accept M365 Substrate `access_token` JWT credentials and validate required token
  properties before attempting upstream use.
- Route chat requests through the M365 Copilot Chathub/BizChat WebSocket protocol and
  translate OpenAI chat-completion requests and streamed responses to OmniRoute's
  existing response shapes.
- Add web-session credential metadata and token-extraction guidance for M365 Copilot
  browser sessions.
- Preserve the existing personal `copilot-web` provider, including its endpoint,
  validation, token extraction, model mapping, and optional-key behavior.
- Add focused tests for provider registration, credential validation, executor
  dispatch, token-expiration handling, stream translation, and personal-provider
  non-regression.

## Capabilities

### New Capabilities

- `m365-copilot-web-provider`: Support Microsoft 365 Enterprise Copilot as a
  separate web-session provider, covering provider registration, credential
  validation, request routing, streaming response translation, and expiration
  handling.

### Modified Capabilities

- None.

## Impact

- Affected provider surfaces: `src/shared/constants/providers.ts`,
  `open-sse/config/providerRegistry.ts`, `open-sse/executors/index.ts`,
  `src/shared/providers/webSessionCredentials.ts`, and
  `open-sse/services/tokenExtractionConfig.ts`.
- Affected validation surface: `src/lib/providers/validation.ts`.
- New executor and tests are expected under `open-sse/executors/` and `tests/unit/`.
- Existing `copilot-web` personal Copilot behavior must remain backward-compatible.
- Upstream protocol work depends on reverse-engineered M365 BizChat frames rather than
  a documented public Microsoft API.
