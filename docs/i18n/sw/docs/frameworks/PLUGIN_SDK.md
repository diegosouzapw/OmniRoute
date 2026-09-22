# OmniRoute Plugin SDK (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Kuanza Haraka

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

## Marejeleo ya API

### `definePlugin(def: PluginDefinition): Plugin`

Kitendakazi cha kiwanda kinachounda kipengee cha Plugin kwa kutumia thamani chaguomsingi.

**Vigezo:**

- `name` (string, lazima) — Jina la programu-jalizi katika muundo wa kebab-case
- `priority` (number, si lazima, chaguomsingi: 100) — Thamani ya chini hutekelezwa kwanza
- `enabled` (boolean, si lazima, chaguomsingi: true) — Ianze ikiwa imewezeshwa?
- `onRequest` (function, si lazima) — Hutekelezwa kabla ya kishughulikia gumzo
- `onResponse` (function, si lazima) — Hutekelezwa baada ya kishughulikia gumzo
- `onError` (function, si lazima) — Hutekelezwa kishughulikia kinapokumbana na hitilafu

### `blockRequest(response?): BlockingHookResult`

Zuia ombi na, kwa hiari, urejeshe jibu maalum.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Rekebisha kiini cha ombi kabla hakijafika kwa mtoa huduma.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Ambatisha metadata kwenye muktadha wa ombi.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Muktadha wa Programu-jalizi (`PluginContext`)

| Sehemu      | Aina                      | Maelezo                             |
| ----------- | ------------------------- | ----------------------------------- |
| `requestId` | `string`                  | Kitambulisho cha kipekee cha ombi   |
| `model`     | `string`                  | Jina la modeli iliyoombwa           |
| `provider`  | `string`                  | Kitambulisho cha mtoa huduma lengwa |
| `body`      | `Record<string, unknown>` | Kiini cha ombi                      |
| `headers`   | `Record<string, string>`  | Vichwa vya ombi                     |
| `metadata`  | `Record<string, unknown>` | Metadata inayoweza kubadilishwa     |
| `timestamp` | `number`                  | Muhuri wa muda wa ombi              |

## Manifesti (`plugin.json`)

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

### Kipaumbele cha Hook

Hook zinaweza kusanidiwa kwa kipaumbele (thamani ya chini = hutekelezwa kwanza):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Au kama thamani rahisi za boolean (kipaumbele chaguomsingi ni 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Mfumo wa Ruhusa

Programu-jalizi huendeshwa katika muktadha wa VM uliotengwa. Ufikiaji wa rasilimali za nje unahitaji ruhusa dhahiri:

| Ruhusa       | Hutoa ufikiaji                                               |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Proksi ya `process.env` ya kusoma pekee                      |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Bila ruhusa, vipengele vya kimataifa vinavyohusika havipatikani kabisa katika mazingira yaliyotengwa.

## Muundo wa Usanidi

Bainisha mipangilio inayoweza kusanidiwa katika `configSchema`:

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

Aina za sehemu: `string`, `number`, `boolean`, `select`

Chaguo za sehemu: `default`, `min`, `max`, `enum`, `description`

Thamani za usanidi huhifadhiwa katika kanzidata na zinaweza kufikiwa kupitia ukurasa wa usanidi wa dashibodi.

## Matukio Yaliyojengewa Ndani

| Tukio             | Wakati                                                 | Data inayotumwa                  |
| ----------------- | ------------------------------------------------------ | -------------------------------- |
| `onRequest`       | Kabla ya kishughulikiaji cha gumzo                     | Muktadha wa ombi                 |
| `onResponse`      | Baada ya kishughulikiaji cha gumzo                     | Data ya jibu                     |
| `onError`         | Hitilafu ya kishughulikiaji inapotokea                 | Kitu cha hitilafu                |
| `onModelSelect`   | Modeli inapochaguliwa kwa uelekezaji                   | Taarifa za modeli                |
| `onComboResolve`  | Uelekezaji wa mchanganyiko unapotatuliwa               | Malengo ya mchanganyiko          |
| `onRateLimit`     | Kikomo cha kiwango kinapofikiwa                        | Taarifa za kikomo                |
| `onQuotaExhaust`  | Kiwango kilichotengwa kinapoisha                       | Taarifa za kiwango kilichotengwa |
| `onProviderError` | Mtoa huduma anaporudisha hitilafu                      | Maelezo ya hitilafu              |
| `onStreamStart`   | Mtiririko wa SSE unapoanzishwa                         | Taarifa za mtiririko             |
| `onStreamEnd`     | Mtiririko wa SSE unapoisha                             | Takwimu za mtiririko             |
| `onInstall`       | Programu-jalizi inaposakinishwa                        | `{ name, version, manifest }`    |
| `onActivate`      | Programu-jalizi inapoamilishwa                         | `{ name, version, manifest }`    |
| `onDeactivate`    | Programu-jalizi inapoondolewa uamilifu                 | `{ name, version, manifest }`    |
| `onUninstall`     | Programu-jalizi inapoondolewa (kabla ya faili kufutwa) | `{ name, version, manifest }`    |

## Mifano

### Kirekodi Maombi

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Kidhibiti cha Kiwango

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // dakika 1
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

### Kigeuza Majibu

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
