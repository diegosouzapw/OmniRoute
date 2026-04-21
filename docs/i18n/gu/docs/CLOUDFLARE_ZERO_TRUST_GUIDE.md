# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

આ માર્ગદર્શિકા**OmniRoute**ને સુરક્ષિત રાખવા માટે નેટવર્ક ઈન્ફ્રાસ્ટ્રક્ચરના ગોલ્ડ સ્ટાન્ડર્ડનું દસ્તાવેજીકરણ કરે છે અને તમારી એપ્લિકેશનને ઈન્ટરનેટ પર સુરક્ષિત રીતે એક્સપોઝ કરે છે,**કોઈપણ પોર્ટ ખોલ્યા વિના (ઝીરો ઈનબાઉન્ડ)**.## What was done on your VM?

અમે PM2 મારફતે**સ્પ્લિટ-પોર્ટ**મોડમાં OmniRoute સક્ષમ કર્યું છે:

-**પોર્ટ `20128`:\*\***માત્ર API**`/v1` ચાલે છે. -**પોર્ટ `20129`:\***\*માત્ર વહીવટી ડેશબોર્ડ**ચાલે છે.

વધુમાં, આંતરિક સેવા માટે `REQUIRE_API_KEY=true` ની જરૂર છે, જેનો અર્થ છે કે ડેશબોર્ડની API કીઝ ટેબમાં જનરેટ થયેલ કાયદેસર "બેરર ટોકન" મોકલ્યા વિના કોઈપણ એજન્ટ API એન્ડપોઇન્ટનો ઉપયોગ કરી શકશે નહીં.

આ અમને બે સંપૂર્ણપણે સ્વતંત્ર નેટવર્ક નિયમો બનાવવા માટે પરવાનગી આપે છે. આ તે છે જ્યાં**ક્લાઉડફ્લેર ટનલ (ક્લાઉડફ્લેર)**આવે છે.---

## 1. How to Create the Tunnel in Cloudflare

તમારા મશીન પર 'ક્લાઉડફ્લાર્ડ' યુટિલિટી પહેલેથી જ ઇન્સ્ટોલ કરેલી છે. ક્લાઉડમાં આ પગલાં અનુસરો:

1. તમારા**Cloudflare Zero Trust**ડેશબોર્ડને ઍક્સેસ કરો (one.dash.cloudflare.com).
2. ડાબી બાજુના મેનૂમાં,**નેટવર્ક > ટનલ**પર જાઓ. 3.**Add a Tunnel**પર ક્લિક કરો,**Cloudflared**પસંદ કરો અને તેને `OmniRoute-VM` નામ આપો.
3. તે સ્ક્રીન પર "ઇન્સ્ટોલ એન્ડ રન એ કનેક્ટર" નામનો આદેશ જનરેટ કરશે.**તમારે માત્ર ટોકનની નકલ કરવાની જરૂર છે (`--ટોકન` પછીની લાંબી સ્ટ્રિંગ)**.
4. તમારા વર્ચ્યુઅલ મશીન (અથવા પ્રોક્સમોક્સ ટર્મિનલ)માં SSH દ્વારા લોગ ઇન કરો અને એક્ઝિક્યુટ કરો: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

હજુ પણ નવી બનાવેલી ટનલ સ્ક્રીન પર,**જાહેર હોસ્ટનામ**ટૅબ પર જાઓ અને અમે બનાવેલા વિભાજનનો લાભ લઈને**બે**રૂટ ઉમેરો:### Route 1: Secure API (Limited)

-**સબડોમેન:**`api` -**ડોમેન:**`yourglobal.com` (તમારું વાસ્તવિક ડોમેન પસંદ કરો) -**સેવાનો પ્રકાર:**`HTTP` -**URL:**`127.0.0.1:20128` _(આંતરિક API પોર્ટ)_### Route 2: Zero Trust Dashboard (Closed)

-**સબડોમેઇન:**`ઓમ્નિરૂટ` અથવા `પેનલ` -**ડોમેન:**`yourglobal.com` -**સેવાનો પ્રકાર:**`HTTP` -**URL:**`127.0.0.1:20129` _(આંતરિક એપ/વિઝ્યુઅલ પોર્ટ)_

આ બિંદુએ, "ભૌતિક" જોડાણ ઉકેલાઈ ગયું છે. હવે આપણે તેને સાચા અર્થમાં ઢાલ કરીએ.---

## 3. Shielding the Dashboard with Zero Trust (Access)

કોઈપણ સ્થાનિક પાસવર્ડ તમારા ડેશબોર્ડને ખુલ્લા ઈન્ટરનેટમાંથી તેની ઍક્સેસને સંપૂર્ણપણે દૂર કરવા કરતાં વધુ સારી રીતે સુરક્ષિત કરતું નથી.

1. ઝીરો ટ્રસ્ટ ડેશબોર્ડમાં,**એક્સેસ > એપ્લિકેશન્સ > એપ્લિકેશન ઉમેરો**પર જાઓ. 2.**સેલ્ફ-હોસ્ટેડ**પસંદ કરો. 3.**એપ્લિકેશન નામ**માં, `OmniRoute Panel` દાખલ કરો. 4.**એપ્લિકેશન ડોમેન**માં, `omniroute.yourglobal.com` દાખલ કરો (તે જ તમે "રૂટ 2" માં ઉપયોગ કર્યો હતો). 5.**આગલું**ક્લિક કરો. 6.**નિયમ ક્રિયા**માં, `મંજૂરી આપો` પસંદ કરો. નિયમના નામ માટે, ફક્ત એડમિન દાખલ કરો. 7.**શામેલ કરો**માં, "પસંદગીકર્તા" ડ્રોપડાઉન હેઠળ, `ઈમેલ` પસંદ કરો અને તમારો ઈમેલ લખો, ઉદાહરણ તરીકે `admin@spgeo.com.br`.
2. સાચવો ('એપ્લિકેશન ઉમેરો').

> **આ શું કર્યું:**જો તમે `omniroute.yourglobal.com` ખોલવાનો પ્રયાસ કરો છો, તો તે તમારી OmniRoute એપ્લિકેશન પર ઉતરશે નહીં! તે એક ભવ્ય Cloudflare સ્ક્રીન પર ઉતરે છે જે તમને તમારું ઇમેઇલ દાખલ કરવાનું કહે છે. જો તમે (અથવા તમે દાખલ કરેલ ઇમેઇલ) ત્યાં ટાઇપ કરેલ હોય, તો જ તમને Outlook/Gmail માં અસ્થાયી 6-અંકનો કોડ પ્રાપ્ત થશે જે પોર્ટ `20129` માટે ટનલને અનલૉક કરે છે.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

ઝીરો ટ્રસ્ટ ડેશબોર્ડ API રૂટ (`api.yourglobal.com`) પર લાગુ પડતું નથી, કારણ કે તે બ્રાઉઝર વિના સ્વચાલિત ટૂલ્સ (એજન્ટ્સ) દ્વારા પ્રોગ્રામેટિક એક્સેસ છે. આ માટે, અમે Cloudflare ની મુખ્ય ફાયરવોલ (WAF) નો ઉપયોગ કરીશું.

1.**સામાન્ય Cloudflare ડેશબોર્ડ**(dash.cloudflare.com) ઍક્સેસ કરો અને તમારા ડોમેન પર જાઓ. 2. ડાબા મેનૂમાં,**સુરક્ષા > WAF > દર મર્યાદા નિયમો**પર જાઓ. 3.**નિયમ બનાવો**પર ક્લિક કરો. 4.**નામ:**`OmniRoute API વિરોધી દુરુપયોગ` 5.**જો ઇનકમિંગ વિનંતીઓ મેળ ખાય છે...**

- ક્ષેત્ર પસંદ કરો: 'હોસ્ટનામ'
- ઓપરેટર: `સમાન`
- મૂલ્ય: `api.yourglobal.com` 6.**સમાન લાક્ષણિકતાઓ સાથે:**હેઠળ `IP` રાખો.

7. મર્યાદાઓ માટે (મર્યાદા): -**જ્યારે વિનંતીઓ વધી જાય:**`50` -**અવધિ:**`1 મિનિટ`
8. અંતે,**Action**હેઠળ: `Block` અને નક્કી કરો કે બ્લોક 1 મિનિટ કે 1 કલાક સુધી ચાલે છે. 9.**જમાવટ**.

> **આ શું કર્યું:**તમારા API URL પર 60-સેકન્ડના સમયગાળામાં કોઈ 50 થી વધુ વિનંતીઓ મોકલી શકશે નહીં. કારણ કે તમે બહુવિધ એજન્ટો ચલાવો છો અને તેમની પાછળનો વપરાશ પહેલેથી જ દરની મર્યાદાને હિટ કરે છે અને ટોકન્સને ટ્રેક કરે છે, આ માત્ર ઇન્ટરનેટ એજ લેયર પરનું એક માપ છે જે તમારા ઑન-પ્રિમિસીસ ઇન્સ્ટન્સને થર્મલ સ્ટ્રેસને કારણે નીચે જવાથી સુરક્ષિત કરે છે.---

## Finalization

1. તમારા VMમાં `/etc/ufw` માં**કોઈ ખુલ્લા પોર્ટ નથી**.
2. OmniRoute માત્ર HTTPS આઉટબાઉન્ડ (`Cloudflared`) પર વાત કરે છે અને વિશ્વમાંથી ડાયરેક્ટ TCP પ્રાપ્ત કરતું નથી.
3. OpenAI ને તમારી વિનંતીઓ અસ્પષ્ટ છે કારણ કે અમે તેમને SOCKS5 પ્રોક્સીમાંથી પસાર થવા માટે વૈશ્વિક સ્તરે રૂપરેખાંકિત કર્યા છે (ક્લાઉડ SOCKS5 ની કાળજી લેતું નથી કારણ કે તે ઇનબાઉન્ડ આવે છે).
4. તમારા વેબ ડેશબોર્ડમાં ઈમેલ સાથે 2-પરિબળ પ્રમાણીકરણ છે.
5. તમારું API ક્લાઉડફ્લેર દ્વારા ધાર પર રેટ-મર્યાદિત છે અને ફક્ત બેરર ટોકન્સ જ ટ્રાફિક કરે છે.
