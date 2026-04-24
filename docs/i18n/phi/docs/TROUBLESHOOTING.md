# Troubleshooting (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇧🇩 [bn](../../bn/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇮🇷 [fa](../../fa/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇮🇳 [gu](../../gu/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇮🇳 [mr](../../mr/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇰🇪 [sw](../../sw/docs/TROUBLESHOOTING.md) · 🇮🇳 [ta](../../ta/docs/TROUBLESHOOTING.md) · 🇮🇳 [te](../../te/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇵🇰 [ur](../../ur/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md)

---

Common problems and solutions for OmniRoute.

---

## Quick Fixes

| Problem                                             | Solution                                                                                                                                                 |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First login not working                             | Set `INITIAL_PASSWORD` in `.env` (no hardcoded default)                                                                                                  |
| Dashboard opens on wrong port                       | Set `PORT=20128` and `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                       |
| No logs written to disk                             | Set `APP_LOG_TO_FILE=true` and verify call log capture is enabled                                                                                        |
| EACCES: permission denied                           | Set `DATA_DIR=/path/to/writable/dir` to override `~/.omniroute`                                                                                          |
| Routing strategy not saving                         | Update to v1.4.11+ (Zod schema fix for settings persistence)                                                                                             |
| Login crash / blank page                            | Check Node.js version — see [Node.js Compatibility](#nodejs-compatibility) below                                                                         |
| `dlopen` / `slice is not valid mach-o file` (macOS) | Run `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — see [macOS native module rebuild](#macos-native-module-rebuild) below |
| Proxy "fetch failed"                                | Ensure proxy config is set at the correct level — see [Proxy Issues](#proxy-issues) below                                                                |

---

## Node.js Compatibility

<a name="nodejs-compatibility"></a>

### Login page crashes or shows "Module self-registration" error

**Cause:** You are running a Node.js version outside OmniRoute's approved secure runtime floor. The most common case is running an older Node 20, 22, or 24 patch level that falls below the patched security floor OmniRoute requires.

**Symptoms:**

- Login page shows a blank screen or a server error
- Console shows `Error: Module did not self-register` or similar native binding errors
- The login page shows an **orange warning banner** with your Node version if the runtime is outside the supported secure policy

**Fix:**

1. Install a supported Node.js LTS release (recommended: Node.js 24.x):
   ```bash
   nvm install 24
   nvm use 24
   ```
2. Verify your version: `node --version` should show `v24.0.0` or newer on the 24.x LTS line
3. Reinstall OmniRoute: `npm install -g omniroute`
4. Restart: `omniroute`

> **Supported secure versions:** `>=20.20.2 <21`, `>=22.22.2 <23`, or `>=24.0.0 <25`. Node.js 24.x LTS (Krypton) is fully supported.

### macOS: `dlopen` / "slice is not valid mach-o file"

<a name="macos-native-module-rebuild"></a>

**Cause:** After a global `npm install -g omniroute`, the `better-sqlite3` native binary inside the package may have been compiled for a different architecture or Node.js ABI than what is running locally. This is common on macOS (both Apple Silicon and Intel) when the pre-built binary does not match your environment.

**Symptoms:**

- Server fails immediately on startup with a `dlopen` error
- Error contains `slice is not valid mach-o file`
- Full example:

```
dlopen(/Users/<user>/.nvm/versions/node/v24.14.1/lib/node_modules/omniroute/app/node_modules/better-sqlite3/build/Release/better_sqlite3.node, 0x0001): tried: '...' (slice is not valid mach-o file)
```

**Fix — rebuild for your local environment (no Node.js downgrade required):**

```bash
cd $(npm root -g)/omniroute/app
npm rebuild better-sqlite3
omniroute
```

> **Note:** This recompiles the native binding against your local Node.js version and CPU architecture, resolving the binary mismatch. The officially supported range is **`>=20.20.2 <21`, `>=22.22.2 <23`, or `>=24.0.0 <25`** (`engines` field in `package.json`). Node.js 24.x LTS (Krypton) is fully supported with `better-sqlite3` v12.x.

---

## Proxy Issues

<a name="proxy-issues"></a>

### Provider validation shows "fetch failed"

**Cause:** The API key validation endpoint (`POST /api/providers/validate`) was previously bypassing proxy configuration, causing failures in environments that require proxy routing.

**Fix (v3.5.5+):** This is now fixed. Provider validation routes through `runWithProxyContext`, honoring provider-level and global proxy settings automatically.

### Token health check fails with "fetch failed"

**Cause:** Background OAuth token refresh was not resolving proxy configuration per connection.

**Fix (v3.5.5+):** The token health check scheduler now resolves proxy config per connection before attempting refresh. Update to v3.5.5+.

### SOCKS5 proxy returns "invalid onRequestStart method"

**Cause:** On Node.js 22, the undici@8 dispatcher is incompatible with Node's built-in `fetch()` implementation.

**Fix (v3.5.5+):** OmniRoute now uses undici's own `fetch()` function when a proxy dispatcher is active, ensuring consistent behavior. Update to v3.5.5+.

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
3. Use free tier (Gemini CLI, Qoder) for non-critical tasks
4. Set cost budgets per API key: Dashboard → API Keys → Budget

---

## Debugging

### Enable Log Files

Set `APP_LOG_TO_FILE=true` in your `.env` file. Application logs are written under `logs/`.
Request artifacts are stored under `${DATA_DIR}/call_logs/` when the call log pipeline is
enabled in settings.

### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Main state: `${DATA_DIR}/storage.sqlite` (providers, combos, aliases, keys, settings)
- Usage: SQLite tables in `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + optional `${DATA_DIR}/call_logs/`
- Application logs: `<repo>/logs/...` (when `APP_LOG_TO_FILE=true`)
- Call log artifacts: `${DATA_DIR}/call_logs/YYYY-MM-DD/...` when the call log pipeline is enabled

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

## Optional RAG / LLM failure taxonomy (16 problems)

Some OmniRoute users place the gateway in front of RAG or agent stacks. In those setups it is common to see a strange pattern: OmniRoute looks healthy (providers up, routing profiles ok, no rate limit alerts) but the final answer is still wrong.

In practice these incidents usually come from the downstream RAG pipeline, not from the gateway itself.

If you want a shared vocabulary to describe those failures you can use the WFGY ProblemMap, an external MIT license text resource that defines sixteen recurring RAG / LLM failure patterns. At a high level it covers:

- retrieval drift and broken context boundaries
- empty or stale indexes and vector stores
- embedding versus semantic mismatch
- prompt assembly and context window issues
- logic collapse and overconfident answers
- long chain and agent coordination failures
- multi agent memory and role drift
- deployment and bootstrap ordering problems

The idea is simple:

1. When you investigate a bad response, capture:
   - user task and request
   - route or provider combo in OmniRoute
   - any RAG context used downstream (retrieved documents, tool calls, etc)
2. Map the incident to one or two WFGY ProblemMap numbers (`No.1` … `No.16`).
3. Store the number in your own dashboard, runbook, or incident tracker next to the OmniRoute logs.
4. Use the corresponding WFGY page to decide whether you need to change your RAG stack, retriever, or routing strategy.

Full text and concrete recipes live here (MIT license, text only):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

You can ignore this section if you do not run RAG or agent pipelines behind OmniRoute.

---

## Still Stuck?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architecture**: See [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) for internal details
- **API Reference**: See [`docs/API_REFERENCE.md`](API_REFERENCE.md) for all endpoints
- **Health Dashboard**: Check **Dashboard → Health** for real-time system status
- **Translator**: Use **Dashboard → Translator** to debug format issues
