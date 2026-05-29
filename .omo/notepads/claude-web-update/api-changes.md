# Claude Web API Changes Summary

## Files Updated

### 1. `/open-sse/executors/claude-web.ts` ✅
**Status**: Complete rewrite  
**Lines**: 719 (from 592)

#### Key Changes:
- **Endpoint**: Changed from `/api/append_message` to dynamic `/organizations/{orgId}/chat_conversations/{convId}/completion`
- **Headers**: Added `anthropic-client-platform`, `anthropic-device-id`, proper `Referer`
- **Request Body**: Complete rewrite to match real API format
  - Added `timezone`, `locale`, `personalized_styles`
  - Added `tools` array with 5 tool definitions
  - Added `turn_message_uuids` UUID pair generation
  - Added `rendering_mode: "messages"`
  - Added `create_conversation_params` metadata
- **Credentials**: Extended to include `deviceId`, `orgId`, `conversationId`
- **Organization Handling**: Added `getOrganizationId()` helper to fetch org from `/api/organizations`
- **UUID Generation**: Using `randomUUID()` for message tracking
- **Return Type**: Fixed to return `{ response, url, headers, transformedBody }`

#### New Functions:
- `generateMessageUUIDs()`: Creates UUID pairs for message tracking
- `getDefaultTools()`: Returns 5 tool definitions with full schemas
- `getDefaultPersonalizedStyle()`: Returns default communication style
- `getOrganizationId()`: Fetches organization ID from session

#### Type Safety:
- Full TypeScript types for `ClaudeWebRequestPayload`
- Full TypeScript types for `ClaudeWebStreamChunk`
- Proper error responses with correct status codes

### 2. `/src/lib/providers/wrappers/claudeWeb.ts` ✅
**Status**: Updated interfaces and API info

#### Key Changes:
- **ClaudeWebConfig**: Extended with `deviceId`, `orgId`, `conversationId`
- **ClaudeWebRequest**: Expanded to match full real API format
- **ClaudeWebResponse**: Added `delta` field for streaming chunks
- **ClaudeWebStreamingChunk**: Added `delta` support
- **CLAUDE_WEB_API_INFO**: Updated with:
  - `chatPathTemplate` for dynamic URL pattern
  - `organizationsPath` endpoint reference
  - `sessionPath` for auth verification
  - `requiredHeaders` object with Anthropic headers
  - `requiredCookies` array listing all needed cookies
  
#### Documentation:
- Added comprehensive JSDoc comments
- Documented real API endpoint format
- Documented authentication requirements
- Documented Cloudflare Turnstile clearance requirement

## Verification Results

### TypeScript Compilation
```
✅ open-sse/executors/claude-web.ts - No errors
✅ src/lib/providers/wrappers/claudeWeb.ts - No errors
```

## Next Steps (If Needed)

1. **Integration Testing**: Test with real Claude Web session
2. **Cookie Management**: Ensure cf_clearance cookie is properly handled
3. **Organization ID Caching**: Consider caching org ID per session
4. **Device ID Persistence**: Store device ID across sessions
5. **Error Response Handling**: Validate error responses in production

## API Compatibility Notes

- **Breaking Change**: Old `/append_message` endpoint no longer used
- **Authentication**: Now requires Cloudflare clearance cookies
- **Session Format**: Device ID now required for device tracking
- **Tool System**: Tools must be fully specified for feature access
- **Streaming**: Stream format remains compatible (SSE)

## Security Considerations

- ⚠️ **cf_clearance Cookie**: Required for Cloudflare protection
  - Indicates passing Turnstile CAPTCHA
  - Must be included in all requests
  - Expires after some time, needs refresh
  
- ⚠️ **Device ID**: Tracks sessions across requests
  - Should be persisted in credentials
  - Unique per device/browser

- ⚠️ **Session Cookie**: Standard sessionKey auth
  - Subject to expiration
  - Validation via `/auth/session` endpoint
