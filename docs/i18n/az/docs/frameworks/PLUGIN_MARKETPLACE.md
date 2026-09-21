# Plugin Marketplace (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Əsas istinad mənbəyi:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` və
> `src/app/(dashboard)/dashboard/plugins/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute WordPress üslublu plagin sistemi ilə təchiz olunur. Plaginlər sorğu emalı ardıcıllığına (`onRequest` / `onResponse` / `onError`) və həyat dövrü hadisələrinə (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`) qoşulan, hər birində `plugin.json` manifesti və giriş faylı olan müstəqil qovluqlardır.

**Plagin Marketpleysi** həmin sistemin üzərindəki aşkarlama qatıdır. O, quraşdırıla bilən plaginlərin nəzərdən keçirilə bilən kataloqunu təqdim edir. Standart olaraq kataloq kiçik, daxili ilkin reyestrdən ibarətdir; operator onu fərdi uzaq reyestr URL-inə yönəldə bilər. Bu halda sorğu DNS həllindən istifadə edən SSRF qoruyucusu ilə mühafizə olunur (bax: [Təhlükəsizlik](#security)).

Bütün plagin marşrutları **yalnız loopback üçün əlçatandır** (Səviyyə 1 — `LOCAL_ONLY`): plaginlər alt proseslərdə kod yükləyib icra etdiyinə görə, autentifikasiyadan asılı olmayaraq, marşrutlar loopback olmayan mənbələrdən əlçatmazdır. Bax:
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Komponentlərin Qarşılıqlı Əlaqəsi

```
İdarə paneli (/dashboard/plugins)
  ├─ "Quraşdırılmışlar" nişanı → GET /api/plugins            (listPlugins)
  │                              POST /api/plugins/scan      (pluginManager.scan)
  │                              POST /api/plugins/{name}/activate|deactivate
  │                              DELETE /api/plugins/{name}   (silmə)
  └─ "Marketpleys" nişanı       → GET /api/plugins/marketplace
                                   → listMarketplacePlugins()
                                     ├─ fərdi URL yoxdur → daxili SEED_REGISTRY
                                     └─ fərdi URL → isSafeMarketplaceUrl() SSRF qoruyucusu
                                                   → safeOutboundFetch(guard:"public-only")
```

- **Reyestr qatı** — `src/lib/plugins/marketplace.ts`: kataloqu siyahıya alır / axtarır, hər hansı xəta baş verdikdə ilkin reyestrə geri qayıdır.
- **Həyat dövrü qatı** — `src/lib/plugins/manager.ts` (`pluginManager` singleton-u): quraşdırma, təkmilləşdirmə, aktivləşdirmə, deaktivləşdirmə, silmə, skan etmə, başlanğıcda yükləmə.
- **Manifest qatı** — `src/lib/plugins/manifest.ts`: `plugin.json` üçün Zod sxemi + standart dəyərlər.
- **Skaner** — `src/lib/plugins/scanner.ts`: plagin qovluğunda diskdəki plaginləri aşkar edir.
- **Yükləyici** — `src/lib/plugins/loader.ts`: hər bir plagini təcrid olunmuş alt prosesdə işə salır və IPC üzərindən hook çağırışlarına vasitəçilik edir.

## Marketpleys Kataloqu

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) `MarketplaceEntry` obyektlərinin siyahısını qaytarır:

| Sahə          | Tip      | Qeydlər                                               |
| ------------- | -------- | ----------------------------------------------------- |
| `name`        | string   | kebab-case formatında plagin adı                      |
| `version`     | string   | semver                                                |
| `description` | string   | Qısa xülasə                                           |
| `author`      | string   | Müəllif / təşkilat                                    |
| `license`     | string   | SPDX üslublu lisenziya identifikatoru                 |
| `downloadUrl` | string   | Mənbənin endirilmə URL-i (boş ola bilər)              |
| `repository`  | string?  | İxtiyari repozitoriya URL-i                           |
| `tags`        | string[] | Axtarış/filtrləmə teqləri                             |
| `downloads`   | number   | Endirmə sayı                                          |
| `rating`      | number   | 0–5                                                   |
| `verified`    | boolean  | Elementin təsdiqlənmiş kimi işarələnib-işarələnməməsi |
| `lastUpdated` | string   | ISO-ya bənzər tarix sətri                             |

Fərdi reyestr URL-i konfiqurasiya edilmədikdə kataloq daxili `SEED_REGISTRY`-dən ibarət olur (hazırda `request-logger`, `rate-limiter`, `cost-tracker` və `theme-manager`). İlkin reyestr həmişə əlçatandır — konfiqurasiya edilmiş uzaq reyestr əlçatmaz olduqda, `200`-dən fərqli status qaytardıqda və ya tanınmayan məzmun qaytardıqda `listMarketplacePlugins()` xəbərdarlıq qeyd edir və ilkin siyahıya geri qayıdır.

> Qeyd: marketpleys **kataloqu** (nəzərdən keçirmə/axtarış) başdan sona inteqrasiya edilib, lakin kataloqdan bir kliklə marketpleys **quraşdırması** hələ həyata keçirilməyib — marketpleys elementindəki idarə panelinin "Quraşdır" düyməsi hazırda "tezliklə" bildirişi göstərir. Hazırda quraşdırma lokal yol vasitəsilə quraşdırma axını (`POST /api/plugins`) və diskdə aşkarlama (`POST /api/plugins/scan`) vasitəsilə həyata keçirilir.

## REST API

Bütün son nöqtələr idarəetmə autentifikasiyası (`requireManagementAuth`) tələb edir **və**
yalnız loopback interfeysi vasitəsilə əlçatandır — `/api/plugins` və `/api/plugins/`
`LOCAL_ONLY_API_PREFIXES` siyahısında göstərilib
(`src/server/authz/routeGuard.ts`).

| Son nöqtə                        | Metod  | Təsvir                                                                    |
| -------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Quraşdırılmış plaginləri siyahıla (istəyə bağlı `?status=` filtri)        |
| `/api/plugins`                   | POST   | Mütləq lokal yoldan plagin quraşdır                                       |
| `/api/plugins/scan`              | POST   | Plagin kataloqunu skan et və yeni plaginləri qeydiyyata al                |
| `/api/plugins/marketplace`       | GET    | Marketpleys kataloqu qeydlərini siyahıla                                  |
| `/api/plugins/[name]`            | GET    | Quraşdırılmış plaginin təfərrüatlarını əldə et                            |
| `/api/plugins/[name]`            | DELETE | Plagini sil                                                               |
| `/api/plugins/[name]/activate`   | POST   | Aktivləşdir (yüklə + hook-ları qeydiyyata al)                             |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivləşdir (`onDeactivate`-i işə sal, hook-ların qeydiyyatını ləğv et) |
| `/api/plugins/[name]/config`     | GET    | Plagin konfiqurasiyasını + konfiqurasiya sxemini əldə et                  |
| `/api/plugins/[name]/config`     | PUT    | Plagin konfiqurasiyasını yenilə (sxemə uyğunluğu yoxlanılır)              |

`GET /api/plugins` sorğusunun `status` filtri
`installed` / `active` / `inactive` / `error` dəyərlərindən birini qəbul edir. Yanlış dəyər `400` qaytarır.

### Quraşdırılmış plaginləri siyahılamaq

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Lokal yoldan quraşdırmaq

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` **mütləq** olmalıdır və `..` keçid seqmentləri və ya null baytları ehtiva edə bilməz (Zod tərəfindən məcburi şəkildə yoxlanılır). Mənbə kataloqunda etibarlı `plugin.json` olmalıdır (və ya kataloq həmin faylın üst kataloqu olmalıdır). Uğurlu olduqda cavab quraşdırılmış plagin sətri ilə birlikdə `201` olur.

### Marketpleysə baxmaq

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plagin konfiqurasiyasını yeniləmək

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` təqdim edilən hər bir dəyərin plaginin `configSchema`-sına
(manifestdə elan edilir) uyğunluğunu yoxlayır: `number` sahələri `min`/`max`
məhdudiyyətlərinə əməl edir, `select` sahələri isə elan edilmiş `enum` ilə uyğun gəlməlidir. Sxemdə olmayan açarlara icazə verilir.

## Konfiqurasiya

### Plagin kataloqu

Plaginlər OmniRoute məlumat kataloqunda yerləşir:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (və ya manifest.main-ın göstərdiyi fayl)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) həmin kataloqu üç mərhələdə müəyyən edir:

1. **`OMNIROUTE_PLUGINS_DIR`**, təyin edildikdə — `HOME` dəyərindən asılı olmayaraq olduğu kimi istifadə edilir. Bu, plagin ağacının adətən konteynerin ev kataloqu ilə heç bir əlaqəsi olmayan yola bind-mount edildiyi Docker/K8s üçün açıq idarəetmə parametridir (#11827).
2. `<home>/.omniroute/plugins`, burada `<home>` `HOME` / `USERPROFILE` mühit dəyişənlərindən əldə edilir.
3. Proses heç bir ev kataloqu ixrac etmədikdə `/tmp/.omniroute/plugins`.

Müəyyən edilmiş kataloq başlanğıc zamanı `scanner.dir_resolved` kimi bir dəfə jurnala yazılır və hansı girişin üstün gəldiyi (`OMNIROUTE_PLUGINS_DIR`, `home` və ya `no-home-fallback`) göstərilir — beləliklə, səssizcə 3-cü mərhələyə keçən obraz yalnız boş plagin siyahısı bildirmək əvəzinə bunu açıq şəkildə göstərir.
`POST /api/plugins/scan` orada etibarlı `plugin.json` saxlayan istənilən alt kataloqu aşkarlayır və qeydiyyata alır; həmin kataloq eyni zamanda `pluginManager.install()` metodunun plaginləri köçürdüyü kökdür, buna görə də dəyərin dəyişdirilməsi aşkarlama və quraşdırmanı birlikdə başqa yerə daşıyır.

> **`OMNIROUTE_PLUGINS_DIR`, `OMNIROUTE_PLUGIN_PATH` deyil.** Sonuncu yalnız
> `omniroute` alt əmrləri əlavə edən `omniroute-cmd-*` npm paketlərini tapmaq üçün
> CLI əmr-plağini yükləyicisi (`bin/cli/plugins.mjs`) tərəfindən oxunur — onun burada təsvir edilən icra zamanı skanerinə heç bir təsiri yoxdur. Bu tərəf haqqında məlumat üçün [PLUGINS.md](./PLUGINS.md) sənədinə baxın.

### Fərdi marketpleys reyestrinin URL-i

Marketpleys kataloqunun mənbəyi `pluginMarketplaceUrl` parametrindən oxunur
(`src/lib/plugins/marketplace.ts` faylı `settings.pluginMarketplaceUrl` dəyərini oxuyur). Bu parametr `http(s)` URL-i olaraq təyin edildikdə, `listMarketplacePlugins()` həmin URL-i əldə edir və ya üst səviyyəli JSON qeydlər massivini, ya da `plugins` massivi olan obyekti qəbul edir; sətir tipli `name` dəyəri olmayan qeydlər filtrlənir. Parametr təyin edilmədikdə (və ya sorğu SSRF qorumasından keçmədikdə / yanlış cavab qaytardıqda) daxili ilkin reyestrdən istifadə olunur.

İdarəetmə panelindəki "Marketplace" tabı bu URL üçün sahə təqdim edir (dəyər
`GET /api/settings` vasitəsilə geri oxunur).

> İcra qeydi: idarəetmə panelindəki "Save" əməliyyatı
> `pluginMarketplaceUrl` dəyərini `PATCH /api/settings` son nöqtəsinə göndərir. Yazı zamanı bu
> açar `updateSettingsSchema` daxilində elan edilməyib
> (`src/shared/validation/settingsSchemas.ts`), buna görə də ona etibar etməzdən əvvəl buraxılışınızda dəyərin saxlanmasını yoxlayın — açar parametrlər anbarında mövcud olduqdan sonra **oxuma** yolu (`getSettings()` →
> `listMarketplacePlugins()`) onu nəzərə alır.

## Təhlükəsizlik

### Marşrut səviyyəsi — yalnız loopback

Plaginlər yaradılmış alt proseslərdə kod icra etdiyinə görə bütün `/api/plugins`
səthi `LOCAL_ONLY` (Səviyyə 1) kimi təsnif edilir. Loopback məhdudiyyəti istənilən
autentifikasiya yoxlamasından **əvvəl** şərtsiz tətbiq olunur; beləliklə, tunel
vasitəsilə serverə çatan sızdırılmış idarəetmə tokeni belə plaqini quraşdıra,
aktivləşdirə və ya silə bilməz.
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) sənədinə və
Sərt Qaydalar #15 / #17-yə baxın.

### Marketplace reyestrinin SSRF qoruması

Fərdi reyestr URL-si təcavüzkarın təsir edə biləcəyi konfiqurasiyadır, buna görə
`listMarketplacePlugins()` onu əldə etməzdən əvvəl iki qatdan keçirir:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - `http:` / `https:` olmayan hər şeyi rədd edir.
   - Kanonik `isPrivateHost`
     (`src/shared/network/outboundUrlGuard.ts`) vasitəsilə literal özəl/loopback/link-local/ULA hostlarını (IPv4-ə
     uyğunlaşdırılmış ünvanlar daxil olmaqla həm IPv4, **həm də** IPv6) rədd edir.
   - **Həm** `A`, **həm də** `AAAA` qeydlərini həll edir və həll edilmiş
     ünvanlardan **hər hansı biri** özəldirsə, rədd edir — bununla ictimai host adı → özəl IP yan keçidini bağlayır.
   - **Təhlükəsiz şəkildə imtina edir**: DNS həlli uğursuz olduqda URL rədd edilir.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): sorğu zamanı yalnız ictimai URL
   qorumasını yenidən tətbiq edir və **yönləndirmələri bloklayır** (ictimai → özəl `30x`
   keçidi mümkün deyil).

Qatlardan hər hansı birində yoxlamadan keçməyən URL sorğunu dayandırmır —
marketplace səssizcə daxili ilkin reyestrə qayıdır və xəbərdarlıq jurnala yazılır.

> Bu qoruma PR #3774-də xüsusi olaraq A + AAAA qeydlərini həll etmək və
> yalnız IPv4 yoxlaması əvəzinə kanonik `isPrivateHost` istifadə etmək üçün sərtləşdirilib.

### Plaqin icrasının izolyasiyası

- **Proses izolyasiyası** — `loadPlugin()` (`src/lib/plugins/loader.ts`) hər
  plaqini ayrıca Node.js alt prosesində işə salır və IPC üzərindən əlaqə qurur.
  Hook çağırışlarında `SIGTERM` → `SIGKILL` eskalasiyası ilə taymaut tətbiq olunur.
- **Mühit üçün icazə siyahısı** — alt proses yalnız icazə siyahısına daxil edilmiş
  mühit dəyişənlərini qəbul edir; daha geniş dəst yalnız manifest `env`
  icazəsini tələb etdikdə verilir.
- **Yol məhdudiyyəti** — quraşdırma/yeniləmə/silmə əməliyyatları hər hansı
  kopyalama və ya rekursiv silmədən əvvəl plaqin qovluğunun və `manifest.main`
  yolunun idarə olunan plaqin kökü **daxilində** həll olunduğunu təsdiqləyir
  (dəyişdirilmiş DB yollarına və `manifest.main` daxilində `../` keçidinə qarşı qoruyur).
  Aktivləşdirmə simvolik keçidləri `realpath` vasitəsilə həll edir və plaqin
  qovluğundan kənara çıxan giriş nöqtəsini yükləməkdən imtina edir.
- **İxtiyari bütövlük fiksasiyası** — manifest `integrity`
  (`sha256-<base64>`, SRI formatı) sahəsini elan edə bilər. Bu sahə mövcud olduqda
  yükləyici giriş faylının heşini yükləmə zamanı yoxlayır və uyğunsuzluq olarsa
  aktivləşdirmədən imtina edir. Bu, seçimə bağlı dəyişiklik aşkarlama
  mexanizmidir, təhlükəsizlik sərhədi **deyil** — həqiqi sərhədlər yalnız
  loopback marşrutlaşdırması və icazə modelidir.

## Manifest (`plugin.json`)

`PluginManifestSchema` (`src/lib/plugins/manifest.ts`) tərəfindən yoxlanılır:

| Sahə               | Tip       | Qeydlər                                                                   |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `name`             | string    | Məcburidir; kebab-case (`^[a-z0-9-]+$`), 1–100 simvol                     |
| `version`          | string    | Məcburidir; semver (`MAJOR.MINOR.PATCH`)                                  |
| `description`      | string?   | ≤ 500 simvol                                                              |
| `author`           | string?   | ≤ 200 simvol                                                              |
| `license`          | string?   | Standart olaraq `MIT`                                                     |
| `main`             | string?   | Giriş faylı; standart olaraq `index.js`                                   |
| `source`           | enum?     | `local` \| `marketplace` (standart olaraq `local`)                        |
| `tags`             | string[]? | Axtarış teqləri                                                           |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                           |
| `hooks`            | object?   | Plaqinin hansı hook-ları reallaşdırdığını bildirən Bul dəyərləri          |
| `skills`           | object[]? | İxtiyari bacarıq tərifləri                                                |
| `enabledByDefault` | boolean?  | Quraşdırma zamanı avtomatik aktivləşdirmə                                 |
| `configSchema`     | object?   | Konfiqurasiya sahələrinin xəritəsi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | İxtiyari `sha256-<base64>` giriş faylı fiksasiyası                        |

İcazələr
`network` / `file-read` / `file-write` / `env` / `exec`
enumundan götürülür.

## Həyat dövrü axını

```
quraşdırma (POST /api/plugins, yol)
  → manifesti skan et/yoxla → mərhələləmə sahəsinə kopyala → əsas faylın qovluq daxilində olduğunu təsdiqlə
  → atomik şəkildə ~/.omniroute/plugins/<name> ünvanına köçür → verilənlər bazasına sətir əlavə et
  → onInstall hadisəsini işə sal → əgər enabledByDefault: aktivləşdir

aktivləşdirmə (POST /api/plugins/{name}/activate)
  → realpath üzrə qovluq daxilində olma yoxlaması → loadPlugin() (alt proses başlat)
  → elan edilmiş hukları qeydiyyatdan keçir → status = "active" → onActivate hadisəsini işə sal

deaktivləşdirmə (POST /api/plugins/{name}/deactivate)
  → onDeactivate hadisəsini işə sal (qeydiyyatdan çıxarmazdan ƏVVƏL) → hukları qeydiyyatdan çıxar
  → alt prosesi dayandır → status = "inactive"

silmə (DELETE /api/plugins/{name})
  → aktivdirsə deaktivləşdir → onUninstall hadisəsini işə sal
  → plagin qovluğunu qovluq daxilində olma yoxlaması ilə rekursiv sil → verilənlər bazası sətrini sil
```

Manifest versiyası quraşdırılmış versiyadan **ciddi şəkildə daha yeni** olan
qovluq üçün `install` əməliyyatının yenidən icrası avtomatik təkmilləşdirmə həyata
keçirir (təmiz yenidən quraşdırma; konfiqurasiya standart dəyərlərə sıfırlanır).
Eyni və ya daha köhnə versiya rədd edilir.

## Verilənlər bazası

`plugins` cədvəli (`076_create_plugins.sql` miqrasiyası):

| Sütun           | Növ     | Qeydlər                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Unikal                                                 |
| `version`       | TEXT    | semver; standart `1.0.0`                               |
| `description`   | TEXT    | İxtiyari                                               |
| `author`        | TEXT    | İxtiyari                                               |
| `license`       | TEXT    | Standart `MIT`                                         |
| `main`          | TEXT    | Giriş faylı; standart `index.js`                       |
| `source`        | TEXT    | Standart `local`                                       |
| `tags`          | TEXT    | JSON massivi; standart `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; standart 0                                        |
| `manifest`      | TEXT    | Tam manifest JSON-u                                    |
| `config`        | TEXT    | JSON; standart `{}`                                    |
| `config_schema` | TEXT    | JSON; standart `{}`                                    |
| `hooks`         | TEXT    | Elan edilmiş huk adlarının JSON massivi; standart `[]` |
| `permissions`   | TEXT    | JSON massivi; standart `[]`                            |
| `plugin_dir`    | TEXT    | Mütləq quraşdırma qovluğu                              |
| `error_message` | TEXT    | `status = "error"` olduqda təyin edilir                |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Aktivləşdirmə zamanı təyin edilir                      |

Plagin metrikaları/analitikası əlavə cədvəllərdə izlənilir
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## İdarəetmə paneli

`/dashboard/plugins` ünvanındakı idarəetmə paneli səhifəsi
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) iki vərəq təqdim edir:

- **Quraşdırılmışlar** — quraşdırılmış plaginləri elan etdikləri huklarla,
  aktivləşdirmə/deaktivləşdirmə keçidi, silmə düyməsi və "Plaginləri skan et"
  əməliyyatı (`POST /api/plugins/scan`) ilə birlikdə siyahıya alır.
- **Marketpleys** — fərdi reyestr URL-ni təyin etmək üçün sahə ilə birlikdə
  `GET /api/plugins/marketplace` sorğusundan alınan kataloqu göstərir.

Hər plagin üçün ayrıca konfiqurasiya səhifəsi
`/dashboard/plugins/[name]/config` ünvanında yerləşir
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Həmçinin baxın

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  `/api/plugins` marşrutunun niyə yalnız loopback üçün əlçatan olduğu (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — əlaqəli bacarıqlar çərçivəsi
  (`src/lib/skills/`); plaginlər öz manifestlərində bacarıqları elan edə bilər
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hadisələr əsasında işləyən çıxış
  inteqrasiyaları
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  hər bir plagin marşrutunun xəta cavabları üçün istifadə etdiyi `buildErrorBody()` nümunəsi
