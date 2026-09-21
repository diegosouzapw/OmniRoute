# Public Credentials Handling (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Ճշմարտության աղբյուր՝** `open-sse/utils/publicCreds.ts`
> **Թեստեր՝** `tests/unit/publicCreds.test.ts`
> **Վերջին թարմացումը՝** 2026-08-07 — v3.8.50
> **Լսարան՝** Ինժեներներ, որոնք ինտեգրում են մատակարարներ, որոնց հանրային CLI-ները տրամադրում են հանրային OAuth client_id / client_secret / Firebase Web API բանալիներ։
> **Կարգավիճակ՝** **ՊԱՐՏԱԴԻՐ** բոլոր նոր կոդերի համար, որոնք ներդրված ձևով պարունակում են սկզբնաղբյուր մատակարարի նույնացուցիչներ։

## Ինչու է սա գոյություն ունենում

- [OAuth 2.0 բնիկ հավելվածների համար (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — տեղադրվող հավելվածների OAuth client_id / client_secret արժեքները հանրային են, իսկ իրական անվտանգությունն ապահովում է PKCE-ն։
- [Firebase API բանալիներ](https://firebase.google.com/docs/projects/api-keys) — վեբ-հաճախորդի նույնացուցիչներն ի սկզբանե հանրային են։

OmniRoute-ը պետք է ներդրված ձևով պարունակի այս արժեքները, որպեսզի `.env` չկարգավորած օգտատերերը նույնպես անմիջապես ստանան գործող OAuth հոսք։ Առանց ներդրված պահուստային արժեքի՝ Gemini / Antigravity մատակարարները դադարում են աշխատել ցանկացած օգտատիրոջ համար, որը հետևում է «պարզապես կլոնավորել և գործարկել» ուղուն։

Սակայն `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` նման բառացի արժեքները հայտնաբերվում են **GitHub Secret Scanning**-ի, **Semgrep**-ի և նմանատիպ ձևանմուշային սկաներների կողմից։ Յուրաքանչյուր թողարկում վերածվում է կեղծ դրական արդյունքների աղմկոտ հոսքի, push protection-ը արգելափակում է օրինական commit-ները, իսկ օպերատորները դադարում են վստահել ահազանգերի հոսքին։

`open-sse/utils/publicCreds.ts` օժանդակիչը միաժամանակ լուծում է երկու սահմանափակումները՝

- Հանրային նույնացուցիչը ներդնում է որպես **XOR-ով քողարկված բայթերի հաջորդականություն** (սկզբնաղբյուրում սկաների ձևանմուշ չկա)։
- Կատարման ժամանակ ապակոդավորում է `decodePublicCred` / `resolvePublicCred`-ի միջոցով։
- Հայտնաբերում է արդեն հայտնի նախածանցերին համապատասխանող չմշակված արժեքները (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) և դրանք փոխանցում անփոփոխ, որպեսզի իրենց առկա `.env`-ում չմշակված արժեքներ ունեցող օգտատերերի մոտ ամեն ինչ շարունակի աշխատել՝ **առանց որևէ միգրացիայի**։

Սա **քողարկում է, ոչ թե գաղտնագրում։** Սկզբնաղբյուրը կարդացող ցանկացած անձ կարող է վերականգնել արժեքը, ինչը նորմալ է, քանի որ այդ արժեքն ի սկզբանե հանրային է։ Միակ նպատակը սկաներների կանոնավոր արտահայտությունների համընկնումներից խուսափելն է։

## Պարտադիր ձևանմուշը

### 1. Նոր հանրային հավատարմագրի ավելացում

Երբ անհրաժեշտ է ներդրված ձևով ավելացնել սկզբնաղբյուր մատակարարի տրամադրած նոր արժեք, որը՝

- ստացվում է հանրային CLI-ից / աշխատասեղանի հավելվածից / դիտարկիչի փաթեթից, **և**
- սկզբնաղբյուր մատակարարի փաստաթղթերում նշված է (կամ նրա կողմից դիտարկվում է) որպես հանրային հաճախորդի նույնացուցիչ, **և**
- հակառակ դեպքում կհայտնաբերվեր ձևանմուշային սկաների կողմից (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` և այլն),

…հետևեք այս ստուգաթերթին՝

1. Ստեղծեք քողարկված բայթերի հաջորդականությունը՝

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`-ի `EMBEDDED_DEFAULTS`-ում ավելացրեք նոր գրառում՝ **չեզոք բանալիի անունով** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` և այլն)։ Օժանդակիչում **մի՛ օգտագործեք** `client_secret` կամ `api_key` նման անուններ. այդ բառերը գործարկում են Semgrep-ի ընդհանուր գաղտնիքների կանոնները։

3. Հանրային տիպերի միությանը ավելացրեք `keyof typeof EMBEDDED_DEFAULTS` (այն ինքնաբերաբար արտածվում է)։

4. Սպառող կոդում կոշտ կոդավորված բառացի արժեքը փոխարինեք հետևյալով՝

   ```ts
   // env-ի մեկ վերասահմանում
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // env-ի մի քանի այլընտրանքային անուններ (հաղթում է առաջին ոչ դատարկը)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // առանց env-ի վերասահմանման (միշտ ներդրված լռելյայն արժեքը)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Հեռացրեք բառացի արժեքը `.env.example`-ից (փոխարինեք այն միայն մեկնաբանություններից բաղկացած փաստաթղթավորմամբ, որն ընթերցողներին ուղղորդում է այստեղ)՝

   ```dotenv
   # ── Մատակարար (Google / Firebase / և այլն) ──
   # Հանրային OAuth հավատարմագրերը ներդրված են կոդում՝
   # open-sse/utils/publicCreds.ts-ի միջոցով։ Սահմանեք այս փոփոխականները միայն ձեր սեփական արժեքներն օգտագործելու համար։
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Թարմացրեք `tests/unit/publicCreds.test.ts`-ը՝ նոր բանալիի համար կառուցվածքի ստուգում ավելացնելու նպատակով (ստուգեք ձևաչափը, ոչ թե բառացի արժեքը. ձևանմուշի համար տե՛ս առկա թեստերը)։

7. Թեստային ֆայլերում **երբեք** մի՛ ավելացրեք `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` բառացի արժեքներ։ Օգտագործեք `.join("")` հատվածներից կազմված `FAKE_*` հաստատունները (տե՛ս առկա թեստերը)։

### 2. Սպառողներ

- **Կարդացեք միայն `resolvePublicCred()` / `resolvePublicCredMulti()`-ից**. օժանդակիչից դուրս երբեք ուղղակիորեն մի՛ կանչեք `decodePublicCredBytes()`։
- Օժանդակիչը միտումնավոր թեթև է (բայթերի գծային XOR) և անվտանգ է մոդուլի բեռնման պահին կանչելու համար. լռելյայն արժեքները հաշվարկվում են մեկ անգամ։
- env-ի վերասահմանումը միշտ գերակայում է։ Եթե օգտատերը սահմանում է `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, օժանդակիչն այդ չմշակված արժեքը փոխանցում է անփոփոխ։

### 3. Արգելված ձևանմուշներ

❌ Արտադրական կոդում (`src/`, `open-sse/`, `electron/`, `bin/`) **երբեք** մի՛ կատարեք հետևյալներից որևէ մեկը՝

```ts
// ՎԱՏ Է. բառացի արժեքը գործարկում է Secret Scanning-ը և Semgrep-ը
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ՎԱՏ Է. բառացի արժեքի base64-ը. GitHub-ը դեռ հայտնաբերում է այն 2025-ի փետրվարից
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ՎԱՏ Է. տողերի միակցում, որը կատարման ժամանակ կրկին հավաքում է ձևանմուշը
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ՎԱՏ Է. hex/ROT13 կոդավորում. այլ քողարկում, հայտնաբերման նույն ռիսկը
clientSecret: hexDecode("474f4353..."),
```

Սրանք բոլորն ի վերջո գործարկում են որևէ սկաներ։ Օգտագործեք `resolvePublicCred()`։

❌ `.env.example`-ում **երբեք** մի՛ ավելացրեք բառացի հավատարմագրեր։ Իրական սկզբնաղբյուր արժեքների կարիք ունեցող օգտատերերը կարող են դրանք ինքնուրույն քաղել հանրային CLI-ից կամ օգտագործել OAuth-ի իրենց սեփական գրանցումը։

❌ Գաղտնիքների սկանավորման նոր ահազանգը **երբեք** մի՛ անտեսեք՝ նախապես չստուգելով, թե արդյոք հավատարմագիրը պետք է տեղափոխել այս օժանդակիչ։

## Առնչվող վերահսկիչ միջոցներ

- `publicCreds.ts`-ում `RAW_VALUE_PATTERN`-ը թվարկում է այն նախածանցները, որոնք ակտիվացնում են արժեքի անփոփոխ փոխանցումը (հետադարձ համատեղելիության համար)։ Ընդլայնեք այն միայն փաստաթղթավորված հանրային հավատարմագրերի ձևաչափերի համար, երբեք՝ սեփականատիրական գաղտնիքների համար։
- `.env.example`-ը ներառված է CI-ի `check-env-doc-sync` սկրիպտում․ երբ այստեղից փոփոխական եք հեռացնում, համոզվեք, որ փաստաթղթերը համապատասխանում են։
- `npm run test:vitest` և `node --import tsx/esm --test tests/unit/publicCreds.test.ts` թեստային փաթեթները պետք է երկուսն էլ շարունակեն հաջողությամբ անցնել։

## Երբ ՉՕԳՏԱԳՈՐԾԵԼ այս օգնականը

Այս օգնականը նախատեսված է **միայն** այն հավատարմագրերի համար, որոնք՝

1. Վերադաս մատակարարի կողմից տարածվում են հրապարակայնորեն (CLI-ի երկուական ֆայլ, դիտարկիչի փաթեթ, պաշտոնական փաստաթղթեր)։
2. Փաստաթղթավորված են կամ հիմնավոր կերպով ենթադրվում են որպես ոչ գաղտնի (PKCE-ով պաշտպանված, Firebase Web բանալի կամ նմանատիպ)։

Մնացած ամեն ինչի համար՝ օպերատորի կողմից տրված տոկեններ, յուրաքանչյուր վարձակալի համար առանձին գաղտնիքներ, ձեր սեփական OAuth հավելվածի client_secret, գաղտնագրման բանալիներ, JWT գաղտնիքներ, տվյալների բազայի գաղտնաբառեր, օգտագործեք **միայն միջավայրի փոփոխականներ** (`process.env.FOO`, `||` հետադարձ տարբերակ՝ դատարկ արժեքի / հստակ սխալի համար)։ Դրանք պետք է պահվեն `.env`-ում և [գաղտնագրված հավատարմագրերի պահոցում](./COMPLIANCE.md), ոչ թե սկզբնաղբյուր կոդում։

## Հղումներ

- [Google․ OAuth 2.0 տեղային հավելվածների համար](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase․ API բանալիներ՝ հաճախորդի նույնականացման համար](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning-ի կողմից աջակցվող գաղտնիքներ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub․ տոկենների base64 հայտնաբերում (2025 թ․ փետրվար)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Այս օգնականը ներմուծած commit-ը՝ `1a39c31f` — _fix(security): քողարկել հանրային վերադաս հավատարմագրերը + կենտրոնացնել սխալների սանիտարացումը_
