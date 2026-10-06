# OmniRoute Plugin SDK (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ತ್ವರಿತ ಪ್ರಾರಂಭ

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

## API ಉಲ್ಲೇಖ

### `definePlugin(def: PluginDefinition): Plugin`

ಡೀಫಾಲ್ಟ್ ಮೌಲ್ಯಗಳೊಂದಿಗೆ Plugin ಆಬ್ಜೆಕ್ಟ್ ಅನ್ನು ರಚಿಸುವ ಫ್ಯಾಕ್ಟರಿ ಫಂಕ್ಷನ್.

**ಪ್ಯಾರಾಮೀಟರ್ಗಳು:**

- `name` (string, ಕಡ್ಡಾಯ) — kebab-caseನಲ್ಲಿರುವ Plugin ಹೆಸರು
- `priority` (number, ಐಚ್ಛಿಕ, ಡೀಫಾಲ್ಟ್: 100) — ಕಡಿಮೆ ಮೌಲ್ಯವು ಮೊದಲು ರನ್ ಆಗುತ್ತದೆ
- `enabled` (boolean, ಐಚ್ಛಿಕ, ಡೀಫಾಲ್ಟ್: true) — ಸಕ್ರಿಯಗೊಳಿಸಿ ಪ್ರಾರಂಭಿಸಬೇಕೇ?
- `onRequest` (function, ಐಚ್ಛಿಕ) — ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗಿಂತ ಮೊದಲು ರನ್ ಆಗುತ್ತದೆ
- `onResponse` (function, ಐಚ್ಛಿಕ) — ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ನ ನಂತರ ರನ್ ಆಗುತ್ತದೆ
- `onError` (function, ಐಚ್ಛಿಕ) — ಹ್ಯಾಂಡ್ಲರ್ ದೋಷ ಸಂಭವಿಸಿದಾಗ ರನ್ ಆಗುತ್ತದೆ

### `blockRequest(response?): BlockingHookResult`

ವಿನಂತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಿ ಮತ್ತು ಐಚ್ಛಿಕವಾಗಿ ಕಸ್ಟಮ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹಿಂತಿರುಗಿಸಿ.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ವಿನಂತಿಯ ಬಾಡಿ ಪ್ರೊವೈಡರ್ ಅನ್ನು ತಲುಪುವ ಮೊದಲು ಅದನ್ನು ಮಾರ್ಪಡಿಸಿ.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ವಿನಂತಿಯ ಕಾಂಟೆಕ್ಸ್ಟ್ಗೆ ಮೆಟಾಡೇಟಾವನ್ನು ಲಗತ್ತಿಸಿ.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin ಕಾಂಟೆಕ್ಸ್ಟ್ (`PluginContext`)

| ಫೀಲ್ಡ್      | ಪ್ರಕಾರ                    | ವಿವರಣೆ                    |
| ----------- | ------------------------- | ------------------------- |
| `requestId` | `string`                  | ಅನನ್ಯ ವಿನಂತಿ ಗುರುತಿಸುವಿಕೆ |
| `model`     | `string`                  | ವಿನಂತಿಸಿದ ಮಾಡೆಲ್ ಹೆಸರು    |
| `provider`  | `string`                  | ಗುರಿ ಪ್ರೊವೈಡರ್ ID         |
| `body`      | `Record<string, unknown>` | ವಿನಂತಿಯ ಬಾಡಿ              |
| `headers`   | `Record<string, string>`  | ವಿನಂತಿಯ ಹೆಡರ್ಗಳು          |
| `metadata`  | `Record<string, unknown>` | ಮಾರ್ಪಡಿಸಬಹುದಾದ ಮೆಟಾಡೇಟಾ   |
| `timestamp` | `number`                  | ವಿನಂತಿಯ ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್     |

## ಮ್ಯಾನಿಫೆಸ್ಟ್ (`plugin.json`)

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

### Hook ಆದ್ಯತೆ

Hookಗಳನ್ನು ಆದ್ಯತೆಯೊಂದಿಗೆ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು (ಕಡಿಮೆ = ಮೊದಲು ರನ್ ಆಗುತ್ತದೆ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ಅಥವಾ ಸರಳ boolean ಮೌಲ್ಯಗಳಾಗಿ (ಡೀಫಾಲ್ಟ್ ಆದ್ಯತೆ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ಅನುಮತಿ ವ್ಯವಸ್ಥೆ

ಪ್ಲಗಿನ್ಗಳು ಸ್ಯಾಂಡ್ಬಾಕ್ಸ್ ಮಾಡಿದ VM ಸಂದರ್ಭದೊಳಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ. ಬಾಹ್ಯ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಪ್ರವೇಶಿಸಲು ಸ್ಪಷ್ಟ ಅನುಮತಿಗಳು ಅಗತ್ಯವಿವೆ:

| ಅನುಮತಿ       | ಒದಗಿಸುವ ಪ್ರವೇಶ                                               |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | ಓದಲು-ಮಾತ್ರದ `process.env` ಪ್ರಾಕ್ಸಿ                           |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ಅನುಮತಿ ಇಲ್ಲದಿದ್ದರೆ, ಅದಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಗ್ಲೋಬಲ್ಗಳು ಸ್ಯಾಂಡ್ಬಾಕ್ಸ್ನಲ್ಲಿ ಲಭ್ಯವಿರುವುದಿಲ್ಲ.

## ಕಾನ್ಫಿಗ್ ಸ್ಕೀಮಾ

ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದಾದ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು `configSchema` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಿ:

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

ಫೀಲ್ಡ್ ಪ್ರಕಾರಗಳು: `string`, `number`, `boolean`, `select`

ಫೀಲ್ಡ್ ಆಯ್ಕೆಗಳು: `default`, `min`, `max`, `enum`, `description`

ಕಾನ್ಫಿಗ್ ಮೌಲ್ಯಗಳನ್ನು ಡೇಟಾಬೇಸ್ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಡ್ಯಾಶ್ಬೋರ್ಡ್ನ ಕಾನ್ಫಿಗ್ ಪುಟದ ಮೂಲಕ ಪ್ರವೇಶಿಸಬಹುದು.

## ಅಂತರ್ನಿರ್ಮಿತ ಈವೆಂಟ್ಗಳು

| ಈವೆಂಟ್            | ಯಾವಾಗ                                          | ಪೇಲೋಡ್                        |
| ----------------- | ---------------------------------------------- | ----------------------------- |
| `onRequest`       | ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗೂ ಮೊದಲು                        | ವಿನಂತಿಯ ಸಂದರ್ಭ                |
| `onResponse`      | ಚಾಟ್ ಹ್ಯಾಂಡ್ಲರ್ನ ನಂತರ                          | ಪ್ರತಿಕ್ರಿಯೆಯ ಡೇಟಾ             |
| `onError`         | ಹ್ಯಾಂಡ್ಲರ್ ದೋಷ ಸಂಭವಿಸಿದಾಗ                      | ದೋಷದ ಆಬ್ಜೆಕ್ಟ್                |
| `onModelSelect`   | ರೂಟಿಂಗ್ಗಾಗಿ ಮಾಡೆಲ್ ಆಯ್ಕೆ ಮಾಡಿದಾಗ               | ಮಾಡೆಲ್ ಮಾಹಿತಿ                 |
| `onComboResolve`  | ಕಾಂಬೊ ರೂಟಿಂಗ್ ಪರಿಹರಿಸಿದಾಗ                      | ಕಾಂಬೊ ಗುರಿಗಳು                 |
| `onRateLimit`     | ದರ ಮಿತಿ ತಲುಪಿದಾಗ                               | ಮಿತಿಯ ಮಾಹಿತಿ                  |
| `onQuotaExhaust`  | ಕೋಟಾ ಮುಗಿದಾಗ                                   | ಕೋಟಾ ಮಾಹಿತಿ                   |
| `onProviderError` | ಪೂರೈಕೆದಾರರು ದೋಷವನ್ನು ಹಿಂದಿರುಗಿಸಿದಾಗ            | ದೋಷದ ವಿವರಗಳು                  |
| `onStreamStart`   | SSE ಸ್ಟ್ರೀಮ್ ಪ್ರಾರಂಭವಾದಾಗ                      | ಸ್ಟ್ರೀಮ್ ಮಾಹಿತಿ               |
| `onStreamEnd`     | SSE ಸ್ಟ್ರೀಮ್ ಮುಗಿದಾಗ                           | ಸ್ಟ್ರೀಮ್ ಅಂಕಿಅಂಶಗಳು           |
| `onInstall`       | ಪ್ಲಗಿನ್ ಸ್ಥಾಪಿಸಿದಾಗ                            | `{ name, version, manifest }` |
| `onActivate`      | ಪ್ಲಗಿನ್ ಸಕ್ರಿಯಗೊಳಿಸಿದಾಗ                        | `{ name, version, manifest }` |
| `onDeactivate`    | ಪ್ಲಗಿನ್ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿದಾಗ                     | `{ name, version, manifest }` |
| `onUninstall`     | ಪ್ಲಗಿನ್ ಅಸ್ಥಾಪಿಸಿದಾಗ (ಫೈಲ್ಗಳನ್ನು ಅಳಿಸುವ ಮೊದಲು) | `{ name, version, manifest }` |

## ಉದಾಹರಣೆಗಳು

### ವಿನಂತಿ ಲಾಗರ್

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ದರ ಮಿತಿಗೊಳಿಸುವಿಕೆ

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 ನಿಮಿಷ
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

### ಪ್ರತಿಕ್ರಿಯೆ ಪರಿವರ್ತಕ

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
