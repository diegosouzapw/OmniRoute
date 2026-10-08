# Remote Mode (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute özü başqa bir yerdə (VPS-də, ev serverində, Tailnet-dəki başqa bir maşında) işləyərkən `omniroute` CLI-ni noutbukunuzda işə salın.
`omniroute connect` ilə bir dəfə daxil olursunuz və bundan sonra **hər bir** CLI əmri həmin uzaq serveri hədəfləyir — eyni əmrlər, eyni çıxış, sadəcə uzaq serverdə icra olunur.

Quraşdırılacaq ikinci bir alət yoxdur: uzaq rejim adi `omniroute` CLI-dən və əhatə dairəsi müəyyən edilmiş **giriş tokenlərindən** istifadə edir.

```bash
npm install -g omniroute                 # adi CLI
omniroute connect 192.168.0.15           # daxil olun (parol → əhatə dairəli token)
omniroute models list                    # ← indi UZAQ serverin modellərini siyahıya alır
omniroute configure codex                # ← uzaq kataloqdan lokal Codex profili yaradır
```

---

## İş prinsipi

```
noutbukunuz                              uzaq OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parol → token)            │
│  kontekst: vps     │ ───────────────►  │ əhatə dairəli giriş tokeni     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ hər idarəetmə marşrutu tokenin │
│ konfiqurasiyaları  │ ◄───────────────  │ əhatə dairəsinə görə yoxlanır │
│ LOKAL olaraq yazır │                   └───────────────────────────────┘
└────────────────────┘
```

- **Kontekstlər** hər biri bir server saxlayır (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` aktiv serveri dəyişir; `default` lokaldır.
- **Giriş tokenləri** (`oma_live_…`) idarəetmə əmrlərinə icazə verir. Onlar
  inferensiya API açarlarından (`sk-…`, `/v1/chat/completions` üçün istifadə olunur) fərqlənir.
- Tokenin yalnız SHA-256 heşi server tərəfində saxlanılır. Açıq mətn yalnız
  yaradılarkən **bir dəfə** göstərilir.

---

## Qoşulma

### İdarəetmə parolu ilə (ilkin quraşdırma)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 üçün idarəetmə parolu: ********
# ✔ http://192.168.0.15:20128 ünvanına qoşuldu — kontekst '192.168.0.15' (əhatə dairəsi: admin)
```

Parol axını standart olaraq **admin** tokeni yaradır (parol sizdə olduğuna görə
onsuz da tam nəzarətə maliksiniz). Əhatə dairəsini `--scope` ilə məhdudlaşdırın:

```bash
omniroute connect 192.168.0.15 --scope write
```

Seçimlər: `--port <p>` (hostda port göstərilmədikdə), `--name <ctx>` (kontekst adı),
`--scope read|write|admin`. Tam URL olduğu kimi qəbul edilir:
`omniroute connect https://omni.example.com`.

### Əvvəlcədən yaradılmış token ilə

İdarəetmə panelində (və ya `omniroute tokens create` ilə) əhatə dairəli token yaradıb
onu daxil edin — parol tələb olunmur:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI tokeni `GET /api/cli/whoami` vasitəsilə yoxlayır və onu aktiv kontekst kimi saxlayır.

---

## Əhatə dairələri

İyerarxik üç səviyyə (`admin ⊃ write ⊃ read`):

| Əhatə dairəsi | İcazə verilən əməliyyatlar                                                                 |
| ------------- | ------------------------------------------------------------------------------------------ |
| `read`        | siyahıya alma/yoxlama — `models list`, `providers status`, `logs`, `usage`, `cost`         |
| `write`       | oxuma **+** konfiqurasiya/tətbiq — `setup-codex`, `keys add`, `config set`, kombinasiyalar |
| `admin`       | yazma **+** idarəetmə — `tokens` CRUD, provayder əlavə etmək, xidmətlər, siyasət, oauth    |

Server hər marşrut üçün tələb olunan əhatə dairəsini HTTP metodundan
(`GET`→read, dəyişikliklər→write), həmçinin həssas səthlər üçün admin icazə siyahısından
(`/api/cli/tokens`, `/api/providers` dəyişiklikləri, `/api/oauth`, `/api/services`, …)
müəyyən edir. Əhatə dairəsi kifayət etməyən token aydın mesajla `403` cavabı alır.

> Proseslər başladan marşrutlar (`/api/services/*`, `/api/mcp/*`, …)
> **yalnız loopback** üçün əlçatan qalır — əhatə dairəsindən asılı olmayaraq, uzaq token onlara heç vaxt daxil ola bilməz.

---

## Uzaqdan quraşdırmada Antigravity-yə qoşulma

Antigravity Google-un firstparty/nativeapp razılıq ekranından istifadə edir. Google avtorizasiya kodunu yalnız **geridöngü yönləndirməsi**
(`http://127.0.0.1:<port>/callback`) **girişi təsdiqləyən brauzerdən əlçatan olduqda** təqdim edir. Uzaq VPS quraşdırmasında həmin geridöngü sizin kompüterinizdə deyil, serverdə yerləşir, buna görə də razılıq ekranı **həmişəlik ilişib qalır və heç vaxt kod yaratmır** — adi «geri çağırış URL-sini yapışdırın» ehtiyat variantında yapışdırılacaq heç nə olmur. (Bu, Google tərəfindəki məhdudiyyətdir: eyni ilişmə yalnız OmniRoute-da deyil, daxili Antigravity masaüstü klientindən istifadə edən istənilən proksidə baş verir.)

İdarəetmə paneli ilişib qalmazdan əvvəl bunu aşkarlayır: localhost olmayan ünvandan **Providers → Antigravity →
Connect** bölməsini açdıqda ümumi «geri çağırış URL-sini kopyalayın» bildirişi aşağıdakı iki həll yolu ilə əvəz olunur və hər birində hostunuzla portunuz əvvəlcədən doldurulur.
(LAN ünvanı da buna daxildir — bu geri çağırış baxımından `192.168.x.x` localhost deyil.)

Antigravity-ni uzaq OmniRoute-a qoşmağın dəstəklənən iki üsulu var.

### Variant A — lokal giriş köməkçisi (tövsiyə olunur)

OAuth-u `127.0.0.1` ünvanının əlçatan olduğu **öz kompüterinizdə** başladın. Köməkçi Google ilə birbaşa əlaqə saxlayır, buna görə də razılıq prosesi idarəetmə panelindəki versiyanın bacarmadığı yerdə tamamlanır.

**Artıq qoşulmusunuzsa** (`omniroute connect <host>`), kopyalanacaq heç nə yoxdur — köməkçi giriş məlumatını sizin üçün həmin quraşdırmaya ötürür:

```bash
# LOKAL kompüterinizdə (Node.js + brauzer tələb olunur):
omniroute connect 192.168.0.15        # bir dəfə — administrator əhatəli kontekst tokeni yaradır
npx omniroute login antigravity
#   ↳ Google razılıq ekranını açır, lokal geridöngü portunda geri çağırışı tutur,
#     onu mübadilə edir və giriş məlumatını aktiv kontekstə POST sorğusu ilə göndərir:
#
#   Antigravity http://192.168.0.15:20128 ünvanında qoşuldu (abc123 bağlantısı).
#   Yapışdırılacaq heç nə yoxdur — bu terminalı bağlaya bilərsiniz.
```

Aktiv kontekst başqa kompüterə yönəldikdə göndərmə avtomatik baş verir. Onu hər iki istiqamətdə `--push` / `--no-push` ilə məcburi təyin edin və ya `--context <name>` ilə konkret konteksti hədəfləyin.

**Kompüteriniz VPS-ə çata bilmirsə** (fayervol ilə bloklanıb, SSH yoxdur, iş masası şəbəkədən təcrid edilib), köməkçi yenə də işləyir — ona həqiqətən yalnız Google _lazımdır_. `--no-push` istifadə edin və ya sadəcə göndərmənin uğursuz olmasına icazə verin: köməkçi artıq tamamladığınız avtorizasiyanı silmək əvəzinə blob-u çap etməyə keçir.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Sonra **uzaq** idarəetmə panelində **Providers → Antigravity → Connect** bölməsinə keçin və `omniroute-cred-v1.…` blob-unu **Step 2** sahəsinə yapışdırın (bu sahə həm geri çağırış URL-sini, həm də giriş məlumatı blob-unu qəbul edir). OmniRoute onu dekodlaşdırır, Cloud Code ilkin quraşdırmasını server tərəfində icra edir və bağlantını qalıcı saxlayır.

> Blob yeniləmə tokeni ehtiva edir — onunla parol kimi davranın. Göndərmə üsulunda o, kontekstinizin autentifikasiya edilmiş bağlantısı üzərindən bir dəfə göndərilir; yapışdırma üsulunda isə idarəetmə paneli bağlantınız üzərindən ötürülür. Hər iki halda o, saxlanma zamanı şifrələnir və uğurlu göndərmə onu heç vaxt terminalınızda çap etmir.

Bayraqlar: `--no-browser` (avtomatik açmaq əvəzinə URL-ni çap edir), `--port <n>`
(geridöngü portunu sabitləyir), `--timeout <ms>`, `--push` / `--no-push` (avtomatik çatdırılmanı üstələyir), `--context <name>` (konkret konteksti hədəfləyir).

### Variant B — SSH lokal yönləndirmə tuneli

VPS-ə SSH girişiniz varsa, geridöngü geri çağırışının tunel vasitəsilə yenidən serverə yönəlməsi üçün idarəetmə panelinin portunu yönləndirin:

```bash
# LOKAL kompüterinizdə:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# sonra LOKAL brauzerinizdə http://localhost:20128 ünvanını açın və Antigravity-ni
# normal qaydada qoşun — 127.0.0.1:20128/callback yönləndirməsi indi SSH vasitəsilə VPS-ə çatır.
```

İdarəetmə panelinə `localhost:20128` kimi daxil olduğunuz üçün Google razılığı tamamlanır və geri çağırış eyni tunel vasitəsilə serverə çatdırılır — blob tələb olunmur. Bağlantı aktiv kimi görünənədək tuneli açıq saxlayın.

Aşağıdakı sabit geridöngülü provayderlərdən fərqli olaraq, burada **bir yönləndirmə kifayətdir**: Antigravity geri çağırışı idarəetmə panelinin öz portundan keçir, buna görə də tunellənəcək ikinci, provayderə məxsus porta ehtiyac yoxdur.

> Tamamilə başsız alternativ kimi (köməkçi və tunel olmadan) **öz** Google OAuth veb giriş məlumatlarınızı və açıq baza URL-sini konfiqurasiya edə bilərsiniz; provayderin OAuth mühit dəyişənlərinə baxın. Yuxarıdakı iki variant əlavə Google quraşdırması tələb etmir.

---

## Codex / Grok-un uzaq quraşdırmaya qoşulması (sabit loopback provayderləri)

Codex, xAI (`xai-oauth`) və Grok CLI (`grok-cli`) yuxarı səviyyəli OAuth tətbiqində
**sabit** loopback `redirect_uri` qeydiyyatdan keçirir. OmniRoute bunu dəyişə bilmir —
provayder brauzeri həmişə eyni sərt kodlaşdırılmış ünvana geri yönləndirir:

| Provayder   | Provayderin yönləndirdiyi sabit callback |
| ----------- | ---------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`    |
| `xai-oauth` | `http://127.0.0.1:56121/callback`        |
| `grok-cli`  | `http://127.0.0.1:56122/callback`        |

Buradakı `localhost` **brauzerin işlədiyi maşını** bildirir, OmniRoute-un PKCE
callback serveri isə **serverin** loopback interfeysində dinləyir. İdarəetmə panelini
`http://192.168.0.15:20128` kimi LAN ünvanında açdıqda bu ikisi heç vaxt
əlaqələnmir: avtorizasiya kodu heç nəyin dinləmədiyi şəxsi noutbukunuzun
`localhost:1455` ünvanına çatdırılır və provayder heç bir xəta göstərmədən
giriş prosesini uğursuz tamamlayır.

İdarəetmə paneli popup pəncərəsini açmazdan əvvəl bunu aşkarlayır və girişin səssizcə
uğursuz olmasına imkan vermək əvəzinə tunel əmrini göstərir (#8046).

### Həll — **hər iki** portu yönləndirin

```bash
# BRAUZERİN işlədiyi maşında:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# sonra http://localhost:20128 ünvanını açın və Codex-i oradan qoşun
```

İki yönləndirmə tələb olunur və yalnız birinin yönləndirilməsi yenə də uğursuzluqla
nəticələnir:

- **`20128`** (idarəetmə panelinin portu) mənbəni həqiqi localhost edir və bu,
  OmniRoute-un PKCE callback serverini ümumiyyətlə işə salmasını təmin edir —
  LAN mənbəyi heç vaxt həmin şaxəyə çatmır.
- **`1455`** (provayderin sabit callback portu) brauzerin geri göndərildiyi yerdir;
  bu trafik tunel vasitəsilə serverin loopback interfeysinə çatmalıdır.

xAI və ya Grok CLI qoşarkən `1455` əvəzinə `56121`/`56122`, `20128` əvəzinə isə
idarəetmə panelinizin faktiki portunu istifadə edin. Bağlantı aktiv kimi görünənədək
tuneli açıq saxlayın.

> **SSH girişiniz yoxdur?** Codex və Grok CLI yapışdırılmış tokeni də qəbul edir —
> qoşulma dialoqundakı **API açarını yapışdır** / **auth.json faylını idxal et**
> vərəqi. Bu yolda loopback callback yoxdur, buna görə də istənilən mənbədən
> işləyir. Codex əlavə olaraq sadə giriş tokenini və ya `~/.codex/auth.json`
> sessiya məlumatını qəbul edir.

---

## Tokenlərin idarə edilməsi

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ məxfi dəyəri yalnız BİR DƏFƏ göstərir — indi kopyalayın
omniroute tokens list                 # maskalanmış: id, ad, əhatə dairəsi, prefiks, status, bitmə vaxtı
omniroute tokens revoke <id|prefix>   # dərhal ləğv edin
omniroute tokens scopes               # üç əhatə dairəsini izah edir
```

`tokens` əmrləri **admin** etimadnaməsi tələb edir. Tokenləri idarəetmə panelində
**Parametrlər → Giriş tokenləri** bölməsindən də idarə edə bilərsiniz (yaratmaq,
ləğv etmək, bir dəfə kopyalamaq).

---

## Uzaq kataloqdan proqramlaşdırma CLI-sinin konfiqurasiyası

`omniroute configure` **aktiv serverin** canlı model kataloqunu oxuyur və
**sizin** maşınınızda konfiqurasiya yazır.

```bash
omniroute configure codex
#   Provayderlər: glm, kmc, ollamacloud, opencode-go, …
#   Provayder: glm
#   Model id-si: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml yazıldı
#   İstifadəsi:  codex --profile glm52

# interaktiv olmayan rejim
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# tez-tez istifadə edilən modeli interaktiv seçicinin yuxarısında saxlayın
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Seçici lokal `model-preferences.json` faylında yalnız model ID-lərini saxlayır
(URL-ləri və ya etimadnamələri heç vaxt saxlamır); onlar kontekst və CLI hədəfinə
görə əhatələnir. Sevimlilər son seçimlərdən əvvəl göstərilir; seçilmiş modeli
həmin kontekst/hədəf siyahısından silmək üçün `--unfavorite` istifadə edin.

Yazılmış profil inferensiya açarına mühit dəyişəni (`OMNIROUTE_API_KEY`) vasitəsilə
istinad edir — məxfi dəyər heç vaxt diskə yazılmır. Codex-in birdəfəlik əsas
quraşdırması (`[model_providers.omniroute]` bloku) üçün
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) sənədinə baxın.

### Uzaq serverə qarşı CLI-nin işə salınması (konfiqurasiya yazılmadan)

`omniroute run <target>` aktiv konteksti də nəzərə alır: uzaq baza URL-i və
kontekst etimadnaməsi yalnız başladılan prosesə daxil edilir.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → uzaq server
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Tam olaraq nəyin başladılacağını öncədən göstərin (yalnız mühit dəyişənlərinin ADLARI, dəyərləri heç vaxt yox):
omniroute run codex --dry-run --json
```

Hədəflər: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(yeganə mənbə: `bin/cli/cli-manifest.mjs`). Qwen və Gemini çıxış zamanı silinən
müvəqqəti, təcrid olunmuş ev qovluğu ilə işləyir, buna görə işəsalma şəxsi alət
konfiqurasiyanıza heç vaxt toxunmur və ya ora heç nə sızdırmır.

### Hər CLI üçün quraşdırma əmrləri

Dəstəklənən hər CLI-nin uzaq serveri nəzərə alan quraşdırma əmri var (hamısı aktiv
konteksti və ya `--remote <url> --api-key <key>` parametrlərini nəzərə alır):

| CLI         | Əmr                        | Nə yazır                                                                                                                                                                            |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profilləri (hər model üçün)                                                                                                                           |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (hər model üçün)                                                                                                                          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — kataloqdakı bütün modelləri ehtiva edən OpenAI-uyğun `omniroute` provayderi (`opencode -m omniroute/<model>` əmrini icra edin)                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI rejimi) + yerləşdirmək üçün VS Code genişləndirmə parametrlərini çap edir (OpenAI-uyğun, `/v1` **olmadan** baza URL-i)              |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` parametrləri — OpenAI-uyğun, `/v1` **ilə** baza URL-i                                                                  |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1` **ilə** `apiBase`, açar `${{ secrets.OMNIROUTE_API_KEY }}` vasitəsilə                          |
| Cursor      | `omniroute setup-cursor`   | tətbiqdaxili addımları çap edir (Settings → Models → Override OpenAI Base URL, `/v1` **ilə** + açar + model). Cursor konfiqurasiyası qeyri-şəffaf SQLite-dır — yalnız söhbət paneli |
| Roo Code    | `omniroute setup-roo`      | Roo idxal JSON-u (`~/.omniroute/roo-settings.json`) yazır + `roo-cline.autoImportSettingsPath` təyin edir + UI addımlarını çap edir (OpenAI-uyğun, `/v1` **ilə** baza URL-i)        |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` provayderi, `/v1` **ilə** `base_url`, açar `$OMNIROUTE_API_KEY` vasitəsilə                                                           |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `/v1` **olmadan** `OPENAI_HOST` + `GOOSE_MODEL`) + mühit dəyişənləri təlimatı                                              |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`/v1` **olmadan** `openai-api-base` + `model: openai/<id>`) + mühit dəyişənləri təlimatı (`aider --message --yes`)                                             |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` faylında V4 `modelProviders.openai` qeydi + `~/.qwen/.env` faylında `OMNIROUTE_API_KEY`                                                                     |

```bash
# OpenCode (OpenAI-uyğun provayder, bütün kataloq modelləri, uzaq VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # yalnız uyğun modelləri saxlayın
opencode -m omniroute/glm/glm-5.2 "..."          # əvvəlcə OMNIROUTE_API_KEY dəyişənini ixrac edin
```

> OpenCode həmçinin daha zəngin **plugin** inteqrasiyasına malikdir: `omniroute setup opencode`
> (indi `--remote` vasitəsilə uzaq bağlantını dəstəkləyir) `@omniroute/opencode-plugin` paketini quraşdırır.
> `setup-opencode` yüngül OpenAI-uyğun alternativdir. API açarına
> `{env:OMNIROUTE_API_KEY}` vasitəsilə istinad edilir — heç vaxt diskə yazılmır.
>
> OpenCode v2-də əvəzinə `@omniroute/opencode-plugin-v2` istifadə edin: eyni kataloq,
> fərqli yükləyici müqaviləsi. İnteqrasiya qoşulduqda açarı OpenCode-un öz etimadnamə
> anbarından oxuyur, buna görə uzaq şlüz üçün `opencode.json` daxilində ümumiyyətlə açar tələb olunmur.

---

## Kontekstləri idarə etmək (serverlər arasında keçid)

**Kontekst** yadda saxlanmış serverdir (baseUrl + credential + scope). `omniroute connect` birini yaradır və onu aktiv edir; bundan sonra hər bir əmr onu hədəfləyir. Onları `omniroute contexts` ilə idarə edin və aralarında keçid edin:

```bash
omniroute contexts list            # bütün kontekstlər; aktiv olan ● ilə işarələnib
omniroute contexts current         # aktiv server, autentifikasiya statusu, əhatə dairəsi
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Serverləri dəyişdirin** — hər sonrakı əmr aktiv konteksti izləyir:

```bash
omniroute contexts use vps         # → bütün əmrlər indi uzaq VPS-ə yönəlir
omniroute tokens list              #   (VPS-ə qarşı işləyir)

omniroute contexts use default     # → localhost-a qayıdır
omniroute tokens list              #   (yerli serverə qarşı işləyir)
```

**Konteksti əl ilə əlavə edin** (`connect` əvəzinə), yoxlayın və ya adını dəyişdirin:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # bir kontekst üçün tam detallar
omniroute contexts rename staging stg
```

**Konteksti silin** — təsdiq üçün sorğu verir; onu atlamaq üçün `--yes` keçirin (skriptlər / interaktiv olmayan shell-lər üçün tələb olunur, əks halda təhlükəsiz şəkildə imtina edir):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) silinə bilməz. Aktiv kontekstin silinməsi `default`a qayıdır. İpucu: kontekstin silinməsi yalnız **yerli** yadda saxlanmış etimadnaməni silir — girişi tamamilə dayandırmaq üçün serverdə `omniroute tokens revoke <id>` ilə tokeni ləğv edin.

Kontekstləri **ixrac / idxal edin** (məsələn, onları maşınlar arasında köçürmək üçün). İxraclar, fayl ehtiyatı ilə saxlanılan etimadnamələr daxil olmaqla, etimadnamələri standart olaraq buraxır. Portativ etimadnamə daşıyan ehtiyat nüsxəsi lazım olduqda `--include-secrets` açıq şəkildə istifadə edin:

```bash
omniroute contexts export --out contexts.json     # redaktə edilmiş; standart təyinat: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # üzərinə yaz; mövcud olanları saxlamaq üçün --merge
omniroute contexts migrate --yes                  # köhnə düz mətn tokenlərini açar zəncirinə köçürün
```

`--include-secrets` ixrac etməzdən əvvəl açar zənciri istinadlarını həll edir və istinad edilən hər hansı bir etimadnamə oxuna bilməzsə uğursuz olur. `--no-secrets` həmişə üstünlük təşkil edir. İxrac faylları `0600` rejimi ilə atomik şəkildə yazılır. Açıq şəkildə sirr daşıyan ixracı sirr materialı kimi qəbul edin. İstifadə edilə bilən OS açar zənciri olmayan başsız sistemlərdə, CLI `0600` rejimi ilə `config.json`a qayıdır və bir dəfəlik xəbərdarlıq çap edir; standart ixrac bu rejimdə redaktə edilmiş olaraq qalır.

---

## Sürətli başdan-sona yoxlama

Uzaq quraşdırmanı sıfırdan yoxlamaq üçün kopyalayıb yapışdıra biləcəyiniz həyat dövrü — qoşulun,
məhdud əhatəli token yaradın, əmri yönləndirin, geri keçin və hər şeyi ləğv edin.
`192.168.0.15` ünvanını serverinizin host/IP ünvanı ilə (Tailscale, LAN və ya açıq
`https://…` URL) əvəz edin.

```bash
# 1. Qoşulun (parol → admin tokeni, aktivləşdirilən kontekst kimi saxlanılır)
omniroute connect 192.168.0.15                 # yaxud: --key oma_live_xxxx  (parolsuz)
omniroute contexts current                     # uzaq serveri + əhatə dairəsini göstərir

# 2. İstifadə edin — idarəetmə əmrləri artıq uzaq serverdə icra olunur
omniroute tokens create --name laptop --scope read   # daha məhdud token yaradır
omniroute tokens list                                 # uzaq serverdən maskalanmış siyahı

# 3. İrəli-geri keçid edin
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → yenidən uzaq (`contexts list` siyahısındakı ad)

# 4. Ləğv edin. QEYD: `contexts remove` yalnız LOKAL giriş məlumatını silir —
#    serverdəki tokeni ləğv ETMİR. Girişi həqiqətən ləğv etmək istəyirsinizsə,
#    əvvəlcə server tərəfində tokeni ləğv edin.
omniroute tokens revoke <id|prefix>            # serverdəki girişi ləğv edir
omniroute contexts remove 192-168-0-15 --yes   # lokal konteksti silir (aktiv olsa belə → default-a keçir), təsdiq tələb etmir
```

> `--yes`, `contexts remove` əmrini qeyri-interaktiv edir (skriptlərdə/CI-da tələb olunur;
> bu parametr olmadan qeyri-interaktiv qabıq ilişib qalmaq əvəzinə təhlükəsiz şəkildə imtina edir). **Aktiv**
> kontekst silindikdə avtomatik olaraq `default` kontekstinə keçilir.

---

## Təhlükəsizlik qeydləri

- Tokenin açıq mətni yalnız bir dəfə göstərilir; yalnız SHA-256 heşi saxlanılır (API açarlarında olduğu kimi).
- `omniroute connect` giriş üçün kobud güc hücumlarına qarşı bloklamadan və audit jurnalından təkrar istifadə edir.
- Daşıma üçün HTTPS və ya Tailnet-ə üstünlük verin; yalnız host göstərildikdə LAN/Tailscale rahatlığı üçün standart olaraq `http://` istifadə olunur — TLS üçün tam `https://…` URL-i ötürün.
- Üstünlük verilən lokal kontekst faylı yalnız `credentialRef` ehtiva edən `~/.omniroute/config.json` (`chmod 600`) faylıdır; tokenin özü əməliyyat sisteminin açarlar zəncirində (`keytar`) saxlanılır və heç vaxt jurnallarda çap edilmir. İşlək yerli açarlar zənciri olmayan başsız quraşdırmalar eyni `0600` faylından açıq şəkildə ehtiyat variant kimi istifadə edir və bir dəfə xəbərdarlıq göstərir. Açarlar zənciri backend-i quraşdırdıqdan sonra `omniroute contexts migrate --yes` istifadə edin.

---

## API son nöqtələri (istinad)

| Metod  | Marşrut               | Doğrulama        | Əhatə dairəsi                |
| ------ | --------------------- | ---------------- | ---------------------------- |
| POST   | `/api/cli/connect`    | idarəetmə parolu | — (ictimai, parolla qorunan) |
| GET    | `/api/cli/whoami`     | giriş tokeni     | oxuma                        |
| GET    | `/api/cli/tokens`     | giriş tokeni     | inzibatçı                    |
| POST   | `/api/cli/tokens`     | giriş tokeni     | inzibatçı                    |
| DELETE | `/api/cli/tokens/:id` | giriş tokeni     | inzibatçı                    |

Tam sxemlər üçün [openapi.yaml](../openapi.yaml) faylına baxın.
