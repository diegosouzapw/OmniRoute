# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

このガイドは、**OmniRoute**を保護し、**ポートを開かずに (ゼロ インバウンド)**、アプリケーションをインターネットに安全に公開するためのネットワーク インフラストラクチャのゴールド スタンダードを文書化しています。## What was done on your VM?

PM2 経由で**Split-Port**モードで OmniRoute を有効にしました。

-**ポート `20128`:\*\***API のみ**`/v1` を実行します。-**ポート `20129`:\***\*管理ダッシュボードのみ**を実行します。

さらに、内部サービスには「REQUIRE_API_KEY=true」が必要です。これは、ダッシュボードの「API キー」タブで生成された正規の「ベアラー トークン」を送信せずにエージェントが API エンドポイントを使用できないことを意味します。

これにより、2 つの完全に独立したネットワーク ルールを作成できます。ここで**Cloudflare トンネル (クラウドフレア)**が登場します。---

## 1. How to Create the Tunnel in Cloudflare

「cloudflared」ユーティリティはすでにマシンにインストールされています。クラウドで次の手順に従います。

1.**Cloudflare Zero Trust**ダッシュボード (one.dash.cloudflare.com) にアクセスします。2. 左側のメニューで、**ネットワーク > トンネル**に移動します。3. [**トンネルの追加**] をクリックし、**Cloudflared**を選択し、「OmniRoute-VM」という名前を付けます。4. 画面上に「コネクタのインストールと実行」というコマンドが生成されます。**トークン (「--token」の後の長い文字列)**をコピーするだけです。5. SSH 経由で仮想マシン (または Proxmox ターミナル) にログインし、以下を実行します。 ```bash

# Starts and permanently binds the tunnel to your account

cloudflared service install YOUR_GIANT_TOKEN_HERE

```

---

## 2. Configuring Routing (Public Hostnames)

引き続き新しく作成したトンネル画面で、[**パブリック ホスト名**] タブに移動し、分離したことを利用して**2 つ**のルートを追加します。### Route 1: Secure API (Limited)

-**サブドメイン:**`api`
-**ドメイン:**`yourglobal.com` (実際のドメインを選択してください)
-**サービスタイプ:**`HTTP`
-**URL:**`127.0.0.1:20128` *(内部 API ポート)*### Route 2: Zero Trust Dashboard (Closed)

-**サブドメイン:**`omniroute` または `panel`
-**ドメイン:**`yourglobal.com`
-**サービスタイプ:**`HTTP`
-**URL:**`127.0.0.1:20129` *(内部アプリ/ビジュアルポート)*

この時点で、「物理」接続は解決されます。では、実際に保護してみましょう。---

## 3. Shielding the Dashboard with Zero Trust (Access)

オープンなインターネットからダッシュボードへのアクセスを完全に削除すること以上にダッシュボードを保護するローカル パスワードはありません。

1. ゼロ トラスト ダッシュボードで、**[アクセス] > [アプリケーション] > [アプリケーションの追加]**に移動します。
2. [**セルフホスト**] を選択します。
3.**アプリケーション名**に「OmniRouteパネル」と入力します。
4.**アプリケーション ドメイン**に「omniroute.yourglobal.com」と入力します (「ルート 2」で使用したものと同じです)。
5. [**次へ**] をクリックします。
6.**ルールアクション**で、「許可」を選択します。ルール名には「Admin Only」と入力します。
7. [セレクター] ドロップダウンの下の [**含める**] で、[電子メール] を選択し、電子メール (例: 「admin@spgeo.com.br」) を入力します。
8. 保存します (「アプリケーションの追加」)。

>**これによる影響:**「omniroute.yourglobal.com」を開こうとしても、OmniRoute アプリケーションにはアクセスできなくなります。エレガントな Cloudflare 画面が表示され、メールアドレスの入力を求められます。そこにあなた (または入力した電子メール) が入力された場合にのみ、ポート「20129」へのトンネルのロックを解除する一時的な 6 桁のコードが Outlook/Gmail に届きます。---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

ゼロ トラスト ダッシュボードは、API ルート (「api.yourglobal.com」) には適用されません。これは、ブラウザーを使用せずに自動化ツール (エージェント) を介したプログラムによるアクセスであるためです。このために、Cloudflare のメイン ファイアウォール (WAF) を使用します。

1.**通常の Cloudflare ダッシュボード**(dash.cloudflare.com) にアクセスし、ドメインに移動します。
2. 左側のメニューで、**セキュリティ > WAF > レート制限ルール**に移動します。
3. [**ルールの作成**] をクリックします。
4.**名前:**`OmniRoute API 不正行為防止`
5.**受信リクエストが一致する場合...**
- フィールドを選択: `ホスト名`
- 演算子: `equals`
- 値: `api.yourglobal.com`
6.**同じ特性を持つ:**の下で、「IP」を保持します。
7. 制限 (Limit) については、次のとおりです。
-**リクエストが `50` を超えた場合:**
-**期間:**`1分`
8. 最後に、**アクション**:「ブロック」で、ブロックが 1 分間継続するか 1 時間継続するかを決定します。
9.**展開**。

>**これによる影響:**60 秒間に 50 を超えるリクエストを API URL に送信することはできません。複数のエージェントを実行しており、それらのエージェントの消費量がすでにレート制限に達し、トークンを追跡しているため、これは、トラフィックがトンネルを通過する前に、熱ストレスによるオンプレミス インスタンスのダウンを防ぐインターネット エッジ レイヤーでの単なる対策です。---

## Finalization

1. VM には、`/etc/ufw` に**公開ポートがありません**。
2. OmniRoute は HTTPS アウトバウンド (「クラウドフレア」) のみを通信し、世界から直接 TCP を受け取りません。
3. OpenAI へのリクエストは、SOCKS5 プロキシを通過するようにグローバルに設定されているため、難読化されています (SOCKS5 はインバウンドで送信されるため、クラウドは SOCKS5 を気にしません)。
4. Web ダッシュボードには電子メールによる 2 要素認証があります。
5. API は Cloudflare によってエッジでレート制限されており、ベアラー トークンのみをトラフィックします。
```
