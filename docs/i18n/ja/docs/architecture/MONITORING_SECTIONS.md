# Monitoring & Costs — Navigation Structure (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Group B（プラン16）で実装されました。`src/shared/constants/sidebarVisibility.ts` を参照してください。

---

## 上位ナビゲーション

Group B 適用後のダッシュボードサイドバーには、次の上位セクションがこの順序で表示されます。

```
ホーム
プロバイダー
コンボ
APIキー
設定
分析
コスト          ← 新規（Group B、プラン16）
モニタリング    ← 再編成（Group B、プラン16）
...
```

---

## コストセクション（新規、レベル1）

パスプレフィックス：`/dashboard/costs/`

| 項目         | URL                                  | 説明                                           |
| ------------ | ------------------------------------ | ---------------------------------------------- |
| 概要         | `/dashboard/costs`                   | 集約されたコストダッシュボード（分析から移動） |
| 価格設定     | `/dashboard/costs/pricing`           | モデルごとの価格表                             |
| 予算         | `/dashboard/costs/budget`            | 予算しきい値とアラート                         |
| クォータ共有 | `/dashboard/costs/quota-share`       | クォータ共有プールと使用状況                   |
| プラン設定   | `/dashboard/costs/quota-share/plans` | プロバイダーごとのプランオーバーライド         |

**理由**：価格設定、予算、クォータ共有は、以前は
`モニタリング > コストパラメーター` の下にありました。これらを専用の上位セクションに移動することで、
オブザーバビリティツール内を移動しなくても見つけられるようになりました。

---

## モニタリングセクション（再編成）

モニタリングセクションでは、**アクティビティが最上部**に配置され、その後に**3つのサブグループ**が続くようになりました。

```
モニタリング
├── アクティビティ       ← タイムラインフィード（上位項目）
├── ロググループ
│   ├── ログ（すべて）
│   ├── プロキシログ
│   └── コンソールログ
├── 監査グループ
│   ├── 監査ログ
│   ├── MCP監査
│   └── A2A監査
└── システムグループ
    ├── ヘルス
    └── ランタイム
```

### 以前の構造からの変更点

| 変更前                                                                                             | 変更後                                                 |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| アクティビティ = 監査ログを表示する、ログ内のタブ                                                  | アクティビティ = 専用フィード（`/dashboard/activity`） |
| モニタリング内のコストパラメーターグループ                                                         | コストセクションへ移動                                 |
| フラットなリスト：ログ、アクティビティ（ログ）、監査、ヘルス、ランタイム、価格設定、予算、クォータ | 3グループの構造と専用のコストセクション                |

---

## アクティビティと監査ログの違い

これらは別々の機能になりました。

| 観点                   | アクティビティ（`/dashboard/activity`）                              | 監査ログ（`/dashboard/audit`）            |
| ---------------------- | -------------------------------------------------------------------- | ----------------------------------------- |
| **目的**               | ユーザー向けイベントフィード（「最近何が起きたか」）                 | コンプライアンス／セキュリティログ        |
| **データソース**       | `GET /api/compliance/audit-log?level=high`                           | `GET /api/compliance/audit-log?level=all` |
| **形式**               | 日ごとにグループ化されたタイムライン、人間が読みやすい動詞とアイコン | 高密度のページ分割テーブル、1ページ50件   |
| **フィルター**         | イベントタイプのカテゴリー                                           | アクション、重大度、アクター、日付範囲    |
| **エクスポート**       | 利用不可                                                             | JSONエクスポート                          |
| **アクターフィルター** | 該当なし                                                             | アクターでフィルタリング可能              |
| **表示されるイベント** | 上位レベルのアクションのみ（許可リスト）                             | すべての監査イベント                      |

### 上位レベルアクションの許可リスト

`src/lib/audit/highLevelActions.ts` で定義されています。アクティビティフィードに表示されるイベントを制御します。
許可リストには次の項目が含まれます。

- プロバイダーの追加／削除／テストイベント
- コンボの作成／更新／削除
- APIキーのライフサイクル（作成、失効、ローテーション）
- 予算しきい値への到達
- 認証のログイン／ログアウト
- クラウドエージェントセッションの作成
- MCPツールの登録
- Webhookの作成／削除
- クォータプール／プランの変更（`quota.*` アクション、Group B）
- プラットフォームイベント（更新、デプロイ）
- スキルのインストール／削除

このリストに含まれないイベントは、監査ログにのみ表示されます。

### 新しい上位レベルアクションの追加

`src/lib/audit/highLevelActions.ts` を編集し、アクション文字列を
`HIGH_LEVEL_ACTIONS` に追加します。これにはPRが必要です（このリストはコードであり、DBから設定することはできません）。
対応するアイコンは `src/lib/audit/activityIcons.ts` に追加できます。

---

## リダイレクト：`/dashboard/logs/activity`

古いパス `/dashboard/logs/activity` は、
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` 内の `permanentRedirect()` により、
`/dashboard/activity` へ恒久的にリダイレクト（HTTP 308）されます。

従来のサイドバーID `logs-activity` は、古いIDを参照するユーザープリセットが壊れるのを防ぐため、
`HIDEABLE_SIDEBAR_ITEM_IDS` に保持されています（ただし `SIDEBAR_DEFINITIONS` からは削除されています）。

---

## i18n

Group Bで追加された名前空間：

| 名前空間キー            | 対象範囲                                                                   |
| ----------------------- | -------------------------------------------------------------------------- |
| `sidebar.costsSection`  | コストセクションのラベル                                                   |
| `sidebar.activity`      | アクティビティのサイドバー項目                                             |
| `sidebar.logsGroup`     | ログサブグループのラベル                                                   |
| `sidebar.systemGroup`   | システムサブグループのラベル                                               |
| `sidebar.costsOverview` | コスト概要項目                                                             |
| `activity.*`            | アクティビティページのすべての文字列（タイトル、動詞、フィルター、空状態） |

信頼できる情報源となるロケールは `pt-BR` と `en` です。その他の40ロケールはすべて、
`next-intl` のフォールバック機構（`src/i18n/config.ts` で設定）を通じて英語にフォールバックします。
