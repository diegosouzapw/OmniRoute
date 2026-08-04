---
title: "Token Machine-ID CLI"
---

# Token Machine-ID CLI

## Przegląd

Komendy CLI OmniRoute uwierzytelniają się względem lokalnego management API za pomocą
tokenu `HMAC-SHA256(machine-id, salt)` wysyłanego w nagłówku żądania
`x-omniroute-cli-token`.

Dzięki temu podkomendy CLI (`omniroute status`, `omniroute providers` itd.)
mogą wywoływać endpointy management bez konieczności podawania przez użytkownika JWT lub
hasła przy każdym wywołaniu.

## Jak to działa

1. `getMachineTokenSync()` odczytuje sprzętowy machine ID przez `node-machine-id`
   (w razie niepowodzenia wraca do pustego stringa, wyłączając auth CLI).
2. Oblicza `HMAC-SHA256(machine_id, salt)` i zwraca pełny 64-znakowy
   hex digest — deterministyczny, nieodwracalny token powiązany z tą maszyną.
3. CLI wysyła token jako `x-omniroute-cli-token` w każdym żądaniu do
   `http://localhost:<port>/api/...`.
4. Serwer (`src/server/authz/policies/management.ts`) ponownie oblicza
   oczekiwany token z tą samą solą i porównuje przez `timingSafeEqual`, aby
   zapobiec ekstrakcji opartej na timing.

## Właściwości bezpieczeństwa

| Właściwość                       | Szczegóły                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback-only**                | Akceptowany tylko gdy `Host` to `localhost`, `127.0.0.1` lub `::1`.                                                                    |
| **Constant-time compare**        | `crypto.timingSafeEqual` zapobiega atakom timing.                                                                                      |
| **Non-reversible**               | Wyjście HMAC nie pozwala odtworzyć machine-id.                                                                                         |
| **No `always`-protected bypass** | `isAlwaysProtectedPath()` jest oceniane przed sprawdzeniem tokenu CLI. `/api/shutdown` i `/api/settings/database` zawsze wymagają JWT. |
| **Non-exportable**               | Token nigdy nie jest zapisywany na dysk ani logowany.                                                                                  |

## Rotacja soli

Ustaw `OMNIROUTE_CLI_SALT`, aby obrócić wyprowadzony token bez zmian w kodzie.
Po rotacji wszystkie procesy CLI na tej maszynie automatycznie użyją nowego tokenu.
Przydatne po wycieku z listy procesów, który mógł ujawnić
poprzednią wyprowadzoną wartość.

```bash
# Persistent rotation (add to shell profile)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verify new token is in use
omniroute status
```

Domyślna sól: `omniroute-cli-auth-v1`

## Format legacy (SHA-256, 32-znakowy) — nadal akceptowany

Przed powyższym formatem HMAC CLI wyprowadzał token jako
`SHA-256(machineId + salt).hex[0..32]` (prefiks 32-znakowy) w
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` w `src/lib/machineToken.ts`).

Dla kompatybilności wstecznej serwer akceptuje **oba** formaty: weryfikator buduje
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` i porównuje
nadchodzący nagłówek z każdym przez `timingSafeEqual`
(`src/server/authz/policies/management.ts` oraz `src/lib/middleware/cliTokenAuth.ts`).
Token jest więc ważny, jeśli pasuje do **albo** 64-znakowego digestu HMAC, **albo** 32-znakowego
legacy prefiksu SHA-256.

**Opt-out:** ustaw `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env lub `.env`), aby całkowicie wyłączyć
mechanizm tokenu CLI; cały dostęp wymaga wtedy jawnego klucza API. Na hostach wieloużytkownikowych
jest to zalecane, ponieważ `machine-id` jest per-urządzenie (nie per-użytkownik) i inny
użytkownik na tym samym hoście mógłby obliczyć ten sam token.

## Pliki

| Plik                                      | Przeznaczenie                            |
| ----------------------------------------- | ---------------------------------------- |
| `src/lib/machineToken.ts`                 | Token derivation (`getMachineTokenSync`) |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` constant              |
| `src/server/authz/policies/management.ts` | Server-side verification                 |
| `src/server/authz/routeGuard.ts`          | Loopback host check (`isLoopbackHost`)   |

## Zobacz też

- `docs/security/ROUTE_GUARD_TIERS.md` — poziomy ochrony tras
- `docs/architecture/AUTHZ_GUIDE.md` — pełny pipeline autoryzacji
