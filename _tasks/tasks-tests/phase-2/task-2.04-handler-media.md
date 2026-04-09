# Task 2.04 — Test: Media Handlers (Embeddings, Images, Audio)

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/handlers/embeddings.ts`, `open-sse/handlers/imageGeneration.ts`, `open-sse/handlers/audioSpeech.ts`, `open-sse/handlers/audioTranscription.ts`, `open-sse/handlers/videoGeneration.ts`, `open-sse/handlers/musicGeneration.ts`
- **Test files to create**: One per handler in `tests/unit/`
- **Estimated assertions**: ~40

## Pre-requisites
1. Read each handler source file
2. Read existing: `tests/unit/nanobanana-image-generation.test.mjs`, `tests/unit/nanobanana-image-handler.test.mjs`
3. Read config registries: `open-sse/config/embeddingRegistry.ts`, `open-sse/config/imageRegistry.ts`, `open-sse/config/audioRegistry.ts`

## Test Scenarios Per Handler (~6-8 each)

### embeddings.ts
```
1. Provider routing based on model prefix
2. Input normalization (string vs array)
3. Response format: { data: [{ embedding: [...] }], usage }
4. Error handling for unsupported provider
5. Dimension parameter passthrough
6. Model name extraction from prefix/model format
```

### imageGeneration.ts
```
1. Provider routing (DALL-E, SD, NanoBanana, ComfyUI, etc.)
2. Size parameter → aspect ratio mapping
3. Response format: { data: [{ url/b64_json }] }
4. Quality/style parameter passthrough
5. n (count) parameter
6. Error: unsupported provider
7. Error: invalid size format
```

### audioSpeech.ts
```
1. Provider routing (ElevenLabs, Cartesia, PlayHT)
2. Voice parameter mapping
3. Output format handling (mp3, opus, aac)
4. Speed parameter
5. Error: missing input text
6. Streaming audio response
```

### audioTranscription.ts
```
1. Provider routing (Deepgram, AssemblyAI)
2. File upload handling
3. Language parameter
4. Response format (json, text, srt)
5. Error: missing audio file
6. Model-specific options
```

### videoGeneration.ts + musicGeneration.ts
```
Each: 3-4 tests covering routing, params, response format, errors
```

## Acceptance Criteria
- [ ] All handler test files created
- [ ] ~40 total assertions pass
- [ ] handlers/ coverage improves to ≥ 65%
