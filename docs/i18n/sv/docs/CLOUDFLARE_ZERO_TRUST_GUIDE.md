# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Den här guiden dokumenterar guldstandarden för nätverksinfrastruktur för att skydda**OmniRoute**och säkert exponera din applikation för internet,**utan att öppna några portar (Noll inkommande)**.## What was done on your VM?

Vi aktiverade OmniRoute i**Split-Port**-läge via PM2:

-**Port `20128`:**Kör**endast API**`/v1`. -**Port `20129`:**Kör**endast den administrativa instrumentpanelen**.

Dessutom kräver den interna tjänsten `REQUIRE_API_KEY=true`, vilket betyder att ingen agent kan konsumera API-slutpunkterna utan att skicka ett legitimt "Bearer Token" som genererats på Dashboards API Keys-flik.

Detta gör att vi kan skapa två helt oberoende nätverksregler. Det är här**Cloudflare Tunnel (cloudflared)**kommer in.---

## 1. How to Create the Tunnel in Cloudflare

Verktyget `cloudflared` är redan installerat på din maskin. Följ dessa steg i molnet:

1. Öppna din**Cloudflare Zero Trust**-instrumentpanel (one.dash.cloudflare.com).
2. I menyn till vänster, gå till**Nätverk > Tunnlar**.
3. Klicka på**Lägg till en tunnel**, välj**Cloudflared**och döp den till 'OmniRoute-VM'.
4. Det kommer att generera ett kommando på skärmen som heter "Installera och kör en anslutning".**Du behöver bara kopiera token (den långa strängen efter `--token`)**.
5. Logga in via SSH på din virtuella maskin (eller Proxmox Terminal) och kör: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Fortfarande på den nyskapade tunnelskärmen, gå till fliken**Offentliga värdnamn**och lägg till de**två**rutterna, och dra fördel av separationen vi gjorde:### Route 1: Secure API (Limited)

-**Underdomän:**'api' -**Domän:**`yourglobal.com` (välj din riktiga domän) -**Servicetyp:**`HTTP` -**URL:**`127.0.0.1:20128` _(Intern API-port)_### Route 2: Zero Trust Dashboard (Closed)

-**Underdomän:**'omniroute' eller 'panel' -**Domän:**`yourglobal.com` -**Servicetyp:**`HTTP` -**URL:**`127.0.0.1:20129` _(Intern app/visuell port)_

Vid denna tidpunkt är den "fysiska" anslutningen löst. Låt oss nu verkligen skydda det.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Inget lokalt lösenord skyddar din instrumentpanel bättre än att helt ta bort åtkomsten till den från det öppna internet.

1. I Zero Trust-instrumentpanelen, gå till**Åtkomst > Applikationer > Lägg till en applikation**.
2. Välj**Självvärd**.
3. I**Applikationsnamn**anger du `OmniRoute Panel`.
4. I**Applikationsdomän**anger du `omniroute.yourglobal.com` (samma som du använde i "Route 2").
5. Klicka på**Nästa**.
6. I**Regelåtgärd**väljer du "Tillåt". För regelnamnet anger du "Endast admin".
7. I**Inkludera**, under rullgardinsmenyn "Väljare", välj "E-postmeddelanden" och skriv din e-postadress, till exempel "admin@spgeo.com.br".
8. Spara ('Lägg till applikation').

> **Vad detta gjorde:**Om du försöker öppna `omniroute.yourglobal.com` landar det inte längre på din OmniRoute-applikation! Den landar på en elegant Cloudflare-skärm som ber dig att ange din e-post. Endast om du (eller e-postmeddelandet du angav) skrivs in där får du en tillfällig 6-siffrig kod i Outlook/Gmail som låser upp tunneln till port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard gäller inte för API-rutten (`api.yourglobal.com`), eftersom det är en programmatisk åtkomst via automatiserade verktyg (agenter) utan webbläsare. För detta kommer vi att använda Cloudflares huvudbrandvägg (WAF).

1. Gå till**Normal Cloudflare Dashboard**(dash.cloudflare.com) och gå till din domän.
2. I den vänstra menyn, gå till**Säkerhet > WAF > Prisbegränsande regler**.
3. Klicka på**Skapa regel**. 4.**Namn:**`OmniRoute API Anti-Abuse` 5.**Om inkommande förfrågningar matchar...**
   - Välj Fält: `Värdnamn`
   - Operatör: "likar med".
   - Värde: `api.yourglobal.com`
4. Under**Med samma egenskaper:**Behåll "IP".
5. För gränserna (gräns): -**När förfrågningar överstiger:**`50` -**Period:**"1 minut".
6. I slutet, under**Åtgärd**: "Blockera" och bestäm om blockeringen varar i 1 minut eller 1 timme. 9.**Distribuera**.

> **Vad detta gjorde:**Ingen kan skicka mer än 50 förfrågningar under en 60-sekundersperiod till din API-URL. Eftersom du kör flera agenter och förbrukningen bakom dem redan når hastighetsgränser och spårar tokens, är detta bara en åtgärd på Internet Edge Layer som skyddar din On-Premises Instance från att gå ner på grund av termisk stress innan trafiken ens går ner i tunneln.---

## Finalization

1. Din virtuella dator**har inga exponerade portar**i `/etc/ufw`.
2. OmniRoute talar bara HTTPS utgående (`molnflared`) och tar inte emot direkt TCP från världen.
3. Dina förfrågningar till OpenAI fördunklas eftersom vi globalt har konfigurerat dem att passera genom en SOCKS5 Proxy (molnet bryr sig inte om SOCKS5 eftersom det kommer inkommande).
4. Din webbinstrumentpanel har 2-faktorsautentisering med e-post.
5. Ditt API är hastighetsbegränsat vid kanten av Cloudflare och trafikerar endast Bearer Tokens.
