# Cursor Image Generation (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute විසින් chat සඳහා භාවිත කරන provider id එක වන `cursor` (alias `cu`) හරහාම, `POST /v1/images/generations` මත Cursor සැලසුමේ **රූප ජනනය** ලබා දෙයි.

| ක්ෂේත්රය             | අගය                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                     |
| ආකෘතිය               | `cursor-agent-image`                                                                         |
| සත්යාපනය             | chat සඳහා භාවිත කරන OAuth / API-key සම්බන්ධතාවම (`provider_connections.provider = "cursor"`) |
| මාදිලි               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                    |

## Agent CLI භාවිත කරන්නේ ඇයි

OmniRoute තුළ Cursor chat, `agent.v1.AgentService/Run` (protobuf) භාවිත කරයි. එම මාර්ගය ගොඩනඟා ඇති client tools (shell, write, …) **ප්රතික්ෂේප කරයි**. රූප ජනනය යනු seat එකට එරෙහිව **`agent` CLI** මඟින් ක්රියාත්මක කරන Cursor-native tool එකකි. එබැවින් image handler එක අගුළු දැමූ prompt එකක් සහ එක් එක් request එක සඳහා තාවකාලික workspace එකක් සමඟ `agent` spawn කරයි (community seat bridges වලට සමාන ආකාරයෙන්), ඉන්පසු OpenAI-අනුකූල `b64_json` ආපසු ලබා දෙයි.

## ප්රවේශ සීමා කිරීම (Hard Rules #15 + #17)

child process එකක් (`agent`
binary එක) spawn කරන එකම `IMAGE_PROVIDERS` ආකෘතිය මෙයයි. `POST /v1/images/generations` route එක remote callers විසින් නීත්යානුකූලව භාවිත කරන, spawn නොකරන වෙනත් image providers ~40ක් සමඟ බෙදාගන්නා බැවින්, සම්පූර්ණ route එක **not**
classified `LOCAL_ONLY` — ඒ වෙනුවට `handleCursorAgentImageGeneration`, authz pipeline එක මඟින් සෑම request එකකටම stamp කරන විශ්වාසදායක `AUTHZ_HEADER_PEER_LOCALITY` verdict එක භාවිත කර තමන්ගේම gate එක බලාත්මක කරයි
(ව්යාජ ලෙස වෙනස් කළ හැකි `Host` header එකෙන් නොව, සැබෑ TCP peer වෙතින්): spawn වෙත ළඟා විය හැක්කේ
`loopback` සහ `lan` callers හට පමණි; අනෙක් සියල්ලටම (public tunnel එකක් හරහා නැවත භාවිත කළ කාන්දු වූ
API key එකක් ද ඇතුළුව) credential lookup එකක් හෝ
process spawn කිරීමක් සිදුවීමට පෙර `403` ලැබේ. අනෙක් `LOCAL_ONLY` tier එකට යොදන එම
policy එක සඳහා `src/server/authz/policies/management.ts` බලන්න.

## Concurrency gate එක module-level වේ (single-instance සීමාව)

`CURSOR_IMG_MAX_CONCURRENT`, Node module instance එකට සීමා වූ in-memory counter/queue එකක් මඟින් බලාත්මක කෙරේ
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
එය එක් OmniRoute process එකක් තුළ සමගාමී `agent` spawns නිවැරදිව සීමා කරන නමුත්,
එකම Cursor seat එක බෙදාගන්නා processes/instances කිහිපයක් අතර **සම්බන්ධීකරණය නොකරයි**
(උදා. multi-replica deployment එකක්) — සෑම instance එකක්ම තමන්ගේම ස්වාධීන සීමාව බලාත්මක කරයි.
single-instance deployment එකක් සඳහා (පෙරනිමිය) මෙය නිවැරදිය; තිරස්ව scale කළ
deployments, instance එකකට `CURSOR_IMG_MAX_CONCURRENT` ගතානුගතිකව තබාගත යුතුය, නැතහොත්
Cursor image traffic එක එක් instance එකකට route කළ යුතුය.

## අවශ්යතා

1. dashboard එක තුළ සම්බන්ධ කළ Cursor account එකක් (OAuth හෝ `crsr_…` API key).
2. OmniRoute process එකට Cursor Agent binary එක ලබාගත හැකි වීම:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, හෝ
   - `~/.local/bin/agent`, හෝ
   - Cursor connection එකේ `providerSpecificData.agentBin`.

විකල්ප සුසර කිරීම්:

| Env                         | පෙරනිමිය                 | අර්ථය                                |
| --------------------------- | ------------------------ | ------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | එක් රූපයකට wall clock කාලය           |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | බෙදාගත් seat එකේ concurrency gate එක |
| `CURSOR_IMG_MODEL`          | (request model / `auto`) | CLI `--model` අතික්රමණය කරන්න        |

## උදාහරණය

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

ජනනයට සාමාන්යයෙන් මිනිත්තු 1–2ක් ගත වේ. අභ්යන්තර network path එකක් භාවිත කිරීම වඩාත් සුදුසුය; ~100s timeout සහිත edge proxies අසාර්ථක වනු ඇත.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, සහ `model: openai/cursor/auto` (හෝ ඔබේ LiteLLM version එක අනුව prefix නොමැති `cursor/auto`) සමඟ image model එකක් ලියාපදිංචි කරන්න.
