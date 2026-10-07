# Import providers from a CSV or JSON file (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇧🇦 [bs](../../../bs/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇮🇳 [te](../../../te/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Dostawcy → **Importuj z pliku** tworzy połączenia z kluczem API na podstawie listy CSV lub JSON. Każdy wiersz może wskazywać innego dostawcę. Częściowe niepowodzenie jest zgodne z założeniami: prawidłowe wiersze zostaną zaimportowane nawet wtedy, gdy inne zakończą się błędem, a okno modalne wyświetli przyczyny odrzucenia nieprawidłowych wierszy.

Ten import **nie** tworzy nowych węzłów punktów końcowych zgodnych z OpenAI/Anthropic. Najpierw je utwórz (Dashboard → Dostawcy → Dodaj zgodny z OpenAI lub `omniroute nodes add`), a następnie zaimportuj wiersze, w których kolumna `provider` zawiera identyfikator tego węzła. Wartość `baseUrl` określona dla danego wiersza nadal może zastąpić adres URL węzła.

## CSV (pozycyjny)

Nazwy kolumn mają wyłącznie znaczenie kosmetyczne. Parser dzieli każdy wiersz i przypisuje wartości według indeksu:

| Indeks | Pole       | Wymagane | Uwagi                                                                                                                                                        |
| ------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0      | `provider` | tak      | Identyfikator istniejącego zarządzanego dostawcy (`openai`, `anthropic`, …) **lub** identyfikator już zarejestrowanego **węzła** zgodnego z OpenAI/Anthropic |
| 1      | `name`     | tak      | Wyświetlana nazwa połączenia                                                                                                                                 |
| 2      | `apiKey`   | tak      | Klucz API                                                                                                                                                    |
| 3      | `baseUrl`  | nie      | Adres URL zastępujący wartość dla danego wiersza                                                                                                             |
| 4      | `priority` | nie      | Liczba całkowita od 1 do 100                                                                                                                                 |

Pierwszy wiersz, którego pierwsza kolumna zawiera dosłownie słowo `provider` (niezależnie od wielkości liter), jest pomijany jako nagłówek. Puste wiersze i komentarze rozpoczynające się od `#` są pomijane.

Pobierz plik startowy z okna importu (**Pobierz szablon CSV**). Przykład:

```csv
# Import dostawców OmniRoute (kolumny pozycyjne)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

Wymyślony identyfikator, taki jak `openai-compatible-chat-001`, nie jest węzłem. Dla takiego wiersza API zwraca komunikat `Nieznany lub nieobsługiwany dostawca`; okno modalne wyświetla go obok nazwy wiersza.

## JSON

Tablica JSON zawierająca obiekty z tymi samymi polami (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`). W przeciwieństwie do CSV klucze JSON mają określone nazwy.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
