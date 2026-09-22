# Log export (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute কল লগগুলো একটি বাহ্যিক অ্যানালিটিক্স স্টোরে ধারাবাহিকভাবে, ক্রমবর্ধমান পদ্ধতিতে রপ্তানি করা।

Logs ড্যাশবোর্ড ট্যাব অনুরোধের ইতিহাস SQLite-এ (`call_logs`) সংরক্ষণ করে, যা
রোটেশন ও রিটেনশন দ্বারা সীমাবদ্ধ। লগ এক্সপোর্ট একই রেকর্ড সেট একটি সময়সূচি অনুযায়ী বাইরে পাঠায়, যাতে এটি
স্থানীয় ডেটাবেসের চেয়ে দীর্ঘস্থায়ী হতে পারে এবং অন্যান্য ডেটার সঙ্গে যুক্ত করা যায়। BigQuery হলো প্রথম গন্তব্য;
পাইপলাইনটি একটি রেজিস্ট্রি, তাই আরও গন্তব্য সংযোজনমূলকভাবে যোগ করা যায়।

---

## 1. এটি যেভাবে কাজ করে

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ট্যাবের ফিল্ড সেট)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **সময়সূচি** — একটি `JobRegistry` cron জব, `log_export`, যার ডিফল্ট হলো `0 * * * *` (প্রতি ঘণ্টায়,
  UTC)। এটি `src/lib/initCloudSync.ts`-এ নিবন্ধিত; `OMNIROUTE_LOG_EXPORT_CRON` দিয়ে ওভাররাইড করা যায়।
  প্রতিটি টিক সব **সক্রিয়** গন্তব্যকে ক্রমানুসারে সম্পূর্ণভাবে নিষ্কাশন করে।
- **কার্সর** — SQLite-এর অন্তর্নিহিত `call_logs.rowid`, যা প্রতিটি গন্তব্যের জন্য
  `log_export_destinations.cursor_row_id`-এ সংরক্ষিত থাকে। ইচ্ছাকৃতভাবেই `timestamp`-কে কার্সর করা হয়নি: কলকারীরা
  নিজেদের মান সরবরাহ করতে পারেন, ফলে ধীরগতির একটি অনুরোধ পরে শুরু হওয়া দ্রুতগতির একটি অনুরোধের পর লেখা হতে পারে,
  আর timestamp কার্সর সেটি এড়িয়ে যেত।
- **ব্যাচিং** — প্রতি অনুরোধে `batch_size` সারি (ডিফল্ট 500), প্রতি রানে `max_rows_per_run` সারি
  (ডিফল্ট 10000), যাতে বড় কোনো ব্যাকলগ একটি রানকে আটকে না রেখে কয়েকটি টিক ধরে নিষ্কাশিত হয়।
- **ডেলিভারি** — `send()` সফলভাবে সম্পন্ন হওয়ার পরই কার্সর অগ্রসর হয়। কোনো ব্যাচ ব্যর্থ হলে
  কার্সর আগের অবস্থানেই থাকে, তাই পরবর্তী রানে একই সারিগুলো পুনরায় চেষ্টা করা হয়। নিশ্চয়তাটি হলো
  অন্তত-একবার ডেলিভারি এবং গন্তব্য-পক্ষের ডি-ডুপ্লিকেশন, প্রকৃত exactly-once নয়: BigQuery প্রতিটি
  সারিকে call-log আইডি দিয়ে কী করে, যা তার নিজস্ব ডি-ডুপ উইন্ডোর মধ্যে best-effort ভিত্তিতে মানা হয়।
- **ওভারল্যাপ প্রতিরোধক** — cron টিক এবং `POST .../run` একই সময়ে চালু হতে পারে। ইতিমধ্যে নিষ্কাশনরত কোনো গন্তব্যকে
  দ্বিতীয়বার নিষ্কাশন না করে এড়িয়ে যাওয়া হয় (রান ফলাফলে `skipped: true`), ফলে সমসাময়িক কোনো রান একটি ব্যাচ
  পুনরায় পাঠাতে বা কার্সরকে পেছনের দিকে লিখতে পারে না।
- **পার্জ পুনরুদ্ধার** — যদি `cursor_row_id`, `MAX(rowid)`-এর উপরে চলে যায় (পুরো টেবিলটি
  পার্জ করা হয়েছে এবং rowid পুনরায় শুরু হয়েছে), তাহলে রানারটি স্থায়ীভাবে অকার্যকর হয়ে যাওয়ার বদলে 0-তে ফিরে যায়।

### পেলোড (প্রম্পট এবং কমপ্লিশন)

ডিফল্টভাবে এক্সপোর্টে শুধু সেই সারসংক্ষেপ ফিল্ডগুলো থাকে, যেগুলো Logs **তালিকায়** দেখানো হয়। **প্রম্পট এবং প্রতিক্রিয়া রপ্তানি করুন**
(`includeBodies`) চালু করলে প্রতিটি কলের জন্য Logs **বিস্তারিত** পেনে যা দেখানো হয়, তাও অতিরিক্তভাবে পাঠানো হয়:

| ফিল্ড                            | এতে যা থাকে                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | ড্যাশবোর্ড যেভাবে কল পেলোডগুলো রেন্ডার করে                        |
| `pipeline_route_decision`        | রাউটার কোন লক্ষ্য ও মডেল বেছে নিয়েছে                             |
| `pipeline_client_request`        | ক্লায়েন্ট ঠিক যেভাবে পাঠিয়েছে, সেই অপরিবর্তিত অনুরোধ            |
| `pipeline_openai_request`        | অভ্যন্তরীণ OpenAI কাঠামোতে রূপান্তরের পর                          |
| `pipeline_provider_request`      | প্রোভাইডারের ডায়ালেক্টে, আপস্ট্রিমে বাস্তবে যেভাবে পাঠানো হয়েছে |
| `pipeline_provider_response`     | অপরিবর্তিত আপস্ট্রিম প্রতিক্রিয়া                                 |
| `pipeline_client_response`       | কলকারীকে যা ফেরত দেওয়া হয়েছিল                                   |
| `pipeline_error`                 | ব্যর্থ কলের জন্য পাইপলাইন-স্তরের ত্রুটির বিস্তারিত                |
| `bodies_truncated`               | উপরের কোনো ফিল্ড `maxBodyBytes`-এ পৌঁছালে True                    |

এটি প্রম্পটের বিষয়বস্তু, তাই এটি **ডিফল্টভাবে বন্ধ** এবং ইচ্ছাকৃতভাবেই প্রতিটি গন্তব্যের জন্য আলাদা পছন্দ।
যা পাঠানো হয়, তা ড্যাশবোর্ডে দেখানো বিষয়েরই সমান, কারণ উভয়ই `getCallLogById`-এর মাধ্যমে পড়ে: পেলোডগুলো
লেখার সময়ই PII-স্যানিটাইজড এবং গোপন তথ্য-রিড্যাক্টেড থাকে, আর `noLog` API কী দিয়ে করা কোনো কলের
পেলোড একেবারেই সংরক্ষিত হয় না, তাই রপ্তানি করার মতো কিছু থাকে না।

পেলোডগুলো প্রতিটি সারির জন্য ফাইলসিস্টেম আর্টিফ্যাক্ট থেকে পড়া হয়, তাই হাইড্রেশন কেবল সেইসব গন্তব্যের জন্যই চলে
যেগুলো এটি চেয়েছে। কোনো সারির আর্টিফ্যাক্ট অনুপস্থিত বা নষ্ট হলে, ব্যাচটি ব্যর্থ করে কার্সরকে আটকে দেওয়ার বদলে
null পেলোডসহ তার সারসংক্ষেপ রপ্তানি করা হয়।

`maxBodyBytes` (ডিফল্ট 262144) প্রতিটি ফিল্ডের সীমা নির্ধারণ করে। দীর্ঘ পেলোডগুলো বাদ দেওয়ার বদলে **ছেঁটে ফেলা হয়**
— একটি ছেঁটে যাওয়া প্রম্পটও "কী জিজ্ঞাসা করা হয়েছিল" তার উত্তর দেয় — এবং সারিটিকে
`bodies_truncated` দিয়ে চিহ্নিত করা হয়। স্ট্রিম করা খণ্ড-খণ্ড ডেল্টাগুলো রপ্তানি করা হয় না; সংযোজিত প্রতিক্রিয়াটি
ইতিমধ্যেই `pipeline_provider_response` এবং `pipeline_client_response`-এ রয়েছে।

---

## 2. ফাইলসমূহ

| অংশ                  | অবস্থান                                      |
| -------------------- | -------------------------------------------- |
| গন্তব্য কনট্র্যাক্ট  | `src/lib/logExport/types.ts`                 |
| রেজিস্ট্রি           | `src/lib/logExport/registry.ts`              |
| সিক্রেট ব্যবস্থাপনা  | `src/lib/logExport/secrets.ts`               |
| রানার (কার্সর লুপ)   | `src/lib/logExport/runner.ts`                |
| API প্রজেকশন         | `src/lib/logExport/presenter.ts`             |
| BigQuery গন্তব্য     | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA প্রমাণীকরণ | `src/lib/logExport/googleServiceAccount.ts`  |
| কল-লগ উৎস            | `src/lib/usage/callLogExportSource.ts`       |
| পারসিস্টেন্স         | `src/lib/db/logExportDestinations.ts`        |
| Cron জব              | `src/lib/jobs/logExportJob.ts`               |
| REST স্তর            | `src/app/api/log-export/`                    |
| ড্যাশবোর্ড পৃষ্ঠা    | `src/app/(dashboard)/dashboard/log-export/`  |

স্কিমা: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

সব রুট ম্যানেজমেন্ট-প্রমাণীকৃত (`requireManagementAuth`)। সিক্রেট কখনো ফেরত দেওয়া হয় না:
সংরক্ষিত সিক্রেট আক্ষরিক `__stored__` হিসেবে ফেরত আসে এবং আপডেটের সময় সেই মানটি আবার পাঠালে
সংরক্ষিত ক্রেডেনশিয়াল অপরিবর্তিত থাকে।

যে ধরনের গন্তব্যে সিক্রেট ঘোষিত আছে, সেটি তৈরি বা আপডেট করতে **`STORAGE_ENCRYPTION_KEY`
আবশ্যক**। এটি না থাকলে `encrypt()` নীরবে পাসথ্রু করে, তাই কোনো ক্রেডেনশিয়াল SQLite-এ
প্লেইনটেক্সট হিসেবে রাখার বদলে রাইটটি 400 দিয়ে প্রত্যাখ্যান করা হয় (Telegram ওয়েবহুকেও একই
গার্ড প্রয়োগ করা হয়)।

| পদ্ধতি   | পাথ                                      | উদ্দেশ্য                                           |
| -------- | ---------------------------------------- | -------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | গন্তব্যের ধরনসমূহ + তাদের কনফিগ ফিল্ডের তালিকা     |
| `GET`    | `/api/log-export/destinations`           | গন্তব্যগুলোর তালিকা (সিক্রেট রিড্যাক্ট করা)        |
| `POST`   | `/api/log-export/destinations`           | একটি গন্তব্য তৈরি করা                              |
| `GET`    | `/api/log-export/destinations/{id}`      | একটি গন্তব্য পড়া                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | নাম / সক্রিয়তা / কনফিগ / ব্যাচিং আপডেট করা        |
| `DELETE` | `/api/log-export/destinations/{id}`      | মুছে ফেলা                                          |
| `POST`   | `/api/log-export/destinations/{id}/test` | ক্রেডেনশিয়াল যাচাই করা, কিছু না লেখা              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | এখনই নিষ্কাশন করা, নির্ধারিত রানের একই পাথ         |
| `GET`    | `/api/log-export/status`                 | Cron অবস্থা, সাম্প্রতিক রান, লক্ষ্যভিত্তিক ব্যাকলগ |

`GET /api/log-export/types`-এর কারণেই UI সাধারণীকৃত: ফেরত পাওয়া ফিল্ড বর্ণনাকারী থেকে
ড্যাশবোর্ড ফর্ম রেন্ডার করা হয়, তাই নতুন গন্তব্যের জন্য UI পরিবর্তনের প্রয়োজন হয় না।

---

## 4. BigQuery গন্তব্য

কনফিগ কীসমূহ (`type: "bigquery"`):

| কী                   | নোট                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | ডেটাসেট ধারণকারী GCP প্রজেক্ট                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | কেবল ডেটাসেট তৈরি করতে হলে ব্যবহৃত হয় (ডিফল্ট `EU`)                                   |
| `serviceAccountJson` | সার্ভিস-অ্যাকাউন্ট কী। সিক্রেট: সংরক্ষিত অবস্থায় এনক্রিপ্টেড, কখনো ফেরত দেওয়া হয় না |
| `autoCreate`         | প্রথম এক্সপোর্টে ডেটাসেট ও টেবিল তৈরি করা (ডিফল্ট `true`)                              |

সার্ভিস অ্যাকাউন্টটির লক্ষ্য টেবিলে `bigquery.tables.updateData` প্রয়োজন, আর `autoCreate`
চালু থাকলে `bigquery.datasets.create` / `bigquery.tables.create`-ও প্রয়োজন।

কনফিগার করা ব্যাচটি একটি **কার্সর** ইউনিট, HTTP ইউনিট নয়: `send()` এটিকে সর্বোচ্চ 500 সারির
insertAll কলে ভাগ করে, তাই বড় `batch_size` BigQuery-এর 10 MB অনুরোধসীমা অতিক্রম করতে পারে না।
ক্ষণস্থায়ী স্ট্যাটাসগুলো (408/429/500/502/503/504) একই insertIds পুনরায় ব্যবহার করে
এক্সপোনেনশিয়াল ব্যাকঅফসহ সর্বোচ্চ তিনবার পুনঃচেষ্টা করা হয়; অথ ও স্কিমা ব্যর্থতার ক্ষেত্রে
রানটি নষ্ট না করে প্রথম চেষ্টাতেই থ্রো করা হয়।

কয়েক মুহূর্ত আগে তৈরি করা টেবিল স্ট্রিমিং এন্ডপয়েন্টে তখনও দৃশ্যমান হয় না, ফলে সেটি কয়েক
সেকেন্ডের জন্য 404 দেয়। সেই 404-এ পুনঃচেষ্টা করা হয়, তবে **কেবল যখন এই রানটি টেবিল তৈরি
করেছে** — সত্যিই অনুপস্থিত কোনো টেবিলের ক্ষেত্রে দ্রুত ব্যর্থ হয়। মনে রাখবেন, সম্প্রতি মুছে
ফেলা কোনো টেবিলের নামে আবার টেবিল তৈরি করলে BigQuery কয়েক মিনিটের জন্য স্ট্রিমিং ইনসার্ট
প্রত্যাখ্যান করে; এটি মুছে-তারপর-পুনরায়-তৈরি করার বৈশিষ্ট্য, তাই কোনো টেবিল ড্রপ করে পুনরায়
যোগ করার বদলে নতুন টেবিলের নাম ব্যবহার করা শ্রেয়।

**আংশিক ব্যর্থতা HTTP 200 হিসেবে আসে, সঙ্গে থাকে খালি নয় এমন `insertErrors[]`।** এটিকে
ব্যর্থতা হিসেবে গণ্য করে থ্রো করা হয়, যা BigQuery কখনো গ্রহণ করেনি এমন সারিগুলো পেরিয়ে
কার্সরকে এগিয়ে যাওয়া থেকে থামায়; `tests/unit/log-export-bigquery.test.ts` এই আচরণটি
স্থিরভাবে যাচাই করে।

ট্রান্সপোর্টটি সাধারণ REST — একটি স্ব-স্বাক্ষরিত RS256 অ্যাসারশন
`https://oauth2.googleapis.com/token`-এ অ্যাক্সেস টোকেনের জন্য বিনিময় করা হয়, এরপর সারিগুলো
`tabledata.insertAll`-এ যায়। কোনো Google SDK অন্তর্ভুক্ত করা হয় না। প্রতিটি (সার্ভিস অ্যাকাউন্ট,
স্কোপ)-এর জন্য অ্যাক্সেস টোকেন প্রসেসের মধ্যে ক্যাশ করা হয়।

তৈরি করা টেবিলে Logs ট্যাবের প্রতিটি ফিল্ডের জন্য একটি করে কলাম এবং `exported_at` থাকে, এবং
কল লগগুলো বাস্তবে যেভাবে কোয়েরি করা হয় সেই অনুযায়ী এটি বিন্যস্ত:

- **`timestamp` অনুযায়ী দিনভিত্তিক পার্টিশন করা**, ফলে তারিখের সীমা দেওয়া কোয়েরি কেবল সেই
  দিনগুলোই স্ক্যান করে।
- **`api_key_name`, `provider`, `model`, `status` অনুযায়ী ক্লাস্টার করা** (এই ক্রমে), ফলে কে
  এটি চালিয়েছে, কোথায় গেছে, বা এটি ব্যর্থ হয়েছে কি না—এসব দিয়ে ফিল্টার করলে প্রতিটি
  পার্টিশনের ভেতরের ব্লক বাদ দেওয়া যায়। BigQuery সর্বোচ্চ চারটি ক্লাস্টারিং কলাম সমর্থন করে
  এবং ক্রমটি গুরুত্বপূর্ণ: শুধু `api_key_name`-এর ফিল্টার ব্লক বাদ দেয়, কিন্তু শুধু
  `status`-এর ফিল্টার তা করে না।
- **`partitionExpirationDays`-এর মাধ্যমে ঐচ্ছিক পার্টিশন ধারণকাল** (`0` সবকিছু রেখে দেয়),
  যা টেবিল তৈরির সময় প্রয়োগ করা হয়।

উভয় সেটিংই তৈরির সময় প্রযোজ্য হয়। একটি বিদ্যমান টেবিল তার বর্তমান লেআউটই ধরে রাখে, তাই
এগুলো গ্রহণ করতে চাইলে গন্তব্য হিসেবে একটি নতুন table id নির্দিষ্ট করুন।

`tests/unit/log-export-bigquery.test.ts` নিশ্চিত করে যে mapper এবং table schema একই সঙ্গে
সামঞ্জস্যপূর্ণ থাকে, ফলে একটি নতুন call-log column রপ্তানির পথে নীরবে বাদ পড়তে পারে না।

ব্যাচগুলো **উভয়** row count এবং serialised bytes অনুযায়ী chunk করা হয়। payload রপ্তানি করা হলে
শুধু row count যথেষ্ট নয়: prompt বহনকারী 500টি row-এর আকার কয়েক দশ megabyte হতে পারে, এবং insertAll
10 MB-এর বেশি আকারের request প্রত্যাখ্যান করে। 500টি row বা 9 MB—যেটি আগে পূর্ণ হয়, সেখানেই chunk বন্ধ হয়।

---

## ৫. একটি গন্তব্য যোগ করা

1. `src/lib/logExport/destinations/<name>.ts` তৈরি করুন, যা একটি `LogExportDestinationType` এক্সপোর্ট করবে:
   একটি Zod `configSchema`, UI-এর জন্য একটি `fields` ডিসক্রিপ্টর অ্যারে, `secretFields`, এবং একটি
   `createClient(config)`, যা `test()` / `prepare()` / `send(records)` রিটার্ন করে।
2. এটিকে `src/lib/logExport/registry.ts`-এর `DESTINATIONS` অ্যারেতে যোগ করুন।
3. `tests/unit/`-এর অধীনে টেস্ট লিখুন।

এটিই সম্পূর্ণ পরিবর্তন: পারসিস্টেন্স, cron জব, REST লেয়ার, সিক্রেট এনক্রিপশন এবং
ড্যাশবোর্ড ফর্ম—সবই রেজিস্ট্রি থেকে তথ্য পড়ে।

নতুন গন্তব্যের জন্য দুটি নিয়ম:

- আংশিক ব্যর্থতায় `send()`-কে **অবশ্যই এরর থ্রো করতে হবে**। সফলভাবে রিজলভ হওয়ার অর্থ হলো, "গন্তব্যটিতে এই সারিগুলো রয়েছে",
  এবং কার্সর স্থায়ীভাবে সেগুলো অতিক্রম করে এগিয়ে যায়।
- ব্যবহারকারীর দেওয়া URL গ্রহণ করে এমন গন্তব্যকে fetch করার আগে অবশ্যই
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`)-এর মাধ্যমে সেটি যাচাই করতে হবে,
  ঠিক যেভাবে webhooks করে। BigQuery-এর ক্ষেত্রে এটি প্রয়োজন নেই: এর হোস্টগুলো ধ্রুবক।

---

## ৬. এটি পরিচালনা করা

- **ড্যাশবোর্ড**: Integrations → Log export। একটি গন্তব্য যোগ করুন, কোনো সারি না লিখেই ক্রেডেনশিয়াল যাচাই করতে **Test** চালান,
  তারপর সেটি সক্রিয় করুন।
- **ব্যাকলগ**: প্রতিটি গন্তব্য কার্ডে অপেক্ষমাণ সারি এবং কার্সর দেখানো হয়; `GET
/api/log-export/status` একই পরিসংখ্যানের পাশাপাশি সর্বশেষ ২০টি জব রান রিটার্ন করে।
- **একটি গন্তব্য ব্যর্থ হলেও অন্যগুলো ব্যর্থ হয় না** — রান সারাংশে প্রতি গন্তব্যের
  স্ট্যাটাস `last_status` / `last_error`-এ রেকর্ড করা হয়, এবং জব রান ইতিহাসে সামগ্রিক ফলাফল সংরক্ষিত থাকে।
- **কোনো গন্তব্য মুছে ফেললে তার কার্সরও মুছে যায়।** সেটি পুনরায় যোগ করলে সবচেয়ে পুরোনো সংরক্ষিত
  কল লগ থেকে শুরু হয়, ফলে গন্তব্যে ইতোমধ্যে থাকা সারিগুলো আবার পাঠানো হতে পারে। BigQuery-এ প্রতি সারির
  `insertId` শুধু BigQuery-এর নিজস্ব ডি-ডুপ্লিকেশন উইন্ডোর মধ্যেই এটি সামাল দেয়, তাই কোনো গন্তব্য
  মুছে ফেলার পরিবর্তে সেটি নিষ্ক্রিয় রাখাই শ্রেয়।
