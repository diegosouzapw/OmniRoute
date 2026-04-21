# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Mwongozo huu unaandika kiwango cha dhahabu cha miundombinu ya mtandao ili kulinda**OmniRoute**na kufichua programu yako kwenye mtandao kwa usalama,**bila kufungua milango yoyote (Zero Inbound)**.## What was done on your VM?

Tuliwasha OmniRoute katika hali ya**Split-Port**kupitia PM2:

-**Bandari `20128`:**Huendesha**API pekee**`/v1`. -**Bandari `20129`:**Huendesha**Dashibodi ya Utawala pekee**.

Zaidi ya hayo, huduma ya ndani inahitaji `REQUIRE_API_KEY=true`, ambayo ina maana kwamba hakuna wakala anayeweza kutumia ncha za API bila kutuma "Bearer Token" halali inayozalishwa katika kichupo cha Vifunguo vya API vya Dashibodi.

Hii inaruhusu sisi kuunda sheria mbili za mtandao huru kabisa. Hapa ndipo**Cloudflare Tunnel (cloudflared)**inapoingia.---

## 1. How to Create the Tunnel in Cloudflare

Huduma ya `cloudflared` tayari imesakinishwa kwenye mashine yako. Fuata hatua hizi katika wingu:

1. Fikia dashibodi yako ya**Cloudflare Zero Trust**(one.dash.cloudflare.com).
2. Katika menyu ya kushoto, nenda kwa**Mitandao > Vichuguu**.
3. Bofya kwenye**Ongeza Tunnel**, chagua**Cloudflared**, na uipe jina `OmniRoute-VM`.
4. Itazalisha amri kwenye skrini inayoitwa "Sakinisha na uendesha kiunganishi".**Unahitaji tu kunakili Ishara (kamba ndefu baada ya `--token`)**.
5. Ingia kupitia SSH kwa mashine yako pepe (au Proxmox Terminal) na utekeleze: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Bado kwenye skrini iliyoundwa upya ya Tunnel, nenda kwenye kichupo cha**Majina ya Wapangishi wa Umma**na uongeze njia**mbili**, ukitumia fursa ya utenganishaji tuliofanya:### Route 1: Secure API (Limited)

-**Kikoa kidogo:**`api` -**Kikoa:**`yourglobal.com` (chagua kikoa chako halisi) -**Aina ya Huduma:**`HTTP` -**URL:**`127.0.0.1:20128` _(Mlango wa ndani wa API)_### Route 2: Zero Trust Dashboard (Closed)

-**Kikoa kidogo:**`omniroute` au `paneli` -**Kikoa:**`yourglobal.com` -**Aina ya Huduma:**`HTTP` -**URL:**`127.0.0.1:20129` _(Programu ya Ndani/Mlango wa Kuonekana)_

Katika hatua hii, muunganisho wa "Mwili" unatatuliwa. Sasa tuilinde kweli.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Hakuna nenosiri la ndani linalolinda dashibodi yako bora kuliko kuondoa kabisa ufikiaji wake kutoka kwa mtandao wazi.

1. Katika dashibodi ya Zero Trust, nenda kwa**Ufikiaji > Programu > Ongeza programu**.
2. Chagua**Mwenyeji mwenyewe**.
3. Katika**Jina la programu**, ingiza `OmniRoute Panel`.
4. Katika**kikoa cha kutuma maombi**, weka `omniroute.yourglobal.com` (Njia ile ile uliyotumia katika "Njia ya 2").
5. Bofya**Inayofuata**.
6. Katika**Kitendo cha sheria**, chagua `Ruhusu`. Kwa jina la Sheria, weka `Msimamizi Pekee`.
7. Katika**Jumuisha**, chini ya menyu kunjuzi ya "Kiteuzi", chagua `Barua pepe` na uandike barua pepe yako, kwa mfano `admin@spgeo.com.br`.
8. Hifadhi (`Ongeza programu`).

> **Jambo hili lilifanya:**Ukijaribu kufungua `omniroute.yourglobal.com`, haitatua tena kwenye programu yako ya OmniRoute! Inatua kwenye skrini ya kifahari ya Cloudflare ikikuuliza uweke barua pepe yako. Ikiwa tu wewe (au barua pepe uliyoweka) itaandikwa hapo, utapokea msimbo wa muda wa tarakimu 6 katika Outlook/Gmail ambao utafungua kichuguu cha kuingiza `20129`.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Dashibodi ya Zero Trust haitumiki kwa njia ya API (`api.yourglobal.com`), kwa sababu ni ufikiaji wa kiprogramu kupitia zana za kiotomatiki (mawakala) bila kivinjari. Kwa hili, tutatumia Firewall kuu ya Cloudflare (WAF).

1. Fikia**Dashibodi ya Kawaida ya Cloudflare**(dash.cloudflare.com) na uende kwenye Kikoa chako.
2. Katika menyu ya kushoto, nenda kwa**Usalama > WAF > Kanuni za kupunguza viwango**.
3. Bonyeza**Unda kanuni**. 4.**Jina:**`OmniRoute API Anti-Buse` 5.**Ikiwa maombi yanayoingia yanalingana...**
   - Chagua Shamba: `Jina la mwenyeji`
   - Opereta: `sawa`
   - Thamani: `api.yourglobal.com`
4. Chini ya**Na sifa zinazofanana:**Weka `IP`.
5. Kwa mipaka (Kikomo): -**Maombi yanapozidi:**`50` -**Kipindi:**`Dakika 1`
6. Mwishoni, chini ya**Kitendo**: `Zuia` na uamue ikiwa kizuizi kitadumu kwa dakika 1 au saa 1. 9.**Weka**.

> **Jambo hili lilifanya:**Hakuna mtu anayeweza kutuma maombi zaidi ya 50 katika kipindi cha sekunde 60 kwa API URL yako. Kwa kuwa unaendesha mawakala wengi na matumizi nyuma yao tayari yamefikia viwango vya viwango na kufuatilia tokeni, hiki ni kipimo tu katika Tabaka la Ukingo wa Mtandao ambacho hulinda Tukio lako la Ndani ya Jengo lisishuke kutokana na msongo wa mafuta kabla ya msongamano hata kushuka kwenye handaki.---

## Finalization

1. VM yako**haina milango iliyofichuliwa**katika `/etc/ufw`.
2. OmniRoute huzungumza tu na HTTPS zinazotoka nje (`cloudflared`) na haipokei TCP ya moja kwa moja kutoka ulimwenguni.
3. Maombi yako kwa OpenAI yamefichwa kwa sababu tuliyasanidi kimataifa ili yapitie Proksi ya SOCKS5 (Wingu haijali SOCKS5 kwa sababu huja kwa Ndani).
4. Dashibodi yako ya wavuti ina uthibitishaji wa 2-Factor na Barua pepe.
5. API yako imepunguzwa viwango ukingoni na Cloudflare na ni traffics Bearer Tokens pekee.
