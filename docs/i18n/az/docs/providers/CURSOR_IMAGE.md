# Cursor Image Generation (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute Cursor planının **şəkil generasiyası** imkanını çatla eyni provayder identifikatoru — `cursor` (`cu` aliası) — vasitəsilə `POST /v1/images/generations` ünvanında təqdim edir.

| Sahə                             | Dəyər                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` identifikatoru | `cursor`                                                                             |
| Format                           | `cursor-agent-image`                                                                 |
| Autentifikasiya                  | Çatla eyni OAuth / API açarı bağlantısı (`provider_connections.provider = "cursor"`) |
| Modellər                         | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                            |

## Niyə Agent CLI

OmniRoute-da Cursor çatı `agent.v1.AgentService/Run` (protobuf) istifadə edir. Bu yol daxili müştəri alətlərini (shell, write, …) **rədd edir**. Şəkil generasiyası istifadəçi hesabı ilə **`agent` CLI** tərəfindən icra edilən Cursor-a məxsus alətdir. Buna görə də şəkil emalçısı kilidlənmiş prompt və hər sorğu üçün müvəqqəti iş sahəsi ilə `agent` prosesini işə salır (icma hesab körpüləri ilə eyni quruluşda), sonra isə OpenAI ilə uyğun `b64_json` qaytarır.

## Giriş məhdudiyyəti (Sərt Qaydalar #15 + #17)

Bu, alt proses (`agent` binar faylı) işə salan yeganə `IMAGE_PROVIDERS` formatıdır. `POST /v1/images/generations` uzaq çağırış edənlərin qanuni şəkildə istifadə etdiyi, alt proses işə salmayan təxminən 40 digər şəkil provayderi tərəfindən paylaşıldığı üçün bütün marşrut `LOCAL_ONLY` kimi təsnif edilmir — bunun əvəzinə `handleCursorAgentImageGeneration`, authz emal xəttinin hər sorğuya əlavə etdiyi etibarlı `AUTHZ_HEADER_PEER_LOCALITY` hökmündən istifadə edərək öz giriş yoxlamasını tətbiq edir (saxtalaşdırıla bilən `Host` başlığından deyil, real TCP tərəfdaşından əldə edilir): yalnız `loopback` və `lan` çağırışçıları prosesin işə salınmasına çata bilər; digərləri isə (ictimai tunel üzərindən təkrar istifadə edilən sızmış API açarı daxil olmaqla) hər hansı giriş məlumatı axtarışından və ya proses işə salınmazdan əvvəl `403` alır. `LOCAL_ONLY` səviyyəsinin qalan hissəsinə tətbiq edilən eyni siyasət üçün `src/server/authz/policies/management.ts` faylına baxın.

## Paralellik qapısı modul səviyyəsindədir (tək instansiya məhdudiyyəti)

`CURSOR_IMG_MAX_CONCURRENT`, Node modul instansiyasının əhatə dairəsində olan yaddaşdaxili sayğac/növbə tərəfindən tətbiq edilir (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). O, bir OmniRoute prosesi daxilində paralel `agent` proseslərinin işə salınmasını düzgün məhdudlaşdırır, lakin eyni Cursor hesabını paylaşan bir neçə proses/instansiya (məsələn, çoxreplikalı yerləşdirmə) arasında koordinasiya **etmir** — hər instansiya öz müstəqil limitini tətbiq edir. Tək instansiyalı yerləşdirmə (standart variant) üçün bu dəqiq işləyir; üfüqi miqyaslandırılmış yerləşdirmələr hər instansiya üçün `CURSOR_IMG_MAX_CONCURRENT` dəyərini konservativ saxlamalı və ya Cursor şəkil trafikini tək instansiyaya yönləndirməlidir.

## Tələblər

1. İdarəetmə panelində qoşulmuş Cursor hesabı (OAuth və ya `crsr_…` API açarı).
2. OmniRoute prosesi üçün əlçatan Cursor Agent binar faylı:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, yaxud
   - `~/.local/bin/agent`, yaxud
   - Cursor bağlantısındakı `providerSpecificData.agentBin`.

İstəyə bağlı tənzimləmə:

| Env                         | Standart dəyər          | Mənası                                  |
| --------------------------- | ----------------------- | --------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                | Hər şəkil üçün ümumi icra müddəti       |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                     | Paylaşılan hesab üçün paralellik qapısı |
| `CURSOR_IMG_MODEL`          | (sorğu modeli / `auto`) | CLI `--model` dəyərini əvəz edir        |

## Nümunə

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generasiya adətən 1–2 dəqiqə çəkir. Daxili şəbəkə yoluna üstünlük verin; təxminən 100 saniyəlik taymautları olan sərhəd proksiləri uğursuz olacaq.

## LiteLLM

Şəkil modelini `mode: image_generation`, `api_base: http://omniroute:20128/v1` və `model: openai/cursor/auto` (yaxud LiteLLM versiyanızdan asılı olaraq sadəcə `cursor/auto`) ilə qeydiyyatdan keçirin.
