# Cursor Provider in Docker Environments (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Lokacin da OmniRoute yake gudana a cikin Docker, tsofaffin hanyoyin **Shigo daga Cursor IDE** /
`cursor-agent` ba sa aiki saboda container ba ya iya ganin shigarwar Cursor da ke kan host.
A maimakon haka, yi amfani da **Shiga da Cursor** (deep-control PKCE).

## Dalilin da ya sa Shigo daga IDE / CLI ba ya Aiki a Docker

1. **Keɓewar tsarin fayiloli** — Shigo ta atomatik yana neman hanyoyin Linux kamar
   `~/.config/Cursor/User/globalStorage/state.vscdb` _a cikin_ container.
   A Docker Desktop na macOS, ba a mount ɗin bayanan IDE DB na host ta tsoho, kuma
   tsarin aiki na container Linux ne ko da kuwa host ɗin Darwin ne.
2. **Babu binary na `cursor-agent`** — Hotunan OmniRoute na hukuma ba sa zuwa da
   `cursor-agent`. A baya Samfuran da Ake da Su suna gudanar da
   `cursor-agent --list-models` ta shell, sannan su koma amfani da kasida tabbatacciya.
3. **Binary mara dacewa** — Kada ka yi bind-mount na `cursor-agent` na macOS zuwa cikin
   container na Linux. Ba zai iya gudana ba.

## Shawarwari: Shiga da Cursor

1. Buɗe **Dashboard → Providers → Cursor**.
2. Zaɓi shafin **Shiga da Cursor**.
3. Danna **Shiga da Cursor** — OmniRoute zai buɗe
   `https://cursor.com/loginDeepControl?…` a burauzar **host** ɗinka.
4. Amince da shiga a cikin burauzar, sannan ka koma dashboard. OmniRoute
   yana polling na `api2.cursor.sh/auth/poll` har sai tokens sun iso.
5. OmniRoute yana adana tokens na **access + refresh**, sannan yana sabunta su ta
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Wannan hanyar ba ta buƙatar Cursor IDE ko `cursor-agent` a cikin container.

## Gano samfura

Idan akwai haɗin da aka shiga, **Samfuran da Ake da Su / Daidaitawa ta Atomatik** yana fifita kasidar
HTTP `AiService/AvailableModels` ta Cursor ta amfani da bearer token na haɗin.
Idan hakan ya gaza, OmniRoute har yanzu yana gwada `cursor-agent` na host idan yana nan, sannan
ya koma ga static registry seed.

OmniRoute koyaushe yana nuna **`auto`** a cikin kasida (sunan nuni “Auto”), tare da
hanyoyin router irin na OpenCodex, wato **`auto-cost`**, **`auto-balance`**, da
**`auto-intelligence`**. A kan wire, waɗannan suna komawa zuwa samfurin `default` na Cursor
(tare da `optimization` ModelParameter ga bambance-bambancen ukun). Fi son
`cu/auto` lokacin da amfanin premium models ya ƙare — Auto sau da yawa har yanzu yana da kasafi.

### Kasidar kai tsaye ce kaɗai ake amfani da ita bayan daidaitawa

Bayan nasarar daidaita samfuran Cursor (`cursor-agent --list-models` → kasidar da aka
daidaita kuma aka adana, ko kuma samo `AvailableModels` da aka tabbatar da bearer a sama),
**dashboard**, **`/v1/models`**, da jerin **Gwada Duka** suna nuna:

1. Samfuran da live sync ya dawo da su
2. Id na auto-router da aka saka: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Samfuran **custom** na mai gudanarwa (Shigo / na hannu) — sync ba ya taɓa cire su

Babbar static registry da ke ƙarƙashin
`open-sse/config/providers/registry/cursor/` ana amfani da ita ne **kawai a matsayin madadin offline**. Idan
synced babu komai a ciki (ko gano samfura ya gaza), jerin zai koma amfani da wannan registry.

Har yanzu ana iya **nema** ids masu suffix na effort (misali `claude-4.6-sonnet-high`)
a lokacin gudana: `resolveRequestedModel` yana cire suffix ɗin ya mai da shi
`ModelParameter` na wire. Jerin keɓantacce da gangan yana ɓoye waɗannan static variants
daga Gwada Duka domin gwaje-gwajen su dace da abin da Cursor ya dawo da shi a matsayin samuwa.

### Mataimaka

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — haɗawar dashboard
- `ensureCursorAutoCatalogEntry` — saka auto* yayin ganowa + jera samfura
- `shouldSuppressStaticModelForExclusiveListing` — static loop na `/v1/models`

## Iyakokin Provider (quota)

**Usage → Provider Limits** na Cursor yana amfani da Bearer APIs a `api2.cursor.sh`
(`GetCurrentPeriodUsage` → taƙaitaccen amfani → auth/usage) bayan PKCE ko shigo da
token. Tsohuwar hanyar dashboard ta cookie/`cursor.com` tana nan a matsayin madadin ƙarshe
ga tsofaffin sessions da aka shigo da su daga IDE.

Windows yawanci suna haɗa da **Total**, **Auto + Composer**, da **API**. Idan
limits sun bayyana babu komai, sake gudanar da **Shiga da Cursor** ko sake shigo da tokens (ba a
ƙara buƙatar shigo daga IDE shi kaɗai).

## Saƙonni marasa komai / ƙarewar amfani

Lokacin da Cursor ya karɓi Run amma bai dawo da rubutun assistant ba (abin da aka fi gani idan
an ƙare premium usage), OmniRoute yana nuna **429** mai bayanin abin da za a yi (alamun quota) ko
**502** tare da jagora — ba kawai “Provider ya dawo da abun ciki mara komai” ba. Gazawar streaming
kamar `not_found: AI Model Not Found` (lokacin da usage window ya ƙare) ana
rarraba su a matsayin **an kai iyakar Cursor / amfani ya wuce iyaka**, kuma saƙon yana nan
ta cikin SSE pipeline (shared empty-stream guard ba ya maye gurbin kuskuren da aka
riga aka fitar). Duba Provider Limits, gwada samfurin **`auto`**, ko ƙara
iyakokin tsarin Cursor.

## Sigar client (headless)

Ba tare da shigarwar `cursor-agent` ta gida ba, OmniRoute yana tantance
`x-cursor-client-version` ta env `CURSOR_AGENT_CLI_VERSION`, sannan ta scrape na
script ɗin shigar da Cursor da aka cache a disk, sannan ta pinned build id. Yi override da
`CURSOR_AGENT_CLI_VERSION` idan ana buƙata.

## Madadi: Shigo da Token da Hannu

Idan ba za ka iya kammala shiga ta burauza ba:

1. A kan host, cire tokens daga `state.vscdb` na Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Buɗe **Shigo da token** a cikin modal na tantancewar Cursor.
3. Liƙa **Access Token** kuma, idan yana samuwa, **Refresh Token** (ana buƙatarsa don
   sabuntawa ta atomatik). Machine ID ba dole ba ne.

Shigo da access token kaɗai har yanzu yana aiki, amma zai ƙare ba tare da refresh token ba —
sake shigo da shi idan chat ya dawo da kurakuran tantancewa.

## Masu Alaƙa

- Jagorar Zed Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Manazartar shiga Cursor ta OpenCodex (ta waje):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
