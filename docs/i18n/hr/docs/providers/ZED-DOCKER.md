# Zed IDE Integration in Docker Environments (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kada se OmniRoute pokreće unutar Dockera, standardni postupak „Uvoz iz Zed privjeska ključeva” ne uspijeva
jer spremnik ne može pristupiti servisu privjeska ključeva glavnog operacijskog sustava (libsecret na Linuxu,
Keychain na macOS-u, Credential Manager na Windowsu), a direktoriji Zed konfiguracije na
datotečnom sustavu glavnog računala prema zadanim postavkama nisu vidljivi unutar spremnika.

## Zašto uvoz iz privjeska ključeva ne uspijeva u Dockeru

Unutar spremnika pojavljuju se dva problema koja onemogućuju rad:

1. **Izolacija datotečnog sustava** — `isZedInstalled()` traži `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) ili odgovarajuću putanju na Windowsu. Te se putanje
   nalaze na glavnom računalu i nisu dostupne ako nisu izričito montirane kao volumen.
2. **IPC izolacija** — Čak i kada je konfiguracijski direktorij montiran, izvorni modul `keytar`
   komunicira sa servisom privjeska ključeva operacijskog sustava putem Unix utičnice ili D-Bus sesije.
   Ni jedno ni drugo prema zadanim postavkama nije povezano sa spremnikom, pa čitanje vjerodajnica uvijek ne uspijeva.

OmniRoute otkriva Docker okruženje pomoću dviju heuristika:

- Prisutnost datoteke `/.dockerenv` (koju Dockerov servis zapisuje pri pokretanju spremnika).
- Pojavljivanje niza `docker` u `/proc/1/cgroup` (Linux cgroup v1).

Kada se aktivira bilo koja heuristika, ruta za uvoz vraća HTTP 422 s
`zedDockerEnvironment: true` i porukom koja vas upućuje na karticu za ručni uvoz tokena.

## Upotreba kartice za ručni uvoz tokena

1. Otvorite **Nadzorna ploča → Pružatelji usluga → Zed**.
2. Ploča **Ručni uvoz tokena** pojavljuje se ispod kartice za uvoz iz privjeska ključeva. Kada
   OmniRoute otkrije Docker, ta se ploča automatski proširuje nakon prvog neuspjelog
   pokušaja uvoza iz privjeska ključeva.
3. Odaberite pružatelja usluga iz padajućeg izbornika (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ili DeepSeek).
4. Zalijepite API ključ u polje za lozinku.
5. Kliknite **Uvezi**.

Ključ se sprema kao nova veza s pružateljem usluga pod nazivom
`Zed Manual Import (<provider>)`.

## Gdje Zed pohranjuje API ključeve na glavnom računalu

Zed pohranjuje ključeve pružatelja AI usluga u privjesku ključeva operacijskog sustava pod nazivima servisa kao što su
`zed-openai`, `ai.zed.openai`, `zed-anthropic` itd. Da biste ih dohvatili radi ručnog
uvoza, potražite ih na sljedećim mjestima:

**Linux**

```
~/.config/zed/settings.json
```

Odjeljak `language_models` sadržava konfiguracije pružatelja usluga. Ključevi spremljeni u
privjesak ključeva putem Zed korisničkog sučelja nisu zapisani kao običan tekst u datoteci `settings.json`; dohvatite ih
pomoću preglednika privjeska ključeva kao što je GNOME Keyring / Seahorse ili pokretanjem naredbe:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Zapise privjeska ključeva možete pronaći u aplikaciji **Keychain Access.app** pretraživanjem pojma `zed`.

## Opcija montiranja volumena (napredno)

Po želji možete montirati Zed konfiguracijski direktorij u spremnik samo za čitanje.
To ne rješava problem s privjeskom ključeva, ali može biti korisno za buduće značajke koje čitaju
Zed konfiguracijske vrijednosti koje nisu tajne (npr. preference modela).

```yaml
# Isječak datoteke docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Glavno računalo s Linuxom
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Glavno računalo s macOS-om (umjesto prethodnog uklonite oznaku komentara)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Buduća mogućnost: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Napomena: nadjačavanje putem varijable okruženja `ZED_CONFIG_PATH` još nije implementirano. Ovaj
je isječak naveden kao referenca za vrijeme kada ta značajka bude dodana.

## API za ručni uvoz

Krajnja točka za ručni uvoz može se pozvati i izravno:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Moj Zed OpenAI ključ"   // neobavezno
}
```

U slučaju uspjeha vraća:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Rješavanje problema

| Simptom                                       | Uzrok                                                  | Rješenje                                         |
| --------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`            | Pokretanje unutar Dockera                              | Upotrijebite karticu za ručni uvoz tokena        |
| 404 + `zedInstalled: false`                   | Zed nije instaliran na glavnom računalu                | Instalirajte Zed ili upotrijebite ručni uvoz     |
| 403 + pristup privjesku ključeva odbijen      | Operacijski sustav odbio je pristup privjesku ključeva | Odobrite dopuštenje u upitu operacijskog sustava |
| 404 + servis privjeska ključeva nije dostupan | Nedostaje `libsecret` na Linuxu                        | Instalirajte `libsecret-1-dev`                   |
