# CLI Machine-ID Token (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## მიმოხილვა

OmniRoute CLI-ის ბრძანებები ლოკალურ მართვის API-სთან ავთენტიფიკაციისთვის იყენებს
`HMAC-SHA256(machine-id, salt)` ტოკენს, რომელიც იგზავნება
`x-omniroute-cli-token` მოთხოვნის სათაურის მეშვეობით.

ეს საშუალებას აძლევს CLI-ის ქვე-ბრძანებებს (`omniroute status`, `omniroute providers` და სხვ.)
გამოიძახონ მართვის საბოლოო წერტილები ისე, რომ მომხმარებელს ყოველი გამოძახებისას
JWT-ის ან პაროლის მიწოდება არ დასჭირდეს.

## მუშაობის პრინციპი

1. `getMachineTokenSync()` აპარატურის მანქანის ID-ს კითხულობს `node-machine-id`-ის
   მეშვეობით (შეცდომის შემთხვევაში იყენებს ცარიელ სტრიქონს, რითაც CLI ავთენტიფიკაცია ითიშება).
2. ის გამოთვლის `HMAC-SHA256(machine_id, salt)`-ს და აბრუნებს სრულ, 64-სიმბოლოიან
   თექვსმეტობით დაიჯესტს — ამ მანქანასთან დაკავშირებულ დეტერმინისტულ, შეუქცევად ტოკენს.
3. CLI ტოკენს `x-omniroute-cli-token`-ის სახით აგზავნის მხოლოდ მაშინ, როდესაც განსაზღვრული
   დანიშნულება ცალსახა loopback URL-ია (`localhost`, `127.0.0.0/8` ან
   loopback IPv6). ტოკენის შემცველი მოთხოვნები იყენებს `redirect: error`-ს, ამიტომ ლოკალური
   გადამისამართება მას სხვა წყაროსთან ვერ გადააგზავნის. დისტანციური კონტექსტები სანაცვლოდ იყენებს
   განსაზღვრული მოქმედების სფეროს მქონე წვდომის ტოკენებს. თუ ტოკენის წარმოება შეუძლებელია, CLI სათაურს
   გამოტოვებს, ხოლო `omniroute doctor` მარცხის შესახებ აცნობებს, ნაცვლად იმისა, რომ ცარიელი ტოკენი
   ვალიდურად მიიჩნიოს.
4. სერვერი (`src/server/authz/policies/management.ts`) იმავე salt-ით ხელახლა გამოთვლის
   მოსალოდნელ ტოკენს და `timingSafeEqual`-ის მეშვეობით ადარებს, რათა თავიდან აიცილოს
   დროზე დაფუძნებული ამოღება.

## უსაფრთხოების მახასიათებლები

| მახასიათებელი                                    | დეტალები                                                                                                                                                                                                                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **მხოლოდ loopback**                              | მიიღება მხოლოდ მაშინ, როდესაც სერვერის სანდო, peer-ის ლოკალურობის აღმნიშვნელი ნიშანი (რომელიც რეალური TCP peer-ის მისამართიდან მიიღება) მიუთითებს loopback-ზე. ლოკალურობის დასადგენად კლიენტის მიერ კონტროლირებადი `Host` სათაური არასდროს მიიჩნევა სანდოდ. |
| **მუდმივ დროში შედარება**                        | `crypto.timingSafeEqual` ხელს უშლის დროით შეტევებს.                                                                                                                                                                                                         |
| **შეუქცევადი**                                   | HMAC-ის გამომავალი მნიშვნელობიდან machine-id-ის აღდგენა შეუძლებელია.                                                                                                                                                                                        |
| **`always`-ით დაცულის გვერდის ავლა შეუძლებელია** | `isAlwaysProtectedPath()` ფასდება CLI ტოკენის შემოწმებამდე. `/api/shutdown` და `/api/settings/database` ყოველთვის მოითხოვს JWT-ს.                                                                                                                           |
| **არაექსპორტირებადი**                            | ტოკენი არასდროს იწერება დისკზე ან ჟურნალში.                                                                                                                                                                                                                 |

## ნაგულისხმევი salt (შემთხვევითი თითოეული ინსტალაციისთვის)

როდესაც `OMNIROUTE_CLI_SALT` დაყენებული არ არის, salt წარმოადგენს შემთხვევით, 64-სიმბოლოიან
თექვსმეტობით სტრიქონს, რომელიც ერთხელ გენერირდება და ინახება `<DATA_DIR>/cli-token-salt.json`-ში (`0600` რეჟიმით) —
და არა რეპოზიტორიაში შენახულ ლიტერალს `omniroute-cli-auth-v1`. როგორც `getActiveSalt()` ფუნქცია
`src/lib/machineToken.ts`-ში, ისე მისი ასლი `bin/cli/utils/cliToken.mjs`-ში კითხულობს ერთსა და
იმავე ფაილს, ამიტომ ამ ინსტალაციაში სერვერი და CLI-ის ყოველი გამოძახება ერთსა და იმავე
მნიშვნელობაზე თანხმდება; რეპოზიტორიაში შენახული ლიტერალი გამოიყენება მხოლოდ უკიდურეს სარეზერვო ვარიანტად, როდესაც
შენახული ან გარემოს salt ჯერ ვერ დგინდება (მაგალითად, ახალი, მხოლოდ CLI-ის შემცველი ინსტალაცია,
სანამ სერვერი პირველად გაეშვება). ეს აღმოფხვრის ძველი, ფიქსირებული ლიტერალის
ნაგულისხმევ მნიშვნელობასთან დაკავშირებულ სისუსტეს: `/etc/machine-id` ხშირად ყველასთვის წაკითხვადია, ამიტომ ნებისმიერ ლოკალურ მომხმარებელს
სხვაგვარად შეეძლებოდა ერთი და იმავე ტოკენის წარმოება ყველა იმ ინსტალაციისთვის, რომლებშიც
`OMNIROUTE_CLI_SALT` არასდროს დაყენებულა.

## Salt-ის როტაცია

დააყენეთ `OMNIROUTE_CLI_SALT`, რათა მიღებული token კოდის ცვლილებების გარეშე შეცვალოთ — მას ყოველთვის პრიორიტეტი ენიჭება თითოეული ინსტალაციისთვის შენახულ salt-თან შედარებით. როტაციის შემდეგ ამ მოწყობილობაზე გაშვებული ყველა CLI პროცესი ავტომატურად გამოიყენებს ახალ token-ს. ეს სასარგებლოა პროცესების სიის გაჟონვის შემდეგ, რომელმაც შესაძლოა წინა მიღებული მნიშვნელობა გაამჟღავნა.

```bash
# მუდმივი როტაცია (დაამატეთ shell-ის პროფილში)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# შეამოწმეთ, რომ ახალი token გამოიყენება
omniroute status
```

## ძველი ფორმატი (SHA-256, 32 სიმბოლო) — კვლავ მხარდაჭერილია

ზემოთ აღწერილ HMAC ფორმატამდე CLI თავის token-ს იღებდა ფორმულით
`SHA-256(machineId + salt).hex[0..32]` (32-სიმბოლოიანი პრეფიქსი) ფაილში
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` ფაილში `src/lib/machineToken.ts`).

უკუთავსებადობისთვის სერვერი იღებს **ორივე** ფორმატს: შემმოწმებელი ქმნის
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`-ს და შემომავალ
header-ს თითოეულ მათგანთან `timingSafeEqual`-ის გამოყენებით ადარებს
(`src/server/authz/policies/management.ts` და `src/lib/middleware/cliTokenAuth.ts`).
ამრიგად, token მოქმედია, თუ ის ემთხვევა **ან** 64-სიმბოლოიან HMAC digest-ს, **ან** ძველი ფორმატის
32-სიმბოლოიან SHA-256 პრეფიქსს.

**გამორთვა:** CLI token-ის მექანიზმის სრულად გასათიშად დააყენეთ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (გარემოში ან `.env`-ში); ამის შემდეგ ნებისმიერი წვდომა მოითხოვს ცხადად მითითებულ API key-ს. მრავალმომხმარებლიან
host-ებზე ეს რეკომენდებულია, რადგან `machine-id` განისაზღვრება მოწყობილობისთვის (და არა მომხმარებლისთვის) და იმავე host-ზე სხვა მომხმარებელსაც შეუძლია იმავე token-ის გამოთვლა.

## ფაილები

| ფაილი                                     | დანიშნულება                                        |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Token-ის მიღება (`getMachineTokenSync`)            |
| `bin/cli/utils/cliToken.mjs`              | იმავე მიღების CLI მხარის ანალოგი                   |
| `<DATA_DIR>/cli-token-salt.json`          | თითოეული ინსტალაციისთვის შენახული შემთხვევითი salt |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` მუდმივა                         |
| `src/server/authz/policies/management.ts` | სერვერის მხარეს შემოწმება                          |
| `src/server/authz/routeGuard.ts`          | Loopback host-ის შემოწმება (`isLoopbackHost`)      |

## იხილეთ აგრეთვე

- `docs/security/ROUTE_GUARD_TIERS.md` — route-ის დაცვის დონეები
- `docs/architecture/AUTHZ_GUIDE.md` — ავტორიზაციის სრული pipeline
