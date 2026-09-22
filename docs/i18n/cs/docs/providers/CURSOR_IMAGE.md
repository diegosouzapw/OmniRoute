# Cursor Image Generation (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute zpřístupňuje **generování obrázků** v rámci plánu Cursor na `POST /v1/images/generations` prostřednictvím stejného ID poskytovatele jako chat: `cursor` (alias `cu`).

| Pole                 | Hodnota                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------- |
| ID `IMAGE_PROVIDERS` | `cursor`                                                                                     |
| Formát               | `cursor-agent-image`                                                                         |
| Ověření              | Stejné připojení OAuth / API klíče jako u chatu (`provider_connections.provider = "cursor"`) |
| Modely               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                    |

## Proč Agent CLI

Chat Cursoru v OmniRoute používá `agent.v1.AgentService/Run` (protobuf). Tato cesta **odmítá** vestavěné klientské nástroje (shell, zápis, …). Generování obrázků je nativní nástroj Cursoru spouštěný rozhraním **`agent` CLI** vůči licenci. Obslužná rutina obrázků proto spustí `agent` s uzamčeným promptem a dočasným pracovním prostorem pro každý požadavek (stejně jako komunitní mosty pro licence) a poté vrátí `b64_json` kompatibilní s OpenAI.

## Omezení přístupu (Pevná pravidla č. 15 + č. 17)

Toto je jediný formát `IMAGE_PROVIDERS`, který spouští podřízený proces (binární soubor
`agent`). Protože `POST /v1/images/generations` sdílí přibližně 40 dalších poskytovatelů
obrázků, kteří podřízené procesy nespouštějí a které vzdálení volající oprávněně používají,
není celá trasa klasifikována jako `LOCAL_ONLY` — místo toho
`handleCursorAgentImageGeneration` vynucuje vlastní kontrolu pomocí důvěryhodného
verdiktu `AUTHZ_HEADER_PEER_LOCALITY`, kterým autorizační pipeline označí každý požadavek
(na základě skutečného TCP protějšku, nikdy podle podvrhnutelné hlavičky `Host`): ke spuštění
se dostanou pouze volající z `loopback` a `lan`; všichni ostatní (včetně případu, kdy je
uniklý API klíč znovu použit přes veřejný tunel) obdrží `403` ještě před vyhledáním
přihlašovacích údajů nebo spuštěním procesu. Stejnou zásadu použitou pro zbytek úrovně
`LOCAL_ONLY` najdete v `src/server/authz/policies/management.ts`.

## Omezení souběžnosti je na úrovni modulu (omezení jedné instance)

`CURSOR_IMG_MAX_CONCURRENT` je vynucováno čítačem/frontou v paměti s rozsahem platnosti
instance modulu Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Správně omezuje souběžná spuštění procesu `agent` v rámci jednoho procesu OmniRoute,
ale **nekoordinuje** více procesů/instancí sdílejících stejnou licenci Cursoru
(např. nasazení s více replikami) — každá instance vynucuje svůj vlastní nezávislý limit.
Pro nasazení s jednou instancí (výchozí nastavení) je toto omezení přesné; horizontálně
škálovaná nasazení by měla pro každou instanci nastavit konzervativní hodnotu
`CURSOR_IMG_MAX_CONCURRENT` nebo směrovat provoz generování obrázků Cursoru na jedinou instanci.

## Požadavky

1. Účet Cursoru připojený v řídicím panelu (OAuth nebo API klíč `crsr_…`).
2. Binární soubor Cursor Agent dostupný procesu OmniRoute:
   - proměnná prostředí `CURSOR_AGENT_BIN=/path/to/agent`, nebo
   - `~/.local/bin/agent`, nebo
   - `providerSpecificData.agentBin` v připojení Cursoru.

Volitelné ladění:

| Proměnná prostředí          | Výchozí hodnota              | Význam                                |
| --------------------------- | ---------------------------- | ------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                     | Maximální reálný čas na jeden obrázek |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                          | Omezení souběžnosti sdílené licence   |
| `CURSOR_IMG_MODEL`          | (model z požadavku / `auto`) | Přepsání parametru CLI `--model`      |

## Příklad

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generování obvykle trvá 1–2 minuty. Upřednostněte cestu přes interní síť; hraniční proxy s časovým limitem přibližně 100 s selžou.

## LiteLLM

Zaregistrujte model obrázků s `mode: image_generation`, `api_base: http://omniroute:20128/v1` a `model: openai/cursor/auto` (nebo pouze `cursor/auto` v závislosti na vaší verzi LiteLLM).
