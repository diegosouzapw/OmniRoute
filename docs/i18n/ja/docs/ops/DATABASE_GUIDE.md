# Database Schema & Operations Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **要約**: OmniRoute はプライマリストアとして **WAL ジャーナリングを使用する SQLite** を採用し、機密フィールドの保存時暗号化には **AES-256-GCM** を使用します。このガイドでは、スキーマ、マイグレーション、バックアップ／リカバリ、および運用ランブックについて説明します。

**ソース:**

- `src/lib/db/core.ts` — シングルトン + SCHEMA_SQL（17 個の基本テーブル）
- `src/lib/db/migrationRunner.ts` — バージョン管理されたマイグレーション
- `src/lib/db/migrations/` — バージョン管理された 167 個の SQL ファイル
- `src/lib/db/encryption.ts` — 暗号化ヘルパー
- `src/lib/db/backup.ts` — バックアップのエクスポート／インポート
- `src/lib/db/healthCheck.ts` — ヘルス診断

---

## SQLite を選ぶ理由

OmniRoute が PostgreSQL/MySQL ではなく SQLite を選択した理由はいくつかあります。

| 要素               | SQLite                                   | PostgreSQL                                         |
| ------------------ | ---------------------------------------- | -------------------------------------------------- |
| **デプロイ**       | 組み込み型 — 個別のサーバーは不要        | サーバーのセットアップが必要                       |
| **暗号化**         | アプリケーション層（AES-256-GCM）        | 組み込みの TDE                                     |
| **パフォーマンス** | 小規模／中規模のワークロードで高速       | 大量の同時書き込みに適している                     |
| **同時実行性**     | WAL モードで同時読み取りが可能           | 完全な MVCC                                        |
| **バックアップ**   | 単一ファイルのコピー                     | `pg_dump` またはファイルシステムのスナップショット |
| **ユースケース**   | ユーザーごとのインストール、組み込み用途 | マルチテナント SaaS                                |

**シングルユーザー、単一インスタンス**のデプロイ（OmniRoute の主要なユースケース）では、SQLite の方がシンプルかつ高速です。

### WAL ジャーナリング

`core.ts` は **WAL（Write-Ahead Logging）モード**でデータベースを開きます。

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL では、書き込み中の**同時読み取り**が可能です。これは、リクエストの記録中にもクエリを実行するダッシュボードにとって重要です。

デフォルトのキャッシュサイズは **65,536 KiB（64 MiB）**です。SQLite は負の
`cache_size` を KiB 単位のおおよその上限として解釈し、必要に応じてページを割り当てます。
**設定 > システムとストレージ > キャッシュサイズ**では、**1 から
1,000,000 KiB** までの整数値を指定できます。設定を保存すると、稼働中のデータベース接続に適用され、
OmniRoute は起動時に保存済みの値を復元します。

---

## データベースの場所

SQLite ファイルは次の場所に保存されます。

| OS      | パス                                                |
| ------- | --------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                       |
| macOS   | `~/.omniroute/storage.sqlite`                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`           |
| Docker  | `/app/data/storage.sqlite`（`DATA_DIR` で設定可能） |

関連ファイル:

- `storage.sqlite-wal` — 先行書き込みログ
- `storage.sqlite-shm` — 共有メモリファイル
- `call_logs/` — リクエストペイロードの成果物（有効な場合）

**保存場所を上書きする:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ドメインモジュールアーキテクチャ

OmniRoute のデータベースには、`src/lib/db/` 内に **110 個のトップレベル TypeScript モジュール**があります。各ドメインモジュールは、以下の原則に従います。

- 1 つ以上の特定のテーブルを所有する
- 型付けされた CRUD 関数をエクスポートする
- 他のモジュールのテーブルには一切アクセスしない
- DB へのアクセスには `core.ts` の `getDbInstance()` を使用する

### 110 個のトップレベル DB モジュール

OmniRoute の `src/lib/db/` には、**110 個のトップレベル TypeScript ファイル**があります。以下は主要なモジュールの一部です。完全な一覧については、ディレクトリリストを参照してください。

| モジュール              | テーブル                                                       | 責務                                                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API キープロバイダーの登録と認証情報                                           |
| `models.ts`             | `key_value`（モデルデータ）                                    | モデル定義、機能、料金                                                               |
| `combos.ts`             | `combos`                                                       | コンボルーティング設定と順序                                                         |
| `apiKeys.ts`            | `api_keys`                                                     | API キーのライフサイクル、スコープ、クォータ追跡                                     |
| `settings.ts`           | `key_value`、`api_keys`、`combos`                              | システム設定と共有 KV ストア                                                         |
| `backup.ts`             | —                                                              | バックアップのエクスポート/インポート操作                                            |
| `proxies.ts`            | `proxy_registry`、`proxy_assignments`、`provider_connections`  | プロキシ設定とルーティングルール                                                     |
| `prompts.ts`            | `prompt_templates`                                             | 再利用可能なプロンプトテンプレートとバージョニング                                   |
| `webhooks.ts`           | `webhooks`                                                     | イベント駆動型の Webhook サブスクリプションとログ                                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | リクエスト単位の監査ログ記録（任意、大容量）                                         |
| `domainState.ts`        | `domain_*`（5 テーブル）                                       | ドメイン予算、サーキットブレーカー、ロックアウト、フォールバックチェーン、コスト履歴 |
| `registeredKeys.ts`     | `registered_keys`、`account_key_limits`、`provider_key_limits` | MCP/A2A 用に許可リストへ登録された API キー                                          |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 過去のクォータ使用量                                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | モデルをデフォルトのコンボへマッピング                                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 固有の永続状態                                                                   |
| `encryption.ts`         | —                                                              | フィールドを暗号化/復号するためのヘルパー                                            |
| `readCache.ts`          | —                                                              | 読み取り負荷の高い処理向けのインメモリキャッシュ                                     |
| `secrets.ts`            | `key_value`（暗号化されたエントリ）                            | 暗号化されたシークレットストレージ                                                   |
| `stateReset.ts`         | —                                                              | テスト用の DB 状態の消去/リセット                                                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | エージェントのハンドオフ用セッションコンテキスト                                     |
| `usage*.ts`             | `usage_history`、`call_logs`、`proxy_logs`                     | 使用量の追跡                                                                         |
| `compression*.ts`       | `compression_settings`、`compression_combos`                   | 圧縮設定                                                                             |

### モジュール境界

中核となるアーキテクチャルールは、**モジュールが互いのテーブルに直接アクセスしないこと**です。別のモジュールのデータを扱う場合は、そのモジュールから関数をインポートします。

```ts
// ❌ 誤り：別のモジュールから直接 SQL を実行
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正しい：providers モジュールの関数を使用
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

このルールはコードレビューによって適用されます。静的チェックはありませんが、違反は指摘されます。

---

## 基本スキーマ（17テーブル）

`core.ts` は、`SCHEMA_SQL` 内で17個の基本テーブルを定義します。これらはマイグレーション `001_initial_schema.sql` によって作成され、コアスキーマを構成します。

### コアテーブル（初期マイグレーションで作成）

| テーブル                   | 用途                                   | 主なカラム                                                              |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | プロバイダー認証情報（暗号化済み）     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | プロバイダーノードのルーティング情報   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | 汎用KVストア                           | `namespace`, `key`, `value`                                             |
| `combos`                   | ルーティングコンボの定義               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ゲートウェイ用APIキー                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | データベースメタデータ                 | `key`, `value`                                                          |
| `usage_history`            | リクエスト使用量レコード               | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | リクエストペイロードとレスポンス       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | プロキシリクエストログ                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | モデルからプロバイダーへのチェーン     | `model`, `chain`                                                        |
| `domain_budgets`           | ドメインごとの支出予算                 | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | 予算リセット履歴                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ドメインごとのコスト追跡               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ドメインのレート制限状態               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ドメインごとのサーキットブレーカー状態 | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLMレスポンスキャッシュ                | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | 過去のクォータスナップショット         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### 追加テーブル（後続のマイグレーションで追加）

後続のマイグレーションでは、以下のようなテーブルが追加されます。

- `cli_tool_state`（マイグレーション011）— CLIツールの状態
- `mcp_*` テーブル — MCPサーバーの監査
- `a2a_*` テーブル — A2Aタスクの状態
- `usage_*` テーブル — 使用量の追跡
- `plugin_*` テーブル — プラグインシステム
- `skill_executions` — スキル実行履歴
- `memory_*` テーブル — メモリシステム
- `compression_*` テーブル — 圧縮システム
- `webhook_*` テーブル — Webhook配信ログ
- `acp_*` テーブル — Agent Client Protocol
- `oneproxy_*` テーブル — 1proxyマーケットプレイス
- `proxy_assignments` — プロキシスコープのバインディング
- `detailed_call_artifacts` — 呼び出しログのアーティファクトメタデータ
- `quota_alert_history` — クォータアラートの監査
- `command_code_auth_sessions` — Command Code OAuthセッション

約30以上のテーブルの完全な一覧は、`src/lib/db/migrations/` にあります。

---

## マイグレーション

OmniRoute は、`src/lib/db/migrations/` 内で**バージョン管理された冪等なマイグレーション**を使用します。各マイグレーションは、`NNN_description.sql` という名前の単一の SQL ファイルです。

### マイグレーションの命名規則

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### マイグレーションの実行方法

起動時に、`migrationRunner.ts` は以下を実行します。

1. `_omniroute_migrations` テーブルが存在しない場合は作成する
2. 適用済みのマイグレーションを照会する
3. 新しいマイグレーションを順番に、それぞれトランザクション内で適用する
4. 適用した各マイグレーションをタイムスタンプとともに記録する

```ts
// src/lib/db/migrationRunner.ts（簡略版）
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### 冪等性

マイグレーションは**冪等**でなければなりません。つまり、2 回実行しても何も変更されないようにする必要があります。

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`、`IF EXISTS`、および `OR IGNORE` / `OR REPLACE` 句を積極的に使用してください。

### 新しいマイグレーションの追加

1. **次の番号を確認する**: `ls src/lib/db/migrations/ | tail -1`
2. **ファイルを作成する**: `NNN_my_change.sql`
3. **安全な DDL を使用する**: `CREATE TABLE IF NOT EXISTS`、`ALTER TABLE ... ADD COLUMN`
4. **データを慎重にバックフィルする**: 既存の行を処理するために `UPDATE ... WHERE ...` を使用する
5. **コピー上でテストする**: テストしていないマイグレーションを本番環境で実行しない

例:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **後方互換性のない変更**（列の削除など）は扱いが難しくなります。OmniRoute はダウングレードをサポートしていません。マイグレーションが一度適用されると、スキーマの変更は永続的になります。この点を考慮して計画してください。

---

## 保存データの暗号化

機密性の高いフィールド（API キー、OAuth トークン、接続文字列）は、**AES-256-GCM** を使用して保存時に暗号化されます。

### 仕組み

```ts
// src/lib/db/encryption.ts（簡略版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用箇所

- `provider_connections.api_key` — アプリケーションレベルで暗号化
- `provider_connections.access_token`、`refresh_token`、`id_token` — アプリケーションレベルで暗号化
- `namespace = "secrets"` の `key_value` エントリ — アプリケーションレベルで暗号化
- `proxy_registry.auth` — 存在する場合、アプリケーションレベルで暗号化

### 暗号化キー

暗号化キーは、**パスフレーズ**（環境変数 `STORAGE_ENCRYPTION_KEY` で設定）と**ソルト**（DB に保存）から導出されます。データを復号するには、両方が必要です。

```bash
# 安全なパスフレーズを生成
openssl rand -hex 32

# .env に設定
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **重要**: 暗号化キーを紛失すると、暗号化されたすべてのデータにアクセスできなくなります。**キーはデータベースとは別にバックアップしてください**。

### 暗号化されないもの

パフォーマンス上の理由から、以下は平文で保存されます。

- プロバイダーの表示名
- モデル定義（すでに公開されている情報）
- ルーティングルール
- 使用状況レコード（PII なし）

---

## 暗号化に関する注意事項 (v3.8.16+)

OmniRoute は、2 つの暗号化方式を透過的に処理するために **`migrateLegacyEncryptedString()`** を使用します。

- **旧方式** (v3.5.0 より前): XOR ベースの「暗号化」(実際の暗号技術ではありません)
- **現行方式**: 適切な IV と認証タグを使用する AES-256-GCM

移行ヘルパーは旧形式を検出し、初回読み取り時に新しい方式で再暗号化します。これにより、認証情報を失うことなく古いデータベースをアップグレードできます。

---

## 読み取りキャッシュ

頻繁に読み取られるデータ (モデル、プロバイダー、設定) に対して、`readCache.ts` は**インメモリキャッシュ**を提供します。

```ts
// 起動時にキャッシュされ、書き込み時に無効化される
const providers = await getCachedProviders(); // 高速、インメモリ
const fresh = await listProviders(); // 低速、DB にアクセス
```

| キャッシュ対象エンティティ | キャッシュキー | TTL          |
| -------------------------- | -------------- | ------------ |
| `models`                   | `models:v1`    | 書き込みまで |
| `provider_connections`     | `providers:v1` | 書き込みまで |
| `settings`                 | `settings:v1`  | 書き込みまで |
| `combos`                   | `combos:v1`    | 書き込みまで |

対応するテーブルへの書き込みが行われるたびに、キャッシュは無効化されます。

---

## バックアップと復旧

### 手動バックアップ

```bash
# CLI を使用してローカルバックアップを作成する
omniroute backup create --name pre-migration

# または API 経由
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

バックアップファイルには以下が含まれます。

- すべての DB テーブル (JSON にシリアライズ)
- 呼び出しログのアーティファクト (base64 エンコード、任意)
- 設定 + シークレット (暗号化済み)
- プラグイン設定

### 復元

```bash
# CLI 経由
omniroute restore pre-migration

# API 経由
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**: 復元すると DB 全体が上書きされます。最初にすべてのクライアントを停止してください。

### 自動バックアップ

```bash
# CLI を使用して毎日の自動バックアップを有効化する
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

スケジュールは、30 秒ごと (デフォルト) に実行されるバックグラウンドジョブによってサーバー側で処理され、ローカルサーバー時刻に基づいて cron 式が評価されます。

| 変数                                        | デフォルト | 説明                                                                                                                           |
| ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | ミリ秒単位の実行間隔 (最小 `5000`)。cron に一致する分の範囲内で確実に実行されるようにするには、60 秒未満にする必要があります。 |

### SQLite ホットバックアップ

稼働中の DB をダウンタイムなしでバックアップするには、以下を実行します。

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

これは SQLite のオンラインバックアップ API を使用するため、OmniRoute の実行中でも安全に実行できます。

---

## パフォーマンスチューニング

### WAL モード

WAL はデフォルトで有効です。書き込み負荷の高いワークロードでは、以下を検討してください。

```sql
PRAGMA wal_autocheckpoint = 1000;  -- 1000ページごとにチェックポイントを実行
PRAGMA journal_size_limit = 67108864;  -- WALの上限は64MB
```

### インデックス

パフォーマンス向上のための主要なインデックス（マイグレーションによって自動作成されます）：

- `idx_models_provider` — プロバイダー別のモデル検索
- `idx_combo_targets_combo_id` — コンボターゲットの展開
- `idx_usage_history_api_key_timestamp` — 使用状況の分析
- `idx_quota_snapshots_api_key_window` — クォータの追跡
- `idx_call_logs_timestamp` — コールログのクエリ

新しいインデックスを追加するには、マイグレーションを作成します。

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### メモリマップド I/O

非常に大規模なデータベース（>10GB）では、SQLite pragma を使用してメモリマッピングを調整できます。

```sql
-- SQLite pragmaで設定（core.tsまたはランタイムで調整）
PRAGMA mmap_size = 268435456;  -- 256MB
```

### コンパクション

長期間稼働する OmniRoute インスタンスでは、定期的な `VACUUM` の実行が有効です。

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

トラフィックの少ない時間帯に毎月実行してください。（WAL モードにより必要性は低下しますが、完全になくなるわけではありません。）

---

## ヘルスチェック

`src/lib/db/healthCheck.ts` は、**DB レベルのヘルス診断**を提供します。

どちらの HTTP メソッドにも認証が必要です（未認証の場合は `401`）。`GET` は診断のみを行い、`POST` は
`autoRepair` を有効にして同じチェックを実行します。

```bash
GET  /api/db/health   # 診断
POST /api/db/health   # 診断と修復
```

レスポンスは、`runDbHealthCheck()` によって生成される `DbHealthCheckResult` です
（`src/lib/db/healthCheck.ts`）。

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ドメイン予算が、すでに存在しないAPIキーを参照していました。",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| フィールド        | 意味                                                                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` が空の場合は `true` です。`driver` がこの値に影響することはありません。                                                                                             |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` のいずれかです。                                                                             |
| `repairedCount`   | 今回の実行中に修復された行数です。`autoRepair` が false の場合は常に `0` です。                                                                                              |
| `backupCreated`   | 修復前にバックアップが作成されたかどうかを示します。                                                                                                                         |
| `checkedAt`       | 実行時と、その実行によって書き込まれた修復メモで共通して使用される ISO タイムスタンプです。                                                                                  |
| `driver.name`     | チェック対象のデータベースを処理している SQLite ドライバーです。                                                                                                             |
| `driver.degraded` | 書き込みがデータベースファイルに永続的に保存されない場合は `true` です。該当するのは、`sql.js` WASM フォールバック（ファイル全体の永続化）またはインメモリデータベースです。 |

同じペイロードが `omniroute_db_health_check` MCP ツールからも返されます。

破損を検出するには、`PRAGMA integrity_check` を実行します。

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 以下が表示される必要があります: ok
```

`ok` 以外が返された場合は、**直ちにデータベースの使用を停止**し、バックアップから復元してください。

---

## 災害復旧

### シナリオ 1: WAL ファイルの消失

`-wal` ファイルが消失しているものの、`-shm` とメイン DB が無傷の場合:

```bash
# 次回起動時に自動復旧
omniroute
```

SQLite が自動復旧できない場合:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### シナリオ 2: メイン DB ファイルの破損

バックアップから復元します:

```bash
omniroute sync pull --merge   # または: omniroute backup restore <backup-id>
```

### シナリオ 3: 暗号化キーの消失

キーがない場合、**復旧は不可能です**。暗号化されたフィールドは読み取れません。新しい認証情報を使用して、すべてのプロバイダーを手動で再追加してください。

> **対策**: 暗号化キーは必ず別途バックアップし、可能であればパスワードマネージャーまたは KMS に保存してください。

### シナリオ 4: ディスク容量不足

SQLite は `SQLITE_FULL` エラーを返します。ディスク容量を確保してから、以下を実行します:

```bash
# WAL をチェックポイントして容量を解放
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 一般的な操作

### テーブルの確認

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### すべてのテーブルの行数を確認

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### すべてのデータをリセット（消去）

```bash
# 最初に OmniRoute を停止
omniroute stop

# DB ファイルを削除
rm ~/.omniroute/storage.sqlite*

# 再起動（空の DB が再作成される）
omniroute
```

**選択的な**リセット（プロバイダーを保持し、使用状況データを消去）の場合:

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 単一テーブルのエクスポート

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## トラブルシューティング

### 「データベースがロックされています」

別のプロセスが書き込みロックを保持しています。以下のいずれかを行ってください:

- 他のプロセスが完了するまで待つ（`lsof | grep storage.sqlite` で確認）
- 他のプロセスを終了する
- 問題が続く場合は OmniRoute を再起動する

### 「外部キー制約に違反しました」

ドメインモジュールが参照整合性に違反しています。以下を確認してください:

- 依存テーブル内の孤立した行
- 伝播されなかったカスケード削除
- 外部キーを変更した最近のマイグレーション

違反を特定するには、`PRAGMA foreign_key_check;` を実行してください。

### 「メモリ不足」

SQLite のメモリマップド I/O が OS の上限を超えています。SQLite pragma を使用して削減してください:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ではなく 128MB
```

または無効化します:

```sql
PRAGMA mmap_size = 0;
```

### 「マイグレーションが途中で失敗しました」

マイグレーションはトランザクション内で実行されたため、ロールバックされているはずです。ロールバックされていない場合:

1. **OmniRoute を停止する**（それ以上の試行を防止）
2. `sqlite3` で **DB の状態を確認する**
3. 不完全なマイグレーションを**手動で修正する**
4. OmniRoute を**再実行する**（マイグレーションが再試行されます）

これを防ぐため、必ず最初にコピー上でマイグレーションをテストしてください。

---

## 関連項目

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用状況テーブル
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ヘルスモニタリング
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — リリースフロー
- ソース: `src/lib/db/`（80 以上のファイル、約 25K LOC）
