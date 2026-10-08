# Release-Green: keeping the queue and release branch green (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## この仕組みが解決する問題

**フルゲート**（`.github/workflows/ci.yml` — unit shards、vitest、ratchets、
`package-artifact`、SonarQube、E2E）は、**リリース PR**（PR → `main`）でのみ実行されます。
`release/**` を対象とする PR では **fast-gates**（`quality.yml`：TIA の影響を受けるテスト + typecheck + lint）が実行され、コード変更に対しては**参考情報として**本番ビルドも実行されます。その結果、リリース時にのみ発生するエラーがリリースブランチ上で気付かれないまま蓄積し、リリース時に**約40分単位で何層にもわたって**、1つずつ**噴出する**可能性があります。

「release-green ファミリー」は、こうしたエラーを**事前に予測**するために存在します。つまり、フルゲート相当の検証を、いつでも**ローカルまたはリリース外**で実行し、リリース PR が最初の CI 実行から
green になるようにします。

> **譲れない原則：** これらはいずれもコントリビューターをブロックしません。PR を失敗させる必須チェックは追加しません。**drift**（ratchets）は、リリース時にメンテナーが再ベースライン化するためのものであり、コントリビューターが関与すべき事項ではありません。いかなる仕組みも PR を**クローズ**（功績の横取り）したり、通過させるためにテストを**弱めたり**することはありません。

## ファミリー（4つの構成要素）— それぞれが独立して実行される仕組み

| 構成要素                                                                          | 概要                                                                  | 実行タイミング                                           | 対象範囲                      |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------- |
| **`/green-prs`**（ソリューション A）                                              | メンテナーが**オープンな PR キュー**をオンデマンドでスキャンする      | **独立して定期的に** — 特に `/generate-release` の**前** | PR キュー全体 → `release/**`  |
| **`/validate-release-green`**（ソリューション C — `npm run check:release-green`） | 検証エンジン：ブランチまたはマージ候補に対してフルゲートを再現する    | 独立して、いつでも                                       | 特定のブランチまたはマージ PR |
| **`/babysit <PR#>`**                                                              | **1つの** PR の**実際の CI**を green になるまで導く                   | PR ごとに独立して                                        | 1つの PR                      |
| **`nightly-release-green.yml`**（ソリューション D）                               | 自動化された nightly ワークフロー。HARD red の場合に issue を作成する | 自動（cron）                                             | アクティブなリリースブランチ  |

**「これはリリース専用か？」への短い回答：****いいえ。** `/green-prs` は、
**リリース間にも定期的に**実行することを想定して設計されています。独立して実行するのが通常の使い方であり、リリースは単に、それを実行する価値が最も高まるタイミングにすぎません。

## PR からリリースへの助言的ビルド

`quality.yml` に、ドラフトではないコード PR と Mergify キューブランチ向けの `Build (advisory)` が追加されました。
これは `ci.yml` の本番ビルド手順を再現しています。Node 24、`npm-ci-retry`、
`check:node-runtime`、および `OMNIROUTE_USE_TURBOPACK=1` を指定した `npm run build` です。このワークフローでは、後続の品質ジョブがビルド成果物を使用しないため、意図的にアップロードしていません。
リリース PR の実行が 1 週間安定した後に `continue-on-error` を削除し、このシグナルを
PR からリリースへのブロッキングゲートにしてください。

## ソリューション C — `npm run check:release-green`（エンジン）

現在の作業ツリーに対してリリース相当の検証を再現し、各エラーを分類します。

- **HARD**（型チェック、lint エラー、unit、vitest、db-rules、public-creds、任意の
  `package-artifact`）→ **実際の不具合**。`exit 1`。ソースブランチ上で修正します（TDD、ルール #18）。
- **DRIFT**（eslint の**警告**、認知的複雑度、ファイルサイズ）→ サイクル中に蓄積されたラチェットのドリフトであり、
  **コントリビューターの責任ではありません**。報告のみを行い、**リリース時にメンテナーが
  再ベースライン化します**。ドリフトによって終了コードが変わることは**ありません**。したがって、誰かの作業をブロックすることもありません。

```bash
npm run check:release-green                 # 現在のブランチ（作業ツリー）
node scripts/quality/validate-release-green.mjs --json   # 構造化出力
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest をスキップ（ドリフト+型チェック+lint のみ）
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact を含める（低速）
```

診断と**報告**のみを行います（自動修正は行いません）。グリーン状態に修正するためのオーケストレーションは、
`/green-prs` と `/review-prs` にあります。

## ソリューション A — `/green-prs`（キュースキャン）

手順（概要 — 詳細は `green-prs` スキルを参照）：

1. アクティブなリリースブランチを対象とするオープン PR のキューを**棚卸し**します。
2. 各 PR を**トリアージ**します（対応可能 / 却下相当 / 作者による対応が必要）。却下相当または作者による対応が必要な PR は、
   **報告するだけで、クローズしません**（作者が判断します）。
3. 対応可能な各 PR について、**分離された worktree**（ルール #19）で PR をリリースブランチの先端に追従させ、
   `npm run check:release-green` を実行します。
   - **HARD** → 共同作成者として**コントリビューターのブランチ上で**修正し（作者の「Merged」ステータスを維持）、
     すべての HARD が解消されるまで再実行します。
   - **DRIFT** → そのままにします。リリース時に再ベースライン化されます。
4. PR ×（判定、HARD エラー、修正済み？、DRIFT、現在リリースグリーン？）の表を**報告**します。

マージせずにキューを**準備**できます。明示的に要求された場合にのみマージし、PR をクローズすることは決してありません。

## 推奨頻度

- **`/green-prs` を定期的に**（例：毎週）、また**`/generate-release` の前には必ず**
  実行します。
- **`nightly-release-green.yml`**（ソリューション D）を継続的なシグナルとして維持します。HARD エラーの issue が作成されたら、
  スキャンを実行するタイミングです。
- ブランチまたは特定のマージ候補を確認するには、必要に応じて **`/validate-release-green`** を使用します。
- 特定の PR を実際の CI 上でグリーンになるまで進める必要がある場合は、**`/babysit <PR#>`** を使用します。

## リリースとの関係

- `/generate-release` は、**フェーズ 0（事前チェック）**で検証を呼び出します。リリース PR を作成する前に DRIFT を再ベースライン化し、
  HARD を修正します。
- `/review-prs` は、マージ判断のステップでリリースグリーンゲートを使用します（マージ前にグリーン化）。

すべての要素の目標は同じです。リリース当日に 40 分単位で連鎖するエラーへの対応に追われるのではなく、**最初の CI 実行でリリース PR をグリーンにすること**です。
