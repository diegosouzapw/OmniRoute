# OmniRoute Plugin SDK (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ઝડપી શરૂઆત

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

## API સંદર્ભ

### `definePlugin(def: PluginDefinition): Plugin`

ડિફૉલ્ટ મૂલ્યો સાથે Plugin ઑબ્જેક્ટ બનાવતું ફૅક્ટરી ફંક્શન.

**પેરામીટર્સ:**

- `name` (string, આવશ્યક) — kebab-caseમાં Pluginનું નામ
- `priority` (number, વૈકલ્પિક, ડિફૉલ્ટ: 100) — ઓછું મૂલ્ય ધરાવતું પહેલાં ચાલે છે
- `enabled` (boolean, વૈકલ્પિક, ડિફૉલ્ટ: true) — સક્ષમ સ્થિતિમાં શરૂ કરવું?
- `onRequest` (function, વૈકલ્પિક) — chat handler પહેલાં ચાલે છે
- `onResponse` (function, વૈકલ્પિક) — chat handler પછી ચાલે છે
- `onError` (function, વૈકલ્પિક) — handlerમાં ભૂલ થાય ત્યારે ચાલે છે

### `blockRequest(response?): BlockingHookResult`

વિનંતીને અવરોધો અને વૈકલ્પિક રીતે કસ્ટમ પ્રતિસાદ પરત કરો.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

વિનંતી provider સુધી પહોંચે તે પહેલાં તેની bodyમાં ફેરફાર કરો.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

વિનંતીના context સાથે metadata જોડો.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| ફીલ્ડ       | પ્રકાર                    | વર્ણન                          |
| ----------- | ------------------------- | ------------------------------ |
| `requestId` | `string`                  | વિનંતીનું અનન્ય ઓળખચિહ્ન       |
| `model`     | `string`                  | વિનંતી કરાયેલા modelનું નામ    |
| `provider`  | `string`                  | લક્ષ્ય provider ID             |
| `body`      | `Record<string, unknown>` | વિનંતીની body                  |
| `headers`   | `Record<string, string>`  | વિનંતીના headers               |
| `metadata`  | `Record<string, unknown>` | ફેરફાર કરી શકાય તેવું metadata |
| `timestamp` | `number`                  | વિનંતીનો timestamp             |

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

### Hookની પ્રાથમિકતા

Hooksને પ્રાથમિકતા સાથે ગોઠવી શકાય છે (ઓછું મૂલ્ય = પહેલાં ચાલે છે):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

અથવા સરળ boolean મૂલ્યો તરીકે (ડિફૉલ્ટ પ્રાથમિકતા 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## પરવાનગી સિસ્ટમ

પ્લગિન્સ સેન્ડબોક્સ કરેલા VM સંદર્ભમાં ચાલે છે. બાહ્ય સંસાધનોની ઍક્સેસ માટે સ્પષ્ટ પરવાનગીઓ જરૂરી છે:

| પરવાનગી      | જેની મંજૂરી આપે છે                                           |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | માત્ર-વાંચન માટેનો `process.env` પ્રોક્સી                    |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

પરવાનગી વિના, સંબંધિત ગ્લોબલ્સ સેન્ડબોક્સમાં ઉપલબ્ધ હોતા જ નથી.

## કૉન્ફિગ સ્કીમા

રૂપરેખાંકિત કરી શકાય તેવી સેટિંગ્સને `configSchema`માં વ્યાખ્યાયિત કરો:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "બાહ્ય API કી" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ફીલ્ડના પ્રકારો: `string`, `number`, `boolean`, `select`

ફીલ્ડ વિકલ્પો: `default`, `min`, `max`, `enum`, `description`

કૉન્ફિગ મૂલ્યો ડેટાબેઝમાં કાયમી રીતે સંગ્રહિત થાય છે અને ડૅશબોર્ડના કૉન્ફિગ પેજ દ્વારા ઍક્સેસ કરી શકાય છે.

## બિલ્ટ-ઇન ઇવેન્ટ્સ

| ઇવેન્ટ            | ક્યારે                                                  | પેલોડ                         |
| ----------------- | ------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ચેટ હેન્ડલર પહેલાં                                      | વિનંતીનો સંદર્ભ               |
| `onResponse`      | ચેટ હેન્ડલર પછી                                         | પ્રતિસાદ ડેટા                 |
| `onError`         | હેન્ડલરમાં ભૂલ થાય ત્યારે                               | ભૂલ ઑબ્જેક્ટ                  |
| `onModelSelect`   | રૂટિંગ માટે મોડલ પસંદ થાય ત્યારે                        | મોડલની માહિતી                 |
| `onComboResolve`  | કૉમ્બો રૂટિંગ ઉકેલાય ત્યારે                             | કૉમ્બોના લક્ષ્યો              |
| `onRateLimit`     | રેટ લિમિટ લાગુ થાય ત્યારે                               | લિમિટની માહિતી                |
| `onQuotaExhaust`  | ક્વોટા સમાપ્ત થાય ત્યારે                                | ક્વોટાની માહિતી               |
| `onProviderError` | પ્રદાતા ભૂલ પરત કરે ત્યારે                              | ભૂલની વિગતો                   |
| `onStreamStart`   | SSE સ્ટ્રીમ શરૂ થાય ત્યારે                              | સ્ટ્રીમની માહિતી              |
| `onStreamEnd`     | SSE સ્ટ્રીમ સમાપ્ત થાય ત્યારે                           | સ્ટ્રીમના આંકડા               |
| `onInstall`       | પ્લગિન ઇન્સ્ટોલ થાય ત્યારે                              | `{ name, version, manifest }` |
| `onActivate`      | પ્લગિન સક્રિય થાય ત્યારે                                | `{ name, version, manifest }` |
| `onDeactivate`    | પ્લગિન નિષ્ક્રિય થાય ત્યારે                             | `{ name, version, manifest }` |
| `onUninstall`     | પ્લગિન અનઇન્સ્ટોલ થાય ત્યારે (ફાઇલો કાઢી નાખતાં પહેલાં) | `{ name, version, manifest }` |

## ઉદાહરણો

### વિનંતી લૉગર

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### રેટ લિમિટર

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 મિનિટ
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

### પ્રતિસાદ ટ્રાન્સફોર્મર

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
