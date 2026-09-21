# Termux Headless Setup (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute може да работи като headless сървър на Android чрез Termux. Десктоп приложението Electron не се поддържа в Termux, но уеб таблото и съвместимият с OpenAI API работят от локалния браузър или от други устройства в същата мрежа.

## Предварителни изисквания

Инсталирайте Termux от F-Droid или GitHub Releases, след което актуализирайте пакетите и инсталирайте инструментите за компилиране, необходими за нативни зависимости като `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Версия на Node.js:** OmniRoute изисква Node `>=22.22.2 <23 || >=24.0.0 <27` (съответства на `engines` в `package.json` / `SUPPORTED_NODE_RANGE`). `nodejs-lts` на Termux обикновено предоставя Node 20 LTS, който **вече не се поддържа** — вместо него инсталирайте `pkg install nodejs` (текущата версия) и проверете дали `node --version` показва версия от линията 22.x/24.x+.

Ако компилирането на нативните пакети е неуспешно, изпълнете отново командата `pkg install` по-горе и след това опитайте пак да инсталирате OmniRoute.

## Инсталиране

Стартирайте директно най-новия публикуван пакет:

```bash
npx -y omniroute@latest
```

Можете също да го инсталирате глобално:

```bash
npm install -g omniroute
omniroute
```

## Стартиране

Стартирайте OmniRoute в режим на headless сървър:

```bash
omniroute
```

или:

```bash
npx omniroute
```

Таблото е достъпно на:

```text
http://localhost:20128
```

Отворете този URL в браузъра на Android. Ако стартирате клиенти в Termux, използвайте същия хост и порт като базов URL за съвместимия с OpenAI API.

## Изпълнение във фонов режим

За обикновен фонов процес:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

За да го спрете:

```bash
pkill -f omniroute
```

За автоматично стартиране след зареждане на устройството инсталирайте добавката Termux:Boot и създайте скрипт за стартиране:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Оптимизацията на батерията в Android може да спира дълго работещи фонови процеси. Деактивирайте оптимизацията на батерията за Termux, ако се очаква сървърът да остане достъпен.

## Достъп от други устройства

Намерете IP адреса на телефона в WiFi мрежата:

```bash
ip addr show wlan0
```

След това отворете таблото от друго устройство:

```text
http://PHONE_IP:20128
```

Например:

```text
http://192.168.1.50:20128
```

Телефонът и клиентът трябва да бъдат в една и съща доверена мрежа. Ако осигурите достъп до OmniRoute извън телефона, активирайте API ключове и удостоверяване за таблото.

## Директория за данни

По подразбиране OmniRoute съхранява данните в домашната директория на Termux, следвайки същото поведение за пътя до сървърните данни, което се използва в Linux. За да поставите базата данни в конкретно местоположение:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ограничения

- Electron не работи в Termux.
- Няма системна област за известия или интеграция с работния плот.
- Тази конфигурация е само за сървър: използвайте таблото в браузъра.
- Нативните зависимости може да изискват локално компилиране.
- При устройства с Android и малко памет може да се наложи да използвате по-малко едновременни заявки.
- Функциите за MITM/системни сертификати може да изискват работа с хранилището за доверени сертификати на ниво Android извън Termux.

## Отстраняване на неизправности

### Неподдържана платформа: android (всяка заявка връща HTTP 500)

**Симптом:** `omniroute` / `omniroute serve` извежда `✔ OmniRoute is running!`, но всяка заявка към таблото или API връща само `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` остава празен, `APP_LOG_LEVEL=debug` не извежда нищо полезно, а тялото на отговора е обикновен текст (`Internal Server Error`) без подробности във формат JSON.

**Причина:** Някои компилации на Termux/Node отчитат `process.platform === "android"`. `getCacheDirectory()` на Next.js не обработва тази платформа: изисква `~/.cache` (или обща временна директория) _вече_ да съществува, в противен случай зареждането на instrumentation hook завършва неуспешно със:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Тъй като hook-ът никога не се зарежда, регистрирането в журнал също не стартира — грешката 500 изглежда напълно неподдаваща се на диагностика. OmniRoute създава `~/.cache` (и задава `XDG_CACHE_HOME`, когато не е зададена) във входната точка на CLI, преди Next.js да стартира, така че тази проверка да е успешна в Android/Termux.

**Поддържано решение (без модифициране на пакета):**

```bash
mkdir -p ~/.cache
omniroute serve
```

В текущите компилации на OmniRoute CLI извършва това автоматично в Android/Termux — ново изпълнение на `npx -y omniroute@latest` / глобална инсталация не би трябвало да изисква ръчната стъпка. Ако след надстройване все още виждате грешката, създайте еднократно `~/.cache`, както е показано по-горе, и рестартирайте.

**Не** модифицирайте `dist/server.js`, за да зададете принудително `process.platform = "linux"`. Подобна промяна в пакета се презаписва при всяко преинсталиране/надстройване и е ненужна, след като директорията за кеша съществува.

### Грешки при компилиране на better-sqlite3

Инсталирайте инструментите за компилиране на Termux:

```bash
pkg install nodejs python build-essential
```

След това изпълнете отново:

```bash
npx -y omniroute@latest
```

### Портът вече се използва

Проверете кой процес слуша на порта по подразбиране:

```bash
ss -ltnp | grep 20128
```

Спрете стария процес:

```bash
pkill -f omniroute
```

### Таблото не е достъпно от друго устройство

Уверете се, че и двете устройства са в една и съща WiFi мрежа, след което тествайте от Termux:

```bash
curl http://localhost:20128
```

Ако локалният достъп работи, но достъпът през LAN не работи, проверете изолацията на Android hotspot/WiFi и всички профили за защитна стена или VPN на телефона.
