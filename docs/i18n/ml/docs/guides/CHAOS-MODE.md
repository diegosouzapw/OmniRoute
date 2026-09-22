# Chaos Mode (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ഡാഷ്ബോർഡ്:** **Chaos Mode** (സൈഡ്ബാർ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ഡാഷ്ബോർഡ് സെഷൻ) · `POST /api/skills/collect/chaos` (API കീ)  
> **സോഴ്സ്:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ഒരേ ടാസ്ക് ഒരേസമയം നിരവധി പ്രൊവൈഡർമാർക്ക് അയയ്ക്കുന്നു** — പങ്കെടുക്കുന്ന ഓരോ പ്രൊവൈഡറും
ഒരു മോഡൽ ഇൻസ്റ്റൻസ് വീതം സംഭാവന ചെയ്യുന്നു, കൂടാതെ എല്ലാ ഉത്തരങ്ങളും നിങ്ങൾക്ക് അടുത്തടുത്തായി (അല്ലെങ്കിൽ ശൃംഖലയായി) ലഭിക്കുന്നു. ഇത്
ഒരു മൾട്ടി-മോഡൽ എക്സിക്യൂഷൻ ഉപരിതലമാണ്, റൂട്ടിംഗ് തന്ത്രമല്ല: നിങ്ങളുടെ സാധാരണ `/v1/chat/completions`
ട്രാഫിക്കിനെ ഇത് ഒരിക്കലും ബാധിക്കില്ല.

**വ്യക്തതയ്ക്കായി — പേരിൽ "chaos" ഉൾപ്പെടുന്ന മൂന്ന് വ്യത്യസ്ത കാര്യങ്ങൾ ലഭ്യമാണ്:**

| കാര്യം              | അത് എന്താണ്                                                                                                                        | ഡോക്യുമെന്റേഷൻ എവിടെ                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**      | ഇവിടെ വിവരിച്ചിരിക്കുന്ന ഡാഷ്ബോർഡ് പേജ് + API: ഒരു ടാസ്ക് നിരവധി പ്രൊവൈഡർമാർക്ക് വിതരണം ചെയ്യുന്നു (സമാന്തരമായോ സഹകരണപരമായോ).      | ഈ ഗൈഡ്                                       |
| `auto/chaos`        | റെസിലിയൻസ് പരിശോധനയ്ക്കായി fault-injection സ്കോറിംഗ് വെയിറ്റുകളുള്ള ഒരു Auto-Combo മോഡൽ id. കോൺഫിഗർ ചെയ്യേണ്ടതില്ല.                | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos കോംബോ കോൺഫിഗ് | `config.chaos.enabled` ഉള്ള സ്ഥിരമായി സംഭരിച്ച കോംബോ, ഐച്ഛികമായ ഒരു judge മോഡലോടുകൂടിയ പാനലിലേക്ക് വിതരണം ചെയ്യുന്നു (API-മാത്രം). | `open-sse/services/autoCombo/chaosEngine.ts` |

## സജ്ജീകരണം

1. **Dashboard → Chaos Mode** (`/dashboard/chaos`) തുറക്കുക.
2. അത് **ഓണാക്കുക** — Chaos Mode **ഡിഫോൾട്ടായി പ്രവർത്തനരഹിതമാണ്** (`src/lib/chaos/chaosConfig.ts`-ൽ
   `enabled: false`). ഇത് പ്രവർത്തനരഹിതമായിരിക്കുമ്പോൾ, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` എന്ന് മറുപടി നൽകുന്നു.
3. പങ്കെടുക്കുന്നവരെയും ഡിഫോൾട്ടുകളെയും തിരഞ്ഞെടുക്കുക (settings store വഴി ഓരോ ഇൻസ്റ്റൻസിനും സ്ഥിരമായി സംഭരിക്കുന്നു):

   | ഫീൽഡ്               | അർത്ഥം                                                                          | ഡിഫോൾട്ട് / പരിധികൾ                               |
   | ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------- |
   | `enabled`           | മാസ്റ്റർ സ്വിച്ച്                                                               | `false`                                           |
   | `defaultMode`       | `parallel` അല്ലെങ്കിൽ `collaborative` (താഴെ കാണുക)                              | `parallel`                                        |
   | `providerOverrides` | ഓരോ പ്രൊവൈഡറിനുമുള്ള പങ്കാളിത്തം (`providerId`, ഐച്ഛികമായ `modelId`, `enabled`) | ശൂന്യം = സജീവമായ എല്ലാ പ്രൊവൈഡർമാരും, പരമാവധി 200 |
   | `systemPrompt`      | ബിൽറ്റ്-ഇൻ Chaos സിസ്റ്റം പ്രോംപ്റ്റിനുള്ള ഓവർറൈഡ്                              | ഐച്ഛികം, പരമാവധി 10 000 പ്രതീകങ്ങൾ                |
   | `timeoutMs`         | ഓരോ മോഡൽ കോളിനുമുള്ള പരമാവധി സമയം                                               | `120000` (5 000–600 000)                          |
   | `maxTokens`         | ഓരോ മോഡൽ കോളിനുമുള്ള `max_tokens`                                               | `4096` (256–128 000)                              |

4. **പേജിൽനിന്നുതന്നെ ഒരു ടെസ്റ്റ് പ്രവർത്തിപ്പിക്കുക** — ഫലങ്ങളുടെ പാനൽ ഓരോ പ്രൊവൈഡറുടെയും ഉത്തരവും
   നിലയും ദൈർഘ്യവും കാണിക്കുന്നു.

## എക്സിക്യൂഷൻ മോഡുകൾ

- **`parallel`** — എല്ലാ മോഡലുകൾക്കും ഒരേ ടാസ്ക് ഒരേസമയം ലഭിക്കുന്നു; എല്ലാ ഉത്തരങ്ങളും നിങ്ങൾക്ക്
  സ്വതന്ത്രമായി ലഭിക്കുന്നു.
- **`collaborative`** — മോഡലുകൾ **ഒരു ശൃംഖലയായി** പ്രവർത്തിക്കുന്നു: ഓരോന്നും മുമ്പത്തെ മോഡലിന്റെ ഔട്ട്പുട്ട് കാണുകയും
  അത് മെച്ചപ്പെടുത്താനോ വികസിപ്പിക്കാനോ വിമർശിക്കാനോ ഒരു ബദൽ നിർദേശിക്കാനോ ആവശ്യപ്പെടുകയും ചെയ്യുന്നു. റെസ്പോൺസിലെ `summary` ഫീൽഡ്
  വിജയകരമായ ഔട്ട്പുട്ടുകളെ ശൃംഖലാക്രമത്തിൽ സംയോജിപ്പിക്കുന്നു (`parallel` റണ്ണുകൾക്ക് `summary` ഇല്ല).

## API

### `POST /api/chaos/run` — ഡാഷ്ബോർഡ് സെഷൻ

കുക്കി ഉപയോഗിച്ച് ഓതന്റിക്കേറ്റ് ചെയ്തത് (മാനേജ്മെന്റ് സെഷൻ —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) കാണുക); ഡാഷ്ബോർഡ് പേജ് ഉപയോഗിക്കുന്നു.

```jsonc
// ബോഡി
{
  "task": "Compare approaches to X", // നിർബന്ധം
  "providers": ["glm", "kimi"], // ഐച്ഛിക ഫിൽട്ടർ
  "mode": "parallel", // ഐച്ഛികം — defaultMode-നെ ഓവർറൈഡ് ചെയ്യുന്നു
  "systemPrompt": "…", // ഐച്ഛിക ഓവർറൈഡ്
  "maxTokens": 4096, // ഐച്ഛിക ഓവർറൈഡ്
}
```

### `POST /api/skills/collect/chaos` — API കീ

ബാഹ്യ കോളർമാർക്കുള്ള Bearer-token വകഭേദം. കീയിൽ **Chaos Mode അനുമതി**
(`chaosModeEnabled`) ഉണ്ടായിരിക്കണം; ഇത് **ഡിഫോൾട്ടായി ഓഫാണ്** — ഓരോ കീയ്ക്കും
**Dashboard → API Manager → edit key → permissions → Chaos Mode** എന്നതിൽ ഇത് പ്രവർത്തനക്ഷമമാക്കുക. മുകളിലുള്ള അതേ ബോഡിയാണ് ഉപയോഗിക്കുന്നത്.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

രണ്ട് എൻഡ്പോയിന്റുകളും ഒരേ ഘടനയിൽ മറുപടി നൽകുന്നു:

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
  "summary": "…", // collaborative മോഡിൽ മാത്രം
}
```

## പ്രശ്നപരിഹാരം

- **`400 Chaos Mode is not enabled`** — മുകളിലെ ഘട്ടം 2: ആഗോള സ്വിച്ച് ഓഫാണ്.
- **`/api/skills/collect/chaos`-ൽ API കീ നിരസിക്കപ്പെടുന്നു** — ആ കീയിൽ ഓരോ കീയ്ക്കുമുള്ള
  `chaosModeEnabled` അനുമതി ഇല്ല (ഡിഫോൾട്ടായി ഓഫാണ്; ഇത് ഒരു ക്രമീകരണമാണ്, പിശകല്ല).
- **നിങ്ങൾ പ്രതീക്ഷിച്ച ഒരു പ്രൊവൈഡർ ഫലങ്ങളിൽ കാണുന്നില്ല** — Chaos Mode പേജിലെ `providerOverrides`
  പരിശോധിക്കുക (പ്രവർത്തനരഹിതമാക്കിയ ഒരു ഓവർറൈഡ് അതിനെ ഒഴിവാക്കും), കൂടാതെ പ്രൊവൈഡർ കണക്ഷൻ
  സജീവമാണോ എന്നും പരിശോധിക്കുക.
