# Account-Ban / Banned-Keyword Detection (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute ამოწმებს ზედა დონის პროვაიდერის შეცდომების პასუხებს იმ ნიშნების საპოვნელად, რომლებიც მიუთითებს, რომ პროვაიდერის
**ანგარიში სამუდამოდ გაუქმებულია** (შეჩერებული / დეაქტივირებული / ToS-ის დარღვევისთვის აკრძალული) და, დამთხვევის
შემთხვევაში, ამ კავშირს გადააქვს **ტერმინალურ `banned` მდგომარეობაში**, რათა ის მოთხოვნებისთვის
აღარ შეირჩეს. სწორედ ამას აკონფიგურირებს **Security → Banned Keywords**
პარამეტრების ბარათი („დამატებითი საკვანძო სიტყვები, რომლებიც ანგარიშის მუდმივი
აკრძალვის აღმოჩენას იწვევს. ჩაშენებული საკვანძო სიტყვები ყოველთვის გამოიყენება.“).

ამ გვერდზე აღწერილია ჩაშენებული სია, აღმოჩენის პროცესი, მისი მოქმედების არეალი, მორგებული
საკვანძო სიტყვების უსაფრთხოდ დამატების წესი და მონიშნული კავშირის აღდგენის მეთოდი. თავად ტერმინალური
მდგომარეობა მდგრადობის მოდელის ნაწილია — იხილეთ
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) („ტერმინალური მდგომარეობები“).

**ჭეშმარიტების წყარო:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## ჩაშენებული საკვანძო სიტყვები

ეს 8 ქვესტრიქონი ყოველთვის გამოიყენება (რეგისტრის გაუთვალისწინებლად), ნებისმიერი მორგებული სიისგან დამოუკიდებლად:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> ეს სია იცვლება პროვაიდერების მიერ აკრძალვის ფორმულირების ცვლილებასთან ერთად. ავტორიტეტული
> ასლია `ACCOUNT_DEACTIVATED_SIGNALS` ფაილში `open-sse/services/accountFallback.ts`;
> ზემოთ მოცემული ბლოკი განიხილეთ როგორც მიმდინარე მომენტის ანაბეჭდი.

იმავე ფაილში განთავსებულია ორი მომიჯნავე, **ცალკეული** სიგნალების ცხრილი, რომლებიც აკრძალული
საკვანძო სიტყვების აღმოჩენის ნაწილი _არ არის_:

- `CREDITS_EXHAUSTED_SIGNALS` — ბილინგის/კვოტის ამოწურვა (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → ტერმინალური `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **არატერმინალური**; ტოკენის განახლებას აღდგენა შეუძლია.

შენიშვნა: გავრცელებული დროებითი ფრაზები, როგორიცაა **`rate limit`** / `429`, მუშავდება
სიხშირის შეზღუდვის / კავშირის დაყოვნების გზით და აკრძალვის სიგნალებს **არ** წარმოადგენს.

## აღმოჩენის პროცესი

```
ზედა დონის პროვაიდერის შეცდომის პასუხი
  → სხეული გარდაიქმნება სტრიქონად + გადადის ქვედა რეგისტრში
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [ქვესტრიქონის დამთხვევა]
  → დამთხვევა?
      → კავშირის testStatus = "banned"      (მუდმივი — 1-წლიანი დაყოვნება, ავტომატურად არასდროს აღდგება)
      → თუ პარამეტრი `autoDisableBannedAccounts` ჩართულია და `autoDisableBannedScope`
        მოიცავს ამ კავშირს (`all`, ან `subscription` OAuth/cookie/session-ისთვის)
        → ასევე isActive = false. წინასწარ გადახდილი API გასაღებები აქტიური რჩება, როდესაც მოქმედების არეალია
        `subscription`.
      → ანგარიში გამოტოვებულია ანგარიშის შერჩევისას (კომბინირებული QUOTA_BLOCKING მდგომარეობები)
```

- დამთხვევა არის რეგისტრის გაუთვალისწინებელი **ქვესტრიქონის** ძიება პასუხის **სხეულში**
  (`isAccountDeactivated`, `accountFallback.ts`).
- მუდმივი `banned` ტერმინალიზაცია აკრძალვის სიგნალის შემცველი სხეულის შემთხვევაში ხდება **ნებისმიერი
  HTTP სტატუსისას** (`markAccountUnavailable` → `checkFallbackError`-ის მეშვეობით). უფრო
  ვიწრო **`deactivated`** ჭდე (`isActive=false`, როდესაც კავშირს სათადარიგო API
  გასაღებები არ აქვს) იწერება `chatCore.ts`-ის შიდა გზის მიერ **HTTP 401 / 403**-ზე
  (`classifyProviderError` → `ACCOUNT_DEACTIVATED`-ის მეშვეობით კლასიფიცირებული). გაითვალისწინეთ, რომ
  `markAccountUnavailable()` გზა იმავე `ACCOUNT_DEACTIVATED` სიგნალისთვის წერს _განსხვავებულ_
  ტერმინალურ სტატუსს — **`expired`** — (`resolveTerminalConnectionStatus`-ის მეშვეობით), ამიტომ
  ერთი და იგივე აკრძალვა შეიძლება გამოჩნდეს როგორც `deactivated`, ისე `expired`, იმის მიხედვით,
  თუ რომელმა გზამ დაამუშავა პასუხი. (კოდის ძველ კომენტარში ნათქვამია „როდესაც 401 პასუხის სხეული ამ
  სტრიქონებს შეიცავს“ — ეს მიმდინარე ქცევას სრულად არ ასახავს.)
- `banned` კავშირი გამორიცხულია შერჩევიდან ყველგან, სადაც ტერმინალური სტატუსები
  იფილტრება (`isTerminalConnectionStatus`, კომბინირებული `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## მოქმედების არეალი — რომელი პროვაიდერები სკანირდება

**ყველა პროვაიდერი.** შემოწმება სრულდება შეცდომების დამუშავების ზოგად კონვეიერში,
რომელშიც ზემდგომ სერვისთან დაკავშირებული ყოველი წარუმატებელი მოთხოვნა გადის — ის
**არ არის** შეზღუდული OAuth/გამოწერის სკრეიპერებით. მიღებული ტერმინალური მდგომარეობა
ვრცელდება **კავშირზე** და არა პროვაიდერზე.

თუმცა, ჩაშენებული _სტრიქონები_ ორიენტირებულია გამოწერის/OAuth-ის პროვაიდერებზე,
სადაც დაბლოკვის რეალური რისკია (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). API-გასაღების პროვაიდერი დეტექტორს მხოლოდ მაშინ აამოქმედებს, თუ მისი
შეცდომის პასუხის სხეული პირდაპირ შეიცავს ერთ-ერთ ქვეჯაჭვს.

`autoDisableBannedScope` (`all` | `subscription`, ნაგულისხმევად `all`) განსაზღვრავს,
შეცვლის თუ არა დამთხვევა ასევე `isActive=false`-ზე. `subscription` ნიშნავს
ავტორიზაციაზე დაფუძნებულ ადგილებს (ფასიანი გამოწერები და უფასო ანგარიშები,
ვებ-ქუქიების სესიების ჩათვლით). ის წინასწარ გადახდილი API-გასაღებებისთვის მაინც
აფიქსირებს `testStatus=banned`-ს, თუმცა მათ მარშრუტიზაციის პულში ტოვებს. მდგრადი
დიზაინი ითვალისწინებს თითოეული პროვაიდერისა და ანგარიშის დონეზე გადაფარვას;
გლობალური ჩამონათვალი მხოლოდ პირველი ვერსიაა.

## დაბლოკვის მორგებული საკვანძო სიტყვები

დაამატეთ ან წაშალეთ საკვანძო სიტყვები განყოფილებაში **Security → Banned Keywords**
(ინახება როგორც გლობალური `customBannedSignals` პარამეტრი
`PATCH /api/settings`-ის მეშვეობით). ისინი **ემატება** ჩაშენებულ სიას — არასოდეს
ანაცვლებს მას — და შენახვისას (ასევე გაშვებისას) დინამიკურად გადაიტვირთება
`setCustomBannedSignals()`-ის მეშვეობით. თითოეული საკვანძო სიტყვის სიგრძე
მაქსიმუმ 200 სიმბოლოა; მასივის სიგრძეზე შეზღუდვა არ არსებობს.

**⚠ ცრუ დადებითი შედეგის რისკი — აირჩიეთ კონკრეტული ფრაზები.** დეტექცია პასუხის
მთელ სხეულში ქვეჯაჭვის პირდაპირ დამთხვევას ეფუძნება, ხოლო დამთხვევა
**მუდმივია** (1-წლიანი მოლოდინის პერიოდი, ხელით აღდგენა). ზედმეტად ზოგადმა
საკვანძო სიტყვამ შეიძლება სრულიად გამართული კავშირი დაბლოკოს:

- **ცუდი:** `quota`, `limit`, `error`, `denied` — გვხვდება მრავალ დროებით შეცდომაში.
- **კარგი:** დაბლოკვის სრული წინადადებები, მაგალითად `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

უპირატესობა მიანიჭეთ ყველაზე გრძელ, არაორაზროვან ფრაზას, რომელსაც პროვაიდერი
რეალური დაბლოკვისას აბრუნებს. ეჭვის შემთხვევაში, ჯერ დააკვირდით კავშირის
`lastError`-ს, შემდეგ კი დაამატეთ ზუსტი ფორმულირება.

## მონიშნული კავშირის აღდგენა

ტერმინალური `banned` / `deactivated` მდგომარეობები **ავტომატურად არასოდეს
აღდგება** (ისინი გამორიცხულია პროაქტიული აღდგენის ციკლიდან — თავისით მხოლოდ
`unavailable` მდგომარეობის მოლოდინის პერიოდები აღდგება). ოპერატორმა ისინი
ცალსახად უნდა გაასუფთაოს:

1. **ხელახლა შეამოწმეთ კავშირი** — დაფის **Test** მოქმედება
   (`POST /api/providers/{id}/test`); წარმატებული შემოწმება `testStatus`-ს
   `active`-ზე აბრუნებს და შეცდომის ველებს ასუფთავებს.
2. **ხელახლა გაიარეთ ავთენტიფიკაცია / შეცვალეთ ავტორიზაციის მონაცემები** —
   OAuth პროვაიდერებისთვის ხელახლა გაუშვით შესვლის / განახლების პროცესი;
   პროვაიდერის შექმნის/იმპორტის მარშრუტები ადგენს `isActive = true`-ს.
3. **ხელახლა ჩართეთ კავშირი** — თუ ავტომატურმა გამორთვამ დააყენა
   `isActive = false` (მოქმედების არეალი `all`, ან `subscription`
   OAuth/ქუქის/სესიის კავშირისთვის), ანგარიშის გამოსწორების შემდეგ კვლავ
   ჩართეთ იგი.

ცალკე „დაბლოკვის ალმის გასუფთავების“ ღილაკი არ არსებობს — აღდგენა ხდება
ხელახალი შემოწმებით, ხელახალი ავთენტიფიკაციით ან ხელახალი ჩართვით, რაც შეესაბამება
ტერმინალური მდგომარეობის ზოგად წესს
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)-ში.

## შემოწმების იზოლაცია (ყველა მოდელის ტესტირება)

**შემოწმებიდან წარმოშობილი წარუმატებლობა** (ყველა მოდელის ტესტირება /
მდგომარეობის შემოწმების გაგზავნები, რომლებიც `runAsProbe`-ში სრულდება) კავშირს
პულიდან არასოდეს შლის (#9817): ის **ხილვადობისთვის ფიქსირდება**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), მაგრამ
გამოტოვებს მარშრუტიზაციის **ყველა** ცვლილებას — მოლოდინის პერიოდებს,
ტერმინალურ მდგომარეობას (`banned` / `deactivated` / `credits_exhausted`),
თითოეული მოდელის ბლოკირებებს, პროვაიდერის ამომრთველს, 5-წუთიან კვოტის კეშს,
OAuth ტოკენის განახლებასა და ავტომატურ გამორთვას. დეაქტივაციას მხოლოდ რეალური
მოთხოვნის გზაზე წარმოშობილი წარუმატებლობა იწვევს. დაფიქსირებული შეცდომის
წყალობით მონიშნული ანგარიში დაფაზე ჩანს, თუმცა ის ტრაფიკის მომსახურებას
აგრძელებს.

გადაწყვეტილების ერთადერთი წერტილია `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), რომელსაც მიმართავს **ყველა** ადგილი,
სადაც შემოწმებიდან წარმოშობილმა წარუმატებლობამ შეიძლება მარშრუტიზაციის
მდგომარეობა შეცვალოს:

- `markAccountUnavailable` (`auth.ts`) — მხოლოდ დაფიქსირება (`lastError`-ში
  დაუმუშავებელი ტექსტი, `lastErrorType`, `errorCode`, `lastErrorAt`; განზრახ
  **არ არის** `backoffLevel`, რადგან ის შერჩევისას ავტომატურ შემცირებას
  აამოქმედებდა და ჩანაწერს წაშლიდა)
- `maybeAutoDisableBannedAccount` — ავტომატური გამორთვის გარეშე
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (მხოლოდ
  დაფიქსირება, ტერმინალური `credits_exhausted`-ის გარეშე), GEO_BLOCKED
  (24-საათიანი გამორიცხვის გარეშე), MODEL_NOT_FOUND (`lockModel`-ის გარეშე),
  codex 429-ის ანგარიშის როტაციაზე გადართვა (`markCodexScopeRateLimited`-ის
  გარეშე, შენახული `rate_limited_until`-ის გარეშე, სესიასთან მიბმის
  გასუფთავების გარეშე), `persistCodexQuotaState` (კვოტის მდგომარეობის
  ჩაწერისა და კეშის გაუქმების გარეშე), `recordKeyHealthStatus` (გასაღების
  მდგომარეობის როტატორი ხელუხლებელია)
- OAuth-ის განახლება — როგორც პროაქტიული განახლება შემსრულებლის საბაზო ნაწილში
  (`base.ts` `execute()`, განახლების ტოკენის როტაციის გამოყენების გარეშე),
  ისე რეაქტიული 401/403 გზა `chatCore`-ში (`expired` დეაქტივაციის გარეშე)
- `chat.ts` — პროვაიდერის ამომრთველი და 5-წუთიანი კვოტის კეში
  (`markAccountExhaustedFrom429`) არასოდეს უარესდება

დაფიქსირებული შეცდომის წყალობით მონიშნული ანგარიში დაფაზე ჩანს, თუმცა ის
ტრაფიკის მომსახურებას აგრძელებს. შენიშვნა: შემოწმების ჩანაწერი ინახავს
**დაუმუშავებელ** (მოუჭრელ) შეცდომის ტექსტს, რეალური გზის
`slice(0,100)`-ით შემოკლებისგან განსხვავებით.

ოპერატორებს, რომლებიც ყველა მოდელის ტესტირებას ტექნიკური მომსახურების
ინსტრუმენტად იყენებენ, შეუძლიათ ისტორიული ქცევა აღადგინონ (შემოწმება ჩაითვლება
რეალურ გენერაციად) ერთ-ერთი შემდეგი გზით:

- `probeCanDisable` პარამეტრი (`POST /api/settings`
  `{"probeCanDisable": true}`-ით, ან პირდაპირი `key_value` DB რედაქტირება), ან
- ფუნქციური ალამი **`PROBE_CAN_DISABLE=true`** (env ან DB გადაფარვა;
  პარამეტრზე პრიორიტეტულია).

ავარიულად უსაფრთხო ქცევა: თუ ალმის ან პარამეტრების მოძიება შეცდომას გამოიწვევს,
იზოლაცია ჩართული რჩება.

## საწყისი ფაილები

| დანიშნულება                                            | ფაილი                                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| სიგნალების ცხრილები + დამთხვევა                        | `open-sse/services/accountFallback.ts`                                                                        |
| ტერმინალიზაცია / მუდმივი შენახვა                       | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| ავტომატური გამორთვის არეალი                            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| ჩაშენებული კლასიფიკაცია                                | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| ტერმინალური მდგომარეობის აღდგენის გამორიცხვა           | `src/lib/quota/connectionRecovery.ts`                                                                         |
| მორგებული საკვანძო სიტყვების შესრულების დროს ჩატვირთვა | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| პარამეტრების UI                                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
