# Developer environment notes (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ojú-ìwé yìí ṣàlàyé ìhùwàsí `.env` abẹ́lé ti iṣẹ́ náà àti bí a ṣe lè bójú tó àwọn fáìlì àyíká àti àwọn àṣírí nígbà tí a bá ń ṣe àgbékalẹ̀ OmniRoute.

## Ìhùwàsí `.env` lẹ́yìn ìfìmọ́lẹ̀

Iṣẹ́ náà lè ṣẹ̀dá fáìlì `.env` abẹ́lé nígbà `npm install` / `postinstall` láti mú kí iṣẹ́ rọrùn fún olùgbéejáde. Fáìlì yìí jẹ́ fún àgbékalẹ̀ àti àyẹ̀wò abẹ́lé nìkan, kò sì gbọdọ̀ jẹ́ fífi sínú ìṣàkóso ẹ̀yà láéláé.

Àwọn kókó pàtàkì:

- `.gitignore` ibi ìpamọ́ náà ti ń kọbi ara sí àwọn fáìlì `.env*` tẹ́lẹ̀ (wo àkọsílẹ̀ `.gitignore`). Má ṣe yọ tàbí yí òfin yẹn padà àyàfi tí o bá mọ̀ọ́mọ̀ fẹ́ fi fáìlì àpẹẹrẹ kan pàtó sínú ìṣàkóso ẹ̀yà, tí o sì ní ìlànà tí a kọ sílẹ̀ fún un.
- Bí a bá ṣàṣìṣe fi àṣírí gidi sínú ibi ìpamọ́ náà, yí/fagilé ẹ̀rí ìdánimọ̀ náà lẹ́sẹ̀kẹsẹ̀, kí o sì yọ ọ́ kúrò nínú ìtàn ibi ìpamọ́ náà (fún àpẹẹrẹ, nípa lílo `git filter-repo` tàbí ìlànà àtúnṣe tó jọra). Kàn sí ẹni tó ń bójú tó ààbò/ìbánisọ̀rọ̀ bí o bá nílò ìrànlọ́wọ́.
- Fún CI àti iṣelọpọ, lo àwọn àṣírí CI tàbí olùṣàkóso àṣírí (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) dípò fífi àwọn àṣírí sínú àwọn fáìlì.

## Ìṣàn-iṣẹ́ abẹ́lé tí a dámọ̀ràn

- Jẹ́ kí `.env` wà nínú ààyè iṣẹ́ abẹ́lé rẹ nìkan. Lo `.env.example` (tí a ti ń tọpinpin tẹ́lẹ̀) láti ṣàkọsílẹ̀ àwọn àyípadà tí a nílò àti àwọn iye àpẹẹrẹ tó ṣe ìtẹ́wọ́gbà.
- Nígbà tí o bá ń ṣe àwọn àyẹ̀wò lábẹ́lé tí ó nílò àwọn iye tó dà bí àṣírí, yan àwọn iye ìrọ́pò àfọwọ́ṣe tàbí àwọn kọ́kọ́rọ́ onígbà díẹ̀ tí a ṣẹ̀dá ní àkókò ìṣiṣẹ́ dípò àwọn ẹ̀rí ìdánimọ̀ gidi.
- Ṣàfikún àlàyé kúkúrú sínú àwọn àyẹ̀wò tó ń lo àwọn iye ìrọ́pò, kí àwọn olùṣàyẹ̀wò lè mọ̀ pé ohun èlò àyẹ̀wò náà jẹ́ àfọwọ́ṣe.

## Àwọn àkíyèsí nípa ẹ̀rọ ìṣàyẹ̀wò

- Àwọn ohun ìní kan tí a ti ṣàkójọ tàbí tí ó jẹ́ alakomeji (fún àpẹẹrẹ, àwọn ìdì base64 WASM tí a fi sínú wọn) lè ní àwọn ọ̀rọ̀ abẹ́nú ASCII tó dà bí ẹ̀rí ìdánimọ̀, wọ́n sì lè mú kí àwọn ẹ̀rọ ìṣàyẹ̀wò àṣírí tó dá lórí ọ̀rọ̀ dáhùn. Bí àwọn ohun ìní wọ̀nyí bá jẹ́ ojúlówó, yálà kí o samisi wọn sínú àkójọ ìyọ̀ǹda ẹ̀rọ ìṣàyẹ̀wò náà tàbí kí o yọ àwọn àpò-ọ̀nà náà kúrò nínú ìṣètò ẹ̀rọ ìṣàyẹ̀wò.

## Bí o bá rí ìtújáde àṣírí

1. Yí/fagilé kọ́kọ́rọ́ náà lẹ́sẹ̀kẹsẹ̀.
2. Yọ àṣírí náà kúrò nínú ìtàn, kí o sì fi tipátipá rán ẹ̀ka tí a ti fọ́mọ́ sókè bí ó bá pọndandan.
3. Fi tó àwọn olùtọ́jú létí, kí o sì tẹ̀lé àkójọ ìgbésẹ̀ ìdáhùn sí ìṣẹ̀lẹ̀ ti àjọ rẹ.
