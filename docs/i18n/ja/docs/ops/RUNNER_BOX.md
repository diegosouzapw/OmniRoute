# Self-Hosted Runner Box Operations (.113 pool) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RUNNER_BOX.md) · 🇪🇹 [am](../../../am/docs/ops/RUNNER_BOX.md) · 🇸🇦 [ar](../../../ar/docs/ops/RUNNER_BOX.md) · 🇦🇿 [az](../../../az/docs/ops/RUNNER_BOX.md) · 🇧🇬 [bg](../../../bg/docs/ops/RUNNER_BOX.md) · 🇧🇩 [bn](../../../bn/docs/ops/RUNNER_BOX.md) · 🇨🇿 [cs](../../../cs/docs/ops/RUNNER_BOX.md) · 🇩🇰 [da](../../../da/docs/ops/RUNNER_BOX.md) · 🇩🇪 [de](../../../de/docs/ops/RUNNER_BOX.md) · 🇬🇷 [el](../../../el/docs/ops/RUNNER_BOX.md) · 🇪🇸 [es](../../../es/docs/ops/RUNNER_BOX.md) · 🇪🇪 [et](../../../et/docs/ops/RUNNER_BOX.md) · 🇮🇷 [fa](../../../fa/docs/ops/RUNNER_BOX.md) · 🇫🇮 [fi](../../../fi/docs/ops/RUNNER_BOX.md) · 🇫🇷 [fr](../../../fr/docs/ops/RUNNER_BOX.md) · 🇮🇪 [ga](../../../ga/docs/ops/RUNNER_BOX.md) · 🇮🇳 [gu](../../../gu/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ha](../../../ha/docs/ops/RUNNER_BOX.md) · 🇮🇱 [he](../../../he/docs/ops/RUNNER_BOX.md) · 🇮🇳 [hi](../../../hi/docs/ops/RUNNER_BOX.md) · 🇭🇷 [hr](../../../hr/docs/ops/RUNNER_BOX.md) · 🇭🇺 [hu](../../../hu/docs/ops/RUNNER_BOX.md) · 🇦🇲 [hy](../../../hy/docs/ops/RUNNER_BOX.md) · 🇮🇩 [id](../../../id/docs/ops/RUNNER_BOX.md) · 🇳🇬 [ig](../../../ig/docs/ops/RUNNER_BOX.md) · 🇮🇹 [it](../../../it/docs/ops/RUNNER_BOX.md) · 🇬🇪 [ka](../../../ka/docs/ops/RUNNER_BOX.md) · 🇰🇭 [km](../../../km/docs/ops/RUNNER_BOX.md) · 🇮🇳 [kn](../../../kn/docs/ops/RUNNER_BOX.md) · 🇰🇷 [ko](../../../ko/docs/ops/RUNNER_BOX.md) · 🇱🇹 [lt](../../../lt/docs/ops/RUNNER_BOX.md) · 🇱🇻 [lv](../../../lv/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ml](../../../ml/docs/ops/RUNNER_BOX.md) · 🇮🇳 [mr](../../../mr/docs/ops/RUNNER_BOX.md) · 🇲🇾 [ms](../../../ms/docs/ops/RUNNER_BOX.md) · 🇲🇹 [mt](../../../mt/docs/ops/RUNNER_BOX.md) · 🇲🇲 [my](../../../my/docs/ops/RUNNER_BOX.md) · 🇳🇵 [ne](../../../ne/docs/ops/RUNNER_BOX.md) · 🇳🇱 [nl](../../../nl/docs/ops/RUNNER_BOX.md) · 🇳🇴 [no](../../../no/docs/ops/RUNNER_BOX.md) · 🇮🇳 [or](../../../or/docs/ops/RUNNER_BOX.md) · 🇮🇳 [pa](../../../pa/docs/ops/RUNNER_BOX.md) · 🇵🇭 [phi](../../../phi/docs/ops/RUNNER_BOX.md) · 🇵🇱 [pl](../../../pl/docs/ops/RUNNER_BOX.md) · 🇵🇹 [pt](../../../pt/docs/ops/RUNNER_BOX.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RUNNER_BOX.md) · 🇷🇴 [ro](../../../ro/docs/ops/RUNNER_BOX.md) · 🇷🇺 [ru](../../../ru/docs/ops/RUNNER_BOX.md) · 🇱🇰 [si](../../../si/docs/ops/RUNNER_BOX.md) · 🇸🇰 [sk](../../../sk/docs/ops/RUNNER_BOX.md) · 🇸🇮 [sl](../../../sl/docs/ops/RUNNER_BOX.md) · 🇷🇸 [sr](../../../sr/docs/ops/RUNNER_BOX.md) · 🇸🇪 [sv](../../../sv/docs/ops/RUNNER_BOX.md) · 🇰🇪 [sw](../../../sw/docs/ops/RUNNER_BOX.md) · 🇮🇳 [ta](../../../ta/docs/ops/RUNNER_BOX.md) · 🇮🇳 [te](../../../te/docs/ops/RUNNER_BOX.md) · 🇹🇭 [th](../../../th/docs/ops/RUNNER_BOX.md) · 🇹🇷 [tr](../../../tr/docs/ops/RUNNER_BOX.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RUNNER_BOX.md) · 🇵🇰 [ur](../../../ur/docs/ops/RUNNER_BOX.md) · 🇺🇿 [uz](../../../uz/docs/ops/RUNNER_BOX.md) · 🇻🇳 [vi](../../../vi/docs/ops/RUNNER_BOX.md) · 🇳🇬 [yo](../../../yo/docs/ops/RUNNER_BOX.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RUNNER_BOX.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RUNNER_BOX.md)

---

セルフホストプール（8 台すべてのランナーで `self-hosted, omni-release`、うち 2 台で `omni-build`）は、**.113** マシン上で稼働しています。
2026-08-28 に測定（v3.8.50 の事後検証、第 III 部）：

| リソース  | 値                                                                                                                        | スケジューリング上の意味                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RAM / CPU | **31 GB / 32 コア**（このドキュメントの初版作成時は 16 GB）                                                               | 1 つの `next-build` がピーク時に **約 14 GB** を使用 → 重いビルドを 2 件同時実行するとマシンが飽和し、3 件ではダウンする（2026-08-28 06:42Z：負荷 56、2 ジョブ消失） |
| swap      | 15 GB                                                                                                                     | v3.8.50 の公開処理をスワップしながら乗り切った。負荷状況は `/proc/pressure/memory` に現れる                                                                          |
| `/tmp`    | **12 GB tmpfs = RAM**                                                                                                     | ここに置かれたものはすべてメモリを消費する。残留物は 3 時間後に削除される                                                                                            |
| disk      | 188 GB                                                                                                                    | 上限を設定しない場合、8 台のランナーの `_work` チェックアウトは約 70 GB に達する                                                                                     |
| runners   | **6 リスナー**：OmniRoute 4 台（`omni-build` 1 台 + `omni-release` 専用 1 台 + `omni-light` 2 台）+ OmniHeuris + OmniMind | すべてが上記のメモリを共有する。`omniroute-113-3/-4/-7/-8` は無効化されている（`systemctl enable --now` で 1 台を復帰可能）                                          |

## janitor のインストール（マシン上で 1 回のみ）

```bash
scp scripts/ops/runner-janitor.sh root@192.168.0.113:/opt/omniroute-ops/runner-janitor.sh
ssh root@192.168.0.113 'chmod +x /opt/omniroute-ops/runner-janitor.sh; apt-get install -y lsof'
# cron（root）：30 分ごとに実行し、/var/log/runner-janitor.log に記録
*/30 * * * * MAX_ACTIVE_RUNNERS=6 /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1
```

`lsof` は必須です。janitor はパスを削除する前に、開いているファイルのスナップショットを 1 回取得して、そのパスが使用されていないことを確認します。このツールがない場合は何も削除せず、その旨を通知します（終了コード 1）。変更を加える場合は、まず `--dry-run` で試してください。実行予定の処理が正確に表示され、実際には何も変更されません。

実行のたびに行う処理：**tmpfs 上では 3 時間後**、ディスク上の
`_work/_temp` では 24 時間後に、独自の残留物（`runner-*`、`omniroute-*`、
`next-build*`、`e2e-build.tar.gz`）を削除する。75 分を超えた `next-build`
を強制終了する（これほど長時間実行されるジョブはない。2026-08-27 には、
GitHub がジョブの消失を宣言した後も 1 件が 70 分間実行され続けた）。ユニットが
**停止中**のランナーについて、48 時間以上前のチェックアウトを削除する。ディスク使用率
≥ 85 %、メモリ PSI `full/avg60` ≥ 10 %、またはリスナー数が
`MAX_ACTIVE_RUNNERS` を超えた場合に警告する（omniroute/その他の内訳も表示）。
終了コード 1 = 対応が必要です。ログを確認してください。

## Runnerユニット: KillMode

runnerのデフォルトである`KillMode=process`では、ユニットを停止または再起動しても`Runner.Worker → npm → next-build`が生き残ります。孤児化したビルドは、紐づくジョブがないままRAMとCPUを消費し続けます。すべてのOmniRouteユニットには、`KillMode=mixed`を指定したdrop-in（`/etc/systemd/system/actions.runner.diegosouzapw-OmniRoute.<name>.service.d/10-killmode.conf`）があります。これは最初にlistenerへSIGTERMを送り、`TimeoutStop`到達時にcgroup全体へSIGKILLを送ります。この設定はユニットの次回再起動時に有効になります。**一度に1つのrunnerだけを、アイドル時に限って**再起動し、アイドル確認と再起動を同じコマンド内で実行してください。

## 運用ルール

- **重量級ビルドの上限: 一度に1つ — labelで強制（2026-08-29以降）。** 完全な`next build`を実行するすべてのジョブは`[self-hosted, omni-build]`を対象とし、そのlabelを持つのは**`omniroute-113-5`**だけです（再登録せず、runners API経由で追加）。対象は、`ci.yml`の`Build`、`npm-publish.yml`の`publish`、両方の`nightly-release-green`検証、および`docker-publish.yml`の**amd64**です（このツリーでは、ホステッド環境の7 GBでResourceExhaustedが発生 — #11976）。arm64 Docker処理は、ARMマシンがないため`ubuntu-24.04-arm`上に残し、webpackを使用します。Docker amd64もwebpackを使用します。このツリーでは、31 GBあってもTurbopackがBuildKit内でpanicしました（`TurbopackInternalError: there must be a path to a root`、run 33253576569）。一方、同じツリーのarm64 webpackビルドはホステッドARM上で成功しました。`docker-publish`のamd64は、`ci.yml`の`Build`と`heavy-build-main` concurrency groupを共有し（`cancel-in-progress: false`）、1つしかないslotが空くまでキューで待機します。Docker Engineは`omniroute-113-5`上になければならず、`docker info`がpublishジョブの最初のstepです。以前の上限は2でしたが、31 GBでは誤りでした。2026-08-29 17:26 UTCに2つの`next-build`（RSS 15.4 GB + 17.2 GB）が同時実行され、空き容量が5 GBまで減少し、4 GBのswapが使用され、kernel OOMによって一方がkillされました。systemdはそのkillを_もう一方の_runnerのユニットに記録し、`runsvc.sh`がそのlistenerをSIGKILLしたため、そこで実行中だったジョブは"The runner has received a shutdown signal"というメッセージとともに停止しました（ホステッドrunnerでのOOMと同じ文言）。`omniroute-113-6`は`omni-release`だけを保持します。`main`へのmerge、PR、nightlyからの重量級ビルドは、今後1つのslot上で直列実行されます。その代償がキュー待ちです。Proxmox VMのRAMが増設された日（48–64 GB）に、2つ目のslotを復活させます: `gh api -X POST repos/<repo>/actions/runners/<id of omniroute-113-6>/labels -f 'labels[]=omni-build'`。
- **軽量pool: `omni-light`（2026-08-29、#11965）。** `omniroute-113`と`omniroute-113-2`は、完全なビルドではなくbackendのみの`next build`（約5–6 GB）を必要とするジョブ向けに`omni-light`を持ちます。対象はnightlyのSchemathesis、promptfoo、garak、axe-a11yジョブです。これらはホステッド環境の7 GB runner上で実行され、誰にも監視されていない状態で`release/v3.8.51`上で停止しました。このマシンにおける最悪のケースは、重量級2つ + 軽量2つ ≈ 30 + 12 GBです。これは31 GBのRAMを超えますが、16 GBのswap内には収まります。余裕を確保する本当の解決策は、Proxmox VM（`tomni-proxmox-113`）のRAMを増設することです。そうすれば、labelによる上限を重量級3つ + 軽量2つにできます。
- **listenerを意図的に削減。** 2026-08-29に4つのOmniRouteユニットを無効化しました。このマシンを使用するのは`ci.yml`の`Build`とnightlyだけであり、8つのlistenerはアイドル状態でした。また、listenerが1つ増えるごとに、14 GBを消費する可能性のあるtenantが1つ増えます。janitorの上限は6です（cron内の`MAX_ACTIVE_RUNNERS=6`）。これはマシン上のすべての`Runner.Listener`をカウントし、OmniHeurisとOmniMindが、こちらの4つに加えて2つを占有します。
- **いずれかのrunnerがbusyである間は、決して手動で`/tmp`や`_work`をクリーンアップしないでください。** 確認と削除の間に時間差があるcheck-then-deleteが原因で、2026-08-27に実行中のBuildジョブが自身の`_work`を失いました。janitorは確認と削除を1つのstepで実行します。janitorに任せてください。
- ジョブ実行中にrunnerを停止すると、そのジョブはキャンセルされます（実環境で確認済み）。`systemctl stop`は、そのlistenerに`Runner.Worker`子プロセスがない場合に限って使用し、確認と停止を1つのコマンド内で実行してください。
- workflowはアーティファクトを`/tmp`に置いたままにしてはいけません（そこはRAMです）。`$RUNNER_TEMP`（runnerごとに用意されたディスク上の領域）へダウンロードしてください。1.3 GBの`next-build`アーティファクトをtmpfsへ保存するのに27～32分かかった一方、ディスクからのuploadは2分でした。
- `.15` VPSはhomologation専用です。CI runnerは決して実行しません。
