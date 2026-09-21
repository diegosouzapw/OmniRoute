# Zed IDE Integration in Docker Environments (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker ichida ishlaganda, standart "Zed Keychain’dan import qilish" jarayoni muvaffaqiyatsiz tugaydi,
chunki konteyner host operatsion tizimidagi keychain demoniga (Linux’da libsecret,
macOS’da Keychain, Windows’da Credential Manager) ulana olmaydi va host fayl tizimidagi
Zed konfiguratsiya kataloglari odatiy holatda konteyner ichidan ko‘rinmaydi.

## Nima uchun Keychain’dan import qilish Docker’da ishlamaydi

Konteyner ichida ikkita to‘sqinlik qiluvchi muammo yuzaga keladi:

1. **Fayl tizimi izolyatsiyasi** — `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) yoki Windows’dagi tegishli yo‘lni qidiradi. Bu yo‘llar
   host tizimida joylashgan va alohida volume sifatida ulanmaguncha ulardan foydalanib bo‘lmaydi.
2. **IPC izolyatsiyasi** — Konfiguratsiya katalogi ulanganida ham `keytar` mahalliy
   moduli Unix soketi yoki D-Bus seansi orqali operatsion tizimning keychain xizmati bilan aloqa qiladi.
   Ularning hech biri odatiy holatda konteynerga uzatilmaydi, shu sababli hisob ma’lumotlarini o‘qish doimo muvaffaqiyatsiz tugaydi.

OmniRoute Docker muhitini ikkita evristika orqali aniqlaydi:

- `/.dockerenv` mavjudligi (konteyner ishga tushirilganda Docker demoni tomonidan yoziladi).
- `/proc/1/cgroup` ichida `docker` satrining mavjudligi (Linux cgroup v1).

Evristikalardan biri ishga tushganda, import marshruti HTTP 422 javobini
`zedDockerEnvironment: true` va Qo‘lda token import qilish sahifasiga yo‘naltiruvchi xabar bilan qaytaradi.

## Qo‘lda token import qilish sahifasidan foydalanish

1. **Boshqaruv paneli → Provayderlar → Zed** bo‘limini oching.
2. **Qo‘lda token import qilish** paneli keychain’dan import qilish kartasi ostida paydo bo‘ladi.
   OmniRoute Docker’ni aniqlaganida, keychain’dan import qilishga birinchi muvaffaqiyatsiz
   urinishdan so‘ng bu panel avtomatik ravishda kengayadi.
3. Ochiluvchi ro‘yxatdan provayderni tanlang (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter yoki DeepSeek).
4. API kalitini parol maydoniga joylang.
5. **Import qilish** tugmasini bosing.

Kalit `Zed Manual Import (<provider>)` nomi bilan yangi provayder ulanishi sifatida saqlanadi.

## Zed API kalitlarini host tizimida qayerda saqlaydi

Zed AI provayderlarining kalitlarini operatsion tizim keychain’ida `zed-openai`,
`ai.zed.openai`, `zed-anthropic` va boshqa shu kabi xizmat nomlari ostida saqlaydi. Ularni qo‘lda
import qilish uchun olish maqsadida quyidagi joylarni tekshiring:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` bo‘limida provayder konfiguratsiyalari mavjud. Zed interfeysi orqali
keychain’da saqlangan kalitlar `settings.json` ichida ochiq matn shaklida bo‘lmaydi; ularni
GNOME Keyring / Seahorse kabi keychain ko‘rish vositasi orqali yoki quyidagini ishga tushirib oling:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain yozuvlarini **Keychain Access.app** ichida `zed` so‘zini qidirish orqali topish mumkin.

## Volume ulash varianti (Kengaytirilgan)

Zed konfiguratsiya katalogini konteynerga faqat o‘qish rejimida ixtiyoriy ravishda ulashingiz mumkin.
Bu keychain muammosini hal qilmaydi, ammo maxfiy bo‘lmagan Zed konfiguratsiya qiymatlarini
(masalan, model sozlamalarini) o‘qiydigan kelajakdagi funksiyalar uchun foydali bo‘lishi mumkin.

```yaml
# docker-compose.yml parchasi
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux hosti
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS hosti (buning o‘rniga izohdan chiqaring)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Kelajakda: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Eslatma: `ZED_CONFIG_PATH` muhit o‘zgaruvchisi orqali yo‘lni almashtirish hali amalga oshirilmagan. Bu
parcha ushbu funksiya qo‘shilganda foydalanish uchun ma’lumotnoma sifatida taqdim etilgan.

## Qo‘lda import qilish API’si

Qo‘lda import qilish endpoint’ini bevosita ham chaqirish mumkin:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Mening Zed OpenAI kalitim"   // ixtiyoriy
}
```

Muvaffaqiyatli bajarilganda quyidagi javob qaytariladi:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Muammolarni bartaraf etish

| Alomat                              | Sabab                            | Yechim                                             |
| ----------------------------------- | -------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`  | Docker ichida ishlamoqda         | Qo‘lda token import qilish sahifasidan foydalaning |
| 404 + `zedInstalled: false`         | Zed hostda o‘rnatilmagan         | Zed’ni o‘rnating yoki qo‘lda import qiling         |
| 403 + keychain’ga kirish rad etildi | OT keychain’ga kirishni rad etdi | OT so‘rovida ruxsat bering                         |
| 404 + keychain xizmati mavjud emas  | Linux’da `libsecret` yo‘q        | `libsecret-1-dev` paketini o‘rnating               |
