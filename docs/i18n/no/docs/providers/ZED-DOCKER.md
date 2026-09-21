# Zed IDE Integration in Docker Environments (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Når OmniRoute kjører i Docker, mislykkes standardflyten «Importer fra Zed-nøkkelringen»
fordi containeren ikke får tilgang til nøkkelringtjenesten i vertsoperativsystemet (`libsecret` på Linux,
Keychain på macOS og Credential Manager på Windows), og Zed-konfigurasjonskatalogene på
vertens filsystem er som standard ikke synlige inne i containeren.

## Hvorfor import fra nøkkelringen mislykkes i Docker

To blokkerende problemer oppstår inne i en container:

1. **Filsystemisolasjon** — `isZedInstalled()` ser etter `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) eller tilsvarende plassering i Windows. Disse banene
   finnes på verten og er ikke tilgjengelige med mindre de eksplisitt monteres som volumer.
2. **IPC-isolasjon** — Selv når konfigurasjonskatalogen er montert, kommuniserer den
   plattformspesifikke `keytar`-modulen med operativsystemets nøkkelringtjeneste via en Unix-socket eller D-Bus-økt.
   Ingen av delene videresendes som standard til containeren, så lesing av legitimasjon mislykkes alltid.

OmniRoute oppdager Docker-miljøet ved hjelp av to heuristikker:

- Tilstedeværelsen av `/.dockerenv` (skrevet av Docker-tjenesten når containeren starter).
- Strengen `docker` i `/proc/1/cgroup` (Linux cgroup v1).

Når én av heuristikkene slår til, returnerer importruten HTTP 422 med
`zedDockerEnvironment: true` og en melding som henviser deg til fanen Manuell tokenimport.

## Bruke fanen Manuell tokenimport

1. Åpne **Kontrollpanel → Leverandører → Zed**.
2. Panelet **Manuell tokenimport** vises under kortet for nøkkelringimport. Når
   OmniRoute oppdager Docker, utvides dette panelet automatisk etter det første mislykkede
   forsøket på å importere fra nøkkelringen.
3. Velg leverandøren fra rullegardinlisten (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter eller DeepSeek).
4. Lim inn API-nøkkelen i passordfeltet.
5. Klikk på **Importer**.

Nøkkelen lagres som en ny leverandørtilkobling med navnet
`Zed Manual Import (<provider>)`.

## Hvor Zed lagrer API-nøkler på verten

Zed lagrer nøkler for AI-leverandører i operativsystemets nøkkelring under tjenestenavn som
`zed-openai`, `ai.zed.openai`, `zed-anthropic` osv. Du kan hente dem for manuell
import på følgende steder:

**Linux**

```
~/.config/zed/settings.json
```

Delen `language_models` inneholder leverandørkonfigurasjoner. Nøkler som lagres i
nøkkelringen via Zed-grensesnittet, finnes ikke som ren tekst i `settings.json`; hent dem via
et nøkkelringverktøy som GNOME Keyring / Seahorse, eller ved å kjøre:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Nøkkelringoppføringer finnes i **Keychain Access.app** ved å søke etter `zed`.

## Volummonteringsalternativ (avansert)

Du kan eventuelt montere Zed-konfigurasjonskatalogen skrivebeskyttet i containeren.
Dette løser ikke nøkkelringproblemet, men kan være nyttig for fremtidige funksjoner som leser
ikke-hemmelige Zed-konfigurasjonsverdier (f.eks. modellpreferanser).

```yaml
# Utdrag fra docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-vert
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-vert (fjern kommentartegnet for å bruke denne i stedet)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Fremtidig: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Merk: Overstyring via miljøvariabelen `ZED_CONFIG_PATH` er ennå ikke implementert. Dette
utdraget er inkludert som referanse for når funksjonen blir lagt til.

## API for manuell import

Endepunktet for manuell import kan også kalles direkte:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Min Zed OpenAI-nøkkel"   // valgfritt
}
```

Ved vellykket import returneres:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Feilsøking

| Symptom                                    | Årsak                              | Løsning                                  |
| ------------------------------------------ | ---------------------------------- | ---------------------------------------- |
| 422 + `zedDockerEnvironment: true`         | Kjører inne i Docker               | Bruk fanen Manuell tokenimport           |
| 404 + `zedInstalled: false`                | Zed er ikke installert på verten   | Installer Zed eller bruk manuell import  |
| 403 + tilgang til nøkkelring avvist        | Operativsystemet avviste tilgangen | Gi tillatelse i operativsystemets dialog |
| 404 + nøkkelringtjenesten er utilgjengelig | `libsecret` mangler på Linux       | Installer `libsecret-1-dev`              |
