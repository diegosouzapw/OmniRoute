# Providers — Claude Web (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` trimite solicitări de chat în format OpenAI printr-o sesiune de browser autentificată pe `claude.ai`. Executorul normalizează cookie-ul furnizat, identifică o organizație autentificată, pregătește starea conversației, selectează un transport direct sau prin browser și transpune cu strictețe răspunsul SSE din amonte. Orchestrarea se află în `open-sse/executors/claude-web.ts:320`.

> **Sunteți la început cu furnizorii Web Cookie?**
>
> Citiți **`docs/getting-started/WEB-COOKIE-GUIDE.md`** pentru procesul general de configurare, îndrumări privind autentificarea, limitări și depanare înainte de a urma acest ghid specific furnizorului.

### Catalogul de modele

Registrul furnizorului expune în prezent exact aceste șapte ID-uri statice de model (`open-sse/config/providers/registry/claude/web/index.ts:11`):

| ID model                    | Nume afișat             |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Descoperirea dinamică a modelelor nu este implementată pentru acest furnizor. Lista de mai sus reprezintă catalogul disponibil în timpul execuției.

### Acreditări și identificarea organizației

Furnizați fie antetul Cookie complet pentru `claude.ai`, fie o valoare de sesiune simplă. Valorile simple sunt normalizate ca `sessionKey`; celelalte cookie-uri sunt păstrate dacă sunt furnizate. Executorul acceptă cookie-ul prin `cookie` sau `apiKey` și citește valorile opționale `deviceId` și `orgId` din datele conexiunii (`open-sse/executors/claude-web.ts:72`).

Dacă `orgId` lipsește, executorul apelează `GET https://claude.ai/api/organizations` și utilizează prima organizație returnată de sesiunea Claude Web autentificată (`open-sse/executors/claude-web.ts:141`). Acesta refuză continuarea dacă nu este returnată nicio organizație validă, raportează autorizarea respinsă a sesiunii cu codul 401 și face distincția între o verificare Cloudflare și o eroare de autentificare.

### Operațiuni asupra conversației

Obiectul opțional de nivel superior `claude_web` este strict. Câmpurile necunoscute sunt respinse. Câmpurile acceptate sunt definite în `open-sse/executors/claude-web/session.ts:50`:

| Câmp                  | Semnificație                                                                     |
| --------------------- | -------------------------------------------------------------------------------- |
| `operation`           | Implicit `completion`; utilizați `retry` pentru reîncercarea unui schimb         |
| `conversation_id`     | UUID explicit pentru o conversație existentă                                     |
| `parent_message_uuid` | UUID explicit pentru mesajul asistent părinte                                    |
| `timezone`            | Nume valid de fus orar IANA                                                      |
| `locale`              | Valoare locală validă structural                                                 |
| `tool_states`         | Listă opțională de stări ale instrumentelor contului, limitată la 128 de intrări |

Solicitările pregătite utilizează unul dintre cele două puncte finale din amonte (`open-sse/executors/claude-web.ts:203`):

- Un schimb nou sau ulterior trimite o solicitare la
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- O reîncercare trimite o solicitare la
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Un schimb nou include `create_conversation_params`. Un schimb ulterior memorat în cache sau asociat explicit include `parent_message_uuid` și omite `create_conversation_params`. Reîncercarea necesită atât starea conversației, cât și starea mesajului părinte și nu trimite niciun prompt (`open-sse/executors/claude-web/session.ts:254`). Conversațiile noi deschid interfața autentificată la `/new`; schimburile ulterioare memorate în cache sau asociate explicit deschid pagina exactă a conversației (`open-sse/executors/claude-web/session.ts:324`).

Starea conversației este un cache în memorie, indexat după un domeniu de cont SHA-256 și transcrierea canonică a apelantului. Intrările expiră după 30 de minute, iar cache-ul este limitat la 5.000 de intrări (`open-sse/executors/claude-web/session.ts:12`). Starea este salvată numai după ce analizorul strict al fluxului observă `message_stop`; repornirea procesului o elimină. La o ratare a cache-ului, o solicitare cu mai multe mesaje este serializată într-un singur prompt de recuperare, în loc ca mesajele anterioare să fie omise în mod silențios.

Valoarea locală și fusul orar utilizează următoarea ordine de prioritate: valoarea `claude_web` din solicitare, valoarea conexiunii, valoarea din timpul execuției, apoi `en-US` pentru valoarea locală sau `UTC` pentru fusul orar (`open-sse/executors/claude-web/session.ts:218`).

### Instrumente și sarcini utile ale solicitărilor

Solicitările directe transformă numai instrumentele funcționale OpenAI valide structural, furnizate de apelant. Nu există nicio listă statică implicită de instrumente generată artificial (`open-sse/executors/claude-web/payload.ts:102`).

În schimb, solicitările prin browser capturează solicitarea interfeței autentificate și păstrează instrumentele contului, stările instrumentelor și stilurile personalizate. Câmpurile pregătite pentru conversație, model, raționament, prompt și UUID-urile mesajelor suprascriu în continuare solicitarea capturată (`open-sse/executors/claude-web/browserTransport.ts:175`). Șabloanele browserului sunt delimitate pe baza unui hash al contului, organizației, cookie-ului, valorii locale și fusului orar și expiră după 30 de minute (`open-sse/executors/claude-web/browserTransport.ts:11`, `open-sse/executors/claude-web/browserTransport.ts:158`). Atunci când o solicitare directă nu conține instrumente furnizate de apelant, aceasta poate reutiliza șablonul delimitat respectiv; instrumentele furnizate explicit de apelant au prioritate (`open-sse/executors/claude-web/browserTransport.ts:214`).

### Selectarea transportului

Calea implicită este `sendClaudeWebDirect()`, care apelează `tlsFetchClaude()` cu profilul Chrome 146 configurat și cookie-ul furnizat (`open-sse/services/claudeTlsClient.ts:23`). Aceasta nu lansează un instrument de rezolvare și nu generează un cookie înlocuitor.

Setați `WEB_COOKIE_USE_BROWSER` la `1`, `true` sau `on` pentru a face din adaptorul de browser cu domeniu de aplicare la nivel de cont transportul principal. Setați `OMNIROUTE_BROWSER_POOL` la una dintre aceleași valori pentru a permite ca, în cazul unei provocări Cloudflare 403 recunoscute, transportul direct să recurgă la adaptorul de browser (`open-sse/executors/claude-web.ts:195`). Alte erori HTTP nu declanșează această soluție de rezervă.

Adaptorul de browser păstrează modulele cookie în același context Playwright din pool, utilizează cheia hash cu domeniu de aplicare descrisă mai sus și trimite finalizarea din acel context (`open-sse/executors/claude-web/browserTransport.ts:444`). Acesta nu exportă niciodată un modul cookie obținut prin browser în clientul TLS direct. Reîncercările prin browser necesită un șablon UI neexpirat, asociat aceluiași context Playwright efectiv (`open-sse/executors/claude-web/browserTransport.ts:467`). Citirile răspunsurilor din browser se execută incremental în pagina autentificată, respectă anularea cererii și anulează corpul din amonte imediat ce acesta depășește 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Executorul returnează către loggerul comun de cereri o proiecție de audit cu datele sensibile eliminate: UUID-urile organizației, conversației și mesajelor, textul promptului, definițiile instrumentelor, modulele cookie și identificatorii dispozitivului sunt excluse (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Excepțiile de transport returnează, de asemenea, o eroare generică de conexiune, în locul mesajului excepției generate.

### Comportamentul SSE

`createClaudeWebResponse()` gestionează încadrarea LF sau CRLF și câmpurile `data:` pe mai multe linii. Mapează diferențele de text la `content`, diferențele de raționament la `reasoning_content`, iar evenimentele de metadate cunoscute la extensia de răspuns `claude_web`. Fiecare eveniment de metadate este proiectat prin propria listă de câmpuri permise (`open-sse/executors/claude-web/stream.ts:37`). Metadatele conversației, mesajului-părinte, mesajului asistentului și operației sunt returnate și în anteturile `X-OmniRoute-Claude-Web-*` (`open-sse/executors/claude-web/stream.ts:364`).

Parserul se oprește în mod sigur în cazul unui JSON incorect, al evenimentelor `error` din amonte, al tipurilor de evenimente necunoscute, al ordonării nevalide, al nepotrivirilor blocurilor de conținut sau al atingerii EOF înainte de `message_stop`. Ieșirea în flux emite un fragment de finalizare și un `[DONE]`; ieșirea stocată în buffer utilizează același parser. Parserul tratează `message_stop` drept terminal imediat, anulează datele ulterioare din amonte și propagă anularea din aval către cititorul din amonte (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Liniile SSE neterminate și evenimentele acumulate sunt limitate la 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Fișiere

| Fișier                                                   | Scop                                             |
| -------------------------------------------------------- | ------------------------------------------------ |
| `open-sse/config/providers/registry/claude/web/index.ts` | Registrul static al modelelor furnizorului       |
| `open-sse/executors/claude-web.ts`                       | Orchestrarea executorului                        |
| `open-sse/executors/claude-web/payload.ts`               | Transformarea sarcinii utile și a instrumentelor |
| `open-sse/executors/claude-web/session.ts`               | Starea schimbului și cache-ul transcrierii       |
| `open-sse/executors/claude-web/transport.ts`             | Adaptorul de transport direct                    |
| `open-sse/executors/claude-web/browserTransport.ts`      | Adaptorul de browser la nivel de cont            |
| `open-sse/executors/claude-web/stream.ts`                | Traducerea SSE strictă                           |
| `open-sse/services/claudeTlsClient.ts`                   | Transportul TLS nativ                            |
| `open-sse/services/browserPool.ts`                       | Contexte Playwright gestionate în pool           |

### Testare

Rulați suita Claude Web deterministă fără acreditări reale:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Cazurile care depind de Playwright din `tests/unit/claude-web-auto-refresh.test.ts` sunt omise în mod explicit. În prezent, acest depozit nu definește un script de testare live Claude Web cu acreditări, astfel încât aceste cazuri omise nu constituie o dovadă privind comportamentul la rulare.

### Configurare

1. Porniți OmniRoute cu `npm run dev` sau dintr-o instalare compilată.
2. Deschideți Dashboard → Providers → Add Provider.
3. Selectați categoria Web Cookie și Claude Web.
4. Lipiți antetul Cookie complet, copiat dintr-o cerere `claude.ai` autentificată.
