# Termux Headless Setup (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute, Termux aracılığıyla Android üzerinde başsız bir sunucu olarak çalışabilir. Electron masaüstü uygulaması Termux'ta desteklenmez, ancak web panosu ve OpenAI uyumlu API'ye yerel tarayıcıdan veya aynı ağdaki diğer cihazlardan erişilebilir.

## Ön Koşullar

Termux'u F-Droid veya GitHub sürümlerinden yükleyin, ardından paketleri güncelleyin ve `better-sqlite3` gibi yerel bağımlılıkların gerektirdiği derleme araçlarını yükleyin.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js sürümü:** OmniRoute, Node `>=22.22.2 <23 || >=24.0.0 <27` gerektirir (`package.json` içindeki `engines` / `SUPPORTED_NODE_RANGE` ile eşleşir). Termux'un `nodejs-lts` paketi genellikle artık **desteklenmeyen** Node 20 LTS sürümünü içerir — bunun yerine `pkg install nodejs` (güncel) komutuyla yükleyin ve `node --version` çıktısının 22.x/24.x+ serisini gösterdiğini doğrulayın.

Yerel paket derlemesi başarısız olursa yukarıdaki `pkg install` komutunu yeniden çalıştırın ve ardından OmniRoute kurulumunu tekrar deneyin.

## Kurulum

En son yayımlanan paketi doğrudan çalıştırın:

```bash
npx -y omniroute@latest
```

Paketi global olarak da yükleyebilirsiniz:

```bash
npm install -g omniroute
omniroute
```

## Çalıştırma

OmniRoute'u başsız sunucu modunda başlatın:

```bash
omniroute
```

veya:

```bash
npx omniroute
```

Pano şu adreste dinleme yapar:

```text
http://localhost:20128
```

Bu URL'yi Android tarayıcısında açın. İstemcileri Termux içinde çalıştırıyorsanız OpenAI uyumlu temel URL olarak aynı ana makineyi ve bağlantı noktasını kullanın.

## Arka Planda Çalıştırma

Basit bir arka plan işlemi için:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Durdurmak için:

```bash
pkill -f omniroute
```

Cihaz yeniden başlatıldıktan sonra otomatik olarak çalıştırmak için Termux:Boot eklentisini yükleyin ve bir önyükleme betiği oluşturun:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android'in pil optimizasyonu, uzun süre çalışan arka plan işlemlerini durdurabilir. Sunucunun sürekli çevrimiçi kalması bekleniyorsa Termux için pil optimizasyonunu devre dışı bırakın.

## Diğer Cihazlardan Erişim

Telefonun WiFi ağındaki IP adresini bulun:

```bash
ip addr show wlan0
```

Ardından panoyu başka bir cihazdan açın:

```text
http://PHONE_IP:20128
```

Örneğin:

```text
http://192.168.1.50:20128
```

Telefonu ve istemciyi aynı güvenilir ağda tutun. OmniRoute'u telefonun dışına açarsanız API anahtarlarını ve pano kimlik doğrulamasını etkinleştirin.

## Veri Dizini

OmniRoute varsayılan olarak verileri, Linux'ta kullanılan sunucu tarafı veri yolu davranışını izleyerek Termux ana dizini altında depolar. Veritabanını açıkça belirtilen bir konuma yerleştirmek için:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Sınırlamalar

- Electron, Termux'ta çalışmaz.
- Sistem tepsisi veya masaüstü entegrasyonu yoktur.
- Bu kurulum yalnızca sunucu içindir: tarayıcı panosunu kullanın.
- Yerel bağımlılıkların yerel olarak derlenmesi gerekebilir.
- Belleği düşük Android cihazlarda daha az eşzamanlı istek kullanılması gerekebilir.
- MITM/sistem sertifikası özellikleri, Termux dışında Android düzeyinde güven deposu yapılandırması gerektirebilir.

## Sorun Giderme

### Desteklenmeyen platform: android (her istek HTTP 500 döndürüyor)

**Belirti:** `omniroute` / `omniroute serve`, `✔ OmniRoute is running!` çıktısını verir, ancak her pano veya API isteği yalnızca `500 Internal Server Error` döndürür. `~/.omniroute/logs/application/app.log` boş kalır, `APP_LOG_LEVEL=debug` yararlı bir çıktı vermez ve yanıt gövdesi JSON ayrıntısı olmadan düz metindir (`Internal Server Error`).

**Neden:** Bazı Termux/Node derlemeleri `process.platform === "android"` olarak bildirir. Next.js `getCacheDirectory()` bu platformu işlemez: `~/.cache` dizininin (veya genel bir geçici dizinin) _önceden_ var olmasını gerektirir; aksi takdirde enstrümantasyon kancasını yüklerken şu hatayla başarısız olur:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Kanca hiçbir zaman yüklenmediği için günlük kaydı başlamaz — bu da 500 hatasının nedenini belirlemeyi tamamen imkânsızmış gibi gösterir. OmniRoute, bu denetimin Android/Termux üzerinde başarılı olması için Next.js başlamadan önce CLI giriş noktasında `~/.cache` dizinini oluşturur (ve ayarlanmamışsa `XDG_CACHE_HOME` değişkenini ayarlar).

**Desteklenen çözüm (pakete yama uygulamadan):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Güncel OmniRoute derlemelerinde CLI bunu Android/Termux üzerinde otomatik olarak yapar — yeni bir `npx -y omniroute@latest` / global kurulum, manuel adımı gerektirmemelidir. Yükseltmeden sonra hatayı hâlâ görüyorsanız yukarıdaki gibi `~/.cache` dizinini bir kez oluşturun ve yeniden başlatın.

`process.platform = "linux"` kullanımını zorlamak için `dist/server.js` dosyasına **yama uygulamayın**. Bu tür bir paket yaması her yeniden kurulumda/yükseltmede üzerine yazılır ve önbellek dizini mevcut olduğunda gereksizdir.

### better-sqlite3 Derleme Hataları

Termux derleme araç zincirini yükleyin:

```bash
pkg install nodejs python build-essential
```

Ardından yeniden çalıştırın:

```bash
npx -y omniroute@latest
```

### Bağlantı Noktası Zaten Kullanımda

Varsayılan bağlantı noktasında neyin dinleme yaptığını kontrol edin:

```bash
ss -ltnp | grep 20128
```

Eski işlemi durdurun:

```bash
pkill -f omniroute
```

### Panoya Başka Bir Cihazdan Erişilemiyor

Her iki cihazın da aynı WiFi ağında olduğunu doğrulayın, ardından Termux'tan test edin:

```bash
curl http://localhost:20128
```

Yerel erişim çalışıyor ancak LAN erişimi çalışmıyorsa Android erişim noktası/WiFi yalıtımını ve telefondaki güvenlik duvarı veya VPN profillerini kontrol edin.
