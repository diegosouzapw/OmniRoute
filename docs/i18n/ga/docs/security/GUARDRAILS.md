# Guardrails (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Foinse na fírinne:** `src/lib/guardrails/`
> **Nuashonraithe go deireanach:** 2026-08-29 — v3.8.51 (is é an glaoiteoir a dhearbhaíonn bunáit athscríbhinn Video Bridge,
> níl sí fíoraithe ag an bhfreastalaí fós — soiléirithe de réir #11661)

Cuireann ráillí cosanta sábháilteacht, beartas agus claochluithe inneachair i bhfeidhm ag an teorainn
idir OmniRoute agus soláthraithe réamhtheachtacha. Is féidir le gach ráille cosanta iniúchadh a dhéanamh ar
phálastaí iarratais (`preCall`) agus ar fhreagraí réamhtheachtacha (`postCall`) (agus, de rogha,
iad a dhiúltú, a chlaochlú nó anótáil a dhéanamh orthu).

Tá an córas **oscailte i gcás teipe**: má chaitheann ráille cosanta earráid le linn a rite, déanann an chlárlann
an earráid a thaifeadadh agus leanann sí ar aghaidh chuig an gcéad ráille cosanta eile seachas an
t-iarratas a chur ó mhaith. Is cinneadh sainráite é blocáil (`block: true`), ní timpiste riamh.

## Ráillí Cosanta Insuite

Déanann an chlárlann sé ráille cosanta a uathlódáil de réir ord tosaíochta tráth iompórtála
(féach `registry.ts` → `registerDefaultGuardrails()`):

| Tosaíocht | Ainm                | Céim(eanna)    | Comhad                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ritear uimhreacha tosaíochta níos ísle **ar dtús**.

### Droichead Amhairc (`visionBridge.ts`) — Droichead Módúlachta PR-1

Idircheapann sé iarratais ina bhfuil íomhánna agus atá dírithe ar **shamhlacha gan cumas amhairc**, agus
déanann sé an t-iarratas iomlán a athródú chuig samhail a bhfuil cumas amhairc aici nó cuireann sé
tuairiscí téacs arna nginiúint ag samhail amhairc inchumraithe in ionad na gcodanna íomhá roimh
an nglao réamhtheachtach. Ligeann sé seo do sholáthraithe téacs amháin pálastaí ilmhódacha a láimhseáil
go trédhearcach.

Sreabhadh:

1. Scipeáil má thacaíonn an spriocshamhail le cumas amhairc cheana féin (mura bhfuil sí ar an
   liosta éigeantach droichid `isVisionBridgeForcedModel`).
2. Bain codanna íomhá amach trí `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), a dhéanann tarmligean chuig an **mbrathadóir meán
   aontaithe** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — an
   t-aon fhoinse fírinne amháin a roinntear leis an scagaire comhoiriúnachta teaglama.
   Tá an bhaint teoranta ag liosta ceadaithe do chodanna barrleibhéil de na cruthanna
   is féidir le `replaceImageParts` a ionsá ar ais (an conradh bainte↔athsholáthair): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, URL Anthropic
   `source.type:"url"`, agus Responses API `input_image`. Is ábhar don scagaire teaglama iad
   amas neadaithe agus cruthanna táscaire amháin agus ní bhaintear amach iad riamh.
   Scipeáil mura bhfaightear aon cheann.
3. Réitigh cumraíocht ama rite trí `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): bíonn tosaíocht ag eochracha nua socruithe
   `modalityBridge*`; fanann eochracha oidhreachta `visionBridge*` mar **chúltaca aon timthrialla**
   (fuinneog cúlrollta). Scipeáil roimh aon trasnú meán nuair atá an
   droichead díchumasaithe.
4. Cinneann roghnóir an mhóid (`modalityBridgeVisionMode`, féach an tábla thíos)
   idir athródú agus cur síos. Tugann athródú `modifiedPayload` ar ais gan ach `model`
   malartaithe, chomh maith le meiteashonraí `{ rerouted, fromModel, toModel, imagesKept }`.
5. Conair an chur síos: teorannaigh na híomhánna ag `maxImages`, cum an leid atá feasach ar an tasc,
   téigh i gcomhairle le taisce an chur síos, glaoigh ar an tsamhail amhairc **go comhthreomhar**
   (`Promise.allSettled`), agus insteall codanna téacs `[Image N]: <description>` ina
   n-áit. Má theipeann ar chur síos, is é `null` an toradh agus **caomhnaítear** an bhunchuid íomhá
   (#4012) — ach amháin ar chonair cur síos an teaglama nuair a theip ar gach
   cur síos, agus sa chás sin faigheann réamhtheachtaí deimhnithe gan cumas amhairc stub
   `(unavailable — no vision-capable provider connected)` ina ionad (#8430).
6. Tabhair `modifiedPayload` + meiteashonraí (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ar ais.

#### Roghnóir an mhóid (`modalityBridgeVisionMode`)

| Mód        | Réamhshocrú | Iompar                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔           | Heorastúil oidhreachta, gan athrú (#6640/#7204): déantar samhlacha nach samhlacha teaglama/`auto/` iad a athródú chuig an tsamhail amhairc is fearr mura bhfuil dintiúir inúsáidte ag an mbunsamhail cheana féin (ansin déantar cur síos); déanann spriocanna teaglama cur síos i gcónaí.                                                  |
| `describe` |             | Déan cur síos i gcónaí — scipeáiltear an bloc athródaithe go hiomlán; freagraíonn an tsamhail a roghnaigh an t-úsáideoir i gcónaí.                                                                                                                                                                                                         |
| `reroute`  |             | Cuir athródú i bhfeidhm: seachnaítear an chosaint chun an tsamhail a bhfuil dintiúir aici a choinneáil. Tá feidhm fós ag cosaint dhintiúir **sprioc** an athródaithe — nuair nach ann d'aon sprioc amhairc inúsáidte, téann an t-iarratas ar aghaidh chuig cur síos ionas nach sroicheann íomhánna amh inneall téacs amháin riamh (#8430). |

Déanann módanna éigeantacha ciorrú **sula** ritear an heorastúil uathoibríoch; tá iompar `auto`
comhionann beart ar bheart le ráille cosanta na tréimhse roimh PR-1.

#### Leid cur síos atá feasach ar an tasc (`modalityBridgeVisionTaskAware`)

**True** de réir réamhshocraithe. Cuireann `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
téacs **theachtaireacht dheireanach an úsáideora** (giorraithe go 500 carachtar) leis an mbunleid
cur síos, rud a stiúrann an cur síos i dtreo an ruda a d'iarr an t-úsáideoir i ndáiríre
(patrún codex-vision-proxy) agus a iarrann ar an tsamhail amhairc téacs infheicthe a thras-scríobh.
Agus an bhratach múchta — nó mura bhfuil téacs úsáideora ann — úsáidtear an bhunleid gan athrú.

Iarrann féin-lúb describe féin d’iarratas atá comhoiriúnach le OpenAI (`callVisionModelSingle()`
in `visionBridgeHelpers.ts`) `image_url.detail: "high"` i gcónaí —
gan choinníoll, do gach glaoiteoir/soláthraí, gan é a bheith faoi réir aon chomhartha ón gcliant.
Díghrádaíonn sampláil ar mhionsonraí ísle cruinneas OCR don tasc tras-scríofa téacs
go díreach a iarrann an leid seo, mar sin iarrann an glao describe féin ardleibhéal
mionsonraí i gcónaí, beag beann ar an leibhéal mionsonraí a d’úsáid an bhuniarratas isteach. Ní
théann sé seo i bhfeidhm ach ar chorp inmheánach an iarratais describe; ní athraíonn sé an chaoi a
gcuireann OmniRoute `image_url.detail` an ghlaoiteora féin ar aghaidh sa phríomhiarratas —
cuirtear an réamhshocrú sin i bhfeidhm ar leithligh, agus do chliaint OpenCode braite amháin, in
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Níl aon réimse `detail`
sa bhrainse sreangfhormáide Anthropic d’fhéin-lúb describe agus ní théann ceachtar
réamhshocrú i bhfeidhm air.

#### Uasteorainn aschuir describe (`modalityBridgeVisionMaxChars`)

| Eochair                        | Réamhshocrú | Raon             |
| ------------------------------ | ----------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` nó 100–50000 |

Ciallaíonn `0` (réamhshocrú) **gan uasteorainn** — cuirtear an tuairisc a thugann
`callVisionModel()` ar aghaidh gan athrú, agus caomhnaítear an t-iompar
reatha. Teascann aon luach sa raon 100–50000 an tuairisc le hiarmhír
`…` sula splicítear ar ais í mar `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`).
Ardaigh é seo do thascanna OCR atá trom ar mhionsonraí ina dteastaíonn an tras-scríobh
iomlán ón tsamhail iartheachtach; ísligh é chun teorainn a chur le húsáid comharthaí ar shamhlacha amhairc
cainteacha. Tá réimse an deais i bpainéal Ardroghanna na cluaisíní Amhairc
(`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) agus teannann sé aon
luach idir 1 agus 99 suas go dtí an t-íosmhéid 100, agus fágtar `0` follasach
gan athrú — is luach bailí Zod é `0` ann féin
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ní hé
an réamhshocrú “gan socrú” amháin é.

#### Taisce describe (`modalityBridge/bridgeCache.ts`)

Taisce LRU + TTL sa chuimhne d’aschuir describe, roinnte ar fud an phróisis.
Eochair = `sha256(imageRef + composedPrompt + configuredBridgeModel)` le
frámú réimír-fhaid (gan imbhuailtí ag teorainneacha réimsí). Is í an chomhpháirt samhla
an tsamhail droichid **chumraithe**, ní an tsamhail a d’fhreagair i ndáiríre —
d’fhéadfadh `callVisionModel` titim siar go hinmheánach, agus dhéanfadh eochrú de réir gach iarrachta
an taisce a ilroinnt. Ní chuirtear describe ar theip air sa taisce riamh. Socruithe:

| Eochair                         | Réamhshocrú | Raon    |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Normalú íomhánna cianda (describe féin-lúibe/aisghabháil base64)

Nuair a aisghabhann an droichead íomhá **chianda** é féin — féinghlao describe
Anthropic agus tiontú base64 sreangfhormáide claude
(`ensureBase64ImagesForClaudeWire`), iad araon trí
`fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — cuirtear URI sonraí an toraidh
trí `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sula leabaítear é san iarratas ar an tsamhail
amhairc. Laghdaítear íomhánna rómhóra go **ciumhais fhada 2048px** (ag teacht
leis an uasteorainn athmhéadaithe a chuireann OpenAI/Anthropic i bhfeidhm cheana féin ar thaobh an fhreastalaí), rud a laghdaíonn
bearta/aga folaigh uaslódála gan an méid a fheiceann an tsamhail amhairc a athrú. Úsáideann an t-athrú méide
`sharp`, arna luchtú trí iompórtáil dhinimiciúil: ar ardán nach féidir a dhénártha
dúchais a luchtú, **ní chaitheann** `normalizeDataUri()` earráid riamh — titeann sé siar
chuig na bearta bunaidh a chur ar aghaidh gan athrú, ionas go leanann an chonair
describe/tiontaithe-base64 de bheith ag obair i gcónaí. Cuirtear bearta nach íomhá iad (aisghabháil nár thug
íomhá indíchódaithe ar ais) ar aghaidh gan athrú freisin. Tá an normalú seo
teoranta d’íomhánna a aisghabhann an droichead dá fhéinghlao féin — ní chuirtear
i bhfeidhm riamh é ar phálasta amh an ghlaoiteora a chuirtear ar aghaidh, i gcomhréir leis an
bprionsabal maidir le hathrú trí rogha isteach amháin (Riail Dhocht #20).

#### Scéimre socruithe + aistriú

Déantar na heochracha nua `modalityBridge*` a bhailíochtú le Zod in `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, an tríréad `modalityBridgeCache*`, agus an
grúpa `modalityBridgeAudio*` a úsáideann an Droichead Fuaime. Cóipeálann aistriú
`141_modality_bridge_settings.sql` luachanna oidhreachta reatha
`visionBridge*` chuig na heochracha nua comhfhreagracha (idimpitéinseach, ní fhorscríobhann sé
luach `modalityBridge*` a shocraigh oibreoir riamh); glactar leis na heochracha oidhreachta fós mar
chúltaca léite ar feadh timthriall eisiúna amháin.

#### Ceanntásc trédhearcachta + staitisticí

Bíonn na freagraí a chlaochlaítear le describe agus
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
acu (arna thógáil ag `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`,
arna stampáil ag `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`).
Ní fhaigheann iarratais athródaithe **aon** cheanntásc — níor athraíodh an pálasta agus tá malartú na samhla
le feiceáil cheana féin i réimse `model` chorp an fhreagra.

Tugann `GET /api/modality-bridge/stats` (fíordheimhniú bainistíochta, an tsraith chéanna le
`GET /api/settings`) na cuntair sa chuimhne de réir módúlachta
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ar ais do `vision`, `audio`, agus
`video`. Úsáideann `averageLatencyMs` `latencySamples`, ní gach iarracht, mar a
ainmneoir; ní chruthaíonn oibríocht gan uainiú sampla bréige de náid milleasoicind.
Fanann `bridged` mar an t-ailias atá comhoiriúnach siar do thiontuithe
rathúla; ní mhéadaíonn iarrachtaí teipthe é.
Athshocraítear na cuntair nuair a atosaítear an próiseas de réir dearaidh
(teiliméadracht, ní cuntasaíocht).

#### Cumraíocht na deaise

Is é leathanach tiomnaithe an deais
`/dashboard/settings/modality-bridge`. Caomhnaíonn a chluaisíní inseolta trí URL, `Vision`, `Audio`,
agus `Video`, na paraiméadair iarratais agus luach `tab` á athrú.
Cuireann an cluaisín Vision cumasú, mód, roghnú samhla (lena n-áirítear an réamhshocrú
uathoibríoch), leideanna atá feasach ar thascanna, ardteorainneacha ama/íomhá/faid tuairisce/taisce,
áiritheoirí ama rite, agus iarratas samplach cosanta ar fáil. Tá an cluaisín Audio beo freisin: cuireann sé
cumasú, roghnóir samhla STT-amháin le rogha Uathoibríoch, teorainneacha ama/fad uasta gearrthóige, áiritheoirí
fuaime, agus tástáil shamplach `input_audio` ar fáil. Tá an cluaisín Video feidhmiúil: tuairiscíonn sé
staid ama rite FFmpeg/ffprobe — ceann de cheithre staid shainráite chomhéadain (`unknown` fad atá
an tóireadóir ar siúl nó mura bhféadfaí é a chríochnú, `restricted` ar óstach deaise nach óstach
loopback é, áit a scipeáiltear an tóireadóir ar thaobh an chliaint, `unavailable` tar éis tóraíochta
agus deimhniú go bhfuil sé ar iarraidh, nó `available` mar aon leis na leaganacha FFmpeg/ffprobe) — buanaíonn sé
teorainneacha cumasaithe/samhla/fráma/físe/ama, scagann sé an roghnóir samhla go samhlacha
atá cumasach ar fhís, agus cuireann sé áiritheoirí físe ar fáil.

Is nasc comhoiriúnachta chuig an leathanach nua é an t-iarchárta Vision Bridge faoi shocruithe AI;
níl an dara cóip den fhoirm faoina chúram a thuilleadh. Nascann Media Providers sreafaí oibre
Image-to-Text agus Speech-to-Text leis na cluaisíní comhfhreagracha Modality
Bridge freisin, gan an clós súgartha Speech-to-Text atá ann cheana a bhaint.

**Seachbhóthar iontrála féin-lúibe:** nuair a threoraítear an glao tuairiscithe trí
fhéin-lúb `/v1` OmniRoute féin (samhail soláthraí neamhchaighdeánach), seolann an fo-iarratas
`x-omniroute-admission-bypass: internal` agus fíordheimhnítear é leis an dintiúr
féin-lúibe réitithe — an táscaire áitiúil `sk_omniroute` sa mhód áitiúil, nó an
eochair timpeallachta `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` arna cumrú ag an oibreoir (#1350), ionas
gur féidir le himscaradh `REQUIRE_API_KEY=true` an glao tuairiscithe a rith fós. Ní thugtar aird ar an seachbhóthar
ach amháin i gcás na ndintiúr cruinn sin, mar sin ní féidir le cliaint sheachtracha an
ceanntásc a úsáid chun iontráil a scipeáil.

Tá na réamhshocruithe oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`; tá na
réamhshocruithe nua móid/feasachta ar thascanna/taisce agus réiteoir na socruithe in
`src/shared/constants/modalityBridgeDefaults.ts`. Cuireann an ráille cosanta rogha cruthaitheora
`deps` ar fáil ionas gur féidir le tástálacha feidhmiúcháin bhréige `getSettings` agus
`callVisionModel` a instealladh.

### Droichead Fuaime (`audioBridge.ts`) — Modality Bridge PR-3

Idircheapann sé iarratais chomhrá ina bhfuil fuaim sula sroicheann siad sprioc nach eol
di glacadh le hionchur fuaime. Ní athstiúrann sé an t-iarratas comhrá riamh: déantar
páirteanna fuaime a thras-scríobh tríd an gcríochphointe ilpháirteach comhoiriúnach le OpenAI atá ann cheana agus
leanann an tsamhail chomhrá roghnaithe ar aghaidh le tras-scríbhinní téacs.

Sreabhadh:

1. Réitigh `supportsAudio` trí `getResolvedModelCapabilities()`. Bíonn tosaíocht ag
   meiteashonraí sainráite ón gclárlann soláthraithe, ansin meiteashonraí statacha na samhla, agus ansin
   `modalities_input` sioncronaithe. Is `false` é liosta ionchuir dearbhaithe gan `audio`;
   mura bhfuil aon fhianaise cumais ann, fanann sé mar `null`. Gníomhachtaíonn `false` agus `null` araon
   an droichead coimeádach, agus seachnaíonn `true` é.
2. Réitigh socruithe `modalityBridgeAudio*` agus bain páirteanna fuaime barrleibhéil
   is féidir a spladh as gach teachtaireacht tríd an mbrathadóir comhroinnte `detectMediaParts()`.
   Is iad na cruthanna sreinge a dtacaítear leo ná `input_audio`, `audio_url` de chuid OpenAI, agus
   `source.media_type: "audio/*"`. Braitear fuaim neadaithe le haghaidh ródaithe ach ní
   bhaintear í tríd an gcosán spladh. Cuirtear teorainn leis an obair le `modalityBridgeAudioMaxClips`;
   fágtar páirteanna níos déanaí gan athrú.
3. Tabhair aird ar `provider/model` cumraithe, nó lig do `selectAudioBridgeModel()` dul trí
   `AUDIO_TRANSCRIPTION_PROVIDERS` in ord cobhsaí na catalóige agus an chéad
   mhúnla ag a bhfuil dintiúr soláthraí gníomhach inúsáidte a roghnú.
4. Tiontaíonn `callAudioTranscription()` fuaim base64/data-URI ina `file`
   ilpháirteach, nó íoslódálann sé `audio_url` cianda tríd an gcosantóir amach poiblí-amháin
   le pionnáil DNS agus teorainn 25 MB. Ansin déanann sé POST den chomhad agus den tsamhail roghnaithe
   chuig an bhféin-lúb áitiúil `/v1/audio/transcriptions`, agus fíordheimhnítear é le
   `resolveSelfLoopBearer()`. Déanann an bealach tras-scríofa atá ann cheana gnáthchuardach
   dintiúr, láimhseáil fuaraithe/teorannaithe ráta, agus seoladh chuig an soláthraí.
5. Cuirtear `[Audio N]: <transcript>` in ionad na bpáirteanna lena mbaineann glaonna rathúla. Ritheann
   glaonna le `Promise.allSettled`: caomhnaíonn teip aonair an pháirt fuaime
   bhunaidh sin (conradh #4012). Má theipeann ar gach glao agus má tá sé cruthaithe gur
   `supportsAudio === false` don sprioc, déantar
   `[Audio N]: (unavailable — no STT provider connected)` de na páirteanna (conradh #8430). I gcás
   sprice anaithnid (`null`), fágtar toradh ina dteipeann ar gach glao gan athrú. Faigheann
   sprioc atá cruthaithe a bheith téacs-amháin agus nach bhfuil dintiúr STT inúsáidte aici an
   stub sainráite céanna gan glao líonra a dhéanamh.

Úsáideann tras-scríbhinní rathúla taisce LRU/TTL Modality Bridge uile-phróisis. Comhcheanglaíonn an
eochair an tagairt fuaime, lipéad cobhsaí na hoibríochta `audio-transcription`,
agus an tsamhail STT roghnaithe; ní dhéantar teipeanna a thaisceadh riamh. Nuashonraíonn iarrachtaí fuaime
na háiritheoirí comhroinnte `bridged`, `cacheHits`, `failures`, agus `lastUsedAt`.
Bíonn
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ar fhreagraí claochlaithe; ní
fhaigheann iarratais gan athrú mír Audio Bridge.

Tá na socruithe ama rite tacaithe ag bunachar sonraí agus bailíochtaithe ag Zod:

| Eochair                       | Réamhshocrú | Raon                   |
| ----------------------------- | ----------- | ---------------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —                      |
| `modalityBridgeAudioModel`    | `""`        | Uathoibríoch nó STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000            |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10                   |

Tá an taisce chomhroinnte fós faoi rialú `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`.

### Droichead Físe (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé páirteanna físe ardleibhéil i `messages` Chat Completions agus in `input` an Responses
API sula nglaoitear ar sprioc nach eol go bhfuil tacaíocht dhúchasach físe aici.
Is iad na cruthanna a dtacaítear leo ná `input_video`, `video_url`, `video_source`, URLanna HTTPS,
agus URIanna sonraí `data:video/*;base64,...`. Ní láimhseáiltear gnáthainmneacha comhaid i dtéacs
mar fhíseáin.

Is le `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) trasnú na hiarrata,
an tseiceáil cumais/beartais, an chomhiomlánú de réir iarrata, agus pálasta an fhreagra.
Tá obair gach físeáin — fáil, taisce an toraidh iomláin, cur síos ar sheicheamh frámaí
(a chomhcheanglaíonn aon tras-scríbhinn fuaime a dhearbhaigh an glaoiteoir), agus
méadracht/tobscor/glanadh de réir iarrachta — folaithe taobh thiar de `processVideoPart` in
`videoBridgePipeline.ts`, a ghlaoitear uair amháin do gach páirt físe laistigh de lúb `preCall`.
Sainmhíníonn an modúl sin freisin na teorainneacha poirt sainráite `VideoMediaBrokerPort`
(bearta a fháil agus frámaí sampláilte a bhaint), `VideoAudioTranscriptionPort`
(tras-scríbhinn fuaime a dhearbhaigh an glaoiteoir a chomhcheangal leis na fotheidil shampláilte), agus
`VideoDrilldownPort` (teorainn seasmhachta an mhiondealaithe frámaí; níl sé nasctha fós
le `processVideoPart` — ní scríobhann ach an ródaire ar leith `/api/modality-bridge/video/drilldown`
iontrálacha miondealaithe faoi láthair).

Ní iompórtálann ná ní agraíonn cosán poiblí iarrata `/v1` fophróiseas riamh. Íoslódáiltear
físeáin chianda faoi theorainn 50 MiB; tá uasteorainn choimeádach 36 MiB de mhéid díchódaithe
in aghaidh an fhíseáin ar fhíseáin base64 inlíne ionas gur féidir le clúdach an
mhúnla/na dteachtaireachtaí/an fhrámaithe fanacht laistigh de theorainn iontrála 50 MiB
na hiarrata poiblí JSON. Seiceáiltear an fad inlíne agus meastacháin ar an méid díchódaithe
roimh leithdháileadh. Tá HTTPS riachtanach don URL cianda tosaigh agus do gach atreorú,
agus úsáidtear an chosaint imeachta poiblí amháin atá ann cheana le pionnáil DNS.
Ansin trasnaíonn na bearta teorainn chruinn inmheánach an bhróicéara
`POST /api/modality-bridge/video/extract`. Tá an ródaire sin idir `LOCAL_ONLY` agus
`SPAWN_CAPABLE`, ní ghlacann sé ach le hiarrataí iontaofa ais-lúibe atá fíordheimhnithe
de réir próisis, agus ní ghlacann sé riamh le URL, cosán córais comhad, comhad inrite,
ná liosta argóintí. Forfheidhmíonn píblíne theorainn mhéid cholainn an API agus léitheoir
incriminteach cholainn an láimhseálaí uasteorainn 50 MiB ar ionchur an bhróicéara go
neamhspleách. Ritheann a scuaine theoranta aon eastóscadh amháin ag an am, ceadaíonn sé
ceithre jab ar feitheamh, agus cuireann sé uasteorainn 100 MiB ar ionchur ar feitheamh.

Laistigh den bhróicéir, léann `ffprobe` comhad áitiúil príobháideach; eisiann an liosta seasta
formáidí ceadaithe formáidí seinmliosta agus lastliosta. I gcás coimeádán ceadaithe de
theaghlach MOV, fanann tagairtí seachtracha sonraí MOV díchumasaithe de réir réamhshocraithe,
agus ní thugann an t-ordú seasta cead dóibh. Úsáideann `ffprobe` agus `ffmpeg` araon
an liosta ceadaithe prótacal `file` amháin, snáithe amháin, eagair sheasta argóintí, gan
blaosc, agus comhaid inrite a réitítear ó `PATH`. Ní iarrthóirí inseinnte iad sruthanna
clúdaigh le pictiúr ceangailte. Ní mór do gach sruth inseinnte na teorainneacha a
chomhlíonadh, agus tugtar tosaíocht do shruth réamhshocraithe sainráite roimh an gcúltaca
cinntitheach leis an innéacs is ísle. Tá físeáin teoranta do 600 soicind, 8,192 picteilín
in aghaidh na toise, agus 33,554,432 picteilín foinseach. Samplálann FFmpeg 1–16 fhráma
JPEG lárphointe, laghdaíonn sé an chiumhais fhada go dtí 1,024 picteilín ar a mhéad gan
ionchuir níos lú a mhéadú, agus ní fhaigheann sé URL riamh. Is é `uniform` an sampláil de
réir réamhshocraithe. Déanann na beartais roghnacha `scene_aware` agus turgnamhacha
`segment_aware` pas seasta breise amháin de chuid FFmpeg thar an sruth áitiúil atá
bailíochtaithe cheana féin, roghnaíonn siad stampaí ama radhairc teoranta `showinfo`,
agus filleann siad ar na lárphointí aonfhoirmeacha céanna ar bhealach cinntitheach i gcás
teip an bhrathadóra, dul thar am, aschur míchumtha, nó tacar folamh iarrthóirí. Leithdháileann
mód atá feasach ar dheighleoga samplaí lárphointe go comhréireach ar na heatraimh
radhairc bhailíochtaithe; tugtar mionsonraí thíos ar fhianaise atá feasach ar dheighleoga
agus ar iompar cúltaca. Cuirtear an uasteorainn dhian 16 fhráma i bhfeidhm tar éis na
roghnaithe i ngach beartas. Nuair nach bhfuil ach buiséad aon fhráma amháin ag iarratas
atá feasach ar radhairc, úsáideann sé lárphointe aonfhoirmeach na fuinneoige gníomhaí
lánfhíseáin nó fócais agus tuairiscíonn sé `policyEffective: uniform`: ní féidir le fráma
radhairc roghnaithe amháin an dá cheann ama a chaomhnú. Féadfaidh glaoiteoir fuinneog
fócais chríochta (`start`/`end` soicind) a sholáthar go roghnach; teanntar na teorainneacha
de réir fhad an mheáin, diúltaítear d'fhuinneoga droim ar ais nó neamhchríochta, agus
ní dhéantar na beartais samplála go léir ach laistigh den eatramh normalaithe. Cuirtear
an fhuinneog a bhíonn mar thoradh air san áireamh sna meiteashonraí samplála agus i
réimír neamhiontaofa an tuairiscithe ionas gur féidir le samhlacha iartheachtacha
sliocht dírithe a idirdhealú ón amlíne iomlán.

Is socrú sainráite ar leith é fócas séimeantach fotheideal. Caomhnaíonn an mód anailíse
réamhshocraithe `full` an leid fráma atá ann cheana agus ní chuireann sé téacs iarrata
ar aghaidh chuig samhail na bhfotheideal riamh. Sa mhód `focused`, ní léann an droichead
ach an `text`/`input_text` neamhfholamh is déanaí a scríobh úsáideoir ón gcoimeádán
Chat nó Responses céanna, normalaíonn sé go NFC é, comhdhlúthaíonn sé carachtair rialúcháin
agus spás bán, agus cuireann sé teorainn 500 códphointe Unicode air. Má bhíonn an toradh
folamh, filleann sé ar an leid chruinn `full`. Déantar leid inúsáidte a shrathú mar JSON
i mbloc tiomnaithe comhthéacs úsáideora neamhiontaofa agus ní fhéadfaidh sí ach tosaíocht
a thabhairt do mhionsonraí inbhraite; ní féidir léi an rabhadh ar leith i gcoinne
treoracha infheicthe nó inchloiste sna meáin a leanúint a shárú. Ní dhéanann fócas téacsúil
`start`/`end` a thuiscint riamh ná ní athraíonn sé an samplóir ama.

#### Fianaise struchtúrach deighleog FU-07

Úsáideann `segment_aware` pas réamh-anailíse teoranta amháin thar an sruth físe áitiúil
atá bailíochtaithe cheana féin. Scálaíonn an slabhra seasta scagairí go 320 picteilín
ar leithead ar a mhéad ar dtús, braitheann sé athruithe radhairc agus eatraimh reoite,
agus ansin samplálann sé ag 1 fhráma sa soicind le haghaidh doiléire, meánlonnrachta,
agus faisnéise spásúla/ama. Tá an pas teoranta do 600 sampla struchtúrach, snáithe amháin
FFmpeg/scagaire, na liostaí ceadaithe céanna de phrótacal `file` amháin agus de choimeádáin,
teorainn 1 MiB ar aschur próisis, agus 30 soicind ar a mhéad laistigh de thobscor/sprioc-am
comhroinnte an bhróicéara. Ní ghlacann sé riamh le hordú, scagaire, cosán, ná URL ón iarratas.

Is fianaise shamplála chinntitheach iad na luachanna struchtúracha, ní tuiscint
shéimeantach ar fhíseán. Ní bhaineann siad tátal as ábhair, gníomhartha,
fotheidil, caint ná rún an úsáideora. Cruthaíonn teorainneacha radhairc agus
reoite deighleoga; ní théann clúdach reoite, doiléireacht, nochtadh, mionsonraí
spásúla ná athrú ama i bhfeidhm ach ar an gcaoi a leithdháiltear an buiséad
reatha 1–16 fráma. Cuirtear uasteorainn fráma amháin ar dheighleog atá reoite
go hiomlán, agus bíonn deighleoga neamhreoite in iomaíocht don chuid eile den
bhuiséad. Nuair is mó líon na dteorainneacha ná líon na bhfrámaí, coinnítear
clúdach aonfhoirmeach na líne ama ionas nach féidir le gearrthacha luatha tapa
deighleog fhada ag an deireadh a cheilt. Cumaisctear teorainneacha radhairc atá
laistigh den taifeach anailíse 1 soicind ó theorainn reoite.

Má bhíonn scagairí ar iarraidh, fianaise mhíchumtha/fholamh, earráid bhrathadóra,
nó teorainn ama na réamh-anailíse srianta i gceist, glactar leis an mbeartas
cruinn aonfhoirmeach maidir le lárphointí. Ní ghlactar leis sin i gcás cealú
ón nglaoiteoir ná sprioc-ama an bhróicéara: cuirtear deireadh leis an
bhfo-phróiseas atá ar siúl, cuirtear cosc ar bhaint frámaí ina dhiaidh sin,
agus baintear an crann sealadach príobháideach in `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin chinntitheacha FFmpeg
iarbhír le haghaidh coigilteas ar ghlaonna fotheidealaithe tar éis dí-dhúblála,
leithdháileadh buiséid do dhlúthghluaiseacht, fianaise doiléireachta/nochtaithe/SI-TI,
gearrthacha tapa a bhfuil eireaball fada leo, agus torthaí deimhneacha bréagacha
ó chéimniú de réir a chéile. Taifeadann sé am balla na réamh-anailíse agus, nuair
atá `/usr/bin/time` ar fáil, LAP an phróisis sliocht agus buaic-RSS. Ní úsáidtear
ach oracail struchtúracha dá sheiceálacha cáilíochta. Fanann cáilíocht iarbhír
na samhla fotheidealaithe mar `HOLD` toisc nach bhfuil críochphointe údaraithe ná
breitheamh reoite ag an úim seo. Fanann coigilteas airgeadaíochta mar `HOLD`
freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán dearfach
sainráite ar chostas gach glao; ní chumann an script ceachtar toradh riamh.

Tá teorainn 4 MiB le gach fráma, 23 MiB leis na frámaí amh go léir le chéile,
agus 32 MiB le freagra sraitheach an bhróicéara. Baintear comhadlann shealadach
phríobháideach in `finally`. Ní chuireann OmniRoute FFmpeg san áireamh agus ní
ghlacann sé le conair inrite shaincheaptha. Sula gcuirtear fotheidil leis,
cuireann an droichead pas coimeádach dí-dhúblála amhairc i bhfeidhm: laghdaítear
gach JPEG go maolán liathscála 16×16 agus ní chuirtear i gcomparáid é ach leis an
bhfráma deireanach a coinníodh. I gcás buiséid iarrtha fotheidealaithe os cionn
fráma amháin, soláthraíonn an bhaint linn theoranta iarrthóirí arb é a huasmhéid
dhá oiread an bhuiséid sin agus nach mbíonn níos mó ná 16 fhráma ann riamh.
Ní chuirtear an teorainn iarrtha i bhfeidhm ach amháin tar éis dí-dhúblála, agus
caomhnaítear an chéad iarrthóir roghnaithe agus an t-iarrthóir deireanach le linn
an tanaithe deiridh nuair atá an buiséad cothrom le dhá cheann ar a laghad. Úsáideann
an beartas le leagan
`grayscale-16x16-mean-cells-v2` an ceann is mó de mheándeilt lonrais agus cóimheas
na gceall mionsamhla a bhfuil a ndeilt normalaithe cothrom le 0.05 ar a laghad.
Is é an tairiseach 0.04 an tairseach dúblach, a roghnaíodh ar mhaithe le
hintuarthacht seachas í a nochtadh mar shocrú ag am rite. Caomhnaíonn an comhartha
tánaisteach ardchodarsnachta seo gluaiseacht bheag agus athruithe ar théacs
infheicthe a d'fhéadfadh comparáid mheáin amháin a cheilt. Má tharlaíonn earráidí
comparáideora nó díchódóra, coinnítear an clúdach. Déanann meiteashonraí aschuir
idirdhealú idir iarrthóirí bainte, frámaí a úsáideadh go rathúil, agus dúblaigh
amhairc a caitheadh amach.

Féadfaidh cuid físe atá marcáilte go sainráite bileog theagmhála le stampaí ama
a iarraidh. Tógann an droichead greille JPEG ina bhfuil 4 cholún agus 16 fhráma
ar a mhéad. Greanann gach cill 512 picteilín stampa ama a foinse isteach i
mbanda ardchodarsnachta ag an mbun, agus fanann na stampaí ama céanna sna
meiteashonraí téacsúla le haghaidh ceangail agus iniúchta iartheachtaigh.
Tá teorainn 32 MiB fós leis an JPEG iomlán. Mura féidir le `sharp` an ghreille
a dhíchódú nó a chumadh, filleann an droichead ar na frámaí JPEG aonair; leanann
cealú cliaint de bheith á iomadú tríd an oibríocht bileoige.

Coinnítear fianaise ardaithe céime scartha d'aon ghnó ón micreathagarmharc
sintéiseach cumadóireachta. Sainmhíníonn
`scripts/perf/video-bridge-contact-sheet-eval.ts` úim A/B le leagan scéimre do
shamhlacha físe atá comhoiriúnach le OpenAI. Tomhaiseann sé comharthaí a thuairiscíonn
an soláthraí, aga folaigh balla ó cheann ceann (lena n-áirítear cumadh na bileoige),
líon glaonna samhla, agus coinneáil fíricí atá sainithe sa lastliosta. Ní
scríobhtar freagraí amha samhla sa tuairisc; ní choinnítear ach achoimrí SHA-256
agus aitheantais fíricí comhoiriúnaithe. Ní dhéanann an úim aon ghlao líonra ná
aon ghlao ar shamhail íoctha mura dtugtar `--execute-real` agus mura bhfuil
`--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan an rith
fíor sainráite sin, fanann a breithiúnas meaisín-inléite mar `HOLD`; ní fianaise
ardaithe céime iad tomhais shintéiseacha pálasta/líon glaonna astu féin.

Féadfaidh glaoiteoirí eagar roghnach `transcript.cues` a cheangal le cuid físe
a dtacaítear léi nuair atá téacs ailínithe ina seilbh acu cheana féin. Ní mór
do gach leid `text`, eatramh críochta `start`/`end` laistigh den fhad a
tóraíodh, agus `source` ar an liosta ceadaithe (`client`, `embedded`, nó
`audio-bridge`) a bheith inti; is é `1` réamhshocrú `confidence` agus ní mór dó
fanacht idir `0` agus `1`. Cumaisctear leideanna atá go díreach mar an gcéanna.
Ní thosaíonn OmniRoute tras-scríobh ó na meiteashonraí seo riamh: cóipeáiltear
leideanna bailíochtaithe isteach sa toradh tuairiscithe lena bhfoinse, muinín,
agus eatramh, agus rindreáiltear iad mar bhreathnuithe neamhiontaofa taobh leis
na fotheidil fráma. Diúltaítear do théacs neamhbhailí, as raon, nó gan bhunús
seachas é a mheascadh isteach sa sruth fotheidealaithe. Is é an glaoiteoir a
dhearbhaíonn an réimse `source` faoi láthair; ní fhíoraíonn an freastalaí é:
forfheidhmíonn OmniRoute go bhfuil an luach ar cheann de na trí theaghrán
ceadaithe, ach ní dheimhníonn sé go cripteagrafach fós gur tháinig lipéad
`embedded` nó `audio-bridge` ó bhaint ar le freastalaí í i ndáiríre. Caith le
`source` mar leid neamhiontaofa go dtí go gcuirfear an fíorú sin i bhfeidhm;
ná bunaigh cinntí údaraithe air.

Féadfaidh glaoiteoir ardleibhéil rian `audioTranscript` atá údaraithe cheana féin a sholáthar
don fhíseán céanna. Ritheann an t-alt comhleáite breathnuithe amhairc agus fuaime faoin
sprioc-am agus faoin gcomhartha tobscortha céanna, cuireann sé in ord iad ar amlíne choiteann,
comhtháthaíonn sé dúblaigh bheachta, agus tuairiscíonn sé toradh páirteach nuair nach n-éiríonn
ach le taobh amháin. Má bhíonn `audioTranscript` neamhbhailí ann, díghrádaítear é go dtí an
toradh páirteach sin — coinnítear an cur síos amhairc agus taifeadann an brainse fuaime cód
teipe slánaithe — seachas an físeán iomlán a chur ó mhaith. Caomhnaítear infhaighteacht gach
brainse, an bhratach pháirteach, agus na cóid teipe slánaithe sa toradh tuairiscithe, i meiteashonraí
na ráillí cosanta (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), i meiteashonraí thaisce na dtorthaí, agus i gcuntair
chomhleáite an droichid. Ní dhéanann cosán réamhshocraithe Video Bridge téacsú cainte a
agairt ná an dara cóip meán a íoslódáil; gan an rian sainráite sin, fanann sé
ina fhíseán amháin.

**Coinneáil tras-scríbhinne (#12150 P1).** Bíonn feidhm aige seo go huathoibríoch aon uair a
rindreálann Video Bridge (atá roghnach ann féin) leid tras-scríbhinne — níl aon bhratach
choinneála ar leith ann. Nuair a rindreálann iarratas aon leid tras-scríbhinne (`transcript`
arna dhearbhú ag glaoiteoir nó `audioTranscript` comhleáite), marcálann an ráille chosanta é
mar `videoBridgeObserved` agus táirgeann sí scáth folaithe den chur síos físe —
rindreáil chomhionann ina gcuirtear `[redacted-video-transcript]` in ionad chorp
saorthéacs gach leide, arna tógáil tríd an réimse struchtúrtha leide a ionadú sula
gcóimeáiltear an teaghrán (ní dhéantar é riamh tríd an téacs leacaithe a pharsáil, ionas nach
féidir le hábhar leide ar bith — bíodh sé naimhdeach nó coitianta, lena n-áirítear coirp ina
bhfuil `]`, amhail `[inaudible]`/`[music]` — teacht slán). Sa chorp iarratais a
choinnítear i loga na nglaonna, cuirtear an scáth folaithe sin in ionad gach páirte téacs a
díorthaíodh ó fhíseán, agus iad meaitseáilte de réir comhionannas ábhair; athléitear ancaire
`fullText` ó phálasta críochnaithe na ráille cosanta réamhghlao, ionas go n-éiríonn leis an
meaitseáil fós tar éis do ráillí cosanta níos déanaí sa slabhra (na folaitheoirí PII agus
dintiúr, le tosaíochtaí 10/95) téacs an chur síos a athscríobh ina áit agus tar éis d’instealladh
leid an chórais/seachadta/cuimhne an t-eagar teachtaireachtaí a athmhúnlú. Ní athraítear an
corp a sheoltar suas an sruth chuig an tsamhail. Ní chuireann iarratas breathnaithe aon rud
isteach sa Chuimhne bhuan ach oiread (scipeáiltear eastóscadh a dhíorthaítear ón iarratas agus
ón bhfreagra araon), agus mar sin ní féidir le freagra na samhla féin téacs na tras-scríbhinne
a athrá isteach sa Chuimhne.

Dromchlaí coinneála atá fós oscailte agus á rianú le haghaidh obair leantach (**P2**, #12430):
an seat amh den iarratas cliaint roimh an ráille chosanta sa déantán mionloga;
leanúint `previous_response_id` a dhúnann ar theip; seoltaí inmheánacha leide díorthaithe
a leabaíonn an tras-scríbhinn laistigh de leid teaghráin shintéisithe (céimeanna píblíne,
seachadadh comhthéacs); agus corp an fhreagra / cóip na taisce séimantaí de fhreagra samhla
a luann an tras-scríbhinn. Is dromchlaí amha/aicme-fhreagra nó roghnacha iad seo lasmuigh
de scóip chorp iarratais coinnithe + Cuimhne P1.

Is foshraith taisce ar leith é saolré inmheánach
`/api/modality-bridge/video/drilldown`, atá fíordheimhnithe trí lúb siar/comhartha.
Éilíonn gach oibríocht aitheantas príomhaí teimhneach canónach freisin. Sula gcumasaítear
glaoiteoir táirgthe, ní mór dó an t-aitheantas sin a dhíorthú ón tionónta fíordheimhnithe
agus ní ceadmhach dó luach arna roghnú ag an gcliant a chur ar aghaidh riamh. Ceanglaíonn
eochracha taisce an príomhaí sin le haitheantais chanónacha seisiúin agus tagartha físe,
ní stórálann siad ach na heochracha díorthaithe ó SHA-256, agus cuireann siad léamha agus
scriosadh araon faoi scóip an phríomhaí chéanna. Stórálann an taisce 16 fhráma JPEG
dhíorthaithe ar a mhéad in aghaidh na hiontrála, cuireann sí as feidhm iad tar éis deich
nóiméad, agus tacaíonn sí le léamha teoranta `start`/`end` nó scriosadh sainráite seisiúin.

Tá gach príomhaí teoranta do 16 iontráil agus 64 MiB de shonraí JPEG canónacha. Tá na
teorainneacha sin neamhspleách ar an uasteorainn dhomhanda de 64 iontráil/256 MiB: faoi
bhrú cuóta príomhaí, díshealbhaítear iontrálacha an phríomhaí sin amháin de réir na cinn is
faide nár úsáideadh sula mbreithnítear díshealbhú LRU domhanda. Glantar iontrálacha atá
imithe in éag ó chuntasaíocht an phríomhaí agus ón gcuntasaíocht dhomhanda araon le linn
gníomhaíochta taisce, agus ní dhéanann cealú ná teip bhailíochtaithe athsholáthar páirteach
a chur i bhfeidhm.

Diúltaíonn an taisce do Base64 neamhchanónach, stuáil iomarcach, meáin nach JPEG iad,
JPEGanna míchumtha nó teasctha, agus JPEGanna a ghineann rabhadh le linn díchódú
láníomhá teoranta `sharp`. Ath-ionchódaíonn sí gach íomhá a nglactar léi mar JPEG canónach,
díorthaíonn sí leithead agus airde ó na bearta díchódaithe seachas muinín a chur i réimsí an
ghlaoiteora, agus caitheann sí aon bhearta ilchineálacha leantacha i leataobh seachas iad a
choinneáil. Ní ghearrtar ar an dá chuóta ach an maolán comhbhrúite canónach teoranta.
Cuimsíonn teorainn sreinge JSON forchostas Base64 don uasteorainn ionchuir dhíchódaithe
32 MiB. Taifeadann gach
díorthú stóráilte a fhormáid/taifeach JPEG bailíochtaithe, a bheartas samplála,
leagan an díorthaithe, am a chruthaithe, hais ábhair arna ríomh ag an bhfreastalaí, agus
tagairt tuismitheora haisithe mar aon le hais ábhair an tuismitheora ón nglaoiteoir iontaofa.
Seiceáiltear cealú idir céimeanna asincrónacha díchódaithe/haisála roimh chur i bhfeidhm
adamhach na taisce.

Ní nascann an tráinse seo táirgeoir táirgthe leis an mbealach go fóill agus ní sholáthraíonn
sí roghnú athraithigh iltaifigh. Dá bhrí sin, ní chuireann cosán trédhearcach iarratais
Video Bridge aon obair bhreise i bhfeidhm, agus fanann díorthú príomhaí ceangailte leis an
tionónta agus saolré iomlán iltaifigh FU-08 mar obair leantach shainráite seachas iad a
dhoiciméadú mar iompar atá curtha i gcrích.

Cuirtear fotheideal le frámaí go seicheamhach leis an tsamhail Video chumraithe. Faigheann sárú folamh
Video an socrú Vision le hoidhreacht; má tá an dá cheann folamh, roghnaíonn
uath-ródaire Vision an tsamhail éifeachtach atá cumasach ó thaobh físe de. Tagann fotheidil rathúla
in ionad na coda bunaidh le réimír chobhsaí `[Video description:` a
mharcálann an téacs freisin mar bhreathnóireacht neamhiontaofa a díorthaíodh ó mheán agus a insíonn do shamhlacha
iartheachtacha gan treoracha a aimsítear sa mheán a leanúint. Áirítear in eochracha taisce fotheideal fráma
na bearta JPEG, an leid, an stampa ama, agus an tsamhail éifeachtach; ní chuirtear sa taisce ach
fotheidil rathúla. Coinníonn iontrálacha taisce an tsamhail táirgeora rathúil iarbhír,
lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair a
tháirg samhlacha éagsúla frámaí éagsúla. Athúsáideann amas taisce aitheantas an táirgeora sin
in ionad é a athlipéadú mar an plean ródaithe iarrtha. Tá taisce thorthaí
an fhíseáin iomláin eochraithe de réir gach ionchuir a athraíonn an t-aschur — an leid, an tsamhail
éifeachtach, an beartas samplála, líon na bhfrámaí, mód na hanailíse séimantaí, méarlorg SHA-256
na leid fócas normalaithe, an fhuinneog fócais, `transcript`,
`audioTranscript`, agus bratach na bileoige teagmhála — mar sin, má athraítear aon cheann de na
toisí sin, is teip taisce a bhíonn ann, agus ní athúsáid sheanchaite riamh. Tá leagan,
tairseach, agus líon teoranta na bhfrámaí iarrthacha den bheartas dí-dhúblála amhairc sainráite freisin san
eochair taisce torthaí agus sna meiteashonraí; dá bhrí sin, ní féidir le hathrú beartais cur síos
seanchaite ar an bhfíseán iomlán a athúsáid. Coinníonn meiteashonraí thaisce torthaí v4 an mód agus an
méarlorg, agus ní choinníonn siad tasc amh an úsáideora riamh. Tuairiscíonn meiteashonraí na ráille cosanta na
móid anailíse iarrtha agus éifeachtach araon; tuairiscítear mód `focused` iarrtha gan
téacs úsáideora inúsáidte mar `full` go héifeachtach.

Baineann an ráille chosanta gach cuid físe tacaithe amach ach ní dhéanann sí cur síos ar níos mó ná
`modalityBridgeVideoMaxVideos`. I gcás sprice a bhfuil sé cruthaithe ina leith go bhfuil
`supportsVideo === false`, déantar marcóirí follasacha sábháilte téacs de na físeáin ar theip orthu agus de na
físeáin os cionn na teorann ionas nach mairfidh aon fhíseán amh. Nuair nach eol an acmhainn, fanann na codanna
sin gan athrú. Seachnaíonn spriocanna a bhfuil `supportsVideo === true` acu an droichead.
Forleathnaítear comhartha tobscortha iarratas an chliaint tríd an íoslódáil, scuaine an bhróicéara,
fo-phróisis, agus glaonna fotheidil; stopann tobscortha idir físeáin agus ní theipeann siad go hoscailte
chuig meáin amha riamh.

Tá socruithe ama rite tacaithe ag an mbunachar sonraí agus bailíochtaithe le Zod:

| Eochair                             | Réamhshocrú | Raon / iompar                                                                                                               |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Am rite roghnach, le roghnú isteach                                                                                         |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | Caomhnaíonn `full` fotheidil ghinearálta; úsáideann `focused` comhthéacs teoranta, neamhiontaofa ón úsáideoir is déanaí     |
| `modalityBridgeVideoModel`          | `""`        | Faigh samhail Vision Bridge le hoidhreacht                                                                                  |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nó `segment_aware` comhréireach; má theipeann ar an mbrathadóir, úsáidtear `uniform` mar chúltaca |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                              |

Déantar luachanna teorann ama Video leagáide a coinníodh agus atá os cionn 120 soicind a theorannú go
sprioc-am an bhróicéara; diúltaítear do scríbhinní nua socruithe os cionn na teorann sin.
Éilíonn `GET /api/modality-bridge/video/runtime` logántacht lúb-ais iontaofa stampáilte
roimh fhíordheimhniú nó iniúchadh ama rite, agus ansin éilíonn sé fíordheimhniú
bainistíochta. Ní thugann sé ar ais ach `available`, leaganacha sláintithe FFmpeg/ffprobe, agus cúis
sheasta nuair nach bhfuil an t-am rite ar fáil. Ní API poiblí uaslódála é an críochphointe inmheánach
eastósctha: tugann sáithiú na scuaine `503` móide `Retry-After` ar ais, tugann dícheangal
glaoiteora `499` ar ais, agus tugann sprioc-am seasta an bhróicéara `504` ar ais. Cuireann freagraí tiontaithe
`video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach
`x-omniroute-modality-bridge` gan míreanna Vision ná Audio a bhaint.

### Mascóir PII (`piiMasker.ts`)

Ritheann sé ar **an dá** chéim.

- **`preCall`** clónálann sé an pálasta, téann sé trí `system`, `messages`, `input`, agus
  `prompt` (lena n-áirítear míreanna gnáth-theaghráin), agus cuireann sé `processPII()` (ó
  `@/shared/utils/inputSanitizer`) i bhfeidhm ar réimsí teaghráin `content`/`text`. Nuair atá
  `PII_REDACTION_ENABLED=true`, ceiltear PII braite sa phálasta
  amach. Tá sé seo neamhspleách ar `INPUT_SANITIZER_MODE` (nach rialaíonn ach
  an beartas insteallta leide). Nuair atá an cheilt múchta, taifeadann an glao líon na mbrathanna
  gan an t-inneachar a athscríobh.
- **`postCall`** déanann sé clón domhain den fhreagra, ritheann sé `sanitizePIIResponse()` chomh maith le
  mascóir crutha Responses API (`maskResponsesOutput` — clúdaíonn sé
  `output_text` agus `output[].content[].text`). Má tharlaíonn aon cheilt, tagann an
  freagra modhnaithe in ionad an fhreagra bhunaidh.

Ní chuireann an ráille chosanta bac riamh; ní dhéanann sí ach anótáil (`meta.detections`,
`meta.redacted`) nó athscríobh.

### Instealladh Leide (`promptInjection.ts`)

Aimsíonn sé struchtúir naimhdeacha in inneachar a sholáthraíonn an t-úsáideoir agus cuireann sé an
beartas cumraithe i bhfeidhm. Tá an t-iompar faoi stiúir athróga timpeallachta agus roghanna
an chruthaitheora:

| Socrú             | Athróg timpeallachta                                                                                  | Réamhshocrú | Éifeacht                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cumasaithe        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`      | Nuair atá sé `false`, scoireann an ráille cosanta go luath.                                                                                                                                                            |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`      | Beartas ionsáite: `block`, `warn`, nó `log`. (Glactar le `redact` ar mhaithe le comhoiriúnacht siarghabhálach ach **ní** bhaineann sé téacs ionsáite; rialaítear athscríobh PII iarratais le `PII_REDACTION_ENABLED`.) |
| Tairseach blocála | rogha `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (ailias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`      | An déine íosta is gá chun blocáil. Is le haghaidh breathnóireachta amháin atá Meánach de réir réamhshocraithe.                                                                                                         |

**Tosaíocht mód** (`getMode`): `options.mode` an ghlaoiteora →
sárú **brataí gné sa bhunachar sonraí** `INJECTION_GUARD_MODE` (Deais → Socruithe →
Bratacha Gné) → athróg timpeallachta `INJECTION_GUARD_MODE` → athróg timpeallachta `INPUT_SANITIZER_MODE` →
`warn`. Mar sin, bíonn tosaíocht ag sárú ón deais ar na hathróga timpeallachta, agus dá bhrí sin
rialaíonn comhéadan Bratacha Gné an ráille cosanta atá ag rith i bhfíor-am (gan atosú). Tá léamh an bhunachair sonraí slán i gcás teipe:
má tharlaíonn earráid, filleann an ráille cosanta ar an iompar bunaithe ar athróga timpeallachta, agus nuair nach bhfuil
aon sárú socraithe bíonn an t-iompar comhionann le réiteach bunaithe ar athróga timpeallachta amháin.

Foinsí braite:

1. `sanitizeRequest()` ó `@/shared/utils/inputSanitizer` (tacar comhroinnte brathadóirí
   a úsáidtear in áiteanna eile sa phíblíne).
2. `DEFAULT_GUARD_PATTERNS` ionsuite (`system_override_inline` agus
   `markdown_system_block` faoi láthair, agus déine `high` ag an dá cheann).
3. `customPatterns` roghnacha a chuirtear ar aghaidh trí roghanna an déantóra (teaghráin, sloinn ionadaíochta,
   nó taifid `{ name, pattern, severity }`).

Nuair atá `mode === "block"` **agus** nuair a shroicheann brath amháin ar a laghad an tairseach
déine, filleann `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }`. Sna móid `warn`/`log`, logálann an ráille cosanta ach
ceadaíonn sé an glao. Easpórtáiltear an cúntóir comhroinnte `evaluatePromptInjection()` freisin
do ghlaoiteoirí ar gá dóibh leideanna a mheas gan dul tríd an gclárlann.

**Teorainn scanta (v3.8.20):** ní scrúdaíonn an brathadóir ach an **chéad 16 KB** de
théacs na leideanna comhcheangailte — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 beart) in
`src/shared/utils/inputSanitizer.ts`. Déanann `detectInjection()` agus
`evaluatePromptInjection()` araon `slice(0, MAX_INJECTION_SCAN_BYTES)` sula ritheann siad
lúb na bpatrún. Bíonn treoracha ionsáite gar do bharr ionchuir, mar sin
cuireann sé seo teorainn le húsáid LAP/GC ag sloinn ionadaíochta ar ualaí pála ina bhfuil na céadta KB gan an bhrath a lagú (féach
#3932, #4041).

### Mascóir Dintiúr (`credentialMasker.ts`)

Ritheann sé ar an **dá** chéim, agus é deireanach sa slabhra réamhshocraithe (tosaíocht `95`). Ceileann sé
patrúin aitheanta eochracha API / comharthaí rúnda ón ualach pála amach (ábhar
teachtaireachta, argóintí glaonna uirlise, torthaí uirlise) **agus** ó fhreagra an tsoláthraí, ionas nach sceitear
dintiúr a greamaíodh isteach i leid (nó a cuireadh ar ais mar mhacalla i dtoradh uirlise)
chuig an soláthraí réamhtheachtach ná ar ais chuig an gcliant.

- **Rogha isteach amháin**, de réir an choinbhinsiúin chéanna le ceilt PII (gar do Riail Dhocht #20):
  díchumasaithe mura bhfuil `settings.credentialRedactionEnabled === true` **nó**
  `CREDENTIAL_REDACTION_ENABLED=true`. Nuair atá sé múchta, ní dhéanann an ráille cosanta aon rud —
  ní bhlocálann sé agus ní athscríobhann sé choíche.
- Siúlann `redactCredentials()` crann iomlán an ualaigh pála/an fhreagra (`walkValue()`,
  slán ar thruailliú fréamhshamhla, slán ar thimthriallta trí `WeakSet`) agus cuireann sé ionadchoinneálaí
  `[REDACTED:<type>]` in ionad meaitseálacha, agus ní chlónálann sé ach na brainsí a athraíodh
  i ndáiríre.
- Clúdaíonn `CREDENTIAL_PATTERNS` eochracha soláthraithe LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), comharthaí VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), eochracha íocaíochta (Stripe, Square), eochracha
  néil (eochair rochtana AWS, Twilio, SendGrid, Mailgun), eochracha príobháideacha / JWTanna,
  teaghráin naisc ina bhfuil dintiúir (`mongodb://user:pass@...`, etc.), agus
  patrún cineálach do luach ceanntáisc `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ceileann sé eochracha i gcruth ceanntáisc (`authorization`, `x-api-key`, `api-key`,
  `apikey`) go struchtúrach (an luach amháin, agus coinnítear réimír scéime amhail
  `Bearer `/`Basic `) seachas tríd an slonn ionadaíochta cineálach téacs.
- Ní bhlocálann an ráille cosanta choíche; ní dhéanann sé ach athscríobh (`modifiedPayload` /
  `modifiedResponse`) agus anótáil (`meta.credentialsRedacted`, `meta.count`).

Cosaint aischéimnithe: `tests/unit/credential-masker-guardrail.test.ts`.

## Bunchonradh (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // má tá true ann, gearrchiorcadófar an slabhra
  message?: string; // taispeántar é agus bac á chur
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // tugtar ar ais é ag preCall chun an t-iarratas a athscríobh
  modifiedResponse?: TValue; // tugtar ar ais é ag postCall chun an freagra a athscríobh
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Cuireann ráille cosanta in iúl nach bhfuil “aon athrú” ann trí `void`, `{}`, nó
`{ block: false }` a thabhairt ar ais. Má thugtar `modifiedPayload`/`modifiedResponse`
ar ais, cuirtear é in ionad an luacha atá ag sreabhadh tríd an slabhra chuig na ráillí cosanta iartheachtacha.
Iompraíonn `signal?: AbortSignal` saolré an ghlaoiteora isteach sna ráillí cosanta. Is é ginmhilleadh iarratais an eisceacht d'aon ghnó ina leantar ar aghaidh i gcás teipe: stopann droichid meán an obair agus déanann siad glanadh gan na meáin amh a chur ar ais chuig sprioc arb eol nach dtacaíonn sí leo.

## Clárlann (`registry.ts`)

Nochtann an t-aonán aonair `guardrailRegistry`:

- `register(guardrail)` — cuireann sé ráille cosanta leis (nó cuireann sé ceann eile ina hionad de réir ainm normalaithe) agus
  déanann sé athshórtáil de réir `priority` ardaitheach.
- `clear()` / `list()` — cúntóirí riaracháin.
- `runPreCallHooks(payload, context)` — téann sé trí na ráillí cosanta gníomhacha, cuireann sé an
  pálasta trí `modifiedPayload`, agus stopann sé ag an gcéad `block: true`.
- `runPostCallHooks(response, context)` — an sreabhadh céanna ar thaobh an fhreagra.
- `resetGuardrailsForTests({ registerDefaults })` — glanann sé an staid agus, más roghnaithe,
  athchláraíonn sé na réamhshocruithe chun tástálacha a leithlisiú go glan.

Tugann an dá reathaí `{ blocked, payload|response, results, guardrail?, message? }`
ar ais, áit ar eagar de thaifid `GuardrailExecutionResult` é `results` ina bhfuil
na réimsí `blocked`, `skipped`, `modified`, `error`, agus `meta` do gach ráille cosanta,
atá úsáideach don rianú.

### Ráillí Cosanta a Dhíchumasú de Réir Iarratais

Comhiomlánaíonn `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` liosta
dí-dhúbláilte d'ainmneacha ráillí cosanta ar cheart iad a scipeáil don iarratas
reatha. Foinsí (iad uile roghnach agus cumaiscthe):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` i gcorp an iarratais (ag an mbarrleibhéal)
- `metadata.disabledGuardrails` i gcorp an iarratais
- Ceanntásc `x-omniroute-disabled-guardrails` (nó an ceann oidhreachta
  `x-disabled-guardrails`)

Féadfaidh na luachanna a bheith ina n-eagair de theaghráin nó ina dteaghrán scartha le camóga; déantar
na hainmneacha a normalú go cás íochtair kebab (`pii_masker` → `pii-masker`). Cuirtear an toradh
ar aghaidh trí `context.disabledGuardrails` chuig an gclárlann, a scipeálann
ráillí cosanta comhoiriúnacha (`skipped: true` in `results`).

## Ord Forghníomhaithe

I gcás gach iarratais a théann trí `src/sse/handlers/chat.ts` agus
`open-sse/handlers/chatCore.ts`:

1. Tógann `resolveDisabledGuardrails(...)` an liosta scipeála ón eochair API, ón gcorp,
   agus ó na ceanntásca.
2. Ritheann `guardrailRegistry.runPreCallHooks(body, ctx)` na ráillí cosanta in ord
   tosaíochta ardaitheach:
   - Taifeadtar ráillí cosanta díchumasaithe mar `skipped`.
   - Féadfaidh `preCall` gach ráille cosanta an t-ualach pála a athscríobh trí `modifiedPayload`.
   - Gearrchiorcadaíonn an chéad `block: true` an slabhra agus seolann an láimhseálaí
     freagra diúltaithe ráille cosanta ar ais.
3. Sreabhann an t-ualach pála (a d'fhéadfadh a bheith athscríofa) isteach sa ródú teaglama agus sa seoladh
   réamhtheachtach.
4. Tar éis don fhreagra a bheith curtha le chéile, ritheann `guardrailRegistry.runPostCallHooks(...)`
   an slabhra céanna ar an bhfreagra. Má bhíonn `block: true` anseo, caitear an freagra
   réamhtheachtach i leataobh.

Taifeadtar ráillí cosanta a chaitheann earráid le `error: <message>` agus logáiltear iad trí
`logger.warn`, ach leanann an slabhra ar aghaidh — dearadh oscailte ar theip atá ann.

## Cumraíocht

Athróga timpeallachta a léann na ráillí cosanta ionsuite:

| Athróg                                | Úsáidte ag                   | Éifeacht                                                                                                          |
| ------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`           | Socraigh go `false` chun an bhrath a dhíchumasú go hiomlán.                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`           | Polasaí ionsteallta: `warn`, `block`, nó `log`. Ní athscríobhann an luach oidhreachta `redact` téacs ionsteallta. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`           | Mód don gharda ionsteallta; is bratach gné DB é freisin a **sháraíonn** na hathróga timpeallachta (DB > ENV).     |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`           | An íosdéine a dhiúltaíonn `MODE=block`: `high` (réamhshocrú), `medium`, nó `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`           | Ailias oidhreachta le haghaidh `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`                 | Nuair is `true` é, folófar PII an iarratais (go neamhspleách ar an mód ionsteallta).                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (iartheachtach) | Rialaíonn sé iompar an mhascóra ar thaobh an fhreagra.                                                            |

Léann ráillí cosanta an Droichid Módúlachta cumraíocht am rite ón stór socruithe
atá tacaithe ag an DB (`getSettings()`), seachas ó athróga timpeallachta. Is iad príomheochracha na físe
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus
`modalityBridgeCacheMaxEntries`. Ní ghlactar leis na heochracha oidhreachta
`visionBridge*` ach mar an cúlréiteach léitheoireachta aon-timthrialla atá doiciméadaithe;
úsáideann scríbhinní an deais na príomheochracha. Tá na réamhshocruithe agus an réiteoir
cúlréitigh in `src/shared/constants/modalityBridgeDefaults.ts`, agus coinnítear na tairisigh
oidhreachta in `src/shared/constants/visionBridgeDefaults.ts`.

Úsáideann fuaim `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, agus `modalityBridgeAudioMaxClips`, chomh maith leis na socruithe comhroinnte
`modalityBridgeCache*`. Níl aon chúlréiteach eochrach oidhreachta ag fuaim toisc gur
tugadh na heochracha seo isteach le scéimre an Droichid Módúlachta.

Úsáideann físeán `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, agus
`modalityBridgeVideoTimeout`, chomh maith leis na socruithe comhroinnte `modalityBridgeCache*`.
Tá sé díchumasaithe de réir réamhshocraithe toisc gur spleáchais oibríochtúla roghnacha iad
FFmpeg/ffprobe agus go gcuireann fotheidealú frámaí aga folaigh agus costas samhla leis.

## Ráillí Cosanta Saincheaptha

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Céimeanna:

1. Cruthaigh `src/lib/guardrails/myGuardrail.ts` a leathnaíonn `BaseGuardrail`.
2. Cuir `preCall` agus/nó `postCall` i bhfeidhm.
3. Cláraigh é tráth an iompórtála (brúigh ó `registerDefaultGuardrails`) nó
   glaoigh ar `guardrailRegistry.register(...)` ag am rite — ionadaíonn an chlárlann
   aon ráille cosanta roimhe sin a bhfuil an t-ainm normalaithe céanna air.
4. Cuir tástálacha leis faoi `tests/unit/` (samplaí atá ann cheana:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tástáil

Úsáid `resetGuardrailsForTests()` idir tástálacha chun tosú ó staid aitheanta.
Tabhair `{ registerDefaults: false }` chun tosú le clárlann fholamh agus
ná cláraigh ach na ráillí cosanta atá á dtástáil. Glacann Vision Bridge le hinstealladh
spleáchas (`deps.getSettings`, `deps.callVisionModel`); nochtann Audio Bridge na
pointí coibhéiseacha do shocruithe, cumais, roghnú samhla STT, seiceálacha
dintiúr agus tras-scríobh. Dá bhrí sin, is féidir le tástálacha an dá shreabhadh a
fheidhmiú gan rochtain ar bhunachar sonraí ná ar líonra.

## Féach Freisin

- `src/lib/guardrails/` — cur chun feidhme
- `src/shared/utils/inputSanitizer.ts` — brathadóir comhroinnte a chumasaíonn
  instealladh leide agus folú PII
- `src/shared/constants/visionBridgeDefaults.ts` — réamhshocruithe Vision Bridge agus
  liosta samhlacha don droichead éigeantach
- `src/shared/constants/modalityBridgeDefaults.ts` — réamhshocruithe comhroinnte ama rite Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — sraith ortagánach (scoradán ciorcaid, tréimhsí fuaraithe)
- `docs/reference/ENVIRONMENT.md` — tagairt iomlán d'athróga timpeallachta

## Cumhdach bealaí agus foireann dhearg don gharda insteallta (Céim 8 · Bloc D)

Clúdaíonn an garda insteallta (`createInjectionGuard` / `withInjectionGuard`) gach bealach
a ghlacann le leideanna úsáideora. Urramaíonn sé `INJECTION_GUARD_MODE` (`warn` mar réamhshocrú = logáil amháin;
`block` = seolann sé HTTP 400 `SECURITY_001` ar ais).

| Cineál         | Bealaí                                                                                                                                               | Mód réamhshocraithe |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Téacs (reatha) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Giniúnach      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Sonraí         | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Clúdaíonn eastóscadh téacs (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Foireann dhearg (gach oíche, `nightly-llm-security.yml`):** deimhníonn promptfoo go gcuireann gach bealach
bac ar chorpus OWASP-LLM in `INJECTION_GUARD_MODE=block`; ritheann garak tóireadóirí (scipeálann sé gan rún).
Cuirtear `moderations` san áireamh ar mhaithe le comhsheasmhacht — is féidir le hoibreoirí i mód blocála é a dhíolmhú trí
`resolveDisabledGuardrails`.

Tá dhá jab sa sreabhadh oibre oíche (`.github/workflows/nightly-llm-security.yml`, cron + seoladh
láimhe):

- **`promptfoo-guard` (blocálach)** — ritheann sé `promptfoo eval -c promptfooconfig.yaml`
  le `INJECTION_GUARD_MODE=block`. Dearbhaíonn gach cás naimhdeach (m.sh. "déan neamhaird de gach
  treoir roimhe seo…", éaluithe príosúin ar nós DAN) go bhfuil
  `error.code === "SECURITY_001"` sa fhreagra, is é sin, gur dhiúltaigh an garda don iarratas i ndáiríre.
- **`garak` (comhairleach)** — ritheann sé garak `--probes promptinject,dan,leakreplay`
  i gcoinne ásc áitiúil OmniRoute (`http://localhost:20128/v1`). Tá sé coinníollaithe ar
  rún soláthraí (`PROMPTFOO_PROVIDER_KEY`); scipeálann sé go slachtmhar agus cuirtear
  `|| true` mar iarmhír leis, mar sin tuairiscíonn sé gan CI a chur ó mhaith.

Cuimsíonn cumhdach chúntóir an gharda (`createInjectionGuard` / `withInjectionGuard`)
gach bealach `/v1` a iompraíonn leid; baintear téacs na leide as
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` le
`extractMessageContents()` in `src/shared/utils/inputSanitizer.ts`.
