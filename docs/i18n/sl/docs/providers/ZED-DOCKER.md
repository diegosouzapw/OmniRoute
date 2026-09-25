# Zed IDE Integration in Docker Environments (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Ko OmniRoute deluje znotraj Dockerja, standardni postopek »Uvoz iz shrambe ključev Zed« ne uspe,
ker vsebnik ne more dostopati do demona shrambe ključev gostiteljskega operacijskega sistema (`libsecret` v Linuxu,
Keychain v sistemu macOS, Credential Manager v sistemu Windows), imeniki s konfiguracijo Zed v
datotečnem sistemu gostitelja pa privzeto niso vidni znotraj vsebnika.

## Zakaj uvoz iz shrambe ključev v Dockerju ne uspe

Znotraj vsebnika se pojavita dve težavi, ki preprečujeta uvoz:

1. **Izolacija datotečnega sistema** — `isZedInstalled()` išče `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) ali ustrezno pot v sistemu Windows. Te poti
   so na gostitelju in niso na voljo, razen če so izrecno priklopljene kot nosilci.
2. **Izolacija IPC** — Tudi ko je konfiguracijski imenik priklopljen, izvorni
   modul `keytar` komunicira s storitvijo shrambe ključev operacijskega sistema prek vtičnice Unix ali seje D-Bus.
   Nobena od njiju privzeto ni povezana z vsebnikom, zato branje poverilnic vedno ne uspe.

OmniRoute zazna okolje Docker z dvema hevristikama:

- Prisotnost `/.dockerenv` (zapiše ga demon Docker ob zagonu vsebnika).
- Niz `docker` v `/proc/1/cgroup` (Linux cgroup v1).

Ko se sproži katera koli od teh hevristik, uvozna pot vrne HTTP 422 z
`zedDockerEnvironment: true` in sporočilom, ki vas usmeri na zavihek Ročni uvoz žetona.

## Uporaba zavihka Ročni uvoz žetona

1. Odprite **Nadzorna plošča → Ponudniki → Zed**.
2. Pod kartico za uvoz iz shrambe ključev se prikaže plošča **Ročni uvoz žetona**. Ko
   OmniRoute zazna Docker, se ta plošča samodejno razširi po prvem neuspelem
   poskusu uvoza iz shrambe ključev.
3. Na spustnem seznamu izberite ponudnika (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ali DeepSeek).
4. Prilepite ključ API v polje za geslo.
5. Kliknite **Uvozi**.

Ključ se shrani kot nova povezava s ponudnikom z imenom
`Zed Manual Import (<provider>)`.

## Kje Zed shranjuje ključe API na gostitelju

Zed shranjuje ključe ponudnikov umetne inteligence v shrambi ključev operacijskega sistema pod imeni storitev, kot so
`zed-openai`, `ai.zed.openai`, `zed-anthropic` itd. Za ročni
uvoz jih poiščite tukaj:

**Linux**

```
~/.config/zed/settings.json
```

Razdelek `language_models` vsebuje konfiguracije ponudnikov. Ključi, shranjeni v
shrambo ključev prek uporabniškega vmesnika Zed, niso v obliki navadnega besedila v `settings.json`; pridobite jih z
orodjem za pregledovanje shrambe ključev, kot je GNOME Keyring / Seahorse, ali tako, da zaženete:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Vnose shrambe ključev lahko najdete v aplikaciji **Keychain Access.app** tako, da poiščete `zed`.

## Možnost priklopa nosilca (napredno)

Konfiguracijski imenik Zed lahko po želji priklopite v vsebnik samo za branje.
To ne odpravi težave s shrambo ključev, lahko pa je koristno za prihodnje funkcije, ki berejo
neskrivne konfiguracijske vrednosti Zed (npr. nastavitve modelov).

```yaml
# Izsek datoteke docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Gostitelj Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Gostitelj macOS (namesto tega odstranite oznako za komentar)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # V prihodnje: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Opomba: preglasitev s spremenljivko okolja `ZED_CONFIG_PATH` še ni implementirana. Ta
izsek je naveden kot referenca za čas, ko bo ta funkcija dodana.

## API za ročni uvoz

Končno točko za ročni uvoz lahko pokličete tudi neposredno:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Moj ključ Zed OpenAI"   // izbirno
}
```

Ob uspehu vrne:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Odpravljanje težav

| Simptom                                    | Vzrok                                                   | Rešitev                                        |
| ------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------- |
| 422 + `zedDockerEnvironment: true`         | Izvajanje znotraj Dockerja                              | Uporabite zavihek Ročni uvoz žetona            |
| 404 + `zedInstalled: false`                | Zed ni nameščen na gostitelju                           | Namestite Zed ali uporabite ročni uvoz         |
| 403 + dostop do shrambe ključev zavrnjen   | Operacijski sistem je zavrnil dostop do shrambe ključev | Dovolite dostop v pozivu operacijskega sistema |
| 404 + storitev shrambe ključev ni na voljo | `libsecret` manjka v Linuxu                             | Namestite `libsecret-1-dev`                    |
