# Termux Headless Setup (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute は、Termux を介して Android 上でヘッドレスサーバーとして実行できます。Electron デスクトップアプリは Termux ではサポートされていませんが、Web ダッシュボードと OpenAI 互換 API は、ローカルブラウザまたは同じネットワーク上の他のデバイスから利用できます。

## 前提条件

F-Droid または GitHub リリースから Termux をインストールし、パッケージを更新してから、`better-sqlite3` などのネイティブ依存関係に必要なビルドツールをインストールします。

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js のバージョン:** OmniRoute には Node `>=22.22.2 <23 || >=24.0.0 <27` が必要です（`package.json` の `engines` / `SUPPORTED_NODE_RANGE` と一致）。Termux の `nodejs-lts` には通常 Node 20 LTS が含まれていますが、これは**現在サポートされていません**。代わりに `pkg install nodejs`（最新版）を実行し、`node --version` が 22.x/24.x 以上のバージョンを表示することを確認してください。

ネイティブパッケージのコンパイルに失敗した場合は、上記の `pkg install` コマンドを再実行してから、OmniRoute のインストールを再試行してください。

## インストール

最新の公開パッケージを直接実行します。

```bash
npx -y omniroute@latest
```

グローバルにインストールすることもできます。

```bash
npm install -g omniroute
omniroute
```

## 実行

OmniRoute をヘッドレスサーバーモードで起動します。

```bash
omniroute
```

または：

```bash
npx omniroute
```

ダッシュボードは次のアドレスで待ち受けます。

```text
http://localhost:20128
```

Android ブラウザでその URL を開きます。Termux 内でクライアントを実行する場合は、OpenAI 互換のベース URL として同じホストとポートを使用してください。

## バックグラウンド実行

単純なバックグラウンドプロセスとして実行する場合：

```bash
nohup omniroute > omniroute.log 2>&1 &
```

停止するには：

```bash
pkill -f omniroute
```

デバイスの起動後に自動的に起動するには、Termux:Boot アドオンをインストールし、起動スクリプトを作成します。

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android のバッテリー最適化により、長時間実行されるバックグラウンドプロセスが停止する場合があります。サーバーを常時オンラインにしておく必要がある場合は、Termux のバッテリー最適化を無効にしてください。

## 他のデバイスからのアクセス

WiFi ネットワーク上のスマートフォンの IP アドレスを確認します。

```bash
ip addr show wlan0
```

次に、別のデバイスからダッシュボードを開きます。

```text
http://PHONE_IP:20128
```

例：

```text
http://192.168.1.50:20128
```

スマートフォンとクライアントを、同じ信頼できるネットワークに接続してください。OmniRoute をスマートフォンの外部に公開する場合は、API キーとダッシュボード認証を有効にしてください。

## データディレクトリ

デフォルトでは、OmniRoute は Linux で使用されるものと同じサーバー側データパスの動作に従い、Termux のホームディレクトリ配下にデータを保存します。データベースを明示的な場所に配置するには：

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## 制限事項

- Electron は Termux では動作しません。
- システムトレイやデスクトップ統合はありません。
- この構成はサーバー専用です。ブラウザのダッシュボードを使用してください。
- ネイティブ依存関係はローカルでのコンパイルが必要になる場合があります。
- メモリの少ない Android デバイスでは、同時リクエスト数を減らす必要がある場合があります。
- MITM/システム証明書機能には、Termux の外部で Android レベルのトラストストア設定が必要になる場合があります。

## トラブルシューティング

### サポートされていないプラットフォーム: android（すべてのリクエストが HTTP 500 を返す）

**症状:** `omniroute` / `omniroute serve` は `✔ OmniRoute is running!` と表示しますが、ダッシュボードまたは API へのすべてのリクエストが、単純な `500 Internal Server Error` を返します。`~/.omniroute/logs/application/app.log` は空のままで、`APP_LOG_LEVEL=debug` を指定しても有用な情報は何も表示されず、レスポンス本文は JSON の詳細情報がないプレーンテキスト（`Internal Server Error`）です。

**原因:** 一部の Termux/Node ビルドでは、`process.platform === "android"` と報告されます。Next.js の `getCacheDirectory()` はこのプラットフォームを処理できません。`~/.cache`（または汎用の一時ディレクトリ）が事前に存在している必要があり、存在しない場合は instrumentation hook の読み込み中に次のエラーで失敗します。

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

hook が読み込まれないため、ログ記録も開始されません。その結果、この 500 エラーは原因をまったく診断できないように見えます。OmniRoute は Android/Termux 上でこの検出が成功するように、Next.js の起動前に CLI エントリポイントで `~/.cache` を作成し、未設定の場合は `XDG_CACHE_HOME` を設定します。

**サポートされている解決方法（パッケージのパッチ適用は不要）:**

```bash
mkdir -p ~/.cache
omniroute serve
```

現在の OmniRoute ビルドでは、CLI が Android/Termux 上でこれを自動的に実行するため、新規の `npx -y omniroute@latest` / グローバルインストールでは手動での作業は不要です。アップグレード後もこのエラーが表示される場合は、上記のように `~/.cache` を一度作成してから再起動してください。

`process.platform = "linux"` を強制するために `dist/server.js` をパッチしないでください。この種のパッケージへのパッチは再インストールやアップグレードのたびに上書きされ、キャッシュディレクトリが存在すれば不要です。

### better-sqlite3 のビルドエラー

Termux のビルドツールチェーンをインストールします。

```bash
pkg install nodejs python build-essential
```

次に、以下を再実行します。

```bash
npx -y omniroute@latest
```

### ポートがすでに使用中

デフォルトポートで待ち受けているプロセスを確認します。

```bash
ss -ltnp | grep 20128
```

古いプロセスを停止します。

```bash
pkill -f omniroute
```

### 他のデバイスからダッシュボードにアクセスできない

両方のデバイスが同じ WiFi ネットワーク上にあることを確認してから、Termux でテストします。

```bash
curl http://localhost:20128
```

ローカルアクセスは機能するものの LAN からアクセスできない場合は、Android のホットスポット/WiFi 分離設定、およびスマートフォン上のファイアウォールまたは VPN プロファイルを確認してください。
