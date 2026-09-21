# Contributing to OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## 開発環境のセットアップ

### 前提条件

- **Node.js** `>=22.22.3 <23`、または `>=24.0.0 <27`（推奨: 24 LTS）
- **npm** 10+

> **npm v11+ ユーザー（Node 24+）:** `npm install` の実行後、ネイティブモジュールがインストールされていることを確認してください:
> `node -e "require('better-sqlite3')"`。`MODULE_NOT_FOUND` で失敗する場合は、
> `npm approve-scripts better-sqlite3 && npm install` を実行してください。詳細は
> [トラブルシューティング](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)を参照してください。

- **Git**

### クローンとインストール

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 環境変数

```bash
# テンプレートから .env を作成
cp .env.example .env

# 必要なシークレットを生成
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

開発用の主要な変数:

| 変数                   | 開発環境のデフォルト     | 説明                       |
| ---------------------- | ------------------------ | -------------------------- |
| `PORT`                 | `20128`                  | サーバーポート             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | フロントエンドのベース URL |
| `JWT_SECRET`           | （上記で生成）           | JWT 署名用シークレット     |
| `INITIAL_PASSWORD`     | `CHANGEME`               | 初回ログイン用パスワード   |
| `APP_LOG_LEVEL`        | `info`                   | ログの詳細レベル           |

### ダッシュボード設定

ダッシュボードには、環境変数でも設定可能な機能を切り替えるための UI トグルがあります:

| 設定場所    | トグル           | 説明                                 |
| ----------- | ---------------- | ------------------------------------ |
| 設定 → 詳細 | デバッグモード   | デバッグリクエストログを有効化（UI） |
| 設定 → 一般 | サイドバーの表示 | サイドバーのセクションを表示/非表示  |

これらの設定はデータベースに保存され、再起動後も維持されます。設定されている場合は、環境変数のデフォルト値より優先されます。

### ローカルでの実行

```bash
# 開発モード（ホットリロード）
npm run dev

# 本番ビルド
npm run build    # next build → .build/next/、その後 assembleStandalone → dist/
npm run start

# コントリビューターによる変更向けの高速なバックエンド/API 専用コンパイル
npm run build:contributor

# リリースビルド（クリーン再ビルド + HEAD センチネル — デプロイに必須）
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA を書き込み

# 一般的なポート設定
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

コントリビュータービルドでは、コンパイルのみの検証を行います。スタンドアロン
ディストリビューションの構成や、オプションのネイティブパッケージングアセットのビルドは行いません。配布可能なバンドルを
検証する必要がある場合は、通常の本番ビルドを使用してください。

### ビルド出力の構成

| ディレクトリ | 内容                                                                        | 追跡対象 |
| ------------ | --------------------------------------------------------------------------- | -------- |
| `src/`       | アプリケーションソース（TypeScript / TSX）                                  | はい     |
| `.build/`    | 中間生成物 — `next build` の出力（gitignore 対象、`distDir = .build/next`） | いいえ   |
| `dist/`      | 配布可能なバンドル — `assembleStandalone` によって構成（gitignore 対象）    | いいえ   |

ビルドパイプラインは単一パスです:

```
npm run build
  └─ next build → .build/next/standalone  （Next.js の出力）
  └─ assembleStandalone()                 （standalone + static + public + ネイティブアセットをコピー）
       └─ 出力: dist/                     （server.js、.next/static/、public/、node_modules/）
```

`npm run build:release` はさらに、最初に両方のディレクトリをクリーンアップし、
デプロイ整合性センチネルとして `dist/BUILD_SHA`（= `git rev-parse --short HEAD`）を書き込みます。

`npm run build:contributor` はバックエンド専用のビルドプロファイルを使用します。ビルド中は一時的に
ダッシュボード UI ファイルをスタブ化し、API ルートハンドラーを維持したまま、ビルド後に元のファイルを
復元します。ダッシュボード UI に影響する変更や完全なリリース検証には `npm run build` を使用してください。
コントリビュータープロファイルはリリースビルドの代替にはなりません。

> **VPS デプロイに関する注意:** リモートイメージディレクトリ `/usr/lib/node_modules/omniroute/app/`
> に変更はありません。デプロイスキルは `dist/` の内容をそこへ rsync します。
> 変更されたのは、リポジトリ内のビルド出力パスのみです（`app/` → `dist/`）。

デフォルト URL:

- **ダッシュボード**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git ワークフロー

> ⚠️ **`main` に直接コミットしないでください。** 必ずフィーチャーブランチを使用してください。
>
> **PR のベース:** `main` ではなく、アクティブな `release/vX.Y.Z` ブランチを対象にしてください。
> ブランチごとのリリース + リリース時のタグ付けモデルについては、
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) を参照してください。

```bash
# アクティブなリリースの先端からブランチを作成（例: release/v3.8.49）
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... 変更を行う ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 としてプルリクエストを作成
```

### ブランチの命名規則

| プレフィックス | 目的                 |
| -------------- | -------------------- |
| `feat/`        | 新機能               |
| `fix/`         | バグ修正             |
| `refactor/`    | コードの再構成       |
| `docs/`        | ドキュメントの変更   |
| `test/`        | テストの追加・修正   |
| `chore/`       | ツール、CI、依存関係 |

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) に従ってください。

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

スコープ（v3.8）: `db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`。

---

## テストの実行

```bash
# すべてのテスト（unit + vitest + ecosystem + e2e）
npm run test:all

# 単一のテストファイル（Node.js ネイティブテストランナー — ほとんどのテストでこれを使用）
node --import tsx/esm --test tests/unit/your-file.test.ts

# 変更の影響を受けるユニットテストのみ（CI ゲートと同じ TIA セレクター、#8084）
npm run test:scoped            # 直前のコミット（またはワーキングツリー）の変更
npm run test:scoped:staged     # ステージ済みの変更のみ — pre-commit 実行との組み合わせに最適
npm run test:scoped:full       # 最初にインポートグラフマップを再構築（ファイルの追加・移動後）
# 終了コード 1 +「run the full suite」は、ハブファイル（tsconfig、package.json、…）または
# マッピングされていないソースが変更されたことを意味します — セレクターは安全側に倒れ、暗黙にスキップすることはありません。

# Vitest（MCP サーバー、autoCombo、キャッシュ）
npm run test:vitest

# E2E テスト（Playwright が必要）
npm run test:e2e

# プロトコルクライアントの E2E（MCP トランスポート、A2A）
npm run test:protocols:e2e

# エコシステム互換性テスト
npm run test:ecosystem

# カバレッジゲート：ステートメント／行／関数／分岐の 60%
npm run test:coverage
npm run coverage:report

# lint + フォーマットチェック
npm run lint
npm run check

# ゲート付きの実アップストリーム combo スモークテスト（VPS へのアクセス権 + 実プロバイダーのクレジットが必要）
# 実際のプロバイダーにアクセスします — 少額の費用がかかります。CI では決して実行されません。ゲートがなければ正常にスキップします。
# 必要条件：ssh root@192.168.0.15 へのアクセス権（VPS から読み取り専用 DB スナップショットを読み込みます）。
RUN_COMBO_LIVE=1 npm run test:combo:live

# フェーズ 3 の VPS ライブスモークテスト — 純粋な Node ESM スクリプトで、稼働中の .15 サーバーに直接アクセスします。
# 必要条件：ssh root@192.168.0.15 へのアクセス権（combo は SSH sqlite 経由で作成／破棄されます）。
# 実際のプロバイダーにアクセスします（少額の費用がかかります）。__live_test__* combo のみ作成／削除します。CI では決して実行されません。
# .15 では REQUIRE_API_KEY=false のため API キーは不要ですが、設定されている場合は COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY を使用します。
npm run test:combo:live:vps              # 7 つの HTTP シナリオ（priority/round-robin/weighted/cost/fusion/auto + health）
npm run test:combo:live:vps:failover     # 実際のプロバイダー間フェイルオーバーシナリオを追加（合計 8）
```

カバレッジに関する注記：

- `npm run test:coverage` はメインのユニットテストスイートのソースカバレッジを測定し、`tests/**` を除外して、`open-sse/**` を含めます
- プルリクエストでは、ステートメント／行／関数／分岐のカバレッジゲートを **60%以上** に維持する必要があります
- PR で `src/`、`open-sse/`、`electron/`、または `bin/` の本番コードを変更する場合、同じ PR で自動テストを追加または更新する必要があります
- `npm run coverage:report` は、直近のカバレッジ実行によるファイルごとの詳細レポートを出力します
- `npm run test:coverage:legacy` は、過去との比較用に以前の指標を維持します
- 段階的なカバレッジ改善ロードマップについては、`docs/ops/COVERAGE_PLAN.md` を参照してください

### プルリクエストの要件

PR を作成する前に、
[コントリビューションのゴールデンパス](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)に従って、変更内容に対応する
重点的なループを実行してください。完全なユニットテストスイート（4 つの CI シャード）、Vitest、**60%以上**のカバレッジゲート、
および本番ビルドは CI が担当します — これらをローカルで実行しても、PR チェックですでに得られる以上の情報は得られず、
小規模なマシンではホストのリソースを使い果たす可能性があります（#8084）：

- 変更をカバーするテストファイルを実行します：`node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` を実行します
- 本番コードを変更する場合は、必ず同じ PR で自動テストを追加または更新します
- 本番コードを変更した場合は、変更または追加したテストファイルを PR の説明に記載します
- CI にプロジェクトのシークレットが設定されている場合は、PR の SonarQube 結果を確認します

現在のテスト状況：以下をカバーする **122 個のユニットテストファイル**：

- プロバイダーのトランスレーターとフォーマット変換
- レート制限、サーキットブレーカー、レジリエンス
- セマンティックキャッシュ、冪等性、進捗追跡
- データベース操作とスキーマ（21 個の DB モジュール）
- OAuth フローと認証
- API エンドポイントの検証（Zod v4）
- MCP サーバーツールとスコープの強制
- Memory および Skills システム

---

## コードスタイル

- **ESLint** — コミット前に `npm run lint` を実行する
- **Prettier** — コミット時に `lint-staged` によって自動フォーマットされる（スペース2個、セミコロン、二重引用符、行幅100文字、es5形式の末尾カンマ）
- **TypeScript** — すべての `src/` コードでは `.ts`/`.tsx` を使用し、`open-sse/` では `.ts`/`.js` を使用する。TSDoc（`@param`、`@returns`、`@throws`）でドキュメント化する
- **`eval()` 禁止** — ESLintによって `no-eval`、`no-implied-eval`、`no-new-func` を強制する
- **Zodによる検証** — すべてのAPI入力検証にZod v4スキーマを使用する
- **命名規則**: ファイル = camelCase/kebab-case、コンポーネント = PascalCase、定数 = UPPER_SNAKE

### エラー処理 / 空のcatchブロック

説明のない `catch` を決して残さないでください。次の2つのカテゴリのいずれかに分類してください（「SSEストリームでエラーを黙って握りつぶしてはならない」という厳格なルールを運用可能な形にします）。

- **意図的（独自のベストエフォートなクリーンアップ/テレメトリ）** — ここでの失敗は想定内であり、
  無害です。理由を説明する1行のコメントを追加し、ログは出力しないでください（リクエストごとのログ出力によって
  生じるノイズを避けるための規約です）。

  ```ts
  } catch {} // クライアント切断後に、すでに閉じられたコントローラーを閉じることは想定内
  ```

- **ログを出力すべきもの（外部コード/呼び出し元から提供されたコード、または握りつぶすことで制御フローが変わる場合）** —
  catchは維持し（ストリームを中断させないようにし）、コンテキストを含む `console.debug`/`warn` を出力して、
  失敗を検出できるようにしてください。

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailureコールバックエラー:", e);
  }
  ```

適用例については、`open-sse/utils/stream.ts` および `open-sse/utils/streamHandler.ts` を参照してください。

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## 新しいプロバイダーの追加

### ステップ 1: プロバイダー定数を登録する

`src/shared/constants/providers.ts` に追加します。モジュールの読み込み時に Zod で検証されます。

### ステップ 2: Executor を追加する（カスタムロジックが必要な場合）

ベース Executor を継承する Executor を `open-sse/executors/your-provider.ts` に作成します。

### ステップ 3: Translator を追加する（OpenAI 形式ではない場合）

リクエスト／レスポンスの Translator を `open-sse/translator/` に作成します。

### ステップ 4: OAuth 設定を追加する（OAuth ベースの場合）

OAuth 認証情報を `src/lib/oauth/constants/oauth.ts` に、サービスを `src/lib/oauth/services/` に追加します。

上流プロバイダーが公開 CLI／ブラウザバンドル内で公開 OAuth client_id/secret または Firebase Web API キーを配布している場合、文字列リテラルとして埋め込んでは**なりません**。`open-sse/utils/publicCreds.ts` の `resolvePublicCred()` を使用し、マスクされたバイトエントリを `EMBEDDED_DEFAULTS` に追加してください。必須のワークフロー全体については、[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) を参照してください。

ハンドラー／Executor 内では、クライアントに送信されるエラーメッセージを、必ず `open-sse/utils/error.ts` の `buildErrorBody()`／`sanitizeErrorMessage()` に通してください。生の `err.stack` や `err.message` を Response 本文に含めてはなりません。詳細は [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) を参照してください。

### ステップ 5: モデルを登録する

モデル定義を `open-sse/config/providerRegistry.ts` に追加します。

### ステップ 6: テストを追加する

最低限、以下を網羅する単体テストを `tests/unit/` に作成します。

- プロバイダーの登録
- リクエスト／レスポンスの変換
- エラー処理

---

## プルリクエストチェックリスト

- [ ] テストが成功する（`npm test`）
- [ ] Lint が成功する（`npm run lint`）
- [ ] ビルドが成功する（`npm run build`）
- [ ] 新しい公開関数およびインターフェースに TypeScript の型が追加されている
- [ ] ハードコードされたシークレットやフォールバック値がない
- [ ] 公開アップストリーム認証情報は、リテラルではなく `resolvePublicCred()` を介して埋め込まれている（[`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) を参照）
- [ ] エラーレスポンスは `buildErrorBody()` / `sanitizeErrorMessage()` を経由している — レスポンス本文に未加工のスタックトレースを含めない（[`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) を参照）
- [ ] シェルコマンド（`exec` / `spawn`）では、実行時の値を文字列補間ではなく `env` 経由で渡している
- [ ] すべての入力が Zod スキーマで検証されている
- [ ] ユーザー向けの変更について、`changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` 以下に変更履歴の**フラグメント**が追加されている（[`changelog.d/README.md`](./changelog.d/README.md) を参照）— `CHANGELOG.md` を直接編集しては**ならない**。フラグメントはリリース時に集約され、PR 間で競合することはない
- [ ] ドキュメントが更新されている（該当する場合）
- [ ] 新しい CodeQL / Secret-Scanning アラートが発生していない。または、各アラートが関連する `docs/security/` ドキュメントを参照した技術的根拠とともに却下されている
- [ ] 子プロセスを起動するルート（`/api/mcp/`、`/api/cli-tools/runtime/`）が `src/server/authz/routeGuard.ts` で `isLocalOnlyPath()` として分類されている — [ハードルール #15](docs/security/ROUTE_GUARD_TIERS.md) を参照
- [ ] コミットメッセージに `Co-Authored-By` トレーラーがない — コミットはリポジトリ所有者の Git ID のみで作成されたものとして表示されなければならない（ハードルール #16）

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## ヘルプ

- **アーキテクチャ**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)を参照してください
- **API リファレンス**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)を参照してください
- **セキュリティドキュメント**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)、[`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)、[`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)、[`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **運用ドキュメント**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **課題**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: アーキテクチャ上の意思決定記録については、`docs/adr/`を参照してください
