# Zed IDE Integration in Docker Environments (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Երբ OmniRoute-ն աշխատում է Docker-ի ներսում, ստանդարտ «Ներմուծել Zed Keychain-ից» ընթացակարգը ձախողվում է,
քանի որ կոնտեյները չի կարող հասանելիություն ստանալ հյուրընկալող ՕՀ-ի բանալիների շղթայի ծառայությանը (libsecret՝ Linux-ում,
Keychain՝ macOS-ում, Credential Manager՝ Windows-ում), իսկ հյուրընկալող ֆայլային համակարգի Zed-ի կազմաձևման
պանակները լռելյայն տեսանելի չեն կոնտեյների ներսում։

## Ինչու է Keychain-ից ներմուծումը ձախողվում Docker-ում

Կոնտեյների ներսում առաջանում են երկու արգելակող խնդիրներ․

1. **Ֆայլային համակարգի մեկուսացում** — `isZedInstalled()`-ը փնտրում է `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) կամ Windows-ի համարժեք ուղին։ Այս ուղիները
   գտնվում են հյուրընկալող համակարգում և հասանելի չեն, եթե բացահայտորեն չեն միակցվել որպես հատոր։
2. **IPC-ի մեկուսացում** — Նույնիսկ երբ կազմաձևման պանակը միակցված է, `keytar` բնիկ
   մոդուլը հաղորդակցվում է ՕՀ-ի բանալիների շղթայի ծառայության հետ Unix socket-ի կամ D-Bus աշխատաշրջանի միջոցով։
   Դրանցից ոչ մեկը լռելյայն չի կապակցվում կոնտեյներին, ուստի հավատարմագրերի ընթերցումը միշտ ձախողվում է։

OmniRoute-ը հայտնաբերում է Docker միջավայրը երկու էվրիստիկական եղանակով․

- `/.dockerenv`-ի առկայությունը (գրվում է Docker դևոնի կողմից կոնտեյների գործարկման պահին)։
- `/proc/1/cgroup`-ում `docker` տողի առկայությունը (Linux cgroup v1)։

Երբ այս էվրիստիկաներից որևէ մեկը գործարկվում է, ներմուծման երթուղին վերադարձնում է HTTP 422՝
`zedDockerEnvironment: true` արժեքով և հաղորդագրությամբ, որն ուղղորդում է ձեզ դեպի «Ձեռքով թոքենի ներմուծում» ներդիրը։

## Ձեռքով թոքենի ներմուծման ներդիրի օգտագործումը

1. Բացեք **Կառավարման վահանակ → Մատակարարներ → Zed**։
2. **Ձեռքով թոքենի ներմուծում** վահանակը հայտնվում է բանալիների շղթայից ներմուծման քարտի ներքևում։ Երբ
   OmniRoute-ը հայտնաբերում է Docker-ը, այս վահանակն ինքնաբերաբար ընդարձակվում է բանալիների շղթայից ներմուծման
   առաջին ձախողված փորձից հետո։
3. Բացվող ցանկից ընտրեք մատակարարին (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter կամ DeepSeek)։
4. Տեղադրեք API բանալին գաղտնաբառի դաշտում։
5. Սեղմեք **Ներմուծել**։

Բանալին պահպանվում է որպես մատակարարի նոր կապ՝
`Zed Manual Import (<provider>)` անունով։

## Որտեղ է Zed-ը պահում API բանալիները հյուրընկալող համակարգում

Zed-ը պահում է AI մատակարարների բանալիները ՕՀ-ի բանալիների շղթայում՝ այնպիսի ծառայությունների անուններով, ինչպիսիք են
`zed-openai`, `ai.zed.openai`, `zed-anthropic` և այլն։ Ձեռքով ներմուծման համար դրանք ստանալու նպատակով փնտրեք այստեղ․

**Linux**

```
~/.config/zed/settings.json
```

`language_models` բաժինը պարունակում է մատակարարների կազմաձևումները։ Zed-ի միջերեսի միջոցով
բանալիների շղթայում պահպանված բանալիները `settings.json`-ում բաց տեքստով չեն պահվում․ դրանք ստացեք
բանալիների շղթայի դիտիչի միջոցով, օրինակ՝ GNOME Keyring / Seahorse, կամ գործարկելով՝

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain-ի գրառումները կարելի է գտնել **Keychain Access.app**-ում՝ որոնելով `zed`։

## Հատորի միակցման տարբերակ (առաջադեմ)

Ըստ ցանկության՝ կարող եք Zed-ի կազմաձևման պանակը միայն ընթերցման ռեժիմով միակցել կոնտեյներին։
Սա չի լուծում բանալիների շղթայի խնդիրը, սակայն կարող է օգտակար լինել ապագա գործառույթների համար, որոնք կարդում են
Zed-ի ոչ գաղտնի կազմաձևման արժեքները (օրինակ՝ մոդելի նախապատվությունները)։

```yaml
# docker-compose.yml-ի հատված
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux հյուրընկալող համակարգ
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS հյուրընկալող համակարգ (փոխարենը ապամեկնաբանեք)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Ապագայում՝ ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Նշում․ `ZED_CONFIG_PATH` միջավայրի փոփոխականի վերասահմանումը դեռ ներդրված չէ։ Այս
հատվածը տրամադրվում է որպես տեղեկատու՝ այդ գործառույթի ավելացումից հետո օգտագործելու համար։

## Ձեռքով ներմուծման API

Ձեռքով ներմուծման վերջնակետը կարող է նաև կանչվել անմիջապես․

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Իմ Zed OpenAI բանալին"   // ընտրովի
}
```

Հաջողության դեպքում այն վերադարձնում է․

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Խնդիրների վերացում

| Ախտանիշ                                             | Պատճառ                                            | Լուծում                                           |
| --------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`                  | Գործարկվում է Docker-ի ներսում                    | Օգտագործեք «Ձեռքով թոքենի ներմուծում» ներդիրը     |
| 404 + `zedInstalled: false`                         | Zed-ը տեղադրված չէ հյուրընկալող համակարգում       | Տեղադրեք Zed-ը կամ օգտագործեք ձեռքով ներմուծումը  |
| 403 + բանալիների շղթային հասանելիությունը մերժված է | ՕՀ-ը մերժել է բանալիների շղթային հասանելիությունը | Թույլտվություն տրամադրեք ՕՀ-ի հուշման պատուհանում |
| 404 + բանալիների շղթայի ծառայությունը հասանելի չէ   | `libsecret`-ը բացակայում է Linux-ում              | Տեղադրեք `libsecret-1-dev`                        |
