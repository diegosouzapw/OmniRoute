# Cursor Image Generation (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute omogoča **ustvarjanje slik** v okviru paketa Cursor na `POST /v1/images/generations` prek istega ID-ja ponudnika kot klepet: `cursor` (vzdevek `cu`).

| Polje                  | Vrednost                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| ID `IMAGE_PROVIDERS`   | `cursor`                                                                                       |
| Oblika                 | `cursor-agent-image`                                                                           |
| Preverjanje pristnosti | Ista povezava OAuth / s ključem API kot za klepet (`provider_connections.provider = "cursor"`) |
| Modeli                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                      |

## Zakaj Agent CLI

Klepet Cursor v OmniRoute uporablja `agent.v1.AgentService/Run` (protobuf). Ta pot **zavrača** vgrajena odjemalska orodja (lupino, pisanje, …). Ustvarjanje slik je izvorno orodje Cursor, ki ga **`agent` CLI** izvaja z uporabniško licenco. Zato upravljalnik slik zažene `agent` z zaklenjenim pozivom in začasnim delovnim prostorom za vsako zahtevo (po istem vzorcu kot skupnostni mostovi za uporabniške licence), nato pa vrne `b64_json`, združljiv z OpenAI.

## Omejitev dostopa (strogi pravili št. 15 in 17)

To je edina oblika `IMAGE_PROVIDERS`, ki zažene podrejeni proces (binarno datoteko
`agent`). Ker `POST /v1/images/generations` uporablja tudi približno 40 drugih ponudnikov
slik, ki ne zaganjajo procesov in jih oddaljeni klicatelji upravičeno uporabljajo, celotna
pot **ni** razvrščena kot `LOCAL_ONLY` — namesto tega `handleCursorAgentImageGeneration`
uveljavlja lastno dostopno pregrado z uporabo zaupanja vredne presoje
`AUTHZ_HEADER_PEER_LOCALITY`, ki jo cevovod za avtorizacijo doda vsaki zahtevi
(na podlagi dejanskega vrstnika TCP, nikoli glave `Host`, ki jo je mogoče ponarediti):
do zagona lahko dostopajo samo klicatelji `loopback` in `lan`; vsi ostali (vključno z
uporabo razkritega ključa API prek javnega tunela) prejmejo `403`, preden se izvede
kakršno koli iskanje poverilnic ali zagon procesa. Enak pravilnik, ki se uporablja za
preostanek ravni `LOCAL_ONLY`, si oglejte v `src/server/authz/policies/management.ts`.

## Omejevanje sočasnosti je na ravni modula (omejitev ene instance)

`CURSOR_IMG_MAX_CONCURRENT` uveljavlja števec/čakalna vrsta v pomnilniku, omejena na
instanco modula Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Pravilno omejuje sočasne zagone `agent` znotraj enega procesa OmniRoute, vendar se
**ne** usklajuje med več procesi/instancami, ki uporabljajo isto uporabniško licenco
Cursor (npr. uvedba z več replikami) — vsaka instanca uveljavlja svojo neodvisno omejitev.
Za uvedbo z eno instanco (privzeto) je omejitev natančna; vodoravno razširjene
uvedbe naj za vsako instanco nastavijo konservativno vrednost
`CURSOR_IMG_MAX_CONCURRENT` ali pa promet za slike Cursor usmerijo na eno samo instanco.

## Zahteve

1. Povezan račun Cursor na nadzorni plošči (OAuth ali ključ API `crsr_…`).
2. Binarna datoteka Cursor Agent mora biti na voljo procesu OmniRoute:
   - spremenljivka okolja `CURSOR_AGENT_BIN=/path/to/agent` ali
   - `~/.local/bin/agent` ali
   - `providerSpecificData.agentBin` v povezavi Cursor.

Izbirne prilagoditve:

| Spremenljivka okolja        | Privzeta vrednost        | Pomen                                             |
| --------------------------- | ------------------------ | ------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Najdaljši čas izvajanja za posamezno sliko        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Omejitev sočasnosti za skupno uporabniško licenco |
| `CURSOR_IMG_MODEL`          | (model zahteve / `auto`) | Prepis možnosti CLI `--model`                     |

## Primer

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Ustvarjanje običajno traja 1–2 minuti. Priporočena je notranja omrežna pot; robni posredniški strežniki s časovno omejitvijo približno 100 sekund ne bodo uspeli.

## LiteLLM

Registrirajte slikovni model z `mode: image_generation`, `api_base: http://omniroute:20128/v1` in `model: openai/cursor/auto` (ali samo `cursor/auto`, odvisno od vaše različice LiteLLM).
