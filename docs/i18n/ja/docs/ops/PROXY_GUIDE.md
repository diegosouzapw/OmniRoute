# 🌐 OmniRoute Proxy Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **地理的なブロックを回避し、個人情報を保護しながら、あらゆるプロキシ経由で AI トラフィックをルーティング — 複雑な設定は一切不要です。**

OmniRoute には、上流の AI プロバイダーへのトラフィックを HTTP、HTTPS、または SOCKS5 プロキシ経由でルーティングできる、フル機能のプロキシ管理システムが含まれています。ブロック対象地域にいる場合、IP ローテーションが必要な場合、ステルスフィンガープリンティングを使用したい場合など、このガイドでは必要な情報をすべて説明します。

---

## 目次

- [プロキシを使用する理由](#why-use-proxies)
- [アーキテクチャの概要](#architecture-overview)
- [4 段階のプロキシシステム](#4-level-proxy-system)
- [プロキシレジストリ（CRUD）](#proxy-registry-crud)
- [1proxy 無料マーケットプレイス](#1proxy-free-proxy-marketplace)
- [プロキシローテーション](#proxy-rotation)
- [検出回避とステルス](#anti-detection--stealth)
- [上流プロキシモード](#upstream-proxy-modes)
- [ダッシュボード UI](#dashboard-ui)
- [API リファレンス](#api-reference)
- [環境変数](#environment-variables)
- [トラブルシューティング](#troubleshooting)

---

## プロキシを使用する理由

多くの AI プロバイダーは、地域に基づいてアクセスを制限しています。**ロシア、中国、イラン、キューバ、トルコ**などの国にいる開発者は、次のようなエラーに遭遇します。

```
unsupported_country_region_territory
```

ブロック対象地域外であっても、プロキシは次の用途に役立ちます。

| ユースケース          | 説明                                                                |
| --------------------- | ------------------------------------------------------------------- |
| **地域制限の回避**    | ブロック対象国から OpenAI、Anthropic、Codex、Copilot にアクセスする |
| **IP ローテーション** | レート制限を回避するため、複数の IP にリクエストを分散する          |
| **プライバシー**      | 上流プロバイダーから実際の IP を隠す                                |
| **コンプライアンス**  | 特定の管轄区域を経由してトラフィックをルーティングする              |
| **テスト**            | 異なる地域からのリクエストをシミュレートする                        |

---

## アーキテクチャの概要

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute サーバー                       │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ プロキシ     │    │ プロキシ      │    │ プロキシ           │  │
│  │ レジストリ   │───▶│ ディスパッチャー│───▶│ Fetch（undici）   │  │
│  │（SQLite）    │    │（キャッシュ済み）│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy 同期  │                        │ 上流             │  │
│  │（無料プール） │                        │ プロバイダー API   │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 主要コンポーネント

| コンポーネント               | ファイル                                     | 役割                                                                        |
| ---------------------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| **プロキシレジストリ**       | `src/lib/db/proxies.ts`                      | プロキシエントリとスコープ割り当ての CRUD                                   |
| **プロキシディスパッチャー** | `open-sse/utils/proxyDispatcher.ts`          | キャッシュ機能を備えた `undici` ProxyAgent/SOCKS ディスパッチャーを作成する |
| **プロキシ Fetch**           | `open-sse/utils/proxyFetch.ts`               | プロキシディスパッチャーを注入して `fetch()` をラップする                   |
| **設定ルート**               | `src/app/api/settings/proxy/route.ts`        | 従来のプロキシ設定 API（GET/PUT/DELETE）                                    |
| **管理ルート**               | `src/app/api/v1/management/proxies/route.ts` | レジストリ CRUD API（GET/POST/PATCH/DELETE）                                |
| **1proxy DB**                | `src/lib/db/oneproxy.ts`                     | 無料プロキシマーケットプレイスの永続化                                      |

---

## 4レベルのプロキシシステム

OmniRouteは、優先順位に従って解決される**4つの独立したスコープ**でのプロキシ設定をサポートしています。

```
優先順位による解決順序（最高 → 最低）:

  1. 🔵 アカウント/接続プロキシ  →  APIキー/OAuth接続ごと
  2. 🟡 プロバイダープロキシ     →  プロバイダーごと（例: すべてのOpenAIトラフィック）
  3. 🟠 コンボプロキシ           →  コンボ/ルーティング設定ごと
  4. 🟢 グローバルプロキシ       →  すべてのトラフィック、すべてのプロバイダー
```

### 解決の仕組み

OmniRouteがアップストリームプロバイダーにリクエストを送信すると、`resolveProxyForConnectionFromRegistry()`が呼び出され、各レベルが順番に確認されます。

1. **アカウントレベル** — この特定の接続IDにプロキシが割り当てられているか？
2. **プロバイダーレベル** — このプロバイダー（例: `openai`）にプロキシが割り当てられているか？
3. **グローバルレベル** — グローバルプロキシが設定されているか？
4. **プロキシなし** — プロバイダーに直接接続します。

最初に一致した設定が使用されます。つまり、グローバルプロキシをフォールバックとして設定し、特定のプロバイダーや接続に対して上書きできます。

### プロキシ経由となる対象

| トラフィックの種類 | プロキシ経由？ | 備考                                         |
| ------------------ | -------------- | -------------------------------------------- |
| チャット補完       | ✅             | すべての`/v1/chat/completions`リクエスト     |
| 埋め込み           | ✅             | `/v1/embeddings`                             |
| 画像生成           | ✅             | `/v1/images/generations`                     |
| 音声（TTS/STT）    | ✅             | `/v1/audio/*`                                |
| OAuthトークン交換  | ✅             | `unsupported_country_region_territory`を解決 |
| 接続テスト         | ✅             | 「接続をテスト」ボタンでプロキシを使用       |
| トークン更新       | ✅             | バックグラウンドでのOAuth更新                |
| モデル同期         | ✅             | モデルの一覧取得と検出                       |

---

## プロキシレジストリ（CRUD）

プロキシレジストリは、すべてのプロキシを保存するSQLiteテーブル（`proxy_registry`）です。各プロキシには以下のフィールドがあります。

| フィールド | 型     | 説明                                  |
| ---------- | ------ | ------------------------------------- |
| `id`       | UUID   | 一意の識別子                          |
| `name`     | 文字列 | 人が判読できるラベル                  |
| `type`     | 文字列 | プロトコル: `http`、`https`、`socks5` |
| `host`     | 文字列 | プロキシのホスト名またはIP            |
| `port`     | 整数   | ポート番号                            |
| `username` | 文字列 | 認証ユーザー名（保存時に暗号化）      |
| `password` | 文字列 | 認証パスワード（保存時に暗号化）      |
| `region`   | 文字列 | 地理的リージョンのラベル              |
| `notes`    | 文字列 | 自由記述のメモ                        |
| `status`   | 文字列 | `active`または`inactive`              |
| `source`   | 文字列 | `manual`または`oneproxy`              |

### プロキシの作成

**ダッシュボードから:**

1. **設定 → プロキシ**に移動します
2. **プロキシを追加**をクリックします
3. タイプ、ホスト、ポート、および任意の認証情報を入力します
4. 保存します

**APIから:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### プロキシの更新

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **注:** 明示的に空でない置換値を送信しない限り、認証情報は保持されます。`username`/`password`に空文字列を送信した場合、保存済みの値が維持されます。

### プロキシの削除

```bash
# プロキシがいずれかのスコープに割り当てられている場合は失敗
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# 強制削除（割り当ても削除）
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### プロキシの一覧表示

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### スコープへのプロキシの割り当て

```bash
# グローバルスコープに割り当て
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# 特定のプロバイダーに割り当て
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# 特定の接続/キーに割り当て
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### 有効なプロキシの解決

指定した接続にどのプロキシが使用されるかを確認します。

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

解決されたプロキシが、そのレベル（`account`、`provider`、または`global`）およびソースとともに返されます。

### 一括割り当て

1つのプロキシを複数のプロバイダーまたは接続に一括で割り当てます。

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### インポート/エクスポート

プロキシは**バックアップ/復元**システムに含まれます。OmniRoute設定をエクスポートする場合:

1. **ダッシュボード → 設定 → バックアップ**に移動します
2. **エクスポート**をクリックします — プロキシレジストリと割り当ても含まれます
3. 復元するには、**インポート**をクリックしてバックアップファイルをアップロードします

プロキシレジストリは、**host+portによるupsert**もサポートしています。すでに存在するプロキシ（ホストとポートが同じ）をインポートすると、重複を作成する代わりに既存のプロキシが更新されます。

### レガシーマイグレーション

以前のバージョン（レジストリ導入前）でプロキシを設定していた場合、OmniRoute はそれらを自動的に移行します。

```
従来の key_value ストア → proxy_registry + proxy_assignments
```

この処理は、アップグレード後の初回起動時に一度だけ実行されます。再実行するには、`migrateLegacyProxyConfigToRegistry({ force: true })` を使用してください。

---

## 1proxy 無料プロキシマーケットプレイス

> 🆕 **[@oyi77](https://github.com/oyi77) によるコントリビューション** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847)（Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788)）

OmniRoute は **[1proxy](https://1proxy-api.aitradepulse.com)** コミュニティプラットフォームと統合されており、世界中の**検証済み無料プロキシ数百件**を利用できます。独自のプロキシインフラストラクチャを持たないユーザーに最適です。

### 仕組み

```
┌─────────────┐   同期      ┌─────────────────┐  ローテーション  ┌────────────┐
│  1proxy API │ ──────────▶ │  proxy_registry  │ ──────────────▶ │ プロバイダー │
│   （外部）   │ 最大500件   │  source=oneproxy │    品質順        │    API     │
└─────────────┘ プロキシ     └─────────────────┘                  └────────────┘
```

1. **同期** — OmniRoute が 1proxy API から検証済みプロキシを取得します
2. **保存** — プロキシは `source = 'oneproxy'` として同じ `proxy_registry` テーブルに保存されます
3. **フィルタリング** — プロトコル、国、品質スコアでフィルタリングします
4. **ローテーション** — 品質、ランダム、または順次戦略を使用して最適なプロキシを選択します
5. **自動劣化** — 失敗したプロキシの品質スコアを下げ、しきい値を下回ると非アクティブとしてマークします

### プロキシの同期

**ダッシュボードから：**

1. **Settings → 1proxy** タブに移動します
2. **「Sync Now」**をクリックします
3. 統計情報（プロキシ総数、アクティブ数、平均品質、国別内訳）を確認します

**API から：**

```bash
# 同期を開始
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# レスポンス：
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### プロキシのフィルタリング

```bash
# プロトコルでフィルタリング
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# 国でフィルタリング
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# 最小品質スコアでフィルタリング
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# フィルターを組み合わせる
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### プロキシ品質スコア

各 1proxy プロキシには、次のメタデータが含まれます：

| フィールド      | 説明                                             |
| --------------- | ------------------------------------------------ |
| `qualityScore`  | 1proxy の検証による0～100の評価                  |
| `latencyMs`     | 測定されたネットワーク遅延                       |
| `anonymity`     | `transparent`、`anonymous`、または `elite`       |
| `googleAccess`  | プロキシが Google サービスにアクセス可能かどうか |
| `countryCode`   | 2文字の ISO 国コード                             |
| `lastValidated` | 最終検証時のタイムスタンプ                       |

品質スコアは動的に調整されます：

- **失敗したリクエスト**ごとにスコアが10ポイント下がります
- **スコアが10以下に低下** → プロキシが `inactive` としてマークされます
- 非アクティブなプロキシはローテーションから除外されます

### ローテーション戦略

```bash
# 品質順にローテーション（最適なプロキシを優先）— デフォルト
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# ランダムローテーション
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# 順次ローテーション（最終検証日時が古いものを優先）
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### サーキットブレーカー

1proxy の同期にはサーキットブレーカーが組み込まれています：

- **5回連続で同期に失敗**すると、それ以降の同期試行はブロックされます
- `resetOneproxyCircuitBreaker()` を使用するか、サーバーを再起動してリセットします
- 同期ステータスは `GET /api/settings/oneproxy?action=status` で確認できます

### 1proxy プロキシの削除

```bash
# 1件の 1proxy プロキシを削除
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# すべての 1proxy プロキシを削除（手動プロキシには影響しません）
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## 検出回避とステルス

OmniRoute は単にプロキシ経由でトラフィックをルーティングするだけではなく、トラフィックを正規のものに見せます。

### TLS フィンガープリントの偽装

`wreq-js` を使用してブラウザーのような TLS フィンガープリントを生成し、ブラウザー以外の TLS ハンドシェイクを検出するボット検出システムを回避します。

### CLI フィンガープリントの一致

**CLI フィンガープリント切り替え**（`設定 → セキュリティ`）は、HTTP ヘッダーと JSON ボディフィールドを並べ替え、ネイティブ CLI バイナリ（Claude Code、Codex など）のシグネチャと正確に一致させます。これはプロキシに**追加して**機能します。

```
あなたの IP（ブロック対象）→ プロキシ IP（米国）→ プロバイダー API
                              + TLS 偽装
                              + CLI フィンガープリント
```

**IP マスキング**と**リクエストの真正性**を同時に実現できます。

### プロキシ IP の維持

ダッシュボードの色分けされたバッジに、どのプロキシレベルが有効かが表示されます。

| バッジ | レベル       | 意味                                                 |
| ------ | ------------ | ---------------------------------------------------- |
| 🟢     | グローバル   | すべてのトラフィックがこのプロキシを経由します       |
| 🟡     | プロバイダー | このプロバイダーのトラフィックのみがプロキシされます |
| 🔵     | 接続         | この特定のキー／アカウントがこのプロキシを使用します |

バッジには、確認用に名前解決されたプロキシ IP も表示されます。

---

## アップストリームプロキシモード

CLIProxyAPI パターンを使用するプロバイダー向けに、OmniRoute は 3 つのアップストリームプロキシモードをサポートしています。

| モード        | 説明                                                           |
| ------------- | -------------------------------------------------------------- |
| `native`      | OmniRoute がプロキシルーティングを直接処理します（デフォルト） |
| `cliproxyapi` | 外部の CLIProxyAPI インスタンスに処理を委任します              |
| `fallback`    | 最初に native を試し、失敗した場合は CLIProxyAPI を使用します  |

プロバイダーごとに設定します。

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## ダッシュボード UI

### 設定 → プロキシタブ

- **グローバルプロキシ**の設定（すべてのトラフィックに対して一度だけ設定）
- **プロバイダーごとのプロキシ**によるオーバーライド
- **接続ごとのプロキシ**の割り当て
- 設定済みプロキシ経由の**接続テスト**
- 有効なプロキシレベルを示す**色分けされたバッジ**

### 設定 → 1proxy タブ

- 無料プロキシを取得するための**今すぐ同期**ボタン
- **統計カード**：合計、アクティブ、平均品質、最終同期
- **フィルター**：プロトコル、国コード、最低品質
- ホスト、プロトコル、国、品質スコア、レイテンシー、匿名性、Google へのアクセス可否を表示する**プロキシテーブル**
- 成功／失敗の追跡と連続失敗回数を表示する**同期ステータス**パネル
- すべての 1proxy エントリーを削除する**すべてクリア**

---

## API リファレンス

### プロキシ設定 API

| メソッド | エンドポイント                                 | 説明                       |
| -------- | ---------------------------------------------- | -------------------------- |
| `GET`    | `/api/settings/proxy`                          | プロキシ設定全体を取得     |
| `GET`    | `/api/settings/proxy?level=global`             | グローバルプロキシを取得   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | プロバイダープロキシを取得 |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | 有効なプロキシを解決       |
| `PUT`    | `/api/settings/proxy`                          | プロキシ設定を更新         |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | 指定レベルのプロキシを削除 |

### プロキシレジストリ API

| メソッド | エンドポイント                                    | 説明                       |
| -------- | ------------------------------------------------- | -------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | すべてのプロキシを一覧表示 |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | ID でプロキシを取得        |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | プロキシの割り当てを取得   |
| `POST`   | `/api/v1/management/proxies`                      | プロキシを作成             |
| `PATCH`  | `/api/v1/management/proxies`                      | プロキシを更新             |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | プロキシを削除             |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | 強制削除                   |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | 一括割り当て               |
| `GET`    | `/api/v1/management/proxies/assignments`          | 割り当てを一覧表示         |
| `GET`    | `/api/v1/management/proxies/health`               | プロキシのヘルス統計を取得 |

### トンネル API

プロキシ経由でアウトバウンドトラフィックをルーティングする代わりに、OmniRoute インスタンスを公開インターネットに公開する方法（Cloudflare/ngrok/Tailscale）については、[TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) を参照してください。トンネル REST API は `/api/tunnels/{cloudflared,ngrok,tailscale}/*` 配下にあり、上記のアウトバウンドプロキシチェーンとは独立しています。

### 1proxy API

| メソッド | エンドポイント                         | 説明                         |
| -------- | -------------------------------------- | ---------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy のプロキシを一覧表示  |
| `GET`    | `/api/settings/oneproxy?action=stats`  | 統計と同期ステータスを取得   |
| `GET`    | `/api/settings/oneproxy?action=status` | 同期ステータスのみを取得     |
| `POST`   | `/api/settings/oneproxy`               | 同期を開始                   |
| `POST`   | `/api/settings/oneproxy/rotate`        | 次のプロキシにローテーション |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | 1 件を削除                   |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | すべてクリア                 |

### アップストリームプロキシ API

| メソッド | エンドポイント                    | 説明                                 |
| -------- | --------------------------------- | ------------------------------------ |
| `GET`    | `/api/upstream-proxy/:providerId` | アップストリームプロキシ設定を取得   |
| `PUT`    | `/api/upstream-proxy/:providerId` | アップストリームプロキシモードを設定 |
| `DELETE` | `/api/upstream-proxy/:providerId` | アップストリームプロキシ設定を削除   |

---

## 環境変数

| 変数                  | デフォルト | 説明                                                                   |
| --------------------- | ---------- | ---------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`     | SOCKS5プロキシのサポートを有効化（`.env.example`のデフォルトは`true`） |

---

## トラブルシューティング

### 「SOCKS5 proxy is disabled」

`.env`ファイルで`ENABLE_SOCKS5_PROXY=true`を設定し、再起動してください。

### プロキシ経由で「socket hang up」エラーが発生する

アイドル状態の接続を切断する安価なプロキシでは、これは正常な動作です。OmniRouteでは、以下の方法ですでに対処しています。

- プロキシ接続のキープアライブを無効化（`keepAliveTimeout: 1`）
- パイプライン処理を無効化（`pipelining: 0`）
- ディスパッチャーをキャッシュし、ハンドシェイクの繰り返しを回避

問題が解消しない場合は、別のプロキシを試すか、1proxyのローテーション機能を使用してください。

### OAuth中に「unsupported_country_region_territory」が発生する

OAuthフローを開始する**前に**プロキシが設定されていることを確認してください。OmniRouteは、設定されたプロキシを経由してOAuthトークン交換を行います。最初にグローバルプロキシまたはプロバイダーレベルのプロキシを設定してから、接続してください。

### プロキシが使用されない

解決の優先順位を確認してください。

1. `GET /api/settings/proxy?resolve=your-connection-id`で確認する
2. プロキシの`status`が`active`（`inactive`ではない）であることを確認する
3. プロキシ割り当てのスコープが接続と一致していることを確認する

### 1proxyの同期に失敗する

同期ステータスを確認してください。

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

`consecutiveFailures >= 5`の場合、サーキットブレーカーが作動しています。サーバーを再起動してリセットするか、手動でリセットされるまで待ってください。

---

## データベーススキーマ

### `proxy_registry`テーブル

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual'または'oneproxy'
  quality_score INTEGER,                     -- 0～100（1proxyのみ）
  latency_ms INTEGER,                        -- ミリ秒（1proxyのみ）
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- Googleにアクセス可能か？（1proxy）
  last_validated TEXT,                       -- ISOタイムスタンプ（1proxy）
  country_code TEXT,                         -- ISO 2文字コード（1proxy）
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments`テーブル

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global'、'provider'、'account'、'combo'
  scope_id TEXT,              -- プロバイダーID、接続ID、またはコンボID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## プロキシのヘルスチェック（v3.8.16以降）

OmniRouteの**プロキシ高速失敗**メカニズム（`src/lib/proxyHealth.ts`）は、簡易TCP接続チェックによって2秒未満で停止中のプロキシを検出し、リクエストごとのオーバーヘッドを避けるために**結果をキャッシュ**します。

### 動作の仕組み

```
リクエスト ──▶ ProxyHealthCache.get(url)
                 │
                 ├─ キャッシュヒット＋有効？  ──▶ キャッシュされたステータスを返す
                 │
                 └─ キャッシュミス／期限切れ？  ──▶ host:portにTCP接続
                                                    （タイムアウト：FAST_FAIL_TIMEOUT_MS）
                                                    ──▶ HEALTH_CACHE_TTL_MSの間キャッシュ
                                                    ──▶ 結果を返す
```

この仕組みがない場合、停止中のプロキシは失敗するまで、すべてのリクエストを`PROXY_TIMEOUT_MS`の全期間（デフォルトは30秒）ブロックします。

### 調整可能な環境変数

| 変数                         | デフォルト | 用途                                    |
| ---------------------------- | ---------- | --------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`     | ヘルスチェックごとのTCP接続タイムアウト |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`    | ヘルスチェック結果をキャッシュする期間  |

**推奨値：**

| シナリオ                      | 高速失敗タイムアウト | キャッシュTTL | 理由                                                                             |
| ----------------------------- | -------------------- | ------------- | -------------------------------------------------------------------------------- |
| 高スループットAPIゲートウェイ | 1500ms               | 60000ms       | 積極的に早期失敗させ、キャッシュを長くしてチェック回数を削減                     |
| 地理的に分散したノード        | 3000ms               | 15000ms       | 低速なネットワークには長い時間が必要。キャッシュを短くして迅速にフェイルオーバー |
| 開発／テスト                  | 1000ms               | 10000ms       | ローカルプロキシで迅速に反復                                                     |
| ステルス／検出回避            | 2500ms               | 45000ms       | レート制限を引き起こす可能性がある短時間での繰り返しチェックを回避               |

### プロキシのヘルス状態を確認する

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// 特定のプロキシを強制的に再チェック
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

キャッシュエントリが`HEALTH_CACHE_TTL_MS`を超過し、次のリクエストで新しいチェックが実行される場合、`stale`フラグは`true`になります。

### プロキシタイプごとのデフォルト

ヘルスチェックでは、URLスキームに基づいて適切なデフォルト値が使用されます。

| スキーム                   | デフォルトポート |
| -------------------------- | ---------------- |
| `http://`                  | 8080             |
| `https://`                 | 443              |
| `socks5://` / `socks5h://` | 1080             |

URL内のカスタムポート（`http://host:9999`）は、常にスキームのデフォルトより優先されます。

---

## プロキシ分析と可観測性

OmniRoute はプロキシごとの使用状況を追跡し、オペレーターがルーティングパターン、レイテンシの急増、繰り返し発生する障害を診断できるようにします。

### 追跡される項目

設定済みのプロキシを経由するすべてのリクエストについて、OmniRoute は以下を記録します。

| メトリクス   | 説明                                                      |
| ------------ | --------------------------------------------------------- |
| `proxy_url`  | 完全なプロキシ URL（認証情報はマスキング済み）            |
| `provider`   | アップストリームプロバイダー ID（openai、anthropic など） |
| `latency_ms` | プロキシハンドシェイクを含む合計往復時間                  |
| `connect_ms` | TCP 接続時間のみ                                          |
| `status`     | アップストリームから返された HTTP ステータスコード        |
| `error`      | リクエストが失敗した場合のエラークラス                    |
| `timestamp`  | ISO 8601 UTC                                              |

### データへのアクセス

```bash
# 最近のプロキシイベント
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

実際のエンドポイントは `/api/usage/proxy-logs` です（`src/app/api/usage/proxy-logs/route.ts` を参照）。このエンドポイントは以下をサポートします。

- `GET /api/usage/proxy-logs` — プロキシログを取得
- `DELETE /api/usage/proxy-logs` — すべてのプロキシログを消去

必要に応じて、集計統計を SQL を使用して `proxy_logs` テーブルから直接照会できます。ダッシュボード UI でも集計ビューが提供される場合があります。

### 一般的なパターン

**不安定なプロキシを検出する**（成功と失敗を繰り返す場合）：

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**低速なプロキシを特定する**（p95 レイテンシが 2 秒を超える場合）：

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## ローテーション戦略の決定ツリー

複数のプロキシがスコープに割り当てられている場合、OmniRoute は**ローテーション戦略**を使用して、各リクエストに使用するプロキシを選択します。戦略はスコープレベル（グローバル、プロバイダーごと、アカウントごと、組み合わせごと）で設定されます。

### 利用可能な戦略

| 戦略                    | 使用する状況                             | トレードオフ                                                         |
| ----------------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| `quality`（デフォルト） | 品質が混在するプロキシを使用する本番環境 | 高評価のプロキシを優先するため、低評価のものが使用されない場合がある |
| `random`                | 負荷分散、プライバシー                   | 均等に分散するが、品質シグナルは無視する                             |
| `sequential`            | デバッグ、決定論的テスト                 | プロキシを順番に巡回するため、動作を理解しやすい                     |

### 決定ツリー

```
                    プロキシの品質スコアがありますか？
                    │
        ┌───────────┴───────────┐
        │                       │
       はい                    いいえ
        │                       │
   すべてのプロキシの           │
   品質はほぼ同じですか？       │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  はい      いいえ             使用
   │         │              `random`
   │         │              （均等な分散により
   │         │              時間の経過とともに
   │         │              品質データを蓄積）
   │         │
   │    `quality` を使用
   │    （品質が混在する場合に
   │    最適）
   │
`random` を使用
（負荷を均等に
分散）
```

## 独自プロキシの障害時自動除外

1proxy マーケットプレイスプールでは、障害が発生したプロキシをすでに自動的に降格させます（[プロキシ品質スコア](#proxy-quality-scores)を参照）。レジストリに**自身で**追加したプロキシについては、バックグラウンドのヘルススケジューラー（`src/lib/proxyHealth/scheduler.ts`）により、何も削除することなく、同様に「停止したメンバーをチェーンから自動的に除外する」動作を実現できます。

```bash
# .env — 3回連続でプローブに失敗した後、プロキシをソフト無効化し、
# プローブへの応答が再開されたら自動的に再有効化します。
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

マルチプロキシチェーンでの動作：

1. スケジューラーは、登録されているすべてのプロキシを `PROXY_HEALTH_INTERVAL_MS` ごとにプローブします（デフォルトは10分、最小は1分）。
2. `PROXY_AUTO_REMOVE_AFTER` 回連続で**確定的な**障害（実際の接続障害。タイムアウトやプローブ対象自体の 5xx はカウントされません。[プロキシヘルスチェック](#proxy-health-checking-v3816)を参照）が発生すると、プロキシの `status` が `dead` に設定されます。
3. `dead` は、プール／ローテーションの解決時に使用される稼働ステータスフィルターによって除外されるステータスの1つです。そのため、スコープのローテーション（ラウンドロビン／ランダム／スティッキー／レイテンシー。[ローテーション戦略の決定木](#rotation-strategy-decision-tree)を参照）は、新しいリクエストへのそのプロキシの割り当てを直ちに停止します。プール内の他のプロキシには影響せず、プール全体が暗黙的に直接接続へフォールバックすることもありません。[4段階プロキシシステム](#4-level-proxy-system)のフェイルクローズ保護を参照してください。
4. スケジューラーは、同じ間隔で `dead` プロキシのプローブを継続します。次のプローブが成功すると `status` が `active` に戻り、そのプロキシはローテーションに再参加します。手動で再追加する必要はありません。

これは意図的に**オプトインかつ非破壊的**な仕組みです。デフォルトでは、スケジューラーは障害のカウントとログ記録のみを行い（`decision.ts` のポリシー C を参照）、`PROXY_AUTO_DISABLE` が行を削除することはありません。行を削除するのは、別の、より積極的な `PROXY_AUTO_REMOVE` フラグです。両方が `true` に設定されている場合は、`PROXY_AUTO_REMOVE` が優先されます（まもなく削除されるプロキシを、その前にソフト無効化しても意味がないためです）。変数の完全な一覧については、[環境設定](../reference/ENVIRONMENT.md)リファレンスを参照してください。

---

> 📖 **関連ドキュメント：**
>
> - [ユーザーガイド](../guides/USER_GUIDE.md) — 一般的なセットアップと設定
> - [API リファレンス](../reference/API_REFERENCE.md) — API の完全なドキュメント
> - [環境設定](../reference/ENVIRONMENT.md) — すべての環境変数
