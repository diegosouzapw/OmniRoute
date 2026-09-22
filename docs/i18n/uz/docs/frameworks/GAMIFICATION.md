# Gamification & Leaderboard System (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Haqiqat manbasi:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute foydalanuvchilarni platforma bilan faol ishlagani — soʻrovlar yuborgani, provayderlarni almashtirgani, kombinatsiyalar yaratgani, tokenlarni ulashgani va hamjamiyatga hissa qoʻshgani uchun mukofotlaydigan, avvalo mahalliy ishlashga yoʻnaltirilgan geymifikatsiya qatlamini oʻz ichiga oladi. Barcha holat SQLiteʼda saqlanadi; hamjamiyat serverlari bilan federatsiya ixtiyoriy bo‘lib, maʼlumotlarni yuborish asosida ishlaydi.

Tizim **asosiy ishlov berish yoʻlida nol kechikish** tamoyili asosida ishlab chiqilgan — geymifikatsiya hodisalari soʻrovlarni qayta ishlash jarayonidan natijani kutmasdan yuboriladi va LLM javobini hech qachon bloklamaydi.

---

## Umumiy koʻrinish

### Maqsad

Koʻrinadigan taraqqiyot (XP, darajalar, nishonlar), ijtimoiy tasdiq (reyting jadvallari) va iqtisodiy ragʻbatlar (tokenlarni ulashish, taklif mukofotlari) orqali foydalanuvchilar faolligi va sodiqligini oshirish.

### Qamrov

| Imkoniyat                   | Tavsif                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| XP va darajalar             | Har bir amal uchun XP olish; polinomial egri chiziq boʻylab darajani oshirish                            |
| Nishonlar                   | 4 ta noyoblik darajasiga ega 5 toifadagi 20 dan ortiq yutuq                                              |
| Faollik seriyalari          | Joriy va eng uzoq seriyani hisobga olgan holda kunlik faol foydalanishni kuzatish                        |
| Reyting jadvallari          | Global, haftalik, oylik, token ulashish va hissa qoʻshish doiralari                                      |
| Token ulashish              | Ikki tomonlama yozuvlar reyestri orqali foydalanuvchilar oʻrtasida kreditlarni oʻtkazish                 |
| Taklif va faollashtirish    | SHA-256 bilan xeshlangan holda saqlanadigan yoʻnaltiruvchi kodlar                                        |
| Hamjamiyat serverlari       | Tashqi OmniRoute nusxalari bilan federatsiya qilish                                                      |
| Firibgarlikka qarshi himoya | Server tomonida ball hisoblash, soʻrovlar chastotasini cheklash, z-score asosida anomaliyalarni aniqlash |

### Loyihalash tamoyillari

1. **Avvalo mahalliy** — barcha holat SQLiteʼda saqlanadi, tashqi xizmatlar talab qilinmaydi.
2. **Bloklamaslik** — hodisalar natijani kutmasdan yuboriladi; LLM javob yoʻli geymifikatsiya mantigʻi tufayli hech qachon kechiktirilmaydi.
3. **Server vakolatli** — XP faqat server tomonida hisoblanadi; mijozlar ballarni sunʼiy ravishda oshirolmaydi.
4. **Maxfiylikka hurmat** — reyting jadvalida qatnashish ixtiyoriy; foydalanuvchilar oʻz profilini yashirishi mumkin.
5. **Federatsiyaga tayyor** — hamjamiyat serverlari imzolangan API orqali ballarni yuborishi mumkin; sinxronlash qoʻshish emas, qayta yozish orqali amalga oshiriladi.

---

## Arxitektura

### Yuqori darajadagi jarayon

```
Mijoz soʻrovi
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (mavjud ishlov berish jarayoni) ...
      → yuqori oqim javobi mijozga yuboriladi
      → setImmediate (natijani kutmasdan):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Hodisa emitenti yagona integratsiya nuqtasidir. Javob yuborilgandan soʻng `chatCore.ts`
`emitGamificationEvent()` funksiyasini chaqiradi; hodisa moduli hodisani XP, faollik seriyasi, nishon, reyting jadvali va firibgarlikka qarshi quyi tizimlarga tarqatadi.

### Modullar bogʻliqligi grafigi

```
src/lib/gamification/
  events.ts          ← kirish nuqtasi (chatCore.ts tomonidan chaqiriladi)
    ├── xp.ts        ← XP hisoblash va darajani aniqlash
    ├── streaks.ts   ← kunlik faollik seriyasini kuzatish
    ├── badges.ts    ← nishon mezonlarini baholash
    ├── leaderboard.ts ← oʻrinni hisoblash va SSE orqali uzatish
    ├── antiCheat.ts ← soʻrovlar chastotasini cheklash va anomaliyalarni aniqlash
    ├── sharing.ts   ← token oʻtkazmalari reyestri
    ├── invites.ts   ← taklif/faollashtirish kodlarini boshqarish
    ├── servers.ts   ← hamjamiyat serverlari federatsiyasi
    └── notifications.ts ← SSE bildirishnomalar oqimi

src/lib/db/
  gamification.ts    ← barcha CRUD amallari (8 ta jadval)

src/app/api/gamification/
  leaderboard/       ← GET reytinglari, POST orqali qoʻlda yangilash
  leaderboard/stream ← SSE orqali real vaqt yangilanishlari
  transfer/          ← GET tarixi, POST orqali tokenlarni yuborish
  invite/            ← GET/POST kodlari, DELETE orqali bekor qilish
  invite/redeem/     ← POST orqali kodni faollashtirish
  servers/           ← GET/POST/DELETE hamjamiyat serverlari
  federation/score/  ← POST orqali ballni serverga yuborish
  federation/leaderboard/ ← GET orqali reyting jadvalini serverdan olish
  notifications/     ← SSE nishon/daraja oshishi bildirishnomalari
  anomalies/         ← GET anomaliya hisobotlari (administrator)
  rotate/            ← POST orqali taklif tokenlari sirlarini almashtirish
```

---

## Maʼlumotlar qatlami

### Maʼlumotlar bazasi jadvallari

Barcha jadvallar asosiy OmniRoute SQLite maʼlumotlar bazasida joylashgan va
`060_create_gamification.sql` migratsiyasi orqali yaratiladi. WAL jurnallash
`src/lib/db/core.ts` ichidagi yagona `getDbInstance()` nusxasidan meros olinadi.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Domen moduli: `src/lib/db/gamification.ts`

Standart OmniRoute andozasiga amal qiladi — `getDbInstance()` funksiyasini
`core.ts` faylidan import qiladi va tiplashtirilgan CRUD funksiyalarini eksport qiladi. Marshrut ishlov beruvchilarida bevosita SQL mavjud emas.

Asosiy funksiyalar:

| Funksiya                   | Tavsif                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) uchun ballni kiritish yoki yangilash |
| `getLeaderboard()`         | Berilgan scope/period uchun sahifalangan reytinglar              |
| `getUserLevel()`           | Foydalanuvchi darajasi yozuvini olish yoki yaratish              |
| `updateUserLevel()`        | XP, daraja va unvonni atomar tarzda o‘rnatish                    |
| `getBadgeDefinitions()`    | Barcha nishon taʼriflari (ixtiyoriy filtrlash bilan)             |
| `getUserBadges()`          | Foydalanuvchi qo‘lga kiritgan nishonlar                          |
| `awardBadge()`             | Nishon yutug‘ini kiritish (badge_id bo‘yicha idempotent)         |
| `logXpAction()`            | xp_audit_log jurnaliga qo‘shish                                  |
| `getXpAuditLog()`          | Foydalanuvchi uchun sahifalangan audit tarixi                    |
| `insertLedgerEntry()`      | Ikki tomonlama yozuvli o‘tkazma (tranzaksiya ichida)             |
| `getBalance()`             | Foydalanuvchi uchun qabul qilinganlardan yuborilganlarni ayirish |
| `getTransferHistory()`     | Sahifalangan o‘tkazmalar jurnali                                 |
| `createInviteToken()`      | Taklif kodi va xeshlangan tokenni kiritish                       |
| `redeemInviteToken()`      | Kod bo‘yicha qidirish, tekshirish va foydalanish sonini oshirish |
| `upsertCommunityServer()`  | Federatsiya serverini ro‘yxatdan o‘tkazish yoki yangilash        |
| `getCommunityServers()`    | Foydalanuvchi serverlari ro‘yxatini olish                        |
| `deleteCommunityServer()`  | Server ro‘yxatdan o‘tkazilgan yozuvini olib tashlash             |

---

## XP / Daraja tizimi

**Fayl:** `src/lib/gamification/xp.ts`

### Daraja egri chizigʻi

`n`-darajaga erishish uchun talab qilinadigan XP polinomial egri chiziqqa asoslanadi:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Daraja | Keyingi darajagacha XP | Jami XP   | Unvon       |
| ------ | ---------------------- | --------- | ----------- |
| 1      | 100                    | 100       | Boshlovchi  |
| 5      | 1,118                  | 2,415     | Boshlovchi  |
| 10     | 3,162                  | 10,523    | Tadqiqotchi |
| 25     | 12,500                 | 86,024    | Tadqiqotchi |
| 50     | 35,355                 | 345,529   | Mutaxassis  |
| 75     | 64,952                 | 948,683   | Usta        |
| 100    | 100,000                | 2,050,000 | Afsona      |

### Unvonlar

| Daraja oraligʻi | Unvon       |
| --------------- | ----------- |
| 1 – 9           | Boshlovchi  |
| 10 – 24         | Tadqiqotchi |
| 25 – 49         | Mutaxassis  |
| 50 – 74         | Usta        |
| 75 – 100        | Afsona      |

### XP mukofotlari

| Amal              | XP  | Tavsif                                                             |
| ----------------- | --- | ------------------------------------------------------------------ |
| `request`         | 1   | OmniRoute orqali yoʻnaltirilgan har bir API soʻrovi uchun          |
| `provider_switch` | 5   | Boshqa provayderga oʻtish                                          |
| `model_switch`    | 3   | Boshqa modelga oʻtish                                              |
| `combo_create`    | 10  | Yangi kombinatsiya yaratish                                        |
| `combo_use`       | 2   | Soʻrov uchun kombinatsiyadan foydalanish                           |
| `token_share`     | 1   | Boshqa foydalanuvchi bilan ulashilgan har 1 000 token uchun        |
| `invite_redeem`   | 50  | Taklif kodini faollashtirish                                       |
| `daily_login`     | 5   | Kunlik faol foydalanish (kuniga bir marta)                         |
| `streak_bonus`    | 2   | Har bir ketma-ket faollik kuni uchun (davomiylikka koʻpaytiriladi) |
| `badge_unlock`    | 10  | Nishonni ochish                                                    |

### Mukofotlash jarayoni

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP miqdorini olish uchun `XP_REWARDS[action]` qiymatini qidiring.
2. `checkRateLimit()` orqali oʻtkazing (firibgarlikka qarshi: har bir kalit uchun daqiqasiga koʻpi bilan 1000 XP).
3. Tranzaksiyani oching:
   - Joriy `user_levels` qatorini oʻqing.
   - XP qoʻshing; darajani `levelFromXp(totalXp)` orqali qayta hisoblang.
   - Agar daraja oʻzgargan boʻlsa, `levelUp = true` qiymatini oʻrnating.
   - `user_levels` qatorini yangilang.
   - `xp_audit_log` ichiga yozuv kiriting.
4. Natijani qaytaring. Bildirishnomalarni chaqiruvchi tomon boshqaradi.

### Yordamchi funksiya: `levelFromXp(totalXp)`

Jami XP qiymati `totalXp` dan oshguncha `xp_for_level(n)` qiymatlarini qoʻshib, 1..100 darajalari boʻylab iteratsiya qiladi. Chegaraviy qiymatiga erishilgan eng yuqori darajani qaytaradi. Bu O(100) — darajalar soni 100 bilan cheklangani sababli maqbul.

---

## Nishonlar tizimi

**Fayl:** `src/lib/gamification/badges.ts`

### Toifalar

| Toifa          | Tavsif                                | Nishon namunalari                                  |
| -------------- | ------------------------------------- | -------------------------------------------------- |
| `usage`        | Hajmga asoslangan marralar            | Birinchi soʻrov, 1K soʻrov, 100K                   |
| `sharing`      | Token ulashish va tavsiyalar          | Birinchi ulashish, Saxiy (10 ta ulashish)          |
| `contribution` | Hamjamiyatdagi faollik                | Kombinatsiya yaratuvchisi, Provayder tadqiqotchisi |
| `streak`       | Vaqt davomida izchillik               | Hafta jangchisi, Oylik fidoyi                      |
| `rare`         | Erishish qiyin yoki yashirin yutuqlar | Ilk foydalanuvchi, Xato xabar beruvchisi           |

### Noyoblik darajalari

| Noyoblik darajasi | Rang    | Ehtimollik koʻrsatkichi    |
| ----------------- | ------- | -------------------------- |
| `common`          | Kulrang | Aksariyat foydalanuvchilar |
| `uncommon`        | Yashil  | Faol foydalanuvchilar      |
| `rare`            | Koʻk    | Sodiq foydalanuvchilar     |
| `legendary`       | Oltin   | Eng yuqori 1%              |

### Mezon turlari

| Tur            | Maydon       | Tavsif                                                        |
| -------------- | ------------ | ------------------------------------------------------------- |
| `action_count` | `count`      | Amalni N marta bajarish (masalan, 1000 ta soʻrov)             |
| `streak`       | `days`       | Faollikni ketma-ket N kun davomida saqlash                    |
| `unique_count` | `field`, `n` | N ta noyob qiymatdan foydalanish (masalan, 10 ta turli model) |
| `rank`         | `scope`, `n` | Reyting jadvali doirasida N-oʻringa erishish                  |
| `first`        | —            | Amalni birinchi boʻlib bajarish                               |
| `hidden`       | (turlicha)   | Erishilmaguncha koʻrsatilmaydigan mezonlar                    |

Nishon taʼriflari `badge_definitions` ichida JSON `criteria` sifatida saqlanadi:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Baholash jarayoni

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # barcha taʼriflar
    → getUserBadges(apiKeyId)         # allaqachon olinganlar (oʻtkazib yuboriladi)
    → har bir olinmagan nishon uchun:
       → matchesCriteria(badge, event, userState)
       → agar mos kelsa: awardBadge(apiKeyId, badgeId)
         → bildirishnoma maʼlumotlarini qaytarish
```

Baholash **hodisalarga asoslangan** — u har bir geymifikatsiya hodisasidan soʻng ishga tushadi, ammo faqat `criteria.type` qiymati hodisa amaliga mos keladigan nishonlarni tekshiradi. Bu baholashni tez saqlaydi (aksariyat hodisalar uchun < 5ms).

### `matchesCriteria(badge, event, userState)`

| Mezon turi     | Tekshiruv                                                    |
| -------------- | ------------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                  |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                         |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                       |
| `rank`         | `getRank(apiKeyId, scope) <= n`                              |
| `first`        | Bu amal turi uchun avvalgi `xp_audit_log` yozuvi mavjud emas |
| `hidden`       | Tegishli quyi tekshiruvga topshiradi                         |

### Ichki nishonlar (20+)

<details>
<summary>Nishonlarning toʻliq roʻyxati</summary>

| Nishon                     | Toifa          | Noyoblik  | Mezonlar                             |
| -------------------------- | -------------- | --------- | ------------------------------------ |
| Ilk qadamlar               | foydalanish    | odatiy    | 1 ta soʻrov                          |
| Qizib olish                | foydalanish    | odatiy    | 100 ta soʻrov                        |
| Faol foydalanuvchi         | foydalanish    | noodatiy  | 1,000 ta soʻrov                      |
| Yuzboshi                   | foydalanish    | noyob     | 10,000 ta soʻrov                     |
| Cheksiz qudrat             | foydalanish    | afsonaviy | 100,000 ta soʻrov                    |
| Provayderlar kezuvchisi    | hissa qoʻshish | odatiy    | 5 ta turli provayderdan foydalanish  |
| Provayderlar ustasi        | hissa qoʻshish | noodatiy  | 20 ta turli provayderdan foydalanish |
| Kombinatsiya meʼmori       | hissa qoʻshish | noodatiy  | 5 ta kombinatsiya yaratish           |
| Kombinatsiya grossmeysteri | hissa qoʻshish | noyob     | 25 ta kombinatsiya yaratish          |
| Ilk ulashuv                | ulashish       | odatiy    | 1 ta token oʻtkazmasi                |
| Saxiy                      | ulashish       | noodatiy  | 10 ta token oʻtkazmasi               |
| Xayriyachi                 | ulashish       | noyob     | Jami 10,000 ta token oʻtkazish       |
| Taklif qiluvchi            | ulashish       | odatiy    | 1 ta muvaffaqiyatli taklif           |
| Tarmoq yaratuvchisi        | ulashish       | noodatiy  | 10 ta muvaffaqiyatli taklif          |
| Hafta jangchisi            | ketma-ketlik   | noodatiy  | 7 kunlik ketma-ketlik                |
| Bir oy sadoqat             | ketma-ketlik   | noyob     | 30 kunlik ketma-ketlik               |
| Toʻxtatib boʻlmas          | ketma-ketlik   | afsonaviy | 365 kunlik ketma-ketlik              |
| Ilk foydalanuvchi          | noyob          | afsonaviy | Beta davrida qoʻshilish              |
| Siqish kashshofi           | noyob          | noodatiy  | Siqishdan 100 marta foydalanish      |
| Koʻnikmalar toʻplovchisi   | noyob          | noyob     | 10 ta turli koʻnikmadan foydalanish  |
| Modellar tadqiqotchisi     | hissa qoʻshish | noodatiy  | 15 ta turli modeldan foydalanish     |

</details>

---

## Seriyalar kuzatuvchisi

**Fayl:** `src/lib/gamification/streaks.ts`

### Maʼlumotlar modeli

Seriyalar `key_value` jadvalida (umumiy yordamchi jadval) nomlar sohasi bilan ajratilgan kalitlar ostida saqlanadi:

| Kalit                         | Qiymat                           | Tavsif                   |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Faol seriya maʼlumotlari |

### Mantiq

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Seriya yozuvini `key_value` jadvalidan oʻqing.
2. `{current}`, `{longest}`, `{lastDate}` qiymatlarini tahlil qiling (`lastDate` — ISO sana satri).
3. Agar `lastDate === today` boʻlsa — oʻzgarish yoʻq (bugun allaqachon hisoblangan).
4. Agar `lastDate === yesterday` boʻlsa — `current` qiymatini oshiring; zarur boʻlsa, `longest` qiymatini yangilang.
5. Agar `lastDate < yesterday` boʻlsa — `current = 1` qilib qayta oʻrnating (seriya uzilgan).
6. Yangilangan yozuvni saqlang.
7. Bosqichlarni tekshiring: 7, 14, 30, 60, 90, 180, 365 kun. Agar bosqichdan oʻtilgan boʻlsa, `milestone = true` qilib belgilang (chaqiruvchi XP beradi va nishonlarni tekshiradi).

### Chekka holatlar

- **Vaqt mintaqasi**: seriyalar UTC sanalaridan foydalanadi (`new Date().toISOString().slice(0, 10)`).
  Bu ataylab qilingan — yagona kanonik vaqt mintaqasi vaqt mintaqalari oʻrtasida almashish orqali tizimni suiisteʼmol qilishning oldini oladi.
- **Yangi foydalanuvchilar**: seriya yozuvi mavjud emas; birinchi soʻrov uni
  `current=1, longest=1, lastDate=today` qiymatlari bilan yaratadi.
- **Kuniga bir nechta soʻrov**: seriyani faqat UTC kunidagi birinchi soʻrov oshiradi.

---

## Peshqadamlar jadvali

**Fayl:** `src/lib/gamification/leaderboard.ts`

### Qamrovlar

| Qamrov          | Davr    | Tavsif                                                                   |
| --------------- | ------- | ------------------------------------------------------------------------ |
| `global`        | `all`   | Barcha vaqt davomida yigʻilgan XP                                        |
| `weekly`        | `week`  | Joriy UTC haftasida (Du–Ya) olingan XP                                   |
| `monthly`       | `month` | Joriy UTC oyida olingan XP                                               |
| `tokens_shared` | `all`   | Boshqalarga oʻtkazilgan tokenlarning umumiy soni                         |
| `contributions` | `all`   | Yaratilgan kombolar + ishlatilgan provayderlar + ishlatilgan koʻnikmalar |

### Oʻrinni hisoblash

Oʻrinlar saqlanmaydi, balki **oʻqish vaqtida hisoblanadi**. Bu eskirgan oʻrin maʼlumotlarining oldini oladi va oʻrinlarni davriy qayta hisoblash vazifalariga ehtiyojni yoʻq qiladi.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Soʻrov namunasi:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Davrlarni almashtirish

Haftalik va oylik peshqadamlar jadvallari avtomatik ravishda almashtiriladi:

1. **Arxivlash**: davr chegarasida joriy yozuvlarni davr yorligʻi bilan
   `leaderboard_archive` jadvaliga nusxalang.
2. **Qayta oʻrnatish**: muddati tugagan davr yozuvlarini oʻchiring.
3. **Ishga tushirish**: har bir `updateLeaderboard()` chaqiruvida tekshiriladi; yangi davrning birinchi soʻrovi almashtirishni ishga tushiradi.

Bu haftalik jadvallarning har dushanba kuni UTC boʻyicha soat 00:00 da, oylik jadvallarning esa har oyning 1-kunida qayta oʻrnatilishini taʼminlaydi.

### SSE orqali real vaqt yangilanishlari

**Endpoint:** `GET /api/gamification/stream`

```
Mijoz → GET /api/gamification/stream
  → SSE ulanishi oʻrnatiladi
  → Server darhol peshqadamlar jadvalidagi eng yaxshi 10 talik holatini yuboradi
  → Har 5 soniyada: oʻzgargan boʻlsa, yangilangan eng yaxshi 10 talikni yuboradi
  → Har 15 soniyada: faoliyat signali izohi (": heartbeat\n\n")
  → Mijoz uziladi → tozalash (tinglovchini olib tashlash)
```

Hodisa formati:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE menejeri har bir qamrov boʻyicha ulangan mijozlarni kuzatadi va yangilanishlarni faqat peshqadamlar jadvali maʼlumotlari oxirgi yuborishdan beri haqiqatda oʻzgargan boʻlsa yuboradi.

---

## Tokenlarni ulashish

**Fayl:** `src/lib/gamification/sharing.ts`

### Ikki tomonlama buxgalteriya yozuvi

Har bir oʻtkazma `token_ledger` jadvalida ikkita qator yaratadi:

| Qator  | `from_key_id`  | `to_key_id`    | `amount` |
| ------ | -------------- | -------------- | -------- |
| Debet  | joʻnatuvchi    | qabul qiluvchi | +miqdor  |
| Kredit | qabul qiluvchi | joʻnatuvchi    | -miqdor  |

Biroq, qoida quyidagicha:

| Qator        | `from_key_id`  | `to_key_id`    | `amount` | Maʼnosi                          |
| ------------ | -------------- | -------------- | -------- | -------------------------------- |
| Joʻnatish    | joʻnatuvchi    | qabul qiluvchi | +miqdor  | Joʻnatuvchidan mablagʻ chiqishi  |
| Qabul qilish | qabul qiluvchi | joʻnatuvchi    | +miqdor  | Qabul qiluvchiga mablagʻ kirishi |

Balans quyidagicha hisoblanadi:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Oʻtkazma jarayoni

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Tekshirish**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentlik**: `idempotency_key` buxgalteriya daftarida allaqachon mavjudligini tekshiring.
   Agar mavjud boʻlsa, keshlangan natijani qaytaring.
3. **Tranzaksiya** (yagona SQLite tranzaksiyasi):
   a. Joʻnatuvchi balansini hisoblang.
   b. Agar `balance < amount` boʻlsa, bekor qiling (mablagʻ yetarli emas).
   c. Joʻnatish qatorini kiriting (`from=sender,` natijasini qaytaring.

### Tezlikni cheklash

- Har bir API kaliti uchun daqiqasiga koʻpi bilan 10 ta oʻtkazma.
- Bitta oʻtkazmada koʻpi bilan 10,000 ta token.
- Har bir API kaliti uchun bir kunda koʻpi bilan 100,000 ta token oʻtkazilishi mumkin.

---

## Taklif va tokenlarni faollashtirish

**Fayl:** `src/lib/gamification/invites.ts`

### Kod formati

- **Kod**: 8 belgidan iborat harf-raqamli kod (masalan, `A3K9-X7M2`), inson oʻqishi uchun qulay,
  foydalanuvchiga koʻrsatiladi.
- **Token**: 32 baytli tasodifiy token, SHA-256 xeshi sifatida saqlanadi. Dasturiy
  faollashtirish uchun ishlatiladi (masalan, URL havolalari).

### Saqlash

| Ustun        | Qiymat                           |
| ------------ | -------------------------------- |
| `code`       | `A3K9X7M2` (noyob, indekslangan) |
| `token_hash` | SHA-256(raw_token)               |

Xom token yaratilish vaqtida foydalanuvchiga faqat bir marta qaytariladi. OmniRoute
uni boshqa hech qachon saqlamaydi yoki koʻrsatmaydi — faqat xesh saqlanib qoladi.

### Oʻz-oʻzini tavsiya qilishning oldini olish

Foydalanuvchi kodni faollashtirganda, tizim quyidagilarni tekshiradi:

1. Kod boshqa `api_key_id` ga tegishli.
2. Faollashtirayotgan foydalanuvchi ayni shu tavsiya beruvchining boshqa kodini
   ilgari faollashtirmagan (`invite_tokens` + faollashtirish jurnali boʻyicha birlashtiriladi).

Agar tekshiruvlardan biri muvaffaqiyatsiz boʻlsa, faollashtirish aniq xato xabari bilan rad etiladi.

### Amal qilish muddati va cheklovlar

- Standart `max_uses`: 10 (yaratish vaqtida sozlanadi).
- Standart `expires_at`: yaratilganidan keyin 30 kun.
- Muddati tugagan yoki foydalanish limiti tugagan kodlar HTTP 410 Gone javobini qaytaradi.

---

## Hamjamiyat serverlari federatsiyasi

**Fayl:** `src/lib/gamification/servers.ts`

### Ulanish

Hamjamiyat serveri masofaviy server tomonidan berilgan taklif tokeni orqali roʻyxatdan oʻtkaziladi. Mahalliy instansiya:

1. Taklif tokenini qabul qiladi (masalan, boshqaruv paneliga kiritilganda).
2. Tokenni tekshirish va joriy peshqadamlar jadvalini olish uchun masofaviy serverdagi `POST /api/gamification/federation/leaderboard` soʻrovini chaqiradi.
3. Server yozuvini `status: connected` bilan saqlaydi.

### Sinxronlash modeli

Federatsiya qoʻshib borish usulidan emas, **ustiga yozib sinxronlash** usulidan foydalanadi:

```
Mahalliy instansiya            Hamjamiyat serveri
     │                              │
     ├── ballni yuborish ──────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server token xeshini tekshiradi)
     │                              │
     ├── peshqadamlar jadvalini ───►│  GET /federation/leaderboard
     │   olish                      │
     │◄── eng yuqori N ta yozuv ───┤  (mahalliy kesh ustiga yozadi)
     │                              │
     └── holatni tekshirish ───────►│  GET /federation/health
         (har 60 soniyada,          │
          kutish vaqti 5 soniya)    │
```

### Autentifikatsiya

Federatsiya soʻrovlari quyidagilarni oʻz ichiga oladi:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Masofaviy server tokenni xeshlaydi va unga mos `community_servers` qatorini qidiradi. Bu saqlangan xeshni uzatish zaruratini bartaraf etadi.

### Holatni kuzatish

Har bir server yozuvida quyidagilar kuzatib boriladi:

| Maydon      | Tavsif                                          |
| ----------- | ----------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`          |
| `last_sync` | Oxirgi muvaffaqiyatli sinxronlashning ISO vaqti |
| `failures`  | Ketma-ket muvaffaqiyatsiz holat tekshiruvlari   |

Ketma-ket 5 ta tekshiruv muvaffaqiyatsiz tugagach, holat `unreachable` qiymatiga oʻzgaradi va qoʻlda bajarilgan holat tekshiruvi muvaffaqiyatli yakunlanmaguncha sinxronlash toʻxtatiladi.

---

## Firibgarlikka qarshi himoya

**Fayl:** `src/lib/gamification/antiCheat.ts`

### Server tomonida ball hisoblash

Barcha XP hisob-kitoblari `src/lib/gamification/xp.ts` faylida amalga oshiriladi. Mijozlar hech qachon ball yubormaydi — ular amallarni yuboradi, server esa XP ni hisoblaydi. `leaderboard.score` ustuniga faqat server tomonidagi kod yozishi mumkin.

### Soʻrovlar tezligini cheklash

| Cheklov                         | Qiymat  | Qamrov              |
| ------------------------------- | ------- | ------------------- |
| Daqiqasiga maksimal XP          | 1,000   | Har bir API kalitga |
| Daqiqasiga maksimal oʻtkazmalar | 10      | Har bir API kalitga |
| Maksimal oʻtkazma miqdori       | 10,000  | Har bir oʻtkazmaga  |
| Kunlik maksimal oʻtkazmalar     | 100,000 | Har bir API kalitga |

Tezlik cheklovlari xotirada saqlanadigan sirgʻaluvchi vaqt oraligʻidan foydalanadi (`open-sse/services/` ichidagi `RateLimitManager` bilan bir xil andoza). Jarayon qayta ishga tushsa, SQLite asosidagi hisoblagichlarga oʻtiladi.

### Z-balli anomaliyalarni aniqlash

Har bir API kalit uchun tizim soatiga olingan XP boʻyicha soʻnggi 7 kunlik sirgʻaluvchi vaqt oraligʻini yuritadi. Har bir XP berilganda:

1. Foydalanuvchining joriy soatlik XP tezligini hisoblaydi.
2. Bosh toʻplamning oʻrtacha qiymati va standart ogʻishini hisoblaydi.
3. `z = (user_rate - mean) / stddev` qiymatini hisoblaydi.
4. Agar `z > 3.0` boʻlsa (3 ta standart ogʻish), anomaliya sifatida belgilaydi.

Anomaliyalar `xp_audit_log` jurnaliga `action = 'anomaly_detected'` bilan yoziladi va administrator boshqaruv panelida koʻrsatiladi.

### Audit jurnali

Har bir XP berish, oʻtkazma, nishon olish va anomaliya aniqlash hodisasi `xp_audit_log` jurnaliga quyidagilar bilan yoziladi:

| Maydon       | Tavsif                                                  |
| ------------ | ------------------------------------------------------- |
| `api_key_id` | Kim                                                     |
| `action`     | Nima sodir boʻldi (xp_award, transfer, anomaly, …)      |
| `xp_awarded` | Miqdor (XP bilan bogʻliq boʻlmagan hodisalar uchun 0)   |
| `metadata`   | Kontekstni oʻz ichiga olgan JSON (amal turi, nishon, …) |
| `created_at` | Qachon (ISO 8601)                                       |

Administratorlar toʻliq audit jurnalini `GET /api/gamification/anomalies` orqali soʻrashi mumkin.

---

## API yoʻnalishlari

Barcha yoʻnalishlar standart OmniRoute qolipiga amal qiladi:

```
Yoʻnalish → CORS dastlabki soʻrovi → Soʻrov tanasini tekshirish (Zod) → Autentifikatsiya (extractApiKey)
  → Ishlov beruvchi
```

### Yakuniy nuqtalar

| Metod  | Yoʻl                                       | Tavsif                                                        | Autentifikatsiya |
| ------ | ------------------------------------------ | ------------------------------------------------------------- | ---------------- |
| GET    | `/api/gamification/leaderboard`            | Peshqadamlar jadvalini olish (qamrov, davr, sahifalash)       | Ixtiyoriy        |
| POST   | `/api/gamification/leaderboard`            | Peshqadamlar jadvali keshini majburan yangilash               | Majburiy         |
| GET    | `/api/gamification/stream`                 | SSE orqali peshqadamlar jadvalining real vaqt yangilanishlari | Ixtiyoriy        |
| GET    | `/api/gamification/transfer`               | Oʻtkazmalar tarixini olish (sahifalash)                       | Majburiy         |
| POST   | `/api/gamification/transfer`               | Boshqa foydalanuvchiga tokenlar yuborish                      | Majburiy         |
| GET    | `/api/gamification/invite`                 | Taklif kodlarimni roʻyxatlash                                 | Majburiy         |
| POST   | `/api/gamification/invite`                 | Yangi taklif kodini yaratish                                  | Majburiy         |
| DELETE | `/api/gamification/invite`                 | Taklif kodini bekor qilish                                    | Majburiy         |
| POST   | `/api/gamification/invite/redeem`          | Taklif kodidan foydalanish                                    | Majburiy         |
| GET    | `/api/gamification/servers`                | Hamjamiyat serverlarini roʻyxatlash                           | Majburiy         |
| POST   | `/api/gamification/servers`                | Hamjamiyat serveriga ulanish                                  | Majburiy         |
| DELETE | `/api/gamification/servers`                | Hamjamiyat serveridan uzilish                                 | Majburiy         |
| POST   | `/api/gamification/federation/score`       | Ballni masofaviy serverga yuborish                            | Federatsiya      |
| GET    | `/api/gamification/federation/leaderboard` | Peshqadamlar jadvalini masofaviy serverdan olish              | Federatsiya      |
| GET    | `/api/gamification/notifications`          | SSE orqali nishon/daraja oshishi bildirishnomalari            | Majburiy         |
| GET    | `/api/gamification/anomalies`              | Anomaliya hisobotlarini koʻrish (administrator)               | Administrator    |
| POST   | `/api/gamification/rotate`                 | Taklif tokeni sirlarini almashtirish                          | Majburiy         |

### Soʻrov/Javob namunalari

**POST /api/gamification/transfer**

```json
// Soʻrov
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Javob 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Javob 400 (mablagʻ yetarli emas)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP vositalari (8)

Mavjud vositalar bilan birga `open-sse/mcp-server/` ichida roʻyxatdan oʻtkazilgan. Ular
`gamification` ruxsat doirasi bilan cheklangan.

| Vosita                     | Tavsif                                                  | Kirish sxemasi               |           |
| -------------------------- | ------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Doira/davr uchun peshqadamlar jadvalini olish           | `{ scope, period?, limit? }` |
| `gamification_rank`        | Soʻrovchining oʻrni va qoʻshnilarini olish              | `{ scope }`                  |
| `gamification_profile`     | XP, daraja, unvon va seriya xulosasini olish            | `{}`                         |
| `gamification_badges`      | Olingan nishonlar yoki barcha taʼriflarni roʻyxatlash   | `{ earned?: boolean }`       |
| `gamification_transfer`    | Boshqa foydalanuvchiga tokenlar yuborish                | `{ to, amount }`             |
| `gamification_invite`      | Taklif kodlarini yaratish yoki roʻyxatlash              | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Hamjamiyat serverlarini roʻyxatlash yoki ularga ulanish | `{ action, token? }`         |
| `gamification_anomalies`   | Anomaliya hisobotlarini koʻrish (administrator doirasi) | `{ limit?, since? }`         |

---

## Boshqaruv paneli sahifalari

### `/dashboard/leaderboard`

- Poydevor koʻrinishi (avatarlar va XP bilan eng yaxshi 3 ishtirokchi).
- Doira tanlagichi: Global / Haftalik / Oylik / Ulashilgan tokenlar / Hissalar.
- Oʻrin, ism, natija, daraja va unvon koʻrsatilgan sahifalangan jadval (har bir sahifada 25 ta).
- SSE orqali real vaqtdagi yangilanishlar — oʻrin oʻzgarishlari animatsiya bilan koʻrsatiladi.
- Joriy foydalanuvchi jadvalda ajratib koʻrsatiladi va "Sizning oʻrningiz" yopishqoq qatori mavjud.

### `/dashboard/profile`

- Joriy daraja va keyingi daraja chegarasi koʻrsatilgan XP taraqqiyot paneli.
- Unvon nishoni yaqqol koʻrsatiladi.
- Nishonlar galereyasi — olingan nishonlar olingan sanasi bilan, olinmagan nishonlar esa xiralashtirib koʻrsatiladi
  (yashirin nishonlar olinguniga qadar "???" koʻrinishida boʻladi).
- Alanga belgili seriya hisoblagichi; seriya taqvimi (oxirgi 30 kun).
- XP tarixi diagrammasi (oxirgi 30 kundagi kunlik XP).

### `/dashboard/tokens`

- Token balansi (yaqqol, sahifaning yuqori qismida).
- Oʻtkazma shakli: qabul qiluvchi, miqdor, tasdiqlash oynasi.
- Filtrli oʻtkazmalar tarixi jadvali (yuborilgan/qabul qilingan/barchasi).
- Taklif boʻlimi: faol kodlar, yangisini yaratish, havolani ulashish.
- Hamjamiyat serverlari: holat koʻrsatkichi bilan roʻyxat, ulash/uzish.

### `/dashboard/gamification/admin`

- Jiddiylik darajasi, foydalanuvchi, vaqt tamgʻasi va z-balli koʻrsatilgan anomaliyalar roʻyxati.
- Filtrli audit jurnali koʻruvchisi (amal turi, foydalanuvchi, sana oraligʻi).
- Tizim statistikasi: jami berilgan XP, faol foydalanuvchilar, nishonlarni olish koʻrsatkichlari.
- Federatsiya serverlari holatining umumiy koʻrinishi.

---

## Jarayonlar ketma-ketligiga integratsiya

### Integratsiya nuqtasi

Gamifikatsiya soʻrovlar jarayonlar ketma-ketligiga `open-sse/handlers/chatCore.ts`
faylidagi yagona nuqtada ulanadi:

```typescript
// Javob mijozga yuborilgandan keyin:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Ishga tushir va unut: jurnalga yozilsin, ammo hech qachon mijozga uzatilmasin
  });
});
```

### Hodisa turlari

| Hodisa turi         | Qachon chiqariladi                                                                     |
| ------------------- | -------------------------------------------------------------------------------------- |
| `request.completed` | Muvaffaqiyatli LLM javobi yuborilganda                                                 |
| `provider.switch`   | Provayder oʻzgartirilganda (kombinatsiyaning zaxira variantga oʻtishi ham hisoblanadi) |
| `combo.created`     | Yangi kombinatsiya konfiguratsiyasi saqlanganda                                        |
| `combo.used`        | Kombinatsiya nishoniga muvaffaqiyatli erishilganda                                     |
| `badge.earned`      | Nishonni baholash moslikni aniqlaganda                                                 |
| `streak.milestone`  | Seriya chegarasidan oʻtilganda                                                         |
| `transfer.sent`     | Token oʻtkazmasi yakunlanganda                                                         |
| `referral.redeemed` | Taklif kodi muvaffaqiyatli ishlatilganda                                               |
| `compression.used`  | Prompt siqilishi qoʻllanganda                                                          |
| `skill.executed`    | Koʻnikma bajarilishi yakunlanganda                                                     |
| `model.first_use`   | Model oxirgi 7 kun ichida ishlatilmagan boʻlsa                                         |

### Bloklamaslik kafolati

`setImmediate` + `.catch(() => {})` namunasi quyidagilarni taʼminlaydi:

1. Gamifikatsiya ishga tushishidan oldin javob toʻliq yuboriladi.
2. Gamifikatsiya xatolari hech qachon mijozga koʻrsatilmaydi.
3. Hodisani qayta ishlash shu joyning oʻzida emas, keyingi mikrovazifada bajariladi.

---

## Xavfsizlik

### Tahdid modeli

| Tahdid                                    | Bartaraf etish chorasi                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------- |
| Ballarni sunʼiy oshirish                  | XP faqat server tomonida hisoblanadi; mijozlar ballarni emas, amallarni yuboradi |
| Takroriy hujumlar                         | Oʻtkazmalar uchun idempotentlik kalitlari; audit jurnalida takrorlarni aniqlash  |
| Oʻtkazmalardagi firibgarlik               | Ikki tomonlama hisob reyestri; atomar tranzaksiyalar; tezlik cheklovlari         |
| Oʻz-oʻzini taklif qilish                  | Faollashtirishda `api_key_id` qiymatini oʻzaro tekshirish                        |
| Reyting jadvalini boshqarish              | Z-balli anomaliyalarni aniqlash; administrator anomaliyalar paneli               |
| Federatsiya tokenini oʻgʻirlash           | SHA-256 bilan xeshlangan holda saqlash; xom token faqat bir marta koʻrsatiladi   |
| Taklif kodlarini qoʻpol kuch bilan topish | Faollashtirish soʻnggi nuqtasida tezlikni cheklash; 8 belgili entropiya          |
| Koʻrsatiladigan nomlardagi XSS            | Koʻrsatiladigan nomlar tozalanadi; reyting jadvali yozuvlari ekranlanadi         |
| Xeshlarga vaqt boʻyicha hujumlar          | Token xeshlarini taqqoslash uchun `crypto.timingSafeEqual`                       |

### Autentifikatsiya talablari

- **Ommaviy** (autentifikatsiyasiz): `GET /leaderboard`, `GET /stream` (faqat
  oʻqish uchun reyting jadvallari).
- **API kaliti talab qilinadi**: barcha yozish amallari, profil, oʻtkazmalar va takliflar.
- **Faqat administrator uchun**: anomaliyalar paneli, audit jurnalini koʻrish vositasi.
- **Federatsiya**: `Authorization` sarlavhasidagi xom tokendan foydalanadigan
  alohida autentifikatsiya yoʻli; u saqlangan SHA-256 xeshi bilan tekshiriladi.

---

## Sinov

### Sinov fayllari

Barcha sinovlar Node.js ichki sinov ishga tushirgichidan (`node --import tsx/esm --test`) foydalanadi.

| Sinov fayli                                   | Qamrovi                                                             | Sinovlar |
| --------------------------------------------- | ------------------------------------------------------------------- | -------- |
| `tests/unit/gamification/xp.test.ts`          | XP hisoblash, daraja egri chizigʻi, unvonlar                        | 8        |
| `tests/unit/gamification/badges.test.ts`      | Nishon mezonlarini moslashtirish va berish                          | 10       |
| `tests/unit/gamification/streaks.test.ts`     | Seriyalar mantigʻi, marralar, chegaraviy holatlar                   | 7        |
| `tests/unit/gamification/leaderboard.test.ts` | Oʻrinni hisoblash, sahifalash, aylantirish                          | 8        |
| `tests/unit/gamification/sharing.test.ts`     | Oʻtkazmalar, balans, idempotentlik                                  | 9        |
| `tests/unit/gamification/invites.test.ts`     | Yaratish, faollashtirish, muddati tugashi, oʻz-oʻzini taklif qilish | 7        |
| `tests/unit/gamification/antiCheat.test.ts`   | Tezlik cheklovlari, z-ball, audit jurnalini yuritish                | 6        |
| `tests/unit/gamification/events.test.ts`      | Hodisalarni chiqarish, tarqatish, xatolarni boshqarish              | 5        |

### Sinovlarni ishga tushirish

```bash
# Barcha geymifikatsiya sinovlari
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Bitta sinov fayli
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Qamrov talablari

`CONTRIBUTING.md` talablariga koʻra — barcha yangi modullar quyidagilarga ega boʻlishi kerak:

- Tarmoqlar qamrovi >= 80%.
- Har bir ochiq funksiya kamida bir marta sinovdan oʻtkazilishi.
- Xato yoʻllari sinovdan oʻtkazilishi (yetarli boʻlmagan balans, muddati tugagan kodlar, tezlik cheklovlari).

---

## Fayl tuzilmasi

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Barcha 8 ta jadval + indekslar
      gamification.ts                  # Domen CRUD moduli
    gamification/
      xp.ts                           # XP hisoblash, daraja egri chizigʻi, unvonlar
      badges.ts                       # Nishon taʼriflari, mezonlari, baholash
      streaks.ts                      # Kunlik ketma-ketlikni kuzatish
      leaderboard.ts                  # Reytingni hisoblash, SSE, rotatsiya
      antiCheat.ts                    # Chastotani cheklash, z-ball, audit
      sharing.ts                      # Token oʻtkazmalari reyestri
      invites.ts                      # Taklif/aktivlashtirish kodlari
      servers.ts                      # Hamjamiyat serverlari federatsiyasi
      events.ts                       # Hodisalar emitenti (integratsiya nuqtasi)
      notifications.ts                # SSE bildirishnomalar oqimi
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST reyting jadvali
        leaderboard/stream/route.ts   # SSE real vaqt yangilanishlari
        transfer/route.ts             # GET/POST oʻtkazmalar
        invite/route.ts               # GET/POST/DELETE taklif kodlari
        invite/redeem/route.ts        # POST kodni aktivlashtirish
        servers/route.ts              # GET/POST/DELETE serverlar
        federation/score/route.ts     # POST natijani yuborish
        federation/leaderboard/route.ts # GET reyting jadvalini olish
        notifications/route.ts        # SSE bildirishnomalari
        anomalies/route.ts            # GET anomaliya hisobotlari
        rotate/route.ts               # POST maxfiy kalitlarni almashtirish
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Reytinglar sahifasi
        profile/page.tsx               # XP/nishonlar/ketma-ketliklar sahifasi
        tokens/page.tsx                # Balans/oʻtkazmalar/takliflar sahifasi
        gamification/admin/page.tsx    # Anomaliyalarni administrator sifatida kuzatish
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Ushbu hujjat
```

---

## Migratsiya strategiyasi

### 1-bosqich: Backend yadrosi (PR 1)

- `060_create_gamification.sql` migratsiyasi (8 ta jadval).
- `src/lib/db/gamification.ts` (domen moduli).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts` faylidagi integratsiya nuqtasi.
- XP, ketma-ketliklar va hodisalar uchun modul testlari.

### 2-bosqich: Nishonlar va reyting jadvali (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Konstantalardagi nishon taʼriflari.
- Reyting jadvali API marshrutlari + SSE oqimi.
- Nishonlar va reyting jadvali uchun modul testlari.

### 3-bosqich: Ulashish va takliflar (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Oʻtkazma + taklif API marshrutlari.
- Ulashish, takliflar va firibgarlikka qarshi himoya uchun modul testlari.

### 4-bosqich: Federatsiya va boshqaruv paneli (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federatsiya API marshrutlari.
- Boshqaruv paneli sahifalari (reyting jadvali, profil, tokenlar, administrator).
- MCP vositalarini roʻyxatdan oʻtkazish.

---

## Kelajakdagi imkoniyatlar

- **Mavsumiy tadbirlar**: cheklangan muddatli nishonlar toʻplamlari va reyting jadvali mavsumlari.
- **Jamoaviy reyting jadvallari**: foydalanuvchilarni tashkilot yoki kombinatsiya boʻyicha guruhlash.
- **XP koʻpaytirgichlari**: reklama davrlarida XP miqdorini oshirish.
- **Yutuqlarni ulashish**: ulashish mumkin boʻlgan nishon kartalarini yaratish (OpenGraph tasvirlari).
- **Mobil push-bildirishnomalar**: nishon/daraja hodisalari uchun webhook asosidagi bildirishnomalar.
- **Reyting jadvali API’si**: uchinchi tomon integratsiyalari uchun ochiq API.
