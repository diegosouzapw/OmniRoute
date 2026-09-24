# OmniRoute Plugin SDK (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Rychlý start

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

## Přehled API

### `definePlugin(def: PluginDefinition): Plugin`

Tovární funkce, která vytvoří objekt Plugin s výchozími hodnotami.

**Parametry:**

- `name` (string, povinný) — Název pluginu ve formátu kebab-case
- `priority` (number, volitelný, výchozí hodnota: 100) — Nižší hodnota se spustí jako první
- `enabled` (boolean, volitelný, výchozí hodnota: true) — Má být při spuštění povolen?
- `onRequest` (function, volitelný) — Spustí se před obslužnou rutinou chatu
- `onResponse` (function, volitelný) — Spustí se po obslužné rutině chatu
- `onError` (function, volitelný) — Spustí se při chybě obslužné rutiny

### `blockRequest(response?): BlockingHookResult`

Zablokuje požadavek a volitelně vrátí vlastní odpověď.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Upraví tělo požadavku předtím, než se dostane k poskytovateli.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Připojí metadata ke kontextu požadavku.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Kontext pluginu (`PluginContext`)

| Pole        | Typ                       | Popis                             |
| ----------- | ------------------------- | --------------------------------- |
| `requestId` | `string`                  | Jedinečný identifikátor požadavku |
| `model`     | `string`                  | Název požadovaného modelu         |
| `provider`  | `string`                  | ID cílového poskytovatele         |
| `body`      | `Record<string, unknown>` | Tělo požadavku                    |
| `headers`   | `Record<string, string>`  | Hlavičky požadavku                |
| `metadata`  | `Record<string, unknown>` | Měnitelná metadata                |
| `timestamp` | `number`                  | Časové razítko požadavku          |

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

### Priorita hooků

Hooky lze nakonfigurovat s prioritou (nižší hodnota = spustí se dříve):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Nebo jako jednoduché booleovské hodnoty (výchozí priorita je 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Systém oprávnění

Pluginy běží v sandboxovaném kontextu virtuálního stroje. Přístup k externím prostředkům vyžaduje explicitní oprávnění:

| Oprávnění    | Povoluje                                                     |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Proxy `process.env` pouze pro čtení                          |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Bez příslušného oprávnění nejsou odpovídající globální objekty v sandboxu jednoduše dostupné.

## Schéma konfigurace

Konfigurovatelná nastavení definujte v `configSchema`:

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

Typy polí: `string`, `number`, `boolean`, `select`

Možnosti polí: `default`, `min`, `max`, `enum`, `description`

Hodnoty konfigurace jsou uloženy v databázi a dostupné prostřednictvím konfigurační stránky řídicího panelu.

## Vestavěné události

| Událost           | Kdy                                         | Datová část                   |
| ----------------- | ------------------------------------------- | ----------------------------- |
| `onRequest`       | Před obslužnou rutinou chatu                | Kontext požadavku             |
| `onResponse`      | Po obslužné rutině chatu                    | Data odpovědi                 |
| `onError`         | Při chybě obslužné rutiny                   | Objekt chyby                  |
| `onModelSelect`   | Model vybrán pro směrování                  | Informace o modelu            |
| `onComboResolve`  | Kombinované směrování vyřešeno              | Cíle kombinace                |
| `onRateLimit`     | Dosažen limit požadavků                     | Informace o limitu            |
| `onQuotaExhaust`  | Kvóta vyčerpána                             | Informace o kvótě             |
| `onProviderError` | Poskytovatel vrátil chybu                   | Podrobnosti o chybě           |
| `onStreamStart`   | Stream SSE spuštěn                          | Informace o streamu           |
| `onStreamEnd`     | Stream SSE ukončen                          | Statistiky streamu            |
| `onInstall`       | Plugin nainstalován                         | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktivován                            | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktivován                          | `{ name, version, manifest }` |
| `onUninstall`     | Plugin odinstalován (před smazáním souborů) | `{ name, version, manifest }` |

## Příklady

### Protokolování požadavků

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Omezovač počtu požadavků

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minuta
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

### Transformace odpovědi

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
