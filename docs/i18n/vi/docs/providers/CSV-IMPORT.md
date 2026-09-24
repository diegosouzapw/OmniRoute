# Import providers from a CSV or JSON file (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **Import from file** tạo các kết nối bằng khóa API từ danh sách CSV hoặc JSON. Mỗi hàng có thể nhắm đến một nhà cung cấp khác nhau. Lỗi một phần là hành vi được cam kết: các hàng hợp lệ vẫn được nhập khi những hàng khác gặp lỗi, và cửa sổ bật lên sẽ liệt kê lý do các hàng lỗi bị từ chối.

Thao tác nhập này **không** tạo các node endpoint mới tương thích với OpenAI/Anthropic. Hãy tạo chúng trước (Dashboard → Providers → Add OpenAI-Compatible hoặc `omniroute nodes add`), sau đó nhập các hàng có cột `provider` là id của node đó. `baseUrl` của từng hàng vẫn có thể ghi đè URL của node.

## CSV (theo vị trí)

Tên cột chỉ mang tính hình thức. Trình phân tích cú pháp tách từng hàng và phân rã theo chỉ mục:

| Chỉ mục | Trường     | Bắt buộc | Ghi chú                                                                                                                                       |
| ------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 0       | `provider` | có       | id của nhà cung cấp được quản lý hiện có (`openai`, `anthropic`, …) **hoặc** id của **node** tương thích với OpenAI/Anthropic đã được đăng ký |
| 1       | `name`     | có       | Tên hiển thị của kết nối                                                                                                                      |
| 2       | `apiKey`   | có       | Khóa API                                                                                                                                      |
| 3       | `baseUrl`  | không    | URL ghi đè cho từng hàng                                                                                                                      |
| 4       | `priority` | không    | Số nguyên từ 1–100                                                                                                                            |

Dòng đầu tiên có cột đầu tiên là từ `provider` theo đúng nghĩa đen (không phân biệt chữ hoa/chữ thường) sẽ được bỏ qua vì được xem là tiêu đề. Các dòng trống và chú thích bắt đầu bằng `#` sẽ được bỏ qua.

Tải xuống tệp khởi đầu từ cửa sổ nhập (**Download CSV template**). Ví dụ:

```csv
# Nhập nhà cung cấp OmniRoute (các cột theo vị trí)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Một id tự đặt như `openai-compatible-chat-001` không phải là node. API trả về `Unknown or unsupported provider` cho hàng đó; cửa sổ bật lên hiển thị thông báo này bên cạnh tên hàng.

## JSON

Một mảng JSON gồm các đối tượng có cùng các trường (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). Không giống CSV, các khóa JSON được đặt tên.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
