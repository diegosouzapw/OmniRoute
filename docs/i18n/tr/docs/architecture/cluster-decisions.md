# Cluster Decisions — Optional Sidecar Profiles (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Durum:** öneri (@diegosouzapw incelemesi bekleniyor)
**Tarih:** 2026-06-20
**Referanslar:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Özet

[`docker-compose.yml`](../../docker-compose.yml) içindeki mevcut 8 hizmetli dağıtım için isteğe bağlı iki Compose profili (`memory`, `bifrost`). Varsayılan başlatma davranışı **değişmemiştir**: 3 × `omniroute` replikası + Caddy + Redis + CliproxyAPI. İki yeni profil, `docker compose --profile <name> up` ile etkinleştirilen isteğe bağlı yardımcı konteynerler olarak Qdrant ve Bifrost'u ekler. **Mevcut hiçbir hizmet kaldırılmaz veya değiştirilmez.**

## Bu yaklaşım neden ihtiyatlıdır?

OmniRoute'un mevcut dağıtım yapısı zaten yalın ve kendini kanıtlamıştır:

- **`redis:7-alpine`**, üretim ölçeğindeki hız sınırlama/önbellek iş yükünü yönetir.
- **SQLite + sqlite-vec + FTS5**, yerel bellek + vektör + metin aramasını karşılar (bkz. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy**, zaten yük dengeleyici + TLS sonlandırıcıdır ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost**, [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) içinde Katman 1 yönlendiricisi olarak zaten entegre edilmiştir (`BIFROST_ENABLED` ortam değişkeni üzerinden devre dışı bırakma anahtarına sahip yardımcı konteyner proxy'si — yardımcı konteyneri atlayıp TS yoluna devam etmek için `=0` olarak ayarlayın).

Buradaki iki profil, **SQLite sınırına ulaşan dağıtımlar için ölçek büyütme seçenekleridir** — geçiş değildir. Her ikisi de varsayılan olarak kapalıdır.

## İki profil

### `memory` — Qdrant Vektör Belleği Yardımcı Konteyneri

**Ne zaman etkinleştirilmeli:**

- Dağıtım başına > 1M gömme (sqlite-vec, büyük ölçekte yavaşlamaya başlar).
- `omniroute-1/2/3` arasında paylaşılan vektör durumuna ihtiyaç duyan çok replikalı dağıtım.
- Hâlihazırda harici bir Qdrant kümeniz varsa (Qdrant Cloud, şirket içi).

**Ekledikleri:**

| Hizmet   | İmaj                    | Portlar     | Notlar                                             |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW dizini; kalıcı `omniroute_qdrant_data` birimi |

**Etkinleştirme:** Ayarlar kullanıcı arayüzünde `qdrantEnabled = true` olarak ayarlayın **veya** `QDRANT_HOST=qdrant` ortam değişkenini belirleyin. Öncelik kuralları için [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) dosyasına bakın (ayarlar tablosu → ortam değişkeni → varsayılan).

**Ortam değişkenleri:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (bkz. `.env.example`, 1672-1683. satırlar).

### `bifrost` — Bifrost Katman 1 Yönlendirici Yardımcı Konteyneri

**Ne zaman etkinleştirilmeli:**

- ≥3 `omniroute` replikası çalıştırıyor ve sağlayıcı rotasyonunu tek bir Go sürecinde merkezîleştirmek istiyorsanız.
- Tüm replikalardaki yukarı akış sağlayıcısı istekleri için tek bir denetim/günlükleme yüzeyi istiyorsanız.
- Katman 1 yönlendirme katmanını OmniRoute replikalarından bağımsız olarak yatay biçimde ölçeklendirmek istiyorsanız.

**Ekledikleri:**

| Hizmet    | İmaj                              | Portlar | Notlar                                                                            |
| --------- | --------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go tabanlı Katman 1 yönlendiricisi; kalıcı `omniroute_bifrost_logs` günlük birimi |

**Etkinleştirme:** `.env.example` içinde `BIFROST_BASE_URL=http://bifrost:8080` olarak ayarlayın. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) içindeki mevcut yardımcı konteyner proxy rotası (PR #4381 ile eklenmiştir) bunu otomatik olarak kullanacaktır.

**Ortam değişkenleri:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (bkz. `.env.example`, 1685-1695. satırlar).

## Bu PR'ın açıkça YAPMADIĞI şeyler

İlk sorun başlığında daha kapsamlı bir küme yeniden yazımı gündeme getirildi. Gerçek iş yükü yapısı incelendikten sonra aşağıdakiler, belirtilen nedenlerle **reddedilmiştir**:

| Bileşen                              | Karar         | Gerekçe                                                                                                                        |
| ------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **ÇIKARILDI** | `redis:7-alpine`, üretim ölçeğindeki hız sınırlama iş yükü için zaten yeterlidir; aşılması gereken bir kapasite sınırı yoktur. |
| **NATS**                             | **ÇIKARILDI** | Her `omniroute` replikası tek bir Node.js işlemidir; çok işlemli bir pub/sub iş yükü mevcut değildir.                          |
| **PostgreSQL**                       | **ÇIKARILDI** | SQLite + sqlite-vec + FTS5, 3 kullanım durumunun tümünü kapsar; 97 migrasyon ve Electron paketleme, geçişi engellemektedir.    |
| **Neo4j**                            | **ÇIKARILDI** | Yönlendirme, 5 tablolu bir birleştirmedir; SQLite üzerindeki özyinelemeli CTE yeterlidir.                                      |
| **MinIO**                            | **ÇIKARILDI** | Çok MB'lı blob iş yükü yoktur; görüntüler/sesler doğrudan geçiş proxy'leridir.                                                 |
| **pgvector / pg_ai / pg_textsearch** | **ÇIKARILDI** | PostgreSQL ile aynı SQLite kapasite sınırı gerekçesi geçerlidir; pgvector ekosistemi parçalıdır.                               |
| **HAProxy / Envoy**                  | **ÇIKARILDI** | Caddy zaten yük dengeleme + TLS sağlar; ikisi de 1. Seviye yönlendiriciler olarak açıkça reddedilmiştir (bkz. `AGENTS.md`).    |

Gelecekteki bir kullanım durumu bunlardan birinin gerekliliğini kanıtlarsa değişiklik yapılacak yer bu belgedir.

## 4 haftalık kullanıma alma planı (onaylanırsa)

1. **1. Hafta** — Bu PR'ı birleştirme + 3 replikalı bir compose yığınıyla isteğe bağlı profillerin doğrulanması.
2. **2. Hafta** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) konumundaki sidecar proxy rotası kullanılarak OpenAI/Claude/Gemini/Ollama (14+ sağlayıcının 4'ü) için Bifrost'un tam olarak etkinleştirilmesi (`BIFROST_ENABLED` ile denetlenir, çalışma zamanında devre dışı bırakılabilir).
3. **3. Hafta** — Tek bir test dağıtımında Qdrant bellek profilinin etkinleştirilmesi; sqlite-vec ile karşılaştırmalı gecikme farkının ölçülmesi.
4. **4. Hafta** — Gözlemlenebilirlik sistem durumu kontrolleri (`docker compose ps` çıkış kodları + `wget` duman testleri); ADR-041 uyarınca 71 sütunun yenilenmesi.

## Bu PR'da değiştirilen dosyalar

| Dosya                                               | Değişiklik                                                                                                                                                                                                                   |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 satır: `memory` profili (Qdrant), `bifrost` profili (Bifrost), kalıcı birimler, sistem durumu kontrolleri.                                                                                                               |
| `.env.example`                                      | +24 satır: `QDRANT_*` (6 değişken), `BIFROST_*` (4 değişken).                                                                                                                                                                |
| `docs/reference/ENVIRONMENT.md`                     | `QDRANT_*` ortam değişkenleri için 25. bölüme +6 satır.                                                                                                                                                                      |
| `src/lib/memory/qdrant.ts`                          | +33 satır: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` için ortam değişkeni geri dönüş zinciri (ayarlar → ortam → varsayılan). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 satır: ortam değişkeni geri dönüş önceliğini sabitleyen 9 yeni test durumu.                                                                                                                                              |
| `docs/architecture/cluster-decisions.md` (bu dosya) | YENİ — isteğe bağlı profiller için karar kaydı.                                                                                                                                                                              |
| `AGENTS.md`                                         | +1 satır: referans belgeleri tablosunda bu belgeye işaretçi.                                                                                                                                                                 |

**Değişiklik yapılan net kod:** 4 üretim dosyası (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test dosyası (`qdrant-wiring.test.ts`), 2 belge dosyası (`cluster-decisions.md`, `AGENTS.md`).
