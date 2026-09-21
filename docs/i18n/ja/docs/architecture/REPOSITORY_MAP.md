# Repository Map (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **すべてのディレクトリとルートファイルを1行で説明します。**
> 最終更新日: 2026-06-28 — OmniRoute v3.8.40
>
> このマップを使用して、コードベース内をすばやく移動できます。詳細については、専用ドキュメントへのリンクを参照してください。

## トップレベルツリー

```
OmniRoute/
├── src/                  # Next.js 16アプリケーション（UI + APIルート + ライブラリ + ドメイン + サーバー）
├── open-sse/             # ストリーミングエンジンのワークスペース（ハンドラー、エグゼキューター、トランスレーター、MCPサーバー）
├── electron/             # デスクトップラッパー（Electron 41 + electron-builder 26.10）
├── bin/                  # CLIエントリーポイントとコマンドハンドラー
├── scripts/              # ビルド、チェック、同期、単発実行用スクリプト
├── docs/                 # 公開ドキュメント（現在地）
├── tests/                # すべてのテストスイート（ユニット、統合、e2e、プロトコルクライアント）
├── public/               # Next.js静的アセット、PWAマニフェスト、サービスワーカー、アイコン
├── config/               # 静的設定 + 品質ゲートの状態（i18n、payloadRules、quality/）
├── images/               # マーケティング用 / README用画像アセット
├── @omniroute/           # 公開可能な関連パッケージ（opencode-plugin、opencode-provider）
├── skills/               # CLI/エージェント用スキルパック（cli-* + omni-* + config-codex-cli）
├── examples/             # サンプルプラグイン + omniroute-cmd-helloスターター
├── contrib/              # コミュニティによるコントリビューション（podman/）
├── .source/              # Fumadocsソース設定（source.config.mjs + サーバー/ブラウザー/動的処理）
├── .github/              # GitHub Actionsワークフロー + Issueテンプレート + PRテンプレート
├── .husky/               # Gitフック（pre-commit、pre-push）
├── .claude/              # Claude Codeスラッシュコマンド（プロジェクトスコープ）
├── .agents/              # Codex / 汎用エージェントのワークフロー + スキル（.claude/のミラー）
├── .vscode/              # VS Codeワークスペース設定
├── _ideia/               # 計画メモ（非公式、配布対象外）
├── _mono_repo/           # 過去のサブプロジェクト（cloud、site、vscode-extension）
├── _references/          # 関連OSSプロジェクトから取得した読み取り専用の参照クローン
├── _tasks/               # リリースごとのタスク追跡ファイル（非公式）
├── .build/ .worktrees/ dist/   # ローカルビルド / git-worktree / ビルド出力用の一時領域（gitignored）
├── .issues/              # ローカルのIssueキャッシュ（gitignored）
├── .playwright-mcp/      # Playwright MCPテスト成果物
├── coverage/             # c8カバレッジ出力（gitignored）
├── logs/                 # ランタイムログ（gitignored）
├── node_modules/         # 依存関係（gitignored）
├── package/              # npm pack用ステージング領域（ビルド成果物）
├── .next/                # Next.jsビルド出力（gitignored）
└── （ルートファイル — 以下を参照）
```

---

## ルートファイル

| ファイル                                    | 目的                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **README.md**                               | マーケティング用ランディングページ + クイックスタート + 機能マトリクス（`llm.txt` も参照）      |
| **CHANGELOG.md**                            | リリースごとの変更履歴（`/version-bump-cc` スキルによって自動生成）                             |
| **LICENSE**                                 | MIT ライセンステキスト                                                                          |
| **CLAUDE.md**                               | Claude Code エージェント向けのプロジェクトルール（厳守ルール、規約、シナリオ）                  |
| **AGENTS.md**                               | CLAUDE.md と同じ内容だが、Claude 以外の AI エージェント（Codex、Cursor など）向け               |
| **GEMINI.md**                               | Gemini ベースのエージェント向け簡易ルール（CLAUDE.md のサブセット）                             |
| **CONTRIBUTING.md**                         | コントリビューターガイド：セットアップ、Conventional Commits、テスト、PR フロー                 |
| **SECURITY.md**                             | 脆弱性報告ポリシー、サポート対象バージョン、脅威モデル                                          |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — コミュニティで期待される行動                                             |
| **llm.txt**                                 | LLM クローラー向けに最適化されたプレーンテキストのランディングページ（AI アシスタント向け SEO） |
| **package.json**                            | npm マニフェスト、スクリプト、依存関係、エンジン、c8 カバレッジゲート                           |
| **package-lock.json**                       | ロックされた依存関係ツリー                                                                      |
| **tsconfig.json**                           | ルートの TypeScript 設定                                                                        |
| **tsconfig.typecheck-core.json**            | `src/` コア向け型チェック設定                                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | 厳格な（`noImplicitAny`）型チェック                                                             |
| **tsconfig.tsbuildinfo**                    | TS のインクリメンタルビルドキャッシュ（gitignore 対象）                                         |
| **next.config.mjs**                         | Next.js 16 ビルド設定（スタンドアロン出力）                                                     |
| **next-env.d.ts**                           | Next.js が自動生成する環境型定義                                                                |
| **eslint.config.mjs**                       | ESLint フラット設定（プロジェクト領域ごとのルール）                                             |
| **prettier.config.mjs**                     | Prettier フォーマットルール                                                                     |
| **postcss.config.mjs**                      | Tailwind/CSS パイプライン用 PostCSS 設定                                                        |
| **playwright.config.ts**                    | Playwright E2E テスト設定                                                                       |
| **vitest.config.ts**                        | Vitest 設定（デフォルトスイート）                                                               |
| **vitest.mcp.config.ts**                    | MCP サーバー / autoCombo / キャッシュスイート用 Vitest 設定                                     |
| **sonar-project.properties**                | SonarQube/SonarCloud 設定（コード品質）                                                         |
| **Dockerfile**                              | マルチステージ Docker ビルド（builder → runner-base → runner-cli）                              |
| **docker-compose.yml**                      | 4 つのプロファイル（base、cli、host、cliproxyapi）と redis サイドカーを備えた開発用 Compose     |
| **docker-compose.prod.yml**                 | 本番用 Compose（ポート 20130、redis、名前付きボリューム）                                       |
| **.dockerignore**                           | Docker コンテキストから除外されるファイル                                                       |
| **fly.toml**                                | Fly.io デプロイ設定（リージョン `sin`、ポート 20128、/data ボリューム）                         |
| **.env.example**                            | 環境ファイルのテンプレート（初回インストール時に `.env` へ自動コピー）                          |
| **.gitignore**                              | Git の無視パターン                                                                              |
| **.npmignore**                              | npm 公開時の除外リスト                                                                          |
| **.npmrc**                                  | npm 設定（レジストリ、ロックファイルポリシー）                                                  |
| **.node-version**                           | Node バージョン固定（nvm 互換ツールで使用）                                                     |
| **.nvmrc**                                  | nvm 用 Node バージョン固定                                                                      |
| **eslint.complexity.config.mjs**            | 複雑度ラチェット用 ESLint 設定（`scripts/check/check-complexity.mjs --config`）                 |
| **eslint.sonarjs.config.mjs**               | SonarJS ルール用 ESLint 設定（認知的複雑度 / 重複）                                             |
| **source.config.ts**                        | Fumadocs の `defineDocs` ソース設定（`.source/` への入力）                                      |
| **knip.json**                               | Knip 設定 — 未使用のファイル / エクスポート / 依存関係（デッドコードゲートへの入力）            |
| **stryker.conf.json**                       | Stryker ミューテーションテスト設定                                                              |
| **.size-limit.json**                        | size-limit のバンドル容量制限設定                                                               |
| **promptfooconfig.yaml**                    | promptfoo の評価設定                                                                            |
| **.gitleaks.toml**                          | gitleaks のシークレットスキャンルールセット                                                     |
| **.zizmor.yml**                             | zizmor の GitHub Actions セキュリティリント設定                                                 |
| **socket.yml**                              | Socket.dev のサプライチェーン設定                                                               |
| **news.json**                               | ローカライズされた v2 お知らせフィード。Radar のリリース項目は無効な状態で同梱                  |
| **flake.nix** / **flake.lock**              | Nix 開発シェルの定義とロック                                                                    |
| **.env**                                    | ローカルシークレット（gitignore 対象 — `.env.example` から生成）                                |

> **v3.8.26 でルート外へ移動（整理）：**
>
> - **→ `config/quality/`：** `quality-baseline.json`、`complexity-baseline.json`、`duplication-baseline.json`、`file-size-baseline.json`、`test-discovery-baseline.json`、`dependency-allowlist.json`、`.license-allowlist.json`、および生成される `quality-metrics.json`（gitignore 対象）。[`## config/`](#config--static-configs--quality-gate-state)を参照してください。

---

## `src/` — Next.js アプリケーション

```
src/
├── app/                 # App Router（ページ + API ルート + ステータスページ + ランディングページ）
├── lib/                 # コアライブラリ / ドメインモジュール（80 個のサブディレクトリ + 約 70 個のトップレベルファイル）
├── domain/              # 純粋なドメインロジック（ポリシーエンジン、フォールバック、コスト、ロックアウト、comboResolver、assessment）
├── server/              # サーバー専用モジュール（認可パイプライン、CORS、認証ミドルウェア）— クライアントからインポート不可
├── shared/              # 安全な範囲でサーバーとクライアント間で共有（定数、型、バリデーション、コントラクト、ユーティリティ）
├── i18n/                # next-intl の設定 + ロケールごとのメッセージ JSON（42 ロケール）
├── middleware/          # Next.js ミドルウェア（リクエストの拡充、ロケール検出）
├── mitm/                # MITM プロキシのコア：証明書の生成/インストール、ハンドラー、ターゲット、インスペクター、マスク、パススルー
│   ├── handlers/        # MitmHandlerBase を継承する 9 個の IDE エージェント用ハンドラークラス（antigravity、kiro、copilot、codex、cursor、zed、claudeCode、openCode、trae）
│   └── inspector/       # トラフィックキャプチャ層：buffer（インメモリリング）、sseMerger、conversationNormalizer、kindDetector、contextKey、httpProxyServer、systemProxyConfig
├── models/              # モデルアダプターのグルーコード（レガシーシム）
├── scripts/             # ツリー内のメンテナンススクリプト（例：backfillAggregation）
├── sse/                 # レガシー SSE ハンドラー/サービス（chat.ts、chatHelpers.ts、services/auth.ts）
├── store/               # レガシーなインメモリストア（src/lib/db への段階的移行中）
├── types/               # 共有 TS 型ファイル
├── instrumentation.ts   # Next.js テレメトリフック（ブラウザー + エッジ）
├── instrumentation-node.ts  # Node 専用インストルメンテーション
└── proxy.ts             # HTTP プロキシのエントリシム
```

### `src/app/` — App Router（Next.js 16）

| Path                                                                         | 目的                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | 公開 OpenAI 互換 API（約25個のサブルート：チャット、補完、埋め込み、ファイル、バッチ、音声、画像、動画、音楽、リランキング、モデレーション、検索、ws、エージェント、アカウント、プロバイダーなど）                                                                                                                             |
| `app/api/v1beta/`                                                            | Gemini 形式の API エンドポイント                                                                                                                                                                                                                                                                                               |
| `app/api/playground/`                                                        | Playground Studio ルート：`improve-prompt/`（POST — LLM プロンプトリライター）、`presets/`（GET 一覧取得 / POST 作成）、`presets/[id]/`（GET / PUT / DELETE）— `docs/frameworks/PLAYGROUND_STUDIO.md` を参照                                                                                                                   |
| `app/api/`（v1 以外）                                                        | 管理者向けルート（約60個のディレクトリ：プロバイダー、コンボ、設定、mcp、a2a、評価、メモリ、スキル、Webhook、コンプライアンス、レジリエンス、モニタリング、トンネル、cli-tools など）                                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12個のルート（サーバー制御、エージェントの状態/DNS/マッピング、バイパス、証明書、upstream-CA）。LOCAL_ONLY + SPAWN_CAPABLE。`docs/frameworks/AGENTBRIDGE.md §7` を参照。                                                                                                                                |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16個以上のルート（リクエスト、セッション、ホスト、キャプチャモード、エクスポート、ws）。LOCAL_ONLY + SPAWN_CAPABLE。`docs/frameworks/TRAFFIC_INSPECTOR.md §8` を参照。                                                                                                                       |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 エントリーポイント（`POST /a2a`）                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | A2A Agent Card（検出）                                                                                                                                                                                                                                                                                                         |
| `app/(dashboard)/dashboard/`                                                 | ダッシュボード UI ページ（50以上のセクション、約118個の page.tsx ファイル：プロバイダー、コンボ、設定、メモリ、スキル、Webhook、評価、監査、バッチ、キャッシュ、コスト、ヘルス、システム、アクティビティなど）                                                                                                                 |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI（3つのタブ：検索/スクレイピング/比較 + SearchConceptCard + ProviderCatalog）— `docs/frameworks/SEARCH_TOOLS_STUDIO.md` を参照                                                                                                                                                                           |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（プラン21）：`page.tsx`（3タブ構成のシェル）、`components/`（MemoryConceptCard、MemoryEngineStatus、EmbeddingSourceSelector、EditMemoryModal、RetrievePreview、QdrantConfigCard、RerankConfigCard）、`components/tabs/`（MemoriesTab、PlaygroundTab、EngineTab）、`hooks/`（useEngineStatus、useMemorySettings） |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge ダッシュボードページ — サーバーカード、9枚のエージェントカード、セットアップウィザード、モデルマッピング、バイパスリスト。i18n は PT-BR + EN。`docs/frameworks/AGENTBRIDGE.md` を参照。                                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector ダッシュボードページ — DevTools 分割表示、7つの詳細タブ、4つのキャプチャモード切り替え、セッションレコーダー、コンテキストの色分け。i18n は PT-BR + EN。`docs/frameworks/TRAFFIC_INSPECTOR.md` を参照。                                                                                                      |
| `app/(dashboard)/dashboard/activity/`                                        | アクティビティフィードページ（グループB）：`page.tsx`（サーバー）+ `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — `docs/architecture/MONITORING_SECTIONS.md` を参照                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | クォータ共有ページ（グループB）：`QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | プロバイダープラン設定ページ（グループB）：`page.tsx` + `ProviderPlanConfigClient.tsx` — 接続ごとのクォータディメンションのオーバーライド                                                                                                                                                                                      |
| `app/docs/`                                                                  | 組み込みドキュメントビューアー（`docs/*.md` をレンダリング）                                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | マーケティングランディングページ                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | 認証関連ページ                                                                                                                                                                                                                                                                                                                 |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTPエラーページ                                                                                                                                                                                                                                                                                                               |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | 静的／ステータスページ                                                                                                                                                                                                                                                                                                         |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | ルートレイアウト、ホーム、PWAマニフェスト、グローバルCSS                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | エラーバウンダリ                                                                                                                                                                                                                                                                                                               |

### `src/lib/` — コアライブラリ（約50モジュール）

| モジュール                               | 目的                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A プロトコルのタスクマネージャー、スキル（5 種類）、ストリーミング                                                                                                                                                                                                                                                             |
| `acp/`                                   | CLI エージェントレジストリ（ローカル CLI の検出 — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md` を参照）                                                                                                                                                                                                                            |
| `api/`                                   | 共有 API ヘルパー（`requireManagementAuth`、バリデーション）                                                                                                                                                                                                                                                                     |
| `auth/`                                  | セッション、パスワードのハッシュ化、トークンの検証                                                                                                                                                                                                                                                                               |
| `batches/`                               | OpenAI Batches API ハンドラー                                                                                                                                                                                                                                                                                                    |
| `catalog/`                               | プロバイダーカタログの Zod バリデーション + ケイパビリティ解決                                                                                                                                                                                                                                                                   |
| `cloudAgent/`                            | クラウドエージェント（Codex Cloud、Devin、Jules）— `docs/frameworks/CLOUD_AGENT.md` を参照                                                                                                                                                                                                                                       |
| `combos/`                                | コンボ解決 + 並べ替えヘルパー                                                                                                                                                                                                                                                                                                    |
| `audit/`                                 | アクティビティフィード用ヘルパー：`highLevelActions.ts`（許可リスト + `isHighLevelAction()`）、`activityIcons.ts`（アクション → アイコン／動詞マップ）、`timeline.ts`（groupByDay/relativeTime）— `docs/architecture/MONITORING_SECTIONS.md` を参照                                                                              |
| `compliance/`                            | 監査ログ + プロバイダー監査 — `docs/security/COMPLIANCE.md` を参照                                                                                                                                                                                                                                                               |
| `compression/`                           | 圧縮エンジンのグルーコード（エンジン本体は `open-sse/services/compression/` に配置）                                                                                                                                                                                                                                             |
| `config/`                                | ランタイム設定ヘルパー                                                                                                                                                                                                                                                                                                           |
| `db/`                                    | 120 以上のドメイン DB モジュール + 168 個のマイグレーション（SQLite へのアクセスは必ずここを経由）                                                                                                                                                                                                                               |
| `quota/`                                 | クォータ共有エンジン：`dimensions.ts`（型/Zod）、`types.ts`（QuotaStore インターフェース）、`sqliteQuotaStore.ts`、`redisQuotaStore.ts`、`storeFactory.ts`、`fairShare.ts`、`burnRate.ts`、`planResolver.ts`、`planRegistry.ts`、`saturationSignals.ts`、`enforce.ts`、`spendRecorder.ts` — `docs/routing/QUOTA_SHARE.md` を参照 |
| `radar/`                                 | Radar無料モデルカタログクライアント：`feedSchema.ts`、`pinnedKeys.ts`、`verify.ts`、`sync.ts`、`applyFeed.ts`、`index.ts`（`getRadarCatalog()`）— `docs/frameworks/RADAR.md`を参照                                                                                                                                               |
| `display/`                               | UIフォーマット用ヘルパー（コスト、レイテンシなど）                                                                                                                                                                                                                                                                               |
| `embeddings/`                            | Embeddingsサービス用ヘルパー                                                                                                                                                                                                                                                                                                     |
| `env/`                                   | 環境変数の解析と検証                                                                                                                                                                                                                                                                                                             |
| `evals/`                                 | 評価フレームワーク（スイート、ランナー、ランタイム）— `docs/frameworks/EVALS.md`を参照                                                                                                                                                                                                                                           |
| `guardrails/`                            | PIIマスカー、プロンプトインジェクション対策、ビジョンブリッジ — `docs/security/GUARDRAILS.md`を参照                                                                                                                                                                                                                              |
| `jobs/`                                  | バックグラウンドジョブ（cron形式）                                                                                                                                                                                                                                                                                               |
| `memory/`                                | 会話メモリ（SQLite FTS5 + sqlite-vecハイブリッドRRF + Qdrant Tier 2）— `docs/frameworks/MEMORY.md`を参照                                                                                                                                                                                                                         |
| `memory/embedding/`                      | 複数ソース対応の埋め込みレイヤー：`index.ts`（リゾルバー）、`remote.ts`、`staticPotion.ts`、`transformersLocal.ts`、`cache.ts`、`types.ts`（計画21）                                                                                                                                                                             |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9ラッパー — KNN総当たり検索 + ハイブリッドRRF（FTS5 + ベクトル、k=60）。遅延初期化を行い、sqlite-vecが利用できない場合も適切に機能を縮退します。（計画21）                                                                                                                                                       |
| `memory/reindex.ts`                      | `runReindexBatch()` — バックグラウンドで`needs_reindex=1`のメモリを処理します。`POST /api/memory/reindex`および遅延バックフィル処理から呼び出されます。（計画21）                                                                                                                                                                |
| `monitoring/`                            | ヘルスチェック、メトリクス出力                                                                                                                                                                                                                                                                                                   |
| `oauth/`                                 | 22個のプロバイダーモジュール向けOAuth/インポートフロー（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、zed-hosted、zed）                                              |
| `plugins/`                               | プラグインレジストリ                                                                                                                                                                                                                                                                                                             |
| `promptCache/`                           | Anthropic形式のプロンプトキャッシュブレークポイント                                                                                                                                                                                                                                                                              |
| `skills/`                                | スキルフレームワーク（組み込み + マーケットプレイス + SkillsSH）— `docs/frameworks/SKILLS.md`を参照                                                                                                                                                                                                                              |
| `playground/`                            | Playground Studio の共有ヘルパー: `codeExport.ts`（curl/Python/TS ジェネレーター）、`promptImprover.ts`（メタプロンプトビルダー）、`streamMetrics.ts`（純粋な TTFT/TPS）、`types.ts`（料金表）— `docs/frameworks/PLAYGROUND_STUDIO.md` を参照                                                                                    |
| `webhookDispatcher.ts`                   | HMAC Webhook 配信 — `docs/frameworks/WEBHOOKS.md` を参照                                                                                                                                                                                                                                                                         |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | トンネルマネージャー — `docs/ops/TUNNELS_GUIDE.md` を参照                                                                                                                                                                                                                                                                        |
| `cloudSync.ts`, `initCloudSync.ts`       | 状態のオプションのクラウド同期                                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | db モジュール用の再エクスポートバレル（ロジックなし — 再エクスポートのみ）                                                                                                                                                                                                                                                       |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | リクエストキャッシュ + 冪等性                                                                                                                                                                                                                                                                                                    |
| （さらに約30個のトップレベルファイル）   | 特殊用途のヘルパー（logEnv、modelsDevSync、piiSanitizer など）                                                                                                                                                                                                                                                                   |

### `src/lib/db/` — データベース（122モジュール + 168マイグレーション）

| サブディレクトリ          | 用途                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | WAL ジャーナリングを使用する `getDbInstance()` シングルトン                                                                                                                         |
| `db/migrations/`          | バージョン管理された SQL ファイル（冪等かつトランザクショナル）。`073_memory_vec.sql` は `memory_vec_meta` + `needs_reindex` 列を追加（プラン21）。                                 |
| `db/playgroundPresets.ts` | Playground Studio プリセット用の CRUD モジュール（`listPlaygroundPresets`、`getPlaygroundPreset`、`createPlaygroundPreset`、`updatePlaygroundPreset`、`deletePlaygroundPreset`）    |
| `db/memoryVec.ts`         | `memory_vec_meta`（active_dim、embedding_signature、last_reset_at、vec_loaded）の CRUD + `markMemoryNeedsReindex`、`getMemoryReindexQueue` など（プラン21）                         |
| `db/<domain>.ts`          | ドメインごとに1つのモジュール: providers、combos、apiKeys、users、sessions、usage、audit*log、webhooks、skills、memory_entries、cloud_agent_tasks、evals*\*、reasoning_cache など。 |

### `src/domain/`

| モジュール             | 用途                                          |
| ---------------------- | --------------------------------------------- |
| `policy.ts`            | ポリシーエンジン                              |
| `fallbackPolicy.ts`    | フォールバック決定木                          |
| `costRules.ts`         | コスト計算ルール                              |
| `lockoutPolicy.ts`     | モデル/接続のロックアウトポリシー             |
| `tagRouter.ts`         | タグベースのルーティング                      |
| `comboResolver.ts`     | コンボの解決（コンボエンジンで使用）          |
| `modelAvailability.ts` | モデル単位の可用性チェック                    |
| `assessment/`          | モデル評価（RFC-AUTO-ASSESSMENT のフェーズ1） |

### `src/server/`

| モジュール | 用途                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `authz/`   | 認可パイプライン: `classify` → `policies` → `enforce` — `docs/architecture/AUTHZ_GUIDE.md` を参照 |
| `cors/`    | CORS 設定                                                                                         |
| `auth/`    | セッションミドルウェア                                                                            |

### `src/shared/`

| モジュール                       | 目的                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `constants/providers.ts`         | Zod 検証を備えた **355 プロバイダー**（信頼できる唯一の情報源）                      |
| `constants/cliTools.ts`          | 外部 CLI ツールのレジストリ                                                          |
| `constants/routingStrategies.ts` | 優先度を備えた **19 のルーティング戦略**                                             |
| `constants/publicApiRoutes.ts`   | Bearer 認証（管理認証ではなく）を必要とするルート                                    |
| `constants/upstreamHeaders.ts`   | アップストリームリクエスト用のヘッダー拒否リスト                                     |
| `validation/schemas.ts`          | 約 80 個の Zod スキーマ（API 契約における信頼できる唯一の情報源）                    |
| `validation/helpers.ts`          | Zod 検証ヘルパー（`validateBody` など）                                              |
| `types/`                         | 共有 TS 型                                                                           |
| `contracts/`                     | 公開 API 契約（`package.json` の `files:` で使用）                                   |
| `utils/circuitBreaker.ts`        | プロバイダーのサーキットブレーカー（`docs/architecture/RESILIENCE_GUIDE.md` を参照） |
| `utils/apiAuth.ts`               | API キーの検証、スコープのチェック                                                   |
| `utils/fetchTimeout.ts`          | アップストリーム fetch 用のタイムアウト／中止ラッパー                                |
| `utils/releaseNotes.ts`          | 終了済みの v2／レガシー告知のパーサー、ローカライズ、および ID による非表示処理      |

---

## `open-sse/` — ストリーミングエンジンワークスペース

独立した npm ワークスペース（`@omniroute/open-sse`）。リクエスト処理とプロバイダー実行を担当します。

```
open-sse/
├── handlers/            # 16ファイル（12個のハンドラー + 4個のヘルパー）：chatCore、responsesHandler、embeddings、audio、image、video、music、rerank、moderations、searchなど
├── executors/           # プロバイダー固有の executor 67個（BaseExecutorを拡張）
├── translator/          # フォーマットコンバーター（リクエスト用9個、レスポンス用9個、ヘルパー9個）
├── transformer/         # Responses API ↔ Chat Completions（TransformStream）
├── services/            # 約80以上のサービスモジュール（combo、accountFallback、autoCombo、reasoningCache、claude code/chatgpt stealth、modelDeprecation、taskAwareRouter、workflowFSMなど）
├── mcp-server/          # MCPサーバー（110個のツール、3個のトランスポート、33個のスコープ）
├── config/              # プロバイダー／モデルレジストリ、ヘッダー設定、モデルエイリアス
├── utils/               # TLSクライアント、プロキシfetch／dispatcher、ネットワークヘルパー
├── index.ts             # ワークスペースのエントリーポイント
├── package.json         # ワークスペースマニフェスト
├── tsconfig.json        # ワークスペースのTS設定
└── types.d.ts           # ワークスペースの型宣言
```

### `open-sse/mcp-server/`

| パス                        | 目的                                                                     |
| --------------------------- | ------------------------------------------------------------------------ |
| `server.ts`                 | MCPサーバーのライフサイクル（stdio + HTTPトランスポート）                |
| `httpTransport.ts`          | HTTP Streamable + SSEトランスポート（`/api/mcp/sse`、`/api/mcp/stream`） |
| `audit.ts`                  | `mcp_tool_audit`テーブルへの監査ログ記録                                 |
| `scopeEnforcement.ts`       | ツールごとのスコープ検証                                                 |
| `runtimeHeartbeat.ts`       | `DATA_DIR/runtime/mcp-heartbeat.json`へのヘルスハートビート              |
| `descriptionCompressor.ts`  | コンテキストを節約するためにツール説明メタデータを圧縮                   |
| `schemas/tools.ts`          | 36個の基本ツール定義 + スコープ                                          |
| `tools/advancedTools.ts`    | 高度なツールの実装                                                       |
| `tools/memoryTools.ts`      | 3個のメモリツール（検索／追加／クリア）                                  |
| `tools/skillTools.ts`       | 4個のスキルツール（一覧／有効化／実行／実行履歴）                        |
| `tools/compressionTools.ts` | 5個の圧縮ツール                                                          |
| `README.md`                 | 内部MCPサーバーREADME（`docs/frameworks/MCP-SERVER.md`から相互リンク）   |

---

## `electron/` — デスクトップラッパー

| ファイル         | 目的                                                                               |
| ---------------- | ---------------------------------------------------------------------------------- |
| `main.js`        | Electronメインプロセス（BrowserWindow、組み込みNext.jsサーバー、トレイ、自動更新） |
| `preload.js`     | IPCブリッジ（contextBridge → `window.omniroute`）                                  |
| `package.json`   | electron-builder設定 + Electron 41 + electron-builder 26.10の依存関係              |
| `assets/`        | アプリアイコン（Windows .ico、macOS .icns、Linux .png）                            |
| `dist-electron/` | ビルド出力（gitignore対象）                                                        |
| `types.d.ts`     | レンダラーブリッジの型宣言                                                         |
| `README.md`      | 内部Electron README（`docs/guides/ELECTRON_GUIDE.md`も参照）                       |

---

## `bin/` — CLI

| ファイル                                                                                                    | 目的                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | メイン CLI エントリ — `omniroute serve`、`omniroute setup`、`omniroute doctor`、`omniroute providers`、`omniroute combos` など |
| `reset-password.mjs`                                                                                        | スタンドアロンのパスワードリセット CLI                                                                                         |
| `cli/commands/setup.mjs`                                                                                    | 対話型および非対話型のセットアップウィザード                                                                                   |
| `cli/commands/doctor.mjs`                                                                                   | システム正常性診断（8 項目以上のチェック）                                                                                     |
| `cli/commands/providers.mjs`                                                                                | プロバイダーの一覧表示・テスト・検証                                                                                           |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI ヘルパーモジュール                                                                                                         |
| `cli/tray/tray.ts`                                                                                          | システムトレイ統合（クロスプラットフォーム：Windows では NotifyIcon、macOS/Linux では systray2）                               |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon バックエンド（Windows、新規バイナリ不要）                                                                |
| `cli/tray/autostart.ts`                                                                                     | クロスプラットフォームの自動起動（LaunchAgent / .desktop / レジストリ）                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 段階の SQLite ドライバー解決チェーン（バンドル済み → ランタイム → 遅延インストール → node:sqlite → sql.js）                  |
| `cli/runtime/magicBytes.mjs`                                                                                | バイナリのマジックバイト検証（ELF / Mach-O / Mach-O fat / PE）                                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — postinstall 時または初回起動時にドライバーを事前解決                                                      |
| `nodeRuntimeSupport.mjs`                                                                                    | インストール時にサポート対象の Node.js バージョンを検証                                                                        |

---

## `skills/` — 公開エージェントスキル

| ファイル                     | 目的                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 外部AIエージェント（Claude Desktop、ChatGPT、Cursor、Cline）向けの10個のスキルマニフェスト |

---

## `scripts/` — ビルドおよびチェックスクリプト

| スクリプト                          | 目的                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `run-next.mjs`                      | 環境変数の読み込みを行う開発／起動ランナー                                         |
| `build-next-isolated.mjs`           | スタンドアロンビルド（Next.js 16スタンドアロン）                                   |
| `prepublish.ts`                     | `npm pack` 前のパッケージ準備                                                      |
| `postinstall.mjs`                   | 初回インストール時に `.env.example` から `.env` を自動作成                         |
| `sync-env.mjs`                      | `.env` のキーを `.env.example` と再同期                                            |
| `check-cycles.mjs`                  | 循環依存関係を検出                                                                 |
| `check-route-validation.mjs`        | すべてのAPIルートにZodバリデーションがあることを検証                               |
| `check-t11-any-budget.mjs`          | ファイルごとに明示的な `any` の許容数を適用                                        |
| `check-docs-sync.mjs`               | ドキュメントのバージョン同期を検証（既存のpre-commit）                             |
| **`check-env-doc-sync.mjs`**        | 新規：コード内の環境変数と `.env.example` および `ENVIRONMENT.md` を相互照合       |
| **`check-docs-counts-sync.mjs`**    | 新規：実行エンジン、戦略、OAuth、A2Aスキルの件数がドキュメントと一致することを検証 |
| **`check-deprecated-versions.mjs`** | 新規：ドキュメント内の古いバージョン／日付を検出                                   |
| `check-supported-node-runtime.ts`   | 現在のNodeバージョンがサポート対象であることを検証                                 |
| `check-pr-test-policy.mjs`          | 本番コードの変更に対する「テスト必須」ルールを適用                                 |
| **`gen-provider-reference.ts`**     | 新規：カタログから `docs/reference/PROVIDER_REFERENCE.md` を自動生成               |
| `i18n/generate-multilang.mjs`       | Google Translateを使用してUI文字列とドキュメントを翻訳                             |
| `i18n_autotranslate.py`             | LLMベースのドキュメント翻訳パイプライン                                            |
| `validate_translation.py`           | ロケールごとの翻訳検証                                                             |
| `check_translations.py`             | コード側のi18nキーをチェック                                                       |
| `run-playwright-tests.mjs`          | Playwright E2Eランナー                                                             |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2Eランナー                                                                |
| `run-ecosystem-tests.mjs`           | エコシステム（プロバイダー統合）テスト                                             |
| `test-report-summary.mjs`           | カバレッジ概要のMarkdownを生成                                                     |
| `smoke-electron-packaged.mjs`       | パッケージ化されたElectronビルドのスモークテスト                                   |
| `native-binary-compat.mjs`          | ネイティブ依存関係（`better-sqlite3`）がElectronのNodeと一致することを検証         |
| `validate-pack-artifact.ts`         | npm packの出力を検証                                                               |
| `responses-ws-proxy.mjs`            | Codex Responses API用のWebSocketブリッジ                                           |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` エンドポイント用のWebSocketブリッジ                                   |
| `standalone-server-ws.mjs`          | スタンドアロンWSサーバーランナー                                                   |
| `system-info.mjs`                   | サポート用のシステム／ランタイム情報を出力                                         |
| `healthcheck.mjs`                   | 1回限りのヘルスチェック（Docker HEALTHCHECKで使用）                                |
| `uninstall.mjs`                     | クリーンアンインストールスクリプト                                                 |

---

## `docs/` — 公開ドキュメント（ルートファイル7件 + サブディレクトリ17件）

### トップレベルガイド

| ドキュメント                | 目的                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高レベルのアーキテクチャ、サブシステムマップ、ダッシュボード画面                  |
| `CODEBASE_DOCUMENTATION.md` | エンジニアリングリファレンス：ディレクトリ、モジュール、規約                      |
| `FEATURES.md`               | v3.8のハイライトを含む機能マトリックス                                            |
| `USER_GUIDE.md`             | エンドユーザーマニュアル（セットアップ、モデル、コンボ、CLI、音声など）           |
| `API_REFERENCE.md`          | 認証モデルを含むAPIエンドポイントリファレンス                                     |
| `openapi.yaml`              | OpenAPI 3.0仕様（121パス）                                                        |
| `SETUP_GUIDE.md`            | インストール方法（npm、npx、Docker、Electron、Termux、ソース）                    |
| `ENVIRONMENT.md`            | すべての環境変数（約800件を文書化、`.env.example`は約3,050行）                    |
| `TROUBLESHOOTING.md`        | 一般的なエラー + v3.8.0の既知の問題                                               |
| `RELEASE_CHECKLIST.md`      | 完全なリリースフロー（スキル、husky、Conventional Commits、デプロイ）             |
| `COVERAGE_PLAN.md`          | カバレッジ目標と現在の状況                                                        |
| `FREE_TIERS.md`             | 厳選された無料枠プロバイダー（48以上の無料枠 + 11のOAuth）                        |
| `CLI-TOOLS.md`              | 外部CLI統合 + 内部OmniRoute CLI                                                   |
| `I18N.md`                   | i18nアーキテクチャ、言語の追加方法、42ロケール                                    |
| `UNINSTALL.md`              | クリーンアンインストールの手順                                                    |
| `PROVIDER_REFERENCE.md`     | 355プロバイダーの**自動生成**カタログ（再生成：`npm run gen:provider-reference`） |

### サブシステムの詳細解説

| ドキュメント                                | 目的                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                             | MCPサーバー：110ツール、3トランスポート、33スコープ、RESTエンドポイント           |
| `A2A-SERVER.md`                             | A2A v0.3：JSON-RPC、6スキル、RESTヘルパー、エージェントカード                     |
| `AGENT_PROTOCOLS_GUIDE.md`                  | 統合ガイド：A2A、ACP、Cloud Agentsの比較                                          |
| `CLOUD_AGENT.md`                            | Codex Cloud / Devin / Julesのオーケストレーション                                 |
| `SKILLS.md`                                 | スキルフレームワーク（組み込み + マーケットプレイス + SkillsSH + サンドボックス） |
| `RADAR.md`                                  | Radarの無料モデルカタログオーバーレイ（`RADAR_ENABLED`、デフォルトでは無効）      |
| `MEMORY.md`                                 | メモリシステム（SQLite FTS5 + Qdrant）                                            |
| `EVALS.md`                                  | 評価フレームワーク（スイート、実行、ルーブリック）                                |
| `GUARDRAILS.md`                             | PIIマスカー、プロンプトインジェクション、ビジョンブリッジ                         |
| `COMPLIANCE.md`                             | 監査ログ、保持、noLogによるオプトアウト                                           |
| `WEBHOOKS.md`                               | HMAC署名付きWebhook配信                                                           |
| `REASONING_REPLAY.md`                       | `reasoning_content`用のハイブリッドメモリ/SQLiteキャッシュ                        |
| `AUTHZ_GUIDE.md`                            | 認可パイプライン（`classify` → `policies` → `enforce`）                           |
| `RESILIENCE_GUIDE.md`                       | サーキットブレーカー + クールダウン + モデルロックアウト                          |
| `docs/security/STEALTH_GUIDE.md`（gitのみ） | TLSフィンガープリンティング（JA3/JA4）、Claude Code CCH、MITM証明書               |
| `AUTO-COMBO.md`                             | Auto Comboエンジン（16要素スコアリング、6モードパック、仮想ファクトリー）         |

### 圧縮

| ドキュメント                    | 目的                                          |
| ------------------------------- | --------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | 圧縮モードの概要 + ロードマップ               |
| `COMPRESSION_ENGINES.md`        | Caveman + RTKエンジン、レジストリコントラクト |
| `COMPRESSION_RULES_FORMAT.md`   | CavemanルールパックのJSONスキーマ             |
| `COMPRESSION_LANGUAGE_PACKS.md` | 言語別ルールパック一覧                        |
| `RTK_COMPRESSION.md`            | RTK宣言型パイプライン（49フィルター）         |

### デプロイ

| ドキュメント                 | 目的                                                                     |
| ---------------------------- | ------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Dockerビルド、プロファイル（base/cli/host/cliproxyapi）、Redisサイドカー |
| `VM_DEPLOYMENT_GUIDE.md`     | 汎用VM/VPSデプロイ（Ubuntu/Debian + nginx + systemd）                    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.ioデプロイ（現在は中国語版のみ）                                     |
| `TERMUX_GUIDE.md`            | Termuxを使用したAndroidヘッドレス運用                                    |
| `PWA_GUIDE.md`               | プログレッシブWebアプリのインストール + Service Worker                   |
| `ELECTRON_GUIDE.md`          | デスクトップアプリのビルド + 署名 + 配布                                 |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                   |
| `PROXY_GUIDE.md`             | 4段階のアウトバウンドプロキシ + 1proxyマーケットプレイス                 |

### サブディレクトリ

| サブディレクトリ      | 用途                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | ローカライズされたドキュメント翻訳（41ロケール）                                                                                                                                                                                      |
| `docs/screenshots/`   | ガイド用の画像アセット                                                                                                                                                                                                                |
| `_tasks/superpowers/` | superpowers（`writing-plans`/`brainstorming`）による計画・仕様および調査資料 — 分離され、個別にバージョン管理されるリポジトリで、メインツリーでは gitignore の対象です。CLAUDE.md →「計画・調査アーティファクト」を参照してください。 |

---

## `tests/` — テストスイート

| サブディレクトリ                     | 種別                                         | ランナー                                      |
| ------------------------------------ | -------------------------------------------- | --------------------------------------------- |
| `tests/unit/`                        | ユニットテスト（約4,800ファイル、最速）      | Node ネイティブテストランナー                 |
| `tests/integration/`                 | 複数モジュール + DB 統合テスト               | Node ネイティブテストランナー（並行実行数 1） |
| `tests/e2e/`                         | UI + ワークフロー E2E                        | Playwright                                    |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A 実クライアント E2E                 | カスタムプロトコルクライアント                |
| `tests/e2e/ecosystem.test.ts`        | プロバイダー統合（ネットワークアクセスあり） | Node ネイティブテストランナー                 |

---

## `public/` — 静的アセット

| パス                | 用途                                                                         |
| ------------------- | ---------------------------------------------------------------------------- |
| `public/`（ルート） | ファビコン、robots.txt、マニフェスト、サービスワーカー、マーケティング用画像 |
| `public/providers/` | プロバイダーのロゴ PNG/SVG（ダッシュボードで使用）                           |

---

## `config/` — 静的設定 + 品質ゲートの状態

配布用の設定テンプレートと、コミット済みの品質ゲートベースライン
（ルートを簡潔に保つため、v3.8.26 でリポジトリルートからここへ移動）。

| パス                                          | 用途                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | ロケール一覧 + メタデータ（42ロケールという数の正規ソース）                           |
| `config/i18n-schema.json`                     | `i18n.json` を検証する JSON スキーマ                                                  |
| `config/payloadRules.json`                    | アップストリームペイロードのサニタイズルール                                          |
| `config/quality/quality-baseline.json`        | 複数メトリクスのラチェットベースライン（`scripts/quality/check-quality-ratchet.mjs`） |
| `config/quality/complexity-baseline.json`     | 固定された ESLint 複雑度ベースライン（`check-complexity.mjs`）                        |
| `config/quality/duplication-baseline.json`    | 固定された jscpd 重複ベースライン（`check-duplication.mjs`）                          |
| `config/quality/file-size-baseline.json`      | 固定されたファイル単位のサイズベースライン（`check-file-size.mjs`）                   |
| `config/quality/test-discovery-baseline.json` | 固定された孤立テストのベースライン（`check-test-discovery.mjs`）                      |
| `config/quality/dependency-allowlist.json`    | 承認済み依存関係の許可リスト（`check-deps.mjs`）                                      |
| `config/quality/.license-allowlist.json`      | SPDX ライセンス許可リスト（`check-licenses.mjs`）                                     |
| `config/quality/quality-metrics.json`         | 一時的に収集されるメトリクス（`collect-metrics.mjs` により生成、**gitignored**）      |

---

## `.github/` — GitHub 連携

| パス                               | 用途                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions の CI/CD ワークフロー（lint、テスト、カバレッジ、リリース） |
| `.github/ISSUE_TEMPLATE/`          | バグ／機能リクエスト用 Issue テンプレート                                  |
| `.github/pull_request_template.md` | PR テンプレート                                                            |
| `.github/dependabot.yml`           | 依存関係更新の設定                                                         |

---

## `.husky/` — Git フック

| ファイル     | 用途                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged + check-docs-sync + check:any-budget:t11` を実行                    |
| `pre-push`   | 現在は無効（コメントアウト済み）。`npm run test:unit` を手動で実行してください。 |
| `_/`         | Husky の内部ファイル                                                             |

---

## `.claude/` — Claude Code スラッシュコマンド

| ファイル                                            | 用途                                                    |
| --------------------------------------------------- | ------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — バージョン更新＋変更履歴の自動生成 |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — 完全なリリースワークフロー     |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS へデプロイ                                          |
| `commands/capture-release-evidences-cc.md`          | 新機能をブラウザーで記録し、WebP として保存             |
| `commands/review-{prs,discussions}-cc.md`           | GitHub の PR／ディスカッションをトリアージ              |
| `commands/{review-issues,implement-features}-cc.md` | Issue ワークフロー                                      |
| `settings.local.json`                               | プロジェクトごとの Claude Code 設定                     |

---

## `.agents/` — 汎用エージェントワークフロー（Codex / Cursor / その他）

| パス                     | 用途                                                    |
| ------------------------ | ------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 個のワークフロー定義（`.claude/commands/` のミラー） |
| `skills/<name>/SKILL.md` | Codex Execution Notes を含む 9 個のスキル定義           |

> **注:** 現在、ワークフローとコマンドはバイト単位で同一です。`.agents/` が別のエージェントランタイム（Codex）を対象としている場合、それぞれのバリアントには意味のある相違が必要です。

---

## `_ideia/`、`_mono_repo/`、`_references/`、`_tasks/` — ツリー外

これらのアンダースコアで始まるディレクトリには、配布対象外のコンテンツが格納されています。

- **`_ideia/`** — 設計メモ（defer / notfit / viable カテゴリ）
- **`_mono_repo/`** — 過去のサブプロジェクト（omnirouteCloud、omnirouteSite、vscode-extension）
- **`_references/`** — 開発時の相互参照用に用意された、関連 OSS プロジェクト（LiteLLM、9router、ClawRouter、CLIProxyAPI、modelrelay、new-api など）の読み取り専用クローン
- **`_tasks/`** — リリースごとのタスク追跡ファイル（非公式）

`npm pack` の出力には含まれません。`.npmignore` を参照してください。

---

## 生成物 / Git 管理対象外

| パス                   | 用途                            |
| ---------------------- | ------------------------------- |
| `node_modules/`        | npm の依存関係                  |
| `.next/`               | Next.js のビルド出力            |
| `coverage/`            | c8 のカバレッジレポート         |
| `logs/`                | ランタイムログ                  |
| `package/`             | npm pack のステージング領域     |
| `.playwright-mcp/`     | Playwright MCP のテスト成果物   |
| `.issues/`             | ローカルの Issue キャッシュ     |
| `tsconfig.tsbuildinfo` | TS のインクリメンタルキャッシュ |

---

## ナビゲーションのヒント

- **初めてコントリビュートする場合** `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md` の順に読んでください。
- **プロバイダーを追加する場合** `docs/architecture/ARCHITECTURE.md § 新しいプロバイダーの追加` に従い、`docs/reference/PROVIDER_REFERENCE.md` と照合してください。
- **ルートを追加する場合** `docs/architecture/ARCHITECTURE.md § 新しい API ルートの追加` と `src/shared/validation/schemas.ts` を参照してください。
- **MCP ツールを追加する場合** `docs/frameworks/MCP-SERVER.md § ツールの追加` を参照してください。
- **A2A スキルを追加する場合** `docs/frameworks/A2A-SERVER.md § 新しいスキルの追加` を参照してください。
- **ローカルで実行する場合** `docs/guides/SETUP_GUIDE.md` を参照してください。
- **デプロイする場合** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md` を参照してください。
- **リリースする場合** `docs/ops/RELEASE_CHECKLIST.md`（および Claude Code スキル `/generate-release-cc`）を参照してください。
