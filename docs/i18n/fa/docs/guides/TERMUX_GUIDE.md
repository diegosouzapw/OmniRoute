# Termux Headless Setup (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute میتواند از طریق Termux بهعنوان یک سرور بدون رابط گرافیکی روی Android اجرا شود. برنامه دسکتاپ Electron در Termux پشتیبانی نمیشود، اما داشبورد وب و API سازگار با OpenAI از طریق مرورگر محلی یا دستگاههای دیگر در همان شبکه قابل استفاده هستند.

## پیشنیازها

Termux را از F-Droid یا نسخههای منتشرشده در GitHub نصب کنید، سپس بستهها را بهروزرسانی کرده و ابزارهای ساخت موردنیاز وابستگیهای بومی مانند `better-sqlite3` را نصب کنید.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **نسخه Node.js:** OmniRoute به Node `>=22.22.2 <23 || >=24.0.0 <27` نیاز دارد (مطابق با `engines` در `package.json` / `SUPPORTED_NODE_RANGE`). بسته `nodejs-lts` در Termux معمولاً Node 20 LTS را ارائه میکند که **دیگر پشتیبانی نمیشود** — بهجای آن `pkg install nodejs` (نسخه جاری) را نصب کنید و با اجرای `node --version` مطمئن شوید نسخهای از شاخه 22.x/24.x+ گزارش میشود.

اگر کامپایل بستههای بومی ناموفق بود، فرمان `pkg install` بالا را دوباره اجرا کنید و سپس نصب OmniRoute را مجدداً امتحان کنید.

## نصب

آخرین بسته منتشرشده را مستقیماً اجرا کنید:

```bash
npx -y omniroute@latest
```

همچنین میتوانید آن را بهصورت سراسری نصب کنید:

```bash
npm install -g omniroute
omniroute
```

## اجرا

OmniRoute را در حالت سرور بدون رابط گرافیکی اجرا کنید:

```bash
omniroute
```

یا:

```bash
npx omniroute
```

داشبورد روی آدرس زیر در دسترس است:

```text
http://localhost:20128
```

این URL را در مرورگر Android باز کنید. اگر کلاینتها را داخل Termux اجرا میکنید، از همان میزبان و پورت بهعنوان URL پایه سازگار با OpenAI استفاده کنید.

## اجرای پسزمینه

برای اجرای یک فرایند ساده در پسزمینه:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

برای متوقف کردن آن:

```bash
pkill -f omniroute
```

برای راهاندازی خودکار پس از روشن شدن دستگاه، افزونه Termux:Boot را نصب کرده و یک اسکریپت راهاندازی ایجاد کنید:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

بهینهسازی باتری Android میتواند فرایندهای پسزمینه طولانیمدت را متوقف کند. اگر انتظار دارید سرور آنلاین بماند، بهینهسازی باتری را برای Termux غیرفعال کنید.

## دسترسی از دستگاههای دیگر

آدرس IP تلفن را در شبکه WiFi پیدا کنید:

```bash
ip addr show wlan0
```

سپس داشبورد را از دستگاه دیگری باز کنید:

```text
http://PHONE_IP:20128
```

برای مثال:

```text
http://192.168.1.50:20128
```

تلفن و کلاینت را در یک شبکه مورداعتماد نگه دارید. اگر OmniRoute را خارج از تلفن در دسترس قرار میدهید، کلیدهای API و احراز هویت داشبورد را فعال کنید.

## دایرکتوری دادهها

OmniRoute بهطور پیشفرض دادهها را در دایرکتوری خانگی Termux ذخیره میکند و از همان رفتار مسیر داده سمت سرور در Linux پیروی میکند. برای قرار دادن پایگاه داده در مسیری مشخص:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## محدودیتها

- Electron در Termux اجرا نمیشود.
- سینی سیستم یا یکپارچهسازی با دسکتاپ وجود ندارد.
- این پیکربندی فقط برای سرور است: از داشبورد مرورگر استفاده کنید.
- وابستگیهای بومی ممکن است به کامپایل محلی نیاز داشته باشند.
- در دستگاههای Android با حافظه کم ممکن است لازم باشد تعداد درخواستهای همزمان را کاهش دهید.
- قابلیتهای گواهی MITM/سیستم ممکن است به پیکربندی مخزن اعتماد در سطح Android و خارج از Termux نیاز داشته باشند.

## عیبیابی

### پلتفرم پشتیبانینشده: android (تمام درخواستها HTTP 500 برمیگردانند)

**نشانه:** اجرای `omniroute` / `omniroute serve` پیام `✔ OmniRoute is running!` را نمایش میدهد، اما هر درخواست داشبورد یا API یک پاسخ خام `500 Internal Server Error` برمیگرداند. فایل `~/.omniroute/logs/application/app.log` خالی میماند، اجرای `APP_LOG_LEVEL=debug` اطلاعات مفیدی نمایش نمیدهد و بدنه پاسخ متنی ساده (`Internal Server Error`) و بدون جزئیات JSON است.

**علت:** برخی بیلدهای Termux/Node مقدار `process.platform === "android"` را گزارش میکنند. تابع `getCacheDirectory()` در Next.js از این پلتفرم پشتیبانی نمیکند: این تابع به وجود قبلی `~/.cache` (یا یک دایرکتوری موقت عمومی) نیاز دارد؛ در غیر این صورت، هنگام بارگذاری قلاب ابزارسازی با خطای زیر مواجه میشود:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

از آنجا که قلاب هرگز بارگذاری نمیشود، ثبت گزارش نیز آغاز نمیشود — در نتیجه علت خطای 500 کاملاً غیرقابلتشخیص به نظر میرسد. OmniRoute پیش از شروع Next.js در نقطه ورود CLI، دایرکتوری `~/.cache` را ایجاد میکند (و اگر `XDG_CACHE_HOME` تنظیم نشده باشد، آن را تنظیم میکند) تا این بررسی در Android/Termux موفق شود.

**راهحل پشتیبانیشده (بدون وصلهکردن بسته):**

```bash
mkdir -p ~/.cache
omniroute serve
```

در بیلدهای فعلی OmniRoute، رابط CLI این کار را بهطور خودکار در Android/Termux انجام میدهد — پس از اجرای تازه `npx -y omniroute@latest` / نصب سراسری، نباید به انجام دستی این مرحله نیاز باشد. اگر پس از ارتقا همچنان این خطا را مشاهده میکنید، یکبار `~/.cache` را مطابق بالا ایجاد کرده و برنامه را مجدداً راهاندازی کنید.

برای اجبار مقدار `process.platform = "linux"`، فایل `dist/server.js` را وصله **نکنید**. چنین وصلهای با هر نصب مجدد/ارتقا بازنویسی میشود و پس از ایجاد دایرکتوری کش، غیرضروری است.

### خطاهای ساخت better-sqlite3

زنجیرهابزار ساخت Termux را نصب کنید:

```bash
pkg install nodejs python build-essential
```

سپس دوباره اجرا کنید:

```bash
npx -y omniroute@latest
```

### پورت از قبل در حال استفاده است

بررسی کنید چه چیزی روی پورت پیشفرض در حال گوشدادن است:

```bash
ss -ltnp | grep 20128
```

فرایند قدیمی را متوقف کنید:

```bash
pkill -f omniroute
```

### داشبورد از دستگاه دیگری قابل دسترسی نیست

مطمئن شوید هر دو دستگاه به یک شبکه WiFi متصل هستند، سپس از داخل Termux آزمایش کنید:

```bash
curl http://localhost:20128
```

اگر دسترسی محلی کار میکند اما دسترسی LAN برقرار نیست، جداسازی دستگاهها در hotspot/WiFi و هرگونه نمایه فایروال یا VPN روی تلفن را بررسی کنید.
