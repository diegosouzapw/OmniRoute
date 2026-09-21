# CLI Machine-ID Token (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## সংক্ষিপ্ত বিবরণ

OmniRoute CLI কমান্ডগুলো `x-omniroute-cli-token` রিকোয়েস্ট হেডারের মাধ্যমে পাঠানো
একটি `HMAC-SHA256(machine-id, salt)` টোকেন ব্যবহার করে স্থানীয় ম্যানেজমেন্ট API-তে
প্রমাণীকরণ করে।

এর ফলে CLI সাবকমান্ডগুলো (`omniroute status`, `omniroute providers` ইত্যাদি)
প্রতিবার আহ্বানের সময় ব্যবহারকারীকে JWT বা পাসওয়ার্ড সরবরাহ করতে না বলেই
ম্যানেজমেন্ট এন্ডপয়েন্টগুলো কল করতে পারে।

## এটি যেভাবে কাজ করে

1. `getMachineTokenSync()` `node-machine-id`-এর মাধ্যমে হার্ডওয়্যার মেশিন ID পড়ে
   (ব্যর্থ হলে একটি খালি স্ট্রিংয়ে ফিরে যায়, যা CLI প্রমাণীকরণ নিষ্ক্রিয় করে)।
2. এটি `HMAC-SHA256(machine_id, salt)` গণনা করে এবং সম্পূর্ণ 64-অক্ষরের
   হেক্স ডাইজেস্ট ফেরত দেয়—এটি এই মেশিনের সঙ্গে সংযুক্ত একটি নির্ধারণযোগ্য,
   অপরিবর্তনীয় টোকেন।
3. সমাধানকৃত গন্তব্যটি কেবল একটি সুস্পষ্ট লুপব্যাক URL (`localhost`,
   `127.0.0.0/8`, অথবা লুপব্যাক IPv6) হলেই CLI টোকেনটি
   `x-omniroute-cli-token` হিসেবে পাঠায়। টোকেন বহনকারী রিকোয়েস্টগুলো
   `redirect: error` ব্যবহার করে, ফলে কোনো স্থানীয় রিডাইরেক্ট এটিকে অন্য
   অরিজিনে ফরোয়ার্ড করতে পারে না। রিমোট কনটেক্সটগুলো পরিবর্তে সীমাবদ্ধ-পরিসরের
   অ্যাক্সেস টোকেন ব্যবহার করে। টোকেন তৈরি করা সম্ভব না হলে CLI হেডারটি বাদ দেয়
   এবং একটি খালি টোকেনকে বৈধ হিসেবে বিবেচনা করার পরিবর্তে `omniroute doctor`
   ব্যর্থতাটি রিপোর্ট করে।
4. সার্ভার (`src/server/authz/policies/management.ts`) একই salt দিয়ে প্রত্যাশিত
   টোকেনটি পুনরায় গণনা করে এবং টাইমিং-ভিত্তিক নিষ্কাশন প্রতিরোধ করতে
   `timingSafeEqual`-এর মাধ্যমে তুলনা করে।

## নিরাপত্তা বৈশিষ্ট্য

| বৈশিষ্ট্য                                   | বিস্তারিত                                                                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **শুধু লুপব্যাক**                           | সার্ভারের বিশ্বস্ত পিয়ার-লোক্যালিটি স্ট্যাম্প (প্রকৃত TCP পিয়ার ঠিকানা থেকে উদ্ভূত) লুপব্যাক নির্দেশ করলেই কেবল গ্রহণ করা হয়। লোক্যালিটি নির্ধারণের জন্য ক্লায়েন্ট-নিয়ন্ত্রিত `Host` হেডারকে কখনোই বিশ্বাস করা হয় না। |
| **ধ্রুব-সময়ের তুলনা**                      | `crypto.timingSafeEqual` টাইমিং আক্রমণ প্রতিরোধ করে।                                                                                                                                                                        |
| **অপরিবর্তনীয়**                            | HMAC আউটপুট থেকে machine-id পুনরুদ্ধার করা যায় না।                                                                                                                                                                         |
| **`always`-সুরক্ষিত অংশ এড়ানোর সুযোগ নেই** | CLI টোকেন পরীক্ষা করার আগে `isAlwaysProtectedPath()` মূল্যায়ন করা হয়। `/api/shutdown` এবং `/api/settings/database`-এর জন্য সবসময় JWT আবশ্যক।                                                                             |
| **এক্সপোর্ট-অযোগ্য**                        | টোকেন কখনোই ডিস্কে লেখা বা লগ করা হয় না।                                                                                                                                                                                   |

## ডিফল্ট salt (প্রতিটি ইনস্টলে এলোমেলো)

`OMNIROUTE_CLI_SALT` সেট করা না থাকলে, salt হিসেবে একটি এলোমেলো 64-অক্ষরের হেক্স
স্ট্রিং একবার তৈরি করা হয় এবং `<DATA_DIR>/cli-token-salt.json`-এ (`0600` মোডে)
স্থায়ীভাবে সংরক্ষণ করা হয়—রিপোজিটরিতে অন্তর্ভুক্ত লিটারেল
`omniroute-cli-auth-v1` নয়। `src/lib/machineToken.ts`-এর `getActiveSalt()` এবং
`bin/cli/utils/cliToken.mjs`-এ থাকা এর সমতুল্য বাস্তবায়ন—উভয়ই একই ফাইল পড়ে,
ফলে এই ইনস্টলের সার্ভার এবং CLI-এর প্রতিটি আহ্বান একই মানে একীভূত হয়; কেবল তখনই
রিপোজিটরিতে অন্তর্ভুক্ত লিটারেলটি সর্বশেষ বিকল্প হিসেবে ব্যবহৃত হয়, যখন এখনো
স্থায়ীভাবে সংরক্ষিত বা এনভায়রনমেন্ট salt নির্ধারণ করা সম্ভব হয়নি (উদাহরণস্বরূপ,
সার্ভার কখনো চালানো হয়নি এমন একটি নতুন শুধু-CLI ইনস্টল)। এটি পুরোনো স্থির লিটারেল
ডিফল্টের একটি দুর্বলতা দূর করে: `/etc/machine-id` সাধারণত সবার জন্য পাঠযোগ্য,
তাই অন্যথায় যেকোনো স্থানীয় ব্যবহারকারী `OMNIROUTE_CLI_SALT` কখনো সেট না করা
প্রতিটি ইনস্টলের জন্য একই টোকেন তৈরি করতে পারত।

## সল্ট রোটেশন

কোড পরিবর্তন না করেই ডেরাইভ করা টোকেন রোটেট করতে `OMNIROUTE_CLI_SALT` সেট করুন — এটি
প্রতিটি ইনস্টলেশনের জন্য সংরক্ষিত সল্টের চেয়ে সর্বদা অগ্রাধিকার পায়। রোটেশনের পরে, এই
মেশিনের সব CLI প্রসেস স্বয়ংক্রিয়ভাবে নতুন টোকেন ব্যবহার করবে। প্রসেস তালিকা ফাঁস হয়ে
আগের ডেরাইভ করা মানটি প্রকাশিত হয়ে থাকতে পারে—এমন পরিস্থিতিতে এটি কার্যকর।

```bash
# স্থায়ী রোটেশন (শেল প্রোফাইলে যোগ করুন)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# নতুন টোকেন ব্যবহৃত হচ্ছে কি না যাচাই করুন
omniroute status
```

## লিগ্যাসি ফরম্যাট (SHA-256, 32-অক্ষর) — এখনও গ্রহণযোগ্য

উপরের HMAC ফরম্যাটের আগে, CLI তার টোকেন
`SHA-256(machineId + salt).hex[0..32]` (একটি 32-অক্ষরের প্রিফিক্স) হিসেবে ডেরাইভ করত
`bin/cli/utils/cliToken.mjs`-এ (`src/lib/machineToken.ts`-এ `getLegacyCliTokenSync`)।

পশ্চাৎ-সামঞ্জস্যের জন্য সার্ভারটি **উভয়** ফরম্যাটই গ্রহণ করে: যাচাইকারী
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` তৈরি করে এবং
`timingSafeEqual` ব্যবহার করে প্রতিটির সঙ্গে আগত হেডার তুলনা করে
(`src/server/authz/policies/management.ts` এবং `src/lib/middleware/cliTokenAuth.ts`)।
অতএব, কোনো টোকেন 64-অক্ষরের HMAC ডাইজেস্ট অথবা 32-অক্ষরের লিগ্যাসি SHA-256
প্রিফিক্সের **যেকোনো একটির** সঙ্গে মিলে গেলে সেটি বৈধ।

**অপ্ট-আউট:** CLI টোকেন প্রক্রিয়া সম্পূর্ণরূপে নিষ্ক্রিয় করতে
`OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` বা `.env`-এ) সেট করুন; এরপর সব অ্যাক্সেসের
জন্য একটি স্পষ্ট API কী প্রয়োজন হবে। একাধিক ব্যবহারকারীর হোস্টে এটি সুপারিশ করা হয়,
কারণ `machine-id` প্রতি-ডিভাইসের জন্য নির্ধারিত (প্রতি-ব্যবহারকারীর জন্য নয়), এবং একই
হোস্টের অন্য কোনো ব্যবহারকারী একই টোকেন গণনা করতে পারে।

## ফাইলসমূহ

| ফাইল                                      | উদ্দেশ্য                                  |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | টোকেন ডেরাইভেশন (`getMachineTokenSync`)   |
| `bin/cli/utils/cliToken.mjs`              | একই ডেরাইভেশনের CLI-পক্ষের প্রতিরূপ       |
| `<DATA_DIR>/cli-token-salt.json`          | প্রতি-ইনস্টলেশনের সংরক্ষিত র্যান্ডম সল্ট  |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ধ্রুবক                 |
| `src/server/authz/policies/management.ts` | সার্ভার-পক্ষের যাচাইকরণ                   |
| `src/server/authz/routeGuard.ts`          | লুপব্যাক হোস্ট পরীক্ষা (`isLoopbackHost`) |

## আরও দেখুন

- `docs/security/ROUTE_GUARD_TIERS.md` — রুট সুরক্ষা স্তরসমূহ
- `docs/architecture/AUTHZ_GUIDE.md` — সম্পূর্ণ অনুমোদন পাইপলাইন
