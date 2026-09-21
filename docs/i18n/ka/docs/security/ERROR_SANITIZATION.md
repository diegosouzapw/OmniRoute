# Error Message Sanitization (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **სიმართლის წყარო:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` და საჯარო შემქმნელები ფაილში `open-sse/utils/error.ts`
> **ტესტები:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **ბოლო განახლება:** 2026-09-02 — v3.8.51
> **აუდიტორია:** ყველა ინჟინერი, რომელიც შეცდომის პასუხებთან მუშაობს (HTTP მარშრუტები, SSE ნაკადები, შემსრულებლები, MCP დამმუშავებლები).
> **სტატუსი:** **სავალდებულოა** კოდის ყველა გზისთვის, რომელიც კლიენტს შეცდომის შეტყობინებას უბრუნებს.

## რატომ არსებობს ეს

CodeQL-ის წესი `js/stack-trace-exposure` (CWE-209) მონიშნავს კოდის ნებისმიერ გზას, სადაც შესრულების გარემოს გამონაკლისიდან წარმოშობილი შეცდომის შეტყობინება სანიტიზაციის გარეშე აღწევს HTTP / SSE პასუხამდე. წარმოების გარემოს პასუხებში სტეკის ტრასები და აბსოლუტური ფაილური გზები თავდამსხმელებს აძლევს:

- შიდა დირექტორიების სტრუქტურას (`/srv/app/src/lib/...`) → დამატებითი თავდასხმებისთვის ინფორმაციის შეგროვების შესაძლებლობას.
- სტეკის ფრეიმებიდან ბიბლიოთეკის / ფრეიმვორკის ვერსიების განსაზღვრის შესაძლებლობას → კონკრეტული სისუსტეების ექსპლუატაციის შერჩევისთვის.
- შესრულების გარემოს სენსიტიურ მნიშვნელობებს, რომლებიც შესაძლოა სტრიქონული ინტერპოლაციით შეცდომებში მოხვდეს (DB მოთხოვნები, კონფიგურაციის მნიშვნელობები).

`open-sse/utils/error.ts`-ის მიერ ექსპორტირებული `sanitizeErrorMessage` დამხმარე ფუნქცია შლის ასეთი ტიპის
ინფორმაციის გაჟონვას:

1. ფიზიკურ, სერიალიზებულ და ცალსახად სტრიქონშივე ჩასმულ JavaScript სტეკის ფრეიმების დაბოლოებებს.
2. აბსოლუტურ POSIX, Windows, UNC და `file://` ფაილური სისტემის გზებს, უსაფრთხო HTTPS URL-ებისა
   და აშკარად მონიშნული API მარშრუტების შენარჩუნებით.
3. ავტორიზაციის მონაცემების მინიჭებებს, პროვაიდერების ტოკენების გავრცელებულ ფორმატებს, პირადი გასაღების PEM ბლოკებსა და base64 მონაცემების
   URL-ებს.

სანიტიზატორი ზღუდავს შეყვანის სიგრძეს და უსაფრთხოების პრინციპით ბლოკავს მნიშვნელობას, როდესაც გადასროლილი მნიშვნელობის სტრიქონად გარდაქმნა უარყოფილია.
ზედა დონის JSON-ის რეკურსიული სანიტიზაცია ასევე შლის ავტორიზაციის მონაცემების/გზების სახიფათო გასაღებებს, სესიის ფსევდონიმებსა და
პროტოტიპის მართვის გასაღებებს პასუხის სერიალიზაციამდე.

## სავალდებულო ნიმუში

### 1. შეცდომის პასუხის შექმნა (HTTP / API მარშრუტები)

გამოიყენეთ `buildErrorBody()` — სანიტიზაცია ჩაშენებულია:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... დამმუშავებლის ლოგიკა ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

ან იმავე მოდულში არსებული მოსახერხებელი გარსები:

```ts
import {
  errorResponse, // ერთჯერადი Response ობიექტი
  writeStreamError, // SSE ჩამწერი
  createErrorResult, // { success: false, status, response, ... } სტრუქტურა
  unavailableResponse, // ამატებს Retry-After-ს
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ყველა მათგანი იყენებს საჯარო შეცდომების კანონიკურ საზღვარს. `errorResponse`, `writeStreamError` და
`createErrorResult` გადის `buildErrorBody`-ზე; სამი სპეციალიზებული ხელახალი ცდის/წრედის დამხმარე
თავის საჯარო კონტექსტს პირდაპირ პროეცირებს და ასანიტიზებს. ამ დამხმარეების გამოყენებისას **`sanitizeErrorMessage`-ის
ხელით გამოძახება არასოდეს გჭირდებათ**.

### 2. შეცდომის მორგებული გარსები (იშვიათად)

როდესაც ზემოთ მოცემული დამხმარეების გამოყენება შეუძლებელია (მაგ., პასუხის სტრუქტურას განსაზღვრავს ზედა დონის პროტოკოლი, როგორიცაა Connect-RPC), პირდაპირ შემოიტანეთ `sanitizeErrorMessage`:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

ეს არის მორგებული შეცდომის სხეულის აწყობის ერთადერთი ნებადართული გზა. საცნობარო იმპლემენტაციისთვის იხილეთ `open-sse/executors/cursor.ts::buildErrorResponse`.

### 3. ჟურნალში ჩაწერა და პასუხის დაბრუნება

სანდო შიდა გამონაკლისებმა შეიძლება შეინარჩუნონ სრული შეტყობინება და სტეკი, რათა ოპერატორებმა შეძლონ გამართვა. მნიშვნელობები,
რომლებიც პროვაიდერის, ვალიდაციის, ბრაუზერის სესიის ან ავტორიზაციის მონაცემებთან დაკავშირებული საზღვრებიდან წარმოიშობა,
უნდა გასანიტიზდეს კონსოლის გამოტანაში, აუდიტის მეტამონაცემებში ან გამოძახებების მუდმივ ჟურნალებში მოხვედრამდე. ნიმუში:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // მხოლოდ სანდო შიდა გამონაკლისი
  return errorResponse(500, getErrorMessage(err)); // გასანიტიზებული — ეგზავნება კლიენტს
}
```

პროვაიდერის მიერ კონტროლირებადი წარუმატებლობებისთვის ჟურნალში ჩასაწერი მნიშვნელობაც პროეცირეთ:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. აკრძალული ნიმუშები

❌ **არასოდეს** მოათავსოთ გამონაკლისის დაუმუშავებელი შედეგი Response-ის სხეულში:

```ts
// ცუდია: სტეკის ტრასა და ფაილური გზები კლიენტამდე აღწევს
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **არასოდეს** შექმნათ პირველი ხაზის საკუთარი გამყოფი:

```ts
// ცუდია: არ შლის აბსოლუტურ გზებს და შეიძლება კანონიკურ დამხმარეს აცდეს
const safe = String(err).split("\n")[0];
```

❌ **არასოდეს** ჩაატაროთ სანიტიზაცია მხოლოდ მარშრუტში და არ დაგავიწყდეთ SSE გზა. ყველაფერი, რაც ნაკადში წერს, უნდა გავიდეს `writeStreamError`-ზე (ან მის საფუძვლად გამოყენებულ `buildErrorBody`-ზე).

❌ **არასოდეს** შეიტანოთ განზრახ `process.cwd()`, `__filename`, `__dirname` ან გარემოს ცვლადებიდან მიღებული გზები
შეცდომის შეტყობინებებში. მრავალშრიანი დაცვისთვის სანიტიზატორი აბსოლუტურ გზებსაც ამუშავებს, თუმცა გამომძახებლებმა
თავიდანვე არ უნდა შექმნან სისტემის ტოპოლოგიის შემცველი შეტყობინებები.

## დაფარვა CI-ში

`tests/unit/error-message-sanitization.test.ts` უზრუნველყოფს შემდეგს:

- `/api/model-combo-mappings/*`-ის ქვეშ არსებული ყველა მარშრუტი 4xx/5xx პასუხებისთვის სანიტიზებულ სხეულებს აბრუნებს.
- `sanitizeErrorMessage` შლის მრავალსტრიქონიან სტეკ-ტრეისებს.
- `sanitizeErrorMessage` POSIX-ისა და Windows-ის აბსოლუტურ ბილიკებს `<path>`-ით ანაცვლებს.
- `sanitizeErrorMessage` უსაფრთხოდ ამუშავებს `null`/`undefined`/`Error` ეგზემპლარის ტიპის შეყვანებს.
- `buildErrorBody` თავის `message` ველში არასოდეს ამჟღავნებს სტეკ-ტრეისებს.

ახალი მარშრუტის ან შემსრულებლის დამატებისას ამ ფაილიდან გადაიღეთ შემოწმების შაბლონი. დაფარვის ზღვარი (`npm run test:coverage`) მოითხოვს დებულებების/სტრიქონების/ფუნქციების/განშტოებების ≥60%-იან დაფარვას — შეცდომის გზებიც უნდა იყოს დაფარული.

## დაკავშირებული კონტროლის მექანიზმები

- `.github/security`-ში არსებული `js/stack-trace-exposure` CodeQL გაფრთხილებები ყოველთვის უნდა იყოს **ან** ამ დამხმარე ფუნქციებით გამოსწორებული, **ან** გაუქმებული ამ დოკუმენტზე მიმთითებელი კომენტარით.
- `pino`-ს რედაქტირების კონფიგურაცია (`src/shared/utils/logRedaction.ts`) სანდო სტრუქტურირებულ ჟურნალებს
  ცალკე ამუშავებს. ეს დოკუმენტი მოიცავს საჯარო პასუხების შეტყობინებებსა და პროვაიდერის მიერ კონტროლირებულ მნიშვნელობებს, რომლებიც
  მუდმივი გამოძახების/პროქსი-ჟურნალირების საზღვრებს კვეთს.
- ზედა დონის სათაურების აკრძალვის სია (`src/shared/constants/upstreamHeaders.ts`) სათაურების გაჟონვას ფარავს — ექსფილტრაციასთან დაკავშირებული ახალი საფრთხის დამატებისას ორივე ფაილი თანხვედრაში შეინარჩუნეთ.

## ზედა დონის დეტალების უცვლელად გადაცემა

`buildErrorBody` იღებს არასავალდებულო მესამე არგუმენტს `upstreamDetails` (ზედა დონის
პროვაიდერისგან მიღებული დაუმუშავებელი, გარჩეული სხეული). მისი მიწოდებისას, პასუხში
`upstream_details`-ის სახით ჩართვამდე, ის `sanitizeUpstreamDetails`-ით სანიტიზდება.

არასავალდებულო მეოთხე არგუმენტი `classification`
(`{ type?: string; code?: string; reason?: string }`) იღებს მკაფიო საჯარო კლასიფიკაციას.
თითოეული ველი პროეცირდება შეზღუდულ საჯარო იდენტიფიკატორთა ლექსიკონზე. არაუსაფრთხო, ავტორიზაციის მონაცემების მსგავსი,
მართვის სიმბოლოების შემცველი ან ზედმეტად გრძელი მნიშვნელობები ჩანაცვლდება სტატუსიდან წარმოებული ტიპით/კოდით; არაუსაფრთხო არასავალდებულო
მიზეზი კი გამოტოვებული იქნება. HTTP სტატუსის სამნიშნა იდენტიფიკატორები (`100`-დან `599`-მდე) ძალაში რჩება
პროვაიდერის იმ კონტრაქტებისთვის, რომლებიც ზედა დონის ციფრულ სტატუსს მანქანურად წაკითხვადი კოდის სახით წარმოადგენენ. იგივე
შეზღუდული დიაპაზონი მიიღება ადგილობრივად გენერირებული HTTP-სტატუსის ჩამნაცვლებლის ფორმაშიც; პროვაიდერის თვითნებური
რიცხვები და სახელები ლექსიკონის ფარგლებს გარეთ რჩება.

ყველა მკაფიო კლასიფიკაცია სწორედ ამ მეოთხე არგუმენტში გადაეცით. `buildErrorBody()`-ის დაბრუნების შემდეგ არასოდეს გადაწეროთ
`body.error.code`, `body.error.type` ან `body.error.reason`;
შემქმნელის შემდგომი ცვლილება საჯარო პროეცირებას გვერდს უვლის.

`upstreamDetails`-ზე გამოყენებული სანიტიზაციის წესები:

1. სტრიქონული ფოთლები: დამუშავდეს `sanitizeErrorMessage`-ით (შლის სტეკებსა და აბსოლუტურ ბილიკებს).
2. არაუსაფრთხო ბილიკის, ავტორიზაციის მონაცემების, სესიის ფსევდონიმებისა და პროტოტიპის მართვის გასაღებები იშლება.
3. სიღრმის შეზღუდვა: 4 დონეზე ღრმა ჩადგმა ჩანაცვლდება სტრიქონით `"[truncated]"`.
4. მასივები იზღუდება 32 ელემენტამდე.

`upstreamDetails` უნდა გადასცეს მხოლოდ იმ გამოძახების ადგილებმა, რომლებსაც პროვაიდერის გარჩეული შეცდომის სხეული აქვთ. OmniRoute-ის შიდა
შეცდომები (SSE-ის გარჩევის ჩავარდნები, ცარიელი შიგთავსი, დამცავი მექანიზმის ბლოკირებები) მას არ უნდა შეიცავდეს.

`upstreamDetails`-ს ნუ გადასცემთ დაუმუშავებელ `err.stack`-ს, `err.message`-ს ან გაშვების დროის გამონაკლისიდან მიღებულ ნებისმიერ სტრიქონს.
მათი დამუშავება კვლავ `errorResponse` / `buildErrorBody(code, msg)`-ის მეშვეობით,
ზედა დონის სხეულის გარეშე უნდა მოხდეს.

ზედა დონის 4xx პასუხების შერჩევითი უცვლელად გადაცემა ინარჩუნებს პროვაიდერის უსაფრთხო JSON სტრუქტურასა და ფორმულირებას, რომელიც
კლიენტის ავტომატური აღდგენისთვისაა საჭირო, თუმცა ეს ბაიტ-ბაიტზე უცვლელი გადაცემა არ არის: რეკურსიული სანიტაიზერი ყოველთვის ეშვება
სერიალიზაციამდე. ციკლური, BigInt-ის შემცველი ან მტრული `toJSON()` სხეულები უსაფრთხოების პრინციპით უარყოფილია და
უცვლელად გადაცემას არ ექვემდებარება. OCR და მოდერაცია იმავე წესს იყენებს; არა-JSON, ცარიელი ან არასწორად
მარკირებული ზედა დონის სხეულები გარდაიქმნება OmniRoute-ის კანონიკურ JSON შეცდომის კონვერტად.

## CodeQL-ის ცნობილი შეზღუდვა: მორგებული სანიტაიზერები ვერ ამოიცნობა

CodeQL-ის მოთხოვნა [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) სანიტაიზერის შაბლონების ფიქსირებულ ნებადართულ სიას იყენებს (მაგ., უშუალოდ ჩასმული `.split("\n")[0]`, `String#replace` კონკრეტული რეგულარული გამოსახულებების ფორმებით, `Error`-ის `.message`-ზე წვდომა). ის **ვერ** ამოიცნობს ირიბ გამოძახებას ისეთი მორგებული დამხმარე ფუნქციის გავლით, როგორიცაა ჩვენი `sanitizeErrorMessage()`.

ეს ნიშნავს, რომ გამოძახების ადგილებმა, რომლებიც ამ მოდულის მეშვეობით აშკარად ასანიტაიზებენ მონაცემებს — მაგალითად, `open-sse/utils/error.ts::errorResponse` და `open-sse/executors/cursor.ts::buildErrorResponse` — შესაძლოა კვლავ გამოიწვიონ გაფრთხილება, მიუხედავად იმისა, რომ კოდი ფუნქციურად უსაფრთხოა. წინა უარყოფის შემთხვევები: `#224`, `#231` (2026 წლის მაისი), ორივე მონიშნულია როგორც `false positive` ტექნიკური დასაბუთებით.

**როგორ დავამუშაოთ ახალი შემთხვევა:**

1. დაადასტურეთ, რომ გამოძახების ადგილი შეტყობინებას ნამდვილად ატარებს `sanitizeErrorMessage` / `buildErrorBody` / ზემოთ დოკუმენტირებული ერთ-ერთი გარსის გავლით (გამოძახებათა ჯაჭვი თავიდან ბოლომდე წაიკითხეთ — კომენტარს ნუ ენდობით).
2. დაადასტურეთ, რომ `tests/unit/error-message-sanitization.test.ts` ამ გზას ამოწმებს (ან დაამატეთ შესაბამისი დაფარვა).
3. უარყავით გაფრთხილება `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`-ის მეშვეობით და მიუთითეთ ეს დოკუმენტი.
4. **არ** „გამოასწოროთ“ ყველგან `.split("\n")[0]`-ის უშუალოდ ჩასმით — ეს დამხმარე ფუნქცია ჭეშმარიტების ერთადერთი წყაროა; შაბლონის დუბლირება სანიტაიზერს ასუსტებს (იკარგება გზების გასუფთავება, სიგრძის ზღვარი და ტიპის გარდაქმნა) მხოლოდ იმისთვის, რომ სკანერი გარეგნულად დაკმაყოფილდეს.

ისეთი თანხმობაზე დაფუძნებული ფუნქციების დანერგვა, როგორიცაა CodeQL-ის [`@codeql/javascript-models` მორგებული სანიტაიზერის კონფიგურაცია](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/), გრძელვადიანი გამოსავალია; ის ამ დოკუმენტის ფარგლებს სცდება.

## წყაროები

- [CWE-209: ინფორმაციის გამჟღავნება შეცდომის შეტყობინების მეშვეობით](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: შეცდომების დამუშავების საცნობარო ფურცელი](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- დამხმარე ფუნქციის ცენტრალიზების კომიტი: `1a39c31f` — _fix(security): საჯარო upstream-ის ავტორიზაციის მონაცემების შენიღბვა + შეცდომების სანიტაიზაციის ცენტრალიზება_
