# Zed IDE Integration in Docker Environments (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kai „OmniRoute“ veikia „Docker“ konteineryje, standartinis procesas „Importuoti iš Zed raktinės“ nepavyksta,
nes konteineris negali pasiekti pagrindinės OS raktinės tarnybos (`libsecret` sistemoje „Linux“,
„Keychain“ sistemoje „macOS“, „Credential Manager“ sistemoje „Windows“), o pagrindinio kompiuterio
failų sistemoje esantys „Zed“ konfigūracijos katalogai pagal numatytuosius nustatymus konteineryje nematomi.

## Kodėl raktinės importavimas neveikia „Docker“ konteineryje

Konteineryje kyla dvi esminės problemos:

1. **Failų sistemos izoliacija** — `isZedInstalled()` ieško `~/.config/zed` („Linux“),
   `~/Library/Application Support/Zed` („macOS“) arba atitinkamo „Windows“ kelio. Šie keliai
   yra pagrindiniame kompiuteryje ir nepasiekiami, nebent jie aiškiai prijungiami kaip tomai.
2. **IPC izoliacija** — Net prijungus konfigūracijos katalogą, vietinis `keytar`
   modulis palaiko ryšį su OS raktinės tarnyba per „Unix“ lizdą arba D-Bus seansą.
   Pagal numatytuosius nustatymus nė vienas iš jų nėra susietas su konteineriu, todėl prisijungimo duomenų nuskaitymas visada nepavyksta.

„OmniRoute“ aptinka „Docker“ aplinką naudodama dvi euristikas:

- Yra failas `/.dockerenv` (jį „Docker“ tarnyba sukuria paleisdama konteinerį).
- Eilutė `docker` yra faile `/proc/1/cgroup` („Linux“ cgroup v1).

Kai suveikia kuri nors euristika, importavimo maršrutas grąžina HTTP 422 su
`zedDockerEnvironment: true` ir pranešimu, nukreipiančiu į skirtuką „Rankinis prieigos rakto importavimas“.

## Rankinio prieigos rakto importavimo skirtuko naudojimas

1. Atidarykite **Valdymo skydas → Teikėjai → Zed**.
2. Po raktinės importavimo kortele rodomas skydelis **Rankinis prieigos rakto importavimas**. Kai
   „OmniRoute“ aptinka „Docker“, šis skydelis automatiškai išskleidžiamas po pirmojo nesėkmingo
   bandymo importuoti iš raktinės.
3. Išskleidžiamajame sąraše pasirinkite teikėją („OpenAI“, „Anthropic“, „Google“, „Mistral“, „xAI“,
   „OpenRouter“ arba „DeepSeek“).
4. Į slaptažodžio lauką įklijuokite API raktą.
5. Spustelėkite **Importuoti**.

Raktas išsaugomas kaip naujas teikėjo ryšys, pavadintas
`Zed Manual Import (<provider>)`.

## Kur „Zed“ saugo API raktus pagrindiniame kompiuteryje

„Zed“ saugo DI teikėjų raktus OS raktinėje, naudodama tokius paslaugų pavadinimus kaip
`zed-openai`, `ai.zed.openai`, `zed-anthropic` ir kt. Norėdami juos gauti rankiniam
importavimui, ieškokite čia:

**Linux**

```
~/.config/zed/settings.json
```

Skiltyje `language_models` pateikiamos teikėjų konfigūracijos. Per „Zed“ naudotojo sąsają
raktinėje išsaugoti raktai faile `settings.json` nėra pateikiami atviruoju tekstu; gaukite juos
naudodami raktinės peržiūros programą, pvz., „GNOME Keyring“ / „Seahorse“, arba vykdydami:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Raktinės įrašus galite rasti programoje **Keychain Access.app**, ieškodami `zed`.

## Tomo prijungimo parinktis (išplėstinė)

Pasirinktinai galite prijungti „Zed“ konfigūracijos katalogą prie konteinerio tik skaitymo režimu.
Tai neišsprendžia raktinės problemos, tačiau gali būti naudinga būsimoms funkcijoms, kurios skaitys
neslaptas „Zed“ konfigūracijos reikšmes (pvz., modelių nuostatas).

```yaml
# docker-compose.yml fragmentas
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # „Linux“ pagrindinis kompiuteris
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # „macOS“ pagrindinis kompiuteris (vietoje ankstesnio varianto pašalinkite komentaro ženklą)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Ateityje: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Pastaba: aplinkos kintamojo `ZED_CONFIG_PATH` perrašymas dar neįgyvendintas. Šis
fragmentas pateikiamas kaip nuoroda, kuri bus aktuali pridėjus šią funkciją.

## Rankinio importavimo API

Rankinio importavimo galinį tašką taip pat galima iškviesti tiesiogiai:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Mano „Zed OpenAI“ raktas"   // neprivaloma
}
```

Sėkmės atveju grąžinama:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Trikčių šalinimas

| Požymis                               | Priežastis                                 | Sprendimas                                             |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`    | Veikia „Docker“ konteineryje               | Naudokite rankinio prieigos rakto importavimo skirtuką |
| 404 + `zedInstalled: false`           | „Zed“ neįdiegta pagrindiniame kompiuteryje | Įdiekite „Zed“ arba importuokite rankiniu būdu         |
| 403 + prieiga prie raktinės uždrausta | OS uždraudė prieigą prie raktinės          | Suteikite leidimą OS dialogo lange                     |
| 404 + raktinės paslauga nepasiekiama  | Sistemoje „Linux“ nėra `libsecret`         | Įdiekite `libsecret-1-dev`                             |
