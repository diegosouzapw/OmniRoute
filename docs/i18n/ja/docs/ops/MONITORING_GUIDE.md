# Monitoring & Observability Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **要約**: OmniRoute には、ヘルスモニタリング、プロバイダーのオートパイロット、クォータ追跡、オブザーバビリティフックが組み込まれています。このガイドでは、ダッシュボード、アラート、トラブルシューティングについて説明します。

**ソース:**

- `src/lib/monitoring/observability.ts` — オブザーバビリティのスナップショット
- `src/lib/monitoring/comboHealthAutopilot.ts` — コンボヘルスのオートパイロット
- `src/lib/monitoring/providerHealthAutopilot.ts` — プロバイダーのオートパイロット
- `src/lib/monitoring/providerHealthMatrix.ts` — プロバイダーヘルスマトリクス
- `src/lib/localHealthCheck.ts` — ローカルヘルスチェック
- `src/lib/tokenHealthCheck.ts` — トークン更新のヘルス
- `src/lib/proxyHealth.ts` — プロキシヘルスキャッシュ（PROXY_GUIDE.md で説明）

---

## 概要

OmniRoute には **3 層のモニタリング**があります。

```
┌──────────────────────────────────────────────────────────────┐
│  レイヤー 1: システムヘルス（サーバーレベル）                │
│  ├─ localHealthCheck.ts — DB、ポート、ネイティブ依存関係     │
│  ├─ db/healthCheck.ts — 整合性、FK、孤立したアーティファクト │
│  └─ ダッシュボード: /dashboard/health                        │
├──────────────────────────────────────────────────────────────┤
│  レイヤー 2: プロバイダーヘルス（プロバイダー単位の耐障害性）│
│  ├─ providerHealthAutopilot.ts — サーキットブレーカー、クールダウン │
│  ├─ providerHealthMatrix.ts — プロバイダー／モデル別のヘルススコア │
│  └─ ダッシュボード: /dashboard/providers                     │
├──────────────────────────────────────────────────────────────┤
│  レイヤー 3: ライブオブザーバビリティ（ランタイムスナップショット）│
│  ├─ observability.ts — サーキットブレーカー、セッション、クォータ │
│  ├─ tokenHealthCheck.ts — OAuth トークン更新のヘルス          │
│  └─ MCP ツール: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ダッシュボードページ

### `/dashboard/health`（システムヘルス）

最上位のヘルスダッシュボードには、以下が表示されます。

| セクション             | 表示内容                                         |
| ---------------------- | ------------------------------------------------ |
| **サーバーの状態**     | 稼働時間、バージョン、ポート、アクティブな接続   |
| **データベース**       | 接続、整合性、WAL サイズ、最近のマイグレーション |
| **プロバイダーの概要** | アクティブ数、正常数、オープン状態のブレーカー数 |
| **クォータモニター**   | アクティブなセッション、アラート発生中、枯渇状態 |
| **最近のエラー**       | 直近 10 件のエラーとスタックトレース             |
| **リソース使用量**     | メモリ、CPU、ヒープ圧力インジケーター            |

### `/dashboard/providers`（プロバイダーヘルス）

プロバイダーごとのダッシュボード:

| 列           | 説明                                     |
| ------------ | ---------------------------------------- |
| プロバイダー | プロバイダー ID と表示名                 |
| ヘルス       | 緑／黄／赤のステータス                   |
| サーキット   | オープン／クローズ／ハーフオープン状態   |
| 接続         | 接続数、最終更新                         |
| モデル       | 利用可能なモデル、モデルごとのヘルス     |
| コスト       | 本日のコスト、7 日間の傾向               |
| エラー       | 過去 24 時間のエラー数、最多エラークラス |

プロバイダーをクリックすると、以下を確認できます。

- 最近のリクエストとレイテンシーの内訳
- 接続ごとのヘルススコア
- モデルごとのロックアウト
- オートパイロットの推奨事項

### `/dashboard/quota`（クォータ追跡）

各 API キーについて、以下が表示されます。

- 現在の使用量と上限の比較（プログレスバー）
- クォータの推移（30 日間のチャート）
- 次回のリセット時刻
- アラート履歴

### `/dashboard/combos`（コンボヘルス）

コンボごとに、以下が表示されます。

- ストラテジーとターゲット
- ターゲットごとのヘルス
- 最近のフォールバックイベント
- 成功率（24 時間、7 日間、30 日間）

---

## ヘルスチェック API

OmniRoute は **2 つ**の HTTP ヘルスチェックエンドポイントを公開しています。オーケストレーターでは、これらを相互に置き換えることはできません。

| パス                         | 目的                                                               | 負荷                           | 用途                                                                                |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | ライフサイクルの生存性／準備状態（`ok` / `starting` / `stopping`） | ごく軽量（フェーズフラグのみ） | Kubernetes の **readiness**。HTTP を使用する必要がある場合の緩やかな **liveness**   |
| `GET /api/monitoring/health` | システムとプロバイダーの詳細な概要（DB、ヒープ、カタログ数など）   | 高負荷（同期 DB／監視処理）    | ダッシュボード、ブラックボックスによる詳細チェック、Docker 組み込みのヘルスチェック |

> **注:** プロバイダーのヘルスマトリクス、オートパイロットの問題、クォータモニター、トークンの状態、および `/api/monitoring/health` を超えるレイテンシーの詳細は、**MCP ツール** `observability_snapshot` または**ダッシュボード**ページから利用できます。これら専用の REST ルートはありません。

両方のルートは、リクエスト処理と**同じ Node イベントループ**上で実行されます。CPU バウンドな処理（大規模な `GET /v1/models` カタログ処理、長いコンテキストの圧縮／トークン数の計算）は、`/healthz` を含む**すべての** HTTP ハンドラーを遅延させる可能性があります。イベントループがビジーであることと、プロセスが停止していることは同じではありません。負荷の原因を修正することを優先してください。プローブの調整は、誤った強制終了を減らすだけです。

### 軽量なオーケストレータープローブ

```bash
GET /healthz
# または HEAD /healthz
```

- サーバーのライフサイクルフェーズが準備完了の場合は、**200** + 本文 `ok`
- 起動中またはシャットダウン中は、**503** + `starting` / `stopping`
- 実装: `src/app/healthz/route.ts`（DB ping なし）

### システムヘルス（詳細）

```bash
GET /api/monitoring/health
```

レスポンス:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: プローブキャッシュと SQLite の `test_status` の比較

`GET /api/monitoring/health` → `credentialHealth` は、`provider_connections.test_status` のライブダンプではなく、**メモリ内のプローブキャッシュ
ゲージ**です。#12532 以降、リクエストパスは `getCachedCredentialHealthSummary()` のみを読み取ります。バックグラウンドプローブは、
イベントループ外でキャッシュを更新します。

| レイヤー                 | 場所                                                                  | 意味                                                                                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| プローブキャッシュゲージ | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | プロセスメモリ内に保持されている最新の認証情報ヘルスプローブ結果。`source` は常に `probe-cache` です。                                                                                                                                |
| 失敗した接続の詳細       | `credentialHealth.failedConnections`                                  | **`failed > 0` の場合にのみ**存在します。`status=error` のキャッシュ行を収めた上限付きリスト（`connectionId`、`status`、サニタイズ済みの `lastError` / `lastErrorType`）。リストが上限に達した場合は `failedOmitted` が設定されます。 |
| SQLite の固定状態        | `credentialHealth.staleDbNonOkCount`                                  | 永続化された `test_status` が既知の非正常値（`error`、`expired`、`credits_exhausted`、`banned`、`deactivated`、`unavailable`）である**アクティブな**（`is_active=1`）接続行の数。                                                     |

この 2 つのレイヤーは、意図的に一致しない場合があります。

- ゲージが `failed=0` である一方、`staleDbNonOkCount>0` である場合 — SQLite には、
  最新のプローブキャッシュスナップショットで `status=error` としてカウントされない
  固定 `test_status`（たとえば `expired` または `credits_exhausted`）がまだ残っています。
- ゲージが `failed>0` である一方、SQLite が正常に見える場合 — 最近のプローブが失敗して
  キャッシュされていますが、DB 行がまだ更新されていないか、後からクリアされています。

このエンドポイントをスクレイピングする際は、`provider_connections.test_status` だけに基づいて
アラートを発生させないでください。リアルタイムのプローブ失敗には `failed` + `failedConnections` を使用し、
永続化された固定ステータスの件数が必要な場合は `staleDbNonOkCount` を使用してください。

### Kubernetes プローブの推奨事項

OmniRoute は**単一の Node プロセス**（1 つのイベントループ）です。標準の Docker `HEALTHCHECK` は、軽量な `/healthz` を対象とします。`/api/monitoring/health` は、kubelet の liveness 間隔で使用するには**負荷が高すぎます**。

| プローブ                 | 推奨ターゲット                                                                              | 注記                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **起動**                 | HTTP `GET /healthz` と長い `failureThreshold`（または大きな `startPeriod`）                 | コールドスタートと SQLite マイグレーションには数秒以上かかる場合があります                                                                                                                                                                                                                                                                                                                       |
| **準備状態**             | HTTP `GET /healthz`                                                                         | ライフサイクルは `ok` / `starting` / `stopping`（200 と 503）。ループが CPU によってブロックされると、依然として状態が頻繁に変動します。**応答に数秒かかる 200 は正常ではありません**（#10303）— これは、3 バイトのハンドラーが実行される前にイベントループが枯渇していたことを意味します                                                                                                        |
| **生存状態**             | HTTP `GET /livez`、**またはメインサービスのポート（`PORT`、デフォルトは `20128`）への TCP** | `/livez` はプロセスの生存のみを示します（ハンドラーが実行されれば常に 200）。これもイベントループを共有します。つまり、ビジー ≠ 停止であり、イベントループの枯渇（#10303）を検出する能力は TCP より優れていません。カタログ処理や圧縮処理の負荷で HTTP プローブがタイムアウトする場合は、**TCP** を推奨します。どちらの場合も、短時間のイベントループ停止を理由に Pod を強制終了しないでください |
| **詳細なヘルスチェック** | 外部チェッカーからの `GET /api/monitoring/health`                                           | kubelet の `livenessProbe` や短い間隔の `readinessProbe` には使用しないでください                                                                                                                                                                                                                                                                                                                |

設定例（コールドスタートと圧縮処理の負荷に合わせてしきい値を調整してください）：

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # イベントループが停止すると、HTTP /livez もタイムアウトする可能性があります。TCP は
  # より保守的な代替手段です：
  # tcpSocket:
  #   port: http
```

kubelet の **liveness** を `/api/monitoring/health` に向けては**いけません**。このパスでは実際の DB／モニタリング処理が実行されるため、負荷がかかると誤検知が発生します。

関連：[#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052)（イベントループがビジーな間のプローブ）、[#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055)（カタログ価格処理によるリソースの占有）、[#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117)（圧縮のトークン数計算によるリソースの占有）。

### オプションのリクエストパス処理（メモリ、スキル、トークン更新）

メモリ抽出、スキル注入、OAuth トークン更新は、`/healthz` と同じ**メインの Node イベントループ**を共有します。これらはダッシュボードで切り替える機能（`memoryEnabled`、`skillsEnabled`）であり、ワーカープールではありません。[環境 — イベントループのコスト](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)を参照してください。

### プロバイダーのヘルス状態

> **REST エンドポイントはありません。** プロバイダーのヘルスデータは、MCP ツール `observability_snapshot` またはダッシュボードの `/dashboard/providers` ページから利用できます。

### プロバイダーの詳細

> **REST エンドポイントはありません。** プロバイダーごとの詳細は、ダッシュボードの `/dashboard/providers` ページから利用できます。

---

## プロバイダーヘルス・オートパイロット

`providerHealthAutopilot.ts` モジュールは、以下を行う**自己修復システム**です。

1. プロバイダーの問題（サーキットのオープン、クールダウン、ロックアウト、クォータ警告）を検出する
2. 問題を解決するための**推奨アクション**を生成する
3. 必要に応じて、リスクの低いアクションを**自動実行**する

### 検出される問題の種類

| 問題の種類                   | 重大度 | 条件の例                                       |
| ---------------------------- | ------ | ---------------------------------------------- |
| `provider_circuit_open`      | 重大   | 5 回失敗した後にサーキットブレーカーがオープン |
| `provider_circuit_half_open` | 警告   | サーキットが復旧をテスト中                     |
| `connection_cooldown`        | 警告   | 429 の後、接続がクールダウン中                 |
| `stale_connection_error`     | 警告   | 最後の更新が 30 分以上前に失敗                 |
| `terminal_connection_error`  | 重大   | OAuth が取り消された、キーが無効               |
| `inactive_connection`        | 情報   | 設定で接続が無効化されている                   |
| `model_lockout`              | 警告   | 特定のモデルが隔離中                           |
| `quota_monitor_warning`      | 警告   | クォータ使用率が 80% 以上                      |

### 生成されるアクションの種類

| アクション                     | リスク | 説明                                         |
| ------------------------------ | ------ | -------------------------------------------- |
| `clear_provider_breaker`       | 中     | サーキットブレーカーをクローズ状態にリセット |
| `clear_connection_cooldown`    | 低     | 接続のクールダウンを解除                     |
| `clear_stale_connection_error` | 低     | 古いエラーフラグをクリア                     |
| `clear_model_lockout`          | 低     | 隔離されたモデルを再度有効化                 |
| `reactivate_connection`        | 中     | 無効化された接続を再度有効化                 |
| `deactivate_connection`        | 高     | 問題のある接続を無効化                       |

### API

> **REST エンドポイントはありません。**オートパイロットの問題は、MCP ツール `observability_snapshot` またはダッシュボードから確認できます。オートパイロットは内部で実行されます。その動作は環境変数ではなく、設定 DB（接続ごとの `autopilotMode` フィールド）を通じて設定します。オートパイロットモード用の環境変数を `grep -rn` で検索しても、ヒット数はゼロです。

### オートパイロットモード

オートパイロットはデフォルトで**手動モード**で動作します。問題を検出して推奨アクションを生成しますが、自動適用は行いません。アクションはダッシュボードから適用できます。

---

## コンボヘルス・オートパイロット

`comboHealthAutopilot.ts` は、プロバイダーオートパイロットの**コンボ専用**版です。以下を行います。

- 異常なコンボを検出する
- ターゲットの並べ替えを推奨する
- 機能していないターゲットの無効化を提案する
- N 回失敗した後、停止したターゲットを自動削除する

### コンボの問題例

```
コンボ「always-on」（優先順位戦略）
├─ ターゲット 1: openai/gpt-5（正常）
├─ ターゲット 2: anthropic/claude-opus-4-6（⚠️ 14:00 までモデルがロックアウト中）
└─ ターゲット 3: kiro/claude-sonnet-4-5（正常）

推奨アクション: 並べ替え — ロックアウトが期限切れになるまで、kiro を anthropic より上に移動
```

---

## クォータモニター

`observability.ts` は、サブスクリプションプロバイダー（Claude Code、Codex、GitHub Copilot）向けに**セッション単位のクォータモニター**を公開します。

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0～100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### ステータスの意味

| ステータス  | 条件                        | UI アクション                                    |
| ----------- | --------------------------- | ------------------------------------------------ |
| `starting`  | 初回ポーリングの実行中      | スピナー                                         |
| `idle`      | 最近のアクティビティがない  | ダッシュボードでは非表示                         |
| `healthy`   | クォータ残量が 50% を超える | 緑色の点                                         |
| `warning`   | クォータ残量が 50% 未満     | 黄色のアラート                                   |
| `exhausted` | クォータが 0%               | 赤色でブロックし、次のプロバイダーへルーティング |
| `error`     | ポーリングに失敗            | 赤色の点、まもなく再試行                         |

### API

> **REST エンドポイントはありません。**クォータモニターのデータは、MCP ツール `observability_snapshot` またはダッシュボードから確認できます。

---

## オブザーバビリティスナップショット

MCP ツール `observability_snapshot` は、AI エージェント向けに**完全なシステムスナップショット**を返します。

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* 上記を参照 */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

エージェントはこれを使用して**ルーティングを判断**します。たとえば、「openai のサーキットが開いている場合は、最初に anthropic へルーティングする」といった判断です。

---

## トークンのヘルスチェック

OAuth プロバイダー（Claude Code、GitHub Copilot、Cursor）では、**定期的なトークン更新**が必要です。`src/lib/tokenHealthCheck.ts` はバックグラウンドスケジューラーを実行します。

- **スイープの実行間隔**: 60 秒ごと（`src/lib/tokenHealthCheck.ts:30` の `TICK_MS = 60 * 1000` でスイープ）
- **接続ごとのヘルスチェック間隔**: デフォルトは 60 分（`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`）。設定 DB で構成可能
- **401 発生時の事前更新**: 接続ごとのインターセプターによって処理

### トークンのヘルスステータス

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### 構成

トークンのヘルスチェック構成は、`tokenHealthCheck.ts` によって内部的に処理されます。

### トークンのヘルス

> **REST エンドポイントはありません。** トークンのヘルスデータは、ダッシュボードまたは MCP ツール `observability_snapshot` から利用できます。

---

## アラート

### 組み込みチャネル

OmniRoute は**3 つのアラートチャネル**をサポートしています。

| チャネル             | セットアップ | ユースケース              |
| -------------------- | ------------ | ------------------------- |
| ダッシュボードバナー | 常時有効     | アプリ内通知              |
| Webhook              | URL を構成   | Slack、Discord、PagerDuty |
| ログ                 | デフォルト   | 外部ログ集約向け          |

### Webhook の構成

> **注:** Webhook アラートの構成は、ダッシュボードの設定ページから行います。Webhook URL、イベントフィルタリング、ペイロードのカスタマイズについては、設定 UI を参照してください。

### アラートタイプ

| アラート                     | 発生条件                                    | デフォルトの重大度 |
| ---------------------------- | ------------------------------------------- | ------------------ |
| `provider_circuit_open`      | サーキットが開いたとき                      | critical           |
| `provider_circuit_half_open` | サーキットの復旧をテストしているとき        | info               |
| `quota_warning`              | クォータが 80% 以上                         | warning            |
| `quota_exhausted`            | クォータが 100%                             | critical           |
| `token_refresh_failed`       | 更新が 3 回以上連続して失敗したとき         | warning            |
| `token_expired`              | トークンの有効期限が切れたとき              | critical           |
| `combo_target_unhealthy`     | Combo ターゲットが 1 時間以上クールダウン中 | warning            |
| `db_integrity_warning`       | FK 違反が 0 件を超えたとき                  | warning            |
| `heap_pressure`              | ヒープ使用量がしきい値の 80% を超えたとき   | warning            |

---

## パフォーマンスメトリクス

### 追跡対象のメトリクス

| メトリクス              | 種類         | ソース                          |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | カウンター   | `services/usage.ts`             |
| `request_latency_ms`    | ヒストグラム | `services/usage.ts`             |
| `tokens_consumed`       | カウンター   | `services/usage.ts`             |
| `cost_usd`              | カウンター   | `services/usage.ts`             |
| `provider_errors`       | カウンター   | `services/errorClassifier.ts`   |
| `circuit_state_changes` | カウンター   | `services/resilience.ts`        |
| `cache_hits`            | カウンター   | `services/signatureCache.ts`    |
| `compression_savings`   | ヒストグラム | `services/compression/stats.ts` |
| `quota_used`            | ゲージ       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ゲージ       | `observability.ts`              |

### レイテンシのパーセンタイル（p50/p95/p99）

> **REST エンドポイントはありません。** レイテンシのパーセンタイルデータは、ダッシュボードの `/dashboard/health` ページで確認できます。Prometheus/OpenTelemetry へのエクスポートは v3.9 で予定されています。

### Prometheus / OpenTelemetry エクスポート（フェーズ 2）

v3.9 で、Prometheus、OpenTelemetry、Datadog へのネイティブエクスポートを予定しています。

現時点では、任意の HTTP ベースの監視システム（Prometheus blackbox exporter、Datadog HTTP check など）で `/api/monitoring/health` をスクレイピングしてください。

---

## アラート設定例

### Slack

> **注:** Webhook アラートはダッシュボードの Settings ページから設定します。専用の Webhook 環境変数はありません（`grep -rn` の結果は 0 件です）。Webhook URL、イベントフィルタリング、ペイロードのカスタマイズについては、Settings UI を参照してください。

### Discord

> Webhook アラートでは、Slack と同じ Settings UI のフローを使用します。Discord は同じ形式の JSON ペイロードを受け付けます。

### PagerDuty

> Webhook アラートでは、同じ Settings UI のフローを使用します。PagerDuty Events API v2 のルーティングキーは Settings UI で設定します。

### カスタム Webhook（JSON）

> JSON ボディを含む POST を受け付ける任意の HTTP エンドポイントを使用できます。Settings UI で URL を設定してください。

---

## ダッシュボードの設定

### ヘルスダッシュボードのカスタマイズ

`~/.omniroute/dashboard.json` を作成します。

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### プロバイダーを最上部に固定

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## トラブルシューティング

### 「プロバイダーは正常と表示されるが、リクエストが失敗する」

1. **autopilot の問題**を確認します。モデルがロックアウトされている可能性があります
2. 特定のエラークラスについて、**最近のエラー**を確認します
3. プロバイダーカードで**接続テスト**を試します
4. プロバイダー側で**アップストリームのレート制限**が適用されていないか確認します（ローカルでは確認できません）

### 「クォータは正常と表示されるが、429 エラーが発生する」

- 429 は、割り当てられたクォータを使い切ったとプロバイダーが判断していることを意味します
- OmniRoute のクォータ追跡情報が**古くなっている**可能性があります。正確な情報はアップストリームのプロバイダー側にあります
- クォータデータは、内部クォータモニターによって自動的に更新されます

### 「すべてのターゲットは正常に見えるが、コンボが失敗する」

- ターゲットの順序に問題がないか、**コンボヘルス**ダッシュボードを確認します
- **フォールバックイベント**を確認します。コンボが短時間でフォールバック先を使い果たしている可能性があります
- **ストラテジー**がユースケースに適していることを確認します（優先順位、ラウンドロビン、自動）

### 「データベースのヘルスチェックが失敗する」

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` を実行します
- 結果が「ok」の場合は誤検知であり、ヘルスチェックの判定が厳しすぎます
- それ以外の場合は、**OmniRoute を停止**して、[災害復旧ガイド](./DATABASE_GUIDE.md#disaster-recovery)に従ってください

### 「メモリヒープの負荷がクリティカルな状態になっている」

```bash
# 現在のヒープを確認
node -e "console.log(process.memoryUsage())"

# 手動で GC を実行（--expose-gc が指定されている場合）
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# 同時リクエスト数を減らす（環境変数ではなく、ダッシュボードの Settings ページで設定）
# `MAX_CONCURRENT_REQUESTS` 環境変数はありません。Settings → Concurrency で設定してください。
```

---

## 関連項目

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量とコストの追跡
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DBスキーマと健全性
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — プロキシの健全性（別キャッシュ）
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — システムアーキテクチャ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — サーキットブレーカーの詳細
- ソース: `src/lib/monitoring/`（4ファイル、2121 LOC）
