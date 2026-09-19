# Resilience Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute には、互いに関連しつつも異なる 3 つのレジリエンス機構があります。それぞれ対象範囲と目的が異なります。ルーティング動作をデバッグする際は、これらを分けて考えてください。

![3 層のレジリエンスモデル](../diagrams/exported/resilience-3layers.svg)

> 出典: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. プロバイダーサーキットブレーカー

**対象範囲:** プロバイダー全体（例: `glm`、`openai`、`anthropic`）。

**目的:** アップストリームまたはサービスレベルで繰り返し障害が発生しているプロバイダーへのトラフィック送信を停止します。

**実装:**

- コアクラス: `src/shared/utils/circuitBreaker.ts`
- 配線: `src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- ステータス API: `GET /api/monitoring/health`
- リセット API: `POST /api/resilience/reset`
- ラッパー: `open-sse/services/accountFallback.ts`
- DB テーブル: `domain_circuit_breakers`

**状態:**

- `CLOSED` — 通常のトラフィックを許可
- `DEGRADED` — トラフィックは引き続き許可するが、増加したプロバイダー障害を追跡
- `OPEN` — プロバイダーを一時的にブロックし、コンボルーティングではスキップ
- `HALF_OPEN` — リセットタイムアウトが経過し、プローブリクエストを許可

**設定可能なデフォルト値（`open-sse/config/constants.ts`、Dashboard → Settings → Resilience で公開）:**

| クラス   | 縮退への移行 | オープンへの移行 | リセットタイムアウト |
| -------- | ------------ | ---------------- | -------------------- |
| OAuth    | 5 回の失敗   | 8 回の失敗       | 60s                  |
| API キー | 7 回の失敗   | 12 回の失敗      | 30s                  |
| ローカル | 算出値       | 2 回の失敗       | 15s                  |

`degradationThreshold` はプロバイダーが `DEGRADED` に移行するタイミングを制御し、`failureThreshold` はプロバイダーがオープンになってスキップされるタイミングを制御します。ローカルプロバイダーのプロファイルは、現時点では Resilience 設定ページに表示されません。

**トリップコード:** プロバイダーレベルのステータス `[408, 500, 502, 503, 504]` のみ。アカウントレベルのエラー（大部分の 401/403/429）ではトリップさせないでください。これらはクールダウンまたはロックアウトの対象です。

**遅延回復:** `OPEN` の有効期限が切れると、`getStatus()`、`canExecute()`、`getRetryAfterMs()` が状態を `HALF_OPEN` に更新します。バックグラウンドタイマーは不要です。

---

### オプトインのグローバルプロバイダークールダウン（ウィンドウゲート）

第 4 の**オプトイン**レイヤー（`PROVIDER_COOLDOWN_ENABLED`、デフォルトでは**オフ**）は、
失敗したプロバイダーのリクエスト間メモリを
`open-sse/services/providerCooldownTracker.ts` に保持し、コンボターゲットの
解決時に参照します。これにより、連続するコンボリクエストが、直前に失敗した
プロバイダーを再び走査しなくなります。プロバイダーレベルのエントリは、
`PROVIDER_PROFILES` のウィンドウゲートに従います。

| プロファイル | トリップ条件 (`providerFailureThreshold`) | 期間内 (`providerFailureWindowMs`) | クールダウン時間 (`providerCooldownMs`) |
| ------------ | ----------------------------------------: | ---------------------------------: | --------------------------------------: |
| OAuth        |                                      `10` |                            `15min` |                                  `5min` |
| API キー     |                                      `15` |                            `30min` |                                 `10min` |

しきい値未満では、プロバイダーはクールダウン中とは見なされません。成功すると
ウィンドウがクリアされます。接続レベルのエントリ（`provider:connectionId`）では、
代わりに指数関数的な `minRetryCooldownMs → maxRetryCooldownMs` バックオフが維持されます。オーバーライド:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
リグレッションガード: `tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 接続クールダウン

**スコープ:** 単一のプロバイダー接続／アカウント／キー。

**目的:** 同じプロバイダーの他の接続でサービスを継続しながら、問題のあるキーを1つスキップする。

**実装:**

- 利用不可としてマーク: `src/sse/services/auth.ts::markAccountUnavailable()`
- 選択: 同じファイル内の `getProviderCredentials*`
- クールダウン計算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 設定: `src/lib/resilience/settings.ts`

**接続ごとのフィールド:**

- `rateLimitedUntil` — クールダウンが終了するまでのタイムスタンプ
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数バックオフカウンター

**デフォルトのクールダウン:**

- OAuthの基本値: 5秒
- APIキーの基本値: 3秒
- APIキーの429: アップストリームの`Retry-After`／リセットヘッダー／解析可能なリセット時刻テキストを優先
- バックオフ: `baseCooldownMs * 2 ** failureIndex`

**サンダリングハード防止ガード:** 同時発生した失敗によってクールダウンが過度に延長されたり、`backoffLevel`が二重にインクリメントされたりすることを防ぐ。

**終端状態（クールダウンではない）:**

- `banned` — 禁止キーワード／アカウントBAN検出（[BAN_DETECTION](../security/BAN_DETECTION.md)を参照）、およびアップストリームによるリクエスト単位の拒否が3回連続した場合（`request_rejected`、例: Anthropic OAuthの403「Request not allowed」— `open-sse/services/requestRejectedStreak.ts`）に設定される。1回の拒否では接続がクールダウンされるだけである
- `expired`（回数制限付きの再試行後に終端状態へ移行する。`EXPIRED_RETRY_MAX = 3`で指数バックオフを使用するため、一時的なOAuthエラーはアカウントが恒久的に無効化される前に自己回復できる）
- `credits_exhausted`

これらは、認証情報が変更されるか、運用者がリセットするまで保持される。終端状態を一時的なクールダウン状態で上書きしてはならない。

**遅延回復:** `rateLimitedUntil`を過ぎると、接続は再び利用可能になる。使用に成功すると、`clearAccountError()`がすべてのエラーフィールドをクリアする。

### セッションアフィニティ（#7274）

**スコープ:** **任意の**プロバイダーについて、1つの接続に固定された1つのクライアントセッション（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`ヘッダー）。

**目的:** マルチターンエージェント（Claude Code、aider、カスタムエージェント）をリクエスト間で同じアカウントに維持し、アカウント単位のセッション状態を持つプロバイダーにおける、アカウント間のコンテキスト損失とコールドスタート時の429の繰り返しを軽減する。

**実装:**

- TTLの解決: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 固定先の選択／作成: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ヘッダー抽出（汎用、任意のプロバイダー）: `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 永続化された固定先テーブル: `sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 設定: `sessionAffinityTtlMs`（ミリ秒単位のグローバルTTL。`0`で無効化）— `src/lib/db/settings.ts`。マイグレーション`124_generic_session_affinity_ttl.sql`により、Codex専用だった`codexSessionAffinityTtlMs`から名前が変更され、以前に設定されたCodexのTTLが新しいデフォルトとして引き継がれる。

#7274より前は、`resolveSessionAffinityTtlMs()`が`codex`以外のすべてのプロバイダーで即座に`0`を返していたため、固定メカニズムとヘッダー抽出がすでにプロバイダー非依存であったにもかかわらず、TTL設定（およびセッションヘッダー）は他では一切効果がなかった。この修正により、その早期リターンが削除された。TTLをグローバルに`0`より大きい値へ設定すると、すべてのプロバイダーに一律に適用されるようになった。

3つのセッションアフィニティヘッダーがアップストリームへ転送されることはない。エグゼキューターはクライアントヘッダーをそのまま渡すのではなく、独自のアップストリームヘッダーをゼロから構築するため、これは内部相関IDとしてのみ使用される。

### 排他的なマネージドセッション接続リース

**スコープ:** 1つのアクティブなマネージドHTTPクライアント／セッションが、適格なOmniRoute接続を1つ所有する。

**目的:** リクエスト間で厳格なルーティング境界を必要とするクライアントに、永続的かつ排他的な接続所有権を提供する。これは、ソフトな継続性の優先設定であるセッションアフィニティとは異なる。排他的リースはライフサイクル状態をSQLiteに永続化し、アクティブな所有者およびアクティブな接続のグローバルな一意性を強制し、プロバイダーへのディスパッチ前に古い世代を拒否する。

この機能はAPIキーごとのオプトインである。マネージドキーには`lease:exclusive`スコープと、明示的で空ではない`allowedConnections`リストが必要である。どのHTTPクライアントでもライフサイクルエンドポイントを使用できる。クライアント名、ユーザーエージェント、プロバイダー、OAuth方式、モデルはいずれも必要ない。リースが所有するのはモデルではなく接続であるため、接続が通常どおり適格である限り、モデルを変更してもバインディングは維持される。通常のモデル、クォータ、ヘルス、クールダウン、許可リストのルールは引き続き優先され、同じ世代を別の空いている適格な接続へ移行させる場合がある。

ライフサイクルは`POST /api/v1/session-leases`で、JSONアクションとして`acquire`、`renew`、`release`を使用する。マネージド推論リクエストでは、不透明な`X-OmniRoute-Lease-Owner`値と、正確な`X-OmniRoute-Lease-Generation`を提示する。所有者の値は`vlo_`に43文字のbase64url文字列を続けた形式であり、そのSHA-256ハッシュのみが保存される。最終的な各ディスパッチ境界では、認証済みAPIキーIDとアクティブ接続IDも紐付けられる。リース制御ヘッダーは、ログ、保持されたリクエストスナップショット、アップストリームのエグゼキューターヘッダーから削除される。

通常のルーティングに適格なマネージド候補が存在するものの、空いている候補がすべて他者のアクティブなリースによって占有されている場合、OmniRouteはHTTP `429`、リース容量利用不可コード、容量待機状態、および関連する最短の有効期限から算出した上限付き`Retry-After`を返す。通常の適格候補なしはリース競合ではなく、既存のルーティングエラーのセマンティクスが維持される。

関連するメカニズムは引き続き別個のものとして扱われる:

- OAuthセッション占有は、OAuthアカウントを対象としたプロセスローカルなソフト分散である。
- アカウントセマフォはリクエスト同時実行の許可を付与し、リクエストの完了時に終了する。
- 排他的なマネージドセッションリースは、世代境界を伴う永続的なライフサイクル所有権である。

---

## 3. モデルロックアウト

**スコープ:** プロバイダー + 接続 + モデルの組み合わせ。

**ステータスごとのキースコープ:** 失敗時のステータスによって、ロックアウトの書き込み先キーが決まります（`open-sse/services/accountFallback/exactModelLock.ts` の `resolveLockoutScope()`）。

- `429` / `403` / `402` — クォータまたは利用資格を示すシグナル — **クォータファミリー**をロックします。codex の場合は接続の `codex` / `spark` スコープ全体（その接続のすべての `gpt-5*` モデル）、その他のプロバイダーの場合は `getQuotaScopedModelForProvider()` です。
- `404` はモデル自体をロックします（`getModelLockKey()` が `not_found` のスコープを絞り込みます）。
- その他のステータス — `5xx` のトランスポート／サーバー障害、および品質検証によって OmniRoute 自身が生成する `502` — は、プロバイダー／接続／モデルの**完全一致**の組み合わせのみをロックします。あるモデルの不正なストリームは、アカウントのクォータに問題があることの根拠にはなりません。このルールが導入される前は、`codex/gpt-5.6-luna` で空のレスポンスが1回発生しただけで、その接続のすべての `gpt-5*` モデルが、クォータが減っていないにもかかわらず、ルーティングから2～30分間（段階的に延長）除外されていました。
- 呼び出し元が明示的に指定した `scope` オプションが常に優先されます（Antigravity は `"exact"` を渡します）。

**目的:** 1つのモデルだけが利用不能またはクォータ制限中である場合に、接続全体が無効化されることを防ぎます。

**例:**

- モデル単位のクォータを持つプロバイダーが 429 を返す場合
- ローカルプロバイダーが、存在しない1つのモデルに対して 404 を返す場合
- プロバイダー固有のモード／モデル権限エラー（例: Grok のモード）

**実装:** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### モデルクールダウンダッシュボード (v3.8.0)

UI: 設定 → モデルクールダウン（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

有効なロックアウトを、プロバイダー、接続、モデル、理由、expiresAt とともに一覧表示します。オペレーターはカードからモデルを手動で再有効化できます。

**REST API:**

- `GET /api/resilience/model-cooldowns` — 有効なロックアウトの一覧を取得
- `DELETE /api/resilience/model-cooldowns` — 手動で再有効化。本文: `{provider, connection, model}`。認証: 管理。

### ロックアウト設定 UI + 成功時の減衰による回復 (v3.8.23)

モデルロックアウトは、常時有効のハードコードされた動作から、専用の設定カードと自己修復型の回復経路を備えた、完全に設定可能なオプトイン機能へと変更されました。

**設定カード:** 設定 → モデルロックアウト
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
これは、上記の読み取り専用 `ModelCooldownsCard`（有効なロックアウトを_一覧表示_するだけ）とは**別のもの**であり、新しいカードでは_パラメーターを設定_します。デフォルト値は `DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）に定義されています。

| 設定                    | デフォルト                       | 意味                                                               |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | マスタートグル — モデルロックアウトは**デフォルトでオフ**です。    |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | モデルスコープの失敗としてカウントされる上流ステータス。           |
| `baseCooldownMs`        | `120_000` (120秒)                | 最初の失敗に対する初期ロックアウト期間。                           |
| `maxCooldownMs`         | `1_800_000` (30分)               | 段階的に延長されるクールダウンの上限。                             |
| `maxBackoffSteps`       | `10`                             | 指数バックオフの最大延長ステップ数。                               |
| `useExponentialBackoff` | `true`                           | 失敗の繰り返しによってクールダウンを指数関数的に延長するかどうか。 |

設定は通常の設定ストアを通じて永続化され、レジリエンス設定スキーマによって検証されます。カードでは `baseCooldownMs`／`maxCooldownMs`（`maxCooldownMs ≥ baseCooldownMs`）および `maxBackoffSteps` の値が許容範囲内に制限されます。

**成功時の減衰による回復:** 回復は単なるタイマーの期限切れだけではありません。正常なレスポンスが返るとモデルの失敗回数が段階的に減少するため、期間の途中で回復したモデルは、タイマーが切れる前にエスカレーションを停止し、ロックアウトが解除されます。組み合わせ対象へのリクエストが成功すると、`open-sse/services/combo.ts` が `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`）を呼び出し、保存されている `failureCount` を**半分**にします（`Math.floor(failureCount / 2)`）。`0` に達すると、ロックアウトエントリは完全に削除されます。対になる `recordModelLockoutFailure()` は、エスカレーション期間内に失敗が発生した場合にカウントを増やし、クールダウンを延長します。この成功時の減衰は、通常のタイマー期限切れに加えて機能します。どちらの経路でもモデルを再有効化できます。

**状態:** ロックアウトは DB に永続化されず、**インメモリ**で保持されます（`provider:connectionId:model` をキーとする `ModelLockoutEntry` のプロセス単位の `Map`、完全一致スコープのロックは `provider:connectionId:exact:model`）。そのため、再起動すると失われます。_設定_は永続化されますが、有効なロックアウトの_状態_は一時的です。

---

## 4. クォータ共有の同時実行制御 (v3.8.36)

サブスクリプションアカウント（GLM、MiniMax など）では、多くの場合、同時に受け付けられる
リクエストは約1～3件に限られます。これを超えると、429やクールダウンが発生します。これは、
複数のAPIキーが1つの上流アカウントを共有する**クォータ共有**（`qtSd/…`）コンボで
特に顕著です。3つのレイヤーにより、共有アカウントへのリクエスト集中を防ぎます。

### 接続単位の同時実行数上限 (`max_concurrent`)

各プロバイダー接続では、`max_concurrent` の上限を宣言できます
（`provider_connections.max_concurrent`。接続モーダル / API / DB で設定）。
制限しない場合は空のままにします。これは、後述する直列化レイヤーを制御する唯一の設定です。
アカウントの実際の同時実行数に設定してください（例: GLM は約1、MiniMax は約2）。

### クォータ共有リクエストの直列化

クォータ共有ディスパッチが、正の値の `max_concurrent` を宣言している接続を対象とする場合、
その**アカウント**への同時リクエストは、接続単位のセマフォ
（キー `qsconn:<connectionId>`）を介して直列化されます。超過したリクエストは、
アカウントに殺到する代わりに**キュー内で待機**します。これは**フェイルオープン**です。
キューが飽和している場合やタイムアウトした場合でも、ディスパッチ可能なリクエストを拒否することなく、
スロットなしで処理を続行します。**設定 → レジリエンス → クォータ共有の接続単位同時実行数**
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`、デフォルトで有効）で切り替えられます。
`max_concurrent` の上限がない場合、動作は変わりません。

> クォータ共有のルーティングゲート（`selectQuotaShareTarget`、DRR + P2C）自体も
> フェイルオープンであり、上限に達した接続の優先度を下げるだけです。接続が1つしかないプールでは
> ハードリミットを適用できないため、実際にリクエスト集中を抑制するのはこのセマフォです。

### コンボのクールダウンを考慮した再試行

すべてのコンボ戦略では（有効な場合）、短時間の一時的なクールダウンにより429が確定するはずの
リクエストは、429を返す代わりにクールダウンの終了を待って再ディスパッチされます。
これは、複数モデルのコンボにおけるGemini系のTPM/RPMウィンドウ
（retry-after は約60秒）を対象とします。たとえば、2モデルコンボの両方のターゲットが、
モデル単位のレート制限に達した場合です。**設定 → レジリエンス**の
`comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、`budgetMs`）によって制限されます。
`quota_exhausted`（午前0時までロック）や、認証 / 未検出を理由とする場合には待機しません。

---

## 5. リクエストキューのアドミッション制御 (v3.8.49 · issue #6593)

**対象範囲**: プロバイダー+接続単位のローカルなレート制限キュー
（`open-sse/services/rateLimitManager.ts`、Bottleneck を使用）。
上記3つのメカニズムの1つ下に位置するレイヤーです。

**`maxWaitMs` は、実行期限を表す従来の永続化名です。**
`resilienceSettings.requestQueue.maxWaitMs` は、ジョブの `expiration` として
Bottleneck に渡され、そのタイマーはディスパッチ後にのみ開始されます。したがって、
ローカルキュー内での待機時間ではなく、リミッターが管理する実行時間を制限します。
期限切れは、信頼されたローカルの `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`
（HTTP 504）として公開されます。以前のキュータイムアウトのコード名は、信頼された内部処理での
後方互換性のためにのみ受け付けられます。デフォルトは15000msです。
`RATE_LIMIT_MAX_WAIT_MS`（環境変数）またはダッシュボード
（**設定 → レジリエンス**、UI上限は1～30000ms）でオーバーライドできます。
キュー内の滞在時間に期限はありません。キュー内で待機する呼び出し数を制限するには、
後述の `maxQueueDepth` を使用してください。

**`maxQueueDepth` — オプトイン方式のアドミッション上限（新規）。**
`resilienceSettings.requestQueue.maxQueueDepth` は、1つのプロバイダー+接続について、
同時にキュー内で待機できる（まだディスパッチされていない）リクエスト数を制限します。
キューにすでに `maxQueueDepth` 件のリクエストがある場合、新しいリクエストは
`limiter.schedule()` に到達する**前に**、型付きの
`code: "RATE_LIMIT_QUEUE_FULL"` エラーで即座に拒否されます。そのため拒否処理のコストは低く、
そのリクエストに対する後続のプロンプト圧縮 / 翻訳処理よりも前に発生します。
デフォルトの `0` は無効を意味し、既存の無制限キュー動作を維持します。設定範囲は0～100000です。
`RATE_LIMIT_MAX_QUEUE_DEPTH`（環境変数）または
`resilienceSettings.requestQueue.maxQueueDepth`（ダッシュボード / APIパッチ）でオーバーライドできます。

アドミッションチェック自体は純粋関数
（`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`）であるため、
実際のBottleneckリミッターがなくてもユニットテストできます。

> #6593 を作成したRFCでは、`bypassCompressionOnRateLimit`
> フラグも提案されていました。このリポジトリの `open-sse/services/compression/`
> パイプラインは、合成された429レスポンス本文に対するHTTPレスポンス圧縮ではなく、
> 送信LLMリクエストに対するプロンプト / コンテキスト圧縮です（`chatCore.ts` 内の
> `resolveCompressionSettings` / `selectCompressionStrategy` ブロック付近）。
> そのため、文字どおりのバイパスフラグに対応するコードパスはありません。
> また、このプロンプト圧縮ステップは現在、リクエストパイプライン内の `withRateLimit()` より
> _前に_実行されます。そのため、キュー満杯による拒否時にこの処理をスキップするための並べ替えは、
> このissueの対象範囲よりも大きな別の変更になります。ここでは意図的に**実装されておらず**、
> CPU節約の効果が並べ替えのリスクに見合う場合のフォローアップとして残されています。

---

## 6. 低速ストリームのスループット・ウォッチドッグ (#9709)

オプションの `resilienceSettings.streamRecovery.throughputWatchdog` ガードは、
アップストリームがチャンクを送信し続けているものの、設定された有効出力レートを
下回るアシスタント出力しか生成していない状態を検出します。これは意図的にアイドルタイムアウトとは
区別されています。ハートビートとメタデータはいずれのタイマーもリセットせず、進行としても
カウントされません。また、ハード試行期限 (#9153) とも異なります。ハード試行期限は出力品質に
かかわらず、絶対的な安全上限として維持されます。

ウォッチドッグが中止を実行するには、ウォームアップ期間が経過し、その後に完全なローリングウィンドウが
完了している必要があります。Chat Completions および Responses API の出力イベントからテキスト差分を
カウントし（控えめな UTF-8 バイト数の近似値）、使用量のみのイベントと空のイベントは無視し、
ツール呼び出しまたは推論イベントが進行中の間は判定を保留します。デフォルトでは無効で、
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` により有効化できます。ウィンドウ、ウォームアップ、
最小レート、および測定可能な最小出力量は、通常のレジリエンス設定正規化レイヤーによって
制限されます。

有効な場合、ウォッチドッグによる中止はアクティブなアップストリーム試行のみに適用されます。
クライアントから見えるバイトが一切送信される前であれば、既存の同一アカウント早期復旧パスによって
試行を再開できます。コミット後にストリームが無条件で再生されることはありません。サフィックスを
連結できるのは、既存の安全なストリーム途中継続契約のみです。ファイナライズは引き続き一度だけ
実行されるため、使用量の計上とセマフォの解放が重複することはありません。

---

## 7. アップストリームステータスの再設定（誤って報告されたクォータエラー）

**対象範囲:** 一時的なクォータ枯渇を誤った HTTP ステータスで報告する、1 つのアップストリームゲートウェイ。

**目的:** 分類の前に誤解を招くステータスを修正し、ダウンストリームの利用者（フォールバックエンジン、コンボ集約、クライアント向けレスポンス）が、その障害の真の再試行可能性を認識できるようにします。

一部のゲートウェイは、一時的なクォータ枯渇を再試行不可の HTTP
ステータスで通知します。`agentrouter.org` は、標準の `429` の代わりに、中国語の本文
（`用户额度不足` / `额度不足`）とともに `403`（場合によっては `400`）を返します。Claude
Code のようなクライアントは `403` を永続的なエラーとして扱ってセッションを中止し、修正しなければ
フォールバックエンジンはこれをクォータ
イベントではなく `AUTH_ERROR` として分類します。

**実装:**

- レジストリ + マッチャー: `open-sse/config/upstreamStatusRestatement.ts` —
  プロバイダーごとのルール一覧（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`）。`applyStatusRestatement()` によって照合されます。
- 呼び出し箇所: `open-sse/handlers/chatCore.ts` の `providerFailure:` ブロック
  （3654 行付近）。`parseUpstreamError()` がエラー HTTP ステータス
  （`!providerResponse.ok`）を持つアップストリームレスポンスを解析した直後、かつ
  いずれかの分類が実行される前に配置されているため、すべてのダウンストリーム利用者が修正後の
  ステータスを認識します。`200` SSE ストリーム内に埋め込まれたエラーは、別の、
  より後段のストリーム解析パスを通るため、現時点ではこのフックの対象では**ありません**。これは
  既知の制限ですが、agentrouter の誤ったステータスにはまだ必要ありません（この問題は
  エラー HTTP ステータスとして表面化するためです）。
- 再試行適格性: `429` は `RETRY_AFTER_ELIGIBLE_STATUSES`
  （`open-sse/services/combo/unavailableRetryGate.ts`）に含まれているため、再設定されたエラーには、
  再試行不能な `403` として表面化する代わりに、実際の再試行ウィンドウが付与されます。
- 合成された `60s` の `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）は、
  再設定されたレスポンスが**クライアント**に伝える値にすぎません。それ自体が接続の内部的な
  クールダウン／ロックアウト期間になるわけではありません。この期間は、再設定されたエラーを
  実際に処理するメカニズムによって別途制御されます（Connection Cooldown の段階的バックオフ、
  §2、API キープロバイダーの基本値は `3s`。または agentrouter のようなモデル単位クォータの
  プロバイダーでは Model Lockout、§3）。ルーターは、クライアントに通知した 60s の
  ウィンドウよりも早く、内部的に再試行可能になることがあります。これは意図的な余裕であり、
  バグではありません。

永続的なエラー（agentrouter の `无权访问模型` — このモデルへのアクセス権なし）は
決して再設定されません。`textMarkers` が一致した場合でも `excludeMarkers` がルールを拒否するため、
エラーは元のステータスを維持し、無限に再試行されることはありません。対応する
プロバイダー分類ルール
（`open-sse/config/providerErrorRules.ts` の `agentrouter-model-access-denied`:
`reason: "auth_error"`、`scope: "model"`、宣言された基本クールダウンは `6h`）は、
`checkFallbackError`（`open-sse/services/accountFallback.ts`）によって、
汎用的な apikey カテゴリの `FORBIDDEN` 早期リターンの_前に_参照されます。これは
`honorsRuleLockScope(provider)` によってゲートされます（#10334 — 現在は
`providerErrorRules.ts` の `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストを通じて
agentrouter のみに適用）。ルールで宣言された 6h のクールダウンは
`fallbackResult.baseCooldownMs` として引き継がれますが、既存の
モデル単位クォータのロックアウトパス（`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`。#10334 ではクールダウンの取得元以外は変更なし）に
引き続き渡されます。他のすべてのモデルロックアウトと同様に、オペレーターの
`mlSettings.maxCooldownMs`（デフォルトは `1_800_000ms` / 30min）まで引き下げられ、
_永続化されるロックアウト理由_は、ルールの `"auth_error"` ではなく、既存のハードコードされた
`"forbidden"` のままです。エンドツーエンドで尊重されるのはクールダウン期間のみであり、
理由文字列ではありません。接続自体はアクティブなままであり、同じ接続上の兄弟モデルには
影響しません。

再記述されたクォータエラー（`额度不足`）は、本番環境でプロバイダールールに到達します
（`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`、`scope:
"connection"`、独自に宣言されたクールダウンなし — 永続化レイヤーの
スケーリングされたバックオフのデフォルトが適用されます）。#10334 以降、
`ProviderErrorRuleMatch` の `scope` はエンドツーエンドで使用**されます**が、
対象となるのは `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リスト内のプロバイダー
（`providerErrorRules.ts` — 現在は `"agentrouter"` のみ、
`honorsRuleLockScope()` によって制御）の**み**です。それ以外のすべての
プロバイダーでは、#10334 より前とまったく同様に、`scope` は情報提供のみを
目的とします。`checkFallbackError` は、マッチしたルールのスコープを
`fallbackResult.ruleScope` として公開します。
`isAgentrouterConnectionQuotaScope()`
（`src/sse/services/auth.ts`）は、`ruleScope` が接続全体に適用できる
自己回復可能なシグナルとして本当に安全かどうかを確認する共有ガードです
（スコープが `"connection"`、理由が `quota_exhausted`、`permanent` ではなく、
`creditsExhausted` でもないこと — 将来、スコープ `"connection"` と永続的な
アカウント状態を組み合わせるルールが追加された場合への防御です）。これを
呼び出すコンシューマーは 2 つあります。

- **永続化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）:
  パススループロバイダーの**モデル単位**のロックアウト分岐に入る代わりに
  （agentrouter は `passthroughModels: true` → `hasPerModelQuota()` は
  `true` を返します）、**一時的な接続クールダウン**を適用します —
  `testStatus: "unavailable"` + `rateLimitedUntil` であり、終端ステータス
  （`credits_exhausted`/`banned`/`expired`）には決してなりません。そのため、
  手動で認証情報をリセットする必要はなく、クールダウン期間が終了すると
  接続は自己回復します。`disableCooling: true` の接続ではスキップされます
  （#2997）。このオプトアウトでは、代わりにモデル単位のロックアウトへ
  フォールスルーします（これは文書化されたトレードオフです — 分岐の上にある
  コードコメントを参照してください）。
- **同一リクエスト内のコンボルーティング**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）: 同じガードにより、接続が
  `${provider}:${connectionId}` をキーとするメモリ内の
  `exhaustedConnections` セットに記録されます。これによってスキップされるのは、
  残っている同一リクエストのターゲットのうち、そのターゲット自身の
  ターゲットオブジェクト上に、まったく同じ `connectionId` がすでに設定されて
  いるものだけです（`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`、
  `if (provider &&
connectionId)` が `exhaustedConnections` を検索する前にあります）— 単純な
  モデルリストのコンボでは、兄弟ターゲット自身に固定された `connectionId` は
  設定されておらず、レスポンスの `X-OmniRoute-Selected-Connection-Id`
  ヘッダーからディスパッチごとに 1 つ解決されるだけなので、そのキーマッチは
  発生しません。この一般的なケースでは、残りのレグが枯渇直後のアカウントを
  再利用することを実際に防ぐのは、この Set **ではありません**。その役割を
  担うのは、上記の永続化レイヤー（接続の `rateLimitedUntil` が将来の時刻に
  設定されます）と、この同じガードによる当該障害の
  `transientRateLimitedProviders` の抑制との組み合わせです
  （「2 段階設計」および `targetExhaustion.ts` の
  `isAgentrouterConnectionQuotaScope` 分岐にあるコードコメントを参照）。
  この Set が未記録のままであれば、`combo.ts` の
  `allowRateLimitedConnection` による強制許可
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）は、その
  プロバイダーの残りのレグに対して発動しません。そのため、認証情報選択時の
  `rateLimitedUntil` フィルター（`src/sse/services/auth.ts:1238`）が通常どおり
  適用され、残りのレグは別の、まだ利用可能な agentrouter 接続を選択するか、
  利用可能な認証情報がないとして失敗します — この分岐でクールダウンされた
  接続へ強制的に戻ることはありません。

### 2 段階設計: ステータスの再記述、その後の分類

ステータスの再記述（`upstreamStatusRestatement.ts`）とプロバイダー分類ルール
（`open-sse/config/providerErrorRules.ts`、`providerRuleRegistry`）は、
どちらもプロバイダー ID とテキストマーカーをキーとする別々のレジストリですが、
異なる場所で実行され、異なる目的を果たします。再記述は `chatCore.ts` の早い段階で
HTTP ステータスを書き換えます。分類ルールは、`checkFallbackError()`
（`open-sse/services/accountFallback.ts`）内でフォールバックの `reason` と
ロックの `scope`（`model` / `provider` / `connection`）を選択します。

分類ルールが完全なエラー**テキスト**（`额度不足` のような本文マーカーとの
マッチングに必要）を参照できるのは、`providerErrorRules.ts` の
`FULL_TEXT_RULE_PROVIDERS` 許可リストに含まれるプロバイダーのみです — 現在は
`"agentrouter"` だけです。それ以外のすべての**組み込みカタログ**
プロバイダーについて、`checkFallbackError` が `getProviderErrorRuleMatch` に
渡すのは構造化エラー（`{code, type}`）のみです。これはヘッダー、ステータス、
コードに基づくルールには十分ですが、本文のテキストマーカーは認識できません。
ヘルパー `resolveRuleMatchBody()` がこの選択を行います。許可リストに含まれる
プロバイダーには完全なエラーテキストを使用し、それ以外には構造化エラーを
使用します。**組み込み**プロバイダーを `FULL_TEXT_RULE_PROVIDERS` に追加する
ことは、プロバイダーごとの明示的なオプトインです — この仕組みにより、リストに
含まれないすべてのプロバイダーのデフォルトパスがバイト単位で変更されない状態に
保たれます。

ルールの `scope`（`model` / `provider` / `connection`）は、
`FULL_TEXT_RULE_PROVIDERS` とは別のオプトインです。`checkFallbackError` は
それを `fallbackResult.ruleScope` として公開するだけであり、ダウンストリームの
コンシューマーが単なる情報ラベル以外のものとして扱うのは、同じファイル内の
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 許可リストに含まれるプロバイダーのみです
（`honorsRuleLockScope() によって制御` — 現在は `"agentrouter"` のみ）。
プロバイダーがこの許可リストに含まれた後、`scope: "connection"` のマッチが
実際に何を行うかについては、上記の「再記述されたクォータエラー」を参照して
ください。

**#11104 — オペレーターが宣言したルールは両方の許可リストを迂回します。** オペレーターは、このファイルを編集せずに、
`settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）
を介して、プロバイダーごとのルールを実行時に宣言できます。組み込みカタログルールの
**デフォルト**の動作を保護するための許可リストである
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` の背後で
オペレータールールを制限すると、ルールの宣言自体がすでにオペレーターによる明示的な
オプトインであるにもかかわらず、そこにすでに記載されているプロバイダー以外では
設定メカニズムが機能しなくなります。`resolveRuleMatchBody()` と
`honorsRuleLockScope()` はどちらも最初に
`hasOperatorRuleForProvider()` を確認します。オペレータールールを持つプロバイダーには、
いずれかの許可リストに含まれているかどうかにかかわらず、生のエラーテキストが渡され、
宣言された `scope` が尊重されます。

**既知の欠落 — HTTP 400 では `providerRuleRegistry` が参照されません。**
`checkFallbackError` の `BAD_REQUEST` ブランチは、ステータス 400 を自身のパターン配列
（`accountFallback.ts` の `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` など）のみで分類し、その上にある
`configuredRule`/`getProviderErrorRuleMatch` ブランチに到達する前に戻ります。
`status: 400` を持つ組み込みカタログルール（またはオペレータールール）は
構文上は有効ですが、決して発火しません。現在 400 を対象とする既存ルールはないため、
本番環境には何の影響もありません。しかし、今後 400 のルールを追加する場合は、まずこの
ブランチを変更する必要があります。これは単にルールを追加するよりも大きな変更
（パターン配列の動作にすでに依存しているすべてのプロバイダーについて 400 を再分類する変更）
であり、単一プロバイダー向けルール追加の範囲外です。

### クォータを誤って表現する新しいゲートウェイの追加

1. `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）にルール配列を1つ登録します。
   `textMarkers` はプロバイダー固有に保ち、
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）と衝突する
   一般的な英語フレーズを決して再利用しないでください。
2. 必要に応じて、
   `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）に分類ルールを登録し、
   適切なロックスコープ（アカウント全体のクォータには `connection`、モデルごとのエラーには
   `model`）を選択します。この手順が本番環境で効果を持つのは、完全なエラーテキスト
   （本文マーカー）を必要とするルールを持つプロバイダーに限られます。同じファイル内の
   `FULL_TEXT_RULE_PROVIDERS` にプロバイダー ID を追加してください。そうしないと、
   `checkFallbackError` がルールに渡すのは構造化された
   `{code, type}` エラーだけとなり、本文テキストに基づくルールは実トラフィックで
   決して一致しません。Opencode や Minimax のルールのように、純粋に
   `status`/`headers` のみに一致するルールでは、このオプトインは必要ありません。
   これとは別に、ルールが `scope: "connection"` を宣言し、その意図が単なる情報ラベルではなく、
   実際の接続全体のクールダウンと同一リクエスト内でのコンボのスキップである場合は、同じファイル内の
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` にプロバイダー ID を追加してください。これは、
   `markAccountUnavailable()`（`src/sse/services/auth.ts`）および
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）における
   `isAgentrouterConnectionQuotaScope()` 形式の処理を制御するものです。これがない場合でも、
   `scope` は `fallbackResult.ruleScope` を通じて伝播しますが、それに基づく処理は何も行われません。
3. `tests/unit/upstream-status-restatement.test.ts` および
   `tests/unit/agentrouter-error-rules.test.ts` を踏襲したユニットテストを追加してください
   （not-permanent / not-creditsExhausted のガードを含めます。また、プロバイダーに許可リストが
   必要な場合は、`resolveRuleMatchBody()` がそのプロバイダーに対してのみ完全なテキストを
   返すことを確認するテストも含めます）。

`chatCore.ts`、`classifyError`、または combo を変更する必要はありません。

#### エグレス単位のロック（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS` に含まれるプロバイダー（opencode ファミリー）は、
IP 単位の上流として扱われます（opencode の無料枠はアカウント単位ではなく
IP 単位です — #9611 を参照）。ステータス 429 が `quota_exhausted`
**または** `rate_limit_exceeded` に分類されると、ローテーションでそれらを試す前に、
最後に確認されたエグレス IP が失敗した接続のものと一致する、許可リスト対象ファミリーの
すべての接続がクールダウンされます
— これにより、確実に失敗する N-1 回の上流呼び出しを回避します（#10460/#10525 と同じ構造）。
`rate_limit_exceeded` は意図的に含まれています。`markAccountUnavailable`
の経路では、opencode 固有のルールは決して一致しません（ヘッダーや本文が
`checkFallbackError` に渡されず、opencode は `FULL_TEXT_RULE_PROVIDERS` に含まれません）。
そのため、本文にサブスクリプションクォータのテキスト（"monthly usage limit
reached"）を含む 429 は、`status_429` ルールに到達する前に、クォータテキストの
フォールバック（`buildSubscriptionQuotaFallback`、`accountFallback.ts`、1時間のクールダウン）
によって `quota_exhausted` に分類されます。一方、クォータテキストを含まない 429
（通常のレート制限）は、`status_429` ルールによって `rate_limit_exceeded` に分類され、
それでも IP ファミリー全体がクールダウンされます。許可リスト対象のプロバイダーでは、
IP 単位のレート制限はクォータ枯渇と同じシグナルです。明確な制限事項:

- **ベストエフォート**: ロックは `proxy_logs` から接続の最後に確認された `egress_ip`
  を特定する（24 時間のウィンドウ、同期処理、キャッシュなし）。コールドキャッシュ（egress
  IP が一度もプローブされていない）または行が存在しない場合でも、失敗した接続はこの
  分岐によってクールダウンされる（現在と同様に記録される）が、兄弟接続はロックされない。
- **決して終端状態にしない**: クールダウンは更新されるクォータウィンドウ
  （`testStatus: "unavailable"`）であり、IP レベルのシグナルから永続状態が導出されることは
  ない。`disableCooling` 接続はこの分岐を完全にスキップする。
- **許可リスト対象ファミリーのロック粒度が変更される**: これは兄弟接続に対する最適化だけ
  ではなく、スコープの変更である。opencode は `passthroughModels`
  プロバイダーであるため、この分岐より前は 429 によってモデル単位のロックアウトが発生して
  いたが、今後は接続のクールダウンが発生する。これは、兄弟接続がまったくなく、単一の接続を
  運用しているオペレーターにも適用される。これは opencode のルールテーブルがすでに正しいと
  宣言している粒度（`scope: "connection"`、
  `providerErrorRules.ts`）だが、opencode が
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` に含まれていないため、これまで一度も適用されて
  いなかった。この分岐は、接続スコープの agentrouter 分岐と同様に、失敗した接続の
  クールダウンと `backoffLevel` を自ら書き込み、そのまま return する。モデル単位の
  ブロックにも、その下の汎用パスにも到達しない。
- **コンボも対象**: agentrouter 分岐と同様に、このスコープはコンボ呼び出し元が 429 に
  適用する `persistUnavailableState`/`isCombo` のダウングレードを意図的に
  無視する。モデル単位のロックアウトは、このスコープの弱い形ではなく、単位そのものが
  間違っている。枯渇した IP について何も示さないため、コンボのローテーションは兄弟接続
  ごとに失敗が確実な呼び出しを 1 回ずつ消費し続けることになる。
- **兄弟接続の安全性**: すでに終端状態（banned/credits_exhausted）にある兄弟接続や、
  すでにより長いクールダウン中の兄弟接続は、決して上書きされない。
- **排他的な許可リスト**: `EGRESS_BUCKETED_LOCK_PROVIDERS` の拡張は、オーナーによる
  明示的な決定であり、汎用的な配線ではない（パターン #10334/#10419）。兄弟接続クエリは、
  SQL リテラルとして繰り返すのではなく、同じ許可リストをバインドするため、その拡張は
  1 行の変更で済む。
- **両方向の Egress IP ローテーション**: ルックアップウィンドウ（24 時間）は
  egress-IP キャッシュの TTL（5 分）よりはるかに長いため、「最後に確認された IP」は
  現在の状態ではなく履歴である。接続のプロキシがそのウィンドウ内でローテーションした場合、
  ロックは実際に共有されている IP を**見逃す**可能性がある（記録された IP が新しい未枯渇の
  IP であるため）。対称的に、枯渇した IP からすでに**ローテーション済みの兄弟接続を
  クールダウンする**可能性もある。後者では、その兄弟接続に 1 クールダウンウィンドウ分の
  コストが生じる。どちらも、履歴ベースのルックアップにおけるベストエフォート上の制約として
  許容される。
- **コスト**: `proxy_logs` に対する 2 回の境界付きスキャン（`idx_pl_timestamp` による
  ウィンドウフィルタリング）であり、429 の発生時にのみ実行される。新しいインデックスは
  追加しない（migration 134 では YAGNI）。中程度のサイズの実トラフィック DB コピーで
  計測済み。高スループットのインスタンスでは、同じウィンドウ内に比例して多くの行が保持される。

---

## その他の耐障害性機能

- **19種類のルーティング戦略**（優先度、重み付き、ラウンドロビン、コンテキストリレー、先詰め、p2c、ランダム、最少使用、コスト最適化、リセット考慮、リセットウィンドウ、ヘッドルーム、厳密ランダム、自動、lkgp、コンテキスト最適化、キャッシュ最適化、フュージョン、パイプライン）— [AUTO-COMBO.md](../routing/AUTO-COMBO.md)を参照してください。
- **リセット考慮ルーティング**（v3.8.0）— クォータのリセット時刻に基づいて接続を優先します。
- **バックグラウンドモードの縮退** — Responses APIの`background: true`を、警告付きで同期処理に縮退します。
- **動的なツール上限検出** — ツール数の上限に達した場合、プロバイダーをバックオフします。
- **緊急フォールバック** — `OMNIROUTE_EMERGENCY_FALLBACK`で制御されます。運用担当者は、再起動せずにFeature Flagsページから設定を上書きできます。

---

## デバッグ

- 重み付きコンボが `503 all_targets_cooling_down` を返す（`Retry-After` が設定され、`diagnostics.excluded` にすべてのターゲットが `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` とともに列挙される）→ プールは構成および接続されていますが、すべてのターゲットがレジリエンスタイマーによって除外されています。`[COMBO] Weighted selection: every target excluded before dispatch — …` という警告には、理由と残り秒数が示されます。同じコンボからの `404 no_executable_targets` は、レジリエンスタイマーが関与していないことを意味します（実行対象がない、またはすべてのアカウントが可用性プローブに失敗した）。`targetResolution.ts` で収集された除外情報に基づき、`open-sse/services/combo/pinRecovery.ts` に組み込まれています。
- あるプロバイダーのすべてのキーがスキップされる → サーキットブレーカーの状態と、各接続の `rateLimitedUntil`/`testStatus` の両方を確認してください。
- リセット期間後もプロバイダーが永続的に除外される → コードが `getStatus()`/`canExecute()` ではなく、生の `state` を読み取っていないか確認してください。
- 1 つのキーが失敗しても、ほかのキーは動作するはず → サーキットブレーカーよりも接続クールダウンを優先してください。
- 1 つのモデルだけが失敗する → 接続クールダウンよりもモデルロックアウトを優先してください。
- 状態は自己回復するはずなのに回復しない → 将来のタイムスタンプと、期限切れの状態を更新する読み取りパスを確認してください。永続的なステータスは手動で変更する必要があります。

---

## TLSフィンガープリンティングとステルス

プロバイダー固有のステルス機能（JA3/JA4、CCH、難読化）については、別途`docs/security/STEALTH_GUIDE.md`（git上にあり、`/docs`にはコンパイルされません）を参照してください。

---

## 耐障害性テスト（フェーズ8 · ブロックC）

耐障害性ロジックのユニットテストに加えて、実際のストレス/障害条件下でランタイムを検証する3つのテストがあります（すべて統合/ナイトリーテストであり、PRをブロックしません）。

| テスト     | 内容                                                                                                                                                                                                                | 実行                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| カオス     | 偽のアップストリームノードが実際のレイテンシ/リセット/タイムアウト/503を注入し、サーキットブレーカーが開いて回復すること、および`checkFallbackError`が503を回復可能なフォールバックとして分類することを検証します。 | `RUN_CHAOS_INT=1 npm run test:chaos`         |
| ヒープ増加 | `--expose-gc`環境で`createSSEStream`ごとに約500ストリームを実行します。ヒープが上限を超えて増加した場合は失敗します（OOMガード#3069）。                                                                             | `npm run test:heap`                          |
| k6ソーク   | `/api/monitoring/health`に対して負荷を継続的にかけ、p95/エラーのしきい値を検証します。                                                                                                                              | `k6 run tests/load/k6-soak.js`（ナイトリー） |

`.github/workflows/nightly-resilience.yml`（cron + dispatch）によってオーケストレーションされます。デフォルトの`test:integration`では、カオステストとヒープテストは自己スキップされます（`RUN_CHAOS_INT`/`--expose-gc`がない場合）。

---

## 関連項目

- [アーキテクチャガイド](./ARCHITECTURE.md) — システムアーキテクチャと内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — プロバイダー、コンボ、CLI 統合
- [自動コンボエンジン](../routing/AUTO-COMBO.md) — 16 要素のスコアリング、モードパック
