# Cursor Provider in Docker Environments (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Nígbà tí OmniRoute bá ń ṣiṣẹ́ nínú Docker, àwọn ọ̀nà àtijọ́ **Import from Cursor IDE** /
`cursor-agent` kì í ṣiṣẹ́ nítorí container kò lè rí fifi Cursor sori host náà.
Lo **Login with Cursor** (deep-control PKCE) dípò rẹ̀.

## Ìdí tí IDE / CLI Import kò fi ṣiṣẹ́ nínú Docker

1. **Ìyàsọ́tọ̀ filesystem** — Auto-import máa ń wá àwọn path Linux bíi
   `~/.config/Cursor/User/globalStorage/state.vscdb` _nínú_ container náà.
   Lórí Docker Desktop fún macOS, IDE DB ti host kì í jẹ́ mounted láìyípadà, àti
   pé OS container náà jẹ́ Linux kódà bí host náà bá jẹ́ Darwin.
2. **Kò sí binary `cursor-agent`** — Àwọn image OmniRoute ìjọba kò ní
   `cursor-agent`. Available Models tẹ́lẹ̀ máa ń pe
   `cursor-agent --list-models` láti inú shell, ó sì máa ń padà sí catalog tó dúró ṣinṣin.
3. **Binary tí kò tọ́** — Má ṣe bind-mount `cursor-agent` macOS sínú container
   Linux. Kò ní lè ṣiṣẹ́.

## Àbá: Login with Cursor

1. Ṣí **Dashboard → Providers → Cursor**.
2. Yan tab **Login with Cursor**.
3. Tẹ **Login with Cursor** — OmniRoute yóò ṣí
   `https://cursor.com/loginDeepControl?…` nínú browser **host** rẹ.
4. Fọwọ́sí ìwọlé náà nínú browser, lẹ́yìn náà padà sí dashboard. OmniRoute
   máa ń ṣàyẹ̀wò `api2.cursor.sh/auth/poll` títí àwọn token yóò fi dé.
5. OmniRoute máa ń tọ́jú àwọn token **access + refresh**, ó sì máa ń sọ wọ́n di tuntun nípasẹ̀
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ọ̀nà yìí kò nílò Cursor IDE tàbí `cursor-agent` nínú container.

## Ìṣàwárí model

Pẹ̀lú connection tí a ti wọlé sí, **Available Models / Auto-Sync** máa ń kọ́kọ́ yan catalog
HTTP `AiService/AvailableModels` ti Cursor nípa lílo bearer token connection náà.
Tí ìyẹn bá kùnà, OmniRoute ṣì máa gbìyànjú `cursor-agent` ti host (tí ó bá wà), lẹ́yìn náà
seed registry tó dúró ṣinṣin.

OmniRoute máa ń fi **`auto`** hàn ní gbogbo ìgbà nínú catalog (ìfihàn “Auto”), pẹ̀lú
àwọn mode router ti ara OpenCodex **`auto-cost`**, **`auto-balance`**, àti
**`auto-intelligence`**. Lórí wire, àwọn wọ̀nyí máa ń map sí model `default` ti Cursor
(pẹ̀lú `optimization` ModelParameter fún àwọn variant mẹ́tẹ̀ẹ̀ta). Yan
`cu/auto` nígbà tí usage àwọn model premium bá ti tán — Auto sábà máa ń ṣì ní budget.

### Catalog live nìkan ni a máa ń lò nígbà tí a bá ti sync

Lẹ́yìn sync model Cursor tó ṣàṣeyọrí (`cursor-agent --list-models` → catalog
synced tí a fi pamọ́, tàbí fetch `AvailableModels` tó lo ìfàṣẹsí bearer lókè), àwọn
**dashboard**, **`/v1/models`**, àti àkójọ **Test All** máa ń fi àwọn wọ̀nyí hàn:

1. Àwọn model tí live sync dá padà
2. Àwọn id auto-router tí a fi kun: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Àwọn model **custom** ti operator (Import / fífi kun pẹ̀lú ọwọ́) — sync kì í yọ wọ́n kúrò láé

Registry ńlá tó dúró ṣinṣin lábẹ́
`open-sse/config/providers/registry/cursor/` jẹ́ **fallback offline nìkan**. Nígbà tí
synced bá ṣófo (tàbí tí ìṣàwárí bá kùnà), àkójọ náà máa ń padà sí registry yẹn.

Àwọn id tó ní suffix effort (fún àpẹẹrẹ `claude-4.6-sonnet-high`) ṣì lè jẹ́
**requested** ní runtime: `resolveRequestedModel` máa ń yọ suffix náà kúrò, ó sì sọ ọ́ di
`ModelParameter` wire. Àkójọ exclusive náà mọ̀ọ́mọ̀ fi àwọn variant tó dúró ṣinṣin wọ̀nyẹn pamọ́
kúrò ní Test All kí àwọn probe lè bá ohun tí Cursor dá padà gẹ́gẹ́ bí ohun tó wà mu.

### Àwọn olùrànlọ́wọ́

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ìdàpọ̀ dashboard
- `ensureCursorAutoCatalogEntry` — fífi auto* kun nígbà ìṣàwárí + àkójọ
- `shouldSuppressStaticModelForExclusiveListing` — loop static `/v1/models`

## Àwọn Ìwọ̀n Provider (quota)

**Usage → Provider Limits** fún Cursor máa ń lo Bearer APIs lórí `api2.cursor.sh`
(`GetCurrentPeriodUsage` → àkótán usage → auth/usage) lẹ́yìn PKCE tàbí import
token. Ọ̀nà àtijọ́ cookie/dashboard `cursor.com` ṣì wà gẹ́gẹ́ bí fallback ìkẹyìn
fún àwọn session àtijọ́ tí a import láti IDE.

Àwọn window sábà máa ń ní **Total**, **Auto + Composer**, àti **API**. Tí
àwọn limit bá dà bí ẹni pé wọ́n ṣófo, tún ṣe **Login with Cursor** tàbí tún import àwọn token (IDE import
nìkan kò ṣe dandan mọ́).

## Àwọn turn ṣófo / usage ti tán

Nígbà tí Cursor bá gba Run ṣùgbọ́n tí kò dá text assistant kankan padà (èyí wọ́pọ̀ nígbà tí
usage premium bá ti tán), OmniRoute máa ń fi **429** tó lè ràn ọ́ lọ́wọ́ hàn (àwọn ìtọ́ka quota) tàbí
**502** pẹ̀lú ìtọ́sọ́nà — kì í ṣe “Provider returned empty content” lásán. Àwọn ìkùnà
streaming bíi `not_found: AI Model Not Found` (window usage ti tán) ni a máa ń
sọ̀rí sí **Cursor rate limit / usage exceeded**, wọ́n sì máa ń pa message yẹn mọ́
jù lọ nípasẹ̀ pipeline SSE (guard empty-stream tí gbogbo wọn ń lò kì í kọ lórí error
tí a ti fi hàn tẹ́lẹ̀). Ṣàyẹ̀wò Provider Limits, gbìyànjú model **`auto`**, tàbí mú
àwọn limit plan Cursor pọ̀ sí i.

## Version client (headless)

Láìsí fifi `cursor-agent` sori ẹrọ local, OmniRoute máa ń resolve
`x-cursor-client-version` nípasẹ̀ env `CURSOR_AGENT_CLI_VERSION`, lẹ́yìn náà scrape
script installer Cursor tí a cache sí disk, lẹ́yìn náà build id tí a pin. Override rẹ̀ pẹ̀lú
`CURSOR_AGENT_CLI_VERSION` nígbà tó bá yẹ.

## Fallback: Import Token Pẹ̀lú Ọwọ́

Tí o kò bá lè parí ìwọlé browser:

1. Lórí host, yọ àwọn token jáde láti `state.vscdb` ti Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Ṣí **Import token** nínú modal auth Cursor.
3. Lẹ **Access Token** mọ́ ọn àti, tí ó bá wà, **Refresh Token** (a nílò rẹ̀ fún
   refresh aládàáṣiṣẹ́). Machine ID jẹ́ àṣàyàn.

Àwọn import access-token-nìkan ṣì máa ń ṣiṣẹ́, ṣùgbọ́n wọ́n máa parí láìsí refresh token —
tún import nígbà tí chat bá ń dá àwọn error authentication padà.

## Àwọn Ohun Tó Jọmọ́

- Ìtọ́sọ́nà Zed Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Ìtọ́kasí ìwọlé OpenCodex Cursor (ti ita):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
