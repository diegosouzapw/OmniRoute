# Cursor Provider in Docker Environments (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

როდესაც OmniRoute Docker-ის შიგნით მუშაობს, ძველი **იმპორტი Cursor IDE-დან** /
`cursor-agent` ნაკადები ვერ სრულდება, რადგან კონტეინერი ჰოსტის Cursor-ის
ინსტალაციას ვერ ხედავს. ამის ნაცვლად გამოიყენეთ **Cursor-ით შესვლა** (deep-control PKCE).

## რატომ ვერ მუშაობს IDE / CLI იმპორტი Docker-ში

1. **ფაილური სისტემის იზოლაცია** — ავტომატური იმპორტი Linux-ის ისეთ ბილიკებს ეძებს, როგორიცაა
   `~/.config/Cursor/User/globalStorage/state.vscdb` _კონტეინერის შიგნით_.
   macOS-ისთვის განკუთვნილ Docker Desktop-ში ჰოსტის IDE-ის DB ნაგულისხმევად არ არის დამონტაჟებული,
   ხოლო კონტეინერის OS არის Linux მაშინაც კი, როცა ჰოსტი Darwin-ია.
2. **`cursor-agent` ბინარული ფაილი არ არის** — OmniRoute-ის ოფიციალურ გამოსახულებებს
   `cursor-agent` არ მოჰყვება. ხელმისაწვდომი მოდელების ფუნქცია ადრე გარსიდან უშვებდა
   `cursor-agent --list-models`-ს და წარუმატებლობისას სტატიკურ კატალოგზე გადადიოდა.
3. **არასწორი ბინარული ფაილი** — **არ** დაამონტაჟოთ macOS-ის `cursor-agent` bind mount-ით Linux-ის
   კონტეინერში. ის ვერ გაეშვება.

## რეკომენდებული: Cursor-ით შესვლა

1. გახსენით **მართვის პანელი → პროვაიდერები → Cursor**.
2. აირჩიეთ ჩანართი **Cursor-ით შესვლა**.
3. დააწკაპუნეთ **Cursor-ით შესვლას** — OmniRoute თქვენს **ჰოსტის** ბრაუზერში გახსნის
   `https://cursor.com/loginDeepControl?…`-ს.
4. დაადასტურეთ შესვლა ბრაუზერში, შემდეგ კი დაბრუნდით მართვის პანელზე. OmniRoute
   გამოკითხავს `api2.cursor.sh/auth/poll`-ს, სანამ ტოკენები არ მოვა.
5. OmniRoute ინახავს **წვდომისა და განახლების** ტოკენებს და მათ
   `https://api2.cursor.sh/auth/exchange_user_api_key`-ის მეშვეობით აახლებს.

ამ გზისთვის კონტეინერის შიგნით Cursor IDE ან `cursor-agent` საჭირო არ არის.

## მოდელების აღმოჩენა

შესული კავშირის არსებობისას **ხელმისაწვდომი მოდელები / ავტომატური სინქრონიზაცია** უპირატესობას ანიჭებს Cursor-ის
HTTP `AiService/AvailableModels` კატალოგს, კავშირის bearer ტოკენის გამოყენებით.
თუ ეს ვერ მოხერხდება, OmniRoute მაინც ცდის ჰოსტის `cursor-agent`-ს (თუ ის არსებობს), შემდეგ კი
სტატიკური რეესტრის საწყის მონაცემებს.

OmniRoute კატალოგში ყოველთვის აჩენს **`auto`**-ს (ნაჩვენებია როგორც „Auto“), ასევე
OpenCodex-ის სტილის როუტერის რეჟიმებს: **`auto-cost`**, **`auto-balance`** და
**`auto-intelligence`**. გადაცემისას ისინი Cursor-ის `default` მოდელს შეესაბამება
(სამივე ვარიანტისთვის `optimization` ModelParameter-ით). როცა პრემიუმ მოდელების გამოყენების
ლიმიტი ამოწურულია, უპირატესობა მიანიჭეთ `cu/auto`-ს — Auto-ს ხშირად ჯერ კიდევ აქვს ბიუჯეტი.

### სინქრონიზაციისას ცოცხალი კატალოგი ექსკლუზიურია

Cursor-ის მოდელების წარმატებული სინქრონიზაციის შემდეგ (`cursor-agent --list-models` → შენახული
სინქრონიზებული კატალოგი, ან ზემოთ აღწერილი bearer-ით ავთენტიფიცირებული `AvailableModels` მოთხოვნა),
**მართვის პანელი**, **`/v1/models`** და **ყველას ტესტირება** აჩვენებს:

1. ცოცხალი სინქრონიზაციით დაბრუნებულ მოდელებს
2. დამატებულ ავტომატური როუტერის id-ებს: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ოპერატორის **მორგებულ** მოდელებს (იმპორტი / ხელით დამატება) — სინქრონიზაცია მათ არასოდეს შლის

დიდი სტატიკური რეესტრი მისამართზე
`open-sse/config/providers/registry/cursor/` განკუთვნილია **მხოლოდ ოფლაინ სარეზერვო ვარიანტად**. როცა
სინქრონიზებული სია ცარიელია (ან აღმოჩენა ვერ ხერხდება), ჩამონათვალი ამ რეესტრზე გადადის.

ძალისხმევის აღმნიშვნელი სუფიქსის მქონე id-ები (მაგალითად `claude-4.6-sonnet-high`) კვლავ შეიძლება
შესრულების დროს იყოს **მოთხოვნილი**: `resolveRequestedModel` სუფიქსს აშორებს და მას გადაცემის
`ModelParameter`-ად გარდაქმნის. ექსკლუზიური ჩამონათვალი განზრახ მალავს ამ სტატიკურ ვარიანტებს
ყველას ტესტირებიდან, რათა შემოწმებები შეესაბამებოდეს იმას, რასაც Cursor რეალურად ხელმისაწვდომად აბრუნებს.

### დამხმარე ფუნქციები

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — მართვის პანელის გაერთიანება
- `ensureCursorAutoCatalogEntry` — auto* ელემენტების დამატება აღმოჩენისა და ჩამონათვალის დროს
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models`-ის სტატიკური ციკლი

## პროვაიდერის ლიმიტები (კვოტა)

Cursor-ისთვის **გამოყენება → პროვაიდერის ლიმიტები** იყენებს Bearer API-ებს `api2.cursor.sh`-ზე
(`GetCurrentPeriodUsage` → გამოყენების შეჯამება → auth/usage) PKCE-ის ან ტოკენის
იმპორტის შემდეგ. ძველი cookie/`cursor.com` მართვის პანელის გზა რჩება ბოლო სარეზერვო ვარიანტად
IDE-დან იმპორტირებული ძველი სესიებისთვის.

ფანჯრები, როგორც წესი, მოიცავს **სულ**, **Auto + Composer** და **API** მნიშვნელობებს. თუ
ლიმიტები ცარიელი ჩანს, ხელახლა გაუშვით **Cursor-ით შესვლა** ან თავიდან შემოიტანეთ ტოკენები (მხოლოდ IDE-დან იმპორტი
აღარ არის საჭირო).

## ცარიელი პასუხები / გამოყენების ლიმიტის ამოწურვა

როდესაც Cursor იღებს Run-ს, მაგრამ ასისტენტის ტექსტს არ აბრუნებს (რაც ხშირად ხდება პრემიუმ
გამოყენების ლიმიტის ამოწურვისას), OmniRoute აჩვენებს ქმედით **429**-ს (კვოტის მინიშნებებით) ან
**502**-ს ინსტრუქციებით — და არა უბრალოდ „პროვაიდერმა ცარიელი შიგთავსი დააბრუნა“. სტრიმინგის
შეცდომები, როგორიცაა `not_found: AI Model Not Found` (გამოყენების ფანჯარა ამოწურულია),
კლასიფიცირდება როგორც **Cursor-ის სიხშირის ლიმიტი / გამოყენების ლიმიტის გადაჭარბება** და ეს შეტყობინება
SSE კონვეიერში შენარჩუნებულია (საერთო ცარიელი ნაკადის დამცავი უკვე გამოტანილ შეცდომას არ
გადაწერს). შეამოწმეთ პროვაიდერის ლიმიტები, სცადეთ მოდელი **`auto`**, ან გაზარდეთ
Cursor-ის გეგმის ლიმიტები.

## კლიენტის ვერსია (უგრაფიკო რეჟიმი)

ადგილობრივად დაყენებული `cursor-agent`-ის გარეშე OmniRoute განსაზღვრავს
`x-cursor-client-version`-ს ჯერ env `CURSOR_AGENT_CLI_VERSION`-ის მეშვეობით, შემდეგ Cursor-ის
ინსტალერის სკრიპტის დისკზე დაკეშილი ამოღებით, ბოლოს კი ფიქსირებული build id-ით. საჭიროებისას
გადააწერეთ `CURSOR_AGENT_CLI_VERSION`-ის გამოყენებით.

## სარეზერვო ვარიანტი: ტოკენის ხელით იმპორტი

თუ ბრაუზერით შესვლას ვერ ასრულებთ:

1. ჰოსტზე ამოიღეთ ტოკენები Cursor-ის `state.vscdb`-დან:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor-ის ავთენტიფიკაციის მოდალურ ფანჯარაში გახსენით **ტოკენის იმპორტი**.
3. ჩასვით **წვდომის ტოკენი** და, თუ ხელმისაწვდომია, **განახლების ტოკენი** (საჭიროა
   ავტომატური განახლებისთვის). მანქანის ID არასავალდებულოა.

მხოლოდ წვდომის ტოკენის იმპორტიც მუშაობს, მაგრამ განახლების ტოკენის გარეშე მისი ვადა ამოიწურება —
ხელახლა შემოიტანეთ, როცა ჩატი ავთენტიფიკაციის შეცდომებს დააბრუნებს.

## დაკავშირებული მასალები

- Zed-ის Docker სახელმძღვანელო: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex-ის Cursor-ით შესვლის ცნობარი (გარე):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
