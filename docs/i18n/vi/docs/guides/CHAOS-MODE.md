# Chaos Mode (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Bảng điều khiển:** **Chaos Mode** (thanh bên) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (phiên bảng điều khiển) · `POST /api/skills/collect/chaos` (khóa API)  
> **Mã nguồn:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode gửi **một tác vụ đến nhiều nhà cung cấp cùng lúc** — mỗi nhà cung cấp tham gia
đóng góp một phiên bản mô hình và bạn nhận được tất cả câu trả lời đặt cạnh nhau (hoặc theo chuỗi). Đây là
một bề mặt thực thi đa mô hình, không phải chiến lược định tuyến: lưu lượng `/v1/chat/completions`
thông thường của bạn không bao giờ bị ảnh hưởng.

**Phân biệt — có ba tính năng khác nhau chứa "chaos" trong tên:**

| Thành phần           | Nội dung                                                                                                                                    | Tài liệu                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | Trang bảng điều khiển + API được mô tả tại đây: phân phối một tác vụ đến nhiều nhà cung cấp (song song hoặc cộng tác).                      | Hướng dẫn này                                |
| `auto/chaos`         | Một id mô hình Auto-Combo có trọng số chấm điểm chèn lỗi, dùng để kiểm thử khả năng phục hồi. Không cần cấu hình.                           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Cấu hình combo Chaos | Một combo được lưu trữ với `config.chaos.enabled`, phân phối tác vụ đến một nhóm mô hình cùng một mô hình giám khảo tùy chọn (chỉ qua API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Thiết lập

1. Mở **Bảng điều khiển → Chaos Mode** (`/dashboard/chaos`).
2. **Bật** tính năng này — Chaos Mode được cung cấp ở trạng thái **tắt theo mặc định** (`enabled: false` trong
   `src/lib/chaos/chaosConfig.ts`). Khi bị tắt, `POST /api/chaos/run` trả về
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Chọn các thành phần tham gia và giá trị mặc định (được lưu riêng cho từng phiên bản thông qua kho cài đặt):

   | Trường              | Ý nghĩa                                                                                  | Mặc định / giới hạn                                 |
   | ------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------- |
   | `enabled`           | Công tắc chính                                                                           | `false`                                             |
   | `defaultMode`       | `parallel` hoặc `collaborative` (xem bên dưới)                                           | `parallel`                                          |
   | `providerOverrides` | Trạng thái tham gia theo từng nhà cung cấp (`providerId`, `modelId` tùy chọn, `enabled`) | trống = mọi nhà cung cấp đang hoạt động, tối đa 200 |
   | `systemPrompt`      | Giá trị ghi đè cho lời nhắc hệ thống Chaos tích hợp sẵn                                  | tùy chọn, tối đa 10 000 ký tự                       |
   | `timeoutMs`         | Thời gian tối đa cho mỗi lần gọi mô hình                                                 | `120000` (5 000–600 000)                            |
   | `maxTokens`         | `max_tokens` cho mỗi lần gọi mô hình                                                     | `4096` (256–128 000)                                |

4. Chạy **kiểm thử ngay trên trang** — bảng kết quả hiển thị câu trả lời,
   trạng thái và thời lượng của từng nhà cung cấp.

## Chế độ thực thi

- **`parallel`** — mọi mô hình nhận cùng một tác vụ đồng thời; bạn nhận được tất cả câu trả lời
  một cách độc lập.
- **`collaborative`** — các mô hình chạy **theo chuỗi**: mỗi mô hình nhìn thấy đầu ra của mô hình trước đó và
  được yêu cầu tinh chỉnh, mở rộng, phản biện hoặc đưa ra phương án thay thế. Trường `summary` của phản hồi
  nối các đầu ra thành công theo thứ tự chuỗi (các lần chạy song song không có `summary`).

## API

### `POST /api/chaos/run` — phiên bảng điều khiển

Được xác thực bằng cookie (phiên quản lý — xem
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); được trang bảng điều khiển sử dụng.

```jsonc
// nội dung yêu cầu
{
  "task": "Compare approaches to X", // bắt buộc
  "providers": ["glm", "kimi"], // bộ lọc tùy chọn
  "mode": "parallel", // tùy chọn — ghi đè defaultMode
  "systemPrompt": "…", // giá trị ghi đè tùy chọn
  "maxTokens": 4096, // giá trị ghi đè tùy chọn
}
```

### `POST /api/skills/collect/chaos` — khóa API

Biến thể sử dụng bearer token dành cho trình gọi bên ngoài. Khóa phải có **quyền Chaos Mode**
(`chaosModeEnabled`), vốn **bị tắt theo mặc định** — bật quyền này cho từng khóa tại
**Bảng điều khiển → Trình quản lý API → chỉnh sửa khóa → quyền → Chaos Mode**. Nội dung yêu cầu giống như trên.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Cả hai endpoint đều trả về cùng một cấu trúc:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // chỉ dành cho chế độ cộng tác
}
```

## Khắc phục sự cố

- **`400 Chaos Mode is not enabled`** — xem bước 2 ở trên: công tắc toàn cục đang tắt.
- **Khóa API bị từ chối trên `/api/skills/collect/chaos`** — khóa thiếu quyền
  `chaosModeEnabled` dành riêng cho từng khóa (bị tắt theo mặc định; đây là một cài đặt, không phải lỗi).
- **Một nhà cung cấp mà bạn mong đợi không xuất hiện trong kết quả** — hãy kiểm tra `providerOverrides` trên
  trang Chaos Mode (một giá trị ghi đè bị tắt sẽ loại trừ nhà cung cấp đó) và kiểm tra xem kết nối với nhà cung cấp có
  đang hoạt động hay không.
