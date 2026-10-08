# Extending the Compression Pipeline (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **要約**: OmniRoute の圧縮エンジンは**プラガブル**です。カスタムエンジンの登録、新しい言語向けの言語パックの提供、スタック型パイプラインの構成が可能です。このガイドでは、その方法を説明します。

**関連ガイド:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — パイプライン全体の概要
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — エンジンレジストリと組み込みエンジン
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK エンジンとカスタムフィルター
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ルールパック形式のリファレンス

---

## 概要

圧縮システムには、**3 つの拡張ポイント**があります。

| 拡張ポイント               | ユースケース                                                               | 難易度 |
| -------------------------- | -------------------------------------------------------------------------- | ------ |
| **カスタムエンジン**       | まったく新しい圧縮アルゴリズムを追加する（例: ドメイン固有の要約エンジン） | 上級   |
| **言語パック**             | 新しい自然言語のサポートを追加する（例: ヒンディー語、アラビア語）         | 中級   |
| **スタック型パイプライン** | 既存のエンジンを任意の順序で組み合わせる                                   | 初級   |

```
┌─────────────────────────────────────────────────────────────┐
│                       圧縮ストラテジー                         │
│                                                              │
│   入力メッセージ ──▶ getEffectiveMode() ──▶ モード            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   エンジン   エンジン   エンジン    連結       │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                                  圧縮済み出力                │
└─────────────────────────────────────────────────────────────┘

ストラテジーセレクターはモードベースです。各リクエストは 1 つのモードを選択します
(rtk / lite / standard / aggressive / ultra / stacked / off)。
複数のエンジンを順番に連結するのは、モード "stacked" のみです。
デフォルトの自動トリガーモードは "lite" です（3 段階の優先チェーンではありません）。
```

---

## カスタム圧縮エンジンの作成

エンジンインターフェイス（`open-sse/services/compression/engines/types.ts`）は、すべてのエンジンが満たす必要のある規約です。必須メソッドは 5 つあります。

### `CompressionEngine` インターフェイス

```ts
interface CompressionEngine {
  id: string; // 一意のエンジン ID
  name: string; // 表示名
  description: string; // 簡単な説明
  icon: string; // アイコン（絵文字または URL）
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // スタック型パイプラインで使用できるか
  stackPriority: number; // スタック型パイプラインでの順序（小さいほど先）
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### 最小構成の例: 空白圧縮エンジン

可能な限りシンプルなエンジンです。メッセージから余分な空白を削除します。

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // コードブロックのマーカーで分割し、その内部の空白を保持する
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // コードブロックは変更しない
      }
      return part.replace(/\n{3,}/g, "\n\n"); // 本文にのみ適用する
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk の後に実行する

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // メッセージ配列を走査する — 文字列コンテンツとマルチパートコンテンツの両方に対応
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // マルチパートコンテンツ：各パートを走査し、テキストパートのみを圧縮する
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // image_url、tool_use などは保持する
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// グローバルに登録する
registerCompressionEngine(whitespaceEngine);
````

### カスタムエンジンの配置場所

```
~/.omniroute/compression/engines/my-engine.ts    # ユーザーレベル
<project>/compression-engines/my-engine.ts        # プロジェクトレベル（起動時に読み込まれる）
```

または、プラグインからプログラムで読み込みます。

```ts
// プラグイン内
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // プラグイン SDK は onRequest / onResponse / onError フックを公開する。プラグイン
  // モジュールの読み込み時（または最初の onRequest 時）にエンジンを登録し、独自の
  // ティアダウン処理から登録を解除する。
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// ティアダウン時：
// unregisterCompressionEngine("my-engine");
```

### エンジンのテスト

プラグインまたは起動関数でエンジンを登録します。登録後、エンジンはその `id` を介して
ストラテジーセレクターで利用できるようになります。スタック化されたパイプライン内で構成し、統合をテストします。

---

## 言語パックの作成

Caveman スタイルの圧縮では、自然言語ごとのフィラー表現、婉曲表現、冗長なパターンを処理するために、**言語固有のルールパック**を使用します。OmniRoute には、`en`、`es`、`fr`、`de`、`ja`、`pt-BR` の **6 つの言語パック**が付属しています。

### パックの構造

言語パックは、`open-sse/services/compression/rules/<language>/` 以下に配置される **JSON ファイル**のディレクトリです。

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # 挨拶、婉曲表現、丁寧表現
│   ├── context.json         # コンテキストを削減するルール
│   ├── dedup.json           # 重複排除ルール
│   ├── structural.json      # 句読点、書式設定
│   └── ultra.json           # 積極的な圧縮ルール
├── es/  (同じ構造)
├── fr/  (同じ構造)
├── de/  (同じ構造)
├── ja/  (同じ構造)
└── pt-BR/ (同じ構造)
```

### ルールの構成

各ルールは次の形式です（`open-sse/services/compression/ruleLoader.ts` より）。

```ts
interface FileRule {
  name: string; // 人が読める名前（kebab-case）
  pattern: string; // JavaScript の正規表現パターン
  replacement?: string; // 一致した部分を置換する内容
  replacementMap?: Record<string, string>; // またはキー→置換文字列のマップ
  flags?: string; // 正規表現フラグ（通常は "gi"）
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // この強度未満ではスキップ
  description?: string; // ドキュメント
}
```

### 例：ヒンディー語のフィラールールを追加する

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'नमस्ते' のような丁寧な冒頭表現を削除"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "'actually' に相当するフィラー表現を削除"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "ヒンディー語の 'please' に相当する表現を削除"
    }
  ]
}
```

### 検証

ルールパックは、読み込み時に `_schema.json` に対して検証されます。構造が不正なパックは読み込みに失敗し、エラーがログに記録されます。

```
RULE_LOADER: パック "hi/filler.json" の検証に失敗しました:
  - rules.0.pattern: 無効な正規表現
  - rules.1.context: [all, user, system, assistant] のいずれかである必要があります
```

検証は、パックが読み込まれる際に（`_schema.json` に対して）自動的に実行されます。無効なパックは拒否され、上記のエラーがログに記録されます。パック検証専用の
`npm run` スクリプトはありません。パックを読み込み（たとえば、サーバーを起動するか、
圧縮処理を実行し）、ログを確認してください。

### カスタム言語パックの読み込み

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

または、認識される場所に配置します。

```
~/.omniroute/compression/rules/hi/filler.json  # ユーザーレベル
<project>/.compression/rules/hi/filler.json   # プロジェクトレベル
```

### 言語パックのベストプラクティス

1. **`filler` から始める** — 最も効果の高いルールです
2. **`minIntensity` を使用する** — 積極的なルールの適用を制御し、過度な圧縮を防ぎます
3. **テストケースを含める** — JSON に `tests[]` 配列を追加して動作を検証します
4. **順序が重要** — 前にあるルールから適用されるため、効果の高いルールを先に配置します
5. **`replacement` は慎重に設定する** — 通常は空文字列が適切です。新しい内容を追加してはいけません

### 翻訳戦略

ルールパックを新しい言語向けにローカライズする場合：

1. **ルール名を翻訳する** — デバッグ出力に表示されます
2. **正規表現パターンを調整する** — 単純な直訳では機能しないことがよくあります（単語境界が異なるため）
3. **実際の会話でテストする** — 実際の入力に対して安全に使用できるパックである必要があります
4. **文化的な慣習に合わせる** — たとえば、日本語のパックには英語よりも多くの敬語的フィラー表現があります

---

## スタックパイプライン

**スタックパイプライン**は複数のエンジンを順番に実行し、各エンジンの出力を次のエンジンへ渡します。これが `mode: stacked` の内部的な仕組みです。

### スタックの仕組み

```
入力（10,000トークン）
        │
        ▼
   ┌──────────┐
   │ エンジン │  優先度 10
   │ A        │  ──▶ 出力：6,000トークン（-40%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │ エンジン │  優先度 50
   │ B        │  ──▶ 出力：2,400トークン（-60%）
   └────┬─────┘
        ▼
   ┌──────────┐
   │ エンジン │  優先度 100
   │ C        │  ──▶ 出力：1,200トークン（-80%）
   └────┬─────┘
        │
        ▼
最終出力（1,200トークン、合計で約88%削減）
```

`mode: "stacked"` が選択されると、エンジンは `pipeline` 配列で指定された順序で逐次実行されます。
エンジンNの出力がエンジンN+1の入力になります。

### 圧縮モード

OmniRouteは、設定、自動トリガーのしきい値、およびコンボのオーバーライドに基づいて、**リクエストごとに1つのモード**を選択します。
利用可能なモードは `open-sse/services/compression/types.ts`（型 `CompressionMode`）で定義されています。

| モード       | エンジン             | ユースケース                                                                                                                                                                                              |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | なし                 | すべての圧縮を無効化                                                                                                                                                                                      |
| `rtk`        | RTKのみ              | コマンド出力が多いセッション（80%以上削減）                                                                                                                                                               |
| `lite`       | Liteのみ             | 保守的な圧縮（高速、安全）                                                                                                                                                                                |
| `standard`   | Caveman              | 言語パックを使用した文章圧縮                                                                                                                                                                              |
| `aggressive` | Caveman + Aggressive | 積極的な文章圧縮 + 積極的な最終パス                                                                                                                                                                       |
| `ultra`      | Ultra                | 最大限の圧縮（非可逆、最終手段）。`ultra.modelPath` が設定されている場合は、オプションで**LLMLingua-2** SLMエンジンを経由します（モデルが利用できない場合はルールベースの経路へフェイルオープンします）。 |
| `stacked`    | カスタムパイプライン | 任意の順序でエンジンを組み合わせる（以下を参照）                                                                                                                                                          |

> 上記のモード用エンジンに加えて、レジストリにはスタック可能な専用エンジンである
> **CCR**、**headroom**、**ionizer**、**session-dedup**も含まれています。これらについては
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)で説明しています。

モードの選択は、`open-sse/services/compression/strategySelector.ts` の `getEffectiveMode()` によって決定されます。

1. 圧縮が無効な場合：`"off"`
2. コンボのオーバーライドが存在する場合：そのオーバーライドを使用
3. 自動トリガーのしきい値を超えた場合：`autoTriggerMode` を使用（デフォルト：`"lite"`）
4. それ以外の場合：`defaultMode` を使用

### デフォルトのスタックパイプライン

`mode: "stacked"` が明示的に設定されている場合、デフォルトのパイプラインは以下を組み合わせます。

1. **RTK** — コマンド出力のノイズを除去（ターミナル出力で約80%削減）
2. **Caveman** — 冗長な表現を除去し、文章を簡潔化（残りのテキストから約46%削減）
3. **Lite** — 最終的な空白整理 + 重複排除パス

この組み合わせにより、ツールの使用が多いセッションで**78～95%の削減**を実現します。

### スタックパイプラインの設定

コンボ設定内で指定します。

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

エンジンを省略したり、カスタムエンジンを追加したり、順序を変更したりできます。

### 状態の受け渡し

エンジンは、リクエストコンテキスト（`options` 内）からメタデータを読み取れます。

```ts
compress(body, config) {
  // 前のエンジンからメタデータを読み取る
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

メタデータは**読み取り専用**です。エンジンはリクエストコンテキストを変更できず、自身の本文出力のみを変更できます。

### 実行順序の注意点

| エンジンの順序                        | 効果                                                                             |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                  | **推奨**（最初にノイズ、次に言語表現、最後に空白を処理）                         |
| Lite → RTK → Caveman                  | 不適切 — Liteが生の出力から空白を除去するため、RTKのパターンマッチングが失敗する |
| Caveman → RTK                         | 不適切 — CavemanがRTKで認識できない形にテキストを書き換える可能性がある          |
| `tool_results` を最初にする任意の順序 | より良い — ツール出力は最もノイズの多いコンテンツ                                |

### スタックすべきでない場合

スタックが常に優れているとは限りません。

- **単純なメッセージ**（ツール出力なし）— CavemanまたはLite単体で十分
- **コスト重視** — 各エンジンによって約5～50msのレイテンシーが追加される
- **特定のツール** — シェル出力には通常RTK単体で十分

### カスタムパイプラインの構築

名前付きパイプラインのレジストリはありません。スタックパイプラインは、`applyStackedCompression()`（`@omniroute/open-sse/services/compression/strategySelector` からエクスポート）に渡す、単なる**ステップのインライン配列**です。

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

パイプラインを渡さない場合、デフォルトは `rtk(standard) → caveman(full)` です。

設定から制御するには、`mode: "stacked"` を設定し、`stackedPipeline`（`config.stackedPipeline` から読み取られます）にステップ配列を指定します。

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## アップストリーム同期ポリシー

OmniRoute の圧縮エンジンは、README で複数のアップストリームプロジェクトをクレジットしています
（「RTK、Caveman、LLMLingua-2、Troglodita に着想を得た」）。コントリビューターから
よく寄せられる質問は、**アップストリームの RTK に新しいツールフィルターが追加された場合や、Caveman にルール
パックが追加された場合、それらはどのように OmniRoute に取り込まれるのか？**というものです。このセクションが正式な回答です。

### ベンダー化されたコピーと独立実装

| エンジン                     | アップストリームとの関係                                                                                                                  | 場所                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **独立した再実装**（コピーではなく、着想を得たもの）                                                                                      | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **独立した再実装**（着想を得たもの）                                                                                                      | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | 大部分は内部実装。`gcf/` コーデックのみが `gcf-typescript` から**実際にベンダー化**されている（MIT、SPDX 表記あり、汎用プロファイルのみ） | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | 着想を得たもの（`llmlingua` + `session-dedup` エンジンの基盤）                                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

重要な点：**RTK と Caveman は、（フィルタールールやルールパックといった）
_アイデア_ をクリーンルーム方式で TypeScript により実装したものであり、ベンダー化されたソースツリーではありません。**
`git pull` で取得できるアップストリームのコピーは存在しません。README で
「バンドル」ではなく「着想を得た」と記載しているのは、まさにこのためです。

### アップストリームの改善がマージされる仕組み

設計上、**アップストリームリリースの自動追跡も、`compression-sync`
ラベルもありません**。これらのエンジンは再実装であるため、アップストリームの RTK
フィルターや Caveman ルールパックがコードとしてマージされることはありません。代わりに、**OmniRoute 独自の形式で新しい
ルール／フィルターとして再表現**され（
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) を参照）、通常の PR を通じて
必要に応じて取り込まれます。上記の拡張ポイント（カスタムエンジン、言語パック、RTK フィルター）が、
それらをコントリビュートするための正式な方法です。

このフローの最近の例：

- Gradle と `dotnet` のビルド出力用 RTK フィルター（v3.8.42）
- kubectl / docker-build / composer / gh 用 RTK フィルター（#2824）
- Caveman のインドネシア語言語パック（#3975）、およびドイツ語／フランス語／日本語／中国語パック

### Headroom（入力圧縮プロキシ）

Headroom は**完全な内部実装**です。固定されたベンダー版 `gcf` コーデックのスナップショットと、
OmniRoute 独自の `smartcrusher` / `toon` / `tabular` レイヤーで構成されています。ベンダー化されたコピー以外に
追跡対象となる稼働中のアップストリームはありません。`gcf` の更新は、コーデックに変更があった際に
手動で反映され、圧縮予算ゲート（`check:compression-budget`）に対して再検証されます。

### アップストリームに着想を得た改善の提案

1. **ベンダー化しないでください** — アップストリームのルール／フィルターを OmniRoute の形式で再表現してください。
2. 以下の該当する拡張ポイント（言語パック、RTK フィルター、または
   カスタムエンジン）を通じて追加してください。
3. ライセンス付きのソースをコピーするのではなく、PR の説明でアップストリームプロジェクトを参照してください（帰属表示）。
4. テストを含め、`check:compression-budget` ゲートが引き続き通過することを確認してください。

---

## 出力スタイルの追加

出力スタイル（[ガイドのカタログ表](./COMPRESSION_GUIDE.md#output-styles-catalog)を参照）は、入力エンジンに対するレスポンス側の機能です。送信内容を圧縮する代わりに、より低コストな出力を生成するようモデルに指示します。レジストリは `open-sse/services/compression/outputStyles/catalog.ts` の `OUTPUT_STYLE_CATALOG` であり、**1つのカタログエントリが機能全体を構成します**。インジェクター、ダッシュボードの設定パネル、永続化、テレメトリはすべてカタログを列挙するため、ほかに更新すべきリストはありません。

1. **`OUTPUT_STYLE_CATALOG` にエントリを1つ追加します**。エントリには `id`、`label`、`description`、および英語の3つの `levels`（`lite`、`full`、`ultra`）を含めます。コード、パス、コマンド、エラー、URLがそのまま維持されるよう、各レベルの末尾には必ず `${SHARED_BOUNDARIES}` を付けてください。指示テキストは `(id, level, language)` ごとに**静的かつ決定的**でなければならず、許可される唯一の補間は `${SHARED_BOUNDARIES}` です。
2. **翻訳します。** `i18n` 配下に少なくとも `pt-BR` ブロックを含めてください。`ponytail` と `i-have-adhd`（en、pt-BR、es、de、fr、it、ru、zh、ja、id、vi）が参考となる構成です。意図的に単一言語のみを対象とするスタイルでは、代わりに `locale` を設定し（`terse-cjk` → `zh` など）、そのロケールでのみ提供されるようにします。
3. **マトリックスガードを更新します** — `tests/unit/compression/output-styles-i18n-matrix.test.ts` の `BASELINE_LANGUAGES` に、そのスタイルの言語を追加します。ロケール制限のない新しいスタイルに必要な翻訳がなく、追跡用 Issue を伴う明示的な `KNOWN_ENGLISH_ONLY` エントリもない場合、ゲートは失敗します。
4. **スタイルごとのテストを追加します**。`tests/unit/compression/i-have-adhd-catalog.test.ts` を手本に、カタログの構造、各レベルの境界条項、各翻訳が英語のコピーではなく、それぞれの言語で記述されていることを確認するアンカーをテストします。
5. **帰属表示**：スタイルをアップストリームプロジェクトから改変した場合は、エントリ上のソースコメントでクレジットを明記してください（例：`i-have-adhd` → ayghri/i-have-adhd、MIT）。上記の「アップストリームに着想を得た改善の提案」と同じルールです。

UI、スキーマ、テレメトリの変更は不要です。これらの画面や機能はカタログからレンダリングされます。

---

## ベストプラクティス

### エンジン開発

1. **必ず `validateConfig` を実装する** — 検証のないエンジンは、気付かれないまま失敗する原因になります
2. **現実的な `targetLatencyMs` を設定する** — ストラテジーセレクターがエンジンを選択する際に使用されます
3. **ダッシュボードには `getConfigSchema` を使用する** — ユーザーから設定を隠さないでください
4. **エンジンが純粋であれば `stackable: true` をサポートする** — 副作用のあるエンジンはスタックすべきではありません
5. **インラインテストを記述する** — エンジンは1秒未満で検証できるようにしてください

### 言語パック開発

1. **`lite` 強度から始める** — 最も低い設定でもルールが安全に機能するようにしてください
2. **`context` を使用してルールの適用範囲を限定する** — `user` のみに適用されるルールであれば、誤ってシステムプロンプトに影響を与えることはありません
3. **JSONキーをキャプチャしない** — `\\bword\\b` はJSON内でも一致し、構造化データを壊す可能性があります
4. **エッジケースでテストする** — 空の入力、Unicode、RTLテキスト、絵文字
5. **既存のパックをテンプレートとして使用する** — `en/filler.json` が最も充実した例です

### パイプライン設計

1. **最適化する前にプロファイリングする** — まず `compression_stats` で測定してください
2. **再実装よりも組み合わせを優先する** — 新しいエンジンを記述する前に、Cavemanルールを拡張してください
3. **順序の根拠を文書化する** — エンジンAをエンジンBより前に配置する理由をコメントで説明してください
4. **3つすべての強度レベルでテストする** — `lite` は高速ですが損失が多く、`ultra` は低速ですが精密です

---

## リファレンス: 組み込みエンジン

| エンジン ID          | スタック可能 | デフォルトの stackPriority | 対象                                |
| -------------------- | ------------ | -------------------------- | ----------------------------------- |
| `lite`               | はい         | 5                          | messages, tool_results              |
| `rtk`                | はい         | 10                         | tool_results                        |
| `standard` (caveman) | はい         | 20                         | messages, tool_results, code_blocks |
| `aggressive`         | はい         | 30                         | messages                            |
| `ultra`              | はい         | 40                         | messages, code_blocks               |

### 関連項目

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — パイプラインの概要
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — エンジンレジストリのリファレンス
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ルール形式の仕様
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — 言語パックの詳細
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK エンジンとカスタムフィルター
- ソース: `open-sse/services/compression/`（117 ファイル、約 250KB）
