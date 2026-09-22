# Developer environment notes (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ibe a na-akọwa omume `.env` mpaghara nke ọrụ a na otu esi ejikwa faịlụ gburugburu ebe ọrụ na ihe nzuzo mgbe a na-emepụta OmniRoute.

## Omume .env n'oge postinstall

Ọrụ a nwere ike ịmepụta faịlụ `.env` mpaghara n'oge `npm install` / `postinstall` iji mee ka ọrụ dịrị ndị nrụpụta mfe. E zubere faịlụ a naanị maka mmepe na nnwale mpaghara, a gaghị etinye ya ma ọlị na njikwa ụdị.

Isi ihe:

- `.gitignore` nke ebe nchekwa ahụ elegharala faịlụ `.env*` anya (lee ntinye `.gitignore`). Ewepụla ma ọ bụ gbanwee iwu ahụ, belụsọ ma i kpachaara anya chọọ itinye otu faịlụ ihe atụ kpọmkwem ma nwee usoro e dere ede maka ya.
- Ọ bụrụ na e tinye ihe nzuzo n'ezie na repo na mberede, gbanwee/kagbuo nzere ahụ ozugbo ma wepụ ya na akụkọ ihe mere eme nke ebe nchekwa ahụ (dịka ọmụmaatụ, site n'iji `git filter-repo` ma ọ bụ usoro mmezi yiri ya). Kpọtụrụ onye nwe nchekwa/onye a na-akpọtụrụ ma ọ bụrụ na enyemaka dị gị mkpa.
- Maka CI na mmepụta, jiri ihe nzuzo CI ma ọ bụ njikwa ihe nzuzo (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, wdg.) kama itinye ihe nzuzo n'ime faịlụ.

## Usoro ọrụ mpaghara a tụrụ aro

- Debe `.env` naanị n'ebe ọrụ mpaghara gị. Jiri `.env.example` (nke a na-esochi ugbua) dee mgbanwe ndị achọrọ na ụkpụrụ ihe atụ ndị a na-anabata.
- Mgbe ị na-eme nnwale na mpaghara nke chọrọ ụkpụrụ yiri ihe nzuzo, họrọ ihe nnọchi arụrụ arụ ma ọ bụ igodo nwa oge a na-emepụta n'oge mmemme kama ezigbo nzere.
- Tinye nkọwa dị mkpirikpi na nnwale ndị na-eji ihe nnọchi ka ndị nyocha ghọta na data nnwale ahụ bụ nke arụrụ arụ.

## Ihe ndị e kwesịrị ịma gbasara nyocha

- Ụfọdụ akụ ndị a chịkọtara ma ọ bụ faịlụ ọnụọgụ abụọ (dịka blob WASM base64 agbakwunyere) nwere ike ịnwe obere eriri ASCII ndị yiri nzere ma mee ka ngwaọrụ nyocha ihe nzuzo dabere na ederede nye ịdọ aka ná ntị. Ọ bụrụ na akụ ndị a bụ ezigbo akụ, ma tinye ha na ndepụta ihe ndị nyocha ahụ kwere ka ha gafee, ma ọ bụ wepụ ndekọ ha na nhazi nyocha ahụ.

## Ọ bụrụ na ịchọta mpụpụ ihe nzuzo

1. Gbanwee/kagbuo igodo ahụ ozugbo.
2. Wepụ ihe nzuzo ahụ na akụkọ ihe mere eme ma manye iziga alaka e sachara ma ọ bụrụ na ọ dị mkpa.
3. Gwa ndị na-elekọta ọrụ ahụ ma soro ndepụta usoro nzaghachi maka ihe mberede nke nzukọ gị.
