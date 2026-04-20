# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Tato příručka dokumentuje zlatý standard síťové infrastruktury pro ochranu**OmniRoute**a bezpečné vystavení vaší aplikace internetu,**bez otevírání jakýchkoli portů (Zero Inbound)**.## What was done on your VM?

Aktivovali jsme OmniRoute v režimu**Split-Port**přes PM2:

-**Port `20128`:**Spouští**pouze API**`/v1`. -**Port `20129`:**Spouští**pouze administrativní panel**.

Interní služba navíc vyžaduje `REQUIRE_API_KEY=true`, což znamená, že žádný agent nemůže využívat koncové body API, aniž by odeslal legitimní token nosiče vygenerovaný na kartě Klíče API řídicího panelu.

To nám umožňuje vytvořit dvě zcela nezávislá síťová pravidla. Zde přichází na řadu**Cloudflare Tunnel (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

Nástroj `cloudflared` je již na vašem počítači nainstalován. V cloudu postupujte takto:

1. Otevřete si svůj řídicí panel**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. V levé nabídce přejděte na**Sítě > Tunely**.
3. Klikněte na**Add a Tunnel**, zvolte**Cloudflared**a pojmenujte jej `OmniRoute-VM`.
4. Na obrazovce se vygeneruje příkaz s názvem „Nainstalovat a spustit konektor“.**Stačí zkopírovat token (dlouhý řetězec za `--token`)**.
5. Přihlaste se přes SSH ke svému virtuálnímu počítači (nebo terminálu Proxmox) a proveďte: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Stále na nově vytvořené obrazovce tunelu přejděte na kartu**Veřejné názvy hostitelů**a přidejte**dvě**trasy, přičemž využijte oddělení, které jsme provedli:### Route 1: Secure API (Limited)

-**Subdoména:**`api` -**Doména:**`yourglobal.com` (vyberte svou skutečnou doménu) -**Typ služby:**`HTTP` -**URL:**`127.0.0.1:20128` _(Interní port API)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdoména:**`omniroute` nebo `panel` -**Doména:**`yourglobal.com` -**Typ služby:**`HTTP` -**URL:**`127.0.0.1:20129` _(interní port aplikace/vizuální port)_

V tomto okamžiku je "Fyzická" konektivita vyřešena. Teď to opravdu zaštítíme.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Žádné místní heslo neochrání váš řídicí panel lépe než úplné odstranění přístupu k němu z otevřeného internetu.

1. V řídicím panelu Zero Trust přejděte na**Přístup > Aplikace > Přidat aplikaci**.
2. Vyberte**Sebe-hosted**.
3. Do pole**Název aplikace**zadejte `OmniRoute Panel`.
4. V doméně**Aplikační doména**zadejte „omniroute.yourglobal.com“ (stejný, jaký jste použili v „Route 2“).
5. Klikněte na**Další**.
6. V části**Akce pravidla**zvolte `Povolit`. Jako název pravidla zadejte `Admin Only`.
7. V**Zahrnout**v rozevíracím seznamu „Výběr“ vyberte „E-maily“ a zadejte svůj e-mail, například „admin@spgeo.com.br“.
8. Uložte (`Přidat aplikaci`).

> **Co to udělalo:**Pokud se pokusíte otevřít `omniroute.yourglobal.com`, již se nedostane do vaší aplikace OmniRoute! Přistane na elegantní obrazovce Cloudflare, která vás požádá o zadání e-mailu. Pouze pokud tam zadáte vy (nebo vámi zadaný e-mail), obdržíte dočasný 6místný kód do Outlooku/Gmailu, který odemkne tunel na port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Zero Trust Dashboard se nevztahuje na trasu API (`api.yourglobal.com`), protože se jedná o programový přístup prostřednictvím automatizovaných nástrojů (agentů) bez prohlížeče. K tomu použijeme hlavní Firewall (WAF) Cloudflare.

1. Otevřete**Normal Cloudflare Dashboard**(dash.cloudflare.com) a přejděte do své domény.
2. V levém menu přejděte na**Zabezpečení > WAF > Pravidla omezující rychlost**.
3. Klikněte na**Vytvořit pravidlo**. 4.**Název:**`OmniRoute API Anti-Abuse` 5.**Pokud se příchozí požadavky shodují...**
   - Vyberte pole: `Název hostitele`
   - Operátor: "rovná se".
   - Hodnota: `api.yourglobal.com`
4. V části**Se stejnými charakteristikami:**Ponechte `IP`.
5. Pro limity (Limit): -**Když požadavky překročí:**„50“. -**Období:**`1 minuta`
6. Na konci pod**Akce**: `Blokovat` a rozhodněte, zda blok trvá 1 minutu nebo 1 hodinu. 9.**Nasazení**.

> **Co to udělalo:**Nikdo nemůže odeslat více než 50 požadavků za 60 sekund na vaši adresu URL API. Vzhledem k tomu, že provozujete více agentů a spotřeba za nimi již naráží na limity rychlosti a sleduje tokeny, je to pouze opatření na internetové Edge Layer, které chrání vaši místní instanci před poklesem v důsledku tepelného namáhání ještě předtím, než provoz dokonce klesne tunelem.---

## Finalization

1. Váš VM**nemá žádné vystavené porty**v `/etc/ufw`.
2. OmniRoute mluví pouze odchozí HTTPS (`cloudflared`) a nepřijímá přímé TCP ze světa.
3. Vaše požadavky na OpenAI jsou zmatené, protože jsme je globálně nakonfigurovali tak, aby procházely přes SOCKS5 Proxy (Cloud se o SOCKS5 nestará, protože přichází Inbound).
4. Váš webový panel má dvoufaktorové ověření pomocí e-mailu.
5. Vaše API je limitně omezeno službou Cloudflare a provozuje pouze tokeny nosiče.
