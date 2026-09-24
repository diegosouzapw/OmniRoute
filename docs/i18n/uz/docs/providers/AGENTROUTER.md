# AgentRouter Setup Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) — Anthropic bilan mos keluvchi relay bo‘lib, Claude va boshqa modellarni ko‘pincha bevosita Anthropic API narxlaridan arzonroq narxlarda qayta sotadi. U rasmiy Claude Code mijozi uchun to‘g‘ridan-to‘g‘ri `ANTHROPIC_BASE_URL` o‘rnini bosuvchi vosita sifatida ishlab chiqilgan, shu sababli u faqat Claude Code protokol ko‘rinishiga mos keladigan trafikni qabul qiladi (muayyan User-Agent, `anthropic-beta` bayroqlari, Stainless SDK sarlavhalari va hokazo).

## Tezkor boshlash — mahalliy `agentrouter` provayderidan foydalanish (tavsiya etiladi)

Aksariyat foydalanuvchilar uchun **hech qanday maxsus sozlash talab qilinmaydi**. OmniRoute tarkibida Claude Code protokol ko‘rinishi to‘liq o‘rnatilgan ichki `agentrouter` provayderi mavjud (`open-sse/config/providerRegistry.ts` → `agentrouter` ga qarang). Undan foydalanish uchun:

1. **Boshqaruv paneli → Provayderlar → Provayder qo‘shish** bo‘limini oching.
2. Ro‘yxatdan **AgentRouter** ni tanlang.
3. `sk-...` API kalitingizni kiriting va saqlang.

Shu kifoya — muhit o‘zgaruvchilari ham, maxsus provayder turi ham kerak emas. Ichki modellar qatoriga `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` va `deepseek-v3.2` kiradi.

Ushbu qo‘llanmaning qolgan qismi **kengaytirilgan usul**ni, ya’ni `anthropic-compatible-cc-*` provayder turidan foydalanishni yoritadi. Protokol ko‘rinishini batafsilroq boshqarishingiz kerak bo‘lganda — masalan, mahalliy provayder reyestrida hali mavjud bo‘lmagan AgentRouter uslubidagi boshqa relaylarga ulanishda yoki asosiy URL, chat yo‘li yoxud sarlavhalar to‘plamini almashtirishda — shu usuldan foydalaning.

---

## Kengaytirilgan: Claude Code bilan mos provayder turi orqali ulanish

OmniRoute AgentRouter va shunga o‘xshash relaylarni to‘g‘ri protokol ko‘rinishidagi Anthropic Messages API bilan ishlaydigan **Claude Code bilan mos** provayder turi (`anthropic-compatible-cc-*`) orqali ham qo‘llab-quvvatlaydi. `https://agentrouter.org` manziliga yo‘naltirilgan oddiy `openai-compatible-chat` provayderi **ishlamaydi** — yuqori oqimdagi WAF Claude Code so‘rovlariga o‘xshamaydigan so‘rovlarni rad etadi.

---

## Dastlabki talablar

- AgentRouter hisobi va API kaliti. Yangi ro‘yxatdan o‘tgan foydalanuvchilar loyiha [README](../README.md) faylidagi hamkorlik havolasi orqali bepul kreditlar oladi.
- OmniRoute `ENABLE_CC_COMPATIBLE_PROVIDER` funksiya bayrog‘i yoqilgan holda ishlayotgan bo‘lishi kerak (quyiga qarang).

## 1. CC bilan mos provayder turini yoqing

Claude Code bilan mos provayder turi funksiya bayrog‘i ortida yashirilgan, chunki u rasmiy Claude Code mijozi trafikka juda o‘xshash trafik yuboradi. Uni yoqish uchun OmniRoute xizmatini ishga tushirishdan oldin muhit o‘zgaruvchisini belgilang:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker misoli:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Qayta ishga tushirilgach, boshqaruv panelida mavjud OpenAI bilan mos va Anthropic bilan mos jarayonlarga qo‘shimcha ravishda **Claude Code bilan mos provayder qo‘shish** opsiyasi paydo bo‘ladi.

## 2. Boshqaruv panelida provayder yarating

1. **Boshqaruv paneli → Provayderlar → Provayder qo‘shish** bo‘limini oching.
2. **Claude Code bilan mos provayder qo‘shish** variantini tanlang (faqat yuqoridagi bayroq o‘rnatilganda ko‘rinadi).
3. Maydonlarni to‘ldiring:

| Maydon     | Qiymat                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Nomi       | `AgentRouter` (yoki istalgan yorliq)                                           |
| Prefiks    | `agentrouter` (jurnallar va boshqaruv panelida ko‘rsatiladigan qulay taxallus) |
| Asosiy URL | `https://agentrouter.org`                                                      |
| Chat yo‘li | `/v1/messages?beta=true` (standart — o‘zgartirmang)                            |

> Kanonik model identifikatori hali ham to‘liq provayder tuguni identifikatoridan
> (`anthropic-compatible-cc-{uuid}/{model}`) foydalanadi. **Prefiks** — jurnal
> natijalarini tushunarliroq ko‘rsatish uchun `src/lib/usage/callLogs.ts` tomonidan
> aniqlanadigan oddiy ko‘rsatish taxallusidir.

4. (Ixtiyoriy) Saqlashdan oldin ulanishni tasdiqlash uchun API kalitingizni **Tekshirish** maydoniga kiriting va **Tekshirish** tugmasini bosing.
5. **Qo‘shish** tugmasini bosing.

Provayder yaratilgach, uni oching va AgentRouter API kalitingiz (`sk-...`) bilan **Ulanish** qo‘shing. Ulanishning `test_status` qiymati `active` holatiga o‘tishi kerak.

## 3. Uni combo orqali yoki bevosita ishlating

Provayderingiz prefiksidan nomlar fazosi sifatida foydalanib, modelga murojaat qiling:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanonik model IDʼsi `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ham ishlaydi
va aynan shu ID maʼlumotlar bazasi hamda combo konfiguratsiyasida ko‘rsatiladi.

Yoki uni boshqa har qanday provayder kabi marshrutlash, zaxira variant va kvotalarni
boshqarish uchun comboga qo‘shing.

---

## Wire image tafsilotlari

Maʼlumot uchun, cc-compatible ko‘prigi yuqori oqimdagi har bir so‘rovda quyidagilarni
yuboradi (`open-sse/services/claudeCodeCompatible.ts` fayliga qarang):

| Sarlavha                                                       | Qiymat                                                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                                | `Bearer <api-key>`                                                                                                      |
| `User-Agent`                                                   | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                |
| `anthropic-version`                                            | `2023-06-01`                                                                                                            |
| `anthropic-beta`                                               | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                |
| Har bir ulanish uchun redact-thinking beta almashtirgichi      | Aynan tahrirlangan fikrlash oqimlarini talab qiladigan yuqori oqimlarga `redact-thinking-2026-02-12` qiymatini qo‘shadi |
| Har bir ulanish uchun umumlashtirilgan fikrlash almashtirgichi | Ko‘rsatish rejimi hali belgilanmagan CC Compatible fikrlash so‘rovlariga `display: "summarized"` qiymatini qo‘shadi     |
| `anthropic-dangerous-direct-browser-access`                    | `true`                                                                                                                  |
| `x-app`                                                        | `cli`                                                                                                                   |
| `X-Stainless-*`                                                | Turli Stainless SDK sarlavhalari (til, paket versiyasi, OT, arxitektura va hokazo)                                      |

Aynan shu narsa so‘rovlarning yuqori oqimdagi WAF / mijozlar oq ro‘yxatidan o‘tishiga
imkon beradi.

---

## Muammolarni bartaraf etish

**`{"error":{"message":"unauthorized client detected, ..."}}`** — So‘rovingiz
Claude Code wire imageʼiga mos kelmadi. Bu provayder `anthropic-compatible-cc`
o‘rniga `openai-compatible-chat` sifatida sozlanganda yoki ishga tushirish vaqtida
`ENABLE_CC_COMPATIBLE_PROVIDER=true` bayrog‘i belgilanmaganda yuz beradi.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
“Yaroqsiz token”. Wire image to‘g‘ri, ammo API kaliti rad etildi. AgentRouter
boshqaruv panelida yangi kalit yarating va ulanishni yangilang.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter moderatsiya mexanizmi so‘rov mazmunini rad etdi yoki
kalit tarifi so‘ralgan modeldan foydalanishga ruxsat bermaydi. Boshqa prompt yoki
modelni sinab ko‘ring; zararsiz prompt muntazam ravishda bloklansa, AgentRouter
yordam xizmatiga murojaat qiling.

**Faqat ayrim modellarda `[400]: content-blocked`** — Aksariyat AgentRouter
tariflari faqat modellarning muayyan qismidan (masalan, `claude-opus-4-6`)
foydalanishga ruxsat beradi. Kalit yaroqli bo‘lsa ham, boshqa model IDʼlari
`unauthorized_client_error` qaytaradi. AgentRouter boshqaruv panelida tarifingiz
qaysi modellarni qamrab olishini tekshiring.

**omniroute jurnallarida `Invalid JSON response from provider (reset after Ns)`** —
Yuqori oqim JSON bo‘lmagan javob tanasini (odatda WAF qaytargan HTML xato sahifasini)
qaytardi. Bu, odatda, so‘rov AgentRouter backendiga umuman yetib bormaganini
anglatadi — provayder IDʼsi `anthropic-compatible-cc-` bilan boshlanishini qayta
tekshiring (oxiridagi tirega eʼtibor bering —
`open-sse/services/claudeCodeCompatible.ts` faylidagi
`CLAUDE_CODE_COMPATIBLE_PREFIX` ga qarang) va funksiya bayrog‘i yoqilganiga ishonch
hosil qiling.

**AgentRouter provayderi allaqachon mavjud bo‘lsa ham, `unauthorized client detected`
/ HTML xato sahifasi** — sizda, ehtimol, **bittadan ortiq** AgentRouter provayderi
mavjud va so‘rovingiz noto‘g‘ri provayderga tushmoqda. Agar `agentrouter` prefiksi
bilan qo‘lda yaratilgan eski `anthropic-compatible-*` (`cc` bo‘lmagan) yoki
`openai-compatible-chat-*` provayderi qolgan bo‘lsa, u
`agentrouter/<model>` model IDʼlarini egallashi mumkin (combolar ham unga tugun
IDʼsi orqali murojaat qilishi mumkin), natijada trafik to‘g‘ri wire image bilan
birga taqdim etiladigan ichki `agentrouter` provayderi o‘rniga o‘sha provayderga
yo‘naltiriladi — u esa umumiy User-Agent yuboradi va rad etiladi. Model aslida
qayerga yechilayotganini omniroute jurnallarida tekshiring (`ROUTING` tegi
`agentrouter/<model> → <providerId>/<model>` ni ko‘rsatadi); agar `<providerId>`
`agentrouter` bo‘lmasa, mahalliy provayderga birlashtiring: combolarni
`agentrouter/<model>` ga (providerId `agentrouter`) yo‘naltiring va takroriy
compatible provayderlarni o‘chirib tashlang. Mahalliy provayder uchun wire image
konfiguratsiyasi ham, `customUserAgent` ham kerak emas.

---

## Shuningdek qarang

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web provayderi integratsiyasi bo‘yicha qaydlar
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Bepul tarifli provayderlar
  katalogi
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire image amalga oshirilishi
