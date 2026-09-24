# OmniRoute Plugin SDK (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## द्रुत सुरुवात

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

## API सन्दर्भ

### `definePlugin(def: PluginDefinition): Plugin`

पूर्वनिर्धारित मानहरूसहित Plugin वस्तु सिर्जना गर्ने फ्याक्ट्री फङ्सन।

**प्यारामिटरहरू:**

- `name` (string, आवश्यक) — kebab-case मा Plugin को नाम
- `priority` (number, वैकल्पिक, पूर्वनिर्धारित: 100) — कम मान भएको पहिले चल्छ
- `enabled` (boolean, वैकल्पिक, पूर्वनिर्धारित: true) — सक्षम अवस्थामा सुरु गर्ने?
- `onRequest` (function, वैकल्पिक) — chat handler अघि चल्छ
- `onResponse` (function, वैकल्पिक) — chat handler पछि चल्छ
- `onError` (function, वैकल्पिक) — handler मा त्रुटि हुँदा चल्छ

### `blockRequest(response?): BlockingHookResult`

अनुरोध रोक्नुहोस् र वैकल्पिक रूपमा अनुकूलित प्रतिक्रिया फर्काउनुहोस्।

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

प्रदायकसम्म पुग्नुअघि अनुरोधको body परिमार्जन गर्नुहोस्।

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

अनुरोधको context मा metadata संलग्न गर्नुहोस्।

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| फिल्ड       | प्रकार                    | विवरण                         |
| ----------- | ------------------------- | ----------------------------- |
| `requestId` | `string`                  | अनुरोधको अद्वितीय पहिचानकर्ता |
| `model`     | `string`                  | अनुरोध गरिएको model को नाम    |
| `provider`  | `string`                  | लक्षित provider ID            |
| `body`      | `Record<string, unknown>` | अनुरोधको body                 |
| `headers`   | `Record<string, string>`  | अनुरोधका headers              |
| `metadata`  | `Record<string, unknown>` | परिवर्तन गर्न मिल्ने metadata |
| `timestamp` | `number`                  | अनुरोधको timestamp            |

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

### Hook को प्राथमिकता

Hooks लाई प्राथमिकतासहित कन्फिगर गर्न सकिन्छ (कम = पहिले चल्छ):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

वा साधारण boolean का रूपमा (पूर्वनिर्धारित प्राथमिकता 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## अनुमति प्रणाली

प्लगइनहरू स्यान्डबक्स गरिएको VM सन्दर्भमा चल्छन्। बाह्य स्रोतहरूमा पहुँचका लागि स्पष्ट अनुमतिहरू आवश्यक हुन्छन्:

| अनुमति       | प्रदान गरिने पहुँच                                           |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | पढ्न-मात्र मिल्ने `process.env` प्रोक्सी                     |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

अनुमति नभएमा, सम्बन्धित ग्लोबलहरू स्यान्डबक्समा उपलब्ध हुँदैनन्।

## कन्फिग स्किमा

कन्फिगर गर्न मिल्ने सेटिङहरू `configSchema` मा परिभाषित गर्नुहोस्:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "बाह्य API कुञ्जी" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

फिल्डका प्रकारहरू: `string`, `number`, `boolean`, `select`

फिल्डका विकल्पहरू: `default`, `min`, `max`, `enum`, `description`

कन्फिग मानहरू डेटाबेसमा सुरक्षित रहन्छन् र ड्यासबोर्डको कन्फिग पृष्ठमार्फत पहुँचयोग्य हुन्छन्।

## अन्तर्निर्मित इभेन्टहरू

| इभेन्ट            | कहिले                               | पेलोड                         |
| ----------------- | ----------------------------------- | ----------------------------- |
| `onRequest`       | च्याट ह्यान्डलरअघि                  | अनुरोध सन्दर्भ                |
| `onResponse`      | च्याट ह्यान्डलरपछि                  | प्रतिक्रिया डेटा              |
| `onError`         | ह्यान्डलरमा त्रुटि हुँदा            | त्रुटि वस्तु                  |
| `onModelSelect`   | राउटिङका लागि मोडेल चयन हुँदा       | मोडेल जानकारी                 |
| `onComboResolve`  | कम्बो राउटिङ समाधान हुँदा           | कम्बो लक्ष्यहरू               |
| `onRateLimit`     | दर सीमा पुग्दा                      | सीमा जानकारी                  |
| `onQuotaExhaust`  | कोटा समाप्त हुँदा                   | कोटा जानकारी                  |
| `onProviderError` | प्रदायकले त्रुटि फर्काउँदा          | त्रुटि विवरण                  |
| `onStreamStart`   | SSE स्ट्रिम सुरु हुँदा              | स्ट्रिम जानकारी               |
| `onStreamEnd`     | SSE स्ट्रिम समाप्त हुँदा            | स्ट्रिम तथ्याङ्क              |
| `onInstall`       | प्लगइन स्थापना हुँदा                | `{ name, version, manifest }` |
| `onActivate`      | प्लगइन सक्रिय हुँदा                 | `{ name, version, manifest }` |
| `onDeactivate`    | प्लगइन निष्क्रिय हुँदा              | `{ name, version, manifest }` |
| `onUninstall`     | प्लगइन हटाइँदा (फाइलहरू मेटाउनुअघि) | `{ name, version, manifest }` |

## उदाहरणहरू

### अनुरोध लगर

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
    const window = 60000; // १ मिनेट
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "दर सीमा नाघियो", status: 429 });
    }
  },
});
```

### प्रतिक्रिया रूपान्तरणकर्ता

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
