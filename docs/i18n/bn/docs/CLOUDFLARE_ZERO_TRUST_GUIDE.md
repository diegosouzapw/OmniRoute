# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

এই নির্দেশিকাটি**OmniRoute**কে সুরক্ষিত রাখতে এবং**কোনও পোর্ট (জিরো ইনবাউন্ড)**না খুলেই ইন্টারনেটে আপনার অ্যাপ্লিকেশনটিকে সুরক্ষিতভাবে প্রকাশ করতে নেটওয়ার্ক পরিকাঠামোর সোনার মান নথিভুক্ত করে।## What was done on your VM?

আমরা PM2 এর মাধ্যমে**স্প্লিট-পোর্ট**মোডে OmniRoute সক্ষম করেছি:

-**পোর্ট `20128`:**চলে**শুধুমাত্র API**`/v1`। -**পোর্ট `20129`:**চলে**শুধুমাত্র প্রশাসনিক ড্যাশবোর্ড**।

অধিকন্তু, অভ্যন্তরীণ পরিষেবার জন্য প্রয়োজন `REQUIRE_API_KEY=true`, যার অর্থ ড্যাশবোর্ডের API কী ট্যাবে তৈরি করা বৈধ "বেয়ারার টোকেন" না পাঠিয়ে কোনো এজেন্ট API এন্ডপয়েন্ট ব্যবহার করতে পারবে না।

এটি আমাদের দুটি সম্পূর্ণ স্বাধীন নেটওয়ার্ক নিয়ম তৈরি করতে দেয়। এখানেই**ক্লাউডফ্লেয়ার টানেল (ক্লাউডফ্লেয়ার)**আসে।---

## 1. How to Create the Tunnel in Cloudflare

আপনার মেশিনে ইতিমধ্যেই 'ক্লাউডফ্লারেড' ইউটিলিটি ইনস্টল করা আছে। ক্লাউডে এই পদক্ষেপগুলি অনুসরণ করুন:

1. আপনার**ক্লাউডফ্লেয়ার জিরো ট্রাস্ট**ড্যাশবোর্ড অ্যাক্সেস করুন (one.dash.cloudflare.com)।
2. বাঁদিকের মেনুতে,**নেটওয়ার্কস > টানেল**-এ যান। 3.**একটি টানেল যোগ করুন**-এ ক্লিক করুন,**ক্লাউডফ্লারেড**চয়ন করুন এবং এটির নাম দিন `OmniRoute-VM`।
3. এটি "সংযোগকারী ইনস্টল করুন এবং চালান" নামে স্ক্রিনে একটি কমান্ড তৈরি করবে।**আপনাকে শুধুমাত্র টোকেন কপি করতে হবে (`--টোকেন`-এর পরে দীর্ঘ স্ট্রিং)**।
4. আপনার ভার্চুয়াল মেশিনে (বা প্রক্সমক্স টার্মিনাল) SSH এর মাধ্যমে লগ ইন করুন এবং চালান: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

এখনও সদ্য তৈরি করা টানেল স্ক্রিনে,**পাবলিক হোস্টনাম**ট্যাবে যান এবং**দুটি**রুট যোগ করুন, আমাদের করা বিচ্ছেদের সুবিধা নিয়ে:### Route 1: Secure API (Limited)

-**সাবডোমেন:**`api` -**ডোমেন:**`yourglobal.com` (আপনার আসল ডোমেন বেছে নিন) -**পরিষেবার প্রকার:**`HTTP` -**URL:**`127.0.0.1:20128` _(অভ্যন্তরীণ API পোর্ট)_### Route 2: Zero Trust Dashboard (Closed)

-**সাবডোমেন:**`অমনিরুট` বা `প্যানেল` -**ডোমেন:**`yourglobal.com` -**পরিষেবার প্রকার:**`HTTP` -**URL:**`127.0.0.1:20129` _(অভ্যন্তরীণ অ্যাপ/ভিজ্যুয়াল পোর্ট)_

এই মুহুর্তে, "শারীরিক" সংযোগটি সমাধান করা হয়েছে। এখন এর সত্যই এটি ঢাল যাক.---

## 3. Shielding the Dashboard with Zero Trust (Access)

কোনও স্থানীয় পাসওয়ার্ড আপনার ড্যাশবোর্ডকে খোলা ইন্টারনেট থেকে সম্পূর্ণরূপে অ্যাক্সেস সরিয়ে দেওয়ার চেয়ে ভালভাবে সুরক্ষিত করে না।

1. জিরো ট্রাস্ট ড্যাশবোর্ডে,**অ্যাক্সেস > অ্যাপ্লিকেশন > একটি অ্যাপ্লিকেশন যোগ করুন**এ যান। 2.**স্ব-হোস্টেড**নির্বাচন করুন। 3.**অ্যাপ্লিকেশনের নাম**-এ, `OmniRoute প্যানেল` লিখুন। 4.**অ্যাপ্লিকেশন ডোমেনে**, `omniroute.yourglobal.com` লিখুন (যেটি আপনি "রুট 2" এ ব্যবহার করেছেন)। 5.**পরবর্তী**এ ক্লিক করুন। 6.**নিয়ম ক্রিয়া**-এ, 'অনুমতি দিন' বেছে নিন। নিয়মের নামের জন্য, 'শুধু অ্যাডমিন' লিখুন। 7.**অন্তর্ভুক্ত**-এ, "নির্বাচক" ড্রপডাউনের অধীনে, `ইমেল` চয়ন করুন এবং আপনার ইমেল টাইপ করুন, উদাহরণস্বরূপ `admin@spgeo.com.br`।
2. সংরক্ষণ করুন ('অ্যাপ্লিকেশন যোগ করুন')।

> **এটি কি করেছে:**আপনি যদি `omniroute.yourglobal.com` খোলার চেষ্টা করেন, তাহলে এটি আর আপনার OmniRoute অ্যাপ্লিকেশনে ল্যান্ড করবে না! এটি একটি মার্জিত ক্লাউডফ্লেয়ার স্ক্রিনে অবতরণ করে যা আপনাকে আপনার ইমেল লিখতে বলে৷ শুধুমাত্র যদি আপনি (বা আপনার লেখা ইমেলটি) সেখানে টাইপ করা থাকে, তাহলে আপনি Outlook/Gmail-এ একটি অস্থায়ী 6-সংখ্যার কোড পাবেন যা টানেলটিকে `20129` পোর্টে আনলক করে।---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

জিরো ট্রাস্ট ড্যাশবোর্ড API রুটে (`api.yourglobal.com`) প্রযোজ্য নয়, কারণ এটি একটি ব্রাউজার ছাড়াই স্বয়ংক্রিয় সরঞ্জামের (এজেন্ট) মাধ্যমে একটি প্রোগ্রাম্যাটিক অ্যাক্সেস। এর জন্য, আমরা Cloudflare এর প্রধান ফায়ারওয়াল (WAF) ব্যবহার করব।

1.**সাধারণ ক্লাউডফ্লেয়ার ড্যাশবোর্ড**(dash.cloudflare.com) অ্যাক্সেস করুন এবং আপনার ডোমেনে যান৷ 2. বাম মেনুতে,**নিরাপত্তা > WAF > হার সীমিত করার নিয়মাবলীতে যান। 3.**নিয়ম তৈরি করুন**এ ক্লিক করুন। 4.**নাম:**`OmniRoute API অ্যান্টি-অ্যাবিউজ` 5.**আগত অনুরোধ মিলে গেলে...\*\*

- ক্ষেত্র নির্বাচন করুন: 'হোস্টনাম'
- অপারেটর: 'সমান'
- মান: `api.yourglobal.com` 6.**একই বৈশিষ্ট্যের অধীনে:**`IP` রাখুন।

7. সীমার জন্য (সীমা): -**যখন অনুরোধগুলি অতিক্রম করে:**`50` -**সময়কাল:**`1 মিনিট`
8. শেষে,**Action**-এর অধীনে: `Block` এবং সিদ্ধান্ত নিন যে ব্লকটি 1 মিনিট বা 1 ঘন্টা স্থায়ী হবে। 9.**মোতায়েন**।

> **এটি কী করেছে:**কেউ আপনার API URL-এ 60-সেকেন্ড সময়ের মধ্যে 50টির বেশি অনুরোধ পাঠাতে পারবে না। যেহেতু আপনি একাধিক এজেন্ট চালাচ্ছেন এবং তাদের পিছনে খরচ ইতিমধ্যেই হারের সীমাকে আঘাত করে এবং টোকেনগুলিকে ট্র্যাক করে, এটি ইন্টারনেট এজ লেয়ারে একটি পরিমাপ যা আপনার অন-প্রিমিসেস ইন্সট্যান্সকে তাপীয় চাপের কারণে ট্র্যাফিক টানেলের নিচে যাওয়ার আগে নিচে যাওয়া থেকে রক্ষা করে।---

## Finalization

1. আপনার VM**'/etc/ufw`-এ**কোনো উন্মুক্ত পোর্ট নেই।
2. OmniRoute শুধুমাত্র HTTPS আউটবাউন্ড (`ক্লাউডফ্লারেড`) কথা বলে এবং বিশ্ব থেকে সরাসরি TCP পায় না।
3. OpenAI-তে আপনার অনুরোধগুলি অস্পষ্ট কারণ আমরা বিশ্বব্যাপী সেগুলিকে একটি SOCKS5 প্রক্সির মধ্য দিয়ে যাওয়ার জন্য কনফিগার করেছি (ক্লাউড SOCKS5 সম্পর্কে চিন্তা করে না কারণ এটি অন্তর্মুখী হয়)।
4. আপনার ওয়েব ড্যাশবোর্ডে ইমেলের সাথে 2-ফ্যাক্টর প্রমাণীকরণ রয়েছে।
5. আপনার API ক্লাউডফ্লেয়ার দ্বারা প্রান্তে রেট-সীমিত এবং শুধুমাত্র ট্রাফিক বহনকারী টোকেন।
