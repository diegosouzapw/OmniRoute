# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Táto príručka dokumentuje zlatý štandard sieťovej infraštruktúry na ochranu**OmniRoute**a bezpečné vystavenie vašej aplikácie internetu**bez otvárania akýchkoľvek portov (Zero Inbound)**.## What was done on your VM?

Aktivovali sme OmniRoute v režime**Split-Port**cez PM2:

-**Port `20128`:**Spúšťa**iba rozhranie API**`/v1`. -**Port `20129`:**Spúšťa**iba administratívny panel**.

Okrem toho interná služba vyžaduje `REQUIRE_API_KEY=true`, čo znamená, že žiadny agent nemôže využívať koncové body API bez odoslania legitímneho tokenu nosiča vygenerovaného na karte Kľúče rozhrania API na informačnom paneli.

To nám umožňuje vytvoriť dve úplne nezávislé pravidlá siete. Tu prichádza na rad**Cloudflare Tunnel (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

Nástroj `cloudflared` je už nainštalovaný na vašom počítači. V cloude postupujte podľa týchto krokov:

1. Prístup k vášmu ovládaciemu panelu**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. V ľavom menu prejdite na**Siete > Tunely**.
3. Kliknite na**Add a Tunnel**, vyberte**Cloudflared**a pomenujte ho `OmniRoute-VM`.
4. Na obrazovke sa vygeneruje príkaz s názvom „Inštalovať a spustiť konektor“.**Stačí skopírovať token (dlhý reťazec za `--token`)**.
5. Prihláste sa cez SSH na svoj virtuálny stroj (alebo terminál Proxmox) a vykonajte: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Stále na novovytvorenej obrazovke tunela prejdite na kartu**Verejné názvy hostiteľov**a pridajte**dve**trasy, pričom využite oddelenie, ktoré sme urobili:### Route 1: Secure API (Limited)

-**Subdoména:**`api` -**Doména:**`yourglobal.com` (vyberte si skutočnú doménu)
–**Typ služby:**„HTTP“. -**URL:**`127.0.0.1:20128` _(Interný port API)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdoména:**`omniroute` alebo `panel` -**Doména:**`yourglobal.com`
–**Typ služby:**„HTTP“. -**URL:**`127.0.0.1:20129` _(Interný port aplikácie/vizuálny port)_

V tomto momente je „Fyzická“ konektivita vyriešená. Teraz to skutočne chráňme.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Žiadne miestne heslo nechráni váš informačný panel lepšie ako úplné odstránenie prístupu k nemu z otvoreného internetu.

1. Na ovládacom paneli Zero Trust prejdite na**Prístup > Aplikácie > Pridať aplikáciu**.
2. Vyberte možnosť**Samohostiteľná**.
3. Do poľa**Názov aplikácie**zadajte `OmniRoute Panel`.
4. V**Doména aplikácie**zadajte `omniroute.yourglobal.com` (rovnaké, aké ste použili v časti „Route 2“).
5. Kliknite na**Next**.
6. V časti**Akcia pravidla**vyberte možnosť Povoliť. Pre názov pravidla zadajte `Admin Only`.
7. V**Zahrnúť**v rozbaľovacej ponuke „Výber“ vyberte „E-maily“ a zadajte svoj e-mail, napríklad „admin@spgeo.com.br“.
8. Uložte (`Pridať aplikáciu`).

> **Čo to urobilo:**Ak sa pokúsite otvoriť `omniroute.yourglobal.com`, už sa nedostane do vašej aplikácie OmniRoute! Pristane na elegantnej obrazovke Cloudflare, ktorá vás požiada o zadanie e-mailu. Iba ak tam zadáte vy (alebo zadaný e-mail), dostanete dočasný 6-miestny kód do Outlooku/Gmailu, ktorý odomkne tunel na port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard sa nevzťahuje na smerovanie API (`api.yourglobal.com`), pretože ide o programový prístup prostredníctvom automatizovaných nástrojov (agentov) bez prehliadača. Na tento účel použijeme hlavný firewall (WAF) od Cloudflare.

1. Prejdite na**Normal Cloudflare Dashboard**(dash.cloudflare.com) a prejdite do svojej domény.
2. V ľavom menu prejdite na**Zabezpečenie > WAF > Pravidlá obmedzenia sadzby**.
3. Kliknite na**Vytvoriť pravidlo**. 4.**Názov:**„OmniRoute API Anti-Abuse“. 5.**Ak sa prichádzajúce žiadosti zhodujú...**
   - Vyberte pole: `Názov hostiteľa`
   - Operátor: "rovná sa".
   - Hodnota: `api.yourglobal.com`
4. V časti**S rovnakými charakteristikami:**Ponechajte IP.
5. Pre limity (Limit): -**Keď požiadavky prekročia:**„50“. -**Obdobie:**„1 minúta“.
6. Na konci pod**Akcia**: `Blokovať` a rozhodnite sa, či blok bude trvať 1 minútu alebo 1 hodinu. 9.**Nasadenie**.

> **Čo to urobilo:**Nikto nemôže odoslať viac ako 50 žiadostí za 60 sekúnd na vašu adresu URL rozhrania API. Keďže prevádzkujete viacerých agentov a spotreba za nimi už dosahuje limity rýchlosti a sleduje tokeny, toto je len opatrenie na internetovej Edge Layer, ktoré chráni vašu lokálnu inštanciu pred poklesom v dôsledku tepelného namáhania ešte predtým, ako sa prevádzka spustí tunelom.---

## Finalization

1. Váš VM**nemá žiadne odkryté porty**v `/etc/ufw`.
2. OmniRoute hovorí iba odchádzajúce HTTPS (`cloudflared`) a neprijíma priame TCP zo sveta.
3. Vaše požiadavky na OpenAI sú zmätené, pretože sme ich globálne nakonfigurovali tak, aby prechádzali cez SOCKS5 Proxy (Cloud sa nestará o SOCKS5, pretože prichádza Inbound).
4. Váš webový panel má dvojfaktorové overenie pomocou e-mailu.
5. Vaše rozhranie API je limitované limitom Cloudflare a prenáša iba tokeny nosiča.
