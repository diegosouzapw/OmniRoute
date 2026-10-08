# Developer environment notes (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Din il-paġna tispjega l-imġiba lokali tal-`.env` tal-proġett u kif għandek timmaniġġja l-fajls tal-ambjent u s-sigrieti meta tkun qed tiżviluppa OmniRoute.

## Imġiba ta’ `.env` waqt postinstall

Il-proġett jista’ jiġġenera fajl `.env` lokali waqt `npm install` / `postinstall` għall-konvenjenza tal-iżviluppaturi. Dan il-fajl huwa maħsub biss għall-iżvilupp u l-ittestjar lokali u qatt ma għandu jiġi inkluż fil-kontroll tal-verżjonijiet.

Punti ewlenin:

- Il-`.gitignore` tar-repożitorju diġà jinjora l-fajls `.env*` (ara l-entrata fil-`.gitignore`). Tneħħix jew tibdilx dik ir-regola sakemm ma tkunx qed tippjana apposta li tinkludi fajl ta’ eżempju speċifiku u jkollok proċess dokumentat għalih.
- Jekk sigriet reali jiġi inkluż aċċidentalment fir-repożitorju, ibdel/irrevoka l-kredenzjali immedjatament u neħħih mill-istorja tar-repożitorju (pereżempju, billi tuża `git filter-repo` jew proċess ta’ rimedju ekwivalenti). Ikkuntattja lis-sid responsabbli mis-sigurtà/il-kuntatt jekk ikollok bżonn l-għajnuna.
- Għas-CI u għall-produzzjoni, uża s-sigrieti tas-CI jew maniġer tas-sigrieti (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, eċċ.) minflok tinkludi s-sigrieti fil-fajls.

## Fluss tax-xogħol lokali rakkomandat

- Żomm `.env` fl-ispazju tax-xogħol lokali tiegħek biss. Uża `.env.example` (li diġà huwa traċċat) biex tiddokumenta l-varjabbli meħtieġa u l-valuri ta’ eżempju aċċettabbli.
- Meta tħaddem testijiet lokalment li jeħtieġu valuri simili għal sigrieti, ippreferi valuri fittizji sintetiċi jew ċwievet temporanji ġġenerati waqt it-tħaddim minflok kredenzjali reali.
- Żid kumment qasir fit-testijiet li jużaw valuri fittizji sabiex dawk li jirrieżaminawhom jifhmu li l-fixture huwa sintetiku.

## Noti dwar l-iskaners

- Xi riżorsi kkompilati jew binarji (eż., blobs WASM inkorporati f’base64) jistgħu jkun fihom sottostrings ASCII li jidhru bħal kredenzjali u jistgħu jattivaw skaners tas-sigrieti bbażati fuq it-test. Jekk dawn ir-riżorsi huma leġittimi, jew immarkahom fil-lista tal-eċċezzjonijiet tal-iskaner jew eskludi d-direttorji fil-konfigurazzjoni tal-iskaner.

## Jekk issib tnixxija

1. Ibdel/irrevoka ċ-ċavetta immedjatament.
2. Neħħi s-sigriet mill-istorja u, jekk ikun meħtieġ, agħmel force-push ta’ fergħa mnaddfa.
3. Avża lill-mantenituri u segwi l-lista ta’ kontroll tal-organizzazzjoni tiegħek għar-rispons għall-inċidenti.
