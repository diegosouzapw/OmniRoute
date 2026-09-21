# Developer environment notes (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ଏହି ପୃଷ୍ଠାରେ ପ୍ରକଳ୍ପର ସ୍ଥାନୀୟ `.env` ଆଚରଣ ଏବଂ OmniRoute ବିକାଶ କରିବା ସମୟରେ ପରିବେଶ ଫାଇଲ୍ ଓ ଗୁପ୍ତ ତଥ୍ୟଗୁଡ଼ିକୁ କିପରି ପରିଚାଳନା କରିବେ, ତାହା ବ୍ୟାଖ୍ୟା କରାଯାଇଛି।

## .env postinstall ଆଚରଣ

ବିକାଶକାରୀଙ୍କ ସୁବିଧା ପାଇଁ ପ୍ରକଳ୍ପଟି `npm install` / `postinstall` ସମୟରେ ଏକ ସ୍ଥାନୀୟ `.env` ଫାଇଲ୍ ସୃଷ୍ଟି କରିପାରେ। ଏହି ଫାଇଲ୍ କେବଳ ସ୍ଥାନୀୟ ବିକାଶ ଏବଂ ପରୀକ୍ଷଣ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ଏବଂ ଏହାକୁ କେବେବି ସଂସ୍କରଣ ନିୟନ୍ତ୍ରଣରେ କମିଟ୍ କରିବା ଉଚିତ ନୁହେଁ।

ମୁଖ୍ୟ ବିଷୟଗୁଡ଼ିକ:

- ରିପୋଜିଟୋରିର `.gitignore` ପୂର୍ବରୁ `.env*` ଫାଇଲ୍ଗୁଡ଼ିକୁ ଅଣଦେଖା କରେ (`.gitignore` ଏଣ୍ଟ୍ରି ଦେଖନ୍ତୁ)। ଆପଣ ଯଦି ଜାଣିଶୁଣି କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ଉଦାହରଣ ଫାଇଲ୍ କମିଟ୍ କରିବାକୁ ଚାହୁଁନାହାନ୍ତି ଏବଂ ସେଥିପାଇଁ ଏକ ଲିପିବଦ୍ଧ ପ୍ରକ୍ରିୟା ନାହିଁ, ତେବେ ସେହି ନିୟମକୁ ଅପସାରଣ କିମ୍ବା ପରିବର୍ତ୍ତନ କରନ୍ତୁ ନାହିଁ।
- ଯଦି ଭୁଲବଶତଃ ରିପୋରେ କୌଣସି ପ୍ରକୃତ ଗୁପ୍ତ ତଥ୍ୟ କମିଟ୍ ହୋଇଯାଏ, ତେବେ ତୁରନ୍ତ ପରିଚୟପତ୍ରଟିକୁ ରୋଟେଟ୍/ପ୍ରତ୍ୟାହାର କରନ୍ତୁ ଏବଂ ରିପୋଜିଟୋରି ଇତିହାସରୁ ଏହାକୁ ଅପସାରଣ କରନ୍ତୁ (ଉଦାହରଣ ସ୍ୱରୂପ, `git filter-repo` କିମ୍ବା ଏକ ସମତୁଲ୍ୟ ପ୍ରତିକାର କାର୍ଯ୍ୟପ୍ରବାହ ବ୍ୟବହାର କରି)। ସହାୟତା ଆବଶ୍ୟକ ହେଲେ ସୁରକ୍ଷା/ଯୋଗାଯୋଗ ଦାୟିତ୍ୱରେ ଥିବା ବ୍ୟକ୍ତିଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।
- CI ଏବଂ ପ୍ରଡକ୍ସନ୍ ପାଇଁ, ଗୁପ୍ତ ତଥ୍ୟଗୁଡ଼ିକୁ ଫାଇଲ୍ରେ କମିଟ୍ କରିବା ପରିବର୍ତ୍ତେ CI ସିକ୍ରେଟ୍ କିମ୍ବା ଏକ ସିକ୍ରେଟ୍ ପରିଚାଳକ (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault ଇତ୍ୟାଦି) ବ୍ୟବହାର କରନ୍ତୁ।

## ସୁପାରିଶକୃତ ସ୍ଥାନୀୟ କାର୍ଯ୍ୟପ୍ରବାହ

- `.env`କୁ କେବଳ ଆପଣଙ୍କ ସ୍ଥାନୀୟ ୱାର୍କସ୍ପେସ୍ରେ ରଖନ୍ତୁ। ଆବଶ୍ୟକ ଭେରିଏବଲ୍ ଏବଂ ଗ୍ରହଣଯୋଗ୍ୟ ଉଦାହରଣ ମୂଲ୍ୟଗୁଡ଼ିକୁ ଲିପିବଦ୍ଧ କରିବା ପାଇଁ `.env.example` (ଯାହା ପୂର୍ବରୁ ଟ୍ରାକ୍ କରାଯାଇଛି) ବ୍ୟବହାର କରନ୍ତୁ।
- ଗୁପ୍ତ ତଥ୍ୟ ସଦୃଶ ମୂଲ୍ୟ ଆବଶ୍ୟକ କରୁଥିବା ପରୀକ୍ଷଣଗୁଡ଼ିକୁ ସ୍ଥାନୀୟ ଭାବରେ ଚଲାଇବା ସମୟରେ, ପ୍ରକୃତ ପରିଚୟପତ୍ର ପରିବର୍ତ୍ତେ କୃତ୍ରିମ ପ୍ଲେସ୍ହୋଲ୍ଡର୍ କିମ୍ବା ରନ୍ଟାଇମ୍ରେ ସୃଷ୍ଟି ହୋଇଥିବା ଅସ୍ଥାୟୀ କି ବ୍ୟବହାର କରିବାକୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ।
- ପ୍ଲେସ୍ହୋଲ୍ଡର୍ ବ୍ୟବହାର କରୁଥିବା ପରୀକ୍ଷଣଗୁଡ଼ିକରେ ଏକ ସଂକ୍ଷିପ୍ତ ମନ୍ତବ୍ୟ ଯୋଡ଼ନ୍ତୁ, ଯାହାଦ୍ୱାରା ସମୀକ୍ଷକମାନେ ବୁଝିପାରିବେ ଯେ ଫିକ୍ସଚର୍ଟି କୃତ୍ରିମ।

## ସ୍କାନର୍ ସମ୍ବନ୍ଧୀୟ ଟିପ୍ପଣୀ

- କିଛି କମ୍ପାଇଲ୍ ହୋଇଥିବା କିମ୍ବା ବାଇନେରୀ ଆସେଟ୍ (ଯଥା, ଏମ୍ବେଡ୍ କରାଯାଇଥିବା base64 WASM ବ୍ଲବ୍ଗୁଡ଼ିକ) ମଧ୍ୟରେ ପରିଚୟପତ୍ର ସଦୃଶ ଦେଖାଯାଉଥିବା ASCII ସବ୍ଷ୍ଟ୍ରିଙ୍ଗ୍ ରହିପାରେ ଏବଂ ସେଗୁଡ଼ିକ ପାଠ୍ୟ-ଆଧାରିତ ଗୁପ୍ତ ତଥ୍ୟ ସ୍କାନର୍ଗୁଡ଼ିକୁ ସକ୍ରିୟ କରିପାରେ। ଯଦି ଏହି ଆସେଟ୍ଗୁଡ଼ିକ ବୈଧ, ତେବେ ସେଗୁଡ଼ିକୁ ସ୍କାନର୍ର ଅନୁମତି ତାଲିକାରେ ଚିହ୍ନିତ କରନ୍ତୁ କିମ୍ବା ସ୍କାନର୍ ବିନ୍ୟାସରେ ସେହି ଡିରେକ୍ଟୋରିଗୁଡ଼ିକୁ ବାଦ ଦିଅନ୍ତୁ।

## ଯଦି ଆପଣ କୌଣସି ତଥ୍ୟ ଲିକ୍ ଖୋଜି ପାଆନ୍ତି

1. ତୁରନ୍ତ କିକୁ ରୋଟେଟ୍/ପ୍ରତ୍ୟାହାର କରନ୍ତୁ।
2. ଇତିହାସରୁ ଗୁପ୍ତ ତଥ୍ୟଟି ଅପସାରଣ କରନ୍ତୁ ଏବଂ ଆବଶ୍ୟକ ହେଲେ ପରିଷ୍କୃତ ବ୍ରାଞ୍ଚକୁ ଫୋର୍ସ-ପୁସ୍ କରନ୍ତୁ।
3. ରକ୍ଷଣାବେକ୍ଷକମାନଙ୍କୁ ସୂଚିତ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ସଂସ୍ଥାର ଘଟଣା ପ୍ରତିକ୍ରିୟା ଯାଞ୍ଚତାଲିକା ଅନୁସରଣ କରନ୍ତୁ।
