# OmniRoute Plugin SDK (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## البدء السريع

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

## مرجع API

### `definePlugin(def: PluginDefinition): Plugin`

دالة إنشاء تُنشئ كائن Plugin باستخدام القيم الافتراضية.

**المعاملات:**

- `name` (string، مطلوب) — اسم الإضافة بصيغة kebab-case
- `priority` (number، اختياري، القيمة الافتراضية: 100) — تُنفَّذ القيمة الأقل أولًا
- `enabled` (boolean، اختياري، القيمة الافتراضية: true) — هل تبدأ الإضافة مفعّلة؟
- `onRequest` (function، اختياري) — تُنفَّذ قبل معالج المحادثة
- `onResponse` (function، اختياري) — تُنفَّذ بعد معالج المحادثة
- `onError` (function، اختياري) — تُنفَّذ عند حدوث خطأ في المعالج

### `blockRequest(response?): BlockingHookResult`

احظر الطلب وأعِد استجابة مخصصة اختياريًا.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

عدّل نص الطلب قبل وصوله إلى المزوّد.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

أرفق بيانات وصفية بسياق الطلب.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## سياق الإضافة (`PluginContext`)

| الحقل       | النوع                     | الوصف                      |
| ----------- | ------------------------- | -------------------------- |
| `requestId` | `string`                  | معرّف فريد للطلب           |
| `model`     | `string`                  | اسم النموذج المطلوب        |
| `provider`  | `string`                  | معرّف المزوّد المستهدف     |
| `body`      | `Record<string, unknown>` | نص الطلب                   |
| `headers`   | `Record<string, string>`  | ترويسات الطلب              |
| `metadata`  | `Record<string, unknown>` | بيانات وصفية قابلة للتعديل |
| `timestamp` | `number`                  | الطابع الزمني للطلب        |

## ملف البيان (`plugin.json`)

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

### أولوية الخطافات

يمكن تكوين الخطافات باستخدام الأولوية (القيمة الأقل = تُنفَّذ أولًا):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

أو باستخدام قيم منطقية بسيطة (الأولوية الافتراضية 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## نظام الأذونات

تعمل الإضافات ضمن سياق آلة افتراضية معزولة. يتطلب الوصول إلى الموارد الخارجية أذونات صريحة:

| الإذن        | ما يتيحه                                                     |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | وكيل `process.env` للقراءة فقط                               |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

من دون إذن، لا تكون العناصر العامة المقابلة متاحة ببساطة داخل البيئة المعزولة.

## مخطط الإعدادات

عرّف الإعدادات القابلة للتهيئة في `configSchema`:

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

أنواع الحقول: `string`، `number`، `boolean`، `select`

خيارات الحقول: `default`، `min`، `max`، `enum`، `description`

تُحفَظ قيم الإعدادات في قاعدة البيانات ويمكن الوصول إليها عبر صفحة الإعدادات في لوحة المعلومات.

## الأحداث المضمّنة

| الحدث             | وقت حدوثه                                 | الحمولة                       |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `onRequest`       | قبل معالج المحادثة                        | سياق الطلب                    |
| `onResponse`      | بعد معالج المحادثة                        | بيانات الاستجابة              |
| `onError`         | عند حدوث خطأ في المعالج                   | كائن الخطأ                    |
| `onModelSelect`   | عند تحديد النموذج للتوجيه                 | معلومات النموذج               |
| `onComboResolve`  | عند تحديد توجيه المجموعة                  | أهداف المجموعة                |
| `onRateLimit`     | عند بلوغ حد المعدل                        | معلومات الحد                  |
| `onQuotaExhaust`  | عند نفاد الحصة                            | معلومات الحصة                 |
| `onProviderError` | عند إرجاع المزوّد خطأً                    | تفاصيل الخطأ                  |
| `onStreamStart`   | عند بدء تدفق SSE                          | معلومات التدفق                |
| `onStreamEnd`     | عند انتهاء تدفق SSE                       | إحصاءات التدفق                |
| `onInstall`       | عند تثبيت الإضافة                         | `{ name, version, manifest }` |
| `onActivate`      | عند تفعيل الإضافة                         | `{ name, version, manifest }` |
| `onDeactivate`    | عند إلغاء تفعيل الإضافة                   | `{ name, version, manifest }` |
| `onUninstall`     | عند إلغاء تثبيت الإضافة (قبل حذف الملفات) | `{ name, version, manifest }` |

## أمثلة

### مسجّل الطلبات

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### محدد المعدل

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // دقيقة واحدة
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

### محوّل الاستجابة

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
