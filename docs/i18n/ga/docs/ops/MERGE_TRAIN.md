# Merge Queue & Manual Merge-Train Runbook (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Ó v3.8.49 (WS3.2/WS3.4 den phlean cáilíochta/luais) i leith, is é **scuaine cumaiscthe Mergify** (`.mergify.yml`) an chonair réamhshocraithe chun PRanna athbhreithnithe a chumasc isteach in `release/vX.Y.Z`;
is é an **traein chumaiscthe láimhe** a dhoiciméadaítear thíos an ROGHA CÚLTACA — úsáidtear í le linn teagmhas,
reoite eisiúna, nó má athraíonn plean Foinse Oscailte Mergify riamh.

## Conair réamhshocraithe: scuaine Mergify

1. Déanann na feachtais athbhreithniú ar an PR agus tugann siad stádas glas dó, agus faigheann sé faomhadh ó gheata ⭐ réamhchumaisc an úinéara
   (an tuairisc + cinneadh de réir míre — féach `/merge-prs` Céim 0.75).
2. Cuireann an t-úinéir (nó an seisiún atá ag gníomhú de réir chinneadh an úinéara) an lipéad **`queue`**
   i bhfeidhm. IS ionann an lipéad agus an faomhadh cumaisc; ní dhéanann Mergify ach é a chur i gcrích.
3. Bailíochtaíonn Mergify PRanna sa scuaine **go srathach** (ceann amháin ag an am) i gcoinne na ngeataí tapa
   agus cumascann sé iad (squash). Baineann baisceáil + déroinnt uathoibríoch le sraith íoctha Mergify
   ("Cannot use Merge Queue batch" ar an bplean saor in aisce, #7220), mar sin ní shocraíonn `.mergify.yml`
   aon `batch_size`; fanann an bhaisceáil mar chúram ar an traein chumaisc láimhe thíos. Baintear PR a bhfuil
   a sheiceálacha fós ar feitheamh tar éis `checks_timeout` (240 nóim = 2× p95 tomhaiste
   `quality.yml`) den scuaine seachas ligean dó an scuaine a stopadh.
4. Tar éis an chumaisc, bailíochtaíonn sreabhadh oibre leanúnach stádas glas na heisiúna an barr nua nuair a bhrúitear é
   agus osclaíonn sé saincheist leithdháilte má tharla cúlchéim sa teaglaim (ní dhéanann sé aisiompú uathoibríoch riamh).

Ráillí cosanta (ar aon dul le Rialacha Dochta #21/#22 in `CLAUDE.md`):

- **Reo eisiúna i bhfeidhm** → NÁ cuir lipéad ar PRanna atá dírithe ar an mbrainse reoite; athdhírigh iad ar
  an `release/vX+1` gníomhach ar dtús.
- **PR de chuid seisiúin eile atá ar siúl** → ná cuir lipéad air choíche; is é an seisiún ar leis é amháin a chuireann
  a chuid oibre féin sa scuaine.
- Ritheann difríochtaí tástálacha amháin agus PRanna a bhfuil an lipéad `hotfix` orthu CI laghdaithe cheana féin (féach
  `RELEASE_CHECKLIST.md` → Mearlána Hotfix); glacann coinníollacha na scuaine le cibé
  tacar seiceálacha a ritheadh i ndáiríre (`#check-failure=0` + `#check-pending=0`).

## Rogha cúltaca: an traein chumaiscthe láimhe

Úsáidtear í nuair nach bhfuil an scuaine ar fáil. Déanann sé seo an cleachtas a d'fholmhaigh 33 PR in
aon lá amháin le linn thimthriall v3.8.47 a chódú:

1. **Cuir an bhaisc le chéile** (~10–30 PR athbhreithnithe+faofa). Seiceáil imbhuailtí `linked:`
   (na `tap.testFiles` céanna, na smutáin CHANGELOG céanna) agus cuir iad sin in ord srathach.
2. **Bailíochtaigh UAIR AMHÁIN**: i worktree leithlisithe bunaithe ar bharr na heisiúna, cumaisc gach
   ceann baisce go háitiúil, ansin rith an tsraith atá coibhéiseach leis an eisiúint
   (`npm run check:release-green`, cuir `--with-build` leis roimh eisiúint).
   Uathoibríonn `scripts/release/merge-train.sh <base> <PR#>…` céimeanna 1–2 (díbrítear PRanna a bhfuil
   coinbhleacht iontu, agus leanann an traein ar aghaidh). Ritheann an mód iomlán `npm run test:unit` — an
   riteoir tiúnáilte don bhosca (`--test-concurrency=20`), **ní** an dá shard CI sheicheamhacha 4 chroí
   a chuir an chéim cheannasach ag ~25% de bhosca 16 chroí (ceartaithe
   2026-07-18). Coinníonn `--fast` (folmhuithe olltraenach laistigh den lá, faofa ag an úinéir 2026-07-18)
   gach geata statach + vitest ach ní ritheann sé ach na comhaid node:test a d'athraigh na
   PRanna a cuireadh ar bord; ní mór an tsraith IOMLÁN a rith uair amháin ar a laghad sa lá ar an
   mbarr carntha (traein amháin gan `--fast`).
3. **Glas** → cumaisc na PRanna in ord (agus `state,headRefOid` á athsheiceáil roimh gach ceann —
   téann PR ar athraíodh a cheann ar ais isteach san athbhreithniú). Cruthaigh gurb é glan-difríocht gach cumaiscthe
   athrú an PR féin (gan aisiompuithe auto-resolve: iniúch `git diff --stat` le haghaidh
   scriosuithe lasmuigh den scóip).
4. **Dearg** → déan an bhaisc a dhéroinnt ina leatha (bailíochtaigh gach leath) in ionad iad a athbhailíochtú
   ceann ar cheann; cuir an PR is cúis leis ar ais sa scuaine athbhreithnithe leis an bhfianaise.
5. **Ná déan riamh**: cumasc isteach sa bhrainse reoite le linn reo; úsáid `git stash` áit ar bith;
   athrith CI ar fad agus súil agat go n-imeoidh toradh dearg (riail: is faisnéis é toradh dearg).

## Srathú (cén fáth a bhfuil an scuaine sábháilte le geataí tapa amháin)

- **In aghaidh an PR** (geataí tapa quality.yml): tástálacha a bhfuil tionchar TIA orthu + aonad iomlán 4-shard +
  vitest + bailiúchán lint + seiceáil cineálacha + sláine doiciméadúcháin/changelog.
- **In aghaidh na baisce/an bhairr** (glas leanúnach na heisiúna): geataí DOCHTA `--quick` ar gach push chuig
  brainse na heisiúna; scuabthaí iomlána `--with-build --full-ci` 3×/lá.
- **In aghaidh na heisiúna** (ci.yml ar PR na heisiúna): an mhaitrís iomlán lena n-áirítear E2E ×9,
  déantán pacáiste + tástáil deataigh tosaithe tarball, cumhdach/ratchets.

Ní dhéantar níos lú bailíochtaithe ar rud ar bith ná mar a rinneadh roimhe seo — ní ritheann an dromchla trom ach in aghaidh na baisce/an bhairr
seachas in aghaidh an PR, agus is é sin a chuireann deireadh leis na turais anonn is anall O(N).

## Réamhriachtanais seiceála amach úir do `merge-train.sh`

Ritheann an script **réamhsheiceáil** a theipeann go luath ar an tseiceáil amach fhréamhach (roimh aon obair
worktree) ionas nach féidir le suiteáil bhriste ligean uirthi féin gur traein dhearg í:

1. `npm ci`, ansin rith an postinstall `bun` a chuireann npm bac air:
   `(cd node_modules/bun && node install.js)` — murach sin teipeann ar `check:provider-consistency`
   agus `check:known-symbols` (an dá cheann acu `bun scripts/…`) ar an traein AGUS ar an mbonn gan
   aon líne sáraithe.
2. Gan aon `node_modules/node_modules` fánach (crann spleáchais dúblach; lódálann React faoi dhó
   agus teipeann ar shraitheanna UI vitest láithreach).
3. `node_modules/.bin/tsc` i láthair agus inrite (ní bhíonn sé i suiteáil pháirteach).

Ritheann an traein an `npm run check:cycles:ratchet` blocála; is comhairleach é `npm run check:cycles`
lom (liostaíonn sé na SCCanna agus scoireann sé le cód neamh-nialasach fiú ar bhonn sláintiúil).
