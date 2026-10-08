# Cursor Image Generation (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute Cursor rejasidagi **tasvir yaratish** imkoniyatini chat bilan bir xil provayder identifikatori — `cursor` (`cu` taxallusi) orqali `POST /v1/images/generations` manzilida taqdim etadi.

| Maydon                           | Qiymat                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` identifikatori | `cursor`                                                                                    |
| Format                           | `cursor-agent-image`                                                                        |
| Autentifikatsiya                 | Chat bilan bir xil OAuth / API kaliti ulanishi (`provider_connections.provider = "cursor"`) |
| Modellar                         | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Nega Agent CLI ishlatiladi

OmniRoute'dagi Cursor chati `agent.v1.AgentService/Run` (protobuf) dan foydalanadi. Ushbu yoʻl ichki mijoz vositalarini (shell, write, …) **rad etadi**. Tasvir yaratish — foydalanuvchi oʻrni hisobidan **`agent` CLI** tomonidan bajariladigan Cursor'ning ichki vositasi. Shu sababli tasvir ishlovchisi qulflangan prompt va har bir soʻrov uchun vaqtinchalik ish maydoni bilan `agent` jarayonini ishga tushiradi (hamjamiyatdagi foydalanuvchi oʻrni koʻpriklari bilan bir xil shaklda), soʻng OpenAI bilan mos `b64_json` qaytaradi.

## Kirishni cheklash (Qatʼiy qoidalar #15 + #17)

Bu yordamchi jarayonni (`agent` binar faylini) ishga tushiradigan yagona `IMAGE_PROVIDERS`
formatidir. `POST /v1/images/generations` masofaviy chaqiruvchilar qonuniy ravishda
foydalanadigan, jarayon ishga tushirmaydigan yana taxminan 40 ta tasvir provayderi tomonidan
birgalikda ishlatilgani sababli, butun yoʻnalish `LOCAL_ONLY` sifatida **tasniflanmaydi** —
buning oʻrniga `handleCursorAgentImageGeneration` autentifikatsiya va avtorizatsiya konveyeri
har bir soʻrovga biriktiradigan ishonchli `AUTHZ_HEADER_PEER_LOCALITY` hukmidan foydalanib,
oʻz kirish nazoratini qoʻllaydi (soxtalashtirilishi mumkin boʻlgan `Host` sarlavhasidan emas,
haqiqiy TCP tugunidan olinadi): faqat `loopback` va `lan` chaqiruvchilari jarayonni ishga
tushirish bosqichiga yetib bora oladi; qolgan barcha chaqiruvchilar (jumladan, sizib chiqqan
API kalitini ommaviy tunnel orqali qayta ishlatganlar) hisob maʼlumotlarini qidirish yoki
jarayonni ishga tushirishdan oldin `403` javobini oladi. `LOCAL_ONLY` darajasining qolgan
qismiga qoʻllanadigan ayni siyosat uchun `src/server/authz/policies/management.ts` fayliga
qarang.

## Parallel ishlash cheklovi modul darajasida (bitta instans cheklovi)

`CURSOR_IMG_MAX_CONCURRENT` Node moduli instansiga taalluqli xotiradagi hisoblagich/navbat
orqali qoʻllanadi (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
U bitta OmniRoute jarayoni ichida parallel `agent` ishga tushirishlarini toʻgʻri cheklaydi,
ammo bir xil Cursor foydalanuvchi oʻrnidan foydalanadigan bir nechta jarayon/instanslar
orasida muvofiqlashtirishni amalga oshirmaydi (masalan, bir nechta replika bilan joylashtirishda)
— har bir instans oʻzining mustaqil cheklovini qoʻllaydi. Bitta instansli joylashtirish
(standart holat) uchun bu aniq ishlaydi; gorizontal masshtablangan joylashtirishlarda har
bir instans uchun `CURSOR_IMG_MAX_CONCURRENT` ehtiyotkorlik bilan past qiymatda saqlanishi
yoki Cursor tasvir trafigi bitta instansga yoʻnaltirilishi kerak.

## Talablar

1. Boshqaruv panelida ulangan Cursor hisobi (OAuth yoki `crsr_…` API kaliti).
2. OmniRoute jarayoni uchun mavjud Cursor Agent binar fayli:
   - `CURSOR_AGENT_BIN=/path/to/agent` muhit oʻzgaruvchisi, yoki
   - `~/.local/bin/agent`, yoki
   - Cursor ulanishidagi `providerSpecificData.agentBin`.

Ixtiyoriy sozlash:

| Muhit oʻzgaruvchisi         | Standart qiymat          | Maʼnosi                                                    |
| --------------------------- | ------------------------ | ---------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Har bir tasvir uchun umumiy vaqt chegarasi                 |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Umumiy foydalanuvchi oʻrni uchun parallel ishlash cheklovi |
| `CURSOR_IMG_MODEL`          | (soʻrov modeli / `auto`) | CLI `--model` qiymatini almashtirish                       |

## Misol

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Yaratish odatda 1–2 daqiqa davom etadi. Ichki tarmoq yoʻlidan foydalanish tavsiya etiladi; taxminan 100 soniyalik taym-autga ega chekka proksilar muvaffaqiyatsiz yakunlanadi.

## LiteLLM

Tasvir modelini `mode: image_generation`, `api_base: http://omniroute:20128/v1` va `model: openai/cursor/auto` (yoki LiteLLM versiyangizga qarab prefikssiz `cursor/auto`) bilan roʻyxatdan oʻtkazing.
