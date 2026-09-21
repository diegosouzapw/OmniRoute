# Cursor Provider in Docker Environments (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute በDocker ውስጥ ሲሰራ፣ ኮንቴይነሩ በhost ላይ ያለውን የCursor ጭነት ማየት ስለማይችል የቀድሞዎቹ **ከCursor IDE አስመጣ** /
`cursor-agent` ሂደቶች አይሰሩም። በምትኩ **በCursor ይግቡ**ን (deep-control PKCE) ይጠቀሙ።

## የIDE / CLI ማስመጣት በDocker ውስጥ የማይሰራበት ምክንያት

1. **የፋይል ስርዓት መነጠል** — ራስ-ሰር ማስመጣት እንደ
   `~/.config/Cursor/User/globalStorage/state.vscdb` ያሉ የLinux ዱካዎችን በኮንቴይነሩ _ውስጥ_ ይፈልጋል።
   በDocker Desktop for macOS ላይ የhost IDE DB በነባሪ አይጫንም፣ እና
   hostው Darwin ቢሆንም የኮንቴይነሩ OS Linux ነው።
2. **የ`cursor-agent` binary የለም** — ይፋዊ የOmniRoute images
   `cursor-agent`ን አያካትቱም። ቀደም ሲል የሚገኙ ሞዴሎች
   `cursor-agent --list-models`ን በshell ያስኬዱ ነበር፣ ካልተሳካም ወደ ቋሚ catalog ይመለሱ ነበር።
3. **የተሳሳተ binary** — የmacOS `cursor-agent`ን ወደ Linux
   ኮንቴይነር bind-mount **አያድርጉ**። አይሰራም።

## የሚመከረው፦ በCursor ይግቡ

1. **ዳሽቦርድ → አቅራቢዎች → Cursor**ን ይክፈቱ።
2. **በCursor ይግቡ** የሚለውን tab ይምረጡ።
3. **በCursor ይግቡ**ን ጠቅ ያድርጉ — OmniRoute
   `https://cursor.com/loginDeepControl?…`ን በ**host** browserዎ ውስጥ ይከፍታል።
4. በbrowserው ውስጥ መግባቱን ያጽድቁ፣ ከዚያም ወደ ዳሽቦርዱ ይመለሱ። OmniRoute
   tokens እስኪደርሱ ድረስ `api2.cursor.sh/auth/poll`ን በየጊዜው ይፈትሻል።
5. OmniRoute የ**መዳረሻ + ማደሻ** tokensን ያከማቻል እና በ
   `https://api2.cursor.sh/auth/exchange_user_api_key` በኩል ያድሳቸዋል።

ይህ መንገድ Cursor IDE ወይም `cursor-agent` በኮንቴይነሩ ውስጥ እንዲኖር አይፈልግም።

## ሞዴል ማግኘት

በመለያ የገባ ግንኙነት ሲኖር፣ **የሚገኙ ሞዴሎች / ራስ-ሰር ማመሳሰል** የግንኙነቱን bearer token በመጠቀም የCursorን
HTTP `AiService/AvailableModels` catalog ቅድሚያ ይሰጣል።
ይህ ካልተሳካ፣ OmniRoute አሁንም የhost `cursor-agent`ን (ካለ) ይሞክራል፣ ከዚያም
ወደ ቋሚው registry seed ይመለሳል።

OmniRoute ሁልጊዜ **`auto`**ን በcatalog ውስጥ ያቀርባል (የሚታየው “Auto”)፣ እንዲሁም
የOpenCodex ዓይነት router modes የሆኑትን **`auto-cost`**፣ **`auto-balance`** እና
**`auto-intelligence`**ን ያቀርባል። በwire ላይ እነዚህ ወደ Cursor `default` ሞዴል
(ለሶስቱ variants ከ`optimization` ModelParameter ጋር) ይዛመዳሉ። premium ሞዴሎች የአጠቃቀም መጠናቸው ሲያልቅ
`cu/auto`ን ይምረጡ — Auto ብዙውን ጊዜ አሁንም በጀት ይኖረዋል።

### ሲመሳሰል የቀጥታ catalog ብቻ ጥቅም ላይ ይውላል

የCursor ሞዴል ማመሳሰል በተሳካ ሁኔታ ከተጠናቀቀ በኋላ (`cursor-agent --list-models` → ተከማችቶ የሚቆይ
የተመሳሰለ catalog፣ ወይም ከላይ ያለው bearer-authenticated `AvailableModels` fetch)፣
**ዳሽቦርዱ**፣ **`/v1/models`** እና **ሁሉንም ፈትሽ** የሚከተሉትን ይዘረዝራሉ፦

1. በቀጥታ ማመሳሰሉ የተመለሱ ሞዴሎች
2. የተጨመሩ auto-router ids፦ `auto`፣ `auto-cost`፣ `auto-balance`፣ `auto-intelligence`
3. የኦፕሬተሩ **ብጁ** ሞዴሎች (ማስመጣት / በእጅ) — በማመሳሰል በፍጹም አይወገዱም

በ
`open-sse/config/providers/registry/cursor/` ስር ያለው ትልቅ ቋሚ registry **ከመስመር ውጭ fallback ብቻ** ነው።
የተመሳሰለው ዝርዝር ባዶ ሲሆን (ወይም discovery ሳይሳካ ሲቀር)፣ ዝርዝሩ ወደዚያ registry ይመለሳል።

በeffort ቅጥያ የተያያዙ ids (ለምሳሌ `claude-4.6-sonnet-high`) አሁንም በruntime
**ሊጠየቁ** ይችላሉ፦ `resolveRequestedModel` ቅጥያውን ወደ wire
`ModelParameter` ይለውጠዋል። ልዩ የዝርዝር አሰራሩ ሙከራዎቹ Cursor በእውነት እንደሚገኙ ከሚመልሳቸው ጋር እንዲዛመዱ፣ እነዚያን ቋሚ variants
ከሁሉንም ፈትሽ ሆን ብሎ ይደብቃቸዋል።

### ረዳቶች

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — የዳሽቦርድ merge
- `ensureCursorAutoCatalogEntry` — በdiscovery + listing ላይ auto* ማከል
- `shouldSuppressStaticModelForExclusiveListing` — የ`/v1/models` ቋሚ loop

## የአቅራቢ ገደቦች (quota)

ለCursor የሚገኘው **አጠቃቀም → የአቅራቢ ገደቦች**፣ ከPKCE ወይም token
ማስመጣት በኋላ በ`api2.cursor.sh` ላይ ያሉ Bearer APIsን
(`GetCurrentPeriodUsage` → የአጠቃቀም ማጠቃለያ → auth/usage) ይጠቀማል። የቀድሞው cookie/`cursor.com`
ዳሽቦርድ መንገድ ከቆዩ IDE-imported sessions ጋር የመጨረሻ fallback ሆኖ ይቆያል።

Windows በተለምዶ **ጠቅላላ**፣ **Auto + Composer** እና **API**ን ያካትታሉ።
ገደቦቹ ባዶ ከሆኑ፣ **በCursor ይግቡ**ን እንደገና ያስኪዱ ወይም tokensን እንደገና ያስመጡ (የIDE ማስመጣት
ብቻውን ከእንግዲህ አያስፈልግም)።

## ባዶ turns / አጠቃቀም ማለቅ

Cursor Runን ተቀብሎ ምንም የassistant ጽሑፍ ሳይመልስ ሲቀር (premium
አጠቃቀም ሲያልቅ የተለመደ ነው)፣ OmniRoute እርምጃ ሊወሰድበት የሚችል **429** (የquota ምልክቶች) ወይም
መመሪያ ያለው **502** ያሳያል — ባዶ “አቅራቢው ባዶ ይዘት መለሰ” መልዕክት አይደለም።
እንደ `not_found: AI Model Not Found` (የአጠቃቀም ጊዜ መስኮት ሲያልቅ) ያሉ የstreaming ብልሽቶች
እንደ **የCursor rate limit / አጠቃቀም አልፏል** ተብለው ይመደባሉ እና ያንን መልዕክት
በSSE pipeline ውስጥ ያቆያሉ (የጋራው empty-stream guard ቀድሞ የተላከን ስህተት
አይተካም)። የአቅራቢ ገደቦችን ይፈትሹ፣ **`auto`** ሞዴልን ይሞክሩ ወይም
የCursor plan ገደቦችን ያሳድጉ።

## የclient ስሪት (headless)

የአካባቢ `cursor-agent` ጭነት ከሌለ፣ OmniRoute
`x-cursor-client-version`ን መጀመሪያ በenv `CURSOR_AGENT_CLI_VERSION`፣ ከዚያ በdisk-cached
የCursor installer script scrape፣ ከዚያም በpinned build id ይወስናል። ሲያስፈልግ በ
`CURSOR_AGENT_CLI_VERSION` ይተኩት።

## Fallback፦ Tokenን በእጅ ማስመጣት

በbrowser መግባቱን ማጠናቀቅ ካልቻሉ፦

1. በhost ላይ tokensን ከCursor `state.vscdb` ያውጡ፦

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. በCursor auth modal ውስጥ **token አስመጣ**ን ይክፈቱ።
3. **Access Token**ን እና፣ ካለ፣ **Refresh Token**ን ይለጥፉ (ለራስ-ሰር
   ማደስ ያስፈልጋል)። Machine ID አማራጭ ነው።

Access-token-only imports አሁንም ይሰራሉ፣ ነገር ግን refresh token ከሌለ ጊዜያቸው ያልፋል —
chat የማረጋገጫ ስህተቶችን ሲመልስ እንደገና ያስመጡ።

## ተዛማጅ

- የZed Docker መመሪያ፦ [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- የOpenCodex Cursor መግቢያ ማጣቀሻ (ውጫዊ)፦
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
