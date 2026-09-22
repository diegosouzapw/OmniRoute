# OmniRoute Plugin SDK (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## త్వరిత ప్రారంభం

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

## API సూచన

### `definePlugin(def: PluginDefinition): Plugin`

డిఫాల్ట్ విలువలతో Plugin ఆబ్జెక్ట్ను సృష్టించే ఫ్యాక్టరీ ఫంక్షన్.

**పారామీటర్లు:**

- `name` (string, తప్పనిసరి) — kebab-caseలో Plugin పేరు
- `priority` (number, ఐచ్ఛికం, డిఫాల్ట్: 100) — తక్కువ విలువ ఉన్నది ముందుగా అమలవుతుంది
- `enabled` (boolean, ఐచ్ఛికం, డిఫాల్ట్: true) — ప్రారంభంలో సక్రియంగా ఉండాలా?
- `onRequest` (function, ఐచ్ఛికం) — చాట్ హ్యాండ్లర్కు ముందు అమలవుతుంది
- `onResponse` (function, ఐచ్ఛికం) — చాట్ హ్యాండ్లర్ తర్వాత అమలవుతుంది
- `onError` (function, ఐచ్ఛికం) — హ్యాండ్లర్ లోపం సంభవించినప్పుడు అమలవుతుంది

### `blockRequest(response?): BlockingHookResult`

అభ్యర్థనను నిరోధించి, ఐచ్ఛికంగా అనుకూల ప్రతిస్పందనను అందించండి.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

అభ్యర్థన ప్రొవైడర్ను చేరడానికి ముందు దాని బాడీని మార్చండి.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

అభ్యర్థన సందర్భానికి మెటాడేటాను జోడించండి.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin సందర్భం (`PluginContext`)

| ఫీల్డ్      | రకం                       | వివరణ                         |
| ----------- | ------------------------- | ----------------------------- |
| `requestId` | `string`                  | ప్రత్యేక అభ్యర్థన ఐడెంటిఫైయర్ |
| `model`     | `string`                  | అభ్యర్థించిన మోడల్ పేరు       |
| `provider`  | `string`                  | లక్ష్య ప్రొవైడర్ ID           |
| `body`      | `Record<string, unknown>` | అభ్యర్థన బాడీ                 |
| `headers`   | `Record<string, string>`  | అభ్యర్థన హెడర్లు              |
| `metadata`  | `Record<string, unknown>` | మార్చగల మెటాడేటా              |
| `timestamp` | `number`                  | అభ్యర్థన టైమ్స్టాంప్          |

## మానిఫెస్ట్ (`plugin.json`)

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

### హుక్ ప్రాధాన్యత

హుక్లను ప్రాధాన్యతతో కాన్ఫిగర్ చేయవచ్చు (తక్కువ విలువ = ముందుగా అమలవుతుంది):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

లేదా సాధారణ boolean విలువలుగా (డిఫాల్ట్ ప్రాధాన్యత 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## అనుమతి వ్యవస్థ

ప్లగిన్లు శాండ్బాక్స్ చేయబడిన VM సందర్భంలో అమలవుతాయి. బాహ్య వనరులకు యాక్సెస్ చేయడానికి స్పష్టమైన అనుమతులు అవసరం:

| అనుమతి       | మంజూరు చేసే యాక్సెస్                                         |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | చదవడానికి మాత్రమే అనుమతించే `process.env` ప్రాక్సీ           |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

అనుమతి లేకపోతే, సంబంధిత గ్లోబల్లు శాండ్బాక్స్లో అందుబాటులో ఉండవు.

## కాన్ఫిగ్ స్కీమా

కాన్ఫిగర్ చేయగల సెట్టింగ్లను `configSchema`లో నిర్వచించండి:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "బాహ్య API కీ" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ఫీల్డ్ రకాలు: `string`, `number`, `boolean`, `select`

ఫీల్డ్ ఎంపికలు: `default`, `min`, `max`, `enum`, `description`

కాన్ఫిగ్ విలువలు డేటాబేస్లో నిల్వ చేయబడతాయి మరియు డ్యాష్బోర్డ్ కాన్ఫిగ్ పేజీ ద్వారా యాక్సెస్ చేయవచ్చు.

## అంతర్నిర్మిత ఈవెంట్లు

| ఈవెంట్            | ఎప్పుడు                                                         | పేలోడ్                        |
| ----------------- | --------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | చాట్ హ్యాండ్లర్కు ముందు                                         | అభ్యర్థన సందర్భం              |
| `onResponse`      | చాట్ హ్యాండ్లర్ తర్వాత                                          | ప్రతిస్పందన డేటా              |
| `onError`         | హ్యాండ్లర్ లోపం సంభవించినప్పుడు                                 | లోపం ఆబ్జెక్ట్                |
| `onModelSelect`   | రూటింగ్ కోసం మోడల్ ఎంపికైనప్పుడు                                | మోడల్ సమాచారం                 |
| `onComboResolve`  | కాంబో రూటింగ్ పరిష్కరించబడినప్పుడు                              | కాంబో లక్ష్యాలు               |
| `onRateLimit`     | రేట్ పరిమితిని చేరుకున్నప్పుడు                                  | పరిమితి సమాచారం               |
| `onQuotaExhaust`  | కోటా పూర్తిగా వినియోగించబడినప్పుడు                              | కోటా సమాచారం                  |
| `onProviderError` | ప్రొవైడర్ లోపాన్ని తిరిగి ఇచ్చినప్పుడు                          | లోపం వివరాలు                  |
| `onStreamStart`   | SSE స్ట్రీమ్ ప్రారంభమైనప్పుడు                                   | స్ట్రీమ్ సమాచారం              |
| `onStreamEnd`     | SSE స్ట్రీమ్ ముగిసినప్పుడు                                      | స్ట్రీమ్ గణాంకాలు             |
| `onInstall`       | ప్లగిన్ ఇన్స్టాల్ చేయబడినప్పుడు                                 | `{ name, version, manifest }` |
| `onActivate`      | ప్లగిన్ యాక్టివేట్ చేయబడినప్పుడు                                | `{ name, version, manifest }` |
| `onDeactivate`    | ప్లగిన్ డీయాక్టివేట్ చేయబడినప్పుడు                              | `{ name, version, manifest }` |
| `onUninstall`     | ప్లగిన్ అన్ఇన్స్టాల్ చేయబడినప్పుడు (ఫైల్లు తొలగించడానికి ముందు) | `{ name, version, manifest }` |

## ఉదాహరణలు

### అభ్యర్థన లాగర్

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### రేట్ లిమిటర్

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 నిమిషం
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

### ప్రతిస్పందన ట్రాన్స్ఫార్మర్

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
