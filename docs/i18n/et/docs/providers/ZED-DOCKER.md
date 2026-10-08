# Zed IDE Integration in Docker Environments (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kui OmniRoute töötab Dockeris, nurjub tavapärane „Impordi Zedi võtmehoidlast” protsess,
sest konteiner ei pääse ligi hosti operatsioonisüsteemi võtmehoidla deemonile (`libsecret` Linuxis,
Keychain macOS-is, Credential Manager Windowsis) ning hosti failisüsteemis asuvad Zedi
konfiguratsioonikataloogid ei ole konteineris vaikimisi nähtavad.

## Miks võtmehoidlast importimine Dockeris nurjub

Konteineris tekib kaks blokeerivat probleemi:

1. **Failisüsteemi isolatsioon** — `isZedInstalled()` otsib kataloogi `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) või Windowsi vastet. Need asukohad
   paiknevad hostis ega ole saadaval, kui neid pole sõnaselgelt köitena ühendatud.
2. **IPC-isolatsioon** — Isegi kui konfiguratsioonikataloog on ühendatud, suhtleb natiivne
   moodul `keytar` operatsioonisüsteemi võtmehoidlateenusega Unixi sokli või D-Busi seansi kaudu.
   Kumbagi ei sillata vaikimisi konteinerisse, mistõttu mandaatide lugemine nurjub alati.

OmniRoute tuvastab Dockeri keskkonna kahe heuristika abil:

- `/.dockerenv` olemasolu (selle kirjutab Dockeri deemon konteineri käivitamisel).
- Stringi `docker` esinemine failis `/proc/1/cgroup` (Linux cgroup v1).

Kui kumbki heuristika rakendub, tagastab impordimarsruut HTTP 422 koos
väärtusega `zedDockerEnvironment: true` ja teatega, mis suunab teid käsitsi tokeni importimise vahekaardile.

## Käsitsi tokeni importimise vahekaardi kasutamine

1. Avage **Töölaud → Pakkujad → Zed**.
2. Paneel **Käsitsi tokeni importimine** kuvatakse võtmehoidlast importimise kaardi all. Kui
   OmniRoute tuvastab Dockeri, laiendatakse see paneel automaatselt pärast esimest nurjunud
   võtmehoidlast importimise katset.
3. Valige rippmenüüst pakkuja (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter või DeepSeek).
4. Kleepige API-võti parooliväljale.
5. Klõpsake **Impordi**.

Võti salvestatakse uue pakkujaühendusena nimega
`Zed Manual Import (<provider>)`.

## Kus Zed hostis API-võtmeid talletab

Zed talletab AI-pakkujate võtmeid operatsioonisüsteemi võtmehoidlas selliste teenusenimede all nagu
`zed-openai`, `ai.zed.openai`, `zed-anthropic` jne. Nende hankimiseks käsitsi
importimise jaoks vaadake järgmisi asukohti:

**Linux**

```
~/.config/zed/settings.json
```

Jaotis `language_models` sisaldab pakkujate konfiguratsioone. Zedi kasutajaliidese kaudu
võtmehoidlasse salvestatud võtmed ei ole failis `settings.json` lihttekstina; hankige need
võtmehoidla vaaturi, näiteks GNOME Keyringi / Seahorse'i kaudu, või käivitage:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Võtmehoidla kirjed leiate rakendusest **Keychain Access.app**, otsides sõna `zed`.

## Köitena ühendamise võimalus (edasijõudnutele)

Soovi korral saate ühendada Zedi konfiguratsioonikataloogi kirjutuskaitstud köitena konteinerisse.
See ei lahenda võtmehoidla probleemi, kuid võib olla kasulik tulevaste funktsioonide jaoks, mis loevad
Zedi mittesalajasi konfiguratsiooniväärtusi (nt mudelieelistusi).

```yaml
# docker-compose.yml-i väljavõte
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linuxi host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-i host (eemaldage sellelt realt kommentaarimärk)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Tulevikus: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Märkus: keskkonnamuutuja `ZED_CONFIG_PATH` kaudu määratav asendus pole veel rakendatud. See
väljavõte on esitatud viitena ajaks, mil see funktsioon lisatakse.

## Käsitsi importimise API

Käsitsi importimise lõpp-punkti saab kutsuda ka otse:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Minu Zedi OpenAI võti"   // valikuline
}
```

Õnnestumise korral tagastatakse:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Tõrkeotsing

| Sümptom                                 | Põhjus                                               | Lahendus                                        |
| --------------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| 422 + `zedDockerEnvironment: true`      | Töötab Dockeris                                      | Kasutage käsitsi tokeni importimise vahekaarti  |
| 404 + `zedInstalled: false`             | Zed pole hosti installitud                           | Installige Zed või kasutage käsitsi importimist |
| 403 + juurdepääs võtmehoidlale keelatud | Operatsioonisüsteem keelas juurdepääsu võtmehoidlale | Andke operatsioonisüsteemi viibas luba          |
| 404 + võtmehoidlateenus pole saadaval   | `libsecret` puudub Linuxis                           | Installige `libsecret-1-dev`                    |
