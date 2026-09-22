# OmniRoute Plugin SDK (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## त्वरित शुरुआत

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

## API संदर्भ

### `definePlugin(def: PluginDefinition): Plugin`

एक फ़ैक्टरी फ़ंक्शन, जो डिफ़ॉल्ट मानों के साथ Plugin ऑब्जेक्ट बनाता है।

**पैरामीटर:**

- `name` (string, आवश्यक) — kebab-case में Plugin का नाम
- `priority` (number, वैकल्पिक, डिफ़ॉल्ट: 100) — कम मान वाला पहले चलता है
- `enabled` (boolean, वैकल्पिक, डिफ़ॉल्ट: true) — क्या सक्षम अवस्था में शुरू करना है?
- `onRequest` (function, वैकल्पिक) — chat handler से पहले चलता है
- `onResponse` (function, वैकल्पिक) — chat handler के बाद चलता है
- `onError` (function, वैकल्पिक) — handler में त्रुटि होने पर चलता है

### `blockRequest(response?): BlockingHookResult`

अनुरोध को अवरुद्ध करें और वैकल्पिक रूप से एक कस्टम प्रतिक्रिया लौटाएँ।

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

अनुरोध की बॉडी को provider तक पहुँचने से पहले संशोधित करें।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

अनुरोध के संदर्भ में metadata संलग्न करें।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin संदर्भ (`PluginContext`)

| फ़ील्ड      | प्रकार                    | विवरण                         |
| ----------- | ------------------------- | ----------------------------- |
| `requestId` | `string`                  | अनुरोध का अद्वितीय पहचानकर्ता |
| `model`     | `string`                  | अनुरोधित model का नाम         |
| `provider`  | `string`                  | लक्षित provider ID            |
| `body`      | `Record<string, unknown>` | अनुरोध की बॉडी                |
| `headers`   | `Record<string, string>`  | अनुरोध के headers             |
| `metadata`  | `Record<string, unknown>` | परिवर्तनीय metadata           |
| `timestamp` | `number`                  | अनुरोध का timestamp           |

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

### Hook प्राथमिकता

Hooks को प्राथमिकता के साथ कॉन्फ़िगर किया जा सकता है (कम मान = पहले चलता है):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

या साधारण boolean मानों के रूप में (डिफ़ॉल्ट प्राथमिकता 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## अनुमति प्रणाली

प्लगइन सैंडबॉक्स किए गए VM संदर्भ में चलते हैं। बाहरी संसाधनों तक पहुँच के लिए स्पष्ट अनुमतियाँ आवश्यक हैं:

| अनुमति       | प्रदान की गई सुविधाएँ                                        |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | केवल-पढ़ने योग्य `process.env` प्रॉक्सी                      |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

अनुमति के बिना, संबंधित ग्लोबल्स सैंडबॉक्स में उपलब्ध नहीं होते।

## कॉन्फ़िग स्कीमा

कॉन्फ़िगर करने योग्य सेटिंग्स को `configSchema` में परिभाषित करें:

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

फ़ील्ड प्रकार: `string`, `number`, `boolean`, `select`

फ़ील्ड विकल्प: `default`, `min`, `max`, `enum`, `description`

कॉन्फ़िग मान डेटाबेस में सहेजे जाते हैं और डैशबोर्ड कॉन्फ़िग पृष्ठ के माध्यम से उपलब्ध होते हैं।

## अंतर्निहित इवेंट

| इवेंट             | कब                                                   | पेलोड                         |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | चैट हैंडलर से पहले                                   | अनुरोध संदर्भ                 |
| `onResponse`      | चैट हैंडलर के बाद                                    | प्रतिक्रिया डेटा              |
| `onError`         | हैंडलर त्रुटि होने पर                                | त्रुटि ऑब्जेक्ट               |
| `onModelSelect`   | रूटिंग के लिए मॉडल चुने जाने पर                      | मॉडल जानकारी                  |
| `onComboResolve`  | कॉम्बो रूटिंग हल होने पर                             | कॉम्बो लक्ष्य                 |
| `onRateLimit`     | दर सीमा पूरी होने पर                                 | सीमा जानकारी                  |
| `onQuotaExhaust`  | कोटा समाप्त होने पर                                  | कोटा जानकारी                  |
| `onProviderError` | प्रदाता द्वारा त्रुटि लौटाए जाने पर                  | त्रुटि विवरण                  |
| `onStreamStart`   | SSE स्ट्रीम शुरू होने पर                             | स्ट्रीम जानकारी               |
| `onStreamEnd`     | SSE स्ट्रीम समाप्त होने पर                           | स्ट्रीम आँकड़े                |
| `onInstall`       | प्लगइन इंस्टॉल होने पर                               | `{ name, version, manifest }` |
| `onActivate`      | प्लगइन सक्रिय होने पर                                | `{ name, version, manifest }` |
| `onDeactivate`    | प्लगइन निष्क्रिय होने पर                             | `{ name, version, manifest }` |
| `onUninstall`     | प्लगइन अनइंस्टॉल होने पर (फ़ाइलें हटाए जाने से पहले) | `{ name, version, manifest }` |

## उदाहरण

### अनुरोध लॉगर

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### दर सीमक

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 मिनट
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

### प्रतिक्रिया ट्रांसफ़ॉर्मर

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
