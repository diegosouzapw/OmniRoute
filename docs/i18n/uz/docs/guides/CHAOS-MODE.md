# Chaos Mode (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Boshqaruv paneli:** **Chaos Mode** (yon panel) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (boshqaruv paneli sessiyasi) · `POST /api/skills/collect/chaos` (API kaliti)  
> **Manba:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **bitta vazifani bir vaqtning oʻzida bir nechta provayderga yuboradi** — har bir ishtirokchi provayder
bittadan model nusxasini taqdim etadi va siz barcha javoblarni yonma-yon (yoki zanjirlangan holda) olasiz. Bu
marshrutlash strategiyasi emas, balki koʻp modelli bajarish vositasidir: odatiy `/v1/chat/completions`
trafikingizga u hech qachon taʼsir qilmaydi.

**Farqlash — nomida "chaos" boʻlgan uch xil narsa taqdim etiladi:**

| Narsa                                 | Bu nima                                                                                                                                      | Hujjat joylashuvi                            |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                        | Bu yerda tavsiflangan boshqaruv paneli sahifasi + API: bitta vazifani koʻplab provayderlarga tarqatadi (parallel yoki hamkorlikda).          | Ushbu qoʻllanma                              |
| `auto/chaos`                          | Barqarorlikni sinash uchun nosozlik kiritishga asoslangan baholash vaznlariga ega Auto-Combo model identifikatori. Sozlash talab qilinmaydi. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos kombinatsiyasi konfiguratsiyasi | `config.chaos.enabled` bilan saqlanadigan kombinatsiya vazifani ixtiyoriy hakam modeli mavjud panelga tarqatadi (faqat API orqali).          | `open-sse/services/autoCombo/chaosEngine.ts` |

## Sozlash

1. **Boshqaruv paneli → Chaos Mode** (`/dashboard/chaos`) sahifasini oching.
2. Uni **yoqing** — Chaos Mode standart holatda **oʻchirilgan** (`src/lib/chaos/chaosConfig.ts`
   ichida `enabled: false`). U oʻchirilgan paytda `POST /api/chaos/run` quyidagi javobni qaytaradi:
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Ishtirokchilar va standart qiymatlarni tanlang (sozlamalar ombori orqali har bir nusxa uchun saqlanadi):

   | Maydon              | Maʼnosi                                                                                     | Standart qiymat / cheklovlar                 |
   | ------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Asosiy kalit                                                                                | `false`                                      |
   | `defaultMode`       | `parallel` yoki `collaborative` (quyiga qarang)                                             | `parallel`                                   |
   | `providerOverrides` | Har bir provayder uchun ishtirok sozlamalari (`providerId`, ixtiyoriy `modelId`, `enabled`) | boʻsh = har bir faol provayder, maksimum 200 |
   | `systemPrompt`      | Ichki Chaos tizim koʻrsatmasini almashtirish                                                | ixtiyoriy, maksimum 10 000 ta belgi          |
   | `timeoutMs`         | Har bir model chaqiruvi uchun maksimal vaqt                                                 | `120000` (5 000–600 000)                     |
   | `maxTokens`         | Har bir model chaqiruvi uchun `max_tokens`                                                  | `4096` (256–128 000)                         |

4. **Sinovni sahifaning oʻzidan ishga tushiring** — natijalar panelida har bir provayderning javobi,
   holati va davomiyligi koʻrsatiladi.

## Bajarish rejimlari

- **`parallel`** — har bir model bir xil vazifani bir vaqtning oʻzida oladi; siz barcha javoblarni
  bir-biridan mustaqil ravishda olasiz.
- **`collaborative`** — modellar **zanjir boʻylab** ishlaydi: har biri oldingi model natijasini koʻradi va
  uni takomillashtirish, kengaytirish, tanqid qilish yoki muqobil variant taklif etish soʻraladi. Javobdagi `summary` maydoni
  muvaffaqiyatli natijalarni zanjir tartibida birlashtiradi (parallel bajarilishlarda `summary` boʻlmaydi).

## API

### `POST /api/chaos/run` — boshqaruv paneli sessiyasi

Cookie orqali autentifikatsiya qilinadi (boshqaruv sessiyasi — qarang:
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); boshqaruv paneli sahifasi tomonidan ishlatiladi.

```jsonc
// soʻrov tanasi
{
  "task": "X uchun yondashuvlarni taqqoslang", // majburiy
  "providers": ["glm", "kimi"], // ixtiyoriy filtr
  "mode": "parallel", // ixtiyoriy — defaultMode qiymatini almashtiradi
  "systemPrompt": "…", // ixtiyoriy almashtirish
  "maxTokens": 4096, // ixtiyoriy almashtirish
}
```

### `POST /api/skills/collect/chaos` — API kaliti

Tashqi chaqiruvchilar uchun Bearer-token varianti. Kalitda **Chaos Mode ruxsati**
(`chaosModeEnabled`) boʻlishi kerak; u **standart holatda oʻchirilgan** — uni har bir kalit uchun
**Boshqaruv paneli → API Manager → kalitni tahrirlash → ruxsatlar → Chaos Mode** orqali yoqing. Soʻrov tanasi yuqoridagisi bilan bir xil.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"X uchun yondashuvlarni taqqoslang","mode":"parallel"}'
```

Har ikkala endpoint bir xil tuzilishdagi javobni qaytaradi:

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
  "summary": "…", // faqat collaborative rejimida
}
```

## Muammolarni bartaraf etish

- **`400 Chaos Mode is not enabled`** — yuqoridagi 2-bosqich: global kalit oʻchirilgan.
- **API kaliti `/api/skills/collect/chaos` endpointida rad etilmoqda** — kalitda alohida kalit uchun
  `chaosModeEnabled` ruxsati yoʻq (standart holatda oʻchirilgan; bu xato emas, balki sozlama).
- **Siz kutgan provayder natijalarda yoʻq** — Chaos Mode sahifasidagi `providerOverrides`
  sozlamasini (oʻchirilgan almashtirish uni chiqarib tashlaydi) va provayder ulanishi faol ekanini
  tekshiring.
