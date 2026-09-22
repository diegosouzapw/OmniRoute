# OmniRoute Plugin SDK (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ਤੁਰੰਤ ਸ਼ੁਰੂਆਤ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "my-plugin",
  priority: 50,
  onRequest: async (ctx) => {
    console.log(`Request ${ctx.requestId} for ${ctx.model}`);
  },
  onResponse: async (ctx, response) => {
    console.log(`Response for ${ctx.requestId}`);
    return response;
  },
  onError: async (ctx, error) => {
    console.error(`Error: ${error.message}`);
  },
});
```

## API ਹਵਾਲਾ

### `definePlugin(def: PluginDefinition): Plugin`

ਇੱਕ ਫੈਕਟਰੀ ਫੰਕਸ਼ਨ ਜੋ ਡਿਫਾਲਟ ਮੁੱਲਾਂ ਨਾਲ Plugin ਆਬਜੈਕਟ ਬਣਾਉਂਦਾ ਹੈ।

**ਪੈਰਾਮੀਟਰ:**

- `name` (string, ਲਾਜ਼ਮੀ) — kebab-case ਵਿੱਚ Plugin ਦਾ ਨਾਮ
- `priority` (number, ਵਿਕਲਪਿਕ, ਡਿਫਾਲਟ: 100) — ਘੱਟ ਮੁੱਲ ਵਾਲਾ ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ
- `enabled` (boolean, ਵਿਕਲਪਿਕ, ਡਿਫਾਲਟ: true) — ਕੀ ਸਮਰੱਥ ਸਥਿਤੀ ਵਿੱਚ ਸ਼ੁਰੂ ਕਰਨਾ ਹੈ?
- `onRequest` (function, ਵਿਕਲਪਿਕ) — ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ
- `onResponse` (function, ਵਿਕਲਪਿਕ) — ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਬਾਅਦ ਚੱਲਦਾ ਹੈ
- `onError` (function, ਵਿਕਲਪਿਕ) — ਹੈਂਡਲਰ ਵਿੱਚ ਗਲਤੀ ਹੋਣ 'ਤੇ ਚੱਲਦਾ ਹੈ

### `blockRequest(response?): BlockingHookResult`

ਬੇਨਤੀ ਨੂੰ ਬਲੌਕ ਕਰੋ ਅਤੇ ਵਿਕਲਪਿਕ ਤੌਰ 'ਤੇ ਇੱਕ ਕਸਟਮ ਜਵਾਬ ਵਾਪਸ ਕਰੋ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ਪ੍ਰਦਾਤਾ ਤੱਕ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਬੇਨਤੀ ਦੀ ਬਾਡੀ ਨੂੰ ਸੋਧੋ।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ਬੇਨਤੀ ਦੇ ਸੰਦਰਭ ਨਾਲ ਮੈਟਾਡੇਟਾ ਜੋੜੋ।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin ਸੰਦਰਭ (`PluginContext`)

| ਫ਼ੀਲਡ       | ਕਿਸਮ                      | ਵੇਰਵਾ                  |
| ----------- | ------------------------- | ---------------------- |
| `requestId` | `string`                  | ਵਿਲੱਖਣ ਬੇਨਤੀ ਪਛਾਣਕਰਤਾ  |
| `model`     | `string`                  | ਬੇਨਤੀ ਕੀਤੇ ਮਾਡਲ ਦਾ ਨਾਮ |
| `provider`  | `string`                  | ਟੀਚਾ ਪ੍ਰਦਾਤਾ ID        |
| `body`      | `Record<string, unknown>` | ਬੇਨਤੀ ਦੀ ਬਾਡੀ          |
| `headers`   | `Record<string, string>`  | ਬੇਨਤੀ ਦੇ ਹੈਡਰ          |
| `metadata`  | `Record<string, unknown>` | ਬਦਲਣਯੋਗ ਮੈਟਾਡੇਟਾ       |
| `timestamp` | `number`                  | ਬੇਨਤੀ ਦਾ ਟਾਈਮਸਟੈਂਪ     |

## ਮੈਨੀਫੈਸਟ (`plugin.json`)

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A sample plugin",
  "author": "your-name",
  "main": "index.js",
  "hooks": {
    "onRequest": { "enabled": true, "priority": 50 },
    "onResponse": true,
    "onError": false
  },
  "requires": {
    "permissions": ["network", "file-read"]
  },
  "enabledByDefault": false,
  "configSchema": {
    "apiKey": {
      "type": "string",
      "description": "API key for external service"
    },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

### Hook ਦੀ ਤਰਜੀਹ

Hooks ਨੂੰ ਤਰਜੀਹ ਨਾਲ ਸੰਰਚਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ (ਘੱਟ = ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ਜਾਂ ਸਧਾਰਨ boolean ਮੁੱਲਾਂ ਵਜੋਂ (ਡਿਫਾਲਟ ਤਰਜੀਹ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ਅਨੁਮਤੀ ਪ੍ਰਣਾਲੀ

ਪਲੱਗਇਨ ਇੱਕ ਸੈਂਡਬਾਕਸ ਕੀਤੇ VM ਸੰਦਰਭ ਵਿੱਚ ਚੱਲਦੇ ਹਨ। ਬਾਹਰੀ ਸਰੋਤਾਂ ਤੱਕ ਪਹੁੰਚ ਲਈ ਸਪਸ਼ਟ ਅਨੁਮਤੀਆਂ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ:

| ਅਨੁਮਤੀ       | ਪ੍ਰਦਾਨ ਕੀਤੀ ਪਹੁੰਚ                                            |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | ਕੇਵਲ-ਪੜ੍ਹਨਯੋਗ `process.env` ਪ੍ਰੌਕਸੀ                          |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ਕਿਸੇ ਅਨੁਮਤੀ ਤੋਂ ਬਿਨਾਂ, ਉਸ ਨਾਲ ਸੰਬੰਧਿਤ ਗਲੋਬਲ ਸੈਂਡਬਾਕਸ ਵਿੱਚ ਉਪਲਬਧ ਹੀ ਨਹੀਂ ਹੁੰਦੇ।

## ਕੌਂਫਿਗ ਸਕੀਮਾ

ਕੌਂਫਿਗਰ ਕਰਨ ਯੋਗ ਸੈਟਿੰਗਾਂ ਨੂੰ `configSchema` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "External API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ਫ਼ੀਲਡ ਕਿਸਮਾਂ: `string`, `number`, `boolean`, `select`

ਫ਼ੀਲਡ ਵਿਕਲਪ: `default`, `min`, `max`, `enum`, `description`

ਕੌਂਫਿਗ ਮੁੱਲ ਡੇਟਾਬੇਸ ਵਿੱਚ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਕੀਤੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਡੈਸ਼ਬੋਰਡ ਕੌਂਫਿਗ ਪੰਨੇ ਰਾਹੀਂ ਪਹੁੰਚਯੋਗ ਹੁੰਦੇ ਹਨ।

## ਬਿਲਟ-ਇਨ ਇਵੈਂਟ

| ਇਵੈਂਟ             | ਕਦੋਂ                                                | ਪੇਲੋਡ                         |
| ----------------- | --------------------------------------------------- | ----------------------------- |
| `onRequest`       | ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਪਹਿਲਾਂ                               | ਬੇਨਤੀ ਸੰਦਰਭ                   |
| `onResponse`      | ਚੈਟ ਹੈਂਡਲਰ ਤੋਂ ਬਾਅਦ                                 | ਜਵਾਬ ਡੇਟਾ                     |
| `onError`         | ਹੈਂਡਲਰ ਗਲਤੀ ਹੋਣ 'ਤੇ                                 | ਗਲਤੀ ਆਬਜੈਕਟ                   |
| `onModelSelect`   | ਰੂਟਿੰਗ ਲਈ ਮਾਡਲ ਚੁਣੇ ਜਾਣ 'ਤੇ                         | ਮਾਡਲ ਜਾਣਕਾਰੀ                  |
| `onComboResolve`  | ਕੌਂਬੋ ਰੂਟਿੰਗ ਹੱਲ ਹੋਣ 'ਤੇ                            | ਕੌਂਬੋ ਟਾਰਗੇਟ                  |
| `onRateLimit`     | ਦਰ ਸੀਮਾ ਪੂਰੀ ਹੋਣ 'ਤੇ                                | ਸੀਮਾ ਜਾਣਕਾਰੀ                  |
| `onQuotaExhaust`  | ਕੋਟਾ ਖ਼ਤਮ ਹੋਣ 'ਤੇ                                   | ਕੋਟਾ ਜਾਣਕਾਰੀ                  |
| `onProviderError` | ਪ੍ਰਦਾਤਾ ਵੱਲੋਂ ਗਲਤੀ ਵਾਪਸ ਕੀਤੇ ਜਾਣ 'ਤੇ                | ਗਲਤੀ ਵੇਰਵੇ                    |
| `onStreamStart`   | SSE ਸਟ੍ਰੀਮ ਸ਼ੁਰੂ ਹੋਣ 'ਤੇ                            | ਸਟ੍ਰੀਮ ਜਾਣਕਾਰੀ                |
| `onStreamEnd`     | SSE ਸਟ੍ਰੀਮ ਖ਼ਤਮ ਹੋਣ 'ਤੇ                             | ਸਟ੍ਰੀਮ ਅੰਕੜੇ                  |
| `onInstall`       | ਪਲੱਗਇਨ ਇੰਸਟਾਲ ਹੋਣ 'ਤੇ                               | `{ name, version, manifest }` |
| `onActivate`      | ਪਲੱਗਇਨ ਸਰਗਰਮ ਹੋਣ 'ਤੇ                                | `{ name, version, manifest }` |
| `onDeactivate`    | ਪਲੱਗਇਨ ਨਿਸ਼ਕ੍ਰਿਆ ਹੋਣ 'ਤੇ                            | `{ name, version, manifest }` |
| `onUninstall`     | ਪਲੱਗਇਨ ਅਣਇੰਸਟਾਲ ਹੋਣ 'ਤੇ (ਫ਼ਾਈਲਾਂ ਮਿਟਾਉਣ ਤੋਂ ਪਹਿਲਾਂ) | `{ name, version, manifest }` |

## ਉਦਾਹਰਨਾਂ

### ਬੇਨਤੀ ਲੌਗਰ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ਦਰ ਸੀਮਾਕਾਰ

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 ਮਿੰਟ
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Rate limit exceeded", status: 429 });
    }
  },
});
```

### ਜਵਾਬ ਰੂਪਾਂਤਰਕ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "response-transformer",
  onResponse: async (ctx, response) => {
    if (response.choices) {
      response.choices = response.choices.map((c: any) => ({
        ...c,
        message: { ...c.message, content: c.message.content.trim() },
      }));
    }
    return response;
  },
});
```
