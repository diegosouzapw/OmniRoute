# Merge Queue & Manual Merge-Train Runbook (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (quality/velocity পরিকল্পনার WS3.2/WS3.4) থেকে পর্যালোচিত PR-গুলোকে
`release/vX.Y.Z`-এ মার্জ করার ডিফল্ট পথ হলো **Mergify merge queue** (`.mergify.yml`);
নিচে নথিভুক্ত **manual merge-train** হলো FALLBACK — যা ইনসিডেন্ট, রিলিজ ফ্রিজের সময়,
অথবা Mergify Open Source প্ল্যান কখনও পরিবর্তিত হলে ব্যবহৃত হয়।

## ডিফল্ট পথ: Mergify কিউ

1. PR-টি ক্যাম্পেইনগুলো দ্বারা পর্যালোচিত/সবুজ সংকেতপ্রাপ্ত এবং মালিকের প্রি-মার্জ ⭐
   গেট দ্বারা অনুমোদিত হয় (রিপোর্ট + প্রতিটি আইটেমের সিদ্ধান্ত — `/merge-prs`-এর ধাপ 0.75 দেখুন)।
2. মালিক (অথবা মালিকের সিদ্ধান্ত অনুযায়ী কাজ করা সেশন) **`queue`**
   লেবেল প্রয়োগ করেন। লেবেলটিই মার্জের অনুমোদন; Mergify কেবল এটি কার্যকর করে।
3. Mergify কিউতে থাকা PR-গুলোকে ফাস্ট-গেটগুলোর বিপরীতে **ধারাবাহিকভাবে** (একবারে একটি)
   যাচাই করে এবং মার্জ করে (squash)। ব্যাচিং + স্বয়ংক্রিয় বাইসেকশন Mergify-এর একটি পেইড স্তর
   (ফ্রি প্ল্যানে "Cannot use Merge Queue batch", #7220), তাই `.mergify.yml`-এ কোনো
   `batch_size` সেট করা নেই; ব্যাচিংয়ের কাজ নিচের ম্যানুয়াল মার্জ-ট্রেনেরই থাকে। যে PR-এর
   চেকগুলো `checks_timeout`-এর পরও মুলতুবি থাকে (240 মিনিট = `quality.yml`-এর
   পরিমাপ করা p95-এর 2×), সেটিকে কিউ আটকে রাখার পরিবর্তে কিউ থেকে সরিয়ে দেওয়া হয়।
4. মার্জ-পরবর্তী সময়ে, ধারাবাহিক release-green ওয়ার্কফ্লো push-এর সময় নতুন tip যাচাই করে
   এবং সমন্বয়টির রিগ্রেশন হলে একটি অ্যাট্রিবিউশন ইস্যু খোলে (কখনোই স্বয়ংক্রিয়ভাবে রিভার্ট করে না)।

সুরক্ষা-নিয়ম (`CLAUDE.md`-এর কঠোর নিয়ম #21/#22-এর প্রতিরূপ):

- **রিলিজ ফ্রিজ চালু** → ফ্রিজ করা ব্রাঞ্চকে লক্ষ্য করা PR-গুলোতে লেবেল দেবেন না; প্রথমে
  সক্রিয় `release/vX+1`-এ পুনরায় লক্ষ্য নির্ধারণ করুন।
- **অন্য সেশনের চলমান PR** → এটিতে কখনোই লেবেল দেবেন না; কেবল মালিকানাধীন সেশনই
  তার নিজস্ব কাজ কিউতে যোগ করে।
- শুধুমাত্র টেস্ট-সংক্রান্ত diff এবং `hotfix`-লেবেলযুক্ত PR-গুলো ইতিমধ্যেই সংক্ষিপ্ত CI চালায়
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane দেখুন); বাস্তবে যে চেক-সেটটি চালানো হয়েছে,
  কিউয়ের শর্তগুলো সেটিই গ্রহণ করে (`#check-failure=0` + `#check-pending=0`)।

## ফলব্যাক: manual merge-train

queue অনুপলব্ধ হলে এটি ব্যবহৃত হয়। এটি v3.8.47 চক্রে এক দিনে 33টি PR নিষ্পত্তির
অনুশীলনটিকে বিধিবদ্ধ করে:

1. **ব্যাচ তৈরি করুন** (~10–30টি পর্যালোচিত+অনুমোদিত PR)। `linked:` collision
   (একই `tap.testFiles`, একই CHANGELOG hunk) পরীক্ষা করুন এবং সেগুলো ধারাবাহিকভাবে প্রক্রিয়া করুন।
2. **একবারই যাচাই করুন**: release tip থেকে তৈরি একটি বিচ্ছিন্ন worktree-তে স্থানীয়ভাবে ব্যাচের
   সব head মার্জ করুন, তারপর release-এর সমতুল্য suite চালান
   (`npm run check:release-green`, release-এর আগে `--with-build` যোগ করুন)।
   `scripts/release/merge-train.sh <base> <PR#>…` ধাপ 1–2 স্বয়ংক্রিয় করে (দ্বন্দ্বযুক্ত
   PR বাদ পড়ে, train চলতে থাকে)। Full mode `npm run test:unit` চালায় —
   box-এর জন্য টিউন করা runner (`--test-concurrency=20`), **দুটি ধারাবাহিক 4-core CI
   shard নয়**, যেগুলো 16-core box-এর মাত্র ~25%-এ প্রধান phase চালাত (সমাধান করা হয়েছে
   2026-07-18)। `--fast` (একই দিনের mega-train নিষ্পত্তি, মালিক কর্তৃক অনুমোদিত 2026-07-18)
   প্রতিটি static gate + vitest বজায় রাখে, তবে শুধু train-এ ওঠা PR-গুলো দ্বারা পরিবর্তিত
   node:test file চালায়; জমাকৃত tip-এ প্রতিদিন অন্তত একবার FULL suite চালাতেই হবে
   (`--fast` ছাড়া একটি train)।
3. **গ্রিন** → PR-গুলো ক্রমানুসারে মার্জ করুন (প্রতিটির আগে `state,headRefOid` পুনরায় পরীক্ষা করে —
   যে PR-এর head পরিবর্তিত হয়েছে সেটি আবার review queue-তে প্রবেশ করে)। প্রমাণ করুন, প্রতিটি মার্জের
   net diff কেবল সেই PR-এর নিজস্ব পরিবর্তন (auto-resolve revert নয়: পরিধিবহির্ভূত deletion শনাক্ত করতে
   `git diff --stat` অডিট করুন)।
4. **রেড** → একে একে পুনরায় যাচাইয়ের পরিবর্তে ব্যাচটিকে অর্ধেক করে bisect করুন (প্রতিটি অর্ধেক যাচাই করুন);
   প্রমাণসহ সমস্যাসৃষ্টিকারী PR-টিকে আবার review queue-তে পাঠান।
5. **কখনোই নয়**: freeze চলাকালে frozen branch-এ মার্জ করা; কোথাও `git stash` ব্যবহার করা;
   রেড চলে যাবে এই আশায় নির্বিচারে CI পুনরায় চালানো (নিয়ম: রেড হলো তথ্য)।

## স্তরবিন্যাস (শুধু fast-gates ব্যবহার করেও queue কেন নিরাপদ)

- **প্রতি PR-এ** (quality.yml fast-gates): TIA-প্রভাবিত test + সম্পূর্ণ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity।
- **প্রতি batch/tip-এ** (continuous release-green): release branch-এ প্রতিটি push-এর সময়
  `--quick` HARD gate; দিনে 3× সম্পূর্ণ `--with-build --full-ci` sweep।
- **প্রতি release-এ** (release PR-এ ci.yml): E2E ×9-সহ সম্পূর্ণ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets।

আগের চেয়ে কম কিছুই যাচাই করা হয় না — ভারী surface-টি শুধু প্রতি PR-এর পরিবর্তে
প্রতি batch/tip-এ চলে, আর এভাবেই O(N) round-trip দূর হয়।

## `merge-train.sh`-এর জন্য fresh-checkout পূর্বশর্ত

স্ক্রিপ্টটি root checkout-এ (যেকোনো worktree কাজের আগে) fail-fast **preflight** চালায়,
যাতে নষ্ট install কখনোই red train হিসেবে ভুলভাবে প্রতীয়মান না হয়:

1. `npm ci`, তারপর npm যে `bun` postinstall আটকে দেয় সেটি চালান:
   `(cd node_modules/bun && node install.js)` — অন্যথায় `check:provider-consistency`
   এবং `check:known-symbols` (উভয়ই `bun scripts/…`) train এবং base উভয় স্থানেই
   কোনো violation line ছাড়াই ব্যর্থ হয়।
2. কোনো অতিরিক্ত `node_modules/node_modules` থাকা যাবে না (একটি duplicate dependency tree;
   React দুবার load হয় এবং UI vitest suite-গুলো সঙ্গে সঙ্গে ব্যর্থ হয়)।
3. `node_modules/.bin/tsc` উপস্থিত ও executable হতে হবে (আংশিক install-এ এটি থাকে না)।

train blocking `npm run check:cycles:ratchet` চালায়; শুধু `npm run check:cycles`
advisory (এটি SCC-গুলো তালিকাভুক্ত করে এবং base সুস্থ হলেও non-zero দিয়ে exit করে)।
