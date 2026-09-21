# Developer environment notes (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Šiame puslapyje paaiškinama, kaip projekte lokaliai veikia `.env` ir kaip tvarkyti aplinkos failus bei paslaptis kuriant „OmniRoute“.

## .env veikimas po diegimo

Kad kūrėjams būtų patogiau, vykdant `npm install` / `postinstall` projektas gali sugeneruoti lokalų `.env` failą. Šis failas skirtas tik lokaliam kūrimui ir testavimui, todėl jo niekada negalima įtraukti į versijų valdymo sistemą.

Svarbiausi punktai:

- Saugyklos `.gitignore` faile `.env*` failai jau ignoruojami (žr. įrašą `.gitignore` faile). Nepašalinkite ir nekeiskite šios taisyklės, nebent sąmoningai ketinate įtraukti konkretų pavyzdinį failą ir turite dokumentuotą tam skirtą procesą.
- Jei tikra paslaptis netyčia įtraukiama į saugyklą, nedelsdami pakeiskite arba atšaukite prisijungimo duomenis ir pašalinkite juos iš saugyklos istorijos (pavyzdžiui, naudodami `git filter-repo` ar lygiavertį problemos šalinimo procesą). Jei reikia pagalbos, susisiekite su už saugą ar ryšius atsakingu asmeniu.
- CI ir produkcinėje aplinkoje naudokite CI paslaptis arba paslapčių tvarkyklę („GitHub Actions Secrets“, „Azure Key Vault“, „HashiCorp Vault“ ir pan.), užuot įtraukę paslaptis į failus.

## Rekomenduojama lokalaus darbo eiga

- Laikykite `.env` tik savo lokalioje darbo aplinkoje. Naudokite `.env.example` (jis jau sekamas versijų valdymo sistemoje), kad dokumentuotumėte privalomus kintamuosius ir tinkamas pavyzdines reikšmes.
- Lokaliai vykdydami testus, kuriems reikalingos į paslaptis panašios reikšmės, vietoje tikrų prisijungimo duomenų naudokite sintetines pakaitines reikšmes arba vykdymo metu sugeneruotus trumpalaikius raktus.
- Testuose, kuriuose naudojamos pakaitinės reikšmės, pridėkite trumpą komentarą, kad peržiūrintys asmenys suprastų, jog testiniai duomenys yra sintetiniai.

## Pastabos apie skaitytuvus

- Kai kuriuose sukompiliuotuose arba dvejetainiuose ištekliuose (pvz., įterptuose „base64“ formato WASM duomenų blokuose) gali būti ASCII poilučių, kurios atrodo kaip prisijungimo duomenys ir gali suaktyvinti tekstinius paslapčių skaitytuvus. Jei šie ištekliai yra teisėti, įtraukite juos į skaitytuvo leidžiamųjų sąrašą arba neįtraukite atitinkamų katalogų į nuskaitymą skaitytuvo konfigūracijoje.

## Jei aptikote nutekėjimą

1. Nedelsdami pakeiskite arba atšaukite raktą.
2. Pašalinkite paslaptį iš istorijos ir, jei reikia, priverstinai nusiųskite išvalytą šaką.
3. Informuokite prižiūrėtojus ir vadovaukitės savo organizacijos reagavimo į incidentus kontroliniu sąrašu.
