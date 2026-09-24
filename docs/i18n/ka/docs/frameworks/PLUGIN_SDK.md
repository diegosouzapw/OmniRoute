# OmniRoute Plugin SDK (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## სწრაფი დაწყება

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

## API-ის ცნობარი

### `definePlugin(def: PluginDefinition): Plugin`

ფაბრიკული ფუნქცია, რომელიც ნაგულისხმევი პარამეტრებით ქმნის Plugin ობიექტს.

**პარამეტრები:**

- `name` (string, სავალდებულო) — პლაგინის სახელი kebab-case ფორმატში
- `priority` (number, არასავალდებულო, ნაგულისხმევი: 100) — უფრო დაბალი მნიშვნელობის მქონე პირველი გაეშვება
- `enabled` (boolean, არასავალდებულო, ნაგულისხმევი: true) — ჩაირთოს გაშვებისას?
- `onRequest` (function, არასავალდებულო) — სრულდება ჩატის დამმუშავებლამდე
- `onResponse` (function, არასავალდებულო) — სრულდება ჩატის დამმუშავებლის შემდეგ
- `onError` (function, არასავალდებულო) — სრულდება დამმუშავებლის შეცდომისას

### `blockRequest(response?): BlockingHookResult`

დაბლოკეთ მოთხოვნა და, სურვილისამებრ, დააბრუნეთ მორგებული პასუხი.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

შეცვალეთ მოთხოვნის სხეული პროვაიდერამდე მისვლამდე.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

მოთხოვნის კონტექსტს დაურთეთ მეტამონაცემები.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## პლაგინის კონტექსტი (`PluginContext`)

| ველი        | ტიპი                      | აღწერა                             |
| ----------- | ------------------------- | ---------------------------------- |
| `requestId` | `string`                  | მოთხოვნის უნიკალური იდენტიფიკატორი |
| `model`     | `string`                  | მოთხოვნილი მოდელის სახელი          |
| `provider`  | `string`                  | სამიზნე პროვაიდერის ID             |
| `body`      | `Record<string, unknown>` | მოთხოვნის სხეული                   |
| `headers`   | `Record<string, string>`  | მოთხოვნის სათაურები                |
| `metadata`  | `Record<string, unknown>` | ცვალებადი მეტამონაცემები           |
| `timestamp` | `number`                  | მოთხოვნის დროის ნიშნული            |

## მანიფესტი (`plugin.json`)

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

### ჰუკების პრიორიტეტი

ჰუკების კონფიგურაცია შესაძლებელია პრიორიტეტის მიხედვით (უფრო დაბალი = პირველი გაეშვება):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

ან მარტივი ლოგიკური მნიშვნელობების სახით (ნაგულისხმევი პრიორიტეტი 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ნებართვების სისტემა

პლაგინები იზოლირებულ VM კონტექსტში მუშაობენ. გარე რესურსებზე წვდომა მკაფიოდ განსაზღვრულ ნებართვებს მოითხოვს:

| ნებართვა     | მინიჭებული შესაძლებლობები                                    |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | მხოლოდ წაკითხვადი `process.env` პროქსი                       |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

ნებართვის გარეშე შესაბამისი გლობალური ობიექტები sandbox-ში უბრალოდ მიუწვდომელია.

## კონფიგურაციის სქემა

კონფიგურირებადი პარამეტრები განსაზღვრეთ `configSchema`-ში:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "გარე API გასაღები" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ველების ტიპები: `string`, `number`, `boolean`, `select`

ველების პარამეტრები: `default`, `min`, `max`, `enum`, `description`

კონფიგურაციის მნიშვნელობები ინახება მონაცემთა ბაზაში და ხელმისაწვდომია მართვის პანელის კონფიგურაციის გვერდიდან.

## ჩაშენებული მოვლენები

| მოვლენა           | როდის                                      | სასარგებლო დატვირთვა          |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | ჩატის დამმუშავებლის გამოძახებამდე          | მოთხოვნის კონტექსტი           |
| `onResponse`      | ჩატის დამმუშავებლის გამოძახების შემდეგ     | პასუხის მონაცემები            |
| `onError`         | დამმუშავებლის შეცდომისას                   | შეცდომის ობიექტი              |
| `onModelSelect`   | მარშრუტიზაციისთვის მოდელის არჩევისას       | მოდელის ინფორმაცია            |
| `onComboResolve`  | კომბინირებული მარშრუტიზაციის გადაწყვეტისას | კომბინაციის სამიზნეები        |
| `onRateLimit`     | სიხშირის ლიმიტის მიღწევისას                | ლიმიტის ინფორმაცია            |
| `onQuotaExhaust`  | კვოტის ამოწურვისას                         | კვოტის ინფორმაცია             |
| `onProviderError` | პროვაიდერის მიერ შეცდომის დაბრუნებისას     | შეცდომის დეტალები             |
| `onStreamStart`   | SSE ნაკადის დაწყებისას                     | ნაკადის ინფორმაცია            |
| `onStreamEnd`     | SSE ნაკადის დასრულებისას                   | ნაკადის სტატისტიკა            |
| `onInstall`       | პლაგინის ინსტალაციისას                     | `{ name, version, manifest }` |
| `onActivate`      | პლაგინის გააქტიურებისას                    | `{ name, version, manifest }` |
| `onDeactivate`    | პლაგინის დეაქტივაციისას                    | `{ name, version, manifest }` |
| `onUninstall`     | პლაგინის წაშლისას (ფაილების წაშლამდე)      | `{ name, version, manifest }` |

## მაგალითები

### მოთხოვნების ჟურნალის მწარმოებელი

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### სიხშირის შემზღუდველი

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 წუთი
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

### პასუხის გარდამქმნელი

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
