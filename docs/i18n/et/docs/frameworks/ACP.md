# ACP registry and registered CLI launchers (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute eristab **CLI tuvastamist**, **natiivset Agent Client Protocoli** ja
**pärand-stdio-adaptereid**. Installitud binaarfaili leidmine ei tõenda selle
autentimist, mudeliga ühilduvust ega valmisolekut viipa töötlemiseks.

Töölaud kasutab inventuuri ja kohandatud agentide registreerimise jaoks
`GET /api/acp/agents` ja `POST /api/acp/agents`. Need on ainult kohalikuks
halduseks mõeldud marsruudid, mitte avalik API protsesside käivitamiseks või
viipade saatmiseks. Sisemine `AcpManager` ei muutu automaatselt HTTP-pakkuja
varumehhanismiks.

## Registreeritud lepingud

`config/cli-tools-manifest.json` on sisseehitatud käivitusbinaaride, argumentide
ja taustsüsteemirežiimide tõeallikas. Register tuletab oma definitsioonid sellest
manifestist. Tuvastamist puhverdatakse 60 sekundit.

- `acp`: Gemini leping käivitab `gemini --experimental-acp` ja suhtleb ametliku
  TypeScript SDK kaudu reavahetustega eraldatud ACP JSON-RPC sõnumitega.
- `stdio-adapter`: teised registreeritud lepingud säilitavad pärandadapteri,
  mis kasutab reapõhist sisendit ja standardväljundit. Kahesekundiline väljundi
  jõudeolekuperiood lõpetab vastuse. See adapter **ei** kinnita nende CLI-de
  natiivse ACP toe olemasolu.

Gemini dokumenteerib käivituslipu oma [CLI viitedokumentatsioonis](https://geminicli.com/docs/cli/cli-reference/).
Klient kasutab [ametlikku ACP SDK-d](https://github.com/agentclientprotocol/typescript-sdk)
lähtestamiseks, seansi loomiseks, viibapäringuteks, teavitusteks ja tühistamiseks.

Kohandatud agentide definitsioonid jäävad administraatori hallatavateks
käivituslepinguteks. Binaarfaili ja argumentide registreerimine annab sellele
protsessile serveri kasutaja kohalikud käivitusõigused; registreerimine ei ole
liivakast. Versioonikontrollid aktsepteerivad ainult registreeritud täitmisfaili
ja tunnustatud versioonilippu.

## Sisemine käivitus-API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Edasta ainult sellele agendile teadlikult määratud pakkuja muutujad.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Selgita seda projekti", 120_000);
  // Töötle vastust kutsuvas rakenduses.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` leiab täitmisfaili ja argumendid registreeritud
definitsioonist. Ainsad kutsuja valikud on `cwd` ja `env`; vana
`spawn(agentId, binary, args, env)` signatuur ja täitmisfaili alistamised
lükatakse tagasi. See haldur ei toeta HTTP-käivituslepinguid.

Alamprotsess pärib samad operatsioonisüsteemi, terminali, lokaadi ja sertifikaatide
lubatud loendi sätted nagu CLI-käivitajad. Serveri või pakkuja saladusi
vanemprotsessi keskkonnast ei kopeerita. Valitud CLI-le vajalikud mandaadid tuleb
selgesõnaliselt edastada või anda selle CLI enda kohaliku autentimise kaudu.
Alamprotsessil säilivad siiski kohaliku kasutaja failisüsteemiõigused ja see võib
lugeda oma konfiguratsiooni.

## Natiivne elutsükkel ja piirangud

1. Käivita registreeritud binaarfail, lähtesta ACP ja loo valitud töökataloogis
   juurseanss. Lähtestamise ajalimiit on kümme sekundit.
2. Saada viip ja kogu ainult selle seansi tekstiteavitused. Lõpetamise määrab
   viiba RPC-vastus, mitte standardväljundi vaikuse periood.
3. Kasuta üht viiba tähtaega, mis hõlmab ka lõpetamata lähtestamist; vaikeväärtus
   on 120 sekundit. Samaaegsed viibad samas protsessis lükatakse tagasi.
4. Natiivse ajalõpu korral proovi käsku `session/cancel` ja lõpeta protsess.
   Piiratud 100 ms aken võimaldab teavituse enne lõpetamist välja saata.
5. Sulge transpordi olek ja eemalda seanss, kui lähtestamine nurjub, ühendus
   sulgub, protsess väljub või kutsuja selle lõpetab.

Tööriistade loataotlused lükatakse tagasi. Failisüsteemi ega terminalikliendi
võimekusi ei reklaamita. Need piirangud ei paiguta alamprotsessi ennast liivakasti
ega asenda CLI enda autoriseerimissätteid.

Nii natiivse teksti kui ka pärand-stdout/stderr-i puhul säilitatakse kõige rohkem
1 MiB jagu märke, hoides alles uusima väljundi koos kärpimisteatega. Ühe natiivse
sidekaadri suurus on enne SDK-poolset sõelumist piiratud 2 MiB baidiga. Puhvrid
lähtestatakse iga viiba jaoks.

`kill(sessionId)` saadab SIGTERM-i ning viie sekundi pärast SIGKILL-i, kui
protsess pole väljunud. Pärandviipade ajalõpud vabastavad kuularid ja taimerid,
kuid jätavad seansi järgmise viiba jaoks kättesaadavaks; kutsujad vastutavad
pärast lõpetamist endiselt `kill()` või `killAll()` kutsumise eest.

## Sündmused ja oleku kontrollimine

Haldur väljastab sündmused `stdout`, `stderr` ja `exit`, millest igaüks sisaldab
välja `sessionId`. `sessionError` teatab puhastatud transpordiveast.
Ühilduvussündmus `error` väljastatakse ainult siis, kui sellel on tellija, et
puuduv binaarfail ei saaks põhjustada käsitlemata EventEmitteri viga.

- `getSession(sessionId)` tagastab hallatava seansi või `undefined`.
- `getActiveSessions()` välistab peatatud või peatamisel olevad seansid.
- `sendInput(sessionId, input)` on saadaval ainult töötava pärandadapteri jaoks;
  natiivne ACP lükkab toorsisendi tagasi, et kaitsta oma JSON-RPC voogu.
- `killAll()` lõpetab kõik selle eksemplari hallatavad seansid.

## Valideerimise piirid

Deterministlikud testandmed hõlmavad natiivset kätlust, tekstiväljundit, keelatud
õigusi, tühistamist, samaaegseid viipasid, nurjunud lähtestamist, protsessi
väljumist, väljundipiiranguid ja saladuste isoleerimist. Olemasolevad pärandpuhvri
ja kuularite regressioonid on jätkuvalt kaetud. Need testid ei tõenda toimivat
Gemini sisselogimist ega edukat pakkujapoolset järeldamist; need nõuavad
sihtkeskkonnas eraldi autoriseeritud suitsutesti.

## Seotud dokumentatsioon

- [Agendiprotokollid](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI-käivituslepingud](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI-tööriistad](../reference/CLI-TOOLS.md)
- [A2A-server](./A2A-SERVER.md)
- [Pilveagendid](./CLOUD_AGENT.md)
