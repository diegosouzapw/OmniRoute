# OpenCode Integration (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **ステータス:** 一般提供。
> **対象読者:** OpenCode を OmniRoute デプロイメントに接続する運用担当者。
> **信頼できる唯一の情報源（設定スキーマ）:** `src/shared/services/opencodeConfig.ts`
> **信頼できる唯一の情報源（npm package）:** `@omniroute/opencode-provider/`（公開可能なワークスペース）

[OpenCode](https://opencode.ai) は、エージェント型の CLI/デスクトップ AI クライアントです。プロバイダーカタログを `~/.config/opencode/opencode.json`（または `opencode.jsonc`）から読み込み、`https://opencode.ai/config.json` のスキーマに従います。OmniRoute は、それらのプロバイダーの 1 つとして OpenCode に公開されます。すべてのリクエストは OmniRoute の標準的な OpenAI 互換 `/v1` インターフェースを経由するため、OpenCode は Auto-Combo ルーティング、サーキットブレーカー、キーポリシー、可観測性などの恩恵を自動的に受けられます。

サポートされている統合方法は **2 つ**あります。いずれか 1 つを選択してください。どちらも同じ設定を生成します。

---

## 方法 1 — CLI ジェネレーター（npm install 不要）

エンドユーザーに推奨される方法です。OmniRoute に同梱されています。既存の `opencode.json` に直接書き込みます。

```bash
# OmniRoute のインストール後（npm i -g @omniroute/cli またはローカルクローン）
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

内部では CLI が `mergeOpenCodeConfigText()`（`src/shared/services/opencodeConfig.ts:104`）を呼び出すため、既存の `opencode.json` に含まれる他のプロバイダーやコメントは保持されます。OmniRoute のエントリはアトミックに追加または置換されます。

生成されるファイル（デフォルトのモデルカタログ）:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## 方法 2 — npm package `@omniroute/opencode-provider`

Node/TS から設定をスクリプトで生成する場合（CI パイプライン、モノレポ、カスタムインストーラーフロー）に推奨されます。

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // オプション: OpenCode に公開するモデルカタログを上書き
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

既存ファイルに対して非破壊的なマージを行うには、`opencodeConfig.ts` の `mergeOpenCodeConfigText()` を再現するか、CLI ジェネレーターを呼び出してください。

完全な API については、[package README](../../@omniroute/opencode-provider/README.md) を参照してください。

---

## ランタイムが実際に行うこと

どちらの方法でも、同じ `provider.omniroute.npm: "@ai-sdk/openai-compatible"` が生成されます。ランタイムでは、OpenCode が `@ai-sdk/openai-compatible`（OpenCode の推移的依存関係としてすでに含まれています）を読み込み、`baseURL` と `apiKey` を使用して設定します。その後のフローは次のとおりです。

```
OpenCode UI/エージェント
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          （OmniRoute の OpenAI インターフェース）
         → OmniRoute /v1/chat/completions ハンドラー  （open-sse/handlers/chatCore.ts）
            → コンボルーティング / Auto-Combo / エグゼキューター
               → アップストリームプロバイダー
```

プラグインが HTTP を直接扱うことはありません。設定を出力するだけです。

---

## モデルカタログのデフォルト

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

`models: [...]` で上書きできます。追加の推奨項目：

- `"auto"` — OmniRoute のゼロコンフィグルーターである [Auto-Combo](../routing/AUTO-COMBO.md) を表示します。カタログをハードコードすることなく、OpenCode が「利用可能な最適なモデル」を選択できるようにします。
- `"<combo-name>"` — ダッシュボードで定義した任意のコンボ。OmniRoute が透過的に解決します。

---

## URL の正規化

このヘルパーは両方の形式を受け入れ、`/v1` を正確に1つだけ出力します：

| 入力                           | 出力（`options.baseURL`）   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

この重複排除は、古い設定で見られる**最も一般的な不具合**です。v3.8.0 より前の `opencode.json` が `/v1/v1/...` を指している場合は、ジェネレーターを再実行するか、`createOmniRouteProvider` を再度呼び出してください。

---

## 認証モード

| OmniRoute の設定                                    | 推奨される `apiKey` の値                                        |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `REQUIRE_API_KEY=false`（ローカル環境のデフォルト） | `sk_omniroute`（リテラルのプレースホルダー）                    |
| `REQUIRE_API_KEY=true`                              | ダッシュボード → API Keys で取得した実際のユーザー別 API キー。 |

`x-api-key` + `anthropic-version` を送信する Anthropic 形式のクライアントの場合、OmniRoute の `extractApiKey` は `x-api-key` のキーも認識します。OpenCode は OpenAI のインターフェースを使用するため、常に `Authorization: Bearer ${apiKey}` を送信します。ここでは Anthropic 固有の処理は適用されません。

---

## トラブルシューティング

| 症状                                                          | 原因                                                                                   | 修正方法                                                                                                              |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/v1/v1/` を含む URL へのすべてのリクエストで `404`           | `/v1` を二重に付加していた v3.8 より前のプラグインの古い設定。                         | 方法 1 または 2 で再生成します。                                                                                      |
| `401 Invalid API key`                                         | OmniRoute で `REQUIRE_API_KEY=true` が設定されており、キーが不明。                     | ダッシュボードでキーを作成するか、`REQUIRE_API_KEY=false`（ローカル環境のみ）を設定して `sk_omniroute` を使用します。 |
| OpenCode UI のモデルリストが空                                | 4つのデフォルトモデルがすべて OmniRoute のプロバイダー表示設定で非表示になっています。 | 有効にしたモデルを表示するには、`models: ["auto", ...]` を渡します。                                                  |
| OpenCode で `cannot read property 'models'` という 500 エラー | 古い OpenCode（< 0.1.x）はインラインの `models` を受け付けませんでした。               | v1 スキーマ（`opencode.ai/config.json`）に準拠するバージョンへ OpenCode をアップグレードします。                      |

---

## 関連項目

- [API リファレンス](../reference/API_REFERENCE.md) — OmniRoute REST API の全仕様
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` の意味
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- ソース: `src/shared/services/opencodeConfig.ts`、`src/lib/cli-helper/config-generator/opencode.ts`、`@omniroute/opencode-provider/src/index.ts`
