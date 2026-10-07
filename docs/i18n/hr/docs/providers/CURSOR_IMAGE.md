# Cursor Image Generation (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute omogućuje **generiranje slika** u sklopu Cursor plana putem `POST /v1/images/generations`, koristeći isti ID pružatelja kao i za chat: `cursor` (alias `cu`).

| Polje                   | Vrijednost                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| ID za `IMAGE_PROVIDERS` | `cursor`                                                                                         |
| Format                  | `cursor-agent-image`                                                                             |
| Autentikacija           | Ista OAuth veza / veza putem API ključa kao za chat (`provider_connections.provider = "cursor"`) |
| Modeli                  | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                        |

## Zašto Agent CLI

Cursor chat u OmniRouteu koristi `agent.v1.AgentService/Run` (protobuf). Taj put **odbija** ugrađene klijentske alate (ljusku, zapisivanje, …). Generiranje slika izvorni je Cursorov alat koji **`agent` CLI** izvršava koristeći korisničko mjesto. Stoga rukovatelj slikama pokreće `agent` sa zaključanim promptom i privremenim radnim prostorom za svaki zahtjev (jednake strukture kao mostovi korisničkih mjesta iz zajednice), a zatim vraća `b64_json` kompatibilan s OpenAI-jem.

## Ograničenje pristupa (Stroga pravila #15 + #17)

Ovo je jedini format u `IMAGE_PROVIDERS` koji pokreće podređeni proces (binarnu datoteku
`agent`). Budući da `POST /v1/images/generations` dijeli približno 40 drugih pružatelja
slika koji ne pokreću procese i koje udaljeni pozivatelji legitimno koriste, cijela ruta **nije**
klasificirana kao `LOCAL_ONLY` — umjesto toga `handleCursorAgentImageGeneration` primjenjuje vlastitu
kontrolu koristeći pouzdanu procjenu `AUTHZ_HEADER_PEER_LOCALITY` koju autorizacijski cjevovod postavlja
na svaki zahtjev (na temelju stvarnog TCP sučelja, a nikada zaglavlja `Host` koje je moguće lažirati): samo
pozivatelji s lokacijom `loopback` i `lan` mogu pokrenuti proces; svi ostali (uključujući slučaj u kojem se
procurjeli API ključ ponovno koristi preko javnog tunela) dobivaju `403` prije bilo kakvog traženja
vjerodajnica ili pokretanja procesa. Pogledajte `src/server/authz/policies/management.ts` za istu
politiku primijenjenu na ostatak razine `LOCAL_ONLY`.

## Kontrola konkurentnosti na razini je modula (ograničenje jedne instance)

`CURSOR_IMG_MAX_CONCURRENT` provodi se pomoću brojača/reda čekanja u memoriji, ograničenog na
instancu Node modula (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Ispravno ograničava istodobna pokretanja procesa `agent` unutar jednog OmniRoute procesa, ali
**ne** koordinira više procesa/instanci koje dijele isto Cursor korisničko mjesto
(npr. implementacija s više replika) — svaka instanca primjenjuje vlastito neovisno ograničenje.
Za implementaciju s jednom instancom (zadano) to je precizno; horizontalno skalirane
implementacije trebaju postaviti konzervativnu vrijednost za `CURSOR_IMG_MAX_CONCURRENT` po instanci ili usmjeriti
Cursor promet za slike na jednu instancu.

## Preduvjeti

1. Povezan Cursor račun na nadzornoj ploči (OAuth ili API ključ `crsr_…`).
2. Binarna datoteka Cursor Agent dostupna OmniRoute procesu:
   - varijabla okruženja `CURSOR_AGENT_BIN=/path/to/agent`, ili
   - `~/.local/bin/agent`, ili
   - `providerSpecificData.agentBin` na Cursor vezi.

Neobavezivo podešavanje:

| Varijabla okruženja         | Zadano                       | Značenje                                               |
| --------------------------- | ---------------------------- | ------------------------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                     | Maksimalno vrijeme izvođenja po slici                  |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                          | Kontrola konkurentnosti za dijeljeno korisničko mjesto |
| `CURSOR_IMG_MODEL`          | (model iz zahtjeva / `auto`) | Nadjačavanje CLI opcije `--model`                      |

## Primjer

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generiranje obično traje 1–2 minute. Preporučuje se interna mrežna putanja; rubni proxy poslužitelji s vremenskim ograničenjima od približno 100 s neće uspjeti.

## LiteLLM

Registrirajte model za slike s `mode: image_generation`, `api_base: http://omniroute:20128/v1` i `model: openai/cursor/auto` (ili samo `cursor/auto`, ovisno o vašoj verziji LiteLLM-a).
