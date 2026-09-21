# Zed IDE Integration in Docker Environments (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Nígbà tí OmniRoute bá ń ṣiṣẹ́ nínú Docker, ìlànà “Gbé wọlé láti Zed Keychain” tí ó jẹ́ àṣà kì í ṣiṣẹ́
nítorí pé container náà kò lè dé ọ̀dọ̀ daemon keychain ti OS host (libsecret lórí Linux,
Keychain lórí macOS, Credential Manager lórí Windows), àti pé àwọn directory config Zed lórí
filesystem host kò hàn nínú container ní àìyídá.

## Ìdí tí Gbigbé wọlé láti Keychain Kò Fi Ṣiṣẹ́ nínú Docker

Àwọn ìṣòro méjì tí ń dí iṣẹ́ lọ́wọ́ máa ń ṣẹlẹ̀ nínú container:

1. **Ìyasọ́tọ̀ filesystem** — `isZedInstalled()` máa ń wá `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), tàbí ohun tí ó bá a mu lórí Windows. Àwọn path wọ̀nyí
   wà lórí host, wọn kò sì sí ní àrọ́wọ́tó àyàfi tí a bá fi volume-mount wọn ní pàtó.
2. **Ìyasọ́tọ̀ IPC** — Kódà tí a bá mount directory config náà, module abinibi `keytar`
   máa ń bá iṣẹ́ keychain OS sọ̀rọ̀ nípasẹ̀ Unix socket tàbí session D-Bus.
   Kò sí èyíkéyìí tí a bridge sínú container ní àìyídá, nítorí náà kíkà credential máa ń kùnà ní gbogbo ìgbà.

OmniRoute máa ń ṣàwárí environment Docker nípasẹ̀ heuristics méjì:

- Wíwà `/.dockerenv` (èyí tí daemon Docker kọ nígbà tí container bá bẹ̀rẹ̀).
- Ìfarahàn string `docker` nínú `/proc/1/cgroup` (Linux cgroup v1).

Nígbà tí èyíkéyìí nínú heuristics wọ̀nyí bá ṣiṣẹ́, route ìgbéwọlé náà máa dá HTTP 422 padà pẹ̀lú
`zedDockerEnvironment: true` àti ìfiránṣẹ́ kan tí ń tọ́ ọ sí taabu Gbigbé Token Wọlé Pẹ̀lú Ọwọ́.

## Lílo Taabu Gbigbé Token Wọlé Pẹ̀lú Ọwọ́

1. Ṣí **Dashboard → Providers → Zed**.
2. Panel **Manual Token Import** máa hàn ní ìsàlẹ̀ kaadi ìgbéwọlé keychain. Nígbà tí
   OmniRoute bá ṣàwárí Docker, panel yìí máa ṣí fúnra rẹ̀ lẹ́yìn ìgbìyànjú àkọ́kọ́ tí ó kùnà
   láti gbé wọlé láti keychain.
3. Yan provider láti inú dropdown (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, tàbí DeepSeek).
4. Lẹ API key náà sínú ààyè password.
5. Tẹ **Import**.

A máa fi key náà pamọ́ gẹ́gẹ́ bí connection provider tuntun pẹ̀lú orúkọ
`Zed Manual Import (<provider>)`.

## Ibi tí Zed Ti Ń Tọ́jú Àwọn API Key lórí Host

Zed máa ń tọ́jú àwọn key provider AI sínú keychain OS lábẹ́ àwọn orúkọ service bíi
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ. Láti gba wọn fún
ìgbéwọlé pẹ̀lú ọwọ́, wá wọn ní:

**Linux**

```
~/.config/zed/settings.json
```

Abala `language_models` ní àwọn àtòjọ config provider nínú. Àwọn key tí a fi pamọ́ sínú
keychain nípasẹ̀ UI Zed kò sí gẹ́gẹ́ bí plain text nínú `settings.json`; gba wọn nípasẹ̀
viewer keychain bíi GNOME Keyring / Seahorse, tàbí nípa ṣíṣe:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

A lè rí àwọn entry keychain nínú **Keychain Access.app** nípa wíwá `zed`.

## Àṣàyàn Volume-Mount (Fún Àwọn Onímọ̀ Gíga)

O lè mount directory config Zed sínú container gẹ́gẹ́ bí read-only tí o bá fẹ́.
Èyí kò yanjú ìṣòro keychain, ṣùgbọ́n ó lè wúlò fún àwọn ẹ̀yà ọjọ́ iwájú tí yóò ka
àwọn iye config Zed tí kì í ṣe àṣírí (fún àpẹẹrẹ, àwọn ààyò model).

```yaml
# Àjákù docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (yọ àmì comment kúrò ní dípò èyí tí ó wà lókè)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Ọjọ́ iwájú: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Àkíyèsí: override environment variable `ZED_CONFIG_PATH` kò tíì jẹ́ implemented. A pèsè
àjákù yìí gẹ́gẹ́ bí ìtọ́kasí fún ìgbà tí a bá ṣàfikún ẹ̀yà náà.

## API Gbigbé Wọlé Pẹ̀lú Ọwọ́

A tún lè pe endpoint ìgbéwọlé pẹ̀lú ọwọ́ ní tààrà:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Key Zed OpenAI mi"   // àṣàyàn
}
```

Nígbà tí ó bá ṣàṣeyọrí, yóò dá èyí padà:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Yíyanjú Ìṣòro

| Àmì ìṣòro                               | Ohun tó fà á                 | Ìtọ́jú rẹ̀                              |
| --------------------------------------- | ---------------------------- | ------------------------------------- |
| 422 + `zedDockerEnvironment: true`      | Ó ń ṣiṣẹ́ nínú Docker         | Lo taabu Gbigbé Token Wọlé Pẹ̀lú Ọwọ́   |
| 404 + `zedInstalled: false`             | A kò fi Zed sí host          | Fi Zed sílẹ̀ tàbí lo ìgbéwọlé pẹ̀lú ọwọ́ |
| 403 + a kọ ìráàyèsí keychain            | OS kọ ìráàyèsí keychain      | Fún un láṣẹ nínú prompt OS            |
| 404 + service keychain kò sí ní àrọ́wọ́tó | `libsecret` kò sí lórí Linux | Fi `libsecret-1-dev` sílẹ̀             |
