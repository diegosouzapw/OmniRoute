# Cursor Image Generation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

Az OmniRoute a Cursor-csomag **képgenerálási** funkcióját a `POST /v1/images/generations` végponton keresztül teszi elérhetővé, ugyanazzal a szolgáltatóazonosítóval, mint a csevegést: `cursor` (alias: `cu`).

| Mező                        | Érték                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS`-azonosító | `cursor`                                                                                                 |
| Formátum                    | `cursor-agent-image`                                                                                     |
| Hitelesítés                 | Ugyanaz az OAuth-/API-kulcsos kapcsolat, mint a csevegésnél (`provider_connections.provider = "cursor"`) |
| Modellek                    | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                                |

## Miért az Agent CLI?

Az OmniRoute Cursor-csevegése az `agent.v1.AgentService/Run` (protobuf) szolgáltatást használja. Ez az útvonal **elutasítja** a beépített klienseszközöket (shell, write, …). A képgenerálás egy Cursor-natív eszköz, amelyet az **`agent` CLI** hajt végre a licenchez kapcsolódva. Ezért a képkezelő egy zárolt prompttal és kérésenként külön ideiglenes munkaterülettel indítja el az `agent` folyamatot (a közösségi licenchidakhoz hasonlóan), majd OpenAI-kompatibilis `b64_json`-választ ad vissza.

## Hozzáférési korlátozás (Szigorú szabályok #15 + #17)

Ez az egyetlen olyan `IMAGE_PROVIDERS`-formátum, amely gyermekfolyamatot indít (az `agent`
binárist). Mivel a `POST /v1/images/generations` végpontot körülbelül 40 másik, gyermekfolyamatot nem indító
képszolgáltató is használja, amelyeket a távoli hívók jogszerűen vesznek igénybe, a teljes útvonal
nincs `LOCAL_ONLY` besorolással ellátva — ehelyett a `handleCursorAgentImageGeneration` a saját
korlátozását érvényesíti a megbízható `AUTHZ_HEADER_PEER_LOCALITY` döntés alapján, amelyet az engedélyezési folyamat minden kérésre
rábélyegez (a valódi TCP-partnertől származik, soha nem a hamisítható `Host` fejlécből): csak a
`loopback` és `lan` hívók érhetik el a folyamatindítást; minden más hívó (beleértve azt az esetet is, amikor egy kiszivárgott
API-kulcsot nyilvános alagúton keresztül újrajátszanak) `403` választ kap, mielőtt bármilyen hitelesítőadat-keresés vagy
folyamatindítás történne. A `LOCAL_ONLY` szint többi részére alkalmazott azonos
szabályzatért lásd: `src/server/authz/policies/management.ts`.

## A párhuzamossági korlát modulszintű (egypéldányos korlátozás)

A `CURSOR_IMG_MAX_CONCURRENT` korlátozást egy, a Node-modulpéldányhoz kötött
memóriabeli számláló/várólista érvényesíti (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Ez megfelelően korlátozza az egy OmniRoute-folyamaton belüli párhuzamos `agent`-indításokat, de
**nem** hangolja össze az ugyanazt a Cursor-licencet használó több folyamatot/példányt
(pl. több replikából álló telepítés esetén) — minden példány a saját, független korlátját érvényesíti.
Egypéldányos telepítésnél (ez az alapértelmezés) a korlátozás pontos; a horizontálisan skálázott
telepítéseknél példányonként konzervatív `CURSOR_IMG_MAX_CONCURRENT` értéket kell használni, vagy a
Cursor-képforgalmat egyetlen példányhoz kell irányítani.

## Követelmények

1. Egy csatlakoztatott Cursor-fiók az irányítópulton (OAuth vagy `crsr_…` API-kulcs).
2. A Cursor Agent binárisnak elérhetőnek kell lennie az OmniRoute-folyamat számára:
   - `CURSOR_AGENT_BIN=/path/to/agent` környezeti változóval, vagy
   - a `~/.local/bin/agent` útvonalon, vagy
   - a Cursor-kapcsolat `providerSpecificData.agentBin` mezőjében.

Opcionális finomhangolás:

| Környezeti változó          | Alapértelmezés              | Jelentés                                  |
| --------------------------- | --------------------------- | ----------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Képenkénti teljes végrehajtási idő        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Megosztott licenc párhuzamossági korlátja |
| `CURSOR_IMG_MODEL`          | (a kérés modellje / `auto`) | A CLI `--model` beállításának felülírása  |

## Példa

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

A generálás általában 1–2 percet vesz igénybe. Részesítse előnyben a belső hálózati útvonalat; a körülbelül 100 másodperces időkorláttal rendelkező peremproxyk hibát fognak jelezni.

## LiteLLM

Regisztráljon egy képmodellt a `mode: image_generation`, `api_base: http://omniroute:20128/v1` és `model: openai/cursor/auto` beállításokkal (vagy a LiteLLM verziójától függően a sima `cursor/auto` értékkel).
