# Chaos Mode (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **උපකරණ පුවරුව:** **Chaos Mode** (පැති තීරුව) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (උපකරණ පුවරු සැසිය) · `POST /api/skills/collect/chaos` (API යතුර)  
> **මූලාශ්රය:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode මඟින් **එක් කාර්යයක් එකවර සැපයුම්කරුවන් කිහිපදෙනෙකු වෙත යවයි** — සහභාගී වන සෑම සැපයුම්කරුවෙකුම එක් ආකෘති නිදර්ශකයක් දායක කරන අතර, ඔබට සියලු පිළිතුරු එකිනෙකට යාබදව (හෝ දාමයක් ලෙස) ලැබේ. මෙය බහු-ආකෘති ක්රියාත්මක කිරීමේ පෘෂ්ඨයක් මිස මාර්ගගත කිරීමේ උපායමාර්ගයක් නොවේ: ඔබේ සාමාන්ය `/v1/chat/completions` ගමනාගමනයට මෙයින් කිසිවිටෙක බලපෑමක් සිදු නොවේ.

**වෙන්කර හඳුනාගැනීම — "chaos" යන නම සහිත වෙනස් දේවල් තුනක් සපයනු ලැබේ:**

| දෙය                   | එය කුමක්ද                                                                                                                      | ලේඛනගත කර ඇති ස්ථානය                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**        | මෙහි විස්තර කර ඇති උපකරණ පුවරු පිටුව + API: එක් කාර්යයක් සැපයුම්කරුවන් රැසක් වෙත විහිදුවා යැවීම (සමාන්තර හෝ සහයෝගී).           | මෙම මාර්ගෝපදේශය                              |
| `auto/chaos`          | දෝෂ-ඇතුළු කිරීමේ ලකුණුකරණ බර සහිත Auto-Combo ආකෘති හැඳුනුම්කාරකයක්, ප්රතිරෝධීතා පරීක්ෂාව සඳහා. වින්යාස කිරීමට කිසිවක් නැත.     | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos සංයෝජන වින්යාසය | විකල්ප විනිශ්චයකාර ආකෘතියක් සහිත පැනලයක් වෙත විහිදුවා යවන `config.chaos.enabled` සහිත ස්ථිරව සුරැකි සංයෝජනයක් (API සඳහා පමණි). | `open-sse/services/autoCombo/chaosEngine.ts` |

## පිහිටුවීම

1. **උපකරණ පුවරුව → Chaos Mode** (`/dashboard/chaos`) විවෘත කරන්න.
2. එය **සක්රිය කරන්න** — Chaos Mode **පෙරනිමියෙන් අක්රියව** සපයනු ලැබේ (`src/lib/chaos/chaosConfig.ts` තුළ `enabled: false`). එය අක්රියව තිබියදී, `POST /api/chaos/run` විසින්
   `400 — "Chaos Mode සක්රිය කර නැත. උපකරණ පුවරුව → Chaos Mode තුළින් එය සක්රිය කරන්න."` යන පිළිතුර ලබා දෙයි.
3. සහභාගිවන්නන් සහ පෙරනිමි තෝරන්න (සැකසුම් ගබඩාව හරහා එක් එක් නිදර්ශකය සඳහා ස්ථිරව සුරැකේ):

   | ක්ෂේත්රය            | අර්ථය                                                                       | පෙරනිමිය / සීමා                                   |
   | ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
   | `enabled`           | ප්රධාන ස්විචය                                                               | `false`                                           |
   | `defaultMode`       | `parallel` හෝ `collaborative` (පහත බලන්න)                                   | `parallel`                                        |
   | `providerOverrides` | එක් එක් සැපයුම්කරුගේ සහභාගිත්වය (`providerId`, විකල්ප `modelId`, `enabled`) | හිස් = සියලු ක්රියාකාරී සැපයුම්කරුවන්, උපරිමය 200 |
   | `systemPrompt`      | ගොඩනඟා ඇති Chaos පද්ධති ප්රේරණය සඳහා අතික්රමණයක්                            | විකල්පයි, උපරිම අක්ෂර 10 000                      |
   | `timeoutMs`         | එක් ආකෘති ඇමතුමකට උපරිම කාලය                                                | `120000` (5 000–600 000)                          |
   | `maxTokens`         | එක් ආකෘති ඇමතුමකට `max_tokens`                                              | `4096` (256–128 000)                              |

4. **පිටුව තුළින්ම පරීක්ෂණයක් ක්රියාත්මක කරන්න** — ප්රතිඵල පැනලය මඟින් එක් එක් සැපයුම්කරුගේ පිළිතුර, තත්ත්වය සහ කාලසීමාව පෙන්වයි.

## ක්රියාත්මක කිරීමේ ආකාර

- **`parallel`** — සෑම ආකෘතියකටම එකම කාර්යය එකවර ලැබේ; ඔබට සියලු පිළිතුරු ස්වාධීනව ලැබේ.
- **`collaborative`** — ආකෘති **දාමයක් ලෙස** ක්රියාත්මක වේ: සෑම එකකටම පෙර ආකෘතියේ ප්රතිදානය පෙනෙන අතර, එය පිරිපහදු කිරීමට, විස්තීරණය කිරීමට, විවේචනය කිරීමට හෝ විකල්පයක් ඉදිරිපත් කිරීමට ඉල්ලා සිටී. ප්රතිචාරයේ `summary` ක්ෂේත්රය සාර්ථක ප්රතිදාන දාම අනුපිළිවෙළට ඒකාබද්ධ කරයි (සමාන්තර ධාවනයන්ට `summary` නොමැත).

## API

### `POST /api/chaos/run` — උපකරණ පුවරු සැසිය

කුකී මඟින් සත්යාපනය කර ඇත (කළමනාකරණ සැසිය — [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) බලන්න); උපකරණ පුවරු පිටුව විසින් භාවිත කරයි.

```jsonc
// ඉල්ලීම් අන්තර්ගතය
{
  "task": "X සඳහා ප්රවේශ සංසන්දනය කරන්න", // අවශ්යයි
  "providers": ["glm", "kimi"], // විකල්ප පෙරහන
  "mode": "parallel", // විකල්පයි — defaultMode අතික්රමණය කරයි
  "systemPrompt": "…", // විකල්ප අතික්රමණය
  "maxTokens": 4096, // විකල්ප අතික්රමණය
}
```

### `POST /api/skills/collect/chaos` — API යතුර

බාහිර ඇමතුම්කරුවන් සඳහා Bearer-token ප්රභේදය. යතුරට **Chaos Mode අවසරය** (`chaosModeEnabled`) තිබිය යුතු අතර, එය **පෙරනිමියෙන් අක්රියයි** — එක් එක් යතුර සඳහා **උපකරණ පුවරුව → API Manager → යතුර සංස්කරණය කරන්න → අවසර → Chaos Mode** තුළින් එය සක්රිය කරන්න. ඉහත සඳහන් ඉල්ලීම් අන්තර්ගතයම භාවිත කරයි.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

අන්ත ලක්ෂ්ය දෙකම එකම ව්යුහය ලබා දෙයි:

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
  "summary": "…", // collaborative ආකාරය සඳහා පමණි
}
```

## දෝෂ නිරාකරණය

- **`400 Chaos Mode is not enabled`** — ඉහත පියවර 2 බලන්න: ගෝලීය ස්විචය අක්රියයි.
- **`/api/skills/collect/chaos` මත API යතුර ප්රතික්ෂේප වේ** — යතුරට එක් එක් යතුර සඳහා වන `chaosModeEnabled` අවසරය නොමැත (පෙරනිමියෙන් අක්රියයි; මෙය සැකසුමක් මිස දෝෂයක් නොවේ).
- **ඔබ බලාපොරොත්තු වූ සැපයුම්කරුවෙකු ප්රතිඵලවල නොමැත** — Chaos Mode පිටුවේ `providerOverrides` පරීක්ෂා කරන්න (අක්රිය අතික්රමණයක් එය බැහැර කරයි) සහ සැපයුම්කරුගේ සම්බන්ධතාව ක්රියාකාරී දැයි පරීක්ෂා කරන්න.
