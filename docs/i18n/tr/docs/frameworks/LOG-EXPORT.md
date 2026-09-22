# Log export (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute çağrı günlüklerinin harici bir analiz deposuna sürekli ve artımlı olarak aktarılması.

Günlükler panosu sekmesi, istek geçmişini rotasyon ve saklama süresiyle sınırlandırılan SQLite'ta (`call_logs`) tutar. Günlük aktarımı, aynı kayıt kümesini belirli bir zamanlamayla dışarı göndererek kayıtların yerel veritabanından daha uzun süre saklanabilmesini ve diğer verilerle birleştirilebilmesini sağlar. İlk hedef BigQuery'dir; işlem hattı bir kayıt sistemi olduğundan daha fazla hedef eklenebilir.

---

## 1. Nasıl çalışır

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Günlükler sekmesindeki alan kümesi)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Zamanlama** — varsayılan olarak `0 * * * *` (saatlik, UTC) değerini kullanan tek bir `JobRegistry` cron işi: `log_export`. `src/lib/initCloudSync.ts` içinde kaydedilir; `OMNIROUTE_LOG_EXPORT_CRON` ile geçersiz kılınabilir. Her tetikleme, **etkin** hedeflerin tümünü sırayla boşaltır.
- **İmleç** — SQLite'ın örtük `call_logs.rowid` değeri, hedef başına `log_export_destinations.cursor_row_id` içinde kalıcı olarak saklanır. `timestamp` özellikle imleç olarak kullanılmaz: çağıranlar kendi değerlerini sağlayabilir; dolayısıyla yavaş bir istek, daha sonra başlayan daha hızlı bir isteğin ardından yazılabilir ve zaman damgası imleci bu isteği atlar.
- **Gruplama** — istek başına `batch_size` satır (varsayılan 500), çalıştırma başına `max_rows_per_run` satır (varsayılan 10000); böylece büyük bir birikim tek bir çalıştırmayı engellemek yerine birkaç tetikleme boyunca boşaltılır.
- **Teslimat** — imleç yalnızca `send()` sonuçlandıktan sonra ilerler. Başarısız olan bir grup, imleci bulunduğu yerde bırakır; böylece aynı satırlar bir sonraki çalıştırmada yeniden denenir. Sağlanan garanti, gerçek anlamda tam olarak bir kez teslim değil, en az bir kez teslim ile hedef tarafında yinelenen kayıtların kaldırılmasıdır: BigQuery, her satırı çağrı günlüğü kimliğine göre anahtarlar ve bunu kendi yinelenen kayıtları kaldırma penceresi içinde mümkün olan en iyi şekilde uygular.
- **Çakışma koruması** — cron tetiklemesi ile `POST .../run` aynı anda çalışabilir. Hâlihazırda boşaltılmakta olan bir hedef, iki kez boşaltılmak yerine atlanır (çalıştırma sonucunda `skipped: true`); böylece eşzamanlı bir çalıştırma bir grubu yeniden gönderemez veya imleci geriye yazamaz.
- **Temizleme sonrası kurtarma** — `cursor_row_id`, `MAX(rowid)` değerinin üzerinde kalırsa (tablonun tamamı temizlenmiş ve satır kimlikleri yeniden başlamışsa), çalıştırıcı kalıcı olarak veri göremez hâle gelmek yerine imleci 0'a geri sarar.

### Yükler (istemler ve tamamlamalar)

Aktarım, varsayılan olarak yalnızca Günlükler **listesinin** gösterdiği özet alanlarını taşır. **İstemleri ve yanıtları aktar** (`includeBodies`) seçeneğinin etkinleştirilmesi, ayrıca Günlükler **ayrıntı** bölmesinin her çağrı için gösterdiği bilgileri gönderir:

| Alan                             | İçeriği                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `request_body` / `response_body` | Çağrı yüklerinin panoda görüntülendiği biçimi                                 |
| `pipeline_route_decision`        | Yönlendiricinin seçtiği hedef ve model                                        |
| `pipeline_client_request`        | İstemcinin gönderdiği ham isteğin birebir hâli                                |
| `pipeline_openai_request`        | Dahili OpenAI biçimine çevrildikten sonraki hâli                              |
| `pipeline_provider_request`      | Sağlayıcı lehçesinde, üst hizmete gerçekten gönderildiği hâli                 |
| `pipeline_provider_response`     | Üst hizmetten gelen ham yanıt                                                 |
| `pipeline_client_response`       | Çağırana geri verilen içerik                                                  |
| `pipeline_error`                 | Başarısız bir çağrıya ait işlem hattı düzeyindeki hata ayrıntısı              |
| `bodies_truncated`               | Yukarıdaki alanlardan herhangi biri `maxBodyBytes` sınırına ulaştığında doğru |

Bu, istem içeriğidir; bu nedenle **varsayılan olarak kapalıdır** ve özellikle hedef bazında seçilir. Gönderilen içerik, panonun gösterdiği içerikle aynıdır; çünkü her ikisi de `getCallLogById` üzerinden okur: yükler yazıldıkları sırada zaten kişisel olarak tanımlanabilir bilgilerden arındırılmış ve gizli bilgiler maskelenmiştir. Ayrıca `noLog` API anahtarıyla yapılan bir çağrı hiçbir yük saklamaz; dolayısıyla aktarılacak bir şey yoktur.

Yükler, dosya sistemi yapıtından satır başına okunur; bu nedenle veriyle zenginleştirme yalnızca bunu isteyen hedefler için çalışır. Yapıtı eksik veya bozuk olan bir satır, grubu başarısız kılıp imleci kilitlemek yerine özetini null yüklerle aktarır.

`maxBodyBytes` (varsayılan 262144), her alanın boyutunu sınırlar. Daha uzun yükler **atılmak yerine kısaltılır** — kırpılmış bir istem yine de "ne soruldu" sorusunu yanıtlar — ve satır `bodies_truncated` ile işaretlenir. Parça parça akışla iletilen farklar aktarılmaz; birleştirilmiş yanıt zaten `pipeline_provider_response` ve `pipeline_client_response` içindedir.

---

## 2. Dosyalar

| Parça                        | Konum                                        |
| ---------------------------- | -------------------------------------------- |
| Hedef sözleşmesi             | `src/lib/logExport/types.ts`                 |
| Kayıt defteri                | `src/lib/logExport/registry.ts`              |
| Gizli bilgi yönetimi         | `src/lib/logExport/secrets.ts`               |
| Çalıştırıcı (imleç döngüsü)  | `src/lib/logExport/runner.ts`                |
| API projeksiyonu             | `src/lib/logExport/presenter.ts`             |
| BigQuery hedefi              | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA kimlik doğrulaması | `src/lib/logExport/googleServiceAccount.ts`  |
| Çağrı günlüğü kaynağı        | `src/lib/usage/callLogExportSource.ts`       |
| Kalıcılık                    | `src/lib/db/logExportDestinations.ts`        |
| Cron görevi                  | `src/lib/jobs/logExportJob.ts`               |
| REST katmanı                 | `src/app/api/log-export/`                    |
| Pano sayfası                 | `src/app/(dashboard)/dashboard/log-export/`  |

Şema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Tüm rotalar yönetim kimlik doğrulaması gerektirir (`requireManagementAuth`). Gizli bilgiler hiçbir zaman döndürülmez:
saklanan bir gizli bilgi `__stored__` değişmez değeri olarak geri gelir ve güncelleme sırasında bu değerin geri gönderilmesi
saklanan kimlik bilgisini korur.

Türü bir gizli bilgi tanımlayan hedefi oluşturmak veya güncellemek **`STORAGE_ENCRYPTION_KEY`
gerektirir**. Bu olmadan `encrypt()` sessizce olduğu gibi aktarım yapar; bu nedenle kimlik bilgisini
SQLite'a düz metin olarak kaydetmek yerine yazma işlemi 400 yanıtıyla reddedilir (Telegram webhook'unun
uyguladığı korumanın aynısı).

| Yöntem   | Yol                                      | Amaç                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Hedef türleri + bunların yapılandırma alanı listesi          |
| `GET`    | `/api/log-export/destinations`           | Hedefleri listeleme (gizli bilgiler maskelenir)              |
| `POST`   | `/api/log-export/destinations`           | Hedef oluşturma                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | Tek bir hedefi okuma                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | Adı / etkinliği / yapılandırmayı / toplu işlemeyi güncelleme |
| `DELETE` | `/api/log-export/destinations/{id}`      | Silme                                                        |
| `POST`   | `/api/log-export/destinations/{id}/test` | Kimlik bilgilerini sınama, hiçbir şey yazmama                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Şimdi boşaltma, zamanlanmış çalıştırmayla aynı yol           |
| `GET`    | `/api/log-export/status`                 | Cron durumu, son çalıştırmalar, hedef başına birikmiş işler  |

Kullanıcı arayüzünü genel amaçlı yapan şey `GET /api/log-export/types` çağrısıdır: pano formu,
döndürülen alan tanımlayıcılarından oluşturulur; dolayısıyla yeni bir hedef için kullanıcı arayüzü değişikliği gerekmez.

---

## 4. BigQuery hedefi

Yapılandırma anahtarları (`type: "bigquery"`):

| Anahtar              | Notlar                                                                               |
| -------------------- | ------------------------------------------------------------------------------------ |
| `projectId`          | Veri kümesini barındıran GCP projesi                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                      |
| `tableId`            | `[A-Za-z0-9_]+`                                                                      |
| `location`           | Yalnızca veri kümesinin oluşturulması gerektiğinde kullanılır (varsayılan `EU`)      |
| `serviceAccountJson` | Hizmet hesabı anahtarı. Gizli bilgi: depolamada şifrelenir, hiçbir zaman döndürülmez |
| `autoCreate`         | İlk dışa aktarmada veri kümesini ve tabloyu oluşturur (varsayılan `true`)            |

Hizmet hesabının hedef tabloda `bigquery.tables.updateData` iznine; ayrıca `autoCreate` açıkken
`bigquery.datasets.create` / `bigquery.tables.create` izinlerine ihtiyacı vardır.

Yapılandırılmış bir toplu işlem, HTTP değil bir **imleç** birimidir: `send()` bunu en fazla 500 satırlık
insertAll çağrılarına böler; dolayısıyla büyük bir `batch_size`, BigQuery'nin 10 MB'lık istek sınırının
aşılmasına neden olamaz. Geçici durumlar (408/429/500/502/503/504), aynı insertIds yeniden kullanılarak
üstel geri çekilmeyle en fazla üç kez yeniden denenir; kimlik doğrulama ve şema hataları ise çalıştırmayı
boşa harcamamak için ilk denemede istisna fırlatır.

Birkaç saniye önce oluşturulmuş bir tablo henüz akış uç noktası tarafından görülemez ve uç nokta
birkaç saniye boyunca 404 yanıtı verir. Bu 404 yeniden denenir, ancak **yalnızca tabloyu bu çalıştırma oluşturduysa** —
gerçekten eksik olan bir tablo yine hızla başarısız olur. Yakın zamanda silinmiş bir tabloyu aynı adla yeniden
oluşturmanın, BigQuery'nin akış eklemelerini birkaç dakika boyunca reddetmesine neden olduğunu unutmayın; bu,
silip yeniden oluşturma işleminin bir özelliğidir. Bu nedenle bir tabloyu silip tekrar eklemek yerine yeni bir tablo
adı kullanmayı tercih edin.

**Kısmi bir hata, boş olmayan bir `insertErrors[]` ile HTTP 200 olarak gelir.** Bu, hata olarak değerlendirilir
ve istisna fırlatılır; böylece imlecin BigQuery'nin hiçbir zaman kabul etmediği satırları geçmesi engellenir.
`tests/unit/log-export-bigquery.test.ts` bu davranışı sabitler.

Aktarım düz REST üzerinden yapılır — kendinden imzalı bir RS256 beyanı
`https://oauth2.googleapis.com/token` adresinde erişim belirteciyle değiştirilir, ardından satırlar
`tabledata.insertAll` hedefine gönderilir. Herhangi bir Google SDK'sı dahil edilmez. Erişim belirteçleri,
(hizmet hesabı, kapsam) başına işlem içinde önbelleğe alınır.

Oluşturulan tablo, Günlükler sekmesindeki her alan için bir sütunun yanı sıra `exported_at` sütununu içerir
ve çağrı günlüklerinin gerçek sorgulanma biçimine uygun olarak düzenlenir:

- **`timestamp` üzerinde gün bazında bölümlenir**; böylece tarihle sınırlandırılan bir sorgu yalnızca ilgili günleri tarar.
- **`api_key_name`, `provider`, `model`, `status` ölçütlerine göre kümelenir** (bu sırayla); böylece işlemi
  kimin çalıştırdığına, nereye gittiğine veya başarısız olup olmadığına göre filtreleme, her bölüm içindeki blokları
  eler. BigQuery en fazla dört kümeleme sütununa izin verir ve sıra önemlidir: yalnızca `api_key_name` filtresi
  eleme yaparken yalnızca `status` filtresi yapmaz.
- **`partitionExpirationDays` aracılığıyla isteğe bağlı bölüm saklama süresi** (`0` her şeyi saklar), tablo
  oluşturulurken uygulanır.

Her iki ayar da oluşturma sırasında uygulanır. Mevcut bir tablo, hâlihazırda sahip olduğu düzeni korur; bu nedenle bunları kullanmak istiyorsanız hedefi yeni bir tablo kimliğine yönlendirin.

`tests/unit/log-export-bigquery.test.ts`, eşleyicinin ve tablo şemasının birbiriyle uyumlu kalmasını doğrular; böylece yeni bir çağrı günlüğü sütunu dışa aktarma sırasında sessizce atılamaz.

Toplu işlemler **hem** satır sayısına hem de serileştirilmiş bayt miktarına göre parçalara ayrılır. Yükler dışa aktarıldığında yalnızca satır sayısı yeterli değildir: istemleri taşıyan 500 satır onlarca megabayt olabilir ve insertAll, 10 MB üzerindeki istekleri reddeder. Parçalar, hangisine önce ulaşılırsa 500 satırda veya 9 MB'ta kapatılır.

---

## 5. Hedef ekleme

1. Bir `LogExportDestinationType` dışa aktaran `src/lib/logExport/destinations/<name>.ts` dosyasını oluşturun:
   UI için bir Zod `configSchema`, bir `fields` tanımlayıcı dizisi, `secretFields` ve
   `test()` / `prepare()` / `send(records)` döndüren bir `createClient(config)`.
2. Bunu `src/lib/logExport/registry.ts` içindeki `DESTINATIONS` dizisine ekleyin.
3. Testleri `tests/unit/` altında yazın.

Değişikliğin tamamı bundan ibarettir: kalıcılık katmanı, cron görevi, REST katmanı, gizli değerlerin şifrelenmesi ve
dashboard formunun tamamı registry'yi okur.

Yeni bir hedef için iki kural vardır:

- `send()`, kısmi bir hata durumunda **mutlaka hata fırlatmalıdır**. Başarıyla sonuçlanması, "hedef bu satırlara sahip"
  anlamına gelir ve imleç kalıcı olarak bu satırların ötesine ilerler.
- Kullanıcı tarafından sağlanan bir URL'yi alan hedef, isteği göndermeden önce bu URL'yi
  webhook'larla aynı şekilde `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) aracılığıyla doğrulamalıdır.
  BigQuery için buna gerek yoktur: kullandığı ana makineler sabittir.

---

## 6. İşletim

- **Dashboard**: Integrations → Log export. Bir hedef ekleyin, satır yazmadan kimlik bilgilerini
  kontrol etmek için **Test** işlemini çalıştırın ve ardından hedefi etkinleştirin.
- **İş yükü birikimi**: Her hedef kartı bekleyen satırları ve imleci gösterir; `GET
/api/log-export/status`, aynı değerlerin yanı sıra son 20 görev çalıştırmasını da döndürür.
- **Başarısız olan bir hedef diğerlerini başarısız kılmaz** — çalıştırma özeti, her hedefe ait
  durumu `last_status` / `last_error` alanlarına kaydeder; görev çalıştırma geçmişi ise toplu sonucu saklar.
- **Bir hedef silindiğinde imleci de silinir.** Yeniden eklendiğinde, saklanan en eski
  çağrı günlüğünden başlar; bu da hedefte zaten bulunabilecek satırların yeniden gönderilmesine neden olur. BigQuery'de satır başına
  `insertId`, bunu yalnızca BigQuery'nin kendi yinelenen kayıtları kaldırma zaman aralığı içinde engeller; bu nedenle
  bir hedefi silmek yerine devre dışı bırakmayı tercih edin.
