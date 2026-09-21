# 🗜️ Prompt Compression Guide — OmniRoute (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Sábháil 15-95% go huathoibríoch ar chomhthéacs incháilithe. Le haghaidh forléargas tapa, féach ar an [rannán Comhbhrúite sa README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Forléargas

Cuireann OmniRoute píblíne mhodúlach comhbhrúite leideanna i bhfeidhm a ritheann **go réamhghníomhach** sula sroicheann iarratais soláthraithe réamhtheachtacha. Ciallaíonn sé seo go sábháiltear comharthaí go trédhearcach — ní gá aon athrú a dhéanamh ar do shreabhadh oibre.

```
Iarratas ón gCliant
  → Roghnóir Straitéise Comhbhrúite
    → Sárú teaglaim? → Úsáid socrú na teaglaime
    → Tairseach uath-thionscanta? → Úsáid mód uathoibríoch
    → Mód réamhshocraithe? → Úsáid socrú domhanda
    → Múchta? → Scipeáil an comhbhrú
  → Mód Comhbhrúite Roghnaithe
    → Múchta: Gan chomhbhrú
    → Éadrom: Glanadh sábháilte spás bán/formáidithe (~15%)
    → Caighdeánach: Focail líonta ar nós caint uaimheora a bhaint (~30%)
    → Ionsaitheach: Aosú staire + achoimriú (~50%)
    → Ultra: Bearradh heorastúil + tanú bloic chóid (~75%)
    → RTK: Scagadh aschur teirminéil/uirlisí atá feasach ar orduithe (raon réamhtheachtach 60-90%)
    → Cruachta: Píblíne ordaithe ilinnill, RTK de ghnáth agus Caveman ina dhiaidh (raon incháilithe 78-95%)
  → Iarratas Comhbhrúite → Soláthraí
```

---

## Móid Chomhbhrúite

### Múchta

Ní chuirtear aon chomhbhrú i bhfeidhm. Gabhann gach teachtaireacht tríd gan athrú.

### Mód Éadrom (~15% de choigilteas, aga folaigh <1ms)

An mód is sábháilte — gan aon athrú séimeantach, glanadh formáidithe amháin:

| Teicníc                  | Cur síos                                               |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Cumasc línte bána comhleanúnacha agus spásanna deiridh |
| `dedupSystemPrompt`      | Bain teachtaireachtaí córais dúblacha                  |
| `compressToolResults`    | Comhbhrúigh aschuir fhoclacha uirlisí/feidhmeanna      |
| `removeRedundantContent` | Bain treoracha athráite                                |
| `replaceImageUrls`       | Giorraigh URIanna sonraí íomhá base64                  |

**Is fearr do:** Úsáid bhuan, sreafaí oibre atá criticiúil ó thaobh sábháilteachta de.

### Mód Caighdeánach (~30% de choigilteas)

Arna spreagadh ag [Caveman](https://github.com/JuliusBrussee/caveman) — baineann sé focail líonta agus friotal foclach agus an bhrí á caomhnú aige:

- Baintear focail líonta ("le do thoil", "sílim", "go bunúsach", "i ndáiríre")
- Dlúthaítear frásaí foclacha ("chun" → "le", "mar thoradh ar" → "toisc")
- Baintear maolú béasach ("Ar mhiste leat...", "Dá bhféadfá, b'fhéidir...")
- Breis agus 30 riail regex mionchoigeartaithe do leideanna códúcháin

**Is fearr do:** Sreafaí oibre códúcháin laethúla, foirne atá feasach ar chostais.

### Mód Ionsaitheach (~50% de choigilteas)

Bainistiú cliste staire do sheisiúin fhada:

- **Aosú Teachtaireachtaí** — déantar teachtaireachtaí níos sine a chomhbhrú de réir a chéile
- **Achoimriú Torthaí Uirlisí** — cuirtear achoimrí in ionad aschur fada uirlisí
- **Cosaintí Sláine Struchtúraí** — cinntítear go bhfanann péirí `tool_use` + `tool_result` comhsheasmhach
- **Feasacht ar an bhFuinneog Chomhthéacs** — urramaítear teorainneacha comharthaí gach samhla

**Is fearr do:** Seisiúin fhada dífhabhtaithe, bunachair mhóra cód.

### Mód Ultra (~75% de choigilteas)

An comhbhrú uasta do chásanna ina bhfuil comharthaí ríthábhachtach:

- **Bearradh Heorastúil** — baintear teachtaireachtaí atá faoi bhun na tairsí ábharthachta
- **Tanú Bloic Chóid** — comhbhrúitear samplaí cód athráiteacha
- **Teascadh trí Chuardach Dénártha** — aimsítear an pointe gearrtha is fearr don fhuinneog chomhthéacs
- Gach gné den mhód Ionsaitheach san áireamh

**Is fearr do:** Nuair a bhíonn tú ag sroicheadh teorainneacha comhthéacs arís agus arís eile.

### Mód RTK (raon réamhtheachtach 60-90%)

Tá mód RTK optamaithe d'aschuir fhoclacha uirlisí a bhíonn le feiceáil i seisiúin gníomhairí códúcháin:

- Aimsíonn sé aicmí ordaithe/aschuir amhail `git status`, `git diff`, `git log`, riteoirí tástála,
  tógálacha TypeScript/Vite/Webpack, ESLint/Biome/Prettier, iniúchtaí/suiteálacha npm, logaí Docker, aschur
  bonneagair, agus aschur ginearálta blaosca
- Cuireann sé pacáistí scagairí JSON ó `open-sse/services/compression/engines/rtk/filters/` i bhfeidhm
- Iompórtálann sé scagairí scéimre v1 RTK TOML ó chomhaid tionscadail nó dhomhanda `filters.toml`, maille le
  bailíochtú tástála inlíne agus geatú iontaoibhe do chomhaid tionscadail
- Tagann sé le 49 scagaire ionsuite agus samplaí fíoraithe inlíne
- Baineann sé seichimh rialaithe ANSI, barraí dul chun cinn, línte athráiteacha agus torann nach féidir gníomhú air
- Caomhnaíonn sé teipeanna, earráidí, rabhaidh, comhaid athraithe, achoimrí agus deireadh aschuir fhada
- Tacaíonn sé le scagairí tionscadail faoi gheata iontaoibhe, scagairí domhanda agus aisghabháil roghnach aschuir amh faoi cheilt

**Is fearr do:** Seisiúin ghníomhairí ina bhfuil tras-scríbhinní blaosca, tógála, tástála, git, grep agus aschuir comhad.

### Mód Cruachta (raon incháilithe 78-95%)

Ritheann an mód Cruachta innill chomhbhrúite iolracha in ord cinntitheach. Is í seo an phíblíne réamhshocraithe:

```txt
RTK -> Caveman
```

Leis an ord sin coinnítear aschur teirminéil/uirlisí dlúth ar dtús, agus ansin cuirtear dlúthú séimeantach Caveman i bhfeidhm ar
an leid teanga nádúrtha atá fágtha. Is féidir píblínte cruachta a chumrú go domhanda nó trí
theaglamaí comhbhrúite a shanntar do theaglamaí ródaithe.

**Is fearr do:** Comhthéacs measctha ina bhfuil logaí móra uirlisí chomh maith le treoracha daonna nó achoimrí cúntóra.

---

## Matamaitic na gCoigilteas Réamhtheachtach

Déanann OmniRoute coigilteas comhbhrúite a dhoiciméadú ó dhá fhoinse: tagarmharcanna tionscadail réamhtheachtacha agus
comhdhéanamh innill OmniRoute féin.

| Foinse  | Uimhir ón README réamhtheachtach a úsáidtear anseo                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` níos lú comharthaí aschuir, `65%` de mheánchoigilteas aschuir tagarmhairc, raon `22-87%`, agus uirlis comhbhrúite ionchuir `~46%` |
| RTK     | Coigilteas `60-90%` ar aschur orduithe; seisiún samplach `~118,000 -> ~23,900` comhartha, nó `79.7%` sábháilte (`~80%`)                  |

I gcás pálastaí uirlise/comhthéacs atá ag forluí, cruachann teaglaim réamhshocraithe OmniRoute na hinnill:

```txt
RTK -> Caveman
```

Is iolraitheach, ní suimitheach, atá an coigilteas comhcheangailte:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Baineann an uimhir `78-95%` sin le cásanna inar féidir le RTK agus Caveman araon an pálasta ionchuir/comhthéacs céanna a laghdú.
Tá mód aschuir freagartha Caveman ar leithligh: nuair atá sé cumasaithe, úsáid coigilteas aschuir Caveman féin (`65%`
ar an meán, `~75%` sa cheannlíne, raon `22-87%`). Braitheann coigilteas iomlán billeála ar do mheascán leideanna/aschuir.

### Cad is brí le "incháilithe" i ndáiríre

Tá raon ceannlíne 15-95% fíor, ach ní bhaineann sé ach le hábhar **iomarcach nó fadálach** — línte
earráide athdhéanta, loga tógála a chuireann an rabhadh céanna amach arís agus arís eile, dumpa rómhór ó `grep`/léamh comhaid. Ní
chiallaíonn sé **nach mór** go sábhálann gach iarratas an oiread sin.

Fíoraithe go heimpíreach (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): tháirg
rith `stacked` (RTK + Caveman) ar bhloc `tool_result` de chruth Anthropic ina raibh 300 líne earráide chomhionanna
**coigilteas comharthaí 95.93% / coigilteas carachtar 96.26%** — go díreach laistigh den raon a fógraíodh.
Ach nuair a ritheann an phíblíne chéanna ar ghnáth-aschur uirlise nach bhfuil iomarcach (liosta glan meaitseálacha `grep`,
léamh gairid comhaid, gnáth-théacs comhrá), táirgeann sí **coigilteas atá gar do náid** mar is ceart, toisc
nach bhfuil aon rud athchleachtach le baint agus diúltaíonn `validateCompression()` (`validation.ts`) athscríobh a sheoladh
a bhainfeadh nó a d’athródh bloic chóid, URLanna, ceannteidil, leaganacha, nó aitheantóirí tairiseacha i gCEANNLITREACHA AMHÁIN.

Is iompar sábháilte ionchais é seo, ní fabht: i seisiún códaithe ina ndéantar comhaid ghlana a léamh/a chuardach le `grep` den chuid is mó,
beidh coigilteas iomlán measartha ann fiú agus comhbhrú lánchumasaithe, ach i seisiún ina dtarlaíonn
lúb theipthe nó lintéir cainteach, feicfear an raon iomlán 78-95% ar an trácht sin. Ná húsáid céatadán íseal
coigiltis chomhiomláin ó sheisiún amháin mar fhianaise go bhfuil an comhbhrú míchumraithe — seiceáil ar dtús an raibh
aschur bunúsach na huirlise iomarcach i ndáiríre.

---

## Amharcléiriú ar Choigilteas Comharthaí

```
Gan chomhbhrú:       47K comhartha seolta chuig LLM
Le Lite:             40K comhartha seolta          (15% sábháilte — sábháilte, ar siúl i gcónaí)
Le Standard:         33K comhartha seolta          (30% sábháilte — rialacha cainte Caveman)
Le Aggressive:       24K comhartha seolta          (50% sábháilte — aosú + achoimriú)
Le Ultra:            12K comhartha seolta          (75% sábháilte — bearradh heorastúil)
Le RTK:              19K-5K comhartha seolta       (60-90% sábháilte ar aschur orduithe/uirlisí)
Le Stacked:          10K-2.5K comhartha seolta     (raon incháilithe RTK+Caveman de 78-95%)
```

---

## Cumraíocht

### Painéal

Téigh chuig `Dashboard → Context & Cache`:

- **Caveman** — roghnú mód, pacáistí teanga, réamhamharc agus réamhshocruithe domhanda
- **RTK** — réamhamharc ar scagaire orduithe, socruithe sábháilteachta RTK agus catalóg scagairí
- **Teaglamaí Comhbhrúite** — píblínte innill ainmnithe a shanntar do theaglamaí ródaithe
- **Tairseach Uathspreagtha** — cuir comhbhrú i ngníomh go huathoibríoch nuair a sháraíonn líon na dtóicean an tairseach

### Sárú de réir Teaglama

In `Dashboard → Context & Cache → Compression Combos`, sann teaglama comhbhrúite do theaglama
ródaithe:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ligeann sé seo duit comhbhrú cruachta a úsáid ar sholáthraithe saor in aisce/códúcháin agus an mód
éadrom a choinneáil ar shíntiúis íoctha.

Is rialtán éagsúil é an sannadh "Sárú de réir Teaglama" seo ón sárú ar **mhód comhbhrúite an
teaglama ródaithe** (Réamhshocrú/As/Éadrom/Caighdeánach/Ionsaitheach/Ultra) — ní roghnaíonn an sárú sin
píblíne ainmnithe teaglama comhbhrúite; ní dhéanann sé ach an réimse `compressionMode` a shocrú, réimse
a dtéann `resolveCompressionPlan` i gcomhairle leis. Is féidir é a shocrú ar chárta an teaglama
(`Dashboard → Combos`) nó, ó #6760 i leith, de réir teaglama ródaithe sa liosta "Assign to routing" ag
`Dashboard → Context & Cache → Compression Combos`, díreach in aice leis an ticbhosca sannacháin
píblíne atá doiciméadaithe thuas. Coinnítear sonraí ón dá chomhéadan tríd an gcríochphointe céanna
`PUT /api/combos/{id}`.

### Sárú de réir iarratais

Seol ceanntásc iarratais `x-omniroute-compression` chun an plean comhbhrúite a shárú d’iarratas
amháin. Tá an tosaíocht is airde aige — sáraíonn sé sárú an teaglama ródaithe, an phróifíl ghníomhach,
an t-uathspreagadh agus Réamhshocrú an phainéil. Déantar neamhaird de luachanna anaithnide (ní
dhiúltaítear don iarratas riamh) agus rialaíonn an máistirlasc domhanda gach rud fós: nuair atá
comhbhrú múchta go domhanda, ní féidir leis an gceanntásc é a chur ar siúl. Luachanna:

| Luach         | Éifeacht                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| `off`         | Gan aon chomhbhrú don iarratas seo.                                                                        |
| `default`     | Próifíl Réamhshocraithe a dhíorthaítear ón bpainéal (déantar neamhaird den phróifíl ghníomhach).           |
| `engine:<id>` | Inneall amháin nuair atá sé cumasaithe, e.g. `engine:rtk`.                                                 |
| `<combo>`     | Teaglama ainmnithe, meaitseáilte de réir ainm ar dtús (gan beann ar chás), agus ansin de réir aitheantais. |

Seoltar an plean a cuireadh i bhfeidhm ar ais i gceanntásc freagartha
`X-OmniRoute-Compression: <mode>; source=<source>`, áit a bhfuil `<source>` ar cheann de
`request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, nó `off`.

### API

```bash
# Faigh socruithe comhbhrúite
curl http://localhost:20128/api/settings/compression

# Nuashonraigh socruithe comhbhrúite
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Réamhamharc ar phálasta sonrach RTK/cruachta
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Liostaigh pacáistí scagairí RTK
curl http://localhost:20128/api/context/rtk/filters

# Tástáil RTK go díreach le meiteashonraí roghnacha ordaithe
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Cad a Chosnaítear

Caomhnaíonn an t-inneall comhbhrúcháin **i gcónaí:**

- ✅ Bloic chóid (fálaithe agus inlíne)
- ✅ URLanna agus conairí comhaid
- ✅ Struchtúir JSON agus sonraí struchtúrtha
- ✅ Aitheantóirí agus comharthaí teicniúla cosanta
- ✅ Sloinn mhatamaiticiúla
- ✅ Sainmhínithe glaonna uirlise/feidhme
- ✅ Leideanna córais (sa mhód lite)

Folaíonn aisghabháil amh-aschuir RTK eochracha coitianta API, comharthaí iompróra, comharthaí Slack, eochracha rochtana AWS,
pasfhocail, comharthaí agus rúin sula ndéantar aon rud a bhuanú.

---

## Staitisticí Comhbhrúcháin

Áirítear staitisticí i logaí an fhreastalaí le gach iarratas comhbhrúite:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Treochlár na gCéimeanna

| Céim    | Móid                                                                                                                                                         | Stádas     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Céim 1  | Off, Lite                                                                                                                                                    | ✅ Eisithe |
| Céim 2  | Standard, Aggressive, Ultra                                                                                                                                  | ✅ Eisithe |
| Céim 3  | RTK, Stacked, Teaglamaí Comhbhrúcháin                                                                                                                        | ✅ Eisithe |
| Céim 4  | Stíleanna Aschuir, Ultra ar leibhéal SLM, creat eval                                                                                                         | ✅ Eisithe |
| Céim 4C | Buiséad comhthéacs oiriúnaitheach ("diail") — inneall ríofa + API (`contextBudget` ar `PUT /api/settings/compression`) + rialuithe móid/beartais ar an deais | ✅ Eisithe |

---

## Admhálacha

Tá rialacha comhbhrúcháin an mhóid Standard spreagtha ag **[Caveman](https://github.com/JuliusBrussee/caveman)** le **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — an tionscadal víreasach "why use many token when few token do trick". Tuairiscíonn Caveman `~75%` níos lú comharthaí aschuir, meánchoigilt `65%` ar aschur tagarmhairc, raon aschuir `22-87%`, agus uirlis comhbhrúcháin ionchuir `~46%`.

Tá mód RTK spreagtha ag **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** le **[RTK AI](https://github.com/rtk-ai)** — an tionscadal ardfheidhmíochta comhbhrúcháin aschur orduithe le haghaidh scagadh teirminéil, tógála, tástála, git agus aschur uirlisí. Tuairiscíonn RTK coigilteas `60-90%`, agus léiríonn an seisiún samplach ina README gur sábháladh `~80%`.

---

## Ardchórais Chomhbhrúcháin

Taobh amuigh de na 7 mód chaighdeánacha, áirítear in OmniRoute roinnt ardchóras comhbhrúcháin
a oibríonn go huathoibríoch bunaithe ar chomhthéacs.

### Comhbhrú Feasach ar Thaisce

Tacaíonn roinnt soláthraithe (ar nós Anthropic le taisceadh leideanna) le **taisceadh leideanna**,
rud a ligeann dóibh codanna den leid a chur i dtaisce chun costais agus aga folaigh a laghdú. Nuair a
chumasaítear taisceadh, is féidir le comhbhrú ionsaitheach **dochar** a dhéanamh don fheidhmíocht
toisc go n-athraíonn sé na comharthaí taiscthe, rud a neamhbhailíonn an taisce.

Réitíonn an modúl `cachingAware.ts` é seo trí **chomhthéacs taiscthe a bhrath** agus
**an straitéis chomhbhrúcháin a choigeartú** dá réir.

#### Conas a oibríonn sé

1. **Braith comhthéacs taiscthe** — Scanann sé corp an iarratais le haghaidh marcóirí `cache_control`
2. **Sainaithin soláthraithe taiscthe** — Seiceálann sé an dtacaíonn an spriocsholáthraí le taisceadh
3. **Coigeartaigh an straitéis** — Íslíonn sé `aggressive`/`ultra` go `standard` do sholáthraithe taiscthe
4. **Scipeáil leid an chórais** — Is gnách go mbíonn leideanna córais i dtaisce, mar sin ná comhbhrúigh iad
5. **Úsáid claochluithe cinntitheacha** — Ná húsáid ach claochluithe a tháirgeann aschur comhsheasmhach

#### Sampla cóid

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Marcóir taisce
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Cathain ba cheart é a úsáid

Bíonn comhbhrú feasach ar thaisce **ar siúl i gcónaí** — ní theastaíonn aon chumraíocht. Ní chuirtear i ngníomh é
ach amháin nuair:

- A bhíonn marcóirí `cache_control` san iarratas
- A thacaíonn an spriocsholáthraí le taisceadh leideanna (Anthropic, OpenAI, srl.)

### Aosú Forchéimnitheach

Carnann comhráite fada go leor babhtaí teachtaireachtaí, ach éiríonn babhtaí níos sine níos lú
ábhartha. **Díghrádaíonn an modúl `progressiveAging.ts` teachtaireachtaí de réir fad na mbabhtaí**:

- **Babhtaí le déanaí (0-3)**: Coinnítear focal ar fhocal iad (sonraí iomlána)
- **Babhtaí meánacha (4-8)**: Comhbhrú Lite (glanadh spás bán agus formáidithe)
- **Seanbhabhtaí (9+)**: Comhbhrú Caveman (ábhar líonta a bhaint, achoimriú)
- **Babhtaí an-sean (20+)**: Déantar achoimriú mór orthu nó fágtar ar lár iad

#### Sampla cóid

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 babhta eile ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Na chéad 3 bhabhta: focal ar fhocal
  light: 8, // Babhtaí 4-8: comhbhrú lite
  moderate: 20, // Babhtaí 9-20: comhbhrú caveman
  // Babhtaí 21+: achoimriú trom
});

// saved = líon na gcomharthaí a sábháladh
```

#### Cathain ba cheart é a úsáid

Bíonn aosú forásach **ar siúl i gcónaí** do na móid `aggressive` agus `ultra`. Tá sé
an-éifeachtach go háirithe le haghaidh:

- Seisiúin fhada chódúcháin
- Comhráite a mhaireann roinnt laethanta
- Sreafaí oibre gníomhaireacha ina mbíonn go leor glaonna uirlise

### Mód Aschuir Uaimhfhir

Insteallann an modúl `outputMode.ts` **treoracha leid córais** chun a chur ar an
tsamhail féin aschur comhbhrúite, gonta a tháirgeadh (stíl “uaimhfhir”).

#### Conas a oibríonn sé

In ionad an t-ionchur a chomhbhrú, cuireann an mód seo leid córais leis mar seo:

> “Freagair leis an líon is lú focal. Fág cúirtéisí ar lár. Úsáid abairtí gearra.”

Oibríonn sé seo go han-mhaith le haghaidh:

- Giniúint cóid (aschur níos gonta = níos lú comharthaí)
- Ceisteanna agus freagraí tapa (níl gá le mínithe mionsonraithe)
- Próiseáil bhaisc (uasmhéadaigh tréchur)

#### Cathain is ceart é a úsáid

Is gné **roghnach** é mód aschuir an uaimhfhir — socraigh é tríd an gcumraíocht teaglama:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Stíleanna Aschuir (catalóg)

Is é mód aschuir an uaimhfhir thuas an **chonair oidhreachta aonstíle**. Ghinearáltaigh Céim 4 é
ina chatalóg de stíleanna aschuir inchumtha: `OUTPUT_STYLE_CATALOG` in
`open-sse/services/compression/outputStyles/catalog.ts`. Is treoir leid córais é gach stíl
a chuireann ar an tsamhail féin aschur níos saoire a tháirgeadh; is féidir stíleanna a chumasú
le chéile agus instealltar iad in ord na catalóige.

| Stíl                                              | `id`          | Cad a dhéanann sí                                                                                                                                                                                                                | Teangacha treoracha                                                                  |
| ------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Prós gonta                                        | `terse-prose` | Fágann sí líonfhocail/ailt/fálú ar lár; coinníonn sí an tsubstaint theicniúil cruinn. An téacs céanna le mód oidhreachta aschuir an uaimhfhir (tagartha, gan a bheith athchlóscríofa).                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Níos lú cóid                                      | `less-code`   | Dréimire YAGNI: an t-athrú oibre is lú, gan astarraingtí nár iarradh.                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Eireaball capaill (forbróir sinsearach leisciúil) | `ponytail`    | “Is é an cód is fearr an cód nár scríobhadh riamh”: athúsáid > athscríobh, bunchúis > siomptóm, an difríocht oibre is giorra.                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| Tá ADHD orm (gníomh ar dtús)                      | `i-have-adhd` | Gníomh ar dtús (ordú/conair/blúire roimh phrós), céimeanna uimhrithe teoranta, AON chéad chéim nithiúil eile, gan bhrollach/achoimre/chlábhsúr. Oiriúnaithe ó [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                        |
| CJK gonta (文言)                                  | `terse-cjk`   | Stíl ultra-ghonta na Sínise Clasaicí.                                                                                                                                                                                            | zh (teoranta de réir locale: ní thairgtear í ach nuair is é `zh` an teanga réitithe) |

Tagann trí leibhéal déine le gach stíl — `lite`, `full`, `ultra` — agus críochnaíonn gach leibhéal
leis an gclásal comhroinnte teorainneacha, a choinníonn bloic chóid, conairí comhaid, orduithe,
teaghráin earráide, URLanna agus aitheantóirí focal ar fhocal.

#### Conas a oibríonn an t-instealladh

Réitíonn `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)
an roghnú in aghaidh na catalóige (caitear aitheantais anaithnide agus stíleanna nach meaitseálann an locale
amach, agus ní earráid é sin riamh), comhchaitíonn sé na treoracha roghnaithe in ord na catalóige,
iarcheanglaíonn sé an clásal teorainneacha **uair amháin**, agus cuireann sé an toradh ag tosach na leide
córais taobh thiar d'aon mharcóir idé-idéineachta amháin (`[OmniRoute Output Styles]`) — ní dhéanann
athfheidhmiú faic. Nuair a bhíonn aistriúchán ar fáil do theanga bhraite an iarratais, instealltar
an treoir logánaithe in ionad an Bhéarla.

#### Conas é a chumasú

Sa deais: **Comhthéacs → Socruithe → Comhbhrú** — ró amháin in aghaidh na stíle ina bhfuil
scorán ann/as agus roghnóir leibhéil. Go ríomhchláraitheach, coimeádann an chumraíocht chomhbhrúite
an roghnú mar seo:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Comhoiriúnacht siar: oibríonn an socrú teaglama oidhreachta `outputMode: "caveman"` fós agus mapálann sé chuig
`terse-prose`, atá comhionann beart ar bheart leis an sean-instealladh i ngach teanga oidhreachta.

Roghnú teanga: agus `languageConfig.enabled` ar siúl, roghnaíonn `autoDetect`
teanga na teachtaireachta úsáideora is déanaí (an brathadóir céanna leis na hinnill ionchuir);
má mhúchtar `autoDetect`, socraítear `defaultLanguage`. As → Béarla.

Tá an mhaitrís stíle × teanga fosaithe ag
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: ní féidir stíl nua a eisiúint
gan aistriúchán pt-BR ar a laghad (nó eisceacht shainráite atá á rianú), agus ní féidir
le stíl atá ann cheana locale a chailleadh go ciúin. Chun stíl a chur leis, féach
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Comhbhrú Torthaí Uirlise

Soláthraíonn an modúl `toolResultCompressor.ts` **5 straitéis chomhbhrúite speisialaithe**
do thorthaí uirlise (glaonna feidhme, aschuir ghníomhairí, torthaí cuardaigh, etc.):

1. **Comhbhrú torthaí cuardaigh** — Baintear torthaí iomarcacha, coinnítear an N ceann is fearr
2. **Comhbhrú léite comhaid** — Teasctar comhaid mhóra, caomhnaítear ceanntásca/iompórtálacha
3. **Comhbhrú rite cóid** — Ní choinnítear ach stdout/stderr riachtanach
4. **Comhbhrú iarratais bunachair sonraí** — Cuirtear teorainn le rónna, baintear meiteashonraí foclach
5. **Comhbhrú freagartha API** — Baintear réimsí nialasacha, comhdhlúthaítear eagair

#### Cathain is ceart é a úsáid

Bíonn comhbhrú torthaí uirlise **ar siúl i gcónaí** nuair a bhíonn glaonna uirlise ann. Níl aon
chumraíocht de dhíth.

### Píblíne Chruachta

Ritheann an mód cruachta **innill iolracha i seicheamh** — RTK ar dtús de ghnáth
(coigilteas 60-90% ar aschur uirlise), agus Caveman ina dhiaidh sin (coigilteas breise 30% ar an
téacs atá fágtha). Baintear **coigilteas iomlán 78-95%** amach leis seo.

#### Conas a oibríonn sé

```
Ionchur (1000 comhartha)
  → RTK (scagaire atá feasach ar orduithe) → 200 comhartha
    → Caveman (baint líonfhocal) → 140 comhartha
  → Aschur (140 comhartha, coigilteas 86%)
```

#### Cathain is ceart é a úsáid

Úsáid an mód cruachta le haghaidh:

- Sreafaí oibre ina n-úsáidtear go leor uirlisí (códú gníomhaireach, taighde)
- Próiseáil bhaisc atá íogair ó thaobh costais de
- Nuair a bhíonn an coigilteas comharthaí is mó de dhíth ort

Cumraigh trí theaglama:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Sáruithe ar Chomhcheangail Chomhbhrúite

Is féidir leat an mód comhbhrúite domhanda a shárú **do gach comhcheangal ar leith** chun an t-iompar a mhionchoigeartú
do chásanna úsáide éagsúla:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Tá sé seo úsáideach do:

- **Comhcheangail chódúcháin**: Úsáid an mód `aggressive` le haghaidh seisiúin fhada
- **Comhcheangail tapa ceisteanna agus freagraí**: Úsáid an mód `lite` le haghaidh freagraí tapa
- **Comhcheangail ina n-úsáidtear go leor uirlisí**: Úsáid an mód `stacked` chun an coigilteas is mó a bhaint amach
- **Comhcheangail táirgthe**: Úsáid an mód `cache-aware` do sholáthraithe a úsáideann taisceadh

---

## Féach Freisin

- [Cumraíocht Timpeallachta](../reference/ENVIRONMENT.md) — Athróga timpeallachta comhbhrúite
- [Treoir Ailtireachta](../architecture/ARCHITECTURE.md) — Oibriú inmheánach na píblíne comhbhrúite
- [Treoir Úsáideora](../guides/USER_GUIDE.md) — Tús a chur le comhbhrú
- [Comhbhrú RTK](./RTK_COMPRESSION.md) — Scagairí RTK, samhail iontaoibhe, geata fíorúcháin, aisghabháil aschuir amh
- [Innill Chomhbhrúite](./COMPRESSION_ENGINES.md) — Caveman, RTK, cruachta, APIanna, MCP, deais
- [Formáid Rialacha Comhbhrúite](./COMPRESSION_RULES_FORMAT.md) — Formáid pacáiste rialacha JSON
- [Pacáistí Teanga Comhbhrúite](./COMPRESSION_LANGUAGE_PACKS.md) — Rialacha Caveman a bhaineann go sonrach le teangacha
