# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

یہ گائیڈ**OmniRoute**کی حفاظت کے لیے نیٹ ورک کے بنیادی ڈھانچے کے سنہری معیار کو دستاویز کرتا ہے اور آپ کی ایپلیکیشن کو انٹرنیٹ پر محفوظ طریقے سے ظاہر کرتا ہے،**بغیر کسی بندرگاہ کو کھولے (زیرو ان باؤنڈ)**۔## What was done on your VM?

ہم نے PM2 کے ذریعے OmniRoute کو**Split-Port**موڈ میں فعال کیا:

-**پورٹ `20128`:\*\***صرف API**`/v1` چلتا ہے۔ -**پورٹ `20129`:\***\*صرف انتظامی ڈیش بورڈ**چلاتا ہے۔

مزید برآں، اندرونی سروس کے لیے `REQUIRE_API_KEY=true` کی ضرورت ہوتی ہے، جس کا مطلب ہے کہ کوئی بھی ایجنٹ ڈیش بورڈ کے API کیز ٹیب میں تیار کردہ جائز "بیرر ٹوکن" بھیجے بغیر API کے اختتامی پوائنٹس کو استعمال نہیں کر سکتا۔

یہ ہمیں نیٹ ورک کے دو مکمل طور پر آزاد اصول بنانے کی اجازت دیتا ہے۔ یہیں سے**کلاؤڈ فلیئر ٹنل (کلاؤڈ فلیئر)**آتا ہے۔---

## 1. How to Create the Tunnel in Cloudflare

'Cloudflared' یوٹیلیٹی آپ کی مشین پر پہلے ہی انسٹال ہے۔ بادل میں ان اقدامات پر عمل کریں:

1. اپنے**Cloudflare زیرو ٹرسٹ**ڈیش بورڈ (one.dash.cloudflare.com) تک رسائی حاصل کریں۔
2. بائیں مینو میں،**نیٹ ورکس > ٹنل**پر جائیں۔ 3.**Ad a Tunnel**پر کلک کریں،**Cloudflared**کا انتخاب کریں، اور اسے `OmniRoute-VM` کا نام دیں۔
3. یہ اسکرین پر ایک کمانڈ تیار کرے گا جسے "انسٹال اور رن ایک کنیکٹر" کہا جاتا ہے۔**آپ کو صرف ٹوکن کاپی کرنے کی ضرورت ہے (`--token` کے بعد لمبی تار)**۔
4. اپنی ورچوئل مشین (یا Proxmox ٹرمینل) میں SSH کے ذریعے لاگ ان کریں اور عمل کریں: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

ابھی بھی نئی تخلیق کردہ ٹنل اسکرین پر،**عوامی میزبان کے نام**ٹیب پر جائیں اور**دو**راستے شامل کریں، جو علیحدگی ہم نے کی ہے اس کا فائدہ اٹھاتے ہوئے:### Route 1: Secure API (Limited)

-**سب ڈومین:**`api` -**ڈومین:**`yourglobal.com` (اپنا اصلی ڈومین منتخب کریں) -**سروس کی قسم:**`HTTP` -**URL:**`127.0.0.1:20128` _(اندرونی API پورٹ)_### Route 2: Zero Trust Dashboard (Closed)

-**سب ڈومین:**`اومنی روٹ` یا `پینل` -**ڈومین:**`yourglobal.com` -**سروس کی قسم:**`HTTP` -**URL:**`127.0.0.1:20129` _(اندرونی ایپ/بصری پورٹ)_

اس مقام پر، "جسمانی" رابطہ حل ہو گیا ہے۔ اب آئیے اسے صحیح معنوں میں ڈھالیں۔---

## 3. Shielding the Dashboard with Zero Trust (Access)

کوئی بھی مقامی پاس ورڈ کھلے انٹرنیٹ سے اس تک رسائی کو مکمل طور پر ہٹانے سے بہتر آپ کے ڈیش بورڈ کی حفاظت نہیں کرتا ہے۔

1. زیرو ٹرسٹ ڈیش بورڈ میں،**رسائی> ایپلی کیشنز> ایپلیکیشن شامل کریں**پر جائیں۔ 2.**خود میزبان**کو منتخب کریں۔ 3.**درخواست کے نام**میں، `OmniRoute Panel` درج کریں۔ 4.**ایپلیکیشن ڈومین**میں، `omniroute.yourglobal.com` درج کریں (وہی جو آپ نے "روٹ 2" میں استعمال کیا تھا)۔ 5.**اگلا**پر کلک کریں۔ 6.**قاعدہ کارروائی**میں، 'اجازت دیں' کو منتخب کریں۔ اصول کے نام کے لیے، 'صرف ایڈمن' درج کریں۔ 7.**شامل کریں**میں، "سلیکٹر" ڈراپ ڈاؤن کے تحت، `ای میلز` کا انتخاب کریں اور اپنا ای میل ٹائپ کریں، مثال کے طور پر `admin@spgeo.com.br`۔
2. محفوظ کریں ('ایپلیکیشن شامل کریں')۔

> **اس نے کیا کیا:**اگر آپ `omniroute.yourglobal.com` کھولنے کی کوشش کرتے ہیں، تو یہ آپ کی OmniRoute ایپلیکیشن پر نہیں اترے گا! یہ ایک خوبصورت Cloudflare اسکرین پر اترتا ہے جو آپ سے اپنا ای میل درج کرنے کو کہتا ہے۔ صرف اس صورت میں جب آپ (یا آپ نے درج کردہ ای میل) وہاں ٹائپ کیا ہو، آپ کو Outlook/Gmail میں ایک عارضی 6 ہندسوں کا کوڈ ملے گا جو پورٹ `20129` کی سرنگ کو کھول دیتا ہے۔---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

زیرو ٹرسٹ ڈیش بورڈ API روٹ (`api.yourglobal.com`) پر لاگو نہیں ہوتا، کیونکہ یہ براؤزر کے بغیر خودکار ٹولز (ایجنٹس) کے ذریعے پروگرامی رسائی ہے۔ اس کے لیے، ہم Cloudflare کی مین فائر وال (WAF) استعمال کریں گے۔

1.**نارمل کلاؤڈ فلیئر ڈیش بورڈ**(dash.cloudflare.com) تک رسائی حاصل کریں اور اپنے ڈومین پر جائیں۔ 2. بائیں مینو میں،**سیکیورٹی> WAF> شرح محدود کرنے کے اصول**پر جائیں۔ 3.**قاعدہ بنائیں**پر کلک کریں۔ 4.**نام:**`OmniRoute API اینٹی ابیوز` 5.**اگر آنے والی درخواستیں مماثل ہیں...**

- فیلڈ کا انتخاب کریں: 'میزبان نام'
- آپریٹر: 'برابر'
- قدر: `api.yourglobal.com` 6.**اسی خصوصیات کے ساتھ:**کے تحت `IP` رکھیں۔

7. حدود کے لیے (حد): -**جب درخواستیں:**`50` سے زیادہ ہوں۔ -**مدت:**`1 منٹ`
8. آخر میں،**کارروائی**کے تحت: `بلاک` کریں اور فیصلہ کریں کہ آیا بلاک 1 منٹ یا 1 گھنٹے تک رہتا ہے۔ 9.**تعینات**۔

> **اس نے کیا کیا:**کوئی بھی آپ کے API URL پر 60 سیکنڈ کی مدت میں 50 سے زیادہ درخواستیں نہیں بھیج سکتا۔ چونکہ آپ ایک سے زیادہ ایجنٹ چلاتے ہیں اور ان کے پیچھے کی کھپت پہلے سے ہی ریٹ کی حد تک پہنچ جاتی ہے اور ٹوکنز کو ٹریک کرتی ہے، یہ انٹرنیٹ ایج لیئر میں صرف ایک ایسا پیمانہ ہے جو آپ کے آن پریمیسس انسٹینس کو تھرمل تناؤ کی وجہ سے نیچے جانے سے بچاتا ہے اس سے پہلے کہ ٹریفک سرنگ سے نیچے جائے۔---

## Finalization

1. آپ کے VM میں `/etc/ufw` میں\*\*کوئی ظاہری بندرگاہیں نہیں ہیں۔
2. OmniRoute صرف HTTPS آؤٹ باؤنڈ (`Cloudflared`) پر بات کرتا ہے اور دنیا سے براہ راست TCP وصول نہیں کرتا ہے۔
3. OpenAI کے لیے آپ کی درخواستیں مبہم ہیں کیونکہ ہم نے انہیں عالمی سطح پر SOCKS5 پراکسی سے گزرنے کے لیے ترتیب دیا ہے (کلاؤڈ کو SOCKS5 کی کوئی پرواہ نہیں ہے کیونکہ یہ ان باؤنڈ میں آتی ہے)۔
4. آپ کے ویب ڈیش بورڈ میں ای میل کے ساتھ 2 فیکٹر کی توثیق ہے۔
5. آپ کا API Cloudflare کی طرف سے حد تک محدود ہے اور صرف بیئرر ٹوکنز کو ٹریفک کرتا ہے۔
