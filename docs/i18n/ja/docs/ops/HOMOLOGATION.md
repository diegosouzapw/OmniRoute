# Homologation Suite (`npm run homolog`) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

ホモロゲーション VPS 上で稼働している OmniRoute デプロイの実環境 E2E 検証
（`HOMOLOG_BASE_URL`、例: `http://192.168.0.15:20128`）。1 つのコマンドで、手動の
リリース STOP #2 チェックリストを、自動化されたエビデンス生成付きの実行に置き換えます。

## 検証対象

| レイヤー                 | 検証内容                                                                                                                                                                                                  | 実装                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — ヘルス/整合性       | `/api/monitoring/health` が `200`、`status: "healthy"`、および期待されるバージョンを返すこと                                                                                                              | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — 一時キー           | 管理者ログイン → `POST /api/keys` で実行用のスコープ付き API キーを作成し、結果にかかわらず `finally` ブロック内で失効（`DELETE /api/keys/:id`）させること                                                | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API サーフェス     | `/v1/models` カタログ、実際の非ストリーミングチャット補完（ティア上重要なモデル、`max_tokens: 5`）、無効なキーに対する `401`、および公開 `/api/monitoring/health`                                         | `tests/homolog/api/core.http`（httpYac）                                      |
| L1c — SSE ストリーミング | 実際のストリーミングチャット補完。`text/event-stream`、少なくとも 1 つのコンテンツ差分、および `[DONE]` ターミネーターをアサートすること                                                                  | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — 実プロバイダー      | 稼働中の `/v1/models` カタログに存在する各重要プロバイダーに対し、最小コストのチャットリクエストを 1 件ずつ promptfoo により動的に生成して実行すること                                                    | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI 認証            | 実際のログインフォームから一度ログインし、UI レイヤー全体でセッション（`storageState`）を再利用すること                                                                                                   | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI ルート          | `src/app/(dashboard)/dashboard` 配下のすべての静的 `page.tsx`（ファイルシステムから検出し、動的 `[param]` ルートはスキップ）が、HTTP エラー、ページエラー、Next.js エラーバウンダリなしで読み込まれること | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI 重要フロー      | ダッシュボード UI から API キーを作成し、再度失効させること（VPS 上に残存物を残さない）                                                                                                                   | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — 統合レポート        | httpYac（`junit-to-ctrf` 経由）、promptfoo→CTRF アダプター、Playwright CTRF レポーターの出力を 1 つの `homolog-ctrf.json` に統合し、人間が読める `homolog-report/summary.md` も生成すること               | `scripts/homolog/run.mjs`                                                     |

リプレイ自体に LLM は一切関与しません。これは決定論的なリグレッションテスト群であり、
評価ではありません。AI が関与するのは、今後のメンテナンス作業のみです（以下のロードマップを参照）。

## 前提条件

1. `.env.homolog.example` を `.env.homolog` にコピーし（gitignored — 絶対にコミットしないでください）、以下を設定します:
   - `HOMOLOG_BASE_URL` — デプロイ先。例: `http://192.168.0.15:20128`。
   - `HOMOLOG_ADMIN_PASSWORD` — そのデプロイ先のダッシュボード管理パスワード。
   - `HOMOLOG_CRITICAL_PROVIDERS` — 実際のスモークチャットリクエストを実行する、カンマ区切りのプロバイダープレフィックス（例: `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`）。
   - `HOMOLOG_API_KEY` — 通常の実行では空のままにしてください。スイートが独自の一時キーを作成し、失効させます。単一レイヤーを個別にデバッグする場合にのみ設定してください。
2. リポジトリで `npm install` を実行します（スイートの依存関係である `httpyac`、`promptfoo`、`playwright-ctrf-json-reporter`、`junit-to-ctrf`、`ctrf` は通常の devDependencies です）。
3. ブラウザバイナリがまだ存在しない場合は、`npx playwright install` を実行します。

## 実行方法

```bash
npm run homolog
```

ローカルの `package.json` とバージョンが一致しないデプロイ先（例: 以前のパッチリリースのままになっている検証環境）に対して検証するには、期待するバージョンを明示的に上書きします:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

いずれかのレイヤーが失敗すると、実行はゼロ以外の終了コードで終了します。また、失敗した場合でも、作成した一時 API キーの失効を必ず試行します（`scripts/homolog/run.mjs` の `finally` ブロック）。

## レポートの確認方法

すべての出力は `homolog-report/`（gitignored）に保存されます:

- `summary.md` — stdout に出力されるものと同じ表。レイヤーごとに1行（✅/❌ + 詳細）。
- `homolog-ctrf.json` — 統合 CTRF レポート（API/SSE、プロバイダースモーク、UI の各結果をマージしたもの）— リリースの STOP #2 チェックリストに添付するアーティファクトです。
- `httpyac-junit.xml`、`api-ctrf.json`、`providers-ctrf.json`、`ui-ctrf.json` — レイヤーごとの生レポート／中間レポート。
- `promptfooconfig.yaml`、`provider-misses.json` — 現在の実行用に生成された promptfoo 設定、および稼働中のカタログに存在しなかった重要プロバイダー。

L0 が失敗すると、直ちに中止されます（一時キーは作成されません）。これは、バージョンまたはヘルスの不一致がある場合、後続のすべてのレイヤーが誤ったデプロイ先を検証することになるためです。

## UI が正当に変更された場合のベースライン再設定

L4b（ルートスモーク）と L4c（API キーの UI フロー）は、スナップショットではなく実際の DOM ロケーターによって動作するため、正当な UI 変更の多くではスイートの更新は不要です。変更によってロケーターが壊れた場合（例: ボタンラベルの名前変更や設定ページの移動）は、以下を行います:

1. 現在のソースに対してロケーターを再確認します（各ロケーターを確認したファイル／行は、すでに spec に記録されています。同じパターンに従い、推測しないでください）。
2. `tests/homolog/ui/` 内の spec を更新します。
3. VPS に対して `npm run homolog`（または影響を受けた Playwright spec のみ）を再実行して修正を確認し、その後コミットします。

このスイートには、ビジュアル／ピクセルベースライン（F1）はありません。詳細についてはロードマップを参照してください。

## ロードマップ（F2 / F3）

設計と段階的なロールアウトについては、社内計画 spec
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` に記載されています（リンクなし — 社内用の `_tasks/` アーティファクトであり、このリポジトリで追跡されるドキュメントには含まれません）。概要:

- **F2** — 完全なウォークスルーを記録 → Playwright Test Agents（`planner`/`generator`）がフロー spec（コンボの作成、プロバイダーのテスト、設定の編集、MCP ツール）に変換 + 動的データ（メトリクス、タイムスタンプ、ログ）をマスクしたビジュアルリグレッションベースライン（Lost Pixel）+ リリースごとの `healer` メンテナンスルーチン。
- **F3** — レジリエンス／コントラクト／連携範囲: devbox 上の toxiproxy + 偽の OpenAI 互換プロバイダー、それを参照する VPS 上の `homolog-resilience` コンボ（タイムアウトを注入 → フォールバック、および `/api/monitoring/health` を介したサーキットブレーカーのオープン／クローズを検証）; `docs/openapi.yaml` に対するゲート付き Schemathesis コントラクトテスト（小さい `--max-examples`、固定 seed、非 LLM エンドポイントのみ）; および `npm run homolog` とその `summary.md` を `/generate-release` の STOP #2 フェーズに組み込むこと。
