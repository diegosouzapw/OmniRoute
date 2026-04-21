# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Acest ghid documentează standardul de aur al infrastructurii de rețea pentru a proteja**OmniRoute**și a vă expune aplicația în siguranță la internet,**fără a deschide niciun port (Zero Inbound)**.## What was done on your VM?

Am activat OmniRoute în modul**Split-Port**prin PM2:

-**Port `20128`:**Rulează**doar API**`/v1`. -**Port `20129`:**Rulează**numai Tabloul de bord administrativ**.

În plus, serviciul intern necesită `REQUIRE_API_KEY=true`, ceea ce înseamnă că niciun agent nu poate consuma punctele finale API fără a trimite un „Bearer Token” legitim generat în fila Chei API a tabloului de bord.

Acest lucru ne permite să creăm două reguli de rețea complet independente. Aici intervine**Cloudflare Tunnel (cloudflare)**.---

## 1. How to Create the Tunnel in Cloudflare

Utilitarul `cloudflared` este deja instalat pe mașina dvs. Urmați acești pași în cloud:

1. Accesați tabloul de bord**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. În meniul din stânga, accesați**Rețele > Tuneluri**.
3. Faceți clic pe**Adăugați un tunel**, alegeți**Cloudflared**și denumiți-l `OmniRoute-VM`.
4. Va genera o comandă pe ecran numită „Instalare și rulare un conector”.**Trebuie doar să copiați Tokenul (șirul lung după `--token`)**.
5. Conectați-vă prin SSH la mașina dvs. virtuală (sau terminalul Proxmox) și executați: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Încă pe ecranul tunel nou creat, accesați fila**Nume de gazdă publice**și adăugați cele**două**rute, profitând de separarea pe care am făcut-o:### Route 1: Secure API (Limited)

-**Subdomeniu:**`api` -**Domeniu:**`yourglobal.com` (alegeți domeniul dvs. real) -**Tip de serviciu:**`HTTP` -**URL:**`127.0.0.1:20128` _(port API intern)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomeniu:**`omniroute` sau `panel` -**Domeniu:**`yourglobal.com` -**Tip de serviciu:**`HTTP` -**URL:**`127.0.0.1:20129` _(Aplicație internă/port vizual)_

În acest moment, conectivitatea „fizică” este rezolvată. Acum să o protejăm cu adevărat.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Nicio parolă locală nu vă protejează tabloul de bord mai bine decât eliminarea completă a accesului la acesta de pe internetul deschis.

1. În tabloul de bord Zero Trust, accesați**Acces > Aplicații > Adăugați o aplicație**.
2. Selectați**Auto-găzduit**.
3. În**Numele aplicației**, introduceți `OmniRoute Panel`.
4. În**Domeniul aplicației**, introduceți `omniroute.yourglobal.com` (același pe care l-ați folosit în „Ruta 2”).
5. Faceți clic pe**Next**.
6. În**Acțiunea regulii**, alegeți „Permite”. Pentru numele regulii, introduceți „Numai admin”.
7. În**Include**, sub meniul drop-down „Selector”, alegeți `E-mails` și introduceți adresa de e-mail, de exemplu `admin@spgeo.com.br`.
8. Salvați (`Adăugați aplicație`).

> **Ce a făcut asta:**Dacă încercați să deschideți `omniroute.yourglobal.com`, nu mai ajunge pe aplicația dvs. OmniRoute! Aterizează pe un ecran elegant Cloudflare, cerându-vă să vă introduceți e-mailul. Doar dacă dvs. (sau e-mailul pe care l-ați introdus) este introdus acolo, veți primi un cod temporar din 6 cifre în Outlook/Gmail care deblochează tunelul către portul `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Tabloul de bord Zero Trust nu se aplică rutei API (`api.yourglobal.com`), deoarece este un acces programatic prin instrumente automate (agenți) fără browser. Pentru aceasta, vom folosi Firewall-ul principal (WAF) al Cloudflare.

1. Accesați**Tabloul de bord normal Cloudflare**(dash.cloudflare.com) și accesați domeniul dvs.
2. În meniul din stânga, accesați**Securitate > WAF > Reguli de limitare a ratei**.
3. Faceți clic pe**Creați regulă**. 4.**Nume:**`OmniRoute API Anti-Abuse` 5.**Dacă cererile primite se potrivesc...**
   - Alegeți Câmp: `Nume gazdă`
   - Operator: `egal`
   - Valoare: `api.yourglobal.com`
4. Sub**Cu aceleași caracteristici:**Păstrați `IP`.
5. Pentru limite (Limita): -**Când cererile depășesc:**`50` -**Perioada:**`1 minut`
6. La sfârșit, sub**Acțiune**: `Blocați` și decideți dacă blocarea durează 1 minut sau 1 oră. 9.**Implementează**.

> **Ce a făcut acest lucru:**Nimeni nu poate trimite mai mult de 50 de solicitări într-o perioadă de 60 de secunde la adresa URL API. Deoarece rulați mai mulți agenți, iar consumul din spatele acestora atinge deja limitele de rată și urmărește token-urile, aceasta este doar o măsură la nivelul Internet Edge Layer care vă protejează instanța locală împotriva scăderii din cauza stresului termic înainte ca traficul să coboare chiar în tunel.---

## Finalization

1. VM-ul dvs.**nu are porturi expuse**în `/etc/ufw`.
2. OmniRoute vorbește numai HTTPS în ieșire (`cloudflared`) și nu primește TCP direct din lume.
3. Solicitările dvs. către OpenAI sunt obscucate deoarece le-am configurat la nivel global să treacă printr-un proxy SOCKS5 (Norului nu-i pasă de SOCKS5 deoarece vine Inbound).
4. Tabloul de bord web are autentificare în doi factori cu e-mail.
5. API-ul dvs. este limitat la limita de rată de Cloudflare și face trafic numai cu Bearer Tokens.
