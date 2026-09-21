# Kiro Setup Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Sinasaklaw ng gabay na ito ang pagdaragdag ng mga Kiro account (AI coding assistant na hino-host ng AWS) sa OmniRoute,
na nakatuon sa sabay-sabay na pagpapatakbo ng maraming account nang walang mga salungatan sa session.

---

## Background: Bakit Maaaring Magkasalungat ang mga Kiro Account

Gumagamit ang backend ng Kiro ng mga pagpaparehistro ng AWS SSO OIDC client upang subaybayan ang mga aktibong session.
Ang mahalagang limitasyon: **isang aktibong session lamang sa bawat pagkakataon ang sinusuportahan
ng bawat pagpaparehistro ng OIDC client**. Kapag nag-authenticate ang pangalawang device o user gamit ang parehong
nakarehistrong client, pinapawalang-bisa ng backend ang refresh token ng unang account.

Ito rin ang mekanismong nagdudulot ng mga problema kapag pinapatakbo ang `kiro-cli login` sa isang
machine kung saan naka-sign in na ang isa pang Kiro account — binabawi ng bagong login ang
token ng unang account.

---

## Paano Ito Nilulutas ng OmniRoute (v3.8.0+)

Simula sa v3.8.0, tinatawag ng OmniRoute ang `registerClient()` (AWS SSO OIDC) sa bawat
pag-import ng Kiro connection. Binibigyan nito ang bawat OmniRoute connection ng sarili nitong nakalaang pagpaparehistro ng OIDC
client. Dahil magkakahiwalay ang bawat pagpaparehistro ng client, ang pag-refresh o
muling pag-authenticate ng isang account ay hindi nakaaapekto sa refresh token ng iba pang account.

Nalalapat ang paghihiwalay sa mga paraan ng pag-import ng refresh token, at ganap na iniiwasan ng
API-key authentication ang mga OIDC refresh session:

| Paraan ng pag-import                                      | Katayuan ng paghihiwalay                                                                                   |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC device-code flow                     | Nakahiwalay mula nang ipakilala ang device-code flow                                                       |
| **Import Token** (manu-manong pag-paste ng refresh token) | Nakahiwalay mula v3.8.0                                                                                    |
| **Google / GitHub social login**                          | Nakahiwalay mula v3.8.0                                                                                    |
| **Auto-Import** (kiro-cli SQLite)                         | Nakahiwalay mula v3.8.0 (nakahiwalay na ang SQLite path; nakahiwalay na rin ngayon ang SSO-cache fallback) |
| **API Key** (pangmatagalang CodeWhisperer key)            | Walang refresh session; bina-validate at iniimbak ang key bilang bearer credential                         |

---

## Paalala sa Pag-migrate para sa mga Connection na Ginawa Bago ang v3.8.0

Ang mga connection na na-import bago ang v3.8.0 ay walang nakalaang pagpaparehistro ng OIDC client
na nakaimbak sa `providerSpecificData`. Patuloy na gagana ang mga connection na ito ngunit ginagamit nila ang pinagsasaluhang
social-auth refresh endpoint, na nangangahulugang maaari pa ring mapawalang-bisa ng dalawang ganitong connection ang refresh token ng
isa't isa.

**Upang magkaroon ng paghihiwalay:** tanggalin ang lumang connection mula sa **Dashboard → Providers** at
muli itong i-import gamit ang alinman sa mga sinusuportahang import flow. Awtomatikong makatatanggap
ang lahat ng bagong connection ng sarili nilang pagpaparehistro ng client.

---

## Pagdaragdag ng Dalawang Kiro Account nang Magkatabi

### Mga Kinakailangan

- OmniRoute v3.8.0 o mas bago.
- Isang gumaganang Kiro account (email + password, Google, o GitHub login).
- Opsyonal na pangalawang Kiro account.

### Hakbang 1: I-import ang unang account

1. Buksan ang **Dashboard → Providers → Add Provider → Kiro**.
2. Pumili ng isa sa mga sumusunod:
   - **Import Token** — mag-paste ng refresh token na nagsisimula sa `aorAAAAAG`.
   - **API Key** — mag-paste ng pangmatagalang Kiro / CodeWhisperer API key.
   - **Google / GitHub login** — kumpletuhin ang OAuth flow sa browser.
   - **Auto-Import** — i-click ang button; binabasa ng OmniRoute ang mga credential mula sa
     lokal na kiro-cli database o `~/.aws/sso/cache`.
3. Sine-save ang connection. Awtomatikong nagrerehistro ang mga refresh-token flow ng nakalaang
   OIDC client. Bina-validate ng mga API-key flow ang key sa AWS at hindi nag-iimbak ng refresh token.

### Hakbang 2: I-import ang pangalawang account

Ulitin ang hakbang 1 para sa pangalawang account. Dahil gumagawa ang bawat pag-import ng hiwalay na pagpaparehistro ng OIDC
client, ganap na nakahiwalay ang dalawang connection.

### Hakbang 3: Tiyaking aktibo ang parehong connection

1. **Dashboard → Providers** — dapat ipakita ng parehong Kiro connection ang katayuang **Active**.
2. **Dashboard → Health** — dapat makapasa ang parehong connection sa kani-kanilang token health check.

### Hakbang 4: Gumamit ng combo upang mag-route sa pagitan ng mga account

Gumawa ng combo na may parehong connection bilang mga target upang mag-load-balance o mag-fallback sa pagitan ng mga ito:

```
kiro/kiro-dev → kiro/kiro-pro
```

Tingnan ang [FEATURES.md](./FEATURES.md) at ang dokumentasyon sa routing para sa configuration ng combo.

---

## Mga Enterprise / IDC User

Para sa mga AWS IAM Identity Center (IDC) account, gamitin ang daloy ng **AWS Builder ID / IDC device-code**
mula sa **Dashboard → Providers → Kiro → Device Code**. Ang daloy ng device-code ay
palaging ganap na nakahiwalay. Hindi kailangang muling i-import ang mga koneksyong ito.

Maaaring tukuyin ng mga enterprise user na gumagamit sa isang hindi default na AWS region ang region kapag
nag-i-import sa pamamagitan ng Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Magde-default ang field na `region` sa `us-east-1` kapag hindi ito isinama.

---

## Daloy ng Pag-import gamit ang API Key

Ang pagpapatunay gamit ang API key ay para sa mga pangmatagalang Kiro / AWS CodeWhisperer bearer credential. Hindi ito
gumagamit ng OAuth refresh, kaya naiiwasan nito ang pagpapawalang-bisa sa nakabahaging OIDC session.

### Dashboard

1. Buksan ang **Dashboard -> Providers -> Kiro**.
2. Piliin ang **API Key**.
3. I-paste ang API key at opsyonal na AWS region (`us-east-1` bilang default).
4. Vina-validate ng OmniRoute ang key at sine-save ang koneksyon.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Panloob na Kontrata

Vina-validate ng API route ang key sa pamamagitan ng pagtawag sa `KiroService.validateApiKey()`, na
gumagamit ng `ListAvailableProfiles` laban sa CodeWhisperer/Amazon Q
endpoint na tumutugma sa region at tinutukoy ang isang `profileArn`.

Ginagamit ng naka-save na koneksyon ang:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Sa runtime, ipinapadala ng `KiroExecutor.buildHeaders()` ang key bilang
`Authorization: Bearer <key>` at idinaragdag ang `tokentype: API_KEY`. Ginagamit ng mga quota/profile call
ang parehong marker upang ituring ng AWS ang bearer bilang isang pangmatagalang API key sa halip na
isang OIDC o social access token.

---

## Pag-expire ng OIDC Client

Karaniwang nag-e-expire ang mga AWS SSO OIDC public client pagkalipas ng 90 araw
(`clientSecretExpiresAt`). Iniimbak ng OmniRoute ang timestamp na ito sa `providerSpecificData`
para sa observability. Kung huminto sa pag-refresh ang isang koneksyon pagkalipas ng humigit-kumulang 90 araw, muling i-import ang
koneksyon upang makakuha ng bagong OIDC client registration. Ang awtomatikong muling pagpaparehistro kapag
nag-expire ay sinusubaybayan bilang pagpapahusay sa hinaharap.

Walang OIDC client expiry ang mga koneksyong gumagamit ng API key dahil hindi nagre-refresh ang mga ito
sa pamamagitan ng AWS SSO OIDC.

---

## Pag-troubleshoot

### Patuloy na nala-log out ang pangalawang account

- Suriin ang parehong koneksyon sa **Dashboard → Providers** at kumpirmahing ang bawat isa ay nagpapakita ng hindi null na
  `clientId` sa raw JSON nito (makikita sa pamamagitan ng info icon). Kung walang
  `clientId` ang alinmang koneksyon, na-import ito bago ang v3.8.0 — muling i-import ito.

### Nabigo ang pag-import dahil sa "Token validation failed"

- Tiyaking nagsisimula sa `aorAAAAAG` ang refresh token.
- Tiyaking maaabot ng OmniRoute ang `https://oidc.us-east-1.amazonaws.com` (o ang naka-configure na
  region). Kung nasa likod ka ng corporate proxy, magtakda ng provider-level proxy sa
  **Dashboard → Settings → Proxies**.

### Nabigo ang pag-import gamit ang API key

- Kumpirmahing ang key ay isang Kiro / CodeWhisperer API key, at hindi isang refresh token.
- Kumpirmahing tumutugma ang AWS region sa key/account. `us-east-1` ang default.
- Dapat na matawag ng key ang `ListAvailableProfiles`; kung hindi, hindi
  matutukoy ng OmniRoute ang kinakailangang `profileArn`.

Para sa iba pang isyu, tingnan ang pangunahing [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
