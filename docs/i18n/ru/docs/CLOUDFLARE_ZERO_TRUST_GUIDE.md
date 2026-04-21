# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

В этом руководстве документирован золотой стандарт сетевой инфраструктуры для защиты**OmniRoute**и безопасного доступа вашего приложения к Интернету**без открытия каких-либо портов (нулевой входящий трафик)**.## What was done on your VM?

Мы включили OmniRoute в режиме**Split-Port**через PM2:

-**Порт `20128`:**Запускается**только API**`/v1`. -**Порт `20129`:**Запускает**только административную панель**.

Кроме того, для внутренней службы требуется REQUIRE_API_KEY=true, что означает, что ни один агент не может использовать конечные точки API без отправки законного «токена на предъявителя», сгенерированного на вкладке «Ключи API» информационной панели.

Это позволяет нам создать два полностью независимых сетевых правила. Именно здесь на помощь приходит**Cloudflare Tunnel (cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

Утилита Cloudflared уже установлена ​​на вашем компьютере. Выполните следующие действия в облаке:

1. Откройте панель управления**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. В левом меню выберите**Сети > Туннели**.
3. Нажмите**Добавить туннель**, выберите**Cloudflared**и назовите его «OmniRoute-VM».
4. На экране появится команда «Установить и запустить коннектор».**Вам нужно только скопировать токен (длинную строку после `--token`)**.
5. Войдите через SSH на свою виртуальную машину (или терминал Proxmox) и выполните: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

На вновь созданном экране «Туннель» перейдите на вкладку**Публичные имена хостов**и добавьте**два**маршрута, воспользовавшись созданным нами разделением:### Route 1: Secure API (Limited)

-**Субдомен:**`api` -**Домен:**`yourglobal.com` (выберите свой настоящий домен) -**Тип службы:**`HTTP` -**URL:**`127.0.0.1:20128` _(Внутренний порт API)_### Route 2: Zero Trust Dashboard (Closed)

–**Субдомен:**`omniroute` или `panel` -**Домен:**`yourglobal.com` -**Тип службы:**`HTTP` -**URL:**`127.0.0.1:20129` _(внутреннее приложение/визуальный порт)_

На этом этапе «Физическое» подключение разрешено. Теперь давайте по-настоящему защитим его.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Никакой локальный пароль не защитит вашу панель управления лучше, чем полное удаление к ней доступа из открытого Интернета.

1. На панели управления Zero Trust выберите**Доступ > Приложения > Добавить приложение**.
2. Выберите**Собственное размещение**.
3. В поле**Имя приложения**введите «Панель OmniRoute».
4. В поле**Домен приложения**введите `omniroute.yourglobal.com` (тот же, который вы использовали в «Маршруте 2»).
5. Нажмите**Далее**.
6. В разделе**Действие правила**выберите «Разрешить». В качестве имени правила введите «Только администратор».
7. В разделе**Включить**в раскрывающемся списке «Выбор» выберите «Электронная почта» и введите свой адрес электронной почты, например «admin@spgeo.com.br».
8. Сохранить («Добавить приложение»).

> **Что это привело:**Если вы попытаетесь открыть `omniroute.yourglobal.com`, он больше не попадет в ваше приложение OmniRoute! Он появляется на элегантном экране Cloudflare с просьбой ввести адрес электронной почты. Только если вы (или введенный вами адрес электронной почты) введете там, вы получите временный 6-значный код в Outlook/Gmail, который разблокирует туннель к порту «20129».---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Панель управления нулевым доверием не применяется к маршруту API («api.yourglobal.com»), поскольку это программный доступ через автоматизированные инструменты (агенты) без браузера. Для этого мы будем использовать основной брандмауэр Cloudflare (WAF).

1. Откройте**обычную панель управления Cloudflare**(dash.cloudflare.com) и перейдите в свой домен.
2. В левом меню выберите**Безопасность > WAF > Правила ограничения скорости**.
3. Нажмите**Создать правило**. 4.**Название:**`Защита от злоупотреблений API OmniRoute` 5.**Если входящие запросы совпадают...**
   - Выберите поле: «Имя хоста».
   - Оператор: `равно`
   - Значение: `api.yourglobal.com`
4. В разделе**С теми же характеристиками**сохраните `IP`.
5. По лимитам (Limit): -**Когда запросы превышают:**`50` -**Период:**`1 минута`
6. В конце в разделе**Действие**: «Блокировать» укажите, продлится ли блокировка 1 минуту или 1 час. 9.**Развертывание**.

> **Что это привело?**Никто не может отправлять более 50 запросов в течение 60 секунд на ваш URL-адрес API. Поскольку вы запускаете несколько агентов, а потребление за ними уже достигает пределов скорости и отслеживает токены, это всего лишь мера на пограничном уровне Интернета, которая защищает ваш локальный экземпляр от выхода из строя из-за термического стресса еще до того, как трафик пойдет по туннелю.---

## Finalization

1. Ваша виртуальная машина**не имеет открытых портов**в `/etc/ufw`.
2. OmniRoute использует только исходящий трафик HTTPS («cloudflared») и не получает прямого TCP из мира.
3. Ваши запросы к OpenAI запутаны, поскольку мы глобально настроили их для прохождения через прокси-сервер SOCKS5 (облако не заботится о SOCKS5, потому что оно приходит входящим).
4. Ваша веб-панель имеет двухфакторную аутентификацию по электронной почте.
5. Ваш API ограничен по скорости на границе Cloudflare и передает только токены на предъявителя.
