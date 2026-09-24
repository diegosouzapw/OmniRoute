# OmniRoute Plugin SDK (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Bidu Rapidu

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

## Referenza tal-API

### `definePlugin(def: PluginDefinition): Plugin`

Funzjoni factory li toħloq oġġett Plugin bil-valuri predefiniti.

**Parametri:**

- `name` (string, meħtieġ) — Isem tal-plugin f'kebab-case
- `priority` (number, fakultattiv, valur predefinit: 100) — Valur aktar baxx jitħaddem l-ewwel
- `enabled` (boolean, fakultattiv, valur predefinit: true) — Għandu jibda attivat?
- `onRequest` (function, fakultattiva) — Titħaddem qabel il-maniġġatur taċ-chat
- `onResponse` (function, fakultattiva) — Titħaddem wara l-maniġġatur taċ-chat
- `onError` (function, fakultattiva) — Titħaddem meta jseħħ żball fil-maniġġatur

### `blockRequest(response?): BlockingHookResult`

Imblokka t-talba u, b'mod fakultattiv, irritorna tweġiba personalizzata.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Immodifika l-korp tat-talba qabel ma jasal għand il-fornitur.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Ehmeż metadata mal-kuntest tat-talba.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kuntest tal-Plugin (`PluginContext`)

| Kamp        | Tip                       | Deskrizzjoni                    |
| ----------- | ------------------------- | ------------------------------- |
| `requestId` | `string`                  | Identifikatur uniku tat-talba   |
| `model`     | `string`                  | Isem tal-mudell mitlub          |
| `provider`  | `string`                  | ID tal-fornitur fil-mira        |
| `body`      | `Record<string, unknown>` | Korp tat-talba                  |
| `headers`   | `Record<string, string>`  | Headers tat-talba               |
| `metadata`  | `Record<string, unknown>` | Metadata li tista' tiġi mibdula |
| `timestamp` | `number`                  | Timestamp tat-talba             |

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

### Prijorità tal-Hook

Il-hooks jistgħu jiġu kkonfigurati bi prijorità (aktar baxxa = titħaddem l-ewwel):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Jew bħala valuri boolean sempliċi (prijorità predefinita 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistema tal-Permessi

Il-plugins jaħdmu f’kuntest ta’ VM iżolat. L-aċċess għal riżorsi esterni jeħtieġ permessi espliċiti:

| Permess      | Jagħti aċċess għal                                           |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Proxy ta’ `process.env` li jinqara biss                      |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Mingħajr permess, il-globals korrispondenti sempliċement ma jkunux disponibbli fis-sandbox.

## Skema tal-Konfigurazzjoni

Iddefinixxi s-settings konfigurabbli f’`configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ċavetta tal-API esterna" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Tipi ta’ fields: `string`, `number`, `boolean`, `select`

Għażliet tal-fields: `default`, `min`, `max`, `enum`, `description`

Il-valuri tal-konfigurazzjoni jinħażnu fid-database u jkunu aċċessibbli permezz tal-paġna tal-konfigurazzjoni tad-dashboard.

## Avvenimenti Inkorporati

| Avveniment        | Meta                                                       | Payload                       |
| ----------------- | ---------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Qabel il-handler taċ-chat                                  | Kuntest tat-talba             |
| `onResponse`      | Wara l-handler taċ-chat                                    | Data tar-rispons              |
| `onError`         | Meta jseħħ żball fil-handler                               | Oġġett tal-iżball             |
| `onModelSelect`   | Meta jintgħażel mudell għar-routing                        | Informazzjoni dwar il-mudell  |
| `onComboResolve`  | Meta jiġi riżolt ir-routing tal-combo                      | Destinazzjonijiet tal-combo   |
| `onRateLimit`     | Meta jintlaħaq il-limitu tar-rata                          | Informazzjoni dwar il-limitu  |
| `onQuotaExhaust`  | Meta tiġi eżawrita l-kwota                                 | Informazzjoni dwar il-kwota   |
| `onProviderError` | Meta l-provider jirritorna żball                           | Dettalji tal-iżball           |
| `onStreamStart`   | Meta jibda l-stream SSE                                    | Informazzjoni dwar l-stream   |
| `onStreamEnd`     | Meta jintemm l-stream SSE                                  | Statistika tal-stream         |
| `onInstall`       | Meta jiġi installat il-plugin                              | `{ name, version, manifest }` |
| `onActivate`      | Meta jiġi attivat il-plugin                                | `{ name, version, manifest }` |
| `onDeactivate`    | Meta jiġi diżattivat il-plugin                             | `{ name, version, manifest }` |
| `onUninstall`     | Meta jiġi diżinstallat il-plugin (qabel jitħassru l-files) | `{ name, version, manifest }` |

## Eżempji

### Reġistratur tat-Talbiet

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitatur tar-Rata

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // Minuta
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Inqabeż il-limitu tar-rata", status: 429 });
    }
  },
});
```

### Trasformatur tar-Rispons

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
