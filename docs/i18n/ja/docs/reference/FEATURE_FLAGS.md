# Feature Flags (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> 再デプロイ**なしで** OmniRoute の動作を変更するランタイムトグル。
> ここに記載されているすべてのフラグは、
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> で定義されています。
> このファイルが唯一の信頼できる情報源です。ダッシュボードと REST API はどちらも
> このファイルを参照するため、以下の表は内容が 1:1 で一致するように生成されています。

---

## 機能フラグとは

機能フラグは、実行時に値を変更してデータベースに永続化できる、名前付きのトグル（boolean または enum）です。プロセスを再デプロイする必要はありません。各フラグは、`key`、`label`、
`description`、`category`、`defaultValue`、`type`、および `requiresRestart` ヒントを持つ `FeatureFlagDefinition` によって記述されます。

### 解決順序

フラグの**実効値**は、
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) によって、以下の優先順位で解決されます（上位が優先されます）。

1. **DB オーバーライド** — `feature_flags` 名前空間の `key_value` テーブルに保存されている値（ダッシュボードまたは REST API 経由で設定）。
2. **環境変数** — 設定されていて空でない場合の `process.env[<KEY>]`。
3. **定義のデフォルト値** — `featureFlagDefinitions.ts` の `defaultValue`。

boolean フラグは、実効値が `"true"`、`"1"`、または `"yes"` の場合に**有効**とみなされます（`isFeatureFlagEnabled()` を参照）。

> [!NOTE]
> ほとんどのフラグには、[`ENVIRONMENT.md`](./ENVIRONMENT.md) に記載されている、**同じ名前**の対応する環境変数もあります。フラグの DB オーバーライドは、その環境変数よりも優先されます。
> `requiresRestart: true` のフラグはすぐに永続化されますが、プロセス起動時にのみ再読み込みされます。このフラグを切り替えると、ダッシュボードに **「サーバーを再起動」**バナーが表示されます。

---

## フラグカタログ

6つのカテゴリにわたる75個のフラグ。**デフォルト**は定義上のデフォルト値です。DBによるオーバーライドも環境変数も存在しない場合に使用される値です。

### セキュリティ (10)

| キー                                    | 型      | デフォルト | 説明                                                                                                                                                                                                                                                                             |
| --------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`    | すべての受信リクエストにAPIキーを必須とします。                                                                                                                                                                                                                                  |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`     | すべてのリクエストに対する入力サニタイズを有効にします。                                                                                                                                                                                                                         |
| `INJECTION_GUARD_MODE`                  | enum    | `off`      | プロンプトインジェクションガードのモードです。値: `off`、`warn`、`block`、`redact`。                                                                                                                                                                                             |
| `PII_REDACTION_ENABLED`                 | boolean | `false`    | リクエストからPIIを秘匿化します（`INPUT_SANITIZER_MODE`とは独立しています）。                                                                                                                                                                                                    |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`    | プロバイダーのレスポンスからPIIをサニタイズします。                                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact`   | PIIレスポンスのサニタイズモードです。値: `redact`、`warn`、`block`、`off`。                                                                                                                                                                                                      |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`     | プライベート／内部IP範囲への送信リクエストをブロックします。                                                                                                                                                                                                                     |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`    | 認証済みのダッシュボードユーザーが、マスクされた値だけでなく、保存済みのAPIキーを表示できるようにします。                                                                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`    | AUTHログ行にアカウントのプレフィックスを含めます（例:「<provider>アカウントを使用中: abc12345...」）。共有／マルチテナントのプロセスログからアカウント識別子を秘匿するため、デフォルトでは無効です。デバッグモードとは独立しており、デバッグモードを切り替えても表示されません。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`    | OIDCが有効な場合にパスワードログインを無効にし、ユーザーがOIDCシングルサインオン経由でのみ認証できるようにします。無効な場合（デフォルト）は、パスワードログインとOIDCの両方を利用できます。                                                                                     |

### ネットワーク (17)

| キー                                            | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------- | ------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓      | TLS フィンガープリントのステルスモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |        | /v1/audio/* ルートが、localhost 外でホストされている OpenAI 互換プロバイダーノードを使用できるようにします。デフォルトでは無効です。音声をリモートホストにルーティングすると送信元 ID が変わるため、オペレーターが明示的に決定する必要があります。ループバックノードは常に許可され、この設定の影響を受けません。                                                                                                                                                                                                     |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |        | POST /v1/rerank（およびメモリエンジンのループバック再ランキングステップ）が、localhost 外でホストされている OpenAI 互換プロバイダーノードを使用できるようにします。デフォルトでは無効です。リモートホストへのルーティングは送信元 ID を変更するため、オペレーターが明示的に決定する必要があります。ループバックノードは常に許可されます。リモートノードは、プロバイダーの送信 URL ポリシーにも合格する必要があります。                                                                                               |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |        | 接続にプロキシが割り当てられていない場合、レジストリから最初に動作するプロキシを自動選択します。デフォルトでは無効です（有効にすると、レジストリ内の任意のプロキシがグローバルフォールバックになるためです — #3332）。                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |        | プロキシ到達可能性の事前チェックに失敗した場合、OAuth およびプロバイダー検証フローが固定されたプロキシを迂回して直接接続できるようにします。送信元 IP が変わる可能性があるため、デフォルトでは無効です。                                                                                                                                                                                                                                                                                                             |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |        | 複数アカウントのローテーションエグゼキューターでネットワーク例外（タイムアウト、接続拒否／リセット）が発生し、失敗したアカウントに専用プロキシがない場合、各アカウントを再試行する代わりに短時間のクールダウンを適用し、そのリクエストの残りの処理ではプロキシのない他のアカウントをスキップします。デフォルトで有効です（安全性：送信元 IP は変更されず、共有送信元アカウントでのレイテンシー／クールダウンのリスクを軽減するだけです）。最初のプロキシなしの例外を即座に伝播する従来の動作に戻すには無効にします。 |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`    |        | プロキシプールと opencode のアカウント単位のローテーションで、直前に失敗したプロキシ（TCP プローブが拒否された、またはそのプロキシ経由で 429 を受信したもの）を、失敗のたびに倍増して上限に達するプロセス単位の期間、再提供しないようにします。プロキシのステータスは書き込まれません。すべての候補が除外された場合、選択は変更されません。デフォルトでは無効です。                                                                                                                                                  |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |        | ダッシュボードのプロキシプール配下に、過去 24 h にそのメンバーを処理した観測済み送信元 IP の数と、それらを使用した接続数を表示します。読み取り専用であり、プロキシログから算出され、ルーティングには使用されません。デフォルトでは無効です。                                                                                                                                                                                                                                                                         |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |        | OpenCode エグゼキューターで、ストリーミングされた Responses 応答の最初のボディバイトを監視します（時間枠：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`、デフォルト `15000`）。時間枠を過ぎても無応答のままの 2xx Responses ストリームは停止状態と見なされ、アカウントがクールダウンされてリクエストが次のアカウントへ一度だけローテーションされます。2 回目の停止では即座に失敗します。デフォルトでは無効です。停止したストリームは、現在の動作どおりストリーム準備タイムアウトまで待機し続けます。                             |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |        | OpenCode エグゼキューター: `user_blocked` による拒否を含む 403/451（地域制限や Cloudflare フィンガープリントによる拒否ではない場合）を受け取ると、拒否されたアカウントをクールダウンし、リクエストごとに最大 1 回だけ次のアカウントへローテーションします。2 回目の拒否は成功としてマークせず、そのまま返されます。デフォルトでは無効です。上流のユーザーブロックを回避するルーティングは、回避行為と見なされ、フリート全体にフラグが波及する可能性があります。                                                      |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |        | OpenCode ローテーション: 上流で一時的な障害（5xx または空の 400）が 2 回連続して発生した場合、次のアカウントへ移る前に一時停止します。待機時間は 1.5 秒から始まり、障害が続くたびに倍増しますが、1 回の一時停止につき最大 6 秒、1 リクエストにつき合計最大 10 秒です。クライアントが切断した場合は待機をスキップし、待機前に失敗したレスポンス本文を解放します。デフォルトでは無効です。フェイルオーバーは即時のままです。                                                                                           |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false`    |        | OpenCode ローテーション: 一時的な 429 が繰り返された場合（または新しいプール逼迫マーカーがある場合）、ハートビートを維持しながらリクエストを保留し、フリート全体へ展開する代わりに、最大 3 つのアカウントを順番に試す、上限付きの 1 回の処理区間を再実行します。デフォルトでは無効です。従来どおり、429 が発生するたびに次のアカウントへローテーションします。                                                                                                                                                       |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |        | OpenCode ローテーション: 実際のレート制限（解析可能な `Retry-After`、またはレート／使用量制限を示す本文）として分類された最初の 429 でアカウントの処理を停止し、その上流の 429 を変更せずに返します。分類されなかった 429 ではローテーションを続行します。デフォルトでは無効です。無料枠は送信元 IP ごとに制限されるため（#9611）、すべての 429 でローテーションし、すべてのアカウントを試し終えた場合は最後の上流 429 を返します。                                                                                  |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓      | MITM プロキシの TLS 証明書検証を無効にします。**危険です。**                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |        | プライベート／内部ネットワークを指すプロバイダー URL を許可します。                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |        | ローカル／プライベートアドレス（127.0.0.1、localhost、LAN）上のプロバイダーの追加／検証を許可します。デフォルトで有効です（ローカル優先）。公開アドレスのみを厳格に許可する場合は無効にしてください。クラウドメタデータへのアクセスは引き続きブロックされます。                                                                                                                                                                                                                                                      |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓      | Claude Code 互換プロバイダーモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### ポリシー（5）

| キー                            | 型      | デフォルト | 説明                                                                                                                                                                                                                           |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | ツール使用ポリシーの適用モード。値: `disabled`、`warn`、`block`。                                                                                                                                                              |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 使用パターンに基づいてレート制限を自動的に有効化します。                                                                                                                                                                       |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 単一モデルへの直接リクエストに対する OmniRoute のローカルなコンテキストウィンドウ / 最大入力トークンのチェックをスキップします。アップストリームの制限は引き続き適用されます。                                                 |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 対象モデルに必要な機能（ビジョン、ツール、構造化出力、コンテキストウィンドウ）がない場合、ディスパッチ前にリクエストを拒否します。コンボレイヤーの互換性フィルターを迂回する、単一プロバイダーへの直接リクエストを保護します。 |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar モジュール（カタログフィード画面および同期）を有効化します。デフォルトでは無効です。有効化しても UI が利用可能になるだけで、データ同期には別途オプトインが必要です。                                           |

### ランタイム (33)

| キー                                        | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | ------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`     |        | コンボルーティングでモデルが切り替わる際に、会話の要約を生成して挿入します。無効にすると、モデルの切り替えを個別に扱い、既存および今後作成されるすべてのコンボについて、バックグラウンドでの引き継ぎリクエストを防止します。                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`     |        | Responses API のパススルーストリームから内部の commentary フェーズの出力項目を削除してから、クライアントに転送します。無効にすると、未加工のアップストリーム commentary を受信します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`     |        | MCP ツールへのアクセスにスコープ制限を適用します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`    |        | トークン使用量を削減するため、MCP ツールの説明を圧縮します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`    |        | 実行時のバックグラウンドタスク処理を有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`    | ✓      | すべてのバックグラウンドサービス（クォータの更新、同期など）を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |        | プロジェクトレベルの RTK フィルターを検証せずに信頼します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓      | インポート時にリアルタイムダッシュボードの WebSocket サーバーを起動します（デフォルトではポート 20132）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |        | Codex が Responses-over-WebSocket トランスポートを使用できるようにします。無効の場合、Codex は HTTP Responses にフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |        | Codex がローカル app-server WebSocket JSON-RPC トランスポート（codexTransport=app-server）を使用できるようにします。無効の場合、app-server の使用を選択した接続は Codex の他のトランスポートにフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |        | 予算を使い切ったリクエストを、緊急用の無料フォールバックプロバイダー／モデルにルーティングします。（以下の[緊急予算フォールバック](#emergency-budget-fallback)を参照してください。）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |        | レスポンスのバイトがクライアントに到達する前に、途中で切断されたアップストリーム SSE ストリームを透過的に早期再試行できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |        | バイトがすでにクライアントに到達した後でも、再リクエストを行ってレスポンスを結合することでストリームを復旧できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |        | ストリーム途中の継続処理をツール呼び出しに対して安全にします。ツール呼び出しが送信された場合（実行中、または finish_reason が tool_calls の状態ですでに完了している場合）、切断されたストリームを再開しません。また、継続結果が一度空だった時点で、予算をすべて費やすことなく終了します。無効の場合はリリース版の動作になります。                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |        | SSE ストリームが有用なフレームを一つも送出せずに終了し、同一接続での回数制限付き再試行を使い切った場合、兄弟接続へ一度フェイルオーバーします。利用可能な兄弟接続がない場合は、元の `STREAM_EARLY_EOF` 502 が返されます。デフォルトではオフです。同一接続での再試行後も early-EOF は終端エラーとして扱われます。                                                                                                                                                                                                                                                                                                                                                                            |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |        | `/v1/models` のレスポンスに、表示用のわかりやすい名前フィールドを含めます。モデル ID のみを想定するクライアントでは無効にしてください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |        | /v1/models でモデル ID に付けるプレフィックスを制御します。'dual'（デフォルト）は、後方互換性のためにエイリアスと正規プロバイダー ID の両方のプレフィックスを出力します。'alias' は短いエイリアスプレフィックスのみを出力します（例: deepseek-web/model ではなく ds-web/model）。'canonical' は完全なプロバイダー ID のプレフィックスのみを出力します。値: `dual`、`alias`、`canonical`。                                                                                                                                                                                                                                                                                                  |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |        | モデルのインテリジェンスランキング用に、Arena AI リーダーボードの ELO を定期的に同期します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |        | `/v1/models` で `claude/<provider>/<model>` ミラー ID を公開し、Claude Code ゲートウェイのモデル検出で Claude 以外のモデルも一覧表示されるようにします。3 段階ゲートのグローバルレベルです（環境変数がダッシュボードのオーバーライドより優先されます）。[Claude Code の設定](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)を参照してください。                                                                                                                                                                                                                                                                                  |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |        | no-think/<provider>/<model> ゲートウェイエイリアスのマスタースイッチです。オン（デフォルト）の場合、/v1/models は対象となる思考対応 Claude モデルごとに非思考バリアントを公開し、リクエストで送信された no-think/ ID は、推論を抑制した状態で実際のモデルへ解決されます。オフの場合、バリアントは公開されず、no-think/ ID は他の不明なモデル ID と同様に扱われます。オンの場合でも、モデルごとの ModelSpec.noThinkingAlias によるオプトイン／オプトアウトが適用されます。                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |        | /v1/models カタログでの思考レベルバリアント（例: -low、-medium、-high）の生成を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓      | プロバイダーへのディスパッチに、テナントごとの適応型仮想アドミッションレーンを有効にします（#9654）。これにより、あるテナントのバーストが原因で別のテナントに 503 が返されることがなくなります。環境変数 OMNIROUTE_CHAT_VIRTUAL_LANES は、このダッシュボードのオーバーライドより優先されます。変更はサーバーの再起動時に反映されます。                                                                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |        | 正規の所有者に有効な認証情報がないものの、有効な認証情報を持つパススルーゲートウェイによってルーティングされるモデルについて、<gateway-alias>/<model> ミラー ID を /v1/models で公開します。警告: グローバルに有効にすると、すべてのクライアント向けにカタログエントリが追加されます。                                                                                                                                                                                                                                                                                                                                                                                                     |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |        | New-API / One-API / Sub2API アグリゲーター互換ノードの残高検出を有効にします。有効にすると、アグリゲーターフラグが設定された互換ノードの残高がダッシュボードおよびクォータ事前チェックルーティングに表示されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |        | モデルがクライアントで利用可能なレスポンスを返すまで、サーバー所有の非ストリーミングツール呼び出しを継続します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |        | 検索統計と最近の検索では、現在も有効な接続を持つプロバイダーのみをカウントします（duckduckgo-free のようなキー不要のプロバイダーは常にカウントされます）。無効の場合、プロバイダー ID を持つ保持済みの検索行をすべて維持します。                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |        | ダッシュボードのプロバイダーページ: プロバイダーが対応していることを示すシグナルに対してのみ「無料」バッジを表示します。文書化された無料枠がない登録済みプロバイダーについては、表示名による推測、boolean 以外の無料フィールド、および :free サフィックスを使用しません。無効の場合、従来のバッジ判定ルールを維持します。                                                                                                                                                                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |        | 集約された 429/503 利用不可レスポンスにおいて、具体的な将来の再試行時刻が不明な場合は、人工的な 1 秒を設定する代わりに `Retry-After` を省略し、`error.retry_after_provenance`（`signal` \| `none`）を追加します。また、コンボのドレインパスが JSON およびプレーンテキストのアップストリーム本文から、文章形式の再試行ヒントを読み取れるようにします。このフィールドは `unavailableResponse()` によって生成されたレスポンスにのみ表示されます。それ以外の 429/503 本文は変更されません。                                                                                                                                                                                                    |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |        | クォータ枯渇時のみフォールバックするよう指定された `priority` コンボターゲットが、クォータ以外であることが明確な原因（プロバイダーのサーキットブレーカーが開いている、予測レイテンシによるスキップ）でコンボを停止した場合、クォータ不足に見える 503 ではなく 502 を返します。ロックアウト、クールダウン、利用不可、枯渇、および同時実行数上限による停止では、引き続き 503 を返します。                                                                                                                                                                                                                                                                                                    |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |        | 単純な Mistral 401（`{"detail":"Unauthorized"}`、明示的な認証シグナルなし）は、キーが失効している場合とクォータが枯渇している場合で同一です。有効にすると、接続を `expired` として停止する代わりにクールダウンさせます。これは接続ごとに 1 時間あたり最大 3 回まで行われ、次の発生時には停止されるため、失効したキーも最終的には停止状態になります。デフォルトでは無効です。無効の場合、従来どおり、単純な Mistral 401 が発生するたびに接続を停止します。                                                                                                                                                                                                                                  |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`    |        | 固定された静的シードの代わりに、OAuth ベアラートークンを使用して `https://api.x.ai/v1/models` から `xai-oauth` 接続用の最新の xAI モデルカタログを取得します。デフォルトでは無効です。無効な場合、`xai-oauth` は静的シードを変更せずに引き続き提供します。解決エラーが発生した場合、ディスカバリーはシードにフォールバックします（このエンドポイントで x.ai が OAuth ベアラートークンを受け入れるかどうかは未検証です）。                                                                                                                                                                                                                                                                  |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |        | 自動クリーンアップ処理で、`OMNIROUTE_BATCH_RETENTION_DAYS` より古い終端状態（完了、失敗、キャンセル、期限切れ）の Batch API ジョブと、その行ごとのチェックポイントを削除し、それぞれの `expires_at` を過ぎたアップロード済みファイルの BLOB コンテンツを消去できるようにします。デフォルトでは無効です。オペレーターが明示的に有効化するまで、既存のすべてのインストール環境ではこのデータが従来どおり保持されます。オペレーターが実行する `DELETE /api/v1/batches/delete-completed` ルートは、どちらの場合も影響を受けません。これは独立した無条件の公開 API コントラクトです。                                                                                                           |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |        | 選択された Antigravity アカウントを、そのアカウントを選択したリクエストのストリーミングライフサイクル中に予約し、同時実行される再試行や認証情報の引き渡しによって、処理中のストリームにすでに割り当てられているアカウントが再選択されないようにします。予約のスコープは（接続、呼び出し可能なアップストリームモデル）であるため、1 つのアカウントで同時に 2 つの異なるモデルを処理できます。そのモデルで利用可能なすべてのアカウントがすでにリースされている場合、ビジー状態のアカウントに処理を集中させる代わりに、上限付きの `Retry-After` を伴う構造化された 503 `antigravity_pool_busy` が返されます。デフォルトでは無効です。アカウント選択は従来どおり維持され、予約は行われません。 |

### CLI（5）

| キー                                  | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                              |
| ------------------------------------- | ------- | ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓      | すべての CLI クライアントで互換モードを有効にします。                                                                                                                                                                             |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |        | モデルエイリアス互換レイヤーを有効にします。                                                                                                                                                                                      |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |        | 料金データの自動同期を有効にします（`PRICING_SYNC_ENABLED` 環境変数も必要です）。                                                                                                                                                 |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |        | プロバイダーモデルの同期後、最新のカタログに基づいて ~/.codex/*.config.toml プロファイルファイルを自動的に（再）書き込みします。アクティブ／デフォルトの Codex 設定は変更しません。デフォルトでは無効です。                       |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |        | プロバイダーモデルの同期後、最新のカタログに基づいて ~/.claude/profiles/<name>/settings.json Claude Code プロファイルを自動的に（再）書き込みします。アクティブ／デフォルトの Claude 設定は変更しません。デフォルトでは無効です。 |

### ヘルス（5）

| キー                                      | 型      | デフォルト | 説明                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | ローカルインスタンスのヘルスチェックエンドポイントを無効にします。                                                                                                                                                                                                                                                |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | トークン検証のヘルスチェックを無効にします。                                                                                                                                                                                                                                                                      |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | スキルのサンドボックス環境でネットワークアクセスを有効にします。                                                                                                                                                                                                                                                  |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | プロキシのヘルススイープで、ターゲットに拒否されたプローブ（401/403/429）が、プロキシの連続失敗回数をリセットします。デフォルトではオフです。拒否はニュートラルな状態のままになります（#10654）。5xx はどちらの場合も未確定のままです。拒否によってプロキシが削除、無効化、または再有効化されることはありません。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | 起動時の DB 整合性／ヘルスチェックを、完了まで起動をブロックする代わりに、サーバーがリクエストの受け付けを開始した後（`setImmediate` 経由）に実行します（#13717）。デフォルトではオフです。起動はこの PR より前とまったく同様にブロックされます。                                                                 |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` とその旧エイリアスである
> `INJECTION_GUARD_BLOCK_THRESHOLD` は、`INJECTION_GUARD_MODE` の `block`
> モードを調整しますが、これらは
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> によって読み取られる通常の環境変数であり、機能フラグではありません。DB による
> オーバーライドもダッシュボードの切り替えスイッチもありません。詳細は
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication) を参照してください。

> [!NOTE]
> `Restart` 列は、`requiresRestart: true` が設定されたフラグを示します。値は
> 即座に永続化されますが、プロセスの再読み込み後にのみ有効になります。列挙型の
> フラグでは、許可された値のセットに含まれない値は拒否されます（サーバー側で
> `setFeatureFlagOverride()` と REST の `PUT` ハンドラーの両方により検証されます）。

---

## フラグの切り替え

### ダッシュボード

**Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`) に移動します。グリッド
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
では、以下の操作がサポートされています。

- キーまたは説明による**検索**と、カテゴリによる**フィルタリング**（さらに、仮想的な
  **Requires Restart** ビュー）。
- boolean フラグ用の**トグル**と enum フラグ用の**ドロップダウン**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)。
- 各フラグの**ソースバッジ** — `DB`、`ENV`、または `DEF` —。有効値の
  取得元を示します。
- オーバーライドを削除するための **Reset** ボタン（ソースが `DB` のフラグにのみ表示）と、
  下部にある **Reset All Overrides** ボタン。
- `requiresRestart` フラグが変更されたときに表示される **Restart Server** バナー。

### REST API

すべての操作は単一のルートを経由します。
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)。
すべてのメソッドで認証済みのダッシュボードセッションが必要です（未認証の場合は `401`）。

#### `GET /api/settings/feature-flags`

すべてのフラグについて、有効値、ソース、およびサマリーを返します。

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... 全75個のフラグ
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

単一のオーバーライドを設定または削除します。本文: `{ key: string; value?: string }`。
`value` を省略すると、オーバーライドが削除されます（env / default に復元）。

```bash
# DB オーバーライドを設定
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# オーバーライドを削除（"value" なし）
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

レスポンスには、新しい `effectiveValue`/`source`、`previousValue`/
`previousSource`、および `requiresRestart` が返されます。不明なキーや範囲外の enum
値は `400` で拒否されます。

#### `DELETE /api/settings/feature-flags`

すべての DB オーバーライドを一度にクリアし、各フラグを env / default
値に復元します。`{ cleared: <count>, message: "..." }` を返します。

> [!NOTE]
> `requiresRestart: true` のフラグは、プロセスをリロードした後にのみ有効になります。
> ダッシュボードの再起動フローでは `POST /api/restart` を呼び出し、その後サーバーが再起動するまで
> `GET /api/health/ping` をポーリングします。

---

## 緊急予算フォールバック

`OMNIROUTE_EMERGENCY_FALLBACK`（カテゴリ `runtime`、デフォルト `true`）は、
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
の緊急無料フォールバック経路を制御します。有効な場合、予算を使い果たしたリクエストは
即座に失敗する代わりに、無料のフォールバックプロバイダー/モデルにルーティングされます。
この動作を無効にし、予算を使い果たしたリクエストを失敗させるには、ダッシュボードのトグル、
DB オーバーライド、または `OMNIROUTE_EMERGENCY_FALLBACK` 環境変数を使用して、
`false`（または `0`）に設定します。（PR #3741 / #3752 でダッシュボードのトグルとして公開。）

---

## 関連項目

- [環境変数リファレンス](./ENVIRONMENT.md) — ほとんどのフラグには、同名の環境変数が記載されています（DB のオーバーライドが優先されます）。
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — すべてのフラグの信頼できる唯一の情報源です。
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — 解決ロジック（`resolveFeatureFlag`、`isFeatureFlagEnabled`、`resolveAllFeatureFlags`）。
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — `key_value` テーブルの `feature_flags` 名前空間における DB オーバーライドの永続化処理。
