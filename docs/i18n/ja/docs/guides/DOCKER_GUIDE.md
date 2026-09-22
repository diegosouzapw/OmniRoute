# 🐳 Docker Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker デプロイメントの完全なリファレンスです。クイックスタートについては、[README の Docker セクション](../README.md#-docker)を参照してください。

## 目次

- [クイック実行](#quick-run)
- [環境ファイルを使用する](#with-environment-file)
- [Docker Compose](#docker-compose)
- [利用可能なプロファイル](#available-profiles)
- [OmniRoute を Docker で実行する場合のホスト CLI ツールの設定](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis サイドカー](#redis-sidecar)
- [本番環境向け Compose](#production-compose)
- [Dockerfile のステージ](#dockerfile-stages)
- [重要な環境変数](#critical-environment-variables)
- [Caddy（HTTPS）を使用した Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [イメージタグ](#image-tags)
- [可用性：デフォルトの SQLite は単一レプリカ](#availability-default-sqlite-is-single-replica)
- [重要な注意事項](#important-notes)

---

## クイック実行

> **1つのコマンドでセルフホストしますか？**
> [セルフホストガイド](../getting-started/SELF_HOST_GUIDE.md)を参照してください —
> `docker compose -f docker-compose.selfhost.yml up -d`（公開済みイメージ +
> Redis、ループバック限定、プロファイル選択なし）。以下のクイック実行は、
> すでに別の場所でRedisを実行しているユーザー向けのシングルコンテナ構成です。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 環境ファイルを使用する場合

```bash
# 最初に .env をコピーして編集
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# ベースプロファイル（CLI ツールなし）
docker compose --profile base up -d

# CLI プロファイル（Claude Code、Codex、OpenClaw を内蔵）
docker compose --profile cli up -d

# ホストプロファイル（Linux を主対象とし、ホストの CLI バイナリを読み取り専用でマウント）
docker compose --profile host up -d

# CLI と CLIProxyAPI サイドカーを組み合わせる
docker compose --profile cli --profile cliproxyapi up -d
```

## 利用可能なプロファイル

OmniRoute には 4 つの Compose プロファイルが用意されています。環境に適したものを選択してください。

| プロファイル         | サービス         | 使用する場面                                                                                                                                 | コマンド                                     |
| -------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base`（デフォルト） | `omniroute-base` | ヘッドレスサーバー／最小限のランタイム。プロバイダー CLI は同梱されません                                                                    | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | `omniroute providers/setup/doctor` と同梱 CLI（Codex、Claude Code、Droid、OpenClaw）を呼び出すエージェント型ワークフロー                     | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | `~/.local/bin`、`~/.codex`、`~/.claude` などを読み取り専用でマウントし、ホスト CLI に `network_mode` のような形でアクセスしたい Linux ホスト | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | アップストリーム CLI のプロキシ用に、ポート `8317` で [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) サイドカーを実行           | `docker compose --profile cliproxyapi up -d` |

> 複数のプロファイルを組み合わせることができます：`docker compose --profile cli --profile cliproxyapi up -d`。

## OmniRoute を Docker で実行する際のホスト CLI ツールの設定

`omniroute setup-codex`、`setup-claude`、`config set <tool>`、およびダッシュボードの
**設定を保存**ボタンは、いずれも `~/.codex/*.config.toml` のようなファイルを書き込みます。これらのパスが
意味を持つのは、CLI が実際に動作しているマシン上だけです。コンテナ内で実行すると、
書き込み先はコンテナ自身のホーム（`/home/node` —
イメージは `USER node` で実行されます）になります。ホスト側の CLI がそこを読み取ることはなく、
コンテナが再作成された時点で破棄されます。

OmniRoute はこの状況を検出し、使用できない成功結果を報告する代わりに、
手順を示して書き込みを拒否します。CLI は終了コード `2` で終了し、API は
`containerEphemeralTarget: true` を含む `422` を返します。

### 推奨: CLI はホストで、OmniRoute は Docker で実行する

コンテナは API を提供し、CLI はホスト上のツールを設定します。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI の接続先をコンテナに設定
omniroute setup-codex                      # ホスト上の実際の ~/.codex に書き込む
```

Codex、Claude Code、Cursor、または同様のツールをノート PC 上で実行する場合は、
これが適切な選択です。通常はこの構成になります。

### 代替手段: ホストの設定ディレクトリをバインドマウントする（`host` プロファイル）

コンテナ自体からホストの設定へ書き込みたい場合は、対象の
ディレクトリをマウントし、`CLI_CONFIG_HOME` がマウントのルートを指すようにします。`host` プロファイルでは
すでにこの設定が行われています。

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

バインドマウントによって、パスが信頼できるものになります。OmniRoute は
`/proc/self/mountinfo` を読み取り、マウント済みのパス（および子ディレクトリがマウントされている
ディレクトリ。これはまさに上記の `/host-home` の構造です）への書き込みを許可する一方で、
マウントされていないパスへの書き込みは引き続き拒否します。

### 回避手段: コンテナ自身の CLI を設定する（必要な場合のみ使用）

CLI が実際にコンテナ内に存在する場合（`cli` プロファイル）は、書き込みは
意図されたものです。任意の `setup-*` コマンドに `--allow-container-write` を渡すか、
サーバーに対して `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` を設定します。書き込みは、
コンテナの再作成後には保持されないという警告付きで続行されます。

> **セキュリティ警告 — `cli` プロファイルと `docker.sock` のマウント。**
> `cli` プロファイルは `/var/run/docker.sock` をバインドマウントするため、コンテナ内の
> 自動アップデーターはホストのデーモンを使用してスタックを再作成できます
> （`src/lib/system/autoUpdate.ts` はそのソケットの存在を確認し、
> 存在しない場合は Docker 経由の処理をスキップします）。このソケットは**ホストの root 権限に関わる
> 信頼境界**です。このソケットへアクセスできるものはすべて、root としてホストの Docker デーモンを
> 操作できます。つまり、ホスト上の任意のコンテナを作成、検査、停止、削除できます。
> その影響は次のとおりです。
>
> 1. **`cli` プロファイルのポートをネットワークに公開しないでください。**
>    `127.0.0.1` 上で公開してください（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）。
>    LAN から到達可能な `cli` プロファイルでは、ダッシュボードレベルの RCE が発生すると、
>    ホスト全体が侵害されます。
> 2. **追加のホストディレクトリを `cli` プロファイルにバインドしないでください。**
>    Docker ソケットと追加のマウントを組み合わせると、コンテナからファイルシステムとホスト設定へ
>    完全な読み書きが可能になります。ツールからプロジェクトを参照する必要がある場合は、
>    CLI バイナリを使用してローカルで実行してください。`cli` コンテナへはマウントしないでください。
>
> コンテナ内での自動更新が不要な場合は、`cli` プロファイルを無効のままにしてください
> （`COMPOSE_PROFILES=core,redis`、またはより短い指定）。その他のプロファイルでは
> Docker ソケットはマウントされません。
>
> MITM に関連する脅威モデルについては `docs/security/MITM-TPROXY-DECRYPT.md`
> （git 上にあり、`/docs` には組み込まれません）を、`codex`/`claude-code`/`droid`/`openclaw`
> バイナリの出所チェーンについては `docs/security/SUPPLY_CHAIN.md` を参照してください。

## Redis サイドカー

OmniRoute は、分散レートリミッターと共有キャッシュのバックエンドとして Redis を使用します。`redis` サービスは `docker-compose.yml` で**常に定義されており**（プロファイルによる制限はありません）、他のどのプロファイルとも同時に起動します。

| 詳細                     | 値                                            |
| ------------------------ | --------------------------------------------- |
| イメージ                 | `redis:7-alpine`                              |
| コンテナ名               | `omniroute-redis`                             |
| 内部ポート               | `6379`                                        |
| ホストポート（上書き）   | `REDIS_PORT`（デフォルトは `6379`）           |
| ホストバインド（上書き） | `REDIS_BIND_HOST`（デフォルトは `127.0.0.1`） |
| ボリューム               | `omniroute-redis-data` → `/data`              |
| ヘルスチェック           | `redis-cli ping`（10秒間隔）                  |

関連する環境変数：

- `REDIS_URL` — アプリに注入される接続文字列（デフォルトは `redis://redis:6379`）。
- `REDIS_PORT` — Redis コンテナのホスト側ポートマッピング。
- `REDIS_BIND_HOST` — ポートを公開するホストインターフェース。デフォルトは `127.0.0.1`。

> **デフォルトでループバックを使用する理由：** サイドカーは `requirepass` なしで実行され、アプリ
> コンテナは Compose ネットワーク（`redis:6379`）経由で接続します。公開ポートは
> ホスト側のツール（`redis-cli`、ローカルの `npm run dev`）で使用するためだけにあります。
> `0.0.0.0` で公開すると、認証されていない Redis が LAN 上のすべてのホストに公開されます。
> `REDIS_BIND_HOST=0.0.0.0` を設定する場合は、サービスの `command:` に `--requirepass` も追加してください。

**Redis の無効化**は推奨されません（レートリミッターがインメモリのフォールバックに縮退します）。無効化する必要がある場合は、`docker-compose.yml` 内の `redis:` サービスブロックを削除またはコメントアウトするか、ゼロにスケールしてください：

```bash
docker compose up -d --scale redis=0
```

## 本番環境用 Compose

開発環境と並行して実行する分離された本番環境スナップショットには、`docker-compose.prod.yml` を使用します。

| 詳細                             | 値                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| ファイル                         | `docker-compose.prod.yml`                                                             |
| デフォルトのダッシュボードポート | `PROD_DASHBOARD_PORT=20130`（内部の `${DASHBOARD_PORT:-20128}` にマッピング）         |
| デフォルトの API ポート          | `PROD_API_PORT=20131`                                                                 |
| イメージ                         | `omniroute:prod`（`runner-cli` ターゲットからビルド）                                 |
| Redis コンテナ                   | `omniroute-redis-prod`（`redis:8.6.2`、専用の `redis-prod-data` ボリューム）          |
| データボリューム                 | `omniroute-prod-data`（名前付きで、再ビルド後も永続化）                               |
| ヘルスチェック                   | `node healthcheck.mjs` + `redis-cli ping`。`depends_on` は Redis の正常性を条件とする |

使用方法：

```bash
# 本番環境スタックをビルドして起動
docker compose -f docker-compose.prod.yml up -d --build

# ログをストリーミング
docker compose -f docker-compose.prod.yml logs -f

# 停止して削除（ボリュームは保持）
docker compose -f docker-compose.prod.yml down
```

本番環境スタックは開発環境用 Compose と並行して実行されます（コンテナ名、ポート、ボリュームが異なります）。そのため、本番環境を稼働させたままローカルで反復開発を続けられます。

## Dockerfile のステージ

このリポジトリには、マルチステージ Dockerfile（`Dockerfile`）が含まれています。3 つのステージが公開されているため、用途に適した `target` を選択してください。

| ステージ      | ベースイメージ        | 用途                                                                                                                                                                                                  |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 依存関係をインストールし（`npm ci --legacy-peer-deps`）、`npm run build` を実行します（デフォルトでは Turbopack — 下記のビルド時リソースを参照）                                                      |
| `runner-base` | `node:26-trixie-slim` | Next.js の standalone 出力を使用する本番ランタイムです。**プロバイダー CLI は同梱されていません。**                                                                                                   |
| `runner-cli`  | `runner-base`         | `git`、`docker.io`、`docker-compose` と、グローバル CLI の `@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw` を追加します。**エージェント型ワークフローにはこれを選択してください。** |

特定のターゲットを手動でビルドします。

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### ビルド時リソース

`builder` ステージのリソース消費量は、3 つのビルド引数で制御します。これらはビルド時にのみ使用されます —
`OMNIROUTE_MEMORY_MB`（後述）は、これらとは別のランタイム設定です。

| ビルド引数                  | デフォルト | 効果                                                                                           |
| --------------------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | `0` にすると、代わりに webpack でビルドします。ピークメモリは低下しますが、低速です。          |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | 起動される `next build` の V8 ヒープ上限（`--max-old-space-size`）です。                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` に渡されます。Next はページデータ収集用に `workers = N - 1` を導出します。 |

大規模なビルダーで増やすべきなのは `OMNIROUTE_BUILD_WORKERS` です。また、リソースが制限された環境で `✓ Compiled successfully` の**後に**ビルドが停止する場合、まず疑うべき設定でもあります。各ページデータワーカーは独立したプロセスであり、親の `next build` 自体も別プロセスです。実際の VPS での再現（issue #7518）では、`NODE_OPTIONS` のヒープフラグとは無関係に、各プロセスのピーク RSS が約 4.5 GB と測定されました（Turbopack は V8 ヒープ外のネイティブ/Rust メモリでコンパイルします）。デフォルト値の `2`（→ ワーカー 1 個、合計 2 プロセス）は、公開パイプラインで使用される 16 GB / 4 vCPU の GitHub ホステッドランナーに合わせて設定されています。`8`（→ ワーカー 7 個）では、そのランナーがメモリ不足になり、buildkit は `ResourceExhausted: ... cannot allocate memory` でステップに失敗しました。プロセスごとの RSS を推測ではなく直接測定すると、`3`（→ ワーカー 2 個）でも収まりませんでした。`tests/unit/docker-build-memory-budget.test.ts` は測定値に基づいて計算を行い、いずれかの設定値がランナーの容量を超える場合に失敗します。

Turbopack は V8 ヒープの**外部**にあるネイティブ Rust メモリでコンパイルするため、`OMNIROUTE_BUILD_MEMORY_MB` ではその使用量を制限できません。そのため、メモリ上限のあるホストでは、エラーテキストが一切表示されないまま OOM killer によってビルドが SIGKILL されます。単に `Creating an optimized production build` の途中で停止するため、メモリ不足ではなくハングしたように見えます。ビルドホストのリソースが制限されている場合は、バンドラーを切り替えてください。

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` は有効になっているため、`next build` は親プロセス**と**ワーカープロセスを実行し、それぞれが個別に `OMNIROUTE_BUILD_MEMORY_MB` に従います。コンテナの上限は、この値の約 2 倍を超えるように設定してください。1 倍では不十分です。

このツリーでの測定結果（`--target runner-base`、`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| バンドラー | コンテナ上限   | 結果                            |
| ---------- | -------------- | ------------------------------- |
| Turbopack  | 8 GiB / 16 GiB | どちらも通知なく OOM kill       |
| webpack    | 8 GiB          | ビルドワーカーが SIGKILL された |
| webpack    | 12 GiB         | 成功、ピーク時 11.1 GiB         |

### ランタイムのデフォルト値

`runner-base` によってエクスポートされるデフォルト値：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker でのメモリ動作：

- イメージは `OMNIROUTE_MEMORY_MB=1024` を設定し、そこから `NODE_OPTIONS=--max-old-space-size=1024` を導出します。
- 実際のサーバープロセスは standalone ランチャーによって起動されます。このランチャーは `OMNIROUTE_MEMORY_MB` を読み取り、`--max-old-space-size=<OMNIROUTE_MEMORY_MB>` を追加します。
- Node は繰り返し指定された最後の `--max-old-space-size` 値を使用するため、`OMNIROUTE_MEMORY_MB` を設定することで、Docker における実効ヒープ上限を制御できます。
- イメージではこの値が常に設定されるため、ランチャー独自の RAM 容量に応じたフォールバックは Docker 環境では適用されません。ワークロードに合わせて明示的に引き上げてください（下表を参照）。コーディングエージェントの `/v1/responses` には `2048` でも小さすぎます。

### コーディングエージェント用のランタイム RAM

Docker のデフォルトである 1 GiB は、ダッシュボードや軽量チャット向けの最低ラインであり、本番環境向けのサイズではありません。長い `POST /v1/responses` 本文（数百件のメッセージ、数十個のツール）は、圧縮中に複数のインメモリグラフを保持します。約 3 MiB / 約 750k トークンのリクエストが 2 件重複した場合、**12 GiB** の old-space でも V8 が停止し（`FATAL ERROR: Reached heap limit`）、16 GiB の cgroup OOM にも達しました。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。

**cgroup の `--memory` はヒープを上回る値に設定してください** — ネイティブバッファ、SQLite、圧縮処理の中間データは V8 の外部に配置されます。

| ワークロード                                       | `OMNIROUTE_MEMORY_MB`          | コンテナ / cgroup   | 注記                                                                                                             |
| -------------------------------------------------- | ------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ダッシュボード、軽いチャット 1 件                  | `1024`（イメージのデフォルト） | ≥2 GiB              |                                                                                                                  |
| コーディングエージェント 1 個（Claude/Codex/Grok） | `8192`                         | ≥10 GiB             | 一般的な単一セッションの `/v1/responses`                                                                         |
| 同時実行される長時間の `/v1/responses` 2 件        | `10240`–`12288`                | ≥12–16 GiB          | ヒープが約 12 GiB に達した時点で V8 の異常終了を確認                                                             |
| 3 件以上の長いコンテキストを同時実行               | 1 プロセスでは実行しない       | 直列化 / RAM を増設 | デフォルトでは高負荷リクエストの実行中受付数は 1。RAM を増やさずにこの上限を引き上げると、再び異常終了が発生する |

ベアメタル環境の `omniroute serve` は、`OMNIROUTE_MEMORY_MB` が**未設定**の場合、RAM の約 35%（`[512, 4096]` の範囲内）に調整します。Docker では常に `1024` が設定されるため、公式イメージではこの調整は実行されません。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 重要な環境変数

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) に記載されているデフォルト設定に加えて、Docker 環境で実行する際は、以下の変数が特に重要です。

| 変数                          | 目的                                                                                                                                                                                                                                                                                                     | デフォルト                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ブリッジの共有シークレット。**本番環境では必須** — 強力なランダム文字列を設定してください。                                                                                                                                                                                                    | 未設定（指定必須）        |
| `REDIS_URL`                   | レートリミッター／キャッシュバックエンドへの接続文字列                                                                                                                                                                                                                                                   | `redis://redis:6379`      |
| `REDIS_PORT`                  | 同梱されている Redis コンテナのホスト側ポート                                                                                                                                                                                                                                                            | `6379`                    |
| `REDIS_BIND_HOST`             | 同梱されている Redis のポートを公開するホストインターフェース（AUTH を追加しない限りループバック）                                                                                                                                                                                                       | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 自己更新ワークフロー用に、`cli` プロファイル内の `/workspace/omniroute` にマウントされるホストパス                                                                                                                                                                                                       | `.`（現在のディレクトリ） |
| `OMNIROUTE_MEMORY_MB`         | Docker スタンドアロンサーバーの実行時 Node ヒープ上限。上記のイメージデフォルトを上書きします。コーディングエージェント：`8192` 以上（[実行時 RAM](#runtime-ram-for-coding-agents) を参照）。                                                                                                            | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | ダッシュボード（20128）および API（20129）の公開ポートを上書きします                                                                                                                                                                                                                                     | `20128` / `20129`         |
| `APP_BIND_HOST`               | docker-compose がダッシュボード／API／ライブ WS の各ポートを公開するホストインターフェース。`REQUIRE_API_KEY=false`（デフォルト）の場合、`0.0.0.0` は匿名の `/v1` プロキシを LAN に公開します。`REQUIRE_API_KEY=true` を設定するか、前段にリバースプロキシを配置する場合にのみ公開範囲を広げてください。 | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | docker-compose が `cliproxyapi` サイドカーを公開するホストインターフェース。このデータボリュームにはプロバイダーの認証情報が保存されます。                                                                                                                                                               | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | ランタイムのプラグインスキャナーが読み取り、インストール先として使用するディレクトリ。プラグインをバインドマウントする場合に設定してください。デフォルトは `HOME` に従いますが、イメージによってはエクスポートされていない場合があります。                                                               | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | アプリをリバースプロキシの背後で公開する場合の URL サブパス（例：`/omniroute`）                                                                                                                                                                                                                          | _（空 = ルート）_         |
| `NEXT_PUBLIC_BASE_URL`        | サブパスを含む、ブラウザーからアクセス可能な公開オリジン（例：`https://host/omniroute`）                                                                                                                                                                                                                 | 未設定                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` のホスト側ダッシュボードポート                                                                                                                                                                                                                                                 | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` サイドカーのホスト側ポート                                                                                                                                                                                                                                                                 | `8317`                    |

## サブパス上のリバースプロキシ（Traefik / nginx）

Next.js の `basePath` はスタンドアロンバンドルにコンパイルされます。OmniRoute はビルド時の値をアプリルートのセンチネルファイルに記録し（`npm run build` の実行中に書き込まれ、`scripts/docker/ensure-docker-base-path.mjs` によって読み取られます）、コンテナの起動時に `OMNIROUTE_BASE_PATH` と比較します。値が異なり、イメージがドメインルート用にビルドされている場合、エントリーポイントは `node dev/run-standalone.mjs` が実行される前に、スタンドアロンマニフェスト、埋め込まれた `basePath`/`assetPrefix` リテラル（Next 16 は SSR アセット URL を `assetPrefix` のみから生成するため、パッチャーはサブパスをそこにも反映します）、ビルド時に埋め込まれた `/_next/static` アセット URL（クライアント参照マニフェスト、メディアインポート、事前レンダリングされたエラーページ）、およびクライアント側の `process.env` shim を書き換えます。

### Compose ビルド（推奨）

`.env` に両方の変数を設定し、イメージとランタイムの設定が一致するように再ビルドします。

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` は、`OMNIROUTE_BASE_PATH` を Docker のビルド引数およびランタイム環境変数として渡します。

### ビルド済みルートイメージ + ランタイムサブパス

公開されている `diegosouzapw/omniroute:*` イメージは、ドメインルート用にビルドされています。それでも、ランタイムに `OMNIROUTE_BASE_PATH` を設定できます。コンテナは起動時にバンドルへ一度だけパッチを適用します。対応する公開オリジンも合わせて設定してください。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

リバースプロキシは、外部パスを省略せずに**完全な形で**転送するように設定してください（プレフィックスを削除しないでください）。Traefik では、`StripPrefix` を使用せずに `PathPrefix(`/omniroute`)` をコンテナへルーティングし、Next.js が `/omniroute/...` を受信して `/omniroute/_next/...` からアセットを配信できるようにします。

Docker のヘルスチェックは、アクティブな `OMNIROUTE_BASE_PATH` がプレフィックスとして付加された、軽量な `/healthz` ライフサイクルエンドポイントをプローブします。`/api/monitoring/health` は、ユーザーやダッシュボードによる診断のために引き続き利用できます。コンテナの HEALTHCHECK をこのエンドポイントに戻すには（たとえば、詳細なヘルスチェックを適用する場合）、`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` を設定します。このパスは**詳細な**チェック（DB + モニタリングの概要）です。オプトインする場合、実行頻度の低い Docker の `HEALTHCHECK` には適していますが、Kubernetes の `livenessProbe` の実行間隔には**適していません**。

オーケストレーター（Kubernetes、Nomad など）の場合：

| プローブ                | 推奨                                                                          | 非推奨                                                       |
| ----------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Liveness                | HTTP `GET /livez`、またはメインポート（`PORT`、デフォルトは `20128`）への TCP | Liveness としての `/api/monitoring/health`                   |
| Readiness               | HTTP `GET /healthz`                                                           | イベントループがビジーな状態を停止と見なす厳しいタイムアウト |
| 詳細 / ブラックボックス | `/api/monitoring/health`                                                      | —                                                            |

`/healthz` はプロセスのライフサイクル（`ok` / `starting` / `stopping`）を報告します。`/livez` はプロセスが生存しているかのみを示します（ハンドラーを実行できる限り 200 を返し、Readiness を待機しません）。どちらもリクエスト処理と同じ Node イベントループ上で実行されるため、CPU バウンドなカタログ処理や圧縮処理によって遅延する可能性があります。ビジー ≠ 停止です。HTTP プローブがタイムアウトする場合は、TCP の Liveness を推奨します。プローブに関する詳細なガイダンス：
[モニタリングガイド — Kubernetes プローブの推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)。

## Caddy を使用した Docker Compose（HTTPS Auto-TLS）

Caddy の自動 SSL プロビジョニングを使用して、OmniRoute を安全に公開できます。ドメインの DNS A レコードがサーバーの IP を指していることを確認してください。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # OAuth コールバック、ダッシュボードのリンク、生成される公開 URL のためのブラウザー向けオリジン。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # スケジュールされたジョブ／自己フェッチのための内部サーバー間 URL。
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy は、アップストリームコンテナ向けに標準の転送ヘッダーを設定します。OmniRoute は
`NEXT_PUBLIC_BASE_URL` を、OAuth コールバックおよび生成される公開リンクの正規の公開オリジンとして使用します。
認証済みのダッシュボード書き込みでは、同一オリジンリクエストに加えて、セッションに紐付けられた CSRF
保護が使用されます。明示的な設定ではなく、信頼済みの転送ヘッダーから OmniRoute に公開オリジンを
意図的に導出させたい高度なデプロイの場合にのみ、`OMNIROUTE_TRUST_PROXY` を有効にしてください。

## Cloudflare Quick Tunnel

Docker デプロイ向けのダッシュボードでは、`Dashboard → Endpoints` からワンクリックで **Cloudflare Quick Tunnel** を利用できます。初回の有効化時には、必要な場合にのみ `cloudflared` がダウンロードされ、現在の `/v1` エンドポイントへの一時的なトンネルが開始され、生成された `https://*.trycloudflare.com/v1` URL が通常の公開 URL のすぐ下に表示されます。

エンドポイントのトンネルパネル（Cloudflare、Tailscale、ngrok）は、アクティブなトンネルの状態を変更することなく、`Settings → Appearance` から表示または非表示にできます。

### トンネルに関する注意事項

- Quick Tunnel の URL は一時的なものであり、再起動するたびに変更されます。
- OmniRoute またはコンテナの再起動後に、Quick Tunnel が自動的に復元されることはありません。必要に応じて、ダッシュボードから再度有効にしてください。
- マネージドインストールは現在、`x64` / `arm64` 上の Linux、macOS、Windows をサポートしています。
- マネージド Quick Tunnel では、制約のあるコンテナ環境で大量に出力される QUIC UDP バッファー警告を回避するため、デフォルトで HTTP/2 トランスポートが使用されます。別のトランスポートを使用する場合は、`CLOUDFLARED_PROTOCOL=quic` または `auto` を設定してください。
- Docker イメージにはシステム CA ルートが同梱され、マネージド `cloudflared` に渡されます。これにより、コンテナ内でトンネルがブートストラップされる際の TLS 信頼エラーを回避できます。
- OmniRoute がバイナリをダウンロードする代わりに既存のバイナリを使用するようにするには、`CLOUDFLARED_BIN=/absolute/path/to/cloudflared` を設定してください。

## イメージタグ

| イメージ                 | タグ     | サイズ | 説明                                                                      |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | **公開済み**の安定版 SemVer のうち最高のもの（git `main` ではありません） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps では、この種類のタグに固定してください                             |

マルチプラットフォームマニフェスト：`linux/amd64` + `linux/arm64` ネイティブ（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker は一致するアーキテクチャを自動的に選択します。ARM ホスト上で AMD64 エミュレーションを強制する必要がある場合は、`--platform linux/amd64` を渡してください。

### リリースチャンネル

OmniRoute は、安定版リリース、アクティブなリリースブランチのテスト、開発ビルド向けに、それぞれ個別の Docker チャンネルを公開しています。

| チャンネル                      | ソース                                 | 可変性                       | 推奨用途                                                                                                                 |
| ------------------------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | 署名済み／バージョン付きリリース       | 不変                         | 正確なリリースに固定する本番環境へのデプロイ                                                                             |
| `:latest` / `:latest-web`       | **公開済み**の安定版 SemVer の最高値   | 可変の安定版ポインター       | SemVer 公開ジョブの**後**に安定版リリースを追跡します。`main` または未リリースの `release/v*` コミットは追跡**しません** |
| `:next` / `:next-web`           | 現在のデフォルト `release/v*` ブランチ | 可変のプレリリースポインター | アクティブなリリースブランチに反映済みであるものの、まだ安定版リリースには含まれていない修正のテスト                     |
| `:main` / `:main-web`           | `main` ブランチ                        | 可変の開発版ポインター       | 開発および統合テストのみ                                                                                                 |

#### プレリリースチャンネルの使用

`next` チャンネルは、現在のデフォルト `release/v*` ブランチへのプッシュごとに再ビルドされ、AMD64 と ARM64 の両方に対して公開されます。古いメンテナンスブランチから上書きすることはできません。このチャンネルでは、次の安定版タグが作成される前に、アクティブなリリースブランチへマージされた修正を含む取得可能なイメージが提供されます。

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Compose では、選択したプロファイルで使用されるイメージタグを上書きしてから、サービスをプルして再作成します。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### 安全性とロールバック

`next` は変動するプレリリースチャンネルです。アクティブなリリースブランチへのプッシュのたびに変更される可能性があり、**本番環境での使用はサポートされていません**。特定のビルドを評価する間は、イメージダイジェストに固定してください。

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

テスト前に、OmniRoute のデータボリュームまたはバインドマウントされたデータディレクトリをバックアップしてください。ロールバックするには、以前使用していた安定版またはダイジェストを復元し、コンテナを再作成します。

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

リリースブランチのビルドが `latest` を移動させることはありません。安定版を指すポインターを更新できるのは、条件を満たす安定版のセマンティックバージョンのみです。`next` イメージにも、リリースイメージの検査と、CRITICAL レベルの脆弱性がある場合に処理をブロックするゲートが適用されます。

**`latest` は、git における最新性を保証するものではありません。** `main` またはアクティブな `release/v*` ブランチにマージされた修正は、安定版の SemVer イメージが公開され、公開ジョブによって `:latest` がその SemVer と同じダイジェストへ更新されるまで、`:latest` には含まれません。GitHub にはすでに修正が表示されているのに `latest` が更新されていないように見える場合は、`:next` をプルしてリリースブランチをテストするか、SemVer タグが公開されるまで待ってください。

| 目的                                                     | 使用するもの                           |
| -------------------------------------------------------- | -------------------------------------- |
| ドリフトを許容できない GitOps / 本番環境                 | `:X.Y.Z`（またはイメージダイジェスト） |
| 公開済みの安定版を追跡し、リリースごとの再作成を許容する | `:latest`                              |
| 未リリースの `release/v*` コミットをテストする           | `:next`（本番環境では使用不可）        |
| `main` をテストする                                      | `:main`（本番環境では使用不可）        |

## 可用性: デフォルトの SQLite は単一レプリカ

標準の Docker / Kubernetes OmniRoute は、**1 つの Node プロセス + 1 つの SQLite ライター**で構成されます。このトポロジでは高可用性は**サポートされていません**。

| 制約                                     | 影響                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 単一ライター                             | 同じ SQLite ファイルに対して複数のレプリカを実行しないでください。DB が破損します。                                                                                                                                                                                                                                                                         |
| 再作成 / 再起動 / HEALTHCHECK の強制終了 | 処理中の SSE、ダッシュボードセッション、インメモリ状態が**すべて停止**します。接続中のすべてのクライアントが切断されます。エンドポイントが存在しない期間中の新規リクエストには、OmniRoute JSON ではなく、リバースプロキシから **`502 Bad Gateway: Unknown error`** が返されます。そのため、クライアントはこれをプロバイダー障害と区別できません（#11015）。 |
| `/healthz` と同じイベントループ          | カタログ処理や圧縮処理が集中するとプローブが遅延する可能性があり、タイムアウトが短い場合は**唯一の**レプリカが再起動されます。                                                                                                                                                                                                                              |

**プローブマトリクス**（[Kubernetes のプローブ推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)も参照）:

| プローブ          | 対象                                                                 | 使用しないもの                                             |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Liveness          | `PORT`（デフォルトは `20128`）への TCP、またはソフト HTTP `/healthz` | `/api/monitoring/health`                                   |
| Readiness         | HTTP `GET /healthz`                                                  | イベントループの高負荷を停止状態として扱う短いタイムアウト |
| 詳細確認 / 人間用 | `/api/monitoring/health`                                             | 自動化された kubelet liveness                              |

**アップグレード:** すべてのセッションが切断されることを前提としてください。可能であればクライアントをドレインしてください。デフォルトの SQLite ではローリングアップデートは利用できません。Compose の `restart: unless-stopped` と Docker の `HEALTHCHECK` を併用した場合も、コンテナが Unhealthy になると唯一のプロセスが置き換えられ、同じ範囲に影響が及びます。

**単一レプリカ**用の Kubernetes スニペット（Recreate が必須です。1 つの SQLite ファイルに対して `replicas` を増やさないでください）:

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` の sleep により、SIGTERM の前に kube が Service エンドポイントを削除できるため、停止中のプロセスに**新しい**トラフィックが到達しなくなります。処理中の `/v1/responses` SSE は、重量級アドミッションリースを介して、最大 `SHUTDOWN_TIMEOUT_MS`（デフォルトは 30 秒）までドレインされます（#11015）。それでもプロセスに到達した新規リクエストには、`503` と `Retry-After: 5` が返されます。置き換え後のプロセスが Ready になるまでの Recreate によるエンドポイント不在期間は、引き続き完全な停止となります。これは SQLite トポロジに起因するものであり、プローブの設定ミスではありません。

外部 Postgres / マルチライター HA は、文書化された標準構成では**ありません**。HA が必要な場合は、単一レプリカを維持するか、プロジェクトが別途テストして文書化したトポロジを使用してください。Postgres/MySQL 対応の作業は [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) で進められています。それがリリースされるまでは、**大規模な** `/v1/responses` の処理能力を増やすためにサポートされている唯一の方法は、N 個の独立したプロセス（次のセクション）を使用することであり、1 つのボリュームに対して `replicas > 1` を設定することではありません。

## スケールアウト: N 個の独立プロセス

1 つの Node プロセスは **1 つの V8 ヒープ**です。約 3 MiB / 約 75 万トークンのコーディングエージェントによる `POST /v1/responses`（RTK + Caveman）が 2 件重なると、約 12 Gi でそのヒープが異常終了し（`FATAL ERROR: Reached heap limit`）、16 Gi の cgroup で OOM が発生する可能性があります。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。この測定結果は **メモリ予算**に関する警告であり、同時実行される長時間の `/v1/responses` を 2 件に制限する製品上のハード上限ではありません。重量級チャットの受け入れは、同じ V8/cgroup 上限から自動算出される取り込みバイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）によって制御されます。すでに適切にサイジングされたプロセスでこれを上方にオーバーライドする（または従来のリクエスト数上限 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` を設定する）と、再び異常終了が発生します。小規模なチャット、`/healthz`、`/v1/models`、および MCP は、この上限の**対象外**です。

### 1 プロセス: 2 件を超える長時間の `/v1/responses`

**正常な**プロセス（ヒープが `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`、デフォルト `0.75` を下回る）は、プロセス全体の処理中バイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）にまだ余裕があれば、長時間の `POST /v1/responses` を 2 件を超えて同時実行**できます**。`OMNIROUTE_CHAT_LARGE_BODY_BYTES`（デフォルト 256 KiB）以上のボディは、構造的に重いリクエストと同じ重量級リースを取得し、同じ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) の `tryAcquireHealthyHeadroom` エスケープ（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）を使用します。数十件の長時間 SSE クライアントの同時実行（運用者は多くの場合 40～50 件を必要とします）は、製品上の「最大 2 件」というハード上限ではなく、**メモリ予算**の問題です。ヒープ、プライマリ/ヘッドルームスロット、および `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` を適切にサイジングしてください。ヒープに負荷がかかっている場合は、#7849 の再発を防ぐため、引き続き再試行可能な `503` で負荷を排除します。

**ヒープを増やす**（独立した V8 old-space を使用する）ために、**現時点では**次のようにします。

| すべきこと                                                                                                                                                                  | すべきでないこと                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| それぞれ**固有**の `DATA_DIR` / ボリュームを持つ **N 個のコンテナ/Pod** を実行する                                                                                          | 1 つの SQLite ファイルに対して `replicas > 1` を設定する                       |
| ヒープ / 処理中バイト予算に基づいて、重量級の処理中リクエスト数と正常時ヘッドルームをサイジングする。1～2 件は保守的な #7849 のデフォルトであり、製品上のハード上限ではない | 1 つのプロセスに 8 倍の RAM と無制限の件数上限を与える                         |
| オプション: **共有クォータカウンター**には `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` を使用する                                                                  | Redis を共有 SQLite として扱う — Redis は共有 SQLite ではない                  |
| プロバイダーのシークレットを各インスタンスに複製する（またはダッシュボードの分割を許容する）                                                                                | インスタンス間で 1 つのダッシュボード / 1 つのコールログが共有されると想定する |
| 任意のロードバランサーを前段に配置する。API キーまたはセッション単位のスティッキー設定で十分                                                                                | ベンダー固有のサイズ認識ミドルウェアを必須とする                               |

ハードウェア: インスタンスごとの長時間 `/v1/responses` の同時実行数は、**メモリ予算**の問題です（ヒープ + 処理中バイト / #10110）。独立した `DATA_DIR` を持つ `N` 個のインスタンスでもヒープは増加します。ホスト RAM は「N=8 の 16 Gi Pod 1 個」ではなく、`N × cgroup` を収容できる必要があります。1 つの SQLite ファイルに対して `replicas > 1` を設定してはなりません。

Compose の概略例（2 つのヒープ、2 つのボリューム — `deploy.replicas: 2` ではありません）:

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

プロセス内密度（HTTP isolate からの圧縮処理の分離）については [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) を参照してください。共有された永続状態上の単一論理クラスターについては [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) を参照してください。

## 重要事項

- **SQLite WALモード:** OmniRouteが最新の変更を`storage.sqlite`へチェックポイントできるように、`docker stop`が完了するまで待機してください。同梱のComposeファイルでは、停止猶予期間がすでに40秒に設定されています。イメージを直接実行する場合は、`--stop-timeout 40`を指定してください。
- **`DISABLE_SQLITE_AUTO_BACKUP`:** 定期バックアップや書き込み前バックアップを外部で管理している場合は、`true`に設定してください。既存データベースのマイグレーションでは、引き続き独自の永続的な安全スナップショットと一括マイグレーション保護が必要です。
- **データの永続化:** コンテナの再起動後もデータベース、キー、設定を保持するには、必ず`/app/data`にボリュームをマウントしてください。
- **ポート設定:** デフォルトの`20128`ポートを変更するには、`PORT`環境変数を上書きしてください。

## 関連項目

- [VMデプロイガイド](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflareのセットアップ
- [Fly.ioデプロイガイド](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.ioへのデプロイ
- [環境設定](../reference/ENVIRONMENT.md) — 完全な`.env`リファレンス
