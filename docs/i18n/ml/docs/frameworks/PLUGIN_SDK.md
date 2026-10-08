# OmniRoute Plugin SDK (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## ദ്രുതാരംഭം

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

## API റഫറൻസ്

### `definePlugin(def: PluginDefinition): Plugin`

സ്ഥിര മൂല്യങ്ങളോടെ ഒരു Plugin ഒബ്ജക്റ്റ് സൃഷ്ടിക്കുന്ന ഫാക്ടറി ഫങ്ഷൻ.

**പാരാമീറ്ററുകൾ:**

- `name` (string, നിർബന്ധം) — kebab-case-ലുള്ള Plugin നാമം
- `priority` (number, ഐച്ഛികം, സ്ഥിര മൂല്യം: 100) — കുറഞ്ഞ മൂല്യമുള്ളത് ആദ്യം പ്രവർത്തിക്കുന്നു
- `enabled` (boolean, ഐച്ഛികം, സ്ഥിര മൂല്യം: true) — പ്രവർത്തനക്ഷമമാക്കി ആരംഭിക്കണോ?
- `onRequest` (function, ഐച്ഛികം) — chat handler-ന് മുമ്പ് പ്രവർത്തിക്കുന്നു
- `onResponse` (function, ഐച്ഛികം) — chat handler-ന് ശേഷം പ്രവർത്തിക്കുന്നു
- `onError` (function, ഐച്ഛികം) — handler പിശക് സംഭവിക്കുമ്പോൾ പ്രവർത്തിക്കുന്നു

### `blockRequest(response?): BlockingHookResult`

അഭ്യർത്ഥന തടയുകയും ഐച്ഛികമായി ഇഷ്ടാനുസൃത പ്രതികരണം നൽകുകയും ചെയ്യുന്നു.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

ദാതാവിലേക്ക് എത്തുന്നതിന് മുമ്പ് അഭ്യർത്ഥനയുടെ body പരിഷ്കരിക്കുന്നു.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

അഭ്യർത്ഥനാ context-ലേക്ക് metadata ചേർക്കുന്നു.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin Context (`PluginContext`)

| ഫീൽഡ്       | തരം                       | വിവരണം                       |
| ----------- | ------------------------- | ---------------------------- |
| `requestId` | `string`                  | തനതായ അഭ്യർത്ഥനാ ഐഡന്റിഫയർ   |
| `model`     | `string`                  | അഭ്യർത്ഥിച്ച model-ന്റെ പേര് |
| `provider`  | `string`                  | ലക്ഷ്യ provider ID           |
| `body`      | `Record<string, unknown>` | അഭ്യർത്ഥനയുടെ body           |
| `headers`   | `Record<string, string>`  | അഭ്യർത്ഥനയുടെ headers        |
| `metadata`  | `Record<string, unknown>` | മാറ്റാവുന്ന metadata         |
| `timestamp` | `number`                  | അഭ്യർത്ഥനയുടെ timestamp      |

## മാനിഫെസ്റ്റ് (`plugin.json`)

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

### Hook മുൻഗണന

Hooks-ന് മുൻഗണന ക്രമീകരിക്കാം (കുറഞ്ഞ മൂല്യം = ആദ്യം പ്രവർത്തിക്കുന്നു):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

അല്ലെങ്കിൽ ലളിതമായ boolean മൂല്യങ്ങളായി നൽകാം (സ്ഥിര മുൻഗണന 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## അനുമതി സംവിധാനം

പ്ലഗിനുകൾ സാൻഡ്ബോക്സ് ചെയ്ത VM സന്ദർഭത്തിലാണ് പ്രവർത്തിക്കുന്നത്. ബാഹ്യ വിഭവങ്ങളിലേക്കുള്ള ആക്സസിന് വ്യക്തമായ അനുമതികൾ ആവശ്യമാണ്:

| അനുമതി       | അനുവദിക്കുന്നത്                                              |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | റീഡ്-ഒൺലി `process.env` പ്രോക്സി                             |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ഒരു അനുമതിയില്ലെങ്കിൽ, അതുമായി ബന്ധപ്പെട്ട ഗ്ലോബലുകൾ സാൻഡ്ബോക്സിൽ ലഭ്യമാകില്ല.

## കോൺഫിഗ് സ്കീമ

കോൺഫിഗർ ചെയ്യാവുന്ന ക്രമീകരണങ്ങൾ `configSchema`-യിൽ നിർവചിക്കുക:

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

ഫീൽഡ് തരങ്ങൾ: `string`, `number`, `boolean`, `select`

ഫീൽഡ് ഓപ്ഷനുകൾ: `default`, `min`, `max`, `enum`, `description`

കോൺഫിഗ് മൂല്യങ്ങൾ ഡാറ്റാബേസിൽ നിലനിർത്തുകയും ഡാഷ്ബോർഡ് കോൺഫിഗ് പേജ് വഴി ആക്സസ് ചെയ്യാവുന്നതുമാണ്.

## ബിൽറ്റ്-ഇൻ ഇവന്റുകൾ

| ഇവന്റ്            | എപ്പോൾ                                                            | പേലോഡ്                        |
| ----------------- | ----------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | ചാറ്റ് ഹാൻഡ്ലറിന് മുമ്പ്                                          | റിക്വസ്റ്റ് സന്ദർഭം           |
| `onResponse`      | ചാറ്റ് ഹാൻഡ്ലറിന് ശേഷം                                            | റെസ്പോൺസ് ഡാറ്റ               |
| `onError`         | ഹാൻഡ്ലർ പിശക് സംഭവിക്കുമ്പോൾ                                      | പിശക് ഒബ്ജക്റ്റ്              |
| `onModelSelect`   | റൂട്ടിങ്ങിനായി മോഡൽ തിരഞ്ഞെടുക്കുമ്പോൾ                            | മോഡൽ വിവരങ്ങൾ                 |
| `onComboResolve`  | കോംബോ റൂട്ടിങ് പരിഹരിക്കപ്പെടുമ്പോൾ                               | കോംബോ ലക്ഷ്യങ്ങൾ              |
| `onRateLimit`     | നിരക്ക് പരിധിയിലെത്തുമ്പോൾ                                        | പരിധി വിവരങ്ങൾ                |
| `onQuotaExhaust`  | ക്വാട്ട തീരുമ്പോൾ                                                 | ക്വാട്ട വിവരങ്ങൾ              |
| `onProviderError` | പ്രൊവൈഡർ പിശക് തിരികെ നൽകുമ്പോൾ                                   | പിശക് വിശദാംശങ്ങൾ             |
| `onStreamStart`   | SSE സ്ട്രീം ആരംഭിക്കുമ്പോൾ                                        | സ്ട്രീം വിവരങ്ങൾ              |
| `onStreamEnd`     | SSE സ്ട്രീം അവസാനിക്കുമ്പോൾ                                       | സ്ട്രീം സ്ഥിതിവിവരക്കണക്കുകൾ  |
| `onInstall`       | പ്ലഗിൻ ഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ                                      | `{ name, version, manifest }` |
| `onActivate`      | പ്ലഗിൻ സജീവമാക്കുമ്പോൾ                                            | `{ name, version, manifest }` |
| `onDeactivate`    | പ്ലഗിൻ നിർജ്ജീവമാക്കുമ്പോൾ                                        | `{ name, version, manifest }` |
| `onUninstall`     | പ്ലഗിൻ അൺഇൻസ്റ്റാൾ ചെയ്യുമ്പോൾ (ഫയലുകൾ ഇല്ലാതാക്കുന്നതിന് മുമ്പ്) | `{ name, version, manifest }` |

## ഉദാഹരണങ്ങൾ

### റിക്വസ്റ്റ് ലോഗർ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### നിരക്ക് നിയന്ത്രണം

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 മിനിറ്റ്
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

### റെസ്പോൺസ് ട്രാൻസ്ഫോർമർ

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
