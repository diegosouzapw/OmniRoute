# OmniRoute Auto-Combo Engine (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Foydalanuvchilar uchun**: Tezkor boshlashni xohlaysizmi? Sodda tushuntirishlar va misollar uchun [Auto-Combo foydalanuvchi qoʻllanmasi](../getting-started/AUTO-COMBO-GUIDE.md) bilan tanishing.

> Moslashuvchan baholash va sozlamalarsiz avtomatik yoʻnaltirishga ega oʻzini oʻzi boshqaruvchi model zanjirlari

## Nol konfiguratsiyali avtomatik marshrutlash (`auto/` prefiksi)

> **YANGI:** Kombo yaratish talab qilinmaydi. Istalgan mijozda toʻgʻridan-toʻgʻri `auto/` prefiksidan foydalaning.

### Tezkor misollar

| Model ID       | Variant  | Xatti-harakat                                                                                   |
| -------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `auto`         | standart | Barcha ulangan provayderlar, LKGP strategiyasi, muvozanatli vaznlar                             |
| `auto/coding`  | kodlash  | Sifatga ustuvor vaznlar, kod generatsiyasi uchun mos                                            |
| `auto/fast`    | tez      | Past kechikishga asoslangan vaznli tanlov                                                       |
| `auto/cheap`   | arzon    | Xarajatlar uchun optimallashtirilgan marshrutlash (avval eng past xarajat)                      |
| `auto/offline` | oflayn   | Kvota mavjudligi eng yuqori boʻlgan provayderlarga ustunlik beradi                              |
| `auto/smart`   | aqlli    | Sifatga ustuvorlik + modellarni yaxshiroq aniqlash uchun yuqoriroq tadqiq qilish darajasi (10%) |
| `auto/lkgp`    | lkgp     | Aniq LKGP (standart `auto` bilan bir xil)                                                       |
| `auto/chaos`   | xaos     | Parallel tarqatish, har bir provayder uchun bittadan model (nosozlik kiritish emas)             |

### Kategoriya × Daraja kompozitsiyasi (`auto/<category>:<tier>`)

OpenRouter uslubidagi suffikslar **qanday turdagi marshrut** (kategoriya) ekanini **uni qanday optimallashtirish** (daraja) kerakligidan ajratadi, shu sababli ularni erkin birlashtirishingiz mumkin (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategoriyalar** (nomzodlar toʻplamini imkoniyat boʻyicha filtrlaydi): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` tasvirni qoʻllab-quvvatlovchi modellarni saqlab qoladi; `reasoning` mulohaza yuritish/fikrlash modellarini saqlab qoladi.
- **Darajalar** (baholash vaznlarini / toʻplam filtrini tanlaydi): `fast` (tez yetkazish) · `cheap` (`floor` taxallusi, xarajatni tejovchi) · `reliable` (avtomatik uzgich holati + kechikish barqarorligi) · `free` / `pro` (`classifyTier` orqali toʻplamni model darajasi boʻyicha filtrlaydi — bepul daraja va premium).

| Misol                  | Quyidagiga mos keladi                                                               |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kodlash toʻplami, past kechikish vaznlari                                           |
| `auto/coding:cheap`    | kodlash toʻplami, xarajat uchun optimallashtirilgan (`auto/coding:floor` taxallusi) |
| `auto/reasoning:pro`   | faqat mulohaza yuritish/fikrlash modellari, premium daraja                          |
| `auto/vision`          | tasvirni qoʻllab-quvvatlovchi modellar (daraja yoʻq → muvozanatli vaznlar)          |
| `auto/multimodal:free` | multimodal imkoniyatli modellar, faqat bepul daraja                                 |

Har qanday yaroqli `auto/<category>[:<tier>]` talab boʻyicha aniqlanadi; saralangan kichik toʻplam `/v1/models` va boshqaruv panelida (`open-sse/services/autoCombo/builtinCatalog.ts` ichidagi `AUTO_SUFFIX_VARIANTS`) eʼlon qilinadi. Filtrlash **ochiq qolish** tamoyiliga amal qiladi — agar cheklov hech bir ulangan modelga mos kelmasa, marshrutlash hech qachon buzilmasligi uchun toʻliq toʻplam ishlatiladi. Asosiy baholovchi (`combo.ts`) oʻzgarmagan; kategoriya/daraja filtri `buildAutoCandidates` ichida qoʻllanadi.

> **Jonli model tahlili:** `ARENA_ELO_SYNC_ENABLED` bayrogʻi yoqilganda, avtomatik marshrutlash mosligi jonli **Arena ELO** reytinglari + **models.dev** daraja maʼlumotlari asosida aniqlanadi (aks holda statik moslik xaritasiga qaytiladi).

**Foydalanish usuli:**

```bash
# OpenAI formatini qoʻllab-quvvatlaydigan istalgan IDE yoki CLI vositasi
Asosiy URL: http://localhost:20128/v1
API kaliti:  <your-endpoint-key>

# Kod/konfiguratsiyangizda modelni quyidagicha belgilang:
model: "auto"                 # muvozanatli standart
model: "auto/coding"          # kodlash vazifalari uchun eng yaxshisi
model: "auto/fast"            # mavjudlar ichida eng tezkori
model: "auto/cheap"           # har bir token uchun eng arzoni
```

**Nima sodir boʻladi:**

1. OmniRoute `src/sse/handlers/chat.ts` ichida `auto/` prefiksini aniqlaydi
2. Maʼlumotlar bazasidan barcha **faol provayder ulanishlarini** soʻraydi
3. Yaroqli hisob maʼlumotlariga (API kaliti yoki OAuth tokeni) ega boʻlganlarini filtrlaydi
4. Har bir ulanish uchun modelni aniqlaydi (`connection.defaultModel` yoki provayderning birinchi modeli)
5. Xotirada **virtual kombo** yaratadi (MBda saqlanmaydi)
6. Tanlangan variantning vazn profili + LKGP strategiyasi yordamida marshrutlaydi

**Asosiy xususiyatlar:**

- ✅ **Doimo faol:** Hech qanday oʻzgartirgich, kombo yaratish yoki konfiguratsiya talab qilinmaydi
- ✅ **Dinamik:** Joriy ulangan provayderlarni avtomatik aks ettiradi
- ✅ **Sessiyaga biriktirish:** LKGP oxirgi muvaffaqiyatli provayderga ustuvorlik berilishini taʼminlaydi
- ✅ **Bir nechta hisobni hisobga oladi:** Har bir provayder ulanishi alohida nomzodga aylanadi
- ✅ **MBga yozuvlar yoʻq:** Virtual kombo faqat soʻrov davomida mavjud boʻlib, saqlash uchun hech qanday qoʻshimcha xarajat tugʻdirmaydi

### Har bir kalit uchun nomzodlarni boshqarish (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = `auto/` dan keyingi suffiks yoki
asosiy kanal uchun aynan `auto`) — `auto/*` kanalining joriy nomzodlar
toʻplamini jonli ulanish imkoniyati bilan boyitilgan holda roʻyxatlaydigan, mavjud
bardoshlilik oʻqishlaridan qayta foydalanadigan (avtomatik uzgichning xom `state` qiymatidan hech qachon foydalanmaydigan) **faqat oʻqish uchun** endpoint:

- provayder avtomatik uzgichi — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- ulanishning kutish davri — aniqlangan `provider_connections` qatoridagi
  `rateLimitedUntil` / `testStatus`
- model bloklanishi — `isModelLocked(provider, connectionId, model)`

Har bir nomzod ushbu API kalitining `excluded` bayrogʻini ham oʻz ichiga oladi. Istisnolar
har bir API kaliti uchun (`auto_candidate_overrides` jadvali, `128` migratsiyasi) saqlanadi — OmniRoute
`users` jadvalisiz bitta ijarachili tizimdir, shu sababli `apiKeyId` har bir chaqiruvchi uchun
mavjud eng yaqin haqiqiy identifikatordir — va ular
`open-sse/services/autoCombo/virtualFactory.ts` ichidagi nomzodlar toʻplamining nazorat nuqtasida sof, birlik testlaridan oʻtgan
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`) orqali qoʻllanadi.
Filtr **ochiq qolish** tamoyiliga amal qiladi: belgilanmagan apiKeyId/channel yoki MB qidiruvidagi xatolik
toʻplamni filtrlanmagan holda qoldiradi, shu sababli hech qanday bekor qilish sozlamalari oʻrnatilmagan operator uchun marshrutlash
ushbu xususiyatdan oldingi holat bilan baytma-bayt bir xil boʻlib qoladi.

**Keyingi masalaga qoldirildi:** har bir nomzod uchun vaznlar + aniq tartiblash (3-daraja
— mavjud vaznli/ustuvorlik strategiyasi yoʻllariga uzatiladi) va har bir `auto/*`
kanali uchun muayyan `combo.ts` strategiyasini mahkamlash (4-daraja). Yagona ijarachi
modelini hisobga olgan holda, qayta belgilashlar har bir API kaliti uchun alohida qolishi
yoki global boʻlishi kerakligi haqidagi ochiq savol uchun #7819 rejasiga qarang.

**Sahna ortida:**

```txt
Soʻrov: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts prefiksni aniqlaydi
   ↓
createVirtualAutoCombo('coding') → faol ulanishlardan candidatePool
   ↓
handleComboChat (saqlangan kombinatsiyalar bilan bir xil mexanizm)
   ↓
Avtomatik baholash har bir soʻrov uchun eng yaxshi provayder/modelni tanlaydi
```

**Amalga oshirish fayllari:**

| Fayl                                                      | Maqsad                                                 |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiks tahlilchisi (`parseAutoPrefix`)                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Virtual `AutoComboConfig` obyektlarini yaratadi        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayder reyestrini soxtalashtirish uchun test ilgagi |
| `src/sse/handlers/chat.ts`                                | Integratsiya: auto prefiks uchun qisqa tutashuv        |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` tizim yozuvi                   |

## Haqiqiy Model Idʼiga Mos Keladigan Combo Nomlari

`name` maydoni oddiy model idʼi bilan bir xil bo‘lgan combo (masalan,
`gpt-5.5` nomli combo) — xatolik emas, balki **ataylab yaratilgan va qo‘llab-quvvatlanadigan andoza**:
bu [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) da hujjatlashtirilgan
har bir model idʼi uchun provayderga zaxiraviy o‘tish mexanizmidir. Combo
aniqlash oddiy model idʼini aniqlashdan oldin tekshirilgani sababli
(`src/sse/services/model.ts` ichidagi `getComboForModel()`), oddiy
`gpt-5.5` idʼiga yuborilgan so‘rov to‘g‘ridan-to‘g‘ri bitta provayderga emas,
combo maqsadlari (masalan, `acme-responses/gpt-5.5`,
`backup-responses/gpt-5.5`) orqali yo‘naltiriladi — bunda
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) uchun yaratilgan
qayta yozishdan oldin combo ustuvorligi qayta ishlatiladi va bu
`tests/unit/responses-combo-resolution-3227.test.ts` hamda
`tests/unit/combo-name-codex-responses-rewrite.test.ts` orqali regressiyaga qarshi
sinovdan o‘tkaziladi.

Haqiqiy model idʼini berkitadigan nom bilan combo yaratish yoki uning nomini
shunday nomga o‘zgartirish **hech qachon rad etilmaydi** — bunday qilish ushbu
hujjatlashtirilgan ish jarayonini buzgan bo‘lardi. Buning o‘rniga
(#8530), `POST /api/combos` va `PUT /api/combos/[id]` (yangi) nom haqiqiy
model idʼi bilan to‘qnashganda javobga bloklamaydigan `warning` maydonini
qo‘shadi:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Ishga tushirish vaqtida `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) ham model idʼini berkitadigan har bir mavjud
comboni sanab o‘tuvchi bir qatorli `[STARTUP]` ogohlantirishini jurnalga yozadi,
shunda bunga ataylab emas (#6940 ga muvofiq), tasodifan duch kelgan operatorlar
xabardor qilinadi. Aniqlash yordamchi funksiyasi
`src/lib/combos/modelNameCollision.ts` ichida joylashgan.

## Mijozdan Maxsus Comboni Chaqirish

Saqlangan combolar (Settings → Combos) faqat mijoz `model` maydonida comboning
**aniq nomini** yuborganda ishlatiladi — combo nomi uchun noaniq yoki qisman
moslashtirish mavjud emas va `auto/` prefiksi ham ishlatilmaydi. Aniqlash
tartibi (`src/sse/services/model.ts` ichidagi `getComboForModel()`):

1. combo nomiga aniq moslik (`model: "my-combo"`),
2. `combo/<name>` prefiksi (`model: "combo/my-combo"`),
3. model→combo glob mosliklari (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Ikkita keng tarqalgan xato:

- **`auto` sizning combolaringizdan foydalanmaydi.** `auto`/`auto/*` o‘zining nol sozlamali nomzodlar jamlanmasini yaratadi va faqat combo aynan `auto` deb nomlangan bo‘lsa, saqlangan combolarni ko‘rib chiqadi (tavsiya etilmaydi). Combo orqali yo‘naltirish uchun `auto` emas, uning aniq nomini yuboring.
- **`openrouter/auto` haqiqiy pulli OpenRouter mahsulotidir** ("Auto Best Available"), OmniRoute taxallusi emas. U OpenRouter reyestrining yagona statik model yozuvidir (`open-sse/config/providers/registry/openrouter/index.ts`) va alohida hisob-kitob qilinadi. Uni `auto` jamlanmalaridan chiqarib tashlash uchun Settings → Routing → Hide paid models parametridan foydalaning.

Bu yerda hujjatlashtirilgan dastlabki chalkashlik haqida [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) va [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) ga qarang.

## U qanday ishlaydi (saqlanadigan avtomatik kombinatsiyalar)

Avtomatik kombinatsiya mexanizmi har bir soʻrov uchun eng yaxshi provayder/modelni **16 omilli baholash funksiyasi** (`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` ichida belgilangan) yordamida dinamik ravishda tanlaydi. Standart vaznlar yigʻindisi `1.0` ga teng; maxsus vaznlar `normalizeScoringWeights()` orqali qayta normallashtiriladi. Oʻn oltita omildan ikkitasi — `cacheAffinity` va `resetWindowAffinity` — standart holatda `0` vaznga ega; `reliability` `DEFAULT_WEIGHTS` ichida `0`, umumiy paketlarda esa `0.03` va `reliability-first` paketida `0.04` vaznga ega, `quality` esa paketlarda `0.02` (`quality-first` paketida `0.03`) vaznga ega: ular har bir nomzod uchun baribir hisoblanadi, `cacheAffinity` esa bahodan tashqarida prompt keshi deduplikatsiyasini boshqaradi, shu sababli standart vazni nol boʻlgan omillar sukut boʻyicha ovoz bermaydi, paketlarda esa ovoz beradi.

![Avtomatik kombinatsiyaning 16 omilli baholash tizimi](../diagrams/exported/auto-combo-scoring.svg)

> Manba: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (`npm run docs:render-diagrams` orqali qayta yarating). Fayl nomi tarixiy sabablarga koʻra shunday; manba va render qilingan diagrammada `DEFAULT_WEIGHTS` ichida eʼlon qilingan barcha 16 ta omil koʻrsatilgan.

| Omil                  | Standart vazn | Tavsif                                                                                                                                                                                                                                         |
| :-------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Qolgan kvota / tezlik cheklovi zaxirasi [0..1]                                                                                                                                                                                                 |
| `health`              | 0.1605        | Zanjir uzgichdan olingan holat bahosi (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                    |
| `costInv`             | 0.1429        | **Aralash** xarajatning teskarisi (60% kirish + 40% chiqish tokeni narxi, normallashtirilgan) — arzonroq = yuqoriroq baho                                                                                                                      |
| `latencyInv`          | 0.1143        | Pulga nisbatan normallashtirilgan p95 kechikishning teskarisi — tezroq = yuqoriroq baho                                                                                                                                                        |
| `taskFit`             | 0.0762        | Vazifa turiga moslik (kodlash, tekshirish, rejalashtirish, tahlil, nosozliklarni tuzatish, hujjatlar)                                                                                                                                          |
| `stability`           | 0.0476        | Kechikishning standart ogʻishiga asoslangan dispersiyaviy barqarorlik — javob vaqti keskin oʻzgarib turadigan nomzod pastroq baholanadi                                                                                                        |
| `tierPriority`        | 0.0476        | Hisob darajasi ustuvorligi — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                      |
| `tierAffinity`        | 0.0476        | Nomzod darajasi va manifest tavsiya qilgan daraja oʻrtasidagi muvofiqlik                                                                                                                                                                       |
| `specificityMatch`    | 0.0476        | Soʻrovning oʻziga xosligi (manifest koʻrsatmasi) va model darajasi oʻrtasidagi moslik                                                                                                                                                          |
| `contextAffinity`     | 0.0476        | Soʻrovning kontekst oynasi ehtiyoji va modelning kontekst oynasi oʻrtasidagi muvofiqlik                                                                                                                                                        |
| `sessionAvailability` | 0.0476        | Ushbu seans uchun nomzod ulanishining OAuth seansi mavjudligi (`getOAuthSessionAvailability()`; OAuth ishlatmaydigan ulanishlar 1.0 ball oladi)                                                                                                |
| `connectionDensity`   | 0.0476        | Yuklamani bir xil provayder ulanishlari boʻylab taqsimlaydi (konsentratsiyaga qarshi)                                                                                                                                                          |
| `cacheAffinity`       | 0.00          | Ushbu soʻrovning prompt keshi prefiksini saqlash ehtimoli eng yuqori boʻlgan ulanishga yoʻnaltiruvchi rendezvous-xesh muvofiqligi (`open-sse/services/combo/promptCacheAffinity.ts`); sukut boʻyicha oʻchirilgan (#8008)                       |
| `resetWindowAffinity` | 0.00          | Kvotani tiklash oynasi qulay boʻlgan ulanishlar tomon ogʻish (sukut boʻyicha oʻchirilgan)                                                                                                                                                      |
| `quality`             | 0.03          | Marshrutlash hodisalari sifati kuzatuvchisidan olingan, fikr-mulohazalarga asoslangan chiqish sifati signali; kuzatuvlarsiz nomzodlar neytral 0.5 qiymatini oladi                                                                              |
| `reliability`         | 0.00          | Oʻnta namuna minimumidan keyingi 24 soatlik foydalanish tarixidan olingan kuzatilgan muvaffaqiyat ulushi, `1 - failureRate` (aks holda real vaqt koʻrsatkichlari); kuzatuvlarsiz nomzodlar 1.0 sifatida baholanadi. Sukut boʻyicha oʻchirilgan |

**Yigʻindi:** `DEFAULT_WEIGHTS` ichida eʼlon qilinganidek, `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`; foydalanuvchi sozlagan vaznlar baholashdan oldin `normalizeScoringWeights()` orqali taqsimotga qayta normallashtiriladi.

## Rejim paketlari

`open-sse/services/autoCombo/modePacks.ts` faylida oldindan belgilangan 6 ta vazn profili mavjud. Har bir paket tanlovni bitta maqsad tomon yoʻnaltirish uchun standart vaznlarni toʻliq almashtiradi. Har bir paketning yigʻindisi allaqachon `1.0` ga teng (toʻrtta kasr xonasi bilan chiqarilganda `0.9999`), shuning uchun paket faol boʻlganda `normalizeScoringWeights()` amalda tuzatishi kerak boʻlgan hech narsa yoʻq — quyidagi qiymatlar yaxlitlashni hisobga olganda baholagich qoʻllaydigan qiymatlardir.

| Omil                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Izohlar:

- **Paketlar `quality` va `reliability` qiymatlarini oʻz ichiga oladi** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) va vaznlar xaritasini toʻliq almashtiradi (`weights = pack`, birlashtirish emas). `DEFAULT_WEIGHTS` tarkibida `quality 0.03 / reliability 0` mavjud; `balanced`/`default` tanlansa, ushbu standart qiymatlar saqlanadi, paket tanlansa esa yuqoridagi paket qiymatlaridan foydalaniladi. Boʻsh pulda (hali kuzatuvlar yoʻq, shuning uchun `quality 0.5` va `reliability 1`) bu ikki omil umumiy paketda `+0.04` (`0.03 + 0.01`), `quality-first` paketida `+0.045` va `reliability-first` paketida `+0.05` qoʻshadi.
- `tierAffinity`, `specificityMatch` va `resetWindowAffinity` har bir paketda aniq `0` qilib belgilangan.
- Har bir paketning asosiy urgʻusi qisqacha:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (past kechikishli, sogʻlom ulanishlar)
  - **cost-saver** → costInv 0.3324 (eng arzon tokenlar yutadi)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, barcha paketlar orasida eng yuqorisi (vazifa uchun eng yaxshi, izchil model)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (tezlik/xarajatdan qatʼi nazar, maksimal zaxira)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, barcha paketlar orasida eng yuqorisi (eng kam kutilmagan holatlar)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (`auto/chaos` vazn paketi oʻz paneli aʼzolariga tayinlaydigan qiymatlar; parallel tarqatish bu vaznlarni oʻqimaydi va bu nosozlik kiritish profili emas, [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out) ga qarang)

### Har bir soʻrov uchun boshqaruv elementlari (sarlavhalar) — #6023 / #6024 / #6025 / #3470

`auto` kombinatsiyasini saqlangan konfiguratsiyasini oʻzgartirmasdan uchta sarlavha orqali **har bir soʻrov uchun** boshqarish mumkin. Ular faqat `auto` strategiyasiga va faqat ularni oʻz ichiga olgan soʻrovga tatbiq etiladi; sarlavha mavjud boʻlmaganda kombinatsiyaning saqlangan `modePack`/`budgetCap`/`budgetFallback` qiymatlaridan foydalaniladi.

| Sarlavha                      | Qabul qiladigan qiymatlar                                                                                                                                                                                 | Taʼsiri                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | oldindan sozlangan taxallus (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) yoki paketning asl nomi (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Ushbu soʻrov uchun baholash vaznlarini almashtiradi. `balanced`/`default` standart vaznlardan majburiy foydalanadi (paketsiz). Nomaʼlum qiymatlar eʼtiborsiz qoldiriladi (konfiguratsiya saqlanadi).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget`          | musbat son (har bir soʻrov uchun maksimal USD)                                                                                                                                                            | Xarajatning qatʼiy yuqori chegarasi: taxminiy xarajati undan oshadigan nomzodlar tanlovdan oldin filtrlanadi. **Barcha** nomzodlar ushbu chegaradan oshganda nima yuz berishi quyidagi `X-OmniRoute-Budget-Fallback` orqali boshqariladi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standart, taxalluslari: `cheapest-viable`, `soft`) yoki `strict` (taxalluslari: `block`, `hard`)                                                                                              | `cheapest`: chegaradan baribir oshishiga qaramay, umumiy hisobda eng arzon nomzodga qaytadi (avvalgi xatti-harakat). `strict`: tanlashni rad etadi — ortiqcha xarajatni sezdirmasdan amalga oshirish oʻrniga, soʻrov darhol `HTTP 402` bilan muvaffaqiyatsiz tugaydi. Nomaʼlum qiymatlar eʼtiborsiz qoldiriladi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Effort`          | `auto` (boshqa qiymatlar zaxiralangan)                                                                                                                                                                    | Moslashuvchan fikrlash budjeti: soʻrovda hech qanday koʻrinishdagi mulohaza yuritish maydoni (`reasoning_effort`, `reasoning`, `thinking`) boʻlmasa, shlyuz deterministik soʻrov tuzilishi signallari (foydalanuvchining oxirgi xabari uzunligi, foydalanuvchining oxirgi xabarigacha boʻlgan kontekst hajmi, oldingi vosita natijalari, vosita sikli chuqurligi) asosida `auto` qiymatini `low`/`medium`/`high` qiymatlaridan biriga aylantiradi. Signallar joriy yurish doirasida cheklanadi — foydalanuvchining oxirgi xabaridan keyingi barcha maʼlumotlar eʼtiborga olinmaydi — shu sababli vosita siklidagi har bir soʻrov bir xil darajaga ega boʻladi (har bir yurish uchun holatsiz mahkamlash, sessiya holatisiz, yuqori oqimdagi prompt-kesh prefikslarini buzishi mumkin boʻlgan sikl ichidagi oshirishsiz). Mijoz tomonidan aniq koʻrsatilgan mulohaza yuritish maydoni har doim ustun keladi. Yuqori oqimga yoʻnaltirilishi OpenAI Chat Completions shakliga (`targetFormat === FORMATS.OPENAI`) mos keladigan soʻrovlar bilan cheklangan — `reasoning_effort` OpenAI shaklidagi maydon boʻlgani uchun, Claude yoki Geminiʼga yoʻnaltirilgan soʻrovda bu sarlavha hech qanday taʼsir koʻrsatmaydi (`open-sse/handlers/chatCore/adaptiveEffortWiring.ts` fayliga qarang). |

```bash
# Eng tez profilni majburan tanlang, bu soʻrov xarajatini $0.05 bilan cheklang va ortiqcha sarflash oʻrniga qatʼiy bloklang
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Aniqlash sof funksiya (`open-sse/services/autoCombo/requestControls.ts`) hisoblanadi;
aniqlangan qiymatlar mexanizmning mavjud `config.modePack` / `config.budgetCap` /
`config.budgetFallback` kirishlariga uzatiladi. Kombinatsiyada saqlangan `config.budgetFallback` ("strict" |
"cheapest") doimiy siyosatni belgilaydi; sarlavha uni bitta soʻrov uchun qayta belgilaydi.

## Barcha marshrutlash strategiyalari

OmniRoute'ning kombinatsiya mexanizmi **20 ta marshrutlash strategiyasini** qoʻllab-quvvatlaydi (`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES` ichida eʼlon qilingan). Auto Combo mexanizmining oʻzi `auto` strategiyasi orqali taqdim etiladi; qolganlari saqlangan kombinatsiyalar uchun mavjud.

| Strategiya          | Tavsif                                                                                                                                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Aniq ustuvorlikka ega, birinchi nishondan boshlanadigan tartiblangan roʻyxat                                                                                                                                                                            |
| `weighted`          | Har bir nishon vazniga asoslangan vaznli tasodifiy tanlov                                                                                                                                                                                               |
| `round-robin`       | Nishonlar boʻylab tartib bilan aylanish (paketli; quyiga qarang)                                                                                                                                                                                        |
| `context-relay`     | Kontekstni nishonlar oʻrtasida uzatish (uzoq suhbatlar)                                                                                                                                                                                                 |
| `fill-first`        | Keyingisiga oʻtishdan oldin har bir nishon kvotasini toʻldirish                                                                                                                                                                                         |
| `p2c`               | 2 ta variant quvvatiga asoslangan tasodifiy yukni muvozanatlash                                                                                                                                                                                         |
| `random`            | Bir tekis tasodifiy tanlov                                                                                                                                                                                                                              |
| `least-used`        | Joriy yuki eng past boʻlgan nishonni tanlash                                                                                                                                                                                                            |
| `cost-optimized`    | Katalog narxlarini hisobga olgan holda har bir soʻrov uchun $ xarajatni minimallashtirish                                                                                                                                                               |
| `reset-aware` ⭐    | Kvotani tiklash vaqtiga qarab ustuvorlashtirish — qisqa tiklash oynalari yuqoriroq oʻringa qoʻyiladi                                                                                                                                                    |
| `reset-window`      | Kvota oynasi eng tez tiklanadigan nishonlarni afzal koʻrish                                                                                                                                                                                             |
| `headroom`          | Eng koʻp qolgan kvota zaxirasiga ega nishonni tanlash                                                                                                                                                                                                   |
| `quota-weighted`    | Kvotasi tugagan hisoblarni oʻtkazib yuborish, soʻng qolganlar orasidan qolgan kvotaning bajarilayotgan yuklamaga nisbatiga mutanosib ravishda tanlash; mavjud suhbatlar biriktirilgan holda qoladi                                                      |
| `strict-random`     | Takrorlarni olib tashlamasdan tasodifiy tanlash                                                                                                                                                                                                         |
| `auto`              | Auto Combo baholashidan foydalanish (16 omilli) — **tavsiya etiladi**                                                                                                                                                                                   |
| `lkgp`              | Oxirgi maʼlum yaxshi yoʻl (oxirgi muvaffaqiyatli provayderga biriktiradi, soʻng qoidalarga qaytadi)                                                                                                                                                     |
| `context-optimized` | Joriy kontekst hajmiga eng mos nishonni tanlash                                                                                                                                                                                                         |
| `cache-optimized`   | Nishonlarni prompt keshi bilan mosligiga qarab qayta tartiblash — ushbu soʻrovning keshlangan prefiksini allaqachon saqlayotgan boʻlishi ehtimoli eng yuqori ulanish birinchi sinab koʻriladi (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Modellardan iborat panelga parallel ravishda soʻrov yuborish, soʻng hakam yordamida bitta javobni sintez qilish (quyiga qarang)                                                                                                                         |
| `pipeline`          | Nishonlarni ketma-ket ishga tushirib, har bir bosqich chiqishini keyingi bosqich kirishiga uzatish; faqat yakuniy javob qaytariladi (#6396)                                                                                                             |

⭐ = v3.8.0 versiyasida yangi · 🧬 = v3.8.36 versiyasida yangi

### `weighted` semantikasi

`weighted` — bu tenglashtiruvchi emas, balki **har bir soʻrov uchun mutanosib tasodifiy tanlov**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`):

- Har bir soʻrov `weight / totalWeight` ehtimoli bilan **bitta** bosqichni tanlaydi; qolgan bosqichlar
  ushbu soʻrov uchun zaxira zanjiri sifatida vaznning kamayish tartibida joylashtiriladi.
- Vazni `0` boʻlgan (yoki koʻrsatilmagan) bosqich boshqa biror bosqichning vazni
  > 0 boʻlsa, **hech qachon tanlanmaydi** — u faqat tanlangan bosqich muvaffaqiyatsiz tugagandan keyin zaxira sifatida xizmat qilishi mumkin. Faqat **barcha**
  > vaznlar 0 boʻlgandagina tanlov bir tekis boʻladi.
- Nishonlarining barchasi mavjud boʻlmagan bosqichlar — provayderning uzilishdan himoya mexanizmi `OPEN`, ulanishning
  sovish davri, model bloklanishi — tanlov amalga oshirilishidan oldin undan olib tashlanadi
  (`open-sse/services/combo/targetResolution.ts`), shu sababli yagona sogʻlom bosqich vaqtincha
  har bir soʻrovda tanlanishi mumkin.
- `stickyWeightedLimit` (kombinatsiya konfiguratsiyasi, standart qiymati `1` = oʻchiq) qayta tanlashdan oldin tanlangan bosqichni shuncha
  ketma-ket muvaffaqiyat davomida biriktirib turadi.

Qatʼiy rotatsiya uchun `round-robin`dan foydalaning; `weighted`da teng vaznlar qatʼiy
emas, statistik muvozanatni taʼminlaydi.

### Agentik konveyer rejimi

Kamida ikkita modelga ega `pipeline` kombinatsiyasi
`config.agenticOrchestration.enabled` orqali rejalashtiruvchi/bajaruvchi marshrutlashini
yoqishi mumkin. Birinchi maqsad rejalashtirish va yakuniy javoblar uchun javob beradi;
ikkinchi maqsad mijozga xos vosita chaqiruvlarini chiqaradi. OmniRoute soʻrov
protokolidan vosita natijasi davomlarini aniqlaydi, rejalashtiruvchidan yana bir vosita
bosqichi kerak yoki kerak emasligini soʻraydi va mijozga koʻrinadigan yakuniy bosqich
sifatida bajaruvchi yoki rejalashtiruvchini dinamik tarzda tanlaydi.

Ikkinchi maqsaddan keyingi qoʻshimcha modellar tartiblangan zaxira bajaruvchilardir.
Muvaffaqiyatsiz HTTP javobi yoki transport istisnosi keyingi bajaruvchiga oʻtadi va
ayni rejalashtiruvchi qarori hamda mahalliy vositalarni saqlab qoladi, biroq oʻsha
bajaruvchining oʻz bosqich koʻrsatmasi va aniqlangan ulanishidan foydalanadi. Birinchi
muvaffaqiyatli javob oʻzgartirilmasdan qaytariladi, jumladan SSE oqimi ham; muvaffaqiyatli
oqim boshlangandan keyingi xatoliklarni bu yerda qayta urinish orqali bajarib boʻlmaydi.
Agar barcha bajaruvchilar muvaffaqiyatsiz boʻlsa, oxirgi xatolik qaytariladi. Mijoz
tomonidan bekor qilish joʻnatishni toʻxtatadi.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Bajaruvchi bitta javobda bir nechta mustaqil chaqiruv chiqarishi mumkin. Bogʻliq chaqiruvlar
mijozning keyingi vosita natijasi bosqichlarida qayta ishlanadi va rejalashtiruvchi har bir
natijani koʻrib chiqadi. `maxToolRounds`ning standart qiymati `8` boʻlib, `1`–`32`
oraligʻidagi qiymatlarni qabul qiladi; chegaraga yetilgach, rejalashtiruvchi mavjud eng
yaxshi yakuniy javobni yaratishi kerak. Rejalashtiruvchining ichki qarorlari buferlanadi,
mijozga koʻrinadigan tanlangan javob esa asl oqim uzatish afzalligini saqlab qoladi.

### `round-robin`ning biriktirilgan toʻplami va hisoblarni kengaytirish

Round-robin har bir bosqichda bittadan soʻrov tarzida emas, toʻplamlar asosida ishlaydi:

- `stickyRoundRobinLimit` (avval kombinatsiya konfiguratsiyasi, keyin
  `comboStickyRoundRobinLimit`, undan soʻng `settings.stickyRoundRobinLimit`, standart
  qiymati **3**) rotatsiyadan oldin shuncha ketma-ket muvaffaqiyat davomida bir xil
  maqsadni saqlaydi. Har bir soʻrovdan keyin rotatsiya qilish uchun kombinatsiya
  ustuvor qiymatini `1`ga oʻrnating. Kombinatsiya muharriri amaldagi qiymatni va u qaysi
  qatlamdan olinganini koʻrsatadi.
- `connectionAwareExpansion` (avval kombinatsiya konfiguratsiyasi, keyin sozlamalar,
  standart qiymati **false**) rotatsiyadan oldin provayder darajasidagi har bir bosqichni
  har bir hisob uchun alohida maqsadlarga kengaytiradi. B guruhi strategiyalari
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) bu parametr yoqilmaguncha provayder darajasidagi koʻrinishni saqlaydi.
  Kombinatsiya muharririda inherit / on / off variantlari mavjud; inherit global standart
  qiymatdan foydalanadi (off).
- Koʻrsatmalar keshi yaqinligi asosidagi marshrutlash (`promptCacheAffinityEnabled`,
  standart qiymati **true**) mos keluvchi kesh kalitlari bitta hisobda qolishi uchun
  biriktirilgan ulanishlarni qayta tartiblaydi. U har bir hisobga biriktirilgan bosqichlar
  boʻylab round-robin va weighted rotatsiyasidan ustun turadi. Qatʼiy rotatsiya kerak
  boʻlsa, uni Settings → Combo defaults boʻlimida oʻchiring. Har bir kombinatsiya uchun
  alohida ustuvor sozlama mavjud emas.

Bitta modelda bir nechta hisob oʻrtasida rotatsiya qilish uchun uchta biriktirilgan
`connectionId` oʻrniga, biriktirish chegarasi `1` boʻlgan **bitta dinamik hisob bosqichi**dan
(boʻsh `connectionId`, butun pul) foydalaning. Biriktirilgan bosqichlar va yaqinlik birga
ishlaganda, RR hisoblagichi oldinga siljisa ham, barchasi bir xil hisobga jamlanadi.

## Fusion strategiyasi

`fusion` — bitta nishonni tanlamaydigan **yagona** strategiya. U soʻrovni
**barcha panel modellariga parallel ravishda** yuboradi, soʻng sozlanadigan **hakam modeli** barcha
panel javoblaridan yagona yakuniy javobni sintez qiladi. Yuqoridagi `decolua/9router`
(OpenRouter'ning Fusion dizayni) loyihasidan koʻchirilgan; amalga oshirilishi `open-sse/services/fusion.ts` faylida.

U qanday ishlaydi:

0. **Vositali soʻrovni chetlab oʻtkazish** — `tool_choice` aniq `"none"` qilib
   belgilanmagan va boʻsh boʻlmagan `tools` massivini oʻz ichiga olgan soʻrov panelni butunlay
   chetlab oʻtadi: u oʻzgartirilmagan `tools`/`tool_choice` bilan toʻgʻridan-toʻgʻri
   bitta modelga (sozlangan hakam yoki `panel[0]`) yoʻnaltiriladi. Panel aʼzolarida vositalardan
   foydalanish imkoni yoʻq va hakamning sintez koʻrsatmasi vosita chaqiruvlarini yaratishni
   cheklaydi, shuning uchun agentli/vosita chaqiruvchi mijozlar sintezlangan matn oʻrniga
   haqiqiy vosita chaqirish qarorini oladi (#6771).
1. **Tarqatish** (faqat vositasiz soʻrovlar) — soʻrov barcha panel
   modellariga bir vaqtda yuboriladi, vositalar olib tashlangan holda oqimsiz rejim majburan
   qoʻllanadi (sintez qilish uchun hakamga toʻliq matn kerak).
2. **Kvorumdan keyingi imtiyozli yigʻish** — `minPanel` ta javob kelishi bilanoq, kechikayotganlar
   uchun qisqa imtiyoz taymeri ishga tushadi, soʻng fusion yigʻilgan barcha javoblar bilan davom etadi.
   Bu eng sekin modelning umumiy vaqtga taʼsirini cheklaydi va qatʼiy kutish vaqti bilan chegaralanadi.
3. **Hakam sintezi** — panel javoblari anonimlashtiriladi (`Source 1`, `Source 2`, … — shunda
   hakam model brendini emas, mazmunni baholaydi) va hakamga uzatiladi; u
   yakdillik / ziddiyatlar / qisman qamrov / noyob xulosalar / eʼtibordan chetda qolgan jihatlarni tahlil qiladi, soʻng
   **bitta** ishonchli javob yozadi. Hakam chaqiruvi mijozning asl
   `stream` bayrogʻi va vositalarini saqlab qoladi, shu sababli oqimli uzatish va quyi bosqichdagi vositalardan foydalanish ishlashda davom etadi.
4. **Bosqichma-bosqich soddalashish** — 0 ta panel javobi → `503`; aynan 1 ta saqlanib qolgan javob
   → oʻsha javob toʻgʻridan-toʻgʻri qaytariladi (birlashtirish uchun hech narsa yoʻq); bitta modelli panel toʻgʻridan-toʻgʻri javob beradi.

Panel aʼzosi boshqa komboga ishora qiluvchi `combo-ref` bosqichi (`{kind: "combo-ref", comboName: "..."}`) ham
boʻlishi mumkin — u **bitta qora quti panel ovozi** sifatida yechiladi (koʻrsatilgan komboning
oʻz nishonlariga tarqatish emas, balki unga toʻliq rekursiv yoʻnaltirish) va boshqa barcha combo-ref ishlatuvchi
strategiyalarda mavjud boʻlgan chuqurlik/sikl himoyasidan foydalanadi (#6764).

### Sozlash

Komboning `config` blobida sozlanadi (sxema migratsiyasi talab qilinmaydi — u mavjud
`combos` jadvalidan qayta foydalanadi):

| Maydon                                   | Tur      | Standart qiymat       | Maqsad                                                                                                                       |
| :--------------------------------------- | :------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | birinchi panel modeli | Yakuniy javobni sintez qiladigan model                                                                                       |
| `config.fusionTuning.minPanel`           | `number` | `2`                   | Imtiyoz taymeri boshlanishidan oldin talab qilinadigan muvaffaqiyatli javoblar soni (`[2, panelSize]` oraligʻida cheklanadi) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                | Kvorumga erishilgach, kechikayotganlarni qancha vaqt kutish kerak                                                            |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`               | Bitta qotib qolgan model soʻrovni toʻxtatib qoʻymasligi uchun mutlaq chegara                                                 |

Standart qiymatlar `FUSION_DEFAULTS` ichida (`open-sse/services/fusion.ts`) joylashgan.

### Misol

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Soʻng uni boshqa har qanday kombo kabi chaqiring: `{"model":"fusion-panel","messages":[...]}`.

## Virtual Auto-Combo fabrikasi

Auto Combo mexanizmi oldindan belgilangan kombinatsiyalarni talab qilmaydi. Buning o‘rniga, `open-sse/services/autoCombo/virtualFactory.ts` nomzodlarni dinamik ravishda yaratadi:

1. `getProviderConnections({ isActive: true })` orqali barcha yoqilgan ulanishlarni oladi
2. Yaroqli hisob ma’lumotlariga ega ulanishlarni filtrlab oladi (API kaliti yoki `hasUsableOAuthToken()` orqali muddati tugamagan OAuth tokeni)
3. Modellarning mavjudligi va narxlarini aniqlash uchun `getProviderRegistry()` bilan o‘zaro tekshiradi
4. Har bir `(provider, model, connection)` korteji uchun `VirtualAutoComboCandidate` yaratadi
5. Jo‘natish nishoni sifatida `connection.defaultModel`ni (yoki registrdagi birinchi modelni) tanlaydi
6. Har bir nomzodni 16 omilli `scorePool()` va variantning vaznlar to‘plamidan foydalanib baholaydi
7. Natijada hosil bo‘lgan xotiradagi `AutoComboConfig`ni `handleComboChat()` uchun qaytaradi — ma’lumotlar bazasiga hech qachon saqlanmaydi

Bu shuni anglatadiki, **`auto/*` yoqilgan yangi provayderni qo‘shish nomzodlar to‘plamini avtomatik ravishda kengaytiradi** — kombinatsiyani qo‘lda tahrirlash talab qilinmaydi. Virtual kombinatsiya har bir so‘rov uchun qayta yaratiladi, shu sababli yangi qo‘shilgan yoki holati yangidan tiklangan ulanishlar darhol hisobga olinadi.

## O‘z-o‘zini tiklash

- **Vaqtinchalik chiqarib tashlash**: Baho < 0.2 → 5 daqiqaga chiqarib tashlanadi (bosqichma-bosqich ortuvchi kutish, ko‘pi bilan 30 daqiqa)
- **Avtomatik uzgich holatini hisobga olish**: OPEN → avtomatik chiqarib tashlanadi; HALF_OPEN → sinov so‘rovlari
- **Nosozlik rejimi**: >50% OPEN → tadqiqot o‘chiriladi, barqarorlik maksimal darajaga oshiriladi
- **Sovish davridan keyingi tiklanish**: Chiqarib tashlash muddati tugagach, birinchi so‘rov qisqartirilgan kutish vaqti bilan yuboriladigan «sinov» so‘rovi bo‘ladi

## Bandit usulidagi tadqiqot

So‘rovlarning 5%i (sozlanishi mumkin) tadqiqot maqsadida tasodifiy provayderlarga yo‘naltiriladi. Nosozlik rejimida o‘chiriladi.

## API

**Maxsus `POST /api/combos/auto` endpointi mavjud emas** — Auto-Combo’dan ikki usulda foydalaniladi:

1. **Nol konfiguratsiya (tavsiya etiladi):** `model: "auto"` yoki `model: "auto/<variant>"` bilan istalgan chat completion soʻrovini yuboring. Virtual fabrika har bir soʻrov uchun combo yaratadi — saqlash ham, API chaqiruvlari ham talab qilinmaydi.

2. **`strategy: "auto"` bilan saqlanadigan combo:** `POST /api/combos` orqali oddiy combo yarating va `strategy: "auto"` hamda `config.auto.weights` / `config.auto.candidatePool` qiymatlarini belgilang. Xuddi shu baholash mexanizmidan foydalaniladi; combo `combos` ichida saqlanadi va ID orqali qayta ishlatilishi mumkin.

Aniqlash uchun `GET /api/combos/auto` har bir variantni uning aniqlangan nomzodlar puli hamda `context_length` / `max_output_tokens` — nomzodlar pulidagi kontekst oynalari orasidagi MAKSIMAL qiymatlar bilan roʻyxatlaydi. Mijozlar (masalan, opencode plagini) `0` oʻrniga ushbu qiymatlarni eʼlon qilishi kerak: nol kontekst opencode’ning avtomatik ixchamlashtirishini butunlay oʻchiradi, natijada seanslar gateway tarixni tozalab, kontekstni yoʻq qilguniga qadar oʻsib boradi. MAX qiymatini eʼlon qilish xavfsiz, chunki auto-combo kontekstining dastlabki filtri hajmi katta soʻrovlarni keng kontekst oynali nomzodlarga yoʻnaltiradi.

```bash
# Nol konfiguratsiya bilan foydalanish (combo yaratish talab qilinmaydi)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Oddiy combos endpointi orqali saqlanadigan avtomatik combo
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Avtomatik router strategiyalari

Saqlanadigan `strategy: "auto"` combo’lari `config.routerStrategy` (yoki eski
`config.auto.routerStrategy`) qiymatini quyidagilardan biriga oʻrnatishi mumkin:

- `rules` — standart vaznli baholash
- `score` — eng yuqori sozlangan vaznli bahoni tanlaydi. Mutlaq tengliklarda sozlangan
  nomzodlar tartibi saqlanadi; mavjud `explorationRate` toʻliq tartiblangan puldan namuna tanlaydi.
- `cost` / `eco` — eng arzon sogʻlom provayder
- `latency` / `fast` — ishonchlilik jarimasi bilan eng past p95 kechikish
- `sla-aware` / `sla` — p95 kechikish, xatolik darajasi va ixtiyoriy
  xarajat SLO’larini qanoatlantiradigan nomzodlarni afzal koʻrish
- `lkgp` — avval soʻnggi maʼlum yaxshi provayder
- `nadir` — prompt uchun puldagi qaysi model kerakligini [Nadir](https://getnadir.com) qaror qabul qilish API’sidan soʻraydi;
  ixtiyoriy ravishda yoqiladi, xatolik yuz bersa `rules` bilan ochiq qoladi

### Router strategiyalari batafsil

Auto-combo mexanizmi `config.routerStrategy` (yoki eski `config.auto.routerStrategy`) orqali
almashtirishingiz mumkin boʻlgan 7 ta ulanadigan **RouterStrategy** implementatsiyasini taqdim etadi.
Har bir strategiya `RoutingContext` (vazifa turi, vosita/tasvir ishoralari, tokenlar taxmini, ixtiyoriy SLA siyosati,
ixtiyoriy soʻnggi maʼlum yaxshi provayder) asosida nomzodlar pulidan bitta provayderni tanlaydi.

#### 1. `rules` (standart) — 16 omilli vaznli baholash

Mavjud baholash mexanizmini oʻraydi. `OPEN` holatidagi circuit-breaker
nomzodlarini filtrlab tashlaydi, soʻng joriy vazifa turi va `getTaskFitness()` bilan `scorePool()`ni
ishga tushirib, eng yuqori baholangan provayderni tanlaydi.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Qachon foydalanish kerak**: Standart holatda. Barcha signallar oʻrtasida muvozanatli kelishuv kerak boʻlganda foydalaning.

**Taxallus**: `rules` (taxallusi yoʻq)

---

#### 2. `cost` / `eco` — eng arzon sogʻlom provayder

Nomzodlar pulini `costPer1MTokens` boʻyicha (oʻsish tartibida) saralaydi va eng arzonini tanlaydi.
Avval `OPEN` holatidagi nomzodlarni filtrlab tashlaydi.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Qachon foydalanish kerak**: Xarajatga sezgir ish yuklamalari, paketli qayta ishlash yoki fon vazifalari uchun.

**Taxalluslar**: `cost`, `eco`

---

#### 3. `latency` / `fast` — ishonchlilik jarimasi bilan eng past p95 kechikish

`p95LatencyMs + (errorRate * 1000)` boʻyicha saralaydi. Xatolik darajasi uchun jarima,
nominal kechikishi past boʻlsa ham, ishonchsiz provayderlarning pastroq oʻringa tushishini taʼminlaydi.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Qachon foydalanish kerak**: Real vaqt rejimidagi chat, avtomatik toʻldirish yoki
interaktiv dasturlash yordamchilari kabi kechikishga sezgir ish yuklamalari uchun.

**Taxalluslar**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — kechikish/xatolik/xarajat SLO talablariga muvofiqlik

Har bir nomzodni sozlangan SLO siyosatini qay darajada qanoatlantirishiga qarab baholaydi:

| Omil             | Vazn | Formula                                                     |
| ---------------- | ---- | ----------------------------------------------------------- |
| Kechikish bali   | 35%  | `threshold / max(value, ε)`                                 |
| Xatolik bali     | 35%  | `threshold / max(value, ε)`                                 |
| Holat bali       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)           |
| Xarajat bali     | 10%  | `threshold / max(value, ε)` yoki teskari meʼyorlangan       |
| Barqarorlik bali | 5%   | kechikish standart ogʻishining teskari meʼyorlangan qiymati |

`hardConstraints: true` boʻlganda, nomzodlar avvalo **buzilish bali**
(ular biror SLO chegarasidan qanchalik oshgani), soʻngra umumiy ball boʻyicha saralanadi. Aks holda,
faqat umumiy ball hisobga olinadi.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Kechikish, xatolik darajasi va xarajat SLOlarini qondirish ehtimoli eng yuqori provayderni tanlaydi";

  select(pool, context) {
    // ... har bir nomzodni quyidagi siyosat bo‘yicha baholaydi: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA maydonlari** (kombinatsiya konfiguratsiyasida oʻrnatiladi):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Qachon foydalanish kerak**: Kechikish, xatolik darajasi yoki xarajat boʻyicha qatʼiy byudjetlarga ega ishlab chiqarish ish yuklamalari uchun.

**Taxalluslar**: `sla-aware`, `sla`

---

#### 5. `lkgp` — avval soʻnggi ishonchli provayder

Avval **soʻnggi ishonchli provayderni** (agar belgilangan boʻlsa) sinab koʻradi, soʻngra
`rules` strategiyasiga qaytadi. Bu seansga bogʻliqlik uchun foydali — suhbatdagi
keyingi soʻrovlarni ayni provayder bajaradi.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description =
    "Avval so‘nggi ishonchli provayderni sinaydi, so‘ngra qoidalar strategiyasiga qaytadi";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Qoidalar strategiyasiga qaytish
    return getStrategy("rules").select(pool, context);
  }
}
```

**Qachon foydalanish kerak**: Keyingi soʻrovlarni ayni provayder bajarishini istagan
koʻp bosqichli suhbatlarda (masalan, keshlash, kontekst uzluksizligi yoki narx izchilligi uchun).

**Taxallus**: `lkgp` (taxallusi yoʻq)

---

#### 6. `nadir` — Nadir orqali soʻrovga mos model tanlash

Yuqoridagi har bir strategiya nomzodlarni oʻz telemetriyasi asosida saralaydi; ularning hech biri
soʻrovni oʻqimaydi. `nadir` foydalanuvchining soʻnggi xabari va puldagi model identifikatorlarini
[Nadir](https://getnadir.com) qaror API’siga (`POST /v1/bucket`) yuboradi va Nadir shu menyudan
tanlagan modelga yoʻnaltiradi (`simple` → vazifani bajara oladigan eng arzon model, `complex` → eng
ilgʻor model). Shu modelga xizmat koʻrsatuvchi ulanish baribir `rules` tomonidan tanlanadi, shuning
uchun kvota, holat va xarajat qaysi hisob tanlanishini belgilashda davom etadi.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` va `OMNIROUTE_NADIR_BASE_URL` ushbu ikki satr uchun muhitdagi
zaxira qiymatlardir. `baseUrl` faqat mustaqil joylashtirilgan Nadir uchun kerak (oxiridagi `/v1` qabul qilinadi).
Kalitsiz chaqiruvlar Nadir’ning anonim darajasiga tushadi va unda tezlik har bir IP boʻyicha cheklangan.

Tashqariga yuboriladigan maʼlumotlar: foydalanuvchi soʻnggi xabarining matni (dastlabki 16 mingta belgi),
nomzod model identifikatorlari va `source: "omniroute"` kanal tegi. Tizim soʻrovi, tarix, vositalar yoki
sarlavhalar yuborilmaydi.

Nosozlik holatida tizim ochiq rejimda davom etadi: kutish vaqti tugashi (standart 2000 ms), 2xx boʻlmagan
javob, ulanib boʻlmaydigan xost, notoʻgʻri shakllangan javob yoki puldan tashqaridagi tanlov `rules`
qaroriga olib keladi va sabab oldiga `NadirStrategy: fallback (…)` qoʻshiladi. Muvaffaqiyatsiz chaqiruvdan
soʻng strategiya tarmoqni 30 soniya davomida chetlab oʻtadi, shuning uchun uzilish har bir soʻrov uchun
emas, har 30 soniyada bir marta kutish vaqti xarajatiga olib keladi. Yoʻnaltirish hodisalari faqat Nadir
haqiqatan ham tanlov qilganida `strategy: "nadir"` deb xabar beradi.

**Qachon foydalanish kerak**: Turli darajadagi modellarni (kichik, oʻrta va eng ilgʻor modelni) qamrab
olgan puldagi turli murakkablikdagi trafik uchun, har doim eng ilgʻor modeldan foydalanish xarajatini
kamaytirishni istaganingizda.

**Taxallus**: `nadir` (taxallusi yoʻq)

---

### Maxsus router strategiyalari

Oʻzingizning `RouterStrategy` implementatsiyangizni ommaviy API orqali roʻyxatdan oʻtkazishingiz mumkin:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "Mening maxsus yo‘naltirish strategiyam";

  select(pool, context) {
    // Yo‘naltirish mantiqingizni shu yerga yozing
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Soʻngra undan foydalaning:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Router strategiyasini tanlash boʻyicha qoʻllanma

| Foydalanish holati        | Strategiya  | Sabab                                               |
| ------------------------- | ----------- | --------------------------------------------------- |
| Muvozanatli ish yuklamasi | `rules`     | Standart — barcha omillarni hisobga oladi           |
| Xarajatni kamaytirish     | `cost`      | Har doim eng arzonini tanlaydi                      |
| Kechikishni kamaytirish   | `latency`   | Eng tezkor ishonchli provayderni tanlaydi           |
| Qatʼiy SLOlar             | `sla-aware` | p95/xatolik/xarajat chegaralari boʻyicha filtrlaydi |
| Koʻp bosqichli chat       | `lkgp`      | Seansga bogʻliqlik                                  |
| Turli murakkablik         | `nadir`     | Har bir soʻrov uchun model darajasini tanlaydi      |

SLA’ni hisobga oluvchi maydonlar:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Vazifaga moslik

30 dan ortiq model 6 ta vazifa turi (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`) boʻyicha baholangan. Joker belgili andozalarni qoʻllab-quvvatlaydi (masalan, `*-coder` → kodlash uchun yuqori ball).

## Avtomatik variantlar haqida qisqacha

Oddiy `auto` (standart) hamda `autoPrefix.ts` faylida eʼlon qilingan 6 ta `AutoVariant` qiymatini hisobga olganda, **ishga tushirish mumkin boʻlgan 7 ta model identifikatori** mavjud:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant`ning oʻzi 6 ta qiymatni sanab oʻtadi; 7-variant — «variantsiz», yaʼni oddiy `auto` — `parseAutoPrefix()` tomonidan `variant: undefined` sifatida qayta ishlanadi.)

## Darajalar Auto-Combo bilan qanday ishlaydi

16 omilli baholash funksiyasi (`open-sse/services/autoCombo/scoring.ts`) darajaga
mansublikni ikkita signal sifatida ko‘rib chiqadi: `tierPriority` (0.0476) va `tierAffinity` (0.0476). To‘liq
`DEFAULT_WEIGHTS` to‘plami uchun yuqoridagi kanonik [baholash omillari jadvali](#how-it-works-persisted-auto-combos)ga qarang — har bir paket uchun alohida sozlamalar (ship-fast/cost-saver/quality-first/
offline-friendly) “Har bir paket uchun vazn profillari” jadvalida keltirilgan.

Darajaning o‘zi Tier 1’ni birinchi bo‘lishga **majburlamaydi** — agar Tier 1 kechikishi yuqori bo‘lsa yoki
xarajat va sifat nisbati maqbul bo‘lmasa, Tier 2 ustun keladi. Darajalar tartibini majburan qo‘llash uchun
`priority` kombinatsiya strategiyasidan foydalaning va provayderlarni daraja bo‘yicha joylashtiring.

Tier 1’ni (obunani) kuchli afzal ko‘rish uchun `tierPriority` vaznini oshiring:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Daraja ta’riflari va provayderlar tasnifi uchun [`docs/guides/TIERS.md`](../guides/TIERS.md)ga qarang.

## Sinov va qamrov

### Deterministik marshrutlash qarorlari matritsasi (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` haqiqiy kombinatsiya konveyeri va taqlid qilingan yuqori oqim orqali barcha 19 ta ommaviy strategiyaning marshrutlash **qarori**ni boshidan oxirigacha tasdiqlaydi. Qamrov quyidagilarni oʻz ichiga oladi:

- Barcha 19 ta `ROUTING_STRATEGY_VALUES` strategiyasi (ordered, weighted, cost, context, fusion, …).
- `quota-share` (ichki) boshidan oxirigacha: haqiqiy `selectQuotaShareTarget` ulanish nuqtasi (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`) orqali DRR adolatliligi va toʻyinganlikdagi ustuvorlikni pasaytirish.
- Har bir maqsad soni boʻyicha `context-relay` universal topshirish qamrovi.

Ushbu sinovlar toʻplami CI ichida (`test:integration` vazifasi) `--test-concurrency=1` va `--test-force-exit` parametrlari bilan ishga tushiriladi, shuning uchun u deterministik boʻlib, amaldagi hisob maʼlumotlarini talab qilmaydi.

### Shartli jonli tezkor sinovlar (CI ichida EMAS — haqiqiy provayderlar)

| Buyruq                                 | Nima qiladi                                                                                        |
| :------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1` bilan jarayon ichidagi haqiqiy marshrutlash; jonli OmniRoute DB nusxasini oladi |
| `npm run test:combo:live:vps`          | Jonli OmniRoute serveriga HTTP chaqiruvlari (`COMBO_LIVE_BASE_URL`ni sozlang)                      |
| `npm run test:combo:live:vps:failover` | Xuddi shu, ataylab yaratilgan uzilishdan tiklanish ssenariylari bilan                              |

Ushbu tezkor sinovlar haqiqiy uzatish yoʻlini (kombinatsiya → provayder → yakunlash) tekshiradi. Ular amaldagi hisob maʼlumotlari va VPS kirishini talab qilgani sababli CI tarkibidan ataylab chiqarib tashlangan.

---

## Fayllar

| Fayl                                                      | Maqsadi                                                                                                                                   |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 omilli baholash funksiyasi, `DEFAULT_WEIGHTS`, pul normasi                                                                             |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × vazifa mosligi qidiruvi                                                                                                           |
| `open-sse/services/autoCombo/engine.ts`                   | Tanlash mantigʻi, bandit, budjet cheklovi                                                                                                 |
| `open-sse/services/autoCombo/selfHealing.ts`              | Istisno qilish, tekshiruvlar, hodisa rejimi                                                                                               |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 ta vazn profili (tez chiqarish, xarajatni tejash, sifatni ustun qoʻyish, oflayn uchun qulay, ishonchlilikni ustun qoʻyish, xaos rejimi) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiksi parseri + 6 ta variant                                                                                                   |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Faol ulanishlardan xotiradagi `AutoComboConfig`ni yaratadi                                                                                |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Provayderlar reyestrini soxtalashtirish uchun test ilgagi                                                                                 |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 ta strategiya)                                                                                              |
| `src/sse/handlers/chat.ts`                                | Integratsiya: auto-prefiks uchun qisqa tutashuv                                                                                           |
