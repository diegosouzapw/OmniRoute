# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Deze handleiding documenteert de gouden standaard van de netwerkinfrastructuur om**OmniRoute**te beschermen en uw applicatie veilig bloot te stellen aan internet,**zonder poorten te openen (Zero Inbound)**.## What was done on your VM?

We hebben OmniRoute in**Split-Port**-modus ingeschakeld via PM2:

-**Poort `20128`:**Voert**alleen de API**`/v1` uit. -**Poort `20129`:**Voert**alleen het beheerdersdashboard uit**.

Bovendien vereist de interne service `REQUIRE_API_KEY=true`, wat betekent dat geen enkele agent de API-eindpunten kan gebruiken zonder een legitiem "Bearer Token" te verzenden dat is gegenereerd op het tabblad API-sleutels van het Dashboard.

Hierdoor kunnen we twee volledig onafhankelijke netwerkregels creëren. Dit is waar de**Cloudflare Tunnel (cloudflared)**in beeld komt.---

## 1. How to Create the Tunnel in Cloudflare

Het hulpprogramma `cloudflared` is al op uw computer geïnstalleerd. Volg deze stappen in de cloud:

1. Ga naar uw**Cloudflare Zero Trust**-dashboard (one.dash.cloudflare.com).
2. Ga in het linkermenu naar**Netwerken > Tunnels**.
3. Klik op**Een tunnel toevoegen**, kies**Cloudflared**en noem deze `OmniRoute-VM`.
4. Er wordt een opdracht op het scherm gegenereerd met de naam "Een connector installeren en uitvoeren".**Je hoeft alleen het token te kopiëren (de lange string na `--token`)**.
5. Log via SSH in op uw virtuele machine (of Proxmox Terminal) en voer het volgende uit: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Ga nog steeds in het nieuw gemaakte Tunnel-scherm naar het tabblad**Openbare hostnamen**en voeg de**twee**routes toe, waarbij u profiteert van de scheiding die we hebben gemaakt:### Route 1: Secure API (Limited)

-**Subdomein:**`api` -**Domein:**`yourglobal.com` (kies uw echte domein) -**Servicetype:**`HTTP` -**URL:**`127.0.0.1:20128` _(Interne API-poort)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomein:**`omniroute` of `panel` -**Domein:**`uwglobal.com` -**Servicetype:**`HTTP` -**URL:**`127.0.0.1:20129` _(Interne app/visuele poort)_

Op dit punt is de "fysieke" connectiviteit opgelost. Laten we het nu echt beschermen.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Geen enkel lokaal wachtwoord beschermt uw dashboard beter dan het volledig verwijderen van de toegang tot het dashboard.

1. Ga in het Zero Trust-dashboard naar**Toegang > Applicaties > Een applicatie toevoegen**.
2. Selecteer**Zelf gehost**.
3. Voer bij**Applicatienaam**'OmniRoute Panel' in.
4. Voer in**Applicatiedomein**`omniroute.yourglobal.com` in (dezelfde die u gebruikte in "Route 2").
5. Klik op**Volgende**.
6. Kies in**Regelactie**`Toestaan`. Voer bij Regelnaam 'Alleen beheerder' in.
7. In**Opnemen**, onder de vervolgkeuzelijst "Selector", kiest u 'E-mails' en typt u uw e-mailadres, bijvoorbeeld 'admin@spgeo.com.br'.
8. Opslaan (`Toevoegen applicatie`).

> **Wat dit deed:**Als u `omniroute.yourglobal.com` probeert te openen, komt deze niet meer terecht in uw OmniRoute-applicatie! Het belandt op een elegant Cloudflare-scherm waarin u wordt gevraagd uw e-mailadres in te voeren. Alleen als u (of het door u ingevoerde e-mailadres) daar wordt getypt, ontvangt u in Outlook/Gmail een tijdelijke 6-cijferige code die de tunnel naar poort `20129` ontgrendelt.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Het Zero Trust Dashboard is niet van toepassing op de API-route (`api.yourglobal.com`), omdat het een programmatische toegang is via geautomatiseerde tools (agents) zonder browser. Hiervoor zullen we de hoofdfirewall (WAF) van Cloudflare gebruiken.

1. Ga naar het**Normale Cloudflare Dashboard**(dash.cloudflare.com) en ga naar uw domein.
2. Ga in het linkermenu naar**Beveiliging > WAF > Regels voor snelheidsbeperking**.
3. Klik op**Regel maken**. 4.**Naam:**`OmniRoute API Anti-Abuse` 5.**Als inkomende verzoeken overeenkomen...**
   - Kies Veld: `Hostnaam`
   - Operator: `is gelijk aan`
   - Waarde: `api.yourglobal.com`
4. Onder**Met dezelfde kenmerken:**`IP` behouden.
5. Voor de limieten (limiet): -**Wanneer verzoeken groter zijn dan:**`50` -**Periode:**`1 minuut`
6. Aan het einde, onder**Actie**: `Blokkeren` en beslis of het blok 1 minuut of 1 uur duurt. 9.**Implementeren**.

> **Wat dit deed:**Niemand kan binnen een periode van 60 seconden meer dan 50 verzoeken naar uw API-URL sturen. Omdat u meerdere agenten gebruikt en het verbruik daarachter al de snelheidslimieten bereikt en tokens bijhoudt, is dit slechts een maatregel op de Internet Edge Layer die uw On-Premises Instance beschermt tegen uitvallen als gevolg van thermische stress voordat het verkeer zelfs maar door de tunnel gaat.---

## Finalization

1. Uw VM**heeft geen zichtbare poorten**in `/etc/ufw`.
2. OmniRoute praat alleen over HTTPS uitgaand (`cloudflared`) en ontvangt geen directe TCP van de wereld.
3. Uw verzoeken aan OpenAI zijn onduidelijk omdat we ze wereldwijd hebben geconfigureerd om via een SOCKS5-proxy te gaan (de cloud geeft niets om SOCKS5 omdat deze inkomend is).
4. Uw webdashboard beschikt over tweefactorauthenticatie met e-mail.
5. Uw API is aan de rand beperkt in snelheid door Cloudflare en verzendt alleen Bearer Tokens.
