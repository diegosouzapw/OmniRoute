# Developer environment notes (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Tällä sivulla selitetään projektin paikallisen `.env`-tiedoston toiminta sekä ympäristötiedostojen ja salaisuuksien käsittely OmniRoutea kehitettäessä.

## .env-tiedoston toiminta postinstall-vaiheessa

Projekti saattaa luoda paikallisen `.env`-tiedoston `npm install`- / `postinstall`-vaiheessa kehittäjien työn helpottamiseksi. Tämä tiedosto on tarkoitettu vain paikalliseen kehitykseen ja testaukseen, eikä sitä saa koskaan viedä versionhallintaan.

Keskeiset asiat:

- Repositorion `.gitignore` ohittaa jo `.env*`-tiedostot (katso `.gitignore`-merkintä). Älä poista tai muuta tätä sääntöä, ellet tarkoituksella halua viedä tiettyä esimerkkitiedostoa versionhallintaan ja ellei sitä varten ole dokumentoitua prosessia.
- Jos oikea salaisuus viedään vahingossa repositorioon, vaihda tai mitätöi tunnistetieto välittömästi ja poista se repositorion historiasta (esimerkiksi käyttämällä `git filter-repo`-komentoa tai vastaavaa korjausprosessia). Ota yhteyttä tietoturvasta vastaavaan henkilöön tai yhteyshenkilöön, jos tarvitset apua.
- Käytä CI-ympäristössä ja tuotannossa CI-salaisuuksia tai salaisuuksien hallintapalvelua (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault jne.) sen sijaan, että tallentaisit salaisuuksia tiedostoihin versionhallinnassa.

## Suositeltu paikallinen työnkulku

- Säilytä `.env` vain paikallisessa työtilassasi. Dokumentoi vaaditut muuttujat ja hyväksyttävät esimerkkiarvot versionhallinnassa jo olevassa `.env.example`-tiedostossa.
- Kun suoritat paikallisesti testejä, jotka edellyttävät salaisuuksia muistuttavia arvoja, käytä oikeiden tunnistetietojen sijaan mieluiten synteettisiä paikkamerkkejä tai suorituksen aikana luotuja lyhytikäisiä avaimia.
- Lisää paikkamerkkejä käyttäviin testeihin lyhyt kommentti, jotta arvioijat ymmärtävät testidatan olevan synteettistä.

## Skannereita koskevat huomautukset

- Jotkin käännetyt tai binääriset resurssit (esimerkiksi upotetut base64-koodatut WASM-blobit) voivat sisältää tunnistetietoja muistuttavia ASCII-merkkijonoja ja laukaista tekstipohjaiset salaisuusskannerit. Jos nämä resurssit ovat asianmukaisia, lisää ne skannerin sallittujen luetteloon tai sulje kyseiset hakemistot pois skannerin määrityksissä.

## Jos löydät vuodon

1. Vaihda tai mitätöi avain välittömästi.
2. Poista salaisuus historiasta ja pakota puhdistetun haaran lähetys tarvittaessa.
3. Ilmoita ylläpitäjille ja noudata organisaatiosi poikkeamien käsittelyn tarkistuslistaa.
