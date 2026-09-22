# Public Credentials Handling (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **সত্যের প্রামাণ্য উৎস:** `open-sse/utils/publicCreds.ts`
> **পরীক্ষাসমূহ:** `tests/unit/publicCreds.test.ts`
> **সর্বশেষ হালনাগাদ:** 2026-08-07 — v3.8.50
> **লক্ষ্য পাঠক:** যেসব প্রকৌশলী এমন প্রদানকারী ইন্টিগ্রেট করছেন, যারা তাদের পাবলিক CLI-তে পাবলিক OAuth client_id / client_secret / Firebase Web API key সরবরাহ করে।
> **স্থিতি:** আপস্ট্রিম আইডেন্টিফায়ার এম্বেড করে এমন সব নতুন কোডের জন্য **বাধ্যতামূলক**।

## এটি কেন বিদ্যমান

- [নেটিভ অ্যাপের জন্য OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ইনস্টল করা অ্যাপের OAuth client_id / client_secret পাবলিক; প্রকৃত নিরাপত্তা প্রদান করে PKCE।
- [Firebase API key](https://firebase.google.com/docs/projects/api-keys) — Web client identifier নকশাগতভাবেই পাবলিক।

OmniRoute-কে এই মানগুলো এম্বেড করতে হয়, যাতে `.env` কনফিগার না করা ব্যবহারকারীরাও কোনো অতিরিক্ত ব্যবস্থা ছাড়াই কার্যকর OAuth flow পান। এম্বেড করা fallback না থাকলে, "শুধু clone করে চালান" পদ্ধতি অনুসরণকারী যেকোনো ব্যবহারকারীর জন্য Gemini / Antigravity প্রদানকারী কাজ করা বন্ধ করে দেয়।

তবে `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com`-এর মতো লিটারেল মানগুলো **GitHub Secret Scanning**, **Semgrep** এবং অনুরূপ pattern scanner দ্বারা শনাক্ত হয়। প্রতিটি release বিপুলসংখ্যক অপ্রয়োজনীয় false positive তৈরি করে, push protection বৈধ commit ব্লক করে এবং operator-রা alert feed-এর ওপর আস্থা হারান।

`open-sse/utils/publicCreds.ts` helper একই সঙ্গে উভয় সীমাবদ্ধতার সমাধান করে:

- পাবলিক আইডেন্টিফায়ারটিকে একটি **XOR-masked byte sequence** হিসেবে এম্বেড করে (source-এ কোনো scanner pattern থাকে না)।
- runtime-এ `decodePublicCred` / `resolvePublicCred` দিয়ে decode করে।
- ইতিমধ্যেই সুপরিচিত prefix (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) অনুসরণ করা raw মান শনাক্ত করে এবং অপরিবর্তিতভাবে সেগুলো পাঠিয়ে দেয়, ফলে বিদ্যমান `.env`-এ raw মান থাকা ব্যবহারকারীদের জন্য **কোনো migration ছাড়াই** সবকিছু কাজ করতে থাকে।

এটি **obfuscation, encryption নয়।** source পড়ে যে কেউ মানটি পুনরুদ্ধার করতে পারবেন — যা গ্রহণযোগ্য, কারণ মানটি নকশাগতভাবেই পাবলিক। একমাত্র লক্ষ্য হলো scanner regex-এর match এড়ানো।

## বাধ্যতামূলক pattern

### 1. নতুন পাবলিক credential যোগ করা

যখন আপনাকে আপস্ট্রিম থেকে পাওয়া এমন একটি নতুন মান এম্বেড করতে হবে, যা:

- কোনো পাবলিক CLI / desktop app / browser bundle থেকে আসে, **এবং**
- আপস্ট্রিম প্রদানকারী যেটিকে পাবলিক client identifier হিসেবে নথিভুক্ত করে (বা বিবেচনা করে), **এবং**
- অন্যথায় কোনো pattern scanner যেটিকে match করবে (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, ইত্যাদি),

…তখন এই checklist অনুসরণ করুন:

1. masked byte sequence তৈরি করুন:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`-এর `EMBEDDED_DEFAULTS`-এ একটি **নিরপেক্ষ key name** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, ইত্যাদি) দিয়ে নতুন entry যোগ করুন। helper-এ `client_secret` বা `api_key`-এর মতো নাম ব্যবহার করবেন **না** — এই শব্দগুলো Semgrep-এর generic-secret rule সক্রিয় করে।

3. public type union-এ একটি `keyof typeof EMBEDDED_DEFAULTS` যোগ করুন (এটি স্বয়ংক্রিয়ভাবে infer করা হয়)।

4. consumer code-এ hardcoded literal-এর পরিবর্তে ব্যবহার করুন:

   ```ts
   // একটি env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // একাধিক env alias (প্রথম non-empty মানটি ব্যবহৃত হবে)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // কোনো env override নেই (সবসময় embedded default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` থেকে literal-টি সরিয়ে দিন (এর পরিবর্তে পাঠকদের এখানে নির্দেশ করে এমন শুধু-comment documentation দিন):

   ```dotenv
   # ── প্রদানকারী (Google / Firebase / ইত্যাদি) ──
   # পাবলিক OAuth credential কোডের মধ্যে অন্তর্ভুক্ত করা আছে
   # open-sse/utils/publicCreds.ts-এর মাধ্যমে। নিজেরগুলো ব্যবহার করতে শুধু এই vars সেট করুন।
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. নতুন key-এর জন্য একটি shape assertion যোগ করতে `tests/unit/publicCreds.test.ts` হালনাগাদ করুন (literal মান নয়, format যাচাই করুন — pattern-এর জন্য বিদ্যমান test দেখুন)।

7. test file-এ **কখনোই** `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literal যোগ করবেন না। `.join("")` fragment থেকে তৈরি `FAKE_*` constant ব্যবহার করুন (বিদ্যমান test দেখুন)।

### 2. Consumer

- **শুধু `resolvePublicCred()` / `resolvePublicCredMulti()` থেকে পড়ুন** — helper-এর বাইরে কখনোই সরাসরি `decodePublicCredBytes()` call করবেন না।
- helper-টি ইচ্ছাকৃতভাবে কম ব্যয়বহুল (linear byte XOR) এবং module-load-এর সময় call করা নিরাপদ; default-গুলো একবারই গণনা করা হয়।
- env override সবসময় অগ্রাধিকার পায়। কোনো ব্যবহারকারী `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` সেট করলে, helper সেই raw মানটি অপরিবর্তিতভাবে পাঠিয়ে দেয়।

### 3. নিষিদ্ধ pattern

❌ production code-এ (`src/`, `open-sse/`, `electron/`, `bin/`) নিচের কোনোটি **কখনোই** করবেন না:

```ts
// খারাপ: literal মান Secret Scanning + Semgrep সক্রিয় করে
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// খারাপ: literal-এর base64 — Feb/2025 থেকে GitHub এখনও এটি শনাক্ত করে
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// খারাপ: runtime-এ pattern পুনরায় সংযোজন করে এমন string concatenation
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// খারাপ: hex/ROT13 encoding — ভিন্ন obfuscation, শনাক্ত হওয়ার একই ঝুঁকি
clientSecret: hexDecode("474f4353..."),
```

এগুলো সবই শেষ পর্যন্ত কোনো scanner সক্রিয় করে। `resolvePublicCred()` ব্যবহার করুন।

❌ `.env.example`-এ কখনোই literal credential যোগ করবেন না। যেসব ব্যবহারকারীর প্রকৃত আপস্ট্রিম মান প্রয়োজন, তারা নিজেরাই পাবলিক CLI থেকে সেগুলো extract করতে পারেন অথবা নিজেদের OAuth registration ব্যবহার করতে পারেন।

❌ credential-টি এই helper-এ স্থানান্তর করা উচিত কি না, তা প্রথমে পরীক্ষা না করে নতুন কোনো secret-scanning alert কখনোই dismiss করবেন না।

## সংশ্লিষ্ট নিয়ন্ত্রণসমূহ

- `publicCreds.ts`-এর `RAW_VALUE_PATTERN` পাসথ্রু ট্রিগারকারী প্রিফিক্সগুলো তালিকাভুক্ত করে (পশ্চাৎ-সামঞ্জস্যতা)। এটি কেবল নথিভুক্ত পাবলিক ক্রেডেনশিয়াল ফরম্যাটের জন্য প্রসারিত করুন, মালিকানাধীন সিক্রেটের জন্য কখনোই নয়।
- `.env.example` CI-এর `check-env-doc-sync` স্ক্রিপ্টে ব্যবহৃত হয় — এখানে কোনো ভ্যারিয়েবল সরালে ডকুমেন্টেশনের সঙ্গে সামঞ্জস্য নিশ্চিত করুন।
- `npm run test:vitest` এবং `node --import tsx/esm --test tests/unit/publicCreds.test.ts`—উভয় টেস্ট স্যুইটই অবশ্যই সফল থাকতে হবে।

## কখন এই হেল্পার ব্যবহার করবেন না

এই হেল্পারটি **শুধু** এমন ক্রেডেনশিয়ালের জন্য, যেগুলো:

1. আপস্ট্রিম প্রোভাইডার প্রকাশ্যে বিতরণ করে (CLI বাইনারি, ব্রাউজার বান্ডেল, অফিসিয়াল ডকুমেন্টেশন)।
2. গোপনীয় নয় বলে নথিভুক্ত বা দৃঢ়ভাবে ইঙ্গিত করা হয়েছে (PKCE-সুরক্ষিত, Firebase Web key বা অনুরূপ)।

অন্য সবকিছুর জন্য — অপারেটর-ইস্যুকৃত টোকেন, প্রতি-টেন্যান্ট সিক্রেট, আপনার নিজস্ব OAuth অ্যাপের client_secret, এনক্রিপশন কী, JWT সিক্রেট, ডেটাবেস পাসওয়ার্ড — **শুধু env vars** (`process.env.FOO`, খালি মানে `||` ফলব্যাক / স্পষ্ট এরর) ব্যবহার করুন। এগুলো সোর্সে নয়, `.env` এবং [এনক্রিপ্টেড ক্রেডেনশিয়াল স্টোরে](./COMPLIANCE.md) রাখা উচিত।

## তথ্যসূত্র

- [Google: নেটিভ অ্যাপের জন্য OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ক্লায়েন্ট শনাক্তকরণের জন্য API কী](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning-এ সমর্থিত সিক্রেটসমূহ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: টোকেনের জন্য base64 শনাক্তকরণ (ফেব্রুয়ারি 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- এই হেল্পার প্রবর্তনকারী কমিট: `1a39c31f` — _fix(security): পাবলিক আপস্ট্রিম ক্রেডেনশিয়াল মাস্ক করা + এরর স্যানিটাইজেশন কেন্দ্রীভূত করা_
