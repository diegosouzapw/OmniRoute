# Notion Context Source (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **信頼できる情報源:** `src/lib/notion/api.ts`（REST クライアント）、`src/lib/db/notion.ts`
> （トークンの永続化）、`open-sse/mcp-server/tools/notionTools.ts`（6 つの MCP ツール）、
> `src/app/api/settings/notion/route.ts`（設定 API）。ツール登録とスコープの
> 配線は `open-sse/mcp-server/server.ts` にあります。

## 概要

OmniRoute は **Notion** ワークスペースを**コンテキストソース**として接続できます。これは、組み込みの MCP サーバーを通じてエージェントがアクセスする読み書き可能な
ナレッジベースです。Notion インテグレーショントークンを設定すると、MCP ツールにより LLM はページやデータベースの検索、
ページコンテンツやブロックツリーの読み取り、フィルターやソートを使用したデータベースのクエリ、新しい
ブロックの追加を実行できます。これらはすべて OmniRoute を介してプロキシされ（再試行、タイムアウト、エラー分類に対応）、
モデルが Notion API に直接アクセスすることはありません。

このインテグレーションは、公式 Notion REST API
（`https://api.notion.com/v1`、`Notion-Version: 2026-03-11`）を薄く堅牢にラップしたものです。クライアント
（`src/lib/notion/api.ts`）には、以下の機能が追加されています。

- `429` および `5xx` に対する**指数バックオフ付き再試行**（最大 3 回）。
- `AbortController` による **55 秒のリクエストタイムアウト**。
- **型付きエラー分類** — `NotionAuthError`（401/403）、
  `NotionNotFoundError`（404）、`NotionRateLimitError`（429、`retry after`
  ヒントを考慮）、`NotionValidationError`（400/409）、`NotionServerError`（5xx）、
  `NotionTimeoutError`。
- エラーを公開する前にスタックトレースのような断片を除去する**メッセージのサニタイズ**。

## セットアップ

Notion トークン用の**環境変数はありません**。トークンは
`src/lib/db/notion.ts` を介して SQLite の `key_value` テーブル（名前空間 `notion`、キー `integration_token`）に
保存されます。Endpoint ダッシュボードの **Context Sources** タブ
（`ObsidianSourceCard` と同階層の `NotionSourceCard`）、または設定 REST API から構成してください。

> [!NOTE]
> このトークンは **Notion の内部インテグレーショントークン**です。
> <https://www.notion.com/my-integrations> でインテグレーションを作成してから、OmniRoute にアクセスさせる
> ページやデータベースをそのインテグレーションと共有してください（Notion の権限モデルはワークスペース全体ではなく、
> 共有に基づいています）。

### REST 経由での設定

```bash
# インテグレーショントークンを保存して検証する（POST はテスト検索を実行して検証）
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# 接続ステータスを確認する
curl http://localhost:20128/api/settings/notion

# 切断する（保存済みトークンを消去）
curl -X DELETE http://localhost:20128/api/settings/notion
```

3 つのメソッドはすべて、ダッシュボード認証（`isAuthenticated`）を必要とします。`POST` では、
OmniRoute がトークンを保存し、直ちに結果 1 件のテスト検索を実行します。Notion が
エラーオブジェクトを返した場合、トークンは消去され、呼び出しは `400` で失敗します。

## MCP ツール（6 個）

`open-sse/mcp-server/tools/notionTools.ts` で定義されています。トークンは呼び出し時に
`getNotionToken()` を介して解決されます。トークンが設定されていない場合、ツールは
`"Notion integration token not configured. Set it in Settings > Context Sources."`
をスローします。

| ツール                       | スコープ       | 説明                                                                                                           |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | テキストクエリでページやデータベースを検索します（タイトル、ID、URL を返します）。ページネーション対応。       |
| `notion_get_page`            | `read:notion`  | ID を指定してページのコンテンツとメタデータを取得します。                                                      |
| `notion_list_block_children` | `read:notion`  | ブロックまたはページのすべての子ブロック（ブロックツリー）を一覧表示します。ページネーション対応。             |
| `notion_query_database`      | `read:notion`  | オプションの `filter` + `sorts`（Notion API 形式）を使用してデータベースをクエリします。ページネーション対応。 |
| `notion_get_database`        | `read:notion`  | ID を指定してデータベースのスキーマ／メタデータを取得します。                                                  |
| `notion_append_blocks`       | `write:notion` | 既存のブロックまたはページに子ブロックを追加します（1 リクエストあたり最大 100 ブロック）。                    |

### 入力パラメーター

- `notion_search` — `query`（1～500 文字）、`pageSize`（1～100、デフォルト 20）、
  `startCursor`（任意）。
- `notion_get_page` — `pageId`（32 文字の 16 進数または UUID）。
- `notion_list_block_children` — `blockId`、`pageSize`（1～100、デフォルト 50）、
  `startCursor`（任意）。
- `notion_query_database` — `databaseId`、`filter`（任意、Notion のフィルター形式）、
  `sorts`（任意の配列）、`pageSize`（1～100、デフォルト 50）、`startCursor`（任意）。
- `notion_get_database` — `databaseId`。
- `notion_append_blocks` — `blockId`、`children`（ブロックオブジェクトの配列）、
  `after`（任意の位置）。

### スコープ

読み取りツールには `read:notion`、書き込みツールには `write:notion` が必要です。
スコープは、`OMNIROUTE_MCP_ENFORCE_SCOPES=true` の場合にのみ
`open-sse/mcp-server/server.ts` の `withScopeEnforcement()` によって適用されます。
呼び出し元に許可されるスコープは、`OMNIROUTE_MCP_SCOPES`（カンマ区切り）または
認証済み API キーのスコープコンテキストから取得されます。スコープモデルの詳細については、
[MCP-SERVER.md](./MCP-SERVER.md) を参照してください。

## エンドポイント

| メソッド | パス                   | 目的                                             |
| -------- | ---------------------- | ------------------------------------------------ |
| `GET`    | `/api/settings/notion` | `{ connected, hasToken }` を返します。           |
| `POST`   | `/api/settings/notion` | インテグレーショントークンを保存して検証します。 |
| `DELETE` | `/api/settings/notion` | 接続を解除します（保存済みトークンを消去）。     |

> これらはダッシュボードの設定ルートです。公開の `/v1` Notion プロキシ
> エンドポイントは**ありません**。Notion には上記の MCP ツールのみを通じてアクセスします。

## ユースケース

- **ナレッジに基づく回答** — 回答前にエージェントがワークスペースを `notion_search` し、
  最上位の検索結果を `notion_get_page` で取得することで、実際の社内ドキュメントを回答に引用できます。
- **データベースを基盤とするワークフロー** — フィルターと並べ替えを使用してタスク/CRM データベースを
  `notion_query_database` でクエリし、取得した行を要約またはトリアージします。
- **書き戻し / ロギング** — `notion_append_blocks` を使用して、会議メモ、実行サマリー、
  またはエージェントの出力を既存のページに追記します（追記専用で、破壊的な編集は行いません）。
- **構造の探索** — `notion_list_block_children` を使用してページのブロックツリーをたどるか、
  クエリ前に `notion_get_database` を使用してデータベースのプロパティスキーマを確認します。

## 関連項目

- [MCP サーバー](./MCP-SERVER.md) — トランスポート、スコープの適用、ツールの完全な一覧。
- [Obsidian コンテキストソース](./OBSIDIAN_CONTEXT.md) — もう一つの組み込みコンテキストソース。
- [メモリシステム](./MEMORY.md) — 永続的な会話メモリ（補完的な
  コンテキストレイヤーであり、ツールで取得するのではなく自動的に挿入されます）。
