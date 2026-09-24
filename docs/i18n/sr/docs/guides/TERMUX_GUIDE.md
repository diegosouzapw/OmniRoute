# Termux Headless Setup (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute може да ради као сервер без графичког интерфејса на Android-у путем Termux-а. Electron десктоп апликација није подржана у Termux-у, али су веб-контролна табла и API компатибилан са OpenAI-јем доступни из локалног прегледача или са других уређаја на истој мрежи.

## Предуслови

Инсталирајте Termux са F-Droid-а или из GitHub издања, а затим ажурирајте пакете и инсталирајте алате за изградњу које захтевају изворне зависности као што је `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Верзија Node.js-а:** OmniRoute захтева Node `>=22.22.2 <23 || >=24.0.0 <27` (одговара пољу `engines` у `package.json` / `SUPPORTED_NODE_RANGE`). Termux-ов `nodejs-lts` обично испоручује Node 20 LTS, који **више није подржан** — уместо њега инсталирајте `pkg install nodejs` (актуелну верзију) и проверите да `node --version` пријављује верзију из гране 22.x/24.x или новије.

Ако компилација изворних пакета не успе, поново покрените горњу команду `pkg install`, а затим поновите инсталацију OmniRoute-а.

## Инсталација

Директно покрените најновији објављени пакет:

```bash
npx -y omniroute@latest
```

Можете га инсталирати и глобално:

```bash
npm install -g omniroute
omniroute
```

## Покретање

Покрените OmniRoute у режиму сервера без графичког интерфејса:

```bash
omniroute
```

или:

```bash
npx omniroute
```

Контролна табла је доступна на:

```text
http://localhost:20128
```

Отворите ту URL адресу у Android прегледачу. Ако клијенте покрећете унутар Termux-а, користите исти хост и порт као основну URL адресу компатибилну са OpenAI-јем.

## Извршавање у позадини

За једноставан процес у позадини:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Да бисте га зауставили:

```bash
pkill -f omniroute
```

За аутоматско покретање након укључивања уређаја, инсталирајте додатак Termux:Boot и направите скрипту за покретање:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android оптимизација потрошње батерије може да заустави дуготрајне позадинске процесе. Онемогућите оптимизацију батерије за Termux ако се очекује да сервер остане доступан.

## Приступ са других уређаја

Пронађите IP адресу телефона на WiFi мрежи:

```bash
ip addr show wlan0
```

Затим отворите контролну таблу са другог уређаја:

```text
http://PHONE_IP:20128
```

На пример:

```text
http://192.168.1.50:20128
```

Држите телефон и клијента на истој поузданој мрежи. Ако OmniRoute учините доступним ван телефона, омогућите API кључеве и потврду идентитета за контролну таблу.

## Директоријум података

OmniRoute подразумевано складишти податке у Termux-овом матичном директоријуму, пратећи исто понашање путање података на страни сервера које се користи на Linux-у. Да бисте базу података поставили на изричито наведену локацију:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ограничења

- Electron не ради у Termux-у.
- Не постоје системска трака нити интеграција са десктоп окружењем.
- Ово подешавање је намењено само серверу: користите контролну таблу у прегледачу.
- Изворне зависности можда ће морати да се компајлирају локално.
- На Android уређајима са мало меморије можда ће бити потребно смањити број истовремених захтева.
- MITM функције и функције системских сертификата могу захтевати рад са Android складиштем поузданих сертификата ван Termux-а.

## Решавање проблема

### Неподржана платформа: android (сваки захтев враћа HTTP 500)

**Симптом:** `omniroute` / `omniroute serve` приказује `✔ OmniRoute is running!`, али сваки захтев ка контролној табли или API-ју враћа само `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` остаје празан, `APP_LOG_LEVEL=debug` не приказује ништа корисно, а тело одговора је обичан текст (`Internal Server Error`) без детаља у JSON формату.

**Узрок:** Неке Termux/Node верзије пријављују `process.platform === "android"`. Next.js `getCacheDirectory()` не подржава ту платформу: захтева да `~/.cache` (или генерички привремени директоријум) _већ_ постоји, иначе долази до грешке приликом учитавања куке за инструментацију:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Пошто се кука никада не учита, евидентирање се не покреће — због тога грешка 500 делује као да ју је потпуно немогуће дијагностиковати. OmniRoute прави `~/.cache` (и поставља `XDG_CACHE_HOME` када није подешен) у CLI улазној тачки пре покретања Next.js-а, како би ова провера успела на Android-у/Termux-у.

**Подржано решење (без измене пакета):**

```bash
mkdir -p ~/.cache
omniroute serve
```

У актуелним OmniRoute верзијама CLI ово аутоматски обавља на Android-у/Termux-у — ново покретање преко `npx -y omniroute@latest` / глобална инсталација не би требало да захтева ручни корак. Ако и након надоградње и даље видите ову грешку, једном направите `~/.cache` као што је приказано изнад и поново покрените програм.

**Немојте** мењати `dist/server.js` да бисте принудно поставили `process.platform = "linux"`. Таква измена пакета се замењује при свакој поновној инсталацији/надоградњи и непотребна је када директоријум кеша постоји.

### Грешке при изградњи пакета better-sqlite3

Инсталирајте Termux скуп алата за изградњу:

```bash
pkg install nodejs python build-essential
```

Затим поново покрените:

```bash
npx -y omniroute@latest
```

### Порт је већ у употреби

Проверите шта ослушкује подразумевани порт:

```bash
ss -ltnp | grep 20128
```

Зауставите стари процес:

```bash
pkill -f omniroute
```

### Контролна табла није доступна са другог уређаја

Проверите да ли су оба уређаја на истој WiFi мрежи, а затим тестирајте из Termux-а:

```bash
curl http://localhost:20128
```

Ако локални приступ ради, али приступ преко LAN-а не ради, проверите изолацију Android приступне тачке/WiFi мреже и све профиле заштитног зида или VPN-а на телефону.
