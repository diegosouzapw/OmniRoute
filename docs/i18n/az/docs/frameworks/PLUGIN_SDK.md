# OmniRoute Plugin SDK (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Sürətli başlanğıc

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

## API arayışı

### `definePlugin(def: PluginDefinition): Plugin`

Standart dəyərlərlə Plugin obyekti yaradan fabrik funksiyası.

**Parametrlər:**

- `name` (string, tələb olunur) — kebab-case formatında plagin adı
- `priority` (number, istəyə bağlı, standart: 100) — Daha aşağı dəyərə malik olan əvvəl icra olunur
- `enabled` (boolean, istəyə bağlı, standart: true) — Aktiv vəziyyətdə başlasın?
- `onRequest` (function, istəyə bağlı) — Söhbət emalçısından əvvəl icra olunur
- `onResponse` (function, istəyə bağlı) — Söhbət emalçısından sonra icra olunur
- `onError` (function, istəyə bağlı) — Emalçı xətası zamanı icra olunur

### `blockRequest(response?): BlockingHookResult`

Sorğunu bloklayın və istəyə bağlı olaraq fərdi cavab qaytarın.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Sorğu provayderə çatmazdan əvvəl onun gövdəsini dəyişdirin.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Sorğu kontekstinə metadata əlavə edin.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plagin konteksti (`PluginContext`)

| Sahə        | Tip                       | Təsvir                      |
| ----------- | ------------------------- | --------------------------- |
| `requestId` | `string`                  | Unikal sorğu identifikatoru |
| `model`     | `string`                  | Tələb olunan modelin adı    |
| `provider`  | `string`                  | Hədəf provayder ID-si       |
| `body`      | `Record<string, unknown>` | Sorğu gövdəsi               |
| `headers`   | `Record<string, string>`  | Sorğu başlıqları            |
| `metadata`  | `Record<string, unknown>` | Dəyişdirilə bilən metadata  |
| `timestamp` | `number`                  | Sorğunun zaman damğası      |

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

### Hook prioriteti

Hook-lar prioritetlə konfiqurasiya edilə bilər (daha aşağı = əvvəl icra olunur):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Yaxud sadə boolean dəyərləri kimi (standart prioritet 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## İcazə Sistemi

Plaginlər təcrid olunmuş VM kontekstində işləyir. Xarici resurslara giriş üçün açıq icazələr tələb olunur:

| İcazə        | Təqdim etdiyi imkanlar                                       |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Yalnız oxuma üçün `process.env` proksisi                     |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

İcazə olmadıqda müvafiq qlobal obyektlər sadəcə olaraq təcrid olunmuş mühitdə əlçatan olmur.

## Konfiqurasiya Sxemi

Konfiqurasiya edilə bilən parametrləri `configSchema` daxilində müəyyənləşdirin:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Xarici API açarı" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Sahə növləri: `string`, `number`, `boolean`, `select`

Sahə seçimləri: `default`, `min`, `max`, `enum`, `description`

Konfiqurasiya dəyərləri verilənlər bazasında saxlanılır və idarəetmə panelinin konfiqurasiya səhifəsi vasitəsilə əlçatandır.

## Daxili Hadisələr

| Hadisə            | Nə zaman                                      | Faydalı yük                   |
| ----------------- | --------------------------------------------- | ----------------------------- |
| `onRequest`       | Çat emalçısından əvvəl                        | Sorğu konteksti               |
| `onResponse`      | Çat emalçısından sonra                        | Cavab məlumatları             |
| `onError`         | Emalçı xətası zamanı                          | Xəta obyekti                  |
| `onModelSelect`   | Marşrutlaşdırma üçün model seçildikdə         | Model məlumatları             |
| `onComboResolve`  | Kombinə edilmiş marşrut həll edildikdə        | Kombinasiya hədəfləri         |
| `onRateLimit`     | Tezlik limitinə çatdıqda                      | Limit məlumatları             |
| `onQuotaExhaust`  | Kvota tükəndikdə                              | Kvota məlumatları             |
| `onProviderError` | Provayder xəta qaytardıqda                    | Xəta təfərrüatları            |
| `onStreamStart`   | SSE axını başladıqda                          | Axın məlumatları              |
| `onStreamEnd`     | SSE axını bitdikdə                            | Axın statistikası             |
| `onInstall`       | Plagin quraşdırıldıqda                        | `{ name, version, manifest }` |
| `onActivate`      | Plagin aktivləşdirildikdə                     | `{ name, version, manifest }` |
| `onDeactivate`    | Plagin deaktivləşdirildikdə                   | `{ name, version, manifest }` |
| `onUninstall`     | Plagin silindikdə (fayllar silinməzdən əvvəl) | `{ name, version, manifest }` |

## Nümunələr

### Sorğu Jurnalı

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Tezlik Məhdudlaşdırıcısı

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 dəqiqə
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({ error: "Tezlik limiti aşılıb", status: 429 });
    }
  },
});
```

### Cavab Transformatoru

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
