# Chaos Mode (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **İdarəetmə paneli:** **Chaos Mode** (yan panel) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (idarəetmə paneli sessiyası) · `POST /api/skills/collect/chaos` (API açarı)  
> **Mənbə:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **bir tapşırığı eyni anda bir neçə provayderə göndərir** — iştirak edən hər bir provayder
bir model instansiyası təqdim edir və siz bütün cavabları yan-yana (və ya zəncirvari) əldə edirsiniz. Bu,
marşrutlaşdırma strategiyası deyil, çoxmodelli icra səthidir: adi `/v1/chat/completions`
trafikinizə heç vaxt təsir etmir.

**Fərqləndirmə — adında "chaos" olan üç fərqli funksiya təqdim olunur:**

| Funksiya                    | Nədir                                                                                                                                                                                  | Harada sənədləşdirilib                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**              | Burada təsvir edilən idarəetmə paneli səhifəsi + API: bir tapşırığı bir çox provayderə paylayır (paralel və ya əməkdaşlıq rejimində).                                                  | Bu təlimat                                   |
| `auto/chaos`                | Auto-Combo model id-si: paralel paylama, hər provayder üçün bir model və hər biri üçün bir yuxarı axın çağırışı. Xəta inyeksiyası deyil ([təfərrüatlar](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo konfiqurasiyası | `config.chaos.enabled` ilə saxlanılan combo eyni qaydada paylama həyata keçirir (yalnız API); `judgeModel` yalnız yekun cavabı seçir, sintez çağırışı etmir.                           | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralel paylama

`auto/chaos` xəta inyeksiyası və ya dayanıqlılıq sınağı üçün **deyil**. `/v1/chat/completions`
üzərində `model: "auto/chaos"` sorğusu:

1. **Hər provayder üçün bir modeldən** ibarət panel yaradır: hər bir
   qoşulmuş provayderin namizəd hovuzundakı ardıcıllığa görə ilk namizədi, maksimum 5 üzvə qədər
   (`OMNIROUTE_CHAOS_MAX_PANEL`, maksimum 10 ilə məhdudlaşdırılır)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode` çəki
   paketi yalnız hər üzvün `weight` dəyərini təyin edir; paylama mexanizmi onu oxumur.
2. Eyni sorğunu panelin hər bir üzvünə **paralel olaraq** göndərir, buna görə də bir sorğu
   hər panel üzvü üçün bir yuxarı axın çağırışına başa gəlir
   (`open-sse/services/autoCombo/chaosEngine.ts`, çağırış
   `open-sse/services/combo.ts` tərəfindən yönləndirilir).
3. Hər panel üzvünün nəticəsi gəldikcə onun üçün bir status sətri yayımlayır: standart olaraq SSE şərhi
   (`: chaos <index> ok|fail <model>`), həmçinin sorğuda
   `stream_options.include_chaos_parts: true` təyin edildikdə `omni-chaos-part`
   hadisəsi (`model`, `index`, `ok`, `error`). Bunlarda cavab mətni olmur.
4. Yekun OpenAI üslublu fraqment kimi paneldən **bir** cavab göndərir: uğurlu olduqda ilk panel
   üzvünün cavabını (`auto/chaos` onu `judgeModel` kimi təyin edir), əks halda
   son uğurlu üzvün cavabını. Panelin digər cavabları qaytarılmır, buna görə də
   N çağırış üçün ödəniş edir və bir tamamlama cavabı alırsınız.

## Quraşdırma

1. **İdarə paneli → Chaos Mode** (`/dashboard/chaos`) bölməsini açın.
2. Onu **aktivləşdirin** — Chaos Mode standart olaraq **deaktivdir** (`enabled: false`,
   `src/lib/chaos/chaosConfig.ts` faylında). Deaktiv olduğu müddətdə `POST /api/chaos/run`
   sorğusuna `400 — "Chaos Mode aktiv deyil. Onu İdarə paneli → Chaos Mode bölməsində aktivləşdirin."`
   cavabı verilir.
3. İştirakçıları və standart parametrləri seçin (parametrlər yaddaşı vasitəsilə hər instansiya üçün saxlanılır):

   | Sahə                | Mənası                                                                       | Standart / limitlər                       |
   | ------------------- | ---------------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Əsas keçid                                                                   | `false`                                   |
   | `defaultMode`       | `parallel` və ya `collaborative` (aşağıya baxın)                             | `parallel`                                |
   | `providerOverrides` | Hər provayder üzrə iştirak (`providerId`, isteğe bağlı `modelId`, `enabled`) | boş = bütün aktiv provayderlər, maks. 200 |
   | `systemPrompt`      | Daxili Chaos sistem promptu üçün əvəzləmə                                    | isteğe bağlı, maks. 10 000 simvol         |
   | `timeoutMs`         | Hər model çağırışı üçün maksimum vaxt                                        | `120000` (5 000–600 000)                  |
   | `maxTokens`         | Hər model çağırışı üçün `max_tokens`                                         | `4096` (256–128 000)                      |

4. **Testi birbaşa səhifədən başladın** — nəticələr panelində hər provayderin cavabı,
   statusu və müddəti göstərilir.

## İcra rejimləri

- **`parallel`** — hər model eyni tapşırığı eyni anda alır; bütün cavabları
  bir-birindən asılı olmadan əldə edirsiniz.
- **`collaborative`** — modellər **zəncir şəklində** işləyir: hər biri əvvəlki modelin çıxışını görür və
  onu təkmilləşdirmək, genişləndirmək, tənqid etmək və ya alternativ təklif etmək tapşırığını alır. Cavabın `summary` sahəsi
  uğurlu çıxışları zəncir sırası ilə birləşdirir (paralel icralarda `summary` olmur).

## API

### `POST /api/chaos/run` — idarə paneli sessiyası

Kuki ilə autentifikasiya olunur (idarəetmə sessiyası —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) sənədinə baxın); idarə paneli səhifəsi tərəfindən istifadə edilir.

```jsonc
// sorğu gövdəsi
{
  "task": "X üçün yanaşmaları müqayisə et", // tələb olunur
  "providers": ["glm", "kimi"], // isteğe bağlı filtr
  "mode": "parallel", // isteğe bağlı — defaultMode parametrini əvəz edir
  "systemPrompt": "…", // isteğe bağlı əvəzləmə
  "maxTokens": 4096, // isteğe bağlı əvəzləmə
}
```

### `POST /api/skills/collect/chaos` — API açarı

Xarici çağıranlar üçün Bearer token variantı. Açar **Chaos Mode icazəsinə**
(`chaosModeEnabled`) malik olmalıdır; bu icazə **standart olaraq deaktivdir** — onu hər açar üçün
**İdarə paneli → API meneceri → açarı redaktə et → icazələr → Chaos Mode** bölməsində aktivləşdirin. Sorğu gövdəsi yuxarıdakı ilə eynidir.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"X üçün yanaşmaları müqayisə et","mode":"parallel"}'
```

Hər iki endpoint eyni strukturlu cavab qaytarır:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // yalnız collaborative rejimində
}
```

## Problemlərin aradan qaldırılması

- **`400 Chaos Mode is not enabled`** — yuxarıdakı 2-ci addıma baxın: qlobal keçid deaktivdir.
- **API açarı `/api/skills/collect/chaos` endpoint-ində rədd edilir** — açarda hər açar üzrə
  `chaosModeEnabled` icazəsi yoxdur (standart olaraq deaktivdir; bu, xəta deyil, parametrdir).
- **Gözlədiyiniz provayder nəticələrdə yoxdur** — Chaos Mode səhifəsindəki `providerOverrides`
  parametrini (deaktiv edilmiş əvəzləmə onu istisna edir) və provayder bağlantısının
  aktiv olub-olmadığını yoxlayın.
