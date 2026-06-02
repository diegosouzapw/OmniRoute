# VS Code Copilot Ollama Contract (Observed)

## About

This document records the effective Ollama API contract expected by the VS Code Copilot extension when using BYOK Ollama endpoint mode.

The goal is to preserve implementation details required for compatibility and future enhancements.

## OmniRoute Status Snapshot

Current OmniRoute gateway under active validation:

- Base path: `http://localhost:20128/api/v1/vscode/{token}`
- Repository path: `src/app/api/v1/vscode/[token]`
- Date of this snapshot: `2026-06-01`

What is already working in the OmniRoute implementation:

1. `GET /api/version` returns the required Ollama-compatible version response.
2. `GET /api/tags` returns grouped canonical model ids instead of reasoning variants when a base model exists.
3. `POST /api/show` returns friendly display names, context metadata, capabilities, and explicit reasoning metadata.
4. `GET /models` returns enriched import metadata for the newer VS Code model-catalog flow.
5. `POST /v1/chat/completions` serves the selected model through the OpenAI-compatible chat flow.

## Source of Truth

Observed from VS Code bundled extension code:

- `C:\Program Files\Microsoft VS Code\10c8e557c8\resources\app\extensions\copilot\dist\extension.js`
- Workspace source audit target: `/home/aireset/projetos/docker/vscode-copilot-chat/src/extension/byok/vscode-node/ollamaProvider.ts`
- Related BYOK metadata mapper: `/home/aireset/projetos/docker/vscode-copilot-chat/src/extension/byok/common/byokProvider.ts`

Key observed behavior:

1. Reads endpoint from `github.copilot.chat.byok.ollamaEndpoint`.
2. Calls `GET {baseUrl}/api/version` and checks minimum version `0.6.4`.
3. Calls `GET {baseUrl}/api/tags` to enumerate models.
4. For each listed model, calls `POST {baseUrl}/api/show`.
5. Uses `/v1/chat/completions` as OpenAI-compatible endpoint for chat requests.

## Confirmed Endpoint Inventory

The VS Code Copilot extension does not treat `http://host/api/v1/vscode/{token}` as a single RPC endpoint.
It uses that URL as a base path and then calls specific subroutes under it.

### Confirmed endpoints called by the extension in Ollama BYOK mode

1. `GET {baseUrl}/api/version`
2. `GET {baseUrl}/api/tags`
3. `POST {baseUrl}/api/show`
4. `POST {baseUrl}/v1/chat/completions`

### Practical routing summary

For the currently observed Copilot Ollama BYOK flow, the effective sequence is:

1. `GET {baseUrl}/api/version`
2. `GET {baseUrl}/api/tags`
3. `POST {baseUrl}/api/show` for each discovered model
4. `POST {baseUrl}/v1/chat/completions` for message generation

So `http://host/api/v1/vscode/{token}` is the base URL only. The extension then walks subroutes beneath that base.

## Required VS Code Setting

Use explicit endpoint to avoid fallback to default `http://localhost:11434`:

```json
{
  "github.copilot.chat.byok.ollamaEndpoint": "http://localhost:26513"
}
```
