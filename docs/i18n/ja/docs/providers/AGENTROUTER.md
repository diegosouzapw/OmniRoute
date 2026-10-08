# AgentRouter Setup Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) は、Anthropic 互換のリレーサービスであり、Claude をはじめとする各種モデルを、多くの場合 Anthropic API から直接利用するよりも低価格で再販しています。公式 Claude Code クライアント向けの `ANTHROPIC_BASE_URL` をそのまま置き換えられるように設計されているため、Claude Code のワイヤーイメージ（特定の User-Agent、`anthropic-beta` フラグ、Stainless SDK ヘッダーなど）に一致するトラフィックのみを受け付けます。

## クイックスタート — ネイティブの `agentrouter` プロバイダーを使用する（推奨）

ほとんどのユーザーには、**特別な設定は必要ありません**。OmniRoute には、Claude Code の完全なワイヤーイメージがあらかじめ組み込まれた `agentrouter` プロバイダーが付属しています（`open-sse/config/providerRegistry.ts` → `agentrouter` を参照）。使用するには、次の手順を実行します。

1. **ダッシュボード → プロバイダー → プロバイダーを追加**を開きます。
2. リストから **AgentRouter** を選択します。
3. `sk-...` API キーを貼り付けて保存します。

これだけです。環境変数やカスタムプロバイダータイプは必要ありません。組み込みモデルには、`claude-opus-4-6`、`claude-haiku-4-5-20251001`、`glm-5.1`、`deepseek-v3.2` が含まれます。

このガイドの残りの部分では、**高度な方法**である `anthropic-compatible-cc-*` プロバイダータイプの使用方法を説明します。ワイヤーイメージをより細かく制御する必要がある場合に使用してください。たとえば、ネイティブのプロバイダーレジストリにまだ登録されていない AgentRouter 形式のリレーへ接続する場合や、ベース URL、チャットパス、またはヘッダーセットを上書きする場合です。

---

## 高度な設定：Claude Code 互換プロバイダータイプ経由で接続する

OmniRoute は、正しいワイヤーイメージで Anthropic Messages API と通信する **Claude Code 互換**プロバイダータイプ（`anthropic-compatible-cc-*`）を通じて、AgentRouter（および同様のリレー）もサポートしています。`https://agentrouter.org` を指定した汎用の `openai-compatible-chat` プロバイダーは、**動作しません**。Claude Code のように見えないリクエストは、上流の WAF によって拒否されます。

---

## 前提条件

- AgentRouter のアカウントと API キー。新規登録者は、プロジェクトの [README](../README.md) にあるアフィリエイトリンク経由で無料クレジットを受け取れます。
- `ENABLE_CC_COMPATIBLE_PROVIDER` 機能フラグを有効にして OmniRoute が実行されていること（以下を参照）。

## 1. CC 互換プロバイダータイプを有効にする

Claude Code 互換プロバイダータイプは、公式 Claude Code クライアントを忠実に模倣したトラフィックを送信するため、機能フラグによって制限されています。OmniRoute を起動する前に、次の環境変数を設定して有効にします。

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker の例：

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

再起動すると、ダッシュボードには既存の OpenAI 互換および Anthropic 互換のフローに加えて、**Claude Code 互換を追加**オプションが表示されます。

## 2. ダッシュボードでプロバイダーを作成する

1. **ダッシュボード → プロバイダー → プロバイダーを追加**を開きます。
2. **Claude Code 互換を追加**を選択します（上記のフラグが設定されている場合にのみ表示されます）。
3. 各フィールドに入力します。

| フィールド     | 値                                                                      |
| -------------- | ----------------------------------------------------------------------- |
| 名前           | `AgentRouter`（または任意のラベル）                                     |
| プレフィックス | `agentrouter`（ログとダッシュボードに表示される分かりやすいエイリアス） |
| ベース URL     | `https://agentrouter.org`                                               |
| チャットパス   | `/v1/messages?beta=true`（デフォルト — そのままにします）               |

> 正規のモデル識別子では、引き続き完全なプロバイダーノード ID
> （`anthropic-compatible-cc-{uuid}/{model}`）を使用します。**プレフィックス**は、ログ出力を分かりやすくするために `src/lib/usage/callLogs.ts` によって解決される表示用エイリアスにすぎません。

4. （任意）**検証**フィールドに API キーを貼り付け、**確認**をクリックして、保存前に接続を確認します。
5. **追加**をクリックします。

作成したら、プロバイダーを開き、AgentRouter API キー（`sk-...`）を使用して**接続**を追加します。接続の `test_status` が `active` に変わるはずです。

## 3. コンボ経由または直接使用する

プロバイダーのプレフィックスを名前空間として使用し、モデルを参照します。

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

正規モデル ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` も使用できます。
これはデータベースおよびコンボ設定に表示される ID です。

または、他のプロバイダーと同様に、ルーティング、フォールバック、クォータ管理を行うためのコンボに追加します。

---

## ワイヤーイメージの詳細

参考として、cc-compatible ブリッジは上流への各リクエストで以下を送信します
（`open-sse/services/claudeCodeCompatible.ts` を参照）。

| ヘッダー                                    | 値                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Authorization`                             | `Bearer <api-key>`                                                                                     |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                               |
| `anthropic-version`                         | `2023-06-01`                                                                                           |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                               |
| 接続単位の redact-thinking ベータ切り替え   | 思考ストリームの編集を明示的に要求する上流に対して `redact-thinking-2026-02-12` を追加します           |
| 接続単位の要約思考切り替え                  | 表示モードがまだ設定されていない CC Compatible の思考リクエストに `display: "summarized"` を追加します |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                 |
| `x-app`                                     | `cli`                                                                                                  |
| `X-Stainless-*`                             | 各種 Stainless SDK ヘッダー（言語、パッケージバージョン、OS、アーキテクチャなど）                      |

これにより、リクエストが上流の WAF / クライアント許可リストを通過できるようになります。

---

## トラブルシューティング

**`{"error":{"message":"unauthorized client detected, ..."}}`** — リクエストが
Claude Code のワイヤーイメージと一致していません。これは、プロバイダーが
`anthropic-compatible-cc` ではなく `openai-compatible-chat` として設定されている場合や、
起動時に `ENABLE_CC_COMPATIBLE_PROVIDER=true` フラグが設定されていなかった場合に発生します。

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
「無効なトークン」。ワイヤーイメージは正しいものの、API キーが拒否されています。
AgentRouter ダッシュボードで新しいキーを生成し、接続を更新してください。

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter のモデレーションフックがリクエスト内容を拒否したか、
キーのプランで要求されたモデルの使用が許可されていません。別のプロンプトまたはモデルを試してください。
無害なプロンプトが継続的にブロックされる場合は、AgentRouter サポートにお問い合わせください。

**特定のモデルでのみ発生する `[400]: content-blocked`** — ほとんどの AgentRouter プランでは、
一部のモデル（例: `claude-opus-4-6`）のみ使用できます。その他のモデル ID は、
キーが有効でも `unauthorized_client_error` を返します。ご利用のプランで対象となるモデルを
AgentRouter ダッシュボードで確認してください。

**omniroute ログの `Invalid JSON response from provider (reset after Ns)`** —
上流が JSON ではない本文（通常は WAF からの HTML エラーページ）を返しました。
これは通常、リクエストが AgentRouter バックエンドに到達しなかったことを意味します。
プロバイダー ID が `anthropic-compatible-cc-` で始まっていることを再確認してください
（末尾のダッシュに注意してください。`open-sse/services/claudeCodeCompatible.ts` の
`CLAUDE_CODE_COMPATIBLE_PREFIX` を参照）。また、機能フラグが有効になっていることも確認してください。

**AgentRouter プロバイダーがすでに存在するにもかかわらず、
`unauthorized client detected` / HTML エラーページが発生する** — **複数の**
AgentRouter プロバイダーがあり、リクエストが誤ったプロバイダーに送信されている可能性があります。
`agentrouter` プレフィックスを使用して、以前に手動作成した
`anthropic-compatible-*`（`cc` ではない）または `openai-compatible-chat-*` プロバイダーが
残っている場合、そのプロバイダーが `agentrouter/<model>` モデル ID を所有している可能性があります
（また、コンボがノード ID でそのプロバイダーを参照している場合もあります）。その結果、トラフィックは
正しいワイヤーイメージを標準で備えている組み込みの `agentrouter` プロバイダーではなく、
汎用的な User-Agent を送信して拒否されるプロバイダーへルーティングされます。モデルが実際にどこへ
解決されているかを omniroute ログで確認してください（`ROUTING` タグには
`agentrouter/<model> → <providerId>/<model>` と表示されます）。`<providerId>` が
`agentrouter` でない場合は、ネイティブプロバイダーに統合してください。コンボの参照先を
`agentrouter/<model>`（providerId `agentrouter`）に変更し、重複している compatible
プロバイダーを削除します。ネイティブプロバイダーでは、ワイヤーイメージの設定も
`customUserAgent` も必要ありません。

---

## 関連項目

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web プロバイダーの統合に関する注意事項
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — 無料枠プロバイダーの
  カタログ
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire イメージの実装
