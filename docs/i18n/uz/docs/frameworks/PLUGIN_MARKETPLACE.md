# Plugin Marketplace (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Haqiqiy manba:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` va
> `src/app/(dashboard)/dashboard/plugins/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute WordPress uslubidagi plagin tizimi bilan birga taqdim etiladi. Plaginlar
mustaqil kataloglardir — har birida `plugin.json` manifesti va kirish fayli mavjud —
ular soʻrovlarni qayta ishlash jarayoniga (`onRequest` / `onResponse` / `onError`)
hamda hayotiy sikl hodisalariga (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`) ulanadi.

**Plaginlar marketpleysi** ushbu tizim ustidagi plaginlarni topish qatlamidir. U
oʻrnatish mumkin boʻlgan plaginlarning koʻrib chiqiladigan katalogini taqdim etadi.
Standart holatda katalog kichik ichki boshlangʻich reyestrdan iborat; operator uni
maxsus masofaviy reyestr URL manziliga yoʻnaltirishi mumkin, bu holda olish jarayoni
DNS aniqlashga asoslangan SSRF himoyasi orqali mustahkamlanadi
([Xavfsizlik](#security) boʻlimiga qarang).

Har bir plagin marshruti **faqat loopback orqali ishlaydi** (1-daraja —
`LOCAL_ONLY`): plaginlar kodni yordamchi jarayonlarda yuklaydi va bajaradi, shu
sababli autentifikatsiyadan qatʼi nazar, marshrutlarga loopback boʻlmagan
manbalardan kirib boʻlmaydi.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) fayliga
qarang.

## Tizim qismlarining oʻzaro ishlashi

```
Boshqaruv paneli (/dashboard/plugins)
  ├─ "Oʻrnatilgan" varagʻi → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (oʻchirish)
  └─ "Marketpleys" varagʻi → GET /api/plugins/marketplace
                               → listMarketplacePlugins()
                                 ├─ maxsus URL yoʻq → ichki SEED_REGISTRY
                                 └─ maxsus URL → isSafeMarketplaceUrl() SSRF himoyasi
                                               → safeOutboundFetch(guard:"public-only")
```

- **Reyestr qatlami** — `src/lib/plugins/marketplace.ts`: katalogni roʻyxatlaydi /
  qidiradi va har qanday xatolikda boshlangʻich reyestrga qaytadi.
- **Hayotiy sikl qatlami** — `src/lib/plugins/manager.ts` (`pluginManager`
  singletoni): oʻrnatish, yangilash, faollashtirish, faolsizlantirish, oʻchirish,
  skanerlash va ishga tushishda yuklash.
- **Manifest qatlami** — `src/lib/plugins/manifest.ts`: `plugin.json` uchun Zod
  sxemasi va standart qiymatlar.
- **Skaner** — `src/lib/plugins/scanner.ts`: plagin katalogi ostidagi diskda
  joylashgan plaginlarni aniqlaydi.
- **Yuklagich** — `src/lib/plugins/loader.ts`: har bir plaginni izolyatsiya qilingan
  yordamchi jarayonda ishga tushiradi va IPC orqali ilgak chaqiruvlarini
  muvofiqlashtiradi.

## Marketpleys katalogi

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) `MarketplaceEntry`
obyektlari roʻyxatini qaytaradi:

| Maydon        | Tur      | Izohlar                                                  |
| ------------- | -------- | -------------------------------------------------------- |
| `name`        | string   | kebab-case formatidagi plagin nomi                       |
| `version`     | string   | semver                                                   |
| `description` | string   | Qisqacha tavsif                                          |
| `author`      | string   | Muallif / tashkilot                                      |
| `license`     | string   | SPDX uslubidagi litsenziya identifikatori                |
| `downloadUrl` | string   | Manbani yuklab olish URL manzili (boʻsh boʻlishi mumkin) |
| `repository`  | string?  | Ixtiyoriy repozitoriy URL manzili                        |
| `tags`        | string[] | Qidirish/filtrlash teglari                               |
| `downloads`   | number   | Yuklab olishlar soni                                     |
| `rating`      | number   | 0–5                                                      |
| `verified`    | boolean  | Yozuv tasdiqlangan deb belgilanganmi                     |
| `lastUpdated` | string   | ISO formatiga yaqin sana satri                           |

Maxsus reyestr URL manzili sozlanmagan boʻlsa, katalog ichki `SEED_REGISTRY`dan
iborat boʻladi (hozirda `request-logger`, `rate-limiter`, `cost-tracker` va
`theme-manager`). Boshlangʻich reyestr doimo mavjud — agar sozlangan masofaviy
reyestrga ulanib boʻlmasa, u `200` boʻlmagan holat kodini qaytarsa yoki tanib
boʻlmaydigan javob tanasini qaytarsa, `listMarketplacePlugins()` ogohlantirishni
jurnalga yozadi va boshlangʻich roʻyxatga qaytadi.

> Eslatma: marketpleys **katalogi** (koʻrib chiqish/qidirish) boshidan oxirigacha
> ulangan, ammo katalogdan bir marta bosish orqali marketpleysdan **oʻrnatish**
> hali amalga oshirilmagan — marketpleys yozuvidagi boshqaruv panelining
> "Oʻrnatish" tugmasi hozirda "tez orada" xabarini koʻrsatadi. Hozirda oʻrnatish
> lokal yoʻl orqali oʻrnatish jarayoni (`POST /api/plugins`) va diskdagi
> plaginlarni aniqlash (`POST /api/plugins/scan`) orqali bajariladi.

## REST API

Barcha soʻnggi nuqtalar boshqaruv autentifikatsiyasini (`requireManagementAuth`) talab qiladi **va**
faqat loopback orqali foydalanish mumkin — `/api/plugins` hamda `/api/plugins/`
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) roʻyxatiga kiritilgan.

| Soʻnggi nuqta                    | Metod  | Tavsif                                                                             |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Oʻrnatilgan plaginlarni roʻyxatlash (ixtiyoriy `?status=` filtri)                  |
| `/api/plugins`                   | POST   | Mutlaq lokal yoʻldan plaginni oʻrnatish                                            |
| `/api/plugins/scan`              | POST   | Plagin katalogini skanerlash va yangi plaginlarni roʻyxatdan oʻtkazish             |
| `/api/plugins/marketplace`       | GET    | Marketplace katalogi yozuvlarini roʻyxatlash                                       |
| `/api/plugins/[name]`            | GET    | Oʻrnatilgan plagin tafsilotlarini olish                                            |
| `/api/plugins/[name]`            | DELETE | Plaginni oʻchirish                                                                 |
| `/api/plugins/[name]/activate`   | POST   | Faollashtirish (yuklash + huklarni roʻyxatdan oʻtkazish)                           |
| `/api/plugins/[name]/deactivate` | POST   | Faolsizlantirish (`onDeactivate`ni ishga tushirish, huklarni roʻyxatdan chiqarish) |
| `/api/plugins/[name]/config`     | GET    | Plagin konfiguratsiyasi va konfiguratsiya sxemasini olish                          |
| `/api/plugins/[name]/config`     | PUT    | Plagin konfiguratsiyasini yangilash (sxema asosida tekshiriladi)                   |

`GET /api/plugins` soʻrovidagi `status` filtri
`installed` / `active` / `inactive` / `error` qiymatlaridan birini qabul qiladi. Yaroqsiz qiymat `400` javobini qaytaradi.

### Oʻrnatilgan plaginlarni roʻyxatlash

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Lokal yoʻldan oʻrnatish

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` **mutlaq** boʻlishi va tarkibida `..` orqali oʻtish segmentlari yoki
null baytlar boʻlmasligi kerak (Zod tomonidan taʼminlanadi). Manba katalogida yaroqli
`plugin.json` boʻlishi kerak (yoki katalog uning ota katalogi boʻlishi kerak). Muvaffaqiyatli bajarilganda javob `201` kodi va
oʻrnatilgan plagin qatorini qaytaradi.

### Marketplace katalogini koʻrib chiqish

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plagin konfiguratsiyasini yangilash

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` har bir taqdim etilgan qiymatni plaginning
`configSchema` sxemasi (manifestda eʼlon qilingan) asosida tekshiradi: `number` maydonlari `min`/`max`
chegaralariga amal qiladi, `select` maydonlari esa eʼlon qilingan `enum`ga mos kelishi kerak. Sxemada mavjud boʻlmagan kalitlarga
ruxsat beriladi.

## Konfiguratsiya

### Plagin katalogi

Plaginlar OmniRoute maʼlumotlar katalogida joylashadi:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (yoki manifest.main ko‘rsatgan boshqa fayl)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bu katalogni
uch bosqichda aniqlaydi:

1. **`OMNIROUTE_PLUGINS_DIR`**, agar oʻrnatilgan boʻlsa — `HOME` qiymatidan qatʼi nazar, aynan koʻrsatilganidek ishlatiladi. Bu
   Docker/K8s uchun aniq boshqaruv parametridir; ularda plaginlar daraxti odatda
   konteynerning uy katalogiga aloqasi boʻlmagan yoʻlga bind-mount qilinadi (#11827).
2. `<home>/.omniroute/plugins`, bunda `<home>` qiymati `HOME` / `USERPROFILE`
   muhit oʻzgaruvchilaridan olinadi.
3. `/tmp/.omniroute/plugins`, agar jarayon umuman uy katalogini eksport qilmasa.

Aniqlangan katalog ishga tushirish vaqtida bir marta `scanner.dir_resolved` sifatida jurnalga yoziladi va
qaysi kirish qiymati tanlangani (`OMNIROUTE_PLUGINS_DIR`, `home` yoki `no-home-fallback`) koʻrsatiladi — shu sababli
sezdirmasdan 3-bosqichga tushib qolgan tasvir faqat boʻsh plaginlar roʻyxatini xabar qilish oʻrniga
buni aniq bildiradi.
`POST /api/plugins/scan` shu yerdagi yaroqli `plugin.json` fayliga ega har qanday quyi katalogni topadi
va roʻyxatdan oʻtkazadi; ayni katalog `pluginManager.install()` plaginlarni nusxalaydigan ildiz katalog hamdir,
shuning uchun qiymatni qayta belgilash aniqlash va oʻrnatish joylarini birgalikda koʻchiradi.

> **`OMNIROUTE_PLUGINS_DIR` — bu `OMNIROUTE_PLUGIN_PATH` emas.** Ikkinchisi faqat
> CLI buyruq-plagin yuklagichi (`bin/cli/plugins.mjs`) tomonidan `omniroute` quyi buyruqlarini
> qoʻshadigan `omniroute-cmd-*` npm paketlarini topish uchun oʻqiladi — bu yerda tavsiflangan ish vaqti skaneriga
> hech qanday taʼsir qilmaydi. Bu qism haqida [PLUGINS.md](./PLUGINS.md) fayliga qarang.

### Maxsus marketplace reyestri URL manzili

Marketplace katalogining manbasi `pluginMarketplaceUrl` sozlamasidan oʻqiladi
(`src/lib/plugins/marketplace.ts` fayli `settings.pluginMarketplaceUrl`ni oʻqiydi). U
`http(s)` URL manziliga oʻrnatilganda, `listMarketplacePlugins()` shu URL manzilidan maʼlumot oladi va
yuqori darajadagi JSON yozuvlar massivini yoki `plugins` massiviga ega obyektni
qabul qiladi; satr turidagi `name` qiymatiga ega boʻlmagan yozuvlar filtrlab tashlanadi. Qiymat oʻrnatilmaganida (yoki maʼlumot olish
SSRF himoyasidan oʻtmasa / yaroqsiz javob qaytarsa), ichki boshlangʻich reyestrdan
foydalaniladi.

Boshqaruv panelidagi "Marketplace" ichki varagʻi ushbu URL manzili uchun maydonni taqdim etadi (qiymat
`GET /api/settings` orqali qayta oʻqiladi).

> Amalga oshirishga oid eslatma: boshqaruv panelidagi "Saqlash" amali
> `pluginMarketplaceUrl`ni `PATCH /api/settings`ga yuboradi. Ushbu hujjat yozilgan vaqtda bu
> kalit `updateSettingsSchema` ichida eʼlon qilinmagan
> (`src/shared/validation/settingsSchemas.ts`), shu sababli unga tayanishdan oldin relizingizda
> qiymat saqlanishini tekshiring — kalit sozlamalar omborida mavjud boʻlgach, **oʻqish**
> yoʻli (`getSettings()` →
> `listMarketplacePlugins()`) uni hisobga oladi.

## Xavfsizlik

### Marshrut darajasi — faqat loopback

Plaginlar kodni ishga tushirilgan yordamchi jarayonlarda bajaradi, shuning uchun butun `/api/plugins`
yuzasi `LOCAL_ONLY` (1-daraja) sifatida tasniflanadi. Loopback cheklovi
har qanday autentifikatsiya tekshiruvidan **oldin** soʻzsiz qoʻllanadi, shu sababli
tunnel orqali qurilmaga yetib kelgan, sizib chiqqan boshqaruv tokeni ham plaginni
oʻrnata, faollashtira yoki oʻchira olmaydi.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) va
Qatʼiy qoidalar #15 / #17 ga qarang.

### Marketplace reyestri uchun SSRF himoyasi

Maxsus reyestr URL manzili tajovuzkor taʼsir qilishi mumkin boʻlgan konfiguratsiyadir, shuning uchun
uni olishdan oldin `listMarketplacePlugins()` uni ikki qatlamli tekshiruvdan oʻtkazadi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` boʻlmagan barcha manzillarni rad etadi.
   - Kanonik `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) orqali literal xususiy/loopback/link-local/ULA xostlarni (IPv4 **va** IPv6,
     jumladan IPv4 bilan xaritalangan manzillarni) rad etadi.
   - **Har ikkala** `A` va `AAAA` yozuvlarini aniqlaydi va aniqlangan manzillardan **birortasi**
     xususiy boʻlsa, rad etadi — shu orqali ommaviy xost nomi → xususiy IP chetlab oʻtish yoʻli yopiladi.
   - **Xavfsiz tarzda rad etadi**: DNS aniqlashdagi xatolik URL manzilining rad etilishiga olib keladi.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): yuklab olish vaqtida faqat ommaviy URL
   himoyasini qayta qoʻllaydi va **qayta yoʻnaltirishlarni bloklaydi** (ommaviy → xususiy `30x`
   burilishiga yoʻl qoʻymaydi).

Ikkala qatlamdan birida tekshiruvdan oʻtmagan URL soʻrovni bekor qilmaydi — marketplace
sezdirmasdan ichki boshlangʻich reyestrga qaytadi va ogohlantirishni jurnalga yozadi.

> Ushbu himoya PR #3774 da aynan A + AAAA yozuvlarini aniqlash va
> faqat IPv4 tekshiruvi oʻrniga kanonik `isPrivateHost` dan foydalanish uchun kuchaytirilgan.

### Plagin bajarilishini izolyatsiyalash

- **Jarayon izolyatsiyasi** — `loadPlugin()` (`src/lib/plugins/loader.ts`) har bir
  plaginni alohida Node.js yordamchi jarayonida ishga tushiradi va IPC orqali aloqa qiladi.
  Hook chaqiruvlarida `SIGTERM` → `SIGKILL` eskalatsiyasiga ega vaqt cheklovi mavjud.
- **Muhit uchun ruxsat etilganlar roʻyxati** — yordamchi jarayon faqat ruxsat etilganlar roʻyxatidagi
  muhit oʻzgaruvchilarini oladi; kengroq toʻplam faqat manifest `env`
  ruxsatini soʻraganda beriladi.
- **Yoʻlni chegaralash** — oʻrnatish/yangilash/oʻchirish amallari har qanday nusxalash yoki
  rekursiv oʻchirishdan oldin plagin katalogi va `manifest.main` boshqariladigan plagin ildizi
  **ichida** aniqlanishini tekshiradi (buzib oʻzgartirilgan MB yoʻllari va
  `manifest.main` ichidagi `../` orqali oʻtishdan himoya qiladi). Faollashtirish simvolik havolalarni
  `realpath` orqali aniqlaydi va plagin katalogidan tashqariga chiqadigan kirish nuqtasini
  yuklashni rad etadi.
- **Ixtiyoriy yaxlitlik qaydi** — manifest `integrity`
  (`sha256-<base64>`, SRI formati) maydonini eʼlon qilishi mumkin. U mavjud boʻlsa, yuklagich
  yuklash vaqtida kirish fayli xeshini tekshiradi va mos kelmasa faollashtirishni
  rad etadi. Bu ixtiyoriy buzib oʻzgartirishni aniqlash vositasi, **xavfsizlik chegarasi emas** —
  faqat loopback marshrutlash va ruxsatlar modeli haqiqiy chegaralardir.

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) orqali tekshiriladi:

| Maydon             | Tur       | Izohlar                                                                   |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `name`             | string    | Majburiy; kebab-case (`^[a-z0-9-]+$`), 1–100 ta belgi                     |
| `version`          | string    | Majburiy; semver (`MAJOR.MINOR.PATCH`)                                    |
| `description`      | string?   | ≤ 500 ta belgi                                                            |
| `author`           | string?   | ≤ 200 ta belgi                                                            |
| `license`          | string?   | Standart qiymati `MIT`                                                    |
| `main`             | string?   | Kirish fayli; standart qiymati `index.js`                                 |
| `source`           | enum?     | `local` \| `marketplace` (standart qiymati `local`)                       |
| `tags`             | string[]? | Qidiruv teglari                                                           |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                           |
| `hooks`            | object?   | Plagin qaysi hooklarni amalga oshirishini bildiruvchi mantiqiy qiymatlar  |
| `skills`           | object[]? | Ixtiyoriy koʻnikma taʼriflari                                             |
| `enabledByDefault` | boolean?  | Oʻrnatilganda avtomatik faollashtirish                                    |
| `configSchema`     | object?   | Konfiguratsiya maydonlari xaritasi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Ixtiyoriy `sha256-<base64>` kirish fayli qaydi                            |

Ruxsatlar quyidagi enum qiymatlaridan olinadi:
`network` / `file-read` / `file-write` / `env` / `exec`.

## Hayotiy sikl jarayoni

```
install (POST /api/plugins, yoʻl)
  → manifestni skanerlash/tekshirish → vaqtinchalik joyga nusxalash → main fayli katalog ichida ekanini tasdiqlash
  → atomar tarzda ~/.omniroute/plugins/<name> ichiga qayta nomlash → DB qatorini kiritish
  → onInstall ni ishga tushirish → agar enabledByDefault boʻlsa: faollashtirish

activate (POST /api/plugins/{name}/activate)
  → realpath orqali katalog chegarasida ekanini tekshirish → loadPlugin() (quyi jarayonni ishga tushirish)
  → eʼlon qilingan hook’larni roʻyxatdan oʻtkazish → status = "active" → onActivate ni ishga tushirish

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate ni ishga tushirish (roʻyxatdan chiqarishdan OLDIN) → hook’larni roʻyxatdan chiqarish
  → quyi jarayonni toʻxtatish → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → faol boʻlsa, faolsizlantirish → onUninstall ni ishga tushirish
  → plugin katalogini katalog chegarasi tekshirilgan holda rekursiv oʻchirish → DB qatorini oʻchirish
```

`install` buyrugʻi manifest versiyasi oʻrnatilgan versiyadan **qatʼiy ravishda
yangiroq** boʻlgan katalog uchun qayta ishga tushirilsa, avtomatik yangilash
amalga oshiriladi (toza qayta oʻrnatish; konfiguratsiya standart qiymatlarga
qaytariladi). Bir xil yoki eskiroq versiya rad etiladi.

## Maʼlumotlar bazasi

`plugins` jadvali (`076_create_plugins.sql` migratsiyasi):

| Ustun           | Tur     | Izohlar                                                            |
| --------------- | ------- | ------------------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                               |
| `name`          | TEXT    | Noyob                                                              |
| `version`       | TEXT    | semver; standart qiymat `1.0.0`                                    |
| `description`   | TEXT    | Ixtiyoriy                                                          |
| `author`        | TEXT    | Ixtiyoriy                                                          |
| `license`       | TEXT    | Standart qiymat `MIT`                                              |
| `main`          | TEXT    | Kirish fayli; standart qiymat `index.js`                           |
| `source`        | TEXT    | Standart qiymat `local`                                            |
| `tags`          | TEXT    | JSON massivi; standart qiymat `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                   |
| `enabled`       | INT     | 0/1; standart qiymat 0                                             |
| `manifest`      | TEXT    | Toʻliq manifest JSON’i                                             |
| `config`        | TEXT    | JSON; standart qiymat `{}`                                         |
| `config_schema` | TEXT    | JSON; standart qiymat `{}`                                         |
| `hooks`         | TEXT    | Eʼlon qilingan hook nomlarining JSON massivi; standart qiymat `[]` |
| `permissions`   | TEXT    | JSON massivi; standart qiymat `[]`                                 |
| `plugin_dir`    | TEXT    | Mutlaq oʻrnatish katalogi                                          |
| `error_message` | TEXT    | `status = "error"` boʻlganda oʻrnatiladi                           |
| `installed_at`  | TEXT    | `datetime('now')`                                                  |
| `updated_at`    | TEXT    | `datetime('now')`                                                  |
| `activated_at`  | TEXT    | Faollashtirilganda oʻrnatiladi                                     |

Plugin metrikalari/tahlillari qoʻshimcha jadvallarda kuzatib boriladi
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Boshqaruv paneli

`/dashboard/plugins` manzilidagi boshqaruv paneli sahifasi
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) ikkita ichki oynani taqdim etadi:

- **Oʻrnatilganlar** — oʻrnatilgan pluginlarni ularning eʼlon qilingan hook’lari,
  faollashtirish/faolsizlantirish almashtirgichi, oʻchirish tugmasi va
  "Pluginlarni skanerlash" amali (`POST /api/plugins/scan`) bilan koʻrsatadi.
- **Marketplace** — maxsus registr URL manzilini belgilash maydoni bilan birga
  `GET /api/plugins/marketplace` dan olingan katalogni koʻrsatadi.

Har bir plugin uchun konfiguratsiya sahifasi `/dashboard/plugins/[name]/config`
manzilida joylashgan
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Shuningdek qarang

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  nima uchun `/api/plugins` faqat loopback uchun ochiq (1-daraja)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — tegishli ko‘nikmalar freymvorki
  (`src/lib/skills/`); plaginlar o‘z manifestida ko‘nikmalarni e’lon qilishi mumkin
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hodisalarga asoslangan chiquvchi
  integratsiyalar
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  har bir plagin marshruti xato javoblari uchun foydalanadigan `buildErrorBody()` andozasi
