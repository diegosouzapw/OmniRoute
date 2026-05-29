# Claude Web Executor Update - Learnings

## 1. API Discovery
- Real Claude Web API endpoint is dynamic: `/api/organizations/{orgId}/chat_conversations/{convId}/completion`
- NOT the old `/api/append_message` endpoint that was in original code
- Requires both organization ID and conversation ID in URL path

## 2. Required Headers
- `anthropic-client-platform: web_claude_ai` (Anthropic-specific)
- `anthropic-device-id: {uuid}` (device tracking)
- `Referer: https://claude.ai/new` (important for CORS)
- Standard browser headers (Accept, User-Agent, etc.)

## 3. Cookie Requirements
- Main auth: `sessionKey` cookie
- Cloudflare protection: `cf_clearance`, `__cf_bm`, `_cfuvid`
- Additional: `routingHint` for Anthropic routing
- **NOTE**: `cf_clearance` is REQUIRED - it's Cloudflare Turnstile clearance

## 4. Request Body Format - Complex Structure
The real API requires a FULL request object with:
- `prompt`: User message text
- `model`: claude-sonnet-4-6, etc.
- `timezone`: "Asia/Jakarta" or user's timezone
- `locale`: "en-US"
- `personalized_styles`: Array with single "normal" style
- `tools`: Array with 5 tool definitions (show_widget, read_me, web_search, artifacts, repl)
- `turn_message_uuids`: UUID pair (human + assistant)
- `rendering_mode: "messages"`
- `create_conversation_params`: Metadata for conversation creation
- Empty: `attachments`, `files`, `sync_sources`

## 5. Executor Return Type Pattern
Executors must return:
```typescript
{
  response: Response,
  url: string,
  headers: Record<string, string>,
  transformedBody: unknown
}
```
NOT returning just the response object!

## 6. Stream Format
- Server-sent events format
- Each line: `data: {JSON}`
- Chunks contain `completion` or `delta.text` fields
- `stop_reason: "end_turn"` indicates completion
- Ends with `data: [DONE]`

## 7. Conversation Management
- Organization ID retrieved from `/api/organizations` endpoint
- Conversation ID either provided or generated as UUID
- If no orgId retrieved, fallback to new conversation creation
- URL adjusts based on which IDs are available

## 8. Error Handling
- 401: Session expired or invalid
- 429: Rate limited
- Other: Upstream API error
- All errors return Response object with error JSON

## 9. Key Differences from Original
- Original used simple `append_message` endpoint
- Original had minimal request body
- Real API requires extensive configuration
- Real API needs proper device tracking
- Real API has strict Cloudflare protection

## 10. Tool Integration
Tools are fully specified with:
- MCP apps (show_widget, read_me) with full JSON schemas
- Built-in tools (web_search, artifacts, repl) with type system
- All tools are required in request for feature availability

## 11. Executor Return Pattern Discovery
- Learned that ALL executors return: `{ response, url, headers, transformedBody }`
- This is NOT in the TypeScript types but is the de facto standard
- Checked perplexity-web.ts executor as reference
- Applied consistently to claude-web.ts

## 12. Integration Points
- Executor integration: Works with BaseExecutor pattern
- Provider wrapper integration: Provides types and constants for other systems
- Cookie handling: Uses existing `normalizeSessionCookieHeader` utility
- Error responses: Proper HTTP status codes and JSON error format

## 13. Stream Parsing Logic
- Handles SSE format: "data: {JSON}\n\n"
- Extracts completion text from multiple possible fields:
  - Direct `completion` field
  - Nested `delta.text` field
  - Both formats supported for flexibility
- Stops at `[DONE]` marker
- Gracefully handles unparseable chunks with warnings
