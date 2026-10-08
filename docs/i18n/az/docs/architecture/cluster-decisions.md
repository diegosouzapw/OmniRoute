# Cluster Decisions — Optional Sidecar Profiles (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Status:** təklif (@diegosouzapw rəyini gözləyir)
**Tarix:** 2026-06-20
**İstinadlar:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Qısa xülasə

[`docker-compose.yml`](../../docker-compose.yml) faylındakı mövcud 8 xidmətli yerləşdirmə üçün aktivləşdirilməsi könüllü olan iki compose profili (`memory`, `bifrost`). Standart işə salınma davranışı **dəyişməz qalır**: 3 × `omniroute` replikası + Caddy + Redis + CliproxyAPI. İki yeni profil Qdrant və Bifrost-u `docker compose --profile <name> up` vasitəsilə aktivləşdirilən əlavə yan konteynerlər kimi təqdim edir. **Heç bir mövcud xidmət silinmir və ya əvəz edilmir.**

## Bu yanaşma niyə konservativdir

OmniRoute-un mövcud yerləşdirmə quruluşu artıq yığcam və özünü doğrultmuşdur:

- **`redis:7-alpine`** istehsal miqyasında sorğu tezliyi məhdudiyyəti/keş iş yükünü idarə edir.
- **SQLite + sqlite-vec + FTS5** lokal yaddaş + vektor + mətn axtarışını təmin edir (bax: [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** artıq yük balanslaşdırıcısı + TLS sonlandırıcısıdır ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** artıq [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) daxilində Tier-1 yönləndiricisi kimi inteqrasiya edilib (`BIFROST_ENABLED` mühit dəyişəni vasitəsilə dayandırma açarı olan yan konteyner proksisi — yan konteyneri keçmək və TS yoluna davam etmək üçün `=0` təyin edin).

Buradakı iki profil **SQLite limitinə çatan yerləşdirmələr üçün miqyaslandırma seçimləridir** — miqrasiyalar deyil. Hər ikisi standart olaraq deaktivdir.

## İki profil

### `memory` — Qdrant Vektor Yaddaşı Yan Konteyneri

**Nə zaman aktivləşdirilməlidir:**

- Hər yerləşdirmə üçün > 1M embedding olduqda (sqlite-vec böyük miqyasda yavaşlamağa başlayır).
- `omniroute-1/2/3` arasında ortaq vektor vəziyyətinə ehtiyacı olan çoxreplikalı yerləşdirmə üçün.
- Artıq xarici Qdrant klasteriniz varsa (Qdrant Cloud, lokal infrastruktur).

**Nə əlavə edir:**

| Xidmət   | Təsvir                  | Portlar     | Qeydlər                                           |
| -------- | ----------------------- | ----------- | ------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW indeksi; daimi `omniroute_qdrant_data` həcmi |

**Aktivləşdirmə:** Parametrlər interfeysində `qdrantEnabled = true` parametrini aktivləşdirin **və ya** `QDRANT_HOST=qdrant` mühit dəyişənini təyin edin. Üstünlük qaydaları üçün [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) faylına baxın (parametrlər cədvəli → mühit dəyişəni → standart dəyər).

**Mühit dəyişənləri:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` faylının 1672-1683-cü sətirlərinə baxın).

### `bifrost` — Bifrost Tier-1 Yönləndirici Yan Konteyneri

**Nə zaman aktivləşdirilməlidir:**

- ≥3 `omniroute` replikası işlədirsinizsə və provayder rotasiyasını vahid Go prosesində mərkəzləşdirmək istəyirsinizsə.
- Bütün replikalardakı yuxarı axın provayder sorğuları üçün vahid audit/jurnallaşdırma səthi istəyirsinizsə.
- Tier-1 yönləndirmə qatını OmniRoute replikalarından asılı olmayaraq üfüqi şəkildə miqyaslandırmaq istəyirsinizsə.

**Nə əlavə edir:**

| Xidmət    | Təsvir                            | Portlar | Qeydlər                                                                      |
| --------- | --------------------------------- | ------- | ---------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go əsaslı Tier-1 yönləndiricisi; daimi `omniroute_bifrost_logs` jurnal həcmi |

**Aktivləşdirmə:** `.env.example` daxilində `BIFROST_BASE_URL=http://bifrost:8080` təyin edin. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ünvanındakı mövcud yan konteyner proksi marşrutu (PR #4381-də əlavə edilib) bunu avtomatik olaraq istifadə edəcək.

**Mühit dəyişənləri:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` faylının 1685-1695-ci sətirlərinə baxın).

## Bu PR-in açıq şəkildə ETMƏDİYİ işlər

İlkin problem müzakirəsində daha geniş klaster yenidənqurması təklif edilmişdi. Faktiki iş yükünün strukturu təhlil edildikdən sonra aşağıdakılar göstərilən səbəblərə görə **rədd edildi**:

| Komponent                            | Qərar         | Səbəb                                                                                                                             |
| ------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ÇIXARILDI** | `redis:7-alpine` istehsal miqyasında sürət məhdudlaşdırma iş yükü üçün artıq kifayətdir; aşılmalı heç bir hədd yoxdur.            |
| **NATS**                             | **ÇIXARILDI** | Hər `omniroute` replikası tək Node.js prosesidir; çoxprosesli dərc/abunə iş yükü mövcud deyil.                                    |
| **PostgreSQL**                       | **ÇIXARILDI** | SQLite + sqlite-vec + FTS5 hər 3 istifadə ssenarisini əhatə edir; 97 miqrasiya və Electron paketləməsi miqrasiyaya mane olur.     |
| **Neo4j**                            | **ÇIXARILDI** | Marşrutlaşdırma 5 cədvəlli birləşmədir; SQLite üzərində rekursiv CTE kifayətdir.                                                  |
| **MinIO**                            | **ÇIXARILDI** | Çox-MB-lıq blob iş yükü yoxdur; şəkillər/audio olduğu kimi ötürən proksilərdən keçir.                                             |
| **pgvector / pg_ai / pg_textsearch** | **ÇIXARILDI** | PostgreSQL ilə eyni SQLite həddi səbəbi; pgvector ekosistemi parçalanıb.                                                          |
| **HAProxy / Envoy**                  | **ÇIXARILDI** | Caddy artıq yük balanslaşdırması + TLS təmin edir; hər ikisi Tier-1 marşrutlaşdırıcı kimi açıq şəkildə rədd edilib (`AGENTS.md`). |

Gələcəkdə hər hansı istifadə ssenarisi bunlardan birinin zəruri olduğunu sübut edərsə, düzəliş edilməli sənəd budur.

## 4 həftəlik tətbiq planı (təsdiqlənərsə)

1. **1-ci həftə** — Bu PR-i birləşdirin + 3 replikalı compose steki ilə seçim əsasında aktivləşdirilən profilləri yoxlayın.
2. **2-ci həftə** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ünvanındakı sidecar proksi marşrutundan istifadə etməklə OpenAI/Claude/Gemini/Ollama (14+ provayderdən 4-ü) üçün Bifrost-u tam aktivləşdirin (`BIFROST_ENABLED` ilə idarə olunur, icra zamanı təcili dayandırıla bilər).
3. **3-cü həftə** — Qdrant yaddaş profilini tək sınaq yerləşdirməsində aktivləşdirin; sqlite-vec ilə müqayisədə gecikmə fərqini ölçün.
4. **4-cü həftə** — Müşahidəolunma sağlamlıq yoxlamaları (`docker compose ps` çıxış kodları + `wget` tüstü testləri); ADR-041 əsasında 71 sütunlu yeniləmə.

## Bu PR-də dəyişdirilən fayllar

| Fayl                                               | Dəyişiklik                                                                                                                                                                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 sətir: `memory` profili (Qdrant), `bifrost` profili (Bifrost), daimi həcmlər, sağlamlıq yoxlamaları.                                                                                                                   |
| `.env.example`                                     | +24 sətir: `QDRANT_*` (6 dəyişən), `BIFROST_*` (4 dəyişən).                                                                                                                                                                |
| `docs/reference/ENVIRONMENT.md`                    | `QDRANT_*` mühit dəyişənləri üçün 25-ci bölməyə +6 sətir.                                                                                                                                                                  |
| `src/lib/memory/qdrant.ts`                         | +33 sətir: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` üçün mühit dəyişəni ehtiyat zənciri (parametrlər → mühit → standart). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 sətir: mühit dəyişəni ehtiyat prioritetini təsbit edən 9 yeni test ssenarisi.                                                                                                                                          |
| `docs/architecture/cluster-decisions.md` (bu fayl) | YENİ — seçim əsasında aktivləşdirilən profillər üçün qərar qeydi.                                                                                                                                                          |
| `AGENTS.md`                                        | +1 sətir: istinad sənədləri cədvəlində bu sənədə keçid.                                                                                                                                                                    |

**Toxunulan kodun yekunu:** 4 istehsal faylı (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test faylı (`qdrant-wiring.test.ts`), 2 sənəd faylı (`cluster-decisions.md`, `AGENTS.md`).
