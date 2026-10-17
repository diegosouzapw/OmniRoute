# Native image repair contracts

Target: OmniRoute 3.8.51 (`c1e30b7676975feb298b49eff6ff58923c04b89e`).

## Separate orchestration from image engines

`cx/gpt-6.1-sol` remains the Codex hosted image-tool orchestration route. Adding its
exact image-registry entry does not rename the image engine or promise native 4K.
The dedicated `cx/gpt-image-2` and `cx/gpt-image-2.5-sunburst` routes instead submit
one JSON request to the selected Codex backend's `images/generations` or
`images/edits` endpoint. They never translate to the hosted chat tool, rotate to
another account after submission, or silently substitute another engine.

Official Codex request and endpoint source:
- [Typed requests](https://github.com/openai/codex/blob/447eac3b81183b32c1a09f5fba9617abfacbebe3/codex-rs/codex-api/src/images.rs)
- [JSON endpoints](https://github.com/openai/codex/blob/447eac3b81183b32c1a09f5fba9617abfacbebe3/codex-rs/codex-api/src/endpoint/images.rs)
- [Tool model and five-reference limit](https://github.com/openai/codex/blob/b172810921f89847cd310ecc496f9c901760e933/codex-rs/ext/image-generation/src/tool.rs)

The public API documents the Sunburst identifier, but this is not proof that a
particular Codex OAuth account can use it, nor proof of the engine actually served.
HTTP success and forwarding the model string do not establish either claim.

## Dedicated request controls

Generation accepts `prompt`, `model`, `n=1`, optional `size`, `quality`, and
`background`. Only original `b64_json` responses are supported. Edits accept at
most five original PNG/JPEG/WebP references, at most 20 MiB decoded total; JSON
inline data URLs and multipart file inputs are normalized without resizing.
Masks, remote reference URLs, file IDs and unimplemented output controls are
rejected rather than discarded. Selected account policy, proxy and cancellation
remain in effect. Refresh failure terminates before image submission. A selected
account already held by an exclusive lease returns 429 without forwarding its
credential sentinel to an image adapter. Other diagnostic selection results and
empty or non-string API keys/access tokens are rejected before adapter dispatch.

A numeric `size` is forwarded, not enforced by local resampling. Inspect decoded
original output dimensions to establish what was returned. In particular, a
request for `3840x2160` does not establish a 4K result. The historical Sol request
returned 1672x941; it must not be described as native 4K.

## Why Sol does not establish native 4K

Checked 2026-10-04. The repaired Codex provider forwards a supplied `size` into
`tools[0].size` and a supplied quality into the hosted image tool. It does not
resize the returned image. `gpt-6.1-sol` is the orchestration model; the Codex
backend selects the image engine when no explicit tool engine is requested.

Open [Codex issue 28723](https://github.com/openai/codex/issues/28723) reports the
OAuth-backed image path accepting explicit dimensions but returning automatic,
smaller outputs. Its controlled A/B report includes both the Responses tool and
the dedicated Codex Images endpoint. This is independently reported upstream
behavior consistent with our 1672 × 941 and 1254 × 1254 observations, not proof
that every account behaves identically. Our saved outputs prove the returned
pixels; without retained response tool metadata, a specific backend rewrite for
our account remains unverified. Changing the mainline model name or repeating
paid requests is not a verified resolution fix.

The current public [OpenAI image guide](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output)
documents custom sizes for Sunburst/Flare: dimensions divisible by 16, aspect ratio
between 1:3 and 3:1, neither edge above 3840, and at most 8,294,400 pixels.
Resolutions above 2560 × 1440 are experimental. Consequently **4096 × 4096 is not
a valid public GPT Image 4K request**; 3840 × 2160 fits the documented constraints.
These public API limits do not guarantee the separate Codex OAuth backend honors
an otherwise valid requested size. Gemini's verified 4096 × 4096 output belongs
to a different provider contract.

## Manually adding a Codex model does not create native 4K or 8K

OmniRoute's provider Custom Models UI and `/api/provider-models` support adding
routing entries, including an images endpoint designation. This changes routing
metadata, not the remote model or its entitlement. Image edit admission still
requires a verified registered image contract. A custom name containing `4k` or
`8k` cannot make the Codex backend produce that resolution.

The explicit registered Codex image engines in this repair are `gpt-image-2` and
`gpt-image-2.5-sunburst`; Sol entries orchestrate a hosted tool. The public image
API documents experimental 3840 × 2160 support, but existing Codex OAuth evidence
shows smaller output even through the dedicated endpoint. No verified ready-made
or manually added Codex route in this investigation establishes native 8K; the
current public GPT Image maximum edge/pixel limits exclude it. Native generation
and later enlargement must be named separately.

## Antigravity edits

The registered Flash image route forwards one validated original reference as
Gemini `inlineData` plus the prompt, selected native model, aspect ratio and
resolution tier in the existing Cloud Code envelope. Unsupported masks and URL
response format are rejected before submission. After submission, transport,
parsing, empty-image and upstream failures are terminal: no sibling model or
account request follows an ambiguous outcome.

[Gemini inline image documentation](https://ai.google.dev/gemini-api/docs/image-generation)
uses base64 original bytes and their MIME type. This contract is distinct from
account availability; see [MODEL-AVAILABILITY.md](MODEL-AVAILABILITY.md).

## Recoverable Windows rollout

The backend-only Ubuntu artifact is a routing verification artifact, not a full
Windows desktop/dashboard replacement. The Windows packaging job runs the full
canonical build including postbuild worker co-location, verifies native Windows
modules, worker ESM scopes, dashboard assets and portable paths, and excludes
private runtime state before upload. Keep the previous installed runtime and
private state recoverable before switching the selected service. Live image
acceptance must preserve selected models and original references; missing account
entitlement is reported, never replaced with a different model or local resize.

## Verified rollout observations — 2026-10-04

Hosted run [37219170454](https://github.com/KiaroSama/OmniRoute/actions/runs/37219170454)
passed both jobs for repair commit
`6d4c14f3958155c5db50ea718f7d1c0961dc754d`: 39 discovered image test files,
243 passing tests, no failures, cancellations or skips, and full Windows packaging.
That Windows artifact was installed recoverably; service health returned HTTP 200,
the login page rendered, and the connected Numera health probe succeeded.
No duplicate local CI or build was run.

Live reference operations on the preceding routing-equivalent build returned:

| Selected route | Operation | Original returned pixels | Result |
| --- | --- | --- | --- |
| `antigravity/gemini-3.1-flash-image` | Reference edit | 1024 × 1024 | Completed; connected MCP edit also completed |
| `antigravity/gemini-3.1-flash-image` | Native upscale | 4096 × 4096 | Completed; original JPEG bytes verified, no local resize |
| `cx/gpt-6.1-sol` | Reference edit | 1254 × 1254 | Completed; orchestration route, not engine identity proof |
| `cx/gpt-image-2.5-sunburst` | Reference edit | 1254 × 1254 | Completed; forwarded identifier does not prove served engine |
| `cx/gpt-image-2.5-sunburst` | Requested 4096 × 4096 upscale | 1254 × 1254 | Partial; not native 4K |
| `antigravity/gemini-3-pro-image` | Reference edit | None | HTTP 400; unsupported edit admission, not entitlement proof |

The final artifact change normalizes escaped Windows build paths only; paid image
operations were not repeated for that packaging-only deployment. Numera conservatively
records the failed Pro operation as an unknown generation outcome. Do not resubmit
it automatically, even though inspected gateway source rejects that unregistered
edit model before provider dispatch.

## Verification limits

Offline fixtures establish routing, original-byte preservation, negative guards,
option forwarding and terminal outcomes. They do not establish live entitlement,
image quality or actual native 4K. Hosted CI/build results must refer to the exact
repair commit. The existing gateway, owner credentials and private state are not
included in the fork or CI artifacts.

The hosted image bucket drains asynchronous call-log saves between fixture cases
and closes its artifact workers before fixture database teardown. It retains a
240-second bucket limit, two isolated workers and failing exit codes; it does not
force-exit passing assertions or run a duplicate local CI pass. Antigravity size
fixtures correlate newly created log IDs, verify `prompt_chars` and assert that
raw `prompt` is absent. Unsupported-size warnings do not echo caller values.
