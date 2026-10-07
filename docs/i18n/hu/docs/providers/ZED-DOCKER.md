# Zed IDE Integration in Docker Environments (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Amikor az OmniRoute Dockerben fut, a szabványos „Importálás a Zed kulcstartójából” folyamat sikertelen,
mert a konténer nem éri el a gazda operációs rendszer kulcstartó-démonját (Linuxon a libsecretet,
macOS-en a Keychaint, Windowson pedig a Credential Managert), továbbá a gazdagép fájlrendszerén
található Zed-konfigurációs könyvtárak alapértelmezés szerint nem láthatók a konténerből.

## Miért sikertelen a kulcstartóból történő importálás Dockerben?

Egy konténerben két akadály merül fel:

1. **Fájlrendszer-izoláció** — Az `isZedInstalled()` a `~/.config/zed` (Linux),
   a `~/Library/Application Support/Zed` (macOS), illetve az ezeknek megfelelő Windows-elérési utakat
   keresi. Ezek az elérési utak a gazdagépen találhatók, és csak akkor érhetők el, ha kifejezetten kötetként csatolják őket.
2. **IPC-izoláció** — Még ha a konfigurációs könyvtár csatolva is van, a `keytar` natív
   modul Unix-socketen vagy D-Bus-munkameneten keresztül kommunikál az operációs rendszer kulcstartó-szolgáltatásával.
   Alapértelmezés szerint egyik sincs átvezetve a konténerbe, ezért a hitelesítő adatok beolvasása mindig sikertelen.

Az OmniRoute két heurisztika segítségével észleli a Docker-környezetet:

- A `/.dockerenv` jelenléte (ezt a Docker-démon hozza létre a konténer indításakor).
- A `docker` karakterlánc előfordulása a `/proc/1/cgroup` fájlban (Linux cgroup v1).

Ha bármelyik heurisztika találatot ad, az importálási útvonal HTTP 422 választ ad
`zedDockerEnvironment: true` értékkel és egy üzenettel, amely a Kézi tokenimportálás lapra irányítja.

## A Kézi tokenimportálás lap használata

1. Nyissa meg az **Irányítópult → Szolgáltatók → Zed** oldalt.
2. A **Kézi tokenimportálás** panel a kulcstartóból történő importálás kártyája alatt jelenik meg. Amikor
   az OmniRoute Dockert észlel, ez a panel automatikusan kibomlik az első sikertelen
   kulcstartó-importálási kísérlet után.
3. Válassza ki a szolgáltatót a legördülő listából (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter vagy DeepSeek).
4. Illessze be az API-kulcsot a jelszómezőbe.
5. Kattintson az **Importálás** gombra.

A kulcs új szolgáltatói kapcsolatként, a következő néven lesz elmentve:
`Zed Manual Import (<provider>)`.

## Hol tárolja a Zed az API-kulcsokat a gazdagépen?

A Zed az AI-szolgáltatók kulcsait az operációs rendszer kulcstartójában tárolja, például
`zed-openai`, `ai.zed.openai`, `zed-anthropic` stb. szolgáltatásnevek alatt. A kézi
importáláshoz az alábbi helyeken keresheti meg őket:

**Linux**

```
~/.config/zed/settings.json
```

A `language_models` szakasz tartalmazza a szolgáltatók konfigurációit. A Zed felhasználói felületén keresztül
a kulcstartóba mentett kulcsok nem egyszerű szövegként szerepelnek a `settings.json` fájlban; lekérésükhöz
használjon kulcstartó-megjelenítőt, például a GNOME Keyring / Seahorse alkalmazást, vagy futtassa a következőt:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

A kulcstartó bejegyzései a **Keychain Access.app** alkalmazásban találhatók meg a `zed` kifejezésre keresve.

## Kötetcsatolási lehetőség (haladó)

A Zed konfigurációs könyvtárát opcionálisan csak olvasható kötetként csatolhatja a konténerbe.
Ez nem oldja meg a kulcstartóval kapcsolatos problémát, de hasznos lehet olyan jövőbeli funkciókhoz, amelyek
nem titkos Zed-konfigurációs értékeket olvasnak be (például modellbeállításokat).

```yaml
# docker-compose.yml-részlet
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-gazdagép
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-gazdagép (ehelyett szüntesse meg ennek a megjegyzésjelét)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Jövőbeli lehetőség: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Megjegyzés: a `ZED_CONFIG_PATH` környezeti változóval történő felülbírálás még nincs megvalósítva. Ez a
részlet referenciaként szolgál arra az időre, amikor ez a funkció elérhetővé válik.

## Kézi importálási API

A kézi importálási végpont közvetlenül is meghívható:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Saját Zed OpenAI-kulcs"   // opcionális
}
```

Siker esetén a következő választ adja:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Hibaelhárítás

| Jelenség                                      | Ok                                                                | Megoldás                                              |
| --------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`            | Dockerben fut                                                     | Használja a Kézi tokenimportálás lapot                |
| 404 + `zedInstalled: false`                   | A Zed nincs telepítve a gazdagépen                                | Telepítse a Zedet, vagy használja a kézi importálást  |
| 403 + a kulcstartó-hozzáférés megtagadva      | Az operációs rendszer megtagadta a kulcstartóhoz való hozzáférést | Adja meg az engedélyt az operációs rendszer kérésénél |
| 404 + a kulcstartó-szolgáltatás nem érhető el | A `libsecret` hiányzik Linuxon                                    | Telepítse a `libsecret-1-dev` csomagot                |
