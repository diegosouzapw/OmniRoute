# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Ez az útmutató dokumentálja a hálózati infrastruktúra arany szabványát az**OmniRoute**védelmére és az alkalmazás biztonságos internetkapcsolatra való kitételére,**portok megnyitása nélkül (Zero Inbound)**.## What was done on your VM?

Engedélyeztük az OmniRoute-ot**Split-Port**módban a PM2-n keresztül:

-**Port `20128`:\*\***csak az API**`/v1` fut. -**Port `20129`:\***\*Csak az adminisztrációs irányítópulton**fut.

Továbbá a belső szolgáltatás megköveteli a `REQUIRE_API_KEY=true` paramétert, ami azt jelenti, hogy egyetlen ügynök sem tudja felhasználni az API-végpontokat anélkül, hogy az irányítópult API-kulcsok lapján generált legitim "hordozó tokent" küldene.

Ez lehetővé teszi két teljesen független hálózati szabály létrehozását. Itt jön be a**Cloudflare Tunnel (Cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

A `cloudflared` segédprogram már telepítve van a gépeden. Kövesse az alábbi lépéseket a felhőben:

1. Nyissa meg a**Cloudflare Zero Trust**irányítópultját (one.dash.cloudflare.com).
2. A bal oldali menüben lépjen a**Hálózatok > Alagutak**elemre.
3. Kattintson az**Add a Tunnel**elemre, válassza a**Cloudflared**lehetőséget, és nevezze el "OmniRoute-VM"-nek.
4. A képernyőn generál egy "Install and run a Connector" nevű parancsot.**Csak a tokent kell másolnia (a "--token" utáni hosszú karakterlánc)**.
5. Jelentkezzen be SSH-n keresztül a virtuális gépére (vagy Proxmox termináljára), és hajtsa végre: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Továbbra is az újonnan létrehozott Alagút képernyőn lépjen a**Public Hostnames**fülre, és adja hozzá a**két**útvonalat, kihasználva az általunk végzett szétválasztást:### Route 1: Secure API (Limited)

-**Aldomain:**`api` -**Domain:**"yourglobal.com" (válasszon valódi domaint) -**Szolgáltatás típusa:**"HTTP". -**URL:**`127.0.0.1:20128` _(Belső API-port)_### Route 2: Zero Trust Dashboard (Closed)

-**Aldomain:**"omniroute" vagy "panel". -**Domain:**"yourglobal.com". -**Szolgáltatás típusa:**"HTTP". -**URL:**`127.0.0.1:20129` _(Belső alkalmazás/vizuális port)_

Ezen a ponton a "fizikai" kapcsolat megoldódott. Most pedig védjük igazán.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Egyetlen helyi jelszó sem védi jobban az irányítópultot, mint a hozzáférés teljes eltávolítása a nyílt internetről.

1. A Zero Trust irányítópulton lépjen a**Hozzáférés > Alkalmazások > Alkalmazás hozzáadása**elemhez.
2. Válassza a**Self-hosted**lehetőséget.
3. Az**Alkalmazás neve**mezőbe írja be az "OmniRoute Panel" kifejezést.
4. Az**Alkalmazási tartomány**mezőbe írja be az "omniroute.yourglobal.com" címet (ugyanaz, amelyet a "2. útvonal"-ban használt).
5. Kattintson a**Tovább**gombra.
6. A**Szabályművelet**részben válassza az "Engedélyezés" lehetőséget. A szabály nevéhez írja be a „Csak rendszergazda” értéket.
7. A**Include**, a "Selector" legördülő menüben válassza az "E-mailek" lehetőséget, és írja be e-mail címét, például "admin@spgeo.com.br".
8. Mentés (`Alkalmazás hozzáadása`).

> **Mi történt:**Ha megpróbálja megnyitni az "omniroute.yourglobal.com" webhelyet, az többé nem jelenik meg az OmniRoute alkalmazásban! Egy elegáns Cloudflare képernyőn landol, és megkéri, hogy adja meg e-mail címét. Csak ha Ön (vagy a megadott e-mail-cím) be van írva, akkor kap egy ideiglenes 6 számjegyű kódot az Outlook/Gmailben, amely feloldja a 20129-es porthoz vezető alagutat.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

A Zero Trust Dashboard nem vonatkozik az API-útvonalra (`api.yourglobal.com`), mert ez egy programozott hozzáférés automatizált eszközökön (ügynökökön) keresztül, böngésző nélkül. Ehhez a Cloudflare fő tűzfalát (WAF) fogjuk használni.

1. Nyissa meg a**Normal Cloudflare Dashboard**(dash.cloudflare.com) oldalt, és lépjen a domainjére.
2. A bal oldali menüben lépjen a**Biztonság > WAF > Díjkorlátozási szabályok**elemre.
3. Kattintson a**Szabály létrehozása**lehetőségre. 4.**Név:**`OmniRoute API Anti-Abuse` 5.**Ha a bejövő kérések egyeznek...**
   - Válassza ki a Mezőt: "Gazdagépnév".
   - Operátor: "egyenlő".
   - Érték: `api.yourglobal.com`
4. A**Azonos jellemzőkkel:**Tartsa meg az `IP-t'.
5. A limitekhez (Limit): -**Amikor a kérések száma meghaladja:**"50". -**Időszak:**"1 perc".
6. A végén a**Action**alatt: `Block`, és döntse el, hogy a blokk 1 percig vagy 1 óráig tart. 9.**Bevezetés**.

> **Mi történt:**Senki sem küldhet 50 kérésnél többet 60 másodperc alatt az API URL-címére. Mivel Ön több ügynököt futtat, és a mögöttük lévő fogyasztás már eléri a sebességkorlátokat, és követi a tokeneket, ez csak egy intézkedés az Internet Edge Layerben, amely megvédi a helyszíni példányt a hőterhelés miatti leállástól, még mielőtt a forgalom lemenne az alagútba.---

## Finalization

1. A virtuális gépének**nincs szabad portja**az `/etc/ufw' fájlban.
2. Az OmniRoute csak a HTTPS kimenőről beszél ("cloudflared"), és nem kap közvetlen TCP-t a világtól.
3. Az OpenAI-nak küldött kérései el vannak homályosítva, mert globálisan úgy konfiguráltuk őket, hogy egy SOCKS5-proxyn haladjanak át (a felhőt nem érdekli a SOCKS5, mert bejövőben érkezik).
4. Webes irányítópultja kéttényezős hitelesítéssel rendelkezik e-maillel.
5. Az API-ját a szélén a Cloudflare korlátozza, és csak a Bearer Tokeneket forgalmazza.
