# Quota Sharing Engine (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **ドキュメント参照**: `docs/routing/QUOTA_SHARE.md`
> Group B（プラン16 + 22）の一部です。

---

## 概要

クォータ共有エンジンは、同じ接続を共有する複数のAPIキー間で、プロバイダーの時間ベースのクォータ（例: Codexの
5時間ウィンドウ、Kimiの1500 req/h）を公平に分配します。

**解決する問題:** OmniRouteは、同じアップストリームのプロバイダーアカウントに対して多数のAPIキーをプロキシします。
共有ロジックがなければ、キーAからの突発的なリクエストによって、その時間帯のプロバイダークォータが使い果たされ、
ウィンドウがリセットされるまでキーBとCがブロックされる可能性があります。
このエンジンは、次の方法でこれを防ぎます。

1. 各キーのディメンション別（%、リクエスト数、トークン数、$）ローリング消費量を追跡します。
2. ワークコンサービングな公平配分アルゴリズムを適用します。グローバルプールが飽和していない間、キーは
   アイドル状態の割り当て分から借用できます。
3. リクエストがアップストリームエグゼキューターに到達する前に、ホットパス（`chatCore.ts`）で
   結果を適用します。

---

## アルゴリズム: ワークコンサービングな公平配分

`src/lib/quota/fairShare.ts` に実装されています。

### モード

| 条件                                       | モード   | 動作                                                 |
| ------------------------------------------ | -------- | ---------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **寛容** | グローバル上限から総消費量を差し引いた値まで借用可能 |
| `globalUsedPercent >= saturationThreshold` | **厳格** | 個別の公平な割り当てを厳密に適用                     |

デフォルトは `saturationThreshold = 0.5`（環境変数 `QUOTA_SATURATION_THRESHOLD`）です。

### ディメンションごとの判定

プール内の各アクティブなディメンションについて、エンジンは次を計算します。

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = このキーの現在のローリング値（QuotaStore.peekから取得）
remaining       = fairShareAllowed - consumed
```

その後、次のように処理します。

- **`policy = hard`**: `consumed > fairShareAllowed` かつモードが厳格の場合 → **ブロック**。
- **`policy = soft`**: `consumed > fairShareAllowed` かつモードが厳格の場合 → **ペナルティを付与**（コンボ内で優先度を下げる。ハードブロックは行わない）。
- **`policy = burst`**: 公平な割り当てに関係なく、グローバルな余裕がある間は許可。

### 絶対上限

割り当てに指定された `capValue` + `capUnit` は、モードやポリシーに依存しないハード上限です。
`consumed >= capValue` となるディメンションが1つでもある場合、リクエストは常に**ブロック**されます。

### 複数ディメンションのチェック

プール内の**いずれか**のディメンションでブロック判定となる場合、リクエストはブロックされます。各ディメンションは
独立しています。5h%を使い果たしても、weekly%ディメンションには影響しません。

### 借用

寛容モードでは、割り当ての消費量が割り当て分を下回っているキーは、他のキーの未使用の割り当て分を利用できます。
計算式は次のとおりです。

```
maxAllowed = globalLimit - consumedByOtherKeys
```

ここで、`consumedByOtherKeys = consumedTotal - consumedByThisKey` です。グローバル上限
（そのディメンションに対するプールの `limit`）が常にハード上限となります。

---

## スライディングウィンドウカウンター

`src/lib/quota/sqliteQuotaStore.ts` および `redisQuotaStore.ts` に実装されています。

`(apiKeyId, dimensionKey)` ごとに2つのバケットがあります。

- `curr`: 現在のバケット（`floor(nowMs / windowMs)`）
- `prev`: 直前のバケット（`curr - 1`）

実効ローリング値:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**精度**: 約99%の精度です。誤差は、バケット間の境界においてウィンドウサイズの最大1%です
（2バケット近似に固有の誤差）。

### 同時実行制御

SQLiteドライバー: `(apiKeyId | dimensionKey)` キーごとのインメモリミューテックスにより、
読み取り・変更・書き込みの競合を防止します。このパターンは、`src/sse/services/auth.ts` のアンチ・サンダリングハード対策を踏襲しています。

Redisドライバー: アトミックなインクリメントにはLua EVALスクリプトを使用します。単一のRedisコマンドとして実行されます。

---

## ドライバー

### SQLite（デフォルト、インストール不要）

- テーブル: `quota_consumption`（マイグレーション `073_quota_pools.sql` / `074_quota_consumption.sql` を参照）。
- 単一インスタンスのデプロイに最適です。
- すべての永続化データは、既存の OmniRoute SQLite DB（`DATA_DIR/storage.sqlite`）に保存されます。

### Redis（任意、複数インスタンス）

- `ioredis` npm パッケージが必要です。
- カウンターは Redis に保存されます。メタデータ（プール／割り当て）は引き続き SQLite に保存されます。
- カウンターを共有する必要がある複数レプリカのデプロイに最適です。

### ドライバーの切り替え

設定 UI（`/dashboard/settings` → Quota Store）または環境変数を使用します。

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB 設定は環境変数より優先されます。`driver=redis` であっても URL が指定されていない場合、または
`ioredis` がインストールされていない場合、ファクトリーは SQLite にフォールバックし、警告をログに記録します。

ドライバーの選択順序:

1. DB 設定 `quotaStore.driver`
2. 環境変数 `QUOTA_STORE_DRIVER`
3. デフォルト: `sqlite`

---

## 多次元

1 つのプールには複数の次元を設定できます。各次元は独立しています。

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // この次元におけるプール全体の上限
}
```

**例: Codex プラン**（5h% + weekly%）:

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

リクエストが許可されるには、すべての次元の条件を満たす必要があります。

---

## プランリゾルバー

`src/lib/quota/planResolver.ts` に実装されています。

優先順位（高い順）:

1. **手動 DB オーバーライド** — `provider_plans` テーブル（`connectionId` ごと）。
2. **既知のカタログ** — `src/lib/quota/planRegistry.ts`（データのみ）。
3. **空のプラン** — 次元なし。手動設定が必要です。

### 既知のカタログ

| プロバイダー          | 次元                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h`（limit=0、不明）、`tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | デフォルトなし — 手動設定が必要                               |

---

## パイプライン統合

### PRE フック（`open-sse/handlers/chatCore.ts`）

認証およびポリシーチェックの後、アップストリームエグゼキューターの実行前に動作します。

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → 次元ごとに getQuotaStore().peek()
      → fairShare.decideFairShare()
      → ブロックする場合 → 429 を返す（buildErrorBody、ハードルール #12）
      → 許可 + 優先度を下げる場合 → 候補に quotaSoftPenalty=true を設定
  → executor.execute()
```

**フェイルオープン**: `enforceQuotaShare` が例外をスローした場合、リクエストは許可され、
`pino.warn` ログが記録されます。これにより、クォータエンジンのバグがすべての
トラフィックをブロックすることを防ぎます。

### POST フック（消費量の記録）

レスポンスが成功した後:

```
エグゼキューターが成功を返す
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → 次元ごとに getQuotaStore().consume()
      → フェイルオープン: エラーは pino.warn としてログに記録され、クライアントには伝播しない
```

**ドリフトに関する注意**: レスポンス後に `consume` が失敗すると、ローリングカウンターの値が実際より少なくなります。
プロバイダーからの飽和シグナル（例: `anthropic-ratelimit-unified-5h-utilization`）により、
次のリクエスト時に全体推定値が補正されます。

### コンボのソフトペナルティ（`open-sse/services/combo.ts`）

`decision.deprioritize === true` の場合:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // デフォルトは 0.7
}
```

このペナルティは、他のすべてのスコアリング係数の適用後に適用されます。飽和状態のキーを
自動コンボが選択する確率を、ハードブロックせずに低下させます。

---

## UI ウォークスルー

### `/dashboard/costs/quota-share` — メインプールページ

コンポーネント（すべて `src/app/(dashboard)/dashboard/costs/quota-share/` 内）:

| コンポーネント         | 目的                                                                       |
| ---------------------- | -------------------------------------------------------------------------- |
| `QuotaConceptCard`     | 新規ユーザー向けにクォータ共有を説明する導入カード                         |
| `CreatePoolModal`      | 新しいクォータプールを作成（接続 + 名前 + 初期割り当て）                   |
| `PoolCard`             | プールごとの概要: 名前、接続、割り当て数                                   |
| `DimensionBar`         | ディメンションごとの積み上げ棒グラフ: 各キーのシェア + 全体使用量          |
| `AllocationTable`      | 消費量、公平なシェア、不足/余剰、借用フラグを示すテーブル                  |
| `BurnRateChart`        | EMA バーンレート折れ線グラフ（`dynamic()` による Recharts の遅延読み込み） |
| `EditAllocationsModal` | プールの割り当てウェイト、上限、ポリシーを編集                             |

ページフック:

- `usePools` — 30秒ごとに `GET /api/quota/pools` を取得します。
- `usePoolUsage` — 必要に応じて `GET /api/quota/pools/[id]/usage` を取得します。
- `useLocalStoragePoolMigration` — マウント時に1回実行され、従来の LS データを移行します。

### `/dashboard/costs/quota-share/plans` — プロバイダープラン設定

- `ProviderPlanConfigClient.tsx`: プロバイダーを選択し、解決済みプラン（カタログからの自動設定または手動オーバーライド）を表示し、ディメンションを編集するためのドロップダウン。
- 変更は `PUT /api/quota/plans/[connectionId]` に書き込まれます。
- 削除すると、カタログのプランまたは空のプランに戻ります。

---

## 環境変数

| 変数                               | デフォルト | 説明                                                       |
| ---------------------------------- | ---------- | ---------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | 使用するドライバー: `sqlite` または `redis`                |
| `QUOTA_STORE_REDIS_URL`            | _(空)_     | Redis URL（例: `redis://localhost:6379`）                  |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1。`>= threshold` で厳格モードが有効になります          |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1。ソフトポリシーの複合スコアに対する乗数               |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | GC が古い `quota_consumption` バケットを削除するまでの日数 |

DB 設定（`quotaStore.*`）は環境変数をオーバーライドします。

---

## トラブルシューティング

### Redis が設定されているが接続できない

`ioredis` がインストールされていること（`npm ls ioredis`）と、`QUOTA_STORE_REDIS_URL`
に到達可能であることを確認してください。接続に失敗した場合、ファクトリは SQLite にフォールバックします（
`warn` レベルでログに記録されます）。

### `peek` が古いデータを返す / フェイルオープンになる

`peek` が例外をスローした場合、`enforceQuotaShare` は結果を「許可」として扱います（フェイルオープン）。
根本原因を特定するには、`pino` ログの `quota:enforce` および `quota:factory` エントリを
確認してください。

### 消費カウンターのずれ

実際のプロバイダー使用量がカウンターと異なる場合でも、これは想定された動作です。
2バケットのスライディングウィンドウでは、ウィンドウ境界で約1%の誤差が発生し、`consume` は
レスポンス後に非同期で実行されます。飽和シグナル（`saturationSignals.ts`）は
30秒の TTL で実際のプロバイダー使用率を読み取り、それに応じて `globalUsedPercent`
を調整します。

### プールのバーンレートに「データなし」と表示される

`computeBurnRate` には、少なくとも2つの履歴サンプルが必要です。以前に
`consume` が呼び出されていない新しいプールでは、`tokensPerSecond: 0` および `timeToExhaustionMs: null` と表示されます。

---

## localStorage からの移行

`/dashboard/costs/quota-share` の初回読み込み時に、フック `useLocalStoragePoolMigration`
は以下を確認します。

1. `localStorage.getItem("omniroute:quota-share:pools")` が空でないこと。
2. `GET /api/quota/pools` が `[]` を返すこと（DB が空であること）。

両方が true の場合、各レガシープールを一括で `POST /api/quota/pools` に送信し、
その後 localStorage のキーを削除します。この移行は冪等です。条件 2 によって
再移行が防止されます。

---

## 内部ストラテジーの分類

`quota-share` は**内部専用**のルーティングストラテジーです（
`src/shared/constants/routingStrategies.ts` 内の `INTERNAL_ROUTING_STRATEGY_VALUES`）。
システムによって生成された `qtSd/` プールコンボでのみ使用され、UI または API で
ユーザーが選択可能なオプションとして表示されないよう、意図的に
`ROUTING_STRATEGY_VALUES` から除外されています。

---

## テストカバレッジ

quota-share エンジンには、2 層の自動テストカバレッジが含まれています。

| スイート              | コマンド                                                               | カバー範囲                                                                                                                                                                                                   |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ユニット（29 テスト） | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR スケジューラー、飽和ゲーティング、同時実行数の上限、fairShare の計算、バックログのキューイング                                                                                                           |
| 統合マトリクス        | `npm run test:combo:matrix`                                            | 実際のコンボパイプラインを通じたエンドツーエンドのルーティング決定。ライブシーム（`registerQuotaFetcher`、`setLKGP`、`__setHeadroomSaturationFetcherForTests`）を介した DRR の公平性および飽和時の優先度低下 |

統合マトリクスは、19 個すべての公開ストラテジーとともに CI で実行されます。ユニットスイートは
単独でも実行できます。

---

## DB スキーマの概要

マイグレーション `078`、`079`、`085` によって追加された 3 つのテーブル：

- `quota_pools` + `quota_allocations` — プール定義およびキーごとの割り当て。
- `quota_consumption` — `(apiKeyId, dimensionKey)` ごとのローリング方式の 2 バケットカウンター。
- `provider_plans` — プロバイダープランの手動オーバーライド（connectionId ごとの dimensions JSON）。

すべてのテーブルは、冪等な `CREATE TABLE IF NOT EXISTS` マイグレーションによって追加されます。
