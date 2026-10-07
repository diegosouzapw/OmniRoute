# ACP registry and registered CLI launchers (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute **CLI aşkarlanmasını**, **yerli Agent Client Protocol-u** və
**köhnə stdio adapterlərini** bir-birindən ayırır. Quraşdırılmış icra faylının tapılması onun
autentifikasiyasını, model uyğunluğunu və ya sorğunu emal etməyə hazır olduğunu sübut etmir.

İdarəetmə paneli inventar və fərdi agentlərin qeydiyyatı üçün `GET /api/acp/agents` və
`POST /api/acp/agents` istifadə edir. Bunlar yalnız lokal idarəetmə marşrutlarıdır, prosesləri
işə salmaq və ya sorğular göndərmək üçün açıq API deyil. Daxili
`AcpManager` avtomatik olaraq HTTP provayderinin ehtiyat variantına çevrilmir.

## Qeydiyyatdan keçmiş müqavilələr

`config/cli-tools-manifest.json` daxili işəsalma icra faylları, arqumentləri
və backend rejimləri üçün əsas həqiqət mənbəyidir. Reyestr öz təriflərini
həmin manifestdən əldə edir. Aşkarlama nəticəsi 60 saniyə keşlənir.

- `acp`: Gemini müqaviləsi `gemini --experimental-acp` əmrini işə salır və
  rəsmi TypeScript SDK vasitəsilə yeni sətirlə ayrılan ACP JSON-RPC ilə əlaqə qurur.
- `stdio-adapter`: digər qeydiyyatdan keçmiş müqavilələr yeni sətirli girişə və
  stdout çıxışına əsaslanan köhnə adapteri saxlayır. İki saniyəlik çıxış fəaliyyətsizliyi
  onun cavabını tamamlayır. Bu adapter həmin CLI-lər üçün yerli ACP dəstəyini
  **təsdiqləmir**.

Gemini işəsalma bayrağını öz [CLI arayışında](https://geminicli.com/docs/cli/cli-reference/)
sənədləşdirir. Klient ilkinləşdirmə, sessiyanın yaradılması, sorğu istəkləri,
bildirişlər və ləğvetmə üçün [rəsmi ACP SDK-dan](https://github.com/agentclientprotocol/typescript-sdk)
istifadə edir.

Fərdi agent tərifləri administratorun nəzarətində olan işəsalma müqavilələri olaraq qalır.
İcra faylının və arqumentlərin qeydiyyatı həmin prosesə server istifadəçisinin lokal
icra imtiyazlarını verir; qeydiyyat sandbox deyil. Versiya yoxlamaları
yalnız qeydiyyatdan keçmiş icra faylını və tanınan versiya bayrağını qəbul edir.

## Daxili işəsalma API-si

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Yalnız bu agentə məqsədli şəkildə təyin edilmiş provayder dəyişənlərini ötürün.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Cavabı çağıran tətbiqdə emal edin.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` icra faylını və arqumentləri qeydiyyatdan keçmiş
tərifdən müəyyən edir. Çağıran tərəf üçün yeganə seçimlər `cwd` və `env`-dir; köhnə
`spawn(agentId, binary, args, env)` siqnaturası və icra faylı əvəzləmələri
rədd edilir. HTTP işəsalma müqavilələri bu menecer tərəfindən dəstəklənmir.

Alt proses CLI işəsalıcıları ilə eyni əməliyyat sistemi, terminal, lokal və sertifikat
icazə siyahısını miras alır. Server/provayder məxfi məlumatları əsas
mühitdən köçürülmür. Seçilmiş CLI üçün tələb olunan giriş məlumatları
açıq şəkildə ötürülməli və ya həmin CLI-nin öz lokal autentifikasiyası vasitəsilə təmin
edilməlidir. Alt proses yenə də lokal istifadəçinin fayl sistemi icazələrinə malikdir
və öz konfiqurasiyasını oxuya bilər.

## Yerli həyat dövrü və məhdudiyyətlər

1. Qeydiyyatdan keçmiş icra faylını işə salın, ACP-ni ilkinləşdirin və seçilmiş iş
   qovluğunda köklənmiş sessiya yaradın. İlkinləşdirmə üçün on saniyəlik limit var.
2. Sorğu göndərin və yalnız həmin sessiyaya aid mətn bildirişlərini toplayın.
   Tamamlanma stdout səssizliyi dövrü deyil, sorğu RPC cavabıdır.
3. Tamamlanmamış ilkinləşdirmə də daxil olmaqla, bir sorğu son müddətindən istifadə edin; standart
   müddət 120 saniyədir. Eyni prosesdə paralel sorğular rədd edilir.
4. Yerli vaxt aşımı zamanı `session/cancel` çağırmağa cəhd edin və prosesi dayandırın.
   Məhdud 100 ms pəncərə dayandırmadan əvvəl bildirişin ötürülməsini tamamlamağa imkan verir.
5. İlkinləşdirmə uğursuz olduqda, bağlantı bağlandıqda, proses sonlandıqda və ya
   çağıran tərəf onu dayandırdıqda nəqliyyat vəziyyətini bağlayın və sessiyanı silin.

Alət icazəsi sorğuları rədd edilir. Heç bir fayl sistemi və ya terminal klienti
imkanı elan edilmir. Bu məhdudiyyətlər alt icra faylını özünü sandbox-a salmır
və ya CLI-nin öz avtorizasiya parametrlərini əvəz etmir.

Həm yerli mətn, həm də köhnə stdout/stderr ən çox 1 MiB simvol saxlayır;
ən yeni çıxış kəsilmə bildirişi ilə birlikdə qorunur. Ayrı-ayrı yerli məlumat
çərçivəsi SDK təhlilindən əvvəl 2 MiB baytla məhdudlaşdırılır. Buferlər hər sorğu üçün sıfırlanır.

`kill(sessionId)` SIGTERM göndərir, proses sonlanmayıbsa beş saniyədən sonra
SIGKILL göndərir. Köhnə sorğuların vaxt aşımı dinləyiciləri və taymerləri sərbəst buraxır,
lakin sessiyanı başqa sorğu üçün əlçatan saxlayır; işi bitirdikdən sonra
`kill()` və ya `killAll()` çağırmaq çağıran tərəfin məsuliyyətində qalır.

## Hadisələr və yoxlama

Menecer hər birində `sessionId` olan `stdout`, `stderr` və `exit` hadisələrini yaradır.
`sessionError` təmizlənmiş nəqliyyat xətası barədə məlumat verir. Uyğunluq üçün nəzərdə tutulan `error`
hadisəsi yalnız abunəçisi olduqda yaradılır, buna görə çatışmayan icra faylı
emal edilməyən EventEmitter xətasına səbəb ola bilməz.

- `getSession(sessionId)` idarə olunan sessiyanı və ya `undefined` qaytarır.
- `getActiveSessions()` dayandırılmış və ya dayandırılmaqda olan sessiyaları istisna edir.
- `sendInput(sessionId, input)` yalnız aktiv köhnə adapter üçün əlçatandır;
  yerli ACP öz JSON-RPC axınını qorumaq üçün xam girişi rədd edir.
- `killAll()` həmin instansiya tərəfindən idarə olunan bütün sessiyaları dayandırır.

## Validasiya sərhədləri

Deterministik sınaq qurğuları yerli əl sıxmanı, mətn çıxışını, rədd edilmiş
icazələri, ləğvetməni, paralel sorğuları, uğursuz ilkinləşdirməni, prosesin
sonlanmasını, çıxış limitlərini və məxfi məlumatların izolyasiyasını əhatə edir. Mövcud köhnə bufer/dinləyici
reqressiyaları da əhatə olunmağa davam edir. Bu testlər aktiv Gemini girişini
və ya uğurlu provayder inferensiyasını nümayiş etdirmir; bunlar hədəf mühitdə
ayrıca avtorizasiya edilmiş tüstü testi tələb edir.

## Əlaqəli sənədlər

- [Agent protokolları](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI işəsalma müqavilələri](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI alətləri](../reference/CLI-TOOLS.md)
- [A2A serveri](./A2A-SERVER.md)
- [Bulud agentləri](./CLOUD_AGENT.md)
