# Zed IDE Integration in Docker Environments (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute যখন Docker-এর ভিতরে চলে, তখন প্রচলিত "Zed Keychain থেকে ইমপোর্ট করুন" প্রক্রিয়াটি ব্যর্থ হয়,
কারণ কনটেইনারটি হোস্ট OS-এর keychain daemon-এ (Linux-এ libsecret,
macOS-এ Keychain, Windows-এ Credential Manager) পৌঁছাতে পারে না এবং হোস্ট ফাইলসিস্টেমের
Zed কনফিগ ডিরেক্টরিগুলো ডিফল্টভাবে কনটেইনারের ভিতরে দৃশ্যমান থাকে না।

## Docker-এ Keychain ইমপোর্ট কেন ব্যর্থ হয়

একটি কনটেইনারের ভিতরে দুটি প্রতিবন্ধকতা দেখা দেয়:

1. **ফাইলসিস্টেম আইসোলেশন** — `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), অথবা Windows-এর সমতুল্য পাথ খোঁজে। এই পাথগুলো
   হোস্টে থাকে এবং স্পষ্টভাবে ভলিউম-মাউন্ট না করা হলে উপলভ্য হয় না।
2. **IPC আইসোলেশন** — কনফিগ ডিরেক্টরি মাউন্ট করা হলেও, `keytar` নেটিভ
   মডিউলটি একটি Unix socket বা D-Bus session-এর মাধ্যমে OS keychain পরিষেবার সঙ্গে যোগাযোগ করে।
   কোনোটিই ডিফল্টভাবে কনটেইনারে ব্রিজ করা হয় না, তাই ক্রেডেনশিয়াল পড়ার প্রচেষ্টা সবসময় ব্যর্থ হয়।

OmniRoute দুটি হিউরিস্টিকের মাধ্যমে Docker পরিবেশ শনাক্ত করে:

- `/.dockerenv`-এর উপস্থিতি (কনটেইনার চালুর সময় Docker daemon এটি লেখে)।
- `/proc/1/cgroup`-এ `docker` স্ট্রিংটির উপস্থিতি (Linux cgroup v1)।

যেকোনো একটি হিউরিস্টিক সক্রিয় হলে, ইমপোর্ট রুটটি
`zedDockerEnvironment: true` এবং Manual Token Import ট্যাবে যাওয়ার নির্দেশনাসহ একটি বার্তা দিয়ে HTTP 422 রিটার্ন করে।

## Manual Token Import ট্যাব ব্যবহার করা

1. **Dashboard → Providers → Zed** খুলুন।
2. Keychain ইমপোর্ট কার্ডের নিচে **Manual Token Import** প্যানেলটি দেখা যায়। OmniRoute
   Docker শনাক্ত করলে, প্রথম ব্যর্থ keychain ইমপোর্ট প্রচেষ্টার পরে এই প্যানেলটি স্বয়ংক্রিয়ভাবে
   প্রসারিত হয়।
3. ড্রপডাউন থেকে প্রোভাইডার নির্বাচন করুন (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, অথবা DeepSeek)।
4. পাসওয়ার্ড ফিল্ডে API key পেস্ট করুন।
5. **Import**-এ ক্লিক করুন।

কীটি `Zed Manual Import (<provider>)` নামে একটি নতুন প্রোভাইডার কানেকশন হিসেবে
সংরক্ষিত হয়।

## হোস্টে Zed কোথায় API Key সংরক্ষণ করে

Zed, `zed-openai`, `ai.zed.openai`, `zed-anthropic` ইত্যাদি সার্ভিস নামের অধীনে
OS keychain-এ AI প্রোভাইডার কী সংরক্ষণ করে। ম্যানুয়াল ইমপোর্টের জন্য সেগুলো উদ্ধার করতে,
নিচের স্থানগুলো দেখুন:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` সেকশনে প্রোভাইডার কনফিগারেশন থাকে। Zed UI-এর মাধ্যমে keychain-এ
সংরক্ষিত কীগুলো `settings.json`-এ প্লেইন টেক্সট হিসেবে থাকে না; GNOME Keyring / Seahorse-এর
মতো কোনো keychain viewer ব্যবহার করে, অথবা নিচের কমান্ড চালিয়ে সেগুলো উদ্ধার করুন:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` অনুসন্ধান করে **Keychain Access.app**-এ Keychain এন্ট্রিগুলো পাওয়া যাবে।

## ভলিউম-মাউন্ট বিকল্প (উন্নত)

আপনি চাইলে Zed কনফিগ ডিরেক্টরিটি শুধু-পঠনযোগ্য হিসেবে কনটেইনারে মাউন্ট করতে পারেন।
এটি keychain সমস্যার সমাধান করে না, তবে ভবিষ্যতে গোপনীয় নয় এমন Zed কনফিগ মান
(যেমন, মডেল পছন্দ) পড়ে এমন ফিচারের জন্য উপযোগী হতে পারে।

```yaml
# docker-compose.yml-এর অংশ
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux হোস্ট
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS হোস্ট (পরিবর্তে এটিকে আনকমেন্ট করুন)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ভবিষ্যতে: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

দ্রষ্টব্য: `ZED_CONFIG_PATH` environment variable override এখনো বাস্তবায়িত হয়নি। এই
ফিচারটি যোগ করা হলে ব্যবহারের রেফারেন্স হিসেবে এই স্নিপেটটি দেওয়া হয়েছে।

## Manual Import API

Manual import endpoint-টিকেও সরাসরি কল করা যায়:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "আমার Zed OpenAI কী"   // ঐচ্ছিক
}
```

সফল হলে এটি রিটার্ন করে:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## সমস্যা সমাধান

| লক্ষণ                                 | কারণ                                     | সমাধান                                        |
| ------------------------------------- | ---------------------------------------- | --------------------------------------------- |
| 422 + `zedDockerEnvironment: true`    | Docker-এর ভিতরে চলছে                     | Manual Token Import ট্যাব ব্যবহার করুন        |
| 404 + `zedInstalled: false`           | হোস্টে Zed ইনস্টল করা নেই                | Zed ইনস্টল করুন বা manual import ব্যবহার করুন |
| 403 + keychain অ্যাক্সেস প্রত্যাখ্যাত | OS keychain অ্যাক্সেস প্রত্যাখ্যান করেছে | OS প্রম্পটে অনুমতি দিন                        |
| 404 + keychain পরিষেবা উপলভ্য নয়     | Linux-এ `libsecret` অনুপস্থিত            | `libsecret-1-dev` ইনস্টল করুন                 |
