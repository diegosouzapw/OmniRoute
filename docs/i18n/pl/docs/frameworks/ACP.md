# ACP registry and registered CLI launchers (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute rozdziela **wykrywanie CLI**, **natywny Agent Client Protocol** oraz
**starsze adaptery stdio**. Znalezienie zainstalowanego pliku wykonywalnego nie potwierdza jego
uwierzytelnienia, zgodności z modelem ani gotowości do obsługi promptu.

Panel używa `GET /api/acp/agents` i `POST /api/acp/agents` do inwentaryzacji
oraz rejestracji niestandardowych agentów. Są to lokalne trasy zarządzania, a nie
publiczne API do uruchamiania procesów lub przesyłania promptów. Wewnętrzny
`AcpManager` nie staje się automatycznie awaryjnym dostawcą HTTP.

## Zarejestrowane kontrakty

`config/cli-tools-manifest.json` jest źródłem prawdy dla wbudowanych plików
wykonywalnych, argumentów i trybów backendu. Rejestr wyprowadza swoje definicje
z tego manifestu. Wyniki wykrywania są buforowane przez 60 sekund.

- `acp`: kontrakt Gemini uruchamia `gemini --experimental-acp` i komunikuje się
  za pomocą rozdzielanego znakami nowego wiersza protokołu ACP JSON-RPC przez oficjalny zestaw SDK TypeScript.
- `stdio-adapter`: pozostałe zarejestrowane kontrakty zachowują starszy adapter
  z danymi wejściowymi rozdzielanymi znakami nowego wiersza i danymi wyjściowymi na stdout. Dwusekundowy okres
  bezczynności wyjścia kończy odpowiedź. Ten adapter **nie** potwierdza natywnej
  obsługi ACP przez te narzędzia CLI.

Gemini dokumentuje flagę uruchomieniową w swojej [dokumentacji CLI](https://geminicli.com/docs/cli/cli-reference/).
Klient używa [oficjalnego zestawu SDK ACP](https://github.com/agentclientprotocol/typescript-sdk)
do inicjalizacji, tworzenia sesji, żądań promptów, powiadomień i anulowania.

Definicje niestandardowych agentów pozostają kontrolowanymi przez administratora kontraktami uruchomieniowymi.
Zarejestrowanie pliku wykonywalnego i argumentów przyznaje temu procesowi lokalne
uprawnienia wykonawcze użytkownika serwera; rejestracja nie jest piaskownicą. Testy wersji
akceptują wyłącznie zarejestrowany plik wykonywalny i rozpoznawaną flagę wersji.

## Wewnętrzne API uruchamiania

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Przekazuj wyłącznie zmienne dostawcy celowo przypisane do tego agenta.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Przetwórz odpowiedź w aplikacji wywołującej.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` ustala plik wykonywalny i argumenty na podstawie
zarejestrowanej definicji. Jedynymi opcjami wywołującego są `cwd` i `env`; stara
sygnatura `spawn(agentId, binary, args, env)` i nadpisywanie pliku wykonywalnego są
odrzucane. Ten menedżer nie obsługuje kontraktów uruchamiania HTTP.

Proces potomny dziedziczy ten sam system operacyjny, terminal, ustawienia regionalne i listę
dozwolonych certyfikatów co programy uruchamiające CLI. Sekrety serwera/dostawcy nie są kopiowane ze
środowiska procesu nadrzędnego. Dane uwierzytelniające wymagane przez wybrane CLI muszą zostać przekazane
jawnie lub dostarczone za pośrednictwem lokalnego uwierzytelniania danego CLI. Proces potomny
nadal ma uprawnienia użytkownika lokalnego do systemu plików i może odczytywać własną konfigurację.

## Natywny cykl życia i limity

1. Uruchom zarejestrowany plik wykonywalny, zainicjuj ACP i utwórz sesję z katalogiem głównym
   w wybranym katalogu roboczym. Limit inicjalizacji wynosi dziesięć sekund.
2. Prześlij prompt i zbieraj powiadomienia tekstowe wyłącznie dla tej sesji.
   Zakończenie następuje wraz z odpowiedzią RPC na prompt, a nie po okresie ciszy na stdout.
3. Stosuj jeden termin wykonania promptu, obejmujący każdą niedokończoną inicjalizację; wartość domyślna
   wynosi 120 sekund. Równoczesne prompty w tym samym procesie są odrzucane.
4. Po przekroczeniu natywnego limitu czasu spróbuj wykonać `session/cancel` i zakończ proces.
   Ograniczone okno 100 ms pozwala opróżnić kolejkę powiadomień przed zakończeniem.
5. Zamknij stan transportu i usuń sesję, gdy inicjalizacja się nie powiedzie,
   połączenie zostanie zamknięte, proces zakończy działanie lub wywołujący go zatrzyma.

Żądania uprawnień narzędzi są odrzucane. Nie są udostępniane żadne możliwości klienta
dotyczące systemu plików ani terminala. Te ograniczenia nie izolują samego podrzędnego pliku
wykonywalnego w piaskownicy ani nie zastępują własnych ustawień autoryzacji CLI.

Zarówno tekst natywny, jak i starsze strumienie stdout/stderr zachowują maksymalnie 1 MiB znaków,
pozostawiając najnowsze dane wyjściowe wraz z informacją o obcięciu. Pojedyncza natywna ramka
protokołu jest ograniczona do 2 MiB bajtów przed analizą przez SDK. Bufory są resetowane dla każdego promptu.

`kill(sessionId)` wysyła SIGTERM, a następnie SIGKILL po pięciu sekundach, jeśli proces
nie zakończył działania. Przekroczenia limitu czasu starszych promptów zwalniają procedury nasłuchujące i czasomierze, ale pozostawiają
sesję dostępną dla kolejnego promptu; po zakończeniu wywołujący nadal odpowiadają za
wywołanie `kill()` lub `killAll()`.

## Zdarzenia i inspekcja

Menedżer emituje zdarzenia `stdout`, `stderr` i `exit`, każde z `sessionId`.
`sessionError` zgłasza oczyszczony błąd transportu. Zdarzenie zgodności `error`
jest emitowane tylko wtedy, gdy ma subskrybenta, dzięki czemu brakujący plik wykonywalny nie może
spowodować nieobsłużonego błędu EventEmitter.

- `getSession(sessionId)` zwraca zarządzaną sesję lub `undefined`.
- `getActiveSessions()` wyklucza zatrzymane lub zatrzymywane sesje.
- `sendInput(sessionId, input)` jest dostępne wyłącznie dla aktywnego starszego adaptera;
  natywny ACP odrzuca surowe dane wejściowe, aby chronić swój strumień JSON-RPC.
- `killAll()` kończy każdą sesję zarządzaną przez daną instancję.

## Granice walidacji

Deterministyczne dane testowe obejmują natywne uzgadnianie połączenia, tekstowe dane wyjściowe, odrzucone
uprawnienia, anulowanie, równoczesne prompty, nieudaną inicjalizację, zakończenie
procesu, limity danych wyjściowych i izolację sekretów. Istniejące testy regresji buforów/procedur nasłuchujących
starszego rozwiązania pozostają objęte testami. Testy te nie potwierdzają aktywnego logowania do Gemini
ani pomyślnego wnioskowania przez dostawcę; wymagają one oddzielnie autoryzowanego testu
dymnego w środowisku docelowym.

## Powiązana dokumentacja

- [Protokoły agentów](./AGENT_PROTOCOLS_GUIDE.md)
- [Kontrakty uruchamiania CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Narzędzia CLI](../reference/CLI-TOOLS.md)
- [Serwer A2A](./A2A-SERVER.md)
- [Agenci chmurowi](./CLOUD_AGENT.md)
