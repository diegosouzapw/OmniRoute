# Cursor Provider in Docker Environments (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker ichida ishlaganda, eski **Cursor IDE’dan import qilish** /
`cursor-agent` jarayonlari muvaffaqiyatsiz tugaydi, chunki konteyner hostdagi Cursor
oʻrnatmasini koʻra olmaydi. Buning oʻrniga **Cursor bilan kirish** (deep-control PKCE) usulidan foydalaning.

## Nega IDE / CLI orqali import qilish Docker’da ishlamaydi

1. **Fayl tizimi izolyatsiyasi** — Avtomatik import konteyner _ichida_
   `~/.config/Cursor/User/globalStorage/state.vscdb` kabi Linux yoʻllarini qidiradi.
   macOS uchun Docker Desktop’da host IDE maʼlumotlar bazasi sukut boʻyicha ulanmaydi va
   host Darwin boʻlsa ham, konteyner operatsion tizimi Linux boʻladi.
2. **`cursor-agent` binar fayli mavjud emas** — Rasmiy OmniRoute obrazlari
   `cursor-agent` bilan birga yetkazib berilmaydi. Mavjud modellar avval
   `cursor-agent --list-models` buyrugʻini ishga tushirar, u ishlamasa statik katalogga oʻtar edi.
3. **Notoʻgʻri binar fayl** — macOS uchun `cursor-agent` faylini Linux
   konteyneriga bind-mount orqali **ulamang**. U bajarilmaydi.

## Tavsiya etiladi: Cursor bilan kirish

1. **Boshqaruv paneli → Provayderlar → Cursor** sahifasini oching.
2. **Cursor bilan kirish** ichki oynasini tanlang.
3. **Cursor bilan kirish** tugmasini bosing — OmniRoute
   `https://cursor.com/loginDeepControl?…` manzilini **host** brauzeringizda ochadi.
4. Brauzerda kirishni tasdiqlang, soʻng boshqaruv paneliga qayting. OmniRoute
   tokenlar kelguncha `api2.cursor.sh/auth/poll` manzilini davriy tekshiradi.
5. OmniRoute **kirish + yangilash** tokenlarini saqlaydi va ularni
   `https://api2.cursor.sh/auth/exchange_user_api_key` orqali yangilaydi.

Bu usul konteyner ichida Cursor IDE yoki `cursor-agent` boʻlishini talab qilmaydi.

## Modellarni aniqlash

Tizimga kirilgan ulanish mavjud boʻlsa, **Mavjud modellar / Avtomatik sinxronlash**
ulanishning bearer tokenidan foydalanadigan Cursor’ning HTTP
`AiService/AvailableModels` katalogini afzal koʻradi. Agar bu bajarilmasa,
OmniRoute hostdagi `cursor-agent`ni (mavjud boʻlsa), soʻng statik reyestr
boshlangʻich maʼlumotlarini sinab koʻradi.

OmniRoute katalogda har doim **`auto`** modelini (“Auto” nomi bilan), shuningdek
OpenCodex uslubidagi **`auto-cost`**, **`auto-balance`** va
**`auto-intelligence`** marshrutizator rejimlarini taqdim etadi. Tarmoq orqali ular
Cursor’ning `default` modeliga (uchta variant uchun `optimization` ModelParameter
bilan) moslanadi. Premium modellardan foydalanish limiti tugaganda
`cu/auto`ni afzal koʻring — Auto’da koʻpincha hali ham budjet mavjud boʻladi.

### Sinxronlanganda jonli katalog eksklyuziv boʻladi

Cursor modellari muvaffaqiyatli sinxronlangandan keyin (`cursor-agent --list-models` → saqlangan
sinxronlangan katalog yoki yuqoridagi bearer autentifikatsiyali `AvailableModels` soʻrovi),
**boshqaruv paneli**, **`/v1/models`** va **Barchasini sinash** quyidagilarni koʻrsatadi:

1. Jonli sinxronlash qaytargan modellar
2. Qoʻshilgan avtomatik marshrutizator identifikatorlari: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatorning **maxsus** modellari (Import / qoʻlda) — sinxronlash ularni hech qachon olib tashlamaydi

`open-sse/config/providers/registry/cursor/` ichidagi katta statik reyestr
**faqat oflayn zaxira variantidir**. Sinxronlangan roʻyxat boʻsh boʻlsa
(yoki aniqlash muvaffaqiyatsiz tugasa), roʻyxat shu reyestrga qaytadi.

Harakat darajasi suffiksli identifikatorlar (masalan, `claude-4.6-sonnet-high`) ish vaqtida
hali ham **soʻralishi** mumkin: `resolveRequestedModel` suffiksni olib tashlab, uni tarmoq
`ModelParameter`iga aylantiradi. Eksklyuziv roʻyxatlash ushbu statik variantlarni
Barchasini sinash roʻyxatidan ataylab yashiradi, shunda tekshiruvlar Cursor haqiqatda
mavjud deb qaytargan modellarga mos keladi.

### Yordamchi funksiyalar

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — boshqaruv panelidagi birlashtirish
- `ensureCursorAutoCatalogEntry` — aniqlash + roʻyxatlash vaqtida auto* qoʻshish
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statik sikli

## Provayder limitlari (kvota)

Cursor uchun **Foydalanish → Provayder limitlari** PKCE yoki token importidan keyin
`api2.cursor.sh` manzilidagi Bearer API’laridan
(`GetCurrentPeriodUsage` → foydalanish xulosasi → auth/usage) foydalanadi.
Eski cookie/`cursor.com` boshqaruv paneli usuli eski IDE orqali import qilingan
seanslar uchun oxirgi zaxira varianti boʻlib qoladi.

Oynalar odatda **Jami**, **Auto + Composer** va **API** qismlarini oʻz ichiga oladi.
Agar limitlar boʻsh koʻrinsa, **Cursor bilan kirish** jarayonini qayta bajaring yoki
tokenlarni qayta import qiling (faqat IDE orqali import qilish endi talab etilmaydi).

## Boʻsh javoblar / foydalanish limiti tugashi

Cursor Run’ni qabul qilib, ammo yordamchi matnini qaytarmasa (bu premium
foydalanish limiti tugaganda koʻp uchraydi), OmniRoute oddiy
“Provayder boʻsh kontent qaytardi” xabari oʻrniga amaliy tavsiyalarga ega **429**
(kvota koʻrsatmalari) yoki **502** xatosini koʻrsatadi.
`not_found: AI Model Not Found` (foydalanish davri limiti tugagan) kabi oqimli
uzatish xatolari **Cursor tezlik limiti / foydalanish chegarasi oshib ketdi**
sifatida tasniflanadi va bu xabar SSE konveyeri boʻylab saqlanadi
(umumiy boʻsh oqim himoyasi allaqachon chiqarilgan xatoni almashtirmaydi).
Provayder limitlarini tekshiring, **`auto`** modelini sinab koʻring yoki Cursor
tarif rejasidagi limitlarni oshiring.

## Mijoz versiyasi (headless)

Mahalliy `cursor-agent` oʻrnatmasi boʻlmasa, OmniRoute
`x-cursor-client-version` qiymatini avval `CURSOR_AGENT_CLI_VERSION` muhit
oʻzgaruvchisidan, keyin Cursor oʻrnatish skriptining diskda keshlangan
scrape natijasidan, soʻng biriktirilgan build identifikatoridan aniqlaydi.
Zarur boʻlganda `CURSOR_AGENT_CLI_VERSION` orqali qiymatni almashtiring.

## Zaxira variant: Tokenni qoʻlda import qilish

Agar brauzer orqali kirishni yakunlay olmasangiz:

1. Hostda Cursor’ning `state.vscdb` faylidan tokenlarni ajratib oling:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor autentifikatsiya modal oynasida **Tokenni import qilish** boʻlimini oching.
3. **Kirish tokeni**ni va mavjud boʻlsa, **Yangilash tokeni**ni (avtomatik
   yangilash uchun talab qilinadi) kiriting. Mashina identifikatori ixtiyoriy.

Faqat kirish tokenini import qilish ham ishlaydi, ammo yangilash tokenisiz uning
muddati tugaydi — chat autentifikatsiya xatolarini qaytarganda uni qayta import qiling.

## Tegishli materiallar

- Zed Docker boʻyicha qoʻllanma: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor kirish maʼlumotnomasi (tashqi):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
