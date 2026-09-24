# Public Credentials Handling (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **ჭეშმარიტების წყარო:** `open-sse/utils/publicCreds.ts`
> **ტესტები:** `tests/unit/publicCreds.test.ts`
> **ბოლო განახლება:** 2026-08-07 — v3.8.50
> **აუდიტორია:** ინჟინრები, რომლებიც ახდენენ იმ პროვაიდერების ინტეგრაციას, რომელთა საჯარო CLI-ები შეიცავს საჯარო OAuth client_id / client_secret / Firebase Web API გასაღებებს.
> **სტატუსი:** **სავალდებულოა** ყველა ახალი კოდისთვის, რომელიც upstream იდენტიფიკატორებს მოიცავს.

## რატომ არსებობს ეს

- [OAuth 2.0 ნატიური აპებისთვის (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — დაინსტალირებული აპების OAuth client_id / client_secret საჯაროა; რეალურ უსაფრთხოებას PKCE უზრუნველყოფს.
- [Firebase API გასაღებები](https://firebase.google.com/docs/projects/api-keys) — ვებკლიენტის იდენტიფიკატორები განზრახ არის საჯარო.

OmniRoute-მა ეს მნიშვნელობები უნდა ჩააშენოს, რათა მომხმარებლებმა, რომლებიც `.env`-ს არ აკონფიგურირებენ, პირდაპირ მიიღონ გამართული OAuth ნაკადი. ჩაშენებული სარეზერვო მნიშვნელობის გარეშე Gemini / Antigravity პროვაიდერები მუშაობას წყვეტს ყველა მომხმარებლისთვის, რომელიც „უბრალოდ დაკლონე და გაუშვი“ გზას მიჰყვება.

თუმცა, ისეთი ლიტერალური მნიშვნელობები, როგორებიცაა `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`, ემთხვევა **GitHub Secret Scanning-ის**, **Semgrep-ისა** და მსგავსი შაბლონების სკანერების წესებს. ყოველი რელიზი ცრუ დადებითი შედეგების ხმაურიან ნაკადად იქცევა, push protection ბლოკავს ლეგიტიმურ commit-ებს, ხოლო ოპერატორები გაფრთხილებების ნაკადს აღარ ენდობიან.

`open-sse/utils/publicCreds.ts` დამხმარე ორივე შეზღუდვას ერთდროულად აგვარებს:

- საჯარო იდენტიფიკატორს **XOR-ით შენიღბული ბაიტების მიმდევრობის** სახით ჩააშენებს (საწყის კოდში სკანერის შაბლონი არ რჩება).
- გაშვებისას დეკოდირებას `decodePublicCred` / `resolvePublicCred`-ის საშუალებით ახდენს.
- ამოიცნობს ნედლ მნიშვნელობებს, რომლებიც უკვე მიჰყვება ცნობილ პრეფიქსებს (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), და მათ უცვლელად ატარებს, ამიტომ მომხმარებლებისთვის, რომლებსაც არსებულ `.env`-ში ნედლი მნიშვნელობები აქვთ, ყველაფერი **ყოველგვარი მიგრაციის გარეშე** განაგრძობს მუშაობას.

ეს არის **ობფუსკაცია და არა დაშიფვრა.** ნებისმიერ ადამიანს, რომელიც საწყის კოდს წაიკითხავს, შეუძლია მნიშვნელობის აღდგენა — და ეს მისაღებია, რადგან მნიშვნელობა განზრახ არის საჯარო. ერთადერთი მიზანია სკანერის რეგულარულ გამოსახულებებთან დამთხვევების თავიდან აცილება.

## სავალდებულო შაბლონი

### 1. ახალი საჯარო ავტორიზაციის მონაცემის დამატება

როდესაც საჭიროა upstream-ის მიერ მოწოდებული ახალი მნიშვნელობის ჩაშენება, რომელიც:

- მოდის საჯარო CLI-დან / დესკტოპ-აპიდან / ბრაუზერის bundle-იდან, **და**
- upstream პროვაიდერი დოკუმენტაციაში განსაზღვრავს (ან განიხილავს) მას, როგორც საჯარო კლიენტის იდენტიფიკატორს, **და**
- სხვა შემთხვევაში შაბლონების სკანერი მას დაემთხვევა (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` და ა.შ.),

…მიჰყევით ამ საკონტროლო სიას:

1. დააგენერირეთ შენიღბული ბაიტების მიმდევრობა:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`-ში არსებულ `EMBEDDED_DEFAULTS`-ს დაამატეთ ახალი ჩანაწერი **ნეიტრალური გასაღების სახელით** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` და ა.შ.). დამხმარეში **არ გამოიყენოთ** ისეთი სახელები, როგორებიცაა `client_secret` ან `api_key` — ეს სიტყვები Semgrep-ის ზოგად secret წესებს ააქტიურებს.

3. საჯარო ტიპების გაერთიანებას დაამატეთ `keyof typeof EMBEDDED_DEFAULTS` (მისი ინფერენცია ავტომატურად ხდება).

4. მომხმარებელ კოდში მყარად გაწერილი ლიტერალი ჩაანაცვლეთ შემდეგით:

   ```ts
   // ერთი env გადაფარვა
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // რამდენიმე env ფსევდონიმი (პირველი არაცარიელი იმარჯვებს)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env გადაფარვის გარეშე (ყოველთვის ჩაშენებული ნაგულისხმევი მნიშვნელობა)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. ლიტერალი `.env.example`-დან წაშალეთ (ჩაანაცვლეთ მხოლოდ კომენტარებისგან შემდგარი დოკუმენტაციით, რომელიც მკითხველს აქ მიუთითებს):

   ```dotenv
   # ── პროვაიდერი (Google / Firebase / და ა.შ.) ──
   # საჯარო OAuth ავტორიზაციის მონაცემები კოდში ჩაშენებულია
   # open-sse/utils/publicCreds.ts-ის საშუალებით. ეს ცვლადები მხოლოდ საკუთარი მნიშვნელობების გამოსაყენებლად დააყენეთ.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. განაახლეთ `tests/unit/publicCreds.test.ts` და ახალი გასაღებისთვის ფორმის შემოწმება დაამატეთ (შეამოწმეთ ფორმატი და არა ლიტერალური მნიშვნელობა — შაბლონისთვის იხილეთ არსებული ტესტები).

7. **არასოდეს** დაამატოთ `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ლიტერალები სატესტო ფაილებში. გამოიყენეთ `.join("")` ფრაგმენტებით აგებული `FAKE_*` მუდმივები (იხილეთ არსებული ტესტები).

### 2. მომხმარებლები

- **წაიკითხეთ მხოლოდ `resolvePublicCred()` / `resolvePublicCredMulti()`-ის საშუალებით** — დამხმარის გარეთ არასოდეს გამოიძახოთ `decodePublicCredBytes()` პირდაპირ.
- დამხმარე განზრახ მსუბუქია (ბაიტების ხაზოვანი XOR) და მისი გამოძახება მოდულის ჩატვირთვისას უსაფრთხოა; ნაგულისხმევი მნიშვნელობები ერთხელ გამოითვლება.
- env გადაფარვა ყოველთვის იმარჯვებს. თუ მომხმარებელი დააყენებს `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, დამხმარე ამ ნედლ მნიშვნელობას უცვლელად გაატარებს.

### 3. აკრძალული შაბლონები

❌ **არასოდეს** გააკეთოთ ქვემოთ ჩამოთვლილთაგან რომელიმე საწარმოო კოდში (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// ცუდია: ლიტერალური მნიშვნელობა Secret Scanning-სა და Semgrep-ს ააქტიურებს
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ცუდია: ლიტერალის base64 — GitHub მას მაინც ამოიცნობს Feb/2025-დან
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ცუდია: სტრიქონების კონკატენაცია, რომელიც გაშვებისას შაბლონს ხელახლა აწყობს
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ცუდია: hex/ROT13 კოდირება — განსხვავებული ობფუსკაცია, ამოცნობის იგივე რისკი
clientSecret: hexDecode("474f4353..."),
```

საბოლოოდ, ყველა მათგანი სკანერს ააქტიურებს. გამოიყენეთ `resolvePublicCred()`.

❌ **არასოდეს** დაამატოთ ლიტერალური ავტორიზაციის მონაცემები `.env.example`-ში. მომხმარებლებს, რომლებსაც upstream-ის რეალური მნიშვნელობები სჭირდებათ, შეუძლიათ მათი საჯარო CLI-დან თავად ამოღება ან საკუთარი OAuth რეგისტრაციის გამოყენება.

❌ **არასოდეს** უგულებელყოთ საიდუმლოებების სკანირების ახალი გაფრთხილება მანამ, სანამ ჯერ არ შეამოწმებთ, უნდა გადავიდეს თუ არა ავტორიზაციის მონაცემი ამ დამხმარეში.

## დაკავშირებული კონტროლები

- `publicCreds.ts`-ში არსებული `RAW_VALUE_PATTERN` ჩამოთვლის პრეფიქსებს, რომლებიც პირდაპირ გადაცემას იწვევს (უკუთავსებადობისთვის). გააფართოეთ ის მხოლოდ დოკუმენტირებული საჯარო ავტორიზაციის მონაცემების ფორმატებისთვის და არასოდეს — საკუთრების უფლებით დაცული საიდუმლოებისთვის.
- `.env.example` CI-ის `check-env-doc-sync` სკრიპტით მოწმდება — როდესაც აქედან ცვლადს შლით, დარწმუნდით, რომ დოკუმენტაციაც შესაბამისობაშია.
- `npm run test:vitest` და `node --import tsx/esm --test tests/unit/publicCreds.test.ts` ტესტების ნაკრებები ორივე წარმატებით უნდა სრულდებოდეს.

## როდის არ უნდა გამოიყენოთ ეს დამხმარე ფუნქცია

ეს დამხმარე ფუნქცია განკუთვნილია **მხოლოდ** იმ ავტორიზაციის მონაცემებისთვის, რომლებიც:

1. საჯაროდ ვრცელდება ზედა დონის პროვაიდერის მიერ (CLI-ის ბინარული ფაილი, ბრაუზერის ნაკრები, ოფიციალური დოკუმენტაცია).
2. დოკუმენტირებულია ან აშკარად იგულისხმება, რომ კონფიდენციალური არ არის (PKCE-ით დაცული, Firebase Web-ის გასაღები ან მსგავსი).

ყველა სხვა შემთხვევაში — ოპერატორის მიერ გაცემული ტოკენები, თითოეული ტენანტის საიდუმლოები, თქვენი OAuth აპის client_secret, დაშიფვრის გასაღებები, JWT-ის საიდუმლოები, მონაცემთა ბაზის პაროლები — გამოიყენეთ **მხოლოდ გარემოს ცვლადები** (`process.env.FOO`, `||`-ით უკუგდება ცარიელ მნიშვნელობაზე / ცხად შეცდომაზე). ისინი უნდა ინახებოდეს `.env`-ში და [ავტორიზაციის მონაცემების დაშიფრულ საცავში](./COMPLIANCE.md), და არა საწყის კოდში.

## წყაროები

- [Google: OAuth 2.0 ნატიური აპებისთვის](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-ის გასაღებები კლიენტის იდენტიფიკაციისთვის](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning-ის მიერ მხარდაჭერილი საიდუმლოები](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ტოკენების base64-ის ფორმატში აღმოჩენა (თებ. 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ამ დამხმარე ფუნქციის შემომტანი კომიტი: `1a39c31f` — _fix(security): საჯარო ზედა დონის ავტორიზაციის მონაცემების შენიღბვა + შეცდომების სანიტიზაციის ცენტრალიზება_
