# Developer environment notes (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ukurasa huu unaeleza tabia ya faili ya ndani ya mradi ya `.env` na jinsi ya kushughulikia faili za mazingira na siri wakati wa kutengeneza OmniRoute.

## Tabia ya .env wakati wa postinstall

Mradi unaweza kutengeneza faili ya ndani ya `.env` wakati wa `npm install` / `postinstall` kwa urahisi wa wasanidi programu. Faili hii imekusudiwa tu kwa uundaji na majaribio ya ndani na haipaswi kamwe kuhifadhiwa katika mfumo wa udhibiti wa matoleo.

Mambo muhimu:

- Faili ya `.gitignore` ya hazina tayari inapuuza faili za `.env*` (angalia ingizo la `.gitignore`). Usiondoe au kubadilisha sheria hiyo isipokuwa unakusudia kwa makusudi kuhifadhi faili mahususi ya mfano na una mchakato ulioandikwa kwa ajili yake.
- Ikiwa siri halisi imehifadhiwa kwa bahati mbaya kwenye hazina, badilisha/batilisha kitambulisho hicho mara moja na ukiondoe kwenye historia ya hazina (kwa mfano, kwa kutumia `git filter-repo` au mtiririko sawa wa kurekebisha tatizo). Wasiliana na mhusika wa usalama/mawasiliano ikiwa unahitaji msaada.
- Kwa CI na mazingira ya uzalishaji, tumia siri za CI au kidhibiti cha siri (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, n.k.) badala ya kuhifadhi siri kwenye faili.

## Mtiririko wa kazi wa ndani unaopendekezwa

- Weka `.env` katika nafasi yako ya kazi ya ndani pekee. Tumia `.env.example` (ambayo tayari inafuatiliwa) kuandika vigezo vinavyohitajika na thamani za mfano zinazokubalika.
- Unapoendesha majaribio ya ndani yanayohitaji thamani zinazofanana na siri, pendelea vishika nafasi vya kubuniwa au funguo za muda zinazotengenezwa wakati wa utekelezaji badala ya vitambulisho halisi.
- Ongeza maoni mafupi katika majaribio yanayotumia vishika nafasi ili wakaguzi waelewe kuwa data hiyo ya majaribio ni ya kubuniwa.

## Vidokezo kuhusu vichanganuzi

- Baadhi ya rasilimali zilizokusanywa au za mfumo wa jozi (k.m., data za WASM za base64 zilizopachikwa) zinaweza kuwa na mifuatano ya ASCII inayofanana na vitambulisho na hivyo kuwasha tahadhari za vichanganuzi vya siri vinavyotegemea maandishi. Ikiwa rasilimali hizi ni halali, ama ziweke katika orodha ya ruhusa ya kichanganuzi au uyatenge masaraka hayo katika usanidi wa kichanganuzi.

## Ukigundua uvujaji

1. Badilisha/batilisha ufunguo mara moja.
2. Ondoa siri hiyo kwenye historia na ulazimishe kusukuma tawi lililosafishwa ikiwa inahitajika.
3. Waarifu watunzaji na ufuate orodha hakiki ya shirika lako ya kukabiliana na matukio.
