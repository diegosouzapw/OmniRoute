# Plugin Marketplace (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **信頼できる情報源:** `src/lib/plugins/`（`marketplace.ts`、`manager.ts`、`manifest.ts`、
> `scanner.ts`、`loader.ts`）、`src/app/api/plugins/`、および
> `src/app/(dashboard)/dashboard/plugins/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute には、WordPress 形式のプラグインシステムが搭載されています。プラグインは自己完結型の
ディレクトリであり、それぞれに `plugin.json` マニフェストとエントリーファイルが含まれます。プラグインは、
リクエストパイプライン（`onRequest` / `onResponse` / `onError`）と、
ライフサイクルイベント（`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`）に
フックします。

**プラグインマーケットプレイス**は、そのシステム上に構築された検出レイヤーです。
インストール可能なプラグインを閲覧できるカタログを提供します。デフォルトでは、このカタログは
小規模な組み込みシードレジストリです。オペレーターはカスタムリモート
レジストリ URL を指定できます。その場合、DNS 解決を行う SSRF ガードによってフェッチが強化されます
（[セキュリティ](#security)を参照）。

すべてのプラグインルートは**ループバック限定**（Tier 1 — `LOCAL_ONLY`）です。プラグインは
子プロセス内でコードを読み込んで実行するため、認証の有無にかかわらず、
ループバック以外のオリジンからルートへアクセスすることはできません。詳細については、
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md)を参照してください。

## 全体の仕組み

```
ダッシュボード（/dashboard/plugins）
  ├─ 「インストール済み」タブ → GET /api/plugins            （listPlugins）
  │                              POST /api/plugins/scan      （pluginManager.scan）
  │                              POST /api/plugins/{name}/activate|deactivate
  │                              DELETE /api/plugins/{name}   （アンインストール）
  └─ 「マーケットプレイス」タブ → GET /api/plugins/marketplace
                                   → listMarketplacePlugins()
                                     ├─ カスタム URL なし → 組み込み SEED_REGISTRY
                                     └─ カスタム URL → isSafeMarketplaceUrl() SSRF ガード
                                                       → safeOutboundFetch(guard:"public-only")
```

- **レジストリレイヤー** — `src/lib/plugins/marketplace.ts`：カタログの一覧表示や検索を行い、
  障害が発生した場合はシードレジストリへフォールバックします。
- **ライフサイクルレイヤー** — `src/lib/plugins/manager.ts`（`pluginManager` シングルトン）：
  インストール、アップグレード、アクティブ化、非アクティブ化、アンインストール、スキャン、起動時の読み込みを行います。
- **マニフェストレイヤー** — `src/lib/plugins/manifest.ts`：`plugin.json` 用の
  Zod スキーマとデフォルト値を定義します。
- **スキャナー** — `src/lib/plugins/scanner.ts`：プラグインディレクトリ配下の
  ディスク上にあるプラグインを検出します。
- **ローダー** — `src/lib/plugins/loader.ts`：各プラグインを分離された
  子プロセスで起動し、IPC 経由でフック呼び出しを仲介します。

## マーケットプレイスカタログ

`listMarketplacePlugins()`（`src/lib/plugins/marketplace.ts`）は、
`MarketplaceEntry` オブジェクトのリストを返します。

| フィールド    | 型       | 備考                                       |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | kebab-case 形式のプラグイン名              |
| `version`     | string   | semver                                     |
| `description` | string   | 短い概要                                   |
| `author`      | string   | 作者 / 組織                                |
| `license`     | string   | SPDX 形式のライセンス ID                   |
| `downloadUrl` | string   | ソースのダウンロード URL（空の場合あり）   |
| `repository`  | string?  | オプションのリポジトリ URL                 |
| `tags`        | string[] | 検索 / フィルター用タグ                    |
| `downloads`   | number   | ダウンロード数                             |
| `rating`      | number   | 0～5                                       |
| `verified`    | boolean  | エントリが検証済みとしてマークされているか |
| `lastUpdated` | string   | ISO に準拠した日付文字列                   |

カスタムレジストリ URL が設定されていない場合、カタログには組み込みの
`SEED_REGISTRY`（現在は `request-logger`、`rate-limiter`、`cost-tracker`、
`theme-manager`）が使用されます。シードレジストリは常に利用できます。設定されたリモート
レジストリに到達できない場合、`200` 以外のステータスが返された場合、または認識できない
本文が返された場合、`listMarketplacePlugins()` は警告をログに記録し、シードリストへフォールバックします。

> 注: マーケットプレイスの**カタログ**（閲覧 / 検索）はエンドツーエンドで接続されていますが、
> カタログからのワンクリックによるマーケットプレイス**インストール**はまだ実装されていません。
> 現在、マーケットプレイスのエントリにあるダッシュボードの「インストール」ボタンを押すと、
> 「近日対応予定」という通知が表示されます。現時点では、ローカルパスからのインストールフロー
> （`POST /api/plugins`）とディスク上の検出（`POST /api/plugins/scan`）を通じてインストールします。

## REST API

すべてのエンドポイントで管理認証（`requireManagementAuth`）が必要であり、**かつ**
ループバックからのみアクセスできます。`/api/plugins` と `/api/plugins/` は
`LOCAL_ONLY_API_PREFIXES`（`src/server/authz/routeGuard.ts`）に登録されています。

| エンドポイント                   | メソッド | 説明                                                                 |
| -------------------------------- | -------- | -------------------------------------------------------------------- |
| `/api/plugins`                   | GET      | インストール済みプラグインを一覧表示（任意の `?status=` フィルター） |
| `/api/plugins`                   | POST     | ローカルの絶対パスからプラグインをインストール                       |
| `/api/plugins/scan`              | POST     | プラグインディレクトリをスキャンし、新しいプラグインを登録           |
| `/api/plugins/marketplace`       | GET      | マーケットプレイスのカタログエントリを一覧表示                       |
| `/api/plugins/[name]`            | GET      | インストール済みプラグインの詳細を取得                               |
| `/api/plugins/[name]`            | DELETE   | プラグインをアンインストール                                         |
| `/api/plugins/[name]/activate`   | POST     | 有効化（ロード + フックを登録）                                      |
| `/api/plugins/[name]/deactivate` | POST     | 無効化（`onDeactivate` を実行し、フックを登録解除）                  |
| `/api/plugins/[name]/config`     | GET      | プラグイン設定 + 設定スキーマを取得                                  |
| `/api/plugins/[name]/config`     | PUT      | プラグイン設定を更新（スキーマに対して検証）                         |

`GET /api/plugins` の `status` フィルターには、
`installed` / `active` / `inactive` / `error` のいずれかを指定できます。無効な値を指定すると `400` が返されます。

### インストール済みプラグインの一覧表示

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### ローカルパスからのインストール

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` は**絶対パス**である必要があり、`..` トラバーサルセグメントや
null バイトを含めることはできません（Zod によって強制されます）。ソースディレクトリには有効な
`plugin.json` が含まれている必要があります（または、その親ディレクトリを指定できます）。成功すると、インストールされたプラグインの行とともに `201` が返されます。

### マーケットプレイスの閲覧

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### プラグイン設定の更新

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` は、指定された各値をプラグインの
`configSchema`（マニフェストで宣言）に対して検証します。`number` フィールドには `min`/`max` が適用され、
`select` フィールドは宣言された `enum` と一致する必要があります。スキーマに存在しないキーは
そのまま許可されます。

## 設定

### プラグインディレクトリ

プラグインは OmniRoute のデータディレクトリ配下に配置されます。

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # （または manifest.main が指すファイル）
```

`getDefaultPluginDir()`（`src/lib/plugins/scanner.ts`）は、次の
3 段階でこのディレクトリを解決します。

1. **`OMNIROUTE_PLUGINS_DIR`** が設定されている場合は、`HOME` の値に関係なく、その値をそのまま使用します。これは
   Docker/K8s 向けの明示的な設定項目です。これらの環境では、通常コンテナのホームディレクトリとは
   無関係なパスにプラグインツリーがバインドマウントされます（#11827）。
2. `<home>/.omniroute/plugins`。ここで `<home>` は `HOME` / `USERPROFILE`
   環境変数から取得されます。
3. プロセスにホームが一切設定されていない場合は、`/tmp/.omniroute/plugins`。

解決されたディレクトリは、起動時に `scanner.dir_resolved` として一度ログに記録され、
採用された入力（`OMNIROUTE_PLUGINS_DIR`、`home`、または `no-home-fallback`）も示されます。これにより、暗黙に手順 3 が選択されたイメージでも、単に空のプラグイン一覧だけを報告するのではなく、その旨が明示されます。
`POST /api/plugins/scan` は、その場所にある有効な
`plugin.json` を保持するすべてのサブディレクトリを検出して登録します。同じディレクトリが、
`pluginManager.install()` によるプラグインのコピー先ルートでもあるため、オーバーライドすると検出先と
インストール先が一緒に移動します。

> **`OMNIROUTE_PLUGINS_DIR` は `OMNIROUTE_PLUGIN_PATH` ではありません。** 後者は、
> `omniroute` サブコマンドを追加する `omniroute-cmd-*` npm パッケージを見つけるために、
> CLI コマンドプラグインローダー（`bin/cli/plugins.mjs`）のみが読み取ります。ここで説明しているランタイムスキャナーには
> 影響しません。こちらについては [PLUGINS.md](./PLUGINS.md) を参照してください。

### カスタムマーケットプレイスレジストリ URL

マーケットプレイスカタログのソースは、`pluginMarketplaceUrl` 設定から読み取られます
（`src/lib/plugins/marketplace.ts` は `settings.pluginMarketplaceUrl` を読み取ります）。
`http(s)` URL が設定されている場合、`listMarketplacePlugins()` はその URL を取得し、
トップレベルの JSON エントリ配列、または `plugins` 配列を持つオブジェクトのいずれかを受け付けます。
文字列の `name` を持たないエントリは除外されます。未設定の場合（または取得が
SSRF ガードにより失敗した場合や、不正なレスポンスが返された場合）は、組み込みのシードレジストリが
使用されます。

ダッシュボードの「Marketplace」タブには、この URL を入力するフィールドがあります（
`GET /api/settings` から読み戻されます）。

> 実装上の注意：ダッシュボードの「Save」アクションは、
> `pluginMarketplaceUrl` を `PATCH /api/settings` に送信します。執筆時点では、この
> キーは `updateSettingsSchema`
> （`src/shared/validation/settingsSchemas.ts`）で宣言されていないため、これに依存する前に、
> 使用しているリリースで設定が永続化されることを確認してください。設定ストアにキーが存在すれば、**読み取り**パス（`getSettings()` →
> `listMarketplacePlugins()`）はそのキーを反映します。

## セキュリティ

### ルート階層 — ループバックのみ

プラグインは生成された子プロセス内でコードを実行するため、`/api/plugins`
サーフェス全体が `LOCAL_ONLY`（Tier 1）に分類されます。ループバックの強制は、
認証チェックよりも**前に**無条件で実行されるため、管理トークンが漏洩し、
トンネル経由で対象ホストに到達した場合でも、プラグインのインストール、
有効化、アンインストールはできません。
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) および
Hard Rules #15 / #17 を参照してください。

### マーケットプレイスレジストリの SSRF ガード

カスタムレジストリ URL は攻撃者が影響を及ぼせる設定であるため、
`listMarketplacePlugins()` は取得前に次の 2 層の検査を実行します。

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` 以外をすべて拒否します。
   - 正規の `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) を使用し、リテラル表記の
     プライベート／ループバック／リンクローカル／ULA ホスト（IPv4 と IPv6
     の**両方**。IPv4 射影アドレスを含む）を拒否します。
   - `A` と `AAAA` の**両方**のレコードを解決し、解決されたアドレスの
     **いずれか**がプライベートである場合は拒否します。これにより、公開ホスト名
     → プライベート IP というバイパスを防ぎます。
   - **フェイルクローズ**：DNS 解決に失敗した場合は URL を拒否します。
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): フェッチ時に public-only URL
   ガードを再適用し、**リダイレクトをブロック**します（公開アドレスから
   プライベートアドレスへの `30x` ピボットを許可しません）。

いずれかの層で URL が拒否されてもリクエストは中止されません。マーケットプレイスは
警告をログに記録し、組み込みのシードレジストリへ暗黙的にフォールバックします。

> このガードは PR #3774 で強化され、特に A + AAAA の両方を解決し、
> IPv4 のみのチェックではなく、正規の `isPrivateHost` を使用するようになりました。

### プラグイン実行の分離

- **プロセス分離** — `loadPlugin()` (`src/lib/plugins/loader.ts`) は各プラグインを
  個別の Node.js 子プロセスで起動し、IPC 経由で通信します。フック呼び出しには
  タイムアウトがあり、`SIGTERM` → `SIGKILL` の順で強制終了処理が行われます。
- **環境変数の許可リスト** — 子プロセスが受け取る環境変数は許可リストに含まれる
  ものだけです。マニフェストが `env` 権限を要求した場合に限り、より広い範囲の
  環境変数が付与されます。
- **パスの封じ込め** — インストール／アップグレード／アンインストールでは、
  コピーまたは再帰削除を行う前に、プラグインディレクトリと `manifest.main` が
  管理対象のプラグインルートの**内部**に解決されることを検証します
  （改ざんされた DB パスや `manifest.main` 内の `../` トラバーサルを防止します）。
  有効化時には `realpath` でシンボリックリンクを解決し、プラグインディレクトリ外へ
  逸脱するエントリポイントの読み込みを拒否します。
- **オプションの整合性固定** — マニフェストでは `integrity`
  （`sha256-<base64>`、SRI 形式）フィールドを宣言できます。指定されている場合、
  ローダーは読み込み時にエントリファイルのハッシュを検証し、一致しなければ
  有効化を拒否します。これはオプトインの改ざん検出であり、セキュリティ境界では
  **ありません**。実際の境界は、ループバック専用ルーティングと権限モデルです。

## マニフェスト (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) によって検証されます。

| フィールド         | 型        | 備考                                                           |
| ------------------ | --------- | -------------------------------------------------------------- |
| `name`             | string    | 必須。kebab-case（`^[a-z0-9-]+$`）、1～100 文字                |
| `version`          | string    | 必須。semver（`MAJOR.MINOR.PATCH`）                            |
| `description`      | string?   | 500 文字以下                                                   |
| `author`           | string?   | 200 文字以下                                                   |
| `license`          | string?   | デフォルトは `MIT`                                             |
| `main`             | string?   | エントリファイル。デフォルトは `index.js`                      |
| `source`           | enum?     | `local` \| `marketplace`（デフォルトは `local`）               |
| `tags`             | string[]? | 検索タグ                                                       |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                |
| `hooks`            | object?   | プラグインが実装するフックを宣言するブール値                   |
| `skills`           | object[]? | オプションのスキル定義                                         |
| `enabledByDefault` | boolean?  | インストール時に自動有効化                                     |
| `configSchema`     | object?   | 設定フィールドのマップ（`string`/`number`/`boolean`/`select`） |
| `integrity`        | string?   | オプションの `sha256-<base64>` エントリファイル固定            |

権限は列挙型
`network` / `file-read` / `file-write` / `env` / `exec`
から選択されます。

## ライフサイクルフロー

```
install (POST /api/plugins, パス)
  → マニフェストをスキャン/検証 → ステージングへコピー → main がディレクトリ内にあることを確認
  → ~/.omniroute/plugins/<name> へアトミックに名前を変更 → DB 行を挿入
  → onInstall を実行 → enabledByDefault の場合: activate

activate (POST /api/plugins/{name}/activate)
  → realpath の包含チェック → loadPlugin()（子プロセスを起動）
  → 宣言されたフックを登録 → status = "active" → onActivate を実行

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate を実行（登録解除の前）→ フックの登録を解除
  → 子プロセスを終了 → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → active の場合は deactivate → onUninstall を実行
  → 包含チェック済みのプラグインディレクトリを再帰的に削除 → DB 行を削除
```

マニフェストのバージョンがインストール済みのバージョンより**厳密に
新しい**ディレクトリに対して `install` を再実行すると、自動的にアップグレードされます（クリーン再インストールとなり、設定は
デフォルトにリセットされます）。同じかそれ以前のバージョンは拒否されます。

## データベース

テーブル `plugins`（マイグレーション `076_create_plugins.sql`）:

| 列              | 型      | 備考                                              |
| --------------- | ------- | ------------------------------------------------- |
| `id`            | TEXT PK | UUID                                              |
| `name`          | TEXT    | 一意                                              |
| `version`       | TEXT    | semver。デフォルトは `1.0.0`                      |
| `description`   | TEXT    | 任意                                              |
| `author`        | TEXT    | 任意                                              |
| `license`       | TEXT    | デフォルトは `MIT`                                |
| `main`          | TEXT    | エントリファイル。デフォルトは `index.js`         |
| `source`        | TEXT    | デフォルトは `local`                              |
| `tags`          | TEXT    | JSON 配列。デフォルトは `[]`                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`  |
| `enabled`       | INT     | 0/1。デフォルトは 0                               |
| `manifest`      | TEXT    | 完全なマニフェスト JSON                           |
| `config`        | TEXT    | JSON。デフォルトは `{}`                           |
| `config_schema` | TEXT    | JSON。デフォルトは `{}`                           |
| `hooks`         | TEXT    | 宣言されたフック名の JSON 配列。デフォルトは `[]` |
| `permissions`   | TEXT    | JSON 配列。デフォルトは `[]`                      |
| `plugin_dir`    | TEXT    | 絶対インストールディレクトリ                      |
| `error_message` | TEXT    | `status = "error"` の場合に設定                   |
| `installed_at`  | TEXT    | `datetime('now')`                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                 |
| `activated_at`  | TEXT    | アクティベーション時に設定                        |

プラグインのメトリクス/分析は、追加のテーブル
（`090_plugin_metrics.sql`、`091_plugin_analytics.sql`）で追跡されます。

## ダッシュボード

`/dashboard/plugins` にあるダッシュボードページ
（`src/app/(dashboard)/dashboard/plugins/page.tsx`）には、2 つのタブがあります:

- **インストール済み** — インストール済みプラグインと宣言されたフック、activate/deactivate の切り替え、uninstall ボタン、および「プラグインをスキャン」
  アクション（`POST /api/plugins/scan`）を表示します。
- **マーケットプレイス** — `GET /api/plugins/marketplace` から取得したカタログと、カスタムレジストリ URL を設定する
  フィールドを表示します。

プラグインごとの設定ページは `/dashboard/plugins/[name]/config`
（`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`）にあります。

## 関連項目

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` がループバック限定（Tier 1）である理由
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — 関連するスキルフレームワーク
  （`src/lib/skills/`）。プラグインはマニフェストでスキルを宣言できます
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — イベント駆動型の外部向け
  連携
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  すべてのプラグインルートがエラーレスポンスに使用する `buildErrorBody()` パターン
