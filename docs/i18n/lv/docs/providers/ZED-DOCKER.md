# Zed IDE Integration in Docker Environments (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kad OmniRoute darbojas Docker vidē, standarta plūsma “Importēt no Zed atslēgu saišķa” neizdodas,
jo konteiners nevar piekļūt resursdatora operētājsistēmas atslēgu saišķa dēmonam (`libsecret` Linux vidē,
Keychain macOS vidē, Credential Manager Windows vidē), un Zed konfigurācijas direktoriji
resursdatora failu sistēmā pēc noklusējuma nav redzami konteinerā.

## Kāpēc atslēgu saišķa importēšana Docker vidē neizdodas

Konteinerā rodas divas bloķējošas problēmas:

1. **Failu sistēmas izolācija** — `isZedInstalled()` meklē `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) vai Windows ekvivalentu. Šie ceļi
   atrodas resursdatorā un nav pieejami, ja vien tie nav tieši piemontēti kā sējumi.
2. **IPC izolācija** — Pat tad, ja konfigurācijas direktorijs ir piemontēts, vietējais
   `keytar` modulis sazinās ar operētājsistēmas atslēgu saišķa pakalpojumu, izmantojot Unix ligzdu vai D-Bus sesiju.
   Pēc noklusējuma neviens no tiem nav savienots ar konteineru, tādēļ akreditācijas datu nolasīšana vienmēr neizdodas.

OmniRoute nosaka Docker vidi, izmantojot divas heiristikas:

- `/.dockerenv` esamība (Docker dēmons to izveido konteinera palaišanas laikā).
- Virkne `docker` failā `/proc/1/cgroup` (Linux cgroup v1).

Ja nostrādā kāda no heiristikām, importēšanas maršruts atgriež HTTP 422 ar
`zedDockerEnvironment: true` un ziņojumu, kas norāda izmantot cilni Manuāla pilnvaras importēšana.

## Manuālās pilnvaras importēšanas cilnes izmantošana

1. Atveriet **Informācijas panelis → Pakalpojumu sniedzēji → Zed**.
2. Zem atslēgu saišķa importēšanas kartītes tiek parādīts panelis **Manuāla pilnvaras importēšana**. Kad
   OmniRoute nosaka Docker vidi, šis panelis tiek automātiski izvērsts pēc pirmā neveiksmīgā
   atslēgu saišķa importēšanas mēģinājuma.
3. Nolaižamajā sarakstā atlasiet pakalpojumu sniedzēju (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter vai DeepSeek).
4. Ielīmējiet API atslēgu paroles laukā.
5. Noklikšķiniet uz **Importēt**.

Atslēga tiek saglabāta kā jauns savienojums ar pakalpojumu sniedzēju un nosaukumu
`Zed Manual Import (<provider>)`.

## Kur Zed resursdatorā glabā API atslēgas

Zed glabā MI pakalpojumu sniedzēju atslēgas operētājsistēmas atslēgu saišķī ar tādiem pakalpojumu nosaukumiem kā
`zed-openai`, `ai.zed.openai`, `zed-anthropic` u.c. Lai tās izgūtu manuālai
importēšanai, skatiet:

**Linux**

```
~/.config/zed/settings.json
```

Sadaļā `language_models` ir pakalpojumu sniedzēju konfigurācijas. Atslēgas, kas saglabātas
atslēgu saišķī, izmantojot Zed lietotāja saskarni, failā `settings.json` nav pieejamas kā vienkāršs teksts; izgūstiet tās,
izmantojot tādu atslēgu saišķa skatītāju kā GNOME Keyring / Seahorse vai izpildot:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Atslēgu saišķa ierakstus var atrast lietotnē **Keychain Access.app**, meklējot `zed`.

## Sējuma montēšanas iespēja (papildu)

Varat pēc izvēles piemontēt Zed konfigurācijas direktoriju konteinerā tikai lasīšanas režīmā.
Tas neatrisina atslēgu saišķa problēmu, taču var būt noderīgi nākotnes funkcijām, kas nolasa
neslepenas Zed konfigurācijas vērtības (piemēram, modeļu preferences).

```yaml
# docker-compose.yml fragments
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux resursdators
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS resursdators (tā vietā noņemiet komentāra atzīmi)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Nākotnē: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Piezīme: pārrakstīšana ar vides mainīgo `ZED_CONFIG_PATH` vēl nav ieviesta. Šis
fragments ir sniegts kā atsauce laikam, kad šī funkcija tiks pievienota.

## Manuālās importēšanas API

Manuālās importēšanas galapunktu var izsaukt arī tieši:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // neobligāts
}
```

Veiksmīgas izpildes gadījumā tas atgriež:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Problēmu novēršana

| Simptoms                                      | Cēlonis                            | Risinājums                                          |
| --------------------------------------------- | ---------------------------------- | --------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`            | Darbojas Docker vidē               | Izmantojiet Manuālās pilnvaras importēšanas cilni   |
| 404 + `zedInstalled: false`                   | Zed nav instalēts resursdatorā     | Instalējiet Zed vai izmantojiet manuālo importēšanu |
| 403 + piekļuve atslēgu saišķim liegta         | OS liedza piekļuvi atslēgu saišķim | Piešķiriet atļauju OS uzvednē                       |
| 404 + atslēgu saišķa pakalpojums nav pieejams | Linux vidē trūkst `libsecret`      | Instalējiet `libsecret-1-dev`                       |
