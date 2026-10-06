# Merge Queue & Manual Merge-Train Runbook (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Ó v3.8.49 (WS3.2/WS3.4 den phlean cáilíochta/luais), is é **ciú cumaisc
Mergify** (`.mergify.yml`) an chonair réamhshocraithe chun PRanna athbhreithnithe a
chumasc isteach in `release/vX.Y.Z`; is ROGHA CHÚLTACA é an **traein chumaisc de láimh**
atá doiciméadaithe thíos — úsáidtear í le linn teagmhas, reo eisiúna, nó má athraíonn
plean Foinse Oscailte Mergify riamh.

## Conair réamhshocraithe: ciú Mergify

1. Déanann na feachtais athbhreithniú ar an PR agus tugann siad stádas glas dó, agus
   ceadaítear é le geata ⭐ réamhchumaisc an úinéara (an tuarascáil + cinneadh in
   aghaidh na míre — féach `/merge-prs` Céim 0.75).
2. Cuireann an t-úinéir (nó an seisiún atá ag gníomhú de réir chinneadh an úinéara)
   an lipéad **`queue`** i bhfeidhm. IS é an lipéad an ceadú cumaisc; ní dhéanann
   Mergify ach é a chur i gcrích.
3. Cuireann Mergify suas le 10 PR atá sa chiú i mbaisc, bailíochtaíonn sé an bhaisc in
   aghaidh na ngeataí tapa, agus cumascann sé iad (squash). Déantar baisc dhearg a
   **dhéroinnt go huathoibríoch** — leithlisítear an PR is cúis leis i
   ~log2(N) athbhailíochtú agus baintear den chiú é; leanann an chuid eile ar aghaidh.
4. Tar éis an chumaisc, bailíochtaíonn an sreabhadh oibre leanúnach glas-eisiúna an
   barr nua nuair a bhrúitear é agus osclaíonn sé saincheist sannacháin má chruthaigh
   an teaglaim cúlchéimniú (ní dhéantar aisiompú uathoibríoch riamh).

Ráillí cosanta (ar aon dul le Rialacha Dochta #21/#22 in `CLAUDE.md`):

- **Reo eisiúna ar siúl** → NÁ cuir lipéad ar PRanna a dhíríonn ar an mbrainse reoite;
  athdhírigh ar an `release/vX+1` gníomhach ar dtús.
- **PR de chuid seisiúin eile atá ar siúl** → ná cuir lipéad air riamh; ní chuireann
  ach an seisiún úinéireachta a chuid oibre féin sa chiú.
- Ritheann difríochtaí tástálacha amháin agus PRanna leis an lipéad `hotfix` CI
  laghdaithe cheana féin (féach `RELEASE_CHECKLIST.md` → Mearlána Hotfix); glacann
  coinníollacha an chiú le cibé tacar seiceálacha a ritheadh i ndáiríre
  (`#check-failure=0` + `#check-pending=0`).

## Rogha chúltaca: an traein chumaisc de láimh

Úsáidtear í nuair nach mbíonn an ciú ar fáil. Códaíonn sé seo an cleachtas lenar
próiseáladh 33 PR in aon lá amháin le linn thimthriall v3.8.47:

1. **Cuir an bhaisc le chéile** (~10–30 PR athbhreithnithe+ceadaithe). Seiceáil
   imbhuailtí `linked:` (na `tap.testFiles` céanna, na míreanna CHANGELOG céanna)
   agus cuir iad sin in ord sraitheach.
2. **Bailíochtaigh UAIR AMHÁIN**: i gcrann oibre leithlisithe bunaithe ar bharr na
   heisiúna, cumaisc gach ceann bhaisce go háitiúil, ansin rith an tsraith atá
   coibhéiseach leis an eisiúint (`npm run check:release-green`; cuir `--with-build`
   leis roimh eisiúint). Déanann `scripts/release/merge-train.sh <base> <PR#>…`
   céimeanna 1–2 a uathoibriú (díbrítear PRanna atá i gcoinbhleacht, agus leanann an
   traein ar aghaidh). Ritheann an mód iomlán `npm run test:unit` — an riteoir atá
   tiúnta don mheaisín (`--test-concurrency=20`), **ní** an dá shlat CI sheicheamhacha
   4 chroí, a d'úsáid an phríomhchéim ag ~25% de mheaisín 16 chroí (ceartaithe
   2026-07-18). Coinníonn `--fast` (próiseálacha olltraenach laistigh den lá, ceadaithe
   ag an úinéir 2026-07-18) gach geata statach + vitest, ach ní ritheann sé ach na
   comhaid node:test a d'athraigh na PRanna a cuireadh ar bord; ní mór an tsraith
   IOMLÁN a rith uair amháin ar a laghad sa lá ar an mbarr carntha (traein amháin
   gan `--fast`).
3. **Glas** → cumaisc na PRanna in ord (agus `state,headRefOid` á athsheiceáil roimh
   gach ceann — filleann PR ar athraíodh a cheann ar an gciú athbhreithnithe).
   Cruthaigh gurb é athrú an PR féin glandifríocht gach cumaisc (gan aisiompuithe
   uathréitigh: déan iniúchadh ar `git diff --stat` le haghaidh scriosadh atá lasmuigh
   den raon feidhme).
4. **Dearg** → déroinn an bhaisc ina leatha (bailíochtaigh gach leath) seachas
   athbhailíochtú ceann ar cheann; cuir an PR is cúis leis ar ais sa chiú athbhreithnithe
   in éineacht leis an bhfianaise.
5. **Ná déan riamh**: cumasc isteach sa bhrainse reoite le linn reo; `git stash` áit
   ar bith; CI a athrith go dall le súil go n-imeoidh stádas dearg (riail: is faisnéis
   é stádas dearg).

## Leibhéalú (cén fáth a bhfuil an ciú sábháilte le geataí tapa amháin)

- **In aghaidh an PR** (geataí tapa quality.yml): tástálacha a mbíonn tionchar TIA
  orthu + aonad iomlán 4 shlat + vitest + beart lint + typecheck + sláine
  doiciméadachta/changelog.
- **In aghaidh na baisce/an bhairr** (glas-eisiúint leanúnach): geataí DOCHTA `--quick`
  ar gach brú chuig brainse na heisiúna; scuabthaí iomlána `--with-build --full-ci`
  3×/lá.
- **In aghaidh na heisiúna** (ci.yml ar PR na heisiúna): an mhaitrís iomlán, lena
  n-áirítear E2E ×9, déantán pacáiste + tástáil thapa tosaithe tarball,
  clúdach/raicíní.

Ní bhailíochtaítear aon rud níos lú ná roimhe seo — ní ritheann an dromchla trom ach
in aghaidh na baisce/an bhairr seachas in aghaidh an PR, agus is é sin a chuireann
deireadh leis na turais O(N) anonn is anall.
