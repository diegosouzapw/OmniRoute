# Developer environment notes (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

এই পৃষ্ঠায় প্রকল্পের স্থানীয় `.env` আচরণ এবং OmniRoute ডেভেলপ করার সময় এনভায়রনমেন্ট ফাইল ও গোপনীয় তথ্য কীভাবে পরিচালনা করতে হবে তা ব্যাখ্যা করা হয়েছে।

## .env postinstall আচরণ

ডেভেলপারদের সুবিধার্থে প্রকল্পটি `npm install` / `postinstall` চলাকালে একটি স্থানীয় `.env` ফাইল তৈরি করতে পারে। এই ফাইলটি শুধুমাত্র স্থানীয় ডেভেলপমেন্ট ও পরীক্ষার জন্য এবং এটি কখনোই ভার্সন কন্ট্রোলে কমিট করা যাবে না।

মূল বিষয়গুলো:

- রিপোজিটরির `.gitignore` ইতিমধ্যেই `.env*` ফাইলগুলো উপেক্ষা করে (`.gitignore` এন্ট্রিটি দেখুন)। নির্দিষ্ট কোনো উদাহরণ ফাইল কমিট করার সুস্পষ্ট উদ্দেশ্য এবং সেটির জন্য নথিভুক্ত প্রক্রিয়া না থাকলে এই নিয়মটি অপসারণ বা পরিবর্তন করবেন না।
- কোনো প্রকৃত গোপনীয় তথ্য ভুলবশত রিপোতে কমিট হয়ে গেলে, অবিলম্বে সংশ্লিষ্ট ক্রেডেনশিয়াল ঘুরিয়ে দিন/বাতিল করুন এবং রিপোজিটরির ইতিহাস থেকে সেটি সরিয়ে ফেলুন (উদাহরণস্বরূপ, `git filter-repo` বা সমতুল্য প্রতিকারমূলক ওয়ার্কফ্লো ব্যবহার করে)। সহায়তার প্রয়োজন হলে নিরাপত্তা/যোগাযোগের দায়িত্বপ্রাপ্ত ব্যক্তির সঙ্গে যোগাযোগ করুন।
- CI এবং প্রোডাকশনের ক্ষেত্রে, গোপনীয় তথ্য ফাইলে কমিট করার পরিবর্তে CI সিক্রেট বা কোনো সিক্রেটস ম্যানেজার (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, ইত্যাদি) ব্যবহার করুন।

## প্রস্তাবিত স্থানীয় ওয়ার্কফ্লো

- `.env` কেবল আপনার স্থানীয় ওয়ার্কস্পেসে রাখুন। প্রয়োজনীয় ভেরিয়েবল এবং গ্রহণযোগ্য উদাহরণ মান নথিভুক্ত করতে `.env.example` (ইতিমধ্যেই ট্র্যাক করা হয়েছে) ব্যবহার করুন।
- স্থানীয়ভাবে এমন পরীক্ষা চালানোর সময় যেখানে গোপনীয় তথ্যের মতো মান প্রয়োজন, প্রকৃত ক্রেডেনশিয়ালের পরিবর্তে কৃত্রিম প্লেসহোল্ডার বা রানটাইমে তৈরি ক্ষণস্থায়ী কী ব্যবহার করুন।
- যেসব পরীক্ষায় প্লেসহোল্ডার ব্যবহার করা হয়, সেগুলোতে একটি সংক্ষিপ্ত মন্তব্য যোগ করুন, যাতে পর্যালোচকেরা বুঝতে পারেন যে ফিক্সচারটি কৃত্রিম।

## স্ক্যানার-সংক্রান্ত নোট

- কিছু কম্পাইল করা বা বাইনারি অ্যাসেটে (যেমন, এম্বেড করা base64 WASM ব্লব) এমন ASCII সাবস্ট্রিং থাকতে পারে, যেগুলো দেখতে ক্রেডেনশিয়ালের মতো এবং টেক্সট-ভিত্তিক সিক্রেট স্ক্যানারকে সক্রিয় করতে পারে। এসব অ্যাসেট বৈধ হলে, সেগুলোকে স্ক্যানারের অ্যালাওলিস্টে চিহ্নিত করুন অথবা স্ক্যানার কনফিগে সংশ্লিষ্ট ডিরেক্টরিগুলো বাদ দিন।

## কোনো তথ্য ফাঁস খুঁজে পেলে

1. অবিলম্বে কীটি ঘুরিয়ে দিন/বাতিল করুন।
2. ইতিহাস থেকে গোপনীয় তথ্যটি সরিয়ে ফেলুন এবং প্রয়োজন হলে পরিষ্কার করা ব্রাঞ্চে ফোর্স-পুশ করুন।
3. রক্ষণাবেক্ষণকারীদের জানান এবং আপনার প্রতিষ্ঠানের ইনসিডেন্ট রেসপন্স চেকলিস্ট অনুসরণ করুন।
