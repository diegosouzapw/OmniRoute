# Zed IDE Integration in Docker Environments (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Când OmniRoute rulează în Docker, fluxul standard „Import from Zed Keychain” eșuează
deoarece containerul nu poate accesa daemonul pentru lanțul de chei al sistemului de operare gazdă (`libsecret` pe Linux,
Keychain pe macOS, Credential Manager pe Windows), iar directoarele de configurare Zed din
sistemul de fișiere gazdă nu sunt vizibile implicit în interiorul containerului.

## De ce eșuează importul din lanțul de chei în Docker

În interiorul unui container apar două probleme care blochează procesul:

1. **Izolarea sistemului de fișiere** — `isZedInstalled()` caută `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) sau echivalentul pentru Windows. Aceste căi
   se află pe gazdă și nu sunt disponibile decât dacă sunt montate explicit ca volume.
2. **Izolarea IPC** — Chiar și atunci când directorul de configurare este montat, modulul nativ
   `keytar` comunică cu serviciul de gestionare a lanțului de chei al sistemului de operare printr-un socket Unix sau o sesiune D-Bus.
   Niciunul dintre acestea nu este conectat implicit la container, astfel încât citirea acreditărilor eșuează întotdeauna.

OmniRoute detectează mediul Docker folosind două metode euristice:

- Prezența fișierului `/.dockerenv` (scris de daemonul Docker la pornirea containerului).
- Apariția șirului `docker` în `/proc/1/cgroup` (Linux cgroup v1).

Când se activează oricare dintre aceste metode euristice, ruta de import returnează HTTP 422 cu
`zedDockerEnvironment: true` și un mesaj care vă direcționează către fila Manual Token Import.

## Utilizarea filei Manual Token Import

1. Deschideți **Dashboard → Providers → Zed**.
2. Panoul **Manual Token Import** apare sub cardul pentru importul din lanțul de chei. Când
   OmniRoute detectează Docker, acest panou se extinde automat după prima încercare eșuată
   de import din lanțul de chei.
3. Selectați furnizorul din lista derulantă (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter sau DeepSeek).
4. Lipiți cheia API în câmpul pentru parolă.
5. Faceți clic pe **Import**.

Cheia este salvată ca o nouă conexiune la furnizor, cu numele
`Zed Manual Import (<provider>)`.

## Unde stochează Zed cheile API pe gazdă

Zed stochează cheile furnizorilor AI în lanțul de chei al sistemului de operare, sub nume de servicii precum
`zed-openai`, `ai.zed.openai`, `zed-anthropic` etc. Pentru a le prelua în vederea importului
manual, căutați în:

**Linux**

```
~/.config/zed/settings.json
```

Secțiunea `language_models` conține configurațiile furnizorilor. Cheile salvate în
lanțul de chei prin interfața Zed nu se află în text clar în `settings.json`; preluați-le folosind
un utilitar de vizualizare a lanțului de chei, precum GNOME Keyring / Seahorse, sau rulând:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Intrările din lanțul de chei pot fi găsite în **Keychain Access.app** căutând `zed`.

## Opțiunea de montare ca volum (avansat)

Opțional, puteți monta în mod doar în citire directorul de configurare Zed în container.
Acest lucru nu rezolvă problema lanțului de chei, dar poate fi util pentru funcționalități viitoare care citesc
valori de configurare Zed fără caracter secret (de exemplu, preferințele privind modelele).

```yaml
# Fragment din docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Gazdă Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Gazdă macOS (eliminați comentariul pentru a folosi această variantă)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # În viitor: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Notă: suprascrierea prin variabila de mediu `ZED_CONFIG_PATH` nu este încă implementată. Acest
fragment este furnizat ca referință pentru momentul în care va fi adăugată funcționalitatea.

## API-ul pentru import manual

Endpoint-ul pentru import manual poate fi apelat și direct:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Cheia mea Zed OpenAI"   // opțional
}
```

În caz de succes, acesta returnează:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Depanare

| Simptom                                                  | Cauză                                                   | Remediere                                                 |
| -------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`                       | Rulare în interiorul Docker                             | Utilizați fila Manual Token Import                        |
| 404 + `zedInstalled: false`                              | Zed nu este instalat pe gazdă                           | Instalați Zed sau utilizați importul manual               |
| 403 + acces refuzat la lanțul de chei                    | Sistemul de operare a refuzat accesul la lanțul de chei | Acordați permisiunea în solicitarea sistemului de operare |
| 404 + serviciul pentru lanțul de chei nu este disponibil | `libsecret` lipsește pe Linux                           | Instalați `libsecret-1-dev`                               |
