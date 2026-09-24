# Zed IDE Integration in Docker Environments (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Nuair a ritheann OmniRoute taobh istigh de Docker, teipeann ar an ngnáthshreabhadh "Iompórtáil ó Shlabhra Eochracha Zed"
toisc nach féidir leis an gcoimeádán deamhan shlabhra eochracha an óstchórais a bhaint amach (`libsecret` ar Linux,
Keychain ar macOS, Credential Manager ar Windows) agus nach mbíonn eolairí cumraíochta Zed ar
chóras comhad an óstaigh infheicthe taobh istigh den choimeádán de réir réamhshocraithe.

## Cén Fáth a dTeipeann ar Iompórtáil ón Slabhra Eochracha in Docker

Tarlaíonn dhá fhadhb bhlocála taobh istigh de choimeádán:

1. **Leithlisiú an chórais comhad** — lorgaíonn `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), nó a chomhionann ar Windows. Tá na cosáin seo
   ar an óstach agus níl siad ar fáil mura ngléas-mhapáiltear go sainráite iad.
2. **Leithlisiú IPC** — Fiú nuair a bhíonn an t-eolaire cumraíochta gléas-mhapáilte, déanann an modúl dúchasach
   `keytar` cumarsáid le seirbhís shlabhra eochracha an chórais oibriúcháin thar shoicéad Unix nó seisiún D-Bus.
   Ní dhroichtear ceachtar acu isteach sa choimeádán de réir réamhshocraithe, mar sin teipeann ar léamh dintiúr i gcónaí.

Braitheann OmniRoute timpeallacht Docker trí dhá heorastac:

- Láithreacht `/.dockerenv` (a scríobhann deamhan Docker nuair a thosaíonn an coimeádán).
- An teaghrán `docker` a bheith le feiceáil in `/proc/1/cgroup` (Linux cgroup v1).

Nuair a spreagann ceachtar heorastac, cuireann an bealach iompórtála HTTP 422 ar ais le
`zedDockerEnvironment: true` agus teachtaireacht a threoraíonn thú chuig an gcluaisín Iompórtáil Chomhartha de Láimh.

## An Cluaisín Iompórtáil Chomhartha de Láimh a Úsáid

1. Oscail **Deais → Soláthraithe → Zed**.
2. Taispeántar an painéal **Iompórtáil Chomhartha de Láimh** faoi chárta iompórtála an tslabhra eochracha. Nuair a
   bhraitheann OmniRoute Docker, leathnaíonn an painéal seo go huathoibríoch tar éis na chéad iarrachta teipthe
   ar iompórtáil ón slabhra eochracha.
3. Roghnaigh an soláthraí ón roghchlár anuas (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, nó DeepSeek).
4. Greamaigh an eochair API sa réimse pasfhocail.
5. Cliceáil **Iompórtáil**.

Sábháiltear an eochair mar cheangal nua soláthraí darb ainm
`Zed Manual Import (<provider>)`.

## An Áit a Stórálann Zed Eochracha API ar an Óstach

Stórálann Zed eochracha soláthraithe AI i slabhra eochracha an chórais oibriúcháin faoi ainmneacha seirbhíse amhail
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, srl. Chun iad a aisghabháil le haghaidh
iompórtáil de láimh, féach sna háiteanna seo:

**Linux**

```
~/.config/zed/settings.json
```

Tá cumraíochtaí soláthraithe sa rannán `language_models`. Ní bhíonn eochracha a shábháiltear sa
slabhra eochracha trí chomhéadan Zed mar ghnáth-théacs in `settings.json`; aisghabh iad trí
amharcóir slabhra eochracha amhail GNOME Keyring / Seahorse, nó tríd an méid seo a rith:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Is féidir iontrálacha an tslabhra eochracha a aimsiú in **Keychain Access.app** trí `zed` a chuardach.

## Rogha Gléas-Mhapála (Ardrogha)

Is féidir leat eolaire cumraíochta Zed a ghléas-mhapáil go roghnach isteach sa choimeádán i mód inléite amháin.
Ní réitíonn sé seo fadhb an tslabhra eochracha ach d'fhéadfadh sé a bheith úsáideach do ghnéithe amach anseo a léann
luachanna cumraíochta Zed nach rúin iad (m.sh., sainroghanna samhlacha).

```yaml
# Blúire docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Óstach Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Óstach macOS (bain an nóta tráchta de seo ina ionad)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Amach anseo: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nóta: níl sárú trí athróg timpeallachta `ZED_CONFIG_PATH` curtha i bhfeidhm fós. Cuirtear an
blúire seo ar fáil mar thagairt don uair a chuirfear an ghné sin leis.

## API Iompórtála de Láimh

Is féidir glao díreach a chur ar chríochphointe na hiompórtála de láimh freisin:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "M'eochair OpenAI ó Zed"   // roghnach
}
```

Má éiríonn leis, cuireann sé an méid seo ar ais:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Fabhtcheartú

| Siomptóm                                          | Cúis                                                             | Réiteach                                         |
| ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`                | Á rith taobh istigh de Docker                                    | Úsáid an cluaisín Iompórtáil Chomhartha de Láimh |
| 404 + `zedInstalled: false`                       | Níl Zed suiteáilte ar an óstach                                  | Suiteáil Zed nó úsáid iompórtáil de láimh        |
| 403 + rochtain ar an slabhra eochracha diúltaithe | Dhiúltaigh an córas oibriúcháin rochtain ar an slabhra eochracha | Deonaigh cead i leid an chórais oibriúcháin      |
| 404 + níl seirbhís an tslabhra eochracha ar fáil  | Tá `libsecret` ar iarraidh ar Linux                              | Suiteáil `libsecret-1-dev`                       |
