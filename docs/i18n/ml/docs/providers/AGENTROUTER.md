# AgentRouter Setup Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) എന്നത് Anthropic-ന് അനുയോജ്യമായ ഒരു റിലേയാണ്. ഇത് Claude-ഉം മറ്റ് മോഡലുകളും പുനർവിൽപ്പന നടത്തുന്നു; പലപ്പോഴും നേരിട്ടുള്ള Anthropic API-യേക്കാൾ കുറഞ്ഞ നിരക്കിലാണ് ഇവ ലഭ്യമാകുന്നത്. ഔദ്യോഗിക Claude Code ക്ലയന്റിനായുള്ള ഒരു ഡ്രോപ്പ്-ഇൻ `ANTHROPIC_BASE_URL` പകരക്കാരനായാണ് ഇത് രൂപകൽപ്പന ചെയ്തിരിക്കുന്നത്. അതിനാൽ Claude Code വയർ ഇമേജുമായി പൊരുത്തപ്പെടുന്ന ട്രാഫിക് മാത്രമേ ഇത് സ്വീകരിക്കുകയുള്ളൂ (നിർദ്ദിഷ്ട User-Agent, `anthropic-beta` ഫ്ലാഗുകൾ, Stainless SDK ഹെഡറുകൾ തുടങ്ങിയവ).

## ദ്രുത ആരംഭം — നേറ്റീവ് `agentrouter` പ്രൊവൈഡർ ഉപയോഗിക്കുക (ശുപാർശ ചെയ്യുന്നത്)

മിക്ക ഉപയോക്താക്കൾക്കും **പ്രത്യേക സജ്ജീകരണമൊന്നും ആവശ്യമില്ല**. പൂർണ്ണമായ Claude Code വയർ ഇമേജ് മുൻകൂട്ടി ഉൾപ്പെടുത്തിയ ബിൽറ്റ്-ഇൻ `agentrouter` പ്രൊവൈഡറോടെയാണ് OmniRoute ലഭിക്കുന്നത് (`open-sse/config/providerRegistry.ts` → `agentrouter` കാണുക). ഇത് ഉപയോഗിക്കാൻ:

1. **ഡാഷ്ബോർഡ് → പ്രൊവൈഡറുകൾ → പ്രൊവൈഡർ ചേർക്കുക** തുറക്കുക.
2. പട്ടികയിൽ നിന്ന് **AgentRouter** തിരഞ്ഞെടുക്കുക.
3. നിങ്ങളുടെ `sk-...` API കീ ഒട്ടിച്ച് സംരക്ഷിക്കുക.

അത്രമാത്രം — എൻവയോൺമെന്റ് വേരിയബിളുകളോ ഇഷ്ടാനുസൃത പ്രൊവൈഡർ തരമോ ആവശ്യമില്ല. ബിൽറ്റ്-ഇൻ മോഡലുകളിൽ `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`, `deepseek-v3.2` എന്നിവ ഉൾപ്പെടുന്നു.

ഈ ഗൈഡിന്റെ ശേഷിക്കുന്ന ഭാഗം **വിപുലമായ മാർഗം** വിശദീകരിക്കുന്നു: `anthropic-compatible-cc-*` പ്രൊവൈഡർ തരം ഉപയോഗിക്കുന്നത്. വയർ ഇമേജിൽ കൂടുതൽ നിയന്ത്രണം ആവശ്യമുള്ളപ്പോൾ ഇത് ഉപയോഗിക്കുക — ഉദാഹരണത്തിന്, നേറ്റീവ് പ്രൊവൈഡർ രജിസ്ട്രിയിൽ ഇതുവരെ ഉൾപ്പെടുത്തിയിട്ടില്ലാത്ത മറ്റ് AgentRouter-ശൈലിയിലുള്ള റിലേകളിലേക്ക് കണക്റ്റ് ചെയ്യുമ്പോഴോ, ബേസ് URL, ചാറ്റ് പാത്ത്, അല്ലെങ്കിൽ ഹെഡർ സെറ്റ് ഓവർറൈഡ് ചെയ്യുമ്പോഴോ.

---

## വിപുലമായ ക്രമീകരണം: Claude Code-ന് അനുയോജ്യമായ പ്രൊവൈഡർ തരം വഴി കണക്റ്റ് ചെയ്യുക

ശരിയായ വയർ ഇമേജ് ഉപയോഗിച്ച് Anthropic Messages API-യുമായി ആശയവിനിമയം നടത്തുന്ന **Claude Code compatible** പ്രൊവൈഡർ തരം (`anthropic-compatible-cc-*`) വഴിയും OmniRoute, AgentRouter-നെയും സമാനമായ റിലേകളെയും പിന്തുണയ്ക്കുന്നു. `https://agentrouter.org`-ലേക്ക് ചൂണ്ടുന്ന ഒരു പൊതുവായ `openai-compatible-chat` പ്രൊവൈഡർ **പ്രവർത്തിക്കില്ല** — Claude Code പോലെയല്ലാത്ത അഭ്യർത്ഥനകൾ അപ്സ്ട്രീം WAF നിരസിക്കും.

---

## മുൻവ്യവസ്ഥകൾ

- ഒരു AgentRouter അക്കൗണ്ടും API കീയും. പുതിയതായി സൈൻ അപ്പ് ചെയ്യുന്നവർക്ക് പ്രോജക്റ്റിന്റെ [README](../README.md)-യിലെ അഫിലിയേറ്റ് ലിങ്ക് വഴി സൗജന്യ ക്രെഡിറ്റുകൾ ലഭിക്കും.
- `ENABLE_CC_COMPATIBLE_PROVIDER` ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനക്ഷമമാക്കിയ നിലയിൽ OmniRoute പ്രവർത്തിക്കുന്നുണ്ടാകണം (താഴെ കാണുക).

## 1. CC-ന് അനുയോജ്യമായ പ്രൊവൈഡർ തരം പ്രവർത്തനക്ഷമമാക്കുക

ഔദ്യോഗിക Claude Code ക്ലയന്റിനെ വളരെ അടുത്തായി അനുകരിക്കുന്ന ട്രാഫിക് അയയ്ക്കുന്നതിനാൽ Claude Code-ന് അനുയോജ്യമായ പ്രൊവൈഡർ തരം ഒരു ഫീച്ചർ ഫ്ലാഗിന് പിന്നിലാണ്. OmniRoute ആരംഭിക്കുന്നതിന് മുമ്പ് ഒരു എൻവയോൺമെന്റ് വേരിയബിൾ സജ്ജീകരിച്ച് ഇത് പ്രവർത്തനക്ഷമമാക്കുക:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker ഉദാഹരണം:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

പുനരാരംഭിച്ച ശേഷം, നിലവിലുള്ള OpenAI-ന് അനുയോജ്യമായതും Anthropic-ന് അനുയോജ്യമായതുമായ പ്രവാഹങ്ങൾക്ക് പുറമേ **Claude Code Compatible ചേർക്കുക** എന്ന ഓപ്ഷനും ഡാഷ്ബോർഡിൽ ലഭ്യമാകും.

## 2. ഡാഷ്ബോർഡിൽ പ്രൊവൈഡർ സൃഷ്ടിക്കുക

1. **ഡാഷ്ബോർഡ് → പ്രൊവൈഡറുകൾ → പ്രൊവൈഡർ ചേർക്കുക** തുറക്കുക.
2. **Claude Code Compatible ചേർക്കുക** തിരഞ്ഞെടുക്കുക (മുകളിലുള്ള ഫ്ലാഗ് സജ്ജീകരിച്ചിരിക്കുമ്പോൾ മാത്രം ദൃശ്യമാകും).
3. ഫീൽഡുകൾ പൂരിപ്പിക്കുക:

| ഫീൽഡ്         | മൂല്യം                                                                 |
| ------------- | ---------------------------------------------------------------------- |
| പേര്          | `AgentRouter` (അല്ലെങ്കിൽ ഏതെങ്കിലും ലേബൽ)                             |
| പ്രിഫിക്സ്    | `agentrouter` (ലോഗുകളിലും ഡാഷ്ബോർഡിലും കാണിക്കുന്ന സൗഹൃദപരമായ അപരനാമം) |
| ബേസ് URL      | `https://agentrouter.org`                                              |
| ചാറ്റ് പാത്ത് | `/v1/messages?beta=true` (ഡിഫോൾട്ട് — മാറ്റാതെ വിടുക)                  |

> കാനോനിക്കൽ മോഡൽ ഐഡന്റിഫയറിൽ ഇപ്പോഴും പൂർണ്ണമായ പ്രൊവൈഡർ നോഡ് ID ആണ് ഉപയോഗിക്കുന്നത്
> (`anthropic-compatible-cc-{uuid}/{model}`). **പ്രിഫിക്സ്** എന്നത് കൂടുതൽ സൗഹൃദപരമായ ലോഗ് ഔട്ട്പുട്ടിനായി `src/lib/usage/callLogs.ts` പരിഹരിക്കുന്ന ഒരു പ്രദർശന അപരനാമം മാത്രമാണ്.

4. (ഐച്ഛികം) സംരക്ഷിക്കുന്നതിന് മുമ്പ് കണക്റ്റിവിറ്റി സ്ഥിരീകരിക്കാൻ **സാധൂകരിക്കുക** ഫീൽഡിൽ നിങ്ങളുടെ API കീ ഒട്ടിച്ച് **പരിശോധിക്കുക** ക്ലിക്ക് ചെയ്യുക.
5. **ചേർക്കുക** ക്ലിക്ക് ചെയ്യുക.

സൃഷ്ടിച്ചുകഴിഞ്ഞാൽ, പ്രൊവൈഡർ തുറന്ന് നിങ്ങളുടെ AgentRouter API കീ (`sk-...`) ഉപയോഗിച്ച് ഒരു **കണക്ഷൻ** ചേർക്കുക. കണക്ഷന്റെ `test_status`, `active` ആയി മാറണം.

## 3. ഒരു കോംബോയിലൂടെ അല്ലെങ്കിൽ നേരിട്ട് ഇത് ഉപയോഗിക്കുക

നിങ്ങളുടെ പ്രൊവൈഡറിന്റെ പ്രിഫിക്സ് നെയിംസ്പേസായി ഉപയോഗിച്ച് മോഡലിനെ റഫറൻസ് ചെയ്യുക:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

കാനോണിക്കൽ മോഡൽ ID ആയ `anthropic-compatible-cc-{uuid}/claude-opus-4-6`-യും പ്രവർത്തിക്കും,
ഡാറ്റാബേസിലും കോംബോ കോൺഫിഗറേഷനിലും കാണുന്നത് ഇതാണ്.

അല്ലെങ്കിൽ മറ്റേതൊരു പ്രൊവൈഡറെയും പോലെ റൂട്ടിംഗ്, ഫാൾബാക്ക്, ക്വോട്ട മാനേജ്മെന്റ് എന്നിവയ്ക്കായി
ഇത് ഒരു കോംബോയിലേക്ക് ചേർക്കുക.

---

## വയർ ഇമേജ് വിശദാംശങ്ങൾ

റഫറൻസിനായി, ഓരോ അപ്സ്ട്രീം അഭ്യർത്ഥനയിലും cc-compatible ബ്രിഡ്ജ് ഇനിപ്പറയുന്നവ
അയയ്ക്കുന്നു (`open-sse/services/claudeCodeCompatible.ts` കാണുക):

| ഹെഡർ                                           | മൂല്യം                                                                                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                | `Bearer <api-key>`                                                                                                              |
| `User-Agent`                                   | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                        |
| `anthropic-version`                            | `2023-06-01`                                                                                                                    |
| `anthropic-beta`                               | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                        |
| ഓരോ കണക്ഷനിലുമുള്ള redact-thinking ബീറ്റ ടോഗിൾ | പ്രത്യേകം റിഡാക്റ്റ് ചെയ്ത തിങ്കിംഗ് സ്ട്രീമുകൾ ആവശ്യമായ അപ്സ്ട്രീമുകൾക്കായി `redact-thinking-2026-02-12` ചേർക്കുന്നു           |
| ഓരോ കണക്ഷനിലുമുള്ള summarized thinking ടോഗിൾ   | ഇതിനകം ഒരു ഡിസ്പ്ലേ മോഡ് സജ്ജമാക്കിയിട്ടില്ലാത്ത CC Compatible തിങ്കിംഗ് അഭ്യർത്ഥനകളിലേക്ക് `display: "summarized"` ചേർക്കുന്നു |
| `anthropic-dangerous-direct-browser-access`    | `true`                                                                                                                          |
| `x-app`                                        | `cli`                                                                                                                           |
| `X-Stainless-*`                                | വിവിധ Stainless SDK ഹെഡറുകൾ (ഭാഷ, പാക്കേജ് പതിപ്പ്, OS, ആർക്കിടെക്ചർ മുതലായവ)                                                   |

അപ്സ്ട്രീം WAF / ക്ലയന്റ് വൈറ്റ്ലിസ്റ്റ് കടന്നുപോകാൻ അഭ്യർത്ഥനകളെ അനുവദിക്കുന്നത് ഇതാണ്.

---

## പ്രശ്നപരിഹാരം

**`{"error":{"message":"unauthorized client detected, ..."}}`** — നിങ്ങളുടെ അഭ്യർത്ഥന
Claude Code വയർ ഇമേജുമായി പൊരുത്തപ്പെട്ടില്ല. പ്രൊവൈഡർ `anthropic-compatible-cc` എന്നതിന് പകരം
`openai-compatible-chat` ആയി കോൺഫിഗർ ചെയ്തിരിക്കുമ്പോഴോ, സ്റ്റാർട്ടപ്പിൽ
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ഫ്ലാഗ് സജ്ജമാക്കിയിട്ടില്ലാത്തപ്പോഴോ ഇത് സംഭവിക്കുന്നു.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"അസാധുവായ ടോക്കൺ". വയർ ഇമേജ് ശരിയാണ്, എന്നാൽ API കീ നിരസിക്കപ്പെട്ടു. AgentRouter
ഡാഷ്ബോർഡിൽ ഒരു പുതിയ കീ സൃഷ്ടിച്ച് കണക്ഷൻ അപ്ഡേറ്റ് ചെയ്യുക.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter-ന്റെ മോഡറേഷൻ ഹുക്ക് അഭ്യർത്ഥനയിലെ ഉള്ളടക്കം നിരസിച്ചു, അല്ലെങ്കിൽ
കീയുടെ പ്ലാൻ അഭ്യർത്ഥിച്ച മോഡൽ അനുവദിക്കുന്നില്ല. മറ്റൊരു പ്രോംപ്റ്റോ മോഡലോ പരീക്ഷിക്കുക;
ദോഷരഹിതമായ ഒരു പ്രോംപ്റ്റ് തുടർച്ചയായി ബ്ലോക്ക് ചെയ്യപ്പെടുന്നുവെങ്കിൽ AgentRouter പിന്തുണയുമായി ബന്ധപ്പെടുക.

**നിർദ്ദിഷ്ട മോഡലുകളിൽ മാത്രം `[400]: content-blocked`** — മിക്ക AgentRouter പ്ലാനുകളും
മോഡലുകളുടെ ഒരു ഉപവിഭാഗം മാത്രമേ അനുവദിക്കൂ (ഉദാ. `claude-opus-4-6`). കീ സാധുവാണെങ്കിലും മറ്റ് മോഡൽ ID-കൾ
`unauthorized_client_error` മടക്കിനൽകും. നിങ്ങളുടെ പ്ലാൻ ഏതൊക്കെ മോഡലുകൾ ഉൾക്കൊള്ളുന്നുവെന്ന്
AgentRouter ഡാഷ്ബോർഡിൽ പരിശോധിക്കുക.

**omniroute ലോഗുകളിൽ നിന്നുള്ള `Invalid JSON response from provider (reset after Ns)`** —
അപ്സ്ട്രീം JSON അല്ലാത്ത ഒരു ബോഡി മടക്കിനൽകി (സാധാരണയായി WAF-ൽ നിന്നുള്ള ഒരു HTML പിശക് പേജ്).
സാധാരണയായി അഭ്യർത്ഥന AgentRouter ബാക്കെൻഡിൽ എത്തിയിട്ടില്ലെന്നാണ് ഇതിന്റെ അർത്ഥം —
പ്രൊവൈഡർ ID `anthropic-compatible-cc-` എന്നതിൽ ആരംഭിക്കുന്നുവെന്ന് വീണ്ടും പരിശോധിക്കുക
(അവസാനത്തെ ഡാഷ് ശ്രദ്ധിക്കുക — `open-sse/services/claudeCodeCompatible.ts`-ലെ
`CLAUDE_CODE_COMPATIBLE_PREFIX` കാണുക), കൂടാതെ ഫീച്ചർ ഫ്ലാഗ് പ്രവർത്തനക്ഷമമാണെന്നും ഉറപ്പാക്കുക.

**ഒരു AgentRouter പ്രൊവൈഡർ ഇതിനകം നിലവിലുണ്ടെങ്കിലും `unauthorized client detected` /
HTML പിശക് പേജ്** — നിങ്ങൾക്ക് **ഒന്നിലധികം** AgentRouter പ്രൊവൈഡറുകൾ ഉണ്ടായിരിക്കാനും
നിങ്ങളുടെ അഭ്യർത്ഥന തെറ്റായ ഒന്നിലേക്ക് എത്തിക്കൊണ്ടിരിക്കാനും സാധ്യതയുണ്ട്. ശേഷിച്ചുപോയ, കൈകൊണ്ട് നിർമ്മിച്ച
`anthropic-compatible-*` (`cc` അല്ലാത്തത്) അല്ലെങ്കിൽ `openai-compatible-chat-*` പ്രൊവൈഡർ
`agentrouter` പ്രിഫിക്സോടെ സൃഷ്ടിച്ചിട്ടുണ്ടെങ്കിൽ, അതിന് `agentrouter/<model>` മോഡൽ
ID-കളുടെ ഉടമസ്ഥത ലഭിക്കാം (കൂടാതെ കോംബോകൾ അതിനെ നോഡ് ID ഉപയോഗിച്ച് റഫറൻസ് ചെയ്തേക്കാം); അതിനാൽ ട്രാഫിക്,
ശരിയായ വയർ ഇമേജ് ഉൾപ്പെടുത്തിയിട്ടുള്ള ബിൽറ്റ്-ഇൻ `agentrouter` പ്രൊവൈഡറിന് പകരം, ആ പ്രൊവൈഡറിലേക്കാണ്
റൂട്ട് ചെയ്യപ്പെടുന്നത് — അത് ഒരു ജനറിക് User-Agent അയയ്ക്കുകയും നിരസിക്കപ്പെടുകയും ചെയ്യും. omniroute
ലോഗുകളിൽ മോഡൽ യഥാർത്ഥത്തിൽ എവിടേക്കാണ് റിസോൾവ് ചെയ്യുന്നതെന്ന് പരിശോധിക്കുക (`ROUTING` ടാഗ്
`agentrouter/<model> → <providerId>/<model>` കാണിക്കുന്നു); `<providerId>` എന്നത്
`agentrouter` അല്ലെങ്കിൽ, നേറ്റീവ് പ്രൊവൈഡറിലേക്ക് ഏകീകരിക്കുക: കോംബോകളെ
`agentrouter/<model>`-ലേക്ക് (providerId `agentrouter`) ചൂണ്ടിക്കാണിക്കുകയും ഡ്യൂപ്ലിക്കേറ്റ്
compatible പ്രൊവൈഡറുകൾ ഇല്ലാതാക്കുകയും ചെയ്യുക. നേറ്റീവ് പ്രൊവൈഡറിന് വയർ-ഇമേജ് കോൺഫിഗറേഷനോ
`customUserAgent`-ഓ ആവശ്യമില്ല.

---

## ഇതും കാണുക

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web പ്രൊവൈഡർ സംയോജന കുറിപ്പുകൾ
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — സൗജന്യ-ടയർ പ്രൊവൈഡർ
  കാറ്റലോഗ്
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — വയർ ഇമേജ് നടപ്പാക്കൽ
