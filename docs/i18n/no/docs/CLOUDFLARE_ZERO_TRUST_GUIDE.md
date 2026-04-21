# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Denne veiledningen dokumenterer gullstandarden for nettverksinfrastruktur for å beskytte**OmniRoute**og på en sikker måte eksponere applikasjonen din for internett,**uten å åpne noen porter (null inngående)**.## What was done on your VM?

Vi har aktivert OmniRoute i**Split-Port**-modus via PM2:

-**Port `20128`:**Kjører**bare API**`/v1`. -**Port `20129`:**Kjører**kun det administrative dashbordet**.

Videre krever den interne tjenesten `REQUIRE_API_KEY=true`, noe som betyr at ingen agent kan konsumere API-endepunktene uten å sende et legitimt "Bearer Token" generert i Dashboards API Keys-fane.

Dette lar oss lage to helt uavhengige nettverksregler. Det er her**Cloudflare Tunnel (cloudflared)**kommer inn.---

## 1. How to Create the Tunnel in Cloudflare

'Cloudflared'-verktøyet er allerede installert på maskinen din. Følg disse trinnene i skyen:

1. Få tilgang til**Cloudflare Zero Trust**-dashbordet (one.dash.cloudflare.com).
2. Gå til**Nettverk > Tunneler**i menyen til venstre.
3. Klikk på**Legg til en tunnel**, velg**Cloudflared**, og gi den navnet 'OmniRoute-VM'.
4. Den vil generere en kommando på skjermen som heter "Installer og kjør en kobling".**Du trenger bare å kopiere tokenet (den lange strengen etter `--token`)**.
5. Logg inn via SSH til din virtuelle maskin (eller Proxmox Terminal) og kjør: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Fortsatt på den nyopprettede tunnelskjermen, gå til fanen**Offentlige vertsnavn**og legg til de**to**rutene, og dra nytte av separasjonen vi har laget:### Route 1: Secure API (Limited)

-**Underdomene:**'api' -**Domene:**`yourglobal.com` (velg ditt virkelige domene) -**Tjenestetype:**`HTTP` -**URL:**`127.0.0.1:20128` _(Intern API-port)_### Route 2: Zero Trust Dashboard (Closed)

-**Underdomene:**'omniroute' eller 'panel' -**Domene:**`yourglobal.com` -**Tjenestetype:**`HTTP` -**URL:**`127.0.0.1:20129` _(Intern app/visuell port)_

På dette tidspunktet er den "fysiske" tilkoblingen løst. La oss nå virkelig skjerme det.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Ingen lokalt passord beskytter dashbordet ditt bedre enn å fullstendig fjerne tilgangen til det fra det åpne internett.

1. I Zero Trust-dashbordet går du til**Tilgang > Programmer > Legg til en applikasjon**.
2. Velg**Selvvert**.
3. I**Programnavn**skriver du inn "OmniRoute Panel".
4. I**Applikasjonsdomene**skriver du inn `omniroute.yourglobal.com` (det samme du brukte i "Rute 2").
5. Klikk på**Neste**.
6. I**Regelhandling**velger du 'Tillat'. For regelnavnet, skriv inn "Bare administrator".
7. I**Inkluder**, under "Velger"-rullegardinmenyen, velg 'E-poster' og skriv inn e-posten din, for eksempel 'admin@spgeo.com.br'.
8. Lagre (`Legg til applikasjon`).

> **Hva dette gjorde:**Hvis du prøver å åpne `omniroute.yourglobal.com`, lander det ikke lenger på OmniRoute-applikasjonen din! Den lander på en elegant Cloudflare-skjerm som ber deg skrive inn e-posten din. Bare hvis du (eller e-posten du skrev inn) er skrevet inn der, vil du motta en midlertidig 6-sifret kode i Outlook/Gmail som låser opp tunnelen til port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard gjelder ikke for API-ruten (`api.yourglobal.com`), fordi det er en programmatisk tilgang via automatiserte verktøy (agenter) uten nettleser. Til dette vil vi bruke Cloudflares hovedbrannmur (WAF).

1. Gå til**Normal Cloudflare Dashboard**(dash.cloudflare.com) og gå til domenet ditt.
2. I menyen til venstre går du til**Sikkerhet > WAF > Regler for prisbegrensning**.
3. Klikk på**Opprett regel**. 4.**Navn:**`OmniRoute API Anti-Abuse` 5.**Hvis innkommende forespørsler samsvarer...**
   - Velg Felt: `Vertsnavn`
   - Operatør: `lik`
   - Verdi: `api.yourglobal.com`
4. Under**Med samme egenskaper:**Behold "IP".
5. For grensene (grense): -**Når forespørsler overstiger:**`50` -**Periode:**`1 minutt`
6. På slutten, under**Handling**: 'Blokkér' og avgjør om blokkeringen varer i 1 minutt eller 1 time. 9.**Distribuer**.

> **Hva dette gjorde:**Ingen kan sende mer enn 50 forespørsler i løpet av en 60-sekunders periode til API-URLen din. Siden du kjører flere agenter og forbruket bak dem allerede treffer hastighetsgrenser og sporer tokens, er dette bare et tiltak på Internet Edge Layer som beskytter din On-Premises Instance fra å gå ned på grunn av termisk stress før trafikken i det hele tatt går ned tunnelen.---

## Finalization

1. Din VM**har ingen synlige porter**i `/etc/ufw`.
2. OmniRoute snakker kun HTTPS utgående (`cloudflared`) og mottar ikke direkte TCP fra verden.
3. Forespørslene dine til OpenAI er tilslørt fordi vi globalt konfigurerte dem til å gå gjennom en SOCKS5 Proxy (skyen bryr seg ikke om SOCKS5 fordi den kommer inngående).
4. Nettdashbordet ditt har 2-faktor-autentisering med e-post.
5. API-et ditt er ratebegrenset ved kanten av Cloudflare og trafikkerer bare bærertokens.
