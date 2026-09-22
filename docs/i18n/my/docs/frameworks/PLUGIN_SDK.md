# OmniRoute Plugin SDK (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## အမြန်စတင်ခြင်း

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

## API ကိုးကားချက်

### `definePlugin(def: PluginDefinition): Plugin`

မူလတန်ဖိုးများပါဝင်သည့် Plugin object တစ်ခုကို ဖန်တီးပေးသော factory function ဖြစ်သည်။

**ပါရာမီတာများ:**

- `name` (string, လိုအပ်သည်) — kebab-case ဖြင့် ရေးသားထားသော Plugin အမည်
- `priority` (number, ရွေးချယ်နိုင်သည်, မူလတန်ဖိုး: 100) — တန်ဖိုးနိမ့်လေလေ ဦးစွာ လုပ်ဆောင်လေလေဖြစ်သည်
- `enabled` (boolean, ရွေးချယ်နိုင်သည်, မူလတန်ဖိုး: true) — ဖွင့်ထားသည့်အခြေအနေဖြင့် စတင်မည်လား
- `onRequest` (function, ရွေးချယ်နိုင်သည်) — chat handler မတိုင်မီ လုပ်ဆောင်သည်
- `onResponse` (function, ရွေးချယ်နိုင်သည်) — chat handler ပြီးနောက် လုပ်ဆောင်သည်
- `onError` (function, ရွေးချယ်နိုင်သည်) — handler အမှားဖြစ်ပေါ်သည့်အခါ လုပ်ဆောင်သည်

### `blockRequest(response?): BlockingHookResult`

Request ကို ပိတ်ဆို့ပြီး စိတ်ကြိုက် response တစ်ခုကို ရွေးချယ်၍ ပြန်ပေးနိုင်သည်။

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Provider ထံ မရောက်ရှိမီ request body ကို ပြင်ဆင်သည်။

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Request context တွင် metadata ကို ပူးတွဲထည့်သွင်းသည်။

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| Field       | Type                      | ဖော်ပြချက်                 |
| ----------- | ------------------------- | -------------------------- |
| `requestId` | `string`                  | သီးသန့် request အမှတ်အသား  |
| `model`     | `string`                  | တောင်းဆိုထားသော model အမည် |
| `provider`  | `string`                  | ဦးတည်ရာ provider ID        |
| `body`      | `Record<string, unknown>` | Request body               |
| `headers`   | `Record<string, string>`  | Request headers            |
| `metadata`  | `Record<string, unknown>` | ပြင်ဆင်နိုင်သော metadata   |
| `timestamp` | `number`                  | Request timestamp          |

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

### Hook ဦးစားပေးအဆင့်

Hook များကို ဦးစားပေးအဆင့်ဖြင့် သတ်မှတ်နိုင်သည် (တန်ဖိုးနိမ့်လေလေ = ဦးစွာ လုပ်ဆောင်လေလေ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

သို့မဟုတ် ရိုးရှင်းသော boolean တန်ဖိုးများအဖြစ် သတ်မှတ်နိုင်သည် (မူလဦးစားပေးအဆင့် 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ခွင့်ပြုချက်စနစ်

Plugin များသည် sandbox ပြုလုပ်ထားသော VM context တစ်ခုအတွင်း လည်ပတ်သည်။ ပြင်ပအရင်းအမြစ်များကို အသုံးပြုရန် တိကျစွာ သတ်မှတ်ထားသော ခွင့်ပြုချက်များ လိုအပ်သည်-

| ခွင့်ပြုချက် | ခွင့်ပြုသည့်အရာများ                                          |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | ဖတ်ရှုရန်သာဖြစ်သော `process.env` proxy                       |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ခွင့်ပြုချက်မရှိပါက သက်ဆိုင်ရာ global များကို sandbox အတွင်း အသုံးပြုနိုင်မည် မဟုတ်ပါ။

## Config Schema

ပြင်ဆင်သတ်မှတ်နိုင်သော ဆက်တင်များကို `configSchema` တွင် သတ်မှတ်ပါ-

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "ပြင်ပ API key" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Field အမျိုးအစားများ- `string`, `number`, `boolean`, `select`

Field ရွေးချယ်စရာများ- `default`, `min`, `max`, `enum`, `description`

Config တန်ဖိုးများကို database ထဲတွင် သိမ်းဆည်းထားပြီး dashboard config စာမျက်နှာမှတစ်ဆင့် အသုံးပြုနိုင်သည်။

## ထည့်သွင်းပေးထားသော Event များ

| Event             | ဖြစ်ပွားချိန်                          | Payload                       |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | Chat handler မတိုင်မီ                  | Request context               |
| `onResponse`      | Chat handler ပြီးနောက်                 | Response data                 |
| `onError`         | Handler error ဖြစ်ပေါ်ချိန်            | Error object                  |
| `onModelSelect`   | Routing အတွက် model ရွေးချယ်သည့်အချိန် | Model အချက်အလက်               |
| `onComboResolve`  | Combo routing ဖြေရှင်းပြီးချိန်        | Combo target များ             |
| `onRateLimit`     | Rate limit ပြည့်သွားချိန်              | Limit အချက်အလက်               |
| `onQuotaExhaust`  | Quota ကုန်ဆုံးချိန်                    | Quota အချက်အလက်               |
| `onProviderError` | Provider က error ပြန်ပေးချိန်          | Error အသေးစိတ်                |
| `onStreamStart`   | SSE stream စတင်ချိန်                   | Stream အချက်အလက်              |
| `onStreamEnd`     | SSE stream ပြီးဆုံးချိန်               | Stream စာရင်းအင်း             |
| `onInstall`       | Plugin ထည့်သွင်းပြီးချိန်              | `{ name, version, manifest }` |
| `onActivate`      | Plugin ကို အသက်သွင်းချိန်              | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin ကို ပိတ်ချိန်                   | `{ name, version, manifest }` |
| `onUninstall`     | Plugin ဖယ်ရှားချိန် (ဖိုင်များမဖျက်မီ) | `{ name, version, manifest }` |

## နမူနာများ

### Request Logger

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Rate Limiter

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // ၁ မိနစ်
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

### Response Transformer

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
