# Release-Green: keeping the queue and release branch green (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## An fhadhb a réitíonn sé seo

Ní ritheann an **geata iomlán** (`.github/workflows/ci.yml` — deighiltí aonad, vitest, ratchets,
`package-artifact`, SonarQube, E2E) ach **ar an PR eisiúna** (PR → `main`). Faigheann PRanna a dhíríonn ar
`release/**` na **fast-gates** (`quality.yml`: tástálacha a bhfuil tionchar TIA orthu + seiceáil cineáil + lint)
agus, i gcás athruithe ar an gcód, tiomsú táirgeachta **comhairleach**. Mar thoradh air sin, is féidir le teipeanna a bhaineann leis an eisiúint amháin
carnadh go ciúin ar an mbrainse eisiúna agus **pléascadh i sraitheanna de ~40 nóiméad** tráth na heisiúna,
ceann i ndiaidh a chéile.

Tá an "teaghlach release-green" ann chun **réamh-mheas** a dhéanamh ar na teipeanna sin — coibhéis an gheata iomláin a bhailíochtú
**go háitiúil / lasmuigh den eisiúint**, am ar bith, ionas go mbeidh an PR eisiúna
glas cheana féin ar a chéad rith CI.

> **Prionsabal doshannta:** ní chuireann aon chuid de seo bac ar an ranníocóir. Ní chuirimid seiceáil riachtanach leis
> a dteipeann ar a PR dá barr. Is faoin gcothaitheoir atá an **drift** (ratchets) a athbhunlíniú tráth na heisiúna —
> ní cúram don ranníocóir é riamh. Ní **dhúnann** aon chuid PR (goid creidiúna) ná ní
> **lagaíonn** sí tástáil chun go n-éireoidh léi.

## An teaghlach (4 chuid) — agus an chaoi a ritheann gach ceann acu go neamhspleách

| Cuid                                                                       | Cad atá ann                                                                                      | Cathain ba cheart é a rith                                                           | Raon feidhme                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------- |
| **`/green-prs`** (Réiteach A)                                              | Scanadh ar éileamh ag an gcothaitheoir ar **chiú na PRanna oscailte**                            | **Go neamhspleách, go tréimhsiúil** — agus go háirithe **roimh** `/generate-release` | Ciú iomlán na PRanna → `release/**` |
| **`/validate-release-green`** (Réiteach C — `npm run check:release-green`) | Inneall bailíochtaithe: athchruthaíonn sé an geata iomlán i gcoinne brainse NÓ iarrthóra cumaisc | Go neamhspleách, am ar bith                                                          | Brainse sonrach nó PR cumaisc       |
| **`/babysit <PR#>`**                                                       | Tiomáineann sé **CI beo** PR **amháin** go dtí go mbíonn sé glas                                 | Go neamhspleách, in aghaidh an PR                                                    | PR aonair                           |
| **`nightly-release-green.yml`** (Réiteach D)                               | Sreabhadh oibre uathoibrithe oíche; osclaíonn sé saincheist i gcás teipe CRUA                    | Uathoibríoch (cron)                                                                  | An brainse eisiúna gníomhach        |

**Freagra gairid ar "an mbaineann sé seo le heisiúintí amháin?":** **ní bhaineann.** Dearadh `/green-prs` le
rith **go tréimhsiúil, idir eisiúintí**. Is é rith go neamhspleách an gnáthúsáid — níl san eisiúint ach
an tráth is mó a bhíonn luach ag baint lena rith.

## Tógáil chomhairleach ó PR go heisiúint

Áirítear anois in `quality.yml` `Build (advisory)` le haghaidh PRanna cód nach dréachtaí iad agus brainsí scuaine Mergify.
Leanann sé oideas tógála na táirgeachta ó `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, agus `npm run build` le `OMNIROUTE_USE_TURBOPACK=1`. D’aon ghnó,
ní uaslódálann sé déantán tógála toisc nach n-úsáideann aon jab cáilíochta iartheachtach ceann sa sreabhadh oibre seo.
Bain `continue-on-error` tar éis seachtain amháin de rití cobhsaí PR eisiúna ionas go mbeidh an comhartha ina
gheata blocála ó PR go heisiúint.

## Réiteach C — `npm run check:release-green` (an t-inneall)

Atáirgeann sé bailíochtú atá coibhéiseach le heisiúint i gcoinne an chrainn oibre reatha agus aicmíonn sé gach toradh dearg:

- **HARD** (seiceáil cineáil, earráidí lint, aonad, vitest, db-rules, public-creds, `package-artifact`
  roghnach) → **fíorfhabht**; `exit 1`. Ceartaítear é ar an mbrainse foinseach (TDD, Riail #18).
- **DRIFT** (**rabhaidh** eslint, castacht chognaíoch, méid comhaid) → diall raicéid a carnadh sa
  timthriall, **ní ar an ranníocóir atá an locht**; ní dhéantar ach é a thuairisciú agus déanann an cothaitheoir
  **athbhunlíniú air tráth na heisiúna**. Ní athraíonn diall an cód scoir **riamh** — mar sin ní chuireann sé bac ar aon duine riamh.

```bash
npm run check:release-green                 # an brainse reatha (crann oibre)
node scripts/quality/validate-release-green.mjs --json   # aschur struchtúrtha
node scripts/quality/validate-release-green.mjs --quick  # scipeálann sé aonad+vitest (diall+seiceáil cineáil+lint amháin)
node scripts/quality/validate-release-green.mjs --with-build  # áirítear package-artifact (mall)
```

Ní dhéanann sé ach diagnóisiú agus **tuairisciú** (gan uathcheartú). Tá an t-ollstiúradh chun stádas glas a bhaint amach in
`/green-prs` agus `/review-prs`.

## Réiteach A — `/green-prs` (scanadh na scuaine)

Nós imeachta (achoimre — féach an scil `green-prs` le haghaidh sonraí):

1. Déan **fardal** de scuaine na PRanna oscailte i gcoinne an bhrainse eisiúna ghníomhaigh.
2. Déan **triáis** ar gach PR (inmharthana / is fiú a dhiúltú / údar de dhíth) — déantar PRanna lena ndiúltú nó a bhfuil údar de dhíth orthu a
   **thuairisciú, ní a dhúnadh** (is é an t-údar a chinneann).
3. I gcás gach PR inmharthana, i **gcrann oibre leithlisithe** (Riail #19), tabhair an PR go barr an bhrainse eisiúna agus rith
   `npm run check:release-green`:
   - **HARD** → ceartaigh **ar bhrainse an ranníocóra** trí chomhúdaracht (caomhnaítear stádas "Merged" an údair),
     rith arís é go dtí go mbeidh gach toradh HARD glanta.
   - **DRIFT** → fág é; déanfar é a athbhunlíniú tráth na heisiúna.
4. **Tuairiscigh** tábla PR × (breithiúnas, torthaí dearga HARD, ceartaithe?, DRIFT, réidh don eisiúint anois?).

Is féidir an scuaine a **ullmhú** gan chumasc; ní chumascann sé ach nuair a iarrtar sin go sainráite — agus ní dhúnann sé PR riamh.

## Minicíocht mholta

- Rith **`/green-prs` go tréimhsiúil** (m.sh., go seachtainiúil) agus **i gcónaí roimh
  `/generate-release`**.
- Coinnigh **`nightly-release-green.yml`** (Réiteach D) mar chomhartha leanúnach: nuair a osclaíonn sé saincheist
  dhearg HARD, tá sé in am scanadh a dhéanamh.
- Úsáid **`/validate-release-green`** de réir mar is gá chun brainse nó iarrthóir cumaisc ar leith a sheiceáil.
- Úsáid **`/babysit <PR#>`** nuair is gá PR ar leith a thabhairt go stádas glas ar CI beo.

## Gaol leis an eisiúint

- Glaonn `/generate-release` ar bhailíochtú i **gCéim 0 (réamhsheiceáil)**: déanann sé DRIFT a athbhunlíniú agus
  HARD a cheartú sula n-osclaítear an PR eisiúna.
- Úsáideann `/review-prs` geata an stádais ghlais eisiúna ag céim an chinnidh cumaisc (glas-roimh-chumasc).

Is é an sprioc chéanna atá ag gach cuid: **PR eisiúna glas ar an gcéad rith CI**, in ionad dul ó
thoradh dearg go toradh dearg i sraitheanna 40 nóiméad ar lá na heisiúna.
