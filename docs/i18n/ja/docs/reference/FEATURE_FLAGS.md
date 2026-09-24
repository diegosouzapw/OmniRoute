# Feature Flags (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

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

6つのカテゴリにわたる77個のフラグがあります。**デフォルト**は定義上のデフォルト値です。これは、DBによる上書きも環境変数も存在しない場合に使用される値です。

### セキュリティ (10)

| Key                                     | Type    | Default  | Description                                                                                                                                                                                                                                                                                |
| :-------------------------------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | すべての受信リクエストにAPIキーを要求します。                                                                                                                                                                                                                                              |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | すべてのリクエストに対して入力サニタイズを有効にします。                                                                                                                                                                                                                                   |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | プロンプトインジェクションガードモード。値: `off`, `warn`, `block`, `redact`。                                                                                                                                                                                                             |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | リクエストからPIIを編集します（`INPUT_SANITIZER_MODE`とは独立）。                                                                                                                                                                                                                          |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | プロバイダーの応答からPIIをサニタイズします。                                                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | PII応答サニタイズのモード。値: `redact`, `warn`, `block`, `off`。                                                                                                                                                                                                                          |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | プライベート/内部IP範囲へのアウトバウンドリクエストをブロックします。                                                                                                                                                                                                                      |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | 認証されたダッシュボードユーザーが、マスクされた値を見るだけでなく、保存されたAPIキーを公開できるようにします。                                                                                                                                                                            |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | AUTHログ行にアカウントプレフィックスを含めます（例：「Using <provider> account: abc12345...」）。共有/マルチテナントプロセスログからアカウント識別子が編集されるように、デフォルトで無効になっています。デバッグモードとは独立しており、デバッグモードを切り替えてもこれは表示されません。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDCが有効な場合、パスワードログインを無効にし、ユーザーがOIDCシングルサインオン経由でのみ認証できるようにします。無効の場合（デフォルト）、パスワードログインとOIDCの両方が利用可能です。                                                                                                 |

### ネットワーク (19)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | TLSフィンガープリントステルスモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | `/v1/audio/*` ルートがlocalhost外でホストされているOpenAI互換のプロバイダーノードを使用できるようにします。デフォルトではオフです。リモートホストへのオーディオルーティングはエグレスIDを変更するため、明示的なオペレーターの決定が必要です。ループバックノードは常に許可され、影響を受けません。                                                                                                                                                                                                  |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | `POST /v1/rerank` (およびメモリエンジンのループバック再ランクステップ) がlocalhost外でホストされているOpenAI互換のプロバイダーノードを使用できるようにします。デフォルトではオフです。リモートホストへのルーティングはエグレスIDを変更するため、明示的なオペレーターの決定が必要です。ループバックノードは常に許可されます。リモートノードはプロバイダーのアウトバウンドURLポリシーも通過する必要があります。                                                                                      |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | 接続にプロキシが割り当てられていない場合、レジストリから最初に動作するプロキシを自動選択します。デフォルトではオフです（そうしないと、任意のレジストリプロキシがグローバルなフォールバックになります — #3332）。                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | プロキシの到達可能性事前チェックが失敗した場合に、OAuthおよびプロバイダー検証フローがピン留めされたプロキシをバイパスして直接接続できるようにします。エグレスIPが変更される可能性があるため、デフォルトではオフです。                                                                                                                                                                                                                                                                              |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | マルチアカウントローテーションエグゼキューターでネットワーク例外（タイムアウト、接続拒否/リセット）が発生し、失敗したアカウントに専用プロキシがない場合、短いクールダウンを適用し、各プロキシなしアカウントを再試行する代わりに、残りのリクエストでは他のプロキシなしアカウントをスキップします。デフォルトではオンです（安全：エグレスIPの変更なし、共有エグレスアカウントでの遅延/クールダウンリスクのみを軽減します）。無効にすると、最初のプロキシなしスローで即時伝播が復元されます。         |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | Opencodeローテーションは、どのサービスアカウントがサービスを提供したか、またはスキップされたか（マスクされたIDのみ、完全なアカウントIDは決してありません）を記録し、プロキシログエントリをそのリクエストにリンクするため、オペレーターはスキップされたアカウントと未使用のアカウントを区別できます。デフォルトではオフです。                                                                                                                                                                       |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |         | プロキシプールとopencodeのパーアカウントローテーションは、失敗したばかりのプロキシ（TCPプローブの拒否、またはそれを通じて受信された429）を、繰り返しごとに倍増し、上限に達するまでプロセスごとの期間、再提供するのを停止します。プロキシステータスは書き込まれません。候補が脇に置かれるたびに選択は変更されません。デフォルトではオフです。                                                                                                                                                       |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | ダッシュボードのプロキシプール配下に、過去24時間でそのメンバーにサービスを提供した観測されたエグレスIPの数と、それらを使用した接続の数を表示します。読み取り専用で、プロキシログから計算され、ルーティングには使用されません。デフォルトではオフです。                                                                                                                                                                                                                                             |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | OpenCodeエグゼキュータの場合、ストリーミングされたResponses応答の最初のボディバイトを監視します（ウィンドウ: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`、デフォルト `15000`）。ウィンドウを超えて沈黙し続ける2xx Responsesストリームは、ストールしたと見なされます。アカウントはクールダウンされ、リクエストは一度だけ次のアカウントにローテーションされます。2回目のストールは即座に失敗します。デフォルトではオフ：ストールしたストリームは、ストリームの準備完了タイムアウトまで現在の待機を維持します。 |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | OpenCodeエグゼキュータ：`user_blocked`拒否（地理的要因やCloudflareのフィンガープリント拒否ではない）を伴う403/451の場合、拒否されたアカウントをクールダウンし、リクエストごとに最大1回まで次のアカウントにローテーションします。2回目の拒否は、成功マークなしでそのまま返されます。デフォルトではオフ：アップストリームのユーザーブロックを回避するルーティングは、回避行為のように見え、フリート全体にフラグを広げる可能性があります。                                                            |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | OpenCodeローテーション：2回連続で一時的なアップストリーム障害（5xxまたは空の400）が発生した後、次のアカウントに進む前に一時停止します。それ以降の障害ごとに1.5秒ずつ倍増し、一時停止あたり6秒、リクエストあたり10秒を上限とし、クライアント切断時にはスキップされます。待機する前に、失敗したボディは解放されます。デフォルトではオフ：フェイルオーバーは即座に行われます。                                                                                                                        |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | OpenCodeローテーション：繰り返し発生する一時的な429（または新しいプール負荷マーカー）の後、ハートビートとともにリクエストをパークし、フリート全体に展開する代わりに、最大3つの連続アカウントからなる1つの制限されたレッグをリプレイします。デフォルトではオフ：すべての429は、以前とまったく同じように次のアカウントにローテーションします。                                                                                                                                                       |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | 翻訳されたストリーミングターンにおいて、アップストリームターンが利用可能なコンテンツ（推論のみの完了または価値のあるチャンクがゼロ）を伴わない場合、クライアントに何も公開される前に、通常の認証情報パスを通じて制限付きのリトライ（`STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`まで）を発行します。デフォルトではオフ：空のターンは現在の動作（空の200またはコンテンツなしの502）を維持します。                                                                                                         |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | OpenCodeローテーション：実際のレート制限（解析可能な`Retry-After`、またはレート/使用制限を名指しするボディ）として分類された最初の429でアカウントウェーブを停止し、そのアップストリーム429をそのまま返します。分類されていない429はローテーションを続けます。デフォルトではオフ：無料ティアはエグレスIPごとに制限されているため（#9611）、すべての429はローテーションし、枯渇したウェーブは最後のアップストリーム429を返します。                                                                   |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | MITMプロキシのTLS証明書検証を無効にします。**危険。**                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | プライベート/内部ネットワークを指すプロバイダーURLを許可します。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | ローカル/プライベートアドレス（127.0.0.1、localhost、LAN）でのプロバイダーの追加/検証を許可します。デフォルトではオン（ローカル優先）。厳密なパブリックのみのブロックには無効にします。クラウドメタデータはブロックされたままです。                                                                                                                                                                                                                                                                |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | Claude Code互換プロバイダーモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### ポリシー (5)

| キー                            | 型      | デフォルト | 説明                                                                                                                                                                                                                                         |
| :------------------------------ | :------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | ツール使用ポリシーの適用モード。値: `disabled`、`warn`、`block`。                                                                                                                                                                            |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 使用パターンに基づいてレート制限を自動的に有効にします。                                                                                                                                                                                     |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 直接的な単一モデルリクエストに対するOmniRouteのローカルなコンテキストウィンドウ/最大入力トークンチェックをスキップします。アップストリームの制限は引き続き適用されます。                                                                     |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | ターゲットモデルが必要な機能（ビジョン、ツール、構造化出力、コンテキストウィンドウ）を欠いている場合、ディスパッチ前にリクエストを拒否します。コンボレイヤーの互換性フィルターをバイパスする直接的な単一プロバイダーリクエストを保護します。 |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radarモジュール（カタログフィード画面と同期）を有効にします。デフォルトではオフです。有効にするとUIがアンロックされるだけで、データ同期は別途オプトインが必要です。                                                                |

### ランタイム (33)

| Key                                         | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------ | :------ | :------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |         | コンボルーティングがモデルを切り替える際に、会話の要約を生成して挿入します。無効にすると、モデルの切り替えが独立して扱われ、既存および将来のすべてのコンボに対するバックグラウンドでのハンドオフ要求が防止されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |         | クライアントに転送する前に、Responses API パススルー ストリームから内部の解説フェーズの出力項目を削除します。無効にすると、生のアップストリームの解説を受信します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |         | MCP ツールアクセスに対するスコープ制限を適用します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |         | トークン使用量を削減するために、MCP ツールの説明を圧縮します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |         | ランタイムでのバックグラウンドタスク処理を有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓       | すべてのバックグラウンドサービス (クォータ更新、同期など) を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |         | 検証なしでプロジェクトレベルのRTKフィルターを信頼します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓       | インポート時にリアルタイムダッシュボードのWebSocketサーバーを起動します（デフォルトはポート20132）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |         | CodexがResponses-over-WebSocketトランスポートを使用できるようにします。オフの場合、CodexはHTTPレスポンスにフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |         | Codexがローカルのapp-server WebSocket JSON-RPCトランスポート（codexTransport=app-server）を使用できるようにします。オフの場合、app-serverを選択した接続はCodexの他のトランスポートにフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |         | 予算を使い果たしたリクエストを、緊急の無料フォールバックプロバイダー/モデルにルーティングします。（以下の[緊急予算フォールバック](#emergency-budget-fallback)を参照してください。）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |         | 応答バイトがクライアントに到達する前に、切り詰められたアップストリームSSEストリームに対して透過的な早期再試行を有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |         | バイトがすでにクライアントに到達した後でも、ストリームリカバリが応答を再要求して結合できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |         | ストリーム途中の継続をツール呼び出しに対して安全にします。ツール呼び出しが発行された（進行中またはfinish_reason tool_callsで既に完了した）ストリームは決して再開せず、予算全体を費やす代わりに1回の空の継続後に閉じます。オフの場合：リリース時の動作。                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |         | SSEストリームが有用なフレームを出力する前に閉じ、かつ同一接続での再試行が使い果たされた場合、一度だけ兄弟接続にフェイルオーバーします。利用可能な兄弟接続がない場合、元の`STREAM_EARLY_EOF` 502が返されます。デフォルトではオフです。同一接続での再試行後、早期EOFは終端となります。                                                                                                                                                                                                                                                                                                                                                                                    |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |         | `/v1/models`応答に表示しやすい名前フィールドを含めます。モデルIDのみを期待するクライアントの場合は無効にしてください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |         | `/v1/models`でモデルIDにプレフィックスを付ける方法を制御します。「dual」（デフォルト）は、下位互換性のためにエイリアスと正規のプロバイダーIDプレフィックスの両方を出力します。「alias」は短いエイリアスプレフィックス（例：ds-web/modelではなくdeepseek-web/model）のみを出力します。「canonical」は完全なプロバイダーIDプレフィックスのみを出力します。値：`dual`、`alias`、`canonical`。                                                                                                                                                                                                                                                                              |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |         | モデルインテリジェンスランキングのために、定期的なArena AIリーダーボードELO同期を有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |         | `/v1/models`で`claude/<provider>/<model>`ミラーIDをアドバタイズし、Claude Codeゲートウェイモデルディスカバリが非Claudeモデルをリストするようにします。3段階ゲートのグローバルレベル（環境変数がダッシュボードのオーバーライドよりも優先されます）。[Claude Code configuration](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)を参照してください。                                                                                                                                                                                                                                                             |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |         | no-think/<provider>/<model>ゲートウェイエイリアスのマスター切り替えスイッチです。オン（デフォルト）の場合、/v1/modelsは、思考可能なすべてのClaudeモデルに対してno-thinkingバリアントをアドバタイズし、リクエストで送信されたno-think/ IDは、推論が抑制された実際のモデルに解決されます。オフの場合、バリアントはアドバタイズされず、no-think/ IDは他の不明なモデルIDと同様に扱われます。この設定がオンの場合でも、モデルごとのModelSpec.noThinkingAliasのオプトイン/オプトアウトは適用されます。                                                                                                                                                                        |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |         | `/v1/models`カタログでの思考レベルバリアント（例：-low、-medium、-high）の生成を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓       | プロバイダーディスパッチ用のテナントごとの適応型仮想アドミッションレーンを有効にします（#9654）。これにより、あるテナントのバーストが他のテナントの503エラーを引き起こさなくなります。OMNIROUTE_CHAT_VIRTUAL_LANES環境変数がこのダッシュボードのオーバーライドよりも優先され、変更はサーバー再起動時に有効になります。                                                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |         | カノニカルオーナーがアクティブなクレデンシャルを持たないが、アクティブなクレデンシャルを持つパススルーゲートウェイがルーティングするモデルについて、`/v1/models` で `<gateway-alias>/<model>` ミラーIDをアドバタイズします。警告: グローバルに有効にすると、すべてのクライアントに対してカタログエントリが追加されます。                                                                                                                                                                                                                                                                                                                                                |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |         | New-API / One-API / Sub2API アグリゲーター互換ノードのバランス検出を有効にします。有効にすると、アグリゲーターフラグが設定された互換ノードは、ダッシュボードとクォータ事前フライトルーティングで残高を報告します。                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |         | モデルがクライアントが使用可能な応答を返すまで、非ストリーミングのサーバー所有ツール呼び出しを続行します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |         | 検索統計と最近の検索は、まだライブ接続があるプロバイダーのみをカウントします（duckduckgo-freeなどのキーレスプロバイダーは常にカウントされます）。オフの場合、プロバイダーIDを持つ保持されたすべての検索行が保持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |         | ダッシュボードのプロバイダーページ: プロバイダーが尊重するシグナルにのみ「無料」バッジを表示します。これにより、表示名のヒューリスティック、ブール値以外の無料フィールド、および文書化された無料ティアのない登録済みプロバイダーの `:free` サフィックスが削除されます。オフの場合、従来のバッジルールが保持されます。                                                                                                                                                                                                                                                                                                                                                   |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |         | 集約された429/503の利用不可応答で、具体的な将来のリトライ時間が不明な場合（合成の1秒ではなく）、`Retry-After` を省略し、`error.retry_after_provenance` (`signal` \| `none`) を追加し、コンボドレインパスがJSONおよびプレーンテキストのアップストリームボディから散文のリトライヒントを読み取れるようにします。このフィールドは `unavailableResponse()` によって構築された応答にのみ表示され、他の429/503ボディは変更されません。                                                                                                                                                                                                                                        |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |         | フォールバック専用（クォータ枯渇時のみ）とマークされた `priority` コンボターゲットが、クォータではないことが証明されている原因（プロバイダーのサーキットブレーカーオープン、予測レイテンシスキップ）でコンボを停止した場合、クォータのように見える503ではなく502を返します。ロックアウト、クールダウン、利用不可、枯渇、同時実行制限による停止は503を保持します。                                                                                                                                                                                                                                                                                                       |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |         | 裸のMistral 401 (`{"detail":"Unauthorized"}`、明示的な認証シグナルなし) は、取り消されたキーとクォータ枯渇の場合で同じです。オンの場合、接続を `expired` として駐車する代わりにクールダウンさせ、接続ごとに1時間あたり最大3回まで行います。次の接続は駐車されるため、取り消されたキーは収束します。デフォルトではオフ: 以前と同様に、すべての裸のMistral 401は接続を駐車します。                                                                                                                                                                                                                                                                                        |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |         | `xai-oauth`接続用のライブxAIモデルカタログを、凍結された静的シードの代わりにOAuthベアラートークンを使用して`https://api.x.ai/v1/models`からフェッチします。デフォルトではオフです。`xai-oauth`は静的シードをそのまま提供し続けます。解決エラーが発生した場合、ディスカバリはシードにフォールバックします（x.aiがこのエンドポイントでOAuthベアラーを受け入れるかどうかは未確認です）。                                                                                                                                                                                                                                                                                   |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |         | 自動クリーンアップスイープで、`OMNIROUTE_BATCH_RETENTION_DAYS`よりも古いターミナル（完了/失敗/キャンセル/期限切れ）バッチAPIジョブと、それらの行ごとのチェックポイントを削除し、アップロードされたファイルのBLOBコンテンツを`expires_at`を過ぎたものからクリアできるようにします。デフォルトではオフです。既存のすべてのインストールは、オペレーターがオプトインするまでこのデータを以前とまったく同じように保持します。オペレーターがトリガーする`DELETE /api/v1/batches/delete-completed`ルートは、どちらの場合も影響を受けません。これは、個別の無条件の公開API契約です。                                                                                            |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |         | 選択されたAntigravityアカウントを、それを選択したリクエストのストリーミングライフサイクル用に予約し、同時リトライや資格情報の引き渡しによって、すでに進行中のストリームにコミットされているアカウントが再選択されないようにします。予約は（接続、呼び出し可能なアップストリームモデル）にスコープされるため、1つのアカウントで2つの異なるモデルを同時に処理できます。そのモデルに対してすべての適格なアカウントがすでにリースされている場合、リクエストはビジーなアカウントに積み重なる代わりに、制限された`Retry-After`を含む構造化された503 `antigravity_pool_busy`を返します。デフォルトではオフです。アカウント選択は以前とまったく同じままで、予約は行われません。 |

### CLI (5)

| Key                                   | Type    | Default | Restart | Description                                                                                                                                                                                                            |
| :------------------------------------ | :------ | :------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓       | すべてのCLIクライアントの互換モードを有効にします。                                                                                                                                                                    |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |         | モデルエイリアスの互換性レイヤーを有効にします。                                                                                                                                                                       |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |         | 自動価格データ同期を有効にします（`PRICING_SYNC_ENABLED`環境変数も必要です）。                                                                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |         | プロバイダーモデルの同期後、ライブカタログから`~/.codex/*.config.toml`プロファイルファイルを自動的に（再）書き込みます。アクティブ/デフォルトのCodex設定は変更しません。デフォルトではオフです。                       |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |         | プロバイダーモデルの同期後、ライブカタログから`~/.claude/profiles/<name>/settings.json` Claude Codeプロファイルを自動的に（再）書き込みます。アクティブ/デフォルトのClaude設定は変更しません。デフォルトではオフです。 |

### Health (5)

| キー                                      | 型      | デフォルト | 説明                                                                                                                                                                                                                                                                                                           |
| :---------------------------------------- | :------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | ローカルインスタンスのヘルスチェックエンドポイントを無効にします。                                                                                                                                                                                                                                             |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | トークン検証ヘルスチェックを無効にします。                                                                                                                                                                                                                                                                     |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | スキルサンドボックス環境でのネットワークアクセスを有効にします。                                                                                                                                                                                                                                               |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | プロキシヘルススイープにおいて、ターゲットが拒否したプローブ (401/403/429) は、プロキシの連続失敗ストリークをリセットします。デフォルトではオフです。拒否は中立のままです (#10654)。5xx はどちらの場合も決定的ではありません。拒否によってプロキシが削除、無効化、または再アクティブ化されることはありません。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | サーバーがリクエストの受け入れを開始した後 (`setImmediate` 経由で)、起動が完了するまでブロックする代わりに、起動時のDB整合性/ヘルスチェックを実行します (#13717)。デフォルトではオフです。このPR以前とまったく同じように起動がブロックされます。                                                               |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` とそのレガシーエイリアスである
> `INJECTION_GUARD_BLOCK_THRESHOLD` は、`INJECTION_GUARD_MODE` の `block` モードを調整しますが、
> これらは [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> によって読み取られる単なる環境変数であり、機能フラグではありません。
> データベースによるオーバーライドやダッシュボードのトグルはありません。
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication) を参照してください。

> [!NOTE]
> 「Restart」列は `requiresRestart: true` のフラグを示します。値は即座に永続化されますが、
> プロセスが再ロードされた後にのみ有効になります。Enum フラグは、
> 許可されたセット外の値を拒否します (`setFeatureFlagOverride()` と REST `PUT` ハンドラーの両方で
> サーバー側で検証されます)。

## フラグの切り替え

### ダッシュボード

**ダッシュボード → 設定 → 機能フラグ** (`/dashboard/settings/feature-flags`) に移動します。グリッド (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`) は以下をサポートしています。

- キーまたは説明による**検索**、およびカテゴリによる**フィルター**（加えて、合成された**再起動が必要**ビュー）。
- ブール型フラグ用の**トグル**と、列挙型フラグ用の**ドロップダウン** (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)。
- 各フラグの**ソースバッジ** — `DB`、`ENV`、または `DEF` — は、有効な値の出所を示します。
- オーバーライドを解除するための**リセット**ボタン（`DB`ソースのフラグにのみ表示）と、下部にある**すべてのオーバーライドをリセット**ボタン。
- `requiresRestart`フラグが変更されたときに表示される**サーバーを再起動**バナー。

### REST API

すべての操作は単一のルート [`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts) を介して行われます。すべてのメソッドは認証されたダッシュボードセッションを必要とします（それ以外の場合は `401`）。

#### `GET /api/settings/feature-flags`

すべてのフラグをその有効な値、ソース、および概要とともに返します。

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
    // ... 77個のすべてのフラグ
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

単一のオーバーライドを設定または削除します。ボディ: `{ key: string; value?: string }`。`value` を省略するとオーバーライドが削除されます（環境変数またはデフォルト値に戻ります）。

```bash
# DBオーバーライドを設定
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# オーバーライドを削除（"value"なし）
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

レスポンスには、新しい `effectiveValue`/`source`、`previousValue`/`previousSource`、および `requiresRestart` が反映されます。不明なキーや範囲外の列挙値は `400` で拒否されます。

#### `DELETE /api/settings/feature-flags`

**すべて**のDBオーバーライドを一度にクリアし、すべてのフラグを環境変数またはデフォルト値に戻します。`{ cleared: <count>, message: "..." }` を返します。

> [!NOTE]
> `requiresRestart: true` のフラグは、プロセスの再ロード後にのみ有効になります。ダッシュボードの再起動フローは `POST /api/restart` を呼び出し、その後サーバーが稼働状態に戻るまで `GET /api/health/ping` をポーリングします。

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
