# OmniRoute CLI Plugin System (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGINS.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGINS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGINS.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGINS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGINS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGINS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGINS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGINS.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGINS.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGINS.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGINS.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGINS.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGINS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGINS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGINS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGINS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGINS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGINS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGINS.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGINS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGINS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGINS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGINS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGINS.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGINS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGINS.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGINS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGINS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGINS.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGINS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGINS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGINS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGINS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGINS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGINS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGINS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGINS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGINS.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGINS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGINS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGINS.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGINS.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGINS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGINS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGINS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGINS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGINS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGINS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGINS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGINS.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGINS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGINS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGINS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGINS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGINS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGINS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGINS.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGINS.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGINS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGINS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGINS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGINS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGINS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGINS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGINS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGINS.md)

---

Mở rộng CLI `omniroute` mà không cần sửa đổi phần lõi. Các plugin tuân theo quy ước đặt tên `omniroute-cmd-*`, tương tự như `gh extension` hoặc `kubectl plugin`.

## Bắt đầu nhanh

```bash
# Cài đặt plugin từ npm
omniroute plugin install stripe

# Cài đặt plugin cục bộ đang được phát triển
omniroute plugin install ./my-plugin

# Liệt kê các plugin đã cài đặt
omniroute plugin list

# Tạo khung cho plugin mới
omniroute plugin scaffold myplugin
cd omniroute-cmd-myplugin
omniroute plugin install .
```

## Cấu trúc plugin

Plugin là một gói npm có tên `omniroute-cmd-<name>` (hoặc `@scope/omniroute-cmd-<name>`).

```
omniroute-cmd-myplugin/
├── package.json     # phải có "type": "module" và "main": "index.mjs"
├── index.mjs        # xuất register(program, ctx) + meta tùy chọn
└── README.md
```

### `package.json`

```json
{
  "name": "omniroute-cmd-myplugin",
  "version": "0.1.0",
  "type": "module",
  "main": "index.mjs",
  "engines": { "omniroute": ">=4.0.0" },
  "keywords": ["omniroute-plugin", "omniroute-cmd"]
}
```

### `index.mjs`

```js
export const meta = {
  name: "myplugin",
  version: "0.1.0",
  description: "Plugin của tôi dành cho OmniRoute",
  omnirouteApi: ">=4.0.0",
};

export function register(program, ctx) {
  program
    .command("myplugin")
    .description(meta.description)
    .option("-n, --name <name>")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      const res = await ctx.apiFetch("/api/combos", {
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = await res.json();
      ctx.emit(data, gOpts);
    });
}
```

## API ngữ cảnh plugin

Đối tượng `ctx` được truyền vào `register(program, ctx)`:

| Thuộc tính                   | Kiểu             | Mô tả                                                          |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `ctx.apiFetch(path, opts)`   | `async function` | Thực hiện yêu cầu fetch đã xác thực đến máy chủ OmniRoute      |
| `ctx.emit(data, opts)`       | `function`       | Xuất dữ liệu dưới dạng table/json/jsonl/csv theo cờ `--output` |
| `ctx.t(key)`                 | `async function` | Tra cứu bản dịch i18n                                          |
| `ctx.withSpinner(label, fn)` | `async function` | Bao bọc hàm async bằng chỉ báo tiến trình ora                  |
| `ctx.baseUrl`                | `string`         | URL cơ sở đã được phân giải                                    |
| `ctx.apiKey`                 | `string \| null` | Khóa API nếu được cung cấp                                     |

## Khám phá

Các plugin được tìm thấy từ:

1. `~/.omniroute/plugins/<name>/` — các bản cài đặt cục bộ của người dùng
2. Biến môi trường `OMNIROUTE_PLUGIN_PATH` — thư mục tùy chỉnh

Cả hai đều **chỉ dành cho CLI**. Môi trường chạy plugin phía máy chủ (các plugin marketplace/`plugin.json`
chạy bên trong proxy) có trình quét riêng với thiết lập ghi đè riêng,
`OMNIROUTE_PLUGINS_DIR` — xem
[PLUGIN_MARKETPLACE.md → Thư mục plugin](./PLUGIN_MARKETPLACE.md#plugin-directory).
Việc thiết lập một biến không ảnh hưởng đến biến còn lại.

Các lỗi khi tải được bắt và hiển thị dưới dạng cảnh báo — một plugin bị lỗi sẽ không bao giờ làm CLI gặp sự cố.

## Bảo mật

Các plugin chạy với cùng đặc quyền tiến trình Node.js như `omniroute`. Chỉ cài đặt plugin từ những nguồn mà bạn tin cậy. `omniroute plugin install` hiển thị cảnh báo rõ ràng và yêu cầu `--yes` hoặc xác nhận tương tác.

## Phát hành

1. Đảm bảo `package.json` có `"keywords": ["omniroute-plugin"]`
2. Chạy `npm publish` như bình thường
3. Người dùng có thể tìm kiếm bằng `omniroute plugin search <query>` (tìm kiếm trong npm registry)

## Plugin mẫu

Xem [`examples/omniroute-cmd-hello/`](../../examples/omniroute-cmd-hello/index.mjs) để tham khảo ví dụ hoạt động tối giản có `meta` + `register()`.
