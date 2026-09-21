# Self-Hosted Runner Box Operations (.113 pool) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇯🇵 [ja](../../../ja/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

自托管运行器池（所有八个运行器均带有 `self-hosted, omni-release` 标签；其中两个还带有 `omni-build` 标签）运行在 **.113** 主机上。
测量于 2026-08-28（v3.8.50 事后分析，第 III 部分）：

| 资源      | 数值                                                                                                                     | 对调度的影响                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 核**（本文档最初编写时为 16 GB）                                                                            | 单个 `next-build` 峰值约为 **14 GB** → 2 个并发重型构建会使主机资源饱和，3 个会将其拖垮（2026-08-28 06:42Z：负载 56，两个作业丢失） |
| 交换空间  | 15 GB                                                                                                                    | 它依靠交换空间勉强完成了 v3.8.50 发布；内存压力可在 `/proc/pressure/memory` 中看到                                                  |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                                    | 任何存放在这里的内容都会占用内存；残留内容会在 3 小时后清理                                                                         |
| 磁盘      | 188 GB                                                                                                                   | 如果不加限制，8 个运行器的 `_work` 检出目录会达到约 70 GB                                                                           |
| 运行器    | **6 个监听器**：4 个 OmniRoute（1 个 `omni-build` + 1 个仅限 `omni-release` + 2 个 `omni-light`）+ OmniHeuris + OmniMind | 它们共享上述内存；`omniroute-113-3/-4/-7/-8` 已禁用（使用 `systemctl enable --now` 可重新启用其中一个）                             |

## 安装清理程序（仅需一次，在该主机上执行）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：每 30 分钟运行一次，日志写入 /var/log/runner-janitor.log
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

必须安装 `lsof`：清理程序在删除路径前，会通过一次打开文件快照确认该路径处于空闲状态；如果没有此工具，它不会删除任何内容，并会明确说明原因（退出码为 1）。进行任何更改前，请先使用 `--dry-run` 试运行——它会准确输出将要执行的操作，但不会改动任何内容。

每次运行时，它会执行以下操作：清理我们自己的残留项（`runner-*`、`omniroute-*`、`next-build*`、`e2e-build.tar.gz`），tmpfs 上的项目在 **3 小时**后清理，磁盘上 `_work/_temp` 中的项目在 24 小时后清理；终止运行时间超过 75 分钟的 `next-build`（没有任何作业应该运行这么久——2026-08-27 有一个作业在 GitHub 已宣布其丢失后又运行了 70 分钟）；清理对应单元已**停止**的运行器中存在超过 48 小时的检出目录；当磁盘使用率 ≥ 85%、内存 PSI `full/avg60` ≥ 10%，或监听器数量超过 `MAX_ACTIVE_RUNNERS` 时发出警报（并提供 omniroute/其他监听器的分类统计）。退出码为 1 = 需要处理；请查看日志。

## 运行器单元：KillMode

运行器默认的 `KillMode=process` 会在单元停止或重启时留下仍在运行的 `Runner.Worker → npm → next-build`
——孤儿构建会在没有关联作业的情况下继续消耗 RAM 和
CPU。每个 OmniRoute 单元都带有一个插入配置
(`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`)，
其中设置了 `KillMode=mixed`：首先向监听器发送 SIGTERM，并在
`TimeoutStop` 时向整个 cgroup 发送 SIGKILL。该配置会在单元下次重启时生效——**每次只重启一个运行器，
且仅在其空闲时进行**，并将空闲检查和重启放在同一条命令中。

## 操作规则

- **重型构建上限：一次只能运行一个——通过标签强制执行（自 2026-08-29 起）。** 每个
  运行完整 `next build` 的作业都以 `[self-hosted, omni-build]` 为目标，并且只有
  **`omniroute-113-5`** 带有该标签（通过运行器 API 添加——无需
  重新注册）：`ci.yml` 的 `Build`、`npm-publish.yml` 的 `publish`、两项
  `nightly-release-green` 验证，以及 `docker-publish.yml` 的 **amd64**（托管的
  7 GB 运行器在此代码树上出现 ResourceExhausted——#11976）。arm64 Docker 分支仍在
  `ubuntu-24.04-arm` 上使用 webpack（没有 ARM 机器）。Docker amd64 也使用 webpack：
  即使有 31 GB，Turbopack 在此代码树上仍会在 BuildKit 内部崩溃（`TurbopackInternalError:
there must be a path to a root`，运行 33253576569）；同一代码树的 arm64 webpack
  构建则在托管 ARM 运行器上成功。`docker-publish` 的 amd64 与 `ci.yml` 的 `Build`
  共享 `heavy-build-main` 并发组（`cancel-in-progress: false`），因此会在唯一的槽位上排队。Docker Engine
  必须位于 `omniroute-113-5` 上（`docker info` 是发布
  作业的第一个步骤）。之前的上限是两个，但对于 31 GB 来说这是错误的：在
  2026-08-29 17:26 UTC，两个并发的 `next-build`（RSS 分别为 15.4 GB 和 17.2 GB）使该机器
  只剩 5 GB 可用内存，且已使用 4 GB 交换空间，内核通过 OOM 终止了其中一个——systemd
  将此次终止记在了_另一个_运行器的单元上，`runsvc.sh` 通过 SIGKILL 终止了该监听器，并且
  其上的作业以“The runner has received a shutdown signal”失败（文本与
  托管运行器发生 OOM 时相同）。`omniroute-113-6` 仅保留 `omni-release`。来自
  `main` 合并、PR 和夜间任务的重型构建现在都在单一槽位上串行运行；排队是为此付出的代价。
  当 Proxmox VM 获得更多 RAM（48–64 GB）时，第二个槽位即可恢复：
  `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`。
- **轻型池：`omni-light`（2026-08-29，#11965）。** `omniroute-113` 和 `omniroute-113-2` 带有
  `omni-light`，供需要仅后端 `next build`（约 5–6 GB）、但不需要完整构建的作业使用：夜间
  Schemathesis、promptfoo、garak 和 axe-a11y 作业。它们曾在托管的 7 GB 运行器上运行，并在
  `release/v3.8.51` 上无人关注时失败。该机器的最坏情况是 2 个重型 + 2 个轻型 ≈
  30 + 12 GB——超过 31 GB RAM，但仍在 16 GB 交换空间的范围内；真正解决余量问题的方法是为
  Proxmox VM（`tomni-proxmox-113`）增加 RAM，这会使标签上限变为 3 个重型 + 2 个轻型。
- **有意减少监听器。** 2026-08-29 禁用了四个 OmniRoute 单元——由于只有
  `ci.yml` 的 `Build` 和夜间任务使用该机器，8 个监听器一直处于空闲状态，而每增加一个监听器都可能成为一个
  占用 14 GB 的租户。清理器上限为 6（cron 中的 `MAX_ACTIVE_RUNNERS=6`）：它会统计
  机器上的每个 `Runner.Listener`，而 OmniHeuris + OmniMind 会在我们的四个之外再增加两个。
- **任何运行器繁忙时，绝不要手动清理 `/tmp` 或 `_work`。** 先检查后删除且两者之间存在时间间隔，
  正是 2026-08-27 一个正在运行的 Build 作业丢失其
  `_work` 的原因。清理器会在一个步骤中完成检查和删除；
  让它来处理。
- 在作业执行期间停止运行器会取消该作业（已在线观察到）：仅当监听器没有
  `Runner.Worker` 子进程时才能执行 `systemctl stop`——并且要在一条命令中完成。
- 工作流不得将制品存放在 `/tmp` 中（它位于 RAM 中）。应下载到
  `$RUNNER_TEMP`（位于磁盘上，每个运行器独立）——1.3 GB 的 `next-build` 制品需要 27–32
  分钟才能写入 tmpfs，而从磁盘上传只需 2 分钟。
- `.15` VPS 仅用于验收环境——绝不运行 CI 运行器。
