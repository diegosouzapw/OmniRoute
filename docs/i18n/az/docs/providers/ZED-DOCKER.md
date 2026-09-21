# Zed IDE Integration in Docker Environments (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker daxilində işlədikdə, standart "Zed Keychain-dən idxal" prosesi uğursuz olur,
çünki konteyner host əməliyyat sisteminin açar zənciri xidmətinə (Linux-da libsecret,
macOS-da Keychain, Windows-da Credential Manager) daxil ola bilmir və host fayl sistemindəki
Zed konfiqurasiya qovluqları standart olaraq konteyner daxilində görünmür.

## Docker-də Keychain-dən İdxal Niyə Uğursuz Olur

Konteyner daxilində iki əngəlləyici problem yaranır:

1. **Fayl sistemi izolyasiyası** — `isZedInstalled()` Linux-da `~/.config/zed`,
   macOS-da `~/Library/Application Support/Zed` və ya Windows-dakı ekvivalentini axtarır.
   Bu yollar hostda yerləşir və açıq şəkildə disk kimi qoşulmadıqca əlçatan olmur.
2. **IPC izolyasiyası** — Konfiqurasiya qovluğu qoşulsa belə, `keytar` yerli
   modulu Unix soketi və ya D-Bus sessiyası vasitəsilə əməliyyat sisteminin açar zənciri xidməti
   ilə əlaqə qurur. Standart olaraq bunların heç biri konteynerə ötürülmür, buna görə də giriş məlumatlarının oxunması həmişə uğursuz olur.

OmniRoute Docker mühitini iki evristika vasitəsilə aşkarlayır:

- `/.dockerenv` faylının mövcudluğu (konteyner başladılarkən Docker demonu tərəfindən yazılır).
- `/proc/1/cgroup` daxilində `docker` sətrinin olması (Linux cgroup v1).

Bu evristikalardan hər hansı biri işə düşdükdə, idxal marşrutu
`zedDockerEnvironment: true` ilə HTTP 422 qaytarır və sizi Əl ilə Token İdxalı vərəqinə yönləndirən mesaj göstərir.

## Əl ilə Token İdxalı Vərəqindən İstifadə

1. **İdarəetmə paneli → Provayderlər → Zed** bölməsini açın.
2. **Əl ilə Token İdxalı** paneli açar zəncirindən idxal kartının altında görünür.
   OmniRoute Docker-i aşkarladıqda, açar zəncirindən ilk uğursuz idxal cəhdindən sonra
   bu panel avtomatik olaraq genişlənir.
3. Açılan siyahıdan provayderi seçin (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter və ya DeepSeek).
4. API açarını parol sahəsinə yapışdırın.
5. **İdxal et** düyməsinə klikləyin.

Açar `Zed Manual Import (<provider>)` adı ilə yeni provayder bağlantısı kimi yadda saxlanılır.

## Zed API Açarlarını Hostda Harada Saxlayır

Zed süni intellekt provayderlərinin açarlarını əməliyyat sisteminin açar zəncirində
`zed-openai`, `ai.zed.openai`, `zed-anthropic` və s. kimi xidmət adları altında saxlayır.
Onları əl ilə idxal etmək üçün əldə etmək məqsədilə aşağıdakı yerlərə baxın:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` bölməsində provayder konfiqurasiyaları var. Zed interfeysi vasitəsilə
açar zəncirində saxlanılan açarlar `settings.json` daxilində açıq mətn şəklində olmur; onları
GNOME Keyring / Seahorse kimi açar zənciri görüntüləyicisi vasitəsilə və ya aşağıdakı əmri icra etməklə əldə edin:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain qeydlərini **Keychain Access.app** daxilində `zed` axtarışı etməklə tapmaq olar.

## Disk Kimi Qoşma Seçimi (Qabaqcıl)

İstəyə görə Zed konfiqurasiya qovluğunu konteynerə yalnız oxuma rejimində disk kimi qoşa bilərsiniz.
Bu, açar zənciri problemini həll etmir, lakin məxfi olmayan Zed konfiqurasiya dəyərlərini
(məsələn, model seçimlərini) oxuyan gələcək funksiyalar üçün faydalı ola bilər.

```yaml
# docker-compose.yml fraqmenti
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux hostu
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS hostu (əvəzinə bu sətrin şərhini ləğv edin)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Gələcəkdə: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Qeyd: `ZED_CONFIG_PATH` mühit dəyişəni ilə əvəzləmə hələ həyata keçirilməyib. Bu
fraqment həmin funksiya əlavə edildikdə istifadə üçün istinad kimi təqdim olunur.

## Əl ilə İdxal API-si

Əl ilə idxal endpoint-i birbaşa da çağırıla bilər:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Mənim Zed OpenAI açarım"   // istəyə bağlıdır
}
```

Uğurlu olduqda aşağıdakı cavabı qaytarır:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Problemlərin Aradan Qaldırılması

| Əlamət                                   | Səbəb                              | Həll                                                 |
| ---------------------------------------- | ---------------------------------- | ---------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`       | Docker daxilində işləyir           | Əl ilə Token İdxalı vərəqindən istifadə edin         |
| 404 + `zedInstalled: false`              | Zed hostda quraşdırılmayıb         | Zed-i quraşdırın və ya əl ilə idxaldan istifadə edin |
| 403 + açar zəncirinə giriş rədd edildi   | Əməliyyat sistemi girişi rədd etdi | Əməliyyat sistemi sorğusunda icazə verin             |
| 404 + açar zənciri xidməti əlçatan deyil | Linux-da `libsecret` yoxdur        | `libsecret-1-dev` quraşdırın                         |
