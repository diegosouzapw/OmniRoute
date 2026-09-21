# Developer environment notes (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

මෙම පිටුව OmniRoute සංවර්ධනය කිරීමේදී ව්යාපෘතියේ දේශීය `.env` හැසිරීම සහ පරිසර ගොනු හා රහස් හැසිරවිය යුතු ආකාරය පැහැදිලි කරයි.

## .env postinstall හැසිරීම

සංවර්ධක පහසුව සඳහා ව්යාපෘතිය `npm install` / `postinstall` අතරතුර දේශීය `.env` ගොනුවක් ජනනය කළ හැක. මෙම ගොනුව දේශීය සංවර්ධනය සහ පරීක්ෂණ සඳහා පමණක් අදහස් කර ඇති අතර, කිසිවිටෙක අනුවාද පාලනයට commit නොකළ යුතුය.

ප්රධාන කරුණු:

- ගබඩාවේ `.gitignore` දැනටමත් `.env*` ගොනු නොසලකා හරියි (`.gitignore` ඇතුළත් කිරීම බලන්න). නිශ්චිත උදාහරණ ගොනුවක් commit කිරීමට ඔබ හිතාමතාම අදහස් කරන්නේ නම් සහ ඒ සඳහා ලේඛනගත ක්රියාවලියක් තිබේ නම් හැර, එම රීතිය ඉවත් කිරීම හෝ වෙනස් කිරීම නොකරන්න.
- සැබෑ රහසක් අහම්බෙන් repo වෙත commit කර ඇත්නම්, අක්තපත්රය වහාම මාරු කරන්න/අවලංගු කරන්න සහ එය ගබඩා ඉතිහාසයෙන් ඉවත් කරන්න (උදාහරණයක් ලෙස, `git filter-repo` හෝ ඊට සමාන ප්රතිකර්ම කාර්ය ප්රවාහයක් භාවිතයෙන්). ඔබට උපකාර අවශ්ය නම් ආරක්ෂක/සම්බන්ධතා හිමිකරු අමතන්න.
- CI සහ නිෂ්පාදනය සඳහා, රහස් ගොනුවලට commit කිරීම වෙනුවට CI රහස් හෝ රහස් කළමනාකරුවෙකු (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, ආදිය) භාවිත කරන්න.

## නිර්දේශිත දේශීය කාර්ය ප්රවාහය

- `.env` ඔබගේ දේශීය වැඩ අවකාශයේ පමණක් තබා ගන්න. අවශ්ය විචල්ය සහ පිළිගත හැකි උදාහරණ අගයන් ලේඛනගත කිරීමට `.env.example` (දැනටමත් නිරීක්ෂණය කර ඇත) භාවිත කරන්න.
- රහස්-සමාන අගයන් අවශ්ය පරීක්ෂණ දේශීයව ධාවනය කරන විට, සැබෑ අක්තපත්ර වෙනුවට කෘත්රිම ස්ථානධාරක හෝ ධාවන කාලයේ ජනනය කරන තාවකාලික යතුරු භාවිත කිරීමට ප්රමුඛත්වය දෙන්න.
- ස්ථානධාරක භාවිත කරන පරීක්ෂණවල කෙටි අදහස් දැක්වීමක් එක් කරන්න, එවිට පරීක්ෂකයන්ට එම පරීක්ෂණ දත්ත කෘත්රිම බව තේරුම් ගත හැක.

## ස්කෑනර් සටහන්

- සම්පාදිත හෝ ද්විමය සම්පත් (උදා., අන්තර්ගත කළ base64 WASM blobs) තුළ අක්තපත්ර ලෙස පෙනෙන ASCII උපතන්තු අඩංගු විය හැකි අතර, ඒවා පෙළ-පාදක රහස් ස්කෑනර් සක්රිය කිරීමට ඉඩ ඇත. මෙම සම්පත් නීත්යානුකූල නම්, ඒවා ස්කෑනරයේ අවසර ලැයිස්තුවේ සලකුණු කරන්න හෝ ස්කෑනර් වින්යාසයෙන් එම නාමාවලි බැහැර කරන්න.

## ඔබට කාන්දුවක් හමු වුවහොත්

1. යතුර වහාම මාරු කරන්න/අවලංගු කරන්න.
2. රහස ඉතිහාසයෙන් ඉවත් කර, අවශ්ය නම් පිරිසිදු කළ branch එකක් බලහත්කාරයෙන් push කරන්න.
3. නඩත්තුකරුවන්ට දැනුම් දී ඔබගේ ආයතනයේ සිද්ධි ප්රතිචාර පිරික්සුම් ලැයිස්තුව අනුගමනය කරන්න.
