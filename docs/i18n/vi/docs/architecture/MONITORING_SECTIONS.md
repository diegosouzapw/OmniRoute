# Monitoring & Costs — Navigation Structure (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Được triển khai trong Nhóm B (kế hoạch 16). Xem `src/shared/constants/sidebarVisibility.ts`.

---

## Điều hướng cấp cao

Thanh bên của bảng điều khiển (sau Nhóm B) có các mục cấp cao nhất theo thứ tự sau:

```
Trang chủ
Nhà cung cấp
Tổ hợp
Khóa API
Cài đặt
Phân tích
Chi phí          ← MỚI (Nhóm B, kế hoạch 16)
Giám sát         ← ĐƯỢC TỔ CHỨC LẠI (Nhóm B, kế hoạch 16)
...
```

---

## Mục Chi phí (mới, cấp 1)

Tiền tố đường dẫn: `/dashboard/costs/`

| Mục               | URL                                  | Mô tả                                                  |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| Tổng quan         | `/dashboard/costs`                   | Bảng điều khiển chi phí tổng hợp (chuyển từ Phân tích) |
| Định giá          | `/dashboard/costs/pricing`           | Bảng giá theo từng mô hình                             |
| Ngân sách         | `/dashboard/costs/budget`            | Ngưỡng ngân sách + cảnh báo                            |
| Chia sẻ hạn ngạch | `/dashboard/costs/quota-share`       | Các nhóm Chia sẻ hạn ngạch + mức sử dụng               |
| Cấu hình gói      | `/dashboard/costs/quota-share/plans` | Ghi đè gói theo từng nhà cung cấp                      |

**Lý do**: Định giá, Ngân sách và Chia sẻ hạn ngạch trước đây nằm trong
`Giám sát > Tham số chi phí`. Việc chuyển chúng sang một mục cấp cao nhất riêng
giúp người dùng dễ tìm thấy mà không cần điều hướng qua các công cụ quan sát.

---

## Mục Giám sát (được tổ chức lại)

Mục Giám sát hiện có **Hoạt động ở trên cùng**, theo sau là **3 nhóm con**:

```
Giám sát
├── Hoạt động            ← Luồng dòng thời gian (mục cấp cao nhất)
├── Nhóm Nhật ký
│   ├── Nhật ký (tất cả)
│   ├── Nhật ký proxy
│   └── Nhật ký bảng điều khiển
├── Nhóm Kiểm tra
│   ├── Nhật ký kiểm tra
│   ├── Kiểm tra MCP
│   └── Kiểm tra A2A
└── Nhóm Hệ thống
    ├── Tình trạng
    └── Thời gian chạy
```

### Những thay đổi so với cấu trúc cũ

| Trước đây                                                                                                           | Sau khi thay đổi                                      |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Hoạt động = tab bên trong Nhật ký, hiển thị Nhật ký kiểm tra                                                        | Hoạt động = luồng chuyên biệt (`/dashboard/activity`) |
| Nhóm Tham số chi phí trong Giám sát                                                                                 | Chuyển sang mục Chi phí                               |
| Danh sách phẳng: Nhật ký, Hoạt động (nhật ký), Kiểm tra, Tình trạng, Thời gian chạy, Định giá, Ngân sách, Hạn ngạch | Cấu trúc gồm 3 nhóm + mục Chi phí chuyên biệt         |

---

## Hoạt động so với Nhật ký kiểm tra

Hai mục này hiện đã tách biệt:

| Khía cạnh            | Hoạt động (`/dashboard/activity`)                            | Nhật ký kiểm tra (`/dashboard/audit`)                 |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| **Mục đích**         | Luồng sự kiện dành cho người dùng ("gần đây đã xảy ra gì")   | Nhật ký tuân thủ / bảo mật                            |
| **Nguồn dữ liệu**    | `GET /api/compliance/audit-log?level=high`                   | `GET /api/compliance/audit-log?level=all`             |
| **Định dạng**        | Dòng thời gian, nhóm theo ngày, động từ dễ hiểu + biểu tượng | Bảng dữ liệu dày đặc có phân trang, 50/trang          |
| **Bộ lọc**           | Danh mục loại sự kiện                                        | Hành động, mức độ nghiêm trọng, tác nhân, khoảng ngày |
| **Xuất dữ liệu**     | Không khả dụng                                               | Xuất JSON                                             |
| **Bộ lọc tác nhân**  | Không áp dụng                                                | Có thể lọc theo tác nhân                              |
| **Sự kiện hiển thị** | Chỉ các hành động cấp cao (danh sách cho phép)               | Tất cả sự kiện kiểm tra                               |

### Danh sách cho phép các hành động cấp cao

Được định nghĩa trong `src/lib/audit/highLevelActions.ts`. Danh sách này kiểm soát
những sự kiện xuất hiện trong luồng Hoạt động. Danh sách cho phép bao gồm:

- Các sự kiện thêm/xóa/kiểm tra nhà cung cấp
- Tạo/cập nhật/xóa tổ hợp
- Vòng đời khóa API (tạo, thu hồi, xoay vòng)
- Đạt ngưỡng ngân sách
- Đăng nhập/đăng xuất xác thực
- Tạo phiên tác nhân đám mây
- Đăng ký công cụ MCP
- Tạo/xóa webhook
- Thay đổi nhóm/gói hạn ngạch (các hành động `quota.*`, Nhóm B)
- Sự kiện nền tảng (cập nhật, triển khai)
- Cài đặt/gỡ bỏ kỹ năng

Các sự kiện không có trong danh sách này chỉ xuất hiện trong Nhật ký kiểm tra.

### Thêm một hành động cấp cao mới

Chỉnh sửa `src/lib/audit/highLevelActions.ts` và thêm chuỗi hành động vào
`HIGH_LEVEL_ACTIONS`. Thay đổi này yêu cầu một PR (danh sách nằm trong mã nguồn,
không thể cấu hình qua DB). Biểu tượng tương ứng có thể được thêm vào
`src/lib/audit/activityIcons.ts`.

---

## Chuyển hướng: `/dashboard/logs/activity`

Đường dẫn cũ `/dashboard/logs/activity` được chuyển hướng vĩnh viễn (HTTP 308) đến
`/dashboard/activity` thông qua `permanentRedirect()` trong
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

ID thanh bên cũ `logs-activity` được giữ lại trong `HIDEABLE_SIDEBAR_ITEM_IDS`
(nhưng bị xóa khỏi `SIDEBAR_DEFINITIONS`) để tránh làm hỏng các thiết lập sẵn của
người dùng có tham chiếu đến ID cũ.

---

## i18n

Các namespace được Nhóm B bổ sung:

| Khóa namespace          | Phạm vi                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Nhãn mục Chi phí                                                              |
| `sidebar.activity`      | Mục Hoạt động trên thanh bên                                                  |
| `sidebar.logsGroup`     | Nhãn nhóm con Nhật ký                                                         |
| `sidebar.systemGroup`   | Nhãn nhóm con Hệ thống                                                        |
| `sidebar.costsOverview` | Mục tổng quan Chi phí                                                         |
| `activity.*`            | Tất cả chuỗi của trang Hoạt động (tiêu đề, động từ, bộ lọc, trạng thái trống) |

Các locale nguồn chuẩn: `pt-BR` và `en`. Tất cả 40 locale còn lại sẽ dự phòng về
tiếng Anh thông qua cơ chế dự phòng của `next-intl` (được cấu hình trong `src/i18n/config.ts`).
