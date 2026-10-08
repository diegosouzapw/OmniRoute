# Traffic Inspector (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector は、OmniRoute に組み込まれた HTTPS トラフィックデバッガーです。Charles Proxy / mitmweb / HTTP Toolkit のようなツールでありながら、**LLM 対応**かつ**エージェント対応**です。`/dashboard/tools/traffic-inspector` で利用でき、最大 5 つの同時キャプチャソースからリアルタイムトラフィックを受信します。

**ダッシュボードの場所:** `/dashboard/tools/traffic-inspector`
**サイドバーグループ:** ツール（AgentBridge の後）
**関連項目:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge はキャプチャモード 1 です。

---

## §1 概要

### Traffic Inspector の特長

| 機能                                                                                | mitmweb | Charles | Fiddler | **OmniRoute Traffic Inspector** |
| ----------------------------------------------------------------------------------- | :-----: | :-----: | :-----: | :-----------------------------: |
| Web ベース                                                                          |    ✓    |    ✗    |    ✗    |                ✓                |
| オープンソース                                                                      |    ✓    |    ✗    |  一部   |                ✓                |
| **エージェント対応**（リクエストが Antigravity/Copilot などから送信されたかを識別） |    ✗    |    ✗    |    ✗    |                ✓                |
| **LLM 対応**（OpenAI/Anthropic/Gemini の形式、トークン、モデルを解析）              |    ✗    |    ✗    |    ✗    |                ✓                |
| **モデルマッピングを表示**（gemini-3-flash → claude-sonnet-4.7）                    |    ✗    |    ✗    |    ✗    |                ✓                |
| **プロキシとアップストリームのレイテンシを分離**                                    |  一部   |    ✗    |    ✗    |                ✓                |
| **OmniRoute と統合**されたルーティング、フォールバック、コスト                      |    ✗    |    ✗    |    ✗    |                ✓                |
| **システム全体のプロキシデバッグ**（マシン上のあらゆるアプリ）                      |    ✓    |    ✓    |    ✓    |                ✓                |
| **カスタムホストキャプチャ**（ホスト単位の DNS リダイレクト）                       |    ✓    |    ✓    |    ✓    |                ✓                |
| **HTTP_PROXY 環境変数モード**                                                       |    ✓    |    ✓    |    ✓    |                ✓                |
| **会話ビュー**（複数ターンの吹き出し、tool_use/tool_result）                        |    ✗    |    ✗    |    ✗    |                ✓                |
| **SSE ストリームマージャー**（差分イベントから再構築）                              |    ✗    |    ✗    |    ✗    |                ✓                |
| **セッション記録**（名前付き、.har/.jsonl 形式でエクスポート可能）                  |    ✗    |    ✓    |    ✓    |                ✓                |

### アーキテクチャの概要

`TrafficBuffer`（`src/mitm/inspector/buffer.ts`）は、共有のインメモリリングバッファです（デフォルトは 1000 エントリで、`INSPECTOR_BUFFER_SIZE` により設定可能）。すべてのキャプチャソースは、`push()` を介してこのバッファに書き込みます。バッファは `kindDetector.ts` を使用して各エントリを分類し（LLM リクエストかどうかを判定）、`contextKey`（システムプロンプトの SHA-256 フィンガープリント）を計算したうえで、`globalTrafficBuffer.subscribe()` を介してすべての WebSocket サブスクライバーにブロードキャストします。ダッシュボードは `GET /api/tools/traffic-inspector/ws` を介して接続し、接続時にスナップショットを受信した後、`new`/`update`/`clear` イベントを受信します。

---

## §2 キャプチャモード

Traffic Inspector は、**5 つの同時キャプチャソース**をサポートします。それぞれ個別に切り替えられます。すべての `InterceptedRequest`（`src/mitm/inspector/types.ts`）の `source` フィールドは、`"agent-bridge"`、`"custom-host"`、`"http-proxy"`、`"system-proxy"`、または `"tproxy"` のいずれかです。

### モード 1 — AgentBridge（デフォルト、常時有効）

**ソース:** AgentBridge ハンドラー（`src/mitm/handlers/base.ts`）
**仕組み:** `MitmHandlerBase` のすべての `intercept()` 呼び出しは、転送前に `hookBufferStart()` を呼び出し、完了時に `hookBufferUpdate()` を呼び出します。追加設定は一切不要で、AgentBridge が起動するとすぐに機能します。
**対象範囲:** AgentBridge で設定された 9 つの IDE エージェント
**注:** `InterceptedRequest` の `source` フィールド = `"agent-bridge"`

### モード 2 — カスタムホスト（DNS リダイレクト）

**ソース:** ユーザー定義のホストリスト（`inspector_custom_hosts` テーブル）
**仕組み:** UI からホストを追加すると、`127.0.0.1 <host>` が `/etc/hosts` に追加されます（sudo が必要）。既存の AgentBridge MITM サーバー（ポート 443）が、新しいホスト用の SNI 証明書を動的に生成します。
**対象範囲:** 追加されたホストを使用するすべてのアプリケーション — アプリの設定変更は不要
**注:** `source` = `"custom-host"`

ユースケースの例:

- Python スクリプトからの `api.openai.com` を監視
- `my-internal-llm.company.com` をデバッグ
- 同じネットワーク上のモバイルデバイスからのトラフィックをキャプチャ（ARP スプーフィングを使用 — 上級者向け）

### モード 3 — HTTP_PROXY リスナー（ポート 8080）

**ソース:** `HTTP_PROXY`/`HTTPS_PROXY` 環境変数を使用するアプリケーション
**仕組み:** 標準的な明示型 HTTP/HTTPS プロキシとして動作する、ポート 8080 のセカンダリリスナー（`src/mitm/inspector/httpProxyServer.ts`）。`CONNECT` トンネル（HTTPS）と直接の HTTP リクエストを受け付けます。
**対象範囲:** `HTTP_PROXY` 環境変数に対応するすべてのアプリケーション — DNS の変更も sudo も不要
**注:** `source` = `"http-proxy"`

```bash
# 単一コマンドをすばやくキャプチャ:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# シェルセッション内で継続的にキャプチャ:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**TLS の制限:** HTTPS `CONNECT` トンネルは、デフォルトではメタデータ（ホスト、ポート、タイミング）のみキャプチャされ、TLS 本文は復号されません。本文全体を検査するには、「プロキシモードで HTTPS を復号」トグルを有効にしてください（オプトインであり、AgentBridge 証明書が信頼されている必要があります）。

**ポートの競合:** ポート 8080 が使用中の場合、AgentBridge は構造化されたエラーを伴う 409 を返します。`INSPECTOR_HTTP_PROXY_PORT` 環境変数でポートを変更してください。

### モード 4 — システム全体のプロキシ（上級者向け、オプトイン）

**ソース:** OS レベルのプロキシ設定（マシン上のすべてのアプリに適用）
**仕組み:** OS API を使用して、すべての HTTP/HTTPS トラフィックを HTTP_PROXY リスナー経由にリダイレクトします:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **対象範囲:** システムプロキシ設定に対応する、マシン上のすべてのアプリケーション
  **注:** `source` = `"system-proxy"`

**安全機構:**

- 自動無効化タイマー（デフォルトは 30 分、`INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES` で設定可能）
- 以前のシステムプロキシ状態を DB に保存し、元に戻す際に復元
- 有効な間にユーザーが別のページへ移動しようとすると、ダッシュボードに「システムプロキシを元に戻しています」というプロンプトを表示
- UI に `⚠ 上級者向け` バッジと明示的な確認チェックボックスを表示

### モード 5 — TPROXY 透過復号（Linux、root、オプトイン）

**ソース:** カーネルの TPROXY + ポリシールーティング（`src/mitm/tproxy/`）
**仕組み:** `mangle OUTPUT` で、ターゲットポート（デフォルトは `443`）への新しいローカル発信 TCP 接続にマークを付け、`ip rule` によってマークされたパケットをローカル配送に再ルーティングし、`mangle PREROUTING` の `TPROXY` ターゲットがそれらを透過（**IP_TRANSPARENT**）リスナー（デフォルトポート `8443`）に渡します。リスナーは、動的 CA が**必要に応じて SNI ホスト名ごとに発行した**リーフ証明書を使用して TLS を終端し、復号された通信をキャプチャしたうえで、リクエストを再暗号化して元の宛先へ転送します。
**対象範囲:** ターゲットポート上の**任意の**宛先ホスト — `/etc/hosts` の偽装、`HTTP_PROXY` 環境変数、システム全体のプロキシ変更は不要です。インターセプト対象のプロセスに設定変更は必要ありませんが、動的 CA を信頼する必要があります。
**注:** `source` = `"tproxy"`

**要件:** Linux のみ（**IP_TRANSPARENT** は Linux 専用）、**CAP_NET_ADMIN** ケーパビリティ（root）、および C ツールチェーンでビルドする必要があるネイティブ N-API アドオン（`npm run build:native:tproxy`）。利用できない場合、ダッシュボードのトグルは無効になり、「TPROXY 復号には Linux + root + ネイティブアドオンが必要です」というツールチップが表示されます。ファイアウォールルールはトランザクションとして適用および取り消され（クラッシュしても `mangle` ルールが残ることはありません）、再起動時に消去されます。SO_MARK ベースのループ防止機構により、プロキシ自身が再暗号化して転送した通信が再度インターセプトされるのを防ぎます。

これは専用の運用ガイドを備えた大規模なサブシステムです。完全なファイアウォール設定手順、SNI ごとの動的 CA + トラストストアインストーラー、ローカル専用ルート、ループ防止の詳細、および設定スキーマについては、`docs/security/MITM-TPROXY-DECRYPT.md`（git 内にあり、`/docs` にはコンパイルされません）を参照してください。トグルは `GET / POST / DELETE /api/tools/agent-bridge/tproxy` によって制御されます（注: このルートは Traffic Inspector プレフィックスではなく、AgentBridge プレフィックス配下にあります）。

### キャプチャモードの比較

| モード            | セットアップ                          |             Sudo?              | 対象範囲                           | 注記                                                                                                                                     |
| ----------------- | ------------------------------------- | :----------------------------: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge    | 自動                                  |      1回（証明書＋hosts）      | 9つのIDEエージェント               | デフォルトで有効                                                                                                                         |
| 2. カスタムホスト | ホストごとに入力                      |     必要（hostsファイル）      | そのホストを使用するすべてのアプリ | DBに永続化                                                                                                                               |
| 3. HTTP_PROXY     | `export HTTPS_PROXY=...`              |              不要              | 環境変数を尊重するアプリ           | ポート8080、デフォルトではTLS復号なし                                                                                                    |
| 4. システム全体   | 切り替えて確認                        |              必要              | マシン上のすべてのアプリ           | 30分後に自動無効化                                                                                                                       |
| 5. TPROXY復号     | 切り替え（Linux＋ネイティブアドオン） | 必要（root＋CAのインストール） | 対象ポート上の任意のホスト         | 任意のホストを復号。デフォルトでは無効 — `docs/security/MITM-TPROXY-DECRYPT.md` を参照（git上に存在し、`/docs`にはコンパイルされません） |

---

## §3 UI

### 3.1 レイアウト

```
┌─ トラフィックインスペクター ────────────────────────────────────────────┐
│ ┌─ キャプチャソースツールバー ──────────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ カスタムホスト (3)]  [○ HTTP_PROXY]  [○ システム]│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ フィルター／コントロールバー ───────────────────────────────────┐   │
│ │ プロファイル: (●) LLMのみ  (○) カスタム  (○) すべて              │   │
│ │ [⎉ 一時停止] [🗑 クリア] [⬇ .har] [● セッション記録] ● ライブ 482/1k│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ リクエスト一覧（サイズ変更可能） ║ 詳細ペイン                           ▲ │
│ ────────────────────────────── │ ║ [会話][ヘッダー][リクエスト]        │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [レスポンス][タイミング][LLM][統計]  │ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 カスタム ║                                     │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 リクエスト一覧（左パネル）

- **仮想化**（`useVirtualList` + `ResizeObserver`）：フリーズすることなく1000件の項目を処理
- **自動スクロール**：調査中に一時停止できる切り替え機能付き
- **ステータスの色分け**：緑（2xx）、黄（3xx）、赤（4xx/5xx）、グレー（処理中）
- **エージェント絵文字**：🔵 Antigravity、🟢 Copilot、🟠 Kiro、🟣 Codex、🔷 Cursor、🟤 Zed、🟡 Claude Code、⚫ Open Code、🌐 カスタムホスト
- **コンテキストカラーバー**：`contextKey`（システムプロンプトのSHA-256）に基づいて色分けされた1pxの左境界線 — 関連する会話を視覚的にグループ化
- **本文の遅延読み込み**：選択されたリクエストの本文のみを詳細タブで実体化（1000 × 1MBの本文がレンダリングされるのを回避）

### 3.3 詳細ペイン — 7つのタブ

| タブ           | 内容                                                                         | 備考                                                                                             |
| -------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **会話**       | マルチターンのチャットバブル（system/user/assistant + tool_use/tool_result） | あらゆるプロバイダー形式から正規化。`detectedKind === "llm"`の場合のみ表示                       |
| **ヘッダー**   | リクエストおよびレスポンスのヘッダーテーブル                                 | 機密ヘッダー（Authorization、Cookie、api-key）はデフォルトでマスク。「シークレットを表示」で切替 |
| **リクエスト** | 生の本文、JSONツリービュー、モデルフィールドのバッジ                         | 整形済みJSONまたは生テキスト                                                                     |
| **レスポンス** | 生の本文またはSSEイベント一覧。「Raw ↔ Merged」切り替え                      | SSEマージャーが差分イベントから最終メッセージを再構築                                            |
| **タイミング** | ウォーターフォール：プロキシーのオーバーヘッド対アップストリームのレイテンシ | 合計、TTFB、サイズ                                                                               |
| **LLM詳細**    | プロバイダー、モデル、メッセージ数、入出力トークン、推定コスト、マッピング先 | LLMリクエストの場合のみ表示                                                                      |
| **統計**       | Recharts：レイテンシのタイムライン、トークン棒グラフ、ツール呼び出し散布図   | 記録済みセッションが読み込まれている場合のみ表示                                                 |

### 3.4 ツールバーのコントロール

| コントロール           | アクション                                                                |
| ---------------------- | ------------------------------------------------------------------------- |
| ⎉ 一時停止             | 新しいリクエストのレンダリングを停止。「X件の新着」バッジに件数が蓄積     |
| 🗑 クリア               | UI一覧をクリア（サーバーバッファには影響しない）                          |
| ⬇ .harをエクスポート   | 現在フィルターされている一覧をHARファイルとしてダウンロード               |
| ● セッションを記録     | 名前付き記録セッションを開始                                              |
| プロファイル選択       | LLMのみ / カスタムホスト / すべて                                         |
| ホストフィルター       | `host`フィールドの部分文字列一致                                          |
| エージェントフィルター | ドロップダウン：すべて / エージェント別                                   |
| ステータスフィルター   | すべて / 2xx / 3xx / 4xx / 5xx / エラー                                   |
| ソースフィルター       | すべて / agent-bridge / custom-host / http-proxy / system-proxy / tproxy  |
| **ライブ**フィルター   | 処理中（オープン）のリクエストのみを表示 — `liveOnly`切り替え（§4.6参照） |

### 3.5 サイズ変更可能なパネル

- 一覧と詳細ペインをドラッグハンドルで分割
- 一覧の幅：最小280px、最大720px。`localStorage`（`inspector.listWidth`）に永続化
- 48pxのレール（アイコンのみ）に折りたたみ可能。レール内の行をクリックすると展開

---

## §4 LLM対応機能

### 4.1 種別検出器（`src/mitm/inspector/kindDetector.ts`）

4つのシグナルを使用して、各リクエストを `"llm"`、`"app"`、または `"unknown"` に分類します。

1. **ホストレジストリ** — 約18の既知のLLM APIホスト名（OpenAI、Anthropic、Gemini、Groq、Mistral、Together、Fireworks、Cohere、Perplexity、Hugging Face、OpenRouter、xAI、Moonshotなど）
2. **パスパターン** — `/v1/chat/completions`、`/v1/messages`、`/generateContent`、`/v1/responses`など
3. **ボディ構造** — `messages[]`（OpenAI/Claude）、`contents[]`（Gemini）、`prompt`、`input`フィールドを検出
4. **ユーザーエージェントのヒント** — UA文字列内の`codex`、`claude`、`gemini`、`antigravity`、`kiro`、`copilot`、`cursor`

モード2で追加されたカスタムホストは、フォーム入力から`kind`を継承します（デフォルトは`"custom"`）。

### 4.2 SSEマージャー（`src/mitm/inspector/sseMerger.ts`）

**独立したクリーンルーム実装です。** イベント解析は
[WHATWGのServer-Sent Eventsアルゴリズム](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream)
に従い、再構築は公開されている[OpenAI](https://platform.openai.com/docs/api-reference/chat/create)、
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming)、および
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent)
のストリーミングスキーマに従います。

生のSSE差分イベントから、最終的なアシスタントメッセージを再構築します。

- **Anthropic**: インデックスごとに`content_block_delta`を蓄積し、`text_delta`、`input_json_delta`（ツール呼び出し）、`thinking_delta`を処理
- **OpenAI**: Chat Completionsのchoices／ツール呼び出し、およびResponses APIの出力項目をインデックスごとに蓄積
- **Gemini**: `candidates[i].content.parts`を蓄積
- **不明**: 生のイベントをそのまま返す

Responseタブには、**「生イベント ↔ マージ済み」**の切り替えが表示されます。

### 4.3 会話ノーマライザー（`src/mitm/inspector/conversationNormalizer.ts`）

**独立したクリーンルーム実装です。** 正規化は、ローカルのブラックボックス契約と、公開されているOpenAI、Anthropic、Geminiのメッセージスキーマによって定義されています。上流の
実装ソースは使用していません。

OpenAI、Anthropic、Geminiのメッセージ形式を、レンダリング前に単一の`NormalizedConversation`へ変換します。

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // リクエストボディのmessages / contents / prompt
  response: NormalizedTurn[]; // アシスタントの応答（sseMergerによってマージ）
  contextKey: string | null; // システムプロンプトのSHA-256フィンガープリント
}
```

ブロック種別は`text`、`tool_use`、`tool_result`です。Conversationタブは、プロバイダーに関係なくこの形式を使用します。

### 4.4 コンテキストキーの色分け（`src/mitm/inspector/contextKey.ts`）

- システムプロンプト（最初の`role:system`メッセージ、`system`フィールド、またはGeminiの`systemInstruction`）の`SHA-256`を計算
- 12文字の16進数プレフィックス（`"a3f9c2..."`）を返す
- フロントエンドがキーを決定論的なHSLカラーにマッピングし、左側のボーダーバーに使用
- **「同じコンテキスト」フィルター**: `ctx #a3f`チップをクリックすると、同じフィンガープリントを持つリクエストのみを表示するフィルターを追加

これにより、同じエージェントセッション内で実行されている異なる「ペルソナ」やタスクを視覚的に簡単に区別できます。

### 4.5 LLMメタデータの抽出

LLMリクエストの場合、LLM Detailsタブは以下を抽出します。

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // リクエストボディまたはレスポンスから取得
  messages: number; // ターン数
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // SSEレスポンスの場合はtrue
  mappedTo: string | null; // x-omniroute-mappedヘッダー
  costEstimateUsd: number | null; // OmniRouteの料金に基づく推定コスト
}
```

### 4.6 処理中リクエストのライブフィルター

リクエストの`status`フィールドは`number | "in-flight" | "error"`です。リクエストが開始した瞬間に
`"in-flight"`としてエントリが追加され、レスポンス（またはエラー）が到着すると**その場で更新**
されます。ツールバーの**「ライブ」**切り替え
（`liveOnly`、i18nキー`trafficInspector.liveOnly`）は、リストを
`status === "in-flight"`のエントリに限定し、開いている接続をリアルタイムで監視できるようにします。

このフィルターは、
`src/lib/inspector/matchesTrafficFilter.ts`内の純粋なクライアント側述語です。

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

切り替え状態は`useTrafficFilters`（インスペクターダッシュボードのフック）内に保持され、
他のフィルター（プロファイル、ホスト、エージェント、ソース、ステータス、コンテキスト）と組み合わせて使用されます。

### 4.7 プロセス属性の特定（Linux）

Linuxでは、インターセプトされた各リクエストを**発信元のローカル
プロセス**に関連付けることができます。`InterceptedRequest`に2つのオプションフィールドが追加されます。

```ts
pid?: number;          // 発信元プロセスID（Linuxのみ）
processName?: string;  // 発信元プロセス名（Linuxのみ）
```

`src/mitm/inspector/processAttribution.ts`は、接続の_クライアント側_
エフェメラルポートを、次の手順でPIDと名前にマッピングします。

1. `/proc/net/tcp`および`/proc/net/tcp6`を読み取り、
   ポートのソケットinodeを検索します（`parseProcNetTcpForInode`は、フィクスチャでテスト可能な純粋なパーサーです）。
2. `/proc/<pid>/fd/`をスキャンし、`socket:[<inode>]`へのシンボリックリンクを検索します。
3. `/proc/<pid>/comm`からプロセス名を読み取ります。

1秒のTTLキャッシュにより、高負荷時のprocfsスキャンコストを抑えます。属性の特定は
**ベストエフォート**です。どのような失敗でも`null`に解決され、キャプチャをブロックすることはありません。
macOS/Windowsでは、この関数は`null`を返します（スタブ。`lsof`／`GetExtendedTcpTable`
のサポートは今後の対応です）。

---

## §5 セッション

### 5.1 セッションの記録

1. ツールバーの **「● セッションを記録」** をクリック → 名前を入力（任意）
2. ライブテールは通常どおり続行され、赤く点滅するインジケーターに `◉ REC · <name> · 00:42 · 23件のリクエスト` と表示されます
3. **「⏹ 停止」** をクリック → セッションのスナップショットが `inspector_sessions` + `inspector_session_requests` に保存されます

### 5.2 記録済みセッションの表示

ツールバーの **セッション** ドロップダウンには、保存済みのセッションが一覧表示されます。いずれかを選択すると、以下のようになります。

- セッションのスナップショット（凍結された状態）が読み込まれます
- バナーに `記録済みセッション「<name>」を表示中 — [ライブに戻る]` と表示されます
- Recharts による集計を表示する「統計」タブが使用可能になります

### 5.3 エクスポート形式

各セッションは、以下の形式でエクスポートできます。

| 形式                       | 用途                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **HAR** (HTTP Archive 1.2) | Chrome DevTools、Charles、Fiddler と互換性があり、オフライン分析用にインポート可能 |
| **JSONL**                  | 1行につき1つの `InterceptedRequest` — `llm-interceptor` 形式と互換性あり           |

`GET /api/tools/traffic-inspector/sessions/{id}/export.har`、または「セッション」ドロップダウンの ⬇ ボタンからエクスポートできます。

---

## §6 セキュリティ

Traffic Inspector には、認証ヘッダーやリクエスト本文を含む、**傍受されたすべての HTTPS トラフィック**が表示されます。以下の制御が実装されています。

| 制御                         | 詳細                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**               | すべてのルートと WebSocket エンドポイントはループバックからのみアクセス可能です（認証前に `routeGuard.ts` で適用）                                                        |
| **シークレットのマスキング** | 線形 `maskSecret()` スキャナーにより、RFC 6750 Bearer 認証情報、プロバイダー接頭辞付きキー、長い不透明トークンが `TrafficBuffer.push()` の前に秘匿化されます              |
| **本文サイズの上限**         | `INSPECTOR_MAX_BODY_KB`（デフォルトは 1024 KB）を超える本文は、`「(パフォーマンスのため切り詰められました)」` という通知とともに切り詰められます                          |
| **ヘッダーのサニタイズ**     | 名前は小文字化され、フレーミング／ホップバイホップおよびプロキシ認証ヘッダーは削除され、Cookie は完全に秘匿化されます。認証情報の値の処理は `maskSecret()` に委譲されます |
| **CSP**                      | 挿入されたレスポンス本文を介した XSS を防止するため、Traffic Inspector ページに厳格な Content Security Policy が適用されます                                              |
| **デフォルトでは永続化なし** | `TrafficBuffer` はメモリ内にのみ保持され、サーバーの再起動時に失われます。セッションは明示的に記録した場合にのみ永続化されます                                            |

### 適用される厳格なルール

| ルール                            | 適用内容                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Traffic Inspector ルートからのすべての HTTP エラーレスポンスがサニタイズされます               |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` は LOCAL_ONLY + SPAWN_CAPABLE です（システムプロキシコマンド） |

### 既知の制限事項

- **システム全体のプロキシモード**は、VPN クライアントや SSO を含め、マシン上のすべてのアプリケーションに影響します。必ず自動無効化タイマーと併用してください。共有マシンでは使用しないでください。
- **CONNECT トンネル HTTPS**：TLS インターセプトが有効でない限り、モード3（HTTP_PROXY）では HTTPS 接続先のトンネルメタデータのみをキャプチャします。これは仕様です。AgentBridge 証明書が信頼されていない状態で透過的にキャプチャすると、それらのアプリケーションの TLS 検証が失敗するためです。
- **一部のコンポーネント内のハードコードされた文字列**：一部の UI コンポーネント（F7/F8）には、まだ i18n キーでカバーされていないハードコード文字列が少数あります。これらは i18n ギャップレポートで既知の制限事項として文書化されており、後続の対応で移行される予定です。対象となる文字列は UI の装飾的なラベルであり、機能上の使用に翻訳は必要ありません。

---

## §7 トラブルシューティング

### WebSocket の切断

ライブテールに「Disconnected」と表示される場合：

1. サーバーがまだ稼働していることを確認します：`GET /api/tools/traffic-inspector/capture-modes`
2. ページを再読み込みします。WebSocket が再接続され、新しいスナップショットを受信します
3. サーバーが再起動された場合、インメモリバッファーはクリアされています。セッションが記録されていない限り、古いエントリは失われています

### ポート 8080 の競合

HTTP_PROXY モードを起動できない場合：

```bash
lsof -i :8080    # プロセスを特定
```

ポートを変更します：

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### システムプロキシが元に戻らない

システム全体のプロキシモードが有効な状態で OmniRoute がクラッシュした場合：

**macOS：**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux（GNOME）：**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows：**

```cmd
netsh winhttp reset proxy
```

次回の読み込み時に、DB の状態からプロキシが有効だったことを検出すると、ダッシュボードにも「Revert system proxy」が表示されます。

### バッファーが満杯

バッファーが `INSPECTOR_BUFFER_SIZE`（デフォルトは 1000）に達すると、新しいエントリの追加に伴って最も古いエントリが削除されます。重要なリクエストが失われる場合：

- `INSPECTOR_BUFFER_SIZE` を増やします（例：5000）。メモリ使用量と引き換えに保持件数が増えます
- セッションを記録し、該当する期間を DB に永続化します

---

## §8 API リファレンス

すべてのルートは `LOCAL_ONLY`（ループバック限定）かつ `SPAWN_CAPABLE`（システムプロキシコマンド）です。`src/server/authz/routeGuard.ts` を参照してください。

ベースパス：`/api/tools/traffic-inspector/`

### リクエスト管理

| メソッド | パス                        | 説明                                                                                     |
| -------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| GET      | `/requests`                 | リクエスト一覧（フィルター可能：`?profile=llm&host=&agent=&status=&source=&sessionId=`） |
| GET      | `/requests/{id}`            | 単一リクエストの詳細                                                                     |
| DELETE   | `/requests`                 | インメモリバッファーをクリア                                                             |
| POST     | `/requests/{id}/replay`     | OmniRoute ルーター経由で同じリクエストを再実行                                           |
| PUT      | `/requests/{id}/annotation` | リクエストのメモを保存または更新                                                         |

### WebSocket

| メソッド | パス  | 説明                                                                                                    |
| -------- | ----- | ------------------------------------------------------------------------------------------------------- |
| GET      | `/ws` | ライブ WebSocket ストリーム。接続時に `snapshot` を送信し、その後 `new`/`update`/`clear` イベントを送信 |

### エクスポート

| メソッド | パス          | 説明                                                    |
| -------- | ------------- | ------------------------------------------------------- |
| GET      | `/export.har` | 現在のフィルター済みリストを HAR 1.2 としてエクスポート |

### カスタムホスト

| メソッド | パス            | 説明                                    |
| -------- | --------------- | --------------------------------------- |
| GET      | `/hosts`        | カスタムホストの一覧                    |
| POST     | `/hosts`        | ホストを追加（`/etc/hosts` を自動編集） |
| DELETE   | `/hosts/{host}` | ホストを削除                            |
| PATCH    | `/hosts/{host}` | `enabled` を切り替え                    |

### キャプチャーモード

| メソッド | パス                           | 説明                                                                                                  |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| GET      | `/capture-modes`               | AgentBridge / カスタムホスト / HTTP_PROXY / システムプロキシの各モードと `tls-intercept` トグルの状態 |
| POST     | `/capture-modes/http-proxy`    | HTTP_PROXY リスナーを起動／停止（`{action: "start"\|"stop"}`）                                        |
| POST     | `/capture-modes/system-proxy`  | システム全体のプロキシを適用／解除（`{action: "apply"\|"revert"}`）                                   |
| POST     | `/capture-modes/tls-intercept` | プロキシモードで HTTPS ボディーの復号を切り替え（`{enabled: boolean}`）                               |

> **TPROXY 復号**（キャプチャーモード 5）は、AgentBridge プレフィックス配下の
> **別個の**ルート（`GET / POST / DELETE /api/tools/agent-bridge/tproxy`）によって制御され、
> `/api/tools/traffic-inspector/` 配下にはありません。
> `docs/security/MITM-TPROXY-DECRYPT.md`（git 内。`/docs` にはコンパイルされません）を参照してください。

### セッション

| メソッド | パス                        | 説明                                                                |
| -------- | --------------------------- | ------------------------------------------------------------------- |
| POST     | `/sessions`                 | 記録を開始（`{name?: string}`）                                     |
| PATCH    | `/sessions/{id}`            | 停止または名前を変更（`{action: "stop"\|"rename", name?: string}`） |
| GET      | `/sessions`                 | 保存済みの全セッションを一覧表示                                    |
| GET      | `/sessions/{id}`            | セッションのスナップショット（全リクエスト）                        |
| DELETE   | `/sessions/{id}`            | セッションを削除                                                    |
| GET      | `/sessions/{id}/export.har` | セッションを HAR 1.2 としてエクスポート                             |

### 内部取り込み（D4 フォールバック）

| メソッド | パス               | 説明                                                                                                                                |
| -------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| POST     | `/internal/ingest` | `server.cjs` のパススルーパスからインターセプトされたリクエストを受け入れます。`INSPECTOR_INTERNAL_INGEST_TOKEN` ヘッダーが必要です |

完全な OpenAPI スキーマ：`docs/openapi.yaml` → タグ `Traffic Inspector`。
