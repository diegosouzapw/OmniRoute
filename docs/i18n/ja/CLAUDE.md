# CLAUDE.md (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

このファイルは、このリポジトリ内のコード作業時にClaude Code (claude.ai/code) に対するガイダンスを提供します。

## クイックスタート

```bash
npm install                    # 依存関係をインストール（.env.example から .env を自動生成）
npm run dev                    # http://localhost:20128 での開発サーバー
npm run build                  # プロダクションビルド（Next.js 16 スタンドアロン）
npm run lint                   # ESLint（エラーは0件予想; 警告は既存）
npm run typecheck:core         # TypeScript チェック（クリーンであるべき）
npm run typecheck:noimplicit:core  # 厳密チェック（暗黙の any はなし）
npm run test:coverage          # ユニットテスト + カバレッジゲート（75/75/75/70 — ステートメント/行/関数/ブランチ）
npm run check                  # lint + テストの組み合わせ
npm run check:cycles           # 循環依存関係を検出
```

### テストの実行

```bash
# 単一のテストファイル（Node.js ネイティブテストランナー — ほとんどのテスト）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP サーバー、自動コンボ、キャッシュ)
npm run test:vitest

# すべてのスイート
npm run test:all
```

完全なテストマトリックスについては、`CONTRIBUTING.md` → "テストの実行" を参照してください。深いアーキテクチャについては、`AGENTS.md` を参照してください。

---

## プロジェクトの概要

**OmniRoute** — 統一されたAIプロキシ/ルーター。1つのエンドポイント、160以上のLLMプロバイダー、自動フォールバック。

| レイヤー           | 場所                    | 目的                                                                                  |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------- |
| APIルート          | `src/app/api/v1/`       | Next.js アプリルーター — エントリーポイント                                           |
| ハンドラー         | `open-sse/handlers/`    | リクエスト処理（チャット、埋め込みなど）                                              |
| エグゼキューター   | `open-sse/executors/`   | プロバイダー固有のHTTPディスパッチ                                                    |
| トランスレーター   | `open-sse/translator/`  | フォーマット変換（OpenAI↔Claude↔Gemini）                                              |
| トランスフォーマー | `open-sse/transformer/` | レスポンスAPI ↔ チャット完了                                                          |
| サービス           | `open-sse/services/`    | コンボルーティング、レート制限、キャッシングなど                                      |
| データベース       | `src/lib/db/`           | SQLite ドメインモジュール（45以上のファイル、55のマイグレーション）                   |
| ドメイン/ポリシー  | `src/domain/`           | ポリシーエンジン、コストルール、フォールバックロジック                                |
| MCPサーバー        | `open-sse/mcp-server/`  | 37のツール（30のベース + 3のメモリ + 4のスキル）、3つのトランスポート、約13のスコープ |
| A2Aサーバー        | `src/lib/a2a/`          | JSON-RPC 2.0 エージェントプロトコル                                                   |
| スキル             | `src/lib/skills/`       | 拡張可能なスキルフレームワーク                                                        |
| メモリ             | `src/lib/memory/`       | 永続的な会話メモリ                                                                    |

モノレポ: `src/` (Next.js 16 アプリ)、`open-sse/` (ストリーミングエンジンワークスペース)、`electron/` (デスクトップアプリ)、`tests/`、`bin/` (CLI エントリーポイント)。

---

## リクエストパイプライン

```
Client → /v1/chat/completions (Next.js ルート)
  → CORS → Zod バリデーション → 認証? → ポリシーチェック → プロンプトインジェクションガード
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → キャッシュチェック → レート制限 → コンボルーティング?
      → resolveComboTargets() → handleSingleModel() 各ターゲットごと
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() アップストリーム → リトライ w/ バックオフ
    → レスポンストランスレーション → SSE ストリームまたは JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

API ルートは一貫したパターンに従います: `ルート → CORS プレフライト → Zod ボディバリデーション → オプションの認証 (extractApiKey/isValidApiKey) → API キーポリシーの強制 → ハンドラーデリゲーション (open-sse)`。グローバルな Next.js ミドルウェアはありません — インターセプションはルート固有です。

**コンボルーティング** (`open-sse/services/combo.ts`): 14 の戦略 (優先度、重み付け、フィルファースト、ラウンドロビン、P2C、ランダム、最少使用、コスト最適化、リセット認識、厳密ランダム、自動、lkgp、コンテキスト最適化、コンテキストリレー)。各ターゲットは `handleSingleModel()` を呼び出し、ターゲットごとのエラーハンドリングとサーキットブレーカーチェックで `handleChatCore()` をラップします。9要素の Auto-Combo スコアリングについては `docs/routing/AUTO-COMBO.md` を、3つのレジリエンスレイヤーについては `docs/architecture/RESILIENCE_GUIDE.md` を参照してください。

---

## レジリエンスランタイム状態

OmniRoute には、関連性があるが異なる一時的な失敗メカニズムが3つあります。ルーティングの動作をデバッグする際には、それぞれのスコープを分けておくことが重要です。概要マップについては、[3層レジリエンスダイアグラム](./docs/diagrams/exported/resilience-3layers.svg)を参照してください (出典: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))。

### プロバイダーサーキットブレーカー

**スコープ**: 全体のプロバイダー、例: `glm`, `openai`, `anthropic`。

**目的**: 上流/サービスレベルで繰り返し失敗しているプロバイダーへのトラフィックを停止し、1つの不健康なプロバイダーがすべてのリクエストを遅くしないようにします。

**実装**:

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- チャットゲート/実行配線: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ランタイムステータスAPI: `src/app/api/monitoring/health/route.ts`
- 共有ラッパー: `open-sse/services/accountFallback.ts`
- 永続状態テーブル: `domain_circuit_breakers`

**状態**:

- `CLOSED`: 通常のトラフィックが許可されます。
- `OPEN`: プロバイダーが一時的にブロックされています; 呼び出し元はプロバイダーサーキットオープンのレスポンスを受け取るか、コンボルーティングが別のターゲットにスキップします。
- `HALF_OPEN`: リセットタイムアウトが経過しました; プローブリクエストを許可します。成功するとブレーカーが閉じ、失敗すると再びオープンになります。

**デフォルト** (`open-sse/config/constants.ts`):

- OAuth プロバイダー: 閾値 `3`, リセットタイムアウト `60s`。
- API キープロバイダー: 閾値 `5`, リセットタイムアウト `30s`。
- ローカルプロバイダー: 閾値 `2`, リセットタイムアウト `15s`。

プロバイダーのレベルでの失敗ステータスのみがプロバイダーブレーカーをトリップさせるべきです:

```ts
(408, 500, 502, 503, 504);
```

通常のアカウント/キー/モデルエラーのようなほとんどの `401`, `403`, または `429` ケースで全体のプロバイダーブレーカーをトリップさせないでください。これらは通常、接続クールダウンまたはモデルロックアウトに属します。一般的な API キープロバイダーの `403` は、ターミナルプロバイダー/アカウントエラーとして分類されない限り、回復可能であるべきです。

ブレーカーはレイジーリカバリーを使用し、バックグラウンドタイマーではありません。`OPEN` が期限切れになると、`getStatus()`, `canExecute()`, および `getRetryAfterMs()` などの読み取りが状態を `HALF_OPEN` に更新し、ダッシュボードやコンボ候補ビルダーが期限切れのプロバイダーを永遠に除外しないようにします。

### 接続クールダウン

**スコープ**: 1つのプロバイダー接続/アカウント/キー。

**目的**: 同じプロバイダーの他の接続がリクエストを処理し続けることを許可しながら、1つの不良キー/アカウントを一時的にスキップします。

**実装**:

- 書き込み/更新パス: `src/sse/services/auth.ts::markAccountUnavailable()`
- アカウント選択/フィルタリング: `src/sse/services/auth.ts::getProviderCredentials...`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

プロバイダー接続の重要なフィールド:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

アカウント選択中、接続は次の条件でスキップされます:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

クールダウンもレイジーです: `rateLimitedUntil` が過去にある場合、接続は再び対象となります。成功した使用時に、`clearAccountError()` は `testStatus`, `rateLimitedUntil`, エラーフィールド、および `backoffLevel` をクリアします。

デフォルトの接続クールダウン動作:

- OAuth ベースのクールダウン: `5s`。
- API キー ベースのクールダウン: `3s`。
- API キー `429` は、利用可能な場合、アップストリームリトライヒント (`Retry-After`, リセットヘッダー、または解析可能なリセットテキスト) を優先するべきです。
- 繰り返し回復可能な失敗は指数バックオフを使用します:

```ts
baseCooldownMs * 2 ** failureIndex;
```

アンチサンダリングハードガードは、同じ接続での同時失敗がクールダウンを繰り返し延長したり、`backoffLevel` を二重にインクリメントしたりするのを防ぎます。

ターミナル状態はクールダウンではありません。`banned`, `expired`, および `credits_exhausted` は、資格情報/設定が変更されるか、オペレーターがリセットするまで利用できない状態に留まることを意図しています。ターミナル状態を一時的なクールダウン状態で上書きしないでください。

### モデルロックアウト

**スコープ**: プロバイダー + 接続 + モデル。

**目的**: 1つのモデルが利用できないまたはクォータ制限されている場合に、全体の接続を無効にしないようにします。

例:

- モデルごとのクォータプロバイダーが `429` を返す。
- 1つの欠落したモデルに対して `404` を返すローカルプロバイダー。
- 選択された Grok モードのようなプロバイダー固有のモード/モデルの権限失敗。

モデルロックアウトは `open-sse/services/accountFallback.ts` にあり、同じ接続が他のモデルを処理し続けることを許可します。

### デバッグガイダンス

- プロバイダーのすべてのキーがスキップされている場合、プロバイダーブレーカーの状態と各接続の `rateLimitedUntil`/`testStatus` を確認してください。
- リセットウィンドウ後にプロバイダーが永続的に除外されているように見える場合、コードが生の `state` を読み取っているのではなく、`getStatus()`/`canExecute()` を使用しているか確認してください。
- 1つのプロバイダーキーが失敗するが他は機能するはずの場合、プロバイダーブレーカーよりも接続クールダウンを優先してください。
- 1つのモデルのみが失敗する場合、接続クールダウンよりもモデルロックアウトを優先してください。
- 状態が自己回復するべき場合、将来のタイムスタンプ/リセットタイムアウトと期限切れの状態を更新する読み取りパスが必要です。永続的なステータスは手動の資格情報または設定変更を必要とします。

---

## 主要な規約

### コードスタイル

- **2スペース**、セミコロン、ダブルクォート、100文字幅、es5トレーリングカンマ（lint-stagedを介してPrettierによって強制）
- **インポート**: 外部 → 内部 (`@/`, `@omniroute/open-sse`) → 相対
- **命名**: ファイル=キャメルケース/ケバブケース、コンポーネント=パスカルケース、定数=UPPER_SNAKE
- **ESLint**: `no-eval`、`no-implied-eval`、`no-new-func` = どこでもエラー; `no-explicit-any` = `open-sse/` と `tests/` で警告
- **TypeScript**: `strict: false`、ターゲットES2022、モジュールesnext、解決バンドラー。明示的な型を優先。

### データベース

- **常に** `src/lib/db/` ドメインモジュールを通過する — **決して** ルートやハンドラーで生のSQLを書かない
- **決して** `src/lib/localDb.ts` にロジックを追加しない（再エクスポートレイヤーのみ）
- **決して** `localDb.ts` からバレルインポートしない — 代わりに特定の `db/` モジュールをインポートする
- DBシングルトン: `getDbInstance()` from `src/lib/db/core.ts`（WALジャーナリング）
- マイグレーション: `src/lib/db/migrations/` — バージョン管理されたSQLファイル、冪等性、トランザクション内で実行

### エラーハンドリング

- 特定のエラータイプでtry/catch、pinoコンテキストでログ
- SSEストリーム内でエラーを飲み込まない — クリーンアップのために中止信号を使用
- 適切なHTTPステータスコードを返す（4xx/5xx）

### セキュリティ

- **決して** `eval()`、`new Function()`、または暗黙のevalを使用しない
- すべての入力をZodスキーマで検証する
- 静止状態での資格情報を暗号化する（AES-256-GCM）
- アップストリームヘッダーの拒否リスト: `src/shared/constants/upstreamHeaders.ts` — 編集時にサニタイズ、Zodスキーマ、およびユニットテストを整合させる
- **公開アップストリーム資格情報**（Gemini/Antigravity/WindsurfスタイルのOAuth client_id/secret + 公開CLIから抽出されたFirebase Webキー）: **必ず** `resolvePublicCred()` を介して `open-sse/utils/publicCreds.ts` に埋め込む — **決して** 文字列リテラルとして。必須のパターンについては `docs/security/PUBLIC_CREDS.md` を参照。
- **エラー応答**（HTTP / SSE / 実行者 / MCPハンドラー）: **必ず** `buildErrorBody()` または `sanitizeErrorMessage()` を介してルーティングする `open-sse/utils/error.ts` — **決して** 生の `err.stack` または `err.message` をレスポンスボディに入れない。`docs/security/ERROR_SANITIZATION.md` を参照。
- **変数から構築されたシェルコマンド**: `exec()`/`spawn()` を呼び出す際にランタイム値が必要なスクリプトを使用する場合、`env`オプションを介して渡す（自動的にシェルエスケープされる） — **決して** 信頼できない/外部のパスをスクリプトボディに文字列補間しない。参照: `src/mitm/cert/install.ts::updateNssDatabases`。
- **デフォルトで安全なライブラリ** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): 新しいセキュリティに敏感な表面を追加する際には、カスタム実装よりもHelmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tinkを優先する。

---

## 一般的な修正シナリオ

### 新しいプロバイダーの追加

1. `src/shared/constants/providers.ts` に登録する（ロード時にZodで検証）
2. カスタムロジックが必要な場合は `open-sse/executors/` にエグゼキュータを追加する（`BaseExecutor`を拡張）
3. OpenAI以外の形式の場合は `open-sse/translator/` に翻訳者を追加する
4. OAuthベースの場合は `src/lib/oauth/constants/oauth.ts` にOAuth設定を追加する — アップストリームCLIが公開client_id/secretを出荷する場合は、`resolvePublicCred()`を介して埋め込む（`docs/security/PUBLIC_CREDS.md`を参照）、**決して** リテラルとして
5. `open-sse/config/providerRegistry.ts` にモデルを登録する
6. `tests/unit/` にテストを書く（新しい埋め込みデフォルトを追加した場合はpublicCredsの形状アサーションを含める）

### 新しいAPIルートの追加

1. `src/app/api/v1/your-route/` の下にディレクトリを作成する
2. `GET`/`POST`ハンドラーを持つ `route.ts` を作成する
3. パターンに従う: CORS → Zodボディ検証 → オプションの認証 → ハンドラーの委任
4. ハンドラーは `open-sse/handlers/` に配置する（そこからインポートし、インラインではない）
5. エラー応答は `buildErrorBody()` / `errorResponse()` を使用する `open-sse/utils/error.ts`（自動的にサニタイズされる — 生の `err.stack` または `err.message` をボディに入れない）。`docs/security/ERROR_SANITIZATION.md` を参照。
6. テストを追加する — エラー応答がスタックトレースを漏らさないことを確認するアサーションを少なくとも1つ含める（`!body.error.message.includes("at /")`）

### 新しいDBモジュールの追加

1. `src/lib/db/yourModule.ts` を作成する — `./core.ts` から `getDbInstance` をインポートする
2. ドメインテーブルのためのCRUD関数をエクスポートする
3. 新しいテーブルが必要な場合は `src/lib/db/migrations/` にマイグレーションを追加する
4. `src/lib/localDb.ts` から再エクスポートする（再エクスポートリストにのみ追加）
5. テストを書く

### 新しいMCPツールの追加

1. Zod入力スキーマ + 非同期ハンドラーを持つツール定義を `open-sse/mcp-server/tools/` に追加する
2. ツールセットに登録する（`createMcpServer()`によって配線される）
3. 適切なスコープに割り当てる
4. テストを書く（ツールの呼び出しは `mcp_audit` テーブルにログされる）

### 新しいA2Aスキルの追加

1. `src/lib/a2a/skills/` にスキルを作成する（すでに5つ存在: smart-routing, quota-management, provider-discovery, cost-analysis, health-report）
2. スキルはタスクコンテキスト（メッセージ、メタデータ）を受け取り → 構造化された結果を返す
3. `src/lib/a2a/taskExecution.ts` の `A2A_SKILL_HANDLERS` に登録する
4. `src/app/.well-known/agent.json/route.ts` に公開する（エージェントカード）
5. `tests/unit/` にテストを書く
6. `docs/frameworks/A2A-SERVER.md` スキルテーブルに文書化する

### 新しいクラウドエージェントの追加

1. `src/lib/cloudAgent/agents/` に `CloudAgentBase` を拡張したエージェントクラスを作成する（すでに3つ存在: codex-cloud, devin, jules）
2. `createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources` を実装する
3. `src/lib/cloudAgent/registry.ts` に登録する
4. 必要に応じてOAuth/資格情報の処理を追加する（`src/lib/oauth/providers/`）
5. テスト + `docs/frameworks/CLOUD_AGENT.md` に文書化する

### 新しいガードレール / Eval / スキル / Webhookイベントの追加

- ガードレール: `src/lib/guardrails/` → ドキュメント: `docs/security/GUARDRAILS.md`
- Evalスイート: `src/lib/evals/` → ドキュメント: `docs/frameworks/EVALS.md`
- スキル（サンドボックス）: `src/lib/skills/` → ドキュメント: `docs/frameworks/SKILLS.md`
- Webhookイベント: `src/lib/webhookDispatcher.ts` → ドキュメント: `docs/frameworks/WEBHOOKS.md`

## 参照ドキュメント

重要でない変更については、最初に対応する詳細なドキュメントを読んでください：

| 領域                                               | ドキュメント                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| リポジトリナビゲーション                           | `docs/architecture/REPOSITORY_MAP.md`                             |
| アーキテクチャ                                     | `docs/architecture/ARCHITECTURE.md`                               |
| エンジニアリングリファレンス                       | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| オートコンボ (9ファクターのスコアリング、14の戦略) | `docs/routing/AUTO-COMBO.md`                                      |
| レジリエンス (3つのメカニズム)                     | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| 推論リプレイ                                       | `docs/routing/REASONING_REPLAY.md`                                |
| スキルフレームワーク                               | `docs/frameworks/SKILLS.md`                                       |
| メモリシステム (FTS5 + Qdrant)                     | `docs/frameworks/MEMORY.md`                                       |
| クラウドエージェント                               | `docs/frameworks/CLOUD_AGENT.md`                                  |
| ガードレール (PII / インジェクション / ビジョン)   | `docs/security/GUARDRAILS.md`                                     |
| 公共のアップストリーム認証情報 (Geminiなど)        | `docs/security/PUBLIC_CREDS.md`                                   |
| エラーメッセージのサニタイズ                       | `docs/security/ERROR_SANITIZATION.md`                             |
| 評価                                               | `docs/frameworks/EVALS.md`                                        |
| コンプライアンス / 監査                            | `docs/security/COMPLIANCE.md`                                     |
| ウェブフック                                       | `docs/frameworks/WEBHOOKS.md`                                     |
| 認可パイプライン                                   | `docs/architecture/AUTHZ_GUIDE.md`                                |
| ステルス (TLS / フィンガープリンティング)          | `docs/security/STEALTH_GUIDE.md`                                  |
| エージェントプロトコル (A2A / ACP / クラウド)      | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCPサーバー                                        | `docs/frameworks/MCP-SERVER.md`                                   |
| A2Aサーバー                                        | `docs/frameworks/A2A-SERVER.md`                                   |
| APIリファレンス + OpenAPI                          | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| プロバイダカタログ (自動生成)                      | `docs/reference/PROVIDER_REFERENCE.md`                            |
| リリースフロー                                     | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## テスト

| 何                      | コマンド                                                                |
| ----------------------- | ----------------------------------------------------------------------- |
| ユニットテスト          | `npm run test:unit`                                                     |
| 単一ファイル            | `node --import tsx/esm --test tests/unit/file.test.ts`                  |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                   |
| E2E (Playwright)        | `npm run test:e2e`                                                      |
| プロトコルE2E (MCP+A2A) | `npm run test:protocols:e2e`                                            |
| エコシステム            | `npm run test:ecosystem`                                                |
| カバレッジゲート        | `npm run test:coverage` (75/75/75/70 — ステートメント/行/関数/ブランチ) |
| カバレッジレポート      | `npm run coverage:report`                                               |

**PRルール**: `src/`、`open-sse/`、`electron/`、または `bin/` のプロダクションコードを変更した場合、同じPRにテストを含めるか更新する必要があります。

**テストレイヤーの優先順位**: ユニット → インテグレーション（マルチモジュールまたはDB状態） → E2E（UI/ワークフローのみ）。バグの再現を修正の前または同時に自動テストとしてエンコードします。

**Copilotカバレッジポリシー**: PRがプロダクションコードを変更し、カバレッジが75%（ステートメント/行/関数）未満または70%（ブランチ）未満の場合、単に報告するのではなく、テストを追加または更新し、カバレッジゲートを再実行してから確認を求めてください。実行したコマンド、変更されたテストファイル、最終的なカバレッジ結果をPRレポートに含めてください。

---

## Gitワークフロー

```bash
# mainに直接コミットしない
git checkout -b feat/your-feature
git commit -m "feat: あなたの変更を説明"
git push -u origin feat/your-feature
```

**ブランチプレフィックス**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**コミットフォーマット** (Conventional Commits): `feat(db): サーキットブレーカーを追加` — スコープ: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Huskyフック**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## 環境

- **ランタイム**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, ターゲット ES2022, モジュール esnext, 解決バンドラー
- **パスエイリアス**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **デフォルトポート**: 20128 (API + ダッシュボードが同じポート)
- **データディレクトリ**: `DATA_DIR` 環境変数、デフォルトは `~/.omniroute/`
- **主要環境変数**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- セットアップ: `cp .env.example .env` その後 `JWT_SECRET` を生成 (`openssl rand -base64 48`) と `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## ハードルール

1. 秘密や資格情報をコミットしない
2. `localDb.ts` にロジックを追加しない
3. `eval()` / `new Function()` / 暗黙のevalを使用しない
4. `main` に直接コミットしない
5. ルートで生のSQLを書かない — `src/lib/db/` モジュールを使用する
6. SSEストリームでエラーを静かに飲み込まない
7. 常にZodスキーマで入力を検証する
8. プロダクションコードを変更する際は常にテストを含める
9. カバレッジは常に ≥75% (ステートメント、行、関数) / ≥70% (ブランチ) を維持する必要があります。現在の測定値: ~82%。
10. 明示的なオペレーターの承認なしにHuskyフックをバイパスしない (`--no-verify`, `--no-gpg-sign`)。
11. 公開の上流OAuth client_id/secretやFirebase Webキーを文字列リテラルとして埋め込まない — 常に `resolvePublicCred()` を通過させる (`open-sse/utils/publicCreds.ts`)。参照: `docs/security/PUBLIC_CREDS.md`。
12. HTTP / SSE / 実行者のレスポンスで生の `err.stack` / `err.message` を返さない — 常に `buildErrorBody()` または `sanitizeErrorMessage()` を通過させる (`open-sse/utils/error.ts`)。参照: `docs/security/ERROR_SANITIZATION.md`。
13. 外部パスやランタイム値を `exec()`/`spawn()` に渡されるシェルスクリプトに文字列補間しない — 代わりに `env` オプションを通じて渡す。参照: `src/mitm/cert/install.ts::updateNssDatabases`。
14. CodeQL / Secret-Scanning アラートを無視しない — (a) まず上記のパターンドキュメントを確認してヘルパーが適用されるかどうかを確認し、(b) 無視のコメントに技術的な正当化を記録する。前例: `js/stack-trace-exposure` は、すでに `sanitizeErrorMessage()` を通過するコールサイトで発生する既知のCodeQLの制限（カスタムサニタイザーが認識されない） — `false positive` として無視し、`docs/security/ERROR_SANITIZATION.md` を参照。
15. 子プロセスを生成するルート（`/api/mcp/`, `/api/cli-tools/runtime/`）を `src/server/authz/routeGuard.ts` で `isLocalOnlyPath()` 分類なしに公開しない。ループバックの強制は、認証チェックの前に無条件に行われます — トンネルを介して漏洩したJWTはプロセスの生成をトリガーできません。参照: `docs/security/ROUTE_GUARD_TIERS.md`。
16. AI アシスタント、LLM、または自動化アカウントを認める `Co-Authored-By` トレーラー (例: "Claude"、"GPT"、"Copilot"、"Bot" を含む名前; `anthropic.com` / `openai.com` / ボット所有の `noreply.github.com` アドレスのメール) を絶対にコミットメッセージに含めないでください。そのようなトレーラーは GitHub 上でボットアカウントにコミット帰属をルーティングし、PR 履歴で実際の作者 (`diegosouzapw`) を隠します。人間の協力者 — upstream PR の作者や OmniRoute に移植される issue 報告者を含む — は標準の `Co-authored-by: Name <email>` トレーラーで認められることが できる し、認められる べき です; upstream-port ワークフロー (`/port-upstream-features`、`/port-upstream-issues`) はこれに依存しています。
