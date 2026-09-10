# Kapsamlı Kılavuz: Cloudflare Tunnel ve Zero Trust (Split-Port) (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../cloudflare-zero-trust-guide.md) · 🇸🇦 [ar](../../ar/docs/cloudflare-zero-trust-guide.md) · 🇦🇿 [az](../../az/docs/cloudflare-zero-trust-guide.md) · 🇧🇬 [bg](../../bg/docs/cloudflare-zero-trust-guide.md) · 🇧🇩 [bn](../../bn/docs/cloudflare-zero-trust-guide.md) · 🇨🇿 [cs](../../cs/docs/cloudflare-zero-trust-guide.md) · 🇩🇰 [da](../../da/docs/cloudflare-zero-trust-guide.md) · 🇩🇪 [de](../../de/docs/cloudflare-zero-trust-guide.md) · 🇪🇸 [es](../../es/docs/cloudflare-zero-trust-guide.md) · 🇮🇷 [fa](../../fa/docs/cloudflare-zero-trust-guide.md) · 🇫🇮 [fi](../../fi/docs/cloudflare-zero-trust-guide.md) · 🇫🇷 [fr](../../fr/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [gu](../../gu/docs/cloudflare-zero-trust-guide.md) · 🇮🇱 [he](../../he/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [hi](../../hi/docs/cloudflare-zero-trust-guide.md) · 🇭🇺 [hu](../../hu/docs/cloudflare-zero-trust-guide.md) · 🇮🇩 [id](../../id/docs/cloudflare-zero-trust-guide.md) · 🇮🇹 [it](../../it/docs/cloudflare-zero-trust-guide.md) · 🇯🇵 [ja](../../ja/docs/cloudflare-zero-trust-guide.md) · 🇰🇷 [ko](../../ko/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [mr](../../mr/docs/cloudflare-zero-trust-guide.md) · 🇲🇾 [ms](../../ms/docs/cloudflare-zero-trust-guide.md) · 🇳🇱 [nl](../../nl/docs/cloudflare-zero-trust-guide.md) · 🇳🇴 [no](../../no/docs/cloudflare-zero-trust-guide.md) · 🇵🇭 [phi](../../phi/docs/cloudflare-zero-trust-guide.md) · 🇵🇱 [pl](../../pl/docs/cloudflare-zero-trust-guide.md) · 🇵🇹 [pt](../../pt/docs/cloudflare-zero-trust-guide.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/cloudflare-zero-trust-guide.md) · 🇷🇴 [ro](../../ro/docs/cloudflare-zero-trust-guide.md) · 🇷🇺 [ru](../../ru/docs/cloudflare-zero-trust-guide.md) · 🇸🇰 [sk](../../sk/docs/cloudflare-zero-trust-guide.md) · 🇸🇪 [sv](../../sv/docs/cloudflare-zero-trust-guide.md) · 🇰🇪 [sw](../../sw/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [ta](../../ta/docs/cloudflare-zero-trust-guide.md) · 🇮🇳 [te](../../te/docs/cloudflare-zero-trust-guide.md) · 🇹🇭 [th](../../th/docs/cloudflare-zero-trust-guide.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/cloudflare-zero-trust-guide.md) · 🇵🇰 [ur](../../ur/docs/cloudflare-zero-trust-guide.md) · 🇻🇳 [vi](../../vi/docs/cloudflare-zero-trust-guide.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/cloudflare-zero-trust-guide.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/cloudflare-zero-trust-guide.md)

---

Bu kılavuz, **OmniRoute**'u korumak ve uygulamanızı **hiçbir gelen bağlantı portu açmadan (Zero Inbound)** internete güvenli bir şekilde sunmak için altın standart ağ altyapısını belgeler.

## Sanal Makinenizde (VM) Ne Yapıldı?

OmniRoute'u PM2 aracılığıyla **Split-Port (Ayrık Port)** modunda etkinleştiriyoruz:

- **Port `20128`:** **Yalnızca API** (`/v1`) çalıştırır.
- **Port `20129`:** **Yalnızca görsel Yönetim Panosunu** çalıştırır.

Ayrıca dahili servis `REQUIRE_API_KEY=true` gerektirir; bu da hiçbir ajanın Panonun API Keys sekmesinde oluşturulan geçerli bir "Bearer Token" göndermeden API uç noktalarını tüketemeyeceği anlamına gelir.

Bu yapı ağda tamamen bağımsız iki kural oluşturmamıza olanak tanır. **Cloudflare Tunnel (cloudflared)** burada devreye girer.

---

## 1. Cloudflare'de Tünel Oluşturma

`cloudflared` yardımcı programı makinenizde kuruludur. Bulut adımlarını izleyin:

1. **Cloudflare Zero Trust** panonuza erişin (one.dash.cloudflare.com).
2. Sol menüden **Networks > Tunnels** yolunu izleyin.
3. **Add a Tunnel** seçeneğine tıklayın, **Cloudflared** seçin ve tünele `OmniRoute-VM` adını verin.
4. Ekranda "Install and run a connector" başlıklı bir komut oluşturulacaktır. **Yalnızca Belirteci (`--token` sonrasındaki uzun dize) kopyalamanız yeterlidir**.
5. Sanal makinenize SSH ile bağlanın ve çalıştırın:
   ```bash
   # Tüneli başlatır ve kalıcı olarak hesabınıza bağlar
   cloudflared service install BURAYA_UZUN_TOKENINIZI_YAPISTIRIN
   ```

---

## 2. Yönlendirmeyi Yapılandırma (Public Hostnames)

Yeni oluşturulan Tunnel ekranında **Public Hostnames** sekmesine gidin ve yaptığımız ayrımdan yararlanarak **iki** rotayı ekleyin:

### Rota 1: Güvenli API (Kısıtlı)

- **Subdomain:** `api`
- **Domain:** `alanadiniz.com` (kendi gerçek alan adınızı seçin)
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20128` _(Dahili API portu)_

### Rota 2: Zero Trust Pano (Kapalı)

- **Subdomain:** `omniroute` veya `panel`
- **Domain:** `alanadiniz.com`
- **Service Type:** `HTTP`
- **URL:** `127.0.0.1:20129` _(Dahili Uygulama/Pano portu)_

---

## 3. Panoyu Zero Trust (Access) ile Güçlendirme

Hiçbir yerel şifre, panonuzu internete tamamen kapatmaktan daha iyi koruyamaz.

1. Zero Trust panosunda **Access > Applications > Add an application** seçeneğine gidin.
2. **Self-hosted** seçin.
3. **Application name** kısmına `OmniRoute Paneli` yazın.
4. **Application domain** kısmına `omniroute.alanadiniz.com` ("Rota 2"de belirlediğiniz adres) yazın.
5. **Next** butonuna tıklayın.
6. **Rule action** için `Allow` seçin. Kural adına `Yalnızca Yönetici` yazın.
7. **Include** altında "Selector" olarak `Emails` seçin ve e-posta adresinizi girin (örn. `admin@alanadiniz.com`).
8. Kaydedin (`Add application`).

> **Bu ne sağladı:** Artık `omniroute.alanadiniz.com` adresini açtığınızda doğrudan uygulamanıza düşmez! Cloudflare'in e-posta isteyen şık bir giriş ekranı çıkar. Yalnızca belirttiğiniz e-posta girildiğinde, gelen kutunuza `20129` portuna tüneli açan tek kullanımlık 6 haneli bir kod gönderilir.

---

## 4. API'yi Hız Sınırı (WAF) ile Korumak

Zero Trust Panosu API rotasına (`api.alanadiniz.com`) uygulanmaz; çünkü bu tarayıcısız, otomatik araçlar (ajanlar) aracılığıyla yapılan programatik bir erişimdir. Bunun için Cloudflare'in ana Güvenlik Duvarını (WAF) kullanacağız.

1. Cloudflare **Normal Panosuna** (dash.cloudflare.com) erişin ve Alan Adınıza girin.
2. Sol menüden **Security > WAF > Rate limiting rules** yolunu izleyin.
3. **Create rule** butonuna tıklayın.
4. **Name:** `OmniRoute API Kötüye Kullanım Önleme`
5. **If incoming requests match...**
   - Field: `Hostname`
   - Operator: `equals`
   - Value: `api.alanadiniz.com`
6. **With the same characteristics:** `IP` olarak bırakın.
7. Sınırlar (Limit):
   - **When requests exceed:** `50`
   - **Period:** `1 minute`
8. **Action:** `Block` seçin ve engelleme süresini belirleyin (1 dakika veya 1 saat).
9. **Deploy**.

> **Bu ne sağladı:** Hiç kimse API URL'nize 60 saniyelik bir süre içinde 50'den fazla istek gönderemez. Bu, trafiğin tünelden sunucunuza inmesine gerek kalmadan ağın kenarında (Edge Layer) sunucunuzu aşırı yükten korur.

---

## Özet

1. Sanal makinenizde güvenlik duvarında (`/etc/ufw`) **hiçbir açık gelen port bulunmaz**.
2. OmniRoute yalnızca giden HTTPS (`cloudflared`) trafiğiyle haberleşir ve dünyadan doğrudan TCP bağlantısı almaz.
3. Yönetim web panonuz e-posta tabanlı İki Faktörlü Doğrulama (2FA) ile korunur.
4. API'niz Cloudflare tarafından sınırlandırılmıştır ve yalnızca Bearer Token'lar kabul edilir.
