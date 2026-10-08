# Guardrails (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **信頼できる唯一の情報源:** `src/lib/guardrails/`
> **最終更新:** 2026-08-29 — v3.8.51（Video Bridge の文字起こしの来歴は呼び出し元による宣言であり、
> まだサーバー側では検証されていないことを #11661 に基づき明確化）

ガードレールは、OmniRoute とアップストリームプロバイダーの境界で、安全性、ポリシー、およびコンテンツ変換を適用します。各ガードレールは、リクエストペイロード（`preCall`）とアップストリームレスポンス（`postCall`）を検査し、必要に応じて拒否、変換、または注釈付けできます。

システムは **フェイルオープン** です。ガードレールの実行中に例外が発生した場合、レジストリはエラーを記録し、リクエストを失敗させるのではなく、次のガードレールの処理を続行します。ブロックは常に明示的な判断（`block: true`）であり、偶発的に発生することはありません。

## 組み込みのガードレール

レジストリは、インポート時に優先順位に従って6つのガードレールを自動的にロードします（`registry.ts` → `registerDefaultGuardrails()` を参照）。

| 優先度 | 名前                | ステージ       | ファイル              |
| ------ | ------------------- | -------------- | --------------------- |
| `5`    | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`    | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`    | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`   | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`   | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`   | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

優先度番号が小さいほど**先に**実行されます。

### Vision Bridge (`visionBridge.ts`) — モダリティブリッジ PR-1

**非ビジョンモデル**を対象とした画像を含むリクエストをインターセプトし、アップストリーム呼び出しの前に、リクエスト全体をビジョン対応モデルに再ルーティングするか、設定可能なビジョンモデルによって生成されたテキスト記述で画像部分を置き換えます。これにより、テキストのみのプロバイダーがマルチモーダルペイロードを透過的に処理できるようになります。

フロー:

1.  ターゲットモデルがすでにビジョンをサポートしている場合（強制ブリッジリスト `isVisionBridgeForcedModel` に含まれている場合を除く）はスキップします。
2.  `extractImageParts(messages)` (`visionBridgeHelpers.ts`) を介して画像部分を抽出します。これは、コンボ互換性フィルターと共有される唯一の信頼できる情報源である `open-sse/utils/mediaParts.ts` 内の**統合メディア検出器** `detectMediaParts()` に委譲されます。抽出は、`replaceImageParts` が元に戻せる形状のトップレベル部分（抽出↔置換契約）に許可されています：OpenAI `image_url`、Anthropic base64 `source.type:"base64"`、Anthropic URL `source.type:"url"`、および Responses API `input_image`。ネストされたヒットやインジケーターのみの形状はコンボフィルターの対象であり、抽出されることはありません。何も見つからない場合はスキップします。
3.  `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) を介してランタイム設定を解決します。新しい `modalityBridge*` 設定キーが優先され、レガシーな `visionBridge*` キーは**ワンサイクルフォールバック**（ロールバックウィンドウ）として残ります。ブリッジが無効になっている場合、メディアトラバーサルの前にスキップします。
4.  モードセレクター（`modalityBridgeVisionMode`、以下の表を参照）が再ルーティングか記述かを決定します。再ルーティングは、`model` のみが交換された `modifiedPayload` と、メタデータ `{ rerouted, fromModel, toModel, imagesKept }` を返します。
5.  記述パス：`maxImages` で画像を制限し、タスクアウェアなプロンプトを作成し、記述キャッシュを参照し、ビジョンモデルを**並行して**呼び出し（`Promise.allSettled`）、`[Image N]: <description>` テキスト部分をその場所に挿入します。記述が失敗した場合は `null` が返され、元の画像部分は**保持されます**（#4012）。ただし、すべての記述が失敗したコンボ記述パスでは、確認済みの非ビジョンアップストリームは代わりに「(unavailable — no vision-capable provider connected)」というスタブを受け取ります（#8430）。
6.  `modifiedPayload` とメタデータ（`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`）を返します。

#### モードセレクター (`modalityBridgeVisionMode`)

| モード     | デフォルト | 動作                                                                                                                                                                                                                                                                                                               |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔          | レガシーなヒューリスティック、変更なし（#6640/#7204）：元のモデルが使用可能な認証情報を持っている場合を除き、非コンボ/`auto`/モデルは最適なビジョンモデルに再ルーティングされます（その場合は記述）；コンボターゲットは常に記述します。                                                                            |
| `describe` |            | 常に記述 — 再ルーティングブロックは完全にスキップされます。ユーザーが選択したモデルが常に回答します。                                                                                                                                                                                                              |
| `reroute`  |            | 強制再ルーティング：認証情報を持つモデルを保持するガードはバイパスされます。再ルーティング**ターゲット**の認証情報ガードは引き続き適用されます — 使用可能なビジョンターゲットが存在しない場合、リクエストは記述にフォールスルーするため、生の画像がテキストのみのバックエンドに到達することはありません（#8430）。 |

強制モードは、自動ヒューリスティックが実行される**前に**ショートサーキットします。`auto` の動作は、PR-1以前のガードレールとバイト単位で同一です。

#### タスクアウェアな記述プロンプト (`modalityBridgeVisionTaskAware`)

デフォルトは**true**です。`composeVisionPrompt()` (`visionBridgeHelpers.ts`) は、**最後のユーザーメッセージ**のテキスト（500文字に切り詰められます）を基本記述プロンプトに追加し、ユーザーが実際に尋ねた内容（codex-vision-proxyパターン）に記述を誘導し、ビジョンモデルに可視テキストの転写を依頼します。このフラグがオフの場合、またはユーザーテキストがない場合は、基本プロンプトが変更されずに使用されます。

記述セルフープ自身のOpenAI互換リクエスト（`visionBridgeHelpers.ts`内の`callVisionModelSingle()`）は、常に`image_url.detail: "high"`を要求します。これは、呼び出し元/プロバイダーに関わらず無条件であり、クライアントシグナルによってゲートされることはありません。低詳細サンプリングは、このプロンプトが要求するテキスト転写タスクにおいて、OCR精度を低下させるため、記述呼び出し自体は、元のインバウンドリクエストが使用した詳細レベルに関わらず、常に高詳細を要求します。これは内部の記述リクエストボディにのみ影響し、OmniRouteがプライマリリクエストで呼び出し元自身の`image_url.detail`を転送する方法を変更するものではありません。そのデフォルトは別途適用され、検出されたOpenCodeクライアントに対してのみ、`defaultImageDetail()`（`open-sse/handlers/chatCore/upstreamBody.ts`）で適用されます。記述セルフープのAnthropicワイヤーフォーマットブランチには`detail`フィールドがなく、どちらのデフォルトの影響も受けません。

#### 記述出力上限（`modalityBridgeVisionMaxChars`）

| Key                            | Default | Range                |
| ------------------------------ | ------- | -------------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` または 100–50000 |

`0`（デフォルト）は**上限なし**を意味します。`callVisionModel()`によって返される記述は修正されずに渡され、既存の動作を維持します。100〜50000の範囲の任意の値は、記述が`[Image N]: <description>`として（`src/lib/guardrails/visionBridge.ts`内の`VisionBridgeGuardrail.preCall()`で）再結合される前に、`…`サフィックスで切り詰められます。ダウンストリームモデルが完全な転写を必要とする詳細なOCRタスクでは、この値を上げてください。おしゃべりなビジョンモデルでのトークン使用量を制限するには、この値を下げてください。ダッシュボードフィールドは、VisionタブのAdvancedパネル（`ModalityBridgeVisionTab.tsx`内の`modality-bridge-max-chars`）にあり、1から99までの値を100の下限にクランプし、明示的な`0`はそのままにします。`0`はそれ自体が有効なZod値であり（`z.union([z.literal(0), z.number().int().min(100).max(50000)])`）、単なる「未設定」のデフォルトではありません。

#### 記述キャッシュ（`modalityBridge/bridgeCache.ts`）

記述出力のためのインメモリLRU + TTLキャッシュで、プロセス全体で共有されます。
キーは`sha256(imageRef + composedPrompt + configuredBridgeModel)`で、長さプレフィックスフレーミング（フィールド境界の衝突なし）を使用します。モデルコンポーネントは、実際に応答したモデルではなく、**設定された**ブリッジモデルです。`callVisionModel`は内部的にフォールバックする可能性があり、試行ごとにキーを設定するとキャッシュが断片化します。失敗した記述は決してキャッシュされません。設定：

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### リモート画像の正規化（セルフープ記述/base64フェッチ）

ブリッジが**リモート**画像を自身でフェッチする場合（Anthropic記述セルフコールとclaudeワイヤーフォーマットbase64変換（`ensureBase64ImagesForClaudeWire`）、どちらも`visionBridgeHelpers.ts`内の`fetchRemoteImageAsDataUri()`経由）、結果のデータURIは、ビジョンモデルリクエストに埋め込まれる前に`normalizeDataUri()`（`open-sse/utils/imageNormalize.ts`）を通過します。過度に大きい画像は、**2048pxの長辺**にダウンスケールされます（OpenAI/Anthropicがすでにサーバー側で適用しているリサイズ上限と一致します）。これにより、ビジョンモデルが見るものを変更せずに、アップロードバイト/レイテンシを削減します。リサイズには、動的インポートでロードされる`sharp`を使用します。ネイティブバイナリのロードに失敗するプラットフォームでは、`normalizeDataUri()`は**決してエラーを発生させず**、元のバイトのパススルーにフォールバックするため、記述/base64変換パスは常に機能し続けます。非画像バイト（デコード可能な画像を返さなかったフェッチ）もそのまま渡されます。この正規化は、ブリッジが自身のセルフコール用にフェッチする画像に限定されます。呼び出し元の生のパススルーペイロードには決して適用されず、オプトインのみの変更原則（ハードルール #20）と一致しています。

#### 設定スキーマ + マイグレーション

新しい`modalityBridge*`キーは、`updateSettingsSchema`（`src/shared/validation/settingsSchemas.ts`）でZodで検証されます。これには、`modalityBridgeVisionEnabled`、`modalityBridgeVisionMode`、`modalityBridgeVisionModel`、`modalityBridgeVisionTaskAware`、`modalityBridgeVisionPrompt`、`modalityBridgeVisionTimeout`、`modalityBridgeVisionMaxImages`、`modalityBridgeVisionMaxChars`、`modalityBridgeCache*`の3つ、およびオーディオブリッジで使用される`modalityBridgeAudio*`グループが含まれます。マイグレーション`141_modality_bridge_settings.sql`は、既存のレガシーな`visionBridge*`値を、対応する新しいキーにコピーします（冪等であり、オペレーターが設定した`modalityBridge*`値を上書きすることはありません）。レガシーキーは、1リリースサイクルにわたって読み取りフォールバックとして引き続き受け入れられます。

#### 透過性ヘッダー + 統計

記述変換された応答には、`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`が含まれます（`modalityBridge/bridgeStats.ts`内の`buildModalityBridgeHeader()`によって構築され、`src/sse/handlers/chatHelpers.ts`内の`withModalityBridgeHeader()`によってスタンプされます）。再ルーティングされたリクエストにはヘッダーは**ありません**。ペイロードは変更されておらず、モデルの交換は応答ボディの`model`フィールドですでに確認できます。

`GET /api/modality-bridge/stats`（管理認証、`GET /api/settings`と同じ階層）は、`vision`、`audio`、`video`のインメモリのモダリティごとのカウンター`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }`を返します。`averageLatencyMs`は、すべての試行ではなく`latencySamples`を分母として使用します。タイミングのない操作は、ゼロミリ秒のサンプルを捏造しません。`bridged`は、成功した変換の互換性のあるエイリアスとして残ります。失敗した試行はこれをインクリメントしません。カウンターは設計上、プロセス再起動時にリセットされます（アカウンティングではなくテレメトリのため）。

#### ダッシュボード設定

専用のダッシュボードページは`/dashboard/settings/modality-bridge`です。そのURLでアドレス指定可能な`Vision`、`Audio`、`Video`タブは、`tab`の値を切り替えてもクエリパラメータを保持します。
Visionタブでは、有効化、モード、モデル選択（自動デフォルトを含む）、タスクに応じたプロンプト、高度なタイムアウト/画像/説明長/キャッシュ制限、ランタイムカウンター、および保護されたサンプルリクエストが公開されています。Audioタブもライブで、有効化、Autoを含むSTT専用モデルピッカー、タイムアウト/最大クリップ制限、オーディオカウンター、および`input_audio`サンプルテストが公開されています。Videoタブは機能しており、FFmpeg/ffprobeのランタイム状態を報告します。これは4つの明示的なUI状態のいずれかです（プローブが進行中または完了できなかった場合は`unknown`、クライアント側でプローブがスキップされる非ループバックダッシュボードホストでは`restricted`、プローブ後に見つからないことが確認された場合は`unavailable`、FFmpeg/ffprobeのバージョンが利用可能な場合は`available`）。有効化/モデル/フレーム/ビデオ/タイムアウトの制限を保持し、モデルピッカーをビジョン対応モデルにフィルタリングし、ビデオカウンターを公開します。

AI設定の下にあった以前のVision Bridgeカードは、新しいページへの互換性リンクであり、フォームの2つ目のコピーを保持しなくなりました。メディアプロバイダーも、既存のSpeech-to-Textプレイグラウンドを削除することなく、Image-to-TextおよびSpeech-to-Textワークフローを対応するModality Bridgeタブにリンクします。

**セルフループアドミッションバイパス:** describe呼び出しがOmniRoute自身の`/v1`セルフループ（非標準プロバイダーモデル）を経由してルーティングされる場合、サブリクエストは`x-omniroute-admission-bypass: internal`を送信し、解決されたセルフループ認証情報で認証されます。これは、ローカルモードではローカルの`sk_omniroute`センチネル、またはオペレーターが設定した`OMNIROUTE_API_KEY` / `ROUTER_API_KEY`環境キー（#1350）であり、`REQUIRE_API_KEY=true`のデプロイメントでもdescribe呼び出しを実行できるようにします。このバイパスは、これらの正確な認証情報に対してのみ有効であるため、外部クライアントはヘッダーを使用してアドミッションをスキップすることはできません。

レガシーデフォルトは`src/shared/constants/visionBridgeDefaults.ts`にあり、新しいモード/タスク対応/キャッシュのデフォルトと設定リゾルバーは`src/shared/constants/modalityBridgeDefaults.ts`にあります。ガードレールは、テストが偽の`getSettings`および`callVisionModel`実装を注入できるように`deps`コンストラクタオプションを公開しています。

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

オーディオを含むチャットリクエストが、オーディオ入力を受け入れることが知られていないターゲットに到達する前にインターセプトします。チャットリクエストを再ルーティングすることはなく、オーディオ部分は既存のOpenAI互換マルチパートエンドポイントを介して文字起こしされ、選択されたチャットモデルはテキストの文字起こしで続行されます。

フロー:

1.  `getResolvedModelCapabilities()`を介して`supportsAudio`を解決します。明示的なプロバイダーレジストリメタデータが優先され、次に静的モデルメタデータ、次に同期された`modalities_input`が続きます。`audio`を含まない宣言された入力リストは`false`であり、機能の証拠がない場合は`null`のままです。`false`と`null`の両方が保守的なブリッジをアクティブにし、`true`はそれをバイパスします。
2.  `modalityBridgeAudio*`設定を解決し、共有の`detectMediaParts()`検出器を介して、すべてのメッセージからスプライス可能なトップレベルのオーディオ部分を抽出します。サポートされているワイヤーシェイプは、OpenAIの`input_audio`、`audio_url`、および`source.media_type: "audio/*"`です。ネストされたオーディオはルーティングのために検出されますが、スプライスパスによって削除されません。作業は`modalityBridgeAudioMaxClips`によって制限され、それ以降の部分は変更されません。
3.  設定された`provider/model`を尊重するか、`selectAudioBridgeModel()`に安定したカタログ順序で`AUDIO_TRANSCRIPTION_PROVIDERS`を走査させ、利用可能なアクティブなプロバイダー認証情報を持つ最初のモデルを選択させます。
4.  `callAudioTranscription()`は、base64/data-URIオーディオをマルチパート`file`に変換するか、DNSピンニングと25 MBのバウンドを持つ公開専用アウトバウンドガードを介してリモート`audio_url`をダウンロードします。その後、ファイルと選択されたモデルをローカルの`/v1/audio/transcriptions`セルフループにPOSTし、`resolveSelfLoopBearer()`で認証します。既存の文字起こしルートは、通常の認証情報ルックアップ、クールダウン/レート制限処理、およびプロバイダーディスパッチを実行します。
5.  成功した呼び出しは、その部分を`[Audio N]: <transcript>`に置き換えます。呼び出しは`Promise.allSettled`で実行されます。個別の失敗はその元のオーディオ部分を保持します（#4012契約）。すべての呼び出しが失敗し、ターゲットが`supportsAudio === false`であることが証明された場合、その部分は`[Audio N]: (unavailable — no STT provider connected)`になります（#8430契約）。不明なターゲット（`null`）の場合、すべての失敗の結果は変更されません。利用可能なSTT認証情報がないことが証明されたテキスト専用ターゲットは、ネットワーク呼び出しを発行することなく、同じ明示的なスタブを受け取ります。

成功した文字起こしは、プロセス全体のModality Bridge LRU/TTLキャッシュを使用します。キーは、オーディオ参照、安定した`audio-transcription`操作ラベル、および選択されたSTTモデルを組み合わせたものです。失敗はキャッシュされません。オーディオの試行は、共有の`bridged`、`cacheHits`、`failures`、および`lastUsedAt`カウンターを更新します。変換された応答は`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`を運びます。変更されていないリクエストはAudio Bridgeセグメントを受け取りません。

ランタイム設定はDBにバックアップされ、Zodで検証されます。

| Key                           | Default | Range          |
| ----------------------------- | ------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —              |
| `modalityBridgeAudioModel`    | `""`    | Auto or STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10           |

共有キャッシュは、`modalityBridgeCacheEnabled`、`modalityBridgeCacheTtlMinutes`、および`modalityBridgeCacheMaxEntries`によって引き続き制御されます。

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

ネイティブの動画サポートが知られていないターゲットが呼び出される前に、Chat Completionsの `messages` および Responses API `input` 内のトップレベルの動画パーツをインターセプトします。サポートされている形状は、`input_video`、`video_url`、`video_source`、HTTPS URL、および `data:video/*;base64,...` データURIです。テキスト内の単なるファイル名は動画として扱われません。

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) が、リクエストのトラバーサル、機能/ポリシーチェック、リクエストごとの集約、およびレスポンスペイロードを担当します。動画ごとの処理（取得、結果全体のキャッシュ、フレームシーケンスの説明（呼び出し元が宣言した音声トランスクリプトをマージする）、試行ごとのメトリクス/アボート/クリーンアップ）は、`preCall` のループ内で動画パーツごとに1回呼び出される `videoBridgePipeline.ts` 内の `processVideoPart` の背後に隠蔽されています。また、そのモジュールは、明確なポート境界である `VideoMediaBrokerPort`（バイトの取得とサンプリングされたフレームの抽出）、`VideoAudioTranscriptionPort`（呼び出し元が宣言した音声トランスクリプトとサンプリングされたキャプションのマージ）、および `VideoDrilldownPort`（フレーム詳細の永続化境界。現時点では `processVideoPart` に配線されておらず、個別の `/api/modality-bridge/video/drilldown` ルートのみが現在詳細エントリを書き込みます）を定義しています。

パブリックな `/v1` リクエストパスがサブプロセスをインポートまたは呼び出すことはありません。リモート動画は 50 MiB の上限の下でダウンロードされます。インラインの base64 動画には、モデル/メッセージ/フレーミングのエンベロープが 50 MiB のパブリックJSONリクエスト受付制限内に収まるように、動画ごとに保守的な 36 MiB のデコード済み上限が設けられています。インラインの長さとデコード済みサイズの推定値は、割り当て前にチェックされます。DNSピニングを使用した既存のパブリック専用アウトバウンドガードを使用し、最初のリモートURLおよびすべてのリダイレクトでHTTPSが必須となります。その後、バイトは内部の正確な `POST /api/modality-bridge/video/extract` ブローカー境界を通過します。そのルートは `LOCAL_ONLY` かつ `SPAWN_CAPABLE` の両方であり、プロセスごとに認証された信頼できるループバックリクエストのみを受け入れ、URL、ファイルシステムパス、実行ファイル、または引数リストを受け入れることはありません。APIのボディサイズパイプラインとハンドラーのインクリメンタルボディリーダーは、独立して 50 MiB のブローカー入力上限を強制します。そのバウンド付きキューは一度に1つの抽出を実行し、4つの保留中ジョブを許可し、保留中の入力を 100 MiB に制限します。

ブローカー内では、`ffprobe` がプライベートなローカルファイルを読み取ります。固定フォーマットのホワイトリストにより、プレイリストやマニフェスト形式は除外されます。許可された MOV ファミリーのコンテナの場合、外部 MOV データ参照はデフォルトで無効のままであり、固定コマンドはそれらをオプトインしません。`ffprobe` と `ffmpeg` の両方が、`file` 専用のプロトコルホワイトリスト、1つのスレッド、固定引数配列、シェルなし、および `PATH` から解決される実行ファイルを使用します。添付ピクチャーのカバー・ストリームは再生可能な候補ではありません。再生可能なストリームはいすべて制限を満たす必要があり、決定論的な最低インデックスのフォールバックの前に、明示的なデフォルトストリームが優先されます。動画は 600 秒、各次元 8,192 ピクセル、およびソースピクセル 33,554,432 ピクセルに制限されます。FFmpeg は 1〜16 個の中間点 JPEG フレームをサンプリングし、小さい入力をアップスケールすることなく長辺を最大 1,024 ピクセルに縮小し、URLを受け取ることはありません。サンプリングはデフォルトで `uniform`（一様）です。オプショナルの `scene_aware` および実験的な `segment_aware` ポリシーは、すでに検証済みのローカルストリームに対して追加で1つの固定 FFmpeg パスを実行し、バウンドされた `showinfo` のシーンタイムスタンプを選択し、検出機能の失敗、タイムアウト、不正な出力、または空の候補セットの場合は決定論的に同じ一様の中間点にフォールバックします。セグメントアウェアモードでは、検証されたシーン間隔に比例して中間点サンプルが割り当てられます。セグメントアウェアのエビデンスとフォールバック動作については後述します。厳格な 16 フレームの上限は、すべてのポリシーにおいて選択後に適用されます。シーンアウェアリクエストの予算が 1 フレーム分しかない場合、アクティブな全動画またはフォーカスウィンドウの均一な中間点が使用され、`policyEffective: uniform` が報告されます。選択された 1 つのシーンフレームでは、時間軸の両端を保持することはできません。呼び出し元はオプションで有限のフォーカスウィンドウ（`start`/`end` 秒）を提供できます。境界はメディアの長さにクランプされ、逆転または非有限のウィンドウは拒否され、すべてのサンプリングポリシーは正規化された間隔内でのみ実行されます。結果のウィンドウは、サンプリングメタデータと信頼されていない説明プレフィックスに含まれるため、下流のモデルはフォーカスされた抜粋と全タイムラインを区別できます。

セマンティックキャプションフォーカスは、個別の明示的な設定です。デフォルトの `full` 分析モードは既存のフレームプロンプトを保持し、リクエストテキストをキャプションモデルに転送することはありません。`focused` モードでは、ブリッジは同じ Chat または Responses コンテナから最新の空ではないユーザー作成の `text`/`input_text` のみを読み取り、それをNFCに正規化し、制御文字と空白を縮小し、500 Unicode コードポイントに制限します。空の結果は正確な `full` プロンプトにフォールバックします。使用可能なヒントは、専用の信頼されていないユーザーコンテキストブロック内でJSONとしてシリアライズされ、観測可能な詳細の優先順位付けにのみ使用される場合があります。メディア内で目に見える、または聞こえる指示に従うことに対する個別の警告を上書きすることはできません。テキストフォーカスが `start`/`end` を推測したり、時間的サンプラーを変更したりすることはありません。

#### FU-07 構造的セグメントのエビデンス

`segment_aware` は、すでに検証済みのローカル動画ストリームに対して、バウンドされた 1 つの事前分析パスを使用します。固定フィルターチェーンは、まず最大幅 320 ピクセルにスケーリングし、シーンチェンジとフリーズ区間を検出し、その後、ぼかし、平均ルマ、空間/時間情報のために毎秒 1 フレームでサンプリングします。このパスは、600 の構造的サンプル、1 つの FFmpeg/フィルター・スレッド、同じ `file` 専用のプロトコルおよびコンテナのホワイトリスト、1 MiB のプロセス出力上限、およびブローカーの共有アボート/期限内で最大 30 秒に制限されます。リクエストからのコマンド、フィルター、パス、またはURLを受け入れることは決してありません。

構造的な値は、意味的なビデオ理解ではなく、決定論的なサンプリング証拠です。それらは、被写体、アクション、キャプション、音声、またはユーザーの意図を推測しません。シーンとフリーズの境界がセグメントを形成します。フリーズのカバレッジ、ぼかし、露出、空間的詳細、および時間的変化は、既存の1〜16フレームの予算がどのように割り当てられるかにのみ影響します。完全にフリーズしたセグメントは1フレームに制限され、フリーズしていないセグメントは残りの予算を競います。境界がフレーム数を超える場合でも、均一なタイムラインカバレッジが維持されるため、早い段階での急なカットが長い後続セグメントを隠すことはありません。フリーズ境界の1秒の分析解像度内にあるシーン境界は統合されます。

フィルターの欠落、不正な/空の証拠、検出器エラー、または制限された事前分析タイムアウトは、正確な均一中間点ポリシーにオープンフェイルします。呼び出し元のキャンセルまたはブローカーの期限切れはオープンフェイルしません。それは実行中のサブプロセスを終了させ、その後のフレーム抽出を防止し、プライベートな一時ツリーは`finally`で削除されます。

`scripts/perf/video-bridge-fu07-eval.ts`は、重複排除後のキャプション呼び出しの節約、高密度モーション予算割り当て、ぼかし/露出/SI-TI証拠、長いテールを持つ高速カット、および徐々にフェードする誤検知のために、決定論的な実際のFFmpegフィクスチャを生成します。これは事前分析の実行時間を記録し、`/usr/bin/time`が利用可能な場合は、子プロセスのCPU使用率とピークRSSを記録します。その品質チェックは構造的なオラクルのみです。このハーネスには承認されたエンドポイントや固定された評価基準がないため、実際のキャプションモデルの品質は`HOLD`のままです。`--caption-cost-per-call-usd`が明示的な正の呼び出しごとの見積もりを提供しない限り、金銭的節約も`HOLD`のままです。スクリプトはいずれの結果も捏造しません。

各フレームは4 MiBに、すべての生フレームの合計は23 MiBに、シリアライズされたブローカー応答は32 MiBに制限されます。プライベートな一時ディレクトリは`finally`で削除されます。OmniRouteはFFmpegをバンドルせず、カスタム実行可能パスを受け入れません。キャプション付けの前に、ブリッジは保守的な視覚的重複排除パスを適用します。各JPEGは16×16のグレースケールバッファに縮小され、保持された最後のフレームとのみ比較されます。1フレームを超えるキャプション予算が要求された場合、抽出はその予算の最大2倍、かつ16フレームを超えない範囲で、制限された候補プールを提供します。要求された上限は重複排除後にのみ適用され、予算が2以上の場合、最終的な絞り込み時に最初と最後に選択された候補が保持されます。バージョン管理された`grayscale-16x16-mean-cells-v2`ポリシーは、平均輝度デルタと、正規化されたデルタが0.05以上であるサムネイルセルの比率のうち、大きい方を使用します。重複のしきい値は定数0.04であり、実行時設定として公開するよりも予測可能性のために選択されています。この二次的な高コントラスト信号は、平均のみの比較では隠れてしまう可能性のある小さな動きや可視テキストの変化を保持します。比較器またはデコーダーのエラーはオープンフェイルし、カバレッジを維持します。出力メタデータは、抽出された候補、正常に使用されたフレーム、および破棄された視覚的重複を区別します。

明示的にマークされたビデオパートは、タイムスタンプ付きのコンタクトシートを要求できます。ブリッジは最大で4列、16フレームのJPEGグリッドを構築します。各512ピクセルセルは、そのソースタイムスタンプを高コントラストの下部バンドに焼き付け、同じタイムスタンプは下流での関連付けと監査のためにテキストメタデータに残ります。完全なJPEGは32 MiBに制限されたままです。`sharp`がグリッドをデコードまたは構成できない場合、ブリッジは個々のJPEGフレームにフォールバックします。クライアントの中止はシート操作を通じて伝播します。

プロモーションの証拠は、合成コンポジションマイクロベンチマークとは意図的に分離されています。`scripts/perf/video-bridge-contact-sheet-eval.ts`は、実際のOpenAI互換ビジョンモデル用のスキーマバージョン管理されたA/Bハーネスを定義します。これは、プロバイダーが報告するトークン、エンドツーエンドの実行時間（シート構成を含む）、モデル呼び出し回数、およびマニフェストで定義された事実の保持を測定します。生のモデル応答はレポートに書き込まれません。SHA-256ダイジェストと一致する事実IDのみが保持されます。`--execute-real`が渡され、`OMNIROUTE_BASE_URL`と`OMNIROUTE_API_KEY`が設定されていない限り、ハーネスはネットワーク呼び出しや有料モデル呼び出しを行いません。その明示的な実際の実行がない場合、その機械可読な判定は`HOLD`のままです。合成ペイロード/呼び出し回数の測定だけではプロモーションの証拠にはなりません。

呼び出し元は、すでにアラインされたテキストを所有している場合、サポートされているビデオパートにオプションの`transcript.cues`配列を添付できます。各キューは、`text`、プローブされた期間内の有限な`start`/`end`間隔、およびホワイトリストに登録された`source`（`client`、`embedded`、または`audio-bridge`）を保持する必要があります。`confidence`はデフォルトで`1`であり、`0`から`1`の間に留まる必要があります。完全に重複するキューは統合されます。OmniRouteはこのメタデータから転写を開始することはありません。検証されたキューは、ソース、信頼度、および間隔とともに記述された結果にコピーされ、フレームキャプションと並んで信頼できない観測としてレンダリングされます。無効な、範囲外の、または出所不明のテキストは、キャプションストリームに混入されるのではなく拒否されます。`source`フィールドは現在、呼び出し元が宣言するものであり、サーバーによって検証されるものではありません。OmniRouteは値が許可された3つの文字列のいずれかであることを強制しますが、`embedded`または`audio-bridge`ラベルが実際にサーバー所有の抽出から来たものであることをまだ暗号的に確認していません。その検証が実装されるまでは、`source`を信頼できないヒントとして扱ってください。それに基づいて認証決定を構築しないでください。

上級の呼び出し元は、同じビデオに対して、すでに承認済みの `audioTranscript` トラックを提供できます。フュージョンシームは、視覚および音声の観測を単一の期限と中止シグナルの下で実行し、共通のタイムライン上に順序付け、完全に重複するものを結合し、片側のみが成功した場合には部分的な結果を報告します。無効な `audioTranscript` は、ビデオ全体を失敗させるのではなく、その部分的な結果に劣化します。つまり、視覚的な記述は保持され、音声ブランチはサニタイズされた失敗コードを記録します。ブランチごとの可用性、部分フラグ、およびサニタイズされた失敗コードは、記述された結果、ガードレールメタデータ (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`)、結果キャッシュメタデータ、およびブリッジフュージョンカウンターに保持されます。デフォルトのVideo Bridgeパスは、音声認識を呼び出したり、2つ目のメディアコピーをダウンロードしたりしません。その明示的なトラックがない場合、ビデオのみのままです。

**トランスクリプト保持 (#12150 P1)。** これは、Video Bridge（それ自体がオプトイン）がトランスクリプトキューをレンダリングするたびに自動的に適用されます。個別の保持フラグはありません。リクエストが何らかのトランスクリプトキュー（呼び出し元が宣言した `transcript` または融合された `audioTranscript`）をレンダリングすると、ガードレールはそれを `videoBridgeObserved` とマークし、ビデオ記述の編集済みシャドウを生成します。これは、各キューのフリーテキスト本文が `[redacted-video-transcript]` に置き換えられた同一のレンダリングであり、文字列が組み立てられる前に構造化されたキューフィールドを置換することによって構築されます（フラット化されたテキストを解析することによってではないため、`[inaudible]` や `[music]` のような `]` を含む本文を含む、敵対的または通常のキューコンテンツは生き残れません）。永続化されたコールログリクエストボディは、各ビデオ由来のテキスト部分をその編集済みシャドウとコンテンツの等価性で照合して交換します。`fullText` アンカーは、完了したプレコールガードレールペイロードから再読み込みされるため、後のチェーンガードレール（PIIおよび資格情報マスク、優先度10/95）が記述テキストをその場で書き換えたり、システムプロンプト/ハンドオフ/メモリインジェクションがメッセージ配列を再形成したりした後でも、照合は成功します。モデルにアップストリームで送信されるボディは変更されません。観測されたリクエストは、永続的なメモリを生成しません（リクエストおよびレスポンス由来の抽出の両方がスキップされます）。そのため、モデル自身の返信はトランスクリプトテキストをメモリにエコーできません。

追加の保持されたコピーは、同じ観測済みリクエストシグナルを使用します。ガードレール前の生のクライアントリクエストスナップショット、メモリ内の保留中のリクエスト、および早期に拒否されたリクエストログは、ビデオ部分のトランスクリプトフィールドを構造的に置き換えます。パイプラインステージによって合成された文字列プロンプトとコンテキストハンドオフは、永続化されたリクエストボディシンクで編集されます。永続化された `video_content_removed` マーカーにより、`previous_response_id` の継続は、意図的に破棄されたテキストを再構築するのではなく、クローズして失敗します。観測されたリクエストがログ記録前にその部分ごとの編集シャドウを失った場合、または後のリクエスト変更後に複数のビデオシャドウのいずれかが一致しなかった場合、保持されたリクエストボディは、部分的に編集されたトランスクリプトを保持する代わりに、完全に省略されます。

観測されたリクエストの場合、モデルの応答は、構造化されたキュー境界なしにトランスクリプトの任意の部分を引用する可能性があります。そのため、永続化されたコールログの `responseBody` は省略マーカーに置き換えられます。詳細なパイプラインアーティファクト（アップストリーム/クライアントボディやストリームチャンクを含む可能性がある）は保持されません。セマンティック、冪等性、および推論リプレイキャッシュは、そのリクエストの読み書きをバイパスします。プロバイダーリクエストとクライアントに表示される応答は変更されません。詳細なアーティファクトが省略されると、一時バッファから早期のキープアライブバイトが排出されます。Kiroの不正なEventStream警告は、ペイロードのバイト数のみを報告し、その内容やJSONパーサーの生のエラーは報告しません。これは、関連のないすべてのプロバイダー/プラグイン診断が監査されたと主張するものではありません。より広範な保持シンクの掃討は #11658 で追跡されています。

内部の `/api/modality-bridge/video/drilldown` ライフサイクルは、独立したループバック/トークン認証されたキャッシュ基盤です。すべての操作には、正規の不透明なプリンシパルIDも必要です。プロダクションの呼び出し元が有効になる前に、認証されたテナントからそのIDを導出し、クライアントが選択した値を転送してはなりません。キャッシュキーは、そのプリンシパルを正規のセッションIDおよびビデオ参照IDにバインドし、それらのSHA-256派生キーのみを保存し、読み取りと削除の両方を同じプリンシパルにスコープします。キャッシュは、エントリごとに最大16個の派生JPEGフレームを保存し、10分後に期限切れにし、境界付きの `start`/`end` 読み取りまたは明示的なセッション削除をサポートします。

各プリンシパルは、16エントリおよび64 MiBの正規JPEGデータに制限されます。これらの制限は、グローバルな64エントリ/256 MiBの上限とは独立しています。プリンシパルのクォータ圧力がかかると、グローバルなLRU（Least Recently Used）削除が考慮される前に、そのプリンシパルの最も使用頻度の低いエントリのみが削除されます。期限切れのエントリは、キャッシュアクティビティ時にプリンシパルとグローバルの両方のアカウンティングから削除されますが、キャンセルおよび検証の失敗は部分的な置換をコミットしません。

キャッシュは、非正規のBase64、過剰なパディング、非JPEGメディア、不正または切り詰められたJPEG、および境界付きのフルイメージ `sharp` デコード中に警告を生成するJPEGを拒否します。受け入れられた各画像を正規のJPEGとして再エンコードし、呼び出し元のフィールドを信頼するのではなく、デコードされたバイトから幅と高さを導出し、末尾のポリグロットバイトは保持せずに破棄します。境界付きの正規圧縮バッファのみが両方のクォータに課金されます。JSONワイヤーリミットには、32 MiBのデコード済み入力上限に対するBase64オーバーヘッドが含まれます。保存されるすべての派生は、検証済みのJPEGフォーマット/解像度、サンプリングポリシー、派生バージョン、作成時間、サーバー計算コンテンツハッシュ、およびハッシュ化された親参照と、信頼された呼び出し元の親コンテンツハッシュを記録します。キャンセルは、アトミックなキャッシュコミットの前に、非同期のデコード/ハッシュフェーズ間でチェックされます。

このトランチは、まだ本番プロデューサーをルートに接続しておらず、マルチ解像度バリアント選択を提供していません。そのため、透過的なVideo Bridgeリクエストパスには追加の作業は発生しません。一方、テナントに紐付けられたプリンシパル導出と完全なFU-08マルチ解像度ライフサイクルは、完了した動作として文書化されるのではなく、明示的なフォローアップ作業として残されています。

フレームは、設定されたVideoモデルで順次キャプション付けされます。空のVideoオーバーライドはVision設定を継承します。両方が空の場合、Visionオートルーティングは有効なビジョン対応モデルを選択します。成功したキャプションは、元の部分を安定した`[Video description:`プレフィックスに置き換えます。これは、テキストを信頼できないメディア由来の観測としてマークし、ダウンストリームモデルに対し、メディア内の指示に従わないよう伝えます。フレームキャプションのキャッシュキーには、JPEGバイト、プロンプト、タイムスタンプ、および有効なモデルが含まれます。成功したキャプションのみがキャッシュされます。キャッシュエントリは、フォールバックモデルを含む、実際に成功したプロデューサーモデルを保持します。異なるモデルによって異なるフレームが生成された場合、ブリッジは`mixed`と報告します。キャッシュヒットの場合、要求されたルーティングプランとして再ラベル付けする代わりに、そのプロデューサーIDを再利用します。ビデオ全体の結果キャッシュは、出力が変化するすべての入力（プロンプト、有効なモデル、サンプリングポリシー、フレーム数、セマンティック分析モード、正規化されたフォーカスヒントのSHA-256フィンガープリント、フォーカスウィンドウ、`transcript`、`audioTranscript`、およびコンタクトシートフラグ）に基づいてキー付けされるため、これらのいずれかのディメンションを変更するとキャッシュミスとなり、古い再利用は決して発生しません。視覚的な重複排除ポリシーのバージョン、しきい値、および制限された候補フレーム数も、結果キャッシュのキーとメタデータに明示されています。したがって、ポリシーの変更によって古いビデオ全体の記述を再利用することはできません。結果キャッシュv4のメタデータは、モードとフィンガープリントを保持し、生のユーザータスクは保持しません。ガードレールメタデータは、要求された分析モードと有効な分析モードの両方を報告します。使用可能なユーザーテキストがない`focused`モードの要求は、実質的に`full`として報告されます。

ガードレールはサポートされているすべてのビデオ部分を抽出しますが、`modalityBridgeVideoMaxVideos`を超える記述は行いません。`supportsVideo === false`であることが証明されたターゲットの場合、失敗したビデオや制限を超えたビデオは明示的な安全なテキストマーカーとなり、生のビデオは残りません。機能が不明な場合、それらの部分は変更されません。`supportsVideo === true`のターゲットはブリッジをバイパスします。クライアントリクエストの中止シグナルは、ダウンロード、ブローカーキュー、サブプロセス、およびキャプション呼び出しを通じて伝播します。中止はビデオ間で停止し、生のメディアに開いたまま失敗することはありません。

ランタイム設定はDBにバックアップされ、Zodで検証されます。

| Key                                 | Default     | Range / behavior                                                                                                      |
| :---------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | オプションのランタイム、オプトイン                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full`は一般的なキャプションを保持します。`focused`は、制限された信頼できない最新のユーザーコンテキストを使用します。 |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridgeモデルを継承します。                                                                                     |
| `modalityBridgeVideoFrameCount`     | `8`         | 1～16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`、`scene_aware`、または比例的な`segment_aware`。検出器の障害時は`uniform`にフォールバックします。            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1～4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000～120000ミリ秒                                                                                                    |

120秒を超えるレガシーな永続化されたビデオタイムアウト値は、ブローカーの期限にクランプされます。その制限を超える新しい設定の書き込みは拒否されます。`GET /api/modality-bridge/video/runtime`は、認証またはランタイムプロービングの前に信頼されたスタンプ付きループバックローカリティを必要とし、その後管理認証を必要とします。ランタイムが利用できない場合、`available`、サニタイズされたFFmpeg/ffprobeバージョン、および固定の理由のみを返します。内部抽出エンドポイントは公開アップロードAPIではありません。キューが飽和すると`503`と`Retry-After`を返し、呼び出し元の切断は`499`を返し、固定のブローカー期限は`504`を返します。変換された応答は、VisionまたはAudioセグメントを削除することなく、中央の`x-omniroute-modality-bridge`ヘッダーに`video->text;model=<visionModel>;parts=<videos>`を追加します。

### PIIマスカー (`piiMasker.ts`)

**両方の**ステージで実行されます。

- `preCall`はペイロードをクローンし、`system`、`messages`、`input`、および`prompt`（プレーンな文字列アイテムを含む）を走査し、文字列の`content`/`text`フィールドに`processPII()`（`@/shared/utils/inputSanitizer`から）を適用します。`PII_REDACTION_ENABLED=true`の場合、検出されたPIIは送信ペイロードで編集されます。これは`INPUT_SANITIZER_MODE`（プロンプトインジェクションポリシーのみを制御します）とは独立しています。編集が無効の場合、呼び出しはコンテンツを書き換えることなく検出数を記録します。
- `postCall`は応答をディープクローンし、`sanitizePIIResponse()`とResponses-API-shapeマスカー（`maskResponsesOutput` — `output_text`および`output[].content[].text`をカバー）を実行します。編集が発生した場合、変更された応答が元の応答を置き換えます。

ガードレールは決してブロックしません。注釈付け（`meta.detections`、`meta.redacted`）または書き換えのみを行います。

### プロンプトインジェクション (`promptInjection.ts`)

ユーザーが提供するコンテンツ内の敵対的な構造を検出し、設定されたポリシーを適用します。動作は環境変数とコンストラクタオプションによって制御されます。

| 設定             | 環境変数                                                                                                | デフォルト | 効果                                                                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 有効             | `INPUT_SANITIZER_ENABLED`                                                                               | `true`     | `false`の場合、ガードレールはショートサーキットします。                                                                                                                                                                        |
| モード           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                         | `warn`     | インジェクションポリシー: `block`、`warn`、または`log`。（`redact`は後方互換性のために受け入れられますが、インジェクションテキストを**削除しません**。PII書き換えのリクエストは`PII_REDACTION_ENABLED`によって制御されます。） |
| ブロックしきい値 | `blockThreshold`オプション / `INPUT_SANITIZER_BLOCK_THRESHOLD` (別名 `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | ブロックに必要な最小の深刻度。デフォルトでは、中程度の深刻度は監視のみです。                                                                                                                                                   |

**モードの優先順位** (`getMode`): 呼び出し元の`options.mode` →
`INJECTION_GUARD_MODE` **DB機能フラグによる上書き** (ダッシュボード → 設定 →
機能フラグ) → `INJECTION_GUARD_MODE` 環境変数 → `INPUT_SANITIZER_MODE` 環境変数 →
`warn`。したがって、ダッシュボードによる上書きは環境変数よりも優先され、機能フラグUIが実行中のガードをリアルタイムで制御します（再起動は不要です）。DBの読み取りはフェイルセーフです。エラーが発生した場合、ガードは環境変数に基づいた動作にフォールバックし、上書きが設定されていない場合は、環境変数のみの解決と同じ動作になります。

検出元:

1.  `sanitizeRequest()` from `@/shared/utils/inputSanitizer`（パイプラインの他の場所で使用される共有検出器セット）。
2.  組み込みの`DEFAULT_GUARD_PATTERNS`（現在`system_override_inline`と`markdown_system_block`があり、両方とも`high`深刻度です）。
3.  コンストラクタオプションを介して渡されるオプションの`customPatterns`（文字列、正規表現、または`{ name, pattern, severity }`レコード）。

`mode === "block"`**かつ**少なくとも1つの検出が深刻度しきい値を満たした場合、`preCall`は`{ block: true, message: "Request rejected: suspicious content detected" }`を返します。`warn`/`log`モードでは、ガードレールはログを記録しますが、呼び出しを許可します。共有ヘルパー`evaluatePromptInjection()`は、レジストリを介さずにプロンプトを評価する必要がある呼び出し元のためにエクスポートされています。

**スキャン範囲 (v3.8.20):** 検出器は結合されたプロンプトテキストの**最初の16 KB**のみを検査します — `src/shared/utils/inputSanitizer.ts`では`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16,384バイト)です。`detectInjection()`と`evaluatePromptInjection()`の両方は、パターンループを実行する前に`slice(0, MAX_INJECTION_SCAN_BYTES)`を実行します。インジェクションディレクティブは入力の上部に位置するため、これにより、検出を弱めることなく、数百KBのペイロードに対する正規表現のCPU/GCを制限します（参照: #3932、#4041）。

### 認証情報マスカー (`credentialMasker.ts`)

**両方の**ステージで実行され、デフォルトチェーンの最後（優先度`95`）です。送信ペイロード（メッセージコンテンツ、ツール呼び出し引数、ツール結果）**および**プロバイダー応答から、よく知られたAPIキー/シークレットトークンのパターンを編集します。これにより、プロンプトに貼り付けられた（またはツール結果によってエコーバックされた）認証情報が、アップストリームプロバイダーやクライアントに漏洩することはありません。

- **オプトインのみ**、PII編集と同じ慣習（ハードルール#20に隣接）：`settings.credentialRedactionEnabled === true`**または**`CREDENTIAL_REDACTION_ENABLED=true`でない限り無効です。これがオフの場合、ガードレールは何もせず、ブロックも書き換えも行いません。
- `redactCredentials()`は、ペイロード/応答ツリー全体を走査し（`walkValue()`を使用、プロトタイプ汚染に安全、`WeakSet`を介してサイクルに安全）、一致するものを`[REDACTED:<type>]`プレースホルダーに置き換え、実際に変更されたブランチのみをクローンします。
- `CREDENTIAL_PATTERNS`は、LLMプロバイダーキー（OpenAI、OpenAI-proj、Anthropic、Google、Hugging Face、Replicate）、VCS/SaaSトークン（GitHub、Slack、Linear、Notion、npm、Postman、Discord）、支払いキー（Stripe、Square）、クラウドキー（AWSアクセスキー、Twilio、SendGrid、Mailgun）、秘密鍵/JWT、認証情報を含む接続文字列（`mongodb://user:pass@...`など）、および一般的な`Authorization`/`x-api-key`/`api-key`/`apikey`ヘッダー値パターンをカバーします。ヘッダー形式のキー（`authorization`、`x-api-key`、`api-key`、`apikey`）は、一般的なテキスト正規表現ではなく、構造的に編集されます（値のみ、`Bearer `/`Basic `のようなスキームプレフィックスは保持されます）。
- ガードレールは決してブロックせず、書き換え（`modifiedPayload` / `modifiedResponse`）と注釈付け（`meta.credentialsRedacted`、`meta.count`）のみを行います。

回帰ガード: `tests/unit/credential-masker-guardrail.test.ts`。

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
