# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Denne vejledning dokumenterer den gyldne standard for netværksinfrastruktur for at beskytte**OmniRoute**og sikkert eksponere din applikation til internettet**uden at åbne nogen porte (Nul indgående)**.## What was done on your VM?

Vi aktiverede OmniRoute i**Split-Port**-tilstand via PM2:

-**Port `20128`:**Kører**kun API**`/v1`. -**Port `20129`:**Kører**kun det administrative dashboard**.

Ydermere kræver den interne service `REQUIRE_API_KEY=true`, hvilket betyder, at ingen agent kan forbruge API-endepunkterne uden at sende et legitimt "Bearer Token" genereret i Dashboards API Keys-faneblad.

Dette giver os mulighed for at skabe to helt uafhængige netværksregler. Det er her**Cloudflare Tunnel (cloudflared)**kommer ind.---

## 1. How to Create the Tunnel in Cloudflare

'Cloudflared'-værktøjet er allerede installeret på din maskine. Følg disse trin i skyen:

1. Få adgang til dit**Cloudflare Zero Trust**-dashboard (one.dash.cloudflare.com).
2. Gå til**Netværk > Tunneler**i menuen til venstre.
3. Klik på**Tilføj en tunnel**, vælg**Cloudflared**, og giv den navnet 'OmniRoute-VM'.
4. Det vil generere en kommando på skærmen kaldet "Installer og kør en forbindelse".**Du behøver kun at kopiere tokenet (den lange streng efter `--token`)**.
5. Log ind via SSH på din virtuelle maskine (eller Proxmox Terminal) og udfør: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Stadig på den nyoprettede tunnelskærm, gå til fanen**Offentlige værtsnavne**og tilføj de**to**ruter, og drag fordel af den adskillelse, vi lavede:### Route 1: Secure API (Limited)

-**Underdomæne:**'api' -**Domæne:**`yourglobal.com` (vælg dit rigtige domæne) -**Tjenestetype:**`HTTP` -**URL:**`127.0.0.1:20128` _(Intern API-port)_### Route 2: Zero Trust Dashboard (Closed)

-**Underdomæne:**'omniroute' eller 'panel' -**Domæne:**`yourglobal.com` -**Tjenestetype:**`HTTP` -**URL:**`127.0.0.1:20129` _(Intern app/visuel port)_

På dette tidspunkt er den "fysiske" forbindelse løst. Lad os nu virkelig skærme det.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Ingen lokal adgangskode beskytter dit dashboard bedre end helt at fjerne adgangen til det fra det åbne internet.

1. I Zero Trust-dashboardet skal du gå til**Adgang > Programmer > Tilføj en applikation**.
2. Vælg**Selvhostet**.
3. Indtast `OmniRoute Panel` i**Applikationsnavn**.
4. I**Applikationsdomæne**skal du indtaste `omniroute.yourglobal.com` (det samme som du brugte i "Route 2").
5. Klik på**Næste**.
6. I**Regelhandling**skal du vælge "Tillad". Indtast "Kun Admin" for regelnavnet.
7. I**Inkluder**, under rullemenuen "Vælger", vælg "E-mails", og skriv din e-mail, f.eks. "admin@spgeo.com.br".
8. Gem (`Tilføj applikation`).

> **Hvad dette gjorde:**Hvis du prøver at åbne `omniroute.yourglobal.com`, lander det ikke længere på din OmniRoute-applikation! Den lander på en elegant Cloudflare-skærm, der beder dig om at indtaste din e-mail. Kun hvis du (eller den e-mail du indtastede) er skrevet der, vil du modtage en midlertidig 6-cifret kode i Outlook/Gmail, der låser tunnelen op til port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard gælder ikke for API-ruten (`api.yourglobal.com`), fordi det er en programmatisk adgang via automatiserede værktøjer (agenter) uden en browser. Til dette vil vi bruge Cloudflares hovedfirewall (WAF).

1. Få adgang til**Normal Cloudflare Dashboard**(dash.cloudflare.com), og gå til dit domæne.
2. Gå til**Sikkerhed > WAF > Rate limiting rules**i venstre menu.
3. Klik på**Opret regel**. 4.**Navn:**`OmniRoute API Anti-Abuse` 5.**Hvis indgående anmodninger matcher...**
   - Vælg Felt: `Værtsnavn`
   - Operatør: `lig med`
   - Værdi: `api.yourglobal.com`
4. Under**Med samme egenskaber:**Behold "IP".
5. For grænserne (grænse): -**Når anmodninger overstiger:**`50` -**Periode:**`1 minut`
6. Til sidst, under**Handling**: 'Bloker' og afgør, om blokeringen varer i 1 minut eller 1 time. 9.**Implementer**.

> **Hvad dette gjorde:**Ingen kan sende mere end 50 anmodninger i en 60 sekunders periode til din API-URL. Da du kører flere agenter, og forbruget bag dem allerede rammer hastighedsgrænser og sporer tokens, er dette blot en foranstaltning på Internet Edge Layer, der beskytter din On-Premises Instance mod at gå ned på grund af termisk stress, før trafikken overhovedet går ned i tunnelen.---

## Finalization

1. Din VM**har ingen synlige porte**i `/etc/ufw`.
2. OmniRoute taler kun HTTPS udgående (`cloudflared`) og modtager ikke direkte TCP fra verden.
3. Dine anmodninger til OpenAI er sløret, fordi vi globalt har konfigureret dem til at passere gennem en SOCKS5 Proxy (skyen er ligeglad med SOCKS5, fordi den kommer indgående).
4. Dit web-dashboard har 2-faktor-godkendelse med e-mail.
5. Din API er hastighedsbegrænset ved kanten af ​​Cloudflare og trafikerer kun Bearer Tokens.
