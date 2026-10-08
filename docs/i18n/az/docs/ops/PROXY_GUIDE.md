# 🌐 OmniRoute Proxy Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Coğrafi bloklamaları keçin, kimliyinizi qoruyun və süni intellekt trafikini istənilən proksi üzərindən yönləndirin — heç bir mürəkkəb konfiqurasiya olmadan.**

OmniRoute yuxarı səviyyəli süni intellekt provayderi trafikini HTTP, HTTPS və ya SOCKS5 proksiləri üzərindən yönləndirməyə imkan verən tam funksiyalı proksi idarəetmə sistemini ehtiva edir. Bloklanmış regionda olmağınızdan, IP rotasiyasına ehtiyac duymanızdan və ya gizli barmaq izi maskalanması istəməyinizdən asılı olmayaraq — bu təlimat hər şeyi əhatə edir.

---

## Mündəricat

- [Niyə proksilərdən istifadə etməli?](#why-use-proxies)
- [Arxitekturaya ümumi baxış](#architecture-overview)
- [4 səviyyəli proksi sistemi](#4-level-proxy-system)
- [Proksi reyestri (CRUD)](#proxy-registry-crud)
- [1proxy pulsuz bazarı](#1proxy-free-proxy-marketplace)
- [Proksi rotasiyası](#proxy-rotation)
- [Aşkarlanmadan qorunma və gizlilik](#anti-detection--stealth)
- [Yuxarı səviyyəli proksi rejimləri](#upstream-proxy-modes)
- [İdarəetmə panelinin interfeysi](#dashboard-ui)
- [API arayışı](#api-reference)
- [Mühit dəyişənləri](#environment-variables)
- [Problemlərin aradan qaldırılması](#troubleshooting)

---

## Niyə proksilərdən istifadə etməli?

Bir çox süni intellekt provayderi coğrafi regiona əsasən girişi məhdudlaşdırır. **Rusiya, Çin, İran, Kuba, Türkiyə** və digər ölkələrdəki tərtibatçılar aşağıdakı kimi xətalarla qarşılaşırlar:

```
unsupported_country_region_territory
```

Proksilər hətta bloklanmış regionlardan kənarda da faydalıdır:

| İstifadə ssenarisi        | Təsvir                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **Coğrafi blokdan keçid** | Bloklanmış ölkələrdən OpenAI, Anthropic, Codex və Copilot-a giriş əldə edin          |
| **IP rotasiyası**         | Sürət məhdudiyyətinin qarşısını almaq üçün sorğuları bir neçə IP arasında bölüşdürün |
| **Məxfilik**              | Həqiqi IP ünvanınızı yuxarı səviyyəli provayderlərdən gizlədin                       |
| **Uyğunluq**              | Trafiki müəyyən yurisdiksiyalar üzərindən yönləndirin                                |
| **Sınaq**                 | Müxtəlif regionlardan gələn sorğuları simulyasiya edin                               |

---

## Arxitekturaya ümumi baxış

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute serveri                       │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proksi      │    │ Proksi       │    │ Proksi           │  │
│  │ reyestri    │───▶│ dispetçeri   │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (keşlənmiş)  │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy      │                        │ Yuxarı səviyyəli │  │
│  │ sinxroniz.  │                        │ provayder API-si │  │
│  │ (pulsuz pul)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Əsas komponentlər

| Komponent                    | Fayl                                         | Rol                                                                       |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| **Proksi reyestri**          | `src/lib/db/proxies.ts`                      | Proksi qeydləri və əhatə dairəsi təyinatları üçün CRUD                    |
| **Proksi dispetçeri**        | `open-sse/utils/proxyDispatcher.ts`          | Keşləmə ilə `undici` ProxyAgent/SOCKS dispetçerləri yaradır               |
| **Proksi Fetch**             | `open-sse/utils/proxyFetch.ts`               | `fetch()` funksiyasını proksi dispetçerinin əlavə edilməsi ilə əhatələyir |
| **Parametrlər marşrutu**     | `src/app/api/settings/proxy/route.ts`        | Köhnə proksi konfiqurasiyası API-si (GET/PUT/DELETE)                      |
| **İdarəetmə marşrutu**       | `src/app/api/v1/management/proxies/route.ts` | Reyestr üçün CRUD API-si (GET/POST/PATCH/DELETE)                          |
| **1proxy verilənlər bazası** | `src/lib/db/oneproxy.ts`                     | Pulsuz proksi bazarının davamlı saxlanması                                |

---

## 4 Səviyyəli Proksi Sistemi

OmniRoute proksi konfiqurasiyasını prioritet sırasına görə müəyyən edilən **dörd müstəqil əhatə dairəsində** dəstəkləyir:

```
Prioritetin müəyyən edilməsi sırası (ən yüksək → ən aşağı):

  1. 🔵 Hesab/Bağlantı proksisi  →  hər API açarı / OAuth bağlantısı üçün
  2. 🟡 Provayder proksisi       →  hər provayder üçün (məsələn, bütün OpenAI trafiki)
  3. 🟠 Kombinasiya proksisi     →  hər kombinasiya/marşrutlaşdırma konfiqurasiyası üçün
  4. 🟢 Qlobal proksi            →  bütün trafik, bütün provayderlər
```

### Müəyyən Etmə Prosesi Necə İşləyir

OmniRoute yuxarı səviyyəli provayderə sorğu göndərərkən hər səviyyəni ardıcıllıqla yoxlayan `resolveProxyForConnectionFromRegistry()` funksiyasını çağırır:

1. **Hesab səviyyəsi** — Bu konkret bağlantı ID-si üçün proksi təyin edilibmi?
2. **Provayder səviyyəsi** — Bu provayder üçün (məsələn, `openai`) proksi təyin edilibmi?
3. **Qlobal səviyyə** — Qlobal proksi konfiqurasiya edilibmi?
4. **Proksi yoxdur** — Provayderə birbaşa bağlantı.

İlk uyğunluq seçilir. Bu o deməkdir ki, qlobal proksini ehtiyat variant kimi təyin edə, lakin konkret provayderlər və ya bağlantılar üçün onu əvəz edə bilərsiniz.

### Hansı Trafik Proksidən Keçir

| Trafik növü            | Proksidən keçir? | Qeydlər                                                   |
| ---------------------- | ---------------- | --------------------------------------------------------- |
| Söhbət tamamlamaları   | ✅               | Bütün `/v1/chat/completions` sorğuları                    |
| Vektor təqdimatları    | ✅               | `/v1/embeddings`                                          |
| Şəkil generasiyası     | ✅               | `/v1/images/generations`                                  |
| Audio (TTS/STT)        | ✅               | `/v1/audio/*`                                             |
| OAuth token mübadiləsi | ✅               | `unsupported_country_region_territory` xətasını həll edir |
| Bağlantı sınaqları     | ✅               | "Bağlantını sına" düyməsi proksidən istifadə edir         |
| Tokenin yenilənməsi    | ✅               | Arxa planda OAuth yenilənməsi                             |
| Model sinxronizasiyası | ✅               | Modellərin siyahıya alınması və aşkarlanması              |

---

## Proksi Reyestri (CRUD)

Proksi reyestri bütün proksilərinizi saxlayan SQLite cədvəlidir (`proxy_registry`). Hər proksinin aşağıdakı sahələri var:

| Sahə       | Növ      | Təsvir                                            |
| ---------- | -------- | ------------------------------------------------- |
| `id`       | UUID     | Unikal identifikator                              |
| `name`     | Sətir    | İnsan tərəfindən oxuna bilən etiket               |
| `type`     | Sətir    | Protokol: `http`, `https`, `socks5`               |
| `host`     | Sətir    | Proksi host adı və ya IP ünvanı                   |
| `port`     | Tam ədəd | Port nömrəsi                                      |
| `username` | Sətir    | Doğrulama istifadəçi adı (saxlanarkən şifrələnir) |
| `password` | Sətir    | Doğrulama parolu (saxlanarkən şifrələnir)         |
| `region`   | Sətir    | Coğrafi region etiketi                            |
| `notes`    | Sətir    | Sərbəst mətn qeydləri                             |
| `status`   | Sətir    | `active` və ya `inactive`                         |
| `source`   | Sətir    | `manual` və ya `oneproxy`                         |

### Proksinin Yaradılması

**İdarəetmə paneli vasitəsilə:**

1. **Parametrlər → Proksi** bölməsinə keçin
2. **Proksi əlavə et** düyməsinə klikləyin
3. Növü, hostu, portu və istəyə bağlı doğrulama məlumatlarını doldurun
4. Yadda saxlayın

**API vasitəsilə:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Proksinin Yenilənməsi

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Qeyd:** Açıq şəkildə boş olmayan əvəzləyici dəyərlər göndərmədiyiniz halda giriş məlumatları qorunur. `username`/`password` üçün boş sətirlər göndərildikdə saxlanılan dəyərlər dəyişməz qalır.

### Proksinin Silinməsi

```bash
# Proksi hər hansı əhatə dairəsinə təyin edilibsə, uğursuz olur
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Məcburi silmə (təyinatları da silir)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Proksilərin Siyahılanması

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Proksilərin Əhatə Dairələrinə Təyin Edilməsi

```bash
# Qlobal əhatə dairəsinə təyin et
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Konkret provayderə təyin et
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Konkret bağlantıya/açara təyin et
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Effektiv Proksinin Müəyyən Edilməsi

Verilmiş bağlantı üçün hansı proksidən istifadə ediləcəyini yoxlayın:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Müəyyən edilmiş proksini onun səviyyəsi (`account`, `provider` və ya `global`) və mənbəyi ilə birlikdə qaytarır.

### Kütləvi Təyinat

Bir proksini eyni anda bir neçə provayderə və ya bağlantıya təyin edin:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### İdxal/İxrac

Proksilər **Ehtiyat Nüsxələmə/Bərpa** sisteminə daxildir. OmniRoute konfiqurasiyanızı ixrac etdikdə:

1. **İdarəetmə paneli → Parametrlər → Ehtiyat nüsxə** bölməsinə keçin
2. **İxrac et** düyməsinə klikləyin — proksi reyestri və təyinatlar daxil edilir
3. Bərpa etmək üçün **İdxal et** düyməsinə klikləyin və ehtiyat nüsxə faylını yükləyin

Proksi reyestri həmçinin **host+port üzrə upsert** əməliyyatını dəstəkləyir — artıq mövcud olan proksini (eyni host və portla) idxal etsəniz, dublikat yaratmaq əvəzinə mövcud proksi yenilənir.

### Köhnə Versiyadan Miqrasiya

Əgər proksiləri köhnə versiyada (reyestrdən əvvəlki) konfiqurasiya etmisinizsə, OmniRoute onları avtomatik miqrasiya edir:

```
Köhnə key_value yaddaşı → proxy_registry + proxy_assignments
```

Bu, təkmilləşdirmədən sonra ilk işə salınma zamanı bir dəfə baş verir. Yenidən icra etmək üçün `migrateLegacyProxyConfigToRegistry({ force: true })` istifadə edin.

---

## 1proxy Pulsuz Proksi Bazarı

> 🆕 **Töhfə verən: [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Məsələ [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute dünyanın hər yerindən **yüzlərlə pulsuz, yoxlanılmış proksiyə** giriş təmin etmək üçün **[1proxy](https://1proxy-api.aitradepulse.com)** icma platforması ilə inteqrasiya olunur. Bu, öz proksi infrastrukturu olmayan istifadəçilər üçün idealdır.

### İş Prinsipi

```
┌─────────────┐  Sinxronizasiya ┌─────────────────┐  Rotasiya   ┌──────────┐
│  1proxy API │ ───────────────▶ │  proxy_registry  │ ───────────▶ │ Provayder│
│   (xarici)  │  500 proksiyə   │  source=oneproxy │ keyfiyyətə  │   API    │
└─────────────┘      qədər       └─────────────────┘    görə      └──────────┘
```

1. **Sinxronizasiya** — OmniRoute yoxlanılmış proksiləri 1proxy API-dən əldə edir
2. **Saxlama** — Proksilər eyni `proxy_registry` cədvəlində `source = 'oneproxy'` ilə saxlanılır
3. **Filtrləmə** — Protokola, ölkəyə və keyfiyyət balına görə filtrləyin
4. **Rotasiya** — Keyfiyyət, təsadüfi və ya ardıcıl strategiyalardan istifadə edərək ən yaxşı proksini seçin
5. **Avtomatik zəiflətmə** — Uğursuz proksilərin keyfiyyət balı azaldılır; həddən aşağı düşdükdə → qeyri-aktiv kimi işarələnir

### Proksilərin Sinxronizasiyası

**İdarəetmə Paneli Vasitəsilə:**

1. **Parametrlər → 1proxy** bölməsinə keçin
2. **"İndi Sinxronlaşdır"** düyməsinə klikləyin
3. Statistikaya baxın: ümumi proksi sayı, aktiv proksilərin sayı, orta keyfiyyət və ölkələr üzrə bölgü

**API Vasitəsilə:**

```bash
# Sinxronizasiyanı başladın
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Cavab:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proksilərin Filtrlənməsi

```bash
# Protokola görə filtrləyin
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Ölkəyə görə filtrləyin
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Minimum keyfiyyət balına görə filtrləyin
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Filtrləri birləşdirin
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proksi Keyfiyyət Balları

Hər bir 1proxy proksisi metadata ilə təqdim olunur:

| Sahə            | Təsvir                                            |
| --------------- | ------------------------------------------------- |
| `qualityScore`  | 1proxy yoxlamasından alınan 0-100 balı            |
| `latencyMs`     | Ölçülmüş şəbəkə gecikməsi                         |
| `anonymity`     | `transparent`, `anonymous` və ya `elite`          |
| `googleAccess`  | Proksinin Google xidmətlərinə daxil olub-olmaması |
| `countryCode`   | İki hərfli ISO ölkə kodu                          |
| `lastValidated` | Son yoxlamanın vaxt damğası                       |

Keyfiyyət balları dinamik şəkildə tənzimlənir:

- **Uğursuz sorğular** balı 10 xal azaldır
- **Bal ≤10 səviyyəsinə düşdükdə** → proksi `inactive` kimi işarələnir
- Qeyri-aktiv proksilər rotasiyadan çıxarılır

### Rotasiya Strategiyaları

```bash
# Keyfiyyətə görə rotasiya (əvvəlcə ən yaxşı proksi) — standart
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Təsadüfi rotasiya
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Ardıcıl (əvvəlcə ən uzun müddət əvvəl yoxlanılan)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Dövrə Qırıcı

1proxy sinxronizasiyasının daxili dövrə qırıcısı var:

- **Ardıcıl 5 sinxronizasiya uğursuzluğundan** sonra növbəti sinxronizasiya cəhdləri bloklanır
- Bu əmrlə sıfırlayın: `resetOneproxyCircuitBreaker()` və ya serveri yenidən başladın
- Sinxronizasiya statusu `GET /api/settings/oneproxy?action=status` ünvanında mövcuddur

### 1proxy Proksilərinin Təmizlənməsi

```bash
# Tək bir 1proxy proksisini silin
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# BÜTÜN 1proxy proksilərini təmizləyin (əl ilə əlavə edilmiş proksilərə toxunulmur)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Aşkarlanmadan Yayınma və Gizlilik

OmniRoute trafiki sadəcə proksi üzərindən yönləndirmir — həm də trafikin legitim görünməsini təmin edir:

### TLS Barmaq İzinin Saxtalaşdırılması

Brauzerə bənzər TLS barmaq izləri yaratmaq üçün `wreq-js` istifadə edir və brauzer olmayan TLS əlaqə qurma cəhdlərini işarələyən bot aşkarlama sistemlərindən yayınır.

### CLI Barmaq İzinin Uyğunlaşdırılması

**CLI Barmaq İzi Dəyişdiricisi** (`Parametrlər → Təhlükəsizlik`) HTTP başlıqlarını və JSON gövdəsindəki sahələri yerli CLI binar fayllarının (Claude Code, Codex və s.) dəqiq imzasına uyğunlaşdırmaq üçün yenidən sıralayır. Bu, proksi ilə **birlikdə** işləyir:

```
IP ünvanınız (bloklanıb) → Proksi IP-si (ABŞ) → Provayder API-si
                           + TLS saxtalaşdırması
                           + CLI barmaq izi
```

Beləliklə, eyni vaxtda həm **IP maskalanması**, həm də **sorğunun autentikliyi** təmin edilir.

### Proksi IP-sinin Qorunması

İdarəetmə panelindəki rəng kodlu nişanlar hansı proksi səviyyəsinin aktiv olduğunu göstərir:

| Nişan | Səviyyə   | Mənası                                           |
| ----- | --------- | ------------------------------------------------ |
| 🟢    | Qlobal    | Bütün trafik bu proksi üzərindən keçir           |
| 🟡    | Provayder | Yalnız bu provayderin trafiki proksiləşdirilir   |
| 🔵    | Bağlantı  | Bu konkret açar/hesab bu proksidən istifadə edir |

Nişan həmçinin yoxlama üçün müəyyən edilmiş proksi IP-sini göstərir.

---

## Yuxarı Axın Proksi Rejimləri

CLIProxyAPI modelindən istifadə edən provayderlər üçün OmniRoute üç yuxarı axın proksi rejimini dəstəkləyir:

| Rejim         | Təsvir                                                         |
| ------------- | -------------------------------------------------------------- |
| `native`      | OmniRoute proksi yönləndirməsini birbaşa idarə edir (standart) |
| `cliproxyapi` | İdarəetməni xarici CLIProxyAPI instansiyasına ötürür           |
| `fallback`    | Əvvəlcə yerli rejimi sınayır, sonra CLIProxyAPI-yə keçir       |

Hər provayder üçün ayrıca konfiqurasiya edin:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## İdarəetmə Panelinin İnterfeysi

### Parametrlər → Proksi Vərəqi

- **Qlobal proksi** konfiqurasiyası (bütün trafik üçün bir dəfə təyin edilir)
- **Hər provayder üzrə proksi** əvəzləmələri
- **Hər bağlantı üzrə proksi** təyinatları
- Konfiqurasiya edilmiş proksi vasitəsilə **bağlantı testi**
- Aktiv proksi səviyyəsini göstərən **rəng kodlu nişanlar**

### Parametrlər → 1proxy Vərəqi

- Pulsuz proksiləri əldə etmək üçün **İndi Sinxronlaşdır** düyməsi
- **Statistika kartları**: Ümumi, Aktiv, Orta Keyfiyyət, Son Sinxronizasiya
- **Filtrlər**: Protokol, Ölkə Kodu, Minimum Keyfiyyət
- Host, protokol, ölkə, keyfiyyət göstəricisi, gecikmə, anonimlik və Google-a girişi göstərən **proksi cədvəli**
- Uğurlu/uğursuz cəhdlərin və ardıcıl uğursuzluqların sayının izlənildiyi **sinxronizasiya statusu** paneli
- Bütün 1proxy qeydlərini silmək üçün **Hamısını Təmizlə**

---

## API Arayışı

### Proksi Parametrləri API-si

| Metod    | Son Nöqtə                                      | Təsvir                               |
| -------- | ---------------------------------------------- | ------------------------------------ |
| `GET`    | `/api/settings/proxy`                          | Tam proksi konfiqurasiyasını əldə et |
| `GET`    | `/api/settings/proxy?level=global`             | Qlobal proksini əldə et              |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Provayder proksisini əldə et         |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Effektiv proksini müəyyən et         |
| `PUT`    | `/api/settings/proxy`                          | Proksi konfiqurasiyasını yenilə      |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Səviyyədəki proksini sil             |

### Proksi Reyestri API-si

| Metod    | Son Nöqtə                                         | Təsvir                                   |
| -------- | ------------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Bütün proksiləri siyahıla                |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proksini ID üzrə əldə et                 |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proksi təyinatlarını əldə et             |
| `POST`   | `/api/v1/management/proxies`                      | Proksi yarat                             |
| `PATCH`  | `/api/v1/management/proxies`                      | Proksini yenilə                          |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proksini sil                             |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Məcburi sil                              |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Kütləvi təyinat apar                     |
| `GET`    | `/api/v1/management/proxies/assignments`          | Təyinatları siyahıla                     |
| `GET`    | `/api/v1/management/proxies/health`               | Proksi sağlamlığı statistikasını əldə et |

### Tunellər API-si

OmniRoute instansiyanızı proksi üzərindən çıxış trafikini yönləndirmək əvəzinə ictimai internetdə (Cloudflare/ngrok/Tailscale) əlçatan etmək üçün [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) sənədinə baxın. Tunelin REST API-si `/api/tunnels/{cloudflared,ngrok,tailscale}/*` altında yerləşir və yuxarıda sənədləşdirilmiş çıxış proksi zəncirindən müstəqildir.

### 1proxy API-si

| Metod    | Son Nöqtə                              | Təsvir                                           |
| -------- | -------------------------------------- | ------------------------------------------------ |
| `GET`    | `/api/settings/oneproxy`               | 1proxy proksilərini siyahıla                     |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Statistikanı və sinxronizasiya statusunu əldə et |
| `GET`    | `/api/settings/oneproxy?action=status` | Yalnız sinxronizasiya statusunu əldə et          |
| `POST`   | `/api/settings/oneproxy`               | Sinxronizasiyanı işə sal                         |
| `POST`   | `/api/settings/oneproxy/rotate`        | Növbəti proksiyə keç                             |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Birini sil                                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Hamısını təmizlə                                 |

### Yuxarı Axın Proksi API-si

| Metod    | Son Nöqtə                         | Təsvir                                       |
| -------- | --------------------------------- | -------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Yuxarı axın proksi konfiqurasiyasını əldə et |
| `PUT`    | `/api/upstream-proxy/:providerId` | Yuxarı axın proksi rejimini təyin et         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Yuxarı axın proksi konfiqurasiyasını sil     |

---

## Mühit Dəyişənləri

| Dəyişən               | Standart | Təsvir                                                                                     |
| --------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `ENABLE_SOCKS5_PROXY` | `true`   | SOCKS5 proksi dəstəyini aktivləşdirir (`.env.example` daxilində standart dəyər `true`-dur) |

---

## Problemlərin Aradan Qaldırılması

### "SOCKS5 proxy is disabled"

`.env` faylınızda `ENABLE_SOCKS5_PROXY=true` təyin edin və yenidən başladın.

### Proksi vasitəsilə "socket hang up" xətaları

Boşdayanma bağlantılarını kəsən ucuz proksilərdə bu normaldır. OmniRoute bunu artıq aşağıdakı üsullarla idarə edir:

- Proksi bağlantılarında keep-alive funksiyasını deaktiv edir (`keepAliveTimeout: 1`)
- Pipelining funksiyasını deaktiv edir (`pipelining: 0`)
- Təkrar əl sıxmalarının qarşısını almaq üçün dispetçerləri keşləyir

Problem davam edərsə, başqa proksini sınayın və ya 1proxy rotasiya funksiyasından istifadə edin.

### OAuth zamanı "unsupported_country_region_territory"

OAuth axınını başlatmazdan **əvvəl** proksinin konfiqurasiya edildiyinə əmin olun. OmniRoute OAuth token mübadiləsini konfiqurasiya edilmiş proksi vasitəsilə yönləndirir. Əvvəlcə qlobal və ya provayder səviyyəli proksi təyin edin, sonra qoşulun.

### Proksi istifadə edilmir

Həlletmə ardıcıllığını yoxlayın:

1. `GET /api/settings/proxy?resolve=your-connection-id` ilə yoxlayın
2. Proksinin `status` dəyərinin `active` (`inactive` deyil) olduğunu yoxlayın
3. Proksi təyinatının əhatə dairəsinin bağlantınıza uyğun olduğuna əmin olun

### 1proxy sinxronizasiyası uğursuz olur

Sinxronizasiya statusunu yoxlayın:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Əgər `consecutiveFailures >= 5` olarsa, dövrə kəsici işə düşüb. Sıfırlamaq üçün serveri yenidən başladın və ya əl ilə sıfırlanmasını gözləyin.

---

## Verilənlər Bazası Sxemi

### `proxy_registry` Cədvəli

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' və ya 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (yalnız 1proxy)
  latency_ms INTEGER,                        -- millisaniyə (yalnız 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- Google-a daxil ola bilər? (1proxy)
  last_validated TEXT,                       -- ISO zaman möhürü (1proxy)
  country_code TEXT,                         -- ISO 2 hərfli kod (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### `proxy_assignments` Cədvəli

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- provayder ID-si, bağlantı ID-si və ya kombinasiya ID-si
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proksi Sağlamlığının Yoxlanılması (v3.8.16+)

OmniRoute-un **proksi sürətli uğursuzluq** mexanizmi (`src/lib/proxyHealth.ts`) sürətli TCP bağlantı yoxlaması vasitəsilə işləməyən proksiləri <2s ərzində aşkarlayır, sonra hər sorğu üzrə əlavə yükün qarşısını almaq üçün **nəticəni keşləyir**.

### İş Prinsipi

```
Sorğu ──▶ ProxyHealthCache.get(url)
             │
             ├─ Keşdə tapıldı + yenidir?  ──▶ keşlənmiş statusu qaytar
             │
             └─ Keşdə yoxdur / köhnədir?  ──▶ host:port ünvanına TCP bağlantısı
                                              (taymaut: FAST_FAIL_TIMEOUT_MS)
                                              ──▶ HEALTH_CACHE_TTL_MS müddətinə keşlə
                                              ──▶ nəticəni qaytar
```

Bu mexanizm olmasa, işləməyən proksi uğursuzluqla nəticələnməzdən əvvəl hər sorğunu tam `PROXY_TIMEOUT_MS` müddəti (standart olaraq 30s) ərzində bloklayardı.

### Tənzimlənə Bilən Mühit Dəyişənləri

| Dəyişən                      | Standart | Məqsəd                                             |
| ---------------------------- | -------- | -------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`   | Hər sağlamlıq yoxlaması üçün TCP bağlantı taymautu |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`  | Sağlamlıq nəticəsinin keşlənmə müddəti             |

**Tövsiyə olunan dəyərlər:**

| Ssenari                          | Sürətli uğursuzluq taymautu | Keş TTL-i | Əsaslandırma                                                                           |
| -------------------------------- | --------------------------- | --------- | -------------------------------------------------------------------------------------- |
| Yüksək ötürücülüklü API şlüzü    | 1500ms                      | 60000ms   | Aqressiv sürətli uğursuzluq, yoxlamaları azaltmaq üçün daha uzun keş                   |
| Coğrafi paylanmış qovşaqlar      | 3000ms                      | 15000ms   | Daha yavaş şəbəkələrə daha çox vaxt lazımdır; sürətli ehtiyat keçid üçün daha qısa keş |
| Hazırlama / sınaq                | 1000ms                      | 10000ms   | Lokal proksilərdə sürətli iterasiya                                                    |
| Gizlilik / aşkarlanmadan yayınma | 2500ms                      | 45000ms   | Sürət məhdudiyyətlərini işə sala biləcək sürətli yoxlamalardan yayınma                 |

### Proksi Sağlamlığının Yoxlanması

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Konkret proksinin təkrar yoxlanmasını məcbur et
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Keş qeydi `HEALTH_CACHE_TTL_MS` müddətini keçdikdə və növbəti sorğu yeni yoxlamanı başladacaqsa, `stale` bayrağı `true` olur.

### Proksi Növünə Görə Standart Dəyərlər

Sağlamlıq yoxlaması URL sxeminə əsaslanan uyğun standart dəyərlərdən istifadə edir:

| Sxem                       | Standart port |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

URL-dəki fərdi portlar (`http://host:9999`) həmişə sxemin standart dəyərindən üstün tutulur.

---

## Proksi Analitikası və Müşahidəolunma

OmniRoute operatorlara marşrutlaşdırma nümunələrini, gecikmə sıçrayışlarını və təkrarlanan nasazlıqları müəyyənləşdirməyə kömək etmək üçün hər proksi üzrə istifadəni izləyir.

### Nələr İzlənilir

Konfiqurasiya edilmiş proksi vasitəsilə göndərilən hər sorğu üçün OmniRoute aşağıdakıları qeydə alır:

| Metrika      | Təsvir                                                              |
| ------------ | ------------------------------------------------------------------- |
| `proxy_url`  | Tam proksi URL-i (autentifikasiya məlumatları maskalanmış şəkildə)  |
| `provider`   | Yuxarı axın provayderinin ID-si (openai, anthropic və s.)           |
| `latency_ms` | Proksi əlaqəsinin qurulması daxil olmaqla ümumi gediş-gəliş müddəti |
| `connect_ms` | Yalnız TCP bağlantısının qurulma müddəti                            |
| `status`     | Yuxarı axından alınan HTTP status kodu                              |
| `error`      | Sorğu uğursuz olarsa, xəta sinfi                                    |
| `timestamp`  | ISO 8601 UTC                                                        |

### Məlumatlara Giriş

```bash
# Son proksi hadisələri
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Faktiki son nöqtə `/api/usage/proxy-logs`-dur (bax: `src/app/api/usage/proxy-logs/route.ts`). Bu son nöqtə aşağıdakıları dəstəkləyir:

- `GET /api/usage/proxy-logs` — proksi jurnallarını əldə etmək
- `DELETE /api/usage/proxy-logs` — bütün proksi jurnallarını təmizləmək

Lazım olduqda, ümumiləşdirilmiş statistik göstəriciləri SQL vasitəsilə birbaşa `proxy_logs` cədvəlindən sorğulamaq olar. İdarəetmə panelinin istifadəçi interfeysi ümumiləşdirilmiş görünüşlər təklif edə bilər.

### Ümumi Nümunələr

**Qeyri-sabit proksini aşkarlamaq** (uğur və uğursuzluq arasında növbələşir):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Yavaş proksiləri tapmaq** (p95 gecikməsi > 2 san.):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Rotasiya Strategiyası üçün Qərar Ağacı

Bir əhatə dairəsinə bir neçə proksi təyin edildikdə, OmniRoute hər sorğu üçün hansının istifadə ediləcəyini seçmək məqsədilə **rotasiya strategiyasından** istifadə edir. Strategiya əhatə dairəsi səviyyəsində konfiqurasiya edilir (qlobal, hər provayder, hər hesab və hər kombinasiya üzrə).

### Mövcud Strategiyalar

| Strategiya           | Nə zaman istifadə edilməlidir                           | Kompromis                                                                                     |
| -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `quality` (standart) | Müxtəlif keyfiyyətli proksilərin olduğu istehsal mühiti | Yüksək reytinqli proksilərə üstünlük verir; aşağı reytinqli proksiləri istifadəsiz qoya bilər |
| `random`             | Yükün paylanması, məxfilik                              | Bərabər paylanma; keyfiyyət siqnallarını nəzərə almır                                         |
| `sequential`         | Sazlama, deterministik sınaq                            | Proksiləri ardıcıllıqla dövr edir; məntiqini anlamaq asandır                                  |

### Qərar Ağacı

```
                    Proksiləriniz üçün keyfiyyət balları varmı?
                    │
        ┌───────────┴───────────┐
        │                       │
       BƏLİ                    XEYR
        │                       │
   Bütün proksilər             │
   keyfiyyət baxımından         │
   təxminən bərabərdirmi?       │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
 BƏLİ      XEYR               İstifadə edin:
   │         │              `random`
   │         │              (bərabər paylanma
   │         │              zamanla keyfiyyət
   │         │              məlumatı toplayır)
   │         │
   │    İstifadə edin: `quality`
   │    (müxtəlif keyfiyyət
   │    səviyyələri üçün ən yaxşısı)
   │
İstifadə edin: `random`
(yükü bərabər
paylayır)
```

## Öz Proksiləriniz üçün Avtomatik Nasazlıq İstisnası

1proxy marketplace hovuzu artıq nasaz proksilərin prioritetini avtomatik olaraq azaldır (bax:
[Proksi Keyfiyyət Balları](#proxy-quality-scores)). Reyestrə **sizin** əlavə etdiyiniz
proksilər üçün fon rejimində işləyən sağlamlıq planlaşdırıcısı
(`src/lib/proxyHealth/scheduler.ts`) heç nəyi silmədən eyni «işləməyən üzvü
zəncirdən avtomatik çıxarma» davranışını təmin edir:

```bash
# .env — ardıcıl 3 uğursuz yoxlamadan sonra proksini proqram təminatı səviyyəsində deaktiv edin və
# yoxlamalara yenidən cavab verməyə başladıqda onu avtomatik olaraq aktivləşdirin.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Bunun çoxproksili zəncirə uyğunlaşması:

1. Planlaşdırıcı qeydiyyatdan keçmiş hər proksini hər `PROXY_HEALTH_INTERVAL_MS`
   intervalında yoxlayır (standart olaraq 10 dəq.; minimum 1 dəq.).
2. `PROXY_AUTO_REMOVE_AFTER` sayda ardıcıl **qəti** uğursuzluqdan sonra (real
   bağlantı xətası — taymaut və ya yoxlama hədəfinin öz 5xx xətası heç vaxt nəzərə
   alınmır, bax: [Proksi Sağlamlığının Yoxlanması](#proxy-health-checking-v3816)),
   proksinin `status` dəyəri `dead` olaraq təyin edilir.
3. `dead`, hovuz/rotasiya həlli tərəfindən istifadə edilən aktiv status filtrinin
   istisna etdiyi statuslardan biridir, buna görə əhatə dairəsinin rotasiyası
   (dairəvi / təsadüfi / sabit / gecikmə — bax:
   [Rotasiya Strategiyası üzrə Qərar Ağacı](#rotation-strategy-decision-tree))
   həmin proksini yeni sorğulara dərhal verməyi dayandırır. Hovuzdakı digər
   proksilərə təsir göstərilmir və bütün hovuz heç vaxt xəbərdarlıq etmədən birbaşa
   bağlantıya keçmir — [4 Səviyyəli Proksi Sistemi](#4-level-proxy-system)
   bölməsindəki xəta zamanı bağlı qalma qoruyucusuna baxın.
4. Planlaşdırıcı `dead` proksiləri eyni intervalda yoxlamağa davam edir. Növbəti
   uğurlu yoxlama `status` dəyərini yenidən `active` vəziyyətinə keçirir və proksi
   rotasiyaya qayıdır — əl ilə yenidən əlavə etmək tələb olunmur.

Bu funksiya qəsdən **seçim əsasında aktivləşdirilir və dağıdıcı deyil**: standart
olaraq planlaşdırıcı yalnız uğursuzluqları sayır və qeydə alır (`decision.ts`
faylındakı C siyasətinə baxın), `PROXY_AUTO_DISABLE` isə heç vaxt sətri silmir —
bunun üçün ayrıca, daha sərt `PROXY_AUTO_REMOVE` bayrağı nəzərdə tutulub. Hər
ikisi `true` olaraq təyin edilərsə, `PROXY_AUTO_REMOVE` üstünlük təşkil edir
(silinmək üzrə olan proksini bu arada proqram təminatı səviyyəsində deaktiv
etməyin faydası yoxdur). Dəyişənlərin tam siyahısı üçün
[Mühit Konfiqurasiyası](../reference/ENVIRONMENT.md) arayışına baxın.

---

> 📖 **Əlaqəli sənədlər:**
>
> - [İstifadəçi Təlimatı](../guides/USER_GUIDE.md) — Ümumi quraşdırma və konfiqurasiya
> - [API Arayışı](../reference/API_REFERENCE.md) — Tam API sənədləri
> - [Mühit Konfiqurasiyası](../reference/ENVIRONMENT.md) — Bütün mühit dəyişənləri
