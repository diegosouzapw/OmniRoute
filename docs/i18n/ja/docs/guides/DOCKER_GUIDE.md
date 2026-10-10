# 🐳 Docker Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Docker デプロイに関する完全なリファレンスです。すぐに始める場合は、[README の Docker セクション](../README.md#-docker)を参照してください。

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
- [Caddy（HTTPS）を使用する Docker Compose](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [イメージタグ](#image-tags)
- [可用性：デフォルトの SQLite は単一レプリカ](#availability-default-sqlite-is-single-replica)
- [Docker 内での Gemini のリージョンエラー](#gemini-regional-errors-inside-docker)
- [重要な注意事項](#important-notes)

---

## クイック実行

> **1 つのコマンドでセルフホストしますか？**
> [セルフホストガイド](../getting-started/SELF_HOST_GUIDE.md)を参照してください —
> `docker compose -f docker-compose.selfhost.yml up -d`（公開済みイメージ +
> Redis、ループバックのみ、プロファイル選択なし）。以下のクイック実行は、
> Redis を別の場所ですでに実行しているユーザー向けの
> 単一コンテナ方式です。

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## 環境ファイルを使用する

```bash
# まず .env をコピーして編集します
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

# ホストプロファイル（Linux 優先。ホストの CLI バイナリを読み取り専用でマウント）
docker compose --profile host up -d

# Web プロファイル（Web セッションプロバイダー向けの Chromium/Playwright）
docker compose --profile web up -d

# CLI と CLIProxyAPI サイドカーを組み合わせる
docker compose --profile cli --profile cliproxyapi up -d
```

## 利用可能なプロファイル

OmniRoute には、主要なデプロイ構成向けの Compose プロファイルが用意されています。環境に適したものを選択してください。

| プロファイル         | サービス         | 使用する場面                                                                                                                                     | コマンド                                     |
| -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base`（デフォルト） | `omniroute-base` | ヘッドレスサーバー／最小ランタイム。プロバイダー CLI は同梱されません                                                                            | `docker compose --profile base up -d`        |
| `cli`                | `omniroute-cli`  | `omniroute providers/setup/doctor` および同梱 CLI（Codex、Claude Code、Droid、OpenClaw）を呼び出すエージェント型ワークフロー                     | `docker compose --profile cli up -d`         |
| `host`               | `omniroute-host` | `~/.local/bin`、`~/.codex`、`~/.claude` などを読み取り専用でマウントし、ホスト CLI への `network_mode` のようなアクセスを必要とする Linux ホスト | `docker compose --profile host up -d`        |
| `cliproxyapi`        | `cliproxyapi`    | アップストリーム CLI プロキシ用に、ポート `8317` で [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) サイドカーを実行する             | `docker compose --profile cliproxyapi up -d` |
| `web`                | `omniroute-web`  | ブラウザーを必要とする Web セッションプロバイダー：`gemini-web`、`claude-web`、`claude-turnstile`（Chromium を含む `runner-web` をビルド）       | `docker compose --profile web up -d`         |

> 複数のプロファイルを組み合わせることができます：`docker compose --profile cli --profile cliproxyapi up -d`。

## OmniRoute を Docker で実行する場合のホスト CLI ツールの設定

`omniroute setup-codex`、`setup-claude`、`config set <tool>`、およびダッシュボードの
**設定を保存**ボタンは、いずれも `~/.codex/*.config.toml` のようなファイルを書き込みます。これらのパスが
意味を持つのは、CLI が実際に動作しているマシン上だけです。コンテナ内で実行すると、
書き込み先はコンテナ自身のホーム（`/home/node` —
イメージは `USER node` で実行されます）になります。ホスト側の CLI がそこを読み取ることはなく、
コンテナが再作成された時点で内容は破棄されます。

OmniRoute はこれを検出し、利用できない成功結果を報告する代わりに、
手順を示して書き込みを拒否します。CLI は終了コード `2` で終了し、API は
`containerEphemeralTarget: true` を含む `422` を返します。

### 推奨：CLI はホストで、OmniRoute は Docker で実行する

コンテナは API を提供し、CLI はホスト上のツールを設定します。

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # CLI の接続先をコンテナに設定
omniroute setup-codex                      # ホスト上の実際の ~/.codex に書き込む
```

Codex、Claude Code、Cursor、または同様のツールをノート PC 上で実行する場合は、
これが適切な選択です。通常はこの構成になります。

### 代替案：ホストの設定ディレクトリをバインドマウントする（`host` プロファイル）

コンテナ自体からホストの設定に書き込みたい場合は、
各ディレクトリをマウントし、`CLI_CONFIG_HOME` をマウントルートに設定します。`host` プロファイルには、
この設定があらかじめ含まれています。

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

バインドマウントによって、パスを信頼できるようになります。OmniRoute は
`/proc/self/mountinfo` を読み取り、マウントされたパス（および子ディレクトリが
マウントされているディレクトリ。上記の `/host-home` はまさにこの構成です）への書き込みを許可する一方、
マウントされていないパスへの書き込みは引き続き拒否します。

### 最終手段：コンテナ自身の CLI を設定する（使用は慎重に）

CLI が実際にコンテナ内に存在する場合（`cli` プロファイル）、その書き込みは
意図されたものです。任意の `setup-*` コマンドに `--allow-container-write` を渡すか、
サーバーに `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` を設定してください。書き込みは、
コンテナが破棄されると保持されないという警告とともに実行されます。

> **セキュリティ警告 — `cli` プロファイルと `docker.sock` のマウント。**
> `cli` プロファイルは `/var/run/docker.sock` をバインドマウントし、コンテナ内の
> 自動更新機能がホストのデーモンを通じてスタックを再作成できるようにします
> （`src/lib/system/autoUpdate.ts` はそのソケットの有無を確認し、
> 存在しない場合は Docker 経由の処理をスキップします）。このソケットは
> **ホストの root 権限に関わる信頼境界**です。そこへアクセスできるものはすべて、
> root としてホストの Docker デーモンを操作できます。つまり、ホスト上のあらゆるコンテナを
> 作成、検査、停止、削除できます。
> 注意事項：
>
> 1. **`cli` プロファイルのポートをネットワークに公開しないでください。**
>    `127.0.0.1` 上で公開してください（`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`）。
>    LAN から到達可能な `cli` プロファイルでは、ダッシュボードレベルの RCE が
>    ホスト全体の侵害につながります。
> 2. **追加のホストディレクトリを `cli` プロファイルへバインドしないでください。**
>    Docker ソケットと追加マウントを組み合わせると、コンテナはファイルシステムとホスト設定に対する
>    完全な読み書き権限を得ます。ツールからプロジェクトを参照する必要がある場合は、
>    CLI バイナリを使ってローカルで実行してください。`cli` コンテナ内にはマウントしないでください。
>
> コンテナ内での自動更新が不要な場合は、`cli` プロファイルを有効にしないでください
> （`COMPOSE_PROFILES=core,redis` またはより短い構成を使用します）。ほかのプロファイルは
> Docker ソケットをマウントしません。
>
> MITM に関連する脅威モデルについては、`docs/security/MITM-TPROXY-DECRYPT.md`（git 上にあり、`/docs` には
> コンパイルされません）を参照してください。また、
> `codex`/`claude-code`/`droid`/`openclaw` バイナリの来歴チェーンについては、
> `docs/security/SUPPLY_CHAIN.md` を参照してください。

## Redis サイドカー

OmniRoute は、分散レートリミッターと共有キャッシュのバックエンドとして Redis を使用します。`redis` サービスは `docker-compose.yml` で**常に定義されており**（プロファイルによる制限はありません）、他のどのプロファイルとも一緒に起動します。

| 詳細                     | 値                                            |
| ------------------------ | --------------------------------------------- |
| イメージ                 | `redis:7-alpine`                              |
| コンテナ名               | `omniroute-redis`                             |
| 内部ポート               | `6379`                                        |
| ホストポート（上書き）   | `REDIS_PORT`（デフォルトは `6379`）           |
| ホストバインド（上書き） | `REDIS_BIND_HOST`（デフォルトは `127.0.0.1`） |
| ボリューム               | `omniroute-redis-data` → `/data`              |
| ヘルスチェック           | `redis-cli ping`（間隔は 10 秒）              |

関連する環境変数：

- `REDIS_URL` — アプリに注入される接続文字列（デフォルトは `redis://redis:6379`）。
- `REDIS_PORT` — Redis コンテナに対するホスト側のポートマッピング。
- `REDIS_BIND_HOST` — ポートを公開するホストインターフェース。デフォルトは `127.0.0.1`。

> **デフォルトでループバックを使用する理由：** サイドカーは `requirepass` なしで実行され、アプリ
> コンテナは compose ネットワーク（`redis:6379`）経由でサイドカーに接続します。公開ポートは、
> ホスト側のツール（`redis-cli`、ローカルの `npm run dev`）で使用するためだけに存在します。
> `0.0.0.0` で公開すると、認証されていない Redis が LAN 上のすべてのホストに公開されます。
> `REDIS_BIND_HOST=0.0.0.0` を設定する場合は、サービスの `command:` に `--requirepass` も追加してください。

**Redis を無効にすること**は推奨されません（レートリミッターがインメモリのフォールバックに縮退します）。無効にする必要がある場合は、`docker-compose.yml` の `redis:` サービスブロックを削除またはコメントアウトするか、ゼロにスケールしてください：

```bash
docker compose up -d --scale redis=0
```

## 本番用 Compose

開発環境と並行して実行できる分離された本番スナップショットには、`docker-compose.prod.yml` を使用します。

| 詳細                             | 値                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| ファイル                         | `docker-compose.prod.yml`                                                             |
| デフォルトのダッシュボードポート | `PROD_DASHBOARD_PORT=20130`（内部の `${DASHBOARD_PORT:-20128}` にマッピング）         |
| デフォルトの API ポート          | `PROD_API_PORT=20131`                                                                 |
| イメージ                         | `omniroute:prod`（`runner-cli` ターゲットからビルド）                                 |
| Redis コンテナ                   | `omniroute-redis-prod`（`redis:8.6.2`、専用の `redis-prod-data` ボリューム）          |
| データボリューム                 | `omniroute-prod-data`（名前付き、再ビルド後も保持）                                   |
| ヘルスチェック                   | `node healthcheck.mjs` + `redis-cli ping`、`depends_on` は Redis の正常性を条件に制御 |

使用方法：

```bash
# 本番スタックをビルドして起動
docker compose -f docker-compose.prod.yml up -d --build

# ログをストリーミング表示
docker compose -f docker-compose.prod.yml logs -f

# 停止して削除（ボリュームは保持）
docker compose -f docker-compose.prod.yml down
```

本番スタックは開発用 compose と並行して実行されます（コンテナ名、ポート、ボリュームが異なります）。そのため、本番環境を稼働させたまま、ローカルで開発を継続できます。

## Dockerfile ステージ

このリポジトリには、マルチステージ Dockerfile（`Dockerfile`）が含まれています。4 つのステージが公開されているため、用途に適した `target` を選択してください。

| ステージ      | ベースイメージ        | 用途                                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | 依存関係をインストールし（`npm ci --legacy-peer-deps`）、`npm run build` を実行します（デフォルトでは Turbopack — 以下の「ビルド時のリソース」を参照）                                                                                                                                                                              |
| `runner-base` | `node:26-trixie-slim` | Next.js の standalone 出力を含む本番ランタイムです。**プロバイダー CLI は同梱されていません。**                                                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | `git`、`docker.io`、`docker-compose` と、グローバル CLI の `@openai/codex`、`@anthropic-ai/claude-code`、`droid`、`openclaw` を追加します。**エージェント型ワークフローにはこれを選択してください。**                                                                                                                               |
| `runner-web`  | `runner-base`         | Web セッションプロバイダー `gemini-web`、`claude-web`、`claude-turnstile` 向けに、Playwright と Chromium ブラウザー（`--with-deps`）を追加します。**これらのプロバイダーを使用する場合は、これを選択してください** — 通常のイメージでは、これがないとリクエスト時に失敗します（「リリースチャネル」の `-web` に関する注記を参照）。 |

特定のターゲットを手動でビルドするには、次を実行します。

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### ビルド時のリソース

3 つのビルド引数により、`builder` ステージのリソース消費量を制御できます。これらはビルド時にのみ使用されます —
`OMNIROUTE_MEMORY_MB`（後述）は、これらとは別のランタイム設定です。

| ビルド引数                  | デフォルト | 効果                                                                                                     |
| --------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | `0` は webpack でビルドします。ピークメモリは少なくなりますが、低速です。`1` で Turbopack を使用します。 |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | 起動される `next build` の V8 ヒープ上限（`--max-old-space-size`）です。                                 |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | `CIRCLE_NODE_TOTAL` に渡されます。Next はページデータ収集用として `workers = N - 1` を算出します。       |

`OMNIROUTE_BUILD_WORKERS` は、大規模なビルダーでは増やすべき設定であり、リソースが制限された環境で `✓ Compiled successfully` の**後に**ビルドが停止した場合に疑うべき設定でもあります。各ページデータワーカーはそれぞれ独立したプロセスであり、親の `next build` 自体も別プロセスです。実際の VPS での再現（issue #7518）では、各プロセスのピーク RSS が `NODE_OPTIONS` のヒープフラグとは無関係に約 4.5 GB であることが測定されました（Turbopack は V8 ヒープ外のネイティブ/Rust メモリでコンパイルします）。デフォルト値の `2`（→ ワーカー 1 個、合計 2 プロセス）は、公開パイプラインで使用される 16 GB / 4 vCPU の GitHub ホステッドランナー向けに設定されています。`8`（→ ワーカー 7 個）では、そのランナーがメモリ不足になり、buildkit は `ResourceExhausted: ... cannot allocate memory` でステップに失敗しました。プロセスごとの RSS を推測ではなく直接測定したところ、`3`（→ ワーカー 2 個）でも収まりませんでした。`tests/unit/docker-build-memory-budget.test.ts` は測定値に基づいて計算を行い、いずれかの設定値がランナーの容量を超える場合に失敗します。

Turbopack は V8 ヒープの**外部**に存在するネイティブ Rust メモリでコンパイルするため、`OMNIROUTE_BUILD_MEMORY_MB` ではその使用量を制限できません。メモリ上限のあるホストでは、エラーテキストが一切表示されないまま OOM killer によってビルドが SIGKILL されます。つまり、`Creating an optimized production build` の途中で単に停止するため、メモリ不足ではなくハングしているように見えます。そのため、`npm run dev` / `npm run build` ではコード上のデフォルトが Turbopack であるのとは異なり、`Dockerfile` では webpack（`OMNIROUTE_USE_TURBOPACK=0`）がデフォルトになっています。ビルド引数を指定しない素の `docker build .`（Railway などのワンクリックホストが実行するもの）が、メモリ制限のあるビルダー上で何も表示せず停止してはならないためです。公開済みイメージでは、`docker-publish.yml` 内で `OMNIROUTE_USE_TURBOPACK=0` がすでに明示的に渡されています。十分な RAM を備えたビルダーでは、ビルドを高速化するために Turbopack を有効にしてください。

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` が有効になっているため、`next build` は親プロセスとワーカープロセスの**両方**を実行し、それぞれが個別に `OMNIROUTE_BUILD_MEMORY_MB` に従います。コンテナの上限は、その値の約 1 倍ではなく、約 2 倍を上回るように設定してください。

このツリーでの測定結果（`--target runner-base`、`OMNIROUTE_BUILD_MEMORY_MB=6144`）：

| バンドラー | コンテナ上限   | 結果                               |
| ---------- | -------------- | ---------------------------------- |
| Turbopack  | 8 GiB / 16 GiB | どちらでも通知なく OOM kill された |
| webpack    | 8 GiB          | ビルドワーカーが SIGKILL された    |
| webpack    | 12 GiB         | 成功、ピークは 11.1 GiB            |

### ランタイムのデフォルト

`runner-base` によってエクスポートされるデフォルト値：`PORT=20128`、`HOSTNAME=0.0.0.0`、`OMNIROUTE_MEMORY_MB=1024`、`NODE_OPTIONS=--max-old-space-size=1024`、`DATA_DIR=/app/data`、`OMNIROUTE_MIGRATIONS_DIR=/app/migrations`。

Docker でのメモリ動作：

- イメージでは `OMNIROUTE_MEMORY_MB=1024` が設定され、そこから `NODE_OPTIONS=--max-old-space-size=1024` が導出されます。
- 実際のサーバープロセスはスタンドアロンランチャーによって起動されます。このランチャーは `OMNIROUTE_MEMORY_MB` を読み取り、`--max-old-space-size=<OMNIROUTE_MEMORY_MB>` を追加します。
- Node は繰り返し指定された最後の `--max-old-space-size` の値を使用するため、`OMNIROUTE_MEMORY_MB` を設定することで、Docker で実際に適用されるヒープ上限を制御できます。
- イメージでは常にこの値が設定されるため、Docker 環境ではランチャー独自の RAM 容量に基づくフォールバックは適用されません。ワークロードに応じて明示的に増やしてください（下表を参照）。コーディングエージェントの `/v1/responses` には、`2048` でもまだ小さすぎます。

### コーディングエージェントの実行時 RAM

Docker のデフォルトである 1 GiB は、ダッシュボードや軽量チャット向けの最低ラインであり、本番環境向けの容量ではありません。長い `POST /v1/responses` のボディ（数百件のメッセージ、数十個のツール）は、圧縮処理中に複数のインメモリグラフを保持します。約 3 MiB / 約 75 万トークンのリクエストが 2 件重複すると、**12 GiB** の old-space で V8 が異常終了し（`FATAL ERROR: Reached heap limit`）、16 GiB の cgroup でも OOM が発生しています。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。

**cgroup の `--memory` はヒープより大きく設定してください** — ネイティブバッファ、SQLite、圧縮処理の中間データは V8 の外部に配置されます。

| ワークロード                                       | `OMNIROUTE_MEMORY_MB`          | コンテナ / cgroup   | 注記                                                                                                                |
| -------------------------------------------------- | ------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ダッシュボード、軽量チャット 1 件                  | `1024`（イメージのデフォルト） | ≥2 GiB              |                                                                                                                     |
| コーディングエージェント 1 件（Claude/Codex/Grok） | `8192`                         | ≥10 GiB             | 一般的な単一セッションの `/v1/responses`                                                                            |
| 長い `/v1/responses` の同時実行 2 件               | `10240`–`12288`                | ≥12–16 GiB          | 約 12 GiB のヒープで V8 の異常終了を確認                                                                            |
| 長いコンテキストの同時実行 3 件以上                | 1 プロセスでは実行しない       | 直列化 / RAM の増設 | デフォルトでは高負荷リクエストの実行中上限は 1 件です。RAM を増やさずにこの上限を引き上げると、異常終了が再発します |

ベアメタル上の `omniroute serve` は、`OMNIROUTE_MEMORY_MB` が**未設定**の場合、RAM の約 35%（`[512, 4096]` の範囲に制限）に調整します。Docker では常に `1024` が設定されるため、公式イメージではこの調整処理は実行されません。

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## 重要な環境変数

[ENVIRONMENT.md](../reference/ENVIRONMENT.md) に記載されているデフォルトに加えて、Docker 環境で実行する際には、以下の変数が特に重要です。

| 変数                          | 用途                                                                                                                                                                                                                                                                                                               | デフォルト                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket ブリッジ用の共有シークレット。**本番環境では必須** — 強力なランダム文字列を設定してください。                                                                                                                                                                                                            | 未設定（指定必須）        |
| `REDIS_URL`                   | レートリミッター／キャッシュバックエンドへの接続文字列                                                                                                                                                                                                                                                             | `redis://redis:6379`      |
| `REDIS_PORT`                  | 同梱 Redis コンテナ用のホスト側ポート                                                                                                                                                                                                                                                                              | `6379`                    |
| `REDIS_BIND_HOST`             | 同梱 Redis のポートを公開するホストインターフェイス（AUTH を追加しない限りループバック）                                                                                                                                                                                                                           | `127.0.0.1`               |
| `AUTO_UPDATE_HOST_REPO_DIR`   | 自己更新ワークフローのために、`cli` プロファイル内の `/workspace/omniroute` にマウントされるホストパス                                                                                                                                                                                                             | `.`（現在のディレクトリ） |
| `OMNIROUTE_MEMORY_MB`         | Docker スタンドアロンサーバーにおける Node ヒープの実行時上限。上記のイメージデフォルトを上書きします。コーディングエージェントの場合: `8192` 以上（[実行時 RAM](#runtime-ram-for-coding-agents)を参照）。                                                                                                         | `1024`                    |
| `DASHBOARD_PORT` / `API_PORT` | ダッシュボード（20128）および API（20129）の公開ポートを上書きします                                                                                                                                                                                                                                               | `20128` / `20129`         |
| `APP_BIND_HOST`               | docker-compose がダッシュボード／API／ライブ WS の各ポートを公開するホストインターフェイス。`REQUIRE_API_KEY=false`（デフォルト）の場合、`0.0.0.0` は匿名の `/v1` プロキシを LAN に公開します。公開範囲を広げるのは、`REQUIRE_API_KEY=true` を設定するか、前段にリバースプロキシを配置する場合のみにしてください。 | `127.0.0.1`               |
| `CLIPROXY_BIND_HOST`          | docker-compose が `cliproxyapi` サイドカーを公開するホストインターフェイス。そのデータボリュームにはプロバイダーの認証情報が保存されます。                                                                                                                                                                         | `127.0.0.1`               |
| `OMNIROUTE_PLUGINS_DIR`       | ランタイムのプラグインスキャナーが読み取りおよびインストールに使用するディレクトリ。プラグインをバインドマウントする場合に設定してください。デフォルトは `HOME` に従いますが、イメージによってはエクスポートされないことがあります。                                                                               | `~/.omniroute/plugins`    |
| `OMNIROUTE_BASE_PATH`         | アプリをリバースプロキシの背後で公開する場合の URL サブパス（例: `/omniroute`）                                                                                                                                                                                                                                    | _（空 = ルート）_         |
| `NEXT_PUBLIC_BASE_URL`        | サブパスを含む公開ブラウザーオリジン（例: `https://host/omniroute`）                                                                                                                                                                                                                                               | 未設定                    |
| `PROD_DASHBOARD_PORT`         | `docker-compose.prod.yml` 用のホスト側ダッシュボードポート                                                                                                                                                                                                                                                         | `20130`                   |
| `CLIPROXYAPI_PORT`            | `cliproxyapi` サイドカー用のホスト側ポート                                                                                                                                                                                                                                                                         | `8317`                    |

## サブパス上のリバースプロキシ（Traefik / nginx）

Next.js の `basePath` は standalone バンドルにコンパイルされます。OmniRoute は、ビルド時に埋め込まれた値をアプリルートのセンチネルファイルに記録し（`npm run build` の実行中に書き込まれ、`scripts/docker/ensure-docker-base-path.mjs` によって読み込まれます）、コンテナ起動時に `OMNIROUTE_BASE_PATH` と比較します。値が異なり、イメージがドメインルート向けにビルドされている場合、エントリポイントは `node dev/run-standalone.mjs` が実行される前に、standalone マニフェスト、埋め込まれた `basePath`/`assetPrefix` リテラル（Next 16 は `assetPrefix` のみから SSR アセット URL をレンダリングするため、パッチャーはサブパスをそこにも反映します）、埋め込み済みの `/_next/static` アセット URL（クライアント参照マニフェスト、メディアインポート、事前レンダリング済みエラーページ）、およびクライアントの `process.env` shim を書き換えます。

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

公開されている `diegosouzapw/omniroute:*` イメージは、ドメインルート向けにビルドされています。それでもランタイムに `OMNIROUTE_BASE_PATH` を設定できます。コンテナは起動時にバンドルへ一度だけパッチを適用します。対応する公開オリジンも併せて設定してください。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

リバースプロキシは、外部パスを**完全な形のまま**転送するように設定してください（プレフィックスを削除しないでください）。Traefik は `StripPrefix` を使用せずに `PathPrefix(`/omniroute`)` をコンテナへルーティングし、Next.js が `/omniroute/...` を受け取り、`/omniroute/_next/...` からアセットを配信できるようにする必要があります。

Docker のヘルスチェックは、アクティブな `OMNIROUTE_BASE_PATH` が先頭に付加された軽量の `/healthz` ライフサイクルエンドポイントをプローブします。`/api/monitoring/health` は、人による診断やダッシュボードでの診断用として引き続き利用できます。コンテナの HEALTHCHECK が再びこのエンドポイントを参照するようにするには（たとえば、詳細なヘルスチェックを適用する場合）、`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health` を設定します。このパスは**詳細な**チェック（DB + モニタリング概要）です。再び有効にする場合、実行頻度の低い Docker の `HEALTHCHECK` には適していますが、Kubernetes の `livenessProbe` 間隔には**適していません**。

オーケストレーター（Kubernetes、Nomad など）の場合：

| プローブ        | 推奨                                                                          | 非推奨                                                       |
| --------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Liveness        | HTTP `GET /livez`、またはメインポート（`PORT`、デフォルトは `20128`）への TCP | liveness としての `/api/monitoring/health`                   |
| Readiness       | HTTP `GET /healthz`                                                           | イベントループがビジーな状態を停止と見なす厳しいタイムアウト |
| Deep / blackbox | `/api/monitoring/health`                                                      | —                                                            |

`/healthz` はプロセスのライフサイクル（`ok` / `starting` / `stopping`）を報告します。`/livez` はプロセスが生存していることのみを確認します（ハンドラーを実行できる場合は常に 200 を返し、readiness を待機しません）。どちらもリクエスト処理と同じ Node イベントループ上で動作するため、CPU 負荷の高いカタログ処理や圧縮処理によって応答が遅延する可能性があります。ビジー ≠ 停止です。HTTP プローブがタイムアウトする場合は、TCP liveness を推奨します。プローブに関する完全なガイダンス：
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
      # OAuth コールバック、ダッシュボードのリンク、生成される公開 URL に使用するブラウザ向けオリジン。
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # スケジュールされたジョブ／自己フェッチに使用する、サーバー間通信用の内部 URL。
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

Caddy は、アップストリームコンテナ用の標準転送ヘッダーを設定します。OmniRoute は、
OAuth コールバックおよび生成される公開リンクの正規公開オリジンとして
`NEXT_PUBLIC_BASE_URL` を使用します。認証済みのダッシュボード書き込みでは、同一オリジンのリクエストとセッションに紐付けられた CSRF
保護が使用されます。明示的な設定ではなく、信頼済みの転送ヘッダーから OmniRoute に公開オリジンを意図的に
導出させたい高度なデプロイメントの場合にのみ、`OMNIROUTE_TRUST_PROXY` を有効にしてください。

## Cloudflare Quick Tunnel

Docker デプロイメント向けのダッシュボードでは、`Dashboard → Endpoints` からワンクリックで **Cloudflare Quick Tunnel** を利用できます。初めて有効化すると、必要な場合にのみ `cloudflared` がダウンロードされ、現在の `/v1` エンドポイントへの一時的なトンネルが開始されます。生成された `https://*.trycloudflare.com/v1` URL は、通常の公開 URL のすぐ下に表示されます。

エンドポイントのトンネルパネル（Cloudflare、Tailscale、ngrok）は、アクティブなトンネルの状態を変更することなく、`Settings → Appearance` から表示または非表示にできます。

### トンネルに関する注意事項

- Quick Tunnel の URL は一時的なもので、再起動のたびに変更されます。
- OmniRoute またはコンテナの再起動後、Quick Tunnel は自動的に復元されません。必要な場合はダッシュボードから再度有効にしてください。
- マネージドインストールは現在、`x64` / `arm64` 上の Linux、macOS、Windows をサポートしています。
- マネージド Quick Tunnel は、制約のあるコンテナ環境で大量に出力される QUIC UDP バッファ警告を回避するため、デフォルトで HTTP/2 トランスポートを使用します。別のトランスポートを使用する場合は、`CLOUDFLARED_PROTOCOL=quic` または `auto` を設定してください。
- Docker イメージにはシステム CA ルートが同梱されており、それらがマネージド `cloudflared` に渡されます。これにより、コンテナ内でトンネルをブートストラップする際の TLS 信頼エラーを回避できます。
- OmniRoute でダウンロードしたバイナリの代わりに既存のバイナリを使用する場合は、`CLOUDFLARED_BIN=/absolute/path/to/cloudflared` を設定してください。

## イメージタグ

| イメージ                 | タグ     | サイズ | 説明                                                                      |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | **公開済み**の安定版 SemVer のうち最新のもの（git `main` ではありません） |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | GitOps ではこの種類のタグに固定してください                               |

マルチプラットフォームマニフェスト：`linux/amd64` + `linux/arm64` ネイティブ（Apple Silicon、AWS Graviton、Raspberry Pi）。Docker は一致するアーキテクチャを自動的に選択します。ARM ホスト上で AMD64 エミュレーションを強制する必要がある場合は、`--platform linux/amd64` を渡してください。

### リリースチャンネル

OmniRoute は、安定版リリース、アクティブなリリースブランチのテスト、開発ビルド用に、それぞれ個別の Docker チャンネルを公開しています。

| チャンネル                      | ソース                                       | 可変性                       | 推奨用途                                                                                                             |
| ------------------------------- | -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | 署名済み／バージョン付きリリース             | 不変                         | 正確なリリースに固定する本番環境デプロイメント                                                                       |
| `:latest` / `:latest-web`       | **公開済み**の安定版 SemVer のうち最新のもの | 可変の安定版ポインター       | SemVer の公開ジョブ**後**に安定版リリースを追従します。`main` や未リリースの `release/v*` コミットは追跡**しません** |
| `:next` / `:next-web`           | 現在のデフォルト `release/v*` ブランチ       | 可変のプレリリースポインター | アクティブなリリースブランチに取り込まれているものの、まだ安定版リリースには含まれていない修正のテスト               |
| `:main` / `:main-web`           | `main` ブランチ                              | 可変の開発版ポインター       | 開発および統合テスト専用                                                                                             |

#### Web セッションプロバイダー：`-web` イメージ

上記のすべてのチャンネルには、`runner-web` ステージからビルドされた `-web` タグ（`:latest-web`、`:<version>-web`、`:next-web`、`:main-web`）も用意されています。これは、同じイメージに Playwright と Chromium ブラウザを追加したものです。通常のイメージには Chromium が**含まれていません**。`gemini-web`、`claude-web`、`claude-turnstile` には Chromium が必要です。

エラーは起動時ではなく、実際に使用するまで先送りされます。これらのプロバイダーはモデルを一覧表示し、ダッシュボード上では接続済みと表示されますが、最初のリクエストでのみ次のエラーが発生します。

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

これらのプロバイダーを使用する場合は、現在利用しているチャンネルの `-web` タグを取得してください。それ以外の変更は不要です。npm/CLI インストール（Docker イメージを使用しない場合）では、不足している同等の要素はブラウザバイナリです。ホスト上で `npx playwright install chromium` を実行してください。

#### プレリリースチャンネルの使用

`next` チャンネルは、現在のデフォルトの `release/v*` ブランチへのプッシュごとに再ビルドされ、AMD64 と ARM64 の両方に対して公開されます。古いメンテナンスブランチがこのチャンネルを上書きすることはできません。このチャンネルでは、次の安定版タグが作成される前に、アクティブなリリースブランチへマージされた修正を含むプル可能なイメージが提供されます。

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

`next` は変動するプレリリースチャンネルです。アクティブなリリースブランチへのプッシュのたびに変更される可能性があり、**本番環境での使用はサポートされていません**。特定のビルドを評価する間は、イメージダイジェストを固定してください。

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

テストする前に、OmniRoute のデータボリュームまたはバインドマウントされたデータディレクトリをバックアップしてください。ロールバックするには、以前使用していた安定版またはダイジェストに戻し、コンテナを再作成します。

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

リリースブランチのビルドによって `latest` が更新されることはありません。安定版ポインターを昇格できるのは、条件を満たす安定版のセマンティックバージョンのみです。`next` イメージでも、リリースイメージの検査と、CRITICAL 脆弱性がある場合にブロックするゲートが維持されます。

**`latest` は、git における最新性を保証するものではありません。** `main` またはアクティブな `release/v*` ブランチへマージされた修正は、安定版 SemVer イメージが公開され、公開ジョブによって `:latest` が昇格されるまで（その SemVer と同じダイジェスト）、`:latest` には含まれません。GitHub にはすでに修正が表示されているのに `latest` が更新されていないように見える場合は、`:next` をプルしてリリースブランチをテストするか、SemVer タグが作成されるまで待ってください。

| 目的                                                     | 使用するもの                                 |
| -------------------------------------------------------- | -------------------------------------------- |
| ドリフトを許容できない GitOps／本番環境                  | `:X.Y.Z`（またはイメージダイジェスト）を固定 |
| 公開済みの安定版を追跡し、各リリースでの再作成を許容する | `:latest`                                    |
| 未リリースの `release/v*` コミットをテストする           | `:next`（本番環境では使用不可）              |
| `main` をテストする                                      | `:main`（本番環境では使用不可）              |

## 可用性: デフォルトの SQLite はシングルレプリカ

標準の Docker / Kubernetes OmniRoute は、**1 つの Node プロセス + 1 つの SQLite ライター**で構成されます。このトポロジーでは高可用性は**サポートされません**。

| 制約                                     | 結果                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| シングルライター                         | 同じ SQLite ファイルに対して複数のレプリカを実行しないでください。DB が破損します。                                                                                                                                                                                                                                                                           |
| 再作成 / 再起動 / HEALTHCHECK による停止 | 処理中の SSE、ダッシュボードセッション、およびインメモリ状態が**全面的に停止**します。接続中のすべてのクライアントが切断されます。エンドポイントが存在しない間の新規リクエストには、OmniRoute JSON ではなく、リバースプロキシの **`502 Bad Gateway: Unknown error`** が返されます。そのため、クライアントはこれをプロバイダー障害と区別できません（#11015）。 |
| `/healthz` と同じイベントループ          | カタログ処理や圧縮処理の負荷が高いとプローブが遅延する可能性があり、タイムアウトが短い場合は、**唯一の**レプリカが再起動されます。                                                                                                                                                                                                                            |

**プローブマトリクス**（[Kubernetes のプローブに関する推奨事項](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)も参照）:

| プローブ        | 対象                                                                 | 使用しないもの                                           |
| --------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Liveness        | `PORT`（デフォルトは `20128`）への TCP、またはソフト HTTP `/healthz` | `/api/monitoring/health`                                 |
| Readiness       | HTTP `GET /healthz`                                                  | イベントループの高負荷を停止状態と見なす短いタイムアウト |
| 詳細確認 / 人間 | `/api/monitoring/health`                                             | 自動化された kubelet の liveness                         |

**アップグレード:** すべてのセッションが切断されることを想定してください。可能であればクライアントをドレインしてください。デフォルトの SQLite ではローリングアップデートを実行できません。Compose の `restart: unless-stopped` と Docker の `HEALTHCHECK` を組み合わせた場合も、コンテナが Unhealthy になると唯一のプロセスが置き換えられます。影響範囲は同じです。

**シングルレプリカ**用の Kubernetes スニペット（Recreate が必須です。1 つの SQLite ファイルに対して `replicas` を増やさないでください）:

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

`preStop` の sleep により、SIGTERM の前に kube が Service エンドポイントを削除できるため、停止中のプロセスに**新しい**トラフィックが到達しなくなります。処理中の `/v1/responses` SSE は、重量級のアドミッションリースを介して、最大 `SHUTDOWN_TIMEOUT_MS`（デフォルトは 30 秒）までドレインされます（#11015）。それでもプロセスに到達した新規リクエストには、`503` + `Retry-After: 5` が返されます。置き換え先が Ready になるまでの Recreate によるエンドポイント不在期間は、完全な停止状態のままです。これは SQLite トポロジーによるものであり、プローブの設定ミスではありません。

外部 Postgres / マルチライター HA は、標準構成として文書化された方法では**ありません**。HA が必要な場合は、シングルレプリカを維持するか、プロジェクトが別途テストして文書化したトポロジーを実行してください。Postgres/MySQL 対応の作業については、[#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)を参照してください。それが提供されるまでは、**大規模な** `/v1/responses` の処理能力を増やす唯一のサポート対象の方法は、N 個の独立したプロセス（次のセクション）であり、1 つのボリュームに対する `replicas > 1` ではありません。

## スケールアウト: N 個の独立プロセス

1 つの Node プロセスは **1 つの V8 ヒープ**です。約 3 MiB / 約 750k トークンのコーディングエージェントによる `POST /v1/responses`（RTK + Caveman）が 2 件重なると、約 12 Gi でそのヒープが異常終了し（`FATAL ERROR: Reached heap limit`）、16 Gi の cgroup で OOM が発生する可能性があります。[#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849) を参照してください。この測定結果は **メモリ予算**に関する警告であり、同時実行される長時間の `/v1/responses` を 2 件までに制限する製品上のハード上限ではありません。高負荷チャットの受け入れは、同じ V8/cgroup 上限から自動算出される取り込みバイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`、`src/shared/middleware/admissionBudget.ts`）によって制御されます。すでにサイジング済みのプロセスでこの値を上方に上書きする（または従来のリクエスト数上限 `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` を設定する）と、再び異常終了が発生します。小規模なチャット、`/healthz`、`/v1/models`、MCP はこの上限の**対象外**です。

### 単一プロセス: 3 件以上の長時間 `/v1/responses`

**健全な**プロセス（ヒープが `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`、デフォルト `0.75` を下回る状態）では、プロセス全体の処理中バイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110）にまだ余裕がある場合、3 件以上の長時間 `POST /v1/responses` を同時に実行**できます**。`OMNIROUTE_CHAT_LARGE_BODY_BYTES`（デフォルト 256 KiB）以上のボディは、構造的に負荷の高いリクエストと同じ高負荷リースを取得し、同じ [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) の `tryAcquireHealthyHeadroom` エスケープ（`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`）を使用します。数十件の長時間 SSE クライアントを同時実行すること（運用者が 40～50 件を必要とする場合もよくあります）は**メモリ予算**の問題です。ヒープ、プライマリ/ヘッドルームスロット、および `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` をサイジングしてください。これは製品上の「最大 2 件」というハード上限ではありません。ヒープが逼迫した場合も、再試行可能な `503` によって負荷を制限するため、#7849 の問題が再発することはありません。

**ヒープを増やす**（独立した V8 old-space を使用する）現時点での方法:

| すべきこと                                                                                                                                                              | すべきでないこと                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **N 個のコンテナ/Pod**を、それぞれ**固有の** `DATA_DIR` / ボリュームで実行する                                                                                          | 1 つの SQLite ファイルに対して `replicas > 1` を設定する                       |
| ヒープ / 処理中バイト予算に基づいて高負荷処理中リクエスト数と健全時ヘッドルームをサイジングする。1～2 件は保守的な #7849 のデフォルトであり、製品上のハード上限ではない | 1 つのプロセスに 8 倍の RAM と無制限の件数上限を与える                         |
| 任意: **共有クォータカウンター**には `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` を使用する                                                                    | Redis を共有 SQLite として扱う — Redis は共有 SQLite ではない                  |
| プロバイダーのシークレットを各インスタンスに複製する（またはダッシュボードが分割されることを許容する）                                                                  | インスタンス間で 1 つのダッシュボード / 1 つのコールログが共有されると期待する |
| 任意のロードバランサーを前段に配置する。API キーまたはセッション単位のスティッキー方式で十分                                                                            | ベンダー固有のサイズ対応ミドルウェアを必須とする                               |

ハードウェア: インスタンスごとに同時実行可能な長時間 `/v1/responses` の数は、**メモリ予算**の問題です（ヒープ + 処理中バイト / #10110）。独立した `DATA_DIR` を持つ `N` 個のインスタンスでもヒープは増加します。ホストの RAM は「N=8 の 16 Gi Pod 1 個」ではなく、`N × cgroup` を収容できなければなりません。1 つの SQLite ファイルに対して `replicas > 1` を設定してはいけません。

Compose の例（2 つのヒープ、2 つのボリューム — `deploy.replicas: 2` ではありません）:

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

プロセス内の高密度化（圧縮処理を HTTP isolate から分離）は [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023) です。共有された永続状態を使用する単一の論理クラスターは [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075) です。

## Docker 内で発生する Gemini のリージョンエラー

Google AI Studio / Gemini API は、HTTP 400、FAILED_PRECONDITION、および
`User location is not supported for the API use.` を返すことがあります。ホスト上でリクエストが成功しても、
コンテナが同じ送信経路を使用しているとは限りません。DNS の順序、
IPv4/IPv6 接続、VPN ルーティング、設定済みプロキシが異なる可能性があります。
[Google がサポートするリージョン](https://ai.google.dev/gemini-api/docs/available-regions)
と実際の接続経路の両方を確認してください。このエラーだけでは、不正な API キーであるとは判断できません。

### 接続単位のプロキシを優先する

影響を受ける Gemini 接続には、OmniRoute の[接続単位のプロキシ設定](../ops/PROXY_GUIDE.md#4-level-proxy-system)
を使用し、その後、同じモデルで **Test Connection** と小規模なリクエストを
再度実行してください。これにより、ルーティングの変更をその接続だけに限定できます。
コンテナからプロキシに到達できること、および接続が実際にそのプロキシを選択していることを
確認してください。経路を変更しても、アップストリーム側のリージョン利用資格が保証されるわけではありません。

### ホストとコンテナのネットワークを比較する

認証済みの結果を比較するときは、キー、モデル、リクエストを同一に保ってください。
認証情報、プロキシのパスワード、完全な Authorization ヘッダーを Issue に貼り付けてはいけません。
まず、OS のリゾルバーが提供するアドレスファミリーを、ホストとコンテナ内で同じコマンドを使用して
確認します。

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

`omniroute` は、実行しているサービス（たとえば `omniroute-web`）に置き換えてください。これらの
コマンドは、認証情報や IP アドレスを表示せずにアドレスファミリーを出力します。`6` が返されても、
IPv6 の DNS 結果が存在することを示すだけです。使用可能な IPv6 経路や API アクセスを
証明するものでは**ありません**。`curl` がインストールされている場合は、両方の環境で
`curl -4 -I https://generativelanguage.googleapis.com` と
`curl -6 -I https://generativelanguage.googleapis.com` を比較してください。
HTTP レスポンスが返れば、未認証エラーであっても、そのプローブで接続できたことは証明されます。
Gemini の利用資格を確認できるのは、認証済みのモデルリクエストだけです。

### ホストレベルの代替手段：動作する IPv6 とリゾルバーポリシー

[#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) の報告者は、
コンテナの IPv6 を有効にし、glibc のアドレス選択を変更することで、その環境でアクセスを復旧しました。
これは環境固有の代替手段として扱ってください。リゾルバーの優先順位を調整する前に、
ホストの IPv6 が正常に動作すること、コンテナの外向き通信とルーティング、およびファイアウォールルールを
確認してください。プライベート ULA アドレスがあるだけでは、パブリック IPv6 接続が確立されているとはいえません。

すでに Compose の default ネットワークに接続されているサービスの場合、次の断片で
そのネットワークの IPv6 を有効にできます。サービス、ポート、ボリューム、および設定の残りの部分は維持してください。

```yaml
networks:
  default:
    enable_ipv6: true
```

名前付きネットワークの場合は、サービスが実際に参加しているネットワークで有効にしてください。Docker は
ULA サブネットを割り当てられます。明示的で重複しないサブネットを選択するのは、ネットワークで必要な場合だけにしてください。
[Docker IPv6 networking](https://docs.docker.com/engine/daemon/ipv6/)
および [Compose network options](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6) を参照してください。

**glibc ベースのイメージ**では、`/etc/gai.conf` によってアドレス選択を変更できます。現在の
リポジトリの Dockerfile は Debian を使用しています。カスタムの musl ベースのイメージでは、この仕組みは共通ではありません。
報告された調整では、ULA のラベルを `label fc00::/7 6` から
`label fc00::/7 1` に変更します。イメージの完全なポリシーテーブルを基にし、その他の
エントリを維持してください。`label` または `precedence` エントリを追加するとデフォルトテーブルが置き換えられるため、
変更した行だけを含むファイルでは不十分です。
[glibc configuration reference](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
にこれらのセマンティクスが記載されています。レビュー済みのファイルを `/etc/gai.conf` に読み取り専用で
バインドマウントし、変更を適用するためにサービスを再作成してください。

これは、**そのコンテナ内のすべての外向きトラフィック**に対する OS のアドレス選択を変更します。
すべてのアプリケーションに IPv6 の選択を強制するものではありません。Node の DNS 順序と接続の
選択も影響します。特に、`--dns-result-order=ipv4first` は IPv4 を優先するため、
IPv4 のみで発生する障害への対処にはなりません。[Node DNS ordering](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder) を参照してください。

ホストレベルの変更後は、Gemini とその他のプロバイダーを再テストしてください。ロールバックするには、
カスタム `gai.conf` のマウントを削除し、以前のネットワーク設定を復元して、
メンテナンス時間中に影響を受けるサービスまたはネットワークを再作成してください。ネットワークを再作成すると、
接続されている他のコンテナが中断される可能性があります。永続データボリュームは削除しないでください。

## 重要な注意事項

- **SQLite WAL モード:** OmniRoute が最新の変更を `storage.sqlite` にチェックポイントできるよう、`docker stop` が完了するまで待つ必要があります。同梱の Compose ファイルでは、停止猶予期間がすでに 40 秒に設定されています。イメージを直接実行する場合は、`--stop-timeout 40` を指定してください。
- **`DISABLE_SQLITE_AUTO_BACKUP`:** 定期バックアップや書き込み前バックアップを外部で管理している場合は、`true` に設定してください。既存データベースのマイグレーションでは、引き続き専用の永続的な安全スナップショットと一括マイグレーション保護が必要です。
- **データの永続化:** コンテナを再起動してもデータベース、キー、設定を保持できるよう、必ず `/app/data` にボリュームをマウントしてください。
- **ポート設定:** デフォルトの `20128` ポートを変更するには、`PORT` 環境変数を上書きしてください。

## 関連項目

- [VM デプロイガイド](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare のセットアップ
- [Fly.io デプロイガイド](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Fly.io へのデプロイ
- [環境設定](../reference/ENVIRONMENT.md) — 完全な `.env` リファレンス
