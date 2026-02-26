# Pag-troubleshoot

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Mga karaniwang problema at solusyon para sa OmniRoute.

---

## Mabilis na Pag-aayos

| Problema                                          | Solusyon                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------------------- |
| Unang login ay hindi gumagana                     | Lagyan ng check ang `INITIAL_PASSWORD` sa `.env` (default: `123456`)         |
| Nagbubukas ang dashboard sa maling port           | Itakda ang `PORT=20128` at `NEXT_PUBLIC_BASE_URL=http://localhost:20128`     |
| Walang mga log ng kahilingan sa ilalim ng `logs/` | Itakda ang `ENABLE_REQUEST_LOGS=true`                                        |
| EACCES: tinanggihan ang pahintulot                | Itakda ang `DATA_DIR=/path/to/writable/dir` na i-override ang `~/.omniroute` |
| Hindi nagse-save ang diskarte sa pagruruta        | Update sa v1.4.11+ (Zod schema fix para sa pagtitiyaga ng mga setting)       |

---

## Mga Isyu sa Provider

### "Ang modelo ng wika ay hindi nagbigay ng mga mensahe"

**Sanhi:** Naubos na ang quota ng provider.

**Ayusin:**

1. Suriin ang dashboard quota tracker
2. Gumamit ng combo na may fallback tier
3. Lumipat sa mas mura/libreng tier

### Paglilimita sa Rate

**Dahil:** Naubos na ang quota ng subscription.

**Ayusin:**

- Magdagdag ng fallback: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gamitin ang GLM/MiniMax bilang murang backup

### Nag-expire na ang OAuth Token

Ang OmniRoute ay awtomatikong nagre-refresh ng mga token. Kung magpapatuloy ang mga isyu:

1. Dashboard → Provider → Kumonekta muli
2. Tanggalin at muling idagdag ang koneksyon ng provider

---

## Mga Isyu sa Ulap

### Mga Error sa Cloud Sync

1. I-verify ang `BASE_URL` na mga puntos sa iyong running instance (hal., `http://localhost:20128`)
2. I-verify ang `CLOUD_URL` na mga puntos sa iyong cloud endpoint (hal., `https://omniroute.dev`)
3. Panatilihing nakahanay ang mga value ng `NEXT_PUBLIC_*` sa mga value sa gilid ng server

### Cloud `stream=false` Nagbabalik ng 500

**Symptom:** `Unexpected token 'd'...` sa cloud endpoint para sa mga non-streaming na tawag.

**Sanhi:** Ibinabalik ng Upstream ang SSE payload habang inaasahan ng kliyente ang JSON.

**Workaround:** Gamitin ang `stream=true` para sa mga direktang tawag sa cloud. Kasama sa lokal na runtime ang SSE→JSON fallback.

### Cloud Says Connected ngunit "Invalid API key"

1. Gumawa ng bagong key mula sa lokal na dashboard (`/api/keys`)
2. Patakbuhin ang cloud sync: Paganahin ang Cloud → Sync Now
3. Ang mga luma/hindi naka-sync na key ay maaari pa ring ibalik ang `401` sa cloud

---

## Mga Isyu sa Docker

### Hindi Naka-install ang Mga Palabas ng CLI Tool

1. Suriin ang mga field ng runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para sa portable mode: gumamit ng target ng imahe `runner-cli` (mga naka-bundle na CLI)
3. Para sa host mount mode: itakda ang `CLI_EXTRA_PATHS` at i-mount ang host bin directory bilang read-only
4. Kung `installed=true` at `runnable=false`: natagpuan ang binary ngunit nabigo ang healthcheck

### Mabilis na Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Mga Isyu sa Gastos

### Mataas na Gastos

1. Suriin ang mga istatistika ng paggamit sa Dashboard → Paggamit
2. Ilipat ang pangunahing modelo sa GLM/MiniMax
3. Gumamit ng libreng tier (Gemini CLI, iFlow) para sa mga hindi kritikal na gawain
4. Magtakda ng mga badyet sa gastos sa bawat API key: Dashboard → API Keys → Badyet

---

## Pag-debug

### Paganahin ang Mga Log ng Kahilingan

Itakda ang `ENABLE_REQUEST_LOGS=true` sa iyong `.env` file. Lumilitaw ang mga log sa ilalim ng `logs/` na direktoryo.

### Suriin ang Kalusugan ng Provider

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Pangunahing estado: `${DATA_DIR}/db.json` (mga provider, combo, alias, key, setting)
- Paggamit: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Mga log ng kahilingan: `<repo>/logs/...` (kapag `ENABLE_REQUEST_LOGS=true`)

---

## Mga Isyu sa Circuit Breaker

### Natigil ang provider sa OPEN na estado

Kapag ang circuit breaker ng provider ay BUKAS, ang mga kahilingan ay hinaharangan hanggang sa mag-expire ang cooldown.

**Ayusin:**

1. Pumunta sa **Dashboard → Settings → Resilience**
2. Suriin ang circuit breaker card para sa apektadong provider
3. I-click ang **I-reset Lahat** upang i-clear ang lahat ng mga breaker, o hintaying mag-expire ang cooldown
4. I-verify na available talaga ang provider bago i-reset

### Patuloy na binabadtrip ng provider ang circuit breaker

Kung ang isang provider ay paulit-ulit na pumasok sa OPEN state:

1. Suriin ang **Dashboard → Health → Provider Health** para sa pattern ng pagkabigo
2. Pumunta sa **Settings → Resilience → Provider Profiles** at taasan ang failure threshold
3. Suriin kung binago ng provider ang mga limitasyon ng API o nangangailangan ng muling pagpapatotoo
4. Suriin ang latency telemetry — ang mataas na latency ay maaaring magdulot ng mga pagkabigo batay sa timeout

---

## Mga Isyu sa Transkripsyon ng Audio

### Error sa "Hindi sinusuportahang modelo."

- Tiyaking ginagamit mo ang tamang prefix: `deepgram/nova-3` o `assemblyai/best`
- I-verify na konektado ang provider sa **Dashboard → Mga Provider**

### Nagbabalik ang transkripsyon na walang laman o nabigo

- Suriin ang mga sinusuportahang format ng audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- I-verify na ang laki ng file ay nasa loob ng mga limitasyon ng provider (karaniwang <25MB)
- Suriin ang validity ng provider ng API key sa provider card

---

## Pag-debug ng Tagasalin

Gamitin ang **Dashboard → Translator** upang i-debug ang mga isyu sa pagsasalin ng format:

| Mode             | Kailan Gagamitin                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Laruan**       | Paghambingin ang mga format ng input/output nang magkatabi — i-paste ang isang nabigong kahilingan upang makita kung paano ito isinasalin |
| **Chat Tester**  | Magpadala ng mga live na mensahe at siyasatin ang buong kahilingan/tugon payload kasama ang mga header                                    |
| **Test Bench**   | Magpatakbo ng mga batch test sa mga kumbinasyon ng format upang malaman kung aling mga pagsasalin ang sira                                |
| **Live Monitor** | Panoorin ang daloy ng kahilingan sa real-time upang mahuli ang mga pasulput-sulpot na isyu sa pagsasalin                                  |

### Mga karaniwang isyu sa format

- **Hindi lumalabas ang mga tag ng pag-iisip** — Tingnan kung sinusuportahan ng target na provider ang pag-iisip at ang setting ng badyet sa pag-iisip
- **Pagbaba ng mga tawag sa tool** — Maaaring alisin ng ilang pagsasalin ng format ang mga hindi sinusuportahang field; i-verify sa Playground mode
- **System prompt nawawala** — Claude at Gemini handle system prompts magkaiba; suriin ang output ng pagsasalin
- **Nagbabalik ang SDK ng hilaw na string sa halip na object** — Naayos sa v1.1.0: tinatanggal na ngayon ng response sanitizer ang mga hindi karaniwang field (`x_groq`, `usage_breakdown`, atbp.) na nagdudulot ng mga pagkabigo sa pagpapatunay ng OpenAI SDK Pydantic
- **Tinatanggihan ng GLM/ERNIE ang `system` na tungkulin** — Naayos sa v1.1.0: awtomatikong pinagsasama ng role normalizer ang mga mensahe ng system sa mga mensahe ng user para sa mga hindi tugmang modelo
- **`developer` tungkulin ay hindi nakilala** — Naayos sa v1.1.0: awtomatikong na-convert sa `system` para sa mga hindi OpenAI na provider
- **`json_schema` hindi gumagana sa Gemini** — Naayos sa v1.1.0: `response_format` ay na-convert na ngayon sa Gemini's `responseMimeType` + `responseSchema`

---

## Mga Setting ng Katatagan

### Hindi nagti-trigger ang limitasyon ng awtomatikong rate

- Nalalapat lang ang limitasyon ng awtomatikong rate sa mga provider ng API key (hindi OAuth/subscription)
- I-verify **Mga Setting → Resilience → Provider Profile** ay pinagana ang auto-rate-limit
- Suriin kung ibinabalik ng provider ang `429` status code o `Retry-After` header

### Pag-tune ng exponential backoff

Sinusuportahan ng mga profile ng provider ang mga setting na ito:

- **Base delay** — Paunang oras ng paghihintay pagkatapos ng unang pagkabigo (default: 1s)
- **Max na pagkaantala** — Maximum na limitasyon sa oras ng paghihintay (default: 30s)
- **Multiplier** — Magkano ang itataas na pagkaantala sa bawat magkakasunod na pagkabigo (default: 2x)

### Anti-kulog na kawan

Kapag maraming sabay-sabay na kahilingan ang tumama sa isang provider na limitado sa rate, gumagamit ang OmniRoute ng mutex + auto rate-limiting para i-serialize ang mga kahilingan at maiwasan ang mga pagkabigo ng cascading. Ito ay awtomatiko para sa mga API key provider.

---

## Natigil pa rin?

- **Mga Isyu sa GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arkitektura**: Tingnan ang [**OMNI_TOKEN_55**](ARCHITECTURE.md) para sa mga panloob na detalye
- **API Reference**: Tingnan ang [**OMNI_TOKEN_56**](API_REFERENCE.md) para sa lahat ng endpoint
- **Dashboard ng Kalusugan**: Suriin ang **Dashboard → Kalusugan** para sa real-time na status ng system
- **Translator**: Gamitin ang **Dashboard → Translator** para i-debug ang mga isyu sa format
