# Task 6.02 — Media Handlers + Responses Transformer

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `open-sse/handlers/imageGeneration.ts` (55.69% → 75%+)
  - `open-sse/handlers/audioSpeech.ts` (54.67% → 75%+)
  - `open-sse/handlers/audioTranscription.ts` (raise uncovered branches and edge cases)
  - `open-sse/handlers/videoGeneration.ts`
  - `open-sse/transformer/responsesTransformer.ts` (53.30% → 80%+)
- **Test files to extend/create**:
  - `tests/unit/image-generation-handler.test.mjs`
  - `tests/unit/audio-speech-handler.test.mjs`
  - `tests/unit/audio-transcription-handler.test.mjs`
  - `tests/unit/video-generation-handler.test.mjs`
  - `tests/unit/responses-transformer.test.mjs`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read all media handlers and `open-sse/transformer/responsesTransformer.ts`
2. Identify which handlers already have seed tests to extend
3. Capture uncovered branches from a fresh `c8 --reporter=text` run

## Focus Areas
- Validation failures, unsupported payload shapes, and empty input branches
- Provider capability mismatch paths
- Streaming vs non-streaming media response normalization
- Response item coercion between Responses API and chat-completions shapes
- Partial usage metadata and malformed content blocks

## Acceptance Criteria
- [ ] All media handlers have at least one error-path assertion and one success-path assertion
- [ ] `responsesTransformer.ts` covers both normalization directions
- [ ] `responsesTransformer.ts` reaches 80%+ lines
- [ ] Media handlers group reaches 75%+ lines
- [ ] No real network calls are required

