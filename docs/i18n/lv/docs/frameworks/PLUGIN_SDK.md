# OmniRoute Plugin SDK (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Ātrā sākšana

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

## API atsauce

### `definePlugin(def: PluginDefinition): Plugin`

Rūpnīcas funkcija, kas izveido Plugin objektu ar noklusējuma vērtībām.

**Parametri:**

- `name` (string, obligāts) — Spraudņa nosaukums kebab-case formātā
- `priority` (number, neobligāts, noklusējums: 100) — Mazāka vērtība tiek izpildīta vispirms
- `enabled` (boolean, neobligāts, noklusējums: true) — Vai sākt iespējotā stāvoklī?
- `onRequest` (function, neobligāts) — Tiek izpildīta pirms tērzēšanas apstrādātāja
- `onResponse` (function, neobligāts) — Tiek izpildīta pēc tērzēšanas apstrādātāja
- `onError` (function, neobligāts) — Tiek izpildīta apstrādātāja kļūdas gadījumā

### `blockRequest(response?): BlockingHookResult`

Bloķē pieprasījumu un pēc izvēles atgriež pielāgotu atbildi.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Maina pieprasījuma pamattekstu, pirms tas sasniedz nodrošinātāju.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Pievieno metadatus pieprasījuma kontekstam.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Spraudņa konteksts (`PluginContext`)

| Lauks       | Tips                      | Apraksts                            |
| ----------- | ------------------------- | ----------------------------------- |
| `requestId` | `string`                  | Unikāls pieprasījuma identifikators |
| `model`     | `string`                  | Pieprasītā modeļa nosaukums         |
| `provider`  | `string`                  | Mērķa nodrošinātāja ID              |
| `body`      | `Record<string, unknown>` | Pieprasījuma pamatteksts            |
| `headers`   | `Record<string, string>`  | Pieprasījuma galvenes               |
| `metadata`  | `Record<string, unknown>` | Maināmi metadati                    |
| `timestamp` | `number`                  | Pieprasījuma laikspiedols           |

## Manifests (`plugin.json`)

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

### Āķu prioritāte

Āķus var konfigurēt ar prioritāti (mazāka vērtība = tiek izpildīts vispirms):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Vai kā vienkāršas Būla vērtības (noklusējuma prioritāte ir 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Atļauju sistēma

Spraudņi darbojas izolētā VM kontekstā. Piekļuvei ārējiem resursiem ir nepieciešamas nepārprotami piešķirtas atļaujas:

| Atļauja      | Piešķir piekļuvi                                             |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Tikai lasāms `process.env` starpniekobjekts                  |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Bez attiecīgās atļaujas atbilstošie globālie objekti smilškastē vienkārši nav pieejami.

## Konfigurācijas shēma

Definējiet konfigurējamos iestatījumus laukā `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Ārējās API atslēga" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Lauku tipi: `string`, `number`, `boolean`, `select`

Lauku opcijas: `default`, `min`, `max`, `enum`, `description`

Konfigurācijas vērtības tiek saglabātas datubāzē un ir pieejamas informācijas paneļa konfigurācijas lapā.

## Iebūvētie notikumi

| Notikums          | Kad                                          | Derīgā slodze                 |
| ----------------- | -------------------------------------------- | ----------------------------- |
| `onRequest`       | Pirms tērzēšanas apstrādātāja                | Pieprasījuma konteksts        |
| `onResponse`      | Pēc tērzēšanas apstrādātāja                  | Atbildes dati                 |
| `onError`         | Apstrādātāja kļūdas gadījumā                 | Kļūdas objekts                |
| `onModelSelect`   | Maršrutēšanai atlasīts modelis               | Modeļa informācija            |
| `onComboResolve`  | Atrisināta kombinētā maršrutēšana            | Kombinācijas mērķi            |
| `onRateLimit`     | Sasniegts ātruma ierobežojums                | Ierobežojuma informācija      |
| `onQuotaExhaust`  | Kvota izsmelta                               | Kvotas informācija            |
| `onProviderError` | Pakalpojumu sniedzējs atgrieza kļūdu         | Kļūdas informācija            |
| `onStreamStart`   | Sākta SSE straume                            | Straumes informācija          |
| `onStreamEnd`     | Pabeigta SSE straume                         | Straumes statistika           |
| `onInstall`       | Spraudnis instalēts                          | `{ name, version, manifest }` |
| `onActivate`      | Spraudnis aktivizēts                         | `{ name, version, manifest }` |
| `onDeactivate`    | Spraudnis deaktivizēts                       | `{ name, version, manifest }` |
| `onUninstall`     | Spraudnis atinstalēts (pirms failu dzēšanas) | `{ name, version, manifest }` |

## Piemēri

### Pieprasījumu žurnalētājs

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ātruma ierobežotājs

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minūte
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

### Atbildes pārveidotājs

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
