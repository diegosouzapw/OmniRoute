# Developer environment notes (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Mínítear ar an leathanach seo iompar áitiúil `.env` an tionscadail agus conas comhaid timpeallachta agus rúin a láimhseáil agus OmniRoute á fhorbairt.

## Iompar `.env` le linn postinstall

Féadfaidh an tionscadal comhad áitiúil `.env` a ghiniúint le linn `npm install` / `postinstall` ar mhaithe le háisiúlacht na bhforbróirí. Is le haghaidh forbairt agus tástáil áitiúil amháin atá an comhad seo agus ní ceadmhach riamh é a chur faoi rialú leaganacha.

Príomhphointí:

- Déanann `.gitignore` na stórtha neamhaird cheana féin de chomhaid `.env*` (féach an iontráil `.gitignore`). Ná bain an riail sin ná ná hathraigh í mura bhfuil sé ar intinn agat d’aon ghnó comhad samplach ar leith a chur sa stór agus próiseas doiciméadaithe a bheith agat chuige sin.
- Má chuirtear rún fíor sa stór trí thimpiste, rothlaigh nó cúlghair an dintiúr láithreach agus bain de stair na stórtha é (mar shampla, trí `git filter-repo` nó sreabhadh oibre coibhéiseach feabhsúcháin a úsáid). Déan teagmháil leis an úinéir slándála/teagmhála má theastaíonn cabhair uait.
- I gcás CI agus táirgeachta, úsáid rúin CI nó bainisteoir rún (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, etc.) seachas rúin a chur i gcomhaid sa stór.

## Sreabhadh oibre áitiúil molta

- Coinnigh `.env` i do spás oibre áitiúil amháin. Úsáid `.env.example` (atá á rianú cheana féin) chun na hathróga riachtanacha agus luachanna samplacha inghlactha a dhoiciméadú.
- Agus tástálacha á rith go háitiúil a dteastaíonn luachanna atá cosúil le rúin uathu, roghnaigh ionadchoinneálaithe sintéiseacha nó eochracha sealadacha a ghintear ag am rite seachas fíordhintiúir.
- Cuir nóta gairid i dtástálacha a úsáideann ionadchoinneálaithe ionas go dtuigfidh athbhreithneoirí gur sonra tástála sintéiseach atá i gceist.

## Nótaí maidir le scanóirí

- D’fhéadfadh fotheaghráin ASCII a bheith i roinnt sócmhainní tiomsaithe nó dénártha (e.g., blobaí WASM base64 leabaithe) a bhfuil cuma dintiúr orthu agus a d’fhéadfadh scanóirí rún téacsbhunaithe a ghníomhachtú. Má tá na sócmhainní seo dlisteanach, marcáil iad ar liosta ceadaithe an scanóra nó fág na heolairí as cumraíocht an scanóra.

## Má aimsíonn tú sceitheadh

1. Rothlaigh nó cúlghair an eochair láithreach.
2. Bain an rún den stair agus déan brú éigeantach ar bhrainse glanta más gá.
3. Cuir na cothabhálaithe ar an eolas agus lean seicliosta freagartha d’eagraíochta ar theagmhais.
