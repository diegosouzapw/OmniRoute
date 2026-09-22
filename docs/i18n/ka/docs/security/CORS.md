# CORS Configuration & Security (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ცენტრალიზებული ნებადართული სიიდან განსაზღვრავს, **ბრაუზერის რომელ წყაროებს** შეუძლიათ სხვადასხვა წყაროდან მიღებული პასუხების წაკითხვა. მოდელი **ნაგულისხმევად ყველაფერს კრძალავს**:
არცერთი წყარო არ არის დაშვებული, სანამ მას თავად არ დაამატებთ. ამ გვერდზე აღწერილია, როგორ განისაზღვრება ნებადართული სია, რეალურად რას ხდის ხელმისაწვდომს `CORS_ALLOW_ALL=true` (და, რაც მნიშვნელოვანია, რას **არ** ხდის), როგორ გამართოთ დეველოპმენტისა და საწარმოო გარემოები უსაფრთხოდ და რა გაფრთხილებას აჩვენებს დაფა შესრულების დროს, როდესაც wildcard აქტიურია.

**სანდო წყარო:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). ნებადართული სია ერთხელ, middleware-ში
(`src/server/authz/pipeline.ts`) გამოიყენება — ცალკეული მარშრუტების დამმუშავებლები
`Access-Control-Allow-Origin`-ს თავად არ ადგენენ.

## როგორ განისაზღვრება წყარო

თითოეული მოთხოვნისთვის middleware `Access-Control-Allow-Origin`-ის მნიშვნელობას
შემდეგი თანმიმდევრობით გამოთვლის:

1. **`CORS_ALLOW_ALL=true`** (ან მოძველებული `CORS_ORIGIN=*`) → აბრუნებს გამომძახებლის
   `Origin`-ს (ან `*`-ს, როცა `Origin` სათაური არ არსებობს), `Vary: Origin`-თან ერთად,
   რათა კეშები გამართულად მუშაობდეს. იგივე `applyCorsHeaders()` საკონტროლო წერტილი
   ასევე ამატებს `Vary: Accept-Encoding`-ს სხეულის მქონე ყოველ 2xx პასუხზე, token-ით ავთენტიფიცირებულ
   `/v1*`/`/v1beta*` ზედაპირზე (`relaxForTokenAuth`, RFC 9110 §12.5.5, საკითხი #6737), რათა
   ქვედა დონის/გაზიარებულმა კეშებმა შეკუმშული და შეუკუმშავი
   ვარიანტები სწორად განასხვაონ.
2. წინააღმდეგ შემთხვევაში, მოთხოვნის `Origin` ნორმალიზდება (გარდაიქმნება ქვედა რეგისტრში,
   ბოლოში არსებული დახრილი ხაზი იშლება) და მოწმდება **გაერთიანებულ ნებადართულ სიასთან**:
   - გარემოს ცვლადი **`CORS_ALLOWED_ORIGINS`** — მძიმით გამოყოფილი სია, და
   - შესრულების დროის პარამეტრი **`corsOrigins`** (დაფა → უსაფრთხოება → _CORS-ის ნებადართული
     წყაროები_), რომელიც `setRuntimeAllowedOrigins()`-ის მეშვეობით
     `src/lib/config/runtimeSettings.ts`-დან გადაეცემა.
3. დამთხვევა არ არის → **`Access-Control-Allow-Origin` სათაური არ გაიცემა**. ბრაუზერი
   სხვადასხვა წყაროდან წაკითხვას ბლოკავს. ეს არის ნაგულისხმევი, განზრახ ყველაფერი-აკრძალული ქცევა.

| გარემოს ცვლადი         | მნიშვნელობა                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | დასაშვები ზუსტი წყაროების CSV (რეკომენდებული).                                                  |
| `CORS_ALLOW_ALL`       | `true`/`1` → ნებისმიერი წყაროს დაბრუნება (wildcard). მხოლოდ დეველოპმენტისთვის.                  |
| `CORS_ORIGIN`          | მოძველებული. `*` იქცევა `CORS_ALLOW_ALL`-ის მსგავსად; ერთი მნიშვნელობა ნებადართულ სიას ემატება. |

## საფრთხეების მოდელი — რეალურად რას ხდის ხელმისაწვდომს `CORS_ALLOW_ALL=true`

OWASP-ის ზოგადი გაფრთხილება („wildcard CORS = ნებისმიერ საიტს შეუძლია თქვენს API-ს მიმართოს“)
სერიოზულად მისაღებია, თუმცა OmniRoute-ის ზემოქმედების არეალი **ზოგად შემთხვევაზე უფრო ვიწროა**,
ერთი კონკრეტული იმპლემენტაციის ფაქტის გამო:

> **ცენტრალური `applyCorsHeaders()` არასდროს გასცემს
> `Access-Control-Allow-Credentials`-ს.** ბრაუზერი სხვადასხვა წყაროდან მიღებულ _ავტორიზებულ_
> (cookie-ს შემცველ) პასუხს ხელმისაწვდომს არ გახდის, თუ სერვერი არ აგზავნის
> `Access-Control-Allow-Credentials: true`-ს. OmniRoute-ის CORS-ის საერთო გზა ამას არასდროს
> აკეთებს.

ეს თითოეული ზედაპირისთვის, `CORS_ALLOW_ALL=true`-ის შემთხვევაშიც კი, შემდეგს ნიშნავს:

| ზედაპირი                                    | ავთენტიფიკაციის მექანიზმი    | wildcard CORS-ის ეფექტი                                                                                                                                                                                                                 |
| ------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| დაფა / MANAGEMENT `/api/*`                  | Cookie-ს სესია               | წყარო ბრუნდება, მაგრამ **`Allow-Credentials`-ის გარეშე** ბრაუზერი ავტორიზებული პასუხის წაკითხვას **ბლოკავს**. მავნე, სხვა წყაროს საიტს თქვენი ავთენტიფიცირებული დაფის პასუხების **წაკითხვა არ შეუძლია** და სესიის cookie არ მჟღავნდება. |
| კლიენტის API `/v1/*`, `/v1beta/*`           | Bearer / `x-api-key` სათაური | უკვე დაშვებულია **დიზაინის მიხედვით** (`relaxForTokenAuth`): ბრაუზერები `Authorization`/`x-api-key`-ს ავტომატურად არასდროს ურთავენ, ამიტომ თავდამსხმელის გვერდი თქვენს გასაღებს ვერ წარადგენს. `CORS_ALLOW_ALL` ამას არ აფართოებს.      |
| საჯარო, მხოლოდ წასაკითხი (`/api/health`, …) | არცერთი                      | არაკონფიდენციალურია; wildcard უვნებელია.                                                                                                                                                                                                |

ამგვარად, `CORS_ALLOW_ALL=true`-ის **ნარჩენი** ზემოქმედება შემოიფარგლება შემდეგით: (a)
ავტორიზაციის მონაცემების გარეშე, სხვადასხვა წყაროდან უკვე არაავთენტიფიცირებული მონაცემების
**წაკითხვა**, და (b) მართვის მარშრუტებზე CORS-ის **წინასწარი მოთხოვნის გავლა** — თუმცა მათ კვლავ
სჭირდებათ ავტორიზაცია, რომლის მიწოდებაც სხვა წყაროს გვერდს არ შეუძლია. CORS-ის საერთო გზაზე
ეს **არ არის** სესიის მიტაცების ან ავტორიზაციის მონაცემების მოპარვის ვექტორი.

### ერთი რეალური გამონაკლისი — `/api/v1/agents/`

Cloud-Agent-ის მარშრუტები (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) საკუთარ
CORS სათაურებს ადგენენ
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) და `Access-Control-Allow-Credentials: true`-თან
ერთად **გასცემენ**
`Access-Control-Allow-Origin: <origin>|*`-საც. ეს ერთადერთი ზედაპირია, სადაც
წყაროს დაბრუნება და ავტორიზაციის მონაცემები თანაარსებობს, და ის
`CORS_ALLOW_ALL`-ისგან **დამოუკიდებელია**. ეს მარშრუტები მართვის დონის ავთენტიფიკაციას იყენებენ
(`requireManagementAuth`); ოპერატორებმა, რომლებიც დაფას ჰოსტის გარედან ხელმისაწვდომს ხდიან,
უნდა გაითვალისწინონ, რომ ეს ერთადერთი ადგილია, სადაც პასუხის სათაურები სხვადასხვა წყაროდან
ავტორიზებული პასუხის წაკითხვას უშვებს. მისი მკაფიო ნებადართული სიით შეზღუდვა
CORS-ის ამ სახელმძღვანელოსგან დამოუკიდებლად აღირიცხება.

## Production-ის საკონტროლო სია

- **Production-ში არასოდეს დააყენოთ `CORS_ALLOW_ALL=true`.** დატოვეთ დაუყენებელი.
- მიუთითეთ origin-ების **ცალსახა** სია — ან გარემოს ცვლადში, ან Security ჩანართის ველში:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- თუ OmniRoute მუშაობს reverse proxy-ის / გვირაბის (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) უკან, CORS თქვენი **ერთადერთი** კონტროლის მექანიზმი არ არის —
  loopback მარშრუტების დამცავი კვლავ იცავს პროცესების გაშვების შესაძლებლობის მქონე
  მარშრუტებს (იხილეთ [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). 403-ის
  „გამოსასწორებლად“ არ გააყალბოთ `X-Forwarded-For: 127.0.0.1`; ეს ხელახლა ხსნის
  RCE კლასის მოწყვლადობას, რომელსაც მარშრუტების დამცავი კეტავს.
- შეამოწმეთ გაშვების გარემოს მდგომარეობა: როდესაც `CORS_ALLOW_ALL=true`
  აქტიურია, Dashboard → Security → Authorization Inventory-ის ქვეშ ნაჩვენებია
  **მუდმივი ქარვისფერი ბანერი**, ხოლო `/api/settings/authz-inventory` აბრუნებს
  `cors: { allowAll, allowedOrigins }` გარსს, რომლის პერიოდულად გამოკითხვაც
  მონიტორინგის ხელსაწყოებს შეუძლიათ.

## დეველოპმენტის მოხერხებულობა — დაუშვით კონკრეტული ლოკალური origin-ები

Wildcard იშვიათად გჭირდებათ, თუნდაც დეველოპმენტისას. დაუშვით მხოლოდ ის
დეველოპმენტის სერვერები, რომლებსაც იყენებთ:

```bash
# Vite-ის (5173) და Next.js-ის (3000) დეველოპმენტის სერვერები, რომლებიც ლოკალურ OmniRoute-ს მიმართავენ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origin-ები შედარდება რეგისტრის გაუთვალისწინებლად, ხოლო ბოლოში არსებული slash
უგულებელყოფილია, ამიტომ `http://localhost:3000` და `http://localhost:3000/`
ეკვივალენტურია. იგივე CSV გაშვების დროსაც შეიძლება დაყენდეს **Dashboard →
Security → CORS Allowed Origins**-ში, გადატვირთვის გარეშე.

## API გასაღებები და cookie-ს სესიები

- **Bearer / `x-api-key` (`/v1/*` inference ზედაპირი):** ბრაუზერები მათ
  ავტომატურად არასოდეს ურთავენ. აქ CORS რეალური ბარიერი არ არის — ბარიერი API
  გასაღებია — ამიტომ ეს ზედაპირი განზრახ permissive-ია, რათა ბრაუზერისა და
  Electron-ის კლიენტებმა წაიკითხონ პასუხები, რომლებზეც მათ ისედაც აქვთ წვდომა.
- **Cookie-ს სესია (dashboard):** დაცულია როგორც fail-closed ნაგულისხმევი
  პარამეტრით, **ასევე** საერთო გზაზე `Access-Control-Allow-Credentials`-ის
  არარსებობით. მართვის/dashboard-ის origin-ები არ შეიტანოთ არცერთ permissive
  კონფიგურაციაში; ისინი ზუსტად fail-closed რეჟიმში უნდა დარჩეს.

## მაგალითი: reverse proxy OmniRoute-ის წინ

CORS-ს თავად OmniRoute აღასრულებს, ამიტომ proxy-მ, ჩვეულებრივ, **არ უნდა**
დაამატოს ან გადაწეროს `Access-Control-*` სათაურები (ორმაგი სათაურები ბრაუზერების
მუშაობას არღვევს). დაასრულეთ TLS და გადაამისამართეთ მოთხოვნა — preflight-ს
OmniRoute-მა უპასუხოს:

```nginx
# nginx — გადაამისამართეთ OmniRoute-ზე; აქ Access-Control-* არ ჩასვათ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For არ დააყენოთ 127.0.0.1-ზე — ეს loopback მარშრუტების დამცავს აუვლის გვერდს.
}
```

ბრაუზერის დაშვებული origin-ები დააყენეთ OmniRoute-ში
(`CORS_ALLOWED_ORIGINS` ან Security ჩანართი) და არა proxy-ში.

## საწყისი ფაილები

| საკითხი                                              | ფაილი                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist-ის განსაზღვრა + `getCorsStatus()`          | `src/server/cors/origins.ts`                                         |
| Middleware-ის გამოყენება (სიმართლის ერთადერთი წყარო) | `src/server/authz/pipeline.ts`                                       |
| Settings → გაშვების გარემოში origin-ების ჩასმა       | `src/lib/config/runtimeSettings.ts`                                  |
| გაშვების გარემოს სტატუსი dashboard-ისთვის            | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard-ის გამაფრთხილებელი ბანერი                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ველი                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent-ის თითოეული მარშრუტის CORS (გამონაკლისი) | `src/lib/cloudAgent/api.ts`                                          |

## აგრეთვე იხილეთ

- [მარშრუტის დამცავი მექანიზმების დონეები](./ROUTE_GUARD_TIERS.md) — loopback-ის სავალდებულო გამოყენება
  პროცესების გაშვების შესაძლებლობის მქონე მარშრუტებისთვის (ცალკეული, შემავსებელი კონტროლი).
- [ავტორიზაციის სახელმძღვანელო](../architecture/AUTHZ_GUIDE.md) — ავტორიზაციის სრული კონვეიერი.
