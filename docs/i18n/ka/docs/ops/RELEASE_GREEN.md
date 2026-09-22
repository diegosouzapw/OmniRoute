# Release-Green: keeping the queue and release branch green (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## პრობლემა, რომელსაც ეს აგვარებს

**სრული გეითი** (`.github/workflows/ci.yml` — unit შარდები, vitest, ratchet-ები,
`package-artifact`, SonarQube, E2E) სრულდება **მხოლოდ რელიზის PR-ზე** (PR → `main`). PR-ები, რომელთა სამიზნეცაა
`release/**`, გადიან **სწრაფ გეითებს** (`quality.yml`: TIA-ის მიერ ზემოქმედებული ტესტები + ტიპების შემოწმება + lint)
და, კოდის ცვლილებებისთვის, **სარეკომენდაციო** production build-ს. შედეგი: მხოლოდ რელიზზე გამოვლენილი წარუმატებლობები შესაძლოა
ჩუმად დაგროვდეს რელიზის ბრენჩზე და რელიზის დროს **~40-წუთიან ფენებად აფეთქდეს**,
სათითაოდ.

„release-green ოჯახი“ არსებობს ამ წარუმატებლობების **წინასწარ გამოსავლენად** — სრული
გეითის ეკვივალენტის ვალიდაცია **ლოკალურად / რელიზის გარეთ**, ნებისმიერ დროს, რათა რელიზის PR
CI-ის პირველივე გაშვებაზე უკვე მწვანე იყოს.

> **არადათმობადი პრინციპი:** აქედან არაფერი ბლოკავს კონტრიბუტორს. ჩვენ არ ვამატებთ სავალდებულო
> შემოწმებას, რომელიც მის PR-ს წარუმატებლად მონიშნავს. **გადახრა** (ratchet-ები) განკუთვნილია მეინთეინერისთვის, რათა რელიზისას საბაზისო დონე ხელახლა დაადგინოს —
> ეს არასოდეს არის კონტრიბუტორის საზრუნავი. არცერთი ნაწილი არ **ხურავს** PR-ს (ავტორობის მითვისება) და არც
> ტესტს **ასუსტებს** მის გასავლელად.

## ოჯახი (4 ნაწილი) — და როგორ სრულდება თითოეული დამოუკიდებლად

| ნაწილი                                                                       | რას წარმოადგენს                                                                        | როდის უნდა გაეშვას                                                           | მასშტაბი                             |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| **`/green-prs`** (გადაწყვეტა A)                                              | მეინთეინერის მიერ **ღია PR-ების რიგის** მოთხოვნისამებრ სკანირება                       | **დამოუკიდებლად, პერიოდულად** — და განსაკუთრებით **`/generate-release`-მდე** | PR-ების მთელი რიგი → `release/**`    |
| **`/validate-release-green`** (გადაწყვეტა C — `npm run check:release-green`) | ვალიდაციის ძრავა: ბრენჩის ან გაერთიანების კანდიდატის მიმართ სრული გეითის რეპროდუცირება | დამოუკიდებლად, ნებისმიერ დროს                                                | კონკრეტული ბრენჩი ან გაერთიანების PR |
| **`/babysit <PR#>`**                                                         | **ერთი** PR-ის **ცოცხალი CI-ის** მწვანე მდგომარეობამდე მიყვანა                         | დამოუკიდებლად, თითოეული PR-ისთვის                                            | ერთი PR                              |
| **`nightly-release-green.yml`** (გადაწყვეტა D)                               | ავტომატიზებული ღამის workflow; HARD წარუმატებლობისას ხსნის issue-ს                     | ავტომატურად (cron)                                                           | აქტიური რელიზის ბრენჩი               |

**მოკლე პასუხი კითხვაზე „ეს მხოლოდ რელიზებისთვისაა?“:** **არა.** `/green-prs` შექმნილია
**პერიოდულად, რელიზებს შორის** გასაშვებად. დამოუკიდებლად გაშვება მისი გამოყენების ჩვეულებრივი რეჟიმია — რელიზი მხოლოდ
ის მომენტია, როდესაც მისი გაშვება ყველაზე მეტ სარგებელს იძლევა.

## PR-იდან რელიზამდე სარეკომენდაციო აწყობა

`quality.yml` ახლა მოიცავს `Build (advisory)` შემოწმებას არაშავ PR-ებისა და Mergify-ის რიგის ბრენჩებისთვის.
ის იმეორებს `ci.yml`-ში არსებულ საწარმოო აწყობის რეცეპტს: Node 24, `npm-ci-retry`,
`check:node-runtime` და `npm run build` პარამეტრით `OMNIROUTE_USE_TURBOPACK=1`. ის განზრახ
არ ტვირთავს აწყობის არტეფაქტს, რადგან ამ სამუშაო პროცესში მას არცერთი შემდგომი ხარისხის დავალება არ იყენებს.
სტაბილური release-PR გაშვებების ერთი კვირის შემდეგ წაშალეთ `continue-on-error`, რათა ეს სიგნალი
PR-იდან რელიზამდე დამბლოკავ კარიბჭედ იქცეს.

## გადაწყვეტა C — `npm run check:release-green` (ძრავა)

მიმდინარე სამუშაო ხეზე იმეორებს რელიზის ეკვივალენტურ ვალიდაციას და თითოეულ წითელ შედეგს ახარისხებს:

- **HARD** (typecheck, lint-ის შეცდომები, unit, vitest, db-rules, public-creds, არასავალდებულო
  `package-artifact`) → **რეალური დეფექტი**; `exit 1`. სწორდება საწყის ბრენჩზე (TDD, წესი #18).
- **DRIFT** (eslint-ის **გაფრთხილებები**, cognitive-complexity, file-size) → ციკლის განმავლობაში
  დაგროვებული ზღვრული მნიშვნელობების აცდენა, **არა კონტრიბუტორის ბრალი**; ის მხოლოდ ანგარიშდება და
  **რელიზისას ხელახლა საბაზისო მნიშვნელობად განისაზღვრება მომვლელის მიერ**. DRIFT **არასოდეს** ცვლის
  გასვლის კოდს — ამიტომ ის არასოდეს არავის ბლოკავს.

```bash
npm run check:release-green                 # მიმდინარე ბრენჩი (სამუშაო ხე)
node scripts/quality/validate-release-green.mjs --json   # სტრუქტურირებული გამოტანა
node scripts/quality/validate-release-green.mjs --quick  # გამოტოვებს unit+vitest-ს (მხოლოდ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # მოიცავს package-artifact-ს (ნელი)
```

მხოლოდ დიაგნოსტიკასა და **ანგარიშგებას** ახორციელებს (ავტომატური შესწორების გარეშე). მწვანე მდგომარეობამდე
შესწორების ორკესტრაცია განთავსებულია `/green-prs`-სა და `/review-prs`-ში.

## გადაწყვეტა A — `/green-prs` (რიგის სკანირება)

პროცედურა (შეჯამება — დეტალებისთვის იხილეთ `green-prs`-ის უნარი):

1. აქტიური რელიზის ბრენჩის მიმართ ღია PR-ების რიგის **ინვენტარიზაცია**.
2. თითოეული PR-ის **ტრიაჟი** (სიცოცხლისუნარიანი / უარსაყოფი / საჭიროებს ავტორს) — უარსაყოფი/საჭიროებს ავტორს
   **ანგარიშდება და არ იხურება** (გადაწყვეტილებას ავტორი იღებს).
3. თითოეული სიცოცხლისუნარიანი PR-ისთვის, **იზოლირებულ worktree-ში** (წესი #19), მიიყვანეთ PR
   რელიზის ბოლო წერტილამდე და გაუშვით `npm run check:release-green`:
   - **HARD** → შეასწორეთ **კონტრიბუტორის ბრენჩზე** თანაავტორობით (ინარჩუნებს ავტორის „Merged“ სტატუსს),
     ხელახლა გაუშვით, სანამ ყველა HARD არ აღმოიფხვრება.
   - **DRIFT** → დატოვეთ უცვლელად; რელიზისას მისი საბაზისო მნიშვნელობა ხელახლა განისაზღვრება.
4. **წარადგინეთ** PR × (ვერდიქტი, HARD წითელი შედეგები, შესწორდა?, DRIFT, ახლა release-green არის?) ცხრილი.

შეუძლია რიგის **მომზადება** შერწყმის გარეშე; აერთიანებს მხოლოდ პირდაპირი მოთხოვნის შემთხვევაში — და PR-ს არასოდეს ხურავს.

## რეკომენდებული პერიოდულობა

- გაუშვით **`/green-prs` პერიოდულად** (მაგ., ყოველკვირეულად) და **ყოველთვის
  `/generate-release`-ის წინ**.
- შეინარჩუნეთ **`nightly-release-green.yml`** (გადაწყვეტა D), როგორც უწყვეტი სიგნალი: როდესაც ის
  HARD წითელი შედეგის საკითხს გახსნის, სკანირების დროა.
- გამოიყენეთ **`/validate-release-green`** საჭიროებისამებრ ბრენჩის ან კონკრეტული შერწყმის კანდიდატის შესამოწმებლად.
- გამოიყენეთ **`/babysit <PR#>`**, როდესაც კონკრეტული PR-ის მწვანე მდგომარეობამდე მიყვანაა საჭირო ცოცხალ CI-ზე.

## კავშირი რელიზთან

- `/generate-release` ვალიდაციას იძახებს **ფაზა 0-ში (წინასწარი შემოწმება)**: ხელახლა განსაზღვრავს
  DRIFT-ის საბაზისო მნიშვნელობას და ასწორებს HARD-ს რელიზის PR-ის გახსნამდე.
- `/review-prs` შერწყმის გადაწყვეტილების ეტაპზე იყენებს release-green კარიბჭეს (მწვანე მდგომარეობა შერწყმამდე).

ყველა ნაწილის მიზანი ერთია: **მწვანე რელიზის PR CI-ის პირველივე გაშვებაზე**, ნაცვლად იმისა, რომ
რელიზის დღეს 40-წუთიან ფენებად მივყვეთ წითელ შედეგებს.
