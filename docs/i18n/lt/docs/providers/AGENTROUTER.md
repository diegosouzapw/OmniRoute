# AgentRouter Setup Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) yra su Anthropic suderinamas tarpinis serveris, perparduodantis
Claude ir kitus modelius, dažnai mažesnėmis kainomis nei tiesioginė Anthropic API. Jis
sukurtas kaip oficialaus Claude Code kliento tiesioginis `ANTHROPIC_BASE_URL`
pakaitalas, todėl priima tik Claude Code užklausų formatą atitinkantį srautą (konkretų
User-Agent, `anthropic-beta` vėliavėles, Stainless SDK antraštes ir kt.).

## Greitoji pradžia — naudokite savąjį `agentrouter` teikėją (rekomenduojama)

Daugumai naudotojų **nereikia jokios specialios konfigūracijos**. OmniRoute turi integruotą
`agentrouter` teikėją, kuriame jau įdiegtas visas Claude Code užklausų formatas (žr.
`open-sse/config/providerRegistry.ts` → `agentrouter`). Norėdami jį naudoti:

1. Atidarykite **Valdymo skydas → Teikėjai → Pridėti teikėją**.
2. Sąraše pasirinkite **AgentRouter**.
3. Įklijuokite savo `sk-...` API raktą ir išsaugokite.

Štai ir viskas — nereikia nei aplinkos kintamųjų, nei pasirinktinio teikėjo tipo. Integruoti modeliai
apima `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` ir
`deepseek-v3.2`.

Likusioje šio vadovo dalyje aprašomas **išplėstinis būdas**: teikėjo tipo
`anthropic-compatible-cc-*` naudojimas. Naudokite jį, kai reikia daugiau valdyti
užklausų formatą, pavyzdžiui, jungiantis prie kitų AgentRouter tipo
tarpinių serverių, kurie dar neįtraukti į savųjų teikėjų registrą, arba keičiant
bazinį URL, pokalbių kelią ar antraščių rinkinį.

---

## Išplėstinis būdas: prisijungimas naudojant su Claude Code suderinamą teikėjo tipą

OmniRoute taip pat palaiko AgentRouter (ir panašius tarpinius serverius) per **su Claude Code
suderinamą** teikėjo tipą (`anthropic-compatible-cc-*`), kuris naudoja
Anthropic Messages API ir tinkamą užklausų formatą. Bendrasis
`openai-compatible-chat` teikėjas, nukreiptas į `https://agentrouter.org`,
**neveiks** — pirminio serverio WAF atmeta užklausas, kurios neatrodo kaip Claude
Code užklausos.

---

## Būtinosios sąlygos

- AgentRouter paskyra ir API raktas. Nauji užsiregistravę naudotojai gauna nemokamų kreditų per partnerio
  nuorodą projekto faile [README](../README.md).
- OmniRoute turi veikti su įjungta `ENABLE_CC_COMPATIBLE_PROVIDER` funkcijos vėliavėle
  (žr. toliau).

## 1. Įjunkite su CC suderinamą teikėjo tipą

Su Claude Code suderinamas teikėjo tipas valdomas funkcijos vėliavėle, nes jis
siunčia srautą, labai panašų į oficialaus Claude Code kliento srautą. Įjunkite jį
nustatydami aplinkos kintamąjį prieš paleisdami OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker pavyzdys:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Paleidus iš naujo, valdymo skydelyje, be esamų su OpenAI ir Anthropic suderinamų
parinkčių, pateikiama parinktis **Pridėti su Claude Code suderinamą teikėją**.

## 2. Sukurkite teikėją valdymo skydelyje

1. Atidarykite **Valdymo skydas → Teikėjai → Pridėti teikėją**.
2. Pasirinkite **Pridėti su Claude Code suderinamą teikėją** (rodoma tik nustačius pirmiau nurodytą vėliavėlę).
3. Užpildykite laukus:

| Laukas          | Reikšmė                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| Pavadinimas     | `AgentRouter` (arba bet kokia kita žyma)                                     |
| Priešdėlis      | `agentrouter` (patogus pseudonimas, rodomas žurnaluose ir valdymo skydelyje) |
| Bazinis URL     | `https://agentrouter.org`                                                    |
| Pokalbių kelias | `/v1/messages?beta=true` (numatytoji reikšmė — palikite nepakeistą)          |

> Kanoniniame modelio identifikatoriuje vis tiek naudojamas visas teikėjo mazgo ID
> (`anthropic-compatible-cc-{uuid}/{model}`). **Priešdėlis** yra tik rodomas
> pseudonimas, kurį `src/lib/usage/callLogs.ts` nustato, kad žurnalo išvestis būtų aiškesnė.

4. (Pasirinktinai) Įklijuokite savo API raktą į lauką **Patvirtinti** ir spustelėkite **Tikrinti**, kad
   prieš išsaugodami patvirtintumėte ryšį.
5. Spustelėkite **Pridėti**.

Sukūrę teikėją, atidarykite jį ir pridėkite **Ryšį** su savo AgentRouter API
raktu (`sk-...`). Ryšio `test_status` reikšmė turėtų pasikeisti į `active`.

## 3. Naudokite per kombinaciją arba tiesiogiai

Nurodykite modelį, kaip vardų sritį naudodami savo teikėjo prefiksą:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanoninis modelio ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` taip pat veikia
ir būtent jis rodomas duomenų bazėje bei kombinacijos konfigūracijoje.

Arba įtraukite jį į kombinaciją, kad galėtumėte valdyti maršruto parinkimą, atsarginį
perjungimą ir kvotas taip pat, kaip ir bet kurio kito teikėjo atveju.

---

## Užklausos formato informacija

Kaip informacinė medžiaga, su cc suderinamas tiltas su kiekviena aukštyn siunčiama
užklausa perduoda toliau nurodytus duomenis (žr. `open-sse/services/claudeCodeCompatible.ts`):

| Antraštė                                             | Reikšmė                                                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                      | `Bearer <api-key>`                                                                                                            |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                      |
| `anthropic-version`                                  | `2023-06-01`                                                                                                                  |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                      |
| Ryšiui taikomas mąstymo redagavimo beta perjungiklis | Aukštyn siunčiamoms užklausoms, kurioms konkrečiai reikalingi redaguoti mąstymo srautai, prideda `redact-thinking-2026-02-12` |
| Ryšiui taikomas apibendrinto mąstymo perjungiklis    | Prie CC Compatible mąstymo užklausų, kuriose rodymo režimas dar nenustatytas, prideda `display: "summarized"`                 |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                                        |
| `x-app`                                              | `cli`                                                                                                                         |
| `X-Stainless-*`                                      | Įvairios Stainless SDK antraštės (kalba, paketo versija, OS, architektūra ir kt.)                                             |

Būtent dėl to užklausos gali praeiti aukštyn siunčiamų užklausų WAF / kliento leidžiamų
objektų sąrašo patikrą.

---

## Trikčių šalinimas

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Jūsų užklausa
neatitiko Claude Code užklausos formato. Taip nutinka, kai teikėjas sukonfigūruotas
kaip `openai-compatible-chat`, o ne `anthropic-compatible-cc`, arba kai paleidimo
metu nebuvo nustatyta žyma `ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Netinkamas prieigos raktas“. Užklausos formatas teisingas, tačiau API raktas
atmetamas. Sugeneruokite naują raktą AgentRouter valdymo skydelyje ir atnaujinkite
ryšį.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter moderavimo mechanizmas atmetė užklausos turinį arba
rakto planas neleidžia naudoti prašomo modelio. Išbandykite kitą užklausą arba
modelį; jei nepavojinga užklausa nuolat blokuojama, susisiekite su AgentRouter
palaikymo tarnyba.

**`[400]: content-blocked` tik naudojant konkrečius modelius** — Dauguma AgentRouter
planų leidžia naudoti tik dalį modelių (pvz., `claude-opus-4-6`). Kiti modelių ID
grąžina `unauthorized_client_error`, nors raktas yra galiojantis. AgentRouter
valdymo skydelyje patikrinkite, kuriuos modelius apima jūsų planas.

**`Invalid JSON response from provider (reset after Ns)` omniroute žurnaluose** —
Aukštyn siunčiamos užklausos serveris grąžino ne JSON formato turinį (paprastai WAF
HTML klaidos puslapį). Dažniausiai tai reiškia, kad užklausa niekada nepasiekė
AgentRouter vidinės sistemos — dar kartą patikrinkite, ar teikėjo ID prasideda
`anthropic-compatible-cc-` (atkreipkite dėmesį į brūkšnelį gale — žr.
`CLAUDE_CODE_COMPATIBLE_PREFIX` faile `open-sse/services/claudeCodeCompatible.ts`)
ir ar funkcijos žyma įjungta.

**`unauthorized client detected` / HTML klaidos puslapis, nors AgentRouter
teikėjas jau yra** — tikriausiai turite **daugiau nei vieną** AgentRouter teikėją,
o jūsų užklausa siunčiama netinkamam teikėjui. Jei buvo sukurtas likęs rankiniu būdu
sukurtas `anthropic-compatible-*` (ne `cc`) arba `openai-compatible-chat-*`
teikėjas su prefiksu `agentrouter`, jam gali priklausyti `agentrouter/<model>`
modelių ID (o kombinacijos gali nurodyti jį pagal mazgo ID), todėl srautas
nukreipiamas į tą teikėją — kuris siunčia bendrinį User-Agent ir yra atmetamas —
o ne į integruotą `agentrouter` teikėją, kuris jau naudoja tinkamą užklausos
formatą. Patikrinkite, į kur iš tikrųjų nukreipiamas modelis omniroute žurnaluose
(`ROUTING` žyma rodo `agentrouter/<model> → <providerId>/<model>`); jei
`<providerId>` nėra `agentrouter`, sujunkite konfigūraciją naudodami savąjį
teikėją: kombinacijose nurodykite `agentrouter/<model>` (providerId `agentrouter`)
ir pašalinkite besidubliuojančius suderinamus teikėjus. Savajam teikėjui nereikia
nei užklausos formato konfigūracijos, nei `customUserAgent`.

---

## Taip pat žr.

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web teikėjo integravimo pastabos
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Nemokamo plano teikėjų
  katalogas
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Vaizdų perdavimo realizacija
