# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

У цьому посібнику документовано золотий стандарт мережевої інфраструктури для захисту**OmniRoute**і безпечного доступу вашої програми до Інтернету,**не відкриваючи жодних портів (нульовий вхідний доступ)**.## What was done on your VM?

Ми ввімкнули OmniRoute у режимі**Split-Port**через PM2:

-**Порт `20128`:**запускає**тільки API**`/v1`. -**Порт `20129`:**запускає**тільки адміністративну панель**.

Крім того, внутрішня служба вимагає `REQUIRE_API_KEY=true`, що означає, що жоден агент не може використовувати кінцеві точки API без надсилання легітимного «токена носія», згенерованого на вкладці «Ключі API» інформаційної панелі.

Це дозволяє нам створити два абсолютно незалежних правила мережі. Тут на допомогу приходить**Cloudflare Tunnel (cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

Утиліта `cloudflared` вже встановлена ​​на вашій машині. Виконайте такі дії в хмарі:

1. Перейдіть до інформаційної панелі**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. У меню ліворуч перейдіть до**Мережі > Тунелі**.
3. Натисніть**Додати тунель**, виберіть**Cloudflared**і назвіть його `OmniRoute-VM`.
4. На екрані згенерується команда під назвою «Встановити та запустити з’єднувач».**Вам потрібно лише скопіювати маркер (довгий рядок після `--token`)**.
5. Увійдіть через SSH у свою віртуальну машину (або термінал Proxmox) і виконайте: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Перебуваючи на щойно створеному екрані тунелю, перейдіть на вкладку**Public Hostnames**і додайте**два**маршрути, використовуючи переваги розділення, яке ми зробили:### Route 1: Secure API (Limited)

-**Субдомен:**`api` -**Домен:**`yourglobal.com` (виберіть свій справжній домен) -**Тип служби:**`HTTP` -**URL:**`127.0.0.1:20128` _(Внутрішній порт API)_### Route 2: Zero Trust Dashboard (Closed)

-**Субдомен:**`omniroute` або `panel` -**Домен:**`yourglobal.com` -**Тип служби:**`HTTP` -**URL:**`127.0.0.1:20129` _(Внутрішній додаток/візуальний порт)_

На цьому етапі «фізичне» підключення вирішено. Тепер давайте справді захистимо його.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Жоден локальний пароль не захистить вашу інформаційну панель краще, ніж повне видалення доступу до неї з відкритого Інтернету.

1. На інформаційній панелі Zero Trust перейдіть до**Доступ > Програми > Додати програму**.
2. Виберіть**Self-hosted**.
3. У полі**Назва програми**введіть `OmniRoute Panel`.
4. У полі**Application domain**введіть `omniroute.yourglobal.com` (той самий, який ви використовували в "Route 2").
5. Натисніть**Далі**.
6. У**Дії правила**виберіть `Дозволити`. Для назви правила введіть «Лише адміністратор».
7. У розділі**Включити**у спадному меню «Вибір» виберіть «Електронні листи» та введіть свою електронну адресу, наприклад `admin@spgeo.com.br`.
8. Зберегти (`Додати додаток`).

> **Що це дало:**Якщо ви спробуєте відкрити `omniroute.yourglobal.com`, він більше не потрапляє у вашу програму OmniRoute! Він потрапляє на елегантний екран Cloudflare із проханням ввести свою електронну адресу. Лише якщо ви (або введену вами адресу електронної пошти) буде введено там, ви отримаєте тимчасовий 6-значний код в Outlook/Gmail, який розблокує тунель до порту `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Інформаційна панель Zero Trust Dashboard не застосовується до маршруту API (`api.yourglobal.com`), оскільки це програмний доступ через автоматизовані інструменти (агенти) без браузера. Для цього ми будемо використовувати основний брандмауер Cloudflare (WAF).

1. Відкрийте**Звичайну інформаційну панель Cloudflare**(dash.cloudflare.com) і перейдіть до свого домену.
2. У меню ліворуч перейдіть до**Безпека > WAF > Правила обмеження швидкості**.
3. Натисніть**Створити правило**. 4.**Назва:**`OmniRoute API Anti-Abuse` 5.**Якщо вхідні запити збігаються...**
   - Виберіть поле: `Назва хоста`
   - Оператор: `дорівнює`
   - Значення: `api.yourglobal.com`
4. У розділі**З однаковими характеристиками:**збережіть `IP`.
5. Для лімітів (Limit): -**Коли запити перевищують:**`50` -**Період:**`1 хвилина`
6. Наприкінці в розділі**Дія**: `Заблокувати` та вирішіть, чи триває блокування 1 хвилину чи 1 годину. 9.**Розгорнути**.

> **Що це дало:**Ніхто не може надіслати більше 50 запитів протягом 60-секундного періоду на вашу URL-адресу API. Оскільки ви запускаєте кілька агентів, а споживання за ними вже досягає обмежень швидкості та відстежує токени, це лише захід на межовому рівні Інтернету, який захищає ваш локальний екземпляр від виходу з ладу через термічний стрес ще до того, як трафік пройде тунель.---

## Finalization

1. Ваша віртуальна машина**не має відкритих портів**у `/etc/ufw`.
2. OmniRoute спілкується лише з вихідним протоколом HTTPS («cloudflared») і не отримує прямий TCP зі світу.
3. Ваші запити до OpenAI обфусковані, тому що ми глобально налаштували їх для проходження через проксі-сервер SOCKS5 (хмара не піклується про SOCKS5, оскільки він надходить вхідний).
4. Ваша веб-панель має 2-факторну автентифікацію за допомогою електронної пошти.
5. Ваш API обмежено швидкістю на межі Cloudflare і передає лише токени носія.
