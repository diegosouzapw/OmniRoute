# OmniRoute Plugin System

Welcome to the **OmniRoute Plugin System**! This guide is split into two sections: one for **Non-Tech users** (administrators and dashboard users) and one for **Tech users** (developers who want to build their own plugins).

---

## 👩‍💼 For Non-Tech Users (Administrators)

### What are Plugins?
Plugins are small "apps" you can install inside OmniRoute to give it new superpowers without changing any of the core software. Want to add an automatic Welcome Banner to your API responses? Track how much money each API call costs? Or automatically swap expensive AI models to cheap ones when prompts get too long? Plugins do exactly that!

### How to use the Plugin Marketplace
1. **Open the Dashboard:** Go to your OmniRoute dashboard and click on **Plugins** in the sidebar.
2. **Browse the Marketplace:** Switch to the **Marketplace** tab to see all available plugins (like `theme-manager` or `request-logger`).
3. **Install:** Click "Install". OmniRoute securely downloads and loads the plugin in an isolated "sandbox" (meaning it cannot crash your main system).
4. **Activate & Configure:** Switch back to the **Installed** tab. Click **Activate** to turn the plugin on. You can also configure the plugin (for example, setting the maximum allowed tokens) directly from the UI without writing any code.

### Custom Marketplaces
If your company has private, in-house plugins, you can tell OmniRoute to download plugins from your own servers instead of the official marketplace. Just paste your custom URL into the **Custom Marketplace URL** field on the Marketplace tab!

---

## 👨‍💻 For Tech Users (Developers)

The OmniRoute Plugin System runs plugins in isolated **child processes** via `child_process.spawn`. Each plugin is sandboxed in a `vm.createContext()` with strict capability gating — plugins only have access to what their manifest's `permissions` block declares. Plugins intercept the lifecycle of LLM requests through asynchronous event hooks.

### Plugin Architecture
A plugin is a folder containing two files:
1. `plugin.json` (The Manifest)
2. `index.mjs` (The Code)

### Lifecycle Hooks
Plugins can export any of the following lifecycle hooks in `index.mjs`:
- `onRequest(ctx)`: Fires before an LLM request is sent. You can mutate `ctx.metadata` to store state.
- `onModelSelect(ctx, selectedModel)`: Fires when OmniRoute resolves a model. Return a different string to override the routing!
- `onResponse(ctx, response)`: Fires when the LLM response comes back. You can mutate the HTML, headers, or JSON body.
- `onError(ctx, error)`: Fires if the provider fails.
- `onActivate(ctx)` / `onDeactivate(ctx)`: Fired during lifecycle state changes.

### Plugin Capabilities & Permissions
By default, plugins run with **no permissions**. They cannot read files, make network requests, or access the database. To request capabilities, add them to your `plugin.json` manifest:

```json
{
  "name": "my-advanced-plugin",
  "requires": {
    "permissions": ["network", "db"]
  }
}
```

**Available Permissions:**
- `"network"`: Injects the global `fetch()`, `Request`, `Response`, and `Headers` objects into your sandbox.
- `"db"`: Injects a global `db` object providing a persistent, isolated Key-Value store using OmniRoute's SQLite database.
  - `db.set(key, value)`
  - `db.get(key)`
  - `db.delete(key)`
  - `db.list()` (returns an array of keys)
- `"file-read"` / `"file-write"`: Gives access to a sandboxed `fs` object scoped *only* to your plugin's directory.
- `"env"`: Exposes the system's `process.env`.

### The 3 Example Plugins

We have provided three example plugins in the `examples/plugins/` directory to help you get started:

#### 1. The Simple Plugin (`welcome-banner`)
**Goal:** Learn how to inject static data into requests.
This plugin simply intercepts `onRequest` and injects a "Welcome to OmniRoute" string into the request metadata. It is the perfect Hello World.

#### 2. The UI Plugin (`theme-manager`)
**Goal:** Learn how to mutate `onResponse` bodies.
This plugin intercepts HTML responses and dynamically injects a `<style>` tag containing CSS variables (Dark Mode vs Light Mode) based on the user request headers.

#### 3. The Advanced Plugin (`smart-router`)
**Goal:** Learn how to build an intelligent cost-saving router.
This plugin hooks into `onRequest` to count the approximate token length of the user prompt. Then, it hooks into `onModelSelect` to evaluate the prompt size against the configured threshold. If the prompt is too long for the expensive model, the plugin forcefully re-routes the request to a cheaper fallback model (e.g. `gpt-3.5-turbo`) by returning a new string.

### How to test a local plugin
1. Copy your plugin folder into the `data/plugins/` directory (the default local plugin storage).
2. Go to the dashboard Plugins page and click **Scan for Plugins**.
3. Activate your plugin and view your console logs!

*Security Note:* The `ctx` object passed to hooks is deeply cloned via IPC serialization. You cannot access `fs`, `process.env`, or `child_process` natively unless explicitly granted via the Plugin Manifest `permissions` block.
