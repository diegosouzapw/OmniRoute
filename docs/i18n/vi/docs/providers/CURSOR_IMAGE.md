# Cursor Image Generation (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute cung cấp tính năng **tạo hình ảnh** của gói Cursor tại `POST /v1/images/generations` thông qua cùng id nhà cung cấp như chat: `cursor` (bí danh `cu`).

| Trường               | Giá trị                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| id `IMAGE_PROVIDERS` | `cursor`                                                                           |
| Định dạng            | `cursor-agent-image`                                                               |
| Xác thực             | Cùng kết nối OAuth / API key như chat (`provider_connections.provider = "cursor"`) |
| Mô hình              | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                          |

## Tại sao sử dụng Agent CLI

Chat Cursor trong OmniRoute sử dụng `agent.v1.AgentService/Run` (protobuf). Luồng này **từ chối** các công cụ máy khách tích hợp sẵn (shell, write, …). Tạo hình ảnh là một công cụ gốc của Cursor, được **`agent` CLI** thực thi trên seat. Do đó, trình xử lý hình ảnh khởi chạy `agent` với một prompt cố định và một không gian làm việc tạm thời riêng cho từng yêu cầu (cùng cấu trúc với các bridge seat của cộng đồng), sau đó trả về `b64_json` tương thích với OpenAI.

## Hạn chế truy cập (Quy tắc cứng #15 + #17)

Đây là định dạng `IMAGE_PROVIDERS` duy nhất khởi chạy tiến trình con (tệp nhị phân `agent`). Vì `POST /v1/images/generations` được dùng chung bởi khoảng 40 nhà cung cấp hình ảnh không khởi chạy tiến trình khác mà các bên gọi từ xa sử dụng hợp lệ, toàn bộ route này **không** được phân loại là `LOCAL_ONLY` — thay vào đó, `handleCursorAgentImageGeneration` áp dụng cổng kiểm soát riêng bằng phán quyết `AUTHZ_HEADER_PEER_LOCALITY` đáng tin cậy mà pipeline authz đóng dấu trên mọi yêu cầu (dựa trên peer TCP thực tế, không bao giờ dựa trên header `Host` có thể bị giả mạo): chỉ các bên gọi từ `loopback` và `lan` mới có thể kích hoạt việc khởi chạy; tất cả các trường hợp khác (bao gồm API key bị rò rỉ và được phát lại qua tunnel công khai) đều nhận `403` trước khi diễn ra bất kỳ thao tác tra cứu thông tin xác thực hoặc khởi chạy tiến trình nào. Xem `src/server/authz/policies/management.ts` để biết chính sách tương tự được áp dụng cho phần còn lại của tầng `LOCAL_ONLY`.

## Cổng đồng thời ở cấp mô-đun (giới hạn đơn phiên bản)

`CURSOR_IMG_MAX_CONCURRENT` được thực thi bằng một bộ đếm/hàng đợi trong bộ nhớ, có phạm vi thuộc phiên bản mô-đun Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). Cơ chế này giới hạn chính xác số tiến trình `agent` đồng thời trong một tiến trình OmniRoute, nhưng **không** điều phối giữa nhiều tiến trình/phiên bản cùng dùng chung một seat Cursor (ví dụ: triển khai nhiều replica) — mỗi phiên bản thực thi giới hạn độc lập của riêng mình. Với triển khai đơn phiên bản (mặc định), giới hạn này là chính xác; các triển khai mở rộng theo chiều ngang nên đặt `CURSOR_IMG_MAX_CONCURRENT` ở mức thận trọng cho mỗi phiên bản hoặc định tuyến lưu lượng hình ảnh Cursor đến một phiên bản duy nhất.

## Yêu cầu

1. Một tài khoản Cursor đã được kết nối trong bảng điều khiển (OAuth hoặc API key `crsr_…`).
2. Tệp nhị phân Cursor Agent khả dụng cho tiến trình OmniRoute:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, hoặc
   - `~/.local/bin/agent`, hoặc
   - `providerSpecificData.agentBin` trên kết nối Cursor.

Điều chỉnh tùy chọn:

| Env                         | Mặc định                         | Ý nghĩa                                   |
| --------------------------- | -------------------------------- | ----------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                         | Thời gian thực tế tối đa cho mỗi hình ảnh |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                              | Cổng đồng thời cho seat dùng chung        |
| `CURSOR_IMG_MODEL`          | (mô hình trong yêu cầu / `auto`) | Ghi đè `--model` của CLI                  |

## Ví dụ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Quá trình tạo thường mất 1–2 phút. Nên ưu tiên đường dẫn mạng nội bộ; các proxy biên có thời gian chờ khoảng 100 giây sẽ thất bại.

## LiteLLM

Đăng ký một mô hình hình ảnh với `mode: image_generation`, `api_base: http://omniroute:20128/v1` và `model: openai/cursor/auto` (hoặc chỉ `cursor/auto`, tùy thuộc vào phiên bản LiteLLM của bạn).
