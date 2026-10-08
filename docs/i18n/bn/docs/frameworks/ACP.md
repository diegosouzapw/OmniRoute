# ACP registry and registered CLI launchers (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI আবিষ্কার**, **নেটিভ Agent Client Protocol**, এবং
**লিগ্যাসি stdio অ্যাডাপ্টার** আলাদা রাখে। ইনস্টল করা কোনো বাইনারি খুঁজে পাওয়া
তার প্রমাণীকরণ, মডেল সামঞ্জস্যতা, বা কোনো প্রম্পট পরিচালনার প্রস্তুতি প্রমাণ করে না।

ড্যাশবোর্ড ইনভেন্টরি এবং কাস্টম-এজেন্ট নিবন্ধনের জন্য `GET /api/acp/agents` এবং
`POST /api/acp/agents` ব্যবহার করে। এগুলো শুধুমাত্র লোকাল ব্যবস্থাপনা রুট, প্রসেস
চালু করা বা প্রম্পট জমা দেওয়ার জন্য কোনো পাবলিক API নয়। অভ্যন্তরীণ
`AcpManager` স্বয়ংক্রিয়ভাবে কোনো HTTP প্রোভাইডার ফলব্যাকে পরিণত হয় না।

## নিবন্ধিত কনট্র্যাক্ট

বিল্ট-ইন লঞ্চ বাইনারি, আর্গুমেন্ট এবং ব্যাকএন্ড মোডের নির্ভরযোগ্য উৎস হলো
`config/cli-tools-manifest.json`। রেজিস্ট্রি ওই ম্যানিফেস্ট থেকে তার সংজ্ঞাগুলো
নির্ধারণ করে। শনাক্তকরণ 60 সেকেন্ডের জন্য ক্যাশ করা হয়।

- `acp`: Gemini কনট্র্যাক্ট `gemini --experimental-acp` চালু করে এবং অফিসিয়াল
  TypeScript SDK-এর মাধ্যমে নিউলাইন-ডিলিমিটেড ACP JSON-RPC ব্যবহার করে যোগাযোগ করে।
- `stdio-adapter`: অন্যান্য নিবন্ধিত কনট্র্যাক্ট লিগ্যাসি নিউলাইন-ইনপুট,
  stdout-আউটপুট অ্যাডাপ্টার বজায় রাখে। আউটপুটে দুই সেকেন্ডের নিষ্ক্রিয় সময়কাল
  এর রেসপন্স শেষ করে। এই অ্যাডাপ্টার ওই CLI-গুলোর জন্য নেটিভ ACP সমর্থন
  **প্রত্যয়িত করে না**।

Gemini তার [CLI রেফারেন্সে](https://geminicli.com/docs/cli/cli-reference/) লঞ্চ ফ্ল্যাগটি নথিভুক্ত করে।
ক্লায়েন্ট ইনিশিয়ালাইজেশন, সেশন তৈরি, প্রম্পট রিকোয়েস্ট, নোটিফিকেশন এবং বাতিলকরণের
জন্য [অফিসিয়াল ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
ব্যবহার করে।

কাস্টম-এজেন্টের সংজ্ঞাগুলো অ্যাডমিনিস্ট্রেটর-নিয়ন্ত্রিত লঞ্চ কনট্র্যাক্ট হিসেবেই থাকে।
কোনো বাইনারি ও আর্গুমেন্ট নিবন্ধন করলে সেই প্রসেস সার্ভার ব্যবহারকারীর লোকাল
এক্সিকিউশন সুবিধা পায়; নিবন্ধন কোনো স্যান্ডবক্স নয়। ভার্সন প্রোব শুধু নিবন্ধিত
এক্সিকিউটেবল এবং স্বীকৃত ভার্সন ফ্ল্যাগ গ্রহণ করে।

## অভ্যন্তরীণ লঞ্চ API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // শুধু এই এজেন্টের জন্য ইচ্ছাকৃতভাবে নির্ধারিত প্রোভাইডার ভ্যারিয়েবলগুলো পাস করুন।
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "এই প্রজেক্টটি ব্যাখ্যা করুন", 120_000);
  // কলকারী অ্যাপ্লিকেশনে রেসপন্সটি ব্যবহার করুন।
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` নিবন্ধিত সংজ্ঞা থেকে এক্সিকিউটেবল এবং আর্গুমেন্ট নির্ধারণ
করে। কলারের জন্য উপলভ্য একমাত্র অপশন হলো `cwd` এবং `env`; পুরোনো
`spawn(agentId, binary, args, env)` সিগনেচার এবং এক্সিকিউটেবল ওভাররাইড প্রত্যাখ্যান
করা হয়। এই ম্যানেজার HTTP লঞ্চ কনট্র্যাক্ট সমর্থন করে না।

চাইল্ড প্রসেসটি CLI লঞ্চারগুলোর মতো একই অপারেটিং-সিস্টেম, টার্মিনাল, লোকেল এবং
সার্টিফিকেট অ্যালাউলিস্ট উত্তরাধিকারসূত্রে পায়। সার্ভার/প্রোভাইডারের সিক্রেট প্যারেন্ট
এনভায়রনমেন্ট থেকে কপি করা হয় না। নির্বাচিত CLI-এর প্রয়োজনীয় ক্রেডেনশিয়াল
স্পষ্টভাবে পাস করতে হবে অথবা ওই CLI-এর নিজস্ব লোকাল প্রমাণীকরণের মাধ্যমে সরবরাহ
করতে হবে। চাইল্ড প্রসেসটির কাছে তবুও লোকাল ব্যবহারকারীর ফাইলসিস্টেম অনুমতি থাকে
এবং এটি নিজের কনফিগ পড়তে পারে।

## নেটিভ লাইফসাইকেল এবং সীমা

1. নিবন্ধিত বাইনারি চালু করুন, ACP ইনিশিয়ালাইজ করুন এবং নির্বাচিত ওয়ার্কিং
   ডিরেক্টরিকে রুট ধরে একটি সেশন তৈরি করুন। ইনিশিয়ালাইজেশনের সীমা দশ সেকেন্ড।
2. একটি প্রম্পট জমা দিন এবং শুধু সেই সেশনের টেক্সট নোটিফিকেশন সংগ্রহ করুন।
   সমাপ্তি বলতে প্রম্পট RPC রেসপন্স বোঝায়, stdout নীরব থাকার কোনো সময়কাল নয়।
3. একটি প্রম্পট ডেডলাইন ব্যবহার করুন, যার মধ্যে অসমাপ্ত ইনিশিয়ালাইজেশনও অন্তর্ভুক্ত;
   ডিফল্ট হলো 120 সেকেন্ড। একই প্রসেসে সমসাময়িক প্রম্পট প্রত্যাখ্যান করা হয়।
4. নেটিভ টাইমআউটে `session/cancel` চেষ্টা করুন এবং প্রসেসটি বন্ধ করুন।
   100 ms-এর একটি সীমাবদ্ধ সময়সীমা বন্ধ করার আগে নোটিফিকেশন ফ্লাশ করার সুযোগ দেয়।
5. ইনিশিয়ালাইজেশন ব্যর্থ হলে, সংযোগ বন্ধ হলে, প্রসেস এক্সিট করলে, অথবা কলার
   এটিকে বন্ধ করলে ট্রান্সপোর্ট স্টেট বন্ধ করুন এবং সেশনটি সরিয়ে দিন।

টুলের অনুমতির অনুরোধ প্রত্যাখ্যান করা হয়। কোনো ফাইলসিস্টেম বা টার্মিনাল ক্লায়েন্ট
ক্যাপাবিলিটি ঘোষণা করা হয় না। এই বিধিনিষেধগুলো চাইল্ড বাইনারিটিকে নিজে স্যান্ডবক্স
করে না বা কোনো CLI-এর নিজস্ব অথরাইজেশন সেটিংস প্রতিস্থাপন করে না।

নেটিভ টেক্সট এবং লিগ্যাসি stdout/stderr—উভয় ক্ষেত্রেই সর্বাধিক 1 MiB অক্ষর
সংরক্ষিত হয়; ট্রাঙ্কেশন নোটিশসহ সর্বশেষ আউটপুট রাখা হয়। SDK পার্সিংয়ের আগে
একটি পৃথক নেটিভ ওয়্যার ফ্রেম সর্বাধিক 2 MiB বাইটে সীমাবদ্ধ। প্রতি প্রম্পটে
বাফার রিসেট হয়।

`kill(sessionId)` SIGTERM পাঠায়, তারপর প্রসেসটি এক্সিট না করলে পাঁচ সেকেন্ড পরে
SIGKILL পাঠায়। লিগ্যাসি প্রম্পট টাইমআউট লিসেনার এবং টাইমার ছেড়ে দেয়, কিন্তু
অন্য একটি প্রম্পটের জন্য সেশনটি উপলভ্য রাখে; কাজ শেষ হলে `kill()` বা `killAll()`
কল করার দায়িত্ব কলারদেরই থাকে।

## ইভেন্ট এবং পরিদর্শন

ম্যানেজার `stdout`, `stderr`, এবং `exit` ইমিট করে, প্রতিটির সঙ্গে `sessionId`
থাকে। `sessionError` একটি স্যানিটাইজ করা ট্রান্সপোর্ট ত্রুটি রিপোর্ট করে।
সামঞ্জস্যতার জন্য `error` ইভেন্টটি শুধু তখনই ইমিট করা হয় যখন এর কোনো সাবস্ক্রাইবার
থাকে, ফলে অনুপস্থিত বাইনারি কোনো আনহ্যান্ডলড EventEmitter ত্রুটি ঘটাতে পারে না।

- `getSession(sessionId)` একটি পরিচালিত সেশন অথবা `undefined` ফেরত দেয়।
- `getActiveSessions()` বন্ধ বা বন্ধ হওয়ার প্রক্রিয়ায় থাকা সেশনগুলো বাদ দেয়।
- `sendInput(sessionId, input)` শুধু সচল লিগ্যাসি অ্যাডাপ্টারের জন্য উপলভ্য;
  JSON-RPC স্ট্রিম সুরক্ষিত রাখতে নেটিভ ACP র ইনপুট প্রত্যাখ্যান করে।
- `killAll()` ওই ইনস্ট্যান্স দ্বারা পরিচালিত প্রতিটি সেশন বন্ধ করে।

## যাচাইকরণের সীমানা

নির্ধারিত ফিক্সচারগুলো নেটিভ হ্যান্ডশেক, টেক্সট আউটপুট, প্রত্যাখ্যাত অনুমতি,
বাতিলকরণ, সমসাময়িক প্রম্পট, ব্যর্থ ইনিশিয়ালাইজেশন, প্রসেস এক্সিট, আউটপুট সীমা
এবং সিক্রেট আইসোলেশন কভার করে। বিদ্যমান লিগ্যাসি বাফার/লিসেনার রিগ্রেশনও
কভার করা থাকে। এই টেস্টগুলো কোনো লাইভ Gemini লগইন বা সফল প্রোভাইডার ইনফারেন্স
প্রদর্শন করে না; সেগুলোর জন্য লক্ষ্য এনভায়রনমেন্টে আলাদাভাবে অনুমোদিত একটি
স্মোক টেস্ট প্রয়োজন।

## সম্পর্কিত ডকুমেন্টেশন

- [এজেন্ট প্রোটোকল](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI লঞ্চ কনট্র্যাক্ট](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI টুল](../reference/CLI-TOOLS.md)
- [A2A সার্ভার](./A2A-SERVER.md)
- [ক্লাউড এজেন্ট](./CLOUD_AGENT.md)
