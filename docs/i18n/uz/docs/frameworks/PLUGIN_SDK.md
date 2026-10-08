# OmniRoute Plugin SDK (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Tezkor boshlash

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

## API maʼlumotnomasi

### `definePlugin(def: PluginDefinition): Plugin`

Standart qiymatlar bilan Plugin obyektini yaratadigan fabrika funksiyasi.

**Parametrlar:**

- `name` (string, majburiy) — kebab-case formatidagi plagin nomi
- `priority` (number, ixtiyoriy, standart: 100) — Qiymati pastroq bo‘lgan avval ishga tushadi
- `enabled` (boolean, ixtiyoriy, standart: true) — Yoqilgan holda ishga tushirilsinmi?
- `onRequest` (function, ixtiyoriy) — Chat ishlov beruvchisidan oldin ishga tushadi
- `onResponse` (function, ixtiyoriy) — Chat ishlov beruvchisidan keyin ishga tushadi
- `onError` (function, ixtiyoriy) — Ishlov beruvchi xatoligida ishga tushadi

### `blockRequest(response?): BlockingHookResult`

So‘rovni bloklash va ixtiyoriy ravishda maxsus javob qaytarish.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

So‘rov provayderga yetib borishidan oldin uning tanasini o‘zgartirish.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

So‘rov kontekstiga metamaʼlumotlarni biriktirish.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Plagin konteksti (`PluginContext`)

| Maydon      | Tur                       | Tavsif                            |
| ----------- | ------------------------- | --------------------------------- |
| `requestId` | `string`                  | Noyob so‘rov identifikatori       |
| `model`     | `string`                  | So‘ralgan model nomi              |
| `provider`  | `string`                  | Maqsadli provayder IDsi           |
| `body`      | `Record<string, unknown>` | So‘rov tanasi                     |
| `headers`   | `Record<string, string>`  | So‘rov sarlavhalari               |
| `metadata`  | `Record<string, unknown>` | O‘zgartiriladigan metamaʼlumotlar |
| `timestamp` | `number`                  | So‘rov vaqt tamg‘asi              |

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

### Huk ustuvorligi

Huklarni ustuvorlik bilan sozlash mumkin (pastroq qiymat = avval ishga tushadi):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Yoki oddiy mantiqiy qiymatlar sifatida (standart ustuvorlik 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Ruxsatlar tizimi

Plaginlar izolyatsiyalangan VM kontekstida ishlaydi. Tashqi resurslarga kirish uchun aniq ruxsatlar talab qilinadi:

| Ruxsat       | Taqdim etiladigan imkoniyatlar                               |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Faqat o‘qish uchun `process.env` proksisi                    |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Ruxsat bo‘lmasa, tegishli global obyektlar sinov muhitida mavjud bo‘lmaydi.

## Konfiguratsiya sxemasi

Sozlanadigan parametrlarni `configSchema` ichida belgilang:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Tashqi API kaliti" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Maydon turlari: `string`, `number`, `boolean`, `select`

Maydon parametrlari: `default`, `min`, `max`, `enum`, `description`

Konfiguratsiya qiymatlari ma’lumotlar bazasida saqlanadi va boshqaruv panelidagi konfiguratsiya sahifasi orqali foydalanish mumkin.

## Ichki hodisalar

| Hodisa            | Qachon                                               | Foydali yuk                   |
| ----------------- | ---------------------------------------------------- | ----------------------------- |
| `onRequest`       | Chat ishlov beruvchisidan oldin                      | So‘rov konteksti              |
| `onResponse`      | Chat ishlov beruvchisidan keyin                      | Javob ma’lumotlari            |
| `onError`         | Ishlov beruvchi xatosi yuz berganda                  | Xato obyekti                  |
| `onModelSelect`   | Yo‘naltirish uchun model tanlanganda                 | Model ma’lumotlari            |
| `onComboResolve`  | Kombinatsion yo‘naltirish aniqlanganda               | Kombinatsiya maqsadlari       |
| `onRateLimit`     | Tezlik chegarasiga yetilganda                        | Cheklov ma’lumotlari          |
| `onQuotaExhaust`  | Kvota tugaganda                                      | Kvota ma’lumotlari            |
| `onProviderError` | Provayder xato qaytarganda                           | Xato tafsilotlari             |
| `onStreamStart`   | SSE oqimi boshlanganda                               | Oqim ma’lumotlari             |
| `onStreamEnd`     | SSE oqimi tugaganda                                  | Oqim statistikasi             |
| `onInstall`       | Plagin o‘rnatilganda                                 | `{ name, version, manifest }` |
| `onActivate`      | Plagin faollashtirilganda                            | `{ name, version, manifest }` |
| `onDeactivate`    | Plagin faolsizlantirilganda                          | `{ name, version, manifest }` |
| `onUninstall`     | Plagin o‘chirilganda (fayllar o‘chirilishidan oldin) | `{ name, version, manifest }` |

## Misollar

### So‘rovlarni jurnalga yozish

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Tezlik cheklovchisi

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 daqiqa
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({
        error: "Tezlik chegarasidan oshib ketildi",
        status: 429,
      });
    }
  },
});
```

### Javobni o‘zgartiruvchi

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
