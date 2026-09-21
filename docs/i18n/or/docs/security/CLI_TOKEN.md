# CLI Machine-ID Token (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## ସାରାଂଶ

OmniRoute CLI କମାଣ୍ଡଗୁଡ଼ିକ ଅନୁରୋଧ ହେଡର୍
`x-omniroute-cli-token` ମାଧ୍ୟମରେ ପଠାଯାଇଥିବା ଏକ `HMAC-SHA256(machine-id, salt)`
ଟୋକେନ୍ ବ୍ୟବହାର କରି ସ୍ଥାନୀୟ ପରିଚାଳନା API ସହ ପ୍ରାମାଣୀକରଣ କରନ୍ତି।

ଏହା CLI ସବ୍କମାଣ୍ଡଗୁଡ଼ିକୁ (`omniroute status`, `omniroute providers`, ଇତ୍ୟାଦି)
ପ୍ରତ୍ୟେକ ଆହ୍ୱାନରେ ବ୍ୟବହାରକାରୀଙ୍କୁ JWT କିମ୍ବା ପାସୱାର୍ଡ ଯୋଗାଇବାର ଆବଶ୍ୟକତା ବିନା
ପରିଚାଳନା ଏଣ୍ଡପଏଣ୍ଟଗୁଡ଼ିକୁ କଲ୍ କରିବାକୁ ଅନୁମତି ଦିଏ।

## ଏହା କିପରି କାମ କରେ

1. `getMachineTokenSync()` ହାର୍ଡୱେର୍ ମେସିନ୍ ID-କୁ `node-machine-id`
   ମାଧ୍ୟମରେ ପଢ଼େ (ବିଫଳ ହେଲେ ଏକ ଖାଲି ଷ୍ଟ୍ରିଙ୍ଗ୍କୁ ଫେରିଯାଏ, ଯାହା CLI ପ୍ରାମାଣୀକରଣକୁ ଅକ୍ଷମ କରେ)।
2. ଏହା `HMAC-SHA256(machine_id, salt)` ଗଣନା କରେ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ 64-ଅକ୍ଷର ବିଶିଷ୍ଟ
   ହେକ୍ସ ଡାଇଜେଷ୍ଟ ଫେରାଏ — ଏହି ମେସିନ୍ ସହ ବନ୍ଧା ଏକ ନିର୍ଦ୍ଧାରଣୀୟ, ଅପ୍ରତ୍ୟାବର୍ତ୍ତନୀୟ ଟୋକେନ୍।
3. ସମାଧାନ କରାଯାଇଥିବା ଗନ୍ତବ୍ୟ ଏକ ସ୍ପଷ୍ଟ ଲୁପ୍ବ୍ୟାକ୍ URL (`localhost`, `127.0.0.0/8`, କିମ୍ବା
   ଲୁପ୍ବ୍ୟାକ୍ IPv6) ହୋଇଥିଲେ ମାତ୍ର CLI ଟୋକେନ୍ଟିକୁ `x-omniroute-cli-token` ଭାବେ ପଠାଏ।
   ଟୋକେନ୍ ବହନ କରୁଥିବା ଅନୁରୋଧଗୁଡ଼ିକ `redirect: error` ବ୍ୟବହାର କରନ୍ତି, ତେଣୁ ଏକ ସ୍ଥାନୀୟ
   ପୁନଃନିର୍ଦ୍ଦେଶ ଏହାକୁ ଅନ୍ୟ ଏକ ଉତ୍ସକୁ ଅଗ୍ରସର କରିପାରିବ ନାହିଁ। ତାହା ପରିବର୍ତ୍ତେ ରିମୋଟ୍ ପ୍ରସଙ୍ଗଗୁଡ଼ିକ
   ସୀମିତ-ପରିସରର ଆକ୍ସେସ୍ ଟୋକେନ୍ ବ୍ୟବହାର କରନ୍ତି। ଯଦି ଉତ୍ପାଦନ ଉପଲବ୍ଧ ନଥାଏ, CLI ହେଡର୍କୁ
   ବାଦ ଦିଏ ଏବଂ ଏକ ଖାଲି ଟୋକେନ୍କୁ ବୈଧ ଭାବେ ଗ୍ରହଣ କରିବା ପରିବର୍ତ୍ତେ `omniroute doctor`
   ବିଫଳତା ବିଷୟରେ ଜଣାଏ।
4. ସର୍ଭର୍ (`src/server/authz/policies/management.ts`) ସମାନ salt ସହିତ ଆଶାକରାଯାଇଥିବା
   ଟୋକେନ୍କୁ ପୁନଃଗଣନା କରେ ଏବଂ ସମୟ-ଆଧାରିତ ନିଷ୍କାସନକୁ ରୋକିବା ପାଇଁ `timingSafeEqual`
   ମାଧ୍ୟମରେ ତୁଳନା କରେ।

## ସୁରକ୍ଷା ଗୁଣାବଳୀ

| ଗୁଣ                                 | ବିବରଣୀ                                                                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **କେବଳ ଲୁପ୍ବ୍ୟାକ୍**                 | ସର୍ଭର୍ର ବିଶ୍ୱସ୍ତ ପିଅର୍-ସ୍ଥାନୀୟତା ଚିହ୍ନ (ପ୍ରକୃତ TCP ପିଅର୍ ଠିକଣାରୁ ଉତ୍ପନ୍ନ) ଲୁପ୍ବ୍ୟାକ୍ ବୋଲି ସୂଚାଇଲେ ମାତ୍ର ଗ୍ରହଣ କରାଯାଏ। ସ୍ଥାନୀୟତା ପାଇଁ କ୍ଲାଏଣ୍ଟ-ନିୟନ୍ତ୍ରିତ `Host` ହେଡର୍କୁ କେବେ ମଧ୍ୟ ବିଶ୍ୱାସ କରାଯାଏ ନାହିଁ। |
| **ସ୍ଥିର-ସମୟ ତୁଳନା**                 | `crypto.timingSafeEqual` ଟାଇମିଂ ଆକ୍ରମଣକୁ ପ୍ରତିରୋଧ କରେ।                                                                                                                                                  |
| **ଅପ୍ରତ୍ୟାବର୍ତ୍ତନୀୟ**               | HMAC ଆଉଟ୍ପୁଟ୍ରୁ machine-id ପୁନରୁଦ୍ଧାର କରାଯାଇପାରିବ ନାହିଁ।                                                                                                                                                |
| **`always`-ସୁରକ୍ଷିତ ବାଇପାସ୍ ନାହିଁ** | CLI ଟୋକେନ୍ ଯାଞ୍ଚ ପୂର୍ବରୁ `isAlwaysProtectedPath()` ମୂଲ୍ୟାୟନ କରାଯାଏ। `/api/shutdown` ଏବଂ `/api/settings/database` ପାଇଁ ସର୍ବଦା JWT ଆବଶ୍ୟକ।                                                                |
| **ରପ୍ତାନି-ଅଯୋଗ୍ୟ**                  | ଟୋକେନ୍କୁ କେବେ ମଧ୍ୟ ଡିସ୍କରେ ଲେଖାଯାଏ ନାହିଁ କିମ୍ବା ଲଗ୍ କରାଯାଏ ନାହିଁ।                                                                                                                                       |

## ଡିଫଲ୍ଟ salt (ପ୍ରତ୍ୟେକ ଇନ୍ଷ୍ଟଲେସନ୍ ପାଇଁ ଯାଦୃଚ୍ଛିକ)

ଯେତେବେଳେ `OMNIROUTE_CLI_SALT` ସେଟ୍ ହୋଇନଥାଏ, salt ହେଉଛି ଏକ ଯାଦୃଚ୍ଛିକ 64-ଅକ୍ଷର
ବିଶିଷ୍ଟ ହେକ୍ସ ଷ୍ଟ୍ରିଙ୍ଗ୍, ଯାହା ଥରେ ଉତ୍ପନ୍ନ ହୁଏ ଏବଂ `<DATA_DIR>/cli-token-salt.json`
(ମୋଡ୍ `0600`) ଠାରେ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ହୁଏ — ଚେକ୍-ଇନ୍ କରାଯାଇଥିବା ଲିଟେରାଲ୍
`omniroute-cli-auth-v1` ନୁହେଁ। `src/lib/machineToken.ts` ରେ ଥିବା
`getActiveSalt()` ଏବଂ `bin/cli/utils/cliToken.mjs` ରେ ଥିବା ଏହାର ପ୍ରତିରୂପ ଉଭୟ
ସମାନ ଫାଇଲ୍ ପଢ଼ନ୍ତି, ତେଣୁ ଏହି ଇନ୍ଷ୍ଟଲେସନ୍ର ସର୍ଭର୍ ଏବଂ ପ୍ରତ୍ୟେକ CLI ଆହ୍ୱାନ
ସମାନ ମୂଲ୍ୟରେ ଏକତ୍ରିତ ହୁଅନ୍ତି; କୌଣସି ସ୍ଥାୟୀ କିମ୍ବା env salt ଏପର୍ଯ୍ୟନ୍ତ ସ୍ଥାପିତ
ହୋଇପାରିନଥିବା ସମୟରେ (ଉଦାହରଣ ସ୍ୱରୂପ, ସର୍ଭର୍ କେବେ ଚାଲିନଥିବା ଏକ ନୂତନ କେବଳ-CLI
ଇନ୍ଷ୍ଟଲେସନ୍) ଚେକ୍-ଇନ୍ କରାଯାଇଥିବା ଲିଟେରାଲ୍କୁ କେବଳ ଶେଷ ଉପାୟ ଭାବେ ବ୍ୟବହାର
କରାଯାଏ। ଏହା ପୁରୁଣା ସ୍ଥିର ଲିଟେରାଲ୍ ଡିଫଲ୍ଟର ଏକ ଦୁର୍ବଳତାକୁ ଦୂର କରେ:
`/etc/machine-id` ସାଧାରଣତଃ ସମସ୍ତଙ୍କ ପାଇଁ ପଠନଯୋଗ୍ୟ ଥାଏ, ତେଣୁ
`OMNIROUTE_CLI_SALT` କେବେ ସେଟ୍ କରିନଥିବା ପ୍ରତ୍ୟେକ ଇନ୍ଷ୍ଟଲେସନ୍ ପାଇଁ ଯେକୌଣସି
ସ୍ଥାନୀୟ ବ୍ୟବହାରକାରୀ ଅନ୍ୟଥା ସମାନ ଟୋକେନ୍ ଉତ୍ପନ୍ନ କରିପାରନ୍ତେ।

## ସଲ୍ଟ ରୋଟେସନ୍

କୋଡ୍ ପରିବର୍ତ୍ତନ ବିନା ଡିରାଇଭ୍ ହୋଇଥିବା ଟୋକନ୍କୁ ରୋଟେଟ୍ କରିବା ପାଇଁ `OMNIROUTE_CLI_SALT` ସେଟ୍ କରନ୍ତୁ — ଏହା
ସର୍ବଦା ସଂରକ୍ଷିତ ପ୍ରତି-ଇନ୍ଷ୍ଟଲ୍ ସଲ୍ଟ ଅପେକ୍ଷା ପ୍ରାଥମିକତା ପାଏ। ରୋଟେସନ୍ ପରେ, ଏହି ମେସିନ୍ରେ ଥିବା ସମସ୍ତ CLI
ପ୍ରୋସେସ୍ ସ୍ୱୟଂଚାଳିତ ଭାବେ ନୂଆ ଟୋକନ୍ ବ୍ୟବହାର କରିବ। ପୂର୍ବବର୍ତ୍ତୀ ଡିରାଇଭ୍ ହୋଇଥିବା ମୂଲ୍ୟକୁ ପ୍ରକାଶ କରିଥାଇପାରେ ଏପରି
ପ୍ରୋସେସ୍-ତାଲିକା ଲିକ୍ ପରେ ଏହା ଉପଯୋଗୀ।

```bash
# ସ୍ଥାୟୀ ରୋଟେସନ୍ (ଶେଲ୍ ପ୍ରୋଫାଇଲ୍ରେ ଯୋଡ଼ନ୍ତୁ)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# ନୂଆ ଟୋକନ୍ ବ୍ୟବହୃତ ହେଉଛି ବୋଲି ଯାଞ୍ଚ କରନ୍ତୁ
omniroute status
```

## ପୁରୁଣା ଫର୍ମାଟ୍ (SHA-256, 32-ଅକ୍ଷର) — ଏବେ ମଧ୍ୟ ଗ୍ରହଣୀୟ

ଉପରୋକ୍ତ HMAC ଫର୍ମାଟ୍ ପୂର୍ବରୁ, CLI ଏହାର ଟୋକନ୍କୁ
`SHA-256(machineId + salt).hex[0..32]` (ଏକ 32-ଅକ୍ଷର ପ୍ରିଫିକ୍ସ) ଭାବେ
`bin/cli/utils/cliToken.mjs`ରେ (`src/lib/machineToken.ts`ରେ `getLegacyCliTokenSync`) ଡିରାଇଭ୍ କରୁଥିଲା।

ପଛୁଆ ସୁସଙ୍ଗତତା ପାଇଁ ସର୍ଭର୍ **ଉଭୟ** ଫର୍ମାଟ୍ ଗ୍ରହଣ କରେ: ଭେରିଫାୟର୍
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ନିର୍ମାଣ କରେ ଏବଂ ଆସୁଥିବା
ହେଡର୍କୁ ପ୍ରତ୍ୟେକ ସହିତ `timingSafeEqual` ବ୍ୟବହାର କରି ତୁଳନା କରେ
(`src/server/authz/policies/management.ts` ଏବଂ `src/lib/middleware/cliTokenAuth.ts`)।
ତେଣୁ କୌଣସି ଟୋକନ୍ **ଯେକୌଣସି ଗୋଟିଏ** 64-ଅକ୍ଷର HMAC ଡାଇଜେଷ୍ଟ କିମ୍ବା 32-ଅକ୍ଷର
ପୁରୁଣା SHA-256 ପ୍ରିଫିକ୍ସ ସହିତ ମେଳ ଖାଇଲେ ବୈଧ ଅଟେ।

**ଅପ୍ଟ-ଆଉଟ୍:** CLI ଟୋକନ୍ ପ୍ରଣାଳୀକୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଅକ୍ଷମ କରିବା ପାଇଁ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` କିମ୍ବା `.env`) ସେଟ୍ କରନ୍ତୁ;
ତା'ପରେ ସମସ୍ତ ଆକ୍ସେସ୍ ପାଇଁ ଏକ ସ୍ପଷ୍ଟ API କୀ ଆବଶ୍ୟକ ହେବ। ବହୁ-ବ୍ୟବହାରକାରୀ
ହୋଷ୍ଟଗୁଡ଼ିକରେ ଏହା ସୁପାରିଶ କରାଯାଏ, କାରଣ `machine-id` ପ୍ରତି-ଡିଭାଇସ୍ ପାଇଁ ହୋଇଥାଏ (ପ୍ରତି-ବ୍ୟବହାରକାରୀ ପାଇଁ ନୁହେଁ) ଏବଂ ସେହି
ହୋଷ୍ଟର ଅନ୍ୟ ଜଣେ ବ୍ୟବହାରକାରୀ ସମାନ ଟୋକନ୍ ଗଣନା କରିପାରିବେ।

## ଫାଇଲ୍ଗୁଡ଼ିକ

| ଫାଇଲ୍                                     | ଉଦ୍ଦେଶ୍ୟ                                  |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | ଟୋକନ୍ ଡିରାଇଭେସନ୍ (`getMachineTokenSync`)  |
| `bin/cli/utils/cliToken.mjs`              | ସମାନ ଡିରାଇଭେସନ୍ର CLI-ପାର୍ଶ୍ୱ ମିରର୍        |
| `<DATA_DIR>/cli-token-salt.json`          | ସଂରକ୍ଷିତ ଯାଦୃଚ୍ଛିକ ପ୍ରତି-ଇନ୍ଷ୍ଟଲ୍ ସଲ୍ଟ    |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ଧ୍ରୁବକ                 |
| `src/server/authz/policies/management.ts` | ସର୍ଭର୍-ପାର୍ଶ୍ୱ ଯାଞ୍ଚ                      |
| `src/server/authz/routeGuard.ts`          | ଲୁପ୍ବ୍ୟାକ୍ ହୋଷ୍ଟ ଯାଞ୍ଚ (`isLoopbackHost`) |

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- `docs/security/ROUTE_GUARD_TIERS.md` — ରୁଟ୍ ସୁରକ୍ଷା ସ୍ତରଗୁଡ଼ିକ
- `docs/architecture/AUTHZ_GUIDE.md` — ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରାଧିକରଣ ପାଇପ୍ଲାଇନ୍
