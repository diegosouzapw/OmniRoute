# Self-Hosted Runner Box Operations (.113 pool) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

Nhóm máy chạy tự lưu trữ (`self-hosted, omni-release` trên cả tám runner; `omni-build` trên hai runner) chạy trên máy **.113**.
Đo ngày 2026-08-28 (báo cáo hậu kiểm v3.8.50, Phần III):

| tài nguyên | giá trị                                                                                                               | ý nghĩa đối với việc lập lịch                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RAM / CPU  | **31 GB / 32 lõi** (là 16 GB khi tài liệu này được viết lần đầu)                                                      | một `next-build` đạt đỉnh **~14 GB** → 2 bản dựng nặng chạy đồng thời làm máy quá tải, 3 bản sẽ khiến máy ngừng hoạt động (2026-08-28 06:42Z: tải 56, mất hai job) |
| swap       | 15 GB                                                                                                                 | máy đã dùng swap để hoàn tất việc phát hành v3.8.50; áp lực được thể hiện trong `/proc/pressure/memory`                                                            |
| `/tmp`     | **12 GB tmpfs = RAM**                                                                                                 | mọi thứ được lưu tạm ở đó đều chiếm bộ nhớ; phần còn sót lại sẽ bị dọn sau 3 giờ                                                                                   |
| đĩa        | 188 GB                                                                                                                | các checkout `_work` của 8 runner đạt ~70 GB mà không có giới hạn                                                                                                  |
| runner     | **6 listener**: 4 OmniRoute (1 `omni-build` + 1 chỉ dành cho `omni-release` + 2 `omni-light`) + OmniHeuris + OmniMind | tất cả cùng chia sẻ lượng bộ nhớ nêu trên; `omniroute-113-3/-4/-7/-8` đang bị vô hiệu hóa (`systemctl enable --now` sẽ khôi phục một runner)                       |

## Cài đặt trình dọn dẹp (một lần, trên máy)

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron (root): chạy mỗi 30 phút, ghi nhật ký vào /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` là bắt buộc: trình dọn dẹp xác minh một đường dẫn đang ở trạng thái rảnh bằng một ảnh chụp nhanh duy nhất về các tệp đang mở trước khi xóa đường dẫn đó; nếu không có công cụ này, trình dọn dẹp sẽ không xóa gì và sẽ thông báo rõ điều đó
(exit 1). Trước tiên, hãy thử mọi thay đổi với `--dry-run` — tùy chọn này in chính xác những gì sẽ được thực hiện
và không thay đổi gì.

Công việc được thực hiện trong mỗi lần chạy: dọn các phần còn sót lại của chúng ta (`runner-*`, `omniroute-*`,
`next-build*`, `e2e-build.tar.gz`) sau **3 giờ trên tmpfs** và 24 giờ trên
`_work/_temp` của đĩa; chấm dứt một `next-build` tồn tại lâu hơn 75 phút (không job nào chạy lâu đến vậy — vào
2026-08-27, một job đã chạy 70 phút sau khi GitHub tuyên bố job đó bị mất); dọn các
checkout cũ hơn 48 giờ của những runner có unit **đã dừng**; cảnh báo khi mức sử dụng đĩa ≥ 85 %, PSI bộ nhớ
`full/avg60` ≥ 10 %, và số listener vượt quá `MAX_ACTIVE_RUNNERS` (kèm phân tích
omniroute/khác). Exit 1 = cần chú ý; hãy đọc nhật ký.

## Các unit runner: KillMode

Giá trị mặc định `KillMode=process` của runner khiến `Runner.Worker → npm → next-build`
vẫn chạy khi một unit bị dừng hoặc khởi động lại — một bản build mồ côi tiếp tục tiêu tốn RAM và
CPU dù không còn job nào gắn với nó. Mỗi unit OmniRoute đều có một drop-in
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)
với `KillMode=mixed`: trước tiên gửi SIGTERM đến listener, sau đó gửi SIGKILL đến toàn bộ cgroup khi
đạt `TimeoutStop`. Thiết lập này có hiệu lực trong lần khởi động lại tiếp theo của unit — chỉ khởi động lại **từng runner một,
và chỉ khi đang rảnh**, với bước kiểm tra trạng thái rảnh và khởi động lại nằm trong cùng một lệnh.

## Quy tắc vận hành

- **Giới hạn build nặng: MỖI LẦN MỘT JOB — được thực thi bằng label (kể từ 2026-08-29).** Mọi job
  chạy toàn bộ `next build` đều nhắm đến `[self-hosted, omni-build]`, và chỉ
  **`omniroute-113-5`** mang label đó (được thêm thông qua API của runner — không
  đăng ký lại): `ci.yml` `Build`, `npm-publish.yml` `publish`, cả hai bước xác thực
  `nightly-release-green`, và **amd64** của `docker-publish.yml` (runner hosted
  7 GB gặp ResourceExhausted trên cây này — #11976). Nhánh Docker arm64 vẫn chạy trên
  `ubuntu-24.04-arm` (không có máy ARM) với webpack. Docker amd64 cũng sử dụng webpack:
  Turbopack trên cây này đã panic bên trong BuildKit (`TurbopackInternalError:
there must be a path to a root`, lần chạy 33253576569) ngay cả với 31 GB; bản build
  webpack arm64 của cùng cây đó trên ARM hosted đã thành công. amd64 của `docker-publish`
  dùng chung nhóm concurrency `heavy-build-main` với `ci.yml` `Build`
  (`cancel-in-progress: false`), vì vậy nó sẽ xếp hàng chờ một slot duy nhất. Docker Engine
  phải có trên `omniroute-113-5` (`docker info` là bước đầu tiên của job publish).
  Hai từng là giới hạn trước đây và mức đó không phù hợp với 31 GB: vào
  2026-08-29 17:26 UTC, hai tiến trình `next-build` chạy đồng thời (15.4 GB + 17.2 GB RSS) khiến máy
  chỉ còn trống 5 GB, sử dụng 4 GB swap và kernel đã OOM-kill một trong số đó — systemd
  ghi nhận lần kill này trên unit của runner _còn lại_, `runsvc.sh` gửi SIGKILL đến listener đó, và
  job trên đó chết với thông báo "The runner has received a shutdown signal" (cùng nội dung với lỗi
  OOM của runner hosted). `omniroute-113-6` chỉ giữ `omni-release`. Các build nặng từ
  những lần merge vào `main`, PR và tác vụ hằng đêm hiện được tuần tự hóa trên một slot; phải chấp nhận
  việc xếp hàng. Slot thứ hai sẽ trở lại khi VM Proxmox được cấp thêm RAM (48–64 GB):
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`.
- **Nhóm nhẹ: `omni-light` (2026-08-29, #11965).** `omniroute-113` và `omniroute-113-2` mang
  `omni-light` dành cho các job cần `next build` chỉ cho backend (~5–6 GB), nhưng không cần build đầy đủ:
  các job Schemathesis, promptfoo, garak và axe-a11y hằng đêm. Chúng từng chạy trên runner hosted 7 GB và
  chết trên `release/v3.8.51` mà không có ai theo dõi. Trường hợp xấu nhất trên máy là 2 job nặng + 2 job nhẹ ≈
  30 + 12 GB — vượt quá 31 GB RAM nhưng vẫn nằm trong 16 GB swap; giải pháp thực sự để có thêm dư địa là tăng RAM
  cho VM Proxmox (`tomni-proxmox-113`), khi đó các giới hạn bằng label có thể tăng thành 3 job nặng + 2 job nhẹ.
- **Cố ý giảm số lượng listener.** Bốn unit OmniRoute đã bị vô hiệu hóa vào 2026-08-29 — vì chỉ có
  `ci.yml` `Build` và các tác vụ hằng đêm sử dụng máy này, 8 listener từng ở trạng thái rảnh và mỗi listener bổ sung là một
  đối tượng tiềm năng có thể chiếm 14 GB. Giới hạn của janitor là 6 (`MAX_ACTIVE_RUNNERS=6` trong cron): nó đếm
  mọi `Runner.Listener` trên máy, và OmniHeuris + OmniMind bổ sung hai listener vào bốn listener của chúng ta.
- **Không bao giờ dọn dẹp `/tmp` hoặc `_work` bằng tay khi có bất kỳ runner nào đang bận.** Việc
  kiểm tra rồi xóa với một khoảng trống giữa hai thao tác là nguyên nhân khiến một job Build đang chạy bị mất
  `_work` vào 2026-08-27. Janitor thực hiện kiểm tra và xóa trong một bước;
  hãy để nó xử lý.
- Dừng runner giữa chừng sẽ hủy job (đã quan sát trực tiếp): chỉ chạy `systemctl stop`
  khi listener của nó không có tiến trình con `Runner.Worker` — và thực hiện việc đó trong một lệnh duy nhất.
- Các workflow không được lưu tạm artefact trong `/tmp` (đó là RAM). Hãy tải xuống
  `$RUNNER_TEMP` (nằm trên đĩa, riêng cho từng runner) — artefact `next-build` 1.3 GB mất 27–32
  phút để được ghi vào tmpfs và 2 phút để upload từ đĩa.
- VPS `.15` chỉ dành cho homologation — tuyệt đối không chạy runner CI.
