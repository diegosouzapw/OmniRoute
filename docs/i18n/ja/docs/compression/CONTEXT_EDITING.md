# Delegated Context Editing (Anthropic) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

委譲型の**コンテキスト編集**は、Claude 専用のコンテキスト管理機能です。OmniRoute のローカル圧縮エンジン（Caveman、RTK、LLMLingua、スタックパイプライン）は、リクエスト本文がプロキシを離れる_前_にそれを書き換えますが、コンテキスト編集では、**プロバイダー**に対して、そのプロバイダー自身が保持しているコンテキストウィンドウから古いツール使用／ツール結果ブロックを削除するよう要求します。OmniRoute は本文パラメーター（`context_management.edits[]`）を付加するだけであり、実際の削除は Claude が自身のトークナイザーに基づいて実行します。

これは本質的に委譲型の機能です。他のプロバイダーはこのパラメーターを拒否するため、OmniRoute は適用対象を Claude および Claude Code 互換リレーに厳密に限定しています。

信頼できる情報源：`open-sse/config/contextEditing.ts`（ストラテジー ID、本文への注入、テレメトリの抽出）、`open-sse/executors/base.ts`（注入ゲートおよび 400 フォールバック）、`open-sse/services/compression/types.ts`（設定形式およびデフォルト）。

## `clear_tool_uses` の動作

OmniRoute は、送信する Anthropic Messages の本文に単一の編集を注入します。

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — 日付付きの Anthropic ストラテジー ID（`CLEAR_TOOL_USES_STRATEGY`）。
- `trigger.value: 100000` — リクエストの入力トークン数がこのしきい値を超えると、Claude は古いツール使用／結果のペアの削除を開始します（`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`、Anthropic のデフォルト）。
- `keep.value: 3` — 直近 N 個のツール使用／結果のペアは変更されずに保持されます（`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`）。

このベータ機能は `anthropic-beta: context-management-2025-06-27` ヘッダーを介して通知されます。このヘッダーは OmniRoute が Claude へのリクエストですでに送信しています。

注入は `applyContextEditingToBody()` によって実行され、**冪等**です。`clear_tool_uses` 編集が本文にすでに存在する場合（以前の呼び出しで追加された場合、またはクライアントから指定された場合）、本文はそのまま維持されます。`clear_thinking_20251015` 編集も存在する場合、Anthropic では `edits[]` 配列内で `clear_thinking` が `clear_tool_uses` より前に配置されている必要があるため、OmniRoute は `clear_thinking` 編集が先頭に来るよう安定ソートを行います。

## コンボごとの有効化トグル

コンテキスト編集は**デフォルトでは無効**であり、オプトイン方式です。トグルは圧縮設定に含まれる単一のブール値です。

- 設定キー：`contextEditing.enabled`（camelCase。`context_editing` / `context-editing` では**ありません**）。
- 型：`open-sse/services/compression/types.ts` の `ContextEditingConfig { enabled: boolean }`。
- デフォルト：`DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`。
- Zod スキーマ：`src/shared/validation/compressionConfigSchemas.ts` の `contextEditingConfigSchema`。
- ストレージ：他の圧縮設定とともに永続化されます（`src/lib/db/compression.ts` で正規化）。

ダッシュボードでは、このトグルは圧縮ハブ（`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`）に配置されており、`saveSettings()` を介して `{ contextEditing: { enabled: … } }` を書き戻します。これは圧縮設定オブジェクトに含まれているため、完全に独立した設定画面としてではなく、コンボごとの圧縮プロファイルと組み合わせて機能します。設定に含まれるのはオン／オフフラグのみであり、すべてのしきい値（`trigger`、`keep`）には上記の定数が使用されます。

## Claude のみに限定するゲート

インジェクションは、正規の Claude または Claude Code 互換リレーに対してのみ行われます。
`open-sse/executors/base.ts` のゲートは次のとおりです。

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — 正規の Anthropic キー/OAuth。
- `isClaudeCodeCompatible(this.provider)` — プロバイダー ID が `anthropic-compatible-cc-` プレフィックスで始まるリレー（Claude Code 互換性を明示しているため、ベータ機能を受け入れる可能性が最も高いリレー）。`open-sse/services/provider.ts` を参照してください。

意図的に**除外**されるもの：

- `claude-web` — `create_conversation_params` リクエスト形式を使用し、`context_management` を受け取ることがないブラウザーリレー。
- 汎用の `anthropic-compatible-*` リレー（`-cc-` プレフィックスなし）— ベータ機能のサポート状況が不明なサードパーティーエンドポイント。

Claude 以外のプロバイダーには、トグルがオンの場合でも `context_management` パラメーターは送信されません。

## 400 フォールバック / リレーの対象範囲

Claude 互換リレーがベータ機能への対応を明示していても、`context_management` パラメーターを HTTP 400 で拒否する場合があります。リクエストを失敗させるのではなく適切に縮退させるため、executor はそのパラメーターを削除し、同じ URL に対して**一度だけ**再試行します。

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

動作：

1. コンテキスト編集が有効で、かつ body に実際に `context_management` が含まれている状態で `400` が発生した場合にのみ実行されます。
2. 一致しなかった場合の処理でも元のレスポンスをそのまま維持できるよう、400 の body は `clone()` を介して読み取られます。
3. エラーテキストは `/context[_-]management|context editing/i` に一致する必要があります。無関係な 400（例：`max_tokens must be >= 1`）ではフォールバックは実行されず、元のエラーがそのまま伝播します。
4. 一致した場合は `contextEditingDisabled = true` を設定し（再試行先またはフォールバック先の URL 用に新しい `transformedBody` が後で構築された場合の再インジェクションを抑止）、`context_management` を削除し、Claude / Claude Code 互換リレー向けに body を再署名（`signRequestBody`）してから、同じ URL に対して一度だけ再試行します。

正規の Claude ではベータ機能が `ANTHROPIC_BETA_BASE` に含まれているため、このフォールバック処理には入りません。

## `applied_edits` テレメトリ

Claude のレスポンス後、OmniRoute はプロバイダーが実際にクリアしたコンテキスト量を記録します。これはストリーミング**されません**。非ストリーミングのレスポンス body からベストエフォートで抽出され、レスポンスには一切影響しません（テレメトリの失敗は無視されます）。

- 抽出：`open-sse/config/contextEditing.ts` の `extractContextEditingTelemetry(responseBody)`。
  レスポンス形式の違いに備え、防御的に以下の 3 箇所で `applied_edits` を確認します。
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- 各エントリから読み取る編集単位のフィールド：`cleared_input_tokens` と `cleared_tool_uses`（Anthropic ネイティブの snake_case）。フォールバックとして camelCase の `clearedInputTokens` / `clearedToolUses` も使用します。
- `applied_edits` 配列が見つからない場合、または実際には何もクリアされていない場合は `null` を返します。

記録データの形式は `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }` です。記録は `open-sse/handlers/chatCore.ts` で（`provider === "claude"` の場合に限定して）、`recordContextEditingTelemetry()`（`src/lib/db/compressionAnalytics.ts`）を介して行われ、次のタグが付いた圧縮分析行が書き込まれます。

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = クリアされた入力トークン数
- `request_id` の末尾に `::context-editing` を付加

そのため、委任されたクリア処理はローカルエンジンと並んで圧縮分析に表示され、`context-editing` エンジンラベルの下で、RTK/Caveman/LLMLingua による削減量と区別できます。

## ローカル圧縮エンジンとの関係

| 項目             | ローカルエンジン（Caveman / RTK / LLMLingua / stacked） | 委譲型 Context Editing                               |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| 実行場所         | リクエストがプロキシを離れる前の OmniRoute 内           | プロバイダー（Claude）のサーバー側                   |
| 編集対象         | プロンプト / コンテキスト / ツール結果のテキスト        | 古いツール使用 / ツール結果ブロック                  |
| 対象プロバイダー | すべてのプロバイダー                                    | `claude` + `anthropic-compatible-cc-*` のみ          |
| 切り替え         | 圧縮モード設定                                          | `contextEditing.enabled`                             |
| 障害時の動作     | フェイルオープン（元のテキスト）                        | 400 フォールバック：パラメーターを削除し、1 回再試行 |
| 削減量テレメトリ | `engine: <engine id>`                                   | `engine: "context-editing"`                          |

この 2 つは相互補完的です。ローカルエンジンは OmniRoute が送信するバイト列を圧縮し、Context Editing は
Claude がターンをまたいで進行中のコンテキストを削減できるようにします。両方を同時に有効化できます。

## 関連項目

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — エンジンレジストリとローカル圧縮
  エンジン
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — コマンド / ツール出力の圧縮
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP の説明の圧縮と
  ツール数の削減
- ソース：`open-sse/config/contextEditing.ts`、`open-sse/executors/base.ts`、
  `open-sse/services/compression/types.ts`、`src/lib/db/compressionAnalytics.ts`
