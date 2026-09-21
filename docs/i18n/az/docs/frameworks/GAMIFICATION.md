# Gamification & Leaderboard System (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Əsas mənbə:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute istifadəçiləri platforma ilə qarşılıqlı əlaqəyə — sorğular göndərməyə, provayderləri dəyişməyə, kombinasiyalar yaratmağa, tokenləri paylaşmağa və icmaya töhfə verməyə görə mükafatlandıran, ilk növbədə lokal işləyən oyunlaşdırma qatını ehtiva edir. Bütün vəziyyət SQLite-da saxlanılır; icma serverləri ilə federasiya könüllüdür və göndərmə əsaslıdır.

Sistem **əsas icra yolunda sıfır gecikmə** təmin etmək üçün hazırlanıb — oyunlaşdırma hadisələri sorğu emalı xəttindən nəticə gözlənilmədən göndərilir və heç vaxt LLM cavabını bloklamır.

---

## İcmal

### Məqsəd

Görünən irəliləyiş (XP, səviyyələr, nişanlar), sosial təsdiq (liderlik cədvəlləri) və iqtisadi stimullar (token paylaşımı, dəvət mükafatları) təqdim etməklə istifadəçi fəallığını və platformada qalma səviyyəsini artırmaq.

### Əhatə dairəsi

| Funksiya                     | Təsvir                                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| XP və səviyyələr             | Hər əmələ görə XP qazanın; polinom əyrisi üzrə səviyyə yüksəldin                              |
| Nişanlar                     | 4 nadirlik səviyyəsi ilə 5 kateqoriya üzrə 20-dən çox nailiyyət                               |
| Ardıcıllıqlar                | Cari/ən uzun ardıcıllıqla gündəlik aktiv istifadənin izlənməsi                                |
| Liderlik cədvəlləri          | Qlobal, həftəlik, aylıq, token paylaşımı və töhfə əhatələri                                   |
| Token paylaşımı              | İkitərəfli qeydiyyat reyestri vasitəsilə istifadəçilər arasında kreditlərin köçürülməsi       |
| Dəvət və istifadə            | SHA-256 ilə heşlənmiş yaddaşda saxlanan yönləndirmə kodları                                   |
| İcma serverləri              | Xarici OmniRoute instansiyaları ilə federasiya                                                |
| Fırıldaqçılığa qarşı müdafiə | Server tərəfində xal hesablanması, tezlik məhdudlaşdırması, z-xalı ilə anomaliya aşkarlanması |

### Dizayn prinsipləri

1. **İlk növbədə lokal** — bütün vəziyyət SQLite-da saxlanılır, xarici xidmətlər tələb olunmur.
2. **Bloklamayan** — hadisələr nəticə gözlənilmədən göndərilir; LLM cavab yolu oyunlaşdırma məntiqi tərəfindən heç vaxt gecikdirilmir.
3. **Server səlahiyyətli** — XP yalnız server tərəfində hesablanır; müştərilər xalları süni şəkildə artıra bilməz.
4. **Məxfiliyə hörmət edən** — liderlik cədvəlində iştirak könüllüdür; istifadəçilər profillərini gizlədə bilərlər.
5. **Federasiyaya hazır** — icma serverləri imzalanmış API vasitəsilə xalları göndərə bilər; sinxronizasiya əlavəedici deyil, üzərinə yazma prinsipilə işləyir.

---

## Arxitektura

### Yüksək səviyyəli axın

```
Müştəri sorğusu
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (mövcud emal xətti) ...
      → yuxarı axın cavabı müştəriyə göndərilir
      → setImmediate (nəticə gözlənilmədən):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Hadisə emitenti yeganə inteqrasiya nöqtəsidir. `chatCore.ts` cavab göndərildikdən sonra `emitGamificationEvent()` funksiyasını çağırır; hadisə modulu hadisəni XP, ardıcıllıq, nişan, liderlik cədvəli və fırıldaqçılığa qarşı müdafiə alt sistemlərinə paylayır.

### Modul asılılıqları qrafı

```
src/lib/gamification/
  events.ts          ← giriş nöqtəsi (chatCore.ts tərəfindən çağırılır)
    ├── xp.ts        ← XP hesablanması və səviyyənin müəyyənləşdirilməsi
    ├── streaks.ts   ← gündəlik aktiv ardıcıllığın izlənməsi
    ├── badges.ts    ← nişan meyarlarının qiymətləndirilməsi
    ├── leaderboard.ts ← reytinqin hesablanması və SSE yayımı
    ├── antiCheat.ts ← tezlik məhdudlaşdırması və anomaliyaların aşkarlanması
    ├── sharing.ts   ← token köçürmələri reyestri
    ├── invites.ts   ← dəvət/istifadə kodlarının idarə edilməsi
    ├── servers.ts   ← icma serverləri federasiyası
    └── notifications.ts ← SSE bildiriş axını

src/lib/db/
  gamification.ts    ← bütün CRUD əməliyyatları (8 cədvəl)

src/app/api/gamification/
  leaderboard/       ← GET reytinqləri, POST əl ilə yeniləmə
  leaderboard/stream ← SSE real vaxt yeniləmələri
  transfer/          ← GET tarixçəni, POST tokenləri göndər
  invite/            ← GET/POST kodları, DELETE ləğv et
  invite/redeem/     ← POST kodu istifadə et
  servers/           ← GET/POST/DELETE icma serverləri
  federation/score/  ← POST xalı serverə göndər
  federation/leaderboard/ ← GET liderlik cədvəlini serverdən əldə et
  notifications/     ← SSE nişan/səviyyə yüksəlişi bildirişləri
  anomalies/         ← GET anomaliya hesabatları (inzibatçı)
  rotate/            ← POST dəvət tokenlərinin məxfi açarlarını rotasiya et
```

---

## Məlumat Qatı

### Verilənlər Bazası Cədvəlləri

Bütün cədvəllər `060_create_gamification.sql` miqrasiyası ilə yaradılan əsas OmniRoute SQLite verilənlər bazasında yerləşir. WAL jurnallaşdırması `src/lib/db/core.ts` faylındakı singleton `getDbInstance()` funksiyasından miras alınır.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Domen Modulu: `src/lib/db/gamification.ts`

Standart OmniRoute nümunəsinə uyğundur — `getDbInstance()` funksiyasını `core.ts` faylından idxal edir və tipləşdirilmiş CRUD funksiyalarını ixrac edir. Marşrut emalçılarında birbaşa SQL istifadə edilmir.

Əsas funksiyalar:

| Funksiya                   | Təsvir                                                             |
| -------------------------- | ------------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) üçün xalı əlavə edir və ya yeniləyir   |
| `getLeaderboard()`         | Verilmiş scope/period üçün səhifələnmiş reytinqləri qaytarır       |
| `getUserLevel()`           | İstifadəçi səviyyəsi qeydini əldə edir və ya yaradır               |
| `updateUserLevel()`        | XP, səviyyə və titulu atomik şəkildə təyin edir                    |
| `getBadgeDefinitions()`    | Bütün nişan təriflərini qaytarır (istəyə görə filtrlənmiş)         |
| `getUserBadges()`          | İstifadəçinin qazandığı nişanları qaytarır                         |
| `awardBadge()`             | Nişan qazanma qeydini əlavə edir (badge_id üzrə idempotent)        |
| `logXpAction()`            | xp_audit_log cədvəlinə əlavə edir                                  |
| `getXpAuditLog()`          | İstifadəçinin səhifələnmiş audit tarixçəsini qaytarır              |
| `insertLedgerEntry()`      | İkitərəfli köçürmə aparır (tranzaksiya daxilində)                  |
| `getBalance()`             | İstifadəçi üçün qəbul edilənlərdən göndərilənləri çıxaraq cəmləyir |
| `getTransferHistory()`     | Səhifələnmiş köçürmə jurnalını qaytarır                            |
| `createInviteToken()`      | Dəvət kodunu və heşlənmiş tokeni əlavə edir                        |
| `redeemInviteToken()`      | Kod üzrə axtarır, doğrulayır və istifadə sayını artırır            |
| `upsertCommunityServer()`  | Federasiya serverini qeydiyyatdan keçirir və ya yeniləyir          |
| `getCommunityServers()`    | İstifadəçi üçün serverlərin siyahısını qaytarır                    |
| `deleteCommunityServer()`  | Server qeydiyyatını silir                                          |

---

## XP / Səviyyə Sistemi

**Fayl:** `src/lib/gamification/xp.ts`

### Səviyyə Əyrisi

`n` səviyyəsinə çatmaq üçün tələb olunan XP polinom əyrisinə əsaslanır:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Səviyyə | Növbəti səviyyə üçün XP | Ümumi XP  | Titul       |
| ------- | ----------------------- | --------- | ----------- |
| 1       | 100                     | 100       | Başlanğıc   |
| 5       | 1,118                   | 2,415     | Başlanğıc   |
| 10      | 3,162                   | 10,523    | Kəşfiyyatçı |
| 25      | 12,500                  | 86,024    | Kəşfiyyatçı |
| 50      | 35,355                  | 345,529   | Ekspert     |
| 75      | 64,952                  | 948,683   | Usta        |
| 100     | 100,000                 | 2,050,000 | Əfsanə      |

### Titullar

| Səviyyə Aralığı | Titul       |
| --------------- | ----------- |
| 1 – 9           | Başlanğıc   |
| 10 – 24         | Kəşfiyyatçı |
| 25 – 49         | Ekspert     |
| 50 – 74         | Usta        |
| 75 – 100        | Əfsanə      |

### XP Mükafatları

| Əməl              | XP  | Təsvir                                                         |
| ----------------- | --- | -------------------------------------------------------------- |
| `request`         | 1   | OmniRoute vasitəsilə yönləndirilən hər API sorğusu üçün        |
| `provider_switch` | 5   | Fərqli provayderə keçid                                        |
| `model_switch`    | 3   | Fərqli modelə keçid                                            |
| `combo_create`    | 10  | Yeni kombinasiya yaratmaq                                      |
| `combo_use`       | 2   | Sorğu üçün kombinasiyadan istifadə etmək                       |
| `token_share`     | 1   | Başqa istifadəçi ilə paylaşılan hər 1 000 token üçün           |
| `invite_redeem`   | 50  | Dəvət kodundan istifadə etmək                                  |
| `daily_login`     | 5   | Gündəlik aktiv istifadə (gündə bir dəfə)                       |
| `streak_bonus`    | 2   | Ardıcıl seriyanın hər günü üçün (seriyanın uzunluğuna vurulur) |
| `badge_unlock`    | 10  | Nişanın kilidini açmaq                                         |

### Mükafatlandırma Axını

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP miqdarını əldə etmək üçün `XP_REWARDS[action]` dəyərini axtarın.
2. `checkRateLimit()` yoxlamasından keçirin (fırıldaqçılığa qarşı: hər açar üçün dəqiqədə maksimum 1000 XP).
3. Tranzaksiya başladın:
   - Cari `user_levels` sətrini oxuyun.
   - XP əlavə edin; `levelFromXp(totalXp)` vasitəsilə səviyyəni yenidən hesablayın.
   - Səviyyə dəyişibsə, `levelUp = true` təyin edin.
   - `user_levels` sətrini yeniləyin.
   - `xp_audit_log` cədvəlinə daxil edin.
4. Nəticəni qaytarın. Bildirişləri çağıran tərəf idarə edir.

### Köməkçi: `levelFromXp(totalXp)`

Ümumi XP `totalXp` dəyərini keçənədək `xp_for_level(n)` dəyərlərini toplayaraq 1..100 səviyyələri üzrə iterasiya edir. Həddi ödənilən ən yüksək səviyyəni qaytarır.
Bu, O(100)-dür — səviyyələr maksimum 100 ilə məhdudlaşdığı üçün məqbuldur.

---

## Nişan Sistemi

**Fayl:** `src/lib/gamification/badges.ts`

### Kateqoriyalar

| Kateqoriya     | Təsvir                                       | Nümunə Nişanlar                                 |
| -------------- | -------------------------------------------- | ----------------------------------------------- |
| `usage`        | Həcmə əsaslanan mərhələlər                   | İlk Sorğu, 1K Sorğu, 100K                       |
| `sharing`      | Token paylaşımı və yönləndirmələr            | İlk Paylaşım, Səxavətli (10 paylaşım)           |
| `contribution` | İcma fəallığı                                | Kombinasiya Yaradıcısı, Provayder Kəşfiyyatçısı |
| `streak`       | Zaman ərzində ardıcıllıq                     | Həftənin Döyüşçüsü, Aya Sadiq                   |
| `rare`         | Əldə edilməsi çətin və ya gizli nailiyyətlər | Erkən İstifadəçi, Xəta Bildirən                 |

### Nadirlik Dərəcələri

| Nadirlik    | Rəng   | Ehtimal Göstəricisi         |
| ----------- | ------ | --------------------------- |
| `common`    | Boz    | İstifadəçilərin əksəriyyəti |
| `uncommon`  | Yaşıl  | Aktiv istifadəçilər         |
| `rare`      | Mavi   | Sadiq istifadəçilər         |
| `legendary` | Qızılı | Ən yaxşı 1%                 |

### Meyar Növləri

| Növ            | Sahə         | Təsvir                                                   |
| -------------- | ------------ | -------------------------------------------------------- |
| `action_count` | `count`      | Əməli N dəfə yerinə yetirmək (məs., 1000 sorğu)          |
| `streak`       | `days`       | Seriyanı ardıcıl N gün davam etdirmək                    |
| `unique_count` | `field`, `n` | N unikal dəyərdən istifadə etmək (məs., 10 fərqli model) |
| `rank`         | `scope`, `n` | Liderlər cədvəli əhatəsində N sırasına çatmaq            |
| `first`        | —            | Əməli ilk yerinə yetirən olmaq                           |
| `hidden`       | (dəyişir)    | Qazanılanadək göstərilməyən meyarlar                     |

Nişan tərifləri `badge_definitions` daxilində JSON `criteria` kimi saxlanılır:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Qiymətləndirmə Axını

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # bütün təriflər
    → getUserBadges(apiKeyId)         # artıq qazanılanlar (ötür)
    → qazanılmamış hər nişan üçün:
       → matchesCriteria(badge, event, userState)
       → uyğunluq varsa: awardBadge(apiKeyId, badgeId)
         → bildiriş məlumatlarını qaytar
```

Qiymətləndirmə **hadisə əsaslıdır** — o, hər oyunlaşdırma hadisəsindən sonra işə düşür, lakin yalnız `criteria.type` dəyəri hadisənin əməlinə uyğun gələn nişanları yoxlayır. Bu, qiymətləndirməni sürətli saxlayır (əksər hadisələr üçün < 5ms).

### `matchesCriteria(badge, event, userState)`

| Meyar Növü     | Yoxlama                                               |
| -------------- | ----------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`           |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                  |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                |
| `rank`         | `getRank(apiKeyId, scope) <= n`                       |
| `first`        | Bu əməl növü üçün əvvəlki `xp_audit_log` qeydi yoxdur |
| `hidden`       | Müvafiq alt yoxlamaya həvalə edir                     |

### Daxili Nişanlar (20+)

<details>
<summary>Nişanların tam siyahısı</summary>

| Nişan                     | Kateqoriya | Nadirlik  | Meyar                              |
| ------------------------- | ---------- | --------- | ---------------------------------- |
| İlk Addımlar              | istifadə   | adi       | 1 sorğu                            |
| İsinməyə Başlama          | istifadə   | adi       | 100 sorğu                          |
| Təcrübəli İstifadəçi      | istifadə   | qeyri-adi | 1,000 sorğu                        |
| Senturion                 | istifadə   | nadir     | 10,000 sorğu                       |
| OmniPower                 | istifadə   | əfsanəvi  | 100,000 sorğu                      |
| Provayder Səyyahı         | töhfə      | adi       | 5 fərqli provayderdən istifadə et  |
| Provayder Ustası          | töhfə      | qeyri-adi | 20 fərqli provayderdən istifadə et |
| Kombinasiya Memarı        | töhfə      | qeyri-adi | 5 kombinasiya yarat                |
| Kombinasiya Qrossmeysteri | töhfə      | nadir     | 25 kombinasiya yarat               |
| İlk Paylaşım              | paylaşım   | adi       | 1 token köçürməsi                  |
| Səxavətli                 | paylaşım   | qeyri-adi | 10 token köçürməsi                 |
| Xeyriyyəçi                | paylaşım   | nadir     | Ümumilikdə 10,000 token köçür      |
| Dəvətçi                   | paylaşım   | adi       | 1 uğurlu dəvət                     |
| Şəbəkə Qurucusu           | paylaşım   | qeyri-adi | 10 uğurlu dəvət                    |
| Həftə Döyüşçüsü           | ardıcıllıq | qeyri-adi | 7 günlük ardıcıllıq                |
| Aylıq Sadiqlik            | ardıcıllıq | nadir     | 30 günlük ardıcıllıq               |
| Qarşısıalınmaz            | ardıcıllıq | əfsanəvi  | 365 günlük ardıcıllıq              |
| Erkən İstifadəçi          | nadir      | əfsanəvi  | Beta dövründə qoşul                |
| Sıxılma Pioneri           | nadir      | qeyri-adi | Sıxılmadan 100 dəfə istifadə et    |
| Bacarıq Kolleksiyaçısı    | nadir      | nadir     | 10 fərqli bacarıqdan istifadə et   |
| Model Tədqiqatçısı        | töhfə      | qeyri-adi | 15 fərqli modeldən istifadə et     |

</details>

---

## Seriya İzləyicisi

**Fayl:** `src/lib/gamification/streaks.ts`

### Məlumat Modeli

Seriyalar ad məkanı ilə ayrılmış açarlar altında `key_value` cədvəlində (ortaq köməkçi cədvəl) saxlanılır:

| Açar                          | Dəyər                            | Təsvir                   |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktiv seriya məlumatları |

### Məntiq

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Seriya qeydini `key_value` cədvəlindən oxuyun.
2. `{current}`, `{longest}`, `{lastDate}` (ISO tarix sətri) dəyərlərini təhlil edin.
3. Əgər `lastDate === today` olarsa — dəyişiklik etməyin (bu gün artıq hesablanıb).
4. Əgər `lastDate === yesterday` olarsa — `current` dəyərini artırın; lazım gələrsə, `longest` dəyərini yeniləyin.
5. Əgər `lastDate < yesterday` olarsa — `current = 1` olaraq sıfırlayın (seriya pozulub).
6. Yenilənmiş qeydi yazın.
7. Mərhələləri yoxlayın: 7, 14, 30, 60, 90, 180, 365 gün. Mərhələ keçilibsə,
   `milestone = true` təyin edin (çağıran tərəf XP verir və nişanları yoxlayır).

### Sərhəd Halları

- **Saat qurşağı**: seriyalar UTC tarixlərindən (`new Date().toISOString().slice(0, 10)`) istifadə edir.
  Bu, məqsədyönlüdür — vahid standart saat qurşağı saat qurşaqları arasında keçid etməklə sistemdən sui-istifadənin qarşısını alır.
- **Yeni istifadəçilər**: seriya qeydi mövcud deyil; ilk sorğu onu
  `current=1, longest=1, lastDate=today` dəyərləri ilə yaradır.
- **Gündə bir neçə sorğu**: seriyanı yalnız UTC gününün ilk sorğusu
  artırır.

---

## Liderlər Cədvəli

**Fayl:** `src/lib/gamification/leaderboard.ts`

### Əhatə Dairələri

| Əhatə dairəsi   | Dövr    | Təsvir                                                                            |
| --------------- | ------- | --------------------------------------------------------------------------------- |
| `global`        | `all`   | Bütün zamanlar üzrə ümumi XP                                                      |
| `weekly`        | `week`  | Cari UTC həftəsində qazanılmış XP (B.e.-Bazar)                                    |
| `monthly`       | `month` | Cari UTC ayında qazanılmış XP                                                     |
| `tokens_shared` | `all`   | Başqalarına ötürülmüş ümumi token sayı                                            |
| `contributions` | `all`   | Yaradılmış kombolar + istifadə edilmiş provayderlər + istifadə edilmiş bacarıqlar |

### Reytinqin Hesablanması

Reytinqlər saxlanılmır, **oxunma zamanı hesablanır**. Bu, köhnəlmiş reytinq məlumatlarının qarşısını alır və dövri reytinq yenidən hesablama tapşırıqlarına ehtiyacı aradan qaldırır.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Sorğu nümunəsi:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Dövrlərin Rotasiyası

Həftəlik və aylıq liderlər cədvəlləri avtomatik olaraq rotasiya edilir:

1. **Arxivləşdirmə**: dövr sərhədində cari qeydləri dövr etiketi ilə
   `leaderboard_archive` cədvəlinə köçürün.
2. **Sıfırlama**: başa çatmış dövrün qeydlərini silin.
3. **Tətikləmə**: hər `updateLeaderboard()` çağırışında yoxlanılır; yeni dövrün ilk sorğusu
   rotasiyanı başladır.

Bu, həftəlik cədvəllərin hər bazar ertəsi UTC ilə saat 00:00-da, aylıq cədvəllərin isə hər ayın 1-də sıfırlanmasını təmin edir.

### SSE ilə Real Vaxt Yeniləmələri

**Son nöqtə:** `GET /api/gamification/stream`

```
Müştəri → GET /api/gamification/stream
  → SSE bağlantısı qurulur
  → Server dərhal ilk 10 yer üzrə liderlər cədvəlinin ani görüntüsünü göndərir
  → Hər 5 saniyədən bir: dəyişibsə, yenilənmiş ilk 10-luğu göndərir
  → Hər 15 saniyədən bir: bağlantının aktivliyini bildirən şərh (": heartbeat\n\n")
  → Müştəri bağlantını kəsir → təmizləmə (dinləyicini silmək)
```

Hadisə formatı:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE meneceri hər əhatə dairəsi üzrə qoşulmuş müştəriləri izləyir və yeniləmələri yalnız liderlər cədvəlinin məlumatları son göndərişdən sonra faktiki olaraq dəyişdikdə göndərir.

---

## Token Paylaşımı

**Fayl:** `src/lib/gamification/sharing.ts`

### İkitərəfli Mühasibat Uçotu

Hər köçürmə `token_ledger` cədvəlində iki sətir yaradır:

| Sətir  | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | göndərən      | qəbul edən  | +məbləğ  |
| Kredit | qəbul edən    | göndərən    | -məbləğ  |

Lakin qəbul edilmiş qayda belədir:

| Sətir    | `from_key_id` | `to_key_id` | `amount` | Məna                        |
| -------- | ------------- | ----------- | -------- | --------------------------- |
| Göndərmə | göndərən      | qəbul edən  | +məbləğ  | Göndərənin hesabından çıxış |
| Qəbul    | qəbul edən    | göndərən    | +məbləğ  | Qəbul edənin hesabına giriş |

Balans belə hesablanır:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Köçürmə Axını

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Doğrulama**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **İdempotentlik**: `idempotency_key` dəyərinin reyestrdə artıq mövcud olub-olmadığını yoxlayın.
   Mövcuddursa, keşlənmiş nəticəni qaytarın.
3. **Tranzaksiya** (vahid SQLite tranzaksiyası):
   a. Göndərənin balansını hesablayın.
   b. Əgər `balance < amount` olarsa, dayandırın (kifayət qədər vəsait yoxdur).
   c. Göndərmə sətrini daxil edin (`from=sender,` qaytarın.

### Tezlik Məhdudlaşdırması

- Hər API açarı üçün dəqiqədə maksimum 10 köçürmə.
- Bir köçürmə üçün maksimum 10,000 token.
- Hər API açarı üçün gündə maksimum 100,000 token köçürməsi.

---

## Dəvət və Tokenlərin İstifadəsi

**Fayl:** `src/lib/gamification/invites.ts`

### Kod Formatı

- **Kod**: istifadəçiyə göstərilən, insan tərəfindən oxuna bilən 8 simvolluq hərf-rəqəm kombinasiyası (məsələn, `A3K9-X7M2`).
- **Token**: SHA-256 heşi kimi saxlanılan 32 baytlıq təsadüfi token. Proqram vasitəsilə istifadə üçün nəzərdə tutulur (məsələn, URL keçidləri).

### Saxlama

| Sütun        | Dəyər                             |
| ------------ | --------------------------------- |
| `code`       | `A3K9X7M2` (unikal, indekslənmiş) |
| `token_hash` | SHA-256(raw_token)                |

Xam token yaradılma zamanı istifadəçiyə yalnız bir dəfə qaytarılır. OmniRoute
onu bir daha nə saxlayır, nə də göstərir — yalnız heş qalıcı olaraq saxlanılır.

### Özünə İstinadın Qarşısının Alınması

İstifadəçi koddan istifadə etdikdə sistem aşağıdakıları yoxlayır:

1. Kod fərqli `api_key_id` dəyərinə aiddir.
2. Kodu istifadə edən istifadəçi daha əvvəl eyni dəvət edəndən heç bir kod istifadə etməyib
   (`invite_tokens` + istifadə jurnalı üzrə birləşdirmə).

Yoxlamalardan hər hansı biri uğursuz olarsa, istifadə əməliyyatı aydın xəta mesajı ilə rədd edilir.

### Müddətin Bitməsi və Məhdudiyyətlər

- Defolt `max_uses`: 10 (yaradılma zamanı konfiqurasiya edilə bilər).
- Defolt `expires_at`: yaradılma tarixindən 30 gün sonra.
- Müddəti bitmiş və ya istifadə limiti tükənmiş kodlar HTTP 410 Gone qaytarır.

---

## İcma Serverlərinin Federasiyası

**Fayl:** `src/lib/gamification/servers.ts`

### Qoşulma

İcma serveri uzaq server tərəfindən verilmiş dəvət tokeni vasitəsilə qeydiyyata alınır. Lokal instansiya:

1. Dəvət tokenini qəbul edir (məsələn, idarə panelinə yapışdırıldıqda).
2. Tokeni doğrulamaq və cari liderlər cədvəlini əldə etmək üçün uzaq serverdə `POST /api/gamification/federation/leaderboard` sorğusunu çağırır.
3. Server qeydini `status: connected` ilə saxlayır.

### Sinxronizasiya Modeli

Federasiya əlavəli deyil, **üzərinə yazmaqla sinxronizasiya** modelindən istifadə edir:

```
Lokal instansiya                İcma serveri
     │                              │
     ├── xalı göndər ──────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server token heşini doğrulayır)
     │                              │
     ├── liderlər cədvəlini çək ───►│  GET /federation/leaderboard
     │◄── ilk N qeyd ───────────────┤  (lokal keşin üzərinə yazır)
     │                              │
     └── sağlamlıq yoxlaması ──────►│  GET /federation/health
         (hər 60 saniyədən bir,     │
          taym-aut 5 saniyə)
```

### Autentifikasiya

Federasiya sorğularına aşağıdakılar daxildir:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Uzaq server tokeni heşləyir və uyğun `community_servers` sətrini axtarır. Bu, saxlanmış heşin ötürülməsinin qarşısını alır.

### Sağlamlığın Monitorinqi

Hər server qeydi aşağıdakıları izləyir:

| Sahə        | Təsvir                                         |
| ----------- | ---------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`         |
| `last_sync` | Son uğurlu sinxronizasiyanın ISO zaman damğası |
| `failures`  | Ardıcıl sağlamlıq yoxlaması xətaları           |

Ardıcıl 5 uğursuzluqdan sonra status `unreachable` olaraq dəyişir və əl ilə aparılan sağlamlıq yoxlaması uğurla tamamlanana qədər sinxronizasiya dayandırılır.

---

## Fırıldaqçılıq Əleyhinə Tədbirlər

**Fayl:** `src/lib/gamification/antiCheat.ts`

### Server Tərəfində Xal Hesablanması

Bütün XP hesablamaları `src/lib/gamification/xp.ts` daxilində aparılır. Klientlər heç vaxt xal göndərmir — onlar fəaliyyətləri göndərir, server isə XP-ni hesablayır. `leaderboard.score` sütununa yalnız server tərəfli kod tərəfindən yazıla bilər.

### Tezlik Məhdudiyyətləri

| Məhdudiyyət                  | Dəyər   | Əhatə dairəsi      |
| ---------------------------- | ------- | ------------------ |
| Dəqiqə üzrə maksimum XP      | 1,000   | Hər API açarı üzrə |
| Dəqiqə üzrə maksimum köçürmə | 10      | Hər API açarı üzrə |
| Maksimum köçürmə məbləği     | 10,000  | Hər köçürmə üzrə   |
| Maksimum gündəlik köçürmə    | 100,000 | Hər API açarı üzrə |

Tezlik məhdudiyyətləri yaddaşdaxili sürüşən pəncərədən (`open-sse/services/` daxilindəki `RateLimitManager` ilə eyni model) istifadə edir. Proses yenidən başladıqda SQLite əsaslı sayğaclara keçir.

### Z-Xalı ilə Anomaliyaların Aşkarlanması

Sistem hər API açarı üçün saatda qazanılmış XP üzrə sürüşən 7 günlük pəncərə saxlayır. Hər XP verildikdə:

1. İstifadəçinin cari saatlıq XP tezliyini hesablayır.
2. Populyasiyanın orta qiymətini və standart kənarlaşmasını hesablayır.
3. `z = (user_rate - mean) / stddev` hesablayır.
4. `z > 3.0` (3 standart kənarlaşma) olarsa, anomaliya kimi işarələyir.

Anomaliyalar `action = 'anomaly_detected'` ilə `xp_audit_log` jurnalına qeyd olunur və administratorun idarə panelində göstərilir.

### Audit İzi

Hər XP verilməsi, köçürmə, nişan qazanılması və anomaliya aşkarlanması aşağıdakılarla birlikdə `xp_audit_log` jurnalına qeyd olunur:

| Sahə         | Təsvir                                                |
| ------------ | ----------------------------------------------------- |
| `api_key_id` | Kim                                                   |
| `action`     | Nə baş verdi (xp_award, transfer, anomaly, …)         |
| `xp_awarded` | Məbləğ (XP ilə əlaqəli olmayan hadisələr üçün 0)      |
| `metadata`   | Konteksti ehtiva edən JSON (fəaliyyət növü, hədəf, …) |
| `created_at` | Nə vaxt (ISO 8601)                                    |

Administratorlar `GET /api/gamification/anomalies` vasitəsilə tam audit izini sorğulaya bilərlər.

---

## API Marşrutları

Bütün marşrutlar standart OmniRoute strukturuna uyğundur:

```
Marşrut → CORS ilkin sorğusu → Sorğu gövdəsinin yoxlanması (Zod) → Autentifikasiya (extractApiKey)
  → Emaledici
```

### Son Nöqtələr

| Metod  | Yol                                        | Təsvir                                               | Autentifikasiya |
| ------ | ------------------------------------------ | ---------------------------------------------------- | --------------- |
| GET    | `/api/gamification/leaderboard`            | Liderlər cədvəlini əldə et (əhatə, dövr, səhifələmə) | İxtiyari        |
| POST   | `/api/gamification/leaderboard`            | Liderlər cədvəli keşini məcburi yenilə               | Tələb olunur    |
| GET    | `/api/gamification/stream`                 | Liderlər cədvəlinin real vaxt SSE yeniləmələri       | İxtiyari        |
| GET    | `/api/gamification/transfer`               | Köçürmə tarixçəsini əldə et (səhifələmə)             | Tələb olunur    |
| POST   | `/api/gamification/transfer`               | Başqa istifadəçiyə token göndər                      | Tələb olunur    |
| GET    | `/api/gamification/invite`                 | Dəvət kodlarımı siyahıla                             | Tələb olunur    |
| POST   | `/api/gamification/invite`                 | Yeni dəvət kodu yarat                                | Tələb olunur    |
| DELETE | `/api/gamification/invite`                 | Dəvət kodunu ləğv et                                 | Tələb olunur    |
| POST   | `/api/gamification/invite/redeem`          | Dəvət kodundan istifadə et                           | Tələb olunur    |
| GET    | `/api/gamification/servers`                | İcma serverlərini siyahıla                           | Tələb olunur    |
| POST   | `/api/gamification/servers`                | İcma serverinə qoşul                                 | Tələb olunur    |
| DELETE | `/api/gamification/servers`                | İcma serverindən ayrıl                               | Tələb olunur    |
| POST   | `/api/gamification/federation/score`       | Xalı uzaq serverə göndər                             | Federasiya      |
| GET    | `/api/gamification/federation/leaderboard` | Liderlər cədvəlini uzaq serverdən əldə et            | Federasiya      |
| GET    | `/api/gamification/notifications`          | Nişan/səviyyə artımı üzrə SSE bildirişləri           | Tələb olunur    |
| GET    | `/api/gamification/anomalies`              | Anomaliya hesabatlarına bax (admin)                  | Admin           |
| POST   | `/api/gamification/rotate`                 | Dəvət tokeni sirlərini rotasiya et                   | Tələb olunur    |

### Sorğu/Cavab Nümunələri

**POST /api/gamification/transfer**

```json
// Sorğu
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Cavab 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Cavab 400 (balans kifayət deyil)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP Alətləri (8)

Mövcud alətlərlə yanaşı `open-sse/mcp-server/` daxilində qeydiyyatdan keçirilib. `gamification` icazə əhatəsi ilə məhdudlaşdırılıb.

| Alət                       | Təsvir                                               | Giriş Sxemi                  |           |
| -------------------------- | ---------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Əhatə/dövr üzrə liderlər cədvəlini əldə edir         | `{ scope, period?, limit? }` |
| `gamification_rank`        | Çağıranın reytinqini və qonşularını əldə edir        | `{ scope }`                  |
| `gamification_profile`     | XP, səviyyə, titul və seriya xülasəsini gətirir      | `{}`                         |
| `gamification_badges`      | Qazanılmış nişanları və ya bütün tərifləri sadalayır | `{ earned?: boolean }`       |
| `gamification_transfer`    | Başqa istifadəçiyə tokenlər göndərir                 | `{ to, amount }`             |
| `gamification_invite`      | Dəvət kodlarını yaradır və ya sadalayır              | `{ action: "create"          | "list" }` |
| `gamification_servers`     | İcma serverlərini sadalayır və ya qoşulur            | `{ action, token? }`         |
| `gamification_anomalies`   | Anomaliya hesabatlarına baxır (admin əhatəsi)        | `{ limit?, since? }`         |

---

## İdarəetmə Paneli Səhifələri

### `/dashboard/leaderboard`

- Podium görünüşü (avatarlar və XP ilə ilk 3 yer).
- Əhatə seçicisi: Qlobal / Həftəlik / Aylıq / Paylaşılan Tokenlər / Töhfələr.
- Reytinq, ad, xal, səviyyə və titul məlumatlarını ehtiva edən səhifələnmiş cədvəl (hər səhifədə 25 qeyd).
- SSE ilə real vaxt yeniləmələri — reytinq dəyişiklikləri animasiya ilə göstərilir.
- Cari istifadəçi cədvəldə vurğulanır və "Sizin Reytinqiniz" yapışqan sətri göstərilir.

### `/dashboard/profile`

- Cari səviyyə və növbəti səviyyə həddi ilə XP irəliləyiş zolağı.
- Titul nişanı nəzərəçarpan şəkildə göstərilir.
- Nişan qalereyası — qazanılmış nişanlar qazanılma tarixi ilə, qazanılmamış nişanlar isə solğun göstərilir
  (gizli nişanlar qazanılanadək "???" göstərir).
- Alov ikonu ilə seriya sayğacı; seriya təqvimi (son 30 gün).
- XP tarixçəsi qrafiki (son 30 gün ərzində gündəlik XP).

### `/dashboard/tokens`

- Token balansı (nəzərəçarpan şəkildə, səhifənin yuxarısında).
- Köçürmə forması: alıcı, məbləğ, təsdiq dialoqu.
- Filtrləri olan köçürmə tarixçəsi cədvəli (göndərilən/qəbul edilən/hamısı).
- Dəvət bölməsi: aktiv kodlar, yenisini yaratmaq, keçidi paylaşmaq.
- İcma serverləri: sağlamlıq statusu ilə siyahı, qoşulma/əlaqəni kəsmə.

### `/dashboard/gamification/admin`

- Ciddilik dərəcəsi, istifadəçi, vaxt möhürü və z-xalı ilə anomaliya siyahısı.
- Filtrləri olan audit jurnalı görüntüləyicisi (əməliyyat növü, istifadəçi, tarix aralığı).
- Sistem statistikası: verilmiş ümumi XP, aktiv istifadəçilər, nişan qazanma göstəriciləri.
- Federasiya serverlərinin sağlamlıq vəziyyətinə ümumi baxış.

---

## Konveyer İnteqrasiyası

### İnteqrasiya Nöqtəsi

Oyunlaşdırma sorğu konveyerinə `open-sse/handlers/chatCore.ts` daxilində yalnız bir nöqtədə qoşulur:

```typescript
// Cavab müştəriyə göndərildikdən sonra:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Göndər və unut: jurnala yaz, lakin heç vaxt müştəriyə ötürmə
  });
});
```

### Hadisə Növləri

| Hadisə Növü         | Nə Zaman Yaradılır                                                |
| ------------------- | ----------------------------------------------------------------- |
| `request.completed` | Uğurlu LLM cavabı göndərildikdə                                   |
| `provider.switch`   | Provayder dəyişdirildikdə (combo ehtiyat keçidləri nəzərə alınır) |
| `combo.created`     | Yeni combo konfiqurasiyası saxlanıldıqda                          |
| `combo.used`        | Combo hədəfinə uğurla çatıldıqda                                  |
| `badge.earned`      | Nişan qiymətləndirilməsi uyğunluq tapdıqda                        |
| `streak.milestone`  | Seriya həddi keçildikdə                                           |
| `transfer.sent`     | Token köçürməsi tamamlandıqda                                     |
| `referral.redeemed` | Dəvət kodu uğurla istifadə edildikdə                              |
| `compression.used`  | Sorğu sıxışdırması tətbiq edildikdə                               |
| `skill.executed`    | Bacarıq icrası tamamlandıqda                                      |
| `model.first_use`   | Model son 7 gündə istifadə edilmədikdə                            |

### Bloklamama Zəmanəti

`setImmediate` + `.catch(() => {})` nümunəsi aşağıdakıları təmin edir:

1. Oyunlaşdırma işə düşməzdən əvvəl cavab tam şəkildə göndərilir.
2. Oyunlaşdırma xətaları heç vaxt müştəriyə göstərilmir.
3. Hadisənin emalı sətirdaxili deyil, növbəti mikro-tapşırıqda həyata keçirilir.

---

## Təhlükəsizlik

### Təhdid Modeli

| Təhdid                              | Qarşısının alınması üsulu                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| Xalların süni artırılması           | XP yalnız server tərəfində hesablanır; müştərilər xalları deyil, əməliyyatları göndərir |
| Təkrar hücumları                    | Köçürmələrdə idempotentlik açarları; audit jurnalında dublikatların silinməsi           |
| Köçürmə fırıldaqçılığı              | İkitərəfli mühasibat reyestri; atomik tranzaksiyalar; tezlik məhdudiyyətləri            |
| Özünə yönləndirmə                   | İstifadə zamanı `api_key_id` üzrə çarpaz yoxlama                                        |
| Liderlər cədvəlinin manipulyasiyası | Z-xalı əsasında anomaliyaların aşkarlanması; administrator üçün anomaliya paneli        |
| Federasiya tokeninin oğurlanması    | SHA-256 ilə heşlənmiş saxlama; xam token yalnız bir dəfə göstərilir                     |
| Dəvət kodlarına kobud güc hücumları | İstifadə son nöqtəsində tezlik məhdudiyyəti; 8 simvolluq entropiya                      |
| Göstərilən adlarda XSS              | Göstərilən adlar təmizlənir; liderlər cədvəlinin qeydləri ekranlaşdırılır               |
| Heşlərə qarşı zamanlama hücumları   | Token heşlərinin müqayisəsi üçün `crypto.timingSafeEqual`                               |

### Autentifikasiya Tələbləri

- **İctimai** (autentifikasiya tələb olunmur): `GET /leaderboard`, `GET /stream` (yalnız oxumaq üçün
  liderlər cədvəlləri).
- **API açarı tələb olunur**: bütün yazma əməliyyatları, profil, köçürmələr, dəvətlər.
- **Yalnız administrator**: anomaliya paneli, audit jurnalına baxış vasitəsi.
- **Federasiya**: `Authorization` başlığında xam tokendən istifadə edən ayrıca autentifikasiya
  yolu; saxlanılan SHA-256 heşi ilə yoxlanılır.

---

## Testləmə

### Test Faylları

Bütün testlər Node.js-in daxili test icraçısından (`node --import tsx/esm --test`) istifadə edir.

| Test Faylı                                    | Əhatə etdiyi sahə                                                 | Testlər |
| --------------------------------------------- | ----------------------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP hesablanması, səviyyə əyrisi, titullar                         | 8       |
| `tests/unit/gamification/badges.test.ts`      | Nişan meyarlarının uyğunluğu, verilməsi                           | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Seriya məntiqi, mərhələlər, kənar hallar                          | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Reytinq hesablanması, səhifələmə, rotasiya                        | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Köçürmələr, balans, idempotentlik                                 | 9       |
| `tests/unit/gamification/invites.test.ts`     | Yaratma, istifadə, müddətin bitməsi, özünə yönləndirmə            | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Tezlik məhdudiyyətləri, z-xalı, audit jurnalına qeyd              | 6       |
| `tests/unit/gamification/events.test.ts`      | Hadisələrin yaradılması, çoxsaylı yayım, xətaların idarə edilməsi | 5       |

### Testlərin İcrası

```bash
# Bütün oyunlaşdırma testləri
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Tək test faylı
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Əhatə Tələbləri

`CONTRIBUTING.md` sənədinə əsasən — bütün yeni modullar aşağıdakı tələblərə cavab verməlidir:

- Budaq əhatəsi >= 80%.
- Hər bir ictimai funksiya ən azı bir dəfə test edilməlidir.
- Xəta yolları test edilməlidir (qeyri-kafi balans, müddəti bitmiş kodlar, tezlik məhdudiyyətləri).

---

## Fayl strukturu

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Bütün 8 cədvəl + indekslər
      gamification.ts                  # Domen CRUD modulu
    gamification/
      xp.ts                           # XP hesablanması, səviyyə əyrisi, titullar
      badges.ts                       # Nişan tərifləri, meyarlar, qiymətləndirmə
      streaks.ts                      # Gündəlik ardıcıllığın izlənməsi
      leaderboard.ts                  # Reytinq hesablanması, SSE, rotasiya
      antiCheat.ts                    # Tezlik məhdudlaşdırması, z-xalı, audit
      sharing.ts                      # Token köçürmələri reyestri
      invites.ts                      # Dəvət/istifadə kodları
      servers.ts                      # İcma serverlərinin federasiyası
      events.ts                       # Hadisə yayımlayıcısı (inteqrasiya nöqtəsi)
      notifications.ts                # SSE bildiriş axını
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST liderlər cədvəli
        leaderboard/stream/route.ts   # SSE real vaxt yeniləmələri
        transfer/route.ts             # GET/POST köçürmələri
        invite/route.ts               # GET/POST/DELETE dəvət kodları
        invite/redeem/route.ts        # POST koddan istifadə
        servers/route.ts              # GET/POST/DELETE serverləri
        federation/score/route.ts     # POST xalı göndərmək
        federation/leaderboard/route.ts # GET liderlər cədvəlini əldə etmək
        notifications/route.ts        # SSE bildirişləri
        anomalies/route.ts            # GET anomaliya hesabatları
        rotate/route.ts               # POST məxfi məlumatları rotasiya etmək
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Reytinq səhifəsi
        profile/page.tsx               # XP/nişanlar/ardıcıllıqlar səhifəsi
        tokens/page.tsx                # Balans/köçürmələr/dəvətlər səhifəsi
        gamification/admin/page.tsx    # Anomaliyaların inzibatçı monitorinqi
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Bu sənəd
```

---

## Miqrasiya strategiyası

### Mərhələ 1: Backend nüvəsi (PR 1)

- `060_create_gamification.sql` miqrasiyası (8 cədvəl).
- `src/lib/db/gamification.ts` (domen modulu).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts` daxilində inteqrasiya nöqtəsi.
- XP, ardıcıllıqlar və hadisələr üçün vahid testləri.

### Mərhələ 2: Nişanlar və liderlər cədvəli (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Sabitlərdə nişan tərifləri.
- Liderlər cədvəli API marşrutları + SSE axını.
- Nişanlar və liderlər cədvəli üçün vahid testləri.

### Mərhələ 3: Paylaşım və dəvətlər (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Köçürmə + dəvət API marşrutları.
- Paylaşım, dəvətlər və fırıldaqçılığa qarşı mexanizm üçün vahid testləri.

### Mərhələ 4: Federasiya və idarəetmə paneli (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federasiya API marşrutları.
- İdarəetmə paneli səhifələri (liderlər cədvəli, profil, tokenlər, inzibatçı).
- MCP alətlərinin qeydiyyatı.

---

## Gələcək üçün nəzərdə tutulanlar

- **Mövsümi tədbirlər**: məhdud müddətə təqdim olunan nişan dəstləri və liderlər cədvəli mövsümləri.
- **Komanda liderlər cədvəlləri**: istifadəçiləri təşkilata və ya komboya görə qruplaşdırın.
- **XP çoxaldıcıları**: təşviqat dövrlərində XP miqdarını artırın.
- **Nailiyyətlərin paylaşılması**: paylaşıla bilən nişan kartları (OpenGraph şəkilləri) yaradın.
- **Mobil push bildirişləri**: nişan/səviyyə hadisələri üçün webhook əsaslı bildirişlər.
- **Liderlər cədvəli API-si**: üçüncü tərəf inteqrasiyaları üçün açıq API.
