# Resilience Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute には、個別ではあるものの相互に関連する3つのレジリエンスメカニズムがあります。それぞれスコープと目的が異なります。ルーティング動作をデバッグする際は、これらを区別してください。

![3層レジリエンスモデル](../diagrams/exported/resilience-3layers.svg)

> ソース: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. プロバイダーサーキットブレーカー

**スコープ:** プロバイダー全体（例: `glm`、`openai`、`anthropic`）。

**目的:** アップストリーム/サービスレベルで繰り返し失敗しているプロバイダーへのトラフィック送信を停止します。

**実装:**

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- ワイヤリング: `src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- ステータスAPI: `GET /api/monitoring/health`
- リセットAPI: `POST /api/resilience/reset`
- ラッパー: `open-sse/services/accountFallback.ts`
- DBテーブル: `domain_circuit_breakers`

**状態:**

- `CLOSED` — 通常のトラフィックが許可されます
- `DEGRADED` — トラフィックは引き続き許可されますが、増加したプロバイダーの失敗が追跡されています。十分な回数の成功、有効な接続テスト、または最後の失敗種別に対する最長の `OPEN` 保持期間（その `cooldownByKind` 値、なければ `resetTimeout`、× `maxBackoffMultiplier`、最低1回分のクールダウン）が新たな失敗なく経過すると、`CLOSED` に戻ります
- `OPEN` — プロバイダーが一時的にブロックされます。コンボルーティングはこれをスキップします
- `HALF_OPEN` — リセットタイムアウトが経過しました。プローブリクエストが許可されます

**設定可能なデフォルト値（`open-sse/config/constants.ts`、ダッシュボード → 設定 → レジリエンス で公開）:**

| クラス  | DEGRADED 移行 | OPEN 移行  | リセットタイムアウト |
| ------- | ------------- | ---------- | -------------------- |
| OAuth   | 5回の失敗     | 8回の失敗  | 60秒                 |
| API-key | 7回の失敗     | 12回の失敗 | 30秒                 |
| Local   | 派生          | 2回の失敗  | 15秒                 |

`degradationThreshold` はプロバイダーが `DEGRADED` に移行するタイミングを制御し、`failureThreshold` はオープンしてスキップされるタイミングを制御します。ローカルプロバイダープロファイルは、まだレジリエンス設定ページでは公開されていません。

**トリップコード:** プロバイダーレベルのステータス `[408, 500, 502, 503, 504]` のみです。アカウントレベルのエラー（ほとんどの 401/403/429 — これらはクールダウンまたはロックアウトに該当）ではトリップしません。

**遅延回復:** `OPEN` の期限が切れると、`getStatus()`、`canExecute()`、`getRetryAfterMs()` が状態を `HALF_OPEN` に更新します。同じ読み取り（および次の失敗）によって、古くなった `DEGRADED` は `CLOSED` へと減衰して戻ります。バックグラウンドタイマーは不要です。

---

### オプトインのグローバルプロバイダークールダウン（ウィンドウゲート）

4つ目の **オプトイン** レイヤー（`PROVIDER_COOLDOWN_ENABLED`、デフォルト **オフ**）は、失敗したプロバイダーのリクエスト間メモリを `open-sse/services/providerCooldownTracker.ts` に保持します。これはコンボターゲット解決によって参照され、連続するコンボリクエストが直前に失敗したプロバイダーを再びたどらないようにします。プロバイダーレベルのエントリは `PROVIDER_PROFILES` ウィンドウゲートに従います:

| プロファイル | トリップ条件（`providerFailureThreshold`） | ウィンドウ期間（`providerFailureWindowMs`） | クールダウン時間（`providerCooldownMs`） |
| ------------ | -----------------------------------------: | ------------------------------------------: | ---------------------------------------: |
| OAuth        |                                       `10` |                                     `15min` |                                   `5min` |
| API key      |                                       `15` |                                     `30min` |                                  `10min` |

閾値未満の場合、プロバイダーはクールダウン中とは **みなされません**。成功するとウィンドウはクリアされます。接続レベルのエントリ（`provider:connectionId`）は、代わりに指数関数的な `minRetryCooldownMs → maxRetryCooldownMs` バックオフを維持します。オーバーライド: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。リグレッションガード: `tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 接続のクールダウン

**対象範囲:** 単一のプロバイダー接続/アカウント/キー。

**目的:** 同じプロバイダーの他の接続がサービスを継続している間、1つの不良キーをスキップする。

**実装:**

- 利用不可としてマーク: `src/sse/services/auth.ts::markAccountUnavailable()`
- 選択: 同ファイル内の `getProviderCredentials*`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

**接続ごとのフィールド:**

- `rateLimitedUntil` — クールダウンが期限切れになるまでのタイムスタンプ
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数バックオフカウンター

**デフォルトのクールダウン:**

- OAuth ベース: 5秒
- APIキー ベース: 3秒
- APIキー 429: アップストリームの `Retry-After` / リセットヘッダー / パース可能なリセットテキストを優先
- バックオフ: `baseCooldownMs * 2 ** failureIndex`

**サンダリングハード対策ガード:** 同時に発生した障害によってクールダウンが過度に延長されたり、`backoffLevel` が二重にインクリメントされたりするのを防ぐ。

**同時実行数制限の 429 はバックオフラダーを上がらない。** ボディが同時実行数制限("too many concurrent requests"、"concurrency limit"、"parallel request limit"、GLM `并发数过高`)を報告する `429` は、アカウントが正常だがビジー状態であることを意味する。
`checkFallbackError()` は理由 `concurrency_limited` を返す: 即座に次の接続へフェイルオーバーし、この接続は固定の `CONCURRENCY_LIMIT_COOLDOWN_MS`(1秒)またはアップストリームのリトライヒントでクールダウンし、`backoffLevel` は変更せず、`skipProviderBreaker` を設定する。
明示的なクォータのボディが依然として優先されるため、クォータパターンにも一致するボディはクォータ判定のままとなる。検出: `src/shared/utils/classify429.ts` の `looksLikeConcurrencyLimit()`。判定: `open-sse/services/accountFallback/concurrencyLimit429.ts`。`classify429()`(ブレーカーの `FailureKind`)は変更されておらず、これらのボディに対しては依然として `rate_limit` を返す。

**ストリームコンテンツの停滞はアカウントをクールダウンしない。** コンテンツ停滞ウォッチドッグ
(`open-sse/utils/streamHandler.ts`)が、時間内にモデル出力を送信しなかったストリームを
放棄したとき、`markAccountUnavailable()` は接続にエラーを記録するがクールダウンは
設定しない: その停滞はそのリクエストに起因するものであり、多くの場合、まだ出力のない
長い推論ターンである。オペレーターは `resilienceSettings.streamStallCooldown.enabled`
(デフォルト `false`)で再びオプトインできる。

**推論フレームはコンテンツ停滞バジェットをリスタートする。** 推論モデルは最初の
可視トークンの前に数分間思考することがある: Claude は思考テキストが空になることのある
`thinking_delta` フレームをストリームし、Responses API は推論アイテムを次々と
ストリームする。`isReasoningProgressFrame()`(`open-sse/utils/streamReadiness.ts`)が
これらのフレームを認識し、ウォッチドッグはターンをキャンセルする代わりに各フレームで
バジェットをリスタートする。これらは依然としてモデル出力ではないため、推論のみで終了した
ターンは依然として空として報告され、推論を停止してハートビートのみを送信するターンは
依然としてウォッチドッグを発動させる。

空でないシグネチャを持つ Kiro のバイナリ `reasoningContentEvent` フレームは、この推論アクティビティを空の `reasoning_content` デルタとしてエグゼキューター経由で保持する。シグネチャは
転送されない。メタデータ、不完全なフレーム、空のシグネチャはコンテンツバジェットを
リスタートしない。独立したアクティブストリームタイムアウトとクライアントキャンセルは
引き続き適用される(`open-sse/executors/kiro/reasoning.ts`)。

**終端状態(クールダウンではない):**

- `banned` — 禁止キーワード/アカウントBAN検出([BAN_DETECTION](../security/BAN_DETECTION.md) 参照)、および3回連続のアップストリームによるリクエスト単位の拒否(`request_rejected`、例: Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`)によって設定される。単一の拒否は接続をクールダウンするだけである
- `expired`(制限されたリトライ — 指数バックオフ付きの `EXPIRED_RETRY_MAX = 3` — の後に終端へ遷移するため、一時的な OAuth エラーはアカウントが永続的に無効化される前に自己修復できる)
- `credits_exhausted`

これらは認証情報が変更されるか、オペレーターがリセットするまで持続する。終端状態を一時的なクールダウン状態で上書きしてはならない。

**遅延回復:** `rateLimitedUntil` が過ぎると、接続は再び選択対象となる。正常に使用されると、`clearAccountError()` がすべてのエラーフィールドをクリアする。

### Claude OAuth 使用量の壁: 低優先度レーン + セッション制限リセット

**対象範囲:** 1つの Claude サブスクリプション(OAuth)接続。両方の機能は**接続ごとの
オプトイン**(接続の編集 → Claude セクション → `providerSpecificData` 内の
`lowPriorityMode` / `autoLimitReset`、どちらもデフォルトはオフ)であり、Claude Code の
`/low-priority` および `/limit-reset` コマンドを再現する(ワイヤコントラクトは
Claude Code 2.1.263 からキャプチャ)。

**実装:**

- ステートマシン + レスポンス分類: `open-sse/services/claudeLowPriority.ts`
- リセットステータス/クレームクライアント: `open-sse/services/claudeLimitReset.ts`
- エグゼキューターフック(ヘッダー注入 + 同一アカウントリトライ): `open-sse/executors/base.ts::execute()`
- オプトインの永続化: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**トリガー:** 5時間の使用量の壁 — ヘッダーに
`anthropic-ratelimit-unified-status: rejected` を持ち、アカウントが適格な場合は
`anthropic-ratelimit-unified-slow-offer: treatment` を持つ `429`。最初の壁 429 の前には
何も送信されない。unified ヘッダーのないバースト 429 は通常のクールダウンパスを通る。

**低優先度レーン**(`lowPriorityMode`):

- ウォール429が発生すると、エグゼキューターはオファーを受け入れ、`anthropic-usage-limit: slow` を付けて**同じ**アカウントで即座にリトライします。レーンは告知された `anthropic-ratelimit-unified-reset`（+60秒の猶予）までアクティブなままとなり、そのウィンドウ内のすべてのリクエストにこのヘッダーが付与されます。インターセプトされた429は `handleChatCore` に到達しないため、接続はクールダウンに入ること**はなく**、ローテーションから外されることもありません。
- 以降のレスポンスの `anthropic-ratelimit-unified-slow-status`：`active` / `not_needed` はレーンを維持します。`slot_busy`（429）または `529` の場合は、サーバーの `anthropic-ratelimit-unified-slow-retry-after`（デフォルト20秒、クランプ5〜600秒、±30%ジッター）だけ待機してリトライします。上限は `anthropic-ratelimit-unified-slow-max-wait`（デフォルト20分、クランプ1分〜6時間）です。これを超えるとレーンは終了し、10分間のクールオフが再受け入れをブロックします。この待機はさらに、リクエスト自体のアップストリーム開始タイムアウト（`resolveFetchStartTimeout`、デフォルト10分）の残り時間から5秒のマージンを引いた値で制限されます。この上限がなければ、デフォルトの20分の最大待機がリクエストより長く続き、スリープが待機の途中で中断され、正常な `max_wait` 終了＋クールオフの代わりに `TimeoutError` が表面化してしまいます。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5時間ウィンドウのロールオーバー、または `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`（有償の超過分がウォールをカバーするようになったため、どのステータスでも `extra_usage` として終了する）の場合、レーンは終了します。その後レスポンスは通常のクールダウンパスに流れます。`budget_exhausted` は告知されたバジェットリセット（最大8日）まで記憶されます。
- ウォールチェックは、エグゼキューター自身の400起因の試行内リトライ（コンテキスト編集、thinking/effort クランプ、パラメータ自動学習）の後に実行されるため、これらのリトライのいずれかでのみ表面化するウォール429も、クールダウンパスに到達する代わりにインターセプトされます。
- 状態は接続ごとにインメモリで保持されます（再起動すると再受け入れのためにウォール429が1回余分に発生します）。

**セッション制限リセット**（`autoLimitReset`。両方が有効な場合はレーンより先に試行されます）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` ブロック。`arm: "reset"` かつ `available: true` の場合、`{ "program": "juniper_tide" }` を付けて `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`（組織UUIDは `providerSpecificData.organizationUUID` から取得、ブートストラップフォールバックあり）。
- `result: reset|not_limited` → リクエストはフルスピードでリトライされます（slowヘッダーなし）。`already_used` / `not_offered` は `next_available_at`（デフォルト1週間）をメモ化します。失敗した場合は15分間バックオフします。リセットは週1回で、週次制限には引き続きカウントされます。

回帰テストガード：`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### セッションアフィニティ (#7274)

**対象範囲：** 1つのクライアントセッション（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ヘッダー）を1つの接続にピン留めします。**任意の**プロバイダーで有効です。

**目的：** マルチターンエージェント（Claude Code、aider、カスタムエージェント）をリクエスト間で同じアカウントに維持し、アカウント間のコンテキスト損失や、アカウントごとのセッション状態を持つプロバイダーでのコールドスタート429の繰り返しを減らします。

**実装：**

- TTL解決：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ピンの選択/作成：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ヘッダー抽出（汎用、任意のプロバイダー）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 永続化ピンテーブル：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 設定：`sessionAffinityTtlMs`（グローバルTTL、ミリ秒単位。`0` で無効化）— `src/lib/db/settings.ts`。Codex専用の `codexSessionAffinityTtlMs` からマイグレーション `124_generic_session_affinity_ttl.sql` により改名され、以前設定されていたCodex TTLは新しいデフォルトとして引き継がれます。

#7274より前は、`resolveSessionAffinityTtlMs()` が `codex` 以外のすべてのプロバイダーで強制的に `0` を返していたため、ピン留めの仕組みとヘッダー抽出がすでにプロバイダー非依存であったにもかかわらず、TTL設定（およびセッションヘッダー）は他のプロバイダーでは効果がありませんでした。この修正によりその早期リターンが削除され、グローバルに `0` より大きく設定されれば、TTLはすべてのプロバイダーに一律に適用されるようになりました。

3つのセッションアフィニティヘッダーがアップストリームに転送されることはありません。エグゼキューターはクライアントヘッダーをそのまま渡すのではなく、独自のアップストリームヘッダーを一から構築するため、これらはあくまで内部の相関IDとしてのみ扱われます。

### 排他的マネージドセッション接続リース

**対象範囲：** アクティブなマネージドHTTPクライアント/セッション1つが、利用可能なOmniRoute接続1つを所有します。

**目的：** リクエスト間で強固なルーティングフェンスを必要とするクライアントに、永続的な排他的接続所有権を提供します。これは、ソフトな継続性の優先であるセッションアフィニティとは異なります。排他的リースはライフサイクル状態をSQLiteに永続化し、グローバルなアクティブオーナーとアクティブ接続の一意性を強制し、プロバイダーへのディスパッチ前に古い世代を拒否します。

この機能はAPIキーごとのオプトインです。マネージドキーには `lease:exclusive` スコープと、空でない明示的な `allowedConnections` リストが必要です。どのHTTPクライアントでもライフサイクエンドポイントを使用でき、クライアント名、ユーザーエージェント、プロバイダー、OAuthメソッド、モデルは不要です。リースはモデルではなく接続を所有するため、接続が通常どおり利用可能である限り、モデルを変更してもバインディングは維持されます。通常のモデル、クォータ、ヘルス、クールダウン、許可リストのルールは引き続き優先され、同じ世代を別の空いている利用可能な接続に移行させることがあります。

ライフサイクルは `POST /api/v1/session-leases` で、JSON アクション `acquire`、`renew`、`release` を使用します。
管理対象の推論リクエストは、不透明な `X-OmniRoute-Lease-Owner` 値と完全一致する
`X-OmniRoute-Lease-Generation` を提示します。オーナーは `vlo_` の後に 43 文字の base64url 文字が続く形式で、
その SHA-256 ハッシュのみが保存されます。すべての最終ディスパッチフェンスは、認証済み API キー ID と
アクティブな接続 ID もバインドします。リース制御ヘッダーは、ログ、保持されるリクエストスナップショット、
アップストリームエグゼキュータヘッダーから削除されます。

通常のルーティングで適格な管理対象候補が存在するものの、すべての空き候補が外部のアクティブリースによって
占有されている場合、OmniRoute は HTTP `429`、lease-capacity-unavailable コード、
waiting-for-capacity 状態、および関連する最も早い有効期限から導出された上限付きの `Retry-After` を返します。
通常の適格性が空の場合はリース競合ではなく、既存のルーティングエラーセマンティクスが維持されます。

関連するメカニズムは別個のままです:

- OAuth セッション占有は、OAuth アカウントに対するプロセスローカルなソフト分散です。
- アカウントセマフォはリクエスト同時実行の許可を付与し、リクエストの完了時に終了します。
- 排他的な管理対象セッションリースは、ジェネレーションフェンスを備えた永続的なライフサイクル所有権です。

---

## 3. モデルロックアウト

**スコープ:** プロバイダー + コネクション + モデルの3つの組。

**ステータスによるキースコープ:** 失敗したステータスが、ロックアウトが書き込むキーを決定します
（`open-sse/services/accountFallback/exactModelLock.ts` の `resolveLockoutScope()`）:

- `429` / `403` / `402` — クォータまたはエンタイトルメントのシグナル — **クォータファミリー**をロック:
  codex の場合は `codex` / `spark` スコープ全体（そのコネクションのすべての `gpt-5*`
  モデル）、それ以外のプロバイダーでは `getQuotaScopedModelForProvider()`。
- `404` はベアモデルをロックします（`getModelLockKey()` が `not_found` を絞り込みます）。
- その他のステータス — `5xx` のトランスポート/サーバー障害や、品質検証から OmniRoute 自身が
  合成した `502` — は**完全一致の**
  プロバイダー/コネクション/モデルの組のみをロックします。あるモデルでの不良ストリームは
  アカウントのクォータに関する証拠ではありません。このルール以前は、
  `codex/gpt-5.6-luna` で空のレスポンスが1回発生するだけで、そのコネクションのすべての
  `gpt-5*` モデルが 2〜30 分間（エスカレートしつつ）ルーティングから外され、
  一方でクォータは無傷のままでした。
- 呼び出し側の明示的な `scope` オプションは常に優先されます（Antigravity は `"exact"` を渡します）。

**目的:** 1つのモデルが利用不可またはクォータ制限されているだけで、コネクション全体を無効化することを避けます。

**例:**

- モデルごとのクォータを持つプロバイダーが 429 を返す場合
- ローカルプロバイダーが1つの欠落モデルに対して 404 を返す場合
- プロバイダー固有のモード/モデルの権限失敗（例: Grok のモード）

**実装:** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### モデルクールダウンダッシュボード (v3.8.0)

UI: 設定 → Model Cooldowns（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

アクティブなロックアウトを次の情報とともに一覧表示します: プロバイダー、コネクション、モデル、理由、expiresAt。オペレーターはカードからモデルを手動で再有効化できます。

**REST API:**

- `GET /api/resilience/model-cooldowns` — アクティブなロックアウトの一覧
- `DELETE /api/resilience/model-cooldowns` — 手動での再有効化。ボディ: `{provider, connection, model}`。認証: management。

### クールダウンマネージャー

UI: モニタリング → Cooldown Manager（`src/app/(dashboard)/dashboard/resilience/cooldowns/`）。

一時的な理由でルーティングから外れているすべてのコネクションを、プロバイダーごとの
ページを個別に開く代わりに、1ページで扱えます。コネクションのクールダウン、モデル
ロックアウト、終端状態を一覧表示し、コネクション単位、選択単位、またはプロバイダーの
全コネクション単位でクリアできます。また、最も調整頻度の高いクールダウンルールを編集できます:
`streamStallCooldown.enabled`、および OAuth / API キーの
`connectionCooldown` の基本クールダウンと最大バックオフステップ数です
（`PATCH /api/resilience` を通じて保存）。終端状態（`banned`、`expired`、`credits_exhausted`）は
一覧表示されますが、ここでは決してクリアされません。

**REST API**（`src/lib/resilience/cooldownManager.ts`、認証: management）:

- `GET /api/resilience/cooldowns[?provider=]` — ステータス、残りクールダウン、
  バックオフレベル、最後のエラータイプ、モデルロックアウトを含むコネクション一覧（認証情報は含まない）
- `POST /api/resilience/cooldowns` — ボディ `{connectionIds: string[]}` または
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` を返す

### ロックアウト設定 UI + 成功減衰による回復 (v3.8.23)

モデルロックアウトは、常時オンのハードコードされた動作から、専用の設定カードと
自己修復の回復パスを持つ、完全に設定可能なオプトイン機能へと変わりました。

**設定カード:** 設定 → Model Lockout
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
これは上記の読み取り専用の `ModelCooldownsCard`（アクティブなロックアウトを
_一覧表示_するだけ）とは**別物**です — 新しいカードは_パラメーターを設定_します。デフォルト値は
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）にあります:

| 設定                    | デフォルト                       | 意味                                                                 |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | マスタートグル — モデルロックアウトは**デフォルトでオフ**。          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | モデルスコープの失敗としてカウントするアップストリームのステータス。 |
| `baseCooldownMs`        | `120_000` (120 秒)               | 最初の失敗時の初期ロックアウト期間。                                 |
| `maxCooldownMs`         | `1_800_000` (30 分)              | エスカレートしたクールダウンの上限。                                 |
| `maxBackoffSteps`       | `10`                             | 指数バックオフのエスカレーションの最大ステップ数。                   |
| `useExponentialBackoff` | `true`                           | 繰り返しの失敗でクールダウンを指数的にエスカレートするかどうか。     |

設定は通常の設定ストアを通じて永続化され、レジリエンス設定スキーマで検証されます。
カードは `baseCooldownMs`/`maxCooldownMs`（`maxCooldownMs ≥ baseCooldownMs` の条件付き）と
`maxBackoffSteps` をクランプします。

**成功減衰による回復:** 回復は純粋なタイマー満了**ではありません**。正常な
レスポンスはモデルの失敗カウントを段階的に戻すため、ウィンドウの途中で回復した
モデルは、タイマーが切れる前にエスカレーションを停止（そしてクリア）します。コンボ
ターゲットが成功すると、`open-sse/services/combo.ts` が `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`）を呼び出し、保存されている
`failureCount` を**半減**させます（`Math.floor(failureCount / 2)`）。それが `0` に達すると
ロックアウトエントリは完全に削除されます。対になる `recordModelLockoutFailure()`
は、エスカレーションウィンドウ内の失敗時にカウントをインクリメントし（クールダウンを
エスカレートさせ）ます。この成功減衰は通常のタイマー満了に**加えて**機能します —
どちらのパスでもモデルを再有効化できます。

**状態:** ロックアウトは**インメモリ**で保持されます（`provider:connectionId:model` をキーとする
`ModelLockoutEntry` のプロセスごとの `Map`、完全一致スコープのロックは
`provider:connectionId:exact:model` をキー）— DB には永続化されず、再起動で失われます。
_設定_は永続化されますが、アクティブなロックアウトの_状態_は揮発性です。

---

## 4. クォータシェア同時実行制御 (v3.8.36)

サブスクリプションアカウント（GLM、MiniMax など）は、多くの場合、同時リクエストを約 1〜3 件しか受け付けません。これを超えると 429 エラーやクールダウンが発生します。これは、複数の API キーが 1 つのアップストリームアカウントを共有する **クォータシェア**（`qtSd/…`）コンボでは特に深刻です。3 つのレイヤーが共有アカウントの過負荷を防ぎます。

### 接続ごとの同時実行上限（`max_concurrent`）

各プロバイダー接続は `max_concurrent` の上限を宣言できます
（`provider_connections.max_concurrent`。接続モーダル / API / DB で設定）。
制限なしにするには空のままにします。これが下記のシリアライゼーションレイヤーを
駆動する唯一の設定項目です。アカウントの実際の同時実行数に合わせて設定してください
（例: GLM は約 1、MiniMax は約 2）。

### モデルごとの同時実行上限（`modelConcurrency`）

接続はさらに、`rateLimitOverrides` マップ内でモデルごとの正確な同時実行上限を
宣言できます:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

接続モーダル（**レート制限オーバーライド → モデルごとの同時実行上限**、
1 行に 1 つの `model=cap`）で設定するか、同じ JSON 形式で
`PATCH /api/providers/[id]` を使って設定します。主なセマンティクス:

- **接続全体 vs モデル固有:** `maxConcurrent` は共有の接続全体の上限のままです。
  両方が適用される場合、両方のゲートが同じ複合ゲート
  （`global → provider → account → model`）内でアトミックに取得されます。
  実際の動作は、適用される制限のうちより厳しい方になります。
- **モデルキーの完全一致:** キーはルーティング解決後にエグゼキューターに渡される
  モデル文字列です。通常はアップストリームのモデル ID そのもの（`glm-5`）であり、
  クライアント側の `provider/model` エイリアスではありません
  （`zai/glm-5` は `glm-5` に一致しません）。値は正の整数の同時リクエスト上限です。
- **ローカルキューイング、ディスカバリなし:** 超過したリクエストは、既存の
  キュー/タイムアウトセマンティクス（型付き `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` アドミッションエラー）でローカルにキューイングされます。
  OmniRoute はアップストリームのポリシーを検出・推測しません。オペレーターが
  設定した正確な上限を強制するだけです。飽和状態のモデルゲートはプロバイダーを
  無効化せず、永続的なモデルロックアウトを作成することもありません。
  アップストリームの 429/クールダウン/フォールバック動作が引き続きエラーの
  最終防衛線となります。
- **接続ごと・プロセスごとのスコープ:** 上限はデータベース接続ごとに
  メモリ内に保持されるため、同じアップストリーム API キーを再利用する
  2 つの接続は互いに調整されません。
- **未設定は変更なしを意味する:** マップを省略する（またはダッシュボードの
  フィールドを空のままにする）場合、モデルゲートは追加されません。
  汎用的なプロバイダー制限を主張しない設定例:

```text
glm-5=1
glm-4.7=3
```

### クォータシェアのリクエストシリアライゼーション

クォータシェアディスパッチが正の `max_concurrent` を宣言する接続を対象とする場合、
その **アカウント** への同時リクエストは接続ごとのセマフォ（キー
`qsconn:<connectionId>`）を通じてシリアライズされます。超過したリクエストは
アカウントに殺到する代わりに **キューで待機** します。これは **フェイルオープン**
です。キューが飽和した場合やタイムアウトした場合でも、ディスパッチ可能な
リクエストを拒否することはなく、スロットなしで続行します。**設定 → レジリエンス →
クォータシェア接続ごとの同時実行** で切り替えます
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`、デフォルトはオン）。
`max_concurrent` 上限がない場合、動作は変更されません。

> クォータシェアルーティングゲート（`selectQuotaShareTarget`、DRR + P2C）は
> それ自体がフェイルオープンであり、上限に達した接続の _優先度を下げる_
> だけです。単一接続プールではハードリミットできないため、実際に殺到を
> 食い止めるのはこのセマフォです。

### コンボのクールダウン対応リトライ

すべてのコンボ戦略で（有効な場合）、短い一時的なクールダウンで 429 が確定する
はずのリクエストは、429 を返す代わりにクールダウンが終わるまで待機して
再ディスパッチします。これは、マルチモデルコンボでの Gemini クラスの
TPM/RPM ウィンドウ（約 60 秒の retry-after）をカバーします。たとえば、
2 モデルコンボの両方のターゲットがモデルごとのレート制限に達した場合などです。
**設定 → レジリエンス** の `comboCooldownWait`（`enabled`、`maxWaitMs`、
`maxAttempts`、`budgetMs`）で制限されます。`quota_exhausted`（午前 0 時まで
ロック）や認証/not-found の理由では決して待機しません。

同じゲートがディスパッチ前のケース（#16319）もカバーします。コンボのすべての
ターゲットが、そのモデルが短い一時的なロックアウト中であるため、試行が行われる
前にスキップされた場合、ゼロ試行パスは同じ上限の下でロックが解除されるまで
待機して再ディスパッチします。ヒントなしの `503 ALL_TARGETS_SKIPPED` を返す
代わりです。待機が許可されない場合（上限、試行回数、またはバジェットの枯渇、
あるいは機能がオフの場合）、最終レスポンスは、最も早い一時ロックの期限から
`retry_after` / `reset_at` を含む `429 rate_limit_error` にアップグレード
されます。クォータ、認証、not-found のロックはヒントなしの 503 のままです。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. リクエストキューアドミッション制御 (v3.8.49 · issue #6593)

**対象範囲**: プロバイダ+接続ごとのローカルなレート制限キュー(`open-sse/services/rateLimitManager.ts`、Bottleneck ベース)で、上記の3つの仕組みの一段下の層。

**`maxWaitMs` はキュー待機を制限し、`executionMaxWaitMs` は実行を制限する。**
この2つは意図的に分離されており、どちらも他方に値を流し込むことはない。

`resilienceSettings.requestQueue.maxWaitMs` は**キュー待機バジェット**である。プロバイダスロットを待つ時間と、その後 QUEUED 状態で待機する時間をカバーし、ジョブが QUEUED を離れて実行を開始した瞬間にタイマーはクリアされる(`rateLimitManager.ts`、`wrappedFn`)。これを超過したリクエストはアップストリームに到達しない。デフォルトは 30000ms で、`src/lib/resilience/settings.ts` の `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` から供給され、`tests/unit/ratelimit-admission-control-6593.test.ts` によって固定されている。そのため、これを変更すると、この段落が気づかれないまま陳腐化するのではなく、そのテストが赤くなる。

`resilienceSettings.requestQueue.executionMaxWaitMs` は、Bottleneck がジョブの `expiration` として受け取るもので、そのタイマーはディスパッチ後にのみ開始する。これは、自身のアップストリームタイムアウトを持たないエグゼキュータのためのバックストップであり、エグゼキュータ自身のフェッチ開始タイムアウトの方が長い場合にはそちらまで引き上げられるため、健全な進行中のレスポンスを切断することはない。デフォルトは 600000ms(10分)。

キューバジェットを `expiration` に流し込むことこそが、かつて非増分(non-incremental)ゲートウェイを実行中に強制終了させていた原因である——それらは最初のバイトを返すまでに正当にも数分間実行される——、そしてこれが、expiration が `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)として表面化するのに対し、キューバジェットはキュータイムアウトコードを持つ理由である。どちらも `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(環境変数)またはダッシュボード(**設定 → レジリエンス**)で上書きできる。両方とも正規化時に 1ms〜24時間にクランプされる。

**両方に共通の優先順位:** 環境変数は_デフォルト値_を供給するだけである。`resilienceSettings.requestQueue` に永続化された値(ダッシュボード / API パッチ、`key_value` に保存)はそれに優先し、接続ごとの `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` はさらにそれに優先する。したがって、すでに永続化された値が存在するデプロイで環境変数を設定しても何も変わらない——代わりに永続化された設定をクリアまたは更新すること。

キュー内の滞在は `maxWaitMs` によって制限され、後述の `maxQueueDepth` は同時にキューに入れられる呼び出し元の数を制限する。

**ボディ指定のリトライ: ペーシング vs ロックアウト。** 429 のボディは独自の待機時間を指定できる(Gemini の `RetryInfo.retryDelay`、"retry after Ns" というテキスト)。これは `updateFromResponseBody` が読み取る。接続の `maxWaitMs` に収まる待機はペーシングである: リミッターはその間リザーバを空にし、キューに入った呼び出しはリザーバが回復したときにディスパッチされる。`maxWaitMs` より長い待機はキューがじっと耐えられるものではない——Gemini は枯渇した日次クォータに対して `retryDelay: "86399s"` で応答する。再構築された 429 で中継される `Retry-After`(#16528)は、すでにフォールバックエンジンにその期間モデルをロックさせているが、それに対してリミッターまで一時停止させると、キーに早期に到達した呼び出し(たとえばレジリエンスリセット後)が `maxWaitMs` 全体にわたって停滞してしまう。このような待機が型付きの Google `RetryInfo` 詳細(`google_rpc_retry_info` という来歴)から来て、かつキーのリミッターがすでにモデルにスコープされている場合(`getLimiterKey` を参照)、その 429 は代わりにその接続でのモデルロックアウトになる(`open-sse/services/rateLimitManager/bodyRetryPause.ts` の `lockModelForLongBodyRetry`、上限24時間)。リミッターは一時停止されないまま残される。アカウント選択は `isModelLocked()` を介してそのロックでスキップし、その接続にピン留めされたターゲットに対するコンボの事前ディスパッチゲートも同様にスキップする。リミッターがクォータファミリーごとである antigravity では、ロックは正確なモデルに対してかかる。その他のクォータロックと同じである。エイリアスがそのモデルに解決した場合、クライアントが要求した名前もロックされる。これらのチェックは要求された名前を使うからである。それは正確にロックされる(`lockExactModel`)ため、antigravity のクォータファミリーや codex のスコープをまたぐエイリアスが自分自身をロックすることはない。散文のヒント、型のない `retryDelay`、または接続全体で共有されるリミッターの場合は、一時停止が維持される。429 パスが再構築したばかりのリミッターが一時停止する場合、残りのキュー時間が一時停止より先に終わる呼び出し元は、その時間を待ち切るのではなく、キュータイムアウトコード(`checkLimiterPause`)で即座に拒否される。記録された終了時刻は、Bottleneck がリフレッシュクロックを開始するリミッターの構築前に固定され、リザーバへの後続の変更はそれを破棄する。`tests/unit/rate-limit-long-body-retry-lockout.test.ts` と `tests/unit/rate-limit-body-retry-pause.test.ts` でカバーされている。

**`maxQueueDepth` — オプトインのアドミッション上限(新規)。** `resilienceSettings.requestQueue.maxQueueDepth` は、1つのプロバイダ+接続について同時にキューに滞在できる(まだディスパッチされていない)リクエスト数を制限する。キューがすでに `maxQueueDepth` 件のリクエストを保持している場合、新しいリクエストは `limiter.schedule()` に到達する**前**に、型付きの `code: "RATE_LIMIT_QUEUE_FULL"` エラーで高速拒否される——そのため拒否は安価であり、そのリクエストに対する下流のプロンプト圧縮/翻訳処理よりも先に行われる。デフォルトは `0` = 無効で、既存の無制限キューの動作を維持する。範囲は 0〜100000。`RATE_LIMIT_MAX_QUEUE_DEPTH`(環境変数)または `resilienceSettings.requestQueue.maxQueueDepth`(ダッシュボード/API パッチ)で上書きできる。

アドミッションチェック自体は純粋関数(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)であるため、実際の Bottleneck リミッターなしでユニットテスト可能である。

> #6593 を提起した RFC では、`bypassCompressionOnRateLimit`
> フラグも提案されていた。このリポジトリの `open-sse/services/compression/` パイプラインは、
> アウトバウンド LLM リクエストに対するプロンプト/コンテキスト圧縮（`chatCore.ts` の
> `resolveCompressionSettings`/`selectCompressionStrategy` ブロック周辺）であり、
> 合成された 429 ボディに対する HTTP レスポンス圧縮ではない — リテラルなバイパスフラグに対応するコードパスは存在しない。また、このプロンプト圧縮ステップは現在、リクエストパイプライン内で `withRateLimit()` の _前に_ 実行されるため、
> キュー満杯による拒否時にそれをスキップするよう順序を入れ替えることは、この issue のスコープよりも大きな別の変更となる。ここでは意図的に実装**せず**、CPU 削減の効果が並べ替えのリスクに見合う場合のフォローアップとして残されている。

### レート制限の自動有効化セーフティネットと接続保護 (`rateLimitProtection`)

**自動有効化セーフティネット** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`、デフォルト `true`):
デフォルトでは、OmniRoute はすべてのアクティブな API キープロバイダー接続 (`getProviderCategory(provider) === "apikey"`) に対して、レート制限キュー保護を自動的に有効化します。これにより、レート制限に敏感な上流 API キーへの受信リクエストが、上流での 429 エラーへと殺到するのではなく、Bottleneck を通じてキューイングおよびスロットリングされることが保証されます。このセーフティネットは `RATE_LIMIT_AUTO_ENABLE` 環境変数で上書きでき（`false`/`0`/`off` で無効化、`true`/`1`/`on` で強制的に有効化）、永続化されたダッシュボード設定（**設定 → レジリエンス** / `PATCH /api/resilience`）よりも優先されます。

**接続ごとの `rateLimitProtection` のセマンティクス:**
接続ごとのレート制限保護は、プロバイダー接続の `rateLimitProtection` ブール値フィールドで追跡されます（SQLite では `rate_limit_protection` として永続化されます）:

- **明示的なオン (`rateLimitProtection === true`)**: プロバイダーカテゴリや自動有効化セーフティネットがオンかどうかに関係なく、この接続に対してレート制限保護が明示的に有効化されます。
- **明示的なオフ (`rateLimitProtection === false`)**: 明示的な保護は無効化されますが、アクティブな API キー接続をグローバルな自動有効化セーフティネットからオプトアウトするわけでは**ありません**。`reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) では、`false` と `undefined` は同等であり、`rateLimitProtection === true` のみが明示的なオーバーライドとして扱われます。`rateLimitProtection` が `false`（または未設定）の場合、アクティブな API キー接続は依然として自動有効化の条件に一致し、レート制限保護が維持されます。
- **接続ごとのオプトアウトなし**: 他の接続では自動有効化をアクティブに保ちながら、「この特定のアクティブな API キー接続だけはレート制限キュー保護なしで実行する」ということを、オペレーターが現在表現する方法はありません。API キー接続をレート制限キューなしで完全に実行するには、セーフティネットをグローバルにオフにする必要があります（`RATE_LIMIT_AUTO_ENABLE=false` または `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**サポートされている書き込みパス:**

- **`POST /api/rate-limits`**: 接続の `rateLimitProtection` を切り替えるための、サポートされている管理用書き込みパス (`{ connectionId: string, enabled: boolean }`)。`enabled: true` で呼び出すと明示的な保護がオンになり、`enabled: false` で呼び出すと明示的な保護が解除されます（ただし、自動有効化がオンの場合、アクティブな API キー接続はグローバルセーフティネットの対象のままとなります）。
- **`PUT /api/providers/[id]`**: 意図的に `rateLimitProtection` を受け付けず、変更も**しません** (#11278)。`PUT /api/providers/[id]` 経由でプロバイダー接続のメタデータを更新しても、永続化されたレート制限保護の状態が変更されることは決してありません。

---

## 6. 低速ストリームのスループットウォッチドッグ (#9709)

オプションの `resilienceSettings.streamRecovery.throughputWatchdog` ガードは、
チャンクを送信し続けているものの、設定された有用出力レートを下回るアシスタント
出力しか生成していないアップストリームを検出します。これはアイドルタイムアウトとは
意図的に区別されています。ハートビートとメタデータはどちらのタイマーもリセットせず、
進捗としてもカウントされません。また、出力品質に関わらず絶対的な安全上限であり
続けるハードなアテンプトデッドライン (#9153) とも区別されています。

ウォッチドッグは、中止できるようになる前に、ウォームアップ期間とそれに続く完全な
ローリングウィンドウの経過を必要とします。Chat Completions と Responses API の
出力イベントからテキストデルタをカウントし (保守的な UTF-8 バイトのプロキシ)、
usage のみのイベントや空のイベントは無視し、ツール呼び出しや推論イベントが進行中の
間は判定を保留します。デフォルトでは無効で、
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` で有効にできます。ウィンドウ、
ウォームアップ、最小レート、最小測定可能出力は、通常の resilience 設定の正規化
レイヤーによって制約されます。

有効な場合、ウォッチドッグによる中止はアクティブなアップストリームアテンプトにのみ
適用されます。クライアントから見えるバイトがまだ送信されていない段階では、既存の
同一アカウント早期リカバリパスがアテンプトを再開する場合があります。コミット後は、
ストリームが盲目的にリプレイされることは決してありません。サフィックスを継ぎ
合わせることができるのは、既存の安全なストリーム中盤継続コントラクトだけです。
ファイナライゼーションはシングルショットのままなので、usage の計上とセマフォの
解放が重複することはありません。

---

## 7. アップストリームステータスの書き換え（誤表示されるクォータエラー）

**スコープ:** 一時的なクォータ枯渇を誤った HTTP ステータスで報告する、1 つのアップストリームゲートウェイ。

**目的:** 分類の実行前に誤解を招くステータスを修正し、下流のコンシューマー（フォールバックエンジン、コンボ集約、クライアント向けレスポンス）が障害の真のリトライ可能な性質を認識できるようにする。

一部のゲートウェイは、一時的なクォータ枯渇をリトライ不可能な HTTP ステータスで通知します。`agentrouter.org` は標準の `429` の代わりに、中国語の本文（`用户额度不足` / `额度不足`）とともに `403`（場合によっては `400`）を返します。Claude Code のようなクライアントは `403` を永続的なエラーとして扱いセッションを中断するため、修正を行わなければフォールバックエンジンはこれをクォータイベントではなく `AUTH_ERROR` として分類してしまいます。

**実装:**

- レジストリ + マッチャー: `open-sse/config/upstreamStatusRestatement.ts` — プロバイダーごとのルールリスト（`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`）で、`applyStatusRestatement()` 経由でマッチングされます。
- 呼び出し箇所: `open-sse/handlers/chatCore.ts` の `providerFailure:` ブロック（3654 行目付近）で、`parseUpstreamError()` がエラー HTTP ステータス（`!providerResponse.ok`）を持つアップストリームレスポンスをパースした直後、かつ分類が実行される前に配置されており、すべての下流コンシューマーが修正後のステータスを参照します。`200` SSE ストリーム内に埋め込まれたエラーは、別の後段のストリームパースパスをたどるため、現時点ではこのフックの対象**外**です。これは既知の制限であり、agentrouter の誤ステータス（エラー HTTP ステータスとして表面化する）に対してはまだ必要とされていません。
- リトライ適格性: `429` は `RETRY_AFTER_ELIGIBLE_STATUSES`（`open-sse/services/combo/unavailableRetryGate.ts`）に含まれるため、書き換えられたエラーは無効な `403` として表面化する代わりに、実際のリトライウィンドウを持ちます。
- 合成された `60s` の `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）は、書き換えられたレスポンスが**クライアント**に伝える値にすぎません。これ自体は接続の内部クールダウン/ロックアウト期間ではありません。それは、書き換えられたエラーを実際に処理するメカニズム（接続クールダウンのエスカレーティングバックオフ、§2、API キープロバイダーの場合はベース `3s`、または agentrouter のようなモデルごとクォータプロバイダーの場合はモデルロックアウト、§3）によって個別に管理されます。ルーターはクライアントに通知する 60 秒のウィンドウよりも早く、内部的にリトライ可能になることがあります。これは意図的な余裕であり、バグではありません。

永続的なエラー（agentrouter の `无权访问模型` — このモデルへのアクセス権なし）は決して書き換えられません。`textMarkers` がヒットした場合でも `excludeMarkers` がルールを拒否するため、エラーは元のステータスを保持し、永久にリトライされません。マッチするプロバイダー分類ルール（`open-sse/config/providerErrorRules.ts` の `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, 宣言されたベースクールダウン `6h`）は、`checkFallbackError`（`open-sse/services/accountFallback.ts`）によって、汎用の apikey カテゴリの `FORBIDDEN` 早期リターンの_前_に参照されます。これは `honorsRuleLockScope(provider)` でゲートされており（#10334 — 現在は `providerErrorRules.ts` の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストにより agentrouter 専用）、ルールで宣言された 6 時間のクールダウンは `fallbackResult.baseCooldownMs` として流れますが、それでも既存のモデルごとクォータのロックアウトパス（`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`、#10334 で変更されたのはクールダウンのソースのみ）に供給されます。他のすべてのモデルロックアウトと同様に、オペレーターの `mlSettings.maxCooldownMs`（デフォルト `1_800_000ms` / 30 分）にクランプされ、_永続化されるロックアウト理由_はルールの `"auth_error"` ではなく、既存のハードコードされた `"forbidden"` のままです。エンドツーエンドで尊重されるのはクールダウン期間のみであり、理由文字列ではありません。接続自体はアクティブのままで、同じ接続上の兄弟モデルは影響を受けません。

書き換えられたクォータエラー（`额度不足`）は、本番環境でプロバイダールール（`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, 独自の宣言クールダウンなし — 永続化レイヤーのスケールドバックオフのデフォルトが適用される）に到達します。#10334 以降、`ProviderErrorRuleMatch` の `scope` はエンドツーエンドで消費されますが、`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リスト（`providerErrorRules.ts` — 現在は `"agentrouter"` のみ、`honorsRuleLockScope()` でゲート）内のプロバイダーに**限られます**。その他のすべてのプロバイダーでは、`scope` は #10334 以前とまったく同じく、情報提供のみのままです。`checkFallbackError` はマッチしたルールのスコープを `fallbackResult.ruleScope` として表面化します。`isAgentrouterConnectionQuotaScope()`（`src/sse/services/auth.ts`）は、`ruleScope` が接続全体にわたる自己回復シグナルとして尊重しても本当に安全であることを確認する共有ガードです（スコープ `"connection"`、理由 `quota_exhausted`、決して `permanent` ではなく、決して `creditsExhausted` ではない — 将来のルールがスコープ `"connection"` を永続的なアカウント状態と組み合わせることへの防御）。これを呼び出すコンシューマーは 2 つあります:

- **永続化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）:
  パススループロバイダーの**モデル単位**ロックアウト分岐に入る代わりに
  （agentrouter は `passthroughModels: true` → `hasPerModelQuota()` が
  `true` を返す）、**一時的な接続クールダウン**を適用する ——
  `testStatus: "unavailable"` + `rateLimitedUntil` であり、終端ステータス
  （`credits_exhausted`/`banned`/`expired`）には決してならない —— そのため、
  手動での認証情報リセットを必要とせず、クールダウンが経過すれば接続は
  自己回復する。
  `disableCooling: true` の接続ではスキップされる（#2997）: そのオプトアウトは
  代わりにモデル単位のロックアウトにフォールスルーする（文書化された
  トレードオフ —— 分岐の直上のコードコメントを参照）。
- **同一リクエストのコンボルーティング**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）: 同じガードが、インメモリの
  `exhaustedConnections` セットに接続を登録する。キーは
  `${provider}:${connectionId}`。これは、_自身のターゲットオブジェクト上に
  すでにまさにその `connectionId` を持っている_ 同一リクエスト内の残りの
  ターゲットのみをスキップする（`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`、`exhaustedConnections`
  ルックアップの前の `if (provider &&
connectionId)`）—— 兄弟ターゲットが自身の
  固定された `connectionId` を持たず、ディスパッチごとにレスポンスの
  `X-OmniRoute-Selected-Connection-Id` ヘッダーから初めて解決される、
  通常のモデルリストコンボでは、そのキーマッチには決して到達しない。
  その一般的なケースでは、枯渇したばかりのアカウントを残りのレグが
  再利用することに対する本当の保護はこの Set ではない —— それは上記の
  永続化レイヤー（接続の `rateLimitedUntil` が未来の時刻になっている）と、
  同じガードがその失敗に対して `transientRateLimitedProviders` を抑制する
  ことの組み合わせである（「二段階設計」と `targetExhaustion.ts` の
  `isAgentrouterConnectionQuotaScope` 分岐のコードコメントを参照）。
  その Set がマークされないままであるため、`combo.ts` の
  `allowRateLimitedConnection` による強制許可
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）はプロバイダーの
  残りのレグには発動せず、認証情報選択の `rateLimitedUntil` フィルタ
  （`src/sse/services/auth.ts:1238`）が通常どおり尊重される。したがって、
  残りのレグは別のまだ有効な agentrouter 接続を選択するか、利用可能な
  認証情報なしで失敗する —— この分岐がクールダウンしたばかりの接続に
  強制的に戻ることはない。

### 二段階設計: ステータス再宣言、その後に分類

ステータス再宣言（`upstreamStatusRestatement.ts`）とプロバイダー分類ルール
（`open-sse/config/providerErrorRules.ts`、`providerRuleRegistry`）は、
どちらもプロバイダー ID とテキストマーカーをキーとする別個のレジストリだが、
実行される場所も目的も異なる。再宣言は `chatCore.ts` の早い段階で HTTP
ステータスを書き換える。分類ルールは `checkFallbackError()`
（`open-sse/services/accountFallback.ts`）内でフォールバックの `reason` と
ロック `scope`（`model` / `provider` / `connection`）を決定する。

分類ルールが完全なエラー**テキスト**を参照できるのは（`额度不足` のような
本文マーカーにマッチするために必要）、`providerErrorRules.ts` の
`FULL_TEXT_RULE_PROVIDERS` 許可リストに載っているプロバイダーのみである
—— 現在は `"agentrouter"` のみ。その他のすべての**ビルトインカタログ**
プロバイダーでは、`checkFallbackError` は `getProviderErrorRuleMatch` に
構造化エラー（`{code, type}`）のみを渡す。これはヘッダー/ステータス/
コードベースのルールには十分だが、本文テキストマーカーは見えない。
ヘルパー `resolveRuleMatchBody()` がこの選択を行う: 許可リストにある
プロバイダーには完全なエラーテキストを、それ以外には構造化エラーを渡す。
**ビルトイン**プロバイダーを `FULL_TEXT_RULE_PROVIDERS` に追加することは、
プロバイダーごとの明示的なオプトインである —— これは、リストにない
すべてのプロバイダーのデフォルトパスがバイト単位で変わらないようにする
ために存在する。

ルールの `scope`（`model` / `provider` / `connection`）は
`FULL_TEXT_RULE_PROVIDERS` とは別のオプトインである。
`checkFallbackError` はそれを `fallbackResult.ruleScope` として表面化する
だけであり、下流のコンシューマーが情報的ラベル以外のものとしてそれを尊重
するのは、同じファイル内の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストに
あるプロバイダーの場合のみである（`honorsRuleLockScope()` でゲート ——
現在は `"agentrouter"` のみ）。プロバイダーがその許可リストに入った後に
`scope: "connection"` マッチが実際に何をするかについては、上記の
「再宣言されたクォータエラー」を参照。

**#11104 —— オペレーター宣言ルールは両方の許可リストをバイパスする。**
オペレーターは、このファイルを編集せずに、`settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）を
通じて実行時にプロバイダーごとのルールを宣言できる。オペレータールールを
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`
（ビルトインカタログルールの**デフォルト**動作を保護するための許可リスト）
の背後にゲートすると、ルールを宣言すること自体がすでにオペレーターの
明示的なオプトインであるため、そこにすでに載っているプロバイダー以外の
すべてのプロバイダーで設定メカニズムが無力化してしまう。
`resolveRuleMatchBody()` と `honorsRuleLockScope()` はどちらも最初に
`hasOperatorRuleForProvider()` をチェックする: オペレータールールを持つ
プロバイダーは、どちらかの許可リストにも載っているかどうかに関係なく、
生のエラーテキストを受け取り、宣言された `scope` が尊重される。

**既知のギャップ —— HTTP 400 では `providerRuleRegistry` が一切参照されない。**
`checkFallbackError` の `BAD_REQUEST` 分岐は、ステータス 400 を完全に独自の
パターン配列（`accountFallback.ts` の `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` など）で分類し、その上にある
`configuredRule`/`getProviderErrorRuleMatch` 分岐に到達する前にリターンする。
`status: 400` のビルトインカタログルール（またはオペレータールール）は
構文的には有効だが、発動することは決してない。現在 400 を対象とする既存
ルールはないため、本番環境への影響はない —— しかし、将来の 400 ルールには
この分岐を先に変更する必要があり、それはルール追加よりも大きな変更であり
（パターン配列の動作にすでに依存しているすべてのプロバイダーについて
400 を再分類する）、単一プロバイダーのルール追加のスコープ外である。

### クォータを誤って報告するゲートウェイの追加

1. `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）にルール配列を 1 つ登録する。
   `textMarkers` はプロバイダ固有のものに保ち、
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）と衝突するような
   汎用的な英語フレーズは決して再利用しないこと。
2. 必要に応じて `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）に
   分類ルールを登録し、適切なロックスコープ（アカウント全体のクォータには
   `connection`、モデル単位のエラーには `model`）を選択する。このステップは、
   ルールがエラー全文（ボディマーカー）を必要とするプロバイダの場合にのみ本番環境で
   有効になる：同じファイル内の `FULL_TEXT_RULE_PROVIDERS` にプロバイダ ID を追加すること
   — さもなければ `checkFallbackError` はルールに構造化された
   `{code, type}` エラーしか渡さず、ボディテキストのルールは実際のトラフィックに
   決してマッチしない。`status`/`headers` のみでマッチするルール
   （Opencode や Minimax のものなど）はこのオプトインを必要としない。別途、ルールが
   `scope: "connection"` を宣言し、その意図が実際の接続全体のクールダウンと
   同一リクエストでのコンボスキップ（単なる情報的なラベルではない）である場合は、
   同じファイル内の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` にプロバイダ ID を追加すること
   — これが `markAccountUnavailable()`（`src/sse/services/auth.ts`）および
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）における
   `isAgentrouterConnectionQuotaScope()` 形式の消費をゲートするものである。
   これがなければ、`scope` は `fallbackResult.ruleScope` を通じて流れ続けるが、
   それに基づいて動作するものは何もない。
3. `tests/unit/upstream-status-restatement.test.ts`
   および `tests/unit/agentrouter-error-rules.test.ts` を模倣したユニットテストを追加する
   （not-permanent / not-creditsExhausted のガードを含み、プロバイダが
   許可リストを必要とする場合は、`resolveRuleMatchBody()` がそのプロバイダに対して
   のみ全文を返すことをアサートするテストも含める）。

`chatCore.ts`、`classifyError`、コンボへの変更は不要。

#### エグレスバケット型ロック（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS`（opencode ファミリー）内のプロバイダは
IP バケット型のアップストリームとして扱われる（opencode の無料ティアは
アカウントバケット型ではなく IP バケット型である — #9611 を参照）：ステータス 429 が
`quota_exhausted` **または** `rate_limit_exceeded` に分類された場合、ローテーションが
それらを試行する前に、最後に既知のエグレス IP が失敗した接続のものと一致する
許可リストファミリーのすべての接続をクールダウンする
— これにより、N-1 回の必ず失敗するアップストリーム呼び出しを回避する
（#10460/#10525 と同じ形）。
`rate_limit_exceeded` が含まれているのは意図的である：`markAccountUnavailable`
パスでは opencode 固有のルールは決してマッチしない（`checkFallbackError` に
ヘッダーもボディも渡されず、opencode は `FULL_TEXT_RULE_PROVIDERS` に含まれていない）
ため、ボディにサブスクリプションクォータのテキスト（"monthly usage limit
reached"）を含む 429 は、`status_429` ルールに到達する前に、クォータテキストの
フォールバック（`buildSubscriptionQuotaFallback`、`accountFallback.ts`、1 時間の
クールダウン）によって `quota_exhausted` に分類される — 一方、クォータテキストのない
429（単純なレート制限）は `status_429` ルールによって `rate_limit_exceeded` に
分類され、それでも IP ファミリーをクールダウンする。許可リストに含まれる
プロバイダにとって、IP バケット型のレート制限は枯渇したクォータと同じシグナルである。
既知の制限：

- **ベストエフォート**: ロックは接続の最後に既知の `egress_ip` を
  `proxy_logs` から解決します(24時間ウィンドウ、同期、キャッシュなし)。
  コールドキャッシュ(egress IP が一度もプローブされていない)または行が
  存在しない場合 → 失敗した接続はブランチによって引き続きクールダウン
  されます(現状通り記録されます)が、兄弟はロックされません。
- **終端状態にはならない**: クールダウンは更新されるクォータウィンドウ
  です(`testStatus: "unavailable"`)。IP レベルのシグナルから永続的な
  状態が導出されることはありません。`disableCooling` の接続はこの
  ブランチを完全にスキップします。
- **許可リスト対象ファミリーのロック粒度の変更**: これはスコープの変更
  であり、単なる兄弟の最適化ではありません。opencode は
  `passthroughModels` プロバイダーであるため、このブランチ以前は 429 が
  モデル単位のロックアウトを発生させていましたが、現在は接続の
  クールダウンを発生させます — 兄弟がまったく存在しない単一接続を運用
  しているオペレーターの場合も含めて。これは opencode のルールテーブルが
  すでに正しいと宣言している粒度です(`scope: "connection"`、
  `providerErrorRules.ts`)。opencode が
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` に含まれていないため、これまで一度も
  尊重されていませんでした。ブランチは失敗した接続のクールダウン +
  `backoffLevel` を自ら書き込み、接続スコープの agentrouter ブランチを
  ミラーして return します — モデル単位のブロックと後続の汎用パスには
  到達しません。
- **コンボも対象**: agentrouter ブランチと同様に、このスコープはコンボの
  呼び出し元が 429 に適用する `persistUnavailableState`/`isCombo` の
  ダウングレードを意図的に無視します。モデル単位のロックアウトはこの
  スコープの弱い形ではなく、間違った単位です。枯渇した IP については
  何も示さないため、コンボローテーションは兄弟ごとに失敗が確定している
  呼び出しを1回ずつ浪費し続けることになります。
- **兄弟の安全性**: すでに終端状態(banned/credits_exhausted)にある
  兄弟、またはすでにより長いクールダウン中の兄弟が上書きされることは
  ありません。
- **排他的な許可リスト**: `EGRESS_BUCKETED_LOCK_PROVIDERS` の拡大は
  明示的なオーナーの決定です。汎用的な配線はありません
  (パターン #10334/#10419)。兄弟クエリは、それを SQL リテラルとして
  繰り返すのではなく同じ許可リストをバインドするため、拡大は1行の
  変更のままです。
- **Egress IP ローテーション、双方向**: ルックアップウィンドウ(24時間)
  は egress-IP キャッシュ TTL(5分)よりはるかに広いため、「最後に既知の
  IP」は現在の状態ではなく履歴です。接続のプロキシがウィンドウ内で
  ローテーションした場合、ロックは真に共有されている IP を**見逃す**
  可能性があります(記録されている IP は新しい、枯渇していないものです)
  — 対称的に、枯渇した IP から**その後ローテーションで離れた兄弟を
  クールダウンする**可能性もあります。後者の場合、その兄弟は1回分の
  クールダウンウィンドウを犠牲にします。どちらも履歴ベースのルックアップ
  における許容されたベストエフォートの限界です。
- **コスト**: `proxy_logs` の2回の有界スキャン(`idx_pl_timestamp` で
  ウィンドウフィルタリング)、429 の発生頻度でのみ。新しいインデックスは
  なし(マイグレーション 134 は YAGNI)。中規模の実トラフィック DB コピー
  で測定済み。高スループットのインスタンスでは、同じウィンドウ内に比例
  して多くの行が保持されます。

---

## その他のレジリエンス機能

- **21 のルーティング戦略**(priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、expiry-first、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline)— [AUTO-COMBO.md](../routing/AUTO-COMBO.md) を参照。
- **リセット認識ルーティング**(v3.8.0)— クォータのリセット時刻に基づいて接続を優先順位付けします。
- **バックグラウンドモードのデグレード** — Responses API の `background: true` は警告付きで同期実行にデグレードされます。
- **動的ツール制限検出** — ツール数の制限に達した際にプロバイダーをバックオフします。
- **緊急フォールバック** — `OMNIROUTE_EMERGENCY_FALLBACK` で制御されます。運用者は再起動なしで Feature Flags ページから上書きできます。

---

## デバッグ

- Weighted コンボが `503 all_targets_cooling_down` を返す(`Retry-After` が設定され、`diagnostics.excluded` に `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` を含むすべてのターゲットが列挙される)→ プールは設定・接続済みであり、すべてのターゲットがレジリエンスタイマーによって除外されているだけです。`[COMBO] Weighted selection: every target excluded before dispatch — …` という警告に理由と残り秒数が示されます。同じコンボからの `404 no_executable_targets` は、レジリエンスタイマーが関与していないこと(実行するものがない、またはすべてのアカウントが可用性プローブに失敗した)を意味します。`targetResolution.ts` で収集された除外情報から `open-sse/services/combo/pinRecovery.ts` で構築されます。
- プロバイダーのすべてのキーがスキップされる → サーキットブレーカーの状態と各接続の `rateLimitedUntil`/`testStatus` の両方を確認してください。
- リセットウィンドウ後もプロバイダーが永久に除外される → `getStatus()`/`canExecute()` ではなく生の `state` を読み取っているコードが原因です。
- 1 つのキーが失敗し、他は動作すべき → サーキットブレーカーより接続クールダウンを優先してください。
- 1 つのモデルのみが失敗する → 接続クールダウンよりモデルロックアウトを優先してください。
- 状態が自己回復すべきなのに回復しない → 未来のタイムスタンプと、期限切れ状態を更新する読み取りパスを確認してください。永続的なステータスには手動での変更が必要です。

---

## ランタイム状態 — エージェント向けクイックリファレンス

> エージェントガイドが 40k のコンテキスト予算内に収まるよう、`AGENTS.md` の「Resilience Runtime State」から
> そのまま移動しました (PR #12743)。これは上記セクションの要約されたエージェント向けビューであり、
> 番号付きセクションが完全なリファレンスのままです。

OmniRoute には、関連しつつも明確に異なる 3 つの一時的障害メカニズムがあります。ルーティング動作を
デバッグする際は、それらのスコープを区別してください。一目でわかるマップについては
[3 層レジリエンス図](../diagrams/exported/resilience-3layers.svg)
(ソース: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
を参照してください。

### プロバイダーサーキットブレーカー

**スコープ**: プロバイダー全体、例: `glm`、`openai`、`anthropic`。

**目的**: アップストリーム/サービスレベルで繰り返し障害を起こしているプロバイダーへのトラフィック送信を停止し、
1 つの不健全なプロバイダーがすべてのリクエストを遅延させないようにします。

**実装**:

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- チャットゲート/実行の配線: `src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- ランタイムステータス API: `src/app/api/monitoring/health/route.ts`
- 共有ラッパー: `open-sse/services/accountFallback.ts`
- 永続化された状態テーブル: `domain_circuit_breakers`

**状態**(4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: 通常のトラフィックが許可されます。
- `DEGRADED`: 早期警告帯 — 障害がデグレード閾値を超えましたが、ブレーカー閾値にはまだ達していません。
  トラフィックは引き続き流れ、ダッシュボードに警告が表示されます。有効な接続テスト、または
  新たな障害のない静寂なウィンドウにより `CLOSED` に戻ります
  (ウィンドウについては `docs/architecture/RESILIENCE_GUIDE.md` を参照)。
- `OPEN`: プロバイダーが一時的にブロックされます。呼び出し元は provider-circuit-open レスポンスを
  受け取るか、コンボルーティングが別のターゲットにスキップします。
- `HALF_OPEN`: リセットタイムアウトが経過しました。プローブリクエストを許可します。成功するとブレーカーが
  閉じ、失敗すると再び開きます。

**デフォルト**(`open-sse/config/constants.ts` → `PROVIDER_PROFILES`、`src/lib/resilience/settings.ts` の
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` を介して消費され、
`src/sse/handlers/chatHelpers.ts` の `getCircuitBreaker(provider, …)` に渡されます)。
プロバイダー全体のブレーカーは `circuitBreakerThreshold` / `circuitBreakerReset` で動作します:

| プロファイル | デグレード開始 | オープン (`circuitBreakerThreshold`) | リセット (`circuitBreakerReset`) |
| ------------ | -------------: | -----------------------------------: | -------------------------------: |
| OAuth        |            `5` |                                  `8` |                            `60s` |
| API キー     |            `7` |                                 `12` |                            `30s` |
| ローカル     |         (導出) |                                  `2` |                            `15s` |

`PROVIDER_PROFILES` は `providerFailureThreshold`(10/15/2)、
`providerFailureWindowMs`(15/30/5 分)、`providerCooldownMs`(5/10/1 分)も定義しています。これらは
**オプトインのグローバルプロバイダークールダウンのウィンドウゲート**(`PROVIDER_COOLDOWN_ENABLED`、デフォルト
オフ)を駆動します — `open-sse/services/providerCooldownTracker.ts` のプロバイダーレベルのエントリは、
`providerFailureWindowMs` 以内に `providerFailureThreshold` 回の障害があった後にのみ
クーリング中とみなされ、その後 `providerCooldownMs` の間クールダウンします。これらは稼働中のブレーカーの閾値
ではありません — ブレーカーの動作を期待してこれらを調整しないでください。すべてのデフォルトは
`OMNIROUTE_PROVIDER_BREAKER_*` および `OMNIROUTE_CIRCUIT_BREAKER_*` 環境変数で上書き可能です。
ランタイムに正確なリファレンステーブルは `docs/architecture/RESILIENCE_GUIDE.md` にあります。

プロバイダーブレーカーをトリップすべきなのは、プロバイダーレベルの障害ステータスのみです:

```ts
(408, 500, 502, 503, 504);
```

ほとんどの `401`、`403`、`429` のような通常のアカウント/キー/モデルエラーでは、
プロバイダー全体のブレーカーをトリップしないでください。それらは通常、接続クールダウンまたは
モデルロックアウトに属します。汎用 API キープロバイダーの `403` は、終端的な
プロバイダー/アカウントエラーとして分類されない限り、回復可能であるべきです。

ブレーカーはバックグラウンドタイマーではなく、遅延（lazy）リカバリを使用します。`OPEN` の有効期限が切れると、`getStatus()`、`canExecute()`、`getRetryAfterMs()` などの読み取りによって状態が `HALF_OPEN` に更新されるため、ダッシュボードやコンボ候補ビルダーが期限切れのプロバイダーを永久に除外し続けることがありません。

### コネクションクールダウン

**スコープ**: 1つのプロバイダーコネクション/アカウント/キー。

**目的**: 不良なキー/アカウントを一時的にスキップしつつ、同じプロバイダーの他のコネクションがリクエストの処理を継続できるようにします。

**実装**:

- 書き込み/更新パス: `src/sse/services/auth.ts::markAccountUnavailable()`
- アカウントの選択/フィルタリング: `src/sse/services/auth.ts::getProviderCredentials...`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

プロバイダーコネクションの重要なフィールド:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

アカウント選択中、次の条件が成り立つ間、コネクションはスキップされます:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

クールダウンも遅延（lazy）方式です: `rateLimitedUntil` が過去の時刻になると、そのコネクションは再び選択可能になります。使用に成功すると、`clearAccountError()` が `testStatus`、`rateLimitedUntil`、エラーフィールド、および `backoffLevel` をクリアします。

デフォルトのコネクションクールダウンの動作:

- OAuth の基本クールダウン: `5s`。
- APIキーの基本クールダウン: `3s`。
- APIキーの `429` では、利用可能な場合、アップストリームのリトライヒント（`Retry-After`、リセットヘッダー、またはパース可能なリセットテキスト）を優先する必要があります。
- 繰り返される回復可能な失敗には指数バックオフを使用します:

```ts
baseCooldownMs * 2 ** failureIndex;
```

サンダリングハード対策ガードにより、同じコネクションでの同時発生した失敗がクールダウンを繰り返し延長したり、`backoffLevel` を二重にインクリメントしたりすることを防ぎます。

終端状態はクールダウンではありません。`banned`、`expired`（`EXPIRED_RETRY_MAX` による N 回の制限付きリトライの後にのみ終端となる）、および `credits_exhausted` は、認証情報/設定が変更されるか、オペレーターがリセットするまで利用不可のままとなることを意図しています。終端状態を一時的なクールダウン状態で上書きしないでください。

### モデルロックアウト

**スコープ**: プロバイダー + コネクション + モデル。

**目的**: あるコネクションで1つのモデルだけが利用不可またはクォータ制限されている場合に、コネクション全体を無効化することを回避します。

例:

- モデルごとのクォータを持つプロバイダーが `429` を返す場合。
- ローカルプロバイダーが存在しない1つのモデルに対して `404` を返す場合。
- 選択された Grok モードのような、プロバイダー固有のモード/モデル権限の失敗。

モデルロックアウトは `open-sse/services/accountFallback.ts` に実装されており、同じコネクションが他のモデルの処理を継続できるようにします。

### デバッグガイダンス

- プロバイダーのすべてのキーがスキップされる場合は、プロバイダーブレーカーの状態と各コネクションの `rateLimitedUntil`/`testStatus` の両方を確認してください。
- リセットウィンドウの経過後もプロバイダーが永久に除外されているように見える場合は、コードが `getStatus()`/`canExecute()` を使わずに生の `state` を読み取っていないか確認してください。
- 1つのプロバイダーキーが失敗しても他のキーが動作するはずの場合は、プロバイダーブレーカーよりもコネクションクールダウンを優先してください。
- 1つのモデルだけが失敗する場合は、コネクションクールダウンよりもモデルロックアウトを優先してください。
- 状態が自己回復すべき場合は、将来のタイムスタンプ/リセットタイムアウトと、期限切れの状態を更新する読み取りパスを持つ必要があります。永続的なステータスには、手動による認証情報または設定の変更が必要です。

---

## TLS フィンガープリンティングとステルス

プロバイダー固有のステルス（JA3/JA4、CCH、難読化）は別途ドキュメント化されています — `docs/security/STEALTH_GUIDE.md` を参照してください（git にあり、`/docs` にはコンパイルされません）。

---

## レジリエンステスト（Phase 8 · Block C）

レジリエンスロジックのユニットテストに加え、3 つのテストが実際のストレス/障害条件下でランタイムを検証します（すべて統合/ナイトリーテスト — PR をブロックするものはありません）：

| テスト      | 内容                                                                                                                                                                                                                        | 実行                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Chaos       | フェイクアップストリームノードが実際のレイテンシ/リセット/タイムアウト/503 を注入し、サーキットブレーカーが開放/回復すること、および `checkFallbackError` が 503 を回復可能なフォールバックとして分類することを検証します。 | `RUN_CHAOS_INT=1 npm run test:chaos`         |
| Heap-growth | `--expose-gc` 下で `createSSEStream` あたり約 500 ストリームを実行；ヒープが上限を超えて増大した場合に失敗します（OOM ガード #3069）。                                                                                      | `npm run test:heap`                          |
| k6 soak     | `/api/monitoring/health` に対する持続的な負荷；p95/エラーしきい値。                                                                                                                                                         | `k6 run tests/load/k6-soak.js`（ナイトリー） |

`.github/workflows/nightly-resilience.yml`（cron + dispatch）によってオーケストレーションされます。デフォルトの `test:integration` では、chaos とヒープのテストは自己スキップします（`RUN_CHAOS_INT`/`--expose-gc` がない場合）。

---

## 関連項目

- [アーキテクチャガイド](./ARCHITECTURE.md) — システムアーキテクチャと内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — プロバイダー、コンボ、CLI 統合
- [自動コンボエンジン](../routing/AUTO-COMBO.md) — 16 因子スコアリング、モードパック
