# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Tämä opas dokumentoi verkkoinfrastruktuurin kultaisen standardin**OmniRoute**suojaamiseksi ja sovelluksesi turvalliseksi paljastamiseksi Internetiin**avaamatta portteja (Zero Inbound)**.## What was done on your VM?

Otimme OmniRouten käyttöön**Split-Port**-tilassa PM2:n kautta:

-**Portti `20128`:**Suorittaa**vain API**`/v1`. -**Portti `20129`:**Käyttää**vain hallintapaneelia**.

Lisäksi sisäinen palvelu vaatii "REQUIRE_API_KEY=true", mikä tarkoittaa, että mikään agentti ei voi käyttää API-päätepisteitä lähettämättä laillista "Kantajatunnusta", joka on luotu Dashboardin API-avaimet-välilehdellä.

Näin voimme luoda kaksi täysin itsenäistä verkkosääntöä. Tässä tulee esiin**Cloudflare-tunneli (pilvileimattu)**.---

## 1. How to Create the Tunnel in Cloudflare

Cloudflared-apuohjelma on jo asennettu koneellesi. Noudata näitä ohjeita pilvessä:

1. Käytä**Cloudflare Zero Trust**-hallintapaneeliasi (one.dash.cloudflare.com).
2. Valitse vasemmanpuoleisesta valikosta**Verkot > Tunnelit**.
3. Napsauta**Lisää tunneli**, valitse**Cloudflared**ja anna sille nimi "OmniRoute-VM".
4. Se luo näytölle komennon "Asenna ja suorita liitin".**Sinun tarvitsee vain kopioida Token (pitkä merkkijono `--token':n jälkeen)**.
5. Kirjaudu SSH:n kautta virtuaalikoneellesi (tai Proxmox-päätteeseesi) ja suorita: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Siirry äskettäin luodulla Tunnelinäytöllä**Julkiset isäntänimet**-välilehteen ja lisää**kaksi**reittiä hyödyntäen tekemäämme erottelua:### Route 1: Secure API (Limited)

-**Aliverkkotunnus:**`api` -**Domain:**"yourglobal.com" (valitse oikea verkkotunnuksesi) -**Palvelun tyyppi:**"HTTP". -**URL:**`127.0.0.1:20128` _(Sisäinen API-portti)_### Route 2: Zero Trust Dashboard (Closed)

-**Aliverkkotunnus:**"omniroute" tai "paneeli". -**Domain:**"yourglobal.com". -**Palvelun tyyppi:**"HTTP". -**URL:**`127.0.0.1:20129` _(Sisäinen sovellus/visuaalinen portti)_

Tässä vaiheessa "fyysinen" yhteys on ratkaistu. Suojataan se nyt todella.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Mikään paikallinen salasana ei suojaa kojelautaasi paremmin kuin sen käyttöoikeuden poistaminen kokonaan avoimesta Internetistä.

1. Siirry Zero Trust -hallintapaneelissa kohtaan**Pääsy > Sovellukset > Lisää sovellus**.
2. Valitse**Itse isännöimä**.
3. Kirjoita kohtaan**Sovelluksen nimi**"OmniRoute Panel".
4. Kirjoita kohtaan**Application domain**`omniroute.yourglobal.com` (sama, jota käytit kohdassa "Route 2").
5. Napsauta**Seuraava**.
6. Valitse**Sääntötoiminto**-kohdasta Salli. Kirjoita säännön nimeksi "Vain järjestelmänvalvoja".
7. Valitse**Sisällytä**-kohdan avattavasta Valitsija-valikosta Sähköpostit ja kirjoita sähköpostiosoitteesi, esimerkiksi admin@spgeo.com.br.
8. Tallenna ("Lisää sovellus").

> **Mitä tämä teki:**Jos yrität avata osoitteen "omniroute.yourglobal.com", se ei enää päädy OmniRoute-sovellukseesi! Se laskeutuu tyylikkäälle Cloudflare-näytölle ja pyytää sinua syöttämään sähköpostiosoitteesi. Vain jos sinut (tai antamasi sähköpostiosoite) kirjoitetaan sinne, saat Outlookissa/Gmailissa väliaikaisen 6-numeroisen koodin, joka avaa tunnelin porttiin "20129".---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard ei koske API-reittiä (`api.yourglobal.com`), koska se on ohjelmallinen pääsy automaattisten työkalujen (agenttien) kautta ilman selainta. Käytämme tähän Cloudflaren pääpalomuuria (WAF).

1. Avaa**Normal Cloudflare Dashboard**(dash.cloudflare.com) ja siirry verkkotunnukseesi.
2. Valitse vasemmanpuoleisesta valikosta**Turvallisuus > WAF > Rate limiting rules**.
3. Napsauta**Luo sääntö**. 4.**Nimi:**"OmniRoute API Anti-Abuse". 5.**Jos saapuvat pyynnöt vastaavat...**
   - Valitse kenttä: Isäntänimi
   - Operaattori: "saa".
   - Arvo: "api.yourglobal.com".
4. Kohdassa**Samat ominaisuudet:**Säilytä IP-osoite.
5. Limiitit (Limit): -**Kun pyynnöt ylittävät:**"50". -**Jakso:**`1 minuutti`
6. Lopuksi kohdassa**Toiminto**: "Estä" ja päätä, kestääkö esto 1 minuutin vai 1 tunnin. 9.**Ota käyttöön**.

> **Mitä tämä teki:**Kukaan ei voi lähettää API-URL-osoitteeseesi yli 50 pyyntöä 60 sekunnin aikana. Koska käytät useita agentteja ja niiden takana oleva kulutus ylittää jo nopeusrajat ja seuraa tunnuksia, tämä on vain Internet Edge Layerin toimenpide, joka suojaa paikan päällä olevaa ilmentymääsi putoamiselta lämpörasituksen vuoksi ennen kuin liikenne edes menee alas tunneliin.---

## Finalization

1. Virtuaalikoneessasi**ei ole näkyvissä olevia portteja**tiedostossa `/etc/ufw'.
2. OmniRoute puhuu vain HTTPS-lähteestä ("cloudflared") eikä vastaanota suoraa TCP:tä maailmalta.
3. Pyyntösi OpenAI:lle on hämärtynyt, koska määritimme ne maailmanlaajuisesti kulkemaan SOCKS5-välityspalvelimen kautta (pilvi ei välitä SOCKS5:stä, koska se tulee saapuvana).
4. Web-hallintapaneelissasi on 2-faktorinen todennus sähköpostilla.
5. Cloudflare rajoittaa sovellusliittymääsi nopeusrajoituksella, ja se liikennöi vain Bearer Tokeneja.
