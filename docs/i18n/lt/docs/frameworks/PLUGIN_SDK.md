# OmniRoute Plugin SDK (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Greitoji pradžia

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

## API žinynas

### `definePlugin(def: PluginDefinition): Plugin`

Gamyklinė funkcija, kuri sukuria Plugin objektą su numatytosiomis reikšmėmis.

**Parametrai:**

- `name` (string, privalomas) — Papildinio pavadinimas kebab-case formatu
- `priority` (number, neprivalomas, numatytoji reikšmė: 100) — Mažesnė reikšmė vykdoma pirmiau
- `enabled` (boolean, neprivalomas, numatytoji reikšmė: true) — Ar pradėti įjungus?
- `onRequest` (function, neprivalomas) — Vykdoma prieš pokalbio apdorojimo funkciją
- `onResponse` (function, neprivalomas) — Vykdoma po pokalbio apdorojimo funkcijos
- `onError` (function, neprivalomas) — Vykdoma įvykus apdorojimo funkcijos klaidai

### `blockRequest(response?): BlockingHookResult`

Užblokuoja užklausą ir pasirinktinai grąžina pasirinktinį atsakymą.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Pakeičia užklausos turinį prieš jam pasiekiant teikėją.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Prie užklausos konteksto prideda metaduomenis.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Papildinio kontekstas (`PluginContext`)

| Laukas      | Tipas                     | Aprašymas                           |
| ----------- | ------------------------- | ----------------------------------- |
| `requestId` | `string`                  | Unikalus užklausos identifikatorius |
| `model`     | `string`                  | Prašomo modelio pavadinimas         |
| `provider`  | `string`                  | Tikslinio teikėjo ID                |
| `body`      | `Record<string, unknown>` | Užklausos turinys                   |
| `headers`   | `Record<string, string>`  | Užklausos antraštės                 |
| `metadata`  | `Record<string, unknown>` | Keičiami metaduomenys               |
| `timestamp` | `number`                  | Užklausos laiko žyma                |

## Manifestas (`plugin.json`)

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

### Kablių prioritetas

Kablius galima konfigūruoti nurodant prioritetą (mažesnė reikšmė = vykdoma pirmiau):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Arba kaip paprastas logines reikšmes (numatytasis prioritetas 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Leidimų sistema

Papildiniai vykdomi izoliuotame VM kontekste. Prieigai prie išorinių išteklių reikalingi aiškiai suteikti leidimai:

| Leidimas     | Suteikia prieigą                                             |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Tik skaitymui skirtas `process.env` tarpinis objektas        |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Neturint leidimo, atitinkami globalieji objektai izoliuotoje aplinkoje tiesiog nepasiekiami.

## Konfigūracijos schema

Konfigūruojamus nustatymus apibrėžkite `configSchema`:

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

Laukų tipai: `string`, `number`, `boolean`, `select`

Laukų parinktys: `default`, `min`, `max`, `enum`, `description`

Konfigūracijos reikšmės išsaugomos duomenų bazėje ir yra pasiekiamos valdymo skydelio konfigūracijos puslapyje.

## Integruotieji įvykiai

| Įvykis            | Kada                                         | Naudingoji apkrova            |
| ----------------- | -------------------------------------------- | ----------------------------- |
| `onRequest`       | Prieš pokalbių apdorojimo funkciją           | Užklausos kontekstas          |
| `onResponse`      | Po pokalbių apdorojimo funkcijos             | Atsakymo duomenys             |
| `onError`         | Įvykus apdorojimo klaidai                    | Klaidos objektas              |
| `onModelSelect`   | Parinkus modelį maršrutizavimui              | Modelio informacija           |
| `onComboResolve`  | Nustačius kombinuoto maršrutizavimo tikslus  | Kombinacijos tikslai          |
| `onRateLimit`     | Pasiekus dažnio ribą                         | Ribos informacija             |
| `onQuotaExhaust`  | Išnaudojus kvotą                             | Kvotos informacija            |
| `onProviderError` | Teikėjui grąžinus klaidą                     | Klaidos informacija           |
| `onStreamStart`   | Pradėjus SSE srautą                          | Srauto informacija            |
| `onStreamEnd`     | Pasibaigus SSE srautui                       | Srauto statistika             |
| `onInstall`       | Įdiegus papildinį                            | `{ name, version, manifest }` |
| `onActivate`      | Aktyvavus papildinį                          | `{ name, version, manifest }` |
| `onDeactivate`    | Deaktyvavus papildinį                        | `{ name, version, manifest }` |
| `onUninstall`     | Pašalinus papildinį (prieš ištrinant failus) | `{ name, version, manifest }` |

## Pavyzdžiai

### Užklausų registravimo priemonė

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Dažnio ribotuvas

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minutė
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

### Atsakymo transformavimo priemonė

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
