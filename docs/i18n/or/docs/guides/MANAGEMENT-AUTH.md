# Management Authentication (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ରେ **ଚାରୋଟି କ୍ରେଡେନ୍ସିଆଲ୍ ପରିବାର** ଅଛି ଯାହା ପରିଚାଳନା ରୁଟ୍ଗୁଡ଼ିକୁ ଅନୁମତି ଦେଇପାରିବ।
ସେଗୁଡ଼ିକ ପରସ୍ପର ବଦଳରେ ବ୍ୟବହାର ହୋଇପାରିବେ ନାହିଁ। Inference API କି'ଗୁଡ଼ିକ (`sk-…`) ସର୍ଭରକୁ ପରିଚାଳନା କରନ୍ତି ନାହିଁ, ଯେପର୍ଯ୍ୟନ୍ତ ସେମାନଙ୍କୁ ସ୍ପଷ୍ଟ ଭାବରେ `manage` କିମ୍ବା `admin` ସ୍କୋପ୍ ଦିଆଯାଇ ନଥାଏ।

କାନୋନିକାଲ୍ ଇମ୍ପ୍ଲିମେଣ୍ଟେସନ୍: `src/lib/api/requireManagementAuth.ts`।

| କ୍ରେଡେନ୍ସିଆଲ୍          | ସାଧାରଣ ଫର୍ମ                             | କେଉଁଠାରେ ସୃଷ୍ଟି ହୁଏ                                    | ଉଦ୍ଦିଷ୍ଟ ବ୍ୟବହାର            | ପରିଚାଳନା କ୍ଷମତା                                                                      |
| ---------------------- | --------------------------------------- | ------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------ |
| ଡ୍ୟାସବୋର୍ଡ JWT ସେସନ୍   | `auth_token` କୁକି                       | ଡ୍ୟାସବୋର୍ଡ ଲଗଇନ୍                                       | ବ୍ରାଉଜର୍ UI                 | CSRF, ଲୋକାଲିଟି, ଏବଂ ସର୍ବଦା-ସୁରକ୍ଷିତ-ରୁଟ୍ ନିୟମ ଅନୁଯାୟୀ ସମ୍ପୂର୍ଣ୍ଣ ଡ୍ୟାସବୋର୍ଡ ପରିଚାଳନା |
| CLI ମେସିନ୍-ଆଇଡି ଟୋକେନ୍ | ଆଭ୍ୟନ୍ତରୀଣ / ସ୍ଥାନୀୟ                    | CLI ବୁଟଷ୍ଟ୍ରାପ୍ (`omniroute` ସମାନ ମେସିନରେ)             | ସ୍ଥାନୀୟ CLI                 | କେବଳ ସ୍ଥାନୀୟ ପରିଚାଳନା                                                                |
| ସ୍କୋପ୍ଡ ଆକ୍ସେସ୍ ଟୋକେନ୍ | `oma_live_…`                            | **ସେଟିଂସ → ଆକ୍ସେସ୍ ଟୋକେନ୍** କିମ୍ବା `omniroute connect` | ରିମୋଟ୍ CLI ଏବଂ ପରିଚାଳନା API | ରୁଟ୍ର ଆବଶ୍ୟକ `read`, `write`, କିମ୍ବା `admin` ସ୍କୋପ୍ ପୂରଣ କରିବା ଆବଶ୍ୟକ                |
| Inference API କି'      | `sk-…` (ଏବଂ ଅନ୍ୟାନ୍ୟ API-କି' ପ୍ରିଫିକ୍ସ) | **API ମ୍ୟାନେଜର୍ / API କି'ଗୁଡ଼ିକ**                      | `/v1/*` inference           | **କିଛି ନାହିଁ** ଯେପର୍ଯ୍ୟନ୍ତ କି' ମେଟାଡାଟାରେ `manage` କିମ୍ବା `admin` ଅନ୍ତର୍ଭୁକ୍ତ ନଥାଏ   |

`oma_` କ୍ରେଡେନ୍ସିଆଲ୍ଗୁଡ଼ିକ ପରିଚାଳନା/CLI କ୍ରେଡେନ୍ସିଆଲ୍ ଅଟନ୍ତି। ସେଗୁଡ଼ିକ Inference API କି' ନୁହଁନ୍ତି।

ଯଦି ସର୍ଭର ପାଇଁ ଲଗଇନ୍/API-କି' ଅଥେଣ୍ଟିକେସନ୍ ଅକ୍ଷମ ହୋଇଛି, ତେବେ କିଛି ପରିଚାଳନା ରୁଟ୍ ଅଣ-ପ୍ରମାଣିତ କଲ୍ ଗ୍ରହଣ କରିପାରନ୍ତି। କେବଳ ସ୍ଥାନୀୟ ଏବଂ ସର୍ବଦା-ସୁରକ୍ଷିତ ରୁଟ୍ଗୁଡ଼ିକ ସେମାନଙ୍କର ନିଜସ୍ୱ ନିୟମ ପ୍ରୟୋଗ କରନ୍ତି। ତେଣୁ ଏହି କ୍ରେଡେନ୍ସିଆଲ୍ଗୁଡ଼ିକ ମଧ୍ୟରୁ ଗୋଟିଏ ଉପସ୍ଥାପନ କରିବା ସର୍ବଦା ବାଧ୍ୟତାମୂଳକ ନୁହେଁ, ଏବଂ ଆବଶ୍ୟକ ସ୍କୋପ୍ ଏବଂ ରୁଟ୍ ଲୋକାଲିଟି ବିନା ଗୋଟିଏ ରଖିବା ସର୍ବଦା ଯଥେଷ୍ଟ ନୁହେଁ।

ସମ୍ବନ୍ଧିତ: [ରିମୋଟ୍ ମୋଡ୍](./REMOTE-MODE.md) (କିପରି `oma_live_…` ଏକ ରିମୋଟ୍ CLI ପାଇଁ ମିଣ୍ଟ୍ କରାଯାଏ)।

---

## ସ୍କୋପ୍ ମାଟ୍ରିକ୍ସ

API-କି' ପରିଚାଳନା ସ୍କୋପ୍ ଏବଂ ଆକ୍ସେସ୍-ଟୋକେନ୍ ସ୍କୋପ୍ ଭିନ୍ନ ଶବ୍ଦାବଳୀ ଅଟନ୍ତି।
MCP ଟୁଲ୍ ସ୍କୋପ୍ ଏକ ତୃତୀୟ ଶବ୍ଦାବଳୀ, ଯାହା ନିମ୍ନରେ ଥିବା ଟେବୁଲ୍ରେ ଥିବା କୌଣସି ଫଙ୍କସନ୍ ବଦଳରେ `scopeMatches` ସହିତ ଯାଞ୍ଚ କରାଯାଏ। ପାଖାପାଖି:
[ତିନୋଟି ସ୍କୋପ୍ ନାମସ୍ପେସ୍](../frameworks/MCP-SERVER.md#three-scope-namespaces)।

### ଆକ୍ସେସ୍ ଟୋକେନ୍ ସ୍କୋପ୍ (`oma_live_…`)

| ସ୍କୋପ୍  | ସାଧାରଣ କାର୍ଯ୍ୟଗୁଡ଼ିକ                                                          |
| ------- | ----------------------------------------------------------------------------- |
| `read`  | ତାଲିକା/ସ୍ଥିତି GETs ଯାହା ଟୋକେନ୍ ଦେଖିବାକୁ ଅନୁମତିପ୍ରାପ୍ତ                         |
| `write` | ଆଡମିନ୍ ତଳେ ମ୍ୟୁଟେସନ୍ (ସୃଷ୍ଟି/ଅପଡେଟ୍/ଡିଲିଟ୍)                                   |
| `admin` | ସମ୍ପୂର୍ଣ୍ଣ ରିମୋଟ୍ CLI / କନେକ୍ଟ ଟୋକେନ୍ (ପାସୱାର୍ଡ ବୁଟଷ୍ଟ୍ରାପ୍ ଏଠାରେ ଡିଫଲ୍ଟ ହୁଏ) |

`read` ସହିତ ଏକ ଟୋକେନ୍ `write` ରୁଟ୍କୁ କଲ୍ କରିପାରିବ ନାହିଁ। ରନ୍ଟାଇମ୍ ମେସେଜ୍ ଆକୃତି:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-କି' ପରିଚାଳନା ସ୍କୋପ୍

| ସ୍କୋପ୍       | ଅର୍ଥ                                                                        |
| ------------ | --------------------------------------------------------------------------- |
| (କିଛି ନାହିଁ) | କେବଳ Inference। ପରିଚାଳନା ରୁଟ୍ 403 ଫେରାଇଥାଏ।                                 |
| `manage`     | ପରିଚାଳନା API (`requireManagementAuth` API-କି' ଶାଖା ସହିତ ସମାନ ଗେଟ୍)          |
| `admin`      | `hasManageScope` କୁ ମଧ୍ୟ ସନ୍ତୁଷ୍ଟ କରେ (ପରିଚାଳନା-ସକ୍ଷମ ଭାବରେ ବିବେଚନା କରାଯାଏ) |

API କି' / API ମ୍ୟାନେଜର୍ UI ରେ କି' ଉପରେ `manage` ସକ୍ଷମ କରନ୍ତୁ। ଯଦି ଆପଣ ଜାଣିଶୁଣି ସେହି ସ୍କୋପ୍ ପ୍ରଦାନ କରି ନାହାଁନ୍ତି ତେବେ ଅଟୋମେସନ୍ ପାଇଁ ଏକ ଚାଟ୍ କ୍ଲାଏଣ୍ଟ କି' ପୁନଃ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।

---

## କିପରି ସୃଷ୍ଟି କରିବେ ଏବଂ ରଦ୍ଦ କରିବେ

### ଡ୍ୟାସବୋର୍ଡ JWT ସେସନ୍

1.  `/login` ଖୋଲନ୍ତୁ, ମ୍ୟାନେଜମେଣ୍ଟ ପାସୱାର୍ଡ (`INITIAL_PASSWORD` ପ୍ରଥମ ବୁଟ୍ ସମୟରେ) ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ।
2.  କୁକି `auth_token` ହେଉଛି HttpOnly। ବ୍ରାଉଜର୍ ଡ୍ୟାସବୋର୍ଡ ଏହାକୁ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ବ୍ୟବହାର କରେ।
3.  `/api/auth/logout` ମାଧ୍ୟମରେ ଲଗ୍ ଆଉଟ୍ କରନ୍ତୁ। କପି କରିବା ପାଇଁ କୌଣସି ଦୀର୍ଘକାଳୀନ ସିକ୍ରେଟ୍ ନାହିଁ।

### CLI ମେସିନ୍-ଆଇଡି ଟୋକେନ୍

1.  ସର୍ଭର (ଲୁପବ୍ୟାକ୍) ସହିତ **ସମାନ ହୋଷ୍ଟ** ରେ `omniroute` ଚଲାନ୍ତୁ।
2.  CLI `~/.omniroute/` ତଳେ ଏକ ମେସିନ୍-ଆଇଡି ଟୋକେନ୍ ବୁଟଷ୍ଟ୍ରାପ୍ କରେ (chmod 600)।
3.  ଏହା ଅନ୍ୟ ମେସିନରୁ କାମ କରେ **ନାହିଁ**। ରିମୋଟ୍ CLI ପାଇଁ ଏକ ଆକ୍ସେସ୍ ଟୋକେନ୍ ବ୍ୟବହାର କରନ୍ତୁ।

### ସ୍କୋପ୍ଡ ଆକ୍ସେସ୍ ଟୋକେନ୍ (`oma_live_…`)

1.  ଡ୍ୟାସବୋର୍ଡ: **ସେଟିଂସ → ଆକ୍ସେସ୍ ଟୋକେନ୍ସ** → ସୃଷ୍ଟି କରନ୍ତୁ (ନାମ + ସ୍କୋପ୍)। **ସିକ୍ରେଟ୍ ଥରେ ଦେଖାଯାଏ।**
2.  କିମ୍ବା CLI: `omniroute connect <host>` (ପାସୱାର୍ଡ → ଟୋକେନ୍)। [ରିମୋଟ୍ ମୋଡ୍](./REMOTE-MODE.md) ଦେଖନ୍ତୁ।
3.  ହେଡର୍: `Authorization: Bearer oma_live_…`
4.  ସମାନ ଆକ୍ସେସ୍ ଟୋକେନ୍ସ ପୃଷ୍ଠାରୁ ରଦ୍ଦ କରନ୍ତୁ (କିମ୍ବା CLI କଣ୍ଟେକ୍ସଟ୍ ଡିଲିଟ୍ କରନ୍ତୁ)।
5.  ସର୍ଭର କେବଳ ଏକ ହ୍ୟାସ୍ ସଂରକ୍ଷଣ କରେ। ପ୍ଲେନ୍ଟେକ୍ସଟ୍ କୁ ଏକ ପାସୱାର୍ଡ ପରି ବ୍ୟବହାର କରନ୍ତୁ।

### ମ୍ୟାନେଜ୍-ସ୍କୋପ୍ଡ API କି

1.  ଡ୍ୟାସବୋର୍ଡ: **API ମ୍ୟାନେଜର୍ / API କିଜ୍** → ଏକ କି ସୃଷ୍ଟି କରନ୍ତୁ କିମ୍ବା ଏଡିଟ୍ କରନ୍ତୁ → `manage` (କିମ୍ବା `admin`) ସକ୍ଷମ କରନ୍ତୁ।
2.  ହେଡର୍: `Authorization: Bearer sk-…` (କି'ର ପ୍ରକୃତ ପ୍ରିଫିକ୍ସ)।
3.  ସମାନ UI ରେ `manage` ରଦ୍ଦ କରନ୍ତୁ କିମ୍ବା ହଟାନ୍ତୁ।
4.  CLI ନଥିବା ଅଟୋମେସନ୍ ପାଇଁ ସର୍ବନିମ୍ନ ସୁବିଧା: GET-କେବଳ କାର୍ଯ୍ୟ ପାଇଁ ଏକ `read` ଆକ୍ସେସ୍ ଟୋକେନ୍ ପସନ୍ଦ କରନ୍ତୁ; କଲର୍ ଯେତେବେଳେ `/v1` ଏବଂ ମ୍ୟାନେଜମେଣ୍ଟ୍ ସହିତ କଥା ହେବା ଆବଶ୍ୟକ କରେ, ସେତେବେଳେ କେବଳ ଏକ API କି ଉପରେ `manage` ବ୍ୟବହାର କରନ୍ତୁ।

---

## ହେଡର୍ ଫର୍ମାଟ୍

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

URL ପାଥ୍ କିମ୍ବା କ୍ୱେରୀ ଷ୍ଟ୍ରିଙ୍ଗରେ ମ୍ୟାନେଜମେଣ୍ଟ୍ କ୍ରେଡେନ୍ସିଆଲ୍ ରଖନ୍ତୁ ନାହିଁ। ମ୍ୟାନେଜମେଣ୍ଟ୍ ଅଥ୍ କେବଳ ହେଡର୍/କୁକି ଅଟେ।

---

## କପି-ପେଷ୍ଟ ଉଦାହରଣ

କେବଳ ପଢିବା (ପ୍ରୋଭାଇଡର୍ ତାଲିକାଭୁକ୍ତ କରନ୍ତୁ)। ଏକ `read` ଆକ୍ସେସ୍ ଟୋକେନ୍ ବ୍ୟବହାର କରନ୍ତୁ:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

ସଂଶୋଧନ କରିବା (ଏକ ପ୍ରୋଭାଇଡର୍ କନେକ୍ସନ୍ ସୃଷ୍ଟି କରନ୍ତୁ)। `write`/`admin` ଆକ୍ସେସ୍ ଟୋକେନ୍ କିମ୍ବା ଏକ ମ୍ୟାନେଜ୍-ସ୍କୋପ୍ଡ API କି ବ୍ୟବହାର କରନ୍ତୁ:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ଇନଫରେନ୍ସ (ମ୍ୟାନେଜମେଣ୍ଟ୍ ନୁହେଁ)। ସାଧାରଣ API କି, `manage` ଆବଶ୍ୟକ ନାହିଁ:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## ବର୍ତ୍ତମାନର ରନ୍ଟାଇମ୍ ତ୍ରୁଟି (ସିକ୍ରେଟ୍ସ ପ୍ରତିଧ୍ୱନିତ କରନ୍ତୁ ନାହିଁ)

| ପରିସ୍ଥିତି                                     | ସାଧାରଣ ସ୍ଥିତି | ବାର୍ତ୍ତା (ସାନିଟାଇଜ୍ଡ)                                                |
| :-------------------------------------------- | :------------ | :------------------------------------------------------------------- |
| କୌଣସି କ୍ରେଡେନ୍ସିଆଲ୍ ନାହିଁ                     | 401           | `Authentication required`                                            |
| ଅବୈଧ/ମିଆଦ ସରିଯାଇଥିବା `oma_live_…`             | 401           | `Invalid or expired access token`                                    |
| `manage`/`admin` ବିନା ବୈଧ API କି              | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| ଏକ ମ୍ୟାନେଜମେଣ୍ଟ୍ ରୁଟ୍ ଉପରେ ଅବୈଧ ସାଧାରଣ API କି | 403           | `Invalid management token`                                           |
| ଆକ୍ସେସ୍ ଟୋକେନ୍ ସ୍କୋପ୍ ବହୁତ କମ୍                | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

`Invalid management token` ର ଅର୍ଥ ହେଉଛି ବେୟରର୍ ଏକ ମ୍ୟାନେଜମେଣ୍ଟ୍ କ୍ରେଡେନ୍ସିଆଲ୍ ଭାବରେ ଗ୍ରହଣ କରାଯାଇ ନଥିଲା। ଏହା ଆପଣଙ୍କୁ କେଉଁ ଫ୍ୟାମିଲି ମିଣ୍ଟ୍ କରିବାକୁ ହେବ ତାହା କୁହେ **ନାହିଁ**। ଉପରୋକ୍ତ ଟେବୁଲ୍ ବ୍ୟବହାର କରନ୍ତୁ: ଇନଫରେନ୍ସ କି'ଗୁଡ଼ିକୁ `manage` ସ୍କୋପ୍ ଆବଶ୍ୟକ; ରିମୋଟ୍ CLI କୁ `oma_live_…` ଆବଶ୍ୟକ; ଡ୍ୟାସବୋର୍ଡ ସେସନ୍ କୁକି ବ୍ୟବହାର କରେ।

## ସର୍ବନିମ୍ନ-ସୁବିଧା ପାଇଁ ପସନ୍ଦ

| କଲର୍                                              | ବ୍ୟବହାର                                              |
| ------------------------------------------------- | ---------------------------------------------------- |
| ବ୍ରାଉଜର୍                                          | ଡ୍ୟାସବୋର୍ଡ ସେସନ୍                                     |
| ସର୍ଭର ହୋଷ୍ଟରେ CLI                                 | ମେସିନ୍ ଟୋକେନ୍                                        |
| ରିମୋଟ୍ ସର୍ଭର ସହିତ କଥାବାର୍ତ୍ତା କରୁଥିବା ଲାପଟପରେ CLI | `omniroute connect` ରୁ `oma_live_…`                  |
| CI / ସ୍କ୍ରିପ୍ଟ (କେବଳ ପରିଚାଳନା)                    | ସର୍ବନିମ୍ନ ସ୍କୋପ୍ ସହିତ `oma_live_…` ଯାହା କାର୍ଯ୍ୟ କରେ  |
| CI ଯାହାକୁ `/v1` ଏବଂ `/api` ଉଭୟକୁ କଲ୍ କରିବାକୁ ପଡିବ | `manage` ସହିତ API କି' **କିମ୍ବା** ଦୁଇଟି କ୍ରେଡେନ୍ସିଆଲ୍ |
