# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Ang gabay na ito ay nagdodokumento ng gold standard ng network infrastructure para protektahan ang**OmniRoute**at secure na ilantad ang iyong application sa internet,**nang hindi nagbubukas ng anumang mga port (Zero Inbound)**.## What was done on your VM?

Pinagana namin ang OmniRoute sa**Split-Port**mode sa pamamagitan ng PM2:

-**Port `20128`:**Tumatakbo**lamang ang API**`/v1`. -**Port `20129`:**Tumatakbo**lamang sa Administrative Dashboard**.

Higit pa rito, ang panloob na serbisyo ay nangangailangan ng `REQUIRE_API_KEY=true`, na nangangahulugang walang ahente ang maaaring kumonsumo ng mga endpoint ng API nang hindi nagpapadala ng isang lehitimong "Bearer Token" na nabuo sa tab na Mga Key ng API ng Dashboard.

Nagbibigay-daan ito sa amin na lumikha ng dalawang ganap na independiyenteng mga panuntunan sa network. Dito pumapasok ang**Cloudflare Tunnel (cloudflared)**.---

## 1. How to Create the Tunnel in Cloudflare

Ang `cloudflared` na utility ay naka-install na sa iyong makina. Sundin ang mga hakbang na ito sa cloud:

1. I-access ang iyong**Cloudflare Zero Trust**dashboard (one.dash.cloudflare.com).
2. Sa kaliwang menu, pumunta sa**Networks > Tunnels**.
3. Mag-click sa**Magdagdag ng Tunnel**, piliin ang**Cloudflared**, at pangalanan itong `OmniRoute-VM`.
4. Ito ay bubuo ng isang command sa screen na tinatawag na "I-install at magpatakbo ng isang connector".**Kailangan mo lang kopyahin ang Token (ang mahabang string pagkatapos ng `--token`)**.
5. Mag-log in sa pamamagitan ng SSH sa iyong virtual machine (o Proxmox Terminal) at isagawa ang: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Nasa bagong likhang Tunnel screen pa rin, pumunta sa tab na**Mga Pampublikong Hostname**at idagdag ang**dalawang**ruta, na sinasamantala ang paghihiwalay na ginawa namin:### Route 1: Secure API (Limited)

-**Subdomain:**`api` -**Domain:**`yourglobal.com` (piliin ang iyong tunay na domain) -**Uri ng Serbisyo:**`HTTP` -**URL:**`127.0.0.1:20128` _(Internal API port)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomain:**`omniroute` o `panel` -**Domain:**`yourglobal.com` -**Uri ng Serbisyo:**`HTTP` -**URL:**`127.0.0.1:20129` _(Internal na App/Visual port)_

Sa puntong ito, naresolba ang "Pisikal" na pagkakakonekta. Ngayon, talagang protektahan natin ito.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Walang lokal na password ang nagpoprotekta sa iyong dashboard nang mas mahusay kaysa sa ganap na pag-alis ng access dito mula sa bukas na internet.

1. Sa dashboard ng Zero Trust, pumunta sa**Access > Applications > Add an application**.
2. Piliin ang**Self-hosted**.
3. Sa**Pangalan ng Application**, ilagay ang `OmniRoute Panel`.
4. Sa**Application domain**, ilagay ang `omniroute.yourglobal.com` (Ang parehong ginamit mo sa "Route 2").
5. I-click ang**Next**.
6. Sa**Rule action**, piliin ang `Allow`. Para sa pangalan ng Panuntunan, ilagay ang `Admin Lang`.
7. Sa**Isama**, sa ilalim ng dropdown na "Selector," piliin ang `Mga Email` at i-type ang iyong email, halimbawa `admin@spgeo.com.br`.
8. I-save (`Magdagdag ng application`).

> **Ano ang ginawa nito:**Kung susubukan mong buksan ang `omniroute.yourglobal.com`, hindi na ito mapupunta sa iyong OmniRoute application! Dumating ito sa isang eleganteng Cloudflare screen na humihiling sa iyong ipasok ang iyong email. Tanging kung ikaw (o ang email na iyong inilagay) ay nai-type doon, makakatanggap ka ng pansamantalang 6 na digit na code sa Outlook/Gmail na magbubukas sa tunnel sa port `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Ang Zero Trust Dashboard ay hindi nalalapat sa ruta ng API (`api.yourglobal.com`), dahil ito ay isang programmatic na pag-access sa pamamagitan ng mga automated na tool (mga ahente) nang walang browser. Para dito, gagamitin namin ang pangunahing Firewall (WAF) ng Cloudflare.

1. I-access ang**Normal Cloudflare Dashboard**(dash.cloudflare.com) at pumunta sa iyong Domain.
2. Sa kaliwang menu, pumunta sa**Security > WAF > Rate limiting rules**.
3. Mag-click sa**Gumawa ng panuntunan**. 4.**Pangalan:**`OmniRoute API Anti-Abuse` 5.**Kung tumugma ang mga papasok na kahilingan...**
   - Pumili ng Field: `Hostname`
   - Operator: `katumbas`
   - Halaga: `api.yourglobal.com`
4. Sa ilalim ng**Na may parehong mga katangian:**Panatilihin ang `IP`.
5. Para sa mga limitasyon (Limit): -**Kapag lumampas ang mga kahilingan:**`50` -**Panahon:**`1 minuto`
6. Sa dulo, sa ilalim ng**Action**: `Block` at magpasya kung ang block ay tatagal ng 1 minuto o 1 oras. 9.**I-deploy**.

> **Ano ang ginawa nito:**Walang sinuman ang maaaring magpadala ng higit sa 50 kahilingan sa loob ng 60 segundo sa iyong API URL. Dahil nagpapatakbo ka ng maraming ahente at ang pagkonsumo sa likod ng mga ito ay umabot na sa mga limitasyon ng rate at sumusubaybay sa mga token, ito ay isang sukat lamang sa Internet Edge Layer na nagpoprotekta sa iyong On-Premises Instance mula sa pagbaba dahil sa thermal stress bago pa man bumaba ang trapiko sa tunnel.---

## Finalization

1. Ang iyong VM**ay walang nakalantad na mga port**sa `/etc/ufw`.
2. Ang OmniRoute ay nagsasalita lamang ng HTTPS outbound (`cloudflared`) at hindi tumatanggap ng direktang TCP mula sa mundo.
3. Na-obfuscate ang iyong mga kahilingan sa OpenAI dahil na-configure namin ang mga ito sa buong mundo na dumaan sa isang SOCKS5 Proxy (Walang pakialam ang cloud sa SOCKS5 dahil darating ito sa Inbound).
4. Ang iyong web dashboard ay may 2-Factor na pagpapatotoo gamit ang Email.
5. Ang iyong API ay limitado sa rate sa gilid ng Cloudflare at nagtra-traffic lamang ng mga Token ng Tagadala.
