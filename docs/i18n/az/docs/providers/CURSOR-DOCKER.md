# Cursor Provider in Docker Environments (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker daxilində işlədikdə köhnə **Cursor IDE-dən idxal et** /
`cursor-agent` axınları uğursuz olur, çünki konteyner host sistemindəki Cursor
quraşdırmasını görə bilmir. Bunun əvəzinə **Cursor ilə daxil ol** (deep-control PKCE)
istifadə edin.

## IDE / CLI İdxalı Docker-də Niyə Uğursuz Olur

1. **Fayl sistemi izolyasiyası** — Avtomatik idxal konteynerin _daxilində_
   `~/.config/Cursor/User/globalStorage/state.vscdb` kimi Linux yollarını axtarır.
   macOS üçün Docker Desktop-da host IDE verilənlər bazası standart olaraq
   qoşulmur və host Darwin olsa belə, konteynerin əməliyyat sistemi Linux-dur.
2. **`cursor-agent` binar faylı yoxdur** — Rəsmi OmniRoute obrazlarına
   `cursor-agent` daxil deyil. Əvvəllər Mövcud Modellər
   `cursor-agent --list-models` əmrini işə salır, uğursuz olduqda isə statik
   kataloqdan istifadə edirdi.
3. **Yanlış binar fayl** — macOS üçün `cursor-agent` faylını Linux
   konteynerinə bind-mount etməyin. O, icra olunmayacaq.

## Tövsiyə olunur: Cursor ilə Daxil Olun

1. **İdarəetmə paneli → Provayderlər → Cursor** bölməsini açın.
2. **Cursor ilə daxil ol** tabını seçin.
3. **Cursor ilə daxil ol** düyməsinə klikləyin — OmniRoute
   **host** brauzerinizdə `https://cursor.com/loginDeepControl?…` ünvanını açır.
4. Brauzerdə girişi təsdiqləyin, sonra idarəetmə panelinə qayıdın. OmniRoute
   tokenlər gələnədək `api2.cursor.sh/auth/poll` ünvanını sorğulayır.
5. OmniRoute **giriş + yeniləmə** tokenlərini saxlayır və onları
   `https://api2.cursor.sh/auth/exchange_user_api_key` vasitəsilə yeniləyir.

Bu üsul konteyner daxilində Cursor IDE və ya `cursor-agent` tələb etmir.

## Modellərin aşkarlanması

Daxil olunmuş bağlantı olduqda **Mövcud Modellər / Avtomatik Sinxronizasiya**
bağlantının bearer tokenindən istifadə edərək Cursor-un HTTP
`AiService/AvailableModels` kataloquna üstünlük verir. Bu uğursuz olarsa,
OmniRoute yenə də host sistemindəki `cursor-agent` proqramını (mövcud olduqda),
daha sonra isə statik reyestrin ilkin məlumatlarını sınayır.

OmniRoute kataloqda həmişə **`auto`** modelini (göstərilən ad “Auto”), həmçinin
OpenCodex üslublu **`auto-cost`**, **`auto-balance`** və
**`auto-intelligence`** marşrutlaşdırma rejimlərini təqdim edir. Ötürülmə zamanı
bunlar Cursor-un `default` modelinə (üç variant üçün `optimization`
ModelParameter ilə) uyğunlaşdırılır. Premium modellər üçün istifadə limiti
bitdikdə `cu/auto` modelinə üstünlük verin — Auto üçün çox vaxt hələ də büdcə
qalır.

### Sinxronizasiya edildikdə canlı kataloq eksklüzivdir

Uğurlu Cursor model sinxronizasiyasından (`cursor-agent --list-models` →
saxlanılan sinxronlaşdırılmış kataloq və ya yuxarıdakı bearer autentifikasiyalı
`AvailableModels` sorğusu) sonra **idarəetmə paneli**, **`/v1/models`** və
**Hamısını Sına** aşağıdakıları siyahıya alır:

1. Canlı sinxronizasiya tərəfindən qaytarılan modellər
2. Əlavə edilmiş avtomatik marşrutlaşdırıcı id-ləri: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatorun **fərdi** modelləri (İdxal / əl ilə) — sinxronizasiya zamanı heç vaxt silinmir

`open-sse/config/providers/registry/cursor/` daxilindəki böyük statik reyestr
**yalnız oflayn ehtiyat variantıdır**. Sinxronlaşdırılmış kataloq boş olduqda
(və ya aşkarlama uğursuz olduqda) siyahı həmin reyestrə geri qayıdır.

Effort suffiksli id-lər (məsələn, `claude-4.6-sonnet-high`) icra zamanı yenə də
**sorğulana** bilər: `resolveRequestedModel` suffiksi ayıraraq ötürülən
`ModelParameter`-ə çevirir. Eksklüziv siyahılama bu statik variantları qəsdən
Hamısını Sına bölməsindən gizlədir ki, yoxlamalar Cursor-un faktiki olaraq
mövcud saydığı modellərə uyğun gəlsin.

### Köməkçi funksiyalar

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — idarəetmə panelində birləşdirmə
- `ensureCursorAutoCatalogEntry` — aşkarlama və siyahılama zamanı auto* əlavəsi
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statik dövrü

## Provayder Limitləri (kvota)

Cursor üçün **İstifadə → Provayder Limitləri** PKCE və ya token idxalından sonra
`api2.cursor.sh` üzərindəki Bearer API-lərindən (`GetCurrentPeriodUsage` →
istifadə xülasəsi → auth/usage) istifadə edir. Köhnə cookie/`cursor.com`
idarəetmə paneli yolu daha əvvəl IDE-dən idxal edilmiş sessiyalar üçün son
ehtiyat variantı olaraq qalır.

Pəncərələr adətən **Ümumi**, **Auto + Composer** və **API** bölmələrini əhatə
edir. Limitlər boş görünürsə, **Cursor ilə daxil ol** əməliyyatını yenidən
yerinə yetirin və ya tokenləri təkrar idxal edin (artıq yalnız IDE idxalı tələb
olunmur).

## Boş cavablar / istifadə limitinin bitməsi

Cursor Run sorğusunu qəbul edib köməkçi mətni qaytarmadıqda (premium istifadə
limiti bitdikdə bu hal geniş yayılıb), OmniRoute sadə “Provayder boş məzmun
qaytardı” mesajı əvəzinə əməliyyat aparmağa imkan verən **429** (kvota
göstəriciləri) və ya təlimatla birlikdə **502** xətası göstərir.
`not_found: AI Model Not Found` (istifadə pəncərəsi bitib) kimi axın xətaları
**Cursor sürət limiti / istifadə limiti aşılıb** kimi təsnif edilir və həmin
mesaj SSE konveyeri boyunca qorunur (ortaq boş axın qoruyucusu artıq göndərilmiş
xətanın üzərinə yazmır). Provayder Limitlərini yoxlayın, **`auto`** modelini
sınayın və ya Cursor planının limitlərini artırın.

## Müştəri versiyası (başsız rejim)

Lokal `cursor-agent` quraşdırması olmadıqda OmniRoute
`x-cursor-client-version` dəyərini əvvəlcə `CURSOR_AGENT_CLI_VERSION` mühit
dəyişənindən, sonra Cursor quraşdırma skriptinin diskdə keşlənmiş analizindən,
daha sonra isə sabitlənmiş build id-dən müəyyən edir. Ehtiyac olduqda
`CURSOR_AGENT_CLI_VERSION` ilə dəyəri əvəz edin.

## Ehtiyat Variant: Tokenin Əl ilə İdxalı

Brauzer vasitəsilə girişi tamamlaya bilmirsinizsə:

1. Host sistemində tokenləri Cursor-un `state.vscdb` faylından çıxarın:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor autentifikasiya modalında **Tokeni idxal et** bölməsini açın.
3. **Giriş Tokenini** və mövcud olduqda **Yeniləmə Tokenini** (avtomatik
   yeniləmə üçün tələb olunur) daxil edin. Maşın ID-si ixtiyaridir.

Yalnız giriş tokeni ilə idxal hələ də işləyir, lakin yeniləmə tokeni olmadan
onun müddəti bitəcək — çat autentifikasiya xətaları qaytardıqda yenidən idxal
edin.

## Əlaqəli Məlumatlar

- Zed Docker təlimatı: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor giriş arayışı (xarici):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
