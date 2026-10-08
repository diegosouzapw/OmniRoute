# Cursor Provider in Docker Environments (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Mgbe OmniRoute na-arụ ọrụ n'ime Docker, usoro ochie nke **Mbubata site na Cursor IDE** /
`cursor-agent` anaghị arụ ọrụ n’ihi na container ahụ enweghị ike ịhụ nrụnye Cursor dị na host.
Jiri **Jiri Cursor Banye** (deep-control PKCE) kama nke ahụ.

## Ihe Mere Mbubata IDE / CLI Ji Ada na Docker

1. **Nkewapụ filesystem** — Mbubata akpaka na-achọ ụzọ Linux dịka
   `~/.config/Cursor/User/globalStorage/state.vscdb` _n'ime_ container ahụ.
   Na Docker Desktop maka macOS, anaghị etinye DB IDE nke host n’ime container na ndabara, ma
   OS nke container bụ Linux ọbụna mgbe host bụ Darwin.
2. **Enweghị binary `cursor-agent`** — Image OmniRoute ndị gọọmentị anaghị ebute
   `cursor-agent`. N’oge gara aga, Ụdị Dịnụ na-akpọ
   `cursor-agent --list-models` site na shell ma laghachi na katalọgụ static ma ọ bụrụ na nke ahụ ada.
3. **Binary na-ezighi ezi** — **Etinyela** `cursor-agent` nke macOS n’ime container
   Linux site na bind-mount. Ọ gaghị arụ ọrụ.

## A Tụrụ Aro: Jiri Cursor Banye

1. Mepee **Dashboard → Providers → Cursor**.
2. Họrọ taabụ **Jiri Cursor Banye**.
3. Pịa **Jiri Cursor Banye** — OmniRoute ga-emepe
   `https://cursor.com/loginDeepControl?…` na browser nke **host** gị.
4. Kwado nbanye ahụ na browser, wee laghachi na dashboard. OmniRoute
   na-enyocha `api2.cursor.sh/auth/poll` ugboro ugboro ruo mgbe token bịarutere.
5. OmniRoute na-echekwa token **access + refresh** ma na-eme ka ha dị ọhụrụ site na
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ụzọ a anaghị achọ Cursor IDE ma ọ bụ `cursor-agent` n'ime container ahụ.

## Nchọpụta model

Mgbe e nwere njikọ e ji banye, **Ụdị Dịnụ / Mmekọrịta Akpaka** na-ebu ụzọ họrọ katalọgụ
HTTP `AiService/AvailableModels` nke Cursor site na iji bearer token nke njikọ ahụ.
Ọ bụrụ na nke ahụ ada, OmniRoute ka ga-anwa `cursor-agent` nke host (mgbe ọ dị), wee
jiri mkpụrụ registry static.

OmniRoute na-egosi **`auto`** mgbe niile na katalọgụ (ngosi “Auto”), yana
usoro router ụdị OpenCodex ndị a: **`auto-cost`**, **`auto-balance`**, na
**`auto-intelligence`**. N’elu wire, ndị a na-map gaa na model `default` nke Cursor
(ya na `optimization` ModelParameter maka ụdị atọ ahụ). Ka mma iji
`cu/auto` mgbe ojiji model premium gwụsịrị — Auto na-enwekarị budget fọdụrụ.

### Katalọgụ live bụ naanị ya mgbe emekọrịtara ya

Mgbe mmekọrịta model Cursor gara nke ọma (`cursor-agent --list-models` → katalọgụ
emekọrịtara echekwara, ma ọ bụ nnweta `AvailableModels` e ji bearer kwado nke dị n’elu),
**dashboard**, **`/v1/models`**, na ndepụta **Nwalee Ha Niile** na-egosi:

1. Model ndị mmekọrịta live weghachiri
2. Id auto-router ndị etinyere: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Model **omenala** nke onye na-ahụ maka sistemụ (Mbubata / ntinye aka) — mmekọrịta anaghị ehichapụ ha

Nnukwu registry static dị n'okpuru
`open-sse/config/providers/registry/cursor/` bụ **naanị fallback offline**. Mgbe
katalọgụ emekọrịtara tọgbọ chakoo (ma ọ bụ nchọpụta ada), ndepụta ahụ na-alaghachi na registry ahụ.

A ka nwere ike **ịrịọ** id nwere suffix effort (dịka `claude-4.6-sonnet-high`)
n'oge runtime: `resolveRequestedModel` na-ewepụ suffix ahụ ma tinye ya n'ime
`ModelParameter` nke wire. Ndepụta pụrụ iche ahụ na-ezobe ụdị static ndị ahụ na
Nwalee Ha Niile ka probe wee kwekọọ n’ihe Cursor weghachiri n’ezie dịka ihe dịnụ.

### Ihe enyemaka

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — njikọta dashboard
- `ensureCursorAutoCatalogEntry` — ntinye auto* n'oge nchọpụta + ndepụta
- `shouldSuppressStaticModelForExclusiveListing` — loop static nke `/v1/models`

## Oke Provider (quota)

**Ojiji → Oke Provider** maka Cursor na-eji Bearer API na `api2.cursor.sh`
(`GetCurrentPeriodUsage` → nchịkọta ojiji → auth/usage) mgbe PKCE ma ọ bụ mbubata
token gasịrị. Ụzọ dashboard cookie/`cursor.com` ochie ka bụ fallback ikpeazụ
maka session ochie e si na IDE bubata.

Window na-enwekarị **Mkpokọta**, **Auto + Composer**, na **API**. Ọ bụrụ na
oke ndị ahụ dị ka ha tọgbọ chakoo, mee **Jiri Cursor Banye** ọzọ ma ọ bụ bubata token ọzọ
(mbubata IDE naanịzi adịghị mkpa).

## Turn tọgbọ chakoo / ojiji agwụla

Mgbe Cursor nabatara Run mana ọ naghị eweghachi ederede assistant ọ bụla (nke a na-emekarị
mgbe ojiji premium gwụsịrị), OmniRoute na-egosi **429** bara uru (ihe ngosi quota) ma ọ bụ
**502** nwere nduzi — ọ bụghị naanị “Provider weghachiri ọdịnaya tọgbọ chakoo”. A na-ekewa
ọdịda streaming dịka `not_found: AI Model Not Found` (window ojiji agwụla) dịka
**Oke ọsọ Cursor / ojiji agafeela**, ma ozi ahụ na-anọgide site na pipeline SSE
(guard empty-stream a na-ekekọrịta anaghị edochi njehie e zigalarị). Lelee Oke Provider,
nwalee model **`auto`**, ma ọ bụ bulie oke plan Cursor.

## Ụdị client (headless)

Mgbe enweghị nrụnye `cursor-agent` mpaghara, OmniRoute na-achọpụta
`x-cursor-client-version` site na env `CURSOR_AGENT_CLI_VERSION`, mgbe ahụ site na
scrape echekwara na disk nke script installer Cursor, emesịa site na build id akpọchiri.
Jiri `CURSOR_AGENT_CLI_VERSION` dochie ya mgbe ọ dị mkpa.

## Fallback: Mbubata Token Aka

Ọ bụrụ na ịnweghị ike mezue nbanye browser:

1. Na host, wepụta token site na `state.vscdb` nke Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Mepee **Bubata token** na modal auth Cursor.
3. Tinye **Access Token** na, mgbe ọ dị, **Refresh Token** (ọ dị mkpa maka
   ime ka ọ dị ọhụrụ na-akpaghị aka). Machine ID abụghị iwu.

Mbubata nwere naanị access token ka na-arụ ọrụ, mana ọ ga-ekubi ume ma ọ bụrụ na enweghị refresh token —
bubata ya ọzọ mgbe chat malitere iweghachi njehie nkwado njirimara.

## Ihe Ndị Metụtara Ya

- Nduzi Zed Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Ntụaka nbanye OpenCodex Cursor (mpụga):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
