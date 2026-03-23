# Zed IDE OAuth Import - Documentation

## Overview

OmniRoute can automatically import OAuth credentials from Zed IDE by accessing the operating system's secure keychain storage. This eliminates manual credential copying and enables seamless integration between Zed IDE and OmniRoute.

## How It Works

Zed IDE stores all OAuth tokens in your operating system's native credential storage:
- **macOS**: Keychain Access
- **Windows**: Credential Manager
- **Linux**: libsecret / GNOME Keyring

As documented in [Zed's official documentation](https://zed.dev/docs/ai/llm-providers):
> "API keys are not stored as plain text in your settings file, but rather in your OS's secure credential storage."

OmniRoute uses the `keytar` library to securely read these credentials with your permission.

## Supported Providers

The following Zed IDE providers can be imported:
- OpenAI
- Anthropic (Claude)
- Google AI (Gemini)
- Mistral
- xAI (Grok)
- OpenRouter
- DeepSeek

## Installation

### Prerequisites

**Linux users** must install libsecret development files:

```bash
# Debian/Ubuntu
sudo apt-get install libsecret-1-dev

# Red Hat/Fedora  
sudo yum install libsecret-devel

# Arch Linux
sudo pacman -S libsecret
```

**macOS and Windows** users don't need additional dependencies.

### Install Dependencies

```bash
npm install keytar
```

Or using pnpm:

```bash
pnpm install keytar
```

## Usage

### API Endpoint

**Endpoint**: `POST /api/providers/zed/import`

**Request**:
```bash
curl -X POST http://localhost:20128/api/providers/zed/import \
  -H "Content-Type: application/json"
```

**Response** (success):
```json
{
  "success": true,
  "count": 3,
  "providers": ["openai", "anthropic", "google"],
  "zedInstalled": true
}
```

**Response** (Zed not installed):
```json
{
  "success": false,
  "error": "Zed IDE does not appear to be installed on this system.",
  "zedInstalled": false
}
```

**Response** (permission denied):
```json
{
  "success": false,
  "error": "Keychain access denied. Please grant permission when prompted by your OS."
}
```

### Programmatic Usage

```typescript
import { 
  discoverZedCredentials, 
  getZedCredential,
  isZedInstalled 
} from '@/lib/zed-oauth/keychain-reader';

// Check if Zed is installed
const installed = await isZedInstalled();

// Discover all credentials
const credentials = await discoverZedCredentials();
console.log(`Found ${credentials.length} credentials`);

// Get specific provider
const openaiCred = await getZedCredential('openai');
if (openaiCred) {
  console.log(`OpenAI token: ${openaiCred.token.substring(0, 10)}...`);
}
```

## Security

### Permission Prompt

The first time OmniRoute accesses the keychain, your operating system will prompt for permission:

- **macOS**: "OmniRoute wants to access your keychain"
- **Windows**: UAC prompt or Credential Manager authorization
- **Linux**: "Authentication required to access the default keyring"

You can grant:
- **Allow Once**: Permission for this session only
- **Always Allow**: Permanent access (until revoked)
- **Deny**: Credential import will fail

### Data Handling

1. **No Master Password Storage**: OmniRoute never stores your keychain master password
2. **Minimal Access**: Only reads Zed-specific credential entries
3. **Encryption at Rest**: Imported tokens are encrypted using AES-256-GCM in OmniRoute's database
4. **Audit Logging**: All import attempts are logged for security tracking

### Revoking Access

To revoke OmniRoute's keychain access:

**macOS**:
1. Open **Keychain Access** app
2. Go to **Keychain Access** → **Preferences** → **Access Control**
3. Remove OmniRoute from the allowed applications list

**Windows**:
1. Open **Credential Manager**
2. Find OmniRoute entries
3. Remove or modify permissions

**Linux (GNOME)**:
1. Open **Seahorse** (Passwords and Keys)
2. Find OmniRoute entries under Login keyring
3. Remove or edit access control

## Troubleshooting

### "Keychain access denied" Error

**Cause**: User denied permission prompt or previous denial cached.

**Solution**:
1. Retry the import (permission prompt will appear again)
2. Check system keychain settings (see "Revoking Access" section)
3. On macOS, restart Keychain Access app

### "Keychain service not available" Error

**Cause**: OS credential storage not configured or missing dependencies.

**Solution** (Linux):
```bash
# Install libsecret
sudo apt-get install libsecret-1-dev

# Ensure keyring daemon is running
systemctl --user status gnome-keyring-daemon
```

### "Zed IDE does not appear to be installed"

**Cause**: Zed config directory not found in expected locations.

**Solution**:
- Verify Zed is installed: `zed --version`
- Check config exists at:
  - Linux: `~/.config/zed`
  - macOS: `~/Library/Application Support/Zed`
  - Windows: `%APPDATA%\Zed`

### No Credentials Found

**Cause**: Zed hasn't stored OAuth tokens yet, or using API keys instead of OAuth.

**Solution**:
1. Open Zed IDE
2. Go to Agent Panel settings (⌘/Ctrl+Shift+P → "agent: open settings")
3. Add at least one provider with OAuth/API key
4. Retry import in OmniRoute

## Command-Line Alternatives

For advanced users who prefer manual extraction:

### macOS

```bash
# Find OpenAI token
security find-generic-password -s "zed-openai" -w

# List all Zed credentials
security dump-keychain | grep -i "zed"
```

### Linux (GNOME Keyring)

```bash
# Using secret-tool
secret-tool lookup service zed-openai

# List all Zed entries
secret-tool search service zed
```

### Windows (PowerShell)

```powershell
# List Zed credentials
cmdkey /list | Select-String "zed"
```

## Technical Reference

### Service Name Patterns

Zed IDE uses these service names for keychain storage:

| Provider | Service Names |
|----------|--------------|
| OpenAI | `zed-openai`, `ai.zed.openai`, `Zed-OpenAI` |
| Anthropic | `zed-anthropic`, `ai.zed.anthropic`, `Zed-Anthropic` |
| Google AI | `zed-google`, `ai.zed.google`, `Zed-Google` |
| Mistral | `zed-mistral`, `ai.zed.mistral`, `Zed-Mistral` |
| xAI | `zed-xai`, `ai.zed.xai`, `Zed-xAI` |
| OpenRouter | `zed-openrouter`, `ai.zed.openrouter`, `Zed-OpenRouter` |
| DeepSeek | `zed-deepseek`, `ai.zed.deepseek`, `Zed-DeepSeek` |

### keytar API

```typescript
// Get password for service+account
const token = await keytar.getPassword('service-name', 'account-name');

// Find all credentials for a service
const credentials = await keytar.findCredentials('service-name');

// Set password (not used in import, but available)
await keytar.setPassword('service-name', 'account-name', 'password');
```

## References

- [Zed IDE LLM Providers Documentation](https://zed.dev/docs/ai/llm-providers)
- [keytar Library on GitHub](https://github.com/atom/node-keytar)
- [VS Code Secret Storage](https://code.visualstudio.com/api/references/vscode-api#SecretStorage)
- [GitHub Copilot CLI Authentication](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)

## Support

For issues or questions:
- Open an issue on [OmniRoute GitHub](https://github.com/diegosouzapw/OmniRoute/issues)
- Join the [WhatsApp Community](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
