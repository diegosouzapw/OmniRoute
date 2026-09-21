# Merge Queue & Manual Merge-Train Runbook (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49（品質/速度計画の WS3.2/WS3.4）以降、レビュー済み PR を
`release/vX.Y.Z` にマージするデフォルトの経路は **Mergify マージキュー**
（`.mergify.yml`）です。以下に記載する **手動マージトレイン**はフォールバックであり、
インシデント、リリース凍結中、または Mergify Open Source プランが変更された場合に使用します。

## デフォルト経路：Mergify キュー

1. PR がキャンペーンによるレビューとグリーン化を完了し、オーナーのマージ前 ⭐
   ゲート（レポートと項目ごとの判断 — `/merge-prs` の Step 0.75 を参照）で承認されます。
2. オーナー（またはオーナーの判断に基づいて作業するセッション）が **`queue`**
   ラベルを付けます。このラベル自体がマージ承認です。Mergify はその承認を実行するだけです。
3. Mergify はキューに入った PR を最大 10 件までバッチ化し、高速ゲートに対してバッチを検証して、
   マージ（squash）します。赤になったバッチは**自動的に二分探索**されます。問題のある PR は
   約 log2(N) 回の再検証で特定され、キューから外されます。残りはそのまま処理されます。
4. マージ後、継続的な release-green ワークフローが push 時に新しい先端を検証し、
   組み合わせによってリグレッションが発生した場合は帰属先を示す issue を作成します
   （自動 revert は行いません）。

ガードレール（`CLAUDE.md` の Hard Rules #21/#22 と同じ）：

- **リリース凍結中** → 凍結されたブランチを対象とする PR にラベルを付けないでください。
  まずアクティブな `release/vX+1` に対象を変更します。
- **別のセッションで進行中の PR** → 決してラベルを付けないでください。各所有セッションのみが
  自身の作業をキューに入れます。
- テストのみの差分と `hotfix` ラベル付き PR では、すでに縮小版 CI が実行されます
  （`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane を参照）。キュー条件は、実際に実行された
  チェックセットをそのまま受け入れます（`#check-failure=0` + `#check-pending=0`）。

## フォールバック：手動マージトレイン

キューが利用できない場合に使用します。これは v3.8.47 サイクル中に 1 日で 33 件の PR を
処理した手法を明文化したものです。

1. **バッチを編成**します（レビュー済みかつ承認済みの PR を約 10～30 件）。
   `linked:` の衝突（同じ `tap.testFiles`、同じ CHANGELOG ハンク）を確認し、
   該当するものは直列に処理します。
2. **1 回だけ検証**します。リリース先端から分離した worktree で、バッチ内のすべての
   head をローカルにマージしてから、リリース相当のスイート
   （`npm run check:release-green`、リリース前には `--with-build` を追加）を実行します。
   `scripts/release/merge-train.sh <base> <PR#>…` は手順 1～2 を自動化します
   （競合する PR は除外され、トレインは続行されます）。フルモードでは
   `npm run test:unit`、つまりボックス向けに調整されたランナー
   （`--test-concurrency=20`）を実行します。主要フェーズで 16 コアボックスの約 25% しか
   使用していなかった、逐次実行される 2 つの 4 コア CI shard は使用しません
   （2026-07-18 に修正）。`--fast`（日中の大規模トレイン処理用、2026-07-18 にオーナー承認）は、
   すべての静的ゲートと vitest を維持しつつ、乗車した PR によって変更された node:test
   ファイルのみを実行します。ただし、蓄積された先端に対して FULL スイートを少なくとも
   1 日 1 回は実行する必要があります（1 つのトレインを `--fast` なしで実行）。
3. **グリーン** → PR を順番にマージします（各 PR の前に `state,headRefOid` を再確認します。
   head が移動した PR はレビューに戻します）。各マージの正味の差分が、その PR 自身の変更で
   あることを証明します（自動解決による revert は禁止。スコープ外の削除がないか
   `git diff --stat` を監査します）。
4. **赤** → 1 件ずつ再検証する代わりに、バッチを半分ずつ二分探索します
   （各半分を検証）。問題のある PR は、証拠とともにレビューキューへ戻します。
5. **絶対に行わないこと**：凍結中に凍結されたブランチへマージすること、
   どこであっても `git stash` を使用すること、赤が消えることを期待して CI を一括で
   再実行すること（原則：赤は情報です）。

## 階層化（高速ゲートのみでもキューが安全である理由）

- **PR ごと**（quality.yml の高速ゲート）：TIA の影響を受けるテスト + 完全な unit 4-shard +
  vitest + lint 一式 + typecheck + docs/changelog の整合性。
- **バッチ/先端ごと**（継続的 release-green）：リリースブランチへの push ごとに
  `--quick` HARD ゲートを実行し、完全な `--with-build --full-ci` sweep を 1 日 3 回実行。
- **リリースごと**（リリース PR 上の ci.yml）：E2E ×9、package-artifact +
  tarball boot-smoke、coverage/ratchets を含む完全な matrix。

以前より検証が少なくなるものはありません。負荷の高い領域を PR ごとではなく
バッチ/先端ごとに実行するようにしただけであり、これによって O(N) の往復処理が解消されます。
