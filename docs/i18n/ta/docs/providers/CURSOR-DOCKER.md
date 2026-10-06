# Cursor Provider in Docker Environments (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute, Docker-க்குள் இயங்கும்போது, container-ஆல் host Cursor
நிறுவலைப் பார்க்க முடியாததால், பழைய **Cursor IDE-இலிருந்து இறக்குமதி** /
`cursor-agent` செயல்முறைகள் தோல்வியடையும். அதற்குப் பதிலாக **Cursor மூலம் உள்நுழைதல்**
(deep-control PKCE) முறையைப் பயன்படுத்தவும்.

## Docker-இல் IDE / CLI இறக்குமதி ஏன் தோல்வியடைகிறது

1. **கோப்பு முறைமைத் தனிமைப்படுத்தல்** — தானியங்கி இறக்குமதி, container-க்கு
   _உள்ளே_ `~/.config/Cursor/User/globalStorage/state.vscdb` போன்ற Linux
   பாதைகளைத் தேடுகிறது. macOS-க்கான Docker Desktop-இல் host IDE DB இயல்பாக
   mount செய்யப்படுவதில்லை; மேலும் host Darwin ஆக இருந்தாலும் container OS
   Linux ஆகும்.
2. **`cursor-agent` binary இல்லை** — அதிகாரப்பூர்வ OmniRoute images-ல்
   `cursor-agent` சேர்க்கப்படவில்லை. முன்பு, கிடைக்கக்கூடிய மாதிரிகளைப் பெற
   `cursor-agent --list-models` shell வழியாக இயக்கப்பட்டு, அது தோல்வியடைந்தால்
   நிலையான catalog பயன்படுத்தப்பட்டது.
3. **தவறான binary** — macOS `cursor-agent`-ஐ Linux container-க்குள்
   bind-mount செய்ய **வேண்டாம்**. அதை இயக்க முடியாது.

## பரிந்துரைக்கப்படுவது: Cursor மூலம் உள்நுழைதல்

1. **Dashboard → Providers → Cursor** என்பதைத் திறக்கவும்.
2. **Cursor மூலம் உள்நுழைதல்** tab-ஐத் தேர்ந்தெடுக்கவும்.
3. **Cursor மூலம் உள்நுழைதல்** என்பதைக் கிளிக் செய்யவும் — OmniRoute,
   உங்கள் **host** browser-ல் `https://cursor.com/loginDeepControl?…` என்பதைத்
   திறக்கும்.
4. Browser-ல் உள்நுழைவை அங்கீகரித்துவிட்டு dashboard-க்குத் திரும்பவும்.
   Tokens கிடைக்கும் வரை OmniRoute, `api2.cursor.sh/auth/poll` endpoint-ஐ
   poll செய்யும்.
5. OmniRoute, **access + refresh** tokens-ஐச் சேமித்து, அவற்றை
   `https://api2.cursor.sh/auth/exchange_user_api_key` மூலம் புதுப்பிக்கும்.

இந்த வழிமுறைக்கு container-க்குள் Cursor IDE அல்லது `cursor-agent` தேவையில்லை.

## மாதிரி கண்டறிதல்

உள்நுழைந்த connection இருக்கும்போது, **கிடைக்கக்கூடிய மாதிரிகள் / தானியங்கி
ஒத்திசைவு**, connection bearer token-ஐப் பயன்படுத்தும் Cursor-ன் HTTP
`AiService/AvailableModels` catalog-க்கு முன்னுரிமை அளிக்கும். அது தோல்வியடைந்தால்,
OmniRoute இன்னும் host `cursor-agent`-ஐ (இருந்தால்) முயற்சித்து, பின்னர் நிலையான
registry seed-ஐப் பயன்படுத்தும்.

OmniRoute எப்போதும் catalog-ல் **`auto`** என்பதை (காட்சிப் பெயர் “Auto”)
வெளிப்படுத்தும்; மேலும் OpenCodex-பாணி router முறைகளான **`auto-cost`**,
**`auto-balance`**, மற்றும் **`auto-intelligence`** ஆகியவற்றையும் வழங்கும்.
Wire-ல், இவை Cursor-ன் `default` மாதிரியாக map செய்யப்படும் (மூன்று
மாற்றுவகைகளுக்கும் `optimization` ModelParameter உடன்). Premium மாதிரிகளின்
பயன்பாட்டு அளவு தீர்ந்திருக்கும்போது `cu/auto`-க்கு முன்னுரிமை அளிக்கவும் —
Auto-வில் பெரும்பாலும் இன்னும் budget இருக்கும்.

### ஒத்திசைக்கப்பட்டிருக்கும்போது live catalog மட்டுமே பயன்படுத்தப்படும்

Cursor மாதிரி ஒத்திசைவு வெற்றிகரமாக முடிந்த பிறகு (`cursor-agent --list-models`
→ persist செய்யப்பட்ட synced catalog, அல்லது மேலே உள்ள bearer-authenticated
`AvailableModels` fetch), **dashboard**, **`/v1/models`**, மற்றும் **அனைத்தையும்
சோதித்தல்** ஆகியவை பின்வருவனவற்றைப் பட்டியலிடும்:

1. Live sync வழங்கிய மாதிரிகள்
2. சேர்க்கப்பட்ட auto-router ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operator-ன் **custom** மாதிரிகள் (Import / manual) — sync மூலம் ஒருபோதும் அகற்றப்படாது

`open-sse/config/providers/registry/cursor/`-இன் கீழுள்ள பெரிய நிலையான registry,
**offline fallback-க்காக மட்டுமே** உள்ளது. Synced catalog காலியாக இருந்தால்
(அல்லது discovery தோல்வியடைந்தால்), பட்டியல் அந்த registry-க்கு fallback ஆகும்.

Effort suffix கொண்ட ids (எடுத்துக்காட்டாக `claude-4.6-sonnet-high`) runtime-இல்
இன்னும் **கோரப்படலாம்**: `resolveRequestedModel`, suffix-ஐ நீக்கி அதை ஒரு wire
`ModelParameter` ஆக மாற்றும். Cursor உண்மையில் கிடைக்கக்கூடியதாக வழங்கும்
மாதிரிகளுடன் probes பொருந்துவதற்காக, exclusive listing அந்த நிலையான variants-ஐ
அனைத்தையும் சோதித்தல் பட்டியலிலிருந்து திட்டமிட்டு மறைக்கிறது.

### உதவி functions

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — dashboard merge
- `ensureCursorAutoCatalogEntry` — discovery + listing சமயத்தில் auto* சேர்த்தல்
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` static loop

## Provider வரம்புகள் (quota)

Cursor-க்கான **பயன்பாடு → Provider வரம்புகள்**, PKCE அல்லது token import-க்குப்
பிறகு `api2.cursor.sh`-இல் உள்ள Bearer APIs-ஐப் பயன்படுத்துகிறது
(`GetCurrentPeriodUsage` → பயன்பாட்டுச் சுருக்கம் → auth/usage). பழைய IDE import
செய்யப்பட்ட sessions-க்காக, legacy cookie/`cursor.com` dashboard வழி கடைசி
fallback ஆகத் தொடர்ந்து இருக்கும்.

Windows பொதுவாக **மொத்தம்**, **Auto + Composer**, மற்றும் **API** ஆகியவற்றைக்
கொண்டிருக்கும். வரம்புகள் காலியாகத் தோன்றினால், **Cursor மூலம் உள்நுழைதல்**
செயல்முறையை மீண்டும் இயக்கவும் அல்லது tokens-ஐ மீண்டும் import செய்யவும்
(IDE import மட்டும் இனி தேவையில்லை).

## காலியான turns / பயன்பாட்டு அளவு தீர்ந்த நிலை

Cursor ஒரு Run-ஐ ஏற்றுக்கொண்டு assistant text எதையும் வழங்காதபோது (premium
பயன்பாட்டு அளவு தீர்ந்திருக்கும்போது இது பொதுவானது), OmniRoute வெறும்
“Provider காலியான உள்ளடக்கத்தை வழங்கியது” என்பதற்குப் பதிலாக, நடவடிக்கை
எடுக்க உதவும் **429** (quota குறிப்புகள்) அல்லது வழிகாட்டுதலுடன் கூடிய **502**
பிழையை வெளிப்படுத்தும். `not_found: AI Model Not Found` (பயன்பாட்டு window
தீர்ந்துவிட்டது) போன்ற streaming தோல்விகள், **Cursor rate limit / பயன்பாட்டு
வரம்பு மீறப்பட்டது** என வகைப்படுத்தப்பட்டு, அந்தச் செய்தி SSE pipeline
முழுவதும் தக்கவைக்கப்படும் (பகிரப்பட்ட empty-stream guard, ஏற்கெனவே வெளியிடப்பட்ட
பிழையை மேலெழுதாது). Provider வரம்புகளைச் சரிபார்க்கவும், **`auto`** மாதிரியை
முயற்சிக்கவும் அல்லது Cursor plan வரம்புகளை உயர்த்தவும்.

## Client பதிப்பு (headless)

உள்ளூர் `cursor-agent` நிறுவல் இல்லாதபோது, OmniRoute
`x-cursor-client-version`-ஐ முதலில் env `CURSOR_AGENT_CLI_VERSION` மூலம்
தீர்மானிக்கும்; பின்னர் Cursor installer script-இன் disk-cached scrape-ஐயும்,
அதற்குப் பிறகு pinned build id-ஐயும் பயன்படுத்தும். தேவைப்படும்போது
`CURSOR_AGENT_CLI_VERSION` மூலம் override செய்யவும்.

## Fallback: கைமுறை Token Import

Browser உள்நுழைவை நிறைவு செய்ய முடியாவிட்டால்:

1. Host-ல், Cursor-ன் `state.vscdb`-இலிருந்து tokens-ஐப் பிரித்தெடுக்கவும்:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal-ல் **Token-ஐ import செய்தல்** என்பதைத் திறக்கவும்.
3. **Access Token**-ஐயும், கிடைக்கும்போது **Refresh Token**-ஐயும் ஒட்டவும்
   (தானியங்கி refresh-க்கு இது தேவை). Machine ID விருப்பத்திற்குரியது.

Access token மட்டும் கொண்ட imports தொடர்ந்து செயல்படும்; ஆனால் refresh token
இல்லாமல் அவை காலாவதியாகும் — chat authentication பிழைகளை வழங்கும்போது மீண்டும்
import செய்யவும்.

## தொடர்புடையவை

- Zed Docker வழிகாட்டுதல்: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor உள்நுழைவு குறிப்பு (வெளிப்புறம்):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
