# Termux Headless Setup (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute-কে Termux-এর মাধ্যমে Android-এ একটি হেডলেস সার্ভার হিসেবে চালানো যায়। Electron ডেস্কটপ অ্যাপটি Termux-এ সমর্থিত নয়, তবে ওয়েব ড্যাশবোর্ড এবং OpenAI-সামঞ্জস্যপূর্ণ API স্থানীয় ব্রাউজার অথবা একই নেটওয়ার্কে থাকা অন্য ডিভাইস থেকে ব্যবহার করা যায়।

## পূর্বশর্ত

F-Droid অথবা GitHub releases থেকে Termux ইনস্টল করুন, তারপর প্যাকেজগুলো আপডেট করুন এবং `better-sqlite3`-এর মতো নেটিভ ডিপেন্ডেন্সিগুলোর জন্য প্রয়োজনীয় বিল্ড টুল ইনস্টল করুন।

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js সংস্করণ:** OmniRoute-এর জন্য Node `>=22.22.2 <23 || >=24.0.0 <27` প্রয়োজন (`package.json` / `SUPPORTED_NODE_RANGE`-এর `engines`-এর সঙ্গে মেলে)। Termux-এর `nodejs-lts` সাধারণত Node 20 LTS সরবরাহ করে, যা **আর সমর্থিত নয়** — এর পরিবর্তে `pkg install nodejs` (বর্তমান সংস্করণ) ইনস্টল করুন এবং যাচাই করুন যে `node --version` একটি 22.x/24.x+ সংস্করণ দেখায়।

নেটিভ প্যাকেজ কম্পাইল করা ব্যর্থ হলে, উপরের `pkg install` কমান্ডটি আবার চালান এবং তারপর OmniRoute ইনস্টল করার চেষ্টা করুন।

## ইনস্টলেশন

সর্বশেষ প্রকাশিত প্যাকেজটি সরাসরি চালান:

```bash
npx -y omniroute@latest
```

আপনি এটি গ্লোবালভাবেও ইনস্টল করতে পারেন:

```bash
npm install -g omniroute
omniroute
```

## চালানো

হেডলেস সার্ভার মোডে OmniRoute চালু করুন:

```bash
omniroute
```

অথবা:

```bash
npx omniroute
```

ড্যাশবোর্ডটি এখানে অনুরোধ গ্রহণ করে:

```text
http://localhost:20128
```

Android ব্রাউজারে URL-টি খুলুন। আপনি যদি Termux-এর ভেতরে ক্লায়েন্ট চালান, তাহলে OpenAI-সামঞ্জস্যপূর্ণ বেস URL হিসেবে একই হোস্ট এবং পোর্ট ব্যবহার করুন।

## ব্যাকগ্রাউন্ডে চালানো

একটি সাধারণ ব্যাকগ্রাউন্ড প্রসেসের জন্য:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

এটি বন্ধ করতে:

```bash
pkill -f omniroute
```

ডিভাইস বুট হওয়ার পরে স্বয়ংক্রিয়ভাবে চালু করার জন্য Termux:Boot অ্যাড-অন ইনস্টল করুন এবং একটি বুট স্ক্রিপ্ট তৈরি করুন:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android-এর ব্যাটারি অপ্টিমাইজেশন দীর্ঘ সময় ধরে চলা ব্যাকগ্রাউন্ড প্রসেস বন্ধ করে দিতে পারে। সার্ভারটি অনলাইনে থাকার কথা থাকলে Termux-এর জন্য ব্যাটারি অপ্টিমাইজেশন নিষ্ক্রিয় করুন।

## অন্য ডিভাইস থেকে অ্যাক্সেস

WiFi নেটওয়ার্কে ফোনটির IP ঠিকানা খুঁজুন:

```bash
ip addr show wlan0
```

তারপর অন্য একটি ডিভাইস থেকে ড্যাশবোর্ডটি খুলুন:

```text
http://PHONE_IP:20128
```

উদাহরণস্বরূপ:

```text
http://192.168.1.50:20128
```

ফোন এবং ক্লায়েন্টকে একই বিশ্বস্ত নেটওয়ার্কে রাখুন। আপনি যদি OmniRoute-কে ফোনের বাইরের নেটওয়ার্কে উন্মুক্ত করেন, তাহলে API key এবং ড্যাশবোর্ড authentication সক্রিয় করুন।

## ডেটা ডিরেক্টরি

ডিফল্টভাবে OmniRoute, Linux-এ ব্যবহৃত একই সার্ভার-সাইড ডেটা পাথের আচরণ অনুসরণ করে Termux-এর হোম ডিরেক্টরির অধীনে ডেটা সংরক্ষণ করে। ডেটাবেসটি নির্দিষ্ট কোনো স্থানে রাখতে:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## সীমাবদ্ধতা

- Electron, Termux-এ চলে না।
- কোনো system tray বা desktop integration নেই।
- এই সেটআপটি কেবল সার্ভারের জন্য: ব্রাউজার ড্যাশবোর্ড ব্যবহার করুন।
- নেটিভ ডিপেন্ডেন্সিগুলোর স্থানীয় কম্পাইলেশন প্রয়োজন হতে পারে।
- কম মেমরির Android ডিভাইসে কমসংখ্যক সমবর্তী অনুরোধ ব্যবহার করতে হতে পারে।
- MITM/system certificate ফিচারের জন্য Termux-এর বাইরে Android-স্তরের trust-store সংক্রান্ত কাজের প্রয়োজন হতে পারে।

## সমস্যা সমাধান

### অসমর্থিত প্ল্যাটফর্ম: android (প্রতিটি অনুরোধ HTTP 500 ফেরত দেয়)

**লক্ষণ:** `omniroute` / `omniroute serve`, `✔ OmniRoute is running!` দেখায়, কিন্তু প্রতিটি ড্যাশবোর্ড বা API অনুরোধ শুধু `500 Internal Server Error` ফেরত দেয়। `~/.omniroute/logs/application/app.log` খালি থাকে, `APP_LOG_LEVEL=debug` থেকে কোনো কার্যকর তথ্য পাওয়া যায় না এবং response body-টি কোনো JSON বিবরণ ছাড়াই সাধারণ টেক্সট (`Internal Server Error`) হয়।

**কারণ:** কিছু Termux/Node বিল্ডে `process.platform === "android"` রিপোর্ট করা হয়। Next.js-এর `getCacheDirectory()` সেই প্ল্যাটফর্মটি পরিচালনা করে না: এর জন্য `~/.cache` (অথবা একটি সাধারণ tmp ডিরেক্টরি) _আগে থেকেই_ বিদ্যমান থাকতে হয়, নাহলে instrumentation hook লোড করার সময় এটি নিচের ত্রুটিসহ ব্যর্থ হয়:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

hook-টি কখনো লোড না হওয়ায় লগিংও শুরু হয় না — ফলে 500 ত্রুটিটি সম্পূর্ণরূপে নির্ণয়-অযোগ্য বলে মনে হয়। Android/Termux-এ এই পরীক্ষা সফল করার জন্য Next.js চালু হওয়ার আগে OmniRoute-এর CLI entrypoint `~/.cache` তৈরি করে (এবং `XDG_CACHE_HOME` সেট করা না থাকলে সেটি সেট করে)।

**সমর্থিত সমাধান (প্যাকেজে প্যাচ না করে):**

```bash
mkdir -p ~/.cache
omniroute serve
```

OmniRoute-এর বর্তমান বিল্ডগুলোতে CLI, Android/Termux-এ এটি স্বয়ংক্রিয়ভাবে করে — নতুন করে `npx -y omniroute@latest` / গ্লোবাল ইনস্টল করলে ম্যানুয়াল ধাপটির প্রয়োজন হওয়ার কথা নয়। আপগ্রেড করার পরেও ত্রুটিটি দেখা গেলে, উপরের মতো একবার `~/.cache` তৈরি করে পুনরায় চালু করুন।

`process.platform = "linux"` বাধ্যতামূলক করতে `dist/server.js` প্যাচ করবেন **না**। এ ধরনের প্যাকেজ প্যাচ প্রতিবার পুনরায় ইনস্টল/আপগ্রেড করার সময় প্রতিস্থাপিত হয়ে যায় এবং cache directory বিদ্যমান থাকলে এটি অপ্রয়োজনীয়।

### better-sqlite3 বিল্ড ত্রুটি

Termux বিল্ড টুলচেইন ইনস্টল করুন:

```bash
pkg install nodejs python build-essential
```

তারপর আবার চালান:

```bash
npx -y omniroute@latest
```

### পোর্ট ইতিমধ্যে ব্যবহৃত হচ্ছে

ডিফল্ট পোর্টে কোন প্রসেস অনুরোধ গ্রহণ করছে তা পরীক্ষা করুন:

```bash
ss -ltnp | grep 20128
```

পুরোনো প্রসেসটি বন্ধ করুন:

```bash
pkill -f omniroute
```

### অন্য ডিভাইস থেকে ড্যাশবোর্ডে পৌঁছানো যাচ্ছে না

উভয় ডিভাইস একই WiFi নেটওয়ার্কে আছে কি না যাচাই করুন, তারপর Termux থেকে পরীক্ষা করুন:

```bash
curl http://localhost:20128
```

স্থানীয় অ্যাক্সেস কাজ করলেও LAN অ্যাক্সেস কাজ না করলে Android hotspot/WiFi isolation এবং ফোনে থাকা যেকোনো firewall বা VPN profile পরীক্ষা করুন।
