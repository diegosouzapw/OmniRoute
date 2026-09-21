# Zed IDE Integration in Docker Environments (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute inapoendeshwa ndani ya Docker, mtiririko wa kawaida wa "Leta kutoka Zed Keychain" hushindwa
kwa sababu kontena haliwezi kufikia huduma ya keychain ya Mfumo wa Uendeshaji wa seva mwenyeji (`libsecret` kwenye Linux,
Keychain kwenye macOS, Credential Manager kwenye Windows), na saraka za usanidi za Zed kwenye
mfumo wa faili wa seva mwenyeji hazionekani ndani ya kontena kwa chaguo-msingi.

## Kwa Nini Uletaji kutoka Keychain Hushindwa kwenye Docker

Matatizo mawili yanayozuia utendaji hutokea ndani ya kontena:

1. **Utengaji wa mfumo wa faili** — `isZedInstalled()` hutafuta `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), au saraka inayolingana kwenye Windows. Saraka hizi
   zipo kwenye seva mwenyeji na hazipatikani isipokuwa ziunganishwe waziwazi kama volume.
2. **Utengaji wa IPC** — Hata saraka ya usanidi inapounganishwa, moduli asilia ya `keytar`
   huwasiliana na huduma ya keychain ya Mfumo wa Uendeshaji kupitia soketi ya Unix au kipindi cha D-Bus.
   Hakuna kati ya hizi inayounganishwa na kontena kwa chaguo-msingi, kwa hivyo usomaji wa taarifa za uthibitishaji hushindwa kila wakati.

OmniRoute hutambua mazingira ya Docker kupitia mbinu mbili za ukadiriaji:

- Uwepo wa `/.dockerenv` (iliyoandikwa na daemon ya Docker kontena linapoanzishwa).
- Kuonekana kwa mfuatano `docker` katika `/proc/1/cgroup` (Linux cgroup v1).

Mojawapo ya mbinu hizi inapotimizwa, njia ya uletaji hurejesha HTTP 422 ikiwa na
`zedDockerEnvironment: true` na ujumbe unaokuelekeza kwenye kichupo cha Uletaji wa Tokeni kwa Mkono.

## Kutumia Kichupo cha Uletaji wa Tokeni kwa Mkono

1. Fungua **Dashibodi → Watoa Huduma → Zed**.
2. Paneli ya **Uletaji wa Tokeni kwa Mkono** huonekana chini ya kadi ya uletaji kutoka keychain. Wakati
   OmniRoute inapotambua Docker, paneli hii hupanuka kiotomatiki baada ya jaribio la kwanza la
   uletaji kutoka keychain kushindwa.
3. Chagua mtoa huduma kutoka kwenye orodha kunjuzi (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, au DeepSeek).
4. Bandika ufunguo wa API katika uga wa nenosiri.
5. Bofya **Leta**.

Ufunguo huhifadhiwa kama muunganisho mpya wa mtoa huduma wenye jina
`Zed Manual Import (<provider>)`.

## Mahali Ambapo Zed Huhifadhi Funguo za API kwenye Seva Mwenyeji

Zed huhifadhi funguo za watoa huduma wa AI katika keychain ya Mfumo wa Uendeshaji chini ya majina ya huduma kama vile
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, na kadhalika. Ili kuzipata kwa ajili ya
uletaji wa mkono, angalia katika:

**Linux**

```
~/.config/zed/settings.json
```

Sehemu ya `language_models` ina usanidi wa watoa huduma. Funguo zilizohifadhiwa kwenye
keychain kupitia kiolesura cha Zed hazipo kama maandishi wazi katika `settings.json`; zipate kupitia
kionyeshi cha keychain kama vile GNOME Keyring / Seahorse, au kwa kutekeleza:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Maingizo ya keychain yanaweza kupatikana katika **Keychain Access.app** kwa kutafuta `zed`.

## Chaguo la Kuunganisha Volume (Mahiri)

Unaweza, kwa hiari, kuunganisha saraka ya usanidi ya Zed ndani ya kontena katika hali ya kusoma pekee.
Hili halitatui tatizo la keychain lakini linaweza kuwa na manufaa kwa vipengele vya baadaye vinavyosoma
thamani zisizo za siri za usanidi wa Zed (kwa mfano, mapendeleo ya modeli).

```yaml
# Kipande cha docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Seva mwenyeji ya Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Seva mwenyeji ya macOS (ondoa alama ya maoni badala yake)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Katika siku zijazo: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Kumbuka: ubatilishaji kwa kutumia kigezo cha mazingira cha `ZED_CONFIG_PATH` bado haujatekelezwa. Kipande hiki
kimetolewa kama marejeleo ya wakati kipengele hicho kitakapoongezwa.

## API ya Uletaji kwa Mkono

Endpoint ya uletaji kwa mkono inaweza pia kuitwa moja kwa moja:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Ufunguo wangu wa Zed OpenAI"   // si lazima
}
```

Ikifaulu, hurejesha:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Utatuzi wa Matatizo

| Dalili                                 | Sababu                                            | Suluhisho                                          |
| -------------------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`     | Inaendeshwa ndani ya Docker                       | Tumia kichupo cha Uletaji wa Tokeni kwa Mkono      |
| 404 + `zedInstalled: false`            | Zed haijasakinishwa kwenye mwenyeji               | Sakinisha Zed au tumia uletaji kwa mkono           |
| 403 + ufikiaji wa keychain umekataliwa | Mfumo wa Uendeshaji umekataa ufikiaji wa keychain | Toa ruhusa katika kidokezo cha Mfumo wa Uendeshaji |
| 404 + huduma ya keychain haipatikani   | `libsecret` haipo kwenye Linux                    | Sakinisha `libsecret-1-dev`                        |
