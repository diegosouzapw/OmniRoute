---
title: "OpenAI-compatible protocol"
version: 3.8.51
lastUpdated: 2026-09-18
---

<!-- markdownlint-disable MD025 -->

# OpenAI-compatible protocol

OmniRoute exposes a client-facing OpenAI-shaped API at `/v1`. Authenticate with
`Authorization: Bearer <key>` and use a model id returned by `GET /v1/models`.
The model id normally has the form `<provider-prefix>/<model-id>`; combos are
also valid model targets.

This page describes the public contract. Provider capability is not uniform:
the gateway translates requests where it has a supported translator, but an
upstream may still reject a feature it does not implement. Treat the live
`/v1/models` record and the provider's capability metadata as authoritative for
model selection.

## Endpoint and capability matrix

| Endpoint                        | Wire format             | Streaming                            | Main input                                                                      | Capability notes                                                                                                                                              | Automated coverage                                                                                                                                                                                                                           |
| ------------------------------- | ----------------------- | ------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /v1/chat/completions`     | OpenAI Chat Completions | `stream: true` returns SSE           | `messages` (or compatible `input`/`prompt` forms accepted by the shared schema) | Text, tool calls, reasoning controls, structured-output fields, and multimodal message content are translated when the selected model/provider supports them. | [`chat-completions-route-shape-gate.test.ts`](../../tests/unit/chat-completions-route-shape-gate.test.ts), [`openai-compatible-tools.test.ts`](../../tests/unit/openai-compatible-tools.test.ts)                                             |
| `POST /v1/responses`            | OpenAI Responses        | SSE event stream when `stream: true` | `input`                                                                         | Responses input, tools, reasoning, and output events are translated for providers that expose a compatible path.                                              | [`responses-passthrough-openai-compatible.test.ts`](../../tests/unit/responses-passthrough-openai-compatible.test.ts), [`openclaw-omniroute-tool-boundary.live.test.ts`](../../tests/boundary/openclaw-omniroute-tool-boundary.live.test.ts) |
| `POST /v1/embeddings`           | OpenAI Embeddings       | No                                   | `input`                                                                         | Text embeddings are broadly supported; multimodal input is limited to models advertising it. Inline media is capped at 8 MiB per item and 16 MiB per request. | [`v1-contracts-behavior.test.ts`](../../tests/integration/v1-contracts-behavior.test.ts)                                                                                                                                                     |
| `POST /v1/images/generations`   | OpenAI Images           | No                                   | `prompt`                                                                        | Image-capable models only; response format may be `url` or `b64_json`.                                                                                        | [`v1-contracts-behavior.test.ts`](../../tests/integration/v1-contracts-behavior.test.ts)                                                                                                                                                     |
| `POST /v1/images/edits`         | OpenAI Images edit      | No                                   | multipart image + prompt                                                        | Supported for the providers/models that implement image editing.                                                                                              | [`image-generation-handler.test.ts`](../../tests/unit/image-generation-handler.test.ts)                                                                                                                                                      |
| `POST /v1/audio/transcriptions` | OpenAI Audio            | No                                   | multipart audio                                                                 | Speech-to-text providers/models only.                                                                                                                         | [`audio-transcription-handler.test.ts`](../../tests/unit/audio-transcription-handler.test.ts)                                                                                                                                                |
| `POST /v1/audio/speech`         | OpenAI Audio            | No                                   | `input`, `voice`, `model`                                                       | Text-to-speech providers/models only; returns an audio body.                                                                                                  | [`audio-speech-handler.test.ts`](../../tests/unit/audio-speech-handler.test.ts)                                                                                                                                                              |
| `GET /v1/models`                | OpenAI model list       | No                                   | —                                                                               | Lists visible chat, media, embedding models, and combos. Use `?prefix=alias`, `dual`, or `canonical` to select id presentation.                               | [`v1-contracts-behavior.test.ts`](../../tests/integration/v1-contracts-behavior.test.ts), [`provider-journey.contract.test.ts`](../../tests/integration/provider-journey.contract.test.ts)                                                   |

Other compatibility surfaces are listed in [API Reference](./API_REFERENCE.md),
including `/v1/messages`, `/v1/rerank`, `/v1/moderations`, video/music routes,
Files, Batches, and the tokenized VS Code aliases.

## Chat request fields

The chat route requires `model` and at least one of `messages`, `input`, or
`prompt`. The schema is intentionally forward-compatible and preserves unknown
OpenAI-style fields for translation; the canonical fields used by OmniRoute
include:

| Field                                                 | Behavior                                                                                                                                            |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `messages`                                            | Conversation messages. Assistant `tool_calls` are paired with subsequent `role: "tool"` results.                                                    |
| `tools` / `tool_choice`                               | Function/tool definitions and selection policy. They are translated to the selected upstream format when possible.                                  |
| `parallel_tool_calls`                                 | Passed through as a client preference. It does not make a model capable of parallel calls; the model/provider must support that capability.         |
| `stream`                                              | Enables SSE streaming. The client must parse `data:` events and stop at `data: [DONE]` on Chat Completions.                                         |
| `stream_options.include_usage`                        | Supported on Chat Completions where usage is available. It is removed when translating to Responses upstreams that reject this field.               |
| `response_format`                                     | Structured/JSON response controls are provider-dependent.                                                                                           |
| `reasoning_effort`, `reasoning`, `thinking`, `effort` | Normalized into the selected provider's reasoning controls; unsupported effort values may be clamped or rejected by the upstream.                   |
| multimodal content                                    | Use the OpenAI message content parts supported by the target model. Do not assume that a text model accepts image, audio, video, or document parts. |

Tool calls can be emitted as one or more calls in a single assistant turn.
When a provider does not natively use OpenAI tool-call objects, OmniRoute's
translator maps the provider representation back to `tool_calls` in the
OpenAI response. The application remains responsible for executing tools and
sending the matching tool results in the next request.

## Streaming and errors

Chat and Responses streams are long-lived HTTP responses. Keep the connection
open until the terminal event, propagate client cancellation, and treat a
non-2xx response before the stream starts as an ordinary JSON error. A provider
failure during dispatch is returned through OmniRoute's sanitized error shape;
raw upstream stacks and credential material are not exposed.

Typical client-visible statuses are `400` for validation or unsupported request
shape, `401` for authentication, `403` for policy/key permission failures,
`404` for unknown routes or models, `409` for request conflicts, `429` for rate
limits/capacity, and `5xx` for gateway/upstream failures. The exact JSON error
fields are part of the route's sanitized error helper and should be handled by
`status` plus the returned error `code`/`type`, not by matching prose.

## Media limitations

Media support is endpoint- and model-specific. `/v1/models` may include media
models that cannot answer chat requests; select the endpoint that matches the
model modality. For embedding media, remote sources must be safe public HTTPS
URLs; inline sources use base64 and are bounded to 8 MiB per item and 16 MiB
total. ChatGPT Web input images are a narrower case: that backend accepts
inline `data:` image URLs, not remote image URLs or file-id references.

## Generic OpenAI-compatible provider nodes

An operator can add a provider node with `type: "openai-compatible"`, a
`baseUrl`, a `prefix`, and one `apiType`:

```json
{
  "name": "Local gateway",
  "prefix": "local",
  "type": "openai-compatible",
  "apiType": "chat",
  "baseUrl": "http://127.0.0.1:1234/v1"
}
```

Supported `apiType` values are `chat`, `responses`, `embeddings`,
`audio-transcriptions`, `audio-speech`, and `images-generations`. OmniRoute
appends the corresponding standard path (`/chat/completions`, `/responses`,
`/embeddings`, `/audio/transcriptions`, `/audio/speech`, or
`/images/generations`) to the configured base URL. A trailing slash is removed.
The provider-node schema does not promise that every upstream accepts every
OpenAI field; configure only the endpoint type the upstream actually serves.

## Client examples

```bash
export OMNIROUTE_BASE_URL="http://localhost:20128/v1"
export OMNIROUTE_API_KEY="your-api-key"

curl "$OMNIROUTE_BASE_URL/models" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY"

curl "$OMNIROUTE_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello"}]}'
```

For an OpenAI SDK, set its base URL to `http://localhost:20128/v1` (the `/v1`
root, not `/v1/chat/completions`) and supply the OmniRoute key as the API key.
The same root works for clients that use Chat Completions or Responses, subject
to the client's own wire-format setting.

## Verified implementation sources

- [Public API reference](./API_REFERENCE.md)
- [OpenAI-compatible provider routing](../../open-sse/services/provider.ts)
- [OpenAI v1 schemas](../../src/shared/validation/schemas/apiV1.ts)
- [Provider model capability metadata](../../src/shared/constants/modelSpecs.ts)
- [Provider-node validation](../../src/shared/validation/schemas/provider.ts)

`/v1/realtime` is not implemented. Clients must treat it as unsupported rather than
assuming that the chat or Responses endpoints provide a realtime WebSocket contract.
