# Compliance & Audit (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **信頼できる情報源:** `src/lib/compliance/`、`src/app/api/compliance/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、管理操作、認証イベント、プロバイダー認証情報のライフサイクル変更、および MCP ツールの呼び出しを、SQLite を基盤とする監査テーブルに記録します。このページでは、記録される内容、保存場所、保持期間、API キーによるオプトアウト方法、およびデータのクエリ方法について説明します。

実装は `src/lib/compliance/index.ts`（T-43 —「コンプライアンス制御」）および `src/lib/compliance/providerAudit.ts` にあります。監査書き込みは例外をスローしません。監査ログがメインのリクエストフローを中断しないよう、障害が発生しても呼び出しは通知なしに無視されます。

## 記録される内容

### 管理監査イベント（`audit_log`）

`logAuditEvent({ action, actor, target, details, ... })` を呼び出すたびに、1 行が生成されます。アクション文字列は `domain.verb`（または `domain.verb.outcome`）形式に従います。ソースツリー内で確認されているアクションタイプは次のとおりです。

| アクション                           | ソース                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

各エントリには、`action`、`actor`（デフォルトは `"system"`）、`target`、`details`/`metadata`（JSON）、`ip_address`、`resource_type`、`status`、`request_id`、および `timestamp` が記録されます。機密性の高いキー（`apiKey`、`accessToken`、`refreshToken`、`password`、`*token`/`*secret`/`*apikey` に一致するものなど）は、行が書き込まれる前に再帰的に `"[redacted]"` に置換されます。

### MCP ツール呼び出し（`mcp_tool_audit`）

MCP ツールが呼び出されるたびに、`open-sse/mcp-server/audit.ts` を介して行が書き込まれます。スキーマ（`src/lib/db/migrations/002_mcp_a2a_tables.sql` より）は次のとおりです。

| 列               | 備考                                      |
| ---------------- | ----------------------------------------- |
| `id`             | 自動インクリメント                        |
| `tool_name`      | MCP ツール識別子                          |
| `input_hash`     | 入力の sha256（ペイロードは保存されない） |
| `output_summary` | 短く切り詰められた要約                    |
| `duration_ms`    | 経過時間                                  |
| `api_key_id`     | 呼び出し元（null 可）                     |
| `success`        | `1` / `0`                                 |
| `error_code`     | 失敗時の最終エラーコード                  |
| `created_at`     | ISO タイムスタンプ                        |

### リクエスト／使用状況ログ

これらは運用テレメトリ（厳密には管理監査ではありません）ですが、同じ保持パイプラインを共有します。

- `usage_history` — リクエスト単位の使用状況集計
- `call_logs` — リクエスト単位の完全なログ（行数上限の対象。以下を参照）
- `proxy_logs` — プロキシトラフィックログ（行数上限の対象）
- `request_detail_logs` — 従来の詳細リクエストログ（存在する場合は引き続き削除対象）

## ストレージスキーマ

`audit_log` は、初回使用時に `ensureAuditLogSchema()` によって遅延作成されます。

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

インデックスは `timestamp`、`action`、`actor`、`resource_type`、
`status`、`request_id` に作成されます。レガシーDBに存在しない列は、必要に応じて
`ALTER TABLE` によって追加されます。

## 保持期間とクリーンアップ

2つの異なる保持期間が適用されます。

| 環境変数                    | デフォルト | 適用対象                                                          |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`、`mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`、`call_logs`、`proxy_logs`、`request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | `call_logs` の行数上限によるトリミング                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | `proxy_logs` の行数上限によるトリミング                           |

`cleanupExpiredLogs()` が保持期間に基づく処理を実行します。これはサーバー起動時に
`src/instrumentation-node.ts` から呼び出されます。実行のたびに、テーブルごとの削除件数を含む
`compliance.cleanup` 監査イベントが記録されます。プロキシ／呼び出しログの
トリミングは、長時間の書き込みロックを避けるため、バッチ処理（`BATCH_SIZE = 5000`）されます。

リクエスト履歴の手動クリーンアップは、保持期間に基づく処理とは別に行われます。Request Logs
ページは `POST /api/settings/purge-request-history` を呼び出し、`call_logs`、
レガシーの `request_detail_logs`、および
`${DATA_DIR}/call_logs/` 配下のローカルリクエスト成果物を削除します。

デフォルト値は `src/lib/logEnv.ts`
（`DEFAULT_APP_LOG_RETENTION_DAYS = 7`、`DEFAULT_CALL_LOG_RETENTION_DAYS = 7`）で定義されています。

## `noLog` オプトアウト（APIキー単位）

APIキーにフラグを設定すると、そのキーによるダウンストリーム呼び出しトラフィックをログに記録しないようにできます。
このフラグは `api_keys` テーブル（`no_log INTEGER DEFAULT 0`）に保存され、
ホットパスでの検索用にメモリ内セットにも反映されます。

```bash
# ログを記録しないキーを作成（管理者認証が必要）
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

ヘルパー（`src/lib/compliance/index.ts`）：

- `setNoLog(apiKeyId, true|false)` — メモリ内エントリを切り替える
- `isNoLog(apiKeyId)` — リクエスト処理パスで確認される。確認できない場合は、30秒間
  キャッシュされた `api_keys.no_log` の読み取りにフォールバックする
- `NO_LOG_API_KEY_IDS`（環境変数、カンマ区切り）— 起動時にメモリ内
  セットへ事前読み込みされる。列を直接切り替えられない場合に便利

管理上の監査イベント（ログイン、プロバイダーの変更、MCPツールの呼び出しなど）は
`noLog` の影響を**受けません**。オプトアウトの対象となるのは、リクエスト単位のトラフィックログのみです。

## REST API

| エンドポイント              | メソッド | 説明                                                     | 認証       |
| --------------------------- | -------- | -------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`    | フィルター付きのページネーションされた管理者監査エントリ | management |
| `/api/mcp/audit`            | `GET`    | ページネーションされた MCP ツール監査エントリ            | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`    | 集計された MCP 監査統計                                  | (open-sse) |

現時点では CSV エクスポート用エンドポイントは提供されていません。ダッシュボードからエクスポートするか、SQLite データベースを直接クエリしてください。

### `/api/compliance/audit-log` のクエリ

サポートされているクエリパラメーター（すべて省略可能。テキストフィルターにはすべて `LIKE %value%` マッチングを使用）：

- `action`、`actor`、`target`、`resourceType`（または `resource_type`）、
  `status`、`requestId`（または `request_id`）
- `from` / `since`、`to` / `until` — ISO タイムスタンプ
- `limit`（デフォルト `50`、最小 `1`、最大 `500`）
- `offset`（デフォルト `0`、最大 `10_000`）

レスポンスは JSON 配列です。ページネーションのメタデータはヘッダーで返されます：
`x-total-count`、`x-page-limit`、`x-page-offset`。

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## ダッシュボード

ダッシュボードでは **`/dashboard/audit`**
（`src/app/(dashboard)/dashboard/audit/page.tsx`）で監査データを確認できます。このページには 2 つのタブがあります：

- **コンプライアンス**（`ComplianceTab.tsx`）— `/api/compliance/audit-log` から取得した管理者監査イベント。イベントタイプ、重大度（info / warning / critical。アクションとステータスから導出）、日付範囲でフィルタリングできます。重大度は、アクション／ステータス文字列からクライアント側で計算されます。
- **MCP**（`McpAuditTab.tsx`）— `/api/mcp/audit` から取得した MCP ツール監査。ツール名および成功／失敗でフィルタリングできます。

どちらのタブもページネーションに対応しており、ページサイズは `50`（コンプライアンス）と `25`（MCP）です。

## プロバイダー認証情報ヘルパー

`src/lib/compliance/providerAudit.ts` は、プロバイダー管理ルートが認証情報イベントを生成する際に使用する整形ヘルパーを提供します：

- `summarizeProviderConnectionForAudit(connection)` — 接続スナップショットが `details` に書き込まれる前に、`apiKey`、`accessToken`、`refreshToken`、`idToken`、`providerSpecificData.consoleApiKey` を除去します。
- `getProviderAuditTarget(connection)` — `target` フィールド用に、安定した `"<provider>:<name|id>"` 文字列を構成します。
- `extractProviderWarnings(...payloads)` — プロバイダーのレスポンスからポリシー／安全性に関する警告（`[sanitizer]`、`prompt injection detected`、`content has been filtered`、`safety filter`、`policy violation`）を検索し、最大 5 件を抽出します。各項目は 400 文字に切り詰められます。

## ベストプラクティス

- PII（法務、医療など）を扱う API キーには `noLog: true` を指定してください。
- 保持ポリシーに合わせて `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` を調整してください。デフォルトの 7 日間は保守的な設定です。
- コンプライアンスプログラムで必要とされる頻度で、監査テーブルをプラットフォーム外にエクスポート（`sqlite3 dump`）してください。組み込みのアーカイブ機能はありません。
- ブルートフォース攻撃を検出するため、`auth.login.failed` と `auth.login.locked` の件数を追跡してください。
- 新しい管理者用エンドポイントを追加する際は、安定した `domain.verb.outcome` 形式のアクション文字列を指定して `logAuditEvent({ ... })` を呼び出し、`getAuditRequestContext(request)` を使用してリクエストコンテキストを渡してください。これにより、IP と `requestId` が自動的に記録されます。

## 関連項目

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII マスキング、プロンプトインジェクション
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP ツールカタログとスコープ
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — 環境変数の完全なリファレンス
- ソース: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
