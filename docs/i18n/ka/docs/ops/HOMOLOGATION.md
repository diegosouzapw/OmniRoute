# Homologation Suite (`npm run homolog`) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

ჰომოლოგაციის VPS-ზე გაშვებული OmniRoute deploy-ის რეალურ გარემოში E2E ვალიდაცია
(`HOMOLOG_BASE_URL`, მაგ. `http://192.168.0.15:20128`). ერთი ბრძანება release-ის STOP #2 ხელით შესასრულებელ
საკონტროლო სიას ავტომატიზებული, მტკიცებულებების წარმომქმნელი გაშვებით ანაცვლებს.

## რას მოიცავს

| ფენა                      | რას ამოწმებს                                                                                                                                                                                                                                | იმპლემენტაცია                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — ჯანმრთელობა/პარიტეტი | `/api/monitoring/health` პასუხობს `200`-ით, `status: "healthy"`-ითა და მოსალოდნელი ვერსიით                                                                                                                                                  | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — დროებითი გასაღები   | ადმინისტრატორის ავტორიზაცია → `POST /api/keys` გაშვებისთვის ქმნის განსაზღვრული უფლებების მქონე API გასაღებს, რომელიც შედეგის მიუხედავად `finally` ბლოკში უქმდება (`DELETE /api/keys/:id`)                                                   | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API ზედაპირი        | `/v1/models` კატალოგი, რეალური არასტრიმინგული ჩატის დასრულება (ტიერისთვის კრიტიკული მოდელი, `max_tokens: 5`), არასწორი გასაღებისთვის `401` და საჯარო `/api/monitoring/health`                                                               | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE სტრიმინგი       | რეალური სტრიმინგული ჩატის დასრულება; ამოწმებს `text/event-stream`-ს, სულ მცირე ერთ შიგთავსის დელტასა და `[DONE]` ტერმინატორს                                                                                                                | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — რეალური პროვაიდერები | თითო მინიმალური ღირებულების ჩატის მოთხოვნა ცოცხალ `/v1/models` კატალოგში წარმოდგენილი თითოეული კრიტიკული პროვაიდერისთვის, რომელიც promptfoo-ს მეშვეობით დინამიკურად გენერირდება                                                             | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI ავტორიზაცია      | რეალური ავტორიზაციის ფორმით ერთხელ შედის სისტემაში და UI ფენის მასშტაბით სესიას (`storageState`) ხელახლა იყენებს                                                                                                                            | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI მარშრუტები       | `src/app/(dashboard)/dashboard`-ის ქვეშ არსებული ყველა სტატიკური `page.tsx` (ფაილური სისტემიდან აღმოჩენილი; დინამიკური `[param]` მარშრუტები გამოტოვებულია) იტვირთება HTTP შეცდომის, გვერდის შეცდომის ან Next.js-ის შეცდომის საზღვრის გარეშე | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI კრიტიკული ნაკადი | dashboard UI-ის მეშვეობით ქმნის API გასაღებს და კვლავ აუქმებს მას (VPS-ზე ნარჩენს არ ტოვებს)                                                                                                                                                | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — ერთიანი ანგარიში     | აერთიანებს httpYac-ს (`junit-to-ctrf`-ის მეშვეობით), promptfoo→CTRF ადაპტერსა და Playwright CTRF რეპორტერს ერთ `homolog-ctrf.json`-ში, ასევე ქმნის ადამიანისთვის წაკითხვად `homolog-report/summary.md`-ს                                    | `scripts/homolog/run.mjs`                                                     |

თავად განმეორებით გაშვებაში LLM საერთოდ არ მონაწილეობს — ეს არის დეტერმინისტული რეგრესიის ტესტების ნაკრები
და არა eval. AI გამოიყენება მხოლოდ სამომავლო ტექნიკური მოვლის სამუშაოებში (იხილეთ ქვემოთ მოცემული Roadmap).

## წინაპირობები

1. დააკოპირეთ `.env.homolog.example` ფაილი `.env.homolog`-ად (იგნორირებულია git-ის მიერ — არასოდეს დააკომიტოთ) და შეავსეთ:
   - `HOMOLOG_BASE_URL` — სამიზნე განთავსება, მაგ. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — ამ განთავსების მართვის პანელის ადმინისტრირების პაროლი.
   - `HOMOLOG_CRITICAL_PROVIDERS` — მძიმეებით გამოყოფილი პროვაიდერების პრეფიქსები, რომლებზეც
     რეალური smoke-ჩატის მოთხოვნა გაიგზავნება (მაგ. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — ჩვეულებრივი გაშვებისას დატოვეთ ცარიელი; ტესტების ნაკრები თავად ქმნის და აუქმებს
     დროებით გასაღებს. ეს მნიშვნელობა მხოლოდ ერთი შრის იზოლირებულად გასამართად დააყენეთ.
2. გაუშვით `npm install` რეპოზიტორიაში (ტესტების ნაკრების დამოკიდებულებები — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — ჩვეულებრივი devDependencies-ია).
3. გაუშვით `npx playwright install`, თუ ბრაუზერის ბინარული ფაილები ჯერ არ არის დაინსტალირებული.

## როგორ გავუშვათ

```bash
npm run homolog
```

იმ განთავსებაზე შესამოწმებლად, რომლის ვერსიაც ლოკალურ `package.json`-ს არ ემთხვევა
(მაგ. ჰომოლოგაციის გარემოში ჯერ კიდევ წინა პატჩ-რელიზია), მოსალოდნელი
ვერსია ცხადად გადააწერეთ:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

თუ რომელიმე შრე ჩავარდება, გაშვება არანულოვანი კოდით დასრულდება და ყოველთვის შეეცდება მის მიერ შექმნილი დროებითი
API-გასაღების გაუქმებას, წარუმატებლობის შემთხვევაშიც კი (`finally` ბლოკი `scripts/homolog/run.mjs`-ში).

## ანგარიშის წაკითხვა

მთელი გამოტანილი შედეგი ინახება `homolog-report/`-ში (იგნორირებულია git-ის მიერ):

- `summary.md` — იგივე ცხრილი, რომელიც stdout-ში იბეჭდება, თითო სტრიქონი ყოველ შრეზე (✅/❌ + დეტალები).
- `homolog-ctrf.json` — გაერთიანებული CTRF-ანგარიში (API/SSE-ის, პროვაიდერების smoke-ტესტებისა და
  UI-ის შედეგების გაერთიანება) — ეს არის არტეფაქტი, რომელიც რელიზის STOP #2 საკონტროლო სიას უნდა დაურთოთ.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — თითოეული
  შრის დაუმუშავებელი/შუალედური ანგარიშები.
- `promptfooconfig.yaml`, `provider-misses.json` — მიმდინარე გაშვებისთვის გენერირებული promptfoo-ს კონფიგურაცია
  და ყველა კრიტიკული პროვაიდერი, რომელიც მოქმედ კატალოგში არ აღმოჩნდა.

L0-ის ჩავარდნა პროცესს დაუყოვნებლივ წყვეტს (დროებითი გასაღები არ იქმნება), რადგან ვერსიის/მდგომარეობის
შეუსაბამობა ნიშნავს, რომ ყველა შემდგომი შრე არასწორ განთავსებას შეამოწმებდა.

## საბაზისო მდგომარეობის განახლება UI-ის ლეგიტიმური ცვლილებისას

L4b (მარშრუტის smoke-ტესტი) და L4c (API-გასაღების UI-ნაკადი) ეფუძნება რეალურ DOM-ლოკატორებს და არა
snapshot-ებს, ამიტომ UI-ის ლეგიტიმური ცვლილებების უმეტესობა ტესტების ნაკრების განახლებას არ საჭიროებს. როდესაც ცვლილება
ლოკატორს მაინც არღვევს (მაგ. ღილაკის გადარქმეული წარწერა ან პარამეტრების გადატანილი გვერდი):

1. ხელახლა გადაამოწმეთ ლოკატორი მიმდინარე საწყის კოდთან მიმართებით (სპეციფიკაციებში უკვე დოკუმენტირებულია, თუ რომელი
   ფაილის/სტრიქონის მიხედვით დადასტურდა თითოეული ლოკატორი — მიჰყევით იმავე მიდგომას, ნუ გამოიცნობთ).
2. განაახლეთ სპეციფიკაცია `tests/homolog/ui/`-ში.
3. VPS-ის მიმართ ხელახლა გაუშვით `npm run homolog` (ან მხოლოდ შესაბამისი Playwright-ის სპეციფიკაცია),
   რათა შესწორება დაადასტუროთ, შემდეგ კი დააკომიტეთ.

ამ ტესტების ნაკრებს ვიზუალური/პიქსელური საბაზისო მდგომარეობა არ აქვს (F1) — ამის შესახებ იხილეთ სამოქმედო გეგმა.

## სამოქმედო გეგმა (F2 / F3)

დიზაინი და ეტაპობრივი დანერგვა აღწერილია შიდა დაგეგმვის სპეციფიკაციაში
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ბმული არ არის — შიდა
`_tasks/` არტეფაქტია და ამ რეპოზიტორიის ვერსიის კონტროლით მართულ დოკუმენტაციაში არ შედის). შეჯამება:

- **F2** — სრული გავლის ჩაწერა → Playwright Test Agents (`planner`/`generator`)
  მას ნაკადის სპეციფიკაციებად გარდაქმნიან (კომბინაციის შექმნა, პროვაიდერის ტესტირება, პარამეტრების რედაქტირება, MCP-ხელსაწყოები) +
  ვიზუალური რეგრესიის საბაზისო მდგომარეობა (Lost Pixel), დინამიკური მონაცემების (მეტრიკები,
  დროის ნიშნულები, ჟურნალები) დასაფარავი ნიღბებით + `healer` ტექნიკური მოვლის პროცედურა ყოველი რელიზისთვის.
- **F3** — მდგრადობის/კონტრაქტის/ინტეგრაციის დაფარვა: toxiproxy + ყალბი OpenAI-თავსებადი
  პროვაიდერი devbox-ზე, VPS-ზე მისკენ მიმართული `homolog-resilience` კომბინაცია
  (ჩასმული დროის ამოწურვა → fallback-ისა და circuit breaker-ის გახსნა/დახურვის შემოწმება
  `/api/monitoring/health`-ის მეშვეობით); პირობებით შეზღუდული Schemathesis-ის კონტრაქტული ტესტირება
  `docs/openapi.yaml`-ის მიმართ (დაბალი `--max-examples`, ფიქსირებული seed-ები, მხოლოდ არა-LLM endpoint-ები); და
  `npm run homolog`-ისა და მისი `summary.md`-ის ინტეგრირება `/generate-release`-ის STOP #2 ფაზაში.
