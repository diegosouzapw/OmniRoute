# ACP registry and registered CLI launchers (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute razdvaja **otkrivanje CLI-ja**, **izvorni Agent Client Protocol** i
**naslijeđene stdio adaptere**. Pronalaženje instalirane binarne datoteke ne dokazuje njenu
autentifikaciju, kompatibilnost modela niti spremnost za obradu upita.

Kontrolna ploča koristi `GET /api/acp/agents` i `POST /api/acp/agents` za inventar
i registraciju prilagođenih agenata. Ovo su upravljačke rute dostupne samo lokalno, a ne
javni API za pokretanje procesa ili slanje upita. Interni
`AcpManager` ne postaje automatski rezervni HTTP pružalac.

## Registrovani ugovori

`config/cli-tools-manifest.json` je izvor istine za ugrađene binarne datoteke za
pokretanje, argumente i načine rada pozadinskog sistema. Registar izvodi svoje definicije
iz tog manifesta. Rezultati otkrivanja keširaju se 60 sekundi.

- `acp`: Gemini ugovor pokreće `gemini --experimental-acp` i komunicira
  ACP JSON-RPC porukama razdvojenim novim redovima putem službenog TypeScript SDK-a.
- `stdio-adapter`: ostali registrovani ugovori zadržavaju naslijeđeni adapter s unosom
  razdvojenim novim redovima i izlazom na stdout. Period neaktivnosti izlaza od dvije sekunde završava odgovor.
  Ovaj adapter **ne** potvrđuje izvornu ACP podršku za te CLI-je.

Gemini dokumentuje opciju za pokretanje u svojoj [CLI referenci](https://geminicli.com/docs/cli/cli-reference/).
Klijent koristi [službeni ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)
za inicijalizaciju, kreiranje sesije, zahtjeve upita, obavještenja i otkazivanje.

Definicije prilagođenih agenata ostaju ugovori za pokretanje pod kontrolom administratora.
Registracija binarne datoteke i argumenata daje tom procesu lokalne
izvršne privilegije korisnika servera; registracija nije zaštićeno okruženje. Provjere verzije prihvataju
samo registrovanu izvršnu datoteku i prepoznatu opciju za verziju.

## Interni API za pokretanje

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Proslijedite samo varijable pružaoca koje su namjerno dodijeljene ovom agentu.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Objasni ovaj projekt", 120_000);
  // Obradite odgovor u aplikaciji koja poziva ovu funkciju.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` određuje izvršnu datoteku i argumente iz
registrovane definicije. Jedine opcije pozivaoca su `cwd` i `env`; stari
potpis `spawn(agentId, binary, args, env)` i zamjene izvršne datoteke se
odbijaju. Ovaj upravitelj ne podržava HTTP ugovore za pokretanje.

Podređeni proces nasljeđuje isti operativni sistem, terminal, lokalizaciju i listu
dozvoljenih certifikata kao CLI pokretači. Tajne servera/pružaoca ne kopiraju se iz
okruženja nadređenog procesa. Akreditivi potrebni odabranom CLI-ju moraju se proslijediti
eksplicitno ili pružiti putem vlastite lokalne autentifikacije tog CLI-ja. Podređeni proces
i dalje ima dozvole lokalnog korisnika za sistem datoteka i može čitati vlastitu konfiguraciju.

## Izvorni životni ciklus i ograničenja

1. Pokrenite registrovanu binarnu datoteku, inicijalizujte ACP i kreirajte sesiju ukorijenjenu u
   odabranom radnom direktoriju. Inicijalizacija ima ograničenje od deset sekundi.
2. Pošaljite upit i prikupite tekstualna obavještenja samo za tu sesiju.
   Završetak predstavlja odgovor RPC-a za upit, a ne period bez aktivnosti na stdout-u.
3. Koristite jedan krajnji rok za upit, uključujući svaku nedovršenu inicijalizaciju; zadana
   vrijednost je 120 sekundi. Istovremeni upiti u istom procesu se odbijaju.
4. Pri isteku vremena izvornog protokola pokušajte izvršiti `session/cancel` i prekinite proces. Ograničeni
   prozor od 100 ms omogućava slanje preostalih obavještenja prije prekida.
5. Zatvorite stanje transporta i uklonite sesiju kada inicijalizacija ne uspije,
   veza se zatvori, proces završi ili ga pozivalac prekine.

Zahtjevi za dozvole alata se odbijaju. Ne oglašavaju se klijentske
mogućnosti sistema datoteka niti terminala. Ova ograničenja ne izoluju samu podređenu binarnu datoteku
niti zamjenjuju vlastite postavke autorizacije CLI-ja.

I izvorni tekst i naslijeđeni stdout/stderr zadržavaju najviše 1 MiB znakova,
čuvajući najnoviji izlaz uz obavijest o skraćivanju. Pojedinačni izvorni okvir na komunikacijskom kanalu
ograničen je na 2 MiB bajtova prije SDK raščlanjivanja. Međuspremnici se ponovo postavljaju za svaki upit.

`kill(sessionId)` šalje SIGTERM, a zatim SIGKILL nakon pet sekundi ako se proces
nije završio. Isteci vremena naslijeđenih upita oslobađaju osluškivače i mjerače vremena, ali ostavljaju
sesiju dostupnom za drugi upit; pozivaoci ostaju odgovorni za
`kill()` ili `killAll()` nakon završetka.

## Događaji i pregled

Upravitelj emituje `stdout`, `stderr` i `exit`, svaki sa `sessionId`.
`sessionError` prijavljuje sanitiziranu grešku transporta. Događaj kompatibilnosti `error`
emituje se samo kada ima pretplatnika, tako da nedostajuća binarna datoteka ne može
uzrokovati neobrađenu EventEmitter grešku.

- `getSession(sessionId)` vraća upravljanu sesiju ili `undefined`.
- `getActiveSessions()` izostavlja zaustavljene sesije i sesije koje se zaustavljaju.
- `sendInput(sessionId, input)` dostupan je samo za aktivni naslijeđeni adapter;
  izvorni ACP odbija neobrađeni unos kako bi zaštitio svoj JSON-RPC tok.
- `killAll()` prekida svaku sesiju kojom upravlja ta instanca.

## Granice validacije

Determinističke probne implementacije pokrivaju izvorno uspostavljanje veze, tekstualni izlaz, odbijene
dozvole, otkazivanje, istovremene upite, neuspjelu inicijalizaciju, završetak procesa,
ograničenja izlaza i izolaciju tajni. Postojeće regresije naslijeđenih međuspremnika/osluškivača
ostaju pokrivene. Ovi testovi ne demonstriraju aktivnu Gemini prijavu
niti uspješno izvođenje zaključaka kod pružaoca; za to je potreban zasebno autorizovan smoke
test u ciljnom okruženju.

## Povezana dokumentacija

- [Protokoli agenata](./AGENT_PROTOCOLS_GUIDE.md)
- [Ugovori za pokretanje CLI-ja](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI alati](../reference/CLI-TOOLS.md)
- [A2A server](./A2A-SERVER.md)
- [Agenti u oblaku](./CLOUD_AGENT.md)
