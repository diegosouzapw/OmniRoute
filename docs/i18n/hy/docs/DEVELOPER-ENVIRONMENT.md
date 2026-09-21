# Developer environment notes (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Այս էջը բացատրում է նախագծի տեղային `.env` վարքագիծը և այն, թե ինչպես վարվել միջավայրի ֆայլերի ու գաղտնիքների հետ OmniRoute-ը մշակելիս։

## .env postinstall վարքագիծը

Նախագիծը կարող է ստեղծել տեղային `.env` ֆայլ `npm install` / `postinstall`-ի ընթացքում՝ մշակողների հարմարության համար։ Այս ֆայլը նախատեսված է միայն տեղային մշակման և թեստավորման համար և երբեք չպետք է commit արվի տարբերակների կառավարման համակարգում։

Հիմնական կետերը՝

- Ռեպոզիտորիայի `.gitignore`-ն արդեն անտեսում է `.env*` ֆայլերը (տե՛ս `.gitignore`-ի համապատասխան գրառումը)։ Մի՛ հեռացրեք կամ փոփոխեք այդ կանոնը, եթե միտումնավոր չեք նախատեսում commit անել որևէ կոնկրետ օրինակային ֆայլ և դրա համար չունեք փաստաթղթավորված գործընթաց։
- Եթե իրական գաղտնիք պատահաբար commit է արվել ռեպոզիտորիայում, անմիջապես փոխարինեք կամ չեղարկեք հավատարմագրերը և հեռացրեք դրանք ռեպոզիտորիայի պատմությունից (օրինակ՝ օգտագործելով `git filter-repo` կամ վերականգնման համարժեք աշխատանքային ընթացակարգ)։ Եթե օգնության կարիք ունեք, կապվեք անվտանգության պատասխանատուի կամ կոնտակտային անձի հետ։
- CI-ի և արտադրական միջավայրի համար ֆայլերում գաղտնիքներ commit անելու փոխարեն օգտագործեք CI գաղտնիքները կամ գաղտնիքների կառավարման համակարգ (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault և այլն)։

## Առաջարկվող տեղային աշխատանքային ընթացակարգ

- `.env`-ը պահեք միայն ձեր տեղային աշխատանքային տարածքում։ Պահանջվող փոփոխականները և ընդունելի օրինակային արժեքները փաստաթղթավորելու համար օգտագործեք `.env.example`-ը (որն արդեն հետևվում է տարբերակների կառավարման համակարգով)։
- Գաղտնիքի նման արժեքներ պահանջող թեստերը տեղային միջավայրում գործարկելիս իրական հավատարմագրերի փոխարեն նախընտրեք սինթետիկ տեղապահներ կամ կատարման պահին գեներացվող ժամանակավոր բանալիներ։
- Տեղապահներ օգտագործող թեստերում ավելացրեք կարճ մեկնաբանություն, որպեսզի վերանայողները հասկանան, որ ֆիքստուրան սինթետիկ է։

## Սկաների վերաբերյալ նշումներ

- Որոշ կոմպիլացված կամ երկուական ռեսուրսներ (օրինակ՝ ներկառուցված base64 WASM բլոբներ) կարող են պարունակել ASCII ենթատողեր, որոնք նման են հավատարմագրերի և կարող են գործարկել տեքստի վրա հիմնված գաղտնիքների սկաներները։ Եթե այդ ռեսուրսները օրինական են, կա՛մ նշեք դրանք սկաների թույլատրելի տարրերի ցանկում, կա՛մ սկաների կազմաձևում բացառեք համապատասխան պանակները։

## Եթե արտահոսք եք հայտնաբերում

1. Անմիջապես փոխարինեք կամ չեղարկեք բանալին։
2. Հեռացրեք գաղտնիքը պատմությունից և անհրաժեշտության դեպքում հարկադիր push արեք մաքրված ճյուղը։
3. Տեղեկացրեք սպասարկողներին և հետևեք ձեր կազմակերպության միջադեպերին արձագանքելու ստուգացանկին։
