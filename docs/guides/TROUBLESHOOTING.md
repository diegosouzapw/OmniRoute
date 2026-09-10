---
title: "Troubleshooting"
version: 3.8.49
lastUpdated: 2026-07-15
---

# Troubleshooting

> **For Users**: Looking for quick fixes? See the [Quick Reference](#quick-reference) below.

🌐 **Languages:** 🇺🇸 [English](./TROUBLESHOOTING.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/TROUBLESHOOTING.md) | 🇦🇿 [Azərbaycan dili](../i18n/az/docs/guides/TROUBLESHOOTING.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/TROUBLESHOOTING.md) | 🇧🇩 [বাংলা](../i18n/bn/docs/guides/TROUBLESHOOTING.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/TROUBLESHOOTING.md) | 🇪🇸 [Español](../i18n/es/docs/guides/TROUBLESHOOTING.md) | 🇮🇷 [فارسی](../i18n/fa/docs/guides/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/TROUBLESHOOTING.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [ગુજરાતી](../i18n/gu/docs/guides/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../i18n/hi/docs/guides/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [मराठी](../i18n/mr/docs/guides/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/TROUBLESHOOTING.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/TROUBLESHOOTING.md) | 🇰🇪 [Kiswahili](../i18n/sw/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [தமிழ்](../i18n/ta/docs/guides/TROUBLESHOOTING.md) | 🇮🇳 [తెలుగు](../i18n/te/docs/guides/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/TROUBLESHOOTING.md) | 🇹🇷 [Türkçe](../i18n/tr/docs/guides/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/TROUBLESHOOTING.md) | 🇵🇰 [اردو](../i18n/ur/docs/guides/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/TROUBLESHOOTING.md) | 🇹🇼 [中文 (繁體)](../i18n/zh-TW/docs/guides/TROUBLESHOOTING.md)

Common problems and solutions for OmniRoute.

---

## Quick Reference

**New to OmniRoute?** Start here — these solve 90% of problems:

| I see this              | What it means                       | What to do                                                                                        |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| "Can't connect"         | OmniRoute isn't running             | Run `omniroute` or `docker restart omniroute`                                                     |
| "Invalid API key"       | Your key is wrong or expired        | Re-copy the key from the provider's website                                                       |
| "Rate limit exceeded"   | You're sending too many requests    | Wait 1 minute, or use `model: "auto"` for automatic fallback                                      |
| "Quota exceeded"        | You've used up your free/paid quota | Connect more providers, or use free providers (Kiro, Pollinations)                                |
| "Slow responses"        | Provider is busy or far away        | Use `model: "auto/fast"` or connect a faster provider (Groq, Cerebras)                            |
| "Wrong provider used"   | `auto` picked a different provider  | That's normal! `auto` picks the best one. Force a specific provider with `model: "openai/gpt-4o"` |
| "502 Bad Gateway"       | Provider is down                    | Wait and retry, or use `model: "auto"` to switch providers                                        |
| "401 Unauthorized"      | Your credentials are wrong          | Check your API key or re-authenticate with OAuth                                                  |
| "429 Too Many Requests" | Rate limited                        | Wait 1 minute, or connect more providers                                                          |

**Still stuck?** See the [detailed troubleshooting](#detailed-troubleshooting) below, or ask on [Discord](https://discord.gg/U47eFqAXCn).

---

## Detailed Troubleshooting

---

### Rate Limiting on Free Providers (429 / 400 / 401)

**Symptom**: When using `model: "auto"` with free/no-auth providers (opencode, auggie, etc.), you intermittently get `HTTP 429`, `400`, or `401` instead of answers. The requests succeed when retrying the same prompt moments later, but automation (cron jobs, agents, scripts) breaks on the first failure.

**Root cause**: Three independent failure modes stack up:

1. **Provider rate-limit (`429`)**: Free tiers can enforce a per-window quota. A burst of parallel calls exhausts it, so the next request is refused until the window resets.
2. **Broken model in passthrough (`400`/`401`)**: `auto/*` pools can include passthrough models from `opencode` that are registered in the catalog but have no live credentials (e.g. `oc/north-mini-code-free` → `401`). The auto-router tries one, fails, and the error propagates before fallback kicks in.
3. **Concurrency amplification (`429` under load)**: When multiple agent/cron sessions hit `auto` at once, the aggregate request rate exceeds what free providers tolerate, so legitimate calls get flagged as abusive.

**Verified fix (community-reported, 2026-08-10)**: tune three environment variables so that rotation, concurrency, and fallback absorb the free-tier churn instead of dying on it:

```bash
export OMNIROUTE_ROTATE_ON_400=true           # hop to another model/provider on 400/401 (skips broken passthrough models)
export OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT=4   # explicit heavyweight admission ceiling (unset by default: no request-count cap, see note below)
export OMNIROUTE_CHAT_ADMISSION_QUEUE_MS=5000 # longer bounded wait for heavyweight capacity instead of an immediate retryable 503
```

Set these in the OmniRoute process environment (the daemon, e.g. via the LaunchAgent plist or `systemctl edit`), then restart OmniRoute. The rotation flag is the single highest-leverage lever: it converts a hard failure into a transparent retry against a healthy provider in the pool.

**Note**: `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` caps how many heavyweight — long-context — requests run at once; the bound is an admission gate, not a provider rate limiter. **#503-fanout update:** this var is no longer set by default (it now binds only when explicitly configured, as above) — heavyweight admission is instead gated by an auto-derived byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) that scales itself from the host's real memory ceiling, so a fresh deployment should see far fewer `503 chat_admission_busy` rejects without setting this var at all; explicitly setting it here still works exactly as documented. Explicit byte-budget overrides clamp to 8 MiB–2 GiB. A `413 body_exceeds_budget` is not transient: increase that byte budget, lower `OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES`, or increase the process memory ceiling. An `inflight_bytes_budget` shed is temporary contention and remains retryable. The per-provider rate limiting (`open-sse/services/rateLimitManager.ts`) is governed separately by `RATE_LIMIT_MAX_WAIT_MS`, `RATE_LIMIT_MAX_QUEUE_DEPTH`, and `RATE_LIMIT_AUTO_ENABLE` — see `.env.example`.

**How to verify it worked**: run your agent/cron twice in quick succession and confirm both succeed. Before the fix, the second run typically throws `429`/`401`. After the fix, failures (if any) are retried transparently and the call completes. You can also `curl /monitoring/health` and watch the `rateLimitedUntil` field on the provider connections and the `circuitBreakers.providerBreakers[].state` for the affected providers — the state is one of `CLOSED`, `DEGRADED`, `OPEN`, or `HALF_OPEN` (see `src/shared/utils/circuitBreaker.ts`), and a provider that keeps failing will flip `CLOSED → DEGRADED → OPEN` before the reset window lets a probe through (`HALF_OPEN`).

**If you still see 429**: the active account for that provider has genuinely exhausted its _quota_ (not just rate). Add a second account for the same provider in the OmniRoute dashboard → Providers → Accounts, or mix in another free provider (e.g. `routeway`, `auggie`). Rotation only helps with transient rate/400/401; a hard quota exhaustion requires a second credential or a different provider.

**If you see 403 on vision models (`auto/vision`, `bazaarlink/*`)**: the connected account lacks a paid plan that includes vision, or the API key has insufficient permissions. Verify in the provider dashboard that the key scope includes vision/multimodal, or connect a paid tier account and keep it as the vision target.

---

## npm install Warnings (ERESOLVE / peer / deprecated)

When you run `npm install -g omniroute`, you may see a wall of warnings like `npm warn ERESOLVE`, peer-dependency notices, and `deprecated` messages. **These are expected and harmless.** Your install succeeded if you see `added <N> packages` in the output.

The warnings come from stale peer-dependency ranges in third-party packages OmniRoute doesn't control:

1. **`marked-terminal` wants `marked >=1 <16`, found `marked@18`** — works fine in practice; the upstream peer range is just stale.
2. **`deprecated prebuild-install@7.1.3`** — a transitive native-binary fetch helper. It is not
   used to install the pinned `wreq-js` transport binding and does not indicate that web-cookie
   provider transport setup failed.

**No action needed** — the warnings cannot be fully silenced without forking upstream packages.

---

## Quick Fixes

| Problem                                                    | Solution                                                                                                                                                  |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First login not working                                    | Set `INITIAL_PASSWORD` in `.env` (no hardcoded default)                                                                                                   |
| Dashboard opens on wrong port                              | Set `PORT=20128` and `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                                                                                        |
| No logs written to disk                                    | Set `APP_LOG_TO_FILE=true` and verify call log capture is enabled                                                                                         |
| EACCES: permission denied                                  | Set `DATA_DIR=/path/to/writable/dir` to override `~/.omniroute`                                                                                           |
| Routing strategy not saving                                | Update to the latest v3.x release (Zod schema fix for settings persistence shipped in earlier versions)                                                   |
| Login crash / blank page                                   | Check Node.js version — see [Node.js Compatibility](#nodejs-compatibility) below                                                                          |
| `dlopen` / `slice is not valid mach-o file` (macOS)        | Run `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` — see [macOS native module rebuild](#macos-native-module-rebuild) below  |
| Proxy "fetch failed"                                       | Ensure proxy config is set at the correct level — see [Proxy Issues](#proxy-issues) below                                                                 |
| Docker `curl: (56) Recv failure: Connection reset by peer` | Your Docker port bind may be landing on IPv6. Use `-p 127.0.0.1:20128:20128` to force IPv4, or test with `curl -4`. See [Docker IPv6](#docker-ipv6) below |
| Antivirus quarantines `README.md`                          | False positive — see [Antivirus false positives](#antivirus-false-positives) below                                                                        |
| Kaspersky flags the Desktop app as a Trojan                | Behavioral false positive on the unsigned installer — see [Antivirus false positives](#antivirus-false-positives) below                                   |

---

## Antivirus False Positives

<a name="antivirus-false-positives"></a>

### Avast/AVG quarantine `README.md` with `MD:HttpRequest-inf[Susp]`

**This is a false positive. Nothing is infected, and no action is required.**

Avast and AVG run a heuristic that flags plain-text/Markdown files containing many
HTTP-request-looking links. OmniRoute's `README.md` ships inside the npm package (it is
listed in `package.json` → `files`), so it lands at `node_modules/omniroute/README.md` on
a global install — and it contains ~15 `http://localhost:20128/...` examples (the MCP
HTTP/SSE endpoints, the A2A `.well-known` URL, and `curl` snippets). That link density is
enough to trip the heuristic.

If this started only recently: the file did not change in kind. The README grew its
endpoints table (MCP HTTP + SSE + A2A were added) and more `curl` examples, which pushed
it past the threshold.

The file is inert documentation with zero executable content. You can safely restore it
from quarantine.

**What to do:**

1. **Stop the notifications** — exclude the install directory in your antivirus
   (Avast: Settings → Exceptions), adding your global `node_modules` path and/or the
   OmniRoute data dir (`~/.omniroute/`).
2. **Report the false positive** — <https://www.avast.com/false-positive-file-form.php>,
   attaching the quarantined `README.md`. This is the fix that helps everyone, since it is
   the vendor's heuristic overreacting to a text file.

**Why we do not "fix" this on our side:** the examples are all `http://localhost`, and
localhost cannot be `https` without self-signed-certificate friction. Mangling the docs to
dodge one vendor's heuristic would hurt every reader to satisfy a scanner bug.

### Kaspersky flags the Desktop app as `PDM:Trojan.Win32.Generic`

**This is a false positive from a behavioral heuristic. Nothing is infected.** Kaspersky's
`PDM:` prefix means the verdict comes from its Proactive Defense Module (System Watcher),
which judges what the installer _does_ rather than matching it against known malware. When
it fires, Kaspersky "rolls back" the whole installation — deleting files it had already
written — so the app ends up broken or missing.

The files it flags are stock parts of declared, open-source dependencies bundled with the
desktop app, for example:

- `resources/app/.build/next/node_modules/playwright-<hash>/lib/…/agentParser.js` and
  `workerProcessEntry.js` — [Playwright](https://playwright.dev), the browser-automation
  library used for in-app provider login and browser-backed chat.
- `resources/app/.build/next/node_modules/@wreq-js/binding-win32-<arch>-msvc-<hash>/wreq-js.win32-<arch>-msvc.node`
  — the pinned `wreq-js` native binding used for browser-fingerprinted HTTP on web-cookie
  providers (`<arch>` is `x64` or `arm64`).

**Why it fires:** the Windows installer is **not yet code-signed**, so an unsigned NSIS
installer has zero reputation and behavioral heuristics run at maximum aggression. Combined
with a bundled native DLL and hundreds of `.js` files written under
`%LOCALAPPDATA%\Programs\OmniRoute` (including hash-suffixed package directories from the
Next.js standalone build), that is enough to trip the heuristic. Code signing is planned;
until it lands, new releases can repeat this.

**What to do:**

1. **Verify your download first** (rules out a tampered file). Every release publishes
   `latest.yml`, whose `sha512` field (base64) covers the `OmniRoute.Setup.<version>.exe`
   installer. In PowerShell, from the folder containing the installer:
   ```powershell
   $b = [System.Security.Cryptography.SHA512]::Create().ComputeHash(
     [System.IO.File]::ReadAllBytes("$PWD\OmniRoute.Setup.<version>.exe"))
   [Convert]::ToBase64String($b)
   ```
   The output must match `latest.yml` → `sha512`. If it does not, delete the file and
   re-download only from the [GitHub releases page](https://github.com/diegosouzapw/OmniRoute/releases).
2. **Restore + exclude** — restore the rolled-back items from quarantine and add an exclusion
   for `%LOCALAPPDATA%\Programs\OmniRoute` (Kaspersky → Settings → Threats and Exclusions),
   then reinstall.
3. **Report the false positive** — <https://opentip.kaspersky.com/>. User-submitted FP
   reports genuinely speed up allowlisting.

---

## Node.js Compatibility

<a name="nodejs-compatibility"></a>

### Login page crashes or shows "Module self-registration" error

**Cause:** You are running a Node.js version outside OmniRoute's approved secure runtime floor. The most common case is running an older Node 22 or 24 patch level that falls below the patched security floor OmniRoute requires.

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

> **Supported secure versions:** `>=22.22.2 <23` or `>=24.0.0 <27`. Node.js 24.x LTS (Krypton) and Node.js 26 are fully supported.

### npm v11+: `better-sqlite3` not installed (Cannot find module)

<a name="npm-v11-better-sqlite3-not-installed-cannot-find-module"></a>

**Cause:** npm v11 (shipped with Node.js 24+) blocks install scripts for optional
dependencies by default. Since `better-sqlite3` is listed in `optionalDependencies`
and requires native compilation (`node-gyp rebuild`), npm silently skips it.

**Symptoms:**

- Server crashes on startup with `Cannot find module 'better-sqlite3'`
- `ls node_modules/better-sqlite3` shows "No such file or directory"
- `npm ls better-sqlite3` shows `(empty)`

**Fix:**

1. Approve the install scripts and reinstall:
   ```bash
   npm approve-scripts better-sqlite3
   npm install
   ```
2. Or install the prebuilt manually:
   ```bash
   npm pack better-sqlite3@13.0.1
   tar -xzf better-sqlite3-*.tgz -C node_modules
   mv node_modules/package node_modules/better-sqlite3
   rm better-sqlite3-*.tgz
   ```
3. Verify it works: `node -e "require('better-sqlite3')(':memory:').close(); console.log('OK')"`

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

> **Note:** This recompiles the native binding against your local Node.js version and CPU architecture, resolving the binary mismatch. The officially supported runtime range is **`>=22.22.2 <23` or `>=24.0.0 <27`** (`SUPPORTED_NODE_RANGE` in `src/shared/utils/nodeRuntimeSupport.ts`, aligned with the `package.json` `engines` field). Node.js 24.x LTS (Krypton) and Node.js 26 are fully supported with `better-sqlite3` v12.x.

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

### MITM proxy under WSL: desktop apps on the Windows host are not intercepted

**Cause:** The MITM proxy and its CA certificate install into the environment where OmniRoute runs. Under WSL that environment is the Linux guest, while the AI desktop apps (Kiro, Trae, Copilot, Zed, …) run on the Windows host. The host apps do not trust the guest's certificate store and do not route through the guest's system proxy, so desktop interception does not engage there.

**Recommendation:** Run OmniRoute natively on the same OS as the desktop apps you want to intercept (Windows for Windows apps; macOS/Linux likewise). Keeping OmniRoute inside WSL while targeting host apps requires manually trusting the generated CA certificate on the Windows host and pointing each host app's network/proxy settings at the WSL proxy endpoint — an unsupported, fragile setup.

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

- Add fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/qwen3.8-max-preview`
- Use GLM/MiniMax as cheap backup

### OAuth Token Expired

OmniRoute auto-refreshes tokens. If issues persist:

1. Dashboard → Provider → Reconnect
2. Delete and re-add the provider connection

### Kiro multi-account: second account invalidates the first

**Cause:** Kiro's backend enforces a single active session per OIDC client registration.
When two accounts share the same registered client (connections imported before v3.8.0),
refreshing one account's token invalidates the other's refresh token.

**Fix (v3.8.0+):** Re-import affected connections.
Starting with v3.8.0, every new Kiro connection created via **Import Token**,
**Google/GitHub social login**, or **Auto-Import** automatically registers its own
dedicated OIDC client. The connection is therefore fully isolated and refreshing one
account has no effect on any other account.

Connections that were imported _before_ v3.8.0 do not carry a per-connection client
registration. Those connections continue to use the shared social-auth refresh endpoint.
To gain isolation, delete the old connection from Dashboard → Providers and re-add it
via any of the three import flows.

For full details and step-by-step instructions for adding two Kiro accounts side by side,
see [`docs/guides/KIRO_SETUP.md`](./KIRO_SETUP.md).

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

### Docker IPv6 / Connection Reset

<a name="docker-ipv6"></a>

**Symptoms:** `curl http://localhost:20128/v1/models` returns `curl: (56) Recv failure: Connection reset by peer`. Dashboard and unauthenticated endpoints work, but authenticated endpoints fail — it looks like an auth problem but isn't.

**Cause:** `docker run -p 20128:20128` publishes on both `0.0.0.0` (IPv4) and `::` (IPv6), but the process inside the container listens on IPv4 only. On hosts where `localhost` resolves to `::1` first, the connection lands on the IPv6 published port with no listener behind it → connection reset.

**Fix:**

1. **Quick diagnostic:** Run `curl -4 http://localhost:20128/v1/models`. If it works with `-4` but fails without, you have an IPv6 bind mismatch.
2. **Permanent fix:** Bind to IPv4 explicitly by using `-p 127.0.0.1:20128:20128` in your `docker run` command:
   ```bash
   docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
     -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
   ```
   This forces the IPv4 bind and also avoids exposing the proxy on all host interfaces.

---

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
3. Use free tier (Qoder, Kiro) for non-critical tasks
4. Set cost budgets per API key: Dashboard → API Keys → Budget

---

## Debugging

### Enable Log Files

Set `APP_LOG_TO_FILE=true` in your `.env` file. Application logs are written under `logs/`.
Request artifacts are stored under `${DATA_DIR}/call_logs/` when the call log pipeline is
enabled in settings.
When pipeline capture is enabled, set `CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS=false` to omit
stream chunk payloads, or tune `CALL_LOG_PIPELINE_MAX_SIZE_KB` to change the artifact cap in KB.

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

The Request Logs page's **Clean history** action clears `call_logs`, legacy
`request_detail_logs`, and the local `${DATA_DIR}/call_logs/` artifact directory.

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

- Use a model id whose first segment is a provider you have credentials for (`openai/whisper-1`, `openrouter/deepgram/nova-3`). Bare `deepgram/nova-3` requires a native Deepgram key.
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
- **SDK returns raw string instead of object** — Resolved in v1.x; response sanitizer strips non-standard fields (`x_groq`, `usage_breakdown`, etc.) that cause OpenAI SDK Pydantic validation failures. If you still see this on v3.x+, please file an issue.
- **GLM/ERNIE rejects `system` role** — Resolved in v1.x; role normalizer automatically merges system messages into user messages for incompatible models. If you still see this on v3.x+, please file an issue.
- **`developer` role not recognized** — Resolved in v1.x; automatically converted to `system` for non-OpenAI providers. If you still see this on v3.x+, please file an issue.
- **`json_schema` not working with Gemini** — Resolved in v1.x; `response_format` is now converted to Gemini's `responseMimeType` + `responseSchema`. If you still see this on v3.x+, please file an issue.

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

### Chat requests fail with 503 / chat_admission_busy

**Symptoms:**

- The chat completions endpoint returns a retryable `503` response whose error code is
  `chat_admission_busy`.
- The response includes `Retry-After`. Since #12135 the value is derived from observed
  occupancy — the larger of the `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` window the request already
  waited and the time the current heavyweight leases have been held — rounded up to whole
  seconds and capped at 60. On an idle gate it keeps the historical floors: 2 seconds on the
  byte-based path, 1 second on the structure-based path (which also includes
  `reason: "structure_limit"`).
- This can happen while another heavyweight chat or long-running streaming response is still
  in flight.

The byte-based response body is:

```json
{
  "error": {
    "message": "Chat admission capacity is temporarily unavailable. Retry shortly.",
    "type": "server_error",
    "code": "chat_admission_busy"
  }
}
```

The structure-based response uses the same type and code, with the message
`Local chat admission capacity is busy for this structurally heavy request; upstream provider routing was not attempted. Retry shortly.`
and `reason: "structure_limit"`.
At the default thresholds, a request is structurally heavy when it has at least `200` messages,
at least `64` tools, or at least `32,000` estimated tokens, or when bounded structure estimation
exhausts its bounds of `10,000` visited nodes or depth `12`.

**Cause:** This is deliberate load shedding inside OmniRoute, not an upstream-provider failure.
Each process uses a process-local guard to reserve limited heavyweight capacity before retaining
and parsing a large request body. A heavyweight lease remains held for the lifetime of an SSE
response.

**#503-fanout:** before this fix, the guard capped concurrency at a fixed request COUNT
(`OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`, default `1`) regardless of host memory, so coding-agent
fan-out (multiple subagents/CLIs, bodies routinely > 256 KB) collapsed to an effective
concurrency of ~1 and 503'd under completely normal load. The guard now self-tunes: it is gated
by an auto-derived ingest BYTE budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`) sized from the
process's real memory ceiling, and it also consults a live resource-pressure signal — so it
only sheds when the host is genuinely under memory pressure, not merely because more than one
heavy request arrived at once. The old count cap (`OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) is
still honored, but only if you explicitly set it.

When capacity is busy, a heavyweight request first waits up to
`OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` (default `2000`, `0` disables the wait) for a slot to free up
before answering the retryable `503`. The bounded wait exists so agent-style clients
(OpenCode, Claude Code, Cursor) that fan out heavy sub-requests concurrently serialize the burst
instead of burning their whole retry budget on immediate rejections and dying mid-task.
Current heavyweight lease occupancy, the resolved byte budget, and live pressure severity are
surfaced at `GET /api/monitoring/health` → `chatAdmission` (`inflightBytes`, `maxInflightBytes`,
`budgetSource`, `pressureSeverity`, `countCapEnabled`) — check these before touching any env var.
Settings → Resilience → Request Queue → Concurrent Requests does not control this; that setting
governs a separate provider request-queue mechanism.

**Fix:**

1. Retry first. Clients should honor `Retry-After` and use backoff rather than immediately
   repeating the request.
2. Check `/api/monitoring/health` → `chatAdmission` before tuning anything. `countCapEnabled:
false` and a generous `maxInflightBytes` mean the auto-derived budget is already doing its
   job; a `pressureSeverity` of `high`/`critical` means the host is genuinely low on memory —
   that is not fixable by an admission env var, it needs more RAM or a smaller workload.
3. Only if `/api/monitoring/health` shows the auto-derived budget is genuinely too small for
   your host (rare — it already scales from container to bare-metal), override it directly with
   `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` rather than falling back to the legacy request-count cap.

See the [environment-variable reference](../reference/ENVIRONMENT.md#4-security--authentication)
for the authoritative admission settings.

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

## v3.8.0 Known Issues

Issues specific to the v3.8.0 release and their current workarounds. If a fix lands in a later patch, the entry will be updated or removed.

### Devin CLI auth failures

**Symptoms:**

- "Devin CLI not found" or "auth failed" when invoking Devin-backed tools
- CLI runtime check reports `installed=false`

**Causes:**

- `CLI_DEVIN_BIN` points to a path that does not exist
- Devin CLI is not installed on the host

**Fix:**

1. Install the Devin CLI for your platform
2. Set `CLI_DEVIN_BIN=/usr/local/bin/devin` (or the real path) in `.env`
3. Restart OmniRoute and re-test from **Dashboard → CLI Tools**

### Model cooldown stuck (manual reset)

**Symptoms:**

- A model stays listed in cooldown even after the expiration time has passed
- Requests still skip the model in combo routing despite the timestamp being in the past

**Manual reset:**

- **Dashboard:** **Settings → Model Cooldowns** → click **Re-enable** on the affected card
- **API:** `DELETE /api/resilience/model-cooldowns` with management auth headers

### Command Code provider connection fails with 403

**Symptoms:**

- 403 when testing the Command Code provider connection
- The provider card shows "unauthorized" after a fresh add

**Cause:** The OAuth flow did not complete (callback not received or token not persisted).

**Fix:**

- Run `omniroute providers` from the CLI to re-trigger the OAuth flow, or
- Re-run OAuth from **Dashboard → Providers → Command Code → Reconnect**

### ModelScope returns aggressive 429 cooldowns

**Symptoms:**

- Very short or immediate cooldowns on ModelScope after a small burst of requests
- Combo routing skips ModelScope earlier than expected

**Cause:** ModelScope emits provider-specific `Retry-After` headers. v3.8.0 ships dedicated handling for those headers, so older versions misread them as generic rate-limit hints.

**Fix:**

- Ensure you are on v3.8.0 or later
- Verify the `useUpstream429BreakerHints` toggle is enabled under **Settings → Resilience**

### OMNIROUTE_WS_BRIDGE_SECRET missing in production

**Symptoms:**

- 401 on every Codex/Responses WebSocket bridge request when running on a remote production host
- WebSocket bridge handshake closes immediately after connect

**Cause:** The `OMNIROUTE_WS_BRIDGE_SECRET` env var is missing from the production environment.

**Fix:**

1. Generate a random secret: `openssl rand -hex 32`
2. Set `OMNIROUTE_WS_BRIDGE_SECRET=<random-secret>` in the production server env (and any client that talks to the bridge)
3. Restart OmniRoute

### Responses API: background mode degraded to synchronous

**Symptoms:**

- Warning logged: `background mode degraded to synchronous`
- A `background: true` request returns a normal synchronous response instead of a background job handle

**Cause:** v3.8.0 intentionally degrades `background: true` on the Responses API to synchronous execution while emitting a warning. Full async background execution is a future deliverable.

**Fix:**

- Adjust the client to call without `background`, or
- Wait for a later release that ships full async background mode (track the changelog)

---

## Still Stuck?

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architecture**: See [`docs/architecture/ARCHITECTURE.md`](../architecture/ARCHITECTURE.md) for internal details
- **API Reference**: See [`docs/reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) for all endpoints
- **Health Dashboard**: Check **Dashboard → Health** for real-time system status
- **Translator**: Use **Dashboard → Translator** to debug format issues
