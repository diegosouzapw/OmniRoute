# SQLite Runtime Resolution (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ishga tushirilayotganda SQLite drayverini 5 bosqichli zaxira zanjiri orqali aniqlaydi:

1. **Paketga kiritilgan `better-sqlite3`** (`package.json` faylidagi `dependencies` orqali)
   — eng tezkor variant, mahalliy ikkilik fayl; qurish vositalari mavjud bo‘lsa, `npm install` tomonidan o‘rnatiladi.

2. **Ishlash vaqtida o‘rnatilgan `better-sqlite3`** (`~/.omniroute/runtime/` ichida)
   — birinchi ishga tushirishda **YOKI** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` orqali zaruratga ko‘ra o‘rnatiladi.
   Buzilgan yoki boshqa platformaga mo‘ljallangan ikkilik fayllardan himoyalanish uchun yuklashdan oldin mahalliy `.node` faylining sehrli baytlari (ELF / Mach-O / PE) tekshiriladi.

3. **`node:sqlite`** (Node ≥22.5 standart kutubxonasi) — mahalliy qurish talab qilinmaydi; better-sqlite3 yo‘llarining ikkalasi ham muvaffaqiyatsiz bo‘lganda ishlatiladi. Imkoniyatlari cheklangan.

4. **`sql.js`** (WASM) — yakuniy zaxira variant. Hamma joyda ishlaydi, ammo sekinroq
   va ma’lumotlarni sinxron ravishda emas, muayyan oraliqlarda yozadi.

## Nega bu qadar murakkab?

- **Windows EBUSY**: oldingi versiyaning `better_sqlite3.node` fayli ishlayotgan jarayon tomonidan bloklangan bo‘lsa, `npm install -g omniroute@latest` muvaffaqiyatsiz tugashi mumkin. `~/.omniroute/runtime/` ichidagi ishlash vaqti o‘rnatilishi global npm keshini chetlab o‘tadi.
- **Qurish vositalari yo‘q**: ayrim muhitlar (VS Build Tools mavjud bo‘lmagan korporativ Windows tizimlari, minimal Docker tasvirlari) `better-sqlite3` paketini kompilyatsiya qila olmaydi. Ishlash vaqti o‘rnatuvchisi npm reyestridan oldindan qurilgan ikkilik faylni oladi; bu ham muvaffaqiyatsiz bo‘lsa, zaxira drayverlar OmniRoute ishga tushishini ta’minlaydi.
- **Tarmoqdan uzilgan tizimlar**: npm reyestriga kirib bo‘lmasa, `node:sqlite`
  yoki `sql.js` asosiy funksionallikni kafolatlaydi.

## Sehrli baytlarni tekshirish

Ishlash vaqtida o‘rnatilgan `.node` faylini yuklashdan oldin OmniRoute dastlabki 8
baytni o‘qiydi va ularni ma’lum platformalarning sehrli baytlari bilan solishtiradi:

| Platforma             | Baytlar (hex) | Yorliq      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

Sehrli baytlar mos kelmasa → fayl e’tiborga olinmaydi va zaxira zanjiri keyingi bosqichga o‘tadi.

## Faol drayverni tekshirish

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## Qo‘lda boshqarish

```bash
# Tezkor CI o‘rnatishlari uchun postinstall qizdirishini o‘tkazib yuborish
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# Ishlash vaqtidagi better-sqlite3 paketini majburan qayta o‘rnatish
rm -rf ~/.omniroute/runtime
omniroute  # keyingi ishga tushirishda qayta o‘rnatiladi

# Qaysi drayver faolligini tekshirish
omniroute config db-info  # (agar CLI buyrug‘i mavjud bo‘lsa)
```

## Ma’lumotnoma

Amalga oshirish:

- `bin/cli/runtime/magicBytes.mjs` — ikkilik fayllarning sehrli baytlarini tekshirish yordamchilari
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 bosqichli ishlash vaqti aniqlovchisi + zaruratga ko‘ra o‘rnatuvchi
- `bin/cli/runtime/index.mjs` — ishga tushirish orkestratori (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm o‘rnatishdan keyingi xuki (xatoga olib kelmaydigan qizdirish)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` eksportlari

## Bitta yozuvchili topologiya (HA qo‘llab-quvvatlanmaydi)

Yuqoridagi drayverlarning zaxira zanjiri hamon **bitta jarayonda** ishlaydi. Standart SQLite bilan OmniRoute **bitta yozuvchiga** ega:

- Ikkita OmniRoute replikasini bir xil `storage.sqlite` fayliga ulamang.
- Konteynerning qayta ishga tushishi, Recreate joylashtirishi, OOM tufayli to‘xtatilishi yoki HEALTHCHECK qayta ishga tushirishi jarayondagi barcha SSE seanslarini uzadi. Standart yo‘lda seanslarni bosqichma-bosqich yakunlash mexanizmi yo‘q.
- Sekin ishlayotgan `/healthz` manzilini ishlamayapti deb hisoblaydigan orkestratorning ishlash holati tekshiruvi yagona replikani to‘xtatadi. TCP ishlash holati tekshiruvi + HTTP `/healthz` tayyorlik tekshiruvini afzal ko‘ring. Quyidagilarga qarang:
  [Docker qo‘llanmasi — mavjudlik](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  va [Kubernetes tekshiruvlari bo‘yicha tavsiyalar](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
