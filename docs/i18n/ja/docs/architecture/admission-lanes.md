# Admission lanes (#9654) — two lane systems, what gates each, where each reports (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute には、スコープが異なるプロセスローカルなレーンシステムが **2つ** あります。これらは相互補完的であり、運用担当者はどちらを確認しているのかを把握しておく必要があります。

## 1. バイト単位のプロセス全体アドミッション制御（`chatBodyAdmission.ts`）

- **スコープ:** `POST /v1/chat/completions`、`/v1/messages`、`/v1/responses`、およびその他のチャット形式ルートにおける、バッファリングされたボディ／ヒープの処理経路。大きなコーディングエージェントのボディによるヒープ増幅を防止します（#4380）。
- **キーごとのレーンではなく、プロセス全体で1つのコントローラー（#10110）。** すべての API キー（ハッシュ化済み）または `anonymous` セッションは、**同じ**共有予算に対してアドミッション判定されます。ハッシュ化されたセッション ID は、公平性を確保するためのスケジューリングキー（待機リクエスト間のラウンドロビンディスパッチ）としてのみ使用され、容量を分割するシャードとして使用されることはありません。このドキュメントの以前のバージョンでは、独立した容量を持つキーごとのレーンについて説明していましたが、そのモデルでは未認証の偽の認証情報によってプロセス全体の上限を増大させることが可能だったため、#10110 で削除されました。
- **ゲート（#503-fanout）: 固定リクエスト数ではなく、自動導出される取り込み BYTE 予算。** 従来の `CHAT_MAX_HEAVY_IN_FLIGHT` リクエスト数上限（この修正前のデフォルトは `1`）では、コーディングエージェントのファンアウト（複数のサブエージェント／CLI、通常 256 KB を超えるボディ）の実効同時実行数が約1まで低下し、完全に通常の負荷でも 503 が発生していました。現在、この上限は運用担当者が `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` を明示的に設定した場合にのみ適用されます。未設定の場合、アドミッションは代わりに `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` によって制御されます。これは、プロセスの実際のメモリ上限から自動導出される予算です（`src/shared/middleware/admissionBudget.ts`）。V8 ヒープ上限と cgroup／コンテナ上限のうち厳しい方の25%を、8倍の一時的増幅係数で割り、8 MiB から 2 GiB の範囲に制限します。明示的なオーバーライドにも同じ制限が適用されます。これにより、環境変数を調整しなくても、512 MB のコンテナから 32 GB のデスクトップまで自動的にスケーリングします。有効な予算内に収まらないボディは、`413 body_exceeds_budget` で即座に失敗します。個別には処理可能なボディ同士の競合のみが、上限付きの公平性キューに入ります。複数のシグナルを使用するライブのリソース圧力トラッカー（V8 ヒープ比率、cgroup、PSI、OOM イベント — `open-sse/utils/resourcePressurePolicy.ts`）は、`high` 圧力下では上限付き待機時間を短縮し、`critical` 圧力下ではバイトを一切取り込む前に `503 resource_pressure` で即座に負荷を遮断します。
- **チューニング:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — 自動導出されるバイト予算のオーバーライド
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — 従来のリクエスト数上限。明示的に有効化した場合のみ適用
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 を返すまでのキュー待機時間（デフォルト 2000）
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — キュー内バイト数に対するヒープ保護弁（デフォルト 4 MB）
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 以降は非推奨の no-op（設定互換性のため受け付けますが、無視されます）
- **レポート:** `GET /api/monitoring/health` → `chatAdmission`（#11244）— #503-fanout で追加された `inflightBytes`、`maxInflightBytes`、`budgetSource`（`v8_heap` | `cgroup` | `override`）、`pressureSeverity`、および `countCapEnabled` を含みます（デフォルトのデプロイでは false。従来のリクエスト数上限ではなく、バイト予算が実際に制約要因となっていることを示します）。

## 2. 適応型ランタイム仮想レーン (`open-sse/services/admission`)

- **対象範囲:** プロバイダーディスパッチ向けのテナントキー単位のアドミッション — キューコスト、レイテンシーに基づく
  制限の適応、レーンキューイング、およびレーンメトリクス。
- **ゲート:** **オプトイン。** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` でない限り無効です。これがない場合、
  適応型コントローラーは共有キューの動作を維持します（#9654 の基準 1 は、
  オペレーターがレーンを有効にした場合にのみ満たされます）。
- **チューニング:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + 適応型設定 (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)。
- **レポート:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants`（不透明なレーン ID であり、生の
  キーではありません）、および `virtualLanes` — スナップショット内で「レーンが有効」であることを示す正式なフラグ。

## 3. ファンアウトプローブ — combo/fusion 向けターゲット単位のアドミッション (#9654 Wave 2)

combo（優先順位 / ラウンドロビン）と fusion は、1 つの親リクエストの下で N 個のモデルターゲットに
ファンアウトします。#9654 Wave 2 以降、**各ファンアウトターゲットはディスパッチ前にゲートされます**。
これは、**親の**テナントレーンに対して、ターゲット単位のプローブ
（`PerTargetAdmissionHook`、`createPerTargetAdmissionHook` により構築）で行われます。

- **対象範囲:** combo、fusion、およびカオスエンジンによってディスパッチされるすべてのファンアウトターゲット。
  システム 1（バイトレベル）は影響を受けません — ファンアウトターゲットをプローブすることがないためです。
- **ゲート:** **システム 2 とともにオプトイン。** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  が未設定の場合は何もしません — このモードでは親リクエストがすでに共有キューのリースを保持しているため、
  プローブすると二重計上され、combo のターゲットが拒否されます。
- **セマンティクス:**
  - **完全なノンブロッキング — キューには入れず、スキップします。** `maxWaitMs 0`: レーンが満杯の場合、
    ターゲットをスキップし、代わりに combo のフォールバック機構（または fusion の生存パネル）が
    処理します。これは意図的な動作です。ファンアウトターゲットは冗長な処理であり、
    それをキューに入れると、レーンが抑止対象としているまさにその輻輳に、さらに負荷を積み重ねることになるためです。
    したがって `defaultMaxWaitMs` は**親リクエストのみ**に適用されます。
    ファンアウトプローブは決して待機せず、待機させるための**設定項目も意図的に設けていません**
    （issue の履歴では、待機用の設定項目が、#9654 で防止しようとしている大量の 502/504 を引き起こすことが
    示されています — スキップされたファンアウトターゲットによってレスポンス品質が低下していると
    オペレーターから報告があった場合にのみ、再検討してください）。
  - **許可時に解放。** 許可されたプローブは、リースを即座に解放します。これは容量ゲートであり、
    保持ではありません。ファンアウトは親のリースでカバーされます。さらに N 個を保持すると
    共有アクティブコストが水増しされ、他のテナントが拒否されます。これは予約ではなくベストエフォートです。
    プローブとディスパッチの間にレーンが再び埋まる可能性があるため、競合が激しい状況では、
    ターゲットがディスパッチされる時点までに再び満杯になっているレーンへの投入を、
    ゲートが許可する場合があります。
  - **実際のファンアウトボディに基づくコスト算定。** プローブは、ターゲットの実際のボディから
    コストを見積もります。これには、親パスとまったく同様に、その `stream` フラグから導出される
    リクエストクラスも含まれます。そのため、fusion のパネルメンバー (`stream: false`) は、
    実際に占有する非ストリーミングクラスとして、優先順位/RR ターゲットはユーザーが要求した内容に応じて
    コストが算定されます。
- **レポート:** 最初のターゲット以降でプローブがスキップされると、combo のリクエスト単位の
  `fallbackCount` が増加します（既存のフォールバックセマンティクスと同様で、combo のログに表示されます）。
  すべてのパネルメンバーがスキップされた場合、fusion は 503 を返します。現時点では、スナップショットに
  **集約カウンター**（例: `virtualFanoutSkipped`）はありません — レーンゲートがファンアウトターゲットを
  スキップする頻度を把握できないとオペレーターから報告があった場合、それが追加の契機となります。

## ダッシュボードに表示されているもの

- `adaptiveAdmission.laneCount` / `laneTenants` → **適応型仮想レーン**（システム 2）。
- `adaptiveAdmission.virtualLanes === true` → セクション 3 のファンアウトプローブも
  有効です。`virtualLanes` が存在しない、または `false` のペイロードは、
  `OMNIROUTE_CHAT_VIRTUAL_LANES` が設定されていないことを意味します。バイトレベルのレーン（システム 1）は
  引き続き有効ですが、これを有効にするまでは `adaptiveAdmission` 配下の機能
  （およびファンアウトゲーティング）は一切有効になりません。

## 両方が存在する理由

バイトレベルのレーンは、メモリ負荷の高い解析／圧縮パスを制限し、適応型レーンは
テナントごとのディスパッチコストを制限します。#9654 の基準 1（「あるセッションのバーストによって
別のセッションが 503 にならない」）は、システム 1 では無条件に適用され、システム 2 ではオプトインを有効にすると適用されます。

## 4. 単一プロセスでの長時間 `/v1/responses`（正常時のヘッドルーム）

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) では、
ヒープが `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` を下回っている場合に、構造的負荷の高い
2 つ目のリクエストを受け入れられるようにする `tryAcquireHealthyHeadroom` が追加されました。
`admitChatRequest` が使用する BYTE パス（`OMNIROUTE_CHAT_LARGE_BODY_BYTES` 以上のボディ、
デフォルトは 256 KiB、`POST /v1/responses` を含む）でも、**同じ**エスケープが使用されます。

これは、長時間の SSE `/v1/responses` を 2 件より多く同時実行するためにサポートされている
**単一プロセス**構成です。プライマリと正常時のヘッドルームは、ヒープおよびプロセス全体の
インフライトバイト予算（`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110）が許す範囲内でのみ引き上げてください。数十の長時間 SSE クライアント（40～50）は、
メモリ予算上の問題であり、製品に「最大 2」という固定上限があるわけではありません。
ヒープに負荷がかかった場合は、#7849 の問題が再発しないよう、引き続き再試行可能な `503` で負荷を遮断します。

**ヒープを増やす**には、N 個の独立した `DATA_DIR` を実行します（#11024）。
1 つの SQLite ファイルに対して `replicas > 1` にしてはいけません（#10350）。
このセクションは、DATA_DIR のスケールアウト手順を再検討するものではありません。
