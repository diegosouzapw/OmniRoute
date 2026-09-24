# Supply-Chain Gates (Phase 8 · Block A) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRoute は npm + Docker アーティファクトを公開します。これらのゲートは、すべて OSS を使用してプロベナンス、
インベントリ（SBOM）、CVE スキャンを提供し、リリースワークフローに組み込まれています。
姿勢は **アドバイザリ優先** — 現時点ではレポートのみを行い、最初の正常なリリース後に
ブロッキングへ昇格します。

| ゲート                   | ツール                                          | 場所                           | ブロックするか？       | 出力                                           |
| ------------------------ | ----------------------------------------------- | ------------------------------ | ---------------------- | ---------------------------------------------- |
| SLSA プロベナンス（npm） | `npm --provenance`（OIDC）                      | `npm-publish.yml`              | 公開に失敗した場合のみ | npmjs バッジ / `npm audit signatures`          |
| npm の SBOM              | `@cyclonedx/cyclonedx-npm`                      | `npm-publish.yml`              | 生成に失敗した場合のみ | リリースアセット + アーティファクト            |
| イメージの SBOM          | `anchore/sbom-action`（syft）                   | `docker-publish.yml`（マージ） | アドバイザリ           | CycloneDX アーティファクト                     |
| Trivy CVE（SARIF）       | `aquasecurity/trivy-action`                     | `docker-publish.yml`（マージ） | アドバイザリ           | SARIF（HIGH+CRITICAL）→ Security タブ          |
| Trivy CRITICAL ゲート    | `aquasecurity/trivy-action`                     | `docker-publish.yml`（マージ） | **ブロッキング**       | 修正可能な CRITICAL で `exit-code: '1'`        |
| osv vulnCount            | `osv-scanner`（`check:vuln-ratchet --ratchet`） | `ci.yml`（`quality-extended`） | **ブロッキング**       | `metrics.vulnCount` をラチェット（方向：down） |
| OpenSSF Scorecard        | `ossf/scorecard-action`                         | `scorecard.yml`（cron）        | アドバイザリ           | SARIF → Security + バッジ                      |

イメージの CVE ラチェットは、`docker-publish.yml` 内で **2 つのステップ**を使用します。SARIF ステップ
（`HIGH,CRITICAL`、`exit-code: 0`）は、ブロックせずに HIGH+CRITICAL を Security タブに
表示し続けます。一方、_CRITICAL ゲート_ステップ（`severity: CRITICAL`、`ignore-unfixed: true`、
`exit-code: 1`）は、**修正が提供されている** CRITICAL CVE がある場合にリリースを失敗させます。`ignore-unfixed`
により、上流のパッチがないベースイメージの CVE が原因でリリースがブロックされることを防ぎます。

## ⚠️ CVE の変動（ブロッキング osv/Trivy ゲート）

osv と Trivy は、依存関係を**継続的に増加する** CVE データベースと照合します。**依存関係を
一切変更していない** PR でも、既存の依存関係に新しい CVE が公開されたことで、
突然失敗する可能性があります（osv：測定された `vulnCount` > ベースライン、Trivy：イメージ内に新しい
修正可能な CRITICAL が存在）。**これはブロッキング CVE ゲートに期待される運用上の動作であり、
製品のリグレッションではありません。**

新たに公開された CVE によって osv または Trivy が失敗した場合の対処方法は次のとおりです。

1. **影響を受ける依存関係を更新する**（推奨）— `package.json` の
   `overrides`（推移的依存関係）を使用してパッチ適用済みバージョンにアップグレードするか、パッチ適用済みのベース上でイメージを再ビルドします。
2. **上流に修正がない場合：**
   - **osv：** `config/quality/quality-baseline.json` 内の `metrics.vulnCount` を再ベースライン化します。
     （`npm run quality:ratchet -- --update` は専用ゲートを対象としません。値を
     手動で編集し、`direction:down` を指定してください。）その際、根拠を示す注記と追跡用 issue を追加します。
   - **Trivy：** `.trivyignore` にエントリ（1 行につき 1 つの CVE-ID）を追加し、根拠を示す
     コメントと追跡用 issue を付けます。`ignore-unfixed: true` により、パッチのない CVE は
     すでに自動的に対象外となります。

どちらのゲートも、ツールが存在しない場合や測定に失敗した場合
（osv-scanner が PATH にない、osv.dev/ネットワークに到達できない、JSON が無効）には**正常に SKIP**
（終了コード 0）します。**測定**の失敗によってブロックされることはなく、**測定された**
リグレッションのみがブロックされます。

## バックログ：Scorecard のアドバイザリ → ブロッキング

Scorecard のレポートを伴う最初の正常なリリース後：

- Scorecard：スコアラチェット（測定されたスコアを固定し、低下を許可しない）。

Phase 7 のゲート（osv-scanner、gitleaks、actionlint+zizmor）を補完します。zizmor は
ワークフロー自体を監査し、Scorecard はリポジトリ全体の姿勢を測定します。
