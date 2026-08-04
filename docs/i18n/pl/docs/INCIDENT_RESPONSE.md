# Runbook reagowania na incydenty — OmniRoute (2026-06-18)

**Status**: Dokument autorytatywny. Audyt 71 filarów (L61) odwołuje się do tego
dokumentu w bramce `Obs > 2.00`.
**Właściciel**: observability-circle (lead: security-circle lead).
**SLO**: zob. `docs/PERF_BUDGETS.md` § 1 (SLO najwyższego poziomu) oraz
`ops/slos.yaml` (forma maszynowo czytelna, generowana przez zespół Bifrost).
**Polityka ujawniania**: zob. `SECURITY.md` (wyłącznie ujawnianie podatności,
osobny przepływ).

Ten runbook to operacyjny playbook dla incydentów **niezwiązanych z bezpieczeństwem**:
awarie, regresje opóźnień, spalanie budżetu błędów oraz awarie po stronie
dostawców. Ujawnianie podatności pozostaje w `SECURITY.md`; nie kieruj
tych spraw przez ten runbook.

---

## 1. Skala ważności

| Sev       | Definicja                                                                                                    | Przykłady                                                                       | Powiadomienie                             | Rozwiązanie do               |
| --------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------- |
| **SEV-1** | Awaria widoczna dla użytkownika; > 50 % żądań kończy się niepowodzeniem lub naruszenie SLO > 2x przez 5 min. | Klaster niedostępny; warstwa auth uszkodzona; powódź 5xx.                       | On-call P0 (natychmiast)                  | 4 h                          |
| **SEV-2** | Znacząca degradacja; naruszenie SLO 1,5–2x przez 15 min lub wpływ na jednego najemcę.                        | Jeden dostawca niedostępny; p95 > 1,5x budżetu; niekontrolowane rate-limity.    | On-call P1 (15 min)                       | 24 h                         |
| **SEV-3** | Uśpiony błąd lub near-miss; brak bieżącego wpływu na użytkownika, ale budżet błędów zagrożony.               | Wyciek pamięci w trendzie wzrostowym; circuit breaker wyłącza jednego dostawcę. | Slack `#omniroute-ops` (następny standup) | 7 d                          |
| **SEV-4** | Kosmetyczny / informacyjny.                                                                                  | Szum w logach; nieblokujący glitch UI.                                          | Następny przegląd tygodniowy              | Następny cykl refaktoryzacji |

**Eskalacja burn-rate** (zgodnie z `docs/PERF_BUDGETS.md` § 1): 6x przez 5 min
to SEV-1; 2x przez 1 h to SEV-2; utrzymanie < 1x przez 7 d obniża do SEV-3.

---

## 2. Źródła detekcji

| Źródło                            | Sygnał                               | Routing                               |
| --------------------------------- | ------------------------------------ | ------------------------------------- |
| Prometheus (`/metrics`)           | Delty liczników (5xx, latency)       | Alertmanager → PagerDuty              |
| Panele SLO w Grafana              | Panele burn-rate SLO                 | Slack `#omniroute-ops`                |
| Sonda uptime (`/api/health/ping`) | 3 kolejne niepowodzenia z 3 regionów | Alertmanager → PagerDuty              |
| Dependabot                        | Nowe CVE w zależności (CVSS ≥ 7)     | GitHub Security → security-circle     |
| Ręczny raport użytkownika         | Zgłoszenie w Discord / GitHub issue  | Triage przez dyżurnego (on-call)      |
| Chaos-drill (kwartalny)           | Wstrzyknięte awarie                  | Planowany drill; wyniki w `docs/ops/` |

Alerty **nie** idą na prywatne DM. Domyślny kanał to `#omniroute-ops`; PagerDuty
stronicuje rotację on-call. Pełna matryca alertów: `ops/alertmanager/rules.yml`
(gdy jest wdrożona; do tego czasu reguły są w konfiguracji Prometheus w
`deploy/observability/`).

---

## 3. Pierwsze 15 minut (SEV-1 / SEV-2)

1. **Potwierdź**. Otwórz panel SLO i sprawdź, czy alert jest prawdziwy, a nie
   flapping. Jeśli flapping — wycisz na 15 min i zbadaj.
2. **Zadeklaruj**. Opublikuj w `#omniroute-ops`:
   ```
   INCIDENT <sev> — <jedna linia objawu>
   IC: @you
   Status: investigating
   Następna aktualizacja: <teraz + 15 min>
   ```
3. **Stabilizuj** przed diagnozą główną przyczyny. Preferowana kolejność:
   - Odetnij zły deploy: `kubectl rollout undo deploy/omniroute` (lub
     równoważne dla Twojego środowiska; zob. `docs/ops/DEPLOYMENT.md`).
   - Przełącz combo / dostawcę: `POST /api/combos/:id/switch` lub MCP
     `switch_combo`.
   - Włącz tryb degradacji: ustaw
     `OMNIROUTE_DEGRADATION_MODE=lite` (pomija niekrytyczne middleware).
   - Rate-limit ruch wejściowy na edge, jeśli to flood.
4. **Aktualizuj** co 15 min do złagodzenia lub rozwiązania.

Nie debuguj w produkcji przy SEV-1. Przywróć ostatni znany dobry stan, potem
rób post-mortem offline.

---

## 4. Macierz runbooków

| Klasa awarii                         | Pierwszy ruch                                                 | Runbook                                                    |
| ------------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Całkowity outage (wszystkie regiony) | Rollback ostatniego deployu; sprawdź status edge / DNS        | `docs/ops/DEPLOYMENT.md` § rollback                        |
| Pojedynczy dostawca 5xx / timeout    | Wyłącz dostawcę w combo; włącz fallback                       | `docs/architecture/RESILIENCE_GUIDE.md`                    |
| Spalanie budżetu błędów (latency)    | Sprawdź p95 per-route; włącz compression / cache              | `docs/PERF_BUDGETS.md` § 1–3                               |
| Wyczerpanie połączeń SQLite          | Zrestartuj z większym pool; sprawdź długotrwałe transakcje    | `docs/architecture/CODEBASE_DOCUMENTATION.md` (warstwa DB) |
| Wyciek pamięci / OOM                 | Heap snapshot; rolling restart; oznacz SEV-3 na follow-up     | wewnętrzny runbook profilowania                            |
| Wygaśnięcie certu / TLS              | Wdróż odnowiony cert; sprawdź automatyzację renew             | `docs/ops/TLS.md` (gdy jest; w przeciwnym razie ręcznie)   |
| Awaria odświeżania tokena OAuth      | Wymuś re-auth na dotkniętych kontach; sprawdź status dostawcy | `docs/security/OAUTH.md`                                   |
| Powódź rate-limit (wejście)          | Zaciśnij limity na kluczu API; zbanuj obrażający klucz        | `docs/architecture/AUTHZ_GUIDE.md`                         |
| Awaria zależności (npm / CVE)        | Pin / patch; w razie potrzeby wyłącz funkcję                  | `SECURITY.md` + Dependabot                                 |

Każdy runbook musi kończyć się kryteriami **done** i właścicielem follow-upu.

---

## 5. Role w czasie incydentu

| Rola                        | Kto                                  | Odpowiedzialności                                                |
| --------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| **Incident Commander (IC)** | Dyżurny on-call (lub delegat)        | Deklaruje sev, prowadzi mostek, zatwierdza mitigacje, zamyka     |
| **Tech lead**               | Inżynier znający dotknięty podsystem | Diagnozuje, proponuje mitigacje, wdraża poprawki                 |
| **Comms**                   | IC lub wolontariusz                  | Aktualizacje na Slacku, status page, odpowiedzi dla użytkowników |
| **Scribe**                  | Wolontariusz                         | Notatki z linii czasu na potrzeby post-mortem                    |
| **Executive sponsor**       | Tylko SEV-1                          | Escalation path; decyzje o zasobach                              |

Jedna osoba = jedna rola, gdy to możliwe. IC **nie** debuguje.

---

## 6. Komunikacja

- **Wewnętrzna**: `#omniroute-ops` jest źródłem prawdy. Wątek na incydent na
  deklarację; wszystkie aktualizacje w wątku.
- **Zewnętrzna** (gdy dotyczy użytkowników zewnętrznych): status page
  (status.omniroute.example — zastąp prawdziwym URL, gdy będzie live). SEV-1
  dostaje publiczny post w ≤ 30 min; SEV-2 w ≤ 2 h, jeśli wpływ jest
  zewnętrzny.
- **Nie** spekuluj o root cause publicznie. Podawaj objawy i ETA mitigacji.
- Po złagodzeniu: jedna wiadomość „mitigated, monitoring for 30 min”, potem
  „resolved” z linkiem do post-mortem (gdy będzie gotowy).

---

## 7. Łagodzenie vs rozwiązanie

| Stan            | Znaczenie                                                | Kiedy używać                               |
| --------------- | -------------------------------------------------------- | ------------------------------------------ |
| `investigating` | Alert potwierdzony, przyczyna nieznana                   | Pierwsze 15 min                            |
| `mitigating`    | Stosowana poprawka; wpływ powinien spadać                | Podczas rollbacku / failover               |
| `mitigated`     | Wpływ na użytkownika ustał; root cause może być otwarty  | Po udanej stabilizacji                     |
| `resolved`      | Root cause znany i trwale naprawiony (lub zaakceptowany) | Po merge poprawki lub decyzji o akceptacji |
| `wontfix`       | Zaakceptowane ryzyko; udokumentowane                     | Tylko SEV-3/4 za zgodą IC                  |

SEV-1/2 nie mogą pozostać w `mitigated` dłużej niż 7 dni bez eskalacji do
executive sponsora.

---

## 8. Post-mortem (obowiązkowy dla SEV-1/2)

Szablon (skopiuj do `docs/postmortems/YYYY-MM-DD-<slug>.md`):

```markdown
# Post-mortem: <tytuł>

- Data: YYYY-MM-DD
- Sev: SEV-N
- IC: @handle
- Czas trwania: wykrycie → mitigacja → rozwiązanie
- Dotknięci użytkownicy / budżet błędów spalony: <liczby>

## Streszczenie

<5 zdań, bez winy>

## Linia czasu

| Czas (UTC) | Event |
| ---------- | ----- |
| HH:MM      | ...   |

## Root cause

<co faktycznie się zepsuło; 5× dlaczego jeśli pomocne>

## Co poszło dobrze

- ...

## Co poszło źle

- ...

## Action items

| AI  | Właściciel | Termin     | Status |
| --- | ---------- | ---------- | ------ |
| ... | @handle    | YYYY-MM-DD | open   |

## Lekcje

<1–3 trwałe zmiany procesu lub kodu>
```

Zasady:

- **Bez obwiniania.** System zawiódł, nie osoba.
- Action items mają właściciela i termin; otwarte AI są przeglądane na
  cotygodniowym standupie ops.
- Opublikuj w ciągu **5 dni roboczych** od rozwiązania.
- SEV-3 dostaje post-mortem tylko gdy IC uzna to za wartościowe; SEV-4 nigdy.

---

## 9. Kwartalne chaos-drille

Harmonogram (własność: observability-circle):

| Kwartał | Scenariusz                                  | Sukces =                                      |
| ------- | ------------------------------------------- | --------------------------------------------- |
| Q1      | Kill pod główny podczas peak load           | Failover < 30 s; zero utraty danych           |
| Q2      | Wstrzyknij 5xx u top-1 dostawcy             | Combo przełącza się; budżet błędów trzyma się |
| Q3      | Partycja sieci do SQLite (gdy sklastrowany) | Degradacja read-only; brak korupcji           |
| Q4      | Wygaśnięcie certu TLS (staging)             | Alert odpala; renew w SLO                     |

Wyniki lądują w `docs/ops/chaos/YYYY-QN.md`. Niezaliczony drill otwiera SEV-3
z AI na lukę.

---

## 10. Powiązane dokumenty

| Dokument                                | Rola                                  |
| --------------------------------------- | ------------------------------------- |
| `docs/PERF_BUDGETS.md`                  | SLO, budżety błędów, progi burn-rate  |
| `ops/slos.yaml`                         | Maszynowa forma SLO (Bifrost)         |
| `SECURITY.md`                           | Ujawnianie podatności (osobny flow)   |
| `docs/architecture/RESILIENCE_GUIDE.md` | Fallback, circuit breaker, degradacja |
| `docs/ops/DEPLOYMENT.md`                | Deploy / rollback                     |
| `docs/architecture/AUTHZ_GUIDE.md`      | Nadużycia kluczy API, rate-limity     |
| `docs/postmortems/`                     | Archiwum wpisów post-mortem           |

---

## 11. Historia zmian

| Data       | Zmiana                                         |
| ---------- | ---------------------------------------------- |
| 2026-06-18 | Wstępna wersja autorytatywna (L61 / gate Obs). |

---

_Ten dokument jest autorytatywny dla operacyjnego reagowania na incydenty.
Poprawki: PR do `docs/INCIDENT_RESPONSE.md` z recenzją observability-circle._
