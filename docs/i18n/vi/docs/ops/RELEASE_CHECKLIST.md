# Release Checklist (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Cập nhật lần cuối:** 2026-08-28 — v3.8.51
> Quy trình phát hành được tinh gọn, tận dụng các kỹ năng Claude Code để tự động hóa.
>
> **Giữ cho hàng đợi/nhánh luôn xanh giữa các lần phát hành:** xem [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (nhóm `/green-prs` + `npm run check:release-green` + `/babysit` + chạy hằng đêm). Việc chạy
> quy trình này định kỳ — và đặc biệt là **trước** danh sách kiểm tra này — giúp PR phát hành có trạng thái xanh ngay từ đầu.

## Tóm tắt

```bash
# 1. Tăng phiên bản + tạo CHANGELOG (kỹ năng)
/version-bump-cc patch    # hoặc minor/major

# 2. Chạy cổng kiểm tra chất lượng cục bộ
npm run check              # lint + kiểm thử
npm run test:coverage      # cổng kiểm tra độ bao phủ đầy đủ (60/60/60/60)

# 3. Build và kiểm tra nhanh
npm run build
npm run test:e2e           # không bắt buộc nhưng được khuyến nghị

# 4. Tạo bản phát hành (kỹ năng)
/generate-release-cc

# 5. Triển khai (kỹ năng)
/deploy-vps-both-cc        # hoặc akamai-cc / local-cc

# 6. Thu thập bằng chứng phát hành (kỹ năng)
/capture-release-evidences-cc
```

## npm Trusted Publishing (mặc định kể từ v3.8.51) — staged theo yêu cầu, direct làm phương án dự phòng

Theo mặc định, `npm-publish.yml` phát hành thông qua **npm Trusted Publishing (OIDC)**: job
`stage-npm` (do GitHub lưu trữ) trao đổi id-token của GitHub để lấy thông tin xác thực npm
ngắn hạn cho lần chạy đó — không có token npm dài hạn trong các secret của kho lưu trữ, không có lời nhắc 2FA, và có kèm chứng thực nguồn gốc.
Đây là cơ chế bỏ qua được npm chấp thuận trong bối cảnh các token bỏ qua 2FA đang dần bị loại bỏ;
nó khôi phục quy trình hoàn toàn tự động mà dự án đã có cho đến v3.8.48, đồng thời duy trì
đảm bảo WS1.3 (một token bị rò rỉ không thể tự phát hành — vì không tồn tại token nào).

**Thiết lập một lần (chủ sở hữu):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Cho đến khi cấu hình này tồn tại, bước tự động sẽ thất bại với `ENEEDAUTH`:
kích hoạt lại với `publish_mode=staged` (bên dưới) hoặc `direct`.

### Phát hành staged (theo yêu cầu — `publish_mode=staged`)

Workflow npm-publish không còn phát hành trực tiếp: nó khởi động tarball đã đóng gói
(`check:pack-boot`) rồi chạy `npm stage publish` — các byte chính xác được lưu tạm trên
registry, **không thể cài đặt** cho đến khi chủ sở hữu phê duyệt. Cổng 2FA do con người thực hiện đã được chuyển
sang SAU bước xác minh, thay vì trước đó.

**Quy trình của chủ sở hữu sau khi workflow chuyển sang trạng thái xanh:**

1. `npm stage list omniroute` — tìm stage id (cũng được in trong phần tóm tắt workflow).
2. Xác minh các byte đã được staged (khuyến nghị): `npm stage download <id>`, sau đó cài đặt
   tarball đã tải xuống vào một prefix tạm thời và khởi động nó (`npm run check:pack-boot` tự động hóa
   cùng kết luận pack→install→boot trong CI).
3. `npm stage approve <id>` — lời nhắc 2FA CHÍNH LÀ thao tác phát hành. `npm stage reject <id>` sẽ loại bỏ.
4. Lưới an toàn sau phát hành: trình xác minh sau phát hành (WS1.4 của kế hoạch v3.8.49) cài đặt
   phiên bản đã phát hành từ registry công khai trong một container sạch và khởi động nó.

**Phương án dự phòng khẩn cấp:** `workflow_dispatch` với `publish_mode=direct` khôi phục
`npm publish` tức thì theo cơ chế cũ (chỉ sử dụng nếu chính quy trình staging gặp lỗi; ghi lại lý do).

**Gia cố một lần (chủ sở hữu, npmjs.com):** cấu hình Trusted Publisher cho
`omniroute` ở chế độ chỉ stage để một token dài hạn bị rò rỉ không thể chạy `npm publish`
trực tiếp từ bất kỳ đâu — CI chỉ có thể stage; chỉ 2FA của chủ sở hữu mới có thể phát hành.

**Quy trình xử lý artifact bị lỗi (không thay đổi):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
là phản xạ mặc định (chỉ mất vài phút, có thể đảo ngược); chỉ dùng `npm unpublish` trong khoảng thời gian 72 giờ/không có gói phụ thuộc
và không bao giờ dùng làm bước đầu tiên. Docker: không bao giờ ghi đè một thẻ phiên bản — rollback nghĩa là
trỏ lại `latest` đến digest tốt gần nhất.

**Docker Hub `latest` (bắt buộc đối với mọi lần phát hành SemVer ổn định):** workflow
`docker-publish` phải gắn thẻ **cả** `X.Y.Z` và, khi
`should-promote-latest.sh` xác nhận đây là SemVer ổn định cao nhất, `:latest`
với **cùng một digest**. Sau khi job hoàn tất: digest `latest` trên Hub phải bằng digest SemVer mới
và `last_updated` phải được cập nhật. Không được để `:latest` trỏ đến một
bản build cũ hơn trong khi ghi chú phát hành đề cập đến các bản sửa lỗi chỉ tồn tại trên git. Các cấu hình Compose
khởi động nhanh sử dụng `:latest`; GitOps nên tiếp tục ghim vào `X.Y.Z`. Xem
[Các kênh phát hành Docker](../guides/DOCKER_GUIDE.md#release-channels) và #10317.

## Luồng Nhanh Hotfix (nhãn `hotfix`)

Một PR được gắn nhãn `hotfix` sẽ bỏ qua ma trận CI nặng (E2E 9 phân đoạn, coverage ratchet,
quality-gate, quality-extended) và giữ lại các cổng kiểm tra nhanh, có tín hiệu cao: build,
các phân đoạn unit, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
và kiểm tra boot-smoke của tarball (`check:pack-boot`). Mục tiêu: xanh trong ≤15 phút thay vì ~33 phút.

**Chính sách tham gia — bắt buộc đáp ứng cả bốn điều kiện (mô phỏng theo các luồng khẩn cấp của Chromium/VS Code/Node):**

1. **Mức độ nghiêm trọng**: môi trường production bị hỏng — artifact đã phát hành bị crash khi khởi động /
   bản sửa lỗi bảo mật / mọi người dùng của bản phát hành đều bị ảnh hưởng. "Quan trọng" không có nghĩa là "bị hỏng".
2. **Thẩm quyền**: chỉ chủ sở hữu repository mới được áp dụng nhãn `hotfix`. Chính nhãn này LÀ
   sự phê duyệt — tuyệt đối không tự áp dụng cho PR thuộc một chiến dịch.
3. **Bằng chứng**: phần nội dung PR liên kết đến lần chạy nặng hoàn toàn xanh trước đó (bộ kiểm thử mà
   các job bị bỏ qua lẽ ra sẽ xác thực lại), cùng với kiểm thử riêng của bản sửa lỗi thể hiện trạng thái lỗi trước, đạt sau.
4. **Phạm vi**: chỉ cherry-pick — bản sửa lỗi tối thiểu, không refactor, không kèm thay đổi ngoài phạm vi.

Phạm vi coverage/ratchet bị bỏ qua sẽ được xác thực lại bởi lần chạy đầy đủ tiếp theo trên
nhánh phát hành (release-green liên tục) — luồng này chỉ bỏ qua VIỆC CHỜ ĐỢI, không bao giờ bỏ qua xác thực.
Các diff chỉ liên quan đến kiểm thử (tất cả file nằm trong `tests/`, không có file nào trong `tests/e2e/`) sẽ tự động bỏ qua ma trận E2E
mà không cần bất kỳ nhãn nào.

## Danh sách kiểm tra chi tiết

### Trước khi phát hành

- [ ] Tất cả PR dành cho bản phát hành này đã được hợp nhất vào `release/vX.Y.0`
- [ ] Tất cả mục Linear/vấn đề còn mở cho phiên bản này đã được đóng hoặc chuyển sang mốc tiếp theo
- [ ] CI đạt trạng thái xanh trên nhánh `release/vX.Y.0`
- [ ] Không có dấu `TODO(release)` trong mã: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Ảnh nền Docker đã được cập nhật (hiện tại là `node:24.15.0-trixie-slim`)

### Phiên bản & Nhật ký thay đổi

- [ ] Chạy `/version-bump-cc <patch|minor|major>` (kỹ năng Claude Code)
  - Tăng phiên bản trong `package.json`, `electron/package.json`
  - Tạo lại `CHANGELOG.md` từ các commit git kể từ thẻ gần nhất
  - Cập nhật các huy hiệu trong README.md
- [ ] Xem xét thủ công CHANGELOG.md và chỉnh sửa nội dung commit nếu cần
- [ ] Đảm bảo phần semver mới nhất trong `CHANGELOG.md` khớp với phiên bản trong `package.json`
- [ ] Giữ `## [Unreleased]` làm phần đầu tiên của nhật ký thay đổi cho công việc sắp tới
- [ ] Cập nhật `docs/openapi.yaml` → `info.version` phải khớp với phiên bản trong `package.json`

### Chất lượng mã

- [ ] `npm run lint` — 0 lỗi (các cảnh báo đã tồn tại từ trước)
- [ ] `npm run typecheck:core` — không có lỗi
- [ ] `npm run typecheck:noimplicit:core` — không có lỗi (nghiêm ngặt)
- [ ] `npm run check:cycles:ratchet` — nằm trong giới hạn trần `metrics.cycles` đã cố định (`check:cycles` đơn lẻ thoát với mã 1 khi có bất kỳ chu trình nào, #15281)
- [ ] `npm run check:any-budget:t11` — nằm trong ngân sách
- [ ] `npm run check:route-validation:t06` — không có lỗi
- [ ] `npm run check:node-runtime` — đáp ứng phiên bản runtime tối thiểu được hỗ trợ (`>=22.22.2 <23`, `>=24.0.0 <27`, theo `SUPPORTED_NODE_RANGE` trong `src/shared/utils/nodeRuntimeSupport.ts`; đồng bộ với `engines` trong `package.json`)

### Kiểm thử

- [ ] `npm run test:unit` — đạt
- [ ] `npm run test:vitest` — đạt (máy chủ MCP, autoCombo, bộ nhớ đệm)
- [ ] `npm run test:coverage` — đáp ứng ngưỡng 60/60/60/60 (câu lệnh/dòng/hàm/nhánh)
- [ ] `npm run test:integration` — đạt (nếu thay đổi liên quan đến DB / trình xử lý)
- [ ] `npm run test:combo:matrix` — đạt (ma trận chiến lược combo: chứng minh một cách xác định các quyết định lựa chọn của cả 21 chiến lược định tuyến công khai; chạy khi thay đổi định tuyến combo, phân giải chiến lược hoặc logic dự phòng)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **tùy chọn/thủ công** (kiểm thử nhanh có cổng kiểm soát với upstream thực; lấy ảnh chụp nhanh DB chỉ đọc từ VPS `root@192.168.0.15`; gọi các nhà cung cấp thực, tiêu tốn tín dụng; không bao giờ chạy trong CI; bỏ qua một cách an toàn nếu không có cổng kiểm soát)
- [ ] `npm run test:combo:live:vps` — **tùy chọn/thủ công** (kiểm thử nhanh trực tiếp trên VPS Giai đoạn 3: 7 kịch bản HTTP với máy chủ `.15` đang hoạt động qua Node ESM thuần; yêu cầu `ssh root@192.168.0.15`; chỉ tạo/xóa các combo `__live_test__*`; gọi các nhà cung cấp thực; không bao giờ chạy trong CI)
- [ ] `npm run test:e2e` — đạt (các thay đổi UI)
- [ ] `npm run test:protocols:e2e` — đạt (các thay đổi MCP/A2A)
- [ ] `npm run test:ecosystem` — đạt

### Hook (được Husky xác thực)

Các hook Husky nằm trong `.husky/` và tự động chạy khi thực hiện các thao tác git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** các cổng kiểm tra nhanh và xác định — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (được kích hoạt ngày 2026-06-13). Cố ý loại trừ `test:unit` (chậm; đã được tác vụ CI `test-unit` đảm nhiệm).
  - Chạy thủ công `npm run test:unit` trước khi đẩy các nhánh phát hành.

Nếu một hook thất bại: hãy khắc phục vấn đề gốc, không bỏ qua bằng `--no-verify`.

### Conventional Commits

Tất cả commit dành cho bản phát hành phải tuân theo định dạng `type(scope): subject`.

**Các loại hợp lệ:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Các phạm vi hợp lệ:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Thay đổi phá vỡ khả năng tương thích: thêm phần cuối `BREAKING CHANGE:` hoặc `!` sau phạm vi (ví dụ: `feat(api)!: drop /v0`).

### Tài liệu

- [ ] `npm run check:docs-sync` đạt (tự động chạy bởi pre-commit)
- [ ] `npm run check:docs-all` đạt (tổng hợp: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` thoát với mã 0 — hợp đồng môi trường giữa mã ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` vẫn nguyên vẹn
- [ ] `npm run check:doc-links` thoát với mã 0 — không có tham chiếu markdown nội bộ bị hỏng sau khi tái cấu trúc
- [ ] `docs/architecture/ARCHITECTURE.md` đã được xem xét để phát hiện sai lệch về lưu trữ/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` đã được xem xét để phát hiện sai lệch về biến môi trường và vận hành
- [ ] Nếu `.env.example` thay đổi: đã cập nhật `docs/reference/ENVIRONMENT.md`
- [ ] Nếu tính năng mới có UI: `docs/guides/USER_GUIDE.md` có đề cập đến tính năng đó
- [ ] Nếu tính năng mới có API: đã cập nhật `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Nếu tính năng mới là một mô-đun: có tài liệu chuyên biệt `docs/<MODULE>.md`
- [ ] Nếu có thay đổi phá vỡ khả năng tương thích: `docs/guides/TROUBLESHOOTING.md` có ghi chú di chuyển

### i18n

- [ ] `npm run i18n:check` thoát với mã 0 — trạng thái bản dịch (`.i18n-state.json`) đồng bộ với tài liệu nguồn (không có nguồn bị sai lệch trong chế độ nghiêm ngặt; cảnh báo ở chế độ cảnh báo có thể chấp nhận được đối với các chỉnh sửa tài liệu vào phút chót, nhưng phải bằng 0 trước khi gắn thẻ)
- [ ] `npm run i18n:check-ui-coverage` thoát với mã 0 — mọi ngôn ngữ UI đều đạt hoặc vượt ngưỡng bao phủ 80%
- [ ] `npm run i18n:sync-ui:dry` báo cáo 0 khóa bị thiếu trên tất cả 66 ngôn ngữ đích (mọi ngôn ngữ ngoại trừ nguồn `en`)
- [ ] Nếu tài liệu tiếng Anh nguồn thay đổi, hãy chạy `npm run i18n:run` (yêu cầu `OMNIROUTE_TRANSLATION_API_KEY` trong `.env`) trước khi gắn thẻ
- [ ] Các đóng góp bản dịch có thể được hoãn sang bản phát hành tiếp theo nếu không đáng kể (theo dõi trong CHANGELOG)

### Di chuyển cơ sở dữ liệu

- [ ] Nếu `src/lib/db/migrations/` có tệp mới:
  - [ ] Mỗi lần di chuyển đều có tính lũy đẳng (`CREATE TABLE IF NOT EXISTS`, v.v.)
  - [ ] Các lần di chuyển được bao bọc trong giao dịch
  - [ ] Được đánh số chính xác (không có khoảng trống trong trình tự)
- [ ] Kiểm thử trên bản cài đặt mới: xóa `~/.omniroute/omniroute.db` và chạy `npm run dev`
- [ ] Kiểm thử trên bản cài đặt hiện có: sao lưu DB, chạy di chuyển, xác minh lược đồ
- [ ] Các tệp WAL (`-wal`, `-shm`) được xử lý chính xác nếu quá trình di chuyển ghi lại bảng

### Danh mục nhà cung cấp (được xác thực bằng Zod)

- [ ] Lược đồ Zod trong `src/shared/constants/providers.ts` hợp lệ tại thời điểm nạp
  - [ ] Tất cả nhà cung cấp đều có các trường bắt buộc (`id`, `label`, `kind`, v.v.)
  - [ ] Có `freeNote` cho các nhà cung cấp miễn phí mới
  - [ ] Các nhà cung cấp OAuth có `oauthConfig` được đăng ký trong `src/lib/oauth/constants/oauth.ts`
- [ ] Nếu thêm nhà cung cấp mới: có bộ thực thi tương ứng trong `open-sse/executors/`
- [ ] Nếu không sử dụng định dạng OpenAI: có bộ chuyển đổi trong `open-sse/translator/`
- [ ] Các mô hình được đăng ký trong `open-sse/config/providerRegistry.ts`
- [ ] Các bài kiểm thử đơn vị trong `tests/unit/` bao quát việc phân loại và định tuyến nhà cung cấp

### Ứng dụng desktop (Electron)

Nếu `electron/` đã thay đổi:

- [ ] `npm run electron:smoke:packaged` chạy thành công
- [ ] Đã kiểm thử bản build cho ít nhất một trong các nền tảng `:win`, `:mac`, `:linux`
- [ ] Chứng chỉ ký mã chưa hết hạn (nếu có ký)
- [ ] Phiên bản trong `electron/package.json` khớp với `package.json` gốc
- [ ] Con trỏ kênh tự động cập nhật đã được cập nhật nếu phát hành lên `stable`

### Bố cục bản build

Kho lưu trữ sử dụng ba thư mục đầu ra riêng biệt — tuyệt đối không nhầm lẫn chúng:

| Thư mục   | Mục đích                                                            | Được theo dõi?       |
| --------- | ------------------------------------------------------------------- | -------------------- |
| `src/`    | Mã nguồn ứng dụng (TypeScript / TSX)                                | Có                   |
| `.build/` | Sản phẩm trung gian của bản build — đầu ra `next build` (`distDir`) | Không (bị gitignore) |
| `dist/`   | Gói npm có thể phát hành — được tạo bởi `assembleStandalone`        | Không (bị gitignore) |

> **Lưu ý cho người vận hành:** thư mục image trên VPS từ xa vẫn là `/usr/lib/node_modules/omniroute/app/`.
> Chỉ đầu ra build **trong kho lưu trữ** được di chuyển (`app/` → `dist/`). Các skill triển khai sẽ rsync
> nội dung của `dist/` vào thư mục `app/` từ xa — không cần thay đổi đường dẫn trên VPS.

**Quy trình build một lần:**

```
npm run build:release
  └─ rm -rf .build dist          (dọn sạch)
  └─ next build → .build/next/   (sản phẩm trung gian)
  └─ assembleStandalone          (sao chép standalone + static + public + natives → dist/)
  └─ ghi dist/BUILD_SHA          (tệp chỉ dấu HEAD)
```

KHÔNG chạy `npm run build` rồi chạy riêng `npm run build:cli` để triển khai — hãy dùng
`npm run build:release`, lệnh này thực hiện build sạch lại từ đầu và tạo tệp chỉ dấu trong một lệnh duy nhất.

### Xác thực artifact

- [ ] `npm run build:release` chạy thành công và `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` sạch — không có `app.__qa_backup`, `scripts/scratch`, `package-lock.json` hoặc dữ liệu cục bộ còn sót lại khác
- [ ] `dist/server.js` tồn tại sau khi build
- [ ] Kiểm thử nhanh runtime đã đóng gói cục bộ, không bắt buộc: `npm run dev:candidate -- validate` sau khi `npm run dev:candidate -- build` khởi động tarball đã đóng gói trên một `DATA_DIR` biệt lập và kiểm tra `/api/health` + `/v1/models` (xem [Quy trình chuẩn để đóng góp](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Gắn thẻ & phát hành

- [ ] Chạy `/generate-release-cc` (skill Claude Code):
  - Tạo thẻ `vX.Y.Z`
  - Đẩy thẻ và nhánh
  - Mở GitHub Release với nội dung nhật ký thay đổi
  - Đính kèm các trình cài đặt Electron (nếu đã build)
- [ ] Hoặc thực hiện thủ công:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Triển khai

Các skill triển khai sử dụng quy trình rsync gọn nhẹ — không dùng `npm pack`, không dùng `npm i -g`:

- [ ] Sử dụng skill triển khai phù hợp với đích:
  - `/deploy-vps-local-cc` — VPS cục bộ (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — cả hai
- [ ] Trước khi triển khai, xác nhận `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Bản build phải chạy ở nơi `node_modules` là thư mục thật (checkout chính hoặc worktree đã chạy `npm ci` — KHÔNG phải worktree dùng liên kết tượng trưng)
- [ ] Kiểm thử nhanh instance đã triển khai:
  - Mở `/dashboard/health` → kiểm tra chuỗi phiên bản khớp với bản phát hành
  - Chạy một yêu cầu `/v1/chat/completions` với một nhà cung cấp đã biết
  - Xác minh `/api/monitoring/health` trả về các bộ ngắt mạch ở trạng thái `CLOSED`
  - Xác nhận các phương thức truyền tải MCP phản hồi (`/mcp` HTTP, `/mcp-sse` SSE)

### Sau khi phát hành

- [ ] Chạy `/capture-release-evidences-cc` (skill Claude Code)
  - Chụp ảnh/quay video WebP về các tính năng mới
  - Đính kèm vào ghi chú phát hành / bài đăng blog
- [ ] Cập nhật GitHub Discussions / Discord với thông báo phát hành
- [ ] Mở milestone cho phiên bản tiếp theo
- [ ] Nếu quan trọng: ghim thảo luận hoặc đăng trong `news.json` để hiển thị biểu ngữ trong ứng dụng

### Cổng kiểm soát ra mắt công khai Radar

Thông báo Radar được chủ ý commit với `active: false`. Việc kích hoạt là một thay đổi riêng biệt
sau khi có bằng chứng cho mọi mục bên dưới:

- [ ] Tất cả các Radar PR xếp chồng đã được hợp nhất và CI tại đầu mút phát hành đang xanh
- [ ] Triển khai và kiểm thử nhanh các route OSS Radar với `RADAR_ENABLED` vẫn tắt theo mặc định
- [ ] Kiểm thử nhanh `GET /planos`, `/termos`, `/privacidade` và `/reembolso` trên host Radar được chỉ định
- [ ] Ghi nhận danh tính/thông tin liên hệ/địa chỉ của người vận hành và nội dung rà soát pháp lý đã được chủ sở hữu phê duyệt trong dịch vụ riêng tư
- [ ] Chỉ kiểm thử Stripe Checkout và webhook đã ký ở chế độ thử nghiệm
- [ ] Thực hiện một lần gửi email giao dịch được mã hóa bằng người gửi/tên miền đã được phê duyệt
- [ ] Chứng minh khả năng khôi phục bản sao lưu và thực hiện một lần chạy nghiên cứu có giám sát, với ngân sách được giới hạn
- [ ] Phê duyệt chính sách rà soát BRL/PIX trước khi chấp nhận bằng chứng quyên góp
- [ ] Chỉ bật Checkout công khai sau khi đáp ứng các cổng kiểm soát nêu trên, rồi kích hoạt ID mới trong `news.json`
- [ ] Xác minh biểu ngữ Trang chủ sử dụng nội dung đã bản địa hóa và ID mới sẽ xuất hiện lại sau khi một ID cũ bị loại bỏ

## Kiểm tra nhanh Dịch vụ Nhúng (v3.8.4+)

Trước khi phát hành bất kỳ bản phát hành nào có thay đổi đối với các dịch vụ nhúng, hãy xác minh:

### Khởi động với DB mới (phát hiện xung đột migration — được bổ sung sau hotfix v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — chờ 10 giây để khởi động
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` trả về `"9router"` (KHÔNG PHẢI 404, KHÔNG PHẢI 500). Xác nhận migration `071_services.sql` đã được áp dụng + hàng dữ liệu đã được seed.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` trả về 3 hàng.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` trả về 2 hàng (xác thực rằng `070_webhooks_kind_metadata.sql` đã được áp dụng).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` chạy thành công — ngăn ngừa các xung đột trong tương lai.

### 9Router

- [ ] `POST /api/services/9router/install` trả về 200 cùng với `installedVersion` trong vòng dưới 2 phút
- [ ] `POST /api/services/9router/start` trả về 200 và `state: "running"` trong vòng dưới 30 giây
- [ ] `GET /api/services/9router/status` báo cáo `health: "healthy"`
- [ ] `POST /v1/chat/completions` với `"model": "9router/auto/..."` trả về 200 (định tuyến đầu cuối qua 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` hiển thị giao diện người dùng gốc của 9Router bên trong proxy (không dùng iframe trực tiếp tới `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` trả về `{ keyRotated: true }` và dịch vụ khởi động lại bình thường
- [ ] `POST /api/services/9router/stop` trả về 200 và `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` trả về luồng SSE với sự kiện `snapshot` chứa các dòng gần đây
- [ ] Cài đặt trong môi trường không có `npm` trong PATH trả về 500 cùng thông báo lỗi thân thiện (không chứa stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` trả về 200 trong vòng dưới 2 phút
- [ ] `POST /api/services/cliproxy/start` trả về 200 và `state: "running"` trong vòng dưới 30 giây
- [ ] `GET /api/services/cliproxy/status` báo cáo `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` trả về 200 và `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` trả về luồng SSE

### Kiểm tra hồi quy bảo mật

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` trả về `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` trả về `403 LOCAL_ONLY`
- [ ] Các phản hồi lỗi từ `/api/services/*` không chứa `err.stack` hoặc đường dẫn tệp tuyệt đối

## Các bước kiểm tra cho v3.8.0+

Trước khi phát hành bất kỳ bản phát hành v3.8.x nào, hãy xác minh thêm các mục sau:

- [ ] `omniroute --tray` khởi động trên macOS (systray2 được cài đặt vào `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` khởi động trên Linux (yêu cầu DISPLAY; báo lỗi hợp lý nếu chưa được đặt)
- [ ] `omniroute --tray` khởi động trên Windows (PowerShell NotifyIcon, không có tệp nhị phân bổ sung)
- [ ] `omniroute config tray enable` tạo mục tự động khởi động; thao tác vô hiệu hóa sẽ xóa mục đó
- [ ] `npm install -g omniroute@<this-version>` chạy postinstall mà không thoát do lỗi nghiêm trọng
- [ ] Quá trình cập nhật giữ lại các dependency tùy chọn: `omniroute update --apply` và trình tự động cập nhật
      chạy `npm install -g … --include=optional` để `optionalDependencies` (better-sqlite3,
      keytar, tls-client và ngăn xếp SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) vẫn tồn tại sau khi cập nhật. Tầng SLM ultra `modelPath` cũng cần mô hình
      tinybert, được tự động tải xuống `${DATA_DIR}/models/llmlingua` trong lần sử dụng đầu tiên. Postinstall
      (`scripts/build/colocateOptionals.mjs`) sau đó đặt closure tùy chọn của SLM vào cùng vị trí trong
      `dist/node_modules` để worker phân giải MỘT instance `@huggingface/transformers` ^4.2.0
      DUY NHẤT — trace độc lập chỉ đóng gói transformers, không đóng gói các dependency tùy chọn được import động,
      vì vậy nếu không có bước này, worker sẽ tải llmlingua-2 với transformers ở root
      và tầng SLM sẽ âm thầm chuyển sang chế độ fail-open.
- [ ] `omniroute status` hoạt động khi không có `.env` (đường dẫn token CLI, chỉ loopback)
- [ ] `curl http://localhost:20128/api/shutdown` trả về 401 (route luôn được bảo vệ)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` trả về 401 (bộ bảo vệ loopback)
- [ ] Runtime SQLite phân giải thành `bundled` trong lần chạy đầu tiên (tệp nhị phân đi kèm hợp lệ cho nền tảng)
- [ ] Runtime SQLite chuyển sang `runtime` khi `node_modules/better-sqlite3` bị xóa
- [ ] Bộ lọc MCP thông minh nén đầu ra thực tế của `playwright-mcp browser_snapshot` (mức giảm ≥50%)
- [ ] Tất cả 10 tệp `skills/omniroute*/SKILL.md` đều có thể được truy xuất công khai qua URL GitHub raw
- [ ] Trình hướng dẫn làm quen hiển thị bước giới thiệu các tầng "Cách thức hoạt động" khi thiết lập mới
- [ ] Tiện ích phạm vi tầng trên bảng điều khiển chính hiển thị số lượng đã cấu hình/đang hoạt động

---

## Cắt bản 3.9.0 LTS (đã diễn tập trong 3.8.58)

Sau v3.8.59, phiên bản tiếp theo là 3.9.0 và đầu nhánh của phiên bản này trở thành hai nhánh tồn tại lâu dài:
`stable/v3` (dòng v3 LTS, npm `latest`) và `develop` (v4, được tăng lên 4.0.0, npm
`nightly`). Mô hình nhánh/kênh, quy trình forward-port và các nhãn được mô tả trong
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); kế hoạch nằm trong [ROADMAP](../../ROADMAP.md) (Giai đoạn 3). Việc cắt bản chỉ chạy một lần;
3.8.58 diễn tập toàn bộ quy trình trên một fork, còn 3.8.59 kết thúc bằng
[danh sách kiểm tra GO/NO-GO](./LTS_GO_NO_GO.md).

### Chạy thử (chỉ đọc, luôn an toàn)

```bash
npm run release:dry-run-lts-cut                       # lần cắt bản thực tế: 3.9.0 từ HEAD, thẻ trước đó là v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # cố định commit nguồn
```

`scripts/release/dry-run-lts-cut.mjs` không thực thi bất kỳ thao tác nào: nó đọc git và `gh`, rồi in ra
toàn bộ trình tự — các điều kiện tiên quyết (nguồn có thể được phân giải, kho lưu trữ nguồn có đầy đủ lịch sử —
một bản sao nông không thể đẩy `stable/v3`, phía nhận sẽ từ chối gói tại phần tử cha ghép đầu tiên,
vì vậy trước hết hãy cắt bản từ một bản sao đầy đủ hoặc chạy `git fetch --unshallow origin` — thẻ trước đó
tồn tại, `package.json` có phiên bản đích, một issue `release-freeze` đang mở, không có issue
`Release branch not green` đang mở
trên một nhánh phát hành hiện có — một nhánh không tồn tại sẽ báo `?` không xác định, không bao giờ
là xanh — hàng đợi `release` của Mergify đã được cấu hình (G11: `queue_rules`, `checks_timeout`,
nhãn `queue`), bộ quy tắc `release/*` vẫn chặn việc xóa và force-push, đồng thời
`stable/v3` và `develop` chưa tồn tại), hai bước tạo nhánh, những trình kích hoạt workflow đang bất hoạt
và điều kiện `if:` nào trở thành đúng (cũng như những điều kiện nào vẫn bị chặn bởi một biến kho lưu trữ hoặc
được ghim vào kho lưu trữ chuẩn), các dist-tag dự kiến (`latest` → 3.9.0, `next` và
`nightly` trống) và quy trình hoàn tác. Mã thoát `0` = `RESULT: READY`, `1` = một điều kiện tiên quyết
có tính chặn đã thất bại (`✗`), `2` = lỗi sử dụng. `--advisory <id,...>` hạ cấp một lượt kiểm tra thành cảnh báo (`!`)
mà không ẩn nó.

Hãy chạy thử lần cắt bản thực tế trong khi thời gian đóng băng phát hành 3.9.0 vẫn còn hiệu lực — các nhánh được
tạo sau thẻ và trước khi Giai đoạn 12c dỡ bỏ trạng thái đóng băng.

### Diễn tập 3.8.58 (chỉ trên fork)

```bash
# 1. Chạy thử trên đầu nhánh hiện tại với các tham số diễn tập
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Thực thi với một remote FORK (origin hoặc bất kỳ remote nào có URL là kho lưu trữ
#    chuẩn đều bị từ chối; mỗi bước đều yêu cầu xác nhận trong terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Chạy thử các workflow đang bất hoạt trong fork (workflow_dispatch tại nơi kết quả chạy thử
#    báo có ghim vào kho lưu trữ chuẩn), sau đó hoàn tác
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

Commit tăng phiên bản develop được tạo bằng hệ thống lệnh plumbing của git (không tác động đến cây làm việc) và tăng phiên bản
cho cùng năm tệp như một commit mở chu kỳ: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` và `docs/openapi.yaml`. Sau đó, mục `[4.0.0]`
trong CHANGELOG và các bản sao i18n của mục này được mở trên `develop`, trước PR đầu tiên của nhánh.
Script không bao giờ thay đổi các dist-tag của npm — hãy diễn tập chúng trên một gói thử nghiệm.

### Artifact xem trước của PR (build một lần, quảng bá đúng các byte đó)

`.github/workflows/preview-artifact.yml` build một tarball production từ đầu nhánh PR và
xác thực chính xác bản build đó (phần (a) của #8084). Chỉ dành cho các PR trong cùng kho lưu trữ; không có nội dung nào được phát hành.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # hoặc thêm nhãn `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # cài đặt bản xem trước
```

Lượt chạy thực hiện `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, đóng gói
tarball, chạy `npm run check:pack-boot` (secret giả, thư mục dữ liệu tạm thời), đóng gói lại và
thất bại nếu digest không giống hệt, sau đó ghi lại `artifact-identity.json` (SHA đầu nhánh, SHA cơ sở,
hash của lockfile, nền tảng, kiến trúc, ABI của node, bundler, chính sách build —
`scripts/release/artifact-identity.mjs`) và chứng thực tarball trong một job riêng biệt. Việc quảng bá
một bản xem trước có nghĩa là cài đặt tarball đó: tuyệt đối không build lại từ mã nguồn.

### Cắt bản (3.9.0, sau GO)

1. GO được ghi lại trong [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` in ra `RESULT: READY`.
3. Tạo thủ công các nhánh trên `origin` bằng các lệnh do lượt chạy thử in ra — script
   từ chối đẩy lên `origin`. Để tái sử dụng một commit develop đã được rà soát, trước tiên hãy chạy
   diễn tập `--execute` trên đầu nhánh 3.9.0 với fork của bạn; thao tác này in ra cả hai SHA và
   có thể đẩy chính các commit đó:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Bảo vệ `stable/v3` và `develop` (ruleset + hàng đợi hợp nhất) trước khi PR đầu tiên được hợp nhất.
5. Các workflow không hoạt động sẽ được bật khi nhánh tồn tại: `forward-port.yml` (push đến
   `stable/v3`), `validate-stable-pr.yml` (các PR đến `stable/v3`) và `nightly-v4-build.yml`
   (build `develop`). Trước khi chính thức vận hành, hãy thiết lập repository secret `secrets.FORWARD_PORT_TOKEN` (để CI chạy trên
   các PR forward-port); việc phát hành hằng đêm vẫn bị tắt cho đến khi chủ sở hữu đặt repository
   variable `vars.NIGHTLY_PUBLISH` thành `true` và npm Trusted Publishing chấp nhận
   `nightly-v4-build.yml`. Việc phân giải kênh nằm trong `scripts/release/dist-tag.mjs`, cũng là
   trình phân giải mà `npm-publish.yml` sử dụng.
6. Xác minh các kênh: `npm view omniroute dist-tags --json` hiển thị `latest` = 3.9.0 và không có
   `next` / `nightly` cho đến khi v4 được phát hành.
7. Khôi phục nếu cần: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   và `npm dist-tag add omniroute@3.8.59 latest`.

---

## Hoàn tác

Nếu bản phát hành gặp sự cố nghiêm trọng:

1. `gh release edit vX.Y.Z --prerelease` (đánh dấu là không phải bản mới nhất)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (chỉ khi người dùng chưa sử dụng)
3. Hoặc: tạo bản sửa lỗi khẩn cấp trên `release/vX.Y.0` → phát hành bản vá `vX.Y.(Z+1)`
4. Thông báo ngay trong GitHub Discussions và Discord

## Quy tắc bắt buộc

- Không bao giờ commit trực tiếp vào `main`
- Không bao giờ sử dụng `git push --force` lên các nhánh `main` hoặc `release/*`
- Không bao giờ bỏ qua các hook Husky (`--no-verify`)
- Không bao giờ commit bí mật, thông tin xác thực hoặc các tệp `.env`
- Độ bao phủ phải luôn ≥60/60/60/60 (câu lệnh/dòng/hàm/nhánh)
- Luôn bổ sung hoặc cập nhật kiểm thử khi thay đổi mã nguồn dùng trong môi trường production tại `src/`, `open-sse/`, `electron/` hoặc `bin/`

## Kiểm tra đồng bộ tự động

Chạy trình kiểm tra bảo vệ đồng bộ tài liệu trên máy cục bộ trước khi mở PR:

```bash
npm run check:docs-sync
```

CI cũng chạy bước kiểm tra này trong `.github/workflows/ci.yml` (tác vụ lint).
