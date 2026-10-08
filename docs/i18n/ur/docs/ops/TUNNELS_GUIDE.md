# Tunnels Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **حتمی ماخذ:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`، `src/app/api/tunnels/`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute اپنے مقامی سرور (`http://localhost:20128`) کو تین ٹنل بیک اینڈز کے ذریعے عوامی
انٹرنیٹ پر قابلِ رسائی بنا سکتا ہے۔ یہ درج ذیل صورتوں میں مفید ہے:

- کلاؤڈ فراہم کنندگان (Antigravity، Gemini، Cursor) کی OAuth کال بیکس، جن کے لیے
  عوامی طور پر قابلِ رسائی ری ڈائریکٹ URL درکار ہوتا ہے۔
- کسی VM کو تعینات کیے بغیر اپنی مقامی انسٹینس کو ٹیم کے ساتھیوں کے ساتھ شیئر کرنا۔
- موبائل، ریموٹ، یا مختلف نیٹ ورکس کے درمیان ٹیسٹنگ۔

تینوں بیک اینڈز اسی پراسیس کے اندر منظم کیے جاتے ہیں — OmniRoute ڈیش بورڈ یا REST API سے
بنیادی بائنری یا SDK کو شروع/بند کرتا ہے۔ کسی ریورس پراکسی یا systemd سیٹ اپ کی
ضرورت نہیں ہے۔

## بیک اینڈز کا ایک جائزہ

| بیک اینڈ                    | برقرار رہنے کی نوعیت                               | لاگت                    | سیٹ اپ                                                |
| --------------------------- | -------------------------------------------------- | ----------------------- | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | عارضی (ہر بار دوبارہ شروع کرنے پر URL بدل جاتا ہے) | مفت                     | کچھ نہیں — `cloudflared` خودکار طور پر انسٹال ہوتا ہے |
| **ngrok**                   | بامعاوضہ پلان یا مستقل ڈومین کنفیگر ہونے تک مستحکم | مفت درجہ + بامعاوضہ     | ngrok اکاؤنٹ + authtoken درکار ہے                     |
| **Tailscale Funnel**        | آپ کے tailnet میں ہر نوڈ کے لیے مستحکم             | ذاتی استعمال کے لیے مفت | Tailscale کی تنصیب + لاگ اِن + Funnel ACL درکار ہے    |

ان کے نفاذ `src/lib/cloudflaredTunnel.ts`،
`src/lib/ngrokTunnel.ts`، اور `src/lib/tailscaleTunnel.ts` میں موجود ہیں۔ تینوں ایک
یکساں ساخت والا `status` آبجیکٹ واپس کرتے ہیں، جس میں `phase`، `running`، `publicUrl`،
`apiUrl`، `targetUrl`، اور `lastError` فیلڈز شامل ہوتے ہیں، تاکہ ڈیش بورڈ انہیں یکساں طور پر دکھا سکے۔

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`، `cloudflared` کو چائلڈ پراسیس کے طور پر چلاتا ہے۔ یہ
دو موڈز کی معاونت کرتا ہے، جن کا انتخاب اس بنیاد پر ہوتا ہے کہ named-tunnel کنفگ فراہم کی گئی ہے یا نہیں:

- **Quick tunnel (ڈیفالٹ)۔** `cloudflared tunnel --url
http://localhost:<apiPort>` چلاتا ہے اور stdout سے تفویض کردہ `*.trycloudflare.com` URL
  اخذ کرتا ہے۔ URLs عارضی ہوتے ہیں اور ہر بار دوبارہ شروع کرنے پر بدل جاتے ہیں۔
- **Named tunnel (اختیاری)۔** جب `CLOUDFLARED_CONFIG` مقامی طور پر منظم کردہ
  cloudflared `config.yml` کی جانب اشارہ کرتا ہے، تو OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` چلاتا ہے، جس سے آپ کو ایک **مستحکم، نام زد hostname** ملتا ہے۔ کنفگ
  ٹنل UUID، `credentials-file`، اور `ingress` روٹنگ فراہم کرتی ہے، اس لیے
  `--url` پاس نہیں کیا جاتا اور کسی Zero Trust ڈیش بورڈ ٹوکن کی ضرورت نہیں ہوتی۔ `run`
  کنفگ کے مطلق `credentials-file` پاتھ سے اسناد پڑھتا ہے — `cert.pem`
  کی ضرورت نہیں ہوتی (یہ صرف ٹنل لائف سائیکل مینجمنٹ کے لیے استعمال ہوتا ہے)۔

اہم طرزِ عمل:

- **خودکار تنصیب۔** پہلی بار استعمال ہونے پر، OmniRoute سرکاری GitHub ریلیزز سے تازہ ترین `cloudflared`
  بائنری ڈاؤن لوڈ کرتا ہے (منظم تنصیب `DATA_DIR/cloudflared/` کے تحت ہوتی ہے)۔
  عمل درآمد سے پہلے ڈاؤن لوڈ کردہ اثاثے کے SHA256 کی ریلیز مینی فیسٹ کے مقابل تصدیق کی جاتی ہے۔
- **پراسیس نگرانی۔** cloudflared PID اور متعین شدہ URL کو
  `quick-tunnel-state.json` میں محفوظ کیا جاتا ہے، تاکہ ڈیش بورڈ دوبارہ لوڈ ہونے کے بعد بھی اسٹیٹس بحال کر سکے۔

### Named tunnel سیٹ اپ (مستحکم hostname)

1. cloudflared CLI کے ساتھ مقامی طور پر منظم کردہ ٹنل بنائیں (صرف ایک بار):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. ایک `~/.cloudflared/config.yml` لکھیں جو آپ کے hostname کو OmniRoute کے مقامی
   API پورٹ (ڈیفالٹ 20128) کی طرف روٹ کرے:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute کو کنفگ کی جانب اشارہ کروائیں اور ٹنل کو (دوبارہ) شروع کریں:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # اختیاری — OmniRoute کے رپورٹ کردہ hostname کو اوور رائیڈ کرتا ہے؛ بصورتِ دیگر اسے
   # کنفگ کے پہلے ingress اصول سے پڑھا جاتا ہے:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   ٹنل کو quick tunnel ہی کی طرح فعال کریں (REST / ڈیش بورڈ / ذیل میں CLI)۔
   named tunnel اخذ کرنے کے لیے کوئی عوامی URL خارج نہیں کرتا، اس لیے تیاری کی حالت کا پتہ
   cloudflared کے رجسٹرڈ edge کنکشن سے لگایا جاتا ہے، اور `publicUrl`/`apiUrl` کو
   `CLOUDFLARED_HOSTNAME` (یا کنفگ کے پہلے ingress hostname) سے رپورٹ کیا جاتا ہے۔

### REST کے ذریعے فعال / غیر فعال کریں

اینڈ پوائنٹ الگ `start`/`stop` پاتھز کے بجائے `{action: "enable" | "disable"}` باڈی استعمال کرتا ہے۔
مینجمنٹ کی توثیق (ایڈمن سیشن یا ایڈمن API کلید) درکار ہے۔

```bash
# فعال کریں
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# اسٹیٹس
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# غیر فعال کریں
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

یا ڈیش بورڈ کے ذریعے: **Settings → Tunnels → Cloudflare**۔

### اختیاری env vars

| متغیر                                                | مقصد                                                                                                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | بائنری کا راستہ اوور رائیڈ کرتا ہے۔ اگر یہ سیٹ اور درست ہو، تو OmniRoute اسے ڈاؤن لوڈ کرنے کے بجائے استعمال کرتا ہے۔                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | ٹرانسپورٹ پروٹوکول (ڈیفالٹ `http2`؛ نیز `quic`، `auto`)۔                                                                                                                |
| `CLOUDFLARED_CONFIG`                                 | مقامی طور پر منظم کردہ cloudflared `config.yml` کا راستہ۔ اسے سیٹ کرنے پر، OmniRoute فوری ٹنل کے بجائے ایک **نامزد/مستقل** ٹنل (`tunnel --config <path> run`) چلاتا ہے۔ |
| `CLOUDFLARED_HOSTNAME`                               | نامزد ٹنل کے رپورٹ کردہ عوامی ہوسٹ نیم کو اوور رائیڈ کرتا ہے (مثلاً `ai.example.com`)۔ سیٹ نہ ہونے پر، اسے کنفیگ کے پہلے `ingress` ہوسٹ نیم سے پڑھا جاتا ہے۔            |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** استعمال کرتی ہے (اسی پراسیس کے اندر، کوئی CLI
ذیلی پراسیس نہیں)۔ مقامی ماڈیول کو پہلی بار شروع کرتے وقت مؤخر انداز میں درآمد کیا جاتا ہے تاکہ
پہلے سے تیار شدہ بائنریز کے بغیر پلیٹ فارمز بوٹ کے وقت ایپ کو متاثر نہ کریں۔

### پیشگی تقاضے

1. <https://ngrok.com> پر سائن اپ کریں۔
2. ngrok ڈیش بورڈ سے اپنا authtoken کاپی کریں۔
3. اسے درج ذیل میں سے کسی ایک طریقے سے فراہم کریں:
   - `.env`: `NGROK_AUTHTOKEN=<token>`، یا
   - ڈیش بورڈ: **Settings → Tunnels → ngrok**، یا
   - REST باڈی (ایک بار کے لیے): `{"action":"enable","authToken":"<token>"}`۔

اگر ان میں سے کوئی بھی تشکیل شدہ نہ ہو تو اسٹیٹس `phase: "needs_auth"` واپس کرتا ہے۔

### REST کے ذریعے فعال / غیر فعال کریں

```bash
# فعال کریں (env سے NGROK_AUTHTOKEN استعمال کرتا ہے)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# اِن لائن ٹوکن کے ساتھ فعال کریں
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# اسٹیٹس
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# غیر فعال کریں
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

جواب میں تفویض کردہ `publicUrl` شامل ہوتا ہے (مثلاً
`https://abcd-1234.ngrok-free.app`)۔ حسبِ ضرورت ڈومینز، ریجنز، اور پالیسی قواعد
ngrok ڈیش بورڈ میں تشکیل دینا ضروری ہے — خود OmniRoute صرف مقامی ہدف URL کو
SDK کی جانب فارورڈ کرتا ہے۔

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` مقامی API پورٹ کو **Funnel** (serve کے لیے Tailscale کا
عوامی انٹرنیٹ اخراج) کے ذریعے ظاہر کرنے کے لیے سسٹم `tailscale` CLI کو منظم کرتی ہے۔
یہ مکمل لائف سائیکل کی معاونت کرتی ہے: تنصیب، لاگ اِن، ڈیمَن شروع کرنا، فعال کرنا، غیر فعال کرنا۔

عمل درآمد `tailscale funnel --bg <port>` (پس منظر موڈ) کو چلاتا ہے۔ عوامی URL کی
شکل `https://<machine>.<tailnet>.ts.net/` ہوتی ہے۔

### پیشگی تقاضے

1. Tailscale انسٹال کریں (یا OmniRoute کو یہ کام کرنے دیں — ذیل میں `install` اینڈ پوائنٹ دیکھیں)۔
2. سائن اِن کریں (`tailscale login` یا OmniRoute کے `login` اینڈ پوائنٹ کے ذریعے)۔
3. Tailscale ایڈمن کنسول میں اپنے tailnet کے لیے Funnel فعال کریں:
   <https://login.tailscale.com/admin/settings/features>۔

Linux اور macOS پر ڈیمَن (`tailscaled`) کو کنٹرول کرنے کے لیے `sudo` درکار ہوتا ہے۔
POST اینڈ پوائنٹس ایک اختیاری `sudoPassword` فیلڈ قبول کرتے ہیں، جسے کال کے دورانیے
کے لیے OmniRoute کے MITM پاس ورڈ کیش (`getCachedPassword` / `setCachedPassword`) کو
فارورڈ کیا جاتا ہے۔ Windows پر ڈیفالٹ سروس تنصیب
`C:\Program Files\Tailscale\tailscale.exe` استعمال ہوتی ہے۔

### REST اینڈ پوائنٹس

Tailscale کا دائرۂ کار دوسرے بیک اینڈز سے زیادہ وسیع ہے کیونکہ تنصیب،
لاگ اِن، ڈیمَن، اور ٹنل الگ الگ معاملات ہیں۔

| اینڈ پوائنٹ                           | طریقہ  | مقصد                                                                      |
| ------------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | مجموعی ٹنل اسٹیٹس (`phase`، `tunnelUrl`، `apiUrl` وغیرہ)                  |
| `/api/tunnels/tailscale/check`        | `GET`  | نچلی سطح کی جانچ: انسٹال ہے؟ لاگ اِن ہے؟ ڈیمَن چل رہا ہے؟                 |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale انسٹال کریں (SSE کے ذریعے پیش رفت کے واقعات) — Linux/macOS      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS پر `tailscaled` شروع کریں                                     |
| `/api/tunnels/tailscale/login`        | `POST` | لاگ اِن کا عمل شروع کریں؛ براؤزر میں کھولنے کے لیے `authUrl` واپس کرتا ہے |
| `/api/tunnels/tailscale/enable`       | `POST` | API پورٹ کے لیے Funnel شروع کریں                                          |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel روکیں                                                              |

تمام Tailscale اینڈ پوائنٹس کے لیے انتظامی توثیق درکار ہے (`routeUtils.ts ::
requireTailscaleAuth` دیکھیں)۔

فعال کرنے کی مثال:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

اگر ایڈمن کنسول میں Funnel فعال نہ ہو تو جواب میں
`funnelNotEnabled: true` کے ساتھ براؤزر میں کھولنے کے لیے ایک `enableUrl` شامل ہوتا ہے۔

### اختیاری env متغیرات

| متغیر           | مقصد                                       |
| --------------- | ------------------------------------------ |
| `TAILSCALE_BIN` | `tailscale` بائنری پاتھ کو اوور رائیڈ کریں |

## اینڈ پوائنٹس کا خلاصہ

| اینڈ پوائنٹ                           | طریقہ  | باڈی                                | توثیق   |
| ------------------------------------- | ------ | ----------------------------------- | ------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | انتظامی |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | انتظامی |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | انتظامی |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | انتظامی |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | انتظامی |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | انتظامی |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | انتظامی |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | انتظامی |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | انتظامی |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | انتظامی |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | انتظامی |

کوئی مرکزی `/api/settings/tunnels` اینڈ پوائنٹ موجود نہیں ہے — ہر بیک اینڈ
آزادانہ کام کرتا ہے۔

## OAuth کال بیک سے متعلق غور طلب امور

جب آپ OmniRoute کو کسی ٹنل کے ذریعے قابل رسائی بناتے ہیں، تو ڈیش بورڈ اور OAuth فلو کو
کال بیک URLs، `localhost` کے بجائے **عوامی** ہوسٹ نیم کی بنیاد پر بنانے چاہئیں۔ بصورتِ دیگر
OAuth فراہم کنندہ صارف کو ایسے URL پر واپس بھیجتا ہے جس تک اس کے سرورز رسائی حاصل نہیں کر سکتے،
اور ہینڈ شیک ناکام ہو جاتا ہے۔

ڈیش بورڈ میں ترامیم اور ترتیبات محفوظ کرنے کے لیے ٹنل ہوسٹ نیم کو
`NEXT_PUBLIC_BASE_URL` میں مستقل مقرر کرنا ضروری نہیں ہے۔ توثیق شدہ ڈیش بورڈ، سیشن سے منسلک
CSRF ٹوکن کے ساتھ اسی اوریجن پر غیر محفوظ درخواستیں بھیجتا ہے، اس لیے لاگ اِن کرنے کے بعد عارضی Cloudflare Quick Tunnel
ہوسٹس کو بھی معمول کی UI مینجمنٹ کے لیے استعمال کیا جا سکتا ہے۔

یہ مقرر کریں:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

اور OAuth شروع کرنے سے پہلے OmniRoute کو دوبارہ شروع کریں۔ عارضی Cloudflare Quick
Tunnels کے لیے URL ہر مرتبہ دوبارہ شروع کرنے پر تبدیل ہو جاتا ہے، اس لیے پروڈکشن میں OAuth کے استعمال کے لیے محفوظ شدہ
ڈومین کے ساتھ ngrok یا Tailscale Funnel کو ترجیح دیں۔

## صحت اور نگرانی

ڈیش بورڈ، **Settings → Tunnels** کے تحت ٹنل کی حالت دکھاتا ہے:

- فعال بیک اینڈ اور موجودہ `phase` (`stopped`، `starting`، `running`،
  `needs_auth`، `error`)۔
- موجودہ عوامی URL اور اس سے اخذ کردہ API URL (`<publicUrl>/v1`)۔
- وہ مقامی ہدف URL جس کی طرف ٹنل ٹریفک فارورڈ کر رہا ہے۔
- آخری خرابی کا پیغام، اگر کوئی ہو۔

پروگرامیٹک نگرانی کے لیے ہر بیک اینڈ کے `GET` اینڈ پوائنٹس کو وقفے وقفے سے پول کریں۔ بیک وقت ایک سے زیادہ
بیک اینڈ چلانے کی اجازت ہے؛ OmniRoute ہر ایک کو
آزادانہ طور پر ٹریک کرے گا۔

## مسائل کا حل

### "cloudflared بائنری نہیں ملی"

OmniRoute پہلے استعمال پر خودکار انسٹالیشن کی کوشش کرتا ہے۔ اگر انسٹالیشن مسدود ہو
(محدود نیٹ ورک، GitHub تک رسائی نہ ہونا)، تو `cloudflared` کو
<https://github.com/cloudflare/cloudflared/releases> سے دستی طور پر ڈاؤن لوڈ کریں اور
`CLOUDFLARED_BIN=/path/to/cloudflared` مقرر کریں۔

### "ngrok: authtoken درکار ہے"

`phase: "needs_auth"` کا مطلب ہے کہ کوئی authtoken نہیں ملا۔ `.env` میں
`NGROK_AUTHTOKEN` مقرر کریں، اسے ڈیش بورڈ کے ذریعے تشکیل دیں، یا فعال کرنے والی POST
باڈی میں `authToken` فراہم کریں۔

### "tailscale: funnel فعال نہیں ہے"

جب فعال کرنے کے جواب میں `funnelNotEnabled: true` شامل ہو، تو آپ کے tailnet کے لیے Funnel غیر فعال
ہے۔ واپس کیے گئے `enableUrl` (یا ایڈمن کنسول کے فیچر
صفحے) کو کھولیں اور Funnel کو فعال کریں۔

### ٹنل URL کی تبدیلیاں OAuth کو ناکام کر دیتی ہیں

محفوظ شدہ ڈومین کے ساتھ ngrok یا Tailscale Funnel استعمال کریں (دونوں فی نوڈ مستحکم ہیں)۔
Cloudflare Quick Tunnels ڈیزائن کے لحاظ سے عارضی ہیں اور طویل مدتی
OAuth کال بیکس کے لیے تجویز نہیں کیے جاتے۔

### Linux/macOS پر Tailscale کے لیے اجازت مسترد ہونا

`tailscaled` کو root درکار ہے۔ متعلقہ POST اینڈ پوائنٹ کو `sudoPassword` فراہم کریں،
یا daemon خود چلائیں (`sudo systemctl start tailscaled`)۔

## یہ بھی دیکھیں

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ایگریس ٹریفک کے لیے آؤٹ باؤنڈ پراکسی (1proxy، SOCKS5، HTTP)۔
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — env vars کی مکمل فہرست، بشمول
  `NEXT_PUBLIC_BASE_URL`۔
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)،
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — مستحکم عوامی ہوسٹنگ کے لیے ٹنلنگ کے متبادل۔
- ماخذ: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`،
  `src/app/api/tunnels/`۔
