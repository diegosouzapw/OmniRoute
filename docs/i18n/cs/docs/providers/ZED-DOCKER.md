# Zed IDE Integration in Docker Environments (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Když OmniRoute běží uvnitř Dockeru, standardní postup „Importovat z klíčenky Zed“ selže,
protože kontejner nemá přístup k démonu klíčenky hostitelského operačního systému (`libsecret` v Linuxu,
Keychain v macOS, Credential Manager ve Windows) a konfigurační adresáře Zed v
souborovém systému hostitele nejsou ve výchozím nastavení uvnitř kontejneru viditelné.

## Proč import z klíčenky v Dockeru selže

Uvnitř kontejneru dochází ke dvěma problémům, které import blokují:

1. **Izolace souborového systému** — `isZedInstalled()` hledá `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) nebo odpovídající cestu ve Windows. Tyto cesty
   se nacházejí na hostiteli a nejsou dostupné, pokud nejsou explicitně připojeny jako svazek.
2. **Izolace IPC** — I když je konfigurační adresář připojen, nativní modul `keytar`
   komunikuje se službou klíčenky operačního systému prostřednictvím unixového socketu nebo relace D-Bus.
   Ani jedno není ve výchozím nastavení zpřístupněno kontejneru, takže načtení přihlašovacích údajů vždy selže.

OmniRoute detekuje prostředí Dockeru pomocí dvou heuristik:

- Přítomnost `/.dockerenv` (zapisuje jej démon Dockeru při spuštění kontejneru).
- Výskyt řetězce `docker` v `/proc/1/cgroup` (Linux cgroup v1).

Když se aktivuje některá z těchto heuristik, trasa importu vrátí HTTP 422 s
`zedDockerEnvironment: true` a zprávou, která vás odkáže na kartu Ruční import tokenu.

## Použití karty Ruční import tokenu

1. Otevřete **Řídicí panel → Poskytovatelé → Zed**.
2. Panel **Ruční import tokenu** se zobrazí pod kartou importu z klíčenky. Když
   OmniRoute detekuje Docker, tento panel se automaticky rozbalí po prvním neúspěšném
   pokusu o import z klíčenky.
3. V rozevíracím seznamu vyberte poskytovatele (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter nebo DeepSeek).
4. Vložte klíč API do pole pro heslo.
5. Klikněte na **Importovat**.

Klíč se uloží jako nové připojení k poskytovateli s názvem
`Zed Manual Import (<provider>)`.

## Kam Zed ukládá klíče API na hostiteli

Zed ukládá klíče poskytovatelů AI do klíčenky operačního systému pod názvy služeb, jako jsou
`zed-openai`, `ai.zed.openai`, `zed-anthropic` atd. Chcete-li je získat pro ruční
import, hledejte v následujících umístěních:

**Linux**

```
~/.config/zed/settings.json
```

Sekce `language_models` obsahuje konfigurace poskytovatelů. Klíče uložené do
klíčenky prostřednictvím uživatelského rozhraní Zed nejsou v `settings.json` uloženy jako prostý text; získejte je pomocí
prohlížeče klíčenky, jako je GNOME Keyring / Seahorse, nebo spuštěním:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Položky klíčenky lze najít v aplikaci **Keychain Access.app** vyhledáním výrazu `zed`.

## Možnost připojení svazku (pokročilé)

Konfigurační adresář Zed můžete volitelně připojit do kontejneru pouze pro čtení.
Tím se problém s klíčenkou nevyřeší, ale může to být užitečné pro budoucí funkce, které budou číst
necitlivé konfigurační hodnoty Zed (např. předvolby modelů).

```yaml
# Výňatek z docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Hostitel s Linuxem
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Hostitel s macOS (místo toho odkomentujte)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Budoucí možnost: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Poznámka: přepsání pomocí proměnné prostředí `ZED_CONFIG_PATH` zatím není implementováno. Tento
výňatek slouží jako reference pro dobu, kdy bude tato funkce přidána.

## API pro ruční import

Koncový bod pro ruční import lze také volat přímo:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Můj klíč OpenAI ze Zed"   // volitelné
}
```

Při úspěchu vrátí:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Řešení problémů

| Příznak                             | Příčina                                     | Řešení                                       |
| ----------------------------------- | ------------------------------------------- | -------------------------------------------- |
| 422 + `zedDockerEnvironment: true`  | Aplikace běží uvnitř Dockeru                | Použijte kartu Ruční import tokenu           |
| 404 + `zedInstalled: false`         | Zed není na hostiteli nainstalován          | Nainstalujte Zed nebo použijte ruční import  |
| 403 + přístup ke klíčence odepřen   | Operační systém odepřel přístup ke klíčence | Udělte oprávnění ve výzvě operačního systému |
| 404 + služba klíčenky není dostupná | V Linuxu chybí `libsecret`                  | Nainstalujte `libsecret-1-dev`               |
