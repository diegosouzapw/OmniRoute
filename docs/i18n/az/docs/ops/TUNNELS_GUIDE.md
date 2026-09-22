# Tunnels Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Əsas mənbə:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute öz lokal serverini (`http://localhost:20128`) üç tunel backend-i vasitəsilə açıq
internetə çıxara bilər. Bu, aşağıdakı hallarda faydalıdır:

- İctimai şəkildə əlçatan yönləndirmə URL-si tələb edən bulud provayderlərindən (Antigravity, Gemini, Cursor)
  OAuth geri çağırışları.
- VM yerləşdirmədən lokal instansiyanızı komanda yoldaşlarınızla paylaşmaq.
- Mobil, uzaqdan və ya müxtəlif şəbəkələr arasında sınaq.

Hər üç backend proses daxilində idarə olunur — OmniRoute əsas binar faylı və ya SDK-nı
idarəetmə panelindən və ya REST API-dən başladır/dayandırır. Reverse-proxy və ya systemd
quraşdırması tələb olunmur.

## Backend-lərə ümumi baxış

| Backend                     | Davamlılıq                                                       | Qiymət                     | Quraşdırma                                               |
| --------------------------- | ---------------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Müvəqqəti (URL hər yenidən başlatmada dəyişir)                   | Pulsuz                     | Sıfır — `cloudflared` avtomatik quraşdırılır             |
| **ngrok**                   | Ödənişli plan və ya sabit domen konfiqurasiya edildikdə sabitdir | Pulsuz tarif + ödənişli    | ngrok hesabı + authtoken tələb edir                      |
| **Tailscale Funnel**        | Tailnet daxilində hər node üçün sabitdir                         | Şəxsi istifadə üçün pulsuz | Tailscale quraşdırılması + giriş + Funnel ACL tələb edir |

İmplementasiyalar `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` və `src/lib/tailscaleTunnel.ts` daxilində yerləşir. Hər üçü
`phase`, `running`, `publicUrl`, `apiUrl`, `targetUrl` və `lastError` sahələrinə malik,
eyni formalı `status` obyekti qaytarır; beləliklə, idarəetmə paneli onları eyni qaydada göstərə bilir.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts`, `cloudflared`-i alt proses kimi işə salır. O,
adlandırılmış tunel konfiqurasiyasının təqdim edilib-edilməməsindən asılı olaraq seçilən iki rejimi dəstəkləyir:

- **Sürətli tunel (standart).** `cloudflared tunnel --url
http://localhost:<apiPort>` əmrini işə salır və təyin edilmiş `*.trycloudflare.com` URL-sini
  standart çıxışdan təhlil edir. URL-lər müvəqqətidir və hər yenidən başlatmada dəyişir.
- **Adlandırılmış tunel (seçimlə aktivləşdirilir).** `CLOUDFLARED_CONFIG` lokal olaraq idarə olunan
  cloudflared `config.yml` faylını göstərdikdə, OmniRoute `cloudflared tunnel --no-autoupdate
--config <path> run` əmrini işə salır və sizə **sabit, adlandırılmış host adı** verir. Konfiqurasiya
  tunel UUID-sini, `credentials-file` və `ingress` marşrutlaşdırmasını təmin edir, buna görə də
  `--url` ötürülmür və Zero Trust idarəetmə paneli tokeni tələb olunmur. `run`
  etimadnamələri konfiqurasiyadakı mütləq `credentials-file` yolundan oxuyur — `cert.pem`
  tələb olunmur (o, yalnız tunelin həyat dövrünün idarə edilməsi üçün istifadə olunur).

Əsas davranışlar:

- **Avtomatik quraşdırma.** İlk istifadədə OmniRoute ən son `cloudflared`
  binar faylını rəsmi GitHub buraxılışlarından endirir (idarə olunan quraşdırma
  `DATA_DIR/cloudflared/` altında yerləşir). Endirilmiş faylın SHA256 göstəricisi icradan əvvəl
  buraxılış manifesti ilə yoxlanılır.
- **Prosesə nəzarət.** cloudflared PID-i və müəyyən edilmiş URL
  `quick-tunnel-state.json` faylında saxlanılır ki, idarəetmə paneli yenidən yükləmələrdən sonra statusu bərpa edə bilsin.

### Adlandırılmış tunelin quraşdırılması (sabit host adı)

1. cloudflared CLI ilə lokal olaraq idarə olunan tunel yaradın (birdəfəlik):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Host adınızı OmniRoute-un lokal API portuna (standart olaraq 20128) yönləndirən
   `~/.cloudflared/config.yml` faylı yaradın:

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute-u konfiqurasiyaya yönəldin və tuneli (yenidən) başladın:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # istəyə bağlıdır — OmniRoute-un bildirdiyi host adını əvəz edir; əks halda
   # konfiqurasiyanın ilk ingress qaydasından oxunur:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Tuneli sürətli tunellə eyni qaydada aktivləşdirin (aşağıda REST / idarəetmə paneli / CLI).
   Adlandırılmış tunel əldə etmək üçün ictimai URL çıxarmır, buna görə də hazırlıq vəziyyəti
   cloudflared-in qeydə alınmış kənar bağlantısından müəyyən edilir, `publicUrl`/`apiUrl` isə
   `CLOUDFLARED_HOSTNAME` (və ya konfiqurasiyanın ilk ingress host adı) əsasında bildirilir.

### REST vasitəsilə aktivləşdirmə / deaktivləşdirmə

Endpoint ayrıca `start`/`stop` yollarından deyil, `{action: "enable" | "disable"}`
gövdəsindən istifadə edir. İdarəetmə autentifikasiyası (admin sessiyası və ya admin API açarı)
tələb olunur.

```bash
# Aktivləşdir
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Deaktivləşdir
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Yaxud idarəetmə paneli vasitəsilə: **Settings → Tunnels → Cloudflare**.

### İstəyə bağlı mühit dəyişənləri

| Dəyişən                                              | Təyinatı                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | İcra olunan faylın yolunu əvəz edir. Təyin edilibsə və etibarlıdırsa, OmniRoute onu endirmək əvəzinə istifadə edir.                                                                              |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Nəqliyyat protokolu (standart olaraq `http2`; həmçinin `quic`, `auto`).                                                                                                                          |
| `CLOUDFLARED_CONFIG`                                 | Lokal olaraq idarə edilən cloudflared `config.yml` faylına gedən yol. Təyin edildikdə OmniRoute sürətli tunel əvəzinə **adlandırılmış/davamlı** tuneli (`tunnel --config <path> run`) işə salır. |
| `CLOUDFLARED_HOSTNAME`                               | Adlandırılmış tunelin bildirdiyi ictimai host adını əvəz edir (məsələn, `ai.example.com`). Təyin edilmədikdə konfiqurasiyadakı ilk `ingress` host adından oxunur.                                |

## 2. ngrok

`src/lib/ngrokTunnel.ts` **`@ngrok/ngrok` SDK**-dan istifadə edir (proses daxilində, CLI alt prosesi olmadan). Əvvəlcədən yığılmış binar faylları olmayan platformaların tətbiqin işə salınması zamanı xəta yaratmaması üçün yerli modul ilk işə salınma zamanı təxirə salınmış şəkildə import edilir.

### İlkin tələblər

1. <https://ngrok.com> ünvanında qeydiyyatdan keçin.
2. ngrok idarəetmə panelindən autentifikasiya tokeninizi kopyalayın.
3. Onu aşağıdakı üsullardan biri ilə təqdim edin:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, yaxud
   - İdarəetmə paneli: **Settings → Tunnels → ngrok**, yaxud
   - REST sorğusunun gövdəsi (birdəfəlik): `{"action":"enable","authToken":"<token>"}`.

Heç biri konfiqurasiya edilməyibsə, status `phase: "needs_auth"` qaytarır.

### REST vasitəsilə aktivləşdirmə / deaktivləşdirmə

```bash
# Aktivləşdir (env-dəki NGROK_AUTHTOKEN-dən istifadə edir)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Sətirdaxili tokenlə aktivləşdir
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Deaktivləşdir
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Cavaba təyin edilmiş `publicUrl` daxildir (məsələn,
`https://abcd-1234.ngrok-free.app`). Fərdi domenlər, regionlar və siyasət qaydaları
ngrok idarəetmə panelində konfiqurasiya edilməlidir — OmniRoute özü yalnız lokal
hədəf URL-ni SDK-ya ötürür.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` lokal API portunu **Funnel** (Tailscale-in serve üçün
ictimai internetə çıxış mexanizmi) vasitəsilə əlçatan etmək üçün sistemdəki
`tailscale` CLI-ni idarə edir. O, tam həyat dövrünü dəstəkləyir: quraşdırma,
giriş, demonun işə salınması, aktivləşdirmə və deaktivləşdirmə.

İmplementasiya `tailscale funnel --bg <port>` əmrini (fon rejimi) çağırır.
İctimai URL `https://<machine>.<tailnet>.ts.net/` formasındadır.

### İlkin tələblər

1. Tailscale-i quraşdırın (yaxud bunu OmniRoute-a həvalə edin — aşağıdakı `install` son nöqtəsinə baxın).
2. Daxil olun (`tailscale login` və ya OmniRoute-un `login` son nöqtəsi vasitəsilə).
3. Tailscale administrator konsolunda tailnet-iniz üçün Funnel-i aktivləşdirin:
   <https://login.tailscale.com/admin/settings/features>.

Linux və macOS sistemlərində demonu (`tailscaled`) idarə etmək üçün `sudo`
tələb olunur. POST son nöqtələri, sorğu müddətində OmniRoute-un MITM parol keşinə
(`getCachedPassword` / `setCachedPassword`) ötürülən istəyə bağlı `sudoPassword`
sahəsini qəbul edir. Windows standart xidmət quraşdırmasından
`C:\Program Files\Tailscale\tailscale.exe` istifadə edir.

### REST son nöqtələri

Quraşdırma, giriş, demon və tunel ayrı-ayrı məsələlər olduğuna görə Tailscale
digər arxa tərəflərdən daha geniş funksionallığa malikdir.

| Son nöqtə                             | Metod  | Məqsəd                                                                           |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Ümumiləşdirilmiş tunel statusu (`phase`, `tunnelUrl`, `apiUrl` və s.)            |
| `/api/tunnels/tailscale/check`        | `GET`  | Aşağı səviyyəli yoxlama: quraşdırılıb? giriş edilib? demon işləyir?              |
| `/api/tunnels/tailscale/install`      | `POST` | Tailscale-i quraşdırmaq (SSE ilə yayımlanan irəliləyiş hadisələri) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Linux/macOS-da `tailscaled`-i işə salmaq                                         |
| `/api/tunnels/tailscale/login`        | `POST` | Giriş prosesini başlatmaq; brauzerdə açmaq üçün `authUrl` qaytarır               |
| `/api/tunnels/tailscale/enable`       | `POST` | API portu üçün Funnel-i işə salmaq                                               |
| `/api/tunnels/tailscale/disable`      | `POST` | Funnel-i dayandırmaq                                                             |

Bütün Tailscale son nöqtələri idarəetmə autentifikasiyası tələb edir (`routeUtils.ts ::
requireTailscaleAuth` bölməsinə baxın).

Aktivləşdirmə nümunəsi:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Funnel administrator konsolunda aktivləşdirilməyibsə, cavaba
`funnelNotEnabled: true` və brauzerdə açmaq üçün `enableUrl` daxil edilir.

### İstəyə bağlı mühit dəyişənləri

| Dəyişən         | Məqsəd                                       |
| --------------- | -------------------------------------------- |
| `TAILSCALE_BIN` | `tailscale` binar faylının yolunu əvəz etmək |

## Endpointlərin xülasəsi

| Endpoint                              | Metod  | Gövdə                               | Autentifikasiya |
| ------------------------------------- | ------ | ----------------------------------- | --------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | idarəetmə       |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | idarəetmə       |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | idarəetmə       |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | idarəetmə       |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | idarəetmə       |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | idarəetmə       |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | idarəetmə       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | idarəetmə       |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | idarəetmə       |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | idarəetmə       |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | idarəetmə       |

Mərkəzi `/api/settings/tunnels` endpointi yoxdur — hər bir backend müstəqildir.

## OAuth geri çağırışı ilə bağlı nəzərə alınmalı məqamlar

OmniRoute-u tunel vasitəsilə əlçatan etdikdə, idarəetmə paneli və OAuth axınları geri çağırış URL-lərini `localhost` deyil, **ictimai** host adı əsasında yaratmalıdır. Əks halda OAuth provayderi istifadəçini serverlərinin çata bilmədiyi URL-ə yönləndirir və əlaqə qurma prosesi uğursuz olur.

İdarəetmə panelindəki dəyişikliklər və parametrlərin yadda saxlanması üçün tunel host adını `NEXT_PUBLIC_BASE_URL` daxilində sabitləmək tələb olunmur. Autentifikasiya edilmiş idarəetmə paneli sessiyaya bağlı CSRF tokeni ilə eyni mənbəli təhlükəli sorğular göndərir, buna görə də efemer Cloudflare Quick Tunnel hostları sistemə daxil olduqdan sonra adi interfeys idarəetməsi üçün istifadə edilə bilər.

Aşağıdakı dəyəri təyin edin:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

və OAuth prosesini başlatmazdan əvvəl OmniRoute-u yenidən başladın. Efemer Cloudflare Quick Tunnels üçün URL hər yenidən başlatmadan sonra dəyişir, buna görə də istehsal mühitində OAuth istifadəsi üçün rezerv edilmiş domenə malik ngrok-a və ya Tailscale Funnel-a üstünlük verin.

## Sağlamlıq vəziyyəti və monitorinq

İdarəetmə paneli tunelin vəziyyətini **Settings → Tunnels** bölməsində göstərir:

- Aktiv backend(lər) və cari `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Cari ictimai URL və ondan əldə edilən API URL-i (`<publicUrl>/v1`).
- Tunelin yönləndirdiyi lokal hədəf URL.
- Əgər varsa, son xəta mesajı.

Proqram vasitəsilə monitorinq üçün hər backend-ə aid `GET` endpointlərini mütəmadi sorğulayın. Eyni anda birdən çox backend-in işlədilməsinə icazə verilir; OmniRoute onların hər birini müstəqil şəkildə izləyəcək.

## Problemlərin aradan qaldırılması

### "cloudflared binary not found"

OmniRoute ilk istifadə zamanı avtomatik quraşdırmaya cəhd edir. Quraşdırma bloklanarsa (məhdudlaşdırılmış şəbəkə, GitHub-a girişin olmaması), `cloudflared` faylını <https://github.com/cloudflare/cloudflared/releases> ünvanından əl ilə endirin və `CLOUDFLARED_BIN=/path/to/cloudflared` təyin edin.

### "ngrok: authtoken required"

`phase: "needs_auth"` heç bir autentifikasiya tokeninin tapılmadığını bildirir. `.env` faylında `NGROK_AUTHTOKEN` təyin edin, onu idarəetmə paneli vasitəsilə konfiqurasiya edin və ya aktivləşdirmə üçün POST sorğusunun gövdəsində `authToken` ötürün.

### "tailscale: funnel not enabled"

Aktivləşdirmə cavabına `funnelNotEnabled: true` daxil olduqda, Funnel tailnet-iniz üçün deaktiv edilib. Qaytarılan `enableUrl` ünvanını (və ya administrator konsolundakı funksiya səhifəsini) açın və Funnel-i aktivləşdirin.

### Tunel URL-indəki dəyişikliklər OAuth-u pozur

Rezerv edilmiş domenə malik ngrok və ya Tailscale Funnel istifadə edin (hər ikisi hər node üçün sabitdir). Cloudflare Quick Tunnels dizayn etibarilə efemerdir və uzunmüddətli OAuth geri çağırışları üçün tövsiyə edilmir.

### Linux/macOS sistemində Tailscale üçün icazə rədd edildi

`tailscaled` root səlahiyyəti tələb edir. Müvafiq POST endpointinə `sudoPassword` təqdim edin və ya demonu özünüz işə salın (`sudo systemctl start tailscaled`).

## Həmçinin baxın

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — çıxış trafiki üçün xarici proksi (1proxy, SOCKS5, HTTP).
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` daxil olmaqla mühit dəyişənlərinin tam siyahısı.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — stabil ictimai hostinq üçün tunelləməyə alternativlər.
- Mənbə: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
