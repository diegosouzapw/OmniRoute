# Self-Hosted Runner Box Operations (.113 pool) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇧🇦 [bs](../../../bs/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md)

---

自架集區（所有八個執行器皆為 `self-hosted, omni-release`；其中兩個為 `omni-build`）在 **.113** 主機上執行。
測量日期為 2026-08-28（v3.8.50 事後檢討，第三部分）：

| 資源      | 數值                                                                                                                     | 對排程的意義                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 核心**（本文件初次撰寫時為 16 GB）                                                                          | 一個 `next-build` 的峰值約為 **~14 GB** → 同時執行 2 個高負載建置會使主機飽和，3 個則會使其停擺（2026-08-28 06:42Z：負載 56，兩個工作遺失） |
| swap      | 15 GB                                                                                                                    | 它靠交換空間撐過了 v3.8.50 發佈；壓力會顯示在 `/proc/pressure/memory` 中                                                                    |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                                    | 放在那裡的任何內容都會占用記憶體；殘留項目會在 3 小時後清除                                                                                 |
| 磁碟      | 188 GB                                                                                                                   | 8 個執行器的 `_work` 簽出項目在沒有上限的情況下會達到約 70 GB                                                                               |
| 執行器    | **6 個監聽器**：4 個 OmniRoute（1 個 `omni-build` + 1 個僅限 `omni-release` + 2 個 `omni-light`）+ OmniHeuris + OmniMind | 全部共用上述記憶體；`omniroute-113-3/-4/-7/-8` 已停用（`systemctl enable --now` 可重新啟用其中一個）                                        |

## 安裝清理程式（一次性，在該主機上執行）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：每 30 分鐘執行一次，記錄至 /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

需要 `lsof`：清理程式會先取得一次開啟中檔案的快照，以確認路徑處於閒置狀態，才會將其移除；若沒有此工具，它不會移除任何內容，並會明確說明
（結束碼 1）。任何變更都應先使用 `--dry-run` 測試——它會精確列出將執行的操作，
且不會變更任何內容。

每次執行時會進行以下操作：清除我們自己的殘留項目（`runner-*`、`omniroute-*`、
`next-build*`、`e2e-build.tar.gz`），在 **tmpfs 上超過 3 小時**或磁碟上的
`_work/_temp` 中超過 24 小時即清除；終止執行超過 75 分鐘的 `next-build`（沒有任何工作會執行這麼久——
2026-08-27 有一個工作在 GitHub 已宣告其遺失後仍執行了 70 分鐘）；清除所屬單元為
**已停止**之執行器中超過 48 小時的簽出項目；在磁碟使用率 ≥ 85%、記憶體 PSI
`full/avg60` ≥ 10%，以及監聽器數量超過 `MAX_ACTIVE_RUNNERS` 時發出警示（並分別列出
omniroute/其他的數量）。結束碼 1 = 需要處理；請查看日誌。

## Runner 單元：KillMode

Runner 預設的 `KillMode=process` 會在單元停止或重新啟動時，讓 `Runner.Worker → npm → next-build`
繼續存活——孤兒建置程序會在沒有任何工作與其關聯的情況下持續消耗 RAM 和
CPU。每個 OmniRoute 單元都帶有一個置入式設定
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)，
其中設定 `KillMode=mixed`：先向監聽器傳送 SIGTERM，並在
`TimeoutStop` 時對整個 cgroup 傳送 SIGKILL。此設定會在單元下次重新啟動時生效——**一次只重新啟動一個 runner，而且僅能在閒置時進行**，並將閒置檢查與重新啟動放在同一個命令中。

## 操作規則

- **重型建置上限：一次一個——透過標籤強制執行（自 2026-08-29 起）。** 每個執行完整 `next build` 的工作
  都以 `[self-hosted, omni-build]` 為目標，而且只有
  **`omniroute-113-5`** 帶有該標籤（透過 runners API 新增——無須
  重新註冊）：`ci.yml` 的 `Build`、`npm-publish.yml` 的 `publish`、兩個
  `nightly-release-green` 驗證，以及 `docker-publish.yml` 的 **amd64**（託管式
  7 GB runner 在此程式碼樹上發生 ResourceExhausted——#11976）。arm64 Docker 分支仍在
  `ubuntu-24.04-arm` 上使用 webpack（沒有 ARM 主機）。Docker amd64 也使用 webpack：
  在此程式碼樹上，即使有 31 GB，Turbopack 仍於 BuildKit 內發生 panic（`TurbopackInternalError:
there must be a path to a root`，執行 33253576569）；同一程式碼樹的 arm64 webpack
  建置則在託管式 ARM runner 上成功。`docker-publish` amd64 與 `ci.yml` 的 `Build`
  共用 `heavy-build-main` 並行群組（`cancel-in-progress: false`），因此會在唯一的執行槽上排隊。
  Docker Engine 必須位於 `omniroute-113-5`（`docker info` 是發布工作的第一個步驟）。
  先前的上限是兩個，但對 31 GB 而言是錯誤的：在
  2026-08-29 17:26 UTC，兩個並行的 `next-build`（15.4 GB + 17.2 GB RSS）使該主機
  僅剩 5 GB 可用空間，並用了 4 GB swap，核心因 OOM 而終止其中一個程序——systemd
  將該終止事件記在_另一個_ runner 的單元上，`runsvc.sh` 以 SIGKILL 終止該監聽器，而
  其上的工作則以「The runner has received a shutdown signal」失敗（與
  託管式 runner 發生 OOM 時的文字相同）。`omniroute-113-6` 僅保留 `omni-release`。
  來自 `main` 合併、PR 與每夜作業的重型建置現在會在單一執行槽上依序執行；排隊就是代價。
  當 Proxmox VM 增加更多 RAM（48–64 GB）時，第二個執行槽便可恢復：
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`。
- **輕量池：`omni-light`（2026-08-29，#11965）。** `omniroute-113` 與 `omniroute-113-2` 帶有
  `omni-light`，供只需要後端 `next build`（約 5–6 GB）、但不需要完整建置的工作使用：
  每夜 Schemathesis、promptfoo、garak 與 axe-a11y 工作。它們曾在託管式 7 GB runner 上執行，並在
  `release/v3.8.51` 上於無人監看時失敗。該主機的最壞情況是 2 個重型 + 2 個輕量 ≈
  30 + 12 GB——超過 31 GB RAM，但仍在 16 GB swap 的範圍內；真正能增加餘裕的修正方式，是為
  Proxmox VM（`tomni-proxmox-113`）增加更多 RAM，如此便可將標籤上限改為 3 個重型 + 2 個輕量。
- **刻意減少監聽器數量。** 2026-08-29 停用了四個 OmniRoute 單元——由於只有
  `ci.yml` 的 `Build` 與每夜作業會使用該主機，8 個監聽器都處於閒置狀態，而每增加一個都可能成為
  消耗 14 GB 的租戶。清理程序的上限是 6（cron 中的 `MAX_ACTIVE_RUNNERS=6`）：它會計算
  主機上的每個 `Runner.Listener`，而 OmniHeuris + OmniMind 會在我們的四個之外再增加兩個。
- **任何 runner 忙碌時，絕不可手動清理 `/tmp` 或 `_work`。** 先檢查後刪除且兩者之間存在間隔，
  正是導致一個進行中的 Build 工作在 2026-08-27 遺失其
  `_work` 的原因。清理程序會在同一個步驟中完成檢查與移除；
  交給它處理即可。
- 在工作執行途中停止 runner 會取消該工作（已在實際環境中觀察到）：只有在其監聽器沒有
  `Runner.Worker` 子程序時才能執行 `systemctl stop`——而且必須在同一個命令中完成。
- 工作流程不得將成品暫存在 `/tmp`（它位於 RAM 中）。請下載至
  `$RUNNER_TEMP`（位於磁碟上，每個 runner 各自獨立）——1.3 GB 的 `next-build` 成品需要 27–32
  分鐘才能寫入 tmpfs，而從磁碟上傳只需 2 分鐘。
- `.15` VPS 僅用於驗收環境——絕不執行 CI runner。
