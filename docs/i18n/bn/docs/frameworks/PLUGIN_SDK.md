# OmniRoute Plugin SDK (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## দ্রুত শুরু

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

## API রেফারেন্স

### `definePlugin(def: PluginDefinition): Plugin`

ডিফল্ট মানসহ একটি Plugin অবজেক্ট তৈরি করে এমন ফ্যাক্টরি ফাংশন।

**প্যারামিটারসমূহ:**

- `name` (string, আবশ্যক) — kebab-case-এ Plugin-এর নাম
- `priority` (number, ঐচ্ছিক, ডিফল্ট: 100) — কম মানেরটি আগে চলে
- `enabled` (boolean, ঐচ্ছিক, ডিফল্ট: true) — সক্রিয় অবস্থায় শুরু হবে কি না
- `onRequest` (function, ঐচ্ছিক) — chat handler-এর আগে চলে
- `onResponse` (function, ঐচ্ছিক) — chat handler-এর পরে চলে
- `onError` (function, ঐচ্ছিক) — handler-এ ত্রুটি হলে চলে

### `blockRequest(response?): BlockingHookResult`

অনুরোধটি ব্লক করে এবং ঐচ্ছিকভাবে একটি কাস্টম response ফেরত দেয়।

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

অনুরোধটি provider-এর কাছে পৌঁছানোর আগে request body পরিবর্তন করে।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

অনুরোধের context-এ metadata যুক্ত করে।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| ফিল্ড       | ধরন                       | বিবরণ                     |
| ----------- | ------------------------- | ------------------------- |
| `requestId` | `string`                  | অনুরোধের অনন্য শনাক্তকারী |
| `model`     | `string`                  | অনুরোধ করা model-এর নাম   |
| `provider`  | `string`                  | লক্ষ্য provider ID        |
| `body`      | `Record<string, unknown>` | Request body              |
| `headers`   | `Record<string, string>`  | Request headers           |
| `metadata`  | `Record<string, unknown>` | পরিবর্তনযোগ্য metadata    |
| `timestamp` | `number`                  | অনুরোধের timestamp        |

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

### Hook-এর অগ্রাধিকার

Hook-গুলো priority দিয়ে কনফিগার করা যায় (কম মান = আগে চলে):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

অথবা সাধারণ boolean হিসেবে (ডিফল্ট priority 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## অনুমতি ব্যবস্থা

প্লাগইনগুলো একটি স্যান্ডবক্সযুক্ত VM প্রসঙ্গে চলে। বাহ্যিক রিসোর্সে অ্যাক্সেসের জন্য সুস্পষ্ট অনুমতি প্রয়োজন:

| অনুমতি       | যা ব্যবহারের অনুমতি দেয়                                     |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | শুধুমাত্র-পঠনযোগ্য `process.env` প্রক্সি                     |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

কোনো অনুমতি না থাকলে, সংশ্লিষ্ট গ্লোবালগুলো স্যান্ডবক্সে একেবারেই উপলভ্য থাকে না।

## কনফিগ স্কিমা

কনফিগারযোগ্য সেটিংস `configSchema`-তে নির্ধারণ করুন:

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

ফিল্ডের ধরন: `string`, `number`, `boolean`, `select`

ফিল্ডের বিকল্প: `default`, `min`, `max`, `enum`, `description`

কনফিগের মানগুলো ডেটাবেজে সংরক্ষিত থাকে এবং ড্যাশবোর্ডের কনফিগ পৃষ্ঠার মাধ্যমে অ্যাক্সেস করা যায়।

## বিল্ট-ইন ইভেন্ট

| ইভেন্ট            | কখন                                        | পেলোড                         |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | চ্যাট হ্যান্ডলারের আগে                     | অনুরোধের প্রসঙ্গ              |
| `onResponse`      | চ্যাট হ্যান্ডলারের পরে                     | প্রতিক্রিয়ার ডেটা            |
| `onError`         | হ্যান্ডলারে ত্রুটি হলে                     | ত্রুটি অবজেক্ট                |
| `onModelSelect`   | রাউটিংয়ের জন্য মডেল নির্বাচিত হলে         | মডেলের তথ্য                   |
| `onComboResolve`  | কম্বো রাউটিং সমাধান হলে                    | কম্বোর লক্ষ্যসমূহ             |
| `onRateLimit`     | রেট সীমায় পৌঁছালে                         | সীমার তথ্য                    |
| `onQuotaExhaust`  | কোটা শেষ হয়ে গেলে                         | কোটার তথ্য                    |
| `onProviderError` | প্রোভাইডার ত্রুটি ফেরত দিলে                | ত্রুটির বিস্তারিত             |
| `onStreamStart`   | SSE স্ট্রিম শুরু হলে                       | স্ট্রিমের তথ্য                |
| `onStreamEnd`     | SSE স্ট্রিম শেষ হলে                        | স্ট্রিমের পরিসংখ্যান          |
| `onInstall`       | প্লাগইন ইনস্টল হলে                         | `{ name, version, manifest }` |
| `onActivate`      | প্লাগইন সক্রিয় হলে                        | `{ name, version, manifest }` |
| `onDeactivate`    | প্লাগইন নিষ্ক্রিয় হলে                     | `{ name, version, manifest }` |
| `onUninstall`     | প্লাগইন আনইনস্টল হলে (ফাইল মুছে ফেলার আগে) | `{ name, version, manifest }` |

## উদাহরণ

### অনুরোধ লগার

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### রেট লিমিটার

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // ১ মিনিট
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

### প্রতিক্রিয়া রূপান্তরকারী

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
