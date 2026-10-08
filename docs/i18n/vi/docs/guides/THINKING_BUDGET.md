# Thinking Budget (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Bảng điều khiển:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Nguồn:** `open-sse/services/thinkingBudget.ts`

Thinking Budget kiểm soát việc OmniRoute có **ghi đè các tham số suy luận/tư duy của ứng dụng khách** trên đường gửi tới nhà cung cấp hay không. Tính năng này **không** bật hoặc tắt tính năng nén, định tuyến hay bộ nhớ đệm prompt.

## Các chế độ

| Chế độ                       | OmniRoute thực hiện                                                                                                                    | Khi nào nên sử dụng                                                                                                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (mặc định) | Giữ nguyên các trường của ứng dụng khách (`reasoning`, `reasoning_effort`, `thinking` của Claude, `thinking_config` của Gemini, v.v.). | **Codex / Desktop / bất kỳ ứng dụng khách nào cần kiểm soát mức độ nỗ lực + bản tóm tắt suy luận.** Bắt buộc để hiển thị bảng tư duy khi ứng dụng khách yêu cầu `reasoning.summary`.                |
| **`auto`**                   | **Loại bỏ toàn bộ** trường tư duy/suy luận khỏi phần thân yêu cầu trước khi gửi tới thượng nguồn.                                      | Chỉ sử dụng khi bạn chủ ý muốn **nhà cung cấp** tự xác định giá trị mặc định và bạn **không** cần ứng dụng khách kiểm soát quá trình tư duy. **Không phải** là “tự động hiển thị quá trình tư duy”. |
| **`custom`**                 | Ghi đè mọi yêu cầu bằng một ngân sách token tư duy cố định.                                                                            | Đặt giới hạn cứng cho số token tư duy của toàn bộ lưu lượng.                                                                                                                                        |
| **`adaptive`**               | Điều chỉnh ngân sách từ mức độ nỗ lực cơ sở dựa trên số lượng thông báo, công cụ và độ dài prompt.                                     | Kiểm soát token linh hoạt mà không loại bỏ hoàn toàn ý định của ứng dụng khách.                                                                                                                     |

### Những gì `auto` loại bỏ

Khi chế độ là `auto`, `stripThinkingConfig()` sẽ xóa (trong số các trường khác):

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` và `output_config.effort` khi có
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Nếu một ứng dụng khách (ví dụ: Codex Desktop) gửi `reasoning: { effort: "ultra", summary: "detailed" }`, **`auto` sẽ loại bỏ đối tượng đó**. Thượng nguồn vẫn có thể tính phí một số token suy luận, nhưng thường chỉ trả về các mục suy luận **trống hoặc chỉ được mã hóa** — vì vậy giao diện người dùng không hiển thị luồng tư duy hữu ích nào.

## Đây **không phải** là gì

| Tính năng                                           | Mối quan hệ                                                                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nén** (Caveman, RTK, xếp chồng, …)                | Pipeline riêng biệt. Hoạt động trong mọi chế độ thinking-budget.                                                                                         |
| **Bộ nhớ đệm prompt / ngữ nghĩa**                   | Riêng biệt. Không bị ảnh hưởng bởi chế độ thinking-budget.                                                                                               |
| **Định tuyến kết hợp / phương án dự phòng**         | Riêng biệt. Không bị ảnh hưởng.                                                                                                                          |
| **Giới hạn token / ngân sách chi phí của khóa API** | Riêng biệt. Không bị ảnh hưởng.                                                                                                                          |
| **Bộ nhớ đệm phát lại suy luận**                    | Tái chèn qua nhiều lượt cho các nhà cung cấp nghiêm ngặt (DeepSeek, Kimi, Qwen-thinking, …). Không giống với “hiển thị tư duy” của Desktop.              |
| **Giải mã `encrypted_content`**                     | **Không thể.** Các blob suy luận riêng tư của OpenAI/Codex là dữ liệu không thể đọc được. OmniRoute không bao giờ giải mã chúng (#7095 / #7176 / #7304). |

## Hiển thị nội dung suy luận (ứng dụng Codex / Responses)

Để ứng dụng hiển thị văn bản suy luận, bạn cần đáp ứng **tất cả** các điều kiện sau:

1. Chế độ Thinking Budget = **`passthrough`** (hoặc custom/adaptive nhưng vẫn giữ nguyên yêu cầu tóm tắt ở mức đủ để hoạt động với luồng bạn sử dụng).
2. Ứng dụng yêu cầu bản tóm tắt, ví dụ Codex `model_reasoning_summary = "detailed"` / `auto` (không phải `none`).
3. Dịch vụ thượng nguồn thực sự truyền trực tuyến `response.reasoning_summary_text.*` (hoặc mục đó có `reasoning.summary` không rỗng).

Nếu bạn chỉ nhận được “suy luận riêng tư được mã hóa”, thì có thể:

- chế độ là **`auto`** (yêu cầu của ứng dụng đã bị loại bỏ), hoặc
- dịch vụ thượng nguồn trả về `encrypted_content` mà không có văn bản tóm tắt (hạn chế của nhà cung cấp; OmniRoute chỉ có thể hiển thị nội dung giữ chỗ, không thể hiển thị văn bản thuần túy).

## Ví dụ API

```bash
# Đọc
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Khuyến nghị để hiển thị nội dung suy luận trong Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Lược đồ (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; các trường tùy chọn gồm `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Lưu trữ lâu dài / khởi động lại

Giá trị được lưu dưới khóa cài đặt `thinkingBudget` và được nạp khi tiến trình khởi động (`hydrateThinkingBudgetConfig`). Sau khi thay đổi thông qua cơ sở dữ liệu hoặc một số phương thức không dùng API, hãy **khởi động lại tiến trình OmniRoute** để singleton trong bộ nhớ khớp với dữ liệu trên đĩa.

## Danh sách kiểm tra dành cho người vận hành

- [ ] Người dùng Codex / Desktop: chế độ = **passthrough**
- [ ] Vẫn bật tính năng nén nếu bạn muốn tiết kiệm token cho **tin nhắn**, thay vì loại bỏ nội dung suy luận
- [ ] Không nên kỳ vọng `auto` sẽ “hiển thị thêm nội dung suy luận”
- [ ] Bản tóm tắt chỉ được mã hóa là hành vi của **nhà cung cấp**; passthrough không thể giải mã chúng

## Tài liệu liên quan

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — bộ nhớ đệm `reasoning_content` qua nhiều lượt
- [USER_GUIDE.md](./USER_GUIDE.md) — các tab trong bảng điều khiển Cài đặt
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — các điểm cuối cài đặt
