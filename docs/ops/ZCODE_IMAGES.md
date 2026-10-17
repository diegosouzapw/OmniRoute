---
title: "ZCode Image Input"
version: 3.8.52
lastUpdated: 2026-10-17
---

# ZCode image input (explicit native protocol opt-in)

The ZCode executor forwards OpenAI user `image_url` parts as native image blocks,
preserving their position among text parts. PNG, JPEG, WebP and GIF are supported.
Data URLs retain their original bytes. Public HTTP(S) URLs use the existing
bounded image resolver with DNS/private-address and redirect checks. Limits are
12 images per request and 1 MiB per decoded image. Non-image media is rejected.

The tested official ZCode worker already handles image blocks in its model SDK,
but its `workspace/generateText` wire schema only accepts string content. Enabling
images therefore requires an **explicitly selected isolated protocol patch**.
OmniRoute never patches an installed ZCode runtime automatically.

Prepare a separate copy from the supported installed worker:

```sh
node scripts/ops/zcode-image-runtime.mjs /path/to/installed/zcode.cjs /path/to/isolated/zcode-images
```

The helper pins the tested input SHA-256, changes exactly one user-content schema,
copies adjacent runtime packages, and records source/output hashes. Unknown builds,
duplicate schema matches and conflicting output directories fail closed. Original
ZCode files, authentication, provider configuration and native tool behavior remain
unchanged. No vendor bundle is included in this repository.

Configure only the OmniRoute process to select the copy through ZCode's command
override; retain the existing pristine `ZCODE_SERVER_ENTRY` and signed-in profile:

```sh
ZCODE_AGENT_SERVER_COMMAND=/path/to/node
ZCODE_AGENT_SERVER_ARGS_JSON='["/path/to/isolated/zcode-images/zcode.cjs","app-server","--stdio"]'
```

Restart OmniRoute through the normal deployment path. Enable `image` in the caller's
model input capabilities for `zc/glm-5.3-flash`, then verify a real image through
that caller. Ordinary `zc/glm-5.3` is text-only: the adapter rejects image requests
before native inference rather than silently losing pixels. See the
[official GLM-5.3 documentation](https://docs.z.ai/guides/llm/glm-5.3).
Native inference still returns tool calls to the caller;
no autonomous ZCode coding session is created. SSE remains buffered per model step.

To roll back, restore the previous OmniRoute artifact/config, remove the two command
overrides, and restart through the same control plane. The pristine installed ZCode
worker remains available. Re-review the protocol extension when ZCode is updated;
do not apply the patch blindly to a new vendor build.
