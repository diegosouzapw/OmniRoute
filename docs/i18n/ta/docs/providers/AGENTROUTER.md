# AgentRouter Setup Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) என்பது Anthropic-இணக்கமான ஒரு ரிலே சேவையாகும்; இது
Claude மற்றும் பிற மாதிரிகளை மறுவிற்பனை செய்கிறது, பெரும்பாலும் நேரடி Anthropic API-ஐ விடக்
குறைந்த விலையில். அதிகாரப்பூர்வ Claude Code கிளையண்டிற்கான நேரடி மாற்றாகப் பயன்படுத்தக்கூடிய
`ANTHROPIC_BASE_URL` ஆக இது வடிவமைக்கப்பட்டுள்ளது. எனவே, Claude Code-இன் வயர் வடிவத்துடன்
பொருந்தும் போக்குவரத்தை மட்டுமே இது ஏற்கும் (குறிப்பிட்ட User-Agent, `anthropic-beta`
கொடிகள், Stainless SDK தலைப்புகள் போன்றவை).

## விரைவான தொடக்கம் — சொந்த `agentrouter` வழங்குநரைப் பயன்படுத்துதல் (பரிந்துரைக்கப்படுகிறது)

பெரும்பாலான பயனர்களுக்கு, **சிறப்பு அமைப்பு எதுவும் தேவையில்லை**. முழுமையான Claude Code
வயர் வடிவம் ஏற்கனவே உள்ளமைக்கப்பட்ட `agentrouter` வழங்குநருடன் OmniRoute வருகிறது
(`open-sse/config/providerRegistry.ts` → `agentrouter` என்பதைப் பார்க்கவும்). அதைப் பயன்படுத்த:

1. **Dashboard → Providers → Add Provider** என்பதைத் திறக்கவும்.
2. பட்டியலிலிருந்து **AgentRouter** என்பதைத் தேர்ந்தெடுக்கவும்.
3. உங்கள் `sk-...` API விசையை ஒட்டி சேமிக்கவும்.

அவ்வளவுதான் — சூழல் மாறிகளோ தனிப்பயன் வழங்குநர் வகையோ தேவையில்லை. உள்ளமைக்கப்பட்ட
மாதிரிகளில் `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, மற்றும்
`deepseek-v3.2` ஆகியவை அடங்கும்.

இந்த வழிகாட்டியின் மீதமுள்ள பகுதி **மேம்பட்ட வழிமுறையை** உள்ளடக்குகிறது:
`anthropic-compatible-cc-*` வழங்குநர் வகையைப் பயன்படுத்துதல். வயர் வடிவத்தின் மீது கூடுதல்
கட்டுப்பாடு தேவைப்படும்போது இதைப் பயன்படுத்தவும் — எடுத்துக்காட்டாக, சொந்த வழங்குநர்
பதிவகத்தில் இன்னும் இடம்பெறாத பிற AgentRouter-பாணி ரிலேக்களுடன் இணைக்கும்போது அல்லது
அடிப்படை URL, அரட்டைப் பாதை அல்லது தலைப்புத் தொகுப்பை மேலெழுதும்போது.

---

## மேம்பட்டது: Claude Code இணக்கமான வழங்குநர் வகை வழியாக இணைத்தல்

OmniRoute ஆனது AgentRouter-ஐயும் (மற்றும் இதேபோன்ற ரிலேக்களையும்) **Claude Code
இணக்கமான** வழங்குநர் வகை (`anthropic-compatible-cc-*`) மூலம் ஆதரிக்கிறது; இது சரியான
வயர் வடிவத்துடன் Anthropic Messages API-ஐப் பயன்படுத்துகிறது.
`https://agentrouter.org`-ஐச் சுட்டும் பொதுவான `openai-compatible-chat` வழங்குநர்
**செயல்படாது** — Claude Code போலத் தோன்றாத கோரிக்கைகளை அப்ஸ்ட்ரீம் WAF நிராகரிக்கும்.

---

## முன்தேவைகள்

- ஓர் AgentRouter கணக்கும் API விசையும். புதிய பதிவுகளுக்கு, திட்டத்தின்
  [README](../README.md)-இல் உள்ள இணைப்பு இணைப்பு வழியாக இலவச கிரெடிட்கள் கிடைக்கும்.
- `ENABLE_CC_COMPATIBLE_PROVIDER` அம்சக் கொடி இயக்கப்பட்ட நிலையில் இயங்கும் OmniRoute
  (கீழே பார்க்கவும்).

## 1. CC-இணக்கமான வழங்குநர் வகையை இயக்குதல்

Claude Code இணக்கமான வழங்குநர் வகை, அதிகாரப்பூர்வ Claude Code கிளையண்டை மிகவும் நெருக்கமாகப்
பிரதிபலிக்கும் போக்குவரத்தை அனுப்புவதால், ஓர் அம்சக் கொடியின் பின்னால் கட்டுப்படுத்தப்பட்டுள்ளது.
OmniRoute-ஐத் தொடங்குவதற்கு முன் சூழல் மாறியை அமைப்பதன் மூலம் அதை இயக்கவும்:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker எடுத்துக்காட்டு:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

மறுதொடக்கம் செய்த பிறகு, ஏற்கனவே உள்ள OpenAI-இணக்கமான மற்றும் Anthropic-இணக்கமான
செயல்முறைகளுடன் கூடுதலாக, டாஷ்போர்டில் **Add Claude Code Compatible** விருப்பம் காட்டப்படும்.

## 2. டாஷ்போர்டில் வழங்குநரை உருவாக்குதல்

1. **Dashboard → Providers → Add Provider** என்பதைத் திறக்கவும்.
2. **Add Claude Code Compatible** என்பதைத் தேர்ந்தெடுக்கவும் (மேலே உள்ள கொடி அமைக்கப்பட்டால்
   மட்டுமே இது தெரியும்).
3. புலங்களை நிரப்பவும்:

| புலம்         | மதிப்பு                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| பெயர்         | `AgentRouter` (அல்லது ஏதேனும் அடையாளப்பெயர்)                                |
| முன்னொட்டு    | `agentrouter` (பதிவுகளிலும் டாஷ்போர்டிலும் காட்டப்படும் எளிய மாற்றுப்பெயர்) |
| அடிப்படை URL  | `https://agentrouter.org`                                                   |
| அரட்டைப் பாதை | `/v1/messages?beta=true` (இயல்புநிலை — மாற்றாமல் விடவும்)                   |

> நியமமான மாதிரி அடையாளங்காட்டி இன்னும் முழு வழங்குநர் முனை ID-ஐப் பயன்படுத்துகிறது
> (`anthropic-compatible-cc-{uuid}/{model}`). **முன்னொட்டு** என்பது எளிதாகப் புரியக்கூடிய
> பதிவு வெளியீட்டிற்காக `src/lib/usage/callLogs.ts` மூலம் தீர்மானிக்கப்படும் ஒரு காட்சி
> மாற்றுப்பெயர் மட்டுமே.

4. (விருப்பத்திற்குரியது) சேமிப்பதற்கு முன் இணைப்பை உறுதிப்படுத்த, உங்கள் API விசையை
   **Validate** புலத்தில் ஒட்டி **Check** என்பதைக் கிளிக் செய்யவும்.
5. **Add** என்பதைக் கிளிக் செய்யவும்.

உருவாக்கியதும், வழங்குநரைத் திறந்து உங்கள் AgentRouter API விசையுடன் (`sk-...`) ஒரு
**Connection**-ஐச் சேர்க்கவும். அந்த இணைப்பின் `test_status` ஆனது `active` ஆக மாற வேண்டும்.

## 3. காம்போ வழியாகவோ நேரடியாகவோ பயன்படுத்தவும்

உங்கள் வழங்குநரின் முன்னொட்டை namespace ஆகப் பயன்படுத்தி மாடலைக் குறிப்பிடவும்:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

அதிகாரப்பூர்வ மாடல் ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` என்பதும் செயல்படும்;
மேலும், தரவுத்தளத்திலும் காம்போ உள்ளமைவிலும் இதுவே காணப்படும்.

அல்லது, மற்ற எந்த வழங்குநரையும் போல வழிப்படுத்தல், மாற்று ஏற்பாடு மற்றும் ஒதுக்கீட்டு மேலாண்மைக்காக
அதை ஒரு காம்போவில் சேர்க்கவும்.

---

## வயர் இமேஜ் விவரங்கள்

குறிப்புக்காக, cc-compatible bridge ஒவ்வொரு upstream கோரிக்கையிலும் பின்வருவனவற்றை
அனுப்புகிறது (`open-sse/services/claudeCodeCompatible.ts`-ஐப் பார்க்கவும்):

| தலைப்பு                                                  | மதிப்பு                                                                                                                |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                          | `Bearer <api-key>`                                                                                                     |
| `User-Agent`                                             | `claude-cli/2.1.258 (external, sdk-cli)`                                                                               |
| `anthropic-version`                                      | `2023-06-01`                                                                                                           |
| `anthropic-beta`                                         | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                               |
| ஒவ்வொரு இணைப்பிற்குமான redact-thinking பீட்டா நிலைமாற்றி | மறைக்கப்பட்ட சிந்தனை ஸ்ட்ரீம்களைத் திட்டவட்டமாகக் கோரும் upstream-களுக்கு `redact-thinking-2026-02-12`-ஐச் சேர்க்கிறது |
| ஒவ்வொரு இணைப்பிற்குமான summarized thinking நிலைமாற்றி    | ஏற்கெனவே காட்சி முறையை அமைக்காத CC Compatible சிந்தனைக் கோரிக்கைகளில் `display: "summarized"`-ஐச் சேர்க்கிறது          |
| `anthropic-dangerous-direct-browser-access`              | `true`                                                                                                                 |
| `x-app`                                                  | `cli`                                                                                                                  |
| `X-Stainless-*`                                          | பல்வேறு Stainless SDK தலைப்புகள் (மொழி, தொகுப்பு பதிப்பு, OS, கட்டமைப்பு போன்றவை)                                      |

இதுவே கோரிக்கைகள் upstream WAF / கிளையன்ட் அனுமதிப்பட்டியலைக் கடந்து செல்ல உதவுகிறது.

---

## சிக்கல் தீர்வு

**`{"error":{"message":"unauthorized client detected, ..."}}`** — உங்கள் கோரிக்கை
Claude Code வயர் இமேஜுடன் பொருந்தவில்லை. வழங்குநர்
`anthropic-compatible-cc` என்பதற்குப் பதிலாக `openai-compatible-chat` ஆக உள்ளமைக்கப்பட்டிருக்கும்போது அல்லது
தொடக்கத்தின்போது `ENABLE_CC_COMPATIBLE_PROVIDER=true` கொடி அமைக்கப்படாதபோது இது நிகழும்.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"செல்லுபடியாகாத டோக்கன்". வயர் இமேஜ் சரியாக உள்ளது, ஆனால் API விசை நிராகரிக்கப்பட்டுள்ளது. AgentRouter
டாஷ்போர்டில் ஒரு புதிய விசையை உருவாக்கி, இணைப்பைப் புதுப்பிக்கவும்.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-இன் உள்ளடக்கக் கட்டுப்பாட்டு hook கோரிக்கையின் உள்ளடக்கத்தை நிராகரித்துள்ளது அல்லது
அந்த விசையின் திட்டம் கோரப்பட்ட மாடலை அனுமதிக்கவில்லை. வேறொரு prompt அல்லது மாடலை முயற்சிக்கவும்;
தீங்கற்ற prompt தொடர்ந்து தடுக்கப்பட்டால் AgentRouter ஆதரவைத் தொடர்புகொள்ளவும்.

**குறிப்பிட்ட மாடல்களில் மட்டும் `[400]: content-blocked`** — பெரும்பாலான AgentRouter திட்டங்கள்
மாடல்களின் ஒரு துணைத்தொகுப்பை மட்டுமே அனுமதிக்கின்றன (எ.கா. `claude-opus-4-6`). விசை செல்லுபடியாக இருந்தாலும்,
மற்ற மாடல் ID-கள் `unauthorized_client_error`-ஐத் திருப்பும். உங்கள் திட்டம் எந்த மாடல்களை
உள்ளடக்குகிறது என்பதை AgentRouter டாஷ்போர்டில் சரிபார்க்கவும்.

**omniroute பதிவுகளிலிருந்து `Invalid JSON response from provider (reset after Ns)`** —
upstream, JSON அல்லாத body-ஐத் திருப்பியுள்ளது (பொதுவாக WAF-இலிருந்து வரும் HTML பிழைப் பக்கம்).
கோரிக்கை AgentRouter backend-ஐ ஒருபோதும் அடையவில்லை என்பதையே இது பொதுவாகக் குறிக்கிறது — வழங்குநர்
ID `anthropic-compatible-cc-` என்பதுடன் தொடங்குகிறதா என்பதை மீண்டும் சரிபார்க்கவும் (இறுதியிலுள்ள
கோட்டைக் கவனிக்கவும் — `open-sse/services/claudeCodeCompatible.ts`-இல் உள்ள
`CLAUDE_CODE_COMPATIBLE_PREFIX`-ஐப் பார்க்கவும்); மேலும் feature flag இயக்கப்பட்டுள்ளதா என்பதையும் சரிபார்க்கவும்.

**AgentRouter வழங்குநர் ஏற்கெனவே இருந்தபோதும் `unauthorized client detected` / HTML பிழைப் பக்கம்** —
உங்களிடம் **ஒன்றுக்கு மேற்பட்ட** AgentRouter வழங்குநர்கள் இருக்கக்கூடும்; உங்கள் கோரிக்கை தவறான
வழங்குநரை அடைகிறது. மீதமிருக்கும் கையால் உருவாக்கப்பட்ட
`anthropic-compatible-*` (`cc` அல்லாதது) அல்லது `openai-compatible-chat-*` வழங்குநர்
`agentrouter` முன்னொட்டுடன் உருவாக்கப்பட்டிருந்தால், அது `agentrouter/<model>` மாடல்
ID-களைத் தனதாக்கிக் கொள்ளலாம் (மேலும் காம்போக்கள் node ID மூலம் அதைக் குறிப்பிடக்கூடும்); இதனால் traffic,
ஏற்கெனவே சரியான வயர் இமேஜுடன் வழங்கப்படும் உள்ளமைந்த
`agentrouter` வழங்குநருக்குப் பதிலாக அந்த வழங்குநருக்கே வழிப்படுத்தப்படும் —
அது பொதுவான User-Agent-ஐ அனுப்புவதால் நிராகரிக்கப்படும். omniroute பதிவுகளில்
மாடல் உண்மையில் எங்கு resolve ஆகிறது என்பதைச் சரிபார்க்கவும் (`ROUTING` குறிச்சொல்
`agentrouter/<model> → <providerId>/<model>` என்பதைக் காட்டும்); `<providerId>` என்பது
`agentrouter` அல்ல என்றால், native வழங்குநரில் ஒருங்கிணைக்கவும்: காம்போக்களை
`agentrouter/<model>` (providerId `agentrouter`) நோக்கிச் சுட்டி, நகல் compatible
வழங்குநர்களை நீக்கவும். native வழங்குநருக்கு வயர்-இமேஜ் உள்ளமைவோ
`customUserAgent`-ஓ தேவையில்லை.

---

## மேலும் காண்க

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web வழங்குநர் ஒருங்கிணைப்புக் குறிப்புகள்
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — இலவச அடுக்கு வழங்குநர்
  பட்டியல்
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — வயர் படச் செயலாக்கம்
