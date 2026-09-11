---
title: "Guardrails"
version: 3.8.51
lastUpdated: 2026-08-29
---

# Guardrails

> **Source of truth:** `src/lib/guardrails/`
> **Last updated:** 2026-08-29 — v3.8.51 (Video Bridge transcript provenance is caller-declared,
> not yet server-verified — clarified per #11661)

Guardrails enforce safety, policy, and content transformations at the boundary
between OmniRoute and upstream providers. Each guardrail can inspect (and
optionally reject, transform, or annotate) request payloads (`preCall`) and
upstream responses (`postCall`).

The system is **fail-open**: if a guardrail throws while executing, the registry
records the error and continues with the next guardrail rather than failing the
request. Blocking is an explicit decision (`block: true`), never an accident.

## Built-in Guardrails

The registry auto-loads six guardrails in priority order on import
(see `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Lower priority numbers run **first**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Intercepts image-bearing requests aimed at **non-vision models** and either
reroutes the whole request to a vision-capable model or replaces the image
parts with text descriptions produced by a configurable vision model before
the upstream call. This lets text-only providers transparently handle
multimodal payloads.

Flow:

1. Skip if the target model already supports vision (unless it appears in the
   forced-bridge list `isVisionBridgeForcedModel`).
2. Extract image parts via `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), which delegates to the **unified media
   detector** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — the
   single source of truth shared with the combo compatibility filter.
   Extraction is allowlisted to top-level parts of the shapes
   `replaceImageParts` can splice back (the extract↔replace contract): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, and Responses API `input_image`. Nested hits and
   indicator-only shapes are combo-filter material and are never extracted.
   Skip if none found.
3. Resolve runtime config via `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): new `modalityBridge*`
   settings keys win; legacy `visionBridge*` keys remain a **one-cycle
   fallback** (rollback window). Skip before any media traversal when the
   bridge is disabled.
4. Mode selector (`modalityBridgeVisionMode`, see table below) decides
   reroute vs describe. Reroute returns `modifiedPayload` with only `model`
   swapped, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Describe path: cap images at `maxImages`, compose the task-aware prompt,
   consult the describe cache, call the vision model **in parallel**
   (`Promise.allSettled`), and inject `[Image N]: <description>` text parts in
   their place. A failed describe yields `null` and the original image part is
   **preserved** (#4012) — except on the combo describe path when every
   describe failed, where a confirmed non-vision upstream gets an
   `(unavailable — no vision-capable provider connected)` stub instead (#8430).
6. Return `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Mode selector (`modalityBridgeVisionMode`)

| Mode       | Default | Behavior                                                                                                                                                                                                                                                |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Legacy heuristic, untouched (#6640/#7204): non-combo/`auto/` models reroute to the best vision model unless the original model already has usable credentials (then describe); combo targets always describe.                                           |
| `describe` |         | Always describe — the reroute block is skipped entirely; the user's chosen model always answers.                                                                                                                                                        |
| `reroute`  |         | Force reroute: the keep-credentialed-model guard is bypassed. The reroute-**target** credential guard still applies — when no usable vision target exists, the request falls through to describe so raw images never reach a text-only backend (#8430). |

Forced modes short-circuit **before** the auto heuristic runs; `auto` behavior
is byte-identical to the pre-PR-1 guardrail.

#### Task-aware describe prompt (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) appends
the text of the **last user message** (truncated to 500 chars) to the base
describe prompt, steering the description toward what the user actually asked
(codex-vision-proxy pattern) and asking the vision model to transcribe visible
text. With the flag off — or no user text — the base prompt is used unchanged.

The describe self-loop's own OpenAI-compatible request (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) always requests `image_url.detail: "high"` —
unconditionally, for every caller/provider, not gated on any client signal.
Low-detail sampling degrades OCR accuracy for exactly the text-transcription
task this prompt asks for, so the describe call itself always asks for high
detail regardless of what detail level the original inbound request used. This
only affects the internal describe request body; it does not change how
OmniRoute forwards the caller's own `image_url.detail` on the primary request —
that default is applied separately, and only for detected OpenCode clients, in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). The
Anthropic wire-format branch of the describe self-loop has no `detail` field
and is unaffected by either default.

#### Describe output cap (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` or 100–50000 |

`0` (default) means **no cap** — the description returned by
`callVisionModel()` is passed through unmodified, preserving the existing
behavior. Any value in the 100–50000 range truncates the description with a
`…` suffix before it is spliced back as `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Raise this for detail-heavy OCR tasks where the downstream model needs the
full transcription; lower it to bound token usage on chatty vision models.
The dashboard field lives on the Vision tab's Advanced panel
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) and clamps any
value between 1 and 99 up to the 100 floor while leaving an explicit `0`
untouched — `0` is a valid Zod value in its own right
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), not merely
the "unset" default.

#### Describe cache (`modalityBridge/bridgeCache.ts`)

In-memory LRU + TTL cache for describe outputs, shared process-wide.
Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` with
length-prefix framing (no field-boundary collisions). The model component is
the **configured** bridge model, not the model that actually answered —
`callVisionModel` may fall back internally, and keying per attempt would
fragment the cache. Failed describes are never cached. Settings:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Remote image normalization (self-loop describe/base64 fetch)

When the bridge fetches a **remote** image itself — the Anthropic describe
self-call and the claude-wire-format base64 conversion
(`ensureBase64ImagesForClaudeWire`), both via
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — the resulting data
URI is passed through `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) before being embedded in the vision-model
request. Oversized images are downscaled to a **2048px long edge** (matching
the resize cap OpenAI/Anthropic already apply server-side), which cuts
upload bytes/latency without changing what the vision model sees. Resizing
uses `sharp`, loaded via dynamic import: on a platform where its native
binary fails to load, `normalizeDataUri()` **never throws** — it falls back
to a passthrough of the original bytes, so the describe/base64-conversion
path always keeps working. Non-image bytes (a fetch that did not return a
decodable image) are also passed through untouched. This normalization is
scoped to images the bridge fetches for its own self-call — it is never
applied to the caller's raw passthrough payload, consistent with the
opt-in-only mutation principle (Hard Rule #20).

#### Settings schema + migration

The new `modalityBridge*` keys are Zod-validated in `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, the `modalityBridgeCache*` trio, and the
`modalityBridgeAudio*` group used by the Audio Bridge. Migration
`141_modality_bridge_settings.sql` copies existing legacy
`visionBridge*` values to the matching new keys (idempotent, never overwrites
an operator-set `modalityBridge*` value); the legacy keys stay accepted as a
read fallback for one release cycle.

#### Transparency header + stats

Describe-transformed responses carry
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(built by `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`,
stamped by `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Rerouted requests get **no** header — the payload was untouched and the model
swap is already visible in the response body's `model` field.

`GET /api/modality-bridge/stats` (management auth, same tier as
`GET /api/settings`) returns the in-memory per-modality counters
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` for `vision`, `audio`, and
`video`. `averageLatencyMs` uses `latencySamples`, not all attempts, as its
denominator; an operation without timing does not fabricate a zero-millisecond
sample. `bridged` remains the backward-compatible alias for successful
conversions; failed attempts do not increment it.
Counters reset on process restart by design
(telemetry, not accounting).

#### Dashboard configuration

The dedicated dashboard page is
`/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`,
and `Video` tabs preserve query parameters while switching the `tab` value.
The Vision tab exposes enablement, mode, model selection (including the automatic
default), task-aware prompting, advanced timeout/image/description-length/cache
limits, runtime
counters, and a guarded sample request. The Audio tab is also live: it exposes
enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio
counters, and an `input_audio` sample test. The Video tab is functional: it reports
the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while
the probe is in flight or could not complete, `restricted` on a non-loopback
dashboard host where the probe is skipped client-side, `unavailable` once probed
and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists
enable/model/frame/video/timeout limits, filters the model picker to vision-capable
models, and exposes video counters.

The former Vision Bridge card under AI settings is a compatibility link to the
new page; it no longer owns a second copy of the form. Media Providers also
links Image-to-Text and Speech-to-Text workflows to the corresponding Modality
Bridge tabs without removing the existing Speech-to-Text playground.

**Self-loop admission bypass:** when the describe call routes through OmniRoute's
own `/v1` self-loop (non-standard provider model), the sub-request sends
`x-omniroute-admission-bypass: internal` and is authenticated with the resolved
self-loop credential — the local `sk_omniroute` sentinel in local mode, or the
operator-configured `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env key (#1350) so
`REQUIRE_API_KEY=true` deployments can still run the describe call. The bypass
is only honored for those exact credentials, so external clients cannot use the
header to skip admission.

Legacy defaults live in `src/shared/constants/visionBridgeDefaults.ts`; the
new mode/task-aware/cache defaults and the settings resolver live in
`src/shared/constants/modalityBridgeDefaults.ts`. The guardrail exposes a
`deps` constructor option so tests can inject fake `getSettings` and
`callVisionModel` implementations.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Intercepts audio-bearing chat requests before they reach a target that is not
known to accept audio input. It never reroutes the chat request: audio parts are
transcribed through the existing OpenAI-compatible multipart endpoint and the
chosen chat model continues with text transcripts.

Flow:

1. Resolve `supportsAudio` through `getResolvedModelCapabilities()`. Explicit
   provider-registry metadata wins, then static model metadata, then synced
   `modalities_input`. A declared input list without `audio` is `false`; no
   capability evidence remains `null`. Both `false` and `null` activate the
   conservative bridge, while `true` bypasses it.
2. Resolve `modalityBridgeAudio*` settings and extract spliceable top-level
   audio parts from every message through the shared `detectMediaParts()`
   detector. Supported wire shapes are OpenAI `input_audio`, `audio_url`, and
   `source.media_type: "audio/*"`. Nested audio is detected for routing but not
   removed by the splice path. Work is capped by `modalityBridgeAudioMaxClips`;
   later parts stay untouched.
3. Honor a configured `provider/model`, or let `selectAudioBridgeModel()` walk
   `AUDIO_TRANSCRIPTION_PROVIDERS` in stable catalog order and select the first
   model with a usable active provider credential.
4. `callAudioTranscription()` converts base64/data-URI audio to a multipart
   `file`, or downloads a remote `audio_url` through the public-only outbound
   guard with DNS pinning and a 25 MB bound. It then POSTs the file and selected
   model to the local `/v1/audio/transcriptions` self-loop, authenticated with
   `resolveSelfLoopBearer()`. The existing transcription route performs normal
   credential lookup, cooldown/rate-limit handling, and provider dispatch.
5. Successful calls replace their parts with `[Audio N]: <transcript>`. Calls
   run with `Promise.allSettled`: an individual failure preserves that original
   audio part (#4012 contract). If every call fails and the target is proven
   `supportsAudio === false`, the parts become
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 contract). For
   an unknown target (`null`), an all-failure result stays untouched. A proven
   text-only target with no usable STT credential receives the same explicit
   stub without issuing a network call.

Successful transcripts use the process-wide Modality Bridge LRU/TTL cache. The
key combines the audio reference, the stable `audio-transcription` operation
label, and selected STT model; failures are never cached. Audio attempts update
the shared `bridged`, `cacheHits`, `failures`, and `lastUsedAt` counters.
Transformed responses carry
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; untouched
requests do not receive an Audio Bridge segment.

Runtime settings are DB-backed and Zod-validated:

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

The shared cache remains controlled by `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, and `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Intercepts top-level video parts in Chat Completions `messages` and Responses
API `input` before a target without known native video support is called.
Supported shapes are `input_video`, `video_url`, `video_source`, HTTPS URLs,
and `data:video/*;base64,...` data URIs. Plain filenames in text are not treated
as video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) owns request traversal, the
capability/policy check, per-request aggregation, and the response payload.
Per-video work — acquisition, the whole-result cache, describing a frame
sequence (which fuses any caller-declared audio transcript), and per-attempt
metrics/abort/cleanup — is hidden behind `processVideoPart` in
`videoBridgePipeline.ts`, called once per video part inside `preCall`'s loop.
That module also defines the explicit port boundaries `VideoMediaBrokerPort`
(acquiring bytes and extracting sampled frames), `VideoAudioTranscriptionPort`
(fusing a caller-declared audio transcript with the sampled captions), and
`VideoDrilldownPort` (the frame drill-down persistence boundary; not yet wired
into `processVideoPart` — only the separate `/api/modality-bridge/video/drilldown`
route writes drill-down entries today).

The public `/v1` request path never imports or invokes a subprocess. Remote
videos are downloaded under a 50 MiB bound; inline base64 videos have a
conservative 36 MiB decoded per-video cap so the model/messages/framing envelope
can remain inside the public JSON request admission limit of 50 MiB. Inline
length and decoded-size estimates are checked before allocation. HTTPS is
required on the initial remote URL and every redirect, using the existing
public-only outbound guard with DNS pinning. The bytes then cross the exact internal
`POST /api/modality-bridge/video/extract` broker boundary. That route is both
`LOCAL_ONLY` and `SPAWN_CAPABLE`, accepts only a per-process authenticated,
trusted-loopback request, and never accepts a URL, filesystem path, executable,
or argument list. The API body-size pipeline and the handler's incremental body
reader independently enforce a 50 MiB broker input cap. Its bounded queue runs
one extraction at a time, allows four pending jobs, and caps pending input at
100 MiB.

Inside the broker, `ffprobe` reads a private local file; the fixed format
allowlist excludes playlist and manifest formats. For allowed MOV-family
containers, external MOV data references remain disabled by default, and the
fixed command does not opt in to them. Both `ffprobe` and `ffmpeg` use the
`file`-only protocol whitelist, one thread, fixed argument arrays, no shell,
and executables resolved from `PATH`. Attached-picture cover streams are not
playable candidates. All playable streams must satisfy the limits, and an
explicit default stream is preferred before the deterministic lowest-index
fallback. Videos are limited to 600 seconds, 8,192 pixels per dimension, and
33,554,432 source pixels. FFmpeg samples 1–16 midpoint JPEG frames, scales down
the long edge to at most 1,024 pixels without upscaling smaller inputs, and
never receives a URL. Sampling is `uniform` by default. The optional
`scene_aware` and experimental `segment_aware` policies perform one additional
fixed FFmpeg pass over the already validated local stream, select bounded
`showinfo` scene timestamps, and fall back deterministically to the same
uniform midpoints on detector failure, timeout, malformed output, or an empty
candidate set. Segment-aware mode allocates midpoint samples proportionally to
the validated scene intervals; segment-aware evidence and fallback behavior are
detailed below. The hard 16-frame cap is
applied after selection in every policy. When a scene-aware request has only a
one-frame budget, it uses the uniform midpoint of the active full-video or focus
window and reports `policyEffective: uniform`: a single selected scene frame
cannot preserve both temporal ends. A caller may optionally provide a
finite focus window (`start`/`end` seconds); bounds are clamped to the media
duration, reversed or non-finite windows are rejected, and all sampling
policies are performed only inside the normalized interval. The resulting
window is included in sampling metadata and in the untrusted description
prefix so downstream models can distinguish a focused excerpt from the full
timeline.

Semantic caption focus is a separate, explicit setting. The default `full`
analysis mode preserves the existing frame prompt and never forwards request
text to the caption model. In `focused` mode, the bridge reads only the latest
non-empty user-authored `text`/`input_text` from the same Chat or Responses
container, normalizes it to NFC, collapses control characters and whitespace,
and limits it to 500 Unicode code points. An empty result falls back to the
exact `full` prompt. A usable hint is serialized as JSON in a dedicated
untrusted-user-context block and may only prioritize observable details; it
cannot override the separate warning against following instructions visible
or audible in the media. Textual focus never infers `start`/`end` or changes
the temporal sampler.

#### FU-07 structural segment evidence

`segment_aware` uses one bounded pre-analysis pass over the already validated
local video stream. The fixed filter chain first scales to at most 320 pixels
wide, detects scene changes and frozen intervals, then samples at 1 frame per
second for blur, average luma, and spatial/temporal information. The pass is
limited to 600 structural samples, one FFmpeg/filter thread, the same
`file`-only protocol and container allowlists, a 1 MiB process-output bound,
and at most 30 seconds inside the broker's shared abort/deadline. It never
accepts a command, filter, path, or URL from the request.

The structural values are deterministic sampling evidence, not semantic video
understanding. They do not infer subjects, actions, captions, speech, or user
intent. Scene and freeze boundaries form segments; freeze coverage, blur,
exposure, spatial detail, and temporal change only influence how the existing
1–16 frame budget is allocated. A fully frozen segment is capped at one frame,
while non-frozen segments compete for the remaining budget. When boundaries
outnumber frames, uniform timeline coverage is retained so rapid early cuts
cannot hide a long trailing segment. Scene boundaries within the 1-second
analysis resolution of a freeze boundary are coalesced.

Missing filters, malformed/empty evidence, a detector error, or the bounded
pre-analysis timeout fail open to the exact uniform midpoint policy. A caller
abort or broker deadline does not fail open: it terminates the in-flight
subprocess, prevents later frame extraction, and the private temporary tree is
removed in `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generates deterministic real FFmpeg
fixtures for post-dedup caption-call savings, dense-motion budget allocation,
blur/exposure/SI-TI evidence, rapid cuts with a long tail, and gradual-fade
false positives. It records pre-analysis wall time and, where `/usr/bin/time`
is available, child CPU and peak RSS. Its quality checks are structural oracles
only. Real caption-model quality remains `HOLD` because this harness has no
authorized endpoint or frozen judge. Monetary savings also remain `HOLD`
unless `--caption-cost-per-call-usd` supplies an explicit positive per-call
estimate; the script never fabricates either result.

Each frame is limited to 4 MiB, all raw frames together to 23 MiB, and the
serialized broker response to 32 MiB. A private temporary directory is removed
in `finally`. OmniRoute does not bundle FFmpeg and does not accept a custom
executable path. Before captioning, the bridge applies a conservative visual
deduplication pass: each JPEG is reduced to a 16×16 grayscale buffer and is
compared only with the last frame retained. For a requested caption budget
above one frame, extraction supplies a
bounded candidate pool of up to twice that budget and never more than 16 frames.
The requested cap is applied only after deduplication, with the first and final
selected candidates preserved during final thinning when the budget is at least
two. The versioned
`grayscale-16x16-mean-cells-v2` policy uses the larger of mean luma delta and
the ratio of thumbnail cells whose normalized delta is at least 0.05. The
duplicate threshold is the constant 0.04, chosen for predictability rather than
exposed as a runtime setting. This secondary
high-contrast signal preserves small motion and visible-text changes that a
mean-only comparison can hide. Comparator or decoder errors fail open and keep
coverage. Output metadata separates extracted candidates, successfully used
frames, and visual duplicates dropped.

An explicitly marked video part may request a timestamped contact sheet. The
bridge builds at most a 4-column, 16-frame JPEG grid. Every 512-pixel cell burns
its source timestamp into a high-contrast bottom band, while the same timestamps
remain in textual metadata for downstream association and audit. The complete
JPEG remains capped at 32 MiB. If `sharp` cannot decode or compose the grid, the
bridge falls back to the individual JPEG frames; a client abort still propagates
through the sheet operation.

Promotion evidence is deliberately separate from the synthetic composition
microbenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` defines a
schema-versioned A/B harness for real OpenAI-compatible vision models. It measures
provider-reported tokens, end-to-end wall latency (including sheet composition),
model-call count, and manifest-defined fact retention. Raw model responses are not
written to the report; only SHA-256 digests and matched fact IDs are retained. The
harness makes no network or paid model call unless `--execute-real` is passed and
`--model`, `OMNIROUTE_BASE_URL`, and `OMNIROUTE_API_KEY` are configured. Without
that explicit real run, its machine-readable verdict remains `HOLD`; synthetic
payload/call-count measurements alone are not promotion evidence.

Callers may attach an optional `transcript.cues` array to a supported video
part when they already possess aligned text. Each cue must carry `text`, a
finite `start`/`end` interval inside the probed duration, and a whitelisted
`source` (`client`, `embedded`, or `audio-bridge`); `confidence` defaults to
`1` and must remain between `0` and `1`. Exact duplicate cues are collapsed.
OmniRoute never starts transcription from this metadata: validated cues are
copied into the described result with source, confidence, and interval, and
are rendered as untrusted observations alongside the frame captions. Invalid,
out-of-range, or provenance-free text is rejected rather than mixed into the
caption stream. The `source` field is presently caller-declared, not
server-verified: OmniRoute enforces that the value is one of the three
allowed strings, but does not yet cryptographically confirm that an
`embedded` or `audio-bridge` label actually came from a server-owned
extraction. Treat `source` as an untrusted hint until that verification
lands; do not build authorization decisions on it.

An advanced caller may provide an already-authorized `audioTranscript` track
for the same video. The fusion seam runs visual and audio observations under
one deadline and abort signal, orders them on a common timeline, collapses
exact duplicates, and reports a partial result when only one side succeeds.
An invalid `audioTranscript` degrades to that partial result — the visual
description is kept and the audio branch records a sanitized failure code —
instead of failing the whole video. Per-branch availability, the partial flag,
and the sanitized failure codes are preserved in the described result, in the
guardrail metadata (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), in the result-cache metadata, and in the bridge
fusion counters. The default Video Bridge path does not invoke speech-to-text
or download a second media copy; without that explicit track, it remains
video-only.

**Transcript retention (#12150 P1).** This applies automatically whenever the
Video Bridge (itself opt-in) renders a transcript cue — there is no separate
retention flag. When a request renders any transcript cue (a caller-declared
`transcript` or a fused `audioTranscript`), the guardrail marks it
`videoBridgeObserved` and produces a redacted shadow of the video description —
an identical rendering in which every cue's free-text body is replaced by
`[redacted-video-transcript]`, built by substituting the structured cue field
before the string is assembled (never by parsing the flattened text, so no cue
content — adversarial or ordinary, including bodies containing `]` such as
`[inaudible]`/`[music]` — can survive). The persisted call-log request body swaps
each video-derived text part for that redacted shadow, matched by content
equality; the `fullText` anchor is re-read from the finished pre-call guardrail
payload, so the match still succeeds after later chain guardrails (the PII and
credential maskers, priorities 10/95) rewrite the description text in place and
after system-prompt/handoff/memory injection reshapes the message array. The
body sent upstream to the model is unchanged. An observed request also populates
no durable Memory (both request- and response-derived extraction are skipped),
so the model's own reply cannot echo transcript text into Memory.

Retention surfaces still open, tracked for a follow-up (**P2**, #12430): the raw
pre-guardrail client-request snapshot in the detailed-log artifact;
`previous_response_id` continuation fail-closed; derived-prompt internal
dispatches that embed the transcript inside a synthesized string prompt
(pipeline stages, context-handoff); and the response body / semantic-cache copy
of a model reply that quotes the transcript. These are raw/response-class or
opt-in surfaces outside P1's persisted-request-body + Memory scope.

The internal `/api/modality-bridge/video/drilldown` lifecycle is a separate,
loopback/token-authenticated cache substrate. Every operation also requires a
canonical opaque principal ID. Before a production caller is enabled, it must
derive that ID from the authenticated tenant and must never forward a
client-selected value. Cache keys bind that principal to canonical session and
video-reference IDs, store only their SHA-256-derived keys, and scope both reads
and deletion to the same principal. The cache stores at most 16 derived JPEG
frames per entry, expires them after ten minutes, and supports bounded
`start`/`end` reads or explicit session deletion.

Each principal is limited to 16 entries and 64 MiB of canonical JPEG data. Those
limits are independent from the global 64-entry/256 MiB ceiling: principal quota
pressure evicts only that principal's least-recently-used entries before global
LRU eviction is considered. Expired entries are swept from both principal and
global accounting on cache activity, while cancellation and validation failure do
not commit a partial replacement.

The cache rejects non-canonical Base64, excess padding, non-JPEG media, malformed or
truncated JPEGs, and JPEGs that produce a warning during a bounded full-image `sharp`
decode. It re-encodes each accepted image as a canonical JPEG, derives width and height
from the decoded bytes instead of trusting caller fields, and discards any trailing
polyglot bytes rather than retaining them. Only the bounded canonical compressed buffer
is charged to both quotas. The JSON wire limit includes Base64 overhead for the 32 MiB
decoded-input ceiling. Every
stored derivation records its validated JPEG format/resolution, sampling policy,
derivation version, creation time, server-computed content hash, and hashed parent
reference plus the trusted caller's parent-content hash. Cancellation is checked
between asynchronous decode/hash phases before the atomic cache commit.

This tranche does not yet connect a production producer to the route and does not
provide multi-resolution variant selection. The transparent Video Bridge request
path therefore incurs no added work, while tenant-bound principal derivation and
the full FU-08 multi-resolution lifecycle remain explicit follow-up work rather
than documented as complete behavior.

Frames are captioned sequentially with the configured Video model. An empty
Video override inherits the Vision setting; if both are empty, the Vision
auto-router selects the effective vision-capable model. Successful captions
replace the original part with a stable `[Video description:` prefix that also
marks the text as an untrusted media-derived observation and tells downstream
models not to follow instructions found in the media. Frame-caption cache keys
include the JPEG bytes, prompt, timestamp, and effective model; only successful
captions are cached. Cache entries retain the actual successful producer model,
including a fallback model; the bridge reports `mixed` when different frames
were produced by different models. A cache hit reuses that producer identity
instead of relabeling it as the requested routing plan. The whole-video result
cache is keyed on every input that changes the output — prompt, effective
model, sampling policy, frame count, semantic analysis mode, the SHA-256
fingerprint of the normalized focus hint, focus window, `transcript`,
`audioTranscript`, and the contact-sheet flag — so changing any of those
dimensions is a cache miss, never a stale reuse. The visual dedup policy
version, threshold, and bounded candidate-frame count are also explicit in the
result-cache key and metadata; a policy change therefore cannot reuse a stale
whole-video description. Result-cache v4 metadata keeps the mode and
fingerprint, never the raw user task. Guardrail metadata reports both the
requested and effective analysis modes; a requested `focused` mode without
usable user text is reported as effectively `full`.

The guardrail extracts every supported video part but describes no more than
`modalityBridgeVideoMaxVideos`. For a target proven to have
`supportsVideo === false`, failed and over-limit videos become explicit safe
text markers so no raw video survives. When capability is unknown, those parts
remain untouched. Targets with `supportsVideo === true` bypass the bridge.
The client request abort signal propagates through download, broker queue,
subprocesses, and caption calls; aborts stop between videos and never fail open
to raw media.

Runtime settings are DB-backed and Zod-validated:

| Key                                 | Default     | Range / behavior                                                                                    |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Optional runtime, opt-in                                                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` preserves generic captions; `focused` uses bounded, untrusted latest-user context            |
| `modalityBridgeVideoModel`          | `""`        | Inherit the Vision Bridge model                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, or proportional `segment_aware`; detector failure falls back to `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                      |

Legacy persisted Video timeout values above 120 seconds are clamped to the
broker deadline; new settings writes above that limit are rejected.
`GET /api/modality-bridge/video/runtime` requires trusted stamped loopback
locality before authentication or runtime probing, then requires management
auth. It returns only `available`, sanitized FFmpeg/ffprobe versions, and a fixed
reason when the runtime is unavailable. The internal extraction endpoint is not
a public upload API: queue saturation returns `503` plus `Retry-After`, a caller
disconnect returns `499`, and the fixed broker deadline returns `504`. Converted responses add
`video->text;model=<visionModel>;parts=<videos>` to the central
`x-omniroute-modality-bridge` header without removing Vision or Audio segments.

### PII Masker (`piiMasker.ts`)

Runs on **both** stages.

- **`preCall`** clones the payload, walks `system`, `messages`, `input`, and
  `prompt` (including plain string items), and applies `processPII()` (from
  `@/shared/utils/inputSanitizer`) to string `content`/`text` fields. When
  `PII_REDACTION_ENABLED=true`, detected PII is redacted in the outbound
  payload. This is independent of `INPUT_SANITIZER_MODE` (which only controls
  prompt-injection policy). When redaction is off, the call records detection
  counts without rewriting content.
- **`postCall`** deep-clones the response, runs `sanitizePIIResponse()` plus
  the Responses-API-shape masker (`maskResponsesOutput` — covers
  `output_text` and `output[].content[].text`). If any redaction occurs, the
  modified response replaces the original.

The guardrail never blocks; it only annotates (`meta.detections`,
`meta.redacted`) or rewrites.

### Prompt Injection (`promptInjection.ts`)

Detects adversarial structures in user-supplied content and enforces the
configured policy. Behavior is driven by environment variables and constructor
options:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | When `false`, guardrail short-circuits.                                                                                                                                                  |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Injection policy: `block`, `warn`, or `log`. (`redact` is accepted for back-compat but does **not** strip injection text; request PII rewrite is controlled by `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimum severity required to block. Medium is observe-only at default.                                                                                                                   |

**Mode precedence** (`getMode`): caller `options.mode` →
`INJECTION_GUARD_MODE` **DB feature-flag override** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. A dashboard override therefore wins over the env vars, so the Feature
Flags UI controls the running guard live (no restart). The DB read is fail-safe:
if it errors, the guard falls back to the env-based behavior, and when no
override is set behavior is identical to env-only resolution.

Detection sources:

1. `sanitizeRequest()` from `@/shared/utils/inputSanitizer` (shared detector
   set used elsewhere in the pipeline).
2. Built-in `DEFAULT_GUARD_PATTERNS` (currently `system_override_inline` and
   `markdown_system_block`, both `high` severity).
3. Optional `customPatterns` passed via constructor options (strings, regex,
   or `{ name, pattern, severity }` records).

When `mode === "block"` **and** at least one detection meets the severity
threshold, `preCall` returns `{ block: true, message: "Request rejected:
suspicious content detected" }`. In `warn`/`log` modes the guardrail logs but
allows the call. The shared helper `evaluatePromptInjection()` is also exported
for callers that need to evaluate prompts without going through the registry.

**Scan bound (v3.8.20):** the detector only inspects the **first 16 KB** of
joined prompt text — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bytes) in
`src/shared/utils/inputSanitizer.ts`. Both `detectInjection()` and
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` before running
the pattern loop. Injection directives sit near the top of an input, so this
caps regex CPU/GC on multi-hundred-KB payloads without weakening detection (cf.
#3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Runs on **both** stages, last in the default chain (priority `95`). Redacts
well-known API-key / secret-token patterns from the outbound payload (message
content, tool-call arguments, tool results) **and** the provider response, so a
credential pasted into a prompt (or echoed back by a tool result) is not leaked
to the upstream provider or back to the client.

- **Opt-in only**, same convention as PII redaction (Hard Rule #20-adjacent):
  disabled unless `settings.credentialRedactionEnabled === true` **or**
  `CREDENTIAL_REDACTION_ENABLED=true`. With it off, the guardrail is a no-op —
  it never blocks and never rewrites.
- `redactCredentials()` walks the full payload/response tree (`walkValue()`,
  prototype-pollution-safe, cycle-safe via `WeakSet`) and replaces matches with
  a `[REDACTED:<type>]` placeholder, cloning only the branches that actually
  changed.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud
  keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs,
  credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and
  a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value
  pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`,
  `apikey`) are redacted structurally (value only, scheme prefix like
  `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- The guardrail never blocks; it only rewrites (`modifiedPayload` /
  `modifiedResponse`) and annotates (`meta.credentialsRedacted`, `meta.count`).

Regression guard: `tests/unit/credential-masker-guardrail.test.ts`.

## Base Contract (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

A guardrail signals "no change" by returning either `void`, `{}`, or
`{ block: false }`. Returning a `modifiedPayload`/`modifiedResponse` replaces
the value flowing through the chain for downstream guardrails.
`signal?: AbortSignal` carries the caller lifecycle into guardrails. A request abort is the deliberate fail-open exception: media bridges stop work and cleanup without restoring raw media to a target known not to support it.

## Registry (`registry.ts`)

The singleton `guardrailRegistry` exposes:

- `register(guardrail)` — adds (or replaces by normalized name) a guardrail and
  re-sorts by ascending `priority`.
- `clear()` / `list()` — administrative helpers.
- `runPreCallHooks(payload, context)` — iterates active guardrails, threads the
  payload through `modifiedPayload`, and stops on the first `block: true`.
- `runPostCallHooks(response, context)` — same flow on the response side.
- `resetGuardrailsForTests({ registerDefaults })` — clears state and optionally
  re-registers the defaults for clean test isolation.

Both runners return `{ blocked, payload|response, results, guardrail?, message? }`
where `results` is an array of `GuardrailExecutionResult` records that include
per-guardrail `blocked`, `skipped`, `modified`, `error`, and `meta` fields,
useful for tracing.

### Disabling Guardrails Per-Request

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggregates a
de-duplicated list of guardrail names that should be skipped for the current
request. Sources (all optional, all merged):

- `apiKeyInfo.disabledGuardrails`
- Request body `disabledGuardrails` (top-level)
- Request body `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (or legacy
  `x-disabled-guardrails`)

Values may be arrays of strings or a comma-separated string; names are
normalized to lowercase kebab-case (`pii_masker` → `pii-masker`). The result
is passed through `context.disabledGuardrails` to the registry, which skips
matching guardrails (`skipped: true` in `results`).

## Execution Order

For each request flowing through `src/sse/handlers/chat.ts` and
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` builds the skip list from API key, body,
   and headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` runs guardrails in ascending
   priority order:
   - Disabled guardrails are recorded as `skipped`.
   - Each guardrail's `preCall` may rewrite the payload via `modifiedPayload`.
   - The first `block: true` short-circuits the chain and the handler returns
     a guardrail rejection response.
3. The (potentially rewritten) payload flows into combo routing and upstream
   dispatch.
4. After the response is assembled, `guardrailRegistry.runPostCallHooks(...)`
   runs the same chain on the response. `block: true` here drops the upstream
   response.

Guardrails that throw are recorded with `error: <message>` and logged via
`logger.warn`, but the chain continues — fail-open by design.

## Configuration

Environment variables read by the built-in guardrails:

| Variable                              | Used by                   | Effect                                                                                              |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Set `false` to disable detection entirely.                                                          |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Injection policy: `warn`, `block`, or `log`. Legacy value `redact` does not rewrite injection text. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode for the injection guard; also a DB feature flag that **overrides** the env vars (DB > ENV).    |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimum severity that `MODE=block` rejects: `high` (default), `medium`, or `low`.                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias for `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | When `true`, request PII is redacted (independent of injection mode).                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Controls response-side masker behavior.                                                             |

The Modality Bridge guardrails read runtime config from the DB-backed settings
store (`getSettings()`), not env vars. Vision's primary keys are
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, and
`modalityBridgeCacheMaxEntries`. The legacy
`visionBridge*` keys are accepted only as the documented one-cycle read
fallback; dashboard writes use the primary keys. Defaults and the fallback
resolver live in `src/shared/constants/modalityBridgeDefaults.ts`, with legacy
constants retained in `src/shared/constants/visionBridgeDefaults.ts`.

Audio uses `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, and `modalityBridgeAudioMaxClips`, plus the shared
`modalityBridgeCache*` settings. Audio has no legacy-key fallback because these
keys were introduced with the Modality Bridge schema.

Video uses `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, and
`modalityBridgeVideoTimeout`, plus the shared `modalityBridgeCache*` settings.
It is disabled by default because FFmpeg/ffprobe are optional operational
dependencies and frame captioning adds latency and model cost.

## Custom Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Steps:

1. Create `src/lib/guardrails/myGuardrail.ts` extending `BaseGuardrail`.
2. Implement `preCall` and/or `postCall`.
3. Either register at import time (push from `registerDefaultGuardrails`) or
   call `guardrailRegistry.register(...)` at runtime — the registry replaces
   any prior guardrail with the same normalized name.
4. Add tests under `tests/unit/` (existing examples:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testing

Use `resetGuardrailsForTests()` between tests to start from a known state.
Pass `{ registerDefaults: false }` to start with an empty registry and
register only the guardrails under test. Vision Bridge accepts dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge exposes the
equivalent seams for settings, capabilities, STT model selection, credential
checks, and transcription. Tests can therefore exercise both flows without DB
or network access.

## See Also

- `src/lib/guardrails/` — implementation
- `src/shared/utils/inputSanitizer.ts` — shared detector that powers
  prompt-injection and PII masking
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge defaults and
  forced-bridge model list
- `src/shared/constants/modalityBridgeDefaults.ts` — shared Vision/Audio runtime defaults
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonal layer (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — full env var reference

## Injection-guard route coverage & red-team (Phase 8 · Block D)

The injection-guard (`createInjectionGuard` / `withInjectionGuard`) covers all routes
that accept user prompts. It respects `INJECTION_GUARD_MODE` (default `warn` = log only;
`block` = returns HTTP 400 `SECURITY_001`).

| Type            | Routes                                                                                                                                               | Default mode |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (existing) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generative      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Text extraction (`extractMessageContents`) covers `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** promptfoo validates that each route blocks
the OWASP-LLM corpus in `INJECTION_GUARD_MODE=block`; garak runs probes (skips without secret).
`moderations` is included for consistency — operators in block-mode can exempt it via
`resolveDisabledGuardrails`.

The nightly workflow (`.github/workflows/nightly-llm-security.yml`, cron + manual
dispatch) has two jobs:

- **`promptfoo-guard` (blocking)** — runs `promptfoo eval -c promptfooconfig.yaml`
  with `INJECTION_GUARD_MODE=block`. Each adversarial case (e.g. "ignore all
  previous instructions…", DAN-style jailbreaks) asserts the response carries
  `error.code === "SECURITY_001"`, i.e. the guard actually rejected the request.
- **`garak` (advisory)** — runs garak `--probes promptinject,dan,leakreplay`
  against a local OmniRoute instance (`http://localhost:20128/v1`). Gated on a
  provider secret (`PROMPTFOO_PROVIDER_KEY`); skips gracefully and is suffixed
  `|| true`, so it reports without failing CI.

Coverage of the guard helper (`createInjectionGuard` / `withInjectionGuard`)
spans every prompt-bearing `/v1` route; prompt text is pulled from
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` by
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
