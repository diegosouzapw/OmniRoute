# Termux Headless Setup (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute може працювати як безголовий сервер на Android через Termux. Десктопний застосунок Electron не підтримується в Termux, але вебпанель керування та API, сумісний з OpenAI, доступні з локального браузера або з інших пристроїв у тій самій мережі.

## Передумови

Установіть Termux із F-Droid або випусків на GitHub, потім оновіть пакети та встановіть інструменти збірки, потрібні для нативних залежностей, як-от `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Версія Node.js:** OmniRoute потребує Node `>=22.22.2 <23 || >=24.0.0 <27` (відповідає `engines` у `package.json` / `SUPPORTED_NODE_RANGE`). Пакет `nodejs-lts` у Termux зазвичай містить Node 20 LTS, який **більше не підтримується** — натомість виконайте `pkg install nodejs` для встановлення поточної версії та переконайтеся, що `node --version` показує версію з гілки 22.x/24.x або новішу.

Якщо компіляція нативного пакета завершується помилкою, повторно виконайте наведену вище команду `pkg install`, а потім ще раз спробуйте встановити OmniRoute.

## Установлення

Запустіть останню опубліковану версію пакета безпосередньо:

```bash
npx -y omniroute@latest
```

Також його можна встановити глобально:

```bash
npm install -g omniroute
omniroute
```

## Запуск

Запустіть OmniRoute у режимі безголового сервера:

```bash
omniroute
```

або:

```bash
npx omniroute
```

Панель керування доступна за адресою:

```text
http://localhost:20128
```

Відкрийте цю URL-адресу в браузері Android. Якщо ви запускаєте клієнти всередині Termux, використовуйте ті самі хост і порт як базову URL-адресу, сумісну з OpenAI.

## Фонове виконання

Для простого фонового процесу:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Щоб зупинити його:

```bash
pkill -f omniroute
```

Для автоматичного запуску після завантаження пристрою встановіть доповнення Termux:Boot і створіть сценарій завантаження:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Оптимізація використання акумулятора Android може зупиняти тривалі фонові процеси. Вимкніть оптимізацію використання акумулятора для Termux, якщо сервер має залишатися доступним.

## Доступ з інших пристроїв

Знайдіть IP-адресу телефона в мережі WiFi:

```bash
ip addr show wlan0
```

Потім відкрийте панель керування з іншого пристрою:

```text
http://PHONE_IP:20128
```

Наприклад:

```text
http://192.168.1.50:20128
```

Телефон і клієнт мають перебувати в одній довіреній мережі. Якщо ви надаєте доступ до OmniRoute ззовні телефона, увімкніть ключі API та автентифікацію панелі керування.

## Каталог даних

За замовчуванням OmniRoute зберігає дані в домашньому каталозі Termux, дотримуючись тієї самої серверної поведінки щодо шляхів до даних, що й у Linux. Щоб розмістити базу даних у явно визначеному місці:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Обмеження

- Electron не працює в Termux.
- Системний лоток та інтеграція з робочим столом відсутні.
- Це налаштування призначене лише для сервера: використовуйте браузерну панель керування.
- Нативні залежності можуть потребувати локальної компіляції.
- На пристроях Android із малим обсягом пам’яті може знадобитися зменшити кількість одночасних запитів.
- Функції MITM/системних сертифікатів можуть потребувати роботи зі сховищем довіри на рівні Android поза Termux.

## Усунення несправностей

### Непідтримувана платформа: android (кожен запит повертає HTTP 500)

**Ознака:** `omniroute` / `omniroute serve` виводить `✔ OmniRoute is running!`, але кожен запит до панелі керування або API повертає порожню помилку `500 Internal Server Error`. Файл `~/.omniroute/logs/application/app.log` залишається порожнім, `APP_LOG_LEVEL=debug` не виводить нічого корисного, а тіло відповіді містить звичайний текст (`Internal Server Error`) без подробиць у форматі JSON.

**Причина:** Деякі збірки Termux/Node повідомляють `process.platform === "android"`. Функція Next.js `getCacheDirectory()` не обробляє цю платформу: вона вимагає, щоб `~/.cache` (або загальний тимчасовий каталог) _уже_ існував, інакше під час завантаження перехоплювача інструментування виникає помилка:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Оскільки перехоплювач не завантажується, журналювання не запускається — помилка 500 здається цілковито недіагностованою. OmniRoute створює `~/.cache` (і встановлює `XDG_CACHE_HOME`, якщо значення не задано) у точці входу CLI до запуску Next.js, щоб ця перевірка успішно проходила на Android/Termux.

**Підтримуване вирішення (без внесення змін до пакета):**

```bash
mkdir -p ~/.cache
omniroute serve
```

У поточних збірках OmniRoute CLI виконує це автоматично на Android/Termux — після нового запуску `npx -y omniroute@latest` або глобального встановлення ручний крок не повинен знадобитися. Якщо після оновлення помилка все ще виникає, один раз створіть `~/.cache`, як показано вище, і перезапустіть застосунок.

**Не вносьте** зміни до `dist/server.js`, щоб примусово встановити `process.platform = "linux"`. Такі зміни пакета перезаписуються під час кожного повторного встановлення або оновлення й не потрібні, якщо каталог кешу існує.

### Помилки збірки better-sqlite3

Установіть набір інструментів збірки Termux:

```bash
pkg install nodejs python build-essential
```

Потім повторно виконайте:

```bash
npx -y omniroute@latest
```

### Порт уже використовується

Перевірте, який процес прослуховує стандартний порт:

```bash
ss -ltnp | grep 20128
```

Зупиніть старий процес:

```bash
pkill -f omniroute
```

### Панель керування недоступна з іншого пристрою

Переконайтеся, що обидва пристрої перебувають в одній мережі WiFi, а потім виконайте перевірку з Termux:

```bash
curl http://localhost:20128
```

Якщо локальний доступ працює, а доступ із локальної мережі — ні, перевірте ізоляцію точки доступу/WiFi в Android, а також усі профілі брандмауера або VPN на телефоні.
