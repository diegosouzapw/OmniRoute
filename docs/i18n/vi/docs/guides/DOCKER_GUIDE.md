# 🐳 Docker Guide — OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Tài liệu tham khảo đầy đủ về triển khai Docker. Để bắt đầu nhanh, hãy xem [phần Docker trong README](../README.md#-docker).

## Mục lục

- [Chạy nhanh](#quick-run)
- [Với tệp môi trường](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Các profile khả dụng](#available-profiles)
- [Cấu hình các công cụ CLI trên máy chủ khi OmniRoute chạy trong Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose cho môi trường production](#production-compose)
- [Các stage của Dockerfile](#dockerfile-stages)
- [Các biến môi trường quan trọng](#critical-environment-variables)
- [Docker Compose với Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Các tag image](#image-tags)
- [Khả năng sẵn sàng: SQLite mặc định chỉ hỗ trợ một replica](#availability-default-sqlite-is-single-replica)
- [Lưu ý quan trọng](#important-notes)

---

## Chạy nhanh

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Với tệp môi trường

```bash
# Trước tiên, sao chép và chỉnh sửa .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profile cơ sở (không có công cụ CLI)
docker compose --profile base up -d

# Profile CLI (tích hợp sẵn Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Profile máy chủ (ưu tiên Linux; gắn các tệp nhị phân CLI của máy chủ ở chế độ chỉ đọc)
docker compose --profile host up -d

# Kết hợp CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Các profile khả dụng

OmniRoute cung cấp bốn profile Compose. Hãy chọn profile phù hợp với môi trường của bạn.

| Profile           | Dịch vụ          | Khi nào nên sử dụng                                                                                                                                            | Lệnh                                         |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (mặc định) | `omniroute-base` | Máy chủ headless / môi trường runtime tối thiểu, không kèm theo CLI của nhà cung cấp                                                                           | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Quy trình làm việc theo tác tử gọi `omniroute providers/setup/doctor` và các CLI đi kèm (Codex, Claude Code, Droid, OpenClaw)                                  | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Máy chủ Linux cần quyền truy cập tương tự `network_mode` vào các CLI trên máy chủ bằng cách gắn `~/.local/bin`, `~/.codex`, `~/.claude`, v.v. ở chế độ chỉ đọc | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Chạy sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) trên cổng `8317` để proxy CLI thượng nguồn                                            | `docker compose --profile cliproxyapi up -d` |

> Có thể kết hợp nhiều profile: `docker compose --profile cli --profile cliproxyapi up -d`.

## Cấu hình các công cụ CLI trên máy host khi OmniRoute chạy trong Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` và nút
**Lưu cấu hình** trên bảng điều khiển đều ghi các tệp như `~/.codex/*.config.toml`. Những đường dẫn đó
chỉ có ý nghĩa trên máy nơi CLI thực sự chạy. Nếu chạy chúng bên trong
container, dữ liệu sẽ được ghi vào thư mục home riêng của container (`/home/node` —
image chạy với `USER node`), nơi không CLI nào trên máy host có thể đọc được và dữ liệu sẽ
bị loại bỏ ngay khi container được tạo lại.

OmniRoute phát hiện điều này và từ chối thao tác ghi, đồng thời cung cấp hướng dẫn thay vì
báo thành công nhưng không thể sử dụng: CLI thoát với mã `2`, còn API phản hồi `422`
với `containerEphemeralTarget: true`.

### Khuyến nghị: chạy CLI trên máy host, chạy OmniRoute trong Docker

Container cung cấp API; CLI cấu hình các công cụ trên máy host của bạn.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # trỏ CLI đến container
omniroute setup-codex                      # ghi vào ~/.codex thực tế trên máy host của bạn
```

Đây là lựa chọn phù hợp khi Codex, Claude Code, Cursor hoặc các công cụ tương tự chạy trên
máy tính xách tay của bạn — cũng là cách thiết lập thông thường.

### Phương án thay thế: bind-mount các thư mục cấu hình của máy host (profile `host`)

Nếu bạn muốn chính container ghi cấu hình trên máy host, hãy mount các
thư mục vào và trỏ `CLI_CONFIG_HOME` đến thư mục gốc của mount. Profile `host`
đã thực hiện sẵn việc này:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount là yếu tố giúp đường dẫn trở nên đáng tin cậy: OmniRoute đọc
`/proc/self/mountinfo` và cho phép ghi vào các đường dẫn đã được mount (cũng như vào các thư mục
có thư mục con là điểm mount, chính xác như cấu trúc `/host-home` ở trên), trong khi
vẫn từ chối những đường dẫn chưa được mount.

### Lối thoát: cấu hình các CLI riêng của container (chỉ sử dụng khi thật sự cần thiết)

Khi các CLI thực sự nằm bên trong container (profile `cli`), thao tác ghi
là có chủ đích. Truyền `--allow-container-write` cho bất kỳ lệnh `setup-*` nào hoặc đặt
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` cho máy chủ. Thao tác ghi sẽ được thực hiện
kèm theo cảnh báo rằng dữ liệu sẽ không tồn tại sau khi container bị xóa.

> **Cảnh báo bảo mật — profile `cli` + mount `docker.sock`.**
> Profile `cli` bind-mount `/var/run/docker.sock` để trình tự động cập nhật
> bên trong container có thể tạo lại stack thông qua daemon trên máy host
> (`src/lib/system/autoUpdate.ts` dò tìm socket đó và bỏ qua
> quy trình Docker khi không có socket). Socket đó là **ranh giới tin cậy cấp root
> của máy host**: bất kỳ thành phần nào có thể truy cập socket đều có thể điều khiển Docker daemon trên máy host với
> quyền root — nó có thể tạo, kiểm tra, dừng và xóa bất kỳ container nào trên máy host.
> Các hệ quả:
>
> 1. **Không bao giờ để cổng của profile `cli` lộ ra mạng.** Chỉ publish
>    trên `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — việc để profile `cli` có thể được truy cập từ mạng LAN sẽ biến bất kỳ lỗ hổng RCE nào ở cấp
>    bảng điều khiển thành sự xâm phạm toàn bộ máy host.
> 2. **Không bind thêm bất kỳ thư mục nào của máy host vào profile `cli`.**
>    Docker socket kết hợp với bất kỳ mount bổ sung nào sẽ cấp cho container toàn quyền
>    đọc/ghi hệ thống tệp và cấu hình trên máy host của bạn. Nếu cần một công cụ
>    truy cập dự án, hãy chạy công cụ đó cục bộ bằng tệp thực thi CLI — không mount dự án
>    vào container `cli`.
>
> Nếu không cần tự động cập nhật bên trong container, hãy tắt profile `cli`
> (`COMPOSE_PROFILES=core,redis` hoặc giá trị ngắn hơn). Các profile khác không
> mount Docker socket.
>
> Xem `docs/security/MITM-TPROXY-DECRYPT.md` (trong git; không được biên dịch vào `/docs`) để biết mô hình mối đe dọa liên quan
> đến MITM, và `docs/security/SUPPLY_CHAIN.md` để biết chuỗi nguồn gốc tệp thực thi
> `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

OmniRoute dựa vào Redis để hỗ trợ bộ giới hạn tốc độ phân tán và bộ nhớ đệm dùng chung. Dịch vụ `redis` **luôn được định nghĩa** trong `docker-compose.yml` (không bị giới hạn bởi profile) và khởi động cùng với bất kỳ profile nào khác.

| Chi tiết              | Giá trị                                     |
| --------------------- | ------------------------------------------- |
| Image                 | `redis:7-alpine`                            |
| Tên container         | `omniroute-redis`                           |
| Cổng nội bộ           | `6379`                                      |
| Cổng máy chủ (ghi đè) | `REDIS_PORT` (mặc định là `6379`)           |
| Địa chỉ bind (ghi đè) | `REDIS_BIND_HOST` (mặc định là `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`            |
| Kiểm tra tình trạng   | `redis-cli ping` (khoảng thời gian 10 giây) |

Các biến môi trường liên quan:

- `REDIS_URL` — chuỗi kết nối được đưa vào ứng dụng (mặc định là `redis://redis:6379`).
- `REDIS_PORT` — ánh xạ cổng phía máy chủ cho container Redis.
- `REDIS_BIND_HOST` — giao diện mạng máy chủ mà cổng được công khai trên đó. Mặc định là `127.0.0.1`.

> **Tại sao mặc định dùng địa chỉ loopback:** sidecar chạy mà không có `requirepass`, còn các
> container ứng dụng truy cập nó qua mạng compose (`redis:6379`) — cổng được công khai
> chỉ dành cho các công cụ phía máy chủ (`redis-cli`, `npm run dev` cục bộ). Việc công khai trên
> `0.0.0.0` sẽ khiến một Redis không được xác thực có thể bị mọi máy chủ trong mạng LAN của bạn truy cập. Nếu đặt
> `REDIS_BIND_HOST=0.0.0.0`, hãy thêm cả `--requirepass` vào `command:` của dịch vụ.

Bạn **không nên tắt Redis** (bộ giới hạn tốc độ sẽ chuyển sang cơ chế dự phòng trong bộ nhớ với hiệu năng thấp hơn). Nếu bắt buộc, hãy xóa/đánh dấu chú thích khối dịch vụ `redis:` trong `docker-compose.yml` hoặc giảm số lượng instance xuống 0:

```bash
docker compose up -d --scale redis=0
```

## Compose cho môi trường production

Để chạy một bản snapshot production độc lập song song với môi trường dev, hãy sử dụng `docker-compose.prod.yml`.

| Chi tiết                | Giá trị                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Tệp                     | `docker-compose.prod.yml`                                                              |
| Cổng dashboard mặc định | `PROD_DASHBOARD_PORT=20130` (được ánh xạ tới `${DASHBOARD_PORT:-20128}` nội bộ)        |
| Cổng API mặc định       | `PROD_API_PORT=20131`                                                                  |
| Image                   | `omniroute:prod` (được build từ target `runner-cli`)                                   |
| Container Redis         | `omniroute-redis-prod` (`redis:8.6.2`, volume `redis-prod-data` chuyên dụng)           |
| Volume dữ liệu          | `omniroute-prod-data` (có tên, được duy trì qua các lần build lại)                     |
| Kiểm tra tình trạng     | `node healthcheck.mjs` + `redis-cli ping`, với `depends_on` phụ thuộc tình trạng Redis |

Cách sử dụng:

```bash
# Build và khởi động stack production
docker compose -f docker-compose.prod.yml up -d --build

# Theo dõi log trực tiếp
docker compose -f docker-compose.prod.yml logs -f

# Dừng và gỡ bỏ stack (giữ lại các volume)
docker compose -f docker-compose.prod.yml down
```

Stack production chạy song song với compose dev (sử dụng tên container, cổng và volume khác nhau), vì vậy bạn có thể tiếp tục phát triển cục bộ trong khi môi trường production vẫn hoạt động.

## Các giai đoạn Dockerfile

Kho lưu trữ cung cấp một Dockerfile nhiều giai đoạn (`Dockerfile`). Có ba giai đoạn được công khai; hãy chọn `target` phù hợp với trường hợp sử dụng của bạn.

| Giai đoạn     | Ảnh cơ sở             | Mục đích                                                                                                                                                                                            |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Cài đặt các dependency (`npm ci --legacy-peer-deps`) và chạy `npm run build` (mặc định dùng Turbopack — xem phần Tài nguyên khi build bên dưới)                                                     |
| `runner-base` | `node:26-trixie-slim` | Môi trường runtime production với đầu ra standalone của Next.js. **Không tích hợp CLI của nhà cung cấp.**                                                                                           |
| `runner-cli`  | `runner-base`         | Thêm `git`, `docker.io`, `docker-compose` và các CLI toàn cục: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Hãy chọn giai đoạn này cho các quy trình làm việc dùng agent.** |

Build thủ công một target cụ thể:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Tài nguyên khi build

Ba đối số build kiểm soát mức tài nguyên mà giai đoạn `builder` tiêu thụ. Chúng chỉ áp dụng tại thời điểm build —
`OMNIROUTE_MEMORY_MB` (bên dưới) là một tham số runtime riêng biệt.

| Đối số build                | Mặc định | Tác dụng                                                                                           |
| --------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`      | Giá trị `0` sẽ build bằng webpack. Bộ nhớ đỉnh thấp hơn nhưng chậm hơn.                            |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`   | Giới hạn heap V8 (`--max-old-space-size`) cho tiến trình `next build` được khởi chạy.              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`      | Cung cấp giá trị cho `CIRCLE_NODE_TOTAL`; Next suy ra `workers = N - 1` để thu thập dữ liệu trang. |

`OMNIROUTE_BUILD_WORKERS` là tham số cần tăng trên một máy build lớn và là tham số
cần xem xét khi một bản build bị giới hạn tài nguyên gặp lỗi **sau khi** `✓ Compiled successfully`. Mỗi
worker xử lý dữ liệu trang là một tiến trình riêng, và bản thân tiến trình cha `next build` cũng vậy;
một lần tái hiện trực tiếp trên VPS (issue #7518) đã đo RSS đỉnh của mỗi tiến trình ở mức
~4.5 GB, không phụ thuộc vào cờ heap `NODE_OPTIONS` (Turbopack biên dịch trong
bộ nhớ native/Rust nằm ngoài heap V8). Giá trị mặc định `2` (→ 1 worker, tổng cộng 2
tiến trình) được định cỡ cho các runner do GitHub cung cấp có 16 GB / 4 vCPU mà
pipeline phát hành sử dụng. Với `8` (→ 7 worker), runner đó đã hết bộ nhớ và
buildkit làm bước này thất bại với `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 worker) vẫn không đủ sau khi RSS trên mỗi tiến trình được đo
trực tiếp thay vì suy luận. `tests/unit/docker-build-memory-budget.test.ts`
thực hiện phép tính dựa trên số liệu đã đo và sẽ thất bại nếu một trong hai tham số
vượt quá khả năng của runner.

Turbopack biên dịch trong bộ nhớ Rust native nằm **ngoài** heap V8, vì vậy
`OMNIROUTE_BUILD_MEMORY_MB` không giới hạn bộ nhớ đó. Trên máy chủ có giới hạn bộ nhớ,
bản build sau đó sẽ bị OOM killer gửi SIGKILL mà hoàn toàn không có thông báo lỗi — nó chỉ đơn giản
dừng giữa chừng tại `Creating an optimized production build`, trông giống như bị treo thay
vì hết bộ nhớ. Nếu máy chủ build bị giới hạn tài nguyên, hãy chuyển bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` được bật, vì vậy `next build` chạy một tiến trình cha **và** một tiến trình
worker, trong đó mỗi tiến trình đều tuân theo `OMNIROUTE_BUILD_MEMORY_MB` một cách độc lập. Hãy đặt giới hạn
container cao hơn khoảng hai lần giá trị đó, không phải một lần.

Kết quả đo trên cây mã nguồn này (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Giới hạn container | Kết quả                                      |
| --------- | ------------------ | -------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB     | Bị OOM-kill ở cả hai mức, không có thông báo |
| webpack   | 8 GiB              | Worker build bị SIGKILL                      |
| webpack   | 12 GiB             | Thành công, đạt đỉnh ở 11.1 GiB              |

### Giá trị mặc định khi runtime

Các giá trị mặc định được `runner-base` export: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Hành vi bộ nhớ trong Docker:

- Image đặt `OMNIROUTE_MEMORY_MB=1024` và suy ra `NODE_OPTIONS=--max-old-space-size=1024` từ giá trị này.
- Tiến trình máy chủ thực tế được khởi chạy bởi standalone launcher, launcher này đọc `OMNIROUTE_MEMORY_MB` và nối thêm `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node sử dụng giá trị `--max-old-space-size` cuối cùng khi cờ này được lặp lại, vì vậy việc đặt `OMNIROUTE_MEMORY_MB` sẽ kiểm soát giới hạn heap Docker có hiệu lực.
- Vì image luôn đặt giá trị này, cơ chế dự phòng tự hiệu chỉnh theo RAM của launcher không bao giờ được áp dụng trong Docker. Hãy tăng giá trị này một cách tường minh cho workload (bảng bên dưới). `2048` vẫn quá nhỏ cho `/v1/responses` của coding agent.

### RAM runtime cho coding agent

Giá trị mặc định 1 GiB của Docker là mức tối thiểu cho dashboard/trò chuyện nhẹ, không phải mức dành cho production. Các body dài của `POST /v1/responses` (hàng trăm thông điệp, hàng chục công cụ) giữ lại nhiều đồ thị trong bộ nhớ trong quá trình nén. Hai request chồng lấp có kích thước ~3 MiB / ~750k token đã khiến V8 dừng ở old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) và cũng chạm lỗi OOM của cgroup 16 GiB. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Hãy đặt **`--memory` của cgroup cao hơn heap** — các buffer native, SQLite và dữ liệu trung gian của quá trình nén nằm ngoài V8.

| Khối lượng công việc                       | `OMNIROUTE_MEMORY_MB`           | Container / cgroup     | Ghi chú                                                                                                            |
| ------------------------------------------ | ------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Bảng điều khiển, một cuộc trò chuyện nhẹ   | `1024` (mặc định của image)     | ≥2 GiB                 |                                                                                                                    |
| Một tác nhân lập trình (Claude/Codex/Grok) | `8192`                          | ≥10 GiB                | Một phiên `/v1/responses` điển hình                                                                                |
| Hai `/v1/responses` dài đồng thời          | `10240`–`12288`                 | ≥12–16 GiB             | Đã ghi nhận V8 bị hủy ở heap khoảng 12 GiB                                                                         |
| Ba ngữ cảnh dài đồng thời trở lên          | không chạy trong một tiến trình | tuần tự hóa / thêm RAM | Mặc định chỉ cho phép 1 tác vụ nặng đang xử lý; việc tăng giới hạn này mà không thêm RAM sẽ khiến lỗi hủy tái diễn |

Khi `OMNIROUTE_MEMORY_MB` **chưa được đặt**, `omniroute serve` trên máy vật lý sẽ hiệu chỉnh ở mức khoảng 35% RAM (giới hạn trong `[512, 4096]`). Docker luôn đặt thành `1024`, vì vậy quá trình hiệu chỉnh này không bao giờ chạy trong image chính thức.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Các biến môi trường quan trọng

Ngoài các giá trị mặc định được ghi lại trong [ENVIRONMENT.md](../reference/ENVIRONMENT.md), những biến sau đây là quan trọng nhất khi chạy trong Docker:

| Biến                          | Mục đích                                                                                                                                                                                                                                                                                 | Mặc định                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Khóa bí mật dùng chung cho cầu nối WebSocket. **Bắt buộc trong môi trường production** — hãy đặt thành một chuỗi ngẫu nhiên mạnh.                                                                                                                                                        | chưa đặt (phải cung cấp) |
| `REDIS_URL`                   | Chuỗi kết nối cho backend giới hạn tốc độ / bộ nhớ đệm                                                                                                                                                                                                                                   | `redis://redis:6379`     |
| `REDIS_PORT`                  | Cổng phía máy chủ cho container Redis đi kèm                                                                                                                                                                                                                                             | `6379`                   |
| `REDIS_BIND_HOST`             | Giao diện mạng của máy chủ mà cổng Redis đi kèm được công khai trên đó (loopback trừ khi bạn thêm AUTH)                                                                                                                                                                                  | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Đường dẫn trên máy chủ được gắn vào profile `cli` tại `/workspace/omniroute` cho các quy trình tự cập nhật                                                                                                                                                                               | `.` (thư mục hiện tại)   |
| `OMNIROUTE_MEMORY_MB`         | Giới hạn heap Node khi chạy cho máy chủ Docker độc lập; ghi đè giá trị mặc định của image ở trên. Các tác nhân lập trình: `8192`+ (xem [RAM khi chạy](#runtime-ram-for-coding-agents)).                                                                                                  | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | Ghi đè các cổng được công khai cho dashboard (20128) và API (20129)                                                                                                                                                                                                                      | `20128` / `20129`        |
| `APP_BIND_HOST`               | Giao diện mạng của máy chủ mà docker-compose công khai các cổng dashboard/API/live-WS trên đó. Với `REQUIRE_API_KEY=false` (mặc định), `0.0.0.0` sẽ công khai proxy `/v1` ẩn danh cho mạng LAN — chỉ mở rộng phạm vi khi dùng `REQUIRE_API_KEY=true` hoặc có reverse proxy ở phía trước. | `127.0.0.1`              |
| `CLIPROXY_BIND_HOST`          | Giao diện mạng của máy chủ mà docker-compose công khai sidecar `cliproxyapi` trên đó — volume dữ liệu của sidecar này lưu thông tin xác thực của nhà cung cấp.                                                                                                                           | `127.0.0.1`              |
| `OMNIROUTE_PLUGINS_DIR`       | Thư mục mà trình quét plugin khi chạy đọc và cài đặt vào. Hãy đặt biến này khi các plugin được bind-mount: giá trị mặc định phụ thuộc vào `HOME`, nhưng image không nhất thiết phải export biến này.                                                                                     | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | Đường dẫn con URL khi ứng dụng được công khai phía sau reverse proxy (ví dụ: `/omniroute`)                                                                                                                                                                                               | _(trống = thư mục gốc)_  |
| `NEXT_PUBLIC_BASE_URL`        | Origin công khai trên trình duyệt, bao gồm đường dẫn con (ví dụ: `https://host/omniroute`)                                                                                                                                                                                               | chưa đặt                 |
| `PROD_DASHBOARD_PORT`         | Cổng dashboard phía máy chủ cho `docker-compose.prod.yml`                                                                                                                                                                                                                                | `20130`                  |
| `CLIPROXYAPI_PORT`            | Cổng phía máy chủ cho sidecar `cliproxyapi`                                                                                                                                                                                                                                              | `8317`                   |

## Reverse Proxy trên đường dẫn con (Traefik / nginx)

`basePath` của Next.js được biên dịch vào bundle độc lập. OmniRoute ghi lại giá trị đã được nhúng
trong một tệp đánh dấu tại thư mục gốc của ứng dụng (được ghi trong quá trình `npm run build`; được đọc bởi
`scripts/docker/ensure-docker-base-path.mjs`) và so sánh giá trị đó với
`OMNIROUTE_BASE_PATH` khi container khởi động. Khi chúng khác nhau và image được
xây dựng cho thư mục gốc của miền, entrypoint sẽ ghi lại các manifest độc lập, các
giá trị chuỗi `basePath`/`assetPrefix` được nhúng (Next 16 kết xuất URL tài nguyên SSR chỉ từ
`assetPrefix` — trình vá sẽ ánh xạ đường dẫn con vào đó), các URL tài nguyên
`/_next/static` được nhúng (manifest tham chiếu phía máy khách, nội dung đa phương tiện được nhập, các
trang lỗi được kết xuất trước) và shim `process.env` phía máy khách trước khi
`node dev/run-standalone.mjs` chạy.

### Xây dựng bằng Compose (khuyến nghị)

Đặt cả hai biến trong `.env`, sau đó xây dựng lại để image và môi trường chạy đồng nhất:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` chuyển tiếp `OMNIROUTE_BASE_PATH` dưới dạng đối số xây dựng Docker và
biến môi trường khi chạy.

### Image gốc được dựng sẵn + đường dẫn con khi chạy

Các image `diegosouzapw/omniroute:*` đã phát hành được xây dựng cho thư mục gốc của miền. Bạn vẫn có thể
đặt `OMNIROUTE_BASE_PATH` khi chạy; container sẽ vá bundle một lần khi khởi động.
Hãy ghép biến này với origin công khai tương ứng:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Cấu hình reverse proxy để chuyển tiếp **toàn bộ** đường dẫn bên ngoài (không loại bỏ
tiền tố). Traefik phải định tuyến `PathPrefix(`/omniroute`)` đến container mà không dùng
`StripPrefix`, để Next.js nhận `/omniroute/...` và phân phối tài nguyên từ
`/omniroute/_next/...`.

Healthcheck của Docker thăm dò endpoint vòng đời nhẹ `/healthz` với tiền tố
`OMNIROUTE_BASE_PATH` đang hoạt động. `/api/monitoring/health` vẫn khả dụng cho
hoạt động chẩn đoán thủ công/trên bảng điều khiển; để chuyển HEALTHCHECK của container trở lại endpoint đó (ví dụ
nhằm áp dụng kiểm tra sức khỏe chuyên sâu), hãy đặt `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Đường dẫn đó là một kiểm tra **chuyên sâu** (DB + bản tóm tắt giám sát) — phù hợp với
`HEALTHCHECK` không thường xuyên của Docker nếu bạn chọn bật lại, nhưng **không** phù hợp với
các khoảng thời gian `livenessProbe` của Kubernetes.

Đối với các trình điều phối (Kubernetes, Nomad, v.v.):

| Thăm dò               | Nên dùng                                                               | Tránh                                                           |
| --------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| Tính sống             | HTTP `GET /livez`, hoặc TCP trên cổng chính (`PORT`, mặc định `20128`) | Dùng `/api/monitoring/health` để kiểm tra tính sống             |
| Tính sẵn sàng         | HTTP `GET /healthz`                                                    | Thời gian chờ ngắn khiến vòng lặp sự kiện bận bị coi là đã chết |
| Chuyên sâu / blackbox | `/api/monitoring/health`                                               | —                                                               |

`/healthz` báo cáo vòng đời tiến trình (`ok` / `starting` / `stopping`). `/livez` chỉ
kiểm tra tiến trình còn sống (trả về 200 bất cứ khi nào trình xử lý có thể chạy; không chờ
trạng thái sẵn sàng). Cả hai vẫn chạy trên cùng vòng lặp sự kiện Node với quá trình xử lý yêu cầu, vì vậy
các tác vụ danh mục hoặc nén phụ thuộc nhiều vào CPU có thể làm chúng chậm lại — bận ≠ đã chết. Nên dùng kiểm tra tính sống qua TCP
nếu thăm dò HTTP hết thời gian chờ. Hướng dẫn đầy đủ về thăm dò:
[Hướng dẫn giám sát — Khuyến nghị về thăm dò Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose với Caddy (HTTPS Auto-TLS)

OmniRoute có thể được cung cấp truy cập an toàn bằng tính năng tự động cấp phát chứng chỉ SSL của Caddy. Hãy đảm bảo bản ghi DNS A của tên miền trỏ đến địa chỉ IP của máy chủ.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin dành cho trình duyệt để xử lý callback OAuth, liên kết bảng điều khiển và các URL công khai được tạo.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL nội bộ giữa các máy chủ dành cho tác vụ theo lịch / yêu cầu tự truy xuất.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy thiết lập các header chuyển tiếp tiêu chuẩn cho container thượng nguồn. OmniRoute sử dụng
`NEXT_PUBLIC_BASE_URL` làm origin công khai chuẩn cho các callback OAuth và những liên kết công khai
được tạo; các thao tác ghi đã xác thực trên bảng điều khiển sử dụng yêu cầu cùng origin cùng với cơ chế bảo vệ CSRF
gắn với phiên. Chỉ bật `OMNIROUTE_TRUST_PROXY` cho các bản triển khai nâng cao mà bạn chủ đích
muốn OmniRoute suy ra origin công khai từ các header chuyển tiếp đáng tin cậy thay vì cấu hình
tường minh.

## Cloudflare Quick Tunnel

Khả năng hỗ trợ bảng điều khiển cho các bản triển khai Docker bao gồm **Cloudflare Quick Tunnel** chỉ với một lần nhấp tại `Dashboard → Endpoints`. Trong lần bật đầu tiên, hệ thống chỉ tải xuống `cloudflared` khi cần, khởi động một tunnel tạm thời đến endpoint `/v1` hiện tại của bạn và hiển thị URL `https://*.trycloudflare.com/v1` được tạo ngay bên dưới URL công khai thông thường.

Các bảng tunnel của endpoint (Cloudflare, Tailscale, ngrok) có thể được hiển thị hoặc ẩn tại `Settings → Appearance` mà không làm thay đổi trạng thái tunnel đang hoạt động.

### Lưu ý về tunnel

- Các URL Quick Tunnel chỉ là tạm thời và thay đổi sau mỗi lần khởi động lại.
- Quick Tunnel không được tự động khôi phục sau khi OmniRoute hoặc container khởi động lại. Hãy bật lại từ bảng điều khiển khi cần.
- Trình cài đặt được quản lý hiện hỗ trợ Linux, macOS và Windows trên `x64` / `arm64`.
- Quick Tunnel được quản lý mặc định sử dụng phương thức truyền tải HTTP/2 để tránh các cảnh báo ồn ào về bộ đệm UDP của QUIC trong môi trường container bị giới hạn. Đặt `CLOUDFLARED_PROTOCOL=quic` hoặc `auto` nếu bạn muốn sử dụng phương thức truyền tải khác.
- Các image Docker tích hợp sẵn chứng chỉ CA gốc của hệ thống và truyền chúng cho `cloudflared` được quản lý, giúp tránh lỗi tin cậy TLS khi tunnel khởi tạo bên trong container.
- Đặt `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` nếu bạn muốn OmniRoute sử dụng binary có sẵn thay vì tải xuống.

## Thẻ image

| Image                    | Thẻ      | Kích thước | Mô tả                                                            |
| ------------------------ | -------- | ---------- | ---------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | SemVer ổn định **đã phát hành** cao nhất (không phải git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB     | Ghim loại thẻ này cho GitOps                                     |

Manifest đa nền tảng: `linux/amd64` + `linux/arm64` nguyên bản (Apple Silicon, AWS Graviton, Raspberry Pi). Docker tự động chọn kiến trúc phù hợp; truyền `--platform linux/amd64` nếu bạn cần buộc giả lập AMD64 trên máy chủ ARM.

### Kênh phát hành

OmniRoute phát hành các kênh Docker riêng biệt dành cho bản phát hành ổn định, việc kiểm thử nhánh phát hành đang hoạt động và các bản dựng phát triển.

| Kênh                            | Nguồn                                    | Khả năng thay đổi                      | Mục đích sử dụng được khuyến nghị                                                                                                          |
| ------------------------------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Bản phát hành đã ký/có phiên bản         | Không thể thay đổi                     | Các bản triển khai sản xuất ghim vào một bản phát hành chính xác                                                                           |
| `:latest` / `:latest-web`       | SemVer ổn định **đã phát hành** cao nhất | Con trỏ ổn định có thể thay đổi        | Theo dõi các bản phát hành ổn định **sau** tác vụ phát hành SemVer — **không** theo dõi `main` hoặc các commit `release/v*` chưa phát hành |
| `:next` / `:next-web`           | Nhánh `release/v*` mặc định hiện tại     | Con trỏ tiền phát hành có thể thay đổi | Kiểm thử các bản sửa lỗi đã được đưa vào nhánh phát hành đang hoạt động nhưng chưa có trong bản phát hành ổn định                          |
| `:main` / `:main-web`           | Nhánh `main`                             | Con trỏ phát triển có thể thay đổi     | Chỉ dành cho phát triển và kiểm thử tích hợp                                                                                               |

#### Sử dụng kênh tiền phát hành

Kênh `next` được dựng lại sau mỗi lần push lên nhánh `release/v*` mặc định hiện tại và được phát hành cho cả AMD64 lẫn ARM64. Các nhánh bảo trì cũ hơn không thể ghi đè kênh này. Kênh cung cấp một image có thể pull dành cho các bản sửa lỗi đã được merge vào nhánh phát hành đang hoạt động trước khi thẻ ổn định tiếp theo được tạo.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Đối với Docker Compose, hãy ghi đè thẻ image được profile đã chọn sử dụng, sau đó pull và tạo lại dịch vụ:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### An toàn và khôi phục phiên bản trước

`next` là một kênh tiền phát hành linh động. Kênh này có thể thay đổi sau bất kỳ lần push nào lên nhánh phát hành đang hoạt động và **không được hỗ trợ để sử dụng trong môi trường sản xuất**. Hãy ghim digest của image trong khi đánh giá một bản dựng cụ thể:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Trước khi kiểm thử, hãy sao lưu volume dữ liệu OmniRoute hoặc thư mục dữ liệu được bind mount. Để quay lui, hãy khôi phục phiên bản ổn định hoặc digest đã dùng trước đó rồi tạo lại container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Bản dựng từ nhánh phát hành không bao giờ có thể cập nhật `latest`; chỉ phiên bản ngữ nghĩa ổn định đủ điều kiện mới có thể cập nhật con trỏ ổn định. Các image `next` vẫn được kiểm tra image phát hành và chịu cổng chặn đối với lỗ hổng ở mức CRITICAL.

**`latest` không đảm bảo tính cập nhật so với git.** Các bản sửa lỗi đã được hợp nhất vào `main` hoặc nhánh `release/v*` đang hoạt động **không** có trong `:latest` cho đến khi một image SemVer ổn định được phát hành và tác vụ phát hành cập nhật `:latest` (cùng digest với SemVer đó). Nếu `latest` có vẻ không thay đổi trong khi GitHub đã hiển thị bản sửa lỗi, hãy kéo `:next` để kiểm thử nhánh phát hành hoặc chờ thẻ SemVer.

| Nhu cầu của bạn                                                                            | Sử dụng                               |
| ------------------------------------------------------------------------------------------ | ------------------------------------- |
| GitOps / môi trường production không được phép sai lệch                                    | Ghim `:X.Y.Z` (hoặc digest của image) |
| Theo dõi các bản ổn định đã phát hành và chấp nhận tạo lại container sau mỗi bản phát hành | `:latest`                             |
| Kiểm thử các commit `release/v*` chưa phát hành                                            | `:next` (không dành cho production)   |
| Kiểm thử `main`                                                                            | `:main` (không dành cho production)   |

## Tính sẵn sàng: SQLite mặc định chỉ có một bản sao

OmniRoute Docker / Kubernetes nguyên bản là **một tiến trình Node + một trình ghi SQLite**. Tính sẵn sàng cao **không được hỗ trợ** trên cấu trúc này.

| Ràng buộc                                             | Hệ quả                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Một trình ghi                                         | **Không** chạy nhiều bản sao trên cùng một tệp SQLite. Điều đó sẽ làm hỏng DB.                                                                                                                                                                                                                                                                                                                          |
| Tạo lại / khởi động lại / HEALTHCHECK dừng tiến trình | **Gián đoạn hoàn toàn** đối với các kết nối SSE đang xử lý, phiên bảng điều khiển và trạng thái trong bộ nhớ. Mọi máy khách đang kết nối đều bị ngắt. Các yêu cầu mới trong khoảng thời gian không có endpoint sẽ nhận được phản hồi **`502 Bad Gateway: Unknown error`** từ reverse proxy, chứ không phải JSON của OmniRoute — máy khách không thể phân biệt lỗi này với lỗi từ nhà cung cấp (#11015). |
| Cùng event loop với `/healthz`                        | Một chu kỳ danh mục hoặc nén đang bận có thể làm chậm probe; timeout ngắn sau đó sẽ khởi động lại bản sao **duy nhất**.                                                                                                                                                                                                                                                                                 |

**Ma trận probe** (xem thêm [các khuyến nghị về probe của Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                  | Mục tiêu                                                     | Không sử dụng                                           |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| Liveness               | TCP trên `PORT` (mặc định `20128`), hoặc HTTP mềm `/healthz` | `/api/monitoring/health`                                |
| Readiness              | HTTP `GET /healthz`                                          | Timeout quá ngắn khiến event loop bận bị xem là đã chết |
| Chuyên sâu / con người | `/api/monitoring/health`                                     | Liveness tự động của kubelet                            |

**Nâng cấp:** dự kiến mọi phiên đều sẽ bị ngắt. Hãy điều hướng dần máy khách ra ngoài nếu có thể; không có cập nhật cuốn chiếu trên SQLite mặc định. Compose `restart: unless-stopped` kết hợp với Docker `HEALTHCHECK` cũng sẽ thay thế tiến trình duy nhất khi container ở trạng thái Unhealthy — phạm vi ảnh hưởng là như nhau.

Đoạn cấu hình Kubernetes cho **một bản sao** (bắt buộc dùng Recreate; không tăng `replicas` khi dùng chung một tệp SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Khoảng nghỉ `preStop` cho phép kube loại bỏ các endpoint của Service trước SIGTERM để lưu lượng **mới** không tiếp tục được chuyển tới tiến trình đang dừng. SSE `/v1/responses` đang xử lý được phép hoàn tất trong tối đa `SHUTDOWN_TIMEOUT_MS` (mặc định 30 giây) thông qua các lease kiểm soát tiếp nhận hạng nặng (#11015). Những yêu cầu mới vẫn đến được tiến trình sẽ nhận `503` + `Retry-After: 5`. Khoảng trống không có endpoint của Recreate cho đến khi bản thay thế ở trạng thái Ready vẫn là một lần gián đoạn hoàn toàn — đó là đặc tính của cấu trúc SQLite, không phải cấu hình probe sai.

Postgres bên ngoài / HA nhiều trình ghi **không** phải là một phương án nguyên bản đã được ghi tài liệu. Nếu cần HA, hãy duy trì một bản sao hoặc chạy một cấu trúc mà dự án đã kiểm thử và ghi tài liệu riêng. Công việc về Postgres/MySQL được theo dõi tại [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Cho đến khi tính năng đó được phát hành, cách duy nhất được hỗ trợ để nhân rộng năng lực xử lý `/v1/responses` **lớn** là dùng N tiến trình độc lập (phần tiếp theo), chứ không phải `replicas > 1` trên một volume.

## Mở rộng theo chiều ngang: N tiến trình độc lập

Một tiến trình Node tương ứng với **một heap V8**. Hai yêu cầu coding-agent `POST /v1/responses` (RTK + Caveman) chồng lấn, mỗi yêu cầu khoảng ~3 MiB / ~750k token, sẽ làm heap đó dừng ở khoảng ~12 Gi (`FATAL ERROR: Reached heap limit`) và có thể gây OOM cho một cgroup 16 Gi. Xem [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Phép đo đó là một cảnh báo về **ngân sách bộ nhớ**, không phải giới hạn tối đa cứng của sản phẩm là hai yêu cầu `/v1/responses` dài chạy đồng thời. Việc tiếp nhận chat nặng được kiểm soát bằng ngân sách byte đầu vào được tự động suy ra (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), định cỡ theo cùng giới hạn V8/cgroup đó — ghi đè lên giá trị cao hơn (hoặc đặt giới hạn cũ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` theo số lượng yêu cầu) trên một tiến trình đã được định cỡ sẽ tái gây ra lỗi dừng. Các chat nhỏ, `/healthz`, `/v1/models` và MCP **không** nằm trong giới hạn đó.

### Một tiến trình: nhiều hơn hai `/v1/responses` dài

Một tiến trình **khỏe mạnh** (heap thấp hơn `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, mặc định `0.75`) **có thể** chạy nhiều hơn hai yêu cầu `POST /v1/responses` dài đồng thời khi ngân sách byte đang xử lý trên toàn tiến trình (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) vẫn còn chỗ. Các phần thân có kích thước bằng hoặc lớn hơn `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (mặc định 256 KiB) sử dụng cùng lease hạng nặng như các yêu cầu có cấu trúc phức tạp và dùng cùng cơ chế thoát `tryAcquireHealthyHeadroom` trong [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Hàng chục máy khách SSE dài chạy đồng thời (các đơn vị vận hành thường cần 40–50) là vấn đề về **ngân sách bộ nhớ** — hãy định cỡ heap + các slot chính/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — chứ không phải giới hạn cứng “tối đa 2” của sản phẩm. Khi heap chịu áp lực, hệ thống vẫn giảm tải bằng phản hồi `503` có thể thử lại để sự cố #7849 không tái diễn.

Để **nhân số heap** (các old-space V8 độc lập) **ngay hôm nay**:

| Nên làm                                                                                                                                                                           | Không nên làm                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Chạy **N container/pod**, mỗi container/pod có `DATA_DIR` / volume **riêng**                                                                                                      | Đặt `replicas > 1` dùng chung một tệp SQLite                            |
| Định cỡ số yêu cầu nặng đang xử lý + healthy-headroom theo ngân sách heap / byte đang xử lý; 1–2 là giá trị mặc định thận trọng theo #7849, không phải giới hạn cứng của sản phẩm | Cấp cho một tiến trình RAM gấp 8 lần và giới hạn số lượng không bị chặn |
| Tùy chọn: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` để có **các bộ đếm quota dùng chung**                                                                              | Coi Redis là SQLite dùng chung — không phải vậy                         |
| Sao chép các secret của nhà cung cấp vào từng instance (hoặc chấp nhận dashboard bị phân tách)                                                                                    | Mong đợi một dashboard / một call-log duy nhất trên các instance        |
| Đặt phía trước bất kỳ bộ cân bằng tải nào; sticky theo khóa API hoặc phiên là đủ                                                                                                  | Yêu cầu middleware nhận biết kích thước dành riêng cho nhà cung cấp     |

Phần cứng: số yêu cầu `/v1/responses` dài chạy đồng thời trên mỗi instance là vấn đề về **ngân sách bộ nhớ** (heap + byte đang xử lý / #10110). `N` `DATA_DIR` độc lập vẫn nhân số heap: RAM máy chủ phải đáp ứng `N × cgroup`, chứ không phải “một pod 16 Gi với N=8”. Tuyệt đối không đặt `replicas > 1` trên cùng một tệp SQLite.

Phác thảo Compose (hai heap, hai volume — không phải `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Mật độ trong tiến trình (chuyển tác vụ nén khỏi isolate HTTP) được đề cập tại [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Một cụm logic dùng chung trạng thái bền vững được đề cập tại [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Lưu ý quan trọng

- **Chế độ WAL của SQLite:** Nên để `docker stop` hoàn tất để OmniRoute có thể checkpoint các thay đổi mới nhất trở lại `storage.sqlite`. Các tệp Compose đi kèm đã thiết lập thời gian gia hạn dừng là 40 giây. Nếu chạy image trực tiếp, hãy giữ `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Đặt thành `true` nếu các bản sao lưu định kỳ/trước khi ghi được quản lý bên ngoài. Việc di chuyển cơ sở dữ liệu hiện có vẫn yêu cầu một bản chụp an toàn bền vững riêng và cơ chế bảo vệ khi di chuyển hàng loạt.
- **Duy trì dữ liệu:** Luôn gắn một volume vào `/app/data` để duy trì cơ sở dữ liệu, khóa và cấu hình qua các lần khởi động lại container.
- **Cấu hình cổng:** Ghi đè biến môi trường `PORT` để thay đổi cổng mặc định `20128`.

## Xem thêm

- [Hướng dẫn triển khai trên VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Thiết lập VM + nginx + Cloudflare
- [Hướng dẫn triển khai trên Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Triển khai lên Fly.io
- [Cấu hình môi trường](../reference/ENVIRONMENT.md) — Tài liệu tham khảo đầy đủ về `.env`
