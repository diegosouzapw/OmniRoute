---
title: GHE Copilot Provider Design
date: 2026-07-16
status: approved
---

# Design: GitHub Enterprise (GHE) Copilot Provider

## Overview
Implement a dedicated provider for GitHub Enterprise (GHE) Copilot. This provider allows users to specify a custom GHE endpoint, mirroring the functionality of the standard GitHub Copilot provider but targeting a corporate instance.

## Architecture

### 1. Target Descriptor (`src/mitm/targets/ghe-copilot.ts`)
A new `GHE_COPILOT_TARGET` will be created.
- **ID**: `ghe-copilot`
- **Hosts**: Dynamically derived from the user-configured `gheUrl`.
- **Endpoint Patterns**: `/chat/completions`, `/v1/chat/completions`.
- **Setup Tutorial**: Modified to guide users through GHE-specific authentication and DNS routing.

### 2. Executor Implementation (`open-sse/executors/ghe-copilot.ts`)
The `GheCopilotExecutor` will extend the existing `GithubExecutor` to reuse complex transformation logic while overriding URL and authentication endpoints.

#### Key Overrides:
- **`buildUrl(model, stream)`**: 
  - Uses `this.config.gheUrl` as the base.
  - Maintains the same logic for routing to `/responses` vs `/chat/completions` based on model type (e.g., Codex).
- **`refreshCopilotToken(accessToken, log)`**:
  - Targets `https://<gheUrl>/copilot_internal/v2/token`.
- **`refreshGitHubToken(refreshToken, log)`**:
  - Targets the corporate GHE OAuth token endpoint.

#### Inherited Logic:
- `transformRequest()`
- `sanitizeChatCompletionsMessage()`
- `dropTrailingAssistantPrefill()`
- `injectResponseFormat()`

### 3. Configuration & Validation
- **Provider Registry**: Add `ghe-copilot` to the provider list.
- **Schema**: Update the provider configuration Zod schema to require `gheUrl` (valid HTTPS URL).
- **Executor Factory**: Register `GheCopilotExecutor` in `open-sse/executors/index.ts`.

## Testing Strategy

### Unit Tests (`tests/unit/ghe-copilot.test.ts`)
- **URL Derivation**: Verify that `buildUrl` correctly appends paths to the custom `gheUrl`.
- **Auth Routing**: Verify that token refresh methods call the GHE-specific endpoints.
- **Inheritance**: Ensure that request transformations (e.g., stripping temperature for gpt-5.4) are correctly applied.

### Integration Tests
- Verify that requests to the GHE endpoint are correctly intercepted by the MITM layer and dispatched via the `GheCopilotExecutor`.