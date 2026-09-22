# Cursor Provider in Docker Environments (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute, Docker තුළ ක්රියාත්මක වන විට, කන්ටේනරයට සත්කාරක Cursor
ස්ථාපනය දැකිය නොහැකි බැවින් පැරණි **Cursor IDE වෙතින් ආයාත කරන්න** /
`cursor-agent` ප්රවාහ අසාර්ථක වේ. ඒ වෙනුවට **Cursor සමඟ පුරන්න** (deep-control PKCE) භාවිත කරන්න.

## Docker තුළ IDE / CLI ආයාත කිරීම අසාර්ථක වන්නේ ඇයි

1. **ගොනු පද්ධති හුදකලා කිරීම** — ස්වයංක්රීය ආයාත කිරීම කන්ටේනරය
   _තුළ_ `~/.config/Cursor/User/globalStorage/state.vscdb` වැනි Linux මාර්ග
   සොයයි. macOS සඳහා Docker Desktop මත, සත්කාරක IDE DB එක පෙරනිමියෙන් mount
   නොකරන අතර, සත්කාරකය Darwin වුවද කන්ටේනර් OS එක Linux වේ.
2. **`cursor-agent` ද්විමය ගොනුවක් නැත** — නිල OmniRoute images සමඟ
   `cursor-agent` සපයන්නේ නැත. මීට පෙර ලබා ගත හැකි ආකෘති සඳහා
   `cursor-agent --list-models` shell මඟින් ක්රියාත්මක කර, එය අසාර්ථක වුවහොත් ස්ථිතික නාමාවලියක් භාවිත කළේය.
3. **වැරදි ද්විමය ගොනුව** — macOS `cursor-agent` එකක් Linux
   කන්ටේනරයකට bind-mount **නොකරන්න**. එය ක්රියාත්මක නොවනු ඇත.

## නිර්දේශිත ක්රමය: Cursor සමඟ පුරන්න

1. **උපකරණ පුවරුව → සැපයුම්කරුවන් → Cursor** විවෘත කරන්න.
2. **Cursor සමඟ පුරන්න** ටැබය තෝරන්න.
3. **Cursor සමඟ පුරන්න** ක්ලික් කරන්න — OmniRoute ඔබගේ **සත්කාරක**
   බ්රවුසරයේ `https://cursor.com/loginDeepControl?…` විවෘත කරයි.
4. බ්රවුසරය තුළ පුරනය වීම අනුමත කර, පසුව උපකරණ පුවරුව වෙත ආපසු යන්න. ටෝකන ලැබෙන තෙක් OmniRoute
   `api2.cursor.sh/auth/poll` poll කරයි.
5. OmniRoute **ප්රවේශ + නැවුම් කිරීමේ** ටෝකන ගබඩා කර, ඒවා
   `https://api2.cursor.sh/auth/exchange_user_api_key` හරහා නැවුම් කරයි.

මෙම ක්රමයට කන්ටේනරය තුළ Cursor IDE හෝ `cursor-agent` අවශ්ය නොවේ.

## ආකෘති සොයාගැනීම

පුරනය වී ඇති සම්බන්ධතාවක් සමඟ, **ලබා ගත හැකි ආකෘති / ස්වයං-සමමුහුර්තකරණය**
සම්බන්ධතා bearer ටෝකනය භාවිත කරන Cursor හි HTTP `AiService/AvailableModels`
නාමාවලියට ප්රමුඛතාව දෙයි. එය අසාර්ථක වුවහොත්, OmniRoute තවමත් සත්කාරකයේ
`cursor-agent` (තිබේ නම්) උත්සාහ කර, ඉන්පසු ස්ථිතික registry seed එක භාවිත කරයි.

OmniRoute නාමාවලිය තුළ සෑම විටම **`auto`** (පෙන්වීම “Auto”) සහ
OpenCodex-ශෛලියේ router ආකාර වන **`auto-cost`**, **`auto-balance`**, සහ
**`auto-intelligence`** නිරාවරණය කරයි. සම්ප්රේෂණයේදී මේවා Cursor හි `default`
ආකෘතියට map වේ (ප්රභේද තුන සඳහා `optimization` ModelParameter එකක් සමඟ).
premium ආකෘතිවල භාවිත ධාරිතාව අවසන් වූ විට `cu/auto` භාවිත කිරීමට ප්රමුඛතාව දෙන්න — Auto සතුව තවමත් ධාරිතාව තිබිය හැක.

### සමමුහුර්ත කළ විට සජීවී නාමාවලිය පමණක් භාවිත වේ

සාර්ථක Cursor ආකෘති සමමුහුර්තකරණයකින් පසු (`cursor-agent --list-models` → ගබඩා කළ
සමමුහුර්ත නාමාවලිය, හෝ ඉහත bearer-authenticated `AvailableModels` ලබාගැනීම),
**උපකරණ පුවරුව**, **`/v1/models`**, සහ **සියල්ල පරීක්ෂා කරන්න** පහත දෑ ලැයිස්තුගත කරයි:

1. සජීවී සමමුහුර්තකරණයෙන් ආපසු ලබා දුන් ආකෘති
2. ඇතුළත් කළ auto-router ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ක්රියාකරුගේ **අභිරුචි** ආකෘති (ආයාත / අතින්) — සමමුහුර්තකරණය මඟින් කිසිවිටෙක ඉවත් නොකෙරේ

`open-sse/config/providers/registry/cursor/` යටතේ ඇති විශාල ස්ථිතික registry එක
**නොබැඳි fallback සඳහා පමණි**. සමමුහුර්ත කළ දත්ත හිස් වූ විට (හෝ සොයාගැනීම අසාර්ථක වූ විට),
ලැයිස්තුගත කිරීම එම registry එක භාවිත කරයි.

Effort suffix සහිත ids (උදාහරණයක් ලෙස `claude-4.6-sonnet-high`) runtime එකේදී තවමත්
**ඉල්ලා සිටිය** හැක: `resolveRequestedModel` suffix එක ඉවත් කර එය සම්ප්රේෂණ
`ModelParameter` එකක් බවට පත් කරයි. Test All හි විමසුම් Cursor සැබවින්ම ලබා ගත හැකි යැයි ආපසු ලබා දෙන දේට ගැළපෙන පරිදි,
විශේෂිත ලැයිස්තුගත කිරීම එම ස්ථිතික ප්රභේද හිතාමතා සඟවයි.

### උපකාරක

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — උපකරණ පුවරු ඒකාබද්ධ කිරීම
- `ensureCursorAutoCatalogEntry` — සොයාගැනීමේදී + ලැයිස්තුගත කිරීමේදී auto* ඇතුළත් කිරීම
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` ස්ථිතික loop එක

## සැපයුම්කරුගේ සීමා (කෝටාව)

Cursor සඳහා **භාවිතය → සැපයුම්කරුගේ සීමා**, PKCE හෝ ටෝකන
ආයාත කිරීමෙන් පසු `api2.cursor.sh` මත Bearer APIs
(`GetCurrentPeriodUsage` → භාවිත සාරාංශය → auth/usage) භාවිත කරයි. පැරණි
IDE-ආයාත කළ සැසි සඳහා පැරණි cookie/`cursor.com` උපකරණ පුවරු මාර්ගය අවසන් fallback එකක් ලෙස පවතී.

කවුළුවල සාමාන්යයෙන් **සමස්තය**, **Auto + Composer**, සහ **API** ඇතුළත් වේ. සීමා
හිස් ලෙස පෙනේ නම්, **Cursor සමඟ පුරන්න** නැවත ක්රියාත්මක කරන්න හෝ ටෝකන නැවත ආයාත කරන්න (IDE ආයාත කිරීම
පමණක් තවදුරටත් අවශ්ය නොවේ).

## හිස් වාර / භාවිත ධාරිතාව අවසන් වීම

Cursor එක Run එකක් පිළිගෙන නමුත් assistant පාඨයක් ආපසු නොදෙන විට (premium
භාවිත ධාරිතාව අවසන් වූ විට මෙය සාමාන්ය වේ), OmniRoute ක්රියා කළ හැකි **429** (කෝටා ඉඟි) හෝ
මඟපෙන්වීම සහිත **502** එකක් පෙන්වයි — හුදෙක් “සැපයුම්කරු හිස් අන්තර්ගතයක් ආපසු ලබා දුන්නේය” නොවේ. `not_found: AI Model Not Found` (භාවිත කවුළුව අවසන් වී ඇත) වැනි Streaming
අසාර්ථකවීම් **Cursor rate limit / usage exceeded** ලෙස වර්ගීකරණය කර,
SSE pipeline එක පුරා එම පණිවිඩය රඳවා ගනී (හවුල් empty-stream guard එක දැනටමත් නිකුත් කළ
දෝෂයක් උඩින් නොලියයි). සැපයුම්කරුගේ සීමා පරීක්ෂා කරන්න, **`auto`** ආකෘතිය උත්සාහ කරන්න, හෝ
Cursor සැලසුම් සීමා වැඩි කරන්න.

## සේවාලාභී අනුවාදය (headless)

දේශීය `cursor-agent` ස්ථාපනයක් නොමැතිව, OmniRoute
`x-cursor-client-version` අගය පළමුව env `CURSOR_AGENT_CLI_VERSION` හරහාත්, පසුව Cursor installer script එකේ
disk-cached scrape එකක් හරහාත්, අවසානයේ pinned build id එකක් හරහාත් විසඳයි. අවශ්ය විට
`CURSOR_AGENT_CLI_VERSION` සමඟ override කරන්න.

## Fallback: අතින් ටෝකන ආයාත කිරීම

ඔබට බ්රවුසර පුරනය වීම සම්පූර්ණ කළ නොහැකි නම්:

1. සත්කාරකයේදී, Cursor හි `state.vscdb` වෙතින් ටෝකන ලබාගන්න:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor සත්යාපන modal එක තුළ **ටෝකනය ආයාත කරන්න** විවෘත කරන්න.
3. **ප්රවේශ ටෝකනය** සහ, තිබේ නම්, **නැවුම් කිරීමේ ටෝකනය** අලවන්න (ස්වයංක්රීය
   නැවුම් කිරීම සඳහා අවශ්ය වේ). Machine ID විකල්ප වේ.

ප්රවේශ-ටෝකනය පමණක් ඇති ආයාත කිරීම් තවමත් ක්රියා කරයි, නමුත් නැවුම් කිරීමේ ටෝකනයක් නොමැතිව ඒවා කල් ඉකුත් වේ —
chat එක සත්යාපන දෝෂ ආපසු ලබා දෙන විට නැවත ආයාත කරන්න.

## අදාළ

- Zed Docker මඟපෙන්වීම: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor පුරනය වීමේ යොමුව (බාහිර):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
