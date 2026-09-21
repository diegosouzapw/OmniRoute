# OmniRoute Plugin SDK (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Schnellstart

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

## API-Referenz

### `definePlugin(def: PluginDefinition): Plugin`

Factory-Funktion, die ein Plugin-Objekt mit Standardwerten erstellt.

**Parameter:**

- `name` (string, erforderlich) — Plugin-Name in Kebab-Case
- `priority` (number, optional, Standardwert: 100) — Niedrigere Werte werden zuerst ausgeführt
- `enabled` (boolean, optional, Standardwert: true) — Soll das Plugin aktiviert starten?
- `onRequest` (function, optional) — Wird vor dem Chat-Handler ausgeführt
- `onResponse` (function, optional) — Wird nach dem Chat-Handler ausgeführt
- `onError` (function, optional) — Wird bei einem Handler-Fehler ausgeführt

### `blockRequest(response?): BlockingHookResult`

Blockiert die Anfrage und gibt optional eine benutzerdefinierte Antwort zurück.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Ändert den Anfrage-Body, bevor er den Provider erreicht.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Fügt dem Anfragekontext Metadaten hinzu.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plugin-Kontext (`PluginContext`)

| Feld        | Typ                       | Beschreibung                   |
| ----------- | ------------------------- | ------------------------------ |
| `requestId` | `string`                  | Eindeutige Anfragekennung      |
| `model`     | `string`                  | Name des angeforderten Modells |
| `provider`  | `string`                  | ID des Ziel-Providers          |
| `body`      | `Record<string, unknown>` | Anfrage-Body                   |
| `headers`   | `Record<string, string>`  | Anfrage-Header                 |
| `metadata`  | `Record<string, unknown>` | Veränderbare Metadaten         |
| `timestamp` | `number`                  | Zeitstempel der Anfrage        |

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

### Hook-Priorität

Hooks können mit einer Priorität konfiguriert werden (niedriger = wird zuerst ausgeführt):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Oder als einfache boolesche Werte (Standardpriorität 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Berechtigungssystem

Plugins werden in einem isolierten VM-Kontext ausgeführt. Der Zugriff auf externe Ressourcen erfordert ausdrückliche Berechtigungen:

| Berechtigung | Gewährt                                                      |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Schreibgeschützter `process.env`-Proxy                       |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Ohne eine Berechtigung sind die entsprechenden globalen Objekte in der Sandbox schlicht nicht verfügbar.

## Konfigurationsschema

Definieren Sie konfigurierbare Einstellungen in `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Externer API-Schlüssel" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Feldtypen: `string`, `number`, `boolean`, `select`

Feldoptionen: `default`, `min`, `max`, `enum`, `description`

Konfigurationswerte werden in der Datenbank gespeichert und sind über die Konfigurationsseite des Dashboards zugänglich.

## Integrierte Ereignisse

| Ereignis          | Zeitpunkt                                            | Nutzdaten                     |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | Vor dem Chat-Handler                                 | Anfragekontext                |
| `onResponse`      | Nach dem Chat-Handler                                | Antwortdaten                  |
| `onError`         | Bei einem Handler-Fehler                             | Fehlerobjekt                  |
| `onModelSelect`   | Modell für das Routing ausgewählt                    | Modellinformationen           |
| `onComboResolve`  | Kombinations-Routing aufgelöst                       | Kombinationsziele             |
| `onRateLimit`     | Ratenbegrenzung erreicht                             | Begrenzungsinformationen      |
| `onQuotaExhaust`  | Kontingent ausgeschöpft                              | Kontingentinformationen       |
| `onProviderError` | Anbieter hat einen Fehler zurückgegeben              | Fehlerdetails                 |
| `onStreamStart`   | SSE-Stream gestartet                                 | Stream-Informationen          |
| `onStreamEnd`     | SSE-Stream beendet                                   | Stream-Statistiken            |
| `onInstall`       | Plugin installiert                                   | `{ name, version, manifest }` |
| `onActivate`      | Plugin aktiviert                                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin deaktiviert                                   | `{ name, version, manifest }` |
| `onUninstall`     | Plugin deinstalliert (bevor Dateien gelöscht werden) | `{ name, version, manifest }` |

## Beispiele

### Anfrageprotokollierung

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Ratenbegrenzer

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 Minute
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({
        error: "Ratenbegrenzung überschritten",
        status: 429,
      });
    }
  },
});
```

### Antworttransformator

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
