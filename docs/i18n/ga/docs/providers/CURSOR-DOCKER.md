# Cursor Provider in Docker Environments (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Nuair a ritheann OmniRoute taobh istigh de Docker, teipeann ar na sreafaí oidhreachta **Iompórtáil ó Cursor IDE** /
`cursor-agent` toisc nach féidir leis an gcoimeádán suiteáil Cursor ar an óstach a fheiceáil.
Úsáid **Logáil isteach le Cursor** (PKCE deep-control) ina ionad sin.

## Cén Fáth a dTeipeann ar Iompórtáil IDE / CLI in Docker

1. **Leithlisiú an chórais comhad** — Lorgaíonn an t-uath-iompórtáil conairí Linux amhail
   `~/.config/Cursor/User/globalStorage/state.vscdb` _taobh istigh_ den choimeádán.
   Ar Docker Desktop do macOS, ní ghléasáiltear bunachar sonraí an IDE óstaigh de réir réamhshocraithe, agus
   is Linux é córas oibriúcháin an choimeádáin fiú nuair is Darwin é an t-óstach.
2. **Gan dénártha `cursor-agent`** — Ní chuimsíonn íomhánna oifigiúla OmniRoute
   `cursor-agent`. Roimhe seo, sheol Múnlaí ar Fáil
   `cursor-agent --list-models` trí bhlaosc agus d’úsáid sé catalóg statach mar chúltaca.
3. **Dénártha mícheart** — Ná gléasáil `cursor-agent` macOS de cheangal isteach i gcoimeádán
   Linux. Ní rithfidh sé.

## Molta: Logáil isteach le Cursor

1. Oscail **Deais → Soláthraithe → Cursor**.
2. Roghnaigh an cluaisín **Logáil isteach le Cursor**.
3. Cliceáil **Logáil isteach le Cursor** — osclaíonn OmniRoute
   `https://cursor.com/loginDeepControl?…` i mbrabhsálaí d’**óstach**.
4. Ceadaigh an logáil isteach sa bhrabhsálaí, ansin fill ar an deais. Déanann OmniRoute
   vótaíocht ar `api2.cursor.sh/auth/poll` go dtí go dtagann na comharthaí.
5. Stórálann OmniRoute comharthaí **rochtana + athnuachana** agus déanann sé iad a athnuachan trí
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ní éilíonn an chonair seo Cursor IDE ná `cursor-agent` taobh istigh den choimeádán.

## Aimsiú múnlaí

Le nasc atá logáilte isteach, tugann **Múnlaí ar Fáil / Uath-Shioncronú** tús áite do
chatalóg HTTP `AiService/AvailableModels` Cursor agus comhartha iompróra an naisc á úsáid.
Má theipeann air sin, baineann OmniRoute triail fós as `cursor-agent` an óstaigh (nuair atá sé ann), agus
ansin as síol na clárlainne stataí.

Nochtann OmniRoute **`auto`** sa chatalóg i gcónaí (taispeáint “Uathoibríoch”), chomh maith le
modhanna ródaire ar stíl OpenCodex **`auto-cost`**, **`auto-balance`**, agus
**`auto-intelligence`**. Ar an tsreang, mapáiltear iad seo go múnla `default` Cursor
(le `optimization` ModelParameter do na trí leagan). Tabhair tús áite do
`cu/auto` nuair atá úsáid na múnlaí préimhe ídithe — is minic a bhíonn buiséad ag Uathoibríoch fós.

### Tá an chatalóg bheo eisiach nuair a shioncronaítear í

Tar éis sioncronú rathúil ar mhúnlaí Cursor (`cursor-agent --list-models` → catalóg
shioncronaithe bhuanaithe, nó an t-aisghabháil `AvailableModels` fhíordheimhnithe ag iompróir thuas), liostaíonn
an **deais**, **`/v1/models`**, agus **Tástáil Uile**:

1. Múnlaí a d’fhill an sioncronú beo
2. Aitheantóirí uath-ródaitheora ionsáite: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Múnlaí **saincheaptha** an oibreora (Iompórtáil / de láimh) — ní bhaineann sioncronú iad choíche

Is **cúltaca as líne amháin** í an chlárlann mhór statach faoi
`open-sse/config/providers/registry/cursor/`. Nuair atá an chatalóg shioncronaithe folamh
(nó nuair a theipeann ar aimsiú), téann an liostú siar chuig an gclárlann sin.

Is féidir aitheantóirí a bhfuil iarmhír iarrachta orthu (mar shampla `claude-4.6-sonnet-high`) a
**iarraidh** fós ag am rite: baineann `resolveRequestedModel` an iarmhír agus cruthaíonn sé
`ModelParameter` don tsreang. Folaíonn an liostú eisiach na leaganacha statacha sin
ó Tástáil Uile d’aon ghnó, ionas go mbeidh na tóireadóirí ag teacht leis an méid a fhilleann Cursor mar mhúnlaí atá ar fáil.

### Cúntóirí

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — cumasc na deaise
- `ensureCursorAutoCatalogEntry` — ionsá auto* le linn aimsiú + liostaithe
- `shouldSuppressStaticModelForExclusiveListing` — lúb statach `/v1/models`

## Teorainneacha Soláthraí (cuóta)

Úsáideann **Úsáid → Teorainneacha Soláthraí** do Cursor APIanna Bearer ar `api2.cursor.sh`
(`GetCurrentPeriodUsage` → achoimre úsáide → auth/usage) tar éis PKCE nó iompórtáil
comharthaí. Fanann conair oidhreachta fianán/deaise `cursor.com` mar chúltaca deireanach
do sheisiúin níos sine a iompórtáladh ón IDE.

De ghnáth áirítear i bhfuinneoga **Iomlán**, **Uathoibríoch + Composer**, agus **API**. Má
tá cuma fholamh ar na teorainneacha, rith **Logáil isteach le Cursor** arís nó ath-iompórtáil na comharthaí (ní
theastaíonn iompórtáil IDE amháin a thuilleadh).

## Sealanna folmha / úsáid ídithe

Nuair a ghlacann Cursor le Rith ach nach bhfilleann sé téacs cúntóra ar bith (rud a tharlaíonn go minic nuair atá úsáid
phréimhe ídithe), taispeánann OmniRoute **429** inghníomhaithe (leideanna cuóta) nó
**502** le treoir — ní hamháin “D’fhill an soláthraí inneachar folamh”. Aicmítear teipeanna
sruthaithe amhail `not_found: AI Model Not Found` (fuinneog úsáide ídithe) mar
**teorainn ráta Cursor / úsáid sáraithe** agus coinnítear an teachtaireacht sin tríd an
bpíblíne SSE (ní fhorscríobhann an chosaint chomhroinnte ar shruth folamh earráid atá
astaithe cheana féin). Seiceáil Teorainneacha Soláthraí, bain triail as múnla **`auto`**, nó ardaigh
teorainneacha phlean Cursor.

## Leagan cliaint (gan chomhéadan grafach)

Gan suiteáil áitiúil `cursor-agent`, réitíonn OmniRoute
`x-cursor-client-version` trí env `CURSOR_AGENT_CLI_VERSION`, ansin trí scríobadh
taisceáilte ar diosca de script suiteála Cursor, agus ansin trí aitheantas tógála seasta. Sáraigh é le
`CURSOR_AGENT_CLI_VERSION` nuair is gá.

## Cúltaca: Iompórtáil Chomhartha de Láimh

Mura féidir leat an logáil isteach sa bhrabhsálaí a chur i gcrích:

1. Ar an óstach, bain na comharthaí as `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Oscail **Iompórtáil comhartha** i módán fíordheimhnithe Cursor.
3. Greamaigh an **Comhartha Rochtana** agus, nuair atá sé ar fáil, an **Comhartha Athnuachana** (riachtanach le haghaidh
   athnuachan uathoibríoch). Tá Aitheantas an Mheaisín roghnach.

Oibríonn iompórtálacha nach bhfuil iontu ach comhartha rochtana fós, ach rachaidh siad in éag gan chomhartha athnuachana —
ath-iompórtáil iad nuair a fhilleann an comhrá earráidí fíordheimhnithe.

## Gaolmhar

- Treoir Docker do Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Tagairt logála isteach Cursor in OpenCodex (seachtrach):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
