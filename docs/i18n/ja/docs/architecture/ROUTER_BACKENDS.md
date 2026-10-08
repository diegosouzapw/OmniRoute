# Router Backends & Embedded Services — architecture contract (ADR) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ステータス:** 承認済み · **コンテキスト:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **コントラクト:** `domain/routing/routerBackends.ts`
> （型付きレジストリ — コードは [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) で導入）

このADRでは、`ts`（ネイティブ）、`bifrost`、`cliproxy`、`9router`、および
VibeProxy互換エンジン間の関係を明確に定め、コントリビューターがアーキテクチャ上
異なる2つの概念を混同しないようにします。また、ルーターバックエンドレジストリの
作業で導入された型付きレジストリを、このモデルにおける唯一の信頼できる情報源として
文書化します。

## 中核となる区別 — 直交する2つの軸

エンジンの役割は、レジストリの`RouterBackendDefinition`にまとめてエンコードされた
**2つの独立した軸**によって表されます。

1. **ライフサイクル**（`RouterBackendLifecycle`）— _エンジンがどのように実行されるか_：
   - `in-process` — OmniRouteのNodeプロセス内で実行されます（ネイティブTSパイプライン）。
   - `supervised` — OmniRouteが`ServiceSupervisor`を介してインストール、起動、停止、
     ヘルスチェックを行い、その後プロバイダー接続として利用するローカル子プロセスです。
   - `external` — OmniRouteがリクエストをディスパッチするものの、管理は**行わない**
     HTTPエンドポイントです（環境変数のベースURLで設定）。
   - `disabled` — 登録されていますが、選択できません。
2. **選択軸**（リレールーティングバックエンド）— _リレーがそのエンジンにディスパッチするかどうか_：
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`内の
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`。

避けるべき誤りは、「組み込みサービス」と「ルーティングバックエンド」を1つの
リストとして扱うことです。これらは同じものではありません。`supervised`エンジン
（9router/cliproxy）は、代替のリレーディスパッチバックエンドではなく、
**ネイティブパイプラインによって利用されるプロバイダー接続**です。`bifrost`はその逆で、
リレーディスパッチバックエンドですが、（従来は）`external`専用でした。

## レジストリ — 唯一の信頼できる情報源

`domain/routing/routerBackends.ts`コントラクト（コードは
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) で導入）では、すべてのエンジンを
一度だけ宣言し、そのライフサイクル、機能、サービスID、デフォルトポート、
ヘルス設定、およびテレメトリサポートを定義します。コンシューマーは各サイドカーを
個別に特別扱いする代わりに、`getRouterBackend(id)`、`listRouterBackends()`、
`listRouterBackendsByCapability(cap)`を介してエンジンを検索します。

| バックエンド | ライフサイクル | サービス（軸A） | リレーバックエンド（軸B）   | ヘルス        | デフォルトポート |
| ------------ | -------------- | --------------- | --------------------------- | ------------- | ---------------- |
| `ts`         | `in-process`   | —               | `ts`（ネイティブ）          | —             | —                |
| `bifrost`    | `external`¹    | —¹              | `bifrost` / `auto`          | `/health`     | —                |
| `cliproxy`   | `supervised`   | `cliproxy`      | —（プロバイダー）           | `/v1/models`  | 8317             |
| `9router`    | `supervised`   | `9router`       | —（プロバイダー）           | `/api/health` | 20130            |
| `vibeproxy`  | `external`     | —               | —（プロバイダーアダプター） | `/v1/models`  | —                |

¹ Bifrostを`supervised`の組み込みサービス（`/api/services/bifrost/`から
インストールおよび起動可能）へ昇格させる作業は、
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) で追跡されています。マージされるまでは、
Bifrostは`external`専用です（`BIFROST_BASE_URL`を介してのみアクセス可能）。

`capabilities`（`chat`、`responses`、`streaming`、`tools`、`vision`、
`oauth-backed`、`dashboard-embed`、`model-sync`、`native-hot-path`）により、呼び出し側は
IDごとの分岐をハードコードするのではなく、エンジンが実際に実行できる機能に基づいて
フィルタリングできます。

## 軸 A — 組み込みサービス（監視対象プロセス側）

- **監視対象プロセスのレジストリ:** `src/lib/services/bootstrap.ts` の `SERVICES[]`
  （現在: `9router`、`cliproxy`）。
- **ライフサイクルの所有者:** `src/lib/services/ServiceSupervisor.ts` — `start()` は子プロセスを起動し、
  `waitForHealthy()` が完了するまで待機し、stdout/stderr をリングバッファに取り込む。
  `stop()` は SIGTERM→SIGKILL。すべてロックの下で直列化される。
- **状態のユニオン型**（`src/lib/services/types.ts`）:
  `not_installed | stopped | starting | running | stopping | error` に加え、
  直交する `HealthState = healthy | unhealthy | unknown`。
- **なぜプロセスを分離するのか（インプロセス SDK ではない理由）:** プロセス分離により、
  サイドカーごとにインストール、起動、停止、ヘルス、ログを個別に制御でき、
  ループバック起動ガードも適用できる。インプロセスアダプターのモデル化は今後の作業であり、
  それを表現する場所が `native-hot-path` ケイパビリティフラグである。

### ライフサイクルルートのコントラクト（`/api/services/<tool>/…`）

ステータスコードは、設計上、**状態・動詞・パスごとに固有**である。これは不整合ではなく、
コントラクトである。

| 呼び出し                     | 条件                                                | ステータス                            |
| ---------------------------- | --------------------------------------------------- | ------------------------------------- |
| `POST .../start`             | サービスが `not_installed`                          | **409**（前提条件）                   |
| `POST .../stop`              | すでに停止済み                                      | **200**（冪等な何もしない操作）       |
| `GET .../status`             | 正常                                                | **200**（`live ?? row ?? "unknown"`） |
| `POST .../start`             | 起動失敗                                            | **503**（一時的エラー）               |
| `GET .../status`, `.../stop` | 未捕捉エラー                                        | **500**                               |
| `GET /api/services/<x>/logs` | 未知のツール `<x>`                                  | **404** `Service '<x>' not found`     |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` がない                      | **403**（9router のみ）               |
| **任意の** `/api/services/*` | 呼び出し元がループバック／プライベート LAN ではない | **403 LOCAL_ONLY**                    |

すべてのエラーボディは `createErrorResponse()` によって
`{ error: { message, type }, requestId }` という形式になる。ここで `type` はステータスから導出され
（`500→server_error`、`404→not_found`、`409→conflict`、それ以外は `invalid_request`）、
機械的に処理可能な判別子となる。メッセージは事前にサニタイズされる
（`sanitizeErrorMessage()`、ハードルール #12）。

**ループバックガード**は `403` の最も一般的な原因である。`/api/services/` は
`LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）に含まれており、
`src/server/authz/policies/management.ts` は、これらのルートが子プロセスを起動するため、
ループバックでもプライベート LAN でもない呼び出し元を**認証前に**拒否する
（ハードルール 15 および 17）。パブリックトンネル経由でこれらにアクセスすると、
設計どおり `403` になる。

## 軸 B — リレーのルーティングバックエンド（ディスパッチ側）

ディスパッチバックエンドを選択するのは、リレープロキシパス
`/api/v1/relay/chat/completions` のみである。メインの
`/api/v1/chat/completions` サーフェスが `routingBackend.ts` を参照することはない。

- **選択**（`resolveRelayRoutingBackend`）: 単一のグローバル環境変数トグル —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}。
  未設定の場合、Bifrost が構成済みかつ有効なら `auto`、それ以外は `ts`。
- **動作:**
  - `bifrost`（強制）: Bifrost の失敗 → ハード `502`。フォールバックなし。
  - `auto`: Bifrost を試行し、失敗またはクールダウン中の場合は暗黙的にネイティブへフォールスルーする。
  - `ts` / フォールバック後: ネイティブの `open-sse` トランスレーター／エグゼキューターパイプライン。
- **クールダウン:** `bifrostCooldown.ts` における `baseUrl` ごとの失敗クールダウン。

現時点では、選択は**リレーレベルで全体を一括して行う方式**であり、
`release/v3.8.43` にはプロバイダー単位またはリクエスト単位のエンジン切り替えはない。
リクエスト単位のゲートは、サイドカーマニフェストの作業によって追加中である
（[#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) マニフェスト +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`）。
これにより、`auto` はマニフェストで適格とされたプロバイダーのみを Bifrost 経由でルーティングできる。

## ダッシュボード統合

サービスダッシュボードは、
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`
を介して 5 秒ごとに `GET /api/services/<tool>/status` をポーリングし、
`{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` を返します。共有の可用性コンテキストプロバイダーは存在せず、
各コンポーネントがツールごとにフックを呼び出します。`!res.ok` の場合、現在のフックは単に
`HTTP <status>` を表示します。`error.type` フィールドを人が理解できる説明にマッピングすることは、
追跡中の UX 改善項目であり、コントラクトの変更ではありません。

## 影響

- 新しいエンジンは `ROUTER_BACKENDS` に一度登録すれば、利用側は ID ごとの新しい分岐を追加することなく、ケイパビリティクエリを通じて利用できるようになります。
- 「これはサービスか、それともルーティングバックエンドか？」という問いは、ID がたまたまどのリストに含まれているかではなく、`lifecycle` フィールドによって判断されます。
- Bifrost の監視機能（#5817）とネイティブホットパスへの移行（#5670）は、各サイドカーを個別に特別扱いするのではなく、この共有コントラクトを基盤として構築されます。
