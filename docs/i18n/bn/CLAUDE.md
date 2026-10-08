# CLAUDE.md (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**প্রকল্পের সব নিয়ম [`AGENTS.md`](AGENTS.md)-এ রয়েছে** — প্রতিটি AI
সহকারীর জন্য এটিই একমাত্র নির্ভরযোগ্য উৎস (আর্কিটেকচার, কনভেনশন, টেস্টিং, কোয়ালিটি গেট, git ওয়ার্কফ্লো, 23টি কঠোর নিয়ম,
PII-সংক্রান্ত শিক্ষা)। এটি সম্পূর্ণ পড়ুন; এখানে প্রকল্পের নিয়ম পুনরায় যোগ করবেন না। নিচের সবকিছু শুধু
Claude Code-এর ক্ষেত্রে প্রযোজ্য — `AGENTS.md`-এ ইতিমধ্যে সংজ্ঞায়িত নিয়মগুলোর কার্যকরী পরিমার্জন।

## Worktree বিচ্ছিন্নতা — Claude Code-এর নির্দিষ্ট বিষয়

সম্পূর্ণ বাধ্যতামূলক worktree প্রোটোকল (বেস-ব্রাঞ্চ নিশ্চিতকরণ, `.claude/worktrees/` ক্যানোনিক্যাল
পাথ, `cp -al` node_modules, অপসারণের নিয়ম) `AGENTS.md` → Git Workflow → "Worktree
isolation"-এ রয়েছে। Claude Code-এর নির্দিষ্ট বিষয়গুলো:

- অপারেটর আগে থেকে না জানিয়ে থাকলে `AskUserQuestion`-এর মাধ্যমে বেস ব্রাঞ্চ নিশ্চিত করুন (কঠোর নিয়ম #19)।
- নেটিভ `EnterWorktree` টুলটিকে অগ্রাধিকার দিন — এটি ইতিমধ্যেই
  `.claude/worktrees/`-এর (ক্যানোনিক্যাল পাথ) অধীনে worktree তৈরি করে। নথিভুক্ত `git
worktree add` কমান্ড দিয়ে worktree তৈরি করুন, এরপর এর `path` দিয়ে `EnterWorktree` কল করুন।

## ক্রস-সেশন নিরাপত্তা — Claude Code-এর নির্দিষ্ট বিষয়

কঠোর নিয়ম #19/#21/#22 (`AGENTS.md`-এ) সমান্তরাল সেশন নিয়ন্ত্রণ করে। এই
হারনেসের জন্য কার্যকরী স্মারক:

- **git স্পর্শ করে এমন প্রতিটি সাবএজেন্টের প্রম্পটে `git stash` নিষেধাজ্ঞাটি হুবহু পুনরাবৃত্তি করুন**
  (Agent টুল / Workflow স্ক্রিপ্ট) — সাবএজেন্টগুলো এই ফাইল উত্তরাধিকারসূত্রে পায় না, এবং stash-সংক্রান্ত ঘটনার নথিভুক্ত
  পুনরাবৃত্তি একটি সাবএজেন্টের মাধ্যমেই ঘটেছিল।
- _এই সেশনে_ আপনি তৈরি করেননি এমন কোনো PR মার্জ বা পুশ করার আগে `git worktree list`
  চালান এবং `gh pr view <N> --json state,headRefOid` পুনরায় পরীক্ষা করুন (কঠোর নিয়ম #22b)।
- প্রতিটি সেশন শেষে মূল checkout-কে যে ব্রাঞ্চে শুরু হয়েছিল, সেই ব্রাঞ্চেই রাখুন।

## Superpowers / পরিকল্পনা আর্টিফ্যাক্ট — পাথ ওভাররাইড

`_tasks/` কনভেনশনটি `AGENTS.md` → "Planning & Research Artifacts"-এ সংজ্ঞায়িত। Superpowers
স্কিলগুলো এমন ডিফল্টসহ আসে যা `docs/…`-এর দিকে নির্দেশ করে — সেই ডিফল্টগুলো এখানে **ওভাররাইড করা হয়েছে**।
কোনো Superpowers স্কিল যখন "saved to `docs/superpowers/plans/…`"-এর মতো একটি পাথ ঘোষণা করে,
লেখার আগে সেটিকে `_tasks/…`-এর সমতুল্য পাথে পুনর্লিখুন:

| আর্টিফ্যাক্ট (স্কিল)             | ডিফল্ট (ব্যবহার করবেন না) | পরিবর্তে এখানে সংরক্ষণ করুন                                   |
| -------------------------------- | ------------------------- | ------------------------------------------------------------- |
| পরিকল্পনা (`writing-plans`)      | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| স্পেক / ডিজাইন (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| গবেষণা (`deep-research`, ad-hoc) | `docs/research/`          | `_tasks/research/…`                                           |
| হ্যান্ড-অফ (`/handoff`)          | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

মূল রিপোজিটরিতে কখনোই নয়, ওই আর্টিফ্যাক্টগুলো `_tasks/` রিপোজিটরির ভেতরে কমিট করুন (`git -C _tasks …`)।

## স্ক্র্যাচ / অস্থায়ী ফাইল — `/tmp` নয়, `_artifacts/` ব্যবহার করুন

এই প্রকল্প হারনেসের ডিফল্ট সেশন স্ক্র্যাচপ্যাড (`/tmp/claude-*/…`) ওভাররাইড করে। অস্থায়ী/কাজের
ফাইল — এক্সপোর্ট, জেনারেট করা zip, একবারের জন্য তৈরি মধ্যবর্তী আউটপুট, সাধারণত `/tmp`-এ রাখতেন এমন যেকোনো কিছু —
পরিবর্তে `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/`-এ লিখুন।

- `_artifacts/` হলো একটি রুট `_*` পাথ: এটি ইতিমধ্যেই gitignore করা (`AGENTS.md` → "Root `_*` paths"), শুধু
  ডিস্কে থাকে, কখনো ট্র্যাক করা হয় না।
- কারণ: স্ক্র্যাচ আউটপুট প্রকল্পের ভেতরে রাখলে (`/tmp`-এর পরিবর্তে) অপারেটরের পক্ষে
  অস্থায়ী সবকিছু এক জায়গায় খুঁজে মুছে ফেলা সহজ হয়; তা না হলে অদৃশ্য হয়ে যাওয়া বা আনট্র্যাকড অবস্থায় জমতে থাকা
  ক্ষণস্থায়ী সেশন-নির্দিষ্ট `/tmp` ডিরেক্টরিগুলোতে খুঁজতে হয়।
- এটিকে `_tasks/`-এর সঙ্গে **গুলিয়ে ফেলবেন না** (কঠোর নিয়ম #23, দীর্ঘস্থায়ী
  পরিকল্পনা/স্পেক/গবেষণা/হ্যান্ড-অফের জন্য এর নিজস্ব ব্যক্তিগত git রিপোজিটরি রয়েছে) — `_artifacts/` শুধু ফেলে দেওয়ার উপযোগী কাজের ফাইলের জন্য;
  এখানে কোনো কিছুরই টিকে থাকা বা সংস্করণায়িত হওয়ার প্রয়োজন নেই।

## PR খোলার আগে বেস সবুজ থাকা

কোনো ব্রাঞ্চ কাটার বা PR খোলার আগে বেস-গ্রিন পরীক্ষা চালান (`AGENTS.md` → Git Workflow →
"Base-green check"; প্রকল্পের স্কিলগুলো এটিকে `.agents/skills/_shared/base-green.md` হিসেবে উল্লেখ করে)। বেস টিপ লাল থাকা অবস্থায়
খোলা PR-এর বডিতে অবশ্যই `⚠️ base-red inherited: #<issue>` থাকতে হবে। জমে থাকা লাল অবস্থা
(বেস টিপ + লাল PRগুলো) নিষ্পত্তি করতে `/sweep-reds` স্কিল ব্যবহার করুন।
