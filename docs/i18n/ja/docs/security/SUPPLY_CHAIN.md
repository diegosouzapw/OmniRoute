# Supply-Chain Gates (Phase 8 · Block A) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/SUPPLY_CHAIN.md) · 🇪🇹 [am](../../../am/docs/security/SUPPLY_CHAIN.md) · 🇸🇦 [ar](../../../ar/docs/security/SUPPLY_CHAIN.md) · 🇦🇿 [az](../../../az/docs/security/SUPPLY_CHAIN.md) · 🇧🇬 [bg](../../../bg/docs/security/SUPPLY_CHAIN.md) · 🇧🇩 [bn](../../../bn/docs/security/SUPPLY_CHAIN.md) · 🇧🇦 [bs](../../../bs/docs/security/SUPPLY_CHAIN.md) · 🇨🇿 [cs](../../../cs/docs/security/SUPPLY_CHAIN.md) · 🇩🇰 [da](../../../da/docs/security/SUPPLY_CHAIN.md) · 🇩🇪 [de](../../../de/docs/security/SUPPLY_CHAIN.md) · 🇬🇷 [el](../../../el/docs/security/SUPPLY_CHAIN.md) · 🇪🇸 [es](../../../es/docs/security/SUPPLY_CHAIN.md) · 🇪🇪 [et](../../../et/docs/security/SUPPLY_CHAIN.md) · 🇮🇷 [fa](../../../fa/docs/security/SUPPLY_CHAIN.md) · 🇫🇮 [fi](../../../fi/docs/security/SUPPLY_CHAIN.md) · 🇫🇷 [fr](../../../fr/docs/security/SUPPLY_CHAIN.md) · 🇮🇪 [ga](../../../ga/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [gu](../../../gu/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ha](../../../ha/docs/security/SUPPLY_CHAIN.md) · 🇮🇱 [he](../../../he/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [hi](../../../hi/docs/security/SUPPLY_CHAIN.md) · 🇭🇷 [hr](../../../hr/docs/security/SUPPLY_CHAIN.md) · 🇭🇺 [hu](../../../hu/docs/security/SUPPLY_CHAIN.md) · 🇦🇲 [hy](../../../hy/docs/security/SUPPLY_CHAIN.md) · 🇮🇩 [id](../../../id/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [ig](../../../ig/docs/security/SUPPLY_CHAIN.md) · 🇮🇹 [it](../../../it/docs/security/SUPPLY_CHAIN.md) · 🇬🇪 [ka](../../../ka/docs/security/SUPPLY_CHAIN.md) · 🇰🇭 [km](../../../km/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [kn](../../../kn/docs/security/SUPPLY_CHAIN.md) · 🇰🇷 [ko](../../../ko/docs/security/SUPPLY_CHAIN.md) · 🇱🇹 [lt](../../../lt/docs/security/SUPPLY_CHAIN.md) · 🇱🇻 [lv](../../../lv/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ml](../../../ml/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [mr](../../../mr/docs/security/SUPPLY_CHAIN.md) · 🇲🇾 [ms](../../../ms/docs/security/SUPPLY_CHAIN.md) · 🇲🇹 [mt](../../../mt/docs/security/SUPPLY_CHAIN.md) · 🇲🇲 [my](../../../my/docs/security/SUPPLY_CHAIN.md) · 🇳🇵 [ne](../../../ne/docs/security/SUPPLY_CHAIN.md) · 🇳🇱 [nl](../../../nl/docs/security/SUPPLY_CHAIN.md) · 🇳🇴 [no](../../../no/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [or](../../../or/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [pa](../../../pa/docs/security/SUPPLY_CHAIN.md) · 🇵🇭 [phi](../../../phi/docs/security/SUPPLY_CHAIN.md) · 🇵🇱 [pl](../../../pl/docs/security/SUPPLY_CHAIN.md) · 🇵🇹 [pt](../../../pt/docs/security/SUPPLY_CHAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/SUPPLY_CHAIN.md) · 🇷🇴 [ro](../../../ro/docs/security/SUPPLY_CHAIN.md) · 🇷🇺 [ru](../../../ru/docs/security/SUPPLY_CHAIN.md) · 🇱🇰 [si](../../../si/docs/security/SUPPLY_CHAIN.md) · 🇸🇰 [sk](../../../sk/docs/security/SUPPLY_CHAIN.md) · 🇸🇮 [sl](../../../sl/docs/security/SUPPLY_CHAIN.md) · 🇷🇸 [sr](../../../sr/docs/security/SUPPLY_CHAIN.md) · 🇸🇪 [sv](../../../sv/docs/security/SUPPLY_CHAIN.md) · 🇰🇪 [sw](../../../sw/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [ta](../../../ta/docs/security/SUPPLY_CHAIN.md) · 🇮🇳 [te](../../../te/docs/security/SUPPLY_CHAIN.md) · 🇹🇭 [th](../../../th/docs/security/SUPPLY_CHAIN.md) · 🇹🇷 [tr](../../../tr/docs/security/SUPPLY_CHAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/SUPPLY_CHAIN.md) · 🇵🇰 [ur](../../../ur/docs/security/SUPPLY_CHAIN.md) · 🇺🇿 [uz](../../../uz/docs/security/SUPPLY_CHAIN.md) · 🇻🇳 [vi](../../../vi/docs/security/SUPPLY_CHAIN.md) · 🇳🇬 [yo](../../../yo/docs/security/SUPPLY_CHAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/SUPPLY_CHAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/SUPPLY_CHAIN.md)

---

OmniRouteはnpmとDockerのアーティファクトを公開しています。これらのゲートは、プロベナンス、インベントリ（SBOM）、CVEスキャンをすべてOSSとして提供し、リリースワークフローに組み込まれています。**アドバイザリ優先**の姿勢 — まずは報告し、最初のグリーンリリース後にブロックするよう昇格させます。

| ゲート                | ツール                                         | 場所                          | ブロックするか？       | 出力                                         |
| :-------------------- | :--------------------------------------------- | :---------------------------- | :--------------------- | :------------------------------------------- |
| SLSA provenance (npm) | `npm --provenance` (OIDC)                      | `npm-publish.yml`             | 公開が失敗した場合のみ | npmjsバッジ / `npm audit signatures`         |
| SBOM npm              | `@cyclonedx/cyclonedx-npm`                     | `npm-publish.yml`             | 生成が失敗した場合のみ | リリースアセット + アーティファクト          |
| SBOM image            | `anchore/sbom-action` (syft)                   | `docker-publish.yml` (merge)  | アドバイザリ           | CycloneDXアーティファクト                    |
| Trivy CVE (SARIF)     | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | アドバイザリ           | SARIF (HIGH+CRITICAL) → セキュリティタブ     |
| Trivy CRITICAL gate   | `aquasecurity/trivy-action`                    | `docker-publish.yml` (merge)  | **ブロックする**       | 修正可能なCRITICALで`exit-code: '1'`         |
| osv vulnCount         | `osv-scanner` (`check:vuln-ratchet --ratchet`) | `ci.yml` (`quality-extended`) | **ブロックする**       | `metrics.vulnCount`をラチェット（方向:down） |
| OpenSSF Scorecard     | `ossf/scorecard-action`                        | `scorecard.yml` (cron)        | アドバイザリ           | SARIF → セキュリティ + バッジ                |

イメージCVEラチェットは、`docker-publish.yml`で**2つのステップ**を使用します。SARIFステップ（`HIGH,CRITICAL`、`exit-code: 0`）は、HIGH+CRITICALをブロックせずにセキュリティタブに表示します。_CRITICALゲート_ステップ（`severity: CRITICAL`、`ignore-unfixed: true`、`exit-code: 1`）は、**修正が利用可能な**CRITICAL CVEでリリースを失敗させます。`ignore-unfixed`は、アップストリームのパッチがないベースイメージのCVEによるリリースブロックを防ぎます。

## ⚠️ CVEの変動 (osv/Trivyゲートのブロック)

osvとTrivyは、**継続的に増加する**CVEデータベースに対して依存関係を比較します。**依存関係に全く触れていない**PRでも、既存の依存関係に新しいCVEが公開されたために突然赤くなることがあります（osv: 測定された`vulnCount` > ベースライン; Trivy: イメージ内の新しい修正可能なCRITICAL）。**これは、ブロックするCVEゲートの予期される運用上の動作であり、製品の退行ではありません。**

osvまたはTrivyが新たに公開されたCVEによって赤くなった場合の対処法は次のとおりです。

1.  **影響を受ける依存関係を更新する**（推奨） — `package.json`の`overrides`（推移的依存関係）を介してパッチ適用済みのバージョンにアップグレードするか、パッチ適用済みのベースでイメージを再構築します。
2.  **アップストリームの修正がない場合：**
    - **osv:** `config/quality/quality-baseline.json`内の`metrics.vulnCount`を再ベースライン化します（`npm run quality:ratchet -- --update`は専用ゲートをカバーしないため、手動で値を編集し、`direction:down`を設定します）。これには正当化のメモと追跡課題を添えます。
    - **Trivy:** `.trivyignore`にエントリを追加します（1行に1つのCVE-ID）。これには正当化のコメントと追跡課題を添えます。`ignore-unfixed: true`は、パッチのないCVEを自動的にカバーします。

ツールが存在しない場合や測定が失敗した場合（osv-scannerがPATHにない、osv.dev/ネットワークに到達できない、無効なJSONなど）、両方のゲートは**正常にスキップ**します（終了コード0）。 — **測定**の失敗がブロックすることはなく、**測定された**退行のみがブロックします。

## 既知の許容リスク

### extract-zip 2.0.1 — GHSA-7pqw-9j4j-h8q3 / GHSA-jmr9-qjv8-65gv (#14482)

`extract-zip@2.0.1` には、未パッチの2つの高深刻度シンボリックリンクトラバーサルアドバイザリが含まれています。
上記のCVE Varianceの是正策の「上流での修正なし」のブランチに従い、これはバージョンアップではなく、**許容リスク**と見なされます。

- **連鎖:** `promptfoo` (devDependency) → `@openai/codex-security` → `extract-zip@2.0.1`。`package-lock.json` で確認済み — 依存関係ツリー全体で、`extract-zip` を宣言しているパッケージは1つ (`@openai/codex-security`) だけであり、`@openai/codex-security` を宣言しているパッケージも1つ (`promptfoo`) だけです。
- **連鎖内のどこにも修正版リリースが存在しません。** `extract-zip@2.0.1` (2020年公開) はこのパッケージの最終リリースであり、メンテナンスされていません。`@openai/codex-security` の現在の npm-latest (`0.1.29`) は、依然として `extract-zip@2.0.1` を使用しています。
- **本番環境からは到達不能。** `promptfoo` は devDependency のみであり (`dependencies` には決してリストされません)、`src/`、`open-sse/`、または `bin/` の下のどのファイルも `extract-zip` npm パッケージをインポートしていません — OmniRoute 独自の `extractZip()` ヘルパー (`src/lib/versionManager/binaryManager.ts:93`) はネイティブの `unzip`/`tar` を呼び出しており、無関係です。`@openai/codex-security` も、extract-zip の onEntry コールバックの上に独自のシンボリックリンクトラバーサルガードを搭載しています。
- `package.json` の `overrides` を介して `extract-zip` をエイリアス**しないでください** — 唯一の実行可能なドロップイン代替品は Electron-org-internal であり、`@openai/codex-security` 独自の onEntry/defaultDirMode/defaultFileMode チェックとはAPI互換性がありません。これをオーバーライドすると、そのパッケージのセキュリティチェックがサイレントに破損します。
- **ベースライン:** 測定された osv `vulnCount` (3) は、凍結された `config/quality/quality-baseline.json` ベースライン (27) をすでに大幅に下回っています — ラチェット変更は不要です。
- **リグレッションガード:** `tests/unit/extract-zip-14482-exposure.test.ts` は、上記の連鎖と本番環境からのインポートなしの不変条件をアサートします。どちらかが破られた場合 (例: 将来のPRで `extract-zip` が本番環境から到達可能になった場合)、CIは失敗します。
- **追跡:** issue #14482。

## バックログ: Scorecardアドバイザリ → ブロッキング

Scorecardレポートを含む最初のグリーンリリース後:

- Scorecard: スコアラチェット (測定されたスコアを固定し、減少させない)。

フェーズ7のゲート (osv-scanner, gitleaks, actionlint+zizmor) を補完します。zizmor はワークフロー自体を監査し、Scorecard はリポジトリの全体的な姿勢を測定します。
