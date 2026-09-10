---
title: "Sorun Giderme"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Sorun Giderme (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../../ar/docs/guides/TROUBLESHOOTING.md) · 🇦🇿 [az](../../../az/docs/guides/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../../bg/docs/guides/TROUBLESHOOTING.md) · 🇧🇩 [bn](../../../bn/docs/guides/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../../cs/docs/guides/TROUBLESHOOTING.md) · 🇩🇰 [da](../../../da/docs/guides/TROUBLESHOOTING.md) · 🇩🇪 [de](../../../de/docs/guides/TROUBLESHOOTING.md) · 🇪🇸 [es](../../../es/docs/guides/TROUBLESHOOTING.md) · 🇮🇷 [fa](../../../fa/docs/guides/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../../fi/docs/guides/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../../fr/docs/guides/TROUBLESHOOTING.md) · 🇮🇳 [gu](../../../gu/docs/guides/TROUBLESHOOTING.md) · 🇮🇱 [he](../../../he/docs/guides/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../../hi/docs/guides/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../../hu/docs/guides/TROUBLESHOOTING.md) · 🇮🇩 [id](../../../id/docs/guides/TROUBLESHOOTING.md) · 🇮🇹 [it](../../../it/docs/guides/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../../ja/docs/guides/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../../ko/docs/guides/TROUBLESHOOTING.md) · 🇮🇳 [mr](../../../mr/docs/guides/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../../ms/docs/guides/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../../nl/docs/guides/TROUBLESHOOTING.md) · 🇳🇴 [no](../../../no/docs/guides/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../../phi/docs/guides/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../../pl/docs/guides/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../../pt/docs/guides/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../../ro/docs/guides/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../../ru/docs/guides/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../../sk/docs/guides/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../../sv/docs/guides/TROUBLESHOOTING.md) · 🇰🇪 [sw](../../../sw/docs/guides/TROUBLESHOOTING.md) · 🇮🇳 [ta](../../../ta/docs/guides/TROUBLESHOOTING.md) · 🇮🇳 [te](../../../te/docs/guides/TROUBLESHOOTING.md) · 🇹🇭 [th](../../../th/docs/guides/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TROUBLESHOOTING.md) · 🇵🇰 [ur](../../../ur/docs/guides/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../../vi/docs/guides/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TROUBLESHOOTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TROUBLESHOOTING.md)

---

OmniRoute için sık karşılaşılan sorunlar ve çözümleri.

---

## Hızlı Başvuru

**OmniRoute'ta yeni misiniz?** Buradan başlayın — sorunların %90'ını çözer:

| Gördüğüm Durum            | Ne Anlama Geliyor                    | Ne Yapılmalı                                                                                         |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| "Bağlanamıyor"            | OmniRoute çalışmıyor                 | `omniroute` veya `docker restart omniroute` çalıştırın                                               |
| "Geçersiz API Anahtarı"   | Anahtarınız yanlış veya süresi doldu | Sağlayıcının web sitesinden anahtarı yeniden kopyalayın                                              |
| "Hız Sınırı Aşıldı"       | Çok fazla istek gönderiyorsunuz      | 1 dakika bekleyin veya otomatik geri dönüş için `model: "auto"` kullanın                             |
| "Kota Aşıldı"             | Ücretsiz/ücretli kotanız bitti       | Daha fazla sağlayıcı bağlayın veya ücretsiz sağlayıcıları kullanın                                   |
| "Yavaş Yanıtlar"          | Sağlayıcı meşgul veya uzakta         | `model: "auto/fast"` kullanın veya daha hızlı bir sağlayıcı bağlayın (Groq, Cerebras)                |
| "Yanlış Sağlayıcı Seçimi" | `auto` farklı bir sağlayıcı seçti    | Bu normaldir! `auto` en iyisini seçer. Belirli bir sağlayıcıyı `model: "openai/gpt-4o"` ile zorlayın |
| "502 Bad Gateway"         | Sağlayıcı çöktü                      | Bekleyip yeniden deneyin veya sağlayıcı değiştirmek için `model: "auto"` kullanın                    |
| "401 Unauthorized"        | Kimlik bilgileriniz geçersiz         | API anahtarınızı kontrol edin veya OAuth ile yeniden doğrulayın                                      |
| "429 Too Many Requests"   | Hız sınırına takıldı                 | 1 dakika bekleyin veya daha fazla sağlayıcı bağlayın                                                 |

---

## Hızlı Düzeltmeler

| Sorun                                                      | Çözüm                                                                                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| İlk giriş çalışmıyor                                       | `.env` dosyasında `INITIAL_PASSWORD` ayarlayın (sabit kodlanmış varsayılan yoktur)                                                     |
| Pano yanlış portta açılıyor                                | `PORT=20128` ve `NEXT_PUBLIC_BASE_URL=http://localhost:20128` ayarlayın                                                                |
| Diske günlük yazılmıyor                                    | `APP_LOG_TO_FILE=true` ayarlayın ve çağrı günlüğü kaydının etkin olduğunu doğrulayın                                                   |
| EACCES: permission denied                                  | `~/.omniroute` dizinini geçersiz kılmak için `DATA_DIR=/yazilabilir/dizin/yolu` ayarlayın                                              |
| Yönlendirme stratejisi kaydedilmiyor                       | En son v3.x sürümüne güncelleyin                                                                                                       |
| Giriş çökmesi / boş sayfa                                  | Node.js sürümünü kontrol edin (Node.js `>=22.22.2 <23` veya `>=24.0.0 <27` desteklenir)                                                |
| `dlopen` / `slice is not valid mach-o file` (macOS)        | `cd $(npm root -g)/omniroute/app && npm rebuild better-sqlite3 && omniroute` çalıştırın                                                |
| Proxy "fetch failed"                                       | Proxy yapılandırmasının doğru düzeyde ayarlandığından emin olun                                                                        |
| Docker `curl: (56) Recv failure: Connection reset by peer` | Docker port bağlamanız IPv6'ya düşüyor olabilir. IPv4'ü zorlamak için `-p 127.0.0.1:20128:20128` kullanın veya `curl -4` ile test edin |
| Antivirüs `README.md` dosyasını karantinaya alıyor         | Yanlış pozitif (false positive) alarmdır, güvenle geri yükleyebilirsiniz                                                               |
