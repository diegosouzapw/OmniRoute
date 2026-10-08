# OmniRoute Plugin SDK (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## เริ่มต้นใช้งานอย่างรวดเร็ว

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

## เอกสารอ้างอิง API

### `definePlugin(def: PluginDefinition): Plugin`

ฟังก์ชัน Factory ที่สร้างออบเจ็กต์ Plugin พร้อมค่าเริ่มต้น

**พารามิเตอร์:**

- `name` (string, จำเป็น) — ชื่อ Plugin ในรูปแบบ kebab-case
- `priority` (number, ไม่บังคับ, ค่าเริ่มต้น: 100) — ค่าที่ต่ำกว่าจะทำงานก่อน
- `enabled` (boolean, ไม่บังคับ, ค่าเริ่มต้น: true) — เปิดใช้งานตั้งแต่เริ่มต้นหรือไม่
- `onRequest` (function, ไม่บังคับ) — ทำงานก่อน chat handler
- `onResponse` (function, ไม่บังคับ) — ทำงานหลัง chat handler
- `onError` (function, ไม่บังคับ) — ทำงานเมื่อ handler เกิดข้อผิดพลาด

### `blockRequest(response?): BlockingHookResult`

บล็อกคำขอและส่งคืนการตอบกลับที่กำหนดเองได้ตามต้องการ

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

แก้ไขเนื้อหาคำขอก่อนที่จะส่งไปถึง provider

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

แนบ metadata เข้ากับบริบทของคำขอ

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## บริบทของ Plugin (`PluginContext`)

| ฟิลด์       | ชนิด                      | คำอธิบาย                 |
| ----------- | ------------------------- | ------------------------ |
| `requestId` | `string`                  | ตัวระบุคำขอที่ไม่ซ้ำกัน  |
| `model`     | `string`                  | ชื่อโมเดลที่ร้องขอ       |
| `provider`  | `string`                  | ID ของ provider เป้าหมาย |
| `body`      | `Record<string, unknown>` | เนื้อหาคำขอ              |
| `headers`   | `Record<string, string>`  | ส่วนหัวของคำขอ           |
| `metadata`  | `Record<string, unknown>` | metadata ที่แก้ไขได้     |
| `timestamp` | `number`                  | เวลาประทับของคำขอ        |

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

### ลำดับความสำคัญของ Hook

สามารถกำหนดลำดับความสำคัญให้ Hook ได้ (ค่าที่ต่ำกว่า = ทำงานก่อน):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

หรือกำหนดเป็นค่าบูลีนแบบง่าย (ลำดับความสำคัญเริ่มต้นคือ 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## ระบบสิทธิ์

ปลั๊กอินทำงานในบริบท VM แบบแซนด์บ็อกซ์ การเข้าถึงทรัพยากรภายนอกต้องได้รับสิทธิ์อย่างชัดเจน:

| สิทธิ์       | อนุญาตให้ใช้                                                 |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | พร็อกซี `process.env` แบบอ่านอย่างเดียว                      |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

หากไม่มีสิทธิ์ โกลบอลที่เกี่ยวข้องจะไม่สามารถใช้งานได้ในแซนด์บ็อกซ์

## สคีมาการกำหนดค่า

กำหนดการตั้งค่าที่ปรับแต่งได้ใน `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "คีย์ API ภายนอก" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

ประเภทฟิลด์: `string`, `number`, `boolean`, `select`

ตัวเลือกฟิลด์: `default`, `min`, `max`, `enum`, `description`

ค่าการกำหนดค่าจะถูกจัดเก็บอย่างถาวรในฐานข้อมูลและสามารถเข้าถึงได้ผ่านหน้าการกำหนดค่าของแดชบอร์ด

## อีเวนต์ในตัว

| อีเวนต์           | เกิดขึ้นเมื่อ                          | เพย์โหลด                      |
| ----------------- | -------------------------------------- | ----------------------------- |
| `onRequest`       | ก่อนตัวจัดการแชต                       | บริบทคำขอ                     |
| `onResponse`      | หลังตัวจัดการแชต                       | ข้อมูลการตอบกลับ              |
| `onError`         | เมื่อตัวจัดการเกิดข้อผิดพลาด           | ออบเจ็กต์ข้อผิดพลาด           |
| `onModelSelect`   | เลือกโมเดลสำหรับการกำหนดเส้นทางแล้ว    | ข้อมูลโมเดล                   |
| `onComboResolve`  | ระบุการกำหนดเส้นทางแบบคอมโบแล้ว        | เป้าหมายคอมโบ                 |
| `onRateLimit`     | ถึงขีดจำกัดอัตราการใช้งาน              | ข้อมูลขีดจำกัด                |
| `onQuotaExhaust`  | โควตาหมด                               | ข้อมูลโควตา                   |
| `onProviderError` | ผู้ให้บริการส่งคืนข้อผิดพลาด           | รายละเอียดข้อผิดพลาด          |
| `onStreamStart`   | สตรีม SSE เริ่มต้น                     | ข้อมูลสตรีม                   |
| `onStreamEnd`     | สตรีม SSE สิ้นสุด                      | สถิติสตรีม                    |
| `onInstall`       | ติดตั้งปลั๊กอินแล้ว                    | `{ name, version, manifest }` |
| `onActivate`      | เปิดใช้งานปลั๊กอินแล้ว                 | `{ name, version, manifest }` |
| `onDeactivate`    | ปิดใช้งานปลั๊กอินแล้ว                  | `{ name, version, manifest }` |
| `onUninstall`     | ถอนการติดตั้งปลั๊กอินแล้ว (ก่อนลบไฟล์) | `{ name, version, manifest }` |

## ตัวอย่าง

### ตัวบันทึกคำขอ

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### ตัวจำกัดอัตราการใช้งาน

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 นาที
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

### ตัวแปลงการตอบกลับ

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
