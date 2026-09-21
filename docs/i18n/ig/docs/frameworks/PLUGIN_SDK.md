# OmniRoute Plugin SDK (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Mmalite Ngwa Ngwa

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

## Ntụaka API

### `definePlugin(def: PluginDefinition): Plugin`

Ọrụ nrụpụta nke na-emepụta ihe Plugin nwere ụkpụrụ ndabara.

**Paramita:**

- `name` (string, achọrọ) — Aha plugin n'ụdị kebab-case
- `priority` (number, nhọrọ, ndabara: 100) — Nke dị ala na-arụ ọrụ mbụ
- `enabled` (boolean, nhọrọ, ndabara: true) — Ọ ga-amalite dịka nke agbanyere?
- `onRequest` (function, nhọrọ) — Na-arụ ọrụ tupu chat handler
- `onResponse` (function, nhọrọ) — Na-arụ ọrụ mgbe chat handler gachara
- `onError` (function, nhọrọ) — Na-arụ ọrụ mgbe njehie handler mere

### `blockRequest(response?): BlockingHookResult`

Gbochie arịrịọ ahụ ma, ọ bụrụ na achọrọ, weghachite nzaghachi ahaziri iche.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Gbanwee body nke arịrịọ tupu ọ rute provider.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Tinye metadata na context nke arịrịọ ahụ.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Context Plugin (`PluginContext`)

| Field       | Type                      | Nkọwa                          |
| ----------- | ------------------------- | ------------------------------ |
| `requestId` | `string`                  | Ihe njirimara arịrịọ pụrụ iche |
| `model`     | `string`                  | Aha model a rịọrọ              |
| `provider`  | `string`                  | ID provider ezubere iche       |
| `body`      | `Record<string, unknown>` | Body nke arịrịọ                |
| `headers`   | `Record<string, string>`  | Headers nke arịrịọ             |
| `metadata`  | `Record<string, unknown>` | Metadata enwere ike ịgbanwe    |
| `timestamp` | `number`                  | Timestamp nke arịrịọ           |

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

### Ibu Ụzọ nke Hook

Enwere ike iji ibu ụzọ hazie hooks (nke dị ala = na-arụ ọrụ mbụ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ma ọ bụ dịka boolean ndị dị mfe (ibu ụzọ ndabara 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Usoro Ikikere

Plugins na-arụ ọrụ n'ime ọnọdụ VM e kewapụrụ iche. Ịnweta akụrụngwa ndị dị na mpụga chọrọ ikikere doro anya:

| Ikikere      | Ihe ọ na-enye ohere                                          |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Proxy `process.env` nke bụ naanị maka ịgụ                    |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Ọ bụrụ na enweghị ikikere, globals ndị kwekọrọ na ya agaghị adị n'ime sandbox ahụ.

## Schema Nhazi

Kọwaa ntọala ndị enwere ike ịhazi n'ime `configSchema`:

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

Ụdị field: `string`, `number`, `boolean`, `select`

Nhọrọ field: `default`, `min`, `max`, `enum`, `description`

A na-echekwa uru config n'ime database, a pụkwara ịnweta ha site na ibe config nke dashboard.

## Events Ndị E Wuru N'ime Ya

| Event             | Mgbe                                      | Payload                       |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | Tupu chat handler                         | Ọnọdụ request                 |
| `onResponse`      | Mgbe chat handler mechara                 | Data response                 |
| `onError`         | Mgbe njehie handler mere                  | Object njehie                 |
| `onModelSelect`   | Mgbe ahọpụtara model maka routing         | Ozi model                     |
| `onComboResolve`  | Mgbe e doziri combo routing               | Ebe combo na-aga              |
| `onRateLimit`     | Mgbe e ruru rate limit                    | Ozi limit                     |
| `onQuotaExhaust`  | Mgbe quota gwụsịrị                        | Ozi quota                     |
| `onProviderError` | Mgbe provider weghachiri njehie           | Nkọwa njehie                  |
| `onStreamStart`   | Mgbe SSE stream malitere                  | Ozi stream                    |
| `onStreamEnd`     | Mgbe SSE stream kwụsịrị                   | Ndekọ ọnụ ọgụgụ stream        |
| `onInstall`       | Mgbe arụnyere plugin                      | `{ name, version, manifest }` |
| `onActivate`      | Mgbe e mere ka plugin rụọ ọrụ             | `{ name, version, manifest }` |
| `onDeactivate`    | Mgbe a kwụsịrị plugin ịrụ ọrụ             | `{ name, version, manifest }` |
| `onUninstall`     | Mgbe ewepụrụ plugin (tupu ehichapụ faịlụ) | `{ name, version, manifest }` |

## Ọmụmaatụ

### Onye Na-edekọ Request

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Onye Na-amachi Ọnụọgụ Request

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // Nkeji 1
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

### Onye Na-agbanwe Response

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
