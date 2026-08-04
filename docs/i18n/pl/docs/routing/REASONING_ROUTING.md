---
title: "Routing rozumowania"
---

# Routing rozumowania

Reguły routingu rozumowania rozszerzają istniejący routing modeli i combo. Gdy żadna aktywna reguła nie pasuje,
dotychczasowe zachowanie thinking, suffix, connection-default oraz translacji providera pozostaje
bez zmian.

## Zarządzanie

Zarządzanie regułami jest dostępne w **Settings → Global Routing**. Edytor kluczy API udostępnia ten
sam interfejs zarządzania, przefiltrowany do wybranego klucza.

API zarządzania jest udostępniane przez te trasy:

- `GET` i `POST` pod `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` i `DELETE` pod `/api/settings/reasoning-routing-rules/[id]`
- `POST` pod `/api/settings/reasoning-routing-rules/simulate`

Wszystkie trasy używają `requireManagementAuth`. Wejścia są walidowane schematami z
`src/shared/validation/schemas/reasoningRouting.ts`. Symulator nigdy nie wykonuje wywołania upstream.

## Rozstrzyganie reguł

Wczesna ewaluacja wybiera dokładnie jedną regułę. Zakresy są sprawdzane w tej kolejności:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

W obrębie zakresu wygrywa najpierw wyższy `priority`, następnie dokładne dopasowanie modelu nad wzorcem glob,
a potem stabilna kolejność `createdAt` i `id`. `requestTags` są odczytywane wyłącznie z `metadata.tags`
i obsługują dopasowanie `any` lub `all`.

Reguła `connection` jest ewaluowana tylko wtedy, gdy żadna wczesna reguła nie wygrała i konkretne połączenie
providera zostało już wybrane. Może zmienić wyłącznie effort i budget.

## Effort i budget

`sourceEffort` akceptuje `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` oraz
`ultra`. `missing` oznacza, że żądanie nie zawiera ani dyskretnego effort, ani przełącznika thinking,
ani thinking budget. Sygnał wyłącznie budget jest więc dopasowywany tylko przez `any`.

`effortMode` ma trzy warianty:

- `inherit` zachowuje effort klienta, nadal pozwalając na zmianę modelu lub combo.
- `default` ustawia `targetEffort` tylko wtedy, gdy nie ma jawnego sygnału reasoning.
- `force` zastępuje dyskretny effort wartością `targetEffort`.

Niezależnie od tego `budgetAction` może być `preserve`, `remove` lub `set`. `force` z `none` usuwa
wszystkie rozpoznane pola effort i budget. `none` razem z `set` jest nieprawidłowe.

Żądania kierowane do znanych niekompatybilnych modeli są odrzucane przed wywołaniem upstream. Dla celów
combo niekompatybilne wpisy są usuwane; jeśli żaden nie pozostanie, żądanie zwraca status `400`.
Nieznane dane o możliwościach generują ostrzeżenie i pozostawiają regułę aktywną.

## Bezpieczeństwo i transporty

Model źródłowy i docelowy albo combo źródłowe i docelowe nadal podlegają istniejącej polityce
kluczy API. Reguła reasoning nigdy nie rozszerza uprawnień do modeli, combo ani quota.

Silnik jest zintegrowany ze ścieżkami Chat Completions, Responses, Anthropic Messages oraz wewnętrzną
ścieżką Codex WebSocket. Ścieżka WebSocket akceptuje wyłącznie docelowe modele Codex; celów combo nie
można tam wykonać. Decyzja reguły jest zapisywana w istniejącym route trace bez sekretów.

## Trwałość

Migracja `src/lib/db/migrations/126_reasoning_routing_rules.sql` tworzy tabelę
`reasoning_routing_rules`. Reguły odwołują się do zapisanych kluczy API, combo i połączeń providerów.
Usunięcia sprzątają powiązane reguły. Warstwa dostępu do bazy w
`src/lib/db/reasoningRoutingRules.ts` utrzymuje unieważnialny cache dla ścieżki żądania.

Reguły są uwzględniane w kopiach zapasowych SQLite, pełnym eksporcie bazy oraz pakiecie config-sync.
`reconcileReasoningRulesForSync` wyłącza zaimportowane reguły z brakującymi odwołaniami i zgłasza te
konflikty.
