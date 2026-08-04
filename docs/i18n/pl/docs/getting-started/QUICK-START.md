# Szybki start: uruchom OmniRoute w 3 minuty

> **TL;DR**: Zainstaluj → Podłącz darmowego providera → Skieruj IDE na OmniRoute. Gotowe.

---

## Krok 1: Zainstaluj OmniRoute

Wybierz preferowaną metodę:

### Opcja A: npm (zalecane)

```bash
npm install -g omniroute
```

### Opcja B: Docker

```bash
docker run -d --name omniroute -p 20128:20128 diegosouzapw/omniroute:latest
```

### Opcja C: Ze źródeł

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
npm run dev
```

---

## Krok 2: Uruchom OmniRoute

```bash
omniroute
```

OmniRoute startuje pod adresem `http://localhost:20128`. Dashboard otwiera się automatycznie.

---

## Krok 3: Podłącz darmowego providera

Możesz korzystać z OmniRoute **bez żadnych opłat**, podłączając darmowego providera.

### Opcja A: Kiro (darmowy Claude — bez karty kredytowej)

1. Otwórz dashboard pod adresem `http://localhost:20128`
2. Przejdź do **Providers** → **Add Provider**
3. Wybierz **Kiro AI**
4. Kliknij **Connect** (klucz API nie jest potrzebny!)
5. Gotowe! Masz darmowy dostęp do modeli Claude.

### Opcja B: OpenCode Free (bez autoryzacji)

1. Otwórz dashboard pod adresem `http://localhost:20128`
2. Przejdź do **Providers** → **Add Provider**
3. Wybierz **OpenCode Free**
4. Kliknij **Connect** (klucz API nie jest potrzebny!)
5. Gotowe! Masz darmowy dostęp do wielu modeli.

### Opcja C: Pollinations (bez klucza)

1. Otwórz dashboard pod adresem `http://localhost:20128`
2. Przejdź do **Providers** → **Add Provider**
3. Wybierz **Pollinations**
4. Kliknij **Connect** (klucz API nie jest potrzebny!)
5. Gotowe! Masz darmowy dostęp do GPT-5, Claude, Gemini i innych.

---

## Krok 4: Sprawdź, czy działa

W [API Keys](http://localhost:20128/dashboard/api-manager) utwórz nowy klucz. Zapisz go — nie pojawi się ponownie. Pamiętaj: ten klucz służy narzędziom do dostępu do OmniRoute, a nie do upstreamowych providerów.

```bash
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Powinieneś zobaczyć listę podłączonych modeli.

---

## Krok 5: Skieruj IDE lub CLI na OmniRoute

W swoim IDE lub narzędziu CLI ustaw:

```
Base URL: http://localhost:20128/v1
API Key:  [skopiuj z Dashboard → Endpoints]
Model:    auto
```

To wszystko! Twoje IDE korzysta teraz z OmniRoute z automatycznym wyborem providera.

### Przykład IDE: VSCode/Continue.dev

1. W VSCode zainstaluj rozszerzenie [Continue.dev](https://marketplace.visualstudio.com/items?itemName=Continue.continue).
2. Zaktualizuj `~/.continue/config.yaml`, dodając następujące linie:

```
  - name: OmniRoute - Auto
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: <YOUR_KEY>
```

3. W panelu czatu Continue.dev wybierz `OmniRoute - Auto` — żądania będą szły do OmniRoute.
4. (Opcjonalnie) Ćwiczenie dla czytelnika — niech Twoje IDE uzupełni `config.yaml` o pozostałe gotowe konfiguracje 😊

### Przykład CLI: Codex CLI

1. Ustaw trwale zmienną środowiskową w systemie operacyjnym.
   Na macOS/Linux (dodaj do `~/.bashrc` lub `~/.zshrc`):

```bash
export OMNIROUTE_API_KEY="<YOUR_KEY>"
```

Dla Windows (Command Prompt):

```
setx OMNIROUTE_API_KEY <YOUR_KEY>
```

2. Uruchom Codex skonfigurowany pod OmniRoute. Wpisz:

```
omniroute launch-codex --model auto
```

Możesz to zrobić ręcznie przez `codex` i parametry wiersza poleceń wskazujące endpoint oraz klucz API, ale powyższa komenda sprawia, że OmniRoute zajmuje się wszystkim za Ciebie.

3. CLI powinno teraz wysyłać żądania do OmniRoute.

### Potwierdź, że narzędzie routuje przez OmniRoute

Szczegóły żądania zobaczysz, klikając [Monitoring/Logs](http://localhost:20128/dashboard/logs) na lewym pasku bocznym. Kliknięcie wpisu pokazuje więcej szczegółów. Przy okazji zobaczysz, jakie informacje wysyła Twój ulubiony harness — przydatne edukacyjnie i przy debugowaniu.

---

## Co dalej?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — Pozwól OmniRoute wybrać najlepsze AI za Ciebie
- **[Providers Guide](./PROVIDERS-GUIDE.md)** — Podłącz więcej providerów (darmowych i płatnych)
- **[Free Tiers Guide](./FREE-TIERS-GUIDE.md)** — Darmowe AI bez karty kredytowej
- **[Troubleshooting](./TROUBLESHOOTING.md)** — Rozwiązywanie typowych problemów

---

## Częste pytania

### „Czy potrzebuję klucza API?"

**Nie!** Możesz korzystać z darmowych providerów (Kiro, OpenCode Free, Pollinations) bez żadnego klucza API. Wystarczy podłączyć je w dashboardzie.

### „Czym jest `auto`?"

`auto` każe OmniRoute automatycznie wybrać najlepszego providera dla każdego żądania. Uwzględnia szybkość, koszt, jakość i dostępność. Szczegóły w [Auto-Combo Guide](./AUTO-COMBO-GUIDE.md).

### „Ile to kosztuje?"

Sam OmniRoute jest **darmowy i open-source**. Płacisz tylko za providerów, z których korzystasz. Wiele ma darmowe limity — zobacz [Free Tiers Guide](./FREE-TIERS-GUIDE.md).

### „Czy działa z Claude Code / Cursor / Copilot?"

**Tak!** OmniRoute działa z każdym narzędziem obsługującym format OpenAI. Ustaw base URL na `http://localhost:20128/v1`. Konkretne instrukcje znajdziesz w [CLI Tools Guide](../reference/CLI-TOOLS.md).

### „Co jeśli provider padnie?"

OmniRoute automatycznie pomija niedziałających providerów i próbuje kolejnego. Nic nie musisz robić. Szczegóły w [Auto-Combo Guide](./AUTO-COMBO-GUIDE.md).

---

## Potrzebujesz pomocy?

- **[Troubleshooting](./TROUBLESHOOTING.md)** — Typowe problemy i rozwiązania
- **[Discord](https://discord.gg/U47eFqAXCn)** — Wsparcie społeczności
- **[GitHub Issues](https://github.com/diegosouzapw/OmniRoute/issues)** — Zgłaszanie błędów
