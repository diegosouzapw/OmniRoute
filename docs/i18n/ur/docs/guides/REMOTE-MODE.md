# Remote Mode (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

اپنے لیپ ٹاپ پر `omniroute` CLI چلائیں جبکہ OmniRoute خود کسی اور جگہ چل رہا ہو
(ایک VPS، ہوم سرور، یا آپ کے Tailnet پر کوئی دوسری مشین)۔ آپ
`omniroute connect` کے ذریعے ایک بار لاگ اِن کرتے ہیں، اور اس کے بعد **ہر** CLI کمانڈ اسی ریموٹ
سرور کو ہدف بناتی ہے — وہی کمانڈز، وہی آؤٹ پٹ، بس ریموٹ پر چلائی جاتی ہیں۔

انسٹال کرنے کے لیے کوئی دوسرا ٹول نہیں ہے: ریموٹ موڈ باقاعدہ `omniroute` CLI
اور محدود دائرۂ اختیار والے **access tokens** استعمال کرتا ہے۔

```bash
npm install -g omniroute                 # معمول کا CLI
omniroute connect 192.168.0.15           # لاگ اِن کریں (پاس ورڈ → محدود دائرۂ اختیار والا ٹوکن)
omniroute models list                    # ← اب ریموٹ سرور کے ماڈلز کی فہرست دکھاتا ہے
omniroute configure codex                # ← ریموٹ کیٹلاگ سے مقامی Codex پروفائل لکھتا ہے
```

---

## یہ کیسے کام کرتا ہے

```
آپ کا لیپ ٹاپ                           ریموٹ OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (پاس ورڈ → ٹوکن)           │
│  context: vps      │ ───────────────►  │ محدود دائرۂ اختیار والا access token بناتا ہے │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ ہر انتظامی روٹ، ٹوکن کے دائرۂ  │
│ کنفیگریشنز         │ ◄───────────────  │ اختیار کے مطابق جانچا جاتا ہے │
│ مقامی طور پر لکھتا ہے │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contexts** میں ہر ایک کے لیے ایک سرور محفوظ ہوتا ہے (`~/.omniroute/config.json`، `chmod 600`)۔
  `omniroute contexts use <name>` فعال سرور تبدیل کرتا ہے؛ `default` مقامی ہوتا ہے۔
- **Access tokens** (`oma_live_…`) انتظامی کمانڈز کو مجاز بناتے ہیں۔ یہ
  inference API keys (`sk-…`، جو `/v1/chat/completions` کے لیے استعمال ہوتی ہیں) سے الگ ہیں۔
- سرور کی جانب صرف ٹوکن کا SHA-256 hash محفوظ کیا جاتا ہے۔ سادہ متن
  تخلیق کے وقت **صرف ایک بار** دکھایا جاتا ہے۔

---

## کنیکٹ کرنا

### انتظامی پاس ورڈ کے ساتھ (ابتدائی سیٹ اپ)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 کے لیے انتظامی پاس ورڈ: ********
# ✔ http://192.168.0.15:20128 سے کنیکٹ ہو گیا — context '192.168.0.15' (دائرۂ اختیار: admin)
```

پاس ورڈ والا طریقہ بطور ڈیفالٹ ایک **admin** ٹوکن بناتا ہے (چونکہ پاس ورڈ آپ کے پاس ہے،
اس لیے آپ کے پاس پہلے ہی مکمل کنٹرول ہے)۔ `--scope` کے ذریعے دائرۂ اختیار محدود کریں:

```bash
omniroute connect 192.168.0.15 --scope write
```

اختیارات: `--port <p>` (جب ہوسٹ میں پورٹ موجود نہ ہو)، `--name <ctx>` (context کا نام)،
`--scope read|write|admin`۔ مکمل URL کو جوں کا توں استعمال کیا جاتا ہے:
`omniroute connect https://omni.example.com`۔

### پہلے سے تیار کردہ ٹوکن کے ساتھ

ڈیش بورڈ میں (یا `omniroute tokens create` کے ذریعے) محدود دائرۂ اختیار والا ٹوکن بنائیں اور
اسے پیسٹ کریں — پاس ورڈ کی ضرورت نہیں:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI اسے `GET /api/cli/whoami` کے ذریعے توثیق کرتا ہے اور فعال context کے طور پر محفوظ کر لیتا ہے۔

---

## دائرۂ اختیار

تین درجہ وار سطحیں (`admin ⊃ write ⊃ read`):

| دائرۂ اختیار | کیا کر سکتا ہے                                                                        |
| ------------ | ------------------------------------------------------------------------------------- |
| `read`       | فہرست/معائنہ — `models list`، `providers status`، `logs`، `usage`، `cost`             |
| `write`      | read **+** کنفیگر/لاگو کرنا — `setup-codex`، `keys add`، `config set`، combos         |
| `admin`      | write **+** انتظام کرنا — `tokens` CRUD، providers شامل کرنا، services، policy، oauth |

سرور ہر روٹ کے لیے درکار دائرۂ اختیار کا تعین HTTP method
(`GET`→read، تبدیلیاں→write) کے ساتھ حساس حصوں کی admin allowlist
(`/api/cli/tokens`، `/api/providers` کی تبدیلیاں، `/api/oauth`، `/api/services`، …)
سے کرتا ہے۔ ناکافی دائرۂ اختیار والے ٹوکن کو واضح پیغام کے ساتھ `403` ملتا ہے۔

> وہ روٹس جو پراسیسز شروع کرتے ہیں (`/api/services/*`، `/api/mcp/*`، …)
> **صرف loopback** تک محدود رہتے ہیں — دائرۂ اختیار سے قطع نظر، ریموٹ ٹوکن کبھی ان تک رسائی حاصل نہیں کر سکتا۔

---

## ریموٹ انسٹالیشن پر Antigravity کو منسلک کرنا

Antigravity، Google کی firstparty/nativeapp رضامندی اسکرین استعمال کرتا ہے۔ Google صرف اسی وقت اجازت کا کوڈ جاری کرتا ہے جب **loopback redirect**
(`http://127.0.0.1:<port>/callback`) اس براؤزر سے **قابلِ رسائی ہو جو sign-in کی منظوری دیتا ہے**۔ ریموٹ VPS انسٹالیشن پر یہ loopback آپ کی مشین کے بجائے سرور پر موجود ہوتا ہے، اس لیے رضامندی اسکرین **ہمیشہ کے لیے اٹک جاتی ہے اور کبھی کوڈ جاری نہیں کرتی** — عام "callback URL پیسٹ کریں" متبادل میں پیسٹ کرنے کے لیے کچھ نہیں ہوتا۔ (یہ Google کی جانب سے عائد کردہ پابندی ہے: یہی مسئلہ ہر اس proxy میں پیش آتا ہے جو شامل شدہ Antigravity desktop client استعمال کرتا ہے، صرف OmniRoute میں نہیں۔)

dashboard آپ کے پھنسنے سے پہلے ہی اس کا پتہ لگا لیتا ہے: کسی non-localhost پتے سے **Providers → Antigravity →
Connect** کھولنے پر عمومی "callback URL کاپی کریں" نوٹس کی جگہ ذیل کے دو حل دکھائے جاتے ہیں، جن میں آپ کا host اور port پہلے ہی درج ہوتا ہے۔
(LAN پتہ بھی اسی زمرے میں آتا ہے — اس callback کے لحاظ سے `192.168.x.x` localhost نہیں ہے۔)

Antigravity کو ریموٹ OmniRoute سے منسلک کرنے کے دو معاونت یافتہ طریقے ہیں۔

### اختیار A — مقامی login helper (تجویز کردہ)

OAuth کو **اپنے کمپیوٹر پر** چلائیں، جہاں `127.0.0.1` قابلِ رسائی ہو۔ helper براہِ راست Google سے رابطہ کرتا ہے، اس لیے رضامندی کا عمل وہاں مکمل ہو جاتا ہے جہاں dashboard کا ورژن اسے مکمل نہیں کر سکتا۔

**اگر آپ پہلے ہی منسلک ہیں** (`omniroute connect <host>`)، تو کاپی کرنے کے لیے کچھ نہیں ہے — helper خود credential کو اس انسٹالیشن تک پہنچا دیتا ہے:

```bash
# اپنی LOCAL مشین پر (Node.js + براؤزر درکار ہیں):
omniroute connect 192.168.0.15        # ایک بار — admin-scoped context token بناتا ہے
npx omniroute login antigravity
#   ↳ Google کی رضامندی کھولتا ہے، مقامی loopback port پر callback حاصل کرتا ہے،
#     اسے exchange کرتا ہے، اور credential کو فعال context پر POST کرتا ہے:
#
#   Antigravity http://192.168.0.15:20128 پر منسلک ہو گیا (connection abc123)۔
#   پیسٹ کرنے کے لیے کچھ نہیں — آپ یہ terminal بند کر سکتے ہیں۔
```

جب بھی فعال context کسی دوسری مشین کی طرف اشارہ کرتا ہے، push خودکار طور پر ہو جاتا ہے۔ اسے کسی بھی صورت میں `--push` / `--no-push` کے ذریعے نافذ کریں، یا `--context <name>` کے ذریعے کسی مخصوص context کو ہدف بنائیں۔

**اگر آپ کی مشین VPS تک نہیں پہنچ سکتی** (firewalled، SSH کے بغیر، air-gapped desk)، تب بھی helper کام کرتا ہے — اسے صرف Google کی _ضرورت_ ہوتی ہے۔ `--no-push` استعمال کریں، یا push کو ناکام ہونے دیں: پہلے سے مکمل شدہ authorization کو ضائع کرنے کے بجائے یہ واپس blob پرنٹ کر دیتا ہے۔

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

پھر **ریموٹ** dashboard میں: **Providers → Antigravity → Connect** پر جائیں، اور `omniroute-cred-v1.…` blob کو **Step 2** فیلڈ میں پیسٹ کریں (یہ callback URL یا credential blob، دونوں قبول کرتا ہے)۔ OmniRoute اسے decode کرتا ہے، Cloud Code onboarding کو server-side چلاتا ہے، اور connection کو مستقل طور پر محفوظ کر دیتا ہے۔

> blob میں refresh token شامل ہوتا ہے — اسے password کی طرح محفوظ رکھیں۔ push کے طریقے میں اسے آپ کے context کے authenticated connection پر ایک بار بھیجا جاتا ہے؛ paste کے طریقے میں آپ کے dashboard connection پر۔ دونوں صورتوں میں اسے encrypted حالت میں محفوظ کیا جاتا ہے، اور کامیاب push اسے کبھی آپ کے terminal پر پرنٹ نہیں کرتا۔

Flags: `--no-browser` (خودکار طور پر کھولنے کے بجائے URL پرنٹ کریں)، `--port <n>`
(loopback port کو مقرر کریں)، `--timeout <ms>`، `--push` / `--no-push` (خودکار ترسیل کو override کریں)، `--context <name>` (کسی مخصوص context کو ہدف بنائیں)۔

### اختیار B — SSH local-forward tunnel

اگر آپ کے پاس VPS کی SSH رسائی ہے، تو dashboard port کو forward کریں تاکہ loopback callback، tunnel کے ذریعے دوبارہ سرور تک پہنچے:

```bash
# اپنی LOCAL مشین پر:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# پھر اپنے LOCAL براؤزر میں http://localhost:20128 کھولیں اور Antigravity کو
# معمول کے مطابق منسلک کریں — اب 127.0.0.1:20128/callback redirect، SSH کے ذریعے VPS تک پہنچتا ہے۔
```

چونکہ آپ dashboard تک `localhost:20128` کے طور پر پہنچتے ہیں، اس لیے Google کی رضامندی مکمل ہو جاتی ہے اور callback اسی tunnel کے ذریعے سرور تک پہنچ جاتا ہے — کسی blob کی ضرورت نہیں۔ connection کے فعال دکھائی دینے تک tunnel کو کھلا رکھیں۔

ذیل میں موجود fixed-loopback providers کے برعکس، یہاں **ایک forward کافی ہے**: Antigravity callback خود dashboard port استعمال کرتا ہے، اس لیے tunnel کرنے کے لیے کسی دوسرے provider-specific port کی ضرورت نہیں۔

> ایک مکمل headless متبادل (helper اور tunnel کے بغیر) یہ ہے کہ اپنے **ذاتی**
> Google OAuth web credentials + ایک public base URL کو configure کریں؛ provider کے OAuth
> environment variables دیکھیں۔ مذکورہ دونوں اختیارات کے لیے کسی اضافی Google setup کی ضرورت نہیں۔

---

## ریموٹ انسٹالیشن پر Codex / Grok کو منسلک کرنا (فکسڈ loopback فراہم کنندگان)

Codex، xAI (`xai-oauth`) اور Grok CLI (`grok-cli`) اپنی upstream OAuth ایپ کے ساتھ ایک **فکسڈ** loopback
`redirect_uri` رجسٹر کرتے ہیں۔ OmniRoute اسے تبدیل نہیں کر سکتا — فراہم کنندہ ہمیشہ براؤزر کو اسی hardcoded پتے پر واپس بھیجتا ہے:

| فراہم کنندہ | فکسڈ callback جس پر فراہم کنندہ redirect کرتا ہے |
| ----------- | ------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`            |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                |

یہاں `localhost` سے مراد **وہ مشین ہے جس پر براؤزر چل رہا ہے**، جبکہ OmniRoute کا PKCE
callback سرور **سرور کے** loopback پر سنتا ہے۔ ڈیش بورڈ کو کسی LAN
پتے، مثلاً `http://192.168.0.15:20128`، پر کھولیں تو دونوں کبھی آپس میں نہیں ملتے: authorization
code آپ کے اپنے لیپ ٹاپ کے `localhost:1455` پر پہنچایا جاتا ہے، جہاں کچھ بھی نہیں سن رہا ہوتا،
اور فراہم کنندہ کوئی خرابی ظاہر کیے بغیر sign-in ناکام کر دیتا ہے۔

ڈیش بورڈ popup کھولنے سے پہلے ہی اس صورتِ حال کا پتا لگا لیتا ہے اور login کو خاموشی سے ناکام ہونے
دینے کے بجائے tunnel command دکھاتا ہے (#8046)۔

### حل — **دونوں** ports کو forward کریں

```bash
# اس مشین پر جہاں براؤزر چل رہا ہے:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# پھر http://localhost:20128 کھولیں اور وہاں سے Codex کو منسلک کریں
```

دو forwards درکار ہیں، اور صرف ایک کو forward کرنے سے پھر بھی ناکامی ہوتی ہے:

- **`20128`** (ڈیش بورڈ port) origin کو حقیقی localhost بناتا ہے، اور یہی
  OmniRoute کو PKCE callback سرور شروع کرنے کے قابل بناتا ہے — LAN origin کبھی
  اس branch تک نہیں پہنچتا۔
- **`1455`** (فراہم کنندہ کا فکسڈ callback port) وہ جگہ ہے جہاں براؤزر کو واپس بھیجا جاتا
  ہے؛ اسے tunnel کے ذریعے سرور کے loopback تک پہنچنا ضروری ہے۔

xAI یا Grok CLI کو منسلک کرتے وقت `1455` کو `56121`/`56122` سے، اور `20128` کو
اپنے اصل ڈیش بورڈ port سے بدلیں۔ connection کے active دکھائی دینے تک tunnel کھلا رکھیں۔

> **SSH رسائی نہیں ہے؟** Codex اور Grok CLI پیسٹ کیا گیا token بھی قبول کرتے ہیں — connect dialog میں **Paste API
> Key** / **Import auth.json** tab استعمال کریں۔ اس طریقے میں کوئی loopback
> callback نہیں ہوتا، اس لیے یہ کسی بھی origin سے کام کرتا ہے۔ Codex اضافی طور پر ایک سادہ access
> token یا `~/.codex/auth.json` session blob بھی قبول کرتا ہے۔

---

## Tokens کا نظم کرنا

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ secret صرف ایک بار دکھاتا ہے — اسے ابھی کاپی کر لیں
omniroute tokens list                 # masked: id، نام، scope، prefix، حیثیت، میعاد
omniroute tokens revoke <id|prefix>   # فوراً منسوخ کریں
omniroute tokens scopes               # تینوں scopes کی وضاحت کریں
```

`tokens` commands کے لیے **admin** credential درکار ہے۔ آپ ڈیش بورڈ میں
**Settings → Access Tokens** کے تحت بھی tokens کا نظم کر سکتے ہیں (تخلیق، تنسیخ، صرف ایک بار کاپی)۔

---

## ریموٹ catalog سے coding CLI کو configure کرنا

`omniroute configure` **فعال سرور** کا live model catalog پڑھتا ہے اور
**آپ کی** مشین پر config لکھتا ہے۔

```bash
omniroute configure codex
#   فراہم کنندگان: glm، kmc، ollamacloud، opencode-go، …
#   فراہم کنندہ: glm
#   Model id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml لکھ دی گئی
#   اسے استعمال کریں:  codex --profile glm52

# غیر تعاملی
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# کثرت سے استعمال ہونے والے model کو interactive picker میں سب سے اوپر رکھیں
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Picker مقامی `model-preferences.json` فائل میں صرف model IDs رکھتا ہے (URLs یا credentials کبھی نہیں)،
جو context اور CLI target کے لحاظ سے scoped ہوتے ہیں۔ Favorites حالیہ انتخابات سے
پہلے دکھائے جاتے ہیں؛ منتخب model کو اس context/target فہرست سے ہٹانے کے لیے `--unfavorite`
استعمال کریں۔

لکھا گیا profile، env var (`OMNIROUTE_API_KEY`) کے ذریعے inference key کا حوالہ دیتا
ہے — secret کبھی disk پر نہیں لکھا جاتا۔ Codex کے ایک بار کیے جانے والے
بنیادی setup (`[model_providers.omniroute]` block) کے لیے
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) دیکھیں۔

### ریموٹ کے لیے CLI چلانا (کوئی config نہیں لکھی جاتی)

`omniroute run <target>` بھی فعال context کا لحاظ رکھتا ہے: ریموٹ base URL
اور context credential صرف شروع کیے گئے process میں inject کیے جاتے ہیں۔

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → ریموٹ
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# بالکل وہی preview کریں جو شروع کیا جائے گا (صرف env KEY NAMES، values کبھی نہیں):
omniroute run codex --dry-run --json
```

Targets: `claude`، `codex`، `aider`، `goose`، `opencode`، `qwen`، `gemini`
(واحد ماخذ: `bin/cli/cli-manifest.mjs`)۔ Qwen اور Gemini ایک
عارضی الگ تھلگ home کے ساتھ چلتے ہیں جسے exit پر ہٹا دیا جاتا ہے، اس لیے launch کبھی آپ کی
ذاتی tool configuration کو چھیڑتا نہیں — اور نہ ہی اس میں کچھ leak کرتا ہے۔

### ہر CLI کے لیے setup commands

ہر تعاون یافتہ CLI کے پاس remote-aware setup command ہے (سب فعال
context، یا `--remote <url> --api-key <key>`، کا لحاظ رکھتے ہیں):

| CLI         | کمانڈ                      | یہ کیا لکھتا ہے                                                                                                                                                                             |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` پروفائلز (ہر ماڈل کے لیے)                                                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (ہر ماڈل کے لیے)                                                                                                                                  |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ہر کیٹلاگ ماڈل کے ساتھ OpenAI سے ہم آہنگ `omniroute` پرووائیڈر (`opencode -m omniroute/<model>` چلائیں)                                                |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI موڈ) + پیسٹ کرنے کے لیے VS Code ایکسٹینشن کی ترتیبات پرنٹ کرتا ہے (OpenAI سے ہم آہنگ، Base URL **بغیر** `/v1`)                              |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code کی `kilocode.*` ترتیبات — OpenAI سے ہم آہنگ، Base URL **کے ساتھ** `/v1`                                                                     |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`، `apiBase` **کے ساتھ** `/v1`، کلید `${{ secrets.OMNIROUTE_API_KEY }}` کے ذریعے                                |
| Cursor      | `omniroute setup-cursor`   | ایپ کے اندر کے مراحل پرنٹ کرتا ہے (Settings → Models → Override OpenAI Base URL **کے ساتھ** `/v1` + کلید + ماڈل)۔ Cursor کنفیگریشن مبہم SQLite ہے — صرف چیٹ پینل                            |
| Roo Code    | `omniroute setup-roo`      | ایک Roo امپورٹ JSON (`~/.omniroute/roo-settings.json`) لکھتا ہے + `roo-cline.autoImportSettingsPath` سیٹ کرتا ہے + UI کے مراحل پرنٹ کرتا ہے (OpenAI سے ہم آہنگ، Base URL **کے ساتھ** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` پرووائیڈر، `base_url` **کے ساتھ** `/v1`، کلید `$OMNIROUTE_API_KEY` کے ذریعے                                                                  |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **بغیر** `/v1` + `GOOSE_MODEL`) + ماحول کی ترکیب                                                                     |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **بغیر** `/v1` + `model: openai/<id>`) + ماحول کی ترکیب (`aider --message --yes`)                                                                    |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` میں V4 `modelProviders.openai` اندراج + `~/.qwen/.env` میں `OMNIROUTE_API_KEY`                                                                                      |

```bash
# OpenCode (OpenAI سے ہم آہنگ پرووائیڈر، تمام کیٹلاگ ماڈلز، ریموٹ VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # صرف مماثل ماڈلز رکھیں
opencode -m omniroute/glm/glm-5.2 "..."          # پہلے OMNIROUTE_API_KEY ایکسپورٹ کریں
```

> OpenCode میں ایک زیادہ جامع **plugin** انٹیگریشن بھی ہے: `omniroute setup opencode`
> (اب `--remote` کے ذریعے ریموٹ سے ہم آہنگ) `@omniroute/opencode-plugin` انسٹال کرتا ہے۔
> `setup-opencode` ہلکا پھلکا، OpenAI سے ہم آہنگ متبادل ہے۔ API کلید کا حوالہ
> `{env:OMNIROUTE_API_KEY}` کے ذریعے دیا جاتا ہے — اسے کبھی ڈسک پر نہیں لکھا جاتا۔
>
> OpenCode v2 پر اس کے بجائے `@omniroute/opencode-plugin-v2` استعمال کریں: وہی کیٹلاگ،
> مگر مختلف لوڈر کنٹریکٹ۔ انٹیگریشن منسلک ہونے پر یہ کلید OpenCode کے اپنے کریڈینشل
> اسٹور سے پڑھتا ہے، اس لیے ریموٹ گیٹ وے کو `opencode.json` میں کسی کلید کی قطعاً ضرورت
> نہیں ہوتی۔

---

## سیاق و سباق کا انتظام (سرورز کے درمیان سوئچ کرنا)

ایک **سیاق** محفوظ شدہ سرور (baseUrl + اسناد + دائرۂ کار) ہوتا ہے۔ `omniroute connect`
ایک سیاق بناتا ہے اور اسے فعال کر دیتا ہے؛ اس کے بعد ہر کمانڈ اسی کو ہدف بناتی ہے۔ سیاق و سباق کا انتظام
اور ان کے درمیان سوئچ `omniroute contexts` کے ذریعے کریں:

```bash
omniroute contexts list            # تمام سیاق؛ فعال سیاق پر ● کا نشان ہوتا ہے
omniroute contexts current         # فعال سرور، توثیق کی حالت، دائرۂ کار
```

```text
  | نام     | بنیادی URL                | توثیق | دائرۂ کار | تفصیل
● | vps     | http://100.67.86.91:20128 | token | admin | ریموٹ OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**سرورز سوئچ کریں** — اس کے بعد آنے والی ہر کمانڈ فعال سیاق کی پیروی کرتی ہے:

```bash
omniroute contexts use vps         # → اب تمام کمانڈز ریموٹ VPS کو ہدف بناتی ہیں
omniroute tokens list              #   (VPS کے خلاف چلتی ہے)

omniroute contexts use default     # → واپس localhost پر
omniroute tokens list              #   (مقامی سرور کے خلاف چلتی ہے)
```

**دستی طور پر سیاق شامل کریں** (`connect` کے بجائے)، اس کا معائنہ کریں، یا نام تبدیل کریں:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # ایک سیاق کی مکمل تفصیلات
omniroute contexts rename staging stg
```

**سیاق ہٹائیں** — تصدیق طلب کی جاتی ہے؛ اسے چھوڑنے کے لیے `--yes` دیں
(اسکرپٹس / غیر تعاملی شیلز کے لیے ضروری ہے، جو بصورت دیگر محفوظ انداز میں انکار کر دیتے ہیں):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) کو ہٹایا نہیں جا سکتا۔ فعال سیاق ہٹانے پر نظام واپس
> `default` استعمال کرتا ہے۔ مشورہ: سیاق ہٹانے سے صرف **مقامی** محفوظ شدہ اسناد حذف ہوتی ہیں —
> رسائی کو حقیقتاً ختم کرنے کے لیے سرور پر `omniroute tokens revoke <id>` کے ذریعے token
> منسوخ کریں۔

سیاق و سباق کو **برآمد / درآمد** کریں (مثلاً انہیں مشینوں کے درمیان منتقل کرنے کے لیے)۔ نئے سیاق مستقل طور پر
صرف keychain کا حوالہ محفوظ کرتے ہیں؛ OS keychain دستیاب ہونے کی صورت میں اسناد برآمد شدہ فائل میں
نقل نہیں کی جاتیں:

```bash
omniroute contexts export --out contexts.json     # طے شدہ: stdout
omniroute contexts import contexts.json            # اوور رائٹ؛ موجودہ سیاق برقرار رکھنے کے لیے --merge
omniroute contexts migrate --yes                  # پرانے سادہ متن والے tokens کو keychain میں منتقل کریں
```

قابلِ استعمال OS keychain کے بغیر headless سسٹمز پر، CLI موڈ `0600` کے ساتھ
`config.json` استعمال کرتا ہے اور ایک مرتبہ انتباہ دکھاتا ہے۔ اس متبادل طریقے سے حاصل کردہ برآمدات
(اور منتقلی سے پہلے کی کسی بھی پرانی config) کو خفیہ مواد سمجھیں۔

---

## فوری ابتدا تا انتہا جانچ

ریموٹ سیٹ اپ کو ابتدا سے جانچنے کے لیے نقل اور چسپاں کیا جا سکنے والا مکمل دورِ حیات — منسلک ہوں، محدود
دائرۂ کار والا token بنائیں، کمانڈ روٹ کریں، واپس سوئچ کریں، اور سیٹ اپ ختم کریں۔
`192.168.0.15` کو اپنے سرور کے host/IP (Tailscale، LAN، یا عوامی
`https://…` URL) سے بدلیں۔

```bash
# 1. منسلک ہوں (password → admin token، ایک سیاق کے طور پر محفوظ ہوتا ہے جو فعال بن جاتا ہے)
omniroute connect 192.168.0.15                 # یا: --key oma_live_xxxx  (password کے بغیر)
omniroute contexts current                     # ریموٹ سرور + دائرۂ کار دکھاتا ہے

# 2. اسے استعمال کریں — انتظامی کمانڈز اب ریموٹ کے خلاف چلتی ہیں
omniroute tokens create --name laptop --scope read   # زیادہ محدود دائرۂ کار والا token بنائیں
omniroute tokens list                                 # ریموٹ سے مخفی فہرست

# 3. آگے پیچھے سوئچ کریں
omniroute contexts use default                 # → مقامی
omniroute contexts use 192-168-0-15            # → دوبارہ ریموٹ (`contexts list` سے حاصل کردہ نام)

# 4. سیٹ اپ ختم کریں۔ نوٹ: `contexts remove` صرف مقامی اسناد حذف کرتا ہے —
#    یہ سرور پر token منسوخ نہیں کرتا۔ اگر آپ واقعی
#    رسائی ختم کرنا چاہتے ہیں تو پہلے اسے سرور کی جانب منسوخ کریں۔
omniroute tokens revoke <id|prefix>            # سرور پر رسائی ختم کرتا ہے
omniroute contexts remove 192-168-0-15 --yes   # مقامی سیاق حذف کریں (فعال ہو تب بھی → واپس default پر)، کوئی سوال نہیں
```

> `--yes`، `contexts remove` کو غیر تعاملی بناتا ہے (اسکرپٹس/CI میں ضروری؛ اس کے بغیر
> غیر تعاملی شیل معلق ہونے کے بجائے محفوظ انداز میں انکار کر دیتا ہے)۔ **فعال**
> سیاق ہٹانے پر نظام خودکار طور پر واپس `default` استعمال کرتا ہے۔

---

## سیکیورٹی کے نوٹس

- ٹوکن کا اصل متن صرف ایک بار دکھایا جاتا ہے؛ صرف SHA-256 ہیش محفوظ کیا جاتا ہے (بالکل API کلیدوں کی طرح)۔
- `omniroute connect` لاگ اِن کی بروٹ فورس لاک آؤٹ اور آڈٹ لاگنگ کو دوبارہ استعمال کرتا ہے۔
- ٹرانسپورٹ کے لیے HTTPS یا Tailnet کو ترجیح دیں؛ محض ایک ہوسٹ دینے پر LAN/Tailscale کی سہولت کے لیے `http://` بطور ڈیفالٹ استعمال ہوتا ہے — TLS کے لیے مکمل `https://…` URL فراہم کریں۔
- ترجیحی مقامی کانٹیکسٹ فائل `~/.omniroute/config.json` (`chmod 600`) ہے، جس میں صرف ایک `credentialRef` ہوتا ہے؛ ٹوکن خود OS کی چین (`keytar`) میں محفوظ ہوتا ہے اور لاگز میں کبھی پرنٹ نہیں کیا جاتا۔ فعال مقامی کی چین کے بغیر ہیڈ لیس انسٹالیشنز واضح فال بیک کے طور پر اسی `0600` فائل کو استعمال کرتی ہیں اور ایک بار انتباہ جاری کرتی ہیں۔ کی چین بیک اینڈ انسٹال کرنے کے بعد `omniroute contexts migrate --yes` استعمال کریں۔

---

## API اینڈ پوائنٹس (حوالہ)

| طریقہ  | روٹ                   | توثیق           | دائرۂ کار                   |
| ------ | --------------------- | --------------- | --------------------------- |
| POST   | `/api/cli/connect`    | انتظامی پاس ورڈ | — (عوامی، پاس ورڈ سے محفوظ) |
| GET    | `/api/cli/whoami`     | رسائی ٹوکن      | مطالعہ                      |
| GET    | `/api/cli/tokens`     | رسائی ٹوکن      | منتظم                       |
| POST   | `/api/cli/tokens`     | رسائی ٹوکن      | منتظم                       |
| DELETE | `/api/cli/tokens/:id` | رسائی ٹوکن      | منتظم                       |

مکمل اسکیما کے لیے [openapi.yaml](../openapi.yaml) دیکھیں۔
