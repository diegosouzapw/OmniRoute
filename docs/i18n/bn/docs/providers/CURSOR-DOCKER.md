# Cursor Provider in Docker Environments (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute যখন Docker-এর ভিতরে চলে, তখন লিগ্যাসি **Cursor IDE থেকে ইম্পোর্ট** /
`cursor-agent` প্রবাহ ব্যর্থ হয়, কারণ কনটেইনারটি হোস্টের Cursor
ইনস্টলেশন দেখতে পায় না। এর পরিবর্তে **Cursor দিয়ে লগইন** (deep-control PKCE) ব্যবহার করুন।

## Docker-এ IDE / CLI ইম্পোর্ট কেন ব্যর্থ হয়

1. **ফাইলসিস্টেম আইসোলেশন** — স্বয়ংক্রিয় ইম্পোর্ট কনটেইনারের _ভিতরে_
   `~/.config/Cursor/User/globalStorage/state.vscdb`-এর মতো Linux পাথ খোঁজে।
   macOS-এর Docker Desktop-এ হোস্ট IDE DB ডিফল্টভাবে মাউন্ট করা থাকে না, এবং
   হোস্ট Darwin হলেও কনটেইনার OS হলো Linux।
2. **কোনো `cursor-agent` বাইনারি নেই** — অফিসিয়াল OmniRoute ইমেজে
   `cursor-agent` অন্তর্ভুক্ত থাকে না। আগে উপলভ্য মডেল পেতে
   `cursor-agent --list-models` শেল কমান্ড চালানো হতো এবং ব্যর্থ হলে একটি স্ট্যাটিক ক্যাটালগ ব্যবহার করা হতো।
3. **ভুল বাইনারি** — কোনো macOS `cursor-agent`-কে Linux
   কনটেইনারে bind-mount করবেন **না**। এটি চলবে না।

## প্রস্তাবিত: Cursor দিয়ে লগইন

1. **ড্যাশবোর্ড → প্রোভাইডার → Cursor** খুলুন।
2. **Cursor দিয়ে লগইন** ট্যাবটি বেছে নিন।
3. **Cursor দিয়ে লগইন**-এ ক্লিক করুন — OmniRoute আপনার **হোস্ট** ব্রাউজারে
   `https://cursor.com/loginDeepControl?…` খোলে।
4. ব্রাউজারে লগইন অনুমোদন করুন, তারপর ড্যাশবোর্ডে ফিরে আসুন। টোকেন না আসা পর্যন্ত OmniRoute
   `api2.cursor.sh/auth/poll` পোল করে।
5. OmniRoute **অ্যাক্সেস + রিফ্রেশ** টোকেন সংরক্ষণ করে এবং
   `https://api2.cursor.sh/auth/exchange_user_api_key`-এর মাধ্যমে সেগুলো রিফ্রেশ করে।

এই পদ্ধতিতে কনটেইনারের ভিতরে Cursor IDE বা `cursor-agent`-এর প্রয়োজন হয় না।

## মডেল আবিষ্কার

একটি লগইন করা সংযোগ থাকলে, **উপলভ্য মডেল / স্বয়ংক্রিয় সিঙ্ক** সংযোগের bearer token ব্যবহার করে Cursor-এর
HTTP `AiService/AvailableModels` ক্যাটালগকে অগ্রাধিকার দেয়।
এটি ব্যর্থ হলে, OmniRoute তখনও হোস্টের `cursor-agent` ব্যবহার করার চেষ্টা করে (উপস্থিত থাকলে), এরপর
স্ট্যাটিক রেজিস্ট্রি সিড ব্যবহার করে।

OmniRoute সবসময় ক্যাটালগে **`auto`** (প্রদর্শিত নাম “Auto”) প্রকাশ করে, পাশাপাশি
OpenCodex-ধাঁচের রাউটার মোড **`auto-cost`**, **`auto-balance`**, এবং
**`auto-intelligence`** প্রকাশ করে। প্রেরিত ডেটায় এগুলো Cursor-এর `default` মডেলে
ম্যাপ হয় (তিনটি ভ্যারিয়েন্টের জন্য একটি `optimization` ModelParameter-সহ)। প্রিমিয়াম
মডেলের ব্যবহারসীমা শেষ হয়ে গেলে `cu/auto` ব্যবহারকে অগ্রাধিকার দিন — Auto-তে প্রায়ই তখনও বাজেট থাকে।

### সিঙ্ক করা থাকলে লাইভ ক্যাটালগই একমাত্র উৎস

Cursor মডেলের সফল সিঙ্কের পর (`cursor-agent --list-models` → সংরক্ষিত
সিঙ্ক করা ক্যাটালগ, অথবা উপরের bearer-authenticated `AvailableModels` ফেচ),
**ড্যাশবোর্ড**, **`/v1/models`**, এবং **সব পরীক্ষা করুন** তালিকায় থাকে:

1. লাইভ সিঙ্ক থেকে ফেরত আসা মডেলগুলো
2. ইনজেক্ট করা auto-router id: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. অপারেটরের **কাস্টম** মডেল (ইম্পোর্ট / ম্যানুয়াল) — সিঙ্ক কখনোই এগুলো বাদ দেয় না

`open-sse/config/providers/registry/cursor/`-এর অধীন বড় স্ট্যাটিক রেজিস্ট্রি
**শুধুমাত্র অফলাইন ফলব্যাক**। সিঙ্ক করা তালিকা খালি থাকলে (অথবা আবিষ্কার ব্যর্থ হলে),
তালিকা ওই রেজিস্ট্রিতে ফিরে যায়।

Effort-সাফিক্সযুক্ত id-গুলো (উদাহরণস্বরূপ `claude-4.6-sonnet-high`) রানটাইমে এখনো
**অনুরোধ** করা যেতে পারে: `resolveRequestedModel` সাফিক্সটি সরিয়ে একটি প্রেরণযোগ্য
`ModelParameter`-এ রূপান্তর করে। একচেটিয়া তালিকা ইচ্ছাকৃতভাবে Test All থেকে ওই স্ট্যাটিক ভ্যারিয়েন্টগুলো
লুকিয়ে রাখে, যাতে প্রোবগুলো Cursor প্রকৃতপক্ষে যেগুলো উপলভ্য হিসেবে ফেরত দেয় সেগুলোর সঙ্গে মেলে।

### সহায়কসমূহ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ড্যাশবোর্ড মার্জ
- `ensureCursorAutoCatalogEntry` — আবিষ্কার + তালিকাভুক্তির সময় auto* ইনজেক্ট করে
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` স্ট্যাটিক লুপ

## প্রোভাইডারের সীমা (কোটা)

Cursor-এর জন্য **ব্যবহার → প্রোভাইডারের সীমা** PKCE বা টোকেন
ইম্পোর্টের পর `api2.cursor.sh`-এর Bearer API ব্যবহার করে
(`GetCurrentPeriodUsage` → ব্যবহারের সারসংক্ষেপ → auth/usage)। পুরোনো IDE থেকে ইম্পোর্ট করা সেশনের জন্য
লিগ্যাসি cookie/`cursor.com` ড্যাশবোর্ড পাথটি শেষ ফলব্যাক হিসেবে থেকে যায়।

উইন্ডোগুলোতে সাধারণত **মোট**, **Auto + Composer**, এবং **API** অন্তর্ভুক্ত থাকে। সীমাগুলো
খালি দেখালে, আবার **Cursor দিয়ে লগইন** চালান অথবা টোকেন পুনরায় ইম্পোর্ট করুন (শুধু IDE ইম্পোর্ট
আর আবশ্যক নয়)।

## খালি টার্ন / ব্যবহারসীমা শেষ

Cursor কোনো Run গ্রহণ করলেও assistant text না ফেরালে (প্রিমিয়াম
ব্যবহারসীমা শেষ হয়ে গেলে যা সাধারণ), OmniRoute করণীয় নির্দেশনাসহ একটি **429** (কোটার ইঙ্গিত) অথবা
**502** দেখায় — শুধু “প্রোভাইডার খালি কনটেন্ট ফেরত দিয়েছে” নয়। `not_found: AI Model Not Found`-এর মতো
স্ট্রিমিং ব্যর্থতাগুলো (ব্যবহারের উইন্ডো শেষ) **Cursor rate limit / usage exceeded** হিসেবে
শ্রেণিবদ্ধ হয় এবং SSE পাইপলাইনের মধ্যেও ওই বার্তা বজায় রাখে (শেয়ার করা empty-stream guard ইতিমধ্যে
নির্গত কোনো ত্রুটি ওভাররাইট করে না)। প্রোভাইডারের সীমা পরীক্ষা করুন, **`auto`** মডেল চেষ্টা করুন, অথবা
Cursor প্ল্যানের সীমা বাড়ান।

## ক্লায়েন্ট সংস্করণ (হেডলেস)

স্থানীয় `cursor-agent` ইনস্টলেশন ছাড়া, OmniRoute প্রথমে env
`CURSOR_AGENT_CLI_VERSION`, তারপর Cursor ইনস্টলার স্ক্রিপ্টের ডিস্ক-ক্যাশ করা
স্ক্র্যাপ, এরপর একটি পিন করা build id-এর মাধ্যমে `x-cursor-client-version` নির্ধারণ করে। প্রয়োজন হলে
`CURSOR_AGENT_CLI_VERSION` দিয়ে ওভাররাইড করুন।

## ফলব্যাক: ম্যানুয়াল টোকেন ইম্পোর্ট

ব্রাউজারে লগইন সম্পন্ন করতে না পারলে:

1. হোস্টে Cursor-এর `state.vscdb` থেকে টোকেন বের করুন:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal-এ **টোকেন ইম্পোর্ট** খুলুন।
3. **অ্যাক্সেস টোকেন** এবং উপলভ্য থাকলে **রিফ্রেশ টোকেন** পেস্ট করুন (স্বয়ংক্রিয়
   রিফ্রেশের জন্য আবশ্যক)। Machine ID ঐচ্ছিক।

শুধু access-token ইম্পোর্ট এখনো কাজ করে, তবে refresh token ছাড়া সেটির মেয়াদ শেষ হবে —
চ্যাটে authentication error এলে আবার ইম্পোর্ট করুন।

## সম্পর্কিত

- Zed Docker নির্দেশিকা: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor লগইন রেফারেন্স (বাহ্যিক):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
