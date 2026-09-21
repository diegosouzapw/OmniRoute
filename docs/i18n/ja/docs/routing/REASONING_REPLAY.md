# Reasoning Replay Cache (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **信頼できる情報源:** `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、思考モードのモデルによって生成されたアシスタントの `reasoning_content` を取得し、アップストリームプロバイダーが必要とする場合、複数ターンのリクエストで透過的に再利用します。これにより、クライアントの会話履歴に前のターンの推論が含まれていない場合に、厳格なプロバイダーが返す HTTP 400 エラーを回避できます。

## この機能が必要な理由

一部の思考モードプロバイダーは、**直前のアシスタントメッセージに元の `reasoning_content` が含まれていない限り**、後続ターンを拒否します。アップストリームは、次のようなメッセージとともに 400 を返します。

```
パラメーターが正しくありません: 思考モードの reasoning_content を API に返す必要があります。
```

しかし、一般的なクライアント（Cursor、Cline、Roo Code、OpenAI SDK）は、再送する履歴から `reasoning_content` を削除します。OmniRoute はサーバー側キャッシュからこれを復元し、アップストリームから見たリクエストの整合性を保ちます。Issue #1628 でメモリと SQLite を組み合わせたハイブリッド永続化が導入され、プロセスを再起動してもキャッシュが保持されるようになりました。

## アーキテクチャ

```
ターン N（アシスタントが生成）:
  → レスポンスに reasoning_content + tool_calls が含まれる
  → requiresReasoningReplay(provider, model) の場合: cacheReasoningFromAssistantMessage()
      すべての tool_call.id をキーとして（メモリ + DB）に書き込む
  → レスポンスをクライアントに転送する（クライアントは推論を保持する場合もあれば、保持しない場合もある）

ターン N+1（クライアントが後続リクエストを送信）:
  → トランスレーターが検出: requiresReasoningReplay(provider, model) === true
  → tool_calls があり、reasoning_content がない各アシスタントメッセージについて:
      lookupReasoning(toolCalls[0].id) → メモリ → DB
      ヒット  → msg.reasoning_content = cached; recordReplay()
      ミス → msg.reasoning_content = ""（古い DeepSeek 向けの従来のフォールバック）
  → アップストリームから見た履歴の整合性が保たれる → 400 が発生しない
```

取得処理は `open-sse/handlers/chatCore.ts` 内の 2 か所（2 つの `cacheReasoningFromAssistantMessage` 呼び出し箇所）で行われます。再利用処理は `open-sse/translator/index.ts` 内で、スキーマの型強制後、ディスパッチ前に行われます。

## ストレージ — メモリ + SQLite のハイブリッド

ホットパスでは、クラッシュからの復旧とダッシュボードでの可視化のために SQLite テーブルでバックアップされた、インメモリの `Map`（作成日時に基づく LRU）を使用します。

| レイヤー | 実装                                             | 目的                                     |
| -------- | ------------------------------------------------ | ---------------------------------------- |
| メモリ   | `open-sse/services/reasoningCache.ts` 内の `Map` | 高速な検索、200 件で最も古い項目を削除   |
| DB       | `reasoning_cache` テーブル（`src/lib/db/`）      | 再起動後も永続化し、統計情報の基盤となる |

書き込みは両方に対して行われます。読み取りでは最初にメモリを参照し、その後 DB にフォールバックします（DB で見つかった項目はメモリへ再格納されます）。DB 障害は致命的ではありません。インメモリキャッシュは引き続きホットパスを処理します。

**デフォルト:**

- TTL: `2h`（`TTL_MS = 2 * 60 * 60 * 1000`）
- メモリ内の最大エントリ数: `200`（`MAX_MEMORY_ENTRIES`）
- エビクション: `createdAt` が最も古いものから

## データベーススキーマ

マイグレーション: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

インデックス: `expires_at`、`provider`、`model`、`created_at`。`expires_at` は Unix エポック秒として保存されます。SELECT レイヤーでは、`EXPIRES_AT_EPOCH_SQL` を使用して従来のテキスト値を正規化します。

## プロバイダー / モデルの検出

`requiresReasoningReplay(provider, model)` が `true` を返す場合、リプレイが有効になります。この関数は `open-sse/services/reasoningCache.ts` 内の2つのリストを確認します。

**プロバイダー ID（完全一致、大文字・小文字を区別しない）:**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**モデルの正規表現パターン（大文字・小文字を区別しない）:**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` および `/deepseek[-/]?v4[-.]pro/i`（V4 Flash / Pro、任意の `-free` サフィックス）
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

新しい厳密なプロバイダーまたはモデルを追加するには、これらのリストのいずれかに追記し、リプレイの注入を検証するユニットテストを作成します。PR の説明には、変更の契機となったアップストリームの正確な 400 エラー文字列を記載する必要があります。

## REST API

キャッシュは `src/app/api/cache/reasoning/route.ts` 配下で2つのエンドポイントを公開します。どちらも管理認証（`@/shared/utils/apiAuth` の `isAuthenticated`）が必要です。

| メソッド | エンドポイント                                            | 説明                                                     |
| -------- | --------------------------------------------------------- | -------------------------------------------------------- |
| GET      | `/api/cache/reasoning`                                    | 統計情報 + ページネーションされたエントリ                |
| GET      | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | フィルタリングされた一覧（`limit` は `[1, 200]` に制限） |
| DELETE   | `/api/cache/reasoning`                                    | すべて（メモリ + DB）を消去し、ヒット/ミス回数をリセット |
| DELETE   | `/api/cache/reasoning?provider=deepseek`                  | 1つのプロバイダーのエントリのみを消去                    |
| DELETE   | `/api/cache/reasoning?toolCallId=call_abc`                | 単一のエントリを削除                                     |

**GET レスポンスの形式:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## 運用上の注意事項

- **クリーンアップ:** `cleanupReasoningCache()` は期限切れのメモリエントリを削除し、`DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` を実行します。ヘルスチェックワーカーがこれを定期的に呼び出します。
- **クラッシュからの復旧:** 再起動後、メモリは空になりますが、DB には期限切れでないエントリが残ります。特定の `tool_call_id` に対する最初の検索は DB ヒットとなり、以降の検索はメモリヒットになります。
- **推論がなければキャッシュもなし:** アシスタントメッセージに `reasoning_content` / `reasoning` フィールドがない場合、`cacheReasoningFromAssistantMessage` は `0` を返すため、非思考レスポンスではコストが発生しません。
- **書き込みも制御対象:** `chatCore.ts` 内の両方の呼び出し箇所（非ストリーミングおよびストリーミング）は、`requiresReasoningReplay(provider, model)` が `true` の場合にのみ `cacheReasoningFromAssistantMessage()` を呼び出します。これは読み取り側が確認するものと同じ述語です。リプレイ対象のプロバイダーを一度も使用しない環境では、推論を含むすべてのレスポンスに対する書き込み、インデックス更新、および try/catch のコストが発生しなくなります。
- **非厳密プロバイダー:** `requiresReasoningReplay` が `false` で、ターゲット形式が OpenAI の場合、トランスレーターは送信メッセージから `reasoning_content` フィールドを**削除**します。OpenAI Chat Completions はこのフィールドを受け付けません。

## 関連項目

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — サーキットブレーカー、クールダウン、モデルのロックアウト
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — アップストリームの 400 エラーの診断
- ソース: `src/lib/db/reasoningCache.ts`、`open-sse/services/reasoningCache.ts`、`open-sse/translator/index.ts`
- マイグレーション: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API ルート: `src/app/api/cache/reasoning/route.ts`
- 元の Issue: #1628
