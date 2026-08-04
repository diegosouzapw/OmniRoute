---
title: "Pierwsze kroki — dostawcy Web Cookie"
version: 3.8.40
lastUpdated: 2026-07-20
---

# Dostawcy Web Cookie

Dostawcy Web Cookie pozwalają OmniRoute korzystać z usługi AI przez istniejącą sesję przeglądarki zamiast klucza API. Są przydatne, gdy masz już dostęp do usługi przez stronę internetową i chcesz, aby OmniRoute używał tej samej uwierzytelnionej sesji.

W przeciwieństwie do dostawców z kluczem API, dostawcy Web Cookie uwierzytelniają się za pomocą poświadczeń, które przeglądarka wysyła do witryny.

---

# Zanim zaczniesz

> **Ważne:** Zawsze kopiuj poświadczenia z **aktywnego żądania sieciowego**, a **nie** z magazynu ciasteczek przeglądarki.

Wiele problemów z uwierzytelnianiem wynika z kopiowania ciasteczek z niewłaściwego miejsca.

## NIE kopiuj z magazynu ciasteczek

Większość przeglądarek udostępnia zapisane ciasteczka przez:

```
DevTools
→ Application (or Storage)
→ Cookies
```

Choć te ciasteczka wyglądają poprawnie, mogą być:

- nieaktualne
- niekompletne
- pozbawione ciasteczek wysyłanych tylko w uwierzytelnionych żądaniach

Użycie tych wartości może powodować błędy uwierzytelniania, nawet jeśli wydają się poprawne.

## Kopiuj z aktywnego żądania

Zamiast tego użyj ciasteczek z udanego żądania:

```
DevTools
→ Network
→ Refresh the page
→ Open a chat or conversation request
→ Request Headers
→ Cookie
```

Nagłówek żądania `Cookie` zawiera dokładne informacje uwierzytelniające, których przeglądarka skutecznie użyła.

Dla większości dostawców Web Cookie właśnie tę wartość należy wkleić do OmniRoute.

---

# Ogólna konfiguracja

Proces konfiguracji jest taki sam dla większości dostawców Web Cookie.

1. Zaloguj się na stronie dostawcy.
2. Otwórz narzędzia deweloperskie przeglądarki.
3. Otwórz kartę **Network**.
4. Odśwież stronę.
5. Otwórz uwierzytelnione żądanie czatu lub rozmowy.
6. Skopiuj wymagane poświadczenia uwierzytelniające.
7. Otwórz OmniRoute.
8. Przejdź do **Providers → Add Provider**.
9. Wybierz dostawcę Web Cookie.
10. Wklej poświadczenia.
11. Kliknij **Test Connection**.
12. Zapisz dostawcę.

Dokładne wymagane poświadczenia zależą od dostawcy.

---

# Formaty poświadczeń dostawców

Różne witryny przechowują uwierzytelnianie na różne sposoby. Niektóre wymagają tylko ciasteczek, inne mogą wymagać dodatkowych nagłówków lub tokenów.

| Dostawca    | Format poświadczeń            | Przewodnik dostawcy            |
| ----------- | ----------------------------- | ------------------------------ |
| Claude Web  | Pełny nagłówek żądania Cookie | `docs/providers/CLAUDE_WEB.md` |
| ChatGPT Web | _(verify)_                    |                                |
| Gemini Web  | _(verify)_                    |                                |
| Copilot Web | _(verify)_                    |                                |
| Grok Web    | _(verify)_                    |                                |
| ...         | ...                           | ...                            |

> Aktualizuj tę tabelę, gdy dodawani są nowi dostawcy Web Cookie lub gdy istniejący dostawcy zmieniają wymagania uwierzytelniania.

---

# Co dostawcy Web Cookie mogą, a czego nie mogą

Dostawcy Web Cookie wykorzystują interfejs czatu witryny. **Nie** zapewniają tych samych możliwości co oficjalne API.

## Obsługiwane

- Uwierzytelnianie za pomocą istniejącej sesji przeglądarki
- Dostęp do modeli dostępnych na Twoim koncie
- Strumieniowanie odpowiedzi czatu
- Brak wymogu klucza API

## Nieobsługiwane

- Function calling
- Tool calling
- Automatyczna edycja plików
- Agentic workflow w IDE
- Funkcje dostępne wyłącznie przez API

To oczekiwane zachowanie i **nie** jest błędem.

Jeśli potrzebujesz wykonywania narzędzi, automatycznej edycji plików lub innych workflow agentowych, użyj **dostawcy z kluczem API** zamiast dostawcy Web Cookie.

---

# Zastrzeżenie dotyczące walidacji

Udany **Test Connection** lub walidacja ciasteczka potwierdza jedynie, że podane poświadczenia wyglądają na zgodne z oczekiwanym formatem.

Do czasu rozwiązania Issue #7857 udana walidacja **nie gwarantuje**, że dostawca uwierzytelni się poprawnie.

Jeśli uwierzytelnianie nadal się nie udaje, sprawdź, czy skopiowałeś poświadczenia z aktywnego żądania sieciowego, a nie z magazynu ciasteczek przeglądarki.

---

# Rozwiązywanie problemów

## Uwierzytelnianie się nie udaje

Upewnij się, że poświadczenia skopiowano z:

```
Network
→ Request Headers
→ Cookie
```

a **nie** z:

```
Application
→ Cookies
```

---

## Ciasteczko działa w przeglądarce, ale nie w OmniRoute

Niektórzy dostawcy dołączają ciasteczka wysyłane tylko podczas uwierzytelnionych żądań.

Skopiuj ponownie poświadczenia ze świeżego żądania sieciowego po pomyślnym otwarciu rozmowy.

---

## Sesja wygasła

Dostawcy Web Cookie korzystają z istniejącej sesji przeglądarki.

Jeśli sesja przeglądarki wygaśnie lub się wylogujesz, musisz skopiować nowy zestaw poświadczeń.

---

## Test Connection przechodzi, ale żądania się nie udają

Do czasu rozwiązania Issue #7857 przejście walidacji nie gwarantuje, że żądanie uwierzytelnienia się powiedzie.

Przed dalszym diagnozowaniem skopiuj ponownie poświadczenia ze świeżego uwierzytelnionego żądania.

---

# Przykład dostawcy

Pełny przewodnik dla konkretnego dostawcy znajdziesz w:

- **Claude Web** — `docs/providers/CLAUDE_WEB.md`

Przewodnik Claude Web pokazuje kompletny proces konfiguracji dostawcy Web Cookie i stanowi implementację referencyjną.

---

# Dobre praktyki

- Kopiuj poświadczenia ze świeżego uwierzytelnionego żądania.
- Unikaj ponownego używania starych ciasteczek.
- Utrzymuj aktywną sesję przeglądarki podczas korzystania z dostawców Web Cookie.
- Traktuj skopiowane ciasteczka jak wrażliwe poświadczenia.
- Używaj dostawców z kluczem API, gdy potrzebujesz function calling lub workflow agentowych.
