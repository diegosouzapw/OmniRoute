# Termux Headless Setup (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute Termux vasitəsilə Android-də başlıqsız server kimi işləyə bilər. Electron masaüstü tətbiqi Termux-da dəstəklənmir, lakin veb idarəetmə paneli və OpenAI ilə uyğun API lokal brauzerdən və ya eyni şəbəkədəki digər cihazlardan işləyir.

## İlkin tələblər

Termux-u F-Droid-dən və ya GitHub buraxılışlarından quraşdırın, sonra paketləri yeniləyin və `better-sqlite3` kimi yerli asılılıqlar üçün tələb olunan qurma alətlərini quraşdırın.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js versiyası:** OmniRoute üçün Node `>=22.22.2 <23 || >=24.0.0 <27` tələb olunur (`package.json` faylındakı `engines` / `SUPPORTED_NODE_RANGE` ilə uyğun gəlir). Termux-un `nodejs-lts` paketi adətən Node 20 LTS versiyasını təqdim edir və bu versiya **artıq dəstəklənmir** — əvəzinə `pkg install nodejs` (cari versiya) quraşdırın və `node --version` əmrinin 22.x/24.x+ xəttinə aid versiya göstərdiyini yoxlayın.

Yerli paketlərin kompilyasiyası uğursuz olarsa, yuxarıdakı `pkg install` əmrini yenidən icra edin və sonra OmniRoute quraşdırmasını təkrar sınayın.

## Quraşdırma

Ən son yayımlanmış paketi birbaşa işə salın:

```bash
npx -y omniroute@latest
```

Onu qlobal şəkildə də quraşdıra bilərsiniz:

```bash
npm install -g omniroute
omniroute
```

## İşə salma

OmniRoute-u başlıqsız server rejimində başladın:

```bash
omniroute
```

və ya:

```bash
npx omniroute
```

İdarəetmə paneli aşağıdakı ünvanda dinləyir:

```text
http://localhost:20128
```

Bu URL-ni Android brauzerində açın. Klientləri Termux daxilində işlədirsinizsə, OpenAI ilə uyğun baza URL-si kimi eyni host və portdan istifadə edin.

## Arxa planda icra

Sadə arxa plan prosesi üçün:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Onu dayandırmaq üçün:

```bash
pkill -f omniroute
```

Cihaz işə salındıqdan sonra avtomatik başlatma üçün Termux:Boot əlavəsini quraşdırın və yüklənmə skripti yaradın:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android-in batareya optimallaşdırması uzun müddət işləyən arxa plan proseslərini dayandıra bilər. Serverin daim əlçatan qalması gözlənilirsə, Termux üçün batareya optimallaşdırmasını deaktiv edin.

## Digər cihazlardan giriş

WiFi şəbəkəsində telefonun IP ünvanını tapın:

```bash
ip addr show wlan0
```

Sonra idarəetmə panelini başqa cihazdan açın:

```text
http://PHONE_IP:20128
```

Məsələn:

```text
http://192.168.1.50:20128
```

Telefonu və klienti eyni etibarlı şəbəkədə saxlayın. OmniRoute-u telefondan kənara açırsınızsa, API açarlarını və idarəetmə paneli autentifikasiyasını aktivləşdirin.

## Məlumat kataloqu

Standart olaraq OmniRoute məlumatları Linux-da istifadə edilən eyni server tərəfli məlumat yolu davranışına uyğun şəkildə Termux-un ev kataloqunda saxlayır. Verilənlər bazasını konkret bir yerdə saxlamaq üçün:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Məhdudiyyətlər

- Electron Termux-da işləmir.
- Sistem treyi və ya masaüstü inteqrasiyası yoxdur.
- Bu quraşdırma yalnız server üçündür: brauzer idarəetmə panelindən istifadə edin.
- Yerli asılılıqların lokal kompilyasiyası tələb oluna bilər.
- Yaddaşı az olan Android cihazlarında paralel sorğuların sayını azaltmaq lazım gələ bilər.
- MITM/sistem sertifikatı funksiyaları Termux xaricində Android səviyyəsində etibar anbarı ilə bağlı işlər tələb edə bilər.

## Nasazlıqların aradan qaldırılması

### Dəstəklənməyən platforma: android (hər sorğu HTTP 500 qaytarır)

**Əlamət:** `omniroute` / `omniroute serve` əmri `✔ OmniRoute işləyir!` mesajını göstərir, lakin idarəetmə panelinə və ya API-yə edilən hər sorğu sadə `500 Internal Server Error` xətası qaytarır. `~/.omniroute/logs/application/app.log` boş qalır, `APP_LOG_LEVEL=debug` faydalı heç nə göstərmir və cavab gövdəsi heç bir JSON təfərrüatı olmadan adi mətndir (`Internal Server Error`).

**Səbəb:** Bəzi Termux/Node quruluşları `process.platform === "android"` nəticəsini verir. Next.js `getCacheDirectory()` bu platformanı emal etmir: `~/.cache` kataloqunun (və ya ümumi müvəqqəti kataloqun) _əvvəlcədən_ mövcud olmasını tələb edir, əks halda aşağıdakı xəta ilə instrumentasiya qarmağını yükləyərkən uğursuz olur:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Qarmaq heç vaxt yüklənmədiyi üçün jurnallaşdırma da başlamır — 500 xətasının səbəbini müəyyən etmək tamamilə mümkünsüz görünür. OmniRoute, bu yoxlamanın Android/Termux-da uğurla keçməsi üçün Next.js başlamazdan əvvəl CLI giriş nöqtəsində `~/.cache` yaradır (və təyin edilməyibsə, `XDG_CACHE_HOME` dəyişənini təyin edir).

**Dəstəklənən həll (paketə düzəliş etmədən):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Cari OmniRoute quruluşlarında CLI bunu Android/Termux-da avtomatik edir — yeni `npx -y omniroute@latest` / qlobal quraşdırma əl ilə bu addımın yerinə yetirilməsini tələb etməməlidir. Yeniləmədən sonra da xətanı görürsünüzsə, yuxarıda göstərildiyi kimi `~/.cache` kataloqunu bir dəfə yaradın və yenidən başladın.

`process.platform = "linux"` dəyərini məcburi təyin etmək üçün `dist/server.js` faylına düzəliş **etməyin**. Bu cür paket düzəlişi hər təkrar quraşdırma/yeniləmə zamanı üzərinə yazılır və keş kataloqu mövcud olduqda buna ehtiyac yoxdur.

### better-sqlite3 qurma xətaları

Termux qurma alətləri zəncirini quraşdırın:

```bash
pkg install nodejs python build-essential
```

Sonra yenidən icra edin:

```bash
npx -y omniroute@latest
```

### Port artıq istifadə olunur

Standart portu hansı prosesin dinlədiyini yoxlayın:

```bash
ss -ltnp | grep 20128
```

Köhnə prosesi dayandırın:

```bash
pkill -f omniroute
```

### İdarəetmə panelinə başqa cihazdan giriş mümkün deyil

Hər iki cihazın eyni WiFi şəbəkəsində olduğunu yoxlayın, sonra Termux-dan sınaqdan keçirin:

```bash
curl http://localhost:20128
```

Lokal giriş işləyirsə, lakin LAN üzərindən giriş işləmirsə, Android hotspot/WiFi izolyasiyasını və telefondakı hər hansı təhlükəsizlik divarı və ya VPN profilini yoxlayın.
