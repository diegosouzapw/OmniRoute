---
title: "Zed IDE Integration in Docker Environments"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Zed IDE Integration in Docker Environments

When OmniRoute runs inside Docker, the standard "Import from Zed Keychain" flow fails
because the container cannot reach the host OS keychain daemon (libsecret on Linux,
Keychain on macOS, Credential Manager on Windows) and the Zed config directories on the
host filesystem are not visible inside the container by default.

## Why Keychain Import Fails in Docker

Two blocking issues occur inside a container:

1. **Filesystem isolation** — `isZedInstalled()` looks for `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), or the Windows equivalent. These paths
   live on the host and are not available unless explicitly volume-mounted.
2. **IPC isolation** — Even when the config directory is mounted, the `keytar` native
   module communicates with the OS keychain service over a Unix socket or D-Bus session.
   Neither is bridged into the container by default, so credential reads always fail.

OmniRoute detects the Docker environment via two heuristics:

- Presence of `/.dockerenv` (written by the Docker daemon at container start).
- The string `docker` appearing in `/proc/1/cgroup` (Linux cgroup v1).

When either heuristic triggers, the import route returns HTTP 422 with
`zedDockerEnvironment: true` and a message directing you to the Manual Token Import tab.

## Using the Manual Token Import Tab

1. Open **Dashboard → Providers → Zed**.
2. The **Manual Token Import** panel appears below the keychain import card. When
   OmniRoute detects Docker, this panel expands automatically after the first failed
   keychain import attempt.
3. Select the provider from the dropdown (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, or DeepSeek).
4. Paste the API key in the password field.
5. Click **Import**.

The key is saved as a new provider connection with the name
`Zed Manual Import (<provider>)`.

## Where Zed Stores API Keys on the Host

Zed stores AI provider keys in the OS keychain under service names such as
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, etc. To retrieve them for manual
import, look in:

**Linux**

```
~/.config/zed/settings.json
```

The `language_models` section contains provider configurations. Keys saved to the
keychain via the Zed UI are not in plain text in `settings.json`; retrieve them through
a keychain viewer such as GNOME Keyring / Seahorse, or by running:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain entries can be found in **Keychain Access.app** by searching for `zed`.

## Volume-Mount Option (Advanced)

You can optionally mount the Zed config directory read-only into the container.
This does not fix the keychain issue but may be useful for future features that read
non-secret Zed config values (e.g., model preferences).

```yaml
# docker-compose.yml snippet
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (uncomment instead)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Future: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Note: a `ZED_CONFIG_PATH` environment variable override is not yet implemented. This
snippet is provided as a reference for when that feature is added.

## Manual Import API

The manual import endpoint can also be called directly:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <management-token>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // optional
}
```

On success it returns:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Troubleshooting

| Symptom                              | Cause                        | Fix                              |
| ------------------------------------ | ---------------------------- | -------------------------------- |
| 422 + `zedDockerEnvironment: true`   | Running inside Docker        | Use Manual Token Import tab      |
| 404 + `zedInstalled: false`          | Zed not installed on host    | Install Zed or use manual import |
| 403 + keychain access denied         | OS denied keychain access    | Grant permission in OS prompt    |
| 404 + keychain service not available | `libsecret` missing on Linux | Install `libsecret-1-dev`        |
