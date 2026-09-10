# AUTO-COMBO (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo Engine

> **Do Úsáideoirí**: Ag lorg tosaigh tapa? Féach ar an [Treoir Úsáideora Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) le haghaidh míniúcháin shimplí agus samplaí.

> Sraitheanna samhlacha féeinrianta lescóráil oiriúnaithe + ródú uathoibríoch gan chumrú

## Ródú Uathoibríoch Gan Chumrú (réimír `auto/`)

> **NUA:** Ní gá combo a chruthú. Úsáid réimír `auto/` go díreach in aon chliant.

### Samplaí Tapa

| Aitheantas Samhail | Malartach       | Iompar                                                                               |
| ------------------ | --------------- | ------------------------------------------------------------------------------------ |
| `auto`             | réamhshocraithe | Gach soláthraí nasctha, straitéis LKGP, meáchain cothroma                            |
| `auto/coding`      | coding          | Meáchain ar cháidh ar dtús, oiriúnach le haghaidh gineadh códra                      |
| `auto/fast`        | fast            | Ródú roghnaithe meáchain le seirbhís-laghdaithe                                      |
| `auto/cheap`       | cheap           | Ródú optamaithe costais (costas is ísle ar dtús)                                     |
| `auto/offline`     | offline         | Is fearr le soláthraithe a bhfuil an cuóta ina n-uachtar ag teacht                   |
| `auto/smart`       | smart           | Cáidh ar dtús + ráta iniúchta níos airde (10%) le haghaidh aimsigh níos fearr        |
| `auto/lkgp`        | lkgp            | LKGP sainráite (cosúil le `auto` réamhshocraithe)                                    |
| `auto/chaos`       | chaos           | Meáchain instealltaearráide le haghaidh tástáil seasmhachta ( innealtóireacht chaos) |

### Comhdháil Catagóir × Tairscéal (`auto/<category>:<tier>`)

Scarann iarmhíreanna stíl OpenRouter **cad é an cineál ródaithe** (catagóir) ó **conas é a bharrfheabhsú** (tairscéal), ionas gur féidir iad a chomhdháil go saor in aisce (#4235 Céim B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Catagóirí** (scag an linn iarratais de réir cumais): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. Coinníonn `vision`/`multimodal` samhlacha atá in ann léamh; coinneann `reasoning` samhlacha smaointeoireachta.
- **Tairscí** (roghnaigh na meáchain scórála / scagaire linn): `fast` (seachadadh tapa) · `cheap` (ailias `floor`, sábhálóir costais) · `reliable` (sláinte scriostóra chiorcail + seasmhacht seirbhíse-laghdaithe) · `free` / `pro` (scag an linn de réir tairscéal samhail le `classifyTier` — saor in aisce vs. préimhe).

| Sampla                 | Réitíonn go                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `auto/coding:fast`     | linn coding, meáchain seirbhíse-laghdaithe                     |
| `auto/coding:cheap`    | linn coding, optamaithe costais (alias `auto/coding:floor`)    |
| `auto/reasoning:pro`   | samhlacha smaointeoireachta amháin, tairscéal préimhe          |
| `auto/vision`          | samhlacha atá in ann léamh (gan tairscéal → meáchain cothroma) |
| `auto/multimodal:free` | samhlacha atá in ann ilmheáin, saor in aisce amháin            |

Réitíonn aon bhailí `auto/<category>[:<tier>]` ar éileamh; fógraítear faoin bhfáilt roghnaithe san `v1/models` agus ar an deais (`AUTO_SUFFIX_VARIANTS` i `open-sse/services/autoCombo/builtinCatalog.ts`). Is **oscailte ag teip** an scagadh — má mheaitseann srian le samhlacha nasctha gan aon cheann, úsáidtear an linn iomlán ionas go n-éireoidh an ródú riamh. Ní athraítear an scórálaí croí (`combo.ts`); cuirtear i bhfeidhm an scagaire catagóire/tairscéal i `buildAutoCandidates`.

> **Intleacht samhail bheo:** tugann rangú **Arena ELO** beo + sonraí tairscéal **models.dev** eolas ar oiriúnacht ródaithe uathoibríoch nuair a bheidh an bhratach `ARENA_ELO_SYNC_ENABLED ) curtha ar siúl (fillfidh ar an léarscáil oiriúnacht statach eile de) mar sin.

**Conas é a úsáid:**

```bash
# Aon uirlis IDE nó CLI a thacaíonn le formáid OpenAI
An Seoladh Boinn: http://localhost:20128/v1
Eochair API:  <your-endpoint-key>

# I do chód/chumrú, socraigh an tsamhail go:
model: "auto"                 # réamhshocraithe cothrom
model: "auto/coding"          # is fearr le haghaidh tascanna códraíochta
model: "auto/fast"            # is tapúla ar fáil
model: "auto/cheap"           # is saoire in aghaidh an tseicind
```

**Cad a tharlaíonn:**

1. Lorgann OmniRoute réimír `auto/` i `src/sse/handlers/chat.ts`
2. Iarrann ar gach **nasc gníomhach soláthraí** ón mbunachar sonraí
3. Scagann iad siúd a bhfuil dintiúra bailí acu (eochair API nó comhartha OAuth)
4. Socraíonn an tsamhail in aghaidh an naisc (`connection.defaultModel` nó an chéad tsamhail soláthraí)
5. Cruthaíonn **combo fíorúil** i免meamhlán (ní stóráiltear é sa DB)
6. Ródann le próifíl meáchain an mhalach roghnaithe + straitéis LKGP

**Príomhthréithe:**

- ✅ **I gcónaí ar siúl:** Gan scorálaí, gan cruthú combo, gan chumrú ag teastáil
- ✅ **Dinimiciúil:** Léiríonn sé na soláthraithe nasctha reatha go huathoibríoch
- ✅ **Greamaitheacht seisiúin:** Cinntíonn LKGP go dtabharfar tosaíocht don soláthraí rathúil deiridh
- ✅ **Ilchuntais ar a dtuigeann:** Ní dhéanann gach nasc soláthraí iarratasóir ar leith
- ✅ **Níl aon scríbhneoireachta DB:** Ní ann don combo fíorúil ach don iarratas, gan ualach seasmhachta

### Rialú iarratasóir in aghaidh na heochrach (#7819, Leibhéal 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = an t-iascar tar éis `auto/`, nó
an litriú `auto` le haghaidh an chainéil bhunaidh) is **pointe deireadh inliteanta amháin** é
a thaispeánann linn iarratasóirí reatha chainéil `auto/*` maisithe le indíreach bheo, ag
athsúsáid na léitheanna seasmhachta reatha (riamh stáit `state` raw scriostóra):

- scriostóra ciorcail soláthraí — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- fuarú nasc — `rateLimitedUntil` / `testStatus` ar an tsraith
  `provider_connections` réitithe
- glasáil samhail — `isModelLocked(provider, connectionId, model)`

Tugann gach iarratasóir an bhratach `excluded` den eochair API seo. Stóráiltear easnaimh
in aghaidh an eochair API (`auto_candidate_overrides` tábla, imirce `128`) — Il-áit
atá in OmniRoute gan tábla `users`, mar sin is `apiKeyId` an aitheantas fíor is gaire don
glaoiteoir — agus cuirtear i bhfeidhm é ag an bpointe teannais linn iarratasóirí i
`open-sse/services/autoCombo/virtualFactory.ts` le `filterExcludedCandidates()`
glan, tástáil-aonaid (`open-sse/services/autoCombo/candidateOverrides.ts`).
Is **oscailte ag teip** an scagaire: cuireann apiKeyId/channel gan socrú nó teip
fiosrúcháin DB an linn gan scagadh, mar sin feiceann oibreoir gan easnaimh socraithe
ródú comhionann leis an ghné seo roimh ré.

**Fágtha le saincheist leanúnaigh:** meáchain in aghaidh an iarratasóra + ordú sainráite (Leibhéal
3 — cothaíonn sé seo isteach sa straitéis meáchain/príorachta reatha) agus
pinning straitéis `combo` ar leith le haghaidh gach chainéil `auto/*` (Leibhéal 4).
Féach ar phlean #7819 le haghaidh an cheist oscailte ar an gceist an gcoinneofar easnaimh
in aghaidh an eochair API nó go ndéanfar iad domhanda agus an tsamhail il-áit
ann.

**Taobh thiar de na radhairc:**

```txt
Iarratas: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts luann réimír
   ↓
createVirtualAutoCombo('coding') → candidatePool ó naisc gníomhacha
   ↓
handleComboChat (an t-inneall céanna le combos stóráilte)
   ↓
Roghnú uathoibríoch roghnaíonn an soláthraí/samhail is fearr in aghaidh an iarratais
```

**Comhaid chur i bhfeidhm:**

| Comhaid                                                   | Cuspóir                                             |
| --------------------------------------------------------- | --------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | parsálaí réimíre (`parseAutoPrefix`)                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Cruthaíonn réada `AutoComboConfig` fíorúil          |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | cónascaire tástála le haghaidh déanamh ionadaíochta |
| `src/sse/handlers/chat.ts`                                | comhtháthú: gearr-iorr réimíre auto                 |
| `src/shared/constants/providers.ts`                       | iontráil `SYSTEM_PROVIDERS.auto` córais             |

## Ainmneacha Combo a Mheaitseálann le Fíor-Aitheantas Múnla

Is **phatrún intentional, tacaíochta** é combo a bhfuil a `name` mar an gcéanna le bare aitheantas múnla (m.sh. combo dar ainm `gpt-5.5`), ní fabht: is é an meicníocht é le haghaidh tacaíocht soláthraí in aghaidh an aitheantas múnla, mar atá cur síos air in [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Toisc go ndéantar seiceáil ar réiteach combo roimh réiteach bare aitheantas múnla (`getComboForModel()` in `src/sse/services/model.ts`), tá iarratas ar an bare aitheantas `gpt-5.5` á ródú trí spriocanna an combo (m.sh. `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5)` in ionad dul díreach chuig soláthraí amháin — athúsáidtear an tosaíocht combo-roimh-athscríobh a tógadh le haghaidh [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) agus tá sé á thástáil aisghníomhaíochta ag `tests/unit/responses-combo-resolution-3227.test.ts` agus `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Nuair a chruthaítear nó a athainmnítear combo go hainm a chlúdaíonn fíor-aitheantas múnla, **ní dhéantar é a dhiúltú riamh** — bhrisfeadh sin an sreabhadh oibre seo atá cur síos air. Ina áit sin (#8530), cuireann `POST /api/combos` agus `PUT /api/combos/[id]` réimse `warning` neamh-bhlocála leis an bhfreagra nuair a thagann an t-ainm (nua) salach ar fíor-aitheantas múnla:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Ag am tosaithe, logáiltear freisin monatóireacht `[STARTUP]` aonlíne ag `scanComboModelNameCollisionsAtBoot()` (`src/instrumentation-node.ts`) a liostaíonn gach combo atá ann cheana a chlúdaíonn aitheantas múnla, ionas go mbeidh comhartha ag oibreoirí a shroichfidh seo de thaisme (seachas go heolasach, de réir #6940). Tá an cúntóir braite suiteáilte in `src/lib/combos/modelNameCollision.ts`.

## Glaoch ar Combo Saincheaptha ó Chliant

Ní úsáidtear combos atá curtha ar ais (Socruithe → Combo) ach amháin nuair a sheolann an cliant **ainm beacht** an combo sa réimse `model` — níl aon mheaitseáil doiléir nó páirteach ar ainm an combo, agus níl aon réimse `auto/` i gceist. Ord réiteach (`getComboForModel()` in `src/sse/services/model.ts`):

1. meaitseáil ainm combo beacht (`model: "my-combo"`),
2. réimse `combo/<name>` (`model: "combo/my-combo"`),
3. léarscáileanna glob múnla→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dá pholl coitianta:

- **Ní úsáideann `auto` do combos.** Tógann `auto`/`auto/*` a líonra iarrthóirí féin gan chumraíocht agus ní thagann sé ar combos curtha ar ais ach amháin má tá combo dar ainm `auto` go litriúil (nach molta). Chun ródú a dhéanamh trí combo, seol a ainm beacht — ní `auto`.
- **Is táirge íoctha fíor é `openrouter/auto`** ("Auto Best Available") ag OpenRouter, ní ailias OmniRoute. Is é an iontráil múnla statach aonair é de chlárúchán OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) agus tá billiú á dhéanamh air go dhíreach. Úsáid Socruithe → Ródú → Folaigh móideanna íoctha chun é a dhíliostáil ó phoolanna `auto`.

Féach [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) agus [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) le haghaidh an mearbhail bhunúsháite a ndéanann an doiciméad seo cur síos air.

## Conas a Oibríonn Sé (Auto-Chomhshuitmhí Leanúnacha)

Roghnaíonn Inneall Auto-Chomhshuitmhí an soláthraí/múnla is fearr go dinimiciúil do gach iarratas ag baint úsáide as **feidhm scóráchta 16-fhachtóir** (sainithe i `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Tomann na meáchain réamhshocraithe `1.0`; athchóirítear meáchain saincheaptha ag `normalizeScoringWeights()`. Trí cinn déag acu — `cacheAffinity`, `resetWindowAffinity` agus `reliability` — tá meáchain réamhshocraithe de `0` acu: ríomhtar fós iad do gach iarrthóir, agus cuireann `cacheAffinity` cosc ar dhéimeadú prompt-cache lasmuigh den scór, mar sin deirtear gur iad na fachtóirí iad nach gclaonann de réir réamhshocraithe.

![Scóráil 16-fhachtóir Auto-Chomhshuitmhí](../diagrams/exported/auto-combo-scoring.svg)

> Foinse: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-comb-scoring.mmd) (athghin chomh maith trí `npm run docs:render-diagrams`). Is é an comhaid ainm stairiúil é; taispeánann an foinse agus an léaráid rindreáil na 16 fachtóir go léir deimhnithe i `DEFAULT_WEIGHTS`.

| Fachtóir              | Meáchain Réamhshocraithe | Cur síos                                                                                                                                                                                                                |
| :-------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429                   | Ceidhm atá fágtha / spás ráta-teorann [0..1]                                                                                                                                                                            |
| `health`              | 0.1605                   | Scór sláinte ón gclibhreachtóir timthrialla (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                       |
| `costInv`             | 0.1429                   | Inbhéartach ** measctha** costais (praghas comhartha ionchuir 60% + aschuir 40%, normalaithe) — níos saoire = scór níos airde                                                                                           |
| `latencyInv`          | 0.1143                   | Inbhéartach p95 moille normalaithe go linn — níos tapúla = scór níos airde                                                                                                                                              |
| `taskFit`             | 0.0762                   | Oiriúnacht cineál tasc (cóódáil, athbhreithniú, pleanáil, anailísíocht, dífhabhtúchán, doiciméadú)                                                                                                                      |
| `stability`           | 0.0476                   | Cobhsaíocht bunaithe ar luaineacht ó stad-earrach inaistear moille — scóráil níos ísle ar iarrthóir a bhfuil am freagartha ag titim agus ag ardú                                                                        |
| `tierPriority`        | 0.0476                   | Tosaíocht aicme cuntais — Ultra=1.0, Pro=0.67, Caighdeánach=0.33, Saor=0.0                                                                                                                                              |
| `tierAffinity`        | 0.0476                   | Gaol idir aicme an iarrthóra agus an aicme a molann an tsonraíocht-manifest                                                                                                                                             |
| `specificityMatch`    | 0.0476                   | Meaitseáil idir sonrúlacht iarratais (leid manifest) agus aicme múnla                                                                                                                                                   |
| `contextAffinity`     | 0.0476                   | Gaol idir riachtanas comhthéacs-fhuinneoige an iarratais agus fuinneoig comhthéacs an mhúnla                                                                                                                            |
| `sessionAvailability` | 0.0476                   | Ar fáilseacht seisiúin OAuth ceangail an iarrthóra don seisiún seo (`getOAuthSessionAvailability()`; scórann ceangail neamh-OAuth 1.0)                                                                                  |
| `connectionDensity`   | 0.0476                   | Leathraíonn sé lucht ar cheangail an tsoláthraí céanna (frith-dlúthsheoltacht)                                                                                                                                          |
| `cacheAffinity`       | 0.00                     | Gaol haschumhradh le ceangal a bhfuil seans ann go gcoinneoidh sé réamhchúlaigh prompt-cache an iarratais seo (`open-sse/services/combo/promptCacheAffinity.ts`); táscor de réir réamhshocraithe (#8008)                |
| `resetWindowAffinity` | 0.00                     | Tosaíocht i dtreo ceangail a bhfuil fuinneoig athshocrú quota fabhrach acu (táscor de réir réamhshocraithe)                                                                                                             |
| `quality`             | 0.03                     | comhartha cáilíochta aschur treoraithe ó rianaire cáilíochta na n-imeartha róuteála; glacann iarrthóirí gan tuairimí scór neodrach 0.5                                                                                  |
| `reliability`         | 0.00                     | Roinnt rathúlachta arna bhrath, `1 - failureRate`, ó stair úsáide 24u le hurlár deichniúr sampla (m;]/m eastát eile maidir le méadracht fíor-am); léann iarrthóirí gan tuairimí mar 1.0. Táscor de réir réamhshocraithe |

**Iomlán:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` mar atá deimhnithe i `DEFAULT_WEIGHTS`; athchóirítear meáchain cumraíthe ag an úsáideoir go dáileadh ag `normalizeScoringWeights()` roimh scóráil.

## Pacáistí Mód

6 phróifíl meáchain réamhshainithe in `open-sse/services/autoCombo/modePacks.ts`. Cuireann gach pacáiste na meáchain réamhshocraithe in ionad go hiomlán chun roghnú a chlaonadh i dtreo sprioc amháin. Suimeann gach pacáiste cheana féin go `1.0` (`0.9999` mar a phriontáiltear ag ceithre dheachúlacha), mar sin níl aon rud suntasach le ceartú ag `normalizeScoringWeights()` nuair a bhíonn pacáiste gníomhach — is iad na luachanna thíos, go slánú, na cinn a chuireann an scórálaí i bhfeidhm.

| Fachtóir              | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1333     | 0.1333     | 0.0952        | **0.3524**       | 0.1333            | 0.0476     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0476     | **0.3524** | 0.0476        | 0.0952           | 0.0381            | 0.0190     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0286     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0190     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0286     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |

Nótaí:

- **Ní shocraíonn aon phacáiste `quality`, agus cuireann pacáiste an léarscáil meáchain in ionad go hiomlán** (`weights = pack`, ní cumaisc é). Iompraíonn `quality` `0.03` in `DEFAULT_WEIGHTS`, ach faoi aon phacáiste mód déanann sé normalú go `0` — roghnaíonn pacáiste an comhartha cáilíochta breathnaithe a chiúnú go hiomlán. Más mian leat aiseolas cáilíochta chun tionchar a imirt ar ródú, fág `modePack` gan socrú agus coigeartaigh na meáchain go díreach. (`cacheAffinity` freisin gan socrú ag gach pacáiste, ach is é `0` a réamhshocrú ar aon nós, mar sin ní athraíonn aon rud ansin.)
- Tá `tierAffinity`, `specificityMatch` agus `resetWindowAffinity` go sainráite `0` i ngach pacáiste.
- Béim gach phacáiste go hachomair:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (naisc íseal-latency, sláintiúla)
  - **cost-saver** → costInv 0.3524 (na comharthaí is saoire a bhuaigh)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (an tsamhail is fearr don tasc, comhsheasmhach)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (uas-imeall gan aird ar luas/costas)
  - **reliability-first** → health 0.3524 + stability 0.1905 (na hiontas is lú)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (próifíl insteallta locht)

### Rialuithe in aghaidh an Iarratais (ceanntásca) — #6023 / #6024 / #6025 / #3470

Is féidir comhcheangal `auto` a stiúradh **in aghaidh an iarratais** trí thrí cheanntásc, gan cumraíocht stóráilte an chomhcheangail a mhúchadh. Ní bhaineann siad seo ach le straitéis `auto` agus ní ach leis an iarratas a iompraíonn iad; úsáidtear `modePack`/`budgetCap`/`budgetFallback` sábháilte an chomhcheangail nuair atá an ceanntásc as láthair.

| Ceanntásc                     | Glacann sé                                                                                                                                                                                        | Éifeacht                                                                                                                                                                                                                                                                                |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | ailias réamhshocraithe (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) nó ainm pacáiste amh (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Sáraíonn sé na meáchain scórála don iarratas seo. Cuireann `balanced`/`default` na meáchain réamhshocraithe i bhfeidhm (gan phacáiste). Déantar neamhaird ar luachanna anaithnide (cumraíocht caomhnaithe).                                                                             |
| `X-OmniRoute-Budget`          | uimhir dhearfach (uas USD in aghaidh an iarratais)                                                                                                                                                | Uasteorainn chostais chrua: scagtar iarrthóirí a bhfuil a meastachán costais os a chionn roimh roghnú. Rialaítear cad a tharlaíonn nuair a sháraíonn **gach** iarrthóir é le `X-OmniRoute-Budget-Fallback` thíos.                                                                       |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (réamhshocrú, ailiasanna: `cheapest-viable`, `soft`) nó `strict` (ailiasanna: `block`, `hard`)                                                                                         | `cheapest`: titeann sé ar ais go dtí an t-iarrthóir is saoire go domhanda cé go sáraíonn sé an caipín fós (iompar oidhreachta). `strict`: diúltaíonn sé roghnú — teipeann ar an iarratas go tapa le `HTTP 402` in ionad róchaiteachas ciúin. Déantar neamhaird ar luachanna anaithnide. |

```bash
# Cuir an phróifíl is tapúla i bhfeidhm, caipín an t-iarratas seo ag $0.05, agus bloc go crua in ionad róchaiteachais
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Is feidhm íon í an réiteach (`open-sse/services/autoCombo/requestControls.ts`); cothaíonn na luachanna réitithe ionchuir `config.modePack` / `config.budgetCap` / `config.budgetFallback` atá ann cheana san inneall. Socraíonn `config.budgetFallback` stóráilte comhcheangail ("strict" | "cheapest") an polasaí marthanach; sáraíonn an ceanntásc é d'iarratas amháin.

## Gach Straitéis Ródaithe

Tacaíonn innill combo OmniRoute le **19 straitéis ródaithe** (deartha i `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Tá an tUath-innill combo féin ar fáil faoin straitéis `auto`; tá na cinn eile ar fáil le haghaidh comboanna stóráilte.

| Straitéis           | Cur síos                                                                                                                                                                                                                       |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Liosta ordaithe an chéad sprioctha le tosaíocht sainráite                                                                                                                                                                      |
| `weighted`          | Randamach meáichte de réir meáchan in aghaidh an sprioctha                                                                                                                                                                     |
| `round-robin`       | Siúl trí na spriocanna in ord                                                                                                                                                                                                  |
| `context-relay`     | Seachadadh comhthéacs trasna na spriocanna (comhráite fada)                                                                                                                                                                    |
| `fill-first`        | Líon an ceadúnas gach sprioctha sula n-aimseofar an chéad cheann eile                                                                                                                                                          |
| `p2c`               | Lódchothromaíochta randamach cumhacht-de-2-roghanna                                                                                                                                                                            |
| `random`            | Roghnúchán randamach aonfhoirmeach                                                                                                                                                                                             |
| `least-used`        | Roghnaigh sprioc le lód reatha is ísle                                                                                                                                                                                         |
| `cost-optimized`    | Íoslaghdaigh $ in aghaidh an iarratais de réir praghsanna catalóige                                                                                                                                                            |
| `reset-aware` ⭐    | Tosaigh de réir am athshocradh ceadúnais — fuinneoga gearra athshocráin rangaigh níos airde                                                                                                                                    |
| `reset-window`      | Ardaigh spriocanna a bhfuil a bhfuinneog ceadúnais ag athshocradh is gaire                                                                                                                                                     |
| `headroom`          | Roghnaigh an sprioc leis an méid cheadúnais ceannfholú fágtha is mó                                                                                                                                                            |
| `strict-random`     | Randamach gan díshórtáil ar athuair                                                                                                                                                                                            |
| `auto`              | Úsáid Scóráil Auto Combo (16-fhachtóir) — **molta**                                                                                                                                                                            |
| `lkgp`              | Cosán Dea-Aitheanta-Deireanach (peannáil leis an soláthraí deiridh rathúil, ansin titeann siar le rialacha)                                                                                                                    |
| `context-optimized` | Roghnaigh sprioc leis an oiriúnú is fearr do mhéid an chomhthéacs reatha                                                                                                                                                       |
| `cache-optimized`   | Athshocraigh na spriocanna de réir gaolmhaíochta le toast-luachaire — déanfar an ceangal is dóichí a bhfuil réimír stóráilte an iarratais seo aige a thriail ar dtús (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Scadail amach le painéal samhlacha comhthráthach, ansin déan amháin freagra trí bhreitheamh (féach thíos)                                                                                                                      |
| `pipeline`          | Rith spriocanna in ord, ag téadadh aschur gach céime isteach in ionchur an chéad chéime eile; ní ar an bhfreagra deiridh amháin a thugtar ar ais (#6396)                                                                       |

⭐ = Nua i v3.8.0 · 🧬 = Nua i v3.8.36

### Sémantic `weighted`

Tá `weighted` ina **dráma randamach comhréireach in aghaidh an iarratais**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), ní comhardóir:

- Tarraíonn gach iarratas **céim amháin** le dóchúlacht `weight / totalWeight`; ordú iad na céimeanna fágtha
  i meáchan ídithe mar slabhra titeáin don iarratas sin.
- Ní tharraingtoidh céim a bhfuil a meáchan `0` (ná atá in easnamh) choiche fad is a bhfuil aon chéim eile aige
  meáchan > 0 — ní fhéadfaidh sé ach freastal mar thiteán tar éis don chéim tarraingthe teip. Nuair a bhfuil **gach**
  meáchan 0 amháin a roghnófar go aonfhoirmeach.
- Baintear na céimeanna ar nach bhfuil a spriocanna ar fáil — briseadh sliseanna soláthraí `OPEN`, fuarú ceangail,
  dúnadh samhail — den tarraing sula dtosaíonn sí
  (`open-sse/services/combo/targetResolution.ts`), ionas gur féidir le céim shláintiúil amháin a bhuachan
  gach iarratas go sealadach.
- Cuireann `stickyWeightedLimit` (cumraíocht combo, réamhshocrú `1` = as) an chéim tarraingte peannáil don oiread
  sin rathuithe as a chéile sula ndéantar tarraing nua.

Le casadh casta úsáid `round-robin`; tabharfaidh meáchain comhionann ar `weighted` cothromaíocht staitistiúil —
ní cothromaíocht **chasta**.

## Strataisí Fúnáise

Is é an t-aon straitéis nach roghaíonn **sprioc amháin** é `fusion`. Téann an t-ordú amach **go comhuaineach le gach samhail painéil**, agus ansin déanann **múnla breithiúna** cumraithe síntéar ar fhreagra aonfhoirmeach deiridh ó na freagraí painéil go léir. Portáilte ó upstream `decolua/9router` (dearadh Fusion ag OpenRouter); cur i bhfeidhm i `open-sse/services/fusion.ts`.

Conas a oibríonn sé:

0. **Tríd an tréith-lódáil uirlise** — má iompraíonn iarratas eagar neamh-fholamh `tools` le `tool_choice` gan bheith sainráite `"none"`, trasnóidh sé an painéal ar fad: déanann sé ródú go samhail amháin (an breitheoir cumraithe, nó `panel[0]`) le `tools`/`tool_choice` á n-iompar gan athrú. Níl rogha uirlise ag baill an phainéil agus seasann treoir shintéarúcháin an bhreitheora in aghaidh eisiúna glaonna uirlise, mar sin faigheann cliantanna gníomhach/uirlis-glaonnaí cinneadh fíor-uirlise in ionad próis shintéaraithe (#6771).
1. **Féan-amach** (arrachtaí gan uirlise amháin) — seoltar an t-ordú chuig gach samhail painéil ag an am céanna, gan sruthú agus na huirlisí á n-gearradh (teonnas an bhreitheora próis iomlán le síntéarú).
2. **Bailiúchán grásta ceathrún** — chomh luath agus a shroichfidh `minPanel` freagraí, tosaíonn an t-amire gásta gearr le haghaidh na ndálanna mall, agus ansin téann fúnáis ar aghaidh le cibé a bailíodh. Srianann sé seo pian an tsamhail is mall ar an am fíor, teoranta le ham crua.
3. **Sintéarúchán breitheora** — déantar freagraí na painéle a ainmniú (`Foinse 1`, `Foinse 2`, … — ionas go meáann an breitheoir an t-ábhar, ní branda na samhla) agus tugtar don bhreitheoir iad, a dhéanann anailís ar chomhthuiscint / contrárthachtaí / clúdach páirt-mhír / léargais uathúla / dalltaí, agus ansin scríobhann **amháin** freagra údarásach. Coinníonn an glao breitheora bratach `stream` bunúsach an chliaint + uirlisí, mar sin oibríonn sruthú agus úsáid uirlise ina dhiaidh fós.
4. **Meath flaithiúil** — 0 freagra painéil → `503`; 1 marthanóir díreach → filleann an freagra sin go díreach (níl aon ní le fúnáil); freagraíonn painéal samhail amháin go díreach.

Is féidir le ball painéil a bheith ina chéim `combo-ref` freisin (`{kind: "combo-ref", comboName: "..."}`) ag tagairt do combo eile — réitítear é mar **guth amháin painéil dubh-phláta** (aghluaiseadh iomlán aisghníomhach sa combo atá tagairte, ní féan-amach ar na spriocanna féin an combo sin), le an cosaint doimhneacht/sroichimh chéanna a úsáideann gach straitéis eile a itheann combo-ref cheana féin (#6764).

### Cumraíocht

Cumraítear ar bhlob `config` an combo (gan aistriúchán scéime — úsáidtear an tábla `combos` atá ann cheana):

| Réimse                                   | Cineál   | Réamhshocrú       | Cuspóir                                                                                           |
| :--------------------------------------- | :------- | :---------------- | :------------------------------------------------------------------------------------------------ |
| `config.judgeModel`                      | `string` | samhail painéil 1 | An samhail a dhéanann síntéarú ar an bhfreagra deiridh                                            |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Freagraí rathúla atá ag teastáil sula dtosaíonn an t-amire gásta (giorraithe go `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Chomh fada agus a bhfanfar le dálanna mall nuair a bheidh an ceathrún bainte amach                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Teorainn iomlán ionas nach féidir le samhail a shníomh tarraingt ar an iarratas                   |

Tá na réamhshocruithe i `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Sampla

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Ansin glaoigh air cosúil le aon combo: `{"model":"fusion-panel","messages":[...]}`.

## Monarcha Comhshásaithe Fíorúil

Níl combochomhshóite réamhshainithe ag an innill Comhshásaithe Auto. Ina ionad sin, cruthaíonn `open-sse/services/autoCombo/virtualFactory.ts` iarrthóirí ar an bpointe boise:

1. Tarraingíonn `getProviderConnections({ isActive: true })` (gach ceangal cumasaithe)
2. Scagann iad siúd le dintiúirí bailí (eochair API nó comhartha OAuth nach bhfuil imithe in éag tríd an `hasUsableOAuthToken()`)
3. Déanann trasn-tagarmharc le `getProviderRegistry()` le haghaidh infhaighteacht múnla + praghsáil
4. Do gach teaglach `(soláthraí, múnla, ceangal)`, cruthaíonn sé `VirtualAutoComboCandidate`
5. Roghnaíonn `connection.defaultModel` (nó an chéad mhúnla sa chlár禧) mar sprioc sheachadta
6. Scóráil gach iarrthóir ag baint úsáide as an 16-fhachtóir `scorePool()` agus pacáiste meáchain an leagan
7. Filleann an `AutoComboConfig` cuimhne thoraidh do `handleComboChat()` — ní stóráiltear é go bunachar sonraí riamh

Ciallaíonn sé seo go **leathnaíonn soláthraí nua le `auto/*` cumasaithe go huathoibríoch an linn iarrthóirí** — níl gá le cur eisi combo a dhéanamh de láimh. Atógáiltear an combo fíorúil in aghaidh an iarratais, mar sin tugtar aghaidh ar cheangail nua-churtha nó nua-shláintiúla láithreach bonn.

## Féinfhíochú

- **Eisiamh sealadach**: Scór < 0.2 → eascraíodh ar feadh 5 nóiméad (cúlú comhchineáil, uasmhír 30 nóiméad)
- **Aireagóireacht sriantóra ciorcaid**: OPEN → eascraíodh go huathoibríoch; HALF_OPEN → iarratais taiscéalacha
- **Mód eachtraí**: >50% OPEN → díchumasach an taiscéal, uasmhéadaigh an cobhsaíocht
- **Aisghabháil fuaraithe**: Tar éis eisiamh, is é an chéad iarratas "taiscéal" le ham ama laghdaithe

## Taiscéal Bandit

5% de na hiarratais (in-choigeartaithe) a threorú chuig soláthraí randamach le haghaidh taiscéal. Díchumasaithe i mód eachtraí.

## API

Níl aon chrios **sainiúil `POST /api/combos/auto` ann** — tomhaltar an Auto-Combo ar dhá bhealach:

1. **Gan chumraíocht (molta):** Seol aon iarratas comhshóite comhrá le `model: "auto"` nó `model: "auto/<variant>"`. Cruthaíonn an monarcha fíorúil an combo in aghaidh an iarratais — gan stóráil, gan glaonna API de dhíth.

2. **Combo stóráilte le `strategy: "auto"`:** Cruthaigh combo rialta trí `POST /api/combos` agus socraigh `strategy: "auto"` móide `config.auto.weights` / `config.auto.candidatePool`. Úsáidtear an inneall scórála céanna; stóráiltear an combo i `combos` agus is féidir é a úsáid le hID.

Le haghaidh fionnachtana, liostálann `GET /api/combos/auto` gach leagan lena linn iarrthóirí réitithe móide `context_length` / `max_output_tokens` — an MAX thar na fuinneoga linn iarrthóirí. Ní mór do chliaint (m.sh. an plugin opencode) na luachanna seo a chur in iúl in ionad `0`: díchumasaíonn comhthéacs náid iompactacht uathoibríoch opencode go hiomlán, ag ligean do sheisiúin fás go dtí go scriosann scagadh stair an gáta comhthéacs. Tá MAX sábháilte a chur in iúl toisc go ritheann réamhscagtha comhthéacs auto-combo iarratais ró-mhór chuig iarrthóirí le fuinneoga móra.

```bash
# Úsáid gan chumraíocht (gan cruthú combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo auto stóráilte trí an tráseireadh combo rialta
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Straitéisí róuter uathoibríoch

Is féidir le combo stóráilte le `strategy: "auto"` `config.routerStrategy` (nó seancháipspéireacht `config.auto.routerStrategy`) a shocrú mar aon de:

- `rules` — scóráil meáchain réamhshocraithe
- `score` — roghnaíonn an scór meáchain chumraithe is airde. Coinníonn ceangail shainiúla ord iarrthóirí cumraithe; samplálann an `explorationRate` reáchtáilte ón linn iarrthóirí ranguithe iomlán.
- `cost` / `eco` — an soláthraí sláintiúil is saoire
- `latency` / `fast` — an p95 latency is ísle le pionós iontaoibh
- `sla-aware` / `sla` — roghnaigh iarrthóirí a shásóidh p95 latency, ráta earráide, agus SLOanna roghnacha costais
- `lkgp` — soláthraí maith eolais deireanach ar dtús

### Straitéisí róuter go mion

Nochtaíonn inneill auto-combo 6 chur i bhfeidhm **RouterStrategy** inathraithe ar féidir leat a athrú trí `config.routerStrategy` (nó seancháipspéireacht `config.auto.routerStrategy`). Roghnaíonn gach straitéis soláthraí amháin ón linn iarrthóirí, ag cur `RoutingContext` san áireamh (cineál tasc leidí/uirlisí/físeáin, meastachán comhartha, polasaí SLA roghnach, soláthraí maith-eolais deireanach roghnach).

#### 1. `rules` (réamhshocraithe) — scóráil meáchain 16-fhachtóir

Imíonn sé an t-inneall scórála atá ann cheana. Scagaíonn iarrthóirí sriantóir ciorcaid `OPEN`, ansin rithíonn `scorePool()` le cineál tasc reáilte agus `getTaskFitness()`, ag roghnú an tsoláthraí scórála is airde.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Cathain le húsáid**: Réamhshocraithe. Úsáid nuair is mian leat cothromaíocht chothromaithe trasna na mbreithanna uile.

**Ailias**: `rules` (gan ailias)

---

#### 2. `cost` / `eco` — an soláthraí sláintiúil is saoire

Sórtáil an linn iarrthóirí de réir `costPer1MTokens` (ag dul suas) agus roghnaigh an ceann is saoire. Scagaigh iarrthóirí `OPEN` ar dtús.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cathain le húsáid**: Ualachanna sách costas, próiseáil bhaisc, nó poist cúlra.

**Ailiasanna**: `cost`, `eco`

---

#### 3. `latency` / `fast` — an p95 latency is ísle le pionós iontaoibh

Sórtáil de réir `p95LatencyMs + (errorRate * 1000)`. Cinntíonn an pionós ráta earráide go bhfuil soláthraí neamhiontaofa rangaithe níos ísle fiú más ísle é a latency ainmniúil.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Cathain le húsáid**: Ualachanna sách latency amhail comhrá fíor-am, comhlánú uathoibríoch, nó cúntóirí códaithe idirghníomhacha.

**Ailiasanna**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — comhlíonadh SLOanna latency/earráide/costais

Scóráil gach iarrthóir de réir mar a shásann sé an polasaí SLO cumraithe:

| Fachtóir          | Meáchan | Foirmle                                                |
| ----------------- | ------- | ------------------------------------------------------ |
| Scór latency      | 35%     | `threshold / max(value, ε)`                            |
| Scór earráide     | 35%     | `threshold / max(value, ε)`                            |
| Scór sláinte      | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)      |
| Scór costais      | 10%     | `threshold / max(value, ε)` nó comhshóithe inbhéartach |
| Scór cobhsaíochta | 5%      | stad-standard laghdaithe inbhéartach                   |

Nuair a bhíonn `hardConstraints: true`, sórtáiltear iarrthóirí go príomha de réir **scóra sáraithe** (cé chomh fada agus a sháraíonn siad aon SLO), ansin de réir scóra chomhshóite. Murach sin is é an scór comhshóite amháin.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Réanna SLA** (socraigh ar chumraíocht combo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Cathain le húsáid**: Ualachanna táirgíochta le buiséad dian latency, ráta earráide, nó costais.

**Ailiasanna**: `sla-aware`, `sla`

---

#### 5. `lkgp` — soláthraí maith-eolais deireanach ar dtús

Bain triail as an **soláthraí maith-eolais deireanach** (má tá sé socraithe) ar dtús, ansin tarraingíonn sé ar ais go dtí an straitéis `rules`. Úsáideach le haghaidh seasmhacht seisiúin — láimhseálann an soláthraí céanna iarratais leanúint i gcomhrá.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Tarraingíonn ar ais go dtí straitéis rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Cathain le húsáid**: Comhráite il-phléartha nuair is mian leat an soláthraí céanna a láimhseáil iarratais leanúint (m.sh., le haghaidh taisceáil, leanúnachas comhthéacs, nó comhsheasmhacht praghsála).

**Ailias**: `lkgp` (gan ailias)

---

### Straitéisí róuter saincheaptha

Is féidir leat cur i bhfeidhm `RouterStrategy` féin a chlárú trí an API poiblí:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Do loighic róuithe anseo
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Úsáid ansin é:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Treoir roghnúcháin straitéisí róuter

| Cás úsáide            | Straitéis   | Fáth                                        |
| --------------------- | ----------- | ------------------------------------------- |
| Ualach cothromaithe   | `rules`     | Réamhshocraithe — breithníonn gach fachtóir |
| Íoslaghdaithe costas  | `cost`      | Roghnaíonn an ceann is saoire i gcónaí      |
| Íoslaghdaithe latency | `latency`   | Roghnaíonn an soláthraí iontaofa is tapúla  |
| SLOanna dian          | `sla-aware` | Scagaigh le chéimní p95/earráide/costais    |
| Comhrá il-phléartha   | `lkgp`      | Seasmhacht seisiúin                         |

Réanna SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Oiriúnacht Tasc

Níos mó ná 30 samhlacha meáite ar 6 chineál tasc (`coding`, `review`, `planning`, `analysis`, `debugging`, `discussion`). Tacaíonn sé le patrúin whildchaird (m.sh., `*-coder` → scór ard codála).

## Achoimre ar Athróganna Auto

Ag cur san áireamh an `auto` lom (réamhshocrú) chomh maith leis na luachanna 6 `AutoVariant` deimhnithe in `autoPrefix.ts`, tá **7 aitheantas samhlacha inmhuinchomhtháthaithe** ann:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` féin liostann 6 luach; an 7ú rogha é "gan athróg" — `auto` lom — a láimhseálann `parseAutoPrefix()` mar `variant: undefined`.)

## Conas a oireann na leibhéil le Comhcheangal-Auto

Déanann an fheidhm scórála 16-fhachtóir (`open-sse/services/autoCombo/scoring.ts`) diagnóisiú mar dhá chomhartha: `tierPriority` (0.0476) agus `tierAffinity` (0.0476). Féach an
tábla fachtóra canónach [mar a thaispeánann tuilleadh eolais](#how-it-works-persisted-auto-combos) thuas le haghaidh an tsraith iomlán
`DEFAULT_WEIGHTS` — liostaítear na forluí in aghaidh an phearsan (ship-fast/cost-saver/quality-first/
offline-friendly) sa tábla "Próifílí meáchain in aghaidh an phearsan".

Ní dhéanann leibhéal amháin Leibhéal 1 a chur ar dtús — má tá moill Leibhéal 1 go dona nó
má tá costas-vs-íonacht neamhroghnaithe, buann Leibhéal 2. Chun treamhadh leibhéil a chur i bhfeidhm, úsáid straitéis comhcheangail
`priority` agus cuir soláthraithe in ord de réir leibhéil.

Chun leibhéal 1 ( síntiús) a bhfuil sé d'aidhm acu é a shábháil go láidir, méadaigh meáchan `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Féach `docs/marketing/TIERS.md` le haghaidh sainmhínithe leibhéal agus clasacht soláthraithe.

## Tástáil agus Clúdach

### Maitrícs chinntí ríochtála (`npm run test:combo:matrix`)

Déanann `tests/integration/combo-matrix/*.test.ts` deimhniú go bhfuil an cinneadh **riochtála** de gach ceann de na 19
straitéis phoiblí críochnaithe go hiomlán tríd an tseicheamh chomhcheangail fíor le huaschóras meaitseáilte.
Tá an clúdach san áireamh:

- Na 19 straitéis `ROUTING_STRATEGY_VALUES` uile (ordaithe, meáite, costas, comhthéacs, leá, …).
- `quota-share` (inmheánach) críochnaithe go hiomlán: cothromas DRR + tosaíocht sa chomhshó áitiúil trí
  seac `selectQuotaShareTarget` fíor (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Clúdach handoff uilíoch `context-relay` trasna gach cuntas spriocdhírithe.

Ritheann an tsraith seo in CI (`test:integration` post) le `--test-concurrency=1` agus
`--test-force-exit` ionas go bhfuil sé cinntitheach agus nach gá diarbharrantaí beo a bheith ann.

### Smotháiste beo faoi ghlas (NÍL i CI — soláthraithe fíora)

| Ordú                                   | Cad a dhéanann sé                                                                                     |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Ríochtáil fíor in-phróiseas le `RUN.ImageLayoutLIVE=1`; snapshootann sé bunachar sonraí OmniRoute beo |
| `npm run test:combo:live:vps`          | Glaonna HTTP i gcoinne freastalaí OmniRoute beo (socraigh `COMBO_LIVE_BASE_URL`)                      |
| `npm run test:combo:live:vps:failover` | Amhlaidh, le cásanna teip éignithe                                                                    |

Cothaíonn na tástálacha smotháiste seo an cosán fíor sreafa (comhcheangal → soláthraí → críochnú). Tá siad
dílis faoin dearmad ó CI toisc go dteastaíonn diarbharrantaí beo agus rochtain VPS uathu.

## Comhaid

| Comhad                                                    | Cuspóir                                                                                                              |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | feidhm scórála 16-fachtóir, `DEFAULT_WEIGHTS`, norm polla                                                            |
| `open-sse/services/autoCombo/taskFitness.ts`              | méid oiriúnacht samhail × tasc                                                                                       |
| `open-sse/services/autoCombo/engine.ts`                   | loighic roghnúcháin, bandit, huasteorannadh buiséid                                                                  |
| `open-sse/services/autoCombo/selfHealing.ts`              | eisiamh, tóraigh, mód eachtra                                                                                        |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 phróifíl meáchain (seol-tapa, coigilt-costas, cáilíocht-ar dtús, offline-chairdiúil, iontaofacht-ar dtús, mód混乱) |
| `open-sse/services/autoCombo/autoPrefix.ts` + +           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | tógann `AutoComboConfig` i memory ó cheangal beo                                                                     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | cruaibhne tástála le haghaidh sampláil clárlann soláthraíochta                                                       |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 straitéis)                                                                             |
| `src/sse/handlers/chat.ts`                                | comhtháthú: gearrchiorcad réimír auto/                                                                               |
