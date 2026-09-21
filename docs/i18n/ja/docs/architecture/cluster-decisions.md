# Cluster Decisions — Optional Sidecar Profiles (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ステータス:** 提案（@diegosouzapw のレビュー待ち）
**日付:** 2026-06-20
**参照:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932)、PR #4381

## TL;DR

[`docker-compose.yml`](../../docker-compose.yml) にある既存の8サービス構成に、オプトインのComposeプロファイル（`memory`、`bifrost`）を2つ追加します。デフォルトの起動動作は**変更されません**：3つの `omniroute` レプリカ + Caddy + Redis + CliproxyAPIです。2つの新しいプロファイルでは、QdrantとBifrostをオプションのサイドカーとして追加し、`docker compose --profile <name> up` によって有効化します。**既存のサービスが削除または置換されることはありません。**

## この提案が保守的である理由

OmniRouteの既存のデプロイ構成は、すでに軽量かつ実証済みです：

- **`redis:7-alpine`** は、本番規模でレート制限／キャッシュのワークロードを処理します。
- **SQLite + sqlite-vec + FTS5** は、ローカルメモリ + ベクトル検索 + テキスト検索をカバーします（[`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)を参照）。
- **Caddy** は、すでにロードバランサー + TLSターミネーターとして使用されています（[`docker-compose.yml`](../../docker-compose.yml)）。
- **Bifrost** は、すでに[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)でTier-1ルーターとして統合されています（`BIFROST_ENABLED`環境変数によるキルスイッチを備えたサイドカープロキシです。`=0`に設定するとサイドカーをバイパスし、TS側の処理にフォールスルーします）。

ここで示す2つのプロファイルは、**SQLiteの上限に達したデプロイ向けのスケールアウトオプション**であり、移行ではありません。どちらもデフォルトでは無効です。

## 2つのプロファイル

### `memory` — Qdrantベクトルメモリ・サイドカー

**有効化すべき状況：**

- デプロイあたりの埋め込み数が100万件を超える場合（sqlite-vecは大規模になると低速化し始めます）。
- `omniroute-1/2/3`間で共有ベクトル状態を必要とするマルチレプリカ構成。
- すでに外部Qdrantクラスター（Qdrant Cloud、オンプレミス）を利用している場合。

**追加されるもの：**

| サービス | イメージ                | ポート      | 備考                                                    |
| -------- | ----------------------- | ----------- | ------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSWインデックス、永続ボリューム`omniroute_qdrant_data` |

**有効化方法：** Settings UIで`qdrantEnabled = true`に切り替えるか、`QDRANT_HOST=qdrant`環境変数を設定します。優先順位（設定テーブル → 環境変数 → デフォルト）については、[`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)を参照してください。

**環境変数：** `QDRANT_HOST`、`QDRANT_PORT`、`QDRANT_API_KEY`、`QDRANT_COLLECTION`、`QDRANT_VECTOR_SIZE`、`QDRANT_HNSW_EF_CONSTRUCT`（`.env.example`の1672～1683行目を参照）。

### `bifrost` — Bifrost Tier-1ルーター・サイドカー

**有効化すべき状況：**

- 3つ以上の`omniroute`レプリカを実行しており、プロバイダーのローテーションを単一のGoプロセスに集約したい場合。
- すべてのレプリカからアップストリームプロバイダーへのリクエストについて、監査／ログ記録を一元化したい場合。
- OmniRouteレプリカとは独立してTier-1ルーティングレイヤーを水平スケーリングしたい場合。

**追加されるもの：**

| サービス  | イメージ                          | ポート | 備考                                                                 |
| --------- | --------------------------------- | ------ | -------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | GoベースのTier-1ルーター、永続ログボリューム`omniroute_bifrost_logs` |

**有効化方法：** `.env.example`で`BIFROST_BASE_URL=http://bifrost:8080`を設定します。既存のサイドカープロキシルート[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)（PR #4381で追加）が、この設定を自動的に読み取ります。

**環境変数：** `BIFROST_BASE_URL`、`BIFROST_API_KEY`、`BIFROST_STREAMING_ENABLED`、`BIFROST_TIMEOUT_MS`（`.env.example`の1685～1695行目を参照）。

## このPRで明示的に対応**しない**こと

元のIssueスレッドでは、より大規模なクラスター書き換え案が提示されていました。実際のワークロード特性を精査した結果、以下は記載の理由により**却下**します。

| コンポーネント                       | 判定     | 理由                                                                                                                                |
| ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **除外** | `redis:7-alpine`で本番規模のレート制限ワークロードにはすでに十分であり、打破すべき上限がないため。                                  |
| **NATS**                             | **除外** | 各`omniroute`レプリカは単一のNode.jsプロセスであり、マルチプロセスのpub/subワークロードが存在しないため。                           |
| **PostgreSQL**                       | **除外** | SQLite + sqlite-vec + FTS5ですべての3ユースケースに対応でき、97件のマイグレーションとElectronパッケージングが移行の妨げとなるため。 |
| **Neo4j**                            | **除外** | ルーティングは5テーブルのJOINであり、SQLiteの再帰CTEで十分なため。                                                                  |
| **MinIO**                            | **除外** | 複数MB規模のBlobワークロードがなく、画像と音声はパススループロキシであるため。                                                      |
| **pgvector / pg_ai / pg_textsearch** | **除外** | PostgreSQLと同じくSQLiteの上限に達していないため。また、pgvectorエコシステムが断片化しているため。                                  |
| **HAProxy / Envoy**                  | **除外** | CaddyがすでにLB + TLSを担っており、両者ともTier-1ルーターとして明示的に却下されているため（`AGENTS.md`を参照）。                    |

将来のユースケースでこれらのいずれかが有効であると実証された場合は、このドキュメントを修正します。

## 4週間のロールアウト（承認された場合）

1. **第1週** — このPRをマージし、3レプリカのComposeスタックでオプトインプロファイルを検証。
2. **第2週** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)のサイドカープロキシルートを使用して、OpenAI/Claude/Gemini/Ollama（14以上のプロバイダーのうち4つ）向けにBifrostを全面的に有効化（`BIFROST_ENABLED`で制御し、実行時にキルスイッチで無効化可能）。
3. **第3週** — 単一のテストデプロイメントでQdrantメモリプロファイルを有効化し、sqlite-vecと比較したレイテンシー差を測定。
4. **第4週** — オブザーバビリティのヘルスチェック（`docker compose ps`の終了コード + `wget`スモークテスト）。ADR-041に従って71ピラーを更新。

## このPRで変更されたファイル

| ファイル                                                 | 変更内容                                                                                                                                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                     | +30行：`memory`プロファイル（Qdrant）、`bifrost`プロファイル（Bifrost）、永続ボリューム、ヘルスチェック。                                                                                                          |
| `.env.example`                                           | +24行：`QDRANT_*`（6変数）、`BIFROST_*`（4変数）。                                                                                                                                                                 |
| `docs/reference/ENVIRONMENT.md`                          | セクション25に`QDRANT_*`環境変数の6行を追加。                                                                                                                                                                      |
| `src/lib/memory/qdrant.ts`                               | +33行：`QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`の環境変数フォールバックチェーン（設定 → 環境変数 → デフォルト）。 |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`         | +88行：環境変数のフォールバック優先順位を固定する9件の新規テストケース。                                                                                                                                           |
| `docs/architecture/cluster-decisions.md`（このファイル） | 新規 — オプトインプロファイルの決定記録。                                                                                                                                                                          |
| `AGENTS.md`                                              | +1行：リファレンスドキュメント表にこのドキュメントへのポインターを追加。                                                                                                                                           |

**変更対象コードの合計：** 本番用ファイル4件（`docker-compose.yml`、`qdrant.ts`、`.env.example`、`ENVIRONMENT.md`）、テストファイル1件（`qdrant-wiring.test.ts`）、ドキュメントファイル2件（`cluster-decisions.md`、`AGENTS.md`）。
