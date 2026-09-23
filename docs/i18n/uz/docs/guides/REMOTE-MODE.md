# Remote Mode (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute’ning oʻzi boshqa joyda (VPS, uy serveri yoki Tailnet’ingizdagi boshqa qurilmada) ishlayotgan paytda `omniroute` CLI’ni noutbukingizda ishga tushiring. Siz `omniroute connect` yordamida bir marta tizimga kirasiz va shundan keyin **har bir** CLI buyrugʻi oʻsha masofaviy serverga yoʻnaltiriladi — buyruqlar ham, chiqish natijalari ham bir xil, faqat masofaviy serverda bajariladi.

Oʻrnatish uchun ikkinchi vosita yoʻq: masofaviy rejim — bu odatiy `omniroute` CLI va qamrovi belgilangan **kirish tokenlari**.

```bash
npm install -g omniroute                 # odatiy CLI
omniroute connect 192.168.0.15           # tizimga kirish (parol → qamrovli token)
omniroute models list                    # ← endi MASOFAVIY server modellarini koʻrsatadi
omniroute configure codex                # ← masofaviy katalogdan mahalliy Codex profilini yaratadi
```

---

## Bu qanday ishlaydi

```
noutbukingiz                            masofaviy OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parol → token)            │
│  context: vps      │ ───────────────►  │ qamrovli kirish tokenini       │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ yaratadi; har bir boshqaruv     │
│ konfiguratsiyalarni│ ◄───────────────  │ yoʻnalishi token qamroviga     │
│ MAHALLIY yozadi    │                   │ muvofiq tekshiriladi            │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontekstlar** har biri bittadan serverni saqlaydi (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` faol serverni almashtiradi; `default` mahalliy serverdir.
- **Kirish tokenlari** (`oma_live_…`) boshqaruv buyruqlariga ruxsat beradi. Ular
  inference API kalitlaridan (`sk-…`, `/v1/chat/completions` uchun ishlatiladi) farq qiladi.
- Tokenning faqat SHA-256 xeshi server tomonida saqlanadi. Ochiq matn
  **faqat bir marta**, yaratilish vaqtida koʻrsatiladi.

---

## Ulanish

### Boshqaruv paroli bilan (dastlabki sozlash)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 uchun boshqaruv paroli: ********
# ✔ http://192.168.0.15:20128 manziliga ulandi — kontekst: '192.168.0.15' (qamrov: admin)
```

Parol orqali ulanish jarayoni standart holatda **admin** tokenini yaratadi (parol sizda ekan, demak
allaqachon toʻliq boshqaruvga egasiz). Qamrovni `--scope` bilan kamaytiring:

```bash
omniroute connect 192.168.0.15 --scope write
```

Parametrlar: `--port <p>` (host’da port koʻrsatilmagan boʻlsa), `--name <ctx>` (kontekst nomi),
`--scope read|write|admin`. Toʻliq URL oʻzgartirilmasdan ishlatiladi:
`omniroute connect https://omni.example.com`.

### Oldindan yaratilgan token bilan

Boshqaruv panelida (yoki `omniroute tokens create` yordamida) qamrovli token yarating va
uni kiriting — parol talab qilinmaydi:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI uni `GET /api/cli/whoami` orqali tekshiradi va faol kontekst sifatida saqlaydi.

---

## Qamrovlar

Ierarxik tuzilgan uchta daraja (`admin ⊃ write ⊃ read`):

| Qamrov  | Bajarishi mumkin                                                                        |
| ------- | --------------------------------------------------------------------------------------- |
| `read`  | roʻyxat/koʻrish — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | read **+** sozlash/qoʻllash — `setup-codex`, `keys add`, `config set`, kombinatsiyalar  |
| `admin` | write **+** boshqarish — `tokens` CRUD, provayderlar qoʻshish, xizmatlar, policy, oauth |

Server har bir yoʻnalish talab qiladigan qamrovni HTTP metodidan
(`GET`→read, oʻzgartirishlar→write) hamda maxfiy boʻlimlar uchun admin ruxsat roʻyxatidan
(`/api/cli/tokens`, `/api/providers` oʻzgartirishlari, `/api/oauth`, `/api/services`, …)
kelib chiqib aniqlaydi. Qamrovi yetarli boʻlmagan token aniq xabar bilan `403` javobini oladi.

> Jarayonlarni ishga tushiradigan yoʻnalishlar (`/api/services/*`, `/api/mcp/*`, …)
> **faqat loopback orqali** ishlaydi — qamrovidan qat’i nazar, masofaviy token ularga hech qachon kira olmaydi.

---

## Antigravity’ni masofaviy o‘rnatmaga ulash

Antigravity Google’ning firstparty/nativeapp rozilik ekranidan foydalanadi. Google
avtorizatsiya kodini faqat **qayta yo‘naltiruvchi loopback manzil**
(`http://127.0.0.1:<port>/callback`) **kirishni tasdiqlayotgan brauzerdan
ochiq bo‘lganda** beradi. Masofaviy VPS o‘rnatmasida bu loopback sizning
kompyuteringizda emas, serverda joylashadi, shu sababli rozilik ekrani **abadiy
qotib qoladi va hech qachon kod bermaydi** — odatiy «callback URL manzilini
joylashtirish» muqobil usulida joylashtirish uchun hech narsa bo‘lmaydi. (Bu
Google tomonidagi cheklov: xuddi shunday qotib qolish holati faqat OmniRoute’da
emas, balki o‘rnatilgan Antigravity ish stoli mijozidan foydalanadigan har qanday
proksida yuz beradi.)

Boshqaruv paneli buni muammoga duch kelishingizdan oldin aniqlaydi: localhost
bo‘lmagan manzildan **Providers → Antigravity → Connect** sahifasini ochsangiz,
«callback URL manzilini nusxalash» haqidagi umumiy bildirishnoma quyidagi ikkita
yechim bilan almashtiriladi va ularning har birida host hamda portingiz oldindan
to‘ldirilgan bo‘ladi. (LAN manzili ham shunday hisoblanadi — ushbu callback nuqtayi
nazaridan `192.168.x.x` localhost emas.)

Antigravity’ni masofaviy OmniRoute’ga ulashning qo‘llab-quvvatlanadigan ikkita usuli
mavjud.

### A variant — mahalliy kirish yordamchisi (tavsiya etiladi)

OAuth jarayonini `127.0.0.1` ochiq bo‘lgan **o‘z kompyuteringizda** ishga tushiring.
Yordamchi Google bilan bevosita aloqa qiladi, shu sababli rozilik jarayoni boshqaruv
panelidagi versiya yakunlay olmaydigan joyda muvaffaqiyatli tugaydi.

**Agar allaqachon ulangan bo‘lsangiz** (`omniroute connect <host>`), hech narsani
nusxalashingiz shart emas — yordamchi hisob ma’lumotini o‘sha o‘rnatmaga o‘zi
yetkazadi:

```bash
# MAHALLIY kompyuteringizda (Node.js va brauzer kerak):
omniroute connect 192.168.0.15        # bir marta — administrator doirasidagi kontekst tokenini yaratadi
npx omniroute login antigravity
#   ↳ Google rozilik sahifasini ochadi, callback’ni mahalliy loopback portida qabul qiladi,
#     uni almashtiradi va hisob ma’lumotini faol kontekstga POST orqali yuboradi:
#
#   Antigravity http://192.168.0.15:20128 manzilida ulandi (ulanish abc123).
#   Hech narsani joylashtirish shart emas — bu terminalni yopishingiz mumkin.
```

Faol kontekst boshqa kompyuterga yo‘naltirilganida yuborish avtomatik ravishda
amalga oshadi. Uni istalgan yo‘nalishda `--push` / `--no-push` yordamida majburan
belgilang yoki `--context <name>` orqali muayyan kontekstni ko‘rsating.

**Agar kompyuteringiz VPS’ga ulana olmasa** (fayervol bilan to‘silgan, SSH yo‘q yoki
tarmoqdan uzilgan ish joyi), yordamchi baribir ishlaydi — unga faqat Google
_kerak_. `--no-push` parametridan foydalaning yoki yuborish muvaffaqiyatsiz
tugashiga yo‘l qo‘ying: u siz yakunlagan avtorizatsiyani bekor qilish o‘rniga blob’ni
chiqarishga qaytadi.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Keyin **masofaviy** boshqaruv panelida **Providers → Antigravity → Connect**
bo‘limiga o‘ting va `omniroute-cred-v1.…` blob’ini **Step 2** maydoniga joylashtiring
(u callback URL manzilini ham, hisob ma’lumotlari blob’ini ham qabul qiladi).
OmniRoute uni dekodlaydi, Cloud Code dastlabki sozlash jarayonini server tomonida
bajaradi va ulanishni saqlab qoladi.

> Blob yangilash tokenini o‘z ichiga oladi — unga parol kabi munosabatda bo‘ling.
> Yuborish usulida u kontekstingizning autentifikatsiyalangan ulanishi orqali bir
> marta yuboriladi; joylashtirish usulida esa boshqaruv panelingiz ulanishi orqali
> yuboriladi. Har ikki holatda ham u saqlash vaqtida shifrlanadi va muvaffaqiyatli
> yuborilganda terminalingizda hech qachon ko‘rsatilmaydi.

Bayroqlar: `--no-browser` (avtomatik ochish o‘rniga URL manzilini chiqarish),
`--port <n>` (loopback portini belgilash), `--timeout <ms>`, `--push` /
`--no-push` (avtomatik yetkazib berish sozlamasini bekor qilish),
`--context <name>` (muayyan kontekstni tanlash).

### B variant — SSH local-forward tunneli

Agar VPS’ga SSH orqali kirish huquqingiz bo‘lsa, loopback callback tunnel orqali
serverga qaytib yo‘naltirilishi uchun boshqaruv paneli portini uzating:

```bash
# MAHALLIY kompyuteringizda:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# keyin MAHALLIY brauzeringizda http://localhost:20128 manzilini oching va Antigravity’ni
# odatdagidek ulang — endi 127.0.0.1:20128/callback qayta yo‘naltirishi VPS’ga SSH orqali yetib boradi.
```

Boshqaruv paneliga `localhost:20128` orqali kirganingiz sababli Google rozilik
jarayoni yakunlanadi va callback xuddi shu tunnel orqali serverga yetkaziladi —
blob kerak emas. Ulanish faol holatda ko‘rsatilguncha tunnelni ochiq saqlang.

Quyidagi qat’iy loopback’li provayderlardan farqli ravishda, bu yerda **bitta port
uzatishning o‘zi yetarli**: Antigravity callback boshqaruv panelining o‘z portidan
o‘tadi, shuning uchun provayderga xos ikkinchi portni tunnel orqali uzatish shart
emas.

> To‘liq brauzersiz muqobil usul sifatida (yordamchisiz va tunnelsiz) **o‘zingizning**
> Google OAuth veb hisob ma’lumotlaringizni hamda ommaviy asosiy URL manzilini
> sozlashingiz mumkin; provayderning OAuth muhit o‘zgaruvchilariga qarang.
> Yuqoridagi ikki variant Google’da hech qanday qo‘shimcha sozlashni talab qilmaydi.

---

## Codex / Grok’ni masofaviy o‘rnatishga ulash (qat’iy loopback provayderlari)

Codex, xAI (`xai-oauth`) va Grok CLI (`grok-cli`) o‘zlarining yuqori darajadagi OAuth ilovasida **qat’iy** loopback
`redirect_uri` manzilini ro‘yxatdan o‘tkazadi. OmniRoute uni o‘zgartira olmaydi — provayder
brauzerni har doim bir xil, kodga qat’iy kiritilgan manzilga qaytaradi:

| Provayder   | Provayder yo‘naltiradigan qat’iy callback manzili |
| ----------- | ------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`             |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                 |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                 |

Bu yerda `localhost` **brauzer ishlayotgan kompyuter**ni anglatadi, OmniRoute’ning PKCE
callback serveri esa **serverning** loopback interfeysida tinglaydi. Boshqaruv panelini
`http://192.168.0.15:20128` kabi LAN manzilida ochsangiz, ular hech qachon uchrashmaydi:
avtorizatsiya kodi o‘z noutbukingizdagi `localhost:1455` manziliga yetkaziladi, u yerda esa
hech narsa tinglamaydi va provayder hech qanday xatoni ko‘rsatmasdan tizimga kirishni
muvaffaqiyatsiz yakunlaydi.

Boshqaruv paneli popup oynasini ochishdan oldin buni aniqlaydi va tizimga kirishning
indamay muvaffaqiyatsiz tugashiga yo‘l qo‘yish o‘rniga tunnel buyrug‘ini ko‘rsatadi (#8046).

### Yechim — **ikkala** portni ham yo‘naltiring

```bash
# BRAUZER ishlayotgan kompyuterda:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# keyin http://localhost:20128 manzilini oching va Codex’ni shu yerdan ulang
```

Ikkita yo‘naltirish talab qilinadi va faqat bittasini yo‘naltirish hamon muvaffaqiyatsiz tugaydi:

- **`20128`** (boshqaruv paneli porti) origin’ni haqiqiy localhost qiladi, aynan shu
  OmniRoute’ning PKCE callback serverini umuman ishga tushirishiga sabab bo‘ladi — LAN origin
  bu tarmoqqa hech qachon yetib bormaydi.
- **`1455`** (provayderning qat’iy callback porti) — brauzer qaytarib yuboriladigan joy;
  u tunnel orqali serverning loopback interfeysigacha yetib borishi kerak.

xAI yoki Grok CLI’ni ulashda `1455` o‘rniga `56121`/`56122`ni, `20128` o‘rniga esa
boshqaruv panelingizning haqiqiy portini ishlating. Ulanish faol deb ko‘rsatilguncha
tunnelni ochiq saqlang.

> **SSH ruxsati yo‘qmi?** Codex va Grok CLI joylangan tokenni ham qabul qiladi — ulash
> dialogidagi **API kalitini joylash** / **auth.json faylini import qilish** yorlig‘i. Bu yo‘lda
> loopback callback mavjud emas, shuning uchun u istalgan origin’dan ishlaydi. Bundan tashqari,
> Codex oddiy access token yoki `~/.codex/auth.json` sessiya blobini ham qabul qiladi.

---

## Tokenlarni boshqarish

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ maxfiy qiymatni FAQAT BIR MARTA chiqaradi — uni hozir nusxalang
omniroute tokens list                 # niqoblangan: id, nom, qamrov, prefiks, holat, amal qilish muddati
omniroute tokens revoke <id|prefix>   # darhol bekor qilish
omniroute tokens scopes               # uchta qamrovni tushuntirish
```

`tokens` buyruqlari **admin** hisob ma’lumotini talab qiladi. Tokenlarni boshqaruv
panelidagi **Sozlamalar → Kirish tokenlari** bo‘limida ham boshqarishingiz mumkin
(yaratish, bekor qilish, bir marta nusxalash).

---

## Masofaviy katalogdan dasturlash CLI’sini sozlash

`omniroute configure` **faol serverning** joriy model katalogini o‘qiydi va
**sizning** kompyuteringizda konfiguratsiya yozadi.

```bash
omniroute configure codex
#   Provayderlar: glm, kmc, ollamacloud, opencode-go, …
#   Provayder: glm
#   Model identifikatori: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml fayliga yozildi
#   Foydalanish:  codex --profile glm52

# interaktiv bo‘lmagan
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# tez-tez ishlatiladigan modelni interaktiv tanlagichning yuqorisida saqlash
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Tanlagich mahalliy `model-preferences.json` faylida faqat model identifikatorlarini
(URL yoki hisob ma’lumotlarini hech qachon emas) saqlaydi va ularni kontekst hamda CLI
maqsadi bo‘yicha ajratadi. Sevimlilar so‘nggi tanlovlardan oldin ko‘rsatiladi; tanlangan
modelni shu kontekst/maqsad ro‘yxatidan olib tashlash uchun `--unfavorite`dan foydalaning.

Yozilgan profil inference kalitiga env var orqali murojaat qiladi
(`OMNIROUTE_API_KEY`) — maxfiy qiymat hech qachon diskka yozilmaydi. Codex’ni bir martalik
asosiy sozlash (`[model_providers.omniroute]` bloki) uchun
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) fayliga qarang.

### Masofaviy serverga qarshi CLI’ni ishga tushirish (konfiguratsiya yozilmaydi)

`omniroute run <target>` ham faol kontekstni hisobga oladi: masofaviy asosiy URL
va kontekst hisob ma’lumoti faqat ishga tushirilgan jarayonga kiritiladi.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → masofaviy server
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Aynan nima ishga tushirilishini oldindan ko‘rish (faqat env KALIT NOMLARI, qiymatlar hech qachon emas):
omniroute run codex --dry-run --json
```

Maqsadlar: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(yagona manba: `bin/cli/cli-manifest.mjs`). Qwen va Gemini chiqishda o‘chirib
tashlanadigan vaqtinchalik izolyatsiyalangan home bilan ishlaydi, shuning uchun ishga
tushirish shaxsiy vosita konfiguratsiyangizga hech qachon tegmaydi yoki unga ma’lumot
sizib chiqarmaydi.

### Har bir CLI uchun sozlash buyruqlari

Qo‘llab-quvvatlanadigan har bir CLI masofaviy serverni hisobga oluvchi sozlash
buyrug‘iga ega (barchasi faol kontekstni yoki `--remote <url> --api-key <key>`ni
hisobga oladi):

| CLI         | Buyruq                     | Nimalarni yozadi                                                                                                                                                                           |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profillari (har bir model uchun)                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (har bir model uchun)                                                                                                                            |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — katalogdagi barcha modellarga ega OpenAI bilan mos `omniroute` provayderi (`opencode -m omniroute/<model>` buyrugʻini ishga tushiring)                |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI rejimi) + joylashtirish uchun VS Code kengaytmasi sozlamalarini chiqaradi (OpenAI bilan mos, asosiy URL `/v1`siz)                          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` sozlamalari — OpenAI bilan mos, asosiy URL `/v1` bilan                                                                        |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` `/v1` bilan, kalit `${{ secrets.OMNIROUTE_API_KEY }}` orqali                                      |
| Cursor      | `omniroute setup-cursor`   | ilova ichidagi bosqichlarni chiqaradi (Settings → Models → Override OpenAI Base URL `/v1` bilan + kalit + model). Cursor konfiguratsiyasi yopiq SQLite formatida — faqat chat paneli       |
| Roo Code    | `omniroute setup-roo`      | Roo import JSON faylini (`~/.omniroute/roo-settings.json`) yozadi + `roo-cline.autoImportSettingsPath`ni oʻrnatadi + UI bosqichlarini chiqaradi (OpenAI bilan mos, asosiy URL `/v1` bilan) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` provayderi, `base_url` `/v1` bilan, kalit `$OMNIROUTE_API_KEY` orqali                                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` `/v1`siz + `GOOSE_MODEL`) + muhit sozlamalari retsepti                                                              |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` `/v1`siz + `model: openai/<id>`) + muhit sozlamalari retsepti (`aider --message --yes`)                                                             |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` faylidagi V4 `modelProviders.openai` yozuvi + `~/.qwen/.env` ichidagi `OMNIROUTE_API_KEY`                                                                          |

```bash
# OpenCode (OpenAI bilan mos provayder, katalogdagi barcha modellar, masofaviy VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # faqat mos keluvchi modellarni saqlang
opencode -m omniroute/glm/glm-5.2 "..."          # avval OMNIROUTE_API_KEY qiymatini eksport qiling
```

> OpenCode yanada keng imkoniyatli **plagin** integratsiyasiga ham ega: `omniroute setup opencode`
> (endi `--remote` orqali masofaviy rejimni qoʻllab-quvvatlaydi) `@omniroute/opencode-plugin`ni oʻrnatadi.
> `setup-opencode` — OpenAI bilan mos yengil muqobil. API kalitiga
> `{env:OMNIROUTE_API_KEY}` orqali murojaat qilinadi — u hech qachon diskka yozilmaydi.
>
> OpenCode v2 da uning oʻrniga `@omniroute/opencode-plugin-v2`dan foydalaning: katalog bir xil,
> ammo yuklovchi shartnomasi boshqacha. Integratsiya ulanganda u kalitni OpenCode’ning oʻz hisob maʼlumotlari
> omboridan oʻqiydi, shuning uchun masofaviy shlyuzga `opencode.json` ichida umuman kalit kerak emas.

---

## Kontekstlarni boshqarish (serverlar oʻrtasida almashish)

**Kontekst** — saqlangan server (baseUrl + hisob maʼlumotlari + qamrov). `omniroute connect`
kontekst yaratadi va uni faol holatga keltiradi; shundan keyin har bir buyruq shu serverga yoʻnaltiriladi. Ularni
`omniroute contexts` yordamida boshqaring va ular oʻrtasida almashing:

```bash
omniroute contexts list            # barcha kontekstlar; faol kontekst ● bilan belgilangan
omniroute contexts current         # faol server, autentifikatsiya holati, qamrov
```

```text
  | Nomi    | Asosiy URL                | Autent. | Qamrov | Tavsif
● | vps     | http://100.67.86.91:20128 | token   | admin  | Masofaviy OmniRoute (…)
  | default | http://localhost:20128    | ✗       |        |
```

**Serverlarni almashtirish** — keyingi barcha buyruqlar faol kontekstga yoʻnaltiriladi:

```bash
omniroute contexts use vps         # → endi barcha buyruqlar masofaviy VPSga yuboriladi
omniroute tokens list              #   (VPSga nisbatan bajariladi)

omniroute contexts use default     # → localhostga qaytish
omniroute tokens list              #   (mahalliy serverga nisbatan bajariladi)
```

**Kontekstni qoʻlda qoʻshish** (`connect` oʻrniga), tekshirish yoki nomini oʻzgartirish:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # bitta kontekstning toʻliq tafsilotlari
omniroute contexts rename staging stg
```

**Kontekstni olib tashlash** — tasdiqlashni soʻraydi; uni oʻtkazib yuborish uchun `--yes` parametrini
uzating (skriptlar / nointeraktiv qobiqlar uchun talab qilinadi, aks holda ular xavfsiz tarzda rad etadi):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kontekstini olib tashlab boʻlmaydi. Faol kontekst olib tashlansa,
> `default` kontekstiga qaytiladi. Maslahat: kontekstni olib tashlash faqat **mahalliy** saqlangan hisob maʼlumotlarini oʻchiradi —
> kirish imkoniyatini amalda bekor qilish uchun serverdagi tokenni `omniroute tokens revoke <id>` yordamida
> bekor qiling.

Kontekstlarni **eksport / import qilish** (masalan, ularni kompyuterlar oʻrtasida koʻchirish uchun). OS
kalitlar zanjiri mavjud boʻlsa, yangi kontekstlarda faqat kalitlar zanjiriga havola saqlanadi; hisob maʼlumotlari eksportga koʻchirilmaydi:

```bash
omniroute contexts export --out contexts.json     # standart: stdout
omniroute contexts import contexts.json            # ustiga yozish; mavjudlarini saqlash uchun --merge
omniroute contexts migrate --yes                  # eski ochiq matnli tokenlarni kalitlar zanjiriga koʻchirish
```

Foydalanish mumkin boʻlgan OS kalitlar zanjiri mavjud boʻlmagan monitor va interfeyssiz tizimlarda CLI
`0600` rejimidagi `config.json` fayliga qaytadi va bir martalik ogohlantirishni chiqaradi. Ushbu
zaxira usul orqali olingan eksportlarga (va migratsiyadan oldingi har qanday eski konfiguratsiyaga) maxfiy maʼlumot sifatida munosabatda boʻling.

---

## Tezkor boshidan oxirigacha tekshiruv

Masofaviy sozlamani boshidan tekshirish uchun nusxalab qoʻyish mumkin boʻlgan toʻliq jarayon — ulanish, muayyan
qamrovli token yaratish, buyruqni yoʻnaltirish, ortga qaytish va sozlamalarni olib tashlash.
`192.168.0.15` oʻrniga serveringiz hosti/IP manzilini (Tailscale, LAN yoki ommaviy
`https://…` URL) kiriting.

```bash
# 1. Ulanish (parol → admin tokeni, faol holatga keladigan kontekst sifatida saqlanadi)
omniroute connect 192.168.0.15                 # yoki: --key oma_live_xxxx  (parolsiz)
omniroute contexts current                     # masofaviy server + qamrovni koʻrsatadi

# 2. Undan foydalanish — endi boshqaruv buyruqlari masofaviy serverga nisbatan bajariladi
omniroute tokens create --name laptop --scope read   # qamrovi torroq token yaratish
omniroute tokens list                                 # masofaviy serverdan niqoblangan roʻyxat

# 3. Oldinga va ortga almashish
omniroute contexts use default                 # → mahalliy
omniroute contexts use 192-168-0-15            # → yana masofaviy (`contexts list`dagi nom)

# 4. Olib tashlash. ESLATMA: `contexts remove` faqat MAHALLIY hisob maʼlumotlarini oʻchiradi —
#    u serverdagi tokenni bekor QILMAYDI. Kirish imkoniyatini amalda bekor qilmoqchi boʻlsangiz,
#    avval uni server tomonida bekor qiling.
omniroute tokens revoke <id|prefix>            # serverdagi kirish imkoniyatini bekor qiladi
omniroute contexts remove 192-168-0-15 --yes   # mahalliy kontekstni olib tashlaydi (faol boʻlsa ham → defaultga qaytadi), soʻrov chiqarmaydi
```

> `--yes` parametri `contexts remove` buyrugʻini nointeraktiv qiladi (skriptlar/CI uchun talab qilinadi; usiz
> nointeraktiv qobiq qotib qolish oʻrniga xavfsiz tarzda rad etadi). **Faol** kontekst olib tashlansa,
> avtomatik ravishda `default` kontekstiga qaytiladi.

---

## Xavfsizlik bo‘yicha eslatmalar

- Tokenning ochiq matni bir marta ko‘rsatiladi; faqat SHA-256 xeshi saqlanadi (API kalitlari kabi).
- `omniroute connect` tizimga kirishda takroriy parol urinishlariga qarshi bloklash va audit jurnalini yuritish mexanizmlaridan foydalanadi.
- Uzatish uchun HTTPS yoki Tailnet’dan foydalanish tavsiya etiladi; faqat xost ko‘rsatilsa, LAN/Tailscale’da foydalanishni qulaylashtirish uchun birlamchi qiymat sifatida `http://` qo‘llanadi — TLS uchun to‘liq `https://…` URL manzilini kiriting.
- Afzal ko‘riladigan lokal kontekst fayli `~/.omniroute/config.json` (`chmod 600`) bo‘lib, u faqat `credentialRef` qiymatini o‘z ichiga oladi; tokenning o‘zi OT kalitlar omborida (`keytar`) saqlanadi va hech qachon jurnallarda chop etilmaydi. Ishlaydigan mahalliy kalitlar ombori mavjud bo‘lmagan interfeyssiz o‘rnatishlar aniq zaxira varianti sifatida o‘sha `0600` faylidan foydalanadi va bir marta ogohlantirish chiqaradi. Kalitlar ombori backend’i o‘rnatilgandan keyin `omniroute contexts migrate --yes` buyrug‘idan foydalaning.

---

## API endpointlari (ma’lumotnoma)

| Usul   | Yo‘nalish             | Autentifikatsiya | Ruxsat doirasi                      |
| ------ | --------------------- | ---------------- | ----------------------------------- |
| POST   | `/api/cli/connect`    | boshqaruv paroli | — (ochiq, parol bilan himoyalangan) |
| GET    | `/api/cli/whoami`     | kirish tokeni    | o‘qish                              |
| GET    | `/api/cli/tokens`     | kirish tokeni    | administrator                       |
| POST   | `/api/cli/tokens`     | kirish tokeni    | administrator                       |
| DELETE | `/api/cli/tokens/:id` | kirish tokeni    | administrator                       |

To‘liq sxemalar uchun [openapi.yaml](../openapi.yaml) fayliga qarang.
