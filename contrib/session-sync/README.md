# OmniRoute Session Sync (Chrome Extension & Local Bridge)

An automated companion extension and local loopback bridge that synchronizes web browser session cookies directly into OmniRoute for web-based model providers.

Repository: [https://github.com/avichal15/omniroute-session-sync](https://github.com/avichal15/omniroute-session-sync)

---

## Why This Exists

OmniRoute supports several web-interface provider adapters (such as ChatGPT Web, Gemini Web, Z.ai Web, Qwen Web, Grok Web, and DeepSeek Web). These adapters rely on active browser session cookies instead of official paid API keys.

During normal browsing, web cookies expire or rotate periodically. When a session changes, OmniRoute requests fail until you manually inspect browser dev tools, copy the new Cookie header, and paste it into OmniRoute's provider settings.

Session Sync automates this update path locally:
- The unpacked Chrome extension detects cookie changes for mapped provider domains.
- A local loopback bridge authenticates the change using an origin-bound bearer token.
- The bridge calls OmniRoute's existing `PUT /api/providers/:id` management API to save the fresh cookie directly into OmniRoute's encrypted database.
- OmniRoute's priority combos (`browser-sessions`) continue routing inference without interruption.

---

## Security Model

Session Sync follows strict locality and permission boundaries:
- **Local Loopback Only:** The sync bridge binds strictly to `127.0.0.1:20129`. It rejects requests with non-loopback Host headers.
- **Cloud Sync Guard:** The bridge verifies that OmniRoute Cloud Sync is disabled (`allowCloudSync: false`). If Cloud Sync is enabled, credential updates are rejected so browser session cookies never leave the local machine.
- **Zero Disk Exposure:** Cookie values are held in memory only while in transit to OmniRoute. The bridge does not persist cookies, write them to log files, or expose them in status endpoints.
- **Explicit Account Mapping:** The extension updates only the specific connection ID you explicitly map in the popup. Unmapped or unrelated accounts are untouched.
- **Pairing Authentication:** Connecting the extension requires an owner-issued 8-character code that expires after 5 minutes.

---

## Setup Overview

1. Clone or download [omniroute-session-sync](https://github.com/avichal15/omniroute-session-sync):
   ```bash
   git clone https://github.com/avichal15/omniroute-session-sync.git
   cd omniroute-session-sync
   ```

2. Run the one-time embedded setup:
   ```bash
   npm run setup:embedded
   npm run start:integrated
   ```

3. Load the unpacked extension from `extension/` in `chrome://extensions`.
4. Generate a pairing code (`npm run pair`) and enter it in the extension popup.
5. Map your OmniRoute connection IDs and verify synchronization.

For detailed architecture diagrams, fallback priority configuration, and troubleshooting steps, read the [Session Sync Guide](../../docs/guides/SESSION-SYNC-EXTENSION.md).
