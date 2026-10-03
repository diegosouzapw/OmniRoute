# Quality Gates Reference (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

ეს დოკუმენტი OmniRoute-ში CI-ის ხარისხის ყველა ბარიერის ავტორიტეტული ცნობარია.
იგი აღწერს თითოეულ ბარიერს, რას ამოწმებს ის, რომელ CI დავალებაში სრულდება, იყენებს თუ არა
ეტალონის ეტაპობრივი გამკაცრების ან ჩაბარება/ჩავარდნის პოლიტიკას და ბლოკავს თუ არა აგებას, თუ მხოლოდ სარეკომენდაციო ხასიათი აქვს.

მოკლე შეჯამებისა და დაშვებული გამონაკლისების სიის პოლიტიკისთვის იხილეთ სექცია „Quality Gates & Ratchets“
ფაილში `AGENTS.md`. იმავე სისტემის კრიტიკული შეფასების, სიმწიფის კლასიფიკაციისა და კონკრეტულ ხელსაწყოებზე დამოუკიდებელი
გამეორების გეგმისთვის იხილეთ
[ხარისხის ბარიერების სახელმძღვანელო](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## გეითების ინვენტარი და შესრულების პროფილები

### კანდიდატის დაშვება

CI და Quality Gates სამუშაო პროცესები თითოეული გასცემს სტაბილურ ვერდიქტს: `Gate / CI` და
`Gate / Quality`. მათი ვერსირებული დაშვების პოლიტიკა თითოეულ ზედა დონის დავალებას
სავალდებულოდ ან სარეკომენდაციოდ განსაზღვრავს. შესაბამისი სავალდებულო დავალება წარმატებით უნდა დასრულდეს:
არარსებული, გაუქმებული, გამოტოვებული, მოლოდინის რეჟიმში მყოფი და უცნობი შედეგები PASS სტატუსს ვერ ადასტურებს. მხოლოდ
დოკუმენტაციასთან ან მხოლოდ კატალოგთან დაკავშირებულმა მართებულმა კლასიფიკაციამ შესაძლოა კოდის ნაკადი შეუსაბამოდ აქციოს;
შავი PR მიღებულ კანდიდატად არ ითვლება. `hotfix` ჭდე მტკიცებულების მოთხოვნას არ აუქმებს.

ორივე სამუშაო პროცესი მოიცავს PR-ებსა და main/release განშტოებებში გაგზავნილ ცვლილებებს, ხელით გაშვებასა და
merge-group მოვლენებს. Push, dispatch და merge-group სრულ შერჩევას უშვებს. ფორკები
და merge-group-ები ჰოსტირებულ რანერებს იყენებს იმ დავალებებისთვის, რომლებიც სხვა შემთხვევაში თვითჰოსტირებულ
რანერებს აირჩევდა; დანერგვამდე უნდა შემოწმდეს ჰოსტირებული სიმძლავრის საკმარისობა.

თითოეული JSON ქვითარი განსაზღვრავს ამოღებულ SHA-ს, სამუშაო პროცესის გაშვებასა და მცდელობას.
CLI უარყოფს checkout/event SHA შეუსაბამობას. სამუშაო პროცესის ტესტები პოლიტიკის წევრობას
ვერდიქტის დავალების `needs` სიას უკავშირებს, რათა ახალი ან წაშლილი ნაკადი შეუმჩნევლად არ გაქრეს.
ქვითრები მოიცავს საკუთარ სამუშაო პროცესს და არა გამოქვეყნებას, განთავსებას ან არსებული
სარეკომენდაციო სკანერის შიდა მუშაობას. განშტოების წესებში ორივე შემოწმების სახელის გააქტიურება
ცალკე ადმინისტრაციული ცვლილებაა; ამ დავალებების დამატება თავისთავად არ იცავს განშტოებას.

### სტატიკური სკანირების ინვენტარი

ვერსირებული npm-ფსევდონიმების ინვენტარი და სტატიკური სკანირების წევრობა განთავსებულია
`config/quality/gate-manifest.json`-ში. სკრიპტების სახელებისა და ზუსტი ბრძანებების
`package.json`-თან შესადარებლად გაუშვით `npm run check:gate-manifest`; დამატებები, წაშლები და
ბრძანებების გადახრა წარუმატებელს ხდის როგორც ლოკალურ ჰუკს, ისე CI-ში ცვლილებების კლასიფიკაციის დავალებებს.
ფსევდონიმი არ არის სამუშაო პროცესის დავალება, მატრიცის ეგზემპლარი ან სატესტო შემთხვევა: ეს რაოდენობები
ურთიერთჩანაცვლებადად არ უნდა იყოს წარმოდგენილი.

არჩეული ფსევდონიმების შესრულების გარეშე შესამოწმებლად გამოიყენეთ `npm run quality:scan -- --list` ან `npm run quality:scan:fast -- --list`.
რანერი npm-ის შესვლის წერტილს იძახებს, ამიტომ მისი შესრულების გარემო (მათ შორის Bun, სადაც კონფიგურირებულია) შენარჩუნებულია.
მანიფესტი ამ პროფილების მიღმა არსებულ ფსევდონიმებს ცალკე გამოძახებულად აღრიცხავს, ხოლო
მომსახურების ბრძანებები მხოლოდ-წაკითხვის სკანირების პროფილებში აკრძალულია.

ეს პროფილები მხოლოდ სტატიკურ სკანირებას მოიცავს. ისინი არ ადასტურებს პროდუქტის ტესტებს,
დაფარვას, პაკეტირებას, გარე შემოწმებებს ან კანდიდატის რელიზისთვის სრულ დაშვებას.
სამუშაო პროცესში დაშვება იყენებს დაკავშირებულ `config/quality/admission-policy.json`-სა და
`scripts/quality/admission-verdict.mjs`-ს. Release-observer პროფილები განცალკევებული რჩება;
მათი შესაბამისი შემოწმებები და ქვითრები დამოუკიდებლად შეამოწმეთ. ქვემოთ მოცემული ტექსტური
ინვენტარი საცნობაროა და არა იმის მტკიცებულება, რომ გეითი რეალურად გაეშვა.

სკრიპტები განთავსებულია `scripts/check/`-ში (პოლიტიკის გეითები) და `scripts/quality/`-ში (ratchet ძრავა).
CI-ის ჭეშმარიტების წყაროა `.github/workflows/ci.yml`.

### Release PR-ის სწრაფი გზა (`quality.yml`)

`.github/workflows/quality.yml` ავსებს CI-ს main/release PR-ებზე, დაცულ განშტოებებში
გაგზავნილ ცვლილებებზე, dispatch-სა და merge-group-ებზე. PR-ები იყენებს ბილიკებით გაფილტრულ სწრაფ შემოწმებებს. მუდმივად
გამორთული დუბლირებული აგება წაიშალა; რეალური აგების/პაკეტირების/ჩატვირთვის შემოწმებები CI-ში რჩება.

| დავალება                                         | ფარგლები                                                                                                                                                                                                                       | ბლოკირებადი            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `Docs Gates (fast-path)`                         | დოკუმენტაციის/კოდის PR-ები; API დოკუმენტაციის ბმულები და სრულად დოკუმენტაცია                                                                                                                                                   | დიახ                   |
| `Fast Quality Gates`                             | კოდის PR-ები; სტატიკური შემოწმებები, ტიპების შემოწმება, დაფის ტიპების შემოწმება, ზემოქმედებული მოდულური ტესტები                                                                                                                | დიახ                   |
| `Forgotten sibling tests`                        | კოდის PR-ები; შეცვლილი მოდულების მიკვლევა სტატიკურ მომხმარებლებსა და შესაძლო მონათესავე ტესტებამდე; barrel და dynamic-import ბილიკები წარმოდგენილია სარეკომენდაციო დიაგნოსტიკის სახით, მითითებული დაშვების სიის გამონაკლისებით | **სარეკომენდაციო**     |
| `Vitest (fast-path)`                             | კოდის PR-ები; სწრაფი vitest ნაკრები                                                                                                                                                                                            | დიახ                   |
| `Unit Tests fast-path`                           | კოდის PR-ები; 4-შარდიანი მოდულური ტესტების ნაკრები                                                                                                                                                                             | დიახ                   |
| `No new ESLint warnings`                         | კოდის PR-ები; გამონაკლისების გათვალისწინების მქონე lint დამცავი                                                                                                                                                                | დიახ, ფორკების ჩათვლით |
| `Merge integrity (changelog + generated skills)` | არაშავი PR-ები; ცვლილებების ჟურნალისა და გენერირებული უნარების სინქრონიზაცია                                                                                                                                                   | დიახ, ფორკების ჩათვლით |

#### დავიწყებული მონათესავე ტესტების ანგარიში

`npm run check:forgotten-sibling-tests` ხელახლა იყენებს ტესტებზე ზემოქმედების რუკის საფუძვლად არსებულ იმპორტების გადამჭრელს.
თითოეული შეცვლილი საწარმოო მოდულისთვის ის დეტერმინისტულ
`changed module/symbol -> static consumer -> candidate sibling test` ჯაჭვებს აჩვენებს, როდესაც კანდიდატი
ტესტი pull-request-ის სხვაობაში არ არის. Markdown შეჯამება და JSON შედეგი ინახება, როგორც
`forgotten-sibling-tests` სამუშაო პროცესის არტეფაქტი, ნებისმიერი ბლოკირებადი დანერგვის წინ კალიბრაციისთვის.

Barrel re-export-ები და დინამიკური import-ები მხოლოდ resolution-ის დიაგნოსტიკისთვის გამოიყენება; ისინი არასოდეს ქმნიან
დამბლოკავ დარღვევას. განხილული გამონაკლისები ინახება
`config/quality/forgotten-sibling-allowlist.json`-ში. თითოეულ ჩანაწერში მითითებული უნდა იყოს consumer და candidate
ტესტები, წარმოდგენილი უნდა იყოს კონკრეტული დასაბუთება და GitHub issue-ის ან pull request-ის ბმული. არასწორად ფორმირებული ჩანაწერები
უარყოფის პრინციპით მუშავდება. გამონაკლისები ვერ დაფარავს წაშლილ candidate ტესტს ან diff-ს, რომელიც ამატებს `.skip`/`.todo`-ს;
assertion-ის შესუსტება და სხვა სახის დაფარვა კვლავ დამოუკიდებლად დამბლოკავი
`check:test-masking` gate-ის პასუხისმგებლობაში რჩება.

### დავალება: `lint`

ეშვება `main`-ზე მიმართულ ყოველ PR-ზე. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სკრიპტი (`npm run ...`)           | რას ამოწმებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დამბლოკავი                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `check:node-runtime`              | Node.js-ის ვერსია მხარდაჭერილ დიაპაზონშია                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                           |
| `check:cycles`                    | ციკლური import-ები — ყველა `src/` + `open-sse/` მოდული                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                           |
| `check:route-validation:t06`      | Zod-ის სქემები წარმოდგენილია ყველა route-ზე (Tier 6-ის პოლიტიკა)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any`-ის რაოდენობა არ აღემატება ბიუჯეტს (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                           |
| `check:provider-consistency`      | `providers.ts`-ში თითოეულ პროვაიდერს აქვს შესაბამისი ჩანაწერი `providerRegistry.ts`-ში (და პირიქით, დაშვებული სიის ფარგლებში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | დიახ                                           |
| `check:model-lifecycle`           | ხელით მართული სამი მარშრუტიზაციის ცხრილი შესაბამისობაში რჩება რეპოზიტორიაში შენახულ სასიცოცხლო ციკლის სურათთან (#11503): `FITNESS_TABLE` (`taskFitness.ts`) არ ანიჭებს ქულას არცერთ გაუქმებულ id-ს, რომლის მარშრუტიზაციაც `REGISTRY`-ს შეუძლია; `BUILT_IN_ALIASES`-ის თითოეული სამიზნე წარმოდგენილია `REGISTRY`-ში და არ არის გაუქმებული id-ების სურათში; `REGISTRY`-ში ჯერ კიდევ არსებული თითოეული გაუქმებული id გადამისამართებულია ან ჩამოთვლილია `allowedRetiredInCatalog`-ში; და `DEFAULT_DEGRADATION_MAP`-ის არცერთი წყარო ან სამიზნე ამ სურათში გაუქმებულად არ არის მონიშნული. ეს არ ადასტურებს, რომ მოდელს ამჟამად მოქმედი ზედა დონის სერვისი ემსახურება. ოფლაინ რეჟიმში — ადარებს `config/quality/model-lifecycle.json`-ს, რომელიც ხელით ახლდება `npm run quality:refresh-model-lifecycle`-ის მეშვეობით (საჭიროებს ქსელს; CI-ში არ არის ჩართული). `allowedRetiredInCatalog` არის თანდათანობითი შემცირების მექანიზმი: ჩანაწერი დაამატეთ მხოლოდ თვალთვალის საკითხთან ერთად. | დიახ                                           |
| `check:fetch-targets`             | კლიენტის მხარის `src/`-ში არსებული თითოეული `fetch("/api/...")` რეალურ `route.ts`-ზე მიუთითებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `check:deps`                      | რეპოზიტორიის თითოეულ `package.json`-ში არსებული ყველა `npm install`-ით ინსტალირებადი დამოკიდებულება შეტანილია `dependency-allowlist.json`-ში; ახალი არაფიქსირებული ვერსიის ან slopsquatting-ის შედეგად წარმოქმნილი პაკეტები მოინიშნება                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                           |
| `audit:deps`                      | `npm audit` (ძირითადი პროექტი + electron) — მაღალი/კრიტიკული დონის არცერთი გაფრთხილება (ნაწილობრივ ემთხვევა osv-ის `check:vuln-ratchet`-ს; იხილეთ რაციონალიზაციის ბექლოგი)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                           |
| `check:lockfile`                  | `package-lock.json`-ის მთლიანობა — https რეესტრი, მთლიანობის ჰეშები, ჰოსტის გადაფარვების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                           |
| `check:licenses`                  | SPDX ლიცენზიების ნებადართული სია production dependencies-ისთვის                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | დიახ                                           |
| `check:tracked-artifacts`         | build artifacts / commit-ში დამატებული `node_modules` symlinks არ არის (ასევე ეშვება husky pre-commit-ში; pre-push განზრახ მსუბუქია — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | დიახ                                           |
| `check:ai-attribution`            | PR commit-ებში, სათაურში ან ტექსტში არ არის AI/ბოტის `Co-Authored-By` trailer ან AI-ის მიერ გენერირების footer — მკაცრი წესი #16 (`quality.yml`-ის fast-gates ციკლში PR→`release/**`-ისთვის — კითხულობს event payload-ს, PR-ების გარეთ არაფერს აკეთებს — და მხოლოდ PR-ისთვის განკუთვნილი ნაბიჯი `ci.yml` lint-ში PR→`main`-ისთვის; ასევე husky `commit-msg` hook; ადამიანის თანაავტორები დაშვებულია; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Vitest-ის თითოეული გამონაკლისი მიუთითებს tracking issue-ს და წარმოდგენილია `config/quality/vitest-exclusions.json`-ში (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `check:file-size`                 | არცერთი source file არ აჭარბებს შესაბამისი გაფართოებისთვის დაწესებულ ზღვარს (ratchet: გაყინული დიდი ფაილები `frozen` სიაში)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | დიახ                                           |
| `check:error-helper`              | executors/handlers-ში შეცდომის პასუხები იყენებს `buildErrorBody()` / `sanitizeErrorMessage()`-ს (მკაცრი წესი #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | დიახ                                           |
| `check:migration-numbering`       | მიგრაციის SQL ფაილები დანომრილია თანმიმდევრულად, გამოტოვებებისა და დუბლიკატების გარეშე                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | დიახ                                           |
| `check:public-creds`              | `publicCreds.ts`-ის გარეთ არ არის OAuth-ის ლიტერალური `client_id`/`client_secret` ან Firebase Web გასაღებები (მკაცრი წესი #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | დიახ                                           |
| `check:db-rules`                  | `src/lib/db/` მოდულების გარეთ არ არის დაუმუშავებელი SQL; `localDb.ts`-იდან არ არის barrel-იმპორტები (მკაცრი წესები #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | დიახ                                           |
| `check:known-symbols`             | პროვაიდერის შემსრულებლები, მარშრუტიზაციის სტრატეგიები და მთარგმნელები, რომლებიც რეგისტრირებულია შესაბამის დისპეტჩერიზაციის ცხრილებში, ემთხვევა დისკზე არსებულ ფაილებს — არ არის ობოლი ან გამოუცხადებელი სიმბოლოები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | დიახ                                           |
| `check:route-guard-membership`    | ყველა მარშრუტი, რომელიც შვილობილ პროცესს უშვებს, კლასიფიცირებულია `isLocalOnlyPath()`-ის მიერ (მკაცრი წესები #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | დიახ                                           |
| `check:test-discovery`            | რეპოზიტორიაში არსებული ყველა `*.test.ts` / `*.spec.ts` ფაილი შეგროვებულია სულ მცირე ერთი ტესტების გამშვების მიერ (ratchet: `test-discovery-baseline.json`-ში ობოლი ფაილების სია მხოლოდ შეიძლება შემცირდეს)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | დიახ                                           |
| `check:agent-skills-sync`         | გენერირებული agent-skills არტეფაქტები ემთხვევა მათ წყარო კატალოგს (გადახრის გარეშე)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:provider-asset-provenance` | პროვაიდერის ლოგოებს/აქტივებს ახლავს წარმომავლობის რეგისტრირებული ჩანაწერი                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON კონფიგურაციის ფაილები იშლება შეცდომების გარეშე და აკმაყოფილებს რეპოზიტორიის ლინტინგის წესებს                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScript-ის კომპილაცია შეცდომების გარეშე (მხოლოდ სარეკომენდაციო გაფრთხილებები)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | დიახ                                           |
| `typecheck:noimplicit:core`       | მკაცრი `noImplicitAny` — სამომავლო მოთხოვნა; ბევრ მანამდე არსებულ გამოძახების ადგილს ჯერ კიდევ სჭირდება ანოტაციები                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **სარეკომენდაციო** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, რომელიც შემოიფარგლება `src/app/(dashboard)/**`-ით (#7033) — `typecheck:core`-ის 27 ფაილისგან შემდგარი შერჩევითი დაშვების სია არ შეიცავს dashboard-ის არცერთ TSX ფაილს, ხოლო `next build` მას საერთოდ არ უტარებს ტიპების შემოწმებას (`next.config.mjs`-ში დაყენებულია `ignoreBuildErrors: true`), ამიტომ იქ არსებული უპატრონო იდენტიფიკატორების რეგრესიები (#6625/#6909) CI-სთვის შეუმჩნეველი იყო. განსხვავებები მოწმდება თითოეულ ფაილსა და TS კოდზე შეცდომების რაოდენობის გაყინულ საბაზისო მაჩვენებელთან (`config/quality/dashboard-typecheck-baseline.json`, მოძველების კონტროლის იგივე სქემით, რომელსაც `check:known-symbols` იყენებს) — შემოწმება ჩავარდება მხოლოდ მაშინ, როდესაც შეცდომების რაოდენობა საბაზისო მაჩვენებელს გადააჭარბებს; მანამდე არსებული შეცდომის გამოსწორებისას ზღვარი შეამცირეთ `--update`-ით.                                                                                                                                                      | დიახ                                           |

### დავალება: `quality-gate`

ეშვება `test-coverage`-ის შემდეგ. წარუმატებლობის შემთხვევაში ბლოკავს შერწყმას.

| სკრიპტი                      | რას ამოწმებს                                                                                                                                                                                   | ბლოკირებადი        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `quality:collect`            | ქმნის `quality-metrics.json`-ს (ESLint-ის გაფრთხილებების რაოდენობა, დაფარვა გაერთიანებული shard-ანგარიშიდან)                                                                                   | დიახ (ratchet-მდე) |
| `quality:ratchet`            | `quality-baseline.json`-ში თითოეული მეტრიკა არ გაუარესებულა (ESLint-ის გაფრთხილებები ≤ baseline; დაფარვა ≥ baseline)                                                                           | დიახ               |
| `check:duplication`          | კოდის დუბლირება (jscpd@4) არ აღემატება `quality-baseline.json`-ში მითითებულ baseline-ს                                                                                                         | დიახ               |
| `check:complexity`           | ფაილის დონის ციკლომატური სირთულე არ აღემატება ზღვარს (ძირითადი ESLint `complexity` + `max-lines-per-function`)                                                                                 | დიახ               |
| `check:cognitive-complexity` | კოგნიტიური სირთულის ratchet (`eslint-plugin-sonarjs`) — ESLint-ის ცალკე გაშვება; CI ორივეს აერთიანებს ერთ `check:complexity-ratchets` ნაბიჯად                                                  | დიახ               |
| `check:dead-code`            | გამოუყენებელი ექსპორტების / ფაილების ratchet (knip) baseline-თან შედარებით არ უარესდება                                                                                                        | დიახ               |
| `check:compression-budget`   | შეკუმშვის საორიენტაციო ტესტის ბიუჯეტი — თითოეული ძრავისთვის ტოკენების დაზოგვის მინიმალური ზღვრები არ უნდა გაუარესდეს                                                                           | დიახ               |
| `check:type-coverage`        | ტიპიზაციის პროცენტული მაჩვენებლის ratchet (`type-coverage`) არ უარესდება; დიდწილად მოიცავს `typecheck:noimplicit:core`-ს                                                                       | დიახ               |
| `check:codeql-ratchet`       | ღია CodeQL გაფრთხილებების რაოდენობა არ უარესდება (კითხულობს `gh api`-ის მეშვეობით; ტოკენის გარეშე კორექტულად გამოტოვებს) — განახლების სიხშირე და ხელით გაშვება: იხილეთ „CodeQL ratchet“ ქვემოთ | დიახ               |

### დავალება: `quality-extended`

მთელი დავალება სარეკომენდაციო ხასიათისაა (`continue-on-error: true`). npm-ზე დაფუძნებული ratchet-ები
რეალურად სრულდება; გარე სკანერები ინსტალირდება `gh release download`-ის მეშვეობით და თავად გამოტოვებენ შემოწმებას (exit 0),
თუ ბინარული ფაილი კვლავ არ არის ხელმისაწვდომი.

| სკრიპტი                  | რას ამოწმებს                                                                                                                                                                                                                                              | ბლოკირებადი                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | ციკლური დამოკიდებულებები არ არსებობს (dpdm)                                                                                                                                                                                                               | **სარეკომენდაციო**                                        |
| `check:bundle-size`      | bundle-ის ზომა არ აღემატება ზღვარს                                                                                                                                                                                                                        | **სარეკომენდაციო**                                        |
| `check:secrets`          | საიდუმლო მონაცემების სკანირება (gitleaks) — გამოტოვებს, თუ ბინარული ფაილი არ არის ხელმისაწვდომი                                                                                                                                                           | **სარეკომენდაციო**                                        |
| `check:vuln-ratchet`     | დამოკიდებულებების მოწყვლადობები (osv-scanner) არ უარესდება — გამოტოვებს, თუ ბინარული ფაილი არ არის ხელმისაწვდომი                                                                                                                                          | **სარეკომენდაციო**                                        |
| `check:workflows`        | workflow-ების lint-შემოწმება (actionlint + zizmor); არარსებული/გაუმართავი სკანერები, არასწორი ანგარიშები ან არარსებული ratchet baseline იწვევს INCOMPLETE სტატუსით ჩავარდნას. ვალიდური მიგნებები ემორჩილება არჩეულ მკაცრ/სარეკომენდაციო/ratchet პოლიტიკას | შესრულება სავალდებულოა; zizmor ratchet ბლოკირებადია CI-ში |
| `check:openapi-breaking` | საჯარო API კონტრაქტში (`openapi.yaml`) base branch-თან შედარებით შეუთავსებელი ცვლილებები (oasdiff) — ქმნის `openapiBreaking=N`-ს; გამოტოვებს, თუ oasdiff არ არის ხელმისაწვდომი ან საბაზისო სპეციფიკაციის დამუშავება შეუძლებელია                           | **სარეკომენდაციო**                                        |

### დავალება: `docs-sync-strict`

სრულდება `main`-ისკენ მიმართულ ყველა PR-ზე. წარუმატებლობის შემთხვევაში merge-ს ბლოკავს.

| სკრიპტი                        | რას ამოწმებს                                                                                                                                                                                                               | ბლოკირებადი                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | მეტა-ბარიერი, რომელიც ქვემოთ მოცემულ 6 ქვე-ბარიერს თანმიმდევრულად უშვებს                                                                                                                                                   | დიახ                       |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt ვერსიების თანხვედრას                                                                                                                                                                         | დიახ                       |
| ↳ `check:docs-counts`          | პროზაულ ტექსტში მოცემული რაოდენობები (პროვაიდერების რაოდენობა, მიგრაციების რაოდენობა და ა.შ.) რეალური რაოდენობების მკაცრ დიაპაზონშია                                                                                       | დიახ                       |
| ↳ `check:env-doc-sync`         | `.env.example`-ში არსებული ყოველი გარემოს ცვლადი დოკუმენტაციის ცხრილშია აღწერილი და პირიქით                                                                                                                                | დიახ                       |
| ↳ `check:deprecated-versions`  | დოკუმენტაციაში მოძველებული ვერსიების აღმნიშვნელი სტრიქონები არ არის                                                                                                                                                        | დიახ                       |
| ↳ `check:doc-links`            | დოკუმენტაციაში არსებული შიდა markdown-ბმულები რეალურ ფაილებზე მიუთითებს (`[text]`/`(path)` ფორმა)                                                                                                                          | დიახ                       |
| ↳ `check:fabricated-docs`      | დოკუმენტაციაში ნახსენები მარშრუტები, გარემოს ცვლადები, CLI ბრძანებები, ჰუკების სახელები და ფაილების ბილიკები კოდურ ბაზაში არსებობს. მკაცრი ბარიერი `--strict`-ის გამოყენებით; ამ ალმის გარეშე შეცდომა მხოლოდ გაფრთხილებაა. | დიახ (`--strict`-ით CI-ში) |
| `check:cli-i18n`               | CLI ბრძანებების სტრიქონები ყველა i18n ლოკალის ფაილშია წარმოდგენილი                                                                                                                                                         | დიახ                       |
| `check:openapi-coverage`       | OpenAPI სპეციფიკაცია რეალური მარშრუტების რაოდენობის სულ მცირე მკაცრად განსაზღვრულ ქვედა ზღვარს ფარავს                                                                                                                      | დიახ                       |
| `check:openapi-security-tiers` | `openapi.yaml`-ში უსაფრთხოების დონის ანოტაციები `routeGuard.ts`-ის კლასიფიკაციებთან თანხვედრაშია                                                                                                                           | **სარეკომენდაციო**         |
| `check:openapi-routes`         | `openapi.yaml`-ში მოცემული ყოველი ბილიკი რეალურ `route.ts`-ს შეესაბამება (ჰალუცინაციების საწინააღმდეგოდ)                                                                                                                   | დიახ                       |
| `check:docs-symbols`           | `docs/**/*.md`-ში არსებული ყოველი `/api/...` მითითება რეალურ `route.ts`-ს შეესაბამება (ჰალუცინაციების საწინააღმდეგოდ)                                                                                                      | დიახ                       |
| `i18n translation drift`       | უთარგმნელი გასაღებები i18n ლოკალის ფაილებში — მხოლოდ გაფრთხილება                                                                                                                                                           | **სარეკომენდაციო**         |

### დავალება: `i18n-ui-coverage`

| სკრიპტი                           | რას ამოწმებს                                                                                                                                                                                                                        | ბლოკირებადი        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `check-ui-keys-coverage` (inline) | UI-ის i18n გასაღებების დაფარვა ≥ 65%-ია                                                                                                                                                                                             | დიახ               |
| `check-ui-value-drift` (inline)   | ხელახლა დაწერილი ინგლისური **მნიშვნელობა** მოძველებულ თარგმანს არ ტოვებს                                                                                                                                                            | დიახ               |
| `check-new-key-coverage` (inline) | **ახალი** ინგლისური გასაღები ყველა ლოკალში თარგმნილია — `__MISSING__:` მარკერი უარყოფილია                                                                                                                                           | დიახ               |
| `check-translation-ratio`         | რეალური თარგმანების თანაფარდობა თითოეული ლოკალისთვის (ინგლისურის იდენტური / ჩანაცვლების ტექსტი / ნებადართული სიის მიღმა დაკარგული ფოთლები) არ უნდა აღემატებოდეს `config/quality/i18n-translation-baseline.json` + დასაშვებ გადახრას | **სარეკომენდაციო** |

საჭიროა `fetch-depth: 0` — მნიშვნელობის აცდენის ბარიერი `en.json`-ს შერწყმის ბაზასთან ადარებს.

#### `check-ui-value-drift` — მოძველებული თარგმანის ბარიერი

აღმოაჩენს იმ ერთ i18n რეგრესიას, რომლის დანახვაც სხვა ბარიერებს სტრუქტურულად არ შეუძლიათ: ინგლისური მნიშვნელობა
ხელახლა იწერება, ხოლო _წინა_ ინგლისური ტექსტიდან მიღებული თარგმანები უცვლელი რჩება, რის გამოც
არაინგლისურენოვანი მომხმარებლები კვლავ თავდაჯერებული ტონით დაწერილ, თუმცა უკვე მცდარ ტექსტს კითხულობენ.

ეს რეალურად გამოქვეყნებულ ვერსიაში მოხვდა. `oauthModal.googleOAuthWarning` ხელახლა დაიწერა, როდესაც Antigravity-ის
შესვლის დამხმარე დაემატა (#5203); **43 ლოკალიდან 39-ში** დარჩა ტექსტი, რომელიც ოპერატორებს ეუბნებოდა, რომ „სრული
URL დაეკოპირებინათ და ქვემოთ ჩაესვათ“ — პროცესი, რომელიც ამ პროვაიდერისთვის ვერ დასრულდება. ეს
#8463-მდე შეუმჩნეველი დარჩა, რადგან:

- `sync-ui-keys` მხოლოდ **არარსებულ** გასაღებებს ამატებს და არასოდეს ანახლებს **მოძველებულებს**;
- `check-ui-keys-coverage` გასაღების _არსებობას_ ითვლის, ამიტომ მოძველებული თარგმანი დაფარულად ითვლება;
- `check-translation-drift` თვალს ადევნებს `docs/i18n/<locale>/**.md` დოკუმენტაციის ასლებს —
  ის არასოდეს კითხულობს `src/i18n/messages/*.json`-ს. ბლოკირებადია დავალებაში `docs-sync-strict` 2026-09-ის
  ხელახალი სინქრონიზაციიდან: შეცვალეთ ძირითადი დოკუმენტი → `npm run i18n:run -- --files=<doc>` (სექციის დონეზე, სწრაფი).

**ცვლილებების სხვაობაზე ორიენტირებული და არა საბაზისო მონაცემებზე დაყრდნობილი.** ის შერწყმის საბაზისო წერტილში არსებულ `en.json`-ს
სამუშაო ხეს ადარებს; ყველა გასაღებისთვის, რომლის ინგლისური მნიშვნელობაც შეიცვალა, მოძველებულია ნებისმიერი ლოკალი, რომელიც ჯერ კიდევ
უცვლელ თარგმანს შეიცავს. ეს განზრახ **აფიქსირებს უკვე არსებულ დავალიანებას** — სხვაობა
ვერ გამოავლენს, თუ ძველი ინგლისური ტექსტის რომელი ვერსიიდან მომდინარეობს დიდი ხნის წინანდელი თარგმანი, ამიტომ შემოწმება აფასებს
მხოლოდ იმას, რასაც მიმდინარე ცვლილება ეხება. ალტერნატივა (თითოეული გასაღებისთვის ჰეშების საბაზისო ფაილი) მოითხოვდა
დაახლოებით 600 KB-იან გენერირებულ ფაილს, რაც უდიდეს არსებულ საბაზისო ფაილზე 3-ჯერ დიდია და ყოველ i18n PR-ზე შეიცვლებოდა.

მისი დაკმაყოფილების ორი გზა არსებობს:

1. განაახლეთ შესაბამისი თარგმანები, ან
2. მიანიჭეთ მათ `__MISSING__:<new english>` — შესრულების გარემო შემდეგ გასცემს შესწორებულ ინგლისურ ტექსტს
   (`src/i18n/request.ts::deepMergeFallback`, #7258), ხოლო გასაღები თარგმნის რიგში დაემატება.

თუ სტრიქონის **მნიშვნელობა** შეიცვალა, უმჯობესია **გასაღებს სახელი შეუცვალოთ**: ახალი გასაღები
მოძველებულ თარგმანს ვერ დაიმკვიდრებს. ეს არის მიდგომა, რომელიც #8463-ში გამოიყენეს.

```bash
npm run i18n:check-value-drift          # მკაცრი (რასაც CI უშვებს)
npm run i18n:check-value-drift:warn     # მხოლოდ ანგარიშის მომზადება
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ასრულებს მუშაობას 0 კოდით და `SKIP reason=base-unresolved` შეტყობინებით, როდესაც საბაზისო კატალოგის წაკითხვა შეუძლებელია (ზედაპირული
კლონი საბაზისო ref-ის გარეშე), `check-openapi-breaking`-ის ანალოგიურად.

### დავალება: `i18n`

i18n-ის სრული ვალიდაციის მატრიცა (თითო დავალება თითო ლოკალზე). მთელი დავალება სარეკომენდაციო ხასიათისაა.

| სკრიპტი                         | რას ამოწმებს                           | ბლოკირებადობა                                                  |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | თარგმანის სისრულე თითოეული ლოკალისთვის | **სარეკომენდაციო** (`continue-on-error: true` მთელ დავალებაზე) |

### დავალება: `pr-test-policy`

ეშვება მხოლოდ pull request-ებზე.

| სკრიპტი                | რას ამოწმებს                                                                                                                                              | ბლოკირებადობა |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check:pr-test-policy` | PR-ები, რომლებიც ცვლიან საწარმოო კოდს `src/`, `open-sse/`, `electron/` ან `bin/`-ში, უნდა შეიცავდეს ან აახლებდეს ტესტებს (მკაცრი წესი #8)                 | დიახ          |
| `check:test-masking`   | შეცვლილი სატესტო ფაილები არ ამცირებს ასერტების წმინდა რაოდენობას და არ ამატებს `assert.ok(true)` ტავტოლოგიებს                                             | დიახ          |
| `check:pr-evidence`    | PR-ის აღწერაში მითითებულია ცვლილების ტესტირების/VPS-ის მტკიცებულებები (მკაცრი წესის #18 ავტომატიზაცია PR-ის ტექსტში ძიებით — არასაიმედოა, იხილეთ Backlog) | დიახ          |

### დავალება: `test-vitest`

ეშვება `build`-ის შემდეგ. წარუმატებლობის შემთხვევაში ბლოკავს შერწყმას.

| ნაკრები          | რას ამოწმებს                                                     | ბლოკირებადობა                                                                                                                        |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP სერვერი (110 ხელსაწყო), autoCombo, ქეში — vitest-ის გამშვები | დიახ                                                                                                                                 |
| `test:vitest:ui` | UI კომპონენტების ტესტები — vitest-ის გამშვები                    | **ბლოკირებადი** — უკვე არსებული წარუმატებლობები აშკარად გამორიცხულია `vitest.config.ts`-ში; ახალი წარუმატებლობები დავალებას ჩააგდებს |

### ღამის სამუშაო პროცესები (დაგეგმილი, სარეკომენდაციო)

ისინი ეშვება cron განრიგით (და `workflow_dispatch`-ით), მაგრამ არასდროს PR-ებზე. ყველა მათგანი სარეკომენდაციო ხასიათისაა.

| სამუშაო პროცესი        | რას ამოწმებს                                                                                                                                                                          | ბლოკირებადობა      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `nightly-property`     | fast-check-ის თვისებებზე დაფუძნებული ტესტები შემთხვევითი საწყისი მნიშვნელობითა და გაშვებების დიდი რაოდენობით                                                                          | **სარეკომენდაციო** |
| `nightly-resilience`   | heap-ის ზრდის შემოწმება, ქაოსური გაუმართაობების ინექცია, k6 დატვირთვის/ხანგრძლივი დატვირთვის ტესტირება                                                                                | **სარეკომენდაციო** |
| `nightly-llm-security` | promptfoo-ს ინექციისგან დაცვა (ბლოკირების რეჟიმი) + garak-ის შემოწმებები (გამოტოვებულია პროვაიდერის საიდუმლოს გარეშე)                                                                 | **სარეკომენდაციო** |
| `nightly-schemathesis` | OpenAPI კონტრაქტის ფაზინგი (schemathesis) გაშვებულ OmniRoute-ზე `docs/openapi.yaml`-ის გამოყენებით — გამოავლენს სპეციფიკაციის დარღვევებს / დაუმუშავებელ 500-იან პასუხებს (ფაზა 8 B.4) | **სარეკომენდაციო** |
| `nightly-mutation`     | Stryker-ის მუტაციური ტესტირების ქულა სწრაფი მოდულური ტესტების ნაკრებისთვის — გადარჩენილი მუტანტები სუსტ ასერტებს გამოავლენს                                                           | **სარეკომენდაციო** |
| `nightly-compat`       | Node ძრავის თავსებადობის მატრიცა მხარდაჭერილი `engines.node` დიაპაზონებისთვის                                                                                                         | **სარეკომენდაციო** |

---

## სისწრაფის ფაზა (2026-08-30 → v4.0 LTS): ყველა საბაზისო ზღვარი 20%-ით შემსუბუქდა

მფლობელის გადაწყვეტილება (2026-08-30): v4.0-ის მოდულარიზაციამდე გამოშვების სისწრაფე უფრო მნიშვნელოვანია,
ვიდრე ტექნიკური დავალიანების ზღვრის შენარჩუნება. ყველა **რიცხვითი** რეტჩეტის საბაზისო ზღვარი 20%-ით შემსუბუქდა
ერთი აუდიტირებადი ცვლილებით, ხოლო ფაზა გამოცხადებულია `config/quality/quality-baseline.json`-ში:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| რა შეიცვალა                                                                                                                                                                                                                      | სად                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — მაჩვენებლები, სადაც ნაკლები უკეთესია, ×1.2; პროცენტები, სადაც მეტი უკეთესია, ÷1.2 (დაფარვის ქვედა ზღვარი 60 შენარჩუნდა, `eslintErrors` რჩება 0, `eslintWarnings` 0 → გაყინული გამონაკლისების რაოდენობის 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` შენიშვნაში ჩამოთვლილია თითოეული წინა → შემდგომი მნიშვნელობა) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                            |
| `cap`, `testCap`, ყველა `frozen[*]` / `testFrozen[*]` სტრიქონის ზღვარი ×1.2                                                                                                                                                      | `file-size-baseline.json`                                                                                          |
| თითოეული ფაილის / თითოეული TS-კოდის რაოდენობა ×1.2                                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`             |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                                         |
| `--require-tighten` ხდება სარეკომენდაციო, სანამ `_policy.requireTighten === false`                                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                                        |
| ღამის `bank-ratchet-shrinks` შეჩერებულია (ის გაზომილ შემცირებას დააფიქსირებდა და ხელმისაწვდომ რეზერვს გააუქმებდა)                                                                                                                | `.github/workflows/nightly-release-green.yml`                                                                      |

დაშვებული ელემენტების სიები (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ბიუჯეტები **არ არის** და მათ არ შეხებიან. გავლა/ჩავარდნის პოლიტიკის შემოწმებები (საიდუმლოებები, SQL-ის წესები,
დოკუმენტაციის/გარემოს კონტრაქტი, i18n-ის პარიტეტი, ერთეულოვანი ტესტები) უცვლელია — ჩავარდნილი ტესტი კვლავ ჩავარდნილ ტესტად რჩება.

**ინსტრუმენტები**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ერთჯერადი
  შემსუბუქება (`scripts/quality/relax-baselines.mjs`); იმავე შენიშვნით მეორედ გაშვებაზე უარს ამბობს.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ყველა რიცხვით ზღვარს ზომავს ისე, როგორც ამას CI აკეთებს, და თითოეული ზღვრისთვის დარჩენილ რეზერვს
  აჩვენებს (`scripts/quality/baseline-headroom.mjs`). ღამის `baseline-headroom` დავალება ცხრილს
  აქვეყნებს მიმდინარე საკითხში **📈 საბაზისო რეზერვი (სისწრაფის ფაზა)** და ამატებს
  `headroom-alert` იარლიყს, როდესაც რომელიმე მაჩვენებელი თავისი ზღვრის 10%-ის ფარგლებშია ან უკვე
  აჭარბებს მას. ეს საკითხი ადრეული გაფრთხილებაა: თუ ბიუჯეტი რამდენიმე დღეში ივსება, ეს ნიშნავს, რომ
  შემსუბუქებას რამდენიმე PR მოიხმარს და არა მთელი გუნდი — შეამოწმეთ შესაბამისი ზღვრის `_rebaseline_*` შენიშვნები.

**ახალი კოდის რეჟიმი (Clean-as-You-Code) — 2026-08-30-დან, მხოლოდ PR-ის სწრაფი გზისთვის**

`pull_request` მოვლენებზე `quality.yml` გადასცემს `--base-ref <PR base SHA>` პარამეტრს `check:file-size`,
`check:complexity-ratchets` და `check:dead-code` ბრძანებებს. ამ რეჟიმში შემოწმება HEAD-ს
merge-base-ს ადარებს **მხოლოდ PR-ის მიერ შეცვლილ ფაილებში** (`scripts/check/newCodeMode.mjs`:
merge-base დროებით `git worktree`-ში მატერიალიზდება, ESLint/knip ეშვება იქაც და HEAD-ზეც, შემდეგ კი
თითოეული ფაილის რაოდენობების სხვაობა გამოითვლება):

- **დამბლოკავი** — PR-მა თავის მიერ შეცვლილ ფაილებში დაამატა ციკლომატური/კოგნიტიური სირთულის დარღვევები ან მკვდარი ექსპორტები
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ჟურნალში);
- **სარეკომენდაციო** — გლობალური ჯამი გაყინულ საბაზისო ზღვართან შედარებით. მემკვიდრეობით მიღებული გადახრა
  უდანაშაულო PR-ს არასოდეს ჩააგდებს; გადახრა გამოშვების შეჯერებისას ხელახლა გაიყინება და რეზერვის დავალება დააკვირდება.

`workflow_dispatch` გაშვებებს, release-green-ის სრულ შემოწმებასა და ღამის რეზერვის დავალებას PR-ის საბაზისო
ვერსია არ აქვთ და აბსოლუტურ (გლობალურ) შედარებას ინარჩუნებენ. დაფარვა, დუბლირება და ტიპების დაფარვა ამჟამად
გლობალური რჩება (მათი ინსტრუმენტები თითოეული ფაილის სხვაობას იაფად ვერ წარმოქმნის) — იმავე მიდგომის კანდიდატებია.

**ფაზის დახურვა v4.0-ზე (LTS = წინანდელზე უფრო მკაცრი და არა „ჩვეულებრივ მდგომარეობაში დაბრუნება“)

1. სუფთა `release/v4.0.0` წვერზე: ჩანაწერისთვის გაუშვით `npm run quality:headroom --json`, შემდეგ კი
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` და თითოეული typecheck ბარიერის
   `--update` — ყველა საბაზისო მნიშვნელობა გაზომილ მნიშვნელობამდე დაიწევს.
2. წაშალეთ `_policy` ფაილიდან `quality-baseline.json` (ხელახლა ააქტიურებს `--require-tighten`-სა და ღამის
   დაგროვებას), ხოლო `check-openapi-coverage.mjs`-ში აღადგინეთ `THRESHOLD = 36` (ან უფრო მაღალი მნიშვნელობა).
3. გაზომილ მნიშვნელობებზე მეტად გაამკაცრეთ იქ, სადაც მოდულარიზაციამ შედეგი გამოიღო: file-size-ის `cap` კვლავ 1000-მდე
   (ან 800-მდე), დაფარვის ქვედა ზღვრები +5-ით, ხოლო მოდულარიზებული პაკეტებისთვის გამოუყენებელი ექსპორტების რაოდენობა — 0.

## Ratchet-ის საბაზისო დონე (`quality-baseline.json`)

Ratchet-ის ძრავა (`scripts/quality/check-quality-ratchet.mjs`) კითხულობს `quality-baseline.json`-ს
და ადარებს მას ახლად შეგროვებულ `quality-metrics.json`-ს. ნებისმიერი მეტრიკა, რომელიც
მის epsilon-ზე მეტად გაუარესდება, აგების პროცესს წარუმატებლად დაასრულებს.

ამჟამად თვალყურისდევნებული მეტრიკები:

| მეტრიკა               | მიმართულება | მნიშვნელობა                                          |
| --------------------- | ----------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`      | ESLint-ის გაფრთხილებების რაოდენობა არ უნდა გაიზარდოს |
| `coverage.statements` | `up`        | ინსტრუქციების დაფარვა არ უნდა შემცირდეს              |
| `coverage.lines`      | `up`        | ხაზების დაფარვა არ უნდა შემცირდეს                    |
| `coverage.functions`  | `up`        | ფუნქციების დაფარვა არ უნდა შემცირდეს                 |
| `coverage.branches`   | `up`        | განშტოებების დაფარვა არ უნდა შემცირდეს               |

რეალური გაუმჯობესების შემდეგ საბაზისო დონის განახლებისთვის:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ალამი მიმდინარე გაზომილ მნიშვნელობებს `quality-baseline.json`-ში წერს.
ეს ფაილი დააკომიტეთ იმ ცვლილებასთან ერთად, რომელმაც მეტრიკა გააუმჯობესა. PR, რომელიც
მეტრიკას საბაზისო დონის განახლების გარეშე აუმჯობესებს, გამოვლინდება `--require-tighten`-ის მიერ (ფაზა 6A.5,
განხორციელება მოსალოდნელია).

### CodeQL ratchet: განახლების პერიოდულობა და ხელით გაშვება

`check:codeql-ratchet` კითხულობს **რეპოზიტორიის მდგომარეობას, რომელიც გრაფიკის მიხედვით ახლდება — არა თითოეულ PR-ზე.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` აბრუნებს
`state: configured`, `schedule: weekly`: ეს არის GitHub-ის ნაგულისხმევი კონფიგურაციის სკანირება და არა
ყოველი push-ის ანალიზი. შედეგი: გაფრთხილებების გამომასწორებელი PR-ის გაერთიანების შემდეგ ratchet განაგრძობს
ძველი, უფრო მაღალი რაოდენობის კითხვას მომდევნო დაგეგმილი სკანირების გაშვებამდე — ამიტომ ის რეგრესიას აფიქსირებს
ყველა ღია PR-ზე, მათ შორის გამომასწორებელი PR-ის შემდგომ ცვლილებებზეც, სანამ სკანირება მიმდინარე მდგომარეობას არ დაეწევა.

**ხელით განახლება**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ხელახლა უშვებს
ანალიზს და რამდენიმე წუთში თავიდან აქვეყნებს გაფრთხილებებს. ჯერ წაიკითხეთ `.github/workflows/codeql.yml` —
მის სათაურში განმარტებულია, რომ ის მხოლოდ `workflow_dispatch`-ისთვისაა განკუთვნილი, **რადგან კონფლიქტშია
GitHub-ის „ნაგულისხმევ კონფიგურაციასთან“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ტრიგერების აღდგენამდე აუცილებელია **მფლობელის მოქმედება**: Settings → Code security →
CodeQL: Default → Advanced. ამ გადართვის გარეშე არ დაამატოთ `schedule:` ტრიგერი — ის
მხოლოდ წარუმატებელ გაშვებებს გამოიწვევს.

**რაოდენობის შემცირების შემდეგ გაამკაცრეთ საბაზისო დონე** — `node scripts/check/check-codeql-ratchet.mjs
--update` ახალ გაზომილ რაოდენობას წერს `quality-baseline.json`-ში →
`metrics.codeqlAlerts.value`, რათა ratchet-მა ჩუმად არ დაუშვას რეგრესია ძველ ზედა ზღვრამდე.
პრაქტიკული მაგალითი (2026-09-02/03): PR #12502-მა გამოასწორა 7 რეალური გაფრთხილება
(13 → 6 გაზომილი ღია გაფრთხილება); PR #12530-მა გაყინული საბაზისო დონე 11-დან 6-მდე გაამკაცრა შესაბამისობისთვის;
შემდეგ დარჩენილი 6 გაფრთხილება თითოეული გაფრთხილებისთვის მითითებული დასაბუთებით უარყოფილ იქნა, რის შედეგადაც ღია გაფრთხილებების რაოდენობა 0-მდე შემცირდა.

**უარყოფა ოპერატორის გადასაწყვეტია (მკაცრი წესი #14)** — არასოდეს უარყოთ CodeQL-ის გაფრთხილება
უარყოფის კომენტარში ტექნიკური დასაბუთების ჩაწერის გარეშე: `won't fix` ზედა დონის პროტოკოლის მოთხოვნისთვის,
`used in tests` სატესტო ფიქსტურისთვის, `false positive` იმ სანიტაიზერისთვის, რომელსაც CodeQL ვერ ხედავს
(პრეცედენტი: `docs/security/ERROR_SANITIZATION.md`).

---

## ტესტების ხელახალი გაშვების პოლიტიკა (WS5.4, v3.8.49)

ხელახალი გაშვების პოლიტიკა განისაზღვრება თითოეული runner-ისთვის და არასდროს მოქმედებს გლობალურად — საყოველთაო ხელახალი გაშვება რეალურ რეგრესიებს
უხილავ არასტაბილურობად აქცევს:

| Runner           | პოლიტიკა                                                                                                                                                                  | მიზეზი                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` მხოლოდ CI-ში, `trace: on-first-retry`-სთან ერთად                                                                                                             | ბრაუზერის/ქსელის დროითი ქცევა ნამდვილად არადეტერმინისტულია; ერთი ხელახალი გაშვება, კვალის ჩაწერით, არასტაბილურობას დიაგნოსტირებად არტეფაქტად აქცევს |
| Vitest           | გლობალური ხელახალი გაშვება აკრძალულია. დადასტურებულად არასტაბილური ტესტი იღებს აშკარა, კონკრეტული ტესტისთვის განკუთვნილ ხელახალ გაშვებას (ჩანს diff-ში და მოწმდება PR-ში) | საკარანტინო სია ინახება repo-ში და არასდროს არის გაუმჭვირვალე                                                                                       |
| node:test (unit) | ხელახალი გაშვება ყოველთვის აკრძალულია                                                                                                                                     | არასტაბილური unit-ტესტი თავად ტესტის შეცდომაა — გაასწორეთ და ხელახლა შემთხვევით შედეგზე ნუ დაეყრდნობით                                              |

სამიზნე SLO-ები არასტაბილურობის ტელემეტრიის დანერგვის შემდეგ (WS5.2/5.3): თითოეულ ტესტზე არასტაბილურობის სიხშირე <1%
(„ახლავე გასწორების“ ზღვარი), თითოეულ pipeline-ზე წარმატების მაჩვენებელი ≥95%. ინდუსტრიის საორიენტაციო მნიშვნელობებია —
ხელახლა დააკალიბრეთ ჩვენი საკუთარი გაზომვების მიხედვით.

## Release-ის დონის Ratchet-ის გადახრა (WS5.5, v3.8.49)

როდესაც ratchet (ფაილის ზომა, სირთულე, eslint-ის გაფრთხილებები) რეგრესირებს release-ის სუფთა
წვერზე — ანუ merge-ების კომბინაციამ გამოიწვია რეგრესია და არცერთი ცალკეული PR არ იმეორებს
რეგრესიას საკუთარ branch-ზე — გამოსწორება ეკუთვნის **release captain-ს, ერთხელ, release
branch-ზე**: უპირატესობა მიანიჭეთ გამოყოფას/რეფაქტორინგს; საბაზისო მნიშვნელობა ხელახლა დააყენეთ მხოლოდ დოკუმენტირებული
დასაბუთების ჩანაწერით. არასდროს გადააკისროთ კომბინაციური გადახრა contributor-ის PR-ს და არასდროს
განაახლოთ საბაზისო მნიშვნელობა თითოეული PR-ისთვის (ეს რეალურ რეგრესიებს მალავს). ჯერ განასხვავეთ მიზეზები: სანამ ჩათვლით, რომ პრობლემა თქვენმა PR-მა გამოიწვია,
წითელი შედეგი probe worktree-ში, სუფთა წვერის მიმართ გაიმეორეთ.

## Ratchet-ის შემცირებების დაფიქსირება — დაღმავალი მიმართულება (#8584)

Ratchet მხოლოდ სანახევროდ არის ავტომატიზებული და თანაც არასწორი ნახევარია. ზღვრის **გაზრდა**
JSON-ის ხელით, ათწამიანი რედაქტირებაა და წითელი PR-ის განბლოკვის უსწრაფესი გზა.
ზღვრის **შემცირება** მოითხოვს, რომ ვინმემ გაუშვას `--update` და შედეგი commit-ში შეიტანოს — ხოლო
`bank-ratchet-shrinks` job-ის დანერგვამდე ამას არცერთი workflow არ ასრულებდა. გაზომილი შედეგი
(2026-07-25): 18 გაყინული ფაილი უკვე 800-სტრიქონიანი ახალი ფაილის ზღვარზე ან მის ქვემოთ იყო, ყველაზე უარესი
132×-ით (`src/shared/validation/schemas.ts`, 19 სტრიქონი 2,523-იანი ზღვრით);
სირთულის ზედა ზღვარი დაახლოებით 37 ხელახალი საბაზისო მნიშვნელობის შენიშვნის განმავლობაში `1794 → 2169`-მდე გაიზარდა, ზუსტად ერთი
შემცირებით (−1); ხოლო ფრაზა „შემდეგ ციკლში `--update`-ით გამკაცრება“ 31-ჯერ დაიწერა და
ერთხელ შესრულდა. ზღვარი, რომელიც მის გამომწვევ კოდზე დიდხანს ცოცხლობს, თითოეულ დასრულებულ
დეკომპოზიციას ჩუმად აქცევს ზრდის ნებართვად იმისთვის, ვინც შემდეგში ფაილს დაარედაქტირებს.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ამ ციკლს ხურავს:

|          |                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| ეშვება   | `schedule`-ით (დღეში 3×) + `workflow_dispatch` — განზრახ **არა** `push`-ით                                         |
| ზომავს   | უმაღლეს `release/vX.Y.Z`-ს, იმავე resolution + injection guard-ით, რომლებსაც `release-green` იყენებს               |
| წერს     | `check:file-size --update` და `check:complexity-ratchets --update` (ორივე კონსტრუქციულად მხოლოდ შემცირებას ახდენს) |
| ამოწმებს | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                           |
| აგზავნის | ერთ, ყოველთვის აქტუალურ PR-ს release branch-ის მიმართ — იძულებით განახლებადს და არასდროს სპამირებულს               |

შემცირებების დაფიქსირება თითოეული push-ის ნაცვლად პაკეტურად ხდება, რადგან მას დაყოვნების მოთხოვნა არ აქვს (შემცირების
8 საათში დაფიქსირება მისაღებია), ხოლო თითოეულ merge-ზე გაშვება merge-კამპანიების დროს PR branch-ს განმეორებით
ააწყობდა და ყოველ ჯერზე ESLint-ის სრული გავლის ღირებულებას წარმოშობდა. აღმოჩენა კვლავ push-ზე ხდება
(`release-green`); მხოლოდ შემცირებების დაფიქსირება სრულდება პაკეტურად.

### უსაფრთხოების შემმოწმებელი

job საბაზისო მნიშვნელობებში ზედამხედველობის გარეშე წერს, ამიტომ სწორედ `verify-ratchet-bank.mjs` ხდის
ამას მისაღებს. ის `--update`-ის შემდგომ tree-ს `HEAD`-თან ადარებს და **job-ს მანამდე წყვეტს,
სანამ რაიმე commit შეიქმნება** — ყოველგვარი PR-ის გახსნის გარეშე — თუ ყველა ცვლილება ქვემოთ ჩამოთვლილთაგან ერთ-ერთი არ არის:

- `frozen` / `testFrozen`-ის რიცხვითი ჩანაწერი **შემცირებულია** ან **წაშლილია**
- `complexity-baseline.json` → `count` **შემცირებულია**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **შემცირებულია**

ნებისმიერი სხვა რამ შეცდომით სრულდება: რიცხვის გაზრდა, ჩანაწერის დამატება, `cap`/`testCap`-ის შეცვლა ან
`_rebaseline_*` შენიშვნის წაშლა/გადაწერა (ეს შენიშვნები წარმოადგენს თითოეული
ზღვრის არსებობის მიზეზის აუდიტის კვალს და ინახება იმავე `frozen` ობიექტში, სადაც ფაილების ჩანაწერებია).
ბოტი, რომელსაც ზღვრის გაზრდა შეეძლებოდა, არსებულ მდგომარეობაზე მნიშვნელოვნად უარესი იქნებოდა. რეგრესიისგან
დაცვა: `tests/unit/verify-ratchet-bank.test.ts`.

job არასდროს ასრულებს push-ს `release/*`-ში — PR-ს ადამიანი აერთიანებს, ამიტომ მცდარი გაზომვა
შემოწმების გარეშე ვერ მოხვდება სისტემაში.

## დაშვებული გამონაკლისების სიის პოლიტიკა

ყველა შემოწმება, რომელიც უკვე არსებული დარღვევების გამო არ უნდა ჩავარდეს, იყენებს გაყინულ დაშვებული გამონაკლისების სიას
(მაგ., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). პოლიტიკა ასეთია:

**გამოასწორეთ ძირეული მიზეზი; დაშვებული გამონაკლისების სია გამოიყენეთ მხოლოდ მაშინ, როდესაც დარღვევა უკვე არსებობდა და
მისი გამოსწორება იმავე PR-ში შეუძლებელია.**

დაშვებული გამონაკლისების სიაში ჩანაწერის დამატებისას:

1. დაამატეთ კომენტარი დასაბუთებით.
2. მიუთითეთ თვალყურის დევნების საკითხი (მაგ., `// #3498 — მე-2 ფაზის ფუნქცია, ჯერ არ არის განხორციელებული`).
3. ჩანაწერი წაშალეთ იმავე PR-ში, რომელიც დარღვევას ასწორებს — მოძველებული ჩანაწერი, რომელიც აქტიურ დარღვევას აღარ
   უგულებელყოფს, თავადაც დეფექტია (6A.3-ის მოძველებული წესების შემოწმება, განხორციელების შემდეგ,
   დაკავშირებული დარღვევის გარეშე დარჩენილი დაშვებული გამონაკლისების სიის ჩანაწერის გამო შემოწმებას ჩააგდებს).

**არ** დაამატოთ ჩანაწერები დაშვებული გამონაკლისების სიაში მხოლოდ იმისთვის, რომ ტესტები უფრო სწრაფად გაიაროს. წარმატებული შემოწმება მზარდი
დაშვებული გამონაკლისების სიით ხარისხის ცრუ შეგრძნებას ქმნის.

### როდესაც თქვენს PR-ზე შემოწმება ვერ გაივლის

1. **ყურადღებით წაიკითხეთ შემოწმების შედეგი** — ის ზუსტად გეტყვით, რომელმა ფაილმა ან სიმბოლომ დაარღვია
   წესი.
2. **გამოასწორეთ დარღვევა** — შემოწმებების უმეტესობა ფაილური სისტემის დეტერმინისტული შემოწმებაა და კოდის
   გასწორებისთანავე წარმატებით სრულდება.
3. **თუ დარღვევა უკვე არსებობდა** (ანუ ის თქვენ არ დაგიმატებიათ, მაგრამ ახლა შემოწმება მასაც მოიცავს):
   დაშვებული გამონაკლისების სიაში დაამატეთ ჩანაწერი დასაბუთების კომენტარითა და თვალყურის დევნების საკითხის მითითებით.
4. **თუ შემოწმება ზღვრული მაჩვენებლის პრინციპით მუშაობს** (დაფარვა, ESLint-ის გაფრთხილებები, დუბლირება, სირთულე):
   თქვენმა ცვლილებამ მეტრიკა გააუარესა. გამოასწორეთ ძირეული პრობლემა ან (იშვიათად) გაუშვით
   `npm run quality:ratchet -- --update`, თუ ცვლილება მიზანმიმართულია და მეტრიკის
   გაუარესება მისაღებია — თუმცა PR-ის აღწერაში მიუთითეთ მიზეზი.
5. **სარეკომენდაციო შემოწმებები** (`continue-on-error: true`) საინფორმაციო ხასიათისაა — ისინი შერწყმას არ
   ბლოკავს, თუმცა CI-ის შეჯამებაში გამოჩნდება. ამის მიუხედავად, ისინიც გამოასწორეთ.

---

## ახალი შემოწმების დამატება

1. შექმენით `scripts/check/check-<name>.mjs` (ან `.ts`). პოლიტიკის შემოწმებები სრულდება 0/1 კოდით.
   ზღვრული მაჩვენებლის ტიპის შემოწმებები მეტრიკას `collect-metrics.mjs`-ის მეშვეობით `quality-metrics.json`-ში წერენ.
2. `package.json`-ში დაამატეთ `"check:<name>": "node scripts/check/check-<name>.mjs"`.
3. დააკავშირეთ ის `.github/workflows/ci.yml`-ში, შესაბამის დავალებაში
   (პოლიტიკა → `lint` ან `docs-sync-strict`; ზღვრული მაჩვენებელი → `quality-gate`).
4. თუ მას დაშვებული გამონაკლისების სია აქვს, გამოიყენეთ `reportStaleEntries()` ფაილიდან
   `scripts/check/lib/allowlist.mjs`, რათა მოძველებული ჩანაწერები ავტომატურად გამოვლინდეს.
5. `tests/unit/build/`-ში დაწერეთ ტესტი, რომელიც შემოწმების გამოვლენის ლოგიკას მოიცავს.
6. განაახლეთ ეს დოკუმენტი (შესაბამისი დავალების ცხრილს დაამატეთ სტრიქონი).

---

## აგენტის ხელსაწყოები: LSP-in-the-loop (არჩევითი)

CI-ის შემოწმებების გარდა, OmniRoute-ს მოჰყვება **არჩევითი** `agent-lsp`-ის საწყისი სტრუქტურა
(პროექტის დონის `.mcp.json`, Fase 7 Task 15). შექმენით `.mcp.json`,
რათა კოდის დამწერ აგენტებს TypeScript-ის ენის სერვერზე წვდომა მისცეთ და მათ კოდის დაწერამდე
ამოხსნან სიმბოლოები / დიაგნოსტიკა — `typecheck:core`-ის კომპილაცია-მტკიცებამდე მიდგომის თანამგზავრი,
რომელიც „გამოგონილი სიმბოლოების“ შეცდომებს წყაროშივე ამცირებს. ის განზრახ არ იტვირთება
ავტომატურად (MCP↔LSP ხიდს თავად ირჩევთ და ამოწმებთ); გაუმართავი ჩანაწერი მხოლოდ
კავშირის შეცდომას აღრიცხავს და სესიებს არასოდეს არღვევს.

---

## რაციონალიზაციის ბექლოგი (ROI მიმოხილვა — ფაზა 9, ტალღა 3)

ეს ინვენტარი 2026-06-17-ს შეჯერდა `ci.yml`-თან (წინა ვერსიაში გამოტოვებული იყო
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). შეჯერებული ნაკრების ROI მიმოხილვამ
გამოავლინა რაციონალიზაციის შემდეგი კანდიდატები. **გაერთიანებები CI-ის მექანიკური
ცვლილებებია; გადართვა/ამოღება კი ოპერატორისთვის განკუთვნილი პოლიტიკის გადაწყვეტილებებია.** ქვემოთ
ჩამოთვლილიდან ჯერ არაფერი განხორციელებულა.

**ზემოთ ასევე არ არის დოკუმენტირებული** (სარეკომენდაციო, დაბალი სიგნალი): `docs-lint` დავალება
(markdownlint + Vale, მთელ დავალებაზე `continue-on-error`) და დამოუკიდებელი სკანერის სამუშაო პროცესები
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` არის
`quality-baseline.json`-ში, თუმცა `ci.yml`-ში ბლოკირების ტრეშოლდთან მიბმული არ არის — მეტრიკა
ამჟამად ობლადაა დარჩენილი.

### გაერთიანება / დუბლირების მოცილება (მექანიკური, ნაკლები რისკი)

თითოეული კანდიდატი 2026-06-17-ს მოქმედი გეიტების მდგომარეობასთან მიმართებით გადამოწმდა (ენდე, მაგრამ გადაამოწმე);
რამდენიმე „აშკარა“ გაერთიანება, როგორც აღმოჩნდა, დაფარულ დავალიანებას შეიცავდა და **არ არის** პირდაპირი, უპრობლემო ჩანაცვლება.

- **`check:docs-sync` ორჯერ სრულდება** — დამოუკიდებლად `lint` დავალებაში და ხელახლა `check:docs-all`-ის (`docs-sync-strict`) შიგნით, ასევე husky-ის pre-commit ჰუკში. ✅ **შესრულებულია** — დამოუკიდებელი `lint` გამოძახება ამოღებულია.
- **CVE სკანირება** — ❌ **სუფთა გაერთიანება არ არის.** `audit:deps` ნებისმიერ მაღალი/კრიტიკული სიმძიმის CVE-ზე მკაცრად მარცხდება; `check:vuln-ratchet` (osv) კი მხოლოდ საბაზისო მაჩვენებელთან შედარებით _გაუარესების_ შემთხვევაში მარცხდება (ამჟამად 1 MODERATE). სემანტიკა განსხვავებულია — `audit:deps`-ის ამოღებით მაღალი/კრიტიკული სიმძიმის აბსოლუტური გეიტი დაიკარგებოდა. ორივე დატოვეთ.
- **ციკლების აღმოჩენა** — ❌ **სუფთა გაერთიანება არ არის.** `check:circular-deps` (dpdm) აჩვენებს **91 ციკლს** (სწორედ ამიტომ არის სარეკომენდაციო); მათი წინასწარ აღმოფხვრის გარეშე მისი ბლოკირების რეჟიმში გადაყვანა შეუძლებელია და მას უფრო ფართო არეალი აქვს, ვიდრე წარმატებულ, კურირებულ `check:cycles`-ს. `check:cycles` დატოვეთ ბლოკირების რეჟიმში; dpdm-ის 91 ციკლის აღმოფხვრა ცალკე ბექლოგია.
- **სირთულე** — ✅ **შესრულებულია** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ESLint-ის ერთი გავლა, დათვლა ruleId-ის მიხედვით, რათა ციკლომატური სირთულისა და max-lines-ის საბაზისო მაჩვენებლები კოგნიტიური სირთულის საბაზისო მაჩვენებლებისგან დამოუკიდებელი დარჩეს; ცალკეული `check:complexity` / `check:cognitive-complexity` ლოკალური `--update`-ისთვის შენარჩუნებულია.
- **`/api`-ს ანტიჰალუცინაციური შემოწმება** — ✅ **შესრულებულია** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`-ის FS ინვენტარიზაცია ერთხელ სრულდება, openapi-routes + docs-symbols კვლავ დამოუკიდებლად აგენერირებს ანგარიშებს; ცალკეული შემოწმებები ლოკალური გაშვებებისთვის შენარჩუნებულია.
- **`check:node-runtime` 11 დავალებაში სრულდება** — ⚠️ **დაბალი ROI.** თითოეული ცალკე რანერია და შემოწმებას <1წმ სჭირდება; ჯამური ეკონომია ~10წმ-ია, იაფი თითო-დავალებიანი დაცვის დაკარგვის ფასად. ცვლილებებით გამოწვეულ აურზაურად არ ღირს.
- **`typecheck:noimplicit:core` CI lint-ში** — ✅ **ამოღებულია lint დავალებიდან** (იყო სარეკომენდაციო `continue-on-error`); ტიპების ზედაპირის ბლოკირებას უზრუნველყოფს `typecheck:core` + `check:type-coverage`. ლოკალური სკრიპტი შენარჩუნებულია.

### გადართვა / გადაწყვეტილება (ოპერატორის პოლიტიკა)

- `check:openapi-security-tiers` (სარეკომენდაციო) — ❌ **პირდაპირ ვერ გადაირთვება.** ის 0 კოდით სრულდება, თუმცა აფრთხილებს, რომ `LOCAL_ONLY_API_PREFIXES`-ის ქვეშ მდებარე `traffic-inspector`-ის რამდენიმე მარშრუტს `x-loopback-only: true` ანოტაცია აკლია. მის სავალდებულოდ ქცევამდე ეს ანოტაციები ჯერ `openapi.yaml`-ს უნდა დაემატოს.
- `typecheck:noimplicit:core` (სარეკომენდაციო) — ძირითადად მოცულია ბლოკირების რეჟიმში მოქმედი `check:type-coverage` ტრეშოლდით. გადაიყვანეთ ტრეშოლდზე ან ამოიღეთ ზედმეტი მეორე `tsc` გავლა.
- `test:vitest:ui` (ახლა **ბლოკირების რეჟიმშია**) — წინასწარ არსებული ჩავარდნები ცალსახად გამორიცხულია `vitest.config.ts`-ში `// #8618` თვალთვალის კომენტარებით; ახალი ჩავარდნები დავალებას წარუმატებლად ასრულებს.
- `check:secrets` (gitleaks, ბლოკირების ტრეშოლდი, დაფიქსირებული 3 დოკუმენტირებული ცრუ დადებითი შედეგით) — დაამატეთ სამივე დაშვებულთა სიაში, რათა მაჩვენებელი 0 გახდეს, ან გადაიყვანეთ სარეკომენდაციო რეჟიმში. ნაწილობრივ ემთხვევა GitHub-ის ჩაშენებულ საიდუმლოებების სკანირებას + `check:public-creds`.
- `check:pr-evidence` (ბლოკირების რეჟიმში, grep-ით ამოწმებს PR-ის ტექსტურ აღწერას) — ცრუ დადებითი შედეგების მაღალი რისკი; ამოღების შემთხვევაში Hard Rule #18-ის აღსრულება სუსტდება, ამიტომ ეს ნამდვილად პოლიტიკის საკითხია.
- `semgrep` (დამოუკიდებელი, სარეკომენდაციო) — OWASP-ის კატეგორიებისთვის CodeQL-ს ნაწილობრივ ემთხვევა; მიაბით მისი საბაზისო მაჩვენებელი ტრეშოლდს ან ამოიღეთ.

---

## დაკავშირებული დოკუმენტაცია

- მიწოდების ჯაჭვი (წარმოშობა, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — გასაღებების სიმრავლეთა თანხვედრის ბარიერი

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, დავალება `i18n-ui-coverage`).
ადარებს თითოეული `src/i18n/messages/<locale>.json`-ის ბოლო დონის გასაღებთა სიმრავლეს `en.json`-თან და
ნებისმიერი გამოტოვებული ან ზედმეტი ბოლო დონის გასაღების აღმოჩენისას მარცხდება, მიუხედავად იმისა, როდის დაემატა გასაღები. `__MISSING__:` ჩანაცვლების ნიშნები
არსებულად ითვლება (მათი შიგთავსი თანაფარდობის ბარიერის საზრუნავია). ეს არის ორ, diff-ზე დაფუძნებულ/პროცენტულ ბარიერთა აბსოლუტური შემავსებელი:
`check-ui-keys-coverage` თითოეული ლოკალისთვის მინიმალურ ზღვარს 80 %-ზე აწესებს
(~13,000-დან 43 გამოტოვებული გასაღების შემთხვევაშიც მაჩვენებელი კვლავ 99.7 %-ია), ხოლო `check-new-key-coverage` აფასებს
მხოლოდ იმ გასაღებებს, რომლებსაც PR `en.json`-ს ამატებს. ლოკალების პაკეტი გენერირდება იმ დღის `en.json`-იდან,
როდესაც მისი განშტოება იქმნება, და თარგმნა დღეების განმავლობაში გრძელდება, მაშინ როცა საბაზისო განშტოებას ახალი გასაღებები ემატება; პაკეტის PR თავად
არცერთ გასაღებს არ ამატებს, ამიტომ ორივე მონათესავე შემოწმება ჩუმად დარჩა, როდესაც პაკეტი 1 (#13044) ცხრა
ლოკალში 43 გასაღების დანაკლისით, ხოლო პაკეტი 2 (#13660) რვა ლოკალში 10 გასაღების დანაკლისით შევიდა (2026-09-15). წითელი სტატუსის გამოსასწორებლად გამოიყენეთ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` ბოლო დონის გასაღები
ნიშნავს, რომ წყაროდან ის წაიშალა — წაშალეთ იგი ლოკალიდან. `--warn` ანგარიშს წარადგენს მარცხის გარეშე.
`--catalog=cli` იმავე შედარებას `bin/cli/locales`-ზე ასრულებს (`npm run i18n:check-keys:cli`);
ორივე ნაბიჯი დავალება `i18n-ui-coverage`-შია.

#### `check-new-key-coverage` — ახალი გასაღებების i18n-ბარიერი

`check-ui-value-drift`-ის მონათესავე შემოწმება. ის აფიქსირებს შემთხვევას, როდესაც ინგლისური მნიშვნელობა **ხელახლა დაიწერა**,
ხოლო მისი თარგმანები უცვლელი დარჩა; ეს კი აფიქსირებს შემთხვევას, როდესაც ინგლისური გასაღები **დაემატა**,
მაგრამ ზოგიერთ ლოკალს ის საერთოდ არ მიუღია.

`check-ui-keys-coverage` ამ კლასის პრობლემას ვერ ხედავს: ის თითოეული ლოკალისთვის პროცენტულ მინიმალურ ზღვარს აწესებს, ხოლო
~13,000 ბოლო დონის გასაღებიდან თერთმეტის არარსებობის შემთხვევაშიც დაფარვა 99.9 %-ზე რჩება. თითოეული ენის პროცენტული მაჩვენებლით
ვერ გამოიხატება, რომ „ეს ფუნქცია უთარგმნელად გამოვიდა“ — ახალ ლოკალში მთელი ფუნქცია შეიძლება
ყოველგვარი ტექსტის გარეშე მოხვდეს ისე, რომ რიცხვი საერთოდ არ შეიცვალოს.

ინციდენტი, რომელსაც ეს შემოწმება ასახავს: Orchestration Canvas-ის მე-3 ფაზის თერთმეტივე გასაღები
იმ დროისთვის არსებულ 42 ლოკალზე ითარგმნა. რამდენიმე საათის შემდეგ ევროკავშირის ენების პაკეტმა (#13044) რეპოზიტორიაში
ლოკალების რაოდენობა 51-მდე გაზარდა, ხოლო ცხრა ახალ ლოკალს (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ისინი არასდროს
მიუღია. `deepMergeFallback` არარსებული გასაღების ნაცვლად ინგლისურ ტექსტს იყენებს, ამიტომ შედეგი
ცარიელი UI-ის ნაცვლად უთარგმნელი UI იყო — რეალური პრობლემა, რომელიც თავისი აგებულებით უხმაუროდ რჩებოდა.

მონათესავე შემოწმების მსგავსად, ისიც **diff-ის გათვალისწინებით მუშაობს** და შერწყმის საბაზისო წერტილში არსებულ ინგლისურ ტექსტს სამუშაო
ხეს ადარებს, ამიტომ მანამდე არსებული ხარვეზები გაყინული რჩება და ბარიერის ჩასართავად მიგრაცია საჭირო არ ყოფილა.

**`__MISSING__:<english>` მარკერი მოთხოვნას აღარ აკმაყოფილებს (2026-09-17-დან).** მანამდე ეს
დოკუმენტირებული გადავადების საშუალება იყო — შესრულების დროს სისტემა სწორ ინგლისურ ტექსტზე გადადიოდა — სანამ
2026-09-16-ს რვა ფუნქციურმა PR-მა 61 გასაღები არ დაამატა და თარგმნის ნაცვლად მარკერი 65-ვე ლოკალში არ ჩასვა:
ამ ბარიერმა ყოველი მათგანი მიიღო, PR-ები არაფერმა დაბლოკა, ხოლო რეალური თარგმანების თანაფარდობის დამბლოკავი ბარიერი
შემდეგ გამოშვების საბოლოო მდგომარეობაზე ყველასთვის ჩავარდა (pt-BR 3.2 % > 2.5 % + 0.5). მარკერი ახლა
არარსებულ თარგმანად ფასდება. წითელი სტატუსის გამოსასწორებლად გამოიყენეთ
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ან
ყველა ლოკალისთვის პარალელურად გაუშვით `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
გამოყოფილ რეჟიმში უსაფრთხოა და `OMNIROUTE_TRANSLATION_*` გარემოს ცვლადების გარეშე გაშვებაზე უარს ამბობს). გასაღები, რომელიც
აუცილებლად ინგლისურად უნდა დარჩეს (პროდუქტის/ძრავის/ალმის ფიქსირებული სახელი), უნდა მოთავსდეს `scripts/i18n/untranslatable-keys.json`-ში
და არასდროს დაიმალოს მარკერის მიღმა. `vi` მარკერებს სრულად კრძალავს (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — გადადებული ტესტების ბარიერი

`vitest.config.ts`-ის `exclude` სიაში მოთავსებული ფაილი არის ტესტი, რომელიც არ სრულდება, თუმცა
ხის წამკითხველისთვის დაფარვას ჰგავს. კომენტარის
`// #8618 — მანამდე არსებული მარცხი; გამოსწორების შემდეგ წაშალეთ ეს გამონაკლისი` მიღმა სამოცდაორი ფაილი დაგროვდა. საკითხი #8618
2026-08-11-ს დაიხურა, ხოლო სია, რომელსაც ის აკვირდებოდა, 45 ჩანაწერიდან 62-მდე გაიზარდა; ყოველ ახალ ჩანაწერს მემკვიდრეობით
ერგებოდა კომენტარი, რომელიც დახურულ საკითხზე მიუთითებდა. როდესაც სია საბოლოოდ ფაილების მიხედვით გაიზომა (#13204), **62-დან 51
მიმდინარე ხეზე წყაროს ყოველგვარი ცვლილების გარეშე წარმატებით სრულდებოდა**.

ბარიერი მოითხოვს, რომ ყოველი გამონაკლისი, რომელიც რეალურ ფაილზე მიუთითებს, (a) ასახელებდეს თვალის სადევნებელ საკითხს და
(b) დაფიქსირებული სტატუსით იყოს წარმოდგენილი `config/quality/vitest-exclusions.json`-ში, რათა ახლის დამატება
ცალკე ფაილში განსახილველი diff იყოს და არა კიდევ ერთი სტრიქონი 60-ჩანაწერიან მასივში. ის განზრახ
არ უშვებს გამორიცხულ ტესტებს ხელახლა — ამას ~10 წუთი სჭირდება და პერიოდულ დავალებას ეკუთვნის;
ინვენტარი აღრიცხავს, ბოლოს როდის გაიზომა თითოეული მათგანი.
