# Zed IDE Integration in Docker Environments (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

När OmniRoute körs inuti Docker misslyckas standardflödet ”Importera från Zed-nyckelringen”
eftersom containern inte kan nå värdoperativsystemets nyckelringsdemon (libsecret på Linux,
Keychain på macOS, Credential Manager på Windows) och Zeds konfigurationskataloger på
värdfilsystemet inte är synliga inuti containern som standard.

## Varför import från nyckelringen misslyckas i Docker

Två blockerande problem uppstår inuti en container:

1. **Filsystemsisolering** — `isZedInstalled()` letar efter `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) eller motsvarande sökväg i Windows. Dessa sökvägar
   finns på värden och är inte tillgängliga om de inte uttryckligen monteras som volymer.
2. **IPC-isolering** — Även när konfigurationskatalogen är monterad kommunicerar den inbyggda
   modulen `keytar` med operativsystemets nyckelringstjänst via en Unix-socket eller D-Bus-session.
   Ingen av dessa bryggas som standard till containern, vilket innebär att läsning av autentiseringsuppgifter alltid misslyckas.

OmniRoute identifierar Docker-miljön med hjälp av två heuristiker:

- Förekomst av `/.dockerenv` (skrivs av Docker-demonen när containern startas).
- Strängen `docker` förekommer i `/proc/1/cgroup` (Linux cgroup v1).

När någon av heuristikerna utlöses returnerar importrutten HTTP 422 med
`zedDockerEnvironment: true` och ett meddelande som hänvisar dig till fliken Manuell tokenimport.

## Använda fliken Manuell tokenimport

1. Öppna **Instrumentpanel → Leverantörer → Zed**.
2. Panelen **Manuell tokenimport** visas under kortet för import från nyckelringen. När
   OmniRoute identifierar Docker expanderas panelen automatiskt efter det första misslyckade
   försöket att importera från nyckelringen.
3. Välj leverantör i listrutan (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter eller DeepSeek).
4. Klistra in API-nyckeln i lösenordsfältet.
5. Klicka på **Importera**.

Nyckeln sparas som en ny leverantörsanslutning med namnet
`Zed Manual Import (<provider>)`.

## Var Zed lagrar API-nycklar på värden

Zed lagrar nycklar för AI-leverantörer i operativsystemets nyckelring under tjänstenamn som
`zed-openai`, `ai.zed.openai`, `zed-anthropic` osv. För att hämta dem för manuell
import letar du på följande platser:

**Linux**

```
~/.config/zed/settings.json
```

Avsnittet `language_models` innehåller leverantörskonfigurationer. Nycklar som sparats i
nyckelringen via Zeds användargränssnitt lagras inte som klartext i `settings.json`; hämta dem med
en nyckelringsvisare som GNOME Keyring / Seahorse eller genom att köra:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Poster i nyckelringen kan hittas i **Keychain Access.app** genom att söka efter `zed`.

## Alternativ med volymmontering (avancerat)

Du kan valfritt montera Zeds konfigurationskatalog skrivskyddat i containern.
Detta löser inte problemet med nyckelringen men kan vara användbart för framtida funktioner som läser
icke-hemliga konfigurationsvärden från Zed (t.ex. modellinställningar).

```yaml
# Utdrag ur docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-värd
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-värd (avkommentera i stället)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Framtida: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Obs! Möjligheten att åsidosätta med miljövariabeln `ZED_CONFIG_PATH` är ännu inte implementerad. Detta
utdrag tillhandahålls som referens tills funktionen har lagts till.

## API för manuell import

Slutpunkten för manuell import kan även anropas direkt:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Min Zed OpenAI-nyckel"   // valfritt
}
```

Vid lyckat resultat returneras:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Felsökning

| Symptom                                       | Orsak                                             | Åtgärd                                            |
| --------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`            | Körs inuti Docker                                 | Använd fliken Manuell tokenimport                 |
| 404 + `zedInstalled: false`                   | Zed är inte installerat på värden                 | Installera Zed eller använd manuell import        |
| 403 + åtkomst till nyckelringen nekad         | Operativsystemet nekade åtkomst till nyckelringen | Bevilja behörighet i operativsystemets dialogruta |
| 404 + nyckelringstjänsten är inte tillgänglig | `libsecret` saknas i Linux                        | Installera `libsecret-1-dev`                      |
