# ADR: Pluggable persistence boundary (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **Stádas:** Molta — teastaíonn faomhadh ó chothabhálaí sula gcuirtear tús le hobair ama rite
- **Saincheist rianaithe:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Raon feidhme:** Ailtireacht bhuanseasmhachta amháin; ní chuireann an cinneadh seo bunachar sonraí seachtrach leis ná ní roghnaíonn sé ceann

## Comhthéacs

Cuireann OmniRoute feidhmeanna buanـseasmhachta atá dírithe ar an bhfearann ar fáil faoi láthair ó `src/lib/db/`, agus cuireann an nasc comhroinnte a fhilleann `src/lib/db/core.ts` an conradh sioncronach `SqliteAdapter` in `src/lib/db/adapters/types.ts` i bhfeidhm. Tacaíonn an cuibheoir sin le roinnt timpeallachtaí ama rite SQLite, ach tá cruth SQLite ar a dhromchla fós: ráitis ullmhaithe shioncronacha, `pragma`, idirbhearta iarchurtha agus láithreacha, cúltaca dúchasach/trí chóipeáil comhaid, seicphointe, agus hanla áitiúil bunachair sonraí.

Is leis an gcosán tosaithe agus athshlánaithe reatha saolré an chomhaid SQLite freisin. Réitíonn `src/lib/db/core.ts` `storage.sqlite`, coinníonn sé cuibheoir amháin atá comhroinnte ar fud an phróisis, socraíonn sé seicphointí WAL, caomhnaíonn sé táblaí roghnaithe le linn athshlánaithe, agus baineann sé comhaid chompánaigh SQLite nuair a atógtar bunachar sonraí. Roghnaíonn an tiománaí in `src/lib/db/adapters/driverFactory.ts` idir na timpeallachtaí ama rite SQLite a dtacaítear leo; ní astarraingt é do chúl-inneall seachtrach.

Tá éabhlóid na scéime cúpláilte ar an gcaoi chéanna. Cuireann `src/lib/db/migrationRunner.ts` comhaid SQL uimhrithe i bhfeidhm, fiosraíonn sé `sqlite_master` agus `PRAGMA table_info`, braitheann sé tacaíocht roghnach FTS5, agus ritheann sé obair ascnamhaithe laistigh d’idirbhearta SQLite. Úsáideann modúil oibríochtúla amhail `src/lib/db/backup.ts` agus `src/lib/db/optimizationSettings.ts` cúltaca, `PRAGMA`, WAL, méid leathanaigh, uathfholúsú, agus séimeantaic `VACUUM` go díreach.

Is airíonna bailí iad seo den imscaradh leabaithe SQLite. Ba cheart iad a choinneáil ar fáil gan iallach a chur ar PostgreSQL ná MySQL aithris a dhéanamh ar API SQLite.

## Cinneadh

Glacadh le teorainn bhuanـseasmhachta dhá leibhéal do staid mharthanach iniompartha:

1. **Sainmhíníonn conarthaí stórtha fearainn** na hoibríochtaí buanـseasmhachta a theastaíonn ó chód gnó agus ródaithe. Braitheann glaoiteoirí ar iompar fearainn agus ar shonraí fearainn, seachas ar théacs SQL, ráitis ullmhaithe, comhaid bunachair sonraí, nó oibiachtaí canúna.
2. **Tacaíonn conradh inmheánach ais-inneall asincrónach** le cur chun feidhme stórtha trí chomhthéacsanna idirbhirt, sláinte/ullmhacht, comhordú ascnamhaithe, cumais ais-inneall, agus earráidí aicmithe. Moltar dromchla beacht TypeScript leis an gcéad PR cur chun feidhme agus cruthófar é le tástálacha comhréireachta; d’aon ghnó, ní reonn an ADR seo API amhantrach.

Fanann SQLite mar an cur chun feidhme réamhshocraithe. Fanann cascáid reatha na dtiománaithe SQLite agus an `SqliteAdapter` sioncronach taobh thiar de chur chun feidhme stór SQLite agus na fearainn á n-aistriú i slisní beaga ingearacha. Ní cheanglaítear ar aon úsáideoir seirbhís sheachtrach a chumrú.

Is é PostgreSQL an chéad chur chun feidhme seachtrach a mholtar tar éis teorainn an stóir a chruthú in aghaidh SQLite. Tagann MySQL ina dhiaidh mar chur chun feidhme comhchéime in aghaidh na sraithe comhréireachta céanna, seachas mar an dara forc loighce gnó.

## Rialacha teorann

### Dromchla stórtha iniompartha

Féadfaidh stór iniompartha na nithe seo a leanas a nochtadh:

- léamha agus scríbhinní fearainn;
- oibríochtaí adamhacha follasacha agus rochtain ar stór atá teoranta do raon idirbhirt;
- oibríochtaí comparáide/nuashonraithe nó léasa nuair is cuid den fhearann í an tséimeantaic chomhthráthachta;
- uimhriú leathanach, ordú, agus earráidí srianta atá neodrach ó thaobh an ais-inneall de.

Baineann sláinte an ais-inneall, ullmhacht, agus comhordú ascnamhaithe leis an gconradh inmheánach ais-inneall/oibríochtúil, seachas le stórtha fearainn aonair.

Ní ceadmhach do stór iniompartha na nithe seo a leanas a nochtadh:

- `prepare`, `get`, `all`, `run`, nó hanlaí tiománaí amha;
- `PRAGMA`, módanna seicphointe WAL, `VACUUM`, nó mionchoigeartú leathanaigh/taisce;
- conairí comhaid SQLite, comhaid chompánaigh, nó cúltaca trí chóipeáil comhaid;
- `lastInsertRowid` mar chonradh fearainn tras-ais-inneall;
- comhréir FTS5 nó `sqlite-vec`;
- bealach éalaithe cineálach canúna a úsáideann gnáthchód gnó.

### Dromchla cumais an ais-inneall

Fanann iompar a bhaineann go sonrach leis an ais-inneall follasach agus in-aimsithe. Fanann cothabháil SQLite-amháin taobh thiar dá cur chun feidhme agus dá comhéadan oibríochtúil féin, lena n-áirítear:

- roghnú tiománaí ama rite;
- seicphointe WAL agus iompar múchta SQLite;
- socruithe mhéid leathanaigh, mhéid taisce, agus uathfholúsaithe;
- cúltaca, athchóiriú, agus athshlánú chomhad an bhunachair sonraí;
- iniúchadh scéime SQLite;
- comhtháthú FTS5 agus `sqlite-vec`.

Ní cheanglaítear ar ais-inneall seachtrach aithris a dhéanamh ar na gnéithe sin. Ní mór do stórtha cumas iniompartha a úsáid, cur chun feidhme a bhaineann go sonrach leis an ais-inneall a sholáthar mar aon le hiompar doiciméadaithe, nó a thuairisciú nach bhfuil cumas ar fáil.

## Samhail idirbheart agus ascnaimh

Sainíonn APIanna stóir an oibríocht ghnó adamhnach; ní roghnaíonn glaoiteoirí mód idirbhirt SQL.
Ní mór do gach oibríocht a ráthaíochtaí inbhraite comhthráthachta a shainiú: athróga do-athraithe cosanta, brath
coinbhleachta, aicmiú atrialacha, ionchais ioldíchillíochta, agus iomadú comhthéacs idirbhirt.
Ní fhéadfaidh cur chun feidhme meicníochtaí éagsúla idirbhirt agus leithlisithe a úsáid ach amháin nuair a fhanann na
ráthaíochtaí inbhraite sin coibhéiseach. Féadfaidh SQLite leanúint dá iompraíocht idirbhirt iarchurtha nó láithreach
reatha a úsáid go hinmheánach nuair a chomhlíonann sí conradh na hoibríochta.

Éilíonn inneallacha seachtracha úinéireacht shainráite ascnaimh ionas nach mbeidh macasamhla iomadúla den fheidhmchlár in iomaíocht
chun an t-athrú scéime céanna a dhéanamh. Féadfaidh stair ascnaimh inneallacha garspriocanna loighciúla a chomhroinnt, ach ní ghlactar leis go bhfuil comhaid SQL
SQLite iniompartha nó in-athúsáidte mar chanúint eile.

## Séimeantaic chomhréireachta tras-innill

Ní mór do thástálacha comhréireachta iompraíocht a chumhdach, seachas sínithe modhanna stóir amháin. Ní mór do gach fearann ascnaithe
na nithe seo a leanas a shainiú agus a fhíorú:

- crios ama, beachtas, agus srathú stampaí ama;
- ionchais maidir le hordú `NULL`, comhordú, agus íogaireacht do chás;
- léiriú JSON agus iompraíocht chomparáide;
- beachtas slánuimhreacha, deachúlacha, agus airgeadaíochta;
- ordú cobhsaí agus réitigh chothromaíochta cinntitheacha le haghaidh leathanachúcháin;
- giniúint IDanna gan brath ar IDanna ró SQLite;
- aicmiú sáruithe uathúlachta agus eochracha coimhthíocha;
- iompraíocht na rónna lena mbaineann le haghaidh oibríochtaí gan éifeacht, comparáide/nuashonraithe, agus scriosta;
- torthaí scríbhneoireachta comhthráthaí, coinbhleachtaí in-atriailte, agus atrialacha ioldíchillíocha.

Mura féidir le fearann séimeantaic inbhraite choibhéiseach a lua, níl sé iniompartha fós agus ní mór dó fanacht
sainiúil don inneall go dtí go ndeartar an conradh sin.

## Riachtanais chomhoiriúnachta

Ní mór d’aon chur chun feidhme a leanann an ADR seo na hairíonna seo a chaomhnú:

- Fanann SQLite mar an réamhshocrú nach dteastaíonn aon chumraíocht uaidh.
- Fanann comhaid SQLite agus stair ascnaimh atá ann cheana inléite.
- Coinníonn cúltacaí SQLite do npm, Electron, Docker, agus timpeallachtaí rite srianta a gcosán tosaithe reatha.
- Leanann dintiúir soláthraithe atá stóráilte den iompraíocht criptithe feidhmchláir atá ann cheana a úsáid.
- Ní athraíonn ascnaimh stóir séimeantaic ródaithe, cuóta, eochracha API, ná iniúchóireachta go ciúin.
- Déantar iompraíocht chúltaca agus athshlánaithe a dhoiciméadú do gach inneall seachas í a chur i láthair mar iompraíocht uilíoch.
- Ní lódálann ná ní éilíonn suiteáil ghlan SQLite-amháin tiománaí seachtrach bunachair sonraí.

## Seicheamh seachadta

1. Foilsigh fardal in-atáirgthe de chúpláil SQLite mar dhéantán athbhreithnithe ar leith.
2. Tabhair isteach na chéad chonarthaí stórtha fearainn agus na tástálacha comhréireachta.
3. Cuir an cur chun feidhme SQLite atá ann cheana in oiriúint taobh thiar de na conarthaí sin gan na réamhshocruithe a athrú.
4. Faoi réir cheadú na gcothabhálaithe, cuir PostgreSQL leis mar an chéad chur chun feidhme seachtrach do
   shlis theoranta amháin den phlána rialaithe.
5. Ná leathnaigh staid chomhroinnte ach amháin tar éis tástálacha scríbhneoireachta comhthráthaí agus úinéireachta ascnaimh a bheith ann.
6. Cuir cosán ascnaimh bailíochtaithe as líne ó SQLite go hinneall seachtrach leis sula bhfógraítear malartú bunachair sonraí.
7. Cuir MySQL leis de réir na gconarthaí cruthaithe stórtha agus inneallacha.

Is PR ar leith, in-athbhreithnithe é gach céim am rite. Ní ceadmhach céim níos déanaí a úsáid chun cumasc
astarraingthe neamhchruthaithe i gcéim níos luaithe a chosaint.

## An chéad slisne cur chun feidhme

Ba cheart an chéad slisne am rite a roghnú tar éis athbhreithniú a dhéanamh ar fhardal na gcúplálacha. Is iarrthóirí iad naisc soláthraithe, eochracha API, teaglamaí, agus cumraíocht ródaithe toisc go bhfuil a mbuntáblaí le feiceáil in `src/lib/db/core.ts`, ach ní fhormheasann an ADR seo liosta táblaí ná PR imirce. Ní mór na nithe seo a leanas a bheith sa slisne:

- tástálacha caomhnaithe iompair SQLite;
- tástálacha comhréireachta stórtha;
- teorainneacha idirbhirt sainráite;
- fíorú criptithe agus folaithe do dhintiúir stóráilte;
- gan aon athrú ar an gcumraíocht réamhshocraithe tosaithe.

## Roghanna malartacha a breithníodh

### PostgreSQL a chur faoi `SqliteAdapter`

Diúltaíodh dó. Is sraith chomhoiriúnachta é `SqliteAdapter` d’amanna rite SQLite agus nochtann sé oibríochtaí a bhaineann go sonrach le SQLite. Dá ndéanfaí aithris ar an gcomhéadan sin, sceithfí toimhdí sioncronacha agus toimhdí a bhaineann go sonrach le canúint isteach in inneall nua.

### API cineálach fiosraithe/forghníomhaithe a nochtadh do gach fearann

Diúltaíodh dó mar phríomhtheorainn. Dhéanfadh sé láimhseáil nasc a lárú, ach d’fhágfadh sé canúint SQL, idirbhearta, agus cúpláil táblaí sna modúil ghnó. Féadfaidh bunphrimiteach ísealleibhéil innill a bheith ann laistigh de chur chun feidhme stórtha, ach ní mar an API marthanachta a nochtar don fheidhmchlár.

### An mharthanacht uile a athscríobh sula ndéanfaí slisne amháin a bhailíochtú

Diúltaíodh dó. Tá dromchla reatha na marthanachta leathan agus cuimsíonn sé saolré comhad, aisghabháil, cuardach, agus socruithe oibríochtúla. Soláthraíonn slisní ingearacha iompar ar féidir athbhreithniú a dhéanamh air agus teorainneacha cúl-rollta.

### SQLite a ionadú mar an réamhshocrú

Diúltaíodh dó. Braitheann imscaradh leabaithe agus deisce ar an tsamhail reatha tosaithe gan seirbhís. Is rogha shainroghnach é inneall seachtrach.

### Redis a úsáid mar údarás buan

Diúltaíodh dó. Féadfaidh Redis tacú le comhordú sealadach a shainítear go sainráite, le taisce, nó le cuntair, ach ní ghlacann sé ionad an chonartha stórtha bhuain a thuairiscítear anseo.

## Iarmhairtí

### Dearfach

- Faigheann cód gnó comhéadan cobhsaí marthanachta atá neamhspleách ar chanúint an bhunachair sonraí.
- Déantar iompar SQLite a thástáil sula sainíonn inneall seachtrach an astarraingt.
- Comhroinneann PostgreSQL agus MySQL conarthaí agus tástálacha in ionad loighic fearainn a dhúbailt.
- Fanann cumais a bhaineann le SQLite amháin ina ngnéithe den chéad scoth seachas a bheith ina sraitheanna comhoiriúnachta sceiteacha.
- Déantar iompar imirce agus idirbheart in imscaradh ilmacasamhla ina ábhar dearaidh sainráite.

### Costais agus rioscaí

- Éilíonn asbhaint stórtha imirce incriminteach ar shuíomhanna glaoite.
- Féadfaidh teorainneacha aisioncronacha leathadh trí chód seirbhíse atá sioncronach faoi láthair.
- Éilíonn séimeantaic tras-innill tástálacha comhréireachta sa bhreis ar chomhoiriúnacht chomhréire SQL.
- Fanann cúltaca, cuardach, stóráil veicteoirí, agus cothabháil sonrach do gach cumas.
- Méadaítear costas CI agus tacaíochta oibríochtúla nuair a bhíonn níos mó ná cur chun feidhme marthanachta amháin á rith.

## Neamhchuspóirí

Ní dhéanann an ADR seo na nithe seo a leanas:

- spleáchas bunachair sonraí, athróg timpeallachta, scéimre, ná imirce a chur leis;
- an singleton SQLite beo ná cascáid na dtiománaithe a athrú;
- tacaíocht do PostgreSQL ná MySQL a ghealladh in eisiúint ar leith;
- FTS5, `sqlite-vec`, comhaid chúltaca, ná cothabháil SQLite a dhéanamh iniompartha;
- ullmhacht ghníomhach-ghníomhach a shainiú sula mbeidh tástálacha ar staid chomhroinnte agus ar chomhordú ann;
- athscríobh aon iarrachta amháin ar `src/lib/db/` a fhormheas.

## Ceisteanna oscailte lena gceadú ag an gcothaitheoir

1. An é an stór móide teorainn inmheánach aisíncrónach an inneall láimhseála an treo is fearr, nó ar cheart
   marthanacht sheachtrach a bheith taobh thiar de sheirbhís phlána rialaithe ar leith?
2. An bhfuil PostgreSQL inghlactha mar an chéad chur chun feidhme seachtrach tar éis chomhlíonadh SQLite?
3. Cén fearann ba cheart a bheith ar an gcéad slisne teorannaithe den stór?
4. Cén staid nach mór a chomhroinnt don chéad chloch mhíle ilmhacasamhla, agus cén staid a fhanfaidh logánta don nód?
5. Cén tréimhse chomhoiriúnachta atá riachtanach le haghaidh ascnamh stór a cuireadh isteach air nó a rolladh siar?

Go dtí go réiteofar na ceisteanna seo, is moladh é an doiciméad seo agus ní thugtar le tuiscint go ndéanfar aon athfhachtóiriú ar an gcóras rite.
