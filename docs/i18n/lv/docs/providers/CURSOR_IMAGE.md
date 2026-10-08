# Cursor Image Generation (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute nodrošina Cursor plāna **attēlu ģenerēšanu**, izmantojot `POST /v1/images/generations` un to pašu nodrošinātāja ID kā tērzēšanai: `cursor` (aizstājvārds `cu`).

| Lauks                | Vērtība                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                                           |
| Formāts              | `cursor-agent-image`                                                                               |
| Autentifikācija      | Tas pats OAuth/API atslēgas savienojums kā tērzēšanai (`provider_connections.provider = "cursor"`) |
| Modeļi               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                          |

## Kāpēc tiek izmantots Agent CLI

Cursor tērzēšana OmniRoute izmanto `agent.v1.AgentService/Run` (protobuf). Šis ceļš **noraida** iebūvētos klienta rīkus (čaulu, rakstīšanu, …). Attēlu ģenerēšana ir Cursor vietējais rīks, ko **`agent` CLI** izpilda, izmantojot licenci. Tādēļ attēlu apstrādātājs palaiž `agent` ar fiksētu uzvedni un katram pieprasījumam paredzētu pagaidu darbvietu (tādā pašā veidā kā kopienas licenču tilti), pēc tam atgriež ar OpenAI saderīgu `b64_json`.

## Piekļuves ierobežojums (stingrie noteikumi #15 + #17)

Šis ir vienīgais `IMAGE_PROVIDERS` formāts, kas palaiž pakārtotu procesu (`agent`
bināro failu). Tā kā `POST /v1/images/generations` koplieto aptuveni 40 citi attēlu
nodrošinātāji, kas nepalaiž procesus un kurus attālināti izsaucēji pamatoti izmanto,
viss maršruts **nav** klasificēts kā `LOCAL_ONLY` — tā vietā
`handleCursorAgentImageGeneration` ievieš savu piekļuves kontroli, izmantojot uzticamo
`AUTHZ_HEADER_PEER_LOCALITY` lēmumu, ko autorizācijas konveijers pievieno katram
pieprasījumam (pamatojoties uz īsto TCP vienādranga mezglu, nevis viltojamo `Host`
galveni): procesu drīkst palaist tikai `loopback` un `lan` izsaucēji; visi pārējie
(tostarp nopludināta API atslēga, kas atkārtoti izmantota publiskā tunelī) saņem `403`,
pirms tiek veikta jebkāda akreditācijas datu meklēšana vai procesa palaišana. Skatiet
`src/server/authz/policies/management.ts`, kur tā pati politika tiek piemērota pārējam
`LOCAL_ONLY` līmenim.

## Vienlaicīguma ierobežojums darbojas moduļa līmenī (vienas instances ierobežojums)

`CURSOR_IMG_MAX_CONCURRENT` tiek ieviests ar atmiņā glabātu skaitītāju/rindu, kas
piesaistīta Node moduļa instancei (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Tas pareizi ierobežo vienlaicīgas `agent` palaišanas vienā OmniRoute procesā, taču
**nekoordinē** vairākus procesus/instances, kas koplieto vienu Cursor licenci
(piemēram, izvietojumā ar vairākām replikām) — katra instance piemēro savu neatkarīgu
ierobežojumu. Vienas instances izvietojumā (noklusējums) tas darbojas precīzi;
horizontāli mērogotos izvietojumos katrai instancei jāiestata konservatīva
`CURSOR_IMG_MAX_CONCURRENT` vērtība vai Cursor attēlu datplūsma jānovirza uz vienu
instanci.

## Prasības

1. Informācijas panelī pievienots Cursor konts (OAuth vai `crsr_…` API atslēga).
2. OmniRoute procesam pieejams Cursor Agent binārais fails:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, vai
   - `~/.local/bin/agent`, vai
   - `providerSpecificData.agentBin` Cursor savienojumā.

Papildu pielāgošana:

| Env                         | Noklusējums                     | Nozīme                                          |
| --------------------------- | ------------------------------- | ----------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                        | Viena attēla izpildes laika ierobežojums        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                             | Koplietotās licences vienlaicīguma ierobežojums |
| `CURSOR_IMG_MODEL`          | (pieprasījuma modelis / `auto`) | Pārraksta CLI `--model`                         |

## Piemērs

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Ģenerēšana parasti ilgst 1–2 minūtes. Ieteicams izmantot iekšējā tīkla ceļu; perifērijas starpniekserveros ar aptuveni 100 sekunžu taimautu pieprasījums neizdosies.

## LiteLLM

Reģistrējiet attēlu modeli ar `mode: image_generation`, `api_base: http://omniroute:20128/v1` un `model: openai/cursor/auto` (vai tikai `cursor/auto` atkarībā no jūsu LiteLLM versijas).
