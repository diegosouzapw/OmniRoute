# Monitoring & Observability Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Qısa xülasə**: OmniRoute daxili sağlamlıq monitorinqi, provayder avtopilotu, kvota izləmə və müşahidə ediləbilənlik inteqrasiya nöqtələri ilə təchiz edilir. Bu təlimatda idarəetmə paneli, xəbərdarlıqlar və problemlərin aradan qaldırılması əhatə olunur.

**Mənbələr:**

- `src/lib/monitoring/observability.ts` — müşahidə ediləbilənlik anlıq görüntüsü
- `src/lib/monitoring/comboHealthAutopilot.ts` — kombinasiya sağlamlığı avtopilotu
- `src/lib/monitoring/providerHealthAutopilot.ts` — provayder avtopilotu
- `src/lib/monitoring/providerHealthMatrix.ts` — provayder sağlamlığı matrisi
- `src/lib/localHealthCheck.ts` — lokal sağlamlıq yoxlaması
- `src/lib/tokenHealthCheck.ts` — token yeniləmə sağlamlığı
- `src/lib/proxyHealth.ts` — proksi sağlamlığı keşi (PROXY_GUIDE.md faylında əhatə olunur)

---

## İcmal

OmniRoute **3 monitorinq səviyyəsinə** malikdir:

```
┌──────────────────────────────────────────────────────────────┐
│  Səviyyə 1: Sistem sağlamlığı (server səviyyəsində)           │
│  ├─ localHealthCheck.ts — DB, portlar, yerli asılılıqlar      │
│  ├─ db/healthCheck.ts — bütövlük, FK, sahibsiz artefaktlar    │
│  └─ İdarəetmə paneli: /dashboard/health                      │
├──────────────────────────────────────────────────────────────┤
│  Səviyyə 2: Provayder sağlamlığı (hər provayder üzrə dayanıqlılıq) │
│  ├─ providerHealthAutopilot.ts — dövrə açarı, fasilələr       │
│  ├─ providerHealthMatrix.ts — provayder/model üzrə sağlamlıq balları │
│  └─ İdarəetmə paneli: /dashboard/providers                   │
├──────────────────────────────────────────────────────────────┤
│  Səviyyə 3: Canlı müşahidə ediləbilənlik (icra vaxtı görüntüləri) │
│  ├─ observability.ts — dövrə açarları, sessiyalar, kvota      │
│  ├─ tokenHealthCheck.ts — OAuth token yeniləmə sağlamlığı    │
│  └─ MCP alətləri: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## İdarəetmə Paneli Səhifələri

### `/dashboard/health` (Sistem Sağlamlığı)

Yuxarı səviyyəli sağlamlıq idarəetmə panelində aşağıdakılar göstərilir:

| Bölmə                  | Nəyi göstərir                                              |
| ---------------------- | ---------------------------------------------------------- |
| **Server statusu**     | İşləmə müddəti, versiya, port, aktiv bağlantılar           |
| **Verilənlər bazası**  | Bağlantı, bütövlük, WAL ölçüsü, son miqrasiyalar           |
| **Provayder xülasəsi** | Aktiv say, sağlam say, açıq dövrə açarlarının sayı         |
| **Kvota monitorları**  | Aktiv sessiyalar, xəbərdarlıq vəziyyəti, tükənmiş kvotalar |
| **Son xətalar**        | Stek izləri ilə birlikdə son 10 xəta                       |
| **Resurs istifadəsi**  | Yaddaş, CPU, hip təzyiqi göstəricisi                       |

### `/dashboard/providers` (Provayder Sağlamlığı)

Hər provayder üzrə idarəetmə paneli:

| Sütun       | Təsvir                                                         |
| ----------- | -------------------------------------------------------------- |
| Provayder   | Provayder ID-si + göstərilən ad                                |
| Sağlamlıq   | Yaşıl/sarı/qırmızı status                                      |
| Dövrə       | Açıq/qapalı/yarıaçıq vəziyyət                                  |
| Bağlantılar | Bağlantıların sayı, son yenilənmə                              |
| Modellər    | Mövcud modellər, hər model üzrə sağlamlıq                      |
| Xərc        | Bugünkü xərc, 7 günlük tendensiya                              |
| Xətalar     | Son 24 saatdakı xətaların sayı, ən çox rast gəlinən xəta sinfi |

Aşağıdakı məlumatları görmək üçün provayderə klikləyin:

- Gecikmə bölgüsü ilə son sorğular
- Hər bağlantı üzrə sağlamlıq balları
- Hər model üzrə bloklamalar
- Avtopilot tövsiyələri

### `/dashboard/quota` (Kvota İzləmə)

Hər API açarı üçün:

- Cari istifadə və limitin müqayisəsi (irəliləyiş zolağı)
- Kvota tendensiyası (30 günlük qrafik)
- Növbəti sıfırlanma vaxtı
- Xəbərdarlıq tarixçəsi

### `/dashboard/combos` (Kombinasiya Sağlamlığı)

Hər kombinasiya üzrə:

- Strategiya + hədəflər
- Hər hədəf üzrə sağlamlıq
- Son ehtiyat hədəfə keçid hadisələri
- Uğur faizi (24 saat, 7 gün, 30 gün)

---

## Sağlamlıq Yoxlaması API-si

OmniRoute **iki** HTTP sağlamlıq səthi təqdim edir. Orkestratorlar üçün onlar bir-birini əvəz etmir.

| Yol                          | Məqsəd                                                           | Yük                                | İstifadə sahəsi                                                                   |
| ---------------------------- | ---------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| `GET /healthz`               | Həyat dövrü canlılığı/hazırlığı (`ok` / `starting` / `stopping`) | Cüzi (yalnız mərhələ bayrağı)      | Kubernetes **hazırlığı**; HTTP istifadə etməlisinizsə, yumşaq **canlılıq**        |
| `GET /api/monitoring/health` | Dərin sistem + provayder xülasəsi (DB, heap, kataloq sayları, …) | Ağır (sinxron DB / monitorinq işi) | İdarə panelləri, blackbox dərin yoxlamaları, Docker-in daxili sağlamlıq yoxlaması |

> **Qeyd:** Provayder sağlamlıq matrisləri, autopilot problemləri, kvota monitorları, token sağlamlığı və `/api/monitoring/health` çərçivəsindən kənar gecikmə təfərrüatları **MCP aləti** `observability_snapshot` və ya **idarə paneli** səhifələri vasitəsilə əlçatandır — bunlar üçün ayrıca REST marşrutları yoxdur.

Hər iki marşrut sorğuların emalı ilə **eyni Node hadisə dövrəsində** işləyir. CPU-yə bağlı yol (böyük `GET /v1/models` kataloq işi, uzun kontekstin sıxılması / tokenlərin sayılması) `/healthz` daxil olmaqla **bütün** HTTP emalçılarında gecikmə yarada bilər. Hadisə dövrəsinin məşğul olması ≠ prosesin dayanması. Yük yaradan səbəbi aradan qaldırmağa üstünlük verin; yoxlamanın tənzimlənməsi yalnız yanlış dayandırmaların sayını azaldır.

### Yüngül orkestrator yoxlaması

```bash
GET /healthz
# və ya HEAD /healthz
```

- Serverin həyat dövrü mərhələsi hazır olduqda **200** + `ok` gövdəsi
- Başlatma və ya dayandırma zamanı **503** + `starting` / `stopping`
- Reallaşdırma: `src/app/healthz/route.ts` (DB ping-i yoxdur)

### Sistem sağlamlığı (dərin)

```bash
GET /api/monitoring/health
```

Cavab:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: yoxlama keşi və SQLite `test_status` müqayisəsi

`GET /api/monitoring/health` → `credentialHealth`, `provider_connections.test_status` sahəsinin canlı çıxarışı deyil, **yaddaşdaxili yoxlama keşi
göstəricisidir**. #12532-dən sonra sorğu yolu yalnız
`getCachedCredentialHealthSummary()` funksiyasını oxuyur; fon yoxlamaları keşi
hadisə dövrəsindən kənarda yeniləyir.

| Səviyyə                     | Yer                                                                   | Mənası                                                                                                                                                                                                                          |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoxlama keşi göstəricisi    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Proses yaddaşında hələ də saxlanılan son etimadnamə sağlamlığı yoxlamalarının nəticələri. `source` həmişə `probe-cache` olur.                                                                                                   |
| Uğursuz bağlantı təfərrüatı | `credentialHealth.failedConnections`                                  | **Yalnız `failed > 0` olduqda** mövcuddur. `status=error` olan keş sətirlərinin məhdud siyahısı (`connectionId`, `status`, təmizlənmiş `lastError` / `lastErrorType`). Siyahı məhdudlaşdırıldıqda `failedOmitted` təyin edilir. |
| SQLite sabit statusu        | `credentialHealth.staleDbNonOkCount`                                  | Saxlanılan `test_status` dəyəri məlum qeyri-normal statuslardan biri (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`) olan **aktiv** (`is_active=1`) bağlantı sətirlərinin sayı.               |

Bu iki səviyyə məqsədli şəkildə fərqlənə bilər:

- `staleDbNonOkCount>0` olduğu halda göstəricidə `failed=0` — SQLite-da hələ də
  son yoxlama keşi görüntüsünün `status=error` kimi hesablamadığı sabit
  `test_status` (məsələn, `expired` və ya `credits_exhausted`) mövcuddur.
- SQLite sağlam göründüyü halda göstəricidə `failed>0` — son yoxlama uğursuz olub və
  keşlənib; DB sətri yenilənməyib və ya daha sonra təmizlənib.

Bu son nöqtədən məlumat toplayarkən yalnız `provider_connections.test_status`
əsasında xəbərdarlıq yaratmayın. Canlı yoxlama uğursuzluqları üçün `failed` +
`failedConnections`, saxlanılan sabit statusların sayı lazım olduqda isə
`staleDbNonOkCount` istifadə edin.

### Kubernetes yoxlaması üçün tövsiyələr

OmniRoute **vahid Node prosesidir** (bir hadisə dövrəsi). Standart Docker `HEALTHCHECK` yüngül `/healthz` marşrutunu hədəfləyir. `/api/monitoring/health` kubelet canlılıq intervalları üçün **həddindən artıq ağırdır**.

| Yoxlama             | Tövsiyə olunan hədəf                                                            | Qeydlər                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Başlanğıc**       | Uzun `failureThreshold` (və ya böyük `startPeriod`) ilə HTTP `GET /healthz`     | Soyuq başlanğıc + SQLite miqrasiyası bir neçə saniyədən çox çəkə bilər                                                                                                                                                                                                                                                                                                                                             |
| **Hazırlıq**        | HTTP `GET /healthz`                                                             | Həyat dövrü `ok` / `starting` / `stopping` (200 və ya 503). Dövr CPU tərəfindən bloklanarsa, vəziyyət yenə də tez-tez dəyişir. **Bir neçə saniyəyə gələn 200 sağlamlıq göstəricisi deyil** (#10303) — bu, 3 baytlıq emalçı işə düşməzdən əvvəl hadisə dövrəsinin resurs çatışmazlığı yaşadığını göstərir                                                                                                           |
| **Canlılıq**        | HTTP `GET /livez` **və ya** əsas xidmət portunda TCP (`PORT`, standart `20128`) | `/livez` yalnız prosesin işlək olduğunu göstərir (emalçı işləyərsə, həmişə 200 qaytarır). O, yenə də eyni hadisə dövrəsindən istifadə edir — məşğul ≠ ölü və hadisə dövrəsinin resurs çatışmazlığını (#10303) TCP-dən daha yaxşı aşkarlamır. Kataloq/sıxılma yükü altında HTTP yoxlamalarının vaxtı bitirsə, **TCP**-yə üstünlük verin; hər iki halda qısa hadisə dövrəsi dayanmasına görə pod-u **dayandırmayın** |
| **Dərin sağlamlıq** | Xarici yoxlayıcıdan `GET /api/monitoring/health`                                | kubelet `livenessProbe` / sərt `readinessProbe` üçün deyil                                                                                                                                                                                                                                                                                                                                                         |

Nümunə struktur (hədləri soyuq başlanğıc və sıxılma yükünüzə uyğunlaşdırın):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Hadisə dövrəsi dayandıqda HTTP /livez üçün də vaxt bitə bilər. TCP
  # daha konservativ alternativdir:
  # tcpSocket:
  #   port: http
```

kubelet **canlılıq** yoxlamasını `/api/monitoring/health` ünvanına **yönəltməyin**. Bu yol real DB/monitorinq işi görür və yük altında yanlış müsbət nəticə verəcək.

Əlaqəli: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (hadisə dövrəsi məşğul olarkən yoxlamalar), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (kataloq qiymətləndirməsinin resursları zəbt etməsi), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (sıxılma üçün token sayımının resursları zəbt etməsi).

### systemd nəzarətçisi (donmuş hadisə dövrəsi)

systemd hostunda OmniRoute hazır olduqda bunu xidmət menecerinə bildirir və ona müntəzəm siqnallar göndərir; beləliklə, hadisə dövrəsi ilişib qalmış server işlək və səssiz qalmaq əvəzinə dayandırılıb yenidən başladılır. Siqnallar serverin öz hadisə dövrəsindən gəlir: dövrə bloklandıqda siqnallar dayanır və `WatchdogSec` müddəti ərzində heç bir siqnal alınmazsa, systemd xidməti yenidən başladır.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) artıq bu parametrlərlə istifadəçi vahidi yaradır. Özünüz yaratdığınız vahiddə (standart `Type=simple`) nəzarətçi olmur, buna görə onun `[Service]` bölməsinə bu sətirləri əlavə edin:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Yaradılan vahid `Restart=on-failure` parametrini təyin edir, ona görə həmin sətri də əlavə edin — bu parametr olmadan nəzarətçi ilişib qalmış xidməti yenidən başlatmaq əvəzinə yalnız dayandırır.

- `Type=notify`: proses fork edildikdə deyil, server `READY=1` göndərdikdə xidmət "başladılmış" sayılır. `TimeoutStartSec` ləng başlanğıcı məhdudlaşdırır.
- `NotifyAccess=all`: siqnallar `omniroute serve` nəzarətçisinin törəmə prosesi olan server prosesi tərəfindən göndərilir.
- `WatchdogSec`: siqnallar hər 60 saniyədən bir göndərilir, buna görə **120 və ya daha çox** istifadə edin. Daha kiçik dəyərlər sağlam serveri yenidən başladardı.
- `omniroute serve` əmrini ön planda işlədin. `--daemon` serveri vahidin cgroup-undan ayırır və bildiriş razılaşması heç vaxt tamamlanmır.

Yenidən başladıqdan sonra onun aktiv olduğunu yoxlayın:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` konfiqurasiya edilmiş gecikməni göstərir və `WatchdogTimestamp` hər dəqiqə irəliləyir. Nəzarətçinin səbəb olduğu yenidən başlatma `Result=watchdog` kimi qeydə alınır. Vahidi olduğu kimi saxlayaraq siqnalları söndürmək üçün `OMNIROUTE_DISABLE_SD_NOTIFY=1` təyin edin; `NOTIFY_SOCKET` olmadıqda (terminal, Docker, Electron, Windows) heç nə göndərilmir.

Nəzarətçi yalnız hadisə dövrəsinin işləməyə davam etdiyini yoxlayır. Ləng işləyən, lakin hələ də dövr etməyə davam edən server yenidən başladılmır.

### Sorğu yolunda əlavə işlər (yaddaş, bacarıqlar, token yeniləməsi)

Yaddaşın çıxarılması, bacarıqların yeridilməsi və OAuth tokeninin yenilənməsi `/healthz` ilə eyni **əsas Node hadisə dövrəsini** paylaşır. Bunlar işçi hovuzu deyil, idarəetmə panelindən aktivləşdirilib-deaktivləşdirilən funksiyalardır (`memoryEnabled`, `skillsEnabled`). Baxın: [Mühit — hadisə dövrəsi xərci](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Provayderin vəziyyəti

> **REST son nöqtəsi yoxdur.** Provayderin vəziyyəti haqqında məlumatlara MCP aləti `observability_snapshot` və ya idarəetmə panelindəki `/dashboard/providers` səhifəsi vasitəsilə baxmaq olar.

### Provayder təfərrüatları

> **REST son nöqtəsi yoxdur.** Hər bir provayder üzrə təfərrüatlara idarəetmə panelindəki `/dashboard/providers` səhifəsi vasitəsilə baxmaq olar.

---

## Provayder Sağlamlığı Avtopilotu

`providerHealthAutopilot.ts` modulu aşağıdakıları yerinə yetirən **özünü bərpa edən sistemdir**:

1. Provayder problemlərini aşkarlayır (dövrə açıqdır, gözləmə müddətləri, bloklamalar, kvota xəbərdarlıqları)
2. Onları həll etmək üçün **tövsiyə olunan tədbirlər** yaradır
3. Aşağı riskli tədbirləri istəyə bağlı olaraq **avtomatik icra edir**

### Aşkarlanan Problem Növləri

| Problem növü                 | Ciddilik    | Nümunə şərt                                    |
| ---------------------------- | ----------- | ---------------------------------------------- |
| `provider_circuit_open`      | kritik      | 5 uğursuzluqdan sonra dövrə qoruyucusu açıqdır |
| `provider_circuit_half_open` | xəbərdarlıq | Dövrənin bərpası sınaqdan keçirilir            |
| `connection_cooldown`        | xəbərdarlıq | 429-dan sonra bağlantı gözləmə müddətindədir   |
| `stale_connection_error`     | xəbərdarlıq | Son yeniləmə 30+ dəqiqə əvvəl uğursuz olub     |
| `terminal_connection_error`  | kritik      | OAuth ləğv edilib, açar etibarsızdır           |
| `inactive_connection`        | məlumat     | Bağlantı ayarlarda deaktiv edilib              |
| `model_lockout`              | xəbərdarlıq | Konkret model karantindədir                    |
| `quota_monitor_warning`      | xəbərdarlıq | Kvota istifadəsi 80%+ səviyyəsindədir          |

### Yaradılan Tədbir Növləri

| Tədbir                         | Risk   | Təsvir                                            |
| ------------------------------ | ------ | ------------------------------------------------- |
| `clear_provider_breaker`       | orta   | Dövrə qoruyucusunu qapalı vəziyyətə sıfırlamaq    |
| `clear_connection_cooldown`    | aşağı  | Bağlantının gözləmə müddətini aradan qaldırmaq    |
| `clear_stale_connection_error` | aşağı  | Köhnəlmiş xəta bayrağını təmizləmək               |
| `clear_model_lockout`          | aşağı  | Karantinə alınmış modeli yenidən aktivləşdirmək   |
| `reactivate_connection`        | orta   | Deaktiv edilmiş bağlantını yenidən aktivləşdirmək |
| `deactivate_connection`        | yüksək | Problemli bağlantını deaktiv etmək                |

### API

> **REST son nöqtəsi yoxdur.** Avtopilot problemləri MCP aləti `observability_snapshot` və ya idarəetmə paneli vasitəsilə əlçatandır. Avtopilot daxildə işləyir; onun davranışı mühit dəyişənləri ilə deyil, ayarlar verilənlər bazası vasitəsilə (hər bağlantı üçün `autopilotMode` sahəsi) konfiqurasiya edilir — avtopilot rejimi üçün mühit dəyişənini axtaran `grep -rn` sıfır nəticə qaytarır.

### Avtopilot Rejimi

Avtopilot standart olaraq **əl rejimində** işləyir — problemləri aşkarlayır və tövsiyə olunan tədbirlər yaradır, lakin onları avtomatik tətbiq etmir. Tədbirlər idarəetmə paneli vasitəsilə tətbiq edilə bilər.

---

## Kombinasiya Sağlamlığı Avtopilotu

`comboHealthAutopilot.ts` provayder avtopilotunun **kombinasiyalara xas** ekvivalentidir. O:

- Sağlam olmayan kombinasiyaları aşkarlayır
- Hədəflərin yenidən sıralanmasını tövsiyə edir
- İşləməyən hədəflərin deaktiv edilməsini təklif edir
- N sayda uğursuzluqdan sonra işləməyən hədəfləri avtomatik silir

### Kombinasiya Problemi Nümunələri

```
Kombinasiya "always-on" (prioritet strategiyası)
├─ Hədəf 1: openai/gpt-5 (sağlam)
├─ Hədəf 2: anthropic/claude-opus-4-6 (⚠️ model saat 14:00-a qədər bloklanıb)
└─ Hədəf 3: kiro/claude-sonnet-4-5 (sağlam)

Tövsiyə olunan tədbir: Yenidən sırala — bloklama bitənə qədər kiro-nu anthropic-dən yuxarı daşı
```

---

## Kvota Monitorları

`observability.ts` abunə əsaslı provayderlər (Claude Code, Codex, GitHub Copilot) üçün **hər sessiyaya aid kvota monitorlarını** təqdim edir:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Statusların Mənaları

| Status      | Nə zaman               | UI tədbiri                                 |
| ----------- | ---------------------- | ------------------------------------------ |
| `starting`  | İlkin sorğu davam edir | Yüklənmə indikatoru                        |
| `idle`      | Son fəaliyyət yoxdur   | İdarəetmə panelində gizlədilir             |
| `healthy`   | Kvotanın > 50%-i qalıb | Yaşıl nöqtə                                |
| `warning`   | Kvotanın < 50%-i qalıb | Sarı xəbərdarlıq                           |
| `exhausted` | Kvota = 0%             | Qırmızı blok, növbəti provayderə yönləndir |
| `error`     | Sorğulama uğursuz oldu | Qırmızı nöqtə, tezliklə yenidən cəhd et    |

### API

> **REST son nöqtəsi yoxdur.** Kvota monitoru məlumatları MCP aləti `observability_snapshot` və ya idarəetmə paneli vasitəsilə əlçatandır.

---

## Müşahidəolunma Anlıq Görüntüsü

MCP aləti `observability_snapshot` AI agentləri üçün **sistemin tam anlıq görüntüsünü** qaytarır:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* yuxarıya baxın */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agentlər bundan **marşrutlaşdırma qərarları** vermək üçün istifadə edirlər — məsələn, "əgər openai dövrəsi açıqdırsa, əvvəlcə anthropic-ə yönləndir".

---

## Token Sağlamlığının Yoxlanılması

OAuth provayderləri (Claude Code, GitHub Copilot, Cursor) **tokenlərin vaxtaşırı yenilənməsini** tələb edir. `src/lib/tokenHealthCheck.ts` arxa fon planlaşdırıcısını işə salır:

- **Yoxlama dövrü**: hər 60 saniyədən bir (`src/lib/tokenHealthCheck.ts:30` ünvanında `TICK_MS = 60 * 1000` ilə yoxlama)
- **Hər bağlantı üzrə sağlamlıq yoxlaması intervalı**: standart olaraq 60 dəqiqə (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); parametrlər verilənlər bazası vasitəsilə konfiqurasiya edilə bilər
- **401 zamanı qabaqlayıcı yeniləmə**: hər bağlantı üzrə interceptor tərəfindən idarə olunur

### Token Sağlamlığı Statusu

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiqurasiya

Token sağlamlığı yoxlamasının konfiqurasiyası `tokenHealthCheck.ts` tərəfindən daxili şəkildə idarə olunur.

### Token Sağlamlığı

> **REST son nöqtəsi yoxdur.** Token sağlamlığı məlumatları idarəetmə paneli və ya MCP aləti `observability_snapshot` vasitəsilə əlçatandır.

---

## Xəbərdarlıq

### Daxili Kanallar

OmniRoute **3 xəbərdarlıq kanalını** dəstəkləyir:

| Kanal                    | Quraşdırma               | İstifadə halı                   |
| ------------------------ | ------------------------ | ------------------------------- |
| İdarəetmə paneli banneri | Həmişə aktivdir          | Tətbiqdaxili bildirişlər        |
| Webhook                  | URL-i konfiqurasiya edin | Slack, Discord, PagerDuty       |
| Jurnal                   | Standart                 | Xarici jurnal aqreqasiyası üçün |

### Webhook Konfiqurasiyası

> **Qeyd:** Webhook xəbərdarlıq konfiqurasiyası idarəetmə panelindəki Parametrlər səhifəsi vasitəsilə idarə olunur. Webhook URL-i, hadisə filtrasiyası və faydalı yükün fərdiləşdirilməsi üçün Parametrlər istifadəçi interfeysinə baxın.

### Xəbərdarlıq Növləri

| Xəbərdarlıq                  | Nə zaman                                            | Standart ciddilik |
| ---------------------------- | --------------------------------------------------- | ----------------- |
| `provider_circuit_open`      | Dövrə açıldıqda                                     | kritik            |
| `provider_circuit_half_open` | Dövrənin bərpası sınaqdan keçirildikdə              | məlumat           |
| `quota_warning`              | Kvota 80% və ya daha çox olduqda                    | xəbərdarlıq       |
| `quota_exhausted`            | Kvota 100% olduqda                                  | kritik            |
| `token_refresh_failed`       | Ardıcıl 3 və ya daha çox yeniləmə uğursuz olduqda   | xəbərdarlıq       |
| `token_expired`              | Tokenin müddəti bitdikdə                            | kritik            |
| `combo_target_unhealthy`     | Combo hədəfi 1 saatdan çox soyuma rejimində olduqda | xəbərdarlıq       |
| `db_integrity_warning`       | FK pozuntularının sayı 0-dan çox olduqda            | xəbərdarlıq       |
| `heap_pressure`              | Heap istifadəsi həddin 80%-ni keçdikdə              | xəbərdarlıq       |

---

## Performans Metrikaları

### İzlənilən Metrikalar

| Metrika                 | Növ       | Mənbə                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | sayğac    | `services/usage.ts`             |
| `request_latency_ms`    | histoqram | `services/usage.ts`             |
| `tokens_consumed`       | sayğac    | `services/usage.ts`             |
| `cost_usd`              | sayğac    | `services/usage.ts`             |
| `provider_errors`       | sayğac    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | sayğac    | `services/resilience.ts`        |
| `cache_hits`            | sayğac    | `services/signatureCache.ts`    |
| `compression_savings`   | histoqram | `services/compression/stats.ts` |
| `quota_used`            | göstərici | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | göstərici | `observability.ts`              |

### Gecikmə Persentilləri (p50/p95/p99)

> **REST son nöqtəsi yoxdur.** Gecikmə persentili məlumatları idarəetmə panelinin `/dashboard/health` səhifəsində mövcuddur. Prometheus/OpenTelemetry ixracı v3.9 üçün planlaşdırılıb.

### Prometheus / OpenTelemetry İxracı (Mərhələ 2)

v3.9 üçün planlaşdırılıb: Prometheus, OpenTelemetry və Datadog sistemlərinə yerli ixrac.

Hələlik, istənilən HTTP əsaslı monitorinq sistemi (Prometheus blackbox exporter, Datadog HTTP yoxlaması və s.) ilə `/api/monitoring/health` ünvanından məlumatları toplayın.

---

## Xəbərdarlıq Reseptləri

### Slack

> **Qeyd:** Webhook xəbərdarlıqları idarəetmə panelinin Settings səhifəsindən konfiqurasiya edilir — ayrıca webhook mühit dəyişənləri yoxdur (`grep -rn` sıfır nəticə qaytarır). Webhook URL-i, hadisələrin filtrlənməsi və faydalı yükün fərdiləşdirilməsi üçün Settings interfeysinə baxın.

### Discord

> Webhook xəbərdarlıqları Slack ilə eyni Settings interfeysi axınından istifadə edir. Discord eyni JSON faydalı yük strukturunu qəbul edir.

### PagerDuty

> Webhook xəbərdarlıqları eyni Settings interfeysi axınından istifadə edir. PagerDuty Events API v2 marşrutlaşdırma açarları Settings interfeysində konfiqurasiya edilir.

### Fərdi Webhook (JSON)

> JSON gövdəsi ilə POST sorğularını qəbul edən istənilən HTTP son nöqtəsi işləyəcək. URL-i Settings interfeysində konfiqurasiya edin.

---

## İdarəetmə Panelinin Konfiqurasiyası

### Sağlamlıq İdarəetmə Panelini Fərdiləşdirin

`~/.omniroute/dashboard.json` faylı yaradın:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Təchizatçını Yuxarıda Sabitləyin

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Problemlərin Aradan Qaldırılması

### "Təchizatçı sağlam olduğunu bildirir, lakin sorğular uğursuz olur"

1. **Avtopilot problemlərini** yoxlayın — ola bilsin ki, model bloklanıb
2. Konkret xəta sinfi üçün **son xətalara** baxın
3. Təchizatçı kartındakı **bağlantı testini** sınayın
4. Təchizatçının **yuxarı axında sürət məhdudiyyətinə məruz qalıb-qalmadığını** yoxlayın (lokal olaraq görünmür)

### "Kvota sağlam görünür, lakin 429 xətaları alıram"

- 429 təchizatçının kvotanızı istifadə edib bitirdiyinizi bildirməsi deməkdir
- OmniRoute-un kvota izləməsi **köhnəlmiş** ola bilər — əsas həqiqət təchizatçının yuxarı axınındadır
- Kvota məlumatları daxili kvota monitoru vasitəsilə avtomatik yenilənir

### "Kombinasiya uğursuz olur, lakin bütün hədəflər sağlam görünür"

- Hədəflərin sıralanması ilə bağlı problemlər üçün **kombinasiya sağlamlığı** idarəetmə panelini yoxlayın
- **Ehtiyat varianta keçid hadisələrinə** baxın — ola bilsin ki, kombinasiya imkanlarını həddən artıq tez tükəndirir
- **Strategiyanın** istifadə ssenarinizə uyğun olduğunu yoxlayın (prioritet, növbəli və ya avtomatik)

### "Verilənlər bazasının sağlamlıq yoxlaması uğursuz olur"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` əmrini işə salın
- Nəticə "ok" olarsa — bu, yanlış həyəcan siqnalıdır, sağlamlıq yoxlaması həddindən artıq sərtdir
- Başqa nəticə olarsa — **OmniRoute-u dayandırın** və [fəlakətdən sonra bərpa təlimatına](./DATABASE_GUIDE.md#disaster-recovery) əməl edin

### "Yaddaş yığınına düşən yük kritikdir"

```bash
# Cari yaddaş yığınını yoxlayın
node -e "console.log(process.memoryUsage())"

# GC-ni əl ilə başladın (--expose-gc istifadə edilirsə)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Paralel sorğuların sayını azaldın (mühit dəyişəni ilə deyil, idarəetmə panelinin Settings səhifəsindən təyin edilir)
# `MAX_CONCURRENT_REQUESTS` mühit dəyişəni yoxdur — bunu Settings → Concurrency bölməsində konfiqurasiya edin.
```

---

## Həmçinin baxın

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — istifadə və xərcin izlənməsi
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB sxemi + sağlamlıq vəziyyəti
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proksi sağlamlığı (ayrıca keş)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — sistem arxitekturası
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — dövrə açarının təfərrüatları
- Mənbə: `src/lib/monitoring/` (4 fayl, 2121 LOC)
