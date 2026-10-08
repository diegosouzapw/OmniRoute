# CLI Machine-ID Token (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## İcmal

OmniRoute CLI komandaları lokal idarəetmə API-sində autentifikasiya üçün `x-omniroute-cli-token` sorğu başlığı vasitəsilə göndərilən `HMAC-SHA256(machine-id, salt)` tokenindən istifadə edir.

Bu, CLI alt komandalarının (`omniroute status`, `omniroute providers` və s.) istifadəçidən hər çağırışda JWT və ya parol təqdim etməsini tələb etmədən idarəetmə son nöqtələrinə sorğu göndərməsinə imkan verir.

## İş prinsipi

1. `getMachineTokenSync()` aparatın maşın identifikatorunu `node-machine-id` vasitəsilə oxuyur (uğursuz olduqda boş sətrə geri qayıdır və CLI autentifikasiyasını deaktiv edir).
2. O, `HMAC-SHA256(machine_id, salt)` hesablayır və tam 64 simvolluq onaltılıq həş-dəyərini qaytarır — bu maşına bağlı olan deterministik və geri çevrilməyən token.
3. CLI tokeni `x-omniroute-cli-token` kimi yalnız müəyyən edilmiş təyinat açıq şəkildə geridöngə URL-si (`localhost`, `127.0.0.0/8` və ya geridöngə IPv6) olduqda göndərir. Token daşıyan sorğular `redirect: error` istifadə edir, buna görə də lokal yönləndirmə onu başqa mənbəyə ötürə bilməz. Uzaq kontekstlər bunun əvəzinə əhatə dairəsi məhdud giriş tokenlərindən istifadə edir. Tokenin yaradılması mümkün deyilsə, CLI başlığı əlavə etmir və `omniroute doctor` boş tokeni etibarlı hesab etmək əvəzinə nasazlıq barədə məlumat verir.
4. Server (`src/server/authz/policies/management.ts`) gözlənilən tokeni eyni duzla yenidən hesablayır və zamanlama əsasında çıxarışın qarşısını almaq üçün `timingSafeEqual` vasitəsilə müqayisə edir.

## Təhlükəsizlik xüsusiyyətləri

| Xüsusiyyət                                         | Təfərrüat                                                                                                                                                                                                                                   |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yalnız geridöngə**                               | Yalnız serverin etibarlı həmkar lokallığı işarəsi (real TCP həmkar ünvanından əldə edilir) geridöngəni göstərdikdə qəbul olunur. Müştəri tərəfindən idarə olunan `Host` başlığına lokallığın müəyyən edilməsi üçün heç vaxt etibar edilmir. |
| **Sabit vaxtlı müqayisə**                          | `crypto.timingSafeEqual` zamanlama hücumlarının qarşısını alır.                                                                                                                                                                             |
| **Geri çevrilməyən**                               | HMAC çıxışından maşın identifikatorunu bərpa etmək mümkün deyil.                                                                                                                                                                            |
| **`always` ilə qorunan hissədən yan keçid yoxdur** | `isAlwaysProtectedPath()` CLI tokeninin yoxlanmasından əvvəl qiymətləndirilir. `/api/shutdown` və `/api/settings/database` həmişə JWT tələb edir.                                                                                           |
| **Eksport edilə bilməyən**                         | Token heç vaxt diskə yazılmır və ya jurnala qeyd edilmir.                                                                                                                                                                                   |

## Standart duz (hər quraşdırma üçün təsadüfi)

`OMNIROUTE_CLI_SALT` təyin edilmədikdə duz bir dəfə yaradılan və `<DATA_DIR>/cli-token-salt.json` ünvanında (`0600` rejimi ilə) saxlanılan təsadüfi 64 simvolluq onaltılıq sətirdir — repozitoriyaya daxil edilmiş `omniroute-cli-auth-v1` literalı deyil. Həm `src/lib/machineToken.ts` daxilindəki `getActiveSalt()`, həm də onun `bin/cli/utils/cliToken.mjs` daxilindəki qarşılığı eyni faylı oxuyur, beləliklə server və bu quraşdırmadakı hər bir CLI çağırışı eyni dəyər üzərində uzlaşır; repozitoriyaya daxil edilmiş literal yalnız saxlanılan və ya mühitdən əldə edilən duz hələ müəyyən edilə bilmədikdə son ehtiyat variantı kimi istifadə olunur (məsələn, serverin heç vaxt işə salınmadığı yeni, yalnız CLI quraşdırmasında). Bu, köhnə sabit literal standartının zəifliyini aradan qaldırır: `/etc/machine-id` adətən hamı tərəfindən oxuna bilir, buna görə də istənilən lokal istifadəçi əks halda `OMNIROUTE_CLI_SALT` təyin edilməmiş hər quraşdırma üçün eyni tokeni yarada bilərdi.

## Saltın rotasiyası

Əldə edilən tokeni kodda dəyişiklik etmədən rotasiya etmək üçün `OMNIROUTE_CLI_SALT` təyin edin — bu dəyər həmişə quraşdırma üçün saxlanılan saltdan üstün tutulur. Rotasiyadan sonra bu maşındakı bütün CLI prosesləri avtomatik olaraq yeni tokendən istifadə edəcək. Bu, əvvəlki əldə edilmiş dəyəri ifşa etmiş ola biləcək proses siyahısı sızmasından sonra faydalıdır.

```bash
# Daimi rotasiya (shell profilinə əlavə edin)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Yeni tokenin istifadə edildiyini yoxlayın
omniroute status
```

## Köhnə format (SHA-256, 32 simvol) — hələ də qəbul edilir

Yuxarıdakı HMAC formatından əvvəl CLI öz tokenini
`bin/cli/utils/cliToken.mjs` daxilində (`src/lib/machineToken.ts` daxilində
`getLegacyCliTokenSync`) `SHA-256(machineId + salt).hex[0..32]` (32 simvolluq prefiks)
şəklində əldə edirdi.

Geriyə uyğunluq üçün server **hər iki** formatı qəbul edir: yoxlayıcı
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` yaradır və daxil
olan başlığı `timingSafeEqual` vasitəsilə hər biri ilə müqayisə edir
(`src/server/authz/policies/management.ts` və `src/lib/middleware/cliTokenAuth.ts`).
Beləliklə, token ya 64 simvolluq HMAC heşinə, ya da köhnə 32 simvolluq SHA-256
prefiksinə uyğun gəldikdə etibarlı sayılır.

**İmtina:** CLI token mexanizmini tamamilə deaktiv etmək üçün
`OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` və ya `.env`) təyin edin; bundan sonra bütün
girişlər üçün açıq şəkildə API açarı tələb olunur. Çoxistifadəçili hostlarda bu tövsiyə
olunur, çünki `machine-id` hər istifadəçi üçün deyil, hər cihaz üçün ayrıdır və eyni
hostdakı başqa bir istifadəçi də eyni tokeni hesablaya bilər.

## Fayllar

| Fayl                                      | Məqsəd                                            |
| ----------------------------------------- | ------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokenin əldə edilməsi (`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | Eyni əldəetmənin CLI tərəfindəki surəti           |
| `<DATA_DIR>/cli-token-salt.json`          | Quraşdırma üçün saxlanılan təsadüfi salt          |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` sabiti                         |
| `src/server/authz/policies/management.ts` | Server tərəfində yoxlama                          |
| `src/server/authz/routeGuard.ts`          | Geri dövrə hostunun yoxlanması (`isLoopbackHost`) |

## Həmçinin baxın

- `docs/security/ROUTE_GUARD_TIERS.md` — marşrutun qorunma səviyyələri
- `docs/architecture/AUTHZ_GUIDE.md` — tam avtorizasiya prosesi
