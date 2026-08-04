# Langfuse Plugin

Emits [Langfuse](https://langfuse.com/) generation traces for every LLM completion routed through OmniRoute.

Records **prompt, response, model, provider, token usage, latency, and error details** to Langfuse cloud (`cloud.langfuse.com` or `us.cloud.langfuse.com`) or a self-hosted Langfuse instance.

## Install

Copy the `examples/plugins/langfuse/` directory to your OmniRoute plugins path, or install directly from the marketplace UI.

## Configuration

Fill these fields in the plugin config panel:

| Key | Required | Default | Notes |
|---|---|---|---|
| `publicKey` | Yes | `""` | Langfuse public key (`pk-lf-...`) |
| `secretKey` | Yes | `""` | Langfuse secret key (`sk-lf-...`) |
| `host` | No | `https://cloud.langfuse.com` | Also `https://us.cloud.langfuse.com` or self-hosted URL |
| `enabled` | No | `true` | Set to `false` to make the plugin a no-op without uninstalling |
| `sampleRate` | No | `1.0` | `0.1` = trace 10% of requests |
| `flushAt` | No | `15` | Events to buffer before flushing |
| `flushInterval` | No | `10000` | Max ms between flushes |
| `redactBody` | No | `false` | Set `true` to strip prompt + completion from traces (metadata still recorded) |

Get keys at [cloud.langfuse.com](https://cloud.langfuse.com) → Settings → API keys.

## What gets traced

Each LLM completion emits one Langfuse `generation` observation inside a per-request trace:

- **Trace:** `omniroute:<model>` with `userId`, `provider`, `requestId` metadata
- **Generation:** `chat.completion` with:
  - `model` — full model ID
  - `modelParameters` — `temperature`, `max_tokens`, `top_p`
  - `input` — messages array (redacted if `redactBody: true`)
  - `output` — assistant message (redacted if `redactBody: true`)
  - `usage.promptTokens`, `usage.completionTokens`, `usage.totalTokens`
  - `startTime`, `endTime` — for latency

Errors emit a generation with `level: "ERROR"` and `statusMessage`.

## Runtime dependency

The plugin lazy-loads the [`langfuse`](https://www.npmjs.com/package/langfuse) npm SDK on first request. Install it in the plugin's own directory so a broken SDK cannot crash the gateway:

```bash
cd examples/plugins/langfuse
npm install langfuse
```

## Privacy

- Prompts and completions are sent to Langfuse cloud (or your self-host) in cleartext unless `redactBody: true`
- API keys are stored in the plugin config, encrypted at rest by OmniRoute
- Set `sampleRate < 1.0` to reduce data volume
- Set `enabled: false` to disable without removing configuration

## Related

- [Langfuse docs](https://langfuse.com/docs)
- [Langfuse OpenTelemetry endpoint](https://langfuse.com/docs/opentelemetry/get-started) (alternative path — this plugin uses the native SDK)
- OmniRoute plugin SDK: `docs/frameworks/PLUGIN_SDK.md`
