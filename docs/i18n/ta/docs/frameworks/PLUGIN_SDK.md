# OmniRoute Plugin SDK (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## விரைவான தொடக்கம்

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

## API குறிப்பு

### `definePlugin(def: PluginDefinition): Plugin`

இயல்புநிலை மதிப்புகளுடன் ஒரு Plugin பொருளை உருவாக்கும் factory function.

**அளவுருக்கள்:**

- `name` (string, கட்டாயம்) — kebab-case வடிவிலான Plugin பெயர்
- `priority` (number, விருப்பத்தேர்வு, இயல்புநிலை: 100) — குறைந்த மதிப்புடையது முதலில் இயங்கும்
- `enabled` (boolean, விருப்பத்தேர்வு, இயல்புநிலை: true) — இயக்கப்பட்ட நிலையில் தொடங்க வேண்டுமா?
- `onRequest` (function, விருப்பத்தேர்வு) — chat handler-க்கு முன் இயங்கும்
- `onResponse` (function, விருப்பத்தேர்வு) — chat handler-க்குப் பிறகு இயங்கும்
- `onError` (function, விருப்பத்தேர்வு) — handler பிழை ஏற்படும்போது இயங்கும்

### `blockRequest(response?): BlockingHookResult`

கோரிக்கையைத் தடுத்து, விருப்பப்பட்டால் தனிப்பயன் பதிலை வழங்கும்.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

கோரிக்கை provider-ஐ அடைவதற்கு முன் அதன் body-ஐ மாற்றும்.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

கோரிக்கை context-உடன் metadata-வை இணைக்கும்.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| புலம்       | வகை                       | விளக்கம்                            |
| ----------- | ------------------------- | ----------------------------------- |
| `requestId` | `string`                  | தனித்துவமான கோரிக்கை அடையாளங்காட்டி |
| `model`     | `string`                  | கோரப்பட்ட model பெயர்               |
| `provider`  | `string`                  | இலக்கு provider ID                  |
| `body`      | `Record<string, unknown>` | கோரிக்கையின் body                   |
| `headers`   | `Record<string, string>`  | கோரிக்கையின் headers                |
| `metadata`  | `Record<string, unknown>` | மாற்றக்கூடிய metadata               |
| `timestamp` | `number`                  | கோரிக்கையின் timestamp              |

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

### Hook முன்னுரிமை

Hooks-ஐ முன்னுரிமையுடன் உள்ளமைக்கலாம் (குறைந்த மதிப்பு = முதலில் இயங்கும்):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

அல்லது எளிய boolean மதிப்புகளாகக் குறிப்பிடலாம் (இயல்புநிலை முன்னுரிமை 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## அனுமதி அமைப்பு

செருகுநிரல்கள் தனிமைப்படுத்தப்பட்ட VM சூழலில் இயங்குகின்றன. வெளிப்புற வளங்களை அணுகுவதற்கு வெளிப்படையான அனுமதிகள் தேவை:

| அனுமதி       | வழங்கப்படும் அணுகல்கள்                                       |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | படிக்க மட்டும் இயலும் `process.env` ப்ராக்ஸி                 |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

அனுமதி இல்லையெனில், அதனுடன் தொடர்புடைய குளோபல்ஸ் sandbox-இல் கிடைக்காது.

## கட்டமைப்பு ஸ்கீமா

கட்டமைக்கக்கூடிய அமைப்புகளை `configSchema`-இல் வரையறுக்கவும்:

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

புல வகைகள்: `string`, `number`, `boolean`, `select`

புல விருப்பங்கள்: `default`, `min`, `max`, `enum`, `description`

கட்டமைப்பு மதிப்புகள் தரவுத்தளத்தில் நிலையாகச் சேமிக்கப்பட்டு, dashboard கட்டமைப்புப் பக்கத்தின் வழியாக அணுகக்கூடியவையாக இருக்கும்.

## உள்ளமைக்கப்பட்ட நிகழ்வுகள்

| நிகழ்வு           | எப்போது                                                                | பேலோடு                        |
| ----------------- | ---------------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | அரட்டை ஹேண்ட்லருக்கு முன்                                              | கோரிக்கை சூழல்                |
| `onResponse`      | அரட்டை ஹேண்ட்லருக்குப் பின்                                            | பதில் தரவு                    |
| `onError`         | ஹேண்ட்லர் பிழையின்போது                                                 | பிழைப் பொருள்                 |
| `onModelSelect`   | வழிப்படுத்தலுக்காக மாடல் தேர்ந்தெடுக்கப்படும்போது                      | மாடல் தகவல்                   |
| `onComboResolve`  | காம்போ வழிப்படுத்தல் தீர்மானிக்கப்படும்போது                            | காம்போ இலக்குகள்              |
| `onRateLimit`     | விகித வரம்பு எட்டப்படும்போது                                           | வரம்புத் தகவல்                |
| `onQuotaExhaust`  | ஒதுக்கீடு தீர்ந்துபோகும்போது                                           | ஒதுக்கீட்டுத் தகவல்           |
| `onProviderError` | வழங்குநர் பிழையைத் திருப்பியபோது                                       | பிழை விவரங்கள்                |
| `onStreamStart`   | SSE ஸ்ட்ரீம் தொடங்கும்போது                                             | ஸ்ட்ரீம் தகவல்                |
| `onStreamEnd`     | SSE ஸ்ட்ரீம் முடிவடையும்போது                                           | ஸ்ட்ரீம் புள்ளிவிவரங்கள்      |
| `onInstall`       | செருகுநிரல் நிறுவப்படும்போது                                           | `{ name, version, manifest }` |
| `onActivate`      | செருகுநிரல் செயல்படுத்தப்படும்போது                                     | `{ name, version, manifest }` |
| `onDeactivate`    | செருகுநிரல் செயலிழக்கச் செய்யப்படும்போது                               | `{ name, version, manifest }` |
| `onUninstall`     | செருகுநிரல் நிறுவல் நீக்கப்படும்போது (கோப்புகள் நீக்கப்படுவதற்கு முன்) | `{ name, version, manifest }` |

## எடுத்துக்காட்டுகள்

### கோரிக்கை பதிவி

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### விகிதக் கட்டுப்படுத்தி

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 நிமிடம்
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

### பதில் மாற்றி

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
