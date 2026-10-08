# Cursor Provider in Docker Environments (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute inapoendeshwa ndani ya Docker, mitiririko ya zamani ya **Leta kutoka Cursor IDE** /
`cursor-agent` hushindwa kwa sababu kontena haliwezi kuona usakinishaji wa Cursor kwenye mfumo mwenyeji.
Badala yake, tumia **Ingia kwa Cursor** (deep-control PKCE).

## Kwa Nini Uletaji Kutoka IDE / CLI Hushindwa Kwenye Docker

1. **Utengano wa mfumo wa faili** — Uletaji otomatiki hutafuta njia za Linux kama
   `~/.config/Cursor/User/globalStorage/state.vscdb` _ndani_ ya kontena.
   Kwenye Docker Desktop ya macOS, hifadhidata ya IDE ya mfumo mwenyeji haijaunganishwa kwa chaguo-msingi, na
   OS ya kontena ni Linux hata wakati mfumo mwenyeji ni Darwin.
2. **Hakuna faili tekelezi ya `cursor-agent`** — Picha rasmi za OmniRoute haziji na
   `cursor-agent`. Hapo awali, Miundo Inayopatikana ilitekeleza
   `cursor-agent --list-models` kupitia shell na, ikishindwa, ilitumia katalogi tuli.
3. **Faili tekelezi isiyo sahihi** — **Usiunganishe** `cursor-agent` ya macOS kwenye kontena la
   Linux kwa bind-mount. Haitatekelezwa.

## Inapendekezwa: Ingia kwa Cursor

1. Fungua **Dashibodi → Watoa Huduma → Cursor**.
2. Chagua kichupo cha **Ingia kwa Cursor**.
3. Bofya **Ingia kwa Cursor** — OmniRoute hufungua
   `https://cursor.com/loginDeepControl?…` katika kivinjari cha **mfumo wako mwenyeji**.
4. Idhinisha kuingia katika kivinjari, kisha urudi kwenye dashibodi. OmniRoute
   huuliza `api2.cursor.sh/auth/poll` mara kwa mara hadi tokeni zipatikane.
5. OmniRoute huhifadhi tokeni za **ufikiaji + uonyeshaji upya** na kuzionyesha upya kupitia
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Njia hii haihitaji Cursor IDE au `cursor-agent` ndani ya kontena.

## Ugunduzi wa miundo

Ukiwa na muunganisho ulioingia, **Miundo Inayopatikana / Usawazishaji Otomatiki** hutanguliza katalogi ya
HTTP `AiService/AvailableModels` ya Cursor kwa kutumia tokeni bearer ya muunganisho.
Hilo likishindwa, OmniRoute bado hujaribu `cursor-agent` ya mfumo mwenyeji (ikiwa ipo), kisha
mbegu ya sajili tuli.

OmniRoute daima huonyesha **`auto`** katika katalogi (jina linaloonyeshwa “Otomatiki”), pamoja na
hali za kipanga-njia za mtindo wa OpenCodex **`auto-cost`**, **`auto-balance`**, na
**`auto-intelligence`**. Katika mawasiliano, hizi huelekezwa kwenye muundo wa `default` wa Cursor
(zikiwa na `optimization` ModelParameter kwa aina hizo tatu). Pendelea
`cu/auto` wakati matumizi ya miundo ya kulipia yamekwisha — Otomatiki mara nyingi bado huwa na bajeti.

### Katalogi ya moja kwa moja ndiyo pekee baada ya kusawazishwa

Baada ya usawazishaji wenye mafanikio wa miundo ya Cursor (`cursor-agent --list-models` → katalogi
iliyosawazishwa na kuhifadhiwa, au ombi la `AvailableModels` lililothibitishwa kwa bearer hapo juu),
**dashibodi**, **`/v1/models`**, na **Jaribu Zote** huorodhesha:

1. Miundo iliyorejeshwa na usawazishaji wa moja kwa moja
2. Vitambulisho vilivyoingizwa vya vipanga-njia otomatiki: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Miundo **maalumu** ya mwendeshaji (Uletaji / kuingiza mwenyewe) — kamwe haiondolewi na usawazishaji

Sajili kubwa tuli iliyo chini ya
`open-sse/config/providers/registry/cursor/` ni **ya matumizi ya akiba nje ya mtandao pekee**. Wakati
katalogi iliyosawazishwa ni tupu (au ugunduzi umeshindwa), uorodheshaji hurudi kutumia sajili hiyo.

Vitambulisho vyenye kiambishi cha kiwango cha juhudi (kwa mfano `claude-4.6-sonnet-high`) bado vinaweza
**kuombwa** wakati wa utekelezaji: `resolveRequestedModel` huondoa kiambishi na kukiweka kwenye
`ModelParameter` ya mawasiliano. Uorodheshaji wa kipekee huficha kimakusudi aina hizo tuli
kutoka Jaribu Zote ili majaribio yalingane na kile ambacho Cursor inarejesha kuwa kinapatikana.

### Visaidizi

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — uunganishaji wa dashibodi
- `ensureCursorAutoCatalogEntry` — kuingiza auto* wakati wa ugunduzi + uorodheshaji
- `shouldSuppressStaticModelForExclusiveListing` — kitanzi tuli cha `/v1/models`

## Vikomo vya Mtoa Huduma (kiasi cha matumizi)

**Matumizi → Vikomo vya Mtoa Huduma** kwa Cursor hutumia API za Bearer kwenye `api2.cursor.sh`
(`GetCurrentPeriodUsage` → muhtasari wa matumizi → auth/usage) baada ya PKCE au uletaji wa
tokeni. Njia ya zamani ya kidakuzi/dashibodi ya `cursor.com` hubaki kuwa chaguo la mwisho
kwa vipindi vya zamani vilivyoletwa kutoka IDE.

Madirisha kwa kawaida hujumuisha **Jumla**, **Otomatiki + Composer**, na **API**. Ikiwa
vikomo vinaonekana tupu, tekeleza tena **Ingia kwa Cursor** au ulete tena tokeni (uletaji kutoka IDE
pekee hauhitajiki tena).

## Zamu tupu / matumizi yamekwisha

Cursor inapokubali Run lakini hairudishi maandishi ya msaidizi (jambo la kawaida wakati matumizi ya
kulipia yamekwisha), OmniRoute huonyesha hitilafu ya **429** inayoweza kufanyiwa kazi (viashiria vya kiasi cha matumizi) au
**502** yenye mwongozo — si ujumbe usio na maelezo wa “Mtoa huduma amerudisha maudhui tupu”. Hitilafu za
utiririshaji kama `not_found: AI Model Not Found` (dirisha la matumizi limekwisha) huainishwa kama
**kikomo cha kasi cha Cursor / matumizi yamezidi** na huhifadhi ujumbe huo katika mtiririko wa
SSE (kinga ya pamoja ya mtiririko tupu haibadilishi hitilafu ambayo tayari imetolewa).
Angalia Vikomo vya Mtoa Huduma, jaribu muundo **`auto`**, au ongeza vikomo vya mpango wa Cursor.

## Toleo la kiteja (bila kiolesura)

Bila usakinishaji wa ndani wa `cursor-agent`, OmniRoute hubaini
`x-cursor-client-version` kupitia env `CURSOR_AGENT_CLI_VERSION`, kisha uchambuzi uliohifadhiwa kwenye
diski wa hati ya usakinishaji ya Cursor, halafu kitambulisho cha toleo kilichobandikwa. Batilisha kwa
`CURSOR_AGENT_CLI_VERSION` inapohitajika.

## Chaguo la Akiba: Uletaji wa Tokeni kwa Mkono

Ikiwa huwezi kukamilisha kuingia kupitia kivinjari:

1. Kwenye mfumo mwenyeji, toa tokeni kutoka `state.vscdb` ya Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Fungua **Leta tokeni** katika kidirisha cha uthibitishaji cha Cursor.
3. Bandika **Tokeni ya Ufikiaji** na, inapopatikana, **Tokeni ya Uonyeshaji Upya** (inahitajika kwa
   uonyeshaji upya wa kiotomatiki). Kitambulisho cha mashine ni cha hiari.

Uletaji wa tokeni ya ufikiaji pekee bado hufanya kazi lakini muda wake utaisha bila tokeni ya uonyeshaji upya —
leta tena wakati gumzo linaporudisha hitilafu za uthibitishaji.

## Yanayohusiana

- Mwongozo wa Zed kwenye Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Marejeleo ya kuingia kwa Cursor ya OpenCodex (ya nje):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
