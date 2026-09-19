# Cursor Provider in Docker Environments (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

જ્યારે OmniRoute Dockerની અંદર ચાલે છે, ત્યારે જૂના **Import from Cursor IDE** /
`cursor-agent` પ્રવાહો નિષ્ફળ જાય છે, કારણ કે કન્ટેનર હોસ્ટ પરનું Cursor
ઇન્સ્ટોલેશન જોઈ શકતું નથી. તેના બદલે **Login with Cursor** (deep-control PKCE) નો ઉપયોગ કરો.

## Dockerમાં IDE / CLI ઇમ્પોર્ટ કેમ નિષ્ફળ જાય છે

1. **ફાઇલસિસ્ટમ આઇસોલેશન** — ઑટો-ઇમ્પોર્ટ કન્ટેનરની _અંદર_
   `~/.config/Cursor/User/globalStorage/state.vscdb` જેવા Linux પાથ શોધે છે.
   macOS માટેના Docker Desktop પર હોસ્ટ IDE DB ડિફૉલ્ટ રૂપે માઉન્ટ થયેલું હોતું નથી અને
   હોસ્ટ Darwin હોય ત્યારે પણ કન્ટેનર OS Linux હોય છે.
2. **`cursor-agent` બાઇનરી નથી** — અધિકૃત OmniRoute ઇમેજોમાં
   `cursor-agent` સામેલ નથી. અગાઉ Available Models
   `cursor-agent --list-models` ને શેલ મારફતે ચલાવતું હતું અને નિષ્ફળતા પર સ્ટેટિક કૅટલૉગનો ઉપયોગ કરતું હતું.
3. **ખોટી બાઇનરી** — macOS `cursor-agent` ને Linux
   કન્ટેનરમાં bind-mount **કરશો નહીં**. તે એક્ઝિક્યુટ થશે નહીં.

## ભલામણ કરેલ: Cursor વડે લૉગિન

1. **Dashboard → Providers → Cursor** ખોલો.
2. **Login with Cursor** ટૅબ પસંદ કરો.
3. **Login with Cursor** પર ક્લિક કરો — OmniRoute તમારા **હોસ્ટ** બ્રાઉઝરમાં
   `https://cursor.com/loginDeepControl?…` ખોલે છે.
4. બ્રાઉઝરમાં લૉગિન મંજૂર કરો અને પછી ડૅશબોર્ડ પર પાછા ફરો. ટોકન આવે ત્યાં સુધી OmniRoute
   `api2.cursor.sh/auth/poll` ને પોલ કરે છે.
5. OmniRoute **access + refresh** ટોકન સંગ્રહે છે અને
   `https://api2.cursor.sh/auth/exchange_user_api_key` મારફતે તેમને રિફ્રેશ કરે છે.

આ પાથ માટે કન્ટેનરની અંદર Cursor IDE અથવા `cursor-agent` હોવું જરૂરી નથી.

## મૉડલ શોધ

લૉગિન કરેલા કનેક્શન સાથે, **Available Models / Auto-Sync** કનેક્શનના bearer token નો ઉપયોગ કરીને Cursorના
HTTP `AiService/AvailableModels` કૅટલૉગને પ્રાથમિકતા આપે છે.
જો તે નિષ્ફળ જાય, તો OmniRoute હજી પણ હોસ્ટ `cursor-agent` (જ્યારે ઉપલબ્ધ હોય) અજમાવે છે અને ત્યારબાદ
સ્ટેટિક રજિસ્ટ્રી સીડનો ઉપયોગ કરે છે.

OmniRoute કૅટલૉગમાં હંમેશાં **`auto`** (પ્રદર્શન નામ “Auto”), ઉપરાંત
OpenCodex-શૈલીના રાઉટર મોડ **`auto-cost`**, **`auto-balance`**, અને
**`auto-intelligence`** ઉપલબ્ધ કરાવે છે. વાયર પર આ Cursorના `default` મૉડલ સાથે
મૅપ થાય છે (ત્રણ વેરિઅન્ટ માટે `optimization` ModelParameter સાથે). પ્રીમિયમ
મૉડલનો ઉપયોગ સમાપ્ત થઈ ગયો હોય ત્યારે `cu/auto` ને પ્રાધાન્ય આપો — Auto પાસે ઘણી વાર હજી પણ બજેટ હોય છે.

### સિંક થયા પછી લાઇવ કૅટલૉગ વિશિષ્ટ હોય છે

Cursor મૉડલનું સફળ સિંક થયા પછી (`cursor-agent --list-models` → સંગ્રહિત
સિંક કરેલું કૅટલૉગ, અથવા ઉપર દર્શાવેલું bearer-authenticated `AvailableModels` fetch),
**dashboard**, **`/v1/models`**, અને **Test All** નીચેની સૂચિ દર્શાવે છે:

1. લાઇવ સિંક દ્વારા પરત કરાયેલા મૉડલ
2. ઉમેરાયેલા auto-router ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ઑપરેટરના **custom** મૉડલ (Import / મૅન્યુઅલ) — સિંક દ્વારા ક્યારેય દૂર થતા નથી

`open-sse/config/providers/registry/cursor/` હેઠળની વિશાળ સ્ટેટિક રજિસ્ટ્રી
**માત્ર ઑફલાઇન ફૉલબૅક માટે** છે. જ્યારે સિંક કરેલી સૂચિ ખાલી હોય (અથવા શોધ નિષ્ફળ જાય),
ત્યારે સૂચિ માટે તે રજિસ્ટ્રીનો ફૉલબૅક તરીકે ઉપયોગ થાય છે.

Effort-suffixed ids (ઉદાહરણ તરીકે `claude-4.6-sonnet-high`) હજી પણ રનટાઇમ પર
**વિનંતી** કરી શકાય છે: `resolveRequestedModel` suffix ને દૂર કરીને વાયર
`ModelParameter` માં મૂકે છે. વિશિષ્ટ સૂચિ ઇરાદાપૂર્વક તે સ્ટેટિક વેરિઅન્ટને
Test All માંથી છુપાવે છે, જેથી પ્રોબ્સ Cursor વાસ્તવમાં જે ઉપલબ્ધ તરીકે પરત કરે છે તેની સાથે મેળ ખાય.

### સહાયક

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ડૅશબોર્ડ મર્જ
- `ensureCursorAutoCatalogEntry` — શોધ + સૂચિ દરમિયાન auto* ઉમેરવું
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` સ્ટેટિક લૂપ

## પ્રોવાઇડર મર્યાદાઓ (ક્વોટા)

PKCE અથવા ટોકન ઇમ્પોર્ટ પછી Cursor માટે **Usage → Provider Limits**
`api2.cursor.sh` પરની Bearer APIs નો ઉપયોગ કરે છે
(`GetCurrentPeriodUsage` → ઉપયોગ સારાંશ → auth/usage). જૂનો cookie/`cursor.com`
ડૅશબોર્ડ પાથ જૂના IDE-ઇમ્પોર્ટ કરેલા સેશન માટે અંતિમ ફૉલબૅક તરીકે યથાવત્ રહે છે.

વિન્ડોઝમાં સામાન્ય રીતે **Total**, **Auto + Composer**, અને **API** સામેલ હોય છે. જો
મર્યાદાઓ ખાલી દેખાય, તો **Login with Cursor** ફરી ચલાવો અથવા ટોકન ફરી ઇમ્પોર્ટ કરો (હવે માત્ર IDE ઇમ્પોર્ટ
જરૂરી નથી).

## ખાલી ટર્ન / ઉપયોગ સમાપ્ત

જ્યારે Cursor Run સ્વીકારે છે પરંતુ assistant ટેક્સ્ટ પરત કરતું નથી (પ્રીમિયમ
ઉપયોગ સમાપ્ત થઈ ગયો હોય ત્યારે આ સામાન્ય છે), ત્યારે OmniRoute ઉપયોગી માર્ગદર્શન સાથે **429** (ક્વોટા સંકેતો) અથવા
**502** દર્શાવે છે — માત્ર “Provider returned empty content” નહીં. `not_found: AI Model Not Found`
(ઉપયોગ વિન્ડો સમાપ્ત) જેવી સ્ટ્રીમિંગ નિષ્ફળતાઓને
**Cursor rate limit / usage exceeded** તરીકે વર્ગીકૃત કરવામાં આવે છે અને તે સંદેશ
SSE pipeline માં જાળવવામાં આવે છે (શેર કરાયેલ empty-stream guard પહેલેથી ઉત્સર્જિત થયેલી ભૂલને ઓવરરાઇટ કરતું નથી).
Provider Limits તપાસો, **`auto`** મૉડલ અજમાવો અથવા Cursor પ્લાનની મર્યાદાઓ વધારો.

## ક્લાયન્ટ વર્ઝન (હેડલેસ)

સ્થાનિક `cursor-agent` ઇન્સ્ટોલેશન વિના, OmniRoute
`x-cursor-client-version` ને પહેલાં env `CURSOR_AGENT_CLI_VERSION`, ત્યારબાદ Cursor installer script ના disk-cached
scrape અને પછી pinned build id દ્વારા રિઝોલ્વ કરે છે. જરૂર પડે ત્યારે
`CURSOR_AGENT_CLI_VERSION` વડે ઓવરરાઇડ કરો.

## ફૉલબૅક: મૅન્યુઅલ ટોકન ઇમ્પોર્ટ

જો તમે બ્રાઉઝર લૉગિન પૂર્ણ ન કરી શકો:

1. હોસ્ટ પર Cursorના `state.vscdb` માંથી ટોકન કાઢો:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal માં **Import token** ખોલો.
3. **Access Token** અને ઉપલબ્ધ હોય ત્યારે **Refresh Token** પેસ્ટ કરો (ઑટોમૅટિક
   રિફ્રેશ માટે આવશ્યક). Machine ID વૈકલ્પિક છે.

માત્ર access-token વાળા ઇમ્પોર્ટ હજી પણ કામ કરે છે, પરંતુ refresh token વિના તે સમાપ્ત થઈ જશે —
ચેટ authentication errors પરત કરે ત્યારે ફરી ઇમ્પોર્ટ કરો.

## સંબંધિત

- Zed Docker માર્ગદર્શન: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor લૉગિન સંદર્ભ (બાહ્ય):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
