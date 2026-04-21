# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Bu kılavuz,**OmniRoute**'u korumak ve uygulamanızı**hiçbir bağlantı noktası açmadan (Sıfır Gelen)**güvenli bir şekilde internete açmak için ağ altyapısının altın standardını belgelemektedir.## What was done on your VM?

OmniRoute'u PM2 aracılığıyla**Bölünmüş Bağlantı Noktası**modunda etkinleştirdik:

-**Bağlantı Noktası `20128`:\*\***yalnızca API**`/v1`'i çalıştırır. -**Port `20129`:\***\*Yalnızca Yönetim Panelini**çalıştırır.

Ayrıca, dahili hizmet 'REQUIRE_API_KEY=true' gerektirir; bu, hiçbir aracının Kontrol Panelinin API Anahtarları sekmesinde oluşturulan meşru bir "Taşıyıcı Belirteci" göndermeden API uç noktalarını kullanamayacağı anlamına gelir.

Bu, tamamen bağımsız iki ağ kuralı oluşturmamıza olanak tanır.**Bulut Parlaması Tüneli (bulut parlaması)**tam da burada devreye giriyor.---

## 1. How to Create the Tunnel in Cloudflare

'Cloudflared' yardımcı programı makinenizde zaten yüklü. Bulutta şu adımları izleyin:

1.**Cloudflare Zero Trust**kontrol panelinize (one.dash.cloudflare.com) erişin. 2. Soldaki menüde**Ağlar > Tüneller**'e gidin. 3.**Tünel Ekle**'ye tıklayın,**Cloudflared**'i seçin ve 'OmniRoute-VM' olarak adlandırın. 4. Ekranda "Konektörü kurun ve çalıştırın" adlı bir komut oluşturacaktır.**Yalnızca Token'ı ('--token'dan sonraki uzun dize) kopyalamanız gerekir**. 5. Sanal makinenizde (veya Proxmox Terminalinde) SSH aracılığıyla oturum açın ve şunu çalıştırın: ```bash

# Starts and permanently binds the tunnel to your account

cloudflared service install YOUR_GIANT_TOKEN_HERE

```

---

## 2. Configuring Routing (Public Hostnames)

Hala yeni oluşturulan Tünel ekranında**Genel Ana Bilgisayar Adları**sekmesine gidin ve yaptığımız ayrımdan yararlanarak**iki**rotayı ekleyin:### Route 1: Secure API (Limited)

-**Alt alan adı:**"api"
-**Alan Adı:**`yourglobal.com` (gerçek alan adınızı seçin)
-**Hizmet Türü:**`HTTP`
-**URL:**`127.0.0.1:20128` *(Dahili API bağlantı noktası)*### Route 2: Zero Trust Dashboard (Closed)

-**Alt alan adı:**"çok yönlü rota" veya "panel"
-**Alan adı:**`global.com`
-**Hizmet Türü:**`HTTP`
-**URL:**`127.0.0.1:20129` *(Dahili Uygulama/Görsel bağlantı noktası)*

Bu noktada "Fiziksel" bağlantı çözümlenir. Şimdi onu gerçekten koruyalım.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Hiçbir yerel şifre, kontrol panelinizi açık internetten erişimi tamamen kaldırmaktan daha iyi koruyamaz.

1. Sıfır Güven kontrol panelinde**Erişim > Uygulamalar > Uygulama ekle**seçeneğine gidin.
2.**Kendi kendine barındırılan**'ı seçin.
3.**Uygulama adı**'na 'OmniRoute Panel' girin.
4.**Uygulama etki alanı**alanına `omniroute.yourglobal.com` yazın ("Rota 2"de kullandığınızın aynısı).
5.**İleri**'ye tıklayın.
6.**Kural eylemi**'nde "İzin Ver"i seçin. Kural adı için 'Yalnızca Yönetici'yi girin.
7.**Dahil Et**bölümünde, "Seçici" açılır menüsünün altında, "E-postalar"ı seçin ve e-posta adresinizi yazın, örneğin "admin@spgeo.com.br".
8. Kaydet (`Uygulama ekle`).

>**Bunun yaptığı şey:**`omniroute.yourglobal.com`u açmaya çalışırsanız, artık OmniRoute uygulamanıza ulaşmaz! E-postanızı girmenizi isteyen zarif bir Cloudflare ekranına gelir. Yalnızca siz (veya girdiğiniz e-posta) oraya yazarsanız, Outlook/Gmail'de '20129' bağlantı noktasına giden tünelin kilidini açan 6 haneli geçici bir kod alacaksınız.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Sıfır Güven Kontrol Paneli, tarayıcı olmadan otomatik araçlar (aracılar) aracılığıyla programlı bir erişim olduğundan, API rotası ("api.yourglobal.com") için geçerli değildir. Bunun için Cloudflare'in ana Güvenlik Duvarını (WAF) kullanacağız.

1.**Normal Cloudflare Kontrol Paneline**(dash.cloudflare.com) erişin ve Etki Alanınıza gidin.
2. Soldaki menüde**Güvenlik > WAF > Hız sınırlama kuralları**'na gidin.
3.**Kural oluştur**'a tıklayın.
4.**Ad:**'OmniRoute API Kötüye Kullanıma Karşı Koruma'
5.**Gelen istekler eşleşirse...**
- Alanı Seçin: `Ana Bilgisayar Adı`
- Operatör: "eşittir"
- Değer: `api.yourglobal.com`
6.**Aynı özelliklerle:**'IP'yi koruyun' seçeneğinin altında.
7. Limitler (Limit) için:
-**İstekler şunu aştığında:**`50`
-**Dönem:**"1 dakika"
8. Sonunda,**Eylem**: `Engelle' seçeneğinin altında, engellemenin 1 dakika mı yoksa 1 saat mi süreceğine karar verin.
9.**Dağıtın**.

>**Bunun yaptığı şey:**Hiç kimse API URL'nize 60 saniyelik bir süre içinde 50'den fazla istek gönderemez. Birden fazla aracı çalıştırdığınız ve bunların arkasındaki tüketim zaten hız sınırlarına ulaştığından ve belirteçleri takip ettiğinden, bu yalnızca Internet Edge Katmanında, trafik tünelden aşağı inmeden Şirket İçi Bulut Sunucunuzun termal stres nedeniyle düşmesini önleyen bir önlemdir.---

## Finalization

1. VM'nizin `/etc/ufw' dosyasında**açıkta kalan bağlantı noktası yok**.
2. OmniRoute yalnızca giden HTTPS'yi konuşur ("bulut alevlendi") ve dünyadan doğrudan TCP almaz.
3. OpenAI'ye olan istekleriniz gizlenmiştir çünkü bunları küresel olarak bir SOCKS5 Proxy'sinden geçecek şekilde yapılandırdık (Bulut, SOCKS5'i umursamaz çünkü Gelen olarak gelir).
4. Web kontrol panelinizde E-posta ile 2 Faktörlü kimlik doğrulama vardır.
5. API'nizin uçta hızı Cloudflare tarafından sınırlandırılmıştır ve yalnızca Taşıyıcı Tokenların trafiğini gerçekleştirir.
```
