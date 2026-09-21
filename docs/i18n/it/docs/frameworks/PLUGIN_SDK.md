# OmniRoute Plugin SDK (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Avvio rapido

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

## Riferimento API

### `definePlugin(def: PluginDefinition): Plugin`

Funzione factory che crea un oggetto Plugin con valori predefiniti.

**Parametri:**

- `name` (string, obbligatorio) — Nome del plugin in kebab-case
- `priority` (number, facoltativo, valore predefinito: 100) — I valori più bassi vengono eseguiti per primi
- `enabled` (boolean, facoltativo, valore predefinito: true) — Deve essere inizialmente abilitato?
- `onRequest` (function, facoltativo) — Viene eseguita prima del gestore della chat
- `onResponse` (function, facoltativo) — Viene eseguita dopo il gestore della chat
- `onError` (function, facoltativo) — Viene eseguita in caso di errore del gestore

### `blockRequest(response?): BlockingHookResult`

Blocca la richiesta e, facoltativamente, restituisce una risposta personalizzata.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Modifica il corpo della richiesta prima che raggiunga il provider.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Associa metadati al contesto della richiesta.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Contesto del plugin (`PluginContext`)

| Campo       | Tipo                      | Descrizione                            |
| ----------- | ------------------------- | -------------------------------------- |
| `requestId` | `string`                  | Identificatore univoco della richiesta |
| `model`     | `string`                  | Nome del modello richiesto             |
| `provider`  | `string`                  | ID del provider di destinazione        |
| `body`      | `Record<string, unknown>` | Corpo della richiesta                  |
| `headers`   | `Record<string, string>`  | Intestazioni della richiesta           |
| `metadata`  | `Record<string, unknown>` | Metadati modificabili                  |
| `timestamp` | `number`                  | Timestamp della richiesta              |

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

### Priorità degli hook

Gli hook possono essere configurati con una priorità (valore più basso = esecuzione precedente):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Oppure come semplici valori booleani (priorità predefinita 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Sistema di autorizzazioni

I plugin vengono eseguiti nel contesto di una VM con sandbox. L'accesso alle risorse esterne richiede autorizzazioni esplicite:

| Autorizzazione | Concede                                                      |
| -------------- | ------------------------------------------------------------ |
| `network`      | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`    | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write`   | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`          | Proxy `process.env` di sola lettura                          |
| `exec`         | `child_process.exec`, `child_process.execSync`               |

Senza un'autorizzazione, le variabili globali corrispondenti semplicemente non sono disponibili nella sandbox.

## Schema di configurazione

Definisci le impostazioni configurabili in `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Chiave API esterna" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Tipi di campo: `string`, `number`, `boolean`, `select`

Opzioni dei campi: `default`, `min`, `max`, `enum`, `description`

I valori di configurazione vengono memorizzati nel database e sono accessibili tramite la pagina di configurazione della dashboard.

## Eventi integrati

| Evento            | Quando                                                                  | Payload                       |
| ----------------- | ----------------------------------------------------------------------- | ----------------------------- |
| `onRequest`       | Prima del gestore della chat                                            | Contesto della richiesta      |
| `onResponse`      | Dopo il gestore della chat                                              | Dati della risposta           |
| `onError`         | In caso di errore del gestore                                           | Oggetto errore                |
| `onModelSelect`   | Quando viene selezionato il modello per il routing                      | Informazioni sul modello      |
| `onComboResolve`  | Quando viene risolto il routing combinato                               | Destinazioni della combo      |
| `onRateLimit`     | Quando viene raggiunto il limite di frequenza                           | Informazioni sul limite       |
| `onQuotaExhaust`  | Quando la quota è esaurita                                              | Informazioni sulla quota      |
| `onProviderError` | Quando il provider restituisce un errore                                | Dettagli dell'errore          |
| `onStreamStart`   | Quando viene avviato lo stream SSE                                      | Informazioni sullo stream     |
| `onStreamEnd`     | Quando termina lo stream SSE                                            | Statistiche dello stream      |
| `onInstall`       | Quando il plugin viene installato                                       | `{ name, version, manifest }` |
| `onActivate`      | Quando il plugin viene attivato                                         | `{ name, version, manifest }` |
| `onDeactivate`    | Quando il plugin viene disattivato                                      | `{ name, version, manifest }` |
| `onUninstall`     | Quando il plugin viene disinstallato (prima dell'eliminazione dei file) | `{ name, version, manifest }` |

## Esempi

### Registratore delle richieste

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Limitatore di frequenza

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 minuto
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

### Trasformatore delle risposte

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
