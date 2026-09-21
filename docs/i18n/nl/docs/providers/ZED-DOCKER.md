# Zed IDE Integration in Docker Environments (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Wanneer OmniRoute binnen Docker wordt uitgevoerd, mislukt de standaardprocedure 'Importeren vanuit Zed-sleutelhanger'
omdat de container geen toegang heeft tot de sleutelhangerservice van het hostbesturingssysteem (libsecret op Linux,
Sleutelhanger op macOS, Referentiebeheer op Windows) en de Zed-configuratiemappen op het
bestandssysteem van de host standaard niet zichtbaar zijn in de container.

## Waarom importeren vanuit de sleutelhanger mislukt in Docker

Binnen een container doen zich twee blokkerende problemen voor:

1. **Isolatie van het bestandssysteem** — `isZedInstalled()` zoekt naar `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) of het Windows-equivalent. Deze paden
   bevinden zich op de host en zijn niet beschikbaar tenzij ze expliciet als volume worden gekoppeld.
2. **IPC-isolatie** — Zelfs wanneer de configuratiemap is gekoppeld, communiceert de native
   module `keytar` met de sleutelhangerservice van het besturingssysteem via een Unix-socket of D-Bus-sessie.
   Geen van beide wordt standaard naar de container doorgestuurd, waardoor het lezen van referenties altijd mislukt.

OmniRoute detecteert de Docker-omgeving via twee heuristieken:

- Aanwezigheid van `/.dockerenv` (geschreven door de Docker-daemon wanneer de container wordt gestart).
- De tekenreeks `docker` in `/proc/1/cgroup` (Linux cgroup v1).

Wanneer een van beide heuristieken wordt geactiveerd, retourneert de importroute HTTP 422 met
`zedDockerEnvironment: true` en een bericht dat u naar het tabblad Handmatige tokenimport verwijst.

## Het tabblad Handmatige tokenimport gebruiken

1. Open **Dashboard → Providers → Zed**.
2. Het paneel **Handmatige tokenimport** verschijnt onder de kaart voor het importeren vanuit de sleutelhanger. Wanneer
   OmniRoute Docker detecteert, wordt dit paneel automatisch uitgevouwen na de eerste mislukte
   importpoging vanuit de sleutelhanger.
3. Selecteer de provider in de vervolgkeuzelijst (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter of DeepSeek).
4. Plak de API-sleutel in het wachtwoordveld.
5. Klik op **Importeren**.

De sleutel wordt opgeslagen als een nieuwe providerverbinding met de naam
`Zed Manual Import (<provider>)`.

## Waar Zed API-sleutels op de host opslaat

Zed slaat sleutels van AI-providers op in de sleutelhanger van het besturingssysteem onder servicenamen zoals
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, enzovoort. Zoek op de volgende locaties om ze op te halen voor handmatige
import:

**Linux**

```
~/.config/zed/settings.json
```

De sectie `language_models` bevat providerconfiguraties. Sleutels die via de Zed-interface in de
sleutelhanger zijn opgeslagen, staan niet als platte tekst in `settings.json`; haal ze op met
een sleutelhangerprogramma zoals GNOME Keyring / Seahorse, of door het volgende uit te voeren:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Vermeldingen in de sleutelhanger zijn te vinden in **Keychain Access.app** door te zoeken naar `zed`.

## Optie voor volumekoppeling (geavanceerd)

U kunt de Zed-configuratiemap desgewenst alleen-lezen in de container koppelen.
Dit lost het probleem met de sleutelhanger niet op, maar kan nuttig zijn voor toekomstige functies die
niet-geheime Zed-configuratiewaarden lezen (bijvoorbeeld modelvoorkeuren).

```yaml
# Fragment uit docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-host (maak in plaats daarvan het commentaar ongedaan)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Toekomstig: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Opmerking: ondersteuning voor het overschrijven via de omgevingsvariabele `ZED_CONFIG_PATH` is nog niet geïmplementeerd. Dit
fragment dient als referentie voor wanneer die functie wordt toegevoegd.

## API voor handmatige import

Het eindpunt voor handmatige import kan ook rechtstreeks worden aangeroepen:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // optioneel
}
```

Bij succes retourneert het:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Probleemoplossing

| Symptoom                                    | Oorzaak                                                        | Oplossing                                                  |
| ------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`          | Wordt uitgevoerd in Docker                                     | Gebruik het tabblad Handmatige tokenimport                 |
| 404 + `zedInstalled: false`                 | Zed is niet geïnstalleerd op de host                           | Installeer Zed of gebruik handmatige import                |
| 403 + toegang tot sleutelhanger geweigerd   | Besturingssysteem heeft toegang tot de sleutelhanger geweigerd | Verleen toestemming in de prompt van het besturingssysteem |
| 404 + sleutelhangerservice niet beschikbaar | `libsecret` ontbreekt op Linux                                 | Installeer `libsecret-1-dev`                               |
