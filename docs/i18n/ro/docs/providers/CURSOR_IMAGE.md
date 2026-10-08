# Cursor Image Generation (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute expune **generarea de imagini** din planul Cursor la `POST /v1/images/generations` prin același ID de furnizor ca pentru chat: `cursor` (alias `cu`).

| Câmp                 | Valoare                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| ID `IMAGE_PROVIDERS` | `cursor`                                                                                           |
| Format               | `cursor-agent-image`                                                                               |
| Autentificare        | Aceeași conexiune OAuth / cu cheie API ca pentru chat (`provider_connections.provider = "cursor"`) |
| Modele               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                          |

## De ce Agent CLI

Chatul Cursor din OmniRoute utilizează `agent.v1.AgentService/Run` (protobuf). Această cale **respinge** instrumentele client integrate (shell, write, …). Generarea de imagini este un instrument nativ Cursor executat de **CLI-ul `agent`** pentru licența respectivă. Prin urmare, handlerul de imagini pornește `agent` cu un prompt blocat și un spațiu de lucru temporar per solicitare (cu aceeași structură precum punțile comunitare pentru licențe), apoi returnează `b64_json` compatibil cu OpenAI.

## Restricție de acces (Regulile stricte #15 + #17)

Acesta este singurul format `IMAGE_PROVIDERS` care pornește un proces copil (binarul
`agent`). Deoarece `POST /v1/images/generations` este partajat de aproximativ 40 de alți
furnizori de imagini care nu pornesc procese și pe care apelanții de la distanță îi utilizează
în mod legitim, întreaga rută **nu** este clasificată drept `LOCAL_ONLY` — în schimb,
`handleCursorAgentImageGeneration` aplică propria barieră folosind verdictul de încredere
`AUTHZ_HEADER_PEER_LOCALITY`, pe care fluxul de autorizare îl aplică fiecărei solicitări
(pe baza peerului TCP real, niciodată pe baza antetului `Host`, care poate fi falsificat): numai
apelanții `loopback` și `lan` pot iniția procesul; toți ceilalți (inclusiv în cazul unei chei API
divulgate și reutilizate printr-un tunel public) primesc `403` înainte de orice căutare a
credențialelor sau pornire a procesului. Consultați `src/server/authz/policies/management.ts`
pentru aceeași politică aplicată restului nivelului `LOCAL_ONLY`.

## Bariera de concurență este la nivel de modul (limitare pentru o singură instanță)

`CURSOR_IMG_MAX_CONCURRENT` este aplicată printr-un contor/o coadă în memorie, limitată la
instanța modulului Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Aceasta limitează corect pornirile concurente ale `agent` într-un singur proces OmniRoute, dar
**nu** coordonează mai multe procese/instanțe care partajează aceeași licență Cursor
(de exemplu, o implementare cu mai multe replici) — fiecare instanță își aplică propria limită
independentă. Pentru o implementare cu o singură instanță (varianta implicită), această limită
este exactă; implementările scalate orizontal trebuie să păstreze
`CURSOR_IMG_MAX_CONCURRENT` la o valoare conservatoare pentru fiecare instanță sau să
direcționeze traficul de imagini Cursor către o singură instanță.

## Cerințe

1. Un cont Cursor conectat în panoul de control (OAuth sau cheia API `crsr_…`).
2. Binarul Cursor Agent disponibil procesului OmniRoute:
   - variabila de mediu `CURSOR_AGENT_BIN=/path/to/agent` sau
   - `~/.local/bin/agent` sau
   - `providerSpecificData.agentBin` în conexiunea Cursor.

Ajustări opționale:

| Variabilă de mediu          | Valoare implicită              | Semnificație                                   |
| --------------------------- | ------------------------------ | ---------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                       | Timp total per imagine                         |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                            | Barieră de concurență pentru licența partajată |
| `CURSOR_IMG_MODEL`          | (modelul solicitării / `auto`) | Suprascrie opțiunea CLI `--model`              |

## Exemplu

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generarea durează de obicei 1–2 minute. Este de preferat o cale prin rețeaua internă; proxy-urile periferice cu timeouturi de aproximativ 100 s vor eșua.

## LiteLLM

Înregistrați un model de imagini cu `mode: image_generation`, `api_base: http://omniroute:20128/v1` și `model: openai/cursor/auto` (sau doar `cursor/auto`, în funcție de versiunea LiteLLM).
