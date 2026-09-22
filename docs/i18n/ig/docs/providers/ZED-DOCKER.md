# Zed IDE Integration in Docker Environments (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Mgbe OmniRoute na-arụ ọrụ n'ime Docker, usoro ọkọlọtọ nke "Import from Zed Keychain" anaghị arụ ọrụ
n'ihi na container enweghị ike iru daemon keychain nke OS host (`libsecret` na Linux,
Keychain na macOS, Credential Manager na Windows), ebe ndekọ nhazi Zed dị na
filesystem host anaghịkwa apụta n'ime container na ndabara.

## Ihe Mere Mbubata Keychain Ji Ada na Docker

Nsogbu abụọ na-egbochi ọrụ na-eme n'ime container:

1. **Nkewapụ filesystem** — `isZedInstalled()` na-achọ `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), ma ọ bụ ụzọ kwekọrọ na ya na Windows. Ụzọ ndị a
   dị na host, ha agaghị adịkwa ma ọ bụrụ na ejighị volume kpọmkwem tinye ha.
2. **Nkewapụ IPC** — Ọbụna mgbe etinyere ndekọ nhazi ahụ, modul native `keytar`
   na-ekwurịta okwu na ọrụ keychain nke OS site na socket Unix ma ọ bụ session D-Bus.
   Ejikọtaghị nke ọ bụla n'ime ha na container na ndabara, ya mere ịgụ credential na-ada mgbe niile.

OmniRoute na-achọpụta gburugburu Docker site na heuristic abụọ:

- Ọdịdị nke `/.dockerenv` (nke daemon Docker na-ede mgbe container malitere).
- Eriri `docker` pụtara na `/proc/1/cgroup` (Linux cgroup v1).

Mgbe nke ọ bụla n'ime heuristic ndị a kpaliri, route mbubata na-eweghachi HTTP 422 ya na
`zedDockerEnvironment: true` na ozi na-eduzi gị gaa na taabụ Manual Token Import.

## Iji Taabụ Manual Token Import

1. Mepee **Dashboard → Providers → Zed**.
2. Panel **Manual Token Import** na-apụta n'okpuru kaadị mbubata keychain. Mgbe
   OmniRoute chọpụtara Docker, panel a na-agbasawanye na-akpaghị aka mgbe mbọ mbụ
   nke mbubata keychain dara.
3. Họrọ provider site na dropdown (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, ma ọ bụ DeepSeek).
4. Tapawa API key n'ọhịa password.
5. Pịa **Import**.

A na-echekwa key ahụ dịka njikọ provider ọhụrụ nke nwere aha
`Zed Manual Import (<provider>)`.

## Ebe Zed Na-echekwa API Keys na Host

Zed na-echekwa key nke provider AI na keychain OS n'okpuru aha service dịka
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, wdg. Iji wepụta ha maka mbubata
aka, lee n'ime:

**Linux**

```
~/.config/zed/settings.json
```

Akụkụ `language_models` nwere nhazi provider. Key ndị echekwara na
keychain site na UI Zed anọghị dịka ederede nkịtị na `settings.json`; wepụta ha site na
ihe nlele keychain dịka GNOME Keyring / Seahorse, ma ọ bụ site n'ịgba:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Enwere ike ịchọta ntinye keychain na **Keychain Access.app** site n'ịchọ `zed`.

## Nhọrọ Volume-Mount (Nke Ndị Ọkachamara)

Ị nwere ike ịhọrọ itinye ndekọ nhazi Zed n'ime container dịka read-only.
Nke a anaghị edozi nsogbu keychain, mana ọ nwere ike ịba uru maka atụmatụ n'ọdịnihu ndị na-agụ
uru nhazi Zed na-abụghị ihe nzuzo (dịka mmasị model).

```yaml
# Iberibe docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (wepụ akara comment kama nke dị n'elu)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # N'ọdịnihu: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Rịba ama: emebeghị override nke environment variable `ZED_CONFIG_PATH`. E nyere
iberibe a dịka ntụaka maka mgbe agbakwunyere atụmatụ ahụ.

## API Mbubata Aka

A pụkwara ịkpọ endpoint mbubata aka ozugbo:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Key OpenAI Zed m"   // nke a abụghị iwu
}
```

Mgbe ọ gara nke ọma, ọ na-eweghachi:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Nchọpụta na Ndozi Nsogbu

| Ihe Mgbaàmà                        | Ihe Kpatara Ya              | Ndozi                              |
| ---------------------------------- | --------------------------- | ---------------------------------- |
| 422 + `zedDockerEnvironment: true` | Ọ na-arụ ọrụ n'ime Docker   | Jiri taabụ Manual Token Import     |
| 404 + `zedInstalled: false`        | Awụnyeghị Zed na host       | Wụnye Zed ma ọ bụ jiri mbubata aka |
| 403 + ajụrụ ohere keychain         | OS jụrụ ohere keychain      | Nye ikike na prompt OS             |
| 404 + ọrụ keychain adịghị          | `libsecret` adịghị na Linux | Wụnye `libsecret-1-dev`            |
