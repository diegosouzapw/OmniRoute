# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Това ръководство документира златния стандарт на мрежовата инфраструктура за защита на**OmniRoute**и сигурно излагане на вашето приложение в интернет,**без отваряне на никакви портове (нулево входящо)**.## What was done on your VM?

Активирахме OmniRoute в режим**Split-Port**чрез PM2:

-**Порт `20128`:**Изпълнява**само API**`/v1`. -**Порт `20129`:**Работи**само с административното табло**.

Освен това вътрешната услуга изисква `REQUIRE_API_KEY=true`, което означава, че нито един агент не може да използва крайните точки на API, без да изпрати легитимен „Token на носител“, генериран в раздела API ключове на таблото за управление.

Това ни позволява да създадем две напълно независими мрежови правила. Тук се намесва**Cloudflare Tunnel (cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

Помощната програма `cloudflared` вече е инсталирана на вашата машина. Следвайте тези стъпки в облака:

1. Влезте в таблото за управление**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. В лявото меню отидете на**Мрежи > Тунели**.
3. Кликнете върху**Добавяне на тунел**, изберете**Cloudflared**и го наименувайте `OmniRoute-VM`.
4. Ще генерира команда на екрана, наречена „Инсталиране и стартиране на конектор“.**Трябва само да копирате токена (дългия низ след `--token`)**.
5. Влезте чрез SSH във вашата виртуална машина (или Proxmox терминал) и изпълнете: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Все още на новосъздадения екран на тунела, отидете в раздела**Публични имена на хостове**и добавете**двата**маршрута, като се възползвате от разделянето, което направихме:### Route 1: Secure API (Limited)

-**Поддомейн:**`api` -**Домейн:**`yourglobal.com` (изберете истинския си домейн) -**Тип услуга:**`HTTP` -**URL:**`127.0.0.1:20128` _(Вътрешен API порт)_### Route 2: Zero Trust Dashboard (Closed)

-**Поддомейн:**`omniroute` или `панел` -**Домейн:**`yourglobal.com` -**Тип услуга:**`HTTP` -**URL:**`127.0.0.1:20129` _(Вътрешен порт за приложение/визуален порт)_

В този момент "физическата" свързаност е разрешена. Сега нека наистина го защитим.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Никоя локална парола не защитава таблото ви за управление по-добре от пълното премахване на достъпа до него от отворения интернет.

1. В таблото за управление Zero Trust отидете на**Достъп > Приложения > Добавяне на приложение**.
2. Изберете**Сам хостван**.
3. В**Име на приложението**въведете `OmniRoute Panel`.
4. В**Домейн на приложението**въведете `omniroute.yourglobal.com` (Същият, който сте използвали в "Route 2").
5. Щракнете върху**Напред**.
6. В**Правило за действие**изберете `Разрешаване`. За име на правило въведете „Само администратор“.
7. В**Включване**, под падащото меню „Селектор“, изберете „Имейли“ и въведете вашия имейл, например „admin@spgeo.com.br“.
8. Запазване (`Добавяне на приложение`).

> **Какво направи това:**Ако се опитате да отворите `omniroute.yourglobal.com`, той вече не попада във вашето приложение OmniRoute! Той се приземява на елегантен екран на Cloudflare и ви моли да въведете вашия имейл. Само ако вие (или имейлът, който сте въвели) е въведен там, ще получите временен 6-цифрен код в Outlook/Gmail, който отключва тунела към порт `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard не се прилага за маршрута на API (`api.yourglobal.com`), защото това е програмен достъп чрез автоматизирани инструменти (агенти) без браузър. За целта ще използваме основната защитна стена (WAF) на Cloudflare.

1. Влезте в**Нормалното табло за управление на Cloudflare**(dash.cloudflare.com) и отидете на вашия домейн.
2. В лявото меню отидете на**Сигурност > WAF > Правила за ограничаване на скоростта**.
3. Кликнете върху**Създаване на правило**. 4.**Име:**`OmniRoute API Anti-Abuse` 5.**Ако входящите заявки съвпадат...**
   - Изберете поле: `Име на хост`
   - Оператор: `равно`
   - Стойност: `api.yourglobal.com`
4. Под**Със същите характеристики:**Запазете `IP`.
5. За лимитите (Limit): -**Когато заявките надвишават:**`50` -**Период:**`1 минута`
6. Накрая под**Действие**: `Блокирай` и решете дали блокирането продължава 1 минута или 1 час. 9.**Разгръщане**.

> **Какво направи това:**Никой не може да изпрати повече от 50 заявки за период от 60 секунди до вашия URL адрес на API. Тъй като изпълнявате множество агенти и потреблението зад тях вече достига лимитите на скоростта и проследява токените, това е само мярка на Internet Edge Layer, която предпазва вашия локален екземпляр от прекъсване поради термичен стрес, преди трафикът дори да премине през тунела.---

## Finalization

1. Вашата виртуална машина**няма открити портове**в `/etc/ufw`.
2. OmniRoute говори само за HTTPS изходящ („cloudflared“) и не получава директен TCP от света.
3. Вашите заявки към OpenAI са обфусцирани, защото ние глобално ги конфигурирахме да преминават през SOCKS5 прокси (Облакът не се интересува от SOCKS5, защото идва Inbound).
4. Вашето уеб табло има 2-факторно удостоверяване с имейл.
5. Вашият API е ограничен в скоростта на ръба от Cloudflare и управлява само токени на носител.
