# Memory System (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **信頼できる情報源:** `src/lib/memory/` および `src/app/api/memory/`
> **最終更新:** 2026-06-28 — v3.8.40（デフォルト無効化 + int8 量子化のキャッチアップ）

OmniRoute は、API キー（およびオプションでセッション ID）をキーとする永続的な会話メモリを提供します。メモリは軽量な正規表現パターンマッチングによって LLM の応答から自動的に抽出され、後続のリクエストに先頭のシステムメッセージとして再挿入されます（system ロールを拒否するプロバイダーの場合は、最初のユーザーメッセージとして挿入されます）。

> **メモリはデフォルトで無効です（v3.8.30 以降）。** `DEFAULT_MEMORY_SETTINGS.enabled` は
> 現在 `false` です（`src/lib/memory/settings.ts`）。メモリを有効にすると、取得されたコンテキストが
> 最大 `maxTokens`（約 2k）まで**すべての**チャットリクエストに挿入され、その分も
> 課金されます。これは、新規インストールや独自にコンテキストを管理するクライアントにとって
> 予想外のコストになり得ます。**Settings → Memory** で明示的にオプトインしてください
> （メモリが有効な場合、`MemorySkillsTab` にトークンコストの警告コールアウトが表示されます）。
> クライアントは、`x-omniroute-no-memory` リクエストヘッダー
> （`true`/`1`/`yes`）を使用して、単一のリクエストのみオプトアウトできます。詳細については、
> [API_REFERENCE.md](../reference/API_REFERENCE.md) のリクエストヘッダー表を参照してください。
> メモリなしのリクエストでは `memoryOwnerId = null` が設定され、そのリクエストに対する
> メモリとスキルの挿入が**両方とも**無効になります
> （`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`）。

メモリはユーザー単位ではなく、**API キー単位でスコープされます**。同じ API キーで認証されたすべてのリクエストは同じメモリプールを共有し、必要に応じて `sessionId` によってさらにスコープできます。

## アーキテクチャ

```
クライアント → /v1/chat/completions（apiKeyInfo は上流で解決済み）
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # id を抽出
    → getMemorySettings()                     # キャッシュ済み設定
    → shouldInjectMemory(body, {enabled})     # ゲート
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + オプションのベクトル
    → injectMemory(body, memories, provider)  # システムまたはユーザーメッセージ
  → 上流プロバイダーの呼び出し
  → 応答時: extractFacts(text, apiKeyId, sessionId)  # ノンブロッキング
    → setImmediate → 一致ごとに createMemory(fact)
                   → embed(content) + upsertVector(id, vec)
```

挿入および抽出の呼び出し箇所は
`open-sse/handlers/chatCore.ts` に接続されています（`retrieveMemories`、`injectMemory`、
および `extractFacts` を検索してください）。

## エンジンアーキテクチャ（3 層の解決方式）

Memory Engine は、利用可能なインフラストラクチャと設定に基づいて、実行時に取得経路を決定します。3 つの層が存在し、優先順位に従って適用されます。

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — キーワード（FTS5）                                 │
  │  プローブによって可用性を判定: SQLite ビルドが対応している    │
  │  場合は FTS5 を使用（better-sqlite3 / node:sqlite /          │
  │  bun:sqlite）。FTS5 非搭載ビルドでは利用不可                 │
  │  （例: sql.js/WASM — "no such module: fts5"）。             │
  │  strategy = "exact" の場合、またはフォールバックとして使用。 │
  │  engine-status の keyword はプローブ結果を反映する。         │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — 組み込みベクトル（sqlite-vec）                     │
  │  sqlite-vec v0.1.9 を db.loadExtension() で読み込む。         │
  │  Float32 ベクトルに対する KNN 総当たり検索。次の場合に有効:   │
  │   • sqlite-vec の loadExtension が成功                       │
  │   • Float32Array を生成できる埋め込みソース                  │
  │     （remote | static | transformers）が利用可能             │
  │   • vec_memories テーブルが存在                              │
  │     （最初の ready() 実行時に作成）                          │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant（オプトインの外部ベクトルデータベース）      │
  │  有効な場合、semantic/hybrid では sqlite-vec を置き換える。   │
  │  稼働中の Qdrant インスタンスと、設定済みのホスト/ポートが必要。│
  └─────────────────────────────────────────────────────────────┘
```

機能低下は自動的かつ透過的に処理されます。

- sqlite-vec の読み込みに失敗した場合、tier 1 は利用不可となり、tier 0 にフォールバックします。
- 埋め込みソースがエラーを返した場合、tier 1 は tier 0 にフォールバックします。
- Qdrant が正常でない場合、tier 2 は tier 1 にフォールバックします（tier 1 も利用できない場合は tier 0）。

## 埋め込みソース

埋め込みレイヤー（`src/lib/memory/embedding/`）は、`MemorySettingsExtended.embeddingSource` に基づいて使用するソースを決定します。

| ソース         | 説明                                                                                       | キーの要否 | コールドスタート   |
| -------------- | ------------------------------------------------------------------------------------------ | ---------- | ------------------ |
| `remote`       | 設定されたプロバイダーの埋め込み API（OpenAI、Cohere など）を使用                          | 必要       | なし               |
| `static`       | `potion-base-8M`（WordPiece + 平均プーリング）によるローカルのルックアップテーブル埋め込み | 不要       | 約200ms            |
| `transformers` | `@huggingface/transformers` v4、`all-MiniLM-L6-v2` によるローカル ONNX 推論                | 不要       | 約3s + 約400MB RAM |
| `auto`         | 実行時に解決：remote（キーが存在する場合）→ static → transformers → null                   | 状況による | 状況による         |

**`auto` の解決順序：**

1. `listEmbeddingProviders()` で `hasKey === true` の最初のプロバイダーを見つける → `remote`。
2. `settings.staticEnabled === true` の場合 → `static`。
3. `settings.transformersEnabled === true` の場合 → `transformers`。
4. それ以外 → `null`（FTS5 キーワード検索にフォールバック）。

埋め込みキャッシュ（`src/lib/memory/embedding/cache.ts`）は、`${source}:${model}:${dim}:${sha256(text)}` をキーとするインメモリ LRU マップを使用し、エントリ数は `MEMORY_EMBEDDING_CACHE_MAX`（デフォルトは 1000）、TTL は `MEMORY_EMBEDDING_CACHE_TTL_MS`（デフォルトは 5 分）です。プロセスのライフサイクル中、すべての呼び出し元で共有されます。

## ハイブリッド RRF（k=60）

`strategy = "hybrid"` でベクトルストアが利用可能な場合、検索では Reciprocal Rank Fusion を使用して FTS5 とベクトルの結果を統合します。

```
RRF(d) = Σ  1 / (k + rank_i(d))      ここで k = 60（MEMORY_RRF_K で設定可能）
          i
```

具体的には：

1. FTS5 検索を実行 → ランク付けされたリスト `R_fts`（順位 1..N）。
2. KNN ベクトル検索を実行 → ランク付けされたリスト `R_vec`（順位 1..M）。
3. 一意の各 `memoryId` について：  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)`（リストにない場合は 0）。
4. `rrf_score` の降順でソートし、トークン予算に従って順番に適用。

RRF は、異種の検索システム間でスコアを正規化する必要なく効果を発揮することで広く知られています。デフォルトの `k=60` は Cormack らの原論文に由来し、小規模なコーパス（メモリ数 10k 未満）で良好に機能します。

## バックフィル（遅延 + 再インデックス）

埋め込みモデルが変更されると（`embedding_signature` によって検出）、ベクトルストアが再構築され、既存のすべてのメモリが `memories` テーブルで `needs_reindex = 1` に設定されます。

**遅延バックフィル**：次回の検索時に、ベクトルエントリがないメモリは検索の実行前に埋め込みが生成され、`vec_memories` に挿入されます。これにより、起動をブロックすることなく、バックフィルのコストを実際のリクエスト全体に分散できます。

**明示的な再インデックス**：`/dashboard/memory` の Engine タブには、`POST /api/memory/reindex` を呼び出す「今すぐ再インデックス」ボタンがあります。ハンドラーは `src/lib/memory/reindex.ts` の `runReindexBatch()` を呼び出し、リクエストごとに最大 `limit` 件の保留中エントリを処理します。進捗は `GET /api/memory/engine-status`（`vectorStore.needsReindex`）を通じてポーリングできます。

`memory_vec_meta` テーブル（マイグレーション `083_memory_vec.sql`）には、以下が格納されます。

- `active_dim` — 現在のベクトル次元（null = 未調整）。
- `embedding_signature` — 変更の検出に使用される `${source}:${model}:${dim}`。
- `last_reset_at` — 最後に完全リセットした時刻のタイムスタンプ。
- `vec_loaded` — sqlite-vec が正常にロードされたかどうかを示す 0/1 フラグ。

## 設定の拡張

`src/shared/schemas/memory.ts` の `MemorySettingsExtended` では、9つの埋め込みおよびベクトル関連フィールドを利用でき、`src/lib/db/settings.ts` を介して永続化されます。

| フィールド               | 型                                                 | デフォルト | 説明                                                       |
| ------------------------ | -------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`   | 使用する埋め込みソース                                     |
| `embeddingProviderModel` | `string \| null`                                   | `null`     | `provider/model` 形式のプロバイダー／モデル                |
| `customBaseUrl`          | `string \| null`                                   | `null`     | Memory 専用の OpenAI 互換エンドポイントのベース URL        |
| `customModelId`          | `string \| null`                                   | `null`     | カスタムエンドポイントへ送信されるモデル ID                |
| `transformersEnabled`    | `boolean`                                          | `false`    | Transformers.js（MiniLM、約400MB）のオプトイン             |
| `staticEnabled`          | `boolean`                                          | `false`    | 静的なローカルモデル potion-base-8M のオプトイン           |
| `rerankEnabled`          | `boolean`                                          | `false`    | 再ランキング手順を有効化（リクエストごとに200～500ms追加） |
| `rerankProviderModel`    | `string \| null`                                   | `null`     | `provider/model` 形式の再ランキング用プロバイダー／モデル  |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"`   | 使用するベクトルバックエンド                               |

これらは `GET /PUT /api/settings/memory`（スキーマ `MemorySettingsExtendedSchema`）を介して公開されます。

`remote` ソースでは、Memory はオプションの `customBaseUrl` および
`customModelId` 設定も受け付けます。これらを組み合わせることで、グローバルな埋め込みレジストリを変更せずに、OpenAI 互換の `/embeddings`
エンドポイントとモデルを選択できます。エンドポイントは使用前に正規化され、プロバイダーの送信先 URL ポリシーによって検査されます。HTTP(S) が必須であり、埋め込み認証情報とクエリ文字列は拒否され、クラウドメタデータアドレスも引き続きブロックされます。空の値の場合、選択済みのレジストリプロバイダーが維持されます。ダッシュボードへ返されるエラーはサニタイズされ、エンドポイントの認証情報がログに記録されることはありません。

> **TODO (D20):** スコープ `global`（すべての API キー間でメモリを共有）は、
> このリリースでは実装されていません。スキーマの変更とグローバル取得
> パスが必要です。個別に追跡してください。

## ストレージ層

### プライマリ：SQLite（`memories` テーブル）

マイグレーション `015_create_memories.sql` によって作成されます。

| カラム                      | 型                 | 備考                                                                       |
| --------------------------- | ------------------ | -------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | `crypto.randomUUID()` によって生成される UUID                              |
| `api_key_id`                | `TEXT NOT NULL`    | 所有元の API キー                                                          |
| `session_id`                | `TEXT`             | オプションの会話単位スコープ                                               |
| `type`                      | `TEXT NOT NULL`    | `factual`、`episodic`、`procedural`、`semantic` のいずれか                 |
| `key`                       | `TEXT`             | 安定した upsert キー（例：`preference:i_prefer_python`）                   |
| `content`                   | `TEXT NOT NULL`    | 実際のファクトテキスト                                                     |
| `metadata`                  | `TEXT`             | JSON BLOB（category、extractedAt、source など）                            |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 文字列                                                            |
| `expires_at`                | `TEXT`             | オプションの有効期限。`NULL` は永続を意味する                              |
| `memory_id`                 | `INTEGER UNIQUE`   | UUID と FTS5 rowid を橋渡しするために `023_fix_memory_fts_uuid.sql` で追加 |

インデックス：`api_key_id`、`session_id`、`type`、`expires_at`、および一意な
`memory_id` インデックス。

**Upsert のセマンティクス**：`createMemory()` は、同じ
`(api_key_id, key)` を持つ既存の行を検索し、見つかった場合はその場で更新します（浅いスプレッドによって `metadata` をマージします）。
これにより、同じ設定内容が繰り返し記述されても、テーブルが際限なく増大することを防ぎます。

### 全文検索（`memory_fts` 仮想テーブル）

`022_add_memory_fts5.sql` は、`content` および
`key` に対する FTS5 仮想テーブルを作成します。`023_fix_memory_fts_uuid.sql` は、UUID
主キーを FTS5 の整数 rowid と結合できなかった実環境のバグを修正します。このマイグレーションでは、
`memory_id` カラムを追加し、FTS テーブルを再作成して、INSERT、DELETE、UPDATE 時に
FTS の同期を維持するトリガー
（`memory_fts_ai`、`memory_fts_ad`、`memory_fts_au`）を接続します。

`retrieval.ts` によって `semantic` および `hybrid` 戦略で使用されます（以下を参照）。
取得コードは `hasTable("memory_fts")` で保護されており、FTS テーブルが存在しない場合や FTS クエリが例外をスローした場合は、時系列順へフォールバックします。

### オプション：Qdrant（ベクトルストアの第2層）

`src/lib/memory/qdrant.ts` は、第2層ベクトルストアとしてオプションの Qdrant 連携を実装します。
取得処理が Qdrant にルーティングされるのは、エンジンセレクター
`memoryVectorStore === "qdrant"` の場合のみです。デフォルトの `"auto"`（および `"sqlite-vec"`）では、Qdrant が選択されることは**ありません**。Engine タブのトグルは、`qdrantEnabled` と
`memoryVectorStore` の**両方**を同時に設定します。有効化すると Qdrant がプライマリストアになり、無効化すると
`"auto"` にリセットされます（#5597 — この修正以前は、エンジンセレクターへ何も書き込まれていなかったため、有効化しても機能しませんでした）。Qdrant に到達できない場合、または何も返さない場合、取得処理は
sqlite-vec → FTS5 の順にフォールバックします。

- `upsertSemanticMemoryPoint()` — 設定された埋め込みモデルで `key + content` を埋め込み、コレクションが存在することを確認し（初回使用時にコサイン距離ベクトルを作成）、ペイロード `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}` を持つポイントをアップサートします。
- `searchSemanticMemory(query, topK, scope)` — クエリを埋め込み、`kind = "omniroute_memory"` でフィルタリングし、必要に応じて
  `apiKeyId` / `sessionId` でもフィルタリングしてコレクションを検索します。`topK` は `[1, 20]` の範囲に制限されます。
- `deleteSemanticMemoryPoint(id)` — 単一ポイントを削除します。SQLite の行が削除された後に
  `deleteMemory()` から呼び出されます（D15）。
- `cleanupSemanticMemoryPoints({retentionDays})` — `expiresAtUnix` が過去であるか、`createdAtUnix` が保持期間のカットオフより古いポイントを一括削除します。
  ダッシュボードに実際の件数を表示できるよう、最初に件数をカウントします。
- `checkQdrantHealth()` — レイテンシを含む `GET /readyz` ヘルスプローブです。

設定 UI では、`/dashboard/memory` の **Engine タブ**で Qdrant の設定、ヘルスチェック、セマンティック検索テスト、
およびクリーンアップを利用できます。`src/app/api/settings/qdrant/` 配下の対応するルートは、v3.8.6 時点ですべて接続されています。

| ルート                                  | メソッド      | 説明                           |
| --------------------------------------- | ------------- | ------------------------------ |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Qdrant 設定の読み取り / 更新   |
| `/api/settings/qdrant/health`           | `GET`         | 稼働確認プローブ + レイテンシ  |
| `/api/settings/qdrant/search`           | `POST`        | セマンティック検索テスト       |
| `/api/settings/qdrant/cleanup`          | `POST`        | 期限切れ / 古いポイントの削除  |
| `/api/settings/qdrant/embedding-models` | `GET`         | 利用可能な埋め込みモデルの一覧 |

**動作に関する注意事項（想定される挙動）：**

- **エンジンの選択** — Engine タブで Qdrant を有効にすると、Qdrant がプライマリストアになります
  （`memoryVectorStore="qdrant"` を設定）。無効にすると `"auto"` にリセットされます（#5597）。
- **バックフィルなし** — Qdrant を有効にした**後**に作成または更新されたメモリのみが、
  Qdrant に書き込まれます（非同期のデュアルライト）。既存の SQLite メモリは移行**されません**。
  「Reindex Now」は sqlite-vec インデックスのみを再構築し、Qdrant は対象外です。
- **ベクトル次元は、初回使用時の実際の埋め込みから自動検出されます** — 入力する次元フィールドはありません。
  コレクションの作成後に埋め込みモデルを変更しても、**自動的には処理されません**。既存のコレクションは変更されず、
  次元が一致しない書き込みや検索は失敗して sqlite-vec にフォールバックします。埋め込みモデルを切り替えるには、
  コレクションを再作成してください（新しい名前を使用するか、Qdrant で削除します）。
- **距離メトリクス** — 常に **Cosine** です（コレクション作成時にハードコードされており、
  設定変更できません）。
- **認証** — API キーのみです（`api-key` ヘッダーとして送信。認証なしのローカル Docker では省略可能）。
  JWT/RBAC は使用されません。
- **設定フィールド** — UI には `host`、`port`、`collection`、`embeddingModel`、
  `apiKey` が表示されます。`vectorSize` / `hnswEfConstruct` は環境変数/DB でのみ設定でき、
  `vectorSize` はコレクション作成には使用されません（次元は埋め込みから取得されます）。

### ベクトル量子化（int8 — オプトイン、両バックエンド）

両方のベクトルバックエンドは、保存されるベクトルのメモリ使用量を削減するため、
**オプトインの int8 量子化**をサポートしています（Float32 より約4倍小さい一方で、
再現率がわずかに低下します）。どちらもデフォルトでは**無効**であり、明示的に有効化しない限り、
ベクトルは完全精度のままです。

| バックエンド | 設定                                  | 型                             | デフォルト | 読み取り元                                                  |
| ------------ | ------------------------------------- | ------------------------------ | ---------- | ----------------------------------------------------------- |
| Qdrant       | `qdrantQuantization`（DB キー）       | `"none" \| "int8" \| "binary"` | `"none"`   | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec   | `MEMORY_VEC_QUANTIZATION`（環境変数） | `"none" \| "int8"`             | `"none"`   | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** は、`qdrantQuantization` 設定キーを使用してインスタンスごとに設定されます
  （`PUT /api/settings/qdrant` の `quantization` フィールドとして公開）。`"int8"` の場合、
  `buildQuantizationConfig()` はスカラー量子化（`always_ram`、分位点 `0.99`）を要求し、
  検索では `rescore: true` が有効になるため、完全精度のベクトルによって int8 の候補セットが絞り込まれます。
- **sqlite-vec** の量子化は**環境変数のみ**で設定できます（DB 設定ではありません）。
  ローカルベクトルを `vec_quantize_int8(?, 'unit')` による `int8[dim]` カラムとして保存するには、
  `MEMORY_VEC_QUANTIZATION=int8` を設定します。選択したモードは `embedding_signature`
  （`:int8` サフィックス）に組み込まれるため、モードを切り替えると `vec_memories` テーブルの完全な再インデックスが実行されます。
  これは、埋め込みモデルを変更したときに使用されるものと同じ遅延バックフィル処理です。

## メモリタイプ

`MemoryType`（`src/lib/memory/types.ts`）:

| タイプ       | 用途                                                         |
| ------------ | ------------------------------------------------------------ |
| `factual`    | 好み、安定したユーザー情報、行動パターン                     |
| `episodic`   | 特定の時点に結び付いた意思決定（「Postgres を選んだ」）      |
| `procedural` | ワークフロー／手順の記憶（予約済み。現在、自動抽出機能なし） |
| `semantic`   | ベクトルストアのエントリ用に予約済み                         |

`MemoryConfig` の取得戦略は `exact`、`semantic`、`hybrid` のいずれかで、
スコープは `session`、`apiKey`、`global` のいずれかです。
`getMemorySettings()` のデフォルトスコープは `apiKey` です。

## ファクト抽出（`extraction.ts`）

抽出は LLM ベースではなく、**正規表現ベース**です。レスポンスストリームを
ブロックしないよう、`setImmediate()` を使用してプロセス内で実行されます。

- **好みのパターン** → `MemoryType.FACTUAL`
  （例: `I prefer …`、`I really like …`、`my favorite is …`、`I hate …`）
- **意思決定のパターン** → `MemoryType.EPISODIC`
  （例: `I'll use …`、`I chose …`、`I went with …`、`I'm going to adopt …`）
- **行動パターン** → `MemoryType.FACTUAL`
  （例: `I usually …`、`I always …`、`I tend to …`）

各一致項目はサニタイズ（`trim`、空白文字の連続を単一化、500 文字を上限）され、
安定した `factKey(category, content)` によってバッチ内で重複排除された後、
メタデータ `{category, extractedAt, source: "llm_response"}` とともに
`createMemory()` を介して保存されます。入力テキストは 64 KiB
（`MAX_EXTRACTION_TEXT_LENGTH`）を上限とします。これを超える場合は、
最新のアシスタントコンテンツが常に対象となるよう、テキストの**末尾**が使用されます。

`extractFactsFromText(text)` はテスト用にエクスポートされており、
保存せずに構造化されたファクトを返します。

## 取得（`retrieval.ts`）

`retrieveMemories(apiKeyId, config)` が主要なエントリーポイントです。処理内容は以下のとおりです。

1. `MemoryConfigSchema` を介して設定を正規化し、検証します。
2. `enabled` が false、または `maxTokens <= 0` の場合は、直ちに `[]` を返します。
3. `maxTokens` を `[1, 8000]` の範囲に制限します。
4. 旧式の `memory` テーブルではなく、現在の `memories` テーブルが存在するかどうかを検出し、古いデータベースでも引き続き動作できるようにします。
5. 有効期限ガード
   （`expires_at IS NULL OR datetime(expires_at) > datetime('now')`）、
   オプションのセッションスコープ、およびオプションの `retentionDays` カットオフを使用して、
   ベースクエリを構築します。
6. 戦略に応じて分岐します。
   - **`exact`**（デフォルト）: 時系列順の `ORDER BY created_at DESC LIMIT 100`。
   - **`semantic`**: `config.query` があり、`memory_fts` が存在する場合は、
     `memory_fts MATCH ?` を JOIN し、FTS ランク順に並べます。FTS が 0 行を返した場合は、
     時系列順にフォールバックします。
   - **`hybrid`**: FTS 結果（関連性が高い）と時系列順のセットを統合し、id で重複排除します。
7. クエリが指定されている場合は、`content`、`key`、`metadata` JSON を対象に、
   キーワード関連度スコア（`getRelevanceScore`）を計算します。スコアが 0 の行は除外されます。
8. スコアの降順、次に `createdAt` の降順で並べ替えます。
9. ランク付けされたリストを順に処理し、累積 `estimateTokens(content)`（約 `length / 4`）が
   予算内に収まる間、エントリを採用します。一致するものがある場合は、
   常に少なくとも 1 件のエントリを返します。

`estimateTokens` はエクスポートされており、取得、要約、および MCP の
`omniroute_memory_search` ツールで使用されます。

## インジェクション（`injection.ts`）

`injectMemory(request, memories, provider)`:

1. すべてのメモリ内容を単一の `Memory context: …` 文字列に結合します。
2. プロバイダー名に基づいて戦略を選択します。
   - **システムメッセージ**（OpenAI、Anthropic、Gemini などのデフォルト）— 既存のシステムメッセージより前に
     `{role: "system", content: memoryText}` を追加し、ユーザーのシステムプロンプトが引き続き優先されるようにします。
   - **ユーザーメッセージ**（フォールバック）— `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`
     に含まれるプロバイダー（`o1`、`o1-mini`、`o1-preview`、
     `glm`、`glmt`、`glm-cn`、`zai`、`qianfan`）に使用します。これらはシステムロールを拒否するため、
     それ以外の場合は 400 エラーになります（GLM/Zhipu については issue #1701 を参照）。
3. 件数、戦略、モデルを `memory.injection.injected` の下にログとして記録します。

`providerSupportsSystemMessage(provider)` は、独自にルーティングを判断する必要がある呼び出し元向けにエクスポートされています。不明なプロバイダーは、安全のためデフォルトで `true`
（システムロールを許可）になります。

## 設定（`settings.ts`）

メモリ設定は環境変数ではなく、**DB の settings テーブルに保存されます**。
`getMemorySettings()` は `getSettings()` から読み取り、結果をプロセス内にキャッシュします。書き込み後、settings の PUT
ルートによって `invalidateMemorySettingsCache()` が呼び出されます。

### レガシーフィールド（すべてのバージョン）

| DB キー               | 型     | デフォルト                                              | UI コントロール                                                |
| --------------------- | ------ | ------------------------------------------------------- | -------------------------------------------------------------- |
| `memoryEnabled`       | 真偽値 | `false`（v3.8.30 以降はデフォルトでオフ）               | メモリのオン／オフ                                             |
| `memoryMaxTokens`     | 整数   | `2000`（範囲 `0–16000`）                                | インジェクションのトークン予算                                 |
| `memoryRetentionDays` | 整数   | `30`（範囲 `1–365`）                                    | 保持期間                                                       |
| `memoryStrategy`      | 列挙型 | `"hybrid"`（`recent`、`semantic`、`hybrid` のいずれか） | 取得戦略                                                       |
| `skillsEnabled`       | 真偽値 | `false`                                                 | キーごとのスキルインジェクションを切り替え（SKILLS.md を参照） |

注：UI の戦略 `"recent"` は、`toMemoryRetrievalConfig()` を介して内部の `"exact"` 取得戦略
（時系列順）にマッピングされます。

### 新しいフィールド（v3.8.6、plan 21 D9）

フィールドの説明については、上記の「設定の拡張」セクションも参照してください。

| DB キー                     | API フィールド           | デフォルト |
| --------------------------- | ------------------------ | ---------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`   |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`     |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`    |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`    |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`    |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`     |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`   |

Qdrant 関連の DB キー（`qdrantEnabled`、`qdrantHost`、`qdrantPort`、
`qdrantApiKey`、デフォルトが `"omniroute_memory"` の `qdrantCollection`、
デフォルトが `"openai/text-embedding-3-small"` の `qdrantEmbeddingModel`）は、
`qdrant.ts` の `normalizeQdrantConfig()` によって読み取られます。

### 環境変数（v3.8.6）

6 つのオプションの環境変数で、エンジンの実行時動作を調整できます（`.env.example` に記載）。

| 変数                            | デフォルト                 | 説明                                                                                                                                                             |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | 埋め込みキャッシュの TTL（5 分）                                                                                                                                 |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | 埋め込み LRU キャッシュの最大エントリ数                                                                                                                          |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Transformers.js モデルの HF リポジトリ                                                                                                                           |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | 静的 potion モデルの HF リポジトリ                                                                                                                               |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | ダウンロードしたモデルの保存先                                                                                                                                   |
| `MEMORY_VEC_TOP_K`              | `20`                       | ベクトル検索のデフォルト top-K                                                                                                                                   |
| `MEMORY_RRF_K`                  | `60`                       | ハイブリッド検索の RRF k 定数                                                                                                                                    |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | ローカルの sqlite-vec ベクトルを量子化して保存するには `int8` に設定します（約 4 分の 1 のサイズ、オプトイン）。モードを変更すると再インデックスが強制されます。 |

## 要約（`summarization.ts`）

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` は、あるキーのメモリにおける累計トークン数が予算を超えた場合に、古いコンテンツを圧縮します。`created_at` の降順で行を反復処理し、予算内に収まる行は保持し、残りについては `content` を元のコンテンツの最初の3文でその場で置き換えます。`tokensSaved` は、置き換え前後のコンテンツに対する `estimateTokens` の差です。

このルーチンは現在**利用可能ですが、チャットパイプラインから自動的には呼び出されません**。継続的な圧縮が必要な場合は、cron、管理アクション、または `MemoryConfig.autoSummarize` の連携処理から呼び出してください。データ損失は一方向であり、元のテキストは上書きされます。

## REST API

すべてのエンドポイントで管理認証（`requireManagementAuth`）が必要です。

### コアメモリエンドポイント（既存 + 更新）

| メソッド | パス                 | 説明                                                                                                                                                                                                      |
| -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | フィルター付きのページネーションされた一覧：`apiKeyId`、`type`、`sessionId`、`q`、`limit`、`page`、`offset`。レスポンスには `stats.total`、`stats.tokensUsed`、`stats.hitRate`、`cacheStats` が含まれます |
| `POST`   | `/api/memory`        | エントリを作成します（Zod で検証：`content`、`key`、任意の `type`、`sessionId`、`apiKeyId`、`metadata`、`expiresAt`）。`createMemory()` を呼び出し、`(apiKeyId, key)` に基づいてアップサートします        |
| `GET`    | `/api/memory/[id]`   | UUID で単一のエントリを取得します                                                                                                                                                                         |
| `PUT`    | `/api/memory/[id]`   | エントリのフィールド（`type`、`key`、`content`、`metadata`）を更新します。本文：`MemoryUpdatePutSchema`。埋め込み元が利用可能な場合はベクトルも同期します。                                               |
| `DELETE` | `/api/memory/[id]`   | エントリを削除します。`vec_memories`（D15）からも削除し、Qdrant からはベストエフォートで削除します。対象が存在しない場合は 404 を返します。                                                               |
| `GET`    | `/api/memory/health` | `verifyExtractionPipeline("health-check")` を実行し、作成→一覧取得→削除のラウンドトリップを検証します。`{working, latencyMs, error?}` を返します                                                          |

### 新しいメモリエンジンのエンドポイント（プラン21）

| メソッド | パス                              | 説明                                                                                                                                                                 |
| -------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/api/memory/retrieve-preview`    | `retrieveMemories` のドライランです。スコア、階層、トークン数を含むランキング済みの結果を返します。本文：`RetrievePreviewSchema`。メモリへの注入や変更は行いません。 |
| `GET`    | `/api/memory/embedding-providers` | 埋め込みモデルを持つプロバイダーを一覧表示し、API キーが設定されているプロバイダーを示します。                                                                       |
| `GET`    | `/api/memory/engine-status`       | キーワード階層、埋め込み解決、ベクトルストアの統計、Qdrant の正常性、再ランキング設定を含む、エンジンの完全な状態を返します。形式：`MemoryEngineStatusSchema`。      |
| `POST`   | `/api/memory/summarize`           | メモリ圧縮を手動でトリガーします。本文：`MemorySummarizeSchema`（`olderThanDays`、`apiKeyId?`、`dryRun`）。`{candidates, tokensSaved}` を返します。                  |
| `POST`   | `/api/memory/reindex`             | `needs_reindex=1` のメモリに対してベクトルの再インデックスをトリガーします。本文：`MemoryReindexSchema`（`force`）。`{started, pending}` を返します。                |

### 設定エンドポイント

| メソッド | パス                                    | 説明                                                                                                             |
| -------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/settings/memory`                  | 現在の正規化済み `MemorySettingsExtended`（新規7フィールド + レガシーフィールド）                                |
| `PUT`    | `/api/settings/memory`                  | `MemorySettingsExtendedSchema` の任意のフィールドを更新します（合計12フィールド）                                |
| `GET`    | `/api/settings/qdrant`                  | 現在の Qdrant 設定（`QdrantSettingsSchema`）                                                                     |
| `PUT`    | `/api/settings/qdrant`                  | Qdrant 設定を更新します。本文：`QdrantSettingsUpdateSchema`。`apiKey` に空文字列を指定するとキーが削除されます。 |
| `GET`    | `/api/settings/qdrant/health`           | 設定済みの Qdrant インスタンスに対して稼働状態プローブを実行します。`QdrantHealthResultSchema` を返します。      |
| `POST`   | `/api/settings/qdrant/search`           | Qdrant に対するセマンティック検索をテストします。本文：`QdrantSearchSchema`（`query`、`topK`）。                 |
| `POST`   | `/api/settings/qdrant/cleanup`          | 期限切れまたは古いメモリに対応する Qdrant のポイントを削除します。                                               |
| `GET`    | `/api/settings/qdrant/embedding-models` | Qdrant で利用可能な埋め込みモデルを一覧表示します。                                                              |

`/api/memory` の一覧クエリは、`page` ベースのページネーション（`parsePaginationParams`）または生の `offset` のいずれかをサポートします。`offset` が指定されている場合はそちらが優先され、レスポンス形式に合わせて `page` が算出されます。

## MCP ツール (`open-sse/mcp-server/tools/memoryTools.ts`)

MCP サーバーが有効な場合、3 つのメモリツールが登録されます。

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → `retrieveMemories()` をラップします。v3.8.6 (D16) 以降、`strategy` は
  `"exact"` にハードコードされるのではなく、`getMemorySettings()` から
  読み取られます。`query` が指定され、`strategy` が `semantic` または
  `hybrid` の場合、利用可能であればベクトルストアが使用されます。
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → `createMemory()` をラップします。4 つの標準タイプ
  `factual`、`episodic`、`procedural`、`semantic` のみを受け付けます (D17)。
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → 一致する
  エントリを一覧表示し、必要に応じて作成日時が指定タイムスタンプより前のものに絞り込んだ後、
  `deleteMemory()` を介して各エントリを削除します（sqlite-vec + Qdrant からベクトルも削除されます）。

トランスポートとスコープの詳細については、[MCP-SERVER.md](./MCP-SERVER.md) を参照してください。

## ダッシュボード (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` は現在、**3 タブ構成の Studio** です。

### タブ: Memories

- コンセプトカード（折りたたみ可能な「仕組み」説明）。
- リアルタイムの一覧表示、検索、ページネーション（300 ms のデバウンス）。
- タイプフィルター（`factual` / `episodic` / `procedural` / `semantic` / すべて）。
- メモリ追加モーダル（キー、コンテンツ、タイプ）。
- インライン編集（鉛筆ボタン → `PUT /api/memory/[id]`）。
- 行ごとの削除（確認ダイアログ付き）。
- 現在のページを JSON としてエクスポート。ファイルピッカーを介した JSON インポート。
- 統計カード: `totalEntries`、`tokensUsed`、`hitRate`。
- 「古い項目を圧縮」ボタン → `POST /api/memory/summarize`（最初にドライランで候補数を表示し、その後に確認）。
- `GET /api/memory/health` に基づく緑色／赤色のヘルスドット。

### タブ: Playground

- クエリ入力 + 戦略セレクター（完全一致 / セマンティック / ハイブリッド）+ トークン予算。
- 「シミュレート」→ `POST /api/memory/retrieve-preview` — `score`、`tier`、`tokens`、`vecScore`、`ftsScore` を含むランキング結果を表示します。
- 使用された埋め込みソース／ベクトルストアと、フォールバックが発生したかどうかを示す解決パネル。

### タブ: Engine

- エンジンステータスパネル（キーワード FTS5 チップ、埋め込みチップ、ベクトルストアチップ、Qdrant ヘルスチップ、再ランキングチップ）。
- 「今すぐ再インデックス」ボタン → `POST /api/memory/reindex`。
- 埋め込みソースセレクター（自動 / リモート / 静的 / Transformers + 切り替え）。
- Qdrant 設定カード（有効化切り替え、ホスト／ポート／コレクション／キー、接続テスト、セマンティック検索テスト、クリーンアップ）。
- 再ランキング設定カード（有効化切り替え、プロバイダー／モデルセレクター）。

メモリと Qdrant の設定は、従来の／グローバルな設定画面として
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) にもあります。

## キャッシュ

`src/lib/memory/store.ts` は、`getMemory(id)` の読み取り用にプロセス内の LRU 風キャッシュ
（`MEMORY_CACHE_TTL = 1 min`、`MEMORY_MAX_CACHE_SIZE = 500`、最も古い 20 %
を削除）を保持します。また、独自のスコープ付きキャッシュを必要とする呼び出し元が使用する、
`get`/`set`/`invalidate` メソッドを備えた汎用キー／値 `memoryCache` レイヤー
（`src/lib/memory/cache.ts`）もあります（1 000 エントリの LRU、デフォルト TTL は 5 min）。

## プライバシーとライフサイクル

- メモリの所有者は API キー ID です（`chatCore.ts` の `resolveMemoryOwnerId`）。`apiKeyInfo.id` がない場合、取得、注入、抽出のいずれも実行されません。
- 将来の `expires_at` を持つエントリは取得対象から除外されます。また、`retentionDays` を超えた古いエントリは、`retrieveMemories` の `created_at >= cutoff` 句によって除外されます。
- 完全に削除するには、`DELETE /api/memory/[id]` または `omniroute_memory_clear` を使用してください。
- 抽出は `setImmediate` によって非同期で実行され、完了を待ちません。失敗は `memory.extraction.background.failed` としてログに記録され、呼び出し元に通知されることはありません。
- 検証のラウンドトリップ（`verifyExtractionPipeline`）では、`finally` ブロック内で自身のテストエントリをクリーンアップします。

## 関連項目

- [SKILLS.md](./SKILLS.md) — `skillsEnabled` 設定により、メモリとともにツール定義が注入されます。
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP のトランスポート／スコープ。
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — より広範な API サーフェス。
- ソースモジュール：
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + ハイブリッド RRF
  - `src/lib/memory/embedding/index.ts` — マルチソース埋め込みレイヤー
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — すべてのメモリ API ボディ用の Zod スキーマ
  - `src/shared/schemas/qdrant.ts` — Qdrant の設定／操作用の Zod スキーマ
  - `src/lib/db/memoryVec.ts` — `memory_vec_meta` の CRUD
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + サブルート
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI（ページ + コンポーネント +
    タブ + フック）
  - `open-sse/handlers/chatCore.ts`（注入／抽出の接続処理）
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## 埋め込みプロバイダーの選択（v3.8.16+）

OmniRoute のメモリエンジンは、**4 つの埋め込みソース**（`src/lib/memory/embedding/`）をサポートしています。それぞれ、**レイテンシ、コスト、モデル品質、セットアップの複雑さ**におけるトレードオフが異なります。

### 埋め込みソース

| プロバイダー   | ソース                                          | レイテンシ                              | コスト                    | 品質                               | セットアップ                         |
| -------------- | ----------------------------------------------- | --------------------------------------- | ------------------------- | ---------------------------------- | ------------------------------------ |
| `transformers` | ローカル ONNX モデル（Xenova/all-MiniLM-L6-v2） | 約50～150ms（CPU）                      | 無料                      | 良好                               | `npm install` のみ                   |
| `static`       | 事前計算済みベクトル（キャッシュ済み）          | 1ms未満                                 | 無料                      | 該当なし（キャッシュヒットに依存） | なし                                 |
| `remote`       | OpenAI / Cohere / Voyage API                    | 約100～300ms                            | $0.02～0.10/100万トークン | 非常に優れている                   | API キー                             |
| `auto`         | 実行時に利用可能な最適なソースを選択            | 選択されたソースと同じ                  | 無料                      | 選択されたソースと同じ             | なし                                 |
| _(cache)_      | 任意のソース上のインメモリ LRU レイヤー         | 1ms未満（ヒット）、全レイテンシ（ミス） | 無料                      | 基盤となるソースと同じ             | 常時有効（選択可能なソースではない） |

### デシジョンツリー

```
                  デプロイ環境はどれですか？
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  開発／テスト  小規模本番   大規模本番    エッジ／オフライン
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  （無料、API不要）          （最高品質）    （インターネット不要）
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            必ず上に `cache` レイヤーを追加
            （LruCache が任意のプロバイダーをラップ）
```

### データベースと API の設定

メモリ埋め込みオプションは、環境変数ではなく Settings API/UI を介して設定します。Settings における関連設定のデータベースキー（`src/lib/memory/settings.ts` の `normalizeMemorySettings`）は次のとおりです。

- `memoryEmbeddingSource`: `"transformers"`（ローカル）、`"remote"`（API ベース、例：OpenAI）、`"static"`（外部ストア）、または `"auto"`
- `memoryEmbeddingProviderModel`: リモート／静的ソースのモデル識別子（例：`"text-embedding-3-small"`）
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`、`"qdrant"`、または `"auto"`

#### ローカルモデル（`transformers`）

内部で transformers.js を使用してローカルモデルを実行します。

```bash
# コード内で読み取られる環境変数（src/lib/memory/embedding/index.ts）：
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF モデルリポジトリ
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF 静的 Potion モデル
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # キャッシュディレクトリ
```

#### LRU 埋め込みキャッシュ

キャッシュはデフォルトで常に有効であり、環境変数を介して設定します。

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # キャッシュされる項目の最大数
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL（5分）
```

### パフォーマンス数値

一般的な4コアx86サーバーでのベンチマーク（各テキスト約100トークン）：

| プロバイダー         | p50   | p95   | p99   | 100万埋め込みあたりのコスト         |
| -------------------- | ----- | ----- | ----- | ----------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | 無料                                |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | 約$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Qdrantのホスティングによる          |
| `cache` (ヒット)     | <1ms  | <1ms  | 2ms   | 無料                                |

---

## ファクト抽出パターン (v3.8.16+)

`extraction.ts` モジュール (`src/lib/memory/extraction.ts`) は、**正規表現によるパターンマッチング**を使用して、会話メッセージから構造化されたファクトを抽出します。これらのパターンを理解することで、ユースケースに合わせて抽出品質を調整できます。

### デフォルトのパターンカテゴリ

| カテゴリ            | パターン例                                                  | 抽出対象                         |
| ------------------- | ----------------------------------------------------------- | -------------------------------- |
| PREFERENCE_PATTERNS | `"I prefer <X>"`、`"I like <X>"`、`"I hate <X>"`            | ユーザーの好み                   |
| DECISION_PATTERNS   | `"I'll use <X>"`、`"I decided to <X>"`、`"I went with <X>"` | ユーザーの決定（エピソード記憶） |
| PATTERN_PATTERNS    | `"I usually <X>"`、`"I always <X>"`、`"I never <X>"`        | 持続的な行動パターン             |

### パターン例（簡略版）

```ts
// src/lib/memory/extraction.ts より
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### 抽出される内容

ユーザーが次のように発言した場合:

> 「TypeScript が好みです。このプロジェクトでは Postgres を使います。私は常にプッシュ前にコミットします。Python は好きではありません。」
> 抽出によって4件のメモリが生成されます:
>
> | キー                                 | カテゴリ   | タイプ   | 内容                        |
> | ------------------------------------ | ---------- | -------- | --------------------------- |
> | `preference:typescript`              | preference | factual  | "TypeScript"                |
> | `decision:postgres_for_this_project` | decision   | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing`      | pattern    | factual  | "commit before pushing"     |
> | `preference:python`                  | preference | factual  | "Python"                    |

### 抽出の制限

過剰な抽出を防ぐため、次の制限が適用されます:

| 最小コンテンツ長 | 3文字 |
| 最大コンテンツ長 | 500文字 |

### 抽出を無効にする場合

メモリが有効な場合、抽出は常に自動的に実行されます。抽出専用の切り替え設定はありません。無効にするには、`PUT /api/settings/memory` を介してメモリ全体を無効化してください (`enabled: false`)。次のような場合は、無効化を検討してください:

- メッセージ量が多く、抽出コストを無視できない場合
- 会話の大半が一時的なもの（チャット、デバッグ）で、長期的な価値がない場合
- カスタムプラグインですでにコンテキストを取得している場合

---

## ハイブリッドRRFのチューニング (v3.8.16+)

**Reciprocal Rank Fusion (RRF)** アルゴリズムは、FTS5（キーワード）とベクトル（セマンティック）の結果を組み合わせます。`k` パラメータは、順位の低い結果にどの程度の重みを与えるかを制御します。

### 計算式

各候補メモリのRRFスコアは次のとおりです:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

ここで:

- `k` は定数（デフォルトは60）
- `rank_i(d)` は、i番目の検索システム（FTS、ベクトル）におけるドキュメント `d` の順位
- 合計はすべての検索システムについて計算される

### `k` が結果に与える影響

| `k` の値                 | 効果                                                                | 最適な用途                   |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------- |
| `k=0`                    | 純粋な順位融合（平滑化なし）                                        | 理論上のベースライン         |
| `k=10-30`                | 上位の結果を大幅に重視し、下位の結果はほとんど寄与しない            | 上位3件が通常正しい場合      |
| **`k=60`**（デフォルト） | バランス型 — 上位10件の結果がすべて有意に寄与する                   | 汎用的な検索                 |
| `k=100+`                 | より平坦 — 複数のシステムに現れる場合、下位の結果でも優勢になり得る | 適合率より再現率が重要な場合 |

### 実践での `k` のチューニング

```bash
# デフォルト
MEMORY_RRF_K=60

# 積極的に適合率を重視（小規模なメモリ、少数のドキュメント）
MEMORY_RRF_K=20

# 最大限に再現率を重視（大規模なメモリ、多様なクエリ）
MEMORY_RRF_K=120
```

**`k=20` の例:**

- FTS順位1位 → 寄与度 `1/21 = 0.048`
- FTS順位10位 → 寄与度 `1/30 = 0.033`
- ベクトル順位1位 → 寄与度 `0.048`
- 合計の最大値: `0.096`

**`k=60` の例:**

- FTS順位1位 → 寄与度 `1/61 = 0.016`
- FTS順位10位 → 寄与度 `1/70 = 0.014`
- ベクトル順位1位 → 寄与度 `0.016`
- 合計の最大値: `0.033`

`k` が大きいほど、1位と10位の**相対的な差**は小さくなるため、アルゴリズムは上位順位の確信度よりも、**検索システム間の一致**を重視するようになります。

### `k` を変更する場合

| 症状                                     | 試すこと                                                         |
| ---------------------------------------- | ---------------------------------------------------------------- |
| 最上位の結果が常に選ばれるが、誤っている | kを**下げる**（例: 20）— 上位順位の確信度をより重視する          |
| 正解が上位5件にはあるが、1位ではない     | kを**上げる**（例: 100）— より平坦なスコアリングで一致を評価する |
| 再現率は高いが適合率が低い               | kを**下げる** — 順位付けをより明確にする                         |
| 再現率が低い（関連ドキュメントを逃す）   | kを**上げる** — 下位のドキュメントにも機会を与える               |

### RRFの重み付け

Reciprocal Rank Fusionでは、セマンティックベクトル順位と全文検索順位に同じ重みを使用します:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

個別の重みを調整するための環境変数はありません（`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` は存在しません）。

---

## 要約戦略 (v3.8.16+)

`summarization.ts` モジュール (`src/lib/memory/summarization.ts`) は、想起能力を維持しながらアクティブなセットを小さく保つため、古いメモリを圧縮します。

### 要約がトリガーされるタイミング

| トリガー               | しきい値 (デフォルト) |
| ---------------------- | --------------------- |
| API 経由の手動トリガー | 該当なし              |

### 要約される内容

`summarization.ts` からは、次の 2 つのエントリポイントがエクスポートされています。

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — セッションの
  メモリを、トークン予算内に収まる単一の要約テキストへ圧縮します。
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — API で使用される
  経過日数ベースの圧縮です。`days` より古いすべてのメモリを選択し、それらから
  1 つの圧縮された要約メモリを作成し、`dryRun` が `false` の場合は
  元のメモリを削除します。何も変更せずに候補セットと合計トークン数を
  プレビューするには、`dryRun: true` を渡します。

タグ/キーによるクラスタリング処理や、メモリごとの「中核か要約可能か」のスコアリングはありません。
選択は経過日数のカットオフのみに基づき、要約テキストは候補ごとに
タイプを接頭辞として付けた圧縮済みの行で構成されます。

### 要約のトリガー方法

要約は**手動 / オプトイン**です。`autoSummarize` 設定はデフォルトで `false` のため、
自動的に圧縮されることはありません。API 経由でトリガーしてください。

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

無効のままにするには、`autoSummarize` をデフォルト値 (`false`) のままにしてください。

### 要約品質を高めるためのヒント

- **最初に `dryRun` でプレビューする** — `summarizeMemoriesOlderThan(..., true)` は、
  候補リストと合計トークン数を返すため、元のメモリを削除する前に
  何が統合されるかを確認できます。
- **メモリのコーパスが大きい場合は、トラフィックの少ない時間帯に要約を実行する** — LLM 呼び出しが最も時間のかかる部分です

```bash
# Cron 形式: 毎日午前 3 時に要約
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## MemoryBackend プロバイダーパターン

> **信頼できる情報源:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **テスト:** `src/lib/memory/__tests__/generic-backend.test.ts`

MemoryBackend プロバイダーパターンは、既存のメモリエンジン上に**プラグイン可能なバックエンド抽象化レイヤー**を導入します。単一のストレージ実装に依存する代わりに、メモリシステムは設定可能なプライマリ/フォールバックルーティングを備えた複数のバックエンド (SQLite、Obsidian、Notion、カスタム HTTP バックエンド) をサポートするようになりました。

### アーキテクチャ

```
┌──────────────────────────────────────────────────────────┐
│                    API ルート                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       シングルトンオーケストレーター (manager.ts)        │
│                                                          │
│  プライマリ ──► バックエンド A  (例: SQLite)             │
│  フォールバック ─► バックエンド B  (例: Obsidian)        │
│                    バックエンド C  (例: GenericBackend    │
│                                      経由の Notion)       │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ バックエンド│ │ バックエンド│ │ バックエンド     │
│            │ │            │ │ (HTTP)           │
└────────────┘ └────────────┘ └──────────────────┘
```

#### コアインターフェース (`backend.ts`)

すべてのバックエンドは、`MemoryBackend` インターフェースを実装する必要があります。

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // 検索
  search(config: SearchConfig): Promise<Memory[]>;

  // ヘルスチェック
  health(): Promise<HealthCheckResult>;

  // ライフサイクル (任意)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

次の処理を行うシングルトンオーケストレーターです。

- `register(backend)` を介してバックエンドを**登録** — 起動時に `index.ts` から呼び出されます
- `configure(primary, fallbacks)` を介してプライマリ + フォールバックを**設定**
- CRUD/検索をプライマリへ**ルーティング**し、失敗時にはフォールバックチェーンを使用
- すべてのバックエンドを定期的に**ヘルスチェック**

**フォールバックの動作:**

| 操作     | プライマリ                | フォールバック                 |
| -------- | ------------------------- | ------------------------------ |
| `create` | ✅ プライマリのみ         | ❌                             |
| `get`    | ✅ 最初にプライマリを試行 | ✅ null の場合にフォールバック |
| `update` | ✅ プライマリのみ         | ✅ 非同期で同期処理            |
| `delete` | ✅ プライマリのみ         | ✅ 非同期で同期処理            |
| `list`   | ✅ プライマリのみ         | ❌                             |
| `search` | ✅ 最初にプライマリを試行 | ✅ エラー時にフォールバック    |

#### GenericMemoryBackend (`genericBackend.ts`)

任意の REST API を MemoryBackend に適合させる汎用 HTTP コネクターです。次の用途に役立ちます。

- **Notion** — Notion API 経由で接続
- **Obsidian** — Obsidian Local REST API 経由で接続
- **カスタムバックエンド** — RESTful なメモリ API を公開する任意のサービス

**設定:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // バックエンド API のベース URL
  apiKey?: string;           // 認証用 Bearer トークン
  headers?: Record<string, string>;  // カスタム HTTP ヘッダー
  timeout?: number;          // リクエストタイムアウト（デフォルト: 30000ms）
  backendType?: string;      // ログ記録用

  // エンドポイントのオーバーライド（デフォルトでは REST の規約を使用）
  endpoints?: {
    search?: string;   // デフォルト: "/memories/search"
    create?: string;   // デフォルト: "/memories"
    list?: string;     // デフォルト: "/memories"
    get?: string;      // デフォルト: "/memories/{id}"
    update?: string;   // デフォルト: "/memories/{id}"
    delete?: string;   // デフォルト: "/memories/{id}"
    health?: string;   // デフォルト: "/health"
  };

  // クエリパラメーター名のマッピング
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // パスパラメーター名のマッピング
  pathParams?: {
    id?/memoryId?
  };
}
```

**既知のバックエンド**は `KNOWN_BACKENDS` に事前設定されています:

```typescript
createKnownBackend("obsidian"); // → localhost:27123 を参照する GenericMemoryBackend
createKnownBackend("notion"); // → api.notion.com/v1 を参照する GenericMemoryBackend
```

#### 組み込みバックエンド

##### SQLiteBackend (`sqliteBackend.ts`)

デフォルトのプライマリバックエンドです。`src/lib/memory/store.ts` を使用して、既存の SQLite ベースのメモリストアをラップします。起動時に自動的に登録されます。

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

既存の Obsidian 統合（`src/lib/memory/obsidianBackend.ts`）をラップします。Obsidian Local REST API を介して Obsidian Vault に接続します。

### 設定

メモリバックエンドの設定はアプリの設定テーブルに保存され、`src/lib/memory/settings.ts` を介して管理されます:

| 設定                       | 環境変数/設定キー        | デフォルト | 説明                                          |
| -------------------------- | ------------------------ | ---------- | --------------------------------------------- |
| プライマリバックエンド     | `memoryPrimaryBackend`   | `"sqlite"` | プライマリバックエンドの ID                   |
| フォールバックバックエンド | `memoryFallbackBackends` | `[]`       | 順序付けされたフォールバックバックエンドの ID |
| バックエンド設定           | `memoryBackendConfigs`   | `{}`       | バックエンドごとの設定オーバーライド          |

設定は `normalizeMemorySettings()` によって正規化され、`getMemorySettings()` でキャッシュされます。

### 初期化フロー

```
アプリのブートストラップ
  → index.ts のインポート（副作用）: SQLiteBackend を登録
  → アプリのライフサイクルから initMemoryBackends() を呼び出し:
      1. 設定を読み込む（getMemorySettings）
      2. プライマリとフォールバックを設定
      3. すべてのバックエンドを初期化（ヘルスチェック）
      4. リクエストを処理する準備が完了
```

### 新しいバックエンドの追加

1. `src/lib/memory/<name>Backend.ts` で **`MemoryBackend` を実装**
2. `src/lib/memory/index.ts` から **エクスポート**
3. 起動時に `memoryManager.register(yourBackend)` で **登録**
4. 設定を介して **構成**: `memoryPrimaryBackend` をバックエンド ID に設定
5. `src/lib/memory/__tests__/generic-backend.test.ts` を参考に **テスト**

#### 例: Brain バックエンド

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### 検証

#### ユニットテスト

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

期待される出力: 以下を網羅する **35 件のテストがすべて成功**

- コンストラクター（2）
- ヘルスチェック（4）— 成功、500 エラー、ネットワークエラー、レイテンシー
- 初期化（2）— 成功、失敗
- 作成（2）— デフォルトエンドポイント、カスタムエンドポイント
- 取得（4）— 成功、404 → null、404 以外では例外をスロー、カスタムパスパラメーター
- 更新（2）— 成功、404 → false
- 削除（2）— 成功、404 → false
- 一覧（2）— クエリパラメーター、カスタムパラメーター名
- 検索（3）— クエリパラメーター、カスタムエンドポイント、オプションのシリアル化
- 認証ヘッダー（2）— Bearer トークン、カスタムヘッダー
- ファクトリー（1）

#### 型チェック

```bash
npm run typecheck:core
```

期待される結果: **エラー 0 件**。
