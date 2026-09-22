# Developer environment notes (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Wannan shafin yana bayyana yadda `.env` na cikin gida ke aiki a aikin da kuma yadda za a kula da fayilolin muhalli da sirrika yayin haɓaka OmniRoute.

## Halayyar .env ta postinstall

Aikin na iya samar da fayil ɗin `.env` na cikin gida yayin `npm install` / `postinstall` domin sauƙaƙa wa masu haɓakawa. An tanadi wannan fayil ne kawai don haɓakawa da gwaji a cikin gida, kuma ba za a taɓa tura shi zuwa tsarin sarrafa sigogi ba.

Muhimman bayanai:

- `.gitignore` na ma'ajiyar ya riga ya yi watsi da fayilolin `.env*` (duba shigarwar `.gitignore`). Kada a cire ko a sauya wannan ƙa'ida sai dai idan da gangan ake son tura wani takamaiman fayil na misali kuma akwai tsari da aka rubuta a kansa.
- Idan aka tura wani sirri na gaske zuwa ma'ajiyar bisa kuskure, a sauya/soke bayanan shaidar nan take sannan a cire su daga tarihin ma'ajiyar (misali, ta amfani da `git filter-repo` ko makamancin tsarin gyara matsalar). A tuntuɓi mai kula da tsaro/tuntuɓa idan ana buƙatar taimako.
- Don CI da yanayin samarwa, a yi amfani da sirrikan CI ko manajan sirrika (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, da sauransu) maimakon tura sirrika cikin fayiloli.

## Tsarin aiki na cikin gida da ake ba da shawara

- A ajiye `.env` a wurin aikin cikin gida kawai. A yi amfani da `.env.example` (wanda ake bibiyarsa tuni) don rubuta bayanin sauye-sauyen da ake buƙata da ƙimomin misali da aka yarda da su.
- Lokacin gudanar da gwaje-gwaje a cikin gida waɗanda ke buƙatar ƙimomi masu kama da sirrika, a fi son amfani da ƙimomin wucin-gadi na kwaikwayo ko maɓallan wucin-gadi da ake samarwa yayin aiki maimakon bayanan shaidar gaske.
- A ƙara ɗan gajeren sharhi a gwaje-gwajen da ke amfani da ƙimomin kwaikwayo domin masu bita su fahimci cewa kayan gwajin na kwaikwayo ne.

## Bayanan na'urar bincike

- Wasu kadarorin da aka tattara ko na binary (misali, ɓoyayyun gutsattsarin WASM na base64) na iya ƙunsar ƙananan jerin haruffan ASCII waɗanda suke kama da bayanan shaidar shiga, kuma hakan na iya kunna na'urorin binciken sirrika masu dogaro da rubutu. Idan waɗannan kadarorin halastattu ne, ko dai a sanya su cikin jerin abubuwan da na'urar binciken ta amince da su, ko kuma a ware kundin adireshinsu a cikin tsarin saitin na'urar binciken.

## Idan ka gano ɓullar sirri

1. A sauya/soke maɓallin nan take.
2. A cire sirrin daga tarihi sannan a yi force-push na reshen da aka tsaftace idan hakan ya zama dole.
3. A sanar da masu kula da aikin sannan a bi jerin matakan mayar da martani ga aukuwar matsala na ƙungiyarku.
