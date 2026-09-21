# OmniRoute MCP Server Documentation (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Máy chủ Model Context Protocol với 110 công cụ cho các thao tác định tuyến, bộ nhớ đệm, nén, bộ nhớ, kỹ năng, proxy, pool, Radar và nguồn ngữ cảnh.
>
> Nguồn chuẩn: `open-sse/mcp-server/server.ts` tính toán **110 công cụ duy nhất** bằng `countUniqueMcpTools()`: 45 định nghĩa chính thức (bao gồm sáu công cụ vòng đời CCR, bộ ba kỹ năng tác nhân, `omniroute_radar_catalog` và `omniroute_x_search`), cùng với bộ nhớ (3), kỹ năng (4), kỹ năng GitHub (3), pool (6), trò chơi hóa (8), plugin (8), Notion (6), Obsidian (22), kho dữ liệu cục bộ (3) và hai công cụ nén chỉ dành cho RTK.

## Cài đặt

OmniRoute MCP được tích hợp sẵn. Khởi động bằng:

```bash
omniroute --mcp
```

Hoặc thông qua transport open-sse:

```bash
# Transport HTTP có khả năng truyền luồng (cổng 20130)
omniroute --dev  # MCP tự động khởi động tại endpoint /mcp
```

Các transport HTTP (`sse` / `streamable-http`, được máy chủ dashboard phục vụ trong cùng tiến trình) mặc định bị tắt và trước đây chỉ có thể bật/tắt từ trang `/dashboard/mcp`. Kể từ v3.8.51, CLI có chức năng tương đương:

```bash
omniroute mcp status                                  # trạng thái bật/trực tuyến, transport, số lượng công cụ
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # đặt lại các phiên sse/streamable-http đang hoạt động
```

`mcp enable`/`mcp disable` gửi yêu cầu PATCH đến cùng thiết lập `mcpEnabled` (và tùy chọn `mcpTransport`) mà dashboard bật/tắt thông qua `/api/settings`. `mcp restart` gọi `POST /api/mcp/restart`: thao tác này đóng các phiên `sse`/`streamable-http` đang hoạt động để yêu cầu tiếp theo khởi tạo lại sạch sẽ, trả về `409` nếu MCP bị tắt và `501` đối với transport `stdio` (các máy khách stdio tự quản lý tiến trình con của chúng — không có handle trong tiến trình để khởi động lại).

## Transport

Máy chủ MCP cung cấp ba transport, tất cả đều được hỗ trợ bởi cùng factory `createMcpServer()`:

| Transport         | Vị trí                                      | Khi nào nên sử dụng                               |
| :---------------- | :------------------------------------------ | :------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Tích hợp IDE (Claude Desktop, Cursor, v.v.)       |
| `sse`             | `POST/GET /api/mcp/sse` qua `httpTransport` | Máy khách trình duyệt/tác nhân cần luồng sự kiện  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Máy khách HTTP đa phiên (header `mcp-session-id`) |

Transport HTTP đang hoạt động (`sse` hoặc `streamable-http`) được chọn bằng thiết lập `mcpTransport`. Việc chuyển đổi transport sẽ đóng các phiên hiện có trên transport còn lại.

### Truy cập từ xa (bỏ qua phạm vi quản lý)

`/api/mcp/*` thuộc tầng LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — theo mặc định, chỉ các máy chủ loopback (`localhost`, `127.0.0.1`, `::1`) mới có thể truy cập. Kể từ v3.8.2, các máy khách không phải loopback có thể kết nối nếu cung cấp `Authorization: Bearer <api-key>` với khóa có phạm vi `manage`. Đây là cách duy nhất để truy cập máy chủ MCP từ xa thông qua tunnel, reverse proxy hoặc tên máy chủ công khai.

```bash
# Cấp phạm vi manage: mở trang API Keys của dashboard và bật
# "Management Access" cho khóa, hoặc gửi POST với scopes:["manage"] khi tạo.

# Sau đó kết nối từ một máy khách MCP từ xa:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Khóa không có phạm vi `manage` (hoặc không có Bearer) sẽ trả về `403 LOCAL_ONLY`. Tiền tố liên quan `/api/cli-tools/runtime/*` được chủ ý thiết kế để KHÔNG thể bỏ qua — xem [Các tầng Route Guard — ngoại lệ cho phạm vi quản lý](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Cấu hình IDE

Xem [Cấu hình máy khách MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) để thiết lập Claude Desktop,
Cursor, Cline và các máy khách MCP tương thích.

---

## Công cụ thiết yếu (14) — Giai đoạn 1

| Công cụ                         | Phạm vi               | Mô tả                                                                                                                                          |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Thời gian hoạt động, bộ nhớ, bộ ngắt mạch, giới hạn tốc độ, số liệu thống kê bộ nhớ đệm                                                        |
| `omniroute_list_combos`         | `read:combos`         | Tất cả combo đã cấu hình cùng với chiến lược (có thể kèm số liệu)                                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Số liệu hiệu suất cho một combo cụ thể                                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | Kích hoạt hoặc vô hiệu hóa một combo                                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | Tạo combo đã được xác thực thông qua API combo hiện có                                                                                         |
| `omniroute_check_quota`         | `read:quota`          | Hạn ngạch đã dùng/tổng cộng, phần trăm còn lại, thời gian đặt lại, trạng thái token                                                            |
| `omniroute_route_request`       | `execute:completions` | Gửi yêu cầu hoàn thành hội thoại thông qua cơ chế định tuyến OmniRoute                                                                         |
| `omniroute_cost_report`         | `read:usage`          | Báo cáo chi phí theo kỳ (phiên/ngày/tuần/tháng)                                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Danh mục mô hình đầy đủ cùng với khả năng, trạng thái và giá                                                                                   |
| `omniroute_radar_catalog`       | `read:radar`          | Danh mục Radar cục bộ đã ký; hỗ trợ bộ lọc tùy chọn theo nhà cung cấp/họ mô hình                                                               |
| `omniroute_tool_search`         | `read:tools`          | Khám phá các công cụ từ danh mục MCP đã đăng ký                                                                                                |
| `omniroute_web_search`          | `execute:search`      | Tìm kiếm web thông qua các nhà cung cấp dịch vụ tìm kiếm đã cấu hình. Không dành cho X/Twitter.                                                |
| `omniroute_x_search`            | `execute:search`      | Tìm kiếm trên X thông qua xAI/SuperGrok hoặc chọn `xquik-search` để nhận kết quả từ Xquik API. Yêu cầu thông tin xác thực cho backend đã chọn. |
| `omniroute_web_fetch`           | `execute:search`      | Truy xuất nội dung web thông qua các nhà cung cấp dịch vụ truy xuất đã cấu hình                                                                |

## Công cụ nâng cao (11) — Giai đoạn 2

| Công cụ                            | Phạm vi                              | Mô tả                                                                                                     |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Mô phỏng định tuyến dạng dry-run với cây dự phòng                                                         |
| `omniroute_set_budget_guard`       | `write:budget`                       | Ngân sách phiên với hành động giảm cấp/chặn/cảnh báo                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Cập nhật chiến lược tổ hợp trong thời gian chạy (ưu tiên/có trọng số/tự động/v.v.)                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Áp dụng cấu hình sẵn về khả năng phục hồi `aggressive` / `balanced` / `conservative`                      |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Kiểm thử trực tiếp mọi nhà cung cấp trong một tổ hợp bằng lệnh gọi upstream thực tế                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Chỉ số theo từng nhà cung cấp, gồm độ trễ p50/p95/p99 và trạng thái bộ ngắt mạch                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Đề xuất tổ hợp theo loại tác vụ với các ràng buộc về ngân sách/độ trễ                                     |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Giải thích lý do yêu cầu được định tuyến đến một nhà cung cấp (các yếu tố chấm điểm + phương án dự phòng) |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Ảnh chụp đầy đủ của phiên: chi phí, token, mô hình/nhà cung cấp hàng đầu, lỗi, bộ bảo vệ ngân sách        |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Chẩn đoán (và tùy chọn tự động sửa chữa) sai lệch cơ sở dữ liệu như tham chiếu tổ hợp bị hỏng/hàng mồ côi |
| `omniroute_sync_pricing`           | `pricing:write`                      | Đồng bộ dữ liệu giá từ các nguồn bên ngoài (LiteLLM); hỗ trợ `dryRun`                                     |

## Công cụ bộ nhớ đệm (2)

| Công cụ                 | Phạm vi       | Mô tả                                                             |
| :---------------------- | :------------ | :---------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Số liệu thống kê về bộ nhớ đệm ngữ nghĩa, prompt và tính lũy đẳng |
| `omniroute_cache_flush` | `write:cache` | Xóa bộ nhớ đệm trên toàn cục hoặc theo chữ ký/mô hình             |

## Công cụ nén (13)

| Công cụ                             | Phạm vi             | Mô tả                                                                                                                                      |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Cài đặt nén, bản tóm tắt phân tích và số liệu thống kê có tính đến bộ nhớ đệm (bao gồm siêu dữ liệu `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Cấu hình chế độ nén, ngưỡng, tỷ lệ mục tiêu, bảo toàn system prompt và công tắc nén mô tả MCP                                              |
| `omniroute_set_compression_engine`  | `write:compression` | Chọn engine đang hoạt động (off/caveman/rtk/stacked) và cường độ Caveman/RTK                                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Liệt kê các tổ hợp nén có tên và pipeline engine của chúng                                                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Dữ liệu phân tích được nhóm theo tổ hợp nén và engine                                                                                      |
| `omniroute_ccr_store`               | `write:compression` | Lưu nội dung được cô lập theo bên gọi trong kho CCR giới hạn trong bộ nhớ và trả về một dấu mốc cùng tham chiếu `ccr://`                   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Truy xuất toàn bộ nội dung CCR hoặc bằng các chế độ head, tail, lines, grep và stats                                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | Kiểm tra siêu dữ liệu CCR thuộc sở hữu của bên gọi mà không trả về nội dung                                                                |
| `omniroute_ccr_list`                | `read:compression`  | Liệt kê siêu dữ liệu được phân trang cho các khối CCR thuộc sở hữu của bên gọi                                                             |
| `omniroute_ccr_delete`              | `write:compression` | Xóa một khối CCR thuộc sở hữu của bên gọi                                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Báo cáo mức sử dụng bộ nhớ theo phạm vi bên gọi, bộ đếm vòng đời và giới hạn kho                                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Phát hiện nhiễu lặp lại trong các mẫu đầu ra RTK được chủ động cho phép                                                                    |
| `omniroute_rtk_learn`               | `read:compression`  | Tạo bản nháp bộ lọc RTK có thể xem xét từ các mẫu được chủ động cho phép                                                                   |

Các mục CCR chỉ tồn tại trong bộ nhớ và sẽ biến mất khi khởi động lại. Mỗi khối được giới hạn ở 2 MiB, mỗi
principal ở 16 MiB và kho toàn cục ở 64 MiB. Theo mặc định, các mục có TTL là 24 giờ (tối đa
bảy ngày). Việc truy xuất toàn bộ qua MCP được giới hạn ở 256 KiB; các khối lớn hơn vẫn có thể được truy cập thông qua
chế độ theo phạm vi và grep. Việc lưu trữ, truy xuất, liệt kê, kiểm tra, xóa và thống kê được cô lập theo
principal của khóa API đã xác thực. Bản ghi kiểm tra chứa hàm băm và siêu dữ liệu kích thước, không bao giờ chứa nội dung.

`omniroute_compression_status` báo cáo riêng việc nén mô tả MCP trong
`analytics.mcpDescriptionCompression`. Các giá trị đó là ước tính kích thước siêu dữ liệu cho các mô tả
có thể liệt kê của MCP (`tools`, `prompts`, `resources` và `resourceTemplates`); chúng không phải là biên nhận mức sử dụng
của nhà cung cấp và được đánh dấu bằng `source: "mcp_metadata_estimate"`.

### Bộ lọc cây khả năng truy cập MCP (v3.8.0)

Tách biệt với các công cụ nén ở trên, OmniRoute bao gồm một bộ lọc hậu thực thi giúp
nén **kết quả công cụ** của các công cụ trình duyệt/khả năng truy cập MCP trước khi chúng được trả về cho
tác nhân. Bản thân bộ lọc này không phải là một công cụ — nó chạy minh bạch trên mọi kết quả công cụ có chứa
văn bản dài dòng về cây khả năng truy cập hoặc ảnh chụp nhanh trình duyệt (≥2000 ký tự).

Các hành vi chính:

- Thu gọn ≥30 dòng đồng cấp lặp lại liên tiếp thành bản tóm tắt phần đầu + phần cuối
- Giữ nguyên các neo `[ref=eXX]` mà Playwright/tính năng sử dụng máy tính yêu cầu
- Cắt ngắn bắt buộc văn bản quá khổ (>50.000 ký tự) kèm gợi ý điều hướng
- Mức tiết kiệm dự kiến: **60–80%** đối với tải trọng ảnh chụp nhanh trình duyệt

Cấu hình: `compression.mcpAccessibility` trong phần cài đặt chung (di chuyển 056).
Phần triển khai: `open-sse/services/compression/engines/mcpAccessibility/`.
Tài liệu đầy đủ: [Công cụ nén — Bộ lọc cây khả năng truy cập MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Xem [Công cụ nén](../compression/COMPRESSION_ENGINES.md) và [Nén RTK](../compression/RTK_COMPRESSION.md) để biết
mô hình nén thời gian chạy đằng sau các công cụ này.

## Công cụ 1Proxy (3)

| Công cụ                     | Phạm vi        | Mô tả                                                                                |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Tìm nạp proxy miễn phí từ chợ 1proxy (bộ lọc giao thức/quốc gia/chất lượng/giới hạn) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Lấy proxy khả dụng tiếp theo theo chiến lược (`random` / `quality` / `sequential`)   |
| `omniroute_oneproxy_stats`  | `read:proxies` | Số liệu thống kê nhóm proxy, trạng thái đồng bộ, phân bố theo giao thức và quốc gia  |

## Công cụ bộ nhớ (3)

Được định nghĩa trong `open-sse/mcp-server/tools/memoryTools.ts`. Việc xác thực/phạm vi được thực thi thông qua quy trình phạm vi MCP tiêu chuẩn.

| Công cụ                   | Phạm vi        | Mô tả                                                                                       |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Tìm kiếm bộ nhớ theo truy vấn / loại / khóa API, đồng thời áp dụng giới hạn ngân sách token |
| `omniroute_memory_add`    | `write:memory` | Thêm mục bộ nhớ mới (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | Xóa bộ nhớ cho một khóa API, có thể lọc theo loại hoặc dấu thời gian `olderThan`            |

## Công cụ kỹ năng (4)

Được định nghĩa trong `open-sse/mcp-server/tools/skillTools.ts`. Được hỗ trợ bởi `src/lib/skills/registry` + `src/lib/skills/executor`.

| Công cụ                       | Phạm vi          | Mô tả                                                                                   |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Liệt kê các kỹ năng đã đăng ký, có thể lọc theo khóa API, tên hoặc trạng thái kích hoạt |
| `omniroute_skills_enable`     | `write:skills`   | Bật hoặc tắt một kỹ năng cụ thể theo ID                                                 |
| `omniroute_skills_execute`    | `execute:skills` | Thực thi một kỹ năng với đầu vào được cung cấp và trả về bản ghi thực thi               |
| `omniroute_skills_executions` | `read:skills`    | Liệt kê lịch sử thực thi kỹ năng gần đây                                                |

## Nguồn ngữ cảnh Notion (6)

Được định nghĩa trong `open-sse/mcp-server/tools/notionTools.ts`. Token được lưu trữ trong bảng `key_value` thông qua `src/lib/db/notion.ts`. Máy khách REST nằm trong `src/lib/notion/api.ts`. API cài đặt nằm trong `src/app/api/settings/notion/route.ts`. Giao diện bảng điều khiển nằm trong `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Cấu hình token tích hợp Notion của bạn từ tab **Nguồn ngữ cảnh** trong bảng điều khiển Endpoint hoặc thông qua API REST:

```bash
# Đặt token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kiểm tra trạng thái
curl http://localhost:20128/api/settings/notion

# Ngắt kết nối
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Công cụ                      | Phạm vi        | Mô tả                                                                |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tìm kiếm toàn văn trên tất cả các trang và cơ sở dữ liệu             |
| `notion_get_page`            | `read:notion`  | Lấy một trang theo ID cùng với các thuộc tính của trang              |
| `notion_list_block_children` | `read:notion`  | Liệt kê các khối con của một trang hoặc khối                         |
| `notion_query_database`      | `read:notion`  | Truy vấn cơ sở dữ liệu với bộ lọc, sắp xếp và phân trang             |
| `notion_get_database`        | `read:notion`  | Lấy lược đồ cơ sở dữ liệu theo ID                                    |
| `notion_append_blocks`       | `write:notion` | Thêm các khối con vào một khối cha (tối đa 100 khối cho mỗi yêu cầu) |

## Công cụ Danh mục Kỹ năng Agent (3)

Được định nghĩa trong `open-sse/mcp-server/tools/agentSkillTools.ts`. Được hỗ trợ bởi `src/lib/agentSkills/catalog`. Các công cụ này cung cấp danh mục tài liệu gồm 45 Kỹ năng Agent cho các máy khách MCP và agent bên ngoài. Phạm vi: `read:catalog`.

| Công cụ                           | Phạm vi        | Mô tả                                                                                                                                                        |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Liệt kê tất cả 45 kỹ năng agent với các bộ lọc `category` (api\|cli) và `area` tùy chọn; trả về siêu dữ liệu + mức độ bao phủ                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Lấy toàn bộ siêu dữ liệu + nội dung SKILL.md cho một kỹ năng theo `id` chính tắc                                                                             |
| `omniroute_agent_skills_coverage` | `read:catalog` | Thống kê mức độ bao phủ: số lượng trong 23 kỹ năng API, 21 kỹ năng CLI và 1 kỹ năng cấu hình có tệp SKILL.md trên hệ thống tệp so với tổng số trong danh mục |

Xem [AGENT-SKILLS.md](./AGENT-SKILLS.md) để biết toàn bộ danh mục và cách các agent bên ngoài sử dụng danh mục này.

## Các Framework Liên quan (v3.8.0)

Danh mục công cụ MCP ở trên (110 công cụ duy nhất, được tính bởi `countUniqueMcpTools()`) được chủ ý
giới hạn trong các hoạt động định tuyến/bộ nhớ đệm/nén/bộ nhớ/kỹ năng/proxy/nguồn ngữ cảnh khi chạy. Hai
framework liền kề được cung cấp cùng máy chủ MCP trong v3.8.0 và được ghi lại riêng:

### Cloud Agents

Cloud Agents là các agent lập trình AI chạy ngoài tiến trình (codex-cloud, cursor-cloud, devin, jules), được kết nối với
OmniRoute thông qua cùng mô hình kết nối dùng cho các nhà cung cấp LLM. Chúng được cung cấp qua
bề mặt REST riêng (`/api/v1/agents/*`) và **không** thuộc danh mục công cụ MCP
— việc gọi một Cloud Agent không tiêu thụ phạm vi MCP.

- Triển khai: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Vòng đời: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Tài liệu: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails là các bộ lọc trước/sau khi thực thi (vision-bridge, pii-masker, prompt-injection)
được áp dụng bên trong quy trình trò chuyện. Chúng chạy trước khi yêu cầu đến lớp công cụ/định tuyến MCP
và phát ra các vi phạm có cấu trúc tới quy trình kiểm toán; chúng không được gọi như các công cụ MCP.

- Triển khai: `src/lib/guardrails/`.
- Tài liệu: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Khi gỡ lỗi một lệnh gọi MCP có vẻ bị chặn, hãy kiểm tra cả nhật ký kiểm toán MCP
(các mục `scope_denied:*`) và dấu vết kiểm toán của guardrails — một yêu cầu có thể bị
guardrail từ chối **trước khi** nó đến lớp thực thi phạm vi MCP.

---

## Các Điểm cuối REST API

| Điểm cuối              | Phương thức           | Mô tả                                                                                                    | Xác thực                      |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Trạng thái máy chủ: tín hiệu hoạt động, trạng thái giao vận HTTP, tóm tắt hoạt động kiểm toán            | Quản lý (phiên/quản trị viên) |
| `/api/mcp/tools`       | `GET`                 | Danh mục công cụ (tên, mô tả, phạm vi, giai đoạn, điểm cuối nguồn)                                       | Quản lý                       |
| `/api/mcp/sse`         | `GET` / `POST`        | Điểm cuối giao vận SSE (được kiểm soát bởi `mcpEnabled` + `mcpTransport === "sse"`)                      | Khóa API + phạm vi            |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Giao vận HTTP có thể phát luồng (sử dụng header `mcp-session-id`; `DELETE` kết thúc phiên)               | Khóa API + phạm vi            |
| `/api/mcp/audit`       | `GET`                 | Các mục nhật ký kiểm toán từ `mcp_tool_audit` (bộ lọc: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Quản lý                       |
| `/api/mcp/audit/stats` | `GET`                 | Thống kê kiểm toán tổng hợp (`totalCalls`, `successRate`, `avgDurationMs`, các công cụ hàng đầu)         | Quản lý                       |

Các tệp nguồn: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Cả giao vận SSE và HTTP có thể phát luồng đều bị chặn cho đến khi máy chủ MCP được bật trong phần Cài đặt (`mcpEnabled`) và `mcpTransport` thích hợp được chọn. Nếu cấu hình sai giao vận, tuyến sẽ trả về HTTP 400 cùng gợi ý chuyển đổi cài đặt.

---

## Xác thực & Phạm vi

Các công cụ MCP được xác thực thông qua phạm vi của khóa API. Việc thực thi phạm vi được tập trung tại
`open-sse/mcp-server/scopeEnforcement.ts`. Mỗi công cụ yêu cầu các phạm vi cụ thể:

| Phạm vi               | Công cụ                                                                                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 công cụ đọc — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 công cụ ghi — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

Hỗ trợ phạm vi ký tự đại diện: `read:*` cấp tất cả các phạm vi đọc, `*` cấp toàn quyền truy cập.

### `mcp:connect` — quyền hạn tuyến hạn chế (#7895)

Việc truy cập giao thức truyền tải HTTP/SSE MCP (`/api/mcp/*`) từ địa chỉ không phải loopback yêu cầu ngoại lệ LOCAL_ONLY cho `/api/mcp/` (xem `docs/security/ROUTE_GUARD_TIERS.md`). Trước đây, ngoại lệ đó chỉ chấp nhận khóa API có đầy đủ phạm vi `manage`/`admin` — quá rộng đối với bên gọi chỉ cần giao tiếp với MCP. `src/shared/constants/managementScopes.ts` hiện xuất `MCP_CONNECT_SCOPE = "mcp:connect"`: một phạm vi bổ sung, hạn chế (theo tiền lệ của `SELF_USAGE_SCOPE`) chỉ cấp quyền bỏ qua kiểm tra cho `/api/mcp/` trong `src/server/authz/policies/management.ts` — phạm vi này không cấp quyền truy cập vào bất kỳ tuyến quản trị nào khác và được chủ ý loại KHỎI `MANAGEMENT_API_KEY_SCOPES`. Khóa có `manage`/`admin` vẫn vượt qua ngoại lệ như trước; `mcp:connect` là lựa chọn thay thế có đặc quyền thấp hơn dành cho các bên gọi từ xa chỉ sử dụng MCP, được kiểm tra thông qua `hasMcpConnectOrManageScope()`.

### Liên kết phạm vi HTTP theo từng khóa (#7895)

Qua HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` hiện phân giải `api_keys.scopes` thực tế của bên gọi thông qua `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) và truyền thông tin đó tới `transport.handleRequest(req, { authInfo })` của MCP SDK, nhờ vậy `extra.authInfo.scopes` được chuyển đến mỗi lệnh gọi công cụ sẽ phản ánh các phạm vi riêng của khóa Bearer. `resolveCallerScopeContext()` trong `scopeEnforcement.ts` vốn đã ưu tiên `authInfo` hơn `_meta` và phương án dự phòng từ biến môi trường `OMNIROUTE_MCP_SCOPES` — thay đổi này chỉ điền dữ liệu vào nguồn đầu tiên có mức ưu tiên cao nhất đó, vốn trước đây chưa được cung cấp qua HTTP. Khi không phân giải được khóa API nào (không có header, khóa không hợp lệ), `authInfo` vẫn là `undefined` và quá trình phân giải tiếp tục chuyển sang chuỗi dự phòng `meta`/biến môi trường hiện có mà không thay đổi. Điều này KHÔNG thay đổi giá trị mặc định của `OMNIROUTE_MCP_ENFORCE_SCOPES` — việc thực thi vẫn phải được bật rõ ràng; thay đổi này chỉ khiến đường dẫn theo từng khóa được ưu tiên sau khi tính năng đó được bật. stdio không có danh tính theo từng bên gọi (xem `mcpCallerIdentity.ts`) và không bị ảnh hưởng — nó vẫn sử dụng chuỗi dự phòng `_meta`/biến môi trường.

---

## Biến môi trường

| Biến                                    | Mặc định                       | Mục đích                                                                                                                                 |
| :-------------------------------------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`       | URL cơ sở mà máy chủ MCP sử dụng khi gọi các API nội bộ của OmniRoute                                                                    |
| `OMNIROUTE_API_KEY`                     | (trống)                        | Khóa API được chuyển tiếp dưới dạng `Authorization: Bearer` đến các lệnh gọi API nội bộ                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (chỉ `"true"` mới bật) | Khi được bật, các scope bị thiếu sẽ khiến lệnh gọi công cụ bị từ chối và ghi `scope_denied:<reason>` vào nhật ký kiểm tra                |
| `OMNIROUTE_MCP_SCOPES`                  | (trống)                        | Danh sách cho phép gồm các scope, phân tách bằng dấu phẩy, mặc định được coi là "khả dụng" (dùng khi bên gọi không cung cấp scope riêng) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (chưa đặt = bật)               | Khi được đặt thành `0/false/off/no`, vô hiệu hóa tính năng nén mô tả MCP tại thời điểm đăng ký                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (chưa đặt = bật)               | Bí danh thay thế cho cùng tùy chọn bật/tắt ở trên                                                                                        |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                        | Khoảng thời gian chờ trước khi hủy các thao tác đọc quản lý nội bộ (tình trạng, khả năng phục hồi, tổ hợp, hạn ngạch, mức sử dụng)       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                        | Khoảng thời gian chờ trước khi hủy các chặng đang đợi nhà cung cấp (`route_request`, `web_search`, `web_fetch`)                          |
| `MCP_TOOL_DENY`                         | (chưa đặt = không lọc)         | Tên các công cụ cần loại khỏi `tools/list`, phân tách bằng dấu phẩy (giảm số lượng công cụ — xem bên dưới)                               |
| `MCP_TOOL_ALLOW`                        | (chưa đặt = không lọc)         | Tên các công cụ được giữ lại độc quyền, phân tách bằng dấu phẩy (chế độ danh sách cho phép — xem bên dưới)                               |
| `DATA_DIR`                              | `~/.omniroute`                 | Tệp heartbeat được ghi vào `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                      |

---

## Nén mô tả

Các registry công cụ, prompt và tài nguyên MCP có thể nén phần mô tả tại thời điểm đăng ký/liệt kê để giảm dung lượng siêu dữ liệu được cung cấp cho máy khách (và do đó giảm chi phí ngữ cảnh prompt). Phần triển khai nằm trong `open-sse/mcp-server/descriptionCompressor.ts` và được tích hợp vào máy chủ MCP thông qua `compressMcpRegistryMetadata` bên trong `createMcpServer()`.

- Việc nén được thực hiện trên văn bản mô tả bằng bộ quy tắc Caveman (`getRulesForContext("all", "full")`) kết hợp với tính năng trích xuất các khối cần giữ nguyên (đoạn mã nội dòng, khối mã có hàng rào, v.v.) để nội dung có cấu trúc không bị thay đổi.
- Bật hoặc tắt theo từng môi trường triển khai thông qua giá trị `compression.mcpDescriptionCompressionEnabled` trong bảng cài đặt `key_value` (mặc định: bật) — được hiển thị trong giao diện người dùng dưới dạng **Phân tích → Nén mô tả MCP**.
- Bật hoặc tắt trên toàn tiến trình thông qua `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` hoặc `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Số liệu thống kê theo thời gian thực được cung cấp qua `omniroute_compression_status` tại `analytics.mcpDescriptionCompression` và được gắn thẻ `source: "mcp_metadata_estimate"` để phân biệt với biên nhận mức sử dụng thực tế từ nhà cung cấp.

---

## Giảm số lượng công cụ (F4.3)

Việc nén mô tả giúp thu nhỏ siêu dữ liệu của từng công cụ; **giảm số lượng công cụ** tiến thêm một bước bằng cách giảm _số lượng_ công cụ được công bố. Việc quảng bá ít công cụ hơn trong manifest `tools/list` làm giảm chi phí token trên mỗi yêu cầu mà mô hình của máy khách phải trả cho danh mục công cụ (nén "lớp 5"). Phần triển khai là một bộ lọc thuần túy, không trạng thái trong `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), được tích hợp vào vòng lặp đăng ký trong `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Tùy chọn bật, mặc định tắt.** Bộ lọc chỉ chạy khi có ít nhất một trong hai biến môi trường được thiết lập; khi không có biến nào được thiết lập, toàn bộ 110 công cụ được công bố mà không thay đổi.

| Biến             | Chế độ                                                                                                                        |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Danh sách chặn — tên công cụ được phân tách bằng dấu phẩy và luôn bị loại khỏi `tools/list`                                   |
| `MCP_TOOL_ALLOW` | Danh sách cho phép — tên công cụ được phân tách bằng dấu phẩy; chỉ các công cụ này được giữ lại, mọi công cụ khác đều bị loại |

`deny` được ưu tiên hơn `allow`. Các tên được phân tách bằng dấu phẩy, khoảng trắng ở đầu và cuối được loại bỏ, đồng thời các mục trống bị bỏ qua. Ví dụ:

```bash
# Loại hai công cụ khỏi danh mục
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Chỉ công bố các công cụ định tuyến + hạn ngạch (chế độ danh sách cho phép)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Cách loại bỏ các công cụ đã lọc:** quá trình đăng ký luôn thành công; sau đó, một công cụ bị hồ sơ từ chối sẽ được gọi `.disable()` trên handle MCP SDK, vì vậy công cụ đó không bao giờ xuất hiện trong `tools/list` nhưng phần kết nối vẫn nguyên vẹn (bật/tắt rõ ràng, không cần đăng ký lại). Trình phân tích cú pháp hồ sơ là `readMcpToolProfileFromEnv(process.env)`, trả về `null` (không lọc) khi cả hai biến đều trống.

Cấu trúc `ToolProfile` phong phú hơn phía sau `reduceToolManifest` cũng hỗ trợ lọc theo phần giao của phạm vi (`allowScopes`, với đối sánh ký tự đại diện kiểu `read:*`) và giới hạn `maxTools` có tính xác định, nhưng hai tùy chọn này cần manifest đầy đủ tại thời điểm đăng ký và hiện **không** được cung cấp thông qua các biến môi trường (một hook ở cấp `tools/list` là hạng mục tiếp theo đang được theo dõi). Có thể dùng `estimateManifestTokens()` để so sánh chi phí token của manifest trước và sau khi rút gọn.

---

## Heartbeat thời gian chạy

Transport stdio duy trì thông tin trạng thái hoạt động tại `${DATA_DIR}/runtime/mcp-heartbeat.json` sau mỗi 5 giây. Bảng điều khiển (`/api/mcp/status`) đọc tệp này cùng với trạng thái hoạt động của PID để xác định `online`. Thay vào đó, các transport HTTP báo cáo trạng thái từ `getMcpHttpStatus()` trong tiến trình (không ghi tệp).

Ảnh chụp heartbeat chứa:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Ghi nhật ký kiểm tra

Mọi lệnh gọi công cụ đều được `open-sse/mcp-server/audit.ts` ghi vào bảng SQLite `mcp_tool_audit`:

- Tên công cụ, đối số (được băm/cắt ngắn theo `auditLevel` của từng công cụ), kết quả
- Thời lượng tính bằng mili giây, cờ thành công/thất bại, thông báo lỗi (khi áp dụng)
- Mã băm khóa API, dấu thời gian
- Các trường hợp bị từ chối do phạm vi được ghi là `scope_denied:<reason>` cùng với danh sách phạm vi còn thiếu

Sử dụng bảng điều khiển hoặc các endpoint REST `/api/mcp/audit` và `/api/mcp/audit/stats` để kiểm tra các lệnh gọi gần đây.

---

## Tệp

| Tệp                                                                      | Mục đích                                                          |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Factory máy chủ MCP, điểm vào stdio, đăng ký công cụ theo phạm vi |
| `open-sse/mcp-server/httpTransport.ts`                                   | Giao vận SSE + Streamable HTTP (quản lý phiên)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Đánh giá phạm vi công cụ và xác định bên gọi                      |
| `open-sse/mcp-server/audit.ts`                                           | Ghi nhật ký kiểm tra lệnh gọi công cụ (`mcp_tool_audit`)          |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Trình ghi heartbeat stdio (`mcp-heartbeat.json`)                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Nén mô tả cho các registry công cụ / prompt / tài nguyên          |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Các schema Zod + registry công cụ (`MCP_TOOLS`, 45 mục)           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Trình xử lý công cụ Phase 2 + bộ nhớ đệm + 1proxy                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Trình xử lý công cụ nén                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Định nghĩa công cụ bộ nhớ (3 công cụ)                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Định nghĩa công cụ kỹ năng (4 công cụ)                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Định nghĩa công cụ nguồn ngữ cảnh Notion (6 công cụ)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Định nghĩa công cụ trò chơi hóa (8 công cụ)                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Công cụ đăng ký và quản lý plugin (8 công cụ)                     |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                        |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                         |
| `src/app/api/mcp/sse/route.ts`                                           | Route giao vận SSE `/api/mcp/sse`                                 |
| `src/app/api/mcp/stream/route.ts`                                        | Route giao vận Streamable HTTP `/api/mcp/stream`                  |
| `src/app/api/mcp/audit/route.ts`                                         | Truy vấn nhật ký kiểm tra `/api/mcp/audit`                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Chỉ số kiểm tra tổng hợp `/api/mcp/audit/stats`                   |
| `src/lib/notion/api.ts`                                                  | Client Notion REST API (thử lại, thời gian chờ, phân loại lỗi)    |
| `src/lib/db/notion.ts`                                                   | Lưu trữ lâu dài token Notion (bảng `key_value`)                   |
| `src/app/api/settings/notion/route.ts`                                   | API cài đặt Notion (GET/POST/DELETE)                              |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Giao diện quản lý token Notion                                    |
| `tests/unit/notion-api.test.ts`                                          | Kiểm thử client Notion API (7)                                    |
| `tests/unit/notion-tools.test.ts`                                        | Kiểm thử thực thi phạm vi của công cụ Notion (10)                 |
| `tests/unit/db/notion.test.mjs`                                          | Kiểm thử mô-đun DB Notion (3)                                     |
