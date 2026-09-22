# Router Backends & Embedded Services — architecture contract (ADR) (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Qəbul edilib · **Kontekst:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Müqavilə:** `domain/routing/routerBackends.ts`
> (tipləşdirilmiş reyestr — kod [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ilə əlavə olunur)

Bu ADR `ts` (yerli), `bifrost`, `cliproxy`, `9router` və VibeProxy ilə uyğun mühərriklərin bir-biri ilə necə əlaqəli olduğunu dəqiqləşdirir ki, töhfəçilər arxitektura baxımından fərqli olan iki anlayışı qarışdırmasınlar. O, marşrutlaşdırma backend-i reyestri işi çərçivəsində təqdim edilmiş tipləşdirilmiş reyestri bu model üçün vahid həqiqət mənbəyi kimi sənədləşdirir.

## Əsas fərq — iki ortoqonal ox

Mühərrikin rolu reyestrin `RouterBackendDefinition` daxilində birlikdə kodlaşdırılmış **iki müstəqil ox** ilə təsvir edilir:

1. **Həyat dövrü** (`RouterBackendLifecycle`) — _mühərrikin necə işlədiyi_:
   - `in-process` — OmniRoute Node prosesi daxilində işləyir (yerli TS emal xətti).
   - `supervised` — OmniRoute-un `ServiceSupervisor` vasitəsilə quraşdırdığı/başlatdığı/dayandırdığı/sağlamlığını yoxladığı və sonra provayder bağlantısı kimi istifadə etdiyi lokal alt prosesdir.
   - `external` — OmniRoute-un sorğuları yönləndirdiyi, lakin **idarə etmədiyi** HTTP son nöqtəsidir (mühit dəyişənində baza URL-i ilə konfiqurasiya edilir).
   - `disabled` — qeydiyyatdan keçirilib, lakin seçilə bilməz.
2. **Seçim oxu** (relay marşrutlaşdırma backend-i) — _relay-in sorğuları ona yönləndirib-yönləndirməməsi_:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts` daxilində
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`.

Yol verilməməli səhv: «daxili xidmət» və «marşrutlaşdırma backend-i» anlayışlarını vahid siyahı kimi qəbul etmək. Onlar eyni deyil. `supervised` mühərrik (9router/cliproxy) alternativ relay yönləndirmə backend-i deyil, **yerli emal xəttinin istifadə etdiyi provayder bağlantısıdır**. `bifrost` isə bunun əksidir — (tarixən) yalnız `external` olan relay yönləndirmə backend-idir.

## Reyestr — vahid həqiqət mənbəyi

`domain/routing/routerBackends.ts` müqaviləsi (kod [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ilə əlavə olunur) hər bir mühərriki həyat dövrü, imkanları, xidmət identifikatoru, standart portu, sağlamlıq konfiqurasiyası və telemetriya dəstəyi ilə birlikdə bir dəfə elan edir. İstehlakçılar hər bir yan prosesi xüsusi şərtlərlə idarə etmək əvəzinə mühərrikləri `getRouterBackend(id)`, `listRouterBackends()` və `listRouterBackendsByCapability(cap)` vasitəsilə axtarırlar.

| Backend     | Həyat dövrü  | Xidmət (A oxu) | Relay backend-i (B oxu) | Sağlamlıq     | Standart port |
| ----------- | ------------ | -------------- | ----------------------- | ------------- | ------------- |
| `ts`        | `in-process` | —              | `ts` (yerli)            | —             | —             |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`      | `/health`     | —             |
| `cliproxy`  | `supervised` | `cliproxy`     | — (provayder)           | `/v1/models`  | 8317          |
| `9router`   | `supervised` | `9router`      | — (provayder)           | `/api/health` | 20130         |
| `vibeproxy` | `external`   | —              | — (provayder adapteri)  | `/v1/models`  | —             |

¹ Bifrost-un `/api/services/bifrost/` ünvanından quraşdırıla və başladıla bilən `supervised` daxili xidmətə yüksəldilməsi
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) çərçivəsində izlənilir; bu dəyişiklik birləşdirilənədək Bifrost yalnız `external` olaraq qalır (yalnız `BIFROST_BASE_URL` vasitəsilə əlçatandır).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) çağıran tərəflərə hər bir identifikator üçün ayrıca şərtləri sərt şəkildə kodlaşdırmaq əvəzinə mühərrikləri onların faktiki olaraq nə edə bildiyinə görə filtrləməyə imkan verir.

## Ox A — daxilə yerləşdirilmiş xidmətlər (nəzarət edilən proses tərəfi)

- **Nəzarət edilən proseslərin reyestri:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (hazırda: `9router`, `cliproxy`).
- **Həyat dövrünün sahibi:** `src/lib/services/ServiceSupervisor.ts` — `start()` törəmə
  prosesi işə salır, `waitForHealthy()` ilə hazır olmasını gözləyir, stdout/stderr çıxışını halqavari buferə
  yönəldir; `stop()` SIGTERM→SIGKILL; bunların hamısı kilid altında ardıcıl icra olunur.
- **Vəziyyət birləşməsi** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, üstəlik ayrıca
  `HealthState = healthy | unhealthy | unknown`.
- **Niyə ayrıca prosesdir (prosesdaxili SDK deyil)?** Proses izolyasiyası hər bir sidecar üçün
  quraşdırma/işə salma/dayandırma/sağlamlıq/jurnalları müstəqil şəkildə idarə etməyə imkan verir və
  loopback işəsalma qoruyucusunun tətbiqini təmin edir. Prosesdaxili adapterin modelləşdirilməsi gələcək işdir —
  bu, `native-hot-path` imkan bayrağı vasitəsilə ifadə ediləcək.

### Həyat dövrü marşrutunun müqaviləsi (`/api/services/<tool>/…`)

Status kodları **dizayna əsasən vəziyyət/fel/yol üçün spesifikdir** — bu, uyğunsuzluq deyil,
müqavilədir:

| Çağırış                         | Şərt                            | Status                               |
| ------------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`                | xidmət `not_installed`          | **409** (ilkin şərt)                 |
| `POST .../stop`                 | artıq dayandırılıb              | **200** (idempotent əməliyyatsızlıq) |
| `GET .../status`                | qaydasındadır                   | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                | işəsalma xətası                 | **503** (müvəqqəti)                  |
| `GET .../status`, `.../stop`    | tutulmamış xəta                 | **500**                              |
| `GET /api/services/<x>/logs`    | naməlum alət `<x>`              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`     | `X-Reveal-Confirm: yes` yoxdur  | **403** (yalnız 9router)             |
| **istənilən** `/api/services/*` | çağıran loopback/özəl LAN deyil | **403 LOCAL_ONLY**                   |

Bütün xəta gövdələri `createErrorResponse()` tərəfindən bu formada yaradılır →
`{ error: { message, type }, requestId }`; burada `type` statusdan əldə edilir
(`500→server_error`, `404→not_found`, `409→conflict`, digər hallarda `invalid_request`) və
maşın tərəfindən emal edilə bilən fərqləndiricidir. Mesajlar əvvəlcədən təmizlənir
(`sanitizeErrorMessage()`, Sərt Qayda #12).

**Loopback qoruyucusu** `403` xətasının ən çox rast gəlinən səbəbidir: `/api/services/`
`LOCAL_ONLY_API_PREFIXES` siyahısındadır (`src/server/authz/routeGuard.ts`) və
`src/server/authz/policies/management.ts` loopback və ya özəl LAN-dan olmayan istənilən
çağıranı **autentifikasiyadan əvvəl** rədd edir, çünki bu marşrutlar törəmə proseslər işə salır
(Sərt Qaydalar 15 və 17). Onlara açıq tunel vasitəsilə müraciət edilməsi dizayna əsasən `403` qaytarır.

## Ox B — relay marşrutlaşdırma backend-i (dispetçerləşdirmə tərəfi)

Yalnız `/api/v1/relay/chat/completions` relay proksi yolu dispetçerləşdirmə
backend-i seçir; əsas `/api/v1/chat/completions` səthi heç vaxt
`routingBackend.ts` ilə məsləhətləşmir.

- **Seçim** (`resolveRelayRoutingBackend`): vahid qlobal mühit dəyişdiricisi —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Təyin edilməyibsə, Bifrost konfiqurasiya edilib və aktivdirsə `auto`, əks halda `ts`.
- **Davranış:**
  - `bifrost` (məcburi): Bifrost xətası → sərt `502`, ehtiyat varianta keçid yoxdur.
  - `auto`: Bifrost-u sınayır, xəta/gözləmə müddəti halında səssizcə yerli varianta keçir.
  - `ts` / ehtiyat varianta keçiddən sonra: yerli `open-sse` tərcüməçi/icraçı konveyeri.
- **Gözləmə müddəti:** `bifrostCooldown.ts` daxilində hər `baseUrl` üçün xəta gözləmə müddəti.

Seçim **hazırda relay səviyyəsində ya hamısı, ya heç nə prinsipinə əsaslanır** —
`release/v3.8.43` versiyasında hər provayder və ya hər sorğu üzrə mühərrik dəyişimi yoxdur.
Hər sorğu üzrə yoxlama sidecar manifesti işi ilə əlavə edilir
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`);
bu, `auto` rejiminə yalnız manifestə uyğun provayderləri Bifrost vasitəsilə marşrutlaşdırmağa imkan verir.

## İdarəetmə panelinə inteqrasiya

Xidmətlər idarəetmə paneli hər 5 saniyədən bir
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` vasitəsilə
`GET /api/services/<tool>/status` sorğusu göndərir və `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` qaytarır. Ortaq əlçatanlıq konteksti provayderi yoxdur —
hər komponent hər alət üçün hook-u ayrıca çağırır. `!res.ok` olduqda hook hazırda yalnız
`HTTP <status>` göstərir; `error.type` sahəsinin istifadəçi üçün anlaşılan izahla uyğunlaşdırılması
izlənilən UX təkmilləşdirməsidir, müqavilə dəyişikliyi deyil.

## Nəticələr

- Yeni mühərriklər `ROUTER_BACKENDS` daxilində bir dəfə qeydiyyatdan keçirilir; istehlakçılar onları
  hər id üçün yeni şərt qolları əlavə etmədən imkan sorğuları vasitəsilə əldə edirlər.
- «Bu, xidmətdir, yoxsa marşrutlaşdırma backend-idir?» sualının cavabı id-nin hansı siyahıda
  görünməsindən deyil, `lifecycle` sahəsindən asılıdır.
- Bifrost nəzarəti (#5817) və doğma sürətli yol miqrasiyası (#5670) hər bir köməkçi prosesi
  ayrıca xüsusi hal kimi emal etmək əvəzinə bu ortaq müqavilə üzərində qurulur.
