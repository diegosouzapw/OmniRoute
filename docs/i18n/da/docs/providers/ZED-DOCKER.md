# Zed IDE Integration in Docker Environments (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Når OmniRoute kører inde i Docker, mislykkes standardprocessen "Importér fra Zed-nøglering",
fordi containeren ikke kan få adgang til værtsoperativsystemets nøgleringstjeneste (`libsecret` på Linux,
Keychain på macOS og Credential Manager på Windows), og Zeds konfigurationsmapper på
værtens filsystem er som standard ikke synlige inde i containeren.

## Hvorfor import fra nøgleringen mislykkes i Docker

Der opstår to blokerende problemer inde i en container:

1. **Filsystemisolering** — `isZedInstalled()` leder efter `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) eller den tilsvarende sti i Windows. Disse stier
   findes på værten og er ikke tilgængelige, medmindre de eksplicit monteres som diskenheder.
2. **IPC-isolering** — Selv når konfigurationsmappen er monteret, kommunikerer det indbyggede
   `keytar`-modul med operativsystemets nøgleringstjeneste via en Unix-socket eller en D-Bus-session.
   Ingen af delene forbindes som standard til containeren, så læsning af legitimationsoplysninger mislykkes altid.

OmniRoute registrerer Docker-miljøet via to heuristikker:

- Tilstedeværelsen af `/.dockerenv` (oprettet af Docker-daemonen, når containeren startes).
- Strengen `docker` i `/proc/1/cgroup` (Linux cgroup v1).

Når en af heuristikkerne udløses, returnerer importruten HTTP 422 med
`zedDockerEnvironment: true` og en meddelelse, der henviser til fanen Manuel tokenimport.

## Brug af fanen Manuel tokenimport

1. Åbn **Kontrolpanel → Udbydere → Zed**.
2. Panelet **Manuel tokenimport** vises under kortet til import fra nøgleringen. Når
   OmniRoute registrerer Docker, udvides panelet automatisk efter det første mislykkede
   forsøg på import fra nøgleringen.
3. Vælg udbyderen i rullemenuen (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter eller DeepSeek).
4. Indsæt API-nøglen i adgangskodefeltet.
5. Klik på **Importér**.

Nøglen gemmes som en ny udbyderforbindelse med navnet
`Zed Manual Import (<provider>)`.

## Hvor Zed gemmer API-nøgler på værten

Zed gemmer AI-udbydernøgler i operativsystemets nøglering under tjenestenavne såsom
`zed-openai`, `ai.zed.openai`, `zed-anthropic` osv. Du kan hente dem til manuel
import her:

**Linux**

```
~/.config/zed/settings.json
```

Afsnittet `language_models` indeholder udbyderkonfigurationer. Nøgler, der er gemt i
nøgleringen via Zeds brugergrænseflade, står ikke i klartekst i `settings.json`; hent dem via
en nøgleringsfremviser såsom GNOME Keyring / Seahorse eller ved at køre:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Poster i nøgleringen kan findes i **Keychain Access.app** ved at søge efter `zed`.

## Mulighed for diskenhedsmontering (avanceret)

Du kan valgfrit montere Zeds konfigurationsmappe skrivebeskyttet i containeren.
Dette løser ikke problemet med nøgleringen, men kan være nyttigt til fremtidige funktioner, som læser
ikke-hemmelige Zed-konfigurationsværdier (f.eks. modelpræferencer).

```yaml
# Uddrag fra docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-vært
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-vært (fjern kommentaren til denne i stedet)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Fremtidigt: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Bemærk: Tilsidesættelse via miljøvariablen `ZED_CONFIG_PATH` er endnu ikke implementeret. Dette
uddrag er angivet som reference til, når funktionen tilføjes.

## API til manuel import

Slutpunktet til manuel import kan også kaldes direkte:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Min Zed OpenAI-nøgle"   // valgfrit
}
```

Ved succes returnerer det:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Fejlfinding

| Symptom                               | Årsag                             | Løsning                                   |
| ------------------------------------- | --------------------------------- | ----------------------------------------- |
| 422 + `zedDockerEnvironment: true`    | Kører inde i Docker               | Brug fanen Manuel tokenimport             |
| 404 + `zedInstalled: false`           | Zed er ikke installeret på værten | Installér Zed, eller brug manuel import   |
| 403 + adgang til nøglering afvist     | Operativsystemet afviste adgangen | Giv tilladelse i operativsystemets dialog |
| 404 + nøgleringstjeneste utilgængelig | `libsecret` mangler på Linux      | Installér `libsecret-1-dev`               |
