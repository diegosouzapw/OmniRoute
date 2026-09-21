# OmniRoute Plugin SDK (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_SDK.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_SDK.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_SDK.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_SDK.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_SDK.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_SDK.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_SDK.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_SDK.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_SDK.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_SDK.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_SDK.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_SDK.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_SDK.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_SDK.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_SDK.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_SDK.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_SDK.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_SDK.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_SDK.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_SDK.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_SDK.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_SDK.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_SDK.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_SDK.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_SDK.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_SDK.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_SDK.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_SDK.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_SDK.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_SDK.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_SDK.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_SDK.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_SDK.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_SDK.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_SDK.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_SDK.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_SDK.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_SDK.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_SDK.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_SDK.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_SDK.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_SDK.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_SDK.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_SDK.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_SDK.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_SDK.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_SDK.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_SDK.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_SDK.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_SDK.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_SDK.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_SDK.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_SDK.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_SDK.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_SDK.md)

---

## Bắt đầu nhanh

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

## Tham chiếu API

### `definePlugin(def: PluginDefinition): Plugin`

Hàm factory tạo một đối tượng Plugin với các giá trị mặc định.

**Tham số:**

- `name` (string, bắt buộc) — Tên plugin ở định dạng kebab-case
- `priority` (number, tùy chọn, mặc định: 100) — Giá trị thấp hơn sẽ chạy trước
- `enabled` (boolean, tùy chọn, mặc định: true) — Có bật khi khởi động không?
- `onRequest` (function, tùy chọn) — Chạy trước trình xử lý chat
- `onResponse` (function, tùy chọn) — Chạy sau trình xử lý chat
- `onError` (function, tùy chọn) — Chạy khi trình xử lý gặp lỗi

### `blockRequest(response?): BlockingHookResult`

Chặn yêu cầu và tùy chọn trả về một phản hồi tùy chỉnh.

```ts
onRequest: (ctx) => {
  if (!ctx.headers["authorization"]) {
    return blockRequest({ error: "Unauthorized", status: 401 });
  }
};
```

### `modifyBody(body): PluginResult`

Sửa đổi phần thân yêu cầu trước khi yêu cầu được chuyển đến nhà cung cấp.

```ts
onRequest: (ctx) => {
  return modifyBody({ ...ctx.body, temperature: 0.7 });
};
```

### `addMetadata(metadata): PluginResult`

Đính kèm siêu dữ liệu vào ngữ cảnh yêu cầu.

```ts
onRequest: (ctx) => {
  return addMetadata({ source: "my-plugin", version: "1.0.0" });
};
```

## Ngữ cảnh plugin (`PluginContext`)

| Trường      | Kiểu                      | Mô tả                         |
| ----------- | ------------------------- | ----------------------------- |
| `requestId` | `string`                  | Mã định danh yêu cầu duy nhất |
| `model`     | `string`                  | Tên mô hình được yêu cầu      |
| `provider`  | `string`                  | ID nhà cung cấp đích          |
| `body`      | `Record<string, unknown>` | Phần thân yêu cầu             |
| `headers`   | `Record<string, string>`  | Các tiêu đề yêu cầu           |
| `metadata`  | `Record<string, unknown>` | Siêu dữ liệu có thể thay đổi  |
| `timestamp` | `number`                  | Dấu thời gian của yêu cầu     |

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

### Độ ưu tiên của hook

Các hook có thể được cấu hình với độ ưu tiên (thấp hơn = chạy trước):

```json
{
  "hooks": {
    "onRequest": { "enabled": true, "priority": 10 },
    "onResponse": { "enabled": true, "priority": 100 }
  }
}
```

Hoặc dưới dạng các giá trị boolean đơn giản (độ ưu tiên mặc định là 100):

```json
{
  "hooks": {
    "onRequest": true,
    "onResponse": true
  }
}
```

## Hệ thống quyền

Các plugin chạy trong ngữ cảnh máy ảo được cô lập. Việc truy cập tài nguyên bên ngoài yêu cầu các quyền rõ ràng:

| Quyền        | Cấp quyền                                                    |
| ------------ | ------------------------------------------------------------ |
| `network`    | `fetch`, `AbortController`, `Headers`, `Request`, `Response` |
| `file-read`  | `fs.readFile`, `fs.readdir`, `fs.stat`                       |
| `file-write` | `fs.writeFile`, `fs.mkdir`, `fs.rm`                          |
| `env`        | Proxy `process.env` chỉ đọc                                  |
| `exec`       | `child_process.exec`, `child_process.execSync`               |

Nếu không có quyền, các biến toàn cục tương ứng đơn giản là không khả dụng trong sandbox.

## Lược đồ cấu hình

Định nghĩa các thiết lập có thể cấu hình trong `configSchema`:

```json
{
  "configSchema": {
    "apiKey": { "type": "string", "description": "Khóa API bên ngoài" },
    "maxRetries": { "type": "number", "min": 1, "max": 10, "default": 3 },
    "debug": { "type": "boolean", "default": false },
    "mode": { "type": "string", "enum": ["fast", "slow"], "default": "fast" }
  }
}
```

Các kiểu trường: `string`, `number`, `boolean`, `select`

Các tùy chọn trường: `default`, `min`, `max`, `enum`, `description`

Các giá trị cấu hình được lưu trữ trong cơ sở dữ liệu và có thể truy cập thông qua trang cấu hình của bảng điều khiển.

## Các sự kiện tích hợp sẵn

| Sự kiện           | Khi nào                                    | Payload                       |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `onRequest`       | Trước trình xử lý trò chuyện               | Ngữ cảnh yêu cầu              |
| `onResponse`      | Sau trình xử lý trò chuyện                 | Dữ liệu phản hồi              |
| `onError`         | Khi trình xử lý gặp lỗi                    | Đối tượng lỗi                 |
| `onModelSelect`   | Mô hình được chọn để định tuyến            | Thông tin mô hình             |
| `onComboResolve`  | Định tuyến kết hợp được phân giải          | Các đích kết hợp              |
| `onRateLimit`     | Đạt giới hạn tốc độ                        | Thông tin giới hạn            |
| `onQuotaExhaust`  | Hạn ngạch đã cạn                           | Thông tin hạn ngạch           |
| `onProviderError` | Nhà cung cấp trả về lỗi                    | Chi tiết lỗi                  |
| `onStreamStart`   | Luồng SSE bắt đầu                          | Thông tin luồng               |
| `onStreamEnd`     | Luồng SSE kết thúc                         | Thống kê luồng                |
| `onInstall`       | Plugin được cài đặt                        | `{ name, version, manifest }` |
| `onActivate`      | Plugin được kích hoạt                      | `{ name, version, manifest }` |
| `onDeactivate`    | Plugin bị vô hiệu hóa                      | `{ name, version, manifest }` |
| `onUninstall`     | Plugin được gỡ cài đặt (trước khi xóa tệp) | `{ name, version, manifest }` |

## Ví dụ

### Trình ghi nhật ký yêu cầu

```ts
import { definePlugin } from "omniroute/plugins/sdk";

export default definePlugin({
  name: "request-logger",
  onRequest: async (ctx) => {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.model} -> ${ctx.provider}`);
  },
});
```

### Trình giới hạn tốc độ

```ts
import { definePlugin, blockRequest } from "omniroute/plugins/sdk";

const requests = new Map<string, number[]>();

export default definePlugin({
  name: "rate-limiter",
  priority: 10,
  onRequest: async (ctx) => {
    const key = ctx.headers["x-api-key"] || "anonymous";
    const now = Date.now();
    const window = 60000; // 1 phút
    const maxRequests = 100;

    const timestamps = (requests.get(key) || []).filter((t) => t > now - window);
    timestamps.push(now);
    requests.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return blockRequest({
        error: "Đã vượt quá giới hạn tốc độ",
        status: 429,
      });
    }
  },
});
```

### Trình chuyển đổi phản hồi

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
