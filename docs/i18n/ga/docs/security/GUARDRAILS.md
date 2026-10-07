# Guardrails (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Foinse na fírinne:** `src/lib/guardrails/`
> **Nuashonraithe is déanaí:** 2026-08-29 — v3.8.51 (Is é an glaoiteoir a dhearbhaíonn bunús thras-scríbhinn Video Bridge,
> níl sé fíoraithe ag an bhfreastalaí fós — soiléirithe de réir #11661)

Forfheidhmíonn ráillí cosanta sábháilteacht, polasaí, agus claochluithe ábhair ag an teorainn idir OmniRoute agus soláthraithe in aghaidh an tsrutha. Is féidir le gach ráille cosanta pálastaí iarratais (`preCall`) agus freagraí in aghaidh an tsrutha (`postCall`) a iniúchadh (agus, de rogha air sin, diúltú dóibh, iad a chlaochlú, nó nótaí a chur leo).

Is córas **teip-oscailte** é: má chaitheann ráille cosanta earráid le linn forghníomhaithe, déanann an chlárlann an earráid a thaifeadadh agus leanann sí ar aghaidh leis an gcéad ráille cosanta eile in ionad teip a chur ar an iarratas. Is cinneadh sainráite é blocáil (`block: true`), ní tharlaíonn sé de thaisme riamh.

## Ráillí Cosanta Ionsuite

Luchtaíonn an chlárlann sé ráille cosanta go huathoibríoch de réir ord tosaíochta le linn iompórtála
(féach `registry.ts` → `registerDefaultGuardrails()`):

| Tosaíocht | Ainm                | Céim(eanna)    | Comhad                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ritheann uimhreacha tosaíochta níos ísle **ar dtús**.

### Vision Bridge (`visionBridge.ts`) — Droichead Modhúlachta PR-1

Idircheapann sé iarratais a bhfuil íomhánna iontu atá dírithe ar **mhúnlaí nach bhfuil cumas fís acu** agus déanann sé an t-iarratas iomlán a atreorú chuig múnla a bhfuil cumas fís aige, nó cuireann sé tuairiscí téacs a tháirgtear ag múnla fís inchumraithe in ionad na n-íomhánna roimh an nglao in aghaidh an tsrutha. Ligeann sé seo do sholáthraithe téacs-amháin pálastaí ilmhódacha a láimhseáil go trédhearcach.

Sreabhadh:

1. Scipeáil má thacaíonn an spriocmhúnla le fís cheana féin (mura bhfuil sé le feiceáil sa liosta droichid éigeantach `isVisionBridgeForcedModel`).
2. Eastósc codanna íomhá trí `extractImageParts(messages)` (`visionBridgeHelpers.ts`), a tharmligeann chuig an **mbrathadóir meán aontaithe** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — an t-aon fhoinse na fírinne amháin atá roinnte leis an scagaire comhoiriúnachta teaglama. Tá an t-eastóscadh bánliostaithe do chodanna barrleibhéil de na cruthanna is féidir le `replaceImageParts` a nascadh ar ais (an conradh eastóscadh↔athsholáthar): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, agus Responses API `input_image`. Is ábhar scagaire teaglama iad amas neadaithe agus cruthanna táscaire-amháin agus ní dhéantar iad a eastóscadh riamh. Scipeáil mura bhfaightear aon cheann.
3. Réitigh cumraíocht am rite trí `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): tá tosaíocht ag eochracha socruithe nua `modalityBridge*`; fanann seaneochracha `visionBridge*` mar **chúltaca aon-timthrialla** (fuinneog rolladh siar). Scipeáil roimh aon trasnú meán nuair atá an droichead díchumasaithe.
4. Cinneann roghnóir mód (`modalityBridgeVisionMode`, féach an tábla thíos) idir atreorú vs cur síos. Fillfidh atreorú `modifiedPayload` agus gan ach `model` babhtáilte, móide meitea `{ rerouted, fromModel, toModel, imagesKept }`.
5. Conair cur síos: cuir teorainn le híomhánna ag `maxImages`, cum an pras tasc-fheasach, téigh i gcomhairle leis an taisce cur síos, glaoigh ar an múnla fís **go comhthreomhar** (`Promise.allSettled`), agus insteall codanna téacs `[Image N]: <description>` ina n-áit. Má theipeann ar chur síos, gintear `null` agus déantar an chuid íomhá bhunaidh a **chaomhnú** (#4012) — ach amháin ar an gconair cur síos teaglama nuair a theip ar gach cur síos, áit a bhfaigheann foinse in aghaidh an tsrutha dheimhnithe nach bhfuil cumas fís aici mionphíosa `(unavailable — no vision-capable provider connected)` ina ionad (#8430).
6. Fill `modifiedPayload` + meitea (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Roghnóir mód (`modalityBridgeVisionMode`)

| Mód        | Réamhshocrú | Iompar                                                                                                                                                                                                                                                                                                            |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Heuraistic oidhreachta, gan teagmháil (#6640/#7204): déanann múnlaí neamh-theaglama/`auto/` atreorú chuig an múnla fís is fearr mura bhfuil dintiúir inúsáidte ag an mbunmhúnla cheana féin (ansin déantar cur síos); déanann spriocanna teaglama cur síos i gcónaí.                                              |
| `describe` |             | Déan cur síos i gcónaí — scipeáiltear an bloc atreoraithe go hiomlán; freagraíonn an múnla a roghnaigh an t-úsáideoir i gcónaí.                                                                                                                                                                                   |
| `reroute`  |             | Atreorú éigeantach: seachnaítear an cosaint 'coinnigh-múnla-le-dintiúir'. Tá feidhm fós ag an gcosaint dintiúir don **sprioc** atreoraithe — nuair nach bhfuil aon sprioc fís inúsáidte ann, titeann an t-iarratas síos go dtí 'cur síos' ionas nach sroicheann amhíomhánna cúlbhall téacs-amháin go deo (#8430). |

Gearrchiorcaíonn móid éigeantacha **roimh** an heuraistic `auto`; tá iompar `auto` comhionann ó thaobh beart de leis an ráille cosanta roimh PR-1.

#### Pras cur síos tasc-fheasach (`modalityBridgeVisionTaskAware`)

Réamhshocrú **fíor**. Cuireann `composeVisionPrompt()` (`visionBridgeHelpers.ts`) téacs an **teachtaireacht úsáideora dheireanach** (gearrtha go 500 carachtar) le bunphras an chur síos, ag stiúradh an chur síos i dtreo an ruda a d'iarr an t-úsáideoir i ndáiríre (patrún codex-vision-proxy) agus ag iarraidh ar an múnla fís téacs infheicthe a thras-scríobh. Agus an bratach as — nó gan aon téacs úsáideora — úsáidtear an bunphras gan athrú.

Iarrann an iarratas comhoiriúnach le OpenAI (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) a dhéanann an lúb féin-thuairiscithe i gcónaí `image_url.detail: "high"` — gan choinníoll, do gach glaoiteoir/soláthraí, gan a bheith faoi ghlas ar aon chomhartha cliant. Laghdaíonn sampláil íseal-mhionsonraithe cruinneas OCR go beacht don tasc trascríobh téacs a iarrann an pras seo, mar sin iarrann an glao tuairiscithe féin mionsonraí ard i gcónaí beag beann ar an leibhéal mionsonraí a d'úsáid an t-iarratas isteach bunaidh. Ní dhéanann sé seo difear ach do chorp an iarratais tuairiscithe inmheánaigh; ní athraíonn sé an chaoi a gcuireann OmniRoute `image_url.detail` an ghlaoiteora ar aghaidh ar an bpríomh-iarratas — cuirtear an réamhshocrú sin i bhfeidhm ar leithligh, agus do chliaint OpenCode a braitheadh amháin, i `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Níl aon réimse `detail` ag brainse formáid sreinge Anthropic den lúb féin-thuairiscithe agus ní dhéanann ceachtar réamhshocrú difear dó.

#### Teorainn aschuir tuairiscithe (`modalityBridgeVisionMaxChars`)

| Eochair                        | Réamhshocrú | Raon             |
| ------------------------------ | ----------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`         | `0` nó 100–50000 |

Ciallaíonn `0` (réamhshocrú) **gan teorainn** — cuirtear an tuairisc a thugann `callVisionModel()` ar aghaidh gan athrú, ag caomhnú an iompair reatha. Déanann aon luach sa raon 100–50000 an tuairisc a ghiorrú le hiarmhír `…` sula ndéantar í a chur ar ais mar `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Ardaigh é seo le haghaidh tascanna OCR atá trom ar mhionsonraí áit a dteastaíonn an trascríobh iomlán ón tsamhail iartheachtach; ísligh é chun úsáid comharthaí a theorannú ar mhúnlaí fís-chaintiúla. Tá an réimse painéil ar an bpainéal Casta den chluaisín Fís (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) agus clampálann sé aon luach idir 1 agus 99 suas go dtí an t-urlár 100 agus fágann sé `0` follasach gan teagmháil — is luach Zod bailí é `0` ann féin (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), ní hamháin an réamhshocrú "gan socrú".

#### Taisce tuairiscithe (`modalityBridge/bridgeCache.ts`)

Taisce LRU + TTL sa chuimhne le haghaidh aschur tuairiscithe, roinnte ar fud an phróisis.
Eochair = `sha256(imageRef + composedPrompt + configuredBridgeModel)` le frámaíocht réamhtheorannaithe fad (gan imbhuailtí teorann réimse). Is é an comhpháirt samhail an tsamhail droichid **cumraithe**, ní an tsamhail a d'fhreagair i ndáiríre — d'fhéadfadh `callVisionModel` titim siar go hinmheánach, agus dhéanfadh eochairú in aghaidh an iarrachta an taisce a ilroinnt. Ní dhéantar cur síos ar theipeanna a thaisceadh riamh. Socruithe:

| Eochair                         | Réamhshocrú | Raon    |
| ------------------------------- | ----------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`      | —       |
| `modalityBridgeCacheTtlMinutes` | `60`        | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`       | 10–5000 |

#### Normalú íomhá cianda (tuairisc lúb féin/gníomhú base64)

Nuair a fhaigheann an droichead íomhá **cianda** é féin — an féin-ghlao tuairiscithe Anthropic agus an tiontú base64 formáid sreinge claude (`ensureBase64ImagesForClaudeWire`), an dá cheann trí `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — cuirtear an URI sonraí mar thoradh air trí `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sula ndéantar é a leabú san iarratas samhail fís. Déantar íomhánna ró-mhór a laghdú go dtí **imeall fada 2048px** (ag teacht leis an teorainn athmhéadaithe a chuireann OpenAI/Anthropic i bhfeidhm cheana féin ar thaobh an fhreastalaí), rud a laghdaíonn bearta uaslódála/moill gan athrú a dhéanamh ar a bhfeiceann an tsamhail fís. Úsáideann athmhéadú `sharp`, a luchtú trí iompórtáil dhinimiciúil: ar ardán ina dteipeann ar a dhénártha dúchasach a luchtú, **ní chaitheann** `normalizeDataUri()` riamh — titeann sé siar go dtí pasáiste de na bearta bunaidh, mar sin coinníonn an cosán tuairiscithe/tiontaithe base64 ag obair i gcónaí. Cuirtear bearta neamh-íomhá (gníomhú nár thug íomhá inléite ar ais) ar aghaidh gan teagmháil freisin. Tá an normalú seo scóipithe d'íomhánna a fhaigheann an droichead dá fhéin-ghlao féin — ní chuirtear i bhfeidhm é riamh ar phálasta pasáiste amh an ghlaoiteora, ag teacht le prionsabal an mhodhnaithe roghnach amháin (Riail Chrua #20).

#### Scéimre socruithe + imirce

Déantar na heochracha nua `modalityBridge*` a bhailíochtú le Zod in `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, an triúr `modalityBridgeCache*`, agus an grúpa `modalityBridgeAudio*` a úsáideann an Droichead Fuaime. Cóipeálann Imirce `141_modality_bridge_settings.sql` luachanna oidhreachta `visionBridge*` atá ann cheana féin chuig na heochracha nua meaitseála (neamh-idempotent, ní dhéanann sé forscríobh riamh ar luach `modalityBridge*` atá socraithe ag oibreoir); fanann na heochracha oidhreachta glactha mar chúltaca léitheoireachta ar feadh timthriall scaoilte amháin.

#### Ceanntásc trédhearcachta + staitisticí

Iompraíonn freagraí atá claochlaithe le tuairisc `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (tógtha ag `buildModalityBridgeHeader()` in `modalityBridge/bridgeStats.ts`, stampáilte ag `withModalityBridgeHeader()` in `src/sse/handlers/chatHelpers.ts`). Ní fhaigheann iarratais atá athródaithe **gan** ceanntásc — níor athraíodh an pálasta agus tá an malartú samhail le feiceáil cheana féin i réimse `model` chorp an fhreagra.

Tugann `GET /api/modality-bridge/stats` (údarú bainistíochta, an leibhéal céanna le `GET /api/settings`) na cuntair in-chuimhne in aghaidh an mhodha `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` ar ais le haghaidh `vision`, `audio`, agus `video`. Úsáideann `averageLatencyMs` `latencySamples`, ní gach iarracht, mar a ainmneoir; ní dhéanann oibríocht gan am sampla nialas-millisecond a chruthú. Fanann `bridged` mar an ailias comhoiriúnach siar le haghaidh tiontaithe rathúla; ní mhéadaíonn iarrachtaí teipthe é. Athshocraítear cuntair ar aththosú próisis de réir dearaidh (teileiméadracht, ní cuntasaíocht).

#### Cumraíocht an Phainéil

Is é an leathanach tiomnaithe painéil ná
`/dashboard/settings/modality-bridge`. Coinníonn a chuid cluaisíní `Vision`, `Audio`,
agus `Video` atá inrochtana trí URL paraiméadair cheiste agus an luach `tab` á athrú.
Nochtann an cluaisín Vision cumasú, mód, roghnú samhla (lena n-áirítear an réamhshocrú uathoibríoch),
spreagadh atá feasach ar thascanna, teorainneacha ama/íomhá/fad-tuairisce/taiscthe chun cinn,
cuntair reatha, agus iarratas samplach cosanta. Tá an cluaisín Audio beo freisin: nochtann sé
cumasú, roghnóir samhla STT-amháin le Auto, teorainneacha ama/uas-ghearrthóg, cuntair fuaime,
agus tástáil shamplach `input_audio`. Tá an cluaisín Video feidhmiúil: tuairiscíonn sé
stádas reatha FFmpeg/ffprobe — ceann de cheithre stát soiléir UI (`unknown` fad is atá
an taiscéalaí ar siúl nó nár éirigh leis a chríochnú, `restricted` ar óstach painéil neamh-lúbchúlaithe
áit a scipeáiltear an taiscéalaí ar thaobh an chliaint, `unavailable` nuair a taiscéaladh
agus a deimhníodh go raibh sé in easnamh, nó `available` leis na leaganacha FFmpeg/ffprobe) —
coinníonn sé teorainneacha cumasaithe/samhla/fráma/físeáin/ama, scagann sé an roghnóir samhla
go samhlacha atá in ann fís a láimhseáil, agus nochtann sé cuntair físeáin.

Is nasc comhoiriúnachta leis an leathanach nua é an sean-chárta Vision Bridge faoi shocruithe AI;
níl an dara cóip den fhoirm aige a thuilleadh. Nascann Soláthraithe Meán freisin sreafaí oibre
Íomhá-go-Téacs agus Urlabhra-go-Téacs leis na cluaisíní Modality Bridge comhfhreagracha
gan an clós súgartha Urlabhra-go-Téacs atá ann cheana a bhaint.

**Seachbhóthar iontrála féin-lúibe:** nuair a dhéanann an glao tuairisce bealach trí
féin-lúb `/v1` OmniRoute (samhail soláthraí neamhchaighdeánach), seolann an fo-iarratas
`x-omniroute-admission-bypass: internal` agus déantar é a fhíordheimhniú leis an dintiúr
féin-lúibe réitithe — an sentineal áitiúil `sk_omniroute` i mód áitiúil, nó an eochair
comhshaoil `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` atá cumraithe ag an oibreoir (#1350)
ionas gur féidir le himscaradh `REQUIRE_API_KEY=true` an glao tuairisce a rith fós.
Ní onóirítear an seachbhóthar ach amháin do na dintiúirí cruinne sin, mar sin ní féidir
le cliaint sheachtracha an ceanntásc a úsáid chun iontráil a scipeáil.

Tá réamhshocruithe oidhreachta i `src/shared/constants/visionBridgeDefaults.ts`;
tá na réamhshocruithe nua mód/feasach ar thascanna/taiscthe agus an réiteoir socruithe
i `src/shared/constants/modalityBridgeDefaults.ts`. Nochtann an ráille cosanta rogha
tógálaí `deps` ionas gur féidir le tástálacha feidhmiúcháin bréige `getSettings` agus
`callVisionModel` a instealladh.

### Droichead Fuaime (`audioBridge.ts`) — Modality Bridge PR-3

Idircheapann sé iarratais comhrá a bhfuil fuaim iontu sula sroicheann siad sprioc nach
bhfuil ar eolas go nglacann sí le hionchur fuaime. Ní athródóidh sé an t-iarratas comhrá
riamh: déantar páirteanna fuaime a thrascríobh tríd an bpointe deiridh ilpháirteach
atá comhoiriúnach le OpenAI atá ann cheana agus leanann an tsamhail comhrá roghnaithe
le tras-scríbhinní téacs.

Sreabhadh:

1. Réitigh `supportsAudio` trí `getResolvedModelCapabilities()`. Buaileann meiteashonraí
   clárlainne soláthraí soiléire, ansin meiteashonraí samhla statacha, ansin `modalities_input`
   sioncronaithe. Is `false` é liosta ionchuir dearbhaithe gan `audio`; fanann aon fhianaise
   cumais `null`. Gníomhaíonn `false` agus `null` an droichead coimeádach, agus seachbhóthar
   `true` é.
2. Réitigh socruithe `modalityBridgeAudio*` agus eastósc páirteanna fuaime barrleibhéil
   inbhainte as gach teachtaireacht tríd an bhrathadóir roinnte `detectMediaParts()`.
   Is iad na cruthanna sreinge tacaithe ná OpenAI `input_audio`, `audio_url`, agus
   `source.media_type: "audio/*"`. Brathann fuaim neadaithe le haghaidh ródú ach ní bhaintear
   í leis an gcosán splice. Tá an obair teoranta ag `modalityBridgeAudioMaxClips`; fanann
   páirteanna níos déanaí gan teagmháil.
3. Onóir `provider/model` cumraithe, nó lig do `selectAudioBridgeModel()` siúl trí
   `AUDIO_TRANSCRIPTION_PROVIDERS` in ord catalóige cobhsaí agus roghnaigh an chéad
   samhail le dintiúr soláthraí gníomhach inúsáidte.
4. Tiontaíonn `callAudioTranscription()` fuaim base64/data-URI go `file` ilpháirteach,
   nó íoslódálann sé `audio_url` iargúlta tríd an gcosaint amach poiblí-amháin le bioránú
   DNS agus teorainn 25 MB. Ansin POSTálann sé an comhad agus an tsamhail roghnaithe
   chuig an bhféin-lúb áitiúil `/v1/audio/transcriptions`, fíordheimhnithe le
   `resolveSelfLoopBearer()`. Déanann an bealach tras-scríbhneoireachta atá ann cheana
   gnáthchuardach dintiúir, láimhseáil fuaraithe/ráta-teorann, agus seoladh soláthraí.
5. Cuireann glaonna rathúla a gcuid páirteanna in ionad `[Audio N]: <transcript>`.
   Ritheann glaonna le `Promise.allSettled`: caomhnaíonn teip aonair an chuid fuaime
   bhunaidh sin (conradh #4012). Má theipeann ar gach glao agus má tá sé cruthaithe
   go bhfuil an sprioc `supportsAudio === false`, is iad na páirteanna
   `[Audio N]: (unavailable — no STT provider connected)` (conradh #8430). Maidir
   le sprioc anaithnid (`null`), fanann toradh uile-theipe gan teagmháil. Faigheann
   sprioc téacs-amháin cruthaithe gan dintiúr STT inúsáidte an stub soiléir céanna
   gan glao líonra a eisiúint.

Úsáideann tras-scríbhinní rathúla an taisce LRU/TTL Modality Bridge ar fud an phróisis.
Comhcheanglaíonn an eochair an tagairt fuaime, an lipéad oibríochta cobhsaí
`audio-transcription`, agus an tsamhail STT roghnaithe; ní dhéantar teipeanna a thaisceadh
riamh. Nuashonraíonn iarrachtaí fuaime na cuntair roinnte `bridged`, `cacheHits`,
`failures`, agus `lastUsedAt`. Iompraíonn freagraí claochlaithe
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; ní fhaigheann
iarratais gan teagmháil deighleog Droichead Fuaime.

Tá socruithe reatha bunaithe ar DB agus bailíochtaithe ag Zod:

| Eochair                       | Réamhshocrú | Raon           |
| ----------------------------- | ----------- | -------------- |
| `modalityBridgeAudioEnabled`  | `true`      | —              |
| `modalityBridgeAudioModel`    | `""`        | Auto nó STT ID |
| `modalityBridgeAudioTimeout`  | `60000`     | 1000–300000    |
| `modalityBridgeAudioMaxClips` | `3`         | 1–10           |

Fanann an taisce roinnte á rialú ag `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, agus `modalityBridgeCacheMaxEntries`.

### Droichead Físeáin (`videoBridge.ts`, `videoBridgePipeline.ts`)

Idircheapann sé páirteanna físeáin barrleibhéil i `messages` Comhlánaithe Comhrá agus Freagraí API `input` sula ndéantar glaoch ar sprioc gan tacaíocht físeáin dhúchasach aitheanta.
Is iad na cruthanna tacaithe ná `input_video`, `video_url`, `video_source`, URLanna HTTPS,
agus URIanna sonraí `data:video/*;base64,...`. Ní dhéantar caitheamh ar ainmneacha comhaid shimplí i dtéacs mar fhíseán.

Is le `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) an trasnú iarratais, an
seiceáil cumais/beartais, comhiomlánú in aghaidh an iarratais, agus an t-ualach pá freagartha.
Tá an obair in aghaidh an fhíseáin — fáil, an taisce iomlán-toraidh, seicheamh fráma a thuairisciú
(a chumascann aon trascríbhinn fuaime a dhearbhaigh an glaoiteoir), agus méadrachtaí/cur isteach/glanadh in aghaidh an iarrachta —
i bhfolach taobh thiar de `processVideoPart` i
`videoBridgePipeline.ts`, ar a dtugtar uair amháin in aghaidh na páirte físeáin laistigh de lúb `preCall`.
Sainmhíníonn an modúl sin freisin na teorainneacha calafoirt sainráite `VideoMediaBrokerPort`
(ag fáil beart agus ag eastóscadh frámaí sampláilte), `VideoAudioTranscriptionPort`
(ag cumasc trascríbhinn fuaime a dhearbhaigh an glaoiteoir leis na fotheidil sampláilte), agus
`VideoDrilldownPort` (an teorainn buanseasmhachta druileála síos fráma; nach bhfuil sreangaithe isteach
i `processVideoPart` fós — ní scríobhann ach an bealach ar leith `/api/modality-bridge/video/drilldown`
iontrálacha druileála síos inniu).

Ní allmhairíonn ná ní ghlaonn an cosán iarratais poiblí `/v1` fo-phróiseas riamh. Déantar físeáin iargúlta a íoslódáil faoi theorainn 50 MiB;
tá caipín 36 MiB díchódaithe in aghaidh an fhíseáin ag físeáin inlíne base64 ionas gur féidir leis an gclúdach
samhail/teachtaireachtaí/frámaíochta fanacht laistigh de theorainn iontrála iarratais JSON poiblí de 50 MiB.
Déantar seiceáil ar mheastacháin fad inlíne agus méid díchódaithe sula ndéantar leithdháileadh.
Éilítear HTTPS ar an URL iargúlta tosaigh agus ar gach atreorú, ag úsáid an gharda amach poiblí-amháin atá ann cheana féin le biorú DNS.
Ansin trasnaíonn na bearta an teorainn bróicéir inmheánach cruinn `POST /api/modality-bridge/video/extract`.
Tá an bealach sin `LOCAL_ONLY` agus `SPAWN_CAPABLE` araon, ní ghlacann sé ach le hiarratas fíordheimhnithe,
iontaofa-lúbthachta in aghaidh an phróisis, agus ní ghlacann sé URL, cosán córais comhad, inrite,
ná liosta argóintí riamh. Cuireann píblíne méid coirp an API agus léitheoir coirp incriminteach an láimhseálaí
caipín ionchuir bróicéir 50 MiB i bhfeidhm go neamhspleách. Ritheann a scuaine teoranta eastóscadh amháin ag an am,
ceadaíonn sé ceithre phost ar feitheamh, agus cuireann sé caipín ar ionchur ar feitheamh ag 100 MiB.

Laistigh den bhróicéir, léann `ffprobe` comhad príobháideach áitiúil; eisiatar formáidí seinmliosta agus forléirithe ón liosta ceadaithe formáide seasta.
I gcás coimeádáin cheadaithe den teaghlach MOV, fanann tagairtí sonraí MOV seachtracha díchumasaithe de réir réamhshocraithe, agus ní roghnaíonn an t-ordú seasta iad.
Úsáideann `ffprobe` agus `ffmpeg` araon an liosta bán prótacail `file`-amháin, snáithe amháin, eagair argóintí seasta, gan bhlaosc,
agus inriteáin réitithe ó `PATH`. Ní iarrthóirí inimeartha iad sruthanna clúdaigh pictiúr ceangailte.
Ní mór do gach sruth inimeartha na teorainneacha a shásamh, agus is fearr sruth réamhshocraithe sainráite roimh an titim siar innéacs is ísle cinntitheach.
Tá físeáin teoranta do 600 soicind, 8,192 picteilín in aghaidh an toise, agus 33,554,432 picteilín foinse.
Samplaíonn FFmpeg 1–16 fráma JPEG lárphointe, laghdaíonn sé an imeall fada go dtí 1,024 picteilín ar a mhéad gan ionchuir níos lú a uasghrádú,
agus ní fhaigheann sé URL riamh. Is é `uniform` an sampláil de réir réamhshocraithe.
Déanann na beartais roghnacha `scene_aware` agus turgnamhacha `segment_aware` pas FFmpeg seasta breise amháin
thar an sruth áitiúil atá bailíochtaithe cheana féin, roghnaíonn siad stampaí ama radhairc `showinfo` teoranta,
agus titeann siad siar go cinntitheach chuig na lárphointí aonfhoirmeacha céanna ar theip braiteora, teorainn ama, aschur mífhoirmithe, nó tacar iarrthóirí folamh.
Leithdháileann modh feasach ar dheighleog samplaí lárphointe go comhréireach leis na eatraimh radhairc bhailíochtaithe;
déantar mionsonraí ar fhianaise feasach ar dheighleog agus ar iompar titim siar thíos.
Cuirtear an caipín crua 16-fhráma i bhfeidhm tar éis roghnú i ngach beartas.
Nuair nach bhfuil ach buiséad aon-fhráma ag iarratas feasach ar radharc, úsáideann sé lárphointe aonfhoirmeach na fuinneoige gníomhaí lán-fhíseáin nó fócas,
agus tuairiscíonn sé `policyEffective: uniform`: ní féidir le fráma radhairc aonair roghnaithe an dá cheann ama a chaomhnú.
Féadfaidh glaoiteoir fuinneog fócas teoranta (`start`/`end` soicind) a sholáthar go roghnach;
déantar teorainneacha a ghreamú le fad na meán, diúltaítear d'fhuinneoga droim ar ais nó neamh-theoranta,
agus déantar gach beartas samplála laistigh den eatramh normalaithe amháin.
Cuirtear an fhuinneog mar thoradh air sin san áireamh i meiteashonraí samplála agus san réimír tuairisce neamhiontaofa
ionas gur féidir le samhlacha sruthlínte sliocht dírithe a idirdhealú ón amlíne iomlán.

Is socrú ar leith, sainráite é fócas fotheideal seimeantach. Caomhnaíonn an modh anailíse réamhshocraithe `full` an pras fráma atá ann cheana féin agus ní chuireann sé téacs iarratais ar aghaidh chuig an tsamhail fotheideal riamh.
I mód `focused`, ní léann an droichead ach an `text`/`input_text` is déanaí neamh-fholamh a scríobh an t-úsáideoir ón gcoimeádán Comhrá nó Freagraí céanna,
déanann sé é a normalú go NFC, déanann sé carachtair rialaithe agus spás bán a chomhbhrú,
agus cuireann sé teorainn leis go 500 pointe cóid Unicode. Titeann toradh folamh siar chuig an bpras `full` cruinn.
Déantar leid inúsáidte a shraithú mar JSON i mbloc tiomnaithe comhthéacs úsáideora neamhiontaofa
agus ní fhéadfaidh sé ach sonraí inbhraite a thosaíocht; ní féidir leis an rabhadh ar leith a shárú
i gcoinne treoracha a leanúint atá le feiceáil nó inchloiste sna meáin. Ní dhéanann fócas téacsúil `start`/`end` a bhaint amach riamh ná ní athraíonn sé an samplóir ama.

#### Fianaise struchtúrach deighleog FU-07

Úsáideann `segment_aware` pas réamh-anailíse teoranta amháin thar an sruth físeáin áitiúil atá bailíochtaithe cheana féin.
Déanann an slabhra scagaire seasta scálú ar dtús go dtí 320 picteilín ar leithead ar a mhéad,
braiteann sé athruithe radhairc agus eatraimh reoite, ansin samplaí ag 1 fráma in aghaidh an tsoicind le haghaidh doiléire,
luma meánach, agus faisnéis spásúil/ama. Tá an pas teoranta do 600 sampla struchtúrach,
snáithe FFmpeg/scagaire amháin, an prótacal `file`-amháin céanna agus liostaí ceadaithe coimeádáin,
teorainn aschuir próisis 1 MiB, agus 30 soicind ar a mhéad laistigh de theorainn ama/cur isteach roinnte an bhróicéir.
Ní ghlacann sé ordú, scagaire, cosán, nó URL ón iarratas riamh.

Is fianaise samplála chinntitheach iad na luachanna struchtúracha, ní tuiscint fhíseáin shéimeantach. Ní dhéanann siad ábhair, gníomhartha, fotheidil, urlabhra, ná intinn úsáideora a bhaint amach. Cruthaíonn teorainneacha radharcanna agus reoiteacha deighleoga; ní dhéanann clúdach reoite, doiléire, nochtadh, mionsonraí spásúla, agus athrú ama ach tionchar ar an gcaoi a leithdháiltear an buiséad fráma 1–16 atá ann cheana féin. Tá deighleog atá reoite go hiomlán teoranta d'aon fhráma amháin, agus bíonn deighleoga neamhreoite san iomaíocht don bhuiséad atá fágtha. Nuair a bhíonn níos mó teorainneacha ná frámaí ann, coinnítear clúdach aonfhoirmeach amlíne ionas nach féidir le gearrthóga luatha tapa deighleog fhada a cheilt. Déantar teorainneacha radharcanna laistigh de réiteach anailíse 1-soicind de theorainn reoite a chomhleá.

Teipeann ar scagairí in easnamh, fianaise mhícheart/fholamh, earráid bhrathadóra, nó an t-am teoranta réamh-anailíse oscailt don bheartas lárphointe aonfhoirmeach cruinn. Ní theipeann ar thréigean glaoiteora nó spriocdháta bróicéir oscailt: cuireann sé deireadh leis an bhfo-phróiseas atá ar siúl, cuireann sé cosc ar eastóscadh fráma níos déanaí, agus baintear an crann sealadach príobháideach i `finally`.

Gineann `scripts/perf/video-bridge-fu07-eval.ts` daingneáin FFmpeg réadacha chinntitheacha le haghaidh coigilteas iar-dhúblála fotheideal-ghlao, leithdháileadh buiséid gluaiseachta dlúithe, fianaise doiléire/nochtadh/SI-TI, gearrthóga tapa le heireaball fada, agus dearfacha bréagacha céimnithe de réir a chéile. Taifeadann sé am balla réamh-anailíse agus, nuair a bhíonn `/usr/bin/time` ar fáil, LAP linbh agus RSS buaicphointe. Níl a sheiceálacha cáilíochta ach oracail struchtúracha. Fanann cáilíocht mhúnla fotheideal réadach `HOLD` toisc nach bhfuil aon phointe deiridh údaraithe nó breitheamh reoite ag an úim seo. Fanann coigilteas airgeadaíochta `HOLD` freisin mura soláthraíonn `--caption-cost-per-call-usd` meastachán sonrach dearfach in aghaidh an ghlao; ní dhéanann an script ceachtar toradh a bhrionnú riamh.

Tá gach fráma teoranta do 4 MiB, na frámaí amh go léir le chéile do 23 MiB, agus an freagra bróicéir sraitheach do 32 MiB. Baintear eolaire sealadach príobháideach i `finally`. Ní chuimsíonn OmniRoute FFmpeg agus ní ghlacann sé le cosán inrite saincheaptha. Roimh fhotheidealú, cuireann an droichead pas dí-dhúblála amhairc coimeádach i bhfeidhm: laghdaítear gach JPEG go maolán liathscála 16×16 agus déantar é a chur i gcomparáid leis an bhfráma deireanach a coinníodh amháin. Le haghaidh buiséad fotheideal iarrtha os cionn aon fhráma amháin, soláthraíonn eastóscadh linn iarrthóirí teoranta suas le dhá oiread an bhuiséid sin agus ní níos mó ná 16 fráma riamh. Ní chuirtear an caipín iarrtha i bhfeidhm ach amháin tar éis dí-dhúblála, leis an gcéad iarrthóir agus an t-iarrthóir deireanach roghnaithe á gcoinneáil le linn tanú deiridh nuair a bhíonn an buiséad dhá cheann ar a laghad. Úsáideann an beartas leaganaithe `grayscale-16x16-mean-cells-v2` an ceann is mó de dhifríocht luma meánach agus cóimheas na gceall mionsamhlacha a bhfuil a ndifríocht normalaithe 0.05 ar a laghad. Is é an tairseach dúblach an tairiseach 0.04, a roghnaíodh le haghaidh intuarthachta seachas a bheith nochta mar shocrú ama rite. Coinníonn an comhartha tánaisteach ardchodarsnachta seo gluaiseacht bheag agus athruithe téacs infheicthe is féidir le comparáid meánach amháin a cheilt. Teipeann ar earráidí comparáideora nó díchódóra oscailt agus coinníonn siad clúdach. Scarann meiteashonraí aschuir iarrthóirí eastósctha, frámaí a úsáideadh go rathúil, agus dúbailtí amhairc a scaoileadh.

Féadfaidh cuid físeáin atá marcáilte go sainráite bileog teagmhála stampáilte ama a iarraidh. Tógann an droichead greille JPEG 4-cholún, 16-fhráma ar a mhéad. Dóitear a stampa ama foinseach i mbanda bun ardchodarsnachta i ngach cill 512-picteilín, agus fanann na stampaí ama céanna i meiteashonraí téacsúla le haghaidh comhlachais agus iniúchta iartheachtacha. Fanann an JPEG iomlán teoranta do 32 MiB. Mura féidir le `sharp` an greille a dhíchódú nó a chumadh, téann an droichead ar ais chuig na frámaí JPEG aonair; leanann tréigean cliant ag scaipeadh tríd an oibríocht bileoige.

Tá fianaise cur chun cinn scartha d'aon ghnó ón micrea-bhunmharc cumadóireachta sintéiseach. Sainmhíníonn `scripts/perf/video-bridge-contact-sheet-eval.ts` úim A/B leaganaithe scéime do mhúnlaí fís-chomhoiriúnacha OpenAI réadacha. Tomhaiseann sé comharthaí a thuairiscíonn an soláthraí, moill balla ó cheann ceann (lena n-áirítear cumadóireacht bileoige), líon glaonna múnla, agus coinneáil fíricí sainithe ag an léiriú. Ní scríobhtar freagraí amh múnla chuig an tuarascáil; ní choinnítear ach díleáite SHA-256 agus aitheantóirí fíricí meaitseáilte. Ní dhéanann an úim aon ghlao líonra nó múnla íoctha mura gcuirtear `--execute-real` ar aghaidh agus má tá `--model`, `OMNIROUTE_BASE_URL`, agus `OMNIROUTE_API_KEY` cumraithe. Gan an rith réadach sainráite sin, fanann a bhreithiúnas inléite ag meaisín `HOLD`; ní fianaise cur chun cinn iad tomhais ualaigh pá/líon glaonna sintéiseacha amháin.

Féadfaidh glaoiteoirí eagar roghnach `transcript.cues` a cheangal le cuid físeáin tacaithe nuair a bhíonn téacs ailínithe acu cheana féin. Ní mór do gach leid `text`, eatramh críochta `start`/`end` laistigh den ré fhiosraithe, agus `source` ar an liosta bán (`client`, `embedded`, nó `audio-bridge`) a iompar; is é `1` an réamhshocrú `confidence` agus ní mór dó fanacht idir `0` agus `1`. Déantar leideanna dúblacha cruinne a chomhbhrú. Ní thosaíonn OmniRoute trascríobh ón meiteashonraí seo riamh: déantar leideanna bailíochtaithe a chóipeáil isteach sa toradh tuairiscithe le foinse, muinín, agus eatramh, agus déantar iad a rindreáil mar bhreathnuithe neamhiontaofa in éineacht leis na fotheidil fráma. Diúltaítear téacs neamhbhailí, as raon, nó gan foinse seachas é a mheascadh isteach sa sruth fotheideal. Tá an réimse `source` dearbhaithe ag an nglaoiteoir faoi láthair, ní fíoraithe ag an bhfreastalaí: forfheidhmíonn OmniRoute go bhfuil an luach ar cheann de na trí shreang cheadaithe, ach ní dhearbhaíonn sé go cripteagrafach fós gur tháinig lipéad `embedded` nó `audio-bridge` ó eastóscadh atá faoi úinéireacht an fhreastalaí. Déan caitheamh le `source` mar leid neamhiontaofa go dtí go dtiocfaidh an fíorú sin; ná tóg cinntí údaraithe air.

Féadfaidh glaoiteoir ardleibhéil rian `audioTranscript` atá údaraithe cheana féin a sholáthar don fhíseán céanna. Ritheann an t-uaim comhleá breathnuithe amhairc agus fuaime faoi aon spriocdháta amháin agus comhartha scoir, ordaíonn sé iad ar amlíne choiteann, titeann sé dúblaigh chruinne, agus tuairiscíonn sé toradh páirteach nuair nach n-éiríonn ach le taobh amháin. Díghrádaíonn `audioTranscript` neamhbhailí go dtí an toradh páirteach sin — coimeádtar an cur síos amhairc agus taifeadann an brainse fuaime cód teipe sláintithe — in ionad an físeán iomlán a theipeadh. Caomhnaítear infhaighteacht in aghaidh an bhrainse, an bhratach pháirteach, agus na cóid teipe sláintithe sa toradh a thuairiscítear, sna meiteashonraí cosanta (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), sna meiteashonraí taisce toraidh, agus sna cuntair comhleá droichid. Ní ghlaonn an cosán réamhshocraithe Video Bridge téacs-go-hurlabhra ná ní íoslódálann sé an dara cóip meán; gan an rian sainráite sin, fanann sé físeán-amháin.

**Coinneáil tras-scríbhinne (#12150 P1).** Cuirtear é seo i bhfeidhm go huathoibríoch aon uair a dhéanann an Video Bridge (rogha isteach ann féin) leid tras-scríbhinne a rindreáil — níl aon bhratach coinneála ar leith ann. Nuair a dhéanann iarratas aon leid tras-scríbhinne a rindreáil (tras-scríbhinn `transcript` dearbhaithe ag an nglaoiteoir nó `audioTranscript` comhleáite), marcálann an cosantóir é `videoBridgeObserved` agus táirgeann sé scáth deargtha den chur síos físeáin — rindreáil chomhionann ina n-ionadaítear corp saor-théacs gach leid le `[redacted-video-transcript]`, tógtha trí réimse struchtúrtha an leid a chur in ionad sula gcuirtear an teaghrán le chéile (ní trí an téacs comhréidh a pharsáil riamh, mar sin ní féidir le haon ábhar leid — naimhdeach nó gnáth, lena n-áirítear coirp ina bhfuil `]` mar `[inaudible]`/`[music]` — maireachtáil). Malartaíonn corp iarratais an logála glaonna buana gach cuid téacs díorthaithe ó fhíseán don scáth deargtha sin, meaitseáilte le comhionannas ábhair; athléitear an t-ancaire `fullText` ón ualach pálasta réamhghlao críochnaithe, ionas go n-éireoidh leis an meaitseáil fós tar éis do chosantóirí slabhra níos déanaí (na maisceoirí PII agus dintiúir, tosaíochtaí 10/95) an téacs cur síos a athscríobh in áit agus tar éis d'instealladh córais-pras/aistrithe/cuimhne an t-eagar teachtaireachta a athmhúnlú. Níl an corp a sheoltar suas chuig an tsamhail gan athrú. Ní líonann iarratas breathnaithe aon Chuimhne buan (déantar neamhaird ar eastóscadh díorthaithe ó iarratas agus ó fhreagra), ionas nach féidir le freagra an tsamhail féin téacs tras-scríbhinne a athshondas isteach sa Chuimhne.

Úsáideann cóipeanna breise coinnithe an comhartha iarratais breathnaithe céanna. Cuireann an léargas amh ar iarratas an chliaint réamh-chosanta, an t-iarratas ar feitheamh sa chuimhne, agus an logáil iarratais luath-dhiúltaithe réimsí tras-scríbhinne in ionad go struchtúrach i gcodanna físeáin; déantar prasanna teaghráin a shintéisiú ag céimeanna píblíne agus aistriú comhthéacs a dheargadh ag an doirteal coirp iarratais buana. Déanann an marc `video_content_removed` buana go dteipeann ar leanúint `previous_response_id` dúnta in ionad téacs a atógáil a caitheadh amach d'aon ghnó. Má chailleann iarratas breathnaithe a scáth deargtha in aghaidh an chuid sula ndéantar logáil, nó má theipeann ar fiú ceann amháin de roinnt scáth físeáin a mheaitseáil tar éis athruithe iarratais níos déanaí, déantar an corp iarratais coinnithe a fhágáil ar lár go hiomlán in ionad tras-scríbhinn pháirteach deargtha a choinneáil.

I gcás iarratais breathnaithe, d'fhéadfadh freagra samhail aon chuid den tras-scríbhinn a lua gan teorainn struchtúrtha leid. Dá bhrí sin, cuirtear marc fágála in ionad a `responseBody` logála glaonna buana; ní choinnítear an t-earra píblíne mionsonraithe (a fhéadfaidh coirp suas-srutha/cliaint agus smután srutha a áireamh). Seachnaíonn taiscí séimeantacha, comhionannais, agus athsheinm réasúnaíochta léamha agus scríbhinní don iarratas sin. Fanann an t-iarratas soláthraí agus an freagra infheicthe don chliant gan athrú. Déantar bearta luatha coinneála a dhraenáil ón maolán sealadach nuair a fhágtar an t-earra mionsonraithe ar lár. Ní thuairiscíonn rabhadh EventStream mífhoirmithe Kiro ach líon na mbeart pálasta, ní a ábhar ná earráid amh an pharsálaí JSON.
Ní éilíonn sé seo go ndearnadh iniúchadh ar gach diagnóisic soláthraí/breiseán neamhghaolmhar; déantar an scuab doirteal coinnithe níos leithne a rianú i #11658.

Is foshraith taisce ar leith, lúb-ar-ais/fíordheimhnithe le comhartha é saolré inmheánach `/api/modality-bridge/video/drilldown`. Éilíonn gach oibríocht freisin ID príomhaí teimhneach canónach. Sula gcumasaítear glaoiteoir táirgeachta, ní mór dó an ID sin a dhíorthú ón tionónta fíordheimhnithe agus ní mór dó luach roghnaithe ag an gcliant a chur ar aghaidh riamh. Ceanglaíonn eochracha taisce an príomhaí sin le IDanna seisiúin agus tagartha físeáin canónacha, ní stórálann siad ach a n-eochracha díorthaithe SHA-256, agus cuireann siad léamha agus scriosadh araon faoi raon feidhme an phríomhaí chéanna. Stórálann an taisce 16 fráma JPEG díorthaithe ar a mhéad in aghaidh an iontrála, cuireann sé in éag iad tar éis deich nóiméad, agus tacaíonn sé le léamha teoranta `start`/`end` nó scriosadh seisiúin sainráite.

Tá gach príomhaí teoranta do 16 iontráil agus 64 MiB de shonraí JPEG canónacha. Tá na teorainneacha sin neamhspleách ar an uasteorainn dhomhanda 64-iontráil/256 MiB: ní dhéanann brú cuóta príomhaí ach iontrálacha is lú a úsáideadh ag an bpríomhaí sin a dhíbirt sula gcuirtear san áireamh díbirt LRU domhanda. Déantar iontrálacha atá imithe in éag a scuabadh ó chuntasaíocht phríomhaí agus dhomhanda ar ghníomhaíocht taisce, cé nach gcuireann cealú agus teip bailíochtaithe athsholáthar páirteach i gcrích.

Diúltaíonn an taisce Base64 neamh-chanónach, stuáil bhreise, meáin neamh-JPEG, JPEGs mífhoirmithe nó ciorraithe, agus JPEGs a tháirgeann rabhadh le linn díchódú `sharp` íomhá iomlán teoranta. Ath-ionchódaíonn sé gach íomhá a nglactar léi mar JPEG canónach, díorthaíonn sé leithead agus airde ó na bearta díchódaithe in ionad réimsí an ghlaoiteora a iontaobhas, agus caitheann sé amach aon bhearta polyglot iarmharacha in ionad iad a choinneáil. Ní ghearrtar ach an maolán comhbhrúite canónach teoranta ar an dá chuóta. Áirítear le teorainn sreinge JSON forchostas Base64 don uasteorainn ionchuir díchódaithe 32 MiB. Taifeadann gach díorthú stóráilte a fhormáid/réiteach JPEG bailíochtaithe, a bheartas samplála, a leagan díorthaithe, a am cruthaithe, a hash ábhair ríomhaire-ríofa, agus a thagairt tuismitheora hasháilte móide hash ábhair tuismitheora an ghlaoiteora iontaofa. Déantar cealú a sheiceáil idir céimeanna díchódaithe/hash neamhshiméadracha sula ndéantar an tiomantas taisce adamhach.

Ní nascann an tráinse seo táirgeoir táirgeachta leis an ród go fóill agus ní sholáthraíonn sé roghnú malairtí iltaifigh. Mar sin, ní bhíonn aon obair bhreise i gceist le conair iarratais an Droichid Físe thrédhearcaigh, agus fanann díorthú príomhpháirtí atá ceangailte le tionónta agus saolré iomlán iltaifigh FU-08 mar obair leantach shoiléir seachas a bheith doiciméadaithe mar iompar críochnaithe.

Cuirtear fotheidil ar fhrámaí go seicheamhach leis an tsamhail Video chumraithe. Faigheann socrú Video folamh oidhreacht ó shocrú Vision; má tá an dá cheann folamh, roghnaíonn uath-ródaire Vision an tsamhail éifeachtach atá in ann fís a láimhseáil. In ionad na mbunpháirteanna, cuireann fotheidil rathúla réimír sheasmhach `[Video description:` isteach a mharcálann an téacs freisin mar bhreathnóireacht neamhiontaofa a dhíorthaítear ó mheáin agus a deir le samhlacha iartheachtacha gan treoracha a fhaightear sna meáin a leanúint. Áirítear bearta JPEG, an phras, an stampa ama, agus an tsamhail éifeachtach i n-eochracha taisce na bhfotheideal fráma; ní dhéantar ach fotheidil rathúla a thaisceadh. Coinníonn iontrálacha taisce an tsamhail táirgeora rathúil iarbhír, lena n-áirítear samhail chúltaca; tuairiscíonn an droichead `mixed` nuair a tháirg samhlacha difriúla frámaí difriúla. Athúsáideann amas taisce céannacht an táirgeora sin in ionad é a athlipéadú mar an plean ródaithe iarrtha. Tá taisce thoradh an fhíseáin iomláin bunaithe ar gach ionchur a athraíonn an t-aschur — pras, samhail éifeachtach, polasaí samplála, líon na bhfrámaí, mód anailíse seimeantaí, méarlorg SHA-256 na leide fócais normalaithe, fuinneog fócais, `transcript`, `audioTranscript`, agus an bhratach contact-sheet — mar sin is cliseadh taisce é aon cheann de na toisí sin a athrú, ní athúsáid as dáta é choíche. Tá leagan an pholasaí dídhúblála amhairc, an tairseach, agus an líon teoranta de fhrámaí iarrthóra soiléir freisin in eochair thaisce an toraidh agus sna meiteashonraí; dá bhrí sin, ní féidir le hathrú polasaí cur síos físeáin iomláin atá as dáta a athúsáid. Coinníonn meiteashonraí v4 de thaisce an toraidh an mód agus an méarlorg, ní choinníonn siad tasc amh an úsáideora choíche. Tuairiscíonn meiteashonraí an ráille cosanta na móid anailíse iarrtha agus éifeachtacha araon; tuairiscítear mód `focused` iarrtha gan téacs úsáideora inúsáidte mar `full` go héifeachtach.

Eastasctar gach cuid físe tacaithe ag an ráille cosanta ach ní chuirtear síos ar níos mó ná `modalityBridgeVideoMaxVideos`. I gcás sprice a bhfuil sé cruthaithe ina leith go bhfuil `supportsVideo === false`, déantar marcóirí téacs sábháilte soiléire de fhíseáin ar theip orthu nó atá thar an teorainn ionas nach mairfidh aon fhíseán amh. Nuair nach bhfuil an cumas ar eolas, fanann na páirteanna sin gan teagmháil. Seachnaíonn spriocanna a bhfuil `supportsVideo === true` acu an droichead. Forleathnaíonn comhartha anghairmthe iarratas an chliaint trí íoslódáil, scuaine an bhróicéara, fochórais, agus glaonna fotheidil; stopann anghairmthe idir físeáin agus ní theipeann orthu go deo i dtreo meáin amha.

Tá socruithe am rith tacaithe ag bunachar sonraí agus bailíochtaithe ag Zod:

| Eochair                             | Réamhshocrú | Raon / iompar                                                                                                                   |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Am rith roghnach, rogha an diúchta                                                                                              |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | caomhnaíonn `full` fotheidil ghinearálta; úsáideann `focused` comhthéacs an úsáideora is déanaí atá teoranta agus neamhiontaofa |
| `modalityBridgeVideoModel`          | `""`        | Oidhreacht ó shamhail an Droichid Vision                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                            |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, nó `segment_aware` comhréireach; titeann teip an bhrathadóra siar ar `uniform`                        |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                             |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                                  |

Déantar luachanna timeout Video seasmhacha le hoidhreacht atá os cionn 120 soicind a theanntú go dtí spriocdháta an bhróicéara; diúltaítear do scríobh socruithe nua os cionn na teorann sin. Teastaíonn áitiúlacht lúb ar ais stampáilte iontaofa ó `GET /api/modality-bridge/video/runtime` roimh fhíordheimhniú nó sula ndéantar iniúchadh ar an am rith, ansin teastaíonn fíordheimhniú bainistíochta. Ní sheolann sé ar ais ach `available`, leaganacha FFmpeg/ffprobe glanta, agus cúis sheasmhach nuair nach bhfuil an t-am rith ar fáil. Ní API uaslódála poiblí é an críochphointe eastósctha inmheánach: seolann sáithiú scuaine `503` móide `Retry-After` ar ais, seolann dínascadh glaoiteora `499` ar ais, agus seolann spriocdháta seasmhach an bhróicéara `504` ar ais. Cuireann freagraí tiontaithe `video->text;model=<visionModel>;parts=<videos>` leis an gceanntásc lárnach `x-omniroute-modality-bridge` gan deighleoga Vision nó Audio a bhaint.

### Mascóir PII (`piiMasker.ts`)

Ritheann sé ar an **dá** chéim.

- **`preCall`**: déanann sé an t-ualach pálasta a chlónáil, siúlann sé trí `system`, `messages`, `input`, agus `prompt` (lena n-áirítear míreanna teaghráin shimplí), agus cuireann sé `processPII()` (ó `@/shared/utils/inputSanitizer`) i bhfeidhm ar réimsí teaghráin `content`/`text`. Nuair atá `PII_REDACTION_ENABLED=true`, déantar PII braite a dheascadh san ualach pálasta amach. Tá sé seo neamhspleách ar `INPUT_SANITIZER_MODE` (nach rialaíonn ach polasaí insteallta pras). Nuair atá deascadh múchta, déanann an glao taifead ar líon na mbraith gan an t-ábhar a athscríobh.
- **`postCall`**: déanann sé an freagra a dhomhain-chlónáil, ritheann sé `sanitizePIIResponse()` móide mascóir cruth Responses-API (`maskResponsesOutput` — clúdaíonn sé `output_text` agus `output[].content[].text`). Má tharlaíonn aon deascadh, tagann an freagra modhnaithe in áit an bhunfhreagra.

Ní bhlocálann an ráille cosanta choíche; ní dhéanann sé ach anótáil (`meta.detections`, `meta.redacted`) nó athscríobh.

### Instealladh Pras (`promptInjection.ts`)

Aithníonn sé struchtúir achrannacha in ábhar a sholáthraíonn an t-úsáideoir agus forfheidhmíonn sé an polasaí cumraithe. Tá an t-iompar á thiomáint ag athróga timpeallachta agus roghanna cruthaitheora:

| Socrú | Athróg comhshaoil | Réamhshocrú | Éifeacht

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Nuair is `false`, déanann an ráille cosanta ciorcad gearr.                                                                                                                                                       |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Polasaí insteallta: `block`, `warn`, nó `log`. (Glactar le `redact` le haghaidh comhoiriúnacht siar ach **ní** bhaineann sé téacs insteallta; rialaítear iarratas ar athscríobh PII le `PII_REDACTION_ENABLED`.) |
| Block threshold | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Íosmhéid déine a theastaíonn chun bac a chur. Níl an meán ach le breathnú air de réir réamhshocraithe.                                                                                                           |

**Tosaíocht mód** (`getMode`): `options.mode` an ghlaoiteora →
`INJECTION_GUARD_MODE` **sárú gné-bhratach DB** (Painéal → Socruithe →
Gné-Bhratacha) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Dá bhrí sin, buann sárú painéil ar na hathróga comhshaoil, mar sin rialaíonn an Chomhéadan Gné-Bratacha an garda reatha beo (gan atosaigh). Tá léamh an DB sábháilte ó theip: má tharlaíonn earráid, téann an garda ar ais chuig an iompar bunaithe ar env, agus nuair nach bhfuil aon sárú socraithe, tá an t-iompar comhionann le réiteach env-amháin.

Foinsí braite:

1. `sanitizeRequest()` ó `@/shared/utils/inputSanitizer` (sraith braiteoirí roinnte a úsáidtear in áiteanna eile sa phíblíne).
2. `DEFAULT_GUARD_PATTERNS` ionsuite (faoi láthair `system_override_inline` agus
   `markdown_system_block`, an dá cheann le déine `high`).
3. `customPatterns` roghnach a chuirtear ar aghaidh trí roghanna an tógálaí (teaghráin, regex,
   nó taifid `{ name, pattern, severity }`).

Nuair is `mode === "block"` **agus** go gcomhlíonann braite amháin ar a laghad an tairseach déine,
cuireann `preCall` ar ais `{ block: true, message: "Request rejected:
suspicious content detected" }`. I módanna `warn`/`log`, logálann an ráille cosanta ach
ceadaíonn sé an glao. Déantar an cúntóir roinnte `evaluatePromptInjection()` a easpórtáil freisin
do ghlaoiteoirí a dteastaíonn uathu leideanna a mheas gan dul tríd an gclárlann.

**Teorainn scanadh (v3.8.20):** ní dhéanann an braiteoir ach iniúchadh ar an **gcéad 16 KB** de
théacs leideanna comhcheangailte — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 beart) i
`src/shared/utils/inputSanitizer.ts`. Déanann `detectInjection()` agus
`evaluatePromptInjection()` araon `slice(0, MAX_INJECTION_SCAN_BYTES)` sula ritheann siad
an lúb patrún. Bíonn treoracha insteallta gar do bharr ionchuir, mar sin
cuireann sé seo teorainn le CPU/GC regex ar ualaí páidí il-céad-KB gan
braite a lagú (féach #3932, #4041).

### Mascóir Dintiúir (`credentialMasker.ts`)

Ritheann sé ar **an dá chéim**, an ceann deireanach sa slabhra réamhshocraithe (tosaíocht `95`). Déanann sé
patrúin eochair API / comhartha rúnda aitheanta a athdhéanamh ón ualach pá (ábhar teachtaireachta,
argóintí glao uirlisí, torthaí uirlisí) **agus** freagra an tsoláthraí, ionas nach
sceitear dintiúr a ghreamófar i leid (nó a athchóirítear le toradh uirlisí)
chuig an soláthraí in aghaidh an tsrutha nó ar ais chuig an gcliant.

- **Rogha isteach amháin**, an coinbhinsiún céanna le hathdhéanamh PII (Riail Chrua #20-in aice le):
  díchumasaithe mura bhfuil `settings.credentialRedactionEnabled === true` **nó**
  `CREDENTIAL_REDACTION_ENABLED=true`. Nuair a bhíonn sé as, ní dhéanann an ráille cosanta aon rud —
  ní chuireann sé bac riamh agus ní athscríobhann sé riamh.
- Siúlann `redactCredentials()` an crann iomlán ualach pá/freagra (`walkValue()`,
  sábháilte ó thruailliú fréamhshamhlacha, sábháilte ó thimthriall trí `WeakSet`) agus
  cuireann sé ionadaithe in áit na gcomhoiriún le sealbhóir áite `[REDACTED:<type>]`,
  ag clónáil na brainsí amháin a athraíodh i ndáiríre.
- Clúdaíonn `CREDENTIAL_PATTERNS` eochracha soláthraithe LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), comharthaí VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), eochracha íocaíochta (Stripe, Square),
  eochracha scamall (eochair rochtana AWS, Twilio, SendGrid, Mailgun), eochracha príobháideacha / JWTanna,
  teaghráin nasc a bhfuil dintiúir iontu (`mongodb://user:pass@...`, srl.), agus
  patrún cineálach luach ceanntásca `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Déantar eochracha i gcruth ceanntásca (`authorization`, `x-api-key`, `api-key`,
  `apikey`) a athdhéanamh go struchtúrach (luach amháin, réimír scéime mar
  `Bearer `/`Basic ` caomhnaithe) seachas trí regex téacs cineálach.
- Ní chuireann an ráille cosanta bac riamh; ní dhéanann sé ach athscríobh (`modifiedPayload` /
  `modifiedResponse`) agus anótáil (`meta.credentialsRedacted`, `meta.count`).

Garda cúlchéimnithe: `tests/unit/credential-masker-guardrail.test.ts`.

## Conradh Bunúsach (`base.ts`)

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Comharthaíonn garda-ráille "gan athrú" trí `void`, `{}`, nó `{ block: false }` a thabhairt ar ais. Má thugtar `modifiedPayload`/`modifiedResponse` ar ais, cuirtear an luach atá ag sreabhadh tríd an slabhra in ionad na ngarda-ráillí iartheachtacha. Iompraíonn `signal?: AbortSignal` saolré an ghlaoiteora isteach sna garda-ráillí. Is é cur isteach ar iarratas an eisceacht oscailte-teipe d'aon ghnó: stopann droichid meán obair agus glanann siad gan meáin amh a athchóiriú chuig sprioc nach eol dóibh tacú leis.

## Clárlann (`registry.ts`)

Nochtann an t-aonán `guardrailRegistry`:

- `register(guardrail)` — cuireann sé garda-ráille leis (nó cuireann sé ceann eile ina áit de réir ainm normalaithe) agus ath-shórtálann sé de réir `priority` ardaitheach.
- `clear()` / `list()` — cúntóirí riaracháin.
- `runPreCallHooks(payload, context)` — déanann sé athrá ar gharda-ráillí gníomhacha, snáitheann sé an t-ualach tríd an `modifiedPayload`, agus stopann sé ar an gcéad `block: true`.
- `runPostCallHooks(response, context)` — an sreabhadh céanna ar thaobh an fhreagra.
- `resetGuardrailsForTests({ registerDefaults })` — glanann sé an staid agus, go roghnach, athchláraíonn sé na réamhshocruithe le haghaidh aonrú tástála glan.

Tugann an dá reathaí `{ blocked, payload|response, results, guardrail?, message? }` ar ais, áit a bhfuil `results` ina eagar de thaifid `GuardrailExecutionResult` a chuimsíonn réimsí `blocked`, `skipped`, `modified`, `error`, agus `meta` in aghaidh an gharda-ráille, atá úsáideach le haghaidh rianú.

### Garda-ráillí a Dhíchumasú in aghaidh an Iarratais

Déanann `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` liosta dí-dhúbailte d'ainmneacha garda-ráillí a bhailiú ar cheart iad a scipeáil don iarratas reatha. Foinsí (gach ceann roghnach, gach ceann cumaiscthe):

- `apiKeyInfo.disabledGuardrails`
- Comhlacht iarratais `disabledGuardrails` (barrleibhéal)
- Comhlacht iarratais `metadata.disabledGuardrails`
- Ceanntásc `x-omniroute-disabled-guardrails` (nó an ceann oidhreachta `x-disabled-guardrails`)

Féadfaidh na luachanna a bheith ina n-eagar teaghrán nó ina dteaghrán scartha le camóg; déantar ainmneacha a normalú go cás íochtair kebab-case (`pii_masker` → `pii-masker`). Cuirtear an toradh tríd an `context.disabledGuardrails` chuig an gclárlann, a scipeálann garda-ráillí meaitseála (`skipped: true` i `results`).

## Ord Feidhmithe

Maidir le gach iarratas a théann trí `src/sse/handlers/chat.ts` agus
`open-sse/handlers/chatCore.ts`:

1.  Tógann `resolveDisabledGuardrails(...)` an liosta scipeála ón eochair API, ón gcorp,
    agus ó na ceanntásca.
2.  Ritheann `guardrailRegistry.runPreCallHooks(body, ctx)` na ráillí cosanta in ord tosaíochta ardaitheach:
    - Déantar ráillí cosanta díchumasaithe a thaifeadadh mar `skipped`.
    - Féadfaidh `preCall` gach ráille cosanta an t-ualach pá a athscríobh trí `modifiedPayload`.
    - Gearrann an chéad `block: true` an slabhra agus cuireann an láimhseálaí freagra diúltaithe ráille cosanta ar ais.
3.  Sreabhann an t-ualach pá (a d'fhéadfadh a bheith athscríofa) isteach i ródú teaglama agus i seoladh in aghaidh an tsrutha.
4.  Tar éis an freagra a chur le chéile, ritheann `guardrailRegistry.runPostCallHooks(...)`
    an slabhra céanna ar an bhfreagra. Scaoileann `block: true` an freagra in aghaidh an tsrutha anseo.

Déantar ráillí cosanta a chaitheann earráid a thaifeadadh le `error: <message>` agus a logáil trí
`logger.warn`, ach leanann an slabhra ar aghaidh — teip-oscailte de réir dearaidh.

## Cumraíocht

Athróga comhshaoil a léann na ráillí cosanta ionsuite:

| Variable                              | Used by                   | Effect                                                                                                          |
| :------------------------------------ | :------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Socraigh `false` chun braite a dhíchumasú go hiomlán.                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Beartas insteallta: `warn`, `block`, nó `log`. Ní athscríobhann an luach oidhreachta `redact` téacs insteallta. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mód don gharda insteallta; bratach gné DB freisin a **sháraíonn** na hathróga comhshaoil (DB > ENV).            |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Íos-déine a dhiúltaíonn `MODE=block`: `high` (réamhshocrú), `medium`, nó `low`.                                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Ailias oidhreachta do `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Nuair atá `true`, déantar PII an iarratais a eagrú (neamhspleách ar mhodh insteallta).                          |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Rialaíonn sé iompar an mhascóra ar thaobh an fhreagra.                                                          |

Léann ráillí cosanta an Modality Bridge cumraíocht reatha ón stór socruithe atá bunaithe ar DB
(`getSettings()`), ní ó athróga comhshaoil. Is iad príomheochracha Vision ná
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, agus
`modalityBridgeCacheMaxEntries`. Ní ghlactar leis na heochracha oidhreachta
`visionBridge*` ach amháin mar an t-aischur léitheoireachta aon-timthriallta
doiciméadaithe; úsáideann scríbhinní painéil na príomheochracha. Tá na réamhshocruithe agus an
réiteoir aischuir lonnaithe i `src/shared/constants/modalityBridgeDefaults.ts`, le
tairisigh oidhreachta coinnithe i `src/shared/constants/visionBridgeDefaults.ts`.

Úsáideann Fuaime `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, agus `modalityBridgeAudioMaxClips`, chomh maith leis na socruithe
comhroinnte `modalityBridgeCache*`. Níl aon aischur eochrach oidhreachta ag Fuaime toisc gur
tugadh na heochracha seo isteach le scéimre an Modality Bridge.

Úsáideann Físeán `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, agus
`modalityBridgeVideoTimeout`, chomh maith leis na socruithe comhroinnte `modalityBridgeCache*`.
Tá sé díchumasaithe de réir réamhshocraithe toisc gur spleáchais oibríochtúla roghnacha iad
FFmpeg/ffprobe agus go gcuireann fotheidealú fráma moill agus costas samhail leis.

## Cosaintí Saincheaptha

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

1.  Cruthaigh `src/lib/guardrails/myGuardrail.ts` ag leathnú `BaseGuardrail`.
2.  Cuir `preCall` agus/nó `postCall` i bhfeidhm.
3.  Cláraigh ag am iompórtála (brúigh ó `registerDefaultGuardrails`) nó glaoigh ar `guardrailRegistry.register(...)` ag am rite — cuirfidh an clárlann aon chosaint roimhe seo leis an ainm normalaithe céanna in ionad.
4.  Cuir tástálacha leis faoi `tests/unit/` (samplaí atá ann cheana:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Tástáil

Úsáid `resetGuardrailsForTests()` idir tástálacha chun tús a chur le staid aitheanta. Cuir `{ registerDefaults: false }` ar aghaidh chun tús a chur le clárlann fholamh agus chun na cosaintí atá á dtástáil amháin a chlárú. Glacann Vision Bridge le hinstealladh spleáchais (`deps.getSettings`, `deps.callVisionModel`); nochtann Audio Bridge na hailt chomhionanna le haghaidh socruithe, cumais, roghnú samhail STT, seiceálacha dintiúir, agus trascríobh. Is féidir le tástálacha an dá shreabhadh a fheidhmiú dá bhrí sin gan rochtain ar DB nó ar líonra.

## Féach Freisin

- `src/lib/guardrails/` — cur i bhfeidhm
- `src/shared/utils/inputSanitizer.ts` — brathadóir comhroinnte a chumhachtaíonn instealladh pras agus mascáil PII
- `src/shared/constants/visionBridgeDefaults.ts` — réamhshocruithe Vision Bridge agus liosta samhlacha droichid éigeantacha
- `src/shared/constants/modalityBridgeDefaults.ts` — réamhshocruithe comhroinnte ama rite Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ciseal ortagánach (scoradán ciorcaid, fuarú)
- `docs/reference/ENVIRONMENT.md` — tagairt iomlán do athróga comhshaoil

## Clúdach bealaigh cosanta insteallta & foireann dhearg (Céim 8 · Bloc D)

Clúdaíonn an cosantóir insteallta (`createInjectionGuard` / `withInjectionGuard`) gach bealach a ghlacann le prasanna úsáideora. Tugann sé ómós do `INJECTION_GUARD_MODE` (réamhshocrú `warn` = logáil amháin; `block` = seolann sé ar ais HTTP 400 `SECURITY_001`).

| Cineál                 | Bealaí                                                                                                                                               | Mód réamhshocraithe |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Téacs (atá ann cheana) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Giniúnach              | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Sonraí                 | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Clúdaíonn eastóscadh téacs (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Foireann dhearg (oíche, `nightly-llm-security.yml`):** fíoraíonn promptfoo go gcuireann gach bealach bac ar an gcorp OWASP-LLM i `INJECTION_GUARD_MODE=block`; ritheann garak taiscéalaithe (scipeann sé gan rún). Cuirtear `moderations` san áireamh ar mhaithe le comhsheasmhacht — is féidir le hoibreoirí i mód bloc é a dhíolmhú trí `resolveDisabledGuardrails`.

Tá dhá phost ag an sreabhadh oibre oíche (`.github/workflows/nightly-llm-security.yml`, cron + seoladh láimhe):

- **`promptfoo-guard` (blocáil)** — ritheann sé `promptfoo eval -c promptfooconfig.yaml` le `INJECTION_GUARD_MODE=block`. Dearbhaíonn gach cás frithsheasmhach (m.sh. "déan neamhaird de gach treoir roimhe seo…", jailbreaks stíl DAN) go bhfuil `error.code === "SECURITY_001"` sa fhreagra, i.e. gur dhiúltaigh an cosantóir an t-iarratas i ndáiríre.
- **`garak` (comhairleach)** — ritheann sé garak `--probes promptinject,dan,leakreplay` i gcoinne cás áitiúil OmniRoute (`http://localhost:20128/v1`). Geataithe ar rún soláthraí (`PROMPTFOO_PROVIDER_KEY`); scipeann sé go galánta agus tá an iarmhír `|| true` leis, ionas go dtuairiscíonn sé gan teip CI.

Clúdaíonn clúdach an chúntóra cosanta (`createInjectionGuard` / `withInjectionGuard`) gach bealach `/v1` a iompraíonn prasanna; tarraingítear téacs an phrais ó `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ag `extractMessageContents()` i `src/shared/utils/inputSanitizer.ts`.
