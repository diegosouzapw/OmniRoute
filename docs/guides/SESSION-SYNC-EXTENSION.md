---
title: "Browser Session Sync Extension"
version: 3.8.51
lastUpdated: 2026-09-09
---

# Browser Session Sync Extension

OmniRoute supports several web-interface provider adapters, including ChatGPT Web, Gemini Web, Z.ai Web, Qwen Web, Grok Web, and DeepSeek Web. These adapters use session cookies from your browser rather than traditional API keys.

Web session cookies periodically expire or rotate. When that happens, requests sent to that provider fail until a fresh Cookie header is pasted into OmniRoute's dashboard.

The [OmniRoute Session Sync](https://github.com/avichal15/omniroute-session-sync) companion extension automates this renewal path locally:

```
[ Google Chrome Extension ]
      |
      | 1. Detects cookie rotation for mapped domain
      | 2. Reassembles tokens (e.g. multi-chunk ChatGPT session)
      v
[ Local Sync Bridge (Port 20129) ]
      |
      | 3. Authenticates via paired Bearer token
      | 4. Checks that Cloud Sync is disabled
      | 5. PUT /api/providers/:id
      v
[ OmniRoute Management API (Port 20128) ]
      |
      | 6. Encrypts and persists updated cookie in storage.sqlite
      v
[ Active Inference / Fallback Combos ]
```

---

## Capabilities

- **Automatic Cookie Detection:** Listens to `chrome.cookies.onChanged` across configured provider domains with per-provider debouncing.
- **Chunked Token Reassembly:** Handles multi-part session cookies (such as ChatGPT's numeric token chunks) in sequence.
- **Single Connection Mapping:** You choose the exact connection ID each browser provider updates. Other accounts and official API providers remain unaffected.
- **Embedded Hosting:** The bridge can run directly inside OmniRoute's Node.js server via an `--import` preload, binding both ports (20128 and 20129) under a single process.
- **Priority Fallback Combos:** Easily creates or updates a `browser-sessions` combo containing up to eight browser models ordered by priority.

---

## Security Boundaries

Session Sync operates strictly locally:

1. **Loopback Only:** All network communication stays on `127.0.0.1`. Requests presenting non-loopback Host headers are rejected.
2. **Cloud Sync Enforcement:** The bridge queries OmniRoute settings before every write. If Cloud Sync is enabled, credential updates are refused.
3. **No Plaintext Persistence on Disk:** The sync bridge holds cookies in memory only during transmission to OmniRoute. Cookies are never written to disk files, state records, or diagnostic logs.
4. **Isolated User State:** Pairing metadata, non-secret acknowledgement hashes, and connection mappings live in `%USERPROFILE%\.omniroute\session-sync\state.json`, protected by user-only ACLs (`0600`).
5. **One-Time Pairing:** Extension registration requires an owner-generated 8-character pairing code that expires in 5 minutes.

---

## Setup

### Prerequisites

- Node.js 24 LTS (or matching OmniRoute runtime).
- Google Chrome 120 or newer.
- Local OmniRoute instance running on port 20128.
- Existing provider connections configured under the target web providers.

### Step 1: Install the Session Sync Repository

Clone the project to your local machine:

```bash
git clone https://github.com/avichal15/omniroute-session-sync.git
cd omniroute-session-sync
```

### Step 2: Configure Embedded Mode

Run the embedded setup command:

```bash
npm run setup:embedded
```

This adds `--import=.../bridge/omniroute-preload.mjs` to OmniRoute's local `.env` and configures autostart via Windows Task Scheduler (`OmniRoute Session Sync`).

Start OmniRoute with integrated sync:

```bash
npm run start:integrated
```

Check status to verify both services are running:

```bash
npm run status
```

### Step 3: Install the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the `extension/` folder from the `omniroute-session-sync` directory.
4. Verify that **OmniRoute Session Sync** (v2.0.0) is listed.

### Step 4: Pair and Map Connections

1. In your terminal, generate an owner pairing code:
   ```bash
   npm run pair
   ```
2. Click the extension icon in Chrome, paste the code into the popup, and click **Connect**.
3. For each provider, select your OmniRoute connection from the dropdown and click **Apply**.
4. Sign in to the provider website in Chrome, then click **Sync** and **Test**.

---

## Priority Fallback Routing

In the popup's **Model Fallback** section, select and order your preferred models (for example, `chatgpt-web/gpt-5.5`, `gemini-web/gemini-3.5-flash`, `qwen-web/qwen3.7-plus`, `zai-web/glm-5.3`).

Click **Save fallback** to create or update the `browser-sessions` combo in OmniRoute. You can then route inference requests to:

```json
{
  "model": "browser-sessions",
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

If one provider session expires or hits an upstream quota limit, OmniRoute automatically falls back to the next available browser model in your list.
