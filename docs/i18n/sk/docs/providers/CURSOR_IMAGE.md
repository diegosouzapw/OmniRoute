# Cursor Image Generation (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute sprístupňuje **generovanie obrázkov** v rámci plánu Cursor na `POST /v1/images/generations` prostredníctvom rovnakého ID poskytovateľa ako čet: `cursor` (alias `cu`).

| Pole                 | Hodnota                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| ID `IMAGE_PROVIDERS` | `cursor`                                                                                        |
| Formát               | `cursor-agent-image`                                                                            |
| Autentifikácia       | Rovnaké pripojenie OAuth / API kľúčom ako pri čete (`provider_connections.provider = "cursor"`) |
| Modely               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                       |

## Prečo Agent CLI

Čet Cursor v OmniRoute používa `agent.v1.AgentService/Run` (protobuf). Táto cesta **odmieta** vstavané klientske nástroje (shell, zápis, …). Generovanie obrázkov je natívny nástroj Cursor spúšťaný cez rozhranie **`agent` CLI** voči licencii. Obslužný program obrázkov preto spustí `agent` s uzamknutým promptom a dočasným pracovným priestorom pre každú požiadavku (rovnakým spôsobom ako komunitné mosty licencií) a následne vráti `b64_json` kompatibilný s OpenAI.

## Obmedzenie prístupu (Pevné pravidlá č. 15 + 17)

Toto je jediný formát `IMAGE_PROVIDERS`, ktorý spúšťa podradený proces (binárny súbor
`agent`). Keďže `POST /v1/images/generations` zdieľa približne 40 ďalších poskytovateľov
obrázkov, ktorí nespúšťajú procesy a ktorých vzdialení volajúci legitímne používajú, celá
trasa **nie je** klasifikovaná ako `LOCAL_ONLY` — namiesto toho
`handleCursorAgentImageGeneration` presadzuje vlastnú bránu pomocou dôveryhodného
verdiktu `AUTHZ_HEADER_PEER_LOCALITY`, ktorý autorizačný kanál pripája ku každej
požiadavke (na základe skutočného TCP partnera, nikdy nie sfalšovateľnej hlavičky
`Host`): k spusteniu môžu pristúpiť iba volajúci typu `loopback` a `lan`; všetci ostatní
(vrátane uniknutého API kľúča opätovne použitého cez verejný tunel) dostanú odpoveď
`403` ešte pred akýmkoľvek vyhľadaním prihlasovacích údajov alebo spustením procesu.
Rovnaké pravidlá uplatňované na zvyšok úrovne `LOCAL_ONLY` nájdete v
`src/server/authz/policies/management.ts`.

## Brána súbežnosti je na úrovni modulu (obmedzenie jednej inštancie)

`CURSOR_IMG_MAX_CONCURRENT` sa presadzuje prostredníctvom počítadla/frontu v pamäti
s rozsahom platnosti obmedzeným na inštanciu modulu Node
(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Správne obmedzuje súbežné spustenia `agent` v rámci jedného procesu OmniRoute, ale
**nekoordinuje** ich medzi viacerými procesmi/inštanciami zdieľajúcimi rovnakú licenciu
Cursor (napr. pri nasadení s viacerými replikami) — každá inštancia presadzuje svoj
vlastný nezávislý limit. Pri nasadení s jednou inštanciou (predvolené nastavenie) je
tento limit presný; horizontálne škálované nasadenia by mali pre každú inštanciu
nastaviť konzervatívnu hodnotu `CURSOR_IMG_MAX_CONCURRENT` alebo smerovať prenos
generovania obrázkov Cursor na jedinú inštanciu.

## Požiadavky

1. Pripojený účet Cursor v ovládacom paneli (OAuth alebo API kľúč `crsr_…`).
2. Binárny súbor Cursor Agent dostupný procesu OmniRoute:
   - premenná prostredia `CURSOR_AGENT_BIN=/path/to/agent`, alebo
   - `~/.local/bin/agent`, alebo
   - `providerSpecificData.agentBin` v pripojení Cursor.

Voliteľné doladenie:

| Premenná prostredia         | Predvolená hodnota            | Význam                              |
| --------------------------- | ----------------------------- | ----------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                      | Časový limit pre jeden obrázok      |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                           | Brána súbežnosti zdieľanej licencie |
| `CURSOR_IMG_MODEL`          | (model z požiadavky / `auto`) | Prepísanie parametra CLI `--model`  |

## Príklad

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generovanie zvyčajne trvá 1 až 2 minúty. Uprednostnite cestu cez internú sieť; okrajové proxy s časovým limitom približne 100 sekúnd zlyhajú.

## LiteLLM

Zaregistrujte model obrázkov s `mode: image_generation`, `api_base: http://omniroute:20128/v1` a `model: openai/cursor/auto` (alebo iba `cursor/auto` v závislosti od vašej verzie LiteLLM).
