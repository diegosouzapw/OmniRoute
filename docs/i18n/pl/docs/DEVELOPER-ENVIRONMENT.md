# Developer environment notes (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Ta strona wyjaśnia lokalne zachowanie pliku `.env` w projekcie oraz sposób obsługi plików środowiskowych i sekretów podczas rozwijania OmniRoute.

## Zachowanie `.env` podczas postinstall

Projekt może generować lokalny plik `.env` podczas `npm install` / `postinstall` dla wygody programistów. Ten plik jest przeznaczony wyłącznie do lokalnego programowania i testowania i nigdy nie może zostać zatwierdzony w systemie kontroli wersji.

Najważniejsze informacje:

- Plik `.gitignore` repozytorium już ignoruje pliki `.env*` (zobacz wpis w `.gitignore`). Nie usuwaj ani nie zmieniaj tej reguły, chyba że celowo zamierzasz zatwierdzić konkretny plik przykładowy i masz udokumentowany proces postępowania z nim.
- Jeśli prawdziwy sekret zostanie przypadkowo zatwierdzony w repozytorium, natychmiast zmień/unieważnij dane uwierzytelniające i usuń je z historii repozytorium (na przykład za pomocą `git filter-repo` lub równoważnej procedury naprawczej). Jeśli potrzebujesz pomocy, skontaktuj się z osobą odpowiedzialną za bezpieczeństwo lub wyznaczoną osobą kontaktową.
- W środowiskach CI i produkcyjnych używaj sekretów CI lub menedżera sekretów (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault itp.) zamiast zapisywać sekrety w plikach zatwierdzanych w repozytorium.

## Zalecany lokalny przepływ pracy

- Przechowuj `.env` wyłącznie w lokalnym obszarze roboczym. Używaj pliku `.env.example` (już śledzonego), aby dokumentować wymagane zmienne i dopuszczalne wartości przykładowe.
- Podczas lokalnego uruchamiania testów wymagających wartości przypominających sekrety używaj syntetycznych symboli zastępczych lub tymczasowych kluczy generowanych w czasie wykonywania zamiast prawdziwych danych uwierzytelniających.
- Dodaj krótki komentarz w testach używających symboli zastępczych, aby osoby przeglądające kod wiedziały, że dane testowe są syntetyczne.

## Uwagi dotyczące skanerów

- Niektóre skompilowane zasoby lub pliki binarne (np. osadzone bloby WASM zakodowane w base64) mogą zawierać podciągi ASCII przypominające dane uwierzytelniające i uruchamiać skanery sekretów oparte na analizie tekstu. Jeśli te zasoby są prawidłowe, dodaj je do listy dozwolonych elementów skanera lub wyklucz odpowiednie katalogi w konfiguracji skanera.

## Jeśli znajdziesz wyciek

1. Natychmiast zmień/unieważnij klucz.
2. Usuń sekret z historii i w razie potrzeby wymuś wypchnięcie oczyszczonej gałęzi.
3. Powiadom opiekunów projektu i postępuj zgodnie z listą kontrolną reagowania na incydenty obowiązującą w Twojej organizacji.
