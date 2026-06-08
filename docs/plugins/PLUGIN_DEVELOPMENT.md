---
title: "Plugin Development Guide"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Plugin Development Guide

> **TL;DR**: This guide covers the **day-to-day workflow** for building, testing, signing, and debugging OmniRoute plugins. For the SDK API surface, see the [Plugin SDK Reference](./PLUGIN_SDK.md). For the marketplace, see [Plugin Marketplace](./PLUGIN_MARKETPLACE.md).

---

## Overview

OmniRoute's plugin system has **two layers** that work together:

| Layer | Purpose | Where it runs |
|-------|---------|---------------|
| **SDK plugins** | Hook-based request/response interception | In-process sandboxed VM (the OmniRoute server) |
| **CLI plugins** | Command-based CLI extensions | Separate Node.js process (the `omniroute` CLI) |

This guide is about **SDK plugins** — the in-process kind that hook into every request. For CLI plugins, see [CLI Plugin System](#cli-plugin-system) below or [`docs/dev/plugins.md`](../dev/plugins.md).

---

## Lifecycle: Install → Activate → Run → Deactivate → Uninstall

Every plugin goes through a **5-stage lifecycle** managed by `PluginManager` (`src/lib/plugins/manager.ts`):

```
                    ┌─────────────┐
                    │  Installed  │  ← files on disk + manifest valid
                    └──────┬──────┘
                           │ activate()
                           ▼
                    ┌─────────────┐
        ┌──────────▶│  Activated  │  ← hooks registered, can intercept requests
        │           └──────┬──────┘
        │ deactivate()     │ (running)
        │                  ▼
        │           ┌─────────────┐
        │           │  Hooks fire │  ← onRequest, onResponse, onError per request
        │           └──────┬──────┘
        │                  │
        │ deactivate()     │
        └──────────────────┘
                           │ uninstall()
                           ▼
                    ┌─────────────┐
                    │  Removed    │  ← files deleted, DB row removed
                    └─────────────┘
```

### Lifecycle Hooks (v3.8.16+)

In addition to the per-request hooks, plugins can opt into **lifecycle hooks** that fire on transitions:

| Hook | When | Use case |
|------|------|----------|
| `onInstall` | After files copied, before first activation | Initialize database tables, register schema |
| `onActivate` | When `activate()` is called | Connect to external service, warm caches |
| `onDeactivate` | Before deactivation completes | Close connections, flush logs |
| `onUninstall` | Before files are deleted | Final cleanup, send farewell webhook |

These hooks are **opt-in** — define them on the plugin object and they will be called automatically:

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  
  onInstall: async (ctx) => {
    console.log("Plugin installed, version:", ctx.version);
    // e.g. create a database table
  },
  
  onActivate: async (ctx) => {
    // e.g. open a connection pool
    await connectToExternalService();
  },
  
  onDeactivate: async (ctx) => {
    // e.g. close connections cleanly
    await closeConnections();
  },
  
  onUninstall: async (ctx) => {
    // e.g. delete plugin's database tables
    await cleanup();
  },
  
  // Per-request hooks (unchanged)
  onRequest: async (ctx) => { /* ... */ },
  onResponse: async (ctx, res) => { /* ... */ },
});
```

> **Breaking change policy**: The lifecycle hook contract is stable within a major version. New lifecycle hooks may be added in minor versions, but existing ones will not be removed or renamed.

---

## Dev Mode: Hot Reload on File Changes

**`src/lib/plugins/devMode.ts`** watches the plugin directory for file changes and automatically reloads affected plugins. This is the fastest way to iterate on a plugin during development.

### Starting Dev Mode

```bash
# In the OmniRoute server, set the dev mode flag in your config
PLUGIN_DEV_MODE=true

# Or via environment variable
OMNIROUTE_PLUGIN_DEV=1 omniroute
```

When enabled, the server:
1. Watches `~/.omniroute/plugins/*` recursively
2. On any file change inside a plugin directory, waits 500ms (debounce)
3. Calls `deactivate(pluginName)` then `activate(pluginName)` to reload
4. Logs the result to the `PLUGIN_DEV_MODE` logger

### How It Works

```ts
// src/lib/plugins/devMode.ts
const DEBOUNCE_MS = 500;

export function startDevMode(pluginDir: string, reloadFn: ReloadFn): void {
  if (watcher) return;
  
  watcher = watch(pluginDir, { recursive: true }, (_eventType, filename) => {
    if (!filename) return;
    const pluginName = filename.split("/")[0];
    if (!pluginName || pluginName.startsWith(".")) return;
    
    // Debounce rapid changes
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      await reloadFn(pluginName);  // deactivate + activate
    }, DEBOUNCE_MS);
  });
}
```

### Dev Mode Tips

- **Edit `plugin.json`**: changes are picked up on the next reload cycle. The manifest is re-validated each time.
- **Edit `index.js`**: same — the plugin is unloaded and re-loaded.
- **Multiple rapid saves**: the 500ms debounce means OmniRoute won't thrash during a flurry of saves.
- **Errors during reload**: the old version remains active. Check the server log (`PLUGIN_DEV_MODE` and `PLUGIN_MANAGER` loggers) for the error.

### When NOT to Use Dev Mode

- **Production**: never set `PLUGIN_DEV_MODE=true` in production. The watcher adds CPU overhead and may briefly disable plugins during reloads.
- **Plugin uses native modules**: native bindings can't be re-initialized safely. Restart the server.

---

## Testing Plugins

**`src/lib/plugins/testRunner.ts`** provides a quick way to verify that all your plugin's hooks work without standing up a full request flow.

### Quick Test

```ts
import { testPlugin } from "omniroute/plugins/testRunner";
import { readFileSync } from "fs";

const manifest = JSON.parse(readFileSync("./plugin.json", "utf-8"));
const results = await testPlugin("./index.js", manifest);

for (const r of results) {
  console.log(`${r.passed ? "✓" : "✗"} ${r.hook} (${r.durationMs}ms)`);
  if (!r.passed) console.error(`  Error: ${r.error}`);
}
```

### What Gets Tested

The test runner invokes **every registered hook** with a mock context:

```ts
// src/lib/plugins/testRunner.ts
const MOCK_CONTEXT: PluginContext = {
  requestId: "test-req-001",
  body: { model: "gpt-4", messages: [{ role: "user", content: "test" }] },
  model: "gpt-4",
  provider: "openai",
  metadata: { test: true },
};
```

For each hook, the runner records:
- `passed` (boolean): did the hook complete without throwing?
- `durationMs` (number): how long the hook took
- `output` (unknown): the hook's return value
- `error` (string): if the hook threw, the error message

### Sample Output

```json
[
  { "hook": "onRequest", "passed": true, "durationMs": 3, "output": null },
  { "hook": "onResponse", "passed": true, "durationMs": 1, "output": { "choices": [...] } },
  { "hook": "onError", "passed": true, "durationMs": 0, "output": null }
]
```

### Limitations

The test runner uses a **fixed mock context** — it cannot simulate:
- Streaming responses
- Multi-turn conversations
- Specific provider error formats
- Custom `PluginContext` shapes

For full integration testing, use the [OmniRoute test harness](#integration-testing) in your own test suite.

---

## Plugin Doctor: Diagnostic Health Checks

**`src/lib/plugins/doctor.ts`** runs **5 health checks** on a plugin to help you diagnose common issues.

### Running the Doctor

```bash
# Via the CLI (if available in your build)
omniroute plugin doctor <name>

# Programmatically
import { runPluginDoctor } from "omniroute/plugins/doctor";

const result = await runPluginDoctor("~/.omniroute/plugins/my-plugin", "my-plugin");
console.log(result);
```

### The 5 Checks

| # | Check name | What it verifies | Status values |
|---|------------|------------------|---------------|
| 1 | `directory_exists` | Plugin directory is on disk | `pass` / `fail` |
| 2 | `manifest_valid` | `plugin.json` parses and matches schema | `pass` / `fail` |
| 3 | `entry_point_exists` | `manifest.main` file is on disk | `pass` / `fail` / `warn` |
| 4 | `can_spawn` | Entry point has `.js` or `.mjs` extension | `pass` / `warn` |
| 5 | `db_status_correct` | Plugin row in DB matches filesystem state | `pass` / `warn` |

### Interpreting Results

```ts
interface DoctorResult {
  pluginName: string;
  checks: DoctorCheck[];
  overall: "healthy" | "degraded" | "unhealthy";
}
```

- **`healthy`** — all 5 checks passed
- **`degraded`** — some `warn` (e.g. manifest valid but entry point missing)
- **`unhealthy`** — any `fail` (e.g. manifest invalid)

### Common Issues and Fixes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `directory_exists: fail` | Plugin was deleted from disk but still in DB | Run `omniroute plugin uninstall <name>` |
| `manifest_valid: fail` | `plugin.json` doesn't match the schema | Check the [manifest schema](./PLUGIN_SDK.md#manifest-pluginjson) |
| `entry_point_exists: fail` | `manifest.main` points to a non-existent file | Fix the `main` field in `plugin.json` |
| `can_spawn: warn` | Entry point has `.ts` or other extension | Compile to `.js` or `.mjs` first |
| `db_status_correct: warn` | Plugin not in DB (was just installed) | Re-run `omniroute plugin install <path>` |

---

## Plugin Signing & Verification

**`src/lib/plugins/signing.ts`** provides Ed25519-based code signing so users can verify that a plugin came from a trusted source.

### What's Available

```ts
// SHA-256 hashing
sha256(data: Buffer): string
verifySha256(data: Buffer, expectedHash: string): boolean

// Ed25519 signature verification
verifyEd25519(data: Buffer, signature: Buffer, publicKeyDer: Buffer): boolean
```

### Why Sign Plugins?

- **Trust**: Users can verify a plugin was published by a specific author
- **Integrity**: Detect if a plugin package was tampered with after publishing
- **Supply chain**: Build a chain of trust from author → registry → user

### Verifying a Plugin (v3.8.16+)

```ts
import { verifyEd25519, verifySha256 } from "omniroute/plugins/signing";
import { readFileSync } from "fs";

const pluginBytes = readFileSync("./my-plugin.tar.gz");
const signature = readFileSync("./my-plugin.sig");
const publicKey = readFileSync("./author-pubkey.der");

if (verifyEd25519(pluginBytes, signature, publicKey)) {
  console.log("✓ Plugin signature valid");
} else {
  throw new Error("Plugin signature invalid — do not install");
}
```

### Generating a Signature (Author Side)

```ts
import { createPrivateKey, sign, generateKeyPairSync } from "crypto";
import { readFileSync, writeFileSync } from "fs";

// 1. Generate a key pair (one-time)
const { publicKey, privateKey } = generateKeyPairSync("ed25519");
writeFileSync("./author-pubkey.der", publicKey.export({ format: "der", type: "spki" }));
writeFileSync("./author-privkey.der", privateKey.export({ format: "der", type: "pkcs8" }));

// 2. Sign your plugin package
const data = readFileSync("./my-plugin.tar.gz");
const key = createPrivateKey(readFileSync("./author-privkey.der"));
const signature = sign(null, data, key);
writeFileSync("./my-plugin.sig", signature);
```

### Registry Workflow (Recommended)

```
   Author                              Registry                          User
     │                                    │                                │
     │  1. Generate key pair              │                                │
     │  2. Publish pubkey.der ───────────▶│                                │
     │  3. Publish plugin.tar.gz ────────▶│  Store pubkey                  │
     │  4. Publish plugin.sig ───────────▶│  Verify signature              │
     │                                    │                                │
     │                                    │  5. User requests install ◀───│
     │                                    │  6. Ship plugin + signature    │
     │                                    │  ────────────────────────────▶│
     │                                    │                                │  7. Verify signature
```

> **Note**: The remote registry with signature verification is planned for **Phase 2** of the marketplace. For now, signing is **advisory** — OmniRoute does not block installation of unsigned plugins, but it surfaces a warning.

---

## CLI Plugin System

OmniRoute's **CLI** is also extensible. CLI plugins add new subcommands to the `omniroute` binary, similar to `gh extension` or `kubectl plugin`.

> For the full CLI plugin reference, see [`docs/dev/plugins.md`](../dev/plugins.md). Summary below.

### Quick Example

```bash
# Install a CLI plugin from npm
omniroute plugin install stripe

# Install a local plugin in development
omniroute plugin install ./my-plugin

# Scaffold a new plugin
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

### CLI Plugin Package Layout

```
omniroute-cmd-myplugin/
├── package.json     # name: "omniroute-cmd-<name>", type: "module", main: "index.mjs"
├── index.mjs        # exports register(program, ctx) + optional meta
└── README.md
```

### CLI Plugin Entry Point

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "My plugin for OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

### CLI Plugin Context API

| Property | Type | Description |
|----------|------|-------------|
| `ctx.apiFetch(path, opts)` | `async function` | Authenticated fetch to the OmniRoute server |
| `ctx.emit(data, opts)` | `function` | Output in `table`/`json`/`jsonl`/`csv` per `--output` flag |
| `ctx.t(key)` | `async function` | i18n translation lookup |
| `ctx.withSpinner(label, fn)` | `async function` | Wraps async fn with ora spinner |
| `ctx.baseUrl` | `string` | Resolved base URL |
| `ctx.apiKey` | `string \| null` | API key if provided |

### CLI Plugin Discovery

Plugins are discovered from:
1. `~/.omniroute/plugins/<name>/` — user-local installs
2. `OMNIROUTE_PLUGIN_PATH` env var — custom directory

Loading errors are caught and printed as warnings — a broken plugin never crashes the CLI.

### Security Warning

CLI plugins run with the **same Node.js process privileges** as `omniroute`. Only install plugins from sources you trust. `omniroute plugin install` shows an explicit warning and requires `--yes` or interactive confirmation.

---

## Best Practices

### Plugin Structure

```
my-plugin/
├── plugin.json         # Manifest (required)
├── index.js            # Entry point (or index.mjs, index.ts compiled)
├── README.md           # User-facing docs
├── CHANGELOG.md        # Version history
├── lib/                # Internal modules
│   ├── helpers.js
│   └── config.js
├── test/               # Tests
│   ├── plugin.test.js
│   └── mocks.js
└── examples/           # Usage examples
    └── basic.js
```

### Versioning

- Follow [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`
- Bump `MAJOR` for breaking API changes
- Bump `MINOR` for new features (backward compatible)
- Bump `PATCH` for bug fixes
- Update `CHANGELOG.md` for every release

### Error Handling

Always handle errors gracefully — a thrown exception in a hook will block the request:

```ts
import { definePlugin, addMetadata } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  onRequest: async (ctx) => {
    try {
      const result = await someExternalCall(ctx);
      return addMetadata({ external: result });
    } catch (err) {
      // Log but don't fail the request
      console.error("External call failed:", err);
      return addMetadata({ external: null, error: String(err) });
    }
  },
});
```

### Performance

- Keep hooks **fast** — they run on every request
- For expensive operations, use **caching** with TTL
- Use `Promise.all` for independent async work
- Avoid `setTimeout` / `setInterval` inside hooks

### Permissions

Request **only the permissions you need**:

```json
{
  "requires": {
    "permissions": ["network"]  // only if you call external APIs
  }
}
```

Plugins without `network` permission cannot call `fetch` — the global is simply not available in the sandbox.

---

## Troubleshooting

### "Plugin not loading"

Run the doctor:
```bash
omniroute plugin doctor <name>
```

Check the 5 checks. The most common cause is `manifest_valid: fail` — usually a missing required field.

### "Hook not firing"

1. Check the plugin is **activated** (not just installed): `omniroute plugin list`
2. Check the **event** in your manifest: `onRequest: { enabled: true, priority: 50 }`
3. Check the **priority**: a higher-priority plugin may be returning `blockRequest()` first

### "Permission denied" inside a hook

You tried to use a global that requires a permission you didn't request. Add it to `plugin.json`:
```json
{
  "requires": { "permissions": ["network", "file-read"] }
}
```

### "Plugin reloaded but my changes don't show"

Dev mode has a 500ms debounce. Wait a moment, then check the server log for `PLUGIN_DEV_MODE` events.

---

## What's Next?

- **[Plugin SDK Reference](./PLUGIN_SDK.md)** — Full API surface, manifest schema, built-in events
- **[Plugin Marketplace](./PLUGIN_MARKETPLACE.md)** — Discover, install, and publish plugins
- **[CLI Plugin Reference](../dev/plugins.md)** — Extend the `omniroute` CLI
- **[Source code](../../src/lib/plugins/)** — Implementation reference (17 files in `src/lib/plugins/`)
