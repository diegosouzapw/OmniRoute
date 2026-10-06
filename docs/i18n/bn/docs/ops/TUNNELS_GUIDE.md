# Tunnels Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **প্রামাণিক উৎস:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **সর্বশেষ আপডেট:** 2026-06-28 — v3.8.40

OmniRoute তিনটি টানেল ব্যাকএন্ডের মাধ্যমে তার লোকাল সার্ভারকে (`http://localhost:20128`) সর্বজনীন
ইন্টারনেটে উন্মুক্ত করতে পারে। এটি যেসব ক্ষেত্রে উপযোগী:

- ক্লাউড প্রদানকারীদের (Antigravity, Gemini, Cursor) OAuth কলব্যাক, যেগুলোর জন্য একটি
  সর্বজনীনভাবে অ্যাক্সেসযোগ্য রিডাইরেক্ট URL প্রয়োজন।
- কোনো VM ডিপ্লয় না করেই সতীর্থদের সঙ্গে আপনার লোকাল ইনস্ট্যান্স শেয়ার করা।
- মোবাইল, রিমোট বা ক্রস-নেটওয়ার্ক টেস্টিং।

তিনটি ব্যাকএন্ডই ইন-প্রসেস ব্যবস্থাপিত হয় — OmniRoute ড্যাশবোর্ড বা REST API থেকে অন্তর্নিহিত
বাইনারি বা SDK চালু/বন্ধ করে। কোনো রিভার্স-প্রক্সি বা systemd সেটআপের
প্রয়োজন নেই।

## এক নজরে ব্যাকএন্ডসমূহ

| ব্যাকএন্ড                   | স্থায়িত্ব                                                   | খরচ                                 | সেটআপ                                                 |
| --------------------------- | ------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | অস্থায়ী (প্রতিবার পুনরায় চালু করলে URL পরিবর্তিত হয়)      | বিনামূল্যে                          | কিছুই নয় — `cloudflared` স্বয়ংক্রিয়ভাবে ইনস্টল করে |
| **ngrok**                   | পেইড প্ল্যান বা নির্দিষ্ট ডোমেইন কনফিগার করা থাকলে স্থিতিশীল | বিনামূল্যের স্তর + পেইড             | ngrok অ্যাকাউন্ট + authtoken প্রয়োজন                 |
| **Tailscale Funnel**        | আপনার tailnet-এর মধ্যে প্রতি নোডে স্থিতিশীল                  | ব্যক্তিগত ব্যবহারের জন্য বিনামূল্যে | Tailscale ইনস্টল + লগইন + Funnel ACL প্রয়োজন         |

ইমপ্লিমেন্টেশনগুলো `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` এবং `src/lib/tailscaleTunnel.ts`-এ রয়েছে। তিনটিই
`phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` এবং `lastError` ফিল্ডসহ একই আকৃতির একটি `status` অবজেক্ট রিটার্ন করে, যাতে ড্যাশবোর্ড সেগুলোকে একইভাবে রেন্ডার করতে পারে।

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` একটি চাইল্ড প্রসেস হিসেবে `cloudflared` চালায়। এটি
দুটি মোড সমর্থন করে, যার মধ্যে কোনটি ব্যবহৃত হবে তা একটি named-tunnel কনফিগ দেওয়া হয়েছে কি না তার ওপর নির্ভর করে:

- **Quick tunnel (ডিফল্ট)।** `cloudflared tunnel --url
http://localhost:<apiPort>` চালায় এবং stdout থেকে নির্ধারিত `*.trycloudflare.com` URL
  পার্স করে। URL-গুলো অস্থায়ী এবং প্রতিবার পুনরায় চালু করলে পরিবর্তিত হয়।
- **Named tunnel (ঐচ্ছিক)।** যখন `CLOUDFLARED_CONFIG` লোকালভাবে ব্যবস্থাপিত
  cloudflared `config.yml`-কে নির্দেশ করে, তখন OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` চালায়, যা আপনাকে একটি **স্থিতিশীল, নামযুক্ত হোস্টনেম** দেয়। কনফিগটি
  tunnel UUID, `credentials-file` এবং `ingress` রাউটিং সরবরাহ করে, তাই কোনো
  `--url` পাঠানো হয় না এবং কোনো Zero Trust ড্যাশবোর্ড টোকেনের প্রয়োজন হয় না। `run`
  কনফিগের অ্যাবসোলিউট `credentials-file` পাথ থেকে ক্রেডেনশিয়াল পড়ে — কোনো `cert.pem`
  প্রয়োজন হয় না (এটি কেবল টানেলের লাইফসাইকেল ব্যবস্থাপনার জন্য ব্যবহৃত হয়)।

মূল আচরণসমূহ:

- **স্বয়ংক্রিয় ইনস্টল।** প্রথমবার ব্যবহারের সময় OmniRoute অফিসিয়াল GitHub রিলিজ থেকে সর্বশেষ `cloudflared`
  বাইনারি ডাউনলোড করে (ব্যবস্থাপিত ইনস্টলটি
  `DATA_DIR/cloudflared/`-এর অধীনে থাকে)। এক্সিকিউশনের আগে ডাউনলোড করা অ্যাসেটের SHA256
  রিলিজ ম্যানিফেস্টের বিপরীতে যাচাই করা হয়।
- **প্রসেস তত্ত্বাবধান।** cloudflared PID এবং নির্ধারিত URL
  `quick-tunnel-state.json`-এ সংরক্ষিত হয়, যাতে ড্যাশবোর্ড রিলোডের পরও স্ট্যাটাস পুনরুদ্ধার করতে পারে।

### Named tunnel সেটআপ (স্থিতিশীল হোস্টনেম)

1. cloudflared CLI দিয়ে লোকালভাবে ব্যবস্থাপিত একটি টানেল তৈরি করুন (একবারই করতে হবে):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. OmniRoute-এর লোকাল API পোর্টে (ডিফল্ট 20128) আপনার হোস্টনেম রাউট করে এমন একটি
   `~/.cloudflared/config.yml` লিখুন:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute-কে কনফিগটির দিকে নির্দেশ করুন এবং টানেলটি (পুনরায়) চালু করুন:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ঐচ্ছিক — OmniRoute যে হোস্টনেম রিপোর্ট করে সেটি ওভাররাইড করে; অন্যথায়
   # কনফিগের প্রথম ingress নিয়ম থেকে পড়া হয়:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   quick tunnel-এর মতো একইভাবে টানেলটি সক্রিয় করুন (নিচে REST / ড্যাশবোর্ড / CLI
   দেখুন)। একটি named tunnel সংগ্রহ করার মতো কোনো public URL নির্গত করে না, তাই cloudflared-এর নিবন্ধিত edge connection থেকে
   প্রস্তুতি শনাক্ত করা হয় এবং `publicUrl`/`apiUrl`
   `CLOUDFLARED_HOSTNAME` (অথবা কনফিগের প্রথম ingress হোস্টনেম) থেকে রিপোর্ট করা হয়।

### REST-এর মাধ্যমে সক্রিয় / নিষ্ক্রিয় করুন

এন্ডপয়েন্টটি আলাদা `start`/`stop` পাথের পরিবর্তে একটি `{action: "enable" | "disable"}`
বডি ব্যবহার করে। ম্যানেজমেন্ট অথেন্টিকেশন (অ্যাডমিন সেশন বা অ্যাডমিন API key)
আবশ্যক।

```bash
# সক্রিয় করুন
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# স্ট্যাটাস
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# নিষ্ক্রিয় করুন
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

অথবা ড্যাশবোর্ডের মাধ্যমে: **Settings → Tunnels → Cloudflare**।

### ঐচ্ছিক env vars

| ভেরিয়েবল                                            | উদ্দেশ্য                                                                                                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | বাইনারি পাথ ওভাররাইড করে। এটি সেট করা এবং বৈধ হলে, OmniRoute ডাউনলোড করার পরিবর্তে এটি ব্যবহার করে।                                                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ট্রান্সপোর্ট প্রোটোকল (ডিফল্ট `http2`; এছাড়াও `quic`, `auto`)।                                                                                                                        |
| `CLOUDFLARED_CONFIG`                                 | স্থানীয়ভাবে পরিচালিত cloudflared `config.yml`-এর পাথ। এটি সেট করা থাকলে, OmniRoute একটি দ্রুত টানেলের পরিবর্তে একটি **নামযুক্ত/স্থায়ী** টানেল (`tunnel --config <path> run`) চালায়। |
| `CLOUDFLARED_HOSTNAME`                               | নামযুক্ত টানেলের প্রদর্শিত সর্বজনীন হোস্টনেম ওভাররাইড করে (যেমন `ai.example.com`)। সেট করা না থাকলে, কনফিগের প্রথম `ingress` হোস্টনেম থেকে পড়া হয়।                                   |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** ব্যবহার করে (একই প্রসেসের মধ্যে, কোনো CLI
সাবপ্রসেস নয়)। প্রথমবার চালু করার সময় নেটিভ মডিউলটি অলসভাবে ইমপোর্ট করা হয়, যাতে
প্রি-বিল্ট বাইনারিবিহীন প্ল্যাটফর্মে বুটের সময় অ্যাপটি বিকল না হয়।

### পূর্বশর্ত

1. <https://ngrok.com>-এ সাইন আপ করুন।
2. ngrok ড্যাশবোর্ড থেকে আপনার authtoken কপি করুন।
3. নিচের যেকোনো একটি উপায়ে এটি প্রদান করুন:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, অথবা
   - ড্যাশবোর্ড: **Settings → Tunnels → ngrok**, অথবা
   - REST body (একবারের জন্য): `{"action":"enable","authToken":"<token>"}`।

কোনোটিই কনফিগার করা না থাকলে, স্ট্যাটাসে `phase: "needs_auth"` ফেরত আসে।

### REST-এর মাধ্যমে সক্রিয় / নিষ্ক্রিয় করা

```bash
# সক্রিয় করুন (env থেকে NGROK_AUTHTOKEN ব্যবহার করে)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ইনলাইন টোকেন দিয়ে সক্রিয় করুন
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# স্ট্যাটাস
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# নিষ্ক্রিয় করুন
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

রেসপন্সে নির্ধারিত `publicUrl` অন্তর্ভুক্ত থাকে (যেমন
`https://abcd-1234.ngrok-free.app`)। কাস্টম ডোমেইন, অঞ্চল এবং পলিসি রুল
ngrok ড্যাশবোর্ডে কনফিগার করতে হবে — OmniRoute নিজে শুধু স্থানীয় টার্গেট URL-টি
SDK-তে ফরওয়ার্ড করে।

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` **Funnel**-এর (serve-এর জন্য Tailscale-এর পাবলিক-ইন্টারনেট
এগ্রেস) মাধ্যমে স্থানীয় API পোর্ট প্রকাশ করতে সিস্টেমের `tailscale` CLI পরিচালনা করে।
এটি সম্পূর্ণ লাইফসাইকেল সমর্থন করে: ইনস্টল, লগইন, ডেমন চালু করা, সক্রিয় করা, নিষ্ক্রিয় করা।

ইমপ্লিমেন্টেশনটি `tailscale funnel --bg <port>` (ব্যাকগ্রাউন্ড মোড) চালায়। পাবলিক
URL-এর বিন্যাস হলো `https://<machine>.<tailnet>.ts.net/`।

### পূর্বশর্ত

1. Tailscale ইনস্টল করুন (অথবা OmniRoute-কে এটি করতে দিন — নিচের `install` এন্ডপয়েন্ট দেখুন)।
2. সাইন ইন করুন (`tailscale login` অথবা OmniRoute-এর `login` এন্ডপয়েন্টের মাধ্যমে)।
3. Tailscale অ্যাডমিন কনসোলে আপনার tailnet-এর জন্য Funnel সক্রিয় করুন:
   <https://login.tailscale.com/admin/settings/features>।

Linux ও macOS-এ ডেমন (`tailscaled`) নিয়ন্ত্রণ করতে `sudo` প্রয়োজন। POST
এন্ডপয়েন্টগুলো ঐচ্ছিক `sudoPassword` ফিল্ড গ্রহণ করে, যা কলের সময়কালের জন্য
OmniRoute-এর MITM পাসওয়ার্ড ক্যাশে (`getCachedPassword` / `setCachedPassword`)
ফরওয়ার্ড করা হয়। Windows ডিফল্ট সার্ভিস ইনস্টলেশন
`C:\Program Files\Tailscale\tailscale.exe` ব্যবহার করে।

### REST এন্ডপয়েন্ট

Tailscale-এর ক্ষেত্রটি অন্যান্য ব্যাকএন্ডের তুলনায় আরও বিস্তৃত, কারণ ইনস্টলেশন,
লগইন, ডেমন এবং টানেল পৃথক বিষয়।

| এন্ডপয়েন্ট                           | মেথড   | উদ্দেশ্য                                                            |
| ------------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | সমন্বিত টানেল স্ট্যাটাস (`phase`, `tunnelUrl`, `apiUrl` ইত্যাদি)    |
| `/api/tunnels/tailscale/check`        | `GET`  | নিম্ন-স্তরের পরীক্ষা: ইনস্টল করা? লগইন করা? ডেমন চলছে?              |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale ইনস্টল করা (SSE-স্ট্রিম করা অগ্রগতি ইভেন্ট) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS-এ `tailscaled` চালু করা                                 |
| `/api/tunnels/tailscale/login`        | `POST` | লগইন প্রবাহ শুরু করা; ব্রাউজারে খোলার জন্য `authUrl` ফেরত দেয়      |
| `/api/tunnels/tailscale/enable`       | `POST` | API পোর্টের জন্য Funnel চালু করা                                    |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel বন্ধ করা                                                     |

সব Tailscale এন্ডপয়েন্টে ম্যানেজমেন্ট অথ প্রয়োজন (`routeUtils.ts ::
requireTailscaleAuth` দেখুন)।

সক্রিয় করার উদাহরণ:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

অ্যাডমিন কনসোলে Funnel সক্রিয় না থাকলে, রেসপন্সে
`funnelNotEnabled: true` এবং ব্রাউজারে খোলার জন্য একটি `enableUrl` অন্তর্ভুক্ত থাকে।

### ঐচ্ছিক env ভ্যারিয়েবল

| ভ্যারিয়েবল     | উদ্দেশ্য                              |
| --------------- | ------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` বাইনারির পাথ ওভাররাইড করা |

## এন্ডপয়েন্টের সারসংক্ষেপ

| এন্ডপয়েন্ট                           | মেথড   | বডি                                 | অথেন্টিকেশন |
| ------------------------------------- | ------ | ----------------------------------- | ----------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management  |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management  |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management  |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management  |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management  |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management  |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management  |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management  |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management  |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management  |

কোনো কেন্দ্রীয় `/api/settings/tunnels` এন্ডপয়েন্ট নেই — প্রতিটি ব্যাকএন্ড
স্বতন্ত্র।

## OAuth কলব্যাক-সংক্রান্ত বিবেচনা

আপনি যখন কোনো টানেলের মাধ্যমে OmniRoute উন্মুক্ত করেন, তখন ড্যাশবোর্ড এবং OAuth ফ্লোগুলোকে
`localhost` নয়, বরং **পাবলিক** হোস্টনেমের ভিত্তিতে কলব্যাক URL তৈরি করতে হবে। অন্যথায়
OAuth প্রদানকারী ব্যবহারকারীকে এমন একটি URL-এ ফেরত পাঠাবে যেখানে তার সার্ভারগুলো পৌঁছাতে পারে না,
ফলে হ্যান্ডশেক ব্যর্থ হবে।

ড্যাশবোর্ডে সম্পাদনা এবং সেটিংস সংরক্ষণের জন্য টানেলের হোস্টনেমকে
`NEXT_PUBLIC_BASE_URL`-এ নির্দিষ্ট করে রাখার প্রয়োজন নেই। প্রমাণীকৃত ড্যাশবোর্ড একই অরিজিনে অনিরাপদ
অনুরোধগুলো একটি সেশন-সংযুক্ত CSRF টোকেনসহ পাঠায়, তাই লগইন করার পর ক্ষণস্থায়ী Cloudflare Quick Tunnel
হোস্টগুলোও স্বাভাবিক UI ব্যবস্থাপনার জন্য ব্যবহার করা যেতে পারে।

সেট করুন:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

এবং OAuth শুরু করার আগে OmniRoute পুনরায় চালু করুন। ক্ষণস্থায়ী Cloudflare Quick
Tunnel-এর URL প্রতিবার পুনরায় চালু করার পর পরিবর্তিত হয়, তাই প্রোডাকশনে OAuth ব্যবহারের জন্য সংরক্ষিত
ডোমেইনসহ ngrok অথবা Tailscale Funnel ব্যবহার করাই শ্রেয়।

## স্বাস্থ্য ও পর্যবেক্ষণ

ড্যাশবোর্ডে **Settings → Tunnels**-এর অধীনে টানেলের অবস্থা দেখানো হয়:

- সক্রিয় ব্যাকএন্ড(গুলো) এবং বর্তমান `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`)।
- বর্তমান পাবলিক URL এবং তা থেকে নির্ণীত API URL (`<publicUrl>/v1`)।
- টানেলটি যে লোকাল টার্গেট URL-এ ফরোয়ার্ড করছে।
- সর্বশেষ ত্রুটি বার্তা, যদি থাকে।

প্রোগ্রামভিত্তিক পর্যবেক্ষণের জন্য প্রতিটি ব্যাকএন্ডের `GET` এন্ডপয়েন্ট নিয়মিত পোল করুন। একই সঙ্গে একাধিক
ব্যাকএন্ড চালানোর অনুমতি রয়েছে; OmniRoute প্রতিটিকে
স্বতন্ত্রভাবে ট্র্যাক করবে।

## সমস্যা সমাধান

### "cloudflared বাইনারি পাওয়া যায়নি"

OmniRoute প্রথমবার ব্যবহারের সময় স্বয়ংক্রিয়ভাবে ইনস্টল করার চেষ্টা করে। ইনস্টলেশন বাধাগ্রস্ত হলে
(সীমাবদ্ধ নেটওয়ার্ক, GitHub-এ প্রবেশাধিকার নেই), <https://github.com/cloudflare/cloudflared/releases>
থেকে `cloudflared` ম্যানুয়ালি ডাউনলোড করুন এবং
`CLOUDFLARED_BIN=/path/to/cloudflared` সেট করুন।

### "ngrok: authtoken আবশ্যক"

`phase: "needs_auth"`-এর অর্থ কোনো authtoken পাওয়া যায়নি। `.env`-এ
`NGROK_AUTHTOKEN` সেট করুন, ড্যাশবোর্ডের মাধ্যমে এটি কনফিগার করুন, অথবা সক্রিয়করণের POST
বডিতে `authToken` পাঠান।

### "tailscale: funnel সক্রিয় নয়"

সক্রিয়করণের রেসপন্সে `funnelNotEnabled: true` থাকলে, আপনার tailnet-এর জন্য Funnel নিষ্ক্রিয়
রয়েছে। ফেরত পাওয়া `enableUrl` (অথবা অ্যাডমিন কনসোলের ফিচার
পৃষ্ঠা) খুলুন এবং Funnel চালু করুন।

### টানেলের URL পরিবর্তন হলে OAuth কাজ করে না

সংরক্ষিত ডোমেইনসহ ngrok অথবা Tailscale Funnel ব্যবহার করুন (দুটিই প্রতিটি নোডের জন্য স্থিতিশীল)।
Cloudflare Quick Tunnel নকশাগতভাবেই ক্ষণস্থায়ী এবং দীর্ঘমেয়াদি
OAuth কলব্যাকের জন্য সুপারিশ করা হয় না।

### Tailscale-এর ক্ষেত্রে Linux/macOS-এ অনুমতি প্রত্যাখ্যাত

`tailscaled`-এর root অনুমতি প্রয়োজন। সংশ্লিষ্ট POST এন্ডপয়েন্টে `sudoPassword` দিন,
অথবা ডেমনটি নিজে চালান (`sudo systemctl start tailscaled`)।

## আরও দেখুন

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — বহির্গামী ট্রাফিকের জন্য আউটবাউন্ড প্রক্সি (1proxy, SOCKS5, HTTP)।
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL`-সহ এনভায়রনমেন্ট ভেরিয়েবলের সম্পূর্ণ তালিকা।
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — স্থিতিশীল পাবলিক হোস্টিংয়ের জন্য টানেলিংয়ের বিকল্প।
- সোর্স: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`।
