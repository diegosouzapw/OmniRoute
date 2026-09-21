# Chaos Mode (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **داشبورد:** **حالت آشوب** (نوار کناری) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (نشست داشبورد) · `POST /api/skills/collect/chaos` (کلید API)  
> **منبع:** `src/lib/chaos/chaosExecutor.ts`، `src/lib/chaos/chaosConfig.ts`

حالت آشوب **یک وظیفه را بهطور همزمان برای چند ارائهدهنده ارسال میکند** — هر ارائهدهندهٔ مشارکتکننده
یک نمونه مدل در اختیار میگذارد و همهٔ پاسخها را کنار هم (یا بهصورت زنجیرهای) دریافت میکنید. این قابلیت
یک بستر اجرای چندمدلی است، نه یک راهبرد مسیریابی؛ ترافیک عادی `/v1/chat/completions`
شما هرگز تحت تأثیر آن قرار نمیگیرد.

**رفع ابهام — سه قابلیت متفاوت با واژهٔ «chaos» در نامشان ارائه میشوند:**

| مورد                  | چیست                                                                                                               | محل مستندات                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **حالت آشوب**         | صفحهٔ داشبورد + API شرحدادهشده در اینجا: ارسال یک وظیفه به چندین ارائهدهنده (موازی یا مشارکتی).                    | این راهنما                                   |
| `auto/chaos`          | شناسهٔ یک مدل Auto-Combo با وزنهای امتیازدهی تزریق خطا برای آزمودن تابآوری. نیازی به پیکربندی ندارد.               | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| پیکربندی ترکیبی Chaos | یک ترکیب ذخیرهشده با `config.chaos.enabled` که درخواست را بین یک پنل، با یک مدل داور اختیاری، پخش میکند (فقط API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## راهاندازی

1. **داشبورد → حالت آشوب** (`/dashboard/chaos`) را باز کنید.
2. آن را **فعال کنید** — حالت آشوب بهصورت **پیشفرض غیرفعال** ارائه میشود (`enabled: false` در
   `src/lib/chaos/chaosConfig.ts`). هنگامی که غیرفعال باشد، `POST /api/chaos/run` با
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` پاسخ میدهد.
3. مشارکتکنندگان و مقادیر پیشفرض را انتخاب کنید (برای هر نمونه از طریق مخزن تنظیمات ذخیره میشوند):

   | فیلد                | معنی                                                              | پیشفرض / محدودیتها                        |
   | ------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | کلید اصلی                                                         | `false`                                   |
   | `defaultMode`       | `parallel` یا `collaborative` (پایین را ببینید)                   | `parallel`                                |
   | `providerOverrides` | مشارکت هر ارائهدهنده (`providerId`، `modelId` اختیاری، `enabled`) | خالی = همهٔ ارائهدهندگان فعال، حداکثر 200 |
   | `systemPrompt`      | بازنویسی اعلان سیستمی داخلی Chaos                                 | اختیاری، حداکثر 10 000 نویسه              |
   | `timeoutMs`         | حداکثر زمان هر فراخوانی مدل                                       | `120000` (5 000–600 000)                  |
   | `maxTokens`         | مقدار `max_tokens` برای هر فراخوانی مدل                           | `4096` (256–128 000)                      |

4. **از خود صفحه یک آزمایش اجرا کنید** — پنل نتایج، پاسخ، وضعیت و مدتزمان هر ارائهدهنده را
   نمایش میدهد.

## حالتهای اجرا

- **`parallel`** — همهٔ مدلها یک وظیفهٔ یکسان را بهطور همزمان دریافت میکنند؛ همهٔ پاسخها را
  بهصورت مستقل دریافت میکنید.
- **`collaborative`** — مدلها **بهصورت زنجیرهای** اجرا میشوند: هر مدل خروجی مدل قبلی را میبیند و
  از آن خواسته میشود آن را اصلاح یا تکمیل کند، نقد کند یا جایگزینی ارائه دهد. فیلد `summary` در پاسخ،
  خروجیهای موفق را بهترتیب زنجیره به یکدیگر متصل میکند (اجراهای موازی `summary` ندارند).

## API

### `POST /api/chaos/run` — نشست داشبورد

با کوکی احراز هویت میشود (نشست مدیریت — به
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) مراجعه کنید)؛ صفحهٔ داشبورد از آن استفاده میکند.

```jsonc
// بدنه
{
  "task": "Compare approaches to X", // الزامی
  "providers": ["glm", "kimi"], // فیلتر اختیاری
  "mode": "parallel", // اختیاری — defaultMode را بازنویسی میکند
  "systemPrompt": "…", // بازنویسی اختیاری
  "maxTokens": 4096, // بازنویسی اختیاری
}
```

### `POST /api/skills/collect/chaos` — کلید API

نوع مبتنی بر توکن Bearer برای فراخوانندگان خارجی. کلید باید **مجوز حالت آشوب**
(`chaosModeEnabled`) را داشته باشد که **بهصورت پیشفرض غیرفعال است** — آن را برای هر کلید در
**داشبورد → مدیر API → ویرایش کلید → مجوزها → حالت آشوب** فعال کنید. بدنه همانند بالاست.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

هر دو نقطهٔ پایانی ساختار یکسانی را برمیگردانند:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // فقط حالت مشارکتی
}
```

## عیبیابی

- **`400 Chaos Mode is not enabled`** — مرحلهٔ 2 بالا: کلید سراسری خاموش است.
- **کلید API در `/api/skills/collect/chaos` رد میشود** — کلید فاقد مجوز مختص همان کلید،
  یعنی `chaosModeEnabled` است (این مجوز بهصورت پیشفرض غیرفعال است؛ این یک تنظیم است، نه خطا).
- **ارائهدهندهای که انتظار داشتید در نتایج وجود ندارد** — `providerOverrides` را در صفحهٔ
  حالت آشوب بررسی کنید (یک بازنویسی غیرفعال، آن ارائهدهنده را مستثنی میکند) و مطمئن شوید اتصال
  ارائهدهنده فعال است.
