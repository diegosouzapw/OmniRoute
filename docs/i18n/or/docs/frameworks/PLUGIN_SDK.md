# OmniRoute Plugin SDK (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ଶୀଘ୍ର ଆରମ୍ଭ

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

## API ସନ୍ଦର୍ଭ

### `definePlugin(def: PluginDefinition): Plugin`

ଡିଫଲ୍ଟ ମୂଲ୍ୟ ସହିତ ଏକ Plugin ଅବଜେକ୍ଟ ସୃଷ୍ଟି କରୁଥିବା ଫ୍ୟାକ୍ଟରି ଫଙ୍କସନ୍।

**ପାରାମିଟରଗୁଡ଼ିକ:**

- `name` (string, ଆବଶ୍ୟକ) — kebab-caseରେ Plugin ନାମ
- `priority` (number, ବୈକଳ୍ପିକ, ଡିଫଲ୍ଟ: 100) — କମ୍ ମୂଲ୍ୟ ଥିବାଟି ପ୍ରଥମେ ଚାଲେ
- `enabled` (boolean, ବୈକଳ୍ପିକ, ଡିଫଲ୍ଟ: true) — ସକ୍ଷମ ଅବସ୍ଥାରେ ଆରମ୍ଭ କରିବେ?
- `onRequest` (function, ବୈକଳ୍ପିକ) — chat handler ପୂର୍ବରୁ ଚାଲେ
- `onResponse` (function, ବୈକଳ୍ପିକ) — chat handler ପରେ ଚାଲେ
- `onError` (function, ବୈକଳ୍ପିକ) — handlerରେ ତ୍ରୁଟି ହେଲେ ଚାଲେ

### `blockRequest(response?): BlockingHookResult`

ଅନୁରୋଧକୁ ଅବରୋଧ କରନ୍ତୁ ଏବଂ ବୈକଳ୍ପିକ ଭାବେ ଏକ କଷ୍ଟମ୍ ପ୍ରତିକ୍ରିୟା ଫେରାନ୍ତୁ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ଅନୁରୋଧଟି provider ପାଖରେ ପହଞ୍ଚିବା ପୂର୍ବରୁ ତାହାର body ପରିବର୍ତ୍ତନ କରନ୍ତୁ।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

ଅନୁରୋଧ context ସହିତ metadata ସଂଲଗ୍ନ କରନ୍ତୁ।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| ଫିଲ୍ଡ       | ପ୍ରକାର                    | ବର୍ଣ୍ଣନା                    |
| ----------- | ------------------------- | --------------------------- |
| `requestId` | `string`                  | ଅନନ୍ୟ ଅନୁରୋଧ ପରିଚୟକ         |
| `model`     | `string`                  | ଅନୁରୋଧ କରାଯାଇଥିବା model ନାମ |
| `provider`  | `string`                  | ଲକ୍ଷ୍ୟ provider ID          |
| `body`      | `Record<string, unknown>` | ଅନୁରୋଧ body                 |
| `headers`   | `Record<string, string>`  | ଅନୁରୋଧ headers              |
| `metadata`  | `Record<string, unknown>` | ପରିବର୍ତ୍ତନଶୀଳ metadata      |
| `timestamp` | `number`                  | ଅନୁରୋଧ timestamp            |

## ମାନିଫେଷ୍ଟ (`plugin.json`)

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

### Hook ଅଗ୍ରାଧିକାର

Hooksକୁ ଅଗ୍ରାଧିକାର ସହିତ ବିନ୍ୟାସ କରାଯାଇପାରେ (କମ୍ = ପ୍ରଥମେ ଚାଲେ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

କିମ୍ବା ସରଳ boolean ଭାବରେ (ଡିଫଲ୍ଟ ଅଗ୍ରାଧିକାର 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ଅନୁମତି ପ୍ରଣାଳୀ

ପ୍ଲଗଇନ୍ଗୁଡ଼ିକ ଏକ ସ୍ୟାଣ୍ଡବକ୍ସ କରାଯାଇଥିବା VM ପ୍ରସଙ୍ଗରେ ଚାଲେ। ବାହ୍ୟ ସମ୍ବଳଗୁଡ଼ିକୁ ଆକ୍ସେସ୍ କରିବା ପାଇଁ ସ୍ପଷ୍ଟ ଅନୁମତି ଆବଶ୍ୟକ:

| ଅନୁମତି       | ପ୍ରଦାନ କରୁଥିବା ଆକ୍ସେସ୍                                       |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | କେବଳ ପଠନଯୋଗ୍ୟ `process.env` ପ୍ରକ୍ସି                          |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

କୌଣସି ଅନୁମତି ବିନା, ସମ୍ପୃକ୍ତ ଗ୍ଲୋବାଲ୍ଗୁଡ଼ିକ ସ୍ୟାଣ୍ଡବକ୍ସରେ ଉପଲବ୍ଧ ହୁଏ ନାହିଁ।

## କନଫିଗ୍ ସ୍କିମା

କନଫିଗର୍ କରାଯାଇପାରୁଥିବା ସେଟିଂସ୍ଗୁଡ଼ିକୁ `configSchema`ରେ ପରିଭାଷିତ କରନ୍ତୁ:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "ବାହ୍ୟ API କୀ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ଫିଲ୍ଡ ପ୍ରକାରଗୁଡ଼ିକ: `string`, `number`, `boolean`, `select`

ଫିଲ୍ଡ ବିକଳ୍ପଗୁଡ଼ିକ: `default`, `min`, `max`, `enum`, `description`

କନଫିଗ୍ ମୂଲ୍ୟଗୁଡ଼ିକ ଡାଟାବେସ୍ରେ ସ୍ଥାୟୀ ଭାବରେ ସଂରକ୍ଷିତ ହୁଏ ଏବଂ ଡ୍ୟାସ୍ବୋର୍ଡ କନଫିଗ୍ ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଆକ୍ସେସ୍ କରାଯାଇପାରେ।

## ବିଲ୍ଟ-ଇନ୍ ଇଭେଣ୍ଟଗୁଡ଼ିକ

| ଇଭେଣ୍ଟ            | କେତେବେଳେ                                                  | ପେଲୋଡ୍                        |
| ----------------- | --------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ଚାଟ୍ ହ୍ୟାଣ୍ଡଲର୍ ପୂର୍ବରୁ                                   | ଅନୁରୋଧ ପ୍ରସଙ୍ଗ                |
| `onResponse`      | ଚାଟ୍ ହ୍ୟାଣ୍ଡଲର୍ ପରେ                                       | ପ୍ରତିକ୍ରିୟା ଡାଟା              |
| `onError`         | ହ୍ୟାଣ୍ଡଲର୍ ତ୍ରୁଟି ସମୟରେ                                   | ତ୍ରୁଟି ଅବଜେକ୍ଟ                |
| `onModelSelect`   | ରାଉଟିଂ ପାଇଁ ମଡେଲ୍ ଚୟନ ହେଲେ                                | ମଡେଲ୍ ସୂଚନା                   |
| `onComboResolve`  | କମ୍ବୋ ରାଉଟିଂ ସମାଧାନ ହେଲେ                                  | କମ୍ବୋ ଲକ୍ଷ୍ୟଗୁଡ଼ିକ            |
| `onRateLimit`     | ରେଟ୍ ସୀମାରେ ପହଞ୍ଚିଲେ                                      | ସୀମା ସୂଚନା                    |
| `onQuotaExhaust`  | କୋଟା ଶେଷ ହେଲେ                                             | କୋଟା ସୂଚନା                    |
| `onProviderError` | ପ୍ରଦାନକାରୀ ତ୍ରୁଟି ଫେରାଇଲେ                                 | ତ୍ରୁଟି ବିବରଣୀ                 |
| `onStreamStart`   | SSE ଷ୍ଟ୍ରିମ୍ ଆରମ୍ଭ ହେଲେ                                   | ଷ୍ଟ୍ରିମ୍ ସୂଚନା                |
| `onStreamEnd`     | SSE ଷ୍ଟ୍ରିମ୍ ଶେଷ ହେଲେ                                     | ଷ୍ଟ୍ରିମ୍ ପରିସଂଖ୍ୟାନ           |
| `onInstall`       | ପ୍ଲଗଇନ୍ ଇନ୍ଷ୍ଟଲ୍ ହେଲେ                                     | `{ name, version, manifest }` |
| `onActivate`      | ପ୍ଲଗଇନ୍ ସକ୍ରିୟ ହେଲେ                                       | `{ name, version, manifest }` |
| `onDeactivate`    | ପ୍ଲଗଇନ୍ ନିଷ୍କ୍ରିୟ ହେଲେ                                    | `{ name, version, manifest }` |
| `onUninstall`     | ପ୍ଲଗଇନ୍ ଅନ୍ଇନ୍ଷ୍ଟଲ୍ ହେଲେ (ଫାଇଲ୍ଗୁଡ଼ିକ ବିଲୋପ ହେବା ପୂର୍ବରୁ) | `{ name, version, manifest }` |

## ଉଦାହରଣଗୁଡ଼ିକ

### ଅନୁରୋଧ ଲଗର୍

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ରେଟ୍ ଲିମିଟର୍

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 ମିନିଟ୍
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

### ପ୍ରତିକ୍ରିୟା ରୂପାନ୍ତରକାରୀ

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
