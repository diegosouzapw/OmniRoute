# Troubleshooting

Common problems and solutions for OmniRoute.

---

## Quick Fixes

| Problem                       | Solution                                                           |
| ----------------------------- | ------------------------------------------------------------------ |
| First login not working       | Check `INITIAL_PASSWORD` in `.env` (default: `123456`)             |
| Dashboard opens on wrong port | Set `PORT=20128` and `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| No request logs under `logs/` | Set `ENABLE_REQUEST_LOGS=true`                                     |

---

## Provider Issues

### "Language model did not provide messages"

**Cause:** Provider quota exhausted.

**Fix:**

1. Check dashboard quota tracker
2. Use a combo with fallback tiers
3. Switch to cheaper/free tier

### Rate Limiting

**Cause:** Subscription quota exhausted.

**Fix:**

- Add fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Use GLM/MiniMax as cheap backup

### OAuth Token Expired

OmniRoute auto-refreshes tokens. If issues persist:

1. Dashboard → Provider → Reconnect
2. Delete and re-add the provider connection

---

## Cloud Issues

### Cloud Sync Errors

1. Verify `BASE_URL` points to your running instance (e.g., `http://localhost:20128`)
2. Verify `CLOUD_URL` points to your cloud endpoint (e.g., `https://omniroute.dev`)
3. Keep `NEXT_PUBLIC_*` values aligned with server-side values

### Cloud `stream=false` Returns 500

**Symptom:** `Unexpected token 'd'...` on cloud endpoint for non-streaming calls.

**Cause:** Upstream returns SSE payload while client expects JSON.

**Workaround:** Use `stream=true` for cloud direct calls. Local runtime includes SSE→JSON fallback.

### Cloud Says Connected but "Invalid API key"

1. Create a fresh key from local dashboard (`/api/keys`)
2. Run cloud sync: Enable Cloud → Sync Now
3. Old/non-synced keys can still return `401` on cloud

---

## Docker Issues

### CLI Tool Shows Not Installed

1. Check runtime fields: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. For portable mode: use image target `runner-cli` (bundled CLIs)
3. For host mount mode: set `CLI_EXTRA_PATHS` and mount host bin directory as read-only
4. If `installed=true` and `runnable=false`: binary was found but failed healthcheck

### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Check usage stats in Dashboard → Usage
2. Switch primary model to GLM/MiniMax
3. Use free tier (Gemini CLI, iFlow) for non-critical tasks
4. Set cost budgets per API key: Dashboard → API Keys → Budget

---

## Debugging

### Enable Request Logs

Set `ENABLE_REQUEST_LOGS=true` in your `.env` file. Logs appear under `logs/` directory.

### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Main state: `${DATA_DIR}/db.json` (providers, combos, aliases, keys, settings)
- Usage: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Request logs: `<repo>/logs/...` (when `ENABLE_REQUEST_LOGS=true`)

---

## Circuit Breaker Issues

### Provider stuck in OPEN state

When a provider's circuit breaker is OPEN, requests are blocked until the cooldown expires.

**Fix:**

1. Go to **Dashboard → Settings → Resilience**
2. Check the circuit breaker card for the affected provider
3. Click **Reset All** to clear all breakers, or wait for the cooldown to expire
4. Verify the provider is actually available before resetting

### Provider keeps tripping the circuit breaker

If a provider repeatedly enters OPEN state:

1. Check **Dashboard → Health → Provider Health** for the failure pattern
2. Go to **Settings → Resilience → Provider Profiles** and increase the failure threshold
3. Check if the provider has changed API limits or requires re-authentication
4. Review latency telemetry — high latency may cause timeout-based failures

---

## Audio Transcription Issues

### "Unsupported model" error

- Ensure you're using the correct prefix: `deepgram/nova-3` or `assemblyai/best`
- Verify the provider is connected in **Dashboard → Providers**

### Transcription returns empty or fails

- Check supported audio formats: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verify file size is within provider limits (typically < 25MB)
- Check provider API key validity in the provider card

---

## Translator Debugging

Use **Dashboard → Translator** to debug format translation issues:

| Mode             | When to Use                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Playground**   | Compare input/output formats side by side — paste a failing request to see how it translates |
| **Chat Tester**  | Send live messages and inspect the full request/response payload including headers           |
| **Test Bench**   | Run batch tests across format combinations to find which translations are broken             |
| **Live Monitor** | Watch real-time request flow to catch intermittent translation issues                        |

### Common format issues

- **Thinking tags not appearing** — Check if the target provider supports thinking and the thinking budget setting
- **Tool calls dropping** — Some format translations may strip unsupported fields; verify in Playground mode
- **System prompt missing** — Claude and Gemini handle system prompts differently; check translation output
- **SDK returns raw string instead of object** — Fixed in v1.1.0: response sanitizer now strips non-standard fields (`x_groq`, `usage_breakdown`, etc.) that cause OpenAI SDK Pydantic validation failures
- **GLM/ERNIE rejects `system` role** — Fixed in v1.1.0: role normalizer automatically merges system messages into user messages for incompatible models
- **`developer` role not recognized** — Fixed in v1.1.0: automatically converted to `system` for non-OpenAI providers
- **`json_schema` not working with Gemini** — Fixed in v1.1.0: `response_format` is now converted to Gemini's `responseMimeType` + `responseSchema`

---

## Resilience Settings

### Auto rate-limit not triggering

- Auto rate-limit only applies to API key providers (not OAuth/subscription)
- Verify **Settings → Resilience → Provider Profiles** has auto-rate-limit enabled
- Check if the provider returns `429` status codes or `Retry-After` headers

### Tuning exponential backoff

Provider profiles support these settings:

- **Base delay** — Initial wait time after first failure (default: 1s)
- **Max delay** — Maximum wait time cap (default: 30s)
- **Multiplier** — How much to increase delay per consecutive failure (default: 2x)

### Anti-thundering herd

When many concurrent requests hit a rate-limited provider, OmniRoute uses mutex + auto rate-limiting to serialize requests and prevent cascading failures. This is automatic for API key providers.

---

## Still Stuck?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architecture**: See [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for internal details
- **API Reference**: See [`docs/API_REFERENCE.md`](API_REFERENCE.md) for all endpoints
- **Health Dashboard**: Check **Dashboard → Health** for real-time system status
- **Translator**: Use **Dashboard → Translator** to debug format issues
