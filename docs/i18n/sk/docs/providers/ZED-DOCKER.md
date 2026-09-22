# Zed IDE Integration in Docker Environments (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Keď OmniRoute beží v Dockeri, štandardný postup „Importovať z kľúčenky Zed“ zlyhá,
pretože kontajner nemá prístup k démonovi kľúčenky hostiteľského OS (`libsecret` v Linuxe,
Keychain v macOS, Credential Manager vo Windowse) a konfiguračné adresáre Zed v
súborovom systéme hostiteľa nie sú predvolene viditeľné v kontajneri.

## Prečo import z kľúčenky v Dockeri zlyháva

V kontajneri dochádza k dvom blokujúcim problémom:

1. **Izolácia súborového systému** — `isZedInstalled()` hľadá `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) alebo ekvivalent vo Windowse. Tieto cesty
   sa nachádzajú na hostiteľovi a nie sú dostupné, pokiaľ nie sú explicitne pripojené ako zväzok.
2. **Izolácia IPC** — Aj keď je konfiguračný adresár pripojený, natívny modul `keytar`
   komunikuje so službou kľúčenky OS prostredníctvom unixového soketu alebo relácie D-Bus.
   Ani jedno z nich nie je predvolene premostené do kontajnera, takže čítanie prihlasovacích údajov vždy zlyhá.

OmniRoute zisťuje prostredie Docker pomocou dvoch heuristík:

- Prítomnosť `/.dockerenv` (vytvoreného démonom Docker pri spustení kontajnera).
- Výskyt reťazca `docker` v `/proc/1/cgroup` (Linux cgroup v1).

Keď sa aktivuje ktorákoľvek heuristika, trasa importu vráti HTTP 422 s
`zedDockerEnvironment: true` a správou, ktorá vás nasmeruje na kartu Manuálny import tokenu.

## Použitie karty Manuálny import tokenu

1. Otvorte **Dashboard → Poskytovatelia → Zed**.
2. Panel **Manuálny import tokenu** sa zobrazí pod kartou importu z kľúčenky. Keď
   OmniRoute zistí Docker, tento panel sa automaticky rozbalí po prvom neúspešnom
   pokuse o import z kľúčenky.
3. Z rozbaľovacej ponuky vyberte poskytovateľa (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter alebo DeepSeek).
4. Vložte kľúč API do poľa pre heslo.
5. Kliknite na **Importovať**.

Kľúč sa uloží ako nové pripojenie poskytovateľa s názvom
`Zed Manual Import (<provider>)`.

## Kde Zed ukladá kľúče API na hostiteľovi

Zed ukladá kľúče poskytovateľov AI do kľúčenky OS pod názvami služieb, ako sú
`zed-openai`, `ai.zed.openai`, `zed-anthropic` atď. Ak ich chcete získať na manuálny
import, pozrite sa sem:

**Linux**

```
~/.config/zed/settings.json
```

Sekcia `language_models` obsahuje konfigurácie poskytovateľov. Kľúče uložené do
kľúčenky prostredníctvom používateľského rozhrania Zed sa v `settings.json` nenachádzajú ako obyčajný text; získajte ich
pomocou prehliadača kľúčenky, ako je GNOME Keyring / Seahorse, alebo spustením:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Položky kľúčenky nájdete v aplikácii **Keychain Access.app** vyhľadaním výrazu `zed`.

## Možnosť pripojenia zväzku (pre pokročilých)

Konfiguračný adresár Zed môžete voliteľne pripojiť ku kontajneru iba na čítanie.
Nevyrieši to problém s kľúčenkou, ale môže to byť užitočné pre budúce funkcie, ktoré čítajú
verejné konfiguračné hodnoty Zed (napr. preferencie modelov).

```yaml
# Výňatok zo súboru docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Hostiteľ s Linuxom
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Hostiteľ s macOS (namiesto toho odkomentujte)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # V budúcnosti: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Poznámka: prepísanie pomocou premennej prostredia `ZED_CONFIG_PATH` zatiaľ nie je implementované. Tento
výňatok slúži ako referencia pre prípad, keď bude táto funkcia pridaná.

## API manuálneho importu

Koncový bod manuálneho importu možno zavolať aj priamo:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Môj kľúč Zed OpenAI"   // voliteľné
}
```

Pri úspechu vráti:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Riešenie problémov

| Príznak                               | Príčina                                 | Riešenie                                       |
| ------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| 422 + `zedDockerEnvironment: true`    | Spustenie v Dockeri                     | Použite kartu Manuálny import tokenu           |
| 404 + `zedInstalled: false`           | Zed nie je nainštalovaný na hostiteľovi | Nainštalujte Zed alebo použite manuálny import |
| 403 + prístup ku kľúčenke zamietnutý  | OS zamietol prístup ku kľúčenke         | Udeľte povolenie vo výzve OS                   |
| 404 + služba kľúčenky nie je dostupná | V Linuxe chýba `libsecret`              | Nainštalujte `libsecret-1-dev`                 |
