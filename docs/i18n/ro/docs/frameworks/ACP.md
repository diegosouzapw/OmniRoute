# ACP registry and registered CLI launchers (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute separă **descoperirea CLI**, **protocolul nativ Agent Client Protocol** și
**adaptoarele stdio moștenite**. Găsirea unui binar instalat nu dovedește
autentificarea, compatibilitatea modelelor sau disponibilitatea acestuia de a procesa un prompt.

Tabloul de bord utilizează `GET /api/acp/agents` și `POST /api/acp/agents` pentru inventariere
și înregistrarea agenților personalizați. Acestea sunt rute de administrare exclusiv locale, nu un
API public pentru pornirea proceselor sau trimiterea prompturilor. Componenta internă
`AcpManager` nu devine automat o alternativă de rezervă pentru furnizorul HTTP.

## Contracte înregistrate

`config/cli-tools-manifest.json` este sursa de adevăr pentru binarele de lansare
încorporate, argumentele și modurile backend. Registrul își derivă definițiile
din manifestul respectiv. Detecția este păstrată în cache timp de 60 de secunde.

- `acp`: contractul Gemini lansează `gemini --experimental-acp` și comunică
  prin ACP JSON-RPC delimitat prin linii noi, utilizând SDK-ul TypeScript oficial.
- `stdio-adapter`: celelalte contracte înregistrate păstrează adaptorul moștenit cu
  intrare delimitată prin linii noi și ieșire stdout. O perioadă de inactivitate a ieșirii
  de două secunde încheie răspunsul. Acest adaptor **nu** certifică suportul ACP nativ
  pentru respectivele CLI-uri.

Gemini documentează opțiunea de lansare în [referința sa CLI](https://geminicli.com/docs/cli/cli-reference/).
Clientul utilizează [SDK-ul ACP oficial](https://github.com/agentclientprotocol/typescript-sdk)
pentru inițializare, crearea sesiunilor, solicitările de prompturi, notificări și anulare.

Definițiile agenților personalizați rămân contracte de lansare controlate de administrator.
Înregistrarea unui binar și a argumentelor îi acordă procesului respectiv privilegiile locale
de execuție ale utilizatorului serverului; înregistrarea nu reprezintă un sandbox. Verificările versiunii
acceptă numai executabilul înregistrat și o opțiune de versiune recunoscută.

## API intern de lansare

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Transmiteți numai variabilele furnizorului atribuite în mod deliberat acestui agent.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explică acest proiect", 120_000);
  // Utilizați răspunsul în aplicația apelantă.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` determină executabilul și argumentele din
definiția înregistrată. Singurele opțiuni disponibile apelantului sunt `cwd` și `env`; vechea
semnătură `spawn(agentId, binary, args, env)` și suprascrierile executabilului sunt
respinse. Contractele de lansare HTTP nu sunt acceptate de acest manager.

Procesul copil moștenește același sistem de operare, terminal, setări regionale și aceeași listă
de certificate permise ca lansatoarele CLI. Secretele serverului/furnizorului nu sunt copiate din
mediul procesului părinte. Acreditările necesare CLI-ului ales trebuie transmise
explicit sau furnizate prin autentificarea locală proprie a respectivului CLI. Procesul copil
păstrează permisiunile utilizatorului local asupra sistemului de fișiere și își poate citi propria configurație.

## Ciclul de viață nativ și limitele

1. Pornește binarul înregistrat, inițializează ACP și creează o sesiune înrădăcinată în
   directorul de lucru selectat. Inițializarea are o limită de zece secunde.
2. Trimite un prompt și colectează notificările text numai pentru sesiunea respectivă.
   Finalizarea este determinată de răspunsul RPC al promptului, nu de o perioadă de inactivitate pe stdout.
3. Utilizează un singur termen-limită pentru prompt, incluzând orice inițializare nefinalizată; valoarea implicită
   este de 120 de secunde. Prompturile simultane din același proces sunt respinse.
4. La expirarea limitei de timp native, încearcă `session/cancel` și încheie procesul. O
   fereastră limitată de 100 ms permite golirea notificărilor înainte de terminare.
5. Închide starea transportului și elimină sesiunea atunci când inițializarea eșuează,
   conexiunea se închide, procesul se termină sau apelantul îl oprește.

Solicitările de permisiuni pentru instrumente sunt refuzate. Nu sunt declarate capabilități de client
pentru sistemul de fișiere sau terminal. Aceste restricții nu izolează binarul copil într-un sandbox
și nu înlocuiesc setările de autorizare proprii ale unui CLI.

Atât textul nativ, cât și stdout/stderr moștenite păstrează cel mult 1 MiB de caractere,
reținând cea mai recentă ieșire împreună cu o notificare de trunchiere. Un cadru individual al protocolului
nativ este limitat la 2 MiB de octeți înainte de parsarea realizată de SDK. Bufferele sunt resetate pentru fiecare prompt.

`kill(sessionId)` trimite SIGTERM, apoi SIGKILL după cinci secunde dacă procesul
nu s-a încheiat. Expirările prompturilor moștenite eliberează ascultătorii și temporizatoarele, dar lasă
sesiunea disponibilă pentru un alt prompt; apelanții rămân responsabili pentru
`kill()` sau `killAll()` la finalizare.

## Evenimente și inspectare

Managerul emite `stdout`, `stderr` și `exit`, fiecare având `sessionId`.
`sessionError` raportează o eroare de transport igienizată. Evenimentul de compatibilitate `error`
este emis numai atunci când are un abonat, astfel încât lipsa unui binar să nu poată
provoca o eroare EventEmitter negestionată.

- `getSession(sessionId)` returnează o sesiune administrată sau `undefined`.
- `getActiveSessions()` exclude sesiunile oprite sau aflate în curs de oprire.
- `sendInput(sessionId, input)` este disponibil numai pentru un adaptor moștenit activ;
  ACP nativ respinge intrările brute pentru a-și proteja fluxul JSON-RPC.
- `killAll()` încheie fiecare sesiune administrată de instanța respectivă.

## Limitele validării

Fixture-urile deterministe acoperă negocierea nativă, ieșirea text, permisiunile
refuzate, anularea, prompturile simultane, inițializarea eșuată, încheierea procesului,
limitele ieșirii și izolarea secretelor. Regresiile existente privind bufferele/ascultătorii
moșteniți rămân acoperite. Aceste teste nu demonstrează o autentificare Gemini reală
sau o inferență reușită a furnizorului; acestea necesită un test de verificare autorizat separat
în mediul țintă.

## Documentație asociată

- [Protocoale pentru agenți](./AGENT_PROTOCOLS_GUIDE.md)
- [Contracte de lansare CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Instrumente CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Agenți cloud](./CLOUD_AGENT.md)
