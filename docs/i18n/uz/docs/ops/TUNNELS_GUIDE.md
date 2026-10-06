# Tunnels Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Haqiqiy manba:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Oxirgi yangilangan sana:** 2026-06-28 — v3.8.40

OmniRoute o‘zining lokal serverini (`http://localhost:20128`) uchta tunnel
bekendi orqali ochiq internetga taqdim etishi mumkin. Bu quyidagilar uchun foydali:

- Ochiq internetdan kirish mumkin bo‘lgan qayta yo‘naltirish URL manzilini talab
  qiladigan bulut provayderlarining (Antigravity, Gemini, Cursor) OAuth chaqiruvlari.
- VM joylashtirmasdan lokal instansiyangizni jamoadoshlaringiz bilan ulashish.
- Mobil, masofaviy yoki turli tarmoqlar orasidagi sinovlar.

Har uchala bekend jarayon ichida boshqariladi — OmniRoute asosiy binar fayl yoki
SDK’ni boshqaruv paneli yoxud REST API orqali ishga tushiradi/to‘xtatadi.
Reverse-proxy yoki systemd sozlamalari talab qilinmaydi.

## Bekendlar haqida qisqacha

| Bekend                      | Doimiylik                                                | Narx                            | Sozlash                                                             |
| --------------------------- | -------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Vaqtinchalik (har qayta ishga tushirishda URL o‘zgaradi) | Bepul                           | Talab qilinmaydi — `cloudflared` avtomatik o‘rnatiladi              |
| **ngrok**                   | Pullik tarif yoki doimiy domen sozlanganida barqaror     | Bepul tarif + pullik            | ngrok hisobi + authtoken talab qilinadi                             |
| **Tailscale Funnel**        | Tailnet ichidagi har bir tugun uchun barqaror            | Shaxsiy foydalanish uchun bepul | Tailscale o‘rnatilishi + tizimga kirish + Funnel ACL talab qilinadi |

Amalga oshirishlar `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` va `src/lib/tailscaleTunnel.ts` fayllarida joylashgan.
Har uchalasi `phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl` va
`lastError` maydonlariga ega umumiy shakldagi `status` obyektini qaytaradi, shu
sababli boshqaruv paneli ularni bir xil ko‘rinishda namoyish qilishi mumkin.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` `cloudflared`ni ichki jarayon sifatida ishga
tushiradi. U nomlangan tunnel konfiguratsiyasi taqdim etilgan-etilmaganiga qarab
tanlanadigan ikkita rejimni qo‘llab-quvvatlaydi:

- **Tezkor tunnel (standart).** `cloudflared tunnel --url
http://localhost:<apiPort>` buyrug‘ini ishga tushiradi va tayinlangan
  `*.trycloudflare.com` URL manzilini stdout’dan ajratib oladi. URL manzillar
  vaqtinchalik bo‘lib, har bir qayta ishga tushirishda o‘zgaradi.
- **Nomlangan tunnel (ixtiyoriy).** `CLOUDFLARED_CONFIG` lokal tarzda
  boshqariladigan cloudflared `config.yml` fayliga ishora qilsa, OmniRoute
  `cloudflared tunnel --no-autoupdate --config <path> run` buyrug‘ini ishga
  tushiradi va sizga **barqaror, nomlangan xost nomi** beradi. Konfiguratsiya
  tunnel UUID’si, `credentials-file` va `ingress` marshrutlashini taqdim etadi,
  shu sababli `--url` uzatilmaydi va Zero Trust boshqaruv paneli tokeni talab
  qilinmaydi. `run` hisob ma’lumotlarini konfiguratsiyadagi mutlaq
  `credentials-file` yo‘lidan o‘qiydi — `cert.pem` talab qilinmaydi (u faqat
  tunnelning hayotiy siklini boshqarish uchun ishlatiladi).

Asosiy xatti-harakatlar:

- **Avtomatik o‘rnatish.** Birinchi foydalanishda OmniRoute eng so‘nggi
  `cloudflared` binar faylini rasmiy GitHub relizlaridan yuklab oladi
  (boshqariladigan o‘rnatish `DATA_DIR/cloudflared/` ostida joylashadi).
  Yuklab olingan artefaktning SHA256 qiymati ishga tushirishdan oldin reliz
  manifesti bilan solishtirib tekshiriladi.
- **Jarayonni nazorat qilish.** Boshqaruv paneli sahifa qayta yuklanganidan keyin
  holatni tiklashi uchun cloudflared PID’i va aniqlangan URL
  `quick-tunnel-state.json` fayliga saqlanadi.

### Nomlangan tunnelni sozlash (barqaror xost nomi)

1. cloudflared CLI yordamida lokal boshqariladigan tunnel yarating (bir marta):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Xost nomingizni OmniRoute’ning lokal API portiga (standart qiymat 20128)
   yo‘naltiruvchi `~/.cloudflared/config.yml` faylini yarating:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute’ni konfiguratsiyaga yo‘naltiring va tunnelni (qayta) ishga tushiring:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # ixtiyoriy — OmniRoute xabar qiladigan xost nomini almashtiradi; aks holda
   # konfiguratsiyaning birinchi ingress qoidasidan o‘qiladi:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Tunnelni tezkor tunnel kabi yoqing (quyidagi REST / boshqaruv paneli / CLI
   orqali). Nomlangan tunnel ajratib olish uchun ochiq URL chiqarmaydi, shu
   sababli tayyorlik cloudflared’ning ro‘yxatdan o‘tgan chekka ulanishi orqali
   aniqlanadi, `publicUrl`/`apiUrl` esa `CLOUDFLARED_HOSTNAME` (yoki
   konfiguratsiyadagi birinchi ingress xost nomi) asosida xabar qilinadi.

### REST orqali yoqish / o‘chirish

Endpoint alohida `start`/`stop` yo‘llari o‘rniga
`{action: "enable" | "disable"}` tanasidan foydalanadi. Boshqaruv
autentifikatsiyasi (administrator seansi yoki administrator API kaliti) talab
qilinadi.

```bash
# Yoqish
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Holat
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# O‘chirish
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Yoki boshqaruv paneli orqali: **Settings → Tunnels → Cloudflare**.

### Ixtiyoriy muhit o‘zgaruvchilari

| Oʻzgaruvchi                                          | Maqsadi                                                                                                                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Binar fayl yoʻlini almashtiradi. Agar belgilangan va yaroqli boʻlsa, OmniRoute uni yuklab olish oʻrniga ishlatadi.                                                                           |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transport protokoli (standart qiymat: `http2`; shuningdek, `quic`, `auto`).                                                                                                                  |
| `CLOUDFLARED_CONFIG`                                 | Mahalliy boshqariladigan cloudflared `config.yml` fayliga yoʻl. Belgilanganda, OmniRoute tezkor tunnel oʻrniga **nomlangan/doimiy** tunnelni (`tunnel --config <path> run`) ishga tushiradi. |
| `CLOUDFLARED_HOSTNAME`                               | Nomlangan tunnel xabar qiladigan ochiq host nomini almashtiradi (masalan, `ai.example.com`). Belgilanmagan boʻlsa, konfiguratsiyadagi birinchi `ingress` host nomidan oʻqiladi.              |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK** dan foydalanadi (jarayon ichida, CLI quyi jarayonisiz). Oldindan yigʻilgan ikkilik fayllari mavjud boʻlmagan platformalarda ilova ishga tushish vaqtida buzilmasligi uchun mahalliy modul birinchi ishga tushirishda kechiktirib import qilinadi.

### Dastlabki talablar

1. <https://ngrok.com> saytida roʻyxatdan oʻting.
2. ngrok boshqaruv panelidan authtoken’ingizni nusxalang.
3. Uni quyidagi usullardan biri orqali taqdim eting:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, yoki
   - Boshqaruv paneli: **Settings → Tunnels → ngrok**, yoki
   - REST soʻrov tanasi (bir martalik): `{"action":"enable","authToken":"<token>"}`.

Agar hech biri sozlanmagan boʻlsa, holat `phase: "needs_auth"` qiymatini qaytaradi.

### REST orqali yoqish / oʻchirish

```bash
# Yoqish (env dagi NGROK_AUTHTOKEN dan foydalanadi)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Tokenni bevosita ko‘rsatib yoqish
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Holat
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# O‘chirish
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Javob tayinlangan `publicUrl` ni oʻz ichiga oladi (masalan,
`https://abcd-1234.ngrok-free.app`). Maxsus domenlar, hududlar va siyosat qoidalari
ngrok boshqaruv panelida sozlanishi kerak — OmniRoute’ning oʻzi faqat mahalliy
maqsadli URL’ni SDK’ga yoʻnaltiradi.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` mahalliy API portini **Funnel** (Tailscale’ning serve uchun ommaviy internetga chiqish vositasi) orqali ochish uchun tizimdagi `tailscale` CLI’ni boshqaradi. U toʻliq hayot siklini qoʻllab-quvvatlaydi: oʻrnatish, tizimga kirish, demonni ishga tushirish, yoqish va oʻchirish.

Amalga oshirish `tailscale funnel --bg <port>` buyrugʻini chaqiradi (fon rejimi). Ommaviy URL `https://<machine>.<tailnet>.ts.net/` shakliga ega.

### Dastlabki talablar

1. Tailscale’ni oʻrnating (yoki buni OmniRoute’ga topshiring — quyidagi `install` endpointiga qarang).
2. Tizimga kiring (`tailscale login` yoki OmniRoute’ning `login` endpointi orqali).
3. Tailscale administrator konsolida tailnet’ingiz uchun Funnel’ni yoqing:
   <https://login.tailscale.com/admin/settings/features>.

Linux va macOS’da demonni (`tailscaled`) boshqarish uchun `sudo` talab qilinadi. POST endpointlari ixtiyoriy `sudoPassword` maydonini qabul qiladi; u soʻrov davomida OmniRoute’ning MITM parol keshiga (`getCachedPassword` / `setCachedPassword`) uzatiladi. Windows `C:\Program Files\Tailscale\tailscale.exe` manzilidagi standart xizmat oʻrnatilishidan foydalanadi.

### REST endpointlari

Oʻrnatish, tizimga kirish, demon va tunnel alohida masalalar boʻlgani sababli, Tailscale boshqa backend’larga qaraganda kengroq imkoniyatlarga ega.

| Endpoint                              | Metod  | Maqsad                                                                            |
| ------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Umumlashtirilgan tunnel holati (`phase`, `tunnelUrl`, `apiUrl` va boshqalar)      |
| `/api/tunnels/tailscale/check`        | `GET`  | Quyi darajadagi tekshiruv: oʻrnatilganmi? tizimga kirilganmi? demon ishlayaptimi? |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale’ni oʻrnatish (SSE orqali uzatiladigan jarayon hodisalari) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS’da `tailscaled` ni ishga tushirish                                    |
| `/api/tunnels/tailscale/login`        | `POST` | Kirish jarayonini boshlash; brauzerda ochish uchun `authUrl` qaytaradi            |
| `/api/tunnels/tailscale/enable`       | `POST` | API porti uchun Funnel’ni ishga tushirish                                         |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel’ni toʻxtatish                                                              |

Barcha Tailscale endpointlari boshqaruv autentifikatsiyasini talab qiladi (`routeUtils.ts ::
requireTailscaleAuth` ga qarang).

Yoqish misoli:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Agar Funnel administrator konsolida yoqilmagan boʻlsa, javob brauzerda ochish uchun `enableUrl` bilan birga `funnelNotEnabled: true` ni oʻz ichiga oladi.

### Ixtiyoriy muhit oʻzgaruvchilari

| Oʻzgaruvchi     | Maqsad                                         |
| --------------- | ---------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` ikkilik fayli yoʻlini almashtirish |

## Endpointlar haqida qisqacha maʼlumot

| Endpoint                              | Metod  | Tana                                | Autentifikatsiya |
| ------------------------------------- | ------ | ----------------------------------- | ---------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | boshqaruv        |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | boshqaruv        |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | boshqaruv        |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | boshqaruv        |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | boshqaruv        |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | boshqaruv        |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | boshqaruv        |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | boshqaruv        |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | boshqaruv        |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | boshqaruv        |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | boshqaruv        |

Markaziy `/api/settings/tunnels` endpointi mavjud emas — har bir backend
mustaqil ishlaydi.

## OAuth qayta chaqiruviga oid jihatlar

OmniRouteʼni tunnel orqali ochganingizda, boshqaruv paneli va OAuth jarayonlari
qayta chaqiruv URL manzillarini `localhost` emas, **ommaviy** host nomi asosida
yaratishi kerak. Aks holda, OAuth provayderi foydalanuvchini o‘z serverlari
yetib bora olmaydigan URL manziliga qayta yo‘naltiradi va ulanish jarayoni
muvaffaqiyatsiz tugaydi.

Boshqaruv panelidagi o‘zgartirishlar va sozlamalarni saqlash uchun tunnel host
nomini `NEXT_PUBLIC_BASE_URL` ichida qatʼiy belgilash shart emas.
Autentifikatsiyadan o‘tgan boshqaruv paneli bir xil manbaga tegishli xavfli
so‘rovlarni seansga bog‘langan CSRF tokeni bilan yuboradi, shu sababli tizimga
kirgandan so‘ng vaqtinchalik Cloudflare Quick Tunnel hostlaridan odatiy
interfeys boshqaruvi uchun foydalanish mumkin.

Quyidagini o‘rnating:

```bash
NEXT_PUBLIC_BASE_URL=https://<tunnel-hostingiz>
```

va OAuthʼni boshlashdan oldin OmniRouteʼni qayta ishga tushiring. Vaqtinchalik
Cloudflare Quick Tunnel uchun URL har bir qayta ishga tushirishdan keyin
o‘zgaradi, shuning uchun amaliy muhitda OAuthʼdan foydalanish uchun
rezervlangan domenga ega ngrok yoki Tailscale Funnelʼni afzal ko‘ring.

## Holat va monitoring

Boshqaruv panelida tunnel holati **Settings → Tunnels** bo‘limida ko‘rsatiladi:

- Faol backend(lar) va joriy `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Joriy ommaviy URL va undan hosil qilingan API URL (`<publicUrl>/v1`).
- Tunnel trafikni yo‘naltirayotgan lokal maqsad URL manzili.
- Agar mavjud bo‘lsa, so‘nggi xato xabari.

Dasturiy monitoring uchun har bir backendga tegishli `GET` endpointlarini
muntazam so‘rab turing. Bir vaqtning o‘zida bir nechta backendni ishga
tushirishga ruxsat beriladi; OmniRoute ularning har birini mustaqil kuzatadi.

## Muammolarni bartaraf etish

### "cloudflared binar fayli topilmadi"

OmniRoute birinchi foydalanishda uni avtomatik o‘rnatishga urinadi. Agar
o‘rnatish bloklangan bo‘lsa (cheklangan tarmoq, GitHubʼga kirish imkoni yo‘q),
`cloudflared`ni <https://github.com/cloudflare/cloudflared/releases> manzilidan
qo‘lda yuklab oling va `CLOUDFLARED_BIN=/path/to/cloudflared` qilib belgilang.

### "ngrok: authtoken talab qilinadi"

`phase: "needs_auth"` hech qanday authtoken topilmaganini anglatadi.
`.env` faylida `NGROK_AUTHTOKEN`ni o‘rnating, uni boshqaruv paneli orqali
sozlang yoki faollashtirish uchun yuboriladigan POST so‘rovi tanasida
`authToken`ni uzating.

### "tailscale: funnel yoqilmagan"

Faollashtirish javobida `funnelNotEnabled: true` bo‘lsa, Funnel tailnet
uchun o‘chirilgan. Qaytarilgan `enableUrl`ni (yoki administrator konsolidagi
funksiya sahifasini) oching va Funnelʼni yoqing.

### Tunnel URL manzilining o‘zgarishi OAuthʼni buzadi

Rezervlangan domenga ega ngrok yoki Tailscale Funnelʼdan foydalaning (ikkalasi
ham har bir tugun uchun barqaror). Cloudflare Quick Tunnel o‘z tabiatiga ko‘ra
vaqtinchalik bo‘lib, uzoq muddatli OAuth qayta chaqiruvlari uchun tavsiya
etilmaydi.

### Linux/macOS tizimida Tailscale uchun ruxsat rad etildi

`tailscaled` uchun root huquqi talab qilinadi. Tegishli POST endpointiga
`sudoPassword`ni taqdim eting yoki demonni o‘zingiz ishga tushiring
(`sudo systemctl start tailscaled`).

## Shuningdek qarang

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — chiquvchi trafik uchun tashqi proksi (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` bilan birga muhit o‘zgaruvchilarining to‘liq ro‘yxati.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — barqaror ommaviy xosting uchun tunnellashga muqobil variantlar.
- Manba: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
