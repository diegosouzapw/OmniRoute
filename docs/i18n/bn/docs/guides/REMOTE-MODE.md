# Remote Mode (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute অন্য কোথাও চললেও আপনার ল্যাপটপে `omniroute` CLI চালান
(একটি VPS, একটি হোম সার্ভার, আপনার Tailnet-এর অন্য কোনো মেশিন)। আপনি
`omniroute connect` দিয়ে একবার লগ ইন করেন, এরপর থেকে **প্রতিটি** CLI কমান্ড সেই
রিমোট সার্ভারকে লক্ষ্য করে — একই কমান্ড, একই আউটপুট, শুধু রিমোট সার্ভারের বিরুদ্ধে কার্যকর হয়।

ইনস্টল করার জন্য দ্বিতীয় কোনো টুল নেই: রিমোট মোড হলো নিয়মিত `omniroute` CLI,
সঙ্গে সীমিত-পরিসরের **অ্যাক্সেস টোকেন**।

```bash
npm install -g omniroute                 # সাধারণ CLI
omniroute connect 192.168.0.15           # লগ ইন করুন (পাসওয়ার্ড → সীমিত-পরিসরের টোকেন)
omniroute models list                    # ← এখন রিমোট সার্ভারের মডেলগুলোর তালিকা দেখায়
omniroute configure codex                # ← রিমোট ক্যাটালগ থেকে একটি লোকাল Codex প্রোফাইল লেখে
```

---

## এটি যেভাবে কাজ করে

```
আপনার ল্যাপটপ                           রিমোট OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (পাসওয়ার্ড → টোকেন)       │
│  কনটেক্সট: vps     │ ───────────────►  │ সীমিত-পরিসরের অ্যাক্সেস টোকেন তৈরি করে │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ প্রতিটি ব্যবস্থাপনা রুট, টোকেনের │
│ কনফিগগুলো          │ ◄───────────────  │ স্কোপ অনুযায়ী যাচাই করা হয়    │
│ লোকালভাবে লেখে     │                   └───────────────────────────────┘
└────────────────────┘
```

- **কনটেক্সটগুলো** প্রতিটি একটি করে সার্ভার সংরক্ষণ করে (`~/.omniroute/config.json`, `chmod 600`)।
  `omniroute contexts use <name>` সক্রিয় সার্ভার পরিবর্তন করে; `default` হলো লোকাল।
- **অ্যাক্সেস টোকেনগুলো** (`oma_live_…`) ব্যবস্থাপনা কমান্ড অনুমোদন করে। এগুলো
  ইনফারেন্স API কী (`sk-…`, যা `/v1/chat/completions`-এর জন্য ব্যবহৃত হয়) থেকে আলাদা।
- সার্ভারে একটি টোকেনের শুধু SHA-256 হ্যাশ সংরক্ষিত থাকে। প্লেইনটেক্সটটি তৈরির সময়
  **একবারই** দেখানো হয়।

---

## সংযোগ করা

### ব্যবস্থাপনা পাসওয়ার্ড দিয়ে (বুটস্ট্র্যাপ)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128-এর ব্যবস্থাপনা পাসওয়ার্ড: ********
# ✔ http://192.168.0.15:20128-এর সঙ্গে সংযুক্ত — কনটেক্সট '192.168.0.15' (স্কোপ: admin)
```

পাসওয়ার্ড প্রবাহটি ডিফল্টভাবে একটি **admin** টোকেন তৈরি করে (পাসওয়ার্ডটি আপনার কাছে আছে,
তাই আপনার ইতিমধ্যেই পূর্ণ নিয়ন্ত্রণ রয়েছে)। `--scope` দিয়ে স্কোপ সীমিত করুন:

```bash
omniroute connect 192.168.0.15 --scope write
```

বিকল্পসমূহ: `--port <p>` (হোস্টে পোর্ট না থাকলে), `--name <ctx>` (কনটেক্সটের নাম),
`--scope read|write|admin`। একটি পূর্ণ URL অপরিবর্তিতভাবে ব্যবহৃত হয়:
`omniroute connect https://omni.example.com`।

### আগে থেকে তৈরি করা টোকেন দিয়ে

ড্যাশবোর্ডে (অথবা `omniroute tokens create` দিয়ে) একটি সীমিত-পরিসরের টোকেন তৈরি করে
সেটি পেস্ট করুন — কোনো পাসওয়ার্ডের প্রয়োজন নেই:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI টোকেনটি `GET /api/cli/whoami`-এর মাধ্যমে যাচাই করে এবং সক্রিয় কনটেক্সট হিসেবে সংরক্ষণ করে।

---

## স্কোপসমূহ

তিনটি স্তর, ক্রমানুক্রমিক (`admin ⊃ write ⊃ read`):

| স্কোপ   | যা করা যায়                                                                    |
| ------- | ------------------------------------------------------------------------------ |
| `read`  | তালিকা/পরিদর্শন — `models list`, `providers status`, `logs`, `usage`, `cost`   |
| `write` | read **+** কনফিগার/প্রয়োগ — `setup-codex`, `keys add`, `config set`, কম্বো    |
| `admin` | write **+** ব্যবস্থাপনা — `tokens` CRUD, প্রোভাইডার যোগ, সার্ভিস, পলিসি, oauth |

প্রতিটি রুটের জন্য প্রয়োজনীয় স্কোপ সার্ভারটি HTTP মেথড থেকে অনুমান করে
(`GET`→read, পরিবর্তন→write), পাশাপাশি সংবেদনশীল ক্ষেত্রগুলোর জন্য একটি admin অনুমোদন-তালিকা
ব্যবহার করে (`/api/cli/tokens`, `/api/providers` পরিবর্তন, `/api/oauth`, `/api/services`, …)।
অপর্যাপ্ত স্কোপের টোকেন একটি স্পষ্ট বার্তাসহ `403` পায়।

> যেসব রুট প্রসেস চালু করে (`/api/services/*`, `/api/mcp/*`, …), সেগুলো
> **শুধু লুপব্যাকেই** সীমাবদ্ধ থাকে — স্কোপ যা-ই হোক, কোনো রিমোট টোকেন কখনোই সেগুলোতে পৌঁছাতে পারে না।

---

## রিমোট ইনস্টলে Antigravity সংযুক্ত করা

Antigravity Google-এর firstparty/nativeapp সম্মতি স্ক্রিন ব্যবহার করে। Google কেবল তখনই অনুমোদন কোড প্রকাশ করে, যখন **loopback redirect**
(`http://127.0.0.1:<port>/callback`) **সাইন-ইন অনুমোদনকারী ব্রাউজার থেকে অ্যাক্সেসযোগ্য** হয়। রিমোট VPS ইনস্টলে ওই loopback আপনার মেশিনে নয়, সার্ভারে থাকে, তাই সম্মতি স্ক্রিনটি **অনির্দিষ্টকাল আটকে থাকে এবং কখনোই কোনো কোড দেয় না** — ফলে সাধারণ "callback URL পেস্ট করুন" বিকল্পটিতে পেস্ট করার মতো কিছুই থাকে না। (এটি Google-এর পক্ষের একটি সীমাবদ্ধতা: শুধু OmniRoute নয়, bundled Antigravity desktop client ব্যবহারকারী যেকোনো proxy-তেই একই সমস্যা ঘটে।)

আপনি আটকে যাওয়ার আগেই dashboard এটি শনাক্ত করে: localhost নয় এমন কোনো ঠিকানা থেকে **Providers → Antigravity →
Connect** খুললে সাধারণ "callback URL কপি করুন" বিজ্ঞপ্তির বদলে নিচের দুটি সমাধান দেখানো হয়, যেখানে আপনার host ও port আগে থেকেই পূরণ করা থাকে।
(একটি LAN ঠিকানাও এর অন্তর্ভুক্ত — এই callback-এর ক্ষেত্রে `192.168.x.x` localhost নয়।)

রিমোট OmniRoute-এ Antigravity সংযুক্ত করার দুটি সমর্থিত উপায় রয়েছে।

### বিকল্প A — লোকাল লগইন সহায়ক (প্রস্তাবিত)

OAuth **আপনার নিজের কম্পিউটারে** চালান, যেখানে `127.0.0.1` অ্যাক্সেসযোগ্য। সহায়কটি সরাসরি Google-এর সঙ্গে যোগাযোগ করে, তাই dashboard-এর সংস্করণ যেখানে সম্পন্ন হতে পারে না, সেখানে সম্মতি প্রক্রিয়া সম্পন্ন হয়।

**আপনি যদি ইতিমধ্যেই সংযুক্ত থাকেন** (`omniroute connect <host>`), তাহলে কিছুই কপি করতে হবে না — সহায়কটি আপনার হয়ে ওই ইনস্টলে credential পৌঁছে দেয়:

```bash
# আপনার LOCAL মেশিনে (Node.js + একটি ব্রাউজার প্রয়োজন):
omniroute connect 192.168.0.15        # একবার — একটি admin-scoped context token তৈরি করে
npx omniroute login antigravity
#   ↳ Google-এর সম্মতি স্ক্রিন খোলে, একটি লোকাল loopback port-এ callback গ্রহণ করে,
#     সেটি exchange করে এবং সক্রিয় context-এ credential POST করে:
#
#   Antigravity http://192.168.0.15:20128-এ সংযুক্ত হয়েছে (সংযোগ abc123)।
#   পেস্ট করার কিছু নেই — আপনি এই terminal বন্ধ করতে পারেন।
```

সক্রিয় context অন্য কোনো মেশিন নির্দেশ করলেই push স্বয়ংক্রিয়ভাবে ঘটে। `--push` / `--no-push` দিয়ে যেকোনো একটি আচরণ বাধ্যতামূলক করুন, অথবা `--context <name>` দিয়ে নির্দিষ্ট কোনো context লক্ষ্য করুন।

**আপনার মেশিন VPS-এ পৌঁছাতে না পারলেও** (firewalled, SSH নেই, air-gapped desk), সহায়কটি তবুও কাজ করে — এর কেবল Google-এ পৌঁছানোই _প্রয়োজন_। `--no-push` ব্যবহার করুন, অথবা push ব্যর্থ হতে দিন: ইতিমধ্যে সম্পন্ন করা authorization বাতিল না করে এটি বিকল্প হিসেবে blob প্রিন্ট করে।

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

এরপর **রিমোট** dashboard-এ: **Providers → Antigravity → Connect**-এ যান এবং **Step 2** ফিল্ডে `omniroute-cred-v1.…` blob-টি পেস্ট করুন (এটি callback URL বা credential blob—দুটির যেকোনোটি গ্রহণ করে)। OmniRoute এটি decode করে, server-side-এ Cloud Code onboarding চালায় এবং সংযোগটি স্থায়ীভাবে সংরক্ষণ করে।

> blob-টিতে একটি refresh token রয়েছে — এটিকে password-এর মতো সুরক্ষিত রাখুন। push পদ্ধতিতে এটি আপনার context-এর authenticated connection-এর মাধ্যমে একবার পাঠানো হয়; paste পদ্ধতিতে আপনার dashboard connection-এর মাধ্যমে পাঠানো হয়। উভয় ক্ষেত্রেই এটি সংরক্ষণের সময় encrypted থাকে এবং সফল push কখনোই এটি আপনার terminal-এ প্রিন্ট করে না।

Flags: `--no-browser` (স্বয়ংক্রিয়ভাবে খোলার বদলে URL প্রিন্ট করুন), `--port <n>`
(loopback port নির্দিষ্ট করুন), `--timeout <ms>`, `--push` / `--no-push` (স্বয়ংক্রিয় delivery override করুন), `--context <name>` (নির্দিষ্ট একটি context লক্ষ্য করুন)।

### বিকল্প B — SSH local-forward tunnel

VPS-এ আপনার SSH access থাকলে dashboard port forward করুন, যাতে loopback callback tunnel-এর মাধ্যমে পুনরায় সার্ভারে পৌঁছায়:

```bash
# আপনার LOCAL মেশিনে:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# এরপর আপনার LOCAL ব্রাউজারে http://localhost:20128 খুলে স্বাভাবিকভাবে Antigravity সংযুক্ত করুন
# — 127.0.0.1:20128/callback redirect এখন SSH-এর মাধ্যমে VPS-এ পৌঁছাবে।
```

আপনি যেহেতু `localhost:20128` হিসেবে dashboard-এ পৌঁছাচ্ছেন, তাই Google-এর সম্মতি সম্পন্ন হয় এবং callback একই tunnel-এর মাধ্যমে সার্ভারে পৌঁছে যায় — কোনো blob-এর প্রয়োজন নেই। সংযোগটি সক্রিয় হিসেবে দেখা না যাওয়া পর্যন্ত tunnel খোলা রাখুন।

নিচের fixed-loopback provider-গুলোর বিপরীতে, এখানে **একটি forward-ই যথেষ্ট**: Antigravity callback dashboard port-ই ব্যবহার করে, তাই tunnel করার জন্য provider-নির্দিষ্ট দ্বিতীয় কোনো port নেই।

> সম্পূর্ণ headless একটি বিকল্প হলো (কোনো সহায়ক বা tunnel ছাড়াই) আপনার **নিজস্ব**
> Google OAuth web credentials + একটি public base URL কনফিগার করা; provider-এর OAuth
> environment variable-গুলো দেখুন। উপরের দুটি বিকল্পের জন্য অতিরিক্ত কোনো Google setup প্রয়োজন নেই।

---

## রিমোট ইনস্টলে Codex / Grok সংযুক্ত করা (fixed-loopback প্রোভাইডার)

Codex, xAI (`xai-oauth`) এবং Grok CLI (`grok-cli`) তাদের upstream OAuth অ্যাপে একটি **নির্দিষ্ট** loopback
`redirect_uri` নিবন্ধন করে। OmniRoute এটি পরিবর্তন করতে পারে না — প্রোভাইডারটি সব সময় ব্রাউজারকে একই hardcoded ঠিকানায় ফেরত পাঠায়:

| প্রোভাইডার  | প্রোভাইডার যে নির্দিষ্ট callback-এ redirect করে |
| ----------- | ----------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`           |
| `xai-oauth` | `http://127.0.0.1:56121/callback`               |
| `grok-cli`  | `http://127.0.0.1:56122/callback`               |

এখানে `localhost` বলতে **যে মেশিনে ব্রাউজার চলছে সেটিকে** বোঝায়, অন্যদিকে OmniRoute-এর PKCE
callback server **সার্ভারের** loopback-এ শোনে। `http://192.168.0.15:20128`-এর মতো একটি LAN
ঠিকানায় ড্যাশবোর্ড খুললে দুটির কখনোই সংযোগ হয় না: authorization
code আপনার নিজস্ব ল্যাপটপের `localhost:1455`-এ পৌঁছায়, যেখানে কিছুই শুনছে না,
এবং প্রোভাইডার কোনো ত্রুটি না দেখিয়েই sign-in ব্যর্থ করে।

ড্যাশবোর্ড popup খোলার আগেই এটি শনাক্ত করে এবং login-কে নীরবে ব্যর্থ হতে না দিয়ে
tunnel command দেখায় (#8046)।

### সমাধান — **উভয়** port forward করুন

```bash
# যে মেশিনে BROWSER চলছে, সেখানে:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# এরপর http://localhost:20128-এ যান এবং সেখান থেকে Codex সংযুক্ত করুন
```

দুটি forward-ই প্রয়োজন, এবং শুধু একটি forward করলেও ব্যর্থ হবে:

- **`20128`** (ড্যাশবোর্ড port) origin-কে প্রকৃত localhost করে, যার কারণে
  OmniRoute আদৌ PKCE callback server চালু করে — কোনো LAN origin কখনোই
  সেই branch-এ পৌঁছায় না।
- **`1455`** (প্রোভাইডারের নির্দিষ্ট callback port) হলো সেই স্থান যেখানে ব্রাউজারকে ফেরত পাঠানো হয়;
  এটিকে tunnel-এর মাধ্যমে সার্ভারের loopback-এ পৌঁছাতে হবে।

xAI বা Grok CLI সংযুক্ত করার সময় `1455`-এর পরিবর্তে `56121`/`56122` এবং `20128`-এর পরিবর্তে
আপনার প্রকৃত ড্যাশবোর্ড port ব্যবহার করুন। সংযোগটি active হিসেবে না দেখানো পর্যন্ত tunnel খোলা রাখুন।

> **SSH access নেই?** Codex এবং Grok CLI একটি paste করা token-ও গ্রহণ করে — connect dialog-এর **Paste API
> Key** / **Import auth.json** tab। এই পদ্ধতিতে কোনো loopback
> callback নেই, তাই এটি যেকোনো origin থেকে কাজ করে। Codex অতিরিক্তভাবে একটি সাধারণ access
> token অথবা একটি `~/.codex/auth.json` session blob গ্রহণ করে।

---

## token পরিচালনা

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ secret-টি শুধু একবার প্রিন্ট করে — এখনই কপি করুন
omniroute tokens list                 # আড়াল করা: id, নাম, scope, prefix, status, মেয়াদ
omniroute tokens revoke <id|prefix>   # অবিলম্বে revoke করুন
omniroute tokens scopes               # তিনটি scope ব্যাখ্যা করুন
```

`tokens` command-এর জন্য একটি **admin** credential প্রয়োজন। আপনি ড্যাশবোর্ডের
**Settings → Access Tokens** থেকেও token পরিচালনা করতে পারেন (তৈরি করা, revoke করা, একবার কপি করা)।

---

## রিমোট catalog থেকে একটি coding CLI কনফিগার করা

`omniroute configure` **active server-এর** live model catalog পড়ে এবং
**আপনার** মেশিনে একটি config লেখে।

```bash
omniroute configure codex
#   প্রোভাইডার: glm, kmc, ollamacloud, opencode-go, …
#   প্রোভাইডার: glm
#   Model id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml লেখা হয়েছে
#   এটি ব্যবহার করুন:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# interactive picker-এর শীর্ষে ঘন ঘন ব্যবহৃত একটি model রাখুন
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

picker স্থানীয় `model-preferences.json` file-এ শুধু model ID রাখে (কখনোই URL বা credential নয়),
যা context এবং CLI target অনুযায়ী সীমাবদ্ধ। সাম্প্রতিক selection-এর আগে
favorite দেখানো হয়; সেই context/target তালিকা থেকে নির্বাচিত model সরাতে `--unfavorite` ব্যবহার করুন।

লেখা profile-টি env var-এর মাধ্যমে inference key উল্লেখ করে
(`OMNIROUTE_API_KEY`) — secret কখনোই disk-এ লেখা হয় না। এককালীন
base Codex setup-এর (`[model_providers.omniroute]` block) জন্য দেখুন
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md)।

### রিমোটের বিরুদ্ধে একটি CLI চালু করা (কোনো config লেখা হয় না)

`omniroute run <target>`-ও active context অনুসরণ করে: remote base URL
এবং context credential শুধু চালু করা process-এ inject করা হয়।

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → রিমোট
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# ঠিক কী চালু হবে তার preview দেখুন (শুধু env KEY-এর নাম, কখনোই value নয়):
omniroute run codex --dry-run --json
```

Target: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(একক source: `bin/cli/cli-manifest.mjs`)। Qwen এবং Gemini একটি
অস্থায়ী isolated home দিয়ে চলে, যা exit করার সময় সরিয়ে ফেলা হয়, ফলে launch কখনোই আপনার ব্যক্তিগত
tool configuration স্পর্শ করে না — বা তাতে কিছু leak করে না।

### প্রতিটি CLI-এর জন্য setup command

সমর্থিত প্রতিটি CLI-এর একটি remote-aware setup command রয়েছে (সবগুলো active
context অথবা `--remote <url> --api-key <key>` অনুসরণ করে):

| CLI         | কমান্ড                     | এটি যা লেখে                                                                                                                                                                            |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` প্রোফাইলসমূহ (প্রতি মডেলের জন্য)                                                                                                                         |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (প্রতি মডেলের জন্য)                                                                                                                          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ক্যাটালগের প্রতিটি মডেলসহ `omniroute` openai-সামঞ্জস্যপূর্ণ provider (`opencode -m omniroute/<model>` চালান)                                      |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI মোড) + পেস্ট করার জন্য VS Code extension-এর settings প্রিন্ট করে (OpenAI-সামঞ্জস্যপূর্ণ, Base URL-এ `/v1` **ছাড়া**)                   |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` settings — OpenAI-সামঞ্জস্যপূর্ণ, Base URL-এ `/v1` **সহ**                                                                 |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase`-এ `/v1` **সহ**, `${{ secrets.OMNIROUTE_API_KEY }}`-এর মাধ্যমে key                             |
| Cursor      | `omniroute setup-cursor`   | অ্যাপের মধ্যকার ধাপগুলো প্রিন্ট করে (Settings → Models → Override OpenAI Base URL-এ `/v1` **সহ** + key + model)। Cursor config অস্বচ্ছ SQLite — শুধু chat panel-এর জন্য                |
| Roo Code    | `omniroute setup-roo`      | একটি Roo import JSON (`~/.omniroute/roo-settings.json`) লেখে + `roo-cline.autoImportSettingsPath` সেট করে + UI-এর ধাপগুলো প্রিন্ট করে (OpenAI-সামঞ্জস্যপূর্ণ, Base URL-এ `/v1` **সহ**) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` provider, `base_url`-এ `/v1` **সহ**, `$OMNIROUTE_API_KEY`-এর মাধ্যমে key                                                                |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST`-এ `/v1` **ছাড়া** + `GOOSE_MODEL`) + env নির্দেশনা                                                              |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base`-এ `/v1` **ছাড়া** + `model: openai/<id>`) + env নির্দেশনা (`aider --message --yes`)                                                             |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json`-এ V4 `modelProviders.openai` এন্ট্রি + `~/.qwen/.env`-এ `OMNIROUTE_API_KEY`                                                                                    |

```bash
# OpenCode (openai-সামঞ্জস্যপূর্ণ provider, ক্যাটালগের সব মডেল, দূরবর্তী VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # শুধু মিলে যাওয়া মডেলগুলো রাখুন
opencode -m omniroute/glm/glm-5.2 "..."          # প্রথমে OMNIROUTE_API_KEY export করুন
```

> OpenCode-এ আরও সমৃদ্ধ একটি **plugin** integration-ও রয়েছে: `omniroute setup opencode`
> (`--remote`-এর মাধ্যমে এখন remote-সচেতন) `@omniroute/opencode-plugin` ইনস্টল করে।
> `setup-opencode` হলো হালকা openai-সামঞ্জস্যপূর্ণ বিকল্প। API key-টি
> `{env:OMNIROUTE_API_KEY}`-এর মাধ্যমে উল্লেখ করা হয় — কখনোই ডিস্কে লেখা হয় না।
>
> OpenCode v2-তে এর পরিবর্তে `@omniroute/opencode-plugin-v2` ব্যবহার করুন: একই ক্যাটালগ,
> ভিন্ন loader contract। integration সংযুক্ত থাকলে এটি OpenCode-এর নিজস্ব credential
> store থেকে key পড়ে, তাই remote gateway-এর জন্য `opencode.json`-এ কোনো key-এরই
> প্রয়োজন হয় না।

---

## কনটেক্সট পরিচালনা (সার্ভারগুলোর মধ্যে পরিবর্তন)

একটি **কনটেক্সট** হলো সংরক্ষিত সার্ভার (baseUrl + credential + scope)। `omniroute connect`
একটি কনটেক্সট তৈরি করে এবং সেটিকে সক্রিয় করে; এরপর প্রতিটি কমান্ড সেটিকেই লক্ষ্য করে। `omniroute contexts`
ব্যবহার করে কনটেক্সটগুলো পরিচালনা করুন এবং সেগুলোর মধ্যে পরিবর্তন করুন:

```bash
omniroute contexts list            # সব কনটেক্সট; সক্রিয়টি ● দিয়ে চিহ্নিত
omniroute contexts current         # সক্রিয় সার্ভার, প্রমাণীকরণের অবস্থা, স্কোপ
```

```text
  | নাম     | বেস URL                   | প্রমাণীকরণ | স্কোপ | বিবরণ
● | vps     | http://100.67.86.91:20128 | token      | admin | দূরবর্তী OmniRoute (…)
  | default | http://localhost:20128    | ✗          |       |
```

**সার্ভার পরিবর্তন করুন** — পরবর্তী প্রতিটি কমান্ড সক্রিয় কনটেক্সট অনুসরণ করে:

```bash
omniroute contexts use vps         # → এখন সব কমান্ড দূরবর্তী VPS-কে লক্ষ্য করে
omniroute tokens list              #   (VPS-এর বিপরীতে চলে)

omniroute contexts use default     # → localhost-এ ফিরে যান
omniroute tokens list              #   (স্থানীয় সার্ভারের বিপরীতে চলে)
```

**ম্যানুয়ালি একটি কনটেক্সট যোগ করুন** (`connect`-এর পরিবর্তে), পরিদর্শন করুন বা নাম পরিবর্তন করুন:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "স্টেজিং বক্স"
omniroute contexts show staging    # একটি কনটেক্সটের সম্পূর্ণ বিবরণ
omniroute contexts rename staging stg
```

**একটি কনটেক্সট সরান** — নিশ্চিতকরণের জন্য জিজ্ঞাসা করে; এটি এড়াতে `--yes` দিন
(স্ক্রিপ্ট / নন-ইন্টার্যাক্টিভ শেলের জন্য আবশ্যক, অন্যথায় নিরাপদভাবে প্রত্যাখ্যান করা হয়):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) সরানো যায় না। সক্রিয় কনটেক্সট সরালে `default`-এ
> ফিরে যায়। পরামর্শ: কোনো কনটেক্সট সরালে কেবল **স্থানীয়ভাবে** সংরক্ষিত credential মুছে যায় —
> প্রকৃতপক্ষে অ্যাক্সেস বন্ধ করতে সার্ভারে `omniroute tokens revoke <id>` দিয়ে token
> প্রত্যাহার করুন।

কনটেক্সট **এক্সপোর্ট / ইমপোর্ট** করুন (যেমন, এক মেশিন থেকে অন্য মেশিনে স্থানান্তরের জন্য)। OS
keychain উপলভ্য থাকলে নতুন কনটেক্সটগুলোতে কেবল একটি keychain reference সংরক্ষিত থাকে;
credentials এক্সপোর্টে কপি করা হয় না:

```bash
omniroute contexts export --out contexts.json     # ডিফল্ট: stdout
omniroute contexts import contexts.json            # ওভাররাইট; বিদ্যমানগুলো রাখতে --merge
omniroute contexts migrate --yes                  # পুরোনো plaintext token-গুলো keychain-এ স্থানান্তর করুন
```

ব্যবহারযোগ্য OS keychain-বিহীন headless সিস্টেমে CLI, `0600` মোডসহ
`config.json`-এ ফিরে যায় এবং একবারের একটি সতর্কবার্তা দেখায়। ওই fallback থেকে তৈরি এক্সপোর্ট
(এবং migration-এর আগের যেকোনো legacy config) গোপন উপাদান হিসেবে বিবেচনা করুন।

---

## দ্রুত শুরু-থেকে-শেষ যাচাই

শূন্য থেকে একটি দূরবর্তী সেটআপ যাচাই করার জন্য কপি-পেস্টযোগ্য lifecycle — সংযোগ করুন, একটি
scoped token তৈরি করুন, একটি কমান্ড route করুন, ফিরে যান এবং সবকিছু সরিয়ে ফেলুন।
`192.168.0.15`-এর জায়গায় আপনার সার্ভারের host/IP (Tailscale, LAN, অথবা একটি public
`https://…` URL) দিন।

```bash
# ১. সংযোগ করুন (password → admin token, এমন একটি context হিসেবে সংরক্ষিত যা সক্রিয় হয়ে যায়)
omniroute connect 192.168.0.15                 # অথবা: --key oma_live_xxxx  (কোনো password নয়)
omniroute contexts current                     # দূরবর্তী server + scope দেখায়

# ২. এটি ব্যবহার করুন — management command-গুলো এখন দূরবর্তী server-এর বিপরীতে চলে
omniroute tokens create --name laptop --scope read   # আরও সীমিত একটি token তৈরি করুন
omniroute tokens list                                 # দূরবর্তী server থেকে masked list

# ৩. সামনে-পেছনে পরিবর্তন করুন
omniroute contexts use default                 # → স্থানীয়
omniroute contexts use 192-168-0-15            # → আবার দূরবর্তী (`contexts list` থেকে পাওয়া নাম)

# ৪. সরিয়ে ফেলুন। দ্রষ্টব্য: `contexts remove` কেবল স্থানীয় credential মুছে দেয় —
#    এটি server-এর token প্রত্যাহার করে না। বাস্তবে access বন্ধ করতে চাইলে প্রথমে
#    server-side থেকে প্রত্যাহার করুন।
omniroute tokens revoke <id|prefix>            # server-এর access বন্ধ করে
omniroute contexts remove 192-168-0-15 --yes   # স্থানীয় context সরান (সক্রিয় হলেও → default-এ ফিরে যায়), কোনো prompt নেই
```

> `--yes`, `contexts remove`-কে non-interactive করে (scripts/CI-তে আবশ্যক; এটি ছাড়া
> কোনো non-interactive shell আটকে থাকার পরিবর্তে নিরাপদভাবে প্রত্যাখ্যান করে)। **সক্রিয়**
> context সরালে স্বয়ংক্রিয়ভাবে `default`-এ ফিরে যায়।

---

## নিরাপত্তা সংক্রান্ত নোট

- টোকেনের প্লেইনটেক্সট একবারই দেখানো হয়; শুধুমাত্র SHA-256 হ্যাশ সংরক্ষণ করা হয় (API কীগুলোর মতোই)।
- `omniroute connect` লগইনের ব্রুট-ফোর্স লকআউট + অডিট লগিং পুনরায় ব্যবহার করে।
- পরিবহনের জন্য HTTPS বা একটি Tailnet ব্যবহার করাই শ্রেয়; LAN/Tailscale-এর সুবিধার্থে শুধু একটি হোস্ট দিলে তা ডিফল্টভাবে `http://` ব্যবহার করে — TLS-এর জন্য একটি পূর্ণ `https://…` URL দিন।
- পছন্দের স্থানীয় কনটেক্সট ফাইল হলো `~/.omniroute/config.json` (`chmod 600`),
  যাতে শুধুমাত্র একটি `credentialRef` থাকে; টোকেনটি নিজে OS
  কীচেইনে (`keytar`) সংরক্ষিত থাকে এবং কখনোই লগে প্রিন্ট করা হয় না। কার্যকর
  নেটিভ কীচেইনবিহীন হেডলেস ইনস্টলেশনগুলো স্পষ্ট ফলব্যাক হিসেবে একই `0600` ফাইল
  ব্যবহার করে এবং একবার একটি সতর্কতা দেখায়। একটি কীচেইন ব্যাকএন্ড ইনস্টল করার
  পর `omniroute contexts migrate --yes` ব্যবহার করুন।

---

## API এন্ডপয়েন্টসমূহ (রেফারেন্স)

| মেথড   | রুট                   | প্রমাণীকরণ             | স্কোপ                             |
| ------ | --------------------- | ---------------------- | --------------------------------- |
| POST   | `/api/cli/connect`    | ব্যবস্থাপনা পাসওয়ার্ড | — (সর্বজনীন, পাসওয়ার্ড-সুরক্ষিত) |
| GET    | `/api/cli/whoami`     | অ্যাক্সেস টোকেন        | read                              |
| GET    | `/api/cli/tokens`     | অ্যাক্সেস টোকেন        | admin                             |
| POST   | `/api/cli/tokens`     | অ্যাক্সেস টোকেন        | admin                             |
| DELETE | `/api/cli/tokens/:id` | অ্যাক্সেস টোকেন        | admin                             |

সম্পূর্ণ স্কিমার জন্য [openapi.yaml](../openapi.yaml) দেখুন।
