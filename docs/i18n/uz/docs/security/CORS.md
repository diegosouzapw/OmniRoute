# CORS Configuration & Security (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute qaysi **brauzer originlari** yagona, markazlashtirilgan ruxsat roʻyxati orqali boshqa origindagi javoblarni oʻqishi mumkinligini boshqaradi. Model **standart holatda yopiq**:
siz originni ruxsat roʻyxatiga kiritmaguningizcha hech bir originga ruxsat berilmaydi. Ushbu sahifada ruxsat roʻyxati qanday aniqlanishi, `CORS_ALLOW_ALL=true` aslida nimalarni ochishi (va, muhimi, nimalarni **ochmasligi**), ishlab chiqish va production muhitlarini qanday xavfsiz sozlash hamda wildcard faol boʻlganda boshqaruv paneli koʻrsatadigan bajarilish vaqtidagi ogohlantirish bayon etiladi.

**Asosiy manba:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Ruxsat roʻyxati middleware ichida bir marta qoʻllanadi (`src/server/authz/pipeline.ts`) — alohida marshrut ishlov beruvchilari
`Access-Control-Allow-Origin` sarlavhasini oʻzlari oʻrnatmaydi.

## Origin qanday aniqlanadi

Har bir soʻrov uchun middleware `Access-Control-Allow-Origin` qiymatini quyidagi tartibda hisoblaydi:

1. **`CORS_ALLOW_ALL=true`** (yoki eski `CORS_ORIGIN=*`) → chaqiruvchining
   `Origin` qiymatini qaytaradi (yoki `Origin` sarlavhasi boʻlmasa `*`), keshlar toʻgʻri ishlashi uchun `Vary: Origin`
   bilan birga. Xuddi shu `applyCorsHeaders()` nazorat nuqtasi token orqali autentifikatsiya qilinadigan
   `/v1*`/`/v1beta*` yuzasidagi tanaga ega har bir 2xx javobga
   `Vary: Accept-Encoding` sarlavhasini ham qoʻshadi (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), shunda
   quyi oqimdagi/umumiy keshlar siqilgan va siqilmagan variantlarni toʻgʻri farqlay oladi.
2. Aks holda, soʻrovning `Origin` qiymati normallashtiriladi (kichik harflarga oʻtkaziladi, oxiridagi qiya chiziq olib tashlanadi) va **birlashtirilgan ruxsat roʻyxati** bilan solishtiriladi:
   - env **`CORS_ALLOWED_ORIGINS`** — vergul bilan ajratilgan roʻyxat va
   - bajarilish vaqtidagi **`corsOrigins`** sozlamasi (Boshqaruv paneli → Xavfsizlik → _CORS ruxsat etilgan originlari_), `src/lib/config/runtimeSettings.ts` faylidagi
     `setRuntimeAllowedOrigins()` orqali kiritiladi.
3. Moslik topilmasa → **`Access-Control-Allow-Origin` sarlavhasi chiqarilmaydi**. Brauzer boshqa origindagi javobni oʻqishni bloklaydi. Bu standart holatda yopiq ishlashning koʻzlangan xatti-harakatidir.

| Env oʻzgaruvchisi      | Maʼnosi                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | Ruxsat beriladigan aniq originlarning CSV roʻyxati (tavsiya etiladi).                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → istalgan originni qaytarish (wildcard). Faqat ishlab chiqish uchun.           |
| `CORS_ORIGIN`          | Eski. `*` xuddi `CORS_ALLOW_ALL` kabi ishlaydi; bitta qiymat ruxsat roʻyxatiga qoʻshiladi. |

## Tahdid modeli — `CORS_ALLOW_ALL=true` aslida nimalarni ochadi

OWASPning umumiy ogohlantirishini ("wildcard CORS = istalgan sayt API'ingizga murojaat qilishi mumkin") jiddiy qabul qilish kerak, ammo OmniRoute ochadigan imkoniyat **umumiy holatga qaraganda torroq**, chunki amalga oshirishga oid bitta aniq fakt mavjud:

> **Markaziy `applyCorsHeaders()` hech qachon
> `Access-Control-Allow-Credentials` sarlavhasini chiqarmaydi.** Server
> `Access-Control-Allow-Credentials: true` sarlavhasini yubormasa, brauzer _hisob maʼlumotlari bilan yuborilgan_
> (cookie mavjud) boshqa origindagi javobni ochmaydi. OmniRoute'ning umumiy CORS yoʻli buni hech qachon
> qilmaydi.

Bu `CORS_ALLOW_ALL=true` boʻlganda ham har bir yuza uchun quyidagilarni anglatadi:

| Yuza                                    | Autentifikatsiya mexanizmi      | Wildcard CORS taʼsiri                                                                                                                                                                                                                                                                        |
| --------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boshqaruv paneli / MANAGEMENT `/api/*`  | Cookie seansi                   | Origin qaytariladi, ammo **`Allow-Credentials` boʻlmagani uchun** brauzer hisob maʼlumotlari bilan yuborilgan javobni oʻqishni **bloklaydi**. Zararli boshqa origin sayti autentifikatsiya qilingan boshqaruv paneli javoblaringizni **oʻqiy olmaydi** va seans cookie'si oshkor qilinmaydi. |
| Mijoz API'si `/v1/*`, `/v1beta/*`       | Bearer / `x-api-key` sarlavhasi | Allaqachon **ataylab** ruxsatchan (`relaxForTokenAuth`): brauzerlar `Authorization`/`x-api-key` qiymatlarini hech qachon avtomatik biriktirmaydi, shuning uchun hujumchining sahifasi sizning kalitingizni taqdim eta olmaydi. `CORS_ALLOW_ALL` buni kengaytirmaydi.                         |
| Ommaviy faqat oʻqish (`/api/health`, …) | Yoʻq                            | Maxfiy emas; wildcard zararsiz.                                                                                                                                                                                                                                                              |

Shunday qilib, `CORS_ALLOW_ALL=true` ning **qoldiq** taʼsiri quyidagilar bilan cheklangan: (a)
allaqachon autentifikatsiya talab qilmaydigan maʼlumotlarni hisob maʼlumotlarisiz boshqa origindan **oʻqish** va (b)
boshqaruv marshrutlarida CORS **preflight tekshiruvining oʻtishiga** ruxsat berish — ammo ular baribir boshqa origin sahifasi taqdim eta olmaydigan autentifikatsiyani talab qiladi. Umumiy CORS yoʻlida bu seansni oʻgʻirlash yoki hisob maʼlumotlarini oʻgʻirlash vektori **emas**.

### Bitta haqiqiy istisno — `/api/v1/agents/`

Cloud-Agent marshrutlari (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) oʻzlarining **alohida** CORS sarlavhalarini oʻrnatadi
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) va
`Access-Control-Allow-Origin: <origin>|*` bilan birga
`Access-Control-Allow-Credentials: true` sarlavhasini ham **chiqaradi**. Bu originni qaytarish va hisob maʼlumotlari birga mavjud boʻlgan yagona yuza boʻlib,
`CORS_ALLOW_ALL` dan **mustaqil**. Ushbu marshrutlar boshqaruv autentifikatsiyasidan oʻtkaziladi
(`requireManagementAuth`); boshqaruv panelini hostdan tashqariga ochadigan operatorlar aynan shu joyda javob sarlavhalari boshqa origindan hisob maʼlumotlari bilan yuborilgan javobni oʻqishga ruxsat berishini bilishlari kerak. Uni aniq ruxsat roʻyxati bilan cheklash ushbu CORS koʻrsatmalaridan alohida ravishda kuzatib boriladi.

## Ishlab chiqarish muhiti uchun tekshiruv roʻyxati

- **Ishlab chiqarish muhitida hech qachon `CORS_ALLOW_ALL=true` qilib belgilamang.** Uni belgilanmagan holda qoldiring.
- Kelib chiqish manzillarining **aniq** roʻyxatini belgilang — muhit oʻzgaruvchisi yoki Security sahifasidagi maydon orqali:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Agar OmniRoute teskari proksi / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ortida ishlasa, CORS sizning yagona nazorat mexanizmingiz
  **emas** — loopback marshrut himoyasi jarayon ishga tushira oladigan marshrutlarni
  hamon himoya qiladi ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ga qarang).
  403 xatosini “tuzatish” uchun `X-Forwarded-For: 127.0.0.1` ni soxtalashtirmang;
  bu marshrut himoyasi yopadigan RCE turidagi zaiflikni qayta ochadi.
- Ish vaqtidagi holatni tasdiqlang: `CORS_ALLOW_ALL=true` faol boʻlganda boshqaruv
  panelida Dashboard → Security → Authorization Inventory ostida **doimiy
  qahrabo rangli banner** koʻrsatiladi va `/api/settings/authz-inventory`
  monitoring vositalari muntazam soʻrashi mumkin boʻlgan
  `cors: { allowAll, allowedOrigins }` qobigʻini qaytaradi.

## Ishlab chiqishdagi qulaylik — muayyan mahalliy manbalarga ruxsat berish

Hatto ishlab chiqish muhitida ham universal belgidan foydalanish kamdan-kam zarur
boʻladi. Faqat foydalanadigan ishlab chiqish serverlaringizga ruxsat bering:

```bash
# Mahalliy OmniRouteʼga murojaat qiluvchi Vite (5173) + Next.js (3000) ishlab chiqish serverlari
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Manbalar registrga bogʻliq boʻlmagan holda solishtiriladi va oxiridagi qiya chiziq
eʼtiborga olinmaydi, shuning uchun `http://localhost:3000` va
`http://localhost:3000/` teng hisoblanadi. Xuddi shu CSV qiymatini ish vaqtida
**Dashboard → Security → CORS Allowed Origins** orqali qayta ishga tushirmasdan
belgilash mumkin.

## API kalitlari va cookie seanslari

- **Bearer / `x-api-key` (`/v1/*` inferensiya interfeysi):** brauzerlar ularni hech
  qachon avtomatik ravishda biriktirmaydi. Bu yerda CORS mazmunli toʻsiq emas —
  toʻsiq API kalitidir — shu sababli brauzer va Electron mijozlari oʻzlari allaqachon
  foydalanish huquqiga ega boʻlgan javoblarni oʻqiy olishi uchun ushbu interfeys
  ataylab erkin qilingan.
- **Cookie seansi (boshqaruv paneli):** xavfsiz tarzda rad etuvchi standart sozlama
  **hamda** umumiy yoʻlda `Access-Control-Allow-Credentials` mavjud emasligi bilan
  himoyalangan. Boshqaruv/boshqaruv paneli manbalarini ruxsat beruvchi hech qanday
  konfiguratsiyaga kiritmang; ular aynan xavfsiz tarzda rad etuvchi holatda qolishi
  kerak.

## Misol: OmniRoute oldidagi teskari proksi

CORS OmniRoute tomonidan amalga oshiriladi, shuning uchun proksi odatda
`Access-Control-*` sarlavhalarini qoʻshmasligi yoki qayta yozmasligi **kerak**
(ikkilangan sarlavhalar brauzerlar ishini buzadi). TLSʼni yakunlang va soʻrovlarni
yoʻnaltiring — preflight soʻroviga OmniRoute javob bersin:

```nginx
# nginx — OmniRouteʼga yoʻnaltiring; bu yerda Access-Control-* ni kiritmang
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For ni 127.0.0.1 qilib belgilamang — bu loopback marshrut himoyasini chetlab oʻtadi.
}
```

Ruxsat etilgan brauzer manbalarini proksida emas, OmniRouteʼda
(`CORS_ALLOWED_ORIGINS` yoki Security sahifasi orqali) belgilang.

## Manba fayllari

| Vazifa                                                      | Fayl                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Ruxsat etilgan roʻyxatni aniqlash + `getCorsStatus()`       | `src/server/cors/origins.ts`                                         |
| Oraliq dastur qoʻllanilishi (yagona haqiqat manbai)         | `src/server/authz/pipeline.ts`                                       |
| Settings → ish vaqtidagi manbani kiritish                   | `src/lib/config/runtimeSettings.ts`                                  |
| Boshqaruv paneli uchun ish vaqti holati                     | `src/app/api/settings/authz-inventory/route.ts`                      |
| Boshqaruv panelidagi ogohlantirish banneri                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins maydoni                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Har bir marshrut uchun Cloud-Agent CORS sozlamasi (istisno) | `src/lib/cloudAgent/api.ts`                                          |

## Shuningdek qarang

- [Marshrut himoyasi darajalari](./ROUTE_GUARD_TIERS.md) — jarayon ishga tushira oladigan marshrutlar uchun loopback cheklovi (alohida, bir-birini toʻldiruvchi nazorat).
- [Avtorizatsiya boʻyicha qoʻllanma](../architecture/AUTHZ_GUIDE.md) — toʻliq autentifikatsiya jarayoni.
