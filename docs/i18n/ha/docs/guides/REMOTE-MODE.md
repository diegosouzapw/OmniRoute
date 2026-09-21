# Remote Mode (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Gudanar da `omniroute` CLI a kwamfutar tafi-da-gidanka yayin da OmniRoute kansa yake gudana a wani wuri
(VPS, sabar gida, wata na'ura a Tailnet ɗinka). Za ka shiga sau ɗaya da
`omniroute connect`, kuma daga nan gaba **kowane** umarnin CLI zai nufi wannan sabar
mai nisa — umarni iri ɗaya, fitarwa iri ɗaya, kawai ana aiwatar da su a sabar mai nisa.

Babu wani kayan aiki na biyu da za a girka: yanayin nesa shi ne `omniroute` CLI na yau da kullum
tare da **access tokens** masu iyakancewar izini.

```bash
npm install -g omniroute                 # CLI na yau da kullum
omniroute connect 192.168.0.15           # shiga (kalmar sirri → token mai iyakancewar izini)
omniroute models list                    # ← yanzu yana jera samfuran SABAR NESA
omniroute configure codex                # ← yana rubuta bayanan martabar Codex na gida daga kundin sabar nesa
```

---

## Yadda yake aiki

```
kwamfutar tafi-da-gidanka                 OmniRoute na nesa (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (kalmar sirri → token)      │
│  context: vps      │ ───────────────►  │ yana ƙirƙirar access token mai │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ kowace hanyar gudanarwa, ana   │
│ yana rubuta configs│ ◄───────────────  │ bincika scope na token ɗin     │
│ A CIKIN GIDA       │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contexts** suna adana saba ɗaya kowannensu (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` yana sauya sabar da ke aiki; `default` na gida ne.
- **Access tokens** (`oma_live_…`) suna ba da izinin umarnin gudanarwa. Sun
  bambanta da maɓallan API na inference (`sk-…`, waɗanda ake amfani da su don `/v1/chat/completions`).
- Hash na SHA-256 na token kawai ake adanawa a gefen sabar. Ana nuna rubutaccen token
  **sau ɗaya**, lokacin ƙirƙirawa.

---

## Haɗawa

### Da kalmar sirrin gudanarwa (bootstrap)

```bash
omniroute connect 192.168.0.15
# Kalmar sirrin gudanarwa ta http://192.168.0.15:20128: ********
# ✔ An haɗa da http://192.168.0.15:20128 — context '192.168.0.15' (scope: admin)
```

Tsarin kalmar sirri yana ƙirƙirar token na **admin** ta tsohuwa (tun da kana da kalmar sirrin,
to kana da cikakken iko). Rage scope da `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Zaɓuɓɓuka: `--port <p>` (idan host ɗin ba shi da port), `--name <ctx>` (sunan context),
`--scope read|write|admin`. Ana amfani da cikakken URL yadda yake:
`omniroute connect https://omni.example.com`.

### Da token da aka riga aka ƙirƙira

Ƙirƙiri token mai iyakancewar izini a dashboard (ko da `omniroute tokens create`) sannan
ka liƙa shi — ba a buƙatar kalmar sirri:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI yana tabbatar da ingancinsa ta `GET /api/cli/whoami` sannan ya adana shi a matsayin context mai aiki.

---

## Scopes

Matakai uku, masu bin tsari (`admin ⊃ write ⊃ read`):

| Scope   | Abin da zai iya yi                                                                |
| ------- | --------------------------------------------------------------------------------- |
| `read`  | jera/duba — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | read **+** saita/amfani — `setup-codex`, `keys add`, `config set`, combos         |
| `admin` | write **+** gudanarwa — CRUD na `tokens`, ƙara providers, services, policy, oauth |

Sabar tana tantance scope da kowace hanya ke buƙata daga hanyar HTTP
(`GET`→read, sauye-sauye→write), tare da jerin izinin admin don wurare masu muhimmanci
(sauye-sauyen `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token da ba shi da isasshen scope zai sami `403` tare da saƙo bayyananne.

> Hanyoyin da ke ƙaddamar da processes (`/api/services/*`, `/api/mcp/*`, …) suna kasancewa
> **loopback-only** — token na nesa ba zai taɓa iya isa gare su ba, komai scope ɗinsa.

## Haɗa Antigravity a kan shigarwa ta nesa

Antigravity yana amfani da allon amincewa na Google's firstparty/nativeapp. Google yana
fitar da lambar izini ne kawai idan **loopback redirect**
(`http://127.0.0.1:<port>/callback`) yana **samun isa daga burauzar da
ta amince da shiga**. A shigarwar VPS ta nesa, wannan loopback yana kan
uwar garken ne, ba kan na'urarka ba, saboda haka allon amincewar **yana ratayewa har abada kuma ba ya
fitar da wata lamba** — hanyar madadin da aka saba amfani da ita ta “liƙa callback URL” ba ta da abin da za a
liƙa. (Wannan ƙuntatawa ce daga ɓangaren Google: irin wannan ratayewar tana faruwa a duk wani proxy
da ke amfani da haɗaɗɗen Antigravity desktop client, ba OmniRoute kaɗai ba.)

Dashboard yana gano wannan kafin ka makale: buɗe **Providers → Antigravity →
Connect** daga adireshin da ba localhost ba yana maye gurbin sanarwar gama-gari ta “kwafi callback URL”
da hanyoyin magance matsalar guda biyu da ke ƙasa, kowannensu tare da host da port ɗinka da aka riga aka cika.
(Adireshin LAN ma yana cikin wannan — `192.168.x.x` ba localhost ba ne dangane da wannan callback.)

Akwai hanyoyi biyu da ake tallafawa don haɗa Antigravity da OmniRoute na nesa.

### Zaɓi A — mataimakin shiga na gida (ana ba da shawara)

Gudanar da OAuth a kan **kwamfutarka**, inda ake iya isa ga `127.0.0.1`. Mataimakin
yana sadarwa da Google kai tsaye, don haka amincewar tana kammaluwa a inda sigar dashboard
ba za ta iya ba.

**Idan kana riga ka haɗu** (`omniroute connect <host>`), babu abin da za ka
kwafa — mataimakin zai aika shaidar zuwa wannan shigarwar a madadinka:

```bash
# A kan na'urarka ta GIDA (ana buƙatar Node.js + burauza):
omniroute connect 192.168.0.15        # sau ɗaya — yana samar da context token mai ikon admin
npx omniroute login antigravity
#   ↳ yana buɗe amincewar Google, yana kama callback a kan loopback port na gida,
#     yana musanya shi, sannan yana POST ɗin shaidar zuwa active context:
#
#   An haɗa Antigravity a kan http://192.168.0.15:20128 (haɗin abc123).
#   Babu abin da za a liƙa — za ka iya rufe wannan terminal.
```

Tura bayanan yana faruwa ta atomatik duk lokacin da active context yake nuni zuwa wata
na'ura. Tilasta shi ta kowace hanya da `--push` / `--no-push`, ko kuma nufi wani takamaiman
context da `--context <name>`.

**Idan na'urarka ba za ta iya isa ga VPS ba** (firewall ya tare ta, babu SSH, ko teburin da aka ware daga hanyar sadarwa), mataimakin
har yanzu yana aiki — Google ne kawai yake _buƙata_. Yi amfani da `--no-push`, ko kuma bari
tura bayanan ya gaza: zai koma buga blob maimakon watsar da
izinin da ka riga ka kammala.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Sannan, a cikin dashboard na **nesa**: **Providers → Antigravity → Connect**, ka liƙa
blob na `omniroute-cred-v1.…` a cikin filin **Mataki na 2** (yana karɓar ko dai
callback URL ko credential blob). OmniRoute yana warware shi, yana gudanar da Cloud Code
onboarding a gefen uwar garken, sannan yana adana haɗin.

> Blob ɗin yana ɗauke da refresh token — ka kula da shi kamar kalmar sirri. A hanyar tura bayanai,
> ana aika shi sau ɗaya ta hanyar haɗin context ɗinka da aka tabbatar; a hanyar liƙawa kuma, ta hanyar
> haɗin dashboard ɗinka. A kowace hanya, ana adana shi a rufaffen tsari, kuma
> tura bayanan da ya yi nasara ba zai taɓa buga shi a terminal ɗinka ba.

Flags: `--no-browser` (buga URL maimakon buɗe shi ta atomatik), `--port <n>`
(ƙayyade loopback port), `--timeout <ms>`, `--push` / `--no-push` (soke tsarin
isarwa ta atomatik), `--context <name>` (nufi wani takamaiman context).

### Zaɓi B — SSH local-forward tunnel

Idan kana da damar SSH zuwa VPS, tura dashboard port ɗin domin
loopback callback ya koma uwar garken ta cikin tunnel:

```bash
# A kan na'urarka ta GIDA:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# sannan ka buɗe http://localhost:20128 a burauzarka ta GIDA kuma ka haɗa Antigravity
# kamar yadda aka saba — yanzu redirect na 127.0.0.1:20128/callback yana isa VPS ta SSH.
```

Saboda kana isa ga dashboard a matsayin `localhost:20128`, amincewar Google
tana kammaluwa kuma ana isar da callback zuwa uwar garken ta cikin wannan tunnel ɗin —
ba a buƙatar blob. Bar tunnel ɗin a buɗe har sai haɗin ya nuna cewa yana aiki.

Ba kamar fixed-loopback providers da ke ƙasa ba, **forward guda ɗaya ya isa** a nan:
Antigravity callback yana amfani da dashboard port ɗin kansa, don haka babu wani
port na biyu na musamman ga provider da za a tura ta tunnel.

> Wata cikakkiyar hanyar headless (ba mataimaki, ba tunnel) ita ce saita **naka**
> Google OAuth web credentials + public base URL; duba OAuth
> environment variables na provider. Zaɓuɓɓukan biyu da ke sama ba sa buƙatar wani ƙarin saitin Google.

---

## Haɗa Codex / Grok a kan shigarwa ta nesa (masu samarwa masu tsayayyen-loopback)

Codex, xAI (`xai-oauth`) da Grok CLI (`grok-cli`) suna rajistar **tsayayyen** loopback
`redirect_uri` tare da manhajar OAuth ta uwar garken su. OmniRoute ba zai iya canza shi ba — mai
samarwar koyaushe yana mayar da burauzar zuwa wannan adireshin da aka riga aka ƙayyade:

| Mai samarwa | Tsayayyen callback da mai samarwar ke karkatarwa zuwa gare shi |
| ----------- | -------------------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                          |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                              |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                              |

`localhost` a nan yana nufin **na'urar da burauzar ke aiki a kanta**, yayin da uwar garken callback na PKCE na OmniRoute
ke sauraro a loopback na **uwar garken**. Buɗe dashboard a adireshin LAN
kamar `http://192.168.0.15:20128` yana sa su biyun kada su taɓa haɗuwa: ana aika lambar ba da izini
zuwa `localhost:1455` na kwamfutar tafi-da-gidanka naka, inda babu abin da ke sauraro,
kuma mai samarwar ya kasa shigar da kai ba tare da nuna kuskure ba.

Dashboard yana gano wannan kafin buɗe popup kuma ya nuna umarnin tunnel
maimakon barin shigarwar ta gaza a ɓoye (#8046).

### Gyara — tura **dukan** ports ɗin biyu

```bash
# A kan na'urar da BURAUZAR ke aiki a kanta:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# sannan je zuwa http://localhost:20128 ka haɗa Codex daga can
```

Ana buƙatar forwards guda biyu, kuma tura ɗaya kawai har yanzu zai gaza:

- **`20128`** (port na dashboard) yana sa origin ya zama localhost na gaskiya, wanda shi ne abin da
  ke sa OmniRoute ya fara uwar garken callback na PKCE kwata-kwata — origin na LAN ba zai taɓa
  isa wannan branch ɗin ba.
- **`1455`** (tsayayyen port na callback na mai samarwar) shi ne inda ake mayar da burauzar
  zuwa gare shi; dole ne ya bi tunnel zuwa loopback na uwar garken.

Sauya `1455` da `56121`/`56122` lokacin haɗa xAI ko Grok CLI, sannan `20128` da
ainihin port na dashboard ɗinka. Bar tunnel a buɗe har sai haɗin ya nuna cewa yana
aiki.

> **Ba ka da damar SSH?** Codex da Grok CLI kuma suna karɓar token da aka liƙa — shafin **Liƙa API
> Key** / **Shigo da auth.json** a akwatin tattaunawar haɗawa. Wannan hanyar ba ta da loopback
> callback, saboda haka tana aiki daga kowane origin. Codex kuma yana karɓar access
> token kai tsaye ko kuma bayanan zaman `~/.codex/auth.json`.

---

## Sarrafa tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ yana buga secret ɗin SAU ƊAYA — kwafe shi yanzu
omniroute tokens list                 # an ɓoye: id, suna, scope, prefix, matsayi, ranar ƙarewa
omniroute tokens revoke <id|prefix>   # soke nan take
omniroute tokens scopes               # bayyana scopes guda uku
```

Umarnin `tokens` suna buƙatar credential na **admin**. Haka kuma za ka iya sarrafa tokens a cikin
dashboard ƙarƙashin **Saituna → Access Tokens** (ƙirƙira, sokewa, kwafewa sau ɗaya).

---

## Saita CLI na coding daga catalog na nesa

`omniroute configure` yana karanta catalog na model kai tsaye na **uwar garken da ke aiki** kuma ya rubuta
config a kan na'urarka.

```bash
omniroute configure codex
#   Masu samarwa: glm, kmc, ollamacloud, opencode-go, …
#   Mai samarwa: glm
#   Model id: glm/glm-5.2
#   ✔ An rubuta ~/.codex/glm52.config.toml
#   Yi amfani da shi:  codex --profile glm52

# ba tare da hulɗa ba
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# ajiye model da ake yawan amfani da shi a saman interactive picker
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Picker yana adana model IDs kawai (ba ya taɓa adana URLs ko credentials) a cikin fayil na gida
`model-preferences.json`, wanda aka keɓance bisa context da abin da CLI ke nufi. Ana
nuna favorites kafin zaɓuɓɓukan baya-bayan nan; yi amfani da `--unfavorite` don cire model da aka zaɓa
daga jerin context/target ɗin.

Profile ɗin da aka rubuta yana nuni ga inference key ta env var
(`OMNIROUTE_API_KEY`) — ba a taɓa rubuta secret ɗin zuwa disk ba. Don saitin Codex na asali na sau ɗaya
(block ɗin `[model_providers.omniroute]`), duba
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Ƙaddamar da CLI don yin aiki da na'urar nesa (ba a rubuta config)

`omniroute run <target>` shi ma yana bin active context: ana shigar da base URL na nesa
da credential na context cikin process ɗin da aka ƙaddamar kawai.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → na'urar nesa
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Duba daidai abin da za a ƙaddamar (SUNAYEN env KEY kawai, ba ƙimomi ba):
omniroute run codex --dry-run --json
```

Targets: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(tushe guda ɗaya: `bin/cli/cli-manifest.mjs`). Qwen da Gemini suna aiki da
home na wucin gadi da aka keɓe wanda ake cirewa bayan fita, saboda haka ƙaddamarwar ba za ta taɓa —
ko fitar da bayanai zuwa — saitunan kayan aikinka na kashin kai ba.

### Umarnin saitawa na kowane CLI

Kowane CLI da ake tallafawa yana da umarnin saitawa da ya san yanayin nesa (duk suna bin active
context, ko `--remote <url> --api-key <key>`):

| CLI         | Umarni                     | Abin da yake rubutawa                                                                                                                                                                            |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | Fayilolin bayanin martaba na `~/.codex/<name>.config.toml` (ga kowane samfuri)                                                                                                                   |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (ga kowane samfuri)                                                                                                                                    |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — mai samar da `omniroute` mai dacewa da openai tare da kowane samfurin kundin bayanai (gudanar da `opencode -m omniroute/<model>`)                           |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (yanayin CLI) + yana buga saitunan tsawaitawar VS Code don liƙawa (mai dacewa da OpenAI, Base URL **ba tare da** `/v1` ba)                            |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + saitunan VS Code na `kilocode.*` — mai dacewa da OpenAI, Base URL **tare da** `/v1`                                                                      |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **tare da** `/v1`, maɓalli ta `${{ secrets.OMNIROUTE_API_KEY }}`                                        |
| Cursor      | `omniroute setup-cursor`   | yana buga matakan cikin manhaja (Settings → Models → Override OpenAI Base URL **tare da** `/v1` + maɓalli + samfuri). Tsarin Cursor ɓoyayyen SQLite ne — sashen hira kawai                       |
| Roo Code    | `omniroute setup-roo`      | yana rubuta JSON na shigarwa na Roo (`~/.omniroute/roo-settings.json`) + yana saita `roo-cline.autoImportSettingsPath` + yana buga matakan UI (mai dacewa da OpenAI, Base URL **tare da** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — mai samar da `openai-compat`, `base_url` **tare da** `/v1`, maɓalli ta `$OMNIROUTE_API_KEY`                                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **ba tare da** `/v1` ba + `GOOSE_MODEL`) + tsarin umarnin env                                                             |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ba tare da** `/v1` ba + `model: openai/<id>`) + tsarin umarnin env (`aider --message --yes`)                                                            |
| Qwen Code   | `omniroute setup-qwen`     | Shigarwar V4 ta `modelProviders.openai` a cikin `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` a cikin `~/.qwen/.env`                                                                             |

```bash
# OpenCode (mai samarwa mai dacewa da openai, duk samfuran kundin bayanai, VPS na nesa)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ajiye samfuran da suka dace kawai
opencode -m omniroute/glm/glm-5.2 "..."          # fara fitar da OMNIROUTE_API_KEY
```

> OpenCode kuma yana da haɗin **plugin** mai ƙarin fasali: `omniroute setup opencode`
> (yanzu yana aiki da na'ura mai nesa ta `--remote`) yana girka `@omniroute/opencode-plugin`.
> `setup-opencode` shi ne madadin mai sauƙi wanda ya dace da openai. Ana ambaton maɓallin API
> ta `{env:OMNIROUTE_API_KEY}` — ba a taɓa rubuta shi a faifai ba.
>
> A OpenCode v2, yi amfani da `@omniroute/opencode-plugin-v2` a maimakonsa: kundin bayanai iri ɗaya,
> amma ƙa'idar loader ta bambanta. Yana karanta maɓallin daga ma'ajiyar bayanan shaidar OpenCode
> lokacin da aka haɗa haɗin, don haka gateway na nesa ba ya buƙatar maɓalli ko kaɗan a cikin
> `opencode.json`.

---

## Sarrafa contexts (sauyawa tsakanin servers)

**context** shi ne server da aka adana (baseUrl + credential + scope). `omniroute connect`
yana ƙirƙirar ɗaya kuma ya mai da shi mai aiki; daga nan gaba kowane command yana nufarsa. Sarrafa
kuma sauya tsakaninsu da `omniroute contexts`:

```bash
omniroute contexts list            # duk contexts; ana yi wa mai aiki alamar ●
omniroute contexts current         # server mai aiki, matsayin auth, scope
```

```text
  | Suna    | Base URL                  | Auth  | Scope | Bayani
● | vps     | http://100.67.86.91:20128 | token | admin | OmniRoute na nesa (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Sauya servers** — duk command da zai biyo baya yana bin context mai aiki:

```bash
omniroute contexts use vps         # → yanzu duk commands suna zuwa VPS na nesa
omniroute tokens list              #   (yana aiki a kan VPS)

omniroute contexts use default     # → komawa localhost
omniroute tokens list              #   (yana aiki a kan server na gida)
```

**Ƙara context da hannu** (maimakon `connect`), bincika, ko sake masa suna:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "akwatin staging"
omniroute contexts show staging    # cikakkun bayanai na context guda
omniroute contexts rename staging stg
```

**Cire context** — yana neman tabbaci; sanya `--yes` don tsallake shi
(ana buƙatarsa ga scripts / shells marasa hulɗa, waɗanda in ba haka ba za su ƙi cikin aminci):

```bash
omniroute contexts remove stg --yes
```

> Ba za a iya cire `default` (localhost) ba. Cire context mai aiki yana mayarwa
> zuwa `default`. Shawara: cire context yana share **local** credential da aka adana ne kawai —
> soke token ɗin a server da `omniroute tokens revoke <id>` domin a zahiri
> dakatar da damar shiga.

**Fitarwa / shigarwa** na contexts (misali, don matsar da su tsakanin na'urori). Sabbin contexts suna adana
keychain reference kawai; ba a kwafe credentials cikin export idan OS
keychain yana samuwa:

```bash
omniroute contexts export --out contexts.json     # tsoho: stdout
omniroute contexts import contexts.json            # sake rubutawa; --merge don riƙe waɗanda suke akwai
omniroute contexts migrate --yes                  # matsar da tsoffin plaintext tokens zuwa keychain
```

A kan systems marasa allon sarrafawa waɗanda ba su da OS keychain mai aiki, CLI yana koma wa
`config.json` mai mode `0600` kuma yana nuna gargaɗi sau ɗaya. Ɗauki exports daga
wannan fallback (da duk wani tsohon config kafin migration) a matsayin bayanan sirri.

---

## Gwajin gaggawa daga farko zuwa ƙarshe

Tsarin rayuwa da za a iya kwafa a liƙa don tabbatar da remote setup daga tushe — haɗawa, ƙirƙirar
token mai iyakantaccen scope, aika command, komawa baya, sannan rushewa. Sauya
`192.168.0.15` da host/IP na server ɗinka (Tailscale, LAN, ko public
`https://…` URL).

```bash
# 1. Haɗa (password → admin token, an adana shi a matsayin context wanda zai zama mai aiki)
omniroute connect 192.168.0.15                 # ko: --key oma_live_xxxx  (ba password)
omniroute contexts current                     # yana nuna remote server + scope

# 2. Yi amfani da shi — yanzu management commands suna aiki a kan remote
omniroute tokens create --name laptop --scope read   # ƙirƙiri token mai ƙunƙuntar scope
omniroute tokens list                                 # jerin da aka ɓoye, daga remote

# 3. Sauya gaba da baya
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → sake komawa remote (suna daga `contexts list`)

# 4. Rushe. LURA: `contexts remove` yana share LOCAL credential kawai —
#    BA ya soke token ɗin a server. Da farko ka soke shi a server idan kana
#    son a zahiri ka dakatar da damar shiga.
omniroute tokens revoke <id|prefix>            # yana dakatar da damar shiga server
omniroute contexts remove 192-168-0-15 --yes   # cire local context (ko da yana aiki → yana komawa default), babu tambaya
```

> `--yes` yana sa `contexts remove` ya yi aiki ba tare da hulɗa ba (ana buƙatarsa a scripts/CI; idan babu
> shi, shell marar hulɗa zai ƙi cikin aminci maimakon ya maƙale). Cire
> context **mai aiki** yana mayarwa zuwa `default` kai tsaye.

---

## Bayanan tsaro

- Ana nuna token ɗin a rubutun bayyane sau ɗaya kawai; hash na SHA-256 kaɗai ake adanawa (kamar maɓallan API).
- `omniroute connect` yana sake amfani da kullewar yunƙurin shiga da ƙarfi + rubuta bayanan binciken tsaro.
- An fi son HTTPS ko Tailnet don jigilar bayanai; adireshin host kaɗai yana amfani da `http://`
  ta tsohuwa don sauƙaƙa amfani da LAN/Tailscale — miƙa cikakken URL na `https://…` don TLS.
- Fayil ɗin mahallin gida da aka fi so shi ne `~/.omniroute/config.json` (`chmod 600`)
  wanda ke ɗauke da `credentialRef` kawai; token ɗin kansa ana adana shi a ma'ajiyar
  maɓallan OS (`keytar`) kuma ba a taɓa buga shi a cikin rajista ba. Shigarwa marasa
  mu'amala waɗanda ba su da ma'ajiyar maɓallan asali mai aiki suna amfani da wannan
  fayil ɗin `0600` a matsayin mafita ta gaggawa da aka bayyana, sannan su fitar da
  gargaɗi sau ɗaya. Yi amfani da `omniroute contexts migrate --yes` bayan shigar da
  tsarin ma'ajiyar maɓallan.

---

## Wuraren ƙarshen API (manazarta)

| Hanya  | Route                 | Tantancewa              | Iyaka                                     |
| ------ | --------------------- | ----------------------- | ----------------------------------------- |
| POST   | `/api/cli/connect`    | kalmar sirrin gudanarwa | — (na jama'a, an killace da kalmar sirri) |
| GET    | `/api/cli/whoami`     | token na samun dama     | karantawa                                 |
| GET    | `/api/cli/tokens`     | token na samun dama     | gudanarwa                                 |
| POST   | `/api/cli/tokens`     | token na samun dama     | gudanarwa                                 |
| DELETE | `/api/cli/tokens/:id` | token na samun dama     | gudanarwa                                 |

Duba [openapi.yaml](../openapi.yaml) don cikakkun tsare-tsare.
