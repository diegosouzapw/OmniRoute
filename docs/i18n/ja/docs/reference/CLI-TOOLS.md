# CLI-TOOLS (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLIツール — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLIツール — OmniRoute

最終更新日: 2026-08-18

OmniRouteは、3つの専用ダッシュボードページに分かれた3つのカテゴリのCLIツールと統合されています：

| ページ              | ルート                  | 概念                                                                               | カウント         |
| ------------------- | ----------------------- | ---------------------------------------------------------------------------------- | ---------------- |
| **CLIコード**       | `/dashboard/cli-code`   | OmniRouteを指すコーディングツール（クライアント → CLI → OmniRoute → プロバイダー） | 26               |
| **CLIエージェント** | `/dashboard/cli-agents` | OmniRouteを指す自律エージェント（同じフロー、より広範な範囲）                      | 8                |
| **ACPエージェント** | `/dashboard/acp-agents` | OmniRouteがstdio/ACPを介してバックエンドとして生成するCLI（逆流）                  | レジストリを参照 |

レガシールートは308でリダイレクトされます：`/dashboard/cli-tools` → `/dashboard/cli-code`、`/dashboard/agents` → `/dashboard/acp-agents`。

---

## 仕組み

```
CLIコード / CLIエージェント（消費フロー）:
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (すべてOmniRouteを指す)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRouteが適切なプロバイダーにルーティング)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACPエージェント（逆生成フロー）:
    クライアントリクエスト → OmniRoute → stdio/ACPを介してCLIを生成 → レスポンス
```

**利点:**

- すべてのツールを管理するための1つのAPIキー
- ダッシュボード内のすべてのCLIにわたるコスト追跡
- すべてのツールを再構成せずにモデル切り替え
- ローカルおよびリモートサーバー（VPS、Docker、Akamai、Cloudflare Tunnel）で動作

---

## `setup-*`による自動構成

各ツールの設定を手動で書く必要はありません。OmniRouteは、実行中のOmniRoute（ローカルまたはリモート）から**ライブ**モデルカタログを読み取り、ツール自身の設定をあなたのマシンに書き込むための`setup-*`コマンドをサポートするCLIごとに提供します：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

各コマンドは`--remote <url> --api-key <key>`（リモートOmniRouteに対してローカルツールを構成）、`--dry-run`（書き込まずにプレビュー）、および`--port`を受け入れます。モデルの自動検出がないツール（Cline、Kilo、Roo、Goose、Aider、Qwen）は`--model <id>`（および非対話型実行のための`--yes`）を受け取ります。適切な環境が注入され、全く設定が書き込まれないCLIを起動するには、一般的な`omniroute run <target>`ランチャー（claude、codex、aider、goose、opencode、qwen、gemini — ターゲットとエイリアスは`bin/cli/cli-manifest.mjs`から取得）を使用します。レガシーな各ツールのランチャー`omniroute launch`（Claude Code）および`omniroute launch-codex`（Codex）は引き続き利用可能です。Gemini CLIは起動専用であり、`omniroute run`ターゲットですが、`setup-*`/`configure`レシピはありません。

> **完全なリファレンス:** マスターテーブル — 各コマンドが書き込む内容、すべてのフラグ、ローカル対リモート、およびどのツールが`/v1`サフィックスを必要とするか — は**[CLI統合](../guides/CLI-INTEGRATIONS.md)**にあります。

### コンテナ内での実行

OmniRouteコンテナ内で実行された`setup-*`コマンドは、コンテナ自身のホームに書き込まれ、ホストCLIが読み取ることはなく、コンテナとともに消えます。OmniRouteはそれを検出し、書き込むのではなく、指示とともに`2`で終了します。前進するための2つのサポートされた方法 — ホストにCLIをインストールし、`omniroute connect`でコンテナに接続するか、設定ディレクトリをバインドマウントし、`CLI_CONFIG_HOME`を設定します（composeの`host`プロファイル）。すべての`setup-*`コマンド、さらに`omniroute configure`および`omniroute config set`は、コンテナ自身のCLIを構成することが実際に意味する場合に`--allow-container-write`を受け入れます；`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`はサーバーに対して同じことを行います。詳細は
[Dockerガイド → ホストCLIツールの構成](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)を参照してください。

ダッシュボードの**適用エンドポイント**（`POST /api/cli-tools/apply`）は同じガードを強制します：コンテナ内では、ホストからバインドマウントされていないターゲットへの書き込みは**`422`**で応答し、`containerEphemeralTarget: true`という安全なエラーテキストと、ホストレシピを持つツール（claude、codex、opencode、cline、kilo、continue）に対しては、代わりにホストで実行するための`hostSetupCommand`（例：`omniroute setup-opencode`）が提供されます；何も書き込まれません。`dryRun: true`はコンテナモードでも機能し、ディスクに触れずに生成されたコンテンツとターゲットパスを返すため、ダッシュボードからプレビューし、ホストで適用できます。この動作は意図的であり、`tests/unit/api/cli-tools/apply-container-guard.test.ts`によって回帰ガードされています — 422を「修正」するためにガードを削除しないでください。

---

## 真実の源

統一カタログは `src/shared/constants/cliTools.ts` に `CLI_TOOLS: Record<string, CliCatalogEntry>` として存在します。

各エントリには以下のフィールドがあります（`src/shared/schemas/cliCatalog.ts` で定義されています）：

| フィールド                                      | 型                                                           | 説明                                                              |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | ツールが表示されるページ                                          |
| `vendor`                                        | `string`                                                     | ツールの出所（"Anthropic", "OSS (P. Gauthier)"）                  |
| `acpSpawnable`                                  | `boolean`                                                    | ACPエージェントとしても使用可能（バッジ表示）                     |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | カスタムエンドポイントのサポートレベル。`"none"` = MITMバックログ |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 設定メカニズム                                                    |
| `id`, `name`, `color`, `description`, `docsUrl` | 標準                                                         | コア表示フィールド                                                |

`baseUrlSupport: "none"` のエントリは **ダッシュボードページに表示されません** — それらはプラン11のMITMバックログに登録されています（`_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` を参照）。

### 機能ティア（カタログ化 × 検出可能 × 設定可能 × 起動可能）

すべてのカタログ化されたツールが検出可能、設定可能、または起動可能であるわけではありません。各ティアには1つの宣言ソースがあり、ドリフトテストがそれらを整合させます：

| ティア         | 意味                                                                              | 宣言場所                                                             |
| -------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **カタログ化** | ダッシュボードカタログに表示される（名前、ベンダー、ドキュメント、設定タイプ）    | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                     |
| **検出可能**   | バイナリ/設定の検出、ヘルスチェック、設定パス                                     | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` ランタイムカタログ) |
| **設定可能**   | `omniroute configure <cli>` によってサポートされる（セットアップレシピが存在）    | `bin/cli/cli-manifest.mjs` (`configure: true`)                       |
| **起動可能**   | `omniroute run <target>` によってサポートされる（env/argsの注入が定義されている） | `bin/cli/cli-manifest.mjs` (`run: true`)                             |

`bin/cli/cli-manifest.mjs` はCLIコマンドの標準実行可能マニフェストであり、`run`、`configure` およびシェル補完ジェネレーターはすべてそのターゲットリスト、エイリアス解決（例えば `kilocode`/`kilo-code`/`kilo_cli` → `kilo`）および `--model` フラグの配線をそこから派生させます。ドリフトガード `tests/unit/cli/cli-manifest-drift.test.ts` は、マニフェスト、ランタイムカタログ、UIカタログ、およびすべてのコンシューマサーフェスが同期していることを確認します — 1つのサーフェスに追加されたターゲットが他のサーフェスにない場合、スイートは静かにドリフトするのではなく失敗します。

## 1. CLIコードのカタログ (26ツール)

`/dashboard/cli-code`に表示されるすべてのツール。`baseUrlSupport: none`のものは、カスタムベースURLの代わりにMITMまたは手動ガイドを通じて接続されています：

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | カスタムCLI             | —                   | full           | custom-builder | false        |

`baseUrlSupport: "partial"`のツールは、ダッシュボードカードに「⚠ Base URL parcial」というバッジを表示します。

## 2. CLIエージェントカタログ (8ツール)

`/dashboard/cli-agents`に表示される自律エージェント：

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ACPエージェント (/dashboard/acp-agents)

このページ（`/dashboard/agents`から名前変更）は、OmniRouteが**スパーン**できるCLIを表示します。これらはバックエンド実行エンジンとしてstdio/ACPプロトコルを介して使用されます。カタログは`src/lib/acp/registry.ts`で別途管理されており、`CLI_TOOLS`とは**異なります**。

---

## 4. MITMバックログ（ダッシュボードには表示されません）

以下のCLIは、ネイティブにカスタムベースURLをサポートしておらず、CLIコードやCLIエージェントページには**リストされていません**。これらはプラン11でのMITMインターセプションの候補です：

| CLI                 | 理由                                                  |
| ------------------- | ----------------------------------------------------- |
| windsurf            | BYOKは特定のClaudeモデルと企業のURL/tokenに限定される |
| amp                 | クローズドエコシステム（Sourcegraph）                 |
| amazon-q / kiro-cli | AWS SSO認証、カスタムURLなし                          |
| cowork              | Anthropic Desktop、構成可能なエンドポイントなし       |

完全なクロスリファレンスについては、`_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`を参照してください。

---

## 5. バッチ検出API

すべてのツール検出は、単一のエンドポイントを介して集約されます：

**`GET /api/cli-tools/all-statuses`**

- 認証: `requireCliToolsAuth(request)`（他の`/api/cli-tools/`ルートと同じ）
- 戻り値: `Record<toolId, ToolBatchStatus>`（型: `src/shared/types/cliBatchStatus.ts`）
- 戦略: すべてのツールに対して`Promise.all`、ツールごとに5秒のタイムアウト
- キャッシュ: 設定ファイル`mtime`によってインデックス付けされたメモリ内LRU。mtimeが変更されるとキャッシュが無効化されます。サーバー再起動時にリセットされます。

ツールごとのレスポンス形状：

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // サニタイズ済み、スタックトレースなし
}
```

## 6. 新しいツールの設定ハンドラー

`configType: "custom"` の新しいツールには、専用の設定APIルートがあります：

| ルート                                      | ツール                                                           |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url フラグ)                                        |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi コーディングエージェント                                      |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + 専用の `.env` キー)         |

すべてのルートは、エラー応答に `sanitizeErrorMessage()` を使用します（ハードルール #12）。

---

## 7. ダッシュボードページのアーキテクチャ

### CLI コード (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — サーバーコンポーネント
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — クライアントグリッド
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — ツール詳細ページ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12の専門ツールカード + `ToolDetailClient.tsx`

### CLI エージェント (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — サーバーコンポーネント
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — クライアントグリッド
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` を再利用

### ACP エージェント (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — サーバーコンポーネント（`agents/` から移動）

### 共有 UI コンポーネント (`src/shared/components/cli/`)

| ファイル                | 目的                                                       |
| ----------------------- | ---------------------------------------------------------- |
| `CliToolCard.tsx`       | スマートステータスカード（検出 + 設定 + エンドポイント）   |
| `CliConceptCard.tsx`    | ページごとの概念説明カード                                 |
| `CliComparisonCard.tsx` | CLI タイプ間の三列比較                                     |
| `BaseUrlSelect.tsx`     | エンドポイントドロップダウン（ローカル/クラウド/カスタム） |
| `ApiKeySelect.tsx`      | API キーセレクター                                         |
| `ManualConfigModal.tsx` | コピー可能な設定スニペットモーダル                         |

### 共有フック (`src/shared/hooks/cli/`)

| ファイル                  | 目的                                                                    |
| ------------------------- | ----------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` を取得し、読み込み/リフレッシュ状態を管理 |

## 8. i18n

プラン14 F9で追加された新しい名前空間：

| 名前空間    | 目的                                                            |
| ----------- | --------------------------------------------------------------- |
| `cliCommon` | 共有文字列（カードラベル、概念/比較テキスト、詳細ページラベル） |
| `cliCode`   | CLIコードのページ文字列                                         |
| `cliAgents` | CLIエージェントのページ文字列                                   |
| `acpAgents` | ACPエージェントのページ文字列                                   |

完全なPT-BRおよびENの翻訳が提供されています。39の他のロケールは、`src/i18n/request.ts`での名前空間レベルのマージを介して自動的にENにフォールバックします。

---

## 9. クイックスタート

### ステップ1 — OmniRoute APIキーを取得する

1. `/dashboard/api-manager`を開く → **APIキーを作成**
2. 名前を付ける（例：`cli-tools`）とすべての権限を選択
3. キーをコピーする — 以下のすべてのCLIで必要になります

> あなたのキーは次のようになります： `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### ステップ2 — CLIツールをインストールする

すべてのnpmベースのツールはNode.js 22.22.2+または24.xを必要とします：

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (launchable via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rustベース

# Pi coding agent
# インストールについては https://github.com/zechnerj/pi-coding-agent を参照

# jcode
# インストールについては https://github.com/1jehuang/jcode を参照
```

---

### ステップ3 — ダッシュボードから設定する

1. `http://localhost:20128/dashboard/cli-code`に移動
2. グリッドでツールを見つける
3. カードをクリックしてツールの詳細ページを開く
4. APIキーとベースURLを選択
5. **設定を適用**をクリックするか、手動設定スニペットをコピーする

---

### ステップ4 — グローバル環境変数を設定する

```bash
# OmniRouteユニバーサルエンドポイント
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLIはROOTでGOOGLE_GEMINI_BASE_URLを読み取ります（そのSDKは/v1beta/...を自動的に追加します）
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **リモートサーバー**の場合、`localhost:20128`をサーバーのIPまたはドメインに置き換えてください、
> 例：`http://<your-server-ip>:20128`。

---

### ステップ4 — 各ツールを設定する

#### Claude Code

```bash
# ~/.claude/settings.jsonを作成：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Codeには統一されたAnthropicゲートウェイのルートを使用します。ここに`/v1`を追加しないでください。

**テスト:** `claude "say hello"`

---

#### OpenAI Codex

モダンCodex (v0.137+)は`~/.codex/config.toml`のみを読み取ります — 古い
`config.yaml`はレガシーnpm CLIに属し、静かに無視されます。API
キーは`OMNIROUTE_API_KEY`環境変数（`env_key`）に保持され、ファイル内には決して含まれません：

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

完全なリファレンス（プロファイル、`wire_api`、コンテキストウィンドウ）： [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)。

**テスト:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**テスト:** `opencode`

> `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`を使用して
> 思考バリアントを送信します。

---

#### Cline (CLIまたはVS Code)

**CLIモード：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Codeモード：**
Cline拡張設定 → APIプロバイダー：`OpenAI Compatible` → ベースURL：`http://localhost:20128/v1`

またはOmniRouteダッシュボードを使用 → **CLIツール → Cline → 設定を適用**。

---

#### KiloCode (CLIまたはVS Code)

**CLIモード：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code設定：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

またはOmniRouteダッシュボードを使用 → **CLIツール → KiloCode → 設定を適用**。

---

#### Continue (VS Code拡張)

`~/.continue/config.yaml`を編集：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

編集後にVS Codeを再起動します。

---

#### VS Code Insiders (`chatLanguageModels.json`)

VS Code Insidersがカスタムエンドポイントモデルに設定されていて、カスタムヘッダーフィールドなしでOmniRouteを機能させたい場合に使用します。

**推奨される場所：**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**トークン化されたOmniRouteエイリアスを使用した例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意：**

- `sk-your-omniroute-key`をOmniRouteで作成したAPIキーに置き換えてください。
- `url`フィールドは`/api/v1/vscode/{token}/chat/completions`を指す必要があります。
- `modelsUrl`フィールドは`/api/v1/vscode/{token}/models`を指す必要があります。
- クライアントがカスタムヘッダーをサポートしている場合は、通常の`/v1` + Bearerヘッダーフローを優先してください。
- URLに埋め込まれたトークンは互換性のためのフォールバックであり、エディタのログやプロキシ履歴に表示されることがあります。

---

#### Kiro CLI (Amazon)

```bash
# AWS/Kiroアカウントにログイン：
kiro-cli login

# CLIは独自の認証を使用します — Kiro CLI自体のバックエンドとしてOmniRouteは必要ありません。
# 他のツールのためにOmniRouteと一緒にkiro-cliを使用します。
kiro-cli status
```

**Kiro IDE**デスクトップアプリの場合、OmniRouteが提供するMITMエンドポイントを使用します
`/dashboard/cli-tools → Kiro`の下で。

## 10. 内部 OmniRoute CLI

`omniroute` バイナリは、サーバーのライフサイクル、セットアップ、診断、およびプロバイダー管理のためのコマンドを提供します。エントリーポイント: `bin/omniroute.mjs`。

```bash
omniroute                              # サーバーを起動 (デフォルトポート 20128)
omniroute setup                        # インタラクティブなセットアップウィザード
omniroute doctor                       # 設定、DB、ポート、ランタイムをチェック
omniroute providers list               # 設定されたプロバイダー接続
omniroute providers test-all           # すべてのアクティブな接続をテスト
omniroute reset-password               # 管理者パスワードをリセット
omniroute logs                         # リクエストログをストリーム
omniroute health                       # 詳細なヘルスチェック (ブレーカー、キャッシュ、メモリ)
omniroute --version                    # バージョンを表示
omniroute --help                       # すべてのコマンドを表示
```

### セットアップと初期化

```bash
omniroute setup                        # インタラクティブなセットアップウィザード
omniroute setup --non-interactive      # CI/自動化モード (環境変数 + フラグを読み取る)
omniroute setup --password '<value>'   # 管理者パスワードを直接設定
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # プロバイダーを追加してテストを一度に実行
```

非インタラクティブなセットアップ用に認識された環境変数:

| Var                 | 目的                                               |
| ------------------- | -------------------------------------------------- |
| `OMNIROUTE_API_KEY` | プロバイダーAPIキー (`--api-key` にバインドされる) |
| `DATA_DIR`          | OmniRouteデータディレクトリをオーバーライド        |

その他の非インタラクティブな入力はフラグとして渡され、環境変数ではありません:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(上記の `omniroute setup` オプションを参照)。

### 診断

```bash
omniroute doctor                       # 設定、DB、ポート、ランタイム、メモリ、稼働状況をチェック
omniroute doctor --json                # 機械可読なJSON
omniroute doctor --no-liveness         # HTTPヘルスプローブをスキップ
omniroute doctor --host 0.0.0.0        # 稼働状況ホストをオーバーライド
omniroute doctor --liveness-url <url>  # 完全なヘルスエンドポイントURLのオーバーライド
```

ドクターは以下のチェックを実行します: `設定`, `データベース`, `ストレージ/暗号化`,
`ポートの可用性`, `ノードランタイム`, `ネイティブバイナリ` (better-sqlite3),
`メモリ`, および `サーバーの稼働状況`。いずれかのチェックが `失敗` の場合、非ゼロで終了します。

### プロバイダー管理

```bash
omniroute providers available                       # OmniRouteプロバイダーのカタログ
omniroute providers available --search openai       # ID/名前/エイリアス/カテゴリでカタログをフィルタリング
omniroute providers available --category api-key    # カテゴリでフィルタリング (api-key, oauth, free, ...)
omniroute providers available --json                # 機械可読なJSON

omniroute providers list                            # 設定されたプロバイダー接続
omniroute providers list --json

omniroute providers test <id|name>                  # 1つの設定された接続をテスト
omniroute providers test-all                        # すべてのアクティブな接続をテスト
omniroute providers validate                        # ローカル専用の構造検証
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 既存のOAuthフロー
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` はAPIファーストであり、アクティブなローカルまたはリモートコンテキストに対して機能します。認証情報の入力は
`--credential-stdin` または `--credential-env` を使用する必要があります; `--dry-run --json` は
赤actedされた存在/形状のみを報告します。`providers available` はOmniRouteカタログを読み取り、
`providers list/test/test-all/validate` はローカルSQLiteの動作を保持し、サーバーが実行されている必要はありません。

### 回復とリセット

```bash
omniroute reset-password                # 管理者パスワードをリセット (別名: omniroute-reset-password)
omniroute reset-encrypted-columns       # 警告を表示 + 暗号化された認証情報リセットのためのドライラン
omniroute reset-encrypted-columns --force  # SQLite内の暗号化された認証情報を実際に無効にする
```

### 認証情報のエクスポート (⚠ 注意して取り扱う)

```bash
omniroute auth export                                 # 警告 + 確認ゲートを表示 — DBアクセスなし
omniroute auth export --force                          # すべての接続の復号化された認証情報をstdoutにJSONとしてエクスポート
omniroute auth export --force --id <id>                 # 一致する接続のみをエクスポート
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> 行を出力
omniroute auth export --force --out creds.json           # ファイルに書き込む (0600の権限で作成)
```

`auth export` は **ローカル専用** (直接SQLite読み取り、HTTPルートなし) であり、意図的に **プレーンテキスト** の `apiKey`/`accessToken`/`refreshToken`/`idToken` 値を印刷/書き込みます — それが機能です、バグではありません。`--force` なしではデータベースから何も読み取られず、何も復号化されません。プレーンテキストが出力される前に、常にstderrに警告バナーが印刷されます。`STORAGE_ENCRYPTION_KEY` を設定する必要があります。復号化に失敗したフィールド (古いキー、破損した暗号文) は、全体のエクスポートを中止したり、基礎となるエラーを漏らすのではなく、`<field>DecryptFailed: true` として報告されます。

### その他のサブコマンド

これらは、特に記載がない限り、実行中のOmniRouteサーバーを前提としています:

```bash
omniroute status                       # 包括的なランタイムステータス
omniroute logs                         # リクエストログをストリーム (--json, --search, --follow)
omniroute config show                  # 現在の設定を表示

omniroute provider list                # 利用可能なプロバイダーのリスト (providers listのエイリアス)
omniroute provider add                 # ツールにOmniRouteをプロバイダーとして登録
omniroute keys add | list | remove     # APIキーを管理
omniroute models [provider]            # モデルのリスト (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # 設定 + DBのスナップショット
omniroute restore                      # 前のスナップショットから復元

omniroute health                       # 詳細なヘルスチェック (ブレーカー、キャッシュ、メモリ)
omniroute quota                        # プロバイダーのクォータ使用状況
omniroute cache                        # キャッシュの状態
omniroute cache clear                  # セマンティック + シグネチャキャッシュをクリア

omniroute mcp status | restart         # MCPサーバーの状態 / 再起動
omniroute a2a status | card            # A2Aサーバーの状態 / エージェントカード

omniroute tunnel list | create | stop  # トンネルを管理 (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # 環境変数を検査 / 設定 (一時的)

omniroute test                         # プロバイダー接続のスモークテスト
omniroute update                       # 更新を確認
omniroute completion                   # シェルの補完を生成
```

### 一般的なフラグ

| フラグ              | 説明                                               |
| ------------------- | -------------------------------------------------- |
| `--no-open`         | 起動時にブラウザを自動的に開かない                 |
| `--port <n>`        | APIポートをオーバーライド (デフォルト 20128)       |
| `--mcp`             | IDE用にstdio経由でMCPサーバーとして実行            |
| `--non-interactive` | CIモード (プロンプトなし; 環境/フラグから読み取る) |
| `--json`            | 機械可読なJSON出力 (doctor, providersなど)         |
| `--help`, `-h`      | コマンド固有のヘルプを表示                         |
| `--version`, `-v`   | インストールされたバージョンを表示                 |

---

## 利用可能なAPIエンドポイント

| エンドポイント             | 説明                                 | 使用目的                        |
| -------------------------- | ------------------------------------ | ------------------------------- |
| `/v1/chat/completions`     | 標準チャット（すべてのプロバイダー） | すべての最新ツール              |
| `/v1/responses`            | レスポンスAPI（OpenAI形式）          | Codex、エージェントワークフロー |
| `/v1/completions`          | レガシーテキスト補完                 | `prompt:`を使用する古いツール   |
| `/v1/embeddings`           | テキスト埋め込み                     | RAG、検索                       |
| `/v1/images/generations`   | 画像生成                             | GPT-Image、Fluxなど             |
| `/v1/audio/speech`         | テキストから音声へ                   | ElevenLabs、OpenAI TTS          |
| `/v1/audio/transcriptions` | 音声からテキストへ                   | Deepgram、AssemblyAI            |

貼り付け可能なトークン化されたOmniRoute URLの例:

```txt
トークン例: sk-a3ab3c080beaee3a-69f4a4-070d71af

標準OpenAIベース: http://localhost:20128/v1
VS Codeモデル: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Codeチャット: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Codeレスポンス: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollamaタグ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollamaチャット: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## トラブルシューティング

| エラー                                                       | 原因                                 | 修正                                             |
| ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------ |
| `Connection refused`                                         | OmniRouteが実行されていない          | `omniroute serve`                                |
| `401 Unauthorized`                                           | APIキーが間違っている                | `/dashboard/api-manager`で確認                   |
| `No combo configured`                                        | アクティブなルーティングコンボがない | `/dashboard/combos`で設定                        |
| CLIが「not installed」と表示される                           | バイナリがPATHにない                 | `which <command>`で確認                          |
| インストール後にダッシュボードが「not detected」と表示される | キャッシュが古い                     | ダッシュボードで「⟳ 検出を更新」をクリック       |
| 古いリンク `/dashboard/cli-tools`                            | v3.8.6以前のブックマーク             | `/dashboard/cli-code`に自動リダイレクト（308）   |
| 古いリンク `/dashboard/agents`                               | v3.8.6以前のブックマーク             | `/dashboard/acp-agents`に自動リダイレクト（308） |
