# ACP registry and registered CLI launchers (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI aniqlash**, **mahalliy Agent Client Protocol** va
**eskirgan stdio adapterlari**ni bir-biridan ajratadi. Oʻrnatilgan bajariladigan faylning topilishi uning
autentifikatsiyasi, model bilan mosligi yoki soʻrovni qayta ishlashga tayyorligini isbotlamaydi.

Boshqaruv paneli inventarizatsiya va maxsus agentlarni roʻyxatdan oʻtkazish uchun
`GET /api/acp/agents` va `POST /api/acp/agents` dan foydalanadi. Bular faqat mahalliy boshqaruv
marshrutlari boʻlib, jarayonlarni ishga tushirish yoki soʻrovlarni yuborish uchun moʻljallangan
ommaviy API emas. Ichki `AcpManager` avtomatik ravishda HTTP provayderining zaxira variantiga aylanmaydi.

## Roʻyxatdan oʻtkazilgan shartnomalar

`config/cli-tools-manifest.json` ichki ishga tushirish
bajariladigan fayllari, argumentlari va backend rejimlari uchun asosiy ishonchli manbadir. Reestr oʻz taʼriflarini
shu manifestdan hosil qiladi. Aniqlash natijasi 60 soniya davomida keshda saqlanadi.

- `acp`: Gemini shartnomasi `gemini --experimental-acp` ni ishga tushiradi va
  rasmiy TypeScript SDK orqali yangi qatorlar bilan ajratilgan ACP JSON-RPC yordamida aloqa qiladi.
- `stdio-adapter`: boshqa roʻyxatdan oʻtkazilgan shartnomalar eski yangi-qatorli kirish,
  stdout-chiqish adapteridan foydalanishda davom etadi. Chiqishda ikki soniya davomida faollik boʻlmasa, javob yakunlanadi.
  Bu adapter ushbu CLI vositalari uchun mahalliy ACP qoʻllab-quvvatlanishini **tasdiqlamaydi**.

Gemini ishga tushirish bayrogʻini oʻzining [CLI maʼlumotnomasida](https://geminicli.com/docs/cli/cli-reference/)
hujjatlashtiradi. Mijoz initsializatsiya, sessiya yaratish, soʻrov yuborish, bildirishnomalar va bekor qilish uchun
[rasmiy ACP SDK](https://github.com/agentclientprotocol/typescript-sdk) dan foydalanadi.

Maxsus agent taʼriflari administrator tomonidan boshqariladigan ishga tushirish shartnomalari boʻlib qoladi.
Bajariladigan fayl va argumentlarni roʻyxatdan oʻtkazish ushbu jarayonga server foydalanuvchisining mahalliy
bajarish huquqlarini beradi; roʻyxatdan oʻtkazish sandbox emas. Versiyani tekshirish soʻrovlari
faqat roʻyxatdan oʻtkazilgan bajariladigan fayl va tan olingan versiya bayrogʻini qabul qiladi.

## Ichki ishga tushirish API si

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Faqat ushbu agentga ataylab biriktirilgan provayder oʻzgaruvchilarini uzating.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Javobdan chaqiruvchi ilovada foydalaning.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` bajariladigan fayl va argumentlarni roʻyxatdan oʻtkazilgan
taʼrifdan aniqlaydi. Chaqiruvchi uchun mavjud yagona parametrlar `cwd` va `env`; eski
`spawn(agentId, binary, args, env)` signaturasi va bajariladigan faylni almashtirishlar
rad etiladi. HTTP ishga tushirish shartnomalari ushbu menejer tomonidan qoʻllab-quvvatlanmaydi.

Quyi jarayon CLI ishga tushirgichlari bilan bir xil operatsion tizim, terminal, lokal va sertifikatlarning
ruxsat etilgan roʻyxatini meros qilib oladi. Server/provayder sirlari ota-jarayon muhitidan
koʻchirilmaydi. Tanlangan CLI uchun zarur hisob maʼlumotlari aniq tarzda uzatilishi
yoki shu CLI vositasining oʻz mahalliy autentifikatsiyasi orqali taqdim etilishi kerak. Quyi jarayon
mahalliy foydalanuvchining fayl tizimi ruxsatlariga ega boʻlib qoladi va oʻz konfiguratsiyasini oʻqishi mumkin.

## Mahalliy hayot sikli va cheklovlar

1. Roʻyxatdan oʻtkazilgan bajariladigan faylni ishga tushiring, ACP ni initsializatsiya qiling va tanlangan
   ishchi katalogga biriktirilgan sessiya yarating. Initsializatsiya uchun oʻn soniyalik cheklov mavjud.
2. Soʻrov yuboring va faqat shu sessiyaga tegishli matnli bildirishnomalarni toʻplang.
   Yakunlanish stdout jimligi davri emas, balki soʻrov RPC javobidir.
3. Tugallanmagan initsializatsiyani ham oʻz ichiga oluvchi yagona soʻrov muddatidan foydalaning; standart
   muddat 120 soniya. Bir jarayonda bir vaqtda bir nechta soʻrov bajarilishi rad etiladi.
4. Mahalliy vaqt tugaganda `session/cancel` ni yuborishga urining va jarayonni tugating.
   Cheklangan 100 ms oraliq tugatishdan oldin bildirishnomaning chiqarib yuborilishiga imkon beradi.
5. Initsializatsiya muvaffaqiyatsiz tugaganda, ulanish yopilganda, jarayon yakunlanganda yoki
   chaqiruvchi uni tugatganda transport holatini yoping va sessiyani olib tashlang.

Vosita ruxsati soʻrovlari rad etiladi. Hech qanday fayl tizimi yoki terminal mijoz
imkoniyatlari eʼlon qilinmaydi. Bu cheklovlar quyi bajariladigan faylning oʻzini sandbox qilmaydi
yoki CLI vositasining oʻz avtorizatsiya sozlamalarini almashtirmaydi.

Mahalliy matn hamda eski stdout/stderr koʻpi bilan 1 MiB belgini saqlab qoladi,
bunda eng yangi chiqish qisqartirish haqidagi bildirishnoma bilan saqlanadi. Alohida mahalliy sim
freymi SDK tomonidan tahlil qilinishidan oldin 2 MiB bayt bilan cheklanadi. Buferlar har bir soʻrov uchun qayta tiklanadi.

`kill(sessionId)` SIGTERM yuboradi, soʻngra jarayon besh soniyadan keyin
ham yakunlanmagan boʻlsa, SIGKILL yuboradi. Eski soʻrovning vaqti tugashi tinglovchilar va taymerlarni
boʻshatadi, ammo sessiyani boshqa soʻrov uchun mavjud holda qoldiradi; ish tugagach
`kill()` yoki `killAll()` ni chaqirish uchun chaqiruvchilar javobgar boʻlib qoladi.

## Hodisalar va tekshirish

Menejer `stdout`, `stderr` va `exit` hodisalarini chiqaradi, ularning har birida `sessionId` mavjud.
`sessionError` tozalangan transport xatosi haqida xabar beradi. Moslik uchun moʻljallangan `error`
hodisasi faqat uning obunachisi mavjud boʻlganda chiqariladi, shuning uchun bajariladigan faylning yoʻqligi
qayta ishlanmagan EventEmitter xatosini keltirib chiqara olmaydi.

- `getSession(sessionId)` boshqariladigan sessiyani yoki `undefined` ni qaytaradi.
- `getActiveSessions()` toʻxtatilgan yoki toʻxtatilayotgan sessiyalarni hisobga olmaydi.
- `sendInput(sessionId, input)` faqat faol eski adapter uchun mavjud;
  mahalliy ACP oʻzining JSON-RPC oqimini himoya qilish uchun xom kirishni rad etadi.
- `killAll()` ushbu nusxa tomonidan boshqariladigan barcha sessiyalarni tugatadi.

## Validatsiya chegaralari

Deterministik sinov moslamalari mahalliy kelishuv jarayoni, matnli chiqish, rad etilgan
ruxsatlar, bekor qilish, bir vaqtdagi soʻrovlar, muvaffaqiyatsiz initsializatsiya, jarayonning
yakunlanishi, chiqish cheklovlari va sirlarning izolyatsiyasini qamrab oladi. Mavjud eski bufer/tinglovchi
regressiyalari ham qamrab olingan. Bu testlar amaldagi Gemini tizimiga kirish yoki provayder orqali
muvaffaqiyatli inferensiyani namoyish etmaydi; bular maqsadli muhitda alohida avtorizatsiya qilingan smoke
testini talab qiladi.

## Tegishli hujjatlar

- [Agent protokollari](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI ishga tushirish shartnomalari](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI vositalari](../reference/CLI-TOOLS.md)
- [A2A serveri](./A2A-SERVER.md)
- [Bulut agentlari](./CLOUD_AGENT.md)
