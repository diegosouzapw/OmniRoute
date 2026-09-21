# AgentRouter Setup Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ir ar Anthropic saderīgs starpniekpakalpojums, kas tālākpārdod
Claude un citus modeļus, bieži par zemākām cenām nekā tiešā Anthropic API. Tas ir
izstrādāts kā oficiālā Claude Code klienta `ANTHROPIC_BASE_URL` tiešs aizstājējs,
tāpēc tas pieņem tikai tādu datplūsmu, kas atbilst Claude Code pieprasījumu profilam
(noteikts User-Agent, `anthropic-beta` karodziņi, Stainless SDK galvenes u.c.).

## Ātrā darba sākšana — izmantojiet iebūvēto `agentrouter` nodrošinātāju (ieteicams)

Lielākajai daļai lietotāju **nav nepieciešama īpaša konfigurēšana**. OmniRoute ietver
iebūvētu `agentrouter` nodrošinātāju, kurā jau ir pilnībā iestrādāts Claude Code
pieprasījumu profils (skatiet `open-sse/config/providerRegistry.ts` → `agentrouter`).
Lai to izmantotu:

1. Atveriet **Informācijas panelis → Nodrošinātāji → Pievienot nodrošinātāju**.
2. Sarakstā atlasiet **AgentRouter**.
3. Ielīmējiet savu `sk-...` API atslēgu un saglabājiet.

Tas arī viss — nav nepieciešami ne vides mainīgie, ne pielāgots nodrošinātāja tips.
Iebūvētie modeļi ietver `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`
un `deepseek-v3.2`.

Pārējā šīs rokasgrāmatas daļā ir aprakstīts **papildu iespēju ceļš**:
`anthropic-compatible-cc-*` nodrošinātāja tipa izmantošana. Izmantojiet to, ja
nepieciešama lielāka kontrole pār pieprasījumu profilu, piemēram, veidojot
savienojumu ar citiem AgentRouter veida starpniekpakalpojumiem, kas vēl nav
iekļauti iebūvētajā nodrošinātāju reģistrā, vai pārrakstot bāzes URL,
tērzēšanas ceļu vai galveņu kopu.

---

## Papildu iespējas: savienojuma izveide, izmantojot ar Claude Code saderīgu nodrošinātāja tipu

OmniRoute atbalsta arī AgentRouter (un līdzīgus starpniekpakalpojumus), izmantojot
**ar Claude Code saderīgu** nodrošinātāja tipu (`anthropic-compatible-cc-*`), kas
izmanto Anthropic Messages API ar pareizo pieprasījumu profilu. Vispārīgs
`openai-compatible-chat` nodrošinātājs, kas norāda uz `https://agentrouter.org`,
**nedarbosies** — augšupstraumes WAF noraida pieprasījumus, kas neizskatās pēc
Claude Code pieprasījumiem.

---

## Priekšnosacījumi

- AgentRouter konts un API atslēga. Jaunie lietotāji saņem bezmaksas kredītus,
  reģistrējoties ar partnera saiti projekta [README](../README.md).
- OmniRoute darbojas ar iespējotu `ENABLE_CC_COMPATIBLE_PROVIDER` funkcijas
  karodziņu (skatiet tālāk).

## 1. Iespējojiet ar CC saderīgo nodrošinātāja tipu

Ar Claude Code saderīgais nodrošinātāja tips ir pieejams tikai ar funkcijas
karodziņu, jo tas sūta datplūsmu, kas ļoti līdzinās oficiālā Claude Code klienta
datplūsmai. Iespējojiet to, pirms OmniRoute palaišanas iestatot vides mainīgo:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker piemērs:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Pēc restartēšanas informācijas panelī papildus esošajām ar OpenAI un Anthropic
saderīgajām plūsmām būs pieejama opcija **Pievienot ar Claude Code saderīgu
nodrošinātāju**.

## 2. Izveidojiet nodrošinātāju informācijas panelī

1. Atveriet **Informācijas panelis → Nodrošinātāji → Pievienot nodrošinātāju**.
2. Izvēlieties **Pievienot ar Claude Code saderīgu nodrošinātāju** (redzams tikai
   tad, ja ir iestatīts iepriekš minētais karodziņš).
3. Aizpildiet laukus:

| Lauks           | Vērtība                                                                     |
| --------------- | --------------------------------------------------------------------------- |
| Nosaukums       | `AgentRouter` (vai jebkura cita etiķete)                                    |
| Prefikss        | `agentrouter` (ērti lietojams aizstājvārds, kas redzams žurnālos un panelī) |
| Bāzes URL       | `https://agentrouter.org`                                                   |
| Tērzēšanas ceļš | `/v1/messages?beta=true` (noklusējums — atstājiet bez izmaiņām)             |

> Kanoniskajā modeļa identifikatorā joprojām tiek izmantots pilns nodrošinātāja
> mezgla ID (`anthropic-compatible-cc-{uuid}/{model}`). **Prefikss** ir tikai
> attēlošanas aizstājvārds, ko ērtākai žurnāla izvadei atrisina
> `src/lib/usage/callLogs.ts`.

4. (Neobligāti) Laukā **Validēt** ielīmējiet savu API atslēgu un noklikšķiniet uz
   **Pārbaudīt**, lai pirms saglabāšanas apstiprinātu savienojamību.
5. Noklikšķiniet uz **Pievienot**.

Kad nodrošinātājs ir izveidots, atveriet to un pievienojiet **Savienojumu** ar savu
AgentRouter API atslēgu (`sk-...`). Savienojuma `test_status` statusam vajadzētu
mainīties uz `active`.

## 3. Izmantojiet to, izmantojot kombināciju vai tieši

Norādiet modeli, izmantojot sava pakalpojumu sniedzēja prefiksu kā nosaukumvietu:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Darbojas arī kanoniskais modeļa ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6`,
un tieši tas tiek parādīts datubāzē un kombinācijas konfigurācijā.

Vai arī pievienojiet to kombinācijai maršrutēšanai, rezerves varianta izmantošanai
un kvotu pārvaldībai tāpat kā jebkuru citu pakalpojumu sniedzēju.

---

## Wire image informācija

Uzziņai: ar cc saderīgais tilts katrā augšupējā pieprasījumā nosūta tālāk norādīto
(skatiet `open-sse/services/claudeCodeCompatible.ts`):

| Galvene                                              | Vērtība                                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Authorization`                                      | `Bearer <api-key>`                                                                                                       |
| `User-Agent`                                         | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                 |
| `anthropic-version`                                  | `2023-06-01`                                                                                                             |
| `anthropic-beta`                                     | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                 |
| Rediģētas domāšanas beta slēdzis katram savienojumam | Pievieno `redact-thinking-2026-02-12` augšupējiem pakalpojumiem, kuriem īpaši nepieciešamas rediģētas domāšanas straumes |
| Apkopotas domāšanas slēdzis katram savienojumam      | Pievieno `display: "summarized"` ar CC saderīgiem domāšanas pieprasījumiem, kuriem vēl nav iestatīts attēlošanas režīms  |
| `anthropic-dangerous-direct-browser-access`          | `true`                                                                                                                   |
| `x-app`                                              | `cli`                                                                                                                    |
| `X-Stainless-*`                                      | Dažādas Stainless SDK galvenes (valoda, pakotnes versija, OS, arhitektūra utt.)                                          |

Tas ļauj pieprasījumiem iziet augšupējā pakalpojuma WAF / klientu atļauto sarakstu.

---

## Problēmu novēršana

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Jūsu pieprasījums
neatbilda Claude Code wire image. Tas notiek, ja pakalpojumu sniedzējs ir konfigurēts
kā `openai-compatible-chat`, nevis `anthropic-compatible-cc`, vai arī startēšanas
laikā nav iestatīts karogs `ENABLE_CC_COMPATIBLE_PROVIDER=true`.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
“Nederīgs marķieris”. Wire image ir pareizs, taču API atslēga tiek noraidīta. Ģenerējiet
jaunu atslēgu AgentRouter informācijas panelī un atjauniniet savienojumu.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter moderēšanas mehānisms noraidīja pieprasījuma saturu, vai arī
atslēgas plāns neatļauj pieprasīto modeli. Izmēģiniet citu uzvedni vai modeli;
sazinieties ar AgentRouter atbalsta dienestu, ja nekaitīga uzvedne tiek pastāvīgi bloķēta.

**`[400]: content-blocked` tikai noteiktiem modeļiem** — Vairums AgentRouter plānu
atļauj tikai modeļu apakškopu (piemēram, `claude-opus-4-6`). Citi modeļu ID atgriež
`unauthorized_client_error`, lai gan atslēga ir derīga. AgentRouter informācijas
panelī pārbaudiet, kurus modeļus aptver jūsu plāns.

**`Invalid JSON response from provider (reset after Ns)` omniroute žurnālos** —
Augšupējais pakalpojums atgrieza saturu, kas nav JSON (parasti WAF HTML kļūdas lapu).
Tas parasti nozīmē, ka pieprasījums nekad nesasniedza AgentRouter aizmugursistēmu —
vēlreiz pārbaudiet, vai pakalpojumu sniedzēja ID sākas ar
`anthropic-compatible-cc-` (ņemiet vērā beigu defisi — skatiet
`CLAUDE_CODE_COMPATIBLE_PREFIX` failā
`open-sse/services/claudeCodeCompatible.ts`) un vai funkcijas karogs ir iespējots.

**`unauthorized client detected` / HTML kļūdas lapa, lai gan AgentRouter
pakalpojumu sniedzējs jau pastāv** — visticamāk, jums ir **vairāk nekā viens**
AgentRouter pakalpojumu sniedzējs, un jūsu pieprasījums nonāk pie nepareizā. Ja ar
prefiksu `agentrouter` tika izveidots kāds palicis, manuāli veidots
`anthropic-compatible-*` (nevis `cc`) vai `openai-compatible-chat-*` pakalpojumu
sniedzējs, tas var pārņemt `agentrouter/<model>` modeļu ID (un kombinācijas var uz
to atsaukties pēc mezgla ID), tāpēc datplūsma tiek maršrutēta uz šo pakalpojumu
sniedzēju — kurš nosūta vispārīgu User-Agent un tiek noraidīts —, nevis uz
iebūvēto `agentrouter` pakalpojumu sniedzēju, kurā jau ir pareizais wire image.
Omniroute žurnālos pārbaudiet, kur modelis faktiski tiek atrisināts (`ROUTING`
tags parāda `agentrouter/<model> → <providerId>/<model>`); ja `<providerId>` nav
`agentrouter`, konsolidējiet konfigurāciju, izmantojot vietējo pakalpojumu sniedzēju:
norādiet kombinācijās `agentrouter/<model>` (providerId `agentrouter`) un izdzēsiet
dublējošos saderīgos pakalpojumu sniedzējus. Vietējam pakalpojumu sniedzējam nav
nepieciešama ne wire image konfigurācija, ne `customUserAgent`.

---

## Skatiet arī

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web nodrošinātāja integrācijas piezīmes
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Bezmaksas līmeņa nodrošinātāju
  katalogs
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire attēla implementācija
