# Embedded Services (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **バージョン:** v3.8.44
> **最終更新日:** 2026-07-03
> **対象読者:** 組み込みサービス（9Router、CLIProxyAPI、Mux、Bifrost）の追加、保守、またはデバッグを行うエンジニア。

組み込みサービスは、OmniRoute がインストール、監視し、第一級のルーティングターゲットとして公開する、ローカルにインストールされたプロセスサイドカーツールです。API キーを使用してインターネット経由で接続する外部プロバイダーとは異なり、組み込みサービスは OmniRoute と同じマシン上で実行され、ループバック経由で通信します。

---

## 目次

1. [概要](#1-overview)
2. [アーキテクチャ — 4つのレイヤー](#2-architecture--4-layers)
3. [ライフサイクルステートマシン](#3-lifecycle-state-machine)
4. [API リファレンス](#4-api-reference)
5. [セキュリティ](#5-security)
6. [新しい組み込みサービスの追加](#6-adding-a-new-embedded-service)
7. [トラブルシューティング](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. 概要

### 組み込みサービスが必要な理由

次の5つのサービスが組み込まれています。

| サービス        | npm パッケージ                        | デフォルトポート | 用途                                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------- | :--------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                             |      20130       | OmniRoute がサブプロバイダーとして使用できる AI ルーター。モデルは `9router/{sub}/{model}` として公開されます                                                                                                                                         |
| **CLIProxyAPI** | GitHub リリースバイナリ（`cliproxy`） |       8317       | Anthropic CLI 認証フロー用のローカルプロキシアダプター。OAuth トークンの有効期限が切れた場合にフォールバックルーティングを提供します                                                                                                                  |
| **Mux**         | `mux`（ヘッドレス `mux server`）      |       8322       | ローカルのエージェントオーケストレーションデーモン（coder/mux）。ライフサイクル管理のみを行い、ルーティングターゲットではありません（LLM プロキシ機能なし）。                                                                                         |
| **Bifrost**     | `@maximhq/bifrost`                    |       8080       | Go 製 AI ゲートウェイのリレーバックエンド。実行中は、リレールート（`/v1/relay/`）によって自動的に選択されます                                                                                                                                         |
| **Dario**       | `@askalf/dario`                       |       3456       | Claude サブスクリプションプロキシ。Claude Code 形式のトラフィックに対する CLIProxyAPI の代替またはフェイルオーバーとして機能します。注入されたキーは、その `/admin/*` OAuth コントロールプレーンへのアクセスを制御する `DARIO_ADMIN_TOKEN` になります |

5つのサービスはすべて、同じ監視モデルに従います。

- OmniRoute は、これらを `DATA_DIR/services/{name}/` 配下にインストールします（OmniRoute 自体の `package.json` から分離）
- OmniRoute は、これらを子プロセスとして起動し、監視します
- OmniRoute は、一時的な API キーを子プロセスの環境に注入し、該当する場合はダウンタイムなしでローテーションします
- すべての管理ルート（`/api/services/*`）は **LOCAL_ONLY** です。ループバックからのみアクセスできます（厳格なルール #17）

### 主な決定事項（設計計画より）

| 決定事項                                         | 値                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| 9Router ネイティブ UI へのダッシュボードアクセス | `/dashboard/providers/services/9router/embed/*` でのリバースプロキシ          |
| インストール方法                                 | `execFile` を介した `npm install {package}`（シェル補間なし）                 |
| 利用モード                                       | ルーティングエンジン内で `9router/{sub}/{model}` として登録されるプロバイダー |
| API キー管理                                     | OmniRoute が生成し、保存時に暗号化（AES-256-GCM）したうえで環境変数経由で注入 |
| ダッシュボードの場所                             | `/dashboard/providers/services`（3つのタブ）                                  |
| 自動起動                                         | サービスごとの切り替え。デフォルトは OFF                                      |

---

## 2. アーキテクチャ — 4レイヤー

```
┌────────────────────────────────────────────────────────────────────┐
│  レイヤー1 — UI                                                    │
│  /dashboard/providers/services  (タブ: CLIProxyAPI | 9Router | Mux)│
│  ライブログ（SSE）、開始/停止/再起動/更新、設定、インストール      │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               シェル + ?tab= によるタブルーティング│
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP（Next.js fetch）
┌──────────────────────▼─────────────────────────────────────────────┐
│  レイヤー2 — API（LOCAL_ONLY — ループバックのみ）                  │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    （9RouterアップストリームへのHTTP + WebSocketリバースプロキシ）│
│                                                                    │
│  ゲート: LOCAL_ONLY_API_PREFIXESには"/api/services/"と             │
│          "/dashboard/providers/services/*/embed/"が含まれる        │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ プロセス内呼び出し
┌──────────────────────▼─────────────────────────────────────────────┐
│  レイヤー3 — ServiceSupervisor（src/lib/services/）                │
│                                                                    │
│  ServiceSupervisor.ts   汎用スーパーバイザー（child_process.spawn）│
│    ├── インストール: execFile('npm', ['install', pkg, '--prefix'])  │
│    ├── 開始:         spawn(node, [entrypoint], {env, cwd})          │
│    ├── APIキー:      crypto.randomBytes(32) → env NINEROUTER_API_KEY│
│    ├── ポート:       9Routerでは20130（設定可能）                  │
│    ├── ログ:         stdioリングバッファー5 MB → SSEイベント       │
│    ├── ヘルス:       2～5秒ごとにHTTP GET /health、遅延リカバリー  │
│    └── ライフサイクル: SIGTERM 15秒 → SIGKILL                      │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       プロセス開始時にすべてのSERVICES[]を起動      │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       定期的なGET /v1/models → service_modelsテーブル│
│  ringBuffer.ts      循環ログバッファー（サービスごとに5 MB）      │
│  healthCheck.ts     ポーリングによるHTTPヘルスプローブ             │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      （インストーラーアダプター）                  │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI互換HTTP（ループバック）
┌──────────────────────▼─────────────────────────────────────────────┐
│  レイヤー4 — プロバイダー / ルーティング                           │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    リクエストごとにポートとAPIキーを再取得（キャッシュなし）。    │
│    プロキシする前にモデルIDから"9router/"プレフィックスを除去。    │
│    スーパーバイザーが"running"でない場合は503 service_not_running  │
│    を返す。                                                        │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    "9router"のエントリ: isEmbeddedService: true                    │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    モデルは"9router/{sub}/{model}"（プレフィックス付き）で保存。   │
│    modelSync.tsによって5分ごとに同期。                             │
│                                                                    │
│  Muxはライフサイクル管理のみ（レイヤー1～3）— LLMプロキシではなく │
│  エージェントオーケストレーションデーモンであるため、レイヤー4の │
│  executor/providerエントリはなく、ルーティング先にもならない。    │
└────────────────────────────────────────────────────────────────────┘
```

### 主要なソースファイル

| ファイル                                    | 役割                                                       |
| ------------------------------------------- | ---------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | コアクラス：ライフサイクル、ロック、ヘルス、リングバッファ |
| `src/lib/services/bootstrap.ts`             | プロセスレベルの登録と自動起動                             |
| `src/lib/services/registry.ts`              | シングルトンマップ `tool → supervisor`                     |
| `src/lib/services/apiKey.ts`                | キー生成、保存時のAES-256-GCM暗号化                        |
| `src/lib/services/modelSync.ts`             | 定期的なモデル同期（5分間隔）+ オンデマンド                |
| `src/lib/services/ringBuffer.ts`            | SSE購読機能付き5 MB循環ログバッファ                        |
| `src/lib/services/healthCheck.ts`           | HTTPヘルスプローブ（間隔を設定可能）                       |
| `src/lib/services/installers/ninerouter.ts` | 9Routerのnpmによるインストール／更新／アンインストール     |
| `src/lib/services/installers/cliproxy.ts`   | CLIProxyAPIのnpmによるインストール／更新／アンインストール |
| `src/lib/services/installers/mux.ts`        | Muxのnpmによるインストール／更新／アンインストール         |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()`ヘルパー                            |
| `src/app/api/services/[name]/logs/route.ts` | 共通SSEログエンドポイント                                  |
| `open-sse/executors/ninerouter.ts`          | プロバイダーエグゼキューター（レイヤー4）                  |

---

## 3. ライフサイクルステートマシン

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
              ヘルスプローブ成功   │        クラッシュ / SIGTERM │
                               ┌────▼─────┐  (5秒以内に終了)     │
                               │ running  │─ クラッシュ ────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

状態は `version_manager` DBテーブル（`status` カラム）に保存され、
`ServiceSupervisor` のインメモリ状態にも反映されます。実行中のプロセスについては
インメモリ状態が信頼できる情報源であり、DB状態は起動時の永続的なフォールバックです。

### 状態遷移

| 遷移元          | イベント                        | 遷移先                    |
| --------------- | ------------------------------- | ------------------------- |
| `not_installed` | `install()` が成功              | `stopped`                 |
| `stopped`       | `start()` が呼び出される        | `starting`                |
| `starting`      | ヘルスプローブが200を返す       | `running`                 |
| `starting`      | 正常になる前にプロセスが終了    | `error`                   |
| `running`       | `stop()` が呼び出される         | `stopping` → `stopped`    |
| `running`       | プロセスが予期せず終了（< 5秒） | `error`（高速クラッシュ） |
| `running`       | プロセスが予期せず終了（> 5秒） | `error`                   |
| `error`         | `start()` が呼び出される        | `starting`                |
| 任意            | `stopping` 中に `stop()`        | 何もしない                |

### 操作ロック

`ServiceSupervisor` は、非同期操作ロック（`withLock()`）を介してライフサイクル操作を
直列化します。同じスーパーバイザーに対して `start()` を同時に呼び出しても、生成される
プロセスは正確に1つだけです。2番目の呼び出し元は待機し、既存のステータスを返します。
これにより、たとえば自動起動とUIボタンが同時に実行された場合の競合状態を防ぎます。

---

## 4. APIリファレンス

`/api/services/` 配下のすべてのルートは **LOCAL_ONLY**（ループバックのみ、厳格なルール#17）です。
ループバック以外からのリクエストは、認証トークンにかかわらず `403 LOCAL_ONLY` を受け取ります。

### 4.1 9Routerエンドポイント（11ルート）

#### `POST /api/services/9router/install`

npmから9Routerをインストールします。独自の `package.json` と `node_modules/` を持つ
`DATA_DIR/services/9router/` を作成します。OmniRoute自体の依存関係とは競合しません。

**リクエストボディ**（すべて任意）:

```json
{ "version": "latest" }
```

| フィールド | 型       | デフォルト | 説明                                          |
| ---------- | -------- | ---------- | --------------------------------------------- |
| `version`  | `string` | `"latest"` | インストールするnpmバージョンタグまたはsemver |

**レスポンス:**

| ステータス | 説明                                                     |
| ---------- | -------------------------------------------------------- |
| `200`      | `{ ok: true, installedVersion: "x.y.z", path: "..." }`   |
| `400`      | 無効なリクエストボディ（Zod検証エラー）                  |
| `409`      | すでにインストール中（ロック取得済み）                   |
| `500`      | npm installに失敗 — `message` で分かりやすいエラーを確認 |

**注:** `execFile('npm', [...])` を使用します — シェルも補間も使用しません（厳格なルール#13）。
EACCESエラーは分かりやすいメッセージとして提示されます。

---

#### `POST /api/services/9router/start`

9Routerを起動します。スーパーバイザーがまだ登録されていない場合は登録してから、
`supervisor.start()` を呼び出します。すでに実行中の場合は冪等です。

**リクエストボディ:** なし

**レスポンス:**

| ステータス | 説明                                                           |
| ---------- | -------------------------------------------------------------- |
| `200`      | `ServiceStatus` オブジェクト（以下のスキーマを参照）           |
| `409`      | 9Routerがインストールされていない（`status: "not_installed"`） |
| `503`      | 起動に失敗（プロセスエラー — `lastError` を参照）              |

**ServiceStatusスキーマ:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

9Routerを正常に停止します。SIGTERMを送信して15秒待機し、それでも稼働している場合は
SIGKILLを送信します。すでに停止している場合は冪等です。

**リクエストボディ:** なし

**レスポンス:**

| ステータス | 説明                                |
| ---------- | ----------------------------------- |
| `200`      | `ServiceStatus`（state: "stopped"） |
| `503`      | 予期せず停止処理に失敗              |

---

#### `POST /api/services/9router/restart`

操作ロック内で `stop()`、続いて `start()` を実行するのと同等です。

**リクエストボディ:** なし

**レスポンス:** `start` と同じです（最終的な `ServiceStatus` を返します）。

---

#### `POST /api/services/9router/update`

9Routerを新しいnpmバージョンに更新します。サービスが実行中の場合は最初に停止し、
npm installを実行して新しいバージョンをその場でインストールしてから、サービスを
再起動します。

**リクエストボディ**（すべて任意）:

```json
{ "version": "latest" }
```

**レスポンス:**

| ステータス | 説明                                                            |
| ---------- | --------------------------------------------------------------- |
| `200`      | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`      | 無効なボディ                                                    |
| `500`      | npm updateに失敗                                                |

---

#### `POST /api/services/9router/rotate-key`

9Router 用の新しい API キーを生成し、保存時に暗号化したうえで、サービスが実行中の場合は再起動して、環境から新しいキーを読み込ませます。古いキーは直ちに無効化されます。

**リクエストボディ:** なし

**レスポンス:**

| ステータス | 説明                                       |
| ---------- | ------------------------------------------ |
| `200`      | `{ keyRotated: true, restarted: boolean }` |
| `500`      | ローテーションに失敗                       |

**セキュリティ:** 新しいキーがレスポンスで返されることはありません（認証情報の漏洩を防止）。このキーは `version_manager` テーブルに暗号化（AES-256-GCM）して保存されます。

---

#### `GET /api/services/9router/status`

バージョンのメタデータと API キーのプレビューを含む、ライブステータスと DB ステータスを統合して返します。

**レスポンス:**

| ステータス | 説明                       |
| ---------- | -------------------------- |
| `200`      | 以下のスキーマを参照       |
| `500`      | ステータスの読み取りに失敗 |

**レスポンススキーマ:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

自動起動フラグを切り替えます。`enabled: true` の場合、次回 OmniRoute の起動時にサービスがインストール済みであれば、自動的に起動します。

**リクエストボディ:**

```json
{ "enabled": true }
```

**レスポンス:**

| ステータス | 説明                  |
| ---------- | --------------------- |
| `200`      | `{ autoStart: true }` |
| `400`      | 無効なボディ          |

---

#### `GET /api/services/9router/logs`

9Router の stdout/stderr リングバッファからライブログを配信する SSE ストリームです。

**クエリパラメーター:**

| パラメーター | 型        | デフォルト | 説明                                                                                |
| ------------ | --------- | ---------- | ----------------------------------------------------------------------------------- |
| `tail`       | `integer` | 200        | 最初に送信する過去の行数（最大 1000）                                               |
| `filter`     | `string`  | なし       | 大文字と小文字を区別しない部分文字列フィルター（正規表現は不使用 — ReDoS 対策済み） |

**SSE イベント:**

| イベント    | データ      | 説明                       |
| ----------- | ----------- | -------------------------- |
| `snapshot`  | `LogLine[]` | 最初に送信される過去の末尾 |
| `log`       | `LogLine`   | ライブのログ行             |
| `heartbeat` | `{}`        | 15 秒ごとのキープアライブ  |

**LogLine スキーマ:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**レスポンス:**

| ステータス | 説明                                          |
| ---------- | --------------------------------------------- |
| `200`      | `text/event-stream`                           |
| `400`      | `filter` パラメーターが長すぎる（200 文字超） |
| `404`      | サービスが見つからない（supervisor に未登録） |

---

### 4.2 CLIProxyAPI エンドポイント（10 ルート）

CLIProxyAPI のエンドポイント構成は 9Router と同じですが、`rotate-key` はなく、`accounts`、`provider-expose`、`auto-restart-adopted` が追加されています。現在は、起動時に注入される専用のデータプレーン API キーを受け取ります（`bootstrap.ts` で `needsApiKey: true`。モデル同期に使用）。`status` に含まれるフィールドは少なくなっています。

| メソッド | パス                                | 説明                                          |
| -------- | ----------------------------------- | --------------------------------------------- |
| `POST`   | `/api/services/cliproxy/install`    | npm から CLIProxyAPI をインストール           |
| `POST`   | `/api/services/cliproxy/start`      | CLIProxyAPI を起動                            |
| `POST`   | `/api/services/cliproxy/stop`       | CLIProxyAPI を停止                            |
| `POST`   | `/api/services/cliproxy/restart`    | CLIProxyAPI を再起動                          |
| `POST`   | `/api/services/cliproxy/update`     | 新しいバージョンに更新                        |
| `GET`    | `/api/services/cliproxy/status`     | ライブ + DB ステータス（`apiKeyMasked` なし） |
| `POST`   | `/api/services/cliproxy/auto-start` | 自動起動を切り替え                            |

共有の `GET /api/services/{name}/logs` エンドポイント（§4.1 を参照）は、`[name]` 動的セグメントを使用して 4 つのサービスすべてで機能します。

---

### 4.3 Mux エンドポイント（8 ルート）

Mux のエンドポイント構成は CLIProxyAPI と同じであり、API サーフェスに `rotate-key` ルートはありません（Bearer トークンは 9Router と同様に `getOrCreateApiKey("mux")` を介して生成され、`MUX_SERVER_AUTH_TOKEN` 環境変数を介して注入されますが、専用のローテーションエンドポイントはまだありません）。Mux はライフサイクル管理のみの対象です。9Router とは異なり、Layer 4 executor を持たず、ルーティングプロバイダーとして登録されることもありません。

| メソッド | パス                           | 説明                                       |
| -------- | ------------------------------ | ------------------------------------------ |
| `POST`   | `/api/services/mux/install`    | npm から Mux をインストール（`npm i mux`） |
| `POST`   | `/api/services/mux/start`      | Mux を起動（`mux server`）                 |
| `POST`   | `/api/services/mux/stop`       | Mux を停止                                 |
| `POST`   | `/api/services/mux/restart`    | Mux を再起動                               |
| `POST`   | `/api/services/mux/update`     | 新しい npm バージョンに更新                |
| `GET`    | `/api/services/mux/status`     | ライブ + DB ステータス                     |
| `POST`   | `/api/services/mux/auto-start` | 自動起動を切り替え                         |

---

### 4.4 Bifrost エンドポイント（8 ルート）

Bifrost は Go 製の AI ゲートウェイリレーバックエンド（`@maximhq/bifrost`）です。CLIProxyAPI と同じエンドポイント構成を使用します（`rotate-key` はありません。Bifrost は `-app-dir` 配下の `config.json` で独自のプロバイダーキーを管理します）。

| メソッド | パス                               | 説明                                                 |
| -------- | ---------------------------------- | ---------------------------------------------------- |
| `POST`   | `/api/services/bifrost/install`    | npm から Bifrost (`@maximhq/bifrost`) をインストール |
| `POST`   | `/api/services/bifrost/start`      | ポート 8080（デフォルト）で Bifrost を起動           |
| `POST`   | `/api/services/bifrost/stop`       | Bifrost を停止                                       |
| `POST`   | `/api/services/bifrost/restart`    | Bifrost を再起動                                     |
| `POST`   | `/api/services/bifrost/update`     | より新しいバージョンに更新                           |
| `GET`    | `/api/services/bifrost/status`     | ライブ状態 + DB の状態                               |
| `POST`   | `/api/services/bifrost/auto-start` | 自動起動を切り替え                                   |
| `GET`    | `/api/services/bifrost/logs`       | SSE ログ末尾（共有の `[name]/logs` 動的ルート経由）  |

**ルーティングの連携:** `BIFROST_BASE_URL` が未設定で、監視対象の Bifrost
インスタンスが実行中の場合、`getBifrostRoutingConfig()`（`routingBackend.ts` 内）は
自動的に `http://127.0.0.1:{port}` をリレーのベース URL として使用します。明示的に設定された
`BIFROST_BASE_URL` 環境変数が常に優先されます。

---

### 4.5 Dario エンドポイント（12 ルート）

他のサービスと同じライフサイクル構成（`install`、`start`、`stop`、`restart`、
`update`、`status`、`auto-start`、`auto-restart-adopted`）に加え、`admin/` 配下に
トークンで保護された OAuth コントロールプレーンがあります: `admin/accounts`、`admin/import-from-omniroute`、
`admin/login-start`、`admin/login-complete`（すべて `DARIO_ADMIN_TOKEN` で保護）。

### 4.6 リバースプロキシ（9Router ダッシュボードの埋め込み）

ダッシュボードは、以下の内部リバースプロキシを介して 9Router Web UI を iframe 内に
埋め込みます:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

このプロキシは以下を行います:

- リクエストを `http://127.0.0.1:{port}/{path}` に転送します（ループバックのみ）
- 受信した `cookie` および `authorization` ヘッダーを削除します（OmniRoute セッションの漏洩を防止）
- 9Router 認証用に `Authorization: Bearer {apiKey}` を挿入します
- レスポンスから `set-cookie`、`content-security-policy`、`x-frame-options`、`cross-origin-*` を削除します
- HTML レスポンスを書き換えて `<base href>` を挿入し、絶対パスを正規化します（`/foo` → `/dashboard/.../embed/foo`）

埋め込みダッシュボードの WebSocket アップグレードは、専用ポート上の
補助サーバーによって処理されます（`src/lib/services/embedWsProxy.ts` を参照）。

**セキュリティ:** 埋め込みプロキシルートは `LOCAL_ONLY_API_PREFIXES`
配下に分類されており、ループバックからのみアクセスできます。Cloudflare/Ngrok トンネル経由で
JWT を取得した攻撃者でも、埋め込みサービスにプロキシ経由でアクセスすることはできません。

---

## 5. セキュリティ

### LOCAL_ONLY の強制（厳格ルール #17）

`/api/services/` および `/dashboard/providers/services/*/embed/` 配下のすべてのルートは、
`src/server/authz/routeGuard.ts` で LOCAL_ONLY に分類されています。ループバックチェックは、
認証分岐より前に無条件で実行されます。

```
リクエストを受信
  → isLocalOnlyPath(path)?
      → 非ループバック → 403 LOCAL_ONLY（常に認証チェックより前）
      → ループバック   → 通常の認証へ進む
```

これにより、（トンネル経由などで）漏洩した JWT が `npm install` や
プロセス生成を引き起こすのを防ぎます。完全なティアマトリクスについては、
`docs/security/ROUTE_GUARD_TIERS.md` を参照してください。

### API キーの注入

9Router と Mux は、それぞれの HTTP エンドポイント用に API キー／Bearer トークンを必要とします。
OmniRoute は次の処理を行います。

1. `crypto.randomBytes(32).toString("base64url")` を使用し、
   サービス固有のプレフィックス（9Router は `nr_`、Mux は `mx_`）を付けてキーを生成します。
2. AES-256-GCM（プロバイダー認証情報と同じ暗号方式）を使用して、保存時に暗号化します。
3. プロセス生成時に復号し、環境変数として注入します —
   9Router では `NINEROUTER_API_KEY`、Mux では `MUX_SERVER_AUTH_TOKEN` を使用します
   （CLI フラグにはしないため、トークンが `ps`／プロセス一覧に表示されることはありません）。
4. 平文のキーを HTTP レスポンスで返すことはありません。

CLIProxyAPI には、プロセス生成時に専用のデータプレーンキーが注入されます
（`needsApiKey: true` — アダプターに対するモデル同期に使用されます）。

### SSRF 対策

リバース HTTP プロキシ（`/dashboard/.../embed/[...path]`）の転送先は、
`http://127.0.0.1:{port}` のみにハードコードされています。非ループバックの宛先への
リダイレクトには決して従いません。`ssrf-req-filter` ライブラリを使用し、
ループバック範囲外に名前解決されるアップストリーム URL をすべて拒否します。

### シェルの安全性（厳格ルール #13）

`npm install` は `execFile('npm', ['install', pkg, '--prefix', dir])` で呼び出されます —
テンプレートリテラルやシェルを使用せず、外部パスをコマンド文字列に補間することもありません。
実行時の値（ポート、API キー）は、子プロセスの `env` オブジェクトを介して渡されます。

### エラーのサニタイズ（厳格ルール #12）

`/api/services/*` からのすべてのエラーレスポンスは、`buildErrorBody()` または
`sanitizeErrorMessage()` を経由します。生の `err.stack` および `err.message` が、
呼び出し元へそのまま返されることはありません。

---

## 6. 新しい組み込みサービスの追加

次の 8 ステップに従ってください。正規のリファレンスとして、
`src/lib/services/installers/` および `src/app/api/services/` にある既存の実装を参照してください。

### ステップ 1 — インストーラーの作成

`ninerouter.ts` をモデルとして、`src/lib/services/installers/{name}.ts` を作成します。

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // 空いているポートを選択

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

`installers/utils.ts` の `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` を使用してください。
`execSync` やシェル補間は決して使用しないでください。

### ステップ 2 — ブートストラップへの登録

`src/lib/services/bootstrap.ts` の `SERVICES` 配列に `ServiceEntry` を追加します。

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // API キーが不要な場合は false
}
```

`cfg.tool === "myservice"` を処理するように `buildSpawnArgsFactory()` を拡張します。

#### プラガブルなプロバイダープラグイン契約（フェーズ 1、#7333）

`src/lib/services/providerPlugins/` では `ServiceProviderPlugin` 契約が導入されています。
これは、同じバックエンドの構成を無関係な 2 つのファイルで個別に表現する代わりに、
バックエンドの `bootstrap.ts` にある `ServiceEntry` フィールドと、
`serviceBackends.ts` のマニフェストテンプレートフィールドを 1 つのオブジェクトにまとめるものです。
現時点では、**移行済みなのは `9router` のみです** — `bootstrap.ts` は
`getServiceProviderPlugin("9router")`（`src/lib/services/providerPlugins/registry.ts`）から
`SERVICES[]` エントリを生成し、プラグインが存在しない場合は起動エラーをスローします。
`cliproxy`、`mux`、`bifrost` は、既存のインライン `SERVICES[]` リテラルを変更せず引き続き使用します。

`open-sse/config/providerPluginManifest.ts` には、
`SERVICE_BACKEND_MANIFEST_TEMPLATE` エントリから適切な形式の
`ProviderPluginManifestEntry` を構築する追加的な
`createServiceBackendManifestEntry(pluginId, template)` ヘルパーも追加されました —
これはまだ実際のリクエストパス（`generateProviderPluginManifestFromRegistry()` にも
`/v1/providers/[provider]/models` にも）接続されていません。契約が 2 つ目のバックエンドで
実証された後のフォローアップ課題として残されています。

issue #7333 で追跡され、フォローアップ PR に延期されている項目は次のとおりです。
同じレジストリを介した `cliproxyapi` の移行、`mux`／`bifrost` の
`ServiceBackendPluginId` ユニオンへの一般化、エグゼキューターのルーティングに関する
特殊処理（`open-sse/executors/index.ts`、
`open-sse/handlers/chatCore/executorProxy.ts`）のプラグイン契約への統合、および
`createServiceBackendManifestEntry()` の実際のマニフェスト／モデルのコードパスへの接続です。

### ステップ 3 — マイグレーションと DB シードの追加

`src/lib/db/migrations/` のマイグレーションを介して、サービスに対応する行が
`version_manager` に存在することを確認します。その行は次の内容にしてください。

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### ステップ 4 — 7 つの API エンドポイントの作成

`src/app/api/services/{name}/` 配下に作成します。

```
_lib.ts            getOrInitSupervisor() ヘルパー
install/route.ts   POST — installer.install() を呼び出す
start/route.ts     POST — supervisor.start() を呼び出す
stop/route.ts      POST — supervisor.stop() を呼び出す
restart/route.ts   POST — supervisor.restart() を呼び出す
update/route.ts    POST — installer.update() を呼び出す
status/route.ts    GET  — ライブステータスと DB ステータスをマージする
auto-start/route.ts POST — auto_start フラグを切り替える
```

共有の `GET /api/services/[name]/logs` ルートはすでに接続済みです。そこへの変更は
不要です。

すべてのエラーレスポンスを `createErrorResponse()` / `buildErrorBody()` に委譲してください。

### ステップ 5 — LOCAL_ONLY_API_PREFIXES への追加

`src/server/authz/routeGuard.ts` で、`/api/services/` がすでにリストに含まれていることを確認してください。
新しいプレフィックス（例: `/api/tools/`）を導入する場合は、`LOCAL_ONLY_API_PREFIXES` と、
プロセスを起動する場合は `SPAWN_CAPABLE_PREFIXES` の両方に追加してください。
`tests/unit/authz/routeGuard.test.ts` にテストを追加してください。

### ステップ 6 — UI タブの追加

`src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx` を作成してください。
共有コンポーネントを再利用してください。

- `ServiceStatusCard` — ライブ状態 + ヘルスバッジ
- `ServiceLifecycleButtons` — 開始 / 停止 / 再起動 / 更新
- `ServiceLogsPanel` — SSE ログ末尾表示（`/api/services/{name}/logs` に接続）
- `ApiKeyCard` — キーの表示 + ローテーション（`needsApiKey: true` の場合）

タブを `ServicesPageShell.tsx` に登録してください。

### ステップ 7 — プロバイダーエントリの追加（サービスがルーティング先の場合）

組み込みサービスが OpenAI 互換の `/v1/chat/completions` エンドポイントを公開する場合:

1. `src/shared/constants/providers.ts` に、`isEmbeddedService: true` を指定したプロバイダーエントリを追加してください。
2. `BaseExecutor` を拡張する `open-sse/executors/{name}.ts` を作成してください。リクエストごとにポートと
   API キーを再取得してください（コンストラクター内では決してキャッシュしないでください）。スーパーバイザーの状態が `"running"` でない場合は、
   `503 service_not_running` レスポンスを返してください。
3. `open-sse/config/providerRegistry.ts` に、サービスプレフィックス付き
   （例: `myservice/sub/model`）でモデルを登録してください。`modelSync.ts` によって最新状態が維持されます。

### ステップ 8 — ドキュメント化とテスト

1. `docs/frameworks/EMBEDDED-SERVICES.md`（このファイル）を更新し、§1 の
   テーブルにサービスを、§4 に新しいエンドポイントを追加してください。
2. `tests/unit/services/` に単体テスト（ライフサイクル、インストーラー、API 形式）を追加してください。
3. `tests/integration/services/` に統合テストを追加してください（`RUN_SERVICES_INT=1` の場合のみ）。
4. 新しいエンドポイントを `docs/openapi.yaml` に追加してください。

---

## 7. トラブルシューティング

### サービスが起動しない

**症状:** Startボタンを押すと503が返され、状態が`"error"`または`"starting"`のままになります。

**チェックリスト:**

1. `GET /api/services/{name}/logs`（またはダッシュボードのLogsパネル）を確認します。`Error: ENOENT`、`address already in use`、`Cannot find module`などの行を探します。
2. `npm`がPATHに含まれていることを確認します。OmniRouteを実行しているユーザーアカウントで`which npm`を実行してください。
3. サービスがインストールされていることを確認します。`GET /api/services/{name}/status`の`installedVersion`を確認してください。`null`の場合は、先にインストールを実行します。
4. `DATA_DIR/services/{name}/node_modules/`が存在し、空でないことを確認します。
5. ステータスレスポンスの`lastError`フィールドで、サニタイズされた終了理由を確認します。

---

### コールドスタートが遅い（`running`になるまで10秒超）

**症状:** `"running"`または`"error"`に移行するまで、長時間にわたって状態が`"starting"`のままになります。

**説明:** 9Routerのコールドスタートでは、大規模な依存関係ツリー（DNS、トンネル、MITMモジュール）のインポートが行われます。デフォルトのヘルスチェック間隔は2秒で、supervisorがタイムアウトと判断するまでに3回試行します（ただし、ポーリングは継続します）。

**修正方法:** `healthIntervalMs`と`waitForHealthy`のタイムアウト（`healthIntervalMs * 3`）は、`bootstrap.ts`で設定できます。起動に時間がかかるサービスでは、`healthIntervalMs`を5000に、`stopTimeoutMs`を30 000に増やしてください。

---

### ポートの競合（`EADDRINUSE`）

**症状:** ログに`address already in use :::20130`と表示されます。

**原因:**

- 別のプロセスがすでにポート20130を使用しています。
- 以前の9Routerプロセスが完全に停止していません（ゾンビPID）。

**修正方法:**

1. `.env`の`NINEROUTER_PORT`環境変数を使用して、デフォルトポートを変更します。
2. 競合しているプロセスを特定して終了します: `lsof -ti :20130 | xargs kill -9`
3. ポートは、`bootstrap.ts`の`port`フィールドを使用してサービスごとに設定できます。

**注:** 9Routerは、OmniRouteのデフォルトポート20128との競合を避けるため、デフォルトでポート20130を使用します。

---

### インストール時にPermission denied（EACCES）が発生する

**症状:** インストールで500が返され、ログに`EACCES`または`permission denied`と表示されます。

**原因:**

- `DATA_DIR`またはその親ディレクトリに、OmniRouteプロセスから書き込む権限がありません。
- マウントされたボリュームへの書き込み権限がない状態で、rootless Docker内で実行しています。

**修正方法:**

1. `DATA_DIR`（デフォルト: `~/.omniroute/`）を確認します: `ls -la ~/.omniroute/`
2. OmniRouteプロセスの実行ユーザーがディレクトリを所有していることを確認します: `chown -R $USER ~/.omniroute/`
3. Dockerでは、ボリュームマウントにコンテナユーザー用の適切な権限が設定されていることを確認します。

---

### 更新に失敗する（`npm install`のタイムアウトまたはネットワークエラー）

**症状:** 更新で`InstallError`を伴う500が返され、ログにネットワークタイムアウトが表示されます。

**チェックリスト:**

1. npmレジストリに接続できることを確認します: `npm ping`
2. 企業プロキシの設定を確認します: `npm config get proxy`、`npm config get https-proxy`
3. インストールを手動で試します: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`
4. エアギャップ環境では、tarballを事前にダウンロードし、`npm install /path/to/tarball.tgz`を使用します。

---

### 起動直後にサービスが`"error"`状態になる（即時クラッシュ）

**症状:** 状態が5秒未満で`"starting"`から`"error"`に移行します。`lastError`には`"Fast crash (exited with code 1)"`と表示されます。

**チェックリスト:**

1. ログ末尾を十分な行数で確認します: `GET /api/services/{name}/logs?tail=500`
2. よくある原因は、サービスが必要とする環境変数が設定されていないことです。
3. 9Routerの場合は、spawn時に渡されるenvに`NINEROUTER_DISABLE_MITM=true`と`NINEROUTER_DISABLE_TUNNEL=true`が含まれていることを確認します（`installers/ninerouter.ts`の`resolveSpawnArgs`を参照）。

---

## 8. FAQ

**Q: 組み込みサービスのエンドポイントを非ループバッククライアントに公開できますか？**

いいえ。LOCAL_ONLY 階層は意図的に設定されています（厳格ルール #17）。`npm install` を実行したり、`node` プロセスを生成したりできるルートは、非ループバック通信からアクセスできてはなりません。そうしないと、トンネル（Cloudflare、Ngrok、Tailscale）経由で JWT が漏洩した場合、任意のプロセス生成が可能になるためです。`/api/services/` には適用除外の特例はありません。`/api/mcp/` とは異なり、manage スコープのバイパスリストから除外されています。`docs/security/ROUTE_GUARD_TIERS.md` を参照してください。

---

**Q: 9Router と CLIProxyAPI は、本番環境やクラウド環境へのデプロイで利用できますか？**

はい。どちらのサービスも OmniRoute 自体と同じローカルファーストモデルに従います。これらは同じマシン上で実行され、ループバック経由で通信します。ここでいう「本番環境」とは、リモートのクラウドプロバイダーではなく、OmniRoute がデプロイされている VPS またはローカルサーバーを指します。

---

**Q: スーパーバイザーをデバッグするにはどうすればよいですか？**

1. SSE ログストリームを追跡します：`curl -N http://localhost:20128/api/services/9router/logs`。
2. OmniRoute の pino 出力で、`service:supervisor` 名前空間によりフィルタリングされた構造化ログを確認します。
3. DB の行を調査します：`sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`。
4. `GET /api/services/9router/status` を使用すると、現在のライブ状態、PID、ヘルス状態、`lastError` を1回の呼び出しで確認できます。

---

**Q: スーパーバイザーで状態が `"running"` なのに、`health: "degraded"` または `health: "unknown"` と表示されます。問題がありますか？**

`"degraded"` は、ヘルスプローブが 200 以外のレスポンスを返したことを意味します。`"unknown"` は、まだプローブが完了していないことを意味します（最初のポーリングとの競合）。どちらも起動中は一時的に発生します。`"running"` になってから `healthIntervalMs * 3` ms を超えてもヘルス状態が `"degraded"` のままの場合、組み込みサービスは実行されていますが、その HTTP API が応答していません。ステータスレスポンスに記載されているポートが正しいか、またサービスが実際にそのポートでリッスンしているかを確認してください。

---

**Q: 完全に再起動せずに 9Router の API キーを変更できますか？**

いいえ。API キーは生成時に環境変数を介して 9Router に渡されます。実行中のプロセスでは環境変数を変更できません。`POST .../rotate-key` は、新しいキーを適用するためにサービスを自動的に停止して再起動します。キーのローテーションは、サービスの `stopTimeoutMs`（デフォルトは 15 秒）と起動時間を合わせた時間内に反映されます。

---

**Q: リングバッファの上限はどのくらいで、満杯になるとどうなりますか？**

各サービスには専用の 5 MB リングバッファがあります。バッファが満杯になると、新しいログ行のための領域を確保するために、最も古いログ行から削除されます。SSE の `snapshot` イベントは、`tail` の上限内で最新のログ行を返します。DB の行に `logsBufferPath` が設定されていない限り、ログはディスクに永続化されません。

---

## 関連項目

- `docs/security/ROUTE_GUARD_TIERS.md` — LOCAL_ONLY 階層の詳細
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 組み込みサービスのモジュールマッピング
- `docs/architecture/ARCHITECTURE.md` — システムレベルのコンテキスト
- `docs/openapi.yaml` — 機械可読なエンドポイント定義
- `CLAUDE.md` §「新しい組み込みサービスの追加」— クイックリファレンス用チェックリスト
