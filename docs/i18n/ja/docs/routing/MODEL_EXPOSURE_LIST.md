# Model Exposure Allow/Deny List (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> オプトインで、デフォルトでは無効です（`modelVisibilityAllowlist`/`modelVisibilityDenylist` が両方とも空の場合、
> `/v1/models` カタログとすべての `auto/*` 候補プールはバイト単位で同一のままです）。コストとは
> 無関係の理由で厳選されたモデル一覧を提供したい運用者向けの、
> `hidePaidModels`/`hideAutoCombos`（`src/lib/db/settings.ts`）の姉妹設定です。

## この機能が存在する理由

`hidePaidModels` は「このモデルは無料か？」に答え、`hideAutoCombos` は「`auto/*`
仮想 ID をそもそも公開すべきか？」に答えます。しかし、どちらも運用者が任意のモデルの
サブセットを選別することはできません（たとえば、料金とは無関係に、特定の Claude Code /
OpenCode クライアントに表示すべきモデルだけを提示する場合）。#11481 では、そのための独立した
2 つのオプトイン文字列配列設定を追加します。

## 設定

| キー                       | 型         | デフォルト | 意味                                                             |
| -------------------------- | ---------- | ---------- | ---------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`       | 候補に一致するエントリをカタログ／候補プールから非表示にします。 |
| `modelVisibilityAllowlist` | `string[]` | `[]`       | 空でない場合、候補に一致するエントリのみを公開したままにします。 |

どちらも、それぞれ最大 200 文字のエントリを最大 500 件まで受け付けます
（`src/shared/validation/settingsSchemas.ts` で Zod により検証されます）。エントリは次のいずれかです。

- 正確なカタログ ID — `"gpt-4o"`（モデル ID のみ）または `"openai/gpt-4o"`（プロバイダー接頭辞付き）、または
- `*`/`?` を使用する glob パターン — 例: `"openai/gpt-4*"` や `"anthropic/*"` —
  `ModelRoutingSection` のモデル単位のコンボマッピングと
  `freeModels.ts::matchesOnlyPaidModels` ですでに使用されている、同じ共有
  `globToRegex()` マッチャー（`src/shared/utils/globPattern.ts`）で解決されます。

優先順位: denylist が最初にチェックされます（拒否されたエントリは、allowlist にも
一致していても常に非表示になります）。allowlist が空でない場合、それに一致する
エントリのみが残ります。

## 1 つではなく 2 つのチョークポイント

#6512 から得られた教訓（`hidePaidModels` のみでカタログをフィルタリングしても、コンボ候補
プールが独立して構築されていたため、`auto/*` が有料モデルにルーティングできてしまった）は、
ここでも同様に当てはまります。マッチング述語 `isModelExposureAllowed()`
（`src/shared/utils/modelExposureList.ts`）は、以下の両方から呼び出されます。

- `src/app/api/v1/models/catalog.ts` — `/v1/models` の一覧そのもの。既存の
  `shouldHidePaid()` が制御しているものと同じ、ソースごとの 5 つのチョークポイント
  （静的な `PROVIDER_MODELS`、同期されたプロバイダー行、カスタム行、エイリアスに基づく行、
  管理対象フォールバック行）で呼び出されます。
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` —
  `virtualFactory.ts::buildPreparedPool` から、対応する `filterPaidOnlyCandidates()` の呼び出し直後に
  呼び出されます。これにより、拒否されたモデルが `auto/*` 候補プールに選択されることもありません。

## フィルタリングされないもの

`hideAutoCombos` の既存の挙動を踏襲します。明示的に送信されたモデル ID（`auto/*` 経由ではなく、
カタログ一覧を通じて検出されたものでもない）は、ディスパッチ時には決してブロックされません。
フィルタリングされるのは、公開対象／候補プールのメンバーシップのみです。これは
`hidePaidModels` とは独立しています。運用者はコストとは無関係の理由で厳選されたセットを
必要とする場合があるため、両設定は、`catalog.ts` に既存の複数フラグの組み合わせと同様に、
独立した AND 条件のフィルターとして組み合わされます。

設定のエクスポート（`GET /api/settings/export-json`）には、他の設定フィールドと同様に、
両方の配列がそのまま含まれます。`hidePaidModels` のコンボステップ用エクスポートフィルターとは
異なり、ここでは再ハイドレーションのリスクはありません。エクスポートされたコンボステップに
埋め込まれた拒否対象 ID は、運用者自身が明示的に選択したルーティングであり、エクスポート境界で
取り除く必要があるものではありません。
