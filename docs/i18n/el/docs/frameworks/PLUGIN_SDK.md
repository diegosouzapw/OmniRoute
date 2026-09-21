# OmniRoute Plugin SDK (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Γρήγορη εκκίνηση

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

## Αναφορά API

### `definePlugin(def: PluginDefinition): Plugin`

Συνάρτηση εργοστασίου που δημιουργεί ένα αντικείμενο Plugin με προεπιλεγμένες τιμές.

**Παράμετροι:**

- `name` (string, απαιτείται) — Όνομα plugin σε μορφή kebab-case
- `priority` (number, προαιρετικό, προεπιλογή: 100) — Η χαμηλότερη τιμή εκτελείται πρώτη
- `enabled` (boolean, προαιρετικό, προεπιλογή: true) — Να ξεκινά ενεργοποιημένο;
- `onRequest` (function, προαιρετικό) — Εκτελείται πριν από τον χειριστή συνομιλίας
- `onResponse` (function, προαιρετικό) — Εκτελείται μετά τον χειριστή συνομιλίας
- `onError` (function, προαιρετικό) — Εκτελείται σε περίπτωση σφάλματος του χειριστή

### `blockRequest(response?): BlockingHookResult`

Αποκλείει το αίτημα και, προαιρετικά, επιστρέφει μια προσαρμοσμένη απόκριση.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Τροποποιεί το σώμα του αιτήματος πριν αυτό φτάσει στον πάροχο.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Επισυνάπτει μεταδεδομένα στο περιβάλλον του αιτήματος.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Περιβάλλον Plugin (`PluginContext`)

| Πεδίο       | Τύπος                     | Περιγραφή                        |
| ----------- | ------------------------- | -------------------------------- |
| `requestId` | `string`                  | Μοναδικό αναγνωριστικό αιτήματος |
| `model`     | `string`                  | Όνομα ζητούμενου μοντέλου        |
| `provider`  | `string`                  | ID παρόχου προορισμού            |
| `body`      | `Record<string, unknown>` | Σώμα αιτήματος                   |
| `headers`   | `Record<string, string>`  | Κεφαλίδες αιτήματος              |
| `metadata`  | `Record<string, unknown>` | Μεταβλητά μεταδεδομένα           |
| `timestamp` | `number`                  | Χρονοσήμανση αιτήματος           |

## Δηλωτικό αρχείο (`plugin.json`)

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

### Προτεραιότητα Hook

Τα hooks μπορούν να διαμορφωθούν με προτεραιότητα (χαμηλότερη τιμή = εκτελείται πρώτο):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Ή ως απλές δυαδικές τιμές (προεπιλεγμένη προτεραιότητα 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Σύστημα Δικαιωμάτων

Τα πρόσθετα εκτελούνται σε περιβάλλον sandboxed VM. Η πρόσβαση σε εξωτερικούς πόρους απαιτεί ρητά δικαιώματα:

| Δικαίωμα     | Παρέχει πρόσβαση σε                                          |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Διακομιστής μεσολάβησης μόνο για ανάγνωση του `process.env`  |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Χωρίς κάποιο δικαίωμα, τα αντίστοιχα globals απλώς δεν είναι διαθέσιμα στο sandbox.

## Σχήμα Ρυθμίσεων

Ορίστε τις παραμετροποιήσιμες ρυθμίσεις στο `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Κλειδί εξωτερικού API" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Τύποι πεδίων: `string`, `number`, `boolean`, `select`

Επιλογές πεδίων: `default`, `min`, `max`, `enum`, `description`

Οι τιμές των ρυθμίσεων αποθηκεύονται στη βάση δεδομένων και είναι προσβάσιμες μέσω της σελίδας ρυθμίσεων του πίνακα ελέγχου.

## Ενσωματωμένα Συμβάντα

| Συμβάν            | Πότε                                                   | Ωφέλιμο φορτίο                |
| ----------------- | ------------------------------------------------------ | ----------------------------- |
| `onRequest`       | Πριν από τον χειριστή συνομιλίας                       | Περιβάλλον αιτήματος          |
| `onResponse`      | Μετά τον χειριστή συνομιλίας                           | Δεδομένα απόκρισης            |
| `onError`         | Σε περίπτωση σφάλματος του χειριστή                    | Αντικείμενο σφάλματος         |
| `onModelSelect`   | Επιλέγεται μοντέλο για δρομολόγηση                     | Πληροφορίες μοντέλου          |
| `onComboResolve`  | Επιλύεται η συνδυαστική δρομολόγηση                    | Προορισμοί συνδυασμού         |
| `onRateLimit`     | Συμπληρώνεται το όριο ρυθμού                           | Πληροφορίες ορίου             |
| `onQuotaExhaust`  | Εξαντλείται το όριο χρήσης                             | Πληροφορίες ορίου χρήσης      |
| `onProviderError` | Ο πάροχος επιστρέφει σφάλμα                            | Λεπτομέρειες σφάλματος        |
| `onStreamStart`   | Ξεκινά η ροή SSE                                       | Πληροφορίες ροής              |
| `onStreamEnd`     | Τερματίζεται η ροή SSE                                 | Στατιστικά ροής               |
| `onInstall`       | Εγκαθίσταται το πρόσθετο                               | `{ name, version, manifest }` |
| `onActivate`      | Ενεργοποιείται το πρόσθετο                             | `{ name, version, manifest }` |
| `onDeactivate`    | Απενεργοποιείται το πρόσθετο                           | `{ name, version, manifest }` |
| `onUninstall`     | Απεγκαθίσταται το πρόσθετο (πριν διαγραφούν τα αρχεία) | `{ name, version, manifest }` |

## Παραδείγματα

### Καταγραφέας Αιτημάτων

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Περιοριστής Ρυθμού

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 λεπτό
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

### Μετασχηματιστής Απόκρισης

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
