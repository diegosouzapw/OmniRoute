# Merge Queue & Manual Merge-Train Runbook (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49-დან (ხარისხის/სიჩქარის გეგმის WS3.2/WS3.4) განხილული PR-ების `release/vX.Y.Z`-ში შერწყმის ნაგულისხმევი გზა არის **Mergify-ის შერწყმის რიგი** (`.mergify.yml`);
ქვემოთ დოკუმენტირებული **ხელით მართვადი merge-train** არის სარეზერვო გზა — ის გამოიყენება ინციდენტების, რელიზის გაყინვის დროს ან იმ შემთხვევაში, თუ Mergify Open Source-ის გეგმა ოდესმე შეიცვლება.

## ნაგულისხმევი გზა: Mergify-ის რიგი

1. PR განხილულია/წარმატებითაა შემოწმებული კამპანიების მიერ და დამტკიცებულია მფლობელის შერწყმამდელი ⭐
   ბარიერის შესაბამისად (ანგარიში + გადაწყვეტილება თითოეულ ელემენტზე — იხილეთ `/merge-prs`-ის ნაბიჯი 0.75).
2. მფლობელი (ან მფლობელის გადაწყვეტილების საფუძველზე მოქმედი სესია) ანიჭებს **`queue`**
   ჭდეს. ეს ჭდე თავად არის შერწყმის თანხმობა; Mergify მხოლოდ ასრულებს მას.
3. Mergify აჯგუფებს რიგში მყოფ მაქსიმუმ 10 PR-ს, ამოწმებს ჯგუფს სწრაფი ბარიერების მიხედვით
   და აერთიანებს (squash). წარუმატებელი ჯგუფი **ავტომატურად იყოფა ორ ნაწილად** — პრობლემური PR
   იზოლირდება დაახლოებით log2(N) განმეორებითი შემოწმებით და რიგიდან იხსნება; დანარჩენები პროცესს აგრძელებენ.
4. შერწყმის შემდეგ continuous release-green სამუშაო პროცესი push-ისას ამოწმებს ახალ წვერს
   და ხსნის მიკუთვნების საკითხს, თუ კომბინაციამ რეგრესია გამოიწვია (ავტომატური უკუქცევა არასოდეს ხდება).

დამცავი წესები (იმეორებს `CLAUDE.md`-ის მკაცრ წესებს #21/#22):

- **რელიზის გაყინვა აქტიურია** → გაყინულ განშტოებაზე დამიზნებულ PR-ებს ჭდე არ მიანიჭოთ; ჯერ გადაამისამართეთ
  აქტიურ `release/vX+1`-ზე.
- **სხვა სესიის მიმდინარე PR** → არასოდეს მიანიჭოთ მას ჭდე; საკუთარ სამუშაოს რიგში მხოლოდ მისი მფლობელი სესია აყენებს.
- მხოლოდ ტესტების შემცველი ცვლილებები და `hotfix` ჭდის მქონე PR-ები უკვე გადიან შემოკლებულ CI-ს (იხილეთ
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); რიგის პირობები იღებს რეალურად გაშვებული
  შემოწმებების ნებისმიერ ნაკრებს (`#check-failure=0` + `#check-pending=0`).

## სარეზერვო გზა: ხელით მართვადი merge-train

გამოიყენება, როდესაც რიგი მიუწვდომელია. ეს აფორმალიზებს პრაქტიკას, რომლითაც v3.8.47-ის ციკლის დროს
ერთ დღეში 33 PR დამუშავდა:

1. **შეადგინეთ ჯგუფი** (დაახლოებით 10–30 განხილული+დამტკიცებული PR). შეამოწმეთ `linked:` კოლიზიები
   (იგივე `tap.testFiles`, CHANGELOG-ის იგივე ფრაგმენტები) და ისინი თანმიმდევრულად დაამუშავეთ.
2. **შეამოწმეთ ერთხელ**: რელიზის წვერიდან შექმნილ იზოლირებულ worktree-ში ლოკალურად გააერთიანეთ ჯგუფის ყველა
   head, შემდეგ კი გაუშვით რელიზის ეკვივალენტური ნაკრები
   (`npm run check:release-green`; რელიზამდე დაამატეთ `--with-build`).
   `scripts/release/merge-train.sh <base> <PR#>…` ავტომატიზებას უკეთებს ნაბიჯებს 1–2 (კონფლიქტური
   PR-ები გამოეთიშება, მატარებელი კი აგრძელებს მუშაობას). სრული რეჟიმი უშვებს `npm run test:unit`-ს — სისტემაზე
   მორგებულ გამშვებს (`--test-concurrency=20`) და **არა** ორ თანმიმდევრულ 4-ბირთვიან CI
   shard-ს, რომლებიც დომინანტურ ფაზაში 16-ბირთვიანი სისტემის მხოლოდ დაახლოებით 25%-ს იყენებდა (გამოსწორდა
   2026-07-18). `--fast` (დღის განმავლობაში დიდი merge-train-ების დაცლა, მფლობელის მიერ დამტკიცებული 2026-07-18)
   ინარჩუნებს ყველა სტატიკურ ბარიერს + vitest-ს, მაგრამ უშვებს მხოლოდ იმ node:test ფაილებს, რომლებიც
   მატარებელში ჩასმულმა PR-ებმა შეცვალა; დაგროვებულ წვერზე სრული ნაკრები მაინც უნდა გაეშვას დღეში
   მინიმუმ ერთხელ (ერთი მატარებელი `--fast`-ის გარეშე).
3. **წარმატებულია** → გააერთიანეთ PR-ები თანმიმდევრულად (ყოველი მათგანის წინ ხელახლა შეამოწმეთ `state,headRefOid` —
   PR, რომლის head შეიცვალა, ხელახლა გადის განხილვას). დაამტკიცეთ, რომ თითოეული შერწყმის წმინდა diff მხოლოდ
   ამ PR-ის ცვლილებაა (ავტომატური კონფლიქტის გადაწყვეტით გამოწვეული უკუქცევები დაუშვებელია: ფარგლებს გარეთ არსებული
   წაშლების გამოსავლენად შეამოწმეთ `git diff --stat`).
4. **წარუმატებელია** → სათითაოდ ხელახლა შემოწმების ნაცვლად ჯგუფი ორად გაყავით (შეამოწმეთ თითოეული ნახევარი);
   პრობლემური PR მტკიცებულებებთან ერთად დააბრუნეთ განხილვის რიგში.
5. **არასოდეს**: გაყინვის დროს არ გააერთიანოთ გაყინულ განშტოებაში; არსად გამოიყენოთ `git stash`;
   არ გაუშვათ CI ხელაღებით თავიდან იმ იმედით, რომ წარუმატებელი შედეგი გაქრება (წესი: წარუმატებელი შედეგი ინფორმაციაა).

## დონეები (რატომ არის რიგი უსაფრთხო მხოლოდ სწრაფი ბარიერებით)

- **თითოეულ PR-ზე** (quality.yml-ის სწრაფი ბარიერები): TIA-ის მიერ ზემოქმედებული ტესტები + სრული unit 4-shard +
  vitest + lint-ის ნაკრები + typecheck + დოკუმენტაციის/ცვლილებების ჟურნალის მთლიანობა.
- **თითოეულ ჯგუფზე/წვერზე** (continuous release-green): `--quick` მკაცრი ბარიერები რელიზის განშტოებაზე ყოველი push-ისას;
  სრული `--with-build --full-ci` შემოწმებები დღეში 3-ჯერ.
- **თითოეულ რელიზზე** (ci.yml რელიზის PR-ზე): სრული მატრიცა, მათ შორის E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

ადრინდელთან შედარებით არაფერი მოწმდება ნაკლებად — მძიმე ზედაპირი უბრალოდ თითოეული PR-ის ნაცვლად
თითოეულ ჯგუფზე/წვერზე მოწმდება, რაც O(N) განმეორებით ციკლებს აღმოფხვრის.
