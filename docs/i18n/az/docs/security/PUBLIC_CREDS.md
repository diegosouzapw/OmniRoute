# Public Credentials Handling (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Əsas mənbə:** `open-sse/utils/publicCreds.ts`
> **Testlər:** `tests/unit/publicCreds.test.ts`
> **Son yenilənmə:** 2026-08-07 — v3.8.50
> **Auditoriya:** İctimai CLI-lərində açıq OAuth client_id / client_secret / Firebase Web API açarları təqdim edən provayderləri inteqrasiya edən mühəndislər.
> **Status:** Yuxarı axın identifikatorlarını daxil edən bütün yeni kodlar üçün **MƏCBURİDİR**.

## Bu niyə mövcuddur

- [Doğma tətbiqlər üçün OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — Quraşdırılmış tətbiqlər üçün OAuth client_id / client_secret açıqdır; faktiki təhlükəsizliyi PKCE təmin edir.
- [Firebase API açarları](https://firebase.google.com/docs/projects/api-keys) — Veb-klient identifikatorları dizayn etibarilə açıqdır.

OmniRoute bu dəyərləri daxil etməlidir ki, `.env` konfiqurasiya etməyən istifadəçilər də heç bir əlavə sazlama olmadan işlək OAuth axını əldə etsinlər. Daxil edilmiş ehtiyat dəyər olmadıqda, Gemini / Antigravity provayderləri "sadəcə klonla və işə sal" yolunu izləyən bütün istifadəçilər üçün işləməyi dayandırır.

Lakin `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` kimi hərfi dəyərlər **GitHub Secret Scanning**, **Semgrep** və oxşar nümunə skanerləri tərəfindən aşkarlanır. Hər buraxılış səs-küylü yanlış müsbət nəticələr axınına çevrilir, push qoruması legitim commit-ləri bloklayır və operatorlar xəbərdarlıq lentinə etibar etməyi dayandırırlar.

`open-sse/utils/publicCreds.ts` köməkçisi hər iki məhdudiyyəti eyni anda həll edir:

- Açıq identifikatoru **XOR ilə maskalanmış bayt ardıcıllığı** kimi daxil edir (mənbədə skaner nümunəsi olmur).
- İcra zamanı `decodePublicCred` / `resolvePublicCred` vasitəsilə deşifrə edir.
- Artıq geniş tanınan prefikslərə (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) uyğun olan xam dəyərləri aşkarlayır və dəyişdirmədən ötürür; beləliklə, mövcud `.env` fayllarında xam dəyərlər olan istifadəçilər **heç bir miqrasiya olmadan** işləməyə davam edirlər.

Bu, **şifrələmə deyil, obfuskasiyadır.** Mənbəni oxuyan hər kəs dəyəri bərpa edə bilər — bu, normaldır, çünki dəyər dizayn etibarilə açıqdır. Yeganə məqsəd skanerlərin regex uyğunluqlarından yayınmaqdır.

## Məcburi nümunə

### 1. Yeni açıq etimadnamənin əlavə edilməsi

Aşağıdakı xüsusiyyətlərə malik, yuxarı axın tərəfindən təqdim edilən yeni dəyəri daxil etməli olduqda:

- açıq CLI / masaüstü tətbiqi / brauzer paketindən gəlirsə, **və**
- yuxarı axın provayderi onu açıq klient identifikatoru kimi sənədləşdirirsə (və ya belə hesab edirsə), **və**
- nümunə skaneri əks halda onu aşkarlayacaqsa (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` və s.),

…bu yoxlama siyahısına əməl edin:

1. Maskalanmış bayt ardıcıllığını yaradın:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` daxilindəki `EMBEDDED_DEFAULTS` obyektinə **neytral açar adı** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` və s.) ilə yeni qeyd əlavə edin. Köməkçidə `client_secret` və ya `api_key` kimi adlardan **istifadə etməyin** — bu sözlər Semgrep-in ümumi məxfi məlumat qaydalarını işə salır.

3. Açıq tip birləşməsinə `keyof typeof EMBEDDED_DEFAULTS` əlavə edin (bu, avtomatik olaraq müəyyən edilir).

4. İstehlakçı kodunda sərt kodlaşdırılmış hərfi dəyəri aşağıdakılarla əvəz edin:

   ```ts
   // vahid mühit dəyişəni ilə əvəzləmə
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // bir neçə mühit dəyişəni alternativi (ilk boş olmayan dəyər üstünlük qazanır)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // mühit dəyişəni ilə əvəzləmə yoxdur (həmişə daxil edilmiş standart dəyər)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Hərfi dəyəri `.env.example` faylından silin (onu oxucuları buraya yönləndirən, yalnız şərhlərdən ibarət sənədləşdirmə ilə əvəz edin):

   ```dotenv
   # ── Provayder (Google / Firebase / və s.) ──
   # Açıq OAuth etimadnamələri kodun daxilinə
   # open-sse/utils/publicCreds.ts vasitəsilə yerləşdirilib. Bu dəyişənləri yalnız öz dəyərlərinizi istifadə etmək üçün təyin edin.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Yeni açar üçün forma yoxlaması əlavə etmək məqsədilə `tests/unit/publicCreds.test.ts` faylını yeniləyin (hərfi dəyəri deyil, formatı yoxlayın — nümunə üçün mövcud testlərə baxın).

7. Test fayllarına **heç vaxt** `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` hərfi dəyərləri əlavə etməyin. `.join("")` fraqmentlərindən yaradılan `FAKE_*` sabitlərindən istifadə edin (mövcud testlərə baxın).

### 2. İstehlakçılar

- **Yalnız `resolvePublicCred()` / `resolvePublicCredMulti()` vasitəsilə oxuyun** — köməkçidən kənarda heç vaxt `decodePublicCredBytes()` funksiyasını birbaşa çağırmayın.
- Köməkçi qəsdən yüngüldür (xətti bayt XOR əməliyyatı) və modul yüklənərkən çağırılması təhlükəsizdir; standart dəyərlər bir dəfə hesablanır.
- Mühit dəyişəni ilə əvəzləmə həmişə üstünlük qazanır. İstifadəçi `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` təyin edərsə, köməkçi həmin xam dəyəri dəyişdirmədən ötürür.

### 3. Qadağan edilmiş nümunələr

❌ İstehsal kodunda (`src/`, `open-sse/`, `electron/`, `bin/`) aşağıdakılardan hər hansı birini **heç vaxt** etməyin:

```ts
// PİS: hərfi dəyər Secret Scanning + Semgrep-i işə salır
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// PİS: hərfi dəyərin base64 forması — GitHub bunu Feb/2025-dən bəri yenə də aşkarlayır
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// PİS: icra zamanı nümunəni yenidən birləşdirən sətir konkatenasiyası
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// PİS: hex/ROT13 kodlaşdırması — fərqli obfuskasiya, eyni aşkarlanma riski
clientSecret: hexDecode("474f4353..."),
```

Bunların hamısı sonda skaneri işə salır. `resolvePublicCred()` istifadə edin.

❌ Hərfi etimadnamələri `.env.example` faylına **heç vaxt** əlavə etməyin. Real yuxarı axın dəyərlərinə ehtiyacı olan istifadəçilər onları açıq CLI-dən özləri çıxara və ya öz OAuth qeydiyyatlarından istifadə edə bilərlər.

❌ Etimadnamənin bu köməkçiyə köçürülməli olub-olmadığını əvvəlcə yoxlamadan yeni məxfi məlumat skanı xəbərdarlığını **heç vaxt** nəzərə almamazlıq etməyin.

## Əlaqəli nəzarət mexanizmləri

- `publicCreds.ts` faylındakı `RAW_VALUE_PATTERN` birbaşa ötürülməni aktivləşdirən prefiksləri sadalayır (geriyə uyğunluq üçün). Onu yalnız sənədləşdirilmiş ictimai credential formatları üçün genişləndirin, heç vaxt xüsusi sirlər üçün deyil.
- `.env.example` CI-dəki `check-env-doc-sync` skriptinə daxildir — burada dəyişəni sildikdə sənədlərin də uyğunlaşdırıldığına əmin olun.
- Həm `npm run test:vitest`, həm də `node --import tsx/esm --test tests/unit/publicCreds.test.ts` test dəstləri uğurla keçməlidir.

## Bu köməkçi funksiyadan nə zaman istifadə ETMƏMƏLİ

Bu köməkçi funksiya **yalnız** aşağıdakı credential-lar üçündür:

1. Əsas provayder tərəfindən açıq şəkildə yayılanlar (CLI binar faylı, brauzer paketi, rəsmi sənədlər).
2. Məxfi olmadığı sənədləşdirilmiş və ya qəti şəkildə nəzərdə tutulanlar (PKCE ilə qorunan, Firebase Web açarı və oxşarları).

Bütün digər hallarda — operator tərəfindən verilmiş tokenlər, hər tenant üçün ayrıca sirlər, öz OAuth tətbiqinizin client_secret-i, şifrələmə açarları, JWT sirləri, verilənlər bazası parolları — **yalnız env dəyişənlərindən** (`process.env.FOO`, boş dəyərə `||` ehtiyat keçidi / açıq xəta) istifadə edin. Bunlar mənbə kodunda deyil, `.env` faylında və [şifrələnmiş credential anbarında](./COMPLIANCE.md) saxlanmalıdır.

## İstinadlar

- [Google: Yerli tətbiqlər üçün OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Müştəri identifikasiyası üçün API açarları](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning tərəfindən dəstəklənən sirlər](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: tokenlər üçün base64 aşkarlanması (fevral 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Bu köməkçi funksiyanı təqdim edən commit: `1a39c31f` — _fix(security): ictimai upstream credential-larını maskala + xəta sanitizasiyasını mərkəzləşdir_
