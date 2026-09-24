# Cursor Image Generation (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

# Generisanje slika u Cursoru

OmniRoute izlaže **generisanje slika** Cursor plana na `POST /v1/images/generations` kroz isti ID provajdera kao i za chat: `cursor` (alias `cu`).

| Polje                | Vrijednost                                                                              |
| -------------------- | --------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                |
| Format               | `cursor-agent-image`                                                                    |
| Autorizacija         | Ista OAuth / API-key konekcija kao za chat (`provider_connections.provider = "cursor"`) |
| Modeli               | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                               |

## Zašto Agent CLI

Cursor chat u OmniRoute-u koristi `agent.v1.AgentService/Run` (protobuf). Ta putanja **odbija** ugrađene klijentske alate (shell, write, …). Generisanje slika je alat izvorni za Cursor koji izvršava **`agent` CLI** nad licencom (seat). Handler za slike stoga pokreće `agent` sa zaključanim promptom i privremenim radnim prostorom po zahtjevu (istog oblika kao community seat bridges), a zatim vraća `b64_json` kompatibilan sa OpenAI-om.

## Ograničenje pristupa (Hard Rules #15 + #17)

Ovo je jedini `IMAGE_PROVIDERS` format koji pokreće podproces (binarnu datoteku `agent`). Budući da `POST /v1/images/generations` dijeli ~40 drugih provajdera slika koji ne pokreću procese, a koje udaljeni pozivaoci legitimno koriste, cijela ruta **nije** klasifikovana kao `LOCAL_ONLY` — umjesto toga, `handleCursorAgentImageGeneration` nameće sopstvenu kapiju koristeći pouzdanu `AUTHZ_HEADER_PEER_LOCALITY` presudu koju authz pipeline utiskuje na svaki zahtjev (od stvarnog TCP peer-a, nikada od `Host` zaglavlja koje se može lažirati): samo `loopback` i `lan` pozivaoci mogu pristupiti pokretanju; sve ostalo (uključujući procurjeli API ključ koji se ponavlja preko javnog tunela) dobija `403` prije bilo kakve provjere vjerodajnica ili pokretanja procesa. Pogledajte `src/server/authz/policies/management.ts` za istu politiku primijenjenu na ostatak `LOCAL_ONLY` nivoa.

## Kapija za istovremenost je na nivou modula (ograničenje jedne instance)

`CURSOR_IMG_MAX_CONCURRENT` se nameće pomoću in-memory brojača/reda čekanja koji je ograničen na instancu Node modula (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`). On ispravno ograničava istovremena pokretanja `agent`-a unutar jednog OmniRoute procesa, ali **ne** koordiniše između više procesa/instanci koje dijele istu Cursor licencu (npr. multi-replica deployment) — svaka instanca nameće sopstveno nezavisno ograničenje. Za deployment sa jednom instancom (podrazumijevano) ovo je tačno; horizontalno skalirani deploymenti treba da drže `CURSOR_IMG_MAX_CONCURRENT` konzervativnim po instanci ili da usmjere Cursor saobraćaj slika na jednu instancu.

## Zahtjevi

1. Povezan Cursor nalog na kontrolnoj tabli (OAuth ili `crsr_…` API ključ).
2. Cursor Agent binarna datoteka dostupna OmniRoute procesu:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, ili
   - `~/.local/bin/agent`, ili
   - `providerSpecificData.agentBin` na Cursor konekciji.

Opciono podešavanje:

| Env                         | Podrazumijevano          | Značenje                                   |
| --------------------------- | ------------------------ | ------------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                 | Vrijeme po slici (wall clock)              |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                      | Kapija istovremenosti za dijeljenu licencu |
| `CURSOR_IMG_MODEL`          | (request model / `auto`) | Nadjačavanje CLI `--model`                 |

## Primjer

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generisanje obično traje 1–2 minute. Preporučuje se interna mrežna putanja; rubni proxy serveri s vremenskim ograničenjem od oko 100 s neće uspjeti.

## LiteLLM

Registrujte model slike sa `mode: image_generation`, `api_base: http://omniroute:20128/v1`, i `model: openai/cursor/auto` (ili samo `cursor/auto` u zavisnosti od vaše verzije LiteLLM-a).
