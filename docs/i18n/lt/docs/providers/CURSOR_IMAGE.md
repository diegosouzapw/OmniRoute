# Cursor Image Generation (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute suteikia prieigą prie Cursor plano **vaizdų generavimo** per `POST /v1/images/generations`, naudojant tą patį teikėjo ID kaip ir pokalbiams: `cursor` (alternatyvus pavadinimas `cu`).

| Laukas               | Reikšmė                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                                         |
| Formatas             | `cursor-agent-image`                                                                             |
| Autentifikavimas     | Tas pats OAuth / API rakto ryšys kaip ir pokalbiams (`provider_connections.provider = "cursor"`) |
| Modeliai             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                        |

## Kodėl naudojama Agent CLI

Cursor pokalbiams OmniRoute naudoja `agent.v1.AgentService/Run` (protobuf). Šis kelias **atmeta** integruotus kliento įrankius (shell, write, …). Vaizdų generavimas yra vietinis Cursor įrankis, kurį **`agent` CLI** vykdo naudodama licencijos vietą. Todėl vaizdų apdorojimo programa paleidžia `agent` su užrakinta užklausa ir kiekvienai užklausai skirta laikina darbo sritimi (pagal tokią pačią struktūrą kaip bendruomenės licencijos vietų sąsajos), o tada grąžina su OpenAI suderinamą `b64_json`.

## Prieigos apribojimas (griežtosios taisyklės Nr. 15 ir Nr. 17)

Tai vienintelis `IMAGE_PROVIDERS` formatas, paleidžiantis antrinį procesą (`agent`
dvejetainį failą). Kadangi `POST /v1/images/generations` bendrai naudoja apie 40 kitų,
antrinių procesų nepaleidžiančių vaizdų teikėjų, kuriais nuotoliniai klientai pagrįstai
naudojasi, visas maršrutas **nėra** klasifikuojamas kaip `LOCAL_ONLY` — vietoje to
`handleCursorAgentImageGeneration` taiko savo prieigos kontrolę, naudodama patikimą
`AUTHZ_HEADER_PEER_LOCALITY` rezultatą, kurį įgaliojimo konvejeris prideda prie
kiekvienos užklausos (pagal tikrąjį TCP lygiarangį mazgą, niekada pagal suklastojamą
`Host` antraštę): antrinį procesą gali paleisti tik `loopback` ir `lan` klientai; visi
kiti (įskaitant nutekintą API raktą, pakartotinai panaudotą per viešą tunelį) gauna
`403` dar prieš atliekant bet kokią prisijungimo duomenų paiešką ar paleidžiant
procesą. Tą pačią likusiai `LOCAL_ONLY` pakopai taikomą politiką žr.
`src/server/authz/policies/management.ts`.

## Lygiagretumo kontrolė veikia modulio lygmeniu (vieno egzemplioriaus apribojimas)

`CURSOR_IMG_MAX_CONCURRENT` įgyvendinamas naudojant atmintyje laikomą skaitiklį / eilę,
apribotą Node modulio egzemplioriumi
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Tai tinkamai riboja vienu metu paleidžiamų `agent` procesų skaičių viename OmniRoute
procese, tačiau **nekoordinuoja** kelių procesų / egzempliorių, naudojančių tą pačią
Cursor licencijos vietą (pvz., kelių replikų dieginyje) — kiekvienas egzempliorius taiko
savo nepriklausomą apribojimą. Vieno egzemplioriaus dieginyje (numatytasis variantas)
šis apribojimas yra tikslus; horizontaliai išplėstuose dieginiuose kiekvienam
egzemplioriui reikėtų nustatyti konservatyvią `CURSOR_IMG_MAX_CONCURRENT` reikšmę arba
nukreipti Cursor vaizdų srautą į vieną egzempliorių.

## Reikalavimai

1. Valdymo skydelyje prijungta Cursor paskyra (OAuth arba `crsr_…` API raktas).
2. OmniRoute procesui pasiekiamas Cursor Agent dvejetainis failas:
   - aplinkos kintamasis `CURSOR_AGENT_BIN=/path/to/agent`, arba
   - `~/.local/bin/agent`, arba
   - `providerSpecificData.agentBin` Cursor ryšyje.

Pasirenkamas derinimas:

| Aplinkos kintamasis         | Numatytoji reikšmė           | Paskirtis                                       |
| --------------------------- | ---------------------------- | ----------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                     | Vieno vaizdo generavimo laiko limitas           |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                          | Bendros licencijos vietos lygiagretumo kontrolė |
| `CURSOR_IMG_MODEL`          | (užklausos modelis / `auto`) | Perrašyti CLI `--model`                         |

## Pavyzdys

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generavimas paprastai trunka 1–2 minutes. Rekomenduojama naudoti vidinio tinklo kelią; kraštiniai tarpiniai serveriai, kurių skirtasis laikas yra apie 100s, pateiks klaidą.

## LiteLLM

Užregistruokite vaizdų modelį su `mode: image_generation`, `api_base: http://omniroute:20128/v1` ir `model: openai/cursor/auto` (arba tiesiog `cursor/auto`, priklausomai nuo jūsų LiteLLM versijos).
