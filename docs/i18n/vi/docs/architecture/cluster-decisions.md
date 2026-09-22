# Cluster Decisions — Optional Sidecar Profiles (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Trạng thái:** đề xuất (đang chờ @diegosouzapw đánh giá)
**Ngày:** 2026-06-20
**Tham chiếu:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Tóm tắt

Hai profile compose tùy chọn (`memory`, `bifrost`) cho mô hình triển khai 8 dịch vụ hiện có trong [`docker-compose.yml`](../../docker-compose.yml). Hành vi khởi chạy mặc định **không thay đổi**: 3 bản sao `omniroute` + Caddy + Redis + CliproxyAPI. Hai profile mới bổ sung Qdrant và Bifrost dưới dạng các sidecar tùy chọn, được kích hoạt bằng `docker compose --profile <name> up`. **Không có dịch vụ hiện có nào bị loại bỏ hoặc thay thế.**

## Tại sao cách tiếp cận này thận trọng

Mô hình triển khai hiện tại của OmniRoute vốn đã gọn nhẹ và được kiểm chứng:

- **`redis:7-alpine`** xử lý khối lượng công việc giới hạn tốc độ/bộ nhớ đệm ở quy mô production.
- **SQLite + sqlite-vec + FTS5** đáp ứng nhu cầu bộ nhớ cục bộ + vector + tìm kiếm văn bản (xem [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** đã đóng vai trò là bộ cân bằng tải + điểm kết cuối TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** đã được tích hợp làm bộ định tuyến Tier-1 trong [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar có công tắc ngắt thông qua biến môi trường `BIFROST_ENABLED` — đặt `=0` để bỏ qua sidecar và chuyển sang luồng xử lý TS).

Hai profile này là **các tùy chọn mở rộng quy mô dành cho những mô hình triển khai đã đạt đến giới hạn của SQLite** — không phải các phương án di chuyển. Cả hai đều bị tắt theo mặc định.

## Hai profile

### `memory` — Sidecar bộ nhớ vector Qdrant

**Khi nào nên bật:**

- > 1M embedding cho mỗi mô hình triển khai (sqlite-vec bắt đầu chậm lại ở quy mô lớn).
- Mô hình triển khai nhiều bản sao cần chia sẻ trạng thái vector giữa `omniroute-1/2/3`.
- Bạn đã có một cụm Qdrant bên ngoài (Qdrant Cloud, tại chỗ).

**Thành phần được bổ sung:**

| Dịch vụ  | Image                   | Cổng        | Ghi chú                                               |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Chỉ mục HNSW; volume bền vững `omniroute_qdrant_data` |

**Kích hoạt:** đặt `qdrantEnabled = true` trong giao diện Settings **hoặc** đặt biến môi trường `QDRANT_HOST=qdrant`. Xem [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) để biết các quy tắc về thứ tự ưu tiên (bảng cài đặt → biến môi trường → giá trị mặc định).

**Biến môi trường:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (xem các dòng 1672-1683 trong `.env.example`).

### `bifrost` — Sidecar bộ định tuyến Tier-1 Bifrost

**Khi nào nên bật:**

- Bạn chạy ≥3 bản sao `omniroute` và muốn tập trung hóa việc luân chuyển nhà cung cấp trong một tiến trình Go duy nhất.
- Bạn muốn có một nơi kiểm toán/ghi nhật ký duy nhất cho các yêu cầu gửi đến nhà cung cấp thượng nguồn trên tất cả các bản sao.
- Bạn muốn mở rộng theo chiều ngang lớp định tuyến Tier-1 độc lập với các bản sao OmniRoute.

**Thành phần được bổ sung:**

| Dịch vụ   | Image                             | Cổng   | Ghi chú                                                                            |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Bộ định tuyến Tier-1 dựa trên Go; volume nhật ký bền vững `omniroute_bifrost_logs` |

**Kích hoạt:** đặt `BIFROST_BASE_URL=http://bifrost:8080` trong `.env.example`. Route proxy sidecar hiện có tại [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (được thêm trong PR #4381) sẽ tự động sử dụng giá trị này.

**Biến môi trường:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (xem các dòng 1685-1695 trong `.env.example`).

## Những gì PR này rõ ràng KHÔNG thực hiện

Luồng thảo luận ban đầu của issue đã đề xuất một đợt viết lại cụm quy mô lớn hơn. Sau khi rà soát đặc điểm khối lượng công việc thực tế, các thành phần sau đây bị **loại bỏ** vì những lý do đã nêu:

| Thành phần                           | Kết luận | Lý do                                                                                                                      |
| ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **LOẠI** | `redis:7-alpine` đã đáp ứng tốt khối lượng công việc giới hạn tốc độ ở quy mô production; chưa có giới hạn nào cần phá vỡ. |
| **NATS**                             | **LOẠI** | Mỗi replica `omniroute` là một tiến trình Node.js duy nhất; không tồn tại khối lượng công việc pub/sub đa tiến trình.      |
| **PostgreSQL**                       | **LOẠI** | SQLite + sqlite-vec + FTS5 đáp ứng cả 3 trường hợp sử dụng; 97 migration + quy trình đóng gói Electron cản trở di chuyển.  |
| **Neo4j**                            | **LOẠI** | Việc định tuyến là phép join 5 bảng; CTE đệ quy trên SQLite là đủ.                                                         |
| **MinIO**                            | **LOẠI** | Không có khối lượng công việc blob nhiều MB; hình ảnh/âm thanh được chuyển tiếp qua proxy.                                 |
| **pgvector / pg_ai / pg_textsearch** | **LOẠI** | Cùng lý do về giới hạn SQLite như PostgreSQL; hệ sinh thái pgvector bị phân mảnh.                                          |
| **HAProxy / Envoy**                  | **LOẠI** | Caddy đã thực hiện LB + TLS; cả hai đều bị loại rõ ràng khỏi vai trò router Tier-1 (xem `AGENTS.md`).                      |

Nếu một trường hợp sử dụng trong tương lai chứng minh được giá trị của một trong các thành phần này, tài liệu này là nơi cần sửa đổi.

## Lộ trình triển khai 4 tuần (nếu được phê duyệt)

1. **Tuần 1** — Merge PR này + xác minh các profile tùy chọn bằng stack compose gồm 3 replica.
2. **Tuần 2** — Kích hoạt đầy đủ Bifrost cho OpenAI/Claude/Gemini/Ollama (4 trong số hơn 14 provider) bằng route proxy sidecar tại [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (được kiểm soát bằng `BIFROST_ENABLED`, có thể ngắt tại runtime).
3. **Tuần 3** — Bật profile bộ nhớ Qdrant trong một deployment thử nghiệm duy nhất; đo chênh lệch độ trễ so với sqlite-vec.
4. **Tuần 4** — Kiểm tra tình trạng observability (mã thoát của `docker compose ps` + kiểm thử nhanh bằng `wget`); làm mới 71 trụ cột theo ADR-041.

## Các tệp được thay đổi trong PR này

| Tệp                                                | Thay đổi                                                                                                                                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 dòng: profile `memory` (Qdrant), profile `bifrost` (Bifrost), volume liên tục, kiểm tra tình trạng.                                                                                                                   |
| `.env.example`                                     | +24 dòng: `QDRANT_*` (6 biến), `BIFROST_*` (4 biến).                                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                    | +6 hàng trong phần 25 dành cho các biến môi trường `QDRANT_*`.                                                                                                                                                            |
| `src/lib/memory/qdrant.ts`                         | +33 dòng: chuỗi dự phòng biến môi trường (cài đặt → môi trường → mặc định) cho `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 dòng: 9 trường hợp kiểm thử mới để cố định thứ tự ưu tiên dự phòng của biến môi trường.                                                                                                                               |
| `docs/architecture/cluster-decisions.md` (tệp này) | MỚI — bản ghi quyết định cho các profile tùy chọn.                                                                                                                                                                        |
| `AGENTS.md`                                        | +1 dòng: con trỏ đến tài liệu này trong bảng tài liệu tham khảo.                                                                                                                                                          |

**Tổng số mã được tác động:** 4 tệp production (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 tệp kiểm thử (`qdrant-wiring.test.ts`), 2 tệp tài liệu (`cluster-decisions.md`, `AGENTS.md`).
