# Merge Queue & Manual Merge-Train Runbook (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49（quality/velocity プランの WS3.2/WS3.4）以降、レビュー済み PR を
`release/vX.Y.Z` にマージするデフォルトの経路は **Mergify マージキュー**（`.mergify.yml`）です。
以下に記載する **手動マージトレイン**はフォールバックであり、インシデント時、
リリース凍結中、または Mergify Open Source プランが変更された場合に使用します。

## デフォルトの経路: Mergify キュー

1. PR はキャンペーンによってレビューされ、成功状態になったうえで、オーナーのマージ前 ⭐
   ゲート（レポート + 項目ごとの判断 — `/merge-prs` のステップ 0.75 を参照）によって承認されます。
2. オーナー（またはオーナーの判断に基づいて動作するセッション）が **`queue`**
   ラベルを付与します。このラベル自体がマージ承認です。Mergify はそれを実行するだけです。
3. Mergify はキューに入った PR を高速ゲートに対して **直列に**（一度に 1 件ずつ）
   検証し、マージ（squash）します。バッチ処理 + 自動二分探索は Mergify の有料ティアの機能
   （無料プランでは「Cannot use Merge Queue batch」、#7220）であるため、`.mergify.yml` では
   `batch_size` を設定していません。バッチ処理は、引き続き以下の手動マージトレインが担当します。
   `checks_timeout`（240 分 = `quality.yml` で測定された p95 の 2 倍）を過ぎても
   チェックが保留中の PR は、キューを停滞させる代わりにキューから削除されます。
4. マージ後、継続的なリリース成功状態ワークフローが push 時に新しい先端を検証し、
   その組み合わせでリグレッションが発生した場合は原因帰属用の issue を作成します
   （自動 revert は決して行いません）。

ガードレール（`CLAUDE.md` のハードルール #21/#22 に準拠）:

- **リリースフリーズ中** → フリーズ対象ブランチをターゲットとする PR にラベルを付けないでください。
  まず、アクティブな `release/vX+1` にターゲットを変更してください。
- **別のセッションで進行中の PR** → 決してラベルを付けないでください。各セッションは、
  自身が所有する作業のみをキューに入れます。
- テストのみの差分と `hotfix` ラベル付き PR では、すでに縮小版 CI が実行されます
  （`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane を参照）。キュー条件では、実際に実行された
  チェックセットをそのまま受け入れます（`#check-failure=0` + `#check-pending=0`）。

## フォールバック: 手動マージトレイン

キューを利用できない場合に使用します。これは、v3.8.47 サイクル中に 1 日で 33 件の PR を
処理した手法を体系化したものです。

1. **バッチを編成**します（レビュー・承認済みの PR を約 10～30 件）。`linked:` の衝突
   （同じ `tap.testFiles`、同じ CHANGELOG の変更箇所）を確認し、それらは順番に処理します。
2. **1 回だけ検証**します。リリース先端から分離した worktree で、バッチ内のすべての
   head をローカルにマージしてから、リリース相当のスイート
   （`npm run check:release-green`、リリース前には `--with-build` を追加）を実行します。
   `scripts/release/merge-train.sh <base> <PR#>…` はステップ 1～2 を自動化します
   （競合する PR は除外され、トレインは処理を続行します）。フルモードでは
   `npm run test:unit`、つまりマシン向けに調整されたランナー（`--test-concurrency=20`）を
   実行します。4 コアの CI shard 2 つを順番に実行する方式ではありません。この旧方式では、
   16 コアマシン上で主要フェーズの使用率が約 25% にとどまっていました
   （2026-07-18 に修正）。`--fast`（日中の大規模トレイン処理用、2026-07-18 にオーナー承認済み）は、
   すべての静的ゲートと vitest を維持しつつ、乗車した PR によって変更された node:test
   ファイルのみを実行します。ただし、蓄積された先端に対して少なくとも 1 日 1 回は
   FULL スイートを実行する必要があります（`--fast` を付けないトレインを 1 回実行）。
3. **グリーン** → PR を順番にマージします（各マージ前に `state,headRefOid` を再確認します。
   head が移動した PR はレビューに戻します）。各マージの正味の差分が、その PR 自身の変更で
   あることを証明します（自動解決による revert は禁止。`git diff --stat` を監査し、
   スコープ外の削除がないことを確認します）。
4. **レッド** → 1 件ずつ再検証するのではなく、バッチを半分ずつに分割して
   （各半分を検証して）二分探索します。問題のある PR は、証拠とともにレビューキューへ戻します。
5. **禁止事項**: 凍結中に凍結されたブランチへマージすること、どこかで `git stash` を
   使用すること、レッドが消えることを期待して CI を一括再実行すること
   （ルール: レッドは情報です）。

## 階層化（fast-gates のみでもキューが安全な理由）

- **PR ごと**（quality.yml fast-gates）: TIA の影響を受けるテスト + 完全な unit 4-shard +
  vitest + lint 一式 + typecheck + docs/changelog の整合性。
- **バッチ／先端ごと**（継続的 release-green）: リリースブランチへの push ごとに
  `--quick` HARD ゲートを実行し、完全な `--with-build --full-ci` スイープを 1 日 3 回実行します。
- **リリースごと**（リリース PR 上の ci.yml）: E2E ×9、package-artifact +
  tarball boot-smoke、coverage/ratchets を含む完全なマトリックス。

以前より検証が減っているものは何もありません。重い検証範囲を PR ごとではなく
バッチ／先端ごとに実行することで、O(N) の往復処理をなくしています。

## `merge-train.sh` を新規 checkout で実行するための前提条件

壊れたインストールがレッドのトレインとして誤認されることがないよう、スクリプトは
worktree での作業前にルート checkout 上でフェイルファストの**事前確認**を実行します。

1. `npm ci` を実行してから、npm によってブロックされる `bun` の postinstall を実行します。
   `(cd node_modules/bun && node install.js)` — これを行わないと、
   `check:provider-consistency` と `check:known-symbols`（どちらも `bun scripts/…`）が、
   違反行を表示せずにトレインとベースの両方で失敗します。
2. 不要な `node_modules/node_modules` が存在しないことを確認します
   （依存関係ツリーの重複により React が 2 回読み込まれ、UI vitest スイートが即座に失敗します）。
3. `node_modules/.bin/tsc` が存在し、実行可能であることを確認します
   （不完全なインストールには含まれていません）。

トレインは、ブロッキングチェックである `npm run check:cycles:ratchet` を実行します。
単独の `npm run check:cycles` は参考情報用です（SCC を一覧表示し、正常なベースでも
non-zero で終了します）。
