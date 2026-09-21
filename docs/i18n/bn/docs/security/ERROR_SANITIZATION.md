# Error Message Sanitization (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **প্রামাণিক উৎস:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, এবং `open-sse/utils/error.ts`-এর পাবলিক বিল্ডারগুলো
> **পরীক্ষা:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **সর্বশেষ হালনাগাদ:** 2026-09-02 — v3.8.51
> **পাঠক:** ত্রুটি-প্রতিক্রিয়া নিয়ে কাজ করেন এমন যেকোনো প্রকৌশলী (HTTP রুট, SSE স্ট্রিম, এক্সিকিউটর, MCP হ্যান্ডলার)।
> **অবস্থা:** ক্লায়েন্টকে ত্রুটি-বার্তা ফেরত দেয় এমন প্রতিটি কোড পাথের জন্য **বাধ্যতামূলক**।

## এটি কেন রয়েছে

CodeQL নিয়ম `js/stack-trace-exposure` (CWE-209) এমন যেকোনো কোড পাথ চিহ্নিত করে, যেখানে রানটাইম এক্সেপশন থেকে আসা কোনো ত্রুটি-বার্তা স্যানিটাইজ না হয়েই HTTP / SSE প্রতিক্রিয়ায় পৌঁছে যায়। প্রোডাকশন প্রতিক্রিয়ায় স্ট্যাক ট্রেস ও অ্যাবসলিউট ফাইল পাথ আক্রমণকারীদের দেয়:

- অভ্যন্তরীণ ডিরেক্টরি বিন্যাস (`/srv/app/src/lib/...`) → পরবর্তী আক্রমণের জন্য গোয়েন্দা তথ্য সংগ্রহের সুযোগ।
- স্ট্যাক ফ্রেম থেকে অনুমান করা লাইব্রেরি / ফ্রেমওয়ার্ক সংস্করণ → লক্ষ্যভিত্তিক এক্সপ্লয়েট বাছাইয়ের সুযোগ।
- ত্রুটির মধ্যে স্ট্রিং-ইন্টারপোলেট করা হতে পারে এমন সংবেদনশীল রানটাইম মান (DB কোয়েরি, কনফিগারেশন মান)।

`open-sse/utils/error.ts` থেকে এক্সপোর্ট করা `sanitizeErrorMessage` সহায়কটি এই ধরনের
তথ্য ফাঁস অপসারণ করে:

1. ফিজিক্যাল, সিরিয়ালাইজড এবং দ্ব্যর্থহীন ইনলাইন JavaScript স্ট্যাক-ফ্রেম টেইল।
2. অ্যাবসলিউট POSIX, Windows, UNC এবং `file://` ফাইলসিস্টেম পাথ; তবে নিরাপদ HTTPS URL
   এবং স্পষ্টভাবে চিহ্নিত API রুট অক্ষুণ্ণ রাখে।
3. ক্রেডেনশিয়াল অ্যাসাইনমেন্ট, প্রচলিত প্রোভাইডার টোকেন ফরম্যাট, প্রাইভেট-কী PEM ব্লক এবং base64 ডেটা
   URL।

স্যানিটাইজার ইনপুটের দৈর্ঘ্য সীমিত করে এবং কোনো থ্রো করা মানকে স্ট্রিংয়ে রূপান্তর ব্যর্থ হলে নিরাপদভাবে বন্ধ হয়ে যায়।
প্রতিক্রিয়া সিরিয়ালাইজ করার আগে রিকার্সিভ আপস্ট্রিম JSON স্যানিটাইজেশন অনিরাপদ ক্রেডেনশিয়াল/পাথ কী, সেশন অ্যালিয়াস এবং
প্রোটোটাইপ-নিয়ন্ত্রণকারী কীগুলোও বাদ দেয়।

## বাধ্যতামূলক প্যাটার্ন

### 1. ত্রুটি-প্রতিক্রিয়া তৈরি করা (HTTP / API রুট)

`buildErrorBody()` ব্যবহার করুন — স্যানিটাইজেশন এর মধ্যেই অন্তর্ভুক্ত:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... হ্যান্ডলারের লজিক ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

অথবা, একই মডিউলের সুবিধাজনক র্যাপারগুলোর জন্য:

```ts
import {
  errorResponse, // একবারে তৈরি করা Response অবজেক্ট
  writeStreamError, // SSE রাইটার
  createErrorResult, // { success: false, status, response, ... } আকৃতি
  unavailableResponse, // Retry-After যোগ করে
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

এগুলোর সবকটিই ক্যানোনিক্যাল পাবলিক-ত্রুটি সীমা প্রয়োগ করে। `errorResponse`, `writeStreamError` এবং
`createErrorResult`, `buildErrorBody`-এর মধ্য দিয়ে যায়; বিশেষায়িত তিনটি রিট্রাই/সার্কিট সহায়ক
তাদের পাবলিক কনটেক্সট সরাসরি প্রজেক্ট ও স্যানিটাইজ করে। এসব সহায়ক ব্যবহার করলে **আপনাকে কখনোই
`sanitizeErrorMessage` ম্যানুয়ালি কল করতে হবে না**।

### 2. কাস্টম ত্রুটি এনভেলপ (বিরল)

উপরের সহায়কগুলো ব্যবহার করা সম্ভব না হলে (যেমন, প্রতিক্রিয়ার আকৃতি Connect-RPC-এর মতো কোনো আপস্ট্রিম প্রোটোকল দ্বারা নির্ধারিত হলে), সরাসরি `sanitizeErrorMessage` ইমপোর্ট করুন:

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

কাস্টম ত্রুটি বডি তৈরির জন্য এটিই একমাত্র অনুমোদিত উপায়। রেফারেন্স বাস্তবায়নের জন্য `open-sse/executors/cursor.ts::buildErrorResponse` দেখুন।

### 3. লগিং বনাম প্রতিক্রিয়া পাঠানো

বিশ্বস্ত অভ্যন্তরীণ এক্সেপশন তাদের পূর্ণ বার্তা ও স্ট্যাক রাখতে পারে, যাতে অপারেটররা ডিবাগ করতে পারেন। প্রোভাইডার,
ভ্যালিডেশন, ব্রাউজার-সেশন বা ক্রেডেনশিয়াল-সংলগ্ন সীমা থেকে আসা মানগুলোকে কনসোল আউটপুট, অডিট মেটাডেটা
বা স্থায়ী কল লগে প্রবেশের আগেই স্যানিটাইজ করতে হবে। প্যাটার্ন:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // শুধু বিশ্বস্ত অভ্যন্তরীণ এক্সেপশন
  return errorResponse(500, getErrorMessage(err)); // স্যানিটাইজ করা — ক্লায়েন্টকে পাঠানো হয়
}
```

প্রোভাইডার-নিয়ন্ত্রিত ব্যর্থতার ক্ষেত্রে লগ করা মানটিকেও প্রজেক্ট করুন:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. নিষিদ্ধ প্যাটার্ন

❌ **কখনোই** কাঁচা এক্সেপশন আউটপুট কোনো Response বডিতে রাখবেন না:

```ts
// খারাপ: স্ট্যাক ট্রেস + ফাইল পাথ ক্লায়েন্টের কাছে পৌঁছে যায়
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **কখনোই** নিজের মতো করে প্রথম-লাইন স্প্লিটার তৈরি করবেন না:

```ts
// খারাপ: অ্যাবসলিউট পাথ অপসারণ করতে ভুলে যায় এবং ক্যানোনিক্যাল সহায়ক থেকে বিচ্যুত হতে পারে
const safe = String(err).split("\n")[0];
```

❌ **কখনোই** শুধু রুটে স্যানিটাইজ করে SSE পাথ ভুলে যাবেন না। স্ট্রিমে লেখে এমন সবকিছু `writeStreamError` (অথবা এর অন্তর্নিহিত `buildErrorBody`)-এর মধ্য দিয়ে যাবে।

❌ **কখনোই** ইচ্ছাকৃতভাবে `process.cwd()`, `__filename`, `__dirname` বা env থেকে পাওয়া পাথ
ত্রুটি-বার্তায় অন্তর্ভুক্ত করবেন না। গভীর প্রতিরক্ষার অংশ হিসেবে স্যানিটাইজার অ্যাবসলিউট পাথ সামলে নেয়, কিন্তু কলারদের শুরুতেই
টপোলজি প্রকাশ করে এমন বার্তা তৈরি করা উচিত নয়।

## CI-তে কভারেজ

`tests/unit/error-message-sanitization.test.ts` নিম্নলিখিত বিষয়গুলো নিশ্চিত করে:

- `/api/model-combo-mappings/*`-এর অধীনে প্রতিটি রুট 4xx/5xx-এর ক্ষেত্রে স্যানিটাইজ করা বডি ফেরত দেয়।
- `sanitizeErrorMessage` একাধিক লাইনের স্ট্যাক ট্রেস সরিয়ে দেয়।
- `sanitizeErrorMessage` POSIX এবং Windows-এর অ্যাবসোলিউট পাথগুলোকে `<path>` দিয়ে প্রতিস্থাপন করে।
- `sanitizeErrorMessage` নিরাপদভাবে `null`/`undefined`/`Error` ইনস্ট্যান্স ইনপুট পরিচালনা করে।
- `buildErrorBody` কখনোই এর `message` ফিল্ডে স্ট্যাক ট্রেস প্রকাশ করে না।

নতুন কোনো রুট বা এক্সিকিউটর যোগ করার সময়, এই ফাইল থেকে অ্যাসারশন প্যাটার্নটি অনুলিপি করুন। কভারেজ গেট (`npm run test:coverage`) ≥60% স্টেটমেন্ট/লাইন/ফাংশন/ব্রাঞ্চ নিশ্চিত করে — ত্রুটির পাথগুলো অবশ্যই কভার করতে হবে।

## সম্পর্কিত নিয়ন্ত্রণসমূহ

- `.github/security`-এ থাকা `js/stack-trace-exposure` CodeQL অ্যালার্টগুলো সবসময় **হয়** এই হেল্পারগুলোর মাধ্যমে সংশোধন করতে হবে **অথবা** এই ডকুমেন্টের উল্লেখসহ একটি মন্তব্য দিয়ে খারিজ করতে হবে।
- `pino` রিড্যাকশন কনফিগ (`src/shared/utils/logRedaction.ts`) বিশ্বস্ত স্ট্রাকচার্ড লগগুলো
  আলাদাভাবে পরিচালনা করে। এই ডকুমেন্টে পাবলিক রেসপন্স মেসেজ এবং প্রোভাইডার-নিয়ন্ত্রিত সেই মানগুলো অন্তর্ভুক্ত রয়েছে, যেগুলো
  স্থায়ী কল/প্রক্সি-লগ সীমা অতিক্রম করে।
- আপস্ট্রিম-হেডার ডিনাইলিস্ট (`src/shared/constants/upstreamHeaders.ts`) হেডার লিকেজ কভার করে — নতুন কোনো এক্সফিলট্রেশন-সংক্রান্ত বিষয় যোগ করার সময় উভয় ফাইল সামঞ্জস্যপূর্ণ রাখুন।

## আপস্ট্রিম বিবরণ পাসথ্রু

`buildErrorBody` একটি ঐচ্ছিক তৃতীয় আর্গুমেন্ট `upstreamDetails` গ্রহণ করে (আপস্ট্রিম
প্রোভাইডার থেকে পাওয়া কাঁচা পার্স করা বডি)। এটি দেওয়া হলে, রেসপন্সে `upstream_details`
হিসেবে অন্তর্ভুক্ত করার আগে `sanitizeUpstreamDetails` দ্বারা স্যানিটাইজ করা হয়।

একটি ঐচ্ছিক চতুর্থ আর্গুমেন্ট `classification`
(`{ type?: string; code?: string; reason?: string }`) একটি স্পষ্ট পাবলিক শ্রেণিবিন্যাস গ্রহণ করে।
প্রতিটি ফিল্ডকে সীমাবদ্ধ পাবলিক-আইডেন্টিফায়ার ভোকাবুলারিতে প্রজেক্ট করা হয়। অনিরাপদ, ক্রেডেনশিয়াল-সদৃশ,
কন্ট্রোল-ক্যারেক্টারযুক্ত বা অতিরিক্ত দীর্ঘ মানগুলো স্ট্যাটাস থেকে নির্ধারিত type/code-এ ফিরে যায়; অনিরাপদ ঐচ্ছিক
reason বাদ দেওয়া হয়। তিন অঙ্কের HTTP স্ট্যাটাস আইডেন্টিফায়ার (`100` থেকে `599`) সেইসব
প্রোভাইডার কনট্র্যাক্টের জন্য বৈধ থাকে, যেগুলো সংখ্যাসূচক আপস্ট্রিম স্ট্যাটাসকে মেশিন-পাঠযোগ্য কোড হিসেবে প্রকাশ করে। একই
সীমাবদ্ধ রেঞ্জ স্থানীয়ভাবে তৈরি HTTP-স্ট্যাটাস প্লেসহোল্ডার ফর্মেও গ্রহণ করা হয়; নির্বিচার প্রোভাইডার
সংখ্যা ও নাম ভোকাবুলারির বাইরে থাকে।

প্রতিটি স্পষ্ট শ্রেণিবিন্যাস ওই চতুর্থ আর্গুমেন্টে পাস করুন। `buildErrorBody()` রিটার্ন করার পর কখনোই
`body.error.code`, `body.error.type`, বা `body.error.reason` ওভাররাইট করবেন না;
বিল্ডার-পরবর্তী মিউটেশন পাবলিক প্রজেকশনকে বাইপাস করে।

`upstreamDetails`-এ প্রয়োগ করা স্যানিটাইজেশন নিয়মাবলি:

1. স্ট্রিং লিফ: `sanitizeErrorMessage`-এর মধ্য দিয়ে চালান (স্ট্যাক + অ্যাবসোলিউট পাথ সরায়)।
2. অনিরাপদ পাথ, ক্রেডেনশিয়াল, সেশন-অ্যালিয়াস এবং প্রোটোটাইপ-কন্ট্রোল কী সরিয়ে ফেলা হয়।
3. গভীরতার সীমা: 4 স্তরের বেশি নেস্টিংকে `"[truncated]"` স্ট্রিং দিয়ে প্রতিস্থাপন করা হয়।
4. অ্যারে সর্বোচ্চ 32টি এলিমেন্টে সীমাবদ্ধ থাকে।

শুধু যেসব কল সাইটে পার্স করা প্রোভাইডার এরর বডি রয়েছে, সেগুলোতেই `upstreamDetails` পাস করা উচিত। অভ্যন্তরীণ OmniRoute
ত্রুটি (SSE পার্স ব্যর্থতা, খালি কনটেন্ট, গার্ডরেইল ব্লক) এটি অন্তর্ভুক্ত করবে না।

কাঁচা `err.stack`, `err.message`, বা রানটাইম এক্সসেপশন থেকে আসা কোনো স্ট্রিং
`upstreamDetails`-এ পাস করবেন না। সেগুলোকে এখনো কোনো আপস্ট্রিম বডি ছাড়াই
`errorResponse` / `buildErrorBody(code, msg)`-এর মধ্য দিয়ে যেতে হবে।

নির্বাচিত আপস্ট্রিম 4xx পাসথ্রু ক্লায়েন্টের স্বয়ংক্রিয় পুনরুদ্ধারের জন্য প্রয়োজনীয় প্রোভাইডারের নিরাপদ JSON আকৃতি ও ভাষা সংরক্ষণ করে,
তবে এটি বাইট-ফর-বাইট পাসথ্রু নয়: সিরিয়ালাইজেশনের আগে রিকার্সিভ স্যানিটাইজার সবসময়
চালানো হয়। সাইক্লিক, BigInt-যুক্ত, বা ক্ষতিকর `toJSON()` বডিগুলো নিরাপদভাবে ব্যর্থ হয় এবং
পাসথ্রুর জন্য যোগ্য নয়। OCR এবং মডারেশনেও একই নিয়ম প্রযোজ্য; non-JSON, খালি, বা ভুল লেবেলযুক্ত
আপস্ট্রিম বডিগুলোকে ক্যানোনিক্যাল OmniRoute JSON এরর এনভেলপে রূপান্তর করা হয়।

## CodeQL-এর পরিচিত সীমাবদ্ধতা: কাস্টম স্যানিটাইজার শনাক্ত হয় না

CodeQL কোয়েরি [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) স্যানিটাইজার প্যাটার্নের একটি নির্দিষ্ট অনুমোদন-তালিকা ব্যবহার করে (যেমন ইনলাইন `.split("\n")[0]`, নির্দিষ্ট regex আকৃতিসহ `String#replace`, `Error`-এর `.message`-এ অ্যাক্সেস)। এটি আমাদের `sanitizeErrorMessage()`-এর মতো কোনো কাস্টম হেলপারের মাধ্যমে হওয়া পরোক্ষ প্রক্রিয়া শনাক্ত করে **না**।

এর অর্থ হলো, যেসব কলসাইট এই মডিউলের মাধ্যমে নিশ্চিতভাবে স্যানিটাইজ করে — যেমন `open-sse/utils/error.ts::errorResponse` এবং `open-sse/executors/cursor.ts::buildErrorResponse` — সেগুলোর কোড কার্যকরভাবে নিরাপদ হলেও অ্যালার্টটি উঠতে পারে। পূর্ববর্তী ডিসমিসালের নজির: `#224`, `#231` (মে 2026), উভয়টিই কারিগরি যুক্তিসহ `false positive` হিসেবে চিহ্নিত।

**নতুন কোনো ঘটনা কীভাবে পরিচালনা করবেন:**

1. নিশ্চিত করুন যে কলসাইটটি সত্যিই বার্তাটিকে `sanitizeErrorMessage` / `buildErrorBody` / উপরে নথিভুক্ত কোনো একটি র্যাপারের মধ্য দিয়ে পাঠায় (কল চেইনটি শুরু থেকে শেষ পর্যন্ত পড়ুন — কোনো মন্তব্যকে অন্ধভাবে বিশ্বাস করবেন না)।
2. নিশ্চিত করুন যে `tests/unit/error-message-sanitization.test.ts` সংশ্লিষ্ট পথটি পরীক্ষা করে (অথবা কভারেজ যোগ করুন)।
3. এই ডকটি উল্লেখ করে `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`-এর মাধ্যমে অ্যালার্টটি ডিসমিস করুন।
4. সব জায়গায় `.split("\n")[0]` ইনলাইন করে এটি "ঠিক" করবেন **না** — হেলপারটিই সত্যের একক উৎস; স্ক্যানারকে সন্তুষ্ট করার বাহ্যিক প্রচেষ্টায় প্যাটার্নটি নকল করলে স্যানিটাইজার দুর্বল হয় (পাথ স্ক্রাবিং, দৈর্ঘ্যের সীমা ও টাইপ কোয়ার্শন হারায়)।

CodeQL-এর [`@codeql/javascript-models` কাস্টম স্যানিটাইজার কনফিগ](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/)-এর মতো অপ্ট-ইন ফিচার গ্রহণ করাই দীর্ঘমেয়াদি সমাধান; সেটি এই ডকের আওতার বাইরে।

## তথ্যসূত্র

- [CWE-209: ত্রুটি বার্তার মাধ্যমে তথ্য প্রকাশ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ত্রুটি পরিচালনার চিট শিট](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- হেলপারটিকে কেন্দ্রীভূত করার কমিট: `1a39c31f` — _fix(security): পাবলিক আপস্ট্রিম ক্রেডেনশিয়াল মাস্ক করা + ত্রুটি স্যানিটাইজেশন কেন্দ্রীভূত করা_
