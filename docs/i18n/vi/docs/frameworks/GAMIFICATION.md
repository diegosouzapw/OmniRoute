# Gamification & Leaderboard System (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Nguồn chuẩn:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute bao gồm một lớp trò chơi hóa ưu tiên cục bộ, thưởng cho người dùng khi
tương tác với nền tảng — thực hiện yêu cầu, chuyển đổi nhà cung cấp, tạo
combo, chia sẻ token và đóng góp cho cộng đồng. Toàn bộ trạng thái được lưu trong
SQLite; việc liên kết với các máy chủ cộng đồng là tùy chọn tham gia và dựa trên cơ chế đẩy.

Hệ thống được thiết kế để **không có độ trễ trên luồng xử lý trọng yếu** — các sự kiện trò chơi hóa
được gửi theo cơ chế kích hoạt-và-quên từ quy trình xử lý yêu cầu và không bao giờ chặn
phản hồi của LLM.

---

## Tổng quan

### Mục đích

Tăng mức độ tương tác và tỷ lệ giữ chân người dùng bằng cách cung cấp tiến trình trực quan (XP,
cấp độ, huy hiệu), bằng chứng xã hội (bảng xếp hạng) và các động lực kinh tế (chia sẻ
token, phần thưởng mời).

### Phạm vi

| Tính năng         | Mô tả                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| XP & Cấp độ       | Nhận XP cho mỗi hành động; tăng cấp theo đường cong đa thức               |
| Huy hiệu          | Hơn 20 thành tựu thuộc 5 danh mục với 4 bậc độ hiếm                       |
| Chuỗi hoạt động   | Theo dõi mức sử dụng hằng ngày với chuỗi hiện tại/dài nhất                |
| Bảng xếp hạng     | Phạm vi toàn cầu, hằng tuần, hằng tháng, chia sẻ token và đóng góp        |
| Chia sẻ token     | Chuyển tín dụng giữa người dùng thông qua sổ cái bút toán kép             |
| Mời & Đổi mã      | Mã giới thiệu được lưu trữ dưới dạng băm SHA-256                          |
| Máy chủ cộng đồng | Liên kết với các phiên bản OmniRoute bên ngoài                            |
| Chống gian lận    | Tính điểm phía máy chủ, giới hạn tốc độ, phát hiện bất thường bằng điểm z |

### Nguyên tắc thiết kế

1. **Ưu tiên cục bộ** — toàn bộ trạng thái nằm trong SQLite, không yêu cầu dịch vụ bên ngoài.
2. **Không chặn** — các sự kiện được xử lý theo cơ chế kích hoạt-và-quên; luồng phản hồi LLM
   không bao giờ bị trì hoãn bởi logic trò chơi hóa.
3. **Máy chủ có toàn quyền quyết định** — XP chỉ được tính ở phía máy chủ; máy khách không thể
   tăng điểm giả tạo.
4. **Tôn trọng quyền riêng tư** — việc tham gia bảng xếp hạng là tùy chọn; người dùng có thể
   ẩn hồ sơ của mình.
5. **Sẵn sàng liên kết** — các máy chủ cộng đồng có thể đẩy điểm qua API có chữ ký;
   quá trình đồng bộ sẽ ghi đè, không cộng dồn.

---

## Kiến trúc

### Luồng cấp cao

```
Yêu cầu từ máy khách
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (quy trình hiện có) ...
      → phản hồi thượng nguồn được gửi đến máy khách
      → setImmediate (kích hoạt-và-quên):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Bộ phát sự kiện là điểm tích hợp duy nhất. `chatCore.ts` gọi
`emitGamificationEvent()` sau khi phản hồi được gửi; mô-đun sự kiện phân phối
đến các hệ thống con XP, chuỗi hoạt động, huy hiệu, bảng xếp hạng và chống gian lận.

### Sơ đồ phụ thuộc mô-đun

```
src/lib/gamification/
  events.ts          ← điểm vào (được gọi từ chatCore.ts)
    ├── xp.ts        ← tính toán XP & xác định cấp độ
    ├── streaks.ts   ← theo dõi chuỗi hoạt động hằng ngày
    ├── badges.ts    ← đánh giá tiêu chí huy hiệu
    ├── leaderboard.ts ← tính toán thứ hạng & phát SSE
    ├── antiCheat.ts ← giới hạn tốc độ & phát hiện bất thường
    ├── sharing.ts   ← sổ cái chuyển token
    ├── invites.ts   ← quản lý mã mời/đổi mã
    ├── servers.ts   ← liên kết máy chủ cộng đồng
    └── notifications.ts ← luồng thông báo SSE

src/lib/db/
  gamification.ts    ← mọi thao tác CRUD (8 bảng)

src/app/api/gamification/
  leaderboard/       ← GET bảng xếp hạng, POST làm mới thủ công
  leaderboard/stream ← cập nhật theo thời gian thực qua SSE
  transfer/          ← GET lịch sử, POST gửi token
  invite/            ← GET/POST mã, DELETE thu hồi
  invite/redeem/     ← POST đổi mã
  servers/           ← GET/POST/DELETE máy chủ cộng đồng
  federation/score/  ← POST đẩy điểm lên máy chủ
  federation/leaderboard/ ← GET lấy bảng xếp hạng từ máy chủ
  notifications/     ← thông báo huy hiệu/tăng cấp qua SSE
  anomalies/         ← GET báo cáo bất thường (quản trị viên)
  rotate/            ← POST xoay vòng khóa bí mật của token mời
```

---

## Lớp dữ liệu

### Các bảng cơ sở dữ liệu

Tất cả các bảng nằm trong cơ sở dữ liệu SQLite chính của OmniRoute, được tạo bởi migration
`060_create_gamification.sql`. Chế độ ghi nhật ký WAL được kế thừa từ singleton
`getDbInstance()` trong `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Mô-đun miền: `src/lib/db/gamification.ts`

Tuân theo mẫu OmniRoute tiêu chuẩn — nhập `getDbInstance()` từ
`core.ts`, xuất các hàm CRUD có kiểu. Không có SQL thô trong các trình xử lý tuyến.

Các hàm chính:

| Hàm                        | Mô tả                                                           |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Chèn hoặc cập nhật điểm cho (api_key_id, scope, period)         |
| `getLeaderboard()`         | Bảng xếp hạng có phân trang cho một phạm vi/kỳ cụ thể           |
| `getUserLevel()`           | Lấy hoặc tạo bản ghi cấp độ người dùng                          |
| `updateUserLevel()`        | Thiết lập XP, cấp độ và danh hiệu theo cách nguyên tử           |
| `getBadgeDefinitions()`    | Tất cả định nghĩa huy hiệu (có thể được lọc)                    |
| `getUserBadges()`          | Các huy hiệu mà người dùng đã đạt được                          |
| `awardBadge()`             | Chèn bản ghi đạt huy hiệu (đảm bảo tính lũy đẳng theo badge_id) |
| `logXpAction()`            | Thêm vào xp_audit_log                                           |
| `getXpAuditLog()`          | Lịch sử kiểm tra có phân trang của người dùng                   |
| `insertLedgerEntry()`      | Chuyển khoản ghi sổ kép (trong giao dịch)                       |
| `getBalance()`             | Tổng số đã nhận trừ đi tổng số đã gửi của người dùng            |
| `getTransferHistory()`     | Nhật ký chuyển khoản có phân trang                              |
| `createInviteToken()`      | Chèn mã mời + token đã băm                                      |
| `redeemInviteToken()`      | Tra cứu theo mã, xác thực, tăng số lần sử dụng                  |
| `upsertCommunityServer()`  | Đăng ký hoặc cập nhật máy chủ liên kết                          |
| `getCommunityServers()`    | Liệt kê các máy chủ của người dùng                              |
| `deleteCommunityServer()`  | Xóa đăng ký máy chủ                                             |

---

## Hệ thống XP / Cấp độ

**Tệp:** `src/lib/gamification/xp.ts`

### Đường cong cấp độ

Lượng XP cần thiết để đạt cấp `n` tuân theo một đường cong đa thức:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Cấp độ | XP đến cấp tiếp theo | XP tích lũy | Danh hiệu     |
| ------ | -------------------- | ----------- | ------------- |
| 1      | 100                  | 100         | Người mới     |
| 5      | 1,118                | 2,415       | Người mới     |
| 10     | 3,162                | 10,523      | Nhà thám hiểm |
| 25     | 12,500               | 86,024      | Nhà thám hiểm |
| 50     | 35,355               | 345,529     | Chuyên gia    |
| 75     | 64,952               | 948,683     | Bậc thầy      |
| 100    | 100,000              | 2,050,000   | Huyền thoại   |

### Danh hiệu

| Khoảng cấp độ | Danh hiệu     |
| ------------- | ------------- |
| 1 – 9         | Người mới     |
| 10 – 24       | Nhà thám hiểm |
| 25 – 49       | Chuyên gia    |
| 50 – 74       | Bậc thầy      |
| 75 – 100      | Huyền thoại   |

### Phần thưởng XP

| Hành động         | XP  | Mô tả                                                      |
| ----------------- | --- | ---------------------------------------------------------- |
| `request`         | 1   | Cho mỗi yêu cầu API được định tuyến qua OmniRoute          |
| `provider_switch` | 5   | Chuyển sang một nhà cung cấp khác                          |
| `model_switch`    | 3   | Chuyển sang một mô hình khác                               |
| `combo_create`    | 10  | Tạo một combo mới                                          |
| `combo_use`       | 2   | Sử dụng combo cho một yêu cầu                              |
| `token_share`     | 1   | Cho mỗi 1 000 token được chia sẻ với người dùng khác       |
| `invite_redeem`   | 50  | Đổi mã mời                                                 |
| `daily_login`     | 5   | Hoạt động sử dụng hằng ngày (một lần mỗi ngày)             |
| `streak_bonus`    | 2   | Cho mỗi ngày liên tiếp trong chuỗi (nhân với độ dài chuỗi) |
| `badge_unlock`    | 10  | Mở khóa một huy hiệu                                       |

### Luồng trao thưởng

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Tra cứu `XP_REWARDS[action]` để lấy lượng XP.
2. Chuyển qua `checkRateLimit()` (chống gian lận: tối đa 1000 XP/phút cho mỗi khóa).
3. Mở một giao dịch:
   - Đọc hàng `user_levels` hiện tại.
   - Cộng XP; tính lại cấp độ thông qua `levelFromXp(totalXp)`.
   - Nếu cấp độ thay đổi, đặt `levelUp = true`.
   - Cập nhật hàng `user_levels`.
   - Chèn vào `xp_audit_log`.
4. Trả về kết quả. Bên gọi xử lý thông báo.

### Hàm hỗ trợ: `levelFromXp(totalXp)`

Lặp qua các cấp từ 1..100, cộng dồn `xp_for_level(n)` cho đến khi XP tích lũy
vượt quá `totalXp`. Trả về cấp cao nhất có ngưỡng đã đạt được.
Độ phức tạp là O(100) — chấp nhận được vì cấp độ tối đa là 100.

---

## Hệ thống huy hiệu

**Tệp:** `src/lib/gamification/badges.ts`

### Danh mục

| Danh mục       | Mô tả                                   | Huy hiệu ví dụ                                   |
| -------------- | --------------------------------------- | ------------------------------------------------ |
| `usage`        | Các cột mốc dựa trên khối lượng sử dụng | Yêu cầu đầu tiên, 1K yêu cầu, 100K               |
| `sharing`      | Chia sẻ token và giới thiệu người dùng  | Lần chia sẻ đầu tiên, Hào phóng (10 lần chia sẻ) |
| `contribution` | Đóng góp cho cộng đồng                  | Người tạo combo, Nhà thám hiểm nhà cung cấp      |
| `streak`       | Tính nhất quán theo thời gian           | Chiến binh tuần, Tận tâm hằng tháng              |
| `rare`         | Thành tích khó đạt hoặc ẩn              | Người dùng sớm, Người báo cáo lỗi                |

### Độ hiếm

| Độ hiếm     | Màu sắc    | Gợi ý xác suất      |
| ----------- | ---------- | ------------------- |
| `common`    | Xám        | Hầu hết người dùng  |
| `uncommon`  | Xanh lá    | Người dùng tích cực |
| `rare`      | Xanh dương | Người dùng tận tâm  |
| `legendary` | Vàng       | 1% hàng đầu         |

### Các loại tiêu chí

| Loại           | Trường       | Mô tả                                                    |
| -------------- | ------------ | -------------------------------------------------------- |
| `action_count` | `count`      | Thực hiện hành động N lần (ví dụ: 1000 yêu cầu)          |
| `streak`       | `days`       | Duy trì chuỗi trong N ngày liên tiếp                     |
| `unique_count` | `field`, `n` | Sử dụng N giá trị duy nhất (ví dụ: 10 mô hình khác nhau) |
| `rank`         | `scope`, `n` | Đạt hạng N trong một phạm vi bảng xếp hạng               |
| `first`        | —            | Là người đầu tiên thực hiện một hành động                |
| `hidden`       | (thay đổi)   | Tiêu chí không được hiển thị cho đến khi đạt được        |

Các định nghĩa huy hiệu được lưu trữ trong `badge_definitions` dưới dạng `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Luồng đánh giá

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # tất cả các định nghĩa
    → getUserBadges(apiKeyId)         # đã đạt được (bỏ qua)
    → với mỗi huy hiệu chưa đạt được:
       → matchesCriteria(badge, event, userState)
       → nếu khớp: awardBadge(apiKeyId, badgeId)
         → trả về dữ liệu thông báo
```

Quá trình đánh giá được **điều khiển bởi sự kiện** — nó chạy sau mỗi sự kiện trò chơi hóa, nhưng
chỉ kiểm tra những huy hiệu có `criteria.type` phù hợp với hành động sự kiện. Điều này
giúp quá trình đánh giá diễn ra nhanh chóng (< 5ms đối với hầu hết sự kiện).

### `matchesCriteria(badge, event, userState)`

| Loại tiêu chí  | Kiểm tra                                                    |
| -------------- | ----------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                 |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                        |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                      |
| `rank`         | `getRank(apiKeyId, scope) <= n`                             |
| `first`        | Không có mục `xp_audit_log` trước đó cho loại hành động này |
| `hidden`       | Ủy quyền cho bước kiểm tra phụ phù hợp                      |

### Huy hiệu tích hợp sẵn (20+)

<details>
<summary>Danh sách huy hiệu đầy đủ</summary>

| Huy hiệu                     | Danh mục   | Độ hiếm        | Tiêu chí                          |
| ---------------------------- | ---------- | -------------- | --------------------------------- |
| Bước đầu tiên                | sử dụng    | phổ biến       | 1 yêu cầu                         |
| Bắt đầu làm quen             | sử dụng    | phổ biến       | 100 yêu cầu                       |
| Người dùng chuyên sâu        | sử dụng    | không phổ biến | 1,000 yêu cầu                     |
| Bách phu trưởng              | sử dụng    | hiếm           | 10,000 yêu cầu                    |
| Sức mạnh toàn năng           | sử dụng    | huyền thoại    | 100,000 yêu cầu                   |
| Chuyên gia đổi nhà cung cấp  | đóng góp   | phổ biến       | Sử dụng 5 nhà cung cấp khác nhau  |
| Bậc thầy nhà cung cấp        | đóng góp   | không phổ biến | Sử dụng 20 nhà cung cấp khác nhau |
| Kiến trúc sư combo           | đóng góp   | không phổ biến | Tạo 5 combo                       |
| Đại kiện tướng combo         | đóng góp   | hiếm           | Tạo 25 combo                      |
| Chia sẻ lần đầu              | chia sẻ    | phổ biến       | 1 lần chuyển token                |
| Hào phóng                    | chia sẻ    | không phổ biến | 10 lần chuyển token               |
| Nhà từ thiện                 | chia sẻ    | hiếm           | Chuyển tổng cộng 10,000 token     |
| Người giới thiệu             | chia sẻ    | phổ biến       | 1 lượt giới thiệu thành công      |
| Người xây dựng mạng lưới     | chia sẻ    | không phổ biến | 10 lượt giới thiệu thành công     |
| Chiến binh tuần              | chuỗi ngày | không phổ biến | Chuỗi 7 ngày                      |
| Tận tâm hàng tháng           | chuỗi ngày | hiếm           | Chuỗi 30 ngày                     |
| Không thể ngăn cản           | chuỗi ngày | huyền thoại    | Chuỗi 365 ngày                    |
| Người dùng tiên phong        | hiếm       | huyền thoại    | Tham gia trong giai đoạn beta     |
| Người tiên phong nén dữ liệu | hiếm       | không phổ biến | Sử dụng tính năng nén 100 lần     |
| Nhà sưu tập kỹ năng          | hiếm       | hiếm           | Sử dụng 10 kỹ năng khác nhau      |
| Nhà khám phá mô hình         | đóng góp   | không phổ biến | Sử dụng 15 mô hình khác nhau      |

</details>

---

## Trình theo dõi chuỗi hoạt động

**Tệp:** `src/lib/gamification/streaks.ts`

### Mô hình dữ liệu

Các chuỗi hoạt động được lưu trữ trong bảng `key_value` (bảng tiện ích dùng chung) theo
các khóa có không gian tên:

| Khóa                          | Giá trị                          | Mô tả                        |
| ----------------------------- | -------------------------------- | ---------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dữ liệu chuỗi đang hoạt động |

### Logic

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Đọc bản ghi chuỗi hoạt động từ `key_value`.
2. Phân tích `{current}`, `{longest}`, `{lastDate}` (chuỗi ngày theo định dạng ISO).
3. Nếu `lastDate === today` — không thay đổi (hôm nay đã được tính).
4. Nếu `lastDate === yesterday` — tăng `current`; cập nhật `longest` nếu cần.
5. Nếu `lastDate < yesterday` — đặt lại `current = 1` (chuỗi bị gián đoạn).
6. Ghi bản ghi đã cập nhật.
7. Kiểm tra các cột mốc: 7, 14, 30, 60, 90, 180, 365 ngày. Nếu vượt qua cột mốc, đặt
   `milestone = true` (bên gọi trao XP và kiểm tra huy hiệu).

### Các trường hợp biên

- **Múi giờ**: các chuỗi hoạt động sử dụng ngày UTC (`new Date().toISOString().slice(0, 10)`).
  Đây là chủ đích — một múi giờ chuẩn duy nhất ngăn việc gian lận bằng cách
  chuyển đổi múi giờ.
- **Người dùng mới**: không có bản ghi chuỗi hoạt động; yêu cầu đầu tiên tạo bản ghi với
  `current=1, longest=1, lastDate=today`.
- **Nhiều yêu cầu mỗi ngày**: chỉ yêu cầu đầu tiên trong ngày UTC
  làm tăng chuỗi hoạt động.

---

## Bảng xếp hạng

**Tệp:** `src/lib/gamification/leaderboard.ts`

### Phạm vi

| Phạm vi         | Kỳ hạn  | Mô tả                                                    |
| --------------- | ------- | -------------------------------------------------------- |
| `global`        | `all`   | XP tích lũy mọi thời điểm                                |
| `weekly`        | `week`  | XP kiếm được trong tuần UTC hiện tại (Thứ Hai–Chủ Nhật)  |
| `monthly`       | `month` | XP kiếm được trong tháng UTC hiện tại                    |
| `tokens_shared` | `all`   | Tổng số token đã chuyển cho người khác                   |
| `contributions` | `all`   | Số combo đã tạo + nhà cung cấp đã dùng + kỹ năng đã dùng |

### Tính toán thứ hạng

Thứ hạng được **tính toán tại thời điểm đọc**, không được lưu trữ. Điều này tránh dữ liệu thứ hạng lỗi thời
và loại bỏ nhu cầu chạy các tác vụ tính toán lại thứ hạng định kỳ.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Mẫu truy vấn:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Luân chuyển kỳ hạn

Bảng xếp hạng hàng tuần và hàng tháng được luân chuyển tự động:

1. **Lưu trữ**: tại ranh giới kỳ hạn, sao chép các mục hiện tại sang
   `leaderboard_archive` cùng với nhãn kỳ hạn.
2. **Đặt lại**: xóa các mục của kỳ hạn đã hết hạn.
3. **Kích hoạt**: được kiểm tra trên mỗi lần gọi `updateLeaderboard()`; yêu cầu đầu tiên
   của kỳ hạn mới sẽ kích hoạt quá trình luân chuyển.

Điều này đảm bảo bảng xếp hạng hàng tuần được đặt lại vào 00:00 UTC mỗi Thứ Hai và bảng xếp hạng hàng tháng
được đặt lại vào ngày đầu tiên của mỗi tháng.

### Cập nhật theo thời gian thực bằng SSE

**Điểm cuối:** `GET /api/gamification/stream`

```
Máy khách → GET /api/gamification/stream
  → Kết nối SSE được thiết lập
  → Máy chủ gửi ngay ảnh chụp nhanh 10 vị trí dẫn đầu của bảng xếp hạng
  → Mỗi 5 giây: đẩy dữ liệu 10 vị trí dẫn đầu đã cập nhật nếu có thay đổi
  → Mỗi 15 giây: gửi chú thích heartbeat (": heartbeat\n\n")
  → Máy khách ngắt kết nối → dọn dẹp (xóa trình lắng nghe)
```

Định dạng sự kiện:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Trình quản lý SSE theo dõi các máy khách được kết nối theo từng phạm vi và chỉ gửi bản cập nhật
khi dữ liệu bảng xếp hạng thực sự thay đổi kể từ lần đẩy gần nhất.

---

## Chia sẻ Token

**Tệp:** `src/lib/gamification/sharing.ts`

### Sổ cái kép

Mỗi lần chuyển tạo hai hàng trong `token_ledger`:

| Hàng   | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Ghi nợ | người gửi     | người nhận  | +amount  |
| Ghi có | người nhận    | người gửi   | -amount  |

Khoan đã — quy ước là:

| Hàng | `from_key_id` | `to_key_id` | `amount` | Ý nghĩa                 |
| ---- | ------------- | ----------- | -------- | ----------------------- |
| Gửi  | người gửi     | người nhận  | +amount  | Dòng ra từ người gửi    |
| Nhận | người nhận    | người gửi   | +amount  | Dòng vào cho người nhận |

Số dư được tính như sau:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Luồng chuyển

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Xác thực**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Tính lũy đẳng**: kiểm tra xem `idempotency_key` đã tồn tại trong sổ cái hay chưa.
   Nếu có, trả về kết quả đã lưu trong bộ nhớ đệm.
3. **Giao dịch** (một giao dịch SQLite duy nhất):
   a. Tính số dư của người gửi.
   b. Nếu `balance < amount`, hủy bỏ (không đủ số dư).
   c. Chèn hàng gửi (`from=sender,`.

### Giới hạn tốc độ

- Tối đa 10 lần chuyển mỗi phút cho mỗi khóa API.
- Tối đa 10.000 token cho mỗi lần chuyển.
- Tối đa 100.000 token được chuyển mỗi ngày cho mỗi khóa API.

---

## Mời & Đổi Token

**Tệp:** `src/lib/gamification/invites.ts`

### Định dạng mã

- **Mã**: 8 ký tự chữ và số (ví dụ: `A3K9-X7M2`), con người có thể đọc được,
  hiển thị cho người dùng.
- **Token**: token ngẫu nhiên 32 byte, được lưu dưới dạng hàm băm SHA-256. Được dùng để
  đổi theo chương trình (ví dụ: liên kết URL).

### Lưu trữ

| Cột          | Giá trị                                 |
| ------------ | --------------------------------------- |
| `code`       | `A3K9X7M2` (duy nhất, được lập chỉ mục) |
| `token_hash` | SHA-256(raw_token)                      |

Token thô được trả về cho người dùng đúng một lần tại thời điểm tạo. OmniRoute
không bao giờ lưu trữ hoặc hiển thị lại token đó — chỉ hàm băm được lưu giữ.

### Ngăn chặn tự giới thiệu

Khi người dùng đổi mã, hệ thống kiểm tra:

1. Mã thuộc về một `api_key_id` khác.
2. Người dùng đang đổi mã chưa từng đổi bất kỳ mã nào từ cùng
   người giới thiệu trước đó (kết nối trên `invite_tokens` + nhật ký đổi mã).

Nếu một trong hai bước kiểm tra thất bại, yêu cầu đổi mã sẽ bị từ chối với thông báo lỗi rõ ràng.

### Thời hạn & Giới hạn

- `max_uses` mặc định: 10 (có thể cấu hình khi tạo).
- `expires_at` mặc định: 30 ngày kể từ thời điểm tạo.
- Mã đã hết hạn hoặc hết lượt sử dụng sẽ trả về HTTP 410 Gone.

---

## Liên kết Máy chủ Cộng đồng

**Tệp:** `src/lib/gamification/servers.ts`

### Kết nối

Một máy chủ cộng đồng được đăng ký thông qua mã thông báo mời do máy chủ từ xa cấp. Phiên bản cục bộ:

1. Nhận mã thông báo mời (ví dụ: được dán vào bảng điều khiển).
2. Gọi `POST /api/gamification/federation/leaderboard` trên máy chủ từ xa để xác thực mã thông báo và lấy bảng xếp hạng hiện tại.
3. Lưu bản ghi máy chủ với `status: connected`.

### Mô hình Đồng bộ hóa

Liên kết sử dụng cơ chế **đồng bộ hóa ghi đè**, không phải cộng dồn:

```
Phiên bản Cục bộ               Máy chủ Cộng đồng
     │                              │
     ├── đẩy điểm ─────────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (máy chủ xác thực hàm băm mã thông báo)
     │                              │
     ├── lấy bảng xếp hạng ────────►│  GET /federation/leaderboard
     │◄── các mục top-N ────────────┤  (ghi đè bộ nhớ đệm cục bộ)
     │                              │
     └── kiểm tra tình trạng ──────►│  GET /federation/health
         (mỗi 60 giây, thời gian chờ 5 giây) │
```

### Xác thực

Các yêu cầu liên kết bao gồm:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Máy chủ từ xa băm mã thông báo và tra cứu hàng tương ứng trong `community_servers`. Điều này giúp tránh truyền giá trị băm đã lưu trữ.

### Giám sát Tình trạng

Mỗi bản ghi máy chủ theo dõi:

| Trường      | Mô tả                                                 |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | Dấu thời gian ISO của lần đồng bộ thành công gần nhất |
| `failures`  | Số lần kiểm tra tình trạng thất bại liên tiếp         |

Sau 5 lần thất bại liên tiếp, trạng thái chuyển thành `unreachable` và quá trình đồng bộ hóa bị tạm dừng cho đến khi một lần kiểm tra tình trạng thủ công thành công.

---

## Chống Gian lận

**Tệp:** `src/lib/gamification/antiCheat.ts`

### Tính điểm Phía Máy chủ

Mọi phép tính XP đều diễn ra trong `src/lib/gamification/xp.ts`. Máy khách không bao giờ gửi điểm — chúng gửi các hành động và máy chủ tính XP. Cột `leaderboard.score` chỉ có thể được ghi bởi mã phía máy chủ.

### Giới hạn Tần suất

| Giới hạn                       | Giá trị | Phạm vi               |
| ------------------------------ | ------- | --------------------- |
| XP tối đa mỗi phút             | 1,000   | Theo từng khóa API    |
| Số lượt chuyển tối đa mỗi phút | 10      | Theo từng khóa API    |
| Số lượng chuyển tối đa         | 10,000  | Theo từng lượt chuyển |
| Tổng chuyển tối đa mỗi ngày    | 100,000 | Theo từng khóa API    |

Các giới hạn tần suất sử dụng cửa sổ trượt trong bộ nhớ (theo cùng mẫu với `RateLimitManager` trong `open-sse/services/`). Hệ thống dự phòng sang các bộ đếm dựa trên SQLite nếu tiến trình khởi động lại.

### Phát hiện Bất thường bằng Điểm Z

Đối với mỗi khóa API, hệ thống duy trì một cửa sổ cuộn 7 ngày về lượng XP kiếm được mỗi giờ. Với mỗi lần trao XP:

1. Tính tốc độ kiếm XP theo giờ hiện tại của người dùng.
2. Tính giá trị trung bình và độ lệch chuẩn của quần thể.
3. Tính `z = (user_rate - mean) / stddev`.
4. Nếu `z > 3.0` (3 độ lệch chuẩn), đánh dấu là bất thường.

Các bất thường được ghi vào `xp_audit_log` với `action = 'anomaly_detected'` và hiển thị trên bảng điều khiển quản trị.

### Dấu vết Kiểm toán

Mọi lần trao XP, chuyển XP, nhận huy hiệu và phát hiện bất thường đều được ghi vào `xp_audit_log` với:

| Trường       | Mô tả                                                   |
| ------------ | ------------------------------------------------------- |
| `api_key_id` | Ai                                                      |
| `action`     | Điều gì đã xảy ra (xp_award, transfer, anomaly, …)      |
| `xp_awarded` | Số lượng (0 đối với các sự kiện không liên quan đến XP) |
| `metadata`   | JSON chứa ngữ cảnh (loại hành động, mục tiêu, …)        |
| `created_at` | Thời điểm (ISO 8601)                                    |

Quản trị viên có thể truy vấn toàn bộ dấu vết kiểm toán thông qua `GET /api/gamification/anomalies`.

---

## Các tuyến API

Tất cả các tuyến đều tuân theo mẫu OmniRoute tiêu chuẩn:

```
Tuyến → Kiểm tra sơ bộ CORS → Xác thực nội dung (Zod) → Xác thực (extractApiKey)
  → Trình xử lý
```

### Điểm cuối

| Phương thức | Đường dẫn                                  | Mô tả                                              | Xác thực |
| ----------- | ------------------------------------------ | -------------------------------------------------- | -------- |
| GET         | `/api/gamification/leaderboard`            | Lấy bảng xếp hạng (phạm vi, kỳ, phân trang)        | Tùy chọn |
| POST        | `/api/gamification/leaderboard`            | Buộc làm mới bộ nhớ đệm bảng xếp hạng              | Bắt buộc |
| GET         | `/api/gamification/stream`                 | Cập nhật bảng xếp hạng theo thời gian thực qua SSE | Tùy chọn |
| GET         | `/api/gamification/transfer`               | Lấy lịch sử chuyển token (phân trang)              | Bắt buộc |
| POST        | `/api/gamification/transfer`               | Gửi token cho người dùng khác                      | Bắt buộc |
| GET         | `/api/gamification/invite`                 | Liệt kê mã mời của tôi                             | Bắt buộc |
| POST        | `/api/gamification/invite`                 | Tạo mã mời mới                                     | Bắt buộc |
| DELETE      | `/api/gamification/invite`                 | Thu hồi mã mời                                     | Bắt buộc |
| POST        | `/api/gamification/invite/redeem`          | Đổi mã mời                                         | Bắt buộc |
| GET         | `/api/gamification/servers`                | Liệt kê các máy chủ cộng đồng                      | Bắt buộc |
| POST        | `/api/gamification/servers`                | Kết nối với máy chủ cộng đồng                      | Bắt buộc |
| DELETE      | `/api/gamification/servers`                | Ngắt kết nối khỏi máy chủ cộng đồng                | Bắt buộc |
| POST        | `/api/gamification/federation/score`       | Đẩy điểm tới máy chủ từ xa                         | Liên kết |
| GET         | `/api/gamification/federation/leaderboard` | Lấy bảng xếp hạng từ máy chủ từ xa                 | Liên kết |
| GET         | `/api/gamification/notifications`          | Thông báo huy hiệu/thăng cấp qua SSE               | Bắt buộc |
| GET         | `/api/gamification/anomalies`              | Xem báo cáo bất thường (quản trị viên)             | Quản trị |
| POST        | `/api/gamification/rotate`                 | Luân chuyển khóa bí mật của token mời              | Bắt buộc |

### Ví dụ về yêu cầu/phản hồi

**POST /api/gamification/transfer**

```json
// Yêu cầu
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Phản hồi 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Phản hồi 400 (không đủ số dư)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Công cụ MCP (8)

Được đăng ký trong `open-sse/mcp-server/` cùng với các công cụ hiện có. Được giới hạn trong
phạm vi quyền `gamification`.

| Công cụ                    | Mô tả                                                 | Lược đồ đầu vào              |           |
| -------------------------- | ----------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Lấy bảng xếp hạng theo phạm vi/kỳ                     | `{ scope, period?, limit? }` |
| `gamification_rank`        | Lấy thứ hạng và các vị trí lân cận của người gọi      | `{ scope }`                  |
| `gamification_profile`     | Lấy thông tin tóm tắt về XP, cấp độ, danh hiệu, chuỗi | `{}`                         |
| `gamification_badges`      | Liệt kê huy hiệu đã đạt hoặc tất cả định nghĩa        | `{ earned?: boolean }`       |
| `gamification_transfer`    | Gửi token cho người dùng khác                         | `{ to, amount }`             |
| `gamification_invite`      | Tạo hoặc liệt kê mã mời                               | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Liệt kê hoặc kết nối các máy chủ cộng đồng            | `{ action, token? }`         |
| `gamification_anomalies`   | Xem báo cáo bất thường (phạm vi quản trị viên)        | `{ limit?, since? }`         |

---

## Các trang bảng điều khiển

### `/dashboard/leaderboard`

- Hiển thị bục xếp hạng (3 vị trí dẫn đầu kèm ảnh đại diện và XP).
- Bộ chọn phạm vi: Toàn cầu / Hàng tuần / Hàng tháng / Token đã chia sẻ / Đóng góp.
- Bảng phân trang (25 mục mỗi trang) với thứ hạng, tên, điểm số, cấp độ, danh hiệu.
- Cập nhật theo thời gian thực qua SSE — các thay đổi thứ hạng được hiển thị bằng hiệu ứng chuyển động.
- Người dùng hiện tại được làm nổi bật trong bảng bằng hàng ghim "Thứ hạng của bạn".

### `/dashboard/profile`

- Thanh tiến trình XP với cấp độ hiện tại và ngưỡng cấp độ tiếp theo.
- Huy hiệu danh hiệu được hiển thị nổi bật.
- Bộ sưu tập huy hiệu — huy hiệu đã đạt kèm ngày đạt được, huy hiệu chưa đạt được hiển thị mờ
  (huy hiệu ẩn hiển thị "???" cho đến khi đạt được).
- Bộ đếm chuỗi kèm biểu tượng ngọn lửa; lịch chuỗi (30 ngày gần nhất).
- Biểu đồ lịch sử XP (XP hằng ngày trong 30 ngày gần nhất).

### `/dashboard/tokens`

- Số dư token (nổi bật, ở đầu trang).
- Biểu mẫu chuyển: người nhận, số lượng, hộp thoại xác nhận.
- Bảng lịch sử chuyển với các bộ lọc (đã gửi/đã nhận/tất cả).
- Phần lời mời: mã đang hoạt động, tạo mã mới, chia sẻ liên kết.
- Máy chủ cộng đồng: danh sách kèm trạng thái hoạt động, kết nối/ngắt kết nối.

### `/dashboard/gamification/admin`

- Danh sách bất thường với mức độ nghiêm trọng, người dùng, dấu thời gian, điểm z.
- Trình xem nhật ký kiểm tra với các bộ lọc (loại hành động, người dùng, phạm vi ngày).
- Thống kê hệ thống: tổng XP đã trao, người dùng đang hoạt động, tỷ lệ đạt huy hiệu.
- Tổng quan tình trạng máy chủ liên kết.

---

## Tích hợp pipeline

### Điểm tích hợp

Gamification được tích hợp vào pipeline xử lý yêu cầu tại một điểm duy nhất trong
`open-sse/handlers/chatCore.ts`:

```typescript
// Sau khi phản hồi được gửi đến máy khách:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Gửi và không chờ: ghi nhật ký nhưng không bao giờ truyền lỗi đến máy khách
  });
});
```

### Các loại sự kiện

| Loại sự kiện        | Thời điểm được phát                                             |
| ------------------- | --------------------------------------------------------------- |
| `request.completed` | Phản hồi LLM thành công đã được gửi                             |
| `provider.switch`   | Nhà cung cấp đã thay đổi (tính cả phương án dự phòng của combo) |
| `combo.created`     | Cấu hình combo mới đã được lưu                                  |
| `combo.used`        | Mục tiêu combo được truy cập thành công                         |
| `badge.earned`      | Quá trình đánh giá huy hiệu tìm thấy kết quả khớp               |
| `streak.milestone`  | Đã vượt qua ngưỡng chuỗi                                        |
| `transfer.sent`     | Quá trình chuyển token đã hoàn tất                              |
| `referral.redeemed` | Mã mời đã được sử dụng thành công                               |
| `compression.used`  | Tính năng nén prompt đã được áp dụng                            |
| `skill.executed`    | Quá trình thực thi kỹ năng đã hoàn tất                          |
| `model.first_use`   | Mô hình chưa được sử dụng trong 7 ngày qua                      |

### Đảm bảo không chặn

Mẫu `setImmediate` + `.catch(() => {})` đảm bảo:

1. Phản hồi được gửi hoàn toàn trước khi gamification chạy.
2. Lỗi gamification không bao giờ hiển thị cho máy khách.
3. Quá trình xử lý sự kiện chạy trong microtask tiếp theo, không chạy nội tuyến.

---

## Bảo mật

### Mô hình mối đe dọa

| Mối đe dọa                     | Biện pháp giảm thiểu                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| Thổi phồng điểm số             | Chỉ tính XP phía máy chủ; máy khách gửi hành động, không gửi điểm số                |
| Tấn công phát lại              | Khóa idempotency cho giao dịch chuyển; loại bỏ trùng lặp trong nhật ký kiểm toán    |
| Gian lận chuyển khoản          | Sổ cái ghi sổ kép; giao dịch nguyên tử; giới hạn tốc độ                             |
| Tự giới thiệu                  | Đối chiếu chéo `api_key_id` khi đổi thưởng                                          |
| Thao túng bảng xếp hạng        | Phát hiện bất thường bằng điểm Z; bảng điều khiển bất thường dành cho quản trị viên |
| Đánh cắp token liên kết        | Lưu trữ dưới dạng băm SHA-256; token thô chỉ được hiển thị một lần                  |
| Dò mã mời bằng vét cạn         | Giới hạn tốc độ trên endpoint đổi mã; entropy 8 ký tự                               |
| XSS trong tên hiển thị         | Tên hiển thị được làm sạch; các mục trên bảng xếp hạng được escape                  |
| Tấn công định thời vào hàm băm | Dùng `crypto.timingSafeEqual` để so sánh hàm băm token                              |

### Yêu cầu xác thực

- **Công khai** (không cần xác thực): `GET /leaderboard`, `GET /stream` (bảng
  xếp hạng chỉ đọc).
- **Yêu cầu khóa API**: tất cả thao tác ghi, hồ sơ, chuyển khoản và lời mời.
- **Chỉ quản trị viên**: bảng điều khiển bất thường, trình xem nhật ký kiểm toán.
- **Liên kết**: đường dẫn xác thực riêng sử dụng token thô trong header
  `Authorization`, được xác thực dựa trên hàm băm SHA-256 đã lưu trữ.

---

## Kiểm thử

### Tệp kiểm thử

Tất cả bài kiểm thử đều sử dụng trình chạy kiểm thử gốc của Node.js (`node --import tsx/esm --test`).

| Tệp kiểm thử                                  | Phạm vi kiểm thử                                | Số bài kiểm thử |
| --------------------------------------------- | ----------------------------------------------- | --------------- |
| `tests/unit/gamification/xp.test.ts`          | Tính XP, đường cong cấp độ, danh hiệu           | 8               |
| `tests/unit/gamification/badges.test.ts`      | Khớp tiêu chí huy hiệu, trao huy hiệu           | 10              |
| `tests/unit/gamification/streaks.test.ts`     | Logic chuỗi liên tiếp, cột mốc, trường hợp biên | 7               |
| `tests/unit/gamification/leaderboard.test.ts` | Tính thứ hạng, phân trang, xoay vòng            | 8               |
| `tests/unit/gamification/sharing.test.ts`     | Chuyển khoản, số dư, tính lũy đẳng              | 9               |
| `tests/unit/gamification/invites.test.ts`     | Tạo, đổi mã, hết hạn, tự giới thiệu             | 7               |
| `tests/unit/gamification/antiCheat.test.ts`   | Giới hạn tốc độ, điểm Z, ghi nhật ký kiểm toán  | 6               |
| `tests/unit/gamification/events.test.ts`      | Phát sự kiện, phân phối, xử lý lỗi              | 5               |

### Chạy kiểm thử

```bash
# Tất cả bài kiểm thử gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Một tệp kiểm thử
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Yêu cầu về độ bao phủ

Theo `CONTRIBUTING.md` — tất cả mô-đun mới phải có:

- Độ bao phủ nhánh >= 80%.
- Mọi hàm công khai được kiểm thử ít nhất một lần.
- Các luồng lỗi được kiểm thử (không đủ số dư, mã hết hạn, giới hạn tốc độ).

---

## Cấu trúc tệp

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Toàn bộ 8 bảng + chỉ mục
      gamification.ts                  # Mô-đun CRUD miền nghiệp vụ
    gamification/
      xp.ts                           # Tính toán XP, đường cong cấp độ, danh hiệu
      badges.ts                       # Định nghĩa huy hiệu, tiêu chí, đánh giá
      streaks.ts                      # Theo dõi chuỗi hoạt động hằng ngày
      leaderboard.ts                  # Tính toán thứ hạng, SSE, luân phiên
      antiCheat.ts                    # Giới hạn tần suất, điểm z, kiểm tra
      sharing.ts                      # Sổ cái chuyển token
      invites.ts                      # Mã mời/đổi thưởng
      servers.ts                      # Liên kết máy chủ cộng đồng
      events.ts                       # Bộ phát sự kiện (điểm tích hợp)
      notifications.ts                # Luồng thông báo SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST bảng xếp hạng
        leaderboard/stream/route.ts   # Cập nhật theo thời gian thực qua SSE
        transfer/route.ts             # GET/POST giao dịch chuyển
        invite/route.ts               # GET/POST/DELETE mã mời
        invite/redeem/route.ts        # POST đổi mã
        servers/route.ts              # GET/POST/DELETE máy chủ
        federation/score/route.ts     # POST đẩy điểm
        federation/leaderboard/route.ts # GET lấy bảng xếp hạng
        notifications/route.ts        # Thông báo qua SSE
        anomalies/route.ts            # GET báo cáo bất thường
        rotate/route.ts               # POST luân phiên khóa bí mật
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Trang xếp hạng
        profile/page.tsx               # Trang XP/huy hiệu/chuỗi hoạt động
        tokens/page.tsx                # Trang số dư/giao dịch chuyển/lời mời
        gamification/admin/page.tsx    # Giám sát bất thường dành cho quản trị viên
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Tài liệu này
```

---

## Chiến lược di chuyển

### Giai đoạn 1: Phần lõi backend (PR 1)

- Migration `060_create_gamification.sql` (8 bảng).
- `src/lib/db/gamification.ts` (mô-đun miền nghiệp vụ).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Điểm tích hợp trong `chatCore.ts`.
- Kiểm thử đơn vị cho XP, chuỗi hoạt động, sự kiện.

### Giai đoạn 2: Huy hiệu & bảng xếp hạng (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Định nghĩa huy hiệu trong các hằng số.
- Các route API bảng xếp hạng + luồng SSE.
- Kiểm thử đơn vị cho huy hiệu, bảng xếp hạng.

### Giai đoạn 3: Chia sẻ & lời mời (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Các route API chuyển token + lời mời.
- Kiểm thử đơn vị cho tính năng chia sẻ, lời mời, chống gian lận.

### Giai đoạn 4: Liên kết máy chủ & dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Các route API liên kết máy chủ.
- Các trang dashboard (bảng xếp hạng, hồ sơ, token, quản trị).
- Đăng ký các công cụ MCP.

---

## Các cân nhắc trong tương lai

- **Sự kiện theo mùa**: các bộ huy hiệu có thời hạn và mùa giải bảng xếp hạng.
- **Bảng xếp hạng đội**: nhóm người dùng theo tổ chức hoặc combo.
- **Hệ số nhân XP**: tăng XP trong các giai đoạn khuyến mãi.
- **Chia sẻ thành tích**: tạo thẻ huy hiệu có thể chia sẻ (hình ảnh OpenGraph).
- **Thông báo đẩy trên thiết bị di động**: thông báo dựa trên webhook cho các sự kiện huy hiệu/cấp độ.
- **API bảng xếp hạng**: API công khai dành cho các tích hợp của bên thứ ba.
