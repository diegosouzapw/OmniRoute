---
title: "Grok Image Generation"
---

# Grok Image Generation

Send requests to `POST /v1/images/generations` using the router API key.
List available image models with `GET /v1/images/generations`.

Grok subscription image routes are off unless `GROK_SUBSCRIPTION_IMAGES_ENABLED`
is `true` (definition default `false`). While it is off, `xai-oauth` / `xao` and
`grok-cli` / `gc` are not image providers, `high`/`hd` quality is not rewritten to
`medium`, and API-key `xai` keeps the previous OpenAI-compatible image request.
When the flag is on, subscription connections can generate images with
`grok-cli/grok-imagine-image-2.0` (alias `gc/`) or
`xai-oauth/grok-imagine-image-2.0` (alias `xao/`). Use an existing OAuth connection
with API access; account permissions and subscription quota apply. API-key connections
then use `xai/grok-imagine-image-2.0` through the same xAI image request. These routes
use the xAI image endpoint and the router's existing token refresh and credential selection.

```json
{
  "model": "grok-cli/grok-imagine-image-2.0",
  "prompt": "A chef preparing pho in a bright Vietnamese kitchen",
  "aspect_ratio": "3:2",
  "resolution": "1k",
  "quality": "medium",
  "response_format": "b64_json"
}
```

For these providers, native `aspect_ratio` and `resolution` take precedence over
OpenAI-style `size`. For example, `1536x1024` maps to `3:2`, and `2048x2048`
maps to `1:1` at `2k`; the resulting pixel dimensions are chosen by xAI.
`size: "auto"` preserves automatic aspect selection. Image 2.0 accepts `quality`
values `low`, `medium`, and `auto`; compatibility values `high`/`hd` map to
`medium`, and `standard` maps to `low`. Older Grok image models reject the
`quality` option. The OpenAI `style` option is omitted. Invalid options return 400.
See the [xAI image generation contract](https://docs.x.ai/developers/model-capabilities/images/generation).
