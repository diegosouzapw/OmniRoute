# Cursor Provider in Docker Environments (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Meta OmniRoute jitħaddem ġewwa Docker, il-flussi tradizzjonali **Importa minn Cursor IDE** /
`cursor-agent` ifallu għax il-container ma jistax jara l-installazzjoni ta’ Cursor
fuq il-host. Minflok, uża **Idħol b’Cursor** (deep-control PKCE).

## Għaliex l-Importazzjoni mill-IDE / CLI Tfalli f’Docker

1. **Iżolament tas-sistema tal-fajls** — L-importazzjoni awtomatika tfittex mogħdijiet Linux bħal
   `~/.config/Cursor/User/globalStorage/state.vscdb` _ġewwa_ l-container.
   Fuq Docker Desktop għal macOS, id-database tal-IDE tal-host ma tkunx immuntata awtomatikament, u
   s-sistema operattiva tal-container tkun Linux anki meta l-host ikun Darwin.
2. **M’hemmx il-binarju `cursor-agent`** — L-immaġnijiet uffiċjali ta’ OmniRoute ma jinkludux
   `cursor-agent`. Qabel, Mudelli Disponibbli kien iħaddem
   `cursor-agent --list-models` permezz tax-shell u, jekk dan ifalli, juża katalgu statiku.
3. **Binarju ħażin** — **Timmuntax** b’bind mount `cursor-agent` ta’ macOS f’container
   Linux. Dan ma jkunx jista’ jitħaddem.

## Rakkomandat: Idħol b’Cursor

1. Iftaħ **Dashboard → Fornituri → Cursor**.
2. Agħżel it-tab **Idħol b’Cursor**.
3. Ikklikkja **Idħol b’Cursor** — OmniRoute jiftaħ
   `https://cursor.com/loginDeepControl?…` fil-browser tal-**host** tiegħek.
4. Approva l-login fil-browser, imbagħad erġa’ lura għad-dashboard. OmniRoute
   jivverifika perjodikament `api2.cursor.sh/auth/poll` sakemm jaslu t-tokens.
5. OmniRoute jaħżen it-tokens ta’ **aċċess + tiġdid** u jġeddidhom permezz ta’
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Din il-mogħdija ma teħtieġx Cursor IDE jew `cursor-agent` ġewwa l-container.

## Skoperta tal-mudelli

B’konnessjoni li tkun illoggjata, **Mudelli Disponibbli / Sinkronizzazzjoni Awtomatika** tippreferi l-katalgu
HTTP `AiService/AvailableModels` ta’ Cursor billi tuża t-token bearer tal-konnessjoni.
Jekk dan ifalli, OmniRoute xorta jipprova `cursor-agent` tal-host (meta jkun preżenti), u mbagħad
is-seed tar-reġistru statiku.

OmniRoute dejjem jesponi **`auto`** fil-katalgu (muri bħala “Auto”), flimkien
mal-modi tar-router bi stil OpenCodex **`auto-cost`**, **`auto-balance`**, u
**`auto-intelligence`**. Fit-trażmissjoni dawn jiġu mmappjati għall-mudell `default` ta’ Cursor
(b’`optimization` ModelParameter għat-tliet varjanti). Ippreferi
`cu/auto` meta l-użu tal-mudelli premium ikun eżawrit — Auto spiss xorta jkollu baġit.

### Il-katalgu live huwa esklużiv meta jkun sinkronizzat

Wara sinkronizzazzjoni b’suċċess tal-mudelli ta’ Cursor (`cursor-agent --list-models` → katalgu
sinkronizzat u ppersistit, jew il-fetch awtentikat b’bearer ta’ `AvailableModels` imsemmi hawn fuq), id-
**dashboard**, **`/v1/models`**, u **Ittestja Kollha** jelenkaw:

1. Mudelli rritornati mis-sinkronizzazzjoni live
2. IDs tar-router awtomatiku injettati: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Mudelli **personalizzati** tal-operatur (Importazzjoni / manwali) — qatt ma jitneħħew mis-sinkronizzazzjoni

Ir-reġistru statiku l-kbir taħt
`open-sse/config/providers/registry/cursor/` huwa **riżerva offline biss**. Meta
l-lista sinkronizzata tkun vojta (jew l-iskoperta tfalli), l-elenkar jaqa’ lura għal dak ir-reġistru.

IDs b’suffiss tal-livell ta’ sforz (pereżempju `claude-4.6-sonnet-high`) xorta jistgħu jiġu
**mitluba** waqt l-eżekuzzjoni: `resolveRequestedModel` ineħħi s-suffiss u jibdlu f’
`ModelParameter` għat-trażmissjoni. L-elenkar esklużiv intenzjonalment jaħbi dawk il-varjanti statiċi
minn Ittestja Kollha sabiex il-provi jaqblu ma’ dak li Cursor effettivament jirritorna bħala disponibbli.

### Funzjonijiet awżiljarji

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — integrazzjoni fid-dashboard
- `ensureCursorAutoCatalogEntry` — injezzjoni ta’ auto* waqt l-iskoperta + l-elenkar
- `shouldSuppressStaticModelForExclusiveListing` — loop statiku ta’ `/v1/models`

## Limiti tal-Fornitur (kwota)

**Użu → Limiti tal-Fornitur** għal Cursor juża APIs Bearer fuq `api2.cursor.sh`
(`GetCurrentPeriodUsage` → sommarju tal-użu → auth/usage) wara PKCE jew importazzjoni
ta’ token. Il-mogħdija tradizzjonali tal-cookie/dashboard ta’ `cursor.com` tibqa’ l-aħħar alternattiva
għal sessjonijiet antiki importati mill-IDE.

Normalment, it-twieqi jinkludu **Total**, **Auto + Composer**, u **API**. Jekk
il-limiti jidhru vojta, erġa’ ħaddem **Idħol b’Cursor** jew erġa’ importa t-tokens (l-importazzjoni mill-IDE
waħedha m’għadhiex meħtieġa).

## Turns vojta / użu eżawrit

Meta Cursor jaċċetta Run iżda ma jirritorna l-ebda test tal-assistent (ħaġa komuni meta l-użu
premium ikun eżawrit), OmniRoute juri żball **429** azzjonabbli (indikazzjonijiet dwar il-kwota) jew
**502** bi gwida — mhux sempliċement “Il-fornitur irritorna kontenut vojt”. Fallimenti tal-istreaming
bħal `not_found: AI Model Not Found` (tieqa tal-użu eżawrita) jiġu
kklassifikati bħala **limitu tar-rata ta’ Cursor / użu maqbuż** u jżommu dak il-messaġġ
tul il-pipeline SSE (il-protezzjoni kondiviża kontra stream vojt ma tissostitwixxix
żball li jkun diġà ntbagħat). Iċċekkja l-Limiti tal-Fornitur, ipprova l-mudell **`auto`**, jew għolli
l-limiti tal-pjan ta’ Cursor.

## Verżjoni tal-klijent (headless)

Mingħajr installazzjoni lokali ta’ `cursor-agent`, OmniRoute jirriżolvi
`x-cursor-client-version` permezz tal-env `CURSOR_AGENT_CLI_VERSION`, imbagħad permezz ta’ scrape
maħżun fuq id-disk tal-iskript tal-installazzjoni ta’ Cursor, u fl-aħħar permezz ta’ build id fiss. Issostitwixxi dan b’
`CURSOR_AGENT_CLI_VERSION` meta jkun meħtieġ.

## Alternattiva: Importazzjoni Manwali tat-Token

Jekk ma tistax tlesti l-login permezz tal-browser:

1. Fuq il-host, estratta t-tokens minn `state.vscdb` ta’ Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Iftaħ **Importa token** fil-modal tal-awtentikazzjoni ta’ Cursor.
3. Waħħal it-**Token tal-Aċċess** u, meta jkun disponibbli, it-**Token tat-Tiġdid** (meħtieġ għal
   tiġdid awtomatiku). Machine ID huwa fakultattiv.

Importazzjonijiet b’token tal-aċċess biss xorta jaħdmu, iżda jiskadu mingħajr token tat-tiġdid —
erġa’ importa meta ċ-chat jirritorna żbalji tal-awtentikazzjoni.

## Relatat

- Gwida ta’ Zed għal Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referenza esterna għal-login ta’ Cursor f’OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
