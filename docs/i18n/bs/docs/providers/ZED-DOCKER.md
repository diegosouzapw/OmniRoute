# ZED-DOCKER (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

# Integracija Zed IDE-a u Docker okruženjima

Kada se OmniRoute pokreće unutar Dockera, standardni tok "Uvoz iz Zed privjeska ključeva" (Import from Zed Keychain) ne uspijeva jer kontejner ne može pristupiti demonu privjeska ključeva host OS-a (libsecret na Linuxu, Keychain na macOS-u, Credential Manager na Windowsu), a Zed konfiguracijski direktoriji na host datotečnom sistemu nisu vidljivi unutar kontejnera po zadanim postavkama.

## Zašto uvoz iz privjeska ključeva ne uspijeva u Dockeru

Unutar kontejnera se javljaju dva blokirajuća problema:

1. **Izolacija datotečnog sistema** — `isZedInstalled()` traži `~/.config/zed` (Linux), `~/Library/Application Support/Zed` (macOS) ili ekvivalent na Windowsu. Ove putanje se nalaze na hostu i nisu dostupne osim ako se eksplicitno ne montiraju kao volume.
2. **IPC izolacija** — Čak i kada je konfiguracijski direktorij montiran, `keytar` izvorni modul komunicira sa servisom privjeska ključeva OS-a putem Unix socketa ili D-Bus sesije. Nijedan od njih nije premošten u kontejner po zadanim postavkama, pa čitanje vjerodajnica uvijek ne uspijeva.

OmniRoute detektuje Docker okruženje putem dvije heuristike:

- Prisustvo `/.dockerenv` (zapisuje Docker demon pri pokretanju kontejnera).
- String `docker` koji se pojavljuje u `/proc/1/cgroup` (Linux cgroup v1).

Kada se bilo koja od ovih heuristika aktivira, ruta za uvoz vraća HTTP 422 sa `zedDockerEnvironment: true` i porukom koja vas usmjerava na karticu Ručni uvoz tokena (Manual Token Import).

## Korištenje kartice Ručni uvoz tokena

1. Otvorite **Dashboard → Providers → Zed**.
2. Panel **Manual Token Import** se pojavljuje ispod kartice za uvoz iz privjeska ključeva. Kada OmniRoute detektuje Docker, ovaj panel se automatski proširuje nakon prvog neuspjelog pokušaja uvoza iz privjeska ključeva.
3. Odaberite provajdera iz padajućeg menija (OpenAI, Anthropic, Google, Mistral, xAI, OpenRouter ili DeepSeek).
4. Zalijepite API ključ u polje za lozinku.
5. Kliknite **Import**.

Ključ se sprema kao nova konekcija provajdera pod nazivom `Zed Manual Import (<provider>)`.

## Gdje Zed pohranjuje API ključeve na hostu

Zed pohranjuje ključeve AI provajdera u privjesak ključeva OS-a pod nazivima servisa kao što su `zed-openai`, `ai.zed.openai`, `zed-anthropic` itd. Da biste ih dohvatili za ručni uvoz, pogledajte u:

**Linux**

```
~/.config/zed/settings.json
```

Sekcija `language_models` sadrži konfiguracije provajdera. Ključevi spremljeni u privjesak ključeva putem Zed UI-a nisu u čistom tekstu u `settings.json`; dohvatite ih putem preglednika privjeska ključeva kao što je GNOME Keyring / Seahorse ili pokretanjem:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Unosi u privjesku ključeva se mogu pronaći u **Keychain Access.app** pretragom za `zed`.

## Opcija montiranja volumena (Napredno)

Opciono možete montirati Zed konfiguracijski direktorij kao "samo za čitanje" (read-only) u kontejner. Ovo ne rješava problem s privjeskom ključeva, ali može biti korisno za buduće funkcije koje čitaju ne-tajne Zed konfiguracijske vrijednosti (npr. postavke modela).

```yaml
# isječak docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (umjesto toga odkomentirajte)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Budućnost: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Napomena: nadjačavanje varijable okruženja `ZED_CONFIG_PATH` još nije implementirano. Ovaj isječak je dat kao referenca za kada ta funkcija bude dodana.

## API za ručni uvoz

Endpoint za ručni uvoz se također može pozvati direktno:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // opcionalno
}
```

U slučaju uspjeha vraća:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Rješavanje problema

| Simptom                              | Uzrok                                  | Rješenje                                  |
| ------------------------------------ | -------------------------------------- | ----------------------------------------- |
| 422 + `zedDockerEnvironment: true`   | Pokretanje unutar Dockera              | Koristite karticu Ručni uvoz tokena       |
| 404 + `zedInstalled: false`          | Zed nije instaliran na hostu           | Instalirajte Zed ili koristite ručni uvoz |
| 403 + keychain access denied         | OS je odbio pristup privjesku ključeva | Odobrite dozvolu u OS upitu               |
| 404 + keychain service not available | `libsecret` nedostaje na Linuxu        | Instalirajte `libsecret-1-dev`            |
