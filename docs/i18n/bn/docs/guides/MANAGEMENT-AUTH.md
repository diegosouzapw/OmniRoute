# Management Authentication (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-এ **চারটি ক্রেডেনশিয়াল পরিবার** রয়েছে, যেগুলো ম্যানেজমেন্ট রুট অনুমোদন করতে পারে।
এগুলো পরস্পর বিনিময়যোগ্য নয়। ইনফারেন্স API কী (`sk-…`) সার্ভার
পরিচালনা করতে পারে **না**, যদি না সেগুলোকে স্পষ্টভাবে `manage` বা `admin` স্কোপ দেওয়া হয়ে থাকে।

ক্যানোনিক্যাল ইমপ্লিমেন্টেশন: `src/lib/api/requireManagementAuth.ts`।

| ক্রেডেনশিয়াল           | সাধারণ রূপ                             | কোথায় তৈরি হয়                                     | উদ্দিষ্ট ব্যবহার               | ম্যানেজমেন্ট সক্ষমতা                                                                      |
| ----------------------- | -------------------------------------- | --------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| Dashboard JWT সেশন      | `auth_token` কুকি                      | Dashboard লগইন                                      | ব্রাউজার UI                    | CSRF, লোক্যালিটি এবং সর্বদা-সুরক্ষিত-রুটের নিয়ম সাপেক্ষে সম্পূর্ণ dashboard ম্যানেজমেন্ট |
| CLI machine-id টোকেন    | অভ্যন্তরীণ / লোকাল                     | CLI বুটস্ট্র্যাপ (একই মেশিনে `omniroute`)           | লোকাল CLI                      | শুধুমাত্র লোকাল ম্যানেজমেন্ট                                                              |
| স্কোপযুক্ত Access Token | `oma_live_…`                           | **Settings → Access Tokens** বা `omniroute connect` | রিমোট CLI এবং ম্যানেজমেন্ট API | রুটটির প্রয়োজনীয় `read`, `write` বা `admin` স্কোপ অবশ্যই পূরণ করতে হবে                  |
| ইনফারেন্স API কী        | `sk-…` (এবং অন্যান্য API-কী প্রিফিক্স) | **API Manager / API Keys**                          | `/v1/*` ইনফারেন্স              | কীটির মেটাডেটায় `manage` বা `admin` অন্তর্ভুক্ত না থাকলে **কোনোটিই নয়**                 |

`oma_` ক্রেডেনশিয়াল হলো ম্যানেজমেন্ট/CLI ক্রেডেনশিয়াল। এগুলো ইনফারেন্স API কী **নয়**।

সার্ভারের জন্য লগইন/API-কী অথেন্টিকেশন নিষ্ক্রিয় থাকলে, কিছু ম্যানেজমেন্ট রুট
অথেন্টিকেশনবিহীন কল গ্রহণ করতে পারে। শুধুমাত্র-লোকাল এবং সর্বদা-সুরক্ষিত রুটগুলোতে
তবুও নিজস্ব নিয়ম প্রযোজ্য হয়। তাই এসব ক্রেডেনশিয়ালের কোনো একটি উপস্থাপন করা সর্বক্ষেত্রে
বাধ্যতামূলক নয়, এবং প্রয়োজনীয় স্কোপ ও রুট লোক্যালিটি ছাড়া কোনো একটি ক্রেডেনশিয়ালের অধিকারী
হওয়াও সর্বক্ষেত্রে যথেষ্ট নয়।

সম্পর্কিত: [রিমোট মোড](./REMOTE-MODE.md) (রিমোট CLI-এর জন্য কীভাবে `oma_live_…` তৈরি করা হয়)।

---

## স্কোপ ম্যাট্রিক্স

এই দুটি স্কোপ ভোকাবুলারি **আলাদা**। এগুলো মিশিয়ে ফেলবেন না।

### Access Token স্কোপ (`oma_live_…`)

| স্কোপ   | সাধারণ অপারেশন                                                            |
| ------- | ------------------------------------------------------------------------- |
| `read`  | টোকেনটির দেখার অনুমতি রয়েছে এমন তালিকা/স্ট্যাটাস GET                     |
| `write` | অ্যাডমিনের নিচের স্তরের পরিবর্তনমূলক কাজ (তৈরি/আপডেট/মুছে ফেলা)           |
| `admin` | সম্পূর্ণ রিমোট CLI / কানেক্ট টোকেন (পাসওয়ার্ড বুটস্ট্র্যাপে এটিই ডিফল্ট) |

`read`-সহ একটি টোকেন কোনো `write` রুট কল করতে পারে না। রানটাইম মেসেজের বিন্যাস:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-কী ম্যানেজমেন্ট স্কোপ

| স্কোপ         | অর্থ                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| (কোনোটিই নয়) | শুধুমাত্র ইনফারেন্স। ম্যানেজমেন্ট রুট 403 ফেরত দেয়।                   |
| `manage`      | ম্যানেজমেন্ট API (`requireManagementAuth`-এর API-কী ব্রাঞ্চের একই গেট) |
| `admin`       | `hasManageScope`-ও পূরণ করে (ম্যানেজমেন্ট-সক্ষম হিসেবে বিবেচিত)        |

API Keys / API Manager UI-তে কীটির জন্য `manage` সক্রিয় করুন। ইচ্ছাকৃতভাবে সেই স্কোপ
না দিয়ে থাকলে অটোমেশনের জন্য কোনো চ্যাট ক্লায়েন্ট কী পুনরায় ব্যবহার করবেন না।

---

## কীভাবে তৈরি ও প্রত্যাহার করবেন

### Dashboard JWT সেশন

1. `/login` খুলে ম্যানেজমেন্ট পাসওয়ার্ড দিয়ে সাইন ইন করুন (প্রথম বুটে `INITIAL_PASSWORD`)।
2. `auth_token` কুকিটি HttpOnly। ব্রাউজার dashboard এটি স্বয়ংক্রিয়ভাবে ব্যবহার করে।
3. `/api/auth/logout` দিয়ে লগ আউট করুন। কপি করার মতো কোনো দীর্ঘমেয়াদি সিক্রেট নেই।

### CLI machine-id টোকেন

1. সার্ভারের **একই হোস্টে** `omniroute` চালান (লুপব্যাক)।
2. CLI `~/.omniroute/`-এর অধীনে একটি machine-id টোকেন বুটস্ট্র্যাপ করে (chmod 600)।
3. এটি অন্য কোনো মেশিন থেকে কাজ করে **না**। রিমোট CLI-এর জন্য একটি Access Token ব্যবহার করুন।

### স্কোপযুক্ত Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → তৈরি করুন (নাম + স্কোপ)। **সিক্রেটটি শুধু একবার দেখানো হয়।**
2. অথবা CLI: `omniroute connect <host>` (পাসওয়ার্ড → টোকেন)। [রিমোট মোড](./REMOTE-MODE.md) দেখুন।
3. হেডার: `Authorization: Bearer oma_live_…`
4. একই Access Tokens পেজ থেকে প্রত্যাহার করুন (অথবা CLI কনটেক্সট মুছে দিন)।
5. সার্ভার শুধু একটি হ্যাশ সংরক্ষণ করে। প্লেইনটেক্সটটিকে পাসওয়ার্ডের মতো বিবেচনা করুন।

### Manage-স্কোপযুক্ত API কী

1. Dashboard: **API Manager / API Keys** → একটি কী তৈরি বা সম্পাদনা করুন → `manage` (অথবা `admin`) সক্রিয় করুন।
2. হেডার: `Authorization: Bearer sk-…` (কীটির প্রকৃত প্রিফিক্স)।
3. একই UI থেকে কীটি প্রত্যাহার করুন বা `manage` সরিয়ে দিন।
4. CLI নয় এমন অটোমেশনের ক্ষেত্রে ন্যূনতম প্রিভিলেজ বজায় রাখতে: শুধুমাত্র GET জবের জন্য একটি `read` Access Token ব্যবহার করুন; কলারকে `/v1` এবং ম্যানেজমেন্ট উভয়ের সঙ্গেই যোগাযোগ করতে হলে তবেই API কীতে `manage` ব্যবহার করুন।

---

## হেডার ফরম্যাট

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

ব্যবস্থাপনা ক্রেডেনশিয়াল URL পাথ বা কোয়েরি স্ট্রিংয়ে রাখবেন না। ব্যবস্থাপনা
প্রমাণীকরণ কেবল হেডার/কুকির মাধ্যমে করা হয়।

---

## কপি-পেস্ট উদাহরণ

শুধু-পঠন (প্রোভাইডারগুলোর তালিকা দেখুন)। একটি `read` অ্যাক্সেস টোকেন ব্যবহার করুন:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

পরিবর্তনকারী (একটি প্রোভাইডার সংযোগ তৈরি করুন)। `write`/`admin` অ্যাক্সেস টোকেন অথবা
`manage` স্কোপযুক্ত API কী ব্যবহার করুন:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ইনফারেন্স (ব্যবস্থাপনা নয়)। সাধারণ API কী, `manage` প্রয়োজন নেই:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## বর্তমান রানটাইম ত্রুটি (গোপন তথ্য প্রতিধ্বনিত করবেন না)

| পরিস্থিতি                           | সাধারণ স্ট্যাটাস | বার্তা (স্যানিটাইজ করা)                                              |
| ----------------------------------- | ---------------- | -------------------------------------------------------------------- |
| কোনো ক্রেডেনশিয়াল নেই              | 401              | `Authentication required`                                            |
| অবৈধ/মেয়াদোত্তীর্ণ `oma_live_…`    | 401              | `Invalid or expired access token`                                    |
| `manage`/`admin` ছাড়া বৈধ API কী   | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| ব্যবস্থাপনা রুটে অবৈধ সাধারণ API কী | 403              | `Invalid management token`                                           |
| অ্যাক্সেস টোকেনের স্কোপ খুব কম      | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" মানে bearer-টি ব্যবস্থাপনা
ক্রেডেনশিয়াল হিসেবে **গৃহীত হয়নি**। এটি আপনাকে বলে না কোন শ্রেণির ক্রেডেনশিয়াল তৈরি করতে হবে। উপরের টেবিলটি ব্যবহার করুন:
ইনফারেন্স কীগুলোর `manage` স্কোপ প্রয়োজন; রিমোট CLI-এর জন্য `oma_live_…` প্রয়োজন; ড্যাশবোর্ড
সেশন কুকি ব্যবহার করে।

---

## প্রস্তাবিত সর্বনিম্ন-সুবিধার পছন্দ

| কলকারী                                          | ব্যবহার করুন                                   |
| ----------------------------------------------- | ---------------------------------------------- |
| ব্রাউজার                                        | ড্যাশবোর্ড সেশন                                |
| সার্ভার হোস্টে CLI                              | মেশিন টোকেন                                    |
| রিমোট সার্ভারের সঙ্গে যোগাযোগকারী ল্যাপটপের CLI | `omniroute connect` থেকে পাওয়া `oma_live_…`   |
| CI / স্ক্রিপ্ট (শুধু ব্যবস্থাপনা)               | কার্যকর ক্ষুদ্রতম স্কোপসহ `oma_live_…`         |
| যে CI-কে `/v1` এবং `/api` উভয়ই কল করতে হবে     | `manage`-সহ API কী **অথবা** দুটি ক্রেডেনশিয়াল |
