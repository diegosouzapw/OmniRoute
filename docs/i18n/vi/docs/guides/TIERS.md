# OmniRoute Tiers — User Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TIERS.md) · 🇪🇹 [am](../../../am/docs/guides/TIERS.md) · 🇸🇦 [ar](../../../ar/docs/guides/TIERS.md) · 🇦🇿 [az](../../../az/docs/guides/TIERS.md) · 🇧🇬 [bg](../../../bg/docs/guides/TIERS.md) · 🇧🇩 [bn](../../../bn/docs/guides/TIERS.md) · 🇨🇿 [cs](../../../cs/docs/guides/TIERS.md) · 🇩🇰 [da](../../../da/docs/guides/TIERS.md) · 🇩🇪 [de](../../../de/docs/guides/TIERS.md) · 🇬🇷 [el](../../../el/docs/guides/TIERS.md) · 🇪🇸 [es](../../../es/docs/guides/TIERS.md) · 🇪🇪 [et](../../../et/docs/guides/TIERS.md) · 🇮🇷 [fa](../../../fa/docs/guides/TIERS.md) · 🇫🇮 [fi](../../../fi/docs/guides/TIERS.md) · 🇫🇷 [fr](../../../fr/docs/guides/TIERS.md) · 🇮🇪 [ga](../../../ga/docs/guides/TIERS.md) · 🇮🇳 [gu](../../../gu/docs/guides/TIERS.md) · 🇳🇬 [ha](../../../ha/docs/guides/TIERS.md) · 🇮🇱 [he](../../../he/docs/guides/TIERS.md) · 🇮🇳 [hi](../../../hi/docs/guides/TIERS.md) · 🇭🇷 [hr](../../../hr/docs/guides/TIERS.md) · 🇭🇺 [hu](../../../hu/docs/guides/TIERS.md) · 🇦🇲 [hy](../../../hy/docs/guides/TIERS.md) · 🇮🇩 [id](../../../id/docs/guides/TIERS.md) · 🇳🇬 [ig](../../../ig/docs/guides/TIERS.md) · 🇮🇹 [it](../../../it/docs/guides/TIERS.md) · 🇯🇵 [ja](../../../ja/docs/guides/TIERS.md) · 🇬🇪 [ka](../../../ka/docs/guides/TIERS.md) · 🇰🇭 [km](../../../km/docs/guides/TIERS.md) · 🇮🇳 [kn](../../../kn/docs/guides/TIERS.md) · 🇰🇷 [ko](../../../ko/docs/guides/TIERS.md) · 🇱🇹 [lt](../../../lt/docs/guides/TIERS.md) · 🇱🇻 [lv](../../../lv/docs/guides/TIERS.md) · 🇮🇳 [ml](../../../ml/docs/guides/TIERS.md) · 🇮🇳 [mr](../../../mr/docs/guides/TIERS.md) · 🇲🇾 [ms](../../../ms/docs/guides/TIERS.md) · 🇲🇹 [mt](../../../mt/docs/guides/TIERS.md) · 🇲🇲 [my](../../../my/docs/guides/TIERS.md) · 🇳🇵 [ne](../../../ne/docs/guides/TIERS.md) · 🇳🇱 [nl](../../../nl/docs/guides/TIERS.md) · 🇳🇴 [no](../../../no/docs/guides/TIERS.md) · 🇮🇳 [or](../../../or/docs/guides/TIERS.md) · 🇮🇳 [pa](../../../pa/docs/guides/TIERS.md) · 🇵🇭 [phi](../../../phi/docs/guides/TIERS.md) · 🇵🇱 [pl](../../../pl/docs/guides/TIERS.md) · 🇵🇹 [pt](../../../pt/docs/guides/TIERS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TIERS.md) · 🇷🇴 [ro](../../../ro/docs/guides/TIERS.md) · 🇷🇺 [ru](../../../ru/docs/guides/TIERS.md) · 🇱🇰 [si](../../../si/docs/guides/TIERS.md) · 🇸🇰 [sk](../../../sk/docs/guides/TIERS.md) · 🇸🇮 [sl](../../../sl/docs/guides/TIERS.md) · 🇷🇸 [sr](../../../sr/docs/guides/TIERS.md) · 🇸🇪 [sv](../../../sv/docs/guides/TIERS.md) · 🇰🇪 [sw](../../../sw/docs/guides/TIERS.md) · 🇮🇳 [ta](../../../ta/docs/guides/TIERS.md) · 🇮🇳 [te](../../../te/docs/guides/TIERS.md) · 🇹🇭 [th](../../../th/docs/guides/TIERS.md) · 🇹🇷 [tr](../../../tr/docs/guides/TIERS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TIERS.md) · 🇵🇰 [ur](../../../ur/docs/guides/TIERS.md) · 🇺🇿 [uz](../../../uz/docs/guides/TIERS.md) · 🇳🇬 [yo](../../../yo/docs/guides/TIERS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TIERS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TIERS.md)

---

OmniRoute sắp xếp 352 nhà cung cấp được hỗ trợ thành 3 tầng kinh tế. Mỗi
yêu cầu sẽ lần lượt đi qua các tầng này cho đến khi nhận được phản hồi thành công — bạn
nhận được phản hồi khả dụng rẻ nhất mà không bao giờ phải viết mã dự phòng.

## Tầng 1 — Gói đăng ký

**Các nhà cung cấp mà bạn đã trả phí.** OmniRoute tận dụng toàn bộ hạn mức trước
khi hết hạn.

| Nhà cung cấp                       | Lý do thuộc Tầng 1                                    |
| ---------------------------------- | ----------------------------------------------------- |
| Claude Code OAuth                  | Anthropic Pro/Team — phí cố định, thường ít dùng      |
| OpenAI Codex (gói đăng ký ChatGPT) | Plus/Team bao gồm hạn mức Codex                       |
| GitHub Copilot                     | Tính phí theo người dùng — hạn mức đặt lại hằng tháng |
| Cursor IDE                         | Hạn mức gói Pro                                       |
| Antigravity / Devin Desktop        | Hạn mức tích hợp sẵn                                  |

**Chiến lược**: định tuyến đến đây trước tiên cho mọi yêu cầu phù hợp với
thế mạnh của mô hình. Bộ theo dõi hạn mức giám sát các lần đặt lại sắp tới, và chiến lược kết hợp `reset-aware`
sẽ ưu tiên tương ứng. Để định tuyến qua Tầng 1 trước và chỉ chuyển
sang các tầng trả phí khi hết hạn mức, hãy dùng id `auto/thrifty` — hoặc `auto/subscription`
để chỉ sử dụng dung lượng có trong gói và dừng khi không còn khả dụng. Xem
[Định tuyến ưu tiên gói đăng ký](../routing/SUBSCRIPTION_LADDER.md).

## Tầng 2 — Giá rẻ

**Các nhà cung cấp tính phí theo token với giá dưới $1/1M token.** Dành cho tác vụ khối lượng lớn
hoặc sử dụng sau khi hạn mức Tầng 1 đã chạm giới hạn.

| Nhà cung cấp                 | Giá (đầu vào/đầu ra) | Thế mạnh                   |
| ---------------------------- | -------------------- | -------------------------- |
| DeepSeek V4 Pro              | $0.27 / $1.10 mỗi 1M | Mã, suy luận               |
| GLM-4.5                      | $0.60 / $2.20 mỗi 1M | Ngữ cảnh dài               |
| MiniMax M1                   | $0.20 / $1.10 mỗi 1M | Tốc độ                     |
| Qwen Coder                   | $0.30 / $1.20 mỗi 1M | Mã                         |
| OpenRouter (tối ưu theo giá) | thay đổi             | Hơn 100 mô hình, linh hoạt |

**Chiến lược**: tổ hợp `cost-optimized` chọn mô hình có $/token thấp nhất và đáp ứng
bộ lọc năng lực của tác vụ (thị giác, chế độ JSON, công cụ, ngữ cảnh tối đa).

## Tầng 3 — Miễn phí

**Các nhà cung cấp không mất phí** — gói miễn phí, chương trình tín dụng, hạn mức OAuth hằng ngày.

| Nhà cung cấp     | Hạn mức miễn phí / tín dụng                               |
| ---------------- | --------------------------------------------------------- |
| Kiro AI          | Gói Claude miễn phí (chính sách sử dụng hợp lý hào phóng) |
| OpenCode Free    | Không cần xác thực, giới hạn tốc độ hào phóng             |
| Qoder            | OAuth miễn phí                                            |
| Google Vertex AI | $300 tín dụng cho tài khoản mới                           |
| Amazon Q         | Gói miễn phí cho người dùng AWS                           |
| Pollinations     | API công khai mở                                          |
| Cloudflare AI    | Gói Workers AI miễn phí                                   |

**Chiến lược**: tổ hợp `auto` với giới hạn ngân sách sẽ định tuyến đến đây khi Tầng 1+2 thất bại
hoặc khi `useFreeOnly=true` được thiết lập. Các nhà cung cấp miễn phí thường có
giới hạn tốc độ chặt chẽ hơn — bộ ngắt mạch sẽ khôi phục chúng sau thời gian chờ.

## Cấu hình các tầng

Bảng điều khiển → **Tiers** → gán các nhà cung cấp của bạn. Các giá trị mặc định (từ `tierDefaults.json`) là
hợp lý; hãy chỉnh sửa khi bạn có các gói đăng ký cụ thể cần ưu tiên hoặc các nhà cung cấp cần loại trừ.

Cơ chế chấm điểm 16 yếu tố của Auto-Combo cũng xem xét tầng. Xem
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Dữ liệu đo lường

Bảng điều khiển → **Usage** hiển thị số token đã dùng theo từng tầng mỗi ngày. Hãy dùng thông tin này để:

- Xác nhận Tầng 1 được sử dụng hết mức (nếu không, bạn đang lãng phí giá trị gói đăng ký)
- Xác định những mô hình Tầng 2 được chọn nhiều nhất (hợp nhất còn 1-2 mô hình)
- Xác minh Tầng 3 giúp tiết kiệm chi phí cho các tác vụ thử nghiệm/khám phá

## Các mẫu phổ biến

### Tác vụ hoàn toàn miễn phí

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Ưu tiên mạnh Tầng 3; chỉ sử dụng Tầng 2 nếu Tầng 3 không khả dụng.

### Ưu tiên gói đăng ký với phương án dự phòng giá rẻ

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Danh sách có thứ tự rõ ràng tương ứng với Tầng 1 → Tầng 2 → Tầng 3.
