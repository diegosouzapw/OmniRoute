# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

Tá **dhá** chóras lána atá áitiúil don phróiseas ag OmniRoute, agus scóip dhifriúla acu. Tá siad
comhlántach; ba cheart d’oibreoirí a bheith ar an eolas cé acu ceann a bhfuil siad ag féachaint air.

## 1. Próiseas iontrála ar leibhéal beart ar fud an phróisis (`chatBodyAdmission.ts`)

- **Raon feidhme:** conair an choirp mhaolánaithe/na carnchuimhne do `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, agus na bealaí eile atá múnlaithe mar chomhrá. Cosnaíonn
  sé ar aimpliú carnchuimhne ó choirp mhóra gníomhairí códúcháin (#4380).
- **Rialaitheoir domhanda amháin don phróiseas, seachas lánaí de réir eochrach (#10110).** Glactar le gach eochair API
  (haiste) nó seisiún `anonymous` i gcoinne an bhuiséid chomhroinnte **chéanna** —
  úsáidtear aitheantas haiseáilte an tseisiúin MAR eochair sceidealaithe cothroime AMHÁIN (seoladh
  timpeallspólach idir iarratais atá ag fanacht), agus ní úsáidtear riamh é mar dheighilt acmhainne. Rinne leagan níos luaithe den
  doiciméad seo cur síos ar lánaí de réir eochrach a raibh acmhainn neamhspleách acu; baineadh an tsamhail sin
  in #10110 toisc gur lig sí do dhintiúir bhréige neamhdheimhnithe
  an teorainn ar fud an phróisis a iolrú.
- **Geata (#503-fanout): buiséad ionghabhála BEART a dhíorthaítear go huathoibríoch, seachas líon seasta
  iarratas.** Laghdaigh an uasteorainn oidhreachta `CHAT_MAX_HEAVY_IN_FLIGHT` ar líon na n-iarratas (`1`
  de réir réamhshocraithe roimh an gceartúchán seo) fan-amach gníomhairí códúcháin (fogníomhairí/CLIanna iolracha,
  coirp níos mó ná 256 KB de ghnáth) go comhthreomhaireacht éifeachtach de ~1, rud a d'fhág
  503 faoi ualach iomlán gnáth. Ní bhíonn sí ceangailteach anois ach amháin nuair a shocraíonn oibreoir
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` go sainráite. Má fhágtar gan socrú é, cuirtear geata ar iontráil ina ionad sin
  le `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — buiséad a dhíorthaítear go huathoibríoch ó
  fhíoruasteorainn chuimhne an phróisis (`src/shared/middleware/admissionBudget.ts`):
  25% den cheann is déine idir teorainn charnchuimhne V8 agus aon teorainn cgroup/coimeádáin,
  roinnte ar fhachtóir aimplithe neamhbhuan 8x, agus clampáilte idir 8 MiB agus
  2 GiB. Úsáideann sáruithe sainráite na clampálacha céanna. Scálaíonn sé seo é féin ó
  choimeádán 512 MB go deasc 32 GB gan aon tiúnadh timpeallachta. Teipeann corp nach féidir
  luí laistigh den bhuiséad éifeachtach láithreach le `413 body_exceeds_budget`;
  ní théann ach iomaíocht idir coirp ar féidir freastal orthu ina n-aonar isteach sa scuaine theoranta
  cothroime. Giorraíonn rianaire beo brú acmhainní ilchomhartha (cóimheas charnchuimhne V8,
  cgroup, PSI, teagmhais OOM — `open-sse/utils/resourcePressurePolicy.ts`) an fanacht
  teoranta faoi bhrú `high` agus díluchtaíonn sé láithreach le
  `503 resource_pressure` faoi bhrú `critical`, sula n-ionghabhtar aon bheart fiú.
  Léitear PSI ó `memory.pressure` cgroup an aonaid seo nuair atá sé ar fáil
  (`open-sse/utils/resourcePressureSampler.ts`); baineann `/proc/pressure/memory` leis
  an óstríomhaire ar fad agus ní úsáidtear é ach mar chúltaca ar chrua-earraí lom / cgroup v1, ionas nach féidir le
  hóstríomhaire atá ag babhtáil 503 a thabhairt do choimeádán díomhaoin.
- **Tiúnadh:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — sárú don bhuiséad beart a dhíorthaítear go huathoibríoch
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — uasteorainn oidhreachta ar líon na n-iarratas, roghnach amháin
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — fanacht sa scuaine roimh 503 (`RATE_LIMIT_MAX_WAIT_MS` de réir réamhshocraithe)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — comhla charnchuimhne do bhearta sa scuaine (4 MB de réir réamhshocraithe)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — dímholta
    agus gan éifeacht ó #10110 (glactar leo ar mhaithe le comhoiriúnacht cumraíochta, ach déantar neamhaird díobh)
- **Tuairiscí:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — lena n-áirítear
  na breiseanna #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, agus `countCapEnabled`
  (bréagach ar imscaradh réamhshocraithe — deimhníonn sé gurb é an buiséad beart, seachas an uasteorainn oidhreachta
  ar an líon, atá ceangailteach i ndáiríre).

## 2. Lánaí fíorúla oiriúnaitheacha ag am rite (`open-sse/services/admission`)

- **Raon feidhme:** ligean isteach de réir eochair an tionónta le haghaidh seolta chuig soláthraí — costas scuaine, oiriúnú teorainneacha faoi threoir aga folaigh,
  scuainiú lánaí, agus méadrachtaí lánaí.
- **Geata:** **rogha an oibreora.** Díchumasaithe mura bhfuil `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Gan é,
  coimeádann an rialaitheoir oiriúnaitheach iompar na scuaine comhroinnte (ní chomhlíontar critéar 1 de #9654
  ach amháin nuair a chumasaíonn oibreoir lánaí).
- **Tiúnadh:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + cumraíocht oiriúnaitheach (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Tuairiscí:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (aitheantais teimhneacha lánaí, ní eochracha loma
  riamh), agus `virtualLanes` — an bhratach údarásach sa seat a léiríonn go bhfuil na lánaí ar siúl.

## 3. Taiscéalaithe leathnaithe — ligean isteach de réir sprice do combo/fusion (#9654 Tonn 2)

Leathnaíonn combo (tosaíocht / spóladh cothrom) agus fusion chuig N sprioc samhla faoi aon iarratas
tuismitheora amháin. Ó #9654 Tonn 2 i leith, **cuirtear gach sprioc leathnaithe trí gheata roimh sheoladh** le
taiscéalaí de réir sprice (`PerTargetAdmissionHook`, tógtha ag `createPerTargetAdmissionHook`)
i gcoinne lána tionónta an **tuismitheora**.

- **Raon feidhme:** gach sprioc leathnaithe a sheolann combo, fusion, agus inneall an anord.
  Ní dhéantar difear do Chóras 1 (leibhéal beart) — ní thaiscéalann sé spriocanna leathnaithe riamh.
- **Geata:** **rogha an oibreora le córas 2.** Ní dhéanann sé aon ní nuair nach bhfuil
  `OMNIROUTE_CHAT_VIRTUAL_LANES` socraithe — tá léas na scuaine comhroinnte ag an iarratas tuismitheora
  cheana féin sa mhód sin, agus mar sin dhéanfadh taiscéaladh comhaireamh dúbailte agus dhiúltódh sé do spriocanna combo.
- **Séimeantaic:**
  - **Go hiomlán neamhbhlocála — scipeáil, ná cuir i scuaine riamh.** `maxWaitMs 0`: nuair atá lána lán,
    scipeáiltear an sprioc agus freastalaíonn sásra cúltaca combo (nó painéal marthanóirí fusion)
    ina háit. Déantar é seo d’aon ghnó: is obair iomarcach í sprioc leathnaithe,
    agus má chuirtear i scuaine í, carnann sí tuilleadh ualaigh ar an bplódú díreach a bhfuil na lánaí ceaptha
    a stopadh. Dá bhrí sin, ní bhaineann `defaultMaxWaitMs` ach leis an **iarratas tuismitheora**;
    ní fhanann taiscéalaithe leathnaithe riamh, agus d’aon ghnó níl **aon rialtán** ann chun iallach a chur
    orthu fanacht (léiríonn stair na saincheiste gur chruthaigh rialtáin feithimh an aicme ollmhór 502/504
    a choisceann #9654 — ná hathbhreithnigh é ach amháin má thuairiscíonn oibreoir go bhfuil spriocanna leathnaithe
    a scipeáiltear ag déanamh dochair do cháilíocht na bhfreagraí).
  - **Scaoileadh ar ligean isteach.** Scaoileann taiscéalaí a ligtear isteach a léas láithreach: is
    geata acmhainne é, ní sealbhú. Clúdaíonn léas an tuismitheora an leathnú; dá gcoinneofaí N
    léas eile, mhéadófaí costas gníomhach comhroinnte agus dhiúltófaí do thionóntaí eile. Ar bhonn na hiarrachta is fearr,
    ní áirithint atá ann: is féidir leis an lána líonadh arís idir an taiscéalaí agus an seoladh, agus mar sin,
    faoi chonspóid throm, d’fhéadfadh an geata ligean isteach i lána atá lán arís faoin
    am a sheoltar an sprioc.
  - **Praghsáilte ón bhfíorchorp leathnaithe.** Measann an taiscéalaí an costas ó
    chorp iarbhír na sprice — lena n-áirítear an aicme iarratais a dhíorthaítear óna bhratach `stream`,
    díreach cosúil le conair an tuismitheora — ionas go bpraghsáiltear baill phainéal fusion (`stream: false`)
    de réir na haicme neamhshruthaithe a úsáidfidh siad i ndáiríre, agus spriocanna tosaíochta/RR
    de réir cibé rud a d’iarr an t-úsáideoir.
- **Tuairiscí:** méadaíonn scipeáil taiscéalaí tar éis na chéad sprice `fallbackCount`
  combo in aghaidh an iarratais (ag teacht leis an tséimeantaic chúltaca atá ann cheana; le feiceáil i logaí combo);
  tugann fusion 503 ar ais nuair a scipeáiltear gach ball den phainéal. Níl
  **aon chuntar comhiomlán** (m.sh. `virtualFanoutSkipped`) ar an seat faoi láthair —
  má thuairiscíonn oibreoir nach féidir leo a dhéanamh amach cé chomh minic a scipeálann geata an lána spriocanna
  leathnaithe, is é sin an chúis le ceann a chur leis.

## Cé acu atá le feiceáil i ndeais

- `adaptiveAdmission.laneCount` / `laneTenants` → **lánaí fíorúla oiriúnaitheacha** (córas 2).
- `adaptiveAdmission.virtualLanes === true` → tá tóireadóirí leathnaithe amach roinn 3
  gníomhach freisin. Má tá `virtualLanes` in easnamh ó phálasta nó má tá sé socraithe mar `false`, ciallaíonn sé sin
  nach bhfuil `OMNIROUTE_CHAT_VIRTUAL_LANES` socraithe — tá na lánaí ar leibhéal na mbeart (córas 1)
  fós gníomhach, ach níl aon rud faoi `adaptiveAdmission` (ná aon gheataíocht leathnaithe amach)
  i bhfeidhm go dtí go gcumasaítear é.

## Cén fáth a bhfuil an dá cheann ann

Cuireann na lánaí ar leibhéal na mbeart teorainn leis an gcosán parsála/comhbhrúite a úsáideann cuid mhór cuimhne; cuireann na lánaí oiriúnaitheacha
teorainn leis an gcostas seolta in aghaidh an tionónta. Cuireann córas 1 critéar 1 de #9654 ("ní chuireann borradh seisiúin amháin
faoi deara 503 do sheisiún eile") i bhfeidhm gan choinníoll, agus cuireann córas 2 i bhfeidhm é a luaithe a chumasaítear an rogha roghnach.

## 4. `/v1/responses` fada in aon phróiseas amháin (corrlach-sláintiúil)

Chuir [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)
`tryAcquireHealthyHeadroom` leis ionas go gceadaítear an dara hiarratas atá trom ó thaobh struchtúir de
nuair atá an carn faoi bhun `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Úsáideann an cosán BYTE
a úsáideann `admitChatRequest` (coirp ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
256 KiB de réir réamhshocraithe, lena n-áirítear `POST /v1/responses`) an **mheicníocht chéanna**.

Seo é an t-oideas **aon phróisis** a dtacaítear leis le haghaidh níos mó ná dhá
`/v1/responses` SSE fhada chomhthráthacha: ná hardaigh an phríomhacmhainn + an corrlach sláintiúil ach chomh fada agus a cheadaíonn an carn
agus buiséad beartanna ar eitilt ar fud an phróisis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Is ceist faoin mbuiséad cuimhne sin iad na deicheanna de chliaint SSE fhada (40–50),
ní teorainn chrua táirge de “2 ar a mhéad”. Diúltaíonn carn atá faoi bhrú d'ualach fós le
`503` in-atriailte ionas nach bhfillfidh #7849.

Chun **líon na gcarn a iolrú**, rith N `DATA_DIR` neamhspleácha (#11024). Ná húsáid
`replicas > 1` riamh ar chomhad SQLite amháin (#10350). Ní athoscailt é an rannán seo ar
an oideas scálaithe amach le DATA_DIR.
