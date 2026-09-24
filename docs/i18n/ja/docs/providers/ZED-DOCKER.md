# Zed IDE Integration in Docker Environments (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute を Docker 内で実行すると、コンテナからホスト OS のキーチェーンデーモン（Linux の libsecret、macOS の Keychain、Windows の Credential Manager）にアクセスできず、またホストファイルシステム上の Zed 設定ディレクトリがデフォルトではコンテナ内から見えないため、標準の「Zed Keychain からインポート」フローは失敗します。

## Docker でキーチェーンのインポートが失敗する理由

コンテナ内では、次の 2 つの問題が障害となります。

1. **ファイルシステムの分離** — `isZedInstalled()` は、`~/.config/zed`（Linux）、`~/Library/Application Support/Zed`（macOS）、または Windows の同等のパスを検索します。これらのパスはホスト上にあり、明示的にボリュームマウントしない限り利用できません。
2. **IPC の分離** — 設定ディレクトリをマウントした場合でも、`keytar` ネイティブモジュールは Unix ソケットまたは D-Bus セッションを介して OS のキーチェーンサービスと通信します。どちらもデフォルトではコンテナにブリッジされないため、認証情報の読み取りは常に失敗します。

OmniRoute は、次の 2 つのヒューリスティックを使用して Docker 環境を検出します。

- `/.dockerenv` が存在すること（コンテナ起動時に Docker デーモンによって書き込まれます）。
- `/proc/1/cgroup` に文字列 `docker` が含まれていること（Linux cgroup v1）。

いずれかのヒューリスティックに該当すると、インポートルートは `zedDockerEnvironment: true` と、Manual Token Import タブを使用するよう案内するメッセージを含む HTTP 422 を返します。

## Manual Token Import タブの使用方法

1. **Dashboard → Providers → Zed** を開きます。
2. **Manual Token Import** パネルがキーチェーンインポートカードの下に表示されます。OmniRoute が Docker を検出した場合、最初のキーチェーンインポート試行が失敗した後、このパネルは自動的に展開されます。
3. ドロップダウンからプロバイダー（OpenAI、Anthropic、Google、Mistral、xAI、OpenRouter、または DeepSeek）を選択します。
4. パスワードフィールドに API キーを貼り付けます。
5. **Import** をクリックします。

キーは、`Zed Manual Import (<provider>)` という名前の新しいプロバイダー接続として保存されます。

## Zed がホスト上で API キーを保存する場所

Zed は、AI プロバイダーのキーを `zed-openai`、`ai.zed.openai`、`zed-anthropic` などのサービス名で OS のキーチェーンに保存します。手動インポート用にキーを取得するには、次の場所を確認してください。

**Linux**

```
~/.config/zed/settings.json
```

`language_models` セクションには、プロバイダー設定が含まれています。Zed UI を介してキーチェーンに保存されたキーは、`settings.json` にプレーンテキストでは保存されません。GNOME Keyring / Seahorse などのキーチェーンビューアーを使用するか、次のコマンドを実行して取得してください。

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

キーチェーンエントリは、**Keychain Access.app** で `zed` を検索すると見つけられます。

## ボリュームマウントのオプション（上級者向け）

必要に応じて、Zed の設定ディレクトリを読み取り専用でコンテナにマウントできます。これはキーチェーンの問題を解決するものではありませんが、機密情報ではない Zed の設定値（モデル設定など）を読み取る将来の機能で役立つ可能性があります。

```yaml
# docker-compose.yml の抜粋
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ホスト
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ホスト（代わりにこちらのコメントを解除）
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # 将来対応予定: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

注: `ZED_CONFIG_PATH` 環境変数によるオーバーライドは、まだ実装されていません。このスニペットは、この機能が追加された際の参考として提供されています。

## 手動インポート API

手動インポートエンドポイントは、直接呼び出すこともできます。

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // 任意
}
```

成功すると、次のレスポンスが返されます。

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## トラブルシューティング

| 症状                                 | 原因                                    | 解決方法                                           |
| ------------------------------------ | --------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`   | Docker 内で実行されている               | Manual Token Import タブを使用する                 |
| 404 + `zedInstalled: false`          | ホストに Zed がインストールされていない | Zed をインストールするか、手動インポートを使用する |
| 403 + キーチェーンへのアクセス拒否   | OS がキーチェーンへのアクセスを拒否     | OS のプロンプトで権限を付与する                    |
| 404 + キーチェーンサービスが利用不可 | Linux に `libsecret` がない             | `libsecret-1-dev` をインストールする               |
