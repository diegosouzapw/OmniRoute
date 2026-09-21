# Developer environment notes (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

આ પાનું પ્રોજેક્ટની સ્થાનિક `.env` વર્તણૂક અને OmniRoute વિકસાવતી વખતે એન્વાયરમેન્ટ ફાઇલો તથા સિક્રેટ્સને કેવી રીતે સંભાળવા તે સમજાવે છે.

## .env postinstall વર્તણૂક

વિકાસકર્તાની સુવિધા માટે પ્રોજેક્ટ `npm install` / `postinstall` દરમિયાન સ્થાનિક `.env` ફાઇલ જનરેટ કરી શકે છે. આ ફાઇલ માત્ર સ્થાનિક ડેવલપમેન્ટ અને પરીક્ષણ માટે જ છે અને તેને ક્યારેય વર્ઝન કન્ટ્રોલમાં કમિટ કરવી જોઈએ નહીં.

મુખ્ય મુદ્દાઓ:

- રિપોઝિટરીની `.gitignore` પહેલેથી જ `.env*` ફાઇલોને અવગણે છે (`.gitignore` એન્ટ્રી જુઓ). જ્યાં સુધી તમે ઇરાદાપૂર્વક કોઈ ચોક્કસ ઉદાહરણ ફાઇલ કમિટ કરવા માંગતા ન હો અને તેના માટે દસ્તાવેજીકૃત પ્રક્રિયા ન હોય, ત્યાં સુધી તે નિયમને દૂર કરશો નહીં કે બદલશો નહીં.
- જો કોઈ વાસ્તવિક સિક્રેટ આકસ્મિક રીતે રિપોમાં કમિટ થઈ જાય, તો ક્રેડેન્શિયલને તાત્કાલિક રોટેટ/રિવોક કરો અને તેને રિપોઝિટરીના ઇતિહાસમાંથી દૂર કરો (ઉદાહરણ તરીકે, `git filter-repo` અથવા સમકક્ષ સુધારાત્મક વર્કફ્લોનો ઉપયોગ કરીને). જો તમને મદદની જરૂર હોય, તો સુરક્ષા/સંપર્કના જવાબદાર વ્યક્તિનો સંપર્ક કરો.
- CI અને પ્રોડક્શન માટે, સિક્રેટ્સને ફાઇલોમાં કમિટ કરવાને બદલે CI સિક્રેટ્સ અથવા સિક્રેટ્સ મેનેજર (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault વગેરે) નો ઉપયોગ કરો.

## ભલામણ કરેલ સ્થાનિક વર્કફ્લો

- `.env` ને માત્ર તમારા સ્થાનિક વર્કસ્પેસમાં રાખો. જરૂરી વેરિએબલ્સ અને સ્વીકાર્ય ઉદાહરણ મૂલ્યોનું દસ્તાવેજીકરણ કરવા માટે `.env.example` (જે પહેલેથી ટ્રૅક થયેલી છે) નો ઉપયોગ કરો.
- સિક્રેટ જેવા મૂલ્યોની જરૂર હોય તેવા પરીક્ષણો સ્થાનિક રીતે ચલાવતી વખતે, વાસ્તવિક ક્રેડેન્શિયલ્સને બદલે કૃત્રિમ પ્લેસહોલ્ડર્સ અથવા રનટાઇમ દરમિયાન જનરેટ થતી અલ્પજીવી કીઝને પ્રાધાન્ય આપો.
- પ્લેસહોલ્ડર્સનો ઉપયોગ કરતા પરીક્ષણોમાં ટૂંકી ટિપ્પણી ઉમેરો, જેથી સમીક્ષકો સમજી શકે કે ફિક્સ્ચર કૃત્રિમ છે.

## સ્કેનર નોંધો

- કેટલીક કમ્પાઇલ કરેલી અથવા બાઇનરી એસેટ્સ (દા.ત., એમ્બેડ કરેલા base64 WASM બ્લોબ્સ) માં ક્રેડેન્શિયલ્સ જેવા દેખાતા ASCII સબસ્ટ્રિંગ્સ હોઈ શકે છે અને તે ટેક્સ્ટ-આધારિત સિક્રેટ સ્કેનર્સને ટ્રિગર કરી શકે છે. જો આ એસેટ્સ કાયદેસર હોય, તો તેમને સ્કેનરની allowlist માં ચિહ્નિત કરો અથવા સ્કેનર કૉન્ફિગમાં તે ડિરેક્ટરીઓને બાકાત રાખો.

## જો તમને લીક મળે

1. કીને તાત્કાલિક રોટેટ/રિવોક કરો.
2. ઇતિહાસમાંથી સિક્રેટ દૂર કરો અને જો જરૂરી હોય તો સાફ કરેલી બ્રાન્ચને force-push કરો.
3. મેઇન્ટેનર્સને જાણ કરો અને તમારી સંસ્થાની ઇન્સિડન્ટ રિસ્પોન્સ ચેકલિસ્ટનું પાલન કરો.
