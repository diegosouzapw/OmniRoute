# OmniRoute Plugin SDK (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## فوری آغاز

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

## API حوالہ

### `definePlugin(def: PluginDefinition): Plugin`

ایک فیکٹری فنکشن جو طے شدہ اقدار کے ساتھ ایک Plugin آبجیکٹ بناتا ہے۔

**پیرامیٹرز:**

- `name` (string، درکار) — kebab-case میں Plugin کا نام
- `priority` (number، اختیاری، طے شدہ: 100) — کم قدر والا پہلے چلتا ہے
- `enabled` (boolean، اختیاری، طے شدہ: true) — کیا فعال حالت میں شروع کیا جائے؟
- `onRequest` (function، اختیاری) — chat handler سے پہلے چلتا ہے
- `onResponse` (function، اختیاری) — chat handler کے بعد چلتا ہے
- `onError` (function، اختیاری) — handler میں خرابی آنے پر چلتا ہے

### `blockRequest(response?): BlockingHookResult`

درخواست کو مسدود کریں اور اختیاری طور پر حسبِ ضرورت جواب واپس کریں۔

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

درخواست کی body کو provider تک پہنچنے سے پہلے تبدیل کریں۔

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

درخواست کے context کے ساتھ metadata منسلک کریں۔

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin کا Context (`PluginContext`)

| فیلڈ        | قسم                       | وضاحت                        |
| ----------- | ------------------------- | ---------------------------- |
| `requestId` | `string`                  | درخواست کا منفرد شناخت کنندہ |
| `model`     | `string`                  | مطلوبہ model کا نام          |
| `provider`  | `string`                  | ہدف provider ID              |
| `body`      | `Record<string, unknown>` | درخواست کی body              |
| `headers`   | `Record<string, string>`  | درخواست کے headers           |
| `metadata`  | `Record<string, unknown>` | قابلِ ترمیم metadata         |
| `timestamp` | `number`                  | درخواست کا timestamp         |

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

### Hook کی ترجیح

Hooks کو ترجیح کے ساتھ ترتیب دیا جا سکتا ہے (کم قدر = پہلے چلتا ہے):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

یا سادہ booleans کے طور پر (طے شدہ ترجیح 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## اجازتوں کا نظام

پلگ اِنز ایک سینڈ باکس شدہ VM سیاق میں چلتے ہیں۔ بیرونی وسائل تک رسائی کے لیے واضح اجازتیں درکار ہوتی ہیں:

| اجازت        | فراہم کردہ رسائی                                             |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | صرف پڑھنے کے لیے `process.env` پراکسی                        |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

اجازت کے بغیر، متعلقہ گلوبلز سینڈ باکس میں دستیاب نہیں ہوتے۔

## کنفیگریشن اسکیما

قابلِ کنفیگریشن ترتیبات کو `configSchema` میں متعین کریں:

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

فیلڈ کی اقسام: `string`، `number`، `boolean`، `select`

فیلڈ کے اختیارات: `default`، `min`، `max`، `enum`، `description`

کنفیگریشن کی قدریں ڈیٹابیس میں محفوظ رہتی ہیں اور ڈیش بورڈ کے کنفیگریشن صفحے کے ذریعے قابلِ رسائی ہوتی ہیں۔

## بلٹ اِن ایونٹس

| ایونٹ             | کب                                                   | پے لوڈ                        |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | چیٹ ہینڈلر سے پہلے                                   | درخواست کا سیاق               |
| `onResponse`      | چیٹ ہینڈلر کے بعد                                    | جوابی ڈیٹا                    |
| `onError`         | ہینڈلر میں خرابی پر                                  | خرابی کا آبجیکٹ               |
| `onModelSelect`   | روٹنگ کے لیے ماڈل منتخب ہونے پر                      | ماڈل کی معلومات               |
| `onComboResolve`  | کومبو روٹنگ حل ہونے پر                               | کومبو اہداف                   |
| `onRateLimit`     | شرح کی حد پوری ہونے پر                               | حد کی معلومات                 |
| `onQuotaExhaust`  | کوٹہ ختم ہونے پر                                     | کوٹے کی معلومات               |
| `onProviderError` | فراہم کنندہ کی جانب سے خرابی لوٹانے پر               | خرابی کی تفصیلات              |
| `onStreamStart`   | SSE اسٹریم شروع ہونے پر                              | اسٹریم کی معلومات             |
| `onStreamEnd`     | SSE اسٹریم ختم ہونے پر                               | اسٹریم کے اعداد و شمار        |
| `onInstall`       | پلگ اِن انسٹال ہونے پر                               | `{ name, version, manifest }` |
| `onActivate`      | پلگ اِن فعال ہونے پر                                 | `{ name, version, manifest }` |
| `onDeactivate`    | پلگ اِن غیر فعال ہونے پر                             | `{ name, version, manifest }` |
| `onUninstall`     | پلگ اِن اَن انسٹال ہونے پر (فائلیں حذف ہونے سے پہلے) | `{ name, version, manifest }` |

## مثالیں

### درخواست لاگر

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### شرح محدود کنندہ

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 منٹ
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

### جواب کی ہیئت بدلنے والا

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
