# Merge Queue & Manual Merge-Train Runbook (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 থেকে (quality/velocity পরিকল্পনার WS3.2/WS3.4), পর্যালোচিত PR-গুলোকে
`release/vX.Y.Z`-এ মার্জ করার ডিফল্ট পথ হলো **Mergify মার্জ কিউ** (`.mergify.yml`);
নিচে নথিভুক্ত **ম্যানুয়াল মার্জ-ট্রেন** হলো বিকল্প ব্যবস্থা — যা ইনসিডেন্ট,
রিলিজ ফ্রিজের সময়, অথবা Mergify Open Source পরিকল্পনা কখনো পরিবর্তিত হলে ব্যবহৃত হয়।

## ডিফল্ট পথ: Mergify কিউ

1. PR-টি ক্যাম্পেইনগুলোর মাধ্যমে পর্যালোচিত/গ্রিন হয়েছে এবং মালিকের প্রি-মার্জ ⭐
   গেট দ্বারা অনুমোদিত হয়েছে (রিপোর্ট + প্রতিটি আইটেমের সিদ্ধান্ত — `/merge-prs`-এর ধাপ 0.75 দেখুন)।
2. মালিক (অথবা মালিকের সিদ্ধান্ত অনুযায়ী কাজ করা সেশন) **`queue`**
   লেবেলটি প্রয়োগ করে। লেবেলটিই মার্জের অনুমোদন; Mergify শুধু সেটি কার্যকর করে।
3. Mergify কিউতে থাকা সর্বোচ্চ 10টি PR ব্যাচ করে, fast-gates-এর বিপরীতে ব্যাচটি যাচাই
   করে এবং মার্জ (squash) করে। একটি রেড ব্যাচ **স্বয়ংক্রিয়ভাবে দ্বিখণ্ডিত হয়** — সমস্যাকারী PR-টি
   প্রায় log2(N) বার পুনরায় যাচাইয়ের মাধ্যমে আলাদা করে কিউ থেকে সরানো হয়; বাকিগুলো এগিয়ে যায়।
4. মার্জের পরে, continuous release-green ওয়ার্কফ্লো push-এর সময় নতুন tip যাচাই
   করে এবং সমন্বয়টি রিগ্রেশন ঘটালে একটি attribution issue খোলে (কখনো স্বয়ংক্রিয়ভাবে রিভার্ট করে না)।

সুরক্ষাবিধি (`CLAUDE.md`-এর কঠোর নিয়ম #21/#22-এর প্রতিরূপ):

- **রিলিজ ফ্রিজ সক্রিয়** → ফ্রিজ করা branch-কে লক্ষ্য করা PR-এ লেবেল দেবেন না; প্রথমে
  সক্রিয় `release/vX+1`-এ পুনরায় লক্ষ্য নির্ধারণ করুন।
- **অন্য সেশনের চলমান PR** → কখনো সেটিতে লেবেল দেবেন না; শুধু মালিকানাধীন সেশনই
  নিজের কাজ কিউতে যোগ করে।
- শুধুমাত্র test-সংক্রান্ত diff এবং `hotfix`-লেবেলযুক্ত PR-এ ইতিমধ্যেই সীমিত CI চলে (`RELEASE_CHECKLIST.md`
  → Hotfix Fast-Lane দেখুন); বাস্তবে যে check set চলেছে, কিউয়ের শর্তগুলো সেটিই গ্রহণ করে
  (`#check-failure=0` + `#check-pending=0`)।

## বিকল্প ব্যবস্থা: ম্যানুয়াল মার্জ-ট্রেন

কিউ অনুপলভ্য হলে এটি ব্যবহৃত হয়। এটি v3.8.47 চক্রের সময় এক দিনে 33টি PR
নিষ্পত্তি করার অনুশীলনটিকে আনুষ্ঠানিকভাবে সংজ্ঞায়িত করে:

1. **ব্যাচ তৈরি করুন** (প্রায় 10–30টি পর্যালোচিত+অনুমোদিত PR)। `linked:` সংঘর্ষ
   (একই `tap.testFiles`, একই CHANGELOG hunk) পরীক্ষা করুন এবং সেগুলো ক্রমানুসারে পরিচালনা করুন।
2. **একবারই যাচাই করুন**: release tip থেকে তৈরি একটি বিচ্ছিন্ন worktree-তে ব্যাচের সব
   head স্থানীয়ভাবে মার্জ করুন, তারপর release-সমতুল্য suite চালান
   (`npm run check:release-green`, রিলিজের আগে `--with-build` যোগ করুন)।
   `scripts/release/merge-train.sh <base> <PR#>…` ধাপ 1–2 স্বয়ংক্রিয় করে (সংঘর্ষপূর্ণ
   PR বের হয়ে যায়, ট্রেন চলতে থাকে)। Full mode-এ `npm run test:unit` চলে — অর্থাৎ
   box-উপযোগী runner (`--test-concurrency=20`), **দুটি ক্রমিক 4-core CI
   shard নয়**, যেগুলো 16-core box-এর প্রধান পর্যায়টি প্রায় 25% ব্যবহারে চালিয়েছিল (সমাধান করা হয়েছে
   2026-07-18)। `--fast` (একই দিনের mega-train নিষ্পত্তি, মালিক কর্তৃক 2026-07-18-এ অনুমোদিত)
   প্রতিটি static gate + vitest বজায় রাখে, কিন্তু কেবল ট্রেনে ওঠা PR-গুলো দ্বারা পরিবর্তিত
   node:test file চালায়; সঞ্চিত tip-এর ওপর প্রতিদিন অন্তত একবার FULL suite চালাতেই হবে
   (`--fast` ছাড়া একটি ট্রেন)।
3. **গ্রিন** → PR-গুলো ক্রমানুসারে মার্জ করুন (প্রতিটির আগে `state,headRefOid` পুনরায় পরীক্ষা করে —
   যে PR-এর head বদলেছে সেটি আবার review-তে প্রবেশ করবে)। প্রমাণ করুন যে প্রতিটি মার্জের নিট diff
   কেবল PR-টির নিজস্ব পরিবর্তন (auto-resolve revert নয়: আওতাবহির্ভূত deletion-এর জন্য
   `git diff --stat` নিরীক্ষা করুন)।
4. **রেড** → একটির পর একটি পুনরায় যাচাই না করে ব্যাচটিকে অর্ধেক করে দ্বিখণ্ডিত করুন
   (প্রতিটি অর্ধেক যাচাই করুন); প্রমাণসহ সমস্যাকারী PR-টিকে review queue-তে ফেরত পাঠান।
5. **কখনোই করবেন না**: freeze চলাকালে frozen branch-এ মার্জ; কোথাও `git stash`;
   red চলে যাবে আশা করে নির্বিচারে CI পুনরায় চালানো (নিয়ম: একটি red হলো তথ্য)।

## স্তরবিন্যাস (কেন শুধু fast-gates দিয়েই কিউ নিরাপদ)

- **প্রতি PR-এ** (quality.yml fast-gates): TIA-প্রভাবিত test + সম্পূর্ণ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog অখণ্ডতা।
- **প্রতি batch/tip-এ** (continuous release-green): release branch-এ প্রতিটি push-এর সময়
  `--quick` HARD gate; দিনে 3 বার সম্পূর্ণ `--with-build --full-ci` sweep।
- **প্রতি release-এ** (release PR-এ ci.yml): E2E ×9-সহ সম্পূর্ণ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchet।

আগের তুলনায় কোনো কিছুই কম যাচাই করা হয় না — ভারী অংশটি শুধু প্রতি PR-এর পরিবর্তে
প্রতি batch/tip-এ চলে, আর এটিই O(N) round-trip দূর করে।
