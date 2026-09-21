# Cursor Provider in Docker Environments (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker-നുള്ളിൽ പ്രവർത്തിക്കുമ്പോൾ, കണ്ടെയ്നറിന് ഹോസ്റ്റിലെ Cursor ഇൻസ്റ്റാളേഷൻ കാണാൻ കഴിയാത്തതിനാൽ പഴയ **Cursor IDE-യിൽ നിന്ന് ഇംപോർട്ട് ചെയ്യുക** /
`cursor-agent` പ്രവാഹങ്ങൾ പരാജയപ്പെടും. പകരം **Cursor ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക** (deep-control PKCE) ഉപയോഗിക്കുക.

## Docker-ൽ IDE / CLI ഇംപോർട്ട് പരാജയപ്പെടുന്നത് എന്തുകൊണ്ട്

1. **ഫയൽസിസ്റ്റം ഐസൊലേഷൻ** — സ്വയമേവയുള്ള ഇംപോർട്ട് കണ്ടെയ്നറിന് _അകത്തുള്ള_
   `~/.config/Cursor/User/globalStorage/state.vscdb` പോലുള്ള Linux പാതകൾ തിരയുന്നു.
   macOS-നുള്ള Docker Desktop-ൽ ഹോസ്റ്റ് IDE DB ഡിഫോൾട്ടായി മൗണ്ട് ചെയ്തിട്ടില്ല,
   കൂടാതെ ഹോസ്റ്റ് Darwin ആയിരിക്കുമ്പോഴും കണ്ടെയ്നർ OS Linux ആണ്.
2. **`cursor-agent` ബൈനറി ഇല്ല** — ഔദ്യോഗിക OmniRoute ഇമേജുകളിൽ
   `cursor-agent` ഉൾപ്പെടുന്നില്ല. ലഭ്യമായ മോഡലുകൾ കണ്ടെത്താൻ മുമ്പ്
   `cursor-agent --list-models` പ്രവർത്തിപ്പിക്കുകയും, അത് പരാജയപ്പെട്ടാൽ ഒരു സ്റ്റാറ്റിക് കാറ്റലോഗ് ഉപയോഗിക്കുകയും ചെയ്തിരുന്നു.
3. **തെറ്റായ ബൈനറി** — ഒരു macOS `cursor-agent`-നെ Linux
   കണ്ടെയ്നറിലേക്ക് bind-mount ചെയ്യരുത്. അത് പ്രവർത്തിക്കില്ല.

## ശുപാർശ ചെയ്യുന്നത്: Cursor ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക

1. **ഡാഷ്ബോർഡ് → പ്രൊവൈഡറുകൾ → Cursor** തുറക്കുക.
2. **Cursor ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക** ടാബ് തിരഞ്ഞെടുക്കുക.
3. **Cursor ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക** ക്ലിക്ക് ചെയ്യുക — OmniRoute നിങ്ങളുടെ **ഹോസ്റ്റ്** ബ്രൗസറിൽ
   `https://cursor.com/loginDeepControl?…` തുറക്കും.
4. ബ്രൗസറിൽ ലോഗിൻ അംഗീകരിച്ച ശേഷം ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക. ടോക്കണുകൾ ലഭിക്കുന്നതുവരെ OmniRoute
   `api2.cursor.sh/auth/poll` പോൾ ചെയ്യും.
5. OmniRoute **access + refresh** ടോക്കണുകൾ സംഭരിക്കുകയും
   `https://api2.cursor.sh/auth/exchange_user_api_key` വഴി അവ പുതുക്കുകയും ചെയ്യും.

ഈ രീതിക്ക് കണ്ടെയ്നറിനുള്ളിൽ Cursor IDE അല്ലെങ്കിൽ `cursor-agent` ആവശ്യമില്ല.

## മോഡൽ കണ്ടെത്തൽ

ലോഗിൻ ചെയ്ത കണക്ഷൻ ഉള്ളപ്പോൾ, **ലഭ്യമായ മോഡലുകൾ / സ്വയമേവ സമന്വയിപ്പിക്കൽ** കണക്ഷന്റെ bearer token ഉപയോഗിച്ച് Cursor-ന്റെ
HTTP `AiService/AvailableModels` കാറ്റലോഗിന് മുൻഗണന നൽകുന്നു.
അത് പരാജയപ്പെട്ടാൽ, OmniRoute ഹോസ്റ്റിലെ `cursor-agent` (ലഭ്യമാണെങ്കിൽ) പരീക്ഷിക്കുകയും തുടർന്ന്
സ്റ്റാറ്റിക് registry seed ഉപയോഗിക്കുകയും ചെയ്യും.

OmniRoute എല്ലായ്പ്പോഴും കാറ്റലോഗിൽ **`auto`** (പ്രദർശന നാമം “Auto”) ഉൾപ്പെടുത്തുന്നു; കൂടാതെ
OpenCodex-ശൈലിയിലുള്ള റൂട്ടർ മോഡുകളായ **`auto-cost`**, **`auto-balance`**, കൂടാതെ
**`auto-intelligence`** എന്നിവയും ലഭ്യമാക്കുന്നു. വയറിലൂടെ ഇവ Cursor-ന്റെ `default` മോഡലിലേക്ക്
(മൂന്ന് വേരിയന്റുകൾക്കായി ഒരു `optimization` ModelParameter സഹിതം) മാപ്പ് ചെയ്യപ്പെടുന്നു. പ്രീമിയം മോഡലുകളുടെ ഉപയോഗപരിധി തീർന്നിരിക്കുമ്പോൾ
`cu/auto` തിരഞ്ഞെടുക്കുക — Auto-യിൽ പലപ്പോഴും ഇപ്പോഴും ബജറ്റ് ശേഷിച്ചിട്ടുണ്ടാകും.

### സമന്വയിപ്പിച്ചിരിക്കുമ്പോൾ ലൈവ് കാറ്റലോഗ് മാത്രമാണ് ഉപയോഗിക്കുന്നത്

Cursor മോഡൽ വിജയകരമായി സമന്വയിപ്പിച്ചതിന് ശേഷം (`cursor-agent --list-models` → നിലനിർത്തിയ
സമന്വയിപ്പിച്ച കാറ്റലോഗ്, അല്ലെങ്കിൽ മുകളിൽ പറഞ്ഞ bearer-authenticated `AvailableModels` അഭ്യർത്ഥന),
**ഡാഷ്ബോർഡ്**, **`/v1/models`**, കൂടാതെ **എല്ലാം പരിശോധിക്കുക** എന്നിവ ഇനിപ്പറയുന്നവ പട്ടികപ്പെടുത്തും:

1. ലൈവ് സമന്വയം മടക്കിനൽകിയ മോഡലുകൾ
2. ചേർത്ത auto-router id-കൾ: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ഓപ്പറേറ്ററുടെ **ഇഷ്ടാനുസൃത** മോഡലുകൾ (ഇംപോർട്ട് / മാനുവൽ) — സമന്വയം ഇവ ഒരിക്കലും നീക്കം ചെയ്യില്ല

`open-sse/config/providers/registry/cursor/` എന്നതിന് കീഴിലുള്ള വലിയ സ്റ്റാറ്റിക് registry
**ഓഫ്ലൈൻ fallback-നായി മാത്രം** ഉള്ളതാണ്. സമന്വയിപ്പിച്ച പട്ടിക ശൂന്യമായിരിക്കുമ്പോൾ
(അല്ലെങ്കിൽ കണ്ടെത്തൽ പരാജയപ്പെടുമ്പോൾ), പട്ടികപ്പെടുത്തൽ ആ registry-യിലേക്ക് fallback ചെയ്യും.

Effort suffix ചേർത്ത id-കൾ (ഉദാഹരണത്തിന് `claude-4.6-sonnet-high`) runtime-ൽ ഇപ്പോഴും
**അഭ്യർത്ഥിക്കാം**: `resolveRequestedModel` suffix നീക്കം ചെയ്ത് ഒരു wire
`ModelParameter` ആക്കുന്നു. Cursor യഥാർത്ഥത്തിൽ ലഭ്യമാണെന്ന് മടക്കിനൽകുന്ന മോഡലുകളുമായി പരിശോധനകൾ പൊരുത്തപ്പെടുന്നതിനായി,
പ്രത്യേക പട്ടികപ്പെടുത്തൽ ഈ സ്റ്റാറ്റിക് വേരിയന്റുകൾ **എല്ലാം പരിശോധിക്കുക** എന്നതിൽ നിന്ന് ഉദ്ദേശ്യപൂർവം മറയ്ക്കുന്നു.

### സഹായകങ്ങൾ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ഡാഷ്ബോർഡ് ലയനം
- `ensureCursorAutoCatalogEntry` — കണ്ടെത്തലിലും പട്ടികപ്പെടുത്തലിലും auto* ചേർക്കുന്നു
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` സ്റ്റാറ്റിക് ലൂപ്പ്

## പ്രൊവൈഡർ പരിധികൾ (ക്വോട്ട)

PKCE അല്ലെങ്കിൽ ടോക്കൺ ഇംപോർട്ടിന് ശേഷം Cursor-നുള്ള **ഉപയോഗം → പ്രൊവൈഡർ പരിധികൾ**
`api2.cursor.sh`-ലെ Bearer API-കൾ ഉപയോഗിക്കുന്നു
(`GetCurrentPeriodUsage` → ഉപയോഗ സംഗ്രഹം → auth/usage). പഴയ IDE-ഇംപോർട്ട് ചെയ്ത സെഷനുകൾക്കായി
പഴയ cookie/`cursor.com` ഡാഷ്ബോർഡ് പാത അവസാന fallback ആയി തുടരുന്നു.

വിൻഡോകളിൽ സാധാരണയായി **ആകെ**, **Auto + Composer**, കൂടാതെ **API** എന്നിവ ഉൾപ്പെടുന്നു.
പരിധികൾ ശൂന്യമായി കാണുകയാണെങ്കിൽ, **Cursor ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക** വീണ്ടും പ്രവർത്തിപ്പിക്കുകയോ ടോക്കണുകൾ വീണ്ടും ഇംപോർട്ട് ചെയ്യുകയോ ചെയ്യുക
(IDE ഇംപോർട്ട് മാത്രം ഇനി ആവശ്യമില്ല).

## ശൂന്യമായ ടേണുകൾ / ഉപയോഗപരിധി കഴിഞ്ഞത്

Cursor ഒരു Run സ്വീകരിച്ചിട്ടും assistant ടെക്സ്റ്റ് ഒന്നും മടക്കിനൽകാത്തപ്പോൾ (പ്രീമിയം
ഉപയോഗപരിധി തീർന്നാൽ ഇത് സാധാരണമാണ്), OmniRoute പ്രവർത്തിക്കാൻ കഴിയുന്ന നിർദ്ദേശങ്ങളോടുകൂടിയ **429** (ക്വോട്ട സൂചനകൾ) അല്ലെങ്കിൽ
**502** കാണിക്കുന്നു — വെറും “പ്രൊവൈഡർ ശൂന്യമായ ഉള്ളടക്കം മടക്കിനൽകി” എന്ന സന്ദേശമല്ല. ഉപയോഗ വിൻഡോ തീർന്നതിനാൽ ഉണ്ടാകുന്ന
`not_found: AI Model Not Found` പോലുള്ള സ്ട്രീമിംഗ് പരാജയങ്ങളെ
**Cursor നിരക്ക് പരിധി / ഉപയോഗപരിധി കവിഞ്ഞു** എന്നായി വർഗ്ഗീകരിക്കുകയും SSE പൈപ്പ്ലൈനിലുടനീളം ആ സന്ദേശം
നിലനിർത്തുകയും ചെയ്യുന്നു (ഇതിനകം പുറപ്പെടുവിച്ച പിശകിനെ പങ്കിട്ട empty-stream guard തിരുത്തിയെഴുതില്ല).
പ്രൊവൈഡർ പരിധികൾ പരിശോധിക്കുക, **`auto`** മോഡൽ പരീക്ഷിക്കുക, അല്ലെങ്കിൽ Cursor പ്ലാൻ പരിധികൾ ഉയർത്തുക.

## ക്ലയന്റ് പതിപ്പ് (headless)

ലോക്കൽ `cursor-agent` ഇൻസ്റ്റാളേഷൻ ഇല്ലെങ്കിൽ, OmniRoute
`x-cursor-client-version` നിർണ്ണയിക്കുന്നത് ആദ്യം env `CURSOR_AGENT_CLI_VERSION` വഴിയും, തുടർന്ന് Cursor installer script-ന്റെ
ഡിസ്കിൽ cache ചെയ്ത scrape വഴിയും, ഒടുവിൽ pinned build id വഴിയുമാണ്. ആവശ്യമുള്ളപ്പോൾ
`CURSOR_AGENT_CLI_VERSION` ഉപയോഗിച്ച് ഇത് override ചെയ്യുക.

## Fallback: മാനുവൽ ടോക്കൺ ഇംപോർട്ട്

ബ്രൗസർ ലോഗിൻ പൂർത്തിയാക്കാൻ കഴിയുന്നില്ലെങ്കിൽ:

1. ഹോസ്റ്റിൽ, Cursor-ന്റെ `state.vscdb`-യിൽ നിന്ന് ടോക്കണുകൾ എടുക്കുക:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal-ൽ **ടോക്കൺ ഇംപോർട്ട് ചെയ്യുക** തുറക്കുക.
3. **Access Token** ഒട്ടിക്കുക; ലഭ്യമാണെങ്കിൽ **Refresh Token**-ഉം ഒട്ടിക്കുക (സ്വയമേവ
   പുതുക്കുന്നതിന് ഇത് ആവശ്യമാണ്). Machine ID ഐച്ഛികമാണ്.

Access token മാത്രം ഉപയോഗിച്ചുള്ള ഇംപോർട്ടുകളും പ്രവർത്തിക്കും, എന്നാൽ refresh token ഇല്ലെങ്കിൽ അവയുടെ കാലാവധി അവസാനിക്കും —
ചാറ്റിൽ authentication പിശകുകൾ ലഭിക്കുമ്പോൾ വീണ്ടും ഇംപോർട്ട് ചെയ്യുക.

## ബന്ധപ്പെട്ടവ

- Zed Docker മാർഗ്ഗനിർദ്ദേശം: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor ലോഗിൻ റഫറൻസ് (ബാഹ്യം):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
