# Termux Headless Setup (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute может работать на Android через Termux в режиме headless-сервера. Десктопное приложение Electron не поддерживается в Termux, однако веб-панель и API, совместимый с OpenAI, доступны из локального браузера или с других устройств в той же сети.

## Предварительные требования

Установите Termux из F-Droid или релизов на GitHub, затем обновите пакеты и установите инструменты сборки, необходимые для нативных зависимостей, таких как `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Версия Node.js:** для OmniRoute требуется Node `>=22.22.2 <23 || >=24.0.0 <27` (соответствует `engines` в `package.json` / `SUPPORTED_NODE_RANGE`). Пакет `nodejs-lts` в Termux обычно содержит Node 20 LTS, который **больше не поддерживается** — вместо него установите `pkg install nodejs` (текущую версию) и убедитесь, что `node --version` сообщает о версии из ветки 22.x/24.x или новее.

Если компиляция нативного пакета завершится ошибкой, повторно выполните приведённую выше команду `pkg install`, а затем снова попробуйте установить OmniRoute.

## Установка

Запустите последнюю опубликованную версию пакета напрямую:

```bash
npx -y omniroute@latest
```

Также можно установить его глобально:

```bash
npm install -g omniroute
omniroute
```

## Запуск

Запустите OmniRoute в режиме headless-сервера:

```bash
omniroute
```

или:

```bash
npx omniroute
```

Панель управления доступна по адресу:

```text
http://localhost:20128
```

Откройте этот URL в браузере Android. Если вы запускаете клиенты внутри Termux, используйте те же хост и порт в качестве базового URL API, совместимого с OpenAI.

## Фоновое выполнение

Для простого запуска процесса в фоновом режиме:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Чтобы остановить его:

```bash
pkill -f omniroute
```

Для автоматического запуска после загрузки устройства установите дополнение Termux:Boot и создайте загрузочный скрипт:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Оптимизация расхода батареи Android может останавливать длительно работающие фоновые процессы. Если сервер должен постоянно оставаться доступным, отключите оптимизацию батареи для Termux.

## Доступ с других устройств

Найдите IP-адрес телефона в сети WiFi:

```bash
ip addr show wlan0
```

Затем откройте панель управления с другого устройства:

```text
http://PHONE_IP:20128
```

Например:

```text
http://192.168.1.50:20128
```

Телефон и клиент должны находиться в одной доверенной сети. Если вы открываете доступ к OmniRoute за пределами телефона, включите ключи API и аутентификацию для панели управления.

## Каталог данных

По умолчанию OmniRoute хранит данные в домашнем каталоге Termux, используя тот же принцип определения пути к серверным данным, что и в Linux. Чтобы явно указать расположение базы данных:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ограничения

- Electron не работает в Termux.
- Системный трей и интеграция с рабочим столом отсутствуют.
- Эта конфигурация предназначена только для сервера: используйте панель управления в браузере.
- Для нативных зависимостей может потребоваться локальная компиляция.
- На Android-устройствах с малым объёмом памяти может потребоваться уменьшить количество одновременных запросов.
- Для функций MITM и системных сертификатов может потребоваться настройка хранилища доверенных сертификатов на уровне Android за пределами Termux.

## Устранение неполадок

### Неподдерживаемая платформа: android (каждый запрос возвращает HTTP 500)

**Симптом:** `omniroute` / `omniroute serve` выводит `✔ OmniRoute is running!`, но каждый запрос к панели управления или API возвращает простой ответ `500 Internal Server Error`. Файл `~/.omniroute/logs/application/app.log` остаётся пустым, `APP_LOG_LEVEL=debug` не выводит ничего полезного, а тело ответа представляет собой обычный текст (`Internal Server Error`) без подробностей в формате JSON.

**Причина:** некоторые сборки Termux/Node сообщают `process.platform === "android"`. Функция Next.js `getCacheDirectory()` не обрабатывает эту платформу: для неё необходимо, чтобы каталог `~/.cache` (или универсальный временный каталог) _уже_ существовал, иначе при загрузке перехватчика инструментирования возникает ошибка:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Поскольку перехватчик не загружается, ведение журналов не запускается — поэтому причина ошибки 500 выглядит совершенно неясной. OmniRoute создаёт `~/.cache` (и задаёт `XDG_CACHE_HOME`, если переменная не установлена) в точке входа CLI до запуска Next.js, чтобы эта проверка успешно выполнялась в Android/Termux.

**Поддерживаемое решение (без изменения пакета):**

```bash
mkdir -p ~/.cache
omniroute serve
```

В текущих сборках OmniRoute CLI выполняет это автоматически в Android/Termux — после новой установки через `npx -y omniroute@latest` или глобальной установки ручное действие не должно требоваться. Если после обновления ошибка по-прежнему возникает, однократно создайте `~/.cache`, как показано выше, и перезапустите приложение.

**Не изменяйте** `dist/server.js`, чтобы принудительно задать `process.platform = "linux"`. Такое изменение пакета будет перезаписываться при каждой переустановке или обновлении и не требуется после создания каталога кеша.

### Ошибки сборки better-sqlite3

Установите набор инструментов сборки Termux:

```bash
pkg install nodejs python build-essential
```

Затем повторно выполните:

```bash
npx -y omniroute@latest
```

### Порт уже используется

Проверьте, какой процесс прослушивает порт по умолчанию:

```bash
ss -ltnp | grep 20128
```

Остановите старый процесс:

```bash
pkill -f omniroute
```

### Панель управления недоступна с другого устройства

Убедитесь, что оба устройства находятся в одной сети WiFi, затем выполните проверку из Termux:

```bash
curl http://localhost:20128
```

Если локальный доступ работает, а доступ по локальной сети — нет, проверьте изоляцию клиентов точки доступа/WiFi в Android, а также профили брандмауэра или VPN на телефоне.
