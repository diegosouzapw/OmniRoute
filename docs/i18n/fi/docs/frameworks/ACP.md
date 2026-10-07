# ACP registry and registered CLI launchers (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute erottaa toisistaan **CLI-työkalujen tunnistamisen**, **natiivin Agent Client Protocol -toteutuksen** ja
**vanhat stdio-sovittimet**. Asennetun binääritiedoston löytyminen ei osoita sen
todennusta, malliyhteensopivuutta tai valmiutta käsitellä kehotetta.

Hallintapaneeli käyttää reittejä `GET /api/acp/agents` ja `POST /api/acp/agents` inventaarioon
ja mukautettujen agenttien rekisteröintiin. Nämä ovat vain paikalliseen käyttöön tarkoitettuja hallintareittejä, eivät
julkinen API prosessien käynnistämiseen tai kehotteiden lähettämiseen. Sisäinen
`AcpManager` ei muutu automaattisesti HTTP-palveluntarjoajan varajärjestelmäksi.

## Rekisteröidyt sopimukset

`config/cli-tools-manifest.json` on sisäänrakennettujen käynnistysbinäärien,
argumenttien ja taustajärjestelmätilojen ensisijainen tietolähde. Rekisteri johtaa määritelmänsä
tästä manifestista. Tunnistuksen tulokset tallennetaan välimuistiin 60 sekunniksi.

- `acp`: Gemini-sopimus käynnistää komennon `gemini --experimental-acp` ja viestii
  rivinvaihdoilla erotetulla ACP JSON-RPC:llä virallisen TypeScript SDK:n kautta.
- `stdio-adapter`: muut rekisteröidyt sopimukset säilyttävät vanhan sovittimen, joka käyttää rivinvaihdolla päätettyä syötettä
  ja stdout-tulostetta. Kahden sekunnin tulosteen joutoaika päättää vastauksen.
  Tämä sovitin **ei** vahvista kyseisten CLI-työkalujen natiivia ACP-tukea.

Gemini dokumentoi käynnistyslipun [CLI-viitteessään](https://geminicli.com/docs/cli/cli-reference/).
Asiakas käyttää [virallista ACP SDK:ta](https://github.com/agentclientprotocol/typescript-sdk)
alustukseen, istunnon luomiseen, kehotepyyntöihin, ilmoituksiin ja peruutuksiin.

Mukautettujen agenttien määritelmät säilyvät järjestelmänvalvojan hallitsemina käynnistyssopimuksina.
Binäärin ja argumenttien rekisteröinti antaa kyseiselle prosessille palvelinkäyttäjän paikalliset
suoritusoikeudet; rekisteröinti ei ole hiekkalaatikko. Versiotarkistukset hyväksyvät
vain rekisteröidyn suoritettavan tiedoston ja tunnistetun versiovivun.

## Sisäinen käynnistys-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Välitä vain tälle agentille tarkoituksellisesti määritetyt palveluntarjoajan muuttujat.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Selitä tämä projekti", 120_000);
  // Käsittele vastaus kutsuvassa sovelluksessa.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` selvittää suoritettavan tiedoston ja argumentit
rekisteröidystä määritelmästä. Ainoat kutsujan asetukset ovat `cwd` ja `env`; vanha
`spawn(agentId, binary, args, env)`-allekirjoitus ja suoritettavan tiedoston ohitukset
hylätään. Tämä hallinta ei tue HTTP-käynnistyssopimuksia.

Lapsiprosessi perii samat käyttöjärjestelmään, päätteeseen, maa-asetuksiin ja varmenteisiin liittyvät
sallittujen kohteiden luettelot kuin CLI-käynnistimet. Palvelimen tai palveluntarjoajan salaisuuksia ei kopioida
emoprosessin ympäristöstä. Valitun CLI-työkalun tarvitsemat tunnistetiedot on välitettävä
eksplisiittisesti tai annettava kyseisen CLI-työkalun oman paikallisen todennuksen kautta. Lapsiprosessilla
on edelleen paikallisen käyttäjän tiedostojärjestelmäoikeudet, ja se voi lukea omat asetuksensa.

## Natiivi elinkaari ja rajoitukset

1. Käynnistä rekisteröity binääri, alusta ACP ja luo istunto, jonka juurena on
   valittu työhakemisto. Alustuksen aikaraja on kymmenen sekuntia.
2. Lähetä kehote ja kerää teksti-ilmoitukset vain kyseistä istuntoa varten.
   Valmistumisen määrittää kehotteen RPC-vastaus, ei stdout-tulosteen hiljainen jakso.
3. Käytä yhtä kehotteen määräaikaa, joka sisältää mahdollisen keskeneräisen alustuksen; oletusarvo
   on 120 sekuntia. Samanaikaiset kehotteet samassa prosessissa hylätään.
4. Natiivin aikakatkaisun yhteydessä yritä komentoa `session/cancel` ja lopeta prosessi.
   Rajattu 100 ms:n aikaväli mahdollistaa ilmoituksen lähettämisen loppuun ennen lopettamista.
5. Sulje siirtotila ja poista istunto, kun alustus epäonnistuu,
   yhteys sulkeutuu, prosessi päättyy tai kutsuja lopettaa sen.

Työkalujen käyttöoikeuspyynnöt evätään. Tiedostojärjestelmän tai päätteen asiakasominaisuuksia
ei mainosteta. Nämä rajoitukset eivät eristä lapsibinääriä hiekkalaatikkoon
eivätkä korvaa CLI-työkalun omia valtuutusasetuksia.

Sekä natiivi teksti että vanhat stdout/stderr-tulosteet säilyttävät enintään 1 MiB merkkejä
siten, että uusin tuloste säilytetään ja mukaan lisätään katkaisuilmoitus. Yksittäisen natiivin siirtokehyksen
koko on rajattu 2 MiB:uun tavuja ennen SDK:n jäsennystä. Puskurit nollataan jokaiselle kehotteelle.

`kill(sessionId)` lähettää SIGTERM-signaalin ja viiden sekunnin kuluttua SIGKILL-signaalin, jos prosessi
ei ole päättynyt. Vanhojen sovittimien kehotteiden aikakatkaisut vapauttavat kuuntelijat ja ajastimet mutta jättävät
istunnon käytettäväksi toista kehotetta varten; kutsujat vastaavat edelleen
`kill()`- tai `killAll()`-kutsusta käytön päätyttyä.

## Tapahtumat ja tarkastelu

Hallinta lähettää tapahtumat `stdout`, `stderr` ja `exit`, joista jokainen sisältää kentän `sessionId`.
`sessionError` ilmoittaa puhdistetun siirtovirheen. Yhteensopivuustapahtuma `error`
lähetetään vain, kun sillä on tilaaja, joten puuttuva binääri ei voi
aiheuttaa käsittelemätöntä EventEmitter-virhettä.

- `getSession(sessionId)` palauttaa hallitun istunnon tai arvon `undefined`.
- `getActiveSessions()` jättää pysäytetyt tai pysäytettävät istunnot pois.
- `sendInput(sessionId, input)` on käytettävissä vain aktiiviselle vanhalle sovittimelle;
  natiivi ACP hylkää raakasyötteen suojatakseen JSON-RPC-tietovirtaansa.
- `killAll()` lopettaa kaikki kyseisen instanssin hallitsemat istunnot.

## Validoinnin rajat

Deterministiset testikalusteet kattavat natiivin kättelyn, tekstitulosteen, evätyt
käyttöoikeudet, peruutuksen, samanaikaiset kehotteet, epäonnistuneen alustuksen, prosessin
päättymisen, tulosterajoitukset ja salaisuuksien eristämisen. Aiemmat vanhojen puskurien ja kuuntelijoiden
regressiotestit säilyvät. Nämä testit eivät osoita toimivaa Gemini-kirjautumista
tai onnistunutta palveluntarjoajapäättelyä; ne edellyttävät erikseen valtuutettua smoke-testiä
kohdeympäristössä.

## Aiheeseen liittyvä dokumentaatio

- [Agenttiprotokollat](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-käynnistyssopimukset](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-työkalut](../reference/CLI-TOOLS.md)
- [A2A-palvelin](./A2A-SERVER.md)
- [Pilviagentit](./CLOUD_AGENT.md)
