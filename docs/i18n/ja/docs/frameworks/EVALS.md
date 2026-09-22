# Evaluations (Evals) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **信頼できる情報源:** `src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute には、ルーティング設定、単一のプロバイダー／モデル、または同梱されている「ゴールデンセット」スイートのベンチマークに使用できる汎用評価フレームワークが搭載されています。
これを使用して、ルーティングの変更を検証し、新しいプロバイダーを評価し、本番トラフィックに昇格させる前にリリースを制御できます。

このフレームワークは次のように実装されています。

- インメモリの組み込みスイートを登録し、期待される基準に照らして出力を評価し、スコアカードを集計する純粋なランナー（`src/lib/evals/evalRunner.ts`）。
- カスタム（ユーザー定義）スイートと過去の実行結果をSQLiteに保存する永続化レイヤー（`src/lib/db/evals.ts`）。
- 各ケースについて `POST /v1/chat/completions` へ実際の呼び出しを送信して実行し、レイテンシーと出力を取得して、実行結果を永続化するオーケストレーションレイヤー（`src/lib/evals/runtime.ts`）。
- `/api/evals/*` 配下のRESTエンドポイント（管理認証のみ）。
- `Dashboard → Usage → Evals` にあるダッシュボード画面（`EvalsTab.tsx`）。

## 概念

### スイート

スイートは、`description` と1つ以上のケースを持つ、名前付きのテストケースコレクションです。スイートには2つのソースがあります。

| ソース     | 定義場所                                     | 実行時に変更可能か？   |
| ---------- | -------------------------------------------- | ---------------------- |
| `built-in` | 起動時に `registerSuite()` を介して登録      | いいえ（コードで定義） |
| `custom`   | SQLiteの `eval_suites` + `eval_cases` に保存 | はい（API／UI経由）    |

現在の組み込みスイート（`src/lib/evals/evalRunner.ts` を参照）は次のとおりです。

- `golden-set` — 挨拶／数学／翻訳／安全性にまたがる10個のベースラインケース
- `coding-proficiency` — Python／JS／SQL／TS／バグ検出
- `reasoning-logic` — 三段論法、文章問題、パターン認識
- `multilingual` — 翻訳と言語検出
- `safety-guardrails` — PII、ジェイルブレイク、拒否、バイアス認識
- `instruction-following` — JSONのみ、番号付きリスト、言語制約
- `codex-comparison` — 比較モード向けの一対一のコーディングタスク

### ケース

各ケースには次の情報が含まれます。

| フィールド | 説明                                                              |
| ---------- | ----------------------------------------------------------------- |
| `id`       | 安定した識別子（出力とメトリクスのキーとして使用）                |
| `name`     | 人が読めるラベル                                                  |
| `model`    | 実行で `suite-default` ターゲットを使用する場合のデフォルトモデル |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` に送信       |
| `expected` | `{ strategy, value }` — 採点基準（以下を参照）                    |
| `tags`     | オプションのラベル（例：`safety`、`pii`、`jailbreak`）            |

### ターゲット

同じスイートを異なるターゲットに対して実行できます。ターゲットのスキーマは、`src/shared/validation/schemas.ts` の `evalTargetSchema` です。

| ターゲットタイプ | `id`     | 動作                                                                |
| ---------------- | -------- | ------------------------------------------------------------------- |
| `suite-default`  | `null`   | 各ケースで組み込みの `model` フィールドを使用                       |
| `model`          | モデル名 | すべてのケースを1つの直接モデル（例：`gpt-4o`）経由で強制実行       |
| `combo`          | コンボ名 | すべてのケースを1つのコンボ経由で実行（ルーティングエンジンを使用） |

`model` と `combo` では、`id` フィールドが必須です（Zodの `superRefine` によって適用）。`compareTarget` が指定されている場合、2つのターゲットは異なっている必要があります。ランナーは、A/B比較のために両方の実行結果を同じ `runGroupId` の下に永続化します。

## スコアリング基準

`evaluateCase()`（evalRunner.ts）に実装されています。

| ストラテジー | 合格条件                                                               |
| ------------ | ---------------------------------------------------------------------- |
| `exact`      | `actualOutput === expected.value`                                      |
| `contains`   | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`    |
| `regex`      | `new RegExp(expected.value).test(actualOutput)` が truthy              |
| `custom`     | `expected.fn(actualOutput, evalCase)` が truthy を返す（組み込みのみ） |

**注:** 関数は API 経由でシリアライズできないため、カスタム関数によるスコアリングはコードで定義された（組み込みの）スイート専用です。`evalCaseBuilderSchema` は、ユーザーが作成するスイートについて `contains | exact | regex` のみを受け付けます。

現在、LLM-as-judge や埋め込みベースの類似度スコアラーはありませんが、`evaluateCase()` で容易に拡張できます。

## データベーススキーマ

3 つのテーブル（マイグレーション `030_create_eval_runs.sql` および `031_create_eval_suites.sql`）があります。

| テーブル      | 用途                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | カスタムスイートのメタデータ（`id`、`name`、`description`）                                                                 |
| `eval_cases`  | スイートごとのケース — `input_json`、`expected_*`、`tags_json`                                                              |
| `eval_runs`   | 過去の実行履歴 — `pass_rate`、`total`、`passed`、`failed`、`avg_latency_ms`、`summary_json`、`results_json`、`outputs_json` |

組み込みスイートは DB に保存されません。メモリ上に保持され、`evalRunner.ts` がインポートされるたびに再登録されます。

## REST API

すべてのエンドポイントで管理認証（`requireManagementAuth`）が必要です。これらは公開プロキシの対象ではありません。

| エンドポイント                | メソッド | 説明                                                             |
| ----------------------------- | -------- | ---------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | スイート、最近の実行、スコアカード、ターゲット、キーの一覧を取得 |
| `/api/evals`                  | `POST`   | スイートを実行（単一または比較）— スキーマ `evalRunSuiteSchema`  |
| `/api/evals/{suiteId}`        | `GET`    | 1 つのスイート（組み込みまたはカスタム）を取得                   |
| `/api/evals/suites`           | `POST`   | カスタムスイートを作成 — スキーマ `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | カスタムスイートを取得                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | カスタムスイートを置換（ケースは再挿入される）                   |
| `/api/evals/suites/{suiteId}` | `DELETE` | カスタムスイートとそのケースを削除                               |

### スイートの実行

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

省略可能なフィールド:

- `outputs` — 事前計算された出力の `Record<caseId, string>`。指定した場合、ランナーは**ディスパッチをスキップ**し、キャッシュ済みの出力のみを採点します（オフライン評価に便利です）。
- `compareTarget` — 並列実行する 2 番目のターゲット。両方の実行で、直接比較表示用に生成された `runGroupId` を共有します。
- `apiKeyId` — ディスパッチされる `/v1/chat/completions` 呼び出しの認証に使用する内部 API キー。`REQUIRE_API_KEY` が有効な場合は必須です。

### カスタムスイートの作成

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## ディスパッチパイプライン

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. スイート（組み込みまたはカスタム）を解決します。
2. 各ケースについて、そのケースの `messages`、解決済みの `model`、`stream: false`、および `max_tokens: 512`（またはケース固有のオーバーライド）を指定し、`/v1/chat/completions` への `Request` を構築します。
3. チャットハンドラーを直接呼び出します（同一プロセス内で実行され、追加の HTTP ホップはありません）。
4. レイテンシーを記録し、`choices[0].message.content` または Responses API の `output[]` ペイロードからテキストを抽出します。
5. `runSuite()` を介してすべての出力をスコアリングし、`saveEvalRun()` を介して永続化します。

ケースは**逐次実行**されます。現在、並行実行フラグはありません。

## ダッシュボード

UI は `Dashboard → Usage → Evals`
（`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`）にあります。ここでは、次の操作を実行できます。

- ケースごとのプレビューを確認しながら、組み込みスイートとカスタムスイートを閲覧する。
- ケースビルダーを使用してカスタムスイートを作成、編集、削除する。
- ターゲット（スイートのデフォルト / モデル / コンボ）を選択し、必要に応じて 2 つ目の `compareTarget` や API キーを指定して、オンデマンドで実行する。
- 実行履歴、ケースごとの合否、レイテンシー、および取得された出力を確認する。
- `(suite, target)` スコープごとの最新実行を集約したローリングスコアカードを確認する。

## Auto-Assessment RFC との関係

別個の、より限定的な評価サブシステムが `src/domain/assessment/` にあります（稼働中のスコアリングエンジンについては [AUTO-COMBO.md](../routing/AUTO-COMBO.md) も参照してください）。
このサブシステムは Auto Combo エンジンを対象としており、プロバイダーとモデルを自動的にスコアリングすることで、上流で障害が発生した際にコンボが自己修復できるようにします。独自のランナー、独自のカテゴライザー、および独自のスコアリングロジックを使用します。

ここで説明する Evals フレームワークは、**より広範で汎用的なテスト基盤**です。任意の回帰テストスイート、A/B 比較、およびリリースごとのスモークテストには、こちらを優先して使用してください。リアルタイムのプロバイダーの正常性をルーティング判断に反映する必要がある場合は、Auto-Assessment サブシステムを使用してください。

## CI 統合

現在、専用の `eval:ci` npm スクリプトはありません。評価結果に基づいてリリースを制御する場合は、次の 2 つの方法があります。

- **HTTP 経由**: サーバーを起動し、既知の `suiteId` + `target` を指定して `POST /api/evals` を呼び出し、レスポンス内で `runs[].summary.passRate >= N` が成立することをアサートします。
- **プロセス内実行**: スクリプトから `@/lib/evals/runtime` の `runEvalSuiteAgainstTarget()` をインポートし、テスト DB に対して実行して、返された `PersistedEvalRun.summary` を確認します。

ルートと履歴を対象とするテストは、
`tests/unit/evals-route.test.ts` および `tests/unit/evals-history.test.ts` にあります。

## 拡張ポイント

一般的な変更と、その変更箇所は次のとおりです。

- **新しいスコアリング戦略** — `evaluateCase()`（`evalRunner.ts`）内の `switch (evalCase.expected.strategy)` ブロックを拡張し、`src/lib/db/evals.ts` の `EvalCaseStrategy` と `schemas.ts` の `evalCaseBuilderSchema` を拡張します。
- **新しい組み込みスイート** — スイートオブジェクトを定義し、`evalRunner.ts` の末尾で `registerSuite()` を呼び出します。`listSuites()` によって自動検出されます。
- **並行実行** — `runEvalSuiteAgainstTarget()` 内の逐次的な `for` ループを、並行数を制限した `Promise.all` に変更します（現在、並行実行制御は存在しません）。
- **ストリーミング / ツール呼び出しのケース** — 現在、ランナーは `stream: false` を強制します。ストリーミングまたはツール対応の評価を行うには、`runtime.ts` の変更が必要です（スコアリング前に SSE チャンクを取得して集約します）。

## 関連項目

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — 製品全体の操作ガイド
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — リクエストパイプラインのリファレンス
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo スコアリングエンジン（ライブランタイム）
- ソース: `src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
