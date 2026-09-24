# Remote Mode (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

`omniroute` CLI તમારા લેપટોપ પર ચલાવો, જ્યારે OmniRoute પોતે અન્ય કોઈ જગ્યાએ ચાલતું હોય
(VPS, હોમ સર્વર, તમારા Tailnet પરનું બીજું મશીન). તમે `omniroute connect` વડે
એકવાર લૉગ ઇન કરો છો અને ત્યારથી **દરેક** CLI કમાન્ડ તે રિમોટ સર્વરને લક્ષ્ય બનાવે
છે — એ જ કમાન્ડ્સ, એ જ આઉટપુટ, ફક્ત રિમોટ પર ચલાવવામાં આવે છે.

ઇન્સ્ટોલ કરવા માટે કોઈ બીજું ટૂલ નથી: રિમોટ મોડ એટલે નિયમિત `omniroute` CLI
વત્તા મર્યાદિત કાર્યક્ષેત્રવાળા **ઍક્સેસ ટોકન્સ**.

```bash
npm install -g omniroute                 # સામાન્ય CLI
omniroute connect 192.168.0.15           # લૉગ ઇન કરો (પાસવર્ડ → મર્યાદિત કાર્યક્ષેત્રવાળો ટોકન)
omniroute models list                    # ← હવે રિમોટ સર્વરના મોડલ્સ સૂચિબદ્ધ કરે છે
omniroute configure codex                # ← રિમોટ કૅટલૉગમાંથી સ્થાનિક Codex પ્રોફાઇલ લખે છે
```

---

## તે કેવી રીતે કાર્ય કરે છે

```
તમારું લેપટોપ                           રિમોટ OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (પાસવર્ડ → ટોકન)          │
│  સંદર્ભ: vps       │ ───────────────►  │ મર્યાદિત કાર્યક્ષેત્રવાળો     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ ઍક્સેસ ટોકન બનાવે છે; દરેક     │
│ કન્ફિગ્સ સ્થાનિક   │ ◄───────────────  │ મેનેજમેન્ટ રૂટ પર ટોકનના        │
│ રીતે લખે છે        │                   │ કાર્યક્ષેત્રની ચકાસણી થાય છે    │
└────────────────────┘                   └───────────────────────────────┘
```

- **સંદર્ભો** દરેકમાં એક સર્વર સંગ્રહે છે (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` સક્રિય સર્વરને બદલે છે; `default` સ્થાનિક છે.
- **ઍક્સેસ ટોકન્સ** (`oma_live_…`) મેનેજમેન્ટ કમાન્ડ્સને અધિકૃત કરે છે. તેઓ
  ઇન્ફરન્સ API કીઝથી (`sk-…`, જે `/v1/chat/completions` માટે વપરાય છે) અલગ છે.
- સર્વર પર ટોકનનો ફક્ત SHA-256 હૅશ સંગ્રહવામાં આવે છે. સાદું લખાણ બનાવતી વખતે
  **એકવાર** બતાવવામાં આવે છે.

---

## કનેક્ટ કરવું

### મેનેજમેન્ટ પાસવર્ડ વડે (બુટસ્ટ્રૅપ)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 માટે મેનેજમેન્ટ પાસવર્ડ: ********
# ✔ http://192.168.0.15:20128 સાથે કનેક્ટ થયું — સંદર્ભ '192.168.0.15' (કાર્યક્ષેત્ર: admin)
```

પાસવર્ડ પ્રવાહ ડિફૉલ્ટ રીતે **admin** ટોકન બનાવે છે (પાસવર્ડ તમારી પાસે છે, તેથી
તમારી પાસે પહેલેથી જ સંપૂર્ણ નિયંત્રણ છે). `--scope` વડે કાર્યક્ષેત્ર ઘટાડો:

```bash
omniroute connect 192.168.0.15 --scope write
```

વિકલ્પો: `--port <p>` (જ્યારે હોસ્ટમાં પોર્ટ ન હોય), `--name <ctx>` (સંદર્ભનું નામ),
`--scope read|write|admin`. સંપૂર્ણ URL જેમ છે તેમ સ્વીકારવામાં આવે છે:
`omniroute connect https://omni.example.com`.

### અગાઉથી બનાવેલા ટોકન વડે

ડૅશબોર્ડમાં (અથવા `omniroute tokens create` વડે) મર્યાદિત કાર્યક્ષેત્રવાળો ટોકન
બનાવો અને તેને પેસ્ટ કરો — પાસવર્ડની જરૂર નથી:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI `GET /api/cli/whoami` દ્વારા તેની માન્યતા ચકાસે છે અને તેને સક્રિય સંદર્ભ તરીકે સાચવે છે.

---

## કાર્યક્ષેત્રો

ત્રણ સ્તરો, અધિક્રમિક (`admin ⊃ write ⊃ read`):

| કાર્યક્ષેત્ર | શું કરી શકાય                                                                   |
| ------------ | ------------------------------------------------------------------------------ |
| `read`       | સૂચિ/નિરીક્ષણ — `models list`, `providers status`, `logs`, `usage`, `cost`     |
| `write`      | read **+** કન્ફિગર/લાગુ — `setup-codex`, `keys add`, `config set`, સંયોજનો     |
| `admin`      | write **+** વ્યવસ્થાપન — `tokens` CRUD, પ્રોવાઇડર્સ ઉમેરવા, સેવાઓ, નીતિ, oauth |

સર્વર HTTP મેથડ પરથી દરેક રૂટ માટે જરૂરી કાર્યક્ષેત્રનું અનુમાન કરે છે
(`GET`→read, ફેરફારો→write), ઉપરાંત સંવેદનશીલ ક્ષેત્રો માટે admin અનુમતિસૂચિ
(`/api/cli/tokens`, `/api/providers` ફેરફારો, `/api/oauth`, `/api/services`, …).
અપૂરતું કાર્યક્ષેત્ર ધરાવતા ટોકનને સ્પષ્ટ સંદેશ સાથે `403` મળે છે.

> જે રૂટ્સ પ્રોસેસ શરૂ કરે છે (`/api/services/*`, `/api/mcp/*`, …) તેઓ
> **ફક્ત loopback** માટે જ રહે છે — કાર્યક્ષેત્ર ગમે તે હોય, રિમોટ ટોકન ક્યારેય તેમના સુધી પહોંચી શકતું નથી.

---

## રિમોટ ઇન્સ્ટોલેશન પર Antigravity કનેક્ટ કરવું

Antigravity Googleની firstparty/nativeapp સંમતિ સ્ક્રીનનો ઉપયોગ કરે છે. Google
ઑથોરાઇઝેશન કોડ ફક્ત ત્યારે જ રિલીઝ કરે છે, જ્યારે **લૂપબૅક રીડાયરેક્ટ**
(`http://127.0.0.1:<port>/callback`) **સાઇન-ઇનને મંજૂરી આપતા બ્રાઉઝરમાંથી
પહોંચી શકાય તેવું હોય**. રિમોટ VPS ઇન્સ્ટોલેશન પર આ લૂપબૅક તમારા મશીન પર નહીં,
પરંતુ સર્વર પર હોય છે, તેથી સંમતિ સ્ક્રીન **કાયમ માટે અટકી જાય છે અને ક્યારેય
કોડ આપતી નથી** — સામાન્ય "કૉલબૅક URL પેસ્ટ કરો" ફૉલબૅકમાં પેસ્ટ કરવા માટે કશું
હોતું નથી. (આ Google તરફથી લાદવામાં આવેલી મર્યાદા છે: બિલ્ટ-ઇન Antigravity
ડેસ્કટૉપ ક્લાયન્ટનો ઉપયોગ કરતા કોઈપણ પ્રૉક્સીમાં આવું જ થાય છે, ફક્ત OmniRouteમાં
નહીં.)

તમે અટવાઈ જાઓ તે પહેલાં જ ડૅશબોર્ડ આ સ્થિતિ શોધી કાઢે છે: localhost સિવાયના
ઍડ્રેસ પરથી **Providers → Antigravity → Connect** ખોલવાથી સામાન્ય "કૉલબૅક URL
કૉપિ કરો" સૂચનને બદલે નીચેના બે ઉપાયો દેખાય છે, જેમાં તમારું હોસ્ટ અને પોર્ટ પહેલેથી
જ ભરેલાં હોય છે. (LAN ઍડ્રેસ પણ આમાં ગણાય છે — આ કૉલબૅકના સંદર્ભમાં
`192.168.x.x` localhost નથી.)

Antigravityને રિમોટ OmniRoute સાથે કનેક્ટ કરવાની બે સમર્થિત રીતો છે.

### વિકલ્પ A — લોકલ લૉગિન હેલ્પર (ભલામણ કરેલ)

OAuthને **તમારા પોતાના કમ્પ્યુટર પર** ચલાવો, જ્યાં `127.0.0.1` પહોંચી શકાય તેવું
હોય. હેલ્પર Google સાથે સીધી વાતચીત કરે છે, તેથી જ્યાં ડૅશબોર્ડનું સંસ્કરણ પૂર્ણ
ન થઈ શકે ત્યાં સંમતિ પ્રક્રિયા પૂર્ણ થાય છે.

**જો તમે પહેલેથી કનેક્ટ થયેલા હોવ** (`omniroute connect <host>`), તો કૉપિ કરવા
માટે કશું નથી — હેલ્પર તમારા માટે તે ઇન્સ્ટોલેશન સુધી ક્રેડેન્શિયલ પહોંચાડે છે:

```bash
# તમારા LOCAL મશીન પર (Node.js + બ્રાઉઝર જરૂરી છે):
omniroute connect 192.168.0.15        # એક વખત — ઍડમિન-સ્કોપ્ડ કોન્ટેક્સ્ટ ટોકન બનાવે છે
npx omniroute login antigravity
#   ↳ Google સંમતિ ખોલે છે, લોકલ લૂપબૅક પોર્ટ પર કૉલબૅક કૅપ્ચર કરે છે,
#     તેનું એક્સચેન્જ કરે છે અને સક્રિય કોન્ટેક્સ્ટ પર ક્રેડેન્શિયલ POST કરે છે:
#
#   Antigravity http://192.168.0.15:20128 પર કનેક્ટ થયું (કનેક્શન abc123).
#   પેસ્ટ કરવા માટે કશું નથી — તમે આ ટર્મિનલ બંધ કરી શકો છો.
```

જ્યારે પણ સક્રિય કોન્ટેક્સ્ટ બીજા મશીન તરફ નિર્દેશ કરતો હોય ત્યારે પુશ આપમેળે થાય
છે. `--push` / `--no-push` વડે તેને કોઈપણ રીતે ફરજિયાત કરો, અથવા
`--context <name>` વડે કોઈ ચોક્કસ કોન્ટેક્સ્ટને લક્ષ્ય બનાવો.

**જો તમારું મશીન VPS સુધી પહોંચી ન શકતું હોય** (ફાયરવૉલ લાગુ હોય, SSH ન હોય,
અથવા એર-ગૅપ્ડ ડેસ્ક હોય), તો પણ હેલ્પર કામ કરે છે — તેને માત્ર Googleની જ
_જરૂર_ હોય છે. `--no-push`નો ઉપયોગ કરો, અથવા પુશને નિષ્ફળ થવા દો: તમે પહેલેથી
પૂર્ણ કરેલું ઑથોરાઇઝેશન કાઢી નાખવાને બદલે તે બ્લૉબ પ્રિન્ટ કરવા પર પાછું જાય છે.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

પછી, **રિમોટ** ડૅશબોર્ડમાં: **Providers → Antigravity → Connect** પર જાઓ અને
`omniroute-cred-v1.…` બ્લૉબને **Step 2** ફીલ્ડમાં પેસ્ટ કરો (તે કૉલબૅક URL અથવા
ક્રેડેન્શિયલ બ્લૉબ, બંને સ્વીકારે છે). OmniRoute તેને ડિકોડ કરે છે, સર્વર-સાઇડ પર
Cloud Code ઑનબોર્ડિંગ ચલાવે છે અને કનેક્શનને કાયમી રીતે સાચવે છે.

> બ્લૉબમાં રિફ્રેશ ટોકન હોય છે — તેને પાસવર્ડની જેમ સુરક્ષિત રાખો. પુશ પાથ પર તે
> તમારા કોન્ટેક્સ્ટના ઑથેન્ટિકેટેડ કનેક્શન મારફતે એક વખત મોકલાય છે; પેસ્ટ પાથ પર,
> તમારા ડૅશબોર્ડ કનેક્શન મારફતે મોકલાય છે. બંને સ્થિતિમાં તે સંગ્રહસ્થાને
> એન્ક્રિપ્ટેડ રૂપે સાચવવામાં આવે છે, અને સફળ પુશ તેને તમારા ટર્મિનલ પર ક્યારેય
> પ્રિન્ટ કરતું નથી.

ફ્લૅગ્સ: `--no-browser` (આપમેળે ખોલવાને બદલે URL પ્રિન્ટ કરો), `--port <n>`
(લૂપબૅક પોર્ટ નિશ્ચિત કરો), `--timeout <ms>`, `--push` / `--no-push` (આપમેળે
ડિલિવરીને ઓવરરાઇડ કરો), `--context <name>` (કોઈ ચોક્કસ કોન્ટેક્સ્ટને લક્ષ્ય બનાવો).

### વિકલ્પ B — SSH લોકલ-ફૉર્વર્ડ ટનલ

જો તમારી પાસે VPSની SSH ઍક્સેસ હોય, તો ડૅશબોર્ડ પોર્ટને ફૉર્વર્ડ કરો જેથી લૂપબૅક
કૉલબૅક ટનલ મારફતે ફરી સર્વર સુધી પહોંચે:

```bash
# તમારા LOCAL મશીન પર:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# પછી તમારા LOCAL બ્રાઉઝરમાં http://localhost:20128 ખોલો અને Antigravityને
# સામાન્ય રીતે કનેક્ટ કરો — હવે 127.0.0.1:20128/callback રીડાયરેક્ટ SSH મારફતે VPS સુધી પહોંચે છે.
```

તમે ડૅશબોર્ડ સુધી `localhost:20128` તરીકે પહોંચો છો, તેથી Google સંમતિ પૂર્ણ થાય
છે અને કૉલબૅક એ જ ટનલ મારફતે સર્વર સુધી પહોંચાડવામાં આવે છે — કોઈ બ્લૉબની જરૂર
નથી. કનેક્શન સક્રિય દેખાય ત્યાં સુધી ટનલ ખુલ્લી રાખો.

નીચે આપેલા ફિક્સ્ડ-લૂપબૅક પ્રોવાઇડર્સથી વિપરીત, અહીં **એક ફૉર્વર્ડ પૂરતું છે**:
Antigravity કૉલબૅક ડૅશબોર્ડ પોર્ટનો જ ઉપયોગ કરે છે, તેથી ટનલ કરવા માટે કોઈ બીજો
પ્રોવાઇડર-વિશિષ્ટ પોર્ટ નથી.

> સંપૂર્ણપણે હેડલેસ વિકલ્પ તરીકે (હેલ્પર નહીં, ટનલ નહીં), તમારા **પોતાના**
> Google OAuth વેબ ક્રેડેન્શિયલ્સ + જાહેર બેઝ URL કૉન્ફિગર કરો; પ્રોવાઇડરના OAuth
> એન્વાયરમેન્ટ વેરિએબલ્સ જુઓ. ઉપરના બે વિકલ્પો માટે કોઈ વધારાના Google સેટઅપની
> જરૂર નથી.

---

## રિમોટ ઇન્સ્ટોલેશન પર Codex / Grok કનેક્ટ કરવું (નિશ્ચિત-loopback પ્રોવાઇડર્સ)

Codex, xAI (`xai-oauth`) અને Grok CLI (`grok-cli`) તેમની અપસ્ટ્રીમ OAuth ઍપ સાથે
**નિશ્ચિત** loopback `redirect_uri` રજિસ્ટર કરે છે. OmniRoute તેને બદલી શકતું નથી —
પ્રોવાઇડર હંમેશાં બ્રાઉઝરને એ જ હાર્ડકોડ કરેલા સરનામા પર પાછું મોકલે છે:

| પ્રોવાઇડર   | પ્રોવાઇડર જે નિશ્ચિત callback પર રીડાયરેક્ટ કરે છે |
| ----------- | -------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`              |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                  |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                  |

અહીં `localhost`નો અર્થ **જે મશીન પર બ્રાઉઝર ચાલી રહ્યું છે તે** થાય છે, જ્યારે
OmniRouteનું PKCE callback સર્વર **સર્વરના** loopback પર સાંભળે છે. ડૅશબોર્ડને
`http://192.168.0.15:20128` જેવા LAN સરનામે ખોલો તો બંને ક્યારેય જોડાતા નથી:
authorization code તમારા પોતાના લૅપટૉપના `localhost:1455` પર પહોંચાડવામાં આવે છે,
જ્યાં કશું સાંભળી રહ્યું નથી, અને પ્રોવાઇડર કોઈ ભૂલ દર્શાવ્યા વિના સાઇન-ઇન નિષ્ફળ કરે છે.

ડૅશબોર્ડ popup ખોલતા પહેલાં આ સ્થિતિ શોધી કાઢે છે અને લૉગિનને મૌન રીતે નિષ્ફળ થવા
દેવાને બદલે tunnel command બતાવે છે (#8046).

### ઉકેલ — **બંને** પોર્ટ ફોરવર્ડ કરો

```bash
# જે મશીન પર BROWSER ચાલી રહ્યું છે તેના પર:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# પછી http://localhost:20128 પર જાઓ અને ત્યાંથી Codex કનેક્ટ કરો
```

બે forwards જરૂરી છે, અને માત્ર એકને ફોરવર્ડ કરવાથી હજી પણ નિષ્ફળતા થાય છે:

- **`20128`** (ડૅશબોર્ડ પોર્ટ) originને ખરેખર-localhost બનાવે છે, જેના કારણે
  OmniRoute PKCE callback સર્વરને શરૂ કરે છે — LAN origin ક્યારેય તે branch સુધી
  પહોંચતું નથી.
- **`1455`** (પ્રોવાઇડરનો નિશ્ચિત callback પોર્ટ) એ સ્થાન છે જ્યાં બ્રાઉઝરને પાછું
  મોકલવામાં આવે છે; તેને tunnel મારફતે સર્વરના loopback સુધી પહોંચવું જરૂરી છે.

xAI અથવા Grok CLI કનેક્ટ કરતી વખતે `1455`ને `56121`/`56122`થી અને `20128`ને
તમારા વાસ્તવિક ડૅશબોર્ડ પોર્ટથી બદલો. કનેક્શન active તરીકે દેખાય ત્યાં સુધી tunnel
ખુલ્લી રાખો.

> **SSH ઍક્સેસ નથી?** Codex અને Grok CLI પેસ્ટ કરેલું token પણ સ્વીકારે છે —
> connect dialogમાં રહેલું **Paste API Key** / **Import auth.json** tab. આ પાથમાં
> કોઈ loopback callback નથી, તેથી તે કોઈપણ origin પરથી કાર્ય કરે છે. Codex ઉપરાંત
> માત્ર access token અથવા `~/.codex/auth.json` session blob પણ સ્વીકારે છે.

---

## Tokensનું સંચાલન

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ secret માત્ર એક જ વાર પ્રિન્ટ કરે છે — તેને અત્યારે જ કૉપી કરો
omniroute tokens list                 # masked: id, નામ, scope, prefix, સ્થિતિ, સમાપ્તિ
omniroute tokens revoke <id|prefix>   # તરત જ revoke કરો
omniroute tokens scopes               # ત્રણ scopes સમજાવો
```

`tokens` commands માટે **admin** credential જરૂરી છે. તમે ડૅશબોર્ડમાં
**Settings → Access Tokens** હેઠળ પણ tokensનું સંચાલન કરી શકો છો (બનાવો, revoke કરો,
માત્ર-એક-વાર કૉપી કરો).

---

## રિમોટ catalogમાંથી coding CLI કૉન્ફિગર કરવું

`omniroute configure` **active serverનું** live model catalog વાંચે છે અને
**તમારા** મશીન પર config લખે છે.

```bash
omniroute configure codex
#   પ્રોવાઇડર્સ: glm, kmc, ollamacloud, opencode-go, …
#   પ્રોવાઇડર: glm
#   Model id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml લખ્યું
#   તેનો ઉપયોગ કરો:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# વારંવાર ઉપયોગમાં લેવાતા modelને interactive pickerની ટોચ પર રાખો
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Picker સ્થાનિક `model-preferences.json` ફાઇલમાં માત્ર model IDs જ રાખે છે
(URLs અથવા credentials ક્યારેય નહીં), જેને context અને CLI target મુજબ scope
કરવામાં આવે છે. તાજેતરની selections પહેલાં favorites બતાવવામાં આવે છે; પસંદ કરેલા
modelને તે context/target યાદીમાંથી દૂર કરવા માટે `--unfavorite`નો ઉપયોગ કરો.

લખાયેલ profile env var (`OMNIROUTE_API_KEY`) દ્વારા inference keyનો સંદર્ભ આપે
છે — secret ક્યારેય disk પર લખાતું નથી. એક-વખતના મૂળભૂત Codex setup
(`[model_providers.omniroute]` block) માટે,
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) જુઓ.

### રિમોટ સામે CLI શરૂ કરવું (કોઈ config લખ્યા વિના)

`omniroute run <target>` પણ active contextનું પાલન કરે છે: રિમોટ base URL અને
context credential માત્ર શરૂ કરેલી processમાં જ inject કરવામાં આવે છે.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → રિમોટ
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# ચોક્કસ કઈ process શરૂ થશે તેનું preview જુઓ (માત્ર env KEY NAMES, values ક્યારેય નહીં):
omniroute run codex --dry-run --json
```

Targets: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(એકમાત્ર source: `bin/cli/cli-manifest.mjs`). Qwen અને Gemini અસ્થાયી અલગ કરેલા
home સાથે ચાલે છે, જેને બહાર નીકળતી વખતે દૂર કરવામાં આવે છે, તેથી launch ક્યારેય
તમારા અંગત tool configurationને સ્પર્શતું નથી — અથવા તેમાં leak થતું નથી.

### દરેક-CLI માટે setup commands

દરેક સમર્થિત CLI પાસે રિમોટથી વાકેફ setup command છે (બધા active contextનું
પાલન કરે છે, અથવા `--remote <url> --api-key <key>`):

| CLI         | કમાન્ડ                     | તે શું લખે છે                                                                                                                                                                  |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` પ્રોફાઇલ્સ (દરેક મોડેલ માટે)                                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (દરેક મોડેલ માટે)                                                                                                                    |
| OpenCode    | `omniroute setup-opencode` | દરેક કેટલોગ મોડેલ સાથેનો `omniroute` openai-સુસંગત પ્રોવાઇડર ધરાવતી `~/.config/opencode/opencode.json` (`opencode -m omniroute/<model>` ચલાવો)                                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI મોડ) + પેસ્ટ કરવા માટે VS Code એક્સ્ટેન્શન સેટિંગ્સ પ્રિન્ટ કરે છે (OpenAI-સુસંગત, Base URL `/v1` **વિના**)                    |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` સેટિંગ્સ — OpenAI-સુસંગત, Base URL `/v1` **સાથે**                                                                 |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` `/v1` **સાથે**, `${{ secrets.OMNIROUTE_API_KEY }}` દ્વારા કી                          |
| Cursor      | `omniroute setup-cursor`   | ઍપમાં કરવાનાં પગલાં પ્રિન્ટ કરે છે (Settings → Models → Override OpenAI Base URL `/v1` **સાથે** + કી + મોડેલ). Cursor કૉન્ફિગ અસ્પષ્ટ SQLite છે — ફક્ત ચૅટ પૅનલ                |
| Roo Code    | `omniroute setup-roo`      | Roo ઇમ્પોર્ટ JSON (`~/.omniroute/roo-settings.json`) લખે છે + `roo-cline.autoImportSettingsPath` સેટ કરે છે + UI પગલાં પ્રિન્ટ કરે છે (OpenAI-સુસંગત, Base URL `/v1` **સાથે**) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` પ્રોવાઇડર, `base_url` `/v1` **સાથે**, `$OMNIROUTE_API_KEY` દ્વારા કી                                                            |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` `/v1` **વિના** + `GOOSE_MODEL`) + env રીત                                                               |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` `/v1` **વિના** + `model: openai/<id>`) + env રીત (`aider --message --yes`)                                                              |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` એન્ટ્રી + `~/.qwen/.env`માં `OMNIROUTE_API_KEY`                                                                             |

```bash
# OpenCode (openai-સુસંગત પ્રોવાઇડર, બધા કેટલોગ મોડેલ્સ, રિમોટ VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ફક્ત મેળ ખાતાં મોડેલ્સ રાખો
opencode -m omniroute/glm/glm-5.2 "..."          # પહેલાં OMNIROUTE_API_KEY એક્સપોર્ટ કરો
```

> OpenCode વધુ સુવિધાસભર **પ્લગઇન** ઇન્ટિગ્રેશન પણ ધરાવે છે: `omniroute setup opencode`
> (હવે `--remote` દ્વારા રિમોટ-અવેર) `@omniroute/opencode-plugin` ઇન્સ્ટૉલ કરે છે.
> `setup-opencode` હળવો openai-સુસંગત વિકલ્પ છે. API કીનો સંદર્ભ
> `{env:OMNIROUTE_API_KEY}` દ્વારા આપવામાં આવે છે — તેને ક્યારેય ડિસ્ક પર લખવામાં આવતી નથી.
>
> OpenCode v2 પર તેના બદલે `@omniroute/opencode-plugin-v2` વાપરો: સમાન કેટલોગ,
> અલગ લોડર કૉન્ટ્રૅક્ટ. જ્યારે ઇન્ટિગ્રેશન કનેક્ટ થયેલું હોય ત્યારે તે OpenCodeના પોતાના ક્રેડેન્શિયલ
> સ્ટોરમાંથી કી વાંચે છે, તેથી રિમોટ ગેટવેને `opencode.json`માં કોઈ કીની જરૂર પડતી નથી.

---

## કૉન્ટેક્સ્ટનું સંચાલન (સર્વરો વચ્ચે સ્વિચ કરવું)

**કૉન્ટેક્સ્ટ** એ સાચવેલો સર્વર છે (baseUrl + credential + scope). `omniroute connect`
એક કૉન્ટેક્સ્ટ બનાવે છે અને તેને સક્રિય કરે છે; ત્યાર પછી દરેક કમાન્ડ તેને લક્ષ્ય બનાવે છે. `omniroute contexts` વડે
તેમનું સંચાલન કરો અને તેમની વચ્ચે સ્વિચ કરો:

```bash
omniroute contexts list            # બધા કૉન્ટેક્સ્ટ; સક્રિય કૉન્ટેક્સ્ટ ● વડે ચિહ્નિત છે
omniroute contexts current         # સક્રિય સર્વર, પ્રમાણીકરણની સ્થિતિ, સ્કોપ
```

```text
  | નામ     | મૂળ URL                   | પ્રમાણીકરણ | સ્કોપ | વર્ણન
● | vps     | http://100.67.86.91:20128 | token       | admin | રિમોટ OmniRoute (…)
  | default | http://localhost:20128    | ✗           |       |
```

**સર્વરો સ્વિચ કરો** — ત્યાર પછીની દરેક કમાન્ડ સક્રિય કૉન્ટેક્સ્ટને અનુસરે છે:

```bash
omniroute contexts use vps         # → હવે બધી કમાન્ડ રિમોટ VPSને મોકલાય છે
omniroute tokens list              #   (VPS સામે ચાલે છે)

omniroute contexts use default     # → ફરી localhost પર
omniroute tokens list              #   (લોકલ સર્વર સામે ચાલે છે)
```

**મેન્યુઅલી કૉન્ટેક્સ્ટ ઉમેરો** (`connect`ને બદલે), તેનું નિરીક્ષણ કરો અથવા તેનું નામ બદલો:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "સ્ટેજિંગ બૉક્સ"
omniroute contexts show staging    # એક કૉન્ટેક્સ્ટની સંપૂર્ણ વિગતો
omniroute contexts rename staging stg
```

**કૉન્ટેક્સ્ટ દૂર કરો** — પુષ્ટિ માટે પૂછે છે; તેને ટાળવા માટે `--yes` આપો
(સ્ક્રિપ્ટ્સ / નૉન-ઇન્ટરેક્ટિવ શેલ્સ માટે આવશ્યક છે, જે અન્યથા સુરક્ષિત રીતે ઇનકાર કરે છે):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost)ને દૂર કરી શકાતું નથી. સક્રિય કૉન્ટેક્સ્ટ દૂર કરવાથી
> `default` પર પાછા ફરાય છે. સૂચન: કૉન્ટેક્સ્ટ દૂર કરવાથી માત્ર **લોકલ** સાચવેલું credential દૂર થાય છે —
> ઍક્સેસ ખરેખર સમાપ્ત કરવા માટે સર્વર પર `omniroute tokens revoke <id>` વડે token રદ કરો.

કૉન્ટેક્સ્ટને **એક્સપોર્ટ / ઇમ્પોર્ટ** કરો (દા.ત. તેમને મશીનો વચ્ચે ખસેડવા માટે). જ્યારે OS
keychain ઉપલબ્ધ હોય ત્યારે નવા કૉન્ટેક્સ્ટમાં માત્ર keychain સંદર્ભ જ કાયમી રીતે સચવાય છે; credentialsને
એક્સપોર્ટમાં કૉપિ કરવામાં આવતા નથી:

```bash
omniroute contexts export --out contexts.json     # ડિફૉલ્ટ: stdout
omniroute contexts import contexts.json            # ઓવરરાઇટ; હાલના રાખવા માટે --merge
omniroute contexts migrate --yes                  # લેગસી પ્લેનટેક્સ્ટ tokensને keychainમાં ખસેડો
```

ઉપયોગ કરી શકાય તેવી OS keychain વિનાની headless સિસ્ટમ્સ પર, CLI
`0600` મોડ સાથે `config.json`નો ઉપયોગ કરે છે અને એક વખતની ચેતવણી પ્રિન્ટ કરે છે. આ fallbackમાંથી થયેલા
એક્સપોર્ટ્સ (અને migration પહેલાંના કોઈપણ લેગસી config)ને ગુપ્ત સામગ્રી તરીકે ગણો.

---

## ઝડપી શરૂઆતથી અંત સુધીની ચકાસણી

શરૂઆતથી રિમોટ સેટઅપ ચકાસવા માટે કૉપિ-પેસ્ટ કરી શકાય તેવું જીવનચક્ર — કનેક્ટ કરો, નિર્ધારિત
સ્કોપ ધરાવતો token બનાવો, કમાન્ડ રાઉટ કરો, પાછા સ્વિચ કરો અને સેટઅપ દૂર કરો.
`192.168.0.15`ને તમારા સર્વરના host/IP (Tailscale, LAN અથવા સાર્વજનિક
`https://…` URL)થી બદલો.

```bash
# 1. કનેક્ટ કરો (password → admin token, સક્રિય બનતા કૉન્ટેક્સ્ટ તરીકે સાચવવામાં આવે છે)
omniroute connect 192.168.0.15                 # અથવા: --key oma_live_xxxx  (password વિના)
omniroute contexts current                     # રિમોટ સર્વર + સ્કોપ બતાવે છે

# 2. તેનો ઉપયોગ કરો — હવે મેનેજમેન્ટ કમાન્ડ્સ રિમોટ સામે ચાલે છે
omniroute tokens create --name laptop --scope read   # વધુ મર્યાદિત token બનાવો
omniroute tokens list                                 # રિમોટમાંથી માસ્ક કરેલી સૂચિ

# 3. આગળ-પાછળ સ્વિચ કરો
omniroute contexts use default                 # → લોકલ
omniroute contexts use 192-168-0-15            # → ફરી રિમોટ (`contexts list`માંથી મળેલું નામ)

# 4. સેટઅપ દૂર કરો. નોંધ: `contexts remove` માત્ર લોકલ credential કાઢી નાખે છે —
#    તે સર્વર પરના tokenને રદ કરતું નથી. જો તમે ખરેખર ઍક્સેસ સમાપ્ત કરવા માંગતા હો,
#    તો પહેલાં સર્વર તરફથી તેને રદ કરો.
omniroute tokens revoke <id|prefix>            # સર્વર પરની ઍક્સેસ સમાપ્ત કરે છે
omniroute contexts remove 192-168-0-15 --yes   # લોકલ કૉન્ટેક્સ્ટ દૂર કરે છે (સક્રિય હોય તો પણ → default પર પાછું ફરે છે), કોઈ prompt નહીં
```

> `--yes`, `contexts remove`ને નૉન-ઇન્ટરેક્ટિવ બનાવે છે (સ્ક્રિપ્ટ્સ/CIમાં આવશ્યક; તેના વિના
> નૉન-ઇન્ટરેક્ટિવ shell અટકી જવાને બદલે સુરક્ષિત રીતે ઇનકાર કરે છે). **સક્રિય**
> કૉન્ટેક્સ્ટ દૂર કરવાથી આપમેળે `default` પર પાછા ફરાય છે.

---

## સુરક્ષા નોંધો

- ટોકનનું સાદું લખાણ માત્ર એક વાર બતાવવામાં આવે છે; ફક્ત SHA-256 હૅશ જ સંગ્રહિત કરવામાં આવે છે (API કીઝની જેમ).
- `omniroute connect` લૉગિન માટેના બ્રૂટ-ફોર્સ લૉકઆઉટ અને ઑડિટ લૉગિંગનો ફરી ઉપયોગ કરે છે.
- ટ્રાન્સપોર્ટ માટે HTTPS અથવા Tailnetને પ્રાધાન્ય આપો; માત્ર હોસ્ટ આપવાથી LAN/Tailscaleની સુવિધા માટે ડિફૉલ્ટ રૂપે `http://`
  વપરાય છે — TLS માટે સંપૂર્ણ `https://…` URL આપો.
- પ્રાધાન્ય ધરાવતી સ્થાનિક કૉન્ટેક્સ્ટ ફાઇલ `~/.omniroute/config.json` (`chmod 600`)
  છે, જેમાં માત્ર `credentialRef` હોય છે; ટોકન પોતે OS
  કીચેઇન (`keytar`)માં સંગ્રહિત થાય છે અને લૉગ્સમાં ક્યારેય પ્રિન્ટ થતું નથી. કાર્યરત મૂળ કીચેઇન વિનાના હેડલેસ ઇન્સ્ટોલ્સ
  સ્પષ્ટ ફૉલબૅક તરીકે એ જ `0600` ફાઇલનો ઉપયોગ કરે છે અને
  એક વાર ચેતવણી આપે છે. કીચેઇન બૅકએન્ડ ઇન્સ્ટોલ કર્યા પછી
  `omniroute contexts migrate --yes` વાપરો.

---

## API એન્ડપોઇન્ટ્સ (સંદર્ભ)

| પદ્ધતિ | રૂટ                   | પ્રમાણીકરણ         | સ્કોપ                             |
| ------ | --------------------- | ------------------ | --------------------------------- |
| POST   | `/api/cli/connect`    | મેનેજમેન્ટ પાસવર્ડ | — (સાર્વજનિક, પાસવર્ડથી સુરક્ષિત) |
| GET    | `/api/cli/whoami`     | ઍક્સેસ ટોકન        | વાંચન                             |
| GET    | `/api/cli/tokens`     | ઍક્સેસ ટોકન        | ઍડમિન                             |
| POST   | `/api/cli/tokens`     | ઍક્સેસ ટોકન        | ઍડમિન                             |
| DELETE | `/api/cli/tokens/:id` | ઍક્સેસ ટોકન        | ઍડમિન                             |

સંપૂર્ણ સ્કીમા માટે [openapi.yaml](../openapi.yaml) જુઓ.
