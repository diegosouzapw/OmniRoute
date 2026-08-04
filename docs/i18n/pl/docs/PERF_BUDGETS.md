# Budżety wydajności — OmniRoute (2026-06-18)

**Status**: Miarodajny. Cele SLO, do których odwołuje się audyt 71 filarów (L13)
przy bramce `Perf > 2.00`.
**Metodyka**: budżety opóźnień p50/p95/p99 per endpoint oraz
nadrzędne SLO dostępności. Budżety wyprowadzono z topologii 3 replik
Caddy + Redis (commit `038439fa7`); korygować przy zmianie infrastruktury.
**Egzekwowanie**: na razie brak. § 6 szkicuje skrypt k6 `benches/perf-gate.k6.js`,
który asertowałby poniższe SLO, lecz jest to odniesienie projektowe,
a nie zacommitowany plik — w repozytorium nie ma dziś katalogu `bench/` ani `benches/`.
Ten dokument służy wyłącznie do ustalania celów, dopóki bramka CI
nie powstanie jako praca następcza.
**Częstotliwość ponownej oceny**: kwartalnie lub przy każdej istotnej zmianie infrastruktury.

---

## 1. Nadrzędne SLO

| SLO                                                           | Cel                      | Okno            | Page przy naruszeniu |
| ------------------------------------------------------------- | ------------------------ | --------------- | -------------------- |
| **Dostępność** (2xx lub 4xx dla /v1/* i /api/settings/*)      | 99.9%                    | rolling 30 days | on-call P2           |
| **Tempo spalania error budget** (znormalizowany wskaźnik 1xx) | < 2x for 1h, < 6x for 5m | 1h / 5m windows | on-call P1           |
| **Zagregowane opóźnienie p95** (wszystkie /v1/*)              | ≤ 1.5 s                  | rolling 5 min   | on-call P2           |
| **Zagregowane opóźnienie p99** (wszystkie /v1/*)              | ≤ 4.0 s                  | rolling 5 min   | on-call P2           |

**Error budget**: okno 30-dniowe = 43,2 minuty niedostępności przy
99.9%. Tempo spalania > 2x to P2; > 6x to P1.

---

## 2. Budżety opóźnień per endpoint

Wszystkie budżety mierzone **po stronie serwera** (od wejścia do Next.js Route Handler
do startu odpowiedzi albo do ostatniego bajtu przy streamingu). Endpointy streamowe
mierzone do time-of-first-byte (TTFB), ponieważ body jest przyrostowe.

### 2.1 Endpointy inferencji (ścieżka krytyczna)

| Endpoint                                  | Method      | p50    | p95    | p99    | Notes                                                         |
| ----------------------------------------- | ----------- | ------ | ------ | ------ | ------------------------------------------------------------- |
| `/v1/responses` (non-stream)              | POST        | 800 ms | 1.8 s  | 3.5 s  | Obejmuje translator + roundtrip do providera                  |
| `/v1/responses` (stream)                  | POST (TTFB) | 350 ms | 900 ms | 1.8 s  | Tylko TTFB; całkowity czas nieograniczony                     |
| `/v1/relay/chat/completions` (non-stream) | POST        | 1.0 s  | 2.2 s  | 4.0 s  | Obejmuje sprawdzenie rate-limit per-(token,IP)                |
| `/v1/relay/chat/completions` (stream)     | POST (TTFB) | 400 ms | 1.0 s  | 2.0 s  |                                                               |
| `/v1/embeddings`                          | POST        | 300 ms | 700 ms | 1.4 s  | Czysty roundtrip do providera; tani                           |
| `/v1/rerank`                              | POST        | 600 ms | 1.4 s  | 2.8 s  |                                                               |
| `/v1/moderations`                         | POST        | 250 ms | 600 ms | 1.2 s  | Lekka klasyfikacja                                            |
| `/v1/audio/speech`                        | POST        | 1.2 s  | 3.0 s  | 6.0 s  | Synteza audio jest wolna; budżet to odzwierciedla             |
| `/v1/audio/transcriptions`                | POST        | 2.0 s  | 5.0 s  | 10.0 s | STT ograniczony czasem audio + rozmiarem modelu               |
| `/v1/images/generations`                  | POST        | 4.0 s  | 8.0 s  | 15.0 s | Generacja obrazów ograniczona asynchronicznie przez providera |
| `/v1/videos/generations`                  | POST (TTFB) | 600 ms | 1.5 s  | 3.0 s  | Async; klient odpytuje `/v1/videos/{id}`                      |
| `/v1/music/generations`                   | POST        | 3.0 s  | 6.0 s  | 12.0 s |                                                               |

### 2.2 Pliki + batche

| Endpoint                              | Method | p50    | p95    | p99    | Notes                                    |
| ------------------------------------- | ------ | ------ | ------ | ------ | ---------------------------------------- |
| `/v1/files` (GET)                     | GET    | 80 ms  | 200 ms | 400 ms | Lista z cache                            |
| `/v1/files` (POST upload)             | POST   | 500 ms | 1.2 s  | 2.5 s  | Limit 25 MB; parsowanie multipart        |
| `/v1/files/{id}` (GET)                | GET    | 60 ms  | 150 ms | 300 ms |                                          |
| `/v1/files/{id}` (DELETE)             | DELETE | 80 ms  | 200 ms | 400 ms |                                          |
| `/v1/files/{id}/content` (download)   | GET    | 100 ms | 300 ms | 600 ms | + przepustowość per-MB                   |
| `/v1/batches` (GET)                   | GET    | 150 ms | 400 ms | 800 ms |                                          |
| `/v1/batches` (POST create)           | POST   | 200 ms | 500 ms | 1.0 s  | Waliduje plik wejściowy, potem enqueuuje |
| `/v1/batches/{id}` (GET)              | GET    | 100 ms | 300 ms | 600 ms |                                          |
| `/v1/batches/{id}` (DELETE)           | DELETE | 100 ms | 300 ms | 600 ms |                                          |
| `/v1/batches/delete-completed` (POST) | POST   | 400 ms | 1.0 s  | 2.0 s  | Masowe usuwanie; n wierszy               |

### 2.3 Agenci

| Endpoint                         | Method | p50    | p95    | p99    | Notes                                                         |
| -------------------------------- | ------ | ------ | ------ | ------ | ------------------------------------------------------------- |
| `/v1/agents/health`              | GET    | 1.5 s  | 4.5 s  | 5.0 s  | Limit timeout 5s per provider; oczekiwane łącznie 3 providery |
| `/v1/agents/credentials`         | GET    | 100 ms | 250 ms | 500 ms | Tylko metadane; wartości nigdy nie są zwracane                |
| `/v1/agents/tasks` (GET list)    | GET    | 150 ms | 400 ms | 800 ms |                                                               |
| `/v1/agents/tasks` (POST create) | POST   | 250 ms | 600 ms | 1.2 s  | Tylko enqueuuje; nie uruchamia agenta                         |
| `/v1/agents/tasks/{id}` (GET)    | GET    | 100 ms | 300 ms | 600 ms |                                                               |
| `/v1/agents/tasks/{id}` (DELETE) | DELETE | 150 ms | 400 ms | 800 ms |                                                               |

### 2.4 Combos / me / providers

| Endpoint                          | Method | p50    | p95    | p99    |
| --------------------------------- | ------ | ------ | ------ | ------ |
| `/v1/combos`                      | GET    | 80 ms  | 200 ms | 400 ms |
| `/v1/me/status`                   | GET    | 60 ms  | 150 ms | 300 ms |
| `/v1/providers/{provider}/models` | GET    | 100 ms | 250 ms | 500 ms |

### 2.5 Web / search

| Endpoint        | Method | p50    | p95   | p99   | Notes                                          |
| --------------- | ------ | ------ | ----- | ----- | ---------------------------------------------- |
| `/v1/web/fetch` | POST   | 1.5 s  | 4.0 s | 8.0 s | Limit timeout 10s; głębokość rekurencji 3      |
| `/v1/search`    | POST   | 800 ms | 2.0 s | 4.0 s | Opóźnienie wyszukiwania u providera bywa różne |

### 2.6 Shim VSCode-CLI (scoped tokenem)

To ścieżki legacy passthrough. Budżety są ciaśniejsze, bo
rozszerzenie VSCode-CLI wywołuje je często w ciasnych pętlach.

| Endpoint                                       | Method | p50    | p95    | p99    |
| ---------------------------------------------- | ------ | ------ | ------ | ------ |
| `/v1/vscode/{token}/v1/chat/completions`       | POST   | 700 ms | 1.6 s  | 3.0 s  |
| `/v1/vscode/{token}/v1/models`                 | GET    | 60 ms  | 150 ms | 300 ms |
| `/v1/vscode/{token}/combos`                    | GET    | 80 ms  | 200 ms | 400 ms |
| `/v1/vscode/{token}/chat/completions` (legacy) | POST   | 700 ms | 1.6 s  | 3.0 s  |
| `/v1/vscode/{token}/models` (legacy)           | GET    | 60 ms  | 150 ms | 300 ms |
| `/v1/vscode/{token}/responses`                 | POST   | 800 ms | 1.8 s  | 3.5 s  |

### 2.7 Zarządzanie / settings

Endpointy zarządzania są wyłącznie operatorskie i nie należą do ścieżki krytycznej.
Budżety ustawiono konserwatywnie; naruszenia nie page'ują on-call, ale
są flagowane w tygodniowym przeglądzie wydajności.

| Endpoint group                        | p50    | p95    | p99    |
| ------------------------------------- | ------ | ------ | ------ |
| `/api/settings/*` (GET)               | 100 ms | 300 ms | 600 ms |
| `/api/settings/*` (POST/PATCH/DELETE) | 200 ms | 500 ms | 1.0 s  |
| `/api/keys/*` (CRUD)                  | 150 ms | 400 ms | 800 ms |
| `/api/quota/*` (CRUD)                 | 150 ms | 400 ms | 800 ms |
| `/api/monitoring/health` (heavy)      | 500 ms | 1.5 s  | 3.0 s  |

### 2.8 Publiczne sondy

| Endpoint                 | Method | p50   | p95   | p99                                   |
| ------------------------ | ------ | ----- | ----- | ------------------------------------- |
| `/api/health/ping`       | GET    | 5 ms  | 20 ms | 50 ms                                 |
| `/api/monitoring/health` | GET    | 5 ms  | 20 ms | 50 ms                                 |
| `/api/docs`              | GET    | 20 ms | 80 ms | 200 ms (HTML shell, no provider call) |

---

## 3. Cele przepustowości

| Tier                    | Per-replica RPS            | Cluster RPS (3 replicas) | Notes                                               |
| ----------------------- | -------------------------- | ------------------------ | --------------------------------------------------- |
| Inference (non-stream)  | 50 RPS                     | 150 RPS                  | Ograniczone przez quota providera + CPU translatora |
| Inference (stream)      | 25 concurrent streams      | 75 streams               | Ograniczone przez event-loop Node + pamięć          |
| Embeddings              | 200 RPS                    | 600 RPS                  | Tanie                                               |
| Files (upload)          | 10 RPS                     | 30 RPS                   | Parsowanie multipart + zapis do DB                  |
| Files (download)        | 100 RPS                    | 300 RPS                  | Treść statyczna przez Next.js                       |
| Combos / me / providers | 500 RPS                    | 1,500 RPS                | Z cache                                             |
| WebSocket               | 100 concurrent connections | 300                      | Limit per-IP: 5                                     |

**Sufit klastra** (wszystkie endpointy łącznie, obciążenie ciągłe): ~1 000 RPS,
zanim p95 latency zacznie rosnąć. Powyżej tego skalować horyzontalnie
przez dodawanie replik; Caddy LB jest bezstanowy.

---

## 4. Budżety zasobów

| Resource                | Per-replica cap | Notes                                                  |
| ----------------------- | --------------- | ------------------------------------------------------ |
| RSS memory              | 1.5 GB          | Skoki przy gen. audio/wideo; spodziewane chwilowe 2 GB |
| Event-loop lag (p99)    | 50 ms           | Alert przez regresję `clinic doctor`                   |
| Heap retained           | 800 MB          | Strojenie old-gen GC w `node --max-old-space-size`     |
| File descriptors        | 2,000           | Na hoście zalecane `ulimit -n 4096`                    |
| DB connections (sql.js) | 1 per replica   | sql.js działa in-process; pool nie jest potrzebny      |
| Redis connections       | 20 per replica  | Z poola; idle usuwane po 5 min                         |

---

## 5. Budżet cold-start

Cold-start Next.js App Router na świeżym kontenerze:

| Phase                            | Budget                                   |
| -------------------------------- | ---------------------------------------- |
| Container start → HTTP listening | ≤ 800 ms                                 |
| First request TTFB (warm)        | ≤ 200 ms                                 |
| Translator registry bootstrap    | ≤ 500 ms (one-time, first /v1/responses) |

**Skrypt pomiarowy**: `bin/cold-start-bench.sh` (już w repozytorium
od v3.8.36; `bin/` to kanoniczny katalog skryptów).

---

## 6. Bramka regresji (odniesienie k6, jeszcze niezaimplementowane)

Poniższy szkic pokazuje, jak przyszły skrypt `benches/perf-gate.k6.js`
asertowałby powyższe SLO. Nic z tej sekcji nie jest dziś zacommitowane ani
podpięte do CI — to odniesienie projektowe do pracy następczej, a nie
działająca bramka.

```javascript
// benches/perf-gate.k6.js — pseudo-code; not yet committed
import http from "k6/http";
import { check, Trend } from "k6";

const responsesTTFB = new Trend("v1_responses_ttfb", true);

export const options = {
  scenarios: {
    smoke: {
      executor: "constant-vus",
      vus: 10,
      duration: "1m",
    },
  },
  thresholds: {
    "http_req_duration{endpoint:v1_responses}": ["p(95)<1800", "p(99)<3500"],
    http_req_failed: ["rate<0.01"],
    v1_responses_ttfb: ["p(95)<900"],
  },
};

export default function () {
  const res = http.post(
    `${__ENV.BASE_URL}/api/v1/responses`,
    JSON.stringify({
      model: "gpt-4o-mini",
      input: "ping",
    }),
    { headers: { Authorization: `Bearer ${__ENV.API_KEY}` } }
  );
  check(res, { "status is 200": (r) => r.status === 200 });
  responsesTTFB.add(res.timings.waiting);
}
```

---

## 7. Dziennik przeglądów

| Date                 | Reviewer             | Change                                                                                                                                                                                                             |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-06-18           | security-circle lead | Wstępne budżety per endpoint wyprowadzone z topologii 3 replik Caddy + Redis                                                                                                                                       |
| 2026-07-18           | observability-circle | Doprecyzowano, że dokument dziś nie egzekwuje nic (brak katalogu `bench/`/`benches/`, brak bramki CI) oraz poprawiono nieaktualne twierdzenie „not yet committed” o `bin/cold-start-bench.sh` (obecny od v3.8.36). |
| 2026-07-18 (planned) | observability-circle | Podpięcie `benches/perf-gate.k6.js` do CI; bramka przy naruszeniu p95 + p99                                                                                                                                        |
| 2026-09-18 (planned) | observability-circle | Przegląd kwartalny; korekta po danych bazowych z ruchu produkcyjnego                                                                                                                                               |
