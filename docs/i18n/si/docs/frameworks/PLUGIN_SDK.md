# OmniRoute Plugin SDK (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ඉක්මන් ආරම්භය

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

## API යොමුව

### `definePlugin(def: PluginDefinition): Plugin`

පෙරනිමි අගයන් සහිත Plugin වස්තුවක් නිර්මාණය කරන කර්මාන්තශාලා ශ්රිතයකි.

**පරාමිති:**

- `name` (string, අවශ්යයි) — kebab-case ආකාරයෙන් ඇති Plugin නාමය
- `priority` (number, විකල්පයි, පෙරනිමිය: 100) — අඩු අගය ඇති ඒවා පළමුව ක්රියාත්මක වේ
- `enabled` (boolean, විකල්පයි, පෙරනිමිය: true) — සක්රීය තත්ත්වයෙන් ආරම්භ කළ යුතුද?
- `onRequest` (function, විකල්පයි) — chat handler එකට පෙර ක්රියාත්මක වේ
- `onResponse` (function, විකල්පයි) — chat handler එකට පසුව ක්රියාත්මක වේ
- `onError` (function, විකල්පයි) — handler දෝෂයකදී ක්රියාත්මක වේ

### `blockRequest(response?): BlockingHookResult`

ඉල්ලීම අවහිර කර, විකල්පයක් ලෙස අභිරුචි ප්රතිචාරයක් ආපසු ලබා දෙයි.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ඉල්ලීම් අන්තර්ගතය සපයන්නා වෙත ළඟා වීමට පෙර එය වෙනස් කරයි.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ඉල්ලීම් සන්දර්භයට පාරදත්ත අමුණයි.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin සන්දර්භය (`PluginContext`)

| ක්ෂේත්රය    | වර්ගය                     | විස්තරය                  |
| ----------- | ------------------------- | ------------------------ |
| `requestId` | `string`                  | අනන්ය ඉල්ලීම් හඳුනාගැනීම |
| `model`     | `string`                  | ඉල්ලා ඇති model නාමය     |
| `provider`  | `string`                  | ඉලක්කගත provider ID      |
| `body`      | `Record<string, unknown>` | ඉල්ලීම් අන්තර්ගතය        |
| `headers`   | `Record<string, string>`  | ඉල්ලීම් ශීර්ෂක           |
| `metadata`  | `Record<string, unknown>` | වෙනස් කළ හැකි පාරදත්ත    |
| `timestamp` | `number`                  | ඉල්ලීමේ කාල මුද්රාව      |

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

### Hook ප්රමුඛතාව

Hooks ප්රමුඛතාවක් සමඟ වින්යාස කළ හැකිය (අඩු අගය = පළමුව ක්රියාත්මක වේ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

නැතහොත් සරල boolean අගයන් ලෙස (පෙරනිමි ප්රමුඛතාව 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## අවසර පද්ධතිය

ප්ලගීන වැලිපෙට්ටිගත VM සන්දර්භයක් තුළ ක්රියාත්මක වේ. බාහිර සම්පත් වෙත ප්රවේශ වීමට පැහැදිලි අවසර අවශ්ය වේ:

| අවසරය        | ලබා දෙන දෑ                                                   |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | කියවීමට පමණක් හැකි `process.env` ප්රොක්සිය                   |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

අවසරයක් නොමැති විට, ඊට අදාළ ගෝලීය අංග වැලිපෙට්ටිය තුළ සරලවම ලබා ගත නොහැක.

## වින්යාස යෝජනා ක්රමය

වින්යාස කළ හැකි සැකසුම් `configSchema` තුළ අර්ථ දක්වන්න:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "බාහිර API යතුර" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ක්ෂේත්ර වර්ග: `string`, `number`, `boolean`, `select`

ක්ෂේත්ර විකල්ප: `default`, `min`, `max`, `enum`, `description`

වින්යාස අගයන් දත්ත සමුදාය තුළ සුරැකෙන අතර උපකරණ පුවරුවේ වින්යාස පිටුව හරහා ප්රවේශ විය හැක.

## ගොඩනඟා ඇති සිදුවීම්

| සිදුවීම           | සිදුවන අවස්ථාව                            | දත්ත භාරය                     |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | කතාබස් හසුරුවනයට පෙර                      | ඉල්ලීම් සන්දර්භය              |
| `onResponse`      | කතාබස් හසුරුවනයෙන් පසු                    | ප්රතිචාර දත්ත                 |
| `onError`         | හසුරුවන දෝෂයකදී                           | දෝෂ වස්තුව                    |
| `onModelSelect`   | මාර්ගගත කිරීම සඳහා ආකෘතිය තෝරාගත් විට     | ආකෘති තොරතුරු                 |
| `onComboResolve`  | සංයුක්ත මාර්ගගත කිරීම විසඳූ විට           | සංයුක්ත ඉලක්ක                 |
| `onRateLimit`     | අනුපාත සීමාවට ළඟා වූ විට                  | සීමා තොරතුරු                  |
| `onQuotaExhaust`  | කෝටාව අවසන් වූ විට                        | කෝටා තොරතුරු                  |
| `onProviderError` | සපයන්නා දෝෂයක් ලබා දුන් විට               | දෝෂ විස්තර                    |
| `onStreamStart`   | SSE ප්රවාහය ආරම්භ වූ විට                  | ප්රවාහ තොරතුරු                |
| `onStreamEnd`     | SSE ප්රවාහය අවසන් වූ විට                  | ප්රවාහ සංඛ්යාලේඛන             |
| `onInstall`       | ප්ලගීනය ස්ථාපනය කළ විට                    | `{ name, version, manifest }` |
| `onActivate`      | ප්ලගීනය සක්රිය කළ විට                     | `{ name, version, manifest }` |
| `onDeactivate`    | ප්ලගීනය අක්රිය කළ විට                     | `{ name, version, manifest }` |
| `onUninstall`     | ප්ලගීනය අස්ථාපනය කළ විට (ගොනු මැකීමට පෙර) | `{ name, version, manifest }` |

## උදාහරණ

### ඉල්ලීම් සටහන්කරු

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### අනුපාත සීමාකරු

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // මිනිත්තු 1
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

### ප්රතිචාර පරිවර්තකය

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
