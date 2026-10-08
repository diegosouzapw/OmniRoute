# OmniRoute Plugin SDK (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ፈጣን አጀማመር

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

## የAPI ማጣቀሻ

### `definePlugin(def: PluginDefinition): Plugin`

ነባሪ ቅንብሮች ያሉት Plugin ነገርን የሚፈጥር የፋብሪካ ፈንክሽን።

**መለኪያዎች፦**

- `name` (string, አስፈላጊ) — በkebab-case የተጻፈ የPlugin ስም
- `priority` (number, አማራጭ, ነባሪ፦ 100) — ዝቅተኛው ቀድሞ ይሰራል
- `enabled` (boolean, አማራጭ, ነባሪ፦ true) — እንደነቃ ይጀምር?
- `onRequest` (function, አማራጭ) — ከchat handler በፊት ይሰራል
- `onResponse` (function, አማራጭ) — ከchat handler በኋላ ይሰራል
- `onError` (function, አማራጭ) — የhandler ስህተት ሲኖር ይሰራል

### `blockRequest(response?): BlockingHookResult`

ጥያቄውን ያግዱ እና እንደ አማራጭ ብጁ ምላሽ ይመልሱ።

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ጥያቄው ወደ provider ከመድረሱ በፊት የጥያቄውን ይዘት ያሻሽሉ።

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

metadataን ከጥያቄው context ጋር ያያይዙ።

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## የPlugin Context (`PluginContext`)

| መስክ         | ዓይነት                      | መግለጫ               |
| ----------- | ------------------------- | ------------------ |
| `requestId` | `string`                  | ልዩ የጥያቄ መለያ        |
| `model`     | `string`                  | የተጠየቀው የmodel ስም   |
| `provider`  | `string`                  | የዒላማ provider ID   |
| `body`      | `Record<string, unknown>` | የጥያቄ ይዘት           |
| `headers`   | `Record<string, string>`  | የጥያቄ headers       |
| `metadata`  | `Record<string, unknown>` | ሊለወጥ የሚችል metadata |
| `timestamp` | `number`                  | የጥያቄ timestamp     |

## Manifest (`plugin.json`)

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

### የHook ቅድሚያ

Hooks በቅድሚያ ሊዋቀሩ ይችላሉ (ዝቅተኛ = ቀድሞ ይሰራል)፦

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ወይም እንደ ቀላል boolean እሴቶች (ነባሪ ቅድሚያ 100)፦

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## የፈቃድ ስርዓት

ፕለጊኖች በsandbox በተከለለ VM አውድ ውስጥ ይሰራሉ። ውጫዊ ሀብቶችን ለመድረስ ግልጽ ፈቃዶች ያስፈልጋሉ፦

| ፈቃድ          | የሚፈቅዳቸው                                                      |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | ለንባብ ብቻ የሆነ `process.env` proxy                              |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ፈቃድ ከሌለ፣ ተዛማጅ globals በsandbox ውስጥ አይገኙም።

## የውቅረት Schema

ሊዋቀሩ የሚችሉ ቅንብሮችን በ`configSchema` ውስጥ ይግለጹ፦

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "የውጫዊ API ቁልፍ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

የመስክ አይነቶች፦ `string`፣ `number`፣ `boolean`፣ `select`

የመስክ አማራጮች፦ `default`፣ `min`፣ `max`፣ `enum`፣ `description`

የውቅረት እሴቶች በውሂብ ጎታው ውስጥ ይቀመጣሉ፣ እንዲሁም በdashboard የውቅረት ገጽ በኩል ማግኘት ይቻላል።

## አብረው የተካተቱ ክስተቶች

| ክስተት              | መቼ                             | Payload                       |
| ----------------- | ------------------------------ | ----------------------------- |
| `onRequest`       | ከchat handler በፊት              | የጥያቄ አውድ                      |
| `onResponse`      | ከchat handler በኋላ              | የምላሽ ውሂብ                      |
| `onError`         | የhandler ስህተት ሲከሰት             | የስህተት object                  |
| `onModelSelect`   | ለrouting model ሲመረጥ            | የmodel መረጃ                    |
| `onComboResolve`  | Combo routing ሲፈታ              | የCombo ዒላማዎች                  |
| `onRateLimit`     | የRate limit ገደብ ሲደረስ           | የገደብ መረጃ                      |
| `onQuotaExhaust`  | Quota ሲያልቅ                     | የQuota መረጃ                    |
| `onProviderError` | Provider ስህተት ሲመልስ             | የስህተት ዝርዝሮች                   |
| `onStreamStart`   | SSE stream ሲጀምር                | የStream መረጃ                   |
| `onStreamEnd`     | SSE stream ሲያበቃ                | የStream ስታቲስቲክስ               |
| `onInstall`       | Plugin ሲጫን                     | `{ name, version, manifest }` |
| `onActivate`      | Plugin ሲነቃ                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin ከስራ ሲቦዝን                | `{ name, version, manifest }` |
| `onUninstall`     | Plugin ሲወገድ (ፋይሎች ከመሰረዛቸው በፊት) | `{ name, version, manifest }` |

## ምሳሌዎች

### የጥያቄ Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### የRate Limiter

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 ደቂቃ
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

### የምላሽ Transformer

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
