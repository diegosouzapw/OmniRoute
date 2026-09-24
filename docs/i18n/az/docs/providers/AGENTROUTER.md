# AgentRouter Setup Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) Anthropic ilə uyğun olan, Claude və digər modelləri çox vaxt birbaşa Anthropic API-dən daha aşağı qiymətlərlə yenidən satan relay xidmətidir. O, rəsmi Claude Code klienti üçün birbaşa əvəzedici `ANTHROPIC_BASE_URL` kimi nəzərdə tutulub, buna görə də yalnız Claude Code trafik formatına uyğun olan trafiki qəbul edir (xüsusi User-Agent, `anthropic-beta` bayraqları, Stainless SDK başlıqları və s.).

## Sürətli başlanğıc — yerli `agentrouter` provayderindən istifadə edin (tövsiyə olunur)

Əksər istifadəçilər üçün **heç bir xüsusi quraşdırma tələb olunmur**. OmniRoute tam Claude Code trafik formatı əvvəlcədən daxil edilmiş daxili `agentrouter` provayderi ilə gəlir (`open-sse/config/providerRegistry.ts` → `agentrouter` bölməsinə baxın). Ondan istifadə etmək üçün:

1. **İdarə paneli → Provayderlər → Provayder əlavə et** bölməsini açın.
2. Siyahıdan **AgentRouter** seçin.
3. `sk-...` API açarınızı daxil edin və yadda saxlayın.

Bu qədər — mühit dəyişənlərinə və ya fərdi provayder növünə ehtiyac yoxdur. Daxili modellərə `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` və `deepseek-v3.2` daxildir.

Bu təlimatın qalan hissəsi **təkmil yolu** əhatə edir: `anthropic-compatible-cc-*` provayder növündən istifadə. Trafik formatı üzərində daha çox nəzarətə ehtiyacınız olduqda — məsələn, yerli provayder reyestrinə hələ əlavə edilməmiş digər AgentRouter tipli relay xidmətlərinə qoşularkən və ya əsas URL-i, söhbət yolunu və yaxud başlıq dəstini dəyişdirərkən — bu üsuldan istifadə edin.

---

## Təkmil: Claude Code ilə uyğun provayder növü vasitəsilə qoşulma

OmniRoute həmçinin AgentRouter-i (və oxşar relay xidmətlərini) düzgün trafik formatı ilə Anthropic Messages API-dən istifadə edən **Claude Code ilə uyğun** provayder növü (`anthropic-compatible-cc-*`) vasitəsilə də dəstəkləyir. `https://agentrouter.org` ünvanını göstərən ümumi `openai-compatible-chat` provayderi **işləməyəcək** — yuxarı səviyyədəki WAF Claude Code-dan gələn sorğulara bənzəməyən sorğuları rədd edir.

---

## İlkin tələblər

- AgentRouter hesabı və API açarı. Yeni qeydiyyatdan keçənlər layihənin [README](../README.md) faylındakı tərəfdaş keçidi vasitəsilə pulsuz kreditlər əldə edirlər.
- `ENABLE_CC_COMPATIBLE_PROVIDER` funksiya bayrağı aktivləşdirilmiş işlək OmniRoute instansiyası (aşağıya baxın).

## 1. CC ilə uyğun provayder növünü aktivləşdirin

Claude Code ilə uyğun provayder növü, rəsmi Claude Code klientinin trafikinə çox yaxın trafik göndərdiyi üçün funksiya bayrağı ilə qorunur. OmniRoute-u başlatmazdan əvvəl mühit dəyişəni təyin edərək onu aktivləşdirin:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker nümunəsi:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Yenidən başladıldıqdan sonra idarə panelində mövcud OpenAI ilə uyğun və Anthropic ilə uyğun axınlara əlavə olaraq **Claude Code ilə uyğun provayder əlavə et** seçimi görünür.

## 2. İdarə panelində provayder yaradın

1. **İdarə paneli → Provayderlər → Provayder əlavə et** bölməsini açın.
2. **Claude Code ilə uyğun provayder əlavə et** seçimini seçin (yalnız yuxarıdakı bayraq təyin edildikdə görünür).
3. Sahələri doldurun:

| Sahə        | Dəyər                                                                 |
| ----------- | --------------------------------------------------------------------- |
| Ad          | `AgentRouter` (və ya istənilən etiket)                                |
| Prefiks     | `agentrouter` (jurnallarda və idarə panelində göstərilən rahat ləqəb) |
| Əsas URL    | `https://agentrouter.org`                                             |
| Söhbət yolu | `/v1/messages?beta=true` (standart dəyər — dəyişdirmədən saxlayın)    |

> Kanonik model identifikatoru yenə də tam provayder qovşağı ID-sindən istifadə edir
> (`anthropic-compatible-cc-{uuid}/{model}`). **Prefiks** sadəcə daha rahat jurnal çıxışı üçün
> `src/lib/usage/callLogs.ts` tərəfindən təyin olunan ekran ləqəbidir.

4. (İstəyə bağlı) API açarınızı **Yoxlama** sahəsinə daxil edin və yadda saxlamazdan əvvəl bağlantını təsdiqləmək üçün **Yoxla** düyməsinə klikləyin.
5. **Əlavə et** düyməsinə klikləyin.

Yaradıldıqdan sonra provayderi açın və AgentRouter API açarınızla (`sk-...`) **Bağlantı** əlavə edin. Bağlantının `test_status` dəyəri `active` olmalıdır.

## 3. Ondan combo vasitəsilə və ya birbaşa istifadə edin

Provayderinizin prefiksindən ad məkanı kimi istifadə edərək modelə istinad edin:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanonik model ID-si `anthropic-compatible-cc-{uuid}/claude-opus-4-6` də işləyir
və verilənlər bazasında, eləcə də combo konfiqurasiyasında məhz bu formada görünür.

Yaxud marşrutlaşdırma, ehtiyat keçid və kvota idarəetməsi üçün onu digər
provayderlər kimi combo-ya əlavə edin.

---

## Wire image təfərrüatları

Məlumat üçün, cc-compatible körpüsü hər yuxarı axın sorğusunda aşağıdakıları
göndərir (baxın: `open-sse/services/claudeCodeCompatible.ts`):

| Başlıq                                            | Dəyər                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                   | `Bearer <api-key>`                                                                                                |
| `User-Agent`                                      | `claude-cli/2.1.258 (external, sdk-cli)`                                                                          |
| `anthropic-version`                               | `2023-06-01`                                                                                                      |
| `anthropic-beta`                                  | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                          |
| Hər bağlantı üçün redact-thinking beta keçidi     | Xüsusi olaraq redaktə edilmiş düşünmə axınları tələb edən yuxarı axınlara `redact-thinking-2026-02-12` əlavə edir |
| Hər bağlantı üçün ümumiləşdirilmiş düşünmə keçidi | Hələ göstərmə rejimi təyin edilməmiş CC Compatible düşünmə sorğularına `display: "summarized"` əlavə edir         |
| `anthropic-dangerous-direct-browser-access`       | `true`                                                                                                            |
| `x-app`                                           | `cli`                                                                                                             |
| `X-Stainless-*`                                   | Müxtəlif Stainless SDK başlıqları (dil, paket versiyası, ƏS, arxitektura və s.)                                   |

Məhz bu, sorğuların yuxarı axındakı WAF / müştəri icazə siyahısından keçməsinə imkan verir.

---

## Problemlərin aradan qaldırılması

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Sorğunuz Claude Code
wire image formatına uyğun gəlmədi. Bu, provayder `anthropic-compatible-cc` əvəzinə
`openai-compatible-chat` kimi konfiqurasiya edildikdə və ya başlanğıc zamanı
`ENABLE_CC_COMPATIBLE_PROVIDER=true` bayrağı təyin edilmədikdə baş verir.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Etibarsız token". Wire image düzgündür, lakin API açarı rədd edilir. AgentRouter
idarə panelində yeni açar yaradın və bağlantını yeniləyin.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-in moderasiya mexanizmi sorğunun məzmununu rədd edib və ya
açarın planı tələb olunan modelə icazə vermir. Fərqli prompt və ya model sınayın;
zərərsiz prompt davamlı olaraq bloklanırsa, AgentRouter dəstək xidməti ilə əlaqə saxlayın.

**`[400]: content-blocked` yalnız müəyyən modellərdə** — AgentRouter planlarının əksəriyyəti
yalnız modellərin bir alt çoxluğuna (məsələn, `claude-opus-4-6`) icazə verir. Açar etibarlı
olsa belə, digər model ID-ləri `unauthorized_client_error` qaytarır. Planınızın hansı
modelləri əhatə etdiyini AgentRouter idarə panelində yoxlayın.

**omniroute jurnallarında `Invalid JSON response from provider (reset after Ns)`** —
Yuxarı axın JSON olmayan cavab gövdəsi (adətən WAF-dan gələn HTML xəta səhifəsi) qaytarıb.
Bu, adətən sorğunun AgentRouter backend-inə heç çatmadığını bildirir — provayder ID-sinin
`anthropic-compatible-cc-` ilə başladığını yenidən yoxlayın (sondakı defisə diqqət edin —
`open-sse/services/claudeCodeCompatible.ts` daxilindəki `CLAUDE_CODE_COMPATIBLE_PREFIX`
bölməsinə baxın) və funksiya bayrağının aktiv olduğuna əmin olun.

**AgentRouter provayderi artıq mövcud olsa da, `unauthorized client detected` /
HTML xəta səhifəsi** — çox güman ki, **birdən çox** AgentRouter provayderiniz var
və sorğunuz yanlış provayderə yönləndirilir. Əgər `agentrouter` prefiksi ilə artıq qalmış,
əl ilə yaradılmış `anthropic-compatible-*` (`cc` olmayan) və ya
`openai-compatible-chat-*` provayderi yaradılıbsa, o, `agentrouter/<model>` model
ID-lərinə sahib ola bilər (və combo-lar ona qovşaq ID-si ilə istinad edə bilər); nəticədə
trafik düzgün wire image ilə birlikdə təqdim edilən daxili `agentrouter` provayderinin
əvəzinə həmin provayderə yönləndirilir — o isə ümumi User-Agent göndərir və rədd edilir.
Modelin faktiki olaraq hara həll olunduğunu omniroute jurnallarında yoxlayın (`ROUTING`
teqi `agentrouter/<model> → <providerId>/<model>` göstərir); əgər `<providerId>`
`agentrouter` deyilsə, yerli provayder üzərində birləşdirin: combo-ları
`agentrouter/<model>` ünvanına yönəldin (providerId `agentrouter`) və dublikat
compatible provayderləri silin. Yerli provayder üçün wire-image konfiqurasiyası və
`customUserAgent` tələb olunmur.

---

## Həmçinin baxın

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web provayderinin inteqrasiyasına dair qeydlər
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Pulsuz səviyyəli provayderlər
  kataloqu
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Şəkillərin ötürülməsi implementasiyası
