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

6つのカテゴリにわたる76個のフラグ。**デフォルト**は定義上のデフォルト値です。これは、
DBによるオーバーライドも環境変数も存在しない場合に使用される値です。

### セキュリティ（10）

| キー                                    | 型       | デフォルト | 説明                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | -------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | ブール値 | `false`    | すべての受信リクエストにAPIキーを必須とします。                                                                                                                                                                                                                                                          |
| `INPUT_SANITIZER_ENABLED`               | ブール値 | `true`     | すべてのリクエストに対する入力サニタイズを有効にします。                                                                                                                                                                                                                                                 |
| `INJECTION_GUARD_MODE`                  | 列挙型   | `off`      | プロンプトインジェクションのガードモード。値: `off`、`warn`、`block`、`redact`。                                                                                                                                                                                                                         |
| `PII_REDACTION_ENABLED`                 | ブール値 | `false`    | リクエストからPIIを秘匿化します（`INPUT_SANITIZER_MODE`とは独立しています）。                                                                                                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION`             | ブール値 | `false`    | プロバイダーのレスポンスからPIIをサニタイズします。                                                                                                                                                                                                                                                      |
| `PII_RESPONSE_SANITIZATION_MODE`        | 列挙型   | `redact`   | PIIレスポンスをサニタイズするモード。値: `redact`、`warn`、`block`、`off`。                                                                                                                                                                                                                              |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | ブール値 | `true`     | プライベート／内部IP範囲への送信リクエストをブロックします。                                                                                                                                                                                                                                             |
| `ALLOW_API_KEY_REVEAL`                  | ブール値 | `false`    | 認証済みのダッシュボードユーザーが、マスクされた値だけでなく、保存されているAPIキーを表示できるようにします。                                                                                                                                                                                            |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | ブール値 | `false`    | AUTHログ行にアカウントのプレフィックスを含めます（例:「<provider>アカウントを使用中: abc12345...」）。共有／マルチテナントのプロセスログからアカウント識別子が秘匿化されるよう、デフォルトでは無効になっています。デバッグモードとは独立しており、デバッグモードを切り替えてもこの情報は表示されません。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | ブール値 | `false`    | OIDCが有効な場合、パスワードログインを無効にし、ユーザーがOIDCシングルサインオン経由でのみ認証できるようにします。無効な場合（デフォルト）、パスワードログインとOIDCの両方を利用できます。                                                                                                               |

### ネットワーク（18）

| キー                                            | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | ------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`    | ✓      | TLS フィンガープリントのステルスモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`    |        | /v1/audio/* ルートが、localhost 外でホストされている OpenAI 互換プロバイダーノードを使用できるようにします。デフォルトでは無効です。音声をリモートホストへルーティングすると送信元 ID が変わるため、オペレーターが明示的に決定する必要があります。ループバックノードは常に許可され、この設定の影響を受けません。                                                                                                                                                                                                                           |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false`    |        | POST /v1/rerank（およびメモリエンジンのループバック再ランクステップ）が、localhost 外でホストされている OpenAI 互換プロバイダーノードを使用できるようにします。デフォルトでは無効です。リモートホストへのルーティングは送信元 ID を変更するため、オペレーターが明示的に決定する必要があります。ループバックノードは常に許可されます。リモートノードは、プロバイダーの送信先 URL ポリシーにも適合する必要があります。                                                                                                                       |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`    |        | 接続にプロキシが割り当てられていない場合、レジストリから最初に動作するプロキシを自動選択します。デフォルトでは無効です（有効にすると、レジストリ内の任意のプロキシがグローバルフォールバックになるためです — #3332）。                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`    |        | プロキシ到達可能性の事前チェックが失敗した場合に、OAuth およびプロバイダー検証フローが固定プロキシを迂回して直接接続することを許可します。送信元 IP が変わる可能性があるため、デフォルトでは無効です。                                                                                                                                                                                                                                                                                                                                     |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`     |        | 複数アカウントのローテーションエグゼキューターでネットワーク例外（タイムアウト、接続拒否／リセット）が発生し、失敗したアカウントに専用プロキシがない場合、各アカウントを再試行する代わりに短いクールダウンを適用し、残りのリクエストではプロキシなしの他のアカウントをスキップします。デフォルトで有効です（安全です。送信元 IP は変更されず、共有送信元を使用するアカウントでのレイテンシー／クールダウンのリスクのみを軽減します）。最初にプロキシなしで例外がスローされた時点で即座に伝播する従来の動作に戻すには、無効にしてください。 |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`    |        | プロキシプールおよび opencode のアカウント単位のローテーションで、直前に失敗したプロキシ（TCP プローブが拒否された、またはそのプロキシ経由で 429 を受信したもの）の再提供を、プロセス単位の一定期間停止します。この期間は失敗を繰り返すたびに倍増し、上限まで延長されます。プロキシのステータスは書き込まれません。すべての候補が保留された場合、選択は変更されません。デフォルトでは無効です。                                                                                                                                            |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`    |        | ダッシュボードのプロキシプール配下に、過去 24 時間でそのメンバーを処理した観測済み送信元 IP の数と、それらを使用した接続数を表示します。読み取り専用で、プロキシログから算出され、ルーティングには一切使用されません。デフォルトでは無効です。                                                                                                                                                                                                                                                                                             |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`    |        | OpenCode エグゼキューターで、ストリーミングされる Responses 応答の本文の最初のバイトを監視します（時間枠：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`、デフォルトは `15000`）。2xx の Responses ストリームが時間枠を超えても無応答のままの場合、ストールしたものとして扱われます。アカウントをクールダウンし、リクエストを次のアカウントへ一度だけローテーションします。2 回目のストールでは即座に失敗します。デフォルトでは無効です。無効の場合、ストールしたストリームは、現在と同様にストリーム準備完了タイムアウトまで待機し続けます。           |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`    |        | OpenCode executor: `user_blocked` による拒否を含む 403/451（地域制限や Cloudflare のフィンガープリント拒否ではないもの）を受けた場合、拒否されたアカウントをクールダウンし、リクエストごとに最大 1 回だけ次のアカウントへローテーションします。2 回目の拒否は成功としてマークせず、そのまま返されます。デフォルトでは無効です。アップストリームによるユーザーブロックを迂回するルーティングは、回避行為と見なされ、フリート全体にフラグが広がる可能性があります。                                                                          |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`    |        | OpenCode rotation: 一時的なアップストリーム障害（5xx または空の 400）が 2 回連続した場合、次のアカウントへ移る前に一時停止します。停止時間は 1.5 秒から始まり、障害が続くたびに倍増しますが、1 回の停止につき最大 6 秒、リクエストごとに合計最大 10 秒に制限されます。クライアント切断時はスキップされ、待機前に失敗したレスポンス本文が解放されます。デフォルトでは無効です。フェイルオーバーは即時のままです。                                                                                                                           |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false`    |        | OpenCode rotation: 一時的な 429 が繰り返された場合（または新しいプール負荷マーカーがある場合）、ハートビートを維持しながらリクエストを保留し、フリート全体へ一斉に展開する代わりに、最大 3 個のアカウントを順次試す、上限付きの 1 レグを再実行します。デフォルトでは無効です。すべての 429 は従来どおり、次のアカウントへローテーションします。                                                                                                                                                                                            |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false`    |        | 変換されたストリーミングターンで、アップストリームのターンに使用可能なコンテンツがない場合（推論のみの完了、または価値のあるチャンクがゼロ）、クライアントに何も公開される前に、通常の認証情報パスを介して制限付きの再試行（最大 `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX` 回）を行います。デフォルトでは無効です。空のターンでは現在の動作（空の 200 または空コンテンツの 502）が維持されます。                                                                                                                                              |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`    |        | OpenCode rotation: 実際のレート制限として分類された最初の 429（解析可能な `Retry-After`、またはレート／使用量制限を示す本文）でアカウントの試行を停止し、そのアップストリームの 429 を変更せずに返します。分類されていない 429 ではローテーションを継続します。デフォルトでは無効です。無料枠は送信元 IP ごとに制限されるため（#9611）、すべての 429 でローテーションし、すべてのアカウントを試し終えた場合は最後のアップストリーム 429 を返します。                                                                                       |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`    | ✓      | MITM プロキシの TLS 証明書検証を無効にします。**危険です。**                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`    |        | プライベート／内部ネットワークを指すプロバイダー URL を許可します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`     |        | ローカル／プライベートアドレス（127.0.0.1、localhost、LAN）上のプロバイダーの追加／検証を許可します。デフォルトで有効です（ローカル優先）。公開アドレスのみに厳密に制限する場合は無効にしてください。クラウドメタデータへのアクセスは引き続きブロックされます。                                                                                                                                                                                                                                                                            |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`    | ✓      | Claude Code 互換プロバイダーモードを有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### ポリシー（5）

| キー                            | 型      | デフォルト | 説明                                                                                                                                                                                                                               |
| ------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | ツール使用ポリシーの適用モード。値: `disabled`、`warn`、`block`。                                                                                                                                                                  |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 使用パターンに基づいてレート制限を自動的に有効化します。                                                                                                                                                                           |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 単一モデルへの直接リクエストに対する OmniRoute のローカルなコンテキストウィンドウ / 最大入力トークンのチェックをスキップします。アップストリーム側の制限は引き続き適用されます。                                                   |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 対象モデルに必要な機能（ビジョン、ツール、構造化出力、コンテキストウィンドウ）がない場合、ディスパッチ前にリクエストを拒否します。コンボレイヤーの互換性フィルターをバイパスする、単一プロバイダーへの直接リクエストを保護します。 |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar モジュール（カタログフィード画面と同期）を有効にします。デフォルトでは無効です。有効化しても UI が利用可能になるだけで、データ同期には別途オプトインが必要です。                                                   |

### ランタイム (33)

| キー                                        | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------- | ------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`     |        | コンボルーティングによってモデルが切り替わる際に、会話の要約を生成して挿入します。無効にすると、モデルの切り替えが個別に扱われ、既存および今後のすべてのコンボに対するバックグラウンドでの引き継ぎリクエストが行われなくなります。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`     |        | クライアントへ転送する前に、Responses API のパススルーストリームから内部のコメンタリーフェーズの出力項目を削除します。生のアップストリームコメンタリーを受信するには無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`     |        | MCP ツールへのアクセスにスコープ制限を適用します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`    |        | MCP ツールの説明を圧縮して、トークン使用量を削減します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`    |        | ランタイムでのバックグラウンドタスク処理を有効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`    | ✓      | すべてのバックグラウンドサービス（クォータの更新、同期など）を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`    |        | プロジェクトレベルのRTKフィルターを検証せずに信頼します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`     | ✓      | インポート時にリアルタイムダッシュボードのWebSocketサーバーを起動します（デフォルトではポート20132）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`     |        | CodexがResponses-over-WebSocketトランスポートを使用できるようにします。オフの場合、CodexはHTTP Responsesにフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`     |        | Codexがローカルapp-server WebSocket JSON-RPCトランスポート（codexTransport=app-server）を使用できるようにします。オフの場合、app-serverを選択した接続はCodexの他のトランスポートにフォールバックします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`     |        | 予算を使い切ったリクエストを緊急用の無料フォールバックプロバイダー／モデルにルーティングします。（下記の[緊急予算フォールバック](#emergency-budget-fallback)を参照してください。）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`    |        | レスポンスのバイトがクライアントに到達する前に、途中で切断されたアップストリームSSEストリームを透過的に早期再試行できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`    |        | バイトがすでにクライアントに到達した後でも、ストリームリカバリーによって再リクエストし、レスポンスを連結できるようにします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`    |        | ストリーム途中の継続をツール呼び出しに対して安全にします。ツール呼び出しが発行された後（処理中、またはfinish_reason tool_callsですでに完了済み）は、切断されたストリームを再開せず、予算をすべて消費する代わりに、空の継続が1回発生した時点で終了します。オフ：リリース版の動作。                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`    |        | SSE ストリームが有用なフレームを一度も送出せずに閉じ、同一接続での制限付き再試行を使い切った場合に、兄弟接続へ一度フェイルオーバーします。利用可能な兄弟接続がない場合は、元の `STREAM_EARLY_EOF` 502 が返されます。デフォルトではオフです。early-EOF は、同一接続での再試行後も終端エラーとして扱われます。                                                                                                                                                                                                                                                                                                                                                                                                           |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`     |        | `/v1/models` のレスポンスに、表示用のわかりやすい名前フィールドを含めます。モデル ID のみを想定するクライアントでは無効にしてください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`     |        | /v1/models でモデル ID に付けるプレフィックスを制御します。'dual'（デフォルト）は、後方互換性のためにエイリアスと正規プロバイダー ID の両方のプレフィックスを出力します。'alias' は短いエイリアスプレフィックスのみを出力します（例: deepseek-web/model ではなく ds-web/model）。'canonical' は完全なプロバイダー ID プレフィックスのみを出力します。値: `dual`、`alias`、`canonical`。                                                                                                                                                                                                                                                                                                                                |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`     |        | モデルの知能ランキング用に、Arena AI リーダーボードの ELO を定期的に同期します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`    |        | `/v1/models` で `claude/<provider>/<model>` ミラー ID を公開し、Claude Code ゲートウェイのモデル検出で Claude 以外のモデルも一覧表示されるようにします。3 段階ゲートのグローバルレベルです（環境変数がダッシュボードのオーバーライドより優先されます）。[Claude Code の設定](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)を参照してください。                                                                                                                                                                                                                                                                                                              |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`     |        | no-think/<provider>/<model> ゲートウェイエイリアスのマスタースイッチです。オン（デフォルト）の場合、/v1/models は対象となる思考対応 Claude モデルごとに非思考バリアントを公開し、リクエストで送信された no-think/ ID は、推論を抑制した状態で実際のモデルに解決されます。オフの場合、バリアントは公開されず、no-think/ ID は他の不明なモデル ID と同様に扱われます。オンの場合でも、モデルごとの ModelSpec.noThinkingAlias によるオプトイン/オプトアウトが適用されます。                                                                                                                                                                                                                                               |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`    |        | /v1/models カタログで、思考レベルバリアント（例: -low、-medium、-high）の生成を無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`    | ✓      | プロバイダーへのディスパッチに、テナントごとの適応型仮想アドミッションレーンを有効にします（#9654）。これにより、あるテナントのバーストが原因で別のテナントに 503 が返されることがなくなります。環境変数 `OMNIROUTE_CHAT_VIRTUAL_LANES` は、このダッシュボードのオーバーライドより優先されます。変更はサーバーの再起動時に反映されます。                                                                                                                                                                                                                                                                                                                                                                               |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`    |        | 正規所有者に有効な認証情報がないものの、有効な認証情報を持つパススルーゲートウェイによってルーティングされるモデルについて、<gateway-alias>/<model> 形式のミラー ID を /v1/models で公開します。警告：グローバルに有効化すると、すべてのクライアントのカタログにエントリが追加されます。                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`    |        | New-API / One-API / Sub2API アグリゲーター互換ノードの残高検出を有効にします。有効にすると、アグリゲーターフラグが設定された互換ノードは、ダッシュボードおよびクォータ事前チェックルーティングで残高を報告します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`    |        | モデルがクライアントで利用可能なレスポンスを返すまで、サーバー所有の非ストリーミングツール呼び出しを継続します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`    |        | 検索統計と最近の検索では、現在も有効な接続を持つプロバイダーのみをカウントします（duckduckgo-free など、キー不要のプロバイダーは常にカウントされます）。無効にすると、保持されているプロバイダー ID 付きの検索行がすべて維持されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`    |        | ダッシュボードのプロバイダーページ：プロバイダーがサポートしていることを示すシグナルに基づく場合にのみ無料バッジを表示します。文書化された無料枠がない登録済みプロバイダーについては、表示名による推測、boolean 以外の無料フィールド、および :free サフィックスを使用しません。無効にすると、従来のバッジ判定ルールが維持されます。                                                                                                                                                                                                                                                                                                                                                                                    |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`    |        | 集約された 429/503 利用不可レスポンスで、具体的な将来の再試行時刻が不明な場合、合成された 1 秒という値を使用する代わりに `Retry-After` を省略し、`error.retry_after_provenance`（`signal` \| `none`）を追加します。また、コンボのドレイン処理で、JSON およびプレーンテキストのアップストリーム本文から自然文の再試行ヒントを読み取れるようにします。このフィールドは `unavailableResponse()` によって生成されたレスポンスにのみ表示されます。それ以外の 429/503 本文は変更されません。                                                                                                                                                                                                                                 |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`    |        | クォータ枯渇時のみフォールバックするよう指定された `priority` コンボターゲットが、クォータ以外であることが明白な原因（プロバイダーのサーキットブレーカーが開いている、予測レイテンシに基づくスキップ）によりコンボを停止した場合、クォータ不足に見える 503 ではなく 502 を返します。ロックアウト、クールダウン、利用不可、枯渇、および同時実行数上限による停止では、引き続き 503 を返します。                                                                                                                                                                                                                                                                                                                          |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`    |        | 単純な Mistral 401（`{"detail":"Unauthorized"}`、明示的な認証シグナルなし）は、キーが失効した場合とクォータが枯渇した場合で同一です。有効にすると、接続を `expired` として停止する代わりにクールダウン状態にします。これは接続ごとに 1 時間あたり最大 3 回まで行われ、次回は停止されるため、失効したキーも最終的には停止状態に収束します。デフォルトでは無効です。無効の場合、従来どおり、単純な Mistral 401 が発生するたびに接続を停止します。                                                                                                                                                                                                                                                                        |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`    |        | 固定された静的シードの代わりに、OAuth ベアラートークンを使用して `https://api.x.ai/v1/models` から `xai-oauth` 接続用の最新 xAI モデルカタログを取得します。デフォルトではオフです。`xai-oauth` は従来どおり静的シードを変更せずに提供し続けます。解決時にエラーが発生した場合、ディスカバリーはシードにフォールバックします（このエンドポイントで x.ai が OAuth ベアラートークンを受け入れるかどうかは未検証です）。                                                                                                                                                                                                                                                                                                  |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`    |        | 自動クリーンアップ処理で、`OMNIROUTE_BATCH_RETENTION_DAYS` より古い終端状態（完了／失敗／キャンセル済み／期限切れ）の Batch API ジョブと、その行ごとのチェックポイントを削除し、さらに個別の `expires_at` を過ぎたアップロード済みファイルの BLOB コンテンツを消去できるようにします。デフォルトではオフです。オペレーターが明示的に有効化するまで、既存のすべてのインストール環境でこのデータは従来どおり保持されます。オペレーターが実行する `DELETE /api/v1/batches/delete-completed` ルートはいずれの場合も影響を受けません。これは独立した無条件の公開 API コントラクトです。                                                                                                                                     |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false`    |        | 選択された Antigravity アカウントを、そのアカウントを選択したリクエストのストリーミングライフサイクル中予約し、同時実行される再試行や認証情報の引き継ぎによって、処理中のストリームにすでに割り当てられているアカウントが再選択されないようにします。予約のスコープは（接続、呼び出し可能なアップストリームモデル）であるため、1 つのアカウントで同時に 2 つの異なるモデルを処理することは引き続き可能です。そのモデルに使用可能なすべてのアカウントがすでにリースされている場合、リクエストはビジー状態のアカウントに処理を集中させる代わりに、上限付きの `Retry-After` を伴う構造化された 503 `antigravity_pool_busy` を返します。デフォルトではオフです。アカウントの選択は従来どおり維持され、予約は行われません。 |

### CLI (5)

| キー                                  | 型      | デフォルト | 再起動 | 説明                                                                                                                                                                                                                      |
| ------------------------------------- | ------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false`    | ✓      | すべての CLI クライアントで互換モードを有効にします。                                                                                                                                                                     |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`    |        | モデルエイリアス互換レイヤーを有効にします。                                                                                                                                                                              |
| `PRICING_SYNC_ENABLED`                | boolean | `false`    |        | 価格データの自動同期を有効にします（`PRICING_SYNC_ENABLED` 環境変数も必要です）。                                                                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`    |        | プロバイダーモデルの同期後、最新カタログから ~/.codex/*.config.toml プロファイルファイルを自動的に（再）書き込みします。アクティブ／デフォルトの Codex 設定は変更しません。デフォルトではオフです。                       |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`    |        | プロバイダーモデルの同期後、最新カタログから ~/.claude/profiles/<name>/settings.json Claude Code プロファイルを自動的に（再）書き込みします。アクティブ／デフォルトの Claude 設定は変更しません。デフォルトではオフです。 |

### ヘルス (5)

| キー                                      | 型      | デフォルト | 説明                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`    | ローカルインスタンスのヘルスチェックエンドポイントを無効にします。                                                                                                                                                                                                                                              |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`    | トークン検証のヘルスチェックを無効にします。                                                                                                                                                                                                                                                                    |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`    | スキルのサンドボックス環境でネットワークアクセスを有効にします。                                                                                                                                                                                                                                                |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`    | プロキシのヘルススイープで、ターゲットが拒否したプローブ（401/403/429）により、プロキシの連続失敗回数をリセットします。デフォルトではオフです。拒否は中立として扱われます（#10654）。5xx はどちらの設定でも判定不能として扱われます。拒否によってプロキシが削除、無効化、または再有効化されることはありません。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`    | 起動完了までブロックする代わりに、サーバーがリクエストの受け付けを開始した後（`setImmediate` 経由）に、起動時の DB 整合性／ヘルスチェックを実行します（#13717）。デフォルトではオフです。この PR より前とまったく同様に、起動はチェックが完了するまでブロックされます。                                         |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` と、そのレガシーエイリアスである
> `INJECTION_GUARD_BLOCK_THRESHOLD` は、`INJECTION_GUARD_MODE` の `block`
> モードを調整しますが、これらは
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> によって読み取られる通常の環境変数であり、機能フラグではありません。DB によるオーバーライドも、
> ダッシュボードの切り替え設定もありません。詳細は
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication) を参照してください。

> [!NOTE]
> `Restart` 列は、`requiresRestart: true` が設定されたフラグを示します。値は
> 即座に永続化されますが、プロセスの再読み込み後にのみ反映されます。列挙型フラグでは、
> 許可された値の範囲外にある値は拒否されます（サーバー側の
> `setFeatureFlagOverride()` と REST `PUT` ハンドラーの両方で検証されます）。

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
