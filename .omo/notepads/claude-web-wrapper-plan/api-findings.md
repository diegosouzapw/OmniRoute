# Claude Web API - Reverse Engineered from Network Tab

## Endpoint
```
POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{convId}/completion
```

## Required Headers
| Header | Value |
|--------|-------|
| `accept` | `text/event-stream` |
| `anthropic-client-platform` | `web_claude_ai` |
| `anthropic-device-id` | UUID (must persist per session) |
| `content-type` | `application/json` |
| `Referer` | `https://claude.ai/new` |

## Required Cookies (full set)
- `sessionKey` - Main auth token (sk-ant-sid-...)
- `routingHint` - Anthropic routing hint (sk-ant-rh-...)
- `cf_clearance` - **Cloudflare Turnstile clearance** (critical!)
- `__cf_bm` - Cloudflare bot management
- `_cfuvid` - Cloudflare visitor ID
- `anthropic-device-id` (cookie version)
- Various session cookies (g_state, _dd_s, etc.)

## Request Body
```json
{
  "prompt": "user message",
  "model": "claude-sonnet-4-6",
  "timezone": "Asia/Jakarta",
  "locale": "en-US",
  "personalized_styles": [{ "type": "default", ... }],
  "tools": [ 5 tool definitions including show_widget, read_me, web_search, artifacts, repl ],
  "turn_message_uuids": { "human_message_uuid": "...", "assistant_message_uuid": "..." },
  "attachments": [],
  "files": [],
  "sync_sources": [],
  "rendering_mode": "messages",
  "create_conversation_params": { "name": "", "model": "...", "is_temporary": false }
}
```

## Key Insights
1. **NO /api/append_message endpoint** - The real endpoint is organization-scoped
2. **Org ID required** - Must be fetched or provided (aec600ed-595c-4a0e-b555-aa5930bc7e49)
3. **Conversation ID required** - Each chat is a conversation
4. **cf_clearance** - Without it, Cloudflare blocks ALL requests. Short-lived (~few hours)
5. **Tools array** - Must include all 5 tools or Claude won't have full capabilities
6. **turn_message_uuids** - Tracks user/assistant message pairing
7. **Model** - Latest is "claude-sonnet-4-6"
