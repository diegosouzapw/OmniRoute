# Monitoring & Costs — Navigation Structure (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Group B-তে (plan 16) বাস্তবায়িত হয়েছে। `src/shared/constants/sidebarVisibility.ts` দেখুন।

---

## উচ্চ-স্তরের নেভিগেশন

Group B-এর পর ড্যাশবোর্ড সাইডবারে নিম্নলিখিত শীর্ষ-স্তরের বিভাগগুলো এই ক্রমে রয়েছে:

```
হোম
প্রোভাইডার
কম্বো
API কী
সেটিংস
অ্যানালিটিক্স
খরচ          ← নতুন (Group B, plan 16)
মনিটরিং       ← পুনর্বিন্যস্ত (Group B, plan 16)
...
```

---

## খরচ বিভাগ (নতুন, স্তর 1)

পাথ প্রিফিক্স: `/dashboard/costs/`

| আইটেম              | URL                                  | বিবরণ                                                  |
| ------------------ | ------------------------------------ | ------------------------------------------------------ |
| ওভারভিউ            | `/dashboard/costs`                   | সমন্বিত খরচের ড্যাশবোর্ড (Analytics থেকে সরানো হয়েছে) |
| মূল্য নির্ধারণ     | `/dashboard/costs/pricing`           | মডেলভিত্তিক মূল্যতালিকা                                |
| বাজেট              | `/dashboard/costs/budget`            | বাজেটের সীমা + সতর্কতা                                 |
| কোটা শেয়ারিং      | `/dashboard/costs/quota-share`       | Quota Share পুল + ব্যবহার                              |
| প্ল্যান কনফিগারেশন | `/dashboard/costs/quota-share/plans` | প্রোভাইডারভিত্তিক প্ল্যান ওভাররাইড                     |

**যুক্তি**: মূল্য নির্ধারণ, বাজেট এবং কোটা শেয়ারিং আগে
`Monitoring > Costs Parameters`-এর অধীনে ছিল। এগুলোকে একটি স্বতন্ত্র শীর্ষ-স্তরের বিভাগে
স্থানান্তর করায় অবজার্ভেবিলিটি টুলিংয়ের মধ্য দিয়ে নেভিগেট না করেই সহজে খুঁজে পাওয়া যায়।

---

## মনিটরিং বিভাগ (পুনর্বিন্যস্ত)

মনিটরিং বিভাগে এখন **সবার ওপরে অ্যাক্টিভিটি**, এরপর **3টি উপগ্রুপ** রয়েছে:

```
মনিটরিং
├── অ্যাক্টিভিটি             ← টাইমলাইন ফিড (শীর্ষ-স্তরের আইটেম)
├── লগ গ্রুপ
│   ├── লগ (সব)
│   ├── প্রক্সি লগ
│   └── কনসোল লগ
├── অডিট গ্রুপ
│   ├── অডিট লগ
│   ├── MCP অডিট
│   └── A2A অডিট
└── সিস্টেম গ্রুপ
    ├── স্বাস্থ্য
    └── রানটাইম
```

### পুরোনো কাঠামো থেকে কী পরিবর্তিত হয়েছে

| আগে                                                                                | পরে                                                  |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| অ্যাক্টিভিটি = Logs-এর ভেতরের একটি ট্যাব, যা Audit Log রেন্ডার করত                 | অ্যাক্টিভিটি = স্বতন্ত্র ফিড (`/dashboard/activity`) |
| Monitoring-এর মধ্যে Costs Parameters গ্রুপ                                         | Costs বিভাগে স্থানান্তর করা হয়েছে                   |
| সমতল তালিকা: Logs, Activity (logs), Audit, Health, Runtime, Pricing, Budget, Quota | কাঠামোবদ্ধ 3টি গ্রুপ + স্বতন্ত্র Costs বিভাগ         |

---

## অ্যাক্টিভিটি বনাম অডিট লগ

এ দুটি এখন পৃথক:

| মাত্রা               | অ্যাক্টিভিটি (`/dashboard/activity`)                        | অডিট লগ (`/dashboard/audit`)                         |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **উদ্দেশ্য**         | ব্যবহারকারীমুখী ইভেন্ট ফিড ("সম্প্রতি কী ঘটেছে")            | কমপ্লায়েন্স / নিরাপত্তা লগ                          |
| **ডেটা উৎস**         | `GET /api/compliance/audit-log?level=high`                  | `GET /api/compliance/audit-log?level=all`            |
| **ফরম্যাট**          | টাইমলাইন, দিন অনুযায়ী গ্রুপ করা, সহজবোধ্য ক্রিয়াপদ + আইকন | ঘন বিন্যাসের পৃষ্ঠাবিভক্ত টেবিল, প্রতি পৃষ্ঠায় 50টি |
| **ফিল্টার**          | ইভেন্টের ধরনের ক্যাটাগরি                                    | অ্যাকশন, তীব্রতা, অ্যাক্টর, তারিখের পরিসর            |
| **এক্সপোর্ট**        | উপলভ্য নয়                                                  | JSON এক্সপোর্ট                                       |
| **অ্যাক্টর ফিল্টার** | প্রযোজ্য নয়                                                | অ্যাক্টর অনুযায়ী ফিল্টার করা যায়                   |
| **প্রদর্শিত ইভেন্ট** | শুধু উচ্চ-স্তরের অ্যাকশন (অ্যালাওলিস্ট)                     | সব অডিট ইভেন্ট                                       |

### উচ্চ-স্তরের অ্যাকশন অ্যালাওলিস্ট

`src/lib/audit/highLevelActions.ts`-এ সংজ্ঞায়িত। অ্যাক্টিভিটি ফিডে কোন ইভেন্টগুলো
দেখানো হবে, এটি তা নিয়ন্ত্রণ করে। অ্যালাওলিস্টে রয়েছে:

- প্রোভাইডার যোগ/অপসারণ/পরীক্ষার ইভেন্ট
- কম্বো তৈরি/আপডেট/মুছে ফেলা
- API কী-এর লাইফসাইকেল (তৈরি, প্রত্যাহার, রোটেট)
- বাজেটের সীমায় পৌঁছানো
- অথেন্টিকেশন লগইন/লগআউট
- ক্লাউড এজেন্ট সেশন তৈরি
- MCP টুল নিবন্ধন
- ওয়েবহুক তৈরি/মুছে ফেলা
- কোটা পুল/প্ল্যানের পরিবর্তন (`quota.*` অ্যাকশন, Group B)
- প্ল্যাটফর্ম ইভেন্ট (আপডেট, ডিপ্লয়)
- স্কিল ইনস্টল/অপসারণ

এই তালিকায় না থাকা ইভেন্টগুলো কেবল Audit Log-এ দেখা যায়।

### নতুন উচ্চ-স্তরের অ্যাকশন যোগ করা

`src/lib/audit/highLevelActions.ts` সম্পাদনা করুন এবং অ্যাকশন স্ট্রিংটি
`HIGH_LEVEL_ACTIONS`-এ যোগ করুন। এর জন্য একটি PR প্রয়োজন (তালিকাটি কোডে রয়েছে, DB-এর মাধ্যমে কনফিগারযোগ্য নয়)।
সংশ্লিষ্ট আইকনটি `src/lib/audit/activityIcons.ts`-এ যোগ করা যেতে পারে।

---

## রিডাইরেক্ট: `/dashboard/logs/activity`

পুরোনো পাথ `/dashboard/logs/activity`-কে
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`-এ থাকা `permanentRedirect()`-এর মাধ্যমে
স্থায়ীভাবে (HTTP 308) `/dashboard/activity`-এ রিডাইরেক্ট করা হয়।

পুরোনো ID উল্লেখ করা ব্যবহারকারীর প্রিসেটগুলো যাতে
ভেঙে না যায়, সে জন্য লিগ্যাসি সাইডবার ID `logs-activity`-কে `HIDEABLE_SIDEBAR_ITEM_IDS`-এ
সংরক্ষণ করা হয়েছে (তবে `SIDEBAR_DEFINITIONS` থেকে সরানো হয়েছে)।

---

## i18n

Group B-এর মাধ্যমে যোগ করা নেমস্পেসগুলো:

| নেমস্পেস কী             | যা অন্তর্ভুক্ত করে                                                     |
| ----------------------- | ---------------------------------------------------------------------- |
| `sidebar.costsSection`  | Costs বিভাগের লেবেল                                                    |
| `sidebar.activity`      | Activity সাইডবার আইটেম                                                 |
| `sidebar.logsGroup`     | Logs উপগ্রুপের লেবেল                                                   |
| `sidebar.systemGroup`   | System উপগ্রুপের লেবেল                                                 |
| `sidebar.costsOverview` | Costs ওভারভিউ আইটেম                                                    |
| `activity.*`            | Activity পৃষ্ঠার সব স্ট্রিং (শিরোনাম, ক্রিয়াপদ, ফিল্টার, খালি অবস্থা) |

সত্যের উৎস হিসেবে ব্যবহৃত লোকেল: `pt-BR` এবং `en`। অন্য সব 40টি লোকেল
`next-intl` ফলব্যাক ব্যবস্থার মাধ্যমে ইংরেজিতে ফলব্যাক করে (`src/i18n/config.ts`-এ কনফিগার করা হয়েছে)।
