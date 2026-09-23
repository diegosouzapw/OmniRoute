# Guardrails (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **信頼できる唯一の情報源:** `src/lib/guardrails/`
> **最終更新:** 2026-08-29 — v3.8.51（Video Bridge の文字起こしの来歴は呼び出し元による宣言であり、
> まだサーバー側では検証されていないことを #11661 に基づき明確化）

ガードレールは、OmniRoute とアップストリームプロバイダーの境界で、安全性、ポリシー、およびコンテンツ変換を適用します。各ガードレールは、リクエストペイロード（`preCall`）とアップストリームレスポンス（`postCall`）を検査し、必要に応じて拒否、変換、または注釈付けできます。

システムは **フェイルオープン** です。ガードレールの実行中に例外が発生した場合、レジストリはエラーを記録し、リクエストを失敗させるのではなく、次のガードレールの処理を続行します。ブロックは常に明示的な判断（`block: true`）であり、偶発的に発生することはありません。

## 組み込みガードレール

レジストリはインポート時に、6つのガードレールを優先順位に従って自動的に読み込みます
（`registry.ts` → `registerDefaultGuardrails()` を参照）。

| 優先順位 | 名前                | ステージ       | ファイル              |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先順位の数値が小さいものほど **先に** 実行されます。

### Vision Bridge（`visionBridge.ts`）— モダリティブリッジ PR-1

**ビジョン非対応モデル** を対象とする画像付きリクエストをインターセプトし、リクエスト全体をビジョン対応モデルへ再ルーティングするか、アップストリーム呼び出しの前に画像部分を、設定可能なビジョンモデルが生成したテキスト説明へ置き換えます。これにより、テキスト専用プロバイダーでもマルチモーダルペイロードを透過的に処理できます。

フロー:

1. ターゲットモデルがすでにビジョンをサポートしている場合はスキップします（強制ブリッジリスト `isVisionBridgeForcedModel` に含まれる場合を除く）。
2. `extractImageParts(messages)`（`visionBridgeHelpers.ts`）を使用して画像部分を抽出します。この関数は、`open-sse/utils/mediaParts.ts` の **統合メディア検出機能** `detectMediaParts()` に処理を委譲します。これは、combo 互換性フィルターと共有される信頼できる唯一の情報源です。抽出対象は、`replaceImageParts` が元の位置へ差し戻せる形状（extract↔replace 契約）のトップレベル部分に限定されています。対象は、OpenAI の `image_url`、Anthropic の base64 `source.type:"base64"`、Anthropic の URL `source.type:"url"`、および Responses API の `input_image` です。ネストされた一致や、インジケーターのみの形状は combo フィルター用の素材であり、抽出されることはありません。何も見つからなければスキップします。
3. `resolveVisionBridgeRuntimeSettings()`（`src/shared/constants/modalityBridgeDefaults.ts`）を使用してランタイム設定を解決します。新しい `modalityBridge*` 設定キーが優先され、従来の `visionBridge*` キーは **1サイクル限りのフォールバック**（ロールバック期間）として残ります。ブリッジが無効な場合、メディアを走査する前にスキップします。
4. モードセレクター（`modalityBridgeVisionMode`、下表を参照）が、再ルーティングか説明生成かを決定します。再ルーティングでは、`model` のみを置き換えた `modifiedPayload` と、メタデータ `{ rerouted, fromModel, toModel, imagesKept }` を返します。
5. 説明生成パスでは、画像数を `maxImages` に制限し、タスクを考慮したプロンプトを構成して説明キャッシュを参照し、ビジョンモデルを **並列に**（`Promise.allSettled`）呼び出して、画像の位置に `[Image N]: <description>` というテキスト部分を挿入します。説明生成に失敗すると `null` となり、元の画像部分が **保持** されます（#4012）。ただし、combo の説明生成パスですべての説明生成が失敗した場合は例外で、ビジョン非対応であることが確認されたアップストリームに対して、代わりに `(unavailable — no vision-capable provider connected)` というスタブを使用します（#8430）。
6. `modifiedPayload` とメタデータ（`imagesProcessed`、`descriptions`、`processingTimeMs`、`visionModel`）を返します。

#### モードセレクター（`modalityBridgeVisionMode`）

| モード     | デフォルト | 動作                                                                                                                                                                                                                                                                                                                              |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | 従来のヒューリスティックを変更せずに使用します（#6640/#7204）。非 combo/`auto/` モデルでは、元のモデルに使用可能な認証情報がすでにある場合を除き、最適なビジョンモデルへ再ルーティングします（認証情報がある場合は説明を生成）。combo ターゲットでは常に説明を生成します。                                                        |
| `describe` |            | 常に説明を生成します。再ルーティングブロックは完全にスキップされ、常にユーザーが選択したモデルが回答します。                                                                                                                                                                                                                      |
| `reroute`  |            | 再ルーティングを強制します。認証情報を持つモデルを維持するためのガードは迂回されます。再ルーティング **先** に対する認証情報ガードは引き続き適用されます。使用可能なビジョン対応ターゲットが存在しない場合、リクエストは説明生成へフォールスルーするため、生の画像がテキスト専用バックエンドに到達することはありません（#8430）。 |

強制モードは、auto ヒューリスティックが実行される **前に** ショートサーキットします。`auto` の動作は PR-1 導入前のガードレールとバイト単位で同一です。

#### タスクを考慮した説明プロンプト（`modalityBridgeVisionTaskAware`）

デフォルトは **true** です。`composeVisionPrompt()`（`visionBridgeHelpers.ts`）は、ベースとなる説明プロンプトに **最後のユーザーメッセージ** のテキスト（500文字に切り詰め）を追加します。これにより、ユーザーが実際に依頼した内容に沿って説明が生成されるよう誘導し（codex-vision-proxy パターン）、画面に表示されているテキストを文字起こしするようビジョンモデルに指示します。このフラグがオフの場合、またはユーザーテキストがない場合は、ベースプロンプトが変更されずに使用されます。

describe セルフループ自身の OpenAI 互換リクエスト（`visionBridgeHelpers.ts` の
`callVisionModelSingle()`）は、常に `image_url.detail: "high"` を要求します。
これは呼び出し元やプロバイダーに関係なく無条件であり、クライアントからのシグナルによって制御されることもありません。
低詳細度のサンプリングは、このプロンプトが要求するテキスト文字起こしタスクそのものにおいて
OCR の精度を低下させるため、元の受信リクエストで使用された詳細度に関係なく、
describe 呼び出し自体は常に高詳細度を要求します。この設定が影響するのは内部の
describe リクエスト本文のみです。OmniRoute がプライマリリクエストで呼び出し元自身の
`image_url.detail` を転送する方法は変更されません。そのデフォルトは別途適用され、
検出された OpenCode クライアントに対してのみ `defaultImageDetail()`
（`open-sse/handlers/chatCore/upstreamBody.ts`）で適用されます。
describe セルフループの Anthropic ワイヤーフォーマット分岐には `detail` フィールドがないため、
どちらのデフォルトの影響も受けません。

#### Describe 出力上限（`modalityBridgeVisionMaxChars`）

| キー                           | デフォルト | 範囲                 |
| ------------------------------ | ---------- | -------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` または 100–50000 |

`0`（デフォルト）は**上限なし**を意味します。`callVisionModel()` が返した説明は
変更されずにそのまま渡され、既存の動作が維持されます。100–50000 の範囲の値を指定すると、
説明が `[Image N]: <description>` として再挿入される前に、`…` サフィックス付きで
切り詰められます（`src/lib/guardrails/visionBridge.ts` の
`VisionBridgeGuardrail.preCall()`）。詳細を多く含む OCR タスクで、ダウンストリームモデルが
完全な文字起こしを必要とする場合は、この値を引き上げてください。冗長な出力を行う
ビジョンモデルのトークン使用量を制限するには、この値を引き下げてください。
ダッシュボードのフィールドは Vision タブの Advanced パネル
（`ModalityBridgeVisionTab.tsx` の `modality-bridge-max-chars`）にあります。
明示的な `0` はそのまま維持しつつ、1～99 の値は下限の 100 に切り上げられます。
`0` は単なる「未設定」のデフォルトではなく、それ自体が有効な Zod 値です
（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`）。

#### Describe キャッシュ（`modalityBridge/bridgeCache.ts`）

describe 出力用のインメモリ LRU + TTL キャッシュで、プロセス全体で共有されます。
キーは `sha256(imageRef + composedPrompt + configuredBridgeModel)` で、
長さプレフィックスによるフレーミングを使用します（フィールド境界の衝突はありません）。
モデル部分には、実際に応答したモデルではなく、**設定された**ブリッジモデルが使用されます。
`callVisionModel` は内部でフォールバックする場合があり、試行ごとにキーを分けると
キャッシュが断片化するためです。失敗した describe はキャッシュされません。設定：

| キー                            | デフォルト | 範囲    |
| ------------------------------- | ---------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`     | —       |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000 |

#### リモート画像の正規化（セルフループ describe/base64 フェッチ）

ブリッジ自身が**リモート**画像をフェッチする場合、すなわち Anthropic の describe
セルフ呼び出し、および claude ワイヤーフォーマット向けの base64 変換
（`ensureBase64ImagesForClaudeWire`）では、どちらも `visionBridgeHelpers.ts` の
`fetchRemoteImageAsDataUri()` を介して処理されます。生成されたデータ URI は、
ビジョンモデルのリクエストに埋め込まれる前に `normalizeDataUri()`
（`open-sse/utils/imageNormalize.ts`）に渡されます。サイズが大きすぎる画像は、
**長辺 2048px** に縮小されます（OpenAI/Anthropic がすでにサーバー側で適用している
リサイズ上限と同じです）。これにより、ビジョンモデルから見える内容を変えずに、
アップロードのバイト数とレイテンシーを削減できます。リサイズには動的インポートで
読み込まれる `sharp` を使用します。ネイティブバイナリを読み込めないプラットフォームでも、
`normalizeDataUri()` は**決して例外をスローしません**。元のバイト列をそのまま渡す処理に
フォールバックするため、describe/base64 変換パスは常に動作し続けます。
画像ではないバイト列（デコード可能な画像が返されなかったフェッチ）も、
変更せずにそのまま渡されます。この正規化の適用範囲は、ブリッジが自身のセルフ呼び出しのために
フェッチする画像に限定されます。呼び出し元の未加工のパススルーペイロードには決して適用されず、
オプトイン時のみ変更するという原則（Hard Rule #20）に従います。

#### 設定スキーマ + マイグレーション

新しい `modalityBridge*` キーは `updateSettingsSchema`
（`src/shared/validation/settingsSchemas.ts`）で Zod によって検証されます。
対象は `modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCache*` の 3 項目、および Audio Bridge が使用する
`modalityBridgeAudio*` グループです。マイグレーション
`141_modality_bridge_settings.sql` は、既存のレガシーな `visionBridge*` 値を、
対応する新しいキーへコピーします（冪等であり、オペレーターが設定した
`modalityBridge*` 値を上書きすることはありません）。レガシーキーは、
1 リリースサイクルの間、読み取り時のフォールバックとして引き続き受け付けられます。

#### 透過性ヘッダー + 統計

describe によって変換されたレスポンスには、
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
が付与されます（`modalityBridge/bridgeStats.ts` の
`buildModalityBridgeHeader()` で生成され、
`src/sse/handlers/chatHelpers.ts` の `withModalityBridgeHeader()` で付与されます）。
再ルーティングされたリクエストにはヘッダーが**付与されません**。ペイロードは変更されておらず、
モデルの切り替えはレスポンス本文の `model` フィールドですでに確認できるためです。

`GET /api/modality-bridge/stats`（管理認証、`GET /api/settings` と同じ権限レベル）は、
`vision`、`audio`、`video` について、モダリティごとのインメモリカウンター
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` を返します。
`averageLatencyMs` の分母には、すべての試行回数ではなく `latencySamples` が使用されます。
タイミング情報がない操作について、0 ミリ秒のサンプルが捏造されることはありません。
`bridged` は、変換成功を示す後方互換性のあるエイリアスとして維持されます。
失敗した試行では増加しません。
カウンターは設計上、プロセスの再起動時にリセットされます
（これは会計ではなくテレメトリーです）。

#### ダッシュボード設定

専用のダッシュボードページは
`/dashboard/settings/modality-bridge` です。URL で直接指定可能な `Vision`、`Audio`、
`Video` タブでは、`tab` の値を切り替えてもクエリパラメーターが維持されます。
Vision タブでは、有効化、モード、モデル選択（自動デフォルトを含む）、
タスク対応プロンプト、高度なタイムアウト／画像／説明文の長さ／キャッシュ制限、
ランタイムカウンター、保護されたサンプルリクエストを利用できます。
Audio タブも稼働しており、有効化、Auto を備えた STT 専用モデルピッカー、
タイムアウト／最大クリップ数の制限、音声カウンター、`input_audio` サンプルテストを提供します。
Video タブも機能しており、FFmpeg/ffprobe のランタイム状態を報告します。
UI には、明示的な 4 つの状態があります（プローブの実行中または完了できなかった場合は
`unknown`、クライアント側でプローブがスキップされる非ループバックのダッシュボードホストでは
`restricted`、プローブ後に存在しないことが確認された場合は `unavailable`、
FFmpeg/ffprobe のバージョンとともに利用可能な場合は `available`）。
また、有効化／モデル／フレーム／動画／タイムアウトの制限を永続化し、
モデルピッカーをビジョン対応モデルに絞り込み、動画カウンターを提供します。

AI 設定にあった旧 Vision Bridge カードは、新しいページへの互換性リンクになりました。
フォームの複製は保持しなくなりました。Media Providers からも、既存の
Speech-to-Text プレイグラウンドを削除することなく、Image-to-Text および
Speech-to-Text ワークフローに対応する Modality Bridge タブへリンクできます。

**自己ループのアドミッションバイパス:** describe 呼び出しが OmniRoute 自身の
`/v1` 自己ループ（非標準プロバイダーモデル）を経由する場合、サブリクエストは
`x-omniroute-admission-bypass: internal` を送信し、解決済みの自己ループ認証情報で
認証されます。ローカルモードではローカルの `sk_omniroute` センチネルを使用し、
それ以外ではオペレーターが設定した `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
環境変数のキー（#1350）を使用するため、`REQUIRE_API_KEY=true` のデプロイでも
describe 呼び出しを実行できます。このバイパスは、これらと完全に一致する認証情報に
対してのみ許可されるため、外部クライアントがこのヘッダーを使用してアドミッションを
回避することはできません。

従来のデフォルト値は `src/shared/constants/visionBridgeDefaults.ts` にあり、
新しいモード／タスク対応／キャッシュのデフォルト値と設定リゾルバーは
`src/shared/constants/modalityBridgeDefaults.ts` にあります。ガードレールは
`deps` コンストラクターオプションを公開しているため、テストでは偽の `getSettings`
および `callVisionModel` 実装を注入できます。

### Audio Bridge（`audioBridge.ts`）— Modality Bridge PR-3

音声入力を受け付けることが確認されていないターゲットへ到達する前に、音声を含む
チャットリクエストをインターセプトします。チャットリクエスト自体を再ルーティングすることはありません。
音声部分は既存の OpenAI 互換マルチパートエンドポイントを通じて文字起こしされ、
選択されたチャットモデルはテキストの文字起こし結果を使用して処理を続行します。

フロー:

1. `getResolvedModelCapabilities()` を通じて `supportsAudio` を解決します。
   明示的なプロバイダーレジストリのメタデータ、静的モデルメタデータ、同期済みの
   `modalities_input` の順に優先されます。宣言済みの入力リストに `audio` が
   含まれていない場合は `false`、能力を示す情報がない場合は `null` です。
   `false` と `null` のどちらでも保守的なブリッジが有効になり、`true` の場合は
   バイパスされます。
2. `modalityBridgeAudio*` 設定を解決し、共有の `detectMediaParts()` 検出器を通じて、
   各メッセージからスプライス可能なトップレベルの音声部分を抽出します。
   サポートされるワイヤー形式は、OpenAI の `input_audio`、`audio_url`、
   `source.media_type: "audio/*"` です。ネストされた音声はルーティング用に検出されますが、
   スプライス処理では削除されません。処理数は `modalityBridgeAudioMaxClips` によって
   上限が設定され、それ以降の部分は変更されません。
3. 設定済みの `provider/model` を使用するか、`selectAudioBridgeModel()` に
   `AUDIO_TRANSCRIPTION_PROVIDERS` を安定したカタログ順で走査させ、使用可能な
   アクティブなプロバイダー認証情報を持つ最初のモデルを選択します。
4. `callAudioTranscription()` は、base64／データ URI の音声をマルチパートの
   `file` に変換するか、DNS ピンニングと 25 MB の上限を備えたパブリック専用の
   アウトバウンドガードを通じてリモートの `audio_url` をダウンロードします。
   次に、`resolveSelfLoopBearer()` で認証し、ファイルと選択したモデルをローカルの
   `/v1/audio/transcriptions` 自己ループへ POST します。既存の文字起こしルートが、
   通常の認証情報検索、クールダウン／レート制限処理、プロバイダーへのディスパッチを行います。
5. 成功した呼び出しでは、該当部分が `[Audio N]: <transcript>` に置き換えられます。
   呼び出しは `Promise.allSettled` で実行され、個別の失敗時には元の音声部分が
   維持されます（#4012 の契約）。すべての呼び出しが失敗し、ターゲットが
   `supportsAudio === false` であることが実証されている場合、その部分は
   `[Audio N]: (unavailable — no STT provider connected)` になります（#8430 の契約）。
   不明なターゲット（`null`）では、すべて失敗した場合も変更されません。
   使用可能な STT 認証情報がないことが実証済みのテキスト専用ターゲットには、
   ネットワーク呼び出しを行わずに同じ明示的なスタブが渡されます。

成功した文字起こし結果では、プロセス全体で共有される Modality Bridge の
LRU/TTL キャッシュが使用されます。キーは、音声参照、安定した
`audio-transcription` 操作ラベル、選択された STT モデルを組み合わせたものです。
失敗はキャッシュされません。音声処理の試行により、共有の `bridged`、`cacheHits`、
`failures`、`lastUsedAt` カウンターが更新されます。変換されたレスポンスには
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` が含まれます。
変更されなかったリクエストには、Audio Bridge セグメントは付与されません。

ランタイム設定は DB に保存され、Zod で検証されます:

| キー                          | デフォルト | 範囲               |
| ----------------------------- | ---------- | ------------------ |
| `modalityBridgeAudioEnabled`  | `true`     | —                  |
| `modalityBridgeAudioModel`    | `""`       | Auto または STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000        |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10               |

共有キャッシュは引き続き `modalityBridgeCacheEnabled`、
`modalityBridgeCacheTtlMinutes`、`modalityBridgeCacheMaxEntries` によって制御されます。

### Video Bridge（`videoBridge.ts`、`videoBridgePipeline.ts`）

既知のネイティブ動画サポートを持たない対象が呼び出される前に、Chat Completions の `messages` および Responses
API の `input` に含まれるトップレベルの動画パートをインターセプトします。
サポートされる形式は、`input_video`、`video_url`、`video_source`、HTTPS URL、
および `data:video/*;base64,...` データ URI です。テキスト内の単純なファイル名は動画として扱われません。

`VideoBridgeGuardrail.preCall`（`videoBridge.ts`）は、リクエストの走査、
ケイパビリティ／ポリシーチェック、リクエスト単位の集約、およびレスポンスペイロードを担います。
動画単位の処理（取得、結果全体のキャッシュ、フレームシーケンスの記述
（呼び出し元が宣言した音声トランスクリプトがある場合は統合）、試行単位の
メトリクス／中止／クリーンアップ）は、`videoBridgePipeline.ts` の
`processVideoPart` の背後に隠蔽されており、`preCall` のループ内で動画パートごとに一度呼び出されます。
このモジュールでは、明示的なポート境界である `VideoMediaBrokerPort`
（バイトの取得とサンプリング済みフレームの抽出）、`VideoAudioTranscriptionPort`
（呼び出し元が宣言した音声トランスクリプトとサンプリング済みキャプションの統合）、および
`VideoDrilldownPort`（フレームのドリルダウン永続化境界。まだ
`processVideoPart` には接続されておらず、現時点でドリルダウンエントリを書き込むのは別の
`/api/modality-bridge/video/drilldown` ルートのみ）も定義されています。

公開 `/v1` リクエストパスは、サブプロセスをインポートも呼び出しもしません。リモート
動画は 50 MiB の上限内でダウンロードされます。インライン base64 動画には、モデル／メッセージ／フレーミングの
エンベロープを公開 JSON リクエストの受け入れ上限である 50 MiB 以内に収められるよう、
動画ごとにデコード後 36 MiB という保守的な上限があります。インライン
長とデコード後サイズの推定値は、メモリ割り当て前に検査されます。最初のリモート URL と
すべてのリダイレクトで HTTPS が必須であり、DNS ピンニングを備えた既存の
公開先限定アウトバウンドガードが使用されます。その後、バイト列は厳密な内部
`POST /api/modality-bridge/video/extract` ブローカー境界を通過します。このルートは
`LOCAL_ONLY` かつ `SPAWN_CAPABLE` であり、プロセス単位で認証された
信頼済みループバックリクエストのみを受け入れ、URL、ファイルシステムパス、実行可能ファイル、
または引数リストは一切受け入れません。API の本文サイズ処理パイプラインとハンドラーの増分本文
リーダーは、それぞれ独立して 50 MiB のブローカー入力上限を適用します。境界付きキューは
一度に 1 件の抽出を実行し、保留中のジョブを 4 件まで許可し、保留中の入力を
100 MiB に制限します。

ブローカー内部では、`ffprobe` が非公開のローカルファイルを読み取ります。固定のフォーマット
許可リストからは、プレイリスト形式とマニフェスト形式が除外されています。許可された MOV 系
コンテナでは、外部 MOV データ参照はデフォルトで無効のままであり、
固定コマンドでも有効化されません。`ffprobe` と `ffmpeg` はどちらも
`file` のみのプロトコル許可リスト、1 スレッド、固定引数配列、シェルなしを使用し、
実行可能ファイルは `PATH` から解決されます。添付画像のカバーストリームは
再生可能な候補ではありません。すべての再生可能ストリームが制限を満たす必要があり、
決定論的な最小インデックスへのフォールバックより前に、明示的なデフォルトストリームが優先されます。
動画は 600 秒、各次元 8,192 ピクセル、ソース全体で 33,554,432 ピクセルに制限されます。
FFmpeg は中点に位置する JPEG フレームを 1～16 枚サンプリングし、小さい入力を
アップスケールすることなく、長辺が最大 1,024 ピクセルになるよう縮小し、
URL を受け取ることはありません。デフォルトのサンプリングは `uniform` です。オプションの
`scene_aware` および実験的な `segment_aware` ポリシーでは、検証済みのローカルストリームに対して
固定の FFmpeg パスを 1 回追加で実行し、境界付きの
`showinfo` シーンタイムスタンプを選択します。検出器の失敗、タイムアウト、不正な出力、または
候補セットが空の場合は、同じ均一な中点へ決定論的にフォールバックします。
セグメント対応モードでは、検証済みのシーン区間に比例して中点サンプルを割り当てます。
セグメント対応のエビデンスとフォールバック動作については、以下で詳述します。すべてのポリシーで、
選択後に 16 フレームという厳格な上限が適用されます。シーン対応リクエストの
フレーム予算が 1 枚だけの場合は、アクティブな動画全体またはフォーカスウィンドウの均一な中点を使用し、
`policyEffective: uniform` と報告します。選択されるシーンフレームが 1 枚だけでは、
時間軸の両端を維持できないためです。呼び出し元は、有限のフォーカスウィンドウ
（`start`／`end` 秒）を任意で指定できます。境界はメディアの長さに合わせてクランプされ、
逆転したウィンドウまたは非有限のウィンドウは拒否され、すべてのサンプリング
ポリシーは正規化された区間内でのみ実行されます。得られた
ウィンドウはサンプリングメタデータと信頼されていない説明プレフィックスに含まれるため、
後続モデルはフォーカスされた抜粋とタイムライン全体を区別できます。

セマンティックなキャプションフォーカスは、独立した明示的な設定です。デフォルトの `full`
分析モードでは既存のフレームプロンプトを維持し、リクエストテキストをキャプションモデルへ転送しません。
`focused` モードでは、ブリッジは同じ Chat または Responses コンテナから、
ユーザーが作成した最新の空でない `text`／`input_text` のみを読み取り、NFC に正規化し、
制御文字と空白をまとめ、Unicode コードポイント 500 個に制限します。結果が空の場合は、
厳密に同じ `full` プロンプトへフォールバックします。使用可能なヒントは、専用の
信頼されていないユーザーコンテキストブロック内で JSON としてシリアライズされ、
観察可能な詳細の優先順位付けにのみ使用できます。メディア内で視認または聴取できる
指示に従わないよう求める別の警告を上書きすることはできません。テキストによるフォーカスから
`start`／`end` が推論されることはなく、時間サンプラーも変更されません。

#### FU-07 構造的セグメントエビデンス

`segment_aware` は、検証済みのローカル動画ストリームに対して、境界付きの事前分析パスを
1 回実行します。固定フィルターチェーンは、まず幅を最大 320 ピクセルに縮小し、
シーン変化とフリーズ区間を検出した後、ぼけ、平均輝度、空間的／時間的情報を得るために
毎秒 1 フレームをサンプリングします。このパスは、構造サンプル 600 個、1 つの
FFmpeg／フィルタースレッド、同一の `file` のみのプロトコル許可リストとコンテナ許可リスト、
1 MiB のプロセス出力上限、およびブローカーで共有される中止／期限内の最大 30 秒に制限されます。
リクエストからコマンド、フィルター、パス、または URL を受け取ることはありません。

構造値は決定論的なサンプリングの根拠であり、動画の意味的理解ではありません。被写体、動作、キャプション、音声、またはユーザーの意図を推論するものではありません。シーン境界とフリーズ境界によってセグメントが形成されます。フリーズ範囲、ぼけ、露出、空間的ディテール、時間的変化は、既存の1～16フレームの予算をどのように割り当てるかにのみ影響します。完全にフリーズしているセグメントは1フレームに制限され、フリーズしていないセグメントが残りの予算を競合して使用します。境界数がフレーム数を上回る場合は、冒頭の高速なカットによって末尾の長いセグメントが隠れないよう、タイムライン全体にわたる均等なカバレッジが維持されます。フリーズ境界から1秒の解析解像度内にあるシーン境界は統合されます。

フィルターの欠落、不正または空の根拠、検出器エラー、あるいは制限時間付き事前解析のタイムアウトが発生した場合は、厳密な均等中点ポリシーにフォールバックします。呼び出し元による中止またはブローカーのデッドラインではフォールバックしません。実行中のサブプロセスを終了し、後続のフレーム抽出を防止したうえで、プライベート一時ディレクトリツリーを `finally` で削除します。

`scripts/perf/video-bridge-fu07-eval.ts` は、重複排除後のキャプション呼び出し削減量、高密度モーションに対する予算割り当て、ぼけ／露出／SI-TIの根拠、長い末尾部分を伴う高速カット、および段階的フェードによる偽陽性を評価するため、決定論的な実物のFFmpegフィクスチャを生成します。事前解析の実時間を記録し、`/usr/bin/time` が使用可能な場合は、子プロセスのCPU使用量とピークRSSも記録します。その品質チェックは構造的なオラクルにすぎません。このハーネスには承認済みエンドポイントも固定された判定基準もないため、実際のキャプションモデルの品質は引き続き `HOLD` です。金銭的な削減効果も、`--caption-cost-per-call-usd` で1回の呼び出し当たりの明示的な正のコスト見積もりを指定しない限り、`HOLD` のままです。このスクリプトがいずれかの結果を捏造することはありません。

各フレームは4 MiB、すべてのrawフレームの合計は23 MiB、シリアライズされたブローカーレスポンスは32 MiBに制限されます。プライベート一時ディレクトリは `finally` で削除されます。OmniRouteにはFFmpegは同梱されておらず、カスタム実行ファイルパスも受け付けません。キャプション生成前に、ブリッジは保守的な視覚的重複排除パスを適用します。各JPEGは16×16のグレースケールバッファーに縮小され、最後に保持されたフレームとのみ比較されます。要求されたキャプション予算が1フレームを超える場合、抽出処理はその予算の最大2倍、かつ16フレーム以下に制限された候補プールを提供します。要求された上限は重複排除後にのみ適用され、予算が2以上の場合は、最終的な間引きの際に選択された最初と最後の候補が保持されます。バージョン管理された `grayscale-16x16-mean-cells-v2` ポリシーでは、平均輝度差と、正規化された差分が0.05以上であるサムネイルセルの割合のうち、大きい方を使用します。重複判定のしきい値は定数0.04であり、実行時設定として公開するのではなく、予測可能性を重視して選定されています。この二次的な高コントラスト信号により、平均値のみの比較では見落とされる可能性のある小さな動きや、目に見えるテキストの変化が保持されます。比較器またはデコーダーでエラーが発生した場合はフォールバックし、カバレッジを維持します。出力メタデータでは、抽出された候補、正常に使用されたフレーム、および除外された視覚的重複が区別されます。

明示的にマークされた動画パートでは、タイムスタンプ付きコンタクトシートを要求できます。ブリッジは最大4列、16フレームのJPEGグリッドを構築します。各512ピクセルのセルでは、ソースのタイムスタンプが高コントラストの下部帯に焼き付けられます。同じタイムスタンプは、後続処理での関連付けと監査のため、テキストメタデータにも保持されます。完成したJPEGは32 MiB以下に制限されます。`sharp` がグリッドをデコードまたは合成できない場合、ブリッジは個別のJPEGフレームにフォールバックします。クライアントによる中止は、引き続きシート処理まで伝播します。

昇格の根拠は、合成によるコンポジションのマイクロベンチマークから意図的に分離されています。`scripts/perf/video-bridge-contact-sheet-eval.ts` は、実際のOpenAI互換ビジョンモデル向けに、スキーマでバージョン管理されたA/Bハーネスを定義します。このハーネスは、プロバイダーから報告されたトークン数、エンドツーエンドの実時間レイテンシ（シート合成を含む）、モデル呼び出し回数、およびマニフェストで定義された事実の保持率を測定します。モデルのrawレスポンスはレポートに書き込まれず、SHA-256ダイジェストと一致した事実IDのみが保持されます。`--execute-real` が渡され、かつ `--model`、`OMNIROUTE_BASE_URL`、`OMNIROUTE_API_KEY` が設定されていない限り、このハーネスはネットワーク呼び出しも有料モデル呼び出しも行いません。その明示的な実行がなければ、機械可読な判定は `HOLD` のままです。合成ペイロードや呼び出し回数の測定値だけでは、昇格の根拠にはなりません。

呼び出し元がすでに時間同期済みテキストを保有している場合、サポート対象の動画パートにオプションの `transcript.cues` 配列を付加できます。各キューには、`text`、プローブされた再生時間内の有限な `start`/`end` 区間、および許可リストに登録された `source`（`client`、`embedded`、または `audio-bridge`）が必要です。`confidence` のデフォルト値は `1` で、`0` から `1` の範囲内でなければなりません。完全に重複するキューは統合されます。OmniRouteがこのメタデータから文字起こしを開始することはありません。検証済みのキューは、ソース、信頼度、区間とともに記述結果へコピーされ、フレームキャプションと併せて信頼されていない観測情報としてレンダリングされます。無効なテキスト、範囲外のテキスト、または出所情報のないテキストは、キャプションストリームに混入させるのではなく拒否されます。現在、`source` フィールドは呼び出し元による自己申告であり、サーバーによって検証されていません。OmniRouteは値が許可された3つの文字列のいずれかであることを強制しますが、`embedded` または `audio-bridge` というラベルが実際にサーバー所有の抽出処理から得られたものかどうかを暗号学的に確認することは、まだ行いません。この検証が実装されるまでは、`source` を信頼されていないヒントとして扱い、認可に関する判断をこれに基づいて行わないでください。

高度な呼び出し元は、同じ動画に対して認可済みの `audioTranscript` トラックを提供できます。
フュージョン境界では、映像と音声の観測を単一の期限および中止シグナルの下で実行し、
共通のタイムライン上に並べ、完全な重複を統合し、一方だけが成功した場合は
部分結果を報告します。無効な `audioTranscript` があってもリクエスト全体は失敗せず、
部分結果へと縮退します。つまり、映像の説明は保持され、音声ブランチには
サニタイズ済みの失敗コードが記録されます。ブランチごとの可用性、部分結果フラグ、
およびサニタイズ済みの失敗コードは、説明結果、ガードレールのメタデータ
（`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`）、結果キャッシュのメタデータ、およびブリッジの
フュージョンカウンターに保持されます。デフォルトの Video Bridge パスでは、
音声テキスト変換を呼び出したり、メディアのコピーをもう1つダウンロードしたりしません。
そのトラックが明示的に指定されていない場合、動画のみのままです。

**トランスクリプトの保持（#12150 P1）。** これは、Video Bridge（それ自体がオプトイン）が
トランスクリプトのキューをレンダリングするたびに自動的に適用され、別個の
保持フラグはありません。リクエストがいずれかのトランスクリプトのキュー
（呼び出し元が宣言した `transcript` またはフュージョンされた `audioTranscript`）を
レンダリングすると、ガードレールはそれを `videoBridgeObserved` としてマークし、
動画説明の編集済みシャドウを生成します。これは、各キューの自由記述本文を
`[redacted-video-transcript]` に置き換えた同一形式のレンダリングです。この置換は、
文字列を組み立てる前に構造化されたキューフィールドに対して行われます
（フラット化されたテキストを解析することはないため、敵対的か通常かを問わず、
`]` を含む本文、たとえば `[inaudible]`/`[music]` を含め、キューの内容が残ることは
ありません）。永続化される呼び出しログのリクエスト本文では、内容の一致によって
照合された動画由来の各テキスト部分が、その編集済みシャドウに置き換えられます。
`fullText` アンカーは、完了した呼び出し前ガードレールのペイロードから再度読み取られるため、
後続の連鎖ガードレール（PII および認証情報マスカー、優先度 10/95）が説明テキストを
その場で書き換えた後や、システムプロンプト／ハンドオフ／メモリの注入によって
メッセージ配列の形が変わった後でも、照合は成功します。モデルへアップストリーム送信される
本文は変更されません。観測対象となったリクエストは、永続的な Memory も一切生成しません
（リクエスト由来とレスポンス由来の両方の抽出がスキップされます）。そのため、
モデル自身の応答がトランスクリプトのテキストを Memory に反映することはありません。

依然として未対応の保持面があり、フォローアップ（**P2**、#12430）として追跡されています。
詳細ログアーティファクト内にあるガードレール適用前の未加工クライアントリクエストの
スナップショット、`previous_response_id` の継続処理におけるフェイルクローズ、
合成された文字列プロンプト内にトランスクリプトを埋め込む派生プロンプトの内部ディスパッチ
（パイプラインステージ、コンテキストハンドオフ）、およびトランスクリプトを引用した
モデル応答のレスポンス本文／セマンティックキャッシュのコピーです。これらは、
P1 の永続化リクエスト本文および Memory のスコープ外にある、未加工データ／レスポンス系
またはオプトインの保持面です。

内部の `/api/modality-bridge/video/drilldown` ライフサイクルは、独立した
ループバック／トークン認証付きのキャッシュ基盤です。すべての操作には、
正規化された不透明なプリンシパル ID も必要です。本番環境の呼び出し元を有効にする前に、
認証済みテナントからその ID を導出しなければならず、クライアントが選択した値を
転送してはなりません。キャッシュキーでは、そのプリンシパルを正規化されたセッション ID
および動画参照 ID に結び付け、それらの SHA-256 由来キーのみを保存し、読み取りと削除の
両方を同じプリンシパルに限定します。キャッシュは、エントリごとに最大16個の派生 JPEG
フレームを保存し、10分後に期限切れとし、境界付きの `start`/`end` 読み取りまたは
明示的なセッション削除をサポートします。

各プリンシパルには、16エントリおよび 64 MiB の正規 JPEG データという上限があります。
これらの上限は、グローバルな64エントリ／256 MiB の上限から独立しています。
プリンシパルのクォータが逼迫した場合、グローバル LRU 退避が検討される前に、
そのプリンシパルの最終使用時刻が最も古いエントリだけが退避されます。期限切れの
エントリは、キャッシュ操作時にプリンシパル側とグローバル側の両方の集計から
除去されます。一方、キャンセルや検証失敗が発生した場合、部分的な置換はコミットされません。

このキャッシュは、非正規の Base64、過剰なパディング、JPEG 以外のメディア、
不正形式または途中で切れた JPEG、および制限付きの全画像 `sharp` デコード中に
警告が発生する JPEG を拒否します。受け入れた各画像を正規 JPEG として再エンコードし、
呼び出し元のフィールドを信頼せずに、デコードされたバイト列から幅と高さを導出します。
また、末尾に付加されたポリグロットバイトは保持せずに破棄します。両方のクォータに
計上されるのは、制限された正規圧縮バッファのみです。JSON の転送上限には、
32 MiB のデコード済み入力上限に対する Base64 のオーバーヘッドも含まれます。
保存されるすべての派生データには、検証済み JPEG の形式／解像度、サンプリングポリシー、
派生バージョン、作成時刻、サーバーが計算したコンテンツハッシュ、およびハッシュ化された
親参照と信頼済み呼び出し元の親コンテンツハッシュが記録されます。アトミックな
キャッシュコミットの前に、非同期のデコード／ハッシュ処理フェーズ間でキャンセルが
確認されます。

このトランシェでは、本番環境のプロデューサーはまだルートに接続されておらず、
複数解像度のバリアント選択も提供されません。したがって、透過的な Video Bridge の
リクエストパスに追加作業は発生しません。一方、テナントに結び付けられたプリンシパルの
導出と完全な FU-08 複数解像度ライフサイクルは、完了済みの動作として文書化されるのではなく、
明示的なフォローアップ作業のままです。

フレームは、設定された Video モデルを使用して順番にキャプション付けされます。Video オーバーライドが空の場合は Vision 設定を継承し、両方が空の場合は Vision オートルーターが実際に使用する視覚対応モデルを選択します。キャプション生成に成功すると、元のパートは安定した `[Video description:` プレフィックスを持つテキストに置き換えられます。このプレフィックスは、そのテキストが信頼できないメディア由来の観察結果であることも示し、メディア内で見つかった指示に従わないよう後続モデルに伝えます。フレームキャプションのキャッシュキーには、JPEG バイト列、プロンプト、タイムスタンプ、実効モデルが含まれ、成功したキャプションのみがキャッシュされます。キャッシュエントリには、フォールバックモデルを含め、実際に生成に成功したモデルが保持されます。異なるフレームが異なるモデルによって生成された場合、ブリッジは `mixed` と報告します。キャッシュヒット時は、その生成モデルの識別情報が再利用され、要求されたルーティングプランとして再ラベル付けされることはありません。動画全体の結果キャッシュは、出力を変化させるすべての入力（プロンプト、実効モデル、サンプリングポリシー、フレーム数、セマンティック分析モード、正規化されたフォーカスヒントの SHA-256 フィンガープリント、フォーカスウィンドウ、`transcript`、`audioTranscript`、コンタクトシートフラグ）をキーとします。そのため、これらのいずれかを変更するとキャッシュミスとなり、古い結果が再利用されることはありません。視覚的重複排除ポリシーのバージョン、しきい値、上限付き候補フレーム数も、結果キャッシュのキーとメタデータに明示的に含まれます。したがって、ポリシーが変更された場合、古い動画全体の説明が再利用されることはありません。結果キャッシュ v4 のメタデータには、モードとフィンガープリントが保持されますが、ユーザータスクの生データは保持されません。ガードレールのメタデータでは、要求された分析モードと実効分析モードの両方が報告されます。使用可能なユーザーテキストがない状態で `focused` モードが要求された場合、実効モードは `full` として報告されます。

ガードレールは、サポートされているすべての動画パートを抽出しますが、説明する動画は `modalityBridgeVideoMaxVideos` 以下に制限されます。`supportsVideo === false` であることが確認されたターゲットでは、処理に失敗した動画および上限を超えた動画が明示的で安全なテキストマーカーに置き換えられるため、生の動画が残ることはありません。機能が不明な場合、それらのパートは変更されません。`supportsVideo === true` のターゲットはブリッジをバイパスします。クライアントリクエストの中止シグナルは、ダウンロード、ブローカーキュー、サブプロセス、キャプション呼び出しまで伝播します。中止時は動画間で処理が停止され、生のメディアへフェイルオープンすることはありません。

ランタイム設定は DB に保存され、Zod で検証されます。

| キー                                | デフォルト  | 範囲／動作                                                                                              |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | オプションのランタイム機能、オプトイン                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` は汎用キャプションを維持し、`focused` は上限付きで信頼できない最新ユーザーコンテキストを使用     |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge モデルを継承                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1～16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`、または比例配分の `segment_aware`。検出器の失敗時は `uniform` にフォールバック |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1～4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000～120000 ms                                                                                         |

永続化済みの従来の Video タイムアウト値が 120 秒を超えている場合は、ブローカーのデッドラインにクランプされます。新しい設定の書き込みでこの上限を超える値は拒否されます。`GET /api/modality-bridge/video/runtime` では、認証やランタイムのプローブより前に、信頼済みとしてスタンプされたループバックローカリティが必要であり、その後に管理認証も必要です。このエンドポイントが返すのは、`available`、サニタイズ済みの FFmpeg/ffprobe バージョン、およびランタイムが利用できない場合の固定理由のみです。内部抽出エンドポイントは公開アップロード API ではありません。キューが飽和している場合は `503` と `Retry-After` を返し、呼び出し元が切断した場合は `499`、固定されたブローカーのデッドラインに達した場合は `504` を返します。変換されたレスポンスでは、Vision または Audio のセグメントを削除することなく、中央の `x-omniroute-modality-bridge` ヘッダーに `video->text;model=<visionModel>;parts=<videos>` が追加されます。

### PII マスカー（`piiMasker.ts`）

**両方**のステージで実行されます。

- **`preCall`** はペイロードをクローンし、`system`、`messages`、`input`、`prompt`（プレーンな文字列項目を含む）を走査して、文字列の `content`/`text` フィールドに `processPII()`（`@/shared/utils/inputSanitizer` 由来）を適用します。`PII_REDACTION_ENABLED=true` の場合、検出された PII は送信ペイロード内で秘匿化されます。これは `INPUT_SANITIZER_MODE`（プロンプトインジェクションポリシーのみを制御）とは独立しています。秘匿化が無効な場合、呼び出しはコンテンツを書き換えずに検出数を記録します。
- **`postCall`** はレスポンスをディープクローンし、`sanitizePIIResponse()` に加えて Responses API 形式のマスカー（`maskResponsesOutput` — `output_text` および `output[].content[].text` を対象）を実行します。いずれかの秘匿化が行われた場合、変更後のレスポンスが元のレスポンスを置き換えます。

ガードレールがブロックすることはなく、注釈（`meta.detections`、`meta.redacted`）の追加または書き換えのみを行います。

### プロンプトインジェクション（`promptInjection.ts`）

ユーザー提供コンテンツ内の敵対的な構造を検出し、設定されたポリシーを適用します。動作は環境変数とコンストラクターオプションによって決まります。

| 設定             | 環境変数                                                                                                        | デフォルト | 効果                                                                                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有効化           | `INPUT_SANITIZER_ENABLED`                                                                                       | `true`     | `false` の場合、ガードレールは処理を短絡します。                                                                                                                                                                            |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                 | `warn`     | インジェクションポリシー：`block`、`warn`、または `log`。（後方互換性のため `redact` も受け付けますが、インジェクションテキストは削除され**ません**。リクエストの PII 書き換えは `PII_REDACTION_ENABLED` で制御されます。） |
| ブロックしきい値 | `blockThreshold` オプション / `INPUT_SANITIZER_BLOCK_THRESHOLD`（エイリアス `INJECTION_GUARD_BLOCK_THRESHOLD`） | `high`     | ブロックに必要な最小重大度です。デフォルトでは Medium は監視のみです。                                                                                                                                                      |

**モードの優先順位**（`getMode`）：呼び出し元の `options.mode` →
`INJECTION_GUARD_MODE` の **DB 機能フラグによるオーバーライド**（ダッシュボード → 設定 →
機能フラグ）→ `INJECTION_GUARD_MODE` 環境変数 → `INPUT_SANITIZER_MODE` 環境変数 →
`warn`。したがって、ダッシュボードのオーバーライドは環境変数より優先されるため、機能
フラグ UI から実行中のガードをリアルタイムに制御できます（再起動不要）。DB の読み取りはフェイルセーフです。
エラーが発生した場合、ガードは環境変数ベースの動作にフォールバックし、
オーバーライドが設定されていない場合の動作は、環境変数のみで解決する場合と同一です。

検出元：

1. `@/shared/utils/inputSanitizer` の `sanitizeRequest()`（パイプライン内の
   他の場所でも使用される共有検出器セット）。
2. 組み込みの `DEFAULT_GUARD_PATTERNS`（現在は `system_override_inline` と
   `markdown_system_block`。どちらも重大度は `high`）。
3. コンストラクターオプションで渡される任意の `customPatterns`（文字列、正規表現、
   または `{ name, pattern, severity }` レコード）。

`mode === "block"` **かつ**少なくとも 1 つの検出結果が重大度の
しきい値以上である場合、`preCall` は `{ block: true, message: "Request rejected:
suspicious content detected" }` を返します。`warn`/`log` モードでは、ガードレールはログを
記録しますが、呼び出しは許可します。共有ヘルパー `evaluatePromptInjection()` も
エクスポートされており、レジストリを経由せずにプロンプトを評価する必要がある呼び出し元が利用できます。

**スキャン上限（v3.8.20）：** 検出器は、結合されたプロンプトテキストの**先頭 16 KB**のみを
検査します。`src/shared/utils/inputSanitizer.ts` では
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`（16 384 バイト）です。`detectInjection()` と
`evaluatePromptInjection()` はどちらも、パターンループを実行する前に
`slice(0, MAX_INJECTION_SCAN_BYTES)` を適用します。インジェクション指示は入力の先頭付近に
配置されるため、これにより検出能力を弱めることなく、数百 KB のペイロードに対する正規表現の CPU/GC
負荷を制限できます（#3932、#4041 を参照）。

### 認証情報マスカー（`credentialMasker.ts`）

**両方**のステージで、デフォルトチェーンの最後（優先度 `95`）に実行されます。
送信ペイロード（メッセージ内容、ツール呼び出し引数、ツール結果）**および**
プロバイダーのレスポンスから、既知の API キー／シークレットトークンのパターンを秘匿化します。
これにより、プロンプトに貼り付けられた認証情報（またはツール結果によって返された認証情報）が、
上流プロバイダーやクライアントに漏洩することを防ぎます。

- PII 秘匿化と同じ規約に従い、**明示的な有効化が必要**です（ハードルール #20 に準拠）。
  `settings.credentialRedactionEnabled === true` **または**
  `CREDENTIAL_REDACTION_ENABLED=true` でない限り無効です。無効な場合、ガードレールは何も行わず、
  ブロックも書き換えも一切行いません。
- `redactCredentials()` はペイロード／レスポンスのツリー全体を走査し（`walkValue()`、
  プロトタイプ汚染に対して安全、`WeakSet` により循環参照にも安全）、一致箇所を
  `[REDACTED:<type>]` プレースホルダーに置き換えます。実際に変更された分岐のみを
  クローンします。
- `CREDENTIAL_PATTERNS` は、LLM プロバイダーのキー（OpenAI、OpenAI-proj、
  Anthropic、Google、Hugging Face、Replicate）、VCS/SaaS トークン（GitHub、Slack、
  Linear、Notion、npm、Postman、Discord）、決済キー（Stripe、Square）、クラウド
  キー（AWS アクセスキー、Twilio、SendGrid、Mailgun）、秘密鍵／JWT、
  認証情報を含む接続文字列（`mongodb://user:pass@...` など）、および汎用的な
  `Authorization`/`x-api-key`/`api-key`/`apikey` ヘッダー値パターンを対象とします。
  ヘッダー形式のキー（`authorization`、`x-api-key`、`api-key`、
  `apikey`）は、汎用テキスト正規表現ではなく構造的に秘匿化されます（値のみを秘匿化し、
  `Bearer `/`Basic ` のようなスキームプレフィックスは保持されます）。
- ガードレールはブロックを行わず、書き換え（`modifiedPayload` /
  `modifiedResponse`）と注釈付け（`meta.credentialsRedacted`、`meta.count`）のみを行います。

リグレッションガード：`tests/unit/credential-masker-guardrail.test.ts`。

## 基底コントラクト (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true の場合、チェーンを即座に終了する
  message?: string; // ブロック時に通知される
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // リクエストを書き換えるために preCall から返される
  modifiedResponse?: TValue; // レスポンスを書き換えるために postCall から返される
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

ガードレールは、`void`、`{}`、または `{ block: false }` のいずれかを返すことで「変更なし」を示します。`modifiedPayload`/`modifiedResponse` を返すと、チェーンを通って後続のガードレールに渡される値が置き換えられます。
`signal?: AbortSignal` は、呼び出し元のライフサイクルをガードレールに引き継ぎます。リクエストの中断は、意図的なフェイルオープンの例外です。メディアブリッジは処理を停止してクリーンアップを行い、未加工のメディアをサポートしないことが判明しているターゲットに、そのメディアを復元することはありません。

## レジストリ (`registry.ts`)

シングルトンの `guardrailRegistry` は、以下を公開します。

- `register(guardrail)` — ガードレールを追加（または正規化された名前に基づいて置換）し、`priority` の昇順で再ソートします。
- `clear()` / `list()` — 管理用のヘルパーです。
- `runPreCallHooks(payload, context)` — 有効なガードレールを反復処理し、`modifiedPayload` を介してペイロードを順次引き渡し、最初の `block: true` で停止します。
- `runPostCallHooks(response, context)` — レスポンス側で同じ処理を行います。
- `resetGuardrailsForTests({ registerDefaults })` — 状態をクリアし、必要に応じてデフォルトを再登録することで、テストをクリーンに分離します。

どちらのランナーも `{ blocked, payload|response, results, guardrail?, message? }` を返します。ここで `results` は、ガードレールごとの `blocked`、`skipped`、`modified`、`error`、`meta` フィールドを含む `GuardrailExecutionResult` レコードの配列であり、トレースに役立ちます。

### リクエストごとのガードレールの無効化

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` は、現在のリクエストでスキップすべきガードレール名を重複のないリストとして集約します。情報源は以下のとおりです（すべて任意であり、すべてマージされます）。

- `apiKeyInfo.disabledGuardrails`
- リクエスト本文の `disabledGuardrails`（トップレベル）
- リクエスト本文の `metadata.disabledGuardrails`
- ヘッダー `x-omniroute-disabled-guardrails`（またはレガシーの `x-disabled-guardrails`）

値には文字列の配列またはカンマ区切りの文字列を指定できます。名前は小文字のケバブケースに正規化されます（`pii_masker` → `pii-masker`）。結果は `context.disabledGuardrails` を介してレジストリに渡され、レジストリは一致するガードレールをスキップします（`results` 内で `skipped: true`）。

## 実行順序

`src/sse/handlers/chat.ts` および
`open-sse/handlers/chatCore.ts` を通過する各リクエストについて:

1. `resolveDisabledGuardrails(...)` は、API キー、ボディ、
   ヘッダーからスキップリストを構築します。
2. `guardrailRegistry.runPreCallHooks(body, ctx)` は、優先度の昇順で
   ガードレールを実行します:
   - 無効化されたガードレールは `skipped` として記録されます。
   - 各ガードレールの `preCall` は、`modifiedPayload` を介してペイロードを書き換える場合があります。
   - 最初の `block: true` によってチェーンが短絡され、ハンドラーは
     ガードレールによる拒否レスポンスを返します。
3. （書き換えられている可能性のある）ペイロードは、コンボルーティングとアップストリームへの
   ディスパッチに渡されます。
4. レスポンスの構築後、`guardrailRegistry.runPostCallHooks(...)`
   はレスポンスに対して同じチェーンを実行します。ここで `block: true` になると、アップストリームの
   レスポンスは破棄されます。

例外をスローしたガードレールは `error: <message>` として記録され、
`logger.warn` を介してログに記録されますが、チェーンは継続します。これは意図的なフェイルオープン設計です。

## 設定

組み込みガードレールが読み取る環境変数:

| 変数                                  | 使用元                           | 効果                                                                                                                          |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`               | 検出を完全に無効化するには `false` に設定します。                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`               | インジェクションポリシー: `warn`、`block`、または `log`。従来の値 `redact` ではインジェクションテキストは書き換えられません。 |
| `INJECTION_GUARD_MODE`                | `prompt-injection`               | インジェクションガードのモード。環境変数を**上書きする** DB 機能フラグでもあります（DB > ENV）。                              |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`               | `MODE=block` が拒否する最小重大度: `high`（デフォルト）、`medium`、または `low`。                                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`               | `INPUT_SANITIZER_BLOCK_THRESHOLD` の従来のエイリアス。                                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`                     | `true` の場合、リクエスト内の PII が秘匿化されます（インジェクションモードとは独立）。                                        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker`（ダウンストリーム） | レスポンス側のマスカーの動作を制御します。                                                                                    |

Modality Bridge ガードレールは、環境変数ではなく、DB を基盤とする設定
ストア（`getSettings()`）からランタイム設定を読み取ります。Vision の主要キーは
`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、
`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、
`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、
`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、
`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`、および
`modalityBridgeCacheMaxEntries` です。従来の
`visionBridge*` キーは、文書化されている 1 サイクル限りの読み取り
フォールバックとしてのみ受け入れられます。ダッシュボードからの書き込みには主要キーが使用されます。デフォルト値とフォールバック
リゾルバーは `src/shared/constants/modalityBridgeDefaults.ts` にあり、従来の
定数は `src/shared/constants/visionBridgeDefaults.ts` に保持されています。

Audio は `modalityBridgeAudioEnabled`、`modalityBridgeAudioModel`、
`modalityBridgeAudioTimeout`、`modalityBridgeAudioMaxClips`、および共有の
`modalityBridgeCache*` 設定を使用します。これらのキーは Modality Bridge スキーマとともに
導入されたため、Audio には従来キーへのフォールバックはありません。

Video は `modalityBridgeVideoEnabled`、`modalityBridgeVideoAnalysisMode`、
`modalityBridgeVideoModel`、
`modalityBridgeVideoFrameCount`、`modalityBridgeVideoSamplingPolicy`、
`modalityBridgeVideoMaxVideos`、および
`modalityBridgeVideoTimeout` と、共有の `modalityBridgeCache*` 設定を使用します。
FFmpeg/ffprobe は任意の運用依存関係であり、
フレームのキャプション生成によってレイテンシとモデルコストが増加するため、デフォルトでは無効になっています。

## カスタムガードレール

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

手順:

1. `BaseGuardrail` を継承する `src/lib/guardrails/myGuardrail.ts` を作成します。
2. `preCall` および/または `postCall` を実装します。
3. インポート時に登録する（`registerDefaultGuardrails` から追加する）か、
   実行時に `guardrailRegistry.register(...)` を呼び出します。レジストリは、
   正規化された名前が同じ既存のガードレールを置き換えます。
4. `tests/unit/` 配下にテストを追加します（既存の例:
   `tests/unit/guardrails-registry.test.ts`、
   `tests/unit/prompt-injection-guard.test.ts`、
   `tests/unit/guardrails/visionBridge.test.ts`）。

## テスト

テスト間では `resetGuardrailsForTests()` を使用し、既知の状態から開始します。
空のレジストリから開始し、テスト対象のガードレールのみを登録するには、
`{ registerDefaults: false }` を渡します。Vision Bridge は依存性注入
（`deps.getSettings`、`deps.callVisionModel`）を受け付けます。Audio Bridge も、
設定、ケイパビリティ、STT モデル選択、認証情報チェック、文字起こしについて
同等の差し替えポイントを公開しています。そのため、テストでは DB や
ネットワークにアクセスせずに、両方のフローを実行できます。

## 関連項目

- `src/lib/guardrails/` — 実装
- `src/shared/utils/inputSanitizer.ts` — プロンプトインジェクションと PII マスキングを
  支える共有検出器
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge のデフォルト値と
  強制ブリッジモデルのリスト
- `src/shared/constants/modalityBridgeDefaults.ts` — Vision/Audio で共有される実行時のデフォルト値
- `docs/architecture/RESILIENCE_GUIDE.md` — 直交するレイヤー（サーキットブレーカー、クールダウン）
- `docs/reference/ENVIRONMENT.md` — 環境変数の完全なリファレンス

## インジェクションガードのルートカバレッジとレッドチーム（フェーズ 8 · ブロック D）

インジェクションガード（`createInjectionGuard` / `withInjectionGuard`）は、ユーザープロンプトを
受け付けるすべてのルートを対象とします。`INJECTION_GUARD_MODE` に従って動作します（デフォルトの
`warn` = ログのみ、`block` = HTTP 400 `SECURITY_001` を返します）。

| 種類             | ルート                                                                                                                                               | デフォルトモード |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| テキスト（既存） | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn             |
| 生成系           | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn             |
| データ           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn             |

テキスト抽出（`extractMessageContents`）は、`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` を対象とします。

**レッドチーム（夜間実行、`nightly-llm-security.yml`）:** promptfoo は、
`INJECTION_GUARD_MODE=block` で各ルートが OWASP-LLM コーパスをブロックすることを検証します。
garak はプローブを実行します（シークレットがない場合はスキップします）。
一貫性を保つため、`moderations` も対象に含まれています。ブロックモードの運用者は、
`resolveDisabledGuardrails` を使用してこれを除外できます。

夜間ワークフロー（`.github/workflows/nightly-llm-security.yml`、cron + 手動
ディスパッチ）には、次の 2 つのジョブがあります:

- **`promptfoo-guard`（ブロッキング）** — `INJECTION_GUARD_MODE=block` を指定して
  `promptfoo eval -c promptfooconfig.yaml` を実行します。各敵対的ケース（例:
  「以前の指示をすべて無視せよ…」、DAN 形式のジェイルブレイク）では、
  レスポンスに `error.code === "SECURITY_001"` が含まれること、つまりガードが
  実際にリクエストを拒否したことを検証します。
- **`garak`（参考情報）** — ローカルの OmniRoute インスタンス
  （`http://localhost:20128/v1`）に対して、garak
  `--probes promptinject,dan,leakreplay` を実行します。プロバイダーシークレット
  （`PROMPTFOO_PROVIDER_KEY`）の存在を条件とし、シークレットがない場合は問題なく
  スキップされます。また、末尾に `|| true` が付いているため、CI を失敗させずに
  結果を報告します。

ガードヘルパー（`createInjectionGuard` / `withInjectionGuard`）のカバレッジは、
プロンプトを受け取るすべての `/v1` ルートに及びます。プロンプトテキストは、
`src/shared/utils/inputSanitizer.ts` 内の `extractMessageContents()` によって、
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` から
抽出されます。
