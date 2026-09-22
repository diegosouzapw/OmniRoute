# Quota Sharing Engine (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Tham chiếu tài liệu**: `docs/routing/QUOTA_SHARE.md`
> Thuộc Nhóm B (kế hoạch 16 + 22).

---

## Tổng quan

Quota Sharing Engine phân phối hạn mức dựa trên thời gian của nhà cung cấp (ví dụ: cửa sổ
5 giờ của Codex, 1500 req/h của Kimi) một cách công bằng giữa nhiều khóa API dùng chung
một kết nối.

**Vấn đề được giải quyết:** OmniRoute dùng nhiều khóa API để truy cập cùng một tài khoản
nhà cung cấp thượng nguồn. Nếu không có logic chia sẻ, lưu lượng tăng đột biến từ khóa A có thể làm cạn
hạn mức của nhà cung cấp trong giờ đó, khiến các khóa B và C bị chặn cho đến khi cửa sổ được đặt lại.
Engine ngăn chặn điều này bằng cách:

1. Theo dõi mức tiêu thụ trượt của từng khóa theo mỗi chiều (%, yêu cầu, token, $).
2. Áp dụng thuật toán chia sẻ công bằng bảo toàn công việc: một khóa có thể mượn từ các
   phần chia đang nhàn rỗi khi nhóm toàn cục chưa bão hòa.
3. Thực thi kết quả trên đường dẫn nóng (`chatCore.ts`) trước khi yêu cầu
   đến trình thực thi thượng nguồn.

---

## Thuật toán: Chia sẻ công bằng bảo toàn công việc

Được triển khai trong `src/lib/quota/fairShare.ts`.

### Chế độ

| Điều kiện                                  | Chế độ          | Hành vi                                                         |
| ------------------------------------------ | --------------- | --------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Hào phóng**   | Khóa có thể mượn đến giới hạn toàn cục trừ tổng mức đã tiêu thụ |
| `globalUsedPercent >= saturationThreshold` | **Nghiêm ngặt** | Thực thi nghiêm ngặt phần chia công bằng riêng                  |

Giá trị mặc định `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Quyết định theo từng chiều

Đối với mỗi chiều đang hoạt động trong nhóm, engine tính toán:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = giá trị trượt hiện tại của khóa này (từ QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Sau đó:

- **`policy = hard`**: nếu `consumed > fairShareAllowed` và chế độ là nghiêm ngặt → **chặn**.
- **`policy = soft`**: nếu `consumed > fairShareAllowed` và chế độ là nghiêm ngặt → **phạt** (giảm mức ưu tiên trong tổ hợp; không bao giờ chặn cứng).
- **`policy = burst`**: cho phép khi dung lượng toàn cục vẫn còn, bất kể phần chia công bằng.

### Giới hạn tuyệt đối

`capValue` + `capUnit` trên một phân bổ là giới hạn cứng, không phụ thuộc vào chế độ hoặc
chính sách. Bất kỳ chiều nào có `consumed >= capValue` đều luôn **chặn** yêu cầu.

### Kiểm tra đa chiều

Một yêu cầu bị chặn nếu **bất kỳ** chiều nào trong nhóm có kết quả chặn. Các chiều
độc lập với nhau — việc cạn kiệt 5h% không ảnh hưởng đến chiều weekly%.

### Vay mượn

Trong chế độ hào phóng, một khóa có mức tiêu thụ thấp hơn phân bổ có thể sử dụng phần dư từ
các phần chia chưa được phân bổ của những khóa khác. Công thức là:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

trong đó `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Giới hạn toàn cục
(`limit` của nhóm cho chiều đó) luôn là giới hạn cứng.

---

## Bộ đếm cửa sổ trượt

Được triển khai trong `src/lib/quota/sqliteQuotaStore.ts` và `redisQuotaStore.ts`.

Hai bucket cho mỗi `(apiKeyId, dimensionKey)`:

- `curr`: bucket hiện tại (`floor(nowMs / windowMs)`)
- `prev`: bucket trước đó (`curr - 1`)

Giá trị trượt hiệu dụng:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Độ chính xác**: chính xác khoảng 99%. Sai số tối đa là 1% kích thước cửa sổ tại
ranh giới giữa các bucket (vốn có trong phép xấp xỉ 2 bucket).

### Đồng thời

Trình điều khiển SQLite: mutex trong bộ nhớ cho mỗi khóa `(apiKeyId | dimensionKey)` ngăn chặn
tình trạng tranh chấp đọc-sửa-ghi. Mẫu này tương tự cơ chế chống thundering-herd của `src/sse/services/auth.ts`.

Trình điều khiển Redis: tập lệnh Lua EVAL để tăng nguyên tử — chạy dưới dạng một lệnh Redis duy nhất.

---

## Trình điều khiển

### SQLite (mặc định, không cần cài đặt)

- Bảng: `quota_consumption` (xem migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Phù hợp nhất cho các triển khai đơn phiên bản.
- Toàn bộ dữ liệu lưu trữ bền vững nằm trong DB SQLite hiện có của OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (tùy chọn, đa phiên bản)

- Yêu cầu package npm `ioredis`.
- Các bộ đếm được lưu trong Redis; siêu dữ liệu (pool/phân bổ) vẫn được lưu trong SQLite.
- Phù hợp nhất cho các triển khai nhiều replica, nơi các bộ đếm phải được chia sẻ.

### Chuyển đổi trình điều khiển

Thông qua giao diện cài đặt (`/dashboard/settings` → Quota Store), hoặc thông qua các biến môi trường:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Cài đặt DB được ưu tiên hơn biến môi trường. Nếu `driver=redis` nhưng thiếu URL hoặc
`ioredis` chưa được cài đặt, factory sẽ quay về sử dụng SQLite và ghi log cảnh báo.

Thứ tự lựa chọn trình điều khiển:

1. Cài đặt DB `quotaStore.driver`
2. Biến môi trường `QUOTA_STORE_DRIVER`
3. Mặc định: `sqlite`

---

## Đa chiều

Một pool có thể có nhiều chiều. Mỗi chiều hoạt động độc lập:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // giới hạn trần toàn cục của pool cho chiều này
}
```

**Ví dụ: gói Codex** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Một yêu cầu phải thỏa mãn tất cả các chiều mới được phép.

---

## Bộ phân giải gói

Được triển khai trong `src/lib/quota/planResolver.ts`.

Thứ tự ưu tiên (từ cao xuống thấp):

1. **Ghi đè thủ công trong DB** — bảng `provider_plans`, theo từng `connectionId`.
2. **Danh mục đã biết** — `src/lib/quota/planRegistry.ts` (chỉ chứa dữ liệu).
3. **Gói trống** — không có chiều nào, yêu cầu cấu hình thủ công.

### Danh mục đã biết

| Nhà cung cấp          | Các chiều                                                     |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, chưa xác định), `tokens/weekly`         |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Không có mặc định — yêu cầu cấu hình thủ công                 |

---

## Tích hợp pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

Chạy trước trình thực thi upstream, sau các bước kiểm tra xác thực và chính sách:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() cho từng chiều
      → fairShare.decideFairShare()
      → nếu chặn → trả về 429 (buildErrorBody, Quy tắc cứng #12)
      → nếu cho phép + hạ ưu tiên → đặt quotaSoftPenalty=true trên ứng viên
  → executor.execute()
```

**Cho phép khi lỗi**: nếu `enforceQuotaShare` phát sinh lỗi, yêu cầu vẫn được cho phép đi qua
và lỗi được ghi bằng log `pino.warn`. Điều này ngăn lỗi của quota engine chặn toàn bộ
lưu lượng.

### Hook POST (ghi nhận mức tiêu thụ)

Sau một phản hồi thành công:

```
executor trả về thành công
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() cho từng chiều
      → cho phép khi lỗi: lỗi được ghi bằng pino.warn, không bao giờ truyền đến client
```

**Lưu ý về độ lệch**: nếu `consume` thất bại sau phản hồi, bộ đếm cuốn chiếu sẽ ghi nhận thiếu.
Tín hiệu bão hòa từ nhà cung cấp (ví dụ: `anthropic-ratelimit-unified-5h-utilization`)
sẽ hiệu chỉnh ước tính toàn cục ở yêu cầu tiếp theo.

### Mức phạt mềm cho combo (`open-sse/services/combo.ts`)

Khi `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // mặc định là 0.7
}
```

Mức phạt được áp dụng sau tất cả các hệ số chấm điểm khác. Nó làm giảm xác suất
auto-combo chọn một key đã bão hòa mà không chặn cứng key đó.

---

## Hướng dẫn giao diện người dùng

### `/dashboard/costs/quota-share` — Trang nhóm chính

Các thành phần (tất cả nằm trong `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Thành phần             | Mục đích                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Thẻ giới thiệu giải thích việc chia sẻ hạn ngạch cho người dùng mới       |
| `CreatePoolModal`      | Tạo nhóm hạn ngạch mới (kết nối + tên + phân bổ ban đầu)                  |
| `PoolCard`             | Tóm tắt theo nhóm: tên, kết nối, số lượng phân bổ                         |
| `DimensionBar`         | Thanh xếp chồng theo chiều: phần của từng khóa + mức sử dụng toàn cục     |
| `AllocationTable`      | Bảng hiển thị mức đã dùng, phần công bằng, thiếu hụt/dư thừa, cờ vay mượn |
| `BurnRateChart`        | Biểu đồ đường tốc độ tiêu thụ EMA (tải lười Recharts qua `dynamic()`)     |
| `EditAllocationsModal` | Chỉnh sửa trọng số phân bổ, giới hạn và chính sách cho một nhóm           |

Các hook của trang:

- `usePools` — truy xuất `GET /api/quota/pools` mỗi 30 giây.
- `usePoolUsage` — truy xuất `GET /api/quota/pools/[id]/usage` theo yêu cầu.
- `useLocalStoragePoolMigration` — chạy một lần khi gắn kết để di chuyển dữ liệu LS cũ.

### `/dashboard/costs/quota-share/plans` — Cấu hình gói của nhà cung cấp

- `ProviderPlanConfigClient.tsx`: danh sách thả xuống để chọn nhà cung cấp, xem
  gói đã phân giải (tự động từ danh mục hoặc ghi đè thủ công) và chỉnh sửa các chiều.
- Các thay đổi được ghi vào `PUT /api/quota/plans/[connectionId]`.
- Việc xóa sẽ hoàn nguyên về danh mục hoặc gói trống.

---

## Biến môi trường

| Biến                               | Mặc định  | Mô tả                                                      |
| ---------------------------------- | --------- | ---------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`  | Trình điều khiển cần dùng: `sqlite` hoặc `redis`           |
| `QUOTA_STORE_REDIS_URL`            | _(trống)_ | URL Redis, ví dụ: `redis://localhost:6379`                 |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`     | 0..1; `>= ngưỡng` kích hoạt chế độ nghiêm ngặt             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`     | 0..1; hệ số nhân cho điểm kết hợp của chính sách mềm       |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`      | Số ngày trước khi GC xóa các bucket `quota_consumption` cũ |

Các cài đặt DB (`quotaStore.*`) ghi đè các biến môi trường.

---

## Khắc phục sự cố

### Redis đã được cấu hình nhưng không kết nối

Kiểm tra xem `ioredis` đã được cài đặt chưa (`npm ls ioredis`) và có thể truy cập
`QUOTA_STORE_REDIS_URL` hay không. Khi kết nối thất bại, factory sẽ chuyển sang
SQLite (được ghi nhật ký ở mức `warn`).

### `peek` trả về dữ liệu cũ / cho phép khi xảy ra lỗi

Nếu `peek` phát sinh ngoại lệ, `enforceQuotaShare` sẽ xử lý kết quả là "cho phép"
(cho phép khi xảy ra lỗi). Kiểm tra nhật ký `pino` để tìm các mục `quota:enforce`
và `quota:factory` nhằm xác định nguyên nhân gốc rễ.

### Sai lệch bộ đếm mức tiêu thụ

Nếu mức sử dụng thực tế của nhà cung cấp khác với các bộ đếm thì đây là điều có
thể dự kiến — cửa sổ trượt 2 bucket có sai số khoảng 1% tại các ranh giới cửa sổ,
và `consume` được thực thi theo kiểu gửi rồi không chờ sau phản hồi. Tín hiệu bão
hòa (`saturationSignals.ts`) đọc mức sử dụng thực tế của nhà cung cấp với TTL 30
giây và điều chỉnh `globalUsedPercent` tương ứng.

### Nhóm hiển thị "không có dữ liệu" cho tốc độ tiêu thụ

`computeBurnRate` yêu cầu ít nhất 2 mẫu lịch sử. Các nhóm mới chưa có lệnh gọi
`consume` trước đó sẽ hiển thị `tokensPerSecond: 0` và `timeToExhaustionMs: null`.

---

## Di chuyển từ localStorage

Khi `/dashboard/costs/quota-share` được tải lần đầu, hook `useLocalStoragePoolMigration`
sẽ kiểm tra:

1. `localStorage.getItem("omniroute:quota-share:pools")` không rỗng.
2. `GET /api/quota/pools` trả về `[]` (DB đang trống).

Nếu cả hai điều kiện đều đúng, hook sẽ gửi từng pool cũ đến `POST /api/quota/pools` theo lô,
sau đó xóa khóa localStorage. Quá trình di chuyển có tính lũy đẳng: điều kiện 2 ngăn việc
di chuyển lại.

---

## Phân loại chiến lược nội bộ

`quota-share` là một chiến lược định tuyến **chỉ dành cho nội bộ** (`INTERNAL_ROUTING_STRATEGY_VALUES` trong
`src/shared/constants/routingStrategies.ts`). Chiến lược này được sử dụng riêng cho các tổ hợp pool `qtSd/`
do hệ thống tạo và được cố ý loại khỏi `ROUTING_STRATEGY_VALUES` để không bao giờ
xuất hiện dưới dạng tùy chọn mà người dùng có thể chọn trong UI hoặc API.

---

## Phạm vi kiểm thử

Công cụ quota-share đi kèm hai lớp kiểm thử tự động:

| Bộ kiểm thử          | Lệnh                                                                   | Phạm vi kiểm thử                                                                                                                                                                                                               |
| :------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đơn vị (29 kiểm thử) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Bộ lập lịch DRR, cơ chế chặn khi bão hòa, giới hạn đồng thời, phép tính fairShare, xếp hàng backlog                                                                                                                            |
| Ma trận tích hợp     | `npm run test:combo:matrix`                                            | Quyết định định tuyến đầu cuối thông qua pipeline tổ hợp thực tế; tính công bằng DRR + giảm ưu tiên khi bão hòa thông qua các điểm nối trực tiếp (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Ma trận tích hợp chạy trong CI cùng với toàn bộ 19 chiến lược công khai. Bộ kiểm thử đơn vị
có thể chạy độc lập.

---

## Tóm tắt lược đồ DB

Ba bảng được thêm bởi các migration `078`, `079` và `085`:

- `quota_pools` + `quota_allocations` — định nghĩa pool và phân bổ theo từng khóa.
- `quota_consumption` — các bộ đếm luân phiên gồm 2 bucket cho mỗi `(apiKeyId, dimensionKey)`.
- `provider_plans` — các ghi đè thủ công đối với gói của nhà cung cấp (dimensions JSON cho mỗi connectionId).

Tất cả các bảng được thêm thông qua các migration `CREATE TABLE IF NOT EXISTS` có tính lũy đẳng.
