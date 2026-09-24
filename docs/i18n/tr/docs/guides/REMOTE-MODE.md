# Remote Mode (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute'un kendisi başka bir yerde (bir VPS, ev sunucusu veya Tailnet'inizdeki başka bir makine) çalışırken `omniroute` CLI'ını dizüstü bilgisayarınızda çalıştırın.
`omniroute connect` ile bir kez oturum açarsınız ve bundan sonra **her** CLI komutu
o uzak sunucuyu hedefler — aynı komutlar, aynı çıktı; yalnızca uzak sunucu üzerinde yürütülür.

Kurulacak ikinci bir araç yoktur: uzak mod, standart `omniroute` CLI'ı ile
kapsamlandırılmış **erişim token'larını** kullanır.

```bash
npm install -g omniroute                 # standart CLI
omniroute connect 192.168.0.15           # oturum açın (parola → kapsamlandırılmış token)
omniroute models list                    # ← artık UZAK sunucunun modellerini listeler
omniroute configure codex                # ← uzak katalogdan yerel bir Codex profili yazar
```

---

## Nasıl çalışır?

```
dizüstü bilgisayarınız                   uzak OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parola → token)           │
│  bağlam: vps       │ ───────────────►  │ kapsamlandırılmış erişim       │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ token'ı oluşturur; her yönetim │
│ yapılandırmaları   │ ◄───────────────  │ rotası token kapsamına göre    │
│ YERELDE yazar      │                   │ denetlenir                     │
└────────────────────┘                   └───────────────────────────────┘
```

- **Bağlamlar**, her biri bir sunucuyu saklar (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` etkin sunucuyu değiştirir; `default` yereldir.
- **Erişim token'ları** (`oma_live_…`) yönetim komutlarını yetkilendirir. Bunlar,
  çıkarım API anahtarlarından (`sk-…`, `/v1/chat/completions` için kullanılır) farklıdır.
- Bir token'ın yalnızca SHA-256 özeti sunucu tarafında saklanır. Düz metin değer
  oluşturma sırasında **bir kez** gösterilir.

---

## Bağlanma

### Yönetim parolasıyla (ilk kurulum)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 için yönetim parolası: ********
# ✔ http://192.168.0.15:20128 adresine bağlanıldı — bağlam '192.168.0.15' (kapsam: admin)
```

Parola akışı varsayılan olarak bir **admin** token'ı oluşturur (parola sizde olduğundan
zaten tam denetime sahipsiniz). Kapsamı `--scope` ile daraltın:

```bash
omniroute connect 192.168.0.15 --scope write
```

Seçenekler: `--port <p>` (ana bilgisayarda port belirtilmediğinde), `--name <ctx>` (bağlam adı),
`--scope read|write|admin`. Tam URL olduğu gibi kullanılır:
`omniroute connect https://omni.example.com`.

### Önceden oluşturulmuş bir token ile

Kontrol panelinde (veya `omniroute tokens create` ile) kapsamlandırılmış bir token oluşturup
yapıştırın — parola gerekmez:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI, token'ı `GET /api/cli/whoami` aracılığıyla doğrular ve etkin bağlam olarak kaydeder.

---

## Kapsamlar

Hiyerarşik üç seviye (`admin ⊃ write ⊃ read`):

| Kapsam  | Yapabilecekleri                                                                            |
| ------- | ------------------------------------------------------------------------------------------ |
| `read`  | listeleme/inceleme — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | read **+** yapılandırma/uygulama — `setup-codex`, `keys add`, `config set`, kombinasyonlar |
| `admin` | write **+** yönetim — `tokens` CRUD, sağlayıcı ekleme, servisler, politika, oauth          |

Sunucu, her rotanın gerektirdiği kapsamı HTTP yönteminden
(`GET`→read, değişiklikler→write) ve hassas yüzeylere yönelik bir admin izin listesinden
(`/api/cli/tokens`, `/api/providers` değişiklikleri, `/api/oauth`, `/api/services`, …)
çıkarır. Kapsamı yetersiz bir token, açık bir mesajla birlikte `403` alır.

> İşlem başlatan rotalar (`/api/services/*`, `/api/mcp/*`, …)
> **yalnızca loopback** erişimine açık kalır — uzak bir token, kapsamı ne olursa olsun bunlara asla erişemez.

---

## Uzak bir kurulumda Antigravity'yi bağlama

Antigravity, Google'ın birinci taraf/yerel uygulama izin ekranını kullanır. Google,
yetkilendirme kodunu yalnızca **geri döngü yönlendirmesine**
(`http://127.0.0.1:<port>/callback`) **oturum açmayı onaylayan tarayıcıdan
erişilebildiğinde** sağlar. Uzak bir VPS kurulumunda bu geri döngü sizin
makinenizde değil sunucuda bulunur; dolayısıyla izin ekranı **sonsuza kadar takılır
ve hiçbir zaman kod üretmez** — normal "geri çağırma URL'sini yapıştırın" yedeğinde
yapıştırılacak hiçbir şey olmaz. (Bu, Google taraflı bir kısıtlamadır: aynı takılma,
yalnızca OmniRoute'ta değil, paketlenmiş Antigravity masaüstü istemcisini kullanan
tüm proxy'lerde gerçekleşir.)

Pano, takılıp kalmanızdan önce bunu algılar: localhost dışındaki bir adresten
**Providers → Antigravity → Connect** seçeneğini açtığınızda genel "geri çağırma
URL'sini kopyalayın" bildiriminin yerine aşağıdaki iki çözüm gösterilir ve her
birinde ana makineniz ile bağlantı noktanız önceden doldurulmuş olur. (LAN adresleri
de buna dahildir — bu geri çağırma açısından `192.168.x.x`, localhost değildir.)

Antigravity'yi uzak bir OmniRoute'a bağlamanın desteklenen iki yolu vardır.

### Seçenek A — yerel oturum açma yardımcısı (önerilen)

OAuth işlemini, `127.0.0.1` adresine erişilebilen **kendi bilgisayarınızda**
çalıştırın. Yardımcı doğrudan Google ile iletişim kurduğundan izin işlemi, panodaki
sürümün tamamlayamadığı yerde tamamlanır.

**Zaten bağlıysanız** (`omniroute connect <host>`), kopyalamanız gereken hiçbir şey
yoktur — yardımcı, kimlik bilgisini sizin için ilgili kuruluma iletir:

```bash
# YEREL makinenizde (Node.js + bir tarayıcı gerektirir):
omniroute connect 192.168.0.15        # bir kez — yönetici kapsamlı bir bağlam belirteci üretir
npx omniroute login antigravity
#   ↳ Google izin ekranını açar, geri çağırmayı yerel bir geri döngü bağlantı noktasında yakalar,
#     takasını gerçekleştirir ve kimlik bilgisini etkin bağlama POST eder:
#
#   Antigravity, http://192.168.0.15:20128 üzerinde bağlandı (bağlantı abc123).
#   Yapıştırılacak hiçbir şey yok — bu terminali kapatabilirsiniz.
```

Etkin bağlam başka bir makineyi gösterdiğinde gönderim otomatik olarak gerçekleşir.
Her iki yöndeki davranışı `--push` / `--no-push` ile zorlayabilir veya
`--context <name>` ile belirli bir bağlamı hedefleyebilirsiniz.

**Makineniz VPS'ye erişemiyorsa** (güvenlik duvarı nedeniyle, SSH yoksa veya
çalışma masanız ağdan yalıtılmışsa) yardımcı yine de çalışır — yalnızca Google'a
_ihtiyaç duyar_. `--no-push` kullanın veya gönderimin başarısız olmasına izin verin:
daha önce tamamladığınız bir yetkilendirmeyi atmak yerine blob'u yazdırmaya geri
döner.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Ardından **uzak** panoda **Providers → Antigravity → Connect** bölümüne gidin ve
`omniroute-cred-v1.…` blob'unu **Step 2** alanına yapıştırın (geri çağırma URL'si
veya kimlik bilgisi blob'u kabul eder). OmniRoute bunun kodunu çözer, Cloud Code
ilk katılım işlemini sunucu tarafında çalıştırır ve bağlantıyı kalıcı olarak
kaydeder.

> Blob bir yenileme belirteci içerir — ona parola gibi davranın. Gönderim yolunda,
> bağlamınızın kimliği doğrulanmış bağlantısı üzerinden bir kez gönderilir;
> yapıştırma yolunda ise pano bağlantınız üzerinden gönderilir. Her iki durumda da
> depolama sırasında şifrelenir ve başarılı bir gönderimde terminalinize hiçbir
> zaman yazdırılmaz.

Bayraklar: `--no-browser` (otomatik olarak açmak yerine URL'yi yazdırır),
`--port <n>` (geri döngü bağlantı noktasını sabitler), `--timeout <ms>`,
`--push` / `--no-push` (otomatik iletimi geçersiz kılar), `--context <name>`
(belirli bir bağlamı hedefler).

### Seçenek B — SSH yerel yönlendirme tüneli

VPS'ye SSH erişiminiz varsa geri döngü geri çağırmasının tünel üzerinden tekrar
sunucuya ulaşması için pano bağlantı noktasını yönlendirin:

```bash
# YEREL makinenizde:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# ardından YEREL tarayıcınızda http://localhost:20128 adresini açın ve Antigravity'yi
# normal şekilde bağlayın — 127.0.0.1:20128/callback yönlendirmesi artık VPS'ye SSH üzerinden ulaşır.
```

Panoya `localhost:20128` üzerinden ulaştığınız için Google izin işlemi tamamlanır
ve geri çağırma aynı tünel üzerinden sunucuya iletilir — blob gerekmez. Bağlantı
etkin görünene kadar tüneli açık tutun.

Aşağıdaki sabit geri döngülü sağlayıcıların aksine burada **tek bir yönlendirme
yeterlidir**: Antigravity geri çağırması doğrudan pano bağlantı noktasını
kullandığından tünellenecek, sağlayıcıya özgü ikinci bir bağlantı noktası yoktur.

> Tamamen başsız bir alternatif olarak (yardımcı ve tünel olmadan) **kendi**
> Google OAuth web kimlik bilgilerinizi ve genel bir temel URL'yi
> yapılandırabilirsiniz; sağlayıcının OAuth ortam değişkenlerine bakın. Yukarıdaki
> iki seçenek için ek bir Google kurulumu gerekmez.

---

## Uzak bir kurulumda Codex / Grok bağlantısı kurma (sabit geri döngü sağlayıcıları)

Codex, xAI (`xai-oauth`) ve Grok CLI (`grok-cli`), üst OAuth uygulamalarında **sabit** bir geri döngü
`redirect_uri` kaydeder. OmniRoute bunu değiştiremez — sağlayıcı, tarayıcıyı her zaman
aynı sabit kodlanmış adrese geri gönderir:

| Sağlayıcı   | Sağlayıcının yönlendirdiği sabit geri çağırma adresi |
| ----------- | ---------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                    |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                    |

Buradaki `localhost`, **tarayıcının çalıştığı makine** anlamına gelirken OmniRoute'un PKCE
geri çağırma sunucusu **sunucunun** geri döngü arayüzünde dinler. Panoyu
`http://192.168.0.15:20128` gibi bir LAN adresinden açtığınızda ikisi asla buluşmaz: yetkilendirme
kodu kendi dizüstü bilgisayarınızın `localhost:1455` adresine teslim edilir; burada hiçbir şey dinlemediği
için sağlayıcı, herhangi bir hata göstermeden oturum açma işlemini başarısız kılar.

Pano, açılır pencereyi açmadan önce bunu algılar ve oturum açma işleminin sessizce başarısız olmasına
izin vermek yerine tünel komutunu gösterir (#8046).

### Çözüm — **her iki** portu da yönlendirin

```bash
# TARAYICININ çalıştığı makinede:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# ardından http://localhost:20128 adresine gidin ve Codex'i buradan bağlayın
```

İki yönlendirme gereklidir ve yalnızca birini yönlendirmek yine başarısız olur:

- **`20128`** (pano portu), kaynağı gerçekten localhost yapar; OmniRoute'un PKCE
  geri çağırma sunucusunu başlatmasını sağlayan budur — bir LAN kaynağı bu
  dala hiçbir zaman ulaşmaz.
- **`1455`** (sağlayıcının sabit geri çağırma portu), tarayıcının geri gönderildiği
  yerdir; buradan sunucunun geri döngü arayüzüne tünellenmesi gerekir.

xAI veya Grok CLI bağlarken `1455` yerine `56121`/`56122`, `20128` yerine de
gerçek pano portunuzu kullanın. Bağlantı etkin olarak görünene kadar tüneli açık
tutun.

> **SSH erişiminiz yok mu?** Codex ve Grok CLI, yapıştırılan bir belirteci de kabul eder — bağlantı iletişim
> kutusundaki **API Anahtarını Yapıştır** / **auth.json İçe Aktar** sekmesi. Bu yolda geri döngü
> geri çağırması bulunmadığından herhangi bir kaynaktan çalışır. Codex ayrıca yalın bir erişim
> belirtecini veya `~/.codex/auth.json` oturum verisini de kabul eder.

---

## Belirteçleri yönetme

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ gizli değeri YALNIZCA BİR KEZ yazdırır — şimdi kopyalayın
omniroute tokens list                 # maskelenmiş: kimlik, ad, kapsam, ön ek, durum, süre sonu
omniroute tokens revoke <id|prefix>   # hemen iptal et
omniroute tokens scopes               # üç kapsamı açıkla
```

`tokens` komutları bir **admin** kimlik bilgisi gerektirir. Belirteçleri
panoda **Ayarlar → Erişim Belirteçleri** altında da yönetebilirsiniz (oluşturma, iptal etme, tek seferlik kopyalama).

---

## Uzak katalogdan bir kodlama CLI'ını yapılandırma

`omniroute configure`, **etkin sunucunun** canlı model kataloğunu okur ve
**sizin** makinenize bir yapılandırma yazar.

```bash
omniroute configure codex
#   Sağlayıcılar: glm, kmc, ollamacloud, opencode-go, …
#   Sağlayıcı: glm
#   Model kimliği: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml yazıldı
#   Kullanım:  codex --profile glm52

# etkileşimsiz
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# sık kullanılan bir modeli etkileşimli seçicinin en üstünde tut
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Seçici, yerel `model-preferences.json` dosyasında yalnızca model kimliklerini
(URL'leri veya kimlik bilgilerini asla değil), bağlama ve CLI hedefine göre kapsamlandırılmış şekilde tutar. Favoriler,
son seçimlerden önce gösterilir; seçilen bir modeli ilgili bağlam/hedef listesinden
kaldırmak için `--unfavorite` kullanın.

Yazılan profil, çıkarım anahtarına env var
(`OMNIROUTE_API_KEY`) aracılığıyla başvurur — gizli değer hiçbir zaman diske yazılmaz. Tek seferlik
temel Codex kurulumu (`[model_providers.omniroute]` bloğu) için
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) belgesine bakın.

### Uzak sunucuya karşı bir CLI başlatma (yapılandırma yazılmaz)

`omniroute run <target>` da etkin bağlamı dikkate alır: uzak temel URL
ve bağlam kimlik bilgisi yalnızca başlatılan sürece eklenir.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → uzak sunucu
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Tam olarak neyin başlatılacağını önizleyin (yalnızca env ANAHTAR ADLARI, değerler asla gösterilmez):
omniroute run codex --dry-run --json
```

Hedefler: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(tek kaynak: `bin/cli/cli-manifest.mjs`). Qwen ve Gemini, çıkışta kaldırılan
geçici ve yalıtılmış bir ana dizinle çalışır; böylece başlatma işlemi kişisel araç
yapılandırmanıza hiçbir zaman dokunmaz veya ona veri sızdırmaz.

### CLI'a özgü kurulum komutları

Desteklenen her CLI'ın uzak sunucuyu destekleyen bir kurulum komutu vardır (tümü etkin
bağlamı veya `--remote <url> --api-key <key>` seçeneklerini dikkate alır):

| CLI         | Komut                      | Yazdığı yer/içerik                                                                                                                                                                                            |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profilleri (model başına)                                                                                                                                                       |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (model başına)                                                                                                                                                      |
| OpenCode    | `omniroute setup-opencode` | Her katalog modelini içeren, openai uyumlu `omniroute` sağlayıcısı için `~/.config/opencode/opencode.json` (`opencode -m omniroute/<model>` komutunu çalıştırın)                                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI modu) + yapıştırılacak VS Code uzantısı ayarlarını yazdırır (OpenAI uyumlu, `/v1` **olmadan** Temel URL)                                                      |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` ayarları — OpenAI uyumlu, `/v1` **içeren** Temel URL                                                                                             |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1` **içeren** `apiBase`, `${{ secrets.OMNIROUTE_API_KEY }}` üzerinden anahtar                                               |
| Cursor      | `omniroute setup-cursor`   | Uygulama içi adımları yazdırır (Ayarlar → Modeller → `/v1` **içeren** OpenAI Temel URL'sini Geçersiz Kıl + anahtar + model). Cursor yapılandırması opak SQLite'tır — yalnızca sohbet paneli                   |
| Roo Code    | `omniroute setup-roo`      | Bir Roo içe aktarma JSON'u (`~/.omniroute/roo-settings.json`) yazar + `roo-cline.autoImportSettingsPath` ayarını belirler + kullanıcı arayüzü adımlarını yazdırır (OpenAI uyumlu, `/v1` **içeren** Temel URL) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` sağlayıcısı, `/v1` **içeren** `base_url`, `$OMNIROUTE_API_KEY` üzerinden anahtar                                                                               |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `/v1` **olmadan** `OPENAI_HOST` + `GOOSE_MODEL`) + ortam değişkeni tarifi                                                                            |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`/v1` **olmadan** `openai-api-base` + `model: openai/<id>`) + ortam değişkeni tarifi (`aider --message --yes`)                                                                           |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` girdisi + `~/.qwen/.env` içinde `OMNIROUTE_API_KEY`                                                                                                        |

```bash
# OpenCode (openai uyumlu sağlayıcı, tüm katalog modelleri, uzak VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # yalnızca eşleşen modelleri tut
opencode -m omniroute/glm/glm-5.2 "..."          # önce OMNIROUTE_API_KEY değişkenini dışa aktarın
```

> OpenCode ayrıca daha zengin bir **eklenti** entegrasyonuna sahiptir: `omniroute setup opencode`
> (artık `--remote` aracılığıyla uzak bağlantıları destekler) `@omniroute/opencode-plugin` paketini yükler.
> `setup-opencode`, hafif openai uyumlu alternatiftir. API anahtarına
> `{env:OMNIROUTE_API_KEY}` aracılığıyla başvurulur — hiçbir zaman diske yazılmaz.
>
> OpenCode v2'de bunun yerine `@omniroute/opencode-plugin-v2` kullanın: aynı katalog,
> farklı yükleyici sözleşmesi. Entegrasyon bağlandığında anahtarı OpenCode'un kendi kimlik bilgisi
> deposundan okur; dolayısıyla uzak ağ geçidi için `opencode.json` dosyasında hiçbir anahtar gerekmez.

---

## Bağlamları yönetme (sunucular arasında geçiş yapma)

Bir **bağlam**, kaydedilmiş bir sunucudur (baseUrl + kimlik bilgisi + kapsam). `omniroute connect`
bir bağlam oluşturur ve etkin hâle getirir; bundan sonra her komut bu bağlamı hedefler. Bağlamları
`omniroute contexts` ile yönetin ve aralarında geçiş yapın:

```bash
omniroute contexts list            # tüm bağlamlar; etkin olan ● ile işaretlenir
omniroute contexts current         # etkin sunucu, kimlik doğrulama durumu ve kapsam
```

```text
  | Ad      | Temel URL                 | Kimlik Doğrulama | Kapsam | Açıklama
● | vps     | http://100.67.86.91:20128 | token            | admin  | Uzak OmniRoute (…)
  | default | http://localhost:20128    | ✗                |        |
```

**Sunucular arasında geçiş yapın** — sonraki tüm komutlar etkin bağlamı kullanır:

```bash
omniroute contexts use vps         # → artık tüm komutlar uzak VPS'yi hedefler
omniroute tokens list              #   (VPS'ye karşı çalışır)

omniroute contexts use default     # → localhost'a geri dön
omniroute tokens list              #   (yerel sunucuya karşı çalışır)
```

**Bir bağlamı manuel olarak ekleyin** (`connect` yerine), inceleyin veya yeniden adlandırın:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "hazırlık sunucusu"
omniroute contexts show staging    # bir bağlamın tüm ayrıntıları
omniroute contexts rename staging stg
```

**Bir bağlamı kaldırın** — onay ister; bu adımı atlamak için `--yes` kullanın
(aksi hâlde güvenli biçimde reddeden betikler / etkileşimsiz kabuklar için gereklidir):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kaldırılamaz. Etkin bağlam kaldırıldığında otomatik olarak
> `default` bağlamına geri dönülür. İpucu: Bir bağlamı kaldırmak yalnızca **yerel**
> olarak kaydedilmiş kimlik bilgisini siler — erişimi gerçekten sonlandırmak için
> sunucudaki token'ı `omniroute tokens revoke <id>` ile iptal edin.

Bağlamları **dışa / içe aktarın** (ör. makineler arasında taşımak için). İşletim sistemi
anahtar zinciri kullanılabiliyorsa yeni bağlamlarda yalnızca anahtar zinciri referansı kalıcı
olarak saklanır; kimlik bilgileri dışa aktarıma kopyalanmaz:

```bash
omniroute contexts export --out contexts.json     # varsayılan: stdout
omniroute contexts import contexts.json            # üzerine yaz; mevcut olanları korumak için --merge
omniroute contexts migrate --yes                  # eski düz metin token'ları anahtar zincirine taşı
```

Kullanılabilir bir işletim sistemi anahtar zinciri bulunmayan başsız sistemlerde CLI,
`0600` moduyla `config.json` dosyasına geri döner ve tek seferlik bir uyarı yazdırır.
Bu geri dönüş yönteminden alınan dışa aktarımları (ve geçişten önceki eski yapılandırmaları)
gizli materyal olarak değerlendirin.

---

## Hızlı uçtan uca kontrol

Uzak bir kurulumu sıfırdan doğrulamak için kopyalayıp yapıştırabileceğiniz bir yaşam döngüsü:
bağlanın, kapsamlı bir token oluşturun, bir komutu yönlendirin, geri dönün ve kurulumu kaldırın.
`192.168.0.15` değerini sunucunuzun ana makine adı/IP adresiyle (Tailscale, LAN veya herkese
açık bir `https://…` URL'si) değiştirin.

```bash
# 1. Bağlan (parola → admin token'ı; etkin hâle gelen bir bağlam olarak kaydedilir)
omniroute connect 192.168.0.15                 # veya: --key oma_live_xxxx  (parola yok)
omniroute contexts current                     # uzak sunucuyu ve kapsamı gösterir

# 2. Kullan — yönetim komutları artık uzak sunucuya karşı çalışır
omniroute tokens create --name laptop --scope read   # daha dar kapsamlı bir token oluştur
omniroute tokens list                                 # uzak sunucudan maskelenmiş liste

# 3. İleri ve geri geçiş yap
omniroute contexts use default                 # → yerel
omniroute contexts use 192-168-0-15            # → yeniden uzak (`contexts list` içindeki ad)

# 4. Kurulumu kaldır. NOT: `contexts remove` yalnızca YEREL kimlik bilgisini siler —
#    sunucudaki token'ı iptal ETMEZ. Erişimi gerçekten sonlandırmak istiyorsanız
#    önce sunucu tarafında iptal edin.
omniroute tokens revoke <id|prefix>            # sunucudaki erişimi sonlandırır
omniroute contexts remove 192-168-0-15 --yes   # yerel bağlamı siler (etkin olsa bile → default'a geri döner), onay istemez
```

> `--yes`, `contexts remove` komutunu etkileşimsiz hâle getirir (betiklerde/CI'da
> gereklidir; bu seçenek olmadan etkileşimsiz bir kabuk, takılı kalmak yerine güvenli
> biçimde reddeder). **Etkin** bağlam kaldırıldığında otomatik olarak `default`
> bağlamına geri dönülür.

---

## Güvenlik notları

- Token'ın düz metin hâli yalnızca bir kez gösterilir; sadece SHA-256 özeti kalıcı olarak saklanır (API anahtarlarıyla aynı şekilde).
- `omniroute connect`, oturum açma kaba kuvvet saldırılarına karşı kilitleme ve denetim günlüğü mekanizmalarını yeniden kullanır.
- Aktarım için tercihen HTTPS veya bir Tailnet kullanın; yalnızca ana makine belirtilirse LAN/Tailscale kolaylığı için varsayılan olarak `http://` kullanılır — TLS için tam bir `https://…` URL'si sağlayın.
- Tercih edilen yerel bağlam dosyası, yalnızca bir `credentialRef` içeren `~/.omniroute/config.json` (`chmod 600`) dosyasıdır; token'ın kendisi işletim sistemi anahtar zincirinde (`keytar`) saklanır ve günlüklere hiçbir zaman yazdırılmaz. Çalışan bir yerel anahtar zinciri bulunmayan başsız kurulumlar, açık bir geri dönüş mekanizması olarak aynı `0600` dosyasını kullanır ve bir kez uyarı verir. Bir anahtar zinciri arka ucu kurduktan sonra `omniroute contexts migrate --yes` komutunu kullanın.

---

## API uç noktaları (referans)

| Yöntem | Rota                  | Kimlik doğrulama | Kapsam                            |
| ------ | --------------------- | ---------------- | --------------------------------- |
| POST   | `/api/cli/connect`    | yönetim parolası | — (herkese açık, parola korumalı) |
| GET    | `/api/cli/whoami`     | erişim token'ı   | okuma                             |
| GET    | `/api/cli/tokens`     | erişim token'ı   | yönetici                          |
| POST   | `/api/cli/tokens`     | erişim token'ı   | yönetici                          |
| DELETE | `/api/cli/tokens/:id` | erişim token'ı   | yönetici                          |

Tüm şemalar için [openapi.yaml](../openapi.yaml) dosyasına bakın.
