# OmniRoute Plugin SDK (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ចាប់ផ្ដើមរហ័ស

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

## ឯកសារយោង API

### `definePlugin(def: PluginDefinition): Plugin`

អនុគមន៍រោងចក្រដែលបង្កើតវត្ថុ Plugin ជាមួយនឹងតម្លៃលំនាំដើម។

**ប៉ារ៉ាម៉ែត្រ៖**

- `name` (string, ចាំបាច់) — ឈ្មោះ Plugin ជាទម្រង់ kebab-case
- `priority` (number, ស្រេចចិត្ត, លំនាំដើម៖ 100) — តម្លៃទាបជាងដំណើរការមុន
- `enabled` (boolean, ស្រេចចិត្ត, លំនាំដើម៖ true) — ចាប់ផ្ដើមក្នុងស្ថានភាពបើកដំណើរការឬ?
- `onRequest` (function, ស្រេចចិត្ត) — ដំណើរការមុនកម្មវិធីដោះស្រាយការជជែក
- `onResponse` (function, ស្រេចចិត្ត) — ដំណើរការបន្ទាប់ពីកម្មវិធីដោះស្រាយការជជែក
- `onError` (function, ស្រេចចិត្ត) — ដំណើរការនៅពេលកម្មវិធីដោះស្រាយមានកំហុស

### `blockRequest(response?): BlockingHookResult`

ទប់ស្កាត់សំណើ និងអាចត្រឡប់ការឆ្លើយតបផ្ទាល់ខ្លួនជាជម្រើស។

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

កែប្រែខ្លឹមសារសំណើ មុនពេលវាទៅដល់អ្នកផ្ដល់សេវា។

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ភ្ជាប់ទិន្នន័យមេតាទៅនឹងបរិបទសំណើ។

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## បរិបទ Plugin (`PluginContext`)

| វាល         | ប្រភេទ                    | ការពិពណ៌នា                  |
| ----------- | ------------------------- | --------------------------- |
| `requestId` | `string`                  | ឧបករណ៍សម្គាល់សំណើតែមួយគត់   |
| `model`     | `string`                  | ឈ្មោះម៉ូដែលដែលបានស្នើសុំ    |
| `provider`  | `string`                  | ID របស់អ្នកផ្ដល់សេវាគោលដៅ   |
| `body`      | `Record<string, unknown>` | ខ្លឹមសារសំណើ                |
| `headers`   | `Record<string, string>`  | បឋមកថាសំណើ                  |
| `metadata`  | `Record<string, unknown>` | ទិន្នន័យមេតាដែលអាចកែប្រែបាន |
| `timestamp` | `number`                  | ត្រាពេលវេលានៃសំណើ           |

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

### អាទិភាព Hook

Hook អាចត្រូវបានកំណត់រចនាសម្ព័ន្ធជាមួយនឹងអាទិភាព (តម្លៃទាបជាង = ដំណើរការមុន)៖

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ឬជាតម្លៃ boolean ធម្មតា (អាទិភាពលំនាំដើម 100)៖

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ប្រព័ន្ធសិទ្ធិ

កម្មវិធីជំនួយដំណើរការក្នុងបរិបទ VM ដែលមានការការពារដាច់ដោយឡែក។ ការចូលប្រើធនធានខាងក្រៅតម្រូវឱ្យមានសិទ្ធិច្បាស់លាស់៖

| សិទ្ធិ       | ផ្តល់សិទ្ធិឱ្យ                                               |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | ប្រូកស៊ី `process.env` ដែលអាចបានតែអាន                        |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

បើគ្មានសិទ្ធិទេ globals ដែលត្រូវគ្នានឹងមិនមាននៅក្នុង sandbox ឡើយ។

## គ្រោងការកំណត់រចនាសម្ព័ន្ធ

កំណត់ការកំណត់ដែលអាចកែប្រែបានក្នុង `configSchema`៖

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "សោ API ខាងក្រៅ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ប្រភេទវាល៖ `string`, `number`, `boolean`, `select`

ជម្រើសវាល៖ `default`, `min`, `max`, `enum`, `description`

តម្លៃកំណត់រចនាសម្ព័ន្ធត្រូវបានរក្សាទុកក្នុងមូលដ្ឋានទិន្នន័យ និងអាចចូលប្រើបានតាមរយៈទំព័រកំណត់រចនាសម្ព័ន្ធនៃផ្ទាំងគ្រប់គ្រង។

## ព្រឹត្តិការណ៍ដែលមានស្រាប់

| ព្រឹត្តិការណ៍     | ពេលកើតឡើង                                            | ទិន្នន័យភ្ជាប់                |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | មុនកម្មវិធីដោះស្រាយការជជែក                           | បរិបទសំណើ                     |
| `onResponse`      | បន្ទាប់ពីកម្មវិធីដោះស្រាយការជជែក                     | ទិន្នន័យឆ្លើយតប               |
| `onError`         | នៅពេលមានកំហុសក្នុងកម្មវិធីដោះស្រាយ                   | វត្ថុកំហុស                    |
| `onModelSelect`   | ម៉ូដែលត្រូវបានជ្រើសរើសសម្រាប់ការបញ្ជូនផ្លូវ          | ព័ត៌មានម៉ូដែល                 |
| `onComboResolve`  | ការបញ្ជូនផ្លូវបែបបន្សំត្រូវបានដោះស្រាយ               | គោលដៅបែបបន្សំ                 |
| `onRateLimit`     | ឈានដល់ដែនកំណត់អត្រា                                  | ព័ត៌មានអំពីដែនកំណត់           |
| `onQuotaExhaust`  | កូតាត្រូវបានប្រើអស់                                  | ព័ត៌មានអំពីកូតា               |
| `onProviderError` | អ្នកផ្តល់សេវាបានបញ្ជូនកំហុសត្រឡប់មកវិញ               | សេចក្ដីលម្អិតអំពីកំហុស        |
| `onStreamStart`   | ស្ទ្រីម SSE បានចាប់ផ្ដើម                             | ព័ត៌មានអំពីស្ទ្រីម            |
| `onStreamEnd`     | ស្ទ្រីម SSE បានបញ្ចប់                                | ស្ថិតិស្ទ្រីម                 |
| `onInstall`       | កម្មវិធីជំនួយត្រូវបានដំឡើង                           | `{ name, version, manifest }` |
| `onActivate`      | កម្មវិធីជំនួយត្រូវបានធ្វើឱ្យសកម្ម                    | `{ name, version, manifest }` |
| `onDeactivate`    | កម្មវិធីជំនួយត្រូវបានធ្វើឱ្យអសកម្ម                   | `{ name, version, manifest }` |
| `onUninstall`     | កម្មវិធីជំនួយត្រូវបានលុបចេញ (មុនពេលឯកសារត្រូវបានលុប) | `{ name, version, manifest }` |

## ឧទាហរណ៍

### កម្មវិធីកត់ត្រាសំណើ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### កម្មវិធីកំណត់អត្រា

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 នាទី
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

### កម្មវិធីបម្លែងការឆ្លើយតប

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
