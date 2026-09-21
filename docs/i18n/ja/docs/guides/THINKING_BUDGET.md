# Thinking Budget (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **ダッシュボード:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **ソース:** `open-sse/services/thinkingBudget.ts`

Thinking Budget は、プロバイダーへ送信する際に OmniRoute が**クライアントの思考／推論パラメーターを書き換えるかどうか**を制御します。圧縮、ルーティング、プロンプトキャッシュを有効または無効にする機能では**ありません**。

## モード

| モード                          | OmniRoute の動作                                                                                                                    | 使用する場面                                                                                                                                                                                |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`**（デフォルト） | クライアントのフィールド（`reasoning`、`reasoning_effort`、Claude の `thinking`、Gemini の `thinking_config` など）を変更しません。 | **Codex / Desktop / effort と推論要約をクライアント側で制御する必要があるすべてのクライアント。** クライアントが `reasoning.summary` を要求する場合に、思考パネルを表示するために必須です。 |
| **`auto`**                      | アップストリームへ送信する前に、リクエスト本文から思考／推論フィールドを**すべて削除**します。                                      | 意図的に**プロバイダー**にデフォルト値を決定させ、クライアント側で思考を制御する必要が**ない**場合にのみ使用します。「思考を自動表示する」という意味では**ありません**。                    |
| **`custom`**                    | すべてのリクエストを固定の思考トークン予算で上書きします。                                                                          | すべてのトラフィックに対して思考トークンの上限を厳密に設定する場合。                                                                                                                        |
| **`adaptive`**                  | メッセージ数、ツール、プロンプト長に基づいて、基本 effort から予算を調整します。                                                    | クライアントの意図を完全には削除せずに、トークンを柔軟に制御する場合。                                                                                                                      |

### `auto` が削除するもの

モードが `auto` の場合、`stripThinkingConfig()` は以下を含むフィールドを削除します。

- OpenAI / Responses: `reasoning`、`reasoning_effort`
- Claude: `thinking`、および存在する場合は `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

クライアント（例: Codex Desktop）が `reasoning: { effort: "ultra", summary: "detailed" }` を送信した場合、**auto はそのオブジェクトを削除します**。アップストリームでは引き続き一部の推論トークンが課金される可能性がありますが、多くの場合、返される推論項目は**空、または暗号化されたもののみ**となるため、UI には有用な思考ストリームが表示されません。

## この機能に**該当しないもの**

| 機能                                     | 関係                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **圧縮**（Caveman、RTK、stacked など）   | 別のパイプラインです。すべての thinking-budget モードで動作します。                                                                   |
| **プロンプト／セマンティックキャッシュ** | 別機能です。thinking-budget モードの影響を受けません。                                                                                |
| **コンボルーティング／フォールバック**   | 別機能です。影響を受けません。                                                                                                        |
| **API キーのトークン制限／コスト予算**   | 別機能です。影響を受けません。                                                                                                        |
| **推論リプレイキャッシュ**               | 厳格なプロバイダー（DeepSeek、Kimi、Qwen-thinking など）向けのマルチターン再挿入機能です。Desktop の「思考を表示」とは異なります。    |
| **`encrypted_content` の復号**           | **不可能です。** OpenAI/Codex の非公開推論 BLOB は不透明です。OmniRoute がそれらを復号することはありません（#7095 / #7176 / #7304）。 |

## 思考内容の表示（Codex / Responses クライアント）

クライアントで思考テキストを表示するには、次の条件を**すべて**満たす必要があります。

1. Thinking Budget モードが **`passthrough`** であること（または、使用する経路で summary リクエストが十分に維持される custom/adaptive）。
2. クライアントが summary を要求していること。例: Codex の `model_reasoning_summary = "detailed"` / `auto`（`none` ではない）。
3. アップストリームが実際に `response.reasoning_summary_text.*` をストリーミングすること（または item 上の `reasoning.summary` が空でないこと）。

「暗号化された非公開の推論」しか取得できない場合は、次のいずれかです。

- モードが **`auto`** だった（クライアントのリクエストが除去された）、または
- アップストリームが summary テキストなしで `encrypted_content` を返した（プロバイダー側の制限。OmniRoute が表示できるのはプレースホルダーのみで、平文は表示できません）。

## API の例

```bash
# 読み取り
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Codex / Desktop で思考内容を表示するための推奨設定
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

スキーマ（`updateThinkingBudgetSchema`）: `mode` ∈ `passthrough|auto|custom|adaptive`。任意項目: `customBudget`、`effortLevel`、`baseBudget`、`complexityMultiplier`。

### 永続化 / 再起動

値は設定キー `thinkingBudget` に保存され、プロセス起動時にハイドレートされます（`hydrateThinkingBudgetConfig`）。DB 経由または一部の非 API 経路で変更した後は、メモリ内のシングルトンをディスク上の内容と一致させるため、**OmniRoute プロセスを再起動**してください。

## 運用者向けチェックリスト

- [ ] Codex / Desktop ユーザー: モード = **passthrough**
- [ ] 思考内容を除去するのではなく、**メッセージ**のトークンを節約したい場合は圧縮を有効にしておく
- [ ] `auto` によって「より多くの思考内容が表示される」と期待しない
- [ ] 暗号化された summary しか返されないのは**プロバイダー**側の動作であり、passthrough でも復号できない

## 関連ドキュメント

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — マルチターンの `reasoning_content` キャッシュ
- [USER_GUIDE.md](./USER_GUIDE.md) — Settings ダッシュボードのタブ
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 設定エンドポイント
