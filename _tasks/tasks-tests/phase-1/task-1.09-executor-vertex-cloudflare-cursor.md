# Task 1.09 — Test: Vertex, Cloudflare AI, Cursor Executors

## Metadata
- **Phase**: 1
- **Source files**:
  - `open-sse/executors/vertex.ts`
  - `open-sse/executors/cloudflare-ai.ts`
  - `open-sse/executors/cursor.ts`
- **Test files to create**:
  - `tests/unit/executor-vertex-extended.test.mjs`
  - `tests/unit/executor-cloudflare-ai.test.mjs`
  - `tests/unit/executor-cursor-extended.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~35

## Pre-requisites
1. Read each executor source file
2. Read `tests/unit/t29-vertex-sa-json-executor.test.mjs` for existing Vertex patterns
3. Read `open-sse/utils/cursorChecksum.ts` and `open-sse/utils/cursorProtobuf.ts` for Cursor

## Test Scenarios

### vertex.ts (~15 tests)
```
1. buildUrl with project ID and location
2. buildUrl with model name and streaming flag
3. Service account JSON credentials parsing
4. OAuth token generation from SA JSON
5. Headers with Bearer token
6. Vertex-specific model list validation
7. Model name includes org/ prefix handling
8. transformRequest: body adaptation for Vertex
9. Non-GCP endpoint URL construction
10. refreshCredentials with SA JSON
11. Error handling for invalid SA JSON
12. Regional endpoint selection (us-central1 vs europe-west1)
13. Gemini models on Vertex (different URL pattern)
14. Claude models on Vertex (Anthropic endpoint)
15. Edge case: missing project ID
```

### cloudflare-ai.ts (~10 tests)
```
1. buildUrl with account ID and model name
2. API token authorization header
3. transformRequest body normalization
4. Streaming response handling
5. Non-streaming response
6. Model name mapping (cf/model-name)
7. Error response format
8. Missing account ID error
9. Custom gateway URL
10. Rate limit header handling
```

### cursor.ts (~10 tests)
```
1. buildUrl for Cursor API endpoint
2. Checksum computation and header
3. Machine ID header
4. Session key handling
5. Protobuf request encoding
6. Headers with authorization
7. transformRequest: content mapping
8. Model name mapping for Cursor
9. Streaming: protobuf chunk decoding
10. Error response handling
```

## Testing Approach

Mock `fetch` for all HTTP calls. For Vertex, mock `google-auth-library` functions. For Cursor, mock the protobuf encoding utilities.

## Acceptance Criteria
- [ ] All 35 assertions pass
- [ ] 3 test files created
- [ ] Combined executor coverage improves to ≥ 55%
